import { logger } from './Logger'
import { LoggingConfigLoader, LoggerConfig } from './LoggingConfigLoader'
import { ResponsiveConfigLoader, ResponsiveConfig } from './ResponsiveConfigLoader'
import { SceneLoaderConfigLoader, SceneConfig } from './SceneLoaderConfigLoader'
import { AssetLoaderConfigLoader, AssetLoaderConfig } from './AssetLoaderConfigLoader'

/**
 * Unified configuration manager for scenes
 * Coordinates all configuration loaders and provides a single interface
 */
export class ConfigManager {
  private static instance: ConfigManager
  private loggingLoader: LoggingConfigLoader
  private responsiveLoader: ResponsiveConfigLoader
  private sceneLoader: SceneLoaderConfigLoader
  private assetLoader: AssetLoaderConfigLoader
  
  private constructor() {
    this.loggingLoader = LoggingConfigLoader.getInstance()
    this.responsiveLoader = ResponsiveConfigLoader.getInstance()
    this.sceneLoader = SceneLoaderConfigLoader.getInstance()
    this.assetLoader = AssetLoaderConfigLoader.getInstance()
  }
  
  /**
   * Get singleton instance
   */
  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager()
    }
    return ConfigManager.instance
  }
  
  /**
   * Register all configurations for a scene
   */
  public registerSceneConfigs(
    sceneName: string,
    loggingConfig: LoggerConfig,
    responsiveConfig: ResponsiveConfig,
    sceneConfig: SceneConfig,
    assetConfig: AssetLoaderConfig
  ): void {
    try {
      // Register all configs
      this.loggingLoader.registerConfig(sceneName, loggingConfig)
      this.responsiveLoader.registerConfig(sceneName, responsiveConfig)
      this.sceneLoader.registerConfig(sceneName, sceneConfig)
      this.assetLoader.registerConfig(sceneName, assetConfig)
      
      logger.info('ConfigManager', `Registered all configurations for scene: ${sceneName}`)
    } catch (error) {
      logger.error('ConfigManager', `Failed to register configurations for scene: ${sceneName}`, error)
    }
  }
  
  /**
   * Load all configurations for a scene
   */
  public loadSceneConfigs(sceneName: string): {
    logging: boolean
    responsive: ResponsiveConfig | null
    scene: SceneConfig | null
    asset: AssetLoaderConfig | null
  } {
    try {
      // Load logging config
      const loggingLoaded = this.loggingLoader.loadConfig(sceneName)
      
      // Load other configs
      const responsiveConfig = this.responsiveLoader.loadConfig(sceneName)
      const sceneConfig = this.sceneLoader.loadConfig(sceneName)
      const assetConfig = this.assetLoader.loadConfig(sceneName)
      
      const result = {
        logging: loggingLoaded,
        responsive: responsiveConfig,
        scene: sceneConfig,
        asset: assetConfig
      }
      
      logger.info('ConfigManager', `Loaded configurations for scene: ${sceneName}`, result)
      return result
      
    } catch (error) {
      logger.error('ConfigManager', `Failed to load configurations for scene: ${sceneName}`, error)
      return {
        logging: false,
        responsive: null,
        scene: null,
        asset: null
      }
    }
  }
  
  /**
   * Check if a scene has all required configurations
   */
  public hasAllConfigs(sceneName: string): boolean {
    return (
      this.loggingLoader.hasConfig(sceneName) &&
      this.responsiveLoader.hasConfig(sceneName) &&
      this.sceneLoader.hasConfig(sceneName) &&
      this.assetLoader.hasConfig(sceneName)
    )
  }
  
  /**
   * Get available scene configurations
   */
  public getAvailableScenes(): string[] {
    const loggingScenes = this.loggingLoader.getAvailableConfigs()
    const responsiveScenes = this.responsiveLoader.getAvailableConfigs()
    const sceneScenes = this.sceneLoader.getAvailableConfigs()
    const assetScenes = this.assetLoader.getAvailableConfigs()
    
    // Return scenes that have all configs
    return loggingScenes.filter(scene => 
      responsiveScenes.includes(scene) &&
      sceneScenes.includes(scene) &&
      assetScenes.includes(scene)
    )
  }
  
  /**
   * Get individual loaders for direct access if needed
   */
  public getLoggingLoader(): LoggingConfigLoader {
    return this.loggingLoader
  }
  
  public getResponsiveLoader(): ResponsiveConfigLoader {
    return this.responsiveLoader
  }
  
  public getSceneLoader(): SceneLoaderConfigLoader {
    return this.sceneLoader
  }
  
  public getAssetLoader(): AssetLoaderConfigLoader {
    return this.assetLoader
  }
}

export default ConfigManager
