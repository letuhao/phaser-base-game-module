import type { ISizeUnit } from '../interfaces/ISizeUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { UnitType } from '../enums/UnitType';
import { DEFAULT_FALLBACK_VALUES } from '../constants';
import { SizeValueCalculationStrategyRegistry } from '../strategies/value/SizeValueCalculationStrategyRegistry';
import { StrategyCache } from '../strategies/cache/StrategyCache';
import { WeightedAverageSizeComposer, PriorityBasedSizeComposer, AdaptiveSizeComposer } from '../strategies/composition/SizeStrategyComposers';
import { Logger } from '../../core/Logger';

/**
 * Enhanced SizeUnitCalculator class
 * Integrates Strategy Pattern, Composition, and Caching for maximum performance
 * Provides advanced features like strategy chaining, result caching, and performance monitoring
 */
export class EnhancedSizeUnitCalculator implements ISizeUnit {
  public readonly id: string;
  public readonly name: string;
  public readonly unitType: UnitType = UnitType.SIZE;
  public readonly sizeUnit: SizeUnit;
  public readonly dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH;
  public readonly baseValue: number | SizeValue;
  public readonly maintainAspectRatio: boolean;
  public readonly isActive: boolean = true;

  private minSize?: number;
  private maxSize?: number;
  private readonly strategyRegistry: SizeValueCalculationStrategyRegistry;
  private readonly cache: StrategyCache<SizeValue, SizeUnit, number>;
  private readonly composers: Array<WeightedAverageSizeComposer | PriorityBasedSizeComposer | AdaptiveSizeComposer>;
  private readonly logger = Logger.getInstance();
  private performanceMetrics = {
    totalCalculations: 0,
    cacheHits: 0,
    cacheMisses: 0,
    averageCalculationTime: 0,
    strategyCompositions: 0
  };

  constructor(
    id: string,
    name: string,
    sizeUnit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
    baseValue: number | SizeValue,
    maintainAspectRatio: boolean = false,
    strategyRegistry?: SizeValueCalculationStrategyRegistry,
    enableCaching: boolean = true,
    enableComposition: boolean = true
  ) {
    this.id = id;
    this.name = name;
    this.sizeUnit = sizeUnit;
    this.dimension = dimension;
    this.baseValue = baseValue;
    this.maintainAspectRatio = maintainAspectRatio;

    this.strategyRegistry = strategyRegistry || new SizeValueCalculationStrategyRegistry();
    
    // Initialize cache if enabled
    this.cache = enableCaching 
      ? new StrategyCache<SizeValue, SizeUnit, number>(`size-cache-${id}`, 500, 300000)
      : new StrategyCache<SizeValue, SizeUnit, number>(`size-cache-${id}`, 0, 0); // Disabled cache

    // Initialize composers if enabled
    this.composers = enableComposition ? [
      new WeightedAverageSizeComposer(),
      new PriorityBasedSizeComposer(),
      new AdaptiveSizeComposer()
    ] : [];

    this.logger.debug('EnhancedSizeUnitCalculator', 'constructor', 'Enhanced calculator initialized', {
      id,
      name,
      enableCaching,
      enableComposition,
      composersCount: this.composers.length
    });
  }

  /**
   * Calculate the actual size value based on context with enhanced features
   */
  calculate(context: UnitContext): number {
    const startTime = performance.now();

    try {
      // For numeric values, apply constraints directly
      if (typeof this.baseValue === 'number') {
        const result = this.applyConstraints(this.baseValue);
        this.recordCalculation(performance.now() - startTime, false);
        return result;
      }

      // Check cache first (only for SizeValue types)
      if (typeof this.baseValue !== 'number') {
        const cachedResult = this.cache.get(this.baseValue, this.sizeUnit, context);
        if (cachedResult !== null) {
          this.performanceMetrics.cacheHits++;
          this.recordCalculation(performance.now() - startTime, true);
          
          this.logger.debug('EnhancedSizeUnitCalculator', 'calculate', 'Cache hit', {
            id: this.id,
            baseValue: this.baseValue,
            result: cachedResult
          });

          return cachedResult;
        }

        this.performanceMetrics.cacheMisses++;

        // Use composition if available and multiple strategies can handle
        const applicableStrategies = this.strategyRegistry.getStrategiesFor(this.baseValue, this.sizeUnit, this.dimension);
      
        if (this.composers.length > 0 && applicableStrategies.length > 1) {
          const result = this.calculateWithComposition(context, applicableStrategies);
          this.cache.set(this.baseValue, this.sizeUnit, context, result);
          this.recordCalculation(performance.now() - startTime, false);
          return result;
        }

        // Fallback to single strategy
        const strategy = this.strategyRegistry.getBestStrategy(this.baseValue, this.sizeUnit, this.dimension);
        
        if (strategy) {
          this.logger.debug('EnhancedSizeUnitCalculator', 'calculate', 'Using single strategy', {
            id: this.id,
            strategyId: strategy.strategyId,
            baseValue: this.baseValue
          });

          if (!strategy.validateContext(context)) {
            this.logger.warn('EnhancedSizeUnitCalculator', 'calculate', 'Context validation failed', {
              id: this.id,
              strategyId: strategy.strategyId
            });
            const fallbackResult = this.applyConstraints(DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT);
            this.cache.set(this.baseValue, this.sizeUnit, context, fallbackResult);
            this.recordCalculation(performance.now() - startTime, false);
            return fallbackResult;
          }

          const result = this.applyConstraints(strategy.calculate(this.baseValue, this.sizeUnit, this.dimension, context));
          this.cache.set(this.baseValue, this.sizeUnit, context, result);
          this.recordCalculation(performance.now() - startTime, false);
          return result;
        }

        // Fallback to default
        this.logger.warn('EnhancedSizeUnitCalculator', 'calculate', 'No strategy found', {
          id: this.id,
          baseValue: this.baseValue,
          sizeUnit: this.sizeUnit
        });

        const fallbackResult = this.applyConstraints(DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT);
        this.cache.set(this.baseValue, this.sizeUnit, context, fallbackResult);
        this.recordCalculation(performance.now() - startTime, false);
        return fallbackResult;
      }

      // This should never be reached, but TypeScript requires it
      return this.applyConstraints(DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT);
    } catch (error) {
      this.logger.error('EnhancedSizeUnitCalculator', 'calculate', 'Calculation failed', {
        id: this.id,
        error: error instanceof Error ? error.message : String(error)
      });
      
      const fallbackResult = this.applyConstraints(DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT);
      this.recordCalculation(performance.now() - startTime, false);
      return fallbackResult;
    }
  }

  /**
   * Calculate size specifically
   */
  calculateSize(context: UnitContext): number {
    return this.calculate(context);
  }

  /**
   * Calculate width specifically
   */
  calculateWidth(context: UnitContext): number {
    if (this.dimension === Dimension.HEIGHT) {
      throw new Error('Cannot calculate width for height-only dimension');
    }
    return this.calculate(context);
  }

  /**
   * Calculate height specifically
   */
  calculateHeight(context: UnitContext): number {
    if (this.dimension === Dimension.WIDTH) {
      throw new Error('Cannot calculate height for width-only dimension');
    }
    return this.calculate(context);
  }

  /**
   * Calculate using strategy composition
   */
  private calculateWithComposition(context: UnitContext, strategies: any[]): number {
    this.performanceMetrics.strategyCompositions++;

    // Prepare strategies with weights
    const weightedStrategies = strategies.map((strategy, index) => ({
      strategy,
      weight: 1.0 / (index + 1) // Decreasing weights
    }));

    // Try composers in priority order
    for (const composer of this.composers) {
      if (typeof this.baseValue !== 'number' && composer.canCompose(this.baseValue, this.sizeUnit)) {
        this.logger.debug('EnhancedSizeUnitCalculator', 'calculateWithComposition', 'Using composer', {
          id: this.id,
          composerId: composer.composerId,
          strategiesCount: strategies.length
        });

        const result = composer.compose(this.baseValue, this.sizeUnit, context, weightedStrategies);
        return this.applyConstraints(result);
      }
    }

    // Fallback to first strategy if no composer can handle
    const firstStrategy = strategies[0];
    return this.applyConstraints(firstStrategy.calculate(this.baseValue, this.sizeUnit, this.dimension, context));
  }

  /**
   * Check if the unit is responsive
   */
  isResponsive(): boolean {
    return typeof this.baseValue !== 'number';
  }

  /**
   * Get minimum size constraint
   */
  getMinSize(): number | undefined {
    return this.minSize;
  }

  /**
   * Get maximum size constraint
   */
  getMaxSize(): number | undefined {
    return this.maxSize;
  }

  /**
   * Set size constraints
   */
  setSizeConstraints(min?: number, max?: number): void {
    this.minSize = min;
    this.maxSize = max;
  }

  /**
   * Validate unit in given context
   */
  validate(context: UnitContext): boolean {
    if (typeof this.baseValue === 'number') {
      return true; // Numeric values are always valid
    }

    const strategy = this.strategyRegistry.getBestStrategy(this.baseValue, this.sizeUnit, this.dimension);
    return strategy ? strategy.validateContext(context) : false;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `EnhancedSizeUnitCalculator(${this.name}, ${this.sizeUnit}, ${this.dimension})`;
  }

  /**
   * Clone the unit with optional modifications
   */
  clone(overrides?: Partial<ISizeUnit>): EnhancedSizeUnitCalculator {
    const cloned = new EnhancedSizeUnitCalculator(
      overrides?.id ?? this.id,
      overrides?.name ?? this.name,
      overrides?.sizeUnit ?? this.sizeUnit,
      overrides?.dimension ?? this.dimension,
      overrides?.baseValue ?? this.baseValue,
      false,
      this.strategyRegistry,
      true,
      true
    );

    if (this.minSize !== undefined) cloned.setSizeConstraints(this.minSize, this.maxSize);
    return cloned;
  }

  /**
   * Get enhanced performance metrics
   */
  getPerformanceMetrics(): {
    totalCalculations: number;
    cacheHits: number;
    cacheMisses: number;
    cacheHitRate: number;
    averageCalculationTime: number;
    strategyCompositions: number;
    cacheStatistics: any;
    composerMetrics: Array<{
      composerId: string;
      metrics: any;
    }>;
  } {
    const cacheHitRate = this.performanceMetrics.totalCalculations > 0 
      ? this.performanceMetrics.cacheHits / this.performanceMetrics.totalCalculations 
      : 0;

    return {
      totalCalculations: this.performanceMetrics.totalCalculations,
      cacheHits: this.performanceMetrics.cacheHits,
      cacheMisses: this.performanceMetrics.cacheMisses,
      cacheHitRate,
      averageCalculationTime: this.performanceMetrics.averageCalculationTime,
      strategyCompositions: this.performanceMetrics.strategyCompositions,
      cacheStatistics: this.cache.getStatistics(),
      composerMetrics: this.composers.map(composer => ({
        composerId: composer.composerId,
        metrics: composer.getPerformanceMetrics()
      }))
    };
  }

  /**
   * Get cache instance for advanced operations
   */
  getCache(): StrategyCache<SizeValue, SizeUnit, number> {
    return this.cache;
  }

  /**
   * Get composers for advanced operations
   */
  getComposers(): Array<WeightedAverageSizeComposer | PriorityBasedSizeComposer | AdaptiveSizeComposer> {
    return this.composers;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
    this.logger.debug('EnhancedSizeUnitCalculator', 'clearCache', 'Cache cleared', {
      id: this.id
    });
  }

  /**
   * Get cache statistics
   */
  getCacheStatistics(): any {
    return this.cache.getStatistics();
  }

  /**
   * Check if the size has constraints
   */
  hasConstraints(): boolean {
    return this.minSize !== undefined || this.maxSize !== undefined;
  }

  /**
   * Get constraint information
   */
  getConstraintInfo(): { min?: number; max?: number; hasConstraints: boolean } {
    return {
      min: this.minSize,
      max: this.maxSize,
      hasConstraints: this.hasConstraints()
    };
  }

  /**
   * Validate if size value is within constraints
   */
  validateSize(value: number): boolean {
    if (this.minSize !== undefined && value < this.minSize) {
      return false;
    }
    if (this.maxSize !== undefined && value > this.maxSize) {
      return false;
    }
    return true;
  }

  /**
   * Get size information for debugging
   */
  getSizeInfo(): {
    sizeUnit: SizeUnit;
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH;
    hasConstraints: boolean;
    isResponsive: boolean;
    cacheEnabled: boolean;
    compositionEnabled: boolean;
  } {
    return {
      sizeUnit: this.sizeUnit,
      dimension: this.dimension,
      hasConstraints: this.hasConstraints(),
      isResponsive: this.isResponsive(),
      cacheEnabled: this.cache.maxSize > 0,
      compositionEnabled: this.composers.length > 0
    };
  }

  /**
   * Apply size constraints to a value
   */
  private applyConstraints(value: number): number {
    if (this.minSize !== undefined && value < this.minSize) {
      return this.minSize;
    }
    if (this.maxSize !== undefined && value > this.maxSize) {
      return this.maxSize;
    }
    return value;
  }

  /**
   * Record calculation performance metrics
   */
  private recordCalculation(time: number, fromCache: boolean): void {
    this.performanceMetrics.totalCalculations++;
    
    if (!fromCache) {
      // Update average calculation time (exponential moving average)
      const alpha = 0.1; // Smoothing factor
      this.performanceMetrics.averageCalculationTime = 
        alpha * time + (1 - alpha) * this.performanceMetrics.averageCalculationTime;
    }
  }
}
