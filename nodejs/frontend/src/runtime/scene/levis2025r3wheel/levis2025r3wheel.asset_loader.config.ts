// Simplified asset loader configuration for levis2025r3wheel scene
// This focuses on the essential asset loading without complex interface requirements

export interface Levis2025R3WheelAsset {
  key: string
  path: string
  type: 'image' | 'audio' | 'sprite' | 'font'
  preload: boolean
  responsive: {
    breakpoint: 'desktop' | 'mobile'
    minWidth?: number
    maxWidth?: number
    maintainAspectRatio: boolean
    scaleStrategy: 'fit' | 'stretch'
  }
}

export interface Levis2025R3WheelAssetLoaderConfig {
  basePath: string
  backgrounds: {
    desktop: Levis2025R3WheelAsset
    mobile: Levis2025R3WheelAsset
    mobileOrigin: Levis2025R3WheelAsset
  }
  loading: {
    preload: boolean
    priority: string[]
  }
  validation: {
    required: string[]
    optional: string[]
    fallbacks: Record<string, string>
  }
}

export const levis2025r3wheelAssetLoaderConfig: Levis2025R3WheelAssetLoaderConfig = {
  basePath: '/public/assets/levis2025r3wheel',
  
  // Background images
  backgrounds: {
    desktop: {
      key: 'levis2025r3wheel-desktop-bg',
      path: '/background/desktop_16x9.png',
      type: 'image',
      preload: true,
      responsive: {
        breakpoint: 'desktop',
        minWidth: 1024,
        maintainAspectRatio: true,
        scaleStrategy: 'fit'
      }
    },
    mobile: {
      key: 'levis2025r3wheel-mobile-bg',
      path: '/background/mobile_16x9.png',
      type: 'image',
      preload: true,
      responsive: {
        breakpoint: 'mobile',
        maxWidth: 1023,
        maintainAspectRatio: false,
        scaleStrategy: 'stretch'
      }
    },
    mobileOrigin: {
      key: 'levis2025r3wheel-mobile-origin-bg',
      path: '/background/mobile_origin.png',
      type: 'image',
      preload: false, // Load on demand for mobile
      responsive: {
        breakpoint: 'mobile',
        maxWidth: 1023,
        maintainAspectRatio: false,
        scaleStrategy: 'stretch'
      }
    }
  },
  
  // Loading configuration
  loading: {
    preload: true,
    priority: ['backgrounds', 'ui', 'audio', 'sprites']
  },
  
  // Asset validation
  validation: {
    required: ['levis2025r3wheel-desktop-bg', 'levis2025r3wheel-mobile-bg'],
    optional: ['levis2025r3wheel-mobile-origin-bg'],
    fallbacks: {
      'levis2025r3wheel-desktop-bg': 'levis2025r3wheel-mobile-bg',
      'levis2025r3wheel-mobile-bg': 'levis2025r3wheel-desktop-bg'
    }
  }
}

// Helper function to get background asset based on device type
export const getBackgroundAsset = (isDesktop: boolean): string => {
  if (isDesktop) {
    return levis2025r3wheelAssetLoaderConfig.backgrounds.desktop.key
  } else {
    return levis2025r3wheelAssetLoaderConfig.backgrounds.mobile.key
  }
}

// Helper function to get asset path by key
export const getAssetPath = (key: string): string | undefined => {
  // Check backgrounds
  for (const bgKey in levis2025r3wheelAssetLoaderConfig.backgrounds) {
    const bg = levis2025r3wheelAssetLoaderConfig.backgrounds[bgKey as keyof typeof levis2025r3wheelAssetLoaderConfig.backgrounds]
    if (bg.key === key) {
      return levis2025r3wheelAssetLoaderConfig.basePath + bg.path
    }
  }
  
  // Check other asset types (to be implemented)
  return undefined
}

// Helper function to get responsive asset config
export const getResponsiveAssetConfig = (breakpoint: 'desktop' | 'mobile') => {
  const backgrounds = levis2025r3wheelAssetLoaderConfig.backgrounds
  if (breakpoint === 'desktop') {
    return backgrounds.desktop.responsive
  } else {
    return backgrounds.mobile.responsive
  }
}

// Helper function to check if asset is required
export const isAssetRequired = (key: string): boolean => {
  return levis2025r3wheelAssetLoaderConfig.validation.required.includes(key)
}

// Helper function to get asset fallback
export const getAssetFallback = (key: string): string | undefined => {
  return levis2025r3wheelAssetLoaderConfig.validation.fallbacks[key]
}
