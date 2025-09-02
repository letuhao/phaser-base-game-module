/**
 * Theme-Layout Bridge Interface
 *
 * Bridge interface that connects the Theme System with the Layout System.
 * Handles theme value application and integration with layout configurations.
 *
 * This bridge provides:
 * - Theme value application to layout calculations
 * - Theme-aware layout configurations
 * - Theme-responsive layout changes
 * - Theme validation for layout contexts
 */

import type { ITheme, IThemeClass } from '../../../layout/interfaces/ITheme';
import type {
  ILayoutConfig,
  ILayoutContext,
  ICalculatedLayout,
} from '../../../layout/interfaces/ILayout';
import type { ILayoutStrategy } from '../../../layout/interfaces/ILayoutStrategy';
import {
  BreakpointName,
  LayoutType,
  ThemeType,
  ThemeVariant,
} from '../../../layout/enums/LayoutEnums';

// ============================================================================
// THEME-LAYOUT BRIDGE INTERFACE
// ============================================================================

/**
 * Bridge interface for Theme System and Layout System integration
 *
 * Provides seamless integration between theme values and layout configurations.
 */
export interface IThemeLayoutBridge {
  /** Bridge ID */
  readonly bridgeId: string;

  /** Whether the bridge is initialized */
  readonly isInitialized: boolean;

  /** Supported theme types */
  readonly supportedThemeTypes: ThemeType[];

  /** Supported layout types */
  readonly supportedLayoutTypes: LayoutType[];

  /** Bridge statistics */
  readonly statistics: IThemeLayoutBridgeStatistics;

  // ===== INITIALIZATION =====

  /**
   * Initialize the bridge
   * @param config Bridge configuration
   */
  initialize(config?: IThemeLayoutBridgeConfig): Promise<void>;

  /**
   * Destroy the bridge and clean up resources
   */
  destroy(): Promise<void>;

  // ===== THEME APPLICATION =====

  /**
   * Apply theme values to layout calculations
   * @param layoutConfig Base layout configuration
   * @param theme Theme to apply
   * @param context Layout context
   */
  applyThemeToLayout(
    layoutConfig: ILayoutConfig,
    theme: ITheme,
    context: ILayoutContext
  ): ILayoutConfig;

  /**
   * Apply theme class to layout configuration
   * @param layoutConfig Layout configuration
   * @param themeClass Theme class to apply
   * @param context Layout context
   */
  applyThemeClassToLayout(
    layoutConfig: ILayoutConfig,
    themeClass: IThemeClass,
    context: ILayoutContext
  ): ILayoutConfig;

  /**
   * Apply multiple theme classes to layout
   * @param layoutConfig Layout configuration
   * @param themeClasses Theme classes to apply
   * @param context Layout context
   */
  applyThemeClassesToLayout(
    layoutConfig: ILayoutConfig,
    themeClasses: IThemeClass[],
    context: ILayoutContext
  ): ILayoutConfig;

  // ===== THEME-AWARE LAYOUT VALUES =====

  /**
   * Get theme-aware layout values
   * @param theme Theme to get values from
   * @param layoutType Layout type
   * @param context Layout context
   */
  getThemeLayoutValues(
    theme: ITheme,
    layoutType: LayoutType,
    context: ILayoutContext
  ): Partial<ILayoutConfig>;

  /**
   * Get theme spacing values for layout
   * @param theme Theme to get spacing from
   * @param context Layout context
   */
  getThemeSpacingForLayout(
    theme: ITheme,
    context: ILayoutContext
  ): {
    margin: { top: number; right: number; bottom: number; left: number };
    padding: { top: number; right: number; bottom: number; left: number };
    gap: number;
  };

  /**
   * Get theme color values for layout
   * @param theme Theme to get colors from
   * @param context Layout context
   */
  getThemeColorsForLayout(
    theme: ITheme,
    context: ILayoutContext
  ): {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    shadowColor: string;
  };

  /**
   * Get theme typography values for layout
   * @param theme Theme to get typography from
   * @param context Layout context
   */
  getThemeTypographyForLayout(
    theme: ITheme,
    context: ILayoutContext
  ): {
    fontSize: number;
    lineHeight: number;
    fontWeight: string;
    fontFamily: string;
  };

  // ===== THEME-RESPONSIVE LAYOUT CHANGES =====

  /**
   * Handle theme-responsive layout changes
   * @param layout Current layout
   * @param newTheme New theme
   * @param context Layout context
   */
  updateLayoutForThemeChange(
    layout: ICalculatedLayout,
    newTheme: ITheme,
    context: ILayoutContext
  ): ICalculatedLayout;

  /**
   * Handle theme type changes (light/dark)
   * @param layout Current layout
   * @param newThemeType New theme type
   * @param context Layout context
   */
  updateLayoutForThemeTypeChange(
    layout: ICalculatedLayout,
    newThemeType: ThemeType,
    context: ILayoutContext
  ): ICalculatedLayout;

  /**
   * Handle theme variant changes
   * @param layout Current layout
   * @param newThemeVariant New theme variant
   * @param context Layout context
   */
  updateLayoutForThemeVariantChange(
    layout: ICalculatedLayout,
    newThemeVariant: ThemeVariant,
    context: ILayoutContext
  ): ICalculatedLayout;

  /**
   * Get responsive theme values for breakpoint
   * @param theme Theme to get values from
   * @param breakpoint Target breakpoint
   * @param context Layout context
   */
  getResponsiveThemeValues(
    theme: ITheme,
    breakpoint: BreakpointName,
    context: ILayoutContext
  ): Partial<ILayoutConfig>;

  // ===== THEME-LAYOUT STRATEGY INTEGRATION =====

  /**
   * Apply theme to layout strategy
   * @param strategy Layout strategy
   * @param theme Theme to apply
   * @param context Layout context
   */
  applyThemeToLayoutStrategy(
    strategy: ILayoutStrategy,
    theme: ITheme,
    context: ILayoutContext
  ): ILayoutStrategy;

  /**
   * Get theme-aware layout strategy
   * @param layoutType Layout type
   * @param theme Theme
   * @param context Layout context
   */
  getThemeAwareLayoutStrategy(
    layoutType: LayoutType,
    theme: ITheme,
    context: ILayoutContext
  ): ILayoutStrategy | null;

  /**
   * Check if layout strategy supports theme
   * @param strategy Layout strategy
   * @param theme Theme to check
   */
  doesLayoutStrategySupportTheme(strategy: ILayoutStrategy, theme: ITheme): boolean;

  // ===== THEME VALIDATION =====

  /**
   * Validate theme for layout context
   * @param theme Theme to validate
   * @param context Layout context
   */
  validateThemeForLayout(theme: ITheme, context: ILayoutContext): IThemeValidationResult;

  /**
   * Validate theme class for layout
   * @param themeClass Theme class to validate
   * @param layoutConfig Layout configuration
   * @param context Layout context
   */
  validateThemeClassForLayout(
    themeClass: IThemeClass,
    layoutConfig: ILayoutConfig,
    context: ILayoutContext
  ): IThemeValidationResult;

  /**
   * Check if theme is compatible with layout type
   * @param theme Theme to check
   * @param layoutType Layout type
   */
  isThemeCompatibleWithLayout(theme: ITheme, layoutType: LayoutType): boolean;

  // ===== THEME OPTIMIZATION =====

  /**
   * Optimize theme for layout performance
   * @param theme Theme to optimize
   * @param context Layout context
   */
  optimizeThemeForLayout(theme: ITheme, context: ILayoutContext): ITheme;

  /**
   * Get theme cache key
   * @param theme Theme to cache
   * @param context Layout context
   */
  getThemeCacheKey(theme: ITheme, context: ILayoutContext): string;

  /**
   * Clear theme cache
   */
  clearThemeCache(): void;

  // ===== UTILITY METHODS =====

  /**
   * Get theme value by path
   * @param theme Theme to get value from
   * @param path Value path (e.g., 'colors.primary.main')
   * @param defaultValue Default value if not found
   */
  getThemeValue(theme: ITheme, path: string, defaultValue?: any): any;

  /**
   * Get theme values for layout properties
   * @param theme Theme to get values from
   * @param properties Layout properties
   * @param context Layout context
   */
  getThemeValuesForProperties(
    theme: ITheme,
    properties: string[],
    context: ILayoutContext
  ): Map<string, any>;

  /**
   * Get supported theme types for layout type
   * @param layoutType Layout type
   */
  getSupportedThemeTypesForLayout(layoutType: LayoutType): ThemeType[];

  /**
   * Get bridge statistics
   */
  getStatistics(): IThemeLayoutBridgeStatistics;

  /**
   * Reset bridge to initial state
   */
  reset(): void;
}

// ============================================================================
// SUPPORTING INTERFACES
// ============================================================================

/**
 * Theme-Layout Bridge configuration interface
 */
export interface IThemeLayoutBridgeConfig {
  /** Default theme application settings */
  application?: {
    enableAutoApplication: boolean;
    enableResponsiveThemes: boolean;
    enableThemeTransitions: boolean;
    transitionDuration: number;
  };

  /** Performance settings */
  performance?: {
    enableCaching: boolean;
    cacheSize: number;
    enableOptimization: boolean;
    maxConcurrentApplications: number;
  };

  /** Validation settings */
  validation?: {
    enabled: boolean;
    strict: boolean;
    autoValidate: boolean;
  };

  /** Custom configuration */
  custom?: Record<string, any>;
}

/**
 * Theme validation result interface
 */
export interface IThemeValidationResult {
  /** Whether validation passed */
  isValid: boolean;

  /** Validation errors */
  errors: IThemeValidationError[];

  /** Validation warnings */
  warnings: IThemeValidationWarning[];

  /** Validation metadata */
  metadata: {
    validationTime: number;
    themeId: string;
    themeName: string;
    layoutType?: LayoutType;
  };
}

/**
 * Theme validation error interface
 */
export interface IThemeValidationError {
  /** Error code */
  code: string;

  /** Error message */
  message: string;

  /** Theme property that caused the error */
  property: string;

  /** Error severity */
  severity: 'error' | 'warning' | 'info';

  /** Suggested fix */
  suggestion?: string;

  /** Additional context */
  context?: Record<string, any>;
}

/**
 * Theme validation warning interface
 */
export interface IThemeValidationWarning {
  /** Warning code */
  code: string;

  /** Warning message */
  message: string;

  /** Theme property that caused the warning */
  property: string;

  /** Warning severity */
  severity: 'warning' | 'info';

  /** Suggested improvement */
  suggestion?: string;

  /** Additional context */
  context?: Record<string, any>;
}

/**
 * Theme-Layout Bridge statistics interface
 */
export interface IThemeLayoutBridgeStatistics {
  /** Total theme applications */
  totalApplications: number;

  /** Total theme validations */
  totalValidations: number;

  /** Total theme transitions */
  totalTransitions: number;

  /** Successful operations */
  successfulOperations: number;

  /** Failed operations */
  failedOperations: number;

  /** Average application time in milliseconds */
  averageApplicationTime: number;

  /** Average validation time in milliseconds */
  averageValidationTime: number;

  /** Cache hit rate */
  cacheHitRate: number;

  /** Memory usage in bytes */
  memoryUsage: number;

  /** Performance metrics */
  performance: {
    applicationsPerSecond: number;
    validationsPerSecond: number;
    transitionsPerSecond: number;
    averageApplicationTime: number;
    averageValidationTime: number;
    averageTransitionTime: number;
  };

  /** Theme type distribution */
  themeTypes: {
    light: number;
    dark: number;
    auto: number;
    custom: number;
  };

  /** Layout type distribution */
  layoutTypes: Record<LayoutType, number>;

  /** Error statistics */
  errors: {
    totalErrors: number;
    applicationErrors: number;
    validationErrors: number;
    transitionErrors: number;
  };
}
