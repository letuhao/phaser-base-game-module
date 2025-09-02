/**
 * Animation System Enums
 *
 * Enums for animation easing types and animation-specific functionality
 */

// ============================================================================
// ANIMATION ENUMS
// ============================================================================

/**
 * Animation key types enum
 */
export enum AnimationKey {
  IDLE = 'idle',
  WALK = 'walk',
  RUN = 'run',
  JUMP = 'jump',
  ATTACK = 'attack',
  DEFEND = 'defend',
  DEATH = 'death',
  CUSTOM = 'custom',
}

/**
 * Tween easing types enum
 */
export enum TweenEasingType {
  LINEAR = 'linear',
  EASE_IN = 'ease-in',
  EASE_OUT = 'ease-out',
  EASE_IN_OUT = 'ease-in-out',
  EASE_BACK_IN = 'ease-back-in',
  EASE_BACK_OUT = 'ease-back-out',
  EASE_BACK_IN_OUT = 'ease-back-in-out',
  EASE_ELASTIC_IN = 'ease-elastic-in',
  EASE_ELASTIC_OUT = 'ease-elastic-out',
  EASE_ELASTIC_IN_OUT = 'ease-elastic-in-out',
  EASE_BOUNCE_IN = 'ease-bounce-in',
  EASE_BOUNCE_OUT = 'ease-bounce-out',
  EASE_BOUNCE_IN_OUT = 'ease-bounce-in-out',
  CUSTOM = 'custom',
}
