/**
 * Scene Configuration Interface
 *
 * Defines scene configuration structure that integrates with
 * Game Object, Layout, and Unit systems.
 */

import type { SceneElementConfig } from './ISceneElement';
import type { IStyle } from '../../layout/interfaces/IStyle';
import type { IUnit } from '../../unit/interfaces/IUnit';
import type { ISceneConfigManager } from './managers/ISceneConfigManager';
import { GradientType, AssetType, TransitionType, SceneType, SceneState } from '../enums';
// TransitionDirection is imported from centralized enums but not used in this file

// SceneType and SceneState are now imported from centralized enums

/**
 * Scene configuration
 */
export interface SceneConfig {
  sceneId: string;
  sceneName: string;
  sceneType: SceneType;
  version: string;

  // Scene dimensions using unit system
  dimensions?: {
    width: IUnit;
    height: IUnit;
    depth?: IUnit;
  };

  // Scene background
  background?: {
    color?: string;
    image?: string;
    video?: string;
    gradient?: {
      type: GradientType;
      colors: string[];
      stops?: number[];
    };
  };

  // Scene layout properties
  layout?: IStyle;

  // Responsive configuration
  responsive?: {
    breakpoints: Record<
      string,
      {
        minWidth?: IUnit;
        maxWidth?: IUnit;
        elements: Record<string, Partial<SceneElementConfig>>;
      }
    >;
    defaultBreakpoint: string;
  };

  // Theme configuration
  theme?: {
    themeName: string;
    themeClasses: Record<string, any>;
    customProperties?: Record<string, any>;
  };

  // Scene elements (HTML-like structure)
  elements: SceneElementConfig[];

  // Asset loading configuration
  assets?: {
    preload: boolean;
    priority: string[];
    bundles: Record<
      string,
      {
        type: AssetType;
        files: string[];
      }
    >;
  };

  // Scene transitions
  transitions?: {
    enter?: {
      type: TransitionType;
      duration: number;
      easing?: string;
    };
    exit?: {
      type: TransitionType;
      duration: number;
      easing?: string;
    };
  };

  // Scene lifecycle hooks
  lifecycle?: {
    onCreate?: string;
    onActivate?: string;
    onPause?: string;
    onResume?: string;
    onDestroy?: string;
  };

  // Scene metadata
  metadata?: Record<string, any>;
}

/**
 * Interface for scene configuration management
 */
export interface ISceneConfig {
  readonly configId: string;

  /** Scene configuration */
  sceneConfig: SceneConfig;

  /** Configuration state */
  configState: SceneState;

  /** Configuration manager */
  configManager: ISceneConfigManager;

  /** Configuration validation */
  configValidation: boolean;

  /** Configuration last modified */
  configLastModified: number;

  /** Configuration metadata */
  configMetadata: Record<string, any>;

  /** Set scene configuration */
  setSceneConfig(config: SceneConfig): this;

  /** Set configuration state */
  setConfigState(state: SceneState): this;

  /** Set configuration manager */
  setConfigManager(manager: ISceneConfigManager): this;

  /** Set configuration validation */
  setConfigValidation(validation: boolean): this;

  /** Set configuration last modified */
  setConfigLastModified(time: number): this;

  /** Set configuration metadata */
  setConfigMetadata(metadata: Record<string, any>): this;

  /** Get scene configuration */
  getSceneConfig(): SceneConfig;

  /** Get configuration state */
  getConfigState(): SceneState;

  /** Get configuration manager */
  getConfigManager(): ISceneConfigManager;

  /** Get configuration validation */
  getConfigValidation(): boolean;

  /** Get configuration last modified */
  getConfigLastModified(): number;

  /** Get configuration metadata */
  getConfigMetadata(): Record<string, any>;

  /** Validate configuration */
  validateConfig(): boolean;

  /** Get element by ID */
  getElementById(elementId: string): SceneElementConfig | null;

  /** Get elements by type */
  getElementsByType(elementType: string): SceneElementConfig[];

  /** Get root elements */
  getRootElements(): SceneElementConfig[];

  /** Get responsive configuration for breakpoint */
  getResponsiveConfig(breakpoint: string): any;

  /** Get theme configuration */
  getThemeConfig(): any;

  /** Update configuration */
  updateConfig(updates: Partial<SceneConfig>): this;

  /** Clone configuration */
  cloneConfig(): SceneConfig;

  /** Export configuration */
  exportConfig(): string;

  /** Import configuration */
  importConfig(configData: string): this;
}
