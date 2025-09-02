/**
 * Scene Strategy Interfaces Index
 *
 * Centralized export for all scene strategy interfaces
 */

export type { ISceneBuildingStrategy } from './ISceneBuildingStrategy';
export type { ISceneValidationStrategy } from './ISceneValidationStrategy';

export { SceneBuildingStrategyOperation } from './ISceneBuildingStrategy';
export { SceneValidationStrategyOperation } from '../../enums';

/**
 * Scene strategy interfaces bundle
 */
export const SCENE_STRATEGY_INTERFACES = {
  ISceneBuildingStrategy: 'ISceneBuildingStrategy',
  ISceneValidationStrategy: 'ISceneValidationStrategy',
} as const;

export type SceneStrategyInterface =
  (typeof SCENE_STRATEGY_INTERFACES)[keyof typeof SCENE_STRATEGY_INTERFACES];
