/**
 * Layout Strategy Interfaces
 * Defines strategy pattern contracts for layout calculations
 * Enables extensible and pluggable layout algorithms
 */

import { 
  LayoutType,
  BreakpointName,
  ScaleStrategy,
  Alignment,
  HorizontalAlignment,
  VerticalAlignment,
  PerformanceLevel,
  CalculationSpeed
} from '../enums/LayoutEnums';
import { 
  ILayoutConfig,
  ILayoutContext,
  ICalculatedLayout,
  ILayoutValidationResult
} from './ILayout';

// ============================================================================
// STRATEGY INTERFACES
// ============================================================================

/**
 * Base layout strategy interface
 * Defines the contract for all layout strategies
 */
export interface ILayoutStrategy {
  /** Strategy type */
  readonly type: LayoutType;
  
  /** Strategy name */
  readonly name: string;
  
  /** Strategy priority (higher = more important) */
  readonly priority: number;
  
  /** Strategy version */
  readonly version: string;
  
  /** Whether this strategy is enabled */
  readonly isEnabled: boolean;
  
  /**
   * Check if this strategy can handle the given layout configuration
   * @param config Layout configuration to check
   * @param context Layout context
   */
  canHandle(config: ILayoutConfig, context: ILayoutContext): boolean;
  
  /**
   * Calculate layout using this strategy
   * @param config Layout configuration
   * @param context Layout context
   */
  calculate(config: ILayoutConfig, context: ILayoutContext): ICalculatedLayout;
  
  /**
   * Validate layout configuration for this strategy
   * @param config Layout configuration to validate
   */
  validate(config: ILayoutConfig): ILayoutValidationResult;
  
  /**
   * Get strategy capabilities
   */
  getCapabilities(): IStrategyCapabilities;
  
  /**
   * Get strategy performance metrics
   */
  getPerformanceMetrics(): IStrategyPerformanceMetrics;
}

/**
 * Responsive layout strategy interface
 * Handles responsive behavior for different breakpoints
 */
export interface IResponsiveLayoutStrategy extends ILayoutStrategy {
  /** Supported breakpoints */
  readonly supportedBreakpoints: BreakpointName[];
  
  /**
   * Check if strategy supports a specific breakpoint
   * @param breakpoint Breakpoint to check
   */
  supportsBreakpoint(breakpoint: BreakpointName): boolean;
  
  /**
   * Get responsive configuration for a breakpoint
   * @param config Base layout configuration
   * @param breakpoint Target breakpoint
   */
  getResponsiveConfig(config: ILayoutConfig, breakpoint: BreakpointName): ILayoutConfig;
  
  /**
   * Apply responsive behavior to layout
   * @param layout Base layout
   * @param breakpoint Current breakpoint
   * @param context Layout context
   */
  applyResponsiveBehavior(layout: ICalculatedLayout, breakpoint: BreakpointName, context: ILayoutContext): ICalculatedLayout;
}

/**
 * Unit layout strategy interface
 * Handles Unit System integration for layout calculations
 */
export interface IUnitLayoutStrategy extends ILayoutStrategy {
  /** Supported unit types */
  readonly supportedUnits: {
    size: string[];
    position: string[];
    scale: string[];
  };
  
  /**
   * Convert unit values to pixels
   * @param value Value to convert
   * @param unit Unit type
   * @param context Layout context
   */
  convertUnit(value: number, unit: string, context: ILayoutContext): number;
  
  /**
   * Validate unit values
   * @param value Value to validate
   * @param unit Unit type
   */
  validateUnit(value: number, unit: string): boolean;
  
  /**
   * Get unit conversion factor
   * @param unit Unit type
   * @param context Layout context
   */
  getConversionFactor(unit: string, context: ILayoutContext): number;
}

/**
 * Alignment layout strategy interface
 * Handles alignment calculations
 */
export interface IAlignmentLayoutStrategy extends ILayoutStrategy {
  /** Supported alignment types */
  readonly supportedAlignments: {
    horizontal: HorizontalAlignment[];
    vertical: VerticalAlignment[];
    combined: Alignment[];
  };
  
  /**
   * Calculate alignment position
   * @param alignment Alignment to calculate
   * @param containerSize Container dimensions
   * @param elementSize Element dimensions
   */
  calculateAlignment(alignment: Alignment, containerSize: { width: number; height: number }, elementSize: { width: number; height: number }): { x: number; y: number };
  
  /**
   * Validate alignment configuration
   * @param alignment Alignment to validate
   */
  validateAlignment(alignment: Alignment): boolean;
}

/**
 * Scale layout strategy interface
 * Handles scaling calculations
 */
export interface IScaleLayoutStrategy extends ILayoutStrategy {
  /** Supported scale strategies */
  readonly supportedScaleStrategies: ScaleStrategy[];
  
  /**
   * Calculate scale values
   * @param config Scale configuration
   * @param context Layout context
   */
  calculateScale(config: { x?: number; y?: number; uniform?: number; strategy: ScaleStrategy }, context: ILayoutContext): { x: number; y: number };
  
  /**
   * Apply scale strategy
   * @param strategy Scale strategy to apply
   * @param originalSize Original element size
   * @param targetSize Target container size
   */
  applyScaleStrategy(strategy: ScaleStrategy, originalSize: { width: number; height: number }, targetSize: { width: number; height: number }): { width: number; height: number };
}

// ============================================================================
// STRATEGY CAPABILITIES INTERFACES
// ============================================================================

/**
 * Strategy capabilities interface
 * Describes what a strategy can do
 */
export interface IStrategyCapabilities {
  /** Supported layout types */
  supportedLayoutTypes: LayoutType[];
  
  /** Supported breakpoints */
  supportedBreakpoints: BreakpointName[];
  
  /** Supported units */
  supportedUnits: {
    size: string[];
    position: string[];
    scale: string[];
  };
  
  /** Supported alignments */
  supportedAlignments: {
    horizontal: HorizontalAlignment[];
    vertical: VerticalAlignment[];
    combined: Alignment[];
  };
  
  /** Supported scale strategies */
  supportedScaleStrategies: ScaleStrategy[];
  
  /** Performance characteristics */
  performance: {
    complexity: 'O(1)' | 'O(n)' | 'O(n²)' | 'O(log n)';
    memoryUsage: PerformanceLevel;
    calculationSpeed: CalculationSpeed;
  };
  
  /** Feature support */
  features: {
    responsive: boolean;
    unitConversion: boolean;
    alignment: boolean;
    scaling: boolean;
    validation: boolean;
    caching: boolean;
  };
}

/**
 * Strategy performance metrics interface
 * Tracks performance data for strategies
 */
export interface IStrategyPerformanceMetrics {
  /** Total calculations performed */
  totalCalculations: number;
  
  /** Average calculation time in milliseconds */
  averageCalculationTime: number;
  
  /** Total calculation time in milliseconds */
  totalCalculationTime: number;
  
  /** Memory usage in bytes */
  memoryUsage: number;
  
  /** Cache hit rate */
  cacheHitRate: number;
  
  /** Error rate */
  errorRate: number;
  
  /** Last calculation time */
  lastCalculationTime: number;
  
  /** Performance history */
  history: {
    calculationTimes: number[];
    memoryUsage: number[];
    errorCounts: number[];
  };
}

// ============================================================================
// STRATEGY REGISTRY INTERFACES
// ============================================================================

/**
 * Strategy registry interface
 * Manages registration and retrieval of layout strategies
 */
export interface IStrategyRegistry {
  /**
   * Register a layout strategy
   * @param strategy Strategy to register
   */
  registerStrategy(strategy: ILayoutStrategy): void;
  
  /**
   * Unregister a layout strategy
   * @param name Strategy name
   */
  unregisterStrategy(name: string): boolean;
  
  /**
   * Get a strategy by name
   * @param name Strategy name
   */
  getStrategy(name: string): ILayoutStrategy | undefined;
  
  /**
   * Get all strategies of a specific type
   * @param type Strategy type
   */
  getStrategiesByType(type: LayoutType): ILayoutStrategy[];
  
  /**
   * Get all strategies that can handle a configuration
   * @param config Layout configuration
   * @param context Layout context
   */
  getCompatibleStrategies(config: ILayoutConfig, context: ILayoutContext): ILayoutStrategy[];
  
  /**
   * Get the best strategy for a configuration
   * @param config Layout configuration
   * @param context Layout context
   */
  getBestStrategy(config: ILayoutConfig, context: ILayoutContext): ILayoutStrategy | undefined;
  
  /**
   * Get all registered strategies
   */
  getAllStrategies(): ILayoutStrategy[];
  
  /**
   * Get registry statistics
   */
  getStatistics(): IStrategyRegistryStatistics;
}

/**
 * Strategy registry statistics interface
 */
export interface IStrategyRegistryStatistics {
  /** Total number of registered strategies */
  totalStrategies: number;
  
  /** Strategies by type */
  strategiesByType: Record<LayoutType, number>;
  
  /** Average strategy priority */
  averagePriority: number;
  
  /** Enabled strategies count */
  enabledStrategies: number;
  
  /** Disabled strategies count */
  disabledStrategies: number;
  
  /** Registry performance metrics */
  performance: {
    registrationTime: number;
    lookupTime: number;
    memoryUsage: number;
  };
}

// ============================================================================
// STRATEGY FACTORY INTERFACES
// ============================================================================

/**
 * Strategy factory interface
 * Creates layout strategies
 */
export interface IStrategyFactory {
  /**
   * Create a strategy by type
   * @param type Strategy type
   * @param config Strategy configuration
   */
  createStrategy(type: LayoutType, config?: Record<string, unknown>): ILayoutStrategy;
  
  /**
   * Create a responsive strategy
   * @param config Strategy configuration
   */
  createResponsiveStrategy(config?: Record<string, unknown>): IResponsiveLayoutStrategy;
  
  /**
   * Create a unit strategy
   * @param config Strategy configuration
   */
  createUnitStrategy(config?: Record<string, unknown>): IUnitLayoutStrategy;
  
  /**
   * Create an alignment strategy
   * @param config Strategy configuration
   */
  createAlignmentStrategy(config?: Record<string, unknown>): IAlignmentLayoutStrategy;
  
  /**
   * Create a scale strategy
   * @param config Strategy configuration
   */
  createScaleStrategy(config?: Record<string, unknown>): IScaleLayoutStrategy;
  
  /**
   * Get available strategy types
   */
  getAvailableStrategyTypes(): LayoutType[];
  
  /**
   * Get strategy configuration schema
   * @param type Strategy type
   */
  getStrategyConfigSchema(type: LayoutType): Record<string, unknown>;
}
