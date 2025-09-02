/**
 * Context System Enums
 *
 * Enums for scene context management and operations.
 */

// ============================================================================
// CONTEXT ENUMS
// ============================================================================

/**
 * Scene context types enum
 */
export enum SceneContextType {
  GAME_CONTEXT = 'game_context',
  UI_CONTEXT = 'ui_context',
  MENU_CONTEXT = 'menu_context',
  LOADING_CONTEXT = 'loading_context',
  TRANSITION_CONTEXT = 'transition_context',
  CUSTOM_CONTEXT = 'custom_context',
}

/**
 * Scene context states enum
 */
export enum SceneContextState {
  UNINITIALIZED = 'uninitialized',
  INITIALIZING = 'initializing',
  ACTIVE = 'active',
  PAUSED = 'paused',
  TRANSITIONING = 'transitioning',
  DESTROYING = 'destroying',
  DESTROYED = 'destroyed',
  ERROR = 'error',
}

/**
 * Builder context operations enum
 */
export enum BuilderContextOperation {
  CREATE = 'create',
  BUILD = 'build',
  VALIDATE = 'validate',
  DESTROY = 'destroy',
  RESET = 'reset',
  CLONE = 'clone',
  MERGE = 'merge',
}
