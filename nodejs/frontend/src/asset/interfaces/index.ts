/**
 * Asset System Interfaces Index
 *
 * Centralized export for all asset system interfaces
 */

// ============================================================================
// CORE ASSET INTERFACES
// ============================================================================

export type { IAsset } from './IAsset';
export type { IAssetBundle } from './IAssetBundle';
export type { IAssetLoader } from './IAssetLoader';
export type { IAssetManager } from './IAssetManager';

// Configuration data interfaces
export type { IAssetConfigData, IAssetConfigDataExtended } from './IAssetConfigData';
export type {
  IAssetBundleConfigData,
  IAssetBundleConfigDataExtended,
} from './IAssetBundleConfigData';

// Manager interfaces
export * from './managers';

// Factory interfaces
export * from './factories';

// Strategy interfaces
export * from './strategies';

export { AssetType, AssetState, AssetPriority } from './IAsset';
export { BundleType, BundleState } from './IAssetBundle';
export {
  LoaderType,
  LoaderState,
  LoadingStrategy,
  LoadingStrategyType,
  ManagerOperation,
  FactoryOperation,
  LoaderFactoryOperation,
  ValidationStrategyType,
  SceneAssetPhase,
} from '../enums';

// ============================================================================
// SCENE ASSET INTERFACES
// ============================================================================

export type { ISceneAssetConfig } from './scene/ISceneAssetConfig';
export type { ISceneAssetLoader } from './scene/ISceneAssetLoader';
export type {
  ISceneAssetConfigData,
  ISceneAssetConfigDataExtended,
} from './scene/ISceneAssetConfigData';

export { SceneLoadingPhase, SceneLoadingState } from './scene/ISceneAssetLoader';

// ============================================================================
// ASSET INTERFACE BUNDLES
// ============================================================================

/**
 * Core asset interfaces
 */
export const CORE_ASSET_INTERFACES = {
  IAsset: 'IAsset',
  IAssetBundle: 'IAssetBundle',
  IAssetLoader: 'IAssetLoader',
  IAssetManager: 'IAssetManager',
} as const;

/**
 * Asset manager interfaces
 */
export const ASSET_MANAGER_INTERFACES = {
  IAssetCacheManager: 'IAssetCacheManager',
  IAssetPoolManager: 'IAssetPoolManager',
  IAssetValidationManager: 'IAssetValidationManager',
  IAssetStatisticsManager: 'IAssetStatisticsManager',
} as const;

/**
 * Asset factory interfaces
 */
export const ASSET_FACTORY_INTERFACES = {
  IAssetFactory: 'IAssetFactory',
  IAssetBundleFactory: 'IAssetBundleFactory',
  IAssetLoaderFactory: 'IAssetLoaderFactory',
} as const;

/**
 * Asset strategy interfaces
 */
export const ASSET_STRATEGY_INTERFACES = {
  ILoadingStrategy: 'ILoadingStrategy',
  ICachingStrategy: 'ICachingStrategy',
  IValidationStrategy: 'IValidationStrategy',
} as const;

/**
 * Scene asset interfaces
 */
export const SCENE_ASSET_INTERFACES = {
  ISceneAssetConfig: 'ISceneAssetConfig',
  ISceneAssetLoader: 'ISceneAssetLoader',
} as const;

/**
 * All asset interfaces
 */
export const ASSET_INTERFACES = {
  ...CORE_ASSET_INTERFACES,
  ...ASSET_MANAGER_INTERFACES,
  ...ASSET_FACTORY_INTERFACES,
  ...ASSET_STRATEGY_INTERFACES,
  ...SCENE_ASSET_INTERFACES,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CoreAssetInterface = (typeof CORE_ASSET_INTERFACES)[keyof typeof CORE_ASSET_INTERFACES];
export type AssetManagerInterface =
  (typeof ASSET_MANAGER_INTERFACES)[keyof typeof ASSET_MANAGER_INTERFACES];
export type AssetFactoryInterface =
  (typeof ASSET_FACTORY_INTERFACES)[keyof typeof ASSET_FACTORY_INTERFACES];
export type AssetStrategyInterface =
  (typeof ASSET_STRATEGY_INTERFACES)[keyof typeof ASSET_STRATEGY_INTERFACES];
export type SceneAssetInterface =
  (typeof SCENE_ASSET_INTERFACES)[keyof typeof SCENE_ASSET_INTERFACES];
export type AssetInterface = (typeof ASSET_INTERFACES)[keyof typeof ASSET_INTERFACES];
