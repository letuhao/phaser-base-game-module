/**
 * AssetBundle Class Unit Tests
 *
 * Comprehensive tests for the AssetBundle class implementation.
 */

import { AssetBundle } from '../../classes/AssetBundle';
import { Asset } from '../../classes/Asset';
import { BundleType, BundleState } from '../../interfaces/IAssetBundle';
import { AssetType, AssetState, AssetPriority } from '../../interfaces/IAsset';

describe('AssetBundle', () => {
  let bundle: AssetBundle;
  let asset1: Asset;
  let asset2: Asset;
  let asset3: Asset;

  const mockBundleConfig = {
    bundleId: 'test-bundle',
    bundleName: 'Test Bundle',
    bundleType: BundleType.SCENE,
    priority: AssetPriority.NORMAL,
    preload: true,
    cache: true,
    metadata: { test: 'value' },
  };

  const mockAssetConfig1 = {
    key: 'test-asset-1',
    path: '/test/path1.png',
    type: AssetType.IMAGE,
    priority: AssetPriority.NORMAL,
    preload: true,
    cache: true,
    metadata: { test: 'value1' },
  };

  const mockAssetConfig2 = {
    key: 'test-asset-2',
    path: '/test/path2.mp3',
    type: AssetType.AUDIO,
    priority: AssetPriority.HIGH,
    preload: true,
    cache: true,
    metadata: { test: 'value2' },
  };

  const mockAssetConfig3 = {
    key: 'test-asset-3',
    path: '/test/path3.json',
    type: AssetType.JSON,
    priority: AssetPriority.LOW,
    preload: false,
    cache: true,
    metadata: { test: 'value3' },
  };

  beforeEach(() => {
    bundle = new AssetBundle('test-bundle', BundleType.SCENE, mockBundleConfig);
    asset1 = new Asset('test-id-1', 'test-asset-1', AssetType.IMAGE, mockAssetConfig1);
    asset2 = new Asset('test-id-2', 'test-asset-2', AssetType.AUDIO, mockAssetConfig2);
    asset3 = new Asset('test-id-3', 'test-asset-3', AssetType.JSON, mockAssetConfig3);
  });

  describe('Constructor', () => {
    it('should create bundle with correct initial values', () => {
      expect(bundle.bundleId).toBe('test-bundle');
      expect(bundle.bundleType).toBe(BundleType.SCENE);
      expect(bundle.bundleState).toBe(BundleState.PENDING);
      expect(bundle.bundleConfig).toEqual(mockBundleConfig);
      expect(bundle.bundleAssets.size).toBe(0);
      expect(bundle.bundleProgress.totalAssets).toBe(0);
      expect(bundle.bundleProgress.loadedAssets).toBe(0);
      expect(bundle.bundleProgress.failedAssets).toBe(0);
      expect(bundle.bundleProgress.percentage).toBe(0);
      expect(bundle.bundleMetadata).toEqual({});
    });
  });

  describe('State Management', () => {
    it('should set bundle state correctly', () => {
      bundle.setBundleState(BundleState.LOADING);
      expect(bundle.getBundleState()).toBe(BundleState.LOADING);

      bundle.setBundleState(BundleState.LOADED);
      expect(bundle.getBundleState()).toBe(BundleState.LOADED);
    });

    it('should return this for method chaining', () => {
      const result = bundle.setBundleState(BundleState.LOADING);
      expect(result).toBe(bundle);
    });
  });

  describe('Configuration Management', () => {
    it('should set bundle configuration correctly', () => {
      const newConfig = { ...mockBundleConfig, priority: AssetPriority.HIGH };
      bundle.setBundleConfig(newConfig);
      expect(bundle.getBundleConfig()).toEqual(newConfig);
    });

    it('should return this for method chaining', () => {
      const result = bundle.setBundleConfig(mockBundleConfig);
      expect(result).toBe(bundle);
    });
  });

  describe('Metadata Management', () => {
    it('should set bundle metadata correctly', () => {
      const metadata = { category: 'background', responsive: true };
      bundle.setBundleMetadata(metadata);
      expect(bundle.getBundleMetadata()).toEqual(metadata);
    });

    it('should merge metadata with existing metadata', () => {
      bundle.setBundleMetadata({ category: 'background' });
      bundle.setBundleMetadata({ responsive: true });

      expect(bundle.getBundleMetadata()).toEqual({
        category: 'background',
        responsive: true,
      });
    });

    it('should return this for method chaining', () => {
      const result = bundle.setBundleMetadata({ test: 'value' });
      expect(result).toBe(bundle);
    });
  });

  describe('Asset Management', () => {
    it('should add asset to bundle', () => {
      bundle.addAsset(asset1);

      expect(bundle.getBundleAssets().has('test-asset-1')).toBe(true);
      expect(bundle.getBundleAssetCount()).toBe(1);
      expect(bundle.getBundleProgress().totalAssets).toBe(1);
    });

    it('should remove asset from bundle', () => {
      bundle.addAsset(asset1);
      bundle.removeAsset('test-asset-1');

      expect(bundle.getBundleAssets().has('test-asset-1')).toBe(false);
      expect(bundle.getBundleAssetCount()).toBe(0);
      expect(bundle.getBundleProgress().totalAssets).toBe(0);
    });

    it('should handle removing non-existent asset', () => {
      bundle.removeAsset('non-existent');
      expect(bundle.getBundleAssetCount()).toBe(0);
    });

    it('should get asset by key', () => {
      bundle.addAsset(asset1);

      const retrievedAsset = bundle.getAsset('test-asset-1');
      expect(retrievedAsset).toBe(asset1);

      const nonExistentAsset = bundle.getAsset('non-existent');
      expect(nonExistentAsset).toBeNull();
    });

    it('should get assets by type', () => {
      bundle.addAsset(asset1); // IMAGE
      bundle.addAsset(asset2); // AUDIO
      bundle.addAsset(asset3); // JSON

      const imageAssets = bundle.getAssetsByType(AssetType.IMAGE);
      const audioAssets = bundle.getAssetsByType(AssetType.AUDIO);
      const jsonAssets = bundle.getAssetsByType(AssetType.JSON);

      expect(imageAssets).toHaveLength(1);
      expect(imageAssets[0]).toBe(asset1);

      expect(audioAssets).toHaveLength(1);
      expect(audioAssets[0]).toBe(asset2);

      expect(jsonAssets).toHaveLength(1);
      expect(jsonAssets[0]).toBe(asset3);
    });

    it('should return this for method chaining', () => {
      const result = bundle.addAsset(asset1);
      expect(result).toBe(bundle);
    });
  });

  describe('Bundle Loading', () => {
    it('should load bundle successfully', async () => {
      bundle.addAsset(asset1);
      bundle.addAsset(asset2);

      await bundle.loadBundle();

      expect(bundle.isBundleLoaded()).toBe(true);
      expect(bundle.getBundleState()).toBe(BundleState.LOADED);
      expect(bundle.getBundleProgress().loadedAssets).toBe(2);
      expect(bundle.getBundleProgress().percentage).toBe(100);
    });

    it('should not reload already loaded bundle', async () => {
      bundle.addAsset(asset1);
      await bundle.loadBundle();

      const firstLoadTime = Date.now();
      await bundle.loadBundle();
      const secondLoadTime = Date.now();

      expect(secondLoadTime - firstLoadTime).toBeLessThan(100); // Should be very fast
    });

    it('should not reload bundle that is already loading', async () => {
      bundle.addAsset(asset1);

      const loadPromise1 = bundle.loadBundle();
      const loadPromise2 = bundle.loadBundle();

      await Promise.all([loadPromise1, loadPromise2]);
      expect(bundle.isBundleLoaded()).toBe(true);
    });

    it('should handle loading empty bundle', async () => {
      await bundle.loadBundle();
      expect(bundle.isBundleLoaded()).toBe(true);
    });
  });

  describe('Bundle Unloading', () => {
    it('should unload bundle successfully', async () => {
      bundle.addAsset(asset1);
      await bundle.loadBundle();
      expect(bundle.isBundleLoaded()).toBe(true);

      await bundle.unloadBundle();
      expect(bundle.getBundleState()).toBe(BundleState.PENDING);
      expect(bundle.getBundleProgress().loadedAssets).toBe(0);
      expect(bundle.getBundleProgress().percentage).toBe(0);
    });

    it('should handle unloading pending bundle', async () => {
      await bundle.unloadBundle();
      expect(bundle.getBundleState()).toBe(BundleState.PENDING);
    });
  });

  describe('Bundle Status Checks', () => {
    it('should correctly identify loaded bundle', async () => {
      expect(bundle.isBundleLoaded()).toBe(false);

      bundle.addAsset(asset1);
      await bundle.loadBundle();
      expect(bundle.isBundleLoaded()).toBe(true);
    });

    it('should correctly identify loading bundle', async () => {
      expect(bundle.isBundleLoading()).toBe(false);

      bundle.addAsset(asset1);
      const loadPromise = bundle.loadBundle();

      // Check while loading
      expect(bundle.isBundleLoading()).toBe(true);

      await loadPromise;
      expect(bundle.isBundleLoading()).toBe(false);
    });
  });

  describe('Bundle Size and Count', () => {
    it('should calculate bundle size correctly', async () => {
      bundle.addAsset(asset1);
      bundle.addAsset(asset2);

      await bundle.loadBundle();

      const bundleSize = bundle.getBundleSize();
      expect(bundleSize).toBeGreaterThan(0);
      expect(bundleSize).toBe(asset1.getAssetSize() + asset2.getAssetSize());
    });

    it('should return correct asset count', () => {
      expect(bundle.getBundleAssetCount()).toBe(0);

      bundle.addAsset(asset1);
      expect(bundle.getBundleAssetCount()).toBe(1);

      bundle.addAsset(asset2);
      expect(bundle.getBundleAssetCount()).toBe(2);

      bundle.removeAsset('test-asset-1');
      expect(bundle.getBundleAssetCount()).toBe(1);
    });
  });

  describe('Bundle Cloning', () => {
    it('should clone bundle correctly', () => {
      bundle.addAsset(asset1);
      bundle.addAsset(asset2);
      bundle.setBundleMetadata({ category: 'test' });

      const clonedBundle = bundle.cloneBundle();

      expect(clonedBundle.bundleId).not.toBe(bundle.bundleId);
      expect(clonedBundle.bundleType).toBe(bundle.bundleType);
      expect(clonedBundle.bundleConfig).toEqual(bundle.bundleConfig);
      expect(clonedBundle.bundleMetadata).toEqual(bundle.bundleMetadata);
      expect(clonedBundle.getBundleAssetCount()).toBe(2);
      expect(clonedBundle.getBundleState()).toBe(BundleState.PENDING);
    });

    it('should clone assets with unique IDs', () => {
      bundle.addAsset(asset1);

      const clonedBundle = bundle.cloneBundle();
      const clonedAsset = clonedBundle.getAsset('test-asset-1_clone');

      expect(clonedAsset).toBeDefined();
      expect(clonedAsset?.assetId).not.toBe(asset1.assetId);
      expect(clonedAsset?.assetKey).toBe('test-asset-1_clone');
    });
  });

  describe('Bundle Disposal', () => {
    it('should dispose bundle correctly', async () => {
      bundle.addAsset(asset1);
      bundle.addAsset(asset2);
      await bundle.loadBundle();

      bundle.disposeBundle();

      expect(bundle.getBundleAssets().size).toBe(0);
      expect(bundle.bundleMetadata).toEqual({});
      expect(bundle.getBundleProgress().totalAssets).toBe(0);
      expect(bundle.getBundleState()).toBe(BundleState.DISPOSED);
    });

    it('should dispose all assets when disposing bundle', () => {
      bundle.addAsset(asset1);
      bundle.addAsset(asset2);

      bundle.disposeBundle();

      expect(asset1.getAssetState()).toBe(AssetState.DISPOSED);
      expect(asset2.getAssetState()).toBe(AssetState.DISPOSED);
    });
  });

  describe('Progress Tracking', () => {
    it('should update progress correctly', async () => {
      bundle.addAsset(asset1);
      bundle.addAsset(asset2);

      expect(bundle.getBundleProgress().totalAssets).toBe(2);
      expect(bundle.getBundleProgress().loadedAssets).toBe(0);
      expect(bundle.getBundleProgress().percentage).toBe(0);

      await bundle.loadBundle();

      expect(bundle.getBundleProgress().totalAssets).toBe(2);
      expect(bundle.getBundleProgress().loadedAssets).toBe(2);
      expect(bundle.getBundleProgress().percentage).toBe(100);
    });

    it('should calculate percentage correctly', async () => {
      bundle.addAsset(asset1);
      bundle.addAsset(asset2);
      bundle.addAsset(asset3);

      await bundle.loadBundle();

      expect(bundle.getBundleProgress().percentage).toBe(100);
    });

    it('should handle failed assets in progress', async () => {
      // Create an asset that will fail to load
      const failingAsset = new Asset(
        'failing',
        'failing',
        'invalid' as AssetType,
        mockAssetConfig1
      );
      bundle.addAsset(failingAsset);

      try {
        await bundle.loadBundle();
      } catch (error) {
        // Expected to fail
      }

      expect(bundle.getBundleProgress().failedAssets).toBeGreaterThan(0);
    });
  });

  describe('Different Bundle Types', () => {
    const bundleTypes = [
      BundleType.SCENE,
      BundleType.UI,
      BundleType.AUDIO,
      BundleType.TEXTURE,
      BundleType.FONT,
      BundleType.CUSTOM,
    ];

    bundleTypes.forEach(bundleType => {
      it(`should handle ${bundleType} bundle type`, () => {
        const typeConfig = { ...mockBundleConfig, bundleType };
        const typeBundle = new AssetBundle('test', bundleType, typeConfig);

        expect(typeBundle.bundleType).toBe(bundleType);
        expect(typeBundle.getBundleConfig().bundleType).toBe(bundleType);
      });
    });
  });

  describe('Method Chaining', () => {
    it('should support method chaining', () => {
      const result = bundle
        .setBundleState(BundleState.LOADING)
        .setBundleMetadata({ category: 'test' })
        .addAsset(asset1)
        .addAsset(asset2);

      expect(result).toBe(bundle);
      expect(bundle.getBundleState()).toBe(BundleState.LOADING);
      expect(bundle.getBundleMetadata()).toEqual({ category: 'test' });
      expect(bundle.getBundleAssetCount()).toBe(2);
    });
  });

  describe('Error Handling', () => {
    it('should handle asset loading errors gracefully', async () => {
      const failingAsset = new Asset(
        'failing',
        'failing',
        'invalid' as AssetType,
        mockAssetConfig1
      );
      bundle.addAsset(failingAsset);

      try {
        await bundle.loadBundle();
      } catch (error) {
        // Should not throw, should handle gracefully
        expect(bundle.getBundleState()).toBe(BundleState.FAILED);
      }
    });

    it('should handle asset unloading errors gracefully', async () => {
      bundle.addAsset(asset1);
      await bundle.loadBundle();

      // Mock asset to throw error on unload
      const originalUnload = asset1.unloadAsset;
      asset1.unloadAsset = jest.fn().mockRejectedValue(new Error('Unload failed'));

      await bundle.unloadBundle();

      // Should not throw, should handle gracefully
      expect(bundle.getBundleState()).toBe(BundleState.PENDING);

      // Restore original method
      asset1.unloadAsset = originalUnload;
    });
  });
});
