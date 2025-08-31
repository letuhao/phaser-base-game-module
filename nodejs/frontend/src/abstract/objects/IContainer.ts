import type { IGameObject } from '../base/IGameObject';

/**
 * IContainer Interface
 * Minimal, Phaser-compatible interface for container game objects
 *
 * Key Principles:
 * - No inheritance conflicts with Phaser.GameObjects.Container
 * - Composition over inheritance for responsive behavior
 * - Essential container functionality only
 * - Clean, maintainable interface
 */
export interface IContainer {
  // ===== ESSENTIAL PROPERTIES =====

  /** Unique identifier for this container */
  readonly id: string;

  /** Parent container (null if root) */
  readonly parent: IContainer | null;

  /** Array of child game objects */
  readonly children: IGameObject[];

  /** Number of children */
  readonly childCount: number;

  /** Whether this container has children */
  readonly hasChildren: boolean;

  /** Whether this container is empty */
  readonly isEmpty: boolean;

  /** Container type for layout systems */
  readonly containerType: 'div' | 'flexbox' | 'grid' | 'stack' | 'dock' | 'flow' | 'absolute';

  /** Spacing properties for layout containers */
  readonly spacing?: {
    gap?: number;
    padding?: {
      left?: number;
      right?: number;
      top?: number;
      bottom?: number;
    };
  };

  // ===== ESSENTIAL CHILDREN MANAGEMENT METHODS =====

  /** Add a child game object to this container */
  addChild(child: IGameObject): void;

  /** Remove a child game object from this container */
  removeChild(child: IGameObject): void;

  /** Get child by ID */
  getChild(id: string): IGameObject | undefined;

  /** Get all children */
  getAllChildren(): IGameObject[];

  /** Clear all children */
  clearChildren(): void;

  // ===== RESPONSIVE BEHAVIOR =====

  /** Handle responsive resize from scene */
  handleResponsiveResize(width: number, height: number): void;

  /** Handle resize events and propagate to children */
  resize(width: number, height: number): void;

  // ===== UTILITY METHODS =====

  /** Get layout information */
  getLayoutInfo(): {
    id: string;
    type: string;
    childCount: number;
    layoutDirection?: string;
    layoutAlignment?: any;
    spacing?: any;
    constraints?: any;
  };

  /** Get container bounds for responsive sizing */
  getContainerBounds(): {
    x: number;
    y: number;
    width: number;
    height: number;
  };

  /** Invalidate layout (trigger recalculation) */
  invalidateLayout(): void;

  /** Update layout */
  updateLayout(): void;
}
