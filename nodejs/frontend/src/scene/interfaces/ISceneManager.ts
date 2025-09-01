/**
 * Scene Manager Interface
 * 
 * Defines scene management functionality including scene lifecycle,
 * transitions, and orchestration.
 */

import type { ISceneElement } from './ISceneElement';
import type { ISceneConfig } from './ISceneConfig';
import type { ISceneBuilder } from './ISceneBuilder';
import { SceneType } from './ISceneConfig';
import { SceneState } from './ISceneConfig';

/**
 * Scene transition types
 */
export enum SceneTransitionType {
  FADE = 'fade',
  SLIDE = 'slide',
  ZOOM = 'zoom',
  ROTATE = 'rotate',
  CUSTOM = 'custom',
  NONE = 'none'
}

/**
 * Scene transition states
 */
export enum SceneTransitionState {
  IDLE = 'idle',
  PREPARING = 'preparing',
  TRANSITIONING = 'transitioning',
  COMPLETED = 'completed',
  ERROR = 'error',
  CANCELLED = 'cancelled'
}

/**
 * Scene transition configuration
 */
export interface SceneTransitionConfig {
  type: SceneTransitionType;
  duration: number;
  easing?: string;
  direction?: 'in' | 'out' | 'both';
  customTransition?: string;
  metadata?: Record<string, any>;
}

/**
 * Scene instance
 */
export interface SceneInstance {
  sceneId: string;
  sceneConfig: ISceneConfig;
  sceneElements: Map<string, ISceneElement>;
  sceneState: SceneState;
  sceneBuilder: ISceneBuilder;
  sceneCreatedTime: number;
  sceneLastUpdateTime: number;
  sceneMetadata: Record<string, any>;
}

/**
 * Interface for scene managers
 * 
 * Handles scene lifecycle, transitions, and orchestration.
 */
export interface ISceneManager {
  readonly managerId: string;
  
  /** Active scenes */
  activeScenes: Map<string, SceneInstance>;
  
  /** Scene builder */
  sceneBuilder: ISceneBuilder;
  
  /** Scene transition state */
  transitionState: SceneTransitionState;
  
  /** Current transition */
  currentTransition: SceneTransitionConfig | null;
  
  /** Manager metadata */
  managerMetadata: Record<string, any>;
  
  /** Set active scenes */
  setActiveScenes(scenes: Map<string, SceneInstance>): this;
  
  /** Set scene builder */
  setSceneBuilder(builder: ISceneBuilder): this;
  
  /** Set transition state */
  setTransitionState(state: SceneTransitionState): this;
  
  /** Set current transition */
  setCurrentTransition(transition: SceneTransitionConfig | null): this;
  
  /** Set manager metadata */
  setManagerMetadata(metadata: Record<string, any>): this;
  
  /** Get active scenes */
  getActiveScenes(): Map<string, SceneInstance>;
  
  /** Get scene builder */
  getSceneBuilder(): ISceneBuilder;
  
  /** Get transition state */
  getTransitionState(): SceneTransitionState;
  
  /** Get current transition */
  getCurrentTransition(): SceneTransitionConfig | null;
  
  /** Get manager metadata */
  getManagerMetadata(): Record<string, any>;
  
  /** Create scene */
  createScene(sceneId: string, config: ISceneConfig): Promise<SceneInstance>;
  
  /** Load scene */
  loadScene(sceneId: string): Promise<SceneInstance>;
  
  /** Activate scene */
  activateScene(sceneId: string): Promise<this>;
  
  /** Deactivate scene */
  deactivateScene(sceneId: string): Promise<this>;
  
  /** Destroy scene */
  destroyScene(sceneId: string): Promise<this>;
  
  /** Transition to scene */
  transitionToScene(
    fromSceneId: string,
    toSceneId: string,
    transition: SceneTransitionConfig
  ): Promise<this>;
  
  /** Get scene by ID */
  getSceneById(sceneId: string): SceneInstance | null;
  
  /** Get active scene */
  getActiveScene(): SceneInstance | null;
  
  /** Get scenes by type */
  getScenesByType(sceneType: SceneType): SceneInstance[];
  
  /** Check if scene exists */
  hasScene(sceneId: string): boolean;
  
  /** Check if scene is active */
  isSceneActive(sceneId: string): boolean;
  
  /** Check if scene is transitioning */
  isSceneTransitioning(): boolean;
  
  /** Pause scene */
  pauseScene(sceneId: string): Promise<this>;
  
  /** Resume scene */
  resumeScene(sceneId: string): Promise<this>;
  
  /** Update scene */
  updateScene(sceneId: string, deltaTime: number): void;
  
  /** Update all scenes */
  updateAllScenes(deltaTime: number): void;
  
  /** Clear all scenes */
  clearAllScenes(): Promise<this>;
  
  /** Get scene statistics */
  getSceneStatistics(): {
    totalScenes: number;
    activeScenes: number;
    pausedScenes: number;
    totalElements: number;
    totalGameObjects: number;
  };
  
  /** Update manager */
  updateManager(deltaTime: number): void;
}
