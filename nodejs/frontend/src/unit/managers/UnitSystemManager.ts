import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import type { IUnitStrategy } from '../strategies/IUnitStrategy';
import type { IUnitCommand } from '../commands/IUnitCommand';
import type { IUnitObserver } from '../observers/IUnitObserver';
import type { IUnitValidator } from '../validators/IUnitValidator';
import type { IUnitConfig } from '../interfaces/IUnitConfig';

// Import focused managers
import { UnitRegistryManager, IUnitRegistryManager } from './UnitRegistryManager';
import { StrategyManager, IStrategyManager } from './StrategyManager';
import { CommandManager, ICommandManager } from './CommandManager';
import { ObserverManager, IObserverManager } from './ObserverManager';
import { ValidationManager, IValidationManager } from './ValidationManager';
import { PerformanceManager, IPerformanceManager } from './PerformanceManager';

import { Logger } from '../../core/Logger';

/**
 * Unit System Manager
 * Orchestrates all unit system components using focused managers
 * Follows Single Responsibility Principle - only coordinates between managers
 */
export interface IUnitSystemManager {
  // System lifecycle
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
  updateConfiguration(config: Record<string, unknown>): void;
  getConfiguration(): Record<string, unknown>;
  resetToDefaults(): void;

  // Manager access (for advanced usage)
  getUnitRegistryManager(): IUnitRegistryManager;
  getStrategyManager(): IStrategyManager;
  getCommandManager(): ICommandManager;
  getObserverManager(): IObserverManager;
  getValidationManager(): IValidationManager;
  getPerformanceManager(): IPerformanceManager;
}

/**
 * Unit System Manager Implementation
 * Refactored to use focused managers for better separation of concerns
 */
export class UnitSystemManager implements IUnitSystemManager {
  // Focused managers
  private readonly unitRegistryManager: UnitRegistryManager;
  private readonly strategyManager: StrategyManager;
  private readonly commandManager: CommandManager;
  private readonly observerManager: ObserverManager;
  private readonly validationManager: ValidationManager;
  private readonly performanceManager: PerformanceManager;

  private readonly logger: Logger = Logger.getInstance();
  private isInitialized: boolean = false;
  private configuration: Record<string, unknown> = {};

  constructor() {
    // Initialize focused managers
    this.unitRegistryManager = new UnitRegistryManager();
    this.strategyManager = new StrategyManager();
    this.commandManager = new CommandManager();
    this.observerManager = new ObserverManager();
    this.validationManager = new ValidationManager();
    this.performanceManager = new PerformanceManager();
  }

  /**
   * Initialize the unit system
   */
  public initialize(): void {
    this.logger.info('UnitSystemManager', 'initialize', 'Initializing unit system');

    try {
      // Initialize all managers
      this.performanceManager.startMeasurement('system_initialization');
      
      // Set up default configuration
      this.resetToDefaults();
      
      this.logger.info('UnitSystemManager', 'initialize', 'Unit system initialized successfully');
      this.isInitialized = true;
      
      this.performanceManager.endMeasurement('system_initialization');
    } catch (error) {
      this.logger.error('UnitSystemManager', 'initialize', 'Failed to initialize unit system', {
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  /**
   * Shutdown the unit system
   */
  public shutdown(): void {
    this.logger.info('UnitSystemManager', 'shutdown', 'Shutting down unit system');

    try {
      this.performanceManager.startMeasurement('system_shutdown');
      
      // Clear all data
      this.unitRegistryManager.getAllUnits().forEach(unit => {
        this.unitRegistryManager.removeUnit(unit.id);
      });
      
      this.strategyManager.clearStrategies();
      this.commandManager.clearCommandHistory();
      this.observerManager.clearObservers();
      this.validationManager.clearValidators();
      this.performanceManager.clearPerformanceData();
      
      this.isInitialized = false;
      
      this.performanceManager.endMeasurement('system_shutdown');
      this.logger.info('UnitSystemManager', 'shutdown', 'Unit system shut down successfully');
    } catch (error) {
      this.logger.error('UnitSystemManager', 'shutdown', 'Failed to shut down unit system', {
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  /**
   * Get system status
   */
  public getSystemStatus(): {
    isInitialized: boolean;
    totalUnits: number;
    activeStrategies: number;
    registeredObservers: number;
    validationErrors: number;
  } {
    return {
      isInitialized: this.isInitialized,
      totalUnits: this.unitRegistryManager.getUnitCount(),
      activeStrategies: this.strategyManager.getStrategyCount(),
      registeredObservers: this.observerManager.getObserverCount(),
      validationErrors: this.validationManager.getErrorCount()
    };
  }

  /**
   * Get performance metrics
   */
  public getPerformanceMetrics(): {
    totalCalculations: number;
    averageCalculationTime: number;
    memoryUsage: number;
    errorRate: number;
  } {
    const metrics = this.performanceManager.getPerformanceMetrics();
    return {
      totalCalculations: metrics.totalOperations,
      averageCalculationTime: metrics.averageExecutionTime,
      memoryUsage: metrics.memoryUsage,
      errorRate: metrics.errorRate
    };
  }

  /**
   * Update system configuration
   */
  public updateConfiguration(config: Record<string, unknown>): void {
    this.logger.info('UnitSystemManager', 'updateConfiguration', 'Updating system configuration', {
      configKeys: Object.keys(config)
    });

    this.configuration = { ...this.configuration, ...config };
    
    // Apply configuration to managers
    if ('performanceThreshold' in config) {
      this.performanceManager.setPerformanceThreshold(config.performanceThreshold as number);
    }
    
    if ('memoryLimit' in config) {
      this.performanceManager.setMemoryLimit(config.memoryLimit as number);
    }
  }

  /**
   * Get current configuration
   */
  public getConfiguration(): Record<string, unknown> {
    return { ...this.configuration };
  }

  /**
   * Reset to default configuration
   */
  public resetToDefaults(): void {
    this.logger.info('UnitSystemManager', 'resetToDefaults', 'Resetting to default configuration');
    
    this.configuration = {
      performanceThreshold: 100,
      memoryLimit: 1000,
      maxValidationErrors: 10,
      enablePerformanceMonitoring: true
    };
  }

  /**
   * Get unit registry manager
   */
  public getUnitRegistryManager(): IUnitRegistryManager {
    return this.unitRegistryManager;
  }

  /**
   * Get strategy manager
   */
  public getStrategyManager(): IStrategyManager {
    return this.strategyManager;
  }

  /**
   * Get command manager
   */
  public getCommandManager(): ICommandManager {
    return this.commandManager;
  }

  /**
   * Get observer manager
   */
  public getObserverManager(): IObserverManager {
    return this.observerManager;
  }

  /**
   * Get validation manager
   */
  public getValidationManager(): IValidationManager {
    return this.validationManager;
  }

  /**
   * Get performance manager
   */
  public getPerformanceManager(): IPerformanceManager {
    return this.performanceManager;
  }

  // Convenience methods that delegate to appropriate managers
  
  /**
   * Create a unit (delegates to UnitRegistryManager)
   */
  public createUnit(unitType: string, config: IUnitConfig): IUnit {
    this.performanceManager.startMeasurement('create_unit');
    
    try {
      const unit = this.unitRegistryManager.createUnit(unitType, config);
      this.observerManager.notifyUnitCreated(unit.id, unit.unitType);
      
      this.performanceManager.endMeasurement('create_unit');
      return unit;
    } catch (error) {
      this.performanceManager.recordError();
      this.performanceManager.endMeasurement('create_unit');
      throw error;
    }
  }

  /**
   * Get a unit (delegates to UnitRegistryManager)
   */
  public getUnit(unitId: string): IUnit | undefined {
    return this.unitRegistryManager.getUnit(unitId);
  }

  /**
   * Remove a unit (delegates to UnitRegistryManager)
   */
  public removeUnit(unitId: string): boolean {
    const removed = this.unitRegistryManager.removeUnit(unitId);
    if (removed) {
      this.observerManager.notifyUnitDestroyed(unitId);
    }
    return removed;
  }

  /**
   * Register a strategy (delegates to StrategyManager)
   */
  public registerStrategy(strategy: IUnitStrategy): void {
    this.strategyManager.registerStrategy(strategy);
  }

  /**
   * Execute a command (delegates to CommandManager)
   */
  public executeCommand(command: IUnitCommand, context: UnitContext): number {
    return this.commandManager.executeCommand(command, context);
  }

  /**
   * Add an observer (delegates to ObserverManager)
   */
  public addObserver(observer: IUnitObserver): void {
    this.observerManager.addObserver(observer);
  }

  /**
   * Add a validator (delegates to ValidationManager)
   */
  public addValidator(validator: IUnitValidator): void {
    this.validationManager.addValidator(validator);
  }
}
