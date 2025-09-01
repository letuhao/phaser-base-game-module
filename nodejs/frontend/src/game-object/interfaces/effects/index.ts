/**
 * Effects Game Object Interfaces Index
 * 
 * Centralized export for all effects-specific game object interfaces
 */

// ============================================================================
// EFFECTS INTERFACES
// ============================================================================

export type { IEffect } from './IEffect';
export type { IParticleEffect } from './IParticleEffect';
export type { IEnvironmentalEffect } from './IEnvironmentalEffect';
export type { IEffectSystem } from './IEffectSystem';

// ============================================================================
// EFFECTS ENUMS
// ============================================================================

export { EffectState } from './IEffect';
export { EffectPriority } from './IEffect';
export { ParticleSpawnMode } from './IParticleEffect';
export { ParticleUpdateMode } from './IParticleEffect';
export { EnvironmentalEffectType } from './IEnvironmentalEffect';
export { WeatherCondition } from './IEnvironmentalEffect';

// ============================================================================
// EFFECTS INTERFACE BUNDLES
// ============================================================================

/**
 * Core effects interfaces
 */
export const CORE_EFFECTS_INTERFACES = {
  IEffect: 'IEffect',
  IEffectSystem: 'IEffectSystem',
} as const;

/**
 * Specific effects interfaces
 */
export const SPECIFIC_EFFECTS_INTERFACES = {
  IParticleEffect: 'IParticleEffect',
  IEnvironmentalEffect: 'IEnvironmentalEffect',
} as const;

/**
 * All effects interfaces
 */
export const EFFECTS_INTERFACES = {
  ...CORE_EFFECTS_INTERFACES,
  ...SPECIFIC_EFFECTS_INTERFACES,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CoreEffectsInterface = typeof CORE_EFFECTS_INTERFACES[keyof typeof CORE_EFFECTS_INTERFACES];
export type SpecificEffectsInterface = typeof SPECIFIC_EFFECTS_INTERFACES[keyof typeof SPECIFIC_EFFECTS_INTERFACES];
export type EffectsInterface = typeof EFFECTS_INTERFACES[keyof typeof EFFECTS_INTERFACES];
