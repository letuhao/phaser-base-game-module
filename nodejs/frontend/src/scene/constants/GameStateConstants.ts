/**
 * Game State System Constants
 *
 * Centralized constants for game state management system.
 * Replaces magic numbers and strings with named constants following coding rules.
 */

// ============================================================================
// TIMEOUT CONSTANTS
// ============================================================================

export const GAME_STATE_TIMEOUTS = {
  // Game initialization timeouts
  GAME_START_TIMEOUT: 5000,
  GAME_INITIALIZATION_TIMEOUT: 10000,

  // Scene operation timeouts
  SCENE_CREATE_TIMEOUT: 10000,
  SCENE_LOAD_TIMEOUT: 15000,
  SCENE_ACTIVATION_TIMEOUT: 2000,
  SCENE_TRANSITION_TIMEOUT: 5000,

  // Event operation timeouts
  EVENT_START_TIMEOUT: 5000,
  EVENT_PROCESSING_TIMEOUT: 30000,
  EVENT_COMPLETION_TIMEOUT: 5000,

  // Button click timeouts
  BUTTON_CLICK_TIMEOUT: 1000,
  BUTTON_VALIDATION_TIMEOUT: 2000,
  BUTTON_PROCESSING_TIMEOUT: 5000,
  BUTTON_FEEDBACK_TIMEOUT: 2000,

  // System operation timeouts
  SYSTEM_INITIALIZATION_TIMEOUT: 15000,
  SYSTEM_READY_TIMEOUT: 10000,
  SYSTEM_SHUTDOWN_TIMEOUT: 8000,
} as const;

// ============================================================================
// RETRY CONSTANTS
// ============================================================================

export const GAME_STATE_RETRY_COUNTS = {
  // Game operations
  GAME_START_RETRY: 3,
  GAME_INITIALIZATION_RETRY: 2,

  // Scene operations
  SCENE_CREATE_RETRY: 2,
  SCENE_LOAD_RETRY: 2,
  SCENE_ACTIVATION_RETRY: 1,
  SCENE_TRANSITION_RETRY: 2,

  // Event operations
  EVENT_START_RETRY: 2,
  EVENT_PROCESSING_RETRY: 1,
  EVENT_COMPLETION_RETRY: 1,

  // Button operations
  BUTTON_CLICK_RETRY: 1,
  BUTTON_VALIDATION_RETRY: 1,
  BUTTON_PROCESSING_RETRY: 2,
  BUTTON_FEEDBACK_RETRY: 1,

  // System operations
  SYSTEM_INITIALIZATION_RETRY: 3,
  SYSTEM_READY_RETRY: 2,
  SYSTEM_SHUTDOWN_RETRY: 2,
} as const;

// ============================================================================
// PROGRESS CONSTANTS
// ============================================================================

export const GAME_STATE_PROGRESS = {
  // Progress percentages
  PROGRESS_START: 0,
  PROGRESS_COMPLETE: 100,
  PROGRESS_HALF: 50,
  PROGRESS_QUARTER: 25,
  PROGRESS_THREE_QUARTERS: 75,

  // Load progress steps
  LOAD_PROGRESS_START: 0,
  LOAD_PROGRESS_ASSETS: 25,
  LOAD_PROGRESS_GAMEOBJECTS: 50,
  LOAD_PROGRESS_LAYOUT: 75,
  LOAD_PROGRESS_COMPLETE: 100,
} as const;

// ============================================================================
// DURATION CONSTANTS
// ============================================================================

export const GAME_STATE_DURATIONS = {
  // Estimated durations (in milliseconds)
  SCENE_LOAD_ESTIMATED: 5000,
  EVENT_PROCESSING_ESTIMATED: 10000,
  BUTTON_CLICK_ESTIMATED: 1000,
  SYSTEM_INITIALIZATION_ESTIMATED: 30000,

  // Animation durations
  FADE_IN_DURATION: 1000,
  FADE_OUT_DURATION: 1000,
  TRANSITION_DURATION: 1000,
  FEEDBACK_DURATION: 2000,
} as const;

// ============================================================================
// PRIORITY CONSTANTS
// ============================================================================

export const GAME_STATE_PRIORITIES = {
  // Priority levels
  CRITICAL: 1000,
  HIGH: 800,
  NORMAL: 500,
  LOW: 200,
  BACKGROUND: 100,

  // Default priorities
  DEFAULT_GAME_START: 1000,
  DEFAULT_SCENE_LOAD: 800,
  DEFAULT_EVENT_PROCESSING: 500,
  DEFAULT_BUTTON_CLICK: 500,
  DEFAULT_SYSTEM_INIT: 1000,
} as const;

// ============================================================================
// LIMIT CONSTANTS
// ============================================================================

export const GAME_STATE_LIMITS = {
  // Maximum values
  MAX_RETRY_COUNT: 5,
  MAX_TIMEOUT: 60000, // 1 minute
  MAX_PROGRESS: 100,
  MAX_PRIORITY: 1000,

  // Minimum values
  MIN_TIMEOUT: 100,
  MIN_PROGRESS: 0,
  MIN_PRIORITY: 1,

  // Array limits
  MAX_STATE_HISTORY: 100,
  MAX_ACTIVE_SCENES: 10,
  MAX_ACTIVE_EVENTS: 20,
  MAX_PENDING_TRANSITIONS: 50,
} as const;

// ============================================================================
// ERROR CONSTANTS
// ============================================================================

export const GAME_STATE_ERRORS = {
  // Error codes
  GAME_START_ERROR: 'GAME_START_ERROR',
  SCENE_CREATE_ERROR: 'SCENE_CREATE_ERROR',
  SCENE_LOAD_ERROR: 'SCENE_LOAD_ERROR',
  SCENE_ACTIVATION_ERROR: 'SCENE_ACTIVATION_ERROR',
  EVENT_START_ERROR: 'EVENT_START_ERROR',
  EVENT_PROCESSING_ERROR: 'EVENT_PROCESSING_ERROR',
  EVENT_COMPLETION_ERROR: 'EVENT_COMPLETION_ERROR',
  BUTTON_CLICK_ERROR: 'BUTTON_CLICK_ERROR',
  SYSTEM_INITIALIZATION_ERROR: 'SYSTEM_INITIALIZATION_ERROR',

  // Timeout error codes
  GAME_START_TIMEOUT: 'GAME_START_TIMEOUT',
  SCENE_CREATE_TIMEOUT: 'SCENE_CREATE_TIMEOUT',
  SCENE_LOAD_TIMEOUT: 'SCENE_LOAD_TIMEOUT',
  SCENE_ACTIVATION_TIMEOUT: 'SCENE_ACTIVATION_TIMEOUT',
  EVENT_START_TIMEOUT: 'EVENT_START_TIMEOUT',
  EVENT_PROCESSING_TIMEOUT: 'EVENT_PROCESSING_TIMEOUT',
  EVENT_COMPLETION_TIMEOUT: 'EVENT_COMPLETION_TIMEOUT',
} as const;

// ============================================================================
// CONFIGURATION CONSTANTS
// ============================================================================

export const GAME_STATE_CONFIG = {
  // Default configuration values
  DEFAULT_SAVE_INTERVAL: 30000, // 30 seconds
  DEFAULT_MAX_STATE_HISTORY: 100,
  DEFAULT_MAX_CONCURRENT_FLOWS: 10,
  DEFAULT_FLOW_TIMEOUT: 60000, // 1 minute
  DEFAULT_STATISTICS_RETENTION: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds

  // Performance thresholds
  MAX_TRANSITION_TIME: 5000,
  MAX_SCENE_LOAD_TIME: 15000,
  MAX_EVENT_PROCESSING_TIME: 30000,

  // Validation settings
  ENABLE_STATE_VALIDATION: true,
  ENABLE_FLOW_VALIDATION: true,
  ENABLE_PERFORMANCE_TRACKING: true,
  ENABLE_ERROR_TRACKING: true,
} as const;
