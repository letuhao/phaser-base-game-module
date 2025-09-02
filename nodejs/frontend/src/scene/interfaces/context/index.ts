/**
 * Scene Context Interfaces Index
 *
 * Centralized export for all scene context interfaces
 */

export type { ISceneContext } from './ISceneContext';
export type { ISceneBuilderContext } from './ISceneBuilderContext';

export { SceneContextType, SceneContextState } from './ISceneContext';
export { BuilderContextOperation } from './ISceneBuilderContext';

/**
 * Scene context interfaces bundle
 */
export const SCENE_CONTEXT_INTERFACES = {
  ISceneContext: 'ISceneContext',
  ISceneBuilderContext: 'ISceneBuilderContext',
} as const;

export type SceneContextInterface =
  (typeof SCENE_CONTEXT_INTERFACES)[keyof typeof SCENE_CONTEXT_INTERFACES];
