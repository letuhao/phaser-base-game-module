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

/**
 * Complexity levels
 */
export enum ComplexityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

/**
 * Calculation speed levels
 */
export enum CalculationSpeed {
  FAST = 'fast',
  MEDIUM = 'medium',
  SLOW = 'slow',
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
// POSITION ALIGNMENT ENUMS
// ============================================================================

/**
 * Horizontal position alignment
 */
export enum HorizontalAlignment {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

/**
 * Vertical position alignment
 */
export enum VerticalAlignment {
  TOP = 'top',
  CENTER = 'center',
  BOTTOM = 'bottom',
}

// ============================================================================
// SIZE VALUE ENUMS
// ============================================================================

/**
 * Size value types
 */
export enum SizeValueType {
  FILL = 'fill',
  AUTO = 'auto',
}

// ============================================================================
// BORDER STYLE ENUMS
// ============================================================================

/**
 * Border style types
 */
export enum BorderStyle {
  SOLID = 'solid',
  DASHED = 'dashed',
  DOTTED = 'dotted',
  NONE = 'none',
}

// ============================================================================
// TEXT BASELINE ENUMS
// ============================================================================

/**
 * Text baseline types
 */
export enum TextBaseline {
  TOP = 'top',
  HANGING = 'hanging',
  MIDDLE = 'middle',
  ALPHABETIC = 'alphabetic',
  IDEOGRAPHIC = 'ideographic',
  BOTTOM = 'bottom',
}

/**
 * Text decoration types
 */
export enum TextDecoration {
  NONE = 'none',
  UNDERLINE = 'underline',
  LINE_THROUGH = 'line-through',
  OVERLINE = 'overline',
}

// ============================================================================
// ANIMATION DIRECTION ENUMS
// ============================================================================

/**
 * Animation direction types
 */
export enum AnimationDirection {
  NORMAL = 'normal',
  REVERSE = 'reverse',
  ALTERNATE = 'alternate',
  ALTERNATE_REVERSE = 'alternate-reverse',
}

/**
 * Animation fill mode types
 */
export enum AnimationFillMode {
  NONE = 'none',
  FORWARDS = 'forwards',
  BACKWARDS = 'backwards',
  BOTH = 'both',
}

/**
 * Animation play state types
 */
export enum AnimationPlayState {
  RUNNING = 'running',
  PAUSED = 'paused',
}

/**
 * Animation iteration count types
 */
export enum AnimationIterationCount {
  INFINITE = 'infinite',
}

// ============================================================================
// TRANSFORM STYLE ENUMS
// ============================================================================

/**
 * Transform style types
 */
export enum TransformStyle {
  FLAT = 'flat',
  PRESERVE_3D = 'preserve-3d',
}

/**
 * Backface visibility types
 */
export enum BackfaceVisibility {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
}

// ============================================================================
// POINTER EVENTS ENUMS
// ============================================================================

/**
 * Pointer events types
 */
export enum PointerEvents {
  AUTO = 'auto',
  NONE = 'none',
}

/**
 * User select types
 */
export enum UserSelect {
  AUTO = 'auto',
  NONE = 'none',
  TEXT = 'text',
  ALL = 'all',
}

// ============================================================================
// THEME MODE ENUMS
// ============================================================================

/**
 * Theme mode types
 */
export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
  AUTO = 'auto',
}

// ============================================================================
// UNIT TYPE ENUMS
// ============================================================================

/**
 * Unit type specification
 */
export enum UnitTypeSpec {
  SIZE = 'size',
  POSITION = 'position',
  SCALE = 'scale',
}

/**
 * Unit dimension types
 */
export enum UnitDimension {
  WIDTH = 'width',
  HEIGHT = 'height',
  DEPTH = 'depth',
}

/**
 * Rounding strategy types
 */
export enum RoundingStrategy {
  FLOOR = 'floor',
  CEIL = 'ceil',
  ROUND = 'round',
}

// ============================================================================
// STYLE COMPOSITION ENUMS
// ============================================================================

/**
 * Style composition strategy types
 */
export enum StyleCompositionStrategy {
  MERGE = 'merge',
  OVERRIDE = 'override',
  EXTEND = 'extend',
}

// ============================================================================
// COMMAND PATTERN ENUMS
// ============================================================================

/**
 * Layout change types
 * Defines the types of changes that can be made to layouts
 */
export enum LayoutChangeType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  MOVE = 'move',
  RESIZE = 'resize',
  STYLE = 'style',
}

// ============================================================================
// STATE PATTERN ENUMS
// ============================================================================

/**
 * Layout state change types
 * Defines the types of changes that can occur during state transitions
 */
export enum LayoutStateChangeType {
  STATE_ENTER = 'state_enter',
  STATE_EXIT = 'state_exit',
  STATE_UPDATE = 'state_update',
  ACTION_HANDLED = 'action_handled',
}

/**
 * Layout state types
 * Defines the different types of layout states
 */
export enum LayoutStateType {
  IDLE = 'idle',
  CALCULATING = 'calculating',
  CACHED = 'cached',
  ERROR = 'error',
  VALIDATING = 'validating',
  TRANSITIONING = 'transitioning',
}

// ============================================================================
// CHAIN OF RESPONSIBILITY ENUMS
// ============================================================================

/**
 * Layout chain handler types
 * Defines the different types of chain handlers
 */
export enum LayoutChainHandlerType {
  VALIDATION = 'validation',
  UNIT_CONVERSION = 'unit_conversion',
  RESPONSIVE = 'responsive',
  THEME = 'theme',
  CALCULATION = 'calculation',
  OPTIMIZATION = 'optimization',
  CACHING = 'caching',
}

/**
 * Position reference types
 */
export enum PositionReference {
  PARENT = 'parent',
  SCENE = 'scene',
  VIEWPORT = 'viewport',
  ABSOLUTE = 'absolute',
}

/**
 * Size reference types
 */
export enum SizeReference {
  PARENT = 'parent',
  SCENE = 'scene',
  VIEWPORT = 'viewport',
  CONTENT = 'content',
  AUTO = 'auto',
}

/**
 * Orientation types
 */
export enum Orientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

/**
 * Alignment self types
 */
export enum AlignmentSelf {
  AUTO = 'auto',
  START = 'start',
  END = 'end',
  CENTER = 'center',
  STRETCH = 'stretch',
}

/**
 * Pattern repeat types
 */
export enum PatternRepeat {
  REPEAT = 'repeat',
  REPEAT_X = 'repeat-x',
  REPEAT_Y = 'repeat-y',
  NO_REPEAT = 'no-repeat',
}

/**
 * Gradient types
 */
export enum GradientType {
  LINEAR = 'linear',
  RADIAL = 'radial',
  CONIC = 'conic',
}

/**
 * Animation event types
 */
export enum AnimationEventType {
  START = 'start',
  END = 'end',
  ITERATION = 'iteration',
  CANCEL = 'cancel',
}

/**
 * Performance alert types
 */
export enum PerformanceAlertType {
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

/**
 * Alignment reference types
 */
export enum AlignmentReference {
  PARENT = 'parent',
  SIBLINGS = 'siblings',
  CONTAINER = 'container',
}

/**
 * Display types
 */
export enum DisplayType {
  BLOCK = 'block',
  INLINE = 'inline',
  NONE = 'none',
}

/**
 * Background size types
 */
export enum BackgroundSize {
  COVER = 'cover',
  CONTAIN = 'contain',
  AUTO = 'auto',
  FULL = '100%',
  INITIAL = 'initial',
}

/**
 * Background position types
 */
export enum BackgroundPosition {
  CENTER = 'center',
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

/**
 * Background attachment types
 */
export enum BackgroundAttachment {
  SCROLL = 'scroll',
  FIXED = 'fixed',
  LOCAL = 'local',
}

/**
 * Background repeat types
 */
export enum BackgroundRepeat {
  NO_REPEAT = 'no-repeat',
  REPEAT = 'repeat',
  REPEAT_X = 'repeat-x',
  REPEAT_Y = 'repeat-y',
}

/**
 * Background clip types
 */
export enum BackgroundClip {
  BORDER_BOX = 'border-box',
  PADDING_BOX = 'padding-box',
  CONTENT_BOX = 'content-box',
}



/**
 * Text transform types
 */
export enum TextTransform {
  NONE = 'none',
  CAPITALIZE = 'capitalize',
  UPPERCASE = 'uppercase',
  LOWERCASE = 'lowercase',
}

/**
 * Text overflow types
 */
export enum TextOverflow {
  CLIP = 'clip',
  ELLIPSIS = 'ellipsis',
  FADE = 'fade',
}

/**
 * White space types
 */
export enum WhiteSpace {
  NORMAL = 'normal',
  NOWRAP = 'nowrap',
  PRE = 'pre',
  PRE_WRAP = 'pre-wrap',
  PRE_LINE = 'pre-line',
}

/**
 * CSS unit types
 */
export enum CSSUnit {
  PX = 'px',
  EM = 'em',
  REM = 'rem',
  PERCENT = '%',
  VW = 'vw',
  VH = 'vh',
}

/**
 * Button state types
 */
export enum ButtonState {
  IDLE = 'idle',
  HOVER = 'hover',
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

/**
 * Physics body type types
 */
export enum PhysicsBodyType {
  STATIC = 'static',
  DYNAMIC = 'dynamic',
  KINEMATIC = 'kinematic',
}

/**
 * Priority levels
 */
export enum PriorityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

/**
 * Value types
 */
export enum ValueType {
  NUMBER = 'number',
  PERCENTAGE = 'percentage',
  UNIT = 'unit',
  KEYWORD = 'keyword',
}

/**
 * Extended value types (includes auto)
 */
export enum ExtendedValueType {
  NUMBER = 'number',
  PERCENTAGE = 'percentage',
  UNIT = 'unit',
  KEYWORD = 'keyword',
  AUTO = 'auto',
}

/**
 * Border image repeat types
 */
export enum BorderImageRepeat {
  STRETCH = 'stretch',
  REPEAT = 'repeat',
  ROUND = 'round',
  SPACE = 'space',
}

/**
 * Horizontal alignment values
 */
export enum HorizontalAlignmentValue {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  START = 'start',
  END = 'end',
  STRETCH = 'stretch',
}

/**
 * Vertical alignment values
 */
export enum VerticalAlignmentValue {
  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',
  START = 'start',
  END = 'end',
  STRETCH = 'stretch',
}

/**
 * Border style values
 */
export enum BorderStyleValue {
  NONE = 'none',
  SOLID = 'solid',
  DASHED = 'dashed',
  DOTTED = 'dotted',
  DOUBLE = 'double',
  GROOVE = 'groove',
  RIDGE = 'ridge',
  INSET = 'inset',
  OUTSET = 'outset',
}

/**
 * Text decoration values
 */
export enum TextDecorationValue {
  NONE = 'none',
  UNDERLINE = 'underline',
  OVERLINE = 'overline',
  LINE_THROUGH = 'line-through',
  BLINK = 'blink',
}

/**
 * Animation direction values
 */
export enum AnimationDirectionValue {
  NORMAL = 'normal',
  REVERSE = 'reverse',
  ALTERNATE = 'alternate',
  ALTERNATE_REVERSE = 'alternate-reverse',
}

/**
 * Animation fill mode values
 */
export enum AnimationFillModeValue {
  NONE = 'none',
  FORWARDS = 'forwards',
  BACKWARDS = 'backwards',
  BOTH = 'both',
}

/**
 * Shadow filter types
 */
export enum ShadowFilter {
  DROP_SHADOW = 'drop-shadow',
  BOX_SHADOW = 'box-shadow',
}



// ============================================================================
// EXPORT ALL ENUMS
// ============================================================================

export const LAYOUT_SYSTEM_ENUMS = {
  // Unit System enums (imported for compatibility)
  UNIT_SYSTEM: {
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
    DIRECTION: AnimationDirection,
    FILL_MODE: AnimationFillMode,
    PLAY_STATE: AnimationPlayState,
    ITERATION_COUNT: AnimationIterationCount,
  },
  DEVICE: {
    CAPABILITY: DeviceCapability,
  },
  PERFORMANCE: {
    UPDATE_FREQUENCY: UpdateFrequency,
    LEVEL: PerformanceLevel,
    COMPLEXITY: ComplexityLevel,
    CALCULATION_SPEED: CalculationSpeed,
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
    MODE: ThemeMode,
  },
  STRATEGY: {
    LAYOUT: LayoutStrategy,
    SCALE: ScaleStrategy,
  },
  POSITION: {
    HORIZONTAL_ALIGNMENT: HorizontalAlignment,
    VERTICAL_ALIGNMENT: VerticalAlignment,
  },
  SIZE: {
    VALUE_TYPE: SizeValueType,
  },
  BORDER: {
    STYLE: BorderStyle,
  },
  TEXT: {
    BASELINE: TextBaseline,
    DECORATION: TextDecoration,
  },
  TRANSFORM: {
    STYLE: TransformStyle,
    BACKFACE_VISIBILITY: BackfaceVisibility,
  },
  INTERACTION: {
    POINTER_EVENTS: PointerEvents,
    USER_SELECT: UserSelect,
  },
  UNIT: {
    TYPE_SPEC: UnitTypeSpec,
    DIMENSION: UnitDimension,
    ROUNDING: RoundingStrategy,
  },
  COMPOSITION: {
    STRATEGY: StyleCompositionStrategy,
  },
  COMMAND: {
    CHANGE_TYPE: LayoutChangeType,
  },
  STATE: {
    CHANGE_TYPE: LayoutStateChangeType,
    TYPE: LayoutStateType,
  },
  CHAIN: {
    HANDLER_TYPE: LayoutChainHandlerType,
  },
  REFERENCE: {
    POSITION: PositionReference,
    SIZE: SizeReference,
    ORIENTATION: Orientation,
    ALIGNMENT_SELF: AlignmentSelf,
    PATTERN_REPEAT: PatternRepeat,
    GRADIENT_TYPE: GradientType,
    ANIMATION_EVENT_TYPE: AnimationEventType,
    PERFORMANCE_ALERT_TYPE: PerformanceAlertType,
    ALIGNMENT_REFERENCE: AlignmentReference,
    DISPLAY_TYPE: DisplayType,
    BACKGROUND_SIZE: BackgroundSize,
    BACKGROUND_POSITION: BackgroundPosition,
    BACKGROUND_ATTACHMENT: BackgroundAttachment,
    BACKGROUND_REPEAT: BackgroundRepeat,
    BACKGROUND_CLIP: BackgroundClip,
    TEXT_TRANSFORM: TextTransform,
    TEXT_OVERFLOW: TextOverflow,
    WHITE_SPACE: WhiteSpace,
    CSS_UNIT: CSSUnit,
    BUTTON_STATE: ButtonState,
    PHYSICS_BODY_TYPE: PhysicsBodyType,
    PRIORITY_LEVEL: PriorityLevel,
    VALUE_TYPE: ValueType,
    EXTENDED_VALUE_TYPE: ExtendedValueType,
    BORDER_IMAGE_REPEAT: BorderImageRepeat,
    HORIZONTAL_ALIGNMENT_VALUE: HorizontalAlignmentValue,
    VERTICAL_ALIGNMENT_VALUE: VerticalAlignmentValue,
    BORDER_STYLE_VALUE: BorderStyleValue,
    TEXT_DECORATION_VALUE: TextDecorationValue,
    ANIMATION_DIRECTION_VALUE: AnimationDirectionValue,
    ANIMATION_FILL_MODE_VALUE: AnimationFillModeValue,
    SHADOW_FILTER: ShadowFilter,
  },
} as const;
