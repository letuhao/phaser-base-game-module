/**
 * Layout System Constants
 * Centralized constants for the layout system, inspired by CSS and modern design systems
 * Based on the best patterns from the existing codebase
 * 
 * IMPORTANT: This file integrates with the existing Unit System
 * We avoid duplicating Unit System constants and focus on layout-specific constants
 */

// Import Unit System for compatibility
import { SizeUnit } from '../../unit';

// ============================================================================
// BREAKPOINT CONSTANTS
// ============================================================================

export const BREAKPOINT_CONSTANTS = {
  // CSS-like breakpoints (inspired by Bootstrap)
  BREAKPOINTS: {
    XS: 0,      // Extra small devices (phones)
    SM: 576,    // Small devices (landscape phones)
    MD: 768,    // Medium devices (tablets)
    LG: 992,    // Large devices (desktops)
    XL: 1200,   // Extra large devices (large desktops)
    XXL: 1400,  // Extra extra large devices
  },

  // Breakpoint names (CSS-like)
  NAMES: {
    XS: 'xs',
    SM: 'sm', 
    MD: 'md',
    LG: 'lg',
    XL: 'xl',
    XXL: 'xxl',
  },

  // Default breakpoint
  DEFAULT: 'md',

  // Performance settings
  PERFORMANCE: {
    UPDATE_THROTTLE: 16, // ms (60fps)
    CACHE_SIZE: 100,
    CACHE_TIMEOUT: 1000, // ms
  },
} as const;

// ============================================================================
// LAYOUT CONSTANTS
// ============================================================================

export const LAYOUT_CONSTANTS = {
  // Layout types (inspired by CSS display properties)
  TYPES: {
    BLOCK: 'block',
    INLINE: 'inline',
    FLEX: 'flex',
    GRID: 'grid',
    NONE: 'none',
  },

  // Alignment options (inspired by CSS align properties)
  ALIGNMENT: {
    // Horizontal alignment
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
    JUSTIFY: 'justify',

    // Vertical alignment
    TOP: 'top',
    MIDDLE: 'middle',
    BOTTOM: 'bottom',
    BASELINE: 'baseline',

    // Combined alignment
    CENTER_CENTER: 'center-center',
    TOP_LEFT: 'top-left',
    TOP_CENTER: 'top-center',
    TOP_RIGHT: 'top-right',
    MIDDLE_LEFT: 'middle-left',
    MIDDLE_CENTER: 'middle-center',
    MIDDLE_RIGHT: 'middle-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_CENTER: 'bottom-center',
    BOTTOM_RIGHT: 'bottom-right',
  },

  // Position types (inspired by CSS position)
  POSITION: {
    STATIC: 'static',
    RELATIVE: 'relative',
    ABSOLUTE: 'absolute',
    FIXED: 'fixed',
    STICKY: 'sticky',
  },

  // Overflow options (inspired by CSS overflow)
  OVERFLOW: {
    VISIBLE: 'visible',
    HIDDEN: 'hidden',
    SCROLL: 'scroll',
    AUTO: 'auto',
  },

  // Z-index layers (inspired by CSS z-index)
  Z_INDEX: {
    BACKGROUND: -100,
    CONTENT: 0,
    OVERLAY: 100,
    MODAL: 200,
    TOOLTIP: 300,
    NOTIFICATION: 400,
  },
} as const;

// ============================================================================
// SIZE CONSTANTS (Unit System Compatible)
// ============================================================================

export const SIZE_CONSTANTS = {
  // Size values (compatible with Unit System SizeValue)
  VALUES: {
    AUTO: SizeUnit.AUTO,
    FILL: SizeUnit.FILL,
    FIT: SizeUnit.FIT,
    STRETCH: SizeUnit.STRETCH,
  },

  // Size units (compatible with Unit System SizeUnit)
  UNITS: {
    PIXEL: SizeUnit.PIXEL,
    PARENT_WIDTH: SizeUnit.PARENT_WIDTH,
    PARENT_HEIGHT: SizeUnit.PARENT_HEIGHT,
    SCENE_WIDTH: SizeUnit.SCENE_WIDTH,
    SCENE_HEIGHT: SizeUnit.SCENE_HEIGHT,
    VIEWPORT_WIDTH: SizeUnit.VIEWPORT_WIDTH,
    VIEWPORT_HEIGHT: SizeUnit.VIEWPORT_HEIGHT,
  },

  // Size constraints
  CONSTRAINTS: {
    MIN_WIDTH: 1,
    MAX_WIDTH: 10000,
    MIN_HEIGHT: 1,
    MAX_HEIGHT: 10000,
    MIN_SCALE: 0.1,
    MAX_SCALE: 10,
  },

  // Default sizes
  DEFAULTS: {
    WIDTH: 100,
    HEIGHT: 100,
    SCALE: 1,
  },
} as const;

// ============================================================================
// SPACING CONSTANTS
// ============================================================================

export const SPACING_CONSTANTS = {
  // Base spacing unit (inspired by CSS spacing systems)
  BASE: 16,

  // Spacing scale (inspired by Tailwind CSS)
  SCALE: {
    XS: 4,   // 0.25rem
    SM: 8,   // 0.5rem
    MD: 16,  // 1rem
    LG: 24,  // 1.5rem
    XL: 32,  // 2rem
    XXL: 48, // 3rem
    XXXL: 64, // 4rem
  },

  // Margin and padding
  MARGIN: {
    NONE: 0,
    AUTO: 'auto',
  },

  PADDING: {
    NONE: 0,
  },
} as const;

// ============================================================================
// COLOR CONSTANTS
// ============================================================================

export const COLOR_CONSTANTS = {
  // Default colors (inspired by CSS default colors)
  DEFAULTS: {
    TRANSPARENT: 'transparent',
    BLACK: '#000000',
    WHITE: '#ffffff',
    RED: '#ff0000',
    GREEN: '#00ff00',
    BLUE: '#0000ff',
    YELLOW: '#ffff00',
    CYAN: '#00ffff',
    MAGENTA: '#ff00ff',
    GRAY: '#808080',
  },

  // Color opacity values
  OPACITY: {
    TRANSPARENT: 0,
    LOW: 0.25,
    MEDIUM: 0.5,
    HIGH: 0.75,
    OPAQUE: 1,
  },

  // Blend modes (inspired by CSS mix-blend-mode)
  BLEND_MODES: {
    NORMAL: 'normal',
    MULTIPLY: 'multiply',
    SCREEN: 'screen',
    OVERLAY: 'overlay',
    DARKEN: 'darken',
    LIGHTEN: 'lighten',
    COLOR_DODGE: 'color-dodge',
    COLOR_BURN: 'color-burn',
    HARD_LIGHT: 'hard-light',
    SOFT_LIGHT: 'soft-light',
    DIFFERENCE: 'difference',
    EXCLUSION: 'exclusion',
    HUE: 'hue',
    SATURATION: 'saturation',
    COLOR: 'color',
    LUMINOSITY: 'luminosity',
  },
} as const;

// ============================================================================
// TYPOGRAPHY CONSTANTS
// ============================================================================

export const TYPOGRAPHY_CONSTANTS = {
  // Font families (inspired by CSS font-family)
  FONT_FAMILIES: {
    SANS: 'Inter, system-ui, -apple-system, sans-serif',
    SERIF: 'Georgia, serif',
    MONO: 'JetBrains Mono, monospace',
    DISPLAY: 'Poppins, sans-serif',
  },

  // Font sizes (inspired by CSS font-size)
  FONT_SIZES: {
    XS: 12,
    SM: 14,
    BASE: 16,
    LG: 18,
    XL: 20,
    XXL: 24,
    XXXL: 30,
    DISPLAY: 48,
  },

  // Font weights (inspired by CSS font-weight)
  FONT_WEIGHTS: {
    LIGHT: 300,
    NORMAL: 400,
    MEDIUM: 500,
    SEMIBOLD: 600,
    BOLD: 700,
    EXTRABOLD: 800,
  },

  // Line heights (inspired by CSS line-height)
  LINE_HEIGHTS: {
    TIGHT: 1.25,
    NORMAL: 1.5,
    RELAXED: 1.75,
    LOOSE: 2,
  },

  // Text alignment (inspired by CSS text-align)
  TEXT_ALIGN: {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
    JUSTIFY: 'justify',
  },
} as const;

// ============================================================================
// ANIMATION CONSTANTS
// ============================================================================

export const ANIMATION_CONSTANTS = {
  // Animation durations (inspired by CSS transition-duration)
  DURATIONS: {
    FAST: 150,   // ms
    NORMAL: 300, // ms
    SLOW: 500,   // ms
    SLOWER: 1000, // ms
  },

  // Animation easing (inspired by CSS transition-timing-function)
  EASING: {
    LINEAR: 'linear',
    EASE: 'ease',
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
    BOUNCE: 'bounce',
    ELASTIC: 'elastic',
  },

  // Animation properties
  PROPERTIES: {
    ALL: 'all',
    OPACITY: 'opacity',
    TRANSFORM: 'transform',
    COLOR: 'color',
    BACKGROUND: 'background',
  },

  // Cursor styles (inspired by CSS cursor property)
  CURSOR: {
    DEFAULT: 'default',
    POINTER: 'pointer',
    HAND: 'hand',
    TEXT: 'text',
    MOVE: 'move',
    NOT_ALLOWED: 'not-allowed',
    WAIT: 'wait',
    CROSSHAIR: 'crosshair',
    GRAB: 'grab',
    GRABBING: 'grabbing',
  },
} as const;

// ============================================================================
// DEVICE CONSTANTS
// ============================================================================

export const DEVICE_CONSTANTS = {
  // Device types
  TYPES: {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    DESKTOP: 'desktop',
    TV: 'tv',
  },

  // Orientations
  ORIENTATIONS: {
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape',
  },

  // Device capabilities
  CAPABILITIES: {
    TOUCH: 'touch',
    MOUSE: 'mouse',
    KEYBOARD: 'keyboard',
    HIGH_DPI: 'high-dpi',
  },
} as const;

// ============================================================================
// PERFORMANCE CONSTANTS
// ============================================================================

export const PERFORMANCE_CONSTANTS = {
  // Update frequencies
  UPDATE_FREQUENCIES: {
    IMMEDIATE: 'immediate',
    DEBOUNCED: 'debounced',
    THROTTLED: 'throttled',
  },

  // Debounce/throttle delays
  DELAYS: {
    FAST: 16,    // ms (60fps)
    NORMAL: 100, // ms
    SLOW: 300,   // ms
  },

  // Cache settings
  CACHE: {
    SIZE: 100,
    TIMEOUT: 1000, // ms
  },
} as const;

// ============================================================================
// VALIDATION CONSTANTS
// ============================================================================

export const VALIDATION_CONSTANTS = {
  // Validation rules
  RULES: {
    REQUIRED: 'required',
    MIN: 'min',
    MAX: 'max',
    RANGE: 'range',
    PATTERN: 'pattern',
    CUSTOM: 'custom',
  },

  // Error messages
  MESSAGES: {
    REQUIRED: 'This field is required',
    INVALID_VALUE: 'Invalid value',
    OUT_OF_RANGE: 'Value is out of range',
    INVALID_FORMAT: 'Invalid format',
  },
} as const;

// ============================================================================
// LOGGING CONSTANTS
// ============================================================================

export const LOGGING_CONSTANTS = {
  // Log levels
  LEVELS: {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
  },

  // Log categories
  CATEGORIES: {
    LAYOUT: 'layout',
    RESPONSIVE: 'responsive',
    THEME: 'theme',
    ANIMATION: 'animation',
    PERFORMANCE: 'performance',
    VALIDATION: 'validation',
  },
} as const;

// ============================================================================
// GAMEOBJECT CONSTANTS
// ============================================================================

export const GAMEOBJECT_CONSTANTS = {
  // GameObject types for Phaser objects
  TYPES: {
    CONTAINER: 'container',
    RECTANGLE: 'rectangle',
    CIRCLE: 'circle',
    SPRITE: 'sprite',
    TEXT: 'text',
    IMAGE: 'image',
    GRAPHICS: 'graphics',
    LINE: 'line',
    ARC: 'arc',
    ELLIPSE: 'ellipse',
    POLYGON: 'polygon',
    CUSTOM: 'custom',
  },

  // GameObject states
  STATES: {
    CREATED: 'created',
    INITIALIZED: 'initialized',
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    DESTROYED: 'destroyed',
  },
} as const;

// ============================================================================
// THEME CONSTANTS
// ============================================================================

export const THEME_CONSTANTS = {
  // Theme types
  TYPES: {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto',
    CUSTOM: 'custom',
  },

  // Theme variants
  VARIANTS: {
    DEFAULT: 'default',
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    INFO: 'info',
  },

  // Theme modes
  MODES: {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto',
  },
} as const;

// ============================================================================
// STRATEGY CONSTANTS
// ============================================================================

export const STRATEGY_CONSTANTS = {
  // Layout strategies
  LAYOUT: {
    FLUID: 'fluid',
    ADAPTIVE: 'adaptive',
    FIXED: 'fixed',
    HYBRID: 'hybrid',
  },

  // Scale strategies
  SCALE: {
    STRETCH: 'stretch',
    FIT: 'fit',
    FILL: 'fill',
    NONE: 'none',
  },
} as const;

// ============================================================================
// UNIT CONSTANTS
// ============================================================================

export const UNIT_CONSTANTS = {
  // Unit type specifications
  TYPE_SPECS: {
    SIZE: 'size',
    POSITION: 'position',
    SCALE: 'scale',
  },

  // Unit dimensions
  DIMENSIONS: {
    WIDTH: 'width',
    HEIGHT: 'height',
    DEPTH: 'depth',
  },

  // Rounding strategies
  ROUNDING: {
    FLOOR: 'floor',
    CEIL: 'ceil',
    ROUND: 'round',
  },

  // Style composition strategies
  COMPOSITION: {
    MERGE: 'merge',
    OVERRIDE: 'override',
    EXTEND: 'extend',
  },
} as const;

// ============================================================================
// COMMAND PATTERN CONSTANTS
// ============================================================================

export const COMMAND_CONSTANTS = {
  // Layout change types
  CHANGE_TYPES: {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
    MOVE: 'move',
    RESIZE: 'resize',
    STYLE: 'style',
  },
} as const;

// ============================================================================
// STATE PATTERN CONSTANTS
// ============================================================================

export const STATE_CONSTANTS = {
  // Layout state change types
  CHANGE_TYPES: {
    STATE_ENTER: 'state_enter',
    STATE_EXIT: 'state_exit',
    STATE_UPDATE: 'state_update',
    ACTION_HANDLED: 'action_handled',
  },

  // Layout state types
  STATE_TYPES: {
    IDLE: 'idle',
    CALCULATING: 'calculating',
    CACHED: 'cached',
    ERROR: 'error',
    VALIDATING: 'validating',
    TRANSITIONING: 'transitioning',
  },
} as const;

// ============================================================================
// CHAIN OF RESPONSIBILITY CONSTANTS
// ============================================================================

export const CHAIN_CONSTANTS = {
  // Layout chain handler types
  HANDLER_TYPES: {
    VALIDATION: 'validation',
    UNIT_CONVERSION: 'unit_conversion',
    RESPONSIVE: 'responsive',
    THEME: 'theme',
    CALCULATION: 'calculation',
    OPTIMIZATION: 'optimization',
    CACHING: 'caching',
  },
} as const;

// ============================================================================
// TRANSFORM CONSTANTS
// ============================================================================

export const TRANSFORM_CONSTANTS = {
  // Transform styles
  STYLES: {
    FLAT: 'flat',
    PRESERVE_3D: 'preserve-3d',
  },

  // Backface visibility
  BACKFACE_VISIBILITY: {
    VISIBLE: 'visible',
    HIDDEN: 'hidden',
  },

  // Pointer events
  POINTER_EVENTS: {
    AUTO: 'auto',
    NONE: 'none',
  },

  // User select
  USER_SELECT: {
    AUTO: 'auto',
    NONE: 'none',
    TEXT: 'text',
    ALL: 'all',
  },
} as const;

// ============================================================================
// REFERENCE CONSTANTS
// ============================================================================

export const REFERENCE_CONSTANTS = {
  // Position reference types
  POSITION: {
    PARENT: 'parent',
    SCENE: 'scene',
    VIEWPORT: 'viewport',
    ABSOLUTE: 'absolute',
  },

  // Size reference types
  SIZE: {
    PARENT: 'parent',
    SCENE: 'scene',
    VIEWPORT: 'viewport',
    CONTENT: 'content',
    AUTO: 'auto',
  },

  // Orientation types
  ORIENTATION: {
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
  },

  // Alignment self types
  ALIGNMENT_SELF: {
    AUTO: 'auto',
    START: 'start',
    END: 'end',
    CENTER: 'center',
    STRETCH: 'stretch',
  },

  // Pattern repeat types
  PATTERN_REPEAT: {
    REPEAT: 'repeat',
    REPEAT_X: 'repeat-x',
    REPEAT_Y: 'repeat-y',
    NO_REPEAT: 'no-repeat',
  },

  // Gradient types
  GRADIENT: {
    LINEAR: 'linear',
    RADIAL: 'radial',
    CONIC: 'conic',
  },

  // Animation event types
  ANIMATION_EVENT: {
    START: 'start',
    END: 'end',
    ITERATION: 'iteration',
    CANCEL: 'cancel',
  },

  // Performance alert types
  PERFORMANCE_ALERT: {
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
  },

  // Alignment reference types
  ALIGNMENT_REFERENCE: {
    PARENT: 'parent',
    SIBLINGS: 'siblings',
    CONTAINER: 'container',
  },

  // Display types
  DISPLAY: {
    BLOCK: 'block',
    INLINE: 'inline',
    NONE: 'none',
  },

  // Background size types
  BACKGROUND_SIZE: {
    COVER: 'cover',
    CONTAIN: 'contain',
    AUTO: 'auto',
    FULL: '100%',
    INITIAL: 'initial',
  },

  // Background position types
  BACKGROUND_POSITION: {
    CENTER: 'center',
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right',
  },

  // Background attachment types
  BACKGROUND_ATTACHMENT: {
    SCROLL: 'scroll',
    FIXED: 'fixed',
    LOCAL: 'local',
  },

  // Background repeat types
  BACKGROUND_REPEAT: {
    NO_REPEAT: 'no-repeat',
    REPEAT: 'repeat',
    REPEAT_X: 'repeat-x',
    REPEAT_Y: 'repeat-y',
  },

  // Background clip types
  BACKGROUND_CLIP: {
    BORDER_BOX: 'border-box',
    PADDING_BOX: 'padding-box',
    CONTENT_BOX: 'content-box',
  },

  // Text transform types
  TEXT_TRANSFORM: {
    NONE: 'none',
    CAPITALIZE: 'capitalize',
    UPPERCASE: 'uppercase',
    LOWERCASE: 'lowercase',
  },

  // Text overflow types
  TEXT_OVERFLOW: {
    CLIP: 'clip',
    ELLIPSIS: 'ellipsis',
    FADE: 'fade',
  },

  // White space types
  WHITE_SPACE: {
    NORMAL: 'normal',
    NOWRAP: 'nowrap',
    PRE: 'pre',
    PRE_WRAP: 'pre-wrap',
    PRE_LINE: 'pre-line',
  },

  // CSS unit types
  CSS_UNIT: {
    PX: 'px',
    EM: 'em',
    REM: 'rem',
    PERCENT: '%',
    VW: 'vw',
    VH: 'vh',
  },

  // Button state types
  BUTTON_STATE: {
    IDLE: 'idle',
    HOVER: 'hover',
    ACTIVE: 'active',
    DISABLED: 'disabled',
  },

  // Physics body type types
  PHYSICS_BODY_TYPE: {
    STATIC: 'static',
    DYNAMIC: 'dynamic',
    KINEMATIC: 'kinematic',
  },

  // Priority levels
  PRIORITY_LEVEL: {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
  },

  // Value types
  VALUE_TYPE: {
    NUMBER: 'number',
    PERCENTAGE: 'percentage',
    UNIT: 'unit',
    KEYWORD: 'keyword',
  },

  // Extended value types (includes auto)
  EXTENDED_VALUE_TYPE: {
    NUMBER: 'number',
    PERCENTAGE: 'percentage',
    UNIT: 'unit',
    KEYWORD: 'keyword',
    AUTO: 'auto',
  },

  // Border image repeat types
  BORDER_IMAGE_REPEAT: {
    STRETCH: 'stretch',
    REPEAT: 'repeat',
    ROUND: 'round',
    SPACE: 'space',
  },

  // Horizontal alignment values
  HORIZONTAL_ALIGNMENT_VALUE: {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
    START: 'start',
    END: 'end',
    STRETCH: 'stretch',
  },

  // Vertical alignment values
  VERTICAL_ALIGNMENT_VALUE: {
    TOP: 'top',
    MIDDLE: 'middle',
    BOTTOM: 'bottom',
    START: 'start',
    END: 'end',
    STRETCH: 'stretch',
  },

  // Border style values
  BORDER_STYLE_VALUE: {
    NONE: 'none',
    SOLID: 'solid',
    DASHED: 'dashed',
    DOTTED: 'dotted',
    DOUBLE: 'double',
    GROOVE: 'groove',
    RIDGE: 'ridge',
    INSET: 'inset',
    OUTSET: 'outset',
  },

  // Text decoration values
  TEXT_DECORATION_VALUE: {
    NONE: 'none',
    UNDERLINE: 'underline',
    OVERLINE: 'overline',
    LINE_THROUGH: 'line-through',
    BLINK: 'blink',
  },

  // Animation direction values
  ANIMATION_DIRECTION_VALUE: {
    NORMAL: 'normal',
    REVERSE: 'reverse',
    ALTERNATE: 'alternate',
    ALTERNATE_REVERSE: 'alternate-reverse',
  },

  // Animation fill mode values
  ANIMATION_FILL_MODE_VALUE: {
    NONE: 'none',
    FORWARDS: 'forwards',
    BACKWARDS: 'backwards',
    BOTH: 'both',
  },

  // Shadow filter types
  SHADOW_FILTER: {
    DROP_SHADOW: 'drop-shadow',
    BOX_SHADOW: 'box-shadow',
  },
} as const;

// ============================================================================
// UTILITY CONSTANTS
// ============================================================================

export const UTILITY_CONSTANTS = {
  // Common values
  VALUES: {
    NONE: 'none',
    AUTO: 'auto',
    INITIAL: 'initial',
    INHERIT: 'inherit',
    UNSET: 'unset',
  },

  // Common numbers
  NUMBERS: {
    ZERO: 0,
    ONE: 1,
    HALF: 0.5,
    QUARTER: 0.25,
    THIRD: 0.333,
    TWO_THIRDS: 0.667,
    THREE_QUARTERS: 0.75,
  },

  // Common percentages
  PERCENTAGES: {
    ZERO: '0%',
    QUARTER: '25%',
    THIRD: '33.333%',
    HALF: '50%',
    TWO_THIRDS: '66.667%',
    THREE_QUARTERS: '75%',
    FULL: '100%',
  },

  // Common angles
  ANGLES: {
    ZERO: '0deg',
    QUARTER: '90deg',
    HALF: '180deg',
    THREE_QUARTERS: '270deg',
    FULL: '360deg',
  },

  // Common durations
  DURATIONS: {
    INSTANT: 0,
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    SLOWER: 1000,
  },

  // Common easing functions
  EASING: {
    LINEAR: 'linear',
    EASE: 'ease',
    EASE_IN: 'ease-in',
    EASE_OUT: 'ease-out',
    EASE_IN_OUT: 'ease-in-out',
    BOUNCE: 'bounce',
    ELASTIC: 'elastic',
  },
} as const;

// ============================================================================
// EXPORT ALL CONSTANTS
// ============================================================================

export const LAYOUT_SYSTEM_CONSTANTS = {
  BREAKPOINT: BREAKPOINT_CONSTANTS,
  LAYOUT: LAYOUT_CONSTANTS,
  SIZE: SIZE_CONSTANTS,
  SPACING: SPACING_CONSTANTS,
  COLOR: COLOR_CONSTANTS,
  TYPOGRAPHY: TYPOGRAPHY_CONSTANTS,
  ANIMATION: ANIMATION_CONSTANTS,
  DEVICE: DEVICE_CONSTANTS,
  PERFORMANCE: PERFORMANCE_CONSTANTS,
  VALIDATION: VALIDATION_CONSTANTS,
  LOGGING: LOGGING_CONSTANTS,
  GAMEOBJECT: GAMEOBJECT_CONSTANTS,
  THEME: THEME_CONSTANTS,
  STRATEGY: STRATEGY_CONSTANTS,
  UNIT: UNIT_CONSTANTS,
  COMMAND: COMMAND_CONSTANTS,
  STATE: STATE_CONSTANTS,
  CHAIN: CHAIN_CONSTANTS,
  TRANSFORM: TRANSFORM_CONSTANTS,
  REFERENCE: REFERENCE_CONSTANTS,
  UTILITY: UTILITY_CONSTANTS,
} as const;
