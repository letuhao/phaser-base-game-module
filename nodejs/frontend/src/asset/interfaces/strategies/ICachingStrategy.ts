/**
 * Caching Strategy Interface
 * 
 * Defines caching strategy abstraction for different asset caching approaches.
 */

import type { IAsset } from '../IAsset';
import type { CacheEntry } from '../managers/IAssetCacheManager';

/**
 * Caching strategy types
 */
export enum CachingStrategyType {
  LRU = 'lru',
  LFU = 'lfu',
  FIFO = 'fifo',
  SIZE_BASED = 'size_based',
  TIME_BASED = 'time_based',
  PRIORITY_BASED = 'priority_based',
  HYBRID = 'hybrid',
  CUSTOM = 'custom'
}

/**
 * Caching strategy configuration
 */
export interface CachingStrategyConfig {
  strategyType: CachingStrategyType;
  maxCacheSize: number;
  maxCacheAge: number;
  maxCacheEntries: number;
  enableCompression: boolean;
  compressionLevel: number;
  enableLRU: boolean;
  enableLFU: boolean;
  enableSizeBased: boolean;
  enableTimeBased: boolean;
  enablePriorityBased: boolean;
  metadata?: Record<string, any>;
}

/**
 * Caching strategy result
 */
export interface CachingStrategyResult {
  success: boolean;
  cachedAssets: IAsset[];
  evictedAssets: IAsset[];
  cacheSize: number;
  compressionRatio: number;
  strategyUsed: CachingStrategyType;
  metadata?: Record<string, any>;
}

/**
 * Cache eviction policy
 */
export interface CacheEvictionPolicy {
  evictBySize: boolean;
  evictByAge: boolean;
  evictByAccess: boolean;
  evictByPriority: boolean;
  evictionThreshold: number;
  evictionBatchSize: number;
}

/**
 * Interface for caching strategies
 */
export interface ICachingStrategy {
  readonly strategyId: string;
  readonly strategyType: CachingStrategyType;
  
  /** Strategy configuration */
  strategyConfig: CachingStrategyConfig;
  
  /** Eviction policy */
  evictionPolicy: CacheEvictionPolicy;
  
  /** Strategy metadata */
  strategyMetadata: Record<string, any>;
  
  /** Set strategy configuration */
  setStrategyConfig(config: CachingStrategyConfig): this;
  
  /** Set eviction policy */
  setEvictionPolicy(policy: CacheEvictionPolicy): this;
  
  /** Set strategy metadata */
  setStrategyMetadata(metadata: Record<string, any>): this;
  
  /** Get strategy configuration */
  getStrategyConfig(): CachingStrategyConfig;
  
  /** Get eviction policy */
  getEvictionPolicy(): CacheEvictionPolicy;
  
  /** Get strategy metadata */
  getStrategyMetadata(): Record<string, any>;
  
  /** Cache asset using strategy */
  cacheAsset(asset: IAsset): Promise<CachingStrategyResult>;
  
  /** Cache multiple assets */
  cacheAssets(assets: IAsset[]): Promise<CachingStrategyResult>;
  
  /** Retrieve asset from cache */
  retrieveAsset(assetKey: string): Promise<IAsset | null>;
  
  /** Remove asset from cache */
  removeAsset(assetKey: string): Promise<boolean>;
  
  /** Check if asset is cached */
  isAssetCached(assetKey: string): boolean;
  
  /** Get cache entry */
  getCacheEntry(assetKey: string): CacheEntry | null;
  
  /** Evict assets using strategy */
  evictAssets(): Promise<CachingStrategyResult>;
  
  /** Evict specific assets */
  evictSpecificAssets(assetKeys: string[]): Promise<CachingStrategyResult>;
  
  /** Compress cache */
  compressCache(): Promise<CachingStrategyResult>;
  
  /** Decompress cache */
  decompressCache(): Promise<CachingStrategyResult>;
  
  /** Get cache statistics */
  getCacheStatistics(): {
    totalCached: number;
    cacheSize: number;
    hitRate: number;
    missRate: number;
    compressionRatio: number;
    evictionCount: number;
  };
  
  /** Clear cache */
  clearCache(): Promise<this>;
  
  /** Update strategy */
  updateStrategy(deltaTime: number): void;
}
