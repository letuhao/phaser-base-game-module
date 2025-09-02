/**
 * Asset Class Unit Tests
 *
 * Comprehensive tests for the Asset class implementation.
 */

import { Asset } from '../../classes/Asset';
import { AssetType, AssetState, AssetPriority } from '../../interfaces/IAsset';

describe('Asset', () => {
  let asset: Asset;
  const mockConfig = {
    key: 'test-asset',
    path: '/test/path.png',
    type: AssetType.IMAGE,
    priority: AssetPriority.NORMAL,
    preload: true,
    cache: true,
    metadata: { test: 'value' },
  };

  beforeEach(() => {
    asset = new Asset('test-id', 'test-asset', AssetType.IMAGE, mockConfig);
  });

  describe('Constructor', () => {
    it('should create asset with correct initial values', () => {
      expect(asset.assetId).toBe('test-id');
      expect(asset.assetKey).toBe('test-asset');
      expect(asset.assetType).toBe(AssetType.IMAGE);
      expect(asset.assetState).toBe(AssetState.PENDING);
      expect(asset.assetConfig).toEqual(mockConfig);
      expect(asset.assetData).toBeNull();
      expect(asset.assetSize).toBe(0);
      expect(asset.assetLoadTime).toBe(0);
      expect(asset.assetAccessCount).toBe(0);
      expect(asset.assetMetadata).toEqual({});
    });

    it('should set last accessed time to current time', () => {
      const now = Date.now();
      expect(asset.assetLastAccessedTime).toBeGreaterThanOrEqual(now - 1000);
      expect(asset.assetLastAccessedTime).toBeLessThanOrEqual(now + 1000);
    });
  });

  describe('State Management', () => {
    it('should set asset state correctly', () => {
      asset.setAssetState(AssetState.LOADING);
      expect(asset.getAssetState()).toBe(AssetState.LOADING);

      asset.setAssetState(AssetState.LOADED);
      expect(asset.getAssetState()).toBe(AssetState.LOADED);
    });

    it('should return this for method chaining', () => {
      const result = asset.setAssetState(AssetState.LOADING);
      expect(result).toBe(asset);
    });
  });

  describe('Configuration Management', () => {
    it('should set asset configuration correctly', () => {
      const newConfig = { ...mockConfig, priority: AssetPriority.HIGH };
      asset.setAssetConfig(newConfig);
      expect(asset.getAssetConfig()).toEqual(newConfig);
    });

    it('should return this for method chaining', () => {
      const result = asset.setAssetConfig(mockConfig);
      expect(result).toBe(asset);
    });
  });

  describe('Data Management', () => {
    it('should set asset data correctly', () => {
      const testData = { type: 'image', url: '/test.png' };
      asset.setAssetData(testData);
      expect(asset.getAssetData()).toEqual(testData);
    });

    it('should increment access count when getting data', () => {
      const testData = { type: 'image' };
      asset.setAssetData(testData);

      expect(asset.assetAccessCount).toBe(1);

      asset.getAssetData();
      expect(asset.assetAccessCount).toBe(2);
    });

    it('should update last accessed time when getting data', () => {
      const testData = { type: 'image' };
      asset.setAssetData(testData);

      const beforeAccess = asset.assetLastAccessedTime;

      // Wait a small amount to ensure time difference
      setTimeout(() => {
        asset.getAssetData();
        expect(asset.assetLastAccessedTime).toBeGreaterThan(beforeAccess);
      }, 10);
    });

    it('should return this for method chaining', () => {
      const result = asset.setAssetData({ test: 'data' });
      expect(result).toBe(asset);
    });
  });

  describe('Size and Time Management', () => {
    it('should set asset size correctly', () => {
      asset.setAssetSize(1024);
      expect(asset.getAssetSize()).toBe(1024);
    });

    it('should set load time correctly', () => {
      asset.setAssetLoadTime(500);
      expect(asset.getAssetLoadTime()).toBe(500);
    });

    it('should set last accessed time correctly', () => {
      const time = Date.now();
      asset.setAssetLastAccessedTime(time);
      expect(asset.getAssetLastAccessedTime()).toBe(time);
    });

    it('should set access count correctly', () => {
      asset.setAssetAccessCount(5);
      expect(asset.getAssetAccessCount()).toBe(5);
    });

    it('should return this for method chaining', () => {
      const result = asset.setAssetSize(1024);
      expect(result).toBe(asset);
    });
  });

  describe('Metadata Management', () => {
    it('should set asset metadata correctly', () => {
      const metadata = { category: 'background', responsive: true };
      asset.setAssetMetadata(metadata);
      expect(asset.getAssetMetadata()).toEqual(metadata);
    });

    it('should merge metadata with existing metadata', () => {
      asset.setAssetMetadata({ category: 'background' });
      asset.setAssetMetadata({ responsive: true });

      expect(asset.getAssetMetadata()).toEqual({
        category: 'background',
        responsive: true,
      });
    });

    it('should return this for method chaining', () => {
      const result = asset.setAssetMetadata({ test: 'value' });
      expect(result).toBe(asset);
    });
  });

  describe('Asset Loading', () => {
    it('should load image asset successfully', async () => {
      await asset.loadAsset();

      expect(asset.isAssetLoaded()).toBe(true);
      expect(asset.getAssetState()).toBe(AssetState.LOADED);
      expect(asset.assetData).toBeDefined();
      expect(asset.assetSize).toBeGreaterThan(0);
      expect(asset.assetLoadTime).toBeGreaterThan(0);
    });

    it('should not reload already loaded asset', async () => {
      await asset.loadAsset();
      const firstLoadTime = asset.assetLoadTime;

      await asset.loadAsset();
      expect(asset.assetLoadTime).toBe(firstLoadTime);
    });

    it('should not reload asset that is already loading', async () => {
      const loadPromise1 = asset.loadAsset();
      const loadPromise2 = asset.loadAsset();

      await Promise.all([loadPromise1, loadPromise2]);
      expect(asset.isAssetLoaded()).toBe(true);
    });

    it('should handle loading errors', async () => {
      // Create asset with invalid type to trigger error
      const invalidAsset = new Asset('invalid', 'invalid', 'invalid' as AssetType, mockConfig);

      await expect(invalidAsset.loadAsset()).rejects.toThrow('Unsupported asset type');
      expect(invalidAsset.getAssetState()).toBe(AssetState.FAILED);
    });
  });

  describe('Asset Unloading', () => {
    it('should unload asset successfully', async () => {
      await asset.loadAsset();
      expect(asset.isAssetLoaded()).toBe(true);

      await asset.unloadAsset();
      expect(asset.getAssetState()).toBe(AssetState.PENDING);
      expect(asset.assetData).toBeNull();
      expect(asset.assetSize).toBe(0);
      expect(asset.assetLoadTime).toBe(0);
    });

    it('should handle unloading pending asset', async () => {
      await asset.unloadAsset();
      expect(asset.getAssetState()).toBe(AssetState.PENDING);
    });
  });

  describe('Asset Status Checks', () => {
    it('should correctly identify loaded asset', async () => {
      expect(asset.isAssetLoaded()).toBe(false);

      await asset.loadAsset();
      expect(asset.isAssetLoaded()).toBe(true);
    });

    it('should correctly identify cached asset', () => {
      expect(asset.isAssetCached()).toBe(false);

      asset.setAssetState(AssetState.CACHED);
      expect(asset.isAssetCached()).toBe(true);
    });

    it('should correctly identify preloadable asset', () => {
      expect(asset.isAssetPreloadable()).toBe(true);

      const nonPreloadableConfig = { ...mockConfig, preload: false };
      const nonPreloadableAsset = new Asset('test', 'test', AssetType.IMAGE, nonPreloadableConfig);
      expect(nonPreloadableAsset.isAssetPreloadable()).toBe(false);
    });
  });

  describe('Asset URL', () => {
    it('should return correct asset URL', () => {
      expect(asset.getAssetUrl()).toBe('/test/path.png');
    });
  });

  describe('Asset Cloning', () => {
    it('should clone asset correctly', () => {
      asset.setAssetMetadata({ category: 'background' });

      const clonedAsset = asset.cloneAsset();

      expect(clonedAsset.assetId).not.toBe(asset.assetId);
      expect(clonedAsset.assetKey).toBe('test-asset_clone');
      expect(clonedAsset.assetType).toBe(asset.assetType);
      expect(clonedAsset.assetConfig).toEqual(asset.assetConfig);
      expect(clonedAsset.assetMetadata).toEqual(asset.assetMetadata);
      expect(clonedAsset.getAssetState()).toBe(AssetState.PENDING);
    });
  });

  describe('Asset Disposal', () => {
    it('should dispose asset correctly', () => {
      asset.setAssetData({ test: 'data' });
      asset.setAssetSize(1024);
      asset.setAssetAccessCount(5);
      asset.setAssetMetadata({ category: 'test' });

      asset.disposeAsset();

      expect(asset.assetData).toBeNull();
      expect(asset.assetSize).toBe(0);
      expect(asset.assetLoadTime).toBe(0);
      expect(asset.assetAccessCount).toBe(0);
      expect(asset.assetMetadata).toEqual({});
      expect(asset.getAssetState()).toBe(AssetState.DISPOSED);
    });
  });

  describe('Different Asset Types', () => {
    const assetTypes = [
      AssetType.IMAGE,
      AssetType.AUDIO,
      AssetType.SPRITE,
      AssetType.FONT,
      AssetType.VIDEO,
      AssetType.JSON,
      AssetType.XML,
      AssetType.TEXT,
      AssetType.BINARY,
      AssetType.CUSTOM,
    ];

    assetTypes.forEach(assetType => {
      it(`should load ${assetType} asset successfully`, async () => {
        const typeConfig = { ...mockConfig, type: assetType };
        const typeAsset = new Asset('test', 'test', assetType, typeConfig);

        await typeAsset.loadAsset();

        expect(typeAsset.isAssetLoaded()).toBe(true);
        expect(typeAsset.assetData).toBeDefined();
        expect(typeAsset.assetSize).toBeGreaterThan(0);
      });
    });
  });

  describe('Method Chaining', () => {
    it('should support method chaining', () => {
      const result = asset
        .setAssetState(AssetState.LOADING)
        .setAssetData({ test: 'data' })
        .setAssetSize(1024)
        .setAssetMetadata({ category: 'test' });

      expect(result).toBe(asset);
      expect(asset.getAssetState()).toBe(AssetState.LOADING);
      expect(asset.getAssetData()).toEqual({ test: 'data' });
      expect(asset.getAssetSize()).toBe(1024);
      expect(asset.getAssetMetadata()).toEqual({ category: 'test' });
    });
  });
});
