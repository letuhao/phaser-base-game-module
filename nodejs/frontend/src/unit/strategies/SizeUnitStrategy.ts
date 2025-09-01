import type { IUnitStrategy } from './IUnitStrategy';
import type { UnitContext } from '../interfaces/IUnit';
import type { IStrategyInput, ISizeStrategyInput } from '../interfaces/IStrategyInput';
import { SizeValue } from '../enums/SizeValue';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { UnitCalculatorFactory } from '../classes/UnitCalculatorFactory';
import { convertToStrategyInput } from '../interfaces/IStrategyInput';
import { DEFAULT_FALLBACK_VALUES, STRATEGY_PRIORITIES } from '../constants';

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
  calculate(input: IStrategyInput, context: UnitContext): number {
    // Handle null/undefined inputs
    if (input === null || input === undefined) {
      return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT; // Default fallback
    }
    
    // First, try to handle direct inputs that bypass conversion
    if (typeof input === 'number') {
      return input;
    }
    
    if (typeof input === 'string') {
      return this.calculateStringSize(input, context);
    }
    
    // Handle direct strategy input properties
    if ('sizeArray' in input && input.sizeArray) {
      return this.calculateSizeArray(input.sizeArray, context);
    }
    
    if ('sizeObject' in input && input.sizeObject) {
      return this.calculateSizeObject(input.sizeObject, context);
    }
    
    if ('sizeString' in input && input.sizeString) {
      return this.calculateStringSize(input.sizeString, context);
    }
    
    if ('randomValue' in input && input.randomValue) {
      return input.randomValue.getRandomValue();
    }
    
    if ('parentSize' in input && input.parentSize) {
      return this.calculateParentSize(input as ISizeStrategyInput, context);
    }
    
    // Convert legacy input to strategy input format
    const strategyInput = convertToStrategyInput(input);
    
    // Handle size strategy input specifically
    if ('value' in strategyInput && strategyInput.value !== undefined) {
      // Handle direct numbers
      if (typeof strategyInput.value === 'number') {
        return strategyInput.value;
      }

      // Handle string keywords
      if (typeof strategyInput.value === 'string') {
        return this.calculateStringSize(strategyInput.value, context);
      }

      // Handle SizeValue enum
      if (this.isSizeValue(strategyInput.value)) {
        return this.calculateSizeValue(strategyInput.value, context);
      }

      // Handle SizeUnit enum
      if (this.isSizeUnit(strategyInput.value)) {
        return this.calculateSizeUnit(strategyInput.value, context);
      }
    }

    // Default fallback
    return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  /**
   * Check if this strategy can handle the input
   */
  canHandle(input: IStrategyInput): boolean {
    // Handle null/undefined inputs
    if (input === null || input === undefined) {
      return false;
    }
    
    // Check direct inputs first
    if (typeof input === 'number' || typeof input === 'string') {
      return true;
    }
    
    // Check direct strategy input properties
    if (
      ('sizeArray' in input && input.sizeArray !== undefined) ||
      ('sizeObject' in input && input.sizeObject !== undefined) ||
      ('sizeString' in input && input.sizeString !== undefined) ||
      ('randomValue' in input && input.randomValue !== undefined) ||
      ('parentSize' in input && input.parentSize !== undefined)
    ) {
      return true;
    }
    
    // Convert legacy input to strategy input format
    const strategyInput = convertToStrategyInput(input);
    
    return (
      ('value' in strategyInput && strategyInput.value !== undefined) ||
      ('randomValue' in strategyInput && strategyInput.randomValue !== undefined) ||
      ('parentSize' in strategyInput && strategyInput.parentSize !== undefined) ||
      ('sizeArray' in strategyInput && strategyInput.sizeArray !== undefined) ||
      ('sizeObject' in strategyInput && strategyInput.sizeObject !== undefined) ||
      ('sizeString' in strategyInput && strategyInput.sizeString !== undefined)
    );
  }

  /**
   * Get strategy priority (lower = higher priority)
   */
  getPriority(): number {
    return STRATEGY_PRIORITIES.SIZE; // High priority for size calculations
  }

  /**
   * Calculate size from string keywords
   */
  private calculateStringSize(input: string, context: UnitContext): number {
    switch (input) {
      case 'fill':
        return context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
      case 'auto':
        return context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
      default:
        return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
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
      DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT
    );
    return calculator.calculateSize(context);
  }

  /**
   * Calculate size from parent size classes
   */
  private calculateParentSize(input: ISizeStrategyInput, context: UnitContext): number {
    if (context.parent && input.parentSize && typeof input.parentSize.getValue === 'function') {
      return input.parentSize.getValue(context.parent);
    }
    return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  /**
   * Type guards
   */
  private isSizeValue(input: unknown): input is SizeValue {
    return Object.values(SizeValue).includes(input as SizeValue);
  }

  private isSizeUnit(input: unknown): input is SizeUnit {
    return Object.values(SizeUnit).includes(input as SizeUnit);
  }



  /**
   * Calculate size from array input
   */
  private calculateSizeArray(input: unknown[], context: UnitContext): number {
    if (input.length === 0) return 0;
    
    // Handle pattern: ['size', 'parent-width', 0.5]
    if (input.length === 3 && input[0] === 'size') {
      const unitType = input[1];
      const multiplier = input[2];
      if (typeof multiplier === 'number') {
        const baseSize = this.calculate(unitType as IStrategyInput, context);
        return baseSize * multiplier;
      }
    }
    
    // Handle pattern: ['parent-width', 0.5]
    if (input.length === 2 && typeof input[1] === 'number') {
      const unitType = input[0];
      const multiplier = input[1];
      const baseSize = this.calculate(unitType as IStrategyInput, context);
      return baseSize * multiplier;
    }
    
    // Handle numeric arrays directly
    if (input.every(item => typeof item === 'number')) {
      const sum = input.reduce((acc, val) => acc + (val as number), 0);
      return sum / input.length;
    }
    
    // Default: calculate average of all values (convert each item properly)
    const results = input.map(item => {
      if (typeof item === 'number') {
        return item;
      }
      if (typeof item === 'string') {
        return this.calculateStringSize(item, context);
      }
      // For other types, try to convert and calculate
      return this.calculate(item as IStrategyInput, context);
    });
    return results.reduce((sum, val) => sum + val, 0) / results.length;
  }

  /**
   * Calculate size from object input
   */
  private calculateSizeObject(input: unknown, context: UnitContext): number {
    // Handle configuration objects
    if (
      typeof input === 'object' && 
      input !== null && 
      'sizeUnit' in input && 
      'baseValue' in input
    ) {
      const config = input as {
        sizeUnit: unknown;
        baseValue: unknown;
        id?: unknown;
        name?: unknown;
        dimension?: unknown;
        maintainAspectRatio?: unknown;
      };
      
      if (config.sizeUnit && config.baseValue) {
        const calculator = this.factory.createSizeUnit(
          (config.id as string) || 'dynamic',
          (config.name as string) || 'dynamic-size',
          config.sizeUnit as SizeUnit,
          (config.dimension as Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH) || Dimension.WIDTH,
          config.baseValue as number,
          (config.maintainAspectRatio as boolean) || false
        );
        return calculator.calculate(context);
      }
    }
    
    // Handle CSS-like objects
    if (
      typeof input === 'object' && 
      input !== null && 
      'value' in input
    ) {
      const cssInput = input as { value: unknown };
      if (cssInput.value !== undefined) {
        return this.calculate(cssInput.value as IStrategyInput, context);
      }
    }
    
    // Default fallback
    return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }



  /**
   * Get size strategy information
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
      supportedInputs: ['number', 'string', 'SizeValue', 'SizeUnit', 'array', 'object'],
      capabilities: [
        'direct numeric values',
        'string keywords',
        'enum values',
        'array expressions',
        'configuration objects',
        'CSS-like strings',
        'parent-relative sizing'
      ]
    };
  }
}
