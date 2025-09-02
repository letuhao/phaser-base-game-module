/**
 * Core Game Object Interfaces Index
 * 
 * Centralized export for all core game object interfaces
 */

// ============================================================================
// CORE INTERFACES
// ============================================================================

export type { ISprite } from './ISprite';
export type { IGraphics } from './IGraphics';
export type { ITileSprite } from './ITileSprite';
export type { IBitmapText } from './IBitmapText';
export type { IDynamicBitmapText } from './IDynamicBitmapText';
export type { IRenderTexture } from './IRenderTexture';

// ============================================================================
// CORE ENUMS
// ============================================================================

// Enums are now exported from the centralized enum system
// See: ../../enums/core/CoreObjectEnums.ts

// ============================================================================
// CORE INTERFACE BUNDLES
// ============================================================================

/**
 * Core game object interfaces
 */
export const CORE_GAMEOBJECT_INTERFACES = {
  ISprite: 'ISprite',
  IGraphics: 'IGraphics',
  ITileSprite: 'ITileSprite',
  IBitmapText: 'IBitmapText',
  IDynamicBitmapText: 'IDynamicBitmapText',
  IRenderTexture: 'IRenderTexture',
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CoreGameObjectInterface = typeof CORE_GAMEOBJECT_INTERFACES[keyof typeof CORE_GAMEOBJECT_INTERFACES];
