/**
 * Scene Asset Interfaces Index
 * 
 * Centralized export for all scene asset interfaces
 */

export type { ISceneAssetConfig } from './ISceneAssetConfig';
export type { ISceneAssetLoader } from './ISceneAssetLoader';

export { SceneLoadingPhase, SceneLoadingState } from './ISceneAssetLoader';

/**
 * Scene asset interfaces bundle
 */
export const SCENE_ASSET_INTERFACES = {
  ISceneAssetConfig: 'ISceneAssetConfig',
  ISceneAssetLoader: 'ISceneAssetLoader',
} as const;

export type SceneAssetInterface = typeof SCENE_ASSET_INTERFACES[keyof typeof SCENE_ASSET_INTERFACES];
