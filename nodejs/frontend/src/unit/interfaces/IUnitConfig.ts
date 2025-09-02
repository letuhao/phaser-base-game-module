import {
  Dimension,
  SizeUnit,
  PositionUnit,
  ScaleUnit,
  SizeValue,
  PositionValue,
  ScaleValue,
} from '../';

/**
 * Base configuration interface for all unit types
 * Provides type-safe configuration for unit creation
 */
export interface IBaseUnitConfig {
  /** Unique identifier for the unit */
  id: string;

  /** Human-readable name for the unit */
  name: string;

  /** Whether to maintain aspect ratio when scaling */
  maintainAspectRatio?: boolean;

  /** Minimum value constraint */
  minValue?: number;

  /** Maximum value constraint */
  maxValue?: number;

  /** Custom metadata for the unit */
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Configuration for size units
 */
export interface ISizeUnitConfig extends IBaseUnitConfig {
  /** Size unit type */
  sizeUnit?: SizeUnit;

  /** Dimension to apply the size to */
  dimension?: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH;

  /** Base value for size calculation */
  baseValue: number | SizeValue;

  /** Whether to maintain aspect ratio */
  maintainAspectRatio?: boolean;

  /** Minimum size constraint */
  minSize?: number;

  /** Maximum size constraint */
  maxSize?: number;
}

/**
 * Configuration for position units
 */
export interface IPositionUnitConfig extends IBaseUnitConfig {
  /** Position unit type */
  positionUnit?: PositionUnit;

  /** Axis to apply the position to */
  axis?: Dimension.X | Dimension.Y | Dimension.XY;

  /** Base value for position calculation */
  baseValue: number | PositionValue;

  /** Offset from calculated position */
  offset?: number;

  /** Whether to respect parent bounds */
  respectBounds?: boolean;
}

/**
 * Configuration for scale units
 */
export interface IScaleUnitConfig extends IBaseUnitConfig {
  /** Scale unit type */
  scaleUnit?: ScaleUnit;

  /** Base value for scale calculation */
  baseValue: number | ScaleValue;

  /** Whether to maintain aspect ratio */
  maintainAspectRatio?: boolean;

  /** Minimum scale constraint */
  minScale?: number;

  /** Maximum scale constraint */
  maxScale?: number;
}

/**
 * Union type for all unit configurations
 * Used in factory methods to accept any valid unit config
 */
export type IUnitConfig = ISizeUnitConfig | IPositionUnitConfig | IScaleUnitConfig;

/**
 * Type guard to check if config is for size units
 */
export function isSizeUnitConfig(config: IUnitConfig): config is ISizeUnitConfig {
  return 'sizeUnit' in config || 'dimension' in config;
}

/**
 * Type guard to check if config is for position units
 */
export function isPositionUnitConfig(config: IUnitConfig): config is IPositionUnitConfig {
  return 'positionUnit' in config || 'axis' in config;
}

/**
 * Type guard to check if config is for scale units
 */
export function isScaleUnitConfig(config: IUnitConfig): config is IScaleUnitConfig {
  return 'scaleUnit' in config;
}

/**
 * Factory function to create size unit config
 */
export function createSizeUnitConfig(
  id: string,
  name: string,
  baseValue: number | SizeValue,
  options?: Partial<Omit<ISizeUnitConfig, 'id' | 'name' | 'baseValue'>>
): ISizeUnitConfig {
  return {
    id,
    name,
    baseValue,
    sizeUnit: options?.sizeUnit || SizeUnit.PIXEL,
    dimension: options?.dimension || Dimension.WIDTH,
    maintainAspectRatio: options?.maintainAspectRatio || false,
    minSize: options?.minSize,
    maxSize: options?.maxSize,
    minValue: options?.minValue,
    maxValue: options?.maxValue,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create position unit config
 */
export function createPositionUnitConfig(
  id: string,
  name: string,
  baseValue: number | PositionValue,
  options?: Partial<Omit<IPositionUnitConfig, 'id' | 'name' | 'baseValue'>>
): IPositionUnitConfig {
  return {
    id,
    name,
    baseValue,
    positionUnit: options?.positionUnit || PositionUnit.PIXEL,
    axis: options?.axis || Dimension.X,
    offset: options?.offset || 0,
    respectBounds: options?.respectBounds || true,
    minValue: options?.minValue,
    maxValue: options?.maxValue,
    metadata: options?.metadata,
  };
}

/**
 * Factory function to create scale unit config
 */
export function createScaleUnitConfig(
  id: string,
  name: string,
  baseValue: number | ScaleValue,
  options?: Partial<Omit<IScaleUnitConfig, 'id' | 'name' | 'baseValue'>>
): IScaleUnitConfig {
  return {
    id,
    name,
    baseValue,
    scaleUnit: options?.scaleUnit || ScaleUnit.FACTOR,
    maintainAspectRatio: options?.maintainAspectRatio || false,
    minScale: options?.minScale,
    maxScale: options?.maxScale,
    minValue: options?.minValue,
    maxValue: options?.maxValue,
    metadata: options?.metadata,
  };
}
