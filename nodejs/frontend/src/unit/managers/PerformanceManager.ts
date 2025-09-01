import { Logger } from '../../core/Logger';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * Performance Manager
 * Handles performance monitoring, metrics collection, and performance analysis
 * Follows Single Responsibility Principle - only manages performance
 */
export interface IPerformanceManager {
  // Performance tracking
  startMeasurement(operationId: string): void;
  endMeasurement(operationId: string): number;
  recordMeasurement(operationId: string, duration: number): void;
  
  // Performance metrics
  getPerformanceMetrics(): {
    totalOperations: number;
    averageExecutionTime: number;
    memoryUsage: number;
    errorRate: number;
    slowestOperations: Array<{ operationId: string; duration: number }>;
  };
  
  // Memory monitoring
  getMemoryUsage(): number;
  getMemoryLimit(): number;
  setMemoryLimit(limit: number): void;
  
  // Performance analysis
  getSlowestOperations(count?: number): Array<{ operationId: string; duration: number }>;
  getOperationStatistics(operationId: string): {
    count: number;
    averageTime: number;
    minTime: number;
    maxTime: number;
    totalTime: number;
  };
  
  // Performance alerts
  setPerformanceThreshold(threshold: number): void;
  getPerformanceThreshold(): number;
  isPerformanceAcceptable(): boolean;
  
  // Performance cleanup
  clearPerformanceData(): void;
  getPerformanceDataSize(): number;
}

/**
 * Performance Manager Implementation
 * Concrete implementation of performance management
 */
export class PerformanceManager implements IPerformanceManager {
  private operationHistory: Map<string, number[]> = new Map();
  private activeMeasurements: Map<string, number> = new Map();
  private readonly logger: Logger = Logger.getInstance();
  
  private performanceThreshold: number = DEFAULT_FALLBACK_VALUES.PERFORMANCE.ERROR_THRESHOLD;
  private memoryLimit: number = DEFAULT_FALLBACK_VALUES.PERFORMANCE.DEFAULT_MEMORY_LIMIT;
  private totalOperations: number = 0;
  private totalErrors: number = 0;

  /**
   * Start measuring an operation
   */
  public startMeasurement(operationId: string): void {
    this.logger.debug('PerformanceManager', 'startMeasurement', 'Starting measurement', { operationId });
    
    if (this.activeMeasurements.has(operationId)) {
      this.logger.warn('PerformanceManager', 'startMeasurement', 'Measurement already active', { operationId });
      return;
    }
    
    this.activeMeasurements.set(operationId, performance.now());
  }

  /**
   * End measuring an operation and return duration
   */
  public endMeasurement(operationId: string): number {
    const startTime = this.activeMeasurements.get(operationId);
    
    if (startTime === undefined) {
      this.logger.warn('PerformanceManager', 'endMeasurement', 'No active measurement found', { operationId });
      return 0;
    }
    
    const duration = performance.now() - startTime;
    this.activeMeasurements.delete(operationId);
    
    this.recordMeasurement(operationId, duration);
    
    this.logger.debug('PerformanceManager', 'endMeasurement', 'Measurement completed', {
      operationId,
      duration
    });
    
    return duration;
  }

  /**
   * Record a measurement for an operation
   */
  public recordMeasurement(operationId: string, duration: number): void {
    this.totalOperations++;
    
    // Store in operation history
    if (!this.operationHistory.has(operationId)) {
      this.operationHistory.set(operationId, []);
    }
    
    const history = this.operationHistory.get(operationId)!;
    history.push(duration);
    
    // Keep only last 100 measurements per operation
    if (history.length > 100) {
      history.shift();
    }
    
    // Check performance threshold
    if (duration > this.performanceThreshold) {
      this.logger.warn('PerformanceManager', 'recordMeasurement', 'Operation exceeded performance threshold', {
        operationId,
        duration,
        threshold: this.performanceThreshold
      });
    }
    
    this.logger.debug('PerformanceManager', 'recordMeasurement', 'Measurement recorded', {
      operationId,
      duration,
      totalOperations: this.totalOperations
    });
  }

  /**
   * Get comprehensive performance metrics
   */
  public getPerformanceMetrics(): {
    totalOperations: number;
    averageExecutionTime: number;
    memoryUsage: number;
    errorRate: number;
    slowestOperations: Array<{ operationId: string; duration: number }>;
  } {
    const allDurations: number[] = [];
    this.operationHistory.forEach(durations => {
      allDurations.push(...durations);
    });
    
    const averageExecutionTime = allDurations.length > 0 
      ? allDurations.reduce((sum, duration) => sum + duration, 0) / allDurations.length 
      : 0;
    
    const errorRate = this.totalOperations > 0 
      ? (this.totalErrors / this.totalOperations) * 100 
      : 0;
    
    const slowestOperations = this.getSlowestOperations(5);
    
    return {
      totalOperations: this.totalOperations,
      averageExecutionTime,
      memoryUsage: this.getMemoryUsage(),
      errorRate,
      slowestOperations
    };
  }

  /**
   * Get current memory usage
   */
  public getMemoryUsage(): number {
    // In a browser environment, we can use performance.memory if available
    if ('memory' in performance) {
      return (performance as any).memory.usedJSHeapSize;
    }
    
    // Fallback to a simple estimation
    return this.operationHistory.size * 100; // Rough estimation
  }

  /**
   * Get memory limit
   */
  public getMemoryLimit(): number {
    return this.memoryLimit;
  }

  /**
   * Set memory limit
   */
  public setMemoryLimit(limit: number): void {
    this.memoryLimit = limit;
    this.logger.info('PerformanceManager', 'setMemoryLimit', 'Memory limit updated', { limit });
  }

  /**
   * Get the slowest operations
   */
  public getSlowestOperations(count: number = 10): Array<{ operationId: string; duration: number }> {
    const operations: Array<{ operationId: string; duration: number }> = [];
    
    this.operationHistory.forEach((durations, operationId) => {
      if (durations.length > 0) {
        const maxDuration = Math.max(...durations);
        operations.push({ operationId, duration: maxDuration });
      }
    });
    
    return operations
      .sort((a, b) => b.duration - a.duration)
      .slice(0, count);
  }

  /**
   * Get statistics for a specific operation
   */
  public getOperationStatistics(operationId: string): {
    count: number;
    averageTime: number;
    minTime: number;
    maxTime: number;
    totalTime: number;
  } {
    const durations = this.operationHistory.get(operationId) || [];
    
    if (durations.length === 0) {
      return {
        count: 0,
        averageTime: 0,
        minTime: 0,
        maxTime: 0,
        totalTime: 0
      };
    }
    
    const totalTime = durations.reduce((sum, duration) => sum + duration, 0);
    const averageTime = totalTime / durations.length;
    const minTime = Math.min(...durations);
    const maxTime = Math.max(...durations);
    
    return {
      count: durations.length,
      averageTime,
      minTime,
      maxTime,
      totalTime
    };
  }

  /**
   * Set performance threshold
   */
  public setPerformanceThreshold(threshold: number): void {
    this.performanceThreshold = threshold;
    this.logger.info('PerformanceManager', 'setPerformanceThreshold', 'Performance threshold updated', { threshold });
  }

  /**
   * Get performance threshold
   */
  public getPerformanceThreshold(): number {
    return this.performanceThreshold;
  }

  /**
   * Check if performance is acceptable
   */
  public isPerformanceAcceptable(): boolean {
    const metrics = this.getPerformanceMetrics();
    return metrics.averageExecutionTime <= this.performanceThreshold && metrics.errorRate <= 5;
  }

  /**
   * Clear all performance data
   */
  public clearPerformanceData(): void {
    const operationCount = this.operationHistory.size;
    const measurementCount = this.totalOperations;
    
    this.operationHistory.clear();
    this.activeMeasurements.clear();
    this.totalOperations = 0;
    this.totalErrors = 0;
    
    this.logger.info('PerformanceManager', 'clearPerformanceData', 'Performance data cleared', {
      operationCount,
      measurementCount
    });
  }

  /**
   * Get the size of performance data
   */
  public getPerformanceDataSize(): number {
    let totalMeasurements = 0;
    this.operationHistory.forEach(durations => {
      totalMeasurements += durations.length;
    });
    
    return totalMeasurements;
  }

  /**
   * Record an error for error rate calculation
   */
  public recordError(): void {
    this.totalErrors++;
    this.logger.debug('PerformanceManager', 'recordError', 'Error recorded', {
      totalErrors: this.totalErrors,
      errorRate: this.totalOperations > 0 ? (this.totalErrors / this.totalOperations) * 100 : 0
    });
  }
}
