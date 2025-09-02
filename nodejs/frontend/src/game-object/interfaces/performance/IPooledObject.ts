/**
 * Pooled Object Interface
 * 
 * Defines object pooling functionality for game objects.
 * Handles efficient object reuse and memory management.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType, PoolState, PoolType } from '../../enums';

/**
 * Interface for pooled game objects
 * 
 * Extends IGameObject with object pooling functionality.
 */
export interface IPooledObject extends IGameObject {
  readonly gameObjectType: GameObjectType;
  
  /** Pool state */
  poolState: PoolState;
  
  /** Pool type */
  poolType: PoolType;
  
  /** Pool ID */
  poolId: string;
  
  /** Pool name */
  poolName: string;
  
  /** Pool manager */
  poolManager: any; // IPoolManager
  
  /** Pool creation time */
  poolCreationTime: number;
  
  /** Pool last used time */
  poolLastUsedTime: number;
  
  /** Pool use count */
  poolUseCount: number;
  
  /** Pool max uses */
  poolMaxUses: number;
  
  /** Pool lifetime */
  poolLifetime: number;
  
  /** Pool auto destroy */
  poolAutoDestroy: boolean;
  
  /** Pool reset on return */
  poolResetOnReturn: boolean;
  
  /** Pool reset on get */
  poolResetOnGet: boolean;
  
  /** Pool data */
  poolData: any;
  
  /** Pool tags */
  poolTags: string[];
  
  /** Pool priority */
  poolPriority: number;
  
  /** Pool weight */
  poolWeight: number;
  
  /** Set pool state */
  setPoolState(state: PoolState): this;
  
  /** Set pool type */
  setPoolType(type: PoolType): this;
  
  /** Set pool ID */
  setPoolId(id: string): this;
  
  /** Set pool name */
  setPoolName(name: string): this;
  
  /** Set pool manager */
  setPoolManager(manager: any): this;
  
  /** Set pool creation time */
  setPoolCreationTime(time: number): this;
  
  /** Set pool last used time */
  setPoolLastUsedTime(time: number): this;
  
  /** Set pool use count */
  setPoolUseCount(count: number): this;
  
  /** Set pool max uses */
  setPoolMaxUses(max: number): this;
  
  /** Set pool lifetime */
  setPoolLifetime(lifetime: number): this;
  
  /** Set pool auto destroy */
  setPoolAutoDestroy(autoDestroy: boolean): this;
  
  /** Set pool reset on return */
  setPoolResetOnReturn(reset: boolean): this;
  
  /** Set pool reset on get */
  setPoolResetOnGet(reset: boolean): this;
  
  /** Set pool data */
  setPoolData(data: any): this;
  
  /** Set pool tags */
  setPoolTags(tags: string[]): this;
  
  /** Set pool priority */
  setPoolPriority(priority: number): this;
  
  /** Set pool weight */
  setPoolWeight(weight: number): this;
  
  /** Get pool state */
  getPoolState(): PoolState;
  
  /** Get pool type */
  getPoolType(): PoolType;
  
  /** Get pool ID */
  getPoolId(): string;
  
  /** Get pool name */
  getPoolName(): string;
  
  /** Get pool manager */
  getPoolManager(): any;
  
  /** Get pool creation time */
  getPoolCreationTime(): number;
  
  /** Get pool last used time */
  getPoolLastUsedTime(): number;
  
  /** Get pool use count */
  getPoolUseCount(): number;
  
  /** Get pool max uses */
  getPoolMaxUses(): number;
  
  /** Get pool lifetime */
  getPoolLifetime(): number;
  
  /** Get pool auto destroy */
  getPoolAutoDestroy(): boolean;
  
  /** Get pool reset on return */
  getPoolResetOnReturn(): boolean;
  
  /** Get pool reset on get */
  getPoolResetOnGet(): boolean;
  
  /** Get pool data */
  getPoolData(): any;
  
  /** Get pool tags */
  getPoolTags(): string[];
  
  /** Get pool priority */
  getPoolPriority(): number;
  
  /** Get pool weight */
  getPoolWeight(): number;
  
  /** Get from pool */
  getFromPool(): this;
  
  /** Return to pool */
  returnToPool(): this;
  
  /** Reset pool object */
  resetPoolObject(): this;
  
  /** Check if pool object is expired */
  isPoolObjectExpired(): boolean;
  
  /** Check if pool object can be reused */
  canPoolObjectBeReused(): boolean;
  
  /** Update pool object */
  updatePoolObject(deltaTime: number): void;
}
