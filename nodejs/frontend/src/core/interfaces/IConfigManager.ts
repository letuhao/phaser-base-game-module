import { LoggingConfigLoader, LoggerConfig } from '../LoggingConfigLoader';
import { ResponsiveConfigLoader, ResponsiveConfig } from '../ResponsiveConfigLoader';
import { SceneLoaderConfigLoader, SceneConfig } from '../SceneLoaderConfigLoader';
import type { IAssetManager } from '../../asset/interfaces/IAssetManager';
import type { ISceneAssetLoader } from '../../asset/interfaces/scene/ISceneAssetLoader';
import type { ISceneAssetConfigData } from '../../asset/interfaces/scene/ISceneAssetConfigData';
import type { ITheme } from '../../layout/interfaces/ITheme';

/**
 * Configuration manager interface
 * Defines the contract for unified configuration management across scenes
 */
export interface IConfigManager {
  /**
   * Register all configurations for a scene
   */
  registerSceneConfigs(
    sceneName: string,
    loggingConfig: LoggerConfig,
    responsiveConfig: ResponsiveConfig,
    sceneConfig: SceneConfig,
    assetConfig: ISceneAssetConfigData,
    themeConfig?: ITheme
  ): void;

  /**
   * Load all configurations for a scene
   */
  loadSceneConfigs(sceneName: string): {
    logging: boolean;
    responsive: ResponsiveConfig | null;
    scene: SceneConfig | null;
    asset: ISceneAssetLoader | null;
    theme: ITheme | null;
  };

  /**
   * Check if a scene has all required configurations
   */
  hasAllConfigs(sceneName: string): boolean;

  /**
   * Get available scene configurations
   */
  getAvailableScenes(): string[];

  /**
   * Get individual loaders for direct access if needed
   */
  getLoggingLoader(): LoggingConfigLoader;
  getResponsiveLoader(): ResponsiveConfigLoader;
  getSceneLoader(): SceneLoaderConfigLoader;
  getAssetManager(): IAssetManager;
  getSceneAssetLoader(sceneName: string): ISceneAssetLoader | null;
  getTheme(sceneName: string): ITheme | null;
  getAllThemes(): Map<string, ITheme>;
}
