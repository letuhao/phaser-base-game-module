/**
 * Curve Shape Interface
 *
 * Defines curve-specific functionality for shape game objects.
 */

import * as Phaser from 'phaser';
import type { IShape } from './IShape';
import { ShapeType, CurveType } from '../../enums';

/**
 * Interface for curve shape game objects
 *
 * Extends IShape with curve-specific functionality for drawing
 * and manipulating curved shapes (Bezier, quadratic, etc.).
 *
 * Example implementation:
 * ```typescript
 * class MyCurve extends Phaser.GameObjects.Graphics implements ICurve {
 *   readonly gameObjectType = 'shape' as const;
 *   readonly shapeType = 'curve' as const;
 *   // Implementation
 * }
 * ```
 */
export interface ICurve extends IShape {
  // ============================================================================
  // CURVE IDENTITY
  // ============================================================================

  /** The specific type of shape (always 'curve') */
  readonly shapeType: ShapeType.CURVE;

  /** The type of curve */
  readonly curveType: CurveType;

  // ============================================================================
  // CURVE PROPERTIES
  // ============================================================================

  /** Control points for the curve */
  controlPoints: Phaser.Math.Vector2[];

  /** Number of segments for curve approximation */
  segments: number;

  /** Curve tension (for splines) */
  tension: number;

  /** Whether curve is closed */
  closed: boolean;

  /** Start point */
  startPoint: Phaser.Math.Vector2;

  /** End point */
  endPoint: Phaser.Math.Vector2;

  // ============================================================================
  // CURVE METHODS
  // ============================================================================

  /** Draw Bezier curve */
  drawBezierCurve(
    p0: Phaser.Math.Vector2,
    p1: Phaser.Math.Vector2,
    p2: Phaser.Math.Vector2,
    p3?: Phaser.Math.Vector2
  ): this;

  /** Draw quadratic curve */
  drawQuadraticCurve(
    p0: Phaser.Math.Vector2,
    p1: Phaser.Math.Vector2,
    p2: Phaser.Math.Vector2
  ): this;

  /** Draw cubic curve */
  drawCubicCurve(
    p0: Phaser.Math.Vector2,
    p1: Phaser.Math.Vector2,
    p2: Phaser.Math.Vector2,
    p3: Phaser.Math.Vector2
  ): this;

  /** Draw spline curve */
  drawSplineCurve(points: Phaser.Math.Vector2[], tension?: number): this;

  /** Add control point */
  addControlPoint(x: number, y: number): this;

  /** Remove control point at index */
  removeControlPoint(index: number): this;

  /** Set control point at index */
  setControlPoint(index: number, x: number, y: number): this;

  /** Get control point at index */
  getControlPoint(index: number): Phaser.Math.Vector2 | undefined;

  /** Set control points */
  setControlPoints(points: Phaser.Math.Vector2[]): this;

  /** Get control points */
  getControlPoints(): Phaser.Math.Vector2[];

  /** Set curve segments */
  setSegments(segments: number): this;

  /** Set curve tension */
  setTension(tension: number): this;

  /** Set whether curve is closed */
  setClosed(closed: boolean): this;

  /** Get point on curve at t (0-1) */
  getPointOnCurve(t: number): Phaser.Math.Vector2;

  /** Get tangent at point on curve */
  getTangentOnCurve(t: number): Phaser.Math.Vector2;

  /** Get normal at point on curve */
  getNormalOnCurve(t: number): Phaser.Math.Vector2;

  /** Get curve length */
  getCurveLength(): number;

  /** Get curve bounds */
  getCurveBounds(): Phaser.Geom.Rectangle;

  /** Check if point is on curve (within tolerance) */
  isPointOnCurve(x: number, y: number, tolerance?: number): boolean;

  /** Get distance from point to curve */
  getDistanceToCurve(x: number, y: number): number;

  /** Get closest point on curve to given point */
  getClosestPointOnCurve(x: number, y: number): Phaser.Math.Vector2;

  /** Subdivide curve into segments */
  subdivideCurve(segments: number): Phaser.Math.Vector2[];

  /** Reverse curve direction */
  reverseCurve(): this;

  /** Offset curve by distance */
  offsetCurve(distance: number): ICurve;
}
