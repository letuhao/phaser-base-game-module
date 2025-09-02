/**
 * Physics System Enums
 *
 * Enums for physics body types, materials, and physics-specific functionality
 */

// ============================================================================
// PHYSICS ENUMS
// ============================================================================

/**
 * Physics body types enum
 */
export enum PhysicsBodyType {
  STATIC = 'static',
  DYNAMIC = 'dynamic',
  KINEMATIC = 'kinematic',
  CUSTOM = 'custom',
}

/**
 * Physics material types enum
 */
export enum PhysicsMaterialType {
  DEFAULT = 'default',
  BOUNCE = 'bounce',
  FRICTION = 'friction',
  ICE = 'ice',
  RUBBER = 'rubber',
  METAL = 'metal',
  WOOD = 'wood',
  CUSTOM = 'custom',
}
