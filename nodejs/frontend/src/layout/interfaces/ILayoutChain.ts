/**
 * Layout Chain of Responsibility Pattern Interfaces
 * Creates a chain of layout processors that can handle different aspects of layout calculation
 * Enables modular layout processing with flexible processing order
 */

import { ILayout, ILayoutConfig, ILayoutContext, ICalculatedLayout } from './ILayout';
import { ValidationSeverity, PerformanceLevel, LayoutChainHandlerType } from '../enums/LayoutEnums';

// ============================================================================
// CHAIN INTERFACES
// ============================================================================

/**
 * Layout chain handler interface
 * Defines the contract for all chain handlers
 */
export interface ILayoutChainHandler {
  /** Handler name */
  readonly name: string;

  /** Handler description */
  readonly description: string;

  /** Handler priority */
  readonly priority: number;

  /** Whether this handler is enabled */
  readonly isEnabled: boolean;

  /** Handler metadata */
  readonly metadata: ILayoutChainHandlerMetadata;

  /** Next handler in the chain */
  nextHandler?: ILayoutChainHandler;

  /**
   * Set the next handler in the chain
   * @param handler Next handler
   */
  setNext(handler: ILayoutChainHandler): ILayoutChainHandler;

  /**
   * Handle the layout processing request
   * @param request Processing request
   * @param context Processing context
   */
  handle(request: ILayoutChainRequest, context: ILayoutChainContext): Promise<ILayoutChainResponse>;

  /**
   * Check if this handler can handle the request
   * @param request Processing request
   * @param context Processing context
   */
  canHandle(request: ILayoutChainRequest, context: ILayoutChainContext): boolean;

  /**
   * Get handler capabilities
   */
  getCapabilities(): ILayoutChainHandlerCapabilities;

  /**
   * Get handler performance characteristics
   */
  getPerformanceCharacteristics(): ILayoutChainHandlerPerformance;
}

/**
 * Layout chain request interface
 * Represents a request to process layout
 */
export interface ILayoutChainRequest {
  /** Request ID */
  id: string;

  /** Request type */
  type: string;

  /** Layout to process */
  layout: ILayout;

  /** Layout configuration */
  config: ILayoutConfig;

  /** Layout context */
  context: ILayoutContext;

  /** Request parameters */
  parameters: Record<string, unknown>;

  /** Request priority */
  priority: number;

  /** Request timestamp */
  timestamp: number;

  /** Request metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Layout chain response interface
 * Represents the response from chain processing
 */
export interface ILayoutChainResponse {
  /** Response ID */
  id: string;

  /** Whether the processing was successful */
  success: boolean;

  /** Error message if failed */
  error?: string;

  /** Processed layout */
  layout?: ILayout;

  /** Calculated layout result */
  calculatedLayout?: ICalculatedLayout;

  /** Processing chain */
  processingChain: string[];

  /** Processing time */
  processingTime: number;

  /** Response metadata */
  metadata: Record<string, unknown>;
}

/**
 * Layout chain context interface
 * Provides context for chain processing
 */
export interface ILayoutChainContext {
  /** Chain manager */
  chainManager: any; // Will be ILayoutChainManager when implemented

  /** Processing options */
  options: {
    validateRequests: boolean;
    logProcessing: boolean;
    enableRollback: boolean;
    timeout: number;
    maxRetries: number;
  };

  /** Processing state */
  state: {
    currentHandler: string;
    processedHandlers: string[];
    remainingHandlers: string[];
    retryCount: number;
  };

  /** Custom context data */
  custom?: Record<string, unknown>;
}

/**
 * Layout chain handler metadata interface
 */
export interface ILayoutChainHandlerMetadata {
  /** Handler type */
  type: string;

  /** Handler version */
  version: string;

  /** Handler author */
  author?: string;

  /** Handler tags */
  tags?: string[];

  /** Handler category */
  category?: string;

  /** Handler dependencies */
  dependencies?: string[];

  /** Handler constraints */
  constraints?: {
    requiredContext?: string[];
    forbiddenContext?: string[];
    minPriority?: number;
    maxPriority?: number;
  };

  /** Custom metadata */
  custom?: Record<string, unknown>;
}

/**
 * Layout chain handler capabilities interface
 */
export interface ILayoutChainHandlerCapabilities {
  /** Supported request types */
  supportedRequestTypes: string[];

  /** Supported layout types */
  supportedLayoutTypes: string[];

  /** Processing capabilities */
  capabilities: {
    validation: boolean;
    calculation: boolean;
    transformation: boolean;
    optimization: boolean;
    caching: boolean;
  };

  /** Feature support */
  features: {
    responsive: boolean;
    unitConversion: boolean;
    themeIntegration: boolean;
    performanceOptimization: boolean;
  };
}

/**
 * Layout chain handler performance interface
 */
export interface ILayoutChainHandlerPerformance {
  /** Handler complexity */
  complexity: 'O(1)' | 'O(n)' | 'O(n²)' | 'O(log n)';

  /** Memory usage level */
  memoryUsage: PerformanceLevel;

  /** Processing speed */
  processingSpeed: PerformanceLevel;

  /** Estimated processing time */
  estimatedProcessingTime: number;

  /** Handler-specific optimizations */
  optimizations?: string[];
}

// ============================================================================
// SPECIFIC HANDLER INTERFACES
// ============================================================================

/**
 * Validation chain handler interface
 * Validates layout configuration and context
 */
export interface IValidationChainHandler extends ILayoutChainHandler {
  /** Handler type */
  readonly type: LayoutChainHandlerType.VALIDATION;

  /** Validation rules */
  readonly validationRules: ILayoutChainValidationRule[];

  /**
   * Add validation rule
   * @param rule Validation rule
   */
  addValidationRule(rule: ILayoutChainValidationRule): void;

  /**
   * Remove validation rule
   * @param ruleName Rule name
   */
  removeValidationRule(ruleName: string): boolean;

  /**
   * Handle validation request
   * @param request Processing request
   * @param context Processing context
   */
  handleValidation(
    request: ILayoutChainRequest,
    context: ILayoutChainContext
  ): Promise<ILayoutChainResponse>;
}

/**
 * Unit conversion chain handler interface
 * Handles unit system conversions
 */
export interface IUnitConversionChainHandler extends ILayoutChainHandler {
  /** Handler type */
  readonly type: LayoutChainHandlerType.UNIT_CONVERSION;

  /** Supported unit types */
  readonly supportedUnits: string[];

  /**
   * Convert units in layout
   * @param request Processing request
   * @param context Processing context
   */
  handleUnitConversion(
    request: ILayoutChainRequest,
    context: ILayoutChainContext
  ): Promise<ILayoutChainResponse>;
}

/**
 * Responsive chain handler interface
 * Handles responsive behavior
 */
export interface IResponsiveChainHandler extends ILayoutChainHandler {
  /** Handler type */
  readonly type: LayoutChainHandlerType.RESPONSIVE;

  /** Supported breakpoints */
  readonly supportedBreakpoints: string[];

  /**
   * Handle responsive processing
   * @param request Processing request
   * @param context Processing context
   */
  handleResponsive(
    request: ILayoutChainRequest,
    context: ILayoutChainContext
  ): Promise<ILayoutChainResponse>;
}

/**
 * Theme chain handler interface
 * Handles theme integration
 */
export interface IThemeChainHandler extends ILayoutChainHandler {
  /** Handler type */
  readonly type: LayoutChainHandlerType.THEME;

  /** Supported themes */
  readonly supportedThemes: string[];

  /**
   * Handle theme processing
   * @param request Processing request
   * @param context Processing context
   */
  handleTheme(
    request: ILayoutChainRequest,
    context: ILayoutChainContext
  ): Promise<ILayoutChainResponse>;
}

/**
 * Calculation chain handler interface
 * Handles layout calculations
 */
export interface ICalculationChainHandler extends ILayoutChainHandler {
  /** Handler type */
  readonly type: LayoutChainHandlerType.CALCULATION;

  /** Calculation strategies */
  readonly calculationStrategies: string[];

  /**
   * Handle calculation processing
   * @param request Processing request
   * @param context Processing context
   */
  handleCalculation(
    request: ILayoutChainRequest,
    context: ILayoutChainContext
  ): Promise<ILayoutChainResponse>;
}

/**
 * Optimization chain handler interface
 * Handles layout optimization
 */
export interface IOptimizationChainHandler extends ILayoutChainHandler {
  /** Handler type */
  readonly type: LayoutChainHandlerType.OPTIMIZATION;

  /** Optimization strategies */
  readonly optimizationStrategies: string[];

  /**
   * Handle optimization processing
   * @param request Processing request
   * @param context Processing context
   */
  handleOptimization(
    request: ILayoutChainRequest,
    context: ILayoutChainContext
  ): Promise<ILayoutChainResponse>;
}

/**
 * Caching chain handler interface
 * Handles layout caching
 */
export interface ICachingChainHandler extends ILayoutChainHandler {
  /** Handler type */
  readonly type: LayoutChainHandlerType.CACHING;

  /** Cache hit rate */
  readonly cacheHitRate: number;

  /**
   * Handle caching processing
   * @param request Processing request
   * @param context Processing context
   */
  handleCaching(
    request: ILayoutChainRequest,
    context: ILayoutChainContext
  ): Promise<ILayoutChainResponse>;
}

/**
 * Layout chain validation rule interface
 */
export interface ILayoutChainValidationRule {
  /** Rule name */
  name: string;

  /** Rule description */
  description: string;

  /** Rule condition */
  condition: (request: ILayoutChainRequest, context: ILayoutChainContext) => boolean;

  /** Rule severity */
  severity: ValidationSeverity;

  /** Error message */
  errorMessage: string;

  /** Suggested fix */
  suggestedFix?: string;
}

// ============================================================================
// CHAIN MANAGER INTERFACES
// ============================================================================

/**
 * Layout chain manager interface
 * Manages the chain of responsibility for layout processing
 */
export interface ILayoutChainManager {
  /** Chain handlers */
  readonly handlers: Map<string, ILayoutChainHandler>;

  /** Chain head */
  readonly chainHead: ILayoutChainHandler | undefined;

  /** Chain tail */
  readonly chainTail: ILayoutChainHandler | undefined;

  /** Processing queue */
  readonly processingQueue: ILayoutChainRequest[];

  /** Whether processing is enabled */
  readonly processingEnabled: boolean;

  /** Maximum queue size */
  readonly maxQueueSize: number;

  /**
   * Initialize the chain manager
   * @param handlers Initial handlers
   */
  initialize(handlers: ILayoutChainHandler[]): Promise<void>;

  /**
   * Add handler to the chain
   * @param handler Handler to add
   * @param position Position in chain (optional)
   */
  addHandler(handler: ILayoutChainHandler, position?: number): void;

  /**
   * Remove handler from the chain
   * @param handlerName Handler name
   */
  removeHandler(handlerName: string): boolean;

  /**
   * Get handler by name
   * @param handlerName Handler name
   */
  getHandler(handlerName: string): ILayoutChainHandler | undefined;

  /**
   * Process a layout request through the chain
   * @param request Processing request
   * @param context Processing context
   */
  processRequest(
    request: ILayoutChainRequest,
    context?: Partial<ILayoutChainContext>
  ): Promise<ILayoutChainResponse>;

  /**
   * Process multiple requests
   * @param requests Processing requests
   * @param context Processing context
   */
  processRequests(
    requests: ILayoutChainRequest[],
    context?: Partial<ILayoutChainContext>
  ): Promise<ILayoutChainResponse[]>;

  /**
   * Get chain statistics
   */
  getStatistics(): IChainManagerStatistics;

  /**
   * Add chain listener
   * @param listener Listener to add
   */
  addListener(listener: IChainListener): void;

  /**
   * Remove chain listener
   * @param listener Listener to remove
   */
  removeListener(listener: IChainListener): boolean;
}

/**
 * Chain listener interface
 */
export interface IChainListener {
  /**
   * Called when a request is processed
   * @param request The request that was processed
   * @param response The processing response
   */
  onRequestProcessed?(request: ILayoutChainRequest, response: ILayoutChainResponse): void;

  /**
   * Called when a handler processes a request
   * @param handler The handler that processed the request
   * @param request The request that was processed
   */
  onHandlerProcessed?(handler: ILayoutChainHandler, request: ILayoutChainRequest): void;

  /**
   * Called when a handler is added to the chain
   * @param handler The handler that was added
   */
  onHandlerAdded?(handler: ILayoutChainHandler): void;

  /**
   * Called when a handler is removed from the chain
   * @param handler The handler that was removed
   */
  onHandlerRemoved?(handler: ILayoutChainHandler): void;

  /**
   * Called when an error occurs
   * @param error The error that occurred
   * @param request The request that caused the error
   */
  onError?(error: Error, request?: ILayoutChainRequest): void;
}

/**
 * Chain manager statistics interface
 */
export interface IChainManagerStatistics {
  /** Total requests processed */
  totalRequests: number;

  /** Successful requests */
  successfulRequests: number;

  /** Failed requests */
  failedRequests: number;

  /** Average processing time */
  averageProcessingTime: number;

  /** Handler distribution */
  handlerDistribution: Record<string, number>;

  /** Queue statistics */
  queue: {
    currentSize: number;
    maxSize: number;
    averageWaitTime: number;
  };

  /** Performance metrics */
  performance: {
    totalProcessingTime: number;
    totalHandlerTime: number;
    memoryUsage: number;
    errorRate: number;
  };
}

// ============================================================================
// CHAIN FACTORY INTERFACES
// ============================================================================

/**
 * Layout chain factory interface
 * Creates layout chain handlers
 */
export interface ILayoutChainFactory {
  /**
   * Create a handler by type
   * @param type Handler type
   * @param config Handler configuration
   */
  createHandler(type: string, config: Record<string, unknown>): ILayoutChainHandler;

  /**
   * Create a validation handler
   * @param config Handler configuration
   */
  createValidationHandler(config?: Record<string, unknown>): IValidationChainHandler;

  /**
   * Create a unit conversion handler
   * @param config Handler configuration
   */
  createUnitConversionHandler(config?: Record<string, unknown>): IUnitConversionChainHandler;

  /**
   * Create a responsive handler
   * @param config Handler configuration
   */
  createResponsiveHandler(config?: Record<string, unknown>): IResponsiveChainHandler;

  /**
   * Create a theme handler
   * @param config Handler configuration
   */
  createThemeHandler(config?: Record<string, unknown>): IThemeChainHandler;

  /**
   * Create a calculation handler
   * @param config Handler configuration
   */
  createCalculationHandler(config?: Record<string, unknown>): ICalculationChainHandler;

  /**
   * Create an optimization handler
   * @param config Handler configuration
   */
  createOptimizationHandler(config?: Record<string, unknown>): IOptimizationChainHandler;

  /**
   * Create a caching handler
   * @param config Handler configuration
   */
  createCachingHandler(config?: Record<string, unknown>): ICachingChainHandler;

  /**
   * Get available handler types
   */
  getAvailableHandlerTypes(): string[];

  /**
   * Get handler configuration schema
   * @param type Handler type
   */
  getHandlerConfigSchema(type: string): Record<string, unknown>;
}
