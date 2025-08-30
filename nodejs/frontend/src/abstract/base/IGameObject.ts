import * as Phaser from 'phaser'
import type { IContainer } from '../objects/IContainer'

/**
 * Base interface for all game objects in the Phaser game
 * Provides common properties and methods that all game objects should implement
 * 
 * Inspired by XML node structure where objects can have parent-child relationships
 */
export interface IGameObject {
  /** Unique identifier for this game object */
  readonly id: string
  
  /** Parent container (null if root node) */
  readonly parent: IContainer | null
  
  /** The underlying Phaser game object */
  readonly phaserObject: Phaser.GameObjects.GameObject
  
  /** Whether this game object is currently active/visible */
  readonly isActive: boolean
  
  /** Whether this game object is destroyed */
  readonly isDestroyed: boolean
  
  /** The scene this game object belongs to */
  readonly scene: Phaser.Scene
  
  /** Position of the game object in world coordinates */
  readonly position: { x: number; y: number }
  
  /** Size of the game object */
  readonly size: { width: number; height: number }
  
  /** Scale of the game object */
  readonly scale: { x: number; y: number }
  
  /** Rotation of the game object in radians */
  readonly rotation: number
  
  /** Alpha/transparency of the game object (0-1) */
  readonly alpha: number
  
  /** Whether the game object is visible */
  readonly visible: boolean
  
  /** Whether the game object is interactive */
  readonly interactive: boolean
  
  /** Initialize the game object */
  initialize(): void
  
  /** Update the game object (called every frame) */
  update(time: number, delta: number): void
  
  /** Activate/enable the game object */
  activate(): void
  
  /** Deactivate/disable the game object */
  deactivate(): void
  
  /** Show the game object */
  show(): void
  
  /** Hide the game object */
  hide(): void
  
  /** Set the position of the game object */
  setPosition(x: number, y: number): void
  
  /** Set the rotation of the game object */
  setRotation(rotation: number): void
  
  /** Set the alpha/transparency of the game object */
  setAlpha(alpha: number): void
  
  /** Set whether the game object is interactive */
  setInteractive(interactive: boolean): void
  
  /** Destroy the game object and clean up resources */
  destroy(): void
  
  /** Clone the game object */
  clone(): IGameObject
}
