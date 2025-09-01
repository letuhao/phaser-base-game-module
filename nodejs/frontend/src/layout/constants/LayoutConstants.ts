/**
 * Layout System Constants
 * Centralized constants for the layout system, inspired by CSS and modern design systems
 * Based on the best patterns from the existing codebase
 * 
 * IMPORTANT: This file integrates with the existing Unit System
 * We avoid duplicating Unit System constants and focus on layout-specific constants
 */

// Import Unit System for compatibility
import { SizeUnit, PositionUnit, ScaleUnit } from '../../unit';

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
} as const;
