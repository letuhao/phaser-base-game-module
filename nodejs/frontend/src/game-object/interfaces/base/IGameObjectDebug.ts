/**
 * Game Object Debug Interface
 * 
 * Defines debug-related methods for game objects.
 * This interface focuses solely on debugging and utility concerns.
 */

import type { GameObjectType, GameObjectState, ComponentType } from '../../enums';

/**
 * Debug information interface
 */
export interface IGameObjectDebugInfo {
  /** Basic information */
  gameObjectId: string;
  gameObjectName: string;
  gameObjectType: GameObjectType;
  gameObjectState: GameObjectState;
  
  /** Transform information */
  gameObjectTransform: {
    x: number;
    y: number;
    z: number;
    scaleX: number;
    scaleY: number;
    rotation: number;
    width: number;
    height: number;
  };
  
  /** Component information */
  gameObjectComponents: {
    count: number;
    types: ComponentType[];
  };
  
  /** Hierarchy information */
  gameObjectHierarchy: {
    parent: string | null;
    children: number;
    depth: number;
  };
  
  /** Performance information */
  gameObjectPerformance: {
    updateTime: number;
    renderTime: number;
    memoryUsage: number;
  };
}

/**
 * Interface for game object debug capabilities
 */
export interface IGameObjectDebug {
  // ============================================================================
  // DEBUG METHODS
  // ============================================================================
  
  /** Clone this game object */
  cloneGameObject(): IGameObjectDebug;
  
  /** Get debug information */
  getGameObjectDebugInfo(): IGameObjectDebugInfo;
}
