/**
 * Responsive Event Handler Interface
 *
 * Handles responsive events (window resize, orientation change, device change)
 * and coordinates the responsive update flow across all systems.
 *
 * This handler provides:
 * - Window resize event management
 * - Breakpoint change detection
 * - Responsive update coordination
 * - Performance optimization for resize events
 */

import { BreakpointName, DeviceType, DeviceOrientation } from '../../../layout/enums/LayoutEnums';

// Re-export for use in other files
export { BreakpointName, DeviceType, DeviceOrientation };

// ============================================================================
// RESPONSIVE EVENT HANDLER INTERFACE
// ============================================================================

/**
 * Interface for handling responsive events and coordinating updates
 *
 * Manages the complete responsive update flow from event detection to system updates.
 */
export interface IResponsiveEventHandler {
  /** Handler ID */
  readonly handlerId: string;

  /** Whether the handler is initialized */
  readonly isInitialized: boolean;

  /** Current breakpoint */
  readonly currentBreakpoint: BreakpointName | null;

  /** Previous breakpoint */
  readonly previousBreakpoint: BreakpointName | null;

  /** Handler statistics */
  readonly statistics: IResponsiveEventHandlerStatistics;

  // ===== INITIALIZATION =====

  /**
   * Initialize the responsive event handler
   * @param config Handler configuration
   */
  initialize(config?: IResponsiveEventHandlerConfig): Promise<void>;

  /**
   * Destroy the handler and clean up resources
   */
  destroy(): Promise<void>;

  // ===== EVENT MANAGEMENT =====

  /**
   * Start listening for responsive events
   */
  startListening(): void;

  /**
   * Stop listening for responsive events
   */
  stopListening(): void;

  /**
   * Check if currently listening for events
   */
  isListening(): boolean;

  /**
   * Manually trigger responsive update
   * @param reason Reason for the update
   */
  triggerResponsiveUpdate(reason?: string): Promise<void>;

  // ===== BREAKPOINT DETECTION =====

  /**
   * Get current breakpoint based on viewport
   */
  getCurrentBreakpoint(): BreakpointName;

  /**
   * Check if breakpoint has changed
   */
  hasBreakpointChanged(): boolean;

  /**
   * Get breakpoint change information
   */
  getBreakpointChange(): IBreakpointChange | null;

  /**
   * Get current viewport dimensions
   */
  getCurrentViewport(): IViewportDimensions;

  /**
   * Get current device information
   */
  getCurrentDevice(): IDeviceInfo;

  // ===== RESPONSIVE UPDATE FLOW =====

  /**
   * Execute complete responsive update flow
   * @param change Breakpoint change information
   */
  executeResponsiveUpdateFlow(change: IBreakpointChange): Promise<IResponsiveUpdateResult>;

  /**
   * Execute responsive update for specific system
   * @param system System to update
   * @param change Breakpoint change information
   */
  executeSystemResponsiveUpdate(
    system: ResponsiveSystem,
    change: IBreakpointChange
  ): Promise<ISystemUpdateResult>;

  /**
   * Execute responsive update for all systems
   * @param change Breakpoint change information
   */
  executeAllSystemsResponsiveUpdate(change: IBreakpointChange): Promise<ISystemUpdateResult[]>;

  // ===== PERFORMANCE OPTIMIZATION =====

  /**
   * Debounce resize events
   * @param callback Callback to debounce
   * @param delay Delay in milliseconds
   */
  debounceResizeEvents(callback: () => void, delay?: number): void;

  /**
   * Throttle resize events
   * @param callback Callback to throttle
   * @param delay Delay in milliseconds
   */
  throttleResizeEvents(callback: () => void, delay?: number): void;

  /**
   * Check if update is needed (performance optimization)
   * @param change Breakpoint change information
   */
  isUpdateNeeded(change: IBreakpointChange): boolean;

  /**
   * Get update priority for breakpoint change
   * @param change Breakpoint change information
   */
  getUpdatePriority(change: IBreakpointChange): UpdatePriority;

  // ===== EVENT LISTENERS =====

  /**
   * Add responsive event listener
   * @param listener Event listener
   */
  addEventListener(listener: IResponsiveEventListener): void;

  /**
   * Remove responsive event listener
   * @param listener Event listener
   */
  removeEventListener(listener: IResponsiveEventListener): void;

  /**
   * Remove all event listeners
   */
  clearEventListeners(): void;

  // ===== UTILITY METHODS =====

  /**
   * Get handler statistics
   */
  getStatistics(): IResponsiveEventHandlerStatistics;

  /**
   * Reset handler to initial state
   */
  reset(): void;
}

// ============================================================================
// SUPPORTING INTERFACES
// ============================================================================

/**
 * Responsive event handler configuration interface
 */
export interface IResponsiveEventHandlerConfig {
  /** Event handling settings */
  events?: {
    enableWindowResize: boolean;
    enableOrientationChange: boolean;
    enableDeviceChange: boolean;
    debounceDelay: number;
    throttleDelay: number;
  };

  /** Performance settings */
  performance?: {
    enableUpdateOptimization: boolean;
    enableLazyUpdates: boolean;
    maxConcurrentUpdates: number;
    updateTimeout: number;
  };

  /** Breakpoint settings */
  breakpoints?: {
    enableAutoDetection: boolean;
    customBreakpoints?: Record<string, { width: number; height: number }>;
    breakpointTolerance: number;
  };

  /** Custom configuration */
  custom?: Record<string, any>;
}

/**
 * Breakpoint change information interface
 */
export interface IBreakpointChange {
  /** Previous breakpoint */
  previousBreakpoint: BreakpointName | null;

  /** Current breakpoint */
  currentBreakpoint: BreakpointName;

  /** Change type */
  changeType: 'resize' | 'orientation' | 'device' | 'manual';

  /** Previous viewport */
  previousViewport: IViewportDimensions;

  /** Current viewport */
  currentViewport: IViewportDimensions;

  /** Change timestamp */
  timestamp: Date;

  /** Change reason */
  reason?: string;

  /** Change metadata */
  metadata: {
    isSignificant: boolean;
    updatePriority: UpdatePriority;
    affectedSystems: ResponsiveSystem[];
  };
}

/**
 * Viewport dimensions interface
 */
export interface IViewportDimensions {
  /** Viewport width */
  width: number;

  /** Viewport height */
  height: number;

  /** Device pixel ratio */
  devicePixelRatio: number;

  /** Orientation */
  orientation: DeviceOrientation;

  /** Timestamp */
  timestamp: Date;
}

/**
 * Device information interface
 */
export interface IDeviceInfo {
  /** Device type */
  deviceType: DeviceType;

  /** Device orientation */
  orientation: DeviceOrientation;

  /** User agent */
  userAgent: string;

  /** Touch support */
  touchSupport: boolean;

  /** Device capabilities */
  capabilities: string[];
}

/**
 * Responsive update result interface
 */
export interface IResponsiveUpdateResult {
  /** Whether update was successful */
  success: boolean;

  /** Update duration in milliseconds */
  duration: number;

  /** System update results */
  systemResults: ISystemUpdateResult[];

  /** Update errors */
  errors: IResponsiveUpdateError[];

  /** Update warnings */
  warnings: IResponsiveUpdateWarning[];

  /** Update metadata */
  metadata: {
    breakpointChange: IBreakpointChange;
    totalSystemsUpdated: number;
    successfulUpdates: number;
    failedUpdates: number;
    updateTimestamp: Date;
  };
}

/**
 * System update result interface
 */
export interface ISystemUpdateResult {
  /** System that was updated */
  system: ResponsiveSystem;

  /** Whether update was successful */
  success: boolean;

  /** Update duration in milliseconds */
  duration: number;

  /** Update errors */
  errors: IResponsiveUpdateError[];

  /** Update warnings */
  warnings: IResponsiveUpdateWarning[];

  /** Update metadata */
  metadata: {
    systemVersion: string;
    updateMethod: string;
    updateTimestamp: Date;
  };
}

/**
 * Responsive update error interface
 */
export interface IResponsiveUpdateError {
  /** Error code */
  code: string;

  /** Error message */
  message: string;

  /** System that caused the error */
  system: ResponsiveSystem;

  /** Error severity */
  severity: 'error' | 'warning' | 'info';

  /** Suggested fix */
  suggestion?: string;

  /** Additional context */
  context?: Record<string, any>;
}

/**
 * Responsive update warning interface
 */
export interface IResponsiveUpdateWarning {
  /** Warning code */
  code: string;

  /** Warning message */
  message: string;

  /** System that caused the warning */
  system: ResponsiveSystem;

  /** Warning severity */
  severity: 'warning' | 'info';

  /** Suggested improvement */
  suggestion?: string;

  /** Additional context */
  context?: Record<string, any>;
}

/**
 * Responsive event listener interface
 */
export interface IResponsiveEventListener {
  /** Listener ID */
  readonly listenerId: string;

  /** Event types to listen for */
  readonly eventTypes: ResponsiveEventType[];

  /** Priority for event handling */
  readonly priority: number;

  /**
   * Handle responsive event
   * @param event Responsive event
   */
  handleResponsiveEvent(event: IResponsiveEvent): Promise<void>;

  /**
   * Check if listener can handle event
   * @param event Responsive event
   */
  canHandleEvent(event: IResponsiveEvent): boolean;
}

/**
 * Responsive event interface
 */
export interface IResponsiveEvent {
  /** Event type */
  type: ResponsiveEventType;

  /** Event data */
  data: IBreakpointChange;

  /** Event timestamp */
  timestamp: Date;

  /** Event source */
  source: 'window' | 'orientation' | 'device' | 'manual';
}

/**
 * Responsive event handler statistics interface
 */
export interface IResponsiveEventHandlerStatistics {
  /** Total events handled */
  totalEvents: number;

  /** Total updates executed */
  totalUpdates: number;

  /** Successful updates */
  successfulUpdates: number;

  /** Failed updates */
  failedUpdates: number;

  /** Average update time in milliseconds */
  averageUpdateTime: number;

  /** Current breakpoint */
  currentBreakpoint: BreakpointName | null;

  /** Breakpoint change count */
  breakpointChanges: number;

  /** Performance metrics */
  performance: {
    eventsPerSecond: number;
    updatesPerSecond: number;
    averageEventProcessingTime: number;
    averageUpdateTime: number;
  };

  /** Error statistics */
  errors: {
    totalErrors: number;
    systemErrors: Record<ResponsiveSystem, number>;
    errorTypes: Record<string, number>;
  };
}

// ============================================================================
// ENUMS
// ============================================================================

/**
 * Responsive systems that can be updated
 */
export enum ResponsiveSystem {
  LAYOUT = 'layout',
  THEME = 'theme',
  UNIT = 'unit',
  GAME_OBJECT = 'game_object',
  SCENE = 'scene',
}

/**
 * Responsive event types
 */
export enum ResponsiveEventType {
  BREAKPOINT_CHANGE = 'breakpoint_change',
  ORIENTATION_CHANGE = 'orientation_change',
  DEVICE_CHANGE = 'device_change',
  MANUAL_UPDATE = 'manual_update',
}

/**
 * Update priority levels
 */
export enum UpdatePriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}
