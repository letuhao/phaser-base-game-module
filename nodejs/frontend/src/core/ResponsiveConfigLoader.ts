import { logger } from './Logger'

/**
 * Generic responsive configuration interface
 */
export interface ResponsiveConfig {
  breakpoints: {
    desktop: number
    mobile: number
  }
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
  deviceDetection: {
    enable: boolean
    breakpoint: 'desktop' | 'mobile'
  }
}

/**
 * Responsive configuration loader for scenes
 * Loads and manages responsive behavior configurations
 */
export class ResponsiveConfigLoader {
  private static instance: ResponsiveConfigLoader
  private loadedConfigs: Map<string, ResponsiveConfig> = new Map()
  
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
   * Detect device type based on screen width
   */
  public static detectDeviceType(width: number): 'desktop' | 'mobile' {
    return width >= 1024 ? 'desktop' : 'mobile'
  }
  
  /**
   * Get responsive behavior for current screen size
   */
  public static getResponsiveBehavior(config: ResponsiveConfig, width: number) {
    const deviceType = ResponsiveConfigLoader.detectDeviceType(width)
    return config[deviceType]
  }
}

export default ResponsiveConfigLoader
