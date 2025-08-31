// Flexible responsive configuration for levis2025r3wheel scene
// Clean structure: breakpoints contain arrays of object-specific layouts

import type { ResponsiveConfig } from '../../../core/ResponsiveConfigLoader'

export const levis2025r3wheelResponsiveConfig: ResponsiveConfig = {
  // Default breakpoint that loads first (highest priority)
  default: [
    {
      id: 'test-root-container',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        maintainAspectRatio: false,
        scaleStrategy: 'stretch',
        alignment: 'center',
        positionX: 0,
        positionY: 0,
        width: 'auto',
        height: 'auto',
        zOrder: 0,
        backgroundColor: '#000000',
        interactive: false
      }
    },
    {
      id: 'background-container',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        maintainAspectRatio: false,
        scaleStrategy: 'stretch',
        alignment: 'center',
        positionX: 0,
        positionY: 0,
        width: 'auto',
        height: 'auto',
        zOrder: -100,
        backgroundColor: '#ffffff',
        backgroundImage: 'levis2025r3wheel-desktop-bg'
      }
    },
    {
      id: 'footer-container',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        maintainAspectRatio: false,
        scaleStrategy: 'stretch',
        alignment: 'bottom-left',
        positionX: 0,
        positionY: 'bottom',
        width: 'auto',
        height: 80,
        zOrder: 30,
        backgroundColor: '#ffffff',
        interactive: false
      }
    },
    {
      id: 'footer-rectangle',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        maintainAspectRatio: false,
        scaleStrategy: 'stretch',
        alignment: 'bottom-left',
        positionX: 0,
        positionY: 0,
        width: 'auto',
        height: 'auto',
        zOrder: 40,
        backgroundColor: '#ffffff',
        interactive: false
      }
    }
  ],
  responsiveSettings: {
    xs: [
      {
        id: 'background-container',
        breakpointCondition: { minWidth: 0, maxWidth: 575 },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'center',
          backgroundImage: 'levis2025r3wheel-mobile-bg'
        }
      },
      {
        id: 'footer-container',
        breakpointCondition: { minWidth: 0, maxWidth: 575 },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'bottom-left',
          height: 60,
          padding: 10
        }
      },
      {
        id: 'footer-rectangle',
        breakpointCondition: { minWidth: 0, maxWidth: 575 },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'bottom-left',
          height: 60,
          padding: 10
        }
      }
    ],
    
    sm: [
      {
        id: 'background-container',
        breakpointCondition: { minWidth: 576, maxWidth: 767 },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'center',
          backgroundImage: 'levis2025r3wheel-mobile-bg'
        }
      },
      {
        id: 'footer-container',
        breakpointCondition: { minWidth: 576, maxWidth: 767 },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'bottom-left',
          height: 65,
          padding: 12
        }
      },
      {
        id: 'footer-rectangle',
        breakpointCondition: { minWidth: 576, maxWidth: 767 },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'bottom-left',
          height: 65,
          padding: 12
        }
      }
    ],
    
    md: [
      {
        id: 'background-container',
        breakpointCondition: { minWidth: 768, maxWidth: 991 },
        layoutProperties: {
          maintainAspectRatio: true,
          scaleStrategy: 'fit',
          alignment: 'center',
          backgroundImage: 'levis2025r3wheel-mobile-bg'
        }
      },
      {
        id: 'footer-container',
        breakpointCondition: { minWidth: 768, maxWidth: 991 },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'bottom-left',
          height: 70,
          padding: 15
        }
      },
      {
        id: 'footer-rectangle',
        breakpointCondition: { minWidth: 768, maxWidth: 991 },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'bottom-left',
          height: 70,
          padding: 15
        }
      }
    ],
    
    lg: [
      {
        id: 'background-container',
        breakpointCondition: { minWidth: 992, maxWidth: 1199 },
        layoutProperties: {
          maintainAspectRatio: true,
          scaleStrategy: 'fit',
          alignment: 'center',
          backgroundImage: 'levis2025r3wheel-desktop-bg'
        }
      },
      {
        id: 'footer-container',
        breakpointCondition: { minWidth: 992, maxWidth: 1199 },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'bottom-left',
          height: 80,
          padding: 20
        }
      },
      {
        id: 'footer-rectangle',
        breakpointCondition: { minWidth: 992, maxWidth: 1199 },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'bottom-left',
          height: 80,
          padding: 20
        }
      }
    ],
    
    xl: [
      {
        id: 'background-container',
        breakpointCondition: { minWidth: 1200, maxWidth: undefined },
        layoutProperties: {
          maintainAspectRatio: true,
          scaleStrategy: 'fit',
          alignment: 'center',
          backgroundImage: 'levis2025r3wheel-desktop-bg'
        }
      },
      {
        id: 'footer-container',
        breakpointCondition: { minWidth: 1200, maxWidth: undefined },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'bottom-left',
          height: 80,
          padding: 20
        }
      },
      {
        id: 'footer-rectangle',
        breakpointCondition: { minWidth: 1200, maxWidth: undefined },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'bottom-left',
          height: 80,
          padding: 20
        }
      }
    ]
  }
}

// Helper functions for responsive behavior

/**
 * Get the layout properties for a specific object at a given width
 */
export const getObjectLayout = (width: number, objectId: string): any | null => {
  // Check default first (highest priority)
  const defaultLayout = levis2025r3wheelResponsiveConfig.default?.find(
    layout => layout.id === objectId
  )
  if (defaultLayout) {
    return defaultLayout.layoutProperties
  }
  
  const breakpoints = Object.keys(levis2025r3wheelResponsiveConfig.responsiveSettings)
  
  // Find the matching breakpoint
  for (const breakpointKey of breakpoints) {
    const breakpoint = levis2025r3wheelResponsiveConfig.responsiveSettings[breakpointKey]
    
    // Check if this breakpoint matches the width
    const isWidthMatch = breakpoint.some(layout => 
      width >= layout.breakpointCondition.minWidth && 
      (layout.breakpointCondition.maxWidth === undefined || width <= layout.breakpointCondition.maxWidth)
    )
    
    if (isWidthMatch) {
      // Find the object layout in this breakpoint
      const objectLayout = breakpoint.find(layout => layout.id === objectId)
      if (objectLayout) {
        return objectLayout.layoutProperties
      }
    }
  }
  
  return null
}

/**
 * Get the breakpoint key for a given width
 */
export const getBreakpointKey = (width: number): string => {
  const breakpoints = levis2025r3wheelResponsiveConfig.responsiveSettings
  
  for (const [key, layouts] of Object.entries(breakpoints)) {
    const isMatch = layouts.some(layout => 
      width >= layout.breakpointCondition.minWidth && 
      (layout.breakpointCondition.maxWidth === undefined || width <= layout.breakpointCondition.maxWidth)
    )
    
    if (isMatch) {
      return key
    }
  }
  
  return 'lg' // Default fallback
}

/**
 * Get the background image key for a specific object and window width
 */
export const getBackgroundImageKey = (width: number, objectId: string): string | undefined => {
  const layout = getObjectLayout(width, objectId)
  return layout?.backgroundImage
}

/**
 * Get custom properties for a specific object and window width
 */
export const getCustomProperties = (width: number, objectId: string): Record<string, any> => {
  const layout = getObjectLayout(width, objectId)
  if (!layout) return {}
  
  // Extract custom properties (everything except the standard ones)
  const { maintainAspectRatio, scaleStrategy, alignment, backgroundImage, ...customProps } = layout
  return customProps
}

/**
 * Check if current width matches a specific breakpoint
 */
export const isBreakpoint = (width: number, breakpointKey: string): boolean => {
  return getBreakpointKey(width) === breakpointKey
}

/**
 * Get specific responsive behavior properties for an object
 */
export const shouldMaintainAspectRatio = (width: number, objectId: string): boolean => {
  const layout = getObjectLayout(width, objectId)
  return layout?.maintainAspectRatio ?? true
}

export const getScaleStrategy = (width: number, objectId: string): 'fit' | 'stretch' | 'fill' => {
  const layout = getObjectLayout(width, objectId)
  return layout?.scaleStrategy ?? 'fit'
}

export const getAlignment = (width: number, objectId: string): any => {
  const layout = getObjectLayout(width, objectId)
  return layout?.alignment ?? 'center'
}

/**
 * Get all available breakpoint keys
 */
export const getBreakpointKeys = (): string[] => {
  return Object.keys(levis2025r3wheelResponsiveConfig.responsiveSettings)
}

/**
 * Get breakpoint information for debugging
 */
export const getBreakpointInfo = (width: number, objectId?: string) => {
  const currentKey = getBreakpointKey(width)
  const currentLayout = objectId ? getObjectLayout(width, objectId) : null
  const customProperties = objectId ? getCustomProperties(width, objectId) : {}
  
  return {
    currentBreakpoint: currentKey,
    currentLayout,
    customProperties,
    objectId: objectId || 'none',
    defaultBreakpoint: levis2025r3wheelResponsiveConfig.default,
    allBreakpoints: levis2025r3wheelResponsiveConfig.responsiveSettings,
    windowWidth: width
  }
}

/**
 * Get all available object IDs that have responsive configs
 */
export const getObjectIds = (): string[] => {
  const allIds = new Set<string>()
  
  // Add default breakpoint IDs
  levis2025r3wheelResponsiveConfig.default?.forEach(layout => {
    allIds.add(layout.id)
  })
  
  // Add responsive breakpoint IDs
  Object.values(levis2025r3wheelResponsiveConfig.responsiveSettings).forEach(breakpoint => {
    breakpoint.forEach(layout => {
      allIds.add(layout.id)
    })
  })
  
  return Array.from(allIds)
}

/**
 * Check if an object has responsive configuration
 */
export const hasObjectResponsiveConfig = (objectId: string): boolean => {
  return getObjectIds().includes(objectId)
}

/**
 * Legacy compatibility functions (keeping for backward compatibility)
 */
export const isDesktop = (width: number): boolean => {
  return width >= 992 // lg breakpoint and above
}

export const isMobile = (width: number): boolean => {
  return width < 768 // below md breakpoint
}
