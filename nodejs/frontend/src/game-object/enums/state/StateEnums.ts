/**
 * State Management Enums
 *
 * Enums for state machine and state management functionality
 */

// ============================================================================
// STATE MANAGEMENT ENUMS
// ============================================================================

// ComponentState is now imported from Core System
// to avoid duplication and ensure consistency across the application

/**
 * State machine types enum
 */
export enum StateMachineType {
  SIMPLE = 'simple',
  HIERARCHICAL = 'hierarchical',
  PARALLEL = 'parallel',
  SUBMACHINE = 'submachine',
}

/**
 * State transition types enum
 */
export enum StateTransitionType {
  IMMEDIATE = 'immediate',
  DELAYED = 'delayed',
  CONDITIONAL = 'conditional',
  AUTOMATIC = 'automatic',
}

/**
 * Common game object states enum
 */
export enum CommonState {
  // Basic States
  IDLE = 'idle',
  ACTIVE = 'active',
  INACTIVE = 'inactive',

  // Movement States
  MOVING = 'moving',
  STOPPED = 'stopped',
  JUMPING = 'jumping',
  FALLING = 'falling',

  // Interaction States
  HOVERED = 'hovered',
  PRESSED = 'pressed',
  DRAGGING = 'dragging',
  DROPPED = 'dropped',

  // Animation States
  PLAYING = 'playing',
  PAUSED = 'paused',

  // UI States
  OPENING = 'opening',
  OPEN = 'open',
  CLOSING = 'closing',
  CLOSED = 'closed',

  // Game States
  SPAWNING = 'spawning',
  ALIVE = 'alive',
  DYING = 'dying',
  DEAD = 'dead',
}

/**
 * Animation states enum
 */
export enum AnimationState {
  STOPPED = 'stopped',
  PLAYING = 'playing',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  LOOPING = 'looping',
}

/**
 * Effect states enum
 */
export enum EffectState {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  ERROR = 'error',
}

/**
 * Cache states enum
 */
export enum CacheState {
  EMPTY = 'empty',
  LOADING = 'loading',
  LOADED = 'loaded',
  EXPIRED = 'expired',
  ERROR = 'error',
}

/**
 * Pool states enum
 */
export enum PoolState {
  AVAILABLE = 'available',
  IN_USE = 'in_use',
  RETURNING = 'returning',
  DESTROYED = 'destroyed',
}

/**
 * Network states enum
 */
export enum NetworkState {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  RECONNECTING = 'reconnecting',
  ERROR = 'error',
}

/**
 * Sync states enum
 */
export enum SyncState {
  IDLE = 'idle',
  SYNCING = 'syncing',
  CONFLICT = 'conflict',
  RESOLVED = 'resolved',
  ERROR = 'error',
}
