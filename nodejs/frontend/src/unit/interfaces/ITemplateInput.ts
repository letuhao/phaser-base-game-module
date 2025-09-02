import type { IUnit } from './IUnit';
import type { UnitValue } from '../types/UnitValue';
import { SizeUnit } from '../enums/SizeUnit';
import { SizeValue } from '../enums/SizeValue';
import { PositionUnit } from '../enums/PositionUnit';
import { PositionValue } from '../enums/PositionValue';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { Dimension } from '../enums/Dimension';
import { TemplateInputType } from '../enums/TemplateInputType';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * Base input interface for all template calculations
 * Provides common properties that all inputs should have
 */
export interface IBaseTemplateInput {
  /** Unique identifier for the input */
  id?: string;

  /** Type of the input */
  type: TemplateInputType;

  /** Whether the input is valid */
  isValid?: boolean;

  /** Custom metadata for the input */
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Input for size calculations
 */
export interface ISizeTemplateInput extends IBaseTemplateInput {
  type: TemplateInputType.SIZE;

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

  /** Base size value */
  baseValue?: number;
}

/**
 * Input for position calculations
 */
export interface IPositionTemplateInput extends IBaseTemplateInput {
  type: TemplateInputType.POSITION;

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

  /** Base position value */
  baseValue?: number;
}

/**
 * Input for scale calculations
 */
export interface IScaleTemplateInput extends IBaseTemplateInput {
  type: TemplateInputType.SCALE;

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

  /** Base scale value */
  baseValue?: number;
}

/**
 * Input for mixed calculations (size + position + scale)
 */
export interface IMixedTemplateInput extends IBaseTemplateInput {
  type: TemplateInputType.MIXED;

  /** Size input */
  size?: ISizeTemplateInput;

  /** Position input */
  position?: IPositionTemplateInput;

  /** Scale input */
  scale?: IScaleTemplateInput;

  /** Whether to maintain aspect ratio across all dimensions */
  maintainAspectRatio?: boolean;
}

/**
 * Union type for all template inputs
 * Used in template methods to accept any valid input type
 */
export type ITemplateInput =
  | ISizeTemplateInput
  | IPositionTemplateInput
  | IScaleTemplateInput
  | IMixedTemplateInput;

/**
 * Type guard to check if input is for size calculations
 */
export function isSizeTemplateInput(input: ITemplateInput): input is ISizeTemplateInput {
  return input.type === 'size';
}

/**
 * Type guard to check if input is for position calculations
 */
export function isPositionTemplateInput(input: ITemplateInput): input is IPositionTemplateInput {
  return input.type === 'position';
}

/**
 * Type guard to check if input is for scale calculations
 */
export function isScaleTemplateInput(input: ITemplateInput): input is IScaleTemplateInput {
  return input.type === 'scale';
}

/**
 * Type guard to check if input is for mixed calculations
 */
export function isMixedTemplateInput(input: ITemplateInput): input is IMixedTemplateInput {
  return input.type === 'mixed';
}

/**
 * Type guard to check if input is a valid template input
 */
export function isValidTemplateInput(input: unknown): input is ITemplateInput {
  if (!input || typeof input !== 'object') return false;

  const templateInput = input as ITemplateInput;
  return 'type' in templateInput && Object.values(TemplateInputType).includes(templateInput.type);
}

/**
 * Factory function to create size template input
 */
export function createSizeTemplateInput(
  unit: SizeUnit,
  value: number | SizeValue,
  options?: Partial<Omit<ISizeTemplateInput, 'type' | 'unit' | 'value'>>
): ISizeTemplateInput {
  return {
    type: TemplateInputType.SIZE,
    unit,
    value,
    dimension: options?.dimension || Dimension.WIDTH,
    maintainAspectRatio: options?.maintainAspectRatio || false,
    minSize: options?.minSize,
    maxSize: options?.maxSize,
    baseValue: options?.baseValue,
    id: options?.id,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create position template input
 */
export function createPositionTemplateInput(
  unit: PositionUnit,
  value: number | PositionValue,
  options?: Partial<Omit<IPositionTemplateInput, 'type' | 'unit' | 'value'>>
): IPositionTemplateInput {
  return {
    type: TemplateInputType.POSITION,
    unit,
    value,
    axis: options?.axis || Dimension.X,
    offset: options?.offset || 0,
    respectBounds: options?.respectBounds ?? true,
    baseValue: options?.baseValue,
    id: options?.id,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create scale template input
 */
export function createScaleTemplateInput(
  unit: ScaleUnit,
  value: number | ScaleValue,
  options?: Partial<Omit<IScaleTemplateInput, 'type' | 'unit' | 'value'>>
): IScaleTemplateInput {
  return {
    type: TemplateInputType.SCALE,
    unit,
    value,
    maintainAspectRatio: options?.maintainAspectRatio || false,
    minScale: options?.minScale,
    maxScale: options?.maxScale,
    baseValue: options?.baseValue,
    id: options?.id,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create mixed template input
 */
export function createMixedTemplateInput(
  options?: Partial<Omit<IMixedTemplateInput, 'type'>>
): IMixedTemplateInput {
  return {
    type: TemplateInputType.MIXED,
    size: options?.size,
    position: options?.position,
    scale: options?.scale,
    maintainAspectRatio: options?.maintainAspectRatio || false,
    id: options?.id,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Legacy input support for backward compatibility
 * Converts old input types to new template inputs
 */
export function convertLegacyInput(input: IUnit | UnitValue | number | string): ITemplateInput {
  if (typeof input === 'number') {
    return createSizeTemplateInput(SizeUnit.PIXEL, input);
  }

  if (typeof input === 'string') {
    // Try to parse as a unit value
    if (Object.values(SizeValue).includes(input as SizeValue)) {
      return createSizeTemplateInput(SizeUnit.PIXEL, input as SizeValue);
    }
    if (Object.values(PositionValue).includes(input as PositionValue)) {
      return createPositionTemplateInput(PositionUnit.PIXEL, input as PositionValue);
    }
    if (Object.values(ScaleValue).includes(input as ScaleValue)) {
      return createScaleTemplateInput(ScaleUnit.FACTOR, input as ScaleValue);
    }

    // Default to size input
    return createSizeTemplateInput(SizeUnit.PIXEL, DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT);
  }

  // If it's an IUnit, extract its properties
  if (input && typeof input === 'object' && 'calculate' in input) {
    // It's an IUnit, use a default value since we can't extract size directly
    return createSizeTemplateInput(SizeUnit.PIXEL, DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT);
  }

  // Default fallback
  return createSizeTemplateInput(SizeUnit.PIXEL, DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT);
}
