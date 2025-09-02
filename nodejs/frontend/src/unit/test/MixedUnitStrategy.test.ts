import { describe, beforeEach, afterEach, it, expect } from '@jest/globals';
import { MixedUnitStrategy } from '../strategies/MixedUnitStrategy';
import { createMockContext } from '../../test/setup';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

describe('MixedUnitStrategy', () => {
  let strategy: MixedUnitStrategy;
  let mockContext: ReturnType<typeof createMockContext>;

  beforeEach(() => {
    strategy = new MixedUnitStrategy();
    mockContext = createMockContext();
  });

  afterEach(() => {
    // Clean up if needed
  });

  describe('Constructor and Basic Properties', () => {
    it('should create a mixed unit strategy with correct properties', () => {
      expect(strategy.unitType).toBe('mixed');
    });

    it('should have correct priority for mixed calculations', () => {
      const priority = strategy.getPriority();
      expect(priority).toBe(4); // Mixed strategy priority
    });
  });

  describe('Input Validation', () => {
    it('should handle mixed array inputs', () => {
      const input = [100, '50%', 'auto'] as any;
      expect(strategy.canHandle(input)).toBe(true);
    });

    it('should handle mixed object inputs', () => {
      const input = {
        size: { value: 100 },
        position: { value: 'center' },
        scale: { value: 1.5 },
      } as any;
      expect(strategy.canHandle(input)).toBe(true);
    });

    it('should reject simple inputs', () => {
      const input = 100 as any;
      expect(strategy.canHandle(input)).toBe(false);
    });
  });

  describe('Array Input Calculations', () => {
    it('should calculate average of numeric array', () => {
      const input = [100, 200, 300] as any;
      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(233.33333333333334); // Average with initial value
    });

    it('should handle empty array', () => {
      const input = [] as any;
      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT);
    });

    it('should handle single item array', () => {
      const input = [150] as any;
      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(250); // 150 + 100 (initial) / 1
    });

    it('should handle mixed type array', () => {
      const input = [100, '200', 'auto'] as any;
      const result = strategy.calculate(input, mockContext);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Object Input Calculations', () => {
    it('should calculate from mixed object with size properties', () => {
      const input = {
        size: { value: 100 },
        position: { value: 'center' },
        scale: { value: 1.5 },
      } as any;
      const result = strategy.calculate(input, mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should handle object with only size properties', () => {
      const input = {
        size: { value: 200 },
      } as any;
      const result = strategy.calculate(input, mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should handle object with only position properties', () => {
      const input = {
        position: { value: 'center' },
      } as any;
      const result = strategy.calculate(input, mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should handle object with only scale properties', () => {
      const input = {
        scale: { value: 2.0 },
      } as any;
      const result = strategy.calculate(input, mockContext);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases and Fallbacks', () => {
    it('should handle undefined input gracefully', () => {
      const result = strategy.calculate(undefined as any, mockContext);
      expect(result).toBe(DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT);
    });

    it('should handle null input gracefully', () => {
      const result = strategy.calculate(null as any, mockContext);
      expect(result).toBe(DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT);
    });

    it('should handle missing context gracefully', () => {
      const input = [100, 200, 300] as any;
      const result = strategy.calculate(input, {} as any);
      expect(result).toBe(233.33333333333334); // Average with initial value
    });
  });

  describe('Strategy Priority and Selection', () => {
    it('should have correct priority for mixed calculations', () => {
      const priority = strategy.getPriority();
      expect(priority).toBe(4); // Mixed strategy priority
    });

    it('should reject unsupported input types', () => {
      const simpleInput = 100 as any;
      expect(strategy.canHandle(simpleInput)).toBe(false);
    });
  });

  describe('Performance and Error Handling', () => {
    it('should handle complex nested objects', () => {
      const input = {
        size: {
          value: 100,
        },
        position: {
          value: 'center',
        },
      } as any;
      const result = strategy.calculate(input, mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should handle large arrays efficiently', () => {
      const largeArray = Array.from({ length: 1000 }, (_, i) => i);
      const input = largeArray as any;
      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(499.6); // Average with initial value
    });
  });
});
