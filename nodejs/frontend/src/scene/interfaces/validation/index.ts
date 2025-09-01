/**
 * Scene Validation Interfaces Index
 * 
 * Centralized export for all scene validation interfaces
 */

export type { ISceneValidator } from './ISceneValidator';

export { ValidationResultType, ValidationRuleType } from './ISceneValidator';

/**
 * Scene validation interfaces bundle
 */
export const SCENE_VALIDATION_INTERFACES = {
  ISceneValidator: 'ISceneValidator',
} as const;

export type SceneValidationInterface = typeof SCENE_VALIDATION_INTERFACES[keyof typeof SCENE_VALIDATION_INTERFACES];
