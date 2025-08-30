import { logger } from './Logger'

/**
 * Generic asset interface for asset loading
 */
export interface AssetConfig {
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

/**
 * Generic asset loader configuration interface
 */
export interface AssetLoaderConfig {
  basePath: string
  backgrounds: {
    desktop: AssetConfig
    mobile: AssetConfig
    mobileOrigin: AssetConfig
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

/**
 * Asset loader configuration loader for scenes
 * Loads and manages asset loading configurations
 */
export class AssetLoaderConfigLoader {
  private static instance: AssetLoaderConfigLoader
  private loadedConfigs: Map<string, AssetLoaderConfig> = new Map()
  
  private constructor() {
    // No default configs - scenes must register their own configs
  }
  
  /**
   * Get singleton instance
   */
  public static getInstance(): AssetLoaderConfigLoader {
    if (!AssetLoaderConfigLoader.instance) {
      AssetLoaderConfigLoader.instance = new AssetLoaderConfigLoader()
    }
    return AssetLoaderConfigLoader.instance
  }
  
  /**
   * Register an asset loader configuration for a scene
   */
  public registerConfig(sceneName: string, config: AssetLoaderConfig): void {
    this.loadedConfigs.set(sceneName, config)
    logger.info('AssetLoaderConfigLoader', `Registered asset loader config for scene: ${sceneName}`)
  }
  
  /**
   * Load asset loader configuration for a scene
   */
  public loadConfig(sceneName: string): AssetLoaderConfig | null {
    const config = this.loadedConfigs.get(sceneName)
    
    if (!config) {
      logger.warn('AssetLoaderConfigLoader', `No asset loader config found for scene: ${sceneName}`)
      return null
    }
    
    logger.info('AssetLoaderConfigLoader', `Loaded asset loader config for scene: ${sceneName}`)
    return config
  }
  
  /**
   * Check if a scene has an asset loader configuration
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
   * Get background asset based on device type
   */
  public getBackgroundAsset(sceneName: string, isDesktop: boolean): string | null {
    const config = this.loadedConfigs.get(sceneName)
    if (!config) return null
    
    const asset = isDesktop ? config.backgrounds.desktop : config.backgrounds.mobile
    return asset ? asset.path : null
  }
  
  /**
   * Get asset path by key
   */
  public getAssetPath(sceneName: string, key: string): string | null {
    const config = this.loadedConfigs.get(sceneName)
    if (!config) return null
    
    // Search through all assets to find the key
    const allAssets = [
      config.backgrounds.desktop,
      config.backgrounds.mobile,
      config.backgrounds.mobileOrigin
    ]
    
    const asset = allAssets.find(a => a.key === key)
    return asset ? asset.path : null
  }
  
  /**
   * Check if an asset is required
   */
  public isAssetRequired(sceneName: string, key: string): boolean {
    const config = this.loadedConfigs.get(sceneName)
    if (!config) return false
    
    return config.validation.required.includes(key)
  }
  
  /**
   * Get asset fallback path
   */
  public getAssetFallback(sceneName: string, key: string): string | null {
    const config = this.loadedConfigs.get(sceneName)
    if (!config) return null
    
    return config.validation.fallbacks[key] || null
  }
}

export default AssetLoaderConfigLoader
