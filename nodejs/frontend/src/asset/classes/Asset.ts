/**
 * Asset Class Implementation
 *
 * Concrete implementation of the IAsset interface.
 * Handles asset lifecycle, data management, and all asset operations.
 */

import type { IAsset } from '../interfaces/IAsset';
import { AssetType, AssetState, AssetConfig } from '../interfaces/IAsset';
import { Logger } from '../../core/Logger';

/**
 * Concrete Asset implementation
 */
export class Asset implements IAsset {
  readonly assetId: string;
  readonly assetKey: string;
  readonly assetType: AssetType;

  assetState: AssetState;
  assetConfig: AssetConfig;
  assetData: unknown;
  assetSize: number;
  assetLoadTime: number;
  assetLastAccessedTime: number;
  assetAccessCount: number;
  assetMetadata: Record<string, unknown>;

  private readonly logger: Logger = Logger.getInstance();

  /**
   * Constructor
   */
  constructor(assetId: string, assetKey: string, assetType: AssetType, assetConfig: AssetConfig) {
    this.assetId = assetId;
    this.assetKey = assetKey;
    this.assetType = assetType;
    this.assetConfig = assetConfig;

    // Initialize default values
    this.assetState = AssetState.PENDING;
    this.assetData = null;
    this.assetSize = 0;
    this.assetLoadTime = 0;
    this.assetLastAccessedTime = Date.now();
    this.assetAccessCount = 0;
    this.assetMetadata = {};

    this.logger.debug('Asset', 'constructor', `Asset created: ${assetId}`, {
      assetKey,
      assetType,
      priority: assetConfig.priority,
    });
  }

  /**
   * Set asset state
   */
  setAssetState(state: AssetState): this {
    const previousState = this.assetState;
    this.assetState = state;

    this.logger.debug('Asset', 'setAssetState', `State changed: ${previousState} → ${state}`, {
      assetId: this.assetId,
      assetKey: this.assetKey,
    });

    return this;
  }

  /**
   * Set asset configuration
   */
  setAssetConfig(config: AssetConfig): this {
    this.assetConfig = config;

    this.logger.debug('Asset', 'setAssetConfig', 'Configuration updated', {
      assetId: this.assetId,
      assetKey: this.assetKey,
      priority: config.priority,
      preload: config.preload,
    });

    return this;
  }

  /**
   * Set asset data
   */
  setAssetData(data: unknown): this {
    this.assetData = data;
    this.assetLastAccessedTime = Date.now();
    this.assetAccessCount++;

    this.logger.debug('Asset', 'setAssetData', 'Data updated', {
      assetId: this.assetId,
      assetKey: this.assetKey,
      dataType: typeof data,
      accessCount: this.assetAccessCount,
    });

    return this;
  }

  /**
   * Set asset size
   */
  setAssetSize(size: number): this {
    this.assetSize = size;

    this.logger.debug('Asset', 'setAssetSize', 'Size updated', {
      assetId: this.assetId,
      assetKey: this.assetKey,
      size,
    });

    return this;
  }

  /**
   * Set asset load time
   */
  setAssetLoadTime(time: number): this {
    this.assetLoadTime = time;

    this.logger.debug('Asset', 'setAssetLoadTime', 'Load time updated', {
      assetId: this.assetId,
      assetKey: this.assetKey,
      loadTime: time,
    });

    return this;
  }

  /**
   * Set asset last accessed time
   */
  setAssetLastAccessedTime(time: number): this {
    this.assetLastAccessedTime = time;

    this.logger.debug('Asset', 'setAssetLastAccessedTime', 'Last accessed time updated', {
      assetId: this.assetId,
      assetKey: this.assetKey,
      lastAccessed: time,
    });

    return this;
  }

  /**
   * Set asset access count
   */
  setAssetAccessCount(count: number): this {
    this.assetAccessCount = count;

    this.logger.debug('Asset', 'setAssetAccessCount', 'Access count updated', {
      assetId: this.assetId,
      assetKey: this.assetKey,
      accessCount: count,
    });

    return this;
  }

  /**
   * Set asset metadata
   */
  setAssetMetadata(metadata: Record<string, unknown>): this {
    this.assetMetadata = { ...this.assetMetadata, ...metadata };

    this.logger.debug('Asset', 'setAssetMetadata', 'Metadata updated', {
      assetId: this.assetId,
      assetKey: this.assetKey,
      metadataKeys: Object.keys(metadata),
    });

    return this;
  }

  /**
   * Get asset state
   */
  getAssetState(): AssetState {
    return this.assetState;
  }

  /**
   * Get asset configuration
   */
  getAssetConfig(): AssetConfig {
    return this.assetConfig;
  }

  /**
   * Get asset data
   */
  getAssetData(): unknown {
    this.assetLastAccessedTime = Date.now();
    this.assetAccessCount++;

    this.logger.debug('Asset', 'getAssetData', 'Data accessed', {
      assetId: this.assetId,
      assetKey: this.assetKey,
      accessCount: this.assetAccessCount,
    });

    return this.assetData;
  }

  /**
   * Get asset size
   */
  getAssetSize(): number {
    return this.assetSize;
  }

  /**
   * Get asset load time
   */
  getAssetLoadTime(): number {
    return this.assetLoadTime;
  }

  /**
   * Get asset last accessed time
   */
  getAssetLastAccessedTime(): number {
    return this.assetLastAccessedTime;
  }

  /**
   * Get asset access count
   */
  getAssetAccessCount(): number {
    return this.assetAccessCount;
  }

  /**
   * Get asset metadata
   */
  getAssetMetadata(): Record<string, unknown> {
    return this.assetMetadata;
  }

  /**
   * Load asset
   */
  async loadAsset(): Promise<this> {
    if (this.assetState === AssetState.LOADED) {
      this.logger.debug('Asset', 'loadAsset', 'Asset already loaded', {
        assetId: this.assetId,
        assetKey: this.assetKey,
      });
      return this;
    }

    if (this.assetState === AssetState.LOADING) {
      this.logger.warn('Asset', 'loadAsset', 'Asset already loading', {
        assetId: this.assetId,
        assetKey: this.assetKey,
      });
      return this;
    }

    try {
      this.setAssetState(AssetState.LOADING);
      const startTime = Date.now();

      this.logger.info('Asset', 'loadAsset', 'Starting asset load', {
        assetId: this.assetId,
        assetKey: this.assetKey,
        assetType: this.assetType,
        path: this.assetConfig.path,
      });

      // Simulate asset loading based on type
      await this.loadAssetByType();

      const loadTime = Date.now() - startTime;
      this.setAssetLoadTime(loadTime);
      this.setAssetState(AssetState.LOADED);

      this.logger.info('Asset', 'loadAsset', 'Asset loaded successfully', {
        assetId: this.assetId,
        assetKey: this.assetKey,
        loadTime,
      });

      return this;
    } catch (error) {
      this.setAssetState(AssetState.FAILED);

      this.logger.error('Asset', 'loadAsset', 'Asset load failed', {
        assetId: this.assetId,
        assetKey: this.assetKey,
        error: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  }

  /**
   * Unload asset
   */
  async unloadAsset(): Promise<this> {
    if (this.assetState === AssetState.PENDING) {
      this.logger.debug('Asset', 'unloadAsset', 'Asset not loaded', {
        assetId: this.assetId,
        assetKey: this.assetKey,
      });
      return this;
    }

    try {
      this.logger.info('Asset', 'unloadAsset', 'Unloading asset', {
        assetId: this.assetId,
        assetKey: this.assetKey,
      });

      // Clear asset data
      this.assetData = null;
      this.assetSize = 0;
      this.assetLoadTime = 0;
      this.setAssetState(AssetState.PENDING);

      this.logger.info('Asset', 'unloadAsset', 'Asset unloaded successfully', {
        assetId: this.assetId,
        assetKey: this.assetKey,
      });

      return this;
    } catch (error) {
      this.logger.error('Asset', 'unloadAsset', 'Asset unload failed', {
        assetId: this.assetId,
        assetKey: this.assetKey,
        error: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  }

  /**
   * Check if asset is loaded
   */
  isAssetLoaded(): boolean {
    return this.assetState === AssetState.LOADED;
  }

  /**
   * Check if asset is cached
   */
  isAssetCached(): boolean {
    return this.assetState === AssetState.CACHED;
  }

  /**
   * Check if asset is preloadable
   */
  isAssetPreloadable(): boolean {
    return this.assetConfig.preload;
  }

  /**
   * Get asset URL
   */
  getAssetUrl(): string {
    return this.assetConfig.path;
  }

  /**
   * Clone asset
   */
  cloneAsset(): IAsset {
    const clonedAsset = new Asset(
      `${this.assetId}_clone_${Date.now()}`,
      `${this.assetKey}_clone`,
      this.assetType,
      { ...this.assetConfig }
    );

    // Copy metadata
    clonedAsset.setAssetMetadata(this.assetMetadata);

    this.logger.debug('Asset', 'cloneAsset', 'Asset cloned', {
      originalId: this.assetId,
      clonedId: clonedAsset.assetId,
      assetKey: this.assetKey,
    });

    return clonedAsset;
  }

  /**
   * Dispose asset
   */
  disposeAsset(): void {
    this.logger.info('Asset', 'disposeAsset', 'Disposing asset', {
      assetId: this.assetId,
      assetKey: this.assetKey,
    });

    // Clear all data
    this.assetData = null;
    this.assetSize = 0;
    this.assetLoadTime = 0;
    this.assetAccessCount = 0;
    this.assetMetadata = {};
    this.setAssetState(AssetState.DISPOSED);
  }

  /**
   * Load asset by type (private helper method)
   */
  private async loadAssetByType(): Promise<void> {
    switch (this.assetType) {
      case AssetType.IMAGE:
        await this.loadImageAsset();
        break;
      case AssetType.AUDIO:
        await this.loadAudioAsset();
        break;
      case AssetType.SPRITE:
        await this.loadSpriteAsset();
        break;
      case AssetType.FONT:
        await this.loadFontAsset();
        break;
      case AssetType.VIDEO:
        await this.loadVideoAsset();
        break;
      case AssetType.JSON:
        await this.loadJsonAsset();
        break;
      case AssetType.XML:
        await this.loadXmlAsset();
        break;
      case AssetType.TEXT:
        await this.loadTextAsset();
        break;
      case AssetType.BINARY:
        await this.loadBinaryAsset();
        break;
      case AssetType.CUSTOM:
        await this.loadCustomAsset();
        break;
      default:
        throw new Error(`Unsupported asset type: ${this.assetType}`);
    }
  }

  /**
   * Load image asset
   */
  private async loadImageAsset(): Promise<void> {
    // Simulate image loading
    await new Promise(resolve => setTimeout(resolve, 100));

    // Mock image data
    this.assetData = {
      type: 'image',
      url: this.assetConfig.path,
      width: 1920,
      height: 1080,
      format: 'png',
    };

    this.assetSize = 1024 * 1024; // 1MB mock size
  }

  /**
   * Load audio asset
   */
  private async loadAudioAsset(): Promise<void> {
    // Simulate audio loading
    await new Promise(resolve => setTimeout(resolve, 200));

    // Mock audio data
    this.assetData = {
      type: 'audio',
      url: this.assetConfig.path,
      duration: 30,
      format: 'mp3',
    };

    this.assetSize = 512 * 1024; // 512KB mock size
  }

  /**
   * Load sprite asset
   */
  private async loadSpriteAsset(): Promise<void> {
    // Simulate sprite loading
    await new Promise(resolve => setTimeout(resolve, 150));

    // Mock sprite data
    this.assetData = {
      type: 'sprite',
      url: this.assetConfig.path,
      frames: 10,
      frameWidth: 64,
      frameHeight: 64,
    };

    this.assetSize = 256 * 1024; // 256KB mock size
  }

  /**
   * Load font asset
   */
  private async loadFontAsset(): Promise<void> {
    // Simulate font loading
    await new Promise(resolve => setTimeout(resolve, 50));

    // Mock font data
    this.assetData = {
      type: 'font',
      url: this.assetConfig.path,
      family: 'Arial',
      weight: 'normal',
    };

    this.assetSize = 64 * 1024; // 64KB mock size
  }

  /**
   * Load video asset
   */
  private async loadVideoAsset(): Promise<void> {
    // Simulate video loading
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock video data
    this.assetData = {
      type: 'video',
      url: this.assetConfig.path,
      duration: 60,
      width: 1920,
      height: 1080,
      format: 'mp4',
    };

    this.assetSize = 10 * 1024 * 1024; // 10MB mock size
  }

  /**
   * Load JSON asset
   */
  private async loadJsonAsset(): Promise<void> {
    // Simulate JSON loading
    await new Promise(resolve => setTimeout(resolve, 25));

    // Mock JSON data
    this.assetData = {
      type: 'json',
      url: this.assetConfig.path,
      data: { mock: 'data' },
    };

    this.assetSize = 1 * 1024; // 1KB mock size
  }

  /**
   * Load XML asset
   */
  private async loadXmlAsset(): Promise<void> {
    // Simulate XML loading
    await new Promise(resolve => setTimeout(resolve, 30));

    // Mock XML data
    this.assetData = {
      type: 'xml',
      url: this.assetConfig.path,
      data: '<root><item>mock</item></root>',
    };

    this.assetSize = 2 * 1024; // 2KB mock size
  }

  /**
   * Load text asset
   */
  private async loadTextAsset(): Promise<void> {
    // Simulate text loading
    await new Promise(resolve => setTimeout(resolve, 20));

    // Mock text data
    this.assetData = {
      type: 'text',
      url: this.assetConfig.path,
      content: 'Mock text content',
    };

    this.assetSize = 512; // 512 bytes mock size
  }

  /**
   * Load binary asset
   */
  private async loadBinaryAsset(): Promise<void> {
    // Simulate binary loading
    await new Promise(resolve => setTimeout(resolve, 100));

    // Mock binary data
    this.assetData = {
      type: 'binary',
      url: this.assetConfig.path,
      size: 1024,
    };

    this.assetSize = 1024; // 1KB mock size
  }

  /**
   * Load custom asset
   */
  private async loadCustomAsset(): Promise<void> {
    // Simulate custom asset loading
    await new Promise(resolve => setTimeout(resolve, 75));

    // Mock custom data
    this.assetData = {
      type: 'custom',
      url: this.assetConfig.path,
      customType: this.assetMetadata.customType || 'unknown',
    };

    this.assetSize = 5 * 1024; // 5KB mock size
  }
}
