import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { CachingDecorator } from '../decorators/CachingDecorator';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { UnitType } from '../enums/UnitType';

// Mock unit for testing
class MockUnit implements IUnit {
  readonly id: string;
  readonly name: string;
  readonly unitType: UnitType;
  readonly isActive: boolean = true;
  private calculationCount = 0;

  constructor(id: string, name: string, unitType: UnitType = UnitType.SIZE) {
    this.id = id;
    this.name = name;
    this.unitType = unitType;
  }

  calculate(context: UnitContext): number {
    this.calculationCount++;
    // Return a value based on context for testing
    return (context.parent?.width || 100) + this.calculationCount;
  }

  validate(context: UnitContext): boolean {
    return context !== null && context !== undefined;
  }

  isResponsive(): boolean {
    return true;
  }

  toString(): string {
    return `MockUnit(${this.id})`;
  }

  clone(_overrides?: Partial<IUnit>): IUnit {
    return new MockUnit(this.id, this.name, this.unitType);
  }

  getCalculationCount(): number {
    return this.calculationCount;
  }
}

describe('CachingDecorator', () => {
  let mockUnit: MockUnit;
  let decorator: CachingDecorator;
  let mockContext: UnitContext;

  beforeEach(() => {
    mockUnit = new MockUnit('test-unit', 'Test Unit');
    decorator = new CachingDecorator('cache-decorator', 'Cache Decorator', mockUnit);
    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1200, height: 800 },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create a caching decorator with default settings', () => {
      expect(decorator.id).toBe('cache-decorator');
      expect(decorator.name).toBe('Cache Decorator');
      expect(decorator.unitType).toBe(UnitType.SIZE);
      expect(decorator.isActive).toBe(true);
    });

    it('should create a caching decorator with custom settings', () => {
      const customDecorator = new CachingDecorator(
        'custom-cache',
        'Custom Cache',
        mockUnit,
        10000, // 10 second timeout
        50 // 50 max cache size
      );

      expect(customDecorator.id).toBe('custom-cache');
      expect(customDecorator.name).toBe('Custom Cache');
    });
  });

  describe('calculate', () => {
    it('should calculate and cache the result', () => {
      const result1 = decorator.calculate(mockContext);
      const result2 = decorator.calculate(mockContext);

      expect(result1).toBe(801); // 800 + 1
      expect(result2).toBe(801); // Should be cached, same result
      expect(mockUnit.getCalculationCount()).toBe(1); // Only calculated once
    });

    it('should use different cache keys for different contexts', () => {
      const context1: UnitContext = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      const context2: UnitContext = { parent: { width: 200, height: 200, x: 0, y: 0 } };

      const result1 = decorator.calculate(context1);
      const result2 = decorator.calculate(context2);

      expect(result1).toBe(101); // 100 + 1
      expect(result2).toBe(202); // 200 + 2 (different calculation)
      expect(mockUnit.getCalculationCount()).toBe(2); // Calculated twice
    });

    it('should handle calculation errors gracefully', () => {
      const errorUnit = new MockUnit('error-unit', 'Error Unit');
      const errorDecorator = new CachingDecorator('error-cache', 'Error Cache', errorUnit);

      // Mock the calculate method to throw an error
      jest.spyOn(errorUnit, 'calculate').mockImplementation(() => {
        throw new Error('Calculation failed');
      });

      expect(() => errorDecorator.calculate(mockContext)).toThrow('Calculation failed');
    });
  });

  describe('decorator functionality', () => {
    it('should return correct decorator type', () => {
      expect(decorator.getDecoratorType()).toBe('CachingDecorator');
    });

    it('should have high priority', () => {
      expect(decorator.getPriority()).toBe(10);
    });

    it('should be able to decorate any unit', () => {
      expect(decorator.canDecorate(mockUnit)).toBe(true);
      expect(decorator.canDecorate(null as any)).toBe(false);
      expect(decorator.canDecorate(undefined as any)).toBe(false);
    });

    it('should return metadata', () => {
      const metadata = decorator.getMetadata();
      expect(metadata.type).toBe('CachingDecorator');
      expect(metadata.priority).toBe(10);
      expect(metadata.description).toBe('Caches unit calculation results for improved performance');
      expect(metadata.version).toBe('1.0.0');
    });
  });

  describe('cache management', () => {
    it('should provide cache statistics', async () => {
      // Perform some calculations
      decorator.calculate(mockContext);

      // Add a small delay to ensure cache entries have some age
      await new Promise(resolve => setTimeout(resolve, 5));

      decorator.calculate(mockContext); // Should be cached

      const stats = decorator.getCacheStats();
      expect(stats.size).toBe(1);
      expect(stats.hits).toBe(1);
      expect(stats.misses).toBe(1);
      expect(stats.hitRate).toBe(0.5);
      expect(stats.averageAge).toBeGreaterThan(0);
    });

    it('should clear cache', () => {
      decorator.calculate(mockContext);
      expect(decorator.getCacheStats().size).toBe(1);

      decorator.clearCache();
      expect(decorator.getCacheStats().size).toBe(0);
      expect(decorator.getCacheStats().hits).toBe(0);
      expect(decorator.getCacheStats().misses).toBe(0);
    });

    it('should set cache timeout', () => {
      decorator.setCacheTimeout(15000);
      // The timeout is internal, but we can verify the method doesn't throw
      expect(() => decorator.setCacheTimeout(15000)).not.toThrow();
    });

    it('should set max cache size', () => {
      decorator.setMaxCacheSize(25);
      // The size limit is internal, but we can verify the method doesn't throw
      expect(() => decorator.setMaxCacheSize(25)).not.toThrow();
    });
  });

  describe('cache expiration', () => {
    it('should expire cache entries after timeout', async () => {
      // Create decorator with very short timeout
      const shortTimeoutDecorator = new CachingDecorator(
        'short-timeout',
        'Short Timeout',
        mockUnit,
        10 // 10ms timeout
      );

      const result1 = shortTimeoutDecorator.calculate(mockContext);
      expect(result1).toBe(801);

      // Wait for cache to expire
      await new Promise(resolve => setTimeout(resolve, 20));

      const result2 = shortTimeoutDecorator.calculate(mockContext);
      expect(result2).toBe(802); // Should recalculate
      expect(mockUnit.getCalculationCount()).toBe(2);
    });
  });

  describe('cache size limits', () => {
    it('should respect max cache size', () => {
      const smallCacheDecorator = new CachingDecorator(
        'small-cache',
        'Small Cache',
        mockUnit,
        5000,
        2 // Max 2 entries
      );

      // Create different contexts to generate different cache keys
      const context1: UnitContext = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      const context2: UnitContext = { parent: { width: 200, height: 200, x: 0, y: 0 } };
      const context3: UnitContext = { parent: { width: 300, height: 300, x: 0, y: 0 } };

      smallCacheDecorator.calculate(context1);
      smallCacheDecorator.calculate(context2);
      smallCacheDecorator.calculate(context3);

      // Should only have 2 entries due to size limit
      expect(smallCacheDecorator.getCacheStats().size).toBeLessThanOrEqual(2);
    });
  });

  describe('integration scenarios', () => {
    it('should handle multiple rapid calculations', () => {
      const results: number[] = [];

      // Perform multiple calculations rapidly
      for (let i = 0; i < 10; i++) {
        results.push(decorator.calculate(mockContext));
      }

      // All results should be the same (cached)
      const firstResult = results[0];
      results.forEach(result => {
        expect(result).toBe(firstResult);
      });

      // Should only calculate once
      expect(mockUnit.getCalculationCount()).toBe(1);
    });

    it('should handle context changes', () => {
      const context1: UnitContext = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      const context2: UnitContext = { parent: { width: 200, height: 200, x: 0, y: 0 } };

      // Calculate with different contexts
      const result1a = decorator.calculate(context1);
      const result1b = decorator.calculate(context1);
      const result2a = decorator.calculate(context2);
      const result2b = decorator.calculate(context2);

      // Same context should return cached results
      expect(result1a).toBe(result1b);
      expect(result2a).toBe(result2b);

      // Different contexts should return different results
      expect(result1a).not.toBe(result2a);

      // Should calculate twice (once for each context)
      expect(mockUnit.getCalculationCount()).toBe(2);
    });
  });

  describe('error handling', () => {
    it('should handle invalid context gracefully', () => {
      const invalidContext = null as any;

      expect(() => decorator.calculate(invalidContext)).toThrow();
    });

    it('should handle wrapped unit errors', () => {
      const errorUnit = new MockUnit('error-unit', 'Error Unit');
      const errorDecorator = new CachingDecorator('error-cache', 'Error Cache', errorUnit);

      jest.spyOn(errorUnit, 'calculate').mockImplementation(() => {
        throw new Error('Unit calculation failed');
      });

      expect(() => errorDecorator.calculate(mockContext)).toThrow('Unit calculation failed');
    });
  });
});
