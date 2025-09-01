/**
 * Scene Element Manager Interface
 * 
 * Defines management functionality for scene elements.
 */

import type { ISceneElement } from '../ISceneElement';
import type { SceneElementType, SceneElementState } from '../ISceneElement';


/**
 * Element manager operations
 */
export enum ElementManagerOperation {
  CREATE = 'create',
  DESTROY = 'destroy',
  UPDATE = 'update',
  ACTIVATE = 'activate',
  DEACTIVATE = 'deactivate',
  MOVE = 'move',
  RESIZE = 'resize',
  REPARENT = 'reparent'
}

/**
 * Element manager configuration
 */
export interface ElementManagerConfig {
  maxElements: number;
  enablePooling: boolean;
  enableCaching: boolean;
  updateInterval: number;
  metadata?: Record<string, any>;
}

/**
 * Element manager statistics
 */
export interface ElementManagerStatistics {
  totalElements: number;
  activeElements: number;
  inactiveElements: number;
  elementsByType: Record<SceneElementType, number>;
  elementsByState: Record<SceneElementState, number>;
  operationsPerformed: Record<ElementManagerOperation, number>;
  lastUpdateTime: number;
}

/**
 * Interface for scene element managers
 */
export interface ISceneElementManager {
  readonly managerId: string;
  
  /** Manager configuration */
  managerConfig: ElementManagerConfig;
  
  /** Managed elements */
  managedElements: Map<string, ISceneElement>;
  
  /** Element pools */
  elementPools: Map<SceneElementType, ISceneElement[]>;
  
  /** Manager statistics */
  managerStatistics: ElementManagerStatistics;
  
  /** Manager metadata */
  managerMetadata: Record<string, any>;
  
  /** Set manager configuration */
  setManagerConfig(config: ElementManagerConfig): this;
  
  /** Set manager metadata */
  setManagerMetadata(metadata: Record<string, any>): this;
  
  /** Get manager configuration */
  getManagerConfig(): ElementManagerConfig;
  
  /** Get managed elements */
  getManagedElements(): Map<string, ISceneElement>;
  
  /** Get manager statistics */
  getManagerStatistics(): ElementManagerStatistics;
  
  /** Get manager metadata */
  getManagerMetadata(): Record<string, any>;
  
  /** Register element */
  registerElement(element: ISceneElement): this;
  
  /** Unregister element */
  unregisterElement(elementId: string): this;
  
  /** Get element by ID */
  getElementById(elementId: string): ISceneElement | null;
  
  /** Get elements by type */
  getElementsByType(elementType: SceneElementType): ISceneElement[];
  
  /** Get elements by state */
  getElementsByState(elementState: SceneElementState): ISceneElement[];
  
  /** Create element */
  createElement(
    elementType: SceneElementType,
    config: any,
    parent?: ISceneElement
  ): Promise<ISceneElement>;
  
  /** Destroy element */
  destroyElement(elementId: string): Promise<boolean>;
  
  /** Update element */
  updateElement(elementId: string, deltaTime: number): void;
  
  /** Update all elements */
  updateAllElements(deltaTime: number): void;
  
  /** Activate element */
  activateElement(elementId: string): Promise<boolean>;
  
  /** Deactivate element */
  deactivateElement(elementId: string): Promise<boolean>;
  
  /** Move element */
  moveElement(elementId: string, newParentId: string): Promise<boolean>;
  
  /** Get element from pool */
  getElementFromPool(elementType: SceneElementType): ISceneElement | null;
  
  /** Return element to pool */
  returnElementToPool(element: ISceneElement): this;
  
  /** Clear element pool */
  clearElementPool(elementType: SceneElementType): this;
  
  /** Clear all pools */
  clearAllPools(): this;
  
  /** Check if element exists */
  hasElement(elementId: string): boolean;
  
  /** Check if element is active */
  isElementActive(elementId: string): boolean;
  
  /** Get element count */
  getElementCount(): number;
  
  /** Get active element count */
  getActiveElementCount(): number;
  
  /** Clear all elements */
  clearAllElements(): Promise<this>;
  
  /** Update manager */
  updateManager(deltaTime: number): void;
}
