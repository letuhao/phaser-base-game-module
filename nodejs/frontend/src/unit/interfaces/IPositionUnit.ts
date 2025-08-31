import type { IUnit, UnitContext } from './IUnit'
import type { PositionUnit } from '../enums/PositionUnit'
import type { Dimension } from '../enums/Dimension'
import type { PositionValue } from '../enums/PositionValue'

/**
 * Interface for position unit implementations
 * Handles x, y positioning and alignment calculations
 */
export interface IPositionUnit extends IUnit {
  /**
   * The type of position unit
   */
  readonly positionUnit: PositionUnit
  
  /**
   * The axis this unit affects
   */
  readonly axis: Dimension.X | Dimension.Y | Dimension.XY
  
  /**
   * The base value for the unit
   */
  readonly baseValue: number | PositionValue
  
  /**
   * Calculate position based on context
   * @param context - Context information for calculation
   * @returns Calculated position in pixels
   */
  calculatePosition(context: UnitContext): number
  
  /**
   * Calculate X position specifically
   * @param context - Context information for calculation
   * @returns Calculated X position in pixels
   */
  calculateX(context: UnitContext): number
  
  /**
   * Calculate Y position specifically
   * @param context - Context information for calculation
   * @returns Calculated Y position in pixels
   */
  calculateY(context: UnitContext): number
  
  /**
   * Calculate both X and Y positions
   * @param context - Context information for calculation
   * @returns Object with x and y positions in pixels
   */
  calculateBoth(context: UnitContext): { x: number; y: number }
  
  /**
   * Check if the unit is responsive (changes with context)
   * @returns True if responsive, false if static
   */
  isResponsive(): boolean
  
  /**
   * Get the alignment type (left, center, right, top, bottom)
   * @returns Alignment string or undefined if not applicable
   */
  getAlignment(): string | undefined
  
  /**
   * Set alignment for the position unit
   * @param alignment - Alignment string (left, center, right, top, bottom)
   */
  setAlignment(alignment: string): void
  
  /**
   * Get the offset value
   * @returns Offset in pixels
   */
  getOffset(): number
  
  /**
   * Set the offset value
   * @param offset - Offset in pixels
   */
  setOffset(offset: number): void
}
