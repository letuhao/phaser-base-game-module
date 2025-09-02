/**
 * AssetBundle Class Implementation
 *
 * Concrete implementation of the IAssetBundle interface.
 * Handles asset bundle lifecycle, asset management, and bundle operations.
 */

import type { IAssetBundle } from '../interfaces/IAssetBundle';
import type { IAsset } from '../interfaces/IAsset';
import { BundleType, BundleState, BundleConfig, BundleProgress } from '../interfaces/IAssetBundle';
import { AssetType } from '../interfaces/IAsset';
import { Logger } from '../../core/Logger';

/**
 * Concrete AssetBundle implementation
 */
export class AssetBundle implements IAssetBundle {
  readonly bundleId: string;
  readonly bundleType: BundleType;

  bundleState: BundleState;
  bundleConfig: BundleConfig;
  bundleAssets: Map<string, IAsset>;
  bundleProgress: BundleProgress;
  bundleMetadata: Record<string, unknown>;

  private readonly logger: Logger = Logger.getInstance();

  /**
   * Constructor
   */
  constructor(bundleId: string, bundleType: BundleType, bundleConfig: BundleConfig) {
    this.bundleId = bundleId;
    this.bundleType = bundleType;
    this.bundleConfig = bundleConfig;

    // Initialize default values
    this.bundleState = BundleState.PENDING;
    this.bundleAssets = new Map<string, IAsset>();
    this.bundleProgress = {
      totalAssets: 0,
      loadedAssets: 0,
      failedAssets: 0,
      percentage: 0,
      estimatedTimeRemaining: 0,
    };
    this.bundleMetadata = {};

    this.logger.debug('AssetBundle', 'constructor', `Bundle created: ${bundleId}`, {
      bundleType,
      priority: bundleConfig.priority,
    });
  }

  /**
   * Set bundle state
   */
  setBundleState(state: BundleState): this {
    const previousState = this.bundleState;
    this.bundleState = state;

    this.logger.debug(
      'AssetBundle',
      'setBundleState',
      `State changed: ${previousState} → ${state}`,
      {
        bundleId: this.bundleId,
        bundleType: this.bundleType,
      }
    );

    return this;
  }

  /**
   * Set bundle configuration
   */
  setBundleConfig(config: BundleConfig): this {
    this.bundleConfig = config;

    this.logger.debug('AssetBundle', 'setBundleConfig', 'Configuration updated', {
      bundleId: this.bundleId,
      bundleType: this.bundleType,
      priority: config.priority,
      preload: config.preload,
    });

    return this;
  }

  /**
   * Set bundle metadata
   */
  setBundleMetadata(metadata: Record<string, unknown>): this {
    this.bundleMetadata = { ...this.bundleMetadata, ...metadata };

    this.logger.debug('AssetBundle', 'setBundleMetadata', 'Metadata updated', {
      bundleId: this.bundleId,
      bundleType: this.bundleType,
      metadataKeys: Object.keys(metadata),
    });

    return this;
  }

  /**
   * Get bundle state
   */
  getBundleState(): BundleState {
    return this.bundleState;
  }

  /**
   * Get bundle configuration
   */
  getBundleConfig(): BundleConfig {
    return this.bundleConfig;
  }

  /**
   * Get bundle assets
   */
  getBundleAssets(): Map<string, IAsset> {
    return this.bundleAssets;
  }

  /**
   * Get bundle progress
   */
  getBundleProgress(): BundleProgress {
    return this.bundleProgress;
  }

  /**
   * Get bundle metadata
   */
  getBundleMetadata(): Record<string, unknown> {
    return this.bundleMetadata;
  }

  /**
   * Add asset to bundle
   */
  addAsset(asset: IAsset): this {
    this.bundleAssets.set(asset.assetKey, asset);
    this.updateProgress();

    this.logger.debug('AssetBundle', 'addAsset', 'Asset added to bundle', {
      bundleId: this.bundleId,
      assetKey: asset.assetKey,
      assetType: asset.assetType,
      totalAssets: this.bundleAssets.size,
    });

    return this;
  }

  /**
   * Remove asset from bundle
   */
  removeAsset(assetKey: string): this {
    const removed = this.bundleAssets.delete(assetKey);
    if (removed) {
      this.updateProgress();

      this.logger.debug('AssetBundle', 'removeAsset', 'Asset removed from bundle', {
        bundleId: this.bundleId,
        assetKey,
        totalAssets: this.bundleAssets.size,
      });
    } else {
      this.logger.warn('AssetBundle', 'removeAsset', 'Asset not found in bundle', {
        bundleId: this.bundleId,
        assetKey,
      });
    }

    return this;
  }

  /**
   * Get asset by key
   */
  getAsset(assetKey: string): IAsset | null {
    const asset = this.bundleAssets.get(assetKey) || null;

    this.logger.debug('AssetBundle', 'getAsset', 'Asset retrieved from bundle', {
      bundleId: this.bundleId,
      assetKey,
      found: asset !== null,
    });

    return asset;
  }

  /**
   * Get assets by type
   */
  getAssetsByType(assetType: AssetType): IAsset[] {
    const assets = Array.from(this.bundleAssets.values()).filter(
      asset => asset.assetType === assetType
    );

    this.logger.debug('AssetBundle', 'getAssetsByType', 'Assets filtered by type', {
      bundleId: this.bundleId,
      assetType,
      count: assets.length,
    });

    return assets;
  }

  /**
   * Load bundle
   */
  async loadBundle(): Promise<this> {
    if (this.bundleState === BundleState.LOADED) {
      this.logger.debug('AssetBundle', 'loadBundle', 'Bundle already loaded', {
        bundleId: this.bundleId,
      });
      return this;
    }

    if (this.bundleState === BundleState.LOADING) {
      this.logger.warn('AssetBundle', 'loadBundle', 'Bundle already loading', {
        bundleId: this.bundleId,
      });
      return this;
    }

    try {
      this.setBundleState(BundleState.LOADING);
      const startTime = Date.now();

      this.logger.info('AssetBundle', 'loadBundle', 'Starting bundle load', {
        bundleId: this.bundleId,
        bundleType: this.bundleType,
        totalAssets: this.bundleAssets.size,
      });

      // Load all assets in the bundle
      await this.loadAllAssets();

      const loadTime = Date.now() - startTime;
      this.setBundleState(BundleState.LOADED);

      this.logger.info('AssetBundle', 'loadBundle', 'Bundle loaded successfully', {
        bundleId: this.bundleId,
        loadTime,
        loadedAssets: this.bundleProgress.loadedAssets,
        failedAssets: this.bundleProgress.failedAssets,
      });

      return this;
    } catch (error) {
      this.setBundleState(BundleState.FAILED);

      this.logger.error('AssetBundle', 'loadBundle', 'Bundle load failed', {
        bundleId: this.bundleId,
        error: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  }

  /**
   * Unload bundle
   */
  async unloadBundle(): Promise<this> {
    if (this.bundleState === BundleState.PENDING) {
      this.logger.debug('AssetBundle', 'unloadBundle', 'Bundle not loaded', {
        bundleId: this.bundleId,
      });
      return this;
    }

    try {
      this.logger.info('AssetBundle', 'unloadBundle', 'Unloading bundle', {
        bundleId: this.bundleId,
        totalAssets: this.bundleAssets.size,
      });

      // Unload all assets in the bundle
      await this.unloadAllAssets();

      this.setBundleState(BundleState.PENDING);
      this.resetProgress();

      this.logger.info('AssetBundle', 'unloadBundle', 'Bundle unloaded successfully', {
        bundleId: this.bundleId,
      });

      return this;
    } catch (error) {
      this.logger.error('AssetBundle', 'unloadBundle', 'Bundle unload failed', {
        bundleId: this.bundleId,
        error: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  }

  /**
   * Check if bundle is loaded
   */
  isBundleLoaded(): boolean {
    return this.bundleState === BundleState.LOADED;
  }

  /**
   * Check if bundle is loading
   */
  isBundleLoading(): boolean {
    return this.bundleState === BundleState.LOADING;
  }

  /**
   * Get bundle size
   */
  getBundleSize(): number {
    let totalSize = 0;
    for (const asset of Array.from(this.bundleAssets.values())) {
      totalSize += asset.getAssetSize();
    }

    this.logger.debug('AssetBundle', 'getBundleSize', 'Bundle size calculated', {
      bundleId: this.bundleId,
      totalSize,
    });

    return totalSize;
  }

  /**
   * Get bundle asset count
   */
  getBundleAssetCount(): number {
    return this.bundleAssets.size;
  }

  /**
   * Clone bundle
   */
  cloneBundle(): IAssetBundle {
    const clonedBundle = new AssetBundle(`${this.bundleId}_clone_${Date.now()}`, this.bundleType, {
      ...this.bundleConfig,
    });

    // Copy metadata
    clonedBundle.setBundleMetadata(this.bundleMetadata);

    // Clone all assets
    for (const asset of Array.from(this.bundleAssets.values())) {
      const clonedAsset = asset.cloneAsset();
      clonedBundle.addAsset(clonedAsset);
    }

    this.logger.debug('AssetBundle', 'cloneBundle', 'Bundle cloned', {
      originalId: this.bundleId,
      clonedId: clonedBundle.bundleId,
      assetCount: this.bundleAssets.size,
    });

    return clonedBundle;
  }

  /**
   * Dispose bundle
   */
  disposeBundle(): void {
    this.logger.info('AssetBundle', 'disposeBundle', 'Disposing bundle', {
      bundleId: this.bundleId,
      assetCount: this.bundleAssets.size,
    });

    // Dispose all assets
    for (const asset of Array.from(this.bundleAssets.values())) {
      asset.disposeAsset();
    }

    // Clear all data
    this.bundleAssets.clear();
    this.bundleMetadata = {};
    this.resetProgress();
    this.setBundleState(BundleState.DISPOSED);
  }

  /**
   * Load all assets in the bundle (private helper method)
   */
  private async loadAllAssets(): Promise<void> {
    const assets = Array.from(this.bundleAssets.values());
    const loadPromises = assets.map(asset => this.loadAssetSafely(asset));

    await Promise.allSettled(loadPromises);
    this.updateProgress();
  }

  /**
   * Unload all assets in the bundle (private helper method)
   */
  private async unloadAllAssets(): Promise<void> {
    const assets = Array.from(this.bundleAssets.values());
    const unloadPromises = assets.map(asset => this.unloadAssetSafely(asset));

    await Promise.allSettled(unloadPromises);
    this.updateProgress();
  }

  /**
   * Load asset safely with error handling (private helper method)
   */
  private async loadAssetSafely(asset: IAsset): Promise<void> {
    try {
      await asset.loadAsset();
      this.logger.debug('AssetBundle', 'loadAssetSafely', 'Asset loaded successfully', {
        bundleId: this.bundleId,
        assetKey: asset.assetKey,
      });
    } catch (error) {
      this.logger.error('AssetBundle', 'loadAssetSafely', 'Asset load failed', {
        bundleId: this.bundleId,
        assetKey: asset.assetKey,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Unload asset safely with error handling (private helper method)
   */
  private async unloadAssetSafely(asset: IAsset): Promise<void> {
    try {
      await asset.unloadAsset();
      this.logger.debug('AssetBundle', 'unloadAssetSafely', 'Asset unloaded successfully', {
        bundleId: this.bundleId,
        assetKey: asset.assetKey,
      });
    } catch (error) {
      this.logger.error('AssetBundle', 'unloadAssetSafely', 'Asset unload failed', {
        bundleId: this.bundleId,
        assetKey: asset.assetKey,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }

  /**
   * Update bundle progress (private helper method)
   */
  private updateProgress(): void {
    const totalAssets = this.bundleAssets.size;
    let loadedAssets = 0;
    let failedAssets = 0;

    for (const asset of Array.from(this.bundleAssets.values())) {
      if (asset.isAssetLoaded()) {
        loadedAssets++;
      } else if (asset.getAssetState() === 'failed') {
        failedAssets++;
      }
    }

    const percentage = totalAssets > 0 ? Math.round((loadedAssets / totalAssets) * 100) : 0;
    const estimatedTimeRemaining = this.calculateEstimatedTimeRemaining(loadedAssets, totalAssets);

    this.bundleProgress = {
      totalAssets,
      loadedAssets,
      failedAssets,
      percentage,
      estimatedTimeRemaining,
    };

    this.logger.debug('AssetBundle', 'updateProgress', 'Progress updated', {
      bundleId: this.bundleId,
      totalAssets,
      loadedAssets,
      failedAssets,
      percentage,
    });
  }

  /**
   * Reset bundle progress (private helper method)
   */
  private resetProgress(): void {
    this.bundleProgress = {
      totalAssets: 0,
      loadedAssets: 0,
      failedAssets: 0,
      percentage: 0,
      estimatedTimeRemaining: 0,
    };
  }

  /**
   * Calculate estimated time remaining (private helper method)
   */
  private calculateEstimatedTimeRemaining(loadedAssets: number, totalAssets: number): number {
    if (loadedAssets === 0 || totalAssets === 0) {
      return 0;
    }

    // Simple estimation based on average load time
    const averageLoadTime = 100; // 100ms average per asset
    const remainingAssets = totalAssets - loadedAssets;

    return remainingAssets * averageLoadTime;
  }
}
