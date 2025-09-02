/**
 * Layout Theme Application Service Interface
 *
 * Bridge interface that coordinates between Layout System strategies and Game Object System decorators.
 * Provides a unified way to apply layout and theme configurations to game objects.
 *
 * This service acts as the orchestrator between:
 * - Layout System (ILayoutManager, ILayoutStrategy, IStyleManager)
 * - Game Object System (IDecoratorManager, IDecorator)
 * - Theme System (IThemeManager)
 */

import type { IGameObject } from '../../game-object/interfaces/IGameObject';
import type { IDecorator } from '../../game-object/interfaces/patterns/IDecorator';
import type { IDecoratorManager } from '../../game-object/interfaces/managers/IDecoratorManager';
import type { ILayoutManager } from '../../layout/interfaces/ILayoutManager';
import type { IStyleManager } from '../../layout/interfaces/IStyleManager';
import type { IThemeManager } from '../../layout/interfaces/IThemeManager';
import type {
  ILayoutConfig,
  ILayoutContext,
  ICalculatedLayout,
} from '../../layout/interfaces/ILayout';
import type { ITheme, IThemeClass } from '../../layout/interfaces/ITheme';

// ============================================================================
// APPLICATION CONFIGURATION INTERFACES
// ============================================================================

/**
 * Layout application configuration
 */
export interface ILayoutApplicationConfig {
  /** Layout configuration to apply */
  layoutConfig: ILayoutConfig;

  /** Layout context for calculations */
  layoutContext?: Partial<ILayoutContext>;

  /** Whether to validate layout before application */
  validateBeforeApply?: boolean;

  /** Whether to cache the calculated layout */
  enableCaching?: boolean;

  /** Custom layout strategy to use (optional) */
  customStrategy?: string;

  /** Application priority */
  priority?: number;

  /** Metadata for the application */
  metadata?: Record<string, any>;
}

/**
 * Theme application configuration
 */
export interface IThemeApplicationConfig {
  /** Theme configuration to apply */
  themeConfig: ITheme;

  /** Theme class to apply */
  themeClass?: string;

  /** Whether to validate theme before application */
  validateBeforeApply?: boolean;

  /** Whether to override existing theme */
  overrideExisting?: boolean;

  /** Application priority */
  priority?: number;

  /** Metadata for the application */
  metadata?: Record<string, any>;
}

/**
 * Combined layout and theme application configuration
 */
export interface ILayoutThemeApplicationConfig {
  /** Layout application configuration */
  layout?: ILayoutApplicationConfig;

  /** Theme application configuration */
  theme?: IThemeApplicationConfig;

  /** Whether to apply layout and theme together */
  applyTogether?: boolean;

  /** Application order (layout first, theme first, or parallel) */
  applicationOrder?: 'layout-first' | 'theme-first' | 'parallel';

  /** Whether to rollback on failure */
  rollbackOnFailure?: boolean;

  /** Metadata for the combined application */
  metadata?: Record<string, any>;
}

// ============================================================================
// APPLICATION RESULT INTERFACES
// ============================================================================

/**
 * Layout application result
 */
export interface ILayoutApplicationResult {
  /** Whether the application was successful */
  success: boolean;

  /** The calculated layout */
  calculatedLayout?: ICalculatedLayout;

  /** The decorator that was applied */
  appliedDecorator?: IDecorator;

  /** Application duration in milliseconds */
  applicationDuration: number;

  /** Any errors that occurred */
  errors?: string[];

  /** Metadata about the application */
  metadata?: Record<string, any>;
}

/**
 * Theme application result
 */
export interface IThemeApplicationResult {
  /** Whether the application was successful */
  success: boolean;

  /** The theme class that was applied */
  appliedThemeClass?: IThemeClass;

  /** The decorator that was applied */
  appliedDecorator?: IDecorator;

  /** Application duration in milliseconds */
  applicationDuration: number;

  /** Any errors that occurred */
  errors?: string[];

  /** Metadata about the application */
  metadata?: Record<string, any>;
}

/**
 * Combined application result
 */
export interface ILayoutThemeApplicationResult {
  /** Whether the combined application was successful */
  success: boolean;

  /** Layout application result */
  layoutResult?: ILayoutApplicationResult;

  /** Theme application result */
  themeResult?: IThemeApplicationResult;

  /** Total application duration in milliseconds */
  totalApplicationDuration: number;

  /** Any errors that occurred */
  errors?: string[];

  /** Metadata about the application */
  metadata?: Record<string, any>;
}

// ============================================================================
// MAIN SERVICE INTERFACE
// ============================================================================

/**
 * Layout Theme Application Service Interface
 *
 * Main interface for coordinating layout and theme application between systems.
 * Acts as a bridge between Layout System strategies and Game Object System decorators.
 */
export interface ILayoutThemeApplicationService {
  /** Service ID */
  readonly serviceId: string;

  /** Whether the service is initialized */
  readonly isInitialized: boolean;

  /** Layout manager reference */
  readonly layoutManager: ILayoutManager;

  /** Style manager reference */
  readonly styleManager: IStyleManager;

  /** Theme manager reference */
  readonly themeManager: IThemeManager;

  /** Decorator manager reference */
  readonly decoratorManager: IDecoratorManager;

  /** Application statistics */
  readonly statistics: IApplicationStatistics;

  /** Event listeners */
  readonly listeners: Set<IApplicationListener>;

  // ===== INITIALIZATION =====

  /**
   * Initialize the service
   * @param config Initialization configuration
   */
  initialize(config?: IServiceConfig): Promise<void>;

  /**
   * Destroy the service and clean up resources
   */
  destroy(): Promise<void>;

  // ===== LAYOUT APPLICATION =====

  /**
   * Apply layout configuration to a game object
   * @param gameObject Game object to apply layout to
   * @param config Layout application configuration
   */
  applyLayout(
    gameObject: IGameObject,
    config: ILayoutApplicationConfig
  ): Promise<ILayoutApplicationResult>;

  /**
   * Apply layout configuration to multiple game objects
   * @param gameObjects Game objects to apply layout to
   * @param config Layout application configuration
   */
  applyLayoutToMultiple(
    gameObjects: IGameObject[],
    config: ILayoutApplicationConfig
  ): Promise<ILayoutApplicationResult[]>;

  /**
   * Remove layout from a game object
   * @param gameObject Game object to remove layout from
   * @param layoutId Layout ID to remove
   */
  removeLayout(gameObject: IGameObject, layoutId: string): Promise<boolean>;

  // ===== THEME APPLICATION =====

  /**
   * Apply theme configuration to a game object
   * @param gameObject Game object to apply theme to
   * @param config Theme application configuration
   */
  applyTheme(
    gameObject: IGameObject,
    config: IThemeApplicationConfig
  ): Promise<IThemeApplicationResult>;

  /**
   * Apply theme configuration to multiple game objects
   * @param gameObjects Game objects to apply theme to
   * @param config Theme application configuration
   */
  applyThemeToMultiple(
    gameObjects: IGameObject[],
    config: IThemeApplicationConfig
  ): Promise<IThemeApplicationResult[]>;

  /**
   * Remove theme from a game object
   * @param gameObject Game object to remove theme from
   * @param themeId Theme ID to remove
   */
  removeTheme(gameObject: IGameObject, themeId: string): Promise<boolean>;

  // ===== COMBINED APPLICATION =====

  /**
   * Apply both layout and theme to a game object
   * @param gameObject Game object to apply layout and theme to
   * @param config Combined application configuration
   */
  applyLayoutAndTheme(
    gameObject: IGameObject,
    config: ILayoutThemeApplicationConfig
  ): Promise<ILayoutThemeApplicationResult>;

  /**
   * Apply both layout and theme to multiple game objects
   * @param gameObjects Game objects to apply layout and theme to
   * @param config Combined application configuration
   */
  applyLayoutAndThemeToMultiple(
    gameObjects: IGameObject[],
    config: ILayoutThemeApplicationConfig
  ): Promise<ILayoutThemeApplicationResult[]>;

  // ===== DECORATOR MANAGEMENT =====

  /**
   * Create a layout decorator for a game object
   * @param gameObject Game object to create decorator for
   * @param layoutConfig Layout configuration
   */
  createLayoutDecorator(gameObject: IGameObject, layoutConfig: ILayoutConfig): Promise<IDecorator>;

  /**
   * Create a theme decorator for a game object
   * @param gameObject Game object to create decorator for
   * @param themeConfig Theme configuration
   */
  createThemeDecorator(gameObject: IGameObject, themeConfig: ITheme): Promise<IDecorator>;

  /**
   * Get decorators applied to a game object
   * @param gameObject Game object to get decorators for
   */
  getAppliedDecorators(gameObject: IGameObject): IDecorator[];

  /**
   * Get decorators by type for a game object
   * @param gameObject Game object to get decorators for
   * @param decoratorType Type of decorator to get
   */
  getDecoratorsByType(gameObject: IGameObject, decoratorType: string): IDecorator[];

  // ===== VALIDATION =====

  /**
   * Validate layout configuration
   * @param config Layout application configuration
   */
  validateLayoutConfig(config: ILayoutApplicationConfig): Promise<boolean>;

  /**
   * Validate theme configuration
   * @param config Theme application configuration
   */
  validateThemeConfig(config: IThemeApplicationConfig): Promise<boolean>;

  /**
   * Validate combined configuration
   * @param config Combined application configuration
   */
  validateCombinedConfig(config: ILayoutThemeApplicationConfig): Promise<boolean>;

  // ===== UTILITY METHODS =====

  /**
   * Get the best layout strategy for a configuration
   * @param config Layout application configuration
   */
  getBestLayoutStrategy(config: ILayoutApplicationConfig): string | null;

  /**
   * Get application statistics
   */
  getStatistics(): IApplicationStatistics;

  /**
   * Clear application cache
   */
  clearCache(): void;

  /**
   * Reset service to initial state
   */
  reset(): void;

  // ===== EVENT MANAGEMENT =====

  /**
   * Add event listener
   * @param listener Listener to add
   */
  addListener(listener: IApplicationListener): void;

  /**
   * Remove event listener
   * @param listener Listener to remove
   */
  removeListener(listener: IApplicationListener): boolean;

  /**
   * Clear all listeners
   */
  clearListeners(): void;
}

// ============================================================================
// SUPPORTING INTERFACES
// ============================================================================

/**
 * Service configuration interface
 */
export interface IServiceConfig {
  /** Default layout application settings */
  defaultLayoutConfig?: Partial<ILayoutApplicationConfig>;

  /** Default theme application settings */
  defaultThemeConfig?: Partial<IThemeApplicationConfig>;

  /** Default combined application settings */
  defaultCombinedConfig?: Partial<ILayoutThemeApplicationConfig>;

  /** Performance settings */
  performance?: {
    enableCaching: boolean;
    cacheSize: number;
    maxConcurrentApplications: number;
  };

  /** Validation settings */
  validation?: {
    enabled: boolean;
    strict: boolean;
    autoValidate: boolean;
  };

  /** Custom configuration */
  custom?: Record<string, any>;
}

/**
 * Application statistics interface
 */
export interface IApplicationStatistics {
  /** Total layout applications */
  totalLayoutApplications: number;

  /** Total theme applications */
  totalThemeApplications: number;

  /** Total combined applications */
  totalCombinedApplications: number;

  /** Successful applications */
  successfulApplications: number;

  /** Failed applications */
  failedApplications: number;

  /** Average application time in milliseconds */
  averageApplicationTime: number;

  /** Total application time in milliseconds */
  totalApplicationTime: number;

  /** Cache hit rate */
  cacheHitRate: number;

  /** Memory usage in bytes */
  memoryUsage: number;

  /** Performance metrics */
  performance: {
    layoutApplicationsPerSecond: number;
    themeApplicationsPerSecond: number;
    combinedApplicationsPerSecond: number;
    averageLayoutApplicationTime: number;
    averageThemeApplicationTime: number;
    averageCombinedApplicationTime: number;
  };

  /** Error statistics */
  errors: {
    totalErrors: number;
    layoutErrors: number;
    themeErrors: number;
    validationErrors: number;
    decoratorErrors: number;
  };
}

/**
 * Application listener interface
 */
export interface IApplicationListener {
  /**
   * Called when layout is applied
   * @param gameObject Game object the layout was applied to
   * @param result Application result
   */
  onLayoutApplied?(gameObject: IGameObject, result: ILayoutApplicationResult): void;

  /**
   * Called when theme is applied
   * @param gameObject Game object the theme was applied to
   * @param result Application result
   */
  onThemeApplied?(gameObject: IGameObject, result: IThemeApplicationResult): void;

  /**
   * Called when layout and theme are applied together
   * @param gameObject Game object the layout and theme were applied to
   * @param result Application result
   */
  onLayoutAndThemeApplied?(gameObject: IGameObject, result: ILayoutThemeApplicationResult): void;

  /**
   * Called when layout is removed
   * @param gameObject Game object the layout was removed from
   * @param layoutId Layout ID that was removed
   */
  onLayoutRemoved?(gameObject: IGameObject, layoutId: string): void;

  /**
   * Called when theme is removed
   * @param gameObject Game object the theme was removed from
   * @param themeId Theme ID that was removed
   */
  onThemeRemoved?(gameObject: IGameObject, themeId: string): void;

  /**
   * Called when decorator is created
   * @param gameObject Game object the decorator was created for
   * @param decorator Created decorator
   */
  onDecoratorCreated?(gameObject: IGameObject, decorator: IDecorator): void;

  /**
   * Called when an error occurs
   * @param error The error that occurred
   * @param context Additional context about the error
   */
  onError?(error: Error, context?: Record<string, any>): void;
}
