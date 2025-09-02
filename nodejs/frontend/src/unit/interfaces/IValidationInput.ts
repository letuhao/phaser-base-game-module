import type { IUnit } from './IUnit';
import type { UnitType } from '../enums/UnitType';
import { Dimension } from '../enums/Dimension';
import { SizeUnit } from '../enums/SizeUnit';
import { SizeValue } from '../enums/SizeValue';
import { PositionUnit } from '../enums/PositionUnit';
import { PositionValue } from '../enums/PositionValue';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { ValidationType } from '../enums/ValidationType';

/**
 * Base validation input interface
 * Provides common properties that all validation inputs should have
 */
export interface IBaseValidationInput {
  /** Unique identifier for the input */
  id?: string;

  /** Whether the input is valid */
  isValid?: boolean;

  /** Custom metadata for the input */
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Unit validation input interface
 * For inputs that represent unit objects
 */
export interface IUnitValidationInput extends IBaseValidationInput {
  /** The unit object to validate */
  unit: IUnit;

  /** Unit type for validation */
  unitType: UnitType;

  /** Dimension to apply validation to */
  dimension?: Dimension;

  /** Whether to validate recursively */
  validateRecursively?: boolean;
}

/**
 * Value validation input interface
 * For inputs that represent numeric values
 */
export interface IValueValidationInput extends IBaseValidationInput {
  /** The numeric value to validate */
  value: number;

  /** Unit type context for validation */
  unitType?: UnitType;

  /** Dimension context for validation */
  dimension?: Dimension;

  /** Whether the value is required */
  required?: boolean;
}

/**
 * Size validation input interface
 * For inputs that represent size-related values
 */
export interface ISizeValidationInput extends IBaseValidationInput {
  /** Size unit type */
  unit: SizeUnit;

  /** Size value */
  value: number | SizeValue;

  /** Dimension to apply the size to */
  dimension?: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH;

  /** Whether to maintain aspect ratio */
  maintainAspectRatio?: boolean;

  /** Minimum size constraint */
  minSize?: number;

  /** Maximum size constraint */
  maxSize?: number;
}

/**
 * Position validation input interface
 * For inputs that represent position-related values
 */
export interface IPositionValidationInput extends IBaseValidationInput {
  /** Position unit type */
  unit: PositionUnit;

  /** Position value */
  value: number | PositionValue;

  /** Axis to apply the position to */
  axis?: Dimension.X | Dimension.Y | Dimension.XY;

  /** Offset from calculated position */
  offset?: number;

  /** Whether to respect parent bounds */
  respectBounds?: boolean;
}

/**
 * Scale validation input interface
 * For inputs that represent scale-related values
 */
export interface IScaleValidationInput extends IBaseValidationInput {
  /** Scale unit type */
  unit: ScaleUnit;

  /** Scale value */
  value: number | ScaleValue;

  /** Whether to maintain aspect ratio */
  maintainAspectRatio?: boolean;

  /** Minimum scale constraint */
  minScale?: number;

  /** Maximum scale constraint */
  maxScale?: number;
}

/**
 * Mixed validation input interface
 * For inputs that represent multiple validation types
 */
export interface IMixedValidationInput extends IBaseValidationInput {
  /** Size validation input */
  size?: ISizeValidationInput;

  /** Position validation input */
  position?: IPositionValidationInput;

  /** Scale validation input */
  scale?: IScaleValidationInput;

  /** Whether to validate all components */
  validateAll?: boolean;
}

/**
 * Legacy validation input interface
 * For backward compatibility with old input types
 */
export interface ILegacyValidationInput extends IBaseValidationInput {
  /** The legacy input object */
  input: unknown;

  /** Expected input type for validation */
  expectedType: ValidationType;

  /** Whether to perform strict type checking */
  strictTypeChecking?: boolean;
}

/**
 * Union type for all validation inputs
 * Used in validation methods to accept any valid input type
 */
export type IValidationInput =
  | IUnitValidationInput
  | IValueValidationInput
  | ISizeValidationInput
  | IPositionValidationInput
  | IScaleValidationInput
  | IMixedValidationInput
  | ILegacyValidationInput;

/**
 * Type guard to check if input is for unit validation
 */
export function isUnitValidationInput(input: IValidationInput): input is IUnitValidationInput {
  return 'unit' in input && 'unitType' in input;
}

/**
 * Type guard to check if input is for value validation
 */
export function isValueValidationInput(input: IValidationInput): input is IValueValidationInput {
  return 'value' in input && typeof input.value === 'number';
}

/**
 * Type guard to check if input is for size validation
 */
export function isSizeValidationInput(input: IValidationInput): input is ISizeValidationInput {
  return 'unit' in input && 'value' in input && 'dimension' in input;
}

/**
 * Type guard to check if input is for position validation
 */
export function isPositionValidationInput(
  input: IValidationInput
): input is IPositionValidationInput {
  return 'unit' in input && 'value' in input && 'axis' in input;
}

/**
 * Type guard to check if input is for scale validation
 */
export function isScaleValidationInput(input: IValidationInput): input is IScaleValidationInput {
  return 'unit' in input && 'value' in input && 'minScale' in input;
}

/**
 * Type guard to check if input is for mixed validation
 */
export function isMixedValidationInput(input: IValidationInput): input is IMixedValidationInput {
  return 'size' in input || 'position' in input || 'scale' in input;
}

/**
 * Type guard to check if input is for legacy validation
 */
export function isLegacyValidationInput(input: IValidationInput): input is ILegacyValidationInput {
  return 'input' in input && 'expectedType' in input;
}

/**
 * Type guard to check if input is a valid validation input
 */
export function isValidValidationInput(input: unknown): input is IValidationInput {
  if (!input || typeof input !== 'object') return false;

  const validationInput = input as IValidationInput;
  return (
    'id' in validationInput ||
    'isValid' in validationInput ||
    'metadata' in validationInput ||
    'unit' in validationInput ||
    'value' in validationInput ||
    'input' in validationInput
  );
}

/**
 * Factory function to create unit validation input
 */
export function createUnitValidationInput(
  unit: IUnit,
  unitType: UnitType,
  options?: Partial<Omit<IUnitValidationInput, 'unit' | 'unitType'>>
): IUnitValidationInput {
  return {
    unit,
    unitType,
    dimension: options?.dimension,
    validateRecursively: options?.validateRecursively || false,
    id: options?.id,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create value validation input
 */
export function createValueValidationInput(
  value: number,
  options?: Partial<Omit<IValueValidationInput, 'value'>>
): IValueValidationInput {
  return {
    value,
    unitType: options?.unitType,
    dimension: options?.dimension,
    required: options?.required ?? true,
    id: options?.id,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create size validation input
 */
export function createSizeValidationInput(
  unit: SizeUnit,
  value: number | SizeValue,
  options?: Partial<Omit<ISizeValidationInput, 'unit' | 'value'>>
): ISizeValidationInput {
  return {
    unit,
    value,
    dimension: options?.dimension || Dimension.WIDTH,
    maintainAspectRatio: options?.maintainAspectRatio || false,
    minSize: options?.minSize,
    maxSize: options?.maxSize,
    id: options?.id,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create position validation input
 */
export function createPositionValidationInput(
  unit: PositionUnit,
  value: number | PositionValue,
  options?: Partial<Omit<IPositionValidationInput, 'unit' | 'value'>>
): IPositionValidationInput {
  return {
    unit,
    value,
    axis: options?.axis || Dimension.X,
    offset: options?.offset || 0,
    respectBounds: options?.respectBounds ?? true,
    id: options?.id,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create scale validation input
 */
export function createScaleValidationInput(
  unit: ScaleUnit,
  value: number | ScaleValue,
  options?: Partial<Omit<IScaleValidationInput, 'unit' | 'value'>>
): IScaleValidationInput {
  return {
    unit,
    value,
    maintainAspectRatio: options?.maintainAspectRatio || false,
    minScale: options?.minScale,
    maxScale: options?.maxScale,
    id: options?.id,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create mixed validation input
 */
export function createMixedValidationInput(
  options?: Partial<Omit<IMixedValidationInput, 'id'>>
): IMixedValidationInput {
  return {
    size: options?.size,
    position: options?.position,
    scale: options?.scale,
    validateAll: options?.validateAll || false,
    id: undefined, // id is omitted from options, so set to undefined
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create legacy validation input
 */
export function createLegacyValidationInput(
  input: unknown,
  expectedType: ILegacyValidationInput['expectedType'],
  options?: Partial<Omit<ILegacyValidationInput, 'input' | 'expectedType'>>
): ILegacyValidationInput {
  return {
    input,
    expectedType,
    strictTypeChecking: options?.strictTypeChecking || false,
    id: options?.id,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Legacy input support for backward compatibility
 * Converts old input types to new validation inputs
 */
export function convertToValidationInput(input: unknown): IValidationInput {
  if (typeof input === 'number') {
    return createValueValidationInput(input);
  }

  if (input && typeof input === 'object') {
    // Check if it's an IUnit
    if ('calculate' in input && 'unitType' in input) {
      const unit = input as IUnit;
      return createUnitValidationInput(unit, unit.unitType);
    }

    // Check if it has a value property
    if ('value' in input && typeof (input as { value: unknown }).value === 'number') {
      return createValueValidationInput((input as { value: number }).value);
    }

    // Check if it has unit and value properties
    if ('unit' in input && 'value' in input) {
      const unitValue = input as {
        unit: unknown;
        value: unknown;
        [key: string]: unknown;
      };
      if (unitValue.unit && unitValue.value) {
        // Try to determine the type based on unit
        if (Object.values(SizeUnit).includes(unitValue.unit as SizeUnit)) {
          return createSizeValidationInput(
            unitValue.unit as SizeUnit,
            unitValue.value as number | SizeValue,
            undefined
          );
        }
        if (Object.values(PositionUnit).includes(unitValue.unit as PositionUnit)) {
          return createPositionValidationInput(
            unitValue.unit as PositionUnit,
            unitValue.value as number | PositionValue,
            undefined
          );
        }
        if (Object.values(ScaleUnit).includes(unitValue.unit as ScaleUnit)) {
          return createScaleValidationInput(
            unitValue.unit as ScaleUnit,
            unitValue.value as number | ScaleValue,
            undefined
          );
        }
      }
    }
  }

  // Default to legacy validation input
  return createLegacyValidationInput(input, ValidationType.MIXED);
}
