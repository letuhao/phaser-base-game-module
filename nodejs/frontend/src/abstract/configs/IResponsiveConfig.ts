import type { ILayoutConfig } from './ILayoutConfig'

/**
 * Responsive configuration interface for adaptive game object behavior
 * Extends ILayoutConfig to provide responsive design capabilities
 * Inspired by CSS Media Queries, Bootstrap, and modern responsive design patterns
 */
export interface IResponsiveConfig extends ILayoutConfig {
  /** Responsive breakpoints configuration */
  readonly breakpoints: {
    /** Extra small devices (phones, 320px and up) */
    xs: number
    /** Small devices (landscape phones, 576px and up) */
    sm: number
    /** Medium devices (tablets, 768px and up) */
    md: number
    /** Large devices (desktops, 992px and up) */
    lg: number
    /** Extra large devices (large desktops, 1200px and up) */
    xl: number
    /** Extra extra large devices (larger desktops, 1400px and up) */
    xxl: number
    /** Custom breakpoints */
    custom: { [key: string]: number }
  }
  
  /** Current active breakpoint */
  readonly currentBreakpoint: string
  
  /** Responsive behavior configuration */
  readonly responsiveBehavior: {
    /** Whether responsive behavior is enabled */
    enabled: boolean
    /** Responsive mode */
    mode: 'mobile-first' | 'desktop-first' | 'hybrid'
    /** Whether to use CSS-style media queries */
    useMediaQueries: boolean
    /** Whether to use JavaScript-based responsive detection */
    useJavaScriptDetection: boolean
    /** Responsive update frequency */
    updateFrequency: 'immediate' | 'debounced' | 'throttled'
    /** Debounce/throttle delay in milliseconds */
    updateDelay: number
  }
  
  /** Screen orientation handling */
  readonly orientation: {
    /** Supported orientations */
    supported: ('portrait' | 'landscape')[]
    /** Current orientation */
    current: 'portrait' | 'landscape' | 'unknown'
    /** Whether to auto-rotate layout */
    autoRotate: boolean
    /** Orientation-specific configurations */
    specific: {
      portrait?: Partial<IResponsiveConfig>
      landscape?: Partial<IResponsiveConfig>
    }
  }
  
  /** Device type detection */
  readonly deviceType: {
    /** Current device type */
    current: 'mobile' | 'tablet' | 'desktop' | 'tv' | 'unknown'
    /** Device capabilities */
    capabilities: {
      /** Touch support */
      touch: boolean
      /** Mouse support */
      mouse: boolean
      /** Keyboard support */
      keyboard: boolean
      /** High DPI support */
      highDPI: boolean
      /** Hardware acceleration support */
      hardwareAcceleration: boolean
    }
    /** Device-specific configurations */
    specific: {
      mobile?: Partial<IResponsiveConfig>
      tablet?: Partial<IResponsiveConfig>
      desktop?: Partial<IResponsiveConfig>
      tv?: Partial<IResponsiveConfig>
    }
  }
  
  /** Responsive layout strategies */
  readonly responsiveStrategies: {
    /** Fluid layout strategy */
    fluid: {
      enabled: boolean
      /** Minimum and maximum viewport sizes */
      viewportRange: { min: number; max: number }
      /** Fluid scaling factor */
      scalingFactor: number
      /** Whether to maintain aspect ratio */
      maintainAspectRatio: boolean
    }
    
    /** Adaptive layout strategy */
    adaptive: {
      enabled: boolean
      /** Breakpoint-specific layouts */
      layouts: { [breakpoint: string]: Partial<IResponsiveConfig> }
      /** Transition animations between layouts */
      transitions: {
        enabled: boolean
        duration: number
        easing: string
      }
    }
    
    /** Progressive enhancement strategy */
    progressiveEnhancement: {
      enabled: boolean
      /** Base functionality for all devices */
      baseFeatures: string[]
      /** Enhanced features for capable devices */
      enhancedFeatures: string[]
      /** Feature detection methods */
      detectionMethods: ('capability' | 'performance' | 'userAgent')[]
    }
    
    /** Graceful degradation strategy */
    gracefulDegradation: {
      enabled: boolean
      /** Fallback behaviors for unsupported features */
      fallbacks: { [feature: string]: any }
      /** Minimum acceptable experience */
      minimumExperience: string
    }
  }
  
  /** Responsive content adaptation */
  readonly contentAdaptation: {
    /** Image scaling strategy */
    imageScaling: {
      strategy: 'scale' | 'crop' | 'responsive' | 'art-direction'
      /** Quality settings for different screen densities */
      quality: { [density: string]: number }
      /** Lazy loading support */
      lazyLoading: boolean
    }
    
    /** Text scaling strategy */
    textScaling: {
      strategy: 'fluid' | 'breakpoint' | 'viewport' | 'none'
      /** Base font size */
      baseFontSize: number
      /** Font size range */
      fontSizeRange: { min: number; max: number }
      /** Line height scaling */
      lineHeightScaling: boolean
    }
    
    /** Spacing adaptation */
    spacingAdaptation: {
      strategy: 'proportional' | 'breakpoint' | 'viewport' | 'fixed'
      /** Base spacing unit */
      baseSpacing: number
      /** Spacing scale factors */
      spacingScale: number[]
    }
  }
  
  /** Performance optimization for responsive behavior */
  readonly performanceOptimization: {
    /** Whether to use layout caching */
    layoutCaching: boolean
    /** Cache invalidation strategy */
    cacheInvalidation: 'manual' | 'automatic' | 'hybrid'
    /** Memory management */
    memoryManagement: {
      /** Maximum cached layouts */
      maxCachedLayouts: number
      /** Cache cleanup interval */
      cleanupInterval: number
      /** Memory usage threshold */
      memoryThreshold: number
    }
    /** Rendering optimization */
    renderingOptimization: {
      /** Whether to use requestAnimationFrame */
      useRequestAnimationFrame: boolean
      /** Frame rate limiting */
      frameRateLimit: number
      /** Batch rendering */
      batchRendering: boolean
    }
  }
  
  /** Responsive testing and debugging */
  readonly testingAndDebugging: {
    /** Whether to show responsive debug information */
    showDebugInfo: boolean
    /** Debug overlay configuration */
    debugOverlay: {
      enabled: boolean
      position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
      showBreakpoint: boolean
      showDimensions: boolean
      showDeviceInfo: boolean
    }
    /** Responsive testing tools */
    testingTools: {
      /** Breakpoint testing */
      breakpointTesting: boolean
      /** Orientation testing */
      orientationTesting: boolean
      /** Device simulation */
      deviceSimulation: boolean
    }
  }
  
  /** Responsive methods */
  readonly responsiveMethods: {
    /** Get current responsive configuration */
    getCurrentResponsiveConfig(): Partial<IResponsiveConfig>
    
    /** Check if current viewport matches breakpoint */
    matchesBreakpoint(breakpoint: string): boolean
    
    /** Get responsive configuration for specific breakpoint */
    getResponsiveConfig(breakpoint: string): Partial<IResponsiveConfig> | undefined
    
    /** Update responsive configuration based on current conditions */
    updateResponsiveConfig(): void
    
    /** Force responsive update */
    forceResponsiveUpdate(): void
    
    /** Get current viewport dimensions */
    getCurrentViewport(): { width: number; height: number }
    
    /** Get current device pixel ratio */
    getDevicePixelRatio(): number
    
    /** Check if device supports specific feature */
    supportsFeature(feature: string): boolean
    
    /** Get performance metrics for current device */
    getPerformanceMetrics(): {
      fps: number
      memoryUsage: number
      renderTime: number
      loadTime: number
    }
    
    /** Optimize for current device capabilities */
    optimizeForDevice(): void
    
    /** Test responsive behavior */
    testResponsiveBehavior(): {
      breakpoints: { [key: string]: boolean }
      orientation: string
      deviceType: string
      performance: number
    }
  }
  
  /** Responsive events */
  readonly responsiveEvents: {
    /** Fired when breakpoint changes */
    onBreakpointChanged: ((oldBreakpoint: string, newBreakpoint: string) => void)[]
    /** Fired when orientation changes */
    onOrientationChanged: ((oldOrientation: string, newOrientation: string) => void)[]
    /** Fired when device type changes */
    onDeviceTypeChanged: ((oldDeviceType: string, newDeviceType: string) => void)[]
    /** Fired when responsive configuration updates */
    onResponsiveConfigUpdated: (() => void)[]
    /** Fired when performance threshold is exceeded */
    onPerformanceThresholdExceeded: ((metric: string, value: number, threshold: number) => void)[]
  }
  
  /** Responsive utilities */
  readonly responsiveUtilities: {
    /** Convert pixels to viewport units */
    pxToVw(pixels: number): number
    
    /** Convert pixels to viewport height units */
    pxToVh(pixels: number): number
    
    /** Convert viewport units to pixels */
    vwToPx(vw: number): number
    
    /** Convert viewport height units to pixels */
    vhToPx(vh: number): number
    
    /** Get responsive value based on breakpoint */
    getResponsiveValue<T>(values: { [breakpoint: string]: T }, defaultValue: T): T
    
    /** Interpolate between breakpoint values */
    interpolateResponsiveValue(
      property: string,
      breakpoints: { [breakpoint: string]: number },
      currentValue: number
    ): number
    
    /** Create responsive CSS media query */
    createMediaQuery(breakpoint: string, orientation?: string): string
    
    /** Validate responsive configuration */
    validateResponsiveConfig(): string[]
  }
}
