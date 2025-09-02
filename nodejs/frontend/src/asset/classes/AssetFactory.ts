/**
 * AssetFactory Class Implementation
 *
 * Concrete implementation of the IAssetFactory interface.
 * Handles asset creation, configuration, validation, and factory management.
 */

import type { IAssetFactory } from '../interfaces/factories/IAssetFactory';
import type { IAsset } from '../interfaces/IAsset';
import {
  FactoryConfig,
  FactoryStatistics,
  AssetCreationOptions,
} from '../interfaces/factories/IAssetFactory';
import { AssetType, AssetPriority, AssetConfig } from '../interfaces/IAsset';
import { Asset } from './Asset';
import { Logger } from '../../core/Logger';

/**
 * Asset type creator function type
 */
type AssetTypeCreator = (options: AssetCreationOptions) => Promise<IAsset>;

/**
 * Concrete AssetFactory implementation
 */
export class AssetFactory implements IAssetFactory {
  readonly factoryId: string;

  factoryConfig: FactoryConfig;
  factoryStatistics: FactoryStatistics;
  factoryMetadata: Record<string, unknown>;

  private readonly logger: Logger = Logger.getInstance();
  private readonly assetTypeCreators: Map<AssetType, AssetTypeCreator> = new Map();
  private readonly creationTimes: number[] = [];

  /**
   * Constructor
   */
  constructor(factoryId: string, factoryConfig?: Partial<FactoryConfig>) {
    this.factoryId = factoryId;

    // Initialize default configuration
    this.factoryConfig = {
      enableValidation: true,
      enableCaching: true,
      enablePooling: false,
      defaultPriority: AssetPriority.NORMAL,
      defaultPreload: true,
      defaultCache: true,
      metadata: {},
      ...factoryConfig,
    };

    // Initialize statistics
    this.factoryStatistics = {
      totalCreated: 0,
      createdByType: {} as Record<AssetType, number>,
      totalCloned: 0,
      totalConfigured: 0,
      totalValidated: 0,
      validationFailures: 0,
      lastCreationTime: 0,
    };

    this.factoryMetadata = {};

    // Initialize asset type creators for all supported types
    this.initializeDefaultAssetTypeCreators();

    this.logger.debug('AssetFactory', 'constructor', `Factory created: ${factoryId}`, {
      factoryId,
      enableValidation: this.factoryConfig.enableValidation,
      enableCaching: this.factoryConfig.enableCaching,
      defaultPriority: this.factoryConfig.defaultPriority,
    });
  }

  /**
   * Set factory configuration
   */
  setFactoryConfig(config: FactoryConfig): this {
    this.factoryConfig = config;

    this.logger.debug('AssetFactory', 'setFactoryConfig', 'Configuration updated', {
      factoryId: this.factoryId,
      enableValidation: config.enableValidation,
      enableCaching: config.enableCaching,
      defaultPriority: config.defaultPriority,
    });

    return this;
  }

  /**
   * Set factory metadata
   */
  setFactoryMetadata(metadata: Record<string, unknown>): this {
    this.factoryMetadata = { ...this.factoryMetadata, ...metadata };

    this.logger.debug('AssetFactory', 'setFactoryMetadata', 'Metadata updated', {
      factoryId: this.factoryId,
      metadataKeys: Object.keys(metadata),
    });

    return this;
  }

  /**
   * Get factory configuration
   */
  getFactoryConfig(): FactoryConfig {
    return this.factoryConfig;
  }

  /**
   * Get factory statistics
   */
  getFactoryStatistics(): FactoryStatistics {
    return this.factoryStatistics;
  }

  /**
   * Get factory metadata
   */
  getFactoryMetadata(): Record<string, unknown> {
    return this.factoryMetadata;
  }

  /**
   * Create asset
   */
  async createAsset(options: AssetCreationOptions): Promise<IAsset> {
    const startTime = Date.now();

    try {
      this.logger.info('AssetFactory', 'createAsset', 'Creating asset', {
        factoryId: this.factoryId,
        assetType: options.assetType,
        assetKey: options.assetKey,
        assetPath: options.assetPath,
      });

      // Validate asset type is supported
      if (!this.isAssetTypeSupported(options.assetType)) {
        throw new Error(`Unsupported asset type: ${options.assetType}`);
      }

      // Get asset type creator
      const creator = this.assetTypeCreators.get(options.assetType);
      if (!creator) {
        throw new Error(`No creator registered for asset type: ${options.assetType}`);
      }

      // Create asset using registered creator
      const asset = await creator(options);

      // Update statistics
      this.updateCreationStatistics(options.assetType, startTime);

      this.logger.info('AssetFactory', 'createAsset', 'Asset created successfully', {
        factoryId: this.factoryId,
        assetId: asset.assetId,
        assetKey: asset.assetKey,
        assetType: asset.assetType,
        creationTime: Date.now() - startTime,
      });

      return asset;
    } catch (error) {
      this.factoryStatistics.validationFailures++;

      this.logger.error('AssetFactory', 'createAsset', 'Asset creation failed', {
        factoryId: this.factoryId,
        assetType: options.assetType,
        assetKey: options.assetKey,
        error: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  }

  /**
   * Create asset from configuration
   */
  async createAssetFromConfig(config: AssetConfig): Promise<IAsset> {
    const startTime = Date.now();

    try {
      this.logger.info('AssetFactory', 'createAssetFromConfig', 'Creating asset from config', {
        factoryId: this.factoryId,
        assetType: config.type,
        assetKey: config.key,
        assetPath: config.path,
      });

      // Validate configuration if validation is enabled
      if (this.factoryConfig.enableValidation) {
        const isValid = await this.validateAssetConfig(config);
        if (!isValid) {
          throw new Error(`Invalid asset configuration for key: ${config.key}`);
        }
      }

      // Convert AssetConfig to AssetCreationOptions
      const options: AssetCreationOptions = {
        assetType: config.type,
        assetKey: config.key,
        assetPath: config.path,
        priority: config.priority,
        preload: config.preload,
        cache: config.cache,
        metadata: config.metadata,
      };

      // Create asset using standard creation method
      const asset = await this.createAsset(options);

      this.logger.info(
        'AssetFactory',
        'createAssetFromConfig',
        'Asset created from config successfully',
        {
          factoryId: this.factoryId,
          assetId: asset.assetId,
          assetKey: asset.assetKey,
          creationTime: Date.now() - startTime,
        }
      );

      return asset;
    } catch (error) {
      this.logger.error(
        'AssetFactory',
        'createAssetFromConfig',
        'Asset creation from config failed',
        {
          factoryId: this.factoryId,
          assetKey: config.key,
          error: error instanceof Error ? error.message : String(error),
        }
      );

      throw error;
    }
  }

  /**
   * Clone asset
   */
  async cloneAsset(asset: IAsset, newKey?: string): Promise<IAsset> {
    const startTime = Date.now();

    try {
      this.logger.info('AssetFactory', 'cloneAsset', 'Cloning asset', {
        factoryId: this.factoryId,
        originalAssetId: asset.assetId,
        originalAssetKey: asset.assetKey,
        newKey,
      });

      // Clone the asset
      const clonedAsset = asset.cloneAsset();

      // Update key if provided
      if (newKey) {
        // Note: We can't directly modify the assetKey as it's readonly
        // This would require creating a new asset with the new key
        this.logger.warn('AssetFactory', 'cloneAsset', 'Cannot modify readonly assetKey', {
          factoryId: this.factoryId,
          originalKey: asset.assetKey,
          requestedKey: newKey,
        });
      }

      // Update statistics
      this.factoryStatistics.totalCloned++;
      this.factoryStatistics.lastCreationTime = Date.now();

      this.logger.info('AssetFactory', 'cloneAsset', 'Asset cloned successfully', {
        factoryId: this.factoryId,
        originalAssetId: asset.assetId,
        clonedAssetId: clonedAsset.assetId,
        cloneTime: Date.now() - startTime,
      });

      return clonedAsset;
    } catch (error) {
      this.logger.error('AssetFactory', 'cloneAsset', 'Asset cloning failed', {
        factoryId: this.factoryId,
        originalAssetId: asset.assetId,
        error: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  }

  /**
   * Configure asset
   */
  async configureAsset(asset: IAsset, config: Partial<AssetConfig>): Promise<IAsset> {
    try {
      this.logger.info('AssetFactory', 'configureAsset', 'Configuring asset', {
        factoryId: this.factoryId,
        assetId: asset.assetId,
        assetKey: asset.assetKey,
        configKeys: Object.keys(config),
      });

      // Update asset configuration
      const currentConfig = asset.getAssetConfig();
      const newConfig: AssetConfig = {
        ...currentConfig,
        ...config,
      };

      // Validate new configuration if validation is enabled
      if (this.factoryConfig.enableValidation) {
        const isValid = await this.validateAssetConfig(newConfig);
        if (!isValid) {
          throw new Error(`Invalid asset configuration for key: ${asset.assetKey}`);
        }
      }

      // Apply new configuration
      asset.setAssetConfig(newConfig);

      // Update statistics
      this.factoryStatistics.totalConfigured++;

      this.logger.info('AssetFactory', 'configureAsset', 'Asset configured successfully', {
        factoryId: this.factoryId,
        assetId: asset.assetId,
        assetKey: asset.assetKey,
      });

      return asset;
    } catch (error) {
      this.logger.error('AssetFactory', 'configureAsset', 'Asset configuration failed', {
        factoryId: this.factoryId,
        assetId: asset.assetId,
        error: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  }

  /**
   * Validate asset configuration
   */
  async validateAssetConfig(config: AssetConfig): Promise<boolean> {
    try {
      this.logger.debug('AssetFactory', 'validateAssetConfig', 'Validating asset config', {
        factoryId: this.factoryId,
        assetKey: config.key,
        assetType: config.type,
      });

      // Basic validation checks
      if (!config.key || typeof config.key !== 'string') {
        this.logger.warn('AssetFactory', 'validateAssetConfig', 'Invalid asset key', {
          factoryId: this.factoryId,
          key: config.key,
        });
        this.factoryStatistics.validationFailures++;
        return false;
      }

      if (!config.path || typeof config.path !== 'string') {
        this.logger.warn('AssetFactory', 'validateAssetConfig', 'Invalid asset path', {
          factoryId: this.factoryId,
          path: config.path,
        });
        this.factoryStatistics.validationFailures++;
        return false;
      }

      if (!Object.values(AssetType).includes(config.type)) {
        this.logger.warn('AssetFactory', 'validateAssetConfig', 'Invalid asset type', {
          factoryId: this.factoryId,
          type: config.type,
        });
        this.factoryStatistics.validationFailures++;
        return false;
      }

      if (!Object.values(AssetPriority).includes(config.priority)) {
        this.logger.warn('AssetFactory', 'validateAssetConfig', 'Invalid asset priority', {
          factoryId: this.factoryId,
          priority: config.priority,
        });
        this.factoryStatistics.validationFailures++;
        return false;
      }

      if (typeof config.preload !== 'boolean') {
        this.logger.warn('AssetFactory', 'validateAssetConfig', 'Invalid preload value', {
          factoryId: this.factoryId,
          preload: config.preload,
        });
        this.factoryStatistics.validationFailures++;
        return false;
      }

      if (typeof config.cache !== 'boolean') {
        this.logger.warn('AssetFactory', 'validateAssetConfig', 'Invalid cache value', {
          factoryId: this.factoryId,
          cache: config.cache,
        });
        this.factoryStatistics.validationFailures++;
        return false;
      }

      // Update statistics
      this.factoryStatistics.totalValidated++;

      this.logger.debug('AssetFactory', 'validateAssetConfig', 'Asset config validation passed', {
        factoryId: this.factoryId,
        assetKey: config.key,
      });

      return true;
    } catch (error) {
      this.factoryStatistics.validationFailures++;

      this.logger.error('AssetFactory', 'validateAssetConfig', 'Asset config validation failed', {
        factoryId: this.factoryId,
        assetKey: config.key,
        error: error instanceof Error ? error.message : String(error),
      });

      return false;
    }
  }

  /**
   * Register asset type creator
   */
  registerAssetTypeCreator(assetType: AssetType, creator: AssetTypeCreator): this {
    this.assetTypeCreators.set(assetType, creator);

    this.logger.debug('AssetFactory', 'registerAssetTypeCreator', 'Asset type creator registered', {
      factoryId: this.factoryId,
      assetType,
    });

    return this;
  }

  /**
   * Unregister asset type creator
   */
  unregisterAssetTypeCreator(assetType: AssetType): this {
    const removed = this.assetTypeCreators.delete(assetType);

    if (removed) {
      this.logger.debug(
        'AssetFactory',
        'unregisterAssetTypeCreator',
        'Asset type creator unregistered',
        {
          factoryId: this.factoryId,
          assetType,
        }
      );
    } else {
      this.logger.warn(
        'AssetFactory',
        'unregisterAssetTypeCreator',
        'Asset type creator not found',
        {
          factoryId: this.factoryId,
          assetType,
        }
      );
    }

    return this;
  }

  /**
   * Check if asset type is supported
   */
  isAssetTypeSupported(assetType: AssetType): boolean {
    return this.assetTypeCreators.has(assetType);
  }

  /**
   * Get supported asset types
   */
  getSupportedAssetTypes(): AssetType[] {
    return Array.from(this.assetTypeCreators.keys());
  }

  /**
   * Get asset type creator
   */
  getAssetTypeCreator(assetType: AssetType): AssetTypeCreator | null {
    return this.assetTypeCreators.get(assetType) || null;
  }

  /**
   * Create multiple assets
   */
  async createAssets(options: AssetCreationOptions[]): Promise<IAsset[]> {
    this.logger.info('AssetFactory', 'createAssets', 'Creating multiple assets', {
      factoryId: this.factoryId,
      count: options.length,
    });

    const creationPromises = options.map(option => this.createAsset(option));
    const assets = await Promise.allSettled(creationPromises);

    const successfulAssets: IAsset[] = [];
    const failedCreations: number = assets.filter(result => result.status === 'rejected').length;

    for (const result of assets) {
      if (result.status === 'fulfilled') {
        successfulAssets.push(result.value);
      }
    }

    this.logger.info('AssetFactory', 'createAssets', 'Multiple assets creation completed', {
      factoryId: this.factoryId,
      total: options.length,
      successful: successfulAssets.length,
      failed: failedCreations,
    });

    return successfulAssets;
  }

  /**
   * Create assets from configurations
   */
  async createAssetsFromConfigs(configs: AssetConfig[]): Promise<IAsset[]> {
    this.logger.info(
      'AssetFactory',
      'createAssetsFromConfigs',
      'Creating multiple assets from configs',
      {
        factoryId: this.factoryId,
        count: configs.length,
      }
    );

    const creationPromises = configs.map(config => this.createAssetFromConfig(config));
    const assets = await Promise.allSettled(creationPromises);

    const successfulAssets: IAsset[] = [];
    const failedCreations: number = assets.filter(result => result.status === 'rejected').length;

    for (const result of assets) {
      if (result.status === 'fulfilled') {
        successfulAssets.push(result.value);
      }
    }

    this.logger.info(
      'AssetFactory',
      'createAssetsFromConfigs',
      'Multiple assets creation from configs completed',
      {
        factoryId: this.factoryId,
        total: configs.length,
        successful: successfulAssets.length,
        failed: failedCreations,
      }
    );

    return successfulAssets;
  }

  /**
   * Get creation statistics
   */
  getCreationStatistics(): {
    totalCreated: number;
    successRate: number;
    averageCreationTime: number;
    mostCreatedType: AssetType;
  } {
    const totalCreated = this.factoryStatistics.totalCreated;
    const totalAttempts = totalCreated + this.factoryStatistics.validationFailures;
    const successRate = totalAttempts > 0 ? (totalCreated / totalAttempts) * 100 : 100;

    const averageCreationTime =
      this.creationTimes.length > 0
        ? this.creationTimes.reduce((sum, time) => sum + time, 0) / this.creationTimes.length
        : 0;

    const mostCreatedType = this.getMostCreatedAssetType();

    return {
      totalCreated,
      successRate,
      averageCreationTime,
      mostCreatedType,
    };
  }

  /**
   * Clear factory
   */
  clearFactory(): this {
    this.logger.info('AssetFactory', 'clearFactory', 'Clearing factory', {
      factoryId: this.factoryId,
    });

    // Reset statistics
    this.factoryStatistics = {
      totalCreated: 0,
      createdByType: {} as Record<AssetType, number>,
      totalCloned: 0,
      totalConfigured: 0,
      totalValidated: 0,
      validationFailures: 0,
      lastCreationTime: 0,
    };

    // Clear creation times
    this.creationTimes.length = 0;

    // Clear metadata
    this.factoryMetadata = {};

    this.logger.info('AssetFactory', 'clearFactory', 'Factory cleared', {
      factoryId: this.factoryId,
    });

    return this;
  }

  /**
   * Update factory
   */
  updateFactory(deltaTime: number): void {
    // This method can be used for periodic factory maintenance
    // For now, we'll just log the update
    this.logger.debug('AssetFactory', 'updateFactory', 'Factory updated', {
      factoryId: this.factoryId,
      deltaTime,
    });
  }

  /**
   * Initialize default asset type creators (private helper method)
   */
  private initializeDefaultAssetTypeCreators(): void {
    // Register default creator for all asset types
    const assetTypes = Object.values(AssetType);

    for (const assetType of assetTypes) {
      this.registerAssetTypeCreator(assetType, this.createDefaultAsset.bind(this));
    }

    this.logger.debug(
      'AssetFactory',
      'initializeDefaultAssetTypeCreators',
      'Default asset type creators initialized',
      {
        factoryId: this.factoryId,
        supportedTypes: assetTypes.length,
      }
    );
  }

  /**
   * Create default asset (private helper method)
   */
  private async createDefaultAsset(options: AssetCreationOptions): Promise<IAsset> {
    const assetConfig: AssetConfig = {
      key: options.assetKey,
      path: options.assetPath,
      type: options.assetType,
      priority: options.priority || this.factoryConfig.defaultPriority,
      preload: options.preload !== undefined ? options.preload : this.factoryConfig.defaultPreload,
      cache: options.cache !== undefined ? options.cache : this.factoryConfig.defaultCache,
      metadata: options.metadata || {},
    };

    const assetId = `${this.factoryId}_${options.assetKey}_${Date.now()}`;
    return new Asset(assetId, options.assetKey, options.assetType, assetConfig);
  }

  /**
   * Update creation statistics (private helper method)
   */
  private updateCreationStatistics(assetType: AssetType, startTime: number): void {
    const creationTime = Date.now() - startTime;

    this.factoryStatistics.totalCreated++;
    this.factoryStatistics.createdByType[assetType] =
      (this.factoryStatistics.createdByType[assetType] || 0) + 1;
    this.factoryStatistics.lastCreationTime = Date.now();

    // Keep only last 100 creation times for average calculation
    this.creationTimes.push(creationTime);
    if (this.creationTimes.length > 100) {
      this.creationTimes.shift();
    }
  }

  /**
   * Get most created asset type (private helper method)
   */
  private getMostCreatedAssetType(): AssetType {
    let mostCreatedType = AssetType.IMAGE;
    let maxCount = 0;

    for (const [assetType, count] of Object.entries(this.factoryStatistics.createdByType)) {
      if (count > maxCount) {
        maxCount = count;
        mostCreatedType = assetType as AssetType;
      }
    }

    return mostCreatedType;
  }
}
