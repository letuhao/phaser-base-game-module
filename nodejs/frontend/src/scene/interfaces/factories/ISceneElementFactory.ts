/**
 * Scene Element Factory Interface
 *
 * Defines factory functionality for creating scene elements.
 * Handles element creation with different strategies and configurations.
 */

import type { ISceneElement } from '../ISceneElement';
import type { IGameObject } from '../../../game-object/interfaces/IGameObject';
import type { SceneElementConfig } from '../ISceneElement';
import { SceneElementType } from '../../enums';
// SceneElementFactoryOperation is imported from centralized enums but not used in this file

// SceneElementFactoryOperation is now imported from centralized enums

/**
 * Scene element factory configuration
 */
export interface SceneElementFactoryConfig {
  maxElements: number;
  enablePooling: boolean;
  enableCaching: boolean;
  enableValidation: boolean;
  autoCleanup: boolean;
  cleanupInterval: number;
  metadata?: Record<string, any>;
}

/**
 * Scene element factory statistics
 */
export interface SceneElementFactoryStatistics {
  totalElements: number;
  activeElements: number;
  totalCreations: number;
  totalDestructions: number;
  averageCreationTime: number;
  lastCleanupTime: number;
  elementsByType: Record<SceneElementType, number>;
  creationCounts: Record<SceneElementType, number>;
}

/**
 * Scene element creation context
 */
export interface SceneElementCreationContext {
  contextId: string;
  elementType: SceneElementType;
  elementConfig: SceneElementConfig;
  parentElement?: ISceneElement;
  creationParameters: Record<string, any>;
  creationMetadata?: Record<string, any>;
}

/**
 * Scene element creation result
 */
export interface SceneElementCreationResult {
  success: boolean;
  element: ISceneElement | null;
  gameObject: IGameObject | null;
  creationTime: number;
  errorMessage?: string;
  creationMetadata?: Record<string, any>;
}

/**
 * Interface for scene element factories
 */
export interface ISceneElementFactory {
  readonly factoryId: string;

  /** Factory configuration */
  factoryConfig: SceneElementFactoryConfig;

  /** Factory statistics */
  factoryStatistics: SceneElementFactoryStatistics;

  /** Factory metadata */
  factoryMetadata: Record<string, any>;

  /** Set factory configuration */
  setFactoryConfig(config: SceneElementFactoryConfig): this;

  /** Set factory metadata */
  setFactoryMetadata(metadata: Record<string, any>): this;

  /** Get factory configuration */
  getFactoryConfig(): SceneElementFactoryConfig;

  /** Get factory statistics */
  getFactoryStatistics(): SceneElementFactoryStatistics;

  /** Get factory metadata */
  getFactoryMetadata(): Record<string, any>;

  /** Create scene element */
  createElement(context: SceneElementCreationContext): Promise<SceneElementCreationResult>;

  /** Destroy scene element */
  destroyElement(element: ISceneElement): Promise<boolean>;

  /** Configure scene element */
  configureElement(element: ISceneElement, config: SceneElementConfig): Promise<boolean>;

  /** Validate scene element */
  validateElement(element: ISceneElement): Promise<boolean>;

  /** Optimize scene element */
  optimizeElement(element: ISceneElement): Promise<this>;

  /** Get elements by type */
  getElementsByType(type: SceneElementType): ISceneElement[];

  /** Get creation context by ID */
  getCreationContext(contextId: string): SceneElementCreationContext | null;

  /** Clear factory */
  clearFactory(): Promise<this>;

  /** Update factory */
  updateFactory(deltaTime: number): void;
}
