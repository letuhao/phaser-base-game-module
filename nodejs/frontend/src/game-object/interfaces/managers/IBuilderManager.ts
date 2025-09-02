/**
 * Builder Manager Interface
 *
 * Defines management functionality for builder pattern implementations.
 * Handles builder lifecycle, construction, and product management.
 */

import type { IBuilder } from '../patterns/IBuilder';
import { ManagerType } from '../../enums';
import type { IGameObject } from '../IGameObject';

/**
 * Builder manager configuration
 */
export interface BuilderManagerConfig {
  maxBuilders: number;
  maxProducts: number;
  enableProductCaching: boolean;
  enableBuilderValidation: boolean;
  enableConstructionLogging: boolean;
  autoCleanup: boolean;
  metadata?: Record<string, any>;
}

/**
 * Builder manager statistics
 */
export interface BuilderManagerStatistics {
  totalBuilders: number;
  activeBuilders: number;
  totalProducts: number;
  totalConstructions: number;
  averageConstructionTime: number;
  lastConstructionTime: number;
  buildersByType: Record<string, number>;
  constructionCounts: Record<string, number>;
}

/**
 * Builder construction context
 */
export interface BuilderConstructionContext {
  contextId: string;
  builderId: string;
  constructionParameters: Record<string, any>;
  constructionMetadata?: Record<string, any>;
}

/**
 * Builder construction result
 */
export interface BuilderConstructionResult {
  success: boolean;
  product: IGameObject | null;
  constructionTime: number;
  errorMessage?: string;
  constructionMetadata?: Record<string, any>;
}

/**
 * Interface for builder managers
 */
export interface IBuilderManager {
  readonly builderManagerId: string;

  /** Builder manager configuration */
  builderManagerConfig: BuilderManagerConfig;

  /** Managed builders */
  managedBuilders: Map<string, IBuilder>;

  /** Builder construction contexts */
  builderConstructionContexts: Map<string, BuilderConstructionContext>;

  /** Builder construction results */
  builderConstructionResults: Map<string, BuilderConstructionResult[]>;

  /** Builder manager statistics */
  builderManagerStatistics: BuilderManagerStatistics;

  /** Builder manager metadata */
  builderManagerMetadata: Record<string, any>;

  /** Set builder manager configuration */
  setBuilderManagerConfig(config: BuilderManagerConfig): this;

  /** Set builder manager metadata */
  setBuilderManagerMetadata(metadata: Record<string, any>): this;

  /** Get builder manager configuration */
  getBuilderManagerConfig(): BuilderManagerConfig;

  /** Get managed builders */
  getManagedBuilders(): Map<string, IBuilder>;

  /** Get builder construction contexts */
  getBuilderConstructionContexts(): Map<string, BuilderConstructionContext>;

  /** Get builder construction results */
  getBuilderConstructionResults(): Map<string, BuilderConstructionResult[]>;

  /** Get builder manager statistics */
  getBuilderManagerStatistics(): BuilderManagerStatistics;

  /** Get builder manager metadata */
  getBuilderManagerMetadata(): Record<string, any>;

  /** Create builder */
  createBuilder(builderId: string): Promise<IBuilder>;

  /** Destroy builder */
  destroyBuilder(builderId: string): Promise<boolean>;

  /** Manage builder */
  manageBuilder(builder: IBuilder): Promise<this>;

  /** Build product */
  buildProduct(
    builderId: string,
    context: BuilderConstructionContext
  ): Promise<BuilderConstructionResult>;

  /** Reset builder */
  resetBuilder(builderId: string): Promise<boolean>;

  /** Get builder by ID */
  getBuilder(builderId: string): IBuilder | null;

  /** Check if builder exists */
  hasBuilder(builderId: string): boolean;

  /** Get builders by type */
  getBuildersByType(type: ManagerType): IBuilder[];

  /** Get construction context by ID */
  getConstructionContext(contextId: string): BuilderConstructionContext | null;

  /** Get construction results for builder */
  getConstructionResultsForBuilder(builderId: string): BuilderConstructionResult[];

  /** Validate builder */
  validateBuilder(builder: IBuilder): Promise<boolean>;

  /** Clear builder construction results */
  clearBuilderConstructionResults(builderId: string): Promise<this>;

  /** Clear all construction results */
  clearAllConstructionResults(): Promise<this>;

  /** Update builder manager */
  updateBuilderManager(deltaTime: number): void;
}
