/**
 * Physics Object Interface
 * 
 * Defines base physics functionality for game objects.
 * Provides common physics properties and methods.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType, PhysicsBodyType, PhysicsMaterialType } from '../../enums';
import * as Phaser from 'phaser';

/**
 * Interface for physics-enabled game objects
 * 
 * Extends IGameObject with base physics functionality for
 * physics simulation and collision detection.
 */
export interface IPhysicsObject extends IGameObject {
  // ============================================================================
  // PHYSICS IDENTITY
  // ============================================================================
  
  /** The specific type of game object (always 'physics') */
  readonly gameObjectType: GameObjectType;
  
  // ============================================================================
  // PHYSICS PROPERTIES
  // ============================================================================
  
  /** Physics body type */
  physicsBodyType: PhysicsBodyType;
  
  /** Physics material type */
  physicsMaterialType: PhysicsMaterialType;
  
  /** Physics enabled */
  physicsEnabled: boolean;
  
  /** Physics body */
  readonly physicsBody: any; // Phaser.Physics.Arcade.Body | Matter.Body
  
  /** Physics world */
  readonly physicsWorld: any; // Phaser.Physics.Arcade.World | Matter.World
  
  /** Physics velocity */
  physicsVelocity: { x: number; y: number };
  
  /** Physics acceleration */
  physicsAcceleration: { x: number; y: number };
  
  /** Physics angular velocity */
  physicsAngularVelocity: number;
  
  /** Physics angular acceleration */
  physicsAngularAcceleration: number;
  
  /** Physics mass */
  physicsMass: number;
  
  /** Physics friction */
  physicsFriction: number;
  
  /** Physics restitution (bounce) */
  physicsRestitution: number;
  
  /** Physics density */
  physicsDensity: number;
  
  /** Physics gravity scale */
  physicsGravityScale: number;
  
  /** Physics drag */
  physicsDrag: { x: number; y: number };
  
  /** Physics angular drag */
  physicsAngularDrag: number;
  
  /** Physics max velocity */
  physicsMaxVelocity: { x: number; y: number };
  
  /** Physics max angular velocity */
  physicsMaxAngularVelocity: number;
  
  /** Physics collision bounds */
  physicsCollisionBounds: Phaser.Geom.Rectangle | null;
  
  /** Physics collision enabled */
  physicsCollisionEnabled: boolean;
  
  /** Physics sensor mode */
  physicsSensorMode: boolean;
  
  // ============================================================================
  // PHYSICS METHODS
  // ============================================================================
  
  /** Set physics body type */
  setPhysicsBodyType(type: PhysicsBodyType): this;
  
  /** Set physics material type */
  setPhysicsMaterialType(type: PhysicsMaterialType): this;
  
  /** Enable physics */
  enablePhysics(): this;
  
  /** Disable physics */
  disablePhysics(): this;
  
  /** Set physics velocity */
  setPhysicsVelocity(x: number, y: number): this;
  
  /** Set physics acceleration */
  setPhysicsAcceleration(x: number, y: number): this;
  
  /** Set physics angular velocity */
  setPhysicsAngularVelocity(velocity: number): this;
  
  /** Set physics angular acceleration */
  setPhysicsAngularAcceleration(acceleration: number): this;
  
  /** Set physics mass */
  setPhysicsMass(mass: number): this;
  
  /** Set physics friction */
  setPhysicsFriction(friction: number): this;
  
  /** Set physics restitution */
  setPhysicsRestitution(restitution: number): this;
  
  /** Set physics density */
  setPhysicsDensity(density: number): this;
  
  /** Set physics gravity scale */
  setPhysicsGravityScale(scale: number): this;
  
  /** Set physics drag */
  setPhysicsDrag(x: number, y: number): this;
  
  /** Set physics angular drag */
  setPhysicsAngularDrag(drag: number): this;
  
  /** Set physics max velocity */
  setPhysicsMaxVelocity(x: number, y: number): this;
  
  /** Set physics max angular velocity */
  setPhysicsMaxAngularVelocity(velocity: number): this;
  
  /** Set physics collision bounds */
  setPhysicsCollisionBounds(bounds: Phaser.Geom.Rectangle): this;
  
  /** Enable physics collision */
  enablePhysicsCollision(): this;
  
  /** Disable physics collision */
  disablePhysicsCollision(): this;
  
  /** Set physics sensor mode */
  setPhysicsSensorMode(enabled: boolean): this;
  
  /** Apply physics force */
  applyPhysicsForce(force: { x: number; y: number }, point?: { x: number; y: number }): this;
  
  /** Apply physics impulse */
  applyPhysicsImpulse(impulse: { x: number; y: number }, point?: { x: number; y: number }): this;
  
  /** Apply physics torque */
  applyPhysicsTorque(torque: number): this;
  
  /** Get physics body type */
  getPhysicsBodyType(): PhysicsBodyType;
  
  /** Get physics material type */
  getPhysicsMaterialType(): PhysicsMaterialType;
  
  /** Check if physics is enabled */
  isPhysicsEnabled(): boolean;
  
  /** Get physics body */
  getPhysicsBody(): any;
  
  /** Get physics world */
  getPhysicsWorld(): any;
  
  /** Get physics velocity */
  getPhysicsVelocity(): { x: number; y: number };
  
  /** Get physics acceleration */
  getPhysicsAcceleration(): { x: number; y: number };
  
  /** Get physics angular velocity */
  getPhysicsAngularVelocity(): number;
  
  /** Get physics angular acceleration */
  getPhysicsAngularAcceleration(): number;
  
  /** Get physics mass */
  getPhysicsMass(): number;
  
  /** Get physics friction */
  getPhysicsFriction(): number;
  
  /** Get physics restitution */
  getPhysicsRestitution(): number;
  
  /** Get physics density */
  getPhysicsDensity(): number;
  
  /** Get physics gravity scale */
  getPhysicsGravityScale(): number;
  
  /** Get physics drag */
  getPhysicsDrag(): { x: number; y: number };
  
  /** Get physics angular drag */
  getPhysicsAngularDrag(): number;
  
  /** Get physics max velocity */
  getPhysicsMaxVelocity(): { x: number; y: number };
  
  /** Get physics max angular velocity */
  getPhysicsMaxAngularVelocity(): number;
  
  /** Get physics collision bounds */
  getPhysicsCollisionBounds(): Phaser.Geom.Rectangle | null;
  
  /** Check if physics collision is enabled */
  isPhysicsCollisionEnabled(): boolean;
  
  /** Check if physics sensor mode is enabled */
  isPhysicsSensorMode(): boolean;
  
  /** Get physics center of mass */
  getPhysicsCenterOfMass(): { x: number; y: number };
  
  /** Get physics moment of inertia */
  getPhysicsMomentOfInertia(): number;
  
  /** Get physics kinetic energy */
  getPhysicsKineticEnergy(): number;
  
  /** Get physics potential energy */
  getPhysicsPotentialEnergy(): number;
  
  /** Get physics total energy */
  getPhysicsTotalEnergy(): number;
  
  /** Get physics momentum */
  getPhysicsMomentum(): { x: number; y: number };
  
  /** Get physics angular momentum */
  getPhysicsAngularMomentum(): number;
  
  /** Check if physics body is sleeping */
  isPhysicsBodySleeping(): boolean;
  
  /** Wake up physics body */
  wakeUpPhysicsBody(): this;
  
  /** Put physics body to sleep */
  sleepPhysicsBody(): this;
  
  /** Update physics body */
  updatePhysicsBody(deltaTime: number): void;
}
