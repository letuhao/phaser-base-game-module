import type { UnitContext } from '../interfaces/IUnit';

/**
 * Unit Strategy Interface
 * Defines the strategy pattern for unit calculations
 * Each unit type (size, position, scale) implements this interface
 */
export interface IUnitStrategy<T = any> {
  /**
   * The type of unit this strategy handles
   */
  readonly unitType: string;

  /**
   * Calculate the actual value based on the input and context
   * @param input - The input value (can be various types)
   * @param context - Context information for calculation
   * @returns Calculated value
   */
  calculate(input: T, context: UnitContext): number;

  /**
   * Validate if the input can be processed by this strategy
   * @param input - The input to validate
   * @returns True if valid, false otherwise
   */
  canHandle(input: T): boolean;

  /**
   * Get the priority of this strategy (lower numbers = higher priority)
   * @returns Priority number
   */
  getPriority(): number;
}

/**
 * Unit Strategy Registry
 * Manages and selects the appropriate strategy for each unit type
 */
export interface IUnitStrategyRegistry {
  /**
   * Register a strategy for a specific unit type
   * @param unitType - The type of unit
   * @param strategy - The strategy to register
   */
  registerStrategy(unitType: string, strategy: IUnitStrategy): void;

  /**
   * Get the best strategy for a given input
   * @param input - The input value
   * @returns The best strategy or undefined if none found
   */
  getStrategy(input: any): IUnitStrategy | undefined;

  /**
   * Get all strategies for a specific unit type
   * @param unitType - The type of unit
   * @returns Array of strategies
   */
  getStrategiesByType(unitType: string): IUnitStrategy[];

  /**
   * Clear all registered strategies
   */
  clearStrategies(): void;
}
