import type { UnitContext } from '../../interfaces/IUnit';

/**
 * Interface for strategy composition
 * Allows chaining multiple strategies together for complex calculations
 */
export interface IStrategyComposer<TValue, TUnit> {
  /**
   * Unique identifier for the composer
   */
  readonly composerId: string;

  /**
   * Description of what this composer does
   */
  readonly description: string;

  /**
   * Priority of this composer (lower numbers = higher priority)
   */
  readonly priority: number;

  /**
   * Check if this composer can handle the given value and unit
   */
  canCompose(value: TValue, unit: TUnit): boolean;

  /**
   * Compose multiple strategies to produce a final result
   */
  compose(
    value: TValue,
    unit: TUnit,
    context: UnitContext,
    strategies: Array<{ strategy: any; weight: number }>
  ): number;

  /**
   * Validate that the context is suitable for composition
   */
  validateContext(context: UnitContext): boolean;

  /**
   * Get the composition rules for this composer
   */
  getCompositionRules(): Array<{
    rule: string;
    description: string;
    weight: number;
  }>;

  /**
   * Get performance metrics for this composer
   */
  getPerformanceMetrics(): {
    averageExecutionTime: number;
    totalExecutions: number;
    successRate: number;
    lastExecutionTime: number;
  };
}
