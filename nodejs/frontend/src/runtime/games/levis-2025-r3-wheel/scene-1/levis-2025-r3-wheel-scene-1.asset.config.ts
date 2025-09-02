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
    // Background Images
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

    // Wheel Textures
    {
      key: 'fortune-wheel-base',
      path: '/wheel/fortune_wheel_base.png',
      type: AssetType.IMAGE,
      priority: AssetPriority.CRITICAL,
      preload: true,
      cache: true,
      metadata: {
        category: 'wheel',
        description: 'Base wheel texture with segments',
        dimensions: { width: 800, height: 800 },
        centerPoint: { x: 400, y: 400 },
      },
    },
    {
      key: 'fortune-wheel-pointer',
      path: '/wheel/wheel_pointer.png',
      type: AssetType.IMAGE,
      priority: AssetPriority.CRITICAL,
      preload: true,
      cache: true,
      metadata: {
        category: 'wheel',
        description: 'Wheel pointer/arrow indicator',
        dimensions: { width: 100, height: 150 },
        anchorPoint: { x: 0.5, y: 0.9 },
      },
    },
    {
      key: 'fortune-wheel-center',
      path: '/wheel/wheel_center.png',
      type: AssetType.IMAGE,
      priority: AssetPriority.HIGH,
      preload: true,
      cache: true,
      metadata: {
        category: 'wheel',
        description: 'Center hub of the fortune wheel',
        dimensions: { width: 120, height: 120 },
        centerPoint: { x: 60, y: 60 },
      },
    },
    {
      key: 'fortune-wheel-glow',
      path: '/wheel/wheel_glow_effect.png',
      type: AssetType.IMAGE,
      priority: AssetPriority.NORMAL,
      preload: true,
      cache: true,
      metadata: {
        category: 'wheel',
        description: 'Glow effect for wheel when spinning',
        dimensions: { width: 900, height: 900 },
        blendMode: 'add',
      },
    },

    // UI Elements
    {
      key: 'spin-button',
      path: '/ui/spin_button.png',
      type: AssetType.IMAGE,
      priority: AssetPriority.HIGH,
      preload: true,
      cache: true,
      metadata: {
        category: 'ui',
        description: 'Main spin button',
        states: ['normal', 'hover', 'pressed', 'disabled'],
      },
    },
    {
      key: 'prize-popup-bg',
      path: '/ui/prize_popup_background.png',
      type: AssetType.IMAGE,
      priority: AssetPriority.HIGH,
      preload: true,
      cache: true,
      metadata: {
        category: 'ui',
        description: 'Background for prize popup modal',
        dimensions: { width: 400, height: 300 },
      },
    },
    {
      key: 'close-button',
      path: '/ui/close_button.png',
      type: AssetType.IMAGE,
      priority: AssetPriority.NORMAL,
      preload: true,
      cache: true,
      metadata: {
        category: 'ui',
        description: 'Close button for popups',
        states: ['normal', 'hover'],
      },
    },

    // Sound Effects
    {
      key: 'wheel-spin-sfx',
      path: '/audio/wheel_spin.mp3',
      type: AssetType.AUDIO,
      priority: AssetPriority.HIGH,
      preload: true,
      cache: true,
      metadata: {
        category: 'audio',
        description: 'Wheel spinning sound effect',
        duration: 3.5,
        loop: true,
        volume: 0.7,
        audioType: 'sfx',
      },
    },
    {
      key: 'wheel-tick-sfx',
      path: '/audio/wheel_tick.mp3',
      type: AssetType.AUDIO,
      priority: AssetPriority.HIGH,
      preload: true,
      cache: true,
      metadata: {
        category: 'audio',
        description: 'Tick sound when pointer hits wheel segments',
        duration: 0.1,
        loop: false,
        volume: 0.5,
        audioType: 'sfx',
        triggerEvent: 'segment-hit',
      },
    },
    {
      key: 'wheel-stop-sfx',
      path: '/audio/wheel_stop.mp3',
      type: AssetType.AUDIO,
      priority: AssetPriority.HIGH,
      preload: true,
      cache: true,
      metadata: {
        category: 'audio',
        description: 'Sound when wheel stops spinning',
        duration: 0.8,
        loop: false,
        volume: 0.6,
        audioType: 'sfx',
        triggerEvent: 'wheel-stop',
      },
    },
    {
      key: 'prize-popup-sfx',
      path: '/audio/prize_popup.mp3',
      type: AssetType.AUDIO,
      priority: AssetPriority.HIGH,
      preload: true,
      cache: true,
      metadata: {
        category: 'audio',
        description: 'Sound when prize popup appears',
        duration: 1.2,
        loop: false,
        volume: 0.8,
        audioType: 'sfx',
        triggerEvent: 'prize-popup',
      },
    },
    {
      key: 'big-win-sfx',
      path: '/audio/big_win.mp3',
      type: AssetType.AUDIO,
      priority: AssetPriority.HIGH,
      preload: true,
      cache: true,
      metadata: {
        category: 'audio',
        description: 'Sound for big prize wins',
        duration: 2.5,
        loop: false,
        volume: 0.9,
        audioType: 'sfx',
        triggerEvent: 'big-win',
        prizeThreshold: 1000,
      },
    },
    {
      key: 'small-win-sfx',
      path: '/audio/small_win.mp3',
      type: AssetType.AUDIO,
      priority: AssetPriority.HIGH,
      preload: true,
      cache: true,
      metadata: {
        category: 'audio',
        description: 'Sound for small prize wins',
        duration: 1.0,
        loop: false,
        volume: 0.7,
        audioType: 'sfx',
        triggerEvent: 'small-win',
        prizeThreshold: 100,
      },
    },
    {
      key: 'button-click-sfx',
      path: '/audio/button_click.mp3',
      type: AssetType.AUDIO,
      priority: AssetPriority.NORMAL,
      preload: true,
      cache: true,
      metadata: {
        category: 'audio',
        description: 'Button click sound effect',
        duration: 0.3,
        loop: false,
        volume: 0.6,
        audioType: 'sfx',
        triggerEvent: 'button-click',
      },
    },
    {
      key: 'button-hover-sfx',
      path: '/audio/button_hover.mp3',
      type: AssetType.AUDIO,
      priority: AssetPriority.LOW,
      preload: false,
      cache: true,
      metadata: {
        category: 'audio',
        description: 'Button hover sound effect',
        duration: 0.2,
        loop: false,
        volume: 0.4,
        audioType: 'sfx',
        triggerEvent: 'button-hover',
        loadOnDemand: true,
      },
    },

    // Background Music
    {
      key: 'background-music',
      path: '/audio/background_music.mp3',
      type: AssetType.AUDIO,
      priority: AssetPriority.LOW,
      preload: false,
      cache: true,
      metadata: {
        category: 'audio',
        description: 'Background music for the game',
        duration: 120,
        loop: true,
        volume: 0.3,
        audioType: 'music',
        loadOnDemand: true,
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
    {
      bundleId: 'wheel-bundle',
      bundleName: 'Wheel Assets Bundle',
      bundleType: BundleType.SCENE,
      priority: AssetPriority.CRITICAL,
      preload: true,
      cache: true,
      assetKeys: [
        'fortune-wheel-base',
        'fortune-wheel-pointer',
        'fortune-wheel-center',
        'fortune-wheel-glow',
      ],
      metadata: {
        category: 'wheel',
        description: 'Bundle containing all wheel-related visual assets',
      },
    },
    {
      bundleId: 'ui-bundle',
      bundleName: 'UI Assets Bundle',
      bundleType: BundleType.SCENE,
      priority: AssetPriority.HIGH,
      preload: true,
      cache: true,
      assetKeys: ['spin-button', 'prize-popup-bg', 'close-button'],
      metadata: {
        category: 'ui',
        description: 'Bundle containing all UI elements',
      },
    },
    {
      bundleId: 'audio-sfx-bundle',
      bundleName: 'Sound Effects Bundle',
      bundleType: BundleType.SCENE,
      priority: AssetPriority.HIGH,
      preload: true,
      cache: true,
      assetKeys: [
        'wheel-spin-sfx',
        'wheel-tick-sfx',
        'wheel-stop-sfx',
        'prize-popup-sfx',
        'big-win-sfx',
        'small-win-sfx',
        'button-click-sfx',
        'button-hover-sfx',
      ],
      metadata: {
        category: 'audio',
        audioType: 'sfx',
        description: 'Bundle containing all sound effects',
      },
    },
    {
      bundleId: 'audio-music-bundle',
      bundleName: 'Background Music Bundle',
      bundleType: BundleType.SCENE,
      priority: AssetPriority.LOW,
      preload: false,
      cache: true,
      assetKeys: ['background-music'],
      metadata: {
        category: 'audio',
        audioType: 'music',
        description: 'Bundle containing background music (load on demand)',
        loadOnDemand: true,
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
    required: [
      'levis2025r3wheel-desktop-bg',
      'levis2025r3wheel-mobile-bg',
      'fortune-wheel-base',
      'fortune-wheel-pointer',
      'fortune-wheel-center',
      'spin-button',
      'wheel-spin-sfx',
      'wheel-tick-sfx',
      'wheel-stop-sfx',
    ],
    optional: [
      'levis2025r3wheel-mobile-origin-bg',
      'fortune-wheel-glow',
      'prize-popup-bg',
      'close-button',
      'prize-popup-sfx',
      'big-win-sfx',
      'small-win-sfx',
      'button-click-sfx',
      'button-hover-sfx',
      'background-music',
    ],
    fallbacks: {
      'levis2025r3wheel-desktop-bg': 'levis2025r3wheel-mobile-bg',
      'levis2025r3wheel-mobile-bg': 'levis2025r3wheel-desktop-bg',
      'fortune-wheel-glow': 'fortune-wheel-base',
      'prize-popup-bg': 'spin-button',
      'big-win-sfx': 'small-win-sfx',
      'small-win-sfx': 'prize-popup-sfx',
      'button-hover-sfx': 'button-click-sfx',
    },
  },

  // Responsive Configuration
  responsive: {
    breakpoints: {
      desktop: {
        assets: [
          'levis2025r3wheel-desktop-bg',
          'fortune-wheel-base',
          'fortune-wheel-pointer',
          'fortune-wheel-center',
          'fortune-wheel-glow',
          'spin-button',
          'prize-popup-bg',
          'close-button',
        ],
        bundles: ['background-bundle', 'wheel-bundle', 'ui-bundle', 'audio-sfx-bundle'],
      },
      mobile: {
        assets: [
          'levis2025r3wheel-mobile-bg',
          'levis2025r3wheel-mobile-origin-bg',
          'fortune-wheel-base',
          'fortune-wheel-pointer',
          'fortune-wheel-center',
          'fortune-wheel-glow',
          'spin-button',
          'prize-popup-bg',
          'close-button',
        ],
        bundles: ['background-bundle', 'wheel-bundle', 'ui-bundle', 'audio-sfx-bundle'],
      },
      tablet: {
        assets: [
          'levis2025r3wheel-desktop-bg',
          'fortune-wheel-base',
          'fortune-wheel-pointer',
          'fortune-wheel-center',
          'fortune-wheel-glow',
          'spin-button',
          'prize-popup-bg',
          'close-button',
        ],
        bundles: ['background-bundle', 'wheel-bundle', 'ui-bundle', 'audio-sfx-bundle'],
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
    description:
      'Complete fortune wheel game scene with wheel textures, sound effects, and UI elements',
    tags: [
      'levis',
      'r3-wheel',
      'scene-1',
      'responsive',
      'background',
      'wheel',
      'audio',
      'ui',
      'fortune-wheel',
      'sound-effects',
    ],
    estimatedLoadTime: 5000, // 5 seconds (increased due to more assets)
    responsiveSupport: true,
    preloadStrategy: 'critical-first',
    author: 'Game Development Team',
    license: 'Proprietary',
    assetCount: {
      total: 20,
      images: 11,
      audio: 9,
      bundles: 5,
    },
    features: [
      'Responsive background loading',
      'Wheel texture management',
      'Sound effect system',
      'UI element management',
      'Priority-based loading',
      'Fallback system',
      'Bundle optimization',
    ],
  },
};

/**
 * Export the configuration
 */
export default levis2025R3WheelScene1AssetConfig;
