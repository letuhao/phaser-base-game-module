/**
 * Scene Builder Interface
 *
 * Defines scene building functionality that creates scenes from configurations.
 * Integrates with Game Object, Layout, and Unit systems.
 */

import type { ISceneElement } from './ISceneElement';
import type { ISceneConfig } from './ISceneConfig';
import type { IGameObject } from '../../game-object/interfaces/IGameObject';
import type { IStyle } from '../../layout/interfaces/IStyle';
import type { IUnit } from '../../unit/interfaces/IUnit';
import type { ISceneBuilderManager } from './managers/ISceneBuilderManager';
import type { ISceneBuilderContext } from './context/ISceneBuilderContext';
import { SceneElementType, SceneBuilderType, SceneBuilderState } from '../enums';

// SceneBuilderType and SceneBuilderState are now imported from centralized enums

/**
 * Builder context
 */
export interface SceneBuilderContext extends ISceneBuilderContext {
  scene: any; // Phaser.Scene
  metadata?: Record<string, any>;
}

/**
 * Builder options
 */
export interface SceneBuilderOptions {
  builderType: SceneBuilderType;
  validateConfig: boolean;
  createGameObjects: boolean;
  applyLayout: boolean;
  applyTheme: boolean;
  applyResponsive: boolean;
  parallelCreation: boolean;
  maxRetries: number;
  timeout: number;
  metadata?: Record<string, any>;
}

/**
 * Interface for scene builders
 *
 * Handles the creation and composition of scenes from configurations.
 */
export interface ISceneBuilder {
  readonly builderId: string;
  readonly builderType: SceneBuilderType;

  /** Builder state */
  builderState: SceneBuilderState;

  /** Builder context */
  builderContext: SceneBuilderContext;

  /** Builder options */
  builderOptions: SceneBuilderOptions;

  /** Builder manager */
  builderManager: ISceneBuilderManager;

  /** Built scene elements */
  builtElements: Map<string, ISceneElement>;

  /** Builder progress */
  builderProgress: {
    total: number;
    completed: number;
    failed: number;
    percentage: number;
  };

  /** Builder errors */
  builderErrors: string[];

  /** Builder metadata */
  builderMetadata: Record<string, any>;

  /** Set builder state */
  setBuilderState(state: SceneBuilderState): this;

  /** Set builder context */
  setBuilderContext(context: SceneBuilderContext): this;

  /** Set builder options */
  setBuilderOptions(options: SceneBuilderOptions): this;

  /** Set builder manager */
  setBuilderManager(manager: ISceneBuilderManager): this;

  /** Set built elements */
  setBuiltElements(elements: Map<string, ISceneElement>): this;

  /** Set builder progress */
  setBuilderProgress(progress: {
    total: number;
    completed: number;
    failed: number;
    percentage: number;
  }): this;

  /** Set builder errors */
  setBuilderErrors(errors: string[]): this;

  /** Set builder metadata */
  setBuilderMetadata(metadata: Record<string, any>): this;

  /** Get builder state */
  getBuilderState(): SceneBuilderState;

  /** Get builder context */
  getBuilderContext(): SceneBuilderContext;

  /** Get builder options */
  getBuilderOptions(): SceneBuilderOptions;

  /** Get builder manager */
  getBuilderManager(): ISceneBuilderManager;

  /** Get built elements */
  getBuiltElements(): Map<string, ISceneElement>;

  /** Get builder progress */
  getBuilderProgress(): { total: number; completed: number; failed: number; percentage: number };

  /** Get builder errors */
  getBuilderErrors(): string[];

  /** Get builder metadata */
  getBuilderMetadata(): Record<string, any>;

  /** Build scene from configuration */
  buildScene(config: ISceneConfig): Promise<Map<string, ISceneElement>>;

  /** Build scene element */
  buildElement(elementConfig: any, parent?: ISceneElement): Promise<ISceneElement>;

  /** Create game object for element */
  createGameObject(elementConfig: any): Promise<IGameObject | null>;

  /** Apply layout to element */
  applyLayout(element: ISceneElement, layout: IStyle): Promise<this>;

  /** Apply theme to element */
  applyTheme(element: ISceneElement, themeClass: string): Promise<this>;

  /** Apply responsive configuration */
  applyResponsive(element: ISceneElement, breakpoint: string): Promise<this>;

  /** Convert unit values */
  convertUnitValue(unitValue: IUnit, context: any): number;

  /** Validate element configuration */
  validateElementConfig(elementConfig: any): boolean;

  /** Get element by ID */
  getElementById(elementId: string): ISceneElement | null;

  /** Get elements by type */
  getElementsByType(elementType: SceneElementType): ISceneElement[];

  /** Get root elements */
  getRootElements(): ISceneElement[];

  /** Clear builder */
  clearBuilder(): this;

  /** Reset builder */
  resetBuilder(): this;

  /** Check if builder is complete */
  isBuilderComplete(): boolean;

  /** Check if builder has errors */
  hasBuilderErrors(): boolean;

  /** Check if builder can proceed */
  canBuilderProceed(): boolean;

  /** Update builder */
  updateBuilder(deltaTime: number): void;
}
