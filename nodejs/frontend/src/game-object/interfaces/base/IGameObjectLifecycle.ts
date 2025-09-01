/**
 * Game Object Lifecycle Interface
 * 
 * Defines lifecycle-related methods for game objects.
 * This interface focuses solely on initialization, update, and destruction concerns.
 */

import * as Phaser from 'phaser';

/**
 * Interface for game object lifecycle methods
 */
export interface IGameObjectLifecycle {
  // ============================================================================
  // LIFECYCLE METHODS
  // ============================================================================
  
  /** Initialize the game object */
  initializeGameObject(): void;
  
  /** Update the game object (called every frame) */
  updateGameObject(time: number, delta: number): void;
  
  /** Pre-update the game object (called before update) */
  preUpdateGameObject(time: number, delta: number): void;
  
  /** Post-update the game object (called after update) */
  postUpdateGameObject(time: number, delta: number): void;
  
  /** Render the game object */
  renderGameObject(renderer: Phaser.Renderer.Canvas.CanvasRenderer | Phaser.Renderer.WebGL.WebGLRenderer): void;
  
  /** Destroy the game object */
  destroyGameObject(): void;
  
  /** Whether this game object has been destroyed */
  readonly gameObjectDestroyed: boolean;
}
