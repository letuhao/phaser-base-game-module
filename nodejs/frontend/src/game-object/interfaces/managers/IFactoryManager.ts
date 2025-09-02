/**
 * Factory Manager Interface
 *
 * Defines management functionality for factory pattern implementations.
 * Handles factory lifecycle, configuration, and object creation management.
 */

import type { IFactory } from '../patterns/IFactory';
import type { IGameObject } from '../IGameObject';
import type { FactoryConfig, FactoryOptions } from '../patterns/IFactory';
import { FactoryType, FactoryState } from '../../enums';

/**
 * Factory manager configuration
 */
export interface FactoryManagerConfig {
  maxFactories: number;
  enablePooling: boolean;
  enableCaching: boolean;
  enableValidation: boolean;
  autoCleanup: boolean;
  cleanupInterval: number;
  metadata?: Record<string, any>;
}

/**
 * Factory manager statistics
 */
export interface FactoryManagerStatistics {
  totalFactories: number;
  activeFactories: number;
  totalObjectsCreated: number;
  totalObjectsDestroyed: number;
  averageCreationTime: number;
  lastCleanupTime: number;
  factoriesByType: Record<FactoryType, number>;
  factoriesByState: Record<FactoryState, number>;
}

/**
 * Interface for factory managers
 */
export interface IFactoryManager {
  readonly factoryManagerId: string;

  /** Factory manager configuration */
  factoryManagerConfig: FactoryManagerConfig;

  /** Managed factories */
  managedFactories: Map<string, IFactory>;

  /** Factory manager statistics */
  factoryManagerStatistics: FactoryManagerStatistics;

  /** Factory manager metadata */
  factoryManagerMetadata: Record<string, any>;

  /** Set factory manager configuration */
  setFactoryManagerConfig(config: FactoryManagerConfig): this;

  /** Set factory manager metadata */
  setFactoryManagerMetadata(metadata: Record<string, any>): this;

  /** Get factory manager configuration */
  getFactoryManagerConfig(): FactoryManagerConfig;

  /** Get managed factories */
  getManagedFactories(): Map<string, IFactory>;

  /** Get factory manager statistics */
  getFactoryManagerStatistics(): FactoryManagerStatistics;

  /** Get factory manager metadata */
  getFactoryManagerMetadata(): Record<string, any>;

  /** Create factory */
  createFactory(factoryId: string, config: FactoryConfig): Promise<IFactory>;

  /** Destroy factory */
  destroyFactory(factoryId: string): Promise<boolean>;

  /** Configure factory */
  configureFactory(factoryId: string, config: FactoryConfig): Promise<boolean>;

  /** Manage factory */
  manageFactory(factory: IFactory): Promise<this>;

  /** Validate factory */
  validateFactory(factory: IFactory): Promise<boolean>;

  /** Optimize factory */
  optimizeFactory(factory: IFactory): Promise<this>;

  /** Get factory by ID */
  getFactory(factoryId: string): IFactory | null;

  /** Check if factory exists */
  hasFactory(factoryId: string): boolean;

  /** Get factories by type */
  getFactoriesByType(type: FactoryType): IFactory[];

  /** Get factories by state */
  getFactoriesByState(state: FactoryState): IFactory[];

  /** Create object through factory */
  createObjectThroughFactory(
    factoryId: string,
    options: FactoryOptions
  ): Promise<IGameObject | null>;

  /** Destroy object through factory */
  destroyObjectThroughFactory(factoryId: string, object: IGameObject): Promise<boolean>;

  /** Clear factory */
  clearFactory(factoryId: string): Promise<this>;

  /** Clear all factories */
  clearAllFactories(): Promise<this>;

  /** Update factory manager */
  updateFactoryManager(deltaTime: number): void;
}
