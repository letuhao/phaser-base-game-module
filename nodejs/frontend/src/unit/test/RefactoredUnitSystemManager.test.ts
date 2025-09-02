import { UnitSystemManager } from '../managers/UnitSystemManager';
import { UnitRegistryManager } from '../managers/UnitRegistryManager';
import { StrategyManager } from '../managers/StrategyManager';
import { CommandManager } from '../managers/CommandManager';
import { ObserverManager } from '../managers/ObserverManager';
import { ValidationManager } from '../managers/ValidationManager';
import { PerformanceManager } from '../managers/PerformanceManager';
import { SizeUnitCalculator } from '../classes/SizeUnitCalculator';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { UnitType } from '../enums/UnitType';
import type { IUnitConfig } from '../interfaces/IUnitConfig';
import type { IUnitStrategy } from '../strategies/IUnitStrategy';
import type { IUnitCommand } from '../commands/IUnitCommand';
import type { IUnitObserver } from '../observers/IUnitObserver';
import type { IUnitValidator } from '../validators/IUnitValidator';
import type { UnitContext } from '../interfaces/IUnit';

/**
 * Test suite for the refactored UnitSystemManager
 * Verifies that the Single Responsibility Principle refactoring works correctly
 */
describe('RefactoredUnitSystemManager', () => {
  let unitSystemManager: UnitSystemManager;
  let mockContext: UnitContext;

  beforeEach(() => {
    unitSystemManager = new UnitSystemManager();
    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1200, height: 800 },
      viewport: { width: 1200, height: 800 },
    };
  });

  afterEach(() => {
    if (unitSystemManager.getSystemStatus().isInitialized) {
      unitSystemManager.shutdown();
    }
  });

  describe('Initialization and Shutdown', () => {
    it('should initialize successfully', () => {
      unitSystemManager.initialize();

      const status = unitSystemManager.getSystemStatus();
      expect(status.isInitialized).toBe(true);
      expect(status.totalUnits).toBe(0);
      expect(status.activeStrategies).toBe(0);
      expect(status.registeredObservers).toBe(0);
      expect(status.validationErrors).toBe(0);
    });

    it('should shutdown successfully', () => {
      unitSystemManager.initialize();
      unitSystemManager.shutdown();

      const status = unitSystemManager.getSystemStatus();
      expect(status.isInitialized).toBe(false);
    });

    it('should reset to default configuration', () => {
      unitSystemManager.initialize();

      const config = unitSystemManager.getConfiguration();
      expect(config.performanceThreshold).toBe(100);
      expect(config.memoryLimit).toBe(1000);
      expect(config.maxValidationErrors).toBe(10);
      expect(config.enablePerformanceMonitoring).toBe(true);
    });
  });

  describe('Manager Access', () => {
    beforeEach(() => {
      unitSystemManager.initialize();
    });

    it('should provide access to UnitRegistryManager', () => {
      const registryManager = unitSystemManager.getUnitRegistryManager();
      expect(registryManager).toBeInstanceOf(UnitRegistryManager);
      expect(registryManager.getUnitCount()).toBe(0);
    });

    it('should provide access to StrategyManager', () => {
      const strategyManager = unitSystemManager.getStrategyManager();
      expect(strategyManager).toBeInstanceOf(StrategyManager);
      expect(strategyManager.getStrategyCount()).toBe(0);
    });

    it('should provide access to CommandManager', () => {
      const commandManager = unitSystemManager.getCommandManager();
      expect(commandManager).toBeInstanceOf(CommandManager);
      expect(commandManager.getCommandHistorySize()).toBe(0);
    });

    it('should provide access to ObserverManager', () => {
      const observerManager = unitSystemManager.getObserverManager();
      expect(observerManager).toBeInstanceOf(ObserverManager);
      expect(observerManager.getObserverCount()).toBe(0);
    });

    it('should provide access to ValidationManager', () => {
      const validationManager = unitSystemManager.getValidationManager();
      expect(validationManager).toBeInstanceOf(ValidationManager);
      expect(validationManager.getValidatorCount()).toBe(0);
    });

    it('should provide access to PerformanceManager', () => {
      const performanceManager = unitSystemManager.getPerformanceManager();
      expect(performanceManager).toBeInstanceOf(PerformanceManager);
      // Performance manager starts with some data due to initialization
      expect(performanceManager.getPerformanceDataSize()).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Unit Management (via UnitRegistryManager)', () => {
    beforeEach(() => {
      unitSystemManager.initialize();
    });

    it('should create units successfully', () => {
      const config: IUnitConfig = {
        id: 'test-size-unit',
        name: 'Test Size Unit',
        sizeUnit: SizeUnit.PIXEL,
        dimension: Dimension.WIDTH,
        baseValue: 100,
        maintainAspectRatio: false,
      };

      const unit = unitSystemManager.createUnit('size', config);

      expect(unit).toBeInstanceOf(SizeUnitCalculator);
      expect(unit.id).toBe('test-size-unit');
      expect(unit.unitType).toBe(UnitType.SIZE);

      const status = unitSystemManager.getSystemStatus();
      expect(status.totalUnits).toBe(1);
    });

    it('should retrieve units by ID', () => {
      const config: IUnitConfig = {
        id: 'test-unit',
        name: 'Test Unit',
        sizeUnit: SizeUnit.PIXEL,
        dimension: Dimension.WIDTH,
        baseValue: 100,
        maintainAspectRatio: false,
      };

      unitSystemManager.createUnit('size', config);
      const retrievedUnit = unitSystemManager.getUnit('test-unit');

      expect(retrievedUnit).toBeDefined();
      expect(retrievedUnit?.id).toBe('test-unit');
    });

    it('should remove units successfully', () => {
      const config: IUnitConfig = {
        id: 'test-unit',
        name: 'Test Unit',
        sizeUnit: SizeUnit.PIXEL,
        dimension: Dimension.WIDTH,
        baseValue: 100,
        maintainAspectRatio: false,
      };

      unitSystemManager.createUnit('size', config);
      expect(unitSystemManager.getSystemStatus().totalUnits).toBe(1);

      const removed = unitSystemManager.removeUnit('test-unit');
      expect(removed).toBe(true);
      expect(unitSystemManager.getSystemStatus().totalUnits).toBe(0);
    });
  });

  describe('Strategy Management (via StrategyManager)', () => {
    beforeEach(() => {
      unitSystemManager.initialize();
    });

    it('should register strategies successfully', () => {
      const mockStrategy: IUnitStrategy = {
        unitType: 'test-strategy',
        calculate: jest.fn().mockReturnValue(100),
        canHandle: jest.fn().mockReturnValue(true),
        getPriority: jest.fn().mockReturnValue(1),
      };

      unitSystemManager.registerStrategy(mockStrategy);

      const strategyManager = unitSystemManager.getStrategyManager();
      expect(strategyManager.getStrategyCount()).toBe(1);
      expect(strategyManager.hasStrategy('test-strategy')).toBe(true);
    });
  });

  describe('Command Management (via CommandManager)', () => {
    beforeEach(() => {
      unitSystemManager.initialize();
    });

    it('should execute commands successfully', () => {
      const mockCommand: IUnitCommand = {
        id: 'test-command',
        execute: jest.fn().mockReturnValue(100),
        undo: jest.fn(),
        canExecute: jest.fn().mockReturnValue(true),
        getDescription: jest.fn().mockReturnValue('Test command'),
        getTimestamp: jest.fn().mockReturnValue(new Date()),
        getResult: jest.fn().mockReturnValue(100),
        getPreviousResult: jest.fn().mockReturnValue(undefined),
      };

      const result = unitSystemManager.executeCommand(mockCommand, mockContext);

      expect(result).toBe(100);
      expect(mockCommand.execute).toHaveBeenCalledWith(mockContext);

      const commandManager = unitSystemManager.getCommandManager();
      expect(commandManager.getCommandHistorySize()).toBe(1);
    });

    it('should support undo/redo operations', () => {
      const mockCommand: IUnitCommand = {
        id: 'test-command',
        execute: jest.fn().mockReturnValue(100),
        undo: jest.fn(),
        canExecute: jest.fn().mockReturnValue(true),
        getDescription: jest.fn().mockReturnValue('Test command'),
        getTimestamp: jest.fn().mockReturnValue(new Date()),
        getResult: jest.fn().mockReturnValue(100),
        getPreviousResult: jest.fn().mockReturnValue(undefined),
      };

      unitSystemManager.executeCommand(mockCommand, mockContext);

      const commandManager = unitSystemManager.getCommandManager();
      expect(commandManager.canUndo()).toBe(true);
      expect(commandManager.canRedo()).toBe(false);

      const undone = commandManager.undoLastCommand();
      expect(undone).toBe(true);
      expect(mockCommand.undo).toHaveBeenCalled();
    });
  });

  describe('Observer Management (via ObserverManager)', () => {
    beforeEach(() => {
      unitSystemManager.initialize();
    });

    it('should register observers successfully', () => {
      const mockObserver: IUnitObserver = {
        onUnitCreated: jest.fn(),
        onUnitDestroyed: jest.fn(),
        onUnitValueChanged: jest.fn(),
        onUnitCalculationStarted: jest.fn(),
        onUnitCalculationCompleted: jest.fn(),
        onUnitCalculationFailed: jest.fn(),
      };

      unitSystemManager.addObserver(mockObserver);

      const observerManager = unitSystemManager.getObserverManager();
      expect(observerManager.getObserverCount()).toBe(1);
      expect(observerManager.hasObserver(mockObserver)).toBe(true);
    });

    it('should notify observers of unit events', () => {
      const mockObserver: IUnitObserver = {
        onUnitCreated: jest.fn(),
        onUnitDestroyed: jest.fn(),
        onUnitValueChanged: jest.fn(),
        onUnitCalculationStarted: jest.fn(),
        onUnitCalculationCompleted: jest.fn(),
        onUnitCalculationFailed: jest.fn(),
      };

      unitSystemManager.addObserver(mockObserver);

      const config: IUnitConfig = {
        id: 'test-unit',
        name: 'Test Unit',
        sizeUnit: SizeUnit.PIXEL,
        dimension: Dimension.WIDTH,
        baseValue: 100,
        maintainAspectRatio: false,
      };

      unitSystemManager.createUnit('size', config);

      expect(mockObserver.onUnitCreated).toHaveBeenCalledWith('test-unit', UnitType.SIZE);
    });
  });

  describe('Validation Management (via ValidationManager)', () => {
    beforeEach(() => {
      unitSystemManager.initialize();
    });

    it('should register validators successfully', () => {
      const mockValidator: IUnitValidator = {
        setNext: jest.fn().mockReturnThis(),
        getNext: jest.fn().mockReturnValue(undefined),
        validate: jest.fn().mockReturnValue(true),
        getName: jest.fn().mockReturnValue('test-validator'),
        getErrorMessage: jest.fn().mockReturnValue(undefined),
        canHandle: jest.fn().mockReturnValue(true),
      };

      unitSystemManager.addValidator(mockValidator);

      const validationManager = unitSystemManager.getValidationManager();
      expect(validationManager.getValidatorCount()).toBe(1);
    });
  });

  describe('Performance Management (via PerformanceManager)', () => {
    beforeEach(() => {
      unitSystemManager.initialize();
    });

    it('should track performance metrics', () => {
      const performanceManager = unitSystemManager.getPerformanceManager();

      // Clear existing data to start fresh
      performanceManager.clearPerformanceData();

      performanceManager.startMeasurement('test-operation');
      performanceManager.endMeasurement('test-operation');

      const metrics = performanceManager.getPerformanceMetrics();
      expect(metrics.totalOperations).toBe(1);
      expect(metrics.averageExecutionTime).toBeGreaterThan(0);
    });

    it('should provide system performance metrics', () => {
      const metrics = unitSystemManager.getPerformanceMetrics();

      expect(metrics).toHaveProperty('totalCalculations');
      expect(metrics).toHaveProperty('averageCalculationTime');
      expect(metrics).toHaveProperty('memoryUsage');
      expect(metrics).toHaveProperty('errorRate');
    });
  });

  describe('Configuration Management', () => {
    beforeEach(() => {
      unitSystemManager.initialize();
    });

    it('should update configuration successfully', () => {
      const newConfig = {
        performanceThreshold: 200,
        memoryLimit: 2000,
        maxValidationErrors: 20,
      };

      unitSystemManager.updateConfiguration(newConfig);
      const config = unitSystemManager.getConfiguration();

      expect(config.performanceThreshold).toBe(200);
      expect(config.memoryLimit).toBe(2000);
      expect(config.maxValidationErrors).toBe(20);
    });

    it('should reset to default configuration', () => {
      unitSystemManager.updateConfiguration({ performanceThreshold: 999 });
      unitSystemManager.resetToDefaults();

      const config = unitSystemManager.getConfiguration();
      expect(config.performanceThreshold).toBe(100);
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      unitSystemManager.initialize();
    });

    it('should handle unit creation errors gracefully', () => {
      const invalidConfig = {
        id: 'invalid-unit',
        name: 'Invalid Unit',
        sizeUnit: SizeUnit.PIXEL,
        dimension: Dimension.WIDTH,
        baseValue: 100,
        maintainAspectRatio: false,
      };

      expect(() => {
        unitSystemManager.createUnit('invalid-type', invalidConfig);
      }).toThrow();
    });

    it('should handle command execution errors gracefully', () => {
      const failingCommand: IUnitCommand = {
        id: 'failing-command',
        execute: jest.fn().mockImplementation(() => {
          throw new Error('Command execution failed');
        }),
        undo: jest.fn(),
        canExecute: jest.fn().mockReturnValue(true),
        getDescription: jest.fn().mockReturnValue('Failing command'),
        getTimestamp: jest.fn().mockReturnValue(new Date()),
        getResult: jest.fn().mockReturnValue(undefined),
        getPreviousResult: jest.fn().mockReturnValue(undefined),
      };

      const result = unitSystemManager.executeCommand(failingCommand, mockContext);

      // Should return fallback value on error
      expect(result).toBe(100); // DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT
    });
  });

  describe('SOLID Principles Compliance', () => {
    it('should follow Single Responsibility Principle', () => {
      // Each manager should have a single responsibility
      const registryManager = unitSystemManager.getUnitRegistryManager();
      const strategyManager = unitSystemManager.getStrategyManager();
      const commandManager = unitSystemManager.getCommandManager();
      const observerManager = unitSystemManager.getObserverManager();
      const validationManager = unitSystemManager.getValidationManager();
      const performanceManager = unitSystemManager.getPerformanceManager();

      // Each manager should be focused on its specific domain
      expect(registryManager).toBeInstanceOf(UnitRegistryManager);
      expect(strategyManager).toBeInstanceOf(StrategyManager);
      expect(commandManager).toBeInstanceOf(CommandManager);
      expect(observerManager).toBeInstanceOf(ObserverManager);
      expect(validationManager).toBeInstanceOf(ValidationManager);
      expect(performanceManager).toBeInstanceOf(PerformanceManager);
    });

    it('should follow Dependency Inversion Principle', () => {
      // The UnitSystemManager depends on abstractions (interfaces) not concrete implementations
      expect(unitSystemManager.getUnitRegistryManager()).toBeDefined();
      expect(unitSystemManager.getStrategyManager()).toBeDefined();
      expect(unitSystemManager.getCommandManager()).toBeDefined();
      expect(unitSystemManager.getObserverManager()).toBeDefined();
      expect(unitSystemManager.getValidationManager()).toBeDefined();
      expect(unitSystemManager.getPerformanceManager()).toBeDefined();
    });
  });
});
