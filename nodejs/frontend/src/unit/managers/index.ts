/**
 * Unit System Managers Index
 * Exports all focused managers for the unit system
 * Each manager follows Single Responsibility Principle
 */

// Main system manager (orchestrates all other managers)
export * from './UnitSystemManager';

// Focused managers (each with single responsibility)
export * from './UnitRegistryManager';
export * from './StrategyManager';
export * from './CommandManager';
export * from './ObserverManager';
export * from './ValidationManager';
export * from './PerformanceManager';

// Re-export commonly used interfaces for convenience
export type { IUnitSystemManager } from './UnitSystemManager';
export type { IUnitRegistryManager } from './UnitRegistryManager';
export type { IStrategyManager } from './StrategyManager';
export type { ICommandManager } from './CommandManager';
export type { IObserverManager } from './ObserverManager';
export type { IValidationManager } from './ValidationManager';
export type { IPerformanceManager } from './PerformanceManager';
