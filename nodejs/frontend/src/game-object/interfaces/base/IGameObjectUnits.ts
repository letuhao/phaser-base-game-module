/**
 * Game Object Units Interface
 *
 * Defines unit system integration for game objects.
 * This interface focuses solely on unit system concerns.
 */

import type { UnitContext } from '../../../unit/interfaces/IUnit';

/**
 * Interface for game object unit system integration
 */
export interface IGameObjectUnits {
  // ============================================================================
  // UNIT PROPERTIES
  // ============================================================================

  /** Unit context for responsive calculations */
  readonly gameObjectUnitContext: UnitContext;

  // ============================================================================
  // UNIT METHODS
  // ============================================================================

  /** Update units based on current context */
  updateGameObjectUnits(): void;

  /** Set unit context */
  setGameObjectUnitContext(context: Partial<UnitContext>): void;

  /** Get calculated size in pixels */
  getGameObjectCalculatedSize(): { width: number; height: number };

  /** Get calculated position in pixels */
  getGameObjectCalculatedPosition(): { x: number; y: number };
}
