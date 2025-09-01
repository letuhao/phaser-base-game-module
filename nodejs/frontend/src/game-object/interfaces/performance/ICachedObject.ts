/**
 * Cached Object Interface
 * 
 * Defines caching functionality for game objects.
 * Handles efficient data caching and retrieval.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType } from '../../enums/GameObjectEnums';


/**
 * Cache states
 */
export enum CacheState {
  VALID = 'valid',
  INVALID = 'invalid',
  EXPIRED = 'expired',
  PENDING = 'pending'
}

/**
 * Cache types
 */
export enum CacheType {
  TEXTURE = 'texture',
  SOUND = 'sound',
  DATA = 'data',
  COMPUTED = 'computed',
  RENDERED = 'rendered',
  CUSTOM = 'custom'
}

/**
 * Interface for cached game objects
 * 
 * Extends IGameObject with caching functionality.
 */
export interface ICachedObject extends IGameObject {
  readonly gameObjectType: GameObjectType.CACHED_OBJECT;
  
  /** Cache state */
  cacheState: CacheState;
  
  /** Cache type */
  cacheType: CacheType;
  
  /** Cache key */
  cacheKey: string;
  
  /** Cache manager */
  cacheManager: any; // ICacheManager
  
  /** Cache creation time */
  cacheCreationTime: number;
  
  /** Cache last access time */
  cacheLastAccessTime: number;
  
  /** Cache access count */
  cacheAccessCount: number;
  
  /** Cache expiration time */
  cacheExpirationTime: number;
  
  /** Cache lifetime */
  cacheLifetime: number;
  
  /** Cache size */
  cacheSize: number;
  
  /** Cache max size */
  cacheMaxSize: number;
  
  /** Cache priority */
  cachePriority: number;
  
  /** Cache tags */
  cacheTags: string[];
  
  /** Cache dependencies */
  cacheDependencies: string[];
  
  /** Cache data */
  cacheData: any;
  
  /** Cache metadata */
  cacheMetadata: any;
  
  /** Set cache state */
  setCacheState(state: CacheState): this;
  
  /** Set cache type */
  setCacheType(type: CacheType): this;
  
  /** Set cache key */
  setCacheKey(key: string): this;
  
  /** Set cache manager */
  setCacheManager(manager: any): this;
  
  /** Set cache creation time */
  setCacheCreationTime(time: number): this;
  
  /** Set cache last access time */
  setCacheLastAccessTime(time: number): this;
  
  /** Set cache access count */
  setCacheAccessCount(count: number): this;
  
  /** Set cache expiration time */
  setCacheExpirationTime(time: number): this;
  
  /** Set cache lifetime */
  setCacheLifetime(lifetime: number): this;
  
  /** Set cache size */
  setCacheSize(size: number): this;
  
  /** Set cache max size */
  setCacheMaxSize(maxSize: number): this;
  
  /** Set cache priority */
  setCachePriority(priority: number): this;
  
  /** Set cache tags */
  setCacheTags(tags: string[]): this;
  
  /** Set cache dependencies */
  setCacheDependencies(dependencies: string[]): this;
  
  /** Set cache data */
  setCacheData(data: any): this;
  
  /** Set cache metadata */
  setCacheMetadata(metadata: any): this;
  
  /** Get cache state */
  getCacheState(): CacheState;
  
  /** Get cache type */
  getCacheType(): CacheType;
  
  /** Get cache key */
  getCacheKey(): string;
  
  /** Get cache manager */
  getCacheManager(): any;
  
  /** Get cache creation time */
  getCacheCreationTime(): number;
  
  /** Get cache last access time */
  getCacheLastAccessTime(): number;
  
  /** Get cache access count */
  getCacheAccessCount(): number;
  
  /** Get cache expiration time */
  getCacheExpirationTime(): number;
  
  /** Get cache lifetime */
  getCacheLifetime(): number;
  
  /** Get cache size */
  getCacheSize(): number;
  
  /** Get cache max size */
  getCacheMaxSize(): number;
  
  /** Get cache priority */
  getCachePriority(): number;
  
  /** Get cache tags */
  getCacheTags(): string[];
  
  /** Get cache dependencies */
  getCacheDependencies(): string[];
  
  /** Get cache data */
  getCacheData(): any;
  
  /** Get cache metadata */
  getCacheMetadata(): any;
  
  /** Invalidate cache */
  invalidateCache(): this;
  
  /** Refresh cache */
  refreshCache(): this;
  
  /** Clear cache */
  clearCache(): this;
  
  /** Check if cache is valid */
  isCacheValid(): boolean;
  
  /** Check if cache is expired */
  isCacheExpired(): boolean;
  
  /** Check if cache can be evicted */
  canCacheBeEvicted(): boolean;
  
  /** Update cache */
  updateCache(deltaTime: number): void;
}
