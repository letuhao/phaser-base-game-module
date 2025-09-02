/**
 * Singleton Pattern Interface
 *
 * Defines singleton functionality for game objects.
 * Handles single instance management and global access.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType, SingletonType, SingletonState } from '../../enums';

/**
 * Singleton configuration
 */
export interface SingletonConfig {
  type: SingletonType;
  name: string;
  autoInitialize: boolean;
  threadSafe: boolean;
  registry: boolean;
  metadata?: any;
}

/**
 * Interface for singleton game objects
 *
 * Extends IGameObject with singleton pattern functionality.
 */
export interface ISingleton extends IGameObject {
  readonly gameObjectType: GameObjectType;

  /** Singleton type */
  singletonType: SingletonType;

  /** Singleton state */
  singletonState: SingletonState;

  /** Singleton manager */
  singletonManager: any; // ISingletonManager

  /** Singleton ID */
  singletonId: string;

  /** Singleton name */
  singletonName: string;

  /** Singleton configuration */
  singletonConfig: SingletonConfig;

  /** Singleton instance */
  singletonInstance: ISingleton | null;

  /** Singleton registry */
  singletonRegistry: Map<string, ISingleton>;

  /** Singleton auto initialize */
  singletonAutoInitialize: boolean;

  /** Singleton thread safe */
  singletonThreadSafe: boolean;

  /** Singleton registry enabled */
  singletonRegistryEnabled: boolean;

  /** Singleton initialization time */
  singletonInitializationTime: number;

  /** Singleton access count */
  singletonAccessCount: number;

  /** Singleton last access time */
  singletonLastAccessTime: number;

  /** Singleton metadata */
  singletonMetadata: any;

  /** Set singleton type */
  setSingletonType(type: SingletonType): this;

  /** Set singleton state */
  setSingletonState(state: SingletonState): this;

  /** Set singleton manager */
  setSingletonManager(manager: any): this;

  /** Set singleton ID */
  setSingletonId(id: string): this;

  /** Set singleton name */
  setSingletonName(name: string): this;

  /** Set singleton configuration */
  setSingletonConfig(config: SingletonConfig): this;

  /** Set singleton instance */
  setSingletonInstance(instance: ISingleton | null): this;

  /** Set singleton registry */
  setSingletonRegistry(registry: Map<string, ISingleton>): this;

  /** Set singleton auto initialize */
  setSingletonAutoInitialize(autoInit: boolean): this;

  /** Set singleton thread safe */
  setSingletonThreadSafe(threadSafe: boolean): this;

  /** Set singleton registry enabled */
  setSingletonRegistryEnabled(enabled: boolean): this;

  /** Set singleton initialization time */
  setSingletonInitializationTime(time: number): this;

  /** Set singleton access count */
  setSingletonAccessCount(count: number): this;

  /** Set singleton last access time */
  setSingletonLastAccessTime(time: number): this;

  /** Set singleton metadata */
  setSingletonMetadata(metadata: any): this;

  /** Get singleton type */
  getSingletonType(): SingletonType;

  /** Get singleton state */
  getSingletonState(): SingletonState;

  /** Get singleton manager */
  getSingletonManager(): any;

  /** Get singleton ID */
  getSingletonId(): string;

  /** Get singleton name */
  getSingletonName(): string;

  /** Get singleton configuration */
  getSingletonConfig(): SingletonConfig;

  /** Get singleton instance */
  getSingletonInstance(): ISingleton | null;

  /** Get singleton registry */
  getSingletonRegistry(): Map<string, ISingleton>;

  /** Get singleton auto initialize */
  getSingletonAutoInitialize(): boolean;

  /** Get singleton thread safe */
  getSingletonThreadSafe(): boolean;

  /** Get singleton registry enabled */
  getSingletonRegistryEnabled(): boolean;

  /** Get singleton initialization time */
  getSingletonInitializationTime(): number;

  /** Get singleton access count */
  getSingletonAccessCount(): number;

  /** Get singleton last access time */
  getSingletonLastAccessTime(): number;

  /** Get singleton metadata */
  getSingletonMetadata(): any;

  /** Get instance */
  getInstance(): ISingleton;

  /** Initialize singleton */
  initializeSingleton(): Promise<ISingleton>;

  /** Destroy singleton */
  destroySingleton(): this;

  /** Register singleton */
  registerSingleton(name: string, instance: ISingleton): this;

  /** Unregister singleton */
  unregisterSingleton(name: string): this;

  /** Get singleton by name */
  getSingletonByName(name: string): ISingleton | null;

  /** Check if singleton exists */
  hasSingleton(name: string): boolean;

  /** Check if singleton is initialized */
  isSingletonInitialized(): boolean;

  /** Check if singleton can be accessed */
  canSingletonBeAccessed(): boolean;

  /** Check if singleton is thread safe */
  isSingletonThreadSafe(): boolean;

  /** Update singleton */
  updateSingleton(deltaTime: number): void;
}
