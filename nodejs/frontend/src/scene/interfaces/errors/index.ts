/**
 * Scene Error Interfaces Index
 * 
 * Centralized export for all scene error interfaces
 */

export type { ISceneError } from './ISceneError';
export type { ISceneErrorHandler } from './ISceneErrorHandler';

export { SceneErrorType, SceneErrorSeverity } from './ISceneError';
export { ErrorHandlingStrategy } from './ISceneErrorHandler';

/**
 * Scene error interfaces bundle
 */
export const SCENE_ERROR_INTERFACES = {
  ISceneError: 'ISceneError',
  ISceneErrorHandler: 'ISceneErrorHandler',
} as const;

export type SceneErrorInterface = typeof SCENE_ERROR_INTERFACES[keyof typeof SCENE_ERROR_INTERFACES];
