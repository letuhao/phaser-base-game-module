// Simplified asset loader configuration for levis2025r3wheel scene
// This focuses on the essential asset loading without complex interface requirements

import { AssetType, AssetConfig, AssetLoaderConfig } from '../../../core/AssetLoaderConfigLoader';

export const levis2025r3wheelAssetLoaderConfig: AssetLoaderConfig = {
  basePath: '/public/assets/levis2025r3wheel',

  // Background images
  backgrounds: {
    desktop: {
      key: 'levis2025r3wheel-desktop-bg',
      path: '/background/desktop_16x9.png',
      type: AssetType.IMAGE,
      preload: true,
    } as AssetConfig,
    mobile: {
      key: 'levis2025r3wheel-mobile-bg',
      path: '/background/mobile_16x9.png',
      type: AssetType.IMAGE,
      preload: true,
    } as AssetConfig,
    mobileOrigin: {
      key: 'levis2025r3wheel-mobile-origin-bg',
      path: '/background/mobile_origin.png',
      type: AssetType.IMAGE,
      preload: false, // Load on demand for mobile
    } as AssetConfig,
  },

  // Loading configuration
  loading: {
    preload: true,
    priority: ['backgrounds', 'ui', 'audio', 'sprites'],
  },

  // Asset validation
  validation: {
    required: ['levis2025r3wheel-desktop-bg', 'levis2025r3wheel-mobile-bg'],
    optional: ['levis2025r3wheel-mobile-origin-bg'],
    fallbacks: {
      'levis2025r3wheel-desktop-bg': 'levis2025r3wheel-mobile-bg',
      'levis2025r3wheel-mobile-bg': 'levis2025r3wheel-desktop-bg',
    },
  },
};
