import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import type { IUnitStrategy } from '../strategies/IUnitStrategy';
import type { IUnitCommand } from '../commands/IUnitCommand';
import type { IUnitObserver } from '../observers/IUnitObserver';
import type { IUnitValidator } from '../validators/IUnitValidator';
import type { IUnitCalculationTemplate } from '../templates/IUnitCalculationTemplate';
import type { IUnitMemento } from '../mementos/IUnitMemento';
import type { IUnitComposite } from '../composites/IUnitComposite';
import type { IUnitAdapter } from '../adapters/IUnitAdapter';
import type { IUnitDecorator } from '../decorators/IUnitDecorator';
import { Logger } from '../../core/Logger';

/**
 * Unit System Manager
 * Central manager that coordinates all unit system components and design patterns
 */
export interface IUnitSystemManager {
  // Core unit management
  createUnit(unitType: string, config: any): IUnit;
  getUnit(unitId: string): IUnit | undefined;
  getAllUnits(): IUnit[];
  removeUnit(unitId: string): boolean;

  // Strategy management
  registerStrategy(strategy: IUnitStrategy): void;
  getStrategy(input: any): IUnitStrategy | undefined;
  getStrategiesByType(type: string): IUnitStrategy[];

  // Command management
  executeCommand(command: IUnitCommand, context: UnitContext): number;
  undoLastCommand(): boolean;
  redoLastCommand(): boolean;
  getCommandHistory(): IUnitCommand[];

  // Observer management
  addObserver(observer: IUnitObserver): void;
  removeObserver(observer: IUnitObserver): boolean;
  notifyObservers(eventType: string, data: any): void;

  // Validation management
  addValidator(validator: IUnitValidator): void;
  validateUnit(unit: IUnit, context: UnitContext): boolean;
  getValidationErrors(): string[];

  // Template management
  registerTemplate(template: IUnitCalculationTemplate): void;
  getTemplate(input: any): IUnitCalculationTemplate | undefined;

  // Memento management
  saveUnitState(unitId: string, _description?: string): IUnitMemento | undefined;
  restoreUnitState(_unitId: string, _memento: IUnitMemento): boolean;
  getUnitMementos(unitId: string): IUnitMemento[];

  // Composite management
  createComposite(_unitType: string, _config: any): IUnitComposite;
  addChildToComposite(compositeId: string, child: IUnit): boolean;
  removeChildFromComposite(compositeId: string, childId: string): boolean;

  // Adapter management
  registerAdapter(adapter: IUnitAdapter): void;
  adaptLegacyUnit(legacyUnit: any): IUnit | undefined;

  // Decorator management
  addDecorator(unitId: string, decorator: IUnitDecorator): boolean;
  removeDecorator(unitId: string, decoratorId: string): boolean;
  getUnitDecorators(unitId: string): IUnitDecorator[];

  // System operations
  initialize(): void;
  shutdown(): void;
  getSystemStatus(): {
    isInitialized: boolean;
    totalUnits: number;
    activeStrategies: number;
    registeredObservers: number;
    validationErrors: number;
  };

  // Performance and monitoring
  getPerformanceMetrics(): {
    totalCalculations: number;
    averageCalculationTime: number;
    memoryUsage: number;
    errorRate: number;
  };

  // Configuration
  updateConfiguration(_config: any): void;
  getConfiguration(): any;
  resetToDefaults(): void;
}

/**
 * Unit System Manager Implementation
 * Concrete implementation of the unit system manager
 */
export class UnitSystemManager implements IUnitSystemManager {
  private units: Map<string, IUnit> = new Map();
  private strategies: Map<string, IUnitStrategy> = new Map();
  private observers: Set<IUnitObserver> = new Set();
  private validators: IUnitValidator[] = [];
  private templates: Map<string, IUnitCalculationTemplate> = new Map();
  private mementos: Map<string, IUnitMemento[]> = new Map();
  private composites: Map<string, IUnitComposite> = new Map();
  private adapters: Map<string, IUnitAdapter> = new Map();
  private decorators: Map<string, IUnitDecorator[]> = new Map();

  private commandHistory: IUnitCommand[] = [];
  private commandIndex: number = -1;
  private isInitialized: boolean = false;
  private readonly logger: Logger = Logger.getInstance();

  private performanceMetrics = {
    totalCalculations: 0,
    calculationTimes: [] as number[],
    memoryUsage: 0,
    errors: 0,
  };

  // Core unit management
  createUnit(unitType: string, config: any): IUnit {
    // Implementation would create units based on type and config
    const unit = this.createUnitByType(unitType, config);
    if (unit) {
      this.units.set(unit.id, unit);
      this.notifyObservers('unit_created', { unitId: unit.id, unitType });
      return unit;
    }
    throw new Error(`Failed to create unit of type: ${unitType}`);
  }

  getUnit(unitId: string): IUnit | undefined {
    return this.units.get(unitId);
  }

  getAllUnits(): IUnit[] {
    return Array.from(this.units.values());
  }

  removeUnit(unitId: string): boolean {
    const unit = this.units.get(unitId);
    if (unit) {
      this.units.delete(unitId);
      this.notifyObservers('unit_destroyed', { unitId });
      return true;
    }
    return false;
  }

  // Strategy management
  registerStrategy(strategy: IUnitStrategy): void {
    this.strategies.set(strategy.unitType, strategy);
  }

  getStrategy(input: any): IUnitStrategy | undefined {
    // Find the best strategy for the input
    for (const strategy of Array.from(this.strategies.values())) {
      if (strategy.canHandle(input)) {
        return strategy;
      }
    }
    return undefined;
  }

  getStrategiesByType(type: string): IUnitStrategy[] {
    return Array.from(this.strategies.values()).filter(s => s.unitType === type);
  }

  // Command management
  executeCommand(command: IUnitCommand, context: UnitContext): number {
    const startTime = performance.now();

    try {
      const result = command.execute(context);

      // Add to history
      this.commandHistory.splice(this.commandIndex + 1);
      this.commandHistory.push(command);
      this.commandIndex++;

      // Update performance metrics
      const duration = performance.now() - startTime;
      this.performanceMetrics.totalCalculations++;
      this.performanceMetrics.calculationTimes.push(duration);

      // Keep only last 100 calculation times
      if (this.performanceMetrics.calculationTimes.length > 100) {
        this.performanceMetrics.calculationTimes.shift();
      }

      return result;
    } catch (error) {
      this.performanceMetrics.errors++;
      throw error;
    }
  }

  undoLastCommand(): boolean {
    if (this.commandIndex >= 0) {
      const command = this.commandHistory[this.commandIndex];
      command.undo();
      this.commandIndex--;
      return true;
    }
    return false;
  }

  redoLastCommand(): boolean {
    if (this.commandIndex < this.commandHistory.length - 1) {
      this.commandIndex++;
      // Re-execute the command
      return true;
    }
    return false;
  }

  getCommandHistory(): IUnitCommand[] {
    return [...this.commandHistory];
  }

  // Observer management
  addObserver(observer: IUnitObserver): void {
    this.observers.add(observer);
  }

  removeObserver(observer: IUnitObserver): boolean {
    return this.observers.delete(observer);
  }

  notifyObservers(eventType: string, data: any): void {
    this.observers.forEach(observer => {
      try {
        // Call appropriate observer method based on event type
        switch (eventType) {
          case 'unit_created':
            observer.onUnitCreated(data.unitId, data.unitType);
            break;
          case 'unit_destroyed':
            observer.onUnitDestroyed(data.unitId);
            break;
          case 'value_changed':
            observer.onUnitValueChanged(data.unitId, data.oldValue, data.newValue);
            break;
          // Add more event types as needed
        }
      } catch (error) {
        this.logger.error('UnitSystemManager', 'notifyObservers', 'Error notifying observer', {
          error: error instanceof Error ? error.message : String(error),
        });
      }
    });
  }

  // Validation management
  addValidator(validator: IUnitValidator): void {
    this.validators.push(validator);
  }

  validateUnit(unit: IUnit, context: UnitContext): boolean {
    // Create a validation chain
    let currentValidator = this.validators[0];
    for (let i = 1; i < this.validators.length; i++) {
      currentValidator.setNext(this.validators[i]);
      currentValidator = this.validators[i];
    }

    return currentValidator ? currentValidator.validate(unit, context) : true;
  }

  getValidationErrors(): string[] {
    // Implementation would collect errors from validators
    return [];
  }

  // Template management
  registerTemplate(template: IUnitCalculationTemplate): void {
    this.templates.set(template.getCalculationMetadata().templateName, template);
  }

  getTemplate(input: any): IUnitCalculationTemplate | undefined {
    for (const template of Array.from(this.templates.values())) {
      if (template.canHandle(input)) {
        return template;
      }
    }
    return undefined;
  }

  // Memento management
  saveUnitState(unitId: string, _description?: string): IUnitMemento | undefined {
    const unit = this.units.get(unitId);
    if (!unit) return undefined;

    // Implementation would create memento from unit state
    // For now, return undefined
    return undefined;
  }

  restoreUnitState(_unitId: string, _memento: IUnitMemento): boolean {
    // Implementation would restore unit state from memento
    return false;
  }

  getUnitMementos(unitId: string): IUnitMemento[] {
    return this.mementos.get(unitId) || [];
  }

  // Composite management
  createComposite(_unitType: string, _config: any): IUnitComposite {
    // Implementation would create composite units
    // For now, return undefined
    return undefined as any;
  }

  addChildToComposite(compositeId: string, child: IUnit): boolean {
    const composite = this.composites.get(compositeId);
    if (composite) {
      composite.addChild(child);
      return true;
    }
    return false;
  }

  removeChildFromComposite(compositeId: string, childId: string): boolean {
    const composite = this.composites.get(compositeId);
    if (composite) {
      const child = composite.getChildById(childId);
      if (child) {
        return composite.removeChild(child);
      }
    }
    return false;
  }

  // Adapter management
  registerAdapter(adapter: IUnitAdapter): void {
    this.adapters.set(adapter.id, adapter);
  }

  adaptLegacyUnit(legacyUnit: any): IUnit | undefined {
    for (const adapter of Array.from(this.adapters.values())) {
      if (adapter.canAdapt(legacyUnit)) {
        return adapter;
      }
    }
    return undefined;
  }

  // Decorator management
  addDecorator(unitId: string, decorator: IUnitDecorator): boolean {
    const unitDecorators = this.decorators.get(unitId) || [];
    unitDecorators.push(decorator);
    this.decorators.set(unitId, unitDecorators);
    return true;
  }

  removeDecorator(unitId: string, decoratorId: string): boolean {
    const unitDecorators = this.decorators.get(unitId);
    if (unitDecorators) {
      const index = unitDecorators.findIndex(d => d.id === decoratorId);
      if (index > -1) {
        unitDecorators.splice(index, 1);
        return true;
      }
    }
    return false;
  }

  getUnitDecorators(unitId: string): IUnitDecorator[] {
    return this.decorators.get(unitId) || [];
  }

  // System operations
  initialize(): void {
    this.isInitialized = true;
    this.notifyObservers('system_initialized', {});
  }

  shutdown(): void {
    this.isInitialized = false;
    this.units.clear();
    this.strategies.clear();
    this.observers.clear();
    this.validators.length = 0;
    this.templates.clear();
    this.mementos.clear();
    this.composites.clear();
    this.adapters.clear();
    this.decorators.clear();
    this.commandHistory.length = 0;
    this.commandIndex = -1;
  }

  getSystemStatus() {
    return {
      isInitialized: this.isInitialized,
      totalUnits: this.units.size,
      activeStrategies: this.strategies.size,
      registeredObservers: this.observers.size,
      validationErrors: this.getValidationErrors().length,
    };
  }

  // Performance and monitoring
  getPerformanceMetrics() {
    const avgTime =
      this.performanceMetrics.calculationTimes.length > 0
        ? this.performanceMetrics.calculationTimes.reduce((a, b) => a + b, 0) /
          this.performanceMetrics.calculationTimes.length
        : 0;

    return {
      totalCalculations: this.performanceMetrics.totalCalculations,
      averageCalculationTime: avgTime,
      memoryUsage: this.performanceMetrics.memoryUsage,
      errorRate:
        this.performanceMetrics.errors / Math.max(this.performanceMetrics.totalCalculations, 1),
    };
  }

  // Configuration
  updateConfiguration(_config: any): void {
    // Implementation would update system configuration
  }

  getConfiguration(): any {
    // Implementation would return current configuration
    return {};
  }

  resetToDefaults(): void {
    // Implementation would reset to default configuration
  }

  // Private helper methods
  private createUnitByType(_unitType: string, _config: any): IUnit | undefined {
    // Implementation would create units based on type
    // For now, return undefined
    return undefined;
  }
}
