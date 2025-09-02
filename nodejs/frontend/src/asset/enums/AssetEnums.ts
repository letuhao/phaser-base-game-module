/**
 * Asset System Enums
 *
 * Centralized enum definitions for the asset system.
 * Provides type-safe constants for asset operations, states, and configurations.
 */

// ============================================================================
// ASSET LOADER ENUMS
// ============================================================================

/**
 * Loader types enum
 */
export enum LoaderType {
  HTTP = 'http',
  FETCH = 'fetch',
  XHR = 'xhr',
  WEBSOCKET = 'websocket',
  CUSTOM = 'custom',
}

/**
 * Loader states enum
 */
export enum LoaderState {
  IDLE = 'idle',
  LOADING = 'loading',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  ERROR = 'error',
  CANCELLED = 'cancelled',
}

/**
 * Loading strategy enum
 */
export enum LoadingStrategy {
  SEQUENTIAL = 'sequential',
  PARALLEL = 'parallel',
  PRIORITY_BASED = 'priority_based',
  LAZY = 'lazy',
  CUSTOM = 'custom',
}

/**
 * Loading strategy types enum
 */
export enum LoadingStrategyType {
  SEQUENTIAL = 'sequential',
  PARALLEL = 'parallel',
  PRIORITY_BASED = 'priority_based',
  LAZY = 'lazy',
  BATCH = 'batch',
  STREAMING = 'streaming',
  CUSTOM = 'custom',
}

// ============================================================================
// ASSET MANAGER ENUMS
// ============================================================================

/**
 * Manager operations enum
 */
export enum ManagerOperation {
  LOAD = 'load',
  UNLOAD = 'unload',
  CACHE = 'cache',
  UNCACHE = 'uncache',
  VALIDATE = 'validate',
  OPTIMIZE = 'optimize',
  CLEANUP = 'cleanup',
}

// ============================================================================
// ASSET FACTORY ENUMS
// ============================================================================

/**
 * Factory operations enum
 */
export enum FactoryOperation {
  CREATE = 'create',
  CLONE = 'clone',
  CONFIGURE = 'configure',
  VALIDATE = 'validate',
  REGISTER = 'register',
  UNREGISTER = 'unregister',
}

/**
 * Loader factory operations enum
 */
export enum LoaderFactoryOperation {
  CREATE = 'create',
  CLONE = 'clone',
  CONFIGURE = 'configure',
  VALIDATE = 'validate',
  REGISTER = 'register',
  UNREGISTER = 'unregister',
}

// ============================================================================
// ASSET STRATEGY ENUMS
// ============================================================================

/**
 * Validation strategy types enum
 */
export enum ValidationStrategyType {
  STRICT = 'strict',
  LENIENT = 'lenient',
  CUSTOM = 'custom',
  BATCH = 'batch',
  INCREMENTAL = 'incremental',
  PARALLEL = 'parallel',
  CACHED = 'cached',
}

// ============================================================================
// ASSET SCENE ENUMS
// ============================================================================

/**
 * Scene asset loading phases enum
 */
export enum SceneAssetPhase {
  ASSETS = 'assets',
  BUNDLES = 'bundles',
  VALIDATION = 'validation',
  COMPLETE = 'complete',
}
