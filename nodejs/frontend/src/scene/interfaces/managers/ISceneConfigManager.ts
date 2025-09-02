/**
 * Scene Configuration Manager Interface
 *
 * Defines management functionality for scene configurations.
 */

import type { ISceneConfig } from '../ISceneConfig';
import { ExportFormat, ConfigManagerOperation } from '../../enums';
import type { SceneConfig } from '../ISceneConfig';
import type { SceneType } from '../../enums';
import type { SceneElementConfig } from '../ISceneElement';

// ConfigManagerOperation is now imported from centralized enums

/**
 * Configuration manager configuration
 */
export interface ConfigManagerConfig {
  maxConfigs: number;
  enableCaching: boolean;
  enableValidation: boolean;
  autoSave: boolean;
  saveInterval: number;
  metadata?: Record<string, any>;
}

/**
 * Configuration manager statistics
 */
export interface ConfigManagerStatistics {
  totalConfigs: number;
  loadedConfigs: number;
  cachedConfigs: number;
  configsByType: Record<SceneType, number>;
  operationsPerformed: Record<ConfigManagerOperation, number>;
  lastSaveTime: number;
  lastLoadTime: number;
}

/**
 * Interface for scene configuration managers
 */
export interface ISceneConfigManager {
  readonly managerId: string;

  /** Manager configuration */
  managerConfig: ConfigManagerConfig;

  /** Managed configurations */
  managedConfigs: Map<string, ISceneConfig>;

  /** Configuration cache */
  configCache: Map<string, SceneConfig>;

  /** Manager statistics */
  managerStatistics: ConfigManagerStatistics;

  /** Manager metadata */
  managerMetadata: Record<string, any>;

  /** Set manager configuration */
  setManagerConfig(config: ConfigManagerConfig): this;

  /** Set manager metadata */
  setManagerMetadata(metadata: Record<string, any>): this;

  /** Get manager configuration */
  getManagerConfig(): ConfigManagerConfig;

  /** Get managed configurations */
  getManagedConfigs(): Map<string, ISceneConfig>;

  /** Get manager statistics */
  getManagerStatistics(): ConfigManagerStatistics;

  /** Get manager metadata */
  getManagerMetadata(): Record<string, any>;

  /** Register configuration */
  registerConfig(config: ISceneConfig): this;

  /** Unregister configuration */
  unregisterConfig(configId: string): this;

  /** Get configuration by ID */
  getConfigById(configId: string): ISceneConfig | null;

  /** Get configurations by type */
  getConfigsByType(sceneType: SceneType): ISceneConfig[];

  /** Load configuration */
  loadConfig(configId: string, source: string): Promise<ISceneConfig>;

  /** Save configuration */
  saveConfig(config: ISceneConfig, destination: string): Promise<boolean>;

  /** Validate configuration */
  validateConfig(config: SceneConfig): boolean;

  /** Clone configuration */
  cloneConfig(configId: string, newConfigId: string): Promise<ISceneConfig>;

  /** Merge configurations */
  mergeConfigs(
    baseConfigId: string,
    overrideConfigId: string,
    newConfigId: string
  ): Promise<ISceneConfig>;

  /** Export configuration */
  exportConfig(configId: string, format: ExportFormat): Promise<string>;

  /** Import configuration */
  importConfig(configData: string, format: ExportFormat, configId: string): Promise<ISceneConfig>;

  /** Get element configuration by ID */
  getElementConfigById(configId: string, elementId: string): SceneElementConfig | null;

  /** Update element configuration */
  updateElementConfig(
    configId: string,
    elementId: string,
    updates: Partial<SceneElementConfig>
  ): Promise<boolean>;

  /** Add element configuration */
  addElementConfig(
    configId: string,
    elementConfig: SceneElementConfig,
    parentId?: string
  ): Promise<boolean>;

  /** Remove element configuration */
  removeElementConfig(configId: string, elementId: string): Promise<boolean>;

  /** Check if configuration exists */
  hasConfig(configId: string): boolean;

  /** Check if configuration is valid */
  isConfigValid(configId: string): boolean;

  /** Get configuration count */
  getConfigCount(): number;

  /** Clear configuration cache */
  clearConfigCache(): this;

  /** Clear all configurations */
  clearAllConfigs(): Promise<this>;

  /** Update manager */
  updateManager(deltaTime: number): void;
}
