import { LogLevel, LoggerConfig, ObjectLogConfig, LogServerConfig, ConsoleConfig, FormatOptions, PerformanceConfig, BufferingConfig, ErrorTrackingConfig, SessionConfig } from '../types/logging/LoggerTypes'


// Re-export types and values for convenience
export { LogLevel }
export type { LoggerConfig, ObjectLogConfig, LogServerConfig, ConsoleConfig, FormatOptions, PerformanceConfig, BufferingConfig, ErrorTrackingConfig, SessionConfig }

/**
 * Default logger configuration
 */
export const DEFAULT_LOGGER_CONFIG: LoggerConfig = {
  id: 'default-logger-config',
  name: 'Default Logger Configuration',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: {
    description: 'Default configuration for the enhanced logger system',
    author: 'System',
    environment: 'development'
  },
  globalLevel: LogLevel.INFO,
  
  objects: [
    { name: 'Game', enabled: true, level: LogLevel.DEBUG, includePerformance: true, includeStackTrace: true },
    { name: 'Scene', enabled: true, level: LogLevel.DEBUG, includePerformance: true, includeStackTrace: true },
    { name: 'Player', enabled: true, level: LogLevel.INFO, includePerformance: false, includeStackTrace: true },
    { name: 'Network', enabled: true, level: LogLevel.DEBUG, includePerformance: true, includeStackTrace: true },
    { name: 'Performance', enabled: true, level: LogLevel.INFO, includePerformance: true, includeStackTrace: false },
    { name: 'Error', enabled: true, level: LogLevel.ERROR, includePerformance: true, includeStackTrace: true }
  ],
  
  server: {
    enabled: true,
    endpoint: '/api/logs',
    apiKey: undefined,
    batchSize: 50,
    retryAttempts: 3,
    retryDelay: 1000,
    timeout: 5000,
    sendErrorsImmediately: true,
    sendGameEventsImmediately: true,
    includePerformanceData: true,
    includeUserAgent: true,
    includeSessionData: true
  },
  
  console: {
    enabled: true,
    colors: true,
    showData: true,
    showStackTrace: true,
    maxDataDepth: 3
  },
  
  formatOptions: {
    showTimestamp: true,
    showLogLevel: true,
    showObjectName: true,
    useJsonStringify: true,
    maxMessageLength: 1000
  },
  
  performance: {
    enabled: true,
    fpsThreshold: 30,
    memoryThreshold: 80,
    networkMonitoring: true,
    customMetrics: []
  },
  
  buffering: {
    enabled: true,
    maxBufferSize: 100,
    flushInterval: 5000, // 5 seconds
    persistOnUnload: true
  },
  
  errorTracking: {
    enabled: true,
    includeStackTrace: true,
    trackUnhandledErrors: true,
    trackPromiseRejections: true,
    maxErrorHistory: 100
  },
  
  session: {
    enabled: true,
    generateSessionId: true,
    includeUserInfo: false,
    trackPageViews: true
  },
  
  // IConfiguration interface methods
  validate(): string[] {
    return validateLoggerConfig(this)
  },
  
  clone(overrides?: Partial<LoggerConfig>): LoggerConfig {
    return createLoggerConfig(overrides || {})
  },
  
  toJSON(): string {
    return JSON.stringify(this, null, 2)
  },
  
  fromJSON(json: string): LoggerConfig {
    try {
      const parsed = JSON.parse(json)
      return createLoggerConfig(parsed)
    } catch (error) {
      throw new Error(`Failed to parse JSON: ${error}`)
    }
  },
  
  isValid(): boolean {
    return this.validate().length === 0
  },
  
  getSummary() {
    return {
      id: this.id,
      name: this.name,
      version: this.version,
      isActive: this.isActive,
      lastModified: this.lastModified,
      isValid: this.isValid(),
      validationErrors: this.validate(),
      metadataKeys: Object.keys(this.metadata)
    }
  }
}

/**
 * Check if logging is enabled for a specific object
 * @deprecated Use Logger instance methods instead
 */
export function isObjectLoggingEnabled(objectName: string): boolean {
  const objectConfig = DEFAULT_LOGGER_CONFIG.objects.find(obj => obj.name === objectName)
  return objectConfig ? objectConfig.enabled : true
}

/**
 * Get log level for a specific object
 * @deprecated Use Logger instance methods instead
 */
export function getObjectLogLevel(objectName: string): LogLevel {
  const objectConfig = DEFAULT_LOGGER_CONFIG.objects.find(obj => obj.name === objectName)
  return objectConfig ? objectConfig.level : DEFAULT_LOGGER_CONFIG.globalLevel
}

/**
 * Check if performance logging is enabled for a specific object
 * @deprecated Use Logger instance methods instead
 */
export function isObjectPerformanceEnabled(objectName: string): boolean {
  const objectConfig = DEFAULT_LOGGER_CONFIG.objects.find(obj => obj.name === objectName)
  return objectConfig ? objectConfig.includePerformance : false
}

/**
 * Check if stack trace logging is enabled for a specific object
 * @deprecated Use Logger instance methods instead
 */
export function isObjectStackTraceEnabled(objectName: string): boolean {
  const objectConfig = DEFAULT_LOGGER_CONFIG.objects.find(obj => obj.name === objectName)
  return objectConfig ? objectConfig.includeStackTrace : false
}

/**
 * Create a custom logger configuration
 */
export function createLoggerConfig(overrides: Partial<LoggerConfig>): LoggerConfig {
  return {
    ...DEFAULT_LOGGER_CONFIG,
    ...overrides,
    objects: [
      ...DEFAULT_LOGGER_CONFIG.objects,
      ...(overrides.objects || [])
    ]
  }
}

/**
 * Create a development logger configuration
 */
export function createDevelopmentConfig(): LoggerConfig {
  return createLoggerConfig({
    globalLevel: LogLevel.DEBUG,
    console: {
      ...DEFAULT_LOGGER_CONFIG.console,
      colors: true,
      showData: true,
      showStackTrace: true
    },
    performance: {
      ...DEFAULT_LOGGER_CONFIG.performance,
      enabled: true
    },
    errorTracking: {
      ...DEFAULT_LOGGER_CONFIG.errorTracking,
      enabled: true
    }
  })
}

/**
 * Create a production logger configuration
 */
export function createProductionConfig(): LoggerConfig {
  return createLoggerConfig({
    globalLevel: LogLevel.WARN,
    console: {
      ...DEFAULT_LOGGER_CONFIG.console,
      colors: false,
      showData: false,
      showStackTrace: false
    },
    server: {
      ...DEFAULT_LOGGER_CONFIG.server,
      enabled: true,
      sendErrorsImmediately: true
    },
    performance: {
      ...DEFAULT_LOGGER_CONFIG.performance,
      enabled: true
    },
    errorTracking: {
      ...DEFAULT_LOGGER_CONFIG.errorTracking,
      enabled: true
    }
  })
}

/**
 * Create a testing logger configuration
 */
export function createTestingConfig(): LoggerConfig {
  return createLoggerConfig({
    globalLevel: LogLevel.ERROR,
    console: {
      ...DEFAULT_LOGGER_CONFIG.console,
      enabled: false
    },
    server: {
      ...DEFAULT_LOGGER_CONFIG.server,
      enabled: false
    },
    performance: {
      ...DEFAULT_LOGGER_CONFIG.performance,
      enabled: false
    },
    errorTracking: {
      ...DEFAULT_LOGGER_CONFIG.errorTracking,
      enabled: false
    }
  })
}

/**
 * Validate logger configuration
 */
export function validateLoggerConfig(config: LoggerConfig): string[] {
  const errors: string[] = []
  
  if (config.globalLevel < LogLevel.TRACE || config.globalLevel > LogLevel.ERROR) {
    errors.push('Invalid global log level')
  }
  
  if (config.server.enabled && !config.server.endpoint) {
    errors.push('Server endpoint is required when server logging is enabled')
  }
  
  if (config.buffering.enabled && config.buffering.maxBufferSize <= 0) {
    errors.push('Buffer size must be greater than 0')
  }
  
  if (config.buffering.enabled && config.buffering.flushInterval <= 0) {
    errors.push('Flush interval must be greater than 0')
  }
  
  if (config.performance.enabled && config.performance.fpsThreshold <= 0) {
    errors.push('FPS threshold must be greater than 0')
  }
  
  if (config.performance.enabled && config.performance.memoryThreshold <= 0 || config.performance.memoryThreshold > 100) {
    errors.push('Memory threshold must be between 1 and 100')
  }
  
  return errors
}

/**
 * Get configuration for specific environment
 */
export function getEnvironmentConfig(environment: string): LoggerConfig {
  switch (environment.toLowerCase()) {
    case 'development':
    case 'dev':
      return createDevelopmentConfig()
    case 'production':
    case 'prod':
      return createProductionConfig()
    case 'testing':
    case 'test':
      return createTestingConfig()
    default:
      return DEFAULT_LOGGER_CONFIG
  }
}
