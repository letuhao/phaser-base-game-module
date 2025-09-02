import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { UnitGroupComposite } from '../composites/UnitGroupComposite';
import { CalculationStrategy } from '../enums/CalculationStrategy';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { UnitType } from '../enums/UnitType';
import { Logger } from '../../core/Logger';

// Mock unit for testing
class MockUnit implements IUnit {
  readonly id: string;
  readonly name: string;
  readonly unitType: UnitType;
  readonly isActive: boolean = true;

  constructor(id: string, name: string, unitType: UnitType = UnitType.SIZE) {
    this.id = id;
    this.name = name;
    this.unitType = unitType;
  }

  calculate(context: UnitContext): number {
    // Return a value based on unit type and context
    switch (this.unitType) {
      case UnitType.SIZE:
        return (context.parent?.width || 100) + parseInt(this.id.split('-')[1] || '0');
      case UnitType.POSITION:
        return (context.parent?.x || 0) + parseInt(this.id.split('-')[1] || '0');
      case UnitType.SCALE:
        return 1.0 + parseInt(this.id.split('-')[1] || '0') / 10;
      default:
        return 0;
    }
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
}

describe('UnitGroupComposite', () => {
  let composite: UnitGroupComposite;
  let mockContext: UnitContext;
  let loggerSpy: any;

  beforeEach(() => {
    // Mock Logger instance
    const mockLogger = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      debug: jest.fn(),
      log: jest.fn(),
    };

    loggerSpy = mockLogger.warn;
    jest.spyOn(Logger, 'getInstance').mockReturnValue(mockLogger as any);

    composite = new UnitGroupComposite('test-group', 'Test Group', 0, CalculationStrategy.SUM);
    mockContext = {
      parent: { width: 800, height: 600, x: 100, y: 50 },
      scene: { width: 1200, height: 800 },
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should create a unit group composite with default settings', () => {
      expect(composite.id).toBe('test-group');
      expect(composite.name).toBe('Test Group');
      expect(composite.unitType).toBe(UnitType.SIZE);
      expect(composite.isActive).toBe(true);
      expect(composite.getCalculationStrategy()).toBe(CalculationStrategy.SUM);
    });

    it('should create a unit group composite with custom settings', () => {
      const customComposite = new UnitGroupComposite(
        'custom-group',
        'Custom Group',
        50,
        CalculationStrategy.AVERAGE
      );

      expect(customComposite.id).toBe('custom-group');
      expect(customComposite.name).toBe('Custom Group');
      expect(customComposite.getCalculationStrategy()).toBe(CalculationStrategy.AVERAGE);
    });
  });

  describe('child management', () => {
    it('should add and remove children', () => {
      const child1 = new MockUnit('child-1', 'Child 1');
      const child2 = new MockUnit('child-2', 'Child 2');

      expect(composite.hasChildren()).toBe(false);
      expect(composite.getChildCount()).toBe(0);

      composite.addChild(child1);
      expect(composite.hasChildren()).toBe(true);
      expect(composite.getChildCount()).toBe(1);

      composite.addChild(child2);
      expect(composite.getChildCount()).toBe(2);

      expect(composite.removeChild(child1)).toBe(true);
      expect(composite.getChildCount()).toBe(1);

      expect(composite.removeChild(child1)).toBe(false); // Already removed
      expect(composite.getChildCount()).toBe(1);
    });

    it('should get children by ID', () => {
      const child1 = new MockUnit('child-1', 'Child 1');
      const child2 = new MockUnit('child-2', 'Child 2');

      composite.addChild(child1);
      composite.addChild(child2);

      expect(composite.getChildById('child-1')).toBe(child1);
      expect(composite.getChildById('child-2')).toBe(child2);
      expect(composite.getChildById('nonexistent')).toBeUndefined();
    });

    it('should get all children', () => {
      const child1 = new MockUnit('child-1', 'Child 1');
      const child2 = new MockUnit('child-2', 'Child 2');

      composite.addChild(child1);
      composite.addChild(child2);

      const children = composite.getChildren();
      expect(children).toHaveLength(2);
      expect(children).toContain(child1);
      expect(children).toContain(child2);
    });
  });

  describe('calculation strategies', () => {
    beforeEach(() => {
      const child1 = new MockUnit('child-10', 'Child 1', UnitType.SIZE);
      const child2 = new MockUnit('child-20', 'Child 2', UnitType.SIZE);
      const child3 = new MockUnit('child-30', 'Child 3', UnitType.SIZE);

      composite.addChild(child1);
      composite.addChild(child2);
      composite.addChild(child3);
    });

    it('should calculate sum strategy correctly', () => {
      composite.setCalculationStrategy(CalculationStrategy.SUM);
      const result = composite.calculate(mockContext);

      // child1: 800 + 10 = 810
      // child2: 800 + 20 = 820
      // child3: 800 + 30 = 830
      // sum: 810 + 820 + 830 = 2460
      expect(result).toBe(2460);
    });

    it('should calculate average strategy correctly', () => {
      composite.setCalculationStrategy(CalculationStrategy.AVERAGE);
      const result = composite.calculate(mockContext);

      // Average of 810, 820, 830 = 820
      expect(result).toBe(820);
    });

    it('should calculate min strategy correctly', () => {
      composite.setCalculationStrategy(CalculationStrategy.MIN);
      const result = composite.calculate(mockContext);

      // Min of 810, 820, 830 = 810
      expect(result).toBe(810);
    });

    it('should calculate max strategy correctly', () => {
      composite.setCalculationStrategy(CalculationStrategy.MAX);
      const result = composite.calculate(mockContext);

      // Max of 810, 820, 830 = 830
      expect(result).toBe(830);
    });

    it('should calculate custom strategy correctly', () => {
      const customCalculator = (results: number[]) => {
        return results.reduce((sum, result) => sum + result * 2, 0);
      };

      composite.setCustomCalculator(customCalculator);
      const result = composite.calculate(mockContext);

      // Custom calculation: (810 + 820 + 830) * 2 = 4920
      expect(result).toBe(4920);
    });

    it('should return base value when no children', () => {
      const emptyComposite = new UnitGroupComposite('empty', 'Empty Group', 100);
      expect(emptyComposite.calculate(mockContext)).toBe(100);
    });
  });

  describe('child filtering', () => {
    beforeEach(() => {
      const sizeChild = new MockUnit('size-1', 'Size Child', UnitType.SIZE);
      const positionChild = new MockUnit('pos-1', 'Position Child', UnitType.POSITION);
      const scaleChild = new MockUnit('scale-1', 'Scale Child', UnitType.SCALE);

      composite.addChild(sizeChild);
      composite.addChild(positionChild);
      composite.addChild(scaleChild);
    });

    it('should get children by type', () => {
      const sizeChildren = composite.getChildrenByType(UnitType.SIZE);
      const positionChildren = composite.getChildrenByType(UnitType.POSITION);
      const scaleChildren = composite.getChildrenByType(UnitType.SCALE);

      expect(sizeChildren).toHaveLength(1);
      expect(positionChildren).toHaveLength(1);
      expect(scaleChildren).toHaveLength(1);

      expect(sizeChildren[0].unitType).toBe(UnitType.SIZE);
      expect(positionChildren[0].unitType).toBe(UnitType.POSITION);
      expect(scaleChildren[0].unitType).toBe(UnitType.SCALE);
    });

    it('should get responsive children', () => {
      const responsiveChildren = composite.getResponsiveChildren();
      expect(responsiveChildren).toHaveLength(3); // All mock units are responsive
    });

    it('should get active children', () => {
      const activeChildren = composite.getActiveChildren();
      expect(activeChildren).toHaveLength(3); // All mock units are active
    });
  });

  describe('group statistics', () => {
    beforeEach(() => {
      const child1 = new MockUnit('child-10', 'Child 1', UnitType.SIZE);
      const child2 = new MockUnit('child-20', 'Child 2', UnitType.POSITION);
      const child3 = new MockUnit('child-30', 'Child 3', UnitType.SCALE);

      composite.addChild(child1);
      composite.addChild(child2);
      composite.addChild(child3);
    });

    it('should provide group statistics', () => {
      const stats = composite.getGroupStats();

      expect(stats.totalChildren).toBe(3);
      expect(stats.activeChildren).toBe(3);
      expect(stats.responsiveChildren).toBe(3);
      expect(stats.averageResult).toBeGreaterThan(0);
      expect(stats.minResult).toBeGreaterThan(0);
      expect(stats.maxResult).toBeGreaterThan(0);
    });

    it('should provide composition summary', () => {
      const summary = composite.getCompositionSummary();

      expect(summary.totalUnits).toBe(3);
      expect(summary.unitTypes[UnitType.SIZE]).toBe(1);
      expect(summary.unitTypes[UnitType.POSITION]).toBe(1);
      expect(summary.unitTypes[UnitType.SCALE]).toBe(1);
      expect(summary.responsiveUnits).toBe(3);
      expect(summary.activeUnits).toBe(3);
    });
  });

  describe('responsiveness', () => {
    it('should be responsive if any child is responsive', () => {
      expect(composite.isResponsive()).toBe(false); // No children initially

      const responsiveChild = new MockUnit('responsive', 'Responsive Child');
      composite.addChild(responsiveChild);

      expect(composite.isResponsive()).toBe(true);
    });

    it('should not be responsive if no children are responsive', () => {
      // Create a non-responsive mock unit
      const nonResponsiveChild = new MockUnit('non-responsive', 'Non-Responsive Child');
      jest.spyOn(nonResponsiveChild, 'isResponsive').mockReturnValue(false);

      composite.addChild(nonResponsiveChild);
      expect(composite.isResponsive()).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should handle calculation errors gracefully', () => {
      const errorChild = new MockUnit('error-child', 'Error Child');
      composite.addChild(errorChild);

      // Mock the calculate method to throw an error
      jest.spyOn(errorChild, 'calculate').mockImplementation(() => {
        throw new Error('Child calculation failed');
      });

      const result = composite.calculate(mockContext);

      expect(result).toBe(0); // Should return base value
      expect(loggerSpy).toHaveBeenCalledWith(
        'UnitGroupComposite',
        'calculate',
        'Error calculating child unit error-child',
        { error: 'Child calculation failed' }
      );
    });

    it('should handle invalid context', () => {
      const child = new MockUnit('child-1', 'Child 1');
      composite.addChild(child);

      const invalidContext = null as any;

      // Should not throw, but handle gracefully
      expect(() => composite.calculate(invalidContext)).not.toThrow();
    });
  });

  describe('integration scenarios', () => {
    it('should handle complex calculation scenarios', () => {
      // Create a complex group with different unit types
      const sizeChild1 = new MockUnit('size-10', 'Size 1', UnitType.SIZE);
      const sizeChild2 = new MockUnit('size-20', 'Size 2', UnitType.SIZE);
      const positionChild = new MockUnit('pos-15', 'Position', UnitType.POSITION);
      const scaleChild = new MockUnit('scale-5', 'Scale', UnitType.SCALE);

      composite.addChild(sizeChild1);
      composite.addChild(sizeChild2);
      composite.addChild(positionChild);
      composite.addChild(scaleChild);

      // Test different strategies
      composite.setCalculationStrategy(CalculationStrategy.SUM);
      const sumResult = composite.calculate(mockContext);

      composite.setCalculationStrategy(CalculationStrategy.AVERAGE);
      const avgResult = composite.calculate(mockContext);

      composite.setCalculationStrategy(CalculationStrategy.MIN);
      const minResult = composite.calculate(mockContext);

      composite.setCalculationStrategy(CalculationStrategy.MAX);
      const maxResult = composite.calculate(mockContext);

      // Verify results are reasonable
      expect(sumResult).toBeGreaterThan(0);
      expect(avgResult).toBeGreaterThan(0);
      expect(minResult).toBeGreaterThan(0);
      expect(maxResult).toBeGreaterThan(0);

      expect(avgResult).toBeLessThan(sumResult);
      expect(minResult).toBeLessThanOrEqual(maxResult);
    });

    it('should handle nested composites', () => {
      const nestedComposite = new UnitGroupComposite(
        'nested',
        'Nested Group',
        0,
        CalculationStrategy.SUM
      );
      const child1 = new MockUnit('child-1', 'Child 1');
      const child2 = new MockUnit('child-2', 'Child 2');

      nestedComposite.addChild(child1);
      nestedComposite.addChild(child2);

      composite.addChild(nestedComposite);

      const result = composite.calculate(mockContext);
      expect(result).toBeGreaterThan(0);
    });
  });
});
