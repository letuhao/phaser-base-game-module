/**
 * Decorator Manager Interface
 * 
 * Defines management functionality for decorator pattern implementations.
 * Handles decorator lifecycle, composition, and behavior management.
 */

import type { IDecorator } from '../patterns/IDecorator';
import type { IGameObject } from '../IGameObject';

/**
 * Decorator manager operations
 */
export enum DecoratorManagerOperation {
  CREATE_DECORATOR = 'create_decorator',
  DESTROY_DECORATOR = 'destroy_decorator',
  COMPOSE_DECORATOR = 'compose_decorator',
  DECOMPOSE_DECORATOR = 'decompose_decorator',
  MANAGE_DECORATOR = 'manage_decorator',
  VALIDATE_DECORATOR = 'validate_decorator'
}

/**
 * Decorator manager configuration
 */
export interface DecoratorManagerConfig {
  maxDecorators: number;
  maxCompositionDepth: number;
  enableCircularDetection: boolean;
  enableBehaviorCaching: boolean;
  enableCompositionValidation: boolean;
  autoCleanup: boolean;
  metadata?: Record<string, any>;
}

/**
 * Decorator manager statistics
 */
export interface DecoratorManagerStatistics {
  totalDecorators: number;
  activeDecorators: number;
  totalCompositions: number;
  totalDecompositions: number;
  averageCompositionDepth: number;
  lastCleanupTime: number;
  decoratorsByType: Record<string, number>;
  compositionCounts: Record<string, number>;
}

/**
 * Decorator composition
 */
export interface DecoratorComposition {
  compositionId: string;
  decoratorId: string;
  targetObject: IGameObject;
  compositionOrder: number;
  compositionMetadata?: Record<string, any>;
}

/**
 * Decorator behavior
 */
export interface DecoratorBehavior {
  behaviorId: string;
  behaviorType: string;
  behaviorFunction: (target: IGameObject, ...args: any[]) => any;
  behaviorMetadata?: Record<string, any>;
}

/**
 * Interface for decorator managers
 */
export interface IDecoratorManager {
  readonly decoratorManagerId: string;
  
  /** Decorator manager configuration */
  decoratorManagerConfig: DecoratorManagerConfig;
  
  /** Managed decorators */
  managedDecorators: Map<string, IDecorator>;
  
  /** Decorator compositions */
  decoratorCompositions: Map<string, DecoratorComposition[]>;
  
  /** Decorator behaviors */
  decoratorBehaviors: Map<string, DecoratorBehavior[]>;
  
  /** Decorator manager statistics */
  decoratorManagerStatistics: DecoratorManagerStatistics;
  
  /** Decorator manager metadata */
  decoratorManagerMetadata: Record<string, any>;
  
  /** Set decorator manager configuration */
  setDecoratorManagerConfig(config: DecoratorManagerConfig): this;
  
  /** Set decorator manager metadata */
  setDecoratorManagerMetadata(metadata: Record<string, any>): this;
  
  /** Get decorator manager configuration */
  getDecoratorManagerConfig(): DecoratorManagerConfig;
  
  /** Get managed decorators */
  getManagedDecorators(): Map<string, IDecorator>;
  
  /** Get decorator compositions */
  getDecoratorCompositions(): Map<string, DecoratorComposition[]>;
  
  /** Get decorator behaviors */
  getDecoratorBehaviors(): Map<string, DecoratorBehavior[]>;
  
  /** Get decorator manager statistics */
  getDecoratorManagerStatistics(): DecoratorManagerStatistics;
  
  /** Get decorator manager metadata */
  getDecoratorManagerMetadata(): Record<string, any>;
  
  /** Create decorator */
  createDecorator(decoratorId: string): Promise<IDecorator>;
  
  /** Destroy decorator */
  destroyDecorator(decoratorId: string): Promise<boolean>;
  
  /** Manage decorator */
  manageDecorator(decorator: IDecorator): Promise<this>;
  
  /** Compose decorator */
  composeDecorator(decoratorId: string, targetObject: IGameObject, compositionOrder?: number): Promise<boolean>;
  
  /** Decompose decorator */
  decomposeDecorator(decoratorId: string, targetObject: IGameObject): Promise<boolean>;
  
  /** Add decorator behavior */
  addDecoratorBehavior(decoratorId: string, behavior: DecoratorBehavior): Promise<this>;
  
  /** Remove decorator behavior */
  removeDecoratorBehavior(decoratorId: string, behaviorId: string): Promise<boolean>;
  
  /** Get decorator by ID */
  getDecorator(decoratorId: string): IDecorator | null;
  
  /** Check if decorator exists */
  hasDecorator(decoratorId: string): boolean;
  
  /** Get decorators by type */
  getDecoratorsByType(type: string): IDecorator[];
  
  /** Get compositions for decorator */
  getCompositionsForDecorator(decoratorId: string): DecoratorComposition[];
  
  /** Get behaviors for decorator */
  getBehaviorsForDecorator(decoratorId: string): DecoratorBehavior[];
  
  /** Validate decorator composition */
  validateDecoratorComposition(decoratorId: string, targetObject: IGameObject): Promise<boolean>;
  
  /** Clear decorator compositions */
  clearDecoratorCompositions(decoratorId: string): Promise<this>;
  
  /** Clear all compositions */
  clearAllCompositions(): Promise<this>;
  
  /** Update decorator manager */
  updateDecoratorManager(deltaTime: number): void;
}
