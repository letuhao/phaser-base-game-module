import { UnitType } from '../enums/UnitType';
import { Dimension } from '../enums/Dimension';

/**
 * Base legacy unit interface
 * Represents the common structure of legacy unit objects
 */
export interface IBaseLegacyUnit {
  /** Unique identifier for the legacy unit */
  id?: string;

  /** Human-readable name for the legacy unit */
  name?: string;

  /** Legacy unit type */
  type?: string;

  /** Legacy unit constructor name */
  constructor?: {
    name: string;
  };

  /** Whether the legacy unit is valid */
  isValid?: boolean;

  /** Custom metadata for the legacy unit */
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Legacy size unit interface
 * Represents legacy size-related unit objects
 */
export interface ILegacySizeUnit extends IBaseLegacyUnit {
  /** Legacy size value */
  size?: number;

  /** Legacy width value */
  width?: number;

  /** Legacy height value */
  height?: number;

  /** Legacy dimension */
  dimension?: string | Dimension;

  /** Legacy unit type */
  unitType?: string | UnitType;

  /** Legacy size unit */
  sizeUnit?: string;

  /** Legacy base value */
  baseValue?: number;

  /** Legacy minimum size */
  minSize?: number;

  /** Legacy maximum size */
  maxSize?: number;
}

/**
 * Legacy position unit interface
 * Represents legacy position-related unit objects
 */
export interface ILegacyPositionUnit extends IBaseLegacyUnit {
  /** Legacy position value */
  position?: number;

  /** Legacy X coordinate */
  x?: number;

  /** Legacy Y coordinate */
  y?: number;

  /** Legacy axis */
  axis?: string | Dimension;

  /** Legacy unit type */
  unitType?: string | UnitType;

  /** Legacy position unit */
  positionUnit?: string;

  /** Legacy base value */
  baseValue?: number;

  /** Legacy offset */
  offset?: number;
}

/**
 * Legacy scale unit interface
 * Represents legacy scale-related unit objects
 */
export interface ILegacyScaleUnit extends IBaseLegacyUnit {
  /** Legacy scale value */
  scale?: number;

  /** Legacy scale factor */
  factor?: number;

  /** Legacy unit type */
  unitType?: string | UnitType;

  /** Legacy scale unit */
  scaleUnit?: string;

  /** Legacy base value */
  baseValue?: number;

  /** Legacy minimum scale */
  minScale?: number;

  /** Legacy maximum scale */
  maxScale?: number;
}

/**
 * Legacy mixed unit interface
 * Represents legacy units with multiple properties
 */
export interface ILegacyMixedUnit extends IBaseLegacyUnit {
  /** Legacy size properties */
  size?: Partial<ILegacySizeUnit>;

  /** Legacy position properties */
  position?: Partial<ILegacyPositionUnit>;

  /** Legacy scale properties */
  scale?: Partial<ILegacyScaleUnit>;

  /** Legacy unit type */
  unitType?: string | UnitType;

  /** Legacy base values */
  baseValues?: Record<string, number>;
}

/**
 * Legacy unknown unit interface
 * Represents legacy units that don't match known patterns
 */
export interface ILegacyUnknownUnit extends IBaseLegacyUnit {
  /** Legacy unit data */
  data: Record<string, unknown>;

  /** Legacy unit type */
  unitType?: string | UnitType;

  /** Legacy unit properties */
  properties?: Record<string, unknown>;
}

/**
 * Union type for all legacy unit types
 * Used in adapter methods to accept any valid legacy unit type
 */
export type ILegacyUnit =
  | ILegacySizeUnit
  | ILegacyPositionUnit
  | ILegacyScaleUnit
  | ILegacyMixedUnit
  | ILegacyUnknownUnit;

/**
 * Type guard to check if input is a legacy size unit
 */
export function isLegacySizeUnit(input: unknown): input is ILegacySizeUnit {
  if (!input || typeof input !== 'object') return false;

  const legacyUnit = input as ILegacySizeUnit;
  return (
    'size' in legacyUnit ||
    'width' in legacyUnit ||
    'height' in legacyUnit ||
    'sizeUnit' in legacyUnit
  );
}

/**
 * Type guard to check if input is a legacy position unit
 */
export function isLegacyPositionUnit(input: unknown): input is ILegacyPositionUnit {
  if (!input || typeof input !== 'object') return false;

  const legacyUnit = input as ILegacyPositionUnit;
  return (
    'position' in legacyUnit ||
    'x' in legacyUnit ||
    'y' in legacyUnit ||
    'positionUnit' in legacyUnit
  );
}

/**
 * Type guard to check if input is a legacy scale unit
 */
export function isLegacyScaleUnit(input: unknown): input is ILegacyScaleUnit {
  if (!input || typeof input !== 'object') return false;

  const legacyUnit = input as ILegacyScaleUnit;
  return 'scale' in legacyUnit || 'factor' in legacyUnit || 'scaleUnit' in legacyUnit;
}

/**
 * Type guard to check if input is a legacy mixed unit
 */
export function isLegacyMixedUnit(input: unknown): input is ILegacyMixedUnit {
  if (!input || typeof input !== 'object') return false;

  const legacyUnit = input as ILegacyMixedUnit;
  return 'size' in legacyUnit || 'position' in legacyUnit || 'scale' in legacyUnit;
}

/**
 * Type guard to check if input is a legacy unknown unit
 */
export function isLegacyUnknownUnit(input: unknown): input is ILegacyUnknownUnit {
  if (!input || typeof input !== 'object') return false;

  const legacyUnit = input as ILegacyUnknownUnit;
  return 'data' in legacyUnit;
}

/**
 * Type guard to check if input is any type of legacy unit
 */
export function isLegacyUnit(input: unknown): input is ILegacyUnit {
  return (
    isLegacySizeUnit(input) ||
    isLegacyPositionUnit(input) ||
    isLegacyScaleUnit(input) ||
    isLegacyMixedUnit(input) ||
    isLegacyUnknownUnit(input)
  );
}

/**
 * Factory function to create legacy size unit
 */
export function createLegacySizeUnit(
  options?: Partial<Omit<ILegacySizeUnit, 'id'>>
): ILegacySizeUnit {
  return {
    id: `legacy-size-${Date.now()}`, // id is omitted from options, so generate new one
    name: options?.name || 'Legacy Size Unit',
    type: options?.type || 'size',
    unitType: options?.unitType || UnitType.SIZE,
    size: options?.size,
    width: options?.width,
    height: options?.height,
    dimension: options?.dimension || Dimension.WIDTH,
    sizeUnit: options?.sizeUnit || 'pixel',
    baseValue: options?.baseValue || 100,
    minSize: options?.minSize,
    maxSize: options?.maxSize,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create legacy position unit
 */
export function createLegacyPositionUnit(
  options?: Partial<Omit<ILegacyPositionUnit, 'id'>>
): ILegacyPositionUnit {
  return {
    id: `legacy-position-${Date.now()}`, // id is omitted from options, so generate new one
    name: options?.name || 'Legacy Position Unit',
    type: options?.type || 'position',
    unitType: options?.unitType || UnitType.POSITION,
    position: options?.position,
    x: options?.x || 0,
    y: options?.y || 0,
    axis: options?.axis || Dimension.X,
    positionUnit: options?.positionUnit || 'pixel',
    baseValue: options?.baseValue || 0,
    offset: options?.offset || 0,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create legacy scale unit
 */
export function createLegacyScaleUnit(
  options?: Partial<Omit<ILegacyScaleUnit, 'id'>>
): ILegacyScaleUnit {
  return {
    id: `legacy-scale-${Date.now()}`, // id is omitted from options, so generate new one
    name: options?.name || 'Legacy Scale Unit',
    type: options?.type || 'scale',
    unitType: options?.unitType || UnitType.SCALE,
    scale: options?.scale || 1,
    factor: options?.factor || 1,
    scaleUnit: options?.scaleUnit || 'factor',
    baseValue: options?.baseValue || 1,
    minScale: options?.minScale,
    maxScale: options?.maxScale,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create legacy mixed unit
 */
export function createLegacyMixedUnit(
  options?: Partial<Omit<ILegacyMixedUnit, 'id'>>
): ILegacyMixedUnit {
  return {
    id: `legacy-mixed-${Date.now()}`, // id is omitted from options, so generate new one
    name: options?.name || 'Legacy Mixed Unit',
    type: options?.type || 'mixed',
    unitType: options?.unitType || UnitType.SIZE,
    size: options?.size,
    position: options?.position,
    scale: options?.scale,
    baseValues: options?.baseValues || {},
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create legacy unknown unit
 */
export function createLegacyUnknownUnit(
  data: Record<string, unknown>,
  options?: Partial<Omit<ILegacyUnknownUnit, 'id' | 'data'>>
): ILegacyUnknownUnit {
  return {
    id: `legacy-unknown-${Date.now()}`, // id is omitted from options, so generate new one
    name: options?.name || 'Legacy Unknown Unit',
    type: options?.type || 'unknown',
    unitType: options?.unitType,
    data,
    properties: options?.properties,
    isValid: options?.isValid ?? true,
    metadata: options?.metadata,
  };
}

/**
 * Legacy input support for backward compatibility
 * Converts old input types to new legacy unit interfaces
 */
export function convertToLegacyUnit(input: unknown): ILegacyUnit {
  if (!input || typeof input !== 'object') {
    return createLegacyUnknownUnit({ input: 'null-or-undefined' });
  }

  const obj = input as Record<string, unknown>;

  // Check if it's a size unit
  if ('size' in obj || 'width' in obj || 'height' in obj || 'sizeUnit' in obj) {
    return createLegacySizeUnit({
      size: typeof obj.size === 'number' ? obj.size : undefined,
      width: typeof obj.width === 'number' ? obj.width : undefined,
      height: typeof obj.height === 'number' ? obj.height : undefined,
      sizeUnit: typeof obj.sizeUnit === 'string' ? obj.sizeUnit : undefined,
      baseValue: typeof obj.baseValue === 'number' ? obj.baseValue : undefined,
      unitType: obj.unitType as UnitType,
      metadata: obj.metadata as Record<string, string | number | boolean>,
    });
  }

  // Check if it's a position unit
  if ('position' in obj || 'x' in obj || 'y' in obj || 'positionUnit' in obj) {
    return createLegacyPositionUnit({
      position: typeof obj.position === 'number' ? obj.position : undefined,
      x: typeof obj.x === 'number' ? obj.x : undefined,
      y: typeof obj.y === 'number' ? obj.y : undefined,
      positionUnit: typeof obj.positionUnit === 'string' ? obj.positionUnit : undefined,
      baseValue: typeof obj.baseValue === 'number' ? obj.baseValue : undefined,
      unitType: obj.unitType as UnitType,
      metadata: obj.metadata as Record<string, string | number | boolean>,
    });
  }

  // Check if it's a scale unit
  if ('scale' in obj || 'factor' in obj || 'scaleUnit' in obj) {
    return createLegacyScaleUnit({
      scale: typeof obj.scale === 'number' ? obj.scale : undefined,
      factor: typeof obj.factor === 'number' ? obj.factor : undefined,
      scaleUnit: typeof obj.scaleUnit === 'string' ? obj.scaleUnit : undefined,
      baseValue: typeof obj.baseValue === 'number' ? obj.baseValue : undefined,
      unitType: obj.unitType as UnitType,
      metadata: obj.metadata as Record<string, string | number | boolean>,
    });
  }

  // Check if it has mixed properties
  if ('size' in obj || 'position' in obj || 'scale' in obj) {
    return createLegacyMixedUnit({
      size: 'size' in obj ? (obj.size as Partial<ILegacySizeUnit>) : undefined,
      position: 'position' in obj ? (obj.position as Partial<ILegacyPositionUnit>) : undefined,
      scale: 'scale' in obj ? (obj.scale as Partial<ILegacyScaleUnit>) : undefined,
      unitType: obj.unitType as UnitType,
      baseValues: obj.baseValues as Record<string, number>,
      metadata: obj.metadata as Record<string, string | number | boolean>,
    });
  }

  // Default to unknown unit
  return createLegacyUnknownUnit(obj, {
    unitType: obj.unitType as UnitType,
    metadata: obj.metadata as Record<string, string | number | boolean>,
  });
}
