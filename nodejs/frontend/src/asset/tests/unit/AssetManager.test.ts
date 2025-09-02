/**
 * AssetManager Unit Tests
 *
 * Comprehensive unit tests for the AssetManager class.
 */

import { AssetManager } from '../../classes/AssetManager';
import { Asset } from '../../classes/Asset';
import { AssetBundle } from '../../classes/AssetBundle';
import { AssetType, AssetPriority, AssetState, AssetConfig } from '../../interfaces/IAsset';
import { BundleType, BundleState, BundleConfig } from '../../interfaces/IAssetBundle';
import type { IAssetFactory } from '../../interfaces/factories/IAssetFactory';
import type { IAssetBundleFactory } from '../../interfaces/factories/IAssetBundleFactory';
import type { IAssetCacheManager } from '../../interfaces/managers/IAssetCacheManager';
import type { IAssetPoolManager } from '../../interfaces/managers/IAssetPoolManager';
import type { IAssetValidationManager } from '../../interfaces/managers/IAssetValidationManager';
import type { IAssetStatisticsManager } from '../../interfaces/managers/IAssetStatisticsManager';
import type { AssetManagerConfig } from '../../interfaces/IAssetManager';

// Mock implementations for testing
class MockAssetFactory implements IAssetFactory {
  public readonly factoryId: string = 'mock-asset-factory';
  public factoryConfig: any = {};
  public factoryStatistics: any = {};
  public factoryMetadata: any = {};

  setFactoryConfig(config: any): this {
    return this;
  }
  getFactoryConfig(): any {
    return {};
  }
  setFactoryMetadata(metadata: any): this {
    return this;
  }
  getFactoryMetadata(): any {
    return {};
  }
  createAssetFromOptions(options: any): Promise<Asset> {
    return Promise.resolve(new Asset('test', 'test', AssetType.IMAGE, {} as AssetConfig));
  }
  createAssetFromConfig(config: any): Promise<Asset> {
    return Promise.resolve(new Asset('test', 'test', AssetType.IMAGE, config));
  }
  createAssetsFromOptions(options: any[]): Promise<Asset[]> {
    return Promise.resolve([]);
  }
  createAssetsFromConfigs(configs: any[]): Promise<Asset[]> {
    return Promise.resolve([]);
  }
  cloneAsset(asset: Asset): Asset {
    return new Asset('test', 'test', AssetType.IMAGE, {} as AssetConfig);
  }
  configureAsset(asset: Asset, config: any): this {
    return this;
  }
  validateAssetConfig(config: any): boolean {
    return true;
  }
  registerAssetTypeCreator(type: AssetType, creator: any): this {
    return this;
  }
  unregisterAssetTypeCreator(type: AssetType): this {
    return this;
  }
  getAssetTypeCreator(type: AssetType): any {
    return null;
  }
  getRegisteredAssetTypes(): AssetType[] {
    return [];
  }
  getFactoryStatistics(): any {
    return {};
  }
  clearFactoryStatistics(): this {
    return this;
  }
  disposeFactory(): this {
    return this;
  }
}

class MockAssetBundleFactory implements IAssetBundleFactory {
  public readonly bundleFactoryId: string = 'mock-bundle-factory';
  public bundleFactoryConfig: any = {};
  public bundleFactoryStatistics: any = {};
  public bundleFactoryMetadata: any = {};

  setBundleFactoryConfig(config: any): this {
    return this;
  }
  getBundleFactoryConfig(): any {
    return {};
  }
  setBundleFactoryMetadata(metadata: any): this {
    return this;
  }
  getBundleFactoryMetadata(): any {
    return {};
  }
  createBundleFromOptions(options: any): Promise<AssetBundle> {
    return Promise.resolve(new AssetBundle('test', BundleType.SCENE, {} as BundleConfig));
  }
  createBundleFromConfig(config: any, assets: Map<string, Asset>): Promise<AssetBundle> {
    return Promise.resolve(new AssetBundle('test', BundleType.SCENE, {} as BundleConfig));
  }
  createBundlesFromOptions(options: any[]): Promise<AssetBundle[]> {
    return Promise.resolve([]);
  }
  createBundlesFromConfigs(configs: any[], assets: Map<string, Asset>): Promise<AssetBundle[]> {
    return Promise.resolve([]);
  }
  cloneBundle(bundle: AssetBundle): AssetBundle {
    return new AssetBundle('test', BundleType.SCENE, {} as BundleConfig);
  }
  configureBundle(bundle: AssetBundle, config: any): this {
    return this;
  }
  validateBundleConfig(config: any): boolean {
    return true;
  }
  registerBundleTypeCreator(type: BundleType, creator: any): this {
    return this;
  }
  unregisterBundleTypeCreator(type: BundleType): this {
    return this;
  }
  getBundleTypeCreator(type: BundleType): any {
    return null;
  }
  getRegisteredBundleTypes(): BundleType[] {
    return [];
  }
  getBundleFactoryStatistics(): any {
    return {};
  }
  clearBundleFactoryStatistics(): this {
    return this;
  }
  disposeBundleFactory(): this {
    return this;
  }
}

class MockAssetCacheManager implements IAssetCacheManager {
  public readonly cacheManagerId: string = 'mock-cache-manager';
  public cacheConfig: any = {};
  public cacheStatistics: any = {};
  public cacheMetadata: any = {};

  setCacheConfig(config: any): this {
    return this;
  }
  getCacheConfig(): any {
    return {};
  }
  setCacheMetadata(metadata: any): this {
    return this;
  }
  getCacheMetadata(): any {
    return {};
  }
  cacheAsset(asset: Asset): Promise<boolean> {
    return Promise.resolve(true);
  }
  uncacheAsset(assetKey: string): Promise<boolean> {
    return Promise.resolve(true);
  }
  getCachedAsset(assetKey: string): Promise<Asset | null> {
    return Promise.resolve(null);
  }
  getCachedAssetSize(assetKey: string): number {
    return 0;
  }
  isAssetCached(assetKey: string): boolean {
    return false;
  }
  getCacheSize(): number {
    return 0;
  }
  getCacheUsage(): number {
    return 0;
  }
  optimizeCache(): Promise<this> {
    return Promise.resolve(this);
  }
  clearCache(): Promise<this> {
    return Promise.resolve(this);
  }
  getCacheStatistics(): any {
    return {};
  }
  clearCacheStatistics(): this {
    return this;
  }
  disposeCacheManager(): this {
    return this;
  }
}

class MockAssetPoolManager implements IAssetPoolManager {
  public readonly poolManagerId: string = 'mock-pool-manager';
  public poolConfig: any = {};
  public poolStatistics: any = {};
  public poolMetadata: any = {};

  setPoolConfig(config: any): this {
    return this;
  }
  getPoolConfig(): any {
    return {};
  }
  setPoolMetadata(metadata: any): this {
    return this;
  }
  getPoolMetadata(): any {
    return {};
  }
  poolAsset(asset: Asset): Promise<boolean> {
    return Promise.resolve(true);
  }
  unpoolAsset(assetKey: string): Promise<Asset | null> {
    return Promise.resolve(null);
  }
  getPooledAsset(assetKey: string): Asset | null {
    return null;
  }
  isAssetPooled(assetKey: string): boolean {
    return false;
  }
  getPoolSize(): number {
    return 0;
  }
  getPoolUsage(): number {
    return 0;
  }
  optimizePool(): Promise<this> {
    return Promise.resolve(this);
  }
  clearPool(): Promise<this> {
    return Promise.resolve(this);
  }
  getPoolStatistics(): any {
    return {};
  }
  clearPoolStatistics(): this {
    return this;
  }
  disposePoolManager(): this {
    return this;
  }
}

class MockAssetValidationManager implements IAssetValidationManager {
  public readonly validationManagerId: string = 'mock-validation-manager';
  public validationConfig: any = {};
  public validationStatistics: any = {};
  public validationReports: Map<string, any> = new Map();
  public validationMetadata: any = {};

  setValidationConfig(config: any): this {
    return this;
  }
  setValidationMetadata(metadata: any): this {
    return this;
  }
  getValidationConfig(): any {
    return {};
  }
  getValidationStatistics(): any {
    return {};
  }
  getValidationReports(): Map<string, any> {
    return new Map();
  }
  getValidationMetadata(): any {
    return {};
  }
  validateAsset(asset: Asset): Promise<any[]> {
    return Promise.resolve([]);
  }
  validateBundle(bundle: AssetBundle): Promise<any[]> {
    return Promise.resolve([]);
  }
  validateIntegrity(asset: Asset): Promise<any> {
    return Promise.resolve({});
  }
  validateFormat(asset: Asset): Promise<any> {
    return Promise.resolve({});
  }
  validateDependencies(asset: Asset): Promise<any> {
    return Promise.resolve({});
  }
  validateSize(asset: Asset): Promise<any> {
    return Promise.resolve({});
  }
  validateMetadata(asset: Asset): Promise<any> {
    return Promise.resolve({});
  }
  validateCompatibility(asset: Asset): Promise<any> {
    return Promise.resolve({});
  }
  getValidationReport(assetKey: string): any[] {
    return [];
  }
  isAssetValid(assetKey: string): boolean {
    return true;
  }
  hasAssetWarnings(assetKey: string): boolean {
    return false;
  }
  hasAssetErrors(assetKey: string): boolean {
    return false;
  }
  clearValidationReports(): this {
    return this;
  }
  clearValidationReport(assetKey: string): this {
    return this;
  }
  getValidationSummary(): any {
    return {};
  }
  updateValidationManager(deltaTime: number): void {}
}

class MockAssetStatisticsManager implements IAssetStatisticsManager {
  public readonly statisticsManagerId: string = 'mock-statistics-manager';
  public statisticsConfig: any = {};
  public currentStatistics: any = {};
  public statisticsHistory: any[] = [];
  public statisticsMetadata: any = {};

  setStatisticsConfig(config: any): this {
    return this;
  }
  setStatisticsMetadata(metadata: any): this {
    return this;
  }
  getStatisticsConfig(): any {
    return {};
  }
  getCurrentStatistics(): any {
    return {};
  }
  getStatisticsHistory(): any[] {
    return [];
  }
  getStatisticsMetadata(): any {
    return {};
  }
  recordAssetOperation(asset: Asset, operation: string, duration: number, success: boolean): void {}
  recordBundleOperation(
    bundle: AssetBundle,
    operation: string,
    duration: number,
    success: boolean
  ): void {}
  recordPerformanceMetric(metric: string, value: number, timestamp?: number): void {}
  recordMemoryUsage(usage: number, timestamp?: number): void {}
  recordCacheOperation(operation: string, hit: boolean, duration: number): void {}
  recordPoolOperation(operation: string, hit: boolean, duration: number): void {}
  getAssetStatistics(): any {
    return {};
  }
  getBundleStatistics(): any {
    return {};
  }
  getPerformanceStatistics(): any {
    return {};
  }
  getStatisticsByType(type: any): any {
    return {};
  }
  getStatisticsForTimeRange(startTime: number, endTime: number): any[] {
    return [];
  }
  getStatisticsSummary(): any {
    return {};
  }
  clearStatistics(): this {
    return this;
  }
  clearStatisticsHistory(): this {
    return this;
  }
  exportStatistics(): string {
    return '';
  }
  importStatistics(data: string): this {
    return this;
  }
  updateStatisticsManager(deltaTime: number): void {}
}

describe('AssetManager', () => {
  let manager: AssetManager;
  let mockAssetFactory: MockAssetFactory;
  let mockBundleFactory: MockAssetBundleFactory;
  let mockCacheManager: MockAssetCacheManager;
  let mockPoolManager: MockAssetPoolManager;
  let mockValidationManager: MockAssetValidationManager;
  let mockStatisticsManager: MockAssetStatisticsManager;

  beforeEach(() => {
    manager = new AssetManager('test-manager');
    mockAssetFactory = new MockAssetFactory();
    mockBundleFactory = new MockAssetBundleFactory();
    mockCacheManager = new MockAssetCacheManager();
    mockPoolManager = new MockAssetPoolManager();
    mockValidationManager = new MockAssetValidationManager();
    mockStatisticsManager = new MockAssetStatisticsManager();

    // Set up the manager with mock dependencies
    manager
      .setAssetFactory(mockAssetFactory as any)
      .setBundleFactory(mockBundleFactory as any)
      .setCacheManager(mockCacheManager as any)
      .setPoolManager(mockPoolManager as any)
      .setValidationManager(mockValidationManager as any)
      .setStatisticsManager(mockStatisticsManager as any);
  });

  describe('Constructor', () => {
    it('should create manager with correct initial values', () => {
      expect(manager.managerId).toBe('test-manager');
      expect(manager.managerConfig).toBeDefined();
      expect(manager.managerConfig.enableCaching).toBe(true);
      expect(manager.managerConfig.enablePooling).toBe(true);
      expect(manager.managerConfig.enableValidation).toBe(true);
      expect(manager.managerConfig.enableStatistics).toBe(true);
    });

    it('should create manager with custom configuration', () => {
      const customConfig: AssetManagerConfig = {
        enableCaching: false,
        enablePooling: false,
        enableValidation: true,
        enableStatistics: true,
        maxCacheSize: 50 * 1024 * 1024,
        maxPoolSize: 100,
        defaultTimeout: 15000,
        retryAttempts: 3,
        retryDelay: 1000,
      };

      const customManager = new AssetManager('custom-manager', customConfig);
      expect(customManager.managerConfig.enableCaching).toBe(false);
      expect(customManager.managerConfig.enablePooling).toBe(false);
      expect(customManager.managerConfig.maxCacheSize).toBe(50 * 1024 * 1024);
      expect(customManager.managerConfig.defaultTimeout).toBe(15000);
    });
  });

  describe('Configuration Management', () => {
    it('should set manager configuration correctly', () => {
      const config: AssetManagerConfig = {
        enableCaching: false,
        enablePooling: false,
        enableValidation: true,
        enableStatistics: true,
        maxCacheSize: 200 * 1024 * 1024,
        maxPoolSize: 100,
        defaultTimeout: 20000,
        retryAttempts: 3,
        retryDelay: 1000,
      };

      manager.setManagerConfig(config);
      expect(manager.managerConfig.enableCaching).toBe(false);
      expect(manager.managerConfig.enablePooling).toBe(false);
      expect(manager.managerConfig.maxCacheSize).toBe(200 * 1024 * 1024);
      expect(manager.managerConfig.defaultTimeout).toBe(20000);
    });

    it('should set and get asset factory correctly', () => {
      expect(manager.getAssetFactory()).toBe(mockAssetFactory);
    });

    it('should set and get bundle factory correctly', () => {
      expect(manager.getBundleFactory()).toBe(mockBundleFactory);
    });

    it('should set and get cache manager correctly', () => {
      expect(manager.getCacheManager()).toBe(mockCacheManager);
    });

    it('should set and get pool manager correctly', () => {
      expect(manager.getPoolManager()).toBe(mockPoolManager);
    });

    it('should set and get validation manager correctly', () => {
      expect(manager.getValidationManager()).toBe(mockValidationManager);
    });

    it('should set and get statistics manager correctly', () => {
      expect(manager.getStatisticsManager()).toBe(mockStatisticsManager);
    });

    it('should set and get manager metadata correctly', () => {
      const metadata = { version: '1.0.0', author: 'test' };
      manager.setManagerMetadata(metadata);
      expect(manager.getManagerMetadata()).toEqual(metadata);
    });

    it('should return this for method chaining', () => {
      const result = manager
        .setManagerConfig({
          enableCaching: true,
          enablePooling: true,
          enableValidation: true,
          enableStatistics: true,
          maxCacheSize: 1000,
          maxPoolSize: 100,
          defaultTimeout: 5000,
          retryAttempts: 3,
          retryDelay: 1000,
        })
        .setAssetFactory(mockAssetFactory as any)
        .setBundleFactory(mockBundleFactory as any)
        .setCacheManager(mockCacheManager as any)
        .setPoolManager(mockPoolManager as any)
        .setValidationManager(mockValidationManager as any)
        .setStatisticsManager(mockStatisticsManager)
        .setManagerMetadata({});

      expect(result).toBe(manager);
    });
  });

  describe('Asset Management', () => {
    let testAsset: Asset;

    beforeEach(() => {
      testAsset = new Asset('test-asset', 'test-asset', AssetType.IMAGE, {
        key: 'test-asset',
        path: '/test/asset.png',
        type: AssetType.IMAGE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true,
      });
    });

    it('should get asset by key', () => {
      // Since we don't have a registerAsset method in the interface,
      // we'll test with the internal map directly
      (manager as any).managedAssets.set('test-asset', testAsset);

      const asset = manager.getAsset('test-asset');
      expect(asset).toBe(testAsset);
    });

    it('should return null for non-existent asset', () => {
      const asset = manager.getAsset('non-existent');
      expect(asset).toBeNull();
    });

    it('should get all assets', () => {
      (manager as any).managedAssets.set('test-asset', testAsset);

      const assets = manager.getAllAssets();
      expect(assets).toHaveLength(1);
      expect(assets[0]).toBe(testAsset);
    });

    it('should check if asset is loaded', () => {
      (manager as any).managedAssets.set('test-asset', testAsset);

      expect(manager.isAssetLoaded('test-asset')).toBe(false);

      // Mock the asset as loaded
      testAsset.setAssetState(AssetState.LOADED);
      expect(manager.isAssetLoaded('test-asset')).toBe(true);
    });

    it('should check if asset is cached', () => {
      (manager as any).managedAssets.set('test-asset', testAsset);

      expect(manager.isAssetCached('test-asset')).toBe(false);

      // Mock the asset as cached
      testAsset.setAssetState(AssetState.CACHED);
      expect(manager.isAssetCached('test-asset')).toBe(true);
    });

    it('should load asset successfully', async () => {
      (manager as any).managedAssets.set('test-asset', testAsset);

      const loadedAsset = await manager.loadAsset('test-asset');
      expect(loadedAsset).toBe(testAsset);
    });

    it('should return null when loading non-existent asset', async () => {
      const loadedAsset = await manager.loadAsset('non-existent');
      expect(loadedAsset).toBeNull();
    });

    it('should load assets by type', async () => {
      const imageAsset = new Asset('image-asset', 'image-asset', AssetType.IMAGE, {
        key: 'image-asset',
        path: '/test/image.png',
        type: AssetType.IMAGE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true,
      });

      const audioAsset = new Asset('audio-asset', 'audio-asset', AssetType.AUDIO, {
        key: 'audio-asset',
        path: '/test/audio.mp3',
        type: AssetType.AUDIO,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true,
      });

      (manager as any).managedAssets.set('image-asset', imageAsset);
      (manager as any).managedAssets.set('audio-asset', audioAsset);

      const imageAssets = await manager.loadAssetsByType(AssetType.IMAGE);
      expect(imageAssets).toHaveLength(1);
      expect(imageAssets[0]).toBe(imageAsset);
    });

    it('should load assets by priority', async () => {
      const highPriorityAsset = new Asset('high-asset', 'high-asset', AssetType.IMAGE, {
        key: 'high-asset',
        path: '/test/high.png',
        type: AssetType.IMAGE,
        priority: AssetPriority.HIGH,
        preload: true,
        cache: true,
      });

      const normalPriorityAsset = new Asset('normal-asset', 'normal-asset', AssetType.IMAGE, {
        key: 'normal-asset',
        path: '/test/normal.png',
        type: AssetType.IMAGE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true,
      });

      (manager as any).managedAssets.set('high-asset', highPriorityAsset);
      (manager as any).managedAssets.set('normal-asset', normalPriorityAsset);

      const highPriorityAssets = await manager.loadAssetsByPriority(AssetPriority.HIGH);
      expect(highPriorityAssets).toHaveLength(1);
      expect(highPriorityAssets[0]).toBe(highPriorityAsset);
    });

    it('should unload asset successfully', async () => {
      (manager as any).managedAssets.set('test-asset', testAsset);

      const result = await manager.unloadAsset('test-asset');
      expect(result).toBe(true);
    });

    it('should return false when unloading non-existent asset', async () => {
      const result = await manager.unloadAsset('non-existent');
      expect(result).toBe(false);
    });
  });

  describe('Bundle Management', () => {
    let testBundle: AssetBundle;

    beforeEach(() => {
      testBundle = new AssetBundle('test-bundle', BundleType.SCENE, {} as BundleConfig);
    });

    it('should get bundle by ID', () => {
      (manager as any).assetBundles.set('test-bundle', testBundle);

      const bundle = manager.getBundle('test-bundle');
      expect(bundle).toBe(testBundle);
    });

    it('should return null for non-existent bundle', () => {
      const bundle = manager.getBundle('non-existent');
      expect(bundle).toBeNull();
    });

    it('should get all bundles', () => {
      (manager as any).assetBundles.set('test-bundle', testBundle);

      const bundles = manager.getAllBundles();
      expect(bundles).toHaveLength(1);
      expect(bundles[0]).toBe(testBundle);
    });

    it('should check if bundle is loaded', () => {
      (manager as any).assetBundles.set('test-bundle', testBundle);

      expect(manager.isBundleLoaded('test-bundle')).toBe(false);

      // Mock the bundle as loaded
      testBundle.setBundleState(BundleState.LOADED);
      expect(manager.isBundleLoaded('test-bundle')).toBe(true);
    });

    it('should check if bundle is cached', () => {
      (manager as any).assetBundles.set('test-bundle', testBundle);

      expect(manager.isBundleCached('test-bundle')).toBe(false);

      // Mock the bundle as loaded (since BundleState doesn't have CACHED)
      testBundle.setBundleState(BundleState.LOADED);
      expect(manager.isBundleCached('test-bundle')).toBe(true);
    });

    it('should load bundle successfully', async () => {
      (manager as any).assetBundles.set('test-bundle', testBundle);

      const loadedBundle = await manager.loadBundle('test-bundle');
      expect(loadedBundle).toBe(testBundle);
    });

    it('should return null when loading non-existent bundle', async () => {
      const loadedBundle = await manager.loadBundle('non-existent');
      expect(loadedBundle).toBeNull();
    });

    it('should load bundles by type', async () => {
      const sceneBundle = new AssetBundle('scene-bundle', BundleType.SCENE, {} as BundleConfig);
      const uiBundle = new AssetBundle('ui-bundle', BundleType.UI, {} as BundleConfig);

      // Mock the bundle loading methods
      jest.spyOn(sceneBundle, 'loadBundle').mockResolvedValue(undefined as any);
      jest.spyOn(sceneBundle, 'isBundleLoaded').mockReturnValue(true);
      jest.spyOn(uiBundle, 'loadBundle').mockResolvedValue(undefined as any);
      jest.spyOn(uiBundle, 'isBundleLoaded').mockReturnValue(true);

      // Add bundles directly to the manager's assetBundles map
      (manager as any).assetBundles.set('scene-bundle', sceneBundle);
      (manager as any).assetBundles.set('ui-bundle', uiBundle);

      const sceneBundles = await manager.loadBundlesByType(BundleType.SCENE);
      expect(sceneBundles).toHaveLength(1);
      expect(sceneBundles[0]).toBe(sceneBundle);
    });

    it('should unload bundle successfully', async () => {
      (manager as any).assetBundles.set('test-bundle', testBundle);

      const result = await manager.unloadBundle('test-bundle');
      expect(result).toBe(true);
    });

    it('should return false when unloading non-existent bundle', async () => {
      const result = await manager.unloadBundle('non-existent');
      expect(result).toBe(false);
    });
  });

  describe('Validation', () => {
    let testAsset: Asset;
    let testBundle: AssetBundle;

    beforeEach(() => {
      testAsset = new Asset('test-asset', 'test-asset', AssetType.IMAGE, {
        key: 'test-asset',
        path: '/test/asset.png',
        type: AssetType.IMAGE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true,
      });

      testBundle = new AssetBundle('test-bundle', BundleType.SCENE, {} as BundleConfig);
    });

    it('should validate asset when validation is enabled', () => {
      manager.managerConfig.enableValidation = true;

      const result = manager.validateAsset(testAsset);
      expect(result).toBe(true);
    });

    it('should skip validation when validation is disabled', () => {
      manager.managerConfig.enableValidation = false;

      const result = manager.validateAsset(testAsset);
      expect(result).toBe(true);
    });

    it('should validate bundle when validation is enabled', () => {
      manager.managerConfig.enableValidation = true;

      const result = manager.validateBundle(testBundle);
      expect(result).toBe(true);
    });

    it('should skip validation when validation is disabled', () => {
      manager.managerConfig.enableValidation = false;

      const result = manager.validateBundle(testBundle);
      expect(result).toBe(true);
    });
  });

  describe('Statistics', () => {
    it('should get manager statistics', () => {
      const stats = manager.getManagerStatistics();
      expect(stats).toBeDefined();
      expect(stats.totalAssets).toBe(0);
      expect(stats.totalBundles).toBe(0);
      expect(stats.loadedAssets).toBe(0);
      expect(stats.loadedBundles).toBe(0);
      expect(stats.failedAssets).toBe(0);
      expect(stats.failedBundles).toBe(0);
      expect(stats.cachedAssets).toBe(0);
      expect(stats.cachedBundles).toBe(0);
      expect(stats.totalLoadTime).toBe(0);
      expect(stats.averageLoadTime).toBe(0);
      expect(stats.cacheHitRate).toBe(0);
      expect(stats.successRate).toBe(0);
      expect(stats.lastUpdateTime).toBeGreaterThan(0);
    });

    it('should calculate statistics correctly with assets and bundles', () => {
      const asset1 = new Asset('asset1', 'asset1', AssetType.IMAGE, {
        key: 'asset1',
        path: '/test/asset1.png',
        type: AssetType.IMAGE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true,
      });

      const asset2 = new Asset('asset2', 'asset2', AssetType.AUDIO, {
        key: 'asset2',
        path: '/test/asset2.mp3',
        type: AssetType.AUDIO,
        priority: AssetPriority.HIGH,
        preload: true,
        cache: true,
      });

      const bundle1 = new AssetBundle('bundle1', BundleType.SCENE, {} as BundleConfig);
      const bundle2 = new AssetBundle('bundle2', BundleType.UI, {} as BundleConfig);

      // Set assets to different states
      asset1.setAssetState(AssetState.LOADED);
      asset2.setAssetState(AssetState.FAILED);

      // Set bundles to different states
      bundle1.setBundleState(BundleState.LOADED);
      bundle2.setBundleState(BundleState.FAILED);

      (manager as any).managedAssets.set('asset1', asset1);
      (manager as any).managedAssets.set('asset2', asset2);
      (manager as any).assetBundles.set('bundle1', bundle1);
      (manager as any).assetBundles.set('bundle2', bundle2);

      const stats = manager.getManagerStatistics();
      expect(stats.totalAssets).toBe(2);
      expect(stats.totalBundles).toBe(2);
      expect(stats.loadedAssets).toBe(1);
      expect(stats.loadedBundles).toBe(1);
      expect(stats.failedAssets).toBe(1);
      expect(stats.failedBundles).toBe(1);
      expect(stats.cachedAssets).toBe(0);
      expect(stats.cachedBundles).toBe(1); // loaded bundles are considered cached
      expect(stats.successRate).toBe(50); // 1 out of 2 assets loaded
    });
  });

  describe('Manager Lifecycle', () => {
    it('should clear manager', () => {
      const asset = new Asset('test-asset', 'test-asset', AssetType.IMAGE, {
        key: 'test-asset',
        path: '/test/asset.png',
        type: AssetType.IMAGE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true,
      });

      const bundle = new AssetBundle('test-bundle', BundleType.SCENE, {} as BundleConfig);

      (manager as any).managedAssets.set('test-asset', asset);
      (manager as any).assetBundles.set('test-bundle', bundle);

      expect(manager.getAllAssets()).toHaveLength(1);
      expect(manager.getAllBundles()).toHaveLength(1);

      manager.clearManager();

      expect(manager.getAllAssets()).toHaveLength(0);
      expect(manager.getAllBundles()).toHaveLength(0);
    });

    it('should update manager', () => {
      // This should not throw any errors
      expect(() => manager.updateManager(16.67)).not.toThrow();
    });

    it('should return this for method chaining in clearManager', () => {
      const result = manager.clearManager();
      expect(result).toBe(manager);
    });
  });

  describe('Error Handling', () => {
    it('should handle asset loading errors gracefully', async () => {
      const asset = new Asset('test-asset', 'test-asset', AssetType.IMAGE, {
        key: 'test-asset',
        path: '/test/asset.png',
        type: AssetType.IMAGE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true,
      });

      // Mock the loadAsset method to throw an error
      jest.spyOn(asset, 'loadAsset').mockRejectedValue(new Error('Load failed'));

      (manager as any).managedAssets.set('test-asset', asset);

      const result = await manager.loadAsset('test-asset');
      expect(result).toBeNull();
    });

    it('should handle bundle loading errors gracefully', async () => {
      const bundle = new AssetBundle('test-bundle', BundleType.SCENE, {} as BundleConfig);

      // Mock the loadBundle method to throw an error
      jest.spyOn(bundle, 'loadBundle').mockRejectedValue(new Error('Load failed'));

      (manager as any).assetBundles.set('test-bundle', bundle);

      const result = await manager.loadBundle('test-bundle');
      expect(result).toBeNull();
    });
  });
});
