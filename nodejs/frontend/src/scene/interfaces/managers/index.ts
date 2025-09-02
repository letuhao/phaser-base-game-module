/**
 * Scene Manager Interfaces Index
 *
 * Centralized export for all scene manager interfaces
 */

export type { ISceneElementManager } from './ISceneElementManager';
export type { ISceneConfigManager } from './ISceneConfigManager';
export type { ISceneBuilderManager } from './ISceneBuilderManager';

export { ElementManagerOperation } from '../../enums';
export { ConfigManagerOperation } from '../../enums';
export { BuilderManagerOperation } from '../../enums';

/**
 * Scene manager interfaces bundle
 */
export const SCENE_MANAGER_INTERFACES = {
  ISceneElementManager: 'ISceneElementManager',
  ISceneConfigManager: 'ISceneConfigManager',
  ISceneBuilderManager: 'ISceneBuilderManager',
} as const;

export type SceneManagerInterface =
  (typeof SCENE_MANAGER_INTERFACES)[keyof typeof SCENE_MANAGER_INTERFACES];
