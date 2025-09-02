/**
 * UI System Enums
 *
 * Enums for UI types, states, sizes, and UI-specific functionality
 */

// ============================================================================
// UI TYPE ENUMS
// ============================================================================

/**
 * UI types enum
 */
export enum UIType {
  BUTTON = 'button',
  TEXT = 'text',
  INPUT = 'input',
  PANEL = 'panel',
  LIST = 'list',
  SCROLLVIEW = 'scrollview',
  MODAL = 'modal',
  TOOLTIP = 'tooltip',
  SLIDER = 'slider',
  CHECKBOX = 'checkbox',
  RADIOBUTTON = 'radiobutton',
  DROPDOWN = 'dropdown',
  TAB = 'tab',
  MENU = 'menu',
  PROGRESSBAR = 'progressbar',
  CUSTOM = 'custom',
}

/**
 * UI states enum
 */
export enum UIState {
  NORMAL = 'normal',
  HOVER = 'hover',
  PRESSED = 'pressed',
  DISABLED = 'disabled',
  FOCUSED = 'focused',
  SELECTED = 'selected',
  CUSTOM = 'custom',
}

/**
 * UI sizes enum
 */
export enum UISize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  FULL = 'full',
  FULLSCREEN = 'fullscreen',
  CUSTOM = 'custom',
}

/**
 * UI variants enum
 */
export enum UIVariant {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  ELEVATED = 'elevated',
  OUTLINED = 'outlined',
  FILLED = 'filled',
  ALERT = 'alert',
  CONFIRM = 'confirm',
  PROMPT = 'prompt',
  CUSTOM = 'custom',
}

/**
 * UI layouts enum
 */
export enum UILayout {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  GRID = 'grid',
  FLEX = 'flex',
  CUSTOM = 'custom',
}

/**
 * UI positions enum
 */
export enum UIPosition {
  CENTER = 'center',
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  CUSTOM = 'custom',
}

/**
 * UI animations enum
 */
export enum UIAnimation {
  FADE = 'fade',
  SLIDE = 'slide',
  SCALE = 'scale',
  NONE = 'none',
  CUSTOM = 'custom',
}

/**
 * UI orientations enum
 */
export enum UIOrientation {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
  CUSTOM = 'custom',
}

/**
 * UI selection modes enum
 */
export enum UISelectionMode {
  NONE = 'none',
  SINGLE = 'single',
  MULTIPLE = 'multiple',
  CUSTOM = 'custom',
}

/**
 * Input types enum
 */
export enum InputType {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
  NUMBER = 'number',
  TEL = 'tel',
  URL = 'url',
  SEARCH = 'search',
  CUSTOM = 'custom',
}

/**
 * Input variants enum
 */
export enum InputVariant {
  OUTLINED = 'outlined',
  FILLED = 'filled',
  UNDERLINED = 'underlined',
  CUSTOM = 'custom',
}

/**
 * Validation states enum
 */
export enum ValidationState {
  VALID = 'valid',
  INVALID = 'invalid',
  PENDING = 'pending',
  CUSTOM = 'custom',
}

// TextAlignment and VerticalAlignment are now imported from Layout System
// to avoid duplication and ensure consistency across the application

/**
 * Button shapes enum
 */
export enum ButtonShape {
  RECTANGLE = 'rectangle',
  ROUNDED = 'rounded',
  CIRCLE = 'circle',
  PILL = 'pill',
  CUSTOM = 'custom',
}
