/**
 * Polygon Shape Interface
 * 
 * Defines polygon-specific functionality for shape game objects.
 */

import * as Phaser from 'phaser';
import type { IShape } from './IShape';

/**
 * Interface for polygon shape game objects
 * 
 * Extends IShape with polygon-specific functionality for drawing
 * and manipulating polygonal shapes.
 * 
 * Example implementation:
 * ```typescript
 * class MyPolygon extends Phaser.GameObjects.Graphics implements IPolygon {
 *   readonly gameObjectType = 'shape' as const;
 *   readonly shapeType = 'polygon' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IPolygon extends IShape {
  // ============================================================================
  // POLYGON IDENTITY
  // ============================================================================
  
  /** The specific type of shape (always 'polygon') */
  readonly shapeType: 'polygon';
  
  // ============================================================================
  // POLYGON PROPERTIES
  // ============================================================================
  
  /** Array of polygon vertices */
  vertices: Phaser.Math.Vector2[];
  
  /** Whether polygon is closed */
  closed: boolean;
  
  /** Whether polygon is convex */
  convex: boolean;
  
  /** Whether polygon is regular (all sides equal) */
  regular: boolean;
  
  /** Number of sides */
  readonly sides: number;
  
  // ============================================================================
  // POLYGON METHODS
  // ============================================================================
  
  /** Draw polygon from vertices */
  drawPolygon(vertices: Phaser.Math.Vector2[]): this;
  
  /** Draw regular polygon */
  drawRegularPolygon(x: number, y: number, sides: number, radius: number, rotation?: number): this;
  
  /** Add vertex to polygon */
  addVertex(x: number, y: number): this;
  
  /** Remove vertex at index */
  removeVertex(index: number): this;
  
  /** Set vertex at index */
  setVertex(index: number, x: number, y: number): this;
  
  /** Get vertex at index */
  getVertex(index: number): Phaser.Math.Vector2 | undefined;
  
  /** Clear all vertices */
  clearVertices(): this;
  
  /** Set polygon vertices */
  setVertices(vertices: Phaser.Math.Vector2[]): this;
  
  /** Get polygon vertices */
  getVertices(): Phaser.Math.Vector2[];
  
  /** Set whether polygon is closed */
  setClosed(closed: boolean): this;
  
  /** Get polygon area */
  getPolygonArea(): number;
  
  /** Get polygon perimeter */
  getPolygonPerimeter(): number;
  
  /** Get polygon center */
  getPolygonCenter(): Phaser.Math.Vector2;
  
  /** Get polygon centroid */
  getPolygonCentroid(): Phaser.Math.Vector2;
  
  /** Check if point is inside polygon */
  containsPoint(x: number, y: number): boolean;
  
  /** Get polygon bounds */
  getPolygonBounds(): Phaser.Geom.Rectangle;
  
  /** Check if polygon is convex */
  isConvex(): boolean;
  
  /** Check if polygon is regular */
  isRegular(): boolean;
  
  /** Triangulate polygon */
  triangulate(): Phaser.Geom.Triangle[];
  
  /** Get polygon edges */
  getPolygonEdges(): Phaser.Geom.Line[];
  
  /** Check if polygon intersects with another polygon */
  intersectsPolygon(other: IPolygon): boolean;
  
  /** Check if polygon contains another polygon */
  containsPolygon(other: IPolygon): boolean;
  
  /** Scale polygon */
  scalePolygon(scaleX: number, scaleY: number): this;
  
  /** Rotate polygon around center */
  rotatePolygon(angle: number): this;
  
  /** Translate polygon */
  translatePolygon(x: number, y: number): this;
}
