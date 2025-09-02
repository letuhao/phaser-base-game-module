/**
 * Shape Game Object Interface
 * 
 * Defines shape-specific functionality for game objects.
 * This interface extends IGameObject with shape-specific features.
 */

import * as Phaser from 'phaser';
import type { IGameObject } from '../IGameObject';
import { GameObjectType, ShapeType } from '../../enums';

/**
 * Interface for shape game objects
 * 
 * Extends IGameObject with shape-specific functionality for geometric shapes,
 * drawing operations, and shape-specific behaviors.
 * 
 * Example implementation:
 * ```typescript
 * class MyShape extends Phaser.GameObjects.Graphics implements IShape {
 *   readonly gameObjectType = 'shape' as const;
 *   readonly shapeType = 'rectangle' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IShape extends IGameObject {
  // ============================================================================
  // SHAPE IDENTITY
  // ============================================================================
  
  /** The type of this game object (always 'shape') */
  readonly gameObjectType: GameObjectType;
  
  /** The specific type of shape */
  readonly shapeType: ShapeType;
  
  // ============================================================================
  // SHAPE PROPERTIES
  // ============================================================================
  
  /** Fill color */
  fillColor: number;
  
  /** Fill alpha */
  fillAlpha: number;
  
  /** Line color */
  lineColor: number;
  
  /** Line alpha */
  lineAlpha: number;
  
  /** Line width */
  lineWidth: number;
  
  /** Whether shape is filled */
  filled: boolean;
  
  /** Whether shape has stroke */
  stroked: boolean;
  
  /** Shape bounds */
  readonly shapeBounds: Phaser.Geom.Rectangle;
  
  // ============================================================================
  // SHAPE METHODS
  // ============================================================================
  
  /** Set fill style */
  setFillStyle(color: number, alpha?: number): this;
  
  /** Set line style */
  setLineStyle(lineWidth: number, color: number, alpha?: number): this;
  
  /** Clear the shape */
  clear(): this;
  
  /** Begin path */
  beginPath(): this;
  
  /** Close path */
  closePath(): this;
  
  /** Fill the current path */
  fill(): this;
  
  /** Stroke the current path */
  stroke(): this;
  
  /** Fill and stroke the current path */
  fillStroke(): this;
  
  /** Get shape area */
  getShapeArea(): number;
  
  /** Get shape perimeter */
  getShapePerimeter(): number;
  
  /** Check if point is inside shape */
  containsPoint(x: number, y: number): boolean;
  
  /** Get shape center point */
  getShapeCenter(): Phaser.Math.Vector2;
  
  /** Scale shape */
  scaleShape(scaleX: number, scaleY?: number): this;
  
  /** Rotate shape */
  rotateShape(angle: number): this;
  
  /** Translate shape */
  translateShape(x: number, y: number): this;
}
