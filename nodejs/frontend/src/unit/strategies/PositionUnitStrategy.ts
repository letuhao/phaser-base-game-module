import type { IUnitStrategy } from './IUnitStrategy';
import type { UnitContext } from '../interfaces/IUnit';
import type { IStrategyInput, IPositionStrategyInput } from '../interfaces/IStrategyInput';
import { PositionValue } from '../enums/PositionValue';
import { PositionUnit } from '../enums/PositionUnit';
import { Dimension } from '../enums/Dimension';
import { UnitCalculatorFactory } from '../classes/UnitCalculatorFactory';
import { convertToStrategyInput } from '../interfaces/IStrategyInput';
import { DEFAULT_FALLBACK_VALUES, STRATEGY_PRIORITIES } from '../constants';

/**
 * Position Unit Strategy
 * Handles position-related calculations using the PositionUnitCalculator
 */
export class PositionUnitStrategy implements IUnitStrategy {
  readonly unitType = 'position';
  private readonly factory = UnitCalculatorFactory.getInstance();

  /**
   * Calculate position value using the appropriate strategy
   */
  calculate(input: IStrategyInput, context: UnitContext): number {
    // Convert legacy input to strategy input format
    const strategyInput = convertToStrategyInput(input);

    // Handle position strategy input specifically
    if ('value' in strategyInput && strategyInput.value !== undefined) {
      // Handle direct numbers
      if (typeof strategyInput.value === 'number') {
        return strategyInput.value;
      }

      // Handle string keywords
      if (typeof strategyInput.value === 'string') {
        return this.calculateStringPosition(strategyInput.value, context);
      }

      // Handle PositionValue enum
      if (this.isPositionValue(strategyInput.value)) {
        return this.calculatePositionValue(strategyInput.value, context);
      }

      // Handle PositionUnit enum
      if (this.isPositionUnit(strategyInput.value)) {
        return this.calculatePositionUnit(strategyInput.value, context);
      }
    }

    // Handle random values
    if ('randomValue' in strategyInput && strategyInput.randomValue) {
      return strategyInput.randomValue.getRandomValue();
    }

    // Handle legacy ParentPositionX/ParentPositionY
    if ('parentPosition' in strategyInput && strategyInput.parentPosition) {
      return this.calculateParentPosition(strategyInput as IPositionStrategyInput, context);
    }

    // Handle position arrays
    if ('positionArray' in strategyInput && strategyInput.positionArray) {
      return this.calculatePositionArray(strategyInput.positionArray, context);
    }

    // Handle position objects
    if ('positionObject' in strategyInput && strategyInput.positionObject) {
      return this.calculatePositionObject(strategyInput.positionObject, context);
    }

    // Handle position strings
    if ('positionString' in strategyInput && strategyInput.positionString) {
      return this.calculateStringPosition(strategyInput.positionString, context);
    }

    // Default fallback
    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  /**
   * Check if this strategy can handle the input
   */
  canHandle(input: IStrategyInput): boolean {
    // Convert legacy input to strategy input format
    const strategyInput = convertToStrategyInput(input);

    return (
      ('value' in strategyInput && strategyInput.value !== undefined) ||
      ('randomValue' in strategyInput && strategyInput.randomValue !== undefined) ||
      ('parentPosition' in strategyInput && strategyInput.parentPosition !== undefined) ||
      ('positionArray' in strategyInput && strategyInput.positionArray !== undefined) ||
      ('positionObject' in strategyInput && strategyInput.positionObject !== undefined) ||
      ('positionString' in strategyInput && strategyInput.positionString !== undefined)
    );
  }

  /**
   * Get strategy priority (lower = higher priority)
   */
  getPriority(): number {
    return STRATEGY_PRIORITIES.POSITION; // High priority for position calculations
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
  private calculateParentPosition(input: IPositionStrategyInput, context: UnitContext): number {
    if (
      context.parent &&
      input.parentPosition &&
      typeof input.parentPosition.getValue === 'function'
    ) {
      return input.parentPosition.getValue(context.parent);
    }
    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  /**
   * Enum-based position calculations
   */
  private calculateCenterPosition(context: UnitContext): number {
    const dimension = this.getDimensionFromContext(context);
    if (dimension === Dimension.X) {
      return (
        (context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE) / 2
      );
    } else if (dimension === Dimension.Y) {
      return (
        (context.scene?.height ?? context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE) /
        2
      );
    }
    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  private calculateLeftPosition(_context: UnitContext): number {
    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  private calculateRightPosition(context: UnitContext): number {
    return context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
  }

  private calculateTopPosition(_context: UnitContext): number {
    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  private calculateBottomPosition(_context: UnitContext): number {
    return (
      _context.scene?.height ?? _context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE
    );
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
    // Check if context has a valid dimension property
    if (
      context.dimension &&
      (context.dimension === Dimension.X ||
        context.dimension === Dimension.Y ||
        context.dimension === Dimension.XY)
    ) {
      return context.dimension;
    }
    return Dimension.X;
  }

  /**
   * Type guards
   */
  private isPositionValue(input: unknown): input is PositionValue {
    return Object.values(PositionValue).includes(input as PositionValue);
  }

  private isPositionUnit(input: unknown): input is PositionUnit {
    return Object.values(PositionUnit).includes(input as PositionUnit);
  }

  /**
   * Calculate position from array input
   */
  private calculatePositionArray(input: unknown[], context: UnitContext): number {
    if (input.length === 0) return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;

    // Handle pattern: ['position', 'center', 10] (position type, alignment, offset)
    if (input.length === 3 && input[0] === 'position') {
      const alignment = input[1];
      const offset = input[2];
      const basePosition = this.calculate(alignment as IStrategyInput, context);
      return basePosition + (typeof offset === 'number' ? offset : 0);
    }

    // Handle pattern: ['center', 10] (alignment, offset)
    if (input.length === 2 && typeof input[1] === 'number') {
      const alignment = input[0];
      const offset = input[1];
      const basePosition = this.calculate(alignment as IStrategyInput, context);
      return basePosition + offset;
    }

    // Default: calculate average of all values
    const results = input.map(item => this.calculate(item as IStrategyInput, context));
    return results.reduce((sum, val) => sum + val, 0) / results.length;
  }

  /**
   * Calculate position from object input
   */
  private calculatePositionObject(input: unknown, context: UnitContext): number {
    // Handle configuration objects
    if (
      typeof input === 'object' &&
      input !== null &&
      'positionUnit' in input &&
      'baseValue' in input
    ) {
      const config = input as {
        positionUnit: unknown;
        baseValue: unknown;
        id?: unknown;
        name?: unknown;
        axis?: unknown;
        alignment?: unknown;
        offset?: unknown;
      };

      if (config.positionUnit && config.baseValue) {
        const calculator = this.factory.createPositionUnit(
          (config.id as string) || 'dynamic',
          (config.name as string) || 'dynamic-position',
          config.positionUnit as PositionUnit,
          this.getDimensionFromContext(context),
          config.baseValue as number
        );

        if (config.alignment) calculator.setAlignment(config.alignment as string);
        if (config.offset !== undefined) calculator.setOffset(config.offset as number);

        return calculator.calculate(context);
      }
    }

    // Handle CSS-like objects
    if (typeof input === 'object' && input !== null && 'value' in input) {
      const cssInput = input as { value: unknown };
      if (cssInput.value !== undefined) {
        return this.calculate(cssInput.value as IStrategyInput, context);
      }
    }

    // Default fallback
    return 0;
  }

  /**
   * Get position strategy information
   */
  getStrategyInfo(): {
    unitType: string;
    priority: number;
    supportedInputs: string[];
    capabilities: string[];
  } {
    return {
      unitType: this.unitType,
      priority: this.getPriority(),
      supportedInputs: ['number', 'string', 'PositionValue', 'PositionUnit', 'array', 'object'],
      capabilities: [
        'direct numeric values',
        'string keywords',
        'enum values',
        'array expressions',
        'configuration objects',
        'CSS-like strings',
        'parent-relative positioning',
        'alignment with offsets',
      ],
    };
  }
}
