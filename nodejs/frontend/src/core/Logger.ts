import { LoggerConfig } from '../config/LoggerConfig';
import { PerformanceMetric, ErrorStatistics } from '../types/logging/LoggerTypes';
import { LoggerOptimized } from './LoggerOptimized';

/**
 * Logger wrapper class that delegates to LoggerOptimized
 * Maintains backward compatibility while using optimized implementation
 */
export class Logger {
  private static instance: LoggerOptimized;

  /**
   * Get singleton instance (backward compatible)
   */
  public static getInstance(config?: Partial<LoggerConfig>): Logger {
    if (!Logger.instance) {
      Logger.instance = LoggerOptimized.getInstance(config);
    }
    return Logger.instance as unknown as Logger;
  }

  // ==================== PUBLIC METHODS (BACKWARD COMPATIBLE) ====================

  /**
   * Log error message (backward compatible)
   */
  public error(objectName: string, methodName: string, message: string, data?: any): void {
    Logger.instance.error(objectName, methodName, message, data);
  }

  /**
   * Log warning message (backward compatible)
   */
  public warn(objectName: string, methodName: string, message: string, data?: any): void {
    Logger.instance.warn(objectName, methodName, message, data);
  }

  /**
   * Log info message (backward compatible)
   */
  public info(objectName: string, methodName: string, message: string, data?: any): void {
    Logger.instance.info(objectName, methodName, message, data);
  }

  /**
   * Log debug message (backward compatible)
   */
  public debug(objectName: string, methodName: string, message: string, data?: any): void {
    Logger.instance.debug(objectName, methodName, message, data);
  }

  /**
   * Log trace message (backward compatible)
   */
  public trace(objectName: string, methodName: string, message: string, data?: any): void {
    Logger.instance.trace(objectName, methodName, message, data);
  }

  /**
   * Log performance metric (backward compatible)
   */
  public logPerformance(metricName: string, value: number, unit: string = '', metadata?: any): void {
    Logger.instance.logPerformance(metricName, value, unit, metadata);
  }

  /**
   * Get performance metrics (backward compatible)
   */
  public getPerformanceMetrics(): Map<string, PerformanceMetric> {
    return Logger.instance.getPerformanceMetrics();
  }

  /**
   * Get error statistics (backward compatible)
   */
  public getErrorStatistics(): ErrorStatistics {
    return Logger.instance.getErrorStatistics();
  }

  /**
   * Cleanup resources
   */
  public destroy(): void {
    Logger.instance.destroy();
  }

  /**
   * Get queue status
   */
  public getQueueStatus(): { size: number; isProcessing: boolean } {
    return Logger.instance.getQueueStatus();
  }

  /**
   * Flush logs (backward compatible)
   */
  public flushLogs(): void {
    Logger.instance.flushLogs();
  }

  /**
   * Log message (backward compatible)
   */
  public log(objectName: string, methodName: string, message: string, data?: any): void {
    Logger.instance.log(objectName, methodName, message, data);
  }

  /**
   * Log game event (backward compatible)
   */
  public logGameEvent(eventName: string, data?: any): void {
    Logger.instance.logGameEvent(eventName, data);
  }
}

// Export convenience functions (backward compatible)
export const logger = Logger.getInstance();
export const logError = (objectName: string, methodName: string, message: string, data?: any) =>
  logger.error(objectName, methodName, message, data);
export const logWarn = (objectName: string, methodName: string, message: string, data?: any) =>
  logger.warn(objectName, methodName, message, data);
export const logInfo = (objectName: string, methodName: string, message: string, data?: any) =>
  logger.info(objectName, methodName, message, data);
export const logDebug = (objectName: string, methodName: string, message: string, data?: any) =>
  logger.debug(objectName, methodName, message, data);
export const logTrace = (objectName: string, methodName: string, message: string, data?: any) =>
  logger.trace(objectName, methodName, message, data);
export const log = (objectName: string, methodName: string, message: string, data?: any) =>
  logger.log(objectName, methodName, message, data);
export const logPerformance = (metricName: string, value: number, unit: string = '', metadata?: any) =>
  logger.logPerformance(metricName, value, unit, metadata);
export const logGameEvent = (eventName: string, data?: any) =>
  logger.logGameEvent(eventName, data);
