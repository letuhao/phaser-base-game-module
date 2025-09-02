/**
 * Game Object Identity Interface
 * 
 * Defines the basic identification and metadata for game objects.
 * This interface focuses solely on identity concerns.
 */

import * as Phaser from 'phaser';
import type { GameObjectType, GameObjectState } from '../../enums';

/**
 * Interface for game object identity and basic metadata
 */
export interface IGameObjectIdentity {
  /** Unique identifier for this game object */
  readonly gameObjectId: string;
  
  /** Human-readable name for this game object */
  readonly gameObjectName: string;
  
  /** The type of this game object */
  readonly gameObjectType: GameObjectType;
  
  /** The scene this game object belongs to */
  readonly gameObjectScene: Phaser.Scene;
  
  /** Current state of the game object */
  readonly gameObjectState: GameObjectState;
  
  /** Whether the game object is enabled */
  readonly gameObjectEnabled: boolean;
  
  /** Whether the game object is paused */
  readonly gameObjectPaused: boolean;
  
  /** Get the class name of this game object */
  getGameObjectClassName(): string;
  
  /** Check if this object is of a specific type */
  isGameObjectType<T extends IGameObjectIdentity>(type: new (...args: any[]) => T): this is T;
}
