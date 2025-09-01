/**
 * Particle Effect Interface
 * 
 * Defines particle-specific functionality for effects.
 * Follows Interface Segregation Principle by focusing only on particle concerns.
 */

import * as Phaser from 'phaser';
import type { IEffect } from './IEffect';

/**
 * Particle spawn modes
 */
export enum ParticleSpawnMode {
  CONTINUOUS = 'continuous',
  BURST = 'burst',
  EXPLOSION = 'explosion',
  TRAIL = 'trail',
  CUSTOM = 'custom'
}

/**
 * Particle update modes
 */
export enum ParticleUpdateMode {
  PHYSICS = 'physics',
  KINEMATIC = 'kinematic',
  CUSTOM = 'custom'
}

/**
 * Interface for particle effects
 * 
 * Extends IEffect with particle-specific functionality for particle systems,
 * emitters, and particle management.
 * 
 * Example implementation:
 * ```typescript
 * class MyParticleEffect extends Phaser.GameObjects.GameObject implements IParticleEffect {
 *   readonly gameObjectType = 'effect' as const;
 *   readonly effectType = 'particle' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IParticleEffect extends IEffect {
  // ============================================================================
  // PARTICLE IDENTITY
  // ============================================================================
  
  /** The specific type of effect (always 'particle') */
  readonly effectType: 'particle';
  
  // ============================================================================
  // PARTICLE PROPERTIES
  // ============================================================================
  
  /** Particle spawn mode */
  particleSpawnMode: ParticleSpawnMode;
  
  /** Particle update mode */
  particleUpdateMode: ParticleUpdateMode;
  
  /** Maximum number of particles */
  maxParticles: number;
  
  /** Current number of active particles */
  activeParticleCount: number;
  
  /** Particle spawn rate (particles per second) */
  spawnRate: number;
  
  /** Particle spawn burst size */
  burstSize: number;
  
  /** Particle spawn area */
  spawnArea: {
    type: 'point' | 'circle' | 'rectangle' | 'line' | 'custom';
    width?: number;
    height?: number;
    radius?: number;
    points?: Phaser.Geom.Point[];
  };
  
  /** Particle lifetime range */
  particleLifetime: {
    min: number;
    max: number;
  };
  
  /** Particle velocity range */
  particleVelocity: {
    x: { min: number; max: number };
    y: { min: number; max: number };
  };
  
  /** Particle acceleration */
  particleAcceleration: {
    x: number;
    y: number;
  };
  
  /** Particle gravity */
  particleGravity: {
    x: number;
    y: number;
  };
  
  /** Particle damping */
  particleDamping: {
    x: number;
    y: number;
  };
  
  /** Particle size range */
  particleSize: {
    min: number;
    max: number;
    scaleOverLifetime?: boolean;
  };
  
  /** Particle color range */
  particleColor: {
    start: number;
    end?: number;
    colorOverLifetime?: boolean;
  };
  
  /** Particle alpha range */
  particleAlpha: {
    start: number;
    end: number;
    alphaOverLifetime?: boolean;
  };
  
  /** Particle rotation range */
  particleRotation: {
    min: number;
    max: number;
    rotationSpeed?: { min: number; max: number };
  };
  
  /** Particle texture */
  particleTexture: string | null;
  
  /** Particle blend mode */
  particleBlendMode: Phaser.BlendModes;
  
  /** Particle depth */
  particleDepth: number;
  
  /** Particle collision enabled */
  particleCollision: boolean;
  
  /** Particle collision bounds */
  particleCollisionBounds: Phaser.Geom.Rectangle | null;
  
  /** Particle trail enabled */
  particleTrail: boolean;
  
  /** Particle trail length */
  particleTrailLength: number;
  
  /** Particle trail fade */
  particleTrailFade: boolean;
  
  // ============================================================================
  // PARTICLE METHODS
  // ============================================================================
  
  /** Set particle spawn mode */
  setParticleSpawnMode(mode: ParticleSpawnMode): this;
  
  /** Set particle update mode */
  setParticleUpdateMode(mode: ParticleUpdateMode): this;
  
  /** Set maximum particles */
  setMaxParticles(count: number): this;
  
  /** Set particle spawn rate */
  setParticleSpawnRate(rate: number): this;
  
  /** Set particle burst size */
  setParticleBurstSize(size: number): this;
  
  /** Set particle spawn area */
  setParticleSpawnArea(area: {
    type: 'point' | 'circle' | 'rectangle' | 'line' | 'custom';
    width?: number;
    height?: number;
    radius?: number;
    points?: Phaser.Geom.Point[];
  }): this;
  
  /** Set particle lifetime */
  setParticleLifetime(min: number, max: number): this;
  
  /** Set particle velocity */
  setParticleVelocity(xMin: number, xMax: number, yMin: number, yMax: number): this;
  
  /** Set particle acceleration */
  setParticleAcceleration(x: number, y: number): this;
  
  /** Set particle gravity */
  setParticleGravity(x: number, y: number): this;
  
  /** Set particle damping */
  setParticleDamping(x: number, y: number): this;
  
  /** Set particle size */
  setParticleSize(min: number, max: number, scaleOverLifetime?: boolean): this;
  
  /** Set particle color */
  setParticleColor(start: number, end?: number, colorOverLifetime?: boolean): this;
  
  /** Set particle alpha */
  setParticleAlpha(start: number, end: number, alphaOverLifetime?: boolean): this;
  
  /** Set particle rotation */
  setParticleRotation(min: number, max: number, rotationSpeed?: { min: number; max: number }): this;
  
  /** Set particle texture */
  setParticleTexture(texture: string | null): this;
  
  /** Set particle blend mode */
  setParticleBlendMode(blendMode: Phaser.BlendModes): this;
  
  /** Set particle depth */
  setParticleDepth(depth: number): this;
  
  /** Set particle collision */
  setParticleCollision(enabled: boolean, bounds?: Phaser.Geom.Rectangle): this;
  
  /** Set particle trail */
  setParticleTrail(enabled: boolean, length?: number, fade?: boolean): this;
  
  /** Spawn particles */
  spawnParticles(count?: number): this;
  
  /** Stop spawning particles */
  stopSpawningParticles(): this;
  
  /** Clear all particles */
  clearParticles(): this;
  
  /** Get active particle count */
  getActiveParticleCount(): number;
  
  /** Get particle spawn rate */
  getParticleSpawnRate(): number;
  
  /** Get particle burst size */
  getParticleBurstSize(): number;
  
  /** Get particle spawn area */
  getParticleSpawnArea(): {
    type: 'point' | 'circle' | 'rectangle' | 'line' | 'custom';
    width?: number;
    height?: number;
    radius?: number;
    points?: Phaser.Geom.Point[];
  };
  
  /** Get particle lifetime */
  getParticleLifetime(): { min: number; max: number };
  
  /** Get particle velocity */
  getParticleVelocity(): { x: { min: number; max: number }; y: { min: number; max: number } };
  
  /** Get particle acceleration */
  getParticleAcceleration(): { x: number; y: number };
  
  /** Get particle gravity */
  getParticleGravity(): { x: number; y: number };
  
  /** Get particle damping */
  getParticleDamping(): { x: number; y: number };
  
  /** Get particle size */
  getParticleSize(): { min: number; max: number; scaleOverLifetime?: boolean };
  
  /** Get particle color */
  getParticleColor(): { start: number; end?: number; colorOverLifetime?: boolean };
  
  /** Get particle alpha */
  getParticleAlpha(): { start: number; end: number; alphaOverLifetime?: boolean };
  
  /** Get particle rotation */
  getParticleRotation(): { min: number; max: number; rotationSpeed?: { min: number; max: number } };
  
  /** Get particle texture */
  getParticleTexture(): string | null;
  
  /** Get particle blend mode */
  getParticleBlendMode(): Phaser.BlendModes;
  
  /** Get particle depth */
  getParticleDepth(): number;
  
  /** Check if particle collision is enabled */
  isParticleCollisionEnabled(): boolean;
  
  /** Get particle collision bounds */
  getParticleCollisionBounds(): Phaser.Geom.Rectangle | null;
  
  /** Check if particle trail is enabled */
  isParticleTrailEnabled(): boolean;
  
  /** Get particle trail length */
  getParticleTrailLength(): number;
  
  /** Check if particle trail fade is enabled */
  isParticleTrailFadeEnabled(): boolean;
  
  /** Get particle at index */
  getParticleAt(index: number): any | null;
  
  /** Get all particles */
  getAllParticles(): any[];
  
  /** Get particles in bounds */
  getParticlesInBounds(bounds: Phaser.Geom.Rectangle): any[];
  
  /** Get particles by property */
  getParticlesByProperty(property: string, value: any): any[];
  
  /** Update particle at index */
  updateParticleAt(index: number, deltaTime: number): void;
  
  /** Remove particle at index */
  removeParticleAt(index: number): void;
  
  /** Remove particles by property */
  removeParticlesByProperty(property: string, value: any): number;
  
  /** Remove particles in bounds */
  removeParticlesInBounds(bounds: Phaser.Geom.Rectangle): number;
  
  /** Optimize particle system */
  optimizeParticleSystem(): this;
  
  /** Get particle system statistics */
  getParticleSystemStatistics(): {
    totalParticles: number;
    activeParticles: number;
    inactiveParticles: number;
    memoryUsage: number;
    updateTime: number;
    renderTime: number;
  };
}
