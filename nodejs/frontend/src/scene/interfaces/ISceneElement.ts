/**
 * Scene Element Interface
 *
 * Defines a scene element that can be composed into scenes.
 * Integrates with Game Object, Layout, and Unit systems.
 */

import type { IGameObject } from '../../game-object/interfaces/IGameObject';
import type { IStyle } from '../../layout/interfaces/IStyle';
import type { IUnit } from '../../unit/interfaces/IUnit';
import type { ISceneElementManager } from './managers/ISceneElementManager';
import { GameObjectType } from '../../game-object/enums/GameObjectEnums';
import { SceneElementType, SceneElementState } from '../enums';

// SceneElementType and SceneElementState are now imported from centralized enums

/**
 * Scene element configuration
 */
export interface SceneElementConfig {
  id: string;
  type: SceneElementType;
  name: string;
  gameObjectType: GameObjectType;
  gameObjectInterface?: string;

  // Position and size using unit system
  position?: {
    x: IUnit;
    y: IUnit;
    z?: IUnit;
  };

  size?: {
    width: IUnit;
    height: IUnit;
    depth?: IUnit;
  };

  // Layout properties integration
  layout?: IStyle;

  // Responsive behavior
  responsive?: {
    breakpoints: Record<string, Partial<SceneElementConfig>>;
    defaultBreakpoint: string;
  };

  // Theme integration
  theme?: {
    themeClass: string;
    themeVariants?: string[];
    customProperties?: Record<string, any>;
  };

  // Factory configuration
  factory?: {
    className: string;
    createMethod: string;
    constructorParams?: any;
  };

  // Game object properties
  properties?: Record<string, any>;

  // Children elements
  children?: SceneElementConfig[];

  // Parent reference
  parentId?: string;

  // Metadata
  metadata?: Record<string, any>;
}

/**
 * Interface for scene elements
 *
 * Represents a composable element within a scene that integrates
 * game objects, layout, and unit systems.
 */
export interface ISceneElement {
  readonly elementId: string;
  readonly elementType: SceneElementType;

  /** Element state */
  elementState: SceneElementState;

  /** Element configuration */
  elementConfig: SceneElementConfig;

  /** Associated game object */
  gameObject: IGameObject | null;

  /** Parent element */
  parentElement: ISceneElement | null;

  /** Child elements */
  childElements: ISceneElement[];

  /** Element manager */
  elementManager: ISceneElementManager;

  /** Element creation time */
  elementCreationTime: number;

  /** Element last update time */
  elementLastUpdateTime: number;

  /** Element metadata */
  elementMetadata: Record<string, any>;

  /** Set element state */
  setElementState(state: SceneElementState): this;

  /** Set element configuration */
  setElementConfig(config: SceneElementConfig): this;

  /** Set game object */
  setGameObject(gameObject: IGameObject | null): this;

  /** Set parent element */
  setParentElement(parent: ISceneElement | null): this;

  /** Set child elements */
  setChildElements(children: ISceneElement[]): this;

  /** Set element manager */
  setElementManager(manager: ISceneElementManager): this;

  /** Set element creation time */
  setElementCreationTime(time: number): this;

  /** Set element last update time */
  setElementLastUpdateTime(time: number): this;

  /** Set element metadata */
  setElementMetadata(metadata: Record<string, any>): this;

  /** Get element state */
  getElementState(): SceneElementState;

  /** Get element configuration */
  getElementConfig(): SceneElementConfig;

  /** Get game object */
  getGameObject(): IGameObject | null;

  /** Get parent element */
  getParentElement(): ISceneElement | null;

  /** Get child elements */
  getChildElements(): ISceneElement[];

  /** Get element manager */
  getElementManager(): ISceneElementManager;

  /** Get element creation time */
  getElementCreationTime(): number;

  /** Get element last update time */
  getElementLastUpdateTime(): number;

  /** Get element metadata */
  getElementMetadata(): Record<string, any>;

  /** Create element */
  createElement(): Promise<this>;

  /** Destroy element */
  destroyElement(): Promise<this>;

  /** Add child element */
  addChildElement(child: ISceneElement): this;

  /** Remove child element */
  removeChildElement(childId: string): this;

  /** Get child element by ID */
  getChildElementById(childId: string): ISceneElement | null;

  /** Update element */
  updateElement(deltaTime: number): void;

  /** Apply responsive configuration */
  applyResponsiveConfig(breakpoint: string): this;

  /** Apply theme configuration */
  applyThemeConfig(themeClass: string): this;

  /** Check if element is active */
  isElementActive(): boolean;

  /** Check if element has children */
  hasChildren(): boolean;

  /** Check if element is root */
  isRootElement(): boolean;

  /** Get element hierarchy depth */
  getElementDepth(): number;

  /** Get element path */
  getElementPath(): string[];
}
