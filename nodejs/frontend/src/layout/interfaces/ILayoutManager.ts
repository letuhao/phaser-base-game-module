/**
 * Layout Manager Interface
 * Main orchestrator for the layout system
 * Manages layout calculations, strategies, and system lifecycle
 */

import { 
  LayoutType,
  BreakpointName,
  PerformanceLevel,
  UpdateFrequency,
  LogLevel
} from '../enums/LayoutEnums';
import { 
  ILayout,
  ILayoutConfig,
  ILayoutContext,
  ICalculatedLayout,
  ILayoutValidationResult
} from './ILayout';
import { 
  ILayoutStrategy,
  IStrategyRegistry,
  IStrategyFactory
} from './ILayoutStrategy';

// ============================================================================
// LAYOUT MANAGER INTERFACES
// ============================================================================

/**
 * Main layout manager interface
 * Orchestrates the entire layout system
 */
export interface ILayoutManager {
  /** Whether the manager is initialized */
  readonly isInitialized: boolean;
  
  /** Current layout context */
  readonly currentContext: ILayoutContext;
  
  /** Strategy registry */
  readonly strategyRegistry: IStrategyRegistry;
  
  /** Strategy factory */
  readonly strategyFactory: IStrategyFactory;
  
  /** Registered layouts */
  readonly layouts: Map<string, ILayout>;
  
  /** Active layouts */
  readonly activeLayouts: Map<string, ILayout>;
  
  /** Layout cache */
  readonly layoutCache: Map<string, ICalculatedLayout>;
  
  /** Event listeners */
  readonly listeners: Set<ILayoutListener>;
  
  /**
   * Initialize the layout manager
   * @param config Initialization configuration
   */
  initialize(config?: ILayoutManagerConfig): Promise<void>;
  
  /**
   * Destroy the layout manager and clean up resources
   */
  destroy(): Promise<void>;
  
  /**
   * Register a layout
   * @param layout Layout to register
   */
  registerLayout(layout: ILayout): void;
  
  /**
   * Unregister a layout
   * @param layoutId Layout ID to unregister
   */
  unregisterLayout(layoutId: string): boolean;
  
  /**
   * Get a layout by ID
   * @param layoutId Layout ID
   */
  getLayout(layoutId: string): ILayout | undefined;
  
  /**
   * Get all layouts matching a filter
   * @param filter Filter function
   */
  getLayouts(filter?: (layout: ILayout) => boolean): ILayout[];
  
  /**
   * Activate a layout
   * @param layoutId Layout ID to activate
   */
  activateLayout(layoutId: string): Promise<void>;
  
  /**
   * Deactivate a layout
   * @param layoutId Layout ID to deactivate
   */
  deactivateLayout(layoutId: string): Promise<void>;
  
  /**
   * Calculate layout for an element
   * @param config Layout configuration
   * @param context Layout context
   */
  calculateLayout(config: ILayoutConfig, context?: Partial<ILayoutContext>): ICalculatedLayout;
  
  /**
   * Apply layout to an element
   * @param element Element to apply layout to
   * @param layoutId Layout ID to apply
   */
  applyLayout(element: unknown, layoutId: string): Promise<void>;
  
  /**
   * Remove layout from an element
   * @param element Element to remove layout from
   * @param layoutId Layout ID to remove
   */
  removeLayout(element: unknown, layoutId: string): Promise<void>;
  
  /**
   * Update layout context
   * @param context New context or partial context
   */
  updateContext(context: Partial<ILayoutContext>): void;
  
  /**
   * Get current layout context
   */
  getCurrentContext(): ILayoutContext;
  
  /**
   * Validate layout configuration
   * @param config Layout configuration to validate
   */
  validateLayout(config: ILayoutConfig): ILayoutValidationResult;
  
  /**
   * Get layout statistics
   */
  getStatistics(): ILayoutManagerStatistics;
  
  /**
   * Add event listener
   * @param listener Listener to add
   */
  addListener(listener: ILayoutListener): void;
  
  /**
   * Remove event listener
   * @param listener Listener to remove
   */
  removeListener(listener: ILayoutListener): boolean;
  
  /**
   * Clear all listeners
   */
  clearListeners(): void;
  
  /**
   * Export layout configuration
   * @param layoutId Layout ID to export
   */
  exportLayout(layoutId: string): string;
  
  /**
   * Import layout configuration
   * @param config Layout configuration string
   */
  importLayout(config: string): ILayout;
  
  /**
   * Reset manager to initial state
   */
  reset(): void;
}

/**
 * Layout manager configuration interface
 */
export interface ILayoutManagerConfig {
  /** Initial context */
  initialContext?: Partial<ILayoutContext>;
  
  /** Default strategies to register */
  defaultStrategies?: LayoutType[];
  
  /** Performance settings */
  performance?: {
    level: PerformanceLevel;
    updateFrequency: UpdateFrequency;
    enableCaching: boolean;
    cacheSize: number;
  };
  
  /** Validation settings */
  validation?: {
    enabled: boolean;
    strict: boolean;
    autoValidate: boolean;
  };
  
  /** Logging settings */
  logging?: {
    enabled: boolean;
    level: LogLevel;
    includePerformance: boolean;
  };
  
  /** Custom configuration */
  custom?: Record<string, unknown>;
}

/**
 * Layout listener interface
 * Defines callbacks for layout events
 */
export interface ILayoutListener {
  /**
   * Called when a layout is registered
   * @param layout The layout that was registered
   */
  onLayoutRegistered?(layout: ILayout): void;
  
  /**
   * Called when a layout is unregistered
   * @param layout The layout that was unregistered
   */
  onLayoutUnregistered?(layout: ILayout): void;
  
  /**
   * Called when a layout is activated
   * @param layout The layout that was activated
   */
  onLayoutActivated?(layout: ILayout): void;
  
  /**
   * Called when a layout is deactivated
   * @param layout The layout that was deactivated
   */
  onLayoutDeactivated?(layout: ILayout): void;
  
  /**
   * Called when a layout is calculated
   * @param layout The layout that was calculated
   * @param result The calculation result
   */
  onLayoutCalculated?(layout: ILayout, result: ICalculatedLayout): void;
  
  /**
   * Called when a layout is applied to an element
   * @param element The element the layout was applied to
   * @param layout The layout that was applied
   */
  onLayoutApplied?(element: unknown, layout: ILayout): void;
  
  /**
   * Called when a layout is removed from an element
   * @param element The element the layout was removed from
   * @param layout The layout that was removed
   */
  onLayoutRemoved?(element: unknown, layout: ILayout): void;
  
  /**
   * Called when the context is updated
   * @param newContext The new context
   * @param oldContext The previous context
   */
  onContextUpdated?(newContext: ILayoutContext, oldContext: ILayoutContext): void;
  
  /**
   * Called when a strategy is registered
   * @param strategy The strategy that was registered
   */
  onStrategyRegistered?(strategy: ILayoutStrategy): void;
  
  /**
   * Called when a strategy is unregistered
   * @param strategy The strategy that was unregistered
   */
  onStrategyUnregistered?(strategy: ILayoutStrategy): void;
  
  /**
   * Called when an error occurs
   * @param error The error that occurred
   * @param context Additional context about the error
   */
  onError?(error: Error, context?: Record<string, unknown>): void;
}

/**
 * Layout manager statistics interface
 */
export interface ILayoutManagerStatistics {
  /** Total number of registered layouts */
  totalLayouts: number;
  
  /** Number of active layouts */
  activeLayouts: number;
  
  /** Number of inactive layouts */
  inactiveLayouts: number;
  
  /** Total number of layout calculations */
  totalCalculations: number;
  
  /** Total number of layout applications */
  totalApplications: number;
  
  /** Average calculation time in milliseconds */
  averageCalculationTime: number;
  
  /** Average application time in milliseconds */
  averageApplicationTime: number;
  
  /** Memory usage in bytes */
  memoryUsage: number;
  
  /** Cache hit rate */
  cacheHitRate: number;
  
  /** Error rate */
  errorRate: number;
  
  /** Performance metrics */
  performance: {
    /** Total time spent calculating layouts */
    totalCalculationTime: number;
    
    /** Total time spent applying layouts */
    totalApplicationTime: number;
    
    /** Number of calculations per second */
    calculationsPerSecond: number;
    
    /** Number of applications per second */
    applicationsPerSecond: number;
    
    /** Cache efficiency */
    cacheEfficiency: number;
  };
  
  /** Layout type distribution */
  layoutTypes: Record<LayoutType, number>;
  
  /** Strategy statistics */
  strategies: {
    totalStrategies: number;
    enabledStrategies: number;
    disabledStrategies: number;
    averagePriority: number;
  };
  
  /** Context information */
  context: {
    lastUpdateTime: number;
    updateCount: number;
    currentBreakpoint: BreakpointName | null;
  };
}

// ============================================================================
// LAYOUT CACHE INTERFACES
// ============================================================================

/**
 * Layout cache interface
 * Manages caching of layout calculations
 */
export interface ILayoutCache {
  /**
   * Get cached layout calculation
   * @param key Cache key
   */
  get(key: string): ICalculatedLayout | undefined;
  
  /**
   * Set cached layout calculation
   * @param key Cache key
   * @param layout Layout calculation to cache
   */
  set(key: string, layout: ICalculatedLayout): void;
  
  /**
   * Check if cache has a key
   * @param key Cache key
   */
  has(key: string): boolean;
  
  /**
   * Delete cached layout calculation
   * @param key Cache key
   */
  delete(key: string): boolean;
  
  /**
   * Clear all cached calculations
   */
  clear(): void;
  
  /**
   * Get cache statistics
   */
  getStatistics(): ILayoutCacheStatistics;
  
  /**
   * Generate cache key for layout configuration
   * @param config Layout configuration
   * @param context Layout context
   */
  generateKey(config: ILayoutConfig, context: ILayoutContext): string;
}

/**
 * Layout cache statistics interface
 */
export interface ILayoutCacheStatistics {
  /** Total number of cached items */
  totalItems: number;
  
  /** Cache hits */
  hits: number;
  
  /** Cache misses */
  misses: number;
  
  /** Hit rate */
  hitRate: number;
  
  /** Memory usage in bytes */
  memoryUsage: number;
  
  /** Average item size in bytes */
  averageItemSize: number;
  
  /** Cache performance */
  performance: {
    /** Average lookup time in milliseconds */
    averageLookupTime: number;
    
    /** Average storage time in milliseconds */
    averageStorageTime: number;
    
    /** Total lookup time */
    totalLookupTime: number;
    
    /** Total storage time */
    totalStorageTime: number;
  };
}
