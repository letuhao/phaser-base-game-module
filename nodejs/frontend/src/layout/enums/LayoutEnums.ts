/**
 * Layout System Enums
 * Type-safe enums for the layout system, providing better IntelliSense and compile-time checking
 * Based on the best patterns from the existing codebase
 * 
 * IMPORTANT: This file integrates with the existing Unit System
 * We import and re-export the Unit System enums for compatibility
 */

// ============================================================================
// UNIT SYSTEM INTEGRATION
// ============================================================================

// Import existing Unit System enums for compatibility
import {
  SizeUnit,
  PositionUnit,
  ScaleUnit,
  UnitType,
  Dimension,
  AxisUnit,
  SizeValue,
  PositionValue,
  ScaleValue,
  TemplateInputType,
} from '../../unit';

// Re-export for external use
export {
  SizeUnit,
  PositionUnit,
  ScaleUnit,
  UnitType,
  Dimension,
  AxisUnit,
  SizeValue,
  PositionValue,
  ScaleValue,
  TemplateInputType,
};

// ============================================================================
// BREAKPOINT ENUMS
// ============================================================================

/**
 * Breakpoint names for responsive design
 * Inspired by CSS media query breakpoints
 */
export enum BreakpointName {
  XS = 'xs',      // Extra small devices (phones)
  SM = 'sm',      // Small devices (landscape phones)
  MD = 'md',      // Medium devices (tablets)
  LG = 'lg',      // Large devices (desktops)
  XL = 'xl',      // Extra large devices (large desktops)
  XXL = 'xxl',    // Extra extra large devices
}

/**
 * Breakpoint conditions for responsive behavior
 */
export enum BreakpointCondition {
  MIN_WIDTH = 'min-width',
  MAX_WIDTH = 'max-width',
  MIN_HEIGHT = 'min-height',
  MAX_HEIGHT = 'max-height',
  ORIENTATION = 'orientation',
  DEVICE_TYPE = 'device-type',
  ASPECT_RATIO = 'aspect-ratio',
  PIXEL_DENSITY = 'pixel-density',
}

// ============================================================================
// BREAKPOINT SYSTEM ENUMS
// ============================================================================

/**
 * Comparison operators for breakpoint conditions
 * Inspired by CSS media query operators
 */
export enum BreakpointOperator {
  EQUALS = 'eq',
  GREATER_THAN = 'gt',
  GREATER_THAN_EQUALS = 'gte',
  LESS_THAN = 'lt',
  LESS_THAN_EQUALS = 'lte',
  NOT_EQUALS = 'ne',
}

/**
 * Device orientation types
 * Inspired by CSS orientation media query
 */
export enum DeviceOrientation {
  PORTRAIT = 'portrait',
  LANDSCAPE = 'landscape',
}

/**
 * Device types for responsive design
 * Inspired by CSS device type media queries
 */
export enum DeviceType {
  MOBILE = 'mobile',
  TABLET = 'tablet',
  DESKTOP = 'desktop',
  TV = 'tv',
}

/**
 * Breakpoint priority levels
 * Higher numbers = higher priority
 */
export enum BreakpointPriority {
  LOWEST = 0,
  LOW = 1,
  NORMAL = 5,
  HIGH = 10,
  HIGHEST = 100,
}

/**
 * Breakpoint status states
 */
export enum BreakpointStatus {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  PENDING = 'pending',
  ERROR = 'error',
}

/**
 * Breakpoint event types
 */
export enum BreakpointEventType {
  ACTIVATED = 'activated',
  DEACTIVATED = 'deactivated',
  REGISTERED = 'registered',
  UNREGISTERED = 'unregistered',
  CONTEXT_CHANGED = 'context_changed',
  EVALUATED = 'evaluated',
}

// ============================================================================
// LAYOUT ENUMS
// ============================================================================

/**
 * Layout types for different display behaviors
 * Inspired by CSS display properties
 */
export enum LayoutType {
  BLOCK = 'block',
  INLINE = 'inline',
  FLEX = 'flex',
  GRID = 'grid',
  NONE = 'none',
}

/**
 * Alignment options for positioning elements
 * Inspired by CSS align properties
 * 
 * NOTE: These alignments work with the Unit System's PositionUnit
 */
export enum Alignment {
  // Horizontal alignment (compatible with PositionUnit)
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  JUSTIFY = 'justify',

  // Vertical alignment (compatible with PositionUnit)
  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',
  BASELINE = 'baseline',

  // Combined alignment
  CENTER_CENTER = 'center-center',
  TOP_LEFT = 'top-left',
  TOP_CENTER = 'top-center',
  TOP_RIGHT = 'top-right',
  MIDDLE_LEFT = 'middle-left',
  MIDDLE_CENTER = 'middle-center',
  MIDDLE_RIGHT = 'middle-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_RIGHT = 'bottom-right',
}

/**
 * Position types for element positioning
 * Inspired by CSS position property
 * 
 * NOTE: These are compatible with PositionUnit enum values
 */
export enum PositionType {
  STATIC = 'static',
  RELATIVE = 'relative',
  ABSOLUTE = 'absolute',
  FIXED = 'fixed',
  STICKY = 'sticky',
}

/**
 * Overflow options for content overflow handling
 * Inspired by CSS overflow property
 */
export enum OverflowType {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
  SCROLL = 'scroll',
  AUTO = 'auto',
}

/**
 * Z-index layers for stacking order
 * Inspired by CSS z-index
 */
export enum ZIndexLayer {
  BACKGROUND = -100,
  CONTENT = 0,
  OVERLAY = 100,
  MODAL = 200,
  TOOLTIP = 300,
  NOTIFICATION = 400,
}

// ============================================================================
// SPACING ENUMS (Layout-specific, not in Unit System)
// ============================================================================

/**
 * Spacing scale values
 * Inspired by Tailwind CSS spacing scale
 */
export enum SpacingScale {
  XS = 4,   // 0.25rem
  SM = 8,   // 0.5rem
  MD = 16,  // 1rem
  LG = 24,  // 1.5rem
  XL = 32,  // 2rem
  XXL = 48, // 3rem
  XXXL = 64, // 4rem
}

/**
 * Margin values
 */
export enum MarginValue {
  NONE = 0,
  AUTO = 'auto',
}

/**
 * Padding values
 */
export enum PaddingValue {
  NONE = 0,
}

// ============================================================================
// COLOR ENUMS (Layout-specific, not in Unit System)
// ============================================================================

/**
 * Default color names
 * Inspired by CSS default colors
 */
export enum ColorName {
  TRANSPARENT = 'transparent',
  BLACK = '#000000',
  WHITE = '#ffffff',
  RED = '#ff0000',
  GREEN = '#00ff00',
  BLUE = '#0000ff',
  YELLOW = '#ffff00',
  CYAN = '#00ffff',
  MAGENTA = '#ff00ff',
  GRAY = '#808080',
}

/**
 * Color opacity values
 */
export enum ColorOpacity {
  TRANSPARENT = 0,
  LOW = 0.25,
  MEDIUM = 0.5,
  HIGH = 0.75,
  OPAQUE = 1,
}

/**
 * Blend modes for color mixing
 * Inspired by CSS mix-blend-mode
 */
export enum BlendMode {
  NORMAL = 'normal',
  MULTIPLY = 'multiply',
  SCREEN = 'screen',
  OVERLAY = 'overlay',
  DARKEN = 'darken',
  LIGHTEN = 'lighten',
  COLOR_DODGE = 'color-dodge',
  COLOR_BURN = 'color-burn',
  HARD_LIGHT = 'hard-light',
  SOFT_LIGHT = 'soft-light',
  DIFFERENCE = 'difference',
  EXCLUSION = 'exclusion',
  HUE = 'hue',
  SATURATION = 'saturation',
  COLOR = 'color',
  LUMINOSITY = 'luminosity',
}

// ============================================================================
// TYPOGRAPHY ENUMS (Layout-specific, not in Unit System)
// ============================================================================

/**
 * Font families
 * Inspired by CSS font-family
 */
export enum FontFamily {
  SANS = 'Inter, system-ui, -apple-system, sans-serif',
  SERIF = 'Georgia, serif',
  MONO = 'JetBrains Mono, monospace',
  DISPLAY = 'Poppins, sans-serif',
}

/**
 * Font sizes
 * Inspired by CSS font-size
 */
export enum FontSize {
  XS = 12,
  SM = 14,
  BASE = 16,
  LG = 18,
  XL = 20,
  XXL = 24,
  XXXL = 30,
  DISPLAY = 48,
}

/**
 * Font weights
 * Inspired by CSS font-weight
 */
export enum FontWeight {
  LIGHT = 300,
  NORMAL = 400,
  MEDIUM = 500,
  SEMIBOLD = 600,
  BOLD = 700,
  EXTRABOLD = 800,
}

/**
 * Line heights
 * Inspired by CSS line-height
 */
export enum LineHeight {
  TIGHT = 1.25,
  NORMAL = 1.5,
  RELAXED = 1.75,
  LOOSE = 2,
}

/**
 * Text alignment
 * Inspired by CSS text-align
 */
export enum TextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  JUSTIFY = 'justify',
}

/**
 * Font styles
 * Inspired by CSS font-style
 */
export enum FontStyle {
  NORMAL = 'normal',
  ITALIC = 'italic',
  OBLIQUE = 'oblique',
}

// ============================================================================
// ANIMATION ENUMS (Layout-specific, not in Unit System)
// ============================================================================

/**
 * Animation durations
 * Inspired by CSS transition-duration
 */
export enum AnimationDuration {
  FAST = 150,   // ms
  NORMAL = 300, // ms
  SLOW = 500,   // ms
  SLOWER = 1000, // ms
}

/**
 * Animation easing functions
 * Inspired by CSS transition-timing-function
 */
export enum AnimationEasing {
  LINEAR = 'linear',
  EASE = 'ease',
  EASE_IN = 'ease-in',
  EASE_OUT = 'ease-out',
  EASE_IN_OUT = 'ease-in-out',
  BOUNCE = 'bounce',
  ELASTIC = 'elastic',
}

/**
 * Animation properties
 * Inspired by CSS transition-property
 */
export enum AnimationProperty {
  ALL = 'all',
  OPACITY = 'opacity',
  TRANSFORM = 'transform',
  COLOR = 'color',
  BACKGROUND = 'background',
}

/**
 * Cursor styles
 * Inspired by CSS cursor property
 */
export enum CursorStyle {
  DEFAULT = 'default',
  POINTER = 'pointer',
  HAND = 'hand',
  TEXT = 'text',
  MOVE = 'move',
  NOT_ALLOWED = 'not-allowed',
  WAIT = 'wait',
  CROSSHAIR = 'crosshair',
  GRAB = 'grab',
  GRABBING = 'grabbing',
}

// ============================================================================
// DEVICE CAPABILITY ENUMS (Layout-specific, not in Unit System)
// ============================================================================

/**
 * Device capabilities
 */
export enum DeviceCapability {
  TOUCH = 'touch',
  MOUSE = 'mouse',
  KEYBOARD = 'keyboard',
  HIGH_DPI = 'high-dpi',
}

// ============================================================================
// PERFORMANCE ENUMS (Layout-specific, not in Unit System)
// ============================================================================

/**
 * Update frequencies for responsive updates
 */
export enum UpdateFrequency {
  IMMEDIATE = 'immediate',
  DEBOUNCED = 'debounced',
  THROTTLED = 'throttled',
}

/**
 * Performance levels
 */
export enum PerformanceLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  ULTRA = 'ultra',
}

// ============================================================================
// VALIDATION ENUMS (Layout-specific, not in Unit System)
// ============================================================================

/**
 * Validation rules
 */
export enum ValidationRule {
  REQUIRED = 'required',
  MIN = 'min',
  MAX = 'max',
  RANGE = 'range',
  PATTERN = 'pattern',
  CUSTOM = 'custom',
}

/**
 * Validation severity levels
 */
export enum ValidationSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

// ============================================================================
// LOGGING ENUMS (Layout-specific, not in Unit System)
// ============================================================================

/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

/**
 * Log categories
 */
export enum LogCategory {
  LAYOUT = 'layout',
  RESPONSIVE = 'responsive',
  THEME = 'theme',
  ANIMATION = 'animation',
  PERFORMANCE = 'performance',
  VALIDATION = 'validation',
}

// ============================================================================
// GAMEOBJECT ENUMS (Layout-specific, not in Unit System)
// ============================================================================

/**
 * GameObject types for Phaser objects
 */
export enum GameObjectType {
  CONTAINER = 'container',
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
  SPRITE = 'sprite',
  TEXT = 'text',
  IMAGE = 'image',
  GRAPHICS = 'graphics',
  LINE = 'line',
  ARC = 'arc',
  ELLIPSE = 'ellipse',
  POLYGON = 'polygon',
  CUSTOM = 'custom',
}

/**
 * GameObject states
 */
export enum GameObjectState {
  CREATED = 'created',
  INITIALIZED = 'initialized',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DESTROYED = 'destroyed',
}

// ============================================================================
// THEME ENUMS (Layout-specific, not in Unit System)
// ============================================================================

/**
 * Theme types
 */
export enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
  CUSTOM = 'custom',
}

/**
 * Theme variants
 */
export enum ThemeVariant {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

// ============================================================================
// LAYOUT STRATEGY ENUMS (Layout-specific, not in Unit System)
// ============================================================================

/**
 * Layout strategies
 */
export enum LayoutStrategy {
  FLUID = 'fluid',
  ADAPTIVE = 'adaptive',
  FIXED = 'fixed',
  HYBRID = 'hybrid',
}

/**
 * Scale strategies
 */
export enum ScaleStrategy {
  STRETCH = 'stretch',
  FIT = 'fit',
  FILL = 'fill',
  NONE = 'none',
}

// ============================================================================
// EXPORT ALL ENUMS
// ============================================================================

export const LAYOUT_SYSTEM_ENUMS = {
  // Unit System enums (imported for compatibility)
  UNIT: {
    SIZE_UNIT: SizeUnit,
    POSITION_UNIT: PositionUnit,
    SCALE_UNIT: ScaleUnit,
    UNIT_TYPE: UnitType,
    DIMENSION: Dimension,
    AXIS_UNIT: AxisUnit,
    SIZE_VALUE: SizeValue,
    POSITION_VALUE: PositionValue,
    SCALE_VALUE: ScaleValue,
    TEMPLATE_INPUT_TYPE: TemplateInputType,
  },
  
  // Breakpoint enums
  BREAKPOINT: {
    NAME: BreakpointName,
    CONDITION: BreakpointCondition,
    OPERATOR: BreakpointOperator,
    ORIENTATION: DeviceOrientation,
    DEVICE_TYPE: DeviceType,
    PRIORITY: BreakpointPriority,
    STATUS: BreakpointStatus,
    EVENT_TYPE: BreakpointEventType,
  },
  
  // Layout-specific enums
  LAYOUT: {
    TYPE: LayoutType,
    ALIGNMENT: Alignment,
    POSITION: PositionType,
    OVERFLOW: OverflowType,
    Z_INDEX: ZIndexLayer,
  },
  SPACING: {
    SCALE: SpacingScale,
    MARGIN: MarginValue,
    PADDING: PaddingValue,
  },
  COLOR: {
    NAME: ColorName,
    OPACITY: ColorOpacity,
    BLEND_MODE: BlendMode,
  },
  TYPOGRAPHY: {
    FONT_FAMILY: FontFamily,
    FONT_SIZE: FontSize,
    FONT_WEIGHT: FontWeight,
    LINE_HEIGHT: LineHeight,
    TEXT_ALIGN: TextAlign,
  },
  ANIMATION: {
    DURATION: AnimationDuration,
    EASING: AnimationEasing,
    PROPERTY: AnimationProperty,
  },
  DEVICE: {
    CAPABILITY: DeviceCapability,
  },
  PERFORMANCE: {
    UPDATE_FREQUENCY: UpdateFrequency,
    LEVEL: PerformanceLevel,
  },
  VALIDATION: {
    RULE: ValidationRule,
    SEVERITY: ValidationSeverity,
  },
  LOGGING: {
    LEVEL: LogLevel,
    CATEGORY: LogCategory,
  },
  GAMEOBJECT: {
    TYPE: GameObjectType,
    STATE: GameObjectState,
  },
  THEME: {
    TYPE: ThemeType,
    VARIANT: ThemeVariant,
  },
  STRATEGY: {
    LAYOUT: LayoutStrategy,
    SCALE: ScaleStrategy,
  },
} as const;
