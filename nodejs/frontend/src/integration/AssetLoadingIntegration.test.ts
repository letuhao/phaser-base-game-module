/**
 * Asset Loading Integration Test
 *
 * Tests the complete asset loading flow to ensure proper integration
 * between AssetManager, SceneAssetConfigLoader, and the Levis2025R3WheelScene.
 */

import { AssetManager } from '../asset/classes/AssetManager';
import { SceneAssetConfigLoader } from '../asset/classes/SceneAssetConfigLoader';
import { levis2025R3WheelScene1AssetConfig } from '../runtime/games/levis-2025-r3-wheel/scene-1/levis-2025-r3-wheel-scene-1.asset.config';
import { AssetType, AssetState } from '../asset/interfaces/IAsset';
import { BundleType } from '../asset/interfaces/IAssetBundle';
import { SceneLoadingPhase, SceneLoadingState } from '../asset/interfaces/scene/ISceneAssetLoader';

describe('Asset Loading Integration', () => {
  let assetManager: AssetManager;
  let sceneAssetLoader: SceneAssetConfigLoader;

  beforeEach(() => {
    // Create fresh instances for each test
    assetManager = new AssetManager('integration-test-asset-manager');
    sceneAssetLoader = new SceneAssetConfigLoader(
      'integration-test-loader',
      levis2025R3WheelScene1AssetConfig.sceneId,
      assetManager,
      levis2025R3WheelScene1AssetConfig as any
    );
  });

  afterEach(() => {
    // Clean up after each test
    assetManager.clearManager();
  });

  describe('Configuration Loading', () => {
    it('should load scene asset configuration correctly', () => {
      // Verify the config is loaded
      expect(sceneAssetLoader.getSceneId()).toBe(levis2025R3WheelScene1AssetConfig.sceneId);
      expect(sceneAssetLoader.getSceneAssetConfig()).toBeDefined();

      // Verify config structure
      const config = sceneAssetLoader.getSceneAssetConfig();
      expect(config.sceneId).toBe('levis-2025-r3-wheel-scene-1');
      expect(config.assets).toBeDefined();
      expect(config.bundles).toBeDefined();
    });

    it('should have correct asset configuration structure', () => {
      const config = sceneAssetLoader.getSceneAssetConfig();

      // Check that we have the expected assets
      expect(config.assets.length).toBeGreaterThan(0);

      // Verify asset structure
      const firstAsset = config.assets[0];
      expect(firstAsset.key).toBeDefined();
      expect(firstAsset.path).toBeDefined();
      expect(firstAsset.type).toBeDefined();
      expect(firstAsset.priority).toBeDefined();
    });

    it('should have correct bundle configuration structure', () => {
      const config = sceneAssetLoader.getSceneAssetConfig();

      // Check that we have the expected bundles
      expect(config.bundles.length).toBeGreaterThan(0);

      // Verify bundle structure
      const firstBundle = config.bundles[0];
      expect(firstBundle.bundleId).toBeDefined();
      expect(firstBundle.bundleType).toBeDefined();
      expect(firstBundle.assetKeys).toBeDefined();
    });
  });

  describe('Asset Manager Integration', () => {
    it('should initialize asset manager correctly', () => {
      expect(assetManager.managerId).toBe('integration-test-asset-manager');
      expect(assetManager.managerConfig).toBeDefined();
      expect(assetManager.assetFactory).toBeDefined();
      expect(assetManager.bundleFactory).toBeDefined();
      expect(assetManager.cacheManager).toBeDefined();
      expect(assetManager.poolManager).toBeDefined();
      expect(assetManager.validationManager).toBeDefined();
      expect(assetManager.statisticsManager).toBeDefined();
    });

    it('should have proper manager configuration', () => {
      const config = assetManager.getManagerConfig();

      expect(config.enableCaching).toBeDefined();
      expect(config.enablePooling).toBeDefined();
      expect(config.enableValidation).toBeDefined();
      expect(config.enableStatistics).toBeDefined();
      expect(config.maxCacheSize).toBeDefined();
      expect(config.maxPoolSize).toBeDefined();
      expect(config.defaultTimeout).toBeDefined();
      expect(config.retryAttempts).toBeDefined();
      expect(config.retryDelay).toBeDefined();
    });
  });

  describe('Scene Asset Loader Integration', () => {
    it('should initialize scene asset loader correctly', () => {
      expect(sceneAssetLoader.getLoaderId()).toBe('integration-test-loader');
      expect(sceneAssetLoader.getSceneId()).toBe('levis-2025-r3-wheel-scene-1');
      expect(sceneAssetLoader.getAssetManager()).toBe(assetManager);
      expect(sceneAssetLoader.getSceneAssetConfig()).toBeDefined();
    });

    it('should track loading progress correctly', () => {
      const progress = sceneAssetLoader.getLoadingProgress();

      expect(progress).toBeDefined();
      expect(progress.totalAssets).toBeGreaterThan(0);
      expect(progress.loadedAssets).toBe(0); // Initially no assets loaded
      expect(progress.totalBundles).toBeGreaterThan(0);
      expect(progress.loadedBundles).toBe(0); // Initially no bundles loaded
      expect(progress.percentage).toBe(0); // Initially 0%
    });

    it('should track loading state correctly', () => {
      expect(sceneAssetLoader.getLoadingState()).toBe(SceneLoadingState.PENDING);
      expect(sceneAssetLoader.getCurrentPhase()).toBe(SceneLoadingPhase.INITIALIZATION);
      expect(sceneAssetLoader.isLoadingComplete()).toBe(false);
    });
  });

  describe('Asset Loading Flow', () => {
    it('should validate asset configuration before loading', async () => {
      const config = sceneAssetLoader.getSceneAssetConfig();

      // Test asset validation
      for (const assetConfig of config.assets) {
        const isValid = assetManager.validateAssetConfig(assetConfig);
        expect(isValid).toBe(true);
      }
    });

    it('should validate bundle configuration before loading', async () => {
      const config = sceneAssetLoader.getSceneAssetConfig();

      // Test bundle validation
      for (const bundleConfig of config.bundles) {
        const isValid = assetManager.validateBundleConfig(bundleConfig);
        expect(isValid).toBe(true);
      }
    });

    it('should create assets from configuration', async () => {
      const config = sceneAssetLoader.getSceneAssetConfig();

      // Test asset creation
      for (const assetConfig of config.assets) {
        const asset = await assetManager.assetFactory.createAssetFromConfig(assetConfig);
        expect(asset).toBeDefined();
        expect(asset.assetKey).toBe(assetConfig.key);
        expect(asset.assetType).toBe(assetConfig.type);
      }
    });

    it('should create bundles from configuration', async () => {
      const config = sceneAssetLoader.getSceneAssetConfig();

      // Test bundle creation
      for (const bundleConfig of config.bundles) {
        const bundle = await assetManager.bundleFactory.createBundle(bundleConfig);
        expect(bundle).toBeDefined();
        expect(bundle.bundleId).toBe(bundleConfig.bundleId);
        expect(bundle.bundleType).toBe(bundleConfig.bundleType);
      }
    });
  });

  describe('Loading Statistics', () => {
    it('should track loading statistics correctly', () => {
      const stats = assetManager.getManagerStatistics();

      expect(stats.totalAssets).toBe(0); // Initially no assets
      expect(stats.loadedAssets).toBe(0);
      expect(stats.failedAssets).toBe(0);
      expect(stats.totalBundles).toBe(0); // Initially no bundles
      expect(stats.loadedBundles).toBe(0);
      expect(stats.failedBundles).toBe(0);
      expect(stats.totalLoadTime).toBe(0);
      expect(stats.averageLoadTime).toBe(0);
      expect(stats.cacheHitRate).toBe(0);
      expect(stats.successRate).toBe(0);
    });

    it('should update statistics after asset operations', async () => {
      const config = sceneAssetLoader.getSceneAssetConfig();
      const initialStats = assetManager.getManagerStatistics();

      // Create and register an asset
      const assetConfig = config.assets[0];
      const asset = await assetManager.assetFactory.createAssetFromConfig(assetConfig);
      assetManager.registerAsset(asset);

      const updatedStats = assetManager.getManagerStatistics();
      expect(updatedStats.totalAssets).toBe(initialStats.totalAssets + 1);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid asset configuration gracefully', async () => {
      const invalidConfig = {
        key: '',
        path: '',
        type: 'invalid-type' as AssetType,
        priority: 'high' as any,
        preload: true,
        cache: true,
      };

      const isValid = assetManager.validateAssetConfig(invalidConfig);
      expect(isValid).toBe(false);
    });

    it('should handle invalid bundle configuration gracefully', async () => {
      const invalidConfig = {
        bundleId: '',
        bundleName: '',
        bundleType: 'invalid-type' as BundleType,
        priority: 'high' as any,
        preload: true,
        cache: true,
        assetKeys: [],
      };

      const isValid = assetManager.validateBundleConfig(invalidConfig);
      expect(isValid).toBe(false);
    });
  });

  describe('Integration with Scene', () => {
    it('should provide correct interface for scene integration', () => {
      // Test that the scene can access the asset manager
      expect(assetManager).toBeDefined();
      expect(typeof assetManager.loadAsset).toBe('function');
      expect(typeof assetManager.loadBundle).toBe('function');
      expect(typeof assetManager.getAsset).toBe('function');
      expect(typeof assetManager.getBundle).toBe('function');
      expect(typeof assetManager.isAssetLoaded).toBe('function');
      expect(typeof assetManager.isBundleLoaded).toBe('function');
    });

    it('should provide correct interface for scene asset loader', () => {
      // Test that the scene can access the scene asset loader
      expect(sceneAssetLoader).toBeDefined();
      expect(typeof sceneAssetLoader.loadSceneAssets).toBe('function');
      expect(typeof sceneAssetLoader.unloadSceneAssets).toBe('function');
      expect(typeof sceneAssetLoader.getLoadingProgress).toBe('function');
      expect(typeof sceneAssetLoader.getLoadingState).toBe('function');
      expect(typeof sceneAssetLoader.isLoadingComplete).toBe('function');
    });
  });

  describe('Performance and Memory', () => {
    it('should not leak memory during asset operations', async () => {
      const config = sceneAssetLoader.getSceneAssetConfig();
      const initialStats = assetManager.getManagerStatistics();

      // Perform multiple asset operations
      for (let i = 0; i < 10; i++) {
        for (const assetConfig of config.assets) {
          const asset = await assetManager.assetFactory.createAssetFromConfig(assetConfig);
          assetManager.registerAsset(asset);
          assetManager.unregisterAsset(asset.assetKey);
        }
      }

      const finalStats = assetManager.getManagerStatistics();
      expect(finalStats.totalAssets).toBe(initialStats.totalAssets);
    });

    it('should handle concurrent asset operations', async () => {
      const config = sceneAssetLoader.getSceneAssetConfig();

      // Create multiple assets concurrently
      const assetPromises = config.assets.map(assetConfig =>
        assetManager.assetFactory.createAssetFromConfig(assetConfig)
      );

      const assets = await Promise.all(assetPromises);
      expect(assets.length).toBe(config.assets.length);

      // All assets should be created successfully
      assets.forEach(asset => {
        expect(asset).toBeDefined();
        expect(asset.assetState).toBe(AssetState.PENDING);
      });
    });
  });
});
