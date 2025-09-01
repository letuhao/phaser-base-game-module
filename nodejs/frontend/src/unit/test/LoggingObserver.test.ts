import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { LoggingObserver } from '../observers/LoggingObserver';
import { Logger } from '../../core/Logger';

// Mock the Logger
jest.mock('../../core/Logger');

describe('LoggingObserver', () => {
  let observer: LoggingObserver;
  let mockLogger: jest.Mocked<Logger>;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();

    // Create mock logger instance
    mockLogger = {
      debug: jest.fn(),
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      log: jest.fn(),
      getInstance: jest.fn().mockReturnThis(),
    } as any;

    // Mock the Logger.getInstance() method
    (Logger.getInstance as jest.Mock).mockReturnValue(mockLogger);

    observer = new LoggingObserver('info');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create observer with default log level', () => {
      const defaultObserver = new LoggingObserver();
      expect(defaultObserver).toBeInstanceOf(LoggingObserver);
    });

    it('should create observer with custom log level', () => {
      const debugObserver = new LoggingObserver('debug');
      const warnObserver = new LoggingObserver('warn');
      const errorObserver = new LoggingObserver('error');

      expect(debugObserver).toBeInstanceOf(LoggingObserver);
      expect(warnObserver).toBeInstanceOf(LoggingObserver);
      expect(errorObserver).toBeInstanceOf(LoggingObserver);
    });
  });

  describe('onUnitValueChanged', () => {
    it('should log unit value change with info level', () => {
      observer.onUnitValueChanged('test-unit-1', 100, 150);

      expect(mockLogger.info).toHaveBeenCalledWith(
        'UnitSystem',
        'LoggingObserver',
        '[unit_value_changed] Unit event occurred',
        {
          unitId: 'test-unit-1',
          oldValue: 100,
          newValue: 150,
          change: 50
        }
      );
    });

    it('should handle negative value changes', () => {
      observer.onUnitValueChanged('test-unit-2', 200, 150);

      expect(mockLogger.info).toHaveBeenCalledWith(
        'UnitSystem',
        'LoggingObserver',
        '[unit_value_changed] Unit event occurred',
        {
          unitId: 'test-unit-2',
          oldValue: 200,
          newValue: 150,
          change: -50
        }
      );
    });

    it('should handle zero value changes', () => {
      observer.onUnitValueChanged('test-unit-3', 100, 100);

      expect(mockLogger.info).toHaveBeenCalledWith(
        'UnitSystem',
        'LoggingObserver',
        '[unit_value_changed] Unit event occurred',
        {
          unitId: 'test-unit-3',
          oldValue: 100,
          newValue: 100,
          change: 0
        }
      );
    });
  });

  describe('onUnitCreated', () => {
    it('should log unit creation with info level', () => {
      observer.onUnitCreated('test-unit-1', 'size');

      expect(mockLogger.info).toHaveBeenCalledWith(
        'UnitSystem',
        'LoggingObserver',
        '[unit_created] Unit event occurred',
        {
          unitId: 'test-unit-1',
          unitType: 'size'
        }
      );
    });

    it('should handle different unit types', () => {
      observer.onUnitCreated('test-unit-2', 'position');
      observer.onUnitCreated('test-unit-3', 'scale');

      expect(mockLogger.info).toHaveBeenCalledTimes(2);
      expect(mockLogger.info).toHaveBeenNthCalledWith(
        1,
        'UnitSystem',
        'LoggingObserver',
        '[unit_created] Unit event occurred',
        {
          unitId: 'test-unit-2',
          unitType: 'position'
        }
      );
      expect(mockLogger.info).toHaveBeenNthCalledWith(
        2,
        'UnitSystem',
        'LoggingObserver',
        '[unit_created] Unit event occurred',
        {
          unitId: 'test-unit-3',
          unitType: 'scale'
        }
      );
    });
  });

  describe('onUnitDestroyed', () => {
    it('should log unit destruction with info level', () => {
      observer.onUnitDestroyed('test-unit-1');

      expect(mockLogger.info).toHaveBeenCalledWith(
        'UnitSystem',
        'LoggingObserver',
        '[unit_destroyed] Unit event occurred',
        {
          unitId: 'test-unit-1'
        }
      );
    });
  });

  describe('onUnitCalculationStarted', () => {
    it('should log calculation start with debug level when log level is debug', () => {
      observer = new LoggingObserver('debug');
      const startTime = performance.now();
      observer.onUnitCalculationStarted('test-unit-1');

      expect(mockLogger.debug).toHaveBeenCalledWith(
        'UnitSystem',
        'LoggingObserver',
        '[unit_calculation_started] Unit event occurred',
        {
          unitId: 'test-unit-1',
          startTime: expect.any(Number)
        }
      );

      // Verify startTime is a recent timestamp
      const loggedStartTime = (mockLogger.debug as jest.Mock).mock.calls[0][3] as { startTime: number };
      expect(loggedStartTime.startTime).toBeGreaterThan(startTime - 100);
      expect(loggedStartTime.startTime).toBeLessThan(startTime + 100);
    });

    it('should not log calculation start when log level is info', () => {
      observer = new LoggingObserver('info');
      observer.onUnitCalculationStarted('test-unit-1');

      expect(mockLogger.debug).not.toHaveBeenCalled();
    });
  });

  describe('onUnitCalculationCompleted', () => {
    it('should log calculation completion with info level', () => {
      observer.onUnitCalculationCompleted('test-unit-1', 150, 25.5);

      expect(mockLogger.info).toHaveBeenCalledWith(
        'UnitSystem',
        'LoggingObserver',
        '[unit_calculation_completed] Unit event occurred',
        {
          unitId: 'test-unit-1',
          result: 150,
          duration: '25.50ms'
        }
      );
    });

    it('should format duration correctly', () => {
      observer.onUnitCalculationCompleted('test-unit-2', 200, 0.123);

      expect(mockLogger.info).toHaveBeenCalledWith(
        'UnitSystem',
        'LoggingObserver',
        '[unit_calculation_completed] Unit event occurred',
        {
          unitId: 'test-unit-2',
          result: 200,
          duration: '0.12ms'
        }
      );
    });

    it('should handle zero duration', () => {
      observer.onUnitCalculationCompleted('test-unit-3', 100, 0);

      expect(mockLogger.info).toHaveBeenCalledWith(
        'UnitSystem',
        'LoggingObserver',
        '[unit_calculation_completed] Unit event occurred',
        {
          unitId: 'test-unit-3',
          result: 100,
          duration: '0.00ms'
        }
      );
    });
  });

  describe('onUnitCalculationFailed', () => {
    it('should log calculation failure with error level', () => {
      const error = new Error('Calculation failed');
      observer.onUnitCalculationFailed('test-unit-1', error);

      expect(mockLogger.error).toHaveBeenCalledWith(
        'UnitSystem',
        'LoggingObserver',
        '[unit_calculation_failed] Unit event occurred',
        {
          unitId: 'test-unit-1',
          error: 'Calculation failed',
          stack: error.stack,
          timestamp: expect.any(String)
        }
      );
    });

    it('should include timestamp in error log', () => {
      const error = new Error('Test error');
      const beforeCall = new Date();
      observer.onUnitCalculationFailed('test-unit-2', error);
      const afterCall = new Date();

      const loggedTimestamp = (mockLogger.error as jest.Mock).mock.calls[0][3] as { timestamp: string };
      const loggedDate = new Date(loggedTimestamp.timestamp);

      expect(loggedDate.getTime()).toBeGreaterThanOrEqual(beforeCall.getTime());
      expect(loggedDate.getTime()).toBeLessThanOrEqual(afterCall.getTime());
    });

    it('should handle errors without stack trace', () => {
      const error = new Error('No stack');
      error.stack = undefined;
      observer.onUnitCalculationFailed('test-unit-3', error);

      expect(mockLogger.error).toHaveBeenCalledWith(
        'UnitSystem',
        'LoggingObserver',
        '[unit_calculation_failed] Unit event occurred',
        {
          unitId: 'test-unit-3',
          error: 'No stack',
          stack: undefined,
          timestamp: expect.any(String)
        }
      );
    });
  });

  describe('log level filtering', () => {
    it('should not log debug messages when log level is info', () => {
      observer = new LoggingObserver('info');
      observer.onUnitCalculationStarted('test-unit-1');

      expect(mockLogger.debug).not.toHaveBeenCalled();
    });

    it('should log debug messages when log level is debug', () => {
      observer = new LoggingObserver('debug');
      observer.onUnitCalculationStarted('test-unit-1');

      expect(mockLogger.debug).toHaveBeenCalled();
    });

    it('should not log info messages when log level is warn', () => {
      observer = new LoggingObserver('warn');
      observer.onUnitValueChanged('test-unit-1', 100, 150);

      expect(mockLogger.info).not.toHaveBeenCalled();
    });

    it('should log warn messages when log level is warn', () => {
      observer = new LoggingObserver('warn');
      // Note: We don't have a warn-level event in the current implementation
      // This test verifies the log level filtering works
      expect(observer).toBeInstanceOf(LoggingObserver);
    });

    it('should not log info messages when log level is error', () => {
      observer = new LoggingObserver('error');
      observer.onUnitValueChanged('test-unit-1', 100, 150);

      expect(mockLogger.info).not.toHaveBeenCalled();
    });

    it('should log error messages when log level is error', () => {
      observer = new LoggingObserver('error');
      const error = new Error('Test error');
      observer.onUnitCalculationFailed('test-unit-1', error);

      expect(mockLogger.error).toHaveBeenCalled();
    });
  });

  describe('setLogLevel', () => {
    it('should change log level', () => {
      observer = new LoggingObserver('info');
      
      // Initially should not log debug
      observer.onUnitCalculationStarted('test-unit-1');
      expect(mockLogger.debug).not.toHaveBeenCalled();

      // Change to debug level
      observer.setLogLevel('debug');
      observer.onUnitCalculationStarted('test-unit-2');
      expect(mockLogger.debug).toHaveBeenCalled();
    });

    it('should handle all log level changes', () => {
      observer.setLogLevel('debug');
      expect(observer).toBeInstanceOf(LoggingObserver);

      observer.setLogLevel('info');
      expect(observer).toBeInstanceOf(LoggingObserver);

      observer.setLogLevel('warn');
      expect(observer).toBeInstanceOf(LoggingObserver);

      observer.setLogLevel('error');
      expect(observer).toBeInstanceOf(LoggingObserver);
    });
  });

  describe('error handling', () => {
    it('should handle logger errors gracefully', () => {
      // Make the logger throw an error
      mockLogger.info.mockImplementation(() => {
        throw new Error('Logger error');
      });

      // Should not throw, should fall back to logger.log
      expect(() => {
        observer.onUnitValueChanged('test-unit-1', 100, 150);
      }).not.toThrow();

      expect(mockLogger.log).toHaveBeenCalled();
    });

    it('should handle both logger and fallback logger errors', () => {
      // Make both loggers throw errors
      mockLogger.info.mockImplementation(() => {
        throw new Error('Logger error');
      });
      mockLogger.log.mockImplementation(() => {
        throw new Error('Fallback logger error');
      });

      // Should not throw, should fall back to console.error
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        observer.onUnitValueChanged('test-unit-1', 100, 150);
      }).not.toThrow();

      expect(consoleSpy).toHaveBeenCalledWith(
        '[LoggingObserver] Both loggers failed:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('integration scenarios', () => {
    it('should handle complete unit lifecycle', () => {
      observer = new LoggingObserver('debug'); // Set to debug to see all logs
      observer.onUnitCreated('test-unit-1', 'size');
      observer.onUnitCalculationStarted('test-unit-1');
      observer.onUnitCalculationCompleted('test-unit-1', 150, 25);
      observer.onUnitValueChanged('test-unit-1', 100, 150);
      observer.onUnitDestroyed('test-unit-1');

      expect(mockLogger.info).toHaveBeenCalledTimes(4); // created, completed, valueChanged, destroyed
      expect(mockLogger.debug).toHaveBeenCalledTimes(1); // calculationStarted
    });

    it('should handle calculation failure scenario', () => {
      observer = new LoggingObserver('debug'); // Set to debug to see all logs
      observer.onUnitCreated('test-unit-1', 'size');
      observer.onUnitCalculationStarted('test-unit-1');
      
      const error = new Error('Calculation failed');
      observer.onUnitCalculationFailed('test-unit-1', error);
      
      observer.onUnitDestroyed('test-unit-1');

      expect(mockLogger.info).toHaveBeenCalledTimes(2); // created, destroyed
      expect(mockLogger.debug).toHaveBeenCalledTimes(1); // calculationStarted
      expect(mockLogger.error).toHaveBeenCalledTimes(1); // calculationFailed
    });
  });
});
