/**
 * Breakpoint System Enums
 * Type-safe enums for the breakpoint system, providing better IntelliSense and compile-time checking
 * Based on the best patterns from the existing codebase
 */

// ============================================================================
// BREAKPOINT OPERATOR ENUMS
// ============================================================================

/**
 * Comparison operators for breakpoint conditions
 * Inspired by CSS media query operators
 */
export enum BreakpointOperator {
  EQUALS = 'eq',
  GREATER_THAN = 'gt',
  GREATER_THAN_EQUALS = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_EQUALS = 'lte',
  NOT_EQUALS = 'ne',
}

// ============================================================================
// DEVICE ORIENTATION ENUMS
// ============================================================================

/**
 * Device orientation types
 * Inspired by CSS orientation media query
 */
export enum DeviceOrientation {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

// ============================================================================
// DEVICE TYPE ENUMS
// ============================================================================

/**
 * Device types for responsive design
 * Inspired by CSS device type media queries
 */
export enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop',
  TV = 'tv',
}

// ============================================================================
// BREAKPOINT PRIORITY ENUMS
// ============================================================================

/**
 * Breakpoint priority levels
 * Higher numbers = higher priority
 */
export enum BreakpointPriority {
  LOWEST = 0,
  LOW = 1,
  NORMAL = 5,
  HIGH = 10,
  HIGHEST = 100,
}

// ============================================================================
// BREAKPOINT STATUS ENUMS
// ============================================================================

/**
 * Breakpoint status states
 */
export enum BreakpointStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  PENDING = 'pending',
  ERROR = 'error',
}

// ============================================================================
// BREAKPOINT EVENT ENUMS
// ============================================================================

/**
 * Breakpoint event types
 */
export enum BreakpointEventType {
  ACTIVATED = 'activated',
  DEACTIVATED = 'deactivated',
  REGISTERED = 'registered',
  UNREGISTERED = 'unregistered',
  CONTEXT_CHANGED = 'context_changed',
  EVALUATED = 'evaluated',
}

// ============================================================================
// BREAKPOINT CONDITION TYPE ENUMS
// ============================================================================

/**
 * Breakpoint condition types
 * Extended from the base BreakpointCondition enum
 */
export enum BreakpointConditionType {
  MIN_WIDTH = 'min-width',
  MAX_WIDTH = 'max-width',
  MIN_HEIGHT = 'min-height',
  MAX_HEIGHT = 'max-height',
  ORIENTATION = 'orientation',
  DEVICE_TYPE = 'device-type',
  ASPECT_RATIO = 'aspect-ratio',
  PIXEL_DENSITY = 'pixel-density',
  CUSTOM = 'custom',
}

// ============================================================================
// BREAKPOINT METADATA ENUMS
// ============================================================================

/**
 * Breakpoint metadata field types
 */
export enum BreakpointMetadataField {
  CREATED_AT = 'createdAt',
  MODIFIED_AT = 'modifiedAt',
  AUTHOR = 'author',
  VERSION = 'version',
  TAGS = 'tags',
  CUSTOM = 'custom',
}

// ============================================================================
// BREAKPOINT PERFORMANCE ENUMS
// ============================================================================

/**
 * Breakpoint performance metrics
 */
export enum BreakpointPerformanceMetric {
  EVALUATION_TIME = 'evaluationTime',
  CACHE_HIT_RATE = 'cacheHitRate',
  MEMORY_USAGE = 'memoryUsage',
  EVALUATIONS_PER_SECOND = 'evaluationsPerSecond',
}

// ============================================================================
// EXPORT ALL BREAKPOINT ENUMS
// ============================================================================

export const BREAKPOINT_SYSTEM_ENUMS = {
  OPERATOR: BreakpointOperator,
  ORIENTATION: DeviceOrientation,
  DEVICE_TYPE: DeviceType,
  PRIORITY: BreakpointPriority,
  STATUS: BreakpointStatus,
  EVENT_TYPE: BreakpointEventType,
  CONDITION_TYPE: BreakpointConditionType,
  METADATA_FIELD: BreakpointMetadataField,
  PERFORMANCE_METRIC: BreakpointPerformanceMetric,
} as const;
