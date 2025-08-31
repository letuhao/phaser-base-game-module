import { logger } from './Logger'
import type { IStyleProperties } from '../abstract/configs/IStyleProperties'
import { ThemeConfigLoader } from './ThemeConfigLoader'

/**
 * Generic breakpoint condition interface
 */
export interface BreakpointCondition {
  minWidth: number
  maxWidth?: number // undefined means "and above"
}

/**
 * Generic object layout interface
 */
export interface ObjectLayout {
  id: string // Target object ID
  breakpointCondition: BreakpointCondition
  layoutProperties: IStyleProperties // Using IStyleProperties for type safety
}

/**
 * Generic responsive configuration interface with dynamic breakpoints
 */
export interface ResponsiveConfig {
  // Default breakpoint that loads first (highest priority)
  default?: ObjectLayout[]
  
  // Dynamic responsive settings - can have any breakpoint keys
  responsiveSettings: {
    [breakpointKey: string]: ObjectLayout[]
  }
  
  // Optional metadata about breakpoints
  breakpointMetadata?: {
    [breakpointKey: string]: {
      name: string
      description?: string
      minWidth: number
      maxWidth?: number
    }
  }
  
  // NEW: Theme class definitions for reusable styling
  themeClasses?: {
    [className: string]: IStyleProperties
  }
}

/**
 * Responsive configuration loader for scenes
 * Loads and manages responsive behavior configurations with dynamic breakpoint support
 */
export class ResponsiveConfigLoader {
  private static instance: ResponsiveConfigLoader
  private loadedConfigs: Map<string, ResponsiveConfig> = new Map()
  
  // Standard breakpoint definitions
  private static readonly STANDARD_BREAKPOINTS = {
    xs: { minWidth: 0, maxWidth: 575, name: 'Extra Small' },
    sm: { minWidth: 576, maxWidth: 767, name: 'Small' },
    md: { minWidth: 768, maxWidth: 991, name: 'Medium' },
    lg: { minWidth: 992, maxWidth: 1199, name: 'Large' },
    xl: { minWidth: 1200, maxWidth: 1399, name: 'Extra Large' },
    xxl: { minWidth: 1400, maxWidth: undefined, name: 'Extra Extra Large' }
  }
  
  private constructor() {
    // No default configs - scenes must register their own configs
  }
  
  /**
   * Get singleton instance
   */
  public static getInstance(): ResponsiveConfigLoader {
    if (!ResponsiveConfigLoader.instance) {
      ResponsiveConfigLoader.instance = new ResponsiveConfigLoader()
    }
    return ResponsiveConfigLoader.instance
  }
  
  /**
   * Register a responsive configuration for a scene
   */
  public registerConfig(sceneName: string, config: ResponsiveConfig): void {
    this.loadedConfigs.set(sceneName, config)
    logger.info('ResponsiveConfigLoader', `Registered responsive config for scene: ${sceneName}`)
  }
  
  /**
   * Load responsive configuration for a scene
   */
  public loadConfig(sceneName: string): ResponsiveConfig | null {
    const config = this.loadedConfigs.get(sceneName)
    
    if (!config) {
      logger.warn('ResponsiveConfigLoader', `No responsive config found for scene: ${sceneName}`)
      return null
    }
    
    logger.info('ResponsiveConfigLoader', `Loaded responsive config for scene: ${sceneName}`)
    return config
  }
  
  /**
   * Check if a scene has a responsive configuration
   */
  public hasConfig(sceneName: string): boolean {
    return this.loadedConfigs.has(sceneName)
  }
  
  /**
   * Get available scene configurations
   */
  public getAvailableConfigs(): string[] {
    return Array.from(this.loadedConfigs.keys())
  }
  
  /**
   * Get all available breakpoint keys from a config
   */
  public static getBreakpointKeys(config: ResponsiveConfig): string[] {
    if (!config.responsiveSettings) return []
    return Object.keys(config.responsiveSettings)
  }
  
  /**
   * Get all object IDs that have responsive configurations
   */
  public static getObjectIds(config: ResponsiveConfig): string[] {
    const objectIds = new Set<string>()
    
    // Add objects from default breakpoint
    if (config.default) {
      config.default.forEach(layout => objectIds.add(layout.id))
    }
    
    // Add objects from all responsive breakpoints
    if (config.responsiveSettings) {
      Object.values(config.responsiveSettings).forEach(breakpointLayouts => {
        breakpointLayouts.forEach(layout => objectIds.add(layout.id))
      })
    }
    
    return Array.from(objectIds)
  }
  
  /**
   * Get the current breakpoint key based on screen width
   */
  public static getCurrentBreakpointKey(config: ResponsiveConfig, width: number): string | null {
    if (!config.responsiveSettings) return null
    
    // Sort breakpoints by minWidth for proper evaluation
    const sortedBreakpoints = Object.entries(config.responsiveSettings)
      .map(([key, layouts]) => {
        const minWidth = layouts[0]?.breakpointCondition?.minWidth || 0
        return { key, minWidth }
      })
      .sort((a, b) => a.minWidth - b.minWidth)
    
    // Find the appropriate breakpoint
    for (let i = sortedBreakpoints.length - 1; i >= 0; i--) {
      const breakpoint = sortedBreakpoints[i]
      if (width >= breakpoint.minWidth) {
        return breakpoint.key
      }
    }
    
    return null
  }
  
  /**
   * Get responsive behavior for current screen size
   */
  public static getResponsiveBehavior(config: ResponsiveConfig, width: number): any {
    // Try new dynamic system first
    if (config.responsiveSettings) {
      const currentBreakpoint = this.getCurrentBreakpointKey(config, width)
      if (currentBreakpoint && config.responsiveSettings[currentBreakpoint]) {
        return {
          breakpoint: currentBreakpoint,
          layouts: config.responsiveSettings[currentBreakpoint],
          default: config.default || []
        }
      }
    }
    
    // No legacy fallback since we removed desktop/mobile properties
    // Return null or empty object to indicate no responsive behavior found
    return null
  }
  
  /**
   * Get layout for a specific object at current screen size
   */
  public static getObjectLayout(
    config: ResponsiveConfig, 
    objectId: string, 
    width: number
  ): any | null {
    // Check default first (highest priority)
    if (config.default) {
      const defaultLayout = config.default.find(layout => layout.id === objectId)
      if (defaultLayout) {
        return defaultLayout.layoutProperties
      }
    }
    
    // Check responsive breakpoints
    if (config.responsiveSettings) {
      const currentBreakpoint = this.getCurrentBreakpointKey(config, width)
      if (currentBreakpoint && config.responsiveSettings[currentBreakpoint]) {
        const layout = config.responsiveSettings[currentBreakpoint].find(
          layout => layout.id === objectId
        )
        if (layout) {
          return layout.layoutProperties
        }
      }
    }
    
    return null
  }
  
  /**
   * Get all layouts for a specific object across all breakpoints
   */
  public static getObjectLayoutsAcrossBreakpoints(
    config: ResponsiveConfig, 
    objectId: string
  ): { [breakpointKey: string]: any } {
    const layouts: { [breakpointKey: string]: any } = {}
    
    // Add default layout
    if (config.default) {
      const defaultLayout = config.default.find(layout => layout.id === objectId)
      if (defaultLayout) {
        layouts.default = defaultLayout.layoutProperties
      }
    }
    
    // Add responsive breakpoint layouts
    if (config.responsiveSettings) {
      Object.entries(config.responsiveSettings).forEach(([breakpointKey, layoutsArray]) => {
        const layout = layoutsArray.find(layout => layout.id === objectId)
        if (layout) {
          layouts[breakpointKey] = layout.layoutProperties
        }
      })
    }
    
    return layouts
  }
  
  /**
   * Check if an object has responsive configuration
   */
  public static hasObjectResponsiveConfig(config: ResponsiveConfig, objectId: string): boolean {
    // Check default
    if (config.default && config.default.some(layout => layout.id === objectId)) {
      return true
    }
    
    // Check responsive breakpoints
    if (config.responsiveSettings) {
      return Object.values(config.responsiveSettings).some(
        layouts => layouts.some(layout => layout.id === objectId)
      )
    }
    
    return false
  }
  
  /**
   * Get breakpoint information for debugging
   */
  public static getBreakpointInfo(config: ResponsiveConfig): {
    breakpoints: string[]
    objectCount: number
    hasDefault: boolean
  } {
    const breakpoints = this.getBreakpointKeys(config)
    const objectIds = this.getObjectIds(config)
    
    return {
      breakpoints,
      objectCount: objectIds.length,
      hasDefault: !!config.default && config.default.length > 0
    }
  }
  
  /**
   * Detect device type based on screen width (legacy support)
   */
  public static detectDeviceType(width: number): 'desktop' | 'mobile' {
    return width >= 1024 ? 'desktop' : 'mobile'
  }
  
  /**
   * Get standard breakpoint definitions
   */
  public static getStandardBreakpoints() {
    return { ...this.STANDARD_BREAKPOINTS }
  }
  
  /**
   * Validate responsive configuration structure
   */
  public static validateConfig(config: ResponsiveConfig): {
    isValid: boolean
    errors: string[]
    warnings: string[]
  } {
    const errors: string[] = []
    const warnings: string[] = []
    
    // Check if responsiveSettings exists
    if (!config.responsiveSettings) {
      errors.push('Missing responsiveSettings property')
    } else {
      // Check each breakpoint
      Object.entries(config.responsiveSettings).forEach(([breakpointKey, layouts]) => {
        if (!Array.isArray(layouts)) {
          errors.push(`Breakpoint '${breakpointKey}' must be an array`)
        } else {
          layouts.forEach((layout, index) => {
            if (!layout.id) {
              errors.push(`Layout at index ${index} in breakpoint '${breakpointKey}' missing id`)
            }
            if (!layout.breakpointCondition) {
              errors.push(`Layout at index ${index} in breakpoint '${breakpointKey}' missing breakpointCondition`)
            }
            if (!layout.layoutProperties) {
              errors.push(`Layout at index ${index} in breakpoint '${breakpointKey}' missing layoutProperties`)
            }
          })
        }
      })
    }
    
    // Check default breakpoint
    if (config.default && !Array.isArray(config.default)) {
      errors.push('Default breakpoint must be an array')
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  }
  
  // ===== THEME INTEGRATION METHODS =====
  
  /**
   * Get the currently active theme
   */
  public static getActiveTheme(): any {
    return ThemeConfigLoader.getInstance().getActiveTheme()
  }
  
  /**
   * Get a color value from the active theme
   */
  public static getThemeColor(path: string): string {
    return ThemeConfigLoader.getInstance().getColor(path)
  }
  
  /**
   * Get a spacing value from the active theme
   */
  public static getThemeSpacing(size: string): number {
    return ThemeConfigLoader.getInstance().getSpacing(size as any)
  }
  
  /**
   * Get a font size value from the active theme
   */
  public static getThemeFontSize(size: string): number {
    return ThemeConfigLoader.getInstance().getFontSize(size as any)
  }
  
  /**
   * Apply theme to responsive layout properties
   */
  public static applyThemeToLayout(layoutProperties: IStyleProperties): IStyleProperties {
    const theme = ThemeConfigLoader.getInstance().getActiveTheme()
    if (!theme) return layoutProperties
    
    let themedProperties = { ...layoutProperties }
    
    // NEW: Apply theme classes if specified
    if (layoutProperties.classes && layoutProperties.classes.length > 0) {
      themedProperties = this.applyThemeClasses(
        themedProperties, 
        layoutProperties.classes, 
        theme
      )
    }
    
    // Apply direct theme properties (existing behavior)
    themedProperties = this.applyDirectThemeProperties(themedProperties, theme)
    
    return themedProperties
  }
  
  /**
   * Apply theme classes to layout properties
   */
  private static applyThemeClasses(
    properties: IStyleProperties, 
    classes: string[], 
    theme: any
  ): IStyleProperties {
    const themedProperties = { ...properties }
    
    classes.forEach(className => {
      const themeClass = theme.themeClasses?.[className]
      if (themeClass) {
        // Apply class properties, with existing properties taking precedence
        Object.entries(themeClass).forEach(([key, value]) => {
          if (value !== undefined && themedProperties[key as keyof IStyleProperties] === undefined) {
            ;(themedProperties as any)[key] = value
          }
        })
      }
    })
    
    return themedProperties
  }
  
  /**
   * Apply direct theme properties (existing behavior)
   */
  private static applyDirectThemeProperties(
    properties: IStyleProperties, 
    theme: any
  ): IStyleProperties {
    const themedProperties = { ...properties }
    
    // Apply theme colors if not explicitly set
    if (!themedProperties.backgroundColor && !themedProperties.backgroundImage) {
      themedProperties.backgroundColor = theme.getColor('background.primary')
    }
    
    if (!themedProperties.color) {
      themedProperties.color = theme.getColor('text.primary')
    }
    
    if (!themedProperties.borderColor) {
      themedProperties.borderColor = theme.getColor('ui.border')
    }
    
    // Apply theme typography if not explicitly set
    if (!themedProperties.fontFamily) {
      themedProperties.fontFamily = theme.getColor('typography.fontFamily.primary')
    }
    
    if (!themedProperties.fontSize) {
      themedProperties.fontSize = theme.getFontSize('base')
    }
    
    if (!themedProperties.fontWeight) {
      themedProperties.fontWeight = 400 // Default normal weight
    }
    
    // Apply theme spacing if not explicitly set
    if (!themedProperties.padding) {
      themedProperties.padding = theme.getSpacing('md')
    }
    
    if (!themedProperties.margin) {
      themedProperties.margin = theme.getSpacing('sm')
    }
    
    return themedProperties
  }
  
  /**
   * Get responsive behavior with theme integration
   */
  public static getResponsiveBehaviorWithTheme(config: ResponsiveConfig, width: number): any {
    const responsiveBehavior = this.getResponsiveBehavior(config, width)
    if (!responsiveBehavior) return null
    
    // Apply theme to all layouts
    const themedLayouts = responsiveBehavior.layouts.map((layout: any) => ({
      ...layout,
      layoutProperties: this.applyThemeToLayout(layout.layoutProperties)
    }))
    
    const themedDefault = responsiveBehavior.default.map((layout: any) => ({
      ...layout,
      layoutProperties: this.applyThemeToLayout(layout.layoutProperties)
    }))
    
    return {
      ...responsiveBehavior,
      layouts: themedLayouts,
      default: themedDefault
    }
  }
  
  /**
   * Get object layout with theme integration
   */
  public static getObjectLayoutWithTheme(
    config: ResponsiveConfig, 
    objectId: string, 
    width: number
  ): any | null {
    const layout = this.getObjectLayout(config, objectId, width)
    if (!layout) return null
    
    return this.applyThemeToLayout(layout)
  }
  
  // ===== THEME CLASS UTILITIES =====
  
  /**
   * Get available theme classes from the active theme
   */
  public static getAvailableThemeClasses(): string[] {
    const theme = ThemeConfigLoader.getInstance().getActiveTheme()
    if (!theme?.themeClasses) return []
    
    return Object.keys(theme.themeClasses)
  }
  
  /**
   * Get a specific theme class definition
   */
  public static getThemeClass(className: string): any {
    const theme = ThemeConfigLoader.getInstance().getActiveTheme()
    if (!theme?.themeClasses) return null
    
    return theme.themeClasses[className] || null
  }
  
  /**
   * Apply a specific theme class to properties
   */
  public static applyThemeClass(
    properties: IStyleProperties, 
    className: string
  ): IStyleProperties {
    const theme = ThemeConfigLoader.getInstance().getActiveTheme()
    if (!theme?.themeClasses) return properties
    
    const themeClass = theme.themeClasses[className]
    if (!themeClass) return properties
    
    const themedProperties = { ...properties }
    
    // Apply class properties, with existing properties taking precedence
    Object.entries(themeClass).forEach(([key, value]) => {
      if (value !== undefined && themedProperties[key as keyof IStyleProperties] === undefined) {
        ;(themedProperties as any)[key] = value
      }
    })
    
    return themedProperties
  }
}

export default ResponsiveConfigLoader

/**
 * EXAMPLE USAGE:
 * 
 * // 1. Create a dynamic responsive config with custom breakpoints
 * const customResponsiveConfig: ResponsiveConfig = {
 *   default: [
 *     {
 *       id: 'header',
 *       breakpointCondition: { minWidth: 0, maxWidth: undefined },
 *       layoutProperties: { width: 'auto', height: 60, backgroundColor: '#333' }
 *     }
 *   ],
 *   responsiveSettings: {
 *     // Custom breakpoint names - not limited to xs, sm, md, lg, xl
 *     'mobile-portrait': [
 *       {
 *         id: 'header',
 *         breakpointCondition: { minWidth: 0, maxWidth: 767 },
 *         layoutProperties: { height: 50, backgroundColor: '#222' }
 *       }
 *     ],
 *     'mobile-landscape': [
 *       {
 *         id: 'header',
 *         breakpointCondition: { minWidth: 768, maxWidth: 1023 },
 *         layoutProperties: { height: 55, backgroundColor: '#444' }
 *       }
 *     ],
 *     'tablet': [
 *       {
 *         id: 'header',
 *         breakpointCondition: { minWidth: 1024, maxWidth: 1439 },
 *         layoutProperties: { height: 70, backgroundColor: '#555' }
 *       }
 *     ],
 *     'desktop': [
 *       {
 *         id: 'header',
 *         breakpointCondition: { minWidth: 1440, maxWidth: undefined },
 *         layoutProperties: { height: 80, backgroundColor: '#666' }
 *       }
 *     ]
 *   },
 *   breakpointMetadata: {
 *     'mobile-portrait': { name: 'Mobile Portrait', minWidth: 0, maxWidth: 767 },
 *     'mobile-landscape': { name: 'Mobile Landscape', minWidth: 768, maxWidth: 1023 },
 *     'tablet': { name: 'Tablet', minWidth: 1024, maxWidth: 1439 },
 *     'desktop': { name: 'Desktop', minWidth: 1440, maxWidth: undefined }
 *   }
 * }
 * 
 * // 2. Register the config
 * const loader = ResponsiveConfigLoader.getInstance()
 * loader.registerConfig('myScene', customResponsiveConfig)
 * 
 * // 3. Use the enhanced utilities
 * const config = loader.loadConfig('myScene')
 * if (config) {
 *   // Get current breakpoint for screen width 1200px
 *   const currentBreakpoint = ResponsiveConfigLoader.getCurrentBreakpointKey(config, 1200)
 *   // Returns: 'tablet'
 *   
 *   // Get layout for header at current screen size
 *   const headerLayout = ResponsiveConfigLoader.getObjectLayout(config, 'header', 1200)
 *   // Returns: { height: 70, backgroundColor: '#555' }
 *   
 *   // Get all layouts for header across all breakpoints
 *   const allHeaderLayouts = ResponsiveConfigLoader.getObjectLayoutsAcrossBreakpoints(config, 'header')
 *   // Returns: { default: {...}, 'mobile-portrait': {...}, 'mobile-landscape': {...}, 'tablet': {...}, 'desktop': {...} }
 *   
 *   // Get breakpoint information
 *   const info = ResponsiveConfigLoader.getBreakpointInfo(config)
 *   // Returns: { breakpoints: ['mobile-portrait', 'mobile-landscape', 'tablet', 'desktop'], objectCount: 1, hasDefault: true }
 *   
 *   // Validate the config
 *   const validation = ResponsiveConfigLoader.validateConfig(config)
 *   // Returns: { isValid: true, errors: [], warnings: [] }
 * }
 * 
 * // 4. The system automatically handles:
 * // - Dynamic breakpoint names (not limited to standard xs, sm, md, lg, xl)
 * // - Custom breakpoint conditions with minWidth/maxWidth
 * // - Priority system (default > responsive breakpoints)
 * // - Fallback to legacy desktop/mobile system
 * // - Validation and error checking
 * // - Comprehensive utility methods for responsive behavior
 */
