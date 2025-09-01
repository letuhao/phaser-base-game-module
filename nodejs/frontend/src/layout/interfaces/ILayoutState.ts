/**
 * Layout State Pattern Interfaces
 * Manages different layout states with different behaviors
 * Enables clean state transitions and state-specific behavior
 */

import { 
  ILayout,
  ILayoutConfig,
  ILayoutContext,
  ICalculatedLayout
} from './ILayout';
import { 
  LogLevel,
  ValidationSeverity,
  PerformanceLevel,
  LayoutStateChangeType,
  LayoutStateType
} from '../enums/LayoutEnums';

// ============================================================================
// STATE INTERFACES
// ============================================================================

/**
 * Layout state interface
 * Defines the contract for all layout states
 */
export interface ILayoutState {
  /** State name */
  readonly name: string;
  
  /** State description */
  readonly description: string;
  
  /** Whether this state is active */
  readonly isActive: boolean;
  
  /** State priority */
  readonly priority: number;
  
  /** State metadata */
  readonly metadata: ILayoutStateMetadata;
  
  /**
   * Enter this state
   * @param context State transition context
   */
  enter(context: ILayoutStateContext): Promise<void>;
  
  /**
   * Exit this state
   * @param context State transition context
   */
  exit(context: ILayoutStateContext): Promise<void>;
  
  /**
   * Update this state
   * @param context State update context
   */
  update(context: ILayoutStateContext): Promise<void>;
  
  /**
   * Handle state-specific behavior
   * @param action Action to handle
   * @param context State context
   */
  handleAction(action: ILayoutStateAction, context: ILayoutStateContext): Promise<ILayoutStateActionResult>;
  
  /**
   * Check if this state can transition to another state
   * @param targetState Target state
   * @param context State transition context
   */
  canTransitionTo(targetState: ILayoutState, context: ILayoutStateContext): boolean;
  
  /**
   * Get state performance characteristics
   */
  getPerformanceCharacteristics(): ILayoutStatePerformance;
  
  /**
   * Get state validation rules
   */
  getValidationRules(): ILayoutStateValidationRule[];
}

/**
 * Layout state context interface
 * Provides context for state operations
 */
export interface ILayoutStateContext {
  /** Current layout */
  layout: ILayout;
  
  /** Layout configuration */
  config: ILayoutConfig;
  
  /** Layout context */
  layoutContext: ILayoutContext;
  
  /** State manager */
  stateManager: any; // Will be ILayoutStateManager when implemented
  
  /** State parameters */
  parameters: Record<string, unknown>;
  
  /** State options */
  options: {
    validateTransitions: boolean;
    logTransitions: boolean;
    enableRollback: boolean;
    timeout: number;
  };
  
  /** Custom context data */
  custom?: Record<string, unknown>;
}

/**
 * Layout state action interface
 * Represents an action that can be performed on a state
 */
export interface ILayoutStateAction {
  /** Action type */
  type: string;
  
  /** Action name */
  name: string;
  
  /** Action parameters */
  parameters: Record<string, unknown>;
  
  /** Action priority */
  priority: number;
  
  /** Action metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Layout state action result interface
 */
export interface ILayoutStateActionResult {
  /** Whether the action was successful */
  success: boolean;
  
  /** Error message if failed */
  error?: string;
  
  /** Result data */
  data?: {
    newState?: ILayoutState;
    changes?: ILayoutStateChange[];
    metadata?: Record<string, unknown>;
  };
  
  /** Action execution time */
  executionTime: number;
  
  /** Action metadata */
  metadata: Record<string, unknown>;
}

/**
 * Layout state change interface
 * Represents a change made during state transition
 */
export interface ILayoutStateChange {
  /** Change type */
  type: LayoutStateChangeType;
  
  /** Source state */
  fromState: string;
  
  /** Target state */
  toState: string;
  
  /** Change timestamp */
  timestamp: number;
  
  /** Change metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Layout state metadata interface
 */
export interface ILayoutStateMetadata {
  /** State type */
  type: string;
  
  /** State version */
  version: string;
  
  /** State author */
  author?: string;
  
  /** State tags */
  tags?: string[];
  
  /** State category */
  category?: string;
  
  /** State dependencies */
  dependencies?: string[];
  
  /** State constraints */
  constraints?: {
    minDuration?: number;
    maxDuration?: number;
    requiredContext?: string[];
    forbiddenContext?: string[];
  };
  
  /** Custom metadata */
  custom?: Record<string, unknown>;
}

/**
 * Layout state performance interface
 */
export interface ILayoutStatePerformance {
  /** State complexity */
  complexity: 'O(1)' | 'O(n)' | 'O(n²)' | 'O(log n)';
  
  /** Memory usage level */
  memoryUsage: PerformanceLevel;
  
  /** Processing speed */
  processingSpeed: PerformanceLevel;
  
  /** Estimated execution time */
  estimatedExecutionTime: number;
  
  /** State-specific optimizations */
  optimizations?: string[];
}

/**
 * Layout state validation rule interface
 */
export interface ILayoutStateValidationRule {
  /** Rule name */
  name: string;
  
  /** Rule description */
  description: string;
  
  /** Rule condition */
  condition: (context: ILayoutStateContext) => boolean;
  
  /** Rule severity */
  severity: ValidationSeverity;
  
  /** Error message */
  errorMessage: string;
  
  /** Suggested fix */
  suggestedFix?: string;
}

// ============================================================================
// SPECIFIC STATE INTERFACES
// ============================================================================

/**
 * Idle layout state interface
 * Default state when no operations are being performed
 */
export interface IIdleLayoutState extends ILayoutState {
  /** State type */
  readonly type: LayoutStateType.IDLE;
  
  /**
   * Handle idle state actions
   * @param action Action to handle
   * @param context State context
   */
  handleIdleAction(action: ILayoutStateAction, context: ILayoutStateContext): Promise<ILayoutStateActionResult>;
}

/**
 * Calculating layout state interface
 * State when layout calculations are being performed
 */
export interface ICalculatingLayoutState extends ILayoutState {
  /** State type */
  readonly type: LayoutStateType.CALCULATING;
  
  /** Calculation progress */
  readonly progress: number;
  
  /** Calculation start time */
  readonly startTime: number;
  
  /**
   * Update calculation progress
   * @param progress Progress value (0-1)
   */
  updateProgress(progress: number): void;
  
  /**
   * Handle calculation actions
   * @param action Action to handle
   * @param context State context
   */
  handleCalculationAction(action: ILayoutStateAction, context: ILayoutStateContext): Promise<ILayoutStateActionResult>;
}

/**
 * Cached layout state interface
 * State when layout is using cached results
 */
export interface ICachedLayoutState extends ILayoutState {
  /** State type */
  readonly type: LayoutStateType.CACHED;
  
  /** Cache hit rate */
  readonly cacheHitRate: number;
  
  /** Cache timestamp */
  readonly cacheTimestamp: number;
  
  /**
   * Invalidate cache
   */
  invalidateCache(): void;
  
  /**
   * Handle cache actions
   * @param action Action to handle
   * @param context State context
   */
  handleCacheAction(action: ILayoutStateAction, context: ILayoutStateContext): Promise<ILayoutStateActionResult>;
}

/**
 * Error layout state interface
 * State when an error has occurred
 */
export interface IErrorLayoutState extends ILayoutState {
  /** State type */
  readonly type: LayoutStateType.ERROR;
  
  /** Error details */
  readonly error: Error;
  
  /** Error timestamp */
  readonly errorTimestamp: number;
  
  /** Recovery attempts */
  readonly recoveryAttempts: number;
  
  /**
   * Attempt recovery
   */
  attemptRecovery(): Promise<boolean>;
  
  /**
   * Handle error actions
   * @param action Action to handle
   * @param context State context
   */
  handleErrorAction(action: ILayoutStateAction, context: ILayoutStateContext): Promise<ILayoutStateActionResult>;
}

/**
 * Validating layout state interface
 * State when layout validation is being performed
 */
export interface IValidatingLayoutState extends ILayoutState {
  /** State type */
  readonly type: LayoutStateType.VALIDATING;
  
  /** Validation progress */
  readonly progress: number;
  
  /** Validation rules being checked */
  readonly activeRules: string[];
  
  /**
   * Update validation progress
   * @param progress Progress value (0-1)
   */
  updateProgress(progress: number): void;
  
  /**
   * Handle validation actions
   * @param action Action to handle
   * @param context State context
   */
  handleValidationAction(action: ILayoutStateAction, context: ILayoutStateContext): Promise<ILayoutStateActionResult>;
}

/**
 * Transitioning layout state interface
 * State when transitioning between states
 */
export interface ITransitioningLayoutState extends ILayoutState {
  /** State type */
  readonly type: LayoutStateType.TRANSITIONING;
  
  /** Source state */
  readonly fromState: ILayoutState;
  
  /** Target state */
  readonly toState: ILayoutState;
  
  /** Transition progress */
  readonly progress: number;
  
  /** Transition start time */
  readonly startTime: number;
  
  /**
   * Update transition progress
   * @param progress Progress value (0-1)
   */
  updateProgress(progress: number): void;
  
  /**
   * Handle transition actions
   * @param action Action to handle
   * @param context State context
   */
  handleTransitionAction(action: ILayoutStateAction, context: ILayoutStateContext): Promise<ILayoutStateActionResult>;
}

// ============================================================================
// STATE MANAGER INTERFACES
// ============================================================================

/**
 * Layout state manager interface
 * Manages state transitions and state-specific behavior
 */
export interface ILayoutStateManager {
  /** Current state */
  readonly currentState: ILayoutState;
  
  /** Available states */
  readonly availableStates: Map<string, ILayoutState>;
  
  /** State history */
  readonly stateHistory: ILayoutState[];
  
  /** State transitions */
  readonly transitions: ILayoutStateTransition[];
  
  /** Whether state transitions are enabled */
  readonly transitionsEnabled: boolean;
  
  /** Maximum state history size */
  readonly maxHistorySize: number;
  
  /**
   * Initialize the state manager
   * @param initialState Initial state
   */
  initialize(initialState: ILayoutState): Promise<void>;
  
  /**
   * Transition to a new state
   * @param targetState Target state
   * @param context State transition context
   */
  transitionTo(targetState: ILayoutState, context?: Partial<ILayoutStateContext>): Promise<ILayoutStateTransitionResult>;
  
  /**
   * Get a state by name
   * @param stateName State name
   */
  getState(stateName: string): ILayoutState | undefined;
  
  /**
   * Register a new state
   * @param state State to register
   */
  registerState(state: ILayoutState): void;
  
  /**
   * Unregister a state
   * @param stateName State name
   */
  unregisterState(stateName: string): boolean;
  
  /**
   * Handle a state action
   * @param action Action to handle
   * @param context State context
   */
  handleAction(action: ILayoutStateAction, context?: Partial<ILayoutStateContext>): Promise<ILayoutStateActionResult>;
  
  /**
   * Update current state
   * @param context State update context
   */
  updateCurrentState(context?: Partial<ILayoutStateContext>): Promise<void>;
  
  /**
   * Get state history
   * @param filter Filter function
   */
  getStateHistory(filter?: (state: ILayoutState) => boolean): ILayoutState[];
  
  /**
   * Get state statistics
   */
  getStatistics(): IStateManagerStatistics;
  
  /**
   * Add state listener
   * @param listener Listener to add
   */
  addListener(listener: IStateListener): void;
  
  /**
   * Remove state listener
   * @param listener Listener to remove
   */
  removeListener(listener: IStateListener): boolean;
}

/**
 * State transition interface
 * Represents a transition between states
 */
export interface ILayoutStateTransition {
  /** Transition ID */
  id: string;
  
  /** Source state */
  fromState: ILayoutState;
  
  /** Target state */
  toState: ILayoutState;
  
  /** Transition timestamp */
  timestamp: number;
  
  /** Transition duration */
  duration: number;
  
  /** Transition success */
  success: boolean;
  
  /** Transition error */
  error?: string;
  
  /** Transition metadata */
  metadata?: Record<string, unknown>;
}

/**
 * State transition result interface
 */
export interface ILayoutStateTransitionResult {
  /** Whether the transition was successful */
  success: boolean;
  
  /** Error message if failed */
  error?: string;
  
  /** Transition details */
  transition: ILayoutStateTransition;
  
  /** Transition duration */
  duration: number;
  
  /** Transition metadata */
  metadata: Record<string, unknown>;
}

/**
 * State listener interface
 */
export interface IStateListener {
  /**
   * Called when a state is entered
   * @param state The state that was entered
   * @param context State context
   */
  onStateEntered?(state: ILayoutState, context: ILayoutStateContext): void;
  
  /**
   * Called when a state is exited
   * @param state The state that was exited
   * @param context State context
   */
  onStateExited?(state: ILayoutState, context: ILayoutStateContext): void;
  
  /**
   * Called when a state transition occurs
   * @param transition The state transition
   */
  onStateTransitioned?(transition: ILayoutStateTransition): void;
  
  /**
   * Called when a state action is handled
   * @param action The action that was handled
   * @param result The action result
   */
  onActionHandled?(action: ILayoutStateAction, result: ILayoutStateActionResult): void;
  
  /**
   * Called when an error occurs
   * @param error The error that occurred
   * @param state The state where the error occurred
   */
  onError?(error: Error, state?: ILayoutState): void;
}

/**
 * State manager statistics interface
 */
export interface IStateManagerStatistics {
  /** Total state transitions */
  totalTransitions: number;
  
  /** Successful transitions */
  successfulTransitions: number;
  
  /** Failed transitions */
  failedTransitions: number;
  
  /** Current state duration */
  currentStateDuration: number;
  
  /** Average transition time */
  averageTransitionTime: number;
  
  /** State distribution */
  stateDistribution: Record<string, number>;
  
  /** Performance metrics */
  performance: {
    totalTransitionTime: number;
    totalActionHandlingTime: number;
    memoryUsage: number;
    errorRate: number;
  };
}

// ============================================================================
// STATE FACTORY INTERFACES
// ============================================================================

/**
 * Layout state factory interface
 * Creates layout states
 */
export interface ILayoutStateFactory {
  /**
   * Create a state by type
   * @param type State type
   * @param config State configuration
   */
  createState(type: string, config: Record<string, unknown>): ILayoutState;
  
  /**
   * Create an idle state
   * @param config State configuration
   */
  createIdleState(config?: Record<string, unknown>): IIdleLayoutState;
  
  /**
   * Create a calculating state
   * @param config State configuration
   */
  createCalculatingState(config?: Record<string, unknown>): ICalculatingLayoutState;
  
  /**
   * Create a cached state
   * @param config State configuration
   */
  createCachedState(config?: Record<string, unknown>): ICachedLayoutState;
  
  /**
   * Create an error state
   * @param error Error that caused the state
   * @param config State configuration
   */
  createErrorState(error: Error, config?: Record<string, unknown>): IErrorLayoutState;
  
  /**
   * Create a validating state
   * @param config State configuration
   */
  createValidatingState(config?: Record<string, unknown>): IValidatingLayoutState;
  
  /**
   * Create a transitioning state
   * @param fromState Source state
   * @param toState Target state
   * @param config State configuration
   */
  createTransitioningState(fromState: ILayoutState, toState: ILayoutState, config?: Record<string, unknown>): ITransitioningLayoutState;
  
  /**
   * Get available state types
   */
  getAvailableStateTypes(): string[];
  
  /**
   * Get state configuration schema
   * @param type State type
   */
  getStateConfigSchema(type: string): Record<string, unknown>;
}
