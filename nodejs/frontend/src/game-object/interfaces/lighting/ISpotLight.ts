/**
 * Spot Light Interface
 *
 * Defines spot light functionality for game objects.
 * Handles conical lighting with falloff.
 */

import type { ILightObject } from './ILightObject';
import { GameObjectType } from '../../enums/GameObjectEnums';

/**
 * Interface for spot light game objects
 *
 * Extends ILightObject with spot light-specific functionality.
 */
export interface ISpotLight extends ILightObject {
  readonly gameObjectType: GameObjectType.SPOT_LIGHT;

  /** Spot light position */
  spotLightPosition: { x: number; y: number; z: number };

  /** Spot light target */
  spotLightTarget: { x: number; y: number; z: number };

  /** Spot light direction */
  spotLightDirection: { x: number; y: number; z: number };

  /** Spot light up vector */
  spotLightUp: { x: number; y: number; z: number };

  /** Spot light right vector */
  spotLightRight: { x: number; y: number; z: number };

  /** Spot light inner angle */
  spotLightInnerAngle: number;

  /** Spot light outer angle */
  spotLightOuterAngle: number;

  /** Spot light inner cone */
  spotLightInnerCone: number;

  /** Spot light outer cone */
  spotLightOuterCone: number;

  /** Spot light range */
  spotLightRange: number;

  /** Spot light near */
  spotLightNear: number;

  /** Spot light far */
  spotLightFar: number;

  /** Spot light aspect ratio */
  spotLightAspectRatio: number;

  /** Spot light fov */
  spotLightFov: number;

  /** Spot light shadow map size */
  spotLightShadowMapSize: number;

  /** Spot light shadow map bias */
  spotLightShadowMapBias: number;

  /** Spot light shadow map normal bias */
  spotLightShadowMapNormalBias: number;

  /** Spot light shadow map near */
  spotLightShadowMapNear: number;

  /** Spot light shadow map far */
  spotLightShadowMapFar: number;

  /** Spot light shadow map width */
  spotLightShadowMapWidth: number;

  /** Spot light shadow map height */
  spotLightShadowMapHeight: number;

  /** Spot light shadow map left */
  spotLightShadowMapLeft: number;

  /** Spot light shadow map right */
  spotLightShadowMapRight: number;

  /** Spot light shadow map top */
  spotLightShadowMapTop: number;

  /** Spot light shadow map bottom */
  spotLightShadowMapBottom: number;

  /** Set spot light position */
  setSpotLightPosition(x: number, y: number, z: number): this;

  /** Set spot light target */
  setSpotLightTarget(x: number, y: number, z: number): this;

  /** Set spot light direction */
  setSpotLightDirection(x: number, y: number, z: number): this;

  /** Set spot light up vector */
  setSpotLightUp(x: number, y: number, z: number): this;

  /** Set spot light right vector */
  setSpotLightRight(x: number, y: number, z: number): this;

  /** Set spot light inner angle */
  setSpotLightInnerAngle(angle: number): this;

  /** Set spot light outer angle */
  setSpotLightOuterAngle(angle: number): this;

  /** Set spot light inner cone */
  setSpotLightInnerCone(cone: number): this;

  /** Set spot light outer cone */
  setSpotLightOuterCone(cone: number): this;

  /** Set spot light range */
  setSpotLightRange(range: number): this;

  /** Set spot light near */
  setSpotLightNear(near: number): this;

  /** Set spot light far */
  setSpotLightFar(far: number): this;

  /** Set spot light aspect ratio */
  setSpotLightAspectRatio(ratio: number): this;

  /** Set spot light fov */
  setSpotLightFov(fov: number): this;

  /** Set spot light shadow map size */
  setSpotLightShadowMapSize(size: number): this;

  /** Set spot light shadow map bias */
  setSpotLightShadowMapBias(bias: number): this;

  /** Set spot light shadow map normal bias */
  setSpotLightShadowMapNormalBias(bias: number): this;

  /** Set spot light shadow map near */
  setSpotLightShadowMapNear(near: number): this;

  /** Set spot light shadow map far */
  setSpotLightShadowMapFar(far: number): this;

  /** Set spot light shadow map width */
  setSpotLightShadowMapWidth(width: number): this;

  /** Set spot light shadow map height */
  setSpotLightShadowMapHeight(height: number): this;

  /** Set spot light shadow map left */
  setSpotLightShadowMapLeft(left: number): this;

  /** Set spot light shadow map right */
  setSpotLightShadowMapRight(right: number): this;

  /** Set spot light shadow map top */
  setSpotLightShadowMapTop(top: number): this;

  /** Set spot light shadow map bottom */
  setSpotLightShadowMapBottom(bottom: number): this;

  /** Get spot light position */
  getSpotLightPosition(): { x: number; y: number; z: number };

  /** Get spot light target */
  getSpotLightTarget(): { x: number; y: number; z: number };

  /** Get spot light direction */
  getSpotLightDirection(): { x: number; y: number; z: number };

  /** Get spot light up vector */
  getSpotLightUp(): { x: number; y: number; z: number };

  /** Get spot light right vector */
  getSpotLightRight(): { x: number; y: number; z: number };

  /** Get spot light inner angle */
  getSpotLightInnerAngle(): number;

  /** Get spot light outer angle */
  getSpotLightOuterAngle(): number;

  /** Get spot light inner cone */
  getSpotLightInnerCone(): number;

  /** Get spot light outer cone */
  getSpotLightOuterCone(): number;

  /** Get spot light range */
  getSpotLightRange(): number;

  /** Get spot light near */
  getSpotLightNear(): number;

  /** Get spot light far */
  getSpotLightFar(): number;

  /** Get spot light aspect ratio */
  getSpotLightAspectRatio(): number;

  /** Get spot light fov */
  getSpotLightFov(): number;

  /** Get spot light shadow map size */
  getSpotLightShadowMapSize(): number;

  /** Get spot light shadow map bias */
  getSpotLightShadowMapBias(): number;

  /** Get spot light shadow map normal bias */
  getSpotLightShadowMapNormalBias(): number;

  /** Get spot light shadow map near */
  getSpotLightShadowMapNear(): number;

  /** Get spot light shadow map far */
  getSpotLightShadowMapFar(): number;

  /** Get spot light shadow map width */
  getSpotLightShadowMapWidth(): number;

  /** Get spot light shadow map height */
  getSpotLightShadowMapHeight(): number;

  /** Get spot light shadow map left */
  getSpotLightShadowMapLeft(): number;

  /** Get spot light shadow map right */
  getSpotLightShadowMapRight(): number;

  /** Get spot light shadow map top */
  getSpotLightShadowMapTop(): number;

  /** Get spot light shadow map bottom */
  getSpotLightShadowMapBottom(): number;

  /** Update spot light */
  updateSpotLight(deltaTime: number): void;
}
