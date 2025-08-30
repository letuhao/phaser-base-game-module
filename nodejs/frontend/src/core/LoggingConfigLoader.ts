import { logger } from './Logger'
import { LoggerConfig } from '../types/logging/LoggerTypes'
import { LEVIS2025R3_LOGGING_CONFIG } from '../runtime/scene/levis2025R3.logging.config'

/**
 * Logging configuration loader for scenes
 * Loads and applies scene-specific logging configurations
 * Common utility that can be used by all scenes
 */
export class LoggingConfigLoader {
  private static instance: LoggingConfigLoader
  private loadedConfigs: Map<string, LoggerConfig> = new Map()
  
  private constructor() {
    this.initializeDefaultConfigs()
  }
  
  /**
   * Get singleton instance
   */
  public static getInstance(): LoggingConfigLoader {
    if (!LoggingConfigLoader.instance) {
      LoggingConfigLoader.instance = new LoggingConfigLoader()
    }
    return LoggingConfigLoader.instance
  }
  
  /**
   * Initialize default configurations
   */
  private initializeDefaultConfigs(): void {
    // Register default scene configurations
    this.registerConfig('levis2025R3', LEVIS2025R3_LOGGING_CONFIG)
    
    // You can add more scene configs here
    // this.registerConfig('otherScene', OTHER_SCENE_CONFIG)
  }
  
  /**
   * Register a logging configuration for a scene
   */
  public registerConfig(sceneName: string, config: LoggerConfig): void {
    this.loadedConfigs.set(sceneName, config)
    logger.info('LoggingConfigLoader', `Registered logging config for scene: ${sceneName}`)
  }
  
  /**
   * Load and apply logging configuration for a scene
   */
  public loadConfig(sceneName: string): boolean {
    const config = this.loadedConfigs.get(sceneName)
    
    if (!config) {
      logger.warn('LoggingConfigLoader', `No logging config found for scene: ${sceneName}, using default`)
      return false
    }
    
    try {
      // Apply the configuration to the logger
      logger.updateConfig(config)
      
      // Log the configuration change
      logger.info('LoggingConfigLoader', `Applied logging config for scene: ${sceneName}`, {
        globalLevel: config.globalLevel,
        consoleEnabled: config.console.enabled,
        serverEnabled: config.server.enabled,
        objectCount: config.objects.length
      })
      
      return true
    } catch (error) {
      logger.error('LoggingConfigLoader', `Failed to apply logging config for scene: ${sceneName}`, error)
      return false
    }
  }
  
  /**
   * Get available scene configurations
   */
  public getAvailableConfigs(): string[] {
    return Array.from(this.loadedConfigs.keys())
  }
  
  /**
   * Check if a scene has a logging configuration
   */
  public hasConfig(sceneName: string): boolean {
    return this.loadedConfigs.has(sceneName)
  }
  
  /**
   * Get a specific scene configuration
   */
  public getConfig(sceneName: string): LoggerConfig | undefined {
    return this.loadedConfigs.get(sceneName)
  }
  
  /**
   * Reset logger to default configuration
   */
  public resetToDefault(): void {
    try {
      // Reset to default config
      logger.updateConfig({
        globalLevel: 2, // INFO level
        console: { enabled: true, colors: true, showData: true, showStackTrace: true, maxDataDepth: 3 },
        server: { 
          enabled: true, 
          endpoint: '', 
          batchSize: 10, 
          retryAttempts: 1, 
          retryDelay: 3000, 
          timeout: 10000,
          sendErrorsImmediately: true,
          sendGameEventsImmediately: true,
          includePerformanceData: true,
          includeUserAgent: true,
          includeSessionData: true
        }
      })
      
      logger.info('LoggingConfigLoader', 'Reset logger to default configuration')
    } catch (error) {
      logger.error('LoggingConfigLoader', 'Failed to reset logger to default configuration', error)
    }
  }
}

// Export convenience function
export const loadSceneLoggingConfig = (sceneName: string): boolean => {
  return LoggingConfigLoader.getInstance().loadConfig(sceneName)
}

export default LoggingConfigLoader
