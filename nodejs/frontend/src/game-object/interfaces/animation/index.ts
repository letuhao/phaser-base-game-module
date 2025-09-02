/**
 * Animation Game Object Interfaces Index
 *
 * Centralized export for all animation-specific game object interfaces
 */

// ============================================================================
// ANIMATION INTERFACES
// ============================================================================

export type { IAnimatedObject } from './IAnimatedObject';
export type { ISpriteAnimation } from './ISpriteAnimation';
export type { ITweenObject } from './ITweenObject';
export type { ITimelineObject } from './ITimelineObject';

// ============================================================================
// ANIMATION ENUMS
// ============================================================================

// Enums are now exported from the centralized enum system
// See: ../../enums/animation/AnimationEnums.ts

// ============================================================================
// ANIMATION INTERFACE BUNDLES
// ============================================================================

/**
 * Core animation interfaces
 */
export const CORE_ANIMATION_INTERFACES = {
  IAnimatedObject: 'IAnimatedObject',
} as const;

/**
 * Specific animation interfaces
 */
export const SPECIFIC_ANIMATION_INTERFACES = {
  ISpriteAnimation: 'ISpriteAnimation',
  ITweenObject: 'ITweenObject',
  ITimelineObject: 'ITimelineObject',
} as const;

/**
 * All animation interfaces
 */
export const ANIMATION_INTERFACES = {
  ...CORE_ANIMATION_INTERFACES,
  ...SPECIFIC_ANIMATION_INTERFACES,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CoreAnimationInterface =
  (typeof CORE_ANIMATION_INTERFACES)[keyof typeof CORE_ANIMATION_INTERFACES];
export type SpecificAnimationInterface =
  (typeof SPECIFIC_ANIMATION_INTERFACES)[keyof typeof SPECIFIC_ANIMATION_INTERFACES];
export type AnimationInterface = (typeof ANIMATION_INTERFACES)[keyof typeof ANIMATION_INTERFACES];
