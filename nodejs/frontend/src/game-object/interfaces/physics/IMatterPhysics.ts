/**
 * Matter Physics Interface
 * 
 * Defines Matter.js physics-specific functionality for game objects.
 */

import type { IPhysicsObject } from './IPhysicsObject';
import { GameObjectType } from '../../enums/GameObjectEnums';
import { PhysicsShapeType } from '../../enums';
import * as Phaser from 'phaser';

/**
 * Interface for Matter physics game objects
 * 
 * Extends IPhysicsObject with Matter.js physics-specific functionality.
 */
export interface IMatterPhysics extends IPhysicsObject {
  readonly gameObjectType: GameObjectType;
  
  /** Matter physics body */
  readonly matterBody: any; // Matter.Body
  
  /** Matter physics world */
  readonly matterWorld: any; // Matter.World
  
  /** Set Matter physics body shape */
  setMatterBodyShape(shape: PhysicsShapeType): this;
  
  /** Set Matter physics body vertices */
  setMatterBodyVertices(vertices: Phaser.Geom.Point[]): this;
  
  /** Set Matter physics body chamfer */
  setMatterBodyChamfer(radius: number): this;
  
  /** Set Matter physics body slop */
  setMatterBodySlop(slop: number): this;
  
  /** Set Matter physics body friction air */
  setMatterBodyFrictionAir(friction: number): this;
  
  /** Set Matter physics body friction static */
  setMatterBodyFrictionStatic(friction: number): this;
  
  /** Set Matter physics body friction */
  setMatterBodyFriction(friction: number): this;
  
  /** Set Matter physics body restitution */
  setMatterBodyRestitution(restitution: number): this;
  
  /** Set Matter physics body density */
  setMatterBodyDensity(density: number): this;
  
  /** Set Matter physics body inertia */
  setMatterBodyInertia(inertia: number): this;
  
  /** Set Matter physics body inverse inertia */
  setMatterBodyInverseInertia(inertia: number): this;
  
  /** Set Matter physics body mass */
  setMatterBodyMass(mass: number): this;
  
  /** Set Matter physics body inverse mass */
  setMatterBodyInverseMass(mass: number): this;
  
  /** Set Matter physics body area */
  setMatterBodyArea(area: number): this;
  
  /** Set Matter physics body position */
  setMatterBodyPosition(x: number, y: number): this;
  
  /** Set Matter physics body angle */
  setMatterBodyAngle(angle: number): this;
  
  /** Set Matter physics body velocity */
  setMatterBodyVelocity(x: number, y: number): this;
  
  /** Set Matter physics body angular velocity */
  setMatterBodyAngularVelocity(velocity: number): this;
  
  /** Set Matter physics body force */
  setMatterBodyForce(x: number, y: number): this;
  
  /** Set Matter physics body torque */
  setMatterBodyTorque(torque: number): this;
  
  /** Set Matter physics body sleep threshold */
  setMatterBodySleepThreshold(threshold: number): this;
  
  /** Set Matter physics body sleep speed */
  setMatterBodySleepSpeed(speed: number): this;
  
  /** Set Matter physics body sleep time */
  setMatterBodySleepTime(time: number): this;
  
  /** Set Matter physics body is sleeping */
  setMatterBodyIsSleeping(sleeping: boolean): this;
  
  /** Set Matter physics body is static */
  setMatterBodyIsStatic(isStatic: boolean): this;
  
  /** Set Matter physics body is sensor */
  setMatterBodyIsSensor(sensor: boolean): this;
  
  /** Get Matter physics body */
  getMatterBody(): any;
  
  /** Get Matter physics world */
  getMatterWorld(): any;
  
  /** Get Matter physics body shape */
  getMatterBodyShape(): string;
  
  /** Get Matter physics body vertices */
  getMatterBodyVertices(): Phaser.Geom.Point[];
  
  /** Get Matter physics body chamfer */
  getMatterBodyChamfer(): number;
  
  /** Get Matter physics body slop */
  getMatterBodySlop(): number;
  
  /** Get Matter physics body friction air */
  getMatterBodyFrictionAir(): number;
  
  /** Get Matter physics body friction static */
  getMatterBodyFrictionStatic(): number;
  
  /** Get Matter physics body friction */
  getMatterBodyFriction(): number;
  
  /** Get Matter physics body restitution */
  getMatterBodyRestitution(): number;
  
  /** Get Matter physics body density */
  getMatterBodyDensity(): number;
  
  /** Get Matter physics body inertia */
  getMatterBodyInertia(): number;
  
  /** Get Matter physics body inverse inertia */
  getMatterBodyInverseInertia(): number;
  
  /** Get Matter physics body mass */
  getMatterBodyMass(): number;
  
  /** Get Matter physics body inverse mass */
  getMatterBodyInverseMass(): number;
  
  /** Get Matter physics body area */
  getMatterBodyArea(): number;
  
  /** Get Matter physics body position */
  getMatterBodyPosition(): { x: number; y: number };
  
  /** Get Matter physics body angle */
  getMatterBodyAngle(): number;
  
  /** Get Matter physics body velocity */
  getMatterBodyVelocity(): { x: number; y: number };
  
  /** Get Matter physics body angular velocity */
  getMatterBodyAngularVelocity(): number;
  
  /** Get Matter physics body force */
  getMatterBodyForce(): { x: number; y: number };
  
  /** Get Matter physics body torque */
  getMatterBodyTorque(): number;
  
  /** Get Matter physics body sleep threshold */
  getMatterBodySleepThreshold(): number;
  
  /** Get Matter physics body sleep speed */
  getMatterBodySleepSpeed(): number;
  
  /** Get Matter physics body sleep time */
  getMatterBodySleepTime(): number;
  
  /** Check if Matter physics body is sleeping */
  isMatterBodySleeping(): boolean;
  
  /** Check if Matter physics body is static */
  isMatterBodyStatic(): boolean;
  
  /** Check if Matter physics body is sensor */
  isMatterBodySensor(): boolean;
  
  /** Apply Matter physics force */
  applyMatterForce(force: { x: number; y: number }, point?: { x: number; y: number }): this;
  
  /** Apply Matter physics impulse */
  applyMatterImpulse(impulse: { x: number; y: number }, point?: { x: number; y: number }): this;
  
  /** Apply Matter physics torque */
  applyMatterTorque(torque: number): this;
  
  /** Wake up Matter physics body */
  wakeUpMatterBody(): this;
  
  /** Put Matter physics body to sleep */
  sleepMatterBody(): this;
  
  /** Update Matter physics body */
  updateMatterBody(deltaTime: number): void;
}
