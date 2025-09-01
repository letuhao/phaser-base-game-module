/**
 * Physics Game Object Interfaces Index
 * 
 * Centralized export for all physics-specific game object interfaces
 */

// ============================================================================
// PHYSICS INTERFACES
// ============================================================================

export type { IPhysicsObject } from './IPhysicsObject';
export type { IArcadePhysics } from './IArcadePhysics';
export type { IMatterPhysics } from './IMatterPhysics';
export type { IStaticBody } from './IStaticBody';
export type { IDynamicBody } from './IDynamicBody';

// ============================================================================
// PHYSICS ENUMS
// ============================================================================

export { PhysicsBodyType, PhysicsMaterialType } from './IPhysicsObject';

// ============================================================================
// PHYSICS INTERFACE BUNDLES
// ============================================================================

/**
 * Core physics interfaces
 */
export const CORE_PHYSICS_INTERFACES = {
  IPhysicsObject: 'IPhysicsObject',
} as const;

/**
 * Specific physics interfaces
 */
export const SPECIFIC_PHYSICS_INTERFACES = {
  IArcadePhysics: 'IArcadePhysics',
  IMatterPhysics: 'IMatterPhysics',
  IStaticBody: 'IStaticBody',
  IDynamicBody: 'IDynamicBody',
} as const;

/**
 * All physics interfaces
 */
export const PHYSICS_INTERFACES = {
  ...CORE_PHYSICS_INTERFACES,
  ...SPECIFIC_PHYSICS_INTERFACES,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CorePhysicsInterface = typeof CORE_PHYSICS_INTERFACES[keyof typeof CORE_PHYSICS_INTERFACES];
export type SpecificPhysicsInterface = typeof SPECIFIC_PHYSICS_INTERFACES[keyof typeof SPECIFIC_PHYSICS_INTERFACES];
export type PhysicsInterface = typeof PHYSICS_INTERFACES[keyof typeof PHYSICS_INTERFACES];
