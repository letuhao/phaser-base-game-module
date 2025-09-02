/**
 * Scene Performance Interfaces Index
 *
 * Centralized export for all scene performance interfaces
 */

export type { IScenePerformanceMonitor } from './IScenePerformanceMonitor';

export { ScenePerformanceMonitorOperation } from '../../enums';

/**
 * Scene performance interfaces bundle
 */
export const SCENE_PERFORMANCE_INTERFACES = {
  IScenePerformanceMonitor: 'IScenePerformanceMonitor',
} as const;

export type ScenePerformanceInterface =
  (typeof SCENE_PERFORMANCE_INTERFACES)[keyof typeof SCENE_PERFORMANCE_INTERFACES];
