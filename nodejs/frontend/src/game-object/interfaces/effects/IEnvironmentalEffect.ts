/**
 * Environmental Effect Interface
 *
 * Defines environmental-specific functionality for effects.
 * Follows Interface Segregation Principle by focusing only on environmental concerns.
 */

import * as Phaser from 'phaser';
import type { IEffect } from './IEffect';
import {
  AudioFilterType,
  EffectType,
  EnvironmentalEffectType,
  WeatherCondition,
} from '../../enums';

/**
 * Interface for environmental effects
 *
 * Extends IEffect with environmental-specific functionality for weather,
 * atmosphere, lighting, and other environmental effects.
 *
 * Example implementation:
 * ```typescript
 * class MyEnvironmentalEffect extends Phaser.GameObjects.GameObject implements IEnvironmentalEffect {
 *   readonly gameObjectType = 'effect' as const;
 *   readonly effectType = 'environmental' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IEnvironmentalEffect extends IEffect {
  // ============================================================================
  // ENVIRONMENTAL IDENTITY
  // ============================================================================

  /** The specific type of effect (always 'environmental') */
  readonly effectType: EffectType.ENVIRONMENTAL;

  // ============================================================================
  // ENVIRONMENTAL PROPERTIES
  // ============================================================================

  /** Environmental effect type */
  environmentalType: EnvironmentalEffectType;

  /** Weather condition */
  weatherCondition: WeatherCondition;

  /** Environmental intensity */
  environmentalIntensity: number;

  /** Environmental coverage (0.0 to 1.0) */
  environmentalCoverage: number;

  /** Environmental speed */
  environmentalSpeed: number;

  /** Environmental direction */
  environmentalDirection: {
    x: number;
    y: number;
  };

  /** Environmental turbulence */
  environmentalTurbulence: number;

  /** Environmental persistence */
  environmentalPersistence: number;

  /** Environmental fade distance */
  environmentalFadeDistance: number;

  /** Environmental fade falloff */
  environmentalFadeFalloff: number;

  /** Environmental color tint */
  environmentalColorTint: number;

  /** Environmental alpha */
  environmentalAlpha: number;

  /** Environmental blend mode */
  environmentalBlendMode: Phaser.BlendModes;

  /** Environmental depth */
  environmentalDepth: number;

  /** Environmental parallax factor */
  environmentalParallaxFactor: number;

  /** Environmental wind influence */
  environmentalWindInfluence: number;

  /** Environmental gravity influence */
  environmentalGravityInfluence: number;

  /** Environmental collision enabled */
  environmentalCollision: boolean;

  /** Environmental collision bounds */
  environmentalCollisionBounds: Phaser.Geom.Rectangle | null;

  /** Environmental interaction enabled */
  environmentalInteraction: boolean;

  /** Environmental interaction objects */
  environmentalInteractionObjects: Phaser.GameObjects.GameObject[];

  /** Environmental sound enabled */
  environmentalSound: boolean;

  /** Environmental sound volume */
  environmentalSoundVolume: number;

  /** Environmental sound loop */
  environmentalSoundLoop: boolean;

  /** Environmental sound fade */
  environmentalSoundFade: boolean;

  /** Environmental sound fade duration */
  environmentalSoundFadeDuration: number;

  /** Environmental sound fade distance */
  environmentalSoundFadeDistance: number;

  /** Environmental sound fade falloff */
  environmentalSoundFadeFalloff: number;

  /** Environmental sound 3D positioning */
  environmentalSound3D: boolean;

  /** Environmental sound 3D position */
  environmentalSound3DPosition: Phaser.Math.Vector3;

  /** Environmental sound 3D velocity */
  environmentalSound3DVelocity: Phaser.Math.Vector3;

  /** Environmental sound 3D rolloff factor */
  environmentalSound3DRolloffFactor: number;

  /** Environmental sound 3D reference distance */
  environmentalSound3DReferenceDistance: number;

  /** Environmental sound 3D max distance */
  environmentalSound3DMaxDistance: number;

  /** Environmental sound 3D cone inner angle */
  environmentalSound3DConeInnerAngle: number;

  /** Environmental sound 3D cone outer angle */
  environmentalSound3DConeOuterAngle: number;

  /** Environmental sound 3D cone outer gain */
  environmentalSound3DConeOuterGain: number;

  /** Environmental sound 3D filter type */
  environmentalSound3DFilterType: AudioFilterType;

  /** Environmental sound 3D filter frequency */
  environmentalSound3DFilterFrequency: number;

  /** Environmental sound 3D filter Q factor */
  environmentalSound3DFilterQ: number;

  /** Environmental sound 3D filter gain */
  environmentalSound3DFilterGain: number;

  /** Environmental sound 3D reverb room size */
  environmentalSound3DReverbRoomSize: number;

  /** Environmental sound 3D reverb damping */
  environmentalSound3DReverbDamping: number;

  /** Environmental sound 3D reverb wet level */
  environmentalSound3DReverbWet: number;

  /** Environmental sound 3D reverb dry level */
  environmentalSound3DReverbDry: number;

  /** Environmental sound 3D reverb width */
  environmentalSound3DReverbWidth: number;

  /** Environmental sound 3D reverb freeze mode */
  environmentalSound3DReverbFreeze: boolean;

  // ============================================================================
  // ENVIRONMENTAL METHODS
  // ============================================================================

  /** Set environmental effect type */
  setEnvironmentalType(type: EnvironmentalEffectType): this;

  /** Set weather condition */
  setWeatherCondition(condition: WeatherCondition): this;

  /** Set environmental intensity */
  setEnvironmentalIntensity(intensity: number): this;

  /** Set environmental coverage */
  setEnvironmentalCoverage(coverage: number): this;

  /** Set environmental speed */
  setEnvironmentalSpeed(speed: number): this;

  /** Set environmental direction */
  setEnvironmentalDirection(x: number, y: number): this;

  /** Set environmental turbulence */
  setEnvironmentalTurbulence(turbulence: number): this;

  /** Set environmental persistence */
  setEnvironmentalPersistence(persistence: number): this;

  /** Set environmental fade distance */
  setEnvironmentalFadeDistance(distance: number): this;

  /** Set environmental fade falloff */
  setEnvironmentalFadeFalloff(falloff: number): this;

  /** Set environmental color tint */
  setEnvironmentalColorTint(tint: number): this;

  /** Set environmental alpha */
  setEnvironmentalAlpha(alpha: number): this;

  /** Set environmental blend mode */
  setEnvironmentalBlendMode(blendMode: Phaser.BlendModes): this;

  /** Set environmental depth */
  setEnvironmentalDepth(depth: number): this;

  /** Set environmental parallax factor */
  setEnvironmentalParallaxFactor(factor: number): this;

  /** Set environmental wind influence */
  setEnvironmentalWindInfluence(influence: number): this;

  /** Set environmental gravity influence */
  setEnvironmentalGravityInfluence(influence: number): this;

  /** Set environmental collision */
  setEnvironmentalCollision(enabled: boolean, bounds?: Phaser.Geom.Rectangle): this;

  /** Set environmental interaction */
  setEnvironmentalInteraction(enabled: boolean, objects?: Phaser.GameObjects.GameObject[]): this;

  /** Set environmental sound */
  setEnvironmentalSound(enabled: boolean, volume?: number, loop?: boolean): this;

  /** Set environmental sound fade */
  setEnvironmentalSoundFade(
    enabled: boolean,
    duration?: number,
    distance?: number,
    falloff?: number
  ): this;

  /** Set environmental sound 3D positioning */
  setEnvironmentalSound3D(
    enabled: boolean,
    position?: Phaser.Math.Vector3,
    velocity?: Phaser.Math.Vector3
  ): this;

  /** Set environmental sound 3D rolloff */
  setEnvironmentalSound3DRolloff(
    rolloffFactor: number,
    referenceDistance: number,
    maxDistance: number
  ): this;

  /** Set environmental sound 3D cone */
  setEnvironmentalSound3DCone(innerAngle: number, outerAngle: number, outerGain: number): this;

  /** Set environmental sound 3D filter */
  setEnvironmentalSound3DFilter(
    type: AudioFilterType,
    frequency: number,
    Q: number,
    gain: number
  ): this;

  /** Set environmental sound 3D reverb */
  setEnvironmentalSound3DReverb(
    roomSize: number,
    damping: number,
    wet: number,
    dry: number,
    width: number,
    freeze: boolean
  ): this;

  /** Get environmental effect type */
  getEnvironmentalType(): EnvironmentalEffectType;

  /** Get weather condition */
  getWeatherCondition(): WeatherCondition;

  /** Get environmental intensity */
  getEnvironmentalIntensity(): number;

  /** Get environmental coverage */
  getEnvironmentalCoverage(): number;

  /** Get environmental speed */
  getEnvironmentalSpeed(): number;

  /** Get environmental direction */
  getEnvironmentalDirection(): { x: number; y: number };

  /** Get environmental turbulence */
  getEnvironmentalTurbulence(): number;

  /** Get environmental persistence */
  getEnvironmentalPersistence(): number;

  /** Get environmental fade distance */
  getEnvironmentalFadeDistance(): number;

  /** Get environmental fade falloff */
  getEnvironmentalFadeFalloff(): number;

  /** Get environmental color tint */
  getEnvironmentalColorTint(): number;

  /** Get environmental alpha */
  getEnvironmentalAlpha(): number;

  /** Get environmental blend mode */
  getEnvironmentalBlendMode(): Phaser.BlendModes;

  /** Get environmental depth */
  getEnvironmentalDepth(): number;

  /** Get environmental parallax factor */
  getEnvironmentalParallaxFactor(): number;

  /** Get environmental wind influence */
  getEnvironmentalWindInfluence(): number;

  /** Get environmental gravity influence */
  getEnvironmentalGravityInfluence(): number;

  /** Check if environmental collision is enabled */
  isEnvironmentalCollisionEnabled(): boolean;

  /** Get environmental collision bounds */
  getEnvironmentalCollisionBounds(): Phaser.Geom.Rectangle | null;

  /** Check if environmental interaction is enabled */
  isEnvironmentalInteractionEnabled(): boolean;

  /** Get environmental interaction objects */
  getEnvironmentalInteractionObjects(): Phaser.GameObjects.GameObject[];

  /** Check if environmental sound is enabled */
  isEnvironmentalSoundEnabled(): boolean;

  /** Get environmental sound volume */
  getEnvironmentalSoundVolume(): number;

  /** Check if environmental sound loop is enabled */
  isEnvironmentalSoundLoopEnabled(): boolean;

  /** Check if environmental sound fade is enabled */
  isEnvironmentalSoundFadeEnabled(): boolean;

  /** Get environmental sound fade duration */
  getEnvironmentalSoundFadeDuration(): number;

  /** Get environmental sound fade distance */
  getEnvironmentalSoundFadeDistance(): number;

  /** Get environmental sound fade falloff */
  getEnvironmentalSoundFadeFalloff(): number;

  /** Check if environmental sound 3D positioning is enabled */
  isEnvironmentalSound3DEnabled(): boolean;

  /** Get environmental sound 3D position */
  getEnvironmentalSound3DPosition(): Phaser.Math.Vector3;

  /** Get environmental sound 3D velocity */
  getEnvironmentalSound3DVelocity(): Phaser.Math.Vector3;

  /** Get environmental sound 3D rolloff factor */
  getEnvironmentalSound3DRolloffFactor(): number;

  /** Get environmental sound 3D reference distance */
  getEnvironmentalSound3DReferenceDistance(): number;

  /** Get environmental sound 3D max distance */
  getEnvironmentalSound3DMaxDistance(): number;

  /** Get environmental sound 3D cone parameters */
  getEnvironmentalSound3DCone(): { innerAngle: number; outerAngle: number; outerGain: number };

  /** Get environmental sound 3D filter parameters */
  getEnvironmentalSound3DFilter(): { type: string; frequency: number; Q: number; gain: number };

  /** Get environmental sound 3D reverb parameters */
  getEnvironmentalSound3DReverb(): {
    roomSize: number;
    damping: number;
    wet: number;
    dry: number;
    width: number;
    freeze: boolean;
  };

  /** Update environmental effect */
  updateEnvironmentalEffect(deltaTime: number): void;

  /** Update environmental sound */
  updateEnvironmentalSound(deltaTime: number): void;

  /** Update environmental sound 3D positioning */
  updateEnvironmentalSound3D(): void;

  /** Update environmental sound 3D filters */
  updateEnvironmentalSound3DFilters(): void;

  /** Update environmental sound 3D effects */
  updateEnvironmentalSound3DEffects(): void;

  /** Get environmental effect bounds */
  getEnvironmentalEffectBounds(): Phaser.Geom.Rectangle;

  /** Get environmental effect center */
  getEnvironmentalEffectCenter(): Phaser.Geom.Point;

  /** Get environmental effect radius */
  getEnvironmentalEffectRadius(): number;

  /** Get environmental effect area */
  getEnvironmentalEffectArea(): number;

  /** Get environmental effect perimeter */
  getEnvironmentalEffectPerimeter(): number;

  /** Check if point is in environmental effect */
  isPointInEnvironmentalEffect(x: number, y: number): boolean;

  /** Get environmental effect at point */
  getEnvironmentalEffectAtPoint(x: number, y: number): number;

  /** Get environmental effect gradient */
  getEnvironmentalEffectGradient(x: number, y: number): { x: number; y: number };

  /** Get environmental effect flow */
  getEnvironmentalEffectFlow(x: number, y: number): { x: number; y: number };

  /** Get environmental effect turbulence */
  getEnvironmentalEffectTurbulence(x: number, y: number): number;

  /** Get environmental effect noise */
  getEnvironmentalEffectNoise(x: number, y: number): number;

  /** Get environmental effect fractal noise */
  getEnvironmentalEffectFractalNoise(x: number, y: number, octaves: number): number;

  /** Get environmental effect perlin noise */
  getEnvironmentalEffectPerlinNoise(x: number, y: number): number;

  /** Get environmental effect simplex noise */
  getEnvironmentalEffectSimplexNoise(x: number, y: number): number;

  /** Get environmental effect worley noise */
  getEnvironmentalEffectWorleyNoise(x: number, y: number): number;

  /** Get environmental effect ridged noise */
  getEnvironmentalEffectRidgedNoise(x: number, y: number): number;

  /** Get environmental effect billowy noise */
  getEnvironmentalEffectBillowyNoise(x: number, y: number): number;

  /** Get environmental effect swiss noise */
  getEnvironmentalEffectSwissNoise(x: number, y: number): number;

  /** Get environmental effect jordan noise */
  getEnvironmentalEffectJordanNoise(x: number, y: number): number;

  /** Get environmental effect statistics */
  getEnvironmentalEffectStatistics(): {
    activeObjects: number;
    memoryUsage: number;
    updateTime: number;
    renderTime: number;
    soundTime: number;
    collisionTime: number;
    interactionTime: number;
  };
}
