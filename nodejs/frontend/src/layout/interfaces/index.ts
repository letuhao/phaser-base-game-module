/**
 * Layout System Interfaces - Main Export
 *
 * This module exports all interfaces for the layout system.
 * Based on the best patterns from the existing codebase.
 */

// ============================================================================
// BREAKPOINT INTERFACES
// ============================================================================

export type {
  IBreakpoint,
  IBreakpointCondition,
  IBreakpointContext,
  IBreakpointMetadata,
} from './IBreakpoint';

export type {
  IBreakpointManager,
  IBreakpointListener,
  IBreakpointStatistics,
} from './IBreakpointManager';

// ============================================================================
// THEME INTERFACES
// ============================================================================

export type {
  // Core theme interfaces
  ITheme,
  IThemeColors,
  IColorPalette,
  IBackgroundColors,
  ITextColors,
  IStatusColors,
  IUIColors,
  ISemanticColors,

  // Typography interfaces
  IThemeTypography,
  IFontFamilies,
  IFontSizes,
  IFontWeights,
  ILineHeights,
  ILetterSpacing,
  ITextAlign,

  // Spacing and layout interfaces
  IThemeSpacing,
  ISpacingScale,
  IThemeBorderRadius,
  IThemeShadows,

  // Animation interfaces
  IThemeAnimation,
  IAnimationDuration,
  IAnimationEasing,
  IAnimationProperties,

  // Breakpoint interfaces
  IThemeBreakpoints,

  // Theme class interfaces
  IThemeClass,

  // Metadata interfaces
  IThemeMetadata,
} from './ITheme';

export type {
  IThemeManager,
  IThemeListener,
  IThemeStatistics,
  IThemeConfiguration,
} from './IThemeManager';

// ============================================================================
// STYLE INTERFACES
// ============================================================================

export type {
  // Core style interfaces
  IStyle,
  IBaseStyle,
  ILayoutStyle,
  IFilterStyle,
  IInteractiveStyle,
  IResponsiveStyle,

  // Style metadata and composition
  IStyleMetadata,
  IStyleComposition,
  IStyleBuilder,
} from './IStyle';

export type {
  IStyleManager,
  IStyleListener,
  IStyleStatistics,
  IStyleConfiguration,
} from './IStyleManager';

// ============================================================================
// LAYOUT INTERFACES
// ============================================================================

export type {
  // Core layout interfaces
  ILayout,
  ILayoutConfig,
  IResponsiveLayout,
  IUnitLayout,
  ILayoutMetadata,

  // Layout context interfaces
  ILayoutContext,

  // Layout result interfaces
  ICalculatedLayout,
  IUnitConversion,

  // Layout validation interfaces
  ILayoutValidationResult,
} from './ILayout';

// ============================================================================
// STRATEGY INTERFACES
// ============================================================================

export type {
  // Base strategy interfaces
  ILayoutStrategy,
  IResponsiveLayoutStrategy,
  IUnitLayoutStrategy,
  IAlignmentLayoutStrategy,
  IScaleLayoutStrategy,

  // Strategy capabilities interfaces
  IStrategyCapabilities,
  IStrategyPerformanceMetrics,

  // Strategy registry interfaces
  IStrategyRegistry,
  IStrategyRegistryStatistics,

  // Strategy factory interfaces
  IStrategyFactory,
} from './ILayoutStrategy';

// ============================================================================
// MANAGER INTERFACES
// ============================================================================

export type {
  // Layout manager interfaces
  ILayoutManager,
  ILayoutManagerConfig,
  ILayoutManagerStatistics,

  // Layout cache interfaces
  ILayoutCache,
  ILayoutCacheStatistics,
} from './ILayoutManager';

// ============================================================================
// COMMAND PATTERN INTERFACES
// ============================================================================

export type {
  // Command interfaces
  ILayoutCommand,
  ILayoutCommandContext,
  ILayoutCommandResult,
  ILayoutCommandValidationResult,
  ICommandValidationError,
  ICommandValidationWarning,
  ICommandValidationSuggestion,
  ILayoutCommandMetadata,
  ILayoutChange,

  // Specific command interfaces
  ICreateLayoutCommand,
  IUpdateLayoutCommand,
  IDeleteLayoutCommand,
  IMoveLayoutCommand,
  IResizeLayoutCommand,
  IBatchCommand,

  // Command manager interfaces
  ILayoutCommandManager,
  ICommandListener,
  ICommandManagerStatistics,

  // Command factory interfaces
  ILayoutCommandFactory,
} from './ILayoutCommand';

// ============================================================================
// STATE PATTERN INTERFACES
// ============================================================================

export type {
  // State interfaces
  ILayoutState,
  ILayoutStateContext,
  ILayoutStateAction,
  ILayoutStateActionResult,
  ILayoutStateChange,
  ILayoutStateMetadata,
  ILayoutStatePerformance,
  ILayoutStateValidationRule,

  // Specific state interfaces
  IIdleLayoutState,
  ICalculatingLayoutState,
  ICachedLayoutState,
  IErrorLayoutState,
  IValidatingLayoutState,
  ITransitioningLayoutState,

  // State manager interfaces
  ILayoutStateManager,
  ILayoutStateTransition,
  ILayoutStateTransitionResult,
  IStateListener,
  IStateManagerStatistics,

  // State factory interfaces
  ILayoutStateFactory,
} from './ILayoutState';

// ============================================================================
// CHAIN OF RESPONSIBILITY PATTERN INTERFACES
// ============================================================================

export type {
  // Chain interfaces
  ILayoutChainHandler,
  ILayoutChainRequest,
  ILayoutChainResponse,
  ILayoutChainContext,
  ILayoutChainHandlerMetadata,
  ILayoutChainHandlerCapabilities,
  ILayoutChainHandlerPerformance,

  // Specific handler interfaces
  IValidationChainHandler,
  IUnitConversionChainHandler,
  IResponsiveChainHandler,
  IThemeChainHandler,
  ICalculationChainHandler,
  IOptimizationChainHandler,
  ICachingChainHandler,
  ILayoutChainValidationRule,

  // Chain manager interfaces
  ILayoutChainManager,
  IChainListener,
  IChainManagerStatistics,

  // Chain factory interfaces
  ILayoutChainFactory,
} from './ILayoutChain';

// ============================================================================
// DEPENDENCY INJECTION INTERFACES
// ============================================================================

export type {
  // Service container interfaces
  IDIContainer,
  IEnhancedDIContainer,
  IDependencyMetadata,
  IDependencyLifecycle,
  IDependencyValidation,
  IResolutionContext,
  IResolutionOptions,
  IDependencyValidationResult,
  IDependencyValidationError,
  IDependencyValidationWarning,
  IDependencyFactory,
  IFactoryContext,
  IFactoryMetadata,
  IDependencyScope,
  IScopedDIContainer,
} from './IDIContainer';

// ============================================================================
// PLUGIN SYSTEM INTERFACES
// ============================================================================

export type {
  // Plugin interfaces
  IPlugin,
  IPluginContext,
  IPluginMetadata,
  IPluginManager,
  IPluginRegistry,
  IPluginStatus,
  IDependencyStatus,
  IDependencyCheckResult,
  IVersionMismatch,
  IConfigurationProvider,
  IEventBus,
  ILogger,
  IPluginCapability,
  IPluginCapabilityRegistry,
} from './IPluginSystem';

// ============================================================================
// GRANULAR INTERFACES
// ============================================================================

export type {
  // Layout management interfaces
  ILayoutCreator,
  ILayoutStrategyManager,
  ILayoutThemeManager,
  ILayoutBreakpointManager,
  ILayoutEventManager,
  ILayoutValidator,
  ILayoutPerformanceMonitor,

  // Style interfaces
  IPositionStyle,
  ISizeStyle,
  IAlignmentStyle,
  IVisualStyle,
  IBackgroundStyle,
  IBorderStyle,
  IShadowStyle,
  ITextStyle,
  IAnimationStyle,
  ITransformStyle,

  // Game UI interfaces
  IGameUIStyle,
  IMenuStyle,
  IButtonStyle,

  // Specialized interfaces
  ISizeConstraints,
  IBorderSides,
  IBorderSide,
  IGradientStyle,
  IPatternStyle,
  IKeyframe,
  IAnimationEvent,
  IInputStyle,
  IGameObjectState,
  IPhysicsStyle,
  IMenuItemStyle,
  IMenuNavigation,
  IMenuAnimations,
  IButtonStates,
  IButtonStateStyle,
  IButtonInteractions,
  IButtonAnimations,
  IButtonAccessibility,
  IThemeSwitch,
  IViewport,
  ILayoutEvent,
  IValidationStatistics,
  IPerformanceHistory,
  IPerformanceAlert,
  ILayoutListener,
  IValidationRule,
  IValidationContext,
  IValidationResult,
  IValidationError,
  IValidationWarning,
  IValidationSuggestion,
  IPerformanceMetrics,

  // Value interfaces
  BlendMode,
  PositionValue,
  SizeValue,
  HorizontalAlignment,
  VerticalAlignment,
  BorderStyle,
  TextDecoration,
  AnimationDirection,
  AnimationFillMode,
  IAnimationPlayState,
  IAnimationIterationCount,
} from './IGranularInterfaces';

// ============================================================================
// INTERFACE BUNDLES
// ============================================================================

/**
 * All breakpoint-related interfaces bundled together
 */
export const BREAKPOINT_INTERFACES = {
  BREAKPOINT: {
    IBreakpoint: 'IBreakpoint',
    IBreakpointCondition: 'IBreakpointCondition',
    IBreakpointContext: 'IBreakpointContext',
    IBreakpointMetadata: 'IBreakpointMetadata',
  },
  MANAGER: {
    IBreakpointManager: 'IBreakpointManager',
    IBreakpointListener: 'IBreakpointListener',
    IBreakpointStatistics: 'IBreakpointStatistics',
  },
} as const;

/**
 * All theme-related interfaces bundled together
 */
export const THEME_INTERFACES = {
  THEME: {
    ITheme: 'ITheme',
    IThemeColors: 'IThemeColors',
    IColorPalette: 'IColorPalette',
    IBackgroundColors: 'IBackgroundColors',
    ITextColors: 'ITextColors',
    IStatusColors: 'IStatusColors',
    IUIColors: 'IUIColors',
    ISemanticColors: 'ISemanticColors',
  },
  TYPOGRAPHY: {
    IThemeTypography: 'IThemeTypography',
    IFontFamilies: 'IFontFamilies',
    IFontSizes: 'IFontSizes',
    IFontWeights: 'IFontWeights',
    ILineHeights: 'ILineHeights',
    ILetterSpacing: 'ILetterSpacing',
    ITextAlign: 'ITextAlign',
  },
  LAYOUT: {
    IThemeSpacing: 'IThemeSpacing',
    ISpacingScale: 'ISpacingScale',
    IThemeBorderRadius: 'IThemeBorderRadius',
    IThemeShadows: 'IThemeShadows',
  },
  ANIMATION: {
    IThemeAnimation: 'IThemeAnimation',
    IAnimationDuration: 'IAnimationDuration',
    IAnimationEasing: 'IAnimationEasing',
    IAnimationProperties: 'IAnimationProperties',
  },
  BREAKPOINTS: {
    IThemeBreakpoints: 'IThemeBreakpoints',
  },
  CLASSES: {
    IThemeClass: 'IThemeClass',
  },
  METADATA: {
    IThemeMetadata: 'IThemeMetadata',
  },
  MANAGER: {
    IThemeManager: 'IThemeManager',
    IThemeListener: 'IThemeListener',
    IThemeStatistics: 'IThemeStatistics',
    IThemeConfiguration: 'IThemeConfiguration',
  },
} as const;

/**
 * All style-related interfaces bundled together
 */
export const STYLE_INTERFACES = {
  CORE: {
    IStyle: 'IStyle',
    IBaseStyle: 'IBaseStyle',
  },
  LAYOUT: {
    ILayoutStyle: 'ILayoutStyle',
    IVisualStyle: 'IVisualStyle',
    IBackgroundStyle: 'IBackgroundStyle',
    IBorderStyle: 'IBorderStyle',
    ISpacingStyle: 'ISpacingStyle',
  },
  CONTENT: {
    ITextStyle: 'ITextStyle',
    IShadowStyle: 'IShadowStyle',
    ITransformStyle: 'ITransformStyle',
  },
  INTERACTION: {
    IAnimationStyle: 'IAnimationStyle',
    IFilterStyle: 'IFilterStyle',
    IInteractiveStyle: 'IInteractiveStyle',
  },
  RESPONSIVE: {
    IResponsiveStyle: 'IResponsiveStyle',
    IThemeStyle: 'IThemeStyle',
    IUnitStyle: 'IUnitStyle',
  },
  METADATA: {
    IStyleMetadata: 'IStyleMetadata',
    IStyleComposition: 'IStyleComposition',
    IStyleBuilder: 'IStyleBuilder',
  },
  MANAGER: {
    IStyleManager: 'IStyleManager',
    IStyleListener: 'IStyleListener',
    IStyleStatistics: 'IStyleStatistics',
    IStyleConfiguration: 'IStyleConfiguration',
  },
} as const;

/**
 * All layout-related interfaces bundled together
 */
export const LAYOUT_INTERFACES = {
  CORE: {
    ILayout: 'ILayout',
    ILayoutConfig: 'ILayoutConfig',
    IResponsiveLayout: 'IResponsiveLayout',
    IUnitLayout: 'IUnitLayout',
    ILayoutMetadata: 'ILayoutMetadata',
  },
  CONTEXT: {
    ILayoutContext: 'ILayoutContext',
  },
  RESULT: {
    ICalculatedLayout: 'ICalculatedLayout',
    IUnitConversion: 'IUnitConversion',
  },
  VALIDATION: {
    ILayoutValidationResult: 'ILayoutValidationResult',
    IValidationError: 'IValidationError',
    IValidationWarning: 'IValidationWarning',
    IValidationSuggestion: 'IValidationSuggestion',
  },
} as const;

/**
 * All strategy-related interfaces bundled together
 */
export const STRATEGY_INTERFACES = {
  BASE: {
    ILayoutStrategy: 'ILayoutStrategy',
    IResponsiveLayoutStrategy: 'IResponsiveLayoutStrategy',
    IUnitLayoutStrategy: 'IUnitLayoutStrategy',
    IAlignmentLayoutStrategy: 'IAlignmentLayoutStrategy',
    IScaleLayoutStrategy: 'IScaleLayoutStrategy',
  },
  CAPABILITIES: {
    IStrategyCapabilities: 'IStrategyCapabilities',
    IStrategyPerformanceMetrics: 'IStrategyPerformanceMetrics',
  },
  REGISTRY: {
    IStrategyRegistry: 'IStrategyRegistry',
    IStrategyRegistryStatistics: 'IStrategyRegistryStatistics',
  },
  FACTORY: {
    IStrategyFactory: 'IStrategyFactory',
  },
} as const;

/**
 * All manager-related interfaces bundled together
 */
export const MANAGER_INTERFACES = {
  LAYOUT: {
    ILayoutManager: 'ILayoutManager',
    ILayoutManagerConfig: 'ILayoutManagerConfig',
    ILayoutListener: 'ILayoutListener',
    ILayoutManagerStatistics: 'ILayoutManagerStatistics',
  },
  CACHE: {
    ILayoutCache: 'ILayoutCache',
    ILayoutCacheStatistics: 'ILayoutCacheStatistics',
  },
} as const;

/**
 * All command pattern interfaces bundled together
 */
export const COMMAND_INTERFACES = {
  BASE: {
    ILayoutCommand: 'ILayoutCommand',
    ILayoutCommandContext: 'ILayoutCommandContext',
    ILayoutCommandResult: 'ILayoutCommandResult',
    ILayoutCommandValidationResult: 'ILayoutCommandValidationResult',
    ICommandValidationError: 'ICommandValidationError',
    ICommandValidationWarning: 'ICommandValidationWarning',
    ICommandValidationSuggestion: 'ICommandValidationSuggestion',
    ILayoutCommandMetadata: 'ILayoutCommandMetadata',
    ILayoutChange: 'ILayoutChange',
  },
  SPECIFIC: {
    ICreateLayoutCommand: 'ICreateLayoutCommand',
    IUpdateLayoutCommand: 'IUpdateLayoutCommand',
    IDeleteLayoutCommand: 'IDeleteLayoutCommand',
    IMoveLayoutCommand: 'IMoveLayoutCommand',
    IResizeLayoutCommand: 'IResizeLayoutCommand',
    IBatchCommand: 'IBatchCommand',
  },
  MANAGER: {
    ILayoutCommandManager: 'ILayoutCommandManager',
    ICommandListener: 'ICommandListener',
    ICommandManagerStatistics: 'ICommandManagerStatistics',
  },
  FACTORY: {
    ILayoutCommandFactory: 'ILayoutCommandFactory',
  },
} as const;

/**
 * All state pattern interfaces bundled together
 */
export const STATE_INTERFACES = {
  BASE: {
    ILayoutState: 'ILayoutState',
    ILayoutStateContext: 'ILayoutStateContext',
    ILayoutStateAction: 'ILayoutStateAction',
    ILayoutStateActionResult: 'ILayoutStateActionResult',
    ILayoutStateChange: 'ILayoutStateChange',
    ILayoutStateMetadata: 'ILayoutStateMetadata',
    ILayoutStatePerformance: 'ILayoutStatePerformance',
    ILayoutStateValidationRule: 'ILayoutStateValidationRule',
  },
  SPECIFIC: {
    IIdleLayoutState: 'IIdleLayoutState',
    ICalculatingLayoutState: 'ICalculatingLayoutState',
    ICachedLayoutState: 'ICachedLayoutState',
    IErrorLayoutState: 'IErrorLayoutState',
    IValidatingLayoutState: 'IValidatingLayoutState',
    ITransitioningLayoutState: 'ITransitioningLayoutState',
  },
  MANAGER: {
    ILayoutStateManager: 'ILayoutStateManager',
    ILayoutStateTransition: 'ILayoutStateTransition',
    ILayoutStateTransitionResult: 'ILayoutStateTransitionResult',
    IStateListener: 'IStateListener',
    IStateManagerStatistics: 'IStateManagerStatistics',
  },
  FACTORY: {
    ILayoutStateFactory: 'ILayoutStateFactory',
  },
} as const;

/**
 * All chain of responsibility pattern interfaces bundled together
 */
export const CHAIN_INTERFACES = {
  BASE: {
    ILayoutChainHandler: 'ILayoutChainHandler',
    ILayoutChainRequest: 'ILayoutChainRequest',
    ILayoutChainResponse: 'ILayoutChainResponse',
    ILayoutChainContext: 'ILayoutChainContext',
    ILayoutChainHandlerMetadata: 'ILayoutChainHandlerMetadata',
    ILayoutChainHandlerCapabilities: 'ILayoutChainHandlerCapabilities',
    ILayoutChainHandlerPerformance: 'ILayoutChainHandlerPerformance',
  },
  SPECIFIC: {
    IValidationChainHandler: 'IValidationChainHandler',
    IUnitConversionChainHandler: 'IUnitConversionChainHandler',
    IResponsiveChainHandler: 'IResponsiveChainHandler',
    IThemeChainHandler: 'IThemeChainHandler',
    ICalculationChainHandler: 'ICalculationChainHandler',
    IOptimizationChainHandler: 'IOptimizationChainHandler',
    ICachingChainHandler: 'ICachingChainHandler',
    ILayoutChainValidationRule: 'ILayoutChainValidationRule',
  },
  MANAGER: {
    ILayoutChainManager: 'ILayoutChainManager',
    IChainListener: 'IChainListener',
    IChainManagerStatistics: 'IChainManagerStatistics',
  },
  FACTORY: {
    ILayoutChainFactory: 'ILayoutChainFactory',
  },
} as const;

/**
 * All dependency injection interfaces bundled together
 */
export const DI_INTERFACES = {
  CONTAINER: {
    IDIContainer: 'IDIContainer',
    IEnhancedDIContainer: 'IEnhancedDIContainer',
    IScopedDIContainer: 'IScopedDIContainer',
  },
  METADATA: {
    IDependencyMetadata: 'IDependencyMetadata',
    IDependencyLifecycle: 'IDependencyLifecycle',
    IDependencyValidation: 'IDependencyValidation',
    IFactoryMetadata: 'IFactoryMetadata',
  },
  RESOLUTION: {
    IResolutionContext: 'IResolutionContext',
    IResolutionOptions: 'IResolutionOptions',
    IDependencyValidationResult: 'IDependencyValidationResult',
    IDependencyValidationError: 'IDependencyValidationError',
    IDependencyValidationWarning: 'IDependencyValidationWarning',
  },
  FACTORY: {
    IDependencyFactory: 'IDependencyFactory',
    IFactoryContext: 'IFactoryContext',
    IDependencyScope: 'IDependencyScope',
  },
} as const;

/**
 * All plugin system interfaces bundled together
 */
export const PLUGIN_INTERFACES = {
  PLUGIN: {
    IPlugin: 'IPlugin',
    IPluginContext: 'IPluginContext',
    IPluginMetadata: 'IPluginMetadata',
    IPluginStatus: 'IPluginStatus',
  },
  MANAGER: {
    IPluginManager: 'IPluginManager',
    IPluginRegistry: 'IPluginRegistry',
    IPluginCapabilityRegistry: 'IPluginCapabilityRegistry',
  },
  DEPENDENCIES: {
    IDependencyStatus: 'IDependencyStatus',
    IDependencyCheckResult: 'IDependencyCheckResult',
    IVersionMismatch: 'IVersionMismatch',
  },
  INFRASTRUCTURE: {
    IConfigurationProvider: 'IConfigurationProvider',
    IEventBus: 'IEventBus',
    ILogger: 'ILogger',
    IPluginCapability: 'IPluginCapability',
  },
} as const;

/**
 * All granular interfaces bundled together
 */
export const GRANULAR_INTERFACES = {
  LAYOUT_MANAGEMENT: {
    ILayoutCreator: 'ILayoutCreator',
    ILayoutStrategyManager: 'ILayoutStrategyManager',
    ILayoutThemeManager: 'ILayoutThemeManager',
    ILayoutBreakpointManager: 'ILayoutBreakpointManager',
    ILayoutEventManager: 'ILayoutEventManager',
    ILayoutValidator: 'ILayoutValidator',
    ILayoutPerformanceMonitor: 'ILayoutPerformanceMonitor',
  },
  STYLES: {
    IPositionStyle: 'IPositionStyle',
    ISizeStyle: 'ISizeStyle',
    IAlignmentStyle: 'IAlignmentStyle',
    IVisualStyle: 'IVisualStyle',
    IBackgroundStyle: 'IBackgroundStyle',
    IBorderStyle: 'IBorderStyle',
    IShadowStyle: 'IShadowStyle',
    ITextStyle: 'ITextStyle',
    IAnimationStyle: 'IAnimationStyle',
    ITransformStyle: 'ITransformStyle',
  },
  GAME_UI: {
    IGameUIStyle: 'IGameUIStyle',
    IMenuStyle: 'IMenuStyle',
    IButtonStyle: 'IButtonStyle',
  },
  SPECIALIZED: {
    ISizeConstraints: 'ISizeConstraints',
    IBorderSides: 'IBorderSides',
    IBorderSide: 'IBorderSide',
    IGradientStyle: 'IGradientStyle',
    IPatternStyle: 'IPatternStyle',
    IKeyframe: 'IKeyframe',
    IAnimationEvent: 'IAnimationEvent',
    IInputStyle: 'IInputStyle',
    IGameObjectState: 'IGameObjectState',
    IPhysicsStyle: 'IPhysicsStyle',
    IMenuItemStyle: 'IMenuItemStyle',
    IMenuNavigation: 'IMenuNavigation',
    IMenuAnimations: 'IMenuAnimations',
    IButtonStates: 'IButtonStates',
    IButtonStateStyle: 'IButtonStateStyle',
    IButtonInteractions: 'IButtonInteractions',
    IButtonAnimations: 'IButtonAnimations',
    IButtonAccessibility: 'IButtonAccessibility',
    IThemeSwitch: 'IThemeSwitch',
    IViewport: 'IViewport',
    ILayoutEvent: 'ILayoutEvent',
    IValidationStatistics: 'IValidationStatistics',
    IPerformanceHistory: 'IPerformanceHistory',
    IPerformanceAlert: 'IPerformanceAlert',
    ILayoutListener: 'ILayoutListener',
    IValidationRule: 'IValidationRule',
    IValidationContext: 'IValidationContext',
    IValidationResult: 'IValidationResult',
    IValidationError: 'IValidationError',
    IValidationWarning: 'IValidationWarning',
    IValidationSuggestion: 'IValidationSuggestion',
    IPerformanceMetrics: 'IPerformanceMetrics',
  },
  VALUES: {
    BlendMode: 'BlendMode',
    PositionValue: 'PositionValue',
    SizeValue: 'SizeValue',
    HorizontalAlignment: 'HorizontalAlignment',
    VerticalAlignment: 'VerticalAlignment',
    BorderStyle: 'BorderStyle',
    TextDecoration: 'TextDecoration',
    AnimationDirection: 'AnimationDirection',
    AnimationFillMode: 'AnimationFillMode',
    IAnimationPlayState: 'IAnimationPlayState',
    IAnimationIterationCount: 'IAnimationIterationCount',
  },
} as const;

/**
 * All layout system interfaces bundled together
 */
export const LAYOUT_SYSTEM_INTERFACES = {
  BREAKPOINT: BREAKPOINT_INTERFACES,
  THEME: THEME_INTERFACES,
  STYLE: STYLE_INTERFACES,
  LAYOUT: LAYOUT_INTERFACES,
  STRATEGY: STRATEGY_INTERFACES,
  MANAGER: MANAGER_INTERFACES,
  COMMAND: COMMAND_INTERFACES,
  STATE: STATE_INTERFACES,
  CHAIN: CHAIN_INTERFACES,
  DI: DI_INTERFACES,
  PLUGIN: PLUGIN_INTERFACES,
  GRANULAR: GRANULAR_INTERFACES,
} as const;
