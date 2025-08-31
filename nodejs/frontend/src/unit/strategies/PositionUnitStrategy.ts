import type { IUnitStrategy } from './IUnitStrategy';
import type { UnitContext } from '../interfaces/IUnit';
import { PositionValue } from '../enums/PositionValue';
import { PositionUnit } from '../enums/PositionUnit';
import { Dimension } from '../enums/Dimension';
import { UnitCalculatorFactory } from '../classes/UnitCalculatorFactory';

/**
 * Position Unit Strategy
 * Handles position-related calculations using the PositionUnitCalculator
 */
export class PositionUnitStrategy implements IUnitStrategy {
  readonly unitType = 'position';
  private readonly factory = UnitCalculatorFactory.getInstance();

  // String position mappings using enums
  private readonly STRING_POSITION_MAP = {
    [PositionValue.CENTER]: PositionValue.CENTER,
    [PositionValue.LEFT]: PositionValue.LEFT,
    [PositionValue.RIGHT]: PositionValue.RIGHT,
    [PositionValue.TOP]: PositionValue.TOP,
    [PositionValue.BOTTOM]: PositionValue.BOTTOM,
  } as const;

  /**
   * Calculate position value using the appropriate strategy
   */
  calculate(input: any, context: UnitContext): number {
    // Handle direct numbers
    if (typeof input === 'number') {
      return input;
    }

    // Handle string keywords
    if (typeof input === 'string') {
      return this.calculateStringPosition(input, context);
    }

    // Handle PositionValue enum
    if (this.isPositionValue(input)) {
      return this.calculatePositionValue(input, context);
    }

    // Handle PositionUnit enum
    if (this.isPositionUnit(input)) {
      return this.calculatePositionUnit(input, context);
    }

    // Handle random values
    if (this.isRandomValue(input)) {
      return input.getRandomValue();
    }

    // Handle legacy ParentPositionX/ParentPositionY
    if (this.isParentPosition(input)) {
      return this.calculateParentPosition(input, context);
    }

    // Default fallback
    return 0;
  }

  /**
   * Check if this strategy can handle the input
   */
  canHandle(input: any): boolean {
    return (
      typeof input === 'number' ||
      typeof input === 'string' ||
      this.isPositionValue(input) ||
      this.isPositionUnit(input) ||
      this.isRandomValue(input) ||
      this.isParentPosition(input)
    );
  }

  /**
   * Get strategy priority (lower = higher priority)
   */
  getPriority(): number {
    return 2; // High priority for position calculations
  }

  /**
   * Calculate position from string keywords using enum logic
   */
  private calculateStringPosition(input: string, context: UnitContext): number {
    // Map string to PositionValue enum
    const positionValue = this.mapStringToPositionValue(input);
    if (positionValue) {
      return this.calculatePositionValue(positionValue, context);
    }

    // Fallback for unknown strings
    return 0;
  }

  /**
   * Map string input to PositionValue enum
   */
  private mapStringToPositionValue(input: string): PositionValue | null {
    switch (input.toLowerCase()) {
      case 'center':
        return PositionValue.CENTER;
      case 'left':
        return PositionValue.LEFT;
      case 'right':
        return PositionValue.RIGHT;
      case 'top':
        return PositionValue.TOP;
      case 'bottom':
        return PositionValue.BOTTOM;
      default:
        return null;
    }
  }

  /**
   * Calculate position from PositionValue enum
   */
  private calculatePositionValue(input: PositionValue, context: UnitContext): number {
    // Use enum-based logic for calculations
    switch (input) {
      case PositionValue.CENTER:
        return this.calculateCenterPosition(context);
      case PositionValue.LEFT:
        return this.calculateLeftPosition(context);
      case PositionValue.RIGHT:
        return this.calculateRightPosition(context);
      case PositionValue.TOP:
        return this.calculateTopPosition(context);
      case PositionValue.BOTTOM:
        return this.calculateBottomPosition(context);
      default:
        return this.calculateWithCalculator(input, context);
    }
  }

  /**
   * Calculate position from PositionUnit enum
   */
  private calculatePositionUnit(input: PositionUnit, context: UnitContext): number {
    const calculator = this.factory.createPositionUnit(
      'dynamic',
      'dynamic-position',
      input,
      Dimension.X,
      0
    );
    return calculator.calculatePosition(context);
  }

  /**
   * Calculate position from parent position classes
   */
  private calculateParentPosition(input: any, context: UnitContext): number {
    if (context.parent && typeof input.getValue === 'function') {
      return input.getValue(context.parent);
    }
    return 0;
  }

  /**
   * Enum-based position calculations
   */
  private calculateCenterPosition(context: UnitContext): number {
    const dimension = this.getDimensionFromContext(context);
    if (dimension === Dimension.X) {
      return (context.scene?.width ?? context.viewport?.width ?? 800) / 2;
    } else if (dimension === Dimension.Y) {
      return (context.scene?.height ?? context.viewport?.height ?? 600) / 2;
    }
    return 0;
  }

  private calculateLeftPosition(context: UnitContext): number {
    return 0;
  }

  private calculateRightPosition(context: UnitContext): number {
    return context.scene?.width ?? context.viewport?.width ?? 800;
  }

  private calculateTopPosition(context: UnitContext): number {
    return 0;
  }

  private calculateBottomPosition(context: UnitContext): number {
    return context.scene?.height ?? context.viewport?.height ?? 600;
  }

  /**
   * Calculate using calculator for complex cases
   */
  private calculateWithCalculator(input: PositionValue, context: UnitContext): number {
    const calculator = this.factory.createPositionUnit(
      'dynamic',
      'dynamic-position',
      PositionUnit.PIXEL,
      this.getDimensionFromContext(context),
      input
    );
    return calculator.calculatePosition(context);
  }

  /**
   * Get dimension from context or default to X
   */
  private getDimensionFromContext(context: UnitContext): Dimension.X | Dimension.Y | Dimension.XY {
    return context.dimension || Dimension.X;
  }

  /**
   * Type guards
   */
  private isPositionValue(input: any): input is PositionValue {
    return Object.values(PositionValue).includes(input);
  }

  private isPositionUnit(input: any): input is PositionUnit {
    return Object.values(PositionUnit).includes(input);
  }

  private isRandomValue(input: any): input is { getRandomValue(): number } {
    return input && typeof input.getRandomValue === 'function';
  }

  private isParentPosition(input: any): input is { getValue(parent: any): number } {
    return input && typeof input.getValue === 'function';
  }
}
