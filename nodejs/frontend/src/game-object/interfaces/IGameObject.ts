/**
 * Core Game Object Interface
 * 
 * This is the foundational interface for all game objects in the new system.
 * It composes smaller, focused interfaces to avoid becoming a "god interface".
 * 
 * Concrete classes should extend Phaser GameObjects directly and implement this interface.
 * 
 * Example:
 * ```typescript
 * class MyContainer extends Phaser.GameObjects.Container implements IGameObject {
 *   // Implementation
 * }
 * ```
 * 
 * This interface follows the Interface Segregation Principle by composing
 * smaller, focused interfaces rather than having all methods in one large interface.
 */

// Import all the focused interfaces from base folder
import type { IGameObjectIdentity } from './base/IGameObjectIdentity';
import type { IGameObjectTransform } from './base/IGameObjectTransform';
import type { IGameObjectVisual } from './base/IGameObjectVisual';
import type { IGameObjectLifecycle } from './base/IGameObjectLifecycle';
import type { IGameObjectHierarchy } from './base/IGameObjectHierarchy';
import type { IGameObjectComponentSystem } from './base/IGameObjectComponentSystem';
import type { IGameObjectEvents } from './base/IGameObjectEvents';
import type { IGameObjectInteraction } from './base/IGameObjectInteraction';
import type { IGameObjectLayout } from './base/IGameObjectLayout';
import type { IGameObjectUnits } from './base/IGameObjectUnits';
import type { IGameObjectDebug } from './base/IGameObjectDebug';

// ============================================================================
// CORE GAME OBJECT INTERFACE
// ============================================================================

/**
 * Core interface for all game objects in the new system
 * 
 * This interface composes smaller, focused interfaces to provide
 * maximum compatibility with Phaser GameObjects while avoiding
 * the "god interface" anti-pattern.
 */
export interface IGameObject extends
  IGameObjectIdentity,
  IGameObjectTransform,
  IGameObjectVisual,
  IGameObjectLifecycle,
  IGameObjectHierarchy,
  IGameObjectComponentSystem,
  IGameObjectEvents,
  IGameObjectInteraction,
  IGameObjectLayout,
  IGameObjectUnits,
  IGameObjectDebug {
  // This interface is now composed of smaller, focused interfaces
  // All methods and properties are inherited from the extended interfaces above
}

// ============================================================================
// RE-EXPORTS
// ============================================================================

// Re-export the component interface for convenience
export type { IGameObjectComponent } from './base/IGameObjectComponentSystem';

// Re-export the debug info interface for convenience
export type { IGameObjectDebugInfo } from './base/IGameObjectDebug';
