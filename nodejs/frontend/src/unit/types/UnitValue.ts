import type { IUnit } from '../interfaces/IUnit'
import type { SizeUnit } from '../enums/SizeUnit'
import type { PositionUnit } from '../enums/PositionUnit'
import type { ScaleUnit } from '../enums/ScaleUnit'
import type { Dimension } from '../enums/Dimension'
import type { SizeValue } from '../enums/SizeValue'
import type { PositionValue } from '../enums/PositionValue'
import type { ScaleValue } from '../enums/ScaleValue'

/**
 * Union type for all possible unit values
 * This allows for flexible unit specification in style properties
 */
export type UnitValue = 
  | number                    // Direct pixel values
  | SizeValue                 // Size value enum
  | PositionValue            // Position value enum
  | ScaleValue               // Scale value enum
  | string                    // String keywords (legacy support)
  | IUnit                     // Custom unit implementations
  | SizeUnitValue            // Size-specific units
  | PositionUnitValue        // Position-specific units
  | ScaleUnitValue           // Scale-specific units

/**
 * Type for size unit values
 */
export type SizeUnitValue = {
  type: 'size'
  unit: SizeUnit
  value: number
  dimension?: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH
  maintainAspectRatio?: boolean
}

/**
 * Type for position unit values
 */
export type PositionUnitValue = {
  type: 'position'
  unit: PositionUnit
  value: number
  axis?: Dimension.X | Dimension.Y | Dimension.XY
}

/**
 * Type for scale unit values
 */
export type ScaleUnitValue = {
  type: 'scale'
  unit: ScaleUnit
  value: number
  maintainAspectRatio?: boolean
}
