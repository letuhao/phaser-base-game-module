/**
 * AssetBundleFactory Class Unit Tests
 *
 * Comprehensive tests for the AssetBundleFactory class implementation.
 */

import { AssetBundleFactory } from '../../classes/AssetBundleFactory';
import { AssetBundle } from '../../classes/AssetBundle';
import { Asset } from '../../classes/Asset';
import { BundleType } from '../../interfaces/IAssetBundle';
import { AssetType, AssetPriority } from '../../interfaces/IAsset';
import type { BundleCreationOptions, BundleFactoryConfig } from '../../interfaces/factories/IAssetBundleFactory';

describe('AssetBundleFactory', () => {
  let factory: AssetBundleFactory;
  const factoryId = 'test-bundle-factory';

  beforeEach(() => {
    factory = new AssetBundleFactory(factoryId);
  });

  describe('Constructor', () => {
    it('should create factory with correct initial values', () => {
      expect(factory.bundleFactoryId).toBe(factoryId);
      expect(factory.getBundleFactoryConfig().enableValidation).toBe(true);
      expect(factory.getBundleFactoryConfig().enableCaching).toBe(true);
      expect(factory.getBundleFactoryConfig().enablePooling).toBe(false);
      expect(factory.getBundleFactoryConfig().defaultPriority).toBe(AssetPriority.NORMAL);
      expect(factory.getBundleFactoryConfig().defaultPreload).toBe(true);
      expect(factory.getBundleFactoryConfig().defaultCache).toBe(true);
      expect(factory.getBundleFactoryConfig().maxBundleSize).toBe(100 * 1024 * 1024);
      expect(factory.getBundleFactoryMetadata()).toEqual({});
    });

    it('should initialize statistics correctly', () => {
      const stats = factory.getBundleFactoryStatistics();
      expect(stats.totalCreated).toBe(0);
      expect(stats.totalCloned).toBe(0);
      expect(stats.totalConfigured).toBe(0);
      expect(stats.totalValidated).toBe(0);
      expect(stats.validationFailures).toBe(0);
      expect(stats.lastCreationTime).toBe(0);
      expect(stats.createdByType).toEqual({});
    });

    it('should support all bundle types by default', () => {
      const supportedTypes = factory.getSupportedBundleTypes();
      const allBundleTypes = Object.values(BundleType);
      
      expect(supportedTypes).toHaveLength(allBundleTypes.length);
      for (const bundleType of allBundleTypes) {
        expect(factory.isBundleTypeSupported(bundleType)).toBe(true);
      }
    });

    it('should create factory with custom configuration', () => {
      const customConfig: Partial<BundleFactoryConfig> = {
        enableValidation: false,
        defaultPriority: AssetPriority.HIGH,
        defaultPreload: false,
        maxBundleSize: 50 * 1024 * 1024
      };

      const customFactory = new AssetBundleFactory('custom-bundle-factory', customConfig);
      
      expect(customFactory.getBundleFactoryConfig().enableValidation).toBe(false);
      expect(customFactory.getBundleFactoryConfig().defaultPriority).toBe(AssetPriority.HIGH);
      expect(customFactory.getBundleFactoryConfig().defaultPreload).toBe(false);
      expect(customFactory.getBundleFactoryConfig().maxBundleSize).toBe(50 * 1024 * 1024);
    });
  });

  describe('Configuration Management', () => {
    it('should set bundle factory configuration correctly', () => {
      const newConfig: BundleFactoryConfig = {
        enableValidation: false,
        enableCaching: false,
        enablePooling: true,
        defaultPriority: AssetPriority.HIGH,
        defaultPreload: false,
        defaultCache: false,
        maxBundleSize: 200 * 1024 * 1024,
        metadata: { test: 'value' }
      };

      factory.setBundleFactoryConfig(newConfig);
      expect(factory.getBundleFactoryConfig()).toEqual(newConfig);
    });

    it('should set bundle factory metadata correctly', () => {
      const metadata = { category: 'test', version: '1.0.0' };
      factory.setBundleFactoryMetadata(metadata);
      expect(factory.getBundleFactoryMetadata()).toEqual(metadata);
    });

    it('should merge bundle factory metadata', () => {
      factory.setBundleFactoryMetadata({ category: 'test' });
      factory.setBundleFactoryMetadata({ version: '1.0.0' });
      
      expect(factory.getBundleFactoryMetadata()).toEqual({
        category: 'test',
        version: '1.0.0'
      });
    });

    it('should return this for method chaining', () => {
      const result = factory.setBundleFactoryConfig(factory.getBundleFactoryConfig());
      expect(result).toBe(factory);
    });
  });

  describe('Bundle Creation', () => {
    const mockOptions: BundleCreationOptions = {
      bundleType: BundleType.SCENE,
      bundleId: 'test-bundle',
      bundleName: 'Test Bundle',
      priority: AssetPriority.NORMAL,
      preload: true,
      cache: true,
      metadata: { test: 'value' }
    };

    it('should create bundle successfully', async () => {
      const bundle = await factory.createBundle(mockOptions);
      
      expect(bundle).toBeInstanceOf(AssetBundle);
      expect(bundle.bundleId).toBe('test-bundle');
      expect(bundle.bundleType).toBe(BundleType.SCENE);
      expect(bundle.getBundleConfig().bundleName).toBe('Test Bundle');
      expect(bundle.getBundleConfig().priority).toBe(AssetPriority.NORMAL);
    });

    it('should update statistics after bundle creation', async () => {
      await factory.createBundle(mockOptions);
      
      const updatedStats = factory.getBundleFactoryStatistics();
      expect(updatedStats.totalCreated).toBe(1);
      expect(updatedStats.createdByType[BundleType.SCENE]).toBe(1);
      expect(updatedStats.lastCreationTime).toBeGreaterThan(0);
    });

    it('should use default values when options are not provided', async () => {
      const minimalOptions: BundleCreationOptions = {
        bundleType: BundleType.UI,
        bundleId: 'test-ui-bundle',
        bundleName: 'Test UI Bundle'
      };

      const bundle = await factory.createBundle(minimalOptions);
      
      expect(bundle.getBundleConfig().priority).toBe(AssetPriority.NORMAL);
      expect(bundle.getBundleConfig().preload).toBe(true);
      expect(bundle.getBundleConfig().cache).toBe(true);
    });

    it('should handle bundle creation errors', async () => {
      const invalidOptions: BundleCreationOptions = {
        bundleType: 'invalid' as BundleType,
        bundleId: 'test-invalid',
        bundleName: 'Test Invalid'
      };

      await expect(factory.createBundle(invalidOptions)).rejects.toThrow();
      
      const stats = factory.getBundleFactoryStatistics();
      expect(stats.validationFailures).toBeGreaterThan(0);
    });

    it('should create bundles with different types', async () => {
      const bundleTypes = [
        BundleType.SCENE,
        BundleType.UI,
        BundleType.AUDIO,
        BundleType.TEXTURE,
        BundleType.FONT,
        BundleType.CUSTOM
      ];

      for (const bundleType of bundleTypes) {
        const options: BundleCreationOptions = {
          bundleType,
          bundleId: `test-${bundleType}`,
          bundleName: `Test ${bundleType} Bundle`
        };

        const bundle = await factory.createBundle(options);
        expect(bundle.bundleType).toBe(bundleType);
      }
    });
  });

  describe('Bundle Creation from Config', () => {
    const mockConfig = {
      bundleId: 'test-config-bundle',
      bundleName: 'Test Config Bundle',
      bundleType: BundleType.SCENE,
      priority: AssetPriority.HIGH,
      preload: false,
      cache: true,
      metadata: { config: 'value' }
    };

    it('should create bundle from configuration', async () => {
      const bundle = await factory.createBundleFromConfig(mockConfig);
      
      expect(bundle).toBeInstanceOf(AssetBundle);
      expect(bundle.bundleId).toBe('test-config-bundle');
      expect(bundle.getBundleConfig()).toEqual(mockConfig);
    });

    it('should validate configuration when validation is enabled', async () => {
      const invalidConfig = {
        bundleId: '', // Invalid empty ID
        bundleName: 'Test Invalid Bundle',
        bundleType: BundleType.SCENE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true
      };

      await expect(factory.createBundleFromConfig(invalidConfig)).rejects.toThrow();
    });

    it('should skip validation when validation is disabled', async () => {
      factory.setBundleFactoryConfig({
        ...factory.getBundleFactoryConfig(),
        enableValidation: false
      });

      const invalidConfig = {
        bundleId: '', // Invalid empty ID
        bundleName: 'Test Invalid Bundle',
        bundleType: BundleType.SCENE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true
      };

      // Should not throw when validation is disabled
      const bundle = await factory.createBundleFromConfig(invalidConfig);
      expect(bundle).toBeInstanceOf(AssetBundle);
    });
  });

  describe('Bundle Cloning', () => {
    it('should clone bundle successfully', async () => {
      const originalBundle = await factory.createBundle({
        bundleType: BundleType.SCENE,
        bundleId: 'original',
        bundleName: 'Original Bundle'
      });

      const clonedBundle = await factory.cloneBundle(originalBundle);
      
      expect(clonedBundle).toBeInstanceOf(AssetBundle);
      expect(clonedBundle.bundleId).not.toBe(originalBundle.bundleId);
      expect(clonedBundle.bundleType).toBe(originalBundle.bundleType);
    });

    it('should update cloning statistics', async () => {
      const originalBundle = await factory.createBundle({
        bundleType: BundleType.SCENE,
        bundleId: 'original',
        bundleName: 'Original Bundle'
      });

      await factory.cloneBundle(originalBundle);
      const updatedStats = factory.getBundleFactoryStatistics();

      expect(updatedStats.totalCloned).toBe(1);
    });

    it('should handle cloning errors', async () => {
      const mockBundle = {
        bundleId: 'mock-id',
        bundleType: BundleType.SCENE,
        cloneBundle: jest.fn().mockRejectedValue(new Error('Clone failed'))
      } as unknown as AssetBundle;

      await expect(factory.cloneBundle(mockBundle)).rejects.toThrow('Clone failed');
    });
  });

  describe('Bundle Configuration', () => {
    it('should configure bundle successfully', async () => {
      const bundle = await factory.createBundle({
        bundleType: BundleType.SCENE,
        bundleId: 'test-bundle',
        bundleName: 'Test Bundle'
      });

      const newConfig = {
        priority: AssetPriority.HIGH,
        preload: false
      };

      const configuredBundle = await factory.configureBundle(bundle, newConfig);
      
      expect(configuredBundle).toBe(bundle);
      expect(bundle.getBundleConfig().priority).toBe(AssetPriority.HIGH);
      expect(bundle.getBundleConfig().preload).toBe(false);
    });

    it('should update configuration statistics', async () => {
      const bundle = await factory.createBundle({
        bundleType: BundleType.SCENE,
        bundleId: 'test-bundle',
        bundleName: 'Test Bundle'
      });

      await factory.configureBundle(bundle, { priority: AssetPriority.HIGH });
      const updatedStats = factory.getBundleFactoryStatistics();

      expect(updatedStats.totalConfigured).toBe(1);
    });

    it('should validate configuration when validation is enabled', async () => {
      const bundle = await factory.createBundle({
        bundleType: BundleType.SCENE,
        bundleId: 'test-bundle',
        bundleName: 'Test Bundle'
      });

      const invalidConfig = {
        priority: 'invalid' as AssetPriority
      };

      await expect(factory.configureBundle(bundle, invalidConfig)).rejects.toThrow();
    });
  });

  describe('Bundle Configuration Validation', () => {
    it('should validate correct configuration', async () => {
      const validConfig = {
        bundleId: 'valid-bundle',
        bundleName: 'Valid Bundle',
        bundleType: BundleType.SCENE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true
      };

      const isValid = await factory.validateBundleConfig(validConfig);
      expect(isValid).toBe(true);
    });

    it('should reject invalid bundle ID', async () => {
      const invalidConfig = {
        bundleId: '', // Invalid empty ID
        bundleName: 'Valid Bundle',
        bundleType: BundleType.SCENE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true
      };

      const isValid = await factory.validateBundleConfig(invalidConfig);
      expect(isValid).toBe(false);
    });

    it('should reject invalid bundle name', async () => {
      const invalidConfig = {
        bundleId: 'valid-bundle',
        bundleName: '', // Invalid empty name
        bundleType: BundleType.SCENE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true
      };

      const isValid = await factory.validateBundleConfig(invalidConfig);
      expect(isValid).toBe(false);
    });

    it('should reject invalid bundle type', async () => {
      const invalidConfig = {
        bundleId: 'valid-bundle',
        bundleName: 'Valid Bundle',
        bundleType: 'invalid' as BundleType,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true
      };

      const isValid = await factory.validateBundleConfig(invalidConfig);
      expect(isValid).toBe(false);
    });

    it('should reject invalid priority', async () => {
      const invalidConfig = {
        bundleId: 'valid-bundle',
        bundleName: 'Valid Bundle',
        bundleType: BundleType.SCENE,
        priority: 'invalid' as AssetPriority,
        preload: true,
        cache: true
      };

      const isValid = await factory.validateBundleConfig(invalidConfig);
      expect(isValid).toBe(false);
    });

    it('should reject invalid preload value', async () => {
      const invalidConfig = {
        bundleId: 'valid-bundle',
        bundleName: 'Valid Bundle',
        bundleType: BundleType.SCENE,
        priority: AssetPriority.NORMAL,
        preload: 'invalid' as any,
        cache: true
      };

      const isValid = await factory.validateBundleConfig(invalidConfig);
      expect(isValid).toBe(false);
    });

    it('should reject invalid cache value', async () => {
      const invalidConfig = {
        bundleId: 'valid-bundle',
        bundleName: 'Valid Bundle',
        bundleType: BundleType.SCENE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: 'invalid' as any
      };

      const isValid = await factory.validateBundleConfig(invalidConfig);
      expect(isValid).toBe(false);
    });

    it('should update validation statistics', async () => {
      await factory.validateBundleConfig({
        bundleId: 'test',
        bundleName: 'Test Bundle',
        bundleType: BundleType.SCENE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true
      });

      const updatedStats = factory.getBundleFactoryStatistics();
      expect(updatedStats.totalValidated).toBe(1);
    });
  });

  describe('Bundle Type Creator Management', () => {
    it('should register custom bundle type creator', () => {
      const customCreator = jest.fn().mockResolvedValue(new AssetBundle('test', BundleType.SCENE, {
        bundleId: 'test',
        bundleName: 'Test Bundle',
        bundleType: BundleType.SCENE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true
      }));

      factory.registerBundleTypeCreator(BundleType.SCENE, customCreator);
      
      const creator = factory.getBundleTypeCreator(BundleType.SCENE);
      expect(creator).toBe(customCreator);
    });

    it('should unregister bundle type creator', () => {
      factory.unregisterBundleTypeCreator(BundleType.SCENE);
      
      const creator = factory.getBundleTypeCreator(BundleType.SCENE);
      expect(creator).toBeNull();
      expect(factory.isBundleTypeSupported(BundleType.SCENE)).toBe(false);
    });

    it('should handle unregistering non-existent creator', () => {
      // Should not throw
      factory.unregisterBundleTypeCreator(BundleType.SCENE);
      factory.unregisterBundleTypeCreator(BundleType.SCENE);
    });

    it('should return this for method chaining', () => {
      const result = factory.registerBundleTypeCreator(BundleType.SCENE, jest.fn());
      expect(result).toBe(factory);
    });
  });

  describe('Multiple Bundle Creation', () => {
    it('should create multiple bundles successfully', async () => {
      const options: BundleCreationOptions[] = [
        {
          bundleType: BundleType.SCENE,
          bundleId: 'scene1',
          bundleName: 'Scene Bundle 1'
        },
        {
          bundleType: BundleType.UI,
          bundleId: 'ui1',
          bundleName: 'UI Bundle 1'
        },
        {
          bundleType: BundleType.AUDIO,
          bundleId: 'audio1',
          bundleName: 'Audio Bundle 1'
        }
      ];

      const bundles = await factory.createBundles(options);
      
      expect(bundles).toHaveLength(3);
      expect(bundles[0].bundleId).toBe('scene1');
      expect(bundles[1].bundleId).toBe('ui1');
      expect(bundles[2].bundleId).toBe('audio1');
    });

    it('should create multiple bundles from configurations', async () => {
      const configs = [
        {
          bundleId: 'config1',
          bundleName: 'Config Bundle 1',
          bundleType: BundleType.SCENE,
          priority: AssetPriority.NORMAL,
          preload: true,
          cache: true
        },
        {
          bundleId: 'config2',
          bundleName: 'Config Bundle 2',
          bundleType: BundleType.UI,
          priority: AssetPriority.HIGH,
          preload: false,
          cache: true
        }
      ];

      const bundles = await factory.createBundlesFromConfigs(configs);
      
      expect(bundles).toHaveLength(2);
      expect(bundles[0].bundleId).toBe('config1');
      expect(bundles[1].bundleId).toBe('config2');
    });

    it('should handle partial failures in multiple bundle creation', async () => {
      const options: BundleCreationOptions[] = [
        {
          bundleType: BundleType.SCENE,
          bundleId: 'valid',
          bundleName: 'Valid Bundle'
        },
        {
          bundleType: 'invalid' as BundleType,
          bundleId: 'invalid',
          bundleName: 'Invalid Bundle'
        }
      ];

      const bundles = await factory.createBundles(options);
      
      // Should return only the successful bundles
      expect(bundles).toHaveLength(1);
      expect(bundles[0].bundleId).toBe('valid');
    });
  });

  describe('Bundle Creation from Assets', () => {
    it('should create bundle from assets successfully', async () => {
      const assets = [
        new Asset('asset1', 'asset1', AssetType.IMAGE, {
          key: 'asset1',
          path: '/test/asset1.png',
          type: AssetType.IMAGE,
          priority: AssetPriority.NORMAL,
          preload: true,
          cache: true
        }),
        new Asset('asset2', 'asset2', AssetType.AUDIO, {
          key: 'asset2',
          path: '/test/asset2.mp3',
          type: AssetType.AUDIO,
          priority: AssetPriority.NORMAL,
          preload: true,
          cache: true
        })
      ];

      // Set asset sizes manually for testing
      assets[0].setAssetSize(1024 * 1024); // 1MB
      assets[1].setAssetSize(512 * 1024); // 512KB

      const bundle = await factory.createBundleFromAssets(
        assets,
        BundleType.SCENE,
        'test-bundle',
        'Test Bundle'
      );

      expect(bundle).toBeInstanceOf(AssetBundle);
      expect(bundle.bundleId).toBe('test-bundle');
      expect(bundle.bundleType).toBe(BundleType.SCENE);
      expect(bundle.getBundleSize()).toBeGreaterThan(0);
    });

    it('should handle empty assets array', async () => {
      const bundle = await factory.createBundleFromAssets(
        [],
        BundleType.SCENE,
        'empty-bundle',
        'Empty Bundle'
      );

      expect(bundle).toBeInstanceOf(AssetBundle);
      expect(bundle.bundleId).toBe('empty-bundle');
      expect(bundle.getBundleSize()).toBe(0);
    });
  });

  describe('Creation Statistics', () => {
    it('should return correct creation statistics', async () => {
      // Create some bundles with small delays to ensure creation times are tracked
      await factory.createBundle({
        bundleType: BundleType.SCENE,
        bundleId: 'bundle1',
        bundleName: 'Bundle 1'
      });

      await new Promise(resolve => setTimeout(resolve, 1)); // Small delay

      await factory.createBundle({
        bundleType: BundleType.SCENE,
        bundleId: 'bundle2',
        bundleName: 'Bundle 2'
      });

      await new Promise(resolve => setTimeout(resolve, 1)); // Small delay

      await factory.createBundle({
        bundleType: BundleType.UI,
        bundleId: 'bundle3',
        bundleName: 'Bundle 3'
      });

      const stats = factory.getCreationStatistics();
      
      expect(stats.totalCreated).toBe(3);
      expect(stats.successRate).toBe(100);
      expect(stats.averageCreationTime).toBeGreaterThanOrEqual(0);
      expect(stats.mostCreatedType).toBe(BundleType.SCENE);
    });

    it('should calculate success rate correctly', async () => {
      // Create a valid bundle
      await factory.createBundle({
        bundleType: BundleType.SCENE,
        bundleId: 'valid',
        bundleName: 'Valid Bundle'
      });

      // Try to create an invalid bundle (this will fail)
      try {
        await factory.createBundle({
          bundleType: 'invalid' as BundleType,
          bundleId: 'invalid',
          bundleName: 'Invalid Bundle'
        });
      } catch (error) {
        // Expected to fail
      }

      const stats = factory.getCreationStatistics();
      expect(stats.totalCreated).toBe(1);
      expect(stats.successRate).toBe(50); // 1 success out of 2 attempts
    });
  });

  describe('Factory Management', () => {
    it('should clear bundle factory correctly', async () => {
      // Create some bundles and modify statistics
      await factory.createBundle({
        bundleType: BundleType.SCENE,
        bundleId: 'test',
        bundleName: 'Test Bundle'
      });

      factory.setBundleFactoryMetadata({ test: 'value' });

      // Clear factory
      factory.clearBundleFactory();

      const stats = factory.getBundleFactoryStatistics();
      expect(stats.totalCreated).toBe(0);
      expect(stats.totalCloned).toBe(0);
      expect(stats.totalConfigured).toBe(0);
      expect(stats.totalValidated).toBe(0);
      expect(stats.validationFailures).toBe(0);
      expect(factory.getBundleFactoryMetadata()).toEqual({});
    });

    it('should update bundle factory', () => {
      // Should not throw
      factory.updateBundleFactory(16.67); // ~60 FPS
    });

    it('should return this for method chaining', () => {
      const result = factory.clearBundleFactory();
      expect(result).toBe(factory);
    });
  });

  describe('Error Handling', () => {
    it('should handle bundle creation errors gracefully', async () => {
      const invalidOptions: BundleCreationOptions = {
        bundleType: 'invalid' as BundleType,
        bundleId: 'invalid',
        bundleName: 'Invalid Bundle'
      };

      await expect(factory.createBundle(invalidOptions)).rejects.toThrow();
      
      const stats = factory.getBundleFactoryStatistics();
      expect(stats.validationFailures).toBeGreaterThan(0);
    });

    it('should handle configuration validation errors', async () => {
      // Create a fresh factory to ensure clean statistics
      const testFactory = new AssetBundleFactory('test-validation-factory');
      
      const invalidConfig = {
        bundleId: '', // Invalid empty ID
        bundleName: 'Test Invalid Bundle',
        bundleType: BundleType.SCENE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true
      };

      const isValid = await testFactory.validateBundleConfig(invalidConfig);
      expect(isValid).toBe(false);
      
      const stats = testFactory.getBundleFactoryStatistics();
      expect(stats.validationFailures).toBe(1);
    });
  });

  describe('Method Chaining', () => {
    it('should support method chaining', () => {
      const result = factory
        .setBundleFactoryConfig(factory.getBundleFactoryConfig())
        .setBundleFactoryMetadata({ test: 'value' })
        .clearBundleFactory();
      
      expect(result).toBe(factory);
    });
  });
});
