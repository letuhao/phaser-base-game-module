/**
 * Log levels enum
 */
export enum LogLevel {
  TRACE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4
}

/**
 * Log entry structure for frontend logging
 * Matches backend API expectations
 */
export interface LogEntry {
  level: string // Required: 'ERROR', 'WARN', 'INFO', 'DEBUG', 'TRACE'
  objectName: string // Required
  message: string // Required
  data?: any // Optional additional data
  methodName?: string // Optional method name
  stackTrace?: string // Optional stack trace for errors
  performance?: any // Optional performance metrics
}

/**
 * Performance metric structure
 */
export interface PerformanceMetric {
  value: any
  timestamp: number
}

/**
 * Error statistics structure
 */
export interface ErrorStatistics {
  totalErrors: number
  errorsByLevel: Record<string, number>
  errorsByObject: Record<string, number>
  recentErrors: LogEntry[]
  errorRate: number // errors per minute
}

/**
 * Server configuration for logging
 */
export interface LogServerConfig {
  enabled: boolean
  endpoint: string
  apiKey?: string
  batchSize: number
  retryAttempts: number
  retryDelay: number
  timeout: number
  sendErrorsImmediately: boolean
  sendGameEventsImmediately: boolean
  includePerformanceData: boolean
  includeUserAgent: boolean
  includeSessionData: boolean
}

/**
 * Console configuration
 */
export interface ConsoleConfig {
  enabled: boolean
  colors: boolean
  showData: boolean
  showStackTrace: boolean
  maxDataDepth: number
}

/**
 * Format options for log messages
 */
export interface FormatOptions {
  showTimestamp: boolean
  showLogLevel: boolean
  showObjectName: boolean
  useJsonStringify: boolean
  maxMessageLength: number
}

/**
 * Performance monitoring configuration
 */
export interface PerformanceConfig {
  enabled: boolean
  fpsThreshold: number
  memoryThreshold: number
  networkMonitoring: boolean
  customMetrics: string[]
}

/**
 * Buffering configuration
 */
export interface BufferingConfig {
  enabled: boolean
  maxBufferSize: number
  flushInterval: number
  persistOnUnload: boolean
}

/**
 * Error tracking configuration
 */
export interface ErrorTrackingConfig {
  enabled: boolean
  includeStackTrace: boolean
  trackUnhandledErrors: boolean
  trackPromiseRejections: boolean
  maxErrorHistory: number
}

/**
 * Session configuration
 */
export interface SessionConfig {
  enabled: boolean
  generateSessionId: boolean
  includeUserInfo: boolean
  trackPageViews: boolean
}

/**
 * Object-specific logging configuration
 */
export interface ObjectLogConfig {
  name: string
  enabled: boolean
  level: LogLevel
  includePerformance: boolean
  includeStackTrace: boolean
}

import { IConfiguration } from '../../abstract/interfaces/IConfiguration'

/**
 * Main logger configuration
 */
export interface LoggerConfig extends IConfiguration {
  globalLevel: LogLevel
  objects: ObjectLogConfig[]
  server: LogServerConfig
  console: ConsoleConfig
  formatOptions: FormatOptions
  performance: PerformanceConfig
  buffering: BufferingConfig
  errorTracking: ErrorTrackingConfig
  session: SessionConfig
}

/**
 * Game event data structure
 */
export interface GameEventData {
  eventName: string
  eventData: any
  playerId?: string
  timestamp: number
  gameState: any
}

/**
 * Server response structure
 */
export interface LogServerResponse {
  success: boolean
  message: string
  logIds?: string[]
  error?: string
  retryAfter?: number
}

/**
 * Batch log request structure
 */
export interface BatchLogRequest {
  logs: LogEntry[]
  sessionId: string
  timestamp: string
  version: string
}

/**
 * Performance monitoring data
 */
export interface PerformanceData {
  fps: number
  memory: {
    used: number
    total: number
    limit: number
  }
  network: {
    effectiveType: string
    downlink: number
    rtt: number
  }
  custom: Record<string, any>
}
