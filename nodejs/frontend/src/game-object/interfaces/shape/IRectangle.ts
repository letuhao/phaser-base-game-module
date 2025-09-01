/**
 * Rectangle Shape Interface
 * 
 * Defines rectangle-specific functionality for shape game objects.
 */

import * as Phaser from 'phaser';
import type { IShape } from './IShape';

/**
 * Interface for rectangle shape game objects
 * 
 * Extends IShape with rectangle-specific functionality for drawing
 * and manipulating rectangular shapes.
 * 
 * Example implementation:
 * ```typescript
 * class MyRectangle extends Phaser.GameObjects.Graphics implements IRectangle {
 *   readonly gameObjectType = 'shape' as const;
 *   readonly shapeType = 'rectangle' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IRectangle extends IShape {
  // ============================================================================
  // RECTANGLE IDENTITY
  // ============================================================================
  
  /** The specific type of shape (always 'rectangle') */
  readonly shapeType: 'rectangle';
  
  // ============================================================================
  // RECTANGLE PROPERTIES
  // ============================================================================
  
  /** Rectangle width */
  rectangleWidth: number;
  
  /** Rectangle height */
  rectangleHeight: number;
  
  /** Corner radius for rounded rectangles */
  cornerRadius: number;
  
  /** Whether corners are rounded */
  rounded: boolean;
  
  // ============================================================================
  // RECTANGLE METHODS
  // ============================================================================
  
  /** Draw rectangle */
  drawRectangle(x: number, y: number, width: number, height: number): this;
  
  /** Draw rounded rectangle */
  drawRoundedRectangle(x: number, y: number, width: number, height: number, radius: number): this;
  
  /** Set rectangle size */
  setRectangleSize(width: number, height: number): this;
  
  /** Set corner radius */
  setCornerRadius(radius: number): this;
  
  /** Get rectangle area */
  getRectangleArea(): number;
  
  /** Get rectangle perimeter */
  getRectanglePerimeter(): number;
  
  /** Check if point is inside rectangle */
  containsPoint(x: number, y: number): boolean;
  
  /** Get rectangle center */
  getRectangleCenter(): Phaser.Math.Vector2;
  
  /** Get rectangle corners */
  getRectangleCorners(): Phaser.Math.Vector2[];
  
  /** Check if rectangle intersects with another rectangle */
  intersectsRectangle(other: IRectangle): boolean;
  
  /** Check if rectangle contains another rectangle */
  containsRectangle(other: IRectangle): boolean;
}
