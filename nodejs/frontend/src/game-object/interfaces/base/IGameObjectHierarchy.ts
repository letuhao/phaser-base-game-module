/**
 * Game Object Hierarchy Interface
 * 
 * Defines hierarchy-related properties and methods for game objects.
 * This interface focuses solely on parent/child relationships and hierarchy management.
 */

/**
 * Interface for game object hierarchy management
 */
export interface IGameObjectHierarchy {
  // ============================================================================
  // HIERARCHY PROPERTIES
  // ============================================================================
  
  /** Parent game object (null if root) */
  readonly gameObjectParent: IGameObjectHierarchy | null;
  
  /** Array of child game objects */
  readonly gameObjectChildren: readonly IGameObjectHierarchy[];
  
  // ============================================================================
  // HIERARCHY METHODS
  // ============================================================================
  
  /** Add a child game object */
  addGameObjectChild(child: IGameObjectHierarchy): this;
  
  /** Remove a child game object */
  removeGameObjectChild(child: IGameObjectHierarchy): this;
  
  /** Remove all children */
  removeAllGameObjectChildren(): this;
  
  /** Check if this object contains a child */
  containsGameObjectChild(child: IGameObjectHierarchy): boolean;
  
  /** Get child at index */
  getGameObjectChildAt(index: number): IGameObjectHierarchy | undefined;
  
  /** Get child by name */
  getGameObjectChildByName(name: string): IGameObjectHierarchy | undefined;
  
  /** Get child count */
  getGameObjectChildCount(): number;
  
  /** Get all children */
  getAllGameObjectChildren(): IGameObjectHierarchy[];
}
