/**
 * Enhanced Layout Theme Application Service Interface
 *
 * Enhanced version of the Layout Theme Application Service that includes
 * all bridge interfaces for comprehensive value calculation coordination.
 *
 * This service provides:
 * - Complete integration between Layout, Unit, Theme, and Responsive systems
 * - Advanced value calculation coordination
 * - Comprehensive bridge interface management
 * - Enhanced performance and optimization
 */

import type { IGameObject } from '../../game-object/interfaces/IGameObject';
import type {
  ILayoutConfig,
  ILayoutContext,
  ICalculatedLayout,
} from '../../layout/interfaces/ILayout';
import type { ITheme } from '../../layout/interfaces/ITheme';
import type { IUnit } from '../../unit/interfaces/IUnit';

// Bridge interfaces
import type { IUnitLayoutBridge } from './bridges/IUnitLayoutBridge';
import type { IThemeLayoutBridge } from './bridges/IThemeLayoutBridge';
import type { IResponsiveUnitBridge } from './bridges/IResponsiveUnitBridge';
import type { IResponsiveLayoutBridge } from './bridges/IResponsiveLayoutBridge';
import type { IResponsiveThemeBridge } from './bridges/IResponsiveThemeBridge';

// Base service interface
import type {
  ILayoutThemeApplicationService,
  ILayoutApplicationResult,
  IThemeApplicationResult,
  ILayoutThemeApplicationResult,
  IServiceConfig,
  IApplicationStatistics,
} from './ILayoutThemeApplicationService';

import { BreakpointName } from '../../layout/enums/LayoutEnums';

// ============================================================================
// ENHANCED SERVICE INTERFACE
// ============================================================================

/**
 * Enhanced Layout Theme Application Service Interface
 *
 * Extends the base service with comprehensive bridge interfaces for
 * advanced value calculation coordination across all systems.
 */
export interface IEnhancedLayoutThemeApplicationService extends ILayoutThemeApplicationService {
  /** Unit-Layout Bridge */
  readonly unitLayoutBridge: IUnitLayoutBridge;

  /** Theme-Layout Bridge */
  readonly themeLayoutBridge: IThemeLayoutBridge;

  /** Responsive-Unit Bridge */
  readonly responsiveUnitBridge: IResponsiveUnitBridge;

  /** Responsive-Layout Bridge */
  readonly responsiveLayoutBridge: IResponsiveLayoutBridge;

  /** Responsive-Theme Bridge */
  readonly responsiveThemeBridge: IResponsiveThemeBridge;

  /** Enhanced statistics */
  readonly enhancedStatistics: IEnhancedApplicationStatistics;

  // ===== ENHANCED INITIALIZATION =====

  /**
   * Initialize the enhanced service with all bridges
   * @param config Enhanced service configuration
   */
  initializeEnhanced(config?: IEnhancedServiceConfig): Promise<void>;

  // ===== UNIT-INTEGRATED LAYOUT APPLICATION =====

  /**
   * Apply layout with unit integration
   * @param gameObject Game object to apply layout to
   * @param layoutConfig Layout configuration
   * @param units Units to integrate
   * @param context Layout context
   */
  applyLayoutWithUnits(
    gameObject: IGameObject,
    layoutConfig: ILayoutConfig,
    units: IUnit[],
    context: ILayoutContext
  ): Promise<ILayoutApplicationResult>;

  /**
   * Apply layout with unit integration to multiple game objects
   * @param gameObjects Game objects to apply layout to
   * @param layoutConfig Layout configuration
   * @param units Units to integrate
   * @param context Layout context
   */
  applyLayoutWithUnitsToMultiple(
    gameObjects: IGameObject[],
    layoutConfig: ILayoutConfig,
    units: IUnit[],
    context: ILayoutContext
  ): Promise<ILayoutApplicationResult[]>;

  /**
   * Calculate layout with unit integration
   * @param layoutConfig Layout configuration
   * @param units Units to integrate
   * @param context Layout context
   */
  calculateLayoutWithUnits(
    layoutConfig: ILayoutConfig,
    units: IUnit[],
    context: ILayoutContext
  ): Promise<ICalculatedLayout>;

  // ===== THEME-INTEGRATED LAYOUT APPLICATION =====

  /**
   * Apply theme with layout integration
   * @param gameObject Game object to apply theme to
   * @param themeConfig Theme configuration
   * @param layoutConfig Layout configuration
   * @param context Layout context
   */
  applyThemeWithLayout(
    gameObject: IGameObject,
    themeConfig: ITheme,
    layoutConfig: ILayoutConfig,
    context: ILayoutContext
  ): Promise<IThemeApplicationResult>;

  /**
   * Apply theme with layout integration to multiple game objects
   * @param gameObjects Game objects to apply theme to
   * @param themeConfig Theme configuration
   * @param layoutConfig Layout configuration
   * @param context Layout context
   */
  applyThemeWithLayoutToMultiple(
    gameObjects: IGameObject[],
    themeConfig: ITheme,
    layoutConfig: ILayoutConfig,
    context: ILayoutContext
  ): Promise<IThemeApplicationResult[]>;

  /**
   * Calculate theme-aware layout
   * @param layoutConfig Layout configuration
   * @param themeConfig Theme configuration
   * @param context Layout context
   */
  calculateThemeAwareLayout(
    layoutConfig: ILayoutConfig,
    themeConfig: ITheme,
    context: ILayoutContext
  ): Promise<ICalculatedLayout>;

  // ===== RESPONSIVE UNIT CALCULATIONS =====

  /**
   * Calculate responsive layout with units
   * @param gameObject Game object to calculate for
   * @param layoutConfig Layout configuration
   * @param units Units to calculate
   * @param breakpoint Target breakpoint
   * @param context Layout context
   */
  calculateResponsiveLayout(
    gameObject: IGameObject,
    layoutConfig: ILayoutConfig,
    units: IUnit[],
    breakpoint: BreakpointName,
    context: ILayoutContext
  ): Promise<ICalculatedLayout>;

  /**
   * Calculate responsive layout for multiple game objects
   * @param gameObjects Game objects to calculate for
   * @param layoutConfig Layout configuration
   * @param units Units to calculate
   * @param breakpoint Target breakpoint
   * @param context Layout context
   */
  calculateResponsiveLayoutForMultiple(
    gameObjects: IGameObject[],
    layoutConfig: ILayoutConfig,
    units: IUnit[],
    breakpoint: BreakpointName,
    context: ILayoutContext
  ): Promise<ICalculatedLayout[]>;

  /**
   * Transition layout between breakpoints
   * @param gameObject Game object to transition
   * @param layoutConfig Layout configuration
   * @param units Units to transition
   * @param fromBreakpoint Source breakpoint
   * @param toBreakpoint Target breakpoint
   * @param context Layout context
   */
  transitionLayoutBetweenBreakpoints(
    gameObject: IGameObject,
    layoutConfig: ILayoutConfig,
    units: IUnit[],
    fromBreakpoint: BreakpointName,
    toBreakpoint: BreakpointName,
    context: ILayoutContext
  ): Promise<ICalculatedLayout>;

  // ===== COMPREHENSIVE APPLICATION =====

  /**
   * Apply layout, theme, and units together
   * @param gameObject Game object to apply to
   * @param layoutConfig Layout configuration
   * @param themeConfig Theme configuration
   * @param units Units to integrate
   * @param context Layout context
   */
  applyLayoutThemeAndUnits(
    gameObject: IGameObject,
    layoutConfig: ILayoutConfig,
    themeConfig: ITheme,
    units: IUnit[],
    context: ILayoutContext
  ): Promise<ILayoutThemeApplicationResult>;

  /**
   * Apply layout, theme, and units to multiple game objects
   * @param gameObjects Game objects to apply to
   * @param layoutConfig Layout configuration
   * @param themeConfig Theme configuration
   * @param units Units to integrate
   * @param context Layout context
   */
  applyLayoutThemeAndUnitsToMultiple(
    gameObjects: IGameObject[],
    layoutConfig: ILayoutConfig,
    themeConfig: ITheme,
    units: IUnit[],
    context: ILayoutContext
  ): Promise<ILayoutThemeApplicationResult[]>;

  /**
   * Calculate comprehensive layout with all systems
   * @param layoutConfig Layout configuration
   * @param themeConfig Theme configuration
   * @param units Units to integrate
   * @param context Layout context
   */
  calculateComprehensiveLayout(
    layoutConfig: ILayoutConfig,
    themeConfig: ITheme,
    units: IUnit[],
    context: ILayoutContext
  ): Promise<ICalculatedLayout>;

  // ===== ADVANCED VALIDATION =====

  /**
   * Validate comprehensive configuration
   * @param layoutConfig Layout configuration
   * @param themeConfig Theme configuration
   * @param units Units to validate
   * @param context Layout context
   */
  validateComprehensiveConfig(
    layoutConfig: ILayoutConfig,
    themeConfig: ITheme,
    units: IUnit[],
    context: ILayoutContext
  ): Promise<IComprehensiveValidationResult>;

  /**
   * Validate responsive configuration
   * @param layoutConfig Layout configuration
   * @param themeConfig Theme configuration
   * @param units Units to validate
   * @param breakpoint Target breakpoint
   * @param context Layout context
   */
  validateResponsiveConfig(
    layoutConfig: ILayoutConfig,
    themeConfig: ITheme,
    units: IUnit[],
    breakpoint: BreakpointName,
    context: ILayoutContext
  ): Promise<IComprehensiveValidationResult>;

  // ===== ADVANCED OPTIMIZATION =====

  /**
   * Optimize comprehensive configuration
   * @param layoutConfig Layout configuration
   * @param themeConfig Theme configuration
   * @param units Units to optimize
   * @param context Layout context
   */
  optimizeComprehensiveConfig(
    layoutConfig: ILayoutConfig,
    themeConfig: ITheme,
    units: IUnit[],
    context: ILayoutContext
  ): Promise<IOptimizedConfiguration>;

  /**
   * Get performance recommendations
   * @param layoutConfig Layout configuration
   * @param themeConfig Theme configuration
   * @param units Units to analyze
   * @param context Layout context
   */
  getPerformanceRecommendations(
    layoutConfig: ILayoutConfig,
    themeConfig: ITheme,
    units: IUnit[],
    context: ILayoutContext
  ): Promise<IPerformanceRecommendations>;

  // ===== ENHANCED UTILITY METHODS =====

  /**
   * Get enhanced statistics
   */
  getEnhancedStatistics(): IEnhancedApplicationStatistics;

  /**
   * Get bridge statistics
   */
  getBridgeStatistics(): IBridgeStatistics;

  /**
   * Get system integration status
   */
  getSystemIntegrationStatus(): ISystemIntegrationStatus;

  /**
   * Clear all caches
   */
  clearAllCaches(): void;

  /**
   * Reset enhanced service to initial state
   */
  resetEnhanced(): void;
}

// ============================================================================
// SUPPORTING INTERFACES
// ============================================================================

/**
 * Enhanced service configuration interface
 */
export interface IEnhancedServiceConfig extends IServiceConfig {
  /** Unit-Layout Bridge configuration */
  unitLayoutBridge?: {
    enabled: boolean;
    config?: any;
  };

  /** Theme-Layout Bridge configuration */
  themeLayoutBridge?: {
    enabled: boolean;
    config?: any;
  };

  /** Responsive-Unit Bridge configuration */
  responsiveUnitBridge?: {
    enabled: boolean;
    config?: any;
  };

  /** Responsive-Layout Bridge configuration */
  responsiveLayoutBridge?: {
    enabled: boolean;
    config?: any;
  };

  /** Responsive-Theme Bridge configuration */
  responsiveThemeBridge?: {
    enabled: boolean;
    config?: any;
  };

  /** Enhanced performance settings */
  enhancedPerformance?: {
    enableAdvancedCaching: boolean;
    enablePredictiveLoading: boolean;
    enableParallelProcessing: boolean;
    maxConcurrentOperations: number;
  };

  /** Enhanced validation settings */
  enhancedValidation?: {
    enableCrossSystemValidation: boolean;
    enablePerformanceValidation: boolean;
    enableResponsiveValidation: boolean;
    strictMode: boolean;
  };
}

/**
 * Enhanced application statistics interface
 */
export interface IEnhancedApplicationStatistics extends IApplicationStatistics {
  /** Unit-Layout Bridge statistics */
  unitLayoutBridge: any;

  /** Theme-Layout Bridge statistics */
  themeLayoutBridge: any;

  /** Responsive-Unit Bridge statistics */
  responsiveUnitBridge: any;

  /** Responsive-Layout Bridge statistics */
  responsiveLayoutBridge: any;

  /** Responsive-Theme Bridge statistics */
  responsiveThemeBridge: any;

  /** Cross-system operations */
  crossSystemOperations: {
    totalOperations: number;
    successfulOperations: number;
    failedOperations: number;
    averageOperationTime: number;
  };

  /** System integration metrics */
  systemIntegration: {
    layoutUnitIntegration: number;
    themeLayoutIntegration: number;
    responsiveUnitIntegration: number;
    overallIntegration: number;
  };
}

/**
 * Bridge statistics interface
 */
export interface IBridgeStatistics {
  /** Unit-Layout Bridge statistics */
  unitLayoutBridge: any;

  /** Theme-Layout Bridge statistics */
  themeLayoutBridge: any;

  /** Responsive-Unit Bridge statistics */
  responsiveUnitBridge: any;

  /** Responsive-Layout Bridge statistics */
  responsiveLayoutBridge: any;

  /** Responsive-Theme Bridge statistics */
  responsiveThemeBridge: any;

  /** Overall bridge performance */
  overall: {
    totalBridges: number;
    activeBridges: number;
    averageBridgePerformance: number;
    totalBridgeOperations: number;
  };
}

/**
 * System integration status interface
 */
export interface ISystemIntegrationStatus {
  /** Layout System integration */
  layoutSystem: {
    connected: boolean;
    version: string;
    capabilities: string[];
  };

  /** Unit System integration */
  unitSystem: {
    connected: boolean;
    version: string;
    capabilities: string[];
  };

  /** Theme System integration */
  themeSystem: {
    connected: boolean;
    version: string;
    capabilities: string[];
  };

  /** Responsive System integration */
  responsiveSystem: {
    connected: boolean;
    version: string;
    capabilities: string[];
  };

  /** Overall integration status */
  overall: {
    allSystemsConnected: boolean;
    integrationHealth: number;
    lastHealthCheck: Date;
  };
}

/**
 * Comprehensive validation result interface
 */
export interface IComprehensiveValidationResult {
  /** Whether validation passed */
  isValid: boolean;

  /** Layout validation result */
  layoutValidation: any;

  /** Theme validation result */
  themeValidation: any;

  /** Unit validation result */
  unitValidation: any;

  /** Responsive validation result */
  responsiveValidation: any;

  /** Cross-system validation result */
  crossSystemValidation: any;

  /** Overall validation score */
  validationScore: number;

  /** Validation metadata */
  metadata: {
    validationTime: number;
    systemsValidated: string[];
    totalIssues: number;
    criticalIssues: number;
  };
}

/**
 * Optimized configuration interface
 */
export interface IOptimizedConfiguration {
  /** Optimized layout configuration */
  optimizedLayout: ILayoutConfig;

  /** Optimized theme configuration */
  optimizedTheme: ITheme;

  /** Optimized units */
  optimizedUnits: IUnit[];

  /** Optimization metadata */
  optimization: {
    optimizationTime: number;
    improvements: string[];
    performanceGains: {
      calculationTime: number;
      memoryUsage: number;
      cacheEfficiency: number;
    };
  };
}

/**
 * Performance recommendations interface
 */
export interface IPerformanceRecommendations {
  /** Layout recommendations */
  layoutRecommendations: string[];

  /** Theme recommendations */
  themeRecommendations: string[];

  /** Unit recommendations */
  unitRecommendations: string[];

  /** Responsive recommendations */
  responsiveRecommendations: string[];

  /** Overall recommendations */
  overallRecommendations: string[];

  /** Performance impact estimates */
  performanceImpact: {
    estimatedImprovement: number;
    implementationComplexity: 'low' | 'medium' | 'high';
    priority: 'low' | 'medium' | 'high';
  };
}
