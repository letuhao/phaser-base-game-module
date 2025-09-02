/**
 * Asset Manager Interface
 *
 * Defines the main asset manager that orchestrates asset loading, caching, and management.
 */

import type { IAsset } from './IAsset';
import type { IAssetBundle } from './IAssetBundle';
import type { IAssetFactory } from './factories/IAssetFactory';
import type { IAssetBundleFactory } from './factories/IAssetBundleFactory';
import type { IAssetCacheManager } from './managers/IAssetCacheManager';
import type { IAssetPoolManager } from './managers/IAssetPoolManager';
import type { IAssetValidationManager } from './managers/IAssetValidationManager';
import type { IAssetStatisticsManager } from './managers/IAssetStatisticsManager';
import type { AssetType, AssetPriority } from './IAsset';
import type { BundleType } from './IAssetBundle';

/**
 * Asset manager configuration
 */
export interface AssetManagerConfig {
  enableCaching: boolean;
  enablePooling: boolean;
  enableValidation: boolean;
  enableStatistics: boolean;
  maxCacheSize: number;
  maxPoolSize: number;
  defaultTimeout: number;
  retryAttempts: number;
  retryDelay: number;
  metadata?: Record<string, unknown>;
}

/**
 * Asset loading options
 */
export interface AssetLoadingOptions {
  priority?: AssetPriority;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
  validate?: boolean;
  cache?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Bundle loading options
 */
export interface BundleLoadingOptions {
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
  validate?: boolean;
  cache?: boolean;
  loadAssets?: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Asset manager statistics
 */
export interface AssetManagerStatistics {
  totalAssets: number;
  loadedAssets: number;
  failedAssets: number;
  cachedAssets: number;
  totalBundles: number;
  loadedBundles: number;
  failedBundles: number;
  cachedBundles: number;
  totalLoadTime: number;
  averageLoadTime: number;
  cacheHitRate: number;
  successRate: number;
  lastUpdateTime: number;
}

/**
 * Interface for asset managers
 */
export interface IAssetManager {
  readonly managerId: string;

  /** Manager configuration */
  managerConfig: AssetManagerConfig;

  /** Asset factory */
  assetFactory: IAssetFactory;

  /** Bundle factory */
  bundleFactory: IAssetBundleFactory;

  /** Cache manager */
  cacheManager: IAssetCacheManager;

  /** Pool manager */
  poolManager: IAssetPoolManager;

  /** Validation manager */
  validationManager: IAssetValidationManager;

  /** Statistics manager */
  statisticsManager: IAssetStatisticsManager;

  /** Manager metadata */
  managerMetadata: Record<string, unknown>;

  /** Set manager configuration */
  setManagerConfig(config: AssetManagerConfig): this;

  /** Set asset factory */
  setAssetFactory(factory: IAssetFactory): this;

  /** Set bundle factory */
  setBundleFactory(factory: IAssetBundleFactory): this;

  /** Set cache manager */
  setCacheManager(manager: IAssetCacheManager): this;

  /** Set pool manager */
  setPoolManager(manager: IAssetPoolManager): this;

  /** Set validation manager */
  setValidationManager(manager: IAssetValidationManager): this;

  /** Set statistics manager */
  setStatisticsManager(manager: IAssetStatisticsManager): this;

  /** Set manager metadata */
  setManagerMetadata(metadata: Record<string, unknown>): this;

  /** Get manager configuration */
  getManagerConfig(): AssetManagerConfig;

  /** Get asset factory */
  getAssetFactory(): IAssetFactory;

  /** Get bundle factory */
  getBundleFactory(): IAssetBundleFactory;

  /** Get cache manager */
  getCacheManager(): IAssetCacheManager;

  /** Get pool manager */
  getPoolManager(): IAssetPoolManager;

  /** Get validation manager */
  getValidationManager(): IAssetValidationManager;

  /** Get statistics manager */
  getStatisticsManager(): IAssetStatisticsManager;

  /** Get manager metadata */
  getManagerMetadata(): Record<string, unknown>;

  /** Load asset */
  loadAsset(assetKey: string, options?: AssetLoadingOptions): Promise<IAsset | null>;

  /** Load assets by type */
  loadAssetsByType(assetType: AssetType, options?: AssetLoadingOptions): Promise<IAsset[]>;

  /** Load assets by priority */
  loadAssetsByPriority(priority: AssetPriority, options?: AssetLoadingOptions): Promise<IAsset[]>;

  /** Load bundle */
  loadBundle(bundleId: string, options?: BundleLoadingOptions): Promise<IAssetBundle | null>;

  /** Load bundles by type */
  loadBundlesByType(
    bundleType: BundleType,
    options?: BundleLoadingOptions
  ): Promise<IAssetBundle[]>;

  /** Unload asset */
  unloadAsset(assetKey: string): Promise<boolean>;

  /** Unload bundle */
  unloadBundle(bundleId: string): Promise<boolean>;

  /** Get asset */
  getAsset(assetKey: string): IAsset | null;

  /** Get bundle */
  getBundle(bundleId: string): IAssetBundle | null;

  /** Get all assets */
  getAllAssets(): IAsset[];

  /** Get all bundles */
  getAllBundles(): IAssetBundle[];

  /** Get assets by type */
  getAssetsByType(assetType: AssetType): IAsset[];

  /** Get assets by priority */
  getAssetsByPriority(priority: AssetPriority): IAsset[];

  /** Get bundles by type */
  getBundlesByType(bundleType: BundleType): IAssetBundle[];

  /** Check if asset is loaded */
  isAssetLoaded(assetKey: string): boolean;

  /** Check if bundle is loaded */
  isBundleLoaded(bundleId: string): boolean;

  /** Check if asset is cached */
  isAssetCached(assetKey: string): boolean;

  /** Check if bundle is cached */
  isBundleCached(bundleId: string): boolean;

  /** Validate asset */
  validateAsset(asset: IAsset): boolean;

  /** Validate bundle */
  validateBundle(bundle: IAssetBundle): boolean;

  /** Get manager statistics */
  getManagerStatistics(): AssetManagerStatistics;

  /** Clear manager */
  clearManager(): this;

  /** Update manager */
  updateManager(deltaTime: number): void;
}
