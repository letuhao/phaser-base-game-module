/**
 * Error System Enums
 *
 * Enums for scene error handling and management.
 */

// ============================================================================
// ERROR ENUMS
// ============================================================================

/**
 * Scene error types enum
 */
export enum SceneErrorType {
  VALIDATION_ERROR = 'validation_error',
  CONFIGURATION_ERROR = 'configuration_error',
  RUNTIME_ERROR = 'runtime_error',
  PERFORMANCE_ERROR = 'performance_error',
  MEMORY_ERROR = 'memory_error',
  NETWORK_ERROR = 'network_error',
  PERMISSION_ERROR = 'permission_error',
  UNKNOWN_ERROR = 'unknown_error',
}

/**
 * Scene error severity levels enum
 */
export enum SceneErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}
