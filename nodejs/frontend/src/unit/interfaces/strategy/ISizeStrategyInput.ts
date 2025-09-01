import type { SizeValue } from '../../enums/SizeValue';
import type { SizeUnit } from '../../enums/SizeUnit';
import { Dimension } from '../../enums/Dimension';

/**
 * Size Strategy Input Interface
 * Focused interface for size-related strategy inputs
 * Follows Interface Segregation Principle - only size-specific methods
 */
export interface ISizeStrategyInput {
  /** Unique identifier for the strategy input */
  readonly id: string;
  
  /** Human-readable name for the strategy input */
  readonly name: string;
  
  /** Size value */
  readonly value: number | SizeValue;
  
  /** Size dimension */
  readonly dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH;
  
  /** Size unit */
  readonly unit: SizeUnit;
  
  /** Whether the strategy input is valid */
  readonly isValid: boolean;
  
  /** Get the calculated size value */
  getSizeValue(): number;
  
  /** Get the size unit */
  getSizeUnit(): SizeUnit;
  
  /** Get the size dimension */
  getDimension(): Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH;
  
  /** Validate the size strategy input */
  validate(): boolean;
  
  /** Clone the size strategy input */
  clone(): ISizeStrategyInput;
}

/**
 * Size Strategy Input Factory
 * Creates size strategy inputs with proper validation
 */
export interface ISizeStrategyInputFactory {
  /** Create a size strategy input from a number */
  createFromNumber(value: number, unit: SizeUnit, dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH): ISizeStrategyInput;
  
  /** Create a size strategy input from a SizeValue */
  createFromSizeValue(value: SizeValue, unit: SizeUnit, dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH): ISizeStrategyInput;
  
  /** Create a size strategy input from a string */
  createFromString(value: string, unit: SizeUnit, dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH): ISizeStrategyInput;
  
  /** Create a size strategy input from an object */
  createFromObject(config: {
    id: string;
    name: string;
    value: number | SizeValue | string;
    unit: SizeUnit;
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH;
  }): ISizeStrategyInput;
}

/**
 * Size Strategy Input Validator
 * Validates size strategy inputs
 */
export interface ISizeStrategyInputValidator {
  /** Validate a size strategy input */
  validate(input: ISizeStrategyInput): boolean;
  
  /** Get validation errors */
  getErrors(): string[];
  
  /** Clear validation errors */
  clearErrors(): void;
  
  /** Check if the input is a valid number */
  isValidNumber(value: unknown): value is number;
  
  /** Check if the input is a valid SizeValue */
  isValidSizeValue(value: unknown): value is SizeValue;
  
  /** Check if the input is a valid SizeUnit */
  isValidSizeUnit(value: unknown): value is SizeUnit;
}
