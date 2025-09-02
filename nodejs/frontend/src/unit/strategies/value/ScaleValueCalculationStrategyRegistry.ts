import type { IScaleValueCalculationStrategy } from '../value-calculation/IScaleValueCalculationStrategy';
import type { IScaleValueCalculationStrategyRegistry } from '../value-calculation/IScaleValueCalculationStrategy';
import { ScaleValue } from '../../enums/ScaleValue';
import { ScaleUnit } from '../../enums/ScaleUnit';
import { Logger } from '../../../core/Logger';

/**
 * Registry for scale value calculation strategies
 * Manages registration, retrieval, and selection of strategies
 */
export class ScaleValueCalculationStrategyRegistry
  implements IScaleValueCalculationStrategyRegistry
{
  private readonly strategies = new Map<string, IScaleValueCalculationStrategy>();
  private readonly logger = Logger.getInstance();

  /**
   * Register a scale value calculation strategy
   */
  registerStrategy(strategy: IScaleValueCalculationStrategy): void {
    this.logger.debug(
      'ScaleValueCalculationStrategyRegistry',
      'registerStrategy',
      'Registering strategy',
      {
        strategyId: strategy.strategyId,
        scaleValue: strategy.scaleValue,
        scaleUnit: strategy.scaleUnit,
      }
    );

    if (this.strategies.has(strategy.strategyId)) {
      this.logger.warn(
        'ScaleValueCalculationStrategyRegistry',
        'registerStrategy',
        'Strategy already registered',
        {
          strategyId: strategy.strategyId,
        }
      );
      return;
    }

    this.strategies.set(strategy.strategyId, strategy);
  }

  /**
   * Unregister a scale value calculation strategy
   */
  unregisterStrategy(strategyId: string): boolean {
    this.logger.debug(
      'ScaleValueCalculationStrategyRegistry',
      'unregisterStrategy',
      'Unregistering strategy',
      {
        strategyId,
      }
    );

    return this.strategies.delete(strategyId);
  }

  /**
   * Get a strategy by ID
   */
  getStrategy(strategyId: string): IScaleValueCalculationStrategy | undefined {
    return this.strategies.get(strategyId);
  }

  /**
   * Get all strategies that can handle the given parameters
   */
  getStrategiesFor(scaleValue: ScaleValue, scaleUnit: ScaleUnit): IScaleValueCalculationStrategy[] {
    const compatibleStrategies: IScaleValueCalculationStrategy[] = [];

    for (const strategy of this.strategies.values()) {
      if (strategy.canHandle(scaleValue, scaleUnit)) {
        compatibleStrategies.push(strategy);
      }
    }

    // Sort by priority (lower number = higher priority)
    compatibleStrategies.sort((a, b) => a.getPriority() - b.getPriority());

    this.logger.debug(
      'ScaleValueCalculationStrategyRegistry',
      'getStrategiesFor',
      'Found compatible strategies',
      {
        scaleValue,
        scaleUnit,
        count: compatibleStrategies.length,
        strategies: compatibleStrategies.map(s => s.strategyId),
      }
    );

    return compatibleStrategies;
  }

  /**
   * Get the best strategy for the given parameters
   */
  getBestStrategy(
    scaleValue: ScaleValue,
    scaleUnit: ScaleUnit
  ): IScaleValueCalculationStrategy | undefined {
    const strategies = this.getStrategiesFor(scaleValue, scaleUnit);
    return strategies[0]; // First one has highest priority
  }

  /**
   * Get all registered strategies
   */
  getAllStrategies(): IScaleValueCalculationStrategy[] {
    return Array.from(this.strategies.values());
  }

  /**
   * Get strategies by scale value
   */
  getStrategiesByScaleValue(scaleValue: ScaleValue): IScaleValueCalculationStrategy[] {
    return this.getAllStrategies().filter(strategy => strategy.scaleValue === scaleValue);
  }

  /**
   * Get strategies by scale unit
   */
  getStrategiesByScaleUnit(scaleUnit: ScaleUnit): IScaleValueCalculationStrategy[] {
    return this.getAllStrategies().filter(strategy => strategy.scaleUnit === scaleUnit);
  }

  /**
   * Get the number of registered strategies
   */
  getStrategyCount(): number {
    return this.strategies.size;
  }

  /**
   * Check if a strategy is registered
   */
  hasStrategy(strategyId: string): boolean {
    return this.strategies.has(strategyId);
  }

  /**
   * Clear all registered strategies
   */
  clearStrategies(): void {
    this.logger.debug(
      'ScaleValueCalculationStrategyRegistry',
      'clearStrategies',
      'Clearing all strategies'
    );
    this.strategies.clear();
  }

  /**
   * Get statistics about registered strategies
   */
  getStatistics(): {
    totalStrategies: number;
    strategiesByScaleValue: Record<string, number>;
    strategiesByScaleUnit: Record<string, number>;
  } {
    const strategies = this.getAllStrategies();
    const stats = {
      totalStrategies: strategies.length,
      strategiesByScaleValue: {} as Record<string, number>,
      strategiesByScaleUnit: {} as Record<string, number>,
    };

    for (const strategy of strategies) {
      const scaleValueKey = strategy.scaleValue;
      const scaleUnitKey = strategy.scaleUnit;

      stats.strategiesByScaleValue[scaleValueKey] =
        (stats.strategiesByScaleValue[scaleValueKey] || 0) + 1;
      stats.strategiesByScaleUnit[scaleUnitKey] =
        (stats.strategiesByScaleUnit[scaleUnitKey] || 0) + 1;
    }

    return stats;
  }
}
