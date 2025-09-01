import { ScaleUnitCalculator } from '../classes/ScaleUnitCalculator';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { createMockContext } from '../../test/setup';

describe('ScaleUnitCalculator', () => {
  let calculator: ScaleUnitCalculator;
  let mockContext: ReturnType<typeof createMockContext>;

  beforeEach(() => {
    mockContext = createMockContext();
  });

  describe('Constructor', () => {
    it('should create a scale unit calculator with correct properties', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.FACTOR,
        1.5,
        true
      );

      expect(calculator.id).toBe('test-scale');
      expect(calculator.name).toBe('Test Scale');
      expect(calculator.scaleUnit).toBe(ScaleUnit.FACTOR);
      expect(calculator.baseValue).toBe(1.5);
      expect(calculator.maintainAspectRatio).toBe(true);
      expect(calculator.isActive).toBe(true);
    });
  });

  describe('Basic Calculations', () => {
    it('should calculate numeric base values directly', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.FACTOR,
        2.0,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(2.0);
    });

    it('should calculate scale factor', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.FACTOR,
        0.5,
        false
      );

      const result = calculator.calculateScale(mockContext);
      expect(result).toBe(0.5);
    });
  });

  describe('Scale Value Calculations', () => {
    it('should calculate FACTOR scale', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.FACTOR,
        ScaleValue.FACTOR,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate FIT scale', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.FIT,
        ScaleValue.FIT,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate STRETCH scale', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.STRETCH,
        ScaleValue.STRETCH,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Parent-Relative Calculations', () => {
    it('should calculate parent width scale', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.PARENT_WIDTH_SCALE,
        ScaleValue.PARENT_WIDTH_SCALE,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate parent height scale', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.PARENT_HEIGHT_SCALE,
        ScaleValue.PARENT_HEIGHT_SCALE,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Scene-Relative Calculations', () => {
    it('should calculate scene width scale', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.SCENE_WIDTH_SCALE,
        ScaleValue.SCENE_WIDTH_SCALE,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate scene height scale', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.SCENE_HEIGHT_SCALE,
        ScaleValue.SCENE_HEIGHT_SCALE,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Viewport-Relative Calculations', () => {
    it('should calculate viewport width scale', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.VIEWPORT_WIDTH_SCALE,
        ScaleValue.VIEWPORT_WIDTH_SCALE,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate viewport height scale', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.VIEWPORT_HEIGHT_SCALE,
        ScaleValue.VIEWPORT_HEIGHT_SCALE,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Content and Intrinsic Calculations', () => {
    it('should calculate content scale', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.CONTENT_SCALE,
        ScaleValue.CONTENT_SCALE,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate intrinsic scale', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.INTRINSIC_SCALE,
        ScaleValue.INTRINSIC_SCALE,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Random Calculations', () => {
    it('should calculate random scale', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.RANDOM,
        ScaleValue.RANDOM,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThanOrEqual(10); // Default max scale
    });
  });

  describe('Constraints and Validation', () => {
    it('should check constraint information', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.FACTOR,
        2.0,
        false
      );

      const constraintInfo = calculator.getConstraintInfo();
      expect(constraintInfo.hasConstraints).toBe(false);
      expect(constraintInfo.min).toBeUndefined();
      expect(constraintInfo.max).toBeUndefined();
    });

    it('should check if unit has constraints', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.FACTOR,
        2.0,
        false
      );

      expect(calculator.hasConstraints()).toBe(false);
    });
  });

  describe('Aspect Ratio Handling', () => {
    it('should maintain aspect ratio when enabled', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.FACTOR,
        1.5,
        true
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(1.5);
    });

    it('should not maintain aspect ratio when disabled', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.FACTOR,
        1.5,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(1.5);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined context gracefully', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.FACTOR,
        1.0,
        false
      );

      const result = calculator.calculate({} as any);
      expect(result).toBe(1.0); // Should fall back to base value
    });

    it('should handle missing parent context', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.PARENT_WIDTH_SCALE,
        ScaleValue.PARENT_WIDTH_SCALE,
        false
      );

      const contextWithoutParent = { ...mockContext, parent: undefined };
      const result = calculator.calculate(contextWithoutParent);
      expect(result).toBeGreaterThan(0); // Should have fallback behavior
    });

    it('should handle missing scene context', () => {
      calculator = new ScaleUnitCalculator(
        'test-scale',
        'Test Scale',
        ScaleUnit.SCENE_WIDTH_SCALE,
        ScaleValue.SCENE_WIDTH_SCALE,
        false
      );

      const contextWithoutScene = { ...mockContext, scene: undefined };
      const result = calculator.calculate(contextWithoutScene);
      expect(result).toBeGreaterThan(0); // Should have fallback behavior
    });
  });
});
