/**
 * Game Object Interaction Interface
 *
 * Defines interaction-related properties and methods for game objects.
 * This interface focuses solely on user interaction concerns.
 */

/**
 * Interface for game object interaction capabilities
 */
export interface IGameObjectInteraction {
  // ============================================================================
  // INTERACTION PROPERTIES
  // ============================================================================

  /** Whether this game object is active in the scene */
  readonly gameObjectActive: boolean;

  /** Whether this game object is interactive */
  readonly gameObjectInteractive: boolean;

  // ============================================================================
  // INTERACTION METHODS
  // ============================================================================

  /** Set the active state */
  setGameObjectActive(value: boolean): this;

  /** Set the interactive state */
  setGameObjectInteractive(hitArea?: any, callback?: Function, dropZone?: boolean): this;

  /** Disable interaction */
  disableGameObjectInteractive(): this;

  /** Remove interaction */
  removeGameObjectInteractive(): this;
}
