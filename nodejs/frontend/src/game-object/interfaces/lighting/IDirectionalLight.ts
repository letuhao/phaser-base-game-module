/**
 * Directional Light Interface
 * 
 * Defines directional light functionality for game objects.
 * Handles parallel lighting from a specific direction.
 */

import type { ILightObject } from './ILightObject';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Interface for directional light game objects
 * 
 * Extends ILightObject with directional light-specific functionality.
 */
export interface IDirectionalLight extends ILightObject {
  readonly gameObjectType: GameObjectType.DIRECTIONAL_LIGHT;
  
  /** Directional light direction */
  directionalLightDirection: { x: number; y: number; z: number };
  
  /** Directional light target */
  directionalLightTarget: { x: number; y: number; z: number };
  
  /** Directional light up vector */
  directionalLightUp: { x: number; y: number; z: number };
  
  /** Directional light right vector */
  directionalLightRight: { x: number; y: number; z: number };
  
  /** Directional light distance */
  directionalLightDistance: number;
  
  /** Directional light width */
  directionalLightWidth: number;
  
  /** Directional light height */
  directionalLightHeight: number;
  
  /** Directional light near */
  directionalLightNear: number;
  
  /** Directional light far */
  directionalLightFar: number;
  
  /** Directional light orthographic */
  directionalLightOrthographic: boolean;
  
  /** Directional light orthographic size */
  directionalLightOrthographicSize: number;
  
  /** Directional light perspective fov */
  directionalLightPerspectiveFov: number;
  
  /** Directional light perspective aspect */
  directionalLightPerspectiveAspect: number;
  
  /** Directional light shadow map size */
  directionalLightShadowMapSize: number;
  
  /** Directional light shadow map bias */
  directionalLightShadowMapBias: number;
  
  /** Directional light shadow map normal bias */
  directionalLightShadowMapNormalBias: number;
  
  /** Directional light shadow map near */
  directionalLightShadowMapNear: number;
  
  /** Directional light shadow map far */
  directionalLightShadowMapFar: number;
  
  /** Directional light shadow map width */
  directionalLightShadowMapWidth: number;
  
  /** Directional light shadow map height */
  directionalLightShadowMapHeight: number;
  
  /** Directional light shadow map left */
  directionalLightShadowMapLeft: number;
  
  /** Directional light shadow map right */
  directionalLightShadowMapRight: number;
  
  /** Directional light shadow map top */
  directionalLightShadowMapTop: number;
  
  /** Directional light shadow map bottom */
  directionalLightShadowMapBottom: number;
  
  /** Set directional light direction */
  setDirectionalLightDirection(x: number, y: number, z: number): this;
  
  /** Set directional light target */
  setDirectionalLightTarget(x: number, y: number, z: number): this;
  
  /** Set directional light up vector */
  setDirectionalLightUp(x: number, y: number, z: number): this;
  
  /** Set directional light right vector */
  setDirectionalLightRight(x: number, y: number, z: number): this;
  
  /** Set directional light distance */
  setDirectionalLightDistance(distance: number): this;
  
  /** Set directional light width */
  setDirectionalLightWidth(width: number): this;
  
  /** Set directional light height */
  setDirectionalLightHeight(height: number): this;
  
  /** Set directional light near */
  setDirectionalLightNear(near: number): this;
  
  /** Set directional light far */
  setDirectionalLightFar(far: number): this;
  
  /** Set directional light orthographic */
  setDirectionalLightOrthographic(orthographic: boolean): this;
  
  /** Set directional light orthographic size */
  setDirectionalLightOrthographicSize(size: number): this;
  
  /** Set directional light perspective fov */
  setDirectionalLightPerspectiveFov(fov: number): this;
  
  /** Set directional light perspective aspect */
  setDirectionalLightPerspectiveAspect(aspect: number): this;
  
  /** Set directional light shadow map size */
  setDirectionalLightShadowMapSize(size: number): this;
  
  /** Set directional light shadow map bias */
  setDirectionalLightShadowMapBias(bias: number): this;
  
  /** Set directional light shadow map normal bias */
  setDirectionalLightShadowMapNormalBias(bias: number): this;
  
  /** Set directional light shadow map near */
  setDirectionalLightShadowMapNear(near: number): this;
  
  /** Set directional light shadow map far */
  setDirectionalLightShadowMapFar(far: number): this;
  
  /** Set directional light shadow map width */
  setDirectionalLightShadowMapWidth(width: number): this;
  
  /** Set directional light shadow map height */
  setDirectionalLightShadowMapHeight(height: number): this;
  
  /** Set directional light shadow map left */
  setDirectionalLightShadowMapLeft(left: number): this;
  
  /** Set directional light shadow map right */
  setDirectionalLightShadowMapRight(right: number): this;
  
  /** Set directional light shadow map top */
  setDirectionalLightShadowMapTop(top: number): this;
  
  /** Set directional light shadow map bottom */
  setDirectionalLightShadowMapBottom(bottom: number): this;
  
  /** Get directional light direction */
  getDirectionalLightDirection(): { x: number; y: number; z: number };
  
  /** Get directional light target */
  getDirectionalLightTarget(): { x: number; y: number; z: number };
  
  /** Get directional light up vector */
  getDirectionalLightUp(): { x: number; y: number; z: number };
  
  /** Get directional light right vector */
  getDirectionalLightRight(): { x: number; y: number; z: number };
  
  /** Get directional light distance */
  getDirectionalLightDistance(): number;
  
  /** Get directional light width */
  getDirectionalLightWidth(): number;
  
  /** Get directional light height */
  getDirectionalLightHeight(): number;
  
  /** Get directional light near */
  getDirectionalLightNear(): number;
  
  /** Get directional light far */
  getDirectionalLightFar(): number;
  
  /** Get directional light orthographic */
  getDirectionalLightOrthographic(): boolean;
  
  /** Get directional light orthographic size */
  getDirectionalLightOrthographicSize(): number;
  
  /** Get directional light perspective fov */
  getDirectionalLightPerspectiveFov(): number;
  
  /** Get directional light perspective aspect */
  getDirectionalLightPerspectiveAspect(): number;
  
  /** Get directional light shadow map size */
  getDirectionalLightShadowMapSize(): number;
  
  /** Get directional light shadow map bias */
  getDirectionalLightShadowMapBias(): number;
  
  /** Get directional light shadow map normal bias */
  getDirectionalLightShadowMapNormalBias(): number;
  
  /** Get directional light shadow map near */
  getDirectionalLightShadowMapNear(): number;
  
  /** Get directional light shadow map far */
  getDirectionalLightShadowMapFar(): number;
  
  /** Get directional light shadow map width */
  getDirectionalLightShadowMapWidth(): number;
  
  /** Get directional light shadow map height */
  getDirectionalLightShadowMapHeight(): number;
  
  /** Get directional light shadow map left */
  getDirectionalLightShadowMapLeft(): number;
  
  /** Get directional light shadow map right */
  getDirectionalLightShadowMapRight(): number;
  
  /** Get directional light shadow map top */
  getDirectionalLightShadowMapTop(): number;
  
  /** Get directional light shadow map bottom */
  getDirectionalLightShadowMapBottom(): number;
  
  /** Update directional light */
  updateDirectionalLight(deltaTime: number): void;
}
