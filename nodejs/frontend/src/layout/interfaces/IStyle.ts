/**
 * Modular Style Interface System
 * Uses Composite Pattern and Strategy Pattern for easy extension
 * Separates concerns into focused interfaces following SOLID principles
 * Fully compatible with Unit System and responsive design
 */

import {
  SizeUnit,
  PositionUnit,
  ScaleUnit,
  SizeValue,
  PositionValue,
  ScaleValue,
  IRandomValueNumber,
} from '../../unit';
import {
  Alignment,
  ScaleStrategy,
  PositionType,
  FontWeight,
  FontStyle,
  TextAlign,
  CursorStyle,
  AnimationEasing,
  BreakpointName,
  HorizontalAlignment,
  VerticalAlignment,
  // SizeValueType removed - use SizeValue from unit system
  BorderStyle,
  TextBaseline,
  TextDecoration,
  AnimationDirection,
  AnimationFillMode,
  AnimationPlayState,
  AnimationIterationCount,
  TransformStyle,
  BackfaceVisibility,
  PointerEvents,
  UserSelect,
  ThemeMode,
  UnitTypeSpec,
  UnitDimension,
  RoundingStrategy,
  StyleCompositionStrategy,
} from '../enums/LayoutEnums';

// ============================================================================
// CORE STYLE INTERFACES
// ============================================================================

/**
 * Base style interface
 * Defines the core structure for all style properties
 */
export interface IBaseStyle {
  /** Unique identifier for this style configuration */
  id: string;

  /** Human-readable name */
  name: string;

  /** Description of what this style represents */
  description?: string;

  /** Whether this style is currently active */
  isActive: boolean;

  /** Priority for style resolution (higher = more important) */
  priority: number;

  /** Custom properties specific to this style */
  custom?: Record<string, unknown>;

  /** Metadata for the style */
  metadata?: IStyleMetadata;
}

/**
 * Main style interface using composition
 * Combines all style aspects through composition rather than inheritance
 */
export interface IStyle extends IBaseStyle {
  /** Layout properties (position, size, alignment) */
  layout?: ILayoutStyle;

  /** Visual properties (opacity, visibility, rotation) */
  visual?: IVisualStyle;

  /** Background properties (color, image, tint) */
  background?: IBackgroundStyle;

  /** Border properties (color, width, radius) */
  border?: IBorderStyle;

  /** Spacing properties (margin, padding) */
  spacing?: ISpacingStyle;

  /** Text properties (font, color, alignment) */
  text?: ITextStyle;

  /** Shadow properties (color, blur, offset) */
  shadow?: IShadowStyle;

  /** Transform properties (skew, origin) */
  transform?: ITransformStyle;

  /** Animation properties (duration, easing, loop) */
  animation?: IAnimationStyle;

  /** Filter properties (blur, brightness, contrast) */
  filter?: IFilterStyle;

  /** Interactive properties (cursor, interactive) */
  interactive?: IInteractiveStyle;

  /** Responsive properties (breakpoints, behavior) */
  responsive?: IResponsiveStyle;

  /** Theme properties (classes, custom properties) */
  theme?: IThemeStyle;

  /** Unit System properties (size, position, scale units) */
  units?: IUnitStyle;
}

// ============================================================================
// LAYOUT STYLE INTERFACES
// ============================================================================

/**
 * Layout style interface
 * Handles positioning, sizing, and alignment
 */
export interface ILayoutStyle {
  /** X position with Unit System support */
  positionX?: number | PositionValue | PositionUnit | HorizontalAlignment | IRandomValueNumber;

  /** Y position with Unit System support */
  positionY?: number | PositionValue | PositionUnit | VerticalAlignment | IRandomValueNumber;

  /** Z position (depth) */
  positionZ?: number | IRandomValueNumber;

  /** Width with Unit System support */
  width?: number | SizeValue | SizeUnit | IRandomValueNumber;

  /** Height with Unit System support */
  height?: number | SizeValue | SizeUnit | IRandomValueNumber;

  /** Position type */
  position?: PositionType;

  /** Alignment within parent container */
  alignment?: Alignment;

  /** Z-index for layering */
  zIndex?: number | IRandomValueNumber;

  /** Z-order for layering (alternative to zIndex) */
  zOrder?: number | IRandomValueNumber;

  /** Whether to maintain aspect ratio */
  maintainAspectRatio?: boolean;

  /** Scale strategy for responsive behavior */
  scaleStrategy?: ScaleStrategy;

  /** Scale mode (alias for scaleStrategy) */
  scaleMode?: ScaleStrategy;
}

// ============================================================================
// VISUAL STYLE INTERFACES
// ============================================================================

/**
 * Visual style interface
 * Handles basic visual properties
 */
export interface IVisualStyle {
  /** Opacity (0-1) */
  alpha?: number | IRandomValueNumber;

  /** Rotation in radians */
  rotation?: number | IRandomValueNumber;

  /** Whether the object is visible */
  visible?: boolean;

  /** Scale factor with Unit System support */
  scale?: number | ScaleValue | ScaleUnit | IRandomValueNumber;

  /** Scale X factor with Unit System support */
  scaleX?: number | ScaleValue | ScaleUnit | IRandomValueNumber;

  /** Scale Y factor with Unit System support */
  scaleY?: number | ScaleValue | ScaleUnit | IRandomValueNumber;
}

// ============================================================================
// BACKGROUND STYLE INTERFACES
// ============================================================================

/**
 * Background style interface
 * Handles background properties
 */
export interface IBackgroundStyle {
  /** Background color */
  backgroundColor?: number | string;

  /** Background image texture key */
  backgroundImage?: string;

  /** Background image tint color */
  backgroundTint?: number | string;

  /** Background opacity */
  backgroundAlpha?: number | IRandomValueNumber;

  /** Background blend mode */
  backgroundBlendMode?: string;
}

// ============================================================================
// BORDER STYLE INTERFACES
// ============================================================================

/**
 * Border style interface
 * Handles border properties
 */
export interface IBorderStyle {
  /** Border color */
  borderColor?: number | string;

  /** Border width */
  borderWidth?: number | IRandomValueNumber;

  /** Border radius for rounded corners */
  borderRadius?: number | IRandomValueNumber;

  /** Border style */
  borderStyle?: BorderStyle;

  /** Border top width */
  borderTopWidth?: number | IRandomValueNumber;

  /** Border right width */
  borderRightWidth?: number | IRandomValueNumber;

  /** Border bottom width */
  borderBottomWidth?: number | IRandomValueNumber;

  /** Border left width */
  borderLeftWidth?: number | IRandomValueNumber;

  /** Border top left radius */
  borderTopLeftRadius?: number | IRandomValueNumber;

  /** Border top right radius */
  borderTopRightRadius?: number | IRandomValueNumber;

  /** Border bottom right radius */
  borderBottomRightRadius?: number | IRandomValueNumber;

  /** Border bottom left radius */
  borderBottomLeftRadius?: number | IRandomValueNumber;
}

// ============================================================================
// SPACING STYLE INTERFACES
// ============================================================================

/**
 * Spacing style interface
 * Handles margin and padding
 */
export interface ISpacingStyle {
  /** Margin around the object */
  margin?: number | IRandomValueNumber;

  /** Margin top */
  marginTop?: number | IRandomValueNumber;

  /** Margin right */
  marginRight?: number | IRandomValueNumber;

  /** Margin bottom */
  marginBottom?: number | IRandomValueNumber;

  /** Margin left */
  marginLeft?: number | IRandomValueNumber;

  /** Padding inside the object */
  padding?: number | IRandomValueNumber;

  /** Padding top */
  paddingTop?: number | IRandomValueNumber;

  /** Padding right */
  paddingRight?: number | IRandomValueNumber;

  /** Padding bottom */
  paddingBottom?: number | IRandomValueNumber;

  /** Padding left */
  paddingLeft?: number | IRandomValueNumber;
}

// ============================================================================
// TEXT STYLE INTERFACES
// ============================================================================

/**
 * Text style interface
 * Handles font and text properties
 */
export interface ITextStyle {
  /** Font family name */
  fontFamily?: string;

  /** Font size in pixels */
  fontSize?: number | IRandomValueNumber;

  /** Font weight */
  fontWeight?: FontWeight;

  /** Font style */
  fontStyle?: FontStyle;

  /** Text color */
  color?: number | string;

  /** Text alignment */
  textAlign?: TextAlign;

  /** Line height multiplier */
  lineHeight?: number | IRandomValueNumber;

  /** Letter spacing in pixels */
  letterSpacing?: number | IRandomValueNumber;

  /** Text shadow color */
  textShadowColor?: number | string;

  /** Text shadow blur radius */
  textShadowBlur?: number | IRandomValueNumber;

  /** Text shadow offset X */
  textShadowOffsetX?: number | IRandomValueNumber;

  /** Text shadow offset Y */
  textShadowOffsetY?: number | IRandomValueNumber;

  /** Whether to enable word wrapping */
  wordWrap?: boolean;

  /** Maximum width for word wrapping */
  wordWrapWidth?: number | IRandomValueNumber;

  /** Text baseline */
  textBaseline?: TextBaseline;

  /** Text decoration */
  textDecoration?: TextDecoration;
}

// ============================================================================
// SHADOW STYLE INTERFACES
// ============================================================================

/**
 * Shadow style interface
 * Handles shadow properties
 */
export interface IShadowStyle {
  /** Shadow color */
  shadowColor?: number | string;

  /** Shadow blur radius */
  shadowBlur?: number | IRandomValueNumber;

  /** Shadow offset X */
  shadowOffsetX?: number | IRandomValueNumber;

  /** Shadow offset Y */
  shadowOffsetY?: number | IRandomValueNumber;

  /** Shadow alpha (0-1) */
  shadowAlpha?: number | IRandomValueNumber;

  /** Shadow spread radius */
  shadowSpread?: number | IRandomValueNumber;

  /** Shadow inset */
  shadowInset?: boolean;
}

// ============================================================================
// TRANSFORM STYLE INTERFACES
// ============================================================================

/**
 * Transform style interface
 * Handles transform properties
 */
export interface ITransformStyle {
  /** Skew X in radians */
  skewX?: number | IRandomValueNumber;

  /** Skew Y in radians */
  skewY?: number | IRandomValueNumber;

  /** Transform origin X (0-1) */
  transformOriginX?: number | IRandomValueNumber;

  /** Transform origin Y (0-1) */
  transformOriginY?: number | IRandomValueNumber;

  /** Transform origin Z (0-1) */
  transformOriginZ?: number | IRandomValueNumber;

  /** Transform style */
  transformStyle?: TransformStyle;

  /** Backface visibility */
  backfaceVisibility?: BackfaceVisibility;
}

// ============================================================================
// ANIMATION STYLE INTERFACES
// ============================================================================

/**
 * Animation style interface
 * Handles animation properties
 */
export interface IAnimationStyle {
  /** Animation duration in milliseconds */
  duration?: number | IRandomValueNumber;

  /** Animation easing function */
  easing?: AnimationEasing;

  /** Whether to loop animations */
  loop?: boolean;

  /** Animation delay in milliseconds */
  delay?: number | IRandomValueNumber;

  /** Animation direction */
  direction?: AnimationDirection;

  /** Animation fill mode */
  fillMode?: AnimationFillMode;

  /** Animation iteration count */
  iterationCount?: number | AnimationIterationCount;

  /** Animation play state */
  playState?: AnimationPlayState;

  /** Animation timing function */
  timingFunction?: string;
}

// ============================================================================
// FILTER STYLE INTERFACES
// ============================================================================

/**
 * Filter style interface
 * Handles filter properties
 */
export interface IFilterStyle {
  /** Blur filter amount */
  blur?: number | IRandomValueNumber;

  /** Brightness filter (0-2, 1 is normal) */
  brightness?: number | IRandomValueNumber;

  /** Contrast filter (0-2, 1 is normal) */
  contrast?: number | IRandomValueNumber;

  /** Hue rotation filter in degrees */
  hueRotate?: number | IRandomValueNumber;

  /** Saturation filter (0-2, 1 is normal) */
  saturation?: number | IRandomValueNumber;

  /** Grayscale filter (0-1, 0 is normal) */
  grayscale?: number | IRandomValueNumber;

  /** Invert filter (0-1, 0 is normal) */
  invert?: number | IRandomValueNumber;

  /** Sepia filter (0-1, 0 is normal) */
  sepia?: number | IRandomValueNumber;

  /** Opacity filter (0-1, 1 is normal) */
  opacity?: number | IRandomValueNumber;
}

// ============================================================================
// INTERACTIVE STYLE INTERFACES
// ============================================================================

/**
 * Interactive style interface
 * Handles interactive properties
 */
export interface IInteractiveStyle {
  /** Whether the object is interactive */
  interactive?: boolean;

  /** Cursor style when hovering */
  cursor?: CursorStyle;

  /** Whether to enable pointer events */
  pointerEvents?: PointerEvents;

  /** Whether to enable user selection */
  userSelect?: UserSelect;

  /** Whether to enable drag */
  draggable?: boolean;

  /** Whether to enable drop */
  droppable?: boolean;
}

// ============================================================================
// RESPONSIVE STYLE INTERFACES
// ============================================================================

/**
 * Responsive style interface
 * Handles responsive properties
 */
export interface IResponsiveStyle {
  /** Responsive breakpoint conditions */
  breakpoint?: BreakpointName;

  /** Responsive behavior configuration */
  behavior?: {
    maintainAspectRatio: boolean;
    scaleStrategy: ScaleStrategy;
    alignment: Alignment;
    backgroundImage?: string;
  };

  /** Responsive fallback styles */
  fallback?: Partial<IStyle>;
}

// ============================================================================
// THEME STYLE INTERFACES
// ============================================================================

/**
 * Theme style interface
 * Handles theme properties
 */
export interface IThemeStyle {
  /** CSS-like theme classes to apply */
  classes?: string[];

  /** Custom CSS properties for theme variables */
  customProperties?: Record<string, string | number>;

  /** Theme variant */
  variant?: string;

  /** Theme mode */
  mode?: ThemeMode;

  /** Theme context */
  context?: Record<string, unknown>;
}

// ============================================================================
// UNIT STYLE INTERFACES
// ============================================================================

/**
 * Unit style interface
 * Handles Unit System specific properties
 */
export interface IUnitStyle {
  /** Unit type specification */
  unitType?: UnitTypeSpec;

  /** Unit dimension */
  dimension?: UnitDimension;

  /** Unit constraints */
  constraints?: {
    minValue?: number;
    maxValue?: number;
    step?: number;
  };

  /** Unit validation rules */
  validation?: {
    required?: boolean;
    allowNegative?: boolean;
    allowZero?: boolean;
  };

  /** Unit conversion settings */
  conversion?: {
    autoConvert?: boolean;
    precision?: number;
    rounding?: RoundingStrategy;
  };
}

// ============================================================================
// STYLE METADATA INTERFACES
// ============================================================================

/**
 * Style metadata interface
 * Contains additional information about a style
 */
export interface IStyleMetadata {
  /** When this style was created */
  createdAt: Date;

  /** When this style was last modified */
  modifiedAt: Date;

  /** Author of this style */
  author?: string;

  /** Version of this style */
  version?: string;

  /** Tags for categorization */
  tags?: string[];

  /** Custom metadata */
  custom?: Record<string, unknown>;
}

// ============================================================================
// STYLE COMPOSITION INTERFACES
// ============================================================================

/**
 * Style composition interface
 * Allows combining multiple style aspects
 */
export interface IStyleComposition {
  /** Base style */
  base: IStyle;

  /** Additional style aspects */
  aspects: Partial<IStyle>[];

  /** Composition strategy */
  strategy: StyleCompositionStrategy;

  /** Priority order for resolution */
  priority?: number[];
}

/**
 * Style builder interface
 * For programmatically building styles
 */
export interface IStyleBuilder {
  /** Add layout properties */
  withLayout(layout: Partial<ILayoutStyle>): IStyleBuilder;

  /** Add visual properties */
  withVisual(visual: Partial<IVisualStyle>): IStyleBuilder;

  /** Add background properties */
  withBackground(background: Partial<IBackgroundStyle>): IStyleBuilder;

  /** Add border properties */
  withBorder(border: Partial<IBorderStyle>): IStyleBuilder;

  /** Add spacing properties */
  withSpacing(spacing: Partial<ISpacingStyle>): IStyleBuilder;

  /** Add text properties */
  withText(text: Partial<ITextStyle>): IStyleBuilder;

  /** Add shadow properties */
  withShadow(shadow: Partial<IShadowStyle>): IStyleBuilder;

  /** Add transform properties */
  withTransform(transform: Partial<ITransformStyle>): IStyleBuilder;

  /** Add animation properties */
  withAnimation(animation: Partial<IAnimationStyle>): IStyleBuilder;

  /** Add filter properties */
  withFilter(filter: Partial<IFilterStyle>): IStyleBuilder;

  /** Add interactive properties */
  withInteractive(interactive: Partial<IInteractiveStyle>): IStyleBuilder;

  /** Add responsive properties */
  withResponsive(responsive: Partial<IResponsiveStyle>): IStyleBuilder;

  /** Add theme properties */
  withTheme(theme: Partial<IThemeStyle>): IStyleBuilder;

  /** Add unit properties */
  withUnits(units: Partial<IUnitStyle>): IStyleBuilder;

  /** Build the final style */
  build(): IStyle;
}
