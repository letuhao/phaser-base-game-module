/**
 * Responsive-Layout Bridge Interface
 *
 * Bridge interface that connects the Responsive System with the Layout System.
 * Handles responsive layout calculations and breakpoint-aware layout management.
 *
 * This bridge provides:
 * - Responsive layout calculations for different breakpoints
 * - Breakpoint-aware layout strategies
 * - Layout transitions between breakpoints
 * - Responsive layout validation and optimization
 */

import type {
  ILayoutConfig,
  ILayoutContext,
  ICalculatedLayout,
} from '../../../layout/interfaces/ILayout';
import type { ILayoutStrategy } from '../../../layout/interfaces/ILayoutStrategy';
import {
  BreakpointName,
  LayoutType,
  DeviceType,
  DeviceOrientation,
} from '../../../layout/enums/LayoutEnums';

// ============================================================================
// RESPONSIVE-LAYOUT BRIDGE INTERFACE
// ============================================================================

/**
 * Bridge interface for Responsive System and Layout System integration
 *
 * Provides seamless responsive behavior for layout calculations across different breakpoints.
 */
export interface IResponsiveLayoutBridge {
  /** Bridge ID */
  readonly bridgeId: string;

  /** Whether the bridge is initialized */
  readonly isInitialized: boolean;

  /** Supported breakpoints */
  readonly supportedBreakpoints: BreakpointName[];

  /** Supported layout types */
  readonly supportedLayoutTypes: LayoutType[];

  /** Bridge statistics */
  readonly statistics: IResponsiveLayoutBridgeStatistics;

  // ===== INITIALIZATION =====

  /**
   * Initialize the bridge
   * @param config Bridge configuration
   */
  initialize(config?: IResponsiveLayoutBridgeConfig): Promise<void>;

  /**
   * Destroy the bridge and clean up resources
   */
  destroy(): Promise<void>;

  // ===== RESPONSIVE LAYOUT CALCULATIONS =====

  /**
   * Calculate layout for specific breakpoint
   * @param layoutConfig Base layout configuration
   * @param breakpoint Target breakpoint
   * @param context Layout context
   */
  calculateLayoutForBreakpoint(
    layoutConfig: ILayoutConfig,
    breakpoint: BreakpointName,
    context: ILayoutContext
  ): ICalculatedLayout;

  /**
   * Calculate responsive layout for all breakpoints
   * @param layoutConfig Base layout configuration
   * @param context Layout context
   */
  calculateResponsiveLayout(
    layoutConfig: ILayoutConfig,
    context: ILayoutContext
  ): Map<BreakpointName, ICalculatedLayout>;

  /**
   * Calculate layout for device type
   * @param layoutConfig Base layout configuration
   * @param deviceType Device type
   * @param context Layout context
   */
  calculateLayoutForDeviceType(
    layoutConfig: ILayoutConfig,
    deviceType: DeviceType,
    context: ILayoutContext
  ): ICalculatedLayout;

  /**
   * Calculate layout for device orientation
   * @param layoutConfig Base layout configuration
   * @param orientation Device orientation
   * @param context Layout context
   */
  calculateLayoutForOrientation(
    layoutConfig: ILayoutConfig,
    orientation: DeviceOrientation,
    context: ILayoutContext
  ): ICalculatedLayout;

  // ===== BREAKPOINT-AWARE LAYOUT STRATEGIES =====

  /**
   * Get layout strategy for breakpoint
   * @param layoutType Layout type
   * @param breakpoint Target breakpoint
   * @param context Layout context
   */
  getLayoutStrategyForBreakpoint(
    layoutType: LayoutType,
    breakpoint: BreakpointName,
    context: ILayoutContext
  ): ILayoutStrategy | null;

  /**
   * Apply breakpoint-specific layout strategy
   * @param strategy Base layout strategy
   * @param breakpoint Target breakpoint
   * @param context Layout context
   */
  applyBreakpointToLayoutStrategy(
    strategy: ILayoutStrategy,
    breakpoint: BreakpointName,
    context: ILayoutContext
  ): ILayoutStrategy;

  /**
   * Check if layout strategy supports breakpoint
   * @param strategy Layout strategy
   * @param breakpoint Breakpoint to check
   */
  doesLayoutStrategySupportBreakpoint(
    strategy: ILayoutStrategy,
    breakpoint: BreakpointName
  ): boolean;

  /**
   * Get responsive layout strategies for all breakpoints
   * @param layoutType Layout type
   * @param context Layout context
   */
  getResponsiveLayoutStrategies(
    layoutType: LayoutType,
    context: ILayoutContext
  ): Map<BreakpointName, ILayoutStrategy>;

  // ===== LAYOUT TRANSITIONS =====

  /**
   * Handle layout transitions between breakpoints
   * @param layoutConfig Base layout configuration
   * @param fromBreakpoint Source breakpoint
   * @param toBreakpoint Target breakpoint
   * @param context Layout context
   */
  transitionLayoutBetweenBreakpoints(
    layoutConfig: ILayoutConfig,
    fromBreakpoint: BreakpointName,
    toBreakpoint: BreakpointName,
    context: ILayoutContext
  ): ICalculatedLayout;

  /**
   * Handle layout transitions between device types
   * @param layoutConfig Base layout configuration
   * @param fromDeviceType Source device type
   * @param toDeviceType Target device type
   * @param context Layout context
   */
  transitionLayoutBetweenDeviceTypes(
    layoutConfig: ILayoutConfig,
    fromDeviceType: DeviceType,
    toDeviceType: DeviceType,
    context: ILayoutContext
  ): ICalculatedLayout;

  /**
   * Handle layout transitions between orientations
   * @param layoutConfig Base layout configuration
   * @param fromOrientation Source orientation
   * @param toOrientation Target orientation
   * @param context Layout context
   */
  transitionLayoutBetweenOrientations(
    layoutConfig: ILayoutConfig,
    fromOrientation: DeviceOrientation,
    toOrientation: DeviceOrientation,
    context: ILayoutContext
  ): ICalculatedLayout;

  /**
   * Get layout transition animation
   * @param layoutConfig Base layout configuration
   * @param fromBreakpoint Source breakpoint
   * @param toBreakpoint Target breakpoint
   * @param context Layout context
   */
  getLayoutTransitionAnimation(
    layoutConfig: ILayoutConfig,
    fromBreakpoint: BreakpointName,
    toBreakpoint: BreakpointName,
    context: ILayoutContext
  ): ILayoutTransitionAnimation;

  // ===== RESPONSIVE LAYOUT VALIDATION =====

  /**
   * Validate layout across all breakpoints
   * @param layoutConfig Layout configuration to validate
   * @param context Layout context
   */
  validateLayoutAcrossBreakpoints(
    layoutConfig: ILayoutConfig,
    context: ILayoutContext
  ): IResponsiveLayoutValidationResult;

  /**
   * Validate layout for specific breakpoint
   * @param layoutConfig Layout configuration to validate
   * @param breakpoint Target breakpoint
   * @param context Layout context
   */
  validateLayoutForBreakpoint(
    layoutConfig: ILayoutConfig,
    breakpoint: BreakpointName,
    context: ILayoutContext
  ): IResponsiveLayoutValidationResult;

  /**
   * Check if layout is responsive
   * @param layoutConfig Layout configuration to check
   */
  isLayoutResponsive(layoutConfig: ILayoutConfig): boolean;

  /**
   * Get responsive layout dependencies
   * @param layoutConfig Layout configuration to analyze
   * @param context Layout context
   */
  getResponsiveLayoutDependencies(
    layoutConfig: ILayoutConfig,
    context: ILayoutContext
  ): IResponsiveLayoutDependency[];

  // ===== BREAKPOINT MANAGEMENT =====

  /**
   * Get current breakpoint from context
   * @param context Layout context
   */
  getCurrentBreakpoint(context: ILayoutContext): BreakpointName | null;

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

  // ===== RESPONSIVE LAYOUT OPTIMIZATION =====

  /**
   * Optimize layout for responsive performance
   * @param layoutConfig Layout configuration to optimize
   * @param context Layout context
   */
  optimizeLayoutForResponsive(layoutConfig: ILayoutConfig, context: ILayoutContext): ILayoutConfig;

  /**
   * Get responsive layout cache key
   * @param layoutConfig Layout configuration to cache
   * @param breakpoint Breakpoint
   * @param context Layout context
   */
  getResponsiveLayoutCacheKey(
    layoutConfig: ILayoutConfig,
    breakpoint: BreakpointName,
    context: ILayoutContext
  ): string;

  /**
   * Clear responsive layout cache
   */
  clearResponsiveLayoutCache(): void;

  /**
   * Preload layout for breakpoint
   * @param layoutConfig Layout configuration to preload
   * @param breakpoint Target breakpoint
   * @param context Layout context
   */
  preloadLayoutForBreakpoint(
    layoutConfig: ILayoutConfig,
    breakpoint: BreakpointName,
    context: ILayoutContext
  ): Promise<void>;

  // ===== UTILITY METHODS =====

  /**
   * Get layout responsiveness score
   * @param layoutConfig Layout configuration to score
   * @param context Layout context
   */
  getLayoutResponsivenessScore(layoutConfig: ILayoutConfig, context: ILayoutContext): number;

  /**
   * Get responsive layout statistics
   * @param layoutConfig Layout configuration to analyze
   * @param context Layout context
   */
  getResponsiveLayoutStatistics(
    layoutConfig: ILayoutConfig,
    context: ILayoutContext
  ): IResponsiveLayoutStats;

  /**
   * Get supported layout types for breakpoint
   * @param breakpoint Breakpoint
   */
  getSupportedLayoutTypesForBreakpoint(breakpoint: BreakpointName): LayoutType[];

  /**
   * Get bridge statistics
   */
  getStatistics(): IResponsiveLayoutBridgeStatistics;

  /**
   * Reset bridge to initial state
   */
  reset(): void;
}

// ============================================================================
// SUPPORTING INTERFACES
// ============================================================================

/**
 * Responsive-Layout Bridge configuration interface
 */
export interface IResponsiveLayoutBridgeConfig {
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
 * Responsive layout validation result interface
 */
export interface IResponsiveLayoutValidationResult {
  /** Whether validation passed */
  isValid: boolean;

  /** Validation errors */
  errors: IResponsiveLayoutValidationError[];

  /** Validation warnings */
  warnings: IResponsiveLayoutValidationWarning[];

  /** Breakpoint-specific results */
  breakpointResults: Map<BreakpointName, IResponsiveLayoutValidationResult>;

  /** Validation metadata */
  metadata: {
    validationTime: number;
    layoutType: LayoutType;
    breakpointsChecked: number;
    totalIssues: number;
  };
}

/**
 * Responsive layout validation error interface
 */
export interface IResponsiveLayoutValidationError {
  /** Error code */
  code: string;

  /** Error message */
  message: string;

  /** Layout property that caused the error */
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
 * Responsive layout validation warning interface
 */
export interface IResponsiveLayoutValidationWarning {
  /** Warning code */
  code: string;

  /** Warning message */
  message: string;

  /** Layout property that caused the warning */
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
 * Responsive layout dependency interface
 */
export interface IResponsiveLayoutDependency {
  /** Layout property */
  property: string;

  /** Dependent layout properties */
  dependentProperties: string[];

  /** Dependency type */
  dependencyType: 'size' | 'position' | 'alignment' | 'spacing' | 'custom';

  /** Affected breakpoints */
  affectedBreakpoints: BreakpointName[];

  /** Dependency strength (0-1) */
  strength: number;
}

/**
 * Responsive layout transition animation interface
 */
export interface ILayoutTransitionAnimation {
  /** Animation duration in milliseconds */
  duration: number;

  /** Easing function */
  easing: string;

  /** Animation keyframes */
  keyframes: ILayoutTransitionKeyframe[];

  /** Animation properties */
  properties: string[];

  /** Animation metadata */
  metadata: {
    fromBreakpoint: BreakpointName;
    toBreakpoint: BreakpointName;
    layoutType: LayoutType;
    animationType: 'smooth' | 'instant' | 'custom';
  };
}

/**
 * Responsive layout transition keyframe interface
 */
export interface ILayoutTransitionKeyframe {
  /** Keyframe offset (0-1) */
  offset: number;

  /** Layout values at this keyframe */
  layoutValues: Map<string, any>;

  /** Easing function for this keyframe */
  easing?: string;
}

/**
 * Responsive layout statistics interface
 */
export interface IResponsiveLayoutStats {
  /** Total layout properties */
  totalProperties: number;

  /** Responsive properties */
  responsiveProperties: number;

  /** Static properties */
  staticProperties: number;

  /** Layout type distribution */
  layoutTypes: Record<LayoutType, number>;

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
 * Responsive-Layout Bridge statistics interface
 */
export interface IResponsiveLayoutBridgeStatistics {
  /** Total responsive calculations */
  totalResponsiveCalculations: number;

  /** Total layout transitions */
  totalLayoutTransitions: number;

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

  /** Layout type distribution */
  layoutTypes: Record<LayoutType, number>;

  /** Error statistics */
  errors: {
    totalErrors: number;
    calculationErrors: number;
    transitionErrors: number;
    validationErrors: number;
  };
}
