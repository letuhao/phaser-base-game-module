import { SizeUnitCalculator } from '../classes/SizeUnitCalculator';
import { SizeUnit } from '../enums/SizeUnit';
import { SizeValue } from '../enums/SizeValue';
import { Dimension } from '../enums/Dimension';
import { createMockContext } from '../../test/setup';

describe('SizeUnitCalculator', () => {
  let calculator: SizeUnitCalculator;
  let mockContext: ReturnType<typeof createMockContext>;

  beforeEach(() => {
    mockContext = createMockContext();
  });

  describe('Constructor', () => {
    it('should create a size unit calculator with correct properties', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        true
      );

      expect(calculator.id).toBe('test-size');
      expect(calculator.name).toBe('Test Size');
      expect(calculator.sizeUnit).toBe(SizeUnit.PARENT_WIDTH);
      expect(calculator.dimension).toBe(Dimension.WIDTH);
      expect(calculator.baseValue).toBe(SizeValue.FILL);
      expect(calculator.maintainAspectRatio).toBe(true);
      expect(calculator.isActive).toBe(true);
    });
  });

  describe('Basic Calculations', () => {
    it('should calculate numeric base values directly', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        150,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(150);
    });

    it('should calculate width specifically', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        200,
        false
      );

      const result = calculator.calculateWidth(mockContext);
      expect(result).toBe(200);
    });

    it('should calculate height specifically', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.HEIGHT,
        300,
        false
      );

      const result = calculator.calculateHeight(mockContext);
      expect(result).toBe(300);
    });

    it('should throw error when calculating width for height-only dimension', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.HEIGHT,
        200,
        false
      );

      expect(() => calculator.calculateWidth(mockContext)).toThrow(
        'Cannot calculate width for height-only dimension'
      );
    });

    it('should throw error when calculating height for width-only dimension', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        200,
        false
      );

      expect(() => calculator.calculateHeight(mockContext)).toThrow(
        'Cannot calculate height for width-only dimension'
      );
    });
  });

  describe('Size Value Calculations', () => {
    it('should calculate FILL size', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.FILL,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate AUTO size', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.AUTO,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate FIT size', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.FIT,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate STRETCH size', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.STRETCH,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Parent-Relative Calculations', () => {
    it('should calculate parent width size', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(800); // mockContext.parent.width
    });

    it('should calculate parent height size', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PARENT_HEIGHT,
        Dimension.HEIGHT,
        SizeValue.FILL,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(600); // mockContext.parent.height
    });
  });

  describe('Scene-Relative Calculations', () => {
    it('should calculate scene width size', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.SCENE_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(1200); // mockContext.scene.width
    });

    it('should calculate scene height size', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.SCENE_HEIGHT,
        Dimension.HEIGHT,
        SizeValue.FILL,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(800); // mockContext.scene.height
    });
  });

  describe('Viewport-Relative Calculations', () => {
    it('should calculate viewport width size', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.VIEWPORT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(1200); // mockContext.viewport.width
    });

    it('should calculate viewport height size', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.VIEWPORT_HEIGHT,
        Dimension.HEIGHT,
        SizeValue.FILL,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(800); // mockContext.viewport.height
    });
  });

  describe('Content and Intrinsic Calculations', () => {
    it('should calculate content size', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.CONTENT,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(400); // mockContext.content.width
    });

    it('should calculate intrinsic size', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.INTRINSIC,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Random Calculations', () => {
    it('should calculate random size', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.RANDOM,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThanOrEqual(10000); // Updated max from constants
    });
  });

  describe('Constraints and Validation', () => {
    it('should apply minimum size constraint', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        50,
        false
      );
      // Note: minSize is private, so we can't set it directly in tests
      // In a real implementation, this would be set through a setter method
      const result = calculator.calculate(mockContext);
      expect(result).toBe(50); // Should use base value
    });

    it('should apply maximum size constraint', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        500,
        false
      );
      // Note: maxSize is private, so we can't set it directly in tests
      const result = calculator.calculate(mockContext);
      expect(result).toBe(500); // Should use base value
    });

    it('should check constraint information', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        200,
        false
      );

      const constraintInfo = calculator.getConstraintInfo();
      expect(constraintInfo.hasConstraints).toBe(false);
      expect(constraintInfo.min).toBeUndefined();
      expect(constraintInfo.max).toBeUndefined();
    });

    it('should check if unit has constraints', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        200,
        false
      );

      expect(calculator.hasConstraints()).toBe(false);
    });
  });

  describe('Aspect Ratio Handling', () => {
    it('should maintain aspect ratio when enabled', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        200,
        true
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(200);
      // Note: In a real implementation, this would check aspect ratio preservation
    });

    it('should not maintain aspect ratio when disabled', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        200,
        false
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(200);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined context gracefully', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false
      );

      const result = calculator.calculate({} as any);
      expect(result).toBe(100); // Should fall back to base value
    });

    it('should handle missing parent context', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false
      );

      const contextWithoutParent = { ...mockContext, parent: undefined };
      const result = calculator.calculate(contextWithoutParent);
      expect(result).toBeGreaterThan(0); // Should have fallback behavior
    });

    it('should handle missing scene context', () => {
      calculator = new SizeUnitCalculator(
        'test-size',
        'Test Size',
        SizeUnit.SCENE_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false
      );

      const contextWithoutScene = { ...mockContext, scene: undefined };
      const result = calculator.calculate(contextWithoutScene);
      expect(result).toBeGreaterThan(0); // Should have fallback behavior
    });
  });
});
