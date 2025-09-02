/**
 * Responsive-Unit Bridge Interface
 *
 * Bridge interface that connects responsive behavior with the Unit System.
 * Handles responsive unit calculations and breakpoint transitions.
 *
 * This bridge provides:
 * - Responsive unit calculations for different breakpoints
 * - Unit transitions between breakpoints
 * - Responsive unit validation
 * - Breakpoint-aware unit optimization
 */

import type { IUnit } from '../../../unit/interfaces/IUnit';
import type { UnitContext } from '../../../unit/interfaces/IUnit';
import { BreakpointName, DeviceType, DeviceOrientation } from '../../../layout/enums/LayoutEnums';
import { UnitType } from '../../../unit/enums/UnitType';

// ============================================================================
// RESPONSIVE-UNIT BRIDGE INTERFACE
// ============================================================================

/**
 * Bridge interface for Responsive System and Unit System integration
 *
 * Provides seamless responsive behavior for unit calculations across different breakpoints.
 */
export interface IResponsiveUnitBridge {
  /** Bridge ID */
  readonly bridgeId: string;

  /** Whether the bridge is initialized */
  readonly isInitialized: boolean;

  /** Supported breakpoints */
  readonly supportedBreakpoints: BreakpointName[];

  /** Supported unit types */
  readonly supportedUnitTypes: UnitType[];

  /** Bridge statistics */
  readonly statistics: IResponsiveUnitBridgeStatistics;

  // ===== INITIALIZATION =====

  /**
   * Initialize the bridge
   * @param config Bridge configuration
   */
  initialize(config?: IResponsiveUnitBridgeConfig): Promise<void>;

  /**
   * Destroy the bridge and clean up resources
   */
  destroy(): Promise<void>;

  // ===== RESPONSIVE UNIT CALCULATIONS =====

  /**
   * Calculate units for specific breakpoint
   * @param units Units to calculate
   * @param breakpoint Target breakpoint
   * @param context Unit context
   */
  calculateUnitsForBreakpoint(
    units: IUnit[],
    breakpoint: BreakpointName,
    context: UnitContext
  ): IUnit[];

  /**
   * Calculate unit values for breakpoint
   * @param units Units to calculate
   * @param breakpoint Target breakpoint
   * @param context Unit context
   */
  calculateUnitValuesForBreakpoint(
    units: IUnit[],
    breakpoint: BreakpointName,
    context: UnitContext
  ): Map<string, number>;

  /**
   * Get responsive unit values for all breakpoints
   * @param units Units to calculate
   * @param context Unit context
   */
  getResponsiveUnitValues(
    units: IUnit[],
    context: UnitContext
  ): Map<BreakpointName, Map<string, number>>;

  /**
   * Calculate units for device type
   * @param units Units to calculate
   * @param deviceType Device type
   * @param context Unit context
   */
  calculateUnitsForDeviceType(
    units: IUnit[],
    deviceType: DeviceType,
    context: UnitContext
  ): IUnit[];

  /**
   * Calculate units for device orientation
   * @param units Units to calculate
   * @param orientation Device orientation
   * @param context Unit context
   */
  calculateUnitsForOrientation(
    units: IUnit[],
    orientation: DeviceOrientation,
    context: UnitContext
  ): IUnit[];

  // ===== UNIT TRANSITIONS =====

  /**
   * Handle unit transitions between breakpoints
   * @param units Units to transition
   * @param fromBreakpoint Source breakpoint
   * @param toBreakpoint Target breakpoint
   * @param context Unit context
   */
  transitionUnitsBetweenBreakpoints(
    units: IUnit[],
    fromBreakpoint: BreakpointName,
    toBreakpoint: BreakpointName,
    context: UnitContext
  ): IUnit[];

  /**
   * Handle unit transitions between device types
   * @param units Units to transition
   * @param fromDeviceType Source device type
   * @param toDeviceType Target device type
   * @param context Unit context
   */
  transitionUnitsBetweenDeviceTypes(
    units: IUnit[],
    fromDeviceType: DeviceType,
    toDeviceType: DeviceType,
    context: UnitContext
  ): IUnit[];

  /**
   * Handle unit transitions between orientations
   * @param units Units to transition
   * @param fromOrientation Source orientation
   * @param toOrientation Target orientation
   * @param context Unit context
   */
  transitionUnitsBetweenOrientations(
    units: IUnit[],
    fromOrientation: DeviceOrientation,
    toOrientation: DeviceOrientation,
    context: UnitContext
  ): IUnit[];

  /**
   * Get transition animation for units
   * @param units Units to animate
   * @param fromBreakpoint Source breakpoint
   * @param toBreakpoint Target breakpoint
   * @param context Unit context
   */
  getUnitTransitionAnimation(
    units: IUnit[],
    fromBreakpoint: BreakpointName,
    toBreakpoint: BreakpointName,
    context: UnitContext
  ): IUnitTransitionAnimation;

  // ===== RESPONSIVE UNIT VALIDATION =====

  /**
   * Validate units across all breakpoints
   * @param units Units to validate
   * @param context Unit context
   */
  validateUnitsAcrossBreakpoints(
    units: IUnit[],
    context: UnitContext
  ): IResponsiveUnitValidationResult;

  /**
   * Validate units for specific breakpoint
   * @param units Units to validate
   * @param breakpoint Target breakpoint
   * @param context Unit context
   */
  validateUnitsForBreakpoint(
    units: IUnit[],
    breakpoint: BreakpointName,
    context: UnitContext
  ): IResponsiveUnitValidationResult;

  /**
   * Check if units are responsive
   * @param units Units to check
   */
  areUnitsResponsive(units: IUnit[]): boolean;

  /**
   * Get responsive unit dependencies
   * @param units Units to analyze
   * @param context Unit context
   */
  getResponsiveUnitDependencies(units: IUnit[], context: UnitContext): IResponsiveUnitDependency[];

  // ===== BREAKPOINT MANAGEMENT =====

  /**
   * Get current breakpoint from context
   * @param context Unit context
   */
  getCurrentBreakpoint(context: UnitContext): BreakpointName | null;

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

  // ===== RESPONSIVE UNIT OPTIMIZATION =====

  /**
   * Optimize units for responsive performance
   * @param units Units to optimize
   * @param context Unit context
   */
  optimizeUnitsForResponsive(units: IUnit[], context: UnitContext): IUnit[];

  /**
   * Get responsive unit cache key
   * @param units Units to cache
   * @param breakpoint Breakpoint
   * @param context Unit context
   */
  getResponsiveUnitCacheKey(
    units: IUnit[],
    breakpoint: BreakpointName,
    context: UnitContext
  ): string;

  /**
   * Clear responsive unit cache
   */
  clearResponsiveUnitCache(): void;

  /**
   * Preload units for breakpoint
   * @param units Units to preload
   * @param breakpoint Target breakpoint
   * @param context Unit context
   */
  preloadUnitsForBreakpoint(
    units: IUnit[],
    breakpoint: BreakpointName,
    context: UnitContext
  ): Promise<void>;

  // ===== UTILITY METHODS =====

  /**
   * Get unit responsiveness score
   * @param unit Unit to score
   * @param context Unit context
   */
  getUnitResponsivenessScore(unit: IUnit, context: UnitContext): number;

  /**
   * Get responsive unit statistics
   * @param units Units to analyze
   * @param context Unit context
   */
  getResponsiveUnitStatistics(units: IUnit[], context: UnitContext): IResponsiveUnitStats;

  /**
   * Get supported unit types for breakpoint
   * @param breakpoint Breakpoint
   */
  getSupportedUnitTypesForBreakpoint(breakpoint: BreakpointName): UnitType[];

  /**
   * Get bridge statistics
   */
  getStatistics(): IResponsiveUnitBridgeStatistics;

  /**
   * Reset bridge to initial state
   */
  reset(): void;
}

// ============================================================================
// SUPPORTING INTERFACES
// ============================================================================

/**
 * Responsive-Unit Bridge configuration interface
 */
export interface IResponsiveUnitBridgeConfig {
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
 * Responsive unit validation result interface
 */
export interface IResponsiveUnitValidationResult {
  /** Whether validation passed */
  isValid: boolean;

  /** Valid units */
  validUnits: IUnit[];

  /** Invalid units */
  invalidUnits: IUnit[];

  /** Validation errors */
  errors: IResponsiveUnitValidationError[];

  /** Validation warnings */
  warnings: IResponsiveUnitValidationWarning[];

  /** Breakpoint-specific results */
  breakpointResults: Map<BreakpointName, IResponsiveUnitValidationResult>;

  /** Validation metadata */
  metadata: {
    validationTime: number;
    totalUnits: number;
    validCount: number;
    invalidCount: number;
    breakpointsChecked: number;
  };
}

/**
 * Responsive unit validation error interface
 */
export interface IResponsiveUnitValidationError {
  /** Error code */
  code: string;

  /** Error message */
  message: string;

  /** Unit ID that caused the error */
  unitId: string;

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
 * Responsive unit validation warning interface
 */
export interface IResponsiveUnitValidationWarning {
  /** Warning code */
  code: string;

  /** Warning message */
  message: string;

  /** Unit ID that caused the warning */
  unitId: string;

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
 * Responsive unit dependency interface
 */
export interface IResponsiveUnitDependency {
  /** Unit ID */
  unitId: string;

  /** Dependent unit IDs */
  dependentUnitIds: string[];

  /** Dependency type */
  dependencyType: 'size' | 'position' | 'scale' | 'custom';

  /** Affected breakpoints */
  affectedBreakpoints: BreakpointName[];

  /** Dependency strength (0-1) */
  strength: number;
}

/**
 * Responsive unit transition animation interface
 */
export interface IUnitTransitionAnimation {
  /** Animation duration in milliseconds */
  duration: number;

  /** Easing function */
  easing: string;

  /** Animation keyframes */
  keyframes: IUnitTransitionKeyframe[];

  /** Animation properties */
  properties: string[];

  /** Animation metadata */
  metadata: {
    fromBreakpoint: BreakpointName;
    toBreakpoint: BreakpointName;
    unitCount: number;
    animationType: 'smooth' | 'instant' | 'custom';
  };
}

/**
 * Responsive unit transition keyframe interface
 */
export interface IUnitTransitionKeyframe {
  /** Keyframe offset (0-1) */
  offset: number;

  /** Unit values at this keyframe */
  unitValues: Map<string, number>;

  /** Easing function for this keyframe */
  easing?: string;
}

/**
 * Responsive unit statistics interface
 */
export interface IResponsiveUnitStats {
  /** Total units */
  totalUnits: number;

  /** Responsive units */
  responsiveUnits: number;

  /** Static units */
  staticUnits: number;

  /** Unit type distribution */
  unitTypes: Record<UnitType, number>;

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
 * Responsive-Unit Bridge statistics interface
 */
export interface IResponsiveUnitBridgeStatistics {
  /** Total responsive calculations */
  totalResponsiveCalculations: number;

  /** Total unit transitions */
  totalUnitTransitions: number;

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

  /** Unit type distribution */
  unitTypes: {
    size: number;
    position: number;
    scale: number;
  };

  /** Error statistics */
  errors: {
    totalErrors: number;
    calculationErrors: number;
    transitionErrors: number;
    validationErrors: number;
  };
}
