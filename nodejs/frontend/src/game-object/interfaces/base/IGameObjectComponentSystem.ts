/**
 * Game Object Component System Interface
 * 
 * Defines component system-related properties and methods for game objects.
 * This interface focuses solely on component management concerns.
 */

import type { ComponentType } from '../constants/GameObjectConstants';

/**
 * Component interface for the component system
 */
export interface IGameObjectComponent {
  /** Unique name of the component */
  readonly name: string;
  
  /** Type of the component */
  readonly type: ComponentType;
  
  /** Current state of the component */
  readonly state: 'creating' | 'created' | 'active' | 'inactive' | 'destroying' | 'destroyed';
  
  /** The game object this component belongs to */
  readonly gameObject: IGameObjectComponentSystem;
  
  /** Whether the component is enabled */
  readonly enabled: boolean;
  
  /** Initialize the component */
  initialize(): void;
  
  /** Update the component */
  update(time: number, delta: number): void;
  
  /** Destroy the component */
  destroy(): void;
  
  /** Enable the component */
  enable(): void;
  
  /** Disable the component */
  disable(): void;
}

/**
 * Interface for game object component system management
 */
export interface IGameObjectComponentSystem {
  // ============================================================================
  // COMPONENT PROPERTIES
  // ============================================================================
  
  /** Map of attached components */
  readonly gameObjectComponents: ReadonlyMap<ComponentType, IGameObjectComponent>;
  
  // ============================================================================
  // COMPONENT METHODS
  // ============================================================================
  
  /** Whether this game object has a specific component */
  hasGameObjectComponent(componentType: ComponentType): boolean;
  
  /** Get a specific component */
  getGameObjectComponent<T extends IGameObjectComponent>(componentType: ComponentType): T | undefined;
  
  /** Add a component to this game object */
  addGameObjectComponent(component: IGameObjectComponent): void;
  
  /** Remove a component from this game object */
  removeGameObjectComponent(componentType: ComponentType): void;
}
