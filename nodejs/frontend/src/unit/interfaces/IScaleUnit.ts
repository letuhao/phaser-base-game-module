import type { IUnit, UnitContext } from './IUnit';
import type { ScaleUnit } from '../enums/ScaleUnit';
import type { ScaleValue } from '../enums/ScaleValue';

/**
 * Interface for scale unit implementations
 * Handles scaleX, scaleY, and overall scaling calculations
 */
export interface IScaleUnit extends IUnit {
  /**
   * The type of scale unit
   */
  readonly scaleUnit: ScaleUnit;

  /**
   * The base value for the unit
   */
  readonly baseValue: number | ScaleValue;

  /**
   * Whether to maintain aspect ratio when scaling
   */
  readonly maintainAspectRatio: boolean;

  /**
   * Calculate scale based on context
   * @param context - Context information for calculation
   * @returns Calculated scale factor
   */
  calculateScale(context: UnitContext): number;

  /**
   * Calculate X scale specifically
   * @param context - Context information for calculation
   * @returns Calculated X scale factor
   */
  calculateScaleX(context: UnitContext): number;

  /**
   * Calculate Y scale specifically
   * @param context - Context information for calculation
   * @returns Calculated Y scale factor
   */
  calculateScaleY(context: UnitContext): number;

  /**
   * Calculate both X and Y scales
   * @param context - Context information for calculation
   * @returns Object with scaleX and scaleY factors
   */
  calculateBoth(context: UnitContext): { scaleX: number; scaleY: number };

  /**
   * Check if the unit is responsive (changes with context)
   * @returns True if responsive, false if static
   */
  isResponsive(): boolean;

  /**
   * Get the minimum scale constraint
   * @returns Minimum scale factor, or undefined if no constraint
   */
  getMinScale(): number | undefined;

  /**
   * Get the maximum scale constraint
   * @returns Maximum scale factor, or undefined if no constraint
   */
  getMaxScale(): number | undefined;

  /**
   * Set scale constraints
   * @param min - Minimum scale factor
   * @param max - Maximum scale factor
   */
  setScaleConstraints(min?: number, max?: number): void;

  /**
   * Check if scaling should be uniform (same for X and Y)
   * @returns True if uniform scaling, false otherwise
   */
  isUniformScaling(): boolean;

  /**
   * Set uniform scaling mode
   * @param uniform - Whether to use uniform scaling
   */
  setUniformScaling(uniform: boolean): void;
}
