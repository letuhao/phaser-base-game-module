/**
 * Container Game Object Interface
 *
 * Defines container-specific functionality for game objects.
 * This interface extends IGameObject with container-specific features.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType, ContainerType, SortOrder } from '../../enums';

/**
 * Interface for container game objects
 *
 * Extends IGameObject with container-specific functionality for managing
 * child objects, layout constraints, and container-specific behaviors.
 *
 * Example implementation:
 * ```typescript
 * class MyContainer extends Phaser.GameObjects.Container implements IContainer {
 *   readonly gameObjectType = 'container' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IContainer extends IGameObject {
  // ============================================================================
  // CONTAINER IDENTITY
  // ============================================================================

  /** The type of this container (always 'container') */
  readonly gameObjectType: GameObjectType;

  // ============================================================================
  // CONTAINER PROPERTIES
  // ============================================================================

  /** Maximum size constraints for this container */
  readonly maxSize?: {
    width: number;
    height: number;
  };

  /** Whether children can be sorted */
  sortableChildren: boolean;

  /** Flag indicating if children need to be sorted */
  sortChildrenFlag: boolean;

  /** Container type (e.g., 'div', 'section', 'article') */
  readonly containerType: ContainerType;

  // ============================================================================
  // CONTAINER METHODS
  // ============================================================================

  /** Add a child at a specific index */
  addAt(child: IGameObject, index: number): this;

  /** Get child at specific index */
  getAt(index: number): IGameObject | undefined;

  /** Get first child matching property and value */
  getFirst(property: string, value: any): IGameObject | undefined;

  /** Get all children matching property and value */
  getAll(property: string, value: any): IGameObject[];

  /** Set maximum size for this container */
  setMaxSize(width: number, height: number): this;

  /** Set whether children can be sorted */
  setSortableChildren(value: boolean): this;

  /** Sort children by property */
  sortChildren(property: string, order: SortOrder): this;

  /** Get container bounds including all children */
  getContainerBounds(): Phaser.Geom.Rectangle;

  /** Check if container is empty */
  isEmpty(): boolean;

  /** Get container depth (number of nested levels) */
  getContainerDepth(): number;

  /** Find child by name recursively */
  findChildByName(name: string, recursive?: boolean): IGameObject | undefined;

  /** Find all children by type recursively */
  findChildrenByType<T extends IGameObject>(type: GameObjectType, recursive?: boolean): T[];
}
