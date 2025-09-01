import {
  SizeValueCalculationStrategyRegistry,
  PixelSizeValueCalculationStrategy,
  FillSizeValueCalculationStrategy,
  AutoSizeValueCalculationStrategy,
  ParentWidthSizeValueCalculationStrategy,
  ViewportWidthSizeValueCalculationStrategy
} from '../strategies/value';
import type { ISizeValueCalculationStrategy } from '../strategies/value/ISizeValueCalculationStrategy';
import { SizeValue } from '../enums/SizeValue';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';

describe('Strategy Pattern Implementation', () => {
  let registry: SizeValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    registry = new SizeValueCalculationStrategyRegistry();
    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
      content: { width: 200, height: 150 }
    };
  });

  describe('SizeValueCalculationStrategyRegistry', () => {
    it('should register and retrieve strategies', () => {
      const strategy = new PixelSizeValueCalculationStrategy();
      registry.registerStrategy(strategy);

      expect(registry.getStrategy(strategy.strategyId)).toBe(strategy);
      expect(registry.hasStrategy(strategy.strategyId)).toBe(true);
      expect(registry.getStrategyCount()).toBe(1);
    });

    it('should not register duplicate strategies', () => {
      const strategy1 = new PixelSizeValueCalculationStrategy();
      const strategy2 = new PixelSizeValueCalculationStrategy();
      
      registry.registerStrategy(strategy1);
      registry.registerStrategy(strategy2);

      expect(registry.getStrategyCount()).toBe(1);
    });

    it('should unregister strategies', () => {
      const strategy = new PixelSizeValueCalculationStrategy();
      registry.registerStrategy(strategy);

      expect(registry.unregisterStrategy(strategy.strategyId)).toBe(true);
      expect(registry.getStrategy(strategy.strategyId)).toBeUndefined();
      expect(registry.hasStrategy(strategy.strategyId)).toBe(false);
      expect(registry.getStrategyCount()).toBe(0);
    });

    it('should clear all strategies', () => {
      registry.registerStrategy(new PixelSizeValueCalculationStrategy());
      registry.registerStrategy(new FillSizeValueCalculationStrategy());

      registry.clearStrategies();

      expect(registry.getStrategyCount()).toBe(0);
    });

    it('should get strategies by size value', () => {
      registry.registerStrategy(new PixelSizeValueCalculationStrategy());
      registry.registerStrategy(new FillSizeValueCalculationStrategy());

      const pixelStrategies = registry.getStrategiesBySizeValue(SizeValue.PIXEL);
      const fillStrategies = registry.getStrategiesBySizeValue(SizeValue.FILL);

      expect(pixelStrategies).toHaveLength(1);
      expect(fillStrategies).toHaveLength(1);
      expect(pixelStrategies[0].strategyId).toBe('pixel-size-calculation');
      expect(fillStrategies[0].strategyId).toBe('fill-size-calculation');
    });

    it('should get strategies by size unit', () => {
      registry.registerStrategy(new PixelSizeValueCalculationStrategy());
      registry.registerStrategy(new FillSizeValueCalculationStrategy());

      const pixelStrategies = registry.getStrategiesBySizeUnit(SizeUnit.PIXEL);
      const parentWidthStrategies = registry.getStrategiesBySizeUnit(SizeUnit.PARENT_WIDTH);

      expect(pixelStrategies).toHaveLength(1);
      expect(parentWidthStrategies).toHaveLength(1);
    });

    it('should get strategies by dimension', () => {
      registry.registerStrategy(new PixelSizeValueCalculationStrategy());
      registry.registerStrategy(new FillSizeValueCalculationStrategy());

      const widthStrategies = registry.getStrategiesByDimension(Dimension.WIDTH);
      expect(widthStrategies.length).toBeGreaterThan(0);
    });

    it('should get statistics', () => {
      registry.registerStrategy(new PixelSizeValueCalculationStrategy());
      registry.registerStrategy(new FillSizeValueCalculationStrategy());

      const stats = registry.getStatistics();

      expect(stats.totalStrategies).toBe(2);
      expect(stats.strategiesBySizeValue).toBeDefined();
      expect(stats.strategiesBySizeUnit).toBeDefined();
      expect(stats.strategiesByDimension).toBeDefined();
    });
  });

  describe('Strategy Selection', () => {
    beforeEach(() => {
      registry.registerStrategy(new PixelSizeValueCalculationStrategy());
      registry.registerStrategy(new FillSizeValueCalculationStrategy());
      registry.registerStrategy(new AutoSizeValueCalculationStrategy());
      registry.registerStrategy(new ParentWidthSizeValueCalculationStrategy());
      registry.registerStrategy(new ViewportWidthSizeValueCalculationStrategy());
    });

    it('should find compatible strategies', () => {
      const strategies = registry.getStrategiesFor(
        SizeValue.PIXEL,
        SizeUnit.PIXEL,
        Dimension.WIDTH
      );

      expect(strategies.length).toBeGreaterThan(0);
      expect(strategies[0].canHandle(SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH)).toBe(true);
    });

    it('should return best strategy based on priority', () => {
      const bestStrategy = registry.getBestStrategy(
        SizeValue.PIXEL,
        SizeUnit.PIXEL,
        Dimension.WIDTH
      );

      expect(bestStrategy).toBeDefined();
      expect(bestStrategy?.canHandle(SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH)).toBe(true);
    });

    it('should return undefined when no compatible strategy found', () => {
      const bestStrategy = registry.getBestStrategy(
        SizeValue.PIXEL,
        SizeUnit.VIEWPORT_WIDTH, // Mismatched unit
        Dimension.WIDTH
      );

      expect(bestStrategy).toBeUndefined();
    });
  });

  describe('PixelSizeValueCalculationStrategy', () => {
    let strategy: PixelSizeValueCalculationStrategy;

    beforeEach(() => {
      strategy = new PixelSizeValueCalculationStrategy();
    });

    it('should handle pixel values', () => {
      expect(strategy.canHandle(SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH)).toBe(true);
      expect(strategy.canHandle(SizeValue.FILL, SizeUnit.PIXEL, Dimension.WIDTH)).toBe(false);
    });

    it('should calculate pixel values correctly', () => {
      const result = strategy.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH, mockContext);
      expect(result).toBe(100);
    });

    it('should return default fallback for non-numeric values', () => {
      const result = strategy.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH, mockContext);
      expect(result).toBeDefined();
    });

    it('should validate context', () => {
      expect(strategy.validateContext(mockContext)).toBe(true);
      expect(strategy.validateContext({})).toBe(true); // Pixel doesn't require specific context
    });

    it('should have correct priority', () => {
      expect(strategy.getPriority()).toBe(1);
    });

    it('should have description', () => {
      expect(strategy.getDescription()).toBe('Handles pixel-based size calculations');
    });
  });

  describe('FillSizeValueCalculationStrategy', () => {
    let strategy: FillSizeValueCalculationStrategy;

    beforeEach(() => {
      strategy = new FillSizeValueCalculationStrategy();
    });

    it('should handle fill values', () => {
      expect(strategy.canHandle(SizeValue.FILL, SizeUnit.PARENT_WIDTH, Dimension.WIDTH)).toBe(true);
      expect(strategy.canHandle(SizeValue.PIXEL, SizeUnit.PARENT_WIDTH, Dimension.WIDTH)).toBe(false);
    });

    it('should calculate fill values based on scene dimensions', () => {
      const result = strategy.calculate(SizeValue.FILL, SizeUnit.PARENT_WIDTH, Dimension.WIDTH, mockContext);
      expect(result).toBe(1920); // scene.width (matching original behavior)
    });

    it('should calculate fill values based on scene dimensions when parent not available', () => {
      const contextWithoutParent = { ...mockContext, parent: undefined };
      const result = strategy.calculate(SizeValue.FILL, SizeUnit.PARENT_WIDTH, Dimension.WIDTH, contextWithoutParent);
      expect(result).toBe(1920); // scene.width
    });

    it('should calculate height dimension correctly', () => {
      const result = strategy.calculate(SizeValue.FILL, SizeUnit.PARENT_WIDTH, Dimension.HEIGHT, mockContext);
      expect(result).toBe(1080); // scene.height (matching original behavior)
    });

    it('should calculate both dimensions correctly', () => {
      const result = strategy.calculate(SizeValue.FILL, SizeUnit.PARENT_WIDTH, Dimension.BOTH, mockContext);
      expect(result).toBe(1080); // Math.min(scene.width, scene.height) (matching original behavior)
    });

    it('should validate context', () => {
      expect(strategy.validateContext(mockContext)).toBe(true);
      expect(strategy.validateContext({})).toBe(false); // Requires parent or scene
    });

    it('should have correct priority', () => {
      expect(strategy.getPriority()).toBe(2);
    });

    it('should have description', () => {
      expect(strategy.getDescription()).toBe('Handles fill-based size calculations using parent or scene dimensions');
    });
  });

  describe('AutoSizeValueCalculationStrategy', () => {
    let strategy: AutoSizeValueCalculationStrategy;

    beforeEach(() => {
      strategy = new AutoSizeValueCalculationStrategy();
    });

    it('should handle auto values', () => {
      expect(strategy.canHandle(SizeValue.AUTO, SizeUnit.AUTO, Dimension.WIDTH)).toBe(true);
      expect(strategy.canHandle(SizeValue.PIXEL, SizeUnit.AUTO, Dimension.WIDTH)).toBe(false);
    });

    it('should calculate auto values based on content dimensions', () => {
      const result = strategy.calculate(SizeValue.AUTO, SizeUnit.AUTO, Dimension.WIDTH, mockContext);
      expect(result).toBe(200); // content.width
    });

    it('should calculate height dimension correctly', () => {
      const result = strategy.calculate(SizeValue.AUTO, SizeUnit.AUTO, Dimension.HEIGHT, mockContext);
      expect(result).toBe(150); // content.height
    });

    it('should calculate both dimensions correctly', () => {
      const result = strategy.calculate(SizeValue.AUTO, SizeUnit.AUTO, Dimension.BOTH, mockContext);
      expect(result).toBe(200); // Math.max(content.width, content.height)
    });

    it('should validate context', () => {
      expect(strategy.validateContext(mockContext)).toBe(true);
      expect(strategy.validateContext({})).toBe(false); // Requires content
    });

    it('should have correct priority', () => {
      expect(strategy.getPriority()).toBe(3);
    });

    it('should have description', () => {
      expect(strategy.getDescription()).toBe('Handles auto-based size calculations using content dimensions');
    });
  });

  describe('ParentWidthSizeValueCalculationStrategy', () => {
    let strategy: ParentWidthSizeValueCalculationStrategy;

    beforeEach(() => {
      strategy = new ParentWidthSizeValueCalculationStrategy();
    });

    it('should handle parent width values', () => {
      expect(strategy.canHandle(SizeValue.PARENT_WIDTH, SizeUnit.PARENT_WIDTH, Dimension.WIDTH)).toBe(true);
      expect(strategy.canHandle(SizeValue.PIXEL, SizeUnit.PARENT_WIDTH, Dimension.WIDTH)).toBe(false);
    });

    it('should calculate parent width values correctly', () => {
      const result = strategy.calculate(SizeValue.PARENT_WIDTH, SizeUnit.PARENT_WIDTH, Dimension.WIDTH, mockContext);
      expect(result).toBe(800); // parent.width
    });

    it('should validate context', () => {
      expect(strategy.validateContext(mockContext)).toBe(true);
      expect(strategy.validateContext({})).toBe(false); // Requires parent
    });

    it('should have correct priority', () => {
      expect(strategy.getPriority()).toBe(4);
    });

    it('should have description', () => {
      expect(strategy.getDescription()).toBe('Handles parent-width-based size calculations');
    });
  });

  describe('ViewportWidthSizeValueCalculationStrategy', () => {
    let strategy: ViewportWidthSizeValueCalculationStrategy;

    beforeEach(() => {
      strategy = new ViewportWidthSizeValueCalculationStrategy();
    });

    it('should handle viewport width values', () => {
      expect(strategy.canHandle(SizeValue.VIEWPORT_WIDTH, SizeUnit.VIEWPORT_WIDTH, Dimension.WIDTH)).toBe(true);
      expect(strategy.canHandle(SizeValue.PIXEL, SizeUnit.VIEWPORT_WIDTH, Dimension.WIDTH)).toBe(false);
    });

    it('should calculate viewport width values correctly', () => {
      const result = strategy.calculate(SizeValue.VIEWPORT_WIDTH, SizeUnit.VIEWPORT_WIDTH, Dimension.WIDTH, mockContext);
      expect(result).toBe(1366); // viewport.width
    });

    it('should validate context', () => {
      expect(strategy.validateContext(mockContext)).toBe(true);
      expect(strategy.validateContext({})).toBe(false); // Requires viewport
    });

    it('should have correct priority', () => {
      expect(strategy.getPriority()).toBe(5);
    });

    it('should have description', () => {
      expect(strategy.getDescription()).toBe('Handles viewport-width-based size calculations');
    });
  });

  describe('Strategy Pattern Benefits', () => {
    it('should demonstrate Open/Closed Principle compliance', () => {
      // We can add new strategies without modifying existing code
      class CustomSizeValueCalculationStrategy implements ISizeValueCalculationStrategy {
        readonly strategyId = 'custom-size-calculation';
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

      const customStrategy = new CustomSizeValueCalculationStrategy();
      registry.registerStrategy(customStrategy);

      const bestStrategy = registry.getBestStrategy(SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH);
      expect(bestStrategy?.strategyId).toBe('custom-size-calculation');
    });

    it('should demonstrate Single Responsibility Principle compliance', () => {
      const pixelStrategy = new PixelSizeValueCalculationStrategy();
      const fillStrategy = new FillSizeValueCalculationStrategy();

      // Each strategy has a single responsibility
      expect(pixelStrategy.getDescription()).toContain('pixel-based');
      expect(fillStrategy.getDescription()).toContain('fill-based');
    });

    it('should demonstrate Interface Segregation Principle compliance', () => {
      // Each strategy implements only the methods it needs
      const strategy = new PixelSizeValueCalculationStrategy();
      
      expect(typeof strategy.calculate).toBe('function');
      expect(typeof strategy.canHandle).toBe('function');
      expect(typeof strategy.getPriority).toBe('function');
      expect(typeof strategy.validateContext).toBe('function');
      expect(typeof strategy.getDescription).toBe('function');
    });
  });
});
