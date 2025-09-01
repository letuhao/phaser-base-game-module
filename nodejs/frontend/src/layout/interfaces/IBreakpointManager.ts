/**
 * Breakpoint Manager Interface
 * Defines the contract for managing breakpoints in the layout system
 * Handles registration, evaluation, and lifecycle of breakpoints
 */

import { IBreakpoint, IBreakpointContext } from './IBreakpoint';
import { BreakpointName } from '../enums/LayoutEnums';

/**
 * Breakpoint manager interface
 * Manages the lifecycle and evaluation of breakpoints
 */
export interface IBreakpointManager {
  /** Current active breakpoint */
  readonly activeBreakpoint: IBreakpoint | null;
  
  /** All registered breakpoints */
  readonly breakpoints: Map<string, IBreakpoint>;
  
  /** Current breakpoint context */
  readonly context: IBreakpointContext;
  
  /** Whether the manager is initialized */
  readonly isInitialized: boolean;
  
  /** Event listeners for breakpoint changes */
  readonly listeners: Set<IBreakpointListener>;
  
  /**
   * Initialize the breakpoint manager
   * @param context Initial context
   */
  initialize(context: IBreakpointContext): Promise<void>;
  
  /**
   * Register a new breakpoint
   * @param breakpoint Breakpoint to register
   */
  registerBreakpoint(breakpoint: IBreakpoint): void;
  
  /**
   * Unregister a breakpoint by ID
   * @param id Breakpoint ID to unregister
   */
  unregisterBreakpoint(id: string): boolean;
  
  /**
   * Get a breakpoint by ID
   * @param id Breakpoint ID
   */
  getBreakpoint(id: string): IBreakpoint | undefined;
  
  /**
   * Get a breakpoint by name
   * @param name Breakpoint name
   */
  getBreakpointByName(name: BreakpointName): IBreakpoint | undefined;
  
  /**
   * Get all breakpoints matching a filter
   * @param filter Filter function
   */
  getBreakpoints(filter?: (breakpoint: IBreakpoint) => boolean): IBreakpoint[];
  
  /**
   * Evaluate all breakpoints against current context
   * @param context Context to evaluate against
   */
  evaluateBreakpoints(context: IBreakpointContext): IBreakpoint[];
  
  /**
   * Update the current context and re-evaluate breakpoints
   * @param context New context
   */
  updateContext(context: Partial<IBreakpointContext>): void;
  
  /**
   * Get the currently active breakpoint
   */
  getActiveBreakpoint(): IBreakpoint | null;
  
  /**
   * Check if a specific breakpoint is active
   * @param id Breakpoint ID
   */
  isBreakpointActive(id: string): boolean;
  
  /**
   * Add a listener for breakpoint changes
   * @param listener Listener to add
   */
  addListener(listener: IBreakpointListener): void;
  
  /**
   * Remove a listener
   * @param listener Listener to remove
   */
  removeListener(listener: IBreakpointListener): boolean;
  
  /**
   * Clear all listeners
   */
  clearListeners(): void;
  
  /**
   * Get breakpoint statistics
   */
  getStatistics(): IBreakpointStatistics;
  
  /**
   * Reset the manager to initial state
   */
  reset(): void;
  
  /**
   * Destroy the manager and clean up resources
   */
  destroy(): void;
}

/**
 * Breakpoint listener interface
 * Defines callbacks for breakpoint events
 */
export interface IBreakpointListener {
  /**
   * Called when a breakpoint becomes active
   * @param breakpoint The breakpoint that became active
   * @param previousBreakpoint The previously active breakpoint
   */
  onBreakpointActivated?(breakpoint: IBreakpoint, previousBreakpoint: IBreakpoint | null): void;
  
  /**
   * Called when a breakpoint becomes inactive
   * @param breakpoint The breakpoint that became inactive
   * @param newBreakpoint The newly active breakpoint
   */
  onBreakpointDeactivated?(breakpoint: IBreakpoint, newBreakpoint: IBreakpoint | null): void;
  
  /**
   * Called when the context changes
   * @param context The new context
   * @param previousContext The previous context
   */
  onContextChanged?(context: IBreakpointContext, previousContext: IBreakpointContext): void;
  
  /**
   * Called when a breakpoint is registered
   * @param breakpoint The breakpoint that was registered
   */
  onBreakpointRegistered?(breakpoint: IBreakpoint): void;
  
  /**
   * Called when a breakpoint is unregistered
   * @param breakpoint The breakpoint that was unregistered
   */
  onBreakpointUnregistered?(breakpoint: IBreakpoint): void;
}

/**
 * Breakpoint statistics interface
 * Provides metrics about breakpoint usage and performance
 */
export interface IBreakpointStatistics {
  /** Total number of registered breakpoints */
  totalBreakpoints: number;
  
  /** Number of active breakpoints */
  activeBreakpoints: number;
  
  /** Number of inactive breakpoints */
  inactiveBreakpoints: number;
  
  /** Number of context updates */
  contextUpdates: number;
  
  /** Number of breakpoint evaluations */
  evaluations: number;
  
  /** Average evaluation time in milliseconds */
  averageEvaluationTime: number;
  
  /** Last evaluation time in milliseconds */
  lastEvaluationTime: number;
  
  /** Memory usage in bytes */
  memoryUsage: number;
  
  /** Performance metrics */
  performance: {
    /** Total time spent evaluating breakpoints */
    totalEvaluationTime: number;
    
    /** Number of evaluations per second */
    evaluationsPerSecond: number;
    
    /** Cache hit rate (if caching is implemented) */
    cacheHitRate: number;
  };
}
