import { LogLevel, LoggerConfig, DEFAULT_LOGGER_CONFIG } from '../config/LoggerConfig';
import { LogEntry, PerformanceMetric, ErrorStatistics } from '../types/logging/LoggerTypes';
import { ErrorTracker } from './ErrorTracker';
import { LogServerClient } from './LogServerClient';
import { Logger } from './Logger';

/**
 * Performance-optimized Logger with async processing and reduced overhead
 * Addresses key performance bottlenecks identified in the original Logger
 */
export class LoggerPerformanceOptimizer {
  private static instance: LoggerPerformanceOptimizer;
  private config: LoggerConfig;
  private logQueue: Array<{ entry: LogEntry; priority: number; timestamp: number }> = [];
  private isProcessingQueue: boolean = false;
  private performanceMetrics: Map<string, PerformanceMetric> = new Map();
  private errorTracker: ErrorTracker;
  private serverClient: LogServerClient;
  private queueProcessor: Worker | null = null;
  private batchProcessor: NodeJS.Timeout | null = null;
  private memoryUsage: number = 0;
  private lastMemoryCheck: number = 0;
  private memoryCheckInterval: number = 10000; // 10 seconds

  private constructor(config?: Partial<LoggerConfig>) {
    this.config = { ...DEFAULT_LOGGER_CONFIG, ...config };
    // Create a minimal logger interface for ErrorTracker
    const loggerInterface = {
      debug: (objectName: string, methodName: string, message: string, data?: any) =>
        this.debug(objectName, methodName, message, data),
      error: (objectName: string, methodName: string, message: string, data?: any) =>
        this.error(objectName, methodName, message, data),
    } as Logger;

    this.errorTracker = new ErrorTracker(loggerInterface);
    this.serverClient = new LogServerClient(this.config.server);

    // Initialize async processing
    this.initializeAsyncProcessing();

    // Setup minimal performance monitoring
    this.setupMinimalPerformanceMonitoring();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(config?: Partial<LoggerConfig>): LoggerPerformanceOptimizer {
    if (!LoggerPerformanceOptimizer.instance) {
      LoggerPerformanceOptimizer.instance = new LoggerPerformanceOptimizer(config);
    }
    return LoggerPerformanceOptimizer.instance;
  }

  /**
   * Initialize async processing with Web Worker if available
   */
  private initializeAsyncProcessing(): void {
    // Use Web Worker for log processing if available
    if (typeof Worker !== 'undefined' && this.config.buffering.enabled) {
      try {
        this.queueProcessor = new Worker(
          URL.createObjectURL(
            new Blob([
              `
              self.onmessage = function(e) {
                const { entry, priority } = e.data;
                
                // Process log entry asynchronously
                const processedEntry = {
                  ...entry,
                  processedAt: Date.now(),
                  workerId: self.name || 'logger-worker'
                };
                
                self.postMessage({ type: 'processed', entry: processedEntry });
              };
            `,
            ])
          )
        );

        this.queueProcessor.onmessage = e => {
          if (e.data.type === 'processed') {
            this.handleProcessedLog(e.data.entry);
          }
        };
      } catch (error) {
        console.warn('Web Worker not available, falling back to main thread processing');
      }
    }

    // Setup batch processing
    this.setupBatchProcessing();
  }

  /**
   * Setup batch processing for efficient log handling
   */
  private setupBatchProcessing(): void {
    if (this.config.buffering.enabled) {
      this.batchProcessor = setInterval(() => {
        this.processLogBatch();
      }, this.config.buffering.flushInterval);

      // Cleanup on page unload
      window.addEventListener('beforeunload', () => {
        this.processLogBatch();
      });
    }
  }

  /**
   * Setup minimal performance monitoring (reduced overhead)
   */
  private setupMinimalPerformanceMonitoring(): void {
    if (!this.config.performance.enabled) return;

    // Memory monitoring with reduced frequency
    this.startMinimalMemoryMonitoring();

    // Network monitoring only when needed
    if (this.config.performance.networkMonitoring) {
      this.startMinimalNetworkMonitoring();
    }
  }

  /**
   * Start minimal memory monitoring (reduced overhead)
   */
  private startMinimalMemoryMonitoring(): void {
    if ('memory' in performance) {
      setInterval(() => {
        const now = Date.now();
        if (now - this.lastMemoryCheck >= this.memoryCheckInterval) {
          const memory = (performance as any).memory;
          this.memoryUsage = Math.round(memory.usedJSHeapSize / 1048576); // MB

          this.performanceMetrics.set('memory', {
            value: {
              used: this.memoryUsage,
              total: Math.round(memory.totalJSHeapSize / 1048576),
              limit: Math.round(memory.jsHeapSizeLimit / 1048576),
            },
            timestamp: now,
          });

          this.lastMemoryCheck = now;

          // Only warn if memory usage is critical
          const memoryUsagePercent = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
          if (memoryUsagePercent > this.config.performance.memoryThreshold) {
            this.queueLog(
              'Performance',
              'MemoryWarning',
              `High memory usage: ${memoryUsagePercent.toFixed(1)}%`,
              {
                memoryUsage: memoryUsagePercent,
                threshold: this.config.performance.memoryThreshold,
              },
              LogLevel.WARN,
              2
            ); // High priority
          }
        }
      }, 5000); // Check every 5 seconds instead of continuous monitoring
    }
  }

  /**
   * Start minimal network monitoring
   */
  private startMinimalNetworkMonitoring(): void {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      this.performanceMetrics.set('network', {
        value: {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
        },
        timestamp: Date.now(),
      });
    }
  }

  /**
   * Queue log entry for async processing
   */
  private queueLog(
    objectName: string,
    methodName: string,
    message: string,
    data?: any,
    level: LogLevel = LogLevel.INFO,
    priority: number = 1
  ): void {
    if (!this.shouldLog(objectName, level)) return;

    const entry = this.createMinimalLogEntry(objectName, level, message, data, methodName);

    // Add to queue with priority
    this.logQueue.push({
      entry,
      priority,
      timestamp: Date.now(),
    });

    // Sort queue by priority (higher priority first)
    this.logQueue.sort((a, b) => b.priority - a.priority);

    // Process immediately for high priority logs
    if (priority >= 2) {
      this.processLogImmediately(entry);
    }

    // Start processing if not already running
    if (!this.isProcessingQueue) {
      this.processQueueAsync();
    }
  }

  /**
   * Create minimal log entry (reduced overhead)
   */
  private createMinimalLogEntry(
    objectName: string,
    level: LogLevel,
    message: string,
    data?: any,
    methodName?: string
  ): LogEntry {
    const entry: LogEntry = {
      level: LogLevel[level],
      objectName,
      message,
      data: this.sanitizeDataMinimal(data),
      methodName,
      // Only include stack trace for errors in development
      stackTrace:
        level === LogLevel.ERROR && process.env.NODE_ENV === 'development'
          ? this.getStackTraceMinimal()
          : undefined,
      // Only include performance data for high-priority logs
      performance: level >= LogLevel.WARN ? this.getCurrentPerformanceMetricsMinimal() : undefined,
    };

    return entry;
  }

  /**
   * Minimal data sanitization (reduced overhead)
   */
  private sanitizeDataMinimal(data: any): any {
    if (data === null || data === undefined) return data;

    try {
      // Simple sanitization for performance
      if (typeof data === 'object') {
        const sanitized: any = {};
        const keys = Object.keys(data).slice(0, 5); // Limit to 5 keys

        for (const key of keys) {
          if (this.isSafeProperty(key, data[key])) {
            sanitized[key] = typeof data[key] === 'object' ? '[Object]' : data[key];
          }
        }

        return sanitized;
      }

      return data;
    } catch (error) {
      return { error: 'Data sanitization failed' };
    }
  }

  /**
   * Check if property is safe (simplified)
   */
  private isSafeProperty(key: string, value: any): boolean {
    return typeof value !== 'function' && typeof value !== 'symbol' && !this.isSensitiveField(key);
  }

  /**
   * Check if field is sensitive
   */
  private isSensitiveField(fieldName: string): boolean {
    const sensitiveFields = ['password', 'token', 'key', 'secret', 'auth', 'credential'];
    return sensitiveFields.some(field => fieldName.toLowerCase().includes(field));
  }

  /**
   * Get minimal stack trace
   */
  private getStackTraceMinimal(): string {
    try {
      const stack = new Error().stack;
      return stack ? stack.split('\n').slice(1, 4).join('\n') : 'Stack trace not available';
    } catch {
      return 'Stack trace not available';
    }
  }

  /**
   * Get minimal performance metrics
   */
  private getCurrentPerformanceMetricsMinimal(): any {
    const metrics: any = {};

    // Only include essential metrics
    if (this.memoryUsage > 0) {
      metrics.memory = this.memoryUsage;
    }

    return metrics;
  }

  /**
   * Process log immediately for high-priority logs
   */
  private processLogImmediately(entry: LogEntry): void {
    // Output to console immediately for errors
    if (entry.level === 'ERROR' && this.config.console.enabled) {
      console.error(`[${entry.objectName}] ${entry.message}`, entry.data);
    }

    // Send to server immediately for errors
    if (entry.level === 'ERROR' && this.config.server.sendErrorsImmediately) {
      this.serverClient.sendLog(entry).catch(() => {
        // Ignore server errors for immediate processing
      });
    }
  }

  /**
   * Process queue asynchronously
   */
  private async processQueueAsync(): Promise<void> {
    if (this.isProcessingQueue || this.logQueue.length === 0) return;

    this.isProcessingQueue = true;

    try {
      // Process logs in batches
      const batchSize = Math.min(10, this.logQueue.length);
      const batch = this.logQueue.splice(0, batchSize);

      // Use Web Worker if available
      if (this.queueProcessor) {
        for (const item of batch) {
          this.queueProcessor.postMessage({
            entry: item.entry,
            priority: item.priority,
          });
        }
      } else {
        // Process in main thread
        for (const item of batch) {
          this.handleProcessedLog(item.entry);
        }
      }
    } finally {
      this.isProcessingQueue = false;

      // Continue processing if more items in queue
      if (this.logQueue.length > 0) {
        setTimeout(() => this.processQueueAsync(), 0);
      }
    }
  }

  /**
   * Handle processed log entry
   */
  private handleProcessedLog(entry: LogEntry): void {
    // Output to console
    if (this.config.console.enabled) {
      this.outputToConsoleMinimal(entry);
    }

    // Add to server batch
    if (this.config.buffering.enabled) {
      // Add to server batch (handled by batch processor)
    }
  }

  /**
   * Output to console with minimal overhead
   */
  private outputToConsoleMinimal(entry: LogEntry): void {
    const message = `[${entry.level}] [${entry.objectName}] ${entry.message}`;

    switch (entry.level) {
      case 'ERROR':
        console.error(message, entry.data);
        break;
      case 'WARN':
        console.warn(message, entry.data);
        break;
      case 'INFO':
        console.info(message, entry.data);
        break;
      case 'DEBUG':
        console.debug(message, entry.data);
        break;
      default:
        console.log(message, entry.data);
    }
  }

  /**
   * Process log batch for server
   */
  private async processLogBatch(): Promise<void> {
    if (this.logQueue.length === 0) return;

    const logsToSend = this.logQueue
      .filter(item => item.entry.level === 'ERROR' || item.priority >= 2)
      .map(item => item.entry);

    if (logsToSend.length > 0) {
      try {
        await this.serverClient.sendLogs(logsToSend);
      } catch (error) {
        // Re-queue failed logs with lower priority
        logsToSend.forEach(log => {
          this.logQueue.push({
            entry: log,
            priority: 0,
            timestamp: Date.now(),
          });
        });
      }
    }
  }

  /**
   * Check if should log (simplified)
   */
  private shouldLog(objectName: string, level: LogLevel): boolean {
    if (level > this.config.globalLevel) return false;

    const objectConfig = this.config.objects?.find(obj => obj.name === objectName);
    if (objectConfig && !objectConfig.enabled) return false;

    const objectLevel = objectConfig?.level || LogLevel.DEBUG;
    return level >= objectLevel;
  }

  /**
   * Public logging methods with reduced overhead
   */
  public error(objectName: string, methodName: string, message: string, data?: any): void {
    this.queueLog(objectName, methodName, message, data, LogLevel.ERROR, 3);
  }

  public warn(objectName: string, methodName: string, message: string, data?: any): void {
    this.queueLog(objectName, methodName, message, data, LogLevel.WARN, 2);
  }

  public info(objectName: string, methodName: string, message: string, data?: any): void {
    this.queueLog(objectName, methodName, message, data, LogLevel.INFO, 1);
  }

  public debug(objectName: string, methodName: string, message: string, data?: any): void {
    this.queueLog(objectName, methodName, message, data, LogLevel.DEBUG, 0);
  }

  public trace(objectName: string, methodName: string, message: string, data?: any): void {
    this.queueLog(objectName, methodName, message, data, LogLevel.TRACE, 0);
  }

  /**
   * Performance monitoring methods
   */
  public logPerformance(
    metricName: string,
    value: number,
    unit: string = '',
    metadata?: any
  ): void {
    if (this.config.performance.enabled) {
      this.performanceMetrics.set(metricName, {
        value: { value, unit, metadata },
        timestamp: Date.now(),
      });
    }
  }

  /**
   * Get performance metrics
   */
  public getPerformanceMetrics(): Map<string, PerformanceMetric> {
    return new Map(this.performanceMetrics);
  }

  /**
   * Get error statistics
   */
  public getErrorStatistics(): ErrorStatistics {
    return this.errorTracker.getStatistics();
  }

  /**
   * Cleanup resources
   */
  public destroy(): void {
    if (this.queueProcessor) {
      this.queueProcessor.terminate();
      this.queueProcessor = null;
    }

    if (this.batchProcessor) {
      clearInterval(this.batchProcessor);
      this.batchProcessor = null;
    }

    this.logQueue = [];
  }

  /**
   * Get queue status
   */
  public getQueueStatus(): { size: number; isProcessing: boolean } {
    return {
      size: this.logQueue.length,
      isProcessing: this.isProcessingQueue,
    };
  }
}

// Export convenience functions
export const loggerOptimized = LoggerPerformanceOptimizer.getInstance();
export const logErrorOptimized = (
  objectName: string,
  methodName: string,
  message: string,
  data?: any
) => loggerOptimized.error(objectName, methodName, message, data);
export const logWarnOptimized = (
  objectName: string,
  methodName: string,
  message: string,
  data?: any
) => loggerOptimized.warn(objectName, methodName, message, data);
export const logInfoOptimized = (
  objectName: string,
  methodName: string,
  message: string,
  data?: any
) => loggerOptimized.info(objectName, methodName, message, data);
export const logDebugOptimized = (
  objectName: string,
  methodName: string,
  message: string,
  data?: any
) => loggerOptimized.debug(objectName, methodName, message, data);
export const logTraceOptimized = (
  objectName: string,
  methodName: string,
  message: string,
  data?: any
) => loggerOptimized.trace(objectName, methodName, message, data);
