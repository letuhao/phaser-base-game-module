import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { PerformanceObserver } from '../observers/PerformanceObserver';
import { Logger } from '../../core/Logger';

// Mock the Logger
jest.mock('../../core/Logger');

describe('PerformanceObserver', () => {
  let observer: PerformanceObserver;
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

    observer = new PerformanceObserver();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create observer with default settings', () => {
      expect(observer).toBeInstanceOf(PerformanceObserver);
    });
  });

  describe('onUnitValueChanged', () => {
    it('should increment total calculations counter', () => {
      const initialMetrics = observer.getPerformanceMetrics();
      expect(initialMetrics.totalCalculations).toBe(0);

      observer.onUnitValueChanged('test-unit-1', 100, 150);

      const updatedMetrics = observer.getPerformanceMetrics();
      expect(updatedMetrics.totalCalculations).toBe(1);
    });

    it('should log large value changes', () => {
      observer.onUnitValueChanged('test-unit-1', 100, 250); // 150 change > 100

      expect(mockLogger.debug).toHaveBeenCalledWith(
        'PerformanceObserver',
        'onUnitValueChanged',
        'Large value change detected: test-unit-1',
        {
          oldValue: 100,
          newValue: 250,
          changeMagnitude: 150,
          timestamp: expect.any(String)
        }
      );
    });

    it('should not log small value changes', () => {
      observer.onUnitValueChanged('test-unit-1', 100, 150); // 50 change <= 100

      expect(mockLogger.debug).not.toHaveBeenCalled();
    });

    it('should handle negative value changes', () => {
      observer.onUnitValueChanged('test-unit-1', 200, 50); // -150 change > 100

      expect(mockLogger.debug).toHaveBeenCalledWith(
        'PerformanceObserver',
        'onUnitValueChanged',
        'Large value change detected: test-unit-1',
        {
          oldValue: 200,
          newValue: 50,
          changeMagnitude: 150,
          timestamp: expect.any(String)
        }
      );
    });
  });

  describe('onUnitCreated', () => {
    it('should initialize unit type stats for new unit type', () => {
      observer.onUnitCreated('test-unit-1', 'size');

      const sizeStats = observer.getUnitTypePerformance('size');
      expect(sizeStats).toEqual({
        count: 1,
        totalTime: 0,
        averageTime: 0,
        minTime: Infinity,
        maxTime: 0
      });
    });

    it('should increment count for existing unit type', () => {
      observer.onUnitCreated('test-unit-1', 'size');
      observer.onUnitCreated('test-unit-2', 'size');

      const sizeStats = observer.getUnitTypePerformance('size');
      expect(sizeStats?.count).toBe(2);
    });

    it('should handle multiple unit types', () => {
      observer.onUnitCreated('test-unit-1', 'size');
      observer.onUnitCreated('test-unit-2', 'position');
      observer.onUnitCreated('test-unit-3', 'scale');

      const sizeStats = observer.getUnitTypePerformance('size');
      const positionStats = observer.getUnitTypePerformance('position');
      const scaleStats = observer.getUnitTypePerformance('scale');

      expect(sizeStats?.count).toBe(1);
      expect(positionStats?.count).toBe(1);
      expect(scaleStats?.count).toBe(1);
    });
  });

  describe('onUnitDestroyed', () => {
    it('should log unit destruction', () => {
      observer.onUnitDestroyed('test-unit-1');

      expect(mockLogger.debug).toHaveBeenCalledWith(
        'PerformanceObserver',
        'onUnitDestroyed',
        'Unit destroyed: test-unit-1'
      );
    });
  });

  describe('onUnitCalculationStarted', () => {
    it('should store calculation start time', () => {
      //const startTime = performance.now();
      observer.onUnitCalculationStarted('test-unit-1');

      // The start time is stored internally, we can't directly access it
      // But we can verify the method doesn't throw and logs appropriately
      expect(observer).toBeInstanceOf(PerformanceObserver);
    });

    it('should handle multiple calculation starts for same unit', () => {
      observer.onUnitCalculationStarted('test-unit-1');
      observer.onUnitCalculationStarted('test-unit-1');

      // Should not throw
      expect(observer).toBeInstanceOf(PerformanceObserver);
    });
  });

  describe('onUnitCalculationCompleted', () => {
    it('should update performance metrics', () => {
      observer.onUnitCalculationCompleted('test-unit-1', 150, 25);

      const metrics = observer.getPerformanceMetrics();
      expect(metrics.totalCalculationTime).toBe(25);
      expect(metrics.averageCalculationTime).toBe(25);
      expect(metrics.minCalculationTime).toBe(25);
      expect(metrics.maxCalculationTime).toBe(25);
      expect(metrics.calculationTimes).toHaveLength(1);
      expect(metrics.calculationTimes[0]).toBe(25);
    });

    it('should update min/max calculation times', () => {
      observer.onUnitCalculationCompleted('test-unit-1', 150, 25);
      observer.onUnitCalculationCompleted('test-unit-2', 200, 50);
      observer.onUnitCalculationCompleted('test-unit-3', 100, 10);

      const metrics = observer.getPerformanceMetrics();
      expect(metrics.minCalculationTime).toBe(10);
      expect(metrics.maxCalculationTime).toBe(50);
      expect(metrics.averageCalculationTime).toBe((25 + 50 + 10) / 3);
    });

    it('should log slow calculations', () => {
      observer.onUnitCalculationCompleted('test-unit-1', 150, 150); // > 100ms

      expect(mockLogger.warn).toHaveBeenCalledWith(
        'PerformanceObserver',
        'onUnitCalculationCompleted',
        'Slow calculation detected: test-unit-1',
        {
          duration: 150,
          threshold: 100,
          timestamp: expect.any(String)
        }
      );
    });

    it('should not log fast calculations', () => {
      observer.onUnitCalculationCompleted('test-unit-1', 150, 50); // <= 100ms

      expect(mockLogger.warn).not.toHaveBeenCalled();
    });

    it('should maintain calculation history within limits', () => {
      // Add more than maxHistorySize calculations
      for (let i = 0; i < 1100; i++) {
        observer.onUnitCalculationCompleted(`test-unit-${i}`, 100, 10);
      }

      const metrics = observer.getPerformanceMetrics();
      expect(metrics.calculationTimes.length).toBeLessThanOrEqual(1000);
    });
  });

  describe('onUnitCalculationFailed', () => {
    it('should increment error counter', () => {
      const initialMetrics = observer.getPerformanceMetrics();
      expect(initialMetrics.errors).toBe(0);

      const error = new Error('Calculation failed');
      observer.onUnitCalculationFailed('test-unit-1', error);

      const updatedMetrics = observer.getPerformanceMetrics();
      expect(updatedMetrics.errors).toBe(1);
    });

    it('should log calculation errors', () => {
      const error = new Error('Calculation failed');
      observer.onUnitCalculationFailed('test-unit-1', error);

      expect(mockLogger.error).toHaveBeenCalledWith(
        'PerformanceObserver',
        'onUnitCalculationFailed',
        'Calculation failed: test-unit-1',
        {
          error: 'Calculation failed',
          stack: error.stack,
          timestamp: expect.any(String)
        }
      );
    });

    it('should handle errors without stack trace', () => {
      const error = new Error('No stack');
      error.stack = undefined;
      observer.onUnitCalculationFailed('test-unit-1', error);

      expect(mockLogger.error).toHaveBeenCalledWith(
        'PerformanceObserver',
        'onUnitCalculationFailed',
        'Calculation failed: test-unit-1',
        {
          error: 'No stack',
          stack: undefined,
          timestamp: expect.any(String)
        }
      );
    });
  });

  describe('getPerformanceMetrics', () => {
    it('should return initial metrics', () => {
      const metrics = observer.getPerformanceMetrics();

      expect(metrics).toEqual({
        totalCalculations: 0,
        totalCalculationTime: 0,
        averageCalculationTime: 0,
        minCalculationTime: Infinity,
        maxCalculationTime: 0,
        calculationTimes: [],
        errors: 0,
        unitTypeStats: {}
      });
    });

    it('should return updated metrics after calculations', () => {
      observer.onUnitCalculationCompleted('test-unit-1', 150, 25);
      observer.onUnitCalculationCompleted('test-unit-2', 200, 50);

      const metrics = observer.getPerformanceMetrics();

      expect(metrics.totalCalculationTime).toBe(75);
      expect(metrics.averageCalculationTime).toBe(37.5);
      expect(metrics.minCalculationTime).toBe(25);
      expect(metrics.maxCalculationTime).toBe(50);
      expect(metrics.calculationTimes).toHaveLength(2);
    });

    it('should return unit type stats as plain object', () => {
      observer.onUnitCreated('test-unit-1', 'size');
      observer.onUnitCreated('test-unit-2', 'position');

      const metrics = observer.getPerformanceMetrics();

      expect(metrics.unitTypeStats).toEqual({
        size: {
          count: 1,
          totalTime: 0,
          averageTime: 0,
          minTime: Infinity,
          maxTime: 0
        },
        position: {
          count: 1,
          totalTime: 0,
          averageTime: 0,
          minTime: Infinity,
          maxTime: 0
        }
      });
    });
  });

  describe('getUnitTypePerformance', () => {
    it('should return undefined for non-existent unit type', () => {
      const stats = observer.getUnitTypePerformance('nonexistent');
      expect(stats).toBeUndefined();
    });

    it('should return stats for existing unit type', () => {
      observer.onUnitCreated('test-unit-1', 'size');

      const stats = observer.getUnitTypePerformance('size');
      expect(stats).toEqual({
        count: 1,
        totalTime: 0,
        averageTime: 0,
        minTime: Infinity,
        maxTime: 0
      });
    });
  });

  describe('resetMetrics', () => {
    it('should reset all metrics to initial values', () => {
      // Add some data
      observer.onUnitValueChanged('test-unit-1', 100, 150);
      observer.onUnitCreated('test-unit-1', 'size');
      observer.onUnitCalculationCompleted('test-unit-1', 150, 25);
      observer.onUnitCalculationFailed('test-unit-1', new Error('Test'));

      // Reset
      observer.resetMetrics();

      const metrics = observer.getPerformanceMetrics();
      expect(metrics).toEqual({
        totalCalculations: 0,
        totalCalculationTime: 0,
        averageCalculationTime: 0,
        minCalculationTime: Infinity,
        maxCalculationTime: 0,
        calculationTimes: [],
        errors: 0,
        unitTypeStats: {}
      });
    });
  });

  describe('exportPerformanceData', () => {
    it('should export performance data as JSON string', () => {
      observer.onUnitCalculationCompleted('test-unit-1', 150, 25);

      const exportData = observer.exportPerformanceData();
      const parsed = JSON.parse(exportData);

      expect(parsed).toHaveProperty('timestamp');
      expect(parsed).toHaveProperty('metrics');
      expect(parsed).toHaveProperty('summary');
      expect(parsed.metrics.totalCalculationTime).toBe(25);
    });

    it('should include performance summary', () => {
      const exportData = observer.exportPerformanceData();
      const parsed = JSON.parse(exportData);

      expect(parsed.summary).toHaveProperty('status');
      expect(parsed.summary).toHaveProperty('recommendations');
      expect(Array.isArray(parsed.summary.recommendations)).toBe(true);
    });
  });

  describe('getPerformanceSummary', () => {
    it('should return excellent status for fast calculations', () => {
      observer.onUnitCalculationCompleted('test-unit-1', 150, 2); // 2ms < 5ms

      const summary = observer.getPerformanceSummary();
      expect(summary.status).toBe('excellent');
      // For excellent status, there are no specific recommendations
      expect(summary.recommendations).toEqual([]);
    });

    it('should return good status for moderate calculations', () => {
      observer.onUnitCalculationCompleted('test-unit-1', 150, 10); // 5ms < 10ms < 16ms

      const summary = observer.getPerformanceSummary();
      expect(summary.status).toBe('good');
      expect(summary.recommendations).toContain('Performance is acceptable');
    });

    it('should return fair status for slower calculations', () => {
      observer.onUnitCalculationCompleted('test-unit-1', 150, 20); // 16ms < 20ms < 50ms

      const summary = observer.getPerformanceSummary();
      expect(summary.status).toBe('fair');
      expect(summary.recommendations).toContain('Monitor calculation performance');
      expect(summary.recommendations).toContain('Consider caching frequently used values');
    });

    it('should return poor status for very slow calculations', () => {
      observer.onUnitCalculationCompleted('test-unit-1', 150, 75); // 75ms > 50ms

      const summary = observer.getPerformanceSummary();
      expect(summary.status).toBe('poor');
      expect(summary.recommendations).toContain('Consider optimizing calculation algorithms');
      expect(summary.recommendations).toContain('Review unit calculation complexity');
    });

    it('should return poor status for high error rate', () => {
      // Add many calculations and errors to create high error rate
      for (let i = 0; i < 10; i++) {
        observer.onUnitCalculationCompleted(`test-unit-${i}`, 150, 10);
      }
      for (let i = 0; i < 5; i++) {
        observer.onUnitCalculationFailed(`test-unit-${i}`, new Error('Test error'));
      }

      const summary = observer.getPerformanceSummary();
      expect(summary.status).toBe('poor');
      expect(summary.recommendations).toContain('High error rate detected - review error handling');
    });

    it('should handle zero calculations gracefully', () => {
      const summary = observer.getPerformanceSummary();
      expect(summary.status).toBe('excellent');
      // When there are no calculations, there are no specific recommendations
      expect(summary.recommendations).toEqual([]);
    });
  });

  describe('integration scenarios', () => {
    it('should track complete unit lifecycle performance', () => {
      // Create unit
      observer.onUnitCreated('test-unit-1', 'size');
      
      // Value changes
      observer.onUnitValueChanged('test-unit-1', 100, 150);
      observer.onUnitValueChanged('test-unit-1', 150, 200);
      
      // Calculations
      observer.onUnitCalculationStarted('test-unit-1');
      observer.onUnitCalculationCompleted('test-unit-1', 150, 25);
      
      // Destroy unit
      observer.onUnitDestroyed('test-unit-1');

      const metrics = observer.getPerformanceMetrics();
      expect(metrics.totalCalculations).toBe(3); // 2 value changes + 1 calculation completion
      expect(metrics.totalCalculationTime).toBe(25);
      expect(metrics.calculationTimes).toHaveLength(1);
      expect(metrics.errors).toBe(0);

      const sizeStats = observer.getUnitTypePerformance('size');
      expect(sizeStats?.count).toBe(1);
    });

    it('should handle mixed success and failure scenarios', () => {
      // Successful calculations
      observer.onUnitCalculationCompleted('test-unit-1', 150, 25);
      observer.onUnitCalculationCompleted('test-unit-2', 200, 50);
      
      // Failed calculations
      observer.onUnitCalculationFailed('test-unit-3', new Error('Calculation failed'));
      observer.onUnitCalculationFailed('test-unit-4', new Error('Another failure'));

      const metrics = observer.getPerformanceMetrics();
      expect(metrics.totalCalculationTime).toBe(75);
      expect(metrics.averageCalculationTime).toBe(37.5);
      expect(metrics.errors).toBe(2);

      const summary = observer.getPerformanceSummary();
      expect(summary.status).toBe('poor'); // Due to high error rate (2 errors / 2 calculations = 100% error rate)
    });
  });
});
