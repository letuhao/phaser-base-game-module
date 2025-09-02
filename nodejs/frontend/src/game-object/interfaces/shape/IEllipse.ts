/**
 * Ellipse Shape Interface
 * 
 * Defines ellipse-specific functionality for shape game objects.
 */

import * as Phaser from 'phaser';
import type { IShape } from './IShape';
import { ShapeType } from '../../enums';

/**
 * Interface for ellipse shape game objects
 * 
 * Extends IShape with ellipse-specific functionality for drawing
 * and manipulating elliptical shapes.
 * 
 * Example implementation:
 * ```typescript
 * class MyEllipse extends Phaser.GameObjects.Graphics implements IEllipse {
 *   readonly gameObjectType = 'shape' as const;
 *   readonly shapeType = 'ellipse' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IEllipse extends IShape {
  // ============================================================================
  // ELLIPSE IDENTITY
  // ============================================================================
  
  /** The specific type of shape (always 'ellipse') */
  readonly shapeType: ShapeType.ELLIPSE;
  
  // ============================================================================
  // ELLIPSE PROPERTIES
  // ============================================================================
  
  /** Ellipse width (major axis) */
  ellipseWidth: number;
  
  /** Ellipse height (minor axis) */
  ellipseHeight: number;
  
  /** Ellipse center X */
  centerX: number;
  
  /** Ellipse center Y */
  centerY: number;
  
  /** Start angle for partial ellipses */
  startAngle: number;
  
  /** End angle for partial ellipses */
  endAngle: number;
  
  /** Whether ellipse is complete (360 degrees) */
  complete: boolean;
  
  // ============================================================================
  // ELLIPSE METHODS
  // ============================================================================
  
  /** Draw ellipse */
  drawEllipse(x: number, y: number, width: number, height: number): this;
  
  /** Draw partial ellipse (arc) */
  drawEllipseArc(x: number, y: number, width: number, height: number, startAngle: number, endAngle: number): this;
  
  /** Set ellipse size */
  setEllipseSize(width: number, height: number): this;
  
  /** Set ellipse center */
  setEllipseCenter(x: number, y: number): this;
  
  /** Set ellipse arc angles */
  setEllipseArcAngles(startAngle: number, endAngle: number): this;
  
  /** Get ellipse area */
  getEllipseArea(): number;
  
  /** Get ellipse perimeter (approximation) */
  getEllipsePerimeter(): number;
  
  /** Get ellipse arc length */
  getEllipseArcLength(): number;
  
  /** Check if point is inside ellipse */
  containsPoint(x: number, y: number): boolean;
  
  /** Get ellipse center */
  getEllipseCenter(): Phaser.Math.Vector2;
  
  /** Get point on ellipse at angle */
  getPointOnEllipse(angle: number): Phaser.Math.Vector2;
  
  /** Get ellipse foci */
  getEllipseFoci(): Phaser.Math.Vector2[];
  
  /** Get ellipse eccentricity */
  getEllipseEccentricity(): number;
  
  /** Check if ellipse intersects with another ellipse */
  intersectsEllipse(other: IEllipse): boolean;
  
  /** Check if ellipse contains another ellipse */
  containsEllipse(other: IEllipse): boolean;
}
