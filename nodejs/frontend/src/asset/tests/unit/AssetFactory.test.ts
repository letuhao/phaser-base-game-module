/**
 * AssetFactory Class Unit Tests
 *
 * Comprehensive tests for the AssetFactory class implementation.
 */

import { AssetFactory } from '../../classes/AssetFactory';
import { Asset } from '../../classes/Asset';
import { AssetType, AssetPriority } from '../../interfaces/IAsset';
import type { AssetCreationOptions, FactoryConfig } from '../../interfaces/factories/IAssetFactory';

describe('AssetFactory', () => {
  let factory: AssetFactory;
  const factoryId = 'test-factory';

  beforeEach(() => {
    factory = new AssetFactory(factoryId);
  });

  describe('Constructor', () => {
    it('should create factory with correct initial values', () => {
      expect(factory.factoryId).toBe(factoryId);
      expect(factory.getFactoryConfig().enableValidation).toBe(true);
      expect(factory.getFactoryConfig().enableCaching).toBe(true);
      expect(factory.getFactoryConfig().enablePooling).toBe(false);
      expect(factory.getFactoryConfig().defaultPriority).toBe(AssetPriority.NORMAL);
      expect(factory.getFactoryConfig().defaultPreload).toBe(true);
      expect(factory.getFactoryConfig().defaultCache).toBe(true);
      expect(factory.getFactoryMetadata()).toEqual({});
    });

    it('should initialize statistics correctly', () => {
      const stats = factory.getFactoryStatistics();
      expect(stats.totalCreated).toBe(0);
      expect(stats.totalCloned).toBe(0);
      expect(stats.totalConfigured).toBe(0);
      expect(stats.totalValidated).toBe(0);
      expect(stats.validationFailures).toBe(0);
      expect(stats.lastCreationTime).toBe(0);
      expect(stats.createdByType).toEqual({});
    });

    it('should support all asset types by default', () => {
      const supportedTypes = factory.getSupportedAssetTypes();
      const allAssetTypes = Object.values(AssetType);

      expect(supportedTypes).toHaveLength(allAssetTypes.length);
      for (const assetType of allAssetTypes) {
        expect(factory.isAssetTypeSupported(assetType)).toBe(true);
      }
    });

    it('should create factory with custom configuration', () => {
      const customConfig: Partial<FactoryConfig> = {
        enableValidation: false,
        defaultPriority: AssetPriority.HIGH,
        defaultPreload: false,
      };

      const customFactory = new AssetFactory('custom-factory', customConfig);

      expect(customFactory.getFactoryConfig().enableValidation).toBe(false);
      expect(customFactory.getFactoryConfig().defaultPriority).toBe(AssetPriority.HIGH);
      expect(customFactory.getFactoryConfig().defaultPreload).toBe(false);
    });
  });

  describe('Configuration Management', () => {
    it('should set factory configuration correctly', () => {
      const newConfig: FactoryConfig = {
        enableValidation: false,
        enableCaching: false,
        enablePooling: true,
        defaultPriority: AssetPriority.HIGH,
        defaultPreload: false,
        defaultCache: false,
        metadata: { test: 'value' },
      };

      factory.setFactoryConfig(newConfig);
      expect(factory.getFactoryConfig()).toEqual(newConfig);
    });

    it('should set factory metadata correctly', () => {
      const metadata = { category: 'test', version: '1.0.0' };
      factory.setFactoryMetadata(metadata);
      expect(factory.getFactoryMetadata()).toEqual(metadata);
    });

    it('should merge factory metadata', () => {
      factory.setFactoryMetadata({ category: 'test' });
      factory.setFactoryMetadata({ version: '1.0.0' });

      expect(factory.getFactoryMetadata()).toEqual({
        category: 'test',
        version: '1.0.0',
      });
    });

    it('should return this for method chaining', () => {
      const result = factory.setFactoryConfig(factory.getFactoryConfig());
      expect(result).toBe(factory);
    });
  });

  describe('Asset Creation', () => {
    const mockOptions: AssetCreationOptions = {
      assetType: AssetType.IMAGE,
      assetKey: 'test-image',
      assetPath: '/test/image.png',
      priority: AssetPriority.NORMAL,
      preload: true,
      cache: true,
      metadata: { test: 'value' },
    };

    it('should create asset successfully', async () => {
      const asset = await factory.createAsset(mockOptions);

      expect(asset).toBeInstanceOf(Asset);
      expect(asset.assetKey).toBe('test-image');
      expect(asset.assetType).toBe(AssetType.IMAGE);
      expect(asset.getAssetConfig().path).toBe('/test/image.png');
      expect(asset.getAssetConfig().priority).toBe(AssetPriority.NORMAL);
    });

    it('should update statistics after asset creation', async () => {
      await factory.createAsset(mockOptions);

      const updatedStats = factory.getFactoryStatistics();
      expect(updatedStats.totalCreated).toBe(1);
      expect(updatedStats.createdByType[AssetType.IMAGE]).toBe(1);
      expect(updatedStats.lastCreationTime).toBeGreaterThan(0);
    });

    it('should use default values when options are not provided', async () => {
      const minimalOptions: AssetCreationOptions = {
        assetType: AssetType.AUDIO,
        assetKey: 'test-audio',
        assetPath: '/test/audio.mp3',
      };

      const asset = await factory.createAsset(minimalOptions);

      expect(asset.getAssetConfig().priority).toBe(AssetPriority.NORMAL);
      expect(asset.getAssetConfig().preload).toBe(true);
      expect(asset.getAssetConfig().cache).toBe(true);
    });

    it('should handle asset creation errors', async () => {
      const invalidOptions: AssetCreationOptions = {
        assetType: 'invalid' as AssetType,
        assetKey: 'test-invalid',
        assetPath: '/test/invalid',
      };

      await expect(factory.createAsset(invalidOptions)).rejects.toThrow();

      const stats = factory.getFactoryStatistics();
      expect(stats.validationFailures).toBeGreaterThan(0);
    });

    it('should create assets with different types', async () => {
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

      for (const assetType of assetTypes) {
        const options: AssetCreationOptions = {
          assetType,
          assetKey: `test-${assetType}`,
          assetPath: `/test/${assetType}`,
        };

        const asset = await factory.createAsset(options);
        expect(asset.assetType).toBe(assetType);
      }
    });
  });

  describe('Asset Creation from Config', () => {
    const mockConfig = {
      key: 'test-config-asset',
      path: '/test/config.png',
      type: AssetType.IMAGE,
      priority: AssetPriority.HIGH,
      preload: false,
      cache: true,
      metadata: { config: 'value' },
    };

    it('should create asset from configuration', async () => {
      const asset = await factory.createAssetFromConfig(mockConfig);

      expect(asset).toBeInstanceOf(Asset);
      expect(asset.assetKey).toBe('test-config-asset');
      expect(asset.getAssetConfig()).toEqual(mockConfig);
    });

    it('should validate configuration when validation is enabled', async () => {
      const invalidConfig = {
        key: '', // Invalid empty key
        path: '/test/invalid.png',
        type: AssetType.IMAGE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true,
      };

      await expect(factory.createAssetFromConfig(invalidConfig)).rejects.toThrow();
    });

    it('should skip validation when validation is disabled', async () => {
      factory.setFactoryConfig({
        ...factory.getFactoryConfig(),
        enableValidation: false,
      });

      const invalidConfig = {
        key: '', // Invalid empty key
        path: '/test/invalid.png',
        type: AssetType.IMAGE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true,
      };

      // Should not throw when validation is disabled
      const asset = await factory.createAssetFromConfig(invalidConfig);
      expect(asset).toBeInstanceOf(Asset);
    });
  });

  describe('Asset Cloning', () => {
    it('should clone asset successfully', async () => {
      const originalAsset = await factory.createAsset({
        assetType: AssetType.IMAGE,
        assetKey: 'original',
        assetPath: '/test/original.png',
      });

      const clonedAsset = await factory.cloneAsset(originalAsset);

      expect(clonedAsset).toBeInstanceOf(Asset);
      expect(clonedAsset.assetId).not.toBe(originalAsset.assetId);
      expect(clonedAsset.assetKey).toBe('original_clone');
      expect(clonedAsset.assetType).toBe(originalAsset.assetType);
    });

    it('should update cloning statistics', async () => {
      const originalAsset = await factory.createAsset({
        assetType: AssetType.IMAGE,
        assetKey: 'original',
        assetPath: '/test/original.png',
      });

      await factory.cloneAsset(originalAsset);
      const updatedStats = factory.getFactoryStatistics();

      expect(updatedStats.totalCloned).toBe(1);
    });

    it('should handle cloning errors', async () => {
      const mockAsset = {
        assetId: 'mock-id',
        assetKey: 'mock-key',
        assetType: AssetType.IMAGE,
        cloneAsset: jest.fn().mockRejectedValue(new Error('Clone failed')),
      } as unknown as Asset;

      await expect(factory.cloneAsset(mockAsset)).rejects.toThrow('Clone failed');
    });
  });

  describe('Asset Configuration', () => {
    it('should configure asset successfully', async () => {
      const asset = await factory.createAsset({
        assetType: AssetType.IMAGE,
        assetKey: 'test-asset',
        assetPath: '/test/asset.png',
      });

      const newConfig = {
        priority: AssetPriority.HIGH,
        preload: false,
      };

      const configuredAsset = await factory.configureAsset(asset, newConfig);

      expect(configuredAsset).toBe(asset);
      expect(asset.getAssetConfig().priority).toBe(AssetPriority.HIGH);
      expect(asset.getAssetConfig().preload).toBe(false);
    });

    it('should update configuration statistics', async () => {
      const asset = await factory.createAsset({
        assetType: AssetType.IMAGE,
        assetKey: 'test-asset',
        assetPath: '/test/asset.png',
      });

      await factory.configureAsset(asset, { priority: AssetPriority.HIGH });
      const updatedStats = factory.getFactoryStatistics();

      expect(updatedStats.totalConfigured).toBe(1);
    });

    it('should validate configuration when validation is enabled', async () => {
      const asset = await factory.createAsset({
        assetType: AssetType.IMAGE,
        assetKey: 'test-asset',
        assetPath: '/test/asset.png',
      });

      const invalidConfig = {
        priority: 'invalid' as AssetPriority,
      };

      await expect(factory.configureAsset(asset, invalidConfig)).rejects.toThrow();
    });
  });

  describe('Asset Configuration Validation', () => {
    it('should validate correct configuration', async () => {
      const validConfig = {
        key: 'valid-asset',
        path: '/test/valid.png',
        type: AssetType.IMAGE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true,
      };

      const isValid = await factory.validateAssetConfig(validConfig);
      expect(isValid).toBe(true);
    });

    it('should reject invalid asset key', async () => {
      const invalidConfig = {
        key: '', // Invalid empty key
        path: '/test/invalid.png',
        type: AssetType.IMAGE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true,
      };

      const isValid = await factory.validateAssetConfig(invalidConfig);
      expect(isValid).toBe(false);
    });

    it('should reject invalid asset path', async () => {
      const invalidConfig = {
        key: 'valid-asset',
        path: '', // Invalid empty path
        type: AssetType.IMAGE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true,
      };

      const isValid = await factory.validateAssetConfig(invalidConfig);
      expect(isValid).toBe(false);
    });

    it('should reject invalid asset type', async () => {
      const invalidConfig = {
        key: 'valid-asset',
        path: '/test/valid.png',
        type: 'invalid' as AssetType,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true,
      };

      const isValid = await factory.validateAssetConfig(invalidConfig);
      expect(isValid).toBe(false);
    });

    it('should reject invalid priority', async () => {
      const invalidConfig = {
        key: 'valid-asset',
        path: '/test/valid.png',
        type: AssetType.IMAGE,
        priority: 'invalid' as AssetPriority,
        preload: true,
        cache: true,
      };

      const isValid = await factory.validateAssetConfig(invalidConfig);
      expect(isValid).toBe(false);
    });

    it('should reject invalid preload value', async () => {
      const invalidConfig = {
        key: 'valid-asset',
        path: '/test/valid.png',
        type: AssetType.IMAGE,
        priority: AssetPriority.NORMAL,
        preload: 'invalid' as any,
        cache: true,
      };

      const isValid = await factory.validateAssetConfig(invalidConfig);
      expect(isValid).toBe(false);
    });

    it('should reject invalid cache value', async () => {
      const invalidConfig = {
        key: 'valid-asset',
        path: '/test/valid.png',
        type: AssetType.IMAGE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: 'invalid' as any,
      };

      const isValid = await factory.validateAssetConfig(invalidConfig);
      expect(isValid).toBe(false);
    });

    it('should update validation statistics', async () => {
      await factory.validateAssetConfig({
        key: 'test',
        path: '/test.png',
        type: AssetType.IMAGE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true,
      });

      const updatedStats = factory.getFactoryStatistics();
      expect(updatedStats.totalValidated).toBe(1);
    });
  });

  describe('Asset Type Creator Management', () => {
    it('should register custom asset type creator', () => {
      const customCreator = jest.fn().mockResolvedValue(
        new Asset('test', 'test', AssetType.IMAGE, {
          key: 'test',
          path: '/test.png',
          type: AssetType.IMAGE,
          priority: AssetPriority.NORMAL,
          preload: true,
          cache: true,
        })
      );

      factory.registerAssetTypeCreator(AssetType.IMAGE, customCreator);

      const creator = factory.getAssetTypeCreator(AssetType.IMAGE);
      expect(creator).toBe(customCreator);
    });

    it('should unregister asset type creator', () => {
      factory.unregisterAssetTypeCreator(AssetType.IMAGE);

      const creator = factory.getAssetTypeCreator(AssetType.IMAGE);
      expect(creator).toBeNull();
      expect(factory.isAssetTypeSupported(AssetType.IMAGE)).toBe(false);
    });

    it('should handle unregistering non-existent creator', () => {
      // Should not throw
      factory.unregisterAssetTypeCreator(AssetType.IMAGE);
      factory.unregisterAssetTypeCreator(AssetType.IMAGE);
    });

    it('should return this for method chaining', () => {
      const result = factory.registerAssetTypeCreator(AssetType.IMAGE, jest.fn());
      expect(result).toBe(factory);
    });
  });

  describe('Multiple Asset Creation', () => {
    it('should create multiple assets successfully', async () => {
      const options: AssetCreationOptions[] = [
        {
          assetType: AssetType.IMAGE,
          assetKey: 'image1',
          assetPath: '/test/image1.png',
        },
        {
          assetType: AssetType.AUDIO,
          assetKey: 'audio1',
          assetPath: '/test/audio1.mp3',
        },
        {
          assetType: AssetType.JSON,
          assetKey: 'json1',
          assetPath: '/test/json1.json',
        },
      ];

      const assets = await factory.createAssets(options);

      expect(assets).toHaveLength(3);
      expect(assets[0].assetKey).toBe('image1');
      expect(assets[1].assetKey).toBe('audio1');
      expect(assets[2].assetKey).toBe('json1');
    });

    it('should create multiple assets from configurations', async () => {
      const configs = [
        {
          key: 'config1',
          path: '/test/config1.png',
          type: AssetType.IMAGE,
          priority: AssetPriority.NORMAL,
          preload: true,
          cache: true,
        },
        {
          key: 'config2',
          path: '/test/config2.mp3',
          type: AssetType.AUDIO,
          priority: AssetPriority.HIGH,
          preload: false,
          cache: true,
        },
      ];

      const assets = await factory.createAssetsFromConfigs(configs);

      expect(assets).toHaveLength(2);
      expect(assets[0].assetKey).toBe('config1');
      expect(assets[1].assetKey).toBe('config2');
    });

    it('should handle partial failures in multiple asset creation', async () => {
      const options: AssetCreationOptions[] = [
        {
          assetType: AssetType.IMAGE,
          assetKey: 'valid',
          assetPath: '/test/valid.png',
        },
        {
          assetType: 'invalid' as AssetType,
          assetKey: 'invalid',
          assetPath: '/test/invalid',
        },
      ];

      const assets = await factory.createAssets(options);

      // Should return only the successful assets
      expect(assets).toHaveLength(1);
      expect(assets[0].assetKey).toBe('valid');
    });
  });

  describe('Creation Statistics', () => {
    it('should return correct creation statistics', async () => {
      // Create some assets with small delays to ensure creation times are tracked
      await factory.createAsset({
        assetType: AssetType.IMAGE,
        assetKey: 'image1',
        assetPath: '/test/image1.png',
      });

      await new Promise(resolve => setTimeout(resolve, 1)); // Small delay

      await factory.createAsset({
        assetType: AssetType.IMAGE,
        assetKey: 'image2',
        assetPath: '/test/image2.png',
      });

      await new Promise(resolve => setTimeout(resolve, 1)); // Small delay

      await factory.createAsset({
        assetType: AssetType.AUDIO,
        assetKey: 'audio1',
        assetPath: '/test/audio1.mp3',
      });

      const stats = factory.getCreationStatistics();

      expect(stats.totalCreated).toBe(3);
      expect(stats.successRate).toBe(100);
      expect(stats.averageCreationTime).toBeGreaterThanOrEqual(0);
      expect(stats.mostCreatedType).toBe(AssetType.IMAGE);
    });

    it('should calculate success rate correctly', async () => {
      // Create a valid asset
      await factory.createAsset({
        assetType: AssetType.IMAGE,
        assetKey: 'valid',
        assetPath: '/test/valid.png',
      });

      // Try to create an invalid asset (this will fail)
      try {
        await factory.createAsset({
          assetType: 'invalid' as AssetType,
          assetKey: 'invalid',
          assetPath: '/test/invalid',
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
    it('should clear factory correctly', async () => {
      // Create some assets and modify statistics
      await factory.createAsset({
        assetType: AssetType.IMAGE,
        assetKey: 'test',
        assetPath: '/test.png',
      });

      factory.setFactoryMetadata({ test: 'value' });

      // Clear factory
      factory.clearFactory();

      const stats = factory.getFactoryStatistics();
      expect(stats.totalCreated).toBe(0);
      expect(stats.totalCloned).toBe(0);
      expect(stats.totalConfigured).toBe(0);
      expect(stats.totalValidated).toBe(0);
      expect(stats.validationFailures).toBe(0);
      expect(factory.getFactoryMetadata()).toEqual({});
    });

    it('should update factory', () => {
      // Should not throw
      factory.updateFactory(16.67); // ~60 FPS
    });

    it('should return this for method chaining', () => {
      const result = factory.clearFactory();
      expect(result).toBe(factory);
    });
  });

  describe('Error Handling', () => {
    it('should handle asset creation errors gracefully', async () => {
      const invalidOptions: AssetCreationOptions = {
        assetType: 'invalid' as AssetType,
        assetKey: 'invalid',
        assetPath: '/test/invalid',
      };

      await expect(factory.createAsset(invalidOptions)).rejects.toThrow();

      const stats = factory.getFactoryStatistics();
      expect(stats.validationFailures).toBeGreaterThan(0);
    });

    it('should handle configuration validation errors', async () => {
      // Create a fresh factory to ensure clean statistics
      const testFactory = new AssetFactory('test-validation-factory');

      const invalidConfig = {
        key: '',
        path: '/test/invalid.png',
        type: AssetType.IMAGE,
        priority: AssetPriority.NORMAL,
        preload: true,
        cache: true,
      };

      const isValid = await testFactory.validateAssetConfig(invalidConfig);
      expect(isValid).toBe(false);

      const stats = testFactory.getFactoryStatistics();
      expect(stats.validationFailures).toBe(1);
    });
  });

  describe('Method Chaining', () => {
    it('should support method chaining', () => {
      const result = factory
        .setFactoryConfig(factory.getFactoryConfig())
        .setFactoryMetadata({ test: 'value' })
        .clearFactory();

      expect(result).toBe(factory);
    });
  });
});
