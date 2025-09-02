import type { ScaleValue } from '../../enums/ScaleValue';
import type { ScaleUnit } from '../../enums/ScaleUnit';

/**
 * Scale Strategy Input Interface
 * Focused interface for scale-related strategy inputs
 * Follows Interface Segregation Principle - only scale-specific methods
 */
export interface IScaleStrategyInput {
  /** Unique identifier for the strategy input */
  readonly id: string;

  /** Human-readable name for the strategy input */
  readonly name: string;

  /** Scale value */
  readonly value: number | ScaleValue;

  /** Scale unit */
  readonly unit: ScaleUnit;

  /** Whether the strategy input is valid */
  readonly isValid: boolean;

  /** Get the calculated scale value */
  getScaleValue(): number;

  /** Get the scale unit */
  getScaleUnit(): ScaleUnit;

  /** Validate the scale strategy input */
  validate(): boolean;

  /** Clone the scale strategy input */
  clone(): IScaleStrategyInput;
}

/**
 * Scale Strategy Input Factory
 * Creates scale strategy inputs with proper validation
 */
export interface IScaleStrategyInputFactory {
  /** Create a scale strategy input from a number */
  createFromNumber(value: number, unit: ScaleUnit): IScaleStrategyInput;

  /** Create a scale strategy input from a ScaleValue */
  createFromScaleValue(value: ScaleValue, unit: ScaleUnit): IScaleStrategyInput;

  /** Create a scale strategy input from a string */
  createFromString(value: string, unit: ScaleUnit): IScaleStrategyInput;

  /** Create a scale strategy input from an object */
  createFromObject(config: {
    id: string;
    name: string;
    value: number | ScaleValue | string;
    unit: ScaleUnit;
  }): IScaleStrategyInput;
}

/**
 * Scale Strategy Input Validator
 * Validates scale strategy inputs
 */
export interface IScaleStrategyInputValidator {
  /** Validate a scale strategy input */
  validate(input: IScaleStrategyInput): boolean;

  /** Get validation errors */
  getErrors(): string[];

  /** Clear validation errors */
  clearErrors(): void;

  /** Check if the input is a valid number */
  isValidNumber(value: unknown): value is number;

  /** Check if the input is a valid ScaleValue */
  isValidScaleValue(value: unknown): value is ScaleValue;

  /** Check if the input is a valid ScaleUnit */
  isValidScaleUnit(value: unknown): value is ScaleUnit;
}
