/**
 * Circle Shape Interface
 * 
 * Defines circle-specific functionality for shape game objects.
 */

import * as Phaser from 'phaser';
import type { IShape } from './IShape';
import { ShapeType } from '../../enums';

/**
 * Interface for circle shape game objects
 * 
 * Extends IShape with circle-specific functionality for drawing
 * and manipulating circular shapes.
 * 
 * Example implementation:
 * ```typescript
 * class MyCircle extends Phaser.GameObjects.Graphics implements ICircle {
 *   readonly gameObjectType = 'shape' as const;
 *   readonly shapeType = 'circle' as const;
 *   // Implementation
 * }
 * ```
 */
export interface ICircle extends IShape {
  // ============================================================================
  // CIRCLE IDENTITY
  // ============================================================================
  
  /** The specific type of shape (always 'circle') */
  readonly shapeType: ShapeType.CIRCLE;
  
  // ============================================================================
  // CIRCLE PROPERTIES
  // ============================================================================
  
  /** Circle radius */
  radius: number;
  
  /** Circle center X */
  centerX: number;
  
  /** Circle center Y */
  centerY: number;
  
  /** Start angle for partial circles */
  startAngle: number;
  
  /** End angle for partial circles */
  endAngle: number;
  
  /** Whether circle is complete (360 degrees) */
  complete: boolean;
  
  // ============================================================================
  // CIRCLE METHODS
  // ============================================================================
  
  /** Draw circle */
  drawCircle(x: number, y: number, radius: number): this;
  
  /** Draw partial circle (arc) */
  drawArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): this;
  
  /** Set circle radius */
  setRadius(radius: number): this;
  
  /** Set circle center */
  setCenter(x: number, y: number): this;
  
  /** Set arc angles */
  setArcAngles(startAngle: number, endAngle: number): this;
  
  /** Get circle area */
  getCircleArea(): number;
  
  /** Get circle circumference */
  getCircleCircumference(): number;
  
  /** Get arc length */
  getArcLength(): number;
  
  /** Check if point is inside circle */
  containsPoint(x: number, y: number): boolean;
  
  /** Get circle center */
  getCircleCenter(): Phaser.Math.Vector2;
  
  /** Get point on circle at angle */
  getPointOnCircle(angle: number): Phaser.Math.Vector2;
  
  /** Check if circle intersects with another circle */
  intersectsCircle(other: ICircle): boolean;
  
  /** Check if circle contains another circle */
  containsCircle(other: ICircle): boolean;
  
  /** Check if circle intersects with rectangle */
  intersectsRectangle(rectangle: Phaser.Geom.Rectangle): boolean;
}
