/**
 * Scene Event Interfaces Index
 * 
 * Centralized export for all scene event interfaces
 */

export type { ISceneEventSystem } from './ISceneEventSystem';

export { SceneEventType, SceneEventPriority } from '../../enums';

/**
 * Scene event interfaces bundle
 */
export const SCENE_EVENT_INTERFACES = {
  ISceneEventSystem: 'ISceneEventSystem',
} as const;

export type SceneEventInterface = typeof SCENE_EVENT_INTERFACES[keyof typeof SCENE_EVENT_INTERFACES];
