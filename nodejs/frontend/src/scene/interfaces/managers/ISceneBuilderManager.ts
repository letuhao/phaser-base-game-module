/**
 * Scene Builder Manager Interface
 * 
 * Defines management functionality for scene builders.
 */

import type { ISceneBuilder } from '../ISceneBuilder';
import type { SceneBuilderType, SceneBuilderState } from '../../enums';
import { BuilderManagerOperation } from '../../enums';
import type { ISceneElement } from '../ISceneElement';
import type { ISceneConfig } from '../ISceneConfig';

// BuilderManagerOperation is now imported from centralized enums

/**
 * Builder manager configuration
 */
export interface BuilderManagerConfig {
  maxBuilders: number;
  enablePooling: boolean;
  enableCaching: boolean;
  parallelBuilding: boolean;
  maxConcurrentBuilds: number;
  buildTimeout: number;
  metadata?: Record<string, any>;
}

/**
 * Builder manager statistics
 */
export interface BuilderManagerStatistics {
  totalBuilders: number;
  activeBuilders: number;
  buildersByType: Record<SceneBuilderType, number>;
  buildersByState: Record<SceneBuilderState, number>;
  operationsPerformed: Record<BuilderManagerOperation, number>;
  totalBuilds: number;
  successfulBuilds: number;
  failedBuilds: number;
  averageBuildTime: number;
  lastBuildTime: number;
}

/**
 * Interface for scene builder managers
 */
export interface ISceneBuilderManager {
  readonly managerId: string;
  
  /** Manager configuration */
  managerConfig: BuilderManagerConfig;
  
  /** Managed builders */
  managedBuilders: Map<string, ISceneBuilder>;
  
  /** Builder pools */
  builderPools: Map<SceneBuilderType, ISceneBuilder[]>;
  
  /** Manager statistics */
  managerStatistics: BuilderManagerStatistics;
  
  /** Manager metadata */
  managerMetadata: Record<string, any>;
  
  /** Set manager configuration */
  setManagerConfig(config: BuilderManagerConfig): this;
  
  /** Set manager metadata */
  setManagerMetadata(metadata: Record<string, any>): this;
  
  /** Get manager configuration */
  getManagerConfig(): BuilderManagerConfig;
  
  /** Get managed builders */
  getManagedBuilders(): Map<string, ISceneBuilder>;
  
  /** Get manager statistics */
  getManagerStatistics(): BuilderManagerStatistics;
  
  /** Get manager metadata */
  getManagerMetadata(): Record<string, any>;
  
  /** Register builder */
  registerBuilder(builder: ISceneBuilder): this;
  
  /** Unregister builder */
  unregisterBuilder(builderId: string): this;
  
  /** Get builder by ID */
  getBuilderById(builderId: string): ISceneBuilder | null;
  
  /** Get builders by type */
  getBuildersByType(builderType: SceneBuilderType): ISceneBuilder[];
  
  /** Get builders by state */
  getBuildersByState(builderState: SceneBuilderState): ISceneBuilder[];
  
  /** Create builder */
  createBuilder(
    builderType: SceneBuilderType,
    config: any
  ): Promise<ISceneBuilder>;
  
  /** Build scene */
  buildScene(
    builderId: string,
    config: ISceneConfig
  ): Promise<Map<string, ISceneElement>>;
  
  /** Cancel build */
  cancelBuild(builderId: string): Promise<boolean>;
  
  /** Reset builder */
  resetBuilder(builderId: string): Promise<boolean>;
  
  /** Clear builder */
  clearBuilder(builderId: string): Promise<boolean>;
  
  /** Get builder from pool */
  getBuilderFromPool(builderType: SceneBuilderType): ISceneBuilder | null;
  
  /** Return builder to pool */
  returnBuilderToPool(builder: ISceneBuilder): this;
  
  /** Clear builder pool */
  clearBuilderPool(builderType: SceneBuilderType): this;
  
  /** Clear all pools */
  clearAllPools(): this;
  
  /** Check if builder exists */
  hasBuilder(builderId: string): boolean;
  
  /** Check if builder is active */
  isBuilderActive(builderId: string): boolean;
  
  /** Get builder count */
  getBuilderCount(): number;
  
  /** Get active builder count */
  getActiveBuilderCount(): number;
  
  /** Get build progress */
  getBuildProgress(builderId: string): any;
  
  /** Get build errors */
  getBuildErrors(builderId: string): string[];
  
  /** Optimize builder */
  optimizeBuilder(builderId: string): Promise<boolean>;
  
  /** Clear all builders */
  clearAllBuilders(): Promise<this>;
  
  /** Update manager */
  updateManager(deltaTime: number): void;
}
