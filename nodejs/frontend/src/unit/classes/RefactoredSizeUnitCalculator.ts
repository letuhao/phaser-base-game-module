import type { ISizeUnit } from '../interfaces/ISizeUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { UnitType } from '../enums/UnitType';
import { DEFAULT_FALLBACK_VALUES } from '../constants';
import { SizeValueCalculationStrategyRegistry } from '../strategies/value/SizeValueCalculationStrategyRegistry';
import { Logger } from '../../core/Logger';

/**
 * Refactored SizeUnitCalculator class
 * Uses Strategy Pattern instead of large switch statements
 * Implements size unit calculations for responsive sizing
 * Optimized for high-performance real-time calculations
 */
export class RefactoredSizeUnitCalculator implements ISizeUnit {
  public readonly id: string;
  public readonly name: string;
  public readonly unitType: UnitType = UnitType.SIZE;
  public readonly sizeUnit: SizeUnit;
  public readonly dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH;
  public readonly maintainAspectRatio: boolean;
  public readonly baseValue: number | SizeValue;
  public readonly isActive: boolean = true;

  private minSize?: number;
  private maxSize?: number;
  private readonly strategyRegistry: SizeValueCalculationStrategyRegistry;
  private readonly logger = Logger.getInstance();
  
  // Performance optimizations
  private cachedStrategy: any = null;
  private lastCacheVersion = -1;
  private readonly isNumericValue: boolean;
  private readonly numericValue: number;

  constructor(
    id: string,
    name: string,
    sizeUnit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
    baseValue: number | SizeValue,
    maintainAspectRatio: boolean = false,
    strategyRegistry?: SizeValueCalculationStrategyRegistry
  ) {
    this.id = id;
    this.name = name;
    this.sizeUnit = sizeUnit;
    this.dimension = dimension;
    this.baseValue = baseValue;
    this.maintainAspectRatio = maintainAspectRatio;
    this.strategyRegistry = strategyRegistry || new SizeValueCalculationStrategyRegistry();
    
    // Pre-compute numeric value for performance
    this.isNumericValue = typeof baseValue === 'number';
    this.numericValue = this.isNumericValue ? baseValue as number : 0;
    
    // Pre-warm cache for non-numeric values to improve performance
    if (!this.isNumericValue) {
      this.preWarmStrategyCache();
    }
  }

  /**
   * Pre-warm strategy cache for better performance
   */
  private preWarmStrategyCache(): void {
    try {
      // Pre-warm the registry cache for this specific combination
      this.strategyRegistry.getBestStrategy(
        this.baseValue,
        this.sizeUnit,
        this.dimension
      );
    } catch (error) {
      // Ignore pre-warming errors - they don't affect functionality
      if (process.env.NODE_ENV === 'development') {
        this.logger.debug('RefactoredSizeUnitCalculator', 'preWarmStrategyCache', 'Pre-warming failed', { error });
      }
    }
  }

  /**
   * Calculate the actual size value based on context
   * Optimized for high-performance real-time calculations
   */
  calculate(context: UnitContext): number {
    return this.calculateSize(context);
  }

  /**
   * Calculate size based on context using Strategy Pattern
   * Optimized with caching and reduced logging overhead
   */
  calculateSize(context: UnitContext): number {
    // Fast path for numeric values - no strategy lookup needed (same as original)
    if (this.isNumericValue) {
      return this.applyConstraints(this.numericValue);
    }

    // Use cached strategy for maximum performance
    const currentCacheVersion = this.strategyRegistry.getStatistics().cacheStats.cacheVersion;
    if (this.cachedStrategy && this.lastCacheVersion === currentCacheVersion) {
      // Use cached strategy - O(1) performance
      if (this.cachedStrategy.validateContext(context)) {
        const result = this.cachedStrategy.calculate(this.baseValue, this.sizeUnit, this.dimension, context);
        return this.applyConstraints(result);
      } else {
        // Context validation failed, fallback to default
        return this.applyConstraints(DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT);
      }
    }

    // Cache miss - perform strategy lookup and cache result
    const strategy = this.strategyRegistry.getBestStrategy(
      this.baseValue,
      this.sizeUnit,
      this.dimension
    );

    if (strategy) {
      // Cache the strategy for future O(1) access
      this.cachedStrategy = strategy;
      this.lastCacheVersion = currentCacheVersion;

      // Validate context before calculation
      if (!strategy.validateContext(context)) {
        // Only log validation failures in development mode
        if (process.env.NODE_ENV === 'development') {
          this.logger.warn('RefactoredSizeUnitCalculator', 'calculateSize', 'Context validation failed', {
            strategyId: strategy.strategyId,
            sizeValue: this.baseValue
          });
        }
        return this.applyConstraints(DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT);
      }

      const result = strategy.calculate(this.baseValue, this.sizeUnit, this.dimension, context);
      return this.applyConstraints(result);
    }

    // Fallback to default if no strategy found
    // Only log in development mode to reduce production overhead
    if (process.env.NODE_ENV === 'development') {
      this.logger.warn('RefactoredSizeUnitCalculator', 'calculateSize', 'No strategy found', {
        sizeValue: this.baseValue,
        sizeUnit: this.sizeUnit,
        dimension: this.dimension
      });
    }

    return this.applyConstraints(DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT);
  }

  /**
   * Calculate width specifically
   */
  calculateWidth(context: UnitContext): number {
    if (this.dimension === Dimension.HEIGHT) {
      throw new Error('Cannot calculate width for height-only dimension');
    }
    return this.calculateSize(context);
  }

  /**
   * Calculate height specifically
   */
  calculateHeight(context: UnitContext): number {
    if (this.dimension === Dimension.WIDTH) {
      throw new Error('Cannot calculate height for width-only dimension');
    }
    return this.calculateSize(context);
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
   * Validate unit in given context using Strategy Pattern
   */
  validate(context: UnitContext): boolean {
    if (typeof this.baseValue === 'number') {
      return true; // Numeric values are always valid
    }

    const strategy = this.strategyRegistry.getBestStrategy(
      this.baseValue,
      this.sizeUnit,
      this.dimension
    );

    if (strategy) {
      return strategy.validateContext(context);
    }

    // If no strategy found, use basic validation
    return this.validateBasic(context);
  }

  /**
   * Basic validation fallback
   */
  private validateBasic(context: UnitContext): boolean {
    if (this.baseValue === SizeValue.PARENT_WIDTH || this.baseValue === SizeValue.PARENT_HEIGHT) {
      return !!context.parent;
    }
    if (this.baseValue === SizeValue.SCENE_WIDTH || this.baseValue === SizeValue.SCENE_HEIGHT) {
      return !!context.scene;
    }
    if (
      this.baseValue === SizeValue.VIEWPORT_WIDTH ||
      this.baseValue === SizeValue.VIEWPORT_HEIGHT
    ) {
      return !!context.viewport;
    }
    if (this.baseValue === SizeValue.CONTENT || this.baseValue === SizeValue.INTRINSIC) {
      return !!context.content;
    }
    return true;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `RefactoredSizeUnitCalculator(${this.name}, ${this.sizeUnit}, ${this.dimension})`;
  }

  /**
   * Clone the unit with optional modifications
   */
  clone(overrides?: Partial<ISizeUnit>): RefactoredSizeUnitCalculator {
    const cloned = new RefactoredSizeUnitCalculator(
      overrides?.id ?? this.id,
      overrides?.name ?? this.name,
      overrides?.sizeUnit ?? this.sizeUnit,
      overrides?.dimension ?? this.dimension,
      overrides?.baseValue ?? this.baseValue,
      overrides?.maintainAspectRatio ?? this.maintainAspectRatio,
      this.strategyRegistry
    );

    if (this.minSize !== undefined) cloned.setSizeConstraints(this.minSize, this.maxSize);
    return cloned;
  }

  /**
   * Get the aspect ratio if maintaining aspect ratio
   */
  getAspectRatio(): number | undefined {
    if (!this.maintainAspectRatio) return undefined;
    
    // If we have both width and height constraints, calculate aspect ratio
    if (this.minSize !== undefined && this.maxSize !== undefined) {
      return this.maxSize / this.minSize;
    }
    
    return undefined;
  }

  /**
   * Check if the unit has size constraints
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
   * Get strategy registry for testing and debugging
   */
  getStrategyRegistry(): SizeValueCalculationStrategyRegistry {
    return this.strategyRegistry;
  }

  /**
   * Get available strategies for debugging
   */
  getAvailableStrategies(): string[] {
    return this.strategyRegistry.getAllStrategies().map(s => s.strategyId);
  }

  /**
   * Get strategy statistics for monitoring
   */
  getStrategyStatistics(): any {
    return this.strategyRegistry.getStatistics();
  }

  /**
   * Apply size constraints with optimized performance
   */
  private applyConstraints(value: number): number {
    // Fast path: no constraints
    if (this.minSize === undefined && this.maxSize === undefined) {
      return value;
    }

    // Apply constraints with minimal branching
    let result = value;
    if (this.minSize !== undefined && result < this.minSize) {
      result = this.minSize;
    }
    if (this.maxSize !== undefined && result > this.maxSize) {
      result = this.maxSize;
    }
    return result;
  }
}
