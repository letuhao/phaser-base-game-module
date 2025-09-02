import type { UnitContext } from '../../interfaces/IUnit';
import { ScaleValue } from '../../enums/ScaleValue';
import { ScaleUnit } from '../../enums/ScaleUnit';

/**
 * Interface for scale value calculation strategies
 * Implements Strategy Pattern for scale calculations
 */
export interface IScaleValueCalculationStrategy {
  readonly strategyId: string;
  readonly scaleValue: ScaleValue;
  readonly scaleUnit: ScaleUnit;

  /**
   * Check if this strategy can handle the given parameters
   */
  canHandle(scaleValue: ScaleValue, scaleUnit: ScaleUnit): boolean;

  /**
   * Calculate the scale value
   */
  calculate(scaleValue: ScaleValue, scaleUnit: ScaleUnit, context: UnitContext): number;

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
 * Registry interface for scale value calculation strategies
 */
export interface IScaleValueCalculationStrategyRegistry {
  /**
   * Register a scale value calculation strategy
   */
  registerStrategy(strategy: IScaleValueCalculationStrategy): void;

  /**
   * Unregister a scale value calculation strategy
   */
  unregisterStrategy(strategyId: string): boolean;

  /**
   * Get a strategy by ID
   */
  getStrategy(strategyId: string): IScaleValueCalculationStrategy | undefined;

  /**
   * Get all strategies that can handle the given parameters
   */
  getStrategiesFor(scaleValue: ScaleValue, scaleUnit: ScaleUnit): IScaleValueCalculationStrategy[];

  /**
   * Get the best strategy for the given parameters
   */
  getBestStrategy(
    scaleValue: ScaleValue,
    scaleUnit: ScaleUnit
  ): IScaleValueCalculationStrategy | undefined;

  /**
   * Get all registered strategies
   */
  getAllStrategies(): IScaleValueCalculationStrategy[];

  /**
   * Get strategies by scale value
   */
  getStrategiesByScaleValue(scaleValue: ScaleValue): IScaleValueCalculationStrategy[];

  /**
   * Get strategies by scale unit
   */
  getStrategiesByScaleUnit(scaleUnit: ScaleUnit): IScaleValueCalculationStrategy[];

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
    strategiesByScaleValue: Record<string, number>;
    strategiesByScaleUnit: Record<string, number>;
  };
}
