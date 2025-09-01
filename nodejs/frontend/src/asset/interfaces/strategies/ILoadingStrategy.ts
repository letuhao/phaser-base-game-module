/**
 * Loading Strategy Interface
 * 
 * Defines loading strategy abstraction for different asset loading approaches.
 */

import type { IAsset } from '../IAsset';
import type { IAssetBundle } from '../IAssetBundle';
import type { LoadingProgress } from '../IAssetLoader';

/**
 * Loading strategy types
 */
export enum LoadingStrategyType {
  SEQUENTIAL = 'sequential',
  PARALLEL = 'parallel',
  PRIORITY_BASED = 'priority_based',
  LAZY = 'lazy',
  BATCH = 'batch',
  STREAMING = 'streaming',
  CUSTOM = 'custom'
}

/**
 * Loading strategy configuration
 */
export interface LoadingStrategyConfig {
  strategyType: LoadingStrategyType;
  maxConcurrentLoads: number;
  batchSize: number;
  priorityThreshold: number;
  enableRetry: boolean;
  retryAttempts: number;
  retryDelay: number;
  enableFallback: boolean;
  fallbackStrategy?: LoadingStrategyType;
  metadata?: Record<string, any>;
}

/**
 * Loading strategy result
 */
export interface LoadingStrategyResult {
  success: boolean;
  loadedAssets: IAsset[];
  failedAssets: IAsset[];
  loadingTime: number;
  strategyUsed: LoadingStrategyType;
  fallbackUsed?: boolean;
  metadata?: Record<string, any>;
}

/**
 * Interface for loading strategies
 */
export interface ILoadingStrategy {
  readonly strategyId: string;
  readonly strategyType: LoadingStrategyType;
  
  /** Strategy configuration */
  strategyConfig: LoadingStrategyConfig;
  
  /** Strategy metadata */
  strategyMetadata: Record<string, any>;
  
  /** Set strategy configuration */
  setStrategyConfig(config: LoadingStrategyConfig): this;
  
  /** Set strategy metadata */
  setStrategyMetadata(metadata: Record<string, any>): this;
  
  /** Get strategy configuration */
  getStrategyConfig(): LoadingStrategyConfig;
  
  /** Get strategy metadata */
  getStrategyMetadata(): Record<string, any>;
  
  /** Load assets using strategy */
  loadAssets(assets: IAsset[]): Promise<LoadingStrategyResult>;
  
  /** Load asset bundles using strategy */
  loadBundles(bundles: IAssetBundle[]): Promise<LoadingStrategyResult>;
  
  /** Load mixed assets and bundles */
  loadMixed(items: (IAsset | IAssetBundle)[]): Promise<LoadingStrategyResult>;
  
  /** Get loading progress */
  getLoadingProgress(): LoadingProgress;
  
  /** Check if strategy is supported */
  isStrategySupported(): boolean;
  
  /** Check if strategy is busy */
  isStrategyBusy(): boolean;
  
  /** Cancel loading */
  cancelLoading(): Promise<boolean>;
  
  /** Pause loading */
  pauseLoading(): Promise<boolean>;
  
  /** Resume loading */
  resumeLoading(): Promise<boolean>;
  
  /** Get strategy statistics */
  getStrategyStatistics(): {
    totalLoads: number;
    successfulLoads: number;
    failedLoads: number;
    averageLoadTime: number;
    successRate: number;
  };
  
  /** Update strategy */
  updateStrategy(deltaTime: number): void;
}
