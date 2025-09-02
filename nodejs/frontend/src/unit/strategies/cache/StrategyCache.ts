import type { IStrategyCache, ICacheEntry, CacheKeyGenerator } from './IStrategyCache';
import type { UnitContext } from '../../interfaces/IUnit';
import { Logger } from '../../../core/Logger';

/**
 * LRU (Least Recently Used) Strategy Cache Implementation
 * Provides efficient caching with automatic eviction of least recently used entries
 */
export class StrategyCache<TValue, TUnit, TResult>
  implements IStrategyCache<TValue, TUnit, TResult>
{
  readonly cacheId: string;
  maxSize: number;
  defaultTtl: number;

  private cache: Map<string, ICacheEntry<TResult>> = new Map();
  private accessOrder: string[] = [];
  private hitCount = 0;
  private missCount = 0;
  private evictionCount = 0;
  private accessTimes: number[] = [];
  private readonly keyGenerator: CacheKeyGenerator<TValue, TUnit>;
  private readonly logger = Logger.getInstance();

  constructor(
    cacheId: string,
    maxSize: number = 1000,
    defaultTtl: number = 300000, // 5 minutes
    keyGenerator?: CacheKeyGenerator<TValue, TUnit>
  ) {
    this.cacheId = cacheId;
    this.maxSize = maxSize;
    this.defaultTtl = defaultTtl;
    this.keyGenerator = keyGenerator || this.defaultKeyGenerator;
  }

  get(value: TValue, unit: TUnit, context: UnitContext): TResult | null {
    const startTime = performance.now();
    const key = this.keyGenerator(value, unit, context);
    const entry = this.cache.get(key);

    if (entry && !this.isExpired(entry)) {
      // Update access information
      entry.accessCount++;
      entry.lastAccess = Date.now();
      this.updateAccessOrder(key);
      this.hitCount++;
      this.recordAccessTime(performance.now() - startTime);

      this.logger.debug('StrategyCache', 'get', 'Cache hit', {
        cacheId: this.cacheId,
        key,
        accessCount: entry.accessCount,
      });

      return entry.value;
    }

    this.missCount++;
    this.recordAccessTime(performance.now() - startTime);

    this.logger.debug('StrategyCache', 'get', 'Cache miss', {
      cacheId: this.cacheId,
      key,
    });

    return null;
  }

  set(value: TValue, unit: TUnit, context: UnitContext, result: TResult, ttl?: number): void {
    const key = this.keyGenerator(value, unit, context);
    const entry: ICacheEntry<TResult> = {
      value: result,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTtl,
      accessCount: 0,
      lastAccess: Date.now(),
    };

    // Check if cache is full and evict if necessary
    if (this.cache.size >= this.maxSize && !this.cache.has(key)) {
      this.evictLRU();
    }

    this.cache.set(key, entry);
    this.updateAccessOrder(key);

    this.logger.debug('StrategyCache', 'set', 'Entry cached', {
      cacheId: this.cacheId,
      key,
      ttl: entry.ttl,
    });
  }

  has(value: TValue, unit: TUnit, context: UnitContext): boolean {
    const key = this.keyGenerator(value, unit, context);
    const entry = this.cache.get(key);
    return entry !== undefined && !this.isExpired(entry);
  }

  delete(value: TValue, unit: TUnit, context: UnitContext): boolean {
    const key = this.keyGenerator(value, unit, context);
    const deleted = this.cache.delete(key);

    if (deleted) {
      this.removeFromAccessOrder(key);
      this.logger.debug('StrategyCache', 'delete', 'Entry deleted', {
        cacheId: this.cacheId,
        key,
      });
    }

    return deleted;
  }

  clear(): void {
    this.cache.clear();
    this.accessOrder = [];
    this.hitCount = 0;
    this.missCount = 0;
    this.evictionCount = 0;
    this.accessTimes = [];

    this.logger.debug('StrategyCache', 'clear', 'Cache cleared', {
      cacheId: this.cacheId,
    });
  }

  getStatistics(): {
    size: number;
    maxSize: number;
    hitCount: number;
    missCount: number;
    hitRate: number;
    averageAccessTime: number;
    evictionCount: number;
  } {
    const totalRequests = this.hitCount + this.missCount;
    const hitRate = totalRequests > 0 ? this.hitCount / totalRequests : 0;
    const averageAccessTime =
      this.accessTimes.length > 0
        ? this.accessTimes.reduce((a, b) => a + b, 0) / this.accessTimes.length
        : 0;

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitCount: this.hitCount,
      missCount: this.missCount,
      hitRate,
      averageAccessTime,
      evictionCount: this.evictionCount,
    };
  }

  getEntryDetails(value: TValue, unit: TUnit, context: UnitContext): ICacheEntry<TResult> | null {
    const key = this.keyGenerator(value, unit, context);
    const entry = this.cache.get(key);
    return entry && !this.isExpired(entry) ? entry : null;
  }

  getKeys(): string[] {
    return Array.from(this.cache.keys());
  }

  isFull(): boolean {
    return this.cache.size >= this.maxSize;
  }

  getSize(): number {
    return this.cache.size;
  }

  setMaxSize(maxSize: number): void {
    const oldMaxSize = this.maxSize;
    this.maxSize = maxSize;

    // Evict entries if new max size is smaller
    while (this.cache.size > this.maxSize) {
      this.evictLRU();
    }

    this.logger.debug('StrategyCache', 'setMaxSize', 'Max size updated', {
      cacheId: this.cacheId,
      oldMaxSize,
      newMaxSize: maxSize,
    });
  }

  setDefaultTtl(ttl: number): void {
    this.defaultTtl = ttl;
    this.logger.debug('StrategyCache', 'setDefaultTtl', 'Default TTL updated', {
      cacheId: this.cacheId,
      newTtl: ttl,
    });
  }

  cleanup(): number {
    const initialSize = this.cache.size;
    const expiredKeys: string[] = [];

    // Find expired entries
    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        expiredKeys.push(key);
      }
    }

    // Remove expired entries
    for (const key of expiredKeys) {
      this.cache.delete(key);
      this.removeFromAccessOrder(key);
    }

    const cleanedCount = initialSize - this.cache.size;

    if (cleanedCount > 0) {
      this.logger.debug('StrategyCache', 'cleanup', 'Expired entries cleaned', {
        cacheId: this.cacheId,
        cleanedCount,
        remainingSize: this.cache.size,
      });
    }

    return cleanedCount;
  }

  private defaultKeyGenerator(value: TValue, unit: TUnit, context: UnitContext): string {
    // Create a simple hash-based key
    const contextHash = this.hashContext(context);
    return `${String(value)}:${String(unit)}:${contextHash}`;
  }

  private hashContext(context: UnitContext): string {
    // Create a simple hash of the context
    const contextStr = JSON.stringify({
      parent: context.parent ? `${context.parent.width}x${context.parent.height}` : 'null',
      scene: context.scene ? `${context.scene.width}x${context.scene.height}` : 'null',
      viewport: context.viewport ? `${context.viewport.width}x${context.viewport.height}` : 'null',
      content: context.content ? `${context.content.width}x${context.content.height}` : 'null',
    });

    // Simple hash function
    let hash = 0;
    for (let i = 0; i < contextStr.length; i++) {
      const char = contextStr.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  private isExpired(entry: ICacheEntry<TResult>): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  private updateAccessOrder(key: string): void {
    // Remove from current position
    this.removeFromAccessOrder(key);
    // Add to front (most recently used)
    this.accessOrder.unshift(key);
  }

  private removeFromAccessOrder(key: string): void {
    const index = this.accessOrder.indexOf(key);
    if (index > -1) {
      this.accessOrder.splice(index, 1);
    }
  }

  private evictLRU(): void {
    if (this.accessOrder.length === 0) return;

    // Remove least recently used entry (last in access order)
    const lruKey = this.accessOrder.pop()!;
    this.cache.delete(lruKey);
    this.evictionCount++;

    this.logger.debug('StrategyCache', 'evictLRU', 'LRU entry evicted', {
      cacheId: this.cacheId,
      evictedKey: lruKey,
      remainingSize: this.cache.size,
    });
  }

  private recordAccessTime(time: number): void {
    this.accessTimes.push(time);

    // Keep only last 1000 access times for performance
    if (this.accessTimes.length > 1000) {
      this.accessTimes = this.accessTimes.slice(-1000);
    }
  }
}
