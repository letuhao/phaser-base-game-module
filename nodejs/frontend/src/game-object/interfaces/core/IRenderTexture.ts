/**
 * Render Texture Interface
 *
 * Defines render texture-specific functionality for render-to-texture operations.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Interface for render texture game objects
 *
 * Extends IGameObject with render texture-specific functionality for
 * render-to-texture operations and off-screen rendering.
 */
export interface IRenderTexture extends IGameObject {
  readonly gameObjectType: GameObjectType.RENDER_TEXTURE;

  /** Render texture width */
  renderTextureWidth: number;

  /** Render texture height */
  renderTextureHeight: number;

  /** Render texture scale */
  renderTextureScale: number;

  /** Render texture camera */
  readonly renderTextureCamera: Phaser.Cameras.Scene2D.Camera;

  /** Render texture texture */
  readonly renderTextureTexture: Phaser.Textures.Texture;

  /** Render texture frame */
  readonly renderTextureFrame: Phaser.Textures.Frame;

  /** Set render texture size */
  setRenderTextureSize(width: number, height: number): this;

  /** Set render texture scale */
  setRenderTextureScale(scale: number): this;

  /** Clear render texture */
  clearRenderTexture(): this;

  /** Draw to render texture */
  drawToRenderTexture(gameObject: Phaser.GameObjects.GameObject): this;

  /** Get render texture texture */
  getRenderTextureTexture(): Phaser.Textures.Texture;

  /** Get render texture frame */
  getRenderTextureFrame(): Phaser.Textures.Frame;

  /** Get render texture camera */
  getRenderTextureCamera(): Phaser.Cameras.Scene2D.Camera;
}
