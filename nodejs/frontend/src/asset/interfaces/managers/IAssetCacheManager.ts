/**
 * Asset Cache Manager Interface
 *
 * Defines caching functionality for assets with size limits, age-based cleanup, and compression.
 */

import type { IAsset } from '../IAsset';
import type { AssetType, AssetPriority } from '../IAsset';

/**
 * Cache operations
 */
export enum CacheOperation {
  STORE = 'store',
  RETRIEVE = 'retrieve',
  REMOVE = 'remove',
  CLEAR = 'clear',
  COMPRESS = 'compress',
  DECOMPRESS = 'decompress',
}

/**
 * Cache configuration
 */
export interface CacheConfig {
  maxCacheSize: number;
  maxCacheAge: number;
  enableCompression: boolean;
  compressionLevel: number;
  enableLRU: boolean;
  cleanupInterval: number;
  metadata?: Record<string, any>;
}

/**
 * Cache statistics
 */
export interface CacheStatistics {
  totalCachedAssets: number;
  cacheSize: number;
  cacheHitRate: number;
  cacheMissRate: number;
  compressionRatio: number;
  lastCleanupTime: number;
  assetsByType: Record<AssetType, number>;
  assetsByPriority: Record<AssetPriority, number>;
}

/**
 * Cache entry
 */
export interface CacheEntry {
  asset: IAsset;
  timestamp: number;
  accessCount: number;
  lastAccessed: number;
  compressed: boolean;
  size: number;
}

/**
 * Interface for asset cache managers
 */
export interface IAssetCacheManager {
  readonly cacheManagerId: string;

  /** Cache configuration */
  cacheConfig: CacheConfig;

  /** Cache storage */
  cacheStorage: Map<string, CacheEntry>;

  /** Cache statistics */
  cacheStatistics: CacheStatistics;

  /** Cache metadata */
  cacheMetadata: Record<string, any>;

  /** Set cache configuration */
  setCacheConfig(config: CacheConfig): this;

  /** Set cache metadata */
  setCacheMetadata(metadata: Record<string, any>): this;

  /** Get cache configuration */
  getCacheConfig(): CacheConfig;

  /** Get cache storage */
  getCacheStorage(): Map<string, CacheEntry>;

  /** Get cache statistics */
  getCacheStatistics(): CacheStatistics;

  /** Get cache metadata */
  getCacheMetadata(): Record<string, any>;

  /** Store asset in cache */
  storeAsset(asset: IAsset): Promise<boolean>;

  /** Retrieve asset from cache */
  retrieveAsset(assetKey: string): Promise<IAsset | null>;

  /** Remove asset from cache */
  removeAsset(assetKey: string): Promise<boolean>;

  /** Check if asset is cached */
  isAssetCached(assetKey: string): boolean;

  /** Get cached asset size */
  getCachedAssetSize(assetKey: string): number;

  /** Get cache entry */
  getCacheEntry(assetKey: string): CacheEntry | null;

  /** Compress asset */
  compressAsset(asset: IAsset): Promise<IAsset>;

  /** Decompress asset */
  decompressAsset(asset: IAsset): Promise<IAsset>;

  /** Clear cache */
  clearCache(): Promise<this>;

  /** Cleanup expired assets */
  cleanupExpiredAssets(): Promise<number>;

  /** Cleanup by size limit */
  cleanupBySizeLimit(): Promise<number>;

  /** Optimize cache */
  optimizeCache(): Promise<this>;

  /** Get cache hit rate */
  getCacheHitRate(): number;

  /** Get cache miss rate */
  getCacheMissRate(): number;

  /** Get compression ratio */
  getCompressionRatio(): number;

  /** Update cache manager */
  updateCacheManager(deltaTime: number): void;
}
