/**
 * Strategy Pattern Interface
 * 
 * Defines strategy functionality for game objects.
 * Handles behavior switching and algorithm management.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType, StrategyType, StrategyState } from '../../enums';
import * as Phaser from 'phaser';

/**
 * Strategy configuration
 */
export interface StrategyConfig {
  type: StrategyType;
  name: string;
  priority: number;
  enabled: boolean;
  autoSwitch: boolean;
  switchConditions: any[];
  metadata?: any;
}

/**
 * Strategy context
 */
export interface StrategyContext {
  object: IGameObject;
  scene: Phaser.Scene;
  deltaTime: number;
  input?: any;
  environment?: any;
  metadata?: any;
}

/**
 * Interface for strategy game objects
 * 
 * Extends IGameObject with strategy pattern functionality.
 */
export interface IStrategy extends IGameObject {
  readonly gameObjectType: GameObjectType;
  
  /** Strategy type */
  strategyType: StrategyType;
  
  /** Strategy state */
  strategyState: StrategyState;
  
  /** Strategy manager */
  strategyManager: any; // IStrategyManager
  
  /** Strategy ID */
  strategyId: string;
  
  /** Strategy name */
  strategyName: string;
  
  /** Current strategy */
  currentStrategy: StrategyConfig | null;
  
  /** Available strategies */
  availableStrategies: StrategyConfig[];
  
  /** Strategy history */
  strategyHistory: StrategyConfig[];
  
  /** Strategy max history */
  strategyMaxHistory: number;
  
  /** Strategy auto switch */
  strategyAutoSwitch: boolean;
  
  /** Strategy switch conditions */
  strategySwitchConditions: any[];
  
  /** Strategy context */
  strategyContext: StrategyContext;
  
  /** Strategy metadata */
  strategyMetadata: any;
  
  /** Set strategy type */
  setStrategyType(type: StrategyType): this;
  
  /** Set strategy state */
  setStrategyState(state: StrategyState): this;
  
  /** Set strategy manager */
  setStrategyManager(manager: any): this;
  
  /** Set strategy ID */
  setStrategyId(id: string): this;
  
  /** Set strategy name */
  setStrategyName(name: string): this;
  
  /** Set current strategy */
  setCurrentStrategy(strategy: StrategyConfig | null): this;
  
  /** Set available strategies */
  setAvailableStrategies(strategies: StrategyConfig[]): this;
  
  /** Set strategy history */
  setStrategyHistory(history: StrategyConfig[]): this;
  
  /** Set strategy max history */
  setStrategyMaxHistory(max: number): this;
  
  /** Set strategy auto switch */
  setStrategyAutoSwitch(autoSwitch: boolean): this;
  
  /** Set strategy switch conditions */
  setStrategySwitchConditions(conditions: any[]): this;
  
  /** Set strategy context */
  setStrategyContext(context: StrategyContext): this;
  
  /** Set strategy metadata */
  setStrategyMetadata(metadata: any): this;
  
  /** Get strategy type */
  getStrategyType(): StrategyType;
  
  /** Get strategy state */
  getStrategyState(): StrategyState;
  
  /** Get strategy manager */
  getStrategyManager(): any;
  
  /** Get strategy ID */
  getStrategyId(): string;
  
  /** Get strategy name */
  getStrategyName(): string;
  
  /** Get current strategy */
  getCurrentStrategy(): StrategyConfig | null;
  
  /** Get available strategies */
  getAvailableStrategies(): StrategyConfig[];
  
  /** Get strategy history */
  getStrategyHistory(): StrategyConfig[];
  
  /** Get strategy max history */
  getStrategyMaxHistory(): number;
  
  /** Get strategy auto switch */
  getStrategyAutoSwitch(): boolean;
  
  /** Get strategy switch conditions */
  getStrategySwitchConditions(): any[];
  
  /** Get strategy context */
  getStrategyContext(): StrategyContext;
  
  /** Get strategy metadata */
  getStrategyMetadata(): any;
  
  /** Add strategy */
  addStrategy(strategy: StrategyConfig): this;
  
  /** Remove strategy */
  removeStrategy(strategyName: string): this;
  
  /** Switch strategy */
  switchStrategy(strategyName: string): this;
  
  /** Execute strategy */
  executeStrategy(context: StrategyContext): any;
  
  /** Check switch conditions */
  checkSwitchConditions(): string | null;
  
  /** Add switch condition */
  addSwitchCondition(condition: any): this;
  
  /** Remove switch condition */
  removeSwitchCondition(conditionId: string): this;
  
  /** Clear strategy history */
  clearStrategyHistory(): this;
  
  /** Get strategy by name */
  getStrategyByName(name: string): StrategyConfig | null;
  
  /** Get strategy by type */
  getStrategiesByType(type: StrategyType): StrategyConfig[];
  
  /** Check if strategy exists */
  hasStrategy(name: string): boolean;
  
  /** Check if can switch */
  canSwitchStrategy(): boolean;
  
  /** Check if strategy is active */
  isStrategyActive(name: string): boolean;
  
  /** Update strategy */
  updateStrategy(deltaTime: number): void;
}
