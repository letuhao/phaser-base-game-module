/**
 * Scene Building Strategy Interface
 *
 * Defines strategy functionality for scene building approaches.
 * Handles different building strategies and execution contexts.
 */

import type { ISceneElement } from '../ISceneElement';
import type { ISceneConfig } from '../ISceneConfig';
import type { IGameObject } from '../../../game-object/interfaces/IGameObject';

/**
 * Scene building strategy operations
 */
export enum SceneBuildingStrategyOperation {
  BUILD_SCENE = 'build_scene',
  BUILD_ELEMENT = 'build_element',
  VALIDATE_BUILD = 'validate_build',
  OPTIMIZE_BUILD = 'optimize_build',
}

/**
 * Scene building strategy configuration
 */
export interface SceneBuildingStrategyConfig {
  enableParallelBuilding: boolean;
  enableIncrementalBuilding: boolean;
  enableBuildCaching: boolean;
  enableBuildValidation: boolean;
  maxConcurrentBuilds: number;
  buildTimeout: number;
  metadata?: Record<string, any>;
}

/**
 * Scene building strategy statistics
 */
export interface SceneBuildingStrategyStatistics {
  totalBuilds: number;
  successfulBuilds: number;
  failedBuilds: number;
  averageBuildTime: number;
  lastBuildTime: number;
  buildsByStrategy: Record<string, number>;
  buildCounts: Record<string, number>;
}

/**
 * Scene building context
 */
export interface SceneBuildingContext {
  contextId: string;
  strategyType: string;
  sceneConfig: ISceneConfig;
  buildParameters: Record<string, any>;
  buildMetadata?: Record<string, any>;
}

/**
 * Scene building result
 */
export interface SceneBuildingResult {
  success: boolean;
  elements: ISceneElement[];
  gameObjects: IGameObject[];
  buildTime: number;
  errorMessage?: string;
  buildMetadata?: Record<string, any>;
}

/**
 * Interface for scene building strategies
 */
export interface ISceneBuildingStrategy {
  readonly strategyId: string;
  readonly strategyType: string;

  /** Strategy configuration */
  strategyConfig: SceneBuildingStrategyConfig;

  /** Strategy statistics */
  strategyStatistics: SceneBuildingStrategyStatistics;

  /** Strategy metadata */
  strategyMetadata: Record<string, any>;

  /** Set strategy configuration */
  setStrategyConfig(config: SceneBuildingStrategyConfig): this;

  /** Set strategy metadata */
  setStrategyMetadata(metadata: Record<string, any>): this;

  /** Get strategy configuration */
  getStrategyConfig(): SceneBuildingStrategyConfig;

  /** Get strategy statistics */
  getStrategyStatistics(): SceneBuildingStrategyStatistics;

  /** Get strategy metadata */
  getStrategyMetadata(): Record<string, any>;

  /** Build scene */
  buildScene(context: SceneBuildingContext): Promise<SceneBuildingResult>;

  /** Build element */
  buildElement(elementConfig: any, parent?: ISceneElement): Promise<ISceneElement | null>;

  /** Validate build */
  validateBuild(context: SceneBuildingContext): Promise<boolean>;

  /** Optimize build */
  optimizeBuild(context: SceneBuildingContext): Promise<this>;

  /** Get strategy type */
  getStrategyType(): string;

  /** Check if strategy supports context */
  supportsContext(context: SceneBuildingContext): boolean;

  /** Update strategy */
  updateStrategy(deltaTime: number): void;
}
