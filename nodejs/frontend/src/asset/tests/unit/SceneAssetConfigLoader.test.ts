/**
 * Scene Asset Config Loader Unit Tests
 *
 * Comprehensive unit tests for the SceneAssetConfigLoader class.
 */

import { SceneAssetConfigLoader } from '../../classes/SceneAssetConfigLoader';
import { Asset } from '../../classes/Asset';
import { AssetBundle } from '../../classes/AssetBundle';
import { AssetType, AssetPriority, AssetState } from '../../interfaces/IAsset';
import { BundleType, BundleState } from '../../interfaces/IAssetBundle';
import { SceneLoadingState, SceneLoadingPhase } from '../../interfaces/scene/ISceneAssetLoader';
import { SceneAssetPhase } from '../../enums/AssetEnums';

// Mock IAssetManager
class MockAssetManager {
  public readonly managerId: string = 'mock-manager';
  public managedAssets: Map<string, any> = new Map();
  public assetBundles: Map<string, any> = new Map();

  async loadAsset(assetKey: string): Promise<any> {
    const asset = this.managedAssets.get(assetKey);
    if (asset) {
      asset.setAssetState(AssetState.LOADED);
      return asset;
    }
    return null;
  }

  async loadBundle(bundleId: string): Promise<any> {
    const bundle = this.assetBundles.get(bundleId);
    if (bundle) {
      bundle.setBundleState(BundleState.LOADED);
      return bundle;
    }
    return null;
  }

  async unloadAsset(assetKey: string): Promise<boolean> {
    const asset = this.managedAssets.get(assetKey);
    if (asset) {
      asset.setAssetState(AssetState.PENDING);
      return true;
    }
    return false;
  }

  async unloadBundle(bundleId: string): Promise<boolean> {
    const bundle = this.assetBundles.get(bundleId);
    if (bundle) {
      bundle.setBundleState(BundleState.PENDING);
      return true;
    }
    return false;
  }

  getAssetsByType(assetType: AssetType): any[] {
    return Array.from(this.managedAssets.values()).filter(asset => asset.assetType === assetType);
  }

  getAssetsByPriority(priority: AssetPriority): any[] {
    return Array.from(this.managedAssets.values()).filter(
      asset => asset.assetConfig.priority === priority
    );
  }

  getBundlesByType(bundleType: BundleType): any[] {
    return Array.from(this.assetBundles.values()).filter(
      bundle => bundle.bundleType === bundleType
    );
  }

  async validateAsset(asset: any): Promise<boolean> {
    return asset && asset.assetKey && asset.assetType;
  }

  async validateBundle(bundle: any): Promise<boolean> {
    return bundle && bundle.bundleId && bundle.bundleType;
  }
}

// Mock ISceneAssetConfig
class MockSceneAssetConfig {
  public readonly configId: string = 'mock-config';
  public readonly sceneId: string = 'mock-scene';
  public sceneAssetConfig: any = {
    sceneId: 'mock-scene',
    basePath: '/test',
    assets: new Map(),
    bundles: new Map(),
    loading: {
      preload: true,
      priority: [AssetPriority.HIGH, AssetPriority.NORMAL],
      strategy: 'parallel' as any,
    },
    validation: {
      required: ['asset1', 'asset2'],
      optional: ['asset3', 'asset4'],
      fallbacks: { asset1: 'fallback1' },
    },
    responsive: {
      breakpoints: {
        mobile: { assets: ['asset1'], bundles: ['bundle1'] },
        desktop: { assets: ['asset1', 'asset2'], bundles: ['bundle1', 'bundle2'] },
      },
      defaultBreakpoint: 'desktop',
    },
  };

  getSceneAssetConfig(): any {
    return this.sceneAssetConfig;
  }

  getResponsiveAssets(breakpoint: string): { assets: any[]; bundles: any[] } {
    const breakpointConfig = this.sceneAssetConfig.responsive.breakpoints[breakpoint];
    if (!breakpointConfig) {
      return { assets: [], bundles: [] };
    }

    const assets = breakpointConfig.assets
      .map((key: string) => this.sceneAssetConfig.assets.get(key))
      .filter(Boolean);
    const bundles = breakpointConfig.bundles
      .map((id: string) => this.sceneAssetConfig.bundles.get(id))
      .filter(Boolean);

    return { assets, bundles };
  }

  validateConfiguration(): any {
    return {
      isValid: true,
      errors: [],
      warnings: [],
      missingAssets: [],
      missingBundles: [],
      invalidAssets: [],
      invalidBundles: [],
    };
  }
}

describe('SceneAssetConfigLoader', () => {
  let loader: SceneAssetConfigLoader;
  let mockAssetManager: MockAssetManager;
  let mockSceneAssetConfig: MockSceneAssetConfig;
  let mockAsset1: Asset;
  let mockAsset2: Asset;
  let mockBundle1: AssetBundle;

  beforeEach(() => {
    mockAssetManager = new MockAssetManager();
    mockSceneAssetConfig = new MockSceneAssetConfig();

    // Create mock assets
    mockAsset1 = new Asset('asset1', 'asset1', AssetType.IMAGE, {
      key: 'asset1',
      path: '/test/asset1.png',
      type: AssetType.IMAGE,
      priority: AssetPriority.HIGH,
      preload: true,
      cache: true,
    });

    mockAsset2 = new Asset('asset2', 'asset2', AssetType.AUDIO, {
      key: 'asset2',
      path: '/test/asset2.mp3',
      type: AssetType.AUDIO,
      priority: AssetPriority.NORMAL,
      preload: true,
      cache: true,
    });

    mockBundle1 = new AssetBundle('bundle1', BundleType.SCENE, {
      bundleId: 'bundle1',
      bundleName: 'Test Bundle',
      bundleType: BundleType.SCENE,
      priority: AssetPriority.NORMAL,
      preload: true,
      cache: true,
    });

    // Add assets to mock manager
    mockAssetManager.managedAssets.set('asset1', mockAsset1);
    mockAssetManager.managedAssets.set('asset2', mockAsset2);
    mockAssetManager.assetBundles.set('bundle1', mockBundle1);

    // Add assets to mock config
    mockSceneAssetConfig.sceneAssetConfig.assets.set('asset1', mockAsset1);
    mockSceneAssetConfig.sceneAssetConfig.assets.set('asset2', mockAsset2);
    mockSceneAssetConfig.sceneAssetConfig.bundles.set('bundle1', mockBundle1);

    loader = new SceneAssetConfigLoader(
      'test-loader',
      'test-scene',
      mockAssetManager as any,
      mockSceneAssetConfig as any
    );
  });

  describe('Constructor', () => {
    it('should create loader with correct initial values', () => {
      expect(loader.loaderId).toBe('test-loader');
      expect(loader.sceneId).toBe('test-scene');
      expect(loader.loadingState).toBe(SceneLoadingState.PENDING);
      expect(loader.currentPhase).toBe(SceneLoadingPhase.INITIALIZATION);
      expect(loader.assetManager).toBe(mockAssetManager);
      expect(loader.sceneAssetConfig).toBe(mockSceneAssetConfig);
    });

    it('should initialize with default loading configuration', () => {
      const config = loader.getLoadingConfig();
      expect(config.enablePreloading).toBe(true);
      expect(config.enableValidation).toBe(true);
      expect(config.enableOptimization).toBe(true);
      expect(config.maxConcurrentLoads).toBe(5);
      expect(config.timeout).toBe(30000);
      expect(config.retryAttempts).toBe(3);
      expect(config.retryDelay).toBe(1000);
    });

    it('should initialize progress correctly', () => {
      const progress = loader.getLoadingProgress();
      expect(progress.totalAssets).toBe(2);
      expect(progress.totalBundles).toBe(1);
      expect(progress.loadedAssets).toBe(0);
      expect(progress.loadedBundles).toBe(0);
      expect(progress.percentage).toBe(0);
      expect(progress.currentPhase).toBe(SceneAssetPhase.ASSETS);
    });

    it('should initialize validation result correctly', () => {
      const validation = loader.getValidationResult();
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toEqual([]);
      expect(validation.warnings).toEqual([]);
      expect(validation.missingAssets).toEqual([]);
      expect(validation.missingBundles).toEqual([]);
    });
  });

  describe('State Management', () => {
    it('should set loading state correctly', () => {
      loader.setLoadingState(SceneLoadingState.LOADING);
      expect(loader.getLoadingState()).toBe(SceneLoadingState.LOADING);
    });

    it('should set current phase correctly', () => {
      loader.setCurrentPhase(SceneLoadingPhase.ASSET_LOADING);
      expect(loader.getCurrentPhase()).toBe(SceneLoadingPhase.ASSET_LOADING);
    });

    it('should return this for method chaining', () => {
      const result = loader
        .setLoadingState(SceneLoadingState.LOADING)
        .setCurrentPhase(SceneLoadingPhase.ASSET_LOADING);
      expect(result).toBe(loader);
    });
  });

  describe('Configuration Management', () => {
    it('should set loading configuration correctly', () => {
      const newConfig = {
        enablePreloading: false,
        enableValidation: false,
        enableOptimization: false,
        maxConcurrentLoads: 10,
        timeout: 60000,
        retryAttempts: 5,
        retryDelay: 2000,
        metadata: { test: 'value' },
      };

      loader.setLoadingConfig(newConfig);
      expect(loader.getLoadingConfig()).toEqual(newConfig);
    });

    it('should set asset manager correctly', () => {
      const newManager = new MockAssetManager();
      loader.setAssetManager(newManager as any);
      expect(loader.getAssetManager()).toBe(newManager);
    });

    it('should set scene asset configuration correctly', () => {
      const newConfig = new MockSceneAssetConfig();
      loader.setSceneAssetConfig(newConfig as any);
      expect(loader.getSceneAssetConfig()).toBe(newConfig);
    });

    it('should return this for method chaining', () => {
      const result = loader
        .setLoadingConfig(loader.getLoadingConfig())
        .setAssetManager(loader.getAssetManager());
      expect(result).toBe(loader);
    });
  });

  describe('Progress and Validation Management', () => {
    it('should set loading progress correctly', () => {
      const newProgress = {
        totalAssets: 5,
        loadedAssets: 3,
        failedAssets: 1,
        totalBundles: 2,
        loadedBundles: 1,
        failedBundles: 0,
        percentage: 60,
        estimatedTimeRemaining: 1000,
        currentPhase: SceneAssetPhase.BUNDLES,
      };

      loader.setLoadingProgress(newProgress);
      expect(loader.getLoadingProgress()).toEqual(newProgress);
    });

    it('should set validation result correctly', () => {
      const newValidation = {
        isValid: true,
        errors: [],
        warnings: ['Warning 1'],
        missingAssets: [],
        missingBundles: [],
        invalidAssets: [],
        invalidBundles: [],
      };

      loader.setValidationResult(newValidation);
      expect(loader.getValidationResult()).toEqual(newValidation);
    });

    it('should set loader metadata correctly', () => {
      const metadata = { test: 'value', version: '1.0.0' };
      loader.setLoaderMetadata(metadata);
      expect(loader.getLoaderMetadata()).toEqual(metadata);
    });

    it('should return this for method chaining', () => {
      const result = loader
        .setLoadingProgress(loader.getLoadingProgress())
        .setValidationResult(loader.getValidationResult());
      expect(result).toBe(loader);
    });
  });

  describe('Asset Loading', () => {
    it('should load asset successfully', async () => {
      const asset = await loader.loadAsset('asset1');
      expect(asset).toBeDefined();
      expect(asset?.assetKey).toBe('asset1');
      expect(loader.isAssetLoaded('asset1')).toBe(true);
    });

    it('should handle asset loading failure', async () => {
      const asset = await loader.loadAsset('nonexistent');
      expect(asset).toBeNull();
      expect(loader.getFailedAssetsCount()).toBe(1);
    });

    it('should load assets by type', async () => {
      const assets = await loader.loadAssetsByType(AssetType.IMAGE);
      expect(assets).toHaveLength(1);
      expect(assets[0].assetType).toBe(AssetType.IMAGE);
    });

    it('should load assets by priority', async () => {
      const assets = await loader.loadAssetsByPriority(AssetPriority.HIGH);
      expect(assets).toHaveLength(1);
      expect(assets[0].assetConfig.priority).toBe(AssetPriority.HIGH);
    });
  });

  describe('Bundle Loading', () => {
    it('should load bundle successfully', async () => {
      const bundle = await loader.loadBundle('bundle1');
      expect(bundle).toBeDefined();
      expect(bundle?.bundleId).toBe('bundle1');
      expect(loader.isBundleLoaded('bundle1')).toBe(true);
    });

    it('should handle bundle loading failure', async () => {
      const bundle = await loader.loadBundle('nonexistent');
      expect(bundle).toBeNull();
      expect(loader.getFailedBundlesCount()).toBe(1);
    });

    it('should load bundles by type', async () => {
      const bundles = await loader.loadBundlesByType(BundleType.SCENE);
      expect(bundles).toHaveLength(1);
      expect(bundles[0].bundleType).toBe(BundleType.SCENE);
    });
  });

  describe('Scene Asset Loading', () => {
    it('should load scene assets successfully', async () => {
      const result = await loader.loadSceneAssets();
      expect(result).toBe(true);
      expect(loader.isLoadingComplete()).toBe(true);
      expect(loader.getLoadedAssetsCount()).toBeGreaterThan(0);
    });

    it('should load required assets', async () => {
      const result = await loader.loadRequiredAssets();
      expect(result).toBe(true);
      expect(loader.getLoadedAssetsCount()).toBe(2);
    });

    it('should load optional assets', async () => {
      const result = await loader.loadOptionalAssets();
      expect(result).toBe(true);
    });

    it('should load scene assets for breakpoint', async () => {
      const result = await loader.loadSceneAssetsForBreakpoint('mobile');
      expect(result).toBe(true);
    });
  });

  describe('Asset Unloading', () => {
    beforeEach(async () => {
      await loader.loadAsset('asset1');
      await loader.loadBundle('bundle1');
    });

    it('should unload asset successfully', async () => {
      const result = await loader.unloadAsset('asset1');
      expect(result).toBe(true);
      expect(loader.isAssetLoaded('asset1')).toBe(false);
    });

    it('should unload bundle successfully', async () => {
      const result = await loader.unloadBundle('bundle1');
      expect(result).toBe(true);
      expect(loader.isBundleLoaded('bundle1')).toBe(false);
    });

    it('should unload scene assets', async () => {
      const result = await loader.unloadSceneAssets();
      expect(result).toBe(true);
      expect(loader.getLoadedAssetsCount()).toBe(0);
      expect(loader.getLoadedBundlesCount()).toBe(0);
    });
  });

  describe('Validation', () => {
    it('should validate scene assets', async () => {
      await loader.loadAsset('asset1');
      const validation = await loader.validateSceneAssets();
      expect(validation).toBeDefined();
      expect(validation.isValid).toBeDefined();
    });
  });

  describe('Loading Control', () => {
    it('should cancel loading', async () => {
      const result = await loader.cancelLoading();
      expect(result).toBe(true);
      expect(loader.getLoadingState()).toBe(SceneLoadingState.CANCELLED);
    });

    it('should pause loading', async () => {
      const result = await loader.pauseLoading();
      expect(result).toBe(true);
    });

    it('should resume loading', async () => {
      const result = await loader.resumeLoading();
      expect(result).toBe(true);
    });
  });

  describe('Status Checks', () => {
    it('should check if loading is complete', () => {
      expect(loader.isLoadingComplete()).toBe(false);
      loader.setLoadingState(SceneLoadingState.COMPLETED);
      expect(loader.isLoadingComplete()).toBe(true);
    });

    it('should check if loading failed', () => {
      expect(loader.isLoadingFailed()).toBe(false);
      loader.setLoadingState(SceneLoadingState.FAILED);
      expect(loader.isLoadingFailed()).toBe(true);
    });

    it('should check if asset is loaded', () => {
      expect(loader.isAssetLoaded('asset1')).toBe(false);
    });

    it('should check if bundle is loaded', () => {
      expect(loader.isBundleLoaded('bundle1')).toBe(false);
    });

    it('should get loaded assets count', () => {
      expect(loader.getLoadedAssetsCount()).toBe(0);
    });

    it('should get loaded bundles count', () => {
      expect(loader.getLoadedBundlesCount()).toBe(0);
    });

    it('should get failed assets count', () => {
      expect(loader.getFailedAssetsCount()).toBe(0);
    });

    it('should get failed bundles count', () => {
      expect(loader.getFailedBundlesCount()).toBe(0);
    });
  });

  describe('Loader Management', () => {
    it('should clear loader', () => {
      loader.setLoadingState(SceneLoadingState.LOADING);
      loader.clearLoader();
      expect(loader.getLoadingState()).toBe(SceneLoadingState.PENDING);
      expect(loader.getCurrentPhase()).toBe(SceneLoadingPhase.INITIALIZATION);
    });

    it('should update loader', () => {
      expect(() => loader.updateLoader(16.67)).not.toThrow();
    });
  });

  describe('Optimization', () => {
    it('should optimize scene assets', async () => {
      const result = await loader.optimizeSceneAssets();
      expect(result).toBe(true);
    });
  });
});
