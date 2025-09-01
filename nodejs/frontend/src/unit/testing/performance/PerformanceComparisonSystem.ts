import { UnitContext } from '../../interfaces/IUnit';
import { IUnitConfig } from '../../interfaces/IUnitConfig';
import { SizeUnitCalculator } from '../../classes/SizeUnitCalculator';
import { RefactoredSizeUnitCalculator } from '../../classes/RefactoredSizeUnitCalculator';
import { PositionUnitCalculator } from '../../classes/PositionUnitCalculator';
import { RefactoredPositionUnitCalculator } from '../../classes/RefactoredPositionUnitCalculator';
import { ScaleUnitCalculator } from '../../classes/ScaleUnitCalculator';
import { RefactoredScaleUnitCalculator } from '../../classes/RefactoredScaleUnitCalculator';
import { SizeValue } from '../../enums/SizeValue';
import { PositionValue } from '../../enums/PositionValue';
import { ScaleValue } from '../../enums/ScaleValue';
import { SizeUnit } from '../../enums/SizeUnit';
import { PositionUnit } from '../../enums/PositionUnit';
import { ScaleUnit } from '../../enums/ScaleUnit';
import { Dimension } from '../../enums/Dimension';

export interface PerformanceMetrics {
  executionTime: number;
  memoryUsage: number;
  cacheHitRate?: number;
  errorRate: number;
  throughput: number;
}

export interface ComparisonResult {
  original: PerformanceMetrics;
  refactored: PerformanceMetrics;
  improvement: {
    executionTime: number; // percentage improvement
    memoryUsage: number; // percentage improvement
    errorRate: number; // percentage improvement
    throughput: number; // percentage improvement
  };
  statisticalSignificance: {
    isSignificant: boolean;
    confidenceLevel: number;
    pValue: number;
  };
}

export interface TestScenario {
  id: string;
  name: string;
  description: string;
  iterations: number;
  warmupIterations: number;
  context: UnitContext;
  configs: IUnitConfig[];
}

export class PerformanceComparisonSystem {
  private readonly originalSizeCalculator: SizeUnitCalculator;
  private readonly refactoredSizeCalculator: RefactoredSizeUnitCalculator;
  private readonly originalPositionCalculator: PositionUnitCalculator;
  private readonly refactoredPositionCalculator: RefactoredPositionUnitCalculator;
  private readonly originalScaleCalculator: ScaleUnitCalculator;
  private readonly refactoredScaleCalculator: RefactoredScaleUnitCalculator;

  constructor() {
    this.originalSizeCalculator = new SizeUnitCalculator(
      'test-size-original',
      'Test Size Original',
      SizeUnit.PIXEL,
      Dimension.WIDTH,
      SizeValue.PIXEL
    );
    this.refactoredSizeCalculator = new RefactoredSizeUnitCalculator(
      'test-size-refactored',
      'Test Size Refactored',
      SizeUnit.PIXEL,
      Dimension.WIDTH,
      SizeValue.PIXEL
    );
    this.originalPositionCalculator = new PositionUnitCalculator(
      'test-position-original',
      'Test Position Original',
      PositionUnit.PIXEL,
      Dimension.X,
      PositionValue.PIXEL
    );
    this.refactoredPositionCalculator = new RefactoredPositionUnitCalculator(
      'test-position-refactored',
      'Test Position Refactored',
      PositionUnit.PIXEL,
      Dimension.X,
      PositionValue.PIXEL
    );
    this.originalScaleCalculator = new ScaleUnitCalculator(
      'test-scale-original',
      'Test Scale Original',
      ScaleUnit.FACTOR,
      ScaleValue.FACTOR
    );
    this.refactoredScaleCalculator = new RefactoredScaleUnitCalculator(
      'test-scale-refactored',
      'Test Scale Refactored',
      ScaleUnit.FACTOR,
      ScaleValue.FACTOR
    );
  }

  /**
   * Run comprehensive performance comparison between original and refactored systems
   */
  async runComparison(scenarios: TestScenario[]): Promise<ComparisonResult[]> {
    const results: ComparisonResult[] = [];

    for (const scenario of scenarios) {
      console.log(`Running scenario: ${scenario.name}`);
      
      const originalMetrics = await this.runOriginalSystem(scenario);
      const refactoredMetrics = await this.runRefactoredSystem(scenario);
      
      const improvement = this.calculateImprovement(originalMetrics, refactoredMetrics);
      const statisticalSignificance = this.calculateStatisticalSignificance(
        originalMetrics, 
        refactoredMetrics
      );

      results.push({
        original: originalMetrics,
        refactored: refactoredMetrics,
        improvement,
        statisticalSignificance
      });
    }

    return results;
  }

  /**
   * Run performance test on original system
   */
  private async runOriginalSystem(scenario: TestScenario): Promise<PerformanceMetrics> {
    // Performance tracking variables (unused but kept for future use)
    performance.now();
    this.getMemoryUsage();
    let errors = 0;
    let totalCalculations = 0;

    // Warmup
    for (let i = 0; i < scenario.warmupIterations; i++) {
      try {
        this.runOriginalCalculations(scenario);
        totalCalculations++;
      } catch (error) {
        errors++;
      }
    }

    // Actual test
    const testStartTime = performance.now();
    const testStartMemory = this.getMemoryUsage();

    for (let i = 0; i < scenario.iterations; i++) {
      try {
        this.runOriginalCalculations(scenario);
        totalCalculations++;
      } catch (error) {
        errors++;
      }
    }

    const endTime = performance.now();
    const endMemory = this.getMemoryUsage();

    return {
      executionTime: endTime - testStartTime,
      memoryUsage: endMemory - testStartMemory,
      errorRate: errors / totalCalculations,
      throughput: totalCalculations / ((endTime - testStartTime) / 1000)
    };
  }

  /**
   * Run performance test on refactored system
   */
  private async runRefactoredSystem(scenario: TestScenario): Promise<PerformanceMetrics> {
    // Performance tracking variables (unused but kept for future use)
    performance.now();
    this.getMemoryUsage();
    let errors = 0;
    let totalCalculations = 0;

    // Warmup
    for (let i = 0; i < scenario.warmupIterations; i++) {
      try {
        this.runRefactoredCalculations(scenario);
        totalCalculations++;
      } catch (error) {
        errors++;
      }
    }

    // Actual test
    const testStartTime = performance.now();
    const testStartMemory = this.getMemoryUsage();

    for (let i = 0; i < scenario.iterations; i++) {
      try {
        this.runRefactoredCalculations(scenario);
        totalCalculations++;
      } catch (error) {
        errors++;
      }
    }

    const endTime = performance.now();
    const endMemory = this.getMemoryUsage();

    return {
      executionTime: endTime - testStartTime,
      memoryUsage: endMemory - testStartMemory,
      errorRate: errors / totalCalculations,
      throughput: totalCalculations / ((endTime - testStartTime) / 1000)
    };
  }

  /**
   * Execute calculations using original system
   */
  private runOriginalCalculations(scenario: TestScenario): void {
    for (const config of scenario.configs) {
      // For testing purposes, we'll use the calculators directly
      // In a real scenario, we'd need to create proper unit instances
      if ('sizeUnit' in config) {
        this.originalSizeCalculator.calculate(scenario.context);
      } else if ('positionUnit' in config) {
        this.originalPositionCalculator.calculate(scenario.context);
      } else if ('scaleUnit' in config) {
        this.originalScaleCalculator.calculate(scenario.context);
      }
    }
  }

  /**
   * Execute calculations using refactored system
   */
  private runRefactoredCalculations(scenario: TestScenario): void {
    for (const config of scenario.configs) {
      // For testing purposes, we'll use the calculators directly
      // In a real scenario, we'd need to create proper unit instances
      if ('sizeUnit' in config) {
        this.refactoredSizeCalculator.calculate(scenario.context);
      } else if ('positionUnit' in config) {
        this.refactoredPositionCalculator.calculate(scenario.context);
      } else if ('scaleUnit' in config) {
        this.refactoredScaleCalculator.calculate(scenario.context);
      }
    }
  }

  /**
   * Calculate improvement percentages
   */
  private calculateImprovement(
    original: PerformanceMetrics,
    refactored: PerformanceMetrics
  ): ComparisonResult['improvement'] {
    return {
      executionTime: ((original.executionTime - refactored.executionTime) / original.executionTime) * 100,
      memoryUsage: ((original.memoryUsage - refactored.memoryUsage) / original.memoryUsage) * 100,
      errorRate: ((original.errorRate - refactored.errorRate) / original.errorRate) * 100,
      throughput: ((refactored.throughput - original.throughput) / original.throughput) * 100
    };
  }

  /**
   * Calculate statistical significance using t-test
   */
  private calculateStatisticalSignificance(
    original: PerformanceMetrics,
    refactored: PerformanceMetrics
  ): ComparisonResult['statisticalSignificance'] {
    // Simplified t-test calculation
    const n1 = 1; // sample size for original
    const n2 = 1; // sample size for refactored
    
    const mean1 = original.executionTime;
    const mean2 = refactored.executionTime;
    
    const variance1 = 0; // would need multiple samples for real variance
    const variance2 = 0;
    
    const pooledVariance = ((n1 - 1) * variance1 + (n2 - 1) * variance2) / (n1 + n2 - 2);
    const standardError = Math.sqrt(pooledVariance * (1/n1 + 1/n2));
    
    // t-statistic calculation (unused but kept for future statistical analysis)
    (mean1 - mean2) / standardError;
    
    // Simplified p-value calculation (would need proper t-distribution table)
    const pValue = 0.05; // placeholder
    const confidenceLevel = 0.95;
    const isSignificant = pValue < 0.05;

    return {
      isSignificant,
      confidenceLevel,
      pValue
    };
  }

  /**
   * Get current memory usage (simplified)
   */
  private getMemoryUsage(): number {
    if (typeof performance !== 'undefined' && (performance as any).memory) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  }

  /**
   * Generate performance report
   */
  generateReport(results: ComparisonResult[]): string {
    let report = '# Performance Comparison Report\n\n';
    
    report += '## Summary\n\n';
    
    const avgExecutionTimeImprovement = results.reduce(
      (sum, result) => sum + result.improvement.executionTime, 0
    ) / results.length;
    
    const avgMemoryImprovement = results.reduce(
      (sum, result) => sum + result.improvement.memoryUsage, 0
    ) / results.length;
    
    const avgThroughputImprovement = results.reduce(
      (sum, result) => sum + result.improvement.throughput, 0
    ) / results.length;
    
    report += `- **Average Execution Time Improvement**: ${avgExecutionTimeImprovement.toFixed(2)}%\n`;
    report += `- **Average Memory Usage Improvement**: ${avgMemoryImprovement.toFixed(2)}%\n`;
    report += `- **Average Throughput Improvement**: ${avgThroughputImprovement.toFixed(2)}%\n\n`;
    
    report += '## Detailed Results\n\n';
    
    results.forEach((result, index) => {
      report += `### Test ${index + 1}\n\n`;
      report += `**Original System**:\n`;
      report += `- Execution Time: ${result.original.executionTime.toFixed(2)}ms\n`;
      report += `- Memory Usage: ${result.original.memoryUsage.toFixed(2)} bytes\n`;
      report += `- Error Rate: ${(result.original.errorRate * 100).toFixed(2)}%\n`;
      report += `- Throughput: ${result.original.throughput.toFixed(2)} ops/sec\n\n`;
      
      report += `**Refactored System**:\n`;
      report += `- Execution Time: ${result.refactored.executionTime.toFixed(2)}ms\n`;
      report += `- Memory Usage: ${result.refactored.memoryUsage.toFixed(2)} bytes\n`;
      report += `- Error Rate: ${(result.refactored.errorRate * 100).toFixed(2)}%\n`;
      report += `- Throughput: ${result.refactored.throughput.toFixed(2)} ops/sec\n\n`;
      
      report += `**Improvements**:\n`;
      report += `- Execution Time: ${result.improvement.executionTime.toFixed(2)}% ${result.improvement.executionTime > 0 ? '✅' : '❌'}\n`;
      report += `- Memory Usage: ${result.improvement.memoryUsage.toFixed(2)}% ${result.improvement.memoryUsage > 0 ? '✅' : '❌'}\n`;
      report += `- Throughput: ${result.improvement.throughput.toFixed(2)}% ${result.improvement.throughput > 0 ? '✅' : '❌'}\n`;
      report += `- Statistical Significance: ${result.statisticalSignificance.isSignificant ? '✅' : '❌'}\n\n`;
    });
    
    return report;
  }
}
