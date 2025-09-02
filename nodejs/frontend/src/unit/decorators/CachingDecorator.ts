import { BaseUnitDecorator } from './IUnitDecorator';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { UnitType } from '../enums/UnitType';
import { PERFORMANCE_CONSTANTS, Utils } from '../constants';

/**
 * Caching Decorator
 * Caches unit calculation results to improve performance
 */
export class CachingDecorator extends BaseUnitDecorator {
  private cache = new Map<string, { result: number; timestamp: number; contextHash: string }>();
  private cacheTimeout: number = PERFORMANCE_CONSTANTS.CACHE.DEFAULT_TIMEOUT_MS;
  private maxCacheSize: number = PERFORMANCE_CONSTANTS.CACHE.DEFAULT_MAX_SIZE;

  constructor(
    id: string,
    name: string,
    wrappedUnit: IUnit,
    cacheTimeout: number = PERFORMANCE_CONSTANTS.CACHE.DEFAULT_TIMEOUT_MS,
    maxCacheSize: number = PERFORMANCE_CONSTANTS.CACHE.DEFAULT_MAX_SIZE
  ) {
    super(id, name, UnitType.SIZE, wrappedUnit);
    this.cacheTimeout = cacheTimeout;
    this.maxCacheSize = maxCacheSize;
  }

  protected beforeCalculation(context: UnitContext): void {
    // Check if we have a cached result
    const cacheKey = this.generateCacheKey(context);
    const cached = this.cache.get(cacheKey);

    if (cached && this.isCacheValid(cached)) {
      // Use cached result
      this.cachedResult = cached.result;
      this.usingCache = true;
    } else {
      this.usingCache = false;
    }
  }

  protected performCalculation(context: UnitContext): number {
    if (this.usingCache) {
      this.cacheHits++;
      return this.cachedResult;
    }

    this.cacheMisses++;
    // Perform actual calculation
    const result = this.wrappedUnit.calculate(context);

    // Cache the result
    this.cacheResult(context, result);

    return result;
  }

  protected afterCalculation(_result: number, _context: UnitContext): void {
    // Clean up old cache entries
    this.cleanupCache();
  }

  protected validateDecorator(context: UnitContext): boolean {
    // Validate that the decorator can work with the given context
    return context !== null && context !== undefined && typeof context === 'object';
  }

  getDecoratorType(): string {
    return 'CachingDecorator';
  }

  getPriority(): number {
    return PERFORMANCE_CONSTANTS.CACHE.DEFAULT_MAX_SIZE / 10; // High priority for caching
  }

  canDecorate(unit: IUnit): boolean {
    // Can decorate any unit that performs calculations
    return unit !== null && unit !== undefined;
  }

  getMetadata(): {
    type: string;
    priority: number;
    description: string;
    version: string;
  } {
    return {
      type: 'CachingDecorator',
      priority: this.getPriority(),
      description: 'Caches unit calculation results for improved performance',
      version: '1.0.0',
    };
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): {
    size: number;
    hits: number;
    misses: number;
    hitRate: number;
    averageAge: number;
  } {
    let totalAge = 0;
    let validEntries = 0;

    // Use Array.from to avoid iteration issues
    const entries = Array.from(this.cache.values());
    for (const entry of entries) {
      if (this.isCacheValid(entry)) {
        totalAge += Date.now() - entry.timestamp;
        validEntries++;
      }
    }

    // Calculate average age - use all entries for more accurate stats
    const averageAge = entries.length > 0 ? totalAge / entries.length : 0;
    const totalRequests = this.cacheHits + this.cacheMisses;
    const hitRate = totalRequests > 0 ? this.cacheHits / totalRequests : 0;

    return {
      size: this.cache.size,
      hits: this.cacheHits,
      misses: this.cacheMisses,
      hitRate,
      averageAge,
    };
  }

  /**
   * Clear the cache
   */
  clearCache(): void {
    this.cache.clear();
    this.cacheHits = 0;
    this.cacheMisses = 0;
  }

  /**
   * Set cache timeout
   */
  setCacheTimeout(timeout: number): void {
    this.cacheTimeout = timeout;
  }

  /**
   * Set maximum cache size
   */
  setMaxCacheSize(size: number): void {
    this.maxCacheSize = size;
    this.cleanupCache();
  }

  private cachedResult: number = 0;
  private usingCache: boolean = false;
  private cacheHits: number = 0;
  private cacheMisses: number = 0;

  /**
   * Generate cache key from context
   */
  private generateCacheKey(context: UnitContext): string {
    // Create a simple hash of the context
    const contextStr = JSON.stringify({
      parent: context.parent,
      scene: context.scene,
      viewport: context.viewport,
      breakpoint: context.breakpoint,
      content: context.content,
      dimension: context.dimension,
    });

    return `${this.wrappedUnit.id}-${this.hashString(contextStr)}`;
  }

  /**
   * Simple string hash function
   */
  private hashString(str: string): number {
    return Utils.generateHash(str);
  }

  /**
   * Check if cache entry is still valid
   */
  private isCacheValid(entry: { result: number; timestamp: number; contextHash: string }): boolean {
    const now = Date.now();
    return now - entry.timestamp < this.cacheTimeout;
  }

  /**
   * Cache a calculation result
   */
  private cacheResult(context: UnitContext, result: number): void {
    const cacheKey = this.generateCacheKey(context);
    const contextHash = this.generateCacheKey(context);

    this.cache.set(cacheKey, {
      result,
      timestamp: Date.now(),
      contextHash,
    });

    // Limit cache size - enforce immediately
    while (this.cache.size > this.maxCacheSize) {
      this.removeOldestEntry();
    }
  }

  /**
   * Remove the oldest cache entry
   */
  private removeOldestEntry(): void {
    let oldestKey: string | null = null;
    let oldestTime = Date.now();

    // Use Array.from to avoid iteration issues
    const entries = Array.from(this.cache.entries());
    for (const [key, entry] of entries) {
      if (entry.timestamp < oldestTime) {
        oldestTime = entry.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  /**
   * Clean up expired cache entries
   */
  private cleanupCache(): void {
    const keysToDelete: string[] = [];

    // Use Array.from to avoid iteration issues
    const entries = Array.from(this.cache.entries());
    for (const [key, entry] of entries) {
      if (!this.isCacheValid(entry)) {
        keysToDelete.push(key);
      }
    }

    for (const key of keysToDelete) {
      this.cache.delete(key);
    }
  }
}
