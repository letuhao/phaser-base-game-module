/**
 * Asset Manager Interface
 *
 * Defines asset management functionality including caching, pooling, and lifecycle management.
 */

import type { IAsset } from './IAsset';
import type { IAssetBundle } from './IAssetBundle';
import type { IAssetLoader } from './IAssetLoader';
import type { IAssetCacheManager } from './managers/IAssetCacheManager';
import type { IAssetPoolManager } from './managers/IAssetPoolManager';
import type { IAssetValidationManager } from './managers/IAssetValidationManager';
import type { IAssetStatisticsManager } from './managers/IAssetStatisticsManager';
import type { AssetType, AssetPriority } from './IAsset';
import type { BundleType } from './IAssetBundle';
// ManagerOperation is imported from centralized enums but not used in this file

// ManagerOperation is now imported from centralized enums

/**
 * Manager configuration
 */
export interface ManagerConfig {
  enableCaching: boolean;
  enablePooling: boolean;
  enableValidation: boolean;
  enableStatistics: boolean;
  autoCleanup: boolean;
  cleanupInterval: number;
  metadata?: Record<string, any>;
}

/**
 * Manager statistics
 */
export interface ManagerStatistics {
  totalAssets: number;
  loadedAssets: number;
  failedAssets: number;
  totalBundles: number;
  loadedBundles: number;
  totalSize: number;
  lastCleanupTime: number;
}

/**
 * Interface for asset managers
 */
export interface IAssetManager {
  readonly managerId: string;

  /** Manager configuration */
  managerConfig: ManagerConfig;

  /** Asset loader */
  assetLoader: IAssetLoader;

  /** Cache manager */
  cacheManager: IAssetCacheManager;

  /** Pool manager */
  poolManager: IAssetPoolManager;

  /** Validation manager */
  validationManager: IAssetValidationManager;

  /** Statistics manager */
  statisticsManager: IAssetStatisticsManager;

  /** Managed assets */
  managedAssets: Map<string, IAsset>;

  /** Asset bundles */
  assetBundles: Map<string, IAssetBundle>;

  /** Manager statistics */
  managerStatistics: ManagerStatistics;

  /** Manager metadata */
  managerMetadata: Record<string, any>;

  /** Set manager configuration */
  setManagerConfig(config: ManagerConfig): this;

  /** Set asset loader */
  setAssetLoader(loader: IAssetLoader): this;

  /** Set cache manager */
  setCacheManager(manager: IAssetCacheManager): this;

  /** Set pool manager */
  setPoolManager(manager: IAssetPoolManager): this;

  /** Set validation manager */
  setValidationManager(manager: IAssetValidationManager): this;

  /** Set statistics manager */
  setStatisticsManager(manager: IAssetStatisticsManager): this;

  /** Set manager metadata */
  setManagerMetadata(metadata: Record<string, any>): this;

  /** Get manager configuration */
  getManagerConfig(): ManagerConfig;

  /** Get asset loader */
  getAssetLoader(): IAssetLoader;

  /** Get cache manager */
  getCacheManager(): IAssetCacheManager;

  /** Get pool manager */
  getPoolManager(): IAssetPoolManager;

  /** Get validation manager */
  getValidationManager(): IAssetValidationManager;

  /** Get statistics manager */
  getStatisticsManager(): IAssetStatisticsManager;

  /** Get managed assets */
  getManagedAssets(): Map<string, IAsset>;

  /** Get asset bundles */
  getAssetBundles(): Map<string, IAssetBundle>;

  /** Get manager statistics */
  getManagerStatistics(): ManagerStatistics;

  /** Get manager metadata */
  getManagerMetadata(): Record<string, any>;

  /** Register asset */
  registerAsset(asset: IAsset): this;

  /** Unregister asset */
  unregisterAsset(assetKey: string): this;

  /** Get asset by key */
  getAsset(assetKey: string): IAsset | null;

  /** Get assets by type */
  getAssetsByType(assetType: AssetType): IAsset[];

  /** Get assets by priority */
  getAssetsByPriority(priority: AssetPriority): IAsset[];

  /** Load asset */
  loadAsset(assetKey: string): Promise<IAsset | null>;

  /** Load assets */
  loadAssets(assetKeys: string[]): Promise<IAsset[]>;

  /** Unload asset */
  unloadAsset(assetKey: string): Promise<boolean>;

  /** Unload assets */
  unloadAssets(assetKeys: string[]): Promise<boolean>;

  /** Cache asset */
  cacheAsset(asset: IAsset): Promise<boolean>;

  /** Uncache asset */
  uncacheAsset(assetKey: string): Promise<boolean>;

  /** Get cached asset */
  getCachedAsset(assetKey: string): Promise<IAsset | null>;

  /** Register bundle */
  registerBundle(bundle: IAssetBundle): this;

  /** Unregister bundle */
  unregisterBundle(bundleId: string): this;

  /** Get bundle by ID */
  getBundle(bundleId: string): IAssetBundle | null;

  /** Get bundles by type */
  getBundlesByType(bundleType: BundleType): IAssetBundle[];

  /** Load bundle */
  loadBundle(bundleId: string): Promise<IAssetBundle | null>;

  /** Load bundles */
  loadBundles(bundleIds: string[]): Promise<IAssetBundle[]>;

  /** Unload bundle */
  unloadBundle(bundleId: string): Promise<boolean>;

  /** Unload bundles */
  unloadBundles(bundleIds: string[]): Promise<boolean>;

  /** Check if asset exists */
  hasAsset(assetKey: string): boolean;

  /** Check if asset is loaded */
  isAssetLoaded(assetKey: string): boolean;

  /** Check if asset is cached */
  isAssetCached(assetKey: string): Promise<boolean>;

  /** Check if bundle exists */
  hasBundle(bundleId: string): boolean;

  /** Check if bundle is loaded */
  isBundleLoaded(bundleId: string): boolean;

  /** Validate asset */
  validateAsset(asset: IAsset): Promise<boolean>;

  /** Validate bundle */
  validateBundle(bundle: IAssetBundle): Promise<boolean>;

  /** Optimize cache */
  optimizeCache(): Promise<this>;

  /** Cleanup cache */
  cleanupCache(): Promise<this>;

  /** Clear all assets */
  clearAllAssets(): Promise<this>;

  /** Clear all bundles */
  clearAllBundles(): Promise<this>;

  /** Update manager */
  updateManager(deltaTime: number): void;
}
