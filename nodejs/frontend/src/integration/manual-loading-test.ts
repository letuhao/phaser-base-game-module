/**
 * Manual Loading Test
 * 
 * Simple manual test to verify the asset loading logic integration.
 * This can be run to quickly check if the system is working correctly.
 */

import { AssetManager } from '../asset/classes/AssetManager';
import { SceneAssetConfigLoader } from '../asset/classes/SceneAssetConfigLoader';
import { levis2025R3WheelScene1AssetConfig } from '../runtime/games/levis-2025-r3-wheel/scene-1/levis-2025-r3-wheel-scene-1.asset.config';

async function runManualLoadingTest() {
  console.log('🚀 Starting Manual Loading Test...\n');

  try {
    // Step 1: Initialize Asset Manager
    console.log('1️⃣ Initializing Asset Manager...');
    const assetManager = new AssetManager('manual-test-asset-manager');
    console.log(`   ✅ Asset Manager created with ID: ${assetManager.managerId}\n`);

    // Step 2: Initialize Scene Asset Loader
    console.log('2️⃣ Initializing Scene Asset Loader...');
    const sceneAssetLoader = new SceneAssetConfigLoader(
      'manual-test-loader',
      levis2025R3WheelScene1AssetConfig.sceneId,
      assetManager,
      levis2025R3WheelScene1AssetConfig as any
    );
    console.log(`   ✅ Scene Asset Loader created with ID: ${sceneAssetLoader.getLoaderId()}\n`);

    // Step 3: Check Configuration
    console.log('3️⃣ Checking Configuration...');
    const config = sceneAssetLoader.getSceneAssetConfig();
    console.log(`   📊 Scene ID: ${config.sceneId}`);
    console.log(`   📦 Assets: ${config.assets.length}`);
    console.log(`   🗂️ Bundles: ${config.bundles.length}\n`);

    // Step 4: Validate Assets
    console.log('4️⃣ Validating Assets...');
    let validAssets = 0;
    for (const assetConfig of config.assets) {
      const isValid = assetManager.validateAssetConfig(assetConfig);
      if (isValid) validAssets++;
      console.log(`   ${isValid ? '✅' : '❌'} ${assetConfig.key} (${assetConfig.type})`);
    }
    console.log(`   📈 Valid Assets: ${validAssets}/${config.assets.length}\n`);

    // Step 5: Validate Bundles
    console.log('5️⃣ Validating Bundles...');
    let validBundles = 0;
    for (const bundleConfig of config.bundles) {
      const isValid = assetManager.validateBundleConfig(bundleConfig);
      if (isValid) validBundles++;
      console.log(`   ${isValid ? '✅' : '❌'} ${bundleConfig.bundleId} (${bundleConfig.bundleType}) - ${bundleConfig.assetKeys.length} assets`);
    }
    console.log(`   📈 Valid Bundles: ${validBundles}/${config.bundles.length}\n`);

    // Step 6: Test Asset Creation
    console.log('6️⃣ Testing Asset Creation...');
    let createdAssets = 0;
    for (const assetConfig of config.assets.slice(0, 3)) { // Test first 3 assets
      try {
        const asset = await assetManager.assetFactory.createAssetFromConfig(assetConfig);
        if (asset && asset.assetKey === assetConfig.key) {
          createdAssets++;
          console.log(`   ✅ Created: ${asset.assetKey}`);
        } else {
          console.log(`   ❌ Failed: ${assetConfig.key}`);
        }
      } catch (error) {
        console.log(`   ❌ Error: ${assetConfig.key} - ${error}`);
      }
    }
    console.log(`   📈 Created Assets: ${createdAssets}/3\n`);

    // Step 7: Test Bundle Creation
    console.log('7️⃣ Testing Bundle Creation...');
    let createdBundles = 0;
    for (const bundleConfig of config.bundles.slice(0, 2)) { // Test first 2 bundles
      try {
        const bundle = await assetManager.bundleFactory.createBundle(bundleConfig);
        if (bundle && bundle.bundleId === bundleConfig.bundleId) {
          createdBundles++;
          console.log(`   ✅ Created: ${bundle.bundleId}`);
        } else {
          console.log(`   ❌ Failed: ${bundleConfig.bundleId}`);
        }
      } catch (error) {
        console.log(`   ❌ Error: ${bundleConfig.bundleId} - ${error}`);
      }
    }
    console.log(`   📈 Created Bundles: ${createdBundles}/2\n`);

    // Step 8: Check Loading Progress
    console.log('8️⃣ Checking Loading Progress...');
    const progress = sceneAssetLoader.getLoadingProgress();
    console.log(`   📊 Total Assets: ${progress.totalAssets}`);
    console.log(`   📊 Loaded Assets: ${progress.loadedAssets}`);
    console.log(`   📊 Total Bundles: ${progress.totalBundles}`);
    console.log(`   📊 Loaded Bundles: ${progress.loadedBundles}`);
    console.log(`   📊 Progress: ${progress.percentage.toFixed(1)}%\n`);

    // Step 9: Check Manager Statistics
    console.log('9️⃣ Checking Manager Statistics...');
    const stats = assetManager.getManagerStatistics();
    console.log(`   📈 Total Assets: ${stats.totalAssets}`);
    console.log(`   📈 Loaded Assets: ${stats.loadedAssets}`);
    console.log(`   📈 Failed Assets: ${stats.failedAssets}`);
    console.log(`   📈 Total Bundles: ${stats.totalBundles}`);
    console.log(`   📈 Loaded Bundles: ${stats.loadedBundles}`);
    console.log(`   📈 Failed Bundles: ${stats.failedBundles}\n`);

    // Step 10: Check Loading State
    console.log('🔟 Checking Loading State...');
    console.log(`   📊 Loading State: ${sceneAssetLoader.getLoadingState()}`);
    console.log(`   📊 Current Phase: ${sceneAssetLoader.getCurrentPhase()}`);
    console.log(`   📊 Is Complete: ${sceneAssetLoader.isLoadingComplete()}\n`);

    // Summary
    console.log('📋 Test Summary:');
    console.log(`   ✅ Asset Manager: Working`);
    console.log(`   ✅ Scene Asset Loader: Working`);
    console.log(`   ✅ Configuration: ${config.assets.length} assets, ${config.bundles.length} bundles`);
    console.log(`   ✅ Asset Validation: ${validAssets}/${config.assets.length} valid`);
    console.log(`   ✅ Bundle Validation: ${validBundles}/${config.bundles.length} valid`);
    console.log(`   ✅ Asset Creation: ${createdAssets}/3 successful`);
    console.log(`   ✅ Bundle Creation: ${createdBundles}/2 successful`);
    
    const overallSuccess = validAssets === config.assets.length && 
                          validBundles === config.bundles.length && 
                          createdAssets > 0 && 
                          createdBundles > 0;
    
    console.log(`\n🎯 Overall Result: ${overallSuccess ? '✅ SUCCESS' : '❌ FAILED'}`);
    
    if (overallSuccess) {
      console.log('🎉 Loading logic integration is working correctly!');
    } else {
      console.log('⚠️ Some issues detected in the loading logic integration.');
    }

    // Cleanup
    assetManager.clearManager();
    console.log('\n🧹 Cleanup completed.');

  } catch (error) {
    console.error('❌ Manual Loading Test Failed:', error);
    process.exit(1);
  }
}

// Run the test
runManualLoadingTest();
