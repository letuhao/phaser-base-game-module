/**
 * Core Theme Interface
 * Defines the structure for theme objects in the layout system
 * Inspired by the best patterns from the existing theme configuration
 * Fully compatible with the Unit System
 */

import { 
  ThemeType, 
  ThemeVariant, 
  BreakpointName,
  TextAlign, 
  TextDecoration, 
  TextTransform, 
  DisplayType, 
  PositionType, 
  OverflowType, 
  BorderStyle, 
  BackgroundSize, 
  BackgroundRepeat, 
  BackgroundAttachment, 
  FontStyle, 
  WhiteSpace, 
  TextOverflow
} from '../enums/LayoutEnums';
import { 
  CursorType, 
  FlexDirection, 
  FlexWrap, 
  JustifyContent, 
  AlignItems, 
  AlignSelf, 
  VisibilityType, 
  FontVariant, 
  WordBreak, 
  OverflowWrap,
  BoxSizing
} from '../enums/ThemeEnums';
import { SizeUnit, PositionUnit, ScaleUnit } from '../../unit';

// ============================================================================
// CORE THEME INTERFACES
// ============================================================================

/**
 * Main theme configuration interface
 * Defines a complete theme with all styling properties
 * 
 * NOTE: This interface now extends the segregated interfaces for better ISP compliance
 * For new implementations, consider using the individual interfaces directly
 */
export interface ITheme {
  /** Unique identifier for the theme */
  readonly id: string;

  /** Human-readable name for the theme */
  readonly name: string;

  /** Display name for UI purposes */
  readonly displayName: string;

  /** Description of what this theme represents */
  readonly description?: string;

  /** Theme type (light, dark, auto, custom) */
  readonly type: ThemeType;

  /** Theme variant (default, primary, secondary, etc.) */
  readonly variant: ThemeVariant;

  /** Whether this theme is currently active */
  readonly isActive: boolean;

  /** Whether this theme supports dark mode */
  readonly supportsDarkMode: boolean;

  /** Opposite theme for mode switching */
  readonly oppositeTheme?: string;

  /** Version of this theme */
  readonly version?: string;

  /** Author of this theme */
  readonly author?: string;

  /** Tags for categorization */
  readonly tags?: string[];

  /** Core theme properties */
  readonly colors: IThemeColors;
  readonly typography: IThemeTypography;
  readonly spacing: IThemeSpacing;
  readonly borderRadius: IThemeBorderRadius;
  readonly shadows: IThemeShadows;
  readonly animation: IThemeAnimation;
  readonly breakpoints: IThemeBreakpoints;

  /** Theme class definitions for reusable styling */
  readonly themeClasses?: Record<string, IThemeClass>;

  /** Custom properties specific to this theme */
  readonly custom?: Record<string, unknown>;

  /** Metadata for the theme */
  readonly metadata?: IThemeMetadata;

  /** Required theme methods with improved error handling */
  getColor(path: string): string;
  getSpacing(size: keyof IThemeSpacing['scale']): number;
  getFontSize(size: keyof IThemeTypography['fontSize']): number;
  getBorderRadius(size: keyof IThemeBorderRadius): number;
  getShadow(size: keyof IThemeShadows): string;
  getAnimationDuration(size: keyof IThemeAnimation['duration']): number;
  supportsBreakpoint(breakpoint: BreakpointName): boolean;
  getOppositeTheme(): string | null;
  clone(): ITheme;
  merge(other: Partial<ITheme>): ITheme;
}

// ============================================================================
// THEME COLOR INTERFACES
// ============================================================================

/**
 * Theme colors interface
 * Defines all color properties for a theme
 */
export interface IThemeColors {
  /** Primary color palette */
  primary: IColorPalette;

  /** Secondary color palette */
  secondary: IColorPalette;

  /** Background colors */
  background: IBackgroundColors;

  /** Text colors */
  text: ITextColors;

  /** Status colors (success, warning, error, info) */
  status: IStatusColors;

  /** UI element colors */
  ui: IUIColors;

  /** Semantic color mappings */
  semantic: ISemanticColors;

  /** Custom color definitions */
  custom?: Record<string, string>;
}

/**
 * Color palette interface
 * Defines a set of related colors (main, light, dark, contrast)
 */
export interface IColorPalette {
  /** Main color */
  main: string;

  /** Light variant */
  light: string;

  /** Dark variant */
  dark: string;

  /** Contrast color for text */
  contrast: string;

  /** Additional variants */
  variants?: Record<string, string>;
}

/**
 * Background colors interface
 */
export interface IBackgroundColors {
  /** Primary background */
  primary: string;

  /** Secondary background */
  secondary: string;

  /** Tertiary background */
  tertiary: string;

  /** Overlay background */
  overlay: string;

  /** Additional background variants */
  variants?: Record<string, string>;
}

/**
 * Text colors interface
 */
export interface ITextColors {
  /** Primary text color */
  primary: string;

  /** Secondary text color */
  secondary: string;

  /** Disabled text color */
  disabled: string;

  /** Inverse text color */
  inverse: string;

  /** Additional text variants */
  variants?: Record<string, string>;
}

/**
 * Status colors interface
 */
export interface IStatusColors {
  /** Success color */
  success: string;

  /** Warning color */
  warning: string;

  /** Error color */
  error: string;

  /** Info color */
  info: string;

  /** Additional status variants */
  variants?: Record<string, string>;
}

/**
 * UI colors interface
 */
export interface IUIColors {
  /** Border color */
  border: string;

  /** Shadow color */
  shadow: string;

  /** Highlight color */
  highlight: string;

  /** Disabled color */
  disabled: string;

  /** Additional UI variants */
  variants?: Record<string, string>;
}

/**
 * Semantic colors interface
 * Maps semantic meanings to colors
 */
export interface ISemanticColors {
  /** Brand colors */
  brand?: Record<string, string>;

  /** Functional colors */
  functional?: Record<string, string>;

  /** State colors */
  state?: Record<string, string>;

  /** Custom semantic mappings */
  custom?: Record<string, string>;
}

// ============================================================================
// THEME TYPOGRAPHY INTERFACES
// ============================================================================

/**
 * Theme typography interface
 * Defines all typography properties for a theme
 */
export interface IThemeTypography {
  /** Font families */
  fontFamily: IFontFamilies;

  /** Font sizes */
  fontSize: IFontSizes;

  /** Font weights */
  fontWeight: IFontWeights;

  /** Line heights */
  lineHeight: ILineHeights;

  /** Letter spacing */
  letterSpacing?: ILetterSpacing;

  /** Text alignment options */
  textAlign?: ITextAlign;

  /** Custom typography definitions */
  custom?: Record<string, unknown>;
}

/**
 * Font families interface
 */
export interface IFontFamilies {
  /** Primary font family */
  primary: string;

  /** Secondary font family */
  secondary: string;

  /** Monospace font family */
  monospace: string;

  /** Display font family */
  display?: string;

  /** Additional font families */
  variants?: Record<string, string>;
}

/**
 * Font sizes interface
 * Compatible with Unit System SizeUnit
 */
export interface IFontSizes {
  /** Extra small */
  xs: number;

  /** Small */
  sm: number;

  /** Base size */
  base: number;

  /** Large */
  lg: number;

  /** Extra large */
  xl: number;

  /** 2X large */
  '2xl': number;

  /** 3X large */
  '3xl': number;

  /** Display size */
  display?: number;

  /** Additional size variants */
  variants?: Record<string, number>;
}

/**
 * Font weights interface
 */
export interface IFontWeights {
  /** Light weight */
  light: number;

  /** Normal weight */
  normal: number;

  /** Medium weight */
  medium: number;

  /** Semi-bold weight */
  semibold: number;

  /** Bold weight */
  bold: number;

  /** Extra bold weight */
  extrabold?: number;

  /** Additional weight variants */
  variants?: Record<string, number>;
}

/**
 * Line heights interface
 */
export interface ILineHeights {
  /** Tight line height */
  tight: number;

  /** Normal line height */
  normal: number;

  /** Relaxed line height */
  relaxed: number;

  /** Loose line height */
  loose?: number;

  /** Additional line height variants */
  variants?: Record<string, number>;
}

/**
 * Letter spacing interface
 */
export interface ILetterSpacing {
  /** Tight spacing */
  tight: number;

  /** Normal spacing */
  normal: number;

  /** Wide spacing */
  wide: number;

  /** Additional spacing variants */
  variants?: Record<string, number>;
}

/**
 * Text alignment interface
 */
export interface ITextAlign {
  /** Left alignment */
  left: string;

  /** Center alignment */
  center: string;

  /** Right alignment */
  right: string;

  /** Justify alignment */
  justify: string;

  /** Additional alignment variants */
  variants?: Record<string, string>;
}

// ============================================================================
// THEME SPACING INTERFACES
// ============================================================================

/**
 * Theme spacing interface
 * Compatible with Unit System SizeUnit
 */
export interface IThemeSpacing {
  /** Base spacing unit */
  base: number;

  /** Spacing scale */
  scale: ISpacingScale;

  /** Custom spacing definitions */
  custom?: Record<string, number>;
}

/**
 * Spacing scale interface
 * Compatible with Unit System SizeUnit
 */
export interface ISpacingScale {
  /** Extra small spacing */
  xs: number;

  /** Small spacing */
  sm: number;

  /** Medium spacing */
  md: number;

  /** Large spacing */
  lg: number;

  /** Extra large spacing */
  xl: number;

  /** 2X large spacing */
  '2xl': number;

  /** 3X large spacing */
  '3xl': number;

  /** Additional scale variants */
  variants?: Record<string, number>;
}

// ============================================================================
// THEME BORDER RADIUS INTERFACES
// ============================================================================

/**
 * Theme border radius interface
 * Compatible with Unit System SizeUnit
 */
export interface IThemeBorderRadius {
  /** No border radius */
  none: number;

  /** Small border radius */
  sm: number;

  /** Base border radius */
  base: number;

  /** Large border radius */
  lg: number;

  /** Extra large border radius */
  xl: number;

  /** Full border radius (circular) */
  full: number;

  /** Additional radius variants */
  variants?: Record<string, number>;
}

// ============================================================================
// THEME SHADOW INTERFACES
// ============================================================================

/**
 * Theme shadows interface
 */
export interface IThemeShadows {
  /** Small shadow */
  sm: string;

  /** Base shadow */
  base: string;

  /** Medium shadow */
  md: string;

  /** Large shadow */
  lg: string;

  /** Extra large shadow */
  xl: string;

  /** 2X large shadow */
  '2xl': string;

  /** Additional shadow variants */
  variants?: Record<string, string>;
}

// ============================================================================
// THEME ANIMATION INTERFACES
// ============================================================================

/**
 * Theme animation interface
 * Compatible with Unit System timing
 */
export interface IThemeAnimation {
  /** Animation durations */
  duration: IAnimationDuration;

  /** Animation easing functions */
  easing: IAnimationEasing;

  /** Animation properties */
  properties: IAnimationProperties;

  /** Custom animation definitions */
  custom?: Record<string, unknown>;
}

/**
 * Animation duration interface
 */
export interface IAnimationDuration {
  /** Fast duration */
  fast: number;

  /** Normal duration */
  normal: number;

  /** Slow duration */
  slow: number;

  /** Very slow duration */
  verySlow: number;

  /** Additional duration variants */
  variants?: Record<string, number>;
}

/**
 * Animation easing interface
 */
export interface IAnimationEasing {
  /** Linear easing */
  linear: string;

  /** Ease easing */
  ease: string;

  /** Ease-in easing */
  easeIn: string;

  /** Ease-out easing */
  easeOut: string;

  /** Ease-in-out easing */
  easeInOut: string;

  /** Additional easing variants */
  variants?: Record<string, string>;
}

/**
 * Animation properties interface
 */
export interface IAnimationProperties {
  /** All properties */
  all: string;

  /** Opacity property */
  opacity: string;

  /** Transform property */
  transform: string;

  /** Color property */
  color: string;

  /** Background property */
  background: string;

  /** Additional property variants */
  variants?: Record<string, string>;
}

// ============================================================================
// THEME BREAKPOINT INTERFACES
// ============================================================================

/**
 * Theme breakpoints interface
 * Compatible with Unit System responsive design
 */
export interface IThemeBreakpoints {
  /** Extra small breakpoint */
  xs: number;

  /** Small breakpoint */
  sm: number;

  /** Medium breakpoint */
  md: number;

  /** Large breakpoint */
  lg: number;

  /** Extra large breakpoint */
  xl: number;

  /** 2X large breakpoint */
  '2xl': number;

  /** Additional breakpoint variants */
  variants?: Record<string, number>;
}

// ============================================================================
// THEME CLASS INTERFACES
// ============================================================================

/**
 * Theme class interface
 * Defines a reusable CSS-like class with theme properties
 */
export interface IThemeClass {
  /** Color properties */
  colors?: Partial<IThemeColors>;

  /** Typography properties */
  typography?: Partial<IThemeTypography>;

  /** Spacing properties */
  spacing?: Partial<IThemeSpacing>;

  /** Border radius properties */
  borderRadius?: Partial<IThemeBorderRadius>;

  /** Shadow properties */
  shadows?: Partial<IThemeShadows>;

  /** Animation properties */
  animation?: Partial<IThemeAnimation>;

  /** CSS-like properties */
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  padding?: number;
  margin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingRight?: number;
  boxShadow?: string;
  borderRadiusValue?: number;
  textAlign?: TextAlign;
  textDecoration?: TextDecoration;
  textTransform?: TextTransform;
  lineHeight?: number;
  letterSpacing?: number;
  cursor?: CursorType;
  opacity?: number;
  transform?: string;
  transition?: string;
  cssAnimation?: string;
  display?: DisplayType;
  position?: PositionType;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  zIndex?: number;
  overflow?: OverflowType;
  border?: string;
  borderWidth?: number;
  borderStyle?: BorderStyle;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;

  /** Background properties */
  backgroundImage?: string;
  backgroundSize?: BackgroundSize | string;
  backgroundPosition?: string;
  backgroundRepeat?: BackgroundRepeat;
  backgroundAttachment?: BackgroundAttachment;

  /** Flexbox properties */
  flex?: string;
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  alignSelf?: AlignSelf;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string | number;
  order?: number;

  /** Box model properties */
  boxSizing?: BoxSizing;
  minWidth?: number | string;
  maxWidth?: number | string;
  minHeight?: number | string;
  maxHeight?: number | string;

  /** Visual properties */
  visibility?: VisibilityType;
  filter?: string;
  backdropFilter?: string;

  /** Advanced typography */
  fontStyle?: FontStyle;
  fontVariant?: FontVariant;
  wordSpacing?: number;
  textIndent?: number;
  whiteSpace?: WhiteSpace;
  wordBreak?: WordBreak;
  textOverflow?: TextOverflow;
  overflowWrap?: OverflowWrap;

  /** Flexbox gap property */
  gap?: number | string;

  /** Unit System compatible properties */
  width?: { value: number; unit: SizeUnit };
  height?: { value: number; unit: SizeUnit };
  unitPosition?: {
    x: { value: number; unit: PositionUnit };
    y: { value: number; unit: PositionUnit };
  };
  scale?: { value: number; unit: ScaleUnit };

  /** Custom properties */
  custom?: Record<string, unknown>;
}

// ============================================================================
// THEME METADATA INTERFACES
// ============================================================================

/**
 * Theme metadata interface
 * Contains additional information about a theme
 */
export interface IThemeMetadata {
  /** When this theme was created */
  createdAt: Date;

  /** When this theme was last modified */
  modifiedAt: Date;

  /** Author of this theme */
  author?: string;

  /** Version of this theme */
  version?: string;

  /** Tags for categorization */
  tags?: string[];

  /** Custom metadata */
  custom?: Record<string, unknown>;
}
