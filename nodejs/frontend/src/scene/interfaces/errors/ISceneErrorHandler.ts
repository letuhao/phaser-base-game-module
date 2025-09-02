/**
 * Scene Error Handler Interface
 *
 * Defines error handling functionality for scene system.
 */

import type { ISceneError } from './ISceneError';
import { SceneLogLevel, ErrorHandlingStrategy } from '../../enums';
import { SceneErrorType, SceneErrorSeverity } from './ISceneError';

// ErrorHandlingStrategy is now imported from centralized enums

/**
 * Error handling configuration
 */
export interface ErrorHandlingConfig {
  strategy: ErrorHandlingStrategy;
  maxRetries?: number;
  retryDelay?: number;
  fallbackAction?: string;
  customHandler?: string;
  logLevel?: SceneLogLevel;
  metadata?: Record<string, any>;
}

/**
 * Error handling result
 */
export interface ErrorHandlingResult {
  success: boolean;
  handled: boolean;
  retryable: boolean;
  fallbackUsed: boolean;
  error?: ISceneError;
  result?: any;
  metadata?: Record<string, any>;
}

/**
 * Interface for scene error handlers
 */
export interface ISceneErrorHandler {
  readonly handlerId: string;

  /** Error handling configuration */
  errorConfig: Map<SceneErrorType, ErrorHandlingConfig>;

  /** Error history */
  errorHistory: ISceneError[];

  /** Handler metadata */
  handlerMetadata: Record<string, any>;

  /** Set error handling configuration */
  setErrorConfig(errorType: SceneErrorType, config: ErrorHandlingConfig): this;

  /** Set handler metadata */
  setHandlerMetadata(metadata: Record<string, any>): this;

  /** Get error handling configuration */
  getErrorConfig(errorType: SceneErrorType): ErrorHandlingConfig | undefined;

  /** Get error history */
  getErrorHistory(): ISceneError[];

  /** Get handler metadata */
  getHandlerMetadata(): Record<string, any>;

  /** Handle error */
  handleError(error: ISceneError): Promise<ErrorHandlingResult>;

  /** Handle error with custom strategy */
  handleErrorWithStrategy(
    error: ISceneError,
    strategy: ErrorHandlingStrategy
  ): Promise<ErrorHandlingResult>;

  /** Create error */
  createError(
    type: SceneErrorType,
    message: string,
    severity: SceneErrorSeverity,
    context?: any
  ): ISceneError;

  /** Log error */
  logError(error: ISceneError): void;

  /** Retry operation */
  retryOperation<T>(operation: () => Promise<T>, maxRetries: number, delay: number): Promise<T>;

  /** Get fallback result */
  getFallbackResult(error: ISceneError): any;

  /** Clear error history */
  clearErrorHistory(): this;

  /** Get error statistics */
  getErrorStatistics(): {
    totalErrors: number;
    errorsByType: Record<SceneErrorType, number>;
    errorsBySeverity: Record<SceneErrorSeverity, number>;
    recentErrors: ISceneError[];
  };

  /** Check if error is handled */
  isErrorHandled(errorType: SceneErrorType): boolean;

  /** Update handler */
  updateHandler(deltaTime: number): void;
}
