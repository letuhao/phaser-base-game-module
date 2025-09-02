/**
 * Strategy Input Interfaces Index
 * Exports all segregated strategy input interfaces
 * Follows Interface Segregation Principle
 */

// Main strategy input interface
export * from './IStrategyInput';

// Focused strategy input interfaces
export * from './ISizeStrategyInput';
export * from './IPositionStrategyInput';
export * from './IScaleStrategyInput';

// Re-export commonly used types for convenience
export type {
  IStrategyInput,
  IStrategyInputFactory,
  IStrategyInputValidator,
} from './IStrategyInput';

export type {
  ISizeStrategyInput,
  ISizeStrategyInputFactory,
  ISizeStrategyInputValidator,
} from './ISizeStrategyInput';

export type {
  IPositionStrategyInput,
  IPositionStrategyInputFactory,
  IPositionStrategyInputValidator,
} from './IPositionStrategyInput';

export type {
  IScaleStrategyInput,
  IScaleStrategyInputFactory,
  IScaleStrategyInputValidator,
} from './IScaleStrategyInput';
