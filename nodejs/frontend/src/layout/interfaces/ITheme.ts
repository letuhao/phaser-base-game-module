/**
 * Core Theme Interface
 * Defines the structure for theme objects in the layout system
 * Inspired by the best patterns from the existing theme configuration
 * Fully compatible with the Unit System
 */

import { 
  ColorName, 
  FontFamily, 
  FontSize, 
  FontWeight, 
  LineHeight,
  SpacingScale,
  AnimationDuration,
  AnimationEasing,
  ThemeType,
  ThemeVariant,
  BreakpointName
} from '../enums/LayoutEnums';
import { SizeUnit, PositionUnit, ScaleUnit } from '../../unit';

// ============================================================================
// CORE THEME INTERFACES
// ============================================================================

/**
 * Main theme configuration interface
 * Defines a complete theme with all styling properties
 */
export interface ITheme {
  /** Unique identifier for the theme */
  id: string;
  
  /** Human-readable name for the theme */
  name: string;
  
  /** Display name for UI purposes */
  displayName: string;
  
  /** Description of what this theme represents */
  description?: string;
  
  /** Theme type (light, dark, auto, custom) */
  type: ThemeType;
  
  /** Theme variant (default, primary, secondary, etc.) */
  variant: ThemeVariant;
  
  /** Whether this theme is currently active */
  isActive: boolean;
  
  /** Whether this theme supports dark mode */
  supportsDarkMode: boolean;
  
  /** Opposite theme for mode switching */
  oppositeTheme?: string;
  
  /** Version of this theme */
  version?: string;
  
  /** Author of this theme */
  author?: string;
  
  /** Tags for categorization */
  tags?: string[];
  
  /** Core theme properties */
  colors: IThemeColors;
  typography: IThemeTypography;
  spacing: IThemeSpacing;
  borderRadius: IThemeBorderRadius;
  shadows: IThemeShadows;
  animation: IThemeAnimation;
  breakpoints: IThemeBreakpoints;
  
  /** Theme class definitions for reusable styling */
  themeClasses?: Record<string, IThemeClass>;
  
  /** Custom properties specific to this theme */
  custom?: Record<string, unknown>;
  
  /** Metadata for the theme */
  metadata?: IThemeMetadata;
  
  /** Required theme methods */
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
  boxShadow?: string;
  borderRadiusValue?: number;
  
  /** Unit System compatible properties */
  width?: { value: number; unit: SizeUnit };
  height?: { value: number; unit: SizeUnit };
  position?: { x: { value: number; unit: PositionUnit }; y: { value: number; unit: PositionUnit } };
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
