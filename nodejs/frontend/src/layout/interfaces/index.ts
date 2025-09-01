/**
 * Layout System Interfaces - Main Export
 * 
 * This module exports all interfaces for the layout system.
 * Based on the best patterns from the existing codebase.
 */

// ============================================================================
// BREAKPOINT INTERFACES
// ============================================================================

export type {
  IBreakpoint,
  IBreakpointCondition,
  IBreakpointContext,
  IBreakpointMetadata,
} from './IBreakpoint';

export type {
  IBreakpointManager,
  IBreakpointListener,
  IBreakpointStatistics,
} from './IBreakpointManager';

// ============================================================================
// THEME INTERFACES
// ============================================================================

export type {
  // Core theme interfaces
  ITheme,
  IThemeColors,
  IColorPalette,
  IBackgroundColors,
  ITextColors,
  IStatusColors,
  IUIColors,
  ISemanticColors,
  
  // Typography interfaces
  IThemeTypography,
  IFontFamilies,
  IFontSizes,
  IFontWeights,
  ILineHeights,
  ILetterSpacing,
  ITextAlign,
  
  // Spacing and layout interfaces
  IThemeSpacing,
  ISpacingScale,
  IThemeBorderRadius,
  IThemeShadows,
  
  // Animation interfaces
  IThemeAnimation,
  IAnimationDuration,
  IAnimationEasing,
  IAnimationProperties,
  
  // Breakpoint interfaces
  IThemeBreakpoints,
  
  // Theme class interfaces
  IThemeClass,
  
  // Metadata interfaces
  IThemeMetadata,
} from './ITheme';

export type {
  IThemeManager,
  IThemeListener,
  IThemeStatistics,
  IThemeConfiguration,
} from './IThemeManager';

// ============================================================================
// STYLE INTERFACES
// ============================================================================

export type {
  // Core style interfaces
  IStyle,
  IBaseStyle,
  ILayoutStyle,
  IVisualStyle,
  IBackgroundStyle,
  IBorderStyle,
  ISpacingStyle,
  ITextStyle,
  IShadowStyle,
  ITransformStyle,
  IAnimationStyle,
  IFilterStyle,
  IInteractiveStyle,
  IResponsiveStyle,
  IThemeStyle,
  IUnitStyle,
  
  // Style metadata and composition
  IStyleMetadata,
  IStyleComposition,
  IStyleBuilder,
} from './IStyle';

export type {
  IStyleManager,
  IStyleListener,
  IStyleStatistics,
  IStyleConfiguration,
} from './IStyleManager';

// ============================================================================
// INTERFACE BUNDLES
// ============================================================================

/**
 * All breakpoint-related interfaces bundled together
 */
export const BREAKPOINT_INTERFACES = {
  BREAKPOINT: {
    IBreakpoint: 'IBreakpoint',
    IBreakpointCondition: 'IBreakpointCondition',
    IBreakpointContext: 'IBreakpointContext',
    IBreakpointMetadata: 'IBreakpointMetadata',
  },
  MANAGER: {
    IBreakpointManager: 'IBreakpointManager',
    IBreakpointListener: 'IBreakpointListener',
    IBreakpointStatistics: 'IBreakpointStatistics',
  },
} as const;

/**
 * All theme-related interfaces bundled together
 */
export const THEME_INTERFACES = {
  THEME: {
    ITheme: 'ITheme',
    IThemeColors: 'IThemeColors',
    IColorPalette: 'IColorPalette',
    IBackgroundColors: 'IBackgroundColors',
    ITextColors: 'ITextColors',
    IStatusColors: 'IStatusColors',
    IUIColors: 'IUIColors',
    ISemanticColors: 'ISemanticColors',
  },
  TYPOGRAPHY: {
    IThemeTypography: 'IThemeTypography',
    IFontFamilies: 'IFontFamilies',
    IFontSizes: 'IFontSizes',
    IFontWeights: 'IFontWeights',
    ILineHeights: 'ILineHeights',
    ILetterSpacing: 'ILetterSpacing',
    ITextAlign: 'ITextAlign',
  },
  LAYOUT: {
    IThemeSpacing: 'IThemeSpacing',
    ISpacingScale: 'ISpacingScale',
    IThemeBorderRadius: 'IThemeBorderRadius',
    IThemeShadows: 'IThemeShadows',
  },
  ANIMATION: {
    IThemeAnimation: 'IThemeAnimation',
    IAnimationDuration: 'IAnimationDuration',
    IAnimationEasing: 'IAnimationEasing',
    IAnimationProperties: 'IAnimationProperties',
  },
  BREAKPOINTS: {
    IThemeBreakpoints: 'IThemeBreakpoints',
  },
  CLASSES: {
    IThemeClass: 'IThemeClass',
  },
  METADATA: {
    IThemeMetadata: 'IThemeMetadata',
  },
  MANAGER: {
    IThemeManager: 'IThemeManager',
    IThemeListener: 'IThemeListener',
    IThemeStatistics: 'IThemeStatistics',
    IThemeConfiguration: 'IThemeConfiguration',
  },
} as const;

/**
 * All style-related interfaces bundled together
 */
export const STYLE_INTERFACES = {
  CORE: {
    IStyle: 'IStyle',
    IBaseStyle: 'IBaseStyle',
  },
  LAYOUT: {
    ILayoutStyle: 'ILayoutStyle',
    IVisualStyle: 'IVisualStyle',
    IBackgroundStyle: 'IBackgroundStyle',
    IBorderStyle: 'IBorderStyle',
    ISpacingStyle: 'ISpacingStyle',
  },
  CONTENT: {
    ITextStyle: 'ITextStyle',
    IShadowStyle: 'IShadowStyle',
    ITransformStyle: 'ITransformStyle',
  },
  INTERACTION: {
    IAnimationStyle: 'IAnimationStyle',
    IFilterStyle: 'IFilterStyle',
    IInteractiveStyle: 'IInteractiveStyle',
  },
  RESPONSIVE: {
    IResponsiveStyle: 'IResponsiveStyle',
    IThemeStyle: 'IThemeStyle',
    IUnitStyle: 'IUnitStyle',
  },
  METADATA: {
    IStyleMetadata: 'IStyleMetadata',
    IStyleComposition: 'IStyleComposition',
    IStyleBuilder: 'IStyleBuilder',
  },
  MANAGER: {
    IStyleManager: 'IStyleManager',
    IStyleListener: 'IStyleListener',
    IStyleStatistics: 'IStyleStatistics',
    IStyleConfiguration: 'IStyleConfiguration',
  },
} as const;

/**
 * All layout system interfaces bundled together
 */
export const LAYOUT_SYSTEM_INTERFACES = {
  BREAKPOINT: BREAKPOINT_INTERFACES,
  THEME: THEME_INTERFACES,
  STYLE: STYLE_INTERFACES,
} as const;
