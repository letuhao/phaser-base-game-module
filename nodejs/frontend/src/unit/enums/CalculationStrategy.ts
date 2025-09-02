/**
 * Calculation Strategy Enum
 * 
 * Defines the available calculation strategies for unit composites.
 * Used to replace string literal types with type-safe enums.
 */

export enum CalculationStrategy {
  SUM = 'sum',
  AVERAGE = 'average',
  MIN = 'min',
  MAX = 'max',
  CUSTOM = 'custom'
}

/**
 * Type guard to check if a string is a valid calculation strategy
 */
export function isValidCalculationStrategy(strategy: string): strategy is CalculationStrategy {
  return Object.values(CalculationStrategy).includes(strategy as CalculationStrategy);
}

/**
 * Get calculation strategy display name
 */
export function getCalculationStrategyDisplayName(strategy: CalculationStrategy): string {
  const displayNames = {
    [CalculationStrategy.SUM]: 'Sum',
    [CalculationStrategy.AVERAGE]: 'Average',
    [CalculationStrategy.MIN]: 'Minimum',
    [CalculationStrategy.MAX]: 'Maximum',
    [CalculationStrategy.CUSTOM]: 'Custom'
  };
  
  return displayNames[strategy];
}

/**
 * Get calculation strategy description
 */
export function getCalculationStrategyDescription(strategy: CalculationStrategy): string {
  const descriptions = {
    [CalculationStrategy.SUM]: 'Adds all values together',
    [CalculationStrategy.AVERAGE]: 'Calculates the average of all values',
    [CalculationStrategy.MIN]: 'Returns the minimum value',
    [CalculationStrategy.MAX]: 'Returns the maximum value',
    [CalculationStrategy.CUSTOM]: 'Uses a custom calculation function'
  };
  
  return descriptions[strategy];
}
