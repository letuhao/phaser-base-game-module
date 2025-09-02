/**
 * Button Click Statistics Interface
 *
 * Defines the structure for button click statistics and performance metrics.
 * Provides type-safe access to click event data and performance information.
 */

// ============================================================================
// BUTTON CLICK STATISTICS INTERFACE
// ============================================================================

export interface IButtonClickStatistics {
  readonly totalClicks: number;
  readonly validClicks: number;
  readonly invalidClicks: number;
  readonly debouncedClicks: number;
  readonly throttledClicks: number;
  readonly filteredClicks: number;
  readonly htmlClicks: number;
  readonly gameObjectClicks: number;
  readonly performance: IButtonClickPerformanceMetrics;
  readonly errors: IButtonClickErrorMetrics;
  readonly lastUpdated: Date;
}

// ============================================================================
// PERFORMANCE METRICS INTERFACE
// ============================================================================

export interface IButtonClickPerformanceMetrics {
  readonly averageProcessingTime: number;
  readonly averageValidationTime: number;
  readonly averageActionTime: number;
  readonly clicksPerSecond: number;
  readonly eventsPerSecond: number;
}

// ============================================================================
// ERROR METRICS INTERFACE
// ============================================================================

export interface IButtonClickErrorMetrics {
  readonly totalErrors: number;
  readonly errorsByType: Record<string, number>;
  readonly errorsBySource: Record<string, number>;
}
