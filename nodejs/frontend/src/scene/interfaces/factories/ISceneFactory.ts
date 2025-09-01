/**
 * Scene Factory Interface
 * 
 * Defines factory functionality for creating scenes.
 * Handles scene creation with different strategies and configurations.
 */

import type { ISceneConfig } from '../ISceneConfig';
import type { ISceneBuilder } from '../ISceneBuilder';
import type { ISceneManager } from '../ISceneManager';

/**
 * Scene factory operations
 */
export enum SceneFactoryOperation {
  CREATE_SCENE = 'create_scene',
  DESTROY_SCENE = 'destroy_scene',
  CONFIGURE_SCENE = 'configure_scene',
  VALIDATE_SCENE = 'validate_scene',
  OPTIMIZE_SCENE = 'optimize_scene'
}

/**
 * Scene factory configuration
 */
export interface SceneFactoryConfig {
  maxScenes: number;
  enableScenePooling: boolean;
  enableSceneCaching: boolean;
  enableSceneValidation: boolean;
  autoCleanup: boolean;
  cleanupInterval: number;
  metadata?: Record<string, any>;
}

/**
 * Scene factory statistics
 */
export interface SceneFactoryStatistics {
  totalScenes: number;
  activeScenes: number;
  totalCreations: number;
  totalDestructions: number;
  averageCreationTime: number;
  lastCleanupTime: number;
  scenesByType: Record<string, number>;
  creationCounts: Record<string, number>;
}

/**
 * Scene creation context
 */
export interface SceneCreationContext {
  contextId: string;
  sceneType: string;
  sceneConfig: ISceneConfig;
  sceneBuilder: ISceneBuilder;
  sceneManager: ISceneManager;
  creationParameters: Record<string, any>;
  creationMetadata?: Record<string, any>;
}

/**
 * Scene creation result
 */
export interface SceneCreationResult {
  success: boolean;
  scene: any | null; // Phaser.Scene
  sceneConfig: ISceneConfig | null;
  creationTime: number;
  errorMessage?: string;
  creationMetadata?: Record<string, any>;
}

/**
 * Interface for scene factories
 */
export interface ISceneFactory {
  readonly factoryId: string;
  
  /** Factory configuration */
  factoryConfig: SceneFactoryConfig;
  
  /** Factory statistics */
  factoryStatistics: SceneFactoryStatistics;
  
  /** Factory metadata */
  factoryMetadata: Record<string, any>;
  
  /** Set factory configuration */
  setFactoryConfig(config: SceneFactoryConfig): this;
  
  /** Set factory metadata */
  setFactoryMetadata(metadata: Record<string, any>): this;
  
  /** Get factory configuration */
  getFactoryConfig(): SceneFactoryConfig;
  
  /** Get factory statistics */
  getFactoryStatistics(): SceneFactoryStatistics;
  
  /** Get factory metadata */
  getFactoryMetadata(): Record<string, any>;
  
  /** Create scene */
  createScene(context: SceneCreationContext): Promise<SceneCreationResult>;
  
  /** Destroy scene */
  destroyScene(scene: any): Promise<boolean>; // Phaser.Scene
  
  /** Configure scene */
  configureScene(scene: any, config: ISceneConfig): Promise<boolean>; // Phaser.Scene
  
  /** Validate scene */
  validateScene(scene: any): Promise<boolean>; // Phaser.Scene
  
  /** Optimize scene */
  optimizeScene(scene: any): Promise<this>; // Phaser.Scene
  
  /** Get scenes by type */
  getScenesByType(type: string): any[]; // Phaser.Scene[]
  
  /** Get creation context by ID */
  getCreationContext(contextId: string): SceneCreationContext | null;
  
  /** Clear factory */
  clearFactory(): Promise<this>;
  
  /** Update factory */
  updateFactory(deltaTime: number): void;
}
