/**
 * Tile Sprite Interface
 * 
 * Defines tile sprite-specific functionality for tiled backgrounds.
 * Tile sprites are used for repeating patterns and backgrounds.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Tile sprite tile modes
 */
export enum TileSpriteTileMode {
  NORMAL = 'normal',
  REPEAT = 'repeat',
  MIRROR = 'mirror',
  CLAMP = 'clamp'
}

/**
 * Tile sprite blend modes
 */
export enum TileSpriteBlendMode {
  NORMAL = 'normal',
  ADD = 'add',
  MULTIPLY = 'multiply',
  SCREEN = 'screen',
  OVERLAY = 'overlay',
  DARKEN = 'darken',
  LIGHTEN = 'lighten',
  COLOR_DODGE = 'color-dodge',
  COLOR_BURN = 'color-burn',
  HARD_LIGHT = 'hard-light',
  SOFT_LIGHT = 'soft-light',
  DIFFERENCE = 'difference',
  EXCLUSION = 'exclusion',
  HUE = 'hue',
  SATURATION = 'saturation',
  COLOR = 'color',
  LUMINOSITY = 'luminosity'
}

/**
 * Interface for tile sprite game objects
 * 
 * Extends IGameObject with tile sprite-specific functionality for
 * tiled backgrounds and repeating patterns.
 * 
 * Example implementation:
 * ```typescript
 * class MyTileSprite extends Phaser.GameObjects.TileSprite implements ITileSprite {
 *   readonly gameObjectType = GameObjectType.TileSprite;
 *   // Implementation
 * }
 * ```
 */
export interface ITileSprite extends IGameObject {
  // ============================================================================
  // TILE SPRITE IDENTITY
  // ============================================================================
  
  /** The specific type of game object (always 'tileSprite') */
  readonly gameObjectType: GameObjectType.TILE_SPRITE;
  
  // ============================================================================
  // TILE SPRITE PROPERTIES
  // ============================================================================
  
  /** The texture key used by this tile sprite */
  tileTextureKey: string;
  
  /** The frame key used by this tile sprite */
  tileFrameKey: string | number;
  
  /** The Phaser texture object */
  readonly tileTexture: Phaser.Textures.Texture;
  
  /** The Phaser frame object */
  readonly tileFrame: Phaser.Textures.Frame;
  
  /** Tile sprite width */
  tileWidth: number;
  
  /** Tile sprite height */
  tileHeight: number;
  
  /** Tile sprite display width */
  tileDisplayWidth: number;
  
  /** Tile sprite display height */
  tileDisplayHeight: number;
  
  /** Tile position X */
  tilePositionX: number;
  
  /** Tile position Y */
  tilePositionY: number;
  
  /** Tile scale X */
  tileScaleX: number;
  
  /** Tile scale Y */
  tileScaleY: number;
  
  /** Tile rotation */
  tileRotation: number;
  
  /** Tile origin X (0-1) */
  tileOriginX: number;
  
  /** Tile origin Y (0-1) */
  tileOriginY: number;
  
  /** Tile flip X */
  tileFlipX: boolean;
  
  /** Tile flip Y */
  tileFlipY: boolean;
  
  /** Tile tint color */
  tileTint: number;
  
  /** Tile tint fill mode */
  tileTintFill: boolean;
  
  /** Tile blend mode */
  tileBlendMode: TileSpriteBlendMode;
  
  /** Tile mode */
  tileMode: TileSpriteTileMode;
  
  /** Tile mask */
  tileMask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null;
  
  /** Tile pipeline */
  tilePipeline: Phaser.Renderer.WebGL.WebGLPipeline;
  
  /** Tile post pipeline */
  tilePostPipeline: Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[];
  
  // ============================================================================
  // TILE SPRITE METHODS
  // ============================================================================
  
  /** Set tile sprite texture */
  setTileSpriteTexture(key: string, frame?: string | number): this;
  
  /** Set tile sprite frame */
  setTileSpriteFrame(frame: string | number): this;
  
  /** Set tile sprite size */
  setTileSpriteSize(width: number, height: number): this;
  
  /** Set tile sprite display size */
  setTileSpriteDisplaySize(width: number, height: number): this;
  
  /** Set tile position */
  setTilePosition(x: number, y: number): this;
  
  /** Set tile scale */
  setTileScale(x: number, y?: number): this;
  
  /** Set tile rotation */
  setTileRotation(rotation: number): this;
  
  /** Set tile origin */
  setTileOrigin(x: number, y?: number): this;
  
  /** Set tile flip */
  setTileFlip(flipX: boolean, flipY?: boolean): this;
  
  /** Set tile tint */
  setTileTint(tint: number): this;
  
  /** Set tile tint fill */
  setTileTintFill(tint: number): this;
  
  /** Clear tile tint */
  clearTileTint(): this;
  
  /** Set tile blend mode */
  setTileBlendMode(blendMode: TileSpriteBlendMode): this;
  
  /** Set tile mode */
  setTileMode(mode: TileSpriteTileMode): this;
  
  /** Set tile mask */
  setTileMask(mask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null): this;
  
  /** Clear tile mask */
  clearTileMask(): this;
  
  /** Set tile pipeline */
  setTilePipeline(pipeline: string | Phaser.Renderer.WebGL.WebGLPipeline): this;
  
  /** Add tile post pipeline */
  addTilePostPipeline(pipeline: string | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline): this;
  
  /** Remove tile post pipeline */
  removeTilePostPipeline(pipeline: string | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline): this;
  
  /** Get tile texture key */
  getTileTextureKey(): string;
  
  /** Get tile frame key */
  getTileFrameKey(): string | number;
  
  /** Get tile texture */
  getTileTexture(): Phaser.Textures.Texture;
  
  /** Get tile frame */
  getTileFrame(): Phaser.Textures.Frame;
  
  /** Get tile width */
  getTileWidth(): number;
  
  /** Get tile height */
  getTileHeight(): number;
  
  /** Get tile display width */
  getTileDisplayWidth(): number;
  
  /** Get tile display height */
  getTileDisplayHeight(): number;
  
  /** Get tile position */
  getTilePosition(): { x: number; y: number };
  
  /** Get tile scale */
  getTileScale(): { x: number; y: number };
  
  /** Get tile rotation */
  getTileRotation(): number;
  
  /** Get tile origin */
  getTileOrigin(): { x: number; y: number };
  
  /** Get tile flip */
  getTileFlip(): { x: boolean; y: boolean };
  
  /** Get tile tint */
  getTileTint(): number;
  
  /** Check if tile has tint */
  hasTileTint(): boolean;
  
  /** Get tile blend mode */
  getTileBlendMode(): TileSpriteBlendMode;
  
  /** Get tile mode */
  getTileMode(): TileSpriteTileMode;
  
  /** Get tile mask */
  getTileMask(): Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null;
  
  /** Check if tile has mask */
  hasTileMask(): boolean;
  
  /** Get tile pipeline */
  getTilePipeline(): Phaser.Renderer.WebGL.WebGLPipeline;
  
  /** Get tile post pipelines */
  getTilePostPipelines(): Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[];
  
  /** Refresh tile frame */
  refreshTileFrame(): this;
  
  /** Set tile size to frame */
  setTileSizeToFrame(frame?: Phaser.Textures.Frame): this;
  
  /** Get tile bounds */
  getTileBounds(): Phaser.Geom.Rectangle;
  
  /** Get tile local bounds */
  getTileLocalBounds(): Phaser.Geom.Rectangle;
  
  /** Check if point is in tile bounds */
  isPointInTileBounds(x: number, y: number): boolean;
  
  /** Get tile center */
  getTileCenter(): Phaser.Geom.Point;
  
  /** Get tile top left */
  getTileTopLeft(): Phaser.Geom.Point;
  
  /** Get tile top right */
  getTileTopRight(): Phaser.Geom.Point;
  
  /** Get tile bottom left */
  getTileBottomLeft(): Phaser.Geom.Point;
  
  /** Get tile bottom right */
  getTileBottomRight(): Phaser.Geom.Point;
  
  /** Get tile area */
  getTileArea(): number;
  
  /** Get tile perimeter */
  getTilePerimeter(): number;
  
  /** Get tile tile count */
  getTileTileCount(): { x: number; y: number };
  
  /** Get tile tile size */
  getTileTileSize(): { width: number; height: number };
  
  /** Get tile tile offset */
  getTileTileOffset(): { x: number; y: number };
  
  /** Set tile tile offset */
  setTileTileOffset(x: number, y: number): this;
  
  /** Get tile tile scale */
  getTileTileScale(): { x: number; y: number };
  
  /** Set tile tile scale */
  setTileTileScale(x: number, y: number): this;
  
  /** Get tile tile rotation */
  getTileTileRotation(): number;
  
  /** Set tile tile rotation */
  setTileTileRotation(rotation: number): this;
  
  /** Get tile tile flip */
  getTileTileFlip(): { x: boolean; y: boolean };
  
  /** Set tile tile flip */
  setTileTileFlip(flipX: boolean, flipY?: boolean): this;
}
