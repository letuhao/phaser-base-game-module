import { SizeUnitStrategy } from '../strategies/SizeUnitStrategy';
import { SizeValue } from '../enums/SizeValue';
import { SizeUnit } from '../enums/SizeUnit';
import { createMockContext } from '../../test/setup';

describe('SizeUnitStrategy', () => {
  let strategy: SizeUnitStrategy;
  let mockContext: ReturnType<typeof createMockContext>;

  beforeEach(() => {
    strategy = new SizeUnitStrategy();
    mockContext = createMockContext();
  });

  describe('Constructor and Basic Properties', () => {
    it('should create a size unit strategy with correct properties', () => {
      expect(strategy.unitType).toBe('size');
      expect(strategy.getPriority()).toBe(1);
    });

    it('should return correct strategy information', () => {
      const info = strategy.getStrategyInfo();

      expect(info.unitType).toBe('size');
      expect(info.priority).toBe(1);
      expect(info.supportedInputs).toContain('number');
      expect(info.supportedInputs).toContain('string');
      expect(info.supportedInputs).toContain('SizeValue');
      expect(info.supportedInputs).toContain('SizeUnit');
      expect(info.supportedInputs).toContain('array');
      expect(info.supportedInputs).toContain('object');

      expect(info.capabilities).toContain('direct numeric values');
      expect(info.capabilities).toContain('string keywords');
      expect(info.capabilities).toContain('enum values');
      expect(info.capabilities).toContain('array expressions');
      expect(info.capabilities).toContain('configuration objects');
      expect(info.capabilities).toContain('CSS-like strings');
      expect(info.capabilities).toContain('parent-relative sizing');
    });
  });

  describe('Input Validation', () => {
    it('should handle numeric values', () => {
      const input = { value: 150 };
      expect(strategy.canHandle(input)).toBe(true);

      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(150);
    });

    it('should handle string values', () => {
      const input = { value: 'fill' };
      expect(strategy.canHandle(input)).toBe(true);

      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(1200); // mockContext.scene.width
    });

    it('should handle SizeValue enum', () => {
      const input = { value: SizeValue.FILL };
      expect(strategy.canHandle(input)).toBe(true);

      const result = strategy.calculate(input, mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should handle SizeUnit enum', () => {
      const input = { value: SizeUnit.PIXEL };
      expect(strategy.canHandle(input)).toBe(true);

      const result = strategy.calculate(input, mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should handle random values', () => {
      const input = {
        randomValue: {
          getRandomValue: () => 42,
        },
        sizeUnit: SizeUnit.PIXEL, // Add size-related property to trigger size input conversion
      };
      expect(strategy.canHandle(input)).toBe(true);

      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(42);
    });

    it('should handle parent size references', () => {
      const input = {
        parentSize: {
          getValue: (parent: unknown) => (parent as any)?.width || 100,
        },
        sizeUnit: SizeUnit.PIXEL, // Add size-related property to trigger size input conversion
      };
      expect(strategy.canHandle(input)).toBe(true);

      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(800); // mockContext.parent.width
    });

    it('should handle size arrays', () => {
      const input = { sizeArray: [100, 200, 300] };
      expect(strategy.canHandle(input)).toBe(true);

      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(200); // average of [100, 200, 300]
    });

    it('should handle size objects', () => {
      const input = { sizeObject: { width: 250, height: 150 } };
      expect(strategy.canHandle(input)).toBe(true);

      const result = strategy.calculate(input, mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should handle size strings', () => {
      const input = { sizeString: 'auto' };
      expect(strategy.canHandle(input)).toBe(true);

      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(400); // mockContext.content.width (actual value from mock)
    });

    it('should reject invalid inputs', () => {
      const invalidInput = { invalidProperty: 'test' } as any;
      expect(strategy.canHandle(invalidInput)).toBe(false);

      const result = strategy.calculate(invalidInput, mockContext);
      expect(result).toBe(100); // default fallback
    });
  });

  describe('String Keyword Calculations', () => {
    it('should calculate FILL size from string', () => {
      const input = { value: 'fill' };
      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(1200); // mockContext.scene.width
    });

    it('should calculate AUTO size from string', () => {
      const input = { value: 'auto' };
      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(400); // mockContext.content.width (actual value from mock)
    });

    it('should handle unknown string keywords', () => {
      const input = { value: 'unknown' };
      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(100); // default fallback
    });
  });

  describe('Array Input Calculations', () => {
    it('should calculate average of numeric array', () => {
      const input = { sizeArray: [100, 200, 300] };
      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(200); // (100 + 200 + 300) / 3
    });

    it('should handle empty array', () => {
      const input = { sizeArray: [] };
      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(0);
    });

    it('should handle single item array', () => {
      const input = { sizeArray: [150] };
      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(150);
    });

    it('should handle mixed type array', () => {
      const input = { sizeArray: [100, 'fill', 200] };
      const result = strategy.calculate(input, mockContext);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases and Fallbacks', () => {
    it('should handle undefined input gracefully', () => {
      const input = {};
      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(100); // default fallback
    });

    it('should handle null input gracefully', () => {
      const input = null as any;
      const result = strategy.calculate(input, mockContext);
      expect(result).toBe(100); // default fallback
    });

    it('should handle missing context gracefully', () => {
      const input = { value: 200 };
      const emptyContext = {};
      const result = strategy.calculate(input, emptyContext);
      expect(result).toBe(200); // should still work with numeric values
    });
  });

  describe('Strategy Priority and Selection', () => {
    it('should have high priority for size calculations', () => {
      expect(strategy.getPriority()).toBe(1);
    });

    it('should correctly identify supported input types', () => {
      const supportedInputs = [
        { value: 100 },
        { value: 'fill' },
        { value: SizeValue.FILL },
        { value: SizeUnit.PIXEL },
        { randomValue: { getRandomValue: () => 42 } },
        { parentSize: { getValue: () => 200 } },
        { sizeArray: [100, 200] },
        { sizeObject: { width: 300 } },
        { sizeString: 'auto' },
      ];

      supportedInputs.forEach(input => {
        expect(strategy.canHandle(input)).toBe(true);
      });
    });

    it('should reject unsupported input types', () => {
      const unsupportedInputs = [
        { invalidProperty: 'test' } as any,
        { randomProperty: 123 } as any,
        { nested: { invalid: 'data' } } as any,
      ];

      unsupportedInputs.forEach(input => {
        expect(strategy.canHandle(input)).toBe(false);
      });
    });
  });
});
