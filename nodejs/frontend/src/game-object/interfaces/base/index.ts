/**
 * Base Game Object Interfaces Index
 * 
 * Centralized export for all base game object interfaces
 * that follow the Interface Segregation Principle.
 */

// ============================================================================
// BASE INTERFACES (Interface Segregation Principle)
// ============================================================================

export type { IGameObjectIdentity } from './IGameObjectIdentity';
export type { IGameObjectTransform } from './IGameObjectTransform';
export type { IGameObjectVisual } from './IGameObjectVisual';
export type { IGameObjectLifecycle } from './IGameObjectLifecycle';
export type { IGameObjectHierarchy } from './IGameObjectHierarchy';
export type { IGameObjectComponentSystem, IGameObjectComponent } from './IGameObjectComponentSystem';
export type { IGameObjectEvents } from './IGameObjectEvents';
export type { IGameObjectInteraction } from './IGameObjectInteraction';
export type { IGameObjectLayout } from './IGameObjectLayout';
export type { IGameObjectUnits } from './IGameObjectUnits';
export type { IGameObjectDebug, IGameObjectDebugInfo } from './IGameObjectDebug';
