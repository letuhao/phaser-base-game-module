/**
 * Sprite Interface
 * 
 * Defines sprite-specific functionality for game objects.
 * Sprites are the most fundamental game object type in Phaser.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Sprite blend modes
 */
export enum SpriteBlendMode {
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
 * Sprite crop modes
 */
export enum SpriteCropMode {
  NONE = 'none',
  MANUAL = 'manual',
  AUTO = 'auto',
  FRAME = 'frame'
}

/**
 * Interface for sprite game objects
 * 
 * Extends IGameObject with sprite-specific functionality for texture management,
 * animation, and rendering.
 * 
 * Example implementation:
 * ```typescript
 * class MySprite extends Phaser.GameObjects.Sprite implements ISprite {
 *   readonly gameObjectType = GameObjectType.Sprite;
 *   // Implementation
 * }
 * ```
 */
export interface ISprite extends IGameObject {
  // ============================================================================
  // SPRITE IDENTITY
  // ============================================================================
  
  /** The specific type of game object (always 'sprite') */
  readonly gameObjectType: GameObjectType.SPRITE;
  
  // ============================================================================
  // SPRITE PROPERTIES
  // ============================================================================
  
  /** The texture key used by this sprite */
  textureKey: string;
  
  /** The frame key used by this sprite */
  frameKey: string | number;
  
  /** The Phaser texture object */
  readonly texture: Phaser.Textures.Texture;
  
  /** The Phaser frame object */
  readonly frame: Phaser.Textures.Frame;
  
  /** Sprite width */
  width: number;
  
  /** Sprite height */
  height: number;
  
  /** Sprite display width */
  displayWidth: number;
  
  /** Sprite display height */
  displayHeight: number;
  
  /** Sprite origin X (0-1) */
  originX: number;
  
  /** Sprite origin Y (0-1) */
  originY: number;
  
  /** Sprite flip X */
  flipX: boolean;
  
  /** Sprite flip Y */
  flipY: boolean;
  
  /** Sprite tint color */
  tint: number;
  
  /** Sprite tint fill mode */
  tintFill: boolean;
  
  /** Sprite blend mode */
  blendMode: SpriteBlendMode;
  
  /** Sprite crop mode */
  cropMode: SpriteCropMode;
  
  /** Sprite crop rectangle */
  cropRect: Phaser.Geom.Rectangle | null;
  
  /** Sprite mask */
  mask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null;
  
  /** Sprite pipeline */
  pipeline: Phaser.Renderer.WebGL.WebGLPipeline;
  
  /** Sprite post pipeline */
  postPipeline: Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[];
  
  // ============================================================================
  // SPRITE METHODS
  // ============================================================================
  
  /** Set sprite texture */
  setSpriteTexture(key: string, frame?: string | number): this;
  
  /** Set sprite frame */
  setSpriteFrame(frame: string | number): this;
  
  /** Set sprite size */
  setSpriteSize(width: number, height: number): this;
  
  /** Set sprite display size */
  setSpriteDisplaySize(width: number, height: number): this;
  
  /** Set sprite origin */
  setSpriteOrigin(x: number, y?: number): this;
  
  /** Set sprite flip */
  setSpriteFlip(flipX: boolean, flipY?: boolean): this;
  
  /** Set sprite tint */
  setSpriteTint(tint: number): this;
  
  /** Set sprite tint fill */
  setSpriteTintFill(tint: number): this;
  
  /** Clear sprite tint */
  clearSpriteTint(): this;
  
  /** Set sprite blend mode */
  setSpriteBlendMode(blendMode: SpriteBlendMode): this;
  
  /** Set sprite crop */
  setSpriteCrop(x?: number, y?: number, width?: number, height?: number): this;
  
  /** Set sprite crop from frame */
  setSpriteCropFromFrame(frame: Phaser.Textures.Frame): this;
  
  /** Clear sprite crop */
  clearSpriteCrop(): this;
  
  /** Set sprite mask */
  setSpriteMask(mask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null): this;
  
  /** Clear sprite mask */
  clearSpriteMask(): this;
  
  /** Set sprite pipeline */
  setSpritePipeline(pipeline: string | Phaser.Renderer.WebGL.WebGLPipeline): this;
  
  /** Add sprite post pipeline */
  addSpritePostPipeline(pipeline: string | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline): this;
  
  /** Remove sprite post pipeline */
  removeSpritePostPipeline(pipeline: string | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline): this;
  
  /** Get sprite texture key */
  getSpriteTextureKey(): string;
  
  /** Get sprite frame key */
  getSpriteFrameKey(): string | number;
  
  /** Get sprite texture */
  getSpriteTexture(): Phaser.Textures.Texture;
  
  /** Get sprite frame */
  getSpriteFrame(): Phaser.Textures.Frame;
  
  /** Get sprite width */
  getSpriteWidth(): number;
  
  /** Get sprite height */
  getSpriteHeight(): number;
  
  /** Get sprite display width */
  getSpriteDisplayWidth(): number;
  
  /** Get sprite display height */
  getSpriteDisplayHeight(): number;
  
  /** Get sprite origin */
  getSpriteOrigin(): { x: number; y: number };
  
  /** Get sprite flip */
  getSpriteFlip(): { x: boolean; y: boolean };
  
  /** Get sprite tint */
  getSpriteTint(): number;
  
  /** Check if sprite has tint */
  hasSpriteTint(): boolean;
  
  /** Get sprite blend mode */
  getSpriteBlendMode(): SpriteBlendMode;
  
  /** Get sprite crop mode */
  getSpriteCropMode(): SpriteCropMode;
  
  /** Get sprite crop rectangle */
  getSpriteCropRect(): Phaser.Geom.Rectangle | null;
  
  /** Check if sprite is cropped */
  isSpriteCropped(): boolean;
  
  /** Get sprite mask */
  getSpriteMask(): Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null;
  
  /** Check if sprite has mask */
  hasSpriteMask(): boolean;
  
  /** Get sprite pipeline */
  getSpritePipeline(): Phaser.Renderer.WebGL.WebGLPipeline;
  
  /** Get sprite post pipelines */
  getSpritePostPipelines(): Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[];
  
  /** Refresh sprite frame */
  refreshSpriteFrame(): this;
  
  /** Set sprite size to frame */
  setSpriteSizeToFrame(frame?: Phaser.Textures.Frame): this;
  
  /** Get sprite bounds */
  getSpriteBounds(): Phaser.Geom.Rectangle;
  
  /** Get sprite local bounds */
  getSpriteLocalBounds(): Phaser.Geom.Rectangle;
  
  /** Check if point is in sprite bounds */
  isPointInSpriteBounds(x: number, y: number): boolean;
  
  /** Get sprite center */
  getSpriteCenter(): Phaser.Geom.Point;
  
  /** Get sprite top left */
  getSpriteTopLeft(): Phaser.Geom.Point;
  
  /** Get sprite top right */
  getSpriteTopRight(): Phaser.Geom.Point;
  
  /** Get sprite bottom left */
  getSpriteBottomLeft(): Phaser.Geom.Point;
  
  /** Get sprite bottom right */
  getSpriteBottomRight(): Phaser.Geom.Point;
}
