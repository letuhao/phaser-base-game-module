/**
 * Graphics Interface
 * 
 * Defines graphics-specific functionality for drawing operations.
 * Graphics objects are used for procedural drawing and shape creation.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Graphics line styles
 */
export enum GraphicsLineStyle {
  SOLID = 'solid',
  DASHED = 'dashed',
  DOTTED = 'dotted',
  DASH_DOT = 'dash-dot',
  DASH_DOT_DOT = 'dash-dot-dot'
}

/**
 * Graphics fill styles
 */
export enum GraphicsFillStyle {
  SOLID = 'solid',
  GRADIENT = 'gradient',
  PATTERN = 'pattern',
  TEXTURE = 'texture'
}

/**
 * Graphics path commands
 */
export enum GraphicsPathCommand {
  MOVE_TO = 'moveTo',
  LINE_TO = 'lineTo',
  ARC = 'arc',
  ARC_TO = 'arcTo',
  BEZIER_CURVE_TO = 'bezierCurveTo',
  QUADRATIC_CURVE_TO = 'quadraticCurveTo',
  CLOSE_PATH = 'closePath'
}

/**
 * Interface for graphics game objects
 * 
 * Extends IGameObject with graphics-specific functionality for drawing,
 * shapes, and procedural graphics.
 * 
 * Example implementation:
 * ```typescript
 * class MyGraphics extends Phaser.GameObjects.Graphics implements IGraphics {
 *   readonly gameObjectType = GameObjectType.Graphics;
 *   // Implementation
 * }
 * ```
 */
export interface IGraphics extends IGameObject {
  // ============================================================================
  // GRAPHICS IDENTITY
  // ============================================================================
  
  /** The specific type of game object (always 'graphics') */
  readonly gameObjectType: GameObjectType.GRAPHICS;
  
  // ============================================================================
  // GRAPHICS PROPERTIES
  // ============================================================================
  
  /** Current line style */
  lineStyle: {
    width: number;
    color: number;
    alpha: number;
    style: GraphicsLineStyle;
  };
  
  /** Current fill style */
  fillStyle: {
    color: number;
    alpha: number;
    style: GraphicsFillStyle;
  };
  
  /** Current stroke style */
  strokeStyle: {
    width: number;
    color: number;
    alpha: number;
  };
  
  /** Graphics bounds */
  graphicsBounds: Phaser.Geom.Rectangle;
  
  /** Graphics path */
  graphicsPath: GraphicsPathCommand[];
  
  /** Graphics commands */
  graphicsCommands: any[];
  
  /** Graphics texture */
  graphicsTexture: Phaser.Textures.Texture | null;
  
  /** Graphics mask */
  graphicsMask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null;
  
  /** Graphics pipeline */
  graphicsPipeline: Phaser.Renderer.WebGL.WebGLPipeline;
  
  /** Graphics post pipeline */
  graphicsPostPipeline: Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[];
  
  // ============================================================================
  // GRAPHICS METHODS
  // ============================================================================
  
  /** Set line style */
  setGraphicsLineStyle(lineWidth: number, color: number, alpha?: number, style?: GraphicsLineStyle): this;
  
  /** Set fill style */
  setGraphicsFillStyle(color: number, alpha?: number, style?: GraphicsFillStyle): this;
  
  /** Set stroke style */
  setGraphicsStrokeStyle(lineWidth: number, color: number, alpha?: number): this;
  
  /** Clear graphics */
  clearGraphics(): this;
  
  /** Begin path */
  beginGraphicsPath(): this;
  
  /** Close path */
  closeGraphicsPath(): this;
  
  /** Move to point */
  moveGraphicsTo(x: number, y: number): this;
  
  /** Line to point */
  lineGraphicsTo(x: number, y: number): this;
  
  /** Arc */
  arcGraphics(x: number, y: number, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean): this;
  
  /** Arc to */
  arcGraphicsTo(x1: number, y1: number, x2: number, y2: number, radius: number): this;
  
  /** Bezier curve to */
  bezierCurveGraphicsTo(cpx: number, cpy: number, cpx2: number, cpy2: number, x: number, y: number): this;
  
  /** Quadratic curve to */
  quadraticCurveGraphicsTo(cpx: number, cpy: number, x: number, y: number): this;
  
  /** Fill rectangle */
  fillGraphicsRect(x: number, y: number, width: number, height: number): this;
  
  /** Stroke rectangle */
  strokeGraphicsRect(x: number, y: number, width: number, height: number): this;
  
  /** Fill rounded rectangle */
  fillGraphicsRoundedRect(x: number, y: number, width: number, height: number, radius?: number): this;
  
  /** Stroke rounded rectangle */
  strokeGraphicsRoundedRect(x: number, y: number, width: number, height: number, radius?: number): this;
  
  /** Fill circle */
  fillGraphicsCircle(x: number, y: number, radius: number): this;
  
  /** Stroke circle */
  strokeGraphicsCircle(x: number, y: number, radius: number): this;
  
  /** Fill ellipse */
  fillGraphicsEllipse(x: number, y: number, width: number, height: number): this;
  
  /** Stroke ellipse */
  strokeGraphicsEllipse(x: number, y: number, width: number, height: number): this;
  
  /** Fill triangle */
  fillGraphicsTriangle(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number): this;
  
  /** Stroke triangle */
  strokeGraphicsTriangle(x0: number, y0: number, x1: number, y1: number, x2: number, y2: number): this;
  
  /** Fill polygon */
  fillGraphicsPolygon(points: Phaser.Geom.Point[]): this;
  
  /** Stroke polygon */
  strokeGraphicsPolygon(points: Phaser.Geom.Point[]): this;
  
  /** Fill path */
  fillGraphicsPath(): this;
  
  /** Stroke path */
  strokeGraphicsPath(): this;
  
  /** Fill and stroke path */
  fillStrokeGraphicsPath(): this;
  
  /** Generate texture */
  generateGraphicsTexture(key: string, width?: number, height?: number): Phaser.Textures.Texture;
  
  /** Set graphics mask */
  setGraphicsMask(mask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null): this;
  
  /** Clear graphics mask */
  clearGraphicsMask(): this;
  
  /** Set graphics pipeline */
  setGraphicsPipeline(pipeline: string | Phaser.Renderer.WebGL.WebGLPipeline): this;
  
  /** Add graphics post pipeline */
  addGraphicsPostPipeline(pipeline: string | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline): this;
  
  /** Remove graphics post pipeline */
  removeGraphicsPostPipeline(pipeline: string | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline): this;
  
  /** Get line style */
  getGraphicsLineStyle(): { width: number; color: number; alpha: number; style: GraphicsLineStyle };
  
  /** Get fill style */
  getGraphicsFillStyle(): { color: number; alpha: number; style: GraphicsFillStyle };
  
  /** Get stroke style */
  getGraphicsStrokeStyle(): { width: number; color: number; alpha: number };
  
  /** Get graphics bounds */
  getGraphicsBounds(): Phaser.Geom.Rectangle;
  
  /** Get graphics path */
  getGraphicsPath(): GraphicsPathCommand[];
  
  /** Get graphics commands */
  getGraphicsCommands(): any[];
  
  /** Get graphics texture */
  getGraphicsTexture(): Phaser.Textures.Texture | null;
  
  /** Check if graphics has texture */
  hasGraphicsTexture(): boolean;
  
  /** Get graphics mask */
  getGraphicsMask(): Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null;
  
  /** Check if graphics has mask */
  hasGraphicsMask(): boolean;
  
  /** Get graphics pipeline */
  getGraphicsPipeline(): Phaser.Renderer.WebGL.WebGLPipeline;
  
  /** Get graphics post pipelines */
  getGraphicsPostPipelines(): Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[];
  
  /** Get graphics center */
  getGraphicsCenter(): Phaser.Geom.Point;
  
  /** Get graphics top left */
  getGraphicsTopLeft(): Phaser.Geom.Point;
  
  /** Get graphics top right */
  getGraphicsTopRight(): Phaser.Geom.Point;
  
  /** Get graphics bottom left */
  getGraphicsBottomLeft(): Phaser.Geom.Point;
  
  /** Get graphics bottom right */
  getGraphicsBottomRight(): Phaser.Geom.Point;
  
  /** Check if point is in graphics bounds */
  isPointInGraphicsBounds(x: number, y: number): boolean;
  
  /** Get graphics area */
  getGraphicsArea(): number;
  
  /** Get graphics perimeter */
  getGraphicsPerimeter(): number;
}
