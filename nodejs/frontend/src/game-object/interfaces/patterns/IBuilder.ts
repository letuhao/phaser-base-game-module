/**
 * Builder Pattern Interface
 * 
 * Defines builder functionality for constructing game objects.
 * Handles step-by-step object construction with validation.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType, BuilderType, BuilderState } from '../../enums';

/**
 * Builder step
 */
export interface BuilderStep {
  id: string;
  name: string;
  required: boolean;
  completed: boolean;
  data: any;
  validation?: (data: any) => boolean;
  error?: string;
}

/**
 * Builder configuration
 */
export interface BuilderConfig {
  type: BuilderType;
  steps: BuilderStep[];
  validation: boolean;
  autoComplete: boolean;
  rollbackOnError: boolean;
  metadata?: any;
}

/**
 * Interface for builder game objects
 * 
 * Extends IGameObject with builder pattern functionality.
 */
export interface IBuilder extends IGameObject {
  readonly gameObjectType: GameObjectType;
  
  /** Builder type */
  builderType: BuilderType;
  
  /** Builder state */
  builderState: BuilderState;
  
  /** Builder configuration */
  builderConfig: BuilderConfig;
  
  /** Builder manager */
  builderManager: any; // IBuilderManager
  
  /** Builder ID */
  builderId: string;
  
  /** Builder name */
  builderName: string;
  
  /** Builder steps */
  builderSteps: BuilderStep[];
  
  /** Builder current step */
  builderCurrentStep: number;
  
  /** Builder completed steps */
  builderCompletedSteps: number;
  
  /** Builder validation */
  builderValidation: boolean;
  
  /** Builder auto complete */
  builderAutoComplete: boolean;
  
  /** Builder rollback on error */
  builderRollbackOnError: boolean;
  
  /** Builder metadata */
  builderMetadata: any;
  
  /** Builder result */
  builderResult: IGameObject | null;
  
  /** Builder errors */
  builderErrors: string[];
  
  /** Set builder type */
  setBuilderType(type: BuilderType): this;
  
  /** Set builder state */
  setBuilderState(state: BuilderState): this;
  
  /** Set builder configuration */
  setBuilderConfig(config: BuilderConfig): this;
  
  /** Set builder manager */
  setBuilderManager(manager: any): this;
  
  /** Set builder ID */
  setBuilderId(id: string): this;
  
  /** Set builder name */
  setBuilderName(name: string): this;
  
  /** Set builder steps */
  setBuilderSteps(steps: BuilderStep[]): this;
  
  /** Set builder current step */
  setBuilderCurrentStep(step: number): this;
  
  /** Set builder completed steps */
  setBuilderCompletedSteps(count: number): this;
  
  /** Set builder validation */
  setBuilderValidation(validation: boolean): this;
  
  /** Set builder auto complete */
  setBuilderAutoComplete(autoComplete: boolean): this;
  
  /** Set builder rollback on error */
  setBuilderRollbackOnError(rollback: boolean): this;
  
  /** Set builder metadata */
  setBuilderMetadata(metadata: any): this;
  
  /** Set builder result */
  setBuilderResult(result: IGameObject | null): this;
  
  /** Set builder errors */
  setBuilderErrors(errors: string[]): this;
  
  /** Get builder type */
  getBuilderType(): BuilderType;
  
  /** Get builder state */
  getBuilderState(): BuilderState;
  
  /** Get builder configuration */
  getBuilderConfig(): BuilderConfig;
  
  /** Get builder manager */
  getBuilderManager(): any;
  
  /** Get builder ID */
  getBuilderId(): string;
  
  /** Get builder name */
  getBuilderName(): string;
  
  /** Get builder steps */
  getBuilderSteps(): BuilderStep[];
  
  /** Get builder current step */
  getBuilderCurrentStep(): number;
  
  /** Get builder completed steps */
  getBuilderCompletedSteps(): number;
  
  /** Get builder validation */
  getBuilderValidation(): boolean;
  
  /** Get builder auto complete */
  getBuilderAutoComplete(): boolean;
  
  /** Get builder rollback on error */
  getBuilderRollbackOnError(): boolean;
  
  /** Get builder metadata */
  getBuilderMetadata(): any;
  
  /** Get builder result */
  getBuilderResult(): IGameObject | null;
  
  /** Get builder errors */
  getBuilderErrors(): string[];
  
  /** Add builder step */
  addBuilderStep(step: BuilderStep): this;
  
  /** Remove builder step */
  removeBuilderStep(stepId: string): this;
  
  /** Complete builder step */
  completeBuilderStep(stepId: string, data: any): this;
  
  /** Validate builder step */
  validateBuilderStep(stepId: string): boolean;
  
  /** Move to next step */
  moveToNextStep(): this;
  
  /** Move to previous step */
  moveToPreviousStep(): this;
  
  /** Reset builder */
  resetBuilder(): this;
  
  /** Rollback builder */
  rollbackBuilder(): this;
  
  /** Build object */
  buildObject(): IGameObject | null;
  
  /** Check if builder is complete */
  isBuilderComplete(): boolean;
  
  /** Check if builder has errors */
  hasBuilderErrors(): boolean;
  
  /** Check if builder can proceed */
  canBuilderProceed(): boolean;
  
  /** Update builder */
  updateBuilder(deltaTime: number): void;
}
