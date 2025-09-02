import type { IScaleUnit } from '../interfaces/IScaleUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { UnitType } from '../enums/UnitType';
import { DEFAULT_FALLBACK_VALUES } from '../constants';
import { ScaleValueCalculationStrategyRegistry } from '../strategies/value/ScaleValueCalculationStrategyRegistry';
import { Logger } from '../../core/Logger';

/**
 * Refactored ScaleUnitCalculator class
 * Uses Strategy Pattern instead of large switch statements
 * Implements scale unit calculations for responsive scaling
 */
export class RefactoredScaleUnitCalculator implements IScaleUnit {
  public readonly id: string;
  public readonly name: string;
  public readonly unitType: UnitType = UnitType.SCALE;
  public readonly scaleUnit: ScaleUnit;
  public readonly baseValue: number | ScaleValue;
  public readonly maintainAspectRatio: boolean;
  public readonly isActive: boolean = true;

  private minScale?: number;
  private maxScale?: number;
  private uniformScaling: boolean = false;
  private readonly strategyRegistry: ScaleValueCalculationStrategyRegistry;
  private readonly logger = Logger.getInstance();

  constructor(
    id: string,
    name: string,
    scaleUnit: ScaleUnit,
    baseValue: number | ScaleValue,
    maintainAspectRatio: boolean = false,
    strategyRegistry?: ScaleValueCalculationStrategyRegistry
  ) {
    this.id = id;
    this.name = name;
    this.scaleUnit = scaleUnit;
    this.baseValue = baseValue;
    this.maintainAspectRatio = maintainAspectRatio;
    this.strategyRegistry = strategyRegistry || new ScaleValueCalculationStrategyRegistry();
  }

  /**
   * Calculate the actual scale value based on context
   */
  calculate(context: UnitContext): number {
    return this.calculateScale(context);
  }

  /**
   * Calculate scale based on context using Strategy Pattern
   */
  calculateScale(context: UnitContext): number {
    // For numeric values, apply constraints directly
    if (typeof this.baseValue === 'number') {
      return this.applyConstraints(this.baseValue);
    }

    // Use Strategy Pattern to find and execute the appropriate strategy
    const strategy = this.strategyRegistry.getBestStrategy(this.baseValue, this.scaleUnit);

    if (strategy) {
      this.logger.debug('RefactoredScaleUnitCalculator', 'calculateScale', 'Using strategy', {
        strategyId: strategy.strategyId,
        scaleValue: this.baseValue,
        scaleUnit: this.scaleUnit,
      });

      // Validate context before calculation
      if (!strategy.validateContext(context)) {
        this.logger.warn(
          'RefactoredScaleUnitCalculator',
          'calculateScale',
          'Context validation failed',
          {
            strategyId: strategy.strategyId,
            scaleValue: this.baseValue,
          }
        );
        return this.applyConstraints(DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT);
      }

      const result = strategy.calculate(this.baseValue, this.scaleUnit, context);
      return this.applyConstraints(result);
    }

    // Fallback to default if no strategy found
    this.logger.warn('RefactoredScaleUnitCalculator', 'calculateScale', 'No strategy found', {
      scaleValue: this.baseValue,
      scaleUnit: this.scaleUnit,
    });

    return this.applyConstraints(DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT);
  }

  /**
   * Calculate X scale specifically
   */
  calculateScaleX(context: UnitContext): number {
    if (this.uniformScaling) {
      return this.calculateScale(context);
    }
    return this.calculateScale(context);
  }

  /**
   * Calculate Y scale specifically
   */
  calculateScaleY(context: UnitContext): number {
    if (this.uniformScaling) {
      return this.calculateScale(context);
    }
    return this.calculateScale(context);
  }

  /**
   * Calculate both X and Y scales
   */
  calculateBoth(context: UnitContext): { scaleX: number; scaleY: number } {
    const scale = this.calculateScale(context);
    return { scaleX: scale, scaleY: scale };
  }

  /**
   * Check if the unit is responsive
   */
  isResponsive(): boolean {
    return typeof this.baseValue !== 'number';
  }

  /**
   * Get minimum scale constraint
   */
  getMinScale(): number | undefined {
    return this.minScale;
  }

  /**
   * Get maximum scale constraint
   */
  getMaxScale(): number | undefined {
    return this.maxScale;
  }

  /**
   * Set scale constraints
   */
  setScaleConstraints(min?: number, max?: number): void {
    this.minScale = min;
    this.maxScale = max;
  }

  /**
   * Check if scaling should be uniform
   */
  isUniformScaling(): boolean {
    return this.uniformScaling;
  }

  /**
   * Set uniform scaling mode
   */
  setUniformScaling(uniform: boolean): void {
    this.uniformScaling = uniform;
  }

  /**
   * Validate unit in given context using Strategy Pattern
   */
  validate(context: UnitContext): boolean {
    if (typeof this.baseValue === 'number') {
      return true; // Numeric values are always valid
    }

    const strategy = this.strategyRegistry.getBestStrategy(this.baseValue, this.scaleUnit);

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
    // Check if the scaleUnit requires specific context
    if (
      this.scaleUnit === ScaleUnit.PARENT_SCALE ||
      this.scaleUnit === ScaleUnit.PARENT_WIDTH_SCALE ||
      this.scaleUnit === ScaleUnit.PARENT_HEIGHT_SCALE
    ) {
      return !!context.parent;
    }
    if (
      this.scaleUnit === ScaleUnit.SCENE_SCALE ||
      this.scaleUnit === ScaleUnit.SCENE_WIDTH_SCALE ||
      this.scaleUnit === ScaleUnit.SCENE_HEIGHT_SCALE
    ) {
      return !!context.scene;
    }
    if (
      this.scaleUnit === ScaleUnit.VIEWPORT_SCALE ||
      this.scaleUnit === ScaleUnit.VIEWPORT_WIDTH_SCALE ||
      this.scaleUnit === ScaleUnit.VIEWPORT_HEIGHT_SCALE
    ) {
      return !!context.viewport;
    }
    if (
      this.baseValue === ScaleValue.CONTENT_SCALE ||
      this.baseValue === ScaleValue.INTRINSIC_SCALE
    ) {
      return !!context.content;
    }
    if (this.baseValue === ScaleValue.BREAKPOINT_SCALE) {
      return !!context.breakpoint;
    }
    return true;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `RefactoredScaleUnitCalculator(${this.name}, ${this.scaleUnit})`;
  }

  /**
   * Clone the unit with optional modifications
   */
  clone(overrides?: Partial<IScaleUnit>): RefactoredScaleUnitCalculator {
    const cloned = new RefactoredScaleUnitCalculator(
      overrides?.id ?? this.id,
      overrides?.name ?? this.name,
      overrides?.scaleUnit ?? this.scaleUnit,
      overrides?.baseValue ?? this.baseValue,
      overrides?.maintainAspectRatio ?? this.maintainAspectRatio,
      this.strategyRegistry
    );

    if (this.minScale !== undefined) cloned.setScaleConstraints(this.minScale, this.maxScale);
    cloned.setUniformScaling(this.uniformScaling);
    return cloned;
  }

  /**
   * Check if the scale has constraints
   */
  hasConstraints(): boolean {
    return this.minScale !== undefined || this.maxScale !== undefined;
  }

  /**
   * Get constraint information
   */
  getConstraintInfo(): { min?: number; max?: number; hasConstraints: boolean } {
    return {
      min: this.minScale,
      max: this.maxScale,
      hasConstraints: this.hasConstraints(),
    };
  }

  /**
   * Validate if scale value is within constraints
   */
  validateScale(value: number): boolean {
    if (this.minScale !== undefined && value < this.minScale) {
      return false;
    }
    if (this.maxScale !== undefined && value > this.maxScale) {
      return false;
    }
    return true;
  }

  /**
   * Get scale information for debugging
   */
  getScaleInfo(): {
    scaleUnit: ScaleUnit;
    maintainAspectRatio: boolean;
    uniformScaling: boolean;
    hasConstraints: boolean;
    isResponsive: boolean;
  } {
    return {
      scaleUnit: this.scaleUnit,
      maintainAspectRatio: this.maintainAspectRatio,
      uniformScaling: this.uniformScaling,
      hasConstraints: this.hasConstraints(),
      isResponsive: this.isResponsive(),
    };
  }

  /**
   * Calculate the optimal scale for a given content and container
   */
  calculateOptimalScale(
    contentWidth: number,
    contentHeight: number,
    containerWidth: number,
    containerHeight: number
  ): number {
    const scaleX = containerWidth / contentWidth;
    const scaleY = containerHeight / contentHeight;

    if (this.maintainAspectRatio) {
      return Math.min(scaleX, scaleY);
    }
    return Math.min(scaleX, scaleY);
  }

  /**
   * Get strategy registry for testing and debugging
   */
  getStrategyRegistry(): ScaleValueCalculationStrategyRegistry {
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
   * Apply scale constraints to a value
   */
  private applyConstraints(value: number): number {
    if (this.minScale !== undefined && value < this.minScale) {
      return this.minScale;
    }
    if (this.maxScale !== undefined && value > this.maxScale) {
      return this.maxScale;
    }
    return value;
  }
}
