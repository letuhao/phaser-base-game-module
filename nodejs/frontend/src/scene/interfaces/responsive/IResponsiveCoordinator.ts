/**
 * Responsive Coordinator Service Interface
 *
 * Coordinates responsive updates across all systems and bridge interfaces.
 * Manages the complete responsive update flow from event detection to system updates.
 *
 * This coordinator provides:
 * - Centralized responsive update coordination
 * - Bridge interface management
 * - System update orchestration
 * - Performance optimization and monitoring
 */

import type { IBreakpointChange, IResponsiveUpdateResult } from './IResponsiveEventHandler';
import { BreakpointName, ResponsiveSystem, UpdatePriority } from './IResponsiveEventHandler';

// ============================================================================
// RESPONSIVE COORDINATOR INTERFACE
// ============================================================================

/**
 * Interface for coordinating responsive updates across all systems
 *
 * Manages the complete responsive update flow and coordinates all bridge interfaces.
 */
export interface IResponsiveCoordinator {
  /** Coordinator ID */
  readonly coordinatorId: string;

  /** Whether the coordinator is initialized */
  readonly isInitialized: boolean;

  /** Current breakpoint */
  readonly currentBreakpoint: BreakpointName | null;

  /** Coordinator statistics */
  readonly statistics: IResponsiveCoordinatorStatistics;

  // ===== INITIALIZATION =====

  /**
   * Initialize the responsive coordinator
   * @param config Coordinator configuration
   */
  initialize(config?: IResponsiveCoordinatorConfig): Promise<void>;

  /**
   * Destroy the coordinator and clean up resources
   */
  destroy(): Promise<void>;

  // ===== BRIDGE MANAGEMENT =====

  /**
   * Register bridge interface
   * @param bridge Bridge interface to register
   */
  registerBridge(bridge: IResponsiveBridge): void;

  /**
   * Unregister bridge interface
   * @param bridgeId Bridge ID to unregister
   */
  unregisterBridge(bridgeId: string): void;

  /**
   * Get registered bridge by ID
   * @param bridgeId Bridge ID
   */
  getBridge(bridgeId: string): IResponsiveBridge | null;

  /**
   * Get all registered bridges
   */
  getAllBridges(): IResponsiveBridge[];

  /**
   * Get bridges for specific system
   * @param system System to get bridges for
   */
  getBridgesForSystem(system: ResponsiveSystem): IResponsiveBridge[];

  // ===== RESPONSIVE UPDATE COORDINATION =====

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
  executeSystemUpdate(
    system: ResponsiveSystem,
    change: IBreakpointChange
  ): Promise<ISystemUpdateResult>;

  /**
   * Execute responsive update for multiple systems
   * @param systems Systems to update
   * @param change Breakpoint change information
   */
  executeMultipleSystemUpdates(
    systems: ResponsiveSystem[],
    change: IBreakpointChange
  ): Promise<ISystemUpdateResult[]>;

  /**
   * Execute responsive update for all systems
   * @param change Breakpoint change information
   */
  executeAllSystemUpdates(change: IBreakpointChange): Promise<ISystemUpdateResult[]>;

  // ===== BRIDGE COORDINATION =====

  /**
   * Coordinate bridge updates for breakpoint change
   * @param change Breakpoint change information
   */
  coordinateBridgeUpdates(change: IBreakpointChange): Promise<IBridgeUpdateResult[]>;

  /**
   * Coordinate bridge transitions
   * @param fromBreakpoint Source breakpoint
   * @param toBreakpoint Target breakpoint
   */
  coordinateBridgeTransitions(
    fromBreakpoint: BreakpointName,
    toBreakpoint: BreakpointName
  ): Promise<IBridgeTransitionResult[]>;

  /**
   * Coordinate bridge validations
   * @param change Breakpoint change information
   */
  coordinateBridgeValidations(change: IBreakpointChange): Promise<IBridgeValidationResult[]>;

  // ===== SYSTEM INTEGRATION =====

  /**
   * Register system manager
   * @param system System type
   * @param manager System manager
   */
  registerSystemManager(system: ResponsiveSystem, manager: ISystemManager): void;

  /**
   * Unregister system manager
   * @param system System type
   */
  unregisterSystemManager(system: ResponsiveSystem): void;

  /**
   * Get system manager
   * @param system System type
   */
  getSystemManager(system: ResponsiveSystem): ISystemManager | null;

  /**
   * Update system for breakpoint change
   * @param system System to update
   * @param change Breakpoint change information
   */
  updateSystem(system: ResponsiveSystem, change: IBreakpointChange): Promise<ISystemUpdateResult>;

  // ===== PERFORMANCE OPTIMIZATION =====

  /**
   * Optimize responsive update performance
   * @param change Breakpoint change information
   */
  optimizeUpdatePerformance(change: IBreakpointChange): Promise<IPerformanceOptimizationResult>;

  /**
   * Get update priority for breakpoint change
   * @param change Breakpoint change information
   */
  getUpdatePriority(change: IBreakpointChange): UpdatePriority;

  /**
   * Check if update is needed
   * @param change Breakpoint change information
   */
  isUpdateNeeded(change: IBreakpointChange): boolean;

  /**
   * Get affected systems for breakpoint change
   * @param change Breakpoint change information
   */
  getAffectedSystems(change: IBreakpointChange): ResponsiveSystem[];

  // ===== MONITORING AND STATISTICS =====

  /**
   * Get coordinator statistics
   */
  getStatistics(): IResponsiveCoordinatorStatistics;

  /**
   * Get bridge statistics
   */
  getBridgeStatistics(): IBridgeStatistics[];

  /**
   * Get system statistics
   */
  getSystemStatistics(): ISystemStatistics[];

  /**
   * Clear all statistics
   */
  clearStatistics(): void;

  // ===== UTILITY METHODS =====

  /**
   * Reset coordinator to initial state
   */
  reset(): void;

  /**
   * Get coordinator health status
   */
  getHealthStatus(): ICoordinatorHealthStatus;
}

// ============================================================================
// SUPPORTING INTERFACES
// ============================================================================

/**
 * Responsive bridge interface (base interface for all bridges)
 */
export interface IResponsiveBridge {
  /** Bridge ID */
  readonly bridgeId: string;

  /** Bridge type */
  readonly bridgeType: string;

  /** Supported systems */
  readonly supportedSystems: ResponsiveSystem[];

  /** Whether bridge is initialized */
  readonly isInitialized: boolean;

  /**
   * Initialize the bridge
   */
  initialize(): Promise<void>;

  /**
   * Destroy the bridge
   */
  destroy(): Promise<void>;

  /**
   * Handle breakpoint change
   * @param change Breakpoint change information
   */
  handleBreakpointChange(change: IBreakpointChange): Promise<IBridgeUpdateResult>;

  /**
   * Check if bridge supports system
   * @param system System to check
   */
  supportsSystem(system: ResponsiveSystem): boolean;

  /**
   * Get bridge statistics
   */
  getStatistics(): any;
}

/**
 * System manager interface
 */
export interface ISystemManager {
  /** System type */
  readonly systemType: ResponsiveSystem;

  /** Manager ID */
  readonly managerId: string;

  /** Whether manager is initialized */
  readonly isInitialized: boolean;

  /**
   * Initialize the manager
   */
  initialize(): Promise<void>;

  /**
   * Destroy the manager
   */
  destroy(): Promise<void>;

  /**
   * Update system for breakpoint change
   * @param change Breakpoint change information
   */
  updateSystem(change: IBreakpointChange): Promise<ISystemUpdateResult>;

  /**
   * Get system statistics
   */
  getStatistics(): ISystemStatistics;
}

/**
 * Responsive coordinator configuration interface
 */
export interface IResponsiveCoordinatorConfig {
  /** Bridge settings */
  bridges?: {
    enableAutoRegistration: boolean;
    enableBridgeValidation: boolean;
    maxBridges: number;
  };

  /** Performance settings */
  performance?: {
    enableOptimization: boolean;
    enableParallelUpdates: boolean;
    maxConcurrentUpdates: number;
    updateTimeout: number;
  };

  /** Monitoring settings */
  monitoring?: {
    enableStatistics: boolean;
    enableHealthChecks: boolean;
    statisticsRetentionPeriod: number;
  };

  /** Custom configuration */
  custom?: Record<string, any>;
}

/**
 * Bridge update result interface
 */
export interface IBridgeUpdateResult {
  /** Bridge ID */
  bridgeId: string;

  /** Whether update was successful */
  success: boolean;

  /** Update duration in milliseconds */
  duration: number;

  /** Update errors */
  errors: string[];

  /** Update warnings */
  warnings: string[];

  /** Update metadata */
  metadata: {
    bridgeType: string;
    supportedSystems: ResponsiveSystem[];
    updateTimestamp: Date;
  };
}

/**
 * Bridge transition result interface
 */
export interface IBridgeTransitionResult {
  /** Bridge ID */
  bridgeId: string;

  /** Whether transition was successful */
  success: boolean;

  /** Transition duration in milliseconds */
  duration: number;

  /** Transition errors */
  errors: string[];

  /** Transition metadata */
  metadata: {
    fromBreakpoint: BreakpointName;
    toBreakpoint: BreakpointName;
    transitionTimestamp: Date;
  };
}

/**
 * Bridge validation result interface
 */
export interface IBridgeValidationResult {
  /** Bridge ID */
  bridgeId: string;

  /** Whether validation passed */
  isValid: boolean;

  /** Validation errors */
  errors: string[];

  /** Validation warnings */
  warnings: string[];

  /** Validation metadata */
  metadata: {
    validationTimestamp: Date;
    validationDuration: number;
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
  errors: string[];

  /** Update warnings */
  warnings: string[];

  /** Update metadata */
  metadata: {
    systemVersion: string;
    updateMethod: string;
    updateTimestamp: Date;
  };
}

/**
 * Performance optimization result interface
 */
export interface IPerformanceOptimizationResult {
  /** Whether optimization was successful */
  success: boolean;

  /** Optimization duration in milliseconds */
  duration: number;

  /** Performance improvements */
  improvements: string[];

  /** Optimization metadata */
  metadata: {
    optimizationTimestamp: Date;
    performanceGains: {
      updateTime: number;
      memoryUsage: number;
      cacheEfficiency: number;
    };
  };
}

/**
 * Bridge statistics interface
 */
export interface IBridgeStatistics {
  /** Bridge ID */
  bridgeId: string;

  /** Bridge type */
  bridgeType: string;

  /** Total updates */
  totalUpdates: number;

  /** Successful updates */
  successfulUpdates: number;

  /** Failed updates */
  failedUpdates: number;

  /** Average update time */
  averageUpdateTime: number;

  /** Last update timestamp */
  lastUpdateTimestamp: Date | null;
}

/**
 * System statistics interface
 */
export interface ISystemStatistics {
  /** System type */
  systemType: ResponsiveSystem;

  /** Total updates */
  totalUpdates: number;

  /** Successful updates */
  successfulUpdates: number;

  /** Failed updates */
  failedUpdates: number;

  /** Average update time */
  averageUpdateTime: number;

  /** Last update timestamp */
  lastUpdateTimestamp: Date | null;
}

/**
 * Responsive coordinator statistics interface
 */
export interface IResponsiveCoordinatorStatistics {
  /** Total updates coordinated */
  totalUpdates: number;

  /** Successful updates */
  successfulUpdates: number;

  /** Failed updates */
  failedUpdates: number;

  /** Average update time */
  averageUpdateTime: number;

  /** Registered bridges */
  registeredBridges: number;

  /** Registered systems */
  registeredSystems: number;

  /** Performance metrics */
  performance: {
    updatesPerSecond: number;
    averageCoordinationTime: number;
    averageBridgeUpdateTime: number;
    averageSystemUpdateTime: number;
  };

  /** Error statistics */
  errors: {
    totalErrors: number;
    bridgeErrors: number;
    systemErrors: number;
    coordinationErrors: number;
  };
}

/**
 * Coordinator health status interface
 */
export interface ICoordinatorHealthStatus {
  /** Overall health status */
  status: 'healthy' | 'degraded' | 'unhealthy';

  /** Health score (0-100) */
  healthScore: number;

  /** Health issues */
  issues: string[];

  /** Health recommendations */
  recommendations: string[];

  /** Last health check timestamp */
  lastHealthCheck: Date;
}
