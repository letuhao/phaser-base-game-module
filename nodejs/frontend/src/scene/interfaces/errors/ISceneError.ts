/**
 * Scene Error Interface
 * 
 * Defines error handling for scene system operations.
 */

/**
 * Scene error types
 */
export enum SceneErrorType {
  CONFIGURATION_ERROR = 'configuration_error',
  BUILD_ERROR = 'build_error',
  VALIDATION_ERROR = 'validation_error',
  ELEMENT_ERROR = 'element_error',
  TRANSITION_ERROR = 'transition_error',
  MANAGER_ERROR = 'manager_error',
  SYSTEM_ERROR = 'system_error',
  UNKNOWN_ERROR = 'unknown_error'
}

/**
 * Scene error severity levels
 */
export enum SceneErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

/**
 * Scene error context
 */
export interface SceneErrorContext {
  sceneId?: string;
  elementId?: string;
  operation?: string;
  timestamp: number;
  metadata?: Record<string, any>;
}

/**
 * Scene error interface
 */
export interface ISceneError {
  readonly errorId: string;
  readonly errorType: SceneErrorType;
  readonly errorSeverity: SceneErrorSeverity;
  readonly errorMessage: string;
  readonly errorCode: string;
  readonly errorContext: SceneErrorContext;
  readonly originalError?: Error;
  readonly stackTrace?: string;
  readonly errorTimestamp: number;
  readonly errorMetadata: Record<string, any>;
  
  /** Set error type */
  setErrorType(type: SceneErrorType): this;
  
  /** Set error severity */
  setErrorSeverity(severity: SceneErrorSeverity): this;
  
  /** Set error message */
  setErrorMessage(message: string): this;
  
  /** Set error code */
  setErrorCode(code: string): this;
  
  /** Set error context */
  setErrorContext(context: SceneErrorContext): this;
  
  /** Set original error */
  setOriginalError(error: Error): this;
  
  /** Set stack trace */
  setStackTrace(stack: string): this;
  
  /** Set error metadata */
  setErrorMetadata(metadata: Record<string, any>): this;
  
  /** Get error type */
  getErrorType(): SceneErrorType;
  
  /** Get error severity */
  getErrorSeverity(): SceneErrorSeverity;
  
  /** Get error message */
  getErrorMessage(): string;
  
  /** Get error code */
  getErrorCode(): string;
  
  /** Get error context */
  getErrorContext(): SceneErrorContext;
  
  /** Get original error */
  getOriginalError(): Error | undefined;
  
  /** Get stack trace */
  getStackTrace(): string | undefined;
  
  /** Get error metadata */
  getErrorMetadata(): Record<string, any>;
  
  /** Check if error is recoverable */
  isRecoverable(): boolean;
  
  /** Check if error is critical */
  isCritical(): boolean;
  
  /** Get error summary */
  getErrorSummary(): string;
  
  /** Convert to JSON */
  toJSON(): string;
  
  /** Clone error */
  clone(): ISceneError;
}
