/**
 * Levis 2025 R3 Wheel Scene 1 Asset Configuration
 *
 * Pure configuration file for the new Asset System.
 * Contains only data definitions without implementation code.
 */

import { AssetType, AssetPriority } from '../../../../asset/interfaces/IAsset';
import { BundleType } from '../../../../asset/interfaces/IAssetBundle';
import { LoadingStrategy } from '../../../../asset/enums/AssetEnums';
import type { ISceneAssetConfigData } from '../../../../asset/interfaces';

/**
 * Scene 1 Asset Configuration for Levis 2025 R3 Wheel Game
 */
export const levis2025R3WheelScene1AssetConfig: ISceneAssetConfigData = {
  sceneId: 'levis-2025-r3-wheel-scene-1',
  basePath: '/public/assets/levis2025r3wheel',

  // Assets Configuration
  assets: [
    {
      key: 'levis2025r3wheel-desktop-bg',
      path: '/background/desktop_16x9.png',
      type: AssetType.IMAGE,
      priority: AssetPriority.CRITICAL,
      preload: true,
      cache: true,
      metadata: {
        responsive: 'desktop',
        aspectRatio: '16:9',
        category: 'background',
        description: 'Desktop background image for Levis 2025 R3 Wheel',
      },
    },
    {
      key: 'levis2025r3wheel-mobile-bg',
      path: '/background/mobile_16x9.png',
      type: AssetType.IMAGE,
      priority: AssetPriority.CRITICAL,
      preload: true,
      cache: true,
      metadata: {
        responsive: 'mobile',
        aspectRatio: '16:9',
        category: 'background',
        description: 'Mobile background image for Levis 2025 R3 Wheel',
      },
    },
    {
      key: 'levis2025r3wheel-mobile-origin-bg',
      path: '/background/mobile_origin.png',
      type: AssetType.IMAGE,
      priority: AssetPriority.LOW,
      preload: false, // Load on demand for mobile
      cache: true,
      metadata: {
        responsive: 'mobile',
        aspectRatio: 'original',
        category: 'background',
        loadOnDemand: true,
        description: 'Original mobile background image (load on demand)',
      },
    },
  ],

  // Bundles Configuration
  bundles: [
    {
      bundleId: 'background-bundle',
      bundleName: 'Background Assets Bundle',
      bundleType: BundleType.SCENE,
      priority: AssetPriority.CRITICAL,
      preload: true,
      cache: true,
      assetKeys: [
        'levis2025r3wheel-desktop-bg',
        'levis2025r3wheel-mobile-bg',
        'levis2025r3wheel-mobile-origin-bg',
      ],
      metadata: {
        category: 'background',
        responsive: true,
        description: 'Bundle containing all background assets for responsive loading',
      },
    },
  ],

  // Loading Configuration
  loading: {
    preload: true,
    priority: [
      AssetPriority.CRITICAL,
      AssetPriority.HIGH,
      AssetPriority.NORMAL,
      AssetPriority.LOW,
      AssetPriority.BACKGROUND,
    ],
    strategy: LoadingStrategy.PRIORITY_BASED,
  },

  // Validation Configuration
  validation: {
    required: ['levis2025r3wheel-desktop-bg', 'levis2025r3wheel-mobile-bg'],
    optional: ['levis2025r3wheel-mobile-origin-bg'],
    fallbacks: {
      'levis2025r3wheel-desktop-bg': 'levis2025r3wheel-mobile-bg',
      'levis2025r3wheel-mobile-bg': 'levis2025r3wheel-desktop-bg',
    },
  },

  // Responsive Configuration
  responsive: {
    breakpoints: {
      desktop: {
        assets: ['levis2025r3wheel-desktop-bg'],
        bundles: ['background-bundle'],
      },
      mobile: {
        assets: ['levis2025r3wheel-mobile-bg', 'levis2025r3wheel-mobile-origin-bg'],
        bundles: ['background-bundle'],
      },
      tablet: {
        assets: ['levis2025r3wheel-desktop-bg'],
        bundles: ['background-bundle'],
      },
    },
    defaultBreakpoint: 'desktop',
  },

  // Scene Metadata
  metadata: {
    gameTitle: 'Levis 2025 R3 Wheel',
    sceneName: 'Scene 1',
    version: '1.0.0',
    createdDate: new Date().toISOString(),
    lastModified: new Date().toISOString(),
    description: 'Main scene for Levis 2025 R3 Wheel game with responsive background support',
    tags: ['levis', 'r3-wheel', 'scene-1', 'responsive', 'background'],
    estimatedLoadTime: 3000, // 3 seconds
    responsiveSupport: true,
    preloadStrategy: 'critical-first',
    author: 'Game Development Team',
    license: 'Proprietary',
  },
};

/**
 * Export the configuration
 */
export default levis2025R3WheelScene1AssetConfig;
