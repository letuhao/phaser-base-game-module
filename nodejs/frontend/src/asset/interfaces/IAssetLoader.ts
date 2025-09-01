/**
 * Asset Loader Interface
 * 
 * Defines asset loading functionality with support for different loading strategies.
 */

import type { IAsset } from './IAsset';
import type { IAssetBundle } from './IAssetBundle';
import type { AssetType, AssetPriority, AssetState } from './IAsset';
import type { BundleType, BundleState } from './IAssetBundle';

/**
 * Loader types
 */
export enum LoaderType {
  HTTP = 'http',
  FETCH = 'fetch',
  XHR = 'xhr',
  WEBSOCKET = 'websocket',
  CUSTOM = 'custom'
}

/**
 * Loader states
 */
export enum LoaderState {
  IDLE = 'idle',
  LOADING = 'loading',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  ERROR = 'error',
  CANCELLED = 'cancelled'
}

/**
 * Loading strategy
 */
export enum LoadingStrategy {
  SEQUENTIAL = 'sequential',
  PARALLEL = 'parallel',
  PRIORITY_BASED = 'priority_based',
  LAZY = 'lazy',
  CUSTOM = 'custom'
}

/**
 * Loader configuration
 */
export interface LoaderConfig {
  loaderType: LoaderType;
  loadingStrategy: LoadingStrategy;
  maxConcurrentLoads: number;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  enableCaching: boolean;
  enableCompression: boolean;
  metadata?: Record<string, any>;
}

/**
 * Loading progress
 */
export interface LoadingProgress {
  totalItems: number;
  loadedItems: number;
  failedItems: number;
  percentage: number;
  estimatedTimeRemaining: number;
  currentItem?: string;
}

/**
 * Interface for asset loaders
 */
export interface IAssetLoader {
  readonly loaderId: string;
  readonly loaderType: LoaderType;
  
  /** Loader state */
  loaderState: LoaderState;
  
  /** Loader configuration */
  loaderConfig: LoaderConfig;
  
  /** Loading progress */
  loadingProgress: LoadingProgress;
  
  /** Loader metadata */
  loaderMetadata: Record<string, any>;
  
  /** Set loader state */
  setLoaderState(state: LoaderState): this;
  
  /** Set loader configuration */
  setLoaderConfig(config: LoaderConfig): this;
  
  /** Set loading progress */
  setLoadingProgress(progress: LoadingProgress): this;
  
  /** Set loader metadata */
  setLoaderMetadata(metadata: Record<string, any>): this;
  
  /** Get loader state */
  getLoaderState(): LoaderState;
  
  /** Get loader configuration */
  getLoaderConfig(): LoaderConfig;
  
  /** Get loading progress */
  getLoadingProgress(): LoadingProgress;
  
  /** Get loader metadata */
  getLoaderMetadata(): Record<string, any>;
  
  /** Load single asset */
  loadAsset(asset: IAsset): Promise<IAsset>;
  
  /** Load asset bundle */
  loadBundle(bundle: IAssetBundle): Promise<IAssetBundle>;
  
  /** Load multiple assets */
  loadAssets(assets: IAsset[]): Promise<IAsset[]>;
  
  /** Unload asset */
  unloadAsset(asset: IAsset): Promise<boolean>;
  
  /** Unload bundle */
  unloadBundle(bundle: IAssetBundle): Promise<boolean>;
  
  /** Cancel loading */
  cancelLoading(): Promise<boolean>;
  
  /** Pause loading */
  pauseLoading(): Promise<boolean>;
  
  /** Resume loading */
  resumeLoading(): Promise<boolean>;
  
  /** Check if loader is busy */
  isLoaderBusy(): boolean;
  
  /** Check if loader is paused */
  isLoaderPaused(): boolean;
  
  /** Get loaded assets count */
  getLoadedAssetsCount(): number;
  
  /** Get failed assets count */
  getFailedAssetsCount(): number;
  
  /** Clear loader */
  clearLoader(): this;
  
  /** Update loader */
  updateLoader(deltaTime: number): void;
}
