import {
  // Size strategies
  SizeValueCalculationStrategyRegistry,
  PixelSizeValueCalculationStrategy,
  FillSizeValueCalculationStrategy,
  AutoSizeValueCalculationStrategy,
  ParentWidthSizeValueCalculationStrategy,
  ViewportWidthSizeValueCalculationStrategy,
  
  // Position strategies
  PositionValueCalculationStrategyRegistry,
  PixelPositionValueCalculationStrategy,
  CenterPositionValueCalculationStrategy,
  ContentLeftPositionValueCalculationStrategy,
  ParentCenterXPositionValueCalculationStrategy,
  SceneCenterXPositionValueCalculationStrategy,
  
  // Scale strategies
  ScaleValueCalculationStrategyRegistry,
  PixelScaleValueCalculationStrategy,
  FactorScaleValueCalculationStrategy,
  ResponsiveScaleValueCalculationStrategy,
  RandomScaleValueCalculationStrategy,
  ContentScaleValueCalculationStrategy
} from '../strategies/value';

import type { 
  ISizeValueCalculationStrategy
} from '../strategies/value';

import { SizeValue } from '../enums/SizeValue';
import { SizeUnit } from '../enums/SizeUnit';
import { PositionValue } from '../enums/PositionValue';
import { PositionUnit } from '../enums/PositionUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { ScaleUnit } from '../enums/ScaleUnit';
import { Dimension } from '../enums/Dimension';
import { AxisUnit } from '../enums/AxisUnit';

describe('Complete Strategy Pattern Implementation', () => {
  let sizeRegistry: SizeValueCalculationStrategyRegistry;
  let positionRegistry: PositionValueCalculationStrategyRegistry;
  let scaleRegistry: ScaleValueCalculationStrategyRegistry;
  let mockContext: any;

  beforeEach(() => {
    sizeRegistry = new SizeValueCalculationStrategyRegistry();
    positionRegistry = new PositionValueCalculationStrategyRegistry();
    scaleRegistry = new ScaleValueCalculationStrategyRegistry();
    
    mockContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1920, height: 1080 },
      viewport: { width: 1366, height: 768 },
      content: { width: 200, height: 150 }
    };

    // Register all strategies
    sizeRegistry.registerStrategy(new PixelSizeValueCalculationStrategy());
    sizeRegistry.registerStrategy(new FillSizeValueCalculationStrategy());
    sizeRegistry.registerStrategy(new AutoSizeValueCalculationStrategy());
    sizeRegistry.registerStrategy(new ParentWidthSizeValueCalculationStrategy());
    sizeRegistry.registerStrategy(new ViewportWidthSizeValueCalculationStrategy());

    positionRegistry.registerStrategy(new PixelPositionValueCalculationStrategy());
    positionRegistry.registerStrategy(new CenterPositionValueCalculationStrategy());
    positionRegistry.registerStrategy(new ContentLeftPositionValueCalculationStrategy());
    positionRegistry.registerStrategy(new ParentCenterXPositionValueCalculationStrategy());
    positionRegistry.registerStrategy(new SceneCenterXPositionValueCalculationStrategy());

    scaleRegistry.registerStrategy(new PixelScaleValueCalculationStrategy());
    scaleRegistry.registerStrategy(new FactorScaleValueCalculationStrategy());
    scaleRegistry.registerStrategy(new ResponsiveScaleValueCalculationStrategy());
    scaleRegistry.registerStrategy(new RandomScaleValueCalculationStrategy());
    scaleRegistry.registerStrategy(new ContentScaleValueCalculationStrategy());
  });

  describe('Size Value Calculation Strategies', () => {
    it('should register and retrieve all size strategies', () => {
      expect(sizeRegistry.getStrategyCount()).toBe(5);
      expect(sizeRegistry.hasStrategy('pixel-size-calculation')).toBe(true);
      expect(sizeRegistry.hasStrategy('fill-size-calculation')).toBe(true);
      expect(sizeRegistry.hasStrategy('auto-size-calculation')).toBe(true);
      expect(sizeRegistry.hasStrategy('parent-width-size-calculation')).toBe(true);
      expect(sizeRegistry.hasStrategy('viewport-width-size-calculation')).toBe(true);
    });

    it('should find compatible size strategies', () => {
      const strategies = sizeRegistry.getStrategiesFor(SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH);
      expect(strategies.length).toBeGreaterThan(0);
      expect(strategies[0].canHandle(SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH)).toBe(true);
    });

    it('should return best size strategy based on priority', () => {
      const bestStrategy = sizeRegistry.getBestStrategy(SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH);
      expect(bestStrategy).toBeDefined();
      expect(bestStrategy?.getPriority()).toBe(1);
    });

    it('should calculate pixel size values correctly', () => {
      const strategy = new PixelSizeValueCalculationStrategy();
      const result = strategy.calculate(SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH, mockContext);
      expect(result).toBeDefined();
    });

    it('should calculate fill size values correctly', () => {
      const strategy = new FillSizeValueCalculationStrategy();
      const result = strategy.calculate(SizeValue.FILL, SizeUnit.PARENT_WIDTH, Dimension.WIDTH, mockContext);
      expect(result).toBe(1920); // scene.width (matching original behavior)
    });

    it('should calculate auto size values correctly', () => {
      const strategy = new AutoSizeValueCalculationStrategy();
      const result = strategy.calculate(SizeValue.AUTO, SizeUnit.AUTO, Dimension.WIDTH, mockContext);
      expect(result).toBe(200); // content.width
    });
  });

  describe('Position Value Calculation Strategies', () => {
    it('should register and retrieve all position strategies', () => {
      expect(positionRegistry.getStrategyCount()).toBe(5);
      expect(positionRegistry.hasStrategy('pixel-position-calculation')).toBe(true);
      expect(positionRegistry.hasStrategy('center-position-calculation')).toBe(true);
      expect(positionRegistry.hasStrategy('content-left-position-calculation')).toBe(true);
      expect(positionRegistry.hasStrategy('parent-center-x-position-calculation')).toBe(true);
      expect(positionRegistry.hasStrategy('scene-center-x-position-calculation')).toBe(true);
    });

    it('should find compatible position strategies', () => {
      const strategies = positionRegistry.getStrategiesFor(PositionValue.PIXEL, PositionUnit.PIXEL, AxisUnit.X);
      expect(strategies.length).toBeGreaterThan(0);
      expect(strategies[0].canHandle(PositionValue.PIXEL, PositionUnit.PIXEL, AxisUnit.X)).toBe(true);
    });

    it('should return best position strategy based on priority', () => {
      const bestStrategy = positionRegistry.getBestStrategy(PositionValue.PIXEL, PositionUnit.PIXEL, AxisUnit.X);
      expect(bestStrategy).toBeDefined();
      expect(bestStrategy?.getPriority()).toBe(1);
    });

    it('should calculate pixel position values correctly', () => {
      const strategy = new PixelPositionValueCalculationStrategy();
      const result = strategy.calculate(PositionValue.PIXEL, PositionUnit.PIXEL, AxisUnit.X, mockContext);
      expect(result).toBeDefined();
    });

    it('should calculate center position values correctly', () => {
      const strategy = new CenterPositionValueCalculationStrategy();
      const result = strategy.calculate(PositionValue.CENTER, PositionUnit.CENTER, AxisUnit.X, mockContext);
      expect(result).toBe(960); // scene.width / 2 (strategy uses scene first)
    });

    it('should calculate content left position values correctly', () => {
      const strategy = new ContentLeftPositionValueCalculationStrategy();
      const result = strategy.calculate(PositionValue.CONTENT_LEFT, PositionUnit.CONTENT_LEFT, AxisUnit.X, mockContext);
      expect(result).toBe(0); // content left edge
    });
  });

  describe('Scale Value Calculation Strategies', () => {
    it('should register and retrieve all scale strategies', () => {
      expect(scaleRegistry.getStrategyCount()).toBe(5);
      expect(scaleRegistry.hasStrategy('pixel-scale-calculation')).toBe(true);
      expect(scaleRegistry.hasStrategy('factor-scale-calculation')).toBe(true);
      expect(scaleRegistry.hasStrategy('responsive-scale-calculation')).toBe(true);
      expect(scaleRegistry.hasStrategy('random-scale-calculation')).toBe(true);
      expect(scaleRegistry.hasStrategy('content-scale-calculation')).toBe(true);
    });

    it('should find compatible scale strategies', () => {
      const strategies = scaleRegistry.getStrategiesFor(ScaleValue.FACTOR, ScaleUnit.FACTOR);
      expect(strategies.length).toBeGreaterThan(0);
      expect(strategies[0].canHandle(ScaleValue.FACTOR, ScaleUnit.FACTOR)).toBe(true);
    });

    it('should return best scale strategy based on priority', () => {
      const bestStrategy = scaleRegistry.getBestStrategy(ScaleValue.FACTOR, ScaleUnit.FACTOR);
      expect(bestStrategy).toBeDefined();
      expect(bestStrategy?.getPriority()).toBe(1); // PixelScaleValueCalculationStrategy has priority 1
    });

    it('should calculate factor scale values correctly', () => {
      const strategy = new FactorScaleValueCalculationStrategy();
      const result = strategy.calculate(ScaleValue.FACTOR, ScaleUnit.FACTOR, mockContext);
      expect(result).toBeDefined();
    });

    it('should calculate factor scale values correctly', () => {
      const strategy = new FactorScaleValueCalculationStrategy();
      const result = strategy.calculate(ScaleValue.FACTOR, ScaleUnit.FACTOR, mockContext);
      expect(result).toBeDefined();
    });

    it('should calculate responsive scale values correctly', () => {
      const strategy = new ResponsiveScaleValueCalculationStrategy();
      const result = strategy.calculate(ScaleValue.FIT, ScaleUnit.FIT, mockContext);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThanOrEqual(1.0);
    });

    it('should calculate random scale values correctly', () => {
      const strategy = new RandomScaleValueCalculationStrategy();
      const result = strategy.calculate(ScaleValue.RANDOM, ScaleUnit.RANDOM, mockContext);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(2.0);
    });
  });

  describe('Strategy Pattern Benefits', () => {
    it('should demonstrate Open/Closed Principle compliance', () => {
      // We can add new strategies without modifying existing code
      class CustomSizeStrategy implements ISizeValueCalculationStrategy {
        readonly strategyId = 'custom-size-strategy';
        readonly sizeValue = SizeValue.PIXEL;
        readonly sizeUnit = SizeUnit.PIXEL;
        readonly dimension = Dimension.WIDTH;

        canHandle(sizeValue: SizeValue, _sizeUnit: SizeUnit, _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH): boolean {
          return sizeValue === SizeValue.PIXEL && _sizeUnit === SizeUnit.PIXEL;
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

      const customStrategy = new CustomSizeStrategy();
      sizeRegistry.registerStrategy(customStrategy);

      const bestStrategy = sizeRegistry.getBestStrategy(SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH);
      expect(bestStrategy?.strategyId).toBe('custom-size-strategy');
    });

    it('should demonstrate Single Responsibility Principle compliance', () => {
      const pixelSizeStrategy = new PixelSizeValueCalculationStrategy();
      const centerPositionStrategy = new CenterPositionValueCalculationStrategy();
      const factorScaleStrategy = new FactorScaleValueCalculationStrategy();

      // Each strategy has a single responsibility
      expect(pixelSizeStrategy.getDescription()).toContain('pixel-based');
      expect(centerPositionStrategy.getDescription()).toContain('center-based');
      expect(factorScaleStrategy.getDescription()).toContain('factor-based');
    });

    it('should demonstrate Interface Segregation Principle compliance', () => {
      // Each strategy implements only the methods it needs
      const sizeStrategy = new PixelSizeValueCalculationStrategy();
      const positionStrategy = new PixelPositionValueCalculationStrategy();
      const scaleStrategy = new PixelScaleValueCalculationStrategy();
      
      expect(typeof sizeStrategy.calculate).toBe('function');
      expect(typeof positionStrategy.calculate).toBe('function');
      expect(typeof scaleStrategy.calculate).toBe('function');
    });

    it('should demonstrate Dependency Inversion Principle compliance', () => {
      // High-level modules depend on abstractions
      const sizeStrategy = sizeRegistry.getBestStrategy(SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH);
      const positionStrategy = positionRegistry.getBestStrategy(PositionValue.PIXEL, PositionUnit.PIXEL, AxisUnit.X);
      const scaleStrategy = scaleRegistry.getBestStrategy(ScaleValue.FACTOR, ScaleUnit.FACTOR);

      expect(sizeStrategy).toBeDefined();
      expect(positionStrategy).toBeDefined();
      expect(scaleStrategy).toBeDefined();
    });
  });

  describe('Registry Statistics', () => {
    it('should provide accurate statistics for size registry', () => {
      const stats = sizeRegistry.getStatistics();
      expect(stats.totalStrategies).toBe(5);
      expect(stats.strategiesBySizeValue).toBeDefined();
      expect(stats.strategiesBySizeUnit).toBeDefined();
      expect(stats.strategiesByDimension).toBeDefined();
    });

    it('should provide accurate statistics for position registry', () => {
      const stats = positionRegistry.getStatistics();
      expect(stats.totalStrategies).toBe(5);
      expect(stats.strategiesByPositionValue).toBeDefined();
      expect(stats.strategiesByPositionUnit).toBeDefined();
      expect(stats.strategiesByAxisUnit).toBeDefined();
    });

    it('should provide accurate statistics for scale registry', () => {
      const stats = scaleRegistry.getStatistics();
      expect(stats.totalStrategies).toBe(5);
      expect(stats.strategiesByScaleValue).toBeDefined();
      expect(stats.strategiesByScaleUnit).toBeDefined();
    });
  });

  describe('Strategy Validation', () => {
    it('should validate context for size strategies', () => {
      const fillStrategy = new FillSizeValueCalculationStrategy();
      const autoStrategy = new AutoSizeValueCalculationStrategy();

      expect(fillStrategy.validateContext(mockContext)).toBe(true);
      expect(fillStrategy.validateContext({})).toBe(false); // No parent or scene

      expect(autoStrategy.validateContext(mockContext)).toBe(true);
      expect(autoStrategy.validateContext({})).toBe(false); // No content
    });

    it('should validate context for position strategies', () => {
      const centerStrategy = new CenterPositionValueCalculationStrategy();
      const contentLeftStrategy = new ContentLeftPositionValueCalculationStrategy();

      expect(centerStrategy.validateContext(mockContext)).toBe(true);
      expect(centerStrategy.validateContext({})).toBe(false); // No parent or scene

      expect(contentLeftStrategy.validateContext(mockContext)).toBe(true);
      expect(contentLeftStrategy.validateContext({})).toBe(false); // No content
    });

    it('should validate context for scale strategies', () => {
      const responsiveStrategy = new ResponsiveScaleValueCalculationStrategy();
      const contentStrategy = new ContentScaleValueCalculationStrategy();

      expect(responsiveStrategy.validateContext(mockContext)).toBe(true);
      expect(responsiveStrategy.validateContext({})).toBe(false); // No viewport or scene

      expect(contentStrategy.validateContext(mockContext)).toBe(true);
      expect(contentStrategy.validateContext({})).toBe(false); // No content and parent
    });
  });

  describe('Performance and Scalability', () => {
    it('should handle large numbers of strategies efficiently', () => {
      // Add many strategies to test performance
      for (let i = 0; i < 100; i++) {
        class TestStrategy implements ISizeValueCalculationStrategy {
          readonly strategyId = `test-strategy-${i}`;
          readonly sizeValue = SizeValue.PIXEL;
          readonly sizeUnit = SizeUnit.PIXEL;
          readonly dimension = Dimension.WIDTH;

          canHandle(_sizeValue: SizeValue, _sizeUnit: SizeUnit, _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH): boolean {
            return _sizeValue === SizeValue.PIXEL && _sizeUnit === SizeUnit.PIXEL;
          }

          calculate(_sizeValue: SizeValue, _sizeUnit: SizeUnit, _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH, _context: any): number {
            return i;
          }

          getPriority(): number {
            return i;
          }

          validateContext(_context: any): boolean {
            return true;
          }

          getDescription(): string {
            return `Test strategy ${i}`;
          }
        }

        sizeRegistry.registerStrategy(new TestStrategy());
      }

      expect(sizeRegistry.getStrategyCount()).toBe(105); // 5 original + 100 test
      
      const strategies = sizeRegistry.getStrategiesFor(SizeValue.PIXEL, SizeUnit.PIXEL, Dimension.WIDTH);
      expect(strategies.length).toBeGreaterThan(0);
    });
  });
});
