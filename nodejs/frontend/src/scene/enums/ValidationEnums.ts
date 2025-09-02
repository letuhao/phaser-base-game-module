/**
 * Validation System Enums
 *
 * Enums for scene validation and error handling.
 */

// ============================================================================
// VALIDATION ENUMS
// ============================================================================

/**
 * Validation result types enum
 */
export enum ValidationResultType {
  VALID = 'valid',
  INVALID = 'invalid',
  WARNING = 'warning',
  ERROR = 'error',
  SKIPPED = 'skipped',
}

/**
 * Validation rule types enum
 */
export enum ValidationRuleType {
  REQUIRED = 'required',
  FORMAT = 'format',
  RANGE = 'range',
  CUSTOM = 'custom',
  DEPENDENCY = 'dependency',
  PERFORMANCE = 'performance',
}
