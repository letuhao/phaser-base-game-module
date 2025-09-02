/**
 * Button Click System Enums
 *
 * Enums for button click event handling and coordination.
 */

// ============================================================================
// BUTTON CLICK EVENT ENUMS
// ============================================================================

/**
 * Button click event types enum
 */
export enum ButtonClickEventType {
  HTML_CLICK = 'html_click',
  GAME_OBJECT_CLICK = 'game_object_click',
  TOUCH_START = 'touch_start',
  TOUCH_END = 'touch_end',
  MOUSE_DOWN = 'mouse_down',
  MOUSE_UP = 'mouse_up',
  KEYBOARD_ACTIVATION = 'keyboard_activation',
}

/**
 * Button click source types enum
 */
export enum ButtonClickSource {
  HTML_ELEMENT = 'html_element',
  GAME_OBJECT = 'game_object',
  EXTERNAL_SYSTEM = 'external_system',
}

/**
 * Click validation result types enum
 */
export enum ClickValidationResult {
  VALID = 'valid',
  INVALID = 'invalid',
  DEBOUNCED = 'debounced',
  THROTTLED = 'throttled',
  FILTERED = 'filtered',
}

/**
 * Click priority levels enum
 */
export enum ClickPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// ============================================================================
// BUTTON CLICK ACTION ENUMS
// ============================================================================

/**
 * Button click action types enum
 */
export enum ButtonClickActionType {
  NAVIGATE = 'navigate',
  TOGGLE = 'toggle',
  SUBMIT = 'submit',
  CANCEL = 'cancel',
  CONFIRM = 'confirm',
  CLOSE = 'close',
  OPEN = 'open',
  PLAY = 'play',
  PAUSE = 'pause',
  STOP = 'stop',
  RESET = 'reset',
  SAVE = 'save',
  LOAD = 'load',
  DELETE = 'delete',
  EDIT = 'edit',
  COPY = 'copy',
  PASTE = 'paste',
  CUSTOM = 'custom',
}

/**
 * Button click action status enum
 */
export enum ButtonClickActionStatus {
  PENDING = 'pending',
  EXECUTING = 'executing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}
