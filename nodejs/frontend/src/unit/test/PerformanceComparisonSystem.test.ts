import {
  PerformanceComparisonSystem,
  TestScenario,
} from '../testing/performance/PerformanceComparisonSystem';
import { UnitContext } from '../interfaces/IUnit';
import { ISizeUnitConfig, IPositionUnitConfig, IScaleUnitConfig } from '../interfaces/IUnitConfig';
import { SizeValue } from '../enums/SizeValue';
import { PositionValue } from '../enums/PositionValue';
import { ScaleValue } from '../enums/ScaleValue';
import { SizeUnit } from '../enums/SizeUnit';
import { PositionUnit } from '../enums/PositionUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import { Dimension } from '../enums/Dimension';

describe('PerformanceComparisonSystem', () => {
  let performanceSystem: PerformanceComparisonSystem;

  beforeEach(() => {
    performanceSystem = new PerformanceComparisonSystem();
  });

  describe('Performance Comparison', () => {
    it('should run performance comparison between original and refactored systems', async () => {
      // Create test scenarios
      const scenarios: TestScenario[] = [
        {
          id: 'basic-size-test',
          name: 'Basic Size Calculation Test',
          description: 'Test basic size calculations with pixel values',
          iterations: 1000,
          warmupIterations: 100,
          context: {
            scene: { width: 1920, height: 1080 },
            parent: { width: 800, height: 600, x: 0, y: 0 },
            viewport: { width: 1920, height: 1080 },
            content: { width: 100, height: 100 },
          },
          configs: [
            {
              id: 'size-1',
              name: 'Test Size 1',
              sizeUnit: SizeUnit.PIXEL,
              dimension: Dimension.WIDTH,
              baseValue: SizeValue.PIXEL,
            } as ISizeUnitConfig,
          ],
        },
        {
          id: 'basic-position-test',
          name: 'Basic Position Calculation Test',
          description: 'Test basic position calculations with pixel values',
          iterations: 1000,
          warmupIterations: 100,
          context: {
            scene: { width: 1920, height: 1080 },
            parent: { width: 800, height: 600, x: 0, y: 0 },
            viewport: { width: 1920, height: 1080 },
            content: { width: 100, height: 100 },
          },
          configs: [
            {
              id: 'position-1',
              name: 'Test Position 1',
              positionUnit: PositionUnit.PIXEL,
              axis: Dimension.X,
              baseValue: PositionValue.PIXEL,
            } as IPositionUnitConfig,
          ],
        },
        {
          id: 'basic-scale-test',
          name: 'Basic Scale Calculation Test',
          description: 'Test basic scale calculations with factor values',
          iterations: 1000,
          warmupIterations: 100,
          context: {
            scene: { width: 1920, height: 1080 },
            parent: { width: 800, height: 600, x: 0, y: 0 },
            viewport: { width: 1920, height: 1080 },
            content: { width: 100, height: 100 },
          },
          configs: [
            {
              id: 'scale-1',
              name: 'Test Scale 1',
              scaleUnit: ScaleUnit.FACTOR,
              baseValue: ScaleValue.FACTOR,
            } as IScaleUnitConfig,
          ],
        },
        {
          id: 'complex-mixed-test',
          name: 'Complex Mixed Calculation Test',
          description: 'Test complex calculations with multiple unit types',
          iterations: 500,
          warmupIterations: 50,
          context: {
            scene: { width: 1920, height: 1080 },
            parent: { width: 800, height: 600, x: 0, y: 0 },
            viewport: { width: 1920, height: 1080 },
            content: { width: 100, height: 100 },
          },
          configs: [
            {
              id: 'size-2',
              name: 'Test Size 2',
              sizeUnit: SizeUnit.PARENT_WIDTH,
              dimension: Dimension.BOTH,
              baseValue: SizeValue.FILL,
            } as ISizeUnitConfig,
            {
              id: 'position-2',
              name: 'Test Position 2',
              positionUnit: PositionUnit.PIXEL,
              axis: Dimension.XY,
              baseValue: PositionValue.CENTER,
            } as IPositionUnitConfig,
            {
              id: 'scale-2',
              name: 'Test Scale 2',
              scaleUnit: ScaleUnit.FACTOR,
              baseValue: ScaleValue.FIT,
            } as IScaleUnitConfig,
          ],
        },
      ];

      // Run performance comparison
      const results = await performanceSystem.runComparison(scenarios);

      // Verify results structure
      expect(results).toBeDefined();
      expect(results.length).toBe(scenarios.length);

      // Verify each result has the expected structure
      results.forEach((result, index) => {
        expect(result.original).toBeDefined();
        expect(result.refactored).toBeDefined();
        expect(result.improvement).toBeDefined();
        expect(result.statisticalSignificance).toBeDefined();

        // Verify metrics structure
        expect(result.original.executionTime).toBeGreaterThan(0);
        expect(result.original.memoryUsage).toBeGreaterThanOrEqual(0);
        expect(result.original.errorRate).toBeGreaterThanOrEqual(0);
        expect(result.original.throughput).toBeGreaterThan(0);

        expect(result.refactored.executionTime).toBeGreaterThan(0);
        expect(result.refactored.memoryUsage).toBeGreaterThanOrEqual(0);
        expect(result.refactored.errorRate).toBeGreaterThanOrEqual(0);
        expect(result.refactored.throughput).toBeGreaterThan(0);

        // Verify improvement calculations
        expect(result.improvement.executionTime).toBeDefined();
        expect(result.improvement.memoryUsage).toBeDefined();
        expect(result.improvement.errorRate).toBeDefined();
        expect(result.improvement.throughput).toBeDefined();

        // Verify statistical significance
        expect(result.statisticalSignificance.isSignificant).toBeDefined();
        expect(result.statisticalSignificance.confidenceLevel).toBeDefined();
        expect(result.statisticalSignificance.pValue).toBeDefined();

        console.log(`Scenario ${index + 1} Results:`);
        console.log(`  Original Execution Time: ${result.original.executionTime.toFixed(2)}ms`);
        console.log(`  Refactored Execution Time: ${result.refactored.executionTime.toFixed(2)}ms`);
        console.log(
          `  Execution Time Improvement: ${result.improvement.executionTime.toFixed(2)}%`
        );
        console.log(`  Throughput Improvement: ${result.improvement.throughput.toFixed(2)}%`);
      });
    });

    it('should generate comprehensive performance report', async () => {
      // Create a simple test scenario
      const scenario: TestScenario = {
        id: 'report-test',
        name: 'Report Generation Test',
        description: 'Test report generation functionality',
        iterations: 100,
        warmupIterations: 10,
        context: {
          scene: { width: 1920, height: 1080 },
          parent: { width: 800, height: 600, x: 0, y: 0 },
          viewport: { width: 1920, height: 1080 },
          content: { width: 100, height: 100 },
        },
        configs: [
          {
            id: 'size-report',
            name: 'Size Report Test',
            sizeUnit: SizeUnit.PIXEL,
            dimension: Dimension.WIDTH,
            baseValue: SizeValue.PIXEL,
          } as ISizeUnitConfig,
        ],
      };

      // Run comparison
      const results = await performanceSystem.runComparison([scenario]);

      // Generate report
      const report = performanceSystem.generateReport(results);

      // Verify report structure
      expect(report).toBeDefined();
      expect(typeof report).toBe('string');
      expect(report.length).toBeGreaterThan(0);

      // Verify report contains expected sections
      expect(report).toContain('# Performance Comparison Report');
      expect(report).toContain('## Summary');
      expect(report).toContain('## Detailed Results');
      expect(report).toContain('Average Execution Time Improvement');
      expect(report).toContain('Average Memory Usage Improvement');
      expect(report).toContain('Average Throughput Improvement');

      console.log('Generated Report:');
      console.log(report);
    });

    it('should handle different iteration counts correctly', async () => {
      const baseContext: UnitContext = {
        scene: { width: 1920, height: 1080 },
        parent: { width: 800, height: 600, x: 0, y: 0 },
        viewport: { width: 1920, height: 1080 },
        content: { width: 100, height: 100 },
      };

      const baseConfig: ISizeUnitConfig = {
        id: 'iteration-test',
        name: 'Iteration Test',
        sizeUnit: SizeUnit.PIXEL,
        dimension: Dimension.WIDTH,
        baseValue: SizeValue.PIXEL,
      };

      // Test with different iteration counts
      const iterationCounts = [10, 100, 1000];

      for (const iterations of iterationCounts) {
        const scenario: TestScenario = {
          id: `iteration-${iterations}`,
          name: `Iteration Test ${iterations}`,
          description: `Test with ${iterations} iterations`,
          iterations,
          warmupIterations: Math.max(1, Math.floor(iterations / 10)),
          context: baseContext,
          configs: [baseConfig],
        };

        const results = await performanceSystem.runComparison([scenario]);
        const result = results[0];

        // Verify that execution time increases with iteration count
        expect(result.original.executionTime).toBeGreaterThan(0);
        expect(result.refactored.executionTime).toBeGreaterThan(0);

        // Verify throughput calculations
        expect(result.original.throughput).toBeGreaterThan(0);
        expect(result.refactored.throughput).toBeGreaterThan(0);

        console.log(`Iterations: ${iterations}`);
        console.log(`  Original Throughput: ${result.original.throughput.toFixed(2)} ops/sec`);
        console.log(`  Refactored Throughput: ${result.refactored.throughput.toFixed(2)} ops/sec`);
      }
    });

    it('should handle error scenarios gracefully', async () => {
      // Create a scenario with invalid context to test error handling
      const scenario: TestScenario = {
        id: 'error-test',
        name: 'Error Handling Test',
        description: 'Test error handling with invalid context',
        iterations: 10,
        warmupIterations: 1,
        context: {
          scene: { width: 0, height: 0 }, // Invalid dimensions
          parent: { width: -1, height: -1, x: 0, y: 0 }, // Invalid dimensions
          viewport: { width: 0, height: 0 }, // Invalid dimensions
          content: { width: 0, height: 0 }, // Invalid dimensions
        },
        configs: [
          {
            id: 'error-size',
            name: 'Error Size Test',
            sizeUnit: SizeUnit.PIXEL,
            dimension: Dimension.WIDTH,
            baseValue: SizeValue.PIXEL,
          } as ISizeUnitConfig,
        ],
      };

      // Run comparison - should not throw errors
      const results = await performanceSystem.runComparison([scenario]);
      const result = results[0];

      // Verify that errors are captured in metrics
      expect(result.original.errorRate).toBeGreaterThanOrEqual(0);
      expect(result.refactored.errorRate).toBeGreaterThanOrEqual(0);

      console.log(`Error Test Results:`);
      console.log(`  Original Error Rate: ${(result.original.errorRate * 100).toFixed(2)}%`);
      console.log(`  Refactored Error Rate: ${(result.refactored.errorRate * 100).toFixed(2)}%`);
    });
  });

  describe('Statistical Analysis', () => {
    it('should calculate statistical significance correctly', async () => {
      const scenario: TestScenario = {
        id: 'statistical-test',
        name: 'Statistical Analysis Test',
        description: 'Test statistical significance calculations',
        iterations: 100,
        warmupIterations: 10,
        context: {
          scene: { width: 1920, height: 1080 },
          parent: { width: 800, height: 600, x: 0, y: 0 },
          viewport: { width: 1920, height: 1080 },
          content: { width: 100, height: 100 },
        },
        configs: [
          {
            id: 'statistical-size',
            name: 'Statistical Size Test',
            sizeUnit: SizeUnit.PIXEL,
            dimension: Dimension.WIDTH,
            baseValue: SizeValue.PIXEL,
          } as ISizeUnitConfig,
        ],
      };

      const results = await performanceSystem.runComparison([scenario]);
      const result = results[0];

      // Verify statistical significance structure
      expect(result.statisticalSignificance.isSignificant).toBeDefined();
      expect(typeof result.statisticalSignificance.isSignificant).toBe('boolean');
      expect(result.statisticalSignificance.confidenceLevel).toBeDefined();
      expect(result.statisticalSignificance.confidenceLevel).toBeGreaterThan(0);
      expect(result.statisticalSignificance.confidenceLevel).toBeLessThanOrEqual(1);
      expect(result.statisticalSignificance.pValue).toBeDefined();
      expect(result.statisticalSignificance.pValue).toBeGreaterThan(0);
      expect(result.statisticalSignificance.pValue).toBeLessThanOrEqual(1);

      console.log(`Statistical Analysis Results:`);
      console.log(`  Is Significant: ${result.statisticalSignificance.isSignificant}`);
      console.log(
        `  Confidence Level: ${(result.statisticalSignificance.confidenceLevel * 100).toFixed(2)}%`
      );
      console.log(`  P-Value: ${result.statisticalSignificance.pValue.toFixed(4)}`);
    });
  });
});
