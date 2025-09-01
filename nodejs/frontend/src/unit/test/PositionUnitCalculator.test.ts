import { PositionUnitCalculator } from '../classes/PositionUnitCalculator';
import { PositionUnit } from '../enums/PositionUnit';
import { PositionValue } from '../enums/PositionValue';
import { Dimension } from '../enums/Dimension';
import { createMockContext } from '../../test/setup';

describe('PositionUnitCalculator', () => {
  let calculator: PositionUnitCalculator;
  let mockContext: ReturnType<typeof createMockContext>;

  beforeEach(() => {
    mockContext = createMockContext();
  });

  describe('Constructor', () => {
    it('should create a position unit calculator with correct properties', () => {
      calculator = new PositionUnitCalculator(
        'test-position',
        'Test Position',
        PositionUnit.PIXEL,
        Dimension.X,
        100
      );

      expect(calculator.id).toBe('test-position');
      expect(calculator.name).toBe('Test Position');
      expect(calculator.positionUnit).toBe(PositionUnit.PIXEL);
      expect(calculator.axis).toBe(Dimension.X);
      expect(calculator.baseValue).toBe(100);
      expect(calculator.isActive).toBe(true);
    });
  });

  describe('Basic Calculations', () => {
    it('should calculate numeric base values directly', () => {
      calculator = new PositionUnitCalculator(
        'test-position',
        'Test Position',
        PositionUnit.PIXEL,
        Dimension.X,
        150
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(150);
    });

    it('should calculate X-axis position specifically', () => {
      calculator = new PositionUnitCalculator(
        'test-position',
        'Test Position',
        PositionUnit.PIXEL,
        Dimension.X,
        200
      );

      const result = calculator.calculateX(mockContext);
      expect(result).toBe(200);
    });

    it('should calculate Y-axis position specifically', () => {
      calculator = new PositionUnitCalculator(
        'test-position',
        'Test Position',
        PositionUnit.PIXEL,
        Dimension.Y,
        300
      );

      const result = calculator.calculateY(mockContext);
      expect(result).toBe(300);
    });
  });

  describe('Position Value Calculations', () => {
    it('should calculate CENTER position', () => {
      calculator = new PositionUnitCalculator(
        'test-position',
        'Test Position',
        PositionUnit.PARENT_CENTER_X,
        Dimension.X,
        PositionValue.CENTER
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate LEFT position', () => {
      calculator = new PositionUnitCalculator(
        'test-position',
        'Test Position',
        PositionUnit.PARENT_LEFT,
        Dimension.X,
        PositionValue.LEFT
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThanOrEqual(0); // LEFT might return 0
    });

    it('should calculate RIGHT position', () => {
      calculator = new PositionUnitCalculator(
        'test-position',
        'Test Position',
        PositionUnit.PARENT_RIGHT,
        Dimension.X,
        PositionValue.RIGHT
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });

    it('should calculate RANDOM position', () => {
      calculator = new PositionUnitCalculator(
        'test-position',
        'Test Position',
        PositionUnit.PIXEL,
        Dimension.X,
        PositionValue.RANDOM
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle undefined context gracefully', () => {
      calculator = new PositionUnitCalculator(
        'test-position',
        'Test Position',
        PositionUnit.PIXEL,
        Dimension.X,
        100
      );

      const result = calculator.calculate({} as any);
      expect(result).toBe(100); // Should fall back to base value
    });

    it('should handle missing parent context', () => {
      calculator = new PositionUnitCalculator(
        'test-position',
        'Test Position',
        PositionUnit.PARENT_CENTER_X,
        Dimension.X,
        PositionValue.CENTER
      );

      const contextWithoutParent = { ...mockContext, parent: undefined };
      const result = calculator.calculate(contextWithoutParent);
      expect(result).toBeGreaterThan(0); // Should have fallback behavior
    });
  });

  describe('Axis-Specific Behavior', () => {
    it('should handle X-axis calculations correctly', () => {
      calculator = new PositionUnitCalculator(
        'test-position',
        'Test Position',
        PositionUnit.PIXEL,
        Dimension.X,
        200
      );

      expect(calculator.axis).toBe(Dimension.X);
    });

    it('should handle Y-axis calculations correctly', () => {
      calculator = new PositionUnitCalculator(
        'test-position',
        'Test Position',
        PositionUnit.PIXEL,
        Dimension.Y,
        300
      );

      expect(calculator.axis).toBe(Dimension.Y);
    });

    it('should handle XY-axis calculations correctly', () => {
      calculator = new PositionUnitCalculator(
        'test-position',
        'Test Position',
        PositionUnit.PIXEL,
        Dimension.XY,
        400
      );

      expect(calculator.axis).toBe(Dimension.XY);
    });
  });
});
