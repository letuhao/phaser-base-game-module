/**
 * Effect System Enums
 * 
 * Enums for effect types, quality levels, and effect-specific functionality
 */

// ============================================================================
// EFFECT TYPE ENUMS
// ============================================================================

/**
 * Effect types enum
 */
export enum EffectType {
  PARTICLE = 'particle',
  ENVIRONMENTAL = 'environmental',
  VISUAL = 'visual',
  AUDIO = 'audio',
  PHYSICS = 'physics',
  COMPOSITE = 'composite',
  CUSTOM = 'custom',
}

/**
 * Effect quality levels enum
 */
export enum EffectQualityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  ULTRA = 'ultra',
  CUSTOM = 'custom',
}

/**
 * Particle types enum
 */
export enum ParticleType {
  POINT = 'point',
  CIRCLE = 'circle',
  RECTANGLE = 'rectangle',
  LINE = 'line',
  CUSTOM = 'custom',
}


