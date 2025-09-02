/**
 * Scene Asset Loader Interface
 *
 * Defines scene-specific asset loading functionality that integrates with the Scene System.
 */

import type { IAsset } from '../IAsset';
import type { IAssetBundle } from '../IAssetBundle';
import type { IAssetManager } from '../IAssetManager';

import type { ISceneAssetConfigData } from './ISceneAssetConfigData';
import type { AssetType, AssetPriority } from '../IAsset';
import type { BundleType } from '../IAssetBundle';
import type { SceneAssetProgress, SceneAssetValidation } from './ISceneAssetConfig';

/**
 * Scene loading phases
 */
export enum SceneLoadingPhase {
  INITIALIZATION = 'initialization',
  ASSET_LOADING = 'asset_loading',
  BUNDLE_LOADING = 'bundle_loading',
  VALIDATION = 'validation',
  OPTIMIZATION = 'optimization',
  COMPLETION = 'completion',
}

/**
 * Scene loading states
 */
export enum SceneLoadingState {
  PENDING = 'pending',
  LOADING = 'loading',
  VALIDATING = 'validating',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

/**
 * Scene loading configuration
 */
export interface SceneLoadingConfig {
  enablePreloading: boolean;
  enableValidation: boolean;
  enableOptimization: boolean;
  maxConcurrentLoads: number;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  metadata?: Record<string, any>;
}

/**
 * Interface for scene asset loaders
 */
export interface ISceneAssetLoader {
  readonly loaderId: string;
  readonly sceneId: string;

  /** Scene loading state */
  loadingState: SceneLoadingState;

  /** Current loading phase */
  currentPhase: SceneLoadingPhase;

  /** Loading configuration */
  loadingConfig: SceneLoadingConfig;

  /** Asset manager */
  assetManager: IAssetManager;

  /** Scene asset configuration */
  sceneAssetConfig: ISceneAssetConfigData;

  /** Loading progress */
  loadingProgress: SceneAssetProgress;

  /** Validation result */
  validationResult: SceneAssetValidation;

  /** Loader metadata */
  loaderMetadata: Record<string, any>;

  /** Set loading state */
  setLoadingState(state: SceneLoadingState): this;

  /** Set current phase */
  setCurrentPhase(phase: SceneLoadingPhase): this;

  /** Set loading configuration */
  setLoadingConfig(config: SceneLoadingConfig): this;

  /** Set asset manager */
  setAssetManager(manager: IAssetManager): this;

  /** Set scene asset configuration */
  setSceneAssetConfig(config: ISceneAssetConfigData): this;

  /** Set loading progress */
  setLoadingProgress(progress: SceneAssetProgress): this;

  /** Set validation result */
  setValidationResult(validation: SceneAssetValidation): this;

  /** Set loader metadata */
  setLoaderMetadata(metadata: Record<string, any>): this;

  /** Get loading state */
  getLoadingState(): SceneLoadingState;

  /** Get current phase */
  getCurrentPhase(): SceneLoadingPhase;

  /** Get loading configuration */
  getLoadingConfig(): SceneLoadingConfig;

  /** Get asset manager */
  getAssetManager(): IAssetManager;

  /** Get scene asset configuration */
  getSceneAssetConfig(): ISceneAssetConfigData;

  /** Get loader ID */
  getLoaderId(): string;

  /** Get scene ID */
  getSceneId(): string;

  /** Get loading progress */
  getLoadingProgress(): SceneAssetProgress;

  /** Get validation result */
  getValidationResult(): SceneAssetValidation;

  /** Get loader metadata */
  getLoaderMetadata(): Record<string, any>;

  /** Load scene assets */
  loadSceneAssets(): Promise<boolean>;

  /** Load scene assets for breakpoint */
  loadSceneAssetsForBreakpoint(breakpoint: string): Promise<boolean>;

  /** Load required assets */
  loadRequiredAssets(): Promise<boolean>;

  /** Load optional assets */
  loadOptionalAssets(): Promise<boolean>;

  /** Load asset by key */
  loadAsset(assetKey: string): Promise<IAsset | null>;

  /** Load assets by type */
  loadAssetsByType(assetType: AssetType): Promise<IAsset[]>;

  /** Load assets by priority */
  loadAssetsByPriority(priority: AssetPriority): Promise<IAsset[]>;

  /** Load bundle by ID */
  loadBundle(bundleId: string): Promise<IAssetBundle | null>;

  /** Load bundles by type */
  loadBundlesByType(bundleType: BundleType): Promise<IAssetBundle[]>;

  /** Unload scene assets */
  unloadSceneAssets(): Promise<boolean>;

  /** Unload asset */
  unloadAsset(assetKey: string): Promise<boolean>;

  /** Unload bundle */
  unloadBundle(bundleId: string): Promise<boolean>;

  /** Validate scene assets */
  validateSceneAssets(): Promise<SceneAssetValidation>;

  /** Optimize scene assets */
  optimizeSceneAssets(): Promise<boolean>;

  /** Cancel loading */
  cancelLoading(): Promise<boolean>;

  /** Pause loading */
  pauseLoading(): Promise<boolean>;

  /** Resume loading */
  resumeLoading(): Promise<boolean>;

  /** Check if loading is complete */
  isLoadingComplete(): boolean;

  /** Check if loading failed */
  isLoadingFailed(): boolean;

  /** Check if asset is loaded */
  isAssetLoaded(assetKey: string): boolean;

  /** Check if bundle is loaded */
  isBundleLoaded(bundleId: string): boolean;

  /** Get loaded assets count */
  getLoadedAssetsCount(): number;

  /** Get loaded bundles count */
  getLoadedBundlesCount(): number;

  /** Get failed assets count */
  getFailedAssetsCount(): number;

  /** Get failed bundles count */
  getFailedBundlesCount(): number;

  /** Clear loader */
  clearLoader(): this;

  /** Update loader */
  updateLoader(deltaTime: number): void;
}
