import type { UnitContext } from '../../interfaces/IUnit';
import { PositionValue } from '../../enums/PositionValue';
import { PositionUnit } from '../../enums/PositionUnit';
import { AxisUnit } from '../../enums/AxisUnit';

/**
 * Interface for position value calculation strategies
 * Implements Strategy Pattern for position calculations
 */
export interface IPositionValueCalculationStrategy {
  readonly strategyId: string;
  readonly positionValue: PositionValue;
  readonly positionUnit: PositionUnit;
  readonly axisUnit: AxisUnit;

  /**
   * Check if this strategy can handle the given parameters
   */
  canHandle(positionValue: PositionValue, positionUnit: PositionUnit, axisUnit: AxisUnit): boolean;

  /**
   * Calculate the position value
   */
  calculate(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    axisUnit: AxisUnit,
    context: UnitContext
  ): number;

  /**
   * Get the priority of this strategy (lower number = higher priority)
   */
  getPriority(): number;

  /**
   * Validate if the context is suitable for this strategy
   */
  validateContext(context: UnitContext): boolean;

  /**
   * Get a description of what this strategy does
   */
  getDescription(): string;
}

/**
 * Registry interface for position value calculation strategies
 */
export interface IPositionValueCalculationStrategyRegistry {
  /**
   * Register a position value calculation strategy
   */
  registerStrategy(strategy: IPositionValueCalculationStrategy): void;

  /**
   * Unregister a position value calculation strategy
   */
  unregisterStrategy(strategyId: string): boolean;

  /**
   * Get a strategy by ID
   */
  getStrategy(strategyId: string): IPositionValueCalculationStrategy | undefined;

  /**
   * Get all strategies that can handle the given parameters
   */
  getStrategiesFor(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    axisUnit: AxisUnit
  ): IPositionValueCalculationStrategy[];

  /**
   * Get the best strategy for the given parameters
   */
  getBestStrategy(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    axisUnit: AxisUnit
  ): IPositionValueCalculationStrategy | undefined;

  /**
   * Get all registered strategies
   */
  getAllStrategies(): IPositionValueCalculationStrategy[];

  /**
   * Get strategies by position value
   */
  getStrategiesByPositionValue(positionValue: PositionValue): IPositionValueCalculationStrategy[];

  /**
   * Get strategies by position unit
   */
  getStrategiesByPositionUnit(positionUnit: PositionUnit): IPositionValueCalculationStrategy[];

  /**
   * Get strategies by axis unit
   */
  getStrategiesByAxisUnit(axisUnit: AxisUnit): IPositionValueCalculationStrategy[];

  /**
   * Get the number of registered strategies
   */
  getStrategyCount(): number;

  /**
   * Check if a strategy is registered
   */
  hasStrategy(strategyId: string): boolean;

  /**
   * Clear all registered strategies
   */
  clearStrategies(): void;

  /**
   * Get statistics about registered strategies
   */
  getStatistics(): {
    totalStrategies: number;
    strategiesByPositionValue: Record<string, number>;
    strategiesByPositionUnit: Record<string, number>;
    strategiesByAxisUnit: Record<string, number>;
  };
}
