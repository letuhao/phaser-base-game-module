import type { IUnit, UnitContext } from './IUnit'
import type { SizeUnit } from '../enums/SizeUnit'
import type { Dimension } from '../enums/Dimension'
import type { SizeValue } from '../enums/SizeValue'

/**
 * Interface for size unit implementations
 * Handles width, height, and other size-related calculations
 */
export interface ISizeUnit extends IUnit {
  /**
   * The type of size unit
   */
  readonly sizeUnit: SizeUnit
  
  /**
   * The dimension this unit affects
   */
  readonly dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH
  
  /**
   * Whether to maintain aspect ratio when scaling
   */
  readonly maintainAspectRatio: boolean
  
  /**
   * The base value for the unit
   */
  readonly baseValue: number | SizeValue
  
  /**
   * Calculate size based on context
   * @param context - Context information for calculation
   * @returns Calculated size in pixels
   */
  calculateSize(context: UnitContext): number
  
  /**
   * Calculate width specifically
   * @param context - Context information for calculation
   * @returns Calculated width in pixels
   */
  calculateWidth(context: UnitContext): number
  
  /**
   * Calculate height specifically
   * @param context - Context information for calculation
   * @returns Calculated height in pixels
   */
  calculateHeight(context: UnitContext): number
  
  /**
   * Check if the unit is responsive (changes with context)
   * @returns True if responsive, false if static
   */
  isResponsive(): boolean
  
  /**
   * Get the minimum size constraint
   * @returns Minimum size in pixels, or undefined if no constraint
   */
  getMinSize(): number | undefined
  
  /**
   * Get the maximum size constraint
   * @returns Maximum size in pixels, or undefined if no constraint
   */
  getMaxSize(): number | undefined
  
  /**
   * Set size constraints
   * @param min - Minimum size in pixels
   * @param max - Maximum size in pixels
   */
  setSizeConstraints(min?: number, max?: number): void
}
