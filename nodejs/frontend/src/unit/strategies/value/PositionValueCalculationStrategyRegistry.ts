import type { IPositionValueCalculationStrategy } from '../value-calculation/IPositionValueCalculationStrategy';
import type { IPositionValueCalculationStrategyRegistry } from '../value-calculation/IPositionValueCalculationStrategy';
import { PositionValue } from '../../enums/PositionValue';
import { PositionUnit } from '../../enums/PositionUnit';
import { AxisUnit } from '../../enums/AxisUnit';
import { Logger } from '../../../core/Logger';

/**
 * Registry for position value calculation strategies
 * Manages registration, retrieval, and selection of strategies
 */
export class PositionValueCalculationStrategyRegistry
  implements IPositionValueCalculationStrategyRegistry
{
  private readonly strategies = new Map<string, IPositionValueCalculationStrategy>();
  private readonly logger = Logger.getInstance();

  /**
   * Register a position value calculation strategy
   */
  registerStrategy(strategy: IPositionValueCalculationStrategy): void {
    this.logger.debug(
      'PositionValueCalculationStrategyRegistry',
      'registerStrategy',
      'Registering strategy',
      {
        strategyId: strategy.strategyId,
        positionValue: strategy.positionValue,
        positionUnit: strategy.positionUnit,
      }
    );

    if (this.strategies.has(strategy.strategyId)) {
      this.logger.warn(
        'PositionValueCalculationStrategyRegistry',
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
   * Unregister a position value calculation strategy
   */
  unregisterStrategy(strategyId: string): boolean {
    this.logger.debug(
      'PositionValueCalculationStrategyRegistry',
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
  getStrategy(strategyId: string): IPositionValueCalculationStrategy | undefined {
    return this.strategies.get(strategyId);
  }

  /**
   * Get all strategies that can handle the given parameters
   */
  getStrategiesFor(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    axisUnit: AxisUnit
  ): IPositionValueCalculationStrategy[] {
    const compatibleStrategies: IPositionValueCalculationStrategy[] = [];

    for (const strategy of this.strategies.values()) {
      if (strategy.canHandle(positionValue, positionUnit, axisUnit)) {
        compatibleStrategies.push(strategy);
      }
    }

    // Sort by priority (lower number = higher priority)
    compatibleStrategies.sort((a, b) => a.getPriority() - b.getPriority());

    this.logger.debug(
      'PositionValueCalculationStrategyRegistry',
      'getStrategiesFor',
      'Found compatible strategies',
      {
        positionValue,
        positionUnit,
        axisUnit,
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
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    axisUnit: AxisUnit
  ): IPositionValueCalculationStrategy | undefined {
    const strategies = this.getStrategiesFor(positionValue, positionUnit, axisUnit);
    return strategies[0]; // First one has highest priority
  }

  /**
   * Get all registered strategies
   */
  getAllStrategies(): IPositionValueCalculationStrategy[] {
    return Array.from(this.strategies.values());
  }

  /**
   * Get strategies by position value
   */
  getStrategiesByPositionValue(positionValue: PositionValue): IPositionValueCalculationStrategy[] {
    return this.getAllStrategies().filter(strategy => strategy.positionValue === positionValue);
  }

  /**
   * Get strategies by position unit
   */
  getStrategiesByPositionUnit(positionUnit: PositionUnit): IPositionValueCalculationStrategy[] {
    return this.getAllStrategies().filter(strategy => strategy.positionUnit === positionUnit);
  }

  /**
   * Get strategies by axis unit
   */
  getStrategiesByAxisUnit(axisUnit: AxisUnit): IPositionValueCalculationStrategy[] {
    return this.getAllStrategies().filter(strategy => strategy.axisUnit === axisUnit);
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
      'PositionValueCalculationStrategyRegistry',
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
    strategiesByPositionValue: Record<string, number>;
    strategiesByPositionUnit: Record<string, number>;
    strategiesByAxisUnit: Record<string, number>;
  } {
    const strategies = this.getAllStrategies();
    const stats = {
      totalStrategies: strategies.length,
      strategiesByPositionValue: {} as Record<string, number>,
      strategiesByPositionUnit: {} as Record<string, number>,
      strategiesByAxisUnit: {} as Record<string, number>,
    };

    for (const strategy of strategies) {
      const positionValueKey = strategy.positionValue;
      const positionUnitKey = strategy.positionUnit;
      const axisUnitKey = strategy.axisUnit;

      stats.strategiesByPositionValue[positionValueKey] =
        (stats.strategiesByPositionValue[positionValueKey] || 0) + 1;
      stats.strategiesByPositionUnit[positionUnitKey] =
        (stats.strategiesByPositionUnit[positionUnitKey] || 0) + 1;
      stats.strategiesByAxisUnit[axisUnitKey] = (stats.strategiesByAxisUnit[axisUnitKey] || 0) + 1;
    }

    return stats;
  }
}
