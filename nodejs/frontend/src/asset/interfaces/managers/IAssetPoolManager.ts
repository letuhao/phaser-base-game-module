/**
 * Asset Pool Manager Interface
 *
 * Defines pooling functionality for assets to improve performance and memory management.
 */

import type { IAsset } from '../IAsset';
import type { AssetType, AssetPriority } from '../IAsset';

/**
 * Pool operations
 */
export enum PoolOperation {
  CREATE = 'create',
  ACQUIRE = 'acquire',
  RELEASE = 'release',
  DESTROY = 'destroy',
  CLEAR = 'clear',
  RESIZE = 'resize',
}

/**
 * Pool configuration
 */
export interface PoolConfig {
  maxPoolSize: number;
  initialPoolSize: number;
  enableAutoResize: boolean;
  resizeThreshold: number;
  enablePreloading: boolean;
  preloadCount: number;
  metadata?: Record<string, any>;
}

/**
 * Pool statistics
 */
export interface PoolStatistics {
  totalPools: number;
  totalPooledAssets: number;
  activeAssets: number;
  availableAssets: number;
  poolHitRate: number;
  poolMissRate: number;
  assetsByType: Record<AssetType, number>;
  assetsByPriority: Record<AssetPriority, number>;
  lastResizeTime: number;
}

/**
 * Pool entry
 */
export interface PoolEntry {
  asset: IAsset;
  isActive: boolean;
  acquireTime: number;
  releaseTime: number;
  usageCount: number;
  lastUsed: number;
}

/**
 * Interface for asset pool managers
 */
export interface IAssetPoolManager {
  readonly poolManagerId: string;

  /** Pool configuration */
  poolConfig: PoolConfig;

  /** Asset pools */
  assetPools: Map<AssetType, Map<string, PoolEntry>>;

  /** Pool statistics */
  poolStatistics: PoolStatistics;

  /** Pool metadata */
  poolMetadata: Record<string, any>;

  /** Set pool configuration */
  setPoolConfig(config: PoolConfig): this;

  /** Set pool metadata */
  setPoolMetadata(metadata: Record<string, any>): this;

  /** Get pool configuration */
  getPoolConfig(): PoolConfig;

  /** Get asset pools */
  getAssetPools(): Map<AssetType, Map<string, PoolEntry>>;

  /** Get pool statistics */
  getPoolStatistics(): PoolStatistics;

  /** Get pool metadata */
  getPoolMetadata(): Record<string, any>;

  /** Create pool for asset type */
  createPool(assetType: AssetType, initialSize: number): Promise<boolean>;

  /** Destroy pool for asset type */
  destroyPool(assetType: AssetType): Promise<boolean>;

  /** Acquire asset from pool */
  acquireAsset(assetType: AssetType, assetKey: string): Promise<IAsset | null>;

  /** Release asset to pool */
  releaseAsset(asset: IAsset): Promise<boolean>;

  /** Check if pool exists */
  hasPool(assetType: AssetType): boolean;

  /** Check if asset is available in pool */
  isAssetAvailable(assetType: AssetType, assetKey: string): boolean;

  /** Get pool size */
  getPoolSize(assetType: AssetType): number;

  /** Get available assets count */
  getAvailableAssetsCount(assetType: AssetType): number;

  /** Get active assets count */
  getActiveAssetsCount(assetType: AssetType): number;

  /** Resize pool */
  resizePool(assetType: AssetType, newSize: number): Promise<boolean>;

  /** Preload assets in pool */
  preloadAssets(assetType: AssetType, count: number): Promise<boolean>;

  /** Clear pool */
  clearPool(assetType: AssetType): Promise<boolean>;

  /** Clear all pools */
  clearAllPools(): Promise<this>;

  /** Get pool hit rate */
  getPoolHitRate(): number;

  /** Get pool miss rate */
  getPoolMissRate(): number;

  /** Update pool manager */
  updatePoolManager(deltaTime: number): void;
}
