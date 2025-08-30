// Simplified responsive configuration for levis2025r3wheel scene
// This focuses on the essential responsive behavior without complex interface requirements

export interface Levis2025R3WheelResponsiveConfig {
  // Basic responsive settings
  breakpoints: {
    desktop: number
    mobile: number
  }
  
  // Responsive behavior
  desktop: {
    maintainAspectRatio: boolean
    scaleStrategy: 'fit' | 'stretch'
    alignment: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  }
  
  mobile: {
    maintainAspectRatio: boolean
    scaleStrategy: 'fit' | 'stretch'
    alignment: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  }
  
  // Device detection
  deviceDetection: {
    enable: boolean
    breakpoint: 'desktop' | 'mobile'
  }
}

export const levis2025r3wheelResponsiveConfig: Levis2025R3WheelResponsiveConfig = {
  breakpoints: {
    desktop: 1025, // Temporarily raised to test mobile behavior with current game resolution
    mobile: 1024
  },
  
  desktop: {
    maintainAspectRatio: true,
    scaleStrategy: 'fit',
    alignment: 'center'
  },
  
  mobile: {
    maintainAspectRatio: false,
    scaleStrategy: 'stretch',
    alignment: 'center'
  },
  
  deviceDetection: {
    enable: true,
    breakpoint: 'desktop'
  }
}

// Helper functions for responsive behavior
export const isDesktop = (width: number): boolean => {
  return width >= levis2025r3wheelResponsiveConfig.breakpoints.desktop
}

export const isMobile = (width: number): boolean => {
  return width <= levis2025r3wheelResponsiveConfig.breakpoints.mobile
}

export const getResponsiveBehavior = (width: number) => {
  if (isDesktop(width)) {
    return levis2025r3wheelResponsiveConfig.desktop
  } else {
    return levis2025r3wheelResponsiveConfig.mobile
  }
}

export const shouldMaintainAspectRatio = (width: number): boolean => {
  return getResponsiveBehavior(width).maintainAspectRatio
}

export const getScaleStrategy = (width: number): 'fit' | 'stretch' => {
  return getResponsiveBehavior(width).scaleStrategy
}
