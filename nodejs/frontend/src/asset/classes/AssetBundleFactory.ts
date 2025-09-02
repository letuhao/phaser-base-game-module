/**
 * AssetBundleFactory Class Implementation
 *
 * Concrete implementation of the IAssetBundleFactory interface.
 * Handles asset bundle creation, configuration, validation, and factory management.
 */

import type { IAssetBundleFactory } from '../interfaces/factories/IAssetBundleFactory';
import type { IAssetBundle } from '../interfaces/IAssetBundle';
import type { IAsset } from '../interfaces/IAsset';
import {
  BundleFactoryConfig,
  BundleFactoryStatistics,
  BundleCreationOptions,
} from '../interfaces/factories/IAssetBundleFactory';
import { BundleType, BundleConfig } from '../interfaces/IAssetBundle';
import { AssetPriority } from '../interfaces/IAsset';
import { AssetBundle } from './AssetBundle';
import { Logger } from '../../core/Logger';

/**
 * Bundle type creator function type
 */
type BundleTypeCreator = (options: BundleCreationOptions) => Promise<IAssetBundle>;

/**
 * Concrete AssetBundleFactory implementation
 */
export class AssetBundleFactory implements IAssetBundleFactory {
  readonly bundleFactoryId: string;

  bundleFactoryConfig: BundleFactoryConfig;
  bundleFactoryStatistics: BundleFactoryStatistics;
  bundleFactoryMetadata: Record<string, unknown>;

  private readonly logger: Logger = Logger.getInstance();
  private readonly bundleTypeCreators: Map<BundleType, BundleTypeCreator> = new Map();
  private readonly creationTimes: number[] = [];

  /**
   * Constructor
   */
  constructor(bundleFactoryId: string, bundleFactoryConfig?: Partial<BundleFactoryConfig>) {
    this.bundleFactoryId = bundleFactoryId;

    // Initialize default configuration
    this.bundleFactoryConfig = {
      enableValidation: true,
      enableCaching: true,
      enablePooling: false,
      defaultPriority: AssetPriority.NORMAL,
      defaultPreload: true,
      defaultCache: true,
      maxBundleSize: 100 * 1024 * 1024, // 100MB default
      metadata: {},
      ...bundleFactoryConfig,
    };

    // Initialize statistics
    this.bundleFactoryStatistics = {
      totalCreated: 0,
      createdByType: {} as Record<BundleType, number>,
      totalCloned: 0,
      totalConfigured: 0,
      totalValidated: 0,
      validationFailures: 0,
      lastCreationTime: 0,
    };

    this.bundleFactoryMetadata = {};

    // Initialize bundle type creators for all supported types
    this.initializeDefaultBundleTypeCreators();

    this.logger.debug(
      'AssetBundleFactory',
      'constructor',
      `Bundle factory created: ${bundleFactoryId}`,
      {
        bundleFactoryId,
        enableValidation: this.bundleFactoryConfig.enableValidation,
        enableCaching: this.bundleFactoryConfig.enableCaching,
        defaultPriority: this.bundleFactoryConfig.defaultPriority,
        maxBundleSize: this.bundleFactoryConfig.maxBundleSize,
      }
    );
  }

  /**
   * Set bundle factory configuration
   */
  setBundleFactoryConfig(config: BundleFactoryConfig): this {
    this.bundleFactoryConfig = config;

    this.logger.debug('AssetBundleFactory', 'setBundleFactoryConfig', 'Configuration updated', {
      bundleFactoryId: this.bundleFactoryId,
      enableValidation: config.enableValidation,
      enableCaching: config.enableCaching,
      defaultPriority: config.defaultPriority,
      maxBundleSize: config.maxBundleSize,
    });

    return this;
  }

  /**
   * Set bundle factory metadata
   */
  setBundleFactoryMetadata(metadata: Record<string, unknown>): this {
    this.bundleFactoryMetadata = { ...this.bundleFactoryMetadata, ...metadata };

    this.logger.debug('AssetBundleFactory', 'setBundleFactoryMetadata', 'Metadata updated', {
      bundleFactoryId: this.bundleFactoryId,
      metadataKeys: Object.keys(metadata),
    });

    return this;
  }

  /**
   * Get bundle factory configuration
   */
  getBundleFactoryConfig(): BundleFactoryConfig {
    return this.bundleFactoryConfig;
  }

  /**
   * Get bundle factory statistics
   */
  getBundleFactoryStatistics(): BundleFactoryStatistics {
    return this.bundleFactoryStatistics;
  }

  /**
   * Get bundle factory metadata
   */
  getBundleFactoryMetadata(): Record<string, unknown> {
    return this.bundleFactoryMetadata;
  }

  /**
   * Create bundle
   */
  async createBundle(options: BundleCreationOptions): Promise<IAssetBundle> {
    const startTime = Date.now();

    try {
      this.logger.info('AssetBundleFactory', 'createBundle', 'Creating bundle', {
        bundleFactoryId: this.bundleFactoryId,
        bundleType: options.bundleType,
        bundleId: options.bundleId,
        bundleName: options.bundleName,
      });

      // Validate bundle type is supported
      if (!this.isBundleTypeSupported(options.bundleType)) {
        throw new Error(`Unsupported bundle type: ${options.bundleType}`);
      }

      // Get bundle type creator
      const creator = this.bundleTypeCreators.get(options.bundleType);
      if (!creator) {
        throw new Error(`No creator registered for bundle type: ${options.bundleType}`);
      }

      // Create bundle using registered creator
      const bundle = await creator(options);

      // Update statistics
      this.updateCreationStatistics(options.bundleType, startTime);

      this.logger.info('AssetBundleFactory', 'createBundle', 'Bundle created successfully', {
        bundleFactoryId: this.bundleFactoryId,
        bundleId: bundle.bundleId,
        bundleType: bundle.bundleType,
        creationTime: Date.now() - startTime,
      });

      return bundle;
    } catch (error) {
      this.bundleFactoryStatistics.validationFailures++;

      this.logger.error('AssetBundleFactory', 'createBundle', 'Bundle creation failed', {
        bundleFactoryId: this.bundleFactoryId,
        bundleType: options.bundleType,
        bundleId: options.bundleId,
        error: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  }

  /**
   * Create bundle from configuration
   */
  async createBundleFromConfig(config: BundleConfig): Promise<IAssetBundle> {
    const startTime = Date.now();

    try {
      this.logger.info(
        'AssetBundleFactory',
        'createBundleFromConfig',
        'Creating bundle from config',
        {
          bundleFactoryId: this.bundleFactoryId,
          bundleType: config.bundleType,
          bundleId: config.bundleId,
          bundleName: config.bundleName,
        }
      );

      // Validate configuration if validation is enabled
      if (this.bundleFactoryConfig.enableValidation) {
        const isValid = await this.validateBundleConfig(config);
        if (!isValid) {
          throw new Error(`Invalid bundle configuration for ID: ${config.bundleId}`);
        }
      }

      // Convert BundleConfig to BundleCreationOptions
      const options: BundleCreationOptions = {
        bundleType: config.bundleType,
        bundleId: config.bundleId,
        bundleName: config.bundleName,
        priority: config.priority,
        preload: config.preload,
        cache: config.cache,
        assets: [], // Will be populated by the creator
        metadata: config.metadata,
      };

      // Create bundle using standard creation method
      const bundle = await this.createBundle(options);

      this.logger.info(
        'AssetBundleFactory',
        'createBundleFromConfig',
        'Bundle created from config successfully',
        {
          bundleFactoryId: this.bundleFactoryId,
          bundleId: bundle.bundleId,
          creationTime: Date.now() - startTime,
        }
      );

      return bundle;
    } catch (error) {
      this.logger.error(
        'AssetBundleFactory',
        'createBundleFromConfig',
        'Bundle creation from config failed',
        {
          bundleFactoryId: this.bundleFactoryId,
          bundleId: config.bundleId,
          error: error instanceof Error ? error.message : String(error),
        }
      );

      throw error;
    }
  }

  /**
   * Clone bundle
   */
  async cloneBundle(bundle: IAssetBundle, newId?: string): Promise<IAssetBundle> {
    const startTime = Date.now();

    try {
      this.logger.info('AssetBundleFactory', 'cloneBundle', 'Cloning bundle', {
        bundleFactoryId: this.bundleFactoryId,
        originalBundleId: bundle.bundleId,
        newId,
      });

      // Clone the bundle
      const clonedBundle = bundle.cloneBundle();

      // Update statistics
      this.bundleFactoryStatistics.totalCloned++;
      this.bundleFactoryStatistics.lastCreationTime = Date.now();

      this.logger.info('AssetBundleFactory', 'cloneBundle', 'Bundle cloned successfully', {
        bundleFactoryId: this.bundleFactoryId,
        originalBundleId: bundle.bundleId,
        clonedBundleId: clonedBundle.bundleId,
        cloneTime: Date.now() - startTime,
      });

      return clonedBundle;
    } catch (error) {
      this.logger.error('AssetBundleFactory', 'cloneBundle', 'Bundle cloning failed', {
        bundleFactoryId: this.bundleFactoryId,
        originalBundleId: bundle.bundleId,
        error: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  }

  /**
   * Configure bundle
   */
  async configureBundle(
    bundle: IAssetBundle,
    config: Partial<BundleConfig>
  ): Promise<IAssetBundle> {
    try {
      this.logger.info('AssetBundleFactory', 'configureBundle', 'Configuring bundle', {
        bundleFactoryId: this.bundleFactoryId,
        bundleId: bundle.bundleId,
        configKeys: Object.keys(config),
      });

      // Update bundle configuration
      const currentConfig = bundle.getBundleConfig();
      const newConfig: BundleConfig = {
        ...currentConfig,
        ...config,
      };

      // Validate new configuration if validation is enabled
      if (this.bundleFactoryConfig.enableValidation) {
        const isValid = await this.validateBundleConfig(newConfig);
        if (!isValid) {
          throw new Error(`Invalid bundle configuration for ID: ${bundle.bundleId}`);
        }
      }

      // Apply new configuration
      bundle.setBundleConfig(newConfig);

      // Update statistics
      this.bundleFactoryStatistics.totalConfigured++;

      this.logger.info('AssetBundleFactory', 'configureBundle', 'Bundle configured successfully', {
        bundleFactoryId: this.bundleFactoryId,
        bundleId: bundle.bundleId,
      });

      return bundle;
    } catch (error) {
      this.logger.error('AssetBundleFactory', 'configureBundle', 'Bundle configuration failed', {
        bundleFactoryId: this.bundleFactoryId,
        bundleId: bundle.bundleId,
        error: error instanceof Error ? error.message : String(error),
      });

      throw error;
    }
  }

  /**
   * Validate bundle configuration
   */
  async validateBundleConfig(config: BundleConfig): Promise<boolean> {
    try {
      this.logger.debug('AssetBundleFactory', 'validateBundleConfig', 'Validating bundle config', {
        bundleFactoryId: this.bundleFactoryId,
        bundleId: config.bundleId,
        bundleType: config.bundleType,
      });

      // Basic validation checks
      if (!config.bundleId || typeof config.bundleId !== 'string') {
        this.logger.warn('AssetBundleFactory', 'validateBundleConfig', 'Invalid bundle ID', {
          bundleFactoryId: this.bundleFactoryId,
          bundleId: config.bundleId,
        });
        this.bundleFactoryStatistics.validationFailures++;
        return false;
      }

      if (!config.bundleName || typeof config.bundleName !== 'string') {
        this.logger.warn('AssetBundleFactory', 'validateBundleConfig', 'Invalid bundle name', {
          bundleFactoryId: this.bundleFactoryId,
          bundleName: config.bundleName,
        });
        this.bundleFactoryStatistics.validationFailures++;
        return false;
      }

      if (!Object.values(BundleType).includes(config.bundleType)) {
        this.logger.warn('AssetBundleFactory', 'validateBundleConfig', 'Invalid bundle type', {
          bundleFactoryId: this.bundleFactoryId,
          bundleType: config.bundleType,
        });
        this.bundleFactoryStatistics.validationFailures++;
        return false;
      }

      if (!Object.values(AssetPriority).includes(config.priority)) {
        this.logger.warn('AssetBundleFactory', 'validateBundleConfig', 'Invalid bundle priority', {
          bundleFactoryId: this.bundleFactoryId,
          priority: config.priority,
        });
        this.bundleFactoryStatistics.validationFailures++;
        return false;
      }

      if (typeof config.preload !== 'boolean') {
        this.logger.warn('AssetBundleFactory', 'validateBundleConfig', 'Invalid preload value', {
          bundleFactoryId: this.bundleFactoryId,
          preload: config.preload,
        });
        this.bundleFactoryStatistics.validationFailures++;
        return false;
      }

      if (typeof config.cache !== 'boolean') {
        this.logger.warn('AssetBundleFactory', 'validateBundleConfig', 'Invalid cache value', {
          bundleFactoryId: this.bundleFactoryId,
          cache: config.cache,
        });
        this.bundleFactoryStatistics.validationFailures++;
        return false;
      }

      // Update statistics
      this.bundleFactoryStatistics.totalValidated++;

      this.logger.debug(
        'AssetBundleFactory',
        'validateBundleConfig',
        'Bundle config validation passed',
        {
          bundleFactoryId: this.bundleFactoryId,
          bundleId: config.bundleId,
        }
      );

      return true;
    } catch (error) {
      this.bundleFactoryStatistics.validationFailures++;

      this.logger.error(
        'AssetBundleFactory',
        'validateBundleConfig',
        'Bundle config validation failed',
        {
          bundleFactoryId: this.bundleFactoryId,
          bundleId: config.bundleId,
          error: error instanceof Error ? error.message : String(error),
        }
      );

      return false;
    }
  }

  /**
   * Register bundle type creator
   */
  registerBundleTypeCreator(bundleType: BundleType, creator: BundleTypeCreator): this {
    this.bundleTypeCreators.set(bundleType, creator);

    this.logger.debug(
      'AssetBundleFactory',
      'registerBundleTypeCreator',
      'Bundle type creator registered',
      {
        bundleFactoryId: this.bundleFactoryId,
        bundleType,
      }
    );

    return this;
  }

  /**
   * Unregister bundle type creator
   */
  unregisterBundleTypeCreator(bundleType: BundleType): this {
    const removed = this.bundleTypeCreators.delete(bundleType);

    if (removed) {
      this.logger.debug(
        'AssetBundleFactory',
        'unregisterBundleTypeCreator',
        'Bundle type creator unregistered',
        {
          bundleFactoryId: this.bundleFactoryId,
          bundleType,
        }
      );
    } else {
      this.logger.warn(
        'AssetBundleFactory',
        'unregisterBundleTypeCreator',
        'Bundle type creator not found',
        {
          bundleFactoryId: this.bundleFactoryId,
          bundleType,
        }
      );
    }

    return this;
  }

  /**
   * Check if bundle type is supported
   */
  isBundleTypeSupported(bundleType: BundleType): boolean {
    return this.bundleTypeCreators.has(bundleType);
  }

  /**
   * Get supported bundle types
   */
  getSupportedBundleTypes(): BundleType[] {
    return Array.from(this.bundleTypeCreators.keys());
  }

  /**
   * Get bundle type creator
   */
  getBundleTypeCreator(bundleType: BundleType): BundleTypeCreator | null {
    return this.bundleTypeCreators.get(bundleType) || null;
  }

  /**
   * Create multiple bundles
   */
  async createBundles(options: BundleCreationOptions[]): Promise<IAssetBundle[]> {
    this.logger.info('AssetBundleFactory', 'createBundles', 'Creating multiple bundles', {
      bundleFactoryId: this.bundleFactoryId,
      count: options.length,
    });

    const creationPromises = options.map(option => this.createBundle(option));
    const bundles = await Promise.allSettled(creationPromises);

    const successfulBundles: IAssetBundle[] = [];
    const failedCreations: number = bundles.filter(result => result.status === 'rejected').length;

    for (const result of bundles) {
      if (result.status === 'fulfilled') {
        successfulBundles.push(result.value);
      }
    }

    this.logger.info('AssetBundleFactory', 'createBundles', 'Multiple bundles creation completed', {
      bundleFactoryId: this.bundleFactoryId,
      total: options.length,
      successful: successfulBundles.length,
      failed: failedCreations,
    });

    return successfulBundles;
  }

  /**
   * Create bundles from configurations
   */
  async createBundlesFromConfigs(configs: BundleConfig[]): Promise<IAssetBundle[]> {
    this.logger.info(
      'AssetBundleFactory',
      'createBundlesFromConfigs',
      'Creating multiple bundles from configs',
      {
        bundleFactoryId: this.bundleFactoryId,
        count: configs.length,
      }
    );

    const creationPromises = configs.map(config => this.createBundleFromConfig(config));
    const bundles = await Promise.allSettled(creationPromises);

    const successfulBundles: IAssetBundle[] = [];
    const failedCreations: number = bundles.filter(result => result.status === 'rejected').length;

    for (const result of bundles) {
      if (result.status === 'fulfilled') {
        successfulBundles.push(result.value);
      }
    }

    this.logger.info(
      'AssetBundleFactory',
      'createBundlesFromConfigs',
      'Multiple bundles creation from configs completed',
      {
        bundleFactoryId: this.bundleFactoryId,
        total: configs.length,
        successful: successfulBundles.length,
        failed: failedCreations,
      }
    );

    return successfulBundles;
  }

  /**
   * Create bundle from assets
   */
  async createBundleFromAssets(
    assets: IAsset[],
    bundleType: BundleType,
    bundleId: string,
    bundleName: string
  ): Promise<IAssetBundle> {
    const startTime = Date.now();

    try {
      this.logger.info(
        'AssetBundleFactory',
        'createBundleFromAssets',
        'Creating bundle from assets',
        {
          bundleFactoryId: this.bundleFactoryId,
          bundleType,
          bundleId,
          bundleName,
          assetCount: assets.length,
        }
      );

      // Create bundle options
      const options: BundleCreationOptions = {
        bundleType,
        bundleId,
        bundleName,
        priority: this.bundleFactoryConfig.defaultPriority,
        preload: this.bundleFactoryConfig.defaultPreload,
        cache: this.bundleFactoryConfig.defaultCache,
        assets,
        metadata: {},
      };

      // Create bundle
      const bundle = await this.createBundle(options);

      // Add all assets to the bundle
      for (const asset of assets) {
        bundle.addAsset(asset);
      }

      this.logger.info(
        'AssetBundleFactory',
        'createBundleFromAssets',
        'Bundle created from assets successfully',
        {
          bundleFactoryId: this.bundleFactoryId,
          bundleId: bundle.bundleId,
          assetCount: assets.length,
          creationTime: Date.now() - startTime,
        }
      );

      return bundle;
    } catch (error) {
      this.logger.error(
        'AssetBundleFactory',
        'createBundleFromAssets',
        'Bundle creation from assets failed',
        {
          bundleFactoryId: this.bundleFactoryId,
          bundleId,
          assetCount: assets.length,
          error: error instanceof Error ? error.message : String(error),
        }
      );

      throw error;
    }
  }

  /**
   * Get creation statistics
   */
  getCreationStatistics(): {
    totalCreated: number;
    successRate: number;
    averageCreationTime: number;
    mostCreatedType: BundleType;
  } {
    const totalCreated = this.bundleFactoryStatistics.totalCreated;
    const totalAttempts = totalCreated + this.bundleFactoryStatistics.validationFailures;
    const successRate = totalAttempts > 0 ? (totalCreated / totalAttempts) * 100 : 100;

    const averageCreationTime =
      this.creationTimes.length > 0
        ? this.creationTimes.reduce((sum, time) => sum + time, 0) / this.creationTimes.length
        : 0;

    const mostCreatedType = this.getMostCreatedBundleType();

    return {
      totalCreated,
      successRate,
      averageCreationTime,
      mostCreatedType,
    };
  }

  /**
   * Clear bundle factory
   */
  clearBundleFactory(): this {
    this.logger.info('AssetBundleFactory', 'clearBundleFactory', 'Clearing bundle factory', {
      bundleFactoryId: this.bundleFactoryId,
    });

    // Reset statistics
    this.bundleFactoryStatistics = {
      totalCreated: 0,
      createdByType: {} as Record<BundleType, number>,
      totalCloned: 0,
      totalConfigured: 0,
      totalValidated: 0,
      validationFailures: 0,
      lastCreationTime: 0,
    };

    // Clear creation times
    this.creationTimes.length = 0;

    // Clear metadata
    this.bundleFactoryMetadata = {};

    this.logger.info('AssetBundleFactory', 'clearBundleFactory', 'Bundle factory cleared', {
      bundleFactoryId: this.bundleFactoryId,
    });

    return this;
  }

  /**
   * Update bundle factory
   */
  updateBundleFactory(deltaTime: number): void {
    // This method can be used for periodic factory maintenance
    // For now, we'll just log the update
    this.logger.debug('AssetBundleFactory', 'updateBundleFactory', 'Bundle factory updated', {
      bundleFactoryId: this.bundleFactoryId,
      deltaTime,
    });
  }

  /**
   * Initialize default bundle type creators (private helper method)
   */
  private initializeDefaultBundleTypeCreators(): void {
    // Register default creator for all bundle types
    const bundleTypes = Object.values(BundleType);

    for (const bundleType of bundleTypes) {
      this.registerBundleTypeCreator(bundleType, this.createDefaultBundle.bind(this));
    }

    this.logger.debug(
      'AssetBundleFactory',
      'initializeDefaultBundleTypeCreators',
      'Default bundle type creators initialized',
      {
        bundleFactoryId: this.bundleFactoryId,
        supportedTypes: bundleTypes.length,
      }
    );
  }

  /**
   * Create default bundle (private helper method)
   */
  private async createDefaultBundle(options: BundleCreationOptions): Promise<IAssetBundle> {
    const bundleConfig: BundleConfig = {
      bundleId: options.bundleId,
      bundleName: options.bundleName,
      bundleType: options.bundleType,
      priority: options.priority || this.bundleFactoryConfig.defaultPriority,
      preload:
        options.preload !== undefined ? options.preload : this.bundleFactoryConfig.defaultPreload,
      cache: options.cache !== undefined ? options.cache : this.bundleFactoryConfig.defaultCache,
      metadata: options.metadata || {},
    };

    return new AssetBundle(options.bundleId, options.bundleType, bundleConfig);
  }

  /**
   * Update creation statistics (private helper method)
   */
  private updateCreationStatistics(bundleType: BundleType, startTime: number): void {
    const creationTime = Date.now() - startTime;

    this.bundleFactoryStatistics.totalCreated++;
    this.bundleFactoryStatistics.createdByType[bundleType] =
      (this.bundleFactoryStatistics.createdByType[bundleType] || 0) + 1;
    this.bundleFactoryStatistics.lastCreationTime = Date.now();

    // Keep only last 100 creation times for average calculation
    this.creationTimes.push(creationTime);
    if (this.creationTimes.length > 100) {
      this.creationTimes.shift();
    }
  }

  /**
   * Get most created bundle type (private helper method)
   */
  private getMostCreatedBundleType(): BundleType {
    let mostCreatedType = BundleType.SCENE;
    let maxCount = 0;

    for (const [bundleType, count] of Object.entries(this.bundleFactoryStatistics.createdByType)) {
      if (count > maxCount) {
        maxCount = count;
        mostCreatedType = bundleType as BundleType;
      }
    }

    return mostCreatedType;
  }
}
