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
import type { IUnitConfig } from '../interfaces/IUnitConfig';
import type { UnitValue } from '../types/UnitValue';
import type { ITemplateInput } from '../interfaces/ITemplateInput';
import type { IStrategyInput } from '../interfaces/IStrategyInput';
import { SizeUnit } from '../enums/SizeUnit';
import { SizeValue } from '../enums/SizeValue';
import { PositionUnit } from '../enums/PositionUnit';
import { PositionValue } from '../enums/PositionValue';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { createSizeTemplateInput, createPositionTemplateInput, createScaleTemplateInput } from '../interfaces/ITemplateInput';
import { convertToLegacyUnit } from '../interfaces/ILegacyUnit';
import { Logger } from '../../core/Logger';

/**
 * Unit System Manager
 * Central manager that coordinates all unit system components and design patterns
 */
export interface IUnitSystemManager {
  // Core unit management
  createUnit(unitType: string, config: IUnitConfig): IUnit;
  getUnit(unitId: string): IUnit | undefined;
  getAllUnits(): IUnit[];
  removeUnit(unitId: string): boolean;

  // Strategy management
  registerStrategy(strategy: IUnitStrategy): void;
  getStrategy(input: IStrategyInput): IUnitStrategy | undefined;
  getStrategiesByType(type: string): IUnitStrategy[];

  // Command management
  executeCommand(command: IUnitCommand, context: UnitContext): number;
  undoLastCommand(): boolean;
  redoLastCommand(): boolean;
  getCommandHistory(): IUnitCommand[];

  // Observer management
  addObserver(observer: IUnitObserver): void;
  removeObserver(observer: IUnitObserver): boolean;
  notifyObservers(eventType: string, data: Record<string, string | number | boolean>): void;

  // Validation management
  addValidator(validator: IUnitValidator): void;
  validateUnit(unit: IUnit, context: UnitContext): boolean;
  getValidationErrors(): string[];

  // Template management
  registerTemplate(template: IUnitCalculationTemplate): void;
  getTemplate(input: IUnit | UnitValue | number): IUnitCalculationTemplate | undefined;

  // Memento management
  saveUnitState(unitId: string, _description?: string): IUnitMemento | undefined;
  restoreUnitState(_unitId: string, _memento: IUnitMemento): boolean;
  getUnitMementos(unitId: string): IUnitMemento[];

  // Composite management
  createComposite(_unitType: string, _config: IUnitConfig): IUnitComposite;
  addChildToComposite(compositeId: string, child: IUnit): boolean;
  removeChildFromComposite(compositeId: string, childId: string): boolean;

  // Adapter management
  registerAdapter(adapter: IUnitAdapter): void;
  adaptLegacyUnit(legacyUnit: unknown): IUnit | undefined;

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
  updateConfiguration(_config: Record<string, unknown>): void;
  getConfiguration(): Record<string, unknown>;
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
  createUnit(unitType: string, config: IUnitConfig): IUnit {
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

  getStrategy(input: IStrategyInput): IUnitStrategy | undefined {
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

  notifyObservers(eventType: string, data: Record<string, string | number | boolean>): void {
    this.observers.forEach(observer => {
      try {
        // Call appropriate observer method based on event type
        switch (eventType) {
          case 'unit_created':
            if (typeof data.unitId === 'string' && typeof data.unitType === 'string') {
              observer.onUnitCreated(data.unitId, data.unitType);
            }
            break;
          case 'unit_destroyed':
            if (typeof data.unitId === 'string') {
              observer.onUnitDestroyed(data.unitId);
            }
            break;
          case 'value_changed':
            if (typeof data.unitId === 'string' && typeof data.oldValue === 'number' && typeof data.newValue === 'number') {
              observer.onUnitValueChanged(data.unitId, data.oldValue, data.newValue);
            }
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

  getTemplate(input: IUnit | UnitValue | number): IUnitCalculationTemplate | undefined {
    // Convert legacy input to template input format
    const templateInput = this.convertToTemplateInput(input);
    
    for (const template of Array.from(this.templates.values())) {
      if (template.canHandle(templateInput)) {
        return template;
      }
    }
    return undefined;
  }

  /**
   * Convert legacy input types to template input format
   */
  private convertToTemplateInput(input: IUnit | UnitValue | number): ITemplateInput {
    if (typeof input === 'number') {
      return createSizeTemplateInput(SizeUnit.PIXEL, input);
    }
    
    if (typeof input === 'string') {
      // Try to parse as a unit value
      if (Object.values(SizeValue).includes(input as SizeValue)) {
        return createSizeTemplateInput(SizeUnit.PIXEL, input as SizeValue);
      }
      if (Object.values(PositionValue).includes(input as PositionValue)) {
        return createPositionTemplateInput(PositionUnit.PIXEL, input as PositionValue);
      }
      if (Object.values(ScaleValue).includes(input as ScaleValue)) {
        return createScaleTemplateInput(ScaleUnit.FACTOR, input as ScaleValue);
      }
      
      // Default to size input
      return createSizeTemplateInput(SizeUnit.PIXEL, 100);
    }
    
    // If it's an IUnit, extract its properties
    if (input && typeof input === 'object' && 'calculate' in input) {
      // It's an IUnit, use a default value since we can't extract size directly
      return createSizeTemplateInput(SizeUnit.PIXEL, 100);
    }
    
    // Default fallback
    return createSizeTemplateInput(SizeUnit.PIXEL, 100);
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
  createComposite(_unitType: string, _config: IUnitConfig): IUnitComposite {
    // Implementation would create composite units
    // For now, return undefined
    return undefined as never;
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

  adaptLegacyUnit(legacyUnit: unknown): IUnit | undefined {
    // Convert unknown input to legacy unit format
    const legacyUnitInput = convertToLegacyUnit(legacyUnit);
    
    for (const adapter of Array.from(this.adapters.values())) {
      if (adapter.canAdapt(legacyUnitInput)) {
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
  updateConfiguration(_config: Record<string, unknown>): void {
    // Implementation would update system configuration
  }

  getConfiguration(): Record<string, unknown> {
    // Implementation would return current configuration
    return {};
  }

  resetToDefaults(): void {
    // Implementation would reset to default configuration
  }

  // Private helper methods
  private createUnitByType(_unitType: string, _config: IUnitConfig): IUnit | undefined {
    // Implementation would create units based on type
    // For now, return undefined
    return undefined;
  }
}
