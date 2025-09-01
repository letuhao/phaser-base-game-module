/**
 * Arcade Physics Interface
 * 
 * Defines arcade physics-specific functionality for game objects.
 */

import type { IPhysicsObject } from './IPhysicsObject';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Interface for arcade physics game objects
 * 
 * Extends IPhysicsObject with arcade physics-specific functionality.
 */
export interface IArcadePhysics extends IPhysicsObject {
  readonly gameObjectType: GameObjectType.ARCADE_PHYSICS;
  
  /** Arcade physics body */
  readonly arcadeBody: Phaser.Physics.Arcade.Body;
  
  /** Arcade physics world */
  readonly arcadeWorld: Phaser.Physics.Arcade.World;
  
  /** Set arcade physics body size */
  setArcadeBodySize(width: number, height: number): this;
  
  /** Set arcade physics body offset */
  setArcadeBodyOffset(x: number, y: number): this;
  
  /** Set arcade physics body bounce */
  setArcadeBodyBounce(x: number, y: number): this;
  
  /** Set arcade physics body immovable */
  setArcadeBodyImmovable(immovable: boolean): this;
  
  /** Set arcade physics body pushable */
  setArcadeBodyPushable(pushable: boolean): this;
  
  /** Set arcade physics body collide world bounds */
  setArcadeBodyCollideWorldBounds(collide: boolean): this;
  
  /** Get arcade physics body */
  getArcadeBody(): Phaser.Physics.Arcade.Body;
  
  /** Get arcade physics world */
  getArcadeWorld(): Phaser.Physics.Arcade.World;
  
  /** Check arcade physics overlap */
  checkArcadeOverlap(other: Phaser.GameObjects.GameObject): boolean;
  
  /** Check arcade physics collision */
  checkArcadeCollision(other: Phaser.GameObjects.GameObject): boolean;
}
