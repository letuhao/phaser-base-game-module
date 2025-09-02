/**
 * Scene System Enums
 *
 * Centralized enum definitions for the scene system.
 * Provides type-safe constants for scene operations, states, and configurations.
 */

// ============================================================================
// SCENE CORE ENUMS
// ============================================================================

/**
 * Scene types enum
 */
export enum SceneType {
  GAME_SCENE = 'game_scene',
  UI_SCENE = 'ui_scene',
  MENU_SCENE = 'menu_scene',
  LOADING_SCENE = 'loading_scene',
  TRANSITION_SCENE = 'transition_scene',
  CUSTOM = 'custom',
}

/**
 * Scene states enum
 */
export enum SceneState {
  UNINITIALIZED = 'uninitialized',
  INITIALIZING = 'initializing',
  LOADING = 'loading',
  ACTIVE = 'active',
  PAUSED = 'paused',
  TRANSITIONING = 'transitioning',
  DESTROYING = 'destroying',
  DESTROYED = 'destroyed',
  ERROR = 'error',
}

// ============================================================================
// SCENE ELEMENT ENUMS
// ============================================================================

/**
 * Scene element types enum
 */
export enum SceneElementType {
  GAME_OBJECT = 'game_object',
  CONTAINER = 'container',
  LAYOUT_CONTAINER = 'layout_container',
  RESPONSIVE_CONTAINER = 'responsive_container',
  THEMED_CONTAINER = 'themed_container',
  CUSTOM = 'custom',
}

/**
 * Scene element states enum
 */
export enum SceneElementState {
  PENDING = 'pending',
  CREATING = 'creating',
  CREATED = 'created',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DESTROYING = 'destroying',
  DESTROYED = 'destroyed',
  ERROR = 'error',
}

// ============================================================================
// SCENE EVENT ENUMS
// ============================================================================

/**
 * Scene event types enum
 */
export enum SceneEventType {
  SCENE_CREATED = 'scene_created',
  SCENE_DESTROYED = 'scene_destroyed',
  SCENE_ACTIVATED = 'scene_activated',
  SCENE_DEACTIVATED = 'scene_deactivated',
  SCENE_TRANSITION_START = 'scene_transition_start',
  SCENE_TRANSITION_END = 'scene_transition_end',
  ELEMENT_CREATED = 'element_created',
  ELEMENT_DESTROYED = 'element_destroyed',
  ELEMENT_UPDATED = 'element_updated',
  CONFIG_CHANGED = 'config_changed',
  BUILDER_STARTED = 'builder_started',
  BUILDER_COMPLETED = 'builder_completed',
  BUILDER_ERROR = 'builder_error',
  VALIDATION_STARTED = 'validation_started',
  VALIDATION_COMPLETED = 'validation_completed',
  VALIDATION_ERROR = 'validation_error',
}

/**
 * Scene event priorities enum
 */
export enum SceneEventPriority {
  LOW = 0,
  NORMAL = 1,
  HIGH = 2,
  CRITICAL = 3,
}

// ============================================================================
// SCENE BUILDER ENUMS
// ============================================================================

/**
 * Scene builder types enum
 */
export enum SceneBuilderType {
  CONFIG_DRIVEN = 'config_driven',
  PROGRAMMATIC = 'programmatic',
  HYBRID = 'hybrid',
  TEMPLATE_BASED = 'template_based',
  CUSTOM = 'custom',
}

/**
 * Scene builder states enum
 */
export enum SceneBuilderState {
  IDLE = 'idle',
  BUILDING = 'building',
  VALIDATING = 'validating',
  COMPLETED = 'completed',
  ERROR = 'error',
  CANCELLED = 'cancelled',
}

// ============================================================================
// SCENE TRANSITION ENUMS
// ============================================================================

/**
 * Scene transition types enum
 */
export enum SceneTransitionType {
  FADE = 'fade',
  SLIDE = 'slide',
  ZOOM = 'zoom',
  ROTATE = 'rotate',
  CUSTOM = 'custom',
  NONE = 'none',
}

/**
 * Scene transition states enum
 */
export enum SceneTransitionState {
  IDLE = 'idle',
  PREPARING = 'preparing',
  TRANSITIONING = 'transitioning',
  COMPLETED = 'completed',
  ERROR = 'error',
  CANCELLED = 'cancelled',
}

// ============================================================================
// SCENE OPERATION ENUMS
// ============================================================================

/**
 * Element manager operations enum
 */
export enum ElementManagerOperation {
  CREATE = 'create',
  DESTROY = 'destroy',
  UPDATE = 'update',
  ACTIVATE = 'activate',
  DEACTIVATE = 'deactivate',
  MOVE = 'move',
  RESIZE = 'resize',
  REPARENT = 'reparent',
}

/**
 * Scene factory operations enum
 */
export enum SceneFactoryOperation {
  CREATE_SCENE = 'create_scene',
  DESTROY_SCENE = 'destroy_scene',
  CONFIGURE_SCENE = 'configure_scene',
  VALIDATE_SCENE = 'validate_scene',
  OPTIMIZE_SCENE = 'optimize_scene',
}

/**
 * Scene validation strategy operations enum
 */
export enum SceneValidationStrategyOperation {
  VALIDATE_SCENE = 'validate_scene',
  VALIDATE_ELEMENT = 'validate_element',
  VALIDATE_CONFIG = 'validate_config',
  VALIDATE_BUILDER = 'validate_builder',
}

/**
 * Scene performance monitor operations enum
 */
export enum ScenePerformanceMonitorOperation {
  MONITOR_SCENE = 'monitor_scene',
  MONITOR_ELEMENT = 'monitor_element',
  MONITOR_BUILDER = 'monitor_builder',
  OPTIMIZE_PERFORMANCE = 'optimize_performance',
  GENERATE_REPORT = 'generate_report',
}

/**
 * Scene element factory operations enum
 */
export enum SceneElementFactoryOperation {
  CREATE_ELEMENT = 'create_element',
  DESTROY_ELEMENT = 'destroy_element',
  CONFIGURE_ELEMENT = 'configure_element',
  VALIDATE_ELEMENT = 'validate_element',
  OPTIMIZE_ELEMENT = 'optimize_element',
}

/**
 * Config manager operations enum
 */
export enum ConfigManagerOperation {
  LOAD = 'load',
  SAVE = 'save',
  VALIDATE = 'validate',
  CLONE = 'clone',
  MERGE = 'merge',
  EXPORT = 'export',
  IMPORT = 'import',
  DELETE = 'delete',
}

/**
 * Error handling strategies enum
 */
export enum ErrorHandlingStrategy {
  IGNORE = 'ignore',
  LOG = 'log',
  RETRY = 'retry',
  FALLBACK = 'fallback',
  THROW = 'throw',
  CUSTOM = 'custom',
}

/**
 * Builder manager operations enum
 */
export enum BuilderManagerOperation {
  CREATE = 'create',
  BUILD = 'build',
  VALIDATE = 'validate',
  CANCEL = 'cancel',
  RESET = 'reset',
  CLEAR = 'clear',
  OPTIMIZE = 'optimize',
}

// ============================================================================
// SCENE CONFIGURATION ENUMS
// ============================================================================

/**
 * Validation target types enum
 */
export enum ValidationTargetType {
  SCENE = 'scene',
  ELEMENT = 'element',
  CONFIG = 'config',
  BUILDER = 'builder',
}

/**
 * Gradient types enum
 */
export enum GradientType {
  LINEAR = 'linear',
  RADIAL = 'radial',
}

/**
 * Asset types enum
 */
export enum AssetType {
  IMAGE = 'image',
  AUDIO = 'audio',
  VIDEO = 'video',
  JSON = 'json',
  ATLAS = 'atlas',
}

/**
 * Transition types enum
 */
export enum TransitionType {
  FADE = 'fade',
  SLIDE = 'slide',
  ZOOM = 'zoom',
  CUSTOM = 'custom',
}

/**
 * Transition directions enum
 */
export enum TransitionDirection {
  IN = 'in',
  OUT = 'out',
  BOTH = 'both',
}

/**
 * Export formats enum
 */
export enum ExportFormat {
  JSON = 'json',
  YAML = 'yaml',
  XML = 'xml',
}

/**
 * Log levels enum (for scene-specific logging)
 */
export enum SceneLogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}
