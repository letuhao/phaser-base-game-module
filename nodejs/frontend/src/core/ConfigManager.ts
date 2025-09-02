import { logger } from './Logger';
import { LoggingConfigLoader, LoggerConfig } from './LoggingConfigLoader';
import { ResponsiveConfigLoader, ResponsiveConfig } from './ResponsiveConfigLoader';
import { SceneLoaderConfigLoader, SceneConfig } from './SceneLoaderConfigLoader';
import { AssetManager } from '../asset/classes/AssetManager';
import { SceneAssetConfigLoader } from '../asset/classes/SceneAssetConfigLoader';
import type { IAssetManager } from '../asset/interfaces/IAssetManager';
import type { ISceneAssetLoader } from '../asset/interfaces/scene/ISceneAssetLoader';
import type { ISceneAssetConfigData } from '../asset/interfaces/scene/ISceneAssetConfigData';
import type { ITheme } from '../layout/interfaces/ITheme';
import type { IConfigManager } from './interfaces/IConfigManager';

/**
 * Unified configuration manager for scenes
 * Coordinates all configuration loaders and provides a single interface
 */
export class ConfigManager implements IConfigManager {
  private static instance: ConfigManager;
  private loggingLoader: LoggingConfigLoader;
  private responsiveLoader: ResponsiveConfigLoader;
  private sceneLoader: SceneLoaderConfigLoader;
  private assetManager: IAssetManager;
  private sceneAssetLoaders: Map<string, ISceneAssetLoader> = new Map();
  private themes: Map<string, ITheme> = new Map();

  private constructor() {
    this.loggingLoader = LoggingConfigLoader.getInstance();
    this.responsiveLoader = ResponsiveConfigLoader.getInstance();
    this.sceneLoader = SceneLoaderConfigLoader.getInstance();
    this.assetManager = new AssetManager('config-manager-asset-manager');
    // Themes are now managed directly without deprecated ThemeConfigLoader
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  /**
   * Register all configurations for a scene
   */
  public registerSceneConfigs(
    sceneName: string,
    loggingConfig: LoggerConfig,
    responsiveConfig: ResponsiveConfig,
    sceneConfig: SceneConfig,
    assetConfig: ISceneAssetConfigData,
    themeConfig?: ITheme
  ): void {
    try {
      // Register all configs
      this.loggingLoader.registerConfig(sceneName, loggingConfig);
      this.responsiveLoader.registerConfig(sceneName, responsiveConfig);
      this.sceneLoader.registerConfig(sceneName, sceneConfig);

      // Create and register scene asset loader with the newest asset system
      const sceneAssetLoader = new SceneAssetConfigLoader(
        `${sceneName}-asset-loader`,
        sceneName,
        this.assetManager,
        assetConfig
      );
      this.sceneAssetLoaders.set(sceneName, sceneAssetLoader);

      // Register theme config if provided
      if (themeConfig) {
        this.themes.set(sceneName, themeConfig);
        logger.debug(
          'ConfigManager',
          'registerSceneConfigs',
          'Registered theme configuration for scene',
          { sceneName }
        );
      }

      logger.debug(
        'ConfigManager',
        'registerSceneConfigs',
        'Registered all configurations for scene',
        { sceneName }
      );
    } catch (error) {
      logger.error(
        'ConfigManager',
        'registerSceneConfigs',
        'Failed to register configurations for scene',
        { sceneName, error }
      );
    }
  }

  /**
   * Load all configurations for a scene
   */
  public loadSceneConfigs(sceneName: string): {
    logging: boolean;
    responsive: ResponsiveConfig | null;
    scene: SceneConfig | null;
    asset: ISceneAssetLoader | null;
    theme: ITheme | null;
  } {
    try {
      // Load logging config
      const loggingLoaded = this.loggingLoader.loadConfig(sceneName);

      // Load other configs
      const responsiveConfig = this.responsiveLoader.loadConfig(sceneName);
      const sceneConfig = this.sceneLoader.loadConfig(sceneName);
      const sceneAssetLoader = this.sceneAssetLoaders.get(sceneName) || null;
      const themeConfig = this.themes.get(sceneName) || null;

      const result = {
        logging: loggingLoaded,
        responsive: responsiveConfig,
        scene: sceneConfig,
        asset: sceneAssetLoader,
        theme: themeConfig,
      };

      logger.debug('ConfigManager', 'loadSceneConfigs', 'Loaded configurations for scene', {
        sceneName,
        result,
      });
      return result;
    } catch (error) {
      logger.error('ConfigManager', 'loadSceneConfigs', 'Failed to load configurations for scene', {
        sceneName,
        error,
      });
      return {
        logging: false,
        responsive: null,
        scene: null,
        asset: null,
        theme: null,
      };
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
      this.sceneAssetLoaders.has(sceneName)
      // Note: Theme config is optional, so we don't check for it here
    );
  }

  /**
   * Get available scene configurations
   */
  public getAvailableScenes(): string[] {
    const loggingScenes = this.loggingLoader.getAvailableConfigs();
    const responsiveScenes = this.responsiveLoader.getAvailableConfigs();
    const sceneScenes = this.sceneLoader.getAvailableConfigs();
    const assetScenes = Array.from(this.sceneAssetLoaders.keys());

    // Return scenes that have all configs
    return loggingScenes.filter(
      scene =>
        responsiveScenes.includes(scene) &&
        sceneScenes.includes(scene) &&
        assetScenes.includes(scene)
    );
  }

  /**
   * Get individual loaders for direct access if needed
   */
  public getLoggingLoader(): LoggingConfigLoader {
    return this.loggingLoader;
  }

  public getResponsiveLoader(): ResponsiveConfigLoader {
    return this.responsiveLoader;
  }

  public getSceneLoader(): SceneLoaderConfigLoader {
    return this.sceneLoader;
  }

  public getAssetManager(): IAssetManager {
    return this.assetManager;
  }

  public getSceneAssetLoader(sceneName: string): ISceneAssetLoader | null {
    return this.sceneAssetLoaders.get(sceneName) || null;
  }

  public getTheme(sceneName: string): ITheme | null {
    return this.themes.get(sceneName) || null;
  }

  public getAllThemes(): Map<string, ITheme> {
    return new Map(this.themes);
  }
}

export default ConfigManager;
