/**
 * Button Click Coordinator Statistics Interface
 *
 * Defines the structure for button click coordinator statistics and performance metrics.
 * Provides type-safe access to coordinator data and performance information.
 */

// ============================================================================
// BUTTON CLICK COORDINATOR STATISTICS INTERFACE
// ============================================================================

export interface IButtonClickCoordinatorStatistics {
  readonly totalFlows: number;
  readonly totalActions: number;
  readonly successfulFlows: number;
  readonly failedFlows: number;
  readonly successfulActions: number;
  readonly failedActions: number;
  readonly performance: IButtonClickCoordinatorPerformanceMetrics;
  readonly errors: IButtonClickCoordinatorErrorMetrics;
  readonly lastUpdated: Date;
}

// ============================================================================
// COORDINATOR PERFORMANCE METRICS INTERFACE
// ============================================================================

export interface IButtonClickCoordinatorPerformanceMetrics {
  readonly averageFlowTime: number;
  readonly averageActionTime: number;
  readonly flowsPerSecond: number;
  readonly actionsPerSecond: number;
  readonly averageQueueTime: number;
}

// ============================================================================
// COORDINATOR ERROR METRICS INTERFACE
// ============================================================================

export interface IButtonClickCoordinatorErrorMetrics {
  readonly totalErrors: number;
  readonly errorsByType: Record<string, number>;
  readonly errorsByAction: Record<string, number>;
  readonly errorsByFlow: Record<string, number>;
}
