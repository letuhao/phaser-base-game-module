/**
 * Button Interfaces Index
 *
 * Centralized exports for all button click system interfaces that handle
 * button click events and coordinate click actions.
 */

// Core button interfaces
export type { IButtonClickEventHandler } from './IButtonClickEventHandler';
export type { IButtonClickCoordinator } from './IButtonClickCoordinator';

// Supporting interfaces for Button Click Event Handler
export type {
  IButtonClickEvent,
  IButtonClickTarget,
  IClickCoordinates,
  IClickModifiers,
  IButtonConfig,
  IClickValidationRule,
  IButtonClickMetadata,
  IButtonClickValidation,
  IButtonClickResult,
  IButtonClickAction,
  IButtonClickError,
  IButtonClickWarning,
  IButtonClickResultMetadata,
  IButtonClickListener,
} from './IButtonClickEventHandler';

// Statistics and configuration interfaces
export type {
  IButtonClickStatistics,
  IButtonClickPerformanceMetrics,
  IButtonClickErrorMetrics,
} from './IButtonClickStatistics';

export type {
  IButtonClickEventHandlerConfig,
  IButtonClickEventConfig,
  IButtonClickValidationConfig,
  IButtonClickPerformanceConfig,
  IButtonClickMonitoringConfig,
} from './IButtonClickConfig';

// Parameter interfaces
export type {
  IButtonClickParameters,
  IButtonClickParameterValue,
  IButtonClickCustomData,
  IButtonClickActionResult,
  IGameObjectClickEvent,
  IGameObjectClickTarget,
  IGameObjectClickCoordinates,
  IGameObjectClickModifiers,
} from './IButtonClickParameters';

// Supporting interfaces for Button Click Coordinator
export type {
  IButtonClickActionDefinition,
  IActionValidation,
  IValidationRule,
  IActionExecution,
  IPreCondition,
  IPostCondition,
  IActionRollback,
  IButtonClickFlow,
  IFlowCondition,
  IFlowMetadata,
  IButtonClickExecutionContext,
  IButtonClickTarget as ICoordinatorButtonClickTarget,
  IExecutionEnvironment,
  IViewportInfo,
  IDeviceCapabilities,
  IExecutionPermissions,
  IExecutionState,
} from './IButtonClickCoordinator';

// Coordinator statistics and configuration interfaces
export type {
  IButtonClickCoordinatorStatistics,
  IButtonClickCoordinatorPerformanceMetrics,
  IButtonClickCoordinatorErrorMetrics,
} from './IButtonClickCoordinatorStatistics';

export type {
  IButtonClickCoordinatorConfig,
  IButtonClickFlowConfig,
  IButtonClickActionConfig,
  IButtonClickCoordinatorPerformanceConfig,
  IButtonClickCoordinatorMonitoringConfig,
} from './IButtonClickCoordinatorConfig';

// Enums
export {
  ButtonClickEventType,
  ButtonClickSource,
  ClickValidationResult,
  ClickPriority,
  ButtonClickActionType,
  ButtonClickActionStatus,
} from '../../enums/ButtonClickEnums';

export {
  ExecutionType,
  FlowType,
  TargetType,
  RuleType,
  SeverityLevel,
} from '../../enums/ExecutionEnums';

// Button interface bundles for easy importing
export const BUTTON_INTERFACES = {
  // Core interfaces
  IButtonClickEventHandler: 'IButtonClickEventHandler',
  IButtonClickCoordinator: 'IButtonClickCoordinator',
} as const;

// Button categories for organization
export const BUTTON_CATEGORIES = {
  // Event handling
  EVENT_HANDLING: ['IButtonClickEventHandler'],

  // Coordination
  COORDINATION: ['IButtonClickCoordinator'],

  // All button interfaces
  ALL_BUTTON: ['IButtonClickEventHandler', 'IButtonClickCoordinator'],
} as const;

// Button event types
export const BUTTON_EVENT_TYPES = {
  HTML_CLICK: 'html_click',
  GAME_OBJECT_CLICK: 'game_object_click',
  TOUCH_START: 'touch_start',
  TOUCH_END: 'touch_end',
  MOUSE_DOWN: 'mouse_down',
  MOUSE_UP: 'mouse_up',
  KEYBOARD_ACTIVATION: 'keyboard_activation',
} as const;

// Button click sources
export const BUTTON_CLICK_SOURCES = {
  HTML_ELEMENT: 'html_element',
  GAME_OBJECT: 'game_object',
  EXTERNAL_SYSTEM: 'external_system',
} as const;

// Button action types
export const BUTTON_ACTION_TYPES = {
  NAVIGATE: 'navigate',
  TOGGLE: 'toggle',
  SUBMIT: 'submit',
  CANCEL: 'cancel',
  CONFIRM: 'confirm',
  CLOSE: 'close',
  OPEN: 'open',
  PLAY: 'play',
  PAUSE: 'pause',
  STOP: 'stop',
  RESET: 'reset',
  SAVE: 'save',
  LOAD: 'load',
  DELETE: 'delete',
  EDIT: 'edit',
  COPY: 'copy',
  PASTE: 'paste',
  CUSTOM: 'custom',
} as const;

// Click priority levels
export const CLICK_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;

// Flow types
export const FLOW_TYPES = {
  SEQUENTIAL: 'sequential',
  PARALLEL: 'parallel',
  CONDITIONAL: 'conditional',
  CUSTOM: 'custom',
} as const;
