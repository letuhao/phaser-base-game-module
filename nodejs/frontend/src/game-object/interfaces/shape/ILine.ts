/**
 * Line Shape Interface
 *
 * Defines line-specific functionality for shape game objects.
 */

import * as Phaser from 'phaser';
import type { IShape } from './IShape';
import { ShapeType, LineCapType, LineJoinType } from '../../enums';

/**
 * Interface for line shape game objects
 *
 * Extends IShape with line-specific functionality for drawing
 * and manipulating line shapes.
 *
 * Example implementation:
 * ```typescript
 * class MyLine extends Phaser.GameObjects.Graphics implements ILine {
 *   readonly gameObjectType = 'shape' as const;
 *   readonly shapeType = 'line' as const;
 *   // Implementation
 * }
 * ```
 */
export interface ILine extends IShape {
  // ============================================================================
  // LINE IDENTITY
  // ============================================================================

  /** The specific type of shape (always 'line') */
  readonly shapeType: ShapeType.LINE;

  // ============================================================================
  // LINE PROPERTIES
  // ============================================================================

  /** Start point X */
  startX: number;

  /** Start point Y */
  startY: number;

  /** End point X */
  endX: number;

  /** End point Y */
  endY: number;

  /** Line width */
  lineWidth: number;

  /** Line cap style */
  lineCap: LineCapType;

  /** Line join style */
  lineJoin: LineJoinType;

  /** Miter limit for line joins */
  miterLimit: number;

  /** Line dash pattern */
  lineDash: number[];

  /** Line dash offset */
  lineDashOffset: number;

  // ============================================================================
  // LINE METHODS
  // ============================================================================

  /** Draw line */
  drawLine(x1: number, y1: number, x2: number, y2: number): this;

  /** Draw line from current point */
  lineTo(x: number, y: number): this;

  /** Move to point without drawing */
  moveTo(x: number, y: number): this;

  /** Set line start point */
  setStartPoint(x: number, y: number): this;

  /** Set line end point */
  setEndPoint(x: number, y: number): this;

  /** Set line cap style */
  setLineCap(cap: LineCapType): this;

  /** Set line join style */
  setLineJoin(join: LineJoinType): this;

  /** Set line dash pattern */
  setLineDash(dash: number[]): this;

  /** Get line length */
  getLineLength(): number;

  /** Get line angle */
  getLineAngle(): number;

  /** Get line midpoint */
  getLineMidpoint(): Phaser.Math.Vector2;

  /** Get point on line at distance */
  getPointOnLine(distance: number): Phaser.Math.Vector2;

  /** Get point on line at ratio (0-1) */
  getPointOnLineAtRatio(ratio: number): Phaser.Math.Vector2;

  /** Check if point is on line (within tolerance) */
  isPointOnLine(x: number, y: number, tolerance?: number): boolean;

  /** Get distance from point to line */
  getDistanceToLine(x: number, y: number): number;

  /** Check if line intersects with another line */
  intersectsLine(other: ILine): boolean;

  /** Get intersection point with another line */
  getIntersectionPoint(other: ILine): Phaser.Math.Vector2 | null;
}
