import type { UnitContext } from '../../interfaces/IUnit';

/**
 * Cache entry for strategy results
 */
export interface ICacheEntry<T> {
  /** Cached result value */
  value: T;
  /** Timestamp when entry was created */
  timestamp: number;
  /** Time-to-live in milliseconds */
  ttl: number;
  /** Number of times this entry was accessed */
  accessCount: number;
  /** Last access timestamp */
  lastAccess: number;
}

/**
 * Cache key generator function
 */
export type CacheKeyGenerator<TValue, TUnit> = (
  value: TValue,
  unit: TUnit,
  context: UnitContext
) => string;

/**
 * Interface for strategy caching
 * Provides caching capabilities for strategy results to improve performance
 */
export interface IStrategyCache<TValue, TUnit, TResult> {
  /**
   * Unique identifier for the cache
   */
  readonly cacheId: string;

  /**
   * Maximum number of entries in the cache
   */
  readonly maxSize: number;

  /**
   * Default time-to-live for cache entries (in milliseconds)
   */
  readonly defaultTtl: number;

  /**
   * Get a cached result if available and not expired
   */
  get(value: TValue, unit: TUnit, context: UnitContext): TResult | null;

  /**
   * Store a result in the cache
   */
  set(value: TValue, unit: TUnit, context: UnitContext, result: TResult, ttl?: number): void;

  /**
   * Check if a result is cached and not expired
   */
  has(value: TValue, unit: TUnit, context: UnitContext): boolean;

  /**
   * Remove a specific entry from the cache
   */
  delete(value: TValue, unit: TUnit, context: UnitContext): boolean;

  /**
   * Clear all entries from the cache
   */
  clear(): void;

  /**
   * Get cache statistics
   */
  getStatistics(): {
    size: number;
    maxSize: number;
    hitCount: number;
    missCount: number;
    hitRate: number;
    averageAccessTime: number;
    evictionCount: number;
  };

  /**
   * Get cache entry details
   */
  getEntryDetails(value: TValue, unit: TUnit, context: UnitContext): ICacheEntry<TResult> | null;

  /**
   * Get all cache keys
   */
  getKeys(): string[];

  /**
   * Check if cache is full
   */
  isFull(): boolean;

  /**
   * Get cache size
   */
  getSize(): number;

  /**
   * Set maximum cache size
   */
  setMaxSize(maxSize: number): void;

  /**
   * Set default TTL for new entries
   */
  setDefaultTtl(ttl: number): void;

  /**
   * Clean up expired entries
   */
  cleanup(): number;
}
