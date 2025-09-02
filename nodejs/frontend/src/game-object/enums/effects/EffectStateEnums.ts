/**
 * Effect State Enums
 *
 * Enums for effect states, priorities, and effect-specific functionality
 */

// ============================================================================
// EFFECT STATE ENUMS
// ============================================================================

/**
 * Effect states enum
 */
export enum EffectState {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  PAUSED = 'paused',
  STOPPED = 'stopped',
  DESTROYED = 'destroyed',
  CUSTOM = 'custom',
}

/**
 * Effect priority levels enum
 */
export enum EffectPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  CRITICAL = 'critical',
  CUSTOM = 'custom',
}

/**
 * Environmental effect types enum
 */
export enum EnvironmentalEffectType {
  WEATHER = 'weather',
  LIGHTING = 'lighting',
  ATMOSPHERE = 'atmosphere',
  SOUNDSCAPE = 'soundscape',
  CUSTOM = 'custom',
}

/**
 * Weather condition types enum
 */
export enum WeatherCondition {
  CLEAR = 'clear',
  CLOUDY = 'cloudy',
  RAINY = 'rainy',
  STORMY = 'stormy',
  SNOWY = 'snowy',
  FOGGY = 'foggy',
  CUSTOM = 'custom',
}

/**
 * Particle spawn modes enum
 */
export enum ParticleSpawnMode {
  CONTINUOUS = 'continuous',
  BURST = 'burst',
  ONCE = 'once',
  CUSTOM = 'custom',
}

/**
 * Particle update modes enum
 */
export enum ParticleUpdateMode {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
  HYBRID = 'hybrid',
  CUSTOM = 'custom',
}
