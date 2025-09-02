/**
 * Button Click Coordinator Interface
 *
 * Coordinates button click events between HTML elements and game objects,
 * manages click actions, and orchestrates the complete button click flow.
 *
 * Features:
 * - Unified click event coordination
 * - Action execution and management
 * - Click flow orchestration
 * - Performance optimization
 * - Error handling and recovery
 * - Statistics and monitoring
 */

import type { IGameObject } from '../../../abstract/base/IGameObject';
import type {
  IButtonClickEvent,
  IButtonClickResult,
  IButtonClickAction,
  IButtonClickListener,
  IButtonClickStatistics,
  IButtonClickEventHandlerConfig,
} from './IButtonClickEventHandler';
import type { IButtonClickParameters } from './IButtonClickParameters';
import {
  ButtonClickSource,
  ClickPriority,
  ButtonClickActionType,
} from '../../enums/ButtonClickEnums';
import { ExecutionType, FlowType, TargetType } from '../../enums/ExecutionEnums';

// Forward declarations to avoid circular dependencies
export interface IButtonClickCoordinatorStatistics {
  readonly totalFlows: number;
  readonly totalActions: number;
  readonly successfulFlows: number;
  readonly failedFlows: number;
  readonly successfulActions: number;
  readonly failedActions: number;
  readonly performance: IButtonClickCoordinatorPerformanceMetrics;
  readonly errors: IButtonClickCoordinatorErrorMetrics;
  readonly lastUpdated: Date;
}

export interface IButtonClickCoordinatorPerformanceMetrics {
  readonly averageFlowTime: number;
  readonly averageActionTime: number;
  readonly flowsPerSecond: number;
  readonly actionsPerSecond: number;
  readonly averageQueueTime: number;
}

export interface IButtonClickCoordinatorErrorMetrics {
  readonly totalErrors: number;
  readonly errorsByType: Record<string, number>;
  readonly errorsByAction: Record<string, number>;
  readonly errorsByFlow: Record<string, number>;
}

export interface IButtonClickCoordinatorConfig {
  readonly flows: IButtonClickFlowConfig;
  readonly actions: IButtonClickActionConfig;
  readonly performance: IButtonClickCoordinatorPerformanceConfig;
  readonly monitoring: IButtonClickCoordinatorMonitoringConfig;
}

export interface IButtonClickFlowConfig {
  readonly enableFlowExecution: boolean;
  readonly enableFlowValidation: boolean;
  readonly maxConcurrentFlows: number;
  readonly flowTimeout: number;
}

export interface IButtonClickActionConfig {
  readonly enableActionExecution: boolean;
  readonly enableActionValidation: boolean;
  readonly maxConcurrentActions: number;
  readonly actionTimeout: number;
  readonly enableRetry: boolean;
  readonly maxRetryCount: number;
}

export interface IButtonClickCoordinatorPerformanceConfig {
  readonly enableOptimization: boolean;
  readonly enableParallelExecution: boolean;
  readonly enableCaching: boolean;
  readonly cacheTimeout: number;
}

export interface IButtonClickCoordinatorMonitoringConfig {
  readonly enableStatistics: boolean;
  readonly enableErrorTracking: boolean;
  readonly enablePerformanceTracking: boolean;
  readonly statisticsRetentionPeriod: number;
}

export interface IButtonClickEventHandler {
  readonly handlerId: string;
  readonly isInitialized: boolean;
  readonly isListening: boolean;
  readonly statistics: IButtonClickStatistics;
  readonly listeners: Set<IButtonClickListener>;
  readonly config: IButtonClickEventHandlerConfig;
}

// ============================================================================
// BUTTON CLICK ACTION TYPES
// ============================================================================

// ============================================================================
// BUTTON CLICK ACTION DEFINITIONS
// ============================================================================

export interface IButtonClickActionDefinition {
  readonly actionId: string;
  readonly actionType: ButtonClickActionType;
  readonly name: string;
  readonly description: string;
  readonly enabled: boolean;
  readonly priority: ClickPriority;
  readonly parameters: IButtonClickParameters;
  readonly validation: IActionValidation;
  readonly execution: IActionExecution;
  readonly rollback?: IActionRollback;
}

export interface IActionValidation {
  readonly enabled: boolean;
  readonly rules: IValidationRule[];
  readonly requiredParameters: string[];
  readonly optionalParameters: string[];
}

export interface IValidationRule {
  readonly ruleId: string;
  readonly ruleType: string;
  readonly enabled: boolean;
  readonly parameters: IButtonClickParameters;
}

export interface IActionExecution {
  readonly executionType: ExecutionType;
  readonly timeout: number;
  readonly retryCount: number;
  readonly retryDelay: number;
  readonly dependencies: string[];
  readonly preConditions: IPreCondition[];
  readonly postConditions: IPostCondition[];
}

export interface IPreCondition {
  readonly conditionId: string;
  readonly conditionType: string;
  readonly enabled: boolean;
  readonly parameters: IButtonClickParameters;
}

export interface IPostCondition {
  readonly conditionId: string;
  readonly conditionType: string;
  readonly enabled: boolean;
  readonly parameters: IButtonClickParameters;
}

export interface IActionRollback {
  readonly enabled: boolean;
  readonly rollbackActions: string[];
  readonly rollbackTimeout: number;
  readonly rollbackConditions: IPreCondition[];
}

// ============================================================================
// BUTTON CLICK FLOW
// ============================================================================

export interface IButtonClickFlow {
  readonly flowId: string;
  readonly flowName: string;
  readonly flowType: FlowType;
  readonly enabled: boolean;
  readonly actions: IButtonClickActionDefinition[];
  readonly conditions: IFlowCondition[];
  readonly metadata: IFlowMetadata;
}

export interface IFlowCondition {
  readonly conditionId: string;
  readonly conditionType: string;
  readonly enabled: boolean;
  readonly parameters: IButtonClickParameters;
  readonly nextAction?: string;
  readonly alternativeAction?: string;
}

export interface IFlowMetadata {
  readonly description: string;
  readonly version: string;
  readonly author: string;
  readonly tags: string[];
  readonly customData: IButtonClickParameters;
}

// ============================================================================
// BUTTON CLICK EXECUTION CONTEXT
// ============================================================================

export interface IButtonClickExecutionContext {
  readonly contextId: string;
  readonly sessionId: string;
  readonly userId?: string;
  readonly timestamp: Date;
  readonly source: ButtonClickSource;
  readonly target: IButtonClickTarget;
  readonly environment: IExecutionEnvironment;
  readonly permissions: IExecutionPermissions;
  readonly state: IExecutionState;
}

export interface IButtonClickTarget {
  readonly targetId: string;
  readonly targetType: TargetType;
  readonly element?: HTMLElement;
  readonly gameObject?: IGameObject;
  readonly buttonId?: string;
  readonly buttonType?: string;
}

export interface IExecutionEnvironment {
  readonly platform: string;
  readonly browser: string;
  readonly device: string;
  readonly viewport: IViewportInfo;
  readonly capabilities: IDeviceCapabilities;
}

export interface IViewportInfo {
  readonly width: number;
  readonly height: number;
  readonly devicePixelRatio: number;
  readonly orientation: string;
}

export interface IDeviceCapabilities {
  readonly touch: boolean;
  readonly mouse: boolean;
  readonly keyboard: boolean;
  readonly gamepad: boolean;
  readonly voice: boolean;
}

export interface IExecutionPermissions {
  readonly canNavigate: boolean;
  readonly canModifyState: boolean;
  readonly canAccessStorage: boolean;
  readonly canMakeRequests: boolean;
  readonly canAccessCamera: boolean;
  readonly canAccessMicrophone: boolean;
}

export interface IExecutionState {
  readonly gameState: IButtonClickParameters;
  readonly uiState: IButtonClickParameters;
  readonly userState: IButtonClickParameters;
  readonly sessionState: IButtonClickParameters;
}

// ============================================================================
// BUTTON CLICK COORDINATOR INTERFACE
// ============================================================================

export interface IButtonClickCoordinator {
  readonly coordinatorId: string;
  readonly isInitialized: boolean;
  readonly eventHandler: IButtonClickEventHandler;
  readonly statistics: IButtonClickCoordinatorStatistics;
  readonly config: IButtonClickCoordinatorConfig;
  readonly registeredFlows: Map<string, IButtonClickFlow>;
  readonly registeredActions: Map<string, IButtonClickActionDefinition>;
  readonly activeExecutions: Map<string, IButtonClickExecutionContext>;

  // Lifecycle
  initialize(config?: Partial<IButtonClickCoordinatorConfig>): Promise<void>;
  destroy(): Promise<void>;

  // Flow management
  registerFlow(flow: IButtonClickFlow): void;
  unregisterFlow(flowId: string): void;
  getFlow(flowId: string): IButtonClickFlow | null;
  getAllFlows(): IButtonClickFlow[];

  // Action management
  registerAction(action: IButtonClickActionDefinition): void;
  unregisterAction(actionId: string): void;
  getAction(actionId: string): IButtonClickActionDefinition | null;
  getAllActions(): IButtonClickActionDefinition[];

  // Click coordination
  coordinateClick(event: IButtonClickEvent): Promise<IButtonClickResult>;
  executeClickFlow(
    flowId: string,
    context: IButtonClickExecutionContext
  ): Promise<IButtonClickResult>;
  executeClickAction(
    actionId: string,
    context: IButtonClickExecutionContext
  ): Promise<IButtonClickAction>;

  // Flow execution
  executeFlow(
    flow: IButtonClickFlow,
    context: IButtonClickExecutionContext
  ): Promise<IButtonClickResult>;
  executeSequentialFlow(
    flow: IButtonClickFlow,
    context: IButtonClickExecutionContext
  ): Promise<IButtonClickResult>;
  executeParallelFlow(
    flow: IButtonClickFlow,
    context: IButtonClickExecutionContext
  ): Promise<IButtonClickResult>;
  executeConditionalFlow(
    flow: IButtonClickFlow,
    context: IButtonClickExecutionContext
  ): Promise<IButtonClickResult>;

  // Action execution
  executeAction(
    action: IButtonClickActionDefinition,
    context: IButtonClickExecutionContext
  ): Promise<IButtonClickAction>;
  validateAction(
    action: IButtonClickActionDefinition,
    context: IButtonClickExecutionContext
  ): Promise<boolean>;
  rollbackAction(
    action: IButtonClickActionDefinition,
    context: IButtonClickExecutionContext
  ): Promise<boolean>;

  // Context management
  createExecutionContext(event: IButtonClickEvent): IButtonClickExecutionContext;
  updateExecutionContext(contextId: string, updates: Partial<IButtonClickExecutionContext>): void;
  getExecutionContext(contextId: string): IButtonClickExecutionContext | null;
  removeExecutionContext(contextId: string): void;

  // Listener management
  addListener(listener: IButtonClickListener): void;
  removeListener(listenerId: string): void;
  getListener(listenerId: string): IButtonClickListener | null;
  getAllListeners(): IButtonClickListener[];

  // Statistics and monitoring
  getStatistics(): IButtonClickCoordinatorStatistics;
  resetStatistics(): void;
  getPerformanceMetrics(): Record<string, number>;
  getErrorMetrics(): Record<string, number>;

  // Configuration
  updateConfig(config: Partial<IButtonClickCoordinatorConfig>): void;
  getConfig(): IButtonClickCoordinatorConfig;

  // Utility methods
  isFlowRegistered(flowId: string): boolean;
  isActionRegistered(actionId: string): boolean;
  getActiveExecutions(): IButtonClickExecutionContext[];
  cancelExecution(contextId: string): Promise<boolean>;
}
