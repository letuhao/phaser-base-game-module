/**
 * Dynamic Body Interface
 *
 * Defines dynamic physics body functionality for game objects.
 * Dynamic bodies can move and respond to forces.
 */

import type { IPhysicsObject } from './IPhysicsObject';
import { GameObjectType } from '../../enums/GameObjectEnums';

/**
 * Interface for dynamic physics body game objects
 *
 * Extends IPhysicsObject with dynamic body-specific functionality.
 */
export interface IDynamicBody extends IPhysicsObject {
  readonly gameObjectType: GameObjectType;

  /** Dynamic body velocity */
  dynamicBodyVelocity: { x: number; y: number };

  /** Dynamic body acceleration */
  dynamicBodyAcceleration: { x: number; y: number };

  /** Dynamic body max velocity */
  dynamicBodyMaxVelocity: { x: number; y: number };

  /** Dynamic body drag */
  dynamicBodyDrag: { x: number; y: number };

  /** Dynamic body angular velocity */
  dynamicBodyAngularVelocity: number;

  /** Dynamic body angular acceleration */
  dynamicBodyAngularAcceleration: number;

  /** Dynamic body max angular velocity */
  dynamicBodyMaxAngularVelocity: number;

  /** Dynamic body angular drag */
  dynamicBodyAngularDrag: number;

  /** Dynamic body mass */
  dynamicBodyMass: number;

  /** Dynamic body friction */
  dynamicBodyFriction: number;

  /** Dynamic body restitution */
  dynamicBodyRestitution: number;

  /** Dynamic body density */
  dynamicBodyDensity: number;

  /** Dynamic body gravity scale */
  dynamicBodyGravityScale: number;

  /** Dynamic body collide world bounds */
  dynamicBodyCollideWorldBounds: boolean;

  /** Dynamic body world bounds bounce */
  dynamicBodyWorldBoundsBounce: { x: number; y: number };

  /** Dynamic body world bounds friction */
  dynamicBodyWorldBoundsFriction: { x: number; y: number };

  /** Set dynamic body velocity */
  setDynamicBodyVelocity(x: number, y: number): this;

  /** Set dynamic body acceleration */
  setDynamicBodyAcceleration(x: number, y: number): this;

  /** Set dynamic body max velocity */
  setDynamicBodyMaxVelocity(x: number, y: number): this;

  /** Set dynamic body drag */
  setDynamicBodyDrag(x: number, y: number): this;

  /** Set dynamic body angular velocity */
  setDynamicBodyAngularVelocity(velocity: number): this;

  /** Set dynamic body angular acceleration */
  setDynamicBodyAngularAcceleration(acceleration: number): this;

  /** Set dynamic body max angular velocity */
  setDynamicBodyMaxAngularVelocity(velocity: number): this;

  /** Set dynamic body angular drag */
  setDynamicBodyAngularDrag(drag: number): this;

  /** Set dynamic body mass */
  setDynamicBodyMass(mass: number): this;

  /** Set dynamic body friction */
  setDynamicBodyFriction(friction: number): this;

  /** Set dynamic body restitution */
  setDynamicBodyRestitution(restitution: number): this;

  /** Set dynamic body density */
  setDynamicBodyDensity(density: number): this;

  /** Set dynamic body gravity scale */
  setDynamicBodyGravityScale(scale: number): this;

  /** Set dynamic body collide world bounds */
  setDynamicBodyCollideWorldBounds(collide: boolean): this;

  /** Set dynamic body world bounds bounce */
  setDynamicBodyWorldBoundsBounce(x: number, y: number): this;

  /** Set dynamic body world bounds friction */
  setDynamicBodyWorldBoundsFriction(x: number, y: number): this;

  /** Get dynamic body velocity */
  getDynamicBodyVelocity(): { x: number; y: number };

  /** Get dynamic body acceleration */
  getDynamicBodyAcceleration(): { x: number; y: number };

  /** Get dynamic body max velocity */
  getDynamicBodyMaxVelocity(): { x: number; y: number };

  /** Get dynamic body drag */
  getDynamicBodyDrag(): { x: number; y: number };

  /** Get dynamic body angular velocity */
  getDynamicBodyAngularVelocity(): number;

  /** Get dynamic body angular acceleration */
  getDynamicBodyAngularAcceleration(): number;

  /** Get dynamic body max angular velocity */
  getDynamicBodyMaxAngularVelocity(): number;

  /** Get dynamic body angular drag */
  getDynamicBodyAngularDrag(): number;

  /** Get dynamic body mass */
  getDynamicBodyMass(): number;

  /** Get dynamic body friction */
  getDynamicBodyFriction(): number;

  /** Get dynamic body restitution */
  getDynamicBodyRestitution(): number;

  /** Get dynamic body density */
  getDynamicBodyDensity(): number;

  /** Get dynamic body gravity scale */
  getDynamicBodyGravityScale(): number;

  /** Get dynamic body collide world bounds */
  getDynamicBodyCollideWorldBounds(): boolean;

  /** Get dynamic body world bounds bounce */
  getDynamicBodyWorldBoundsBounce(): { x: number; y: number };

  /** Get dynamic body world bounds friction */
  getDynamicBodyWorldBoundsFriction(): { x: number; y: number };

  /** Apply dynamic body force */
  applyDynamicBodyForce(force: { x: number; y: number }, point?: { x: number; y: number }): this;

  /** Apply dynamic body impulse */
  applyDynamicBodyImpulse(
    impulse: { x: number; y: number },
    point?: { x: number; y: number }
  ): this;

  /** Apply dynamic body torque */
  applyDynamicBodyTorque(torque: number): this;

  /** Check dynamic body collision with world bounds */
  checkDynamicBodyWorldBoundsCollision(): boolean;

  /** Get dynamic body world bounds collision info */
  getDynamicBodyWorldBoundsCollisionInfo(): {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
  };

  /** Get dynamic body kinetic energy */
  getDynamicBodyKineticEnergy(): number;

  /** Get dynamic body potential energy */
  getDynamicBodyPotentialEnergy(): number;

  /** Get dynamic body total energy */
  getDynamicBodyTotalEnergy(): number;

  /** Get dynamic body momentum */
  getDynamicBodyMomentum(): { x: number; y: number };

  /** Get dynamic body angular momentum */
  getDynamicBodyAngularMomentum(): number;

  /** Check if dynamic body is sleeping */
  isDynamicBodySleeping(): boolean;

  /** Wake up dynamic body */
  wakeUpDynamicBody(): this;

  /** Put dynamic body to sleep */
  sleepDynamicBody(): this;

  /** Update dynamic body */
  updateDynamicBody(deltaTime: number): void;
}
