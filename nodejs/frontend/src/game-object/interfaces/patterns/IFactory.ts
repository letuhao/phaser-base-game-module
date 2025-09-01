/**
 * Factory Pattern Interface
 * 
 * Defines factory functionality for creating game objects.
 * Handles object creation with different strategies and configurations.
 */

import type { IGameObject } from '../IGameObject';
import type { IFactoryManager } from '../managers/IFactoryManager';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Factory types
 */
export enum FactoryType {
  SIMPLE = 'simple',
  BUILDER = 'builder',
  PROTOTYPE = 'prototype',
  ABSTRACT = 'abstract',
  SINGLETON = 'singleton'
}

/**
 * Factory states
 */
export enum FactoryState {
  IDLE = 'idle',
  CREATING = 'creating',
  ERROR = 'error',
  DISABLED = 'disabled'
}

/**
 * Factory configuration
 */
export interface FactoryConfig {
  type: FactoryType;
  maxInstances?: number;
  poolSize?: number;
  autoDestroy?: boolean;
  validation?: boolean;
  caching?: boolean;
  metadata?: any;
}

/**
 * Factory creation options
 */
export interface FactoryOptions {
  scene: Phaser.Scene;
  x?: number;
  y?: number;
  config?: any;
  parent?: Phaser.GameObjects.Container;
  name?: string;
  tags?: string[];
  metadata?: any;
}

/**
 * Interface for factory game objects
 * 
 * Extends IGameObject with factory pattern functionality.
 */
export interface IFactory extends IGameObject {
  readonly gameObjectType: GameObjectType.FACTORY;
  
  /** Factory type */
  factoryType: FactoryType;
  
  /** Factory state */
  factoryState: FactoryState;
  
  /** Factory configuration */
  factoryConfig: FactoryConfig;
  
  /** Factory manager */
  factoryManager: IFactoryManager;
  
  /** Factory ID */
  factoryId: string;
  
  /** Factory name */
  factoryName: string;
  
  /** Factory creation count */
  factoryCreationCount: number;
  
  /** Factory max instances */
  factoryMaxInstances: number;
  
  /** Factory pool size */
  factoryPoolSize: number;
  
  /** Factory auto destroy */
  factoryAutoDestroy: boolean;
  
  /** Factory validation */
  factoryValidation: boolean;
  
  /** Factory caching */
  factoryCaching: boolean;
  
  /** Factory metadata */
  factoryMetadata: any;
  
  /** Factory created objects */
  factoryCreatedObjects: IGameObject[];
  
  /** Factory object pool */
  factoryObjectPool: IGameObject[];
  
  /** Set factory type */
  setFactoryType(type: FactoryType): this;
  
  /** Set factory state */
  setFactoryState(state: FactoryState): this;
  
  /** Set factory configuration */
  setFactoryConfig(config: FactoryConfig): this;
  
  /** Set factory manager */
  setFactoryManager(manager: IFactoryManager): this;
  
  /** Set factory ID */
  setFactoryId(id: string): this;
  
  /** Set factory name */
  setFactoryName(name: string): this;
  
  /** Set factory creation count */
  setFactoryCreationCount(count: number): this;
  
  /** Set factory max instances */
  setFactoryMaxInstances(max: number): this;
  
  /** Set factory pool size */
  setFactoryPoolSize(size: number): this;
  
  /** Set factory auto destroy */
  setFactoryAutoDestroy(autoDestroy: boolean): this;
  
  /** Set factory validation */
  setFactoryValidation(validation: boolean): this;
  
  /** Set factory caching */
  setFactoryCaching(caching: boolean): this;
  
  /** Set factory metadata */
  setFactoryMetadata(metadata: any): this;
  
  /** Set factory created objects */
  setFactoryCreatedObjects(objects: IGameObject[]): this;
  
  /** Set factory object pool */
  setFactoryObjectPool(pool: IGameObject[]): this;
  
  /** Get factory type */
  getFactoryType(): FactoryType;
  
  /** Get factory state */
  getFactoryState(): FactoryState;
  
  /** Get factory configuration */
  getFactoryConfig(): FactoryConfig;
  
  /** Get factory manager */
  getFactoryManager(): IFactoryManager;
  
  /** Get factory ID */
  getFactoryId(): string;
  
  /** Get factory name */
  getFactoryName(): string;
  
  /** Get factory creation count */
  getFactoryCreationCount(): number;
  
  /** Get factory max instances */
  getFactoryMaxInstances(): number;
  
  /** Get factory pool size */
  getFactoryPoolSize(): number;
  
  /** Get factory auto destroy */
  getFactoryAutoDestroy(): boolean;
  
  /** Get factory validation */
  getFactoryValidation(): boolean;
  
  /** Get factory caching */
  getFactoryCaching(): boolean;
  
  /** Get factory metadata */
  getFactoryMetadata(): any;
  
  /** Get factory created objects */
  getFactoryCreatedObjects(): IGameObject[];
  
  /** Get factory object pool */
  getFactoryObjectPool(): IGameObject[];
  
  /** Create object */
  createObject(options: FactoryOptions): IGameObject | null;
  
  /** Create object from pool */
  createObjectFromPool(options: FactoryOptions): IGameObject | null;
  
  /** Return object to pool */
  returnObjectToPool(object: IGameObject): this;
  
  /** Destroy object */
  destroyObject(object: IGameObject): this;
  
  /** Clear factory */
  clearFactory(): this;
  
  /** Validate factory */
  validateFactory(): boolean;
  
  /** Check if factory can create */
  canFactoryCreate(): boolean;
  
  /** Check if factory has capacity */
  hasFactoryCapacity(): boolean;
  
  /** Update factory */
  updateFactory(deltaTime: number): void;
}
