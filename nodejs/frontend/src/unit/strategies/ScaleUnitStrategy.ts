import type { IUnitStrategy } from './IUnitStrategy';
import type { UnitContext } from '../interfaces/IUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { ScaleUnit } from '../enums/ScaleUnit';
import { Dimension } from '../enums/Dimension';
import { UnitCalculatorFactory } from '../classes/UnitCalculatorFactory';

/**
 * Scale Unit Strategy
 * Handles scale-related calculations using the ScaleUnitCalculator
 */
export class ScaleUnitStrategy implements IUnitStrategy {
  readonly unitType = 'scale';
  private readonly factory = UnitCalculatorFactory.getInstance();

  // Scale value mappings using enums
  private readonly SCALE_VALUE_MAP = {
    [ScaleValue.FACTOR]: 1,
    [ScaleValue.FIT]: 0.5,
    [ScaleValue.STRETCH]: 2,
    [ScaleValue.FILL]: 1,
    [ScaleValue.MAINTAIN_ASPECT]: 1,
    [ScaleValue.IGNORE_ASPECT]: 1,
  } as const;

  /**
   * Calculate scale value using the appropriate strategy
   */
  calculate(input: any, context: UnitContext): number {
    // Handle direct numbers
    if (typeof input === 'number') {
      return input;
    }

    // Handle string keywords
    if (typeof input === 'string') {
      return this.calculateStringScale(input, context);
    }

    // Handle ScaleValue enum
    if (this.isScaleValue(input)) {
      return this.calculateScaleValue(input, context);
    }

    // Handle ScaleUnit enum
    if (this.isScaleUnit(input)) {
      return this.calculateScaleUnit(input, context);
    }

    // Handle random values
    if (this.isRandomValue(input)) {
      return input.getRandomValue();
    }

    // Handle legacy parent scale classes
    if (this.isParentScale(input)) {
      return this.calculateParentScale(input, context);
    }

    // Default fallback
    return 1;
  }

  /**
   * Check if this strategy can handle the input
   */
  canHandle(input: any): boolean {
    return (
      typeof input === 'number' ||
      typeof input === 'string' ||
      this.isScaleValue(input) ||
      this.isScaleUnit(input) ||
      this.isRandomValue(input) ||
      this.isParentScale(input)
    );
  }

  /**
   * Get strategy priority (lower = higher priority)
   */
  getPriority(): number {
    return 3; // Medium priority for scale calculations
  }

  /**
   * Calculate scale from string keywords using enum logic
   */
  private calculateStringScale(input: string, context: UnitContext): number {
    // Map string to ScaleValue enum
    const scaleValue = this.mapStringToScaleValue(input);
    if (scaleValue) {
      return this.calculateScaleValue(scaleValue, context);
    }

    // Handle special scale keywords
    switch (input.toLowerCase()) {
      case 'fit':
        return this.calculateFitScale(context);
      case 'fill':
        return this.calculateFillScale(context);
      default:
        return 1;
    }
  }

  /**
   * Map string input to ScaleValue enum
   */
  private mapStringToScaleValue(input: string): ScaleValue | null {
    switch (input.toLowerCase()) {
      case 'normal':
      case 'factor':
        return ScaleValue.FACTOR;
      case 'small':
        return ScaleValue.FIT;
      case 'large':
        return ScaleValue.STRETCH;
      case 'tiny':
        return ScaleValue.MAINTAIN_ASPECT;
      case 'huge':
        return ScaleValue.IGNORE_ASPECT;
      default:
        return null;
    }
  }

  /**
   * Calculate scale from ScaleValue enum
   */
  private calculateScaleValue(input: ScaleValue, context: UnitContext): number {
    // Use enum-based logic for calculations
    switch (input) {
      case ScaleValue.FACTOR:
        return this.SCALE_VALUE_MAP[ScaleValue.FACTOR];
      case ScaleValue.FIT:
        return this.calculateFitScale(context);
      case ScaleValue.STRETCH:
        return this.SCALE_VALUE_MAP[ScaleValue.STRETCH];
      case ScaleValue.FILL:
        return this.calculateFillScale(context);
      case ScaleValue.MAINTAIN_ASPECT:
        return this.SCALE_VALUE_MAP[ScaleValue.MAINTAIN_ASPECT];
      case ScaleValue.IGNORE_ASPECT:
        return this.SCALE_VALUE_MAP[ScaleValue.IGNORE_ASPECT];
      default:
        return this.calculateWithCalculator(input, context);
    }
  }

  /**
   * Calculate scale from ScaleUnit enum
   */
  private calculateScaleUnit(input: ScaleUnit, context: UnitContext): number {
    const calculator = this.factory.createScaleUnit('dynamic', 'dynamic-scale', input, 1);
    return calculator.calculateScale(context);
  }

  /**
   * Calculate scale from parent scale classes
   */
  private calculateParentScale(input: any, context: UnitContext): number {
    if (context.parent && typeof input.getValue === 'function') {
      return input.getValue(context.parent);
    }
    return 1;
  }

  /**
   * Calculate fit scale based on context
   */
  private calculateFitScale(context: UnitContext): number {
    if (!context.parent) return 1;

    const parentWidth = context.parent.width || 100;
    const parentHeight = context.parent.height || 100;
    const contentWidth = context.content?.width || 100;
    const contentHeight = context.content?.height || 100;

    const scaleX = parentWidth / contentWidth;
    const scaleY = parentHeight / contentHeight;

    return Math.min(scaleX, scaleY);
  }

  /**
   * Calculate fill scale based on context
   */
  private calculateFillScale(context: UnitContext): number {
    if (!context.parent) return 1;

    const parentWidth = context.parent.width || 100;
    const parentHeight = context.parent.height || 100;
    const contentWidth = context.content?.width || 100;
    const contentHeight = context.content?.height || 100;

    const scaleX = parentWidth / contentWidth;
    const scaleY = parentHeight / contentHeight;

    return Math.max(scaleX, scaleY);
  }

  /**
   * Calculate using calculator for complex cases
   */
  private calculateWithCalculator(input: ScaleValue, context: UnitContext): number {
    const calculator = this.factory.createScaleUnit(
      'dynamic',
      'dynamic-scale',
      ScaleUnit.FACTOR,
      input
    );
    return calculator.calculateScale(context);
  }

  /**
   * Type guards
   */
  private isScaleValue(input: any): input is ScaleValue {
    return Object.values(ScaleValue).includes(input);
  }

  private isScaleUnit(input: any): input is ScaleUnit {
    return Object.values(ScaleUnit).includes(input);
  }

  private isRandomValue(input: any): input is { getRandomValue(): number } {
    return input && typeof input.getRandomValue === 'function';
  }

  private isParentScale(input: any): input is { getValue(parent: any): number } {
    return input && typeof input.getValue === 'function';
  }
}
