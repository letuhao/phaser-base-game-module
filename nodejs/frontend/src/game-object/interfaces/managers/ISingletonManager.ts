/**
 * Singleton Manager Interface
 * 
 * Defines management functionality for singleton pattern implementations.
 * Handles singleton lifecycle, instance management, and access control.
 */

import type { ISingleton } from '../patterns/ISingleton';
import { ManagerType, AccessType } from '../../enums';
import type { IGameObject } from '../IGameObject';

/**
 * Singleton manager configuration
 */
export interface SingletonManagerConfig {
  maxSingletons: number;
  enableInstanceCaching: boolean;
  enableSingletonValidation: boolean;
  enableAccessLogging: boolean;
  enableLazyInitialization: boolean;
  autoCleanup: boolean;
  metadata?: Record<string, any>;
}

/**
 * Singleton manager statistics
 */
export interface SingletonManagerStatistics {
  totalSingletons: number;
  activeSingletons: number;
  totalInstances: number;
  totalAccesses: number;
  averageAccessTime: number;
  lastAccessTime: number;
  singletonsByType: Record<string, number>;
  accessCounts: Record<string, number>;
}

/**
 * Singleton instance
 */
export interface SingletonInstance {
  instanceId: string;
  singletonId: string;
  instance: IGameObject;
  creationTime: number;
  lastAccessTime: number;
  accessCount: number;
  instanceMetadata?: Record<string, any>;
}

/**
 * Singleton access context
 */
export interface SingletonAccessContext {
  contextId: string;
  singletonId: string;
  accessType: AccessType;
  accessParameters: Record<string, any>;
  accessMetadata?: Record<string, any>;
}

/**
 * Interface for singleton managers
 */
export interface ISingletonManager {
  readonly singletonManagerId: string;
  
  /** Singleton manager configuration */
  singletonManagerConfig: SingletonManagerConfig;
  
  /** Managed singletons */
  managedSingletons: Map<string, ISingleton>;
  
  /** Singleton instances */
  singletonInstances: Map<string, SingletonInstance>;
  
  /** Singleton access contexts */
  singletonAccessContexts: Map<string, SingletonAccessContext>;
  
  /** Singleton manager statistics */
  singletonManagerStatistics: SingletonManagerStatistics;
  
  /** Singleton manager metadata */
  singletonManagerMetadata: Record<string, any>;
  
  /** Set singleton manager configuration */
  setSingletonManagerConfig(config: SingletonManagerConfig): this;
  
  /** Set singleton manager metadata */
  setSingletonManagerMetadata(metadata: Record<string, any>): this;
  
  /** Get singleton manager configuration */
  getSingletonManagerConfig(): SingletonManagerConfig;
  
  /** Get managed singletons */
  getManagedSingletons(): Map<string, ISingleton>;
  
  /** Get singleton instances */
  getSingletonInstances(): Map<string, SingletonInstance>;
  
  /** Get singleton access contexts */
  getSingletonAccessContexts(): Map<string, SingletonAccessContext>;
  
  /** Get singleton manager statistics */
  getSingletonManagerStatistics(): SingletonManagerStatistics;
  
  /** Get singleton manager metadata */
  getSingletonManagerMetadata(): Record<string, any>;
  
  /** Create singleton */
  createSingleton(singletonId: string): Promise<ISingleton>;
  
  /** Destroy singleton */
  destroySingleton(singletonId: string): Promise<boolean>;
  
  /** Manage singleton */
  manageSingleton(singleton: ISingleton): Promise<this>;
  
  /** Get singleton instance */
  getSingletonInstance(singletonId: string, context: SingletonAccessContext): Promise<IGameObject | null>;
  
  /** Reset singleton */
  resetSingleton(singletonId: string): Promise<boolean>;
  
  /** Get singleton by ID */
  getSingleton(singletonId: string): ISingleton | null;
  
  /** Check if singleton exists */
  hasSingleton(singletonId: string): boolean;
  
  /** Get singletons by type */
  getSingletonsByType(type: ManagerType): ISingleton[];
  
  /** Get instance by ID */
  getInstance(instanceId: string): SingletonInstance | null;
  
  /** Get access context by ID */
  getAccessContext(contextId: string): SingletonAccessContext | null;
  
  /** Get instance for singleton */
  getInstanceForSingleton(singletonId: string): SingletonInstance | null;
  
  /** Validate singleton */
  validateSingleton(singleton: ISingleton): Promise<boolean>;
  
  /** Clear singleton instance */
  clearSingletonInstance(singletonId: string): Promise<this>;
  
  /** Clear all instances */
  clearAllInstances(): Promise<this>;
  
  /** Update singleton manager */
  updateSingletonManager(deltaTime: number): void;
}
