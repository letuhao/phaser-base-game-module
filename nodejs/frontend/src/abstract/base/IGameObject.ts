import * as Phaser from 'phaser';
import type { IContainer } from '../objects/IContainer';
import type { CommonIStyleProperties } from '../configs/IStyleProperties';

/**
 * Base interface for all game objects in the Phaser game
 * Provides common properties and methods that all game objects should implement
 *
 * Layout and styling is now handled through layoutProperties and IStyle interface
 */
export interface IGameObject {
  /** Unique identifier for this game object */
  readonly id: string;

  /** Parent container (null if root node) */
  readonly parent: IContainer | null;

  /** Whether this game object is currently active/visible */
  readonly isActive: boolean;

  /** Whether this game object is destroyed */
  readonly isDestroyed: boolean;

  /** The scene this game object belongs to */
  readonly scene: Phaser.Scene;

  /** Whether the game object is visible */
  readonly visible: boolean;

  /** Whether the game object is interactive */
  readonly interactive: boolean;

  /** Responsive layout properties for this object */
  layoutProperties: CommonIStyleProperties;

  /** Initialize the game object */
  initialize(): void;

  /** Update the game object (called every frame) */
  update(time: number, delta: number): void;

  /** Activate/enable the game object */
  activate(): void;

  /** Deactivate/disable the game object */
  deactivate(): void;

  /** Show the game object */
  show(): void;

  /** Hide the game object */
  hide(): void;

  /** Set whether the game object is interactive */
  setInteractive(interactive: boolean): void;

  /** Destroy the game object and clean up resources */
  destroy(): void;

  /** Clone the game object */
  clone(): IGameObject;

  /** Get the size of this game object */
  getSize(): { width: number; height: number };

  /** Get the position of this game object */
  getPosition(): { x: number; y: number };
}
