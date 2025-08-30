import { LogLevel } from '../../types/logging/LoggerTypes'
import { LoggerConfig } from '../../types/logging/LoggerTypes'

/**
 * Logging configuration for Levis2025R3 scene
 * Default: DEBUG level, both console and server logging enabled
 */
// Create a LoggerConfig implementation
const createLevis2025R3LoggingConfig = (): LoggerConfig => {
  const config: LoggerConfig = {
    id: 'levis2025R3-logging-config',
    name: 'Levis2025R3 Logging Configuration',
    version: '1.0.0',
    isActive: true,
    lastModified: new Date(),
    metadata: {
      scene: 'levis2025R3',
      environment: 'development'
    },
    globalLevel: LogLevel.DEBUG,
  
  objects: [
    // Core Logger System
    { name: 'Logger', level: LogLevel.DEBUG, enabled: true, includePerformance: true, includeStackTrace: true },
    { name: 'LoggingConfigLoader', level: LogLevel.DEBUG, enabled: true, includePerformance: true, includeStackTrace: true },
    { name: 'LogServerClient', level: LogLevel.DEBUG, enabled: true, includePerformance: true, includeStackTrace: true },
    { name: 'HttpClient', level: LogLevel.DEBUG, enabled: true, includePerformance: true, includeStackTrace: false },
    { name: 'ErrorTracker', level: LogLevel.DEBUG, enabled: true, includePerformance: true, includeStackTrace: true },
    
    // Game Engine
    { name: 'Game', level: LogLevel.DEBUG, enabled: true, includePerformance: true, includeStackTrace: true },
    { name: 'Levis2025R3WheelScene', level: LogLevel.DEBUG, enabled: true, includePerformance: true, includeStackTrace: true },
    
    // Abstract Interfaces
    { name: 'IConfiguration', level: LogLevel.DEBUG, enabled: true, includePerformance: false, includeStackTrace: false },
    { name: 'IGameObject', level: LogLevel.DEBUG, enabled: true, includePerformance: false, includeStackTrace: false },
    { name: 'IHttpClient', level: LogLevel.DEBUG, enabled: true, includePerformance: false, includeStackTrace: false },
    { name: 'IWebhookClient', level: LogLevel.DEBUG, enabled: true, includePerformance: false, includeStackTrace: false },
    
    // Configuration
    { name: 'LoggerConfig', level: LogLevel.DEBUG, enabled: true, includePerformance: false, includeStackTrace: false },
    { name: 'BackendConfig', level: LogLevel.DEBUG, enabled: true, includePerformance: false, includeStackTrace: false },
    
    // Main Entry Points
    { name: 'Main', level: LogLevel.DEBUG, enabled: true, includePerformance: false, includeStackTrace: true },
    { name: 'App', level: LogLevel.DEBUG, enabled: true, includePerformance: false, includeStackTrace: true },
    
    // Performance Monitoring
    { name: 'Performance', level: LogLevel.DEBUG, enabled: true, includePerformance: true, includeStackTrace: false },
    { name: 'GameEvent', level: LogLevel.DEBUG, enabled: true, includePerformance: false, includeStackTrace: false },
    
    // Error Handling
    { name: 'GlobalError', level: LogLevel.ERROR, enabled: true, includePerformance: false, includeStackTrace: true },
    { name: 'UnhandledRejection', level: LogLevel.ERROR, enabled: true, includePerformance: false, includeStackTrace: true },
  ],
  
  server: {
    enabled: true,                 // Enable server logging
    endpoint: '',                  // Will be set by backend config
    apiKey: undefined,
    batchSize: 10,
    retryAttempts: 1,             // Only 1 retry as per requirements
    retryDelay: 3000,             // 3000ms delay as per requirements
    timeout: 10000,
    sendErrorsImmediately: true,
    sendGameEventsImmediately: true,
    includePerformanceData: true,
    includeUserAgent: true,
    includeSessionData: true
  },
  
  console: {
    enabled: true,                 // Enable console logging
    colors: true,                  // Enable colored console output
    showData: true,
    showStackTrace: true,
    maxDataDepth: 3
  },
  
  formatOptions: {
    showTimestamp: true,           // Show timestamp
    showLogLevel: true,            // Show log level
    showObjectName: true,          // Show object name
    useJsonStringify: true,        // Use JSON.stringify for objects
    maxMessageLength: 200
  },
  
  performance: {
    enabled: true,                 // Enable performance monitoring
    fpsThreshold: 30,
    memoryThreshold: 80,
    networkMonitoring: true,
    customMetrics: ['renderTime', 'updateTime']
  },
  
  buffering: {
    enabled: true,                 // Enable log buffering
    maxBufferSize: 50,
    flushInterval: 5000,           // Flush every 5 seconds
    persistOnUnload: true
  },
  
  errorTracking: {
    enabled: true,                 // Enable error tracking
    includeStackTrace: true,
    trackUnhandledErrors: true,
    trackPromiseRejections: true,
    maxErrorHistory: 100
  },
  
  session: {
    enabled: true,                 // Enable session tracking
    generateSessionId: true,
    includeUserInfo: true,
    trackPageViews: true
  },
  
  // Required IConfiguration methods
  validate(): string[] {
    const errors: string[] = []
    if (!this.id) errors.push('ID is required')
    if (!this.name) errors.push('Name is required')
    if (!this.version) errors.push('Version is required')
    return errors
  },
  
  clone(overrides?: Partial<LoggerConfig>): LoggerConfig {
    return { ...this, ...overrides }
  },
  
  toJSON(): string {
    return JSON.stringify(this)
  },
  
  fromJSON(json: string): LoggerConfig {
    return JSON.parse(json)
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

  return config
}

export const LEVIS2025R3_LOGGING_CONFIG = createLevis2025R3LoggingConfig()
export default LEVIS2025R3_LOGGING_CONFIG
