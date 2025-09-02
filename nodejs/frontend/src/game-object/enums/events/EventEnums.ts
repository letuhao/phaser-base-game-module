/**
 * Event System Enums
 * 
 * Enums for event types, event categories, and event management
 */

// ============================================================================
// EVENT TYPES ENUMS
// ============================================================================

/**
 * Common event types enum
 */
export enum EventType {
  // System Events
  SYSTEM_START = 'system_start',
  SYSTEM_STOP = 'system_stop',
  SYSTEM_PAUSE = 'system_pause',
  SYSTEM_RESUME = 'system_resume',
  SYSTEM_ERROR = 'system_error',
  
  // Game Object Events
  OBJECT_CREATED = 'object_created',
  OBJECT_DESTROYED = 'object_destroyed',
  OBJECT_UPDATED = 'object_updated',
  OBJECT_MOVED = 'object_moved',
  OBJECT_SCALED = 'object_scaled',
  OBJECT_ROTATED = 'object_rotated',
  
  // Input Events
  INPUT_DOWN = 'input_down',
  INPUT_UP = 'input_up',
  INPUT_MOVE = 'input_move',
  INPUT_OVER = 'input_over',
  INPUT_OUT = 'input_out',
  INPUT_ENTER = 'input_enter',
  INPUT_LEAVE = 'input_leave',
  
  // Animation Events
  ANIMATION_START = 'animation_start',
  ANIMATION_COMPLETE = 'animation_complete',
  ANIMATION_LOOP = 'animation_loop',
  ANIMATION_PAUSE = 'animation_pause',
  ANIMATION_RESUME = 'animation_resume',
  ANIMATION_STOP = 'animation_stop',
  
  // Audio Events
  AUDIO_PLAY = 'audio_play',
  AUDIO_PAUSE = 'audio_pause',
  AUDIO_STOP = 'audio_stop',
  AUDIO_END = 'audio_end',
  AUDIO_LOAD = 'audio_load',
  AUDIO_ERROR = 'audio_error',
  
  // Network Events
  NETWORK_CONNECT = 'network_connect',
  NETWORK_DISCONNECT = 'network_disconnect',
  NETWORK_MESSAGE = 'network_message',
  NETWORK_ERROR = 'network_error',
  
  // Physics Events
  PHYSICS_COLLISION = 'physics_collision',
  PHYSICS_TRIGGER = 'physics_trigger',
  PHYSICS_SLEEP = 'physics_sleep',
  PHYSICS_WAKE = 'physics_wake',
  
  // UI Events
  UI_CLICK = 'ui_click',
  UI_HOVER = 'ui_hover',
  UI_FOCUS = 'ui_focus',
  UI_BLUR = 'ui_blur',
  UI_CHANGE = 'ui_change',
  UI_SUBMIT = 'ui_submit',
  
  // Custom Events
  CUSTOM = 'custom',
}

/**
 * Event categories enum
 */
export enum EventCategory {
  SYSTEM = 'system',
  GAME_OBJECT = 'game_object',
  INPUT = 'input',
  ANIMATION = 'animation',
  AUDIO = 'audio',
  NETWORK = 'network',
  PHYSICS = 'physics',
  UI = 'ui',
  CUSTOM = 'custom',
}

/**
 * Event priorities enum
 */
export enum EventPriority {
  LOWEST = 0,
  LOW = 1,
  NORMAL = 5,
  HIGH = 10,
  HIGHEST = 100,
  CRITICAL = 1000,
}

/**
 * Event states enum
 */
export enum EventState {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

/**
 * Event propagation modes enum
 */
export enum EventPropagationMode {
  NONE = 'none',
  BUBBLE = 'bubble',
  CAPTURE = 'capture',
  BOTH = 'both',
}
