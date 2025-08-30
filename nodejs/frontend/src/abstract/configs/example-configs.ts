import type { IResponsiveConfig, ILayoutConfig, IPositionConfig } from './index'

/**
 * Example configurations demonstrating the configuration hierarchy:
 * IResponsiveConfig > ILayoutConfig > IPositionConfig
 * 
 * This shows how to create comprehensive responsive layouts
 * inspired by HTML/CSS, WinForms, and WPF systems
 */

/**
 * Example 1: Basic Button Configuration
 * Shows the complete hierarchy from position to responsive
 */
export const exampleButtonConfig: Partial<IResponsiveConfig> = {
  // Base IConfiguration properties
  id: 'button-1',
  name: 'Primary Button',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: { componentType: 'button', priority: 'high' },
  
  // IPositionConfig properties
  positionMode: 'relative',
  x: 0,
  y: 0,
  zIndex: 1,
  anchor: { x: 0.5, y: 0.5 },
  offset: { x: 0, y: 0 },
  size: {
    width: 120,
    height: 40,
    minWidth: 80,
    maxWidth: 200,
    minHeight: 32,
    maxHeight: 60
  },
  margin: { top: 8, right: 8, bottom: 8, left: 8 },
  padding: { top: 12, right: 16, bottom: 12, left: 16 },
  border: {
    width: 2,
    style: 'solid',
    color: '#007bff',
    radius: 6
  },
  alignment: { horizontal: 'center', vertical: 'center' },
  transform: {
    scale: { x: 1, y: 1 },
    rotation: 0,
    skew: { x: 0, y: 0 }
  },
  constraints: {
    respectParentBounds: true,
    snapToGrid: false,
    gridSize: 8,
    maintainAspectRatio: false,
    minDistanceFromEdges: { top: 4, right: 4, bottom: 4, left: 4 }
  },
  responsive: {
    breakpoints: {
      mobile: { width: 100, height: 36 },
      tablet: { width: 120, height: 40 },
      desktop: { width: 140, height: 44 }
    }
  },
  
  // ILayoutConfig properties
  layoutType: 'none',
  layoutDirection: 'horizontal',
  layoutAlignment: {
    mainAxis: 'center',
    crossAxis: 'center',
    content: 'center'
  },
  flexbox: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
    order: 0,
    flexWrap: 'nowrap',
    alignSelf: 'auto'
  },
  grid: {
    gridColumnStart: 1,
    gridColumnEnd: 2,
    gridRowStart: 1,
    gridRowEnd: 2,
    gridArea: '',
    justifySelf: 'center',
    alignSelf: 'center'
  },
  stack: {
    orientation: 'horizontal',
    spacing: 0,
    reverse: false,
    alignment: 'center'
  },
  dock: {
    dockPosition: 'fill',
    dockMargin: 0,
    fillRemaining: false
  },
  flow: {
    flowDirection: 'left-to-right',
    wrap: 'nowrap',
    lineAlignment: 'start',
    itemSpacing: 0,
    lineSpacing: 0
  },
  container: {
    isContainer: false,
    containerType: 'absolute',
    constraints: {
      maxChildren: 0,
      autoSize: false,
      clipOverflow: false,
      overflow: 'visible'
    }
  },
  spacing: {
    gap: 0,
    rowGap: 0,
    columnGap: 0,
    margin: 8,
    padding: 16
  },
  responsiveLayout: {
    breakpoints: {
      mobile: { layoutType: 'none', spacing: { margin: 4, padding: 12 } },
      tablet: { layoutType: 'none', spacing: { margin: 8, padding: 16 } },
      desktop: { layoutType: 'none', spacing: { margin: 12, padding: 20 } }
    }
  },
  layoutMethods: {
    calculateLayout: () => {},
    measureLayout: () => ({ width: 120, height: 40 }),
    arrangeLayout: () => {},
    getLayoutBounds: () => ({ x: 0, y: 0, width: 120, height: 40 }),
    needsLayoutRecalculation: () => false,
    invalidateLayout: () => {}
  },
  childManagement: {
    addChild: () => {},
    removeChild: () => {},
    getChildren: () => [],
    getChildAt: () => undefined,
    getChildCount: () => 0,
    clearChildren: () => {}
  },
  layoutEvents: {
    onLayoutChanged: [],
    onChildrenChanged: [],
    onLayoutInvalidated: []
  },
  
  // IResponsiveConfig properties
  breakpoints: {
    xs: 320,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
    custom: { mobile: 480, tablet: 768, desktop: 1024 }
  },
  currentBreakpoint: 'desktop',
  responsiveBehavior: {
    enabled: true,
    mode: 'mobile-first',
    useMediaQueries: true,
    useJavaScriptDetection: true,
    updateFrequency: 'debounced',
    updateDelay: 150
  },
  orientation: {
    supported: ['portrait', 'landscape'],
    current: 'landscape',
    autoRotate: false,
    specific: {
      portrait: { size: { width: 100, height: 36 } },
      landscape: { size: { width: 120, height: 40 } }
    }
  },
  deviceType: {
    current: 'desktop',
    capabilities: {
      touch: false,
      mouse: true,
      keyboard: true,
      highDPI: true,
      hardwareAcceleration: true
    },
    specific: {
      mobile: { size: { width: 100, height: 36 }, margin: { top: 4, right: 4, bottom: 4, left: 4 } },
      tablet: { size: { width: 120, height: 40 }, margin: { top: 8, right: 8, bottom: 8, left: 8 } },
      desktop: { size: { width: 140, height: 44 }, margin: { top: 12, right: 12, bottom: 12, left: 12 } }
    }
  },
  responsiveStrategies: {
    fluid: {
      enabled: true,
      viewportRange: { min: 320, max: 1920 },
      scalingFactor: 0.1,
      maintainAspectRatio: false
    },
    adaptive: {
      enabled: true,
      layouts: {
        mobile: { size: { width: 100, height: 36 } },
        tablet: { size: { width: 120, height: 40 } },
        desktop: { size: { width: 140, height: 44 } }
      },
      transitions: {
        enabled: true,
        duration: 300,
        easing: 'ease-in-out'
      }
    },
    progressiveEnhancement: {
      enabled: true,
      baseFeatures: ['click', 'hover'],
      enhancedFeatures: ['animations', 'shadows', 'gradients'],
      detectionMethods: ['capability', 'performance']
    },
    gracefulDegradation: {
      enabled: true,
      fallbacks: { animations: 'none', shadows: 'none', gradients: 'solid' },
      minimumExperience: 'functional'
    }
  },
  contentAdaptation: {
    imageScaling: {
      strategy: 'responsive',
      quality: { '1x': 0.8, '2x': 0.9, '3x': 1.0 },
      lazyLoading: true
    },
    textScaling: {
      strategy: 'fluid',
      baseFontSize: 14,
      fontSizeRange: { min: 12, max: 18 },
      lineHeightScaling: true
    },
    spacingAdaptation: {
      strategy: 'proportional',
      baseSpacing: 8,
      spacingScale: [0.5, 1, 1.5, 2, 3]
    }
  },
  performanceOptimization: {
    layoutCaching: true,
    cacheInvalidation: 'automatic',
    memoryManagement: {
      maxCachedLayouts: 10,
      cleanupInterval: 30000,
      memoryThreshold: 50
    },
    renderingOptimization: {
      useRequestAnimationFrame: true,
      frameRateLimit: 60,
      batchRendering: true
    }
  },
  testingAndDebugging: {
    showDebugInfo: false,
    debugOverlay: {
      enabled: false,
      position: 'top-right',
      showBreakpoint: true,
      showDimensions: true,
      showDeviceInfo: true
    },
    testingTools: {
      breakpointTesting: true,
      orientationTesting: true,
      deviceSimulation: true
    }
  },
  responsiveMethods: {
    getCurrentResponsiveConfig: () => ({}),
    matchesBreakpoint: () => true,
    getResponsiveConfig: () => ({}),
    updateResponsiveConfig: () => {},
    forceResponsiveUpdate: () => {},
    getCurrentViewport: () => ({ width: 1920, height: 1080 }),
    getDevicePixelRatio: () => 1,
    supportsFeature: () => true,
    getPerformanceMetrics: () => ({ fps: 60, memoryUsage: 25, renderTime: 16, loadTime: 100 }),
    optimizeForDevice: () => {},
    testResponsiveBehavior: () => ({
      breakpoints: { mobile: false, tablet: false, desktop: true },
      orientation: 'landscape',
      deviceType: 'desktop',
      performance: 95
    })
  },
  responsiveEvents: {
    onBreakpointChanged: [],
    onOrientationChanged: [],
    onDeviceTypeChanged: [],
    onResponsiveConfigUpdated: [],
    onPerformanceThresholdExceeded: []
  },
  responsiveUtilities: {
    pxToVw: (pixels: number) => (pixels / 1920) * 100,
    pxToVh: (pixels: number) => (pixels / 1080) * 100,
    vwToPx: (vw: number) => (vw / 100) * 1920,
    vhToPx: (vh: number) => (vh / 100) * 1080,
    getResponsiveValue: (values, defaultValue) => values.desktop || defaultValue,
    interpolateResponsiveValue: () => 120,
    createMediaQuery: (breakpoint) => `@media (min-width: ${breakpoint}px)`,
    validateResponsiveConfig: () => []
  },
  
  // IConfiguration methods
  validate: () => [],
  clone: (overrides) => ({ ...exampleButtonConfig, ...overrides } as IResponsiveConfig),
  toJSON: () => JSON.stringify(exampleButtonConfig),
  fromJSON: (json) => JSON.parse(json) as IResponsiveConfig,
  isValid: () => true,
  getSummary: () => ({
    id: 'button-1',
    name: 'Primary Button',
    version: '1.0.0',
    isActive: true,
    lastModified: new Date(),
    isValid: true,
    validationErrors: [],
    metadataKeys: ['componentType', 'priority']
  })
}

/**
 * Example 2: Container Layout Configuration
 * Shows how to create a responsive container with flexbox layout
 */
export const exampleContainerConfig: Partial<IResponsiveConfig> = {
  // Layout-specific configuration
  layoutType: 'flexbox',
  layoutDirection: 'vertical',
  layoutAlignment: {
    mainAxis: 'start',
    crossAxis: 'stretch',
    content: 'start'
  },
  flexbox: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
    order: 0,
    flexWrap: 'wrap',
    alignSelf: 'stretch'
  },
  container: {
    isContainer: true,
    containerType: 'flex',
    constraints: {
      maxChildren: 10,
      autoSize: true,
      clipOverflow: false,
      overflow: 'visible'
    }
  },
  spacing: {
    gap: 16,
    rowGap: 16,
    columnGap: 16,
    margin: 16,
    padding: 24
  },
  responsiveLayout: {
    breakpoints: {
      mobile: { 
        layoutDirection: 'vertical',
        spacing: { gap: 8, margin: 8, padding: 16 }
      },
      tablet: { 
        layoutDirection: 'horizontal',
        spacing: { gap: 12, margin: 12, padding: 20 }
      },
      desktop: { 
        layoutDirection: 'horizontal',
        spacing: { gap: 16, margin: 16, padding: 24 }
      }
    }
  }
}

/**
 * Example 3: Grid Layout Configuration
 * Shows how to create a responsive grid layout
 */
export const exampleGridConfig: Partial<IResponsiveConfig> = {
  layoutType: 'grid',
  grid: {
    gridColumnStart: 1,
    gridColumnEnd: 'span 2',
    gridRowStart: 1,
    gridRowEnd: 'span 2',
    gridArea: 'main',
    justifySelf: 'stretch',
    alignSelf: 'stretch'
  },
  responsiveLayout: {
    breakpoints: {
      mobile: { 
        grid: { gridColumnEnd: 'span 1', gridRowEnd: 'span 1' }
      },
      tablet: { 
        grid: { gridColumnEnd: 'span 2', gridRowEnd: 'span 1' }
      },
      desktop: { 
        grid: { gridColumnEnd: 'span 2', gridRowEnd: 'span 2' }
      }
    }
  }
}

/**
 * Example 4: Responsive Breakpoint Configuration
 * Shows how to define custom breakpoints and responsive behavior
 */
export const exampleResponsiveConfig: Partial<IResponsiveConfig> = {
  breakpoints: {
    xs: 320,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
    custom: {
      mobile: 480,
      tablet: 768,
      desktop: 1024,
      wide: 1440,
      ultra: 1920
    }
  },
  responsiveBehavior: {
    enabled: true,
    mode: 'mobile-first',
    useMediaQueries: true,
    useJavaScriptDetection: true,
    updateFrequency: 'debounced',
    updateDelay: 100
  },
  responsiveStrategies: {
    fluid: {
      enabled: true,
      viewportRange: { min: 320, max: 2560 },
      scalingFactor: 0.05,
      maintainAspectRatio: true
    },
    adaptive: {
      enabled: true,
      layouts: {
        mobile: { size: { width: 'fill', height: 'auto' } },
        tablet: { size: { width: 'fill', height: 'auto' } },
        desktop: { size: { width: 'fill', height: 'auto' } }
      },
      transitions: {
        enabled: true,
        duration: 250,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
    progressiveEnhancement: {
      enabled: true,
      baseFeatures: ['basic-layout'],
      enhancedFeatures: ['animations', 'shadows', 'gradients'],
      detectionMethods: ['capability', 'performance']
    },
    gracefulDegradation: {
      enabled: true,
      fallbacks: { 'animations': 'static', 'shadows': 'none', 'gradients': 'solid' },
      minimumExperience: 'functional'
    }
  }
}

/**
 * Utility function to create a responsive configuration
 * This demonstrates how to build configurations dynamically
 */
export function createResponsiveConfig(
  baseConfig: Partial<IPositionConfig>,
  layoutConfig: Partial<ILayoutConfig>,
  responsiveConfig: Partial<IResponsiveConfig>
): IResponsiveConfig {
  return {
    // Start with base position config
    ...baseConfig,
    
    // Add layout configuration
    ...layoutConfig,
    
    // Add responsive configuration
    ...responsiveConfig,
    
    // Ensure required properties are set
    id: baseConfig.id || 'generated-config',
    name: baseConfig.name || 'Generated Configuration',
    version: baseConfig.version || '1.0.0',
    isActive: baseConfig.isActive ?? true,
    lastModified: baseConfig.lastModified || new Date(),
    metadata: baseConfig.metadata || {},
    
    // Add required methods
    validate: () => [],
    clone: function(overrides?: Partial<IResponsiveConfig>) { return createResponsiveConfig(this, {}, overrides || {}) },
    toJSON: function() { return JSON.stringify(this) },
    fromJSON: function(json) { return JSON.parse(json) as IResponsiveConfig },
    isValid: function() { return this.validate().length === 0 },
    getSummary: function() {
      return {
        id: this.id,
        name: this.name,
        version: this.version,
        isActive: this.isActive,
        lastModified: this.lastModified,
        isValid: this.isValid(),
        validationErrors: this.validate(),
        metadataKeys: Object.keys(this.metadata)
      }
    }
  } as IResponsiveConfig
}

/**
 * Example usage of the utility function
 */
export const generatedButtonConfig = createResponsiveConfig(
  {
    id: 'generated-button',
    name: 'Generated Button',
    version: '1.0.0',
    isActive: true,
    lastModified: new Date(),
    metadata: { type: 'generated' },
    positionMode: 'relative',
    x: 0,
    y: 0,
    zIndex: 1,
    anchor: { x: 0.5, y: 0.5 },
    offset: { x: 0, y: 0 },
    size: { width: 100, height: 40 },
    margin: { top: 8, right: 8, bottom: 8, left: 8 },
    padding: { top: 12, right: 16, bottom: 12, left: 16 },
    border: { width: 1, style: 'solid', color: '#000', radius: 4 },
    alignment: { horizontal: 'center', vertical: 'center' },
    transform: { scale: { x: 1, y: 1 }, rotation: 0, skew: { x: 0, y: 0 } },
    constraints: {
      respectParentBounds: true,
      snapToGrid: false,
      gridSize: 8,
      maintainAspectRatio: false,
      minDistanceFromEdges: { top: 4, right: 4, bottom: 4, left: 4 }
    },
    responsive: { breakpoints: {} }
  },
  {
    layoutType: 'none',
    layoutDirection: 'horizontal',
    layoutAlignment: { mainAxis: 'center', crossAxis: 'center', content: 'center' },
    flexbox: { flexGrow: 0, flexShrink: 1, flexBasis: 'auto', order: 0, flexWrap: 'nowrap', alignSelf: 'auto' },
    grid: { gridColumnStart: 1, gridColumnEnd: 2, gridRowStart: 1, gridRowEnd: 2, gridArea: '', justifySelf: 'center', alignSelf: 'center' },
    stack: { orientation: 'horizontal', spacing: 0, reverse: false, alignment: 'center' },
    dock: { dockPosition: 'fill', dockMargin: 0, fillRemaining: false },
    flow: { flowDirection: 'left-to-right', wrap: 'nowrap', lineAlignment: 'start', itemSpacing: 0, lineSpacing: 0 },
    container: { isContainer: false, containerType: 'absolute', constraints: { maxChildren: 0, autoSize: false, clipOverflow: false, overflow: 'visible' } },
    spacing: { gap: 0, rowGap: 0, columnGap: 0, margin: 8, padding: 16 },
    responsiveLayout: { breakpoints: {} },
    layoutMethods: { calculateLayout: () => {}, measureLayout: () => ({ width: 100, height: 40 }), arrangeLayout: () => {}, getLayoutBounds: () => ({ x: 0, y: 0, width: 100, height: 40 }), needsLayoutRecalculation: () => false, invalidateLayout: () => {} },
    childManagement: { addChild: () => {}, removeChild: () => {}, getChildren: () => [], getChildAt: () => undefined, getChildCount: () => 0, clearChildren: () => {} },
    layoutEvents: { onLayoutChanged: [], onChildrenChanged: [], onLayoutInvalidated: [] }
  },
  {
    breakpoints: { xs: 320, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400, custom: {} },
    currentBreakpoint: 'desktop',
    responsiveBehavior: { enabled: true, mode: 'mobile-first', useMediaQueries: true, useJavaScriptDetection: true, updateFrequency: 'debounced', updateDelay: 150 },
    orientation: { supported: ['portrait', 'landscape'], current: 'landscape', autoRotate: false, specific: {} },
    deviceType: { current: 'desktop', capabilities: { touch: false, mouse: true, keyboard: true, highDPI: true, hardwareAcceleration: true }, specific: {} },
    responsiveStrategies: { fluid: { enabled: true, viewportRange: { min: 320, max: 1920 }, scalingFactor: 0.1, maintainAspectRatio: false }, adaptive: { enabled: true, layouts: {}, transitions: { enabled: true, duration: 300, easing: 'ease-in-out' } }, progressiveEnhancement: { enabled: true, baseFeatures: [], enhancedFeatures: [], detectionMethods: [] }, gracefulDegradation: { enabled: true, fallbacks: {}, minimumExperience: 'functional' } },
    contentAdaptation: { imageScaling: { strategy: 'responsive', quality: {}, lazyLoading: true }, textScaling: { strategy: 'fluid', baseFontSize: 14, fontSizeRange: { min: 12, max: 18 }, lineHeightScaling: true }, spacingAdaptation: { strategy: 'proportional', baseSpacing: 8, spacingScale: [0.5, 1, 1.5, 2, 3] } },
    performanceOptimization: { layoutCaching: true, cacheInvalidation: 'automatic', memoryManagement: { maxCachedLayouts: 10, cleanupInterval: 30000, memoryThreshold: 50 }, renderingOptimization: { useRequestAnimationFrame: true, frameRateLimit: 60, batchRendering: true } },
    testingAndDebugging: { showDebugInfo: false, debugOverlay: { enabled: false, position: 'top-right', showBreakpoint: true, showDimensions: true, showDeviceInfo: true }, testingTools: { breakpointTesting: true, orientationTesting: true, deviceSimulation: true } },
    responsiveMethods: { getCurrentResponsiveConfig: () => ({}), matchesBreakpoint: () => true, getResponsiveConfig: () => ({}), updateResponsiveConfig: () => {}, forceResponsiveUpdate: () => {}, getCurrentViewport: () => ({ width: 1920, height: 1080 }), getDevicePixelRatio: () => 1, supportsFeature: () => true, getPerformanceMetrics: () => ({ fps: 60, memoryUsage: 25, renderTime: 16, loadTime: 100 }), optimizeForDevice: () => {}, testResponsiveBehavior: () => ({ breakpoints: {}, orientation: 'landscape', deviceType: 'desktop', performance: 95 }) },
    responsiveEvents: { onBreakpointChanged: [], onOrientationChanged: [], onDeviceTypeChanged: [], onResponsiveConfigUpdated: [], onPerformanceThresholdExceeded: [] },
    responsiveUtilities: { 
      pxToVw: (pixels: number) => (pixels / 1920) * 100, 
      pxToVh: (pixels: number) => (pixels / 1080) * 100, 
      vwToPx: (vw: number) => (vw / 100) * 1920, 
      vhToPx: (vh: number) => (vh / 100) * 1080, 
      getResponsiveValue: <T>(values: { [breakpoint: string]: T }, defaultValue: T): T => defaultValue, 
      interpolateResponsiveValue: <T>(values: { [breakpoint: string]: T }, defaultValue: T): T => defaultValue, 
      createMediaQuery: (breakpoint: string) => `@media (min-width: ${breakpoint}px)`, 
      validateResponsiveConfig: () => [] 
    }
  }
)
