import type { SizeValue } from '../../enums/SizeValue';
import type { SizeUnit } from '../../enums/SizeUnit';
import type { UnitContext } from '../../interfaces/IUnit';
import { Dimension } from '../../enums/Dimension';

/**
 * Size Value Calculation Strategy Interface
 * Strategy pattern for size value calculations
 * Replaces large switch statements with focused strategies
 */
export interface ISizeValueCalculationStrategy {
  /** Strategy identifier */
  readonly strategyId: string;

  /** Size value this strategy can handle */
  readonly sizeValue: SizeValue;

  /** Size unit this strategy can handle */
  readonly sizeUnit: SizeUnit;

  /** Dimension this strategy can handle */
  readonly dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH;

  /** Check if this strategy can handle the given size value */
  canHandle(
    sizeValue: SizeValue | number,
    sizeUnit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH
  ): boolean;

  /** Calculate the size value */
  calculate(
    sizeValue: SizeValue | number,
    sizeUnit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
    context: UnitContext
  ): number;

  /** Get strategy priority (lower number = higher priority) */
  getPriority(): number;

  /** Validate the strategy can work with the given context */
  validateContext(context: UnitContext): boolean;

  /** Get strategy description */
  getDescription(): string;
}

/**
 * Size Value Calculation Strategy Registry
 * Manages size value calculation strategies
 */
export interface ISizeValueCalculationStrategyRegistry {
  /** Register a size value calculation strategy */
  registerStrategy(strategy: ISizeValueCalculationStrategy): void;

  /** Unregister a size value calculation strategy */
  unregisterStrategy(strategyId: string): boolean;

  /** Get the best strategy for the given parameters */
  getBestStrategy(
    sizeValue: SizeValue | number,
    sizeUnit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH
  ): ISizeValueCalculationStrategy | undefined;

  /** Get all strategies */
  getAllStrategies(): ISizeValueCalculationStrategy[];

  /** Get strategies by size value */
  getStrategiesBySizeValue(sizeValue: SizeValue): ISizeValueCalculationStrategy[];

  /** Get strategies by size unit */
  getStrategiesBySizeUnit(sizeUnit: SizeUnit): ISizeValueCalculationStrategy[];

  /** Clear all strategies */
  clearStrategies(): void;

  /** Get strategy count */
  getStrategyCount(): number;
}
