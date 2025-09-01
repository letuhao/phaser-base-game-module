/**
 * Scene Context Interface
 * 
 * Defines context abstraction for scene system operations.
 */

// Context interfaces don't need these imports directly

/**
 * Scene context types
 */
export enum SceneContextType {
  BUILDING = 'building',
  RUNTIME = 'runtime',
  EDITING = 'editing',
  TESTING = 'testing',
  DEBUGGING = 'debugging'
}

/**
 * Scene context state
 */
export enum SceneContextState {
  INITIALIZING = 'initializing',
  ACTIVE = 'active',
  PAUSED = 'paused',
  SUSPENDED = 'suspended',
  DESTROYING = 'destroying',
  DESTROYED = 'destroyed'
}

/**
 * Scene context configuration
 */
export interface SceneContextConfig {
  contextType: SceneContextType;
  enableLogging: boolean;
  enableProfiling: boolean;
  enableDebugging: boolean;
  maxMemoryUsage: number;
  metadata?: Record<string, any>;
}

/**
 * Interface for scene contexts
 */
export interface ISceneContext {
  readonly contextId: string;
  readonly contextType: SceneContextType;
  
  /** Context state */
  contextState: SceneContextState;
  
  /** Context configuration */
  contextConfig: SceneContextConfig;
  
  /** Context metadata */
  contextMetadata: Record<string, any>;
  
  /** Set context state */
  setContextState(state: SceneContextState): this;
  
  /** Set context configuration */
  setContextConfig(config: SceneContextConfig): this;
  
  /** Set context metadata */
  setContextMetadata(metadata: Record<string, any>): this;
  
  /** Get context state */
  getContextState(): SceneContextState;
  
  /** Get context configuration */
  getContextConfig(): SceneContextConfig;
  
  /** Get context metadata */
  getContextMetadata(): Record<string, any>;
  
  /** Initialize context */
  initializeContext(): Promise<this>;
  
  /** Destroy context */
  destroyContext(): Promise<this>;
  
  /** Check if context is active */
  isContextActive(): boolean;
  
  /** Update context */
  updateContext(deltaTime: number): void;
}
