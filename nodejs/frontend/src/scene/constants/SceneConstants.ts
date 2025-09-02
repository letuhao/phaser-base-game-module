/**
 * Scene System Constants
 *
 * Centralized constants for the scene system to avoid magic numbers and strings.
 * Provides type-safe access to commonly used values and configuration options.
 */

// ============================================================================
// BUTTON CLICK CONSTANTS
// ============================================================================

/**
 * Mouse button constants
 */
export const MOUSE_BUTTONS = {
  LEFT: 0,
  MIDDLE: 1,
  RIGHT: 2,
} as const;

/**
 * Button click priority levels
 */
export const BUTTON_CLICK_PRIORITIES = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
  CRITICAL: 3,
} as const;

// ============================================================================
// RESPONSIVE SYSTEM CONSTANTS
// ============================================================================

/**
 * Responsive system score ranges
 */
export const RESPONSIVE_SCORE_RANGES = {
  MIN_SCORE: 0,
  MAX_SCORE: 1,
  MIN_HEALTH_SCORE: 0,
  MAX_HEALTH_SCORE: 100,
} as const;

/**
 * Dependency strength ranges
 */
export const DEPENDENCY_STRENGTH_RANGES = {
  MIN_STRENGTH: 0,
  MAX_STRENGTH: 1,
} as const;

/**
 * Keyframe offset ranges
 */
export const KEYFRAME_OFFSET_RANGES = {
  MIN_OFFSET: 0,
  MAX_OFFSET: 1,
} as const;

// ============================================================================
// SCENE EVENT PRIORITY CONSTANTS
// ============================================================================

/**
 * Scene event priority levels
 */
export const SCENE_EVENT_PRIORITIES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
  CRITICAL: 3,
} as const;

// ============================================================================
// PERFORMANCE CONSTANTS
// ============================================================================

/**
 * Performance monitoring thresholds
 */
export const PERFORMANCE_THRESHOLDS = {
  MAX_PROCESSING_TIME: 1000, // milliseconds
  MAX_VALIDATION_TIME: 500, // milliseconds
  MAX_ACTION_TIME: 2000, // milliseconds
  MIN_CLICKS_PER_SECOND: 1,
  MAX_CLICKS_PER_SECOND: 100,
} as const;

/**
 * Cache configuration constants
 */
export const CACHE_CONFIG = {
  DEFAULT_CACHE_SIZE: 1000,
  DEFAULT_CACHE_TIMEOUT: 300000, // 5 minutes
  MAX_CACHE_SIZE: 10000,
} as const;

// ============================================================================
// VALIDATION CONSTANTS
// ============================================================================

/**
 * Validation timeout constants
 */
export const VALIDATION_TIMEOUTS = {
  DEFAULT_TIMEOUT: 5000, // milliseconds
  QUICK_TIMEOUT: 1000, // milliseconds
  LONG_TIMEOUT: 30000, // milliseconds
} as const;

/**
 * Retry configuration constants
 */
export const RETRY_CONFIG = {
  DEFAULT_RETRY_COUNT: 3,
  DEFAULT_RETRY_DELAY: 1000, // milliseconds
  MAX_RETRY_COUNT: 10,
} as const;

// ============================================================================
// CONCURRENCY CONSTANTS
// ============================================================================

/**
 * Concurrency limits
 */
export const CONCURRENCY_LIMITS = {
  DEFAULT_MAX_CONCURRENT_EVENTS: 10,
  DEFAULT_MAX_CONCURRENT_FLOWS: 5,
  DEFAULT_MAX_CONCURRENT_ACTIONS: 20,
  MAX_CONCURRENT_EVENTS: 100,
  MAX_CONCURRENT_FLOWS: 50,
  MAX_CONCURRENT_ACTIONS: 200,
} as const;

// ============================================================================
// MONITORING CONSTANTS
// ============================================================================

/**
 * Statistics retention periods
 */
export const STATISTICS_RETENTION = {
  DEFAULT_RETENTION_PERIOD: 86400000, // 24 hours in milliseconds
  SHORT_RETENTION_PERIOD: 3600000, // 1 hour in milliseconds
  LONG_RETENTION_PERIOD: 604800000, // 7 days in milliseconds
} as const;

// ============================================================================
// ERROR HANDLING CONSTANTS
// ============================================================================

/**
 * Error severity levels
 */
export const ERROR_SEVERITY_LEVELS = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  CRITICAL: 4,
} as const;

/**
 * Error handling strategies
 */
export const ERROR_HANDLING_STRATEGIES = {
  IGNORE: 'ignore',
  LOG: 'log',
  RETRY: 'retry',
  FALLBACK: 'fallback',
  THROW: 'throw',
  CUSTOM: 'custom',
} as const;
