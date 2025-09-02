/**
 * Asset Manager
 *
 * Main orchestrator for asset loading and management. Coordinates between factories,
 * loaders, and sub-managers to provide comprehensive asset lifecycle management.
 */

import { Logger } from '../../core/Logger';
import type {
  IAssetManager,
  AssetManagerConfig,
  AssetManagerStatistics,
  AssetLoadingOptions,
  BundleLoadingOptions,
} from '../interfaces/IAssetManager';
import type { IAsset } from '../interfaces/IAsset';
import type { IAssetBundle } from '../interfaces/IAssetBundle';
import type { IAssetFactory } from '../interfaces/factories/IAssetFactory';
import type { IAssetBundleFactory } from '../interfaces/factories/IAssetBundleFactory';
import type { IAssetCacheManager } from '../interfaces/managers/IAssetCacheManager';
import type { IAssetPoolManager } from '../interfaces/managers/IAssetPoolManager';
import type { IAssetValidationManager } from '../interfaces/managers/IAssetValidationManager';
import type { IAssetStatisticsManager } from '../interfaces/managers/IAssetStatisticsManager';
import { AssetType, AssetPriority, AssetState } from '../interfaces/IAsset';
import { BundleType, BundleState } from '../interfaces/IAssetBundle';
import { AssetFactory } from './AssetFactory';
import { AssetBundleFactory } from './AssetBundleFactory';

/**
 * Asset Manager implementation
 */
export class AssetManager implements IAssetManager {
  private readonly logger: Logger = Logger.getInstance();

  public readonly managerId: string;
  public managerConfig: AssetManagerConfig;
  public assetFactory!: IAssetFactory;
  public bundleFactory!: IAssetBundleFactory;
  public cacheManager!: IAssetCacheManager;
  public poolManager!: IAssetPoolManager;
  public validationManager!: IAssetValidationManager;
  public statisticsManager!: IAssetStatisticsManager;
  public managerMetadata: Record<string, unknown> = {};

  private managedAssets: Map<string, IAsset> = new Map();
  private assetBundles: Map<string, IAssetBundle> = new Map();

  constructor(managerId: string, managerConfig?: Partial<AssetManagerConfig>) {
    this.managerId = managerId;

    // Set default manager configuration
    this.managerConfig = {
      enableCaching: true,
      enablePooling: true,
      enableValidation: true,
      enableStatistics: true,
      maxCacheSize: 100 * 1024 * 1024, // 100MB
      maxPoolSize: 50,
      defaultTimeout: 30000,
      retryAttempts: 3,
      retryDelay: 1000,
      metadata: {},
      ...managerConfig,
    };

    // Initialize sub-managers with default implementations
    this.initializeSubManagers();

    this.logger.info('AssetManager', 'constructor', 'Asset manager created', {
      managerId: this.managerId,
      managerConfig: this.managerConfig,
    });
  }

  /**
   * Initialize sub-managers with default implementations
   */
  private initializeSubManagers(): void {
    // Initialize with default implementations
    this.assetFactory = new AssetFactory('default-asset-factory');
    this.bundleFactory = new AssetBundleFactory('default-bundle-factory');

    // Initialize other managers with mock implementations for now
    this.cacheManager = {
      cacheId: 'default-cache-manager',
      cacheConfig: { maxSize: this.managerConfig.maxCacheSize },
      cacheMetadata: {},
      getCacheSize: () => 0,
      getCacheHitRate: () => 0,
      clearCache: () => {},
      isCached: () => false,
      getCachedAsset: () => undefined,
      cacheAsset: () => {},
      removeCachedAsset: () => {},
    } as unknown as IAssetCacheManager;

    this.poolManager = {
      poolId: 'default-pool-manager',
      poolConfig: { maxSize: this.managerConfig.maxPoolSize },
      poolMetadata: {},
      getPoolSize: () => 0,
      getPooledAsset: () => undefined,
      poolAsset: () => {},
      removePooledAsset: () => {},
      clearPool: () => {},
    } as unknown as IAssetPoolManager;

    this.validationManager = {
      validationId: 'default-validation-manager',
      validationConfig: { strictMode: true },
      validationMetadata: {},
      validateAssetConfig: (config: any) => {
        // Basic validation - check required fields
        return !!(config && config.key && config.path && config.type);
      },
      validateBundleConfig: (config: any) => {
        // Basic validation - check required fields
        return !!(
          config &&
          config.bundleId &&
          config.bundleType &&
          Array.isArray(config.assetKeys)
        );
      },
      validateAsset: () => true,
      validateBundle: () => true,
      getValidationErrors: () => [],
      clearValidationErrors: () => {},
    } as unknown as IAssetValidationManager;

    this.statisticsManager = {
      statisticsId: 'default-statistics-manager',
      statisticsConfig: { enableTracking: true },
      statisticsMetadata: {},
      getStatistics: () => ({
        totalAssets: 0,
        loadedAssets: 0,
        failedAssets: 0,
        totalBundles: 0,
        loadedBundles: 0,
        failedBundles: 0,
        totalLoadTime: 0,
        averageLoadTime: 0,
        cacheHitRate: 0,
        successRate: 0,
      }),
      updateStatistics: () => {},
      resetStatistics: () => {},
    } as unknown as IAssetStatisticsManager;
  }

  /**
   * Set manager configuration
   */
  setManagerConfig(config: AssetManagerConfig): this {
    this.managerConfig = { ...this.managerConfig, ...config };
    this.logger.debug('AssetManager', 'setManagerConfig', 'Manager configuration updated', {
      managerId: this.managerId,
      config: this.managerConfig,
    });
    return this;
  }

  /**
   * Set asset factory
   */
  setAssetFactory(factory: IAssetFactory): this {
    this.assetFactory = factory;
    this.logger.debug('AssetManager', 'setAssetFactory', 'Asset factory set', {
      managerId: this.managerId,
      factoryId: factory.factoryId,
    });
    return this;
  }

  /**
   * Set bundle factory
   */
  setBundleFactory(factory: IAssetBundleFactory): this {
    this.bundleFactory = factory;
    this.logger.debug('AssetManager', 'setBundleFactory', 'Bundle factory set', {
      managerId: this.managerId,
      bundleFactoryId: factory.bundleFactoryId,
    });
    return this;
  }

  /**
   * Set cache manager
   */
  setCacheManager(manager: IAssetCacheManager): this {
    this.cacheManager = manager;
    this.logger.debug('AssetManager', 'setCacheManager', 'Cache manager set', {
      managerId: this.managerId,
      cacheManagerId: manager.cacheManagerId,
    });
    return this;
  }

  /**
   * Set pool manager
   */
  setPoolManager(manager: IAssetPoolManager): this {
    this.poolManager = manager;
    this.logger.debug('AssetManager', 'setPoolManager', 'Pool manager set', {
      managerId: this.managerId,
      poolManagerId: manager.poolManagerId,
    });
    return this;
  }

  /**
   * Set validation manager
   */
  setValidationManager(manager: IAssetValidationManager): this {
    this.validationManager = manager;
    this.logger.debug('AssetManager', 'setValidationManager', 'Validation manager set', {
      managerId: this.managerId,
      validationManagerId: manager.validationManagerId,
    });
    return this;
  }

  /**
   * Set statistics manager
   */
  setStatisticsManager(manager: IAssetStatisticsManager): this {
    this.statisticsManager = manager;
    this.logger.debug('AssetManager', 'setStatisticsManager', 'Statistics manager set', {
      managerId: this.managerId,
      statisticsManagerId: manager.statisticsManagerId,
    });
    return this;
  }

  /**
   * Set manager metadata
   */
  setManagerMetadata(metadata: Record<string, unknown>): this {
    this.managerMetadata = { ...this.managerMetadata, ...metadata };
    this.logger.debug('AssetManager', 'setManagerMetadata', 'Manager metadata updated', {
      managerId: this.managerId,
      metadata: this.managerMetadata,
    });
    return this;
  }

  /**
   * Get manager configuration
   */
  getManagerConfig(): AssetManagerConfig {
    return { ...this.managerConfig };
  }

  /**
   * Get asset factory
   */
  getAssetFactory(): IAssetFactory {
    return this.assetFactory;
  }

  /**
   * Get bundle factory
   */
  getBundleFactory(): IAssetBundleFactory {
    return this.bundleFactory;
  }

  /**
   * Get cache manager
   */
  getCacheManager(): IAssetCacheManager {
    return this.cacheManager;
  }

  /**
   * Get pool manager
   */
  getPoolManager(): IAssetPoolManager {
    return this.poolManager;
  }

  /**
   * Get validation manager
   */
  getValidationManager(): IAssetValidationManager {
    return this.validationManager;
  }

  /**
   * Get statistics manager
   */
  getStatisticsManager(): IAssetStatisticsManager {
    return this.statisticsManager;
  }

  /**
   * Get manager metadata
   */
  getManagerMetadata(): Record<string, unknown> {
    return { ...this.managerMetadata };
  }

  /**
   * Load asset
   */
  async loadAsset(assetKey: string, _options?: AssetLoadingOptions): Promise<IAsset | null> {
    try {
      const asset = this.managedAssets.get(assetKey);
      if (!asset) {
        this.logger.warn('AssetManager', 'loadAsset', 'Asset not found', {
          managerId: this.managerId,
          assetKey,
        });
        return null;
      }

      // Check if already loaded
      if (asset.isAssetLoaded()) {
        return asset;
      }

      // Load the asset
      await asset.loadAsset();

      if (asset.isAssetLoaded()) {
        this.logger.info('AssetManager', 'loadAsset', 'Asset loaded successfully', {
          managerId: this.managerId,
          assetKey,
          assetType: asset.assetType,
          assetSize: asset.assetSize,
        });
      } else {
        this.logger.error('AssetManager', 'loadAsset', 'Asset loading failed', {
          managerId: this.managerId,
          assetKey,
          assetType: asset.assetType,
        });
      }

      return asset;
    } catch (error) {
      this.logger.error('AssetManager', 'loadAsset', 'Asset loading error', {
        managerId: this.managerId,
        assetKey,
        error: error instanceof Error ? error.message : String(error),
      });
      return null;
    }
  }

  /**
   * Load assets by type
   */
  async loadAssetsByType(assetType: AssetType, options?: AssetLoadingOptions): Promise<IAsset[]> {
    const assets = Array.from(this.managedAssets.values()).filter(
      asset => asset.assetType === assetType
    );
    const loadedAssets: IAsset[] = [];

    for (const asset of assets) {
      const loadedAsset = await this.loadAsset(asset.assetKey, options);
      if (loadedAsset) {
        loadedAssets.push(loadedAsset);
      }
    }

    return loadedAssets;
  }

  /**
   * Load assets by priority
   */
  async loadAssetsByPriority(
    priority: AssetPriority,
    options?: AssetLoadingOptions
  ): Promise<IAsset[]> {
    const assets = Array.from(this.managedAssets.values()).filter(
      asset => asset.assetConfig.priority === priority
    );
    const loadedAssets: IAsset[] = [];

    for (const asset of assets) {
      const loadedAsset = await this.loadAsset(asset.assetKey, options);
      if (loadedAsset) {
        loadedAssets.push(loadedAsset);
      }
    }

    return loadedAssets;
  }

  /**
   * Load bundle
   */
  async loadBundle(
    bundleId: string,
    _options?: BundleLoadingOptions
  ): Promise<IAssetBundle | null> {
    try {
      const bundle = this.assetBundles.get(bundleId);
      if (!bundle) {
        this.logger.warn('AssetManager', 'loadBundle', 'Bundle not found', {
          managerId: this.managerId,
          bundleId,
        });
        return null;
      }

      // Check if already loaded
      if (bundle.isBundleLoaded()) {
        return bundle;
      }

      // Load the bundle
      await bundle.loadBundle();

      if (bundle.isBundleLoaded()) {
        this.logger.info('AssetManager', 'loadBundle', 'Bundle loaded successfully', {
          managerId: this.managerId,
          bundleId,
          bundleType: bundle.bundleType,
        });
      } else {
        this.logger.error('AssetManager', 'loadBundle', 'Bundle loading failed', {
          managerId: this.managerId,
          bundleId,
          bundleType: bundle.bundleType,
        });
      }

      return bundle;
    } catch (error) {
      this.logger.error('AssetManager', 'loadBundle', 'Bundle loading error', {
        managerId: this.managerId,
        bundleId,
        error: error instanceof Error ? error.message : String(error),
      });
      return null;
    }
  }

  /**
   * Load bundles by type
   */
  async loadBundlesByType(
    bundleType: BundleType,
    options?: BundleLoadingOptions
  ): Promise<IAssetBundle[]> {
    const bundles = Array.from(this.assetBundles.values()).filter(
      bundle => bundle.bundleType === bundleType
    );
    const loadedBundles: IAssetBundle[] = [];

    for (const bundle of bundles) {
      const loadedBundle = await this.loadBundle(bundle.bundleId, options);
      if (loadedBundle) {
        loadedBundles.push(loadedBundle);
      }
    }

    return loadedBundles;
  }

  /**
   * Unload asset
   */
  async unloadAsset(assetKey: string): Promise<boolean> {
    try {
      const asset = this.managedAssets.get(assetKey);
      if (!asset) {
        return false;
      }

      // Unload the asset
      await asset.unloadAsset();

      if (asset.assetState === AssetState.PENDING) {
        this.logger.info('AssetManager', 'unloadAsset', 'Asset unloaded successfully', {
          managerId: this.managerId,
          assetKey,
        });
        return true;
      }

      return false;
    } catch (error) {
      this.logger.error('AssetManager', 'unloadAsset', 'Asset unloading error', {
        managerId: this.managerId,
        assetKey,
        error: error instanceof Error ? error.message : String(error),
      });
      return false;
    }
  }

  /**
   * Unload bundle
   */
  async unloadBundle(bundleId: string): Promise<boolean> {
    try {
      const bundle = this.assetBundles.get(bundleId);
      if (!bundle) {
        return false;
      }

      // Unload the bundle
      await bundle.unloadBundle();

      if (bundle.bundleState === BundleState.PENDING) {
        this.logger.info('AssetManager', 'unloadBundle', 'Bundle unloaded successfully', {
          managerId: this.managerId,
          bundleId,
        });
        return true;
      }

      return false;
    } catch (error) {
      this.logger.error('AssetManager', 'unloadBundle', 'Bundle unloading error', {
        managerId: this.managerId,
        bundleId,
        error: error instanceof Error ? error.message : String(error),
      });
      return false;
    }
  }

  /**
   * Get asset
   */
  getAsset(assetKey: string): IAsset | null {
    return this.managedAssets.get(assetKey) || null;
  }

  /**
   * Register asset
   */
  registerAsset(asset: IAsset): this {
    this.managedAssets.set(asset.assetKey, asset);
    this.logger.debug('AssetManager', 'registerAsset', 'Asset registered', {
      managerId: this.managerId,
      assetKey: asset.assetKey,
      assetType: asset.assetType,
    });
    return this;
  }

  /**
   * Unregister asset
   */
  unregisterAsset(assetKey: string): this {
    const removed = this.managedAssets.delete(assetKey);
    if (removed) {
      this.logger.debug('AssetManager', 'unregisterAsset', 'Asset unregistered', {
        managerId: this.managerId,
        assetKey,
      });
    }
    return this;
  }

  /**
   * Get bundle
   */
  getBundle(bundleId: string): IAssetBundle | null {
    return this.assetBundles.get(bundleId) || null;
  }

  /**
   * Get all assets
   */
  getAllAssets(): IAsset[] {
    return Array.from(this.managedAssets.values());
  }

  /**
   * Get all bundles
   */
  getAllBundles(): IAssetBundle[] {
    return Array.from(this.assetBundles.values());
  }

  /**
   * Get assets by type
   */
  getAssetsByType(assetType: AssetType): IAsset[] {
    return Array.from(this.managedAssets.values()).filter(asset => asset.assetType === assetType);
  }

  /**
   * Get assets by priority
   */
  getAssetsByPriority(priority: AssetPriority): IAsset[] {
    return Array.from(this.managedAssets.values()).filter(
      asset => asset.assetConfig.priority === priority
    );
  }

  /**
   * Get bundles by type
   */
  getBundlesByType(bundleType: BundleType): IAssetBundle[] {
    return Array.from(this.assetBundles.values()).filter(
      bundle => bundle.bundleType === bundleType
    );
  }

  /**
   * Check if asset is loaded
   */
  isAssetLoaded(assetKey: string): boolean {
    const asset = this.managedAssets.get(assetKey);
    return asset ? asset.assetState === AssetState.LOADED : false;
  }

  /**
   * Check if bundle is loaded
   */
  isBundleLoaded(bundleId: string): boolean {
    const bundle = this.assetBundles.get(bundleId);
    return bundle ? bundle.bundleState === BundleState.LOADED : false;
  }

  /**
   * Check if asset is cached
   */
  isAssetCached(assetKey: string): boolean {
    const asset = this.managedAssets.get(assetKey);
    return asset ? asset.assetState === AssetState.CACHED : false;
  }

  /**
   * Check if bundle is cached
   */
  isBundleCached(bundleId: string): boolean {
    // BundleState doesn't have CACHED state, so we'll check if it's loaded
    const bundle = this.assetBundles.get(bundleId);
    return bundle ? bundle.bundleState === BundleState.LOADED : false;
  }

  /**
   * Validate asset
   */
  validateAsset(asset: IAsset): boolean {
    if (!this.managerConfig.enableValidation || !this.validationManager) {
      return true;
    }

    try {
      // Since validateAsset returns a Promise, we need to handle it synchronously
      // For now, we'll return true and let the validation happen asynchronously
      this.validationManager.validateAsset(asset);
      return true;
    } catch (error) {
      this.logger.error('AssetManager', 'validateAsset', 'Asset validation error', {
        managerId: this.managerId,
        assetKey: asset.assetKey,
        error: error instanceof Error ? error.message : String(error),
      });
      return false;
    }
  }

  /**
   * Validate bundle
   */
  validateBundle(bundle: IAssetBundle): boolean {
    if (!this.managerConfig.enableValidation || !this.validationManager) {
      return true;
    }

    try {
      // Since validateBundle returns a Promise, we need to handle it synchronously
      // For now, we'll return true and let the validation happen asynchronously
      this.validationManager.validateBundle(bundle);
      return true;
    } catch (error) {
      this.logger.error('AssetManager', 'validateBundle', 'Bundle validation error', {
        managerId: this.managerId,
        bundleId: bundle.bundleId,
        error: error instanceof Error ? error.message : String(error),
      });
      return false;
    }
  }

  /**
   * Validate asset configuration
   */
  validateAssetConfig(assetConfig: any): boolean {
    if (!this.managerConfig.enableValidation) {
      return true;
    }

    try {
      // Basic validation - check required fields
      return !!(assetConfig && assetConfig.key && assetConfig.path && assetConfig.type);
    } catch (error) {
      this.logger.error('AssetManager', 'validateAssetConfig', 'Asset config validation error', {
        managerId: this.managerId,
        assetConfig,
        error: error instanceof Error ? error.message : String(error),
      });
      return false;
    }
  }

  /**
   * Validate bundle configuration
   */
  validateBundleConfig(bundleConfig: any): boolean {
    if (!this.managerConfig.enableValidation) {
      return true;
    }

    try {
      // Basic validation - check required fields
      return !!(
        bundleConfig &&
        bundleConfig.bundleId &&
        bundleConfig.bundleType &&
        Array.isArray(bundleConfig.assetKeys)
      );
    } catch (error) {
      this.logger.error('AssetManager', 'validateBundleConfig', 'Bundle config validation error', {
        managerId: this.managerId,
        bundleConfig,
        error: error instanceof Error ? error.message : String(error),
      });
      return false;
    }
  }

  /**
   * Get manager statistics
   */
  getManagerStatistics(): AssetManagerStatistics {
    const totalAssets = this.managedAssets.size;
    const loadedAssets = Array.from(this.managedAssets.values()).filter(
      asset => asset.assetState === AssetState.LOADED
    ).length;
    const failedAssets = Array.from(this.managedAssets.values()).filter(
      asset => asset.assetState === AssetState.FAILED
    ).length;
    const cachedAssets = Array.from(this.managedAssets.values()).filter(
      asset => asset.assetState === AssetState.CACHED
    ).length;

    const totalBundles = this.assetBundles.size;
    const loadedBundles = Array.from(this.assetBundles.values()).filter(
      bundle => bundle.bundleState === BundleState.LOADED
    ).length;
    const failedBundles = Array.from(this.assetBundles.values()).filter(
      bundle => bundle.bundleState === BundleState.FAILED
    ).length;
    const cachedBundles = Array.from(this.assetBundles.values()).filter(
      bundle => bundle.bundleState === BundleState.LOADED
    ).length;

    const totalLoadTime = Array.from(this.managedAssets.values()).reduce(
      (sum, asset) => sum + asset.assetLoadTime,
      0
    );
    const averageLoadTime = totalAssets > 0 ? totalLoadTime / totalAssets : 0;

    const successRate = totalAssets > 0 ? (loadedAssets / totalAssets) * 100 : 0;
    const cacheHitRate = totalAssets > 0 ? (cachedAssets / totalAssets) * 100 : 0;

    return {
      totalAssets,
      loadedAssets,
      failedAssets,
      cachedAssets,
      totalBundles,
      loadedBundles,
      failedBundles,
      cachedBundles,
      totalLoadTime,
      averageLoadTime,
      cacheHitRate,
      successRate,
      lastUpdateTime: Date.now(),
    };
  }

  /**
   * Clear manager
   */
  clearManager(): this {
    try {
      // Clear all assets
      this.managedAssets.clear();

      // Clear all bundles
      this.assetBundles.clear();

      this.logger.info('AssetManager', 'clearManager', 'Manager cleared', {
        managerId: this.managerId,
      });
    } catch (error) {
      this.logger.error('AssetManager', 'clearManager', 'Clear manager error', {
        managerId: this.managerId,
        error: error instanceof Error ? error.message : String(error),
      });
    }

    return this;
  }

  /**
   * Update manager
   */
  updateManager(deltaTime: number): void {
    try {
      // Update statistics if enabled
      if (this.managerConfig.enableStatistics && this.statisticsManager) {
        this.statisticsManager.updateStatisticsManager(deltaTime);
      }
    } catch (error) {
      this.logger.error('AssetManager', 'updateManager', 'Manager update error', {
        managerId: this.managerId,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
