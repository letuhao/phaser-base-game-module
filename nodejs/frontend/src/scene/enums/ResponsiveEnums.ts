/**
 * Responsive System Enums
 *
 * Enums for responsive system event handling and coordination.
 */

// ============================================================================
// RESPONSIVE SYSTEM ENUMS
// ============================================================================

/**
 * Responsive system types enum
 */
export enum ResponsiveSystem {
  LAYOUT = 'layout',
  THEME = 'theme',
  UNIT = 'unit',
  CONTAINER = 'container',
  GAME_OBJECT = 'game_object',
  SCENE = 'scene',
}

/**
 * Responsive event types enum
 */
export enum ResponsiveEventType {
  BREAKPOINT_CHANGED = 'breakpoint_changed',
  ORIENTATION_CHANGED = 'orientation_changed',
  DEVICE_TYPE_CHANGED = 'device_type_changed',
  VIEWPORT_RESIZED = 'viewport_resized',
  RESPONSIVE_UPDATE = 'responsive_update',
  RESPONSIVE_ERROR = 'responsive_error',
}

/**
 * Update priority levels enum
 */
export enum UpdatePriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  CRITICAL = 'critical',
}
