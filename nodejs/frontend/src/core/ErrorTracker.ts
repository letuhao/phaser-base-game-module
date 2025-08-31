import { LogEntry, ErrorStatistics } from '../types/logging/LoggerTypes'
import { Logger } from './Logger'

/**
 * Error tracking and statistics class
 * Provides comprehensive error monitoring and analytics
 */
export class ErrorTracker {
  private logger: Logger
  private errorHistory: LogEntry[] = []
  private errorCounts: Map<string, number> = new Map()
  private objectErrorCounts: Map<string, number> = new Map()
  private errorRateWindow: number[] = [] // Timestamps for rate calculation
  private maxHistorySize: number
  
  constructor(logger: Logger) {
    this.logger = logger
    this.maxHistorySize = 100 // Default max history size
  }
  
  /**
   * Track an error entry
   */
  public trackError(errorEntry: LogEntry): void {
    // Add to history
    this.errorHistory.push(errorEntry)
    
    // Limit history size
    if (this.errorHistory.length > this.maxHistorySize) {
      this.errorHistory.shift()
    }
    
    // Update error counts by level
    const level = errorEntry.level
    const currentCount = this.errorCounts.get(level) || 0
    this.errorCounts.set(level, currentCount + 1)
    
    // Update error counts by object
    const objectName = errorEntry.objectName
    const currentObjectCount = this.objectErrorCounts.get(objectName) || 0
    this.objectErrorCounts.set(objectName, currentObjectCount + 1)
    
    // Update error rate window
    const now = Date.now()
    this.errorRateWindow.push(now)
    
    // Keep only errors from the last minute for rate calculation
    const oneMinuteAgo = now - 60000
    this.errorRateWindow = this.errorRateWindow.filter(timestamp => timestamp > oneMinuteAgo)
    
    // Log error tracking
    this.logger.debug('ErrorTracker', 'trackError', `Error tracked: ${errorEntry.message}`, {
      level: errorEntry.level,
      objectName: errorEntry.objectName,
      totalErrors: this.errorHistory.length,
      errorRate: this.calculateErrorRate()
    })
  }
  
  /**
   * Calculate current error rate (errors per minute)
   */
  private calculateErrorRate(): number {
    const now = Date.now()
    const oneMinuteAgo = now - 60000
    
    // Count errors in the last minute
    const recentErrors = this.errorRateWindow.filter(timestamp => timestamp > oneMinuteAgo)
    
    return recentErrors.length
  }
  
  /**
   * Get error statistics
   */
  public getStatistics(): ErrorStatistics {
    const recentErrors = this.errorHistory.slice(-10) // Last 10 errors
    
    return {
      totalErrors: this.errorHistory.length,
      errorsByLevel: Object.fromEntries(this.errorCounts),
      errorsByObject: Object.fromEntries(this.objectErrorCounts),
      recentErrors,
      errorRate: this.calculateErrorRate()
    }
  }
  
  /**
   * Get errors by level
   */
  public getErrorsByLevel(level: string): LogEntry[] {
    return this.errorHistory.filter(error => error.level === level)
  }
  
  /**
   * Get errors by object
   */
  public getErrorsByObject(objectName: string): LogEntry[] {
    return this.errorHistory.filter(error => error.objectName === objectName)
  }
  
  /**
   * Get errors in time range
   * Note: Since LogEntry no longer has timestamp, this returns all errors
   * TODO: Implement proper timestamp tracking if needed
   */
  public getErrorsInTimeRange(_startTime: Date, _endTime: Date): LogEntry[] {
    // For now, return all errors since we don't have timestamps
    // In a real implementation, you might want to add timestamps when errors are tracked
    return this.errorHistory
  }
  
  /**
   * Get most frequent errors
   */
  public getMostFrequentErrors(limit: number = 10): Array<{ message: string; count: number; level: string }> {
    const messageCounts = new Map<string, { count: number; level: string }>()
    
    this.errorHistory.forEach(error => {
      const key = `${error.level}:${error.message}`
      const existing = messageCounts.get(key)
      
      if (existing) {
        existing.count++
      } else {
        messageCounts.set(key, { count: 1, level: error.level })
      }
    })
    
    // Sort by count and return top results
    return Array.from(messageCounts.entries())
      .map(([key, data]) => ({
        message: key.split(':')[1],
        count: data.count,
        level: data.level
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }
  
  /**
   * Get error trends over time
   */
  public getErrorTrends(timeWindowMinutes: number = 60): Array<{ timestamp: number; count: number }> {
    const now = Date.now()
    const windowSize = timeWindowMinutes * 60 * 1000
    const intervals = 10 // Number of intervals to return
    
    const intervalSize = windowSize / intervals
    const trends: Array<{ timestamp: number; count: number }> = []
    
    for (let i = 0; i < intervals; i++) {
      const intervalStart = now - windowSize + (i * intervalSize)
      
      // Since LogEntry no longer has timestamp, we'll use a simple count
      // In a real implementation, you might want to add timestamps when errors are tracked
      const count = this.errorHistory.length
      
      trends.push({
        timestamp: intervalStart,
        count
      })
    }
    
    return trends
  }
  
  /**
   * Clear error history
   */
  public clearHistory(): void {
    this.errorHistory = []
    this.errorCounts.clear()
    this.objectErrorCounts.clear()
    this.errorRateWindow = []
    
    this.logger.info('ErrorTracker', 'clearHistory', 'Error history cleared')
  }
  
  /**
   * Set maximum history size
   */
  public setMaxHistorySize(size: number): void {
    this.maxHistorySize = size
    
    // Trim history if necessary
    if (this.errorHistory.length > size) {
      this.errorHistory = this.errorHistory.slice(-size)
    }
    
    this.logger.debug('ErrorTracker', 'setMaxHistorySize', `Max history size set to ${size}`)
  }
  
  /**
   * Export error data for analysis
   */
  public exportErrorData(): any {
    return {
      statistics: this.getStatistics(),
      mostFrequentErrors: this.getMostFrequentErrors(),
      errorTrends: this.getErrorTrends(),
      exportTimestamp: new Date().toISOString(),
      totalErrors: this.errorHistory.length
    }
  }
  
  /**
   * Check if error rate is above threshold
   */
  public isErrorRateHigh(threshold: number = 10): boolean {
    return this.calculateErrorRate() > threshold
  }
  
  /**
   * Get error rate alert level
   */
  public getErrorRateAlertLevel(): 'normal' | 'warning' | 'critical' {
    const rate = this.calculateErrorRate()
    
    if (rate <= 5) return 'normal'
    if (rate <= 20) return 'warning'
    return 'critical'
  }
  
  /**
   * Get memory usage statistics
   */
  public getMemoryUsage(): { historySize: number; totalErrors: number; memoryEstimate: number } {
    const historySize = this.errorHistory.length
    const totalErrors = this.errorHistory.length
    
    // Rough estimate of memory usage (bytes)
    const memoryEstimate = historySize * 1024 // Assume ~1KB per error entry
    
    return {
      historySize,
      totalErrors,
      memoryEstimate
    }
  }
}
