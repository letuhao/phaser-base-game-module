/**
 * Static Body Interface
 * 
 * Defines static physics body functionality for game objects.
 * Static bodies don't move but can collide with other bodies.
 */

import type { IPhysicsObject } from './IPhysicsObject';
import { GameObjectType } from '../../enums/GameObjectEnums';


/**
 * Interface for static physics body game objects
 * 
 * Extends IPhysicsObject with static body-specific functionality.
 */
export interface IStaticBody extends IPhysicsObject {
  readonly gameObjectType: GameObjectType;
  
  /** Static body immovable */
  staticBodyImmovable: boolean;
  
  /** Static body pushable */
  staticBodyPushable: boolean;
  
  /** Static body collide world bounds */
  staticBodyCollideWorldBounds: boolean;
  
  /** Static body world bounds bounce */
  staticBodyWorldBoundsBounce: { x: number; y: number };
  
  /** Static body world bounds friction */
  staticBodyWorldBoundsFriction: { x: number; y: number };
  
  /** Set static body immovable */
  setStaticBodyImmovable(immovable: boolean): this;
  
  /** Set static body pushable */
  setStaticBodyPushable(pushable: boolean): this;
  
  /** Set static body collide world bounds */
  setStaticBodyCollideWorldBounds(collide: boolean): this;
  
  /** Set static body world bounds bounce */
  setStaticBodyWorldBoundsBounce(x: number, y: number): this;
  
  /** Set static body world bounds friction */
  setStaticBodyWorldBoundsFriction(x: number, y: number): this;
  
  /** Get static body immovable */
  getStaticBodyImmovable(): boolean;
  
  /** Get static body pushable */
  getStaticBodyPushable(): boolean;
  
  /** Get static body collide world bounds */
  getStaticBodyCollideWorldBounds(): boolean;
  
  /** Get static body world bounds bounce */
  getStaticBodyWorldBoundsBounce(): { x: number; y: number };
  
  /** Get static body world bounds friction */
  getStaticBodyWorldBoundsFriction(): { x: number; y: number };
  
  /** Check static body collision with world bounds */
  checkStaticBodyWorldBoundsCollision(): boolean;
  
  /** Get static body world bounds collision info */
  getStaticBodyWorldBoundsCollisionInfo(): {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };
}
