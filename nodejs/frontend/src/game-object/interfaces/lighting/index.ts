/**
 * Lighting Game Object Interfaces Index
 *
 * Centralized export for all lighting-specific game object interfaces
 */

// ============================================================================
// LIGHTING INTERFACES
// ============================================================================

export type { ILightObject } from './ILightObject';
export type { IPointLight } from './IPointLight';
export type { IDirectionalLight } from './IDirectionalLight';
export type { ISpotLight } from './ISpotLight';
export type { IMeshObject } from './IMeshObject';
export type { IBlitterObject } from './IBlitterObject';

// ============================================================================
// LIGHTING ENUMS
// ============================================================================

// Enums are now exported from the centralized enum system
// See: ../../enums/lighting/LightingEnums.ts

// ============================================================================
// LIGHTING INTERFACE BUNDLES
// ============================================================================

/**
 * Core lighting interfaces
 */
export const CORE_LIGHTING_INTERFACES = {
  ILightObject: 'ILightObject',
} as const;

/**
 * Specific lighting interfaces
 */
export const SPECIFIC_LIGHTING_INTERFACES = {
  IPointLight: 'IPointLight',
  IDirectionalLight: 'IDirectionalLight',
  ISpotLight: 'ISpotLight',
  IMeshObject: 'IMeshObject',
  IBlitterObject: 'IBlitterObject',
} as const;

/**
 * All lighting interfaces
 */
export const LIGHTING_INTERFACES = {
  ...CORE_LIGHTING_INTERFACES,
  ...SPECIFIC_LIGHTING_INTERFACES,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CoreLightingInterface =
  (typeof CORE_LIGHTING_INTERFACES)[keyof typeof CORE_LIGHTING_INTERFACES];
export type SpecificLightingInterface =
  (typeof SPECIFIC_LIGHTING_INTERFACES)[keyof typeof SPECIFIC_LIGHTING_INTERFACES];
export type LightingInterface = (typeof LIGHTING_INTERFACES)[keyof typeof LIGHTING_INTERFACES];
