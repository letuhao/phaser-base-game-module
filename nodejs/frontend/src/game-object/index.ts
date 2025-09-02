/**
 * Game Object System Index
 * 
 * Main entry point for the new game object system
 */

// ============================================================================
// CONSTANTS
// ============================================================================

export * from './constants';
export * from './enums';

// ============================================================================
// INTERFACES
// ============================================================================

export * from './interfaces';

// ============================================================================
// RE-EXPORT FOR CONVENIENCE
// ============================================================================

// Main constants object
export { GAMEOBJECT_SYSTEM_CONSTANTS } from './constants/GameObjectConstants';

// Main enums object
export { GAMEOBJECT_SYSTEM_ENUMS } from './enums/GameObjectEnums';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  GameObjectType,
  GameObjectState,
  GameObjectProperty,
  ComponentType,
  ComponentState,
  // LayoutType, ThemeType, AnimationType, PhysicsBodyType removed - use Layout System
  InputType,
  AudioType,
  NetworkMessageType,
  DebugLevel,
} from './constants/GameObjectConstants';
