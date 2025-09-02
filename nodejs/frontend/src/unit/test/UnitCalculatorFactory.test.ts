import { describe, beforeEach, afterEach, it, expect } from '@jest/globals';
import { UnitCalculatorFactory } from '../classes/UnitCalculatorFactory';
import { SizeUnitCalculator } from '../classes/SizeUnitCalculator';
import { PositionUnitCalculator } from '../classes/PositionUnitCalculator';
import { ScaleUnitCalculator } from '../classes/ScaleUnitCalculator';
import { UnitType } from '../enums/UnitType';
import { SizeUnit } from '../enums/SizeUnit';
import { PositionUnit } from '../enums/PositionUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { PositionValue } from '../enums/PositionValue';
import { ScaleValue } from '../enums/ScaleValue';

describe('UnitCalculatorFactory', () => {
  let factory: UnitCalculatorFactory;

  beforeEach(() => {
    factory = UnitCalculatorFactory.getInstance();
  });

  afterEach(() => {
    // Clean up if needed
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = UnitCalculatorFactory.getInstance();
      const instance2 = UnitCalculatorFactory.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('Size Calculator Creation', () => {
    it('should create a size unit calculator', () => {
      const calculator = factory.createSizeUnit(
        'test-size',
        'Test Size Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.AUTO
      );

      expect(calculator).toBeInstanceOf(SizeUnitCalculator);
      expect(calculator.id).toBe('test-size');
      expect(calculator.name).toBe('Test Size Calculator');
      expect(calculator.unitType).toBe('size');
      expect(calculator.dimension).toBe(Dimension.WIDTH);
    });

    it('should create size calculator with different size units', () => {
      const pixelCalculator = factory.createSizeUnit(
        'pixel-test',
        'Pixel Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100
      );
      expect(pixelCalculator.unitType).toBe('size');

      const autoCalculator = factory.createSizeUnit(
        'auto-test',
        'Auto Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.AUTO
      );
      expect(autoCalculator.unitType).toBe('size');
    });

    it('should create size calculator from config', () => {
      const calculator = factory.createSizeUnitFromConfig({
        id: 'config-test',
        name: 'Config Calculator',
        sizeUnit: SizeUnit.PIXEL,
        dimension: Dimension.WIDTH,
        baseValue: 100,
        maintainAspectRatio: true,
        minSize: 50,
        maxSize: 200,
      });

      expect(calculator).toBeInstanceOf(SizeUnitCalculator);
      expect(calculator.id).toBe('config-test');
      expect(calculator.name).toBe('Config Calculator');
    });
  });

  describe('Position Calculator Creation', () => {
    it('should create a position unit calculator', () => {
      const calculator = factory.createPositionUnit(
        'test-position',
        'Test Position Calculator',
        PositionUnit.PIXEL,
        Dimension.X,
        PositionValue.CENTER
      );

      expect(calculator).toBeInstanceOf(PositionUnitCalculator);
      expect(calculator.id).toBe('test-position');
      expect(calculator.name).toBe('Test Position Calculator');
      expect(calculator.unitType).toBe('position');
    });

    it('should create position calculator from config', () => {
      const calculator = factory.createPositionUnitFromConfig({
        id: 'config-test',
        name: 'Config Position',
        positionUnit: PositionUnit.PIXEL,
        axis: Dimension.X,
        baseValue: 100,
      });

      expect(calculator).toBeInstanceOf(PositionUnitCalculator);
      expect(calculator.id).toBe('config-test');
      expect(calculator.name).toBe('Config Position');
    });
  });

  describe('Scale Calculator Creation', () => {
    it('should create a scale unit calculator', () => {
      const calculator = factory.createScaleUnit(
        'test-scale',
        'Test Scale Calculator',
        ScaleUnit.FACTOR,
        ScaleValue.FACTOR
      );

      expect(calculator).toBeInstanceOf(ScaleUnitCalculator);
      expect(calculator.id).toBe('test-scale');
      expect(calculator.name).toBe('Test Scale Calculator');
      expect(calculator.unitType).toBe('scale');
    });

    it('should create scale calculator from config', () => {
      const calculator = factory.createScaleUnitFromConfig({
        id: 'config-test',
        name: 'Config Scale',
        scaleUnit: ScaleUnit.FACTOR,
        baseValue: 1.5,
        maintainAspectRatio: true,
      });

      expect(calculator).toBeInstanceOf(ScaleUnitCalculator);
      expect(calculator.id).toBe('config-test');
      expect(calculator.name).toBe('Config Scale');
    });
  });

  describe('Generic Unit Creation', () => {
    it('should create size unit using createUnit', () => {
      const calculator = factory.createUnit(UnitType.SIZE, 'test-size', 'Test Size', {
        id: 'test-size',
        name: 'Test Size',
        sizeUnit: SizeUnit.PIXEL,
        dimension: Dimension.WIDTH,
        baseValue: 100,
        maintainAspectRatio: false,
      });

      expect(calculator).toBeInstanceOf(SizeUnitCalculator);
      expect(calculator.id).toBe('test-size');
      expect(calculator.name).toBe('Test Size');
    });

    it('should create position unit using createUnit', () => {
      const calculator = factory.createUnit(UnitType.POSITION, 'test-position', 'Test Position', {
        id: 'test-position',
        name: 'Test Position',
        positionUnit: PositionUnit.PIXEL,
        axis: Dimension.X,
        baseValue: 100,
      });

      expect(calculator).toBeInstanceOf(PositionUnitCalculator);
      expect(calculator.id).toBe('test-position');
      expect(calculator.name).toBe('Test Position');
    });

    it('should create scale unit using createUnit', () => {
      const calculator = factory.createUnit(UnitType.SCALE, 'test-scale', 'Test Scale', {
        id: 'test-scale',
        name: 'Test Scale',
        scaleUnit: ScaleUnit.FACTOR,
        baseValue: 1.5,
        maintainAspectRatio: false,
      });

      expect(calculator).toBeInstanceOf(ScaleUnitCalculator);
      expect(calculator.id).toBe('test-scale');
      expect(calculator.name).toBe('Test Scale');
    });

    it('should throw error for invalid unit type', () => {
      expect(() => {
        factory.createUnit('invalid' as UnitType, 'test', 'Test', {
          id: 'test',
          name: 'Test',
          baseValue: 100,
        });
      }).toThrow('Unknown unit type: invalid');
    });
  });

  describe('Calculator Management', () => {
    it('should retrieve created calculator', () => {
      const calculator = factory.createSizeUnit(
        'retrieve-test',
        'Retrieve Test',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100
      );

      const retrieved = factory.getCalculator('retrieve-test');
      expect(retrieved).toBe(calculator);
    });

    it('should return undefined for non-existent calculator', () => {
      const retrieved = factory.getCalculator('non-existent');
      expect(retrieved).toBeUndefined();
    });

    it('should list all calculators', () => {
      // Clear existing calculators
      factory.clearCalculators();

      factory.createSizeUnit('test1', 'Test 1', SizeUnit.PIXEL, Dimension.WIDTH, 100);
      factory.createPositionUnit('test2', 'Test 2', PositionUnit.PIXEL, Dimension.X, 100);
      factory.createScaleUnit('test3', 'Test 3', ScaleUnit.FACTOR, 1.5);

      const calculators = factory.getAllCalculators();
      expect(calculators).toHaveLength(3);
      expect(calculators.map(c => c.id)).toContain('test1');
      expect(calculators.map(c => c.id)).toContain('test2');
      expect(calculators.map(c => c.id)).toContain('test3');
    });

    it('should remove calculator', () => {
      factory.createSizeUnit('remove-test', 'Remove Test', SizeUnit.PIXEL, Dimension.WIDTH, 100);

      expect(factory.getCalculator('remove-test')).toBeDefined();

      factory.removeCalculator('remove-test');
      expect(factory.getCalculator('remove-test')).toBeUndefined();
    });
  });

  describe('Calculator Functionality', () => {
    it('should create functional size calculator', () => {
      const calculator = factory.createSizeUnit(
        'functional-test',
        'Functional Test',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.AUTO
      );

      const mockContext = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1200, height: 900 },
        viewport: { width: 1200, height: 900 },
        content: { width: 400, height: 300 },
        breakpoint: { name: 'desktop', width: 1200, height: 900 },
        dimension: 'width' as const,
      };

      const result = calculator.calculate(mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });

    it('should create functional position calculator', () => {
      const calculator = factory.createPositionUnit(
        'functional-test',
        'Functional Test',
        PositionUnit.PIXEL,
        Dimension.X,
        PositionValue.CENTER
      );

      const mockContext = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1200, height: 900 },
        viewport: { width: 1200, height: 900 },
        content: { width: 400, height: 300 },
        breakpoint: { name: 'desktop', width: 1200, height: 900 },
        dimension: 'width' as const,
      };

      const result = calculator.calculate(mockContext);
      expect(typeof result).toBe('number');
    });

    it('should create functional scale calculator', () => {
      const calculator = factory.createScaleUnit(
        'functional-test',
        'Functional Test',
        ScaleUnit.FACTOR,
        ScaleValue.FACTOR
      );

      const mockContext = {
        parent: { width: 800, height: 600, x: 0, y: 0 },
        scene: { width: 1200, height: 900 },
        viewport: { width: 1200, height: 900 },
        content: { width: 400, height: 300 },
        breakpoint: { name: 'desktop', width: 1200, height: 900 },
        dimension: 'width' as const,
      };

      const result = calculator.calculate(mockContext);
      expect(typeof result).toBe('number');
      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Factory Performance', () => {
    it('should create multiple calculators efficiently', () => {
      const calculators = [];
      const startTime = Date.now();

      for (let i = 0; i < 100; i++) {
        calculators.push(
          factory.createSizeUnit(
            `calculator-${i}`,
            `Calculator ${i}`,
            SizeUnit.PIXEL,
            Dimension.WIDTH,
            100
          )
        );
      }

      const endTime = Date.now();
      const duration = endTime - startTime;

      expect(calculators).toHaveLength(100);
      expect(calculators.every(calc => calc instanceof SizeUnitCalculator)).toBe(true);
      expect(duration).toBeLessThan(1000); // Should complete within 1 second
    });

    it('should create different types of calculators efficiently', () => {
      const sizeCalculator = factory.createSizeUnit(
        'size',
        'Size',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100
      );
      const positionCalculator = factory.createPositionUnit(
        'position',
        'Position',
        PositionUnit.PIXEL,
        Dimension.X,
        100
      );
      const scaleCalculator = factory.createScaleUnit('scale', 'Scale', ScaleUnit.FACTOR, 1.5);

      expect(sizeCalculator).toBeInstanceOf(SizeUnitCalculator);
      expect(positionCalculator).toBeInstanceOf(PositionUnitCalculator);
      expect(scaleCalculator).toBeInstanceOf(ScaleUnitCalculator);
    });
  });
});
