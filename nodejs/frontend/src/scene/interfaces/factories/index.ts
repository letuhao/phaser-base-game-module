/**
 * Scene Factory Interfaces Index
 * 
 * Centralized export for all scene factory interfaces
 */

export type { ISceneElementFactory } from './ISceneElementFactory';
export type { ISceneFactory } from './ISceneFactory';

export { SceneElementFactoryOperation } from '../../enums';
export { SceneFactoryOperation } from '../../enums';

/**
 * Scene factory interfaces bundle
 */
export const SCENE_FACTORY_INTERFACES = {
  ISceneElementFactory: 'ISceneElementFactory',
  ISceneFactory: 'ISceneFactory',
} as const;

export type SceneFactoryInterface = typeof SCENE_FACTORY_INTERFACES[keyof typeof SCENE_FACTORY_INTERFACES];
