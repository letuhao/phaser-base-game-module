/**
 * Verify Loading Logic Integration
 * 
 * Simple script to verify that the asset loading logic is correctly integrated
 * with the system. This can be run independently to check the integration.
 */

import { AssetManager } from '../asset/classes/AssetManager';
import { SceneAssetConfigLoader } from '../asset/classes/SceneAssetConfigLoader';
import { levis2025R3WheelScene1AssetConfig } from '../runtime/games/levis-2025-r3-wheel/scene-1/levis-2025-r3-wheel-scene-1.asset.config';
import { Logger } from '../core/Logger';

const logger = Logger.getInstance();

/**
 * Verify the complete asset loading integration
 */
export async function verifyLoadingLogicIntegration(): Promise<boolean> {
  logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Starting loading logic verification');

  try {
    // Step 1: Initialize Asset Manager
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Step 1: Initializing Asset Manager');
    const assetManager = new AssetManager('verification-asset-manager');
    
    // Verify Asset Manager initialization
    if (!assetManager.managerId || !assetManager.managerConfig) {
      logger.error('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Asset Manager initialization failed');
      return false;
    }
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Asset Manager initialized successfully');

    // Step 2: Initialize Scene Asset Loader
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Step 2: Initializing Scene Asset Loader');
    const sceneAssetLoader = new SceneAssetConfigLoader(
      'verification-loader',
      levis2025R3WheelScene1AssetConfig.sceneId,
      assetManager,
      levis2025R3WheelScene1AssetConfig as any
    );

    // Verify Scene Asset Loader initialization
    if (!sceneAssetLoader.getLoaderId() || !sceneAssetLoader.getSceneId()) {
      logger.error('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Scene Asset Loader initialization failed');
      return false;
    }
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Scene Asset Loader initialized successfully');

    // Step 3: Verify Configuration Loading
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Step 3: Verifying configuration loading');
    const config = sceneAssetLoader.getSceneAssetConfig();
    
    if (!config || !config.assets || !config.bundles) {
      logger.error('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Configuration loading failed');
      return false;
    }
    
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Configuration loaded successfully', {
      assetCount: config.assets.length,
      bundleCount: config.bundles.length
    });

    // Step 4: Verify Asset Configuration Structure
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Step 4: Verifying asset configuration structure');
    for (const assetConfig of config.assets) {
      if (!assetConfig.key || !assetConfig.path || !assetConfig.type) {
        logger.error('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Invalid asset configuration', { assetConfig });
        return false;
      }
    }
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Asset configuration structure verified');

    // Step 5: Verify Bundle Configuration Structure
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Step 5: Verifying bundle configuration structure');
    for (const bundleConfig of config.bundles) {
      if (!bundleConfig.bundleId || !bundleConfig.bundleType || !bundleConfig.assetKeys) {
        logger.error('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Invalid bundle configuration', { bundleConfig });
        return false;
      }
    }
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Bundle configuration structure verified');

    // Step 6: Verify Asset Validation
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Step 6: Verifying asset validation');
    for (const assetConfig of config.assets) {
      const isValid = assetManager.validateAssetConfig(assetConfig);
      if (!isValid) {
        logger.error('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Asset validation failed', { assetConfig });
        return false;
      }
    }
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Asset validation passed');

    // Step 7: Verify Bundle Validation
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Step 7: Verifying bundle validation');
    for (const bundleConfig of config.bundles) {
      const isValid = assetManager.validateBundleConfig(bundleConfig);
      if (!isValid) {
        logger.error('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Bundle validation failed', { bundleConfig });
        return false;
      }
    }
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Bundle validation passed');

    // Step 8: Verify Asset Creation
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Step 8: Verifying asset creation');
    for (const assetConfig of config.assets) {
      try {
        const asset = await assetManager.assetFactory.createAssetFromConfig(assetConfig);
        if (!asset || !asset.assetKey || asset.assetKey !== assetConfig.key) {
          logger.error('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Asset creation failed', { assetConfig });
          return false;
        }
      } catch (error) {
        logger.error('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Asset creation error', { assetConfig, error });
        return false;
      }
    }
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Asset creation verified');

    // Step 9: Verify Bundle Creation
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Step 9: Verifying bundle creation');
    for (const bundleConfig of config.bundles) {
      try {
        const bundle = await assetManager.bundleFactory.createBundle(bundleConfig);
        if (!bundle || !bundle.bundleId || bundle.bundleId !== bundleConfig.bundleId) {
          logger.error('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Bundle creation failed', { bundleConfig });
          return false;
        }
      } catch (error) {
        logger.error('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Bundle creation error', { bundleConfig, error });
        return false;
      }
    }
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Bundle creation verified');

    // Step 10: Verify Loading Progress Tracking
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Step 10: Verifying loading progress tracking');
    const progress = sceneAssetLoader.getLoadingProgress();
    if (!progress || progress.totalAssets !== config.assets.length || progress.totalBundles !== config.bundles.length) {
      logger.error('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Loading progress tracking failed', { progress });
      return false;
    }
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Loading progress tracking verified');

    // Step 11: Verify Manager Statistics
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Step 11: Verifying manager statistics');
    const stats = assetManager.getManagerStatistics();
    if (!stats || typeof stats.totalAssets !== 'number' || typeof stats.totalBundles !== 'number') {
      logger.error('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Manager statistics failed', { stats });
      return false;
    }
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Manager statistics verified');

    // Step 12: Verify Interface Compatibility
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Step 12: Verifying interface compatibility');
    
    // Check Asset Manager interface
    const requiredAssetManagerMethods = [
      'loadAsset', 'loadBundle', 'getAsset', 'getBundle', 
      'isAssetLoaded', 'isBundleLoaded', 'getManagerStatistics'
    ];
    
    for (const method of requiredAssetManagerMethods) {
      if (typeof (assetManager as any)[method] !== 'function') {
        logger.error('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Asset Manager missing method', { method });
        return false;
      }
    }

    // Check Scene Asset Loader interface
    const requiredSceneLoaderMethods = [
      'loadSceneAssets', 'unloadSceneAssets', 'getLoadingProgress', 
      'getLoadingState', 'isLoadingComplete'
    ];
    
    for (const method of requiredSceneLoaderMethods) {
      if (typeof (sceneAssetLoader as any)[method] !== 'function') {
        logger.error('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Scene Asset Loader missing method', { method });
        return false;
      }
    }
    
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Interface compatibility verified');

    // Cleanup
    assetManager.clearManager();
    
    logger.info('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Loading logic integration verification completed successfully');
    return true;

  } catch (error) {
    logger.error('verifyLoadingLogicIntegration', 'verifyLoadingLogicIntegration', 'Loading logic integration verification failed', { error });
    return false;
  }
}

/**
 * Run the verification if this script is executed directly
 */
if (require.main === module) {
  verifyLoadingLogicIntegration()
    .then(success => {
      if (success) {
        console.log('✅ Loading logic integration verification PASSED');
        process.exit(0);
      } else {
        console.log('❌ Loading logic integration verification FAILED');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('❌ Loading logic integration verification ERROR:', error);
      process.exit(1);
    });
}
