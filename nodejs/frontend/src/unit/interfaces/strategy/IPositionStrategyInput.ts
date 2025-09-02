import type { PositionValue } from '../../enums/PositionValue';
import type { PositionUnit } from '../../enums/PositionUnit';
import { Dimension } from '../../enums/Dimension';

/**
 * Position Strategy Input Interface
 * Focused interface for position-related strategy inputs
 * Follows Interface Segregation Principle - only position-specific methods
 */
export interface IPositionStrategyInput {
  /** Unique identifier for the strategy input */
  readonly id: string;

  /** Human-readable name for the strategy input */
  readonly name: string;

  /** Position value */
  readonly value: number | PositionValue;

  /** Position axis */
  readonly axis: Dimension.X | Dimension.Y | Dimension.XY;

  /** Position unit */
  readonly unit: PositionUnit;

  /** Whether the strategy input is valid */
  readonly isValid: boolean;

  /** Get the calculated position value */
  getPositionValue(): number;

  /** Get the position unit */
  getPositionUnit(): PositionUnit;

  /** Get the position axis */
  getAxis(): Dimension.X | Dimension.Y | Dimension.XY;

  /** Validate the position strategy input */
  validate(): boolean;

  /** Clone the position strategy input */
  clone(): IPositionStrategyInput;
}

/**
 * Position Strategy Input Factory
 * Creates position strategy inputs with proper validation
 */
export interface IPositionStrategyInputFactory {
  /** Create a position strategy input from a number */
  createFromNumber(
    value: number,
    unit: PositionUnit,
    axis: Dimension.X | Dimension.Y | Dimension.XY
  ): IPositionStrategyInput;

  /** Create a position strategy input from a PositionValue */
  createFromPositionValue(
    value: PositionValue,
    unit: PositionUnit,
    axis: Dimension.X | Dimension.Y | Dimension.XY
  ): IPositionStrategyInput;

  /** Create a position strategy input from a string */
  createFromString(
    value: string,
    unit: PositionUnit,
    axis: Dimension.X | Dimension.Y | Dimension.XY
  ): IPositionStrategyInput;

  /** Create a position strategy input from an object */
  createFromObject(config: {
    id: string;
    name: string;
    value: number | PositionValue | string;
    unit: PositionUnit;
    axis: Dimension.X | Dimension.Y | Dimension.XY;
  }): IPositionStrategyInput;
}

/**
 * Position Strategy Input Validator
 * Validates position strategy inputs
 */
export interface IPositionStrategyInputValidator {
  /** Validate a position strategy input */
  validate(input: IPositionStrategyInput): boolean;

  /** Get validation errors */
  getErrors(): string[];

  /** Clear validation errors */
  clearErrors(): void;

  /** Check if the input is a valid number */
  isValidNumber(value: unknown): value is number;

  /** Check if the input is a valid PositionValue */
  isValidPositionValue(value: unknown): value is PositionValue;

  /** Check if the input is a valid PositionUnit */
  isValidPositionUnit(value: unknown): value is PositionUnit;
}
