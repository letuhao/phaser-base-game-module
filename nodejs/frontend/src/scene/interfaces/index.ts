/**
 * Scene System Interfaces Index
 * 
 * Centralized export for all scene system interfaces
 */

// ============================================================================
// SCENE INTERFACES
// ============================================================================

export type { ISceneElement } from './ISceneElement';
export type { ISceneConfig } from './ISceneConfig';
export type { ISceneBuilder } from './ISceneBuilder';
export type { ISceneManager } from './ISceneManager';

// ============================================================================
// SCENE ERROR INTERFACES
// ============================================================================

export * from './errors';

// ============================================================================
// SCENE MANAGER INTERFACES
// ============================================================================

export * from './managers';

// ============================================================================
// SCENE VALIDATION INTERFACES
// ============================================================================

export * from './validation';

// ============================================================================
// SCENE CONTEXT INTERFACES
// ============================================================================

export * from './context';

// ============================================================================
// SCENE FACTORY INTERFACES
// ============================================================================

export * from './factories';

// ============================================================================
// SCENE STRATEGY INTERFACES
// ============================================================================

export * from './strategies';

// ============================================================================
// SCENE EVENT INTERFACES
// ============================================================================

export * from './events';

// ============================================================================
// SCENE PERFORMANCE INTERFACES
// ============================================================================

export * from './performance';

// ============================================================================
// SCENE ENUMS
// ============================================================================

export { SceneElementType, SceneElementState } from './ISceneElement';
export { SceneType, SceneState } from './ISceneConfig';
export { SceneBuilderType, SceneBuilderState } from './ISceneBuilder';
export { SceneTransitionType, SceneTransitionState } from './ISceneManager';

// ============================================================================
// SCENE INTERFACE BUNDLES
// ============================================================================

/**
 * Core scene interfaces
 */
export const CORE_SCENE_INTERFACES = {
  ISceneElement: 'ISceneElement',
  ISceneConfig: 'ISceneConfig',
} as const;

/**
 * Scene building interfaces
 */
export const SCENE_BUILDING_INTERFACES = {
  ISceneBuilder: 'ISceneBuilder',
} as const;

/**
 * Scene management interfaces
 */
export const SCENE_MANAGEMENT_INTERFACES = {
  ISceneManager: 'ISceneManager',
} as const;

/**
 * Scene factory interfaces
 */
export const SCENE_FACTORY_INTERFACES = {
  ISceneElementFactory: 'ISceneElementFactory',
  ISceneFactory: 'ISceneFactory',
} as const;

/**
 * Scene strategy interfaces
 */
export const SCENE_STRATEGY_INTERFACES = {
  ISceneBuildingStrategy: 'ISceneBuildingStrategy',
  ISceneValidationStrategy: 'ISceneValidationStrategy',
} as const;

/**
 * Scene event interfaces
 */
export const SCENE_EVENT_INTERFACES = {
  ISceneEventSystem: 'ISceneEventSystem',
} as const;

/**
 * Scene performance interfaces
 */
export const SCENE_PERFORMANCE_INTERFACES = {
  IScenePerformanceMonitor: 'IScenePerformanceMonitor',
} as const;

/**
 * All scene interfaces
 */
export const SCENE_INTERFACES = {
  ...CORE_SCENE_INTERFACES,
  ...SCENE_BUILDING_INTERFACES,
  ...SCENE_MANAGEMENT_INTERFACES,
  ...SCENE_ERROR_INTERFACES,
  ...SCENE_MANAGER_INTERFACES,
  ...SCENE_VALIDATION_INTERFACES,
  ...SCENE_CONTEXT_INTERFACES,
  ...SCENE_FACTORY_INTERFACES,
  ...SCENE_STRATEGY_INTERFACES,
  ...SCENE_EVENT_INTERFACES,
  ...SCENE_PERFORMANCE_INTERFACES,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CoreSceneInterface = typeof CORE_SCENE_INTERFACES[keyof typeof CORE_SCENE_INTERFACES];
export type SceneBuildingInterface = typeof SCENE_BUILDING_INTERFACES[keyof typeof SCENE_BUILDING_INTERFACES];
export type SceneManagementInterface = typeof SCENE_MANAGEMENT_INTERFACES[keyof typeof SCENE_MANAGEMENT_INTERFACES];
export type SceneFactoryInterface = typeof SCENE_FACTORY_INTERFACES[keyof typeof SCENE_FACTORY_INTERFACES];
export type SceneStrategyInterface = typeof SCENE_STRATEGY_INTERFACES[keyof typeof SCENE_STRATEGY_INTERFACES];
export type SceneEventInterface = typeof SCENE_EVENT_INTERFACES[keyof typeof SCENE_EVENT_INTERFACES];
export type ScenePerformanceInterface = typeof SCENE_PERFORMANCE_INTERFACES[keyof typeof SCENE_PERFORMANCE_INTERFACES];
export type SceneInterface = typeof SCENE_INTERFACES[keyof typeof SCENE_INTERFACES];
