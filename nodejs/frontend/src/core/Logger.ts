import { LogLevel, LoggerConfig, DEFAULT_LOGGER_CONFIG } from '../config/LoggerConfig'
import { LogEntry, PerformanceMetric, ErrorStatistics } from '../types/logging/LoggerTypes'
import { ErrorTracker } from './ErrorTracker'
import { LogServerClient } from './LogServerClient'

/**
 * Enhanced Logger class with server integration, performance tracking, and advanced debugging
 * Provides comprehensive logging capabilities for game development and debugging
 */
export class Logger {
  private static instance: Logger
  private config: LoggerConfig
  private logBuffer: Array<LogEntry> = []
  private performanceMetrics: Map<string, PerformanceMetric> = new Map()
  private errorTracker: ErrorTracker
  private serverClient: LogServerClient
  
  private constructor(config?: Partial<LoggerConfig>) {
    this.config = { ...DEFAULT_LOGGER_CONFIG, ...config }
    this.errorTracker = new ErrorTracker(this)
    this.serverClient = new LogServerClient(this.config.server)
    
    // Initialize performance monitoring
    this.initializePerformanceMonitoring()
    
    // Setup log buffering and flushing
    this.setupLogBuffering()
    
    // Setup error tracking
    this.setupErrorTracking()
  }
  
  /**
   * Get singleton instance of Logger
   */
  public static getInstance(config?: Partial<LoggerConfig>): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger(config)
    }
    return Logger.instance
  }
  
  /**
   * Initialize performance monitoring
   */
  private initializePerformanceMonitoring(): void {
    if (this.config.performance.enabled) {
      // Monitor frame rate
      this.startFrameRateMonitoring()
      
      // Monitor memory usage
      this.startMemoryMonitoring()
      
      // Monitor network requests
      this.startNetworkMonitoring()
    }
  }
  
  /**
   * Start frame rate monitoring
   */
  private startFrameRateMonitoring(): void {
    let frameCount = 0
    let lastTime = performance.now()
    
    const measureFrameRate = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) { // Every second
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        this.performanceMetrics.set('fps', { value: fps, timestamp: currentTime })
        
        if (fps < this.config.performance.fpsThreshold) {
          this.warn('Performance', `Low FPS detected: ${fps}`, { fps, threshold: this.config.performance.fpsThreshold })
        }
        
        frameCount = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(measureFrameRate)
    }
    
    requestAnimationFrame(measureFrameRate)
  }
  
  /**
   * Start memory monitoring
   */
  private startMemoryMonitoring(): void {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory
        this.performanceMetrics.set('memory', {
          value: {
            used: Math.round(memory.usedJSHeapSize / 1048576), // MB
            total: Math.round(memory.totalJSHeapSize / 1048576), // MB
            limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
          },
          timestamp: performance.now()
        })
        
        const memoryUsage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
        if (memoryUsage > this.config.performance.memoryThreshold) {
          this.warn('Performance', `High memory usage: ${memoryUsage.toFixed(1)}%`, { memoryUsage, threshold: this.config.performance.memoryThreshold })
        }
      }, 5000) // Every 5 seconds
    }
  }
  
  /**
   * Start network monitoring
   */
  private startNetworkMonitoring(): void {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection
      this.performanceMetrics.set('network', {
        value: {
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt
        },
        timestamp: performance.now()
      })
    }
  }
  
  /**
   * Setup log buffering and flushing
   */
  private setupLogBuffering(): void {
    if (this.config.buffering.enabled) {
      // Flush logs periodically
      setInterval(() => {
        this.flushLogBuffer()
      }, this.config.buffering.flushInterval)
      
      // Flush logs before page unload
      window.addEventListener('beforeunload', () => {
        this.flushLogBuffer()
      })
    }
  }
  
  /**
   * Setup error tracking
   */
  private setupErrorTracking(): void {
    if (this.config.errorTracking.enabled) {
      // Global error handler
      window.addEventListener('error', (event) => {
        this.error('GlobalError', event.message, {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          error: event.error?.stack
        })
      })
      
      // Unhandled promise rejections
      window.addEventListener('unhandledrejection', (event) => {
        this.error('UnhandledRejection', 'Unhandled promise rejection', {
          reason: event.reason,
          stack: event.reason?.stack
        })
      })
    }
  }
  
  /**
   * Check if logging is enabled for a specific object and level
   */
  private shouldLog(objectName: string, level: LogLevel): boolean {
    // Check global level first
    if (level > this.config.globalLevel) {
      return false;
    }
    
    // Check if object logging is enabled with fallback
    if (!this.isObjectLoggingEnabled(objectName)) {
      return false;
    }
    
    // Check object-specific level with fallback
    // Note: level >= objectLevel means only logs at or above the configured level are displayed
    // TRACE(0) < DEBUG(1), so TRACE logs won't show when object is set to DEBUG level
    const objectLevel = this.getObjectLogLevel(objectName);
    return level >= objectLevel;
  }
  
  /**
   * Check if logging is enabled for a specific object with fallback
   */
  private isObjectLoggingEnabled(objectName: string): boolean {
    const objectConfig = this.config.objects?.find(obj => obj.name === objectName);
    if (objectConfig) {
      return objectConfig.enabled;
    }
    
    // Fallback: if object not found in config, enable logging with minimal settings
    return true;
  }
  
  /**
   * Get log level for a specific object with fallback
   */
  private getObjectLogLevel(objectName: string): LogLevel {
    const objectConfig = this.config.objects?.find(obj => obj.name === objectName);
    if (objectConfig) {
      return objectConfig.level;
    }
    
    // Fallback: if object not found in config, use DEBUG level
    return LogLevel.DEBUG;
  }
  
  /**
   * Check if performance logging is enabled for a specific object with fallback
   */
  private isObjectPerformanceEnabled(objectName: string): boolean {
    const objectConfig = this.config.objects?.find(obj => obj.name === objectName);
    if (objectConfig) {
      return objectConfig.includePerformance;
    }
    
    // Fallback: if object not found in config, disable performance logging
    return false;
  }
  
  /**
   * Check if stack trace logging is enabled for a specific object with fallback
   */
  private isObjectStackTraceEnabled(objectName: string): boolean {
    const objectConfig = this.config.objects?.find(obj => obj.name === objectName);
    if (objectConfig) {
      return objectConfig.includeStackTrace;
    }
    
    // Fallback: if object not found in config, disable stack trace logging
    return false;
  }
  
  /**
   * Format log message with enhanced data handling
   */
  private formatMessage(objectName: string, level: LogLevel, message: string, data?: any, methodName?: string): string {
    const parts: string[] = [];
    
    // Add timestamp
    if (this.config.formatOptions.showTimestamp) {
      const timestamp = new Date().toISOString();
      parts.push(`[${timestamp}]`);
    }
    
    // Add log level
    if (this.config.formatOptions.showLogLevel) {
      const levelName = LogLevel[level];
      parts.push(`[${levelName}]`);
    }
    
    // Add object name
    if (this.config.formatOptions.showObjectName) {
      parts.push(`[${objectName}]`);
    }
    
    // Add method name if provided
    if (methodName) {
      parts.push(`[${methodName}]`);
    }
    
    // Add message
    parts.push(message);
    
    // Add data if provided
    if (data !== undefined) {
      if (this.config.formatOptions.useJsonStringify) {
        try {
          parts.push(JSON.stringify(data, null, 2));
        } catch (error) {
          parts.push(`[Data serialization error: ${error}]`);
        }
      } else {
        parts.push(String(data));
      }
    }
    
    return parts.join(' ');
  }
  
  /**
   * Get console color for log level
   */
  private getConsoleColor(level: LogLevel): string {
    if (!this.config.console.colors) return '';
    
    switch (level) {
      case LogLevel.ERROR: return 'color: #ff0000; font-weight: bold;';
      case LogLevel.WARN: return 'color: #ffa500; font-weight: bold;';
      case LogLevel.INFO: return 'color: #0000ff;';
      case LogLevel.DEBUG: return 'color: #008000;';
      case LogLevel.TRACE: return 'color: #808080;';
      default: return '';
    }
  }
  
  /**
   * Create log entry with enhanced data
   */
  private createLogEntry(objectName: string, level: LogLevel, message: string, data?: any, methodName?: string): LogEntry {
    const entry: LogEntry = {
      level: LogLevel[level],
      objectName,
      message,
      data: this.sanitizeData(data),
      methodName,
      stackTrace: this.isObjectStackTraceEnabled(objectName) ? this.getStackTrace() : undefined,
      performance: this.isObjectPerformanceEnabled(objectName) ? this.getCurrentPerformanceMetrics() : undefined
    }
    
    return entry
  }
  
  /**
   * Sanitize data for logging (remove sensitive information, circular references)
   */
  private sanitizeData(data: any): any {
    if (data === null || data === undefined) return data
    
    try {
      // Handle circular references and complex objects
      const seen = new WeakSet()
      const sanitized = this.deepCloneAndSanitize(data, seen)
      
      // Ensure we return an object, not a string
      if (typeof sanitized === 'object' && sanitized !== null) {
        return sanitized
      } else {
        return { sanitizedValue: sanitized }
      }
    } catch (error) {
      // Return an object with error information instead of a string
      return { 
        error: 'Data sanitization failed',
        errorMessage: error instanceof Error ? error.message : String(error),
        originalDataType: typeof data,
        fallbackValue: this.createSafeFallback(data)
      }
    }
  }

  /**
   * Deep clone and sanitize data while handling circular references
   */
  private deepCloneAndSanitize(data: any, seen: WeakSet<any>): any {
    // Handle primitive types
    if (data === null || typeof data !== 'object') {
      return data
    }
    
    // Handle circular references
    if (seen.has(data)) {
      return '[Circular Reference]'
    }
    
    // Handle special object types
    if (data instanceof Date) {
      return { type: 'Date', value: data.toISOString() }
    }
    
    if (data instanceof Error) {
      return { 
        type: 'Error', 
        name: data.name, 
        message: data.message,
        stack: data.stack?.split('\n').slice(0, 3).join('\n') // Limit stack trace
      }
    }
    
    // Handle Phaser objects and other complex objects
    if (this.isPhaserObject(data)) {
      return this.sanitizePhaserObject(data)
    }
    
    // Handle arrays
    if (Array.isArray(data)) {
      seen.add(data)
      const sanitizedArray = data.map((item, index) => {
        try {
          return this.deepCloneAndSanitize(item, seen)
        } catch (error) {
          return `[Array item ${index} sanitization failed: ${error}]`
        }
      })
      seen.delete(data)
      return sanitizedArray
    }
    
    // Handle plain objects
    if (data.constructor === Object) {
      seen.add(data)
      const sanitizedObject: any = {}
      
      for (const [key, value] of Object.entries(data)) {
        // Skip sensitive fields
        if (this.isSensitiveField(key)) {
          sanitizedObject[key] = '[REDACTED]'
          continue
        }
        
        try {
          sanitizedObject[key] = this.deepCloneAndSanitize(value, seen)
        } catch (error) {
          sanitizedObject[key] = `[Field sanitization failed: ${error}]`
        }
      }
      
      seen.delete(data)
      return sanitizedObject
    }
    
    // Handle other object types
    try {
      return { 
        type: data.constructor?.name || 'Unknown Object',
        stringified: String(data),
        properties: this.extractSafeProperties(data)
      }
    } catch (error) {
      return { 
        type: 'Unserializable Object',
        error: `Failed to serialize: ${error}`,
        fallback: this.createSafeFallback(data)
      }
    }
  }

  /**
   * Check if object is a Phaser object
   */
  private isPhaserObject(obj: any): boolean {
    return obj && (
      obj.constructor?.name?.includes('Phaser') ||
      obj.constructor?.name?.includes('GameObject') ||
      obj.constructor?.name?.includes('Container') ||
      obj.constructor?.name?.includes('Scene') ||
      obj.constructor?.name?.includes('Texture') ||
      obj.constructor?.name?.includes('Image') ||
      obj.constructor?.name?.includes('Text') ||
      obj.constructor?.name?.includes('Button') ||
      typeof obj.x === 'number' && typeof obj.y === 'number' && 
      (typeof obj.width === 'number' || typeof obj.height === 'number')
    )
  }

  /**
   * Sanitize Phaser objects
   */
  private sanitizePhaserObject(obj: any): any {
    const sanitized: any = {
      type: obj.constructor?.name || 'Phaser Object',
      id: obj.id || obj.name || 'unknown',
      position: { x: obj.x, y: obj.y },
      size: { width: obj.width, height: obj.height },
      scale: { x: obj.scaleX, y: obj.scaleY },
      alpha: obj.alpha,
      visible: obj.visible,
      active: obj.active,
      interactive: obj.interactive
    }
    
    // Add additional properties if they exist
    if (obj.texture) {
      sanitized.texture = { key: obj.texture.key, frame: obj.texture.frame }
    }
    
    if (obj.text) {
      sanitized.text = obj.text
    }
    
    if (obj.children) {
      sanitized.childCount = Array.isArray(obj.children) ? obj.children.length : 0
    }
    
    return sanitized
  }

  /**
   * Extract safe properties from an object
   */
  private extractSafeProperties(obj: any): any {
    const safeProps: any = {}
    const maxProps = 10
    
    try {
      let propCount = 0
      for (const [key, value] of Object.entries(obj)) {
        if (propCount >= maxProps) break
        
        if (this.isSafeProperty(key, value)) {
          try {
            safeProps[key] = typeof value === 'object' && value !== null 
              ? this.deepCloneAndSanitize(value, new WeakSet())
              : value
          } catch (error) {
            safeProps[key] = `[Property serialization failed: ${error}]`
          }
          propCount++
        }
      }
    } catch (error) {
      safeProps.error = `Failed to extract properties: ${error}`
    }
    
    return safeProps
  }

  /**
   * Check if a property is safe to serialize
   */
  private isSafeProperty(key: string, value: any): boolean {
    // Skip functions, symbols, and complex objects
    if (typeof value === 'function' || typeof value === 'symbol') {
      return false
    }
    
    // Skip sensitive fields
    if (this.isSensitiveField(key)) {
      return false
    }
    
    // Skip very large objects
    if (typeof value === 'object' && value !== null) {
      try {
        const size = JSON.stringify(value).length
        if (size > 10000) { // 10KB limit
          return false
        }
      } catch (error) {
        return false
      }
    }
    
    return true
  }

  /**
   * Create a safe fallback representation
   */
  private createSafeFallback(data: any): any {
    if (data === null) return null
    if (typeof data === 'undefined') return undefined
    
    try {
      return {
        type: typeof data,
        constructor: data.constructor?.name || 'Unknown',
        stringified: String(data),
        length: data.length,
        keys: typeof data === 'object' ? Object.keys(data).slice(0, 5) : undefined
      }
    } catch (error) {
      return {
        type: 'Unserializable',
        error: `Fallback creation failed: ${error}`
      }
    }
  }
  
  /**
   * Check if field name is sensitive
   */
  private isSensitiveField(fieldName: string): boolean {
    const sensitiveFields = ['password', 'token', 'key', 'secret', 'auth', 'credential']
    return sensitiveFields.some(field => fieldName.toLowerCase().includes(field))
  }
  
  /**
   * Get current stack trace
   */
  private getStackTrace(): string {
    try {
      throw new Error()
    } catch (error) {
             if (error instanceof Error) {
         return error.stack || 'Stack trace not available'
       }
       return 'Stack trace not available'
    }
  }
  
  /**
   * Get current performance metrics
   */
  private getCurrentPerformanceMetrics(): any {
    const metrics: any = {}
    
    this.performanceMetrics.forEach((metric, key) => {
      metrics[key] = metric.value
    })
    
    return metrics
  }
  

  
  /**
   * Output log to console and buffer
   */
  private outputLog(entry: LogEntry): void {
    // Output to console
    if (this.config.console.enabled) {
      this.outputToConsole(entry)
    }
    
    // Add to buffer
    if (this.config.buffering.enabled) {
      this.logBuffer.push(entry)
      
      // Flush if buffer is full
      if (this.logBuffer.length >= this.config.buffering.maxBufferSize) {
        this.flushLogBuffer()
      }
    }
    
    // Send to server immediately for high priority logs
    if (entry.level === 'ERROR' && this.config.server.sendErrorsImmediately) {
      this.serverClient.sendLog(entry)
    }
  }
  
  /**
   * Output log to console
   */
  private outputToConsole(entry: LogEntry): void {
    const color = this.getConsoleColor(LogLevel[entry.level as keyof typeof LogLevel])
    const formattedMessage = this.formatMessage(entry.objectName, LogLevel[entry.level as keyof typeof LogLevel], entry.message, entry.data, entry.methodName)
    
    if (color) {
      console.log(`%c${formattedMessage}`, color)
    } else {
      console.log(formattedMessage)
    }
    
    // Log additional data if present
    if (entry.data && this.config.console.showData) {
      console.log('Data:', entry.data)
    }
    
    // Log stack trace for errors
    if (entry.stackTrace && entry.level === 'ERROR' && this.config.console.showStackTrace) {
      console.log('Stack Trace:', entry.stackTrace)
    }
  }
  
  /**
   * Flush log buffer to server
   */
  private async flushLogBuffer(): Promise<void> {
    if (this.logBuffer.length === 0) return
    
    const logsToSend = [...this.logBuffer]
    this.logBuffer = []
    
    try {
      await this.serverClient.sendLogs(logsToSend)
    } catch (error) {
      // Re-add logs to buffer if sending failed
      this.logBuffer.unshift(...logsToSend)
      console.error('Failed to send logs to server:', error)
    }
  }
  
  /**
   * Log error message with enhanced error tracking
   */
  public error(objectName: string, message: string, data?: any, methodName?: string): void {
    if (this.shouldLog(objectName, LogLevel.ERROR)) {
      const entry = this.createLogEntry(objectName, LogLevel.ERROR, message, data, methodName)
      this.outputLog(entry)
      
      // Track error for analytics
      this.errorTracker.trackError(entry)
    }
  }
  
  /**
   * Log warning message
   */
  public warn(objectName: string, message: string, data?: any, methodName?: string): void {
    if (this.shouldLog(objectName, LogLevel.WARN)) {
      const entry = this.createLogEntry(objectName, LogLevel.WARN, message, data, methodName)
      this.outputLog(entry)
    }
  }
  
  /**
   * Log info message
   */
  public info(objectName: string, message: string, data?: any, methodName?: string): void {
    if (this.shouldLog(objectName, LogLevel.INFO)) {
      const entry = this.createLogEntry(objectName, LogLevel.INFO, message, data, methodName)
      this.outputLog(entry)
    }
  }
  
  /**
   * Log debug message
   */
  public debug(objectName: string, message: string, data?: any, methodName?: string): void {
    if (this.shouldLog(objectName, LogLevel.DEBUG)) {
      const entry = this.createLogEntry(objectName, LogLevel.DEBUG, message, data, methodName)
      this.outputLog(entry)
    }
  }
  
  /**
   * Log trace message
   */
  public trace(objectName: string, message: string, data?: any, methodName?: string): void {
    if (this.shouldLog(objectName, LogLevel.TRACE)) {
      const entry = this.createLogEntry(objectName, LogLevel.TRACE, message, data, methodName)
      this.outputLog(entry)
    }
  }
  
  /**
   * Convenience method for logging with current timestamp
   */
  public log(objectName: string, message: string, data?: any, methodName?: string): void {
    this.info(objectName, message, data, methodName)
  }
  
  /**
   * Log performance metric
   */
  public logPerformance(metricName: string, value: number, unit: string = '', metadata?: any): void {
    if (this.config.performance.enabled) {
      this.performanceMetrics.set(metricName, {
        value: { value, unit, metadata },
        timestamp: performance.now()
      })
      
      this.debug('Performance', `Metric: ${metricName} = ${value}${unit}`, metadata)
    }
  }
  
  /**
   * Log game event
   */
  public logGameEvent(eventName: string, eventData: any, playerId?: string): void {
    const data = {
      eventName,
      eventData,
      playerId,
      timestamp: Date.now(),
      gameState: this.getGameState()
    }
    
    this.info('GameEvent', `Game event: ${eventName}`, data)
    
    // Send game events to server immediately
    if (this.config.server.sendGameEventsImmediately) {
      this.serverClient.sendGameEvent(data)
    }
  }
  
  /**
   * Get current game state for logging
   */
  private getGameState(): any {
    // This should be implemented based on your game architecture
    return {
      scene: 'unknown',
      playerPosition: { x: 0, y: 0 },
      gameTime: Date.now()
    }
  }
  
  /**
   * Get current configuration
   */
  public getConfig(): LoggerConfig {
    return { ...this.config }
  }
  
  /**
   * Update logger configuration
   */
  public updateConfig(newConfig: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...newConfig }
    
    // Update server client config
    if (newConfig.server) {
      this.serverClient.updateConfig(newConfig.server)
    }
  }
  
  /**
   * Enable/disable logging for specific object
   */
  public setObjectEnabled(objectName: string, enabled: boolean): void {
    const objectConfig = this.config.objects.find((obj: any) => obj.name === objectName)
    if (objectConfig) {
      objectConfig.enabled = enabled
    }
  }
  
  /**
   * Set log level for specific object
   */
  public setObjectLevel(objectName: string, level: LogLevel): void {
    const objectConfig = this.config.objects.find((obj: any) => obj.name === objectName)
    if (objectConfig) {
      objectConfig.level = level
    }
  }
  
  /**
   * Set global log level
   */
  public setGlobalLevel(level: LogLevel): void {
    this.config.globalLevel = level
  }
  
  /**
   * Get global log level
   */
  public getGlobalLevel(): LogLevel {
    return this.config.globalLevel
  }
  
  /**
   * Check if server logging is enabled
   */
  public isServerLoggingEnabled(): boolean {
    return this.config.server.enabled
  }
  
  /**
   * Toggle JSON stringify formatting
   */
  public setUseJsonStringify(useJson: boolean): void {
    this.config.formatOptions.useJsonStringify = useJson
  }
  
  /**
   * Toggle console colors
   */
  public setConsoleColors(enabled: boolean): void {
    this.config.console.colors = enabled
  }
  
  /**
   * Get performance metrics
   */
  public getPerformanceMetrics(): Map<string, PerformanceMetric> {
    return new Map(this.performanceMetrics)
  }
  
  /**
   * Get error statistics
   */
  public getErrorStatistics(): ErrorStatistics {
    return this.errorTracker.getStatistics()
  }
  
  /**
   * Manually flush log buffer
   */
  public async flushLogs(): Promise<void> {
    await this.flushLogBuffer()
  }
  
  /**
   * Clear log buffer
   */
  public clearLogBuffer(): void {
    this.logBuffer = []
  }
  
  /**
   * Get log buffer size
   */
  public getLogBufferSize(): number {
    return this.logBuffer.length
  }
  
  /**
   * Test server connection
   */
  public async testServerConnection(): Promise<boolean> {
    try {
      return await this.serverClient.testConnection()
    } catch (error) {
      this.error('Logger', 'Server connection test failed', error)
      return false
    }
  }
  
  /**
   * Get server status
   */
  public async getServerStatus(): Promise<{ online: boolean; endpoint: string; lastCheck: Date }> {
    try {
      return await this.serverClient.getServerStatus()
    } catch (error) {
      this.error('Logger', 'Failed to get server status', error)
      return {
        online: false,
        endpoint: this.config.server.endpoint,
        lastCheck: new Date()
      }
    }
  }
}

// Export convenience functions for easy usage
export const logger = Logger.getInstance()

// Export convenience methods for direct usage
export const logError = (objectName: string, message: string, data?: any, methodName?: string) => logger.error(objectName, message, data, methodName)
export const logWarn = (objectName: string, message: string, data?: any, methodName?: string) => logger.warn(objectName, message, data, methodName)
export const logInfo = (objectName: string, message: string, data?: any, methodName?: string) => logger.info(objectName, message, data, methodName)
export const logDebug = (objectName: string, message: string, data?: any, methodName?: string) => logger.debug(objectName, message, data, methodName)
export const logTrace = (objectName: string, message: string, data?: any, methodName?: string) => logger.trace(objectName, message, data, methodName)
export const log = (objectName: string, message: string, data?: any, methodName?: string) => logger.log(objectName, message, data, methodName)
export const logPerformance = (metricName: string, value: number, unit?: string, metadata?: any) => logger.logPerformance(metricName, value, unit, metadata)
export const logGameEvent = (eventName: string, eventData: any, playerId?: string) => logger.logGameEvent(eventName, eventData, playerId)
