/**
 * Blitter Object Interface
 * 
 * Defines blitter object functionality for game objects.
 * Handles efficient sprite batching and rendering.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType, BlitterType, BlitterBlendMode } from '../../enums';
import * as Phaser from 'phaser';

/**
 * Interface for blitter game objects
 * 
 * Extends IGameObject with blitter-specific functionality.
 */
export interface IBlitterObject extends IGameObject {
  readonly gameObjectType: GameObjectType;
  
  /** Blitter type */
  blitterType: BlitterType;
  
  /** Blitter texture */
  blitterTexture: Phaser.Textures.Texture | null;
  
  /** Blitter frame */
  blitterFrame: Phaser.Textures.Frame | null;
  
  /** Blitter blend mode */
  blitterBlendMode: BlitterBlendMode;
  
  /** Blitter alpha */
  blitterAlpha: number;
  
  /** Blitter tint */
  blitterTint: number;
  
  /** Blitter flip x */
  blitterFlipX: boolean;
  
  /** Blitter flip y */
  blitterFlipY: boolean;
  
  /** Blitter scale x */
  blitterScaleX: number;
  
  /** Blitter scale y */
  blitterScaleY: number;
  
  /** Blitter rotation */
  blitterRotation: number;
  
  /** Blitter position x */
  blitterPositionX: number;
  
  /** Blitter position y */
  blitterPositionY: number;
  
  /** Blitter visible */
  blitterVisible: boolean;
  
  /** Blitter depth */
  blitterDepth: number;
  
  /** Blitter scroll factor x */
  blitterScrollFactorX: number;
  
  /** Blitter scroll factor y */
  blitterScrollFactorY: number;
  
  /** Blitter origin x */
  blitterOriginX: number;
  
  /** Blitter origin y */
  blitterOriginY: number;
  
  /** Blitter display origin x */
  blitterDisplayOriginX: number;
  
  /** Blitter display origin y */
  blitterDisplayOriginY: number;
  
  /** Blitter width */
  blitterWidth: number;
  
  /** Blitter height */
  blitterHeight: number;
  
  /** Blitter display width */
  blitterDisplayWidth: number;
  
  /** Blitter display height */
  blitterDisplayHeight: number;
  
  /** Set blitter type */
  setBlitterType(type: BlitterType): this;
  
  /** Set blitter texture */
  setBlitterTexture(texture: Phaser.Textures.Texture | null): this;
  
  /** Set blitter frame */
  setBlitterFrame(frame: Phaser.Textures.Frame | null): this;
  
  /** Set blitter blend mode */
  setBlitterBlendMode(mode: BlitterBlendMode): this;
  
  /** Set blitter alpha */
  setBlitterAlpha(alpha: number): this;
  
  /** Set blitter tint */
  setBlitterTint(tint: number): this;
  
  /** Set blitter flip x */
  setBlitterFlipX(flip: boolean): this;
  
  /** Set blitter flip y */
  setBlitterFlipY(flip: boolean): this;
  
  /** Set blitter scale x */
  setBlitterScaleX(scale: number): this;
  
  /** Set blitter scale y */
  setBlitterScaleY(scale: number): this;
  
  /** Set blitter rotation */
  setBlitterRotation(rotation: number): this;
  
  /** Set blitter position x */
  setBlitterPositionX(position: number): this;
  
  /** Set blitter position y */
  setBlitterPositionY(position: number): this;
  
  /** Set blitter visible */
  setBlitterVisible(visible: boolean): this;
  
  /** Set blitter depth */
  setBlitterDepth(depth: number): this;
  
  /** Set blitter scroll factor x */
  setBlitterScrollFactorX(factor: number): this;
  
  /** Set blitter scroll factor y */
  setBlitterScrollFactorY(factor: number): this;
  
  /** Set blitter origin x */
  setBlitterOriginX(origin: number): this;
  
  /** Set blitter origin y */
  setBlitterOriginY(origin: number): this;
  
  /** Set blitter display origin x */
  setBlitterDisplayOriginX(origin: number): this;
  
  /** Set blitter display origin y */
  setBlitterDisplayOriginY(origin: number): this;
  
  /** Set blitter width */
  setBlitterWidth(width: number): this;
  
  /** Set blitter height */
  setBlitterHeight(height: number): this;
  
  /** Set blitter display width */
  setBlitterDisplayWidth(width: number): this;
  
  /** Set blitter display height */
  setBlitterDisplayHeight(height: number): this;
  
  /** Get blitter type */
  getBlitterType(): BlitterType;
  
  /** Get blitter texture */
  getBlitterTexture(): Phaser.Textures.Texture | null;
  
  /** Get blitter frame */
  getBlitterFrame(): Phaser.Textures.Frame | null;
  
  /** Get blitter blend mode */
  getBlitterBlendMode(): BlitterBlendMode;
  
  /** Get blitter alpha */
  getBlitterAlpha(): number;
  
  /** Get blitter tint */
  getBlitterTint(): number;
  
  /** Get blitter flip x */
  getBlitterFlipX(): boolean;
  
  /** Get blitter flip y */
  getBlitterFlipY(): boolean;
  
  /** Get blitter scale x */
  getBlitterScaleX(): number;
  
  /** Get blitter scale y */
  getBlitterScaleY(): number;
  
  /** Get blitter rotation */
  getBlitterRotation(): number;
  
  /** Get blitter position x */
  getBlitterPositionX(): number;
  
  /** Get blitter position y */
  getBlitterPositionY(): number;
  
  /** Get blitter visible */
  getBlitterVisible(): boolean;
  
  /** Get blitter depth */
  getBlitterDepth(): number;
  
  /** Get blitter scroll factor x */
  getBlitterScrollFactorX(): number;
  
  /** Get blitter scroll factor y */
  getBlitterScrollFactorY(): number;
  
  /** Get blitter origin x */
  getBlitterOriginX(): number;
  
  /** Get blitter origin y */
  getBlitterOriginY(): number;
  
  /** Get blitter display origin x */
  getBlitterDisplayOriginX(): number;
  
  /** Get blitter display origin y */
  getBlitterDisplayOriginY(): number;
  
  /** Get blitter width */
  getBlitterWidth(): number;
  
  /** Get blitter height */
  getBlitterHeight(): number;
  
  /** Get blitter display width */
  getBlitterDisplayWidth(): number;
  
  /** Get blitter display height */
  getBlitterDisplayHeight(): number;
  
  /** Update blitter */
  updateBlitter(deltaTime: number): void;
}
