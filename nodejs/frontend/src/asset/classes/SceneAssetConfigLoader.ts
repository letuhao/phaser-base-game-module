/**
 * Scene Asset Config Loader
 *
 * Concrete implementation of ISceneAssetLoader for loading and processing scene configurations.
 */

import { Logger } from '../../core/Logger';
import type { ISceneAssetLoader, SceneLoadingConfig } from '../interfaces/scene/ISceneAssetLoader';
import { SceneLoadingState, SceneLoadingPhase } from '../interfaces/scene/ISceneAssetLoader';
import type {
  SceneAssetProgress,
  SceneAssetValidation,
} from '../interfaces/scene/ISceneAssetConfig';
import type { ISceneAssetConfigData } from '../interfaces/scene/ISceneAssetConfigData';
import type { IAssetManager } from '../interfaces/IAssetManager';
import type { IAsset } from '../interfaces/IAsset';
import type { IAssetBundle } from '../interfaces/IAssetBundle';
import type { AssetType, AssetPriority } from '../interfaces/IAsset';
import type { BundleType } from '../interfaces/IAssetBundle';
import { SceneAssetPhase } from '../enums/AssetEnums';

/**
 * Scene Asset Config Loader implementation
 */
export class SceneAssetConfigLoader implements ISceneAssetLoader {
  private readonly logger: Logger = Logger.getInstance();

  public readonly loaderId: string;
  public readonly sceneId: string;

  public loadingState: SceneLoadingState = SceneLoadingState.PENDING;
  public currentPhase: SceneLoadingPhase = SceneLoadingPhase.INITIALIZATION;
  public loadingConfig: SceneLoadingConfig;
  public assetManager: IAssetManager;
  public sceneAssetConfig: ISceneAssetConfigData;
  public loadingProgress: SceneAssetProgress;
  public validationResult: SceneAssetValidation;
  public loaderMetadata: Record<string, unknown> = {};

  private loadingStartTime: number = 0;
  private loadingEndTime: number = 0;
  private loadingErrors: string[] = [];
  private loadedAssets: Map<string, IAsset> = new Map();
  private loadedBundles: Map<string, IAssetBundle> = new Map();
  private failedAssets: Set<string> = new Set();
  private failedBundles: Set<string> = new Set();

  constructor(
    loaderId: string,
    sceneId: string,
    assetManager: IAssetManager,
    sceneAssetConfig: ISceneAssetConfigData,
    loadingConfig?: Partial<SceneLoadingConfig>
  ) {
    this.loaderId = loaderId;
    this.sceneId = sceneId;
    this.assetManager = assetManager;
    this.sceneAssetConfig = sceneAssetConfig;

    // Set default loading configuration
    this.loadingConfig = {
      enablePreloading: true,
      enableValidation: true,
      enableOptimization: true,
      maxConcurrentLoads: 5,
      timeout: 30000,
      retryAttempts: 3,
      retryDelay: 1000,
      metadata: {},
      ...loadingConfig,
    };

    // Initialize progress
    this.loadingProgress = {
      totalAssets: 0,
      loadedAssets: 0,
      failedAssets: 0,
      totalBundles: 0,
      loadedBundles: 0,
      failedBundles: 0,
      percentage: 0,
      estimatedTimeRemaining: 0,
      currentPhase: SceneAssetPhase.ASSETS,
    };

    // Initialize validation result
    this.validationResult = {
      isValid: false,
      errors: [],
      warnings: [],
      missingAssets: [],
      missingBundles: [],
      invalidAssets: [],
      invalidBundles: [],
    };

    // Initialize progress with correct values from config
    this.updateProgress();

    this.logger.info('SceneAssetConfigLoader', 'constructor', 'Scene asset config loader created', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
      loadingConfig: this.loadingConfig,
    });
  }

  /**
   * Set loading state
   */
  setLoadingState(state: SceneLoadingState): this {
    const previousState = this.loadingState;
    this.loadingState = state;

    this.logger.debug(
      'SceneAssetConfigLoader',
      'setLoadingState',
      `Loading state changed: ${previousState} → ${state}`,
      {
        loaderId: this.loaderId,
        sceneId: this.sceneId,
      }
    );

    return this;
  }

  /**
   * Set current phase
   */
  setCurrentPhase(phase: SceneLoadingPhase): this {
    const previousPhase = this.currentPhase;
    this.currentPhase = phase;

    this.logger.debug(
      'SceneAssetConfigLoader',
      'setCurrentPhase',
      `Loading phase changed: ${previousPhase} → ${phase}`,
      {
        loaderId: this.loaderId,
        sceneId: this.sceneId,
      }
    );

    return this;
  }

  /**
   * Set loading configuration
   */
  setLoadingConfig(config: SceneLoadingConfig): this {
    this.loadingConfig = config;

    this.logger.debug(
      'SceneAssetConfigLoader',
      'setLoadingConfig',
      'Loading configuration updated',
      {
        loaderId: this.loaderId,
        sceneId: this.sceneId,
        config,
      }
    );

    return this;
  }

  /**
   * Set asset manager
   */
  setAssetManager(manager: IAssetManager): this {
    this.assetManager = manager;

    this.logger.debug('SceneAssetConfigLoader', 'setAssetManager', 'Asset manager updated', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
      managerId: manager.managerId,
    });

    return this;
  }

  /**
   * Set scene asset configuration
   */
  setSceneAssetConfig(config: ISceneAssetConfigData): this {
    this.sceneAssetConfig = config;

    this.logger.debug(
      'SceneAssetConfigLoader',
      'setSceneAssetConfig',
      'Scene asset configuration updated',
      {
        loaderId: this.loaderId,
        sceneId: this.sceneId,
        configSceneId: config.sceneId,
      }
    );

    return this;
  }

  /**
   * Set loading progress
   */
  setLoadingProgress(progress: SceneAssetProgress): this {
    this.loadingProgress = progress;

    this.logger.debug('SceneAssetConfigLoader', 'setLoadingProgress', 'Loading progress updated', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
      progress,
    });

    return this;
  }

  /**
   * Set validation result
   */
  setValidationResult(validation: SceneAssetValidation): this {
    this.validationResult = validation;

    this.logger.debug(
      'SceneAssetConfigLoader',
      'setValidationResult',
      'Validation result updated',
      {
        loaderId: this.loaderId,
        sceneId: this.sceneId,
        isValid: validation.isValid,
        errorCount: validation.errors.length,
        warningCount: validation.warnings.length,
      }
    );

    return this;
  }

  /**
   * Set loader metadata
   */
  setLoaderMetadata(metadata: Record<string, unknown>): this {
    this.loaderMetadata = metadata;

    this.logger.debug('SceneAssetConfigLoader', 'setLoaderMetadata', 'Loader metadata updated', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
      metadata,
    });

    return this;
  }

  /**
   * Get loading state
   */
  getLoadingState(): SceneLoadingState {
    return this.loadingState;
  }

  /**
   * Get current phase
   */
  getCurrentPhase(): SceneLoadingPhase {
    return this.currentPhase;
  }

  /**
   * Get loading configuration
   */
  getLoadingConfig(): SceneLoadingConfig {
    return this.loadingConfig;
  }

  /**
   * Get asset manager
   */
  getAssetManager(): IAssetManager {
    return this.assetManager;
  }

  /**
   * Get scene asset configuration
   */
  getSceneAssetConfig(): ISceneAssetConfigData {
    return this.sceneAssetConfig;
  }

  /**
   * Get loader ID
   */
  getLoaderId(): string {
    return this.loaderId;
  }

  /**
   * Get scene ID
   */
  getSceneId(): string {
    return this.sceneId;
  }

  /**
   * Get responsive assets for breakpoint
   */
  private getResponsiveAssets(breakpoint: string): { assets: any[]; bundles: any[] } {
    const config = this.sceneAssetConfig;
    const responsiveConfig = config.responsive?.breakpoints?.[breakpoint];

    if (!responsiveConfig) {
      return { assets: [], bundles: [] };
    }

    const assets = responsiveConfig.assets
      .map(assetKey => config.assets.find(asset => asset.key === assetKey))
      .filter(Boolean);

    const bundles = responsiveConfig.bundles
      .map(bundleId => config.bundles.find(bundle => bundle.bundleId === bundleId))
      .filter(Boolean);

    return { assets, bundles };
  }

  /**
   * Validate configuration
   */
  private validateConfiguration(): any {
    const config = this.sceneAssetConfig;
    const validation = {
      isValid: true,
      errors: [] as string[],
      warnings: [] as string[],
      invalidAssets: [] as string[],
      invalidBundles: [] as string[],
    };

    // Basic validation
    if (!config.sceneId) {
      validation.errors.push('Scene ID is required');
      validation.isValid = false;
    }

    if (!config.assets || config.assets.length === 0) {
      validation.warnings.push('No assets configured');
    }

    if (!config.bundles || config.bundles.length === 0) {
      validation.warnings.push('No bundles configured');
    }

    return validation;
  }

  /**
   * Get loading progress
   */
  getLoadingProgress(): SceneAssetProgress {
    return this.loadingProgress;
  }

  /**
   * Get validation result
   */
  getValidationResult(): SceneAssetValidation {
    return this.validationResult;
  }

  /**
   * Get loader metadata
   */
  getLoaderMetadata(): Record<string, unknown> {
    return this.loaderMetadata;
  }

  /**
   * Load scene assets
   */
  async loadSceneAssets(): Promise<boolean> {
    this.logger.info('SceneAssetConfigLoader', 'loadSceneAssets', 'Starting scene asset loading', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
    });

    try {
      this.loadingStartTime = Date.now();
      this.setLoadingState(SceneLoadingState.LOADING);
      this.setCurrentPhase(SceneLoadingPhase.INITIALIZATION);

      // Initialize progress
      this.updateProgress();

      // Load required assets first
      if (this.loadingConfig.enablePreloading) {
        await this.loadRequiredAssets();
      }

      // Load optional assets
      await this.loadOptionalAssets();

      // Validate if enabled
      if (this.loadingConfig.enableValidation) {
        this.setCurrentPhase(SceneLoadingPhase.VALIDATION);
        await this.validateSceneAssets();
      }

      // Optimize if enabled
      if (this.loadingConfig.enableOptimization) {
        this.setCurrentPhase(SceneLoadingPhase.OPTIMIZATION);
        await this.optimizeSceneAssets();
      }

      this.setCurrentPhase(SceneLoadingPhase.COMPLETION);
      this.loadingEndTime = Date.now();
      this.setLoadingState(SceneLoadingState.COMPLETED);

      this.logger.info(
        'SceneAssetConfigLoader',
        'loadSceneAssets',
        'Scene asset loading completed successfully',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
          loadTime: this.loadingEndTime - this.loadingStartTime,
          loadedAssets: this.loadedAssets.size,
          loadedBundles: this.loadedBundles.size,
        }
      );

      return true;
    } catch (error) {
      this.loadingEndTime = Date.now();
      this.setLoadingState(SceneLoadingState.FAILED);
      this.loadingErrors.push(error instanceof Error ? error.message : String(error));

      this.logger.error('SceneAssetConfigLoader', 'loadSceneAssets', 'Scene asset loading failed', {
        loaderId: this.loaderId,
        sceneId: this.sceneId,
        error: error instanceof Error ? error.message : String(error),
        loadTime: this.loadingEndTime - this.loadingStartTime,
      });

      return false;
    }
  }

  /**
   * Load scene assets for breakpoint
   */
  async loadSceneAssetsForBreakpoint(breakpoint: string): Promise<boolean> {
    this.logger.info(
      'SceneAssetConfigLoader',
      'loadSceneAssetsForBreakpoint',
      'Loading scene assets for breakpoint',
      {
        loaderId: this.loaderId,
        sceneId: this.sceneId,
        breakpoint,
      }
    );

    try {
      const responsiveAssets = this.getResponsiveAssets(breakpoint);

      // Load responsive assets
      for (const asset of responsiveAssets.assets) {
        await this.loadAsset(asset.assetKey);
      }

      // Load responsive bundles
      for (const bundle of responsiveAssets.bundles) {
        await this.loadBundle(bundle.bundleId);
      }

      this.logger.info(
        'SceneAssetConfigLoader',
        'loadSceneAssetsForBreakpoint',
        'Breakpoint assets loaded successfully',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
          breakpoint,
          assetCount: responsiveAssets.assets.length,
          bundleCount: responsiveAssets.bundles.length,
        }
      );

      return true;
    } catch (error) {
      this.logger.error(
        'SceneAssetConfigLoader',
        'loadSceneAssetsForBreakpoint',
        'Breakpoint asset loading failed',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
          breakpoint,
          error: error instanceof Error ? error.message : String(error),
        }
      );

      return false;
    }
  }

  /**
   * Load required assets
   */
  async loadRequiredAssets(): Promise<boolean> {
    this.logger.info('SceneAssetConfigLoader', 'loadRequiredAssets', 'Loading required assets', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
    });

    try {
      const config = this.sceneAssetConfig;
      const requiredAssets = config.validation.required;

      for (const assetKey of requiredAssets) {
        const asset = await this.loadAsset(assetKey);
        if (!asset) {
          this.failedAssets.add(assetKey);
          this.logger.warn(
            'SceneAssetConfigLoader',
            'loadRequiredAssets',
            'Required asset failed to load',
            {
              loaderId: this.loaderId,
              sceneId: this.sceneId,
              assetKey,
            }
          );
        }
      }

      this.logger.info(
        'SceneAssetConfigLoader',
        'loadRequiredAssets',
        'Required assets loading completed',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
          totalRequired: requiredAssets.length,
          loaded: this.loadedAssets.size,
          failed: this.failedAssets.size,
        }
      );

      return true;
    } catch (error) {
      this.logger.error(
        'SceneAssetConfigLoader',
        'loadRequiredAssets',
        'Required assets loading failed',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
          error: error instanceof Error ? error.message : String(error),
        }
      );

      return false;
    }
  }

  /**
   * Load optional assets
   */
  async loadOptionalAssets(): Promise<boolean> {
    this.logger.info('SceneAssetConfigLoader', 'loadOptionalAssets', 'Loading optional assets', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
    });

    try {
      const config = this.sceneAssetConfig;
      const optionalAssets = config.validation.optional;

      for (const assetKey of optionalAssets) {
        const asset = await this.loadAsset(assetKey);
        if (!asset) {
          this.failedAssets.add(assetKey);
          this.logger.debug(
            'SceneAssetConfigLoader',
            'loadOptionalAssets',
            'Optional asset failed to load',
            {
              loaderId: this.loaderId,
              sceneId: this.sceneId,
              assetKey,
            }
          );
        }
      }

      this.logger.info(
        'SceneAssetConfigLoader',
        'loadOptionalAssets',
        'Optional assets loading completed',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
          totalOptional: optionalAssets.length,
          loaded: this.loadedAssets.size,
          failed: this.failedAssets.size,
        }
      );

      return true;
    } catch (error) {
      this.logger.error(
        'SceneAssetConfigLoader',
        'loadOptionalAssets',
        'Optional assets loading failed',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
          error: error instanceof Error ? error.message : String(error),
        }
      );

      return false;
    }
  }

  /**
   * Load asset by key
   */
  async loadAsset(assetKey: string): Promise<IAsset | null> {
    this.logger.debug('SceneAssetConfigLoader', 'loadAsset', 'Loading asset', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
      assetKey,
    });

    try {
      const asset = await this.assetManager.loadAsset(assetKey);

      if (asset) {
        this.loadedAssets.set(assetKey, asset);
        this.updateProgress();
      } else {
        this.failedAssets.add(assetKey);
      }

      return asset;
    } catch (error) {
      this.failedAssets.add(assetKey);
      this.logger.error('SceneAssetConfigLoader', 'loadAsset', 'Asset loading failed', {
        loaderId: this.loaderId,
        sceneId: this.sceneId,
        assetKey,
        error: error instanceof Error ? error.message : String(error),
      });

      return null;
    }
  }

  /**
   * Load assets by type
   */
  async loadAssetsByType(assetType: AssetType): Promise<IAsset[]> {
    this.logger.debug('SceneAssetConfigLoader', 'loadAssetsByType', 'Loading assets by type', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
      assetType,
    });

    try {
      // Get assets by type from the manager and load them individually
      const existingAssets = this.assetManager.getAssetsByType(assetType);
      const assets: IAsset[] = [];

      for (const existingAsset of existingAssets) {
        const loadedAsset = await this.assetManager.loadAsset(existingAsset.assetKey);
        if (loadedAsset) {
          assets.push(loadedAsset);
        }
      }

      for (const asset of assets) {
        this.loadedAssets.set(asset.assetKey, asset);
      }

      this.updateProgress();

      return assets;
    } catch (error) {
      this.logger.error(
        'SceneAssetConfigLoader',
        'loadAssetsByType',
        'Assets by type loading failed',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
          assetType,
          error: error instanceof Error ? error.message : String(error),
        }
      );

      return [];
    }
  }

  /**
   * Load assets by priority
   */
  async loadAssetsByPriority(priority: AssetPriority): Promise<IAsset[]> {
    this.logger.debug(
      'SceneAssetConfigLoader',
      'loadAssetsByPriority',
      'Loading assets by priority',
      {
        loaderId: this.loaderId,
        sceneId: this.sceneId,
        priority,
      }
    );

    try {
      // Get assets by priority from the manager and load them individually
      const existingAssets = this.assetManager.getAssetsByPriority(priority);
      const assets: IAsset[] = [];

      for (const existingAsset of existingAssets) {
        const loadedAsset = await this.assetManager.loadAsset(existingAsset.assetKey);
        if (loadedAsset) {
          assets.push(loadedAsset);
        }
      }

      for (const asset of assets) {
        this.loadedAssets.set(asset.assetKey, asset);
      }

      this.updateProgress();

      return assets;
    } catch (error) {
      this.logger.error(
        'SceneAssetConfigLoader',
        'loadAssetsByPriority',
        'Assets by priority loading failed',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
          priority,
          error: error instanceof Error ? error.message : String(error),
        }
      );

      return [];
    }
  }

  /**
   * Load bundle by ID
   */
  async loadBundle(bundleId: string): Promise<IAssetBundle | null> {
    this.logger.debug('SceneAssetConfigLoader', 'loadBundle', 'Loading bundle', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
      bundleId,
    });

    try {
      const bundle = await this.assetManager.loadBundle(bundleId);

      if (bundle) {
        this.loadedBundles.set(bundleId, bundle);
        this.updateProgress();
      } else {
        this.failedBundles.add(bundleId);
      }

      return bundle;
    } catch (error) {
      this.failedBundles.add(bundleId);
      this.logger.error('SceneAssetConfigLoader', 'loadBundle', 'Bundle loading failed', {
        loaderId: this.loaderId,
        sceneId: this.sceneId,
        bundleId,
        error: error instanceof Error ? error.message : String(error),
      });

      return null;
    }
  }

  /**
   * Load bundles by type
   */
  async loadBundlesByType(bundleType: BundleType): Promise<IAssetBundle[]> {
    this.logger.debug('SceneAssetConfigLoader', 'loadBundlesByType', 'Loading bundles by type', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
      bundleType,
    });

    try {
      // Get bundles by type from the manager and load them individually
      const existingBundles = this.assetManager.getBundlesByType(bundleType);
      const bundles: IAssetBundle[] = [];

      for (const existingBundle of existingBundles) {
        const loadedBundle = await this.assetManager.loadBundle(existingBundle.bundleId);
        if (loadedBundle) {
          bundles.push(loadedBundle);
        }
      }

      for (const bundle of bundles) {
        this.loadedBundles.set(bundle.bundleId, bundle);
      }

      this.updateProgress();

      return bundles;
    } catch (error) {
      this.logger.error(
        'SceneAssetConfigLoader',
        'loadBundlesByType',
        'Bundles by type loading failed',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
          bundleType,
          error: error instanceof Error ? error.message : String(error),
        }
      );

      return [];
    }
  }

  /**
   * Unload scene assets
   */
  async unloadSceneAssets(): Promise<boolean> {
    this.logger.info('SceneAssetConfigLoader', 'unloadSceneAssets', 'Unloading scene assets', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
    });

    try {
      // Unload all assets
      for (const assetKey of Array.from(this.loadedAssets.keys())) {
        await this.unloadAsset(assetKey);
      }

      // Unload all bundles
      for (const bundleId of Array.from(this.loadedBundles.keys())) {
        await this.unloadBundle(bundleId);
      }

      // Clear collections
      this.loadedAssets.clear();
      this.loadedBundles.clear();
      this.failedAssets.clear();
      this.failedBundles.clear();

      this.updateProgress();

      this.logger.info(
        'SceneAssetConfigLoader',
        'unloadSceneAssets',
        'Scene assets unloaded successfully',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
        }
      );

      return true;
    } catch (error) {
      this.logger.error(
        'SceneAssetConfigLoader',
        'unloadSceneAssets',
        'Scene assets unloading failed',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
          error: error instanceof Error ? error.message : String(error),
        }
      );

      return false;
    }
  }

  /**
   * Unload asset
   */
  async unloadAsset(assetKey: string): Promise<boolean> {
    this.logger.debug('SceneAssetConfigLoader', 'unloadAsset', 'Unloading asset', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
      assetKey,
    });

    try {
      const success = await this.assetManager.unloadAsset(assetKey);

      if (success) {
        this.loadedAssets.delete(assetKey);
        this.failedAssets.delete(assetKey);
        this.updateProgress();
      }

      return success;
    } catch (error) {
      this.logger.error('SceneAssetConfigLoader', 'unloadAsset', 'Asset unloading failed', {
        loaderId: this.loaderId,
        sceneId: this.sceneId,
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
    this.logger.debug('SceneAssetConfigLoader', 'unloadBundle', 'Unloading bundle', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
      bundleId,
    });

    try {
      const success = await this.assetManager.unloadBundle(bundleId);

      if (success) {
        this.loadedBundles.delete(bundleId);
        this.failedBundles.delete(bundleId);
        this.updateProgress();
      }

      return success;
    } catch (error) {
      this.logger.error('SceneAssetConfigLoader', 'unloadBundle', 'Bundle unloading failed', {
        loaderId: this.loaderId,
        sceneId: this.sceneId,
        bundleId,
        error: error instanceof Error ? error.message : String(error),
      });

      return false;
    }
  }

  /**
   * Validate scene assets
   */
  async validateSceneAssets(): Promise<SceneAssetValidation> {
    this.logger.info('SceneAssetConfigLoader', 'validateSceneAssets', 'Validating scene assets', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
    });

    try {
      const validation = this.validateConfiguration();

      // Additional validation for loaded assets
      for (const [assetKey, asset] of Array.from(this.loadedAssets.entries())) {
        if (!(await this.assetManager.validateAsset(asset))) {
          validation.invalidAssets.push(assetKey);
        }
      }

      // Additional validation for loaded bundles
      for (const [bundleId, bundle] of Array.from(this.loadedBundles.entries())) {
        if (!(await this.assetManager.validateBundle(bundle))) {
          validation.invalidBundles.push(bundleId);
        }
      }

      // Check for missing required assets
      const config = this.sceneAssetConfig;
      for (const requiredAsset of config.validation.required) {
        if (!this.loadedAssets.has(requiredAsset)) {
          validation.missingAssets.push(requiredAsset);
        }
      }

      validation.isValid =
        validation.errors.length === 0 &&
        validation.missingAssets.length === 0 &&
        validation.invalidAssets.length === 0;

      this.setValidationResult(validation);

      this.logger.info(
        'SceneAssetConfigLoader',
        'validateSceneAssets',
        'Scene assets validation completed',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
          isValid: validation.isValid,
          errorCount: validation.errors.length,
          warningCount: validation.warnings.length,
          missingAssets: validation.missingAssets.length,
          invalidAssets: validation.invalidAssets.length,
        }
      );

      return validation;
    } catch (error) {
      const validation: SceneAssetValidation = {
        isValid: false,
        errors: [error instanceof Error ? error.message : String(error)],
        warnings: [],
        missingAssets: [],
        missingBundles: [],
        invalidAssets: [],
        invalidBundles: [],
      };

      this.setValidationResult(validation);

      this.logger.error(
        'SceneAssetConfigLoader',
        'validateSceneAssets',
        'Scene assets validation failed',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
          error: error instanceof Error ? error.message : String(error),
        }
      );

      return validation;
    }
  }

  /**
   * Optimize scene assets
   */
  async optimizeSceneAssets(): Promise<boolean> {
    this.logger.info('SceneAssetConfigLoader', 'optimizeSceneAssets', 'Optimizing scene assets', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
    });

    try {
      // This is a placeholder for optimization logic
      // In a real implementation, this could include:
      // - Asset compression
      // - Memory optimization
      // - Loading order optimization
      // - Cache optimization

      this.logger.info(
        'SceneAssetConfigLoader',
        'optimizeSceneAssets',
        'Scene assets optimization completed',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
        }
      );

      return true;
    } catch (error) {
      this.logger.error(
        'SceneAssetConfigLoader',
        'optimizeSceneAssets',
        'Scene assets optimization failed',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
          error: error instanceof Error ? error.message : String(error),
        }
      );

      return false;
    }
  }

  /**
   * Cancel loading
   */
  async cancelLoading(): Promise<boolean> {
    this.logger.info('SceneAssetConfigLoader', 'cancelLoading', 'Cancelling loading', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
    });

    try {
      this.setLoadingState(SceneLoadingState.CANCELLED);

      // Unload any partially loaded assets
      await this.unloadSceneAssets();

      this.logger.info(
        'SceneAssetConfigLoader',
        'cancelLoading',
        'Loading cancelled successfully',
        {
          loaderId: this.loaderId,
          sceneId: this.sceneId,
        }
      );

      return true;
    } catch (error) {
      this.logger.error('SceneAssetConfigLoader', 'cancelLoading', 'Loading cancellation failed', {
        loaderId: this.loaderId,
        sceneId: this.sceneId,
        error: error instanceof Error ? error.message : String(error),
      });

      return false;
    }
  }

  /**
   * Pause loading
   */
  async pauseLoading(): Promise<boolean> {
    this.logger.info('SceneAssetConfigLoader', 'pauseLoading', 'Pausing loading', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
    });

    // In a real implementation, this would pause ongoing loading operations
    // For now, we'll just log the action
    return true;
  }

  /**
   * Resume loading
   */
  async resumeLoading(): Promise<boolean> {
    this.logger.info('SceneAssetConfigLoader', 'resumeLoading', 'Resuming loading', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
    });

    // In a real implementation, this would resume paused loading operations
    // For now, we'll just log the action
    return true;
  }

  /**
   * Check if loading is complete
   */
  isLoadingComplete(): boolean {
    return this.loadingState === SceneLoadingState.COMPLETED;
  }

  /**
   * Check if loading failed
   */
  isLoadingFailed(): boolean {
    return this.loadingState === SceneLoadingState.FAILED;
  }

  /**
   * Check if asset is loaded
   */
  isAssetLoaded(assetKey: string): boolean {
    return this.loadedAssets.has(assetKey);
  }

  /**
   * Check if bundle is loaded
   */
  isBundleLoaded(bundleId: string): boolean {
    return this.loadedBundles.has(bundleId);
  }

  /**
   * Get loaded assets count
   */
  getLoadedAssetsCount(): number {
    return this.loadedAssets.size;
  }

  /**
   * Get loaded bundles count
   */
  getLoadedBundlesCount(): number {
    return this.loadedBundles.size;
  }

  /**
   * Get failed assets count
   */
  getFailedAssetsCount(): number {
    return this.failedAssets.size;
  }

  /**
   * Get failed bundles count
   */
  getFailedBundlesCount(): number {
    return this.failedBundles.size;
  }

  /**
   * Clear loader
   */
  clearLoader(): this {
    this.logger.info('SceneAssetConfigLoader', 'clearLoader', 'Clearing loader', {
      loaderId: this.loaderId,
      sceneId: this.sceneId,
    });

    this.loadedAssets.clear();
    this.loadedBundles.clear();
    this.failedAssets.clear();
    this.failedBundles.clear();
    this.loadingErrors = [];
    this.loadingStartTime = 0;
    this.loadingEndTime = 0;

    this.setLoadingState(SceneLoadingState.PENDING);
    this.setCurrentPhase(SceneLoadingPhase.INITIALIZATION);
    this.updateProgress();

    return this;
  }

  /**
   * Update loader
   */
  updateLoader(_deltaTime: number): void {
    // Update progress
    this.updateProgress();

    // Update estimated time remaining
    if (this.loadingState === SceneLoadingState.LOADING && this.loadingStartTime > 0) {
      const elapsedTime = Date.now() - this.loadingStartTime;
      const totalItems = this.loadingProgress.totalAssets + this.loadingProgress.totalBundles;
      const completedItems = this.loadingProgress.loadedAssets + this.loadingProgress.loadedBundles;

      if (completedItems > 0 && totalItems > completedItems) {
        const averageTimePerItem = elapsedTime / completedItems;
        const remainingItems = totalItems - completedItems;
        this.loadingProgress.estimatedTimeRemaining = averageTimePerItem * remainingItems;
      }
    }
  }

  /**
   * Map loading phase to asset phase
   */
  private mapLoadingPhaseToAssetPhase(phase: SceneLoadingPhase): SceneAssetPhase {
    switch (phase) {
      case SceneLoadingPhase.INITIALIZATION:
      case SceneLoadingPhase.ASSET_LOADING:
        return SceneAssetPhase.ASSETS;
      case SceneLoadingPhase.BUNDLE_LOADING:
        return SceneAssetPhase.BUNDLES;
      case SceneLoadingPhase.VALIDATION:
        return SceneAssetPhase.VALIDATION;
      case SceneLoadingPhase.OPTIMIZATION:
      case SceneLoadingPhase.COMPLETION:
        return SceneAssetPhase.COMPLETE;
      default:
        return SceneAssetPhase.ASSETS;
    }
  }

  /**
   * Update loading progress
   */
  private updateProgress(): void {
    const config = this.sceneAssetConfig;
    const totalAssets = config.assets.length;
    const totalBundles = config.bundles.length;
    const loadedAssets = this.loadedAssets.size;
    const loadedBundles = this.loadedBundles.size;
    const failedAssets = this.failedAssets.size;
    const failedBundles = this.failedBundles.size;

    const totalItems = totalAssets + totalBundles;
    const completedItems = loadedAssets + loadedBundles;
    const percentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

    this.loadingProgress = {
      totalAssets,
      loadedAssets,
      failedAssets,
      totalBundles,
      loadedBundles,
      failedBundles,
      percentage,
      estimatedTimeRemaining: this.loadingProgress.estimatedTimeRemaining,
      currentPhase: this.mapLoadingPhaseToAssetPhase(this.getCurrentPhase()),
    };
  }
}
