/**
 * Feedback System Enums
 * 
 * Centralized enum definitions for feedback and visual effects.
 * Replaces string literals with type-safe enums following coding rules.
 */

// ============================================================================
// FEEDBACK NOTIFICATION TYPE ENUMS
// ============================================================================

export enum FeedbackNotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
  ACHIEVEMENT = 'achievement',
}

// ============================================================================
// VISUAL FEEDBACK TYPE ENUMS
// ============================================================================

export enum VisualFeedbackType {
  HIGHLIGHT = 'highlight',
  PULSE = 'pulse',
  SHAKE = 'shake',
  GLOW = 'glow',
  FADE = 'fade',
  SCALE = 'scale',
}

// ============================================================================
// HAPTIC FEEDBACK TYPE ENUMS
// ============================================================================

export enum HapticFeedbackType {
  LIGHT = 'light',
  MEDIUM = 'medium',
  HEAVY = 'heavy',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}
