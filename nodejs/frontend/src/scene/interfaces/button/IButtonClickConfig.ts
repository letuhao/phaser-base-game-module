/**
 * Button Click Configuration Interface
 *
 * Defines the structure for button click event handler configuration.
 * Provides type-safe access to configuration options and settings.
 */

// ============================================================================
// BUTTON CLICK EVENT HANDLER CONFIG INTERFACE
// ============================================================================

export interface IButtonClickEventHandlerConfig {
  readonly events: IButtonClickEventConfig;
  readonly validation: IButtonClickValidationConfig;
  readonly performance: IButtonClickPerformanceConfig;
  readonly monitoring: IButtonClickMonitoringConfig;
}

// ============================================================================
// EVENT CONFIGURATION INTERFACE
// ============================================================================

export interface IButtonClickEventConfig {
  readonly enableHtmlClicks: boolean;
  readonly enableGameObjectClicks: boolean;
  readonly enableTouchEvents: boolean;
  readonly enableKeyboardEvents: boolean;
  readonly debounceDelay: number;
  readonly throttleDelay: number;
}

// ============================================================================
// VALIDATION CONFIGURATION INTERFACE
// ============================================================================

export interface IButtonClickValidationConfig {
  readonly enableClickValidation: boolean;
  readonly enableDebouncing: boolean;
  readonly enableThrottling: boolean;
  readonly enableFiltering: boolean;
  readonly maxClicksPerSecond: number;
}

// ============================================================================
// PERFORMANCE CONFIGURATION INTERFACE
// ============================================================================

export interface IButtonClickPerformanceConfig {
  readonly enableOptimization: boolean;
  readonly enableEventPooling: boolean;
  readonly maxConcurrentEvents: number;
  readonly eventTimeout: number;
}

// ============================================================================
// MONITORING CONFIGURATION INTERFACE
// ============================================================================

export interface IButtonClickMonitoringConfig {
  readonly enableStatistics: boolean;
  readonly enableErrorTracking: boolean;
  readonly statisticsRetentionPeriod: number;
}
