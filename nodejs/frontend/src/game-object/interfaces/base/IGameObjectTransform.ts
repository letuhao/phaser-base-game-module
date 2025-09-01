/**
 * Game Object Transform Interface
 * 
 * Defines transform-related properties and methods for game objects.
 * This interface focuses solely on position, rotation, scale, and size concerns.
 */

import * as Phaser from 'phaser';

/**
 * Interface for game object transform properties and methods
 */
export interface IGameObjectTransform {
  // ============================================================================
  // TRANSFORM PROPERTIES
  // ============================================================================
  
  /** X position in world coordinates */
  gameObjectX: number;
  
  /** Y position in world coordinates */
  gameObjectY: number;
  
  /** Z position (depth) in world coordinates */
  gameObjectZ: number;
  
  /** X scale factor */
  gameObjectScaleX: number;
  
  /** Y scale factor */
  gameObjectScaleY: number;
  
  /** Rotation in radians */
  gameObjectRotation: number;
  
  /** Rotation in degrees */
  gameObjectAngle: number;
  
  /** X skew factor */
  gameObjectSkewX: number;
  
  /** Y skew factor */
  gameObjectSkewY: number;
  
  /** X origin point (0-1) */
  gameObjectOriginX: number;
  
  /** Y origin point (0-1) */
  gameObjectOriginY: number;
  
  /** Display width */
  gameObjectDisplayWidth: number;
  
  /** Display height */
  gameObjectDisplayHeight: number;
  
  /** Width of the game object */
  gameObjectWidth: number;
  
  /** Height of the game object */
  gameObjectHeight: number;
  
  // ============================================================================
  // TRANSFORM METHODS
  // ============================================================================
  
  /** Set position */
  setGameObjectPosition(x: number, y?: number, z?: number): this;
  
  /** Set scale */
  setGameObjectScale(x: number, y?: number): this;
  
  /** Set rotation */
  setGameObjectRotation(radians: number): this;
  
  /** Set angle */
  setGameObjectAngle(degrees: number): this;
  
  /** Set skew */
  setGameObjectSkew(x: number, y?: number): this;
  
  /** Set origin */
  setGameObjectOrigin(x: number, y?: number): this;
  
  /** Set size */
  setGameObjectSize(width: number, height: number): this;
  
  /** Set display size */
  setGameObjectDisplaySize(width: number, height: number): this;
  
  // ============================================================================
  // BOUNDS & GEOMETRY
  // ============================================================================
  
  /** Get bounds in local coordinates */
  getGameObjectBounds(): Phaser.Geom.Rectangle;
  
  /** Get bounds in world coordinates */
  getGameObjectWorldBounds(): Phaser.Geom.Rectangle;
  
  /** Get local transform matrix */
  getGameObjectLocalTransformMatrix(): Phaser.GameObjects.Components.TransformMatrix;
  
  /** Get world transform matrix */
  getGameObjectWorldTransformMatrix(): Phaser.GameObjects.Components.TransformMatrix;
}
