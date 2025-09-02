/**
 * Execution System Enums
 *
 * Enums for execution types and flow management.
 */

// ============================================================================
// EXECUTION ENUMS
// ============================================================================

/**
 * Execution types enum
 */
export enum ExecutionType {
  SYNC = 'sync',
  ASYNC = 'async',
  PROMISE = 'promise',
}

/**
 * Flow types enum
 */
export enum FlowType {
  SEQUENTIAL = 'sequential',
  PARALLEL = 'parallel',
  CONDITIONAL = 'conditional',
  CUSTOM = 'custom',
}

/**
 * Target types enum
 */
export enum TargetType {
  HTML_ELEMENT = 'html_element',
  GAME_OBJECT = 'game_object',
}

/**
 * Rule types enum
 */
export enum RuleType {
  DEBOUNCE = 'debounce',
  THROTTLE = 'throttle',
  FILTER = 'filter',
  CUSTOM = 'custom',
}

/**
 * Severity levels enum
 */
export enum SeverityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}
