/**
 * Responsive-Theme Bridge Interface
 *
 * Bridge interface that connects the Responsive System with the Theme System.
 * Handles responsive theme calculations and breakpoint-aware theme management.
 *
 * This bridge provides:
 * - Responsive theme calculations for different breakpoints
 * - Breakpoint-aware theme application
 * - Theme transitions between breakpoints
 * - Responsive theme validation and optimization
 */

import type { ITheme, IThemeClass } from '../../../layout/interfaces/ITheme';
import {
  BreakpointName,
  ThemeType,
  DeviceType,
  DeviceOrientation,
} from '../../../layout/enums/LayoutEnums';

// ============================================================================
// RESPONSIVE-THEME BRIDGE INTERFACE
// ============================================================================

/**
 * Bridge interface for Responsive System and Theme System integration
 *
 * Provides seamless responsive behavior for theme calculations across different breakpoints.
 */
export interface IResponsiveThemeBridge {
  /** Bridge ID */
  readonly bridgeId: string;

  /** Whether the bridge is initialized */
  readonly isInitialized: boolean;

  /** Supported breakpoints */
  readonly supportedBreakpoints: BreakpointName[];

  /** Supported theme types */
  readonly supportedThemeTypes: ThemeType[];

  /** Bridge statistics */
  readonly statistics: IResponsiveThemeBridgeStatistics;

  // ===== INITIALIZATION =====

  /**
   * Initialize the bridge
   * @param config Bridge configuration
   */
  initialize(config?: IResponsiveThemeBridgeConfig): Promise<void>;

  /**
   * Destroy the bridge and clean up resources
   */
  destroy(): Promise<void>;

  // ===== RESPONSIVE THEME CALCULATIONS =====

  /**
   * Calculate theme for specific breakpoint
   * @param theme Base theme configuration
   * @param breakpoint Target breakpoint
   */
  calculateThemeForBreakpoint(theme: ITheme, breakpoint: BreakpointName): ITheme;

  /**
   * Calculate responsive theme for all breakpoints
   * @param theme Base theme configuration
   */
  calculateResponsiveTheme(theme: ITheme): Map<BreakpointName, ITheme>;

  /**
   * Calculate theme for device type
   * @param theme Base theme configuration
   * @param deviceType Device type
   */
  calculateThemeForDeviceType(theme: ITheme, deviceType: DeviceType): ITheme;

  /**
   * Calculate theme for device orientation
   * @param theme Base theme configuration
   * @param orientation Device orientation
   */
  calculateThemeForOrientation(theme: ITheme, orientation: DeviceOrientation): ITheme;

  // ===== BREAKPOINT-AWARE THEME VALUES =====

  /**
   * Get theme colors for breakpoint
   * @param theme Base theme configuration
   * @param breakpoint Target breakpoint
   */
  getThemeColorsForBreakpoint(
    theme: ITheme,
    breakpoint: BreakpointName
  ): {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    text: string;
    error: string;
    warning: string;
    success: string;
    info: string;
  };

  /**
   * Get theme spacing for breakpoint
   * @param theme Base theme configuration
   * @param breakpoint Target breakpoint
   */
  getThemeSpacingForBreakpoint(
    theme: ITheme,
    breakpoint: BreakpointName
  ): {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };

  /**
   * Get theme typography for breakpoint
   * @param theme Base theme configuration
   * @param breakpoint Target breakpoint
   */
  getThemeTypographyForBreakpoint(
    theme: ITheme,
    breakpoint: BreakpointName
  ): {
    fontFamily: string;
    fontSize: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };

  /**
   * Get theme classes for breakpoint
   * @param theme Base theme configuration
   * @param breakpoint Target breakpoint
   */
  getThemeClassesForBreakpoint(theme: ITheme, breakpoint: BreakpointName): IThemeClass[];

  // ===== THEME TRANSITIONS =====

  /**
   * Handle theme transitions between breakpoints
   * @param theme Base theme configuration
   * @param fromBreakpoint Source breakpoint
   * @param toBreakpoint Target breakpoint
   */
  transitionThemeBetweenBreakpoints(
    theme: ITheme,
    fromBreakpoint: BreakpointName,
    toBreakpoint: BreakpointName
  ): ITheme;

  /**
   * Handle theme transitions between device types
   * @param theme Base theme configuration
   * @param fromDeviceType Source device type
   * @param toDeviceType Target device type
   */
  transitionThemeBetweenDeviceTypes(
    theme: ITheme,
    fromDeviceType: DeviceType,
    toDeviceType: DeviceType
  ): ITheme;

  /**
   * Handle theme transitions between orientations
   * @param theme Base theme configuration
   * @param fromOrientation Source orientation
   * @param toOrientation Target orientation
   */
  transitionThemeBetweenOrientations(
    theme: ITheme,
    fromOrientation: DeviceOrientation,
    toOrientation: DeviceOrientation
  ): ITheme;

  /**
   * Handle theme type transitions (light/dark)
   * @param theme Base theme configuration
   * @param fromThemeType Source theme type
   * @param toThemeType Target theme type
   * @param breakpoint Current breakpoint
   */
  transitionThemeType(
    theme: ITheme,
    fromThemeType: ThemeType,
    toThemeType: ThemeType,
    breakpoint: BreakpointName
  ): ITheme;

  /**
   * Get theme transition animation
   * @param theme Base theme configuration
   * @param fromBreakpoint Source breakpoint
   * @param toBreakpoint Target breakpoint
   */
  getThemeTransitionAnimation(
    theme: ITheme,
    fromBreakpoint: BreakpointName,
    toBreakpoint: BreakpointName
  ): IThemeTransitionAnimation;

  // ===== RESPONSIVE THEME VALIDATION =====

  /**
   * Validate theme across all breakpoints
   * @param theme Theme configuration to validate
   */
  validateThemeAcrossBreakpoints(theme: ITheme): IResponsiveThemeValidationResult;

  /**
   * Validate theme for specific breakpoint
   * @param theme Theme configuration to validate
   * @param breakpoint Target breakpoint
   */
  validateThemeForBreakpoint(
    theme: ITheme,
    breakpoint: BreakpointName
  ): IResponsiveThemeValidationResult;

  /**
   * Check if theme is responsive
   * @param theme Theme configuration to check
   */
  isThemeResponsive(theme: ITheme): boolean;

  /**
   * Get responsive theme dependencies
   * @param theme Theme configuration to analyze
   */
  getResponsiveThemeDependencies(theme: ITheme): IResponsiveThemeDependency[];

  // ===== BREAKPOINT MANAGEMENT =====

  /**
   * Get current breakpoint from theme context
   * @param theme Theme configuration
   */
  getCurrentBreakpoint(theme: ITheme): BreakpointName | null;

  /**
   * Get breakpoint for viewport size
   * @param width Viewport width
   * @param height Viewport height
   */
  getBreakpointForViewport(width: number, height: number): BreakpointName;

  /**
   * Get breakpoint for device type
   * @param deviceType Device type
   * @param orientation Device orientation
   */
  getBreakpointForDevice(deviceType: DeviceType, orientation: DeviceOrientation): BreakpointName;

  /**
   * Get all supported breakpoints
   */
  getSupportedBreakpoints(): BreakpointName[];

  /**
   * Check if breakpoint is supported
   * @param breakpoint Breakpoint to check
   */
  isBreakpointSupported(breakpoint: BreakpointName): boolean;

  // ===== RESPONSIVE THEME OPTIMIZATION =====

  /**
   * Optimize theme for responsive performance
   * @param theme Theme configuration to optimize
   */
  optimizeThemeForResponsive(theme: ITheme): ITheme;

  /**
   * Get responsive theme cache key
   * @param theme Theme configuration to cache
   * @param breakpoint Breakpoint
   */
  getResponsiveThemeCacheKey(theme: ITheme, breakpoint: BreakpointName): string;

  /**
   * Clear responsive theme cache
   */
  clearResponsiveThemeCache(): void;

  /**
   * Preload theme for breakpoint
   * @param theme Theme configuration to preload
   * @param breakpoint Target breakpoint
   */
  preloadThemeForBreakpoint(theme: ITheme, breakpoint: BreakpointName): Promise<void>;

  // ===== UTILITY METHODS =====

  /**
   * Get theme responsiveness score
   * @param theme Theme configuration to score
   */
  getThemeResponsivenessScore(theme: ITheme): number;

  /**
   * Get responsive theme statistics
   * @param theme Theme configuration to analyze
   */
  getResponsiveThemeStatistics(theme: ITheme): IResponsiveThemeStats;

  /**
   * Get supported theme types for breakpoint
   * @param breakpoint Breakpoint
   */
  getSupportedThemeTypesForBreakpoint(breakpoint: BreakpointName): ThemeType[];

  /**
   * Get theme value by path for breakpoint
   * @param theme Theme configuration
   * @param path Value path (e.g., 'colors.primary.main')
   * @param breakpoint Target breakpoint
   * @param defaultValue Default value if not found
   */
  getThemeValueForBreakpoint(
    theme: ITheme,
    path: string,
    breakpoint: BreakpointName,
    defaultValue?: any
  ): any;

  /**
   * Get bridge statistics
   */
  getStatistics(): IResponsiveThemeBridgeStatistics;

  /**
   * Reset bridge to initial state
   */
  reset(): void;
}

// ============================================================================
// SUPPORTING INTERFACES
// ============================================================================

/**
 * Responsive-Theme Bridge configuration interface
 */
export interface IResponsiveThemeBridgeConfig {
  /** Breakpoint settings */
  breakpoints?: {
    enableAutoDetection: boolean;
    enableOrientationSupport: boolean;
    enableDeviceTypeSupport: boolean;
    customBreakpoints?: Record<string, { width: number; height: number }>;
  };

  /** Performance settings */
  performance?: {
    enableCaching: boolean;
    cacheSize: number;
    enablePreloading: boolean;
    maxConcurrentCalculations: number;
  };

  /** Transition settings */
  transitions?: {
    enableAnimations: boolean;
    defaultDuration: number;
    easingFunction: string;
    enableSmoothTransitions: boolean;
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
 * Responsive theme validation result interface
 */
export interface IResponsiveThemeValidationResult {
  /** Whether validation passed */
  isValid: boolean;

  /** Validation errors */
  errors: IResponsiveThemeValidationError[];

  /** Validation warnings */
  warnings: IResponsiveThemeValidationWarning[];

  /** Breakpoint-specific results */
  breakpointResults: Map<BreakpointName, IResponsiveThemeValidationResult>;

  /** Validation metadata */
  metadata: {
    validationTime: number;
    themeId: string;
    themeName: string;
    breakpointsChecked: number;
    totalIssues: number;
  };
}

/**
 * Responsive theme validation error interface
 */
export interface IResponsiveThemeValidationError {
  /** Error code */
  code: string;

  /** Error message */
  message: string;

  /** Theme property that caused the error */
  property: string;

  /** Breakpoint where error occurred */
  breakpoint: BreakpointName;

  /** Error severity */
  severity: 'error' | 'warning' | 'info';

  /** Suggested fix */
  suggestion?: string;

  /** Additional context */
  context?: Record<string, any>;
}

/**
 * Responsive theme validation warning interface
 */
export interface IResponsiveThemeValidationWarning {
  /** Warning code */
  code: string;

  /** Warning message */
  message: string;

  /** Theme property that caused the warning */
  property: string;

  /** Breakpoint where warning occurred */
  breakpoint: BreakpointName;

  /** Warning severity */
  severity: 'warning' | 'info';

  /** Suggested improvement */
  suggestion?: string;

  /** Additional context */
  context?: Record<string, any>;
}

/**
 * Responsive theme dependency interface
 */
export interface IResponsiveThemeDependency {
  /** Theme property */
  property: string;

  /** Dependent theme properties */
  dependentProperties: string[];

  /** Dependency type */
  dependencyType: 'color' | 'spacing' | 'typography' | 'border' | 'shadow' | 'custom';

  /** Affected breakpoints */
  affectedBreakpoints: BreakpointName[];

  /** Dependency strength (0-1) */
  strength: number;
}

/**
 * Responsive theme transition animation interface
 */
export interface IThemeTransitionAnimation {
  /** Animation duration in milliseconds */
  duration: number;

  /** Easing function */
  easing: string;

  /** Animation keyframes */
  keyframes: IThemeTransitionKeyframe[];

  /** Animation properties */
  properties: string[];

  /** Animation metadata */
  metadata: {
    fromBreakpoint: BreakpointName;
    toBreakpoint: BreakpointName;
    themeType: ThemeType;
    animationType: 'smooth' | 'instant' | 'custom';
  };
}

/**
 * Responsive theme transition keyframe interface
 */
export interface IThemeTransitionKeyframe {
  /** Keyframe offset (0-1) */
  offset: number;

  /** Theme values at this keyframe */
  themeValues: Map<string, any>;

  /** Easing function for this keyframe */
  easing?: string;
}

/**
 * Responsive theme statistics interface
 */
export interface IResponsiveThemeStats {
  /** Total theme properties */
  totalProperties: number;

  /** Responsive properties */
  responsiveProperties: number;

  /** Static properties */
  staticProperties: number;

  /** Theme type distribution */
  themeTypes: Record<ThemeType, number>;

  /** Breakpoint coverage */
  breakpointCoverage: Map<BreakpointName, number>;

  /** Responsiveness score (0-1) */
  responsivenessScore: number;

  /** Performance metrics */
  performance: {
    averageCalculationTime: number;
    averageTransitionTime: number;
    cacheHitRate: number;
  };
}

/**
 * Responsive-Theme Bridge statistics interface
 */
export interface IResponsiveThemeBridgeStatistics {
  /** Total responsive calculations */
  totalResponsiveCalculations: number;

  /** Total theme transitions */
  totalThemeTransitions: number;

  /** Total validations */
  totalValidations: number;

  /** Successful operations */
  successfulOperations: number;

  /** Failed operations */
  failedOperations: number;

  /** Average calculation time in milliseconds */
  averageCalculationTime: number;

  /** Average transition time in milliseconds */
  averageTransitionTime: number;

  /** Cache hit rate */
  cacheHitRate: number;

  /** Memory usage in bytes */
  memoryUsage: number;

  /** Performance metrics */
  performance: {
    responsiveCalculationsPerSecond: number;
    transitionsPerSecond: number;
    validationsPerSecond: number;
    averageCalculationTime: number;
    averageTransitionTime: number;
    averageValidationTime: number;
  };

  /** Breakpoint distribution */
  breakpointDistribution: Record<BreakpointName, number>;

  /** Theme type distribution */
  themeTypes: {
    light: number;
    dark: number;
    auto: number;
    custom: number;
  };

  /** Error statistics */
  errors: {
    totalErrors: number;
    calculationErrors: number;
    transitionErrors: number;
    validationErrors: number;
  };
}
