// Flexible responsive configuration for levis2025r3wheel scene
// Clean structure: breakpoints contain arrays of object-specific layouts

import type { ResponsiveConfig } from '../../../core/ResponsiveConfigLoader'

export const levis2025r3wheelResponsiveConfig: ResponsiveConfig = {
  // Default breakpoint that loads first (highest priority)
  default: [
    {
      id: 'root-container',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        maintainAspectRatio: false,
        scaleStrategy: 'stretch',
        alignment: 'center',
        positionX: 0,
        positionY: 0,
        width: 'fill',
        height: 'fill',
        zOrder: 0,
        backgroundColor: '#1a1a2e',
        interactive: false,
        classes: ['container-autumn', 'root-container']
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
        backgroundImage: 'levis2025r3wheel-desktop-bg',
        classes: ['background-autumn']
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
        interactive: false,
        classes: ['footer-autumn']
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
        interactive: false,
        classes: ['footer-autumn']
      }
    }
  ],
  responsiveSettings: {
    xs: [
      {
        id: 'root-container',
        breakpointCondition: { minWidth: 0, maxWidth: 575 },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'center',
          positionX: 0,
          positionY: 0,
          width: 'fill',
          height: 'fill',
          zOrder: 0,
          backgroundColor: '#2a2a3e',
          interactive: false,
          classes: ['container-autumn', 'root-container', 'mobile-root']
        }
      },
      {
        id: 'background-container',
        breakpointCondition: { minWidth: 0, maxWidth: 575 },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'center',
          backgroundImage: 'levis2025r3wheel-mobile-bg',
          classes: ['background-autumn', 'mobile-background']
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
          padding: 10,
          classes: ['footer-autumn', 'mobile-footer']
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
          padding: 10,
          classes: ['footer-autumn', 'mobile-footer']
        }
      }
    ],
    
    sm: [
      {
        id: 'root-container',
        breakpointCondition: { minWidth: 576, maxWidth: 767 },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'center',
          positionX: 0,
          positionY: 0,
          width: 'fill',
          height: 'fill',
          zOrder: 0,
          backgroundColor: '#3a3a4e',
          interactive: false,
          classes: ['container-autumn', 'root-container', 'small-root']
        }
      },
      {
        id: 'background-container',
        breakpointCondition: { minWidth: 576, maxWidth: 767 },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'center',
          backgroundImage: 'levis2025r3wheel-mobile-bg',
          classes: ['background-autumn', 'mobile-background']
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
          padding: 12,
          classes: ['footer-autumn', 'mobile-footer']
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
          padding: 12,
          classes: ['footer-autumn', 'mobile-footer']
        }
      }
    ],
    
    md: [
      {
        id: 'root-container',
        breakpointCondition: { minWidth: 768, maxWidth: 991 },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'center',
          positionX: 0,
          positionY: 0,
          width: 'fill',
          height: 'fill',
          zOrder: 0,
          backgroundColor: '#4a4a5e',
          interactive: false,
          classes: ['container-autumn', 'root-container', 'tablet-root']
        }
      },
      {
        id: 'background-container',
        breakpointCondition: { minWidth: 768, maxWidth: 991 },
        layoutProperties: {
          maintainAspectRatio: true,
          scaleStrategy: 'fit',
          alignment: 'center',
          backgroundImage: 'levis2025r3wheel-mobile-bg',
          classes: ['background-autumn', 'tablet-background']
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
          padding: 15,
          classes: ['footer-autumn', 'tablet-footer']
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
          padding: 15,
          classes: ['footer-autumn', 'tablet-footer']
        }
      }
    ],
    
    lg: [
      {
        id: 'root-container',
        breakpointCondition: { minWidth: 992, maxWidth: 1199 },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'center',
          positionX: 0,
          positionY: 0,
          width: 'fill',
          height: 'fill',
          zOrder: 0,
          backgroundColor: '#5a5a6e',
          interactive: false,
          classes: ['container-autumn', 'root-container', 'large-root']
        }
      },
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
        id: 'root-container',
        breakpointCondition: { minWidth: 1200, maxWidth: undefined },
        layoutProperties: {
          maintainAspectRatio: false,
          scaleStrategy: 'stretch',
          alignment: 'center',
          positionX: 0,
          positionY: 0,
          width: 'fill',
          height: 'fill',
          zOrder: 0,
          backgroundColor: '#6a6a7e',
          interactive: false,
          classes: ['container-autumn', 'root-container', 'xl-root']
        }
      },
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


