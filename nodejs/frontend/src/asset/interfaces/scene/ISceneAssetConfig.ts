/**
 * Scene Asset Configuration Interface
 * 
 * Defines asset configuration for scenes, integrating with the Scene System.
 */

import type { IAsset } from '../IAsset';
import type { IAssetBundle } from '../IAssetBundle';
import type { AssetType, AssetPriority } from '../IAsset';
import type { BundleType } from '../IAssetBundle';
import { LoadingStrategy, SceneAssetPhase } from '../../enums';

/**
 * Scene asset configuration
 */
export interface SceneAssetConfig {
  sceneId: string;
  basePath: string;
  assets: Map<string, IAsset>;
  bundles: Map<string, IAssetBundle>;
  loading: {
    preload: boolean;
    priority: AssetPriority[];
    strategy: LoadingStrategy;
  };
  validation: {
    required: string[];
    optional: string[];
    fallbacks: Record<string, string>;
  };
  responsive: {
    breakpoints: Record<string, {
      assets: string[];
      bundles: string[];
    }>;
    defaultBreakpoint: string;
  };
  metadata?: Record<string, any>;
}

/**
 * Scene asset loading progress
 */
export interface SceneAssetProgress {
  totalAssets: number;
  loadedAssets: number;
  failedAssets: number;
  totalBundles: number;
  loadedBundles: number;
  failedBundles: number;
  percentage: number;
  estimatedTimeRemaining: number;
  currentPhase: SceneAssetPhase;
}

/**
 * Scene asset validation result
 */
export interface SceneAssetValidation {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  missingAssets: string[];
  missingBundles: string[];
  invalidAssets: string[];
  invalidBundles: string[];
}

/**
 * Interface for scene asset configuration
 */
export interface ISceneAssetConfig {
  readonly configId: string;
  readonly sceneId: string;
  
  /** Scene asset configuration */
  sceneAssetConfig: SceneAssetConfig;
  
  /** Loading progress */
  loadingProgress: SceneAssetProgress;
  
  /** Validation result */
  validationResult: SceneAssetValidation;
  
  /** Configuration metadata */
  configMetadata: Record<string, any>;
  
  /** Set scene asset configuration */
  setSceneAssetConfig(config: SceneAssetConfig): this;
  
  /** Set loading progress */
  setLoadingProgress(progress: SceneAssetProgress): this;
  
  /** Set validation result */
  setValidationResult(validation: SceneAssetValidation): this;
  
  /** Set configuration metadata */
  setConfigMetadata(metadata: Record<string, any>): this;
  
  /** Get scene asset configuration */
  getSceneAssetConfig(): SceneAssetConfig;
  
  /** Get loading progress */
  getLoadingProgress(): SceneAssetProgress;
  
  /** Get validation result */
  getValidationResult(): SceneAssetValidation;
  
  /** Get configuration metadata */
  getConfigMetadata(): Record<string, any>;
  
  /** Add asset */
  addAsset(asset: IAsset): this;
  
  /** Remove asset */
  removeAsset(assetKey: string): this;
  
  /** Get asset */
  getAsset(assetKey: string): IAsset | null;
  
  /** Get assets by type */
  getAssetsByType(assetType: AssetType): IAsset[];
  
  /** Add bundle */
  addBundle(bundle: IAssetBundle): this;
  
  /** Remove bundle */
  removeBundle(bundleId: string): this;
  
  /** Get bundle */
  getBundle(bundleId: string): IAssetBundle | null;
  
  /** Get bundles by type */
  getBundlesByType(bundleType: BundleType): IAssetBundle[];
  
  /** Get responsive assets for breakpoint */
  getResponsiveAssets(breakpoint: string): {
    assets: IAsset[];
    bundles: IAssetBundle[];
  };
  
  /** Validate configuration */
  validateConfiguration(): SceneAssetValidation;
  
  /** Check if asset is required */
  isAssetRequired(assetKey: string): boolean;
  
  /** Check if asset is optional */
  isAssetOptional(assetKey: string): boolean;
  
  /** Get asset fallback */
  getAssetFallback(assetKey: string): string | null;
  
  /** Get all asset keys */
  getAllAssetKeys(): string[];
  
  /** Get all bundle IDs */
  getAllBundleIds(): string[];
  
  /** Clone configuration */
  cloneConfiguration(): SceneAssetConfig;
  
  /** Export configuration */
  exportConfiguration(): string;
  
  /** Import configuration */
  importConfiguration(configData: string): this;
}
