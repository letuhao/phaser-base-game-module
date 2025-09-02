import type { IPositionUnit } from '../interfaces/IPositionUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { PositionUnit } from '../enums/PositionUnit';
import { Dimension } from '../enums/Dimension';
import { PositionValue } from '../enums/PositionValue';
import { UnitType } from '../enums/UnitType';
import { AxisUnit } from '../enums/AxisUnit';
import { DEFAULT_FALLBACK_VALUES } from '../constants';
import { PositionValueCalculationStrategyRegistry } from '../strategies/value/PositionValueCalculationStrategyRegistry';
import { Logger } from '../../core/Logger';

/**
 * Refactored PositionUnitCalculator class
 * Uses Strategy Pattern instead of large switch statements
 * Implements position unit calculations for responsive positioning
 */
export class RefactoredPositionUnitCalculator implements IPositionUnit {
  public readonly id: string;
  public readonly name: string;
  public readonly unitType: UnitType = UnitType.POSITION;
  public readonly positionUnit: PositionUnit;
  public readonly axis: Dimension.X | Dimension.Y | Dimension.XY;
  public readonly baseValue: number | PositionValue;
  public readonly isActive: boolean = true;

  private alignment?: string;
  private offset: number = 0;
  private readonly strategyRegistry: PositionValueCalculationStrategyRegistry;
  private readonly logger = Logger.getInstance();

  constructor(
    id: string,
    name: string,
    positionUnit: PositionUnit,
    axis: Dimension.X | Dimension.Y | Dimension.XY,
    baseValue: number | PositionValue,
    strategyRegistry?: PositionValueCalculationStrategyRegistry
  ) {
    this.id = id;
    this.name = name;
    this.positionUnit = positionUnit;
    this.axis = axis;
    this.baseValue = baseValue;
    this.strategyRegistry = strategyRegistry || new PositionValueCalculationStrategyRegistry();
  }

  /**
   * Calculate the actual position value based on context
   */
  calculate(context: UnitContext): number {
    return this.calculatePosition(context);
  }

  /**
   * Calculate position based on context using Strategy Pattern
   */
  calculatePosition(context: UnitContext): number {
    // For numeric values, add offset directly
    if (typeof this.baseValue === 'number') {
      return this.baseValue + this.offset;
    }

    // Use Strategy Pattern to find and execute the appropriate strategy
    const strategy = this.strategyRegistry.getBestStrategy(
      this.baseValue,
      this.positionUnit,
      this.getAxisUnit()
    );

    if (strategy) {
      this.logger.debug('RefactoredPositionUnitCalculator', 'calculatePosition', 'Using strategy', {
        strategyId: strategy.strategyId,
        positionValue: this.baseValue,
        positionUnit: this.positionUnit,
        axisUnit: this.getAxisUnit(),
      });

      // Validate context before calculation
      if (!strategy.validateContext(context)) {
        this.logger.warn(
          'RefactoredPositionUnitCalculator',
          'calculatePosition',
          'Context validation failed',
          {
            strategyId: strategy.strategyId,
            positionValue: this.baseValue,
          }
        );
        return this.offset; // Default fallback
      }

      const result = strategy.calculate(
        this.baseValue,
        this.positionUnit,
        this.getAxisUnit(),
        context
      );
      return result + this.offset;
    }

    // Fallback to default if no strategy found
    this.logger.warn('RefactoredPositionUnitCalculator', 'calculatePosition', 'No strategy found', {
      positionValue: this.baseValue,
      positionUnit: this.positionUnit,
      axisUnit: this.getAxisUnit(),
    });

    return this.offset; // Default fallback
  }

  /**
   * Calculate X position specifically
   */
  calculateX(context: UnitContext): number {
    if (this.axis === Dimension.Y) {
      throw new Error('Cannot calculate X position for Y-only axis');
    }
    return this.calculatePosition(context);
  }

  /**
   * Calculate Y position specifically
   */
  calculateY(context: UnitContext): number {
    if (this.axis === Dimension.X) {
      throw new Error('Cannot calculate Y position for X-only axis');
    }
    return this.calculatePosition(context);
  }

  /**
   * Calculate both X and Y positions
   */
  calculateBoth(context: UnitContext): { x: number; y: number } {
    if (this.axis === Dimension.X) {
      return { x: this.calculatePosition(context), y: 0 };
    }
    if (this.axis === Dimension.Y) {
      return { x: 0, y: this.calculatePosition(context) };
    }

    // For XY axis, we need to calculate both
    const xPos = this.calculateX(context);
    const yPos = this.calculateY(context);
    return { x: xPos, y: yPos };
  }

  /**
   * Check if the unit is responsive
   */
  isResponsive(): boolean {
    return typeof this.baseValue !== 'number';
  }

  /**
   * Get alignment type
   */
  getAlignment(): string | undefined {
    return this.alignment;
  }

  /**
   * Set alignment
   */
  setAlignment(alignment: string): void {
    this.alignment = alignment;
  }

  /**
   * Get offset value
   */
  getOffset(): number {
    return this.offset;
  }

  /**
   * Set offset value
   */
  setOffset(offset: number): void {
    this.offset = offset;
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
      this.positionUnit,
      this.getAxisUnit()
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
    // Check if the positionUnit requires specific context
    if (
      this.positionUnit === PositionUnit.PARENT_LEFT ||
      this.positionUnit === PositionUnit.PARENT_RIGHT ||
      this.positionUnit === PositionUnit.PARENT_TOP ||
      this.positionUnit === PositionUnit.PARENT_BOTTOM ||
      this.positionUnit === PositionUnit.PARENT_CENTER_X ||
      this.positionUnit === PositionUnit.PARENT_CENTER_Y
    ) {
      return !!context.parent;
    }
    if (
      this.positionUnit === PositionUnit.SCENE_LEFT ||
      this.positionUnit === PositionUnit.SCENE_RIGHT ||
      this.positionUnit === PositionUnit.SCENE_TOP ||
      this.positionUnit === PositionUnit.SCENE_BOTTOM ||
      this.positionUnit === PositionUnit.SCENE_CENTER_X ||
      this.positionUnit === PositionUnit.SCENE_CENTER_Y
    ) {
      return !!context.scene;
    }
    if (
      this.positionUnit === PositionUnit.VIEWPORT_LEFT ||
      this.positionUnit === PositionUnit.VIEWPORT_RIGHT ||
      this.positionUnit === PositionUnit.VIEWPORT_TOP ||
      this.positionUnit === PositionUnit.VIEWPORT_BOTTOM
    ) {
      return !!context.viewport;
    }
    if (
      this.baseValue === PositionValue.CONTENT_LEFT ||
      this.baseValue === PositionValue.CONTENT_RIGHT ||
      this.baseValue === PositionValue.CONTENT_TOP ||
      this.baseValue === PositionValue.CONTENT_BOTTOM
    ) {
      return !!context.content;
    }
    return true;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `RefactoredPositionUnitCalculator(${this.name}, ${this.positionUnit}, ${this.axis})`;
  }

  /**
   * Clone the unit with optional modifications
   */
  clone(overrides?: Partial<IPositionUnit>): RefactoredPositionUnitCalculator {
    const cloned = new RefactoredPositionUnitCalculator(
      overrides?.id ?? this.id,
      overrides?.name ?? this.name,
      overrides?.positionUnit ?? this.positionUnit,
      overrides?.axis ?? this.axis,
      overrides?.baseValue ?? this.baseValue,
      this.strategyRegistry
    );

    if (this.alignment) cloned.setAlignment(this.alignment);
    cloned.setOffset(this.offset);
    return cloned;
  }

  /**
   * Get position information for debugging
   */
  getPositionInfo(): {
    axis: Dimension.X | Dimension.Y | Dimension.XY;
    alignment?: string;
    offset: number;
    isResponsive: boolean;
  } {
    return {
      axis: this.axis,
      alignment: this.alignment,
      offset: this.offset,
      isResponsive: this.isResponsive(),
    };
  }

  /**
   * Check if position is within bounds
   */
  isWithinBounds(position: number, context: UnitContext): boolean {
    if (this.axis === Dimension.X) {
      const maxX =
        context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
      return position >= 0 && position <= maxX;
    }
    if (this.axis === Dimension.Y) {
      const maxY =
        context.scene?.height ?? context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
      return position >= 0 && position <= maxY;
    }
    return true;
  }

  /**
   * Get the range of possible positions for this unit
   */
  getPositionRange(context: UnitContext): { min: number; max: number } {
    if (this.axis === Dimension.X) {
      return {
        min: 0,
        max: context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE,
      };
    }
    if (this.axis === Dimension.Y) {
      return {
        min: 0,
        max:
          context.scene?.height ?? context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE,
      };
    }
    return { min: 0, max: 0 };
  }

  /**
   * Get strategy registry for testing and debugging
   */
  getStrategyRegistry(): PositionValueCalculationStrategyRegistry {
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
   * Convert axis to AxisUnit for strategy compatibility
   */
  private getAxisUnit(): AxisUnit {
    if (this.axis === Dimension.X) {
      return AxisUnit.X;
    }
    if (this.axis === Dimension.Y) {
      return AxisUnit.Y;
    }
    return AxisUnit.X; // Default to X for XY axis
  }
}
