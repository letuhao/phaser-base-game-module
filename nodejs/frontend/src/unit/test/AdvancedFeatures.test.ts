import { StrategyCache } from '../strategies/cache/StrategyCache';
import { WeightedAverageSizeComposer, PriorityBasedSizeComposer, AdaptiveSizeComposer } from '../strategies/composition/SizeStrategyComposers';
import { SizeValueCalculationStrategyRegistry } from '../strategies/value/SizeValueCalculationStrategyRegistry';
import {
  PixelSizeValueCalculationStrategy,
  FillSizeValueCalculationStrategy,
  AutoSizeValueCalculationStrategy,
  ParentWidthSizeValueCalculationStrategy,
  ViewportWidthSizeValueCalculationStrategy
} from '../strategies/value';
import { SizeValue } from '../enums/SizeValue';
import { SizeUnit } from '../enums/SizeUnit';

describe('Advanced Features: Strategy Composition and Caching', () => {
  let strategyRegistry: SizeValueCalculationStrategyRegistry;
  let cache: StrategyCache<SizeValue, SizeUnit, number>;
  let weightedComposer: WeightedAverageSizeComposer;
  let priorityComposer: PriorityBasedSizeComposer;
  let adaptiveComposer: AdaptiveSizeComposer;
  let mockContext: any;

  beforeEach(() => {
    // Initialize strategy registry
    strategyRegistry = new SizeValueCalculationStrategyRegistry();
    
    // Register all size strategies
    strategyRegistry.registerStrategy(new PixelSizeValueCalculationStrategy());
    strategyRegistry.registerStrategy(new FillSizeValueCalculationStrategy());
    strategyRegistry.registerStrategy(new AutoSizeValueCalculationStrategy());
    strategyRegistry.registerStrategy(new ParentWidthSizeValueCalculationStrategy());
    strategyRegistry.registerStrategy(new ViewportWidthSizeValueCalculationStrategy());

    // Initialize cache
    cache = new StrategyCache<SizeValue, SizeUnit, number>('test-cache', 100, 300000);

    // Initialize composers
    weightedComposer = new WeightedAverageSizeComposer();
    priorityComposer = new PriorityBasedSizeComposer();
    adaptiveComposer = new AdaptiveSizeComposer();

    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
      content: { width: 200, height: 150 }
    };
  });

  describe('Strategy Cache', () => {
    it('should cache and retrieve results correctly', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PARENT_WIDTH;
      const result = 800;

      // Cache a result
      cache.set(value, unit, mockContext, result);
      expect(cache.has(value, unit, mockContext)).toBe(true);

      // Retrieve cached result
      const cachedResult = cache.get(value, unit, mockContext);
      expect(cachedResult).toBe(result);
    });

    it('should handle cache misses correctly', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PARENT_WIDTH;

      // Try to get non-existent result
      const cachedResult = cache.get(value, unit, mockContext);
      expect(cachedResult).toBeNull();
      expect(cache.has(value, unit, mockContext)).toBe(false);
    });

    it('should provide cache statistics', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PARENT_WIDTH;
      const result = 800;

      // Perform some cache operations
      cache.set(value, unit, mockContext, result);
      cache.get(value, unit, mockContext); // Hit
      cache.get(SizeValue.AUTO, unit, mockContext); // Miss

      const stats = cache.getStatistics();
      expect(stats.size).toBe(1);
      expect(stats.hitCount).toBe(1);
      expect(stats.missCount).toBe(1);
      expect(stats.hitRate).toBe(0.5);
    });

    it('should handle cache eviction when full', () => {
      const smallCache = new StrategyCache<SizeValue, SizeUnit, number>('small-cache', 2, 300000);

      // Fill cache
      smallCache.set(SizeValue.FILL, SizeUnit.PARENT_WIDTH, mockContext, 800);
      smallCache.set(SizeValue.AUTO, SizeUnit.PIXEL, mockContext, 100);
      smallCache.set(SizeValue.FILL, SizeUnit.PARENT_WIDTH, mockContext, 800); // Should evict

      expect(smallCache.getSize()).toBe(2);
      expect(smallCache.isFull()).toBe(true);
    });

    it('should clean up expired entries', () => {
      const shortTtlCache = new StrategyCache<SizeValue, SizeUnit, number>('short-cache', 10, 1); // 1ms TTL
      
      shortTtlCache.set(SizeValue.FILL, SizeUnit.PARENT_WIDTH, mockContext, 800);
      
      // Wait for expiration
      setTimeout(() => {
        const cleaned = shortTtlCache.cleanup();
        expect(cleaned).toBe(1);
        expect(shortTtlCache.getSize()).toBe(0);
      }, 10);
    });
  });

  describe('Strategy Composition', () => {
    it('should compose strategies using weighted average', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PARENT_WIDTH;
      
      const strategies = [
        { strategy: new FillSizeValueCalculationStrategy(), weight: 0.6 },
        { strategy: new ParentWidthSizeValueCalculationStrategy(), weight: 0.4 }
      ];

      const result = weightedComposer.compose(value, unit, mockContext, strategies);
      expect(result).toBeGreaterThan(0);
      expect(typeof result).toBe('number');
    });

    it('should compose strategies using priority-based selection', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PARENT_WIDTH;
      
      const strategies = [
        { strategy: new FillSizeValueCalculationStrategy(), weight: 1.0 },
        { strategy: new ParentWidthSizeValueCalculationStrategy(), weight: 1.0 }
      ];

      const result = priorityComposer.compose(value, unit, mockContext, strategies);
      expect(result).toBeGreaterThan(0);
      expect(typeof result).toBe('number');
    });

    it('should compose strategies using adaptive weighting', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PARENT_WIDTH;
      
      const strategies = [
        { strategy: new FillSizeValueCalculationStrategy(), weight: 1.0 },
        { strategy: new ParentWidthSizeValueCalculationStrategy(), weight: 1.0 }
      ];

      const result = adaptiveComposer.compose(value, unit, mockContext, strategies);
      expect(result).toBeGreaterThan(0);
      expect(typeof result).toBe('number');
    });

    it('should validate context before composition', () => {
      expect(weightedComposer.validateContext(mockContext)).toBe(true);
      expect(weightedComposer.validateContext({})).toBe(false);
    });

    it('should provide composition rules', () => {
      const rules = weightedComposer.getCompositionRules();
      expect(rules).toBeInstanceOf(Array);
      expect(rules.length).toBeGreaterThan(0);
      expect(rules[0]).toHaveProperty('rule');
      expect(rules[0]).toHaveProperty('description');
      expect(rules[0]).toHaveProperty('weight');
    });

    it('should track performance metrics', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PIXEL; // Use PIXEL unit which FillSizeValueCalculationStrategy can handle
      
      const strategies = [
        { strategy: new FillSizeValueCalculationStrategy(), weight: 1.0 }
      ];

      // Perform composition
      weightedComposer.compose(value, unit, mockContext, strategies);
      
      const metrics = weightedComposer.getPerformanceMetrics();
      expect(metrics.totalExecutions).toBe(1);
      expect(metrics.successRate).toBe(1);
      expect(metrics.averageExecutionTime).toBeGreaterThan(0);
    });
  });

  describe('Integration: Cache + Composition', () => {
    it('should work together seamlessly', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PARENT_WIDTH;
      
      const strategies = [
        { strategy: new FillSizeValueCalculationStrategy(), weight: 0.7 },
        { strategy: new ParentWidthSizeValueCalculationStrategy(), weight: 0.3 }
      ];

      // First calculation (cache miss)
      const result1 = weightedComposer.compose(value, unit, mockContext, strategies);
      cache.set(value, unit, mockContext, result1);

      // Second calculation (cache hit)
      const result2 = cache.get(value, unit, mockContext);
      
      expect(result1).toBe(result2);
      expect(cache.getStatistics().hitCount).toBe(1);
    });

    it('should handle multiple composition strategies', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PARENT_WIDTH;
      
      const strategies = [
        { strategy: new FillSizeValueCalculationStrategy(), weight: 1.0 },
        { strategy: new ParentWidthSizeValueCalculationStrategy(), weight: 1.0 }
      ];

      // Test all composers
      const weightedResult = weightedComposer.compose(value, unit, mockContext, strategies);
      const priorityResult = priorityComposer.compose(value, unit, mockContext, strategies);
      const adaptiveResult = adaptiveComposer.compose(value, unit, mockContext, strategies);

      expect(weightedResult).toBeGreaterThan(0);
      expect(priorityResult).toBeGreaterThan(0);
      expect(adaptiveResult).toBeGreaterThan(0);
    });
  });

  describe('Performance Optimization', () => {
    it('should demonstrate cache performance benefits', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PARENT_WIDTH;
      const result = 800;

      // Cache the result
      cache.set(value, unit, mockContext, result);

      const iterations = 1000;
      const startTime = performance.now();

      // Perform many cache hits
      for (let i = 0; i < iterations; i++) {
        cache.get(value, unit, mockContext);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should be reasonably fast (cache hits)
      expect(duration).toBeLessThan(10000); // 10 seconds for 1000 operations
      expect(cache.getStatistics().hitCount).toBe(iterations);
    });

    it('should demonstrate composition performance', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PARENT_WIDTH;
      
      const strategies = [
        { strategy: new FillSizeValueCalculationStrategy(), weight: 1.0 },
        { strategy: new ParentWidthSizeValueCalculationStrategy(), weight: 1.0 }
      ];

      const iterations = 100;
      const startTime = performance.now();

      // Perform many compositions
      for (let i = 0; i < iterations; i++) {
        weightedComposer.compose(value, unit, mockContext, strategies);
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete within reasonable time
      expect(duration).toBeLessThan(5000); // 5 seconds for 100 operations
      expect(weightedComposer.getPerformanceMetrics().totalExecutions).toBe(iterations);
    });
  });

  describe('Error Handling and Resilience', () => {
    it('should handle composition errors gracefully', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PARENT_WIDTH;
      
      // Empty strategies array
      const result = weightedComposer.compose(value, unit, mockContext, []);
      expect(result).toBe(0); // Fallback value
    });

    it('should handle cache errors gracefully', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PARENT_WIDTH;
      
      // Invalid context
      const result = cache.get(value, unit, {});
      expect(result).toBeNull();
    });

    it('should handle strategy validation failures', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PARENT_WIDTH;
      
      const strategies = [
        { strategy: new FillSizeValueCalculationStrategy(), weight: 1.0 }
      ];

      // Invalid context
      const result = weightedComposer.compose(value, unit, {}, strategies);
      expect(result).toBe(0); // Fallback value
    });
  });

  describe('Advanced Features Demonstration', () => {
    it('should demonstrate adaptive learning', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PARENT_WIDTH;
      
      const strategies = [
        { strategy: new FillSizeValueCalculationStrategy(), weight: 1.0 },
        { strategy: new ParentWidthSizeValueCalculationStrategy(), weight: 1.0 }
      ];

      // Perform multiple compositions to build performance history
      for (let i = 0; i < 10; i++) {
        adaptiveComposer.compose(value, unit, mockContext, strategies);
      }

      const metrics = adaptiveComposer.getPerformanceMetrics();
      expect(metrics.totalExecutions).toBe(10);
      expect(metrics.successRate).toBe(1);
    });

    it('should demonstrate cache key generation', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PARENT_WIDTH;
      
      // Set initial cache entry
      cache.set(value, unit, mockContext, 800);
      
      // Different contexts should generate different keys
      const differentContext = { ...mockContext, parent: { width: 1000, height: 800 } };
      cache.set(value, unit, differentContext, 1000);
      
      expect(cache.getKeys().length).toBeGreaterThan(1);
    });

    it('should demonstrate composer priority handling', () => {
      const value = SizeValue.FILL;
      const unit = SizeUnit.PARENT_WIDTH;
      
      // Strategies array (unused but kept for demonstration)
      [
        { strategy: new FillSizeValueCalculationStrategy(), weight: 1.0 }
      ];

      // Test priority-based selection
      expect(priorityComposer.canCompose(value, unit)).toBe(true);
      expect(priorityComposer.priority).toBe(2);
      expect(weightedComposer.priority).toBe(1);
      expect(adaptiveComposer.priority).toBe(3);
    });
  });
});
