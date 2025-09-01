import { RefactoredSizeUnitCalculator } from '../classes/RefactoredSizeUnitCalculator';
import { RefactoredPositionUnitCalculator } from '../classes/RefactoredPositionUnitCalculator';
import { RefactoredScaleUnitCalculator } from '../classes/RefactoredScaleUnitCalculator';
import { SizeValueCalculationStrategyRegistry } from '../strategies/value/SizeValueCalculationStrategyRegistry';
import { PositionValueCalculationStrategyRegistry } from '../strategies/value/PositionValueCalculationStrategyRegistry';
import { ScaleValueCalculationStrategyRegistry } from '../strategies/value/ScaleValueCalculationStrategyRegistry';
import {
  PixelSizeValueCalculationStrategy,
  FillSizeValueCalculationStrategy,
  AutoSizeValueCalculationStrategy,
  ParentWidthSizeValueCalculationStrategy,
  ViewportWidthSizeValueCalculationStrategy
} from '../strategies/value';
import {
  PixelPositionValueCalculationStrategy,
  CenterPositionValueCalculationStrategy,
  ContentLeftPositionValueCalculationStrategy,
  ParentCenterXPositionValueCalculationStrategy,
  SceneCenterXPositionValueCalculationStrategy
} from '../strategies/value';
import {
  PixelScaleValueCalculationStrategy,
  FactorScaleValueCalculationStrategy,
  ResponsiveScaleValueCalculationStrategy,
  RandomScaleValueCalculationStrategy,
  ContentScaleValueCalculationStrategy
} from '../strategies/value';
import { SizeValue } from '../enums/SizeValue';
import { SizeUnit } from '../enums/SizeUnit';
import { PositionValue } from '../enums/PositionValue';
import { PositionUnit } from '../enums/PositionUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { ScaleUnit } from '../enums/ScaleUnit';
import { Dimension } from '../enums/Dimension';

describe('Complete Calculator Refactoring', () => {
  let sizeStrategyRegistry: SizeValueCalculationStrategyRegistry;
  let positionStrategyRegistry: PositionValueCalculationStrategyRegistry;
  let scaleStrategyRegistry: ScaleValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    // Initialize strategy registries
    sizeStrategyRegistry = new SizeValueCalculationStrategyRegistry();
    positionStrategyRegistry = new PositionValueCalculationStrategyRegistry();
    scaleStrategyRegistry = new ScaleValueCalculationStrategyRegistry();
    
    // Register all size strategies
    sizeStrategyRegistry.registerStrategy(new PixelSizeValueCalculationStrategy());
    sizeStrategyRegistry.registerStrategy(new FillSizeValueCalculationStrategy());
    sizeStrategyRegistry.registerStrategy(new AutoSizeValueCalculationStrategy());
    sizeStrategyRegistry.registerStrategy(new ParentWidthSizeValueCalculationStrategy());
    sizeStrategyRegistry.registerStrategy(new ViewportWidthSizeValueCalculationStrategy());

    // Register all position strategies
    positionStrategyRegistry.registerStrategy(new PixelPositionValueCalculationStrategy());
    positionStrategyRegistry.registerStrategy(new CenterPositionValueCalculationStrategy());
    positionStrategyRegistry.registerStrategy(new ContentLeftPositionValueCalculationStrategy());
    positionStrategyRegistry.registerStrategy(new ParentCenterXPositionValueCalculationStrategy());
    positionStrategyRegistry.registerStrategy(new SceneCenterXPositionValueCalculationStrategy());

    // Register all scale strategies
    scaleStrategyRegistry.registerStrategy(new PixelScaleValueCalculationStrategy());
    scaleStrategyRegistry.registerStrategy(new FactorScaleValueCalculationStrategy());
    scaleStrategyRegistry.registerStrategy(new ResponsiveScaleValueCalculationStrategy());
    scaleStrategyRegistry.registerStrategy(new RandomScaleValueCalculationStrategy());
    scaleStrategyRegistry.registerStrategy(new ContentScaleValueCalculationStrategy());

    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
      content: { width: 200, height: 150 }
    };
  });

  describe('RefactoredSizeUnitCalculator', () => {
    let calculator: RefactoredSizeUnitCalculator;

    beforeEach(() => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-size-id',
        'Test Size Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        sizeStrategyRegistry
      );
    });

    it('should calculate numeric values correctly', () => {
      const result = calculator.calculate(mockContext);
      expect(result).toBe(100);
    });

    it('should use strategy for FILL values', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-size-id',
        'Test Size Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        sizeStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(800); // parent.width (correct behavior)
    });

    it('should provide strategy statistics', () => {
      const stats = calculator.getStrategyStatistics();
      expect(stats.totalStrategies).toBe(5);
      expect(stats.strategiesBySizeValue).toBeDefined();
      expect(stats.strategiesBySizeUnit).toBeDefined();
    });

    it('should validate context using strategies', () => {
      expect(calculator.validate(mockContext)).toBe(true);

      const invalidContext = { ...mockContext, parent: undefined };
      calculator = new RefactoredSizeUnitCalculator(
        'test-size-id',
        'Test Size Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        sizeStrategyRegistry
      );

      expect(calculator.validate(invalidContext)).toBe(false);
    });
  });

  describe('RefactoredPositionUnitCalculator', () => {
    let calculator: RefactoredPositionUnitCalculator;

    beforeEach(() => {
      calculator = new RefactoredPositionUnitCalculator(
        'test-position-id',
        'Test Position Calculator',
        PositionUnit.PIXEL,
        Dimension.X,
        100,
        positionStrategyRegistry
      );
    });

    it('should calculate numeric values with offset', () => {
      calculator.setOffset(50);
      const result = calculator.calculate(mockContext);
      expect(result).toBe(150); // 100 + 50 offset
    });

    it('should use strategy for CENTER values', () => {
      calculator = new RefactoredPositionUnitCalculator(
        'test-position-id',
        'Test Position Calculator',
        PositionUnit.PIXEL,
        Dimension.X,
        PositionValue.CENTER,
        positionStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(960); // scene.width / 2
    });

    it('should calculate both X and Y positions', () => {
      calculator = new RefactoredPositionUnitCalculator(
        'test-position-id',
        'Test Position Calculator',
        PositionUnit.PIXEL,
        Dimension.XY,
        100,
        positionStrategyRegistry
      );

      const result = calculator.calculateBoth(mockContext);
      expect(result.x).toBe(100);
      expect(result.y).toBe(100);
    });

    it('should provide position information', () => {
      calculator.setAlignment('center');
      calculator.setOffset(25);

      const info = calculator.getPositionInfo();
      expect(info.axis).toBe(Dimension.X);
      expect(info.alignment).toBe('center');
      expect(info.offset).toBe(25);
      expect(info.isResponsive).toBe(false);
    });

    it('should validate position bounds', () => {
      expect(calculator.isWithinBounds(100, mockContext)).toBe(true);
      expect(calculator.isWithinBounds(2000, mockContext)).toBe(false);
    });
  });

  describe('RefactoredScaleUnitCalculator', () => {
    let calculator: RefactoredScaleUnitCalculator;

    beforeEach(() => {
      calculator = new RefactoredScaleUnitCalculator(
        'test-scale-id',
        'Test Scale Calculator',
        ScaleUnit.FACTOR,
        1.5,
        false,
        scaleStrategyRegistry
      );
    });

    it('should calculate numeric values with constraints', () => {
      calculator.setScaleConstraints(1.0, 2.0);
      const result = calculator.calculate(mockContext);
      expect(result).toBe(1.5); // Within constraints
    });

    it('should apply min constraint', () => {
      calculator.setScaleConstraints(2.0, 3.0);
      const result = calculator.calculate(mockContext);
      expect(result).toBe(2.0); // Applied min constraint
    });

    it('should use strategy for FACTOR values', () => {
      calculator = new RefactoredScaleUnitCalculator(
        'test-scale-id',
        'Test Scale Calculator',
        ScaleUnit.FACTOR,
        ScaleValue.FACTOR,
        false,
        scaleStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(1.0); // Default factor value
    });

    it('should calculate both X and Y scales', () => {
      const result = calculator.calculateBoth(mockContext);
      expect(result.scaleX).toBe(1.5);
      expect(result.scaleY).toBe(1.5);
    });

    it('should provide scale information', () => {
      calculator.setUniformScaling(true);
      calculator.setScaleConstraints(1.0, 2.0);

      const info = calculator.getScaleInfo();
      expect(info.scaleUnit).toBe(ScaleUnit.FACTOR);
      expect(info.maintainAspectRatio).toBe(false);
      expect(info.uniformScaling).toBe(true);
      expect(info.hasConstraints).toBe(true);
      expect(info.isResponsive).toBe(false);
    });

    it('should calculate optimal scale', () => {
      const result = calculator.calculateOptimalScale(100, 100, 200, 150);
      expect(result).toBe(1.5); // 150 / 100 (min of scaleX and scaleY)
    });
  });

  describe('Cross-Calculator Integration', () => {
    it('should work together seamlessly', () => {
      const sizeCalculator = new RefactoredSizeUnitCalculator(
        'size-id',
        'Size Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        sizeStrategyRegistry
      );

      const positionCalculator = new RefactoredPositionUnitCalculator(
        'position-id',
        'Position Calculator',
        PositionUnit.PIXEL,
        Dimension.X,
        PositionValue.CENTER,
        positionStrategyRegistry
      );

      const scaleCalculator = new RefactoredScaleUnitCalculator(
        'scale-id',
        'Scale Calculator',
        ScaleUnit.FACTOR,
        1.5,
        false,
        scaleStrategyRegistry
      );

      // Calculate all values
      const size = sizeCalculator.calculate(mockContext);
      const position = positionCalculator.calculate(mockContext);
      const scale = scaleCalculator.calculate(mockContext);

      expect(size).toBe(800); // parent.width (correct behavior)
      expect(position).toBe(960); // scene.width / 2
      expect(scale).toBe(1.5); // factor value
    });

    it('should share strategy registries when needed', () => {
      // All calculators can use the same strategy registries
      const sizeCalculator = new RefactoredSizeUnitCalculator(
        'size-id',
        'Size Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        sizeStrategyRegistry
      );

      const positionCalculator = new RefactoredPositionUnitCalculator(
        'position-id',
        'Position Calculator',
        PositionUnit.PIXEL,
        Dimension.X,
        100,
        positionStrategyRegistry
      );

      const scaleCalculator = new RefactoredScaleUnitCalculator(
        'scale-id',
        'Scale Calculator',
        ScaleUnit.FACTOR,
        1.5,
        false,
        scaleStrategyRegistry
      );

      // All should work correctly
      expect(sizeCalculator.calculate(mockContext)).toBe(100);
      expect(positionCalculator.calculate(mockContext)).toBe(100);
      expect(scaleCalculator.calculate(mockContext)).toBe(1.5);
    });
  });

  describe('Performance and Scalability', () => {
    it('should handle multiple calculations efficiently', () => {
      const calculators = [];
      const iterations = 100;

      // Create multiple calculators
      for (let i = 0; i < 10; i++) {
        calculators.push(
          new RefactoredSizeUnitCalculator(
            `size-${i}`,
            `Size Calculator ${i}`,
            SizeUnit.PARENT_WIDTH,
            Dimension.WIDTH,
            SizeValue.FILL,
            false,
            sizeStrategyRegistry
          )
        );
      }

      const startTime = performance.now();
      
      // Perform calculations
      for (let i = 0; i < iterations; i++) {
        calculators.forEach(calc => calc.calculate(mockContext));
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should complete within reasonable time
      expect(duration).toBeLessThan(30000); // 30 seconds
    });

    it('should maintain consistent results across multiple calls', () => {
      const calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        sizeStrategyRegistry
      );

      const results = [];
      for (let i = 0; i < 10; i++) {
        results.push(calculator.calculate(mockContext));
      }

      // All results should be the same
      const firstResult = results[0];
      results.forEach(result => {
        expect(result).toBe(firstResult);
      });
    });
  });

  describe('Error Handling and Resilience', () => {
    it('should handle missing context gracefully', () => {
      const calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        sizeStrategyRegistry
      );

      const result = calculator.calculate({});
      expect(result).toBe(100); // Default fallback
    });

    it('should handle strategy validation failures gracefully', () => {
      const calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        sizeStrategyRegistry
      );

      const contextWithoutParent = { ...mockContext, parent: undefined };
      const result = calculator.calculate(contextWithoutParent);
      expect(result).toBe(100); // Default fallback due to validation failure
    });

    it('should handle unknown strategy values gracefully', () => {
      const calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.PIXEL, // This should not match any strategy
        false,
        sizeStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(100); // Default fallback
    });
  });

  describe('Strategy Registry Management', () => {
    it('should provide access to strategy registries', () => {
      const sizeCalculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        sizeStrategyRegistry
      );

      const positionCalculator = new RefactoredPositionUnitCalculator(
        'test-id',
        'Test Calculator',
        PositionUnit.PIXEL,
        Dimension.X,
        100,
        positionStrategyRegistry
      );

      const scaleCalculator = new RefactoredScaleUnitCalculator(
        'test-id',
        'Test Calculator',
        ScaleUnit.FACTOR,
        1.5,
        false,
        scaleStrategyRegistry
      );

      expect(sizeCalculator.getStrategyRegistry()).toBe(sizeStrategyRegistry);
      expect(positionCalculator.getStrategyRegistry()).toBe(positionStrategyRegistry);
      expect(scaleCalculator.getStrategyRegistry()).toBe(scaleStrategyRegistry);
    });

    it('should provide available strategies', () => {
      const sizeCalculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        sizeStrategyRegistry
      );

      const strategies = sizeCalculator.getAvailableStrategies();
      expect(strategies).toContain('pixel-size-calculation');
      expect(strategies).toContain('fill-size-calculation');
      expect(strategies).toContain('auto-size-calculation');
      expect(strategies).toContain('parent-width-size-calculation');
      expect(strategies).toContain('viewport-width-size-calculation');
    });
  });

  describe('SOLID Principles Compliance', () => {
    it('should demonstrate Open/Closed Principle compliance', () => {
      // We can add new strategies without modifying calculators
      class CustomSizeStrategy {
        readonly strategyId = 'custom-size-strategy';
        readonly sizeValue = SizeValue.PIXEL;
        readonly sizeUnit = SizeUnit.PIXEL;
        readonly dimension = Dimension.WIDTH;

        canHandle(_sizeValue: SizeValue, _sizeUnit: SizeUnit, _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH): boolean {
          return _sizeValue === SizeValue.PIXEL && _sizeUnit === SizeUnit.PIXEL;
        }

        calculate(_sizeValue: SizeValue, _sizeUnit: SizeUnit, _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH, _context: any): number {
          return 999; // Custom calculation
        }

        getPriority(): number {
          return 0; // Highest priority
        }

        validateContext(_context: any): boolean {
          return true;
        }

        getDescription(): string {
          return 'Custom size calculation strategy';
        }
      }

      sizeStrategyRegistry.registerStrategy(new CustomSizeStrategy() as any);

      const calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.PIXEL,
        false,
        sizeStrategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(999); // Custom strategy result
    });

    it('should demonstrate Single Responsibility Principle compliance', () => {
      // Each calculator is responsible for its own calculation orchestration
      // Strategies are responsible for specific calculations
      const sizeCalculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        sizeStrategyRegistry
      );

      expect(sizeCalculator.calculate).toBeDefined();
      expect(sizeCalculator.validate).toBeDefined();
      expect(sizeCalculator.getStrategyRegistry).toBeDefined();
    });

    it('should demonstrate Dependency Inversion Principle compliance', () => {
      // Calculators depend on strategy registry abstractions
      // Not on concrete strategy implementations
      const sizeCalculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        sizeStrategyRegistry
      );

      const registry = sizeCalculator.getStrategyRegistry();
      expect(registry).toBeInstanceOf(SizeValueCalculationStrategyRegistry);
    });
  });
});
