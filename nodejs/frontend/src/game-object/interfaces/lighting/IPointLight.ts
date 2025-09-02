/**
 * Point Light Interface
 *
 * Defines point light functionality for game objects.
 * Handles omnidirectional lighting from a single point.
 */

import type { ILightObject } from './ILightObject';
import { GameObjectType } from '../../enums/GameObjectEnums';
import { LightFalloffCurveType } from '../../enums';

/**
 * Interface for point light game objects
 *
 * Extends ILightObject with point light-specific functionality.
 */
export interface IPointLight extends ILightObject {
  readonly gameObjectType: GameObjectType;

  /** Point light position */
  pointLightPosition: { x: number; y: number };

  /** Point light range */
  pointLightRange: number;

  /** Point light inner radius */
  pointLightInnerRadius: number;

  /** Point light outer radius */
  pointLightOuterRadius: number;

  /** Point light inner intensity */
  pointLightInnerIntensity: number;

  /** Point light outer intensity */
  pointLightOuterIntensity: number;

  /** Point light falloff curve */
  pointLightFalloffCurve: LightFalloffCurveType;

  /** Point light falloff exponent */
  pointLightFalloffExponent: number;

  /** Point light attenuation constant */
  pointLightAttenuationConstant: number;

  /** Point light attenuation linear */
  pointLightAttenuationLinear: number;

  /** Point light attenuation quadratic */
  pointLightAttenuationQuadratic: number;

  /** Point light shadow map size */
  pointLightShadowMapSize: number;

  /** Point light shadow map bias */
  pointLightShadowMapBias: number;

  /** Point light shadow map normal bias */
  pointLightShadowMapNormalBias: number;

  /** Point light shadow map near */
  pointLightShadowMapNear: number;

  /** Point light shadow map far */
  pointLightShadowMapFar: number;

  /** Set point light position */
  setPointLightPosition(x: number, y: number): this;

  /** Set point light range */
  setPointLightRange(range: number): this;

  /** Set point light inner radius */
  setPointLightInnerRadius(radius: number): this;

  /** Set point light outer radius */
  setPointLightOuterRadius(radius: number): this;

  /** Set point light inner intensity */
  setPointLightInnerIntensity(intensity: number): this;

  /** Set point light outer intensity */
  setPointLightOuterIntensity(intensity: number): this;

  /** Set point light falloff curve */
  setPointLightFalloffCurve(curve: LightFalloffCurveType): this;

  /** Set point light falloff exponent */
  setPointLightFalloffExponent(exponent: number): this;

  /** Set point light attenuation constant */
  setPointLightAttenuationConstant(constant: number): this;

  /** Set point light attenuation linear */
  setPointLightAttenuationLinear(linear: number): this;

  /** Set point light attenuation quadratic */
  setPointLightAttenuationQuadratic(quadratic: number): this;

  /** Set point light shadow map size */
  setPointLightShadowMapSize(size: number): this;

  /** Set point light shadow map bias */
  setPointLightShadowMapBias(bias: number): this;

  /** Set point light shadow map normal bias */
  setPointLightShadowMapNormalBias(bias: number): this;

  /** Set point light shadow map near */
  setPointLightShadowMapNear(near: number): this;

  /** Set point light shadow map far */
  setPointLightShadowMapFar(far: number): this;

  /** Get point light position */
  getPointLightPosition(): { x: number; y: number };

  /** Get point light range */
  getPointLightRange(): number;

  /** Get point light inner radius */
  getPointLightInnerRadius(): number;

  /** Get point light outer radius */
  getPointLightOuterRadius(): number;

  /** Get point light inner intensity */
  getPointLightInnerIntensity(): number;

  /** Get point light outer intensity */
  getPointLightOuterIntensity(): number;

  /** Get point light falloff curve */
  getPointLightFalloffCurve(): LightFalloffCurveType;

  /** Get point light falloff exponent */
  getPointLightFalloffExponent(): number;

  /** Get point light attenuation constant */
  getPointLightAttenuationConstant(): number;

  /** Get point light attenuation linear */
  getPointLightAttenuationLinear(): number;

  /** Get point light attenuation quadratic */
  getPointLightAttenuationQuadratic(): number;

  /** Get point light shadow map size */
  getPointLightShadowMapSize(): number;

  /** Get point light shadow map bias */
  getPointLightShadowMapBias(): number;

  /** Get point light shadow map normal bias */
  getPointLightShadowMapNormalBias(): number;

  /** Get point light shadow map near */
  getPointLightShadowMapNear(): number;

  /** Get point light shadow map far */
  getPointLightShadowMapFar(): number;

  /** Update point light */
  updatePointLight(deltaTime: number): void;
}
