/**
 * Scene Validation Strategy Interface
 * 
 * Defines strategy functionality for scene validation approaches.
 * Handles different validation strategies and execution contexts.
 */

import type { ISceneElement } from '../ISceneElement';
import type { ISceneConfig } from '../ISceneConfig';
import type { ISceneBuilder } from '../ISceneBuilder';
import { ValidationTargetType } from '../../enums';
// SceneValidationStrategyOperation is imported from centralized enums but not used in this file

// SceneValidationStrategyOperation is now imported from centralized enums

/**
 * Scene validation strategy configuration
 */
export interface SceneValidationStrategyConfig {
  enableStrictValidation: boolean;
  enableIncrementalValidation: boolean;
  enableValidationCaching: boolean;
  enableValidationLogging: boolean;
  validationTimeout: number;
  maxValidationDepth: number;
  metadata?: Record<string, any>;
}

/**
 * Scene validation strategy statistics
 */
export interface SceneValidationStrategyStatistics {
  totalValidations: number;
  successfulValidations: number;
  failedValidations: number;
  averageValidationTime: number;
  lastValidationTime: number;
  validationsByStrategy: Record<string, number>;
  validationCounts: Record<string, number>;
}

/**
 * Scene validation context
 */
export interface SceneValidationContext {
  contextId: string;
  strategyType: string;
  validationTarget: ValidationTargetType;
  validationParameters: Record<string, any>;
  validationMetadata?: Record<string, any>;
}

/**
 * Scene validation result
 */
export interface SceneValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  validationTime: number;
  validationMetadata?: Record<string, any>;
}

/**
 * Interface for scene validation strategies
 */
export interface ISceneValidationStrategy {
  readonly strategyId: string;
  readonly strategyType: string;
  
  /** Strategy configuration */
  strategyConfig: SceneValidationStrategyConfig;
  
  /** Strategy statistics */
  strategyStatistics: SceneValidationStrategyStatistics;
  
  /** Strategy metadata */
  strategyMetadata: Record<string, any>;
  
  /** Set strategy configuration */
  setStrategyConfig(config: SceneValidationStrategyConfig): this;
  
  /** Set strategy metadata */
  setStrategyMetadata(metadata: Record<string, any>): this;
  
  /** Get strategy configuration */
  getStrategyConfig(): SceneValidationStrategyConfig;
  
  /** Get strategy statistics */
  getStrategyStatistics(): SceneValidationStrategyStatistics;
  
  /** Get strategy metadata */
  getStrategyMetadata(): Record<string, any>;
  
  /** Validate scene */
  validateScene(scene: any, context: SceneValidationContext): Promise<SceneValidationResult>; // Phaser.Scene
  
  /** Validate element */
  validateElement(element: ISceneElement, context: SceneValidationContext): Promise<SceneValidationResult>;
  
  /** Validate config */
  validateConfig(config: ISceneConfig, context: SceneValidationContext): Promise<SceneValidationResult>;
  
  /** Validate builder */
  validateBuilder(builder: ISceneBuilder, context: SceneValidationContext): Promise<SceneValidationResult>;
  
  /** Get strategy type */
  getStrategyType(): string;
  
  /** Check if strategy supports context */
  supportsContext(context: SceneValidationContext): boolean;
  
  /** Update strategy */
  updateStrategy(deltaTime: number): void;
}
