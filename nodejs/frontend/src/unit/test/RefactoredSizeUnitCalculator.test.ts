import { RefactoredSizeUnitCalculator } from '../classes/RefactoredSizeUnitCalculator';
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
import { Dimension } from '../enums/Dimension';
import { UnitType } from '../enums/UnitType';

describe('RefactoredSizeUnitCalculator', () => {
  let calculator: RefactoredSizeUnitCalculator;
  let strategyRegistry: SizeValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    strategyRegistry = new SizeValueCalculationStrategyRegistry();
    
    // Register all strategies
    strategyRegistry.registerStrategy(new PixelSizeValueCalculationStrategy());
    strategyRegistry.registerStrategy(new FillSizeValueCalculationStrategy());
    strategyRegistry.registerStrategy(new AutoSizeValueCalculationStrategy());
    strategyRegistry.registerStrategy(new ParentWidthSizeValueCalculationStrategy());
    strategyRegistry.registerStrategy(new ViewportWidthSizeValueCalculationStrategy());

    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
      content: { width: 200, height: 150 }
    };
  });

  describe('Constructor and Basic Properties', () => {
    it('should create calculator with correct properties', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        strategyRegistry
      );

      expect(calculator.id).toBe('test-id');
      expect(calculator.name).toBe('Test Calculator');
      expect(calculator.unitType).toBe(UnitType.SIZE);
      expect(calculator.sizeUnit).toBe(SizeUnit.PIXEL);
      expect(calculator.dimension).toBe(Dimension.WIDTH);
      expect(calculator.baseValue).toBe(100);
      expect(calculator.maintainAspectRatio).toBe(false);
      expect(calculator.isActive).toBe(true);
    });

    it('should create calculator with default strategy registry if not provided', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100
      );

      expect(calculator.getStrategyRegistry()).toBeDefined();
      expect(calculator.getStrategyRegistry()).toBeInstanceOf(SizeValueCalculationStrategyRegistry);
    });
  });

  describe('Numeric Value Calculations', () => {
    beforeEach(() => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        strategyRegistry
      );
    });

    it('should calculate numeric values directly', () => {
      const result = calculator.calculate(mockContext);
      expect(result).toBe(100);
    });

    it('should apply constraints to numeric values', () => {
      calculator.setSizeConstraints(50, 150);
      const result = calculator.calculate(mockContext);
      expect(result).toBe(100); // Within constraints

      calculator.setSizeConstraints(150, 200);
      const constrainedResult = calculator.calculate(mockContext);
      expect(constrainedResult).toBe(150); // Applied min constraint
    });

    it('should calculate width correctly', () => {
      const result = calculator.calculateWidth(mockContext);
      expect(result).toBe(100);
    });

    it('should throw error when calculating width for height-only dimension', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.HEIGHT,
        100,
        false,
        strategyRegistry
      );

      expect(() => calculator.calculateWidth(mockContext)).toThrow('Cannot calculate width for height-only dimension');
    });
  });

  describe('Strategy-Based Calculations', () => {
    it('should use FillSizeValueCalculationStrategy for FILL values', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        strategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(800); // parent.width (correct behavior)
    });

    it('should use AutoSizeValueCalculationStrategy for AUTO values', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.AUTO,
        false,
        strategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(200); // content.width
    });

    it('should use ParentWidthSizeValueCalculationStrategy for PARENT_WIDTH values', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        strategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(800); // parent.width
    });

    it('should use ViewportWidthSizeValueCalculationStrategy for VIEWPORT_WIDTH values', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.VIEWPORT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        strategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(1366); // viewport.width
    });

    it('should fallback to default when no strategy found', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.PIXEL, // This should not match any strategy
        false,
        strategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(100); // Default fallback value
    });
  });

  describe('Context Validation', () => {
    it('should validate context using strategy validation', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        strategyRegistry
      );

      // Valid context
      expect(calculator.validate(mockContext)).toBe(true);

      // Invalid context (no parent)
      const invalidContext = { ...mockContext, parent: undefined };
      expect(calculator.validate(invalidContext)).toBe(false);
    });

    it('should always validate numeric values', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        strategyRegistry
      );

      expect(calculator.validate(mockContext)).toBe(true);
      expect(calculator.validate({})).toBe(true);
    });

    it('should use basic validation when no strategy found', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.PIXEL, // No matching strategy
        false,
        strategyRegistry
      );

      // Should use basic validation
      expect(calculator.validate(mockContext)).toBe(true);
    });
  });

  describe('Responsive Behavior', () => {
    it('should identify responsive units correctly', () => {
      // Numeric value - not responsive
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        strategyRegistry
      );
      expect(calculator.isResponsive()).toBe(false);

      // SizeValue - responsive
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        strategyRegistry
      );
      expect(calculator.isResponsive()).toBe(true);
    });
  });

  describe('Constraints and Aspect Ratio', () => {
    beforeEach(() => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        strategyRegistry
      );
    });

    it('should handle size constraints correctly', () => {
      expect(calculator.hasConstraints()).toBe(false);
      expect(calculator.getMinSize()).toBeUndefined();
      expect(calculator.getMaxSize()).toBeUndefined();

      calculator.setSizeConstraints(50, 150);
      expect(calculator.hasConstraints()).toBe(true);
      expect(calculator.getMinSize()).toBe(50);
      expect(calculator.getMaxSize()).toBe(150);

      const constraintInfo = calculator.getConstraintInfo();
      expect(constraintInfo.min).toBe(50);
      expect(constraintInfo.max).toBe(150);
      expect(constraintInfo.hasConstraints).toBe(true);
    });

    it('should calculate aspect ratio when maintaining aspect ratio', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        true, // maintainAspectRatio = true
        strategyRegistry
      );

      // No constraints set
      expect(calculator.getAspectRatio()).toBeUndefined();

      // Set constraints
      calculator.setSizeConstraints(50, 150);
      expect(calculator.getAspectRatio()).toBe(3); // 150 / 50
    });
  });

  describe('Cloning', () => {
    beforeEach(() => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        strategyRegistry
      );
      calculator.setSizeConstraints(50, 150);
    });

    it('should clone calculator with all properties', () => {
      const cloned = calculator.clone();

      expect(cloned.id).toBe(calculator.id);
      expect(cloned.name).toBe(calculator.name);
      expect(cloned.sizeUnit).toBe(calculator.sizeUnit);
      expect(cloned.dimension).toBe(calculator.dimension);
      expect(cloned.baseValue).toBe(calculator.baseValue);
      expect(cloned.maintainAspectRatio).toBe(calculator.maintainAspectRatio);
      expect(cloned.getMinSize()).toBe(calculator.getMinSize());
      expect(cloned.getMaxSize()).toBe(calculator.getMaxSize());
    });

    it('should clone calculator with overrides', () => {
      const cloned = calculator.clone({
        id: 'new-id',
        name: 'New Calculator',
        baseValue: 200
      });

      expect(cloned.id).toBe('new-id');
      expect(cloned.name).toBe('New Calculator');
      expect(cloned.baseValue).toBe(200);
      expect(cloned.sizeUnit).toBe(calculator.sizeUnit); // Unchanged
      expect(cloned.getMinSize()).toBe(calculator.getMinSize()); // Constraints preserved
    });
  });

  describe('Strategy Registry Integration', () => {
    beforeEach(() => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        100,
        false,
        strategyRegistry
      );
    });

    it('should provide access to strategy registry', () => {
      const registry = calculator.getStrategyRegistry();
      expect(registry).toBe(strategyRegistry);
    });

    it('should provide available strategies', () => {
      const strategies = calculator.getAvailableStrategies();
      expect(strategies).toContain('pixel-size-calculation');
      expect(strategies).toContain('fill-size-calculation');
      expect(strategies).toContain('auto-size-calculation');
      expect(strategies).toContain('parent-width-size-calculation');
      expect(strategies).toContain('viewport-width-size-calculation');
    });

    it('should provide strategy statistics', () => {
      const stats = calculator.getStrategyStatistics();
      expect(stats.totalStrategies).toBe(5);
      expect(stats.strategiesBySizeValue).toBeDefined();
      expect(stats.strategiesBySizeUnit).toBeDefined();
      expect(stats.strategiesByDimension).toBeDefined();
    });
  });

  describe('Error Handling', () => {
    it('should handle missing context gracefully', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        strategyRegistry
      );

      const result = calculator.calculate({});
      expect(result).toBe(100); // Default fallback
    });

    it('should handle strategy validation failures gracefully', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        strategyRegistry
      );

      const contextWithoutParent = { ...mockContext, parent: undefined };
      const result = calculator.calculate(contextWithoutParent);
      expect(result).toBe(100); // Default fallback due to validation failure
    });
  });

  describe('Performance and Scalability', () => {
    it('should handle multiple calculations efficiently', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        strategyRegistry
      );

      const startTime = performance.now();
      
      // Perform multiple calculations
      for (let i = 0; i < 1000; i++) {
        calculator.calculate(mockContext);
      }
      
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // Should complete within reasonable time (adjust threshold as needed)
      expect(duration).toBeLessThan(10000); // 10 seconds
    });

    it('should maintain consistent results across multiple calls', () => {
      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PARENT_WIDTH,
        Dimension.WIDTH,
        SizeValue.FILL,
        false,
        strategyRegistry
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

  describe('SOLID Principles Compliance', () => {
    it('should demonstrate Open/Closed Principle compliance', () => {
      // We can add new strategies without modifying the calculator
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

      strategyRegistry.registerStrategy(new CustomSizeStrategy() as any);

      calculator = new RefactoredSizeUnitCalculator(
        'test-id',
        'Test Calculator',
        SizeUnit.PIXEL,
        Dimension.WIDTH,
        SizeValue.PIXEL,
        false,
        strategyRegistry
      );

      const result = calculator.calculate(mockContext);
      expect(result).toBe(999); // Custom strategy result
    });

    it('should demonstrate Single Responsibility Principle compliance', () => {
      // Calculator is responsible for calculation orchestration
      // Strategies are responsible for specific calculations
      expect(calculator.calculate).toBeDefined();
      expect(calculator.validate).toBeDefined();
      expect(calculator.getStrategyRegistry).toBeDefined();
    });

    it('should demonstrate Dependency Inversion Principle compliance', () => {
      // Calculator depends on strategy registry abstraction
      // Not on concrete strategy implementations
      const registry = calculator.getStrategyRegistry();
      expect(registry).toBeInstanceOf(SizeValueCalculationStrategyRegistry);
    });
  });
});
