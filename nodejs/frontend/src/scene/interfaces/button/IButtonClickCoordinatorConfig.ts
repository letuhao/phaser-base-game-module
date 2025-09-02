/**
 * Button Click Coordinator Configuration Interface
 *
 * Defines the structure for button click coordinator configuration.
 * Provides type-safe access to coordinator configuration options and settings.
 */

// ============================================================================
// BUTTON CLICK COORDINATOR CONFIG INTERFACE
// ============================================================================

export interface IButtonClickCoordinatorConfig {
  readonly flows: IButtonClickFlowConfig;
  readonly actions: IButtonClickActionConfig;
  readonly performance: IButtonClickCoordinatorPerformanceConfig;
  readonly monitoring: IButtonClickCoordinatorMonitoringConfig;
}

// ============================================================================
// FLOW CONFIGURATION INTERFACE
// ============================================================================

export interface IButtonClickFlowConfig {
  readonly enableFlowExecution: boolean;
  readonly enableFlowValidation: boolean;
  readonly maxConcurrentFlows: number;
  readonly flowTimeout: number;
}

// ============================================================================
// ACTION CONFIGURATION INTERFACE
// ============================================================================

export interface IButtonClickActionConfig {
  readonly enableActionExecution: boolean;
  readonly enableActionValidation: boolean;
  readonly maxConcurrentActions: number;
  readonly actionTimeout: number;
  readonly enableRetry: boolean;
  readonly maxRetryCount: number;
}

// ============================================================================
// COORDINATOR PERFORMANCE CONFIGURATION INTERFACE
// ============================================================================

export interface IButtonClickCoordinatorPerformanceConfig {
  readonly enableOptimization: boolean;
  readonly enableParallelExecution: boolean;
  readonly enableCaching: boolean;
  readonly cacheTimeout: number;
}

// ============================================================================
// COORDINATOR MONITORING CONFIGURATION INTERFACE
// ============================================================================

export interface IButtonClickCoordinatorMonitoringConfig {
  readonly enableStatistics: boolean;
  readonly enableErrorTracking: boolean;
  readonly enablePerformanceTracking: boolean;
  readonly statisticsRetentionPeriod: number;
}
