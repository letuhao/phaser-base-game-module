import type { SizeValue } from '../enums/SizeValue';
import type { SizeUnit } from '../enums/SizeUnit';
import type { PositionValue } from '../enums/PositionValue';
import type { PositionUnit } from '../enums/PositionUnit';
import type { ScaleValue } from '../enums/ScaleValue';
import type { ScaleUnit } from '../enums/ScaleUnit';
import { Dimension } from '../enums/Dimension';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * Base strategy input interface
 * Represents the common structure of strategy inputs
 */
export interface IBaseStrategyInput {
  /** Unique identifier for the strategy input */
  id?: string;

  /** Human-readable name for the strategy input */
  name?: string;

  /** Strategy input type */
  type?: string;

  /** Whether the strategy input is valid */
  isValid?: boolean;

  /** Custom metadata for the strategy input */
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Size strategy input interface
 * Represents size-related strategy inputs
 */
export interface ISizeStrategyInput extends IBaseStrategyInput {
  /** Size value */
  value?: number | string | SizeValue | SizeUnit;

  /** Size dimension */
  dimension?: Dimension;

  /** Size unit */
  unit?: SizeUnit;

  /** Size value type */
  valueType?: SizeValue;

  /** Parent size reference */
  parentSize?: {
    getValue(parent: unknown): number;
  };

  /** Random value generator */
  randomValue?: {
    getRandomValue(): number;
  };

  /** Size array */
  sizeArray?: Array<number | string | SizeValue | SizeUnit>;

  /** Size object */
  sizeObject?: Record<string, number | string | SizeValue | SizeUnit>;

  /** Size string */
  sizeString?: string;
}

/**
 * Position strategy input interface
 * Represents position-related strategy inputs
 */
export interface IPositionStrategyInput extends IBaseStrategyInput {
  /** Position value */
  value?: number | string | PositionValue | PositionUnit;

  /** Position axis */
  axis?: Dimension;

  /** Position unit */
  unit?: PositionUnit;

  /** Position value type */
  valueType?: PositionValue;

  /** Parent position reference */
  parentPosition?: {
    getValue(parent: unknown): number;
  };

  /** Random value generator */
  randomValue?: {
    getRandomValue(): number;
  };

  /** Position array */
  positionArray?: Array<number | string | PositionValue | PositionUnit>;

  /** Position object */
  positionObject?: Record<string, number | string | PositionValue | PositionUnit>;

  /** Position string */
  positionString?: string;
}

/**
 * Scale strategy input interface
 * Represents scale-related strategy inputs
 */
export interface IScaleStrategyInput extends IBaseStrategyInput {
  /** Scale value */
  value?: number | string | ScaleValue | ScaleUnit;

  /** Scale unit */
  unit?: ScaleUnit;

  /** Scale value type */
  valueType?: ScaleValue;

  /** Parent scale reference */
  parentScale?: {
    getValue(parent: unknown): number;
  };

  /** Random value generator */
  randomValue?: {
    getRandomValue(): number;
  };

  /** Scale array */
  scaleArray?: Array<number | string | ScaleValue | ScaleUnit>;

  /** Scale object */
  scaleObject?: Record<string, number | string | ScaleValue | ScaleUnit>;

  /** Scale string */
  scaleString?: string;
}

/**
 * Mixed strategy input interface
 * Represents mixed strategy inputs with multiple properties
 */
export interface IMixedStrategyInput extends IBaseStrategyInput {
  /** Size properties */
  size?: Partial<ISizeStrategyInput>;

  /** Position properties */
  position?: Partial<IPositionStrategyInput>;

  /** Scale properties */
  scale?: Partial<IScaleStrategyInput>;

  /** Mixed array */
  mixedArray?: Array<
    number | string | SizeValue | SizeUnit | PositionValue | PositionUnit | ScaleValue | ScaleUnit
  >;

  /** Mixed object */
  mixedObject?: Record<
    string,
    number | string | SizeValue | SizeUnit | PositionValue | PositionUnit | ScaleValue | ScaleUnit
  >;

  /** Theme object */
  theme?: Record<string, number | string>;

  /** Responsive object */
  responsive?: Record<string, number | string>;
}

/**
 * Union type for all strategy input types
 * Used in strategy methods to accept any valid strategy input type
 */
export type IStrategyInput =
  | ISizeStrategyInput
  | IPositionStrategyInput
  | IScaleStrategyInput
  | IMixedStrategyInput;

/**
 * Type guard to check if input is a size strategy input
 */
export function isSizeStrategyInput(input: unknown): input is ISizeStrategyInput {
  if (!input || typeof input !== 'object') return false;

  const strategyInput = input as ISizeStrategyInput;
  return (
    'value' in strategyInput ||
    'dimension' in strategyInput ||
    'unit' in strategyInput ||
    'valueType' in strategyInput ||
    'parentSize' in strategyInput ||
    'randomValue' in strategyInput ||
    'sizeArray' in strategyInput ||
    'sizeObject' in strategyInput ||
    'sizeString' in strategyInput
  );
}

/**
 * Type guard to check if input is a position strategy input
 */
export function isPositionStrategyInput(input: unknown): input is IPositionStrategyInput {
  if (!input || typeof input !== 'object') return false;

  const strategyInput = input as IPositionStrategyInput;
  return (
    'value' in strategyInput ||
    'axis' in strategyInput ||
    'unit' in strategyInput ||
    'valueType' in strategyInput ||
    'parentPosition' in strategyInput ||
    'randomValue' in strategyInput ||
    'positionArray' in strategyInput ||
    'positionObject' in strategyInput ||
    'positionString' in strategyInput
  );
}

/**
 * Type guard to check if input is a scale strategy input
 */
export function isScaleStrategyInput(input: unknown): input is IScaleStrategyInput {
  if (!input || typeof input !== 'object') return false;

  const strategyInput = input as IScaleStrategyInput;
  return (
    'value' in strategyInput ||
    'unit' in strategyInput ||
    'valueType' in strategyInput ||
    'parentScale' in strategyInput ||
    'randomValue' in strategyInput ||
    'scaleArray' in strategyInput ||
    'scaleObject' in strategyInput ||
    'scaleString' in strategyInput
  );
}

/**
 * Type guard to check if input is a mixed strategy input
 */
export function isMixedStrategyInput(input: unknown): input is IMixedStrategyInput {
  if (!input || typeof input !== 'object') return false;

  const strategyInput = input as IMixedStrategyInput;
  return (
    'size' in strategyInput ||
    'position' in strategyInput ||
    'scale' in strategyInput ||
    'mixedArray' in strategyInput ||
    'mixedObject' in strategyInput ||
    'theme' in strategyInput ||
    'responsive' in strategyInput
  );
}

/**
 * Type guard to check if input is any type of strategy input
 */
export function isStrategyInput(input: unknown): input is IStrategyInput {
  return (
    isSizeStrategyInput(input) ||
    isPositionStrategyInput(input) ||
    isScaleStrategyInput(input) ||
    isMixedStrategyInput(input)
  );
}

/**
 * Factory function to create size strategy input
 */
export function createSizeStrategyInput(
  options?: Partial<Omit<ISizeStrategyInput, 'id'>>
): ISizeStrategyInput {
  return {
    id: `size-strategy-${Date.now()}`,
    name: options?.name || 'Size Strategy Input',
    type: options?.type || 'size',
    value: options?.value,
    dimension: options?.dimension || Dimension.WIDTH,
    unit: options?.unit,
    valueType: options?.valueType,
    parentSize: options?.parentSize,
    randomValue: options?.randomValue,
    sizeArray: options?.sizeArray,
    sizeObject: options?.sizeObject,
    sizeString: options?.sizeString,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create position strategy input
 */
export function createPositionStrategyInput(
  options?: Partial<Omit<IPositionStrategyInput, 'id'>>
): IPositionStrategyInput {
  return {
    id: `position-strategy-${Date.now()}`,
    name: options?.name || 'Position Strategy Input',
    type: options?.type || 'position',
    value: options?.value,
    axis: options?.axis || Dimension.X,
    unit: options?.unit,
    valueType: options?.valueType,
    parentPosition: options?.parentPosition,
    randomValue: options?.randomValue,
    positionArray: options?.positionArray,
    positionObject: options?.positionObject,
    positionString: options?.positionString,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create scale strategy input
 */
export function createScaleStrategyInput(
  options?: Partial<Omit<IScaleStrategyInput, 'id'>>
): IScaleStrategyInput {
  return {
    id: `scale-strategy-${Date.now()}`,
    name: options?.name || 'Scale Strategy Input',
    type: options?.type || 'scale',
    value: options?.value,
    unit: options?.unit,
    valueType: options?.valueType,
    parentScale: options?.parentScale,
    randomValue: options?.randomValue,
    scaleArray: options?.scaleArray,
    scaleObject: options?.scaleObject,
    scaleString: options?.scaleString,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create mixed strategy input
 */
export function createMixedStrategyInput(
  options?: Partial<Omit<IMixedStrategyInput, 'id'>>
): IMixedStrategyInput {
  return {
    id: `mixed-strategy-${Date.now()}`,
    name: options?.name || 'Mixed Strategy Input',
    type: options?.type || 'mixed',
    size: options?.size,
    position: options?.position,
    scale: options?.scale,
    mixedArray: options?.mixedArray,
    mixedObject: options?.mixedObject,
    theme: options?.theme,
    responsive: options?.responsive,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Strategy input support for backward compatibility
 * Converts old input types to new strategy input interfaces
 */
export function convertToStrategyInput(input: unknown): IStrategyInput {
  if (!input || typeof input !== 'object') {
    return createSizeStrategyInput({ value: DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT });
  }

  // Handle primitive types
  if (typeof input === 'number') {
    return createSizeStrategyInput({ value: input });
  }

  if (typeof input === 'string') {
    return createSizeStrategyInput({ sizeString: input });
  }

  const obj = input as Record<string, unknown>;

  // Check if it's a size-related input
  if ('dimension' in obj || 'sizeUnit' in obj || 'sizeValue' in obj) {
    return createSizeStrategyInput({
      value: obj.value as number | string | SizeValue | SizeUnit,
      dimension: obj.dimension as Dimension,
      unit: obj.unit as SizeUnit,
      valueType: obj.valueType as SizeValue,
      parentSize: obj.parentSize as { getValue(parent: unknown): number },
      randomValue: obj.randomValue as { getRandomValue(): number },
      sizeArray: obj.sizeArray as Array<number | string | SizeValue | SizeUnit>,
      sizeObject: obj.sizeObject as Record<string, number | string | SizeValue | SizeUnit>,
      sizeString: obj.sizeString as string,
      metadata: obj.metadata as Record<string, string | number | boolean>,
    });
  }

  // Check if it's a position-related input
  if ('axis' in obj || 'positionUnit' in obj || 'positionValue' in obj) {
    return createPositionStrategyInput({
      value: obj.value as number | string | PositionValue | PositionUnit,
      axis: obj.axis as Dimension,
      unit: obj.unit as PositionUnit,
      valueType: obj.valueType as PositionValue,
      parentPosition: obj.parentPosition as { getValue(parent: unknown): number },
      randomValue: obj.randomValue as { getRandomValue(): number },
      positionArray: obj.positionArray as Array<number | string | PositionValue | PositionUnit>,
      positionObject: obj.positionObject as Record<
        string,
        number | string | PositionValue | PositionUnit
      >,
      positionString: obj.positionString as string,
      metadata: obj.metadata as Record<string, string | number | boolean>,
    });
  }

  // Check if it's a scale-related input
  if ('scaleUnit' in obj || 'scaleValue' in obj) {
    return createScaleStrategyInput({
      value: obj.value as number | string | ScaleValue | ScaleUnit,
      unit: obj.unit as ScaleUnit,
      valueType: obj.valueType as ScaleValue,
      parentScale: obj.parentScale as { getValue(parent: unknown): number },
      randomValue: obj.randomValue as { getRandomValue(): number },
      scaleArray: obj.scaleArray as Array<number | string | ScaleValue | ScaleUnit>,
      scaleObject: obj.scaleObject as Record<string, number | string | ScaleValue | ScaleUnit>,
      scaleString: obj.scaleString as string,
      metadata: obj.metadata as Record<string, string | number | boolean>,
    });
  }

  // Check if it has mixed properties
  if (
    'size' in obj ||
    'position' in obj ||
    'scale' in obj ||
    'theme' in obj ||
    'responsive' in obj
  ) {
    return createMixedStrategyInput({
      size: obj.size as Partial<ISizeStrategyInput>,
      position: obj.position as Partial<IPositionStrategyInput>,
      scale: obj.scale as Partial<IScaleStrategyInput>,
      mixedArray: obj.mixedArray as Array<
        | number
        | string
        | SizeValue
        | SizeUnit
        | PositionValue
        | PositionUnit
        | ScaleValue
        | ScaleUnit
      >,
      mixedObject: obj.mixedObject as Record<
        string,
        | number
        | string
        | SizeValue
        | SizeUnit
        | PositionValue
        | PositionUnit
        | ScaleValue
        | ScaleUnit
      >,
      theme: obj.theme as Record<string, number | string>,
      responsive: obj.responsive as Record<string, number | string>,
      metadata: obj.metadata as Record<string, string | number | boolean>,
    });
  }

  // Default to size strategy input
  return createSizeStrategyInput({
    value: obj.value as number | string | SizeValue | SizeUnit,
    metadata: obj.metadata as Record<string, string | number | boolean>,
  });
}
