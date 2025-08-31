import type { IUnitStrategy } from './IUnitStrategy';
import type { UnitContext } from '../interfaces/IUnit';
import { SizeValue } from '../enums/SizeValue';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { UnitCalculatorFactory } from '../classes/UnitCalculatorFactory';

/**
 * Size Unit Strategy
 * Handles size-related calculations using the SizeUnitCalculator
 */
export class SizeUnitStrategy implements IUnitStrategy {
  readonly unitType = 'size';
  private readonly factory = UnitCalculatorFactory.getInstance();

  /**
   * Calculate size value using the appropriate strategy
   */
  calculate(input: any, context: UnitContext): number {
    // Handle direct numbers
    if (typeof input === 'number') {
      return input;
    }

    // Handle string keywords
    if (typeof input === 'string') {
      return this.calculateStringSize(input, context);
    }

    // Handle SizeValue enum
    if (this.isSizeValue(input)) {
      return this.calculateSizeValue(input, context);
    }

    // Handle SizeUnit enum
    if (this.isSizeUnit(input)) {
      return this.calculateSizeUnit(input, context);
    }

    // Handle random values
    if (this.isRandomValue(input)) {
      return input.getRandomValue();
    }

    // Handle legacy ParentWidth/ParentHeight
    if (this.isParentSize(input)) {
      return this.calculateParentSize(input, context);
    }

    // Default fallback
    return 100;
  }

  /**
   * Check if this strategy can handle the input
   */
  canHandle(input: any): boolean {
    return (
      typeof input === 'number' ||
      typeof input === 'string' ||
      this.isSizeValue(input) ||
      this.isSizeUnit(input) ||
      this.isRandomValue(input) ||
      this.isParentSize(input)
    );
  }

  /**
   * Get strategy priority (lower = higher priority)
   */
  getPriority(): number {
    return 1; // High priority for size calculations
  }

  /**
   * Calculate size from string keywords
   */
  private calculateStringSize(input: string, context: UnitContext): number {
    switch (input) {
      case 'fill':
        return context.scene?.width ?? context.viewport?.width ?? 800;
      case 'auto':
        return context.content?.width ?? 100;
      default:
        return 100;
    }
  }

  /**
   * Calculate size from SizeValue enum
   */
  private calculateSizeValue(input: SizeValue, context: UnitContext): number {
    const calculator = this.factory.createSizeUnit(
      'dynamic',
      'dynamic-size',
      SizeUnit.PIXEL,
      Dimension.WIDTH,
      input
    );
    return calculator.calculateSize(context);
  }

  /**
   * Calculate size from SizeUnit enum
   */
  private calculateSizeUnit(input: SizeUnit, context: UnitContext): number {
    const calculator = this.factory.createSizeUnit(
      'dynamic',
      'dynamic-size',
      input,
      Dimension.WIDTH,
      100
    );
    return calculator.calculateSize(context);
  }

  /**
   * Calculate size from parent size classes
   */
  private calculateParentSize(input: any, context: UnitContext): number {
    if (context.parent && typeof input.getValue === 'function') {
      return input.getValue(context.parent);
    }
    return 100;
  }

  /**
   * Type guards
   */
  private isSizeValue(input: any): input is SizeValue {
    return Object.values(SizeValue).includes(input);
  }

  private isSizeUnit(input: any): input is SizeUnit {
    return Object.values(SizeUnit).includes(input);
  }

  private isRandomValue(input: any): input is { getRandomValue(): number } {
    return input && typeof input.getRandomValue === 'function';
  }

  private isParentSize(input: any): input is { getValue(parent: any): number } {
    return input && typeof input.getValue === 'function';
  }
}
