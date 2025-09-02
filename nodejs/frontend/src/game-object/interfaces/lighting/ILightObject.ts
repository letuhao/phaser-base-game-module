/**
 * Light Object Interface
 *
 * Defines base lighting functionality for game objects.
 * Provides common lighting properties and methods.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType, LightType, LightBlendMode } from '../../enums';
import * as Phaser from 'phaser';

/**
 * Interface for light game objects
 *
 * Extends IGameObject with base lighting functionality for
 * light management and control.
 */
export interface ILightObject extends IGameObject {
  readonly gameObjectType: GameObjectType;

  /** Light type */
  lightType: LightType;

  /** Light enabled */
  lightEnabled: boolean;

  /** Light visible */
  lightVisible: boolean;

  /** Light color */
  lightColor: number;

  /** Light intensity */
  lightIntensity: number;

  /** Light radius */
  lightRadius: number;

  /** Light angle */
  lightAngle: number;

  /** Light direction */
  lightDirection: { x: number; y: number };

  /** Light blend mode */
  lightBlendMode: LightBlendMode;

  /** Light attenuation */
  lightAttenuation: number;

  /** Light falloff */
  lightFalloff: number;

  /** Light shadow */
  lightShadow: boolean;

  /** Light shadow color */
  lightShadowColor: number;

  /** Light shadow intensity */
  lightShadowIntensity: number;

  /** Light shadow blur */
  lightShadowBlur: number;

  /** Light shadow offset */
  lightShadowOffset: { x: number; y: number };

  /** Light shadow size */
  lightShadowSize: { width: number; height: number };

  /** Light shadow quality */
  lightShadowQuality: number;

  /** Light shadow bias */
  lightShadowBias: number;

  /** Light shadow normal bias */
  lightShadowNormalBias: number;

  /** Light shadow near */
  lightShadowNear: number;

  /** Light shadow far */
  lightShadowFar: number;

  /** Light shadow camera */
  lightShadowCamera: Phaser.Cameras.Scene2D.Camera | null;

  /** Light shadow render texture */
  lightShadowRenderTexture: Phaser.GameObjects.RenderTexture | null;

  /** Set light type */
  setLightType(type: LightType): this;

  /** Set light enabled */
  setLightEnabled(enabled: boolean): this;

  /** Set light visible */
  setLightVisible(visible: boolean): this;

  /** Set light color */
  setLightColor(color: number): this;

  /** Set light intensity */
  setLightIntensity(intensity: number): this;

  /** Set light radius */
  setLightRadius(radius: number): this;

  /** Set light angle */
  setLightAngle(angle: number): this;

  /** Set light direction */
  setLightDirection(x: number, y: number): this;

  /** Set light blend mode */
  setLightBlendMode(mode: LightBlendMode): this;

  /** Set light attenuation */
  setLightAttenuation(attenuation: number): this;

  /** Set light falloff */
  setLightFalloff(falloff: number): this;

  /** Set light shadow */
  setLightShadow(shadow: boolean): this;

  /** Set light shadow color */
  setLightShadowColor(color: number): this;

  /** Set light shadow intensity */
  setLightShadowIntensity(intensity: number): this;

  /** Set light shadow blur */
  setLightShadowBlur(blur: number): this;

  /** Set light shadow offset */
  setLightShadowOffset(x: number, y: number): this;

  /** Set light shadow size */
  setLightShadowSize(width: number, height: number): this;

  /** Set light shadow quality */
  setLightShadowQuality(quality: number): this;

  /** Set light shadow bias */
  setLightShadowBias(bias: number): this;

  /** Set light shadow normal bias */
  setLightShadowNormalBias(bias: number): this;

  /** Set light shadow near */
  setLightShadowNear(near: number): this;

  /** Set light shadow far */
  setLightShadowFar(far: number): this;

  /** Get light type */
  getLightType(): LightType;

  /** Get light enabled */
  getLightEnabled(): boolean;

  /** Get light visible */
  getLightVisible(): boolean;

  /** Get light color */
  getLightColor(): number;

  /** Get light intensity */
  getLightIntensity(): number;

  /** Get light radius */
  getLightRadius(): number;

  /** Get light angle */
  getLightAngle(): number;

  /** Get light direction */
  getLightDirection(): { x: number; y: number };

  /** Get light blend mode */
  getLightBlendMode(): LightBlendMode;

  /** Get light attenuation */
  getLightAttenuation(): number;

  /** Get light falloff */
  getLightFalloff(): number;

  /** Get light shadow */
  getLightShadow(): boolean;

  /** Get light shadow color */
  getLightShadowColor(): number;

  /** Get light shadow intensity */
  getLightShadowIntensity(): number;

  /** Get light shadow blur */
  getLightShadowBlur(): number;

  /** Get light shadow offset */
  getLightShadowOffset(): { x: number; y: number };

  /** Get light shadow size */
  getLightShadowSize(): { width: number; height: number };

  /** Get light shadow quality */
  getLightShadowQuality(): number;

  /** Get light shadow bias */
  getLightShadowBias(): number;

  /** Get light shadow normal bias */
  getLightShadowNormalBias(): number;

  /** Get light shadow near */
  getLightShadowNear(): number;

  /** Get light shadow far */
  getLightShadowFar(): number;

  /** Get light shadow camera */
  getLightShadowCamera(): Phaser.Cameras.Scene2D.Camera | null;

  /** Get light shadow render texture */
  getLightShadowRenderTexture(): Phaser.GameObjects.RenderTexture | null;

  /** Update light */
  updateLight(deltaTime: number): void;
}
