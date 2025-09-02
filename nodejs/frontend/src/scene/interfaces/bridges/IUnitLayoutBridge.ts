/**
 * Unit-Layout Bridge Interface
 *
 * Bridge interface that connects the Unit System with the Layout System.
 * Handles unit value calculations and conversions for layout configurations.
 *
 * This bridge provides:
 * - Unit value conversion to layout-compatible values
 * - Unit calculations for layout strategies
 * - Responsive unit calculations
 * - Unit validation for layout contexts
 */

import type { IUnit } from '../../../unit/interfaces/IUnit';
import type {
  ILayoutConfig,
  ILayoutContext,
  ICalculatedLayout,
} from '../../../layout/interfaces/ILayout';
import type { ILayoutStrategy } from '../../../layout/interfaces/ILayoutStrategy';
import { BreakpointName, LayoutType } from '../../../layout/enums/LayoutEnums';
import { UnitType } from '../../../unit/enums/UnitType';

// ============================================================================
// UNIT-LAYOUT BRIDGE INTERFACE
// ============================================================================

/**
 * Bridge interface for Unit System and Layout System integration
 *
 * Provides seamless conversion and calculation between unit values and layout configurations.
 */
export interface IUnitLayoutBridge {
  /** Bridge ID */
  readonly bridgeId: string;

  /** Whether the bridge is initialized */
  readonly isInitialized: boolean;

  /** Supported unit types */
  readonly supportedUnitTypes: UnitType[];

  /** Supported layout types */
  readonly supportedLayoutTypes: LayoutType[];

  /** Bridge statistics */
  readonly statistics: IUnitLayoutBridgeStatistics;

  // ===== INITIALIZATION =====

  /**
   * Initialize the bridge
   * @param config Bridge configuration
   */
  initialize(config?: IUnitLayoutBridgeConfig): Promise<void>;

  /**
   * Destroy the bridge and clean up resources
   */
  destroy(): Promise<void>;

  // ===== UNIT CONVERSION =====

  /**
   * Convert unit values to layout-compatible values
   * @param units Array of units to convert
   * @param context Layout context for conversion
   */
  convertUnitsForLayout(units: IUnit[], context: ILayoutContext): ILayoutConfig;

  /**
   * Convert a single unit to layout property value
   * @param unit Unit to convert
   * @param context Layout context
   * @param property Layout property name
   */
  convertUnitToLayoutProperty(
    unit: IUnit,
    context: ILayoutContext,
    property: string
  ): number | string | object;

  /**
   * Convert layout configuration to unit values
   * @param layoutConfig Layout configuration to convert
   * @param context Layout context
   */
  convertLayoutToUnits(layoutConfig: ILayoutConfig, context: ILayoutContext): IUnit[];

  // ===== UNIT CALCULATIONS =====

  /**
   * Apply unit calculations to layout strategies
   * @param strategy Layout strategy to apply units to
   * @param units Units to apply
   * @param context Layout context
   */
  applyUnitCalculations(
    strategy: ILayoutStrategy,
    units: IUnit[],
    context: ILayoutContext
  ): ICalculatedLayout;

  /**
   * Calculate layout with unit integration
   * @param layoutConfig Base layout configuration
   * @param units Units to integrate
   * @param context Layout context
   */
  calculateLayoutWithUnits(
    layoutConfig: ILayoutConfig,
    units: IUnit[],
    context: ILayoutContext
  ): ICalculatedLayout;

  /**
   * Calculate unit values for layout context
   * @param units Units to calculate
   * @param context Layout context
   */
  calculateUnitValues(units: IUnit[], context: ILayoutContext): Map<string, number>;

  // ===== RESPONSIVE UNIT CALCULATIONS =====

  /**
   * Calculate units for specific breakpoint
   * @param units Units to calculate
   * @param breakpoint Target breakpoint
   * @param context Layout context
   */
  calculateUnitsForBreakpoint(
    units: IUnit[],
    breakpoint: BreakpointName,
    context: ILayoutContext
  ): IUnit[];

  /**
   * Handle unit transitions between breakpoints
   * @param units Units to transition
   * @param fromBreakpoint Source breakpoint
   * @param toBreakpoint Target breakpoint
   * @param context Layout context
   */
  transitionUnitsBetweenBreakpoints(
    units: IUnit[],
    fromBreakpoint: BreakpointName,
    toBreakpoint: BreakpointName,
    context: ILayoutContext
  ): IUnit[];

  /**
   * Get responsive unit values for all breakpoints
   * @param units Units to calculate
   * @param context Layout context
   */
  getResponsiveUnitValues(
    units: IUnit[],
    context: ILayoutContext
  ): Map<BreakpointName, Map<string, number>>;

  // ===== UNIT VALIDATION =====

  /**
   * Validate units for layout context
   * @param units Units to validate
   * @param context Layout context
   */
  validateUnitsForLayout(units: IUnit[], context: ILayoutContext): IUnitValidationResult;

  /**
   * Validate units across all breakpoints
   * @param units Units to validate
   * @param context Layout context
   */
  validateUnitsAcrossBreakpoints(units: IUnit[], context: ILayoutContext): IUnitValidationResult;

  /**
   * Check if units are compatible with layout strategy
   * @param units Units to check
   * @param strategy Layout strategy
   */
  areUnitsCompatibleWithStrategy(units: IUnit[], strategy: ILayoutStrategy): boolean;

  // ===== UNIT OPTIMIZATION =====

  /**
   * Optimize units for layout performance
   * @param units Units to optimize
   * @param context Layout context
   */
  optimizeUnitsForLayout(units: IUnit[], context: ILayoutContext): IUnit[];

  /**
   * Get unit calculation cache key
   * @param units Units to cache
   * @param context Layout context
   */
  getUnitCacheKey(units: IUnit[], context: ILayoutContext): string;

  /**
   * Clear unit calculation cache
   */
  clearUnitCache(): void;

  // ===== UTILITY METHODS =====

  /**
   * Get unit conversion factor
   * @param unit Unit to get factor for
   * @param context Layout context
   */
  getUnitConversionFactor(unit: IUnit, context: ILayoutContext): number;

  /**
   * Get supported unit types for layout type
   * @param layoutType Layout type
   */
  getSupportedUnitTypesForLayout(layoutType: LayoutType): UnitType[];

  /**
   * Get bridge statistics
   */
  getStatistics(): IUnitLayoutBridgeStatistics;

  /**
   * Reset bridge to initial state
   */
  reset(): void;
}

// ============================================================================
// SUPPORTING INTERFACES
// ============================================================================

/**
 * Unit-Layout Bridge configuration interface
 */
export interface IUnitLayoutBridgeConfig {
  /** Default unit conversion settings */
  conversion?: {
    precision: number;
    rounding: 'round' | 'floor' | 'ceil' | 'trunc';
    enableCaching: boolean;
    cacheSize: number;
  };

  /** Performance settings */
  performance?: {
    enableOptimization: boolean;
    maxConcurrentCalculations: number;
    calculationTimeout: number;
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
 * Unit validation result interface
 */
export interface IUnitValidationResult {
  /** Whether validation passed */
  isValid: boolean;

  /** Valid units */
  validUnits: IUnit[];

  /** Invalid units */
  invalidUnits: IUnit[];

  /** Validation errors */
  errors: IUnitValidationError[];

  /** Validation warnings */
  warnings: IUnitValidationWarning[];

  /** Validation metadata */
  metadata: {
    validationTime: number;
    totalUnits: number;
    validCount: number;
    invalidCount: number;
  };
}

/**
 * Unit validation error interface
 */
export interface IUnitValidationError {
  /** Error code */
  code: string;

  /** Error message */
  message: string;

  /** Unit ID that caused the error */
  unitId: string;

  /** Error severity */
  severity: 'error' | 'warning' | 'info';

  /** Suggested fix */
  suggestion?: string;

  /** Additional context */
  context?: Record<string, any>;
}

/**
 * Unit validation warning interface
 */
export interface IUnitValidationWarning {
  /** Warning code */
  code: string;

  /** Warning message */
  message: string;

  /** Unit ID that caused the warning */
  unitId: string;

  /** Warning severity */
  severity: 'warning' | 'info';

  /** Suggested improvement */
  suggestion?: string;

  /** Additional context */
  context?: Record<string, any>;
}

/**
 * Unit-Layout Bridge statistics interface
 */
export interface IUnitLayoutBridgeStatistics {
  /** Total unit conversions */
  totalConversions: number;

  /** Total unit calculations */
  totalCalculations: number;

  /** Total validations */
  totalValidations: number;

  /** Successful operations */
  successfulOperations: number;

  /** Failed operations */
  failedOperations: number;

  /** Average conversion time in milliseconds */
  averageConversionTime: number;

  /** Average calculation time in milliseconds */
  averageCalculationTime: number;

  /** Cache hit rate */
  cacheHitRate: number;

  /** Memory usage in bytes */
  memoryUsage: number;

  /** Performance metrics */
  performance: {
    conversionsPerSecond: number;
    calculationsPerSecond: number;
    validationsPerSecond: number;
    averageConversionTime: number;
    averageCalculationTime: number;
    averageValidationTime: number;
  };

  /** Unit type distribution */
  unitTypes: {
    size: number;
    position: number;
    scale: number;
  };

  /** Layout type distribution */
  layoutTypes: Record<LayoutType, number>;

  /** Error statistics */
  errors: {
    totalErrors: number;
    conversionErrors: number;
    calculationErrors: number;
    validationErrors: number;
  };
}
