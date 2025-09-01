import type { IStrategyComposer } from './IStrategyComposer';
import type { UnitContext } from '../../interfaces/IUnit';
import { SizeUnit } from '../../enums/SizeUnit';
import { SizeValue } from '../../enums/SizeValue';
import { Dimension } from '../../enums/Dimension';
import { Logger } from '../../../core/Logger';

/**
 * Weighted Average Strategy Composer
 * Combines multiple strategies using weighted averaging
 */
export class WeightedAverageSizeComposer implements IStrategyComposer<SizeValue, SizeUnit> {
  readonly composerId = 'weighted-average-size-composer';
  readonly description = 'Combines multiple size strategies using weighted averaging';
  readonly priority = 1;

  private executionTimes: number[] = [];
  private totalExecutions = 0;
  private successfulExecutions = 0;
  private readonly logger = Logger.getInstance();

  canCompose(_value: SizeValue, _unit: SizeUnit): boolean {
    // Can compose when we have multiple strategies that can handle the same value
    return true; // Always return true for weighted averaging
  }

  compose(
    value: SizeValue,
    unit: SizeUnit,
    context: UnitContext,
    strategies: Array<{ strategy: any; weight: number }>
  ): number {
    const startTime = performance.now();

    try {
      if (strategies.length === 0) {
        this.logger.warn('WeightedAverageSizeComposer', 'compose', 'No strategies provided');
        return 0;
      }

      // Calculate weighted average
      let totalWeight = 0;
      let weightedSum = 0;

      for (const { strategy, weight } of strategies) {
        if (strategy.canHandle && strategy.canHandle(value, unit, Dimension.WIDTH)) {
          // Validate context before calculation
          if (strategy.validateContext && !strategy.validateContext(context)) {
            this.logger.warn('WeightedAverageSizeComposer', 'compose', 'Context validation failed', {
              strategyId: strategy.strategyId
            });
            continue; // Skip this strategy
          }
          
          const result = strategy.calculate(value, unit, Dimension.WIDTH, context);
          weightedSum += result * weight;
          totalWeight += weight;
        }
      }

      if (totalWeight === 0) {
        this.logger.warn('WeightedAverageSizeComposer', 'compose', 'No valid strategies found');
        return 0;
      }

      const result = weightedSum / totalWeight;
      this.recordExecution(performance.now() - startTime, true);
      
      this.logger.debug('WeightedAverageSizeComposer', 'compose', 'Composition completed', {
        value,
        unit,
        result,
        strategiesUsed: strategies.length
      });

      return result;
    } catch (error) {
      this.recordExecution(performance.now() - startTime, false);
      this.logger.error('WeightedAverageSizeComposer', 'compose', 'Composition failed', { error });
      return 0;
    }
  }

  validateContext(context: UnitContext): boolean {
    return !!context && (!!context.parent || !!context.scene || !!context.viewport);
  }

  getCompositionRules(): Array<{ rule: string; description: string; weight: number }> {
    return [
      {
        rule: 'weighted-average',
        description: 'Calculate weighted average of all applicable strategies',
        weight: 1.0
      },
      {
        rule: 'fallback',
        description: 'Use fallback value if no strategies are applicable',
        weight: 0.1
      }
    ];
  }

  getPerformanceMetrics(): {
    averageExecutionTime: number;
    totalExecutions: number;
    successRate: number;
    lastExecutionTime: number;
  } {
    const averageTime = this.executionTimes.length > 0 
      ? this.executionTimes.reduce((a, b) => a + b, 0) / this.executionTimes.length 
      : 0;

    return {
      averageExecutionTime: averageTime,
      totalExecutions: this.totalExecutions,
      successRate: this.totalExecutions > 0 ? this.successfulExecutions / this.totalExecutions : 0,
      lastExecutionTime: this.executionTimes[this.executionTimes.length - 1] || 0
    };
  }

  private recordExecution(time: number, success: boolean): void {
    this.executionTimes.push(time);
    this.totalExecutions++;
    if (success) this.successfulExecutions++;

    // Keep only last 100 execution times for performance
    if (this.executionTimes.length > 100) {
      this.executionTimes = this.executionTimes.slice(-100);
    }
  }
}

/**
 * Priority-Based Strategy Composer
 * Uses the highest priority strategy that can handle the value
 */
export class PriorityBasedSizeComposer implements IStrategyComposer<SizeValue, SizeUnit> {
  readonly composerId = 'priority-based-size-composer';
  readonly description = 'Uses the highest priority strategy that can handle the value';
  readonly priority = 2;

  private executionTimes: number[] = [];
  private totalExecutions = 0;
  private successfulExecutions = 0;
  private readonly logger = Logger.getInstance();

  canCompose(_value: SizeValue, _unit: SizeUnit): boolean {
    return true; // Can always compose with priority-based selection
  }

  compose(
    value: SizeValue,
    unit: SizeUnit,
    context: UnitContext,
    strategies: Array<{ strategy: any; weight: number }>
  ): number {
    const startTime = performance.now();

    try {
      if (strategies.length === 0) {
        this.logger.warn('PriorityBasedSizeComposer', 'compose', 'No strategies provided');
        return 0;
      }

      // Sort strategies by priority (lower number = higher priority)
      const sortedStrategies = strategies
        .filter(({ strategy }) => strategy.canHandle && strategy.canHandle(value, unit, Dimension.WIDTH))
        .sort((a, b) => (a.strategy.getPriority?.() || 0) - (b.strategy.getPriority?.() || 0));

      if (sortedStrategies.length === 0) {
        this.logger.warn('PriorityBasedSizeComposer', 'compose', 'No valid strategies found');
        return 0;
      }

      // Use the highest priority strategy
      const { strategy } = sortedStrategies[0];
      const result = strategy.calculate(value, unit, Dimension.WIDTH, context);
      
      this.recordExecution(performance.now() - startTime, true);
      
      this.logger.debug('PriorityBasedSizeComposer', 'compose', 'Priority-based composition completed', {
        value,
        unit,
        result,
        strategyUsed: strategy.strategyId,
        priority: strategy.getPriority?.() || 0
      });

      return result;
    } catch (error) {
      this.recordExecution(performance.now() - startTime, false);
      this.logger.error('PriorityBasedSizeComposer', 'compose', 'Composition failed', { error });
      return 0;
    }
  }

  validateContext(context: UnitContext): boolean {
    return !!context && (!!context.parent || !!context.scene || !!context.viewport);
  }

  getCompositionRules(): Array<{ rule: string; description: string; weight: number }> {
    return [
      {
        rule: 'priority-selection',
        description: 'Select strategy with highest priority (lowest number)',
        weight: 1.0
      },
      {
        rule: 'fallback',
        description: 'Use fallback if no strategies are applicable',
        weight: 0.1
      }
    ];
  }

  getPerformanceMetrics(): {
    averageExecutionTime: number;
    totalExecutions: number;
    successRate: number;
    lastExecutionTime: number;
  } {
    const averageTime = this.executionTimes.length > 0 
      ? this.executionTimes.reduce((a, b) => a + b, 0) / this.executionTimes.length 
      : 0;

    return {
      averageExecutionTime: averageTime,
      totalExecutions: this.totalExecutions,
      successRate: this.totalExecutions > 0 ? this.successfulExecutions / this.totalExecutions : 0,
      lastExecutionTime: this.executionTimes[this.executionTimes.length - 1] || 0
    };
  }

  private recordExecution(time: number, success: boolean): void {
    this.executionTimes.push(time);
    this.totalExecutions++;
    if (success) this.successfulExecutions++;

    // Keep only last 100 execution times for performance
    if (this.executionTimes.length > 100) {
      this.executionTimes = this.executionTimes.slice(-100);
    }
  }
}

/**
 * Adaptive Strategy Composer
 * Dynamically adjusts strategy weights based on context and performance
 */
export class AdaptiveSizeComposer implements IStrategyComposer<SizeValue, SizeUnit> {
  readonly composerId = 'adaptive-size-composer';
  readonly description = 'Dynamically adjusts strategy weights based on context and performance';
  readonly priority = 3;

  private executionTimes: number[] = [];
  private totalExecutions = 0;
  private successfulExecutions = 0;
  private strategyPerformance: Map<string, { successCount: number; totalCount: number; avgTime: number }> = new Map();
  private readonly logger = Logger.getInstance();

  canCompose(_value: SizeValue, _unit: SizeUnit): boolean {
    return true; // Can always compose with adaptive selection
  }

  compose(
    value: SizeValue,
    unit: SizeUnit,
    context: UnitContext,
    strategies: Array<{ strategy: any; weight: number }>
  ): number {
    const startTime = performance.now();

    try {
      if (strategies.length === 0) {
        this.logger.warn('AdaptiveSizeComposer', 'compose', 'No strategies provided');
        return 0;
      }

      // Calculate adaptive weights based on performance history
      const adaptiveStrategies = strategies
        .filter(({ strategy }) => strategy.canHandle && strategy.canHandle(value, unit, Dimension.WIDTH))
        .map(({ strategy, weight }) => ({
          strategy,
          adaptiveWeight: this.calculateAdaptiveWeight(strategy, weight)
        }));

      if (adaptiveStrategies.length === 0) {
        this.logger.warn('AdaptiveSizeComposer', 'compose', 'No valid strategies found');
        return 0;
      }

      // Calculate weighted average with adaptive weights
      let totalWeight = 0;
      let weightedSum = 0;

      for (const { strategy, adaptiveWeight } of adaptiveStrategies) {
        const result = strategy.calculate(value, unit, Dimension.WIDTH, context);
        weightedSum += result * adaptiveWeight;
        totalWeight += adaptiveWeight;
      }

      const result = totalWeight > 0 ? weightedSum / totalWeight : 0;
      
      // Update performance metrics
      this.updateStrategyPerformance(adaptiveStrategies, performance.now() - startTime, true);
      this.recordExecution(performance.now() - startTime, true);
      
      this.logger.debug('AdaptiveSizeComposer', 'compose', 'Adaptive composition completed', {
        value,
        unit,
        result,
        strategiesUsed: adaptiveStrategies.length,
        adaptiveWeights: adaptiveStrategies.map(s => ({ id: s.strategy.strategyId, weight: s.adaptiveWeight }))
      });

      return result;
    } catch (error) {
      this.recordExecution(performance.now() - startTime, false);
      this.logger.error('AdaptiveSizeComposer', 'compose', 'Composition failed', { error });
      return 0;
    }
  }

  validateContext(context: UnitContext): boolean {
    return !!context && (!!context.parent || !!context.scene || !!context.viewport);
  }

  getCompositionRules(): Array<{ rule: string; description: string; weight: number }> {
    return [
      {
        rule: 'adaptive-weighting',
        description: 'Adjust strategy weights based on historical performance',
        weight: 1.0
      },
      {
        rule: 'performance-learning',
        description: 'Learn from successful strategy executions',
        weight: 0.8
      },
      {
        rule: 'fallback',
        description: 'Use fallback if no strategies are applicable',
        weight: 0.1
      }
    ];
  }

  getPerformanceMetrics(): {
    averageExecutionTime: number;
    totalExecutions: number;
    successRate: number;
    lastExecutionTime: number;
  } {
    const averageTime = this.executionTimes.length > 0 
      ? this.executionTimes.reduce((a, b) => a + b, 0) / this.executionTimes.length 
      : 0;

    return {
      averageExecutionTime: averageTime,
      totalExecutions: this.totalExecutions,
      successRate: this.totalExecutions > 0 ? this.successfulExecutions / this.totalExecutions : 0,
      lastExecutionTime: this.executionTimes[this.executionTimes.length - 1] || 0
    };
  }

  private calculateAdaptiveWeight(strategy: any, baseWeight: number): number {
    const performance = this.strategyPerformance.get(strategy.strategyId);
    if (!performance) return baseWeight;

    const successRate = performance.totalCount > 0 ? performance.successCount / performance.totalCount : 0;
    const timeFactor = Math.max(0.1, 1 - (performance.avgTime / 1000)); // Normalize time factor

    return baseWeight * (0.5 + 0.5 * successRate) * timeFactor;
  }

  private updateStrategyPerformance(
    strategies: Array<{ strategy: any; adaptiveWeight: number }>,
    executionTime: number,
    success: boolean
  ): void {
    for (const { strategy } of strategies) {
      const performance = this.strategyPerformance.get(strategy.strategyId) || {
        successCount: 0,
        totalCount: 0,
        avgTime: 0
      };

      performance.totalCount++;
      if (success) performance.successCount++;
      performance.avgTime = (performance.avgTime * (performance.totalCount - 1) + executionTime) / performance.totalCount;

      this.strategyPerformance.set(strategy.strategyId, performance);
    }
  }

  private recordExecution(time: number, success: boolean): void {
    this.executionTimes.push(time);
    this.totalExecutions++;
    if (success) this.successfulExecutions++;

    // Keep only last 100 execution times for performance
    if (this.executionTimes.length > 100) {
      this.executionTimes = this.executionTimes.slice(-100);
    }
  }
}
