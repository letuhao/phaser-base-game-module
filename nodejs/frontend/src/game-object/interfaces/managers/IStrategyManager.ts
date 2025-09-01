/**
 * Strategy Manager Interface
 * 
 * Defines management functionality for strategy pattern implementations.
 * Handles strategy lifecycle, selection, and execution management.
 */

import type { IStrategy } from '../patterns/IStrategy';
import type { IGameObject } from '../IGameObject';

/**
 * Strategy manager operations
 */
export enum StrategyManagerOperation {
  CREATE_STRATEGY = 'create_strategy',
  DESTROY_STRATEGY = 'destroy_strategy',
  SELECT_STRATEGY = 'select_strategy',
  EXECUTE_STRATEGY = 'execute_strategy',
  MANAGE_STRATEGY = 'manage_strategy',
  VALIDATE_STRATEGY = 'validate_strategy'
}

/**
 * Strategy manager configuration
 */
export interface StrategyManagerConfig {
  maxStrategies: number;
  enableStrategyCaching: boolean;
  enableStrategyValidation: boolean;
  enableStrategyOptimization: boolean;
  defaultStrategyTimeout: number;
  autoCleanup: boolean;
  metadata?: Record<string, any>;
}

/**
 * Strategy manager statistics
 */
export interface StrategyManagerStatistics {
  totalStrategies: number;
  activeStrategies: number;
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  averageExecutionTime: number;
  lastExecutionTime: number;
  strategiesByType: Record<string, number>;
  executionCounts: Record<string, number>;
}

/**
 * Strategy execution context
 */
export interface StrategyExecutionContext {
  contextId: string;
  strategyId: string;
  targetObject: IGameObject;
  executionParameters: Record<string, any>;
  executionMetadata?: Record<string, any>;
}

/**
 * Strategy execution result
 */
export interface StrategyExecutionResult {
  success: boolean;
  result: any;
  executionTime: number;
  errorMessage?: string;
  executionMetadata?: Record<string, any>;
}

/**
 * Interface for strategy managers
 */
export interface IStrategyManager {
  readonly strategyManagerId: string;
  
  /** Strategy manager configuration */
  strategyManagerConfig: StrategyManagerConfig;
  
  /** Managed strategies */
  managedStrategies: Map<string, IStrategy>;
  
  /** Strategy execution contexts */
  strategyExecutionContexts: Map<string, StrategyExecutionContext>;
  
  /** Strategy execution results */
  strategyExecutionResults: Map<string, StrategyExecutionResult[]>;
  
  /** Strategy manager statistics */
  strategyManagerStatistics: StrategyManagerStatistics;
  
  /** Strategy manager metadata */
  strategyManagerMetadata: Record<string, any>;
  
  /** Set strategy manager configuration */
  setStrategyManagerConfig(config: StrategyManagerConfig): this;
  
  /** Set strategy manager metadata */
  setStrategyManagerMetadata(metadata: Record<string, any>): this;
  
  /** Get strategy manager configuration */
  getStrategyManagerConfig(): StrategyManagerConfig;
  
  /** Get managed strategies */
  getManagedStrategies(): Map<string, IStrategy>;
  
  /** Get strategy execution contexts */
  getStrategyExecutionContexts(): Map<string, StrategyExecutionContext>;
  
  /** Get strategy execution results */
  getStrategyExecutionResults(): Map<string, StrategyExecutionResult[]>;
  
  /** Get strategy manager statistics */
  getStrategyManagerStatistics(): StrategyManagerStatistics;
  
  /** Get strategy manager metadata */
  getStrategyManagerMetadata(): Record<string, any>;
  
  /** Create strategy */
  createStrategy(strategyId: string): Promise<IStrategy>;
  
  /** Destroy strategy */
  destroyStrategy(strategyId: string): Promise<boolean>;
  
  /** Manage strategy */
  manageStrategy(strategy: IStrategy): Promise<this>;
  
  /** Select strategy */
  selectStrategy(context: string, criteria: Record<string, any>): Promise<IStrategy | null>;
  
  /** Execute strategy */
  executeStrategy(strategyId: string, context: StrategyExecutionContext): Promise<StrategyExecutionResult>;
  
  /** Get strategy by ID */
  getStrategy(strategyId: string): IStrategy | null;
  
  /** Check if strategy exists */
  hasStrategy(strategyId: string): boolean;
  
  /** Get strategies by type */
  getStrategiesByType(type: string): IStrategy[];
  
  /** Get execution context by ID */
  getExecutionContext(contextId: string): StrategyExecutionContext | null;
  
  /** Get execution results for strategy */
  getExecutionResultsForStrategy(strategyId: string): StrategyExecutionResult[];
  
  /** Validate strategy */
  validateStrategy(strategy: IStrategy): Promise<boolean>;
  
  /** Clear strategy execution results */
  clearStrategyExecutionResults(strategyId: string): Promise<this>;
  
  /** Clear all execution results */
  clearAllExecutionResults(): Promise<this>;
  
  /** Update strategy manager */
  updateStrategyManager(deltaTime: number): void;
}
