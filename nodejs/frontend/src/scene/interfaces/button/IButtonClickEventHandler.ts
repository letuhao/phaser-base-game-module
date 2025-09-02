/**
 * Button Click Event Handler Interface
 *
 * Handles button click events from both HTML elements outside the canvas
 * and custom game object buttons within the canvas. Provides unified
 * event handling, debouncing, and click validation.
 *
 * Features:
 * - HTML element click detection
 * - Game object button click detection
 * - Click event debouncing and throttling
 * - Click validation and filtering
 * - Event delegation and bubbling
 * - Performance optimization
 */

import type { IGameObject } from '../../../abstract/base/IGameObject';
import type {
  IButtonClickParameters,
  IButtonClickCustomData,
  IButtonClickActionResult,
  IGameObjectClickEvent,
} from './IButtonClickParameters';
import {
  ButtonClickEventType,
  ButtonClickSource,
  ClickValidationResult,
  ClickPriority,
} from '../../enums/ButtonClickEnums';
import { TargetType, RuleType, SeverityLevel } from '../../enums/ExecutionEnums';

// Forward declarations to avoid circular dependencies
export interface IButtonClickStatistics {
  readonly totalClicks: number;
  readonly validClicks: number;
  readonly invalidClicks: number;
  readonly debouncedClicks: number;
  readonly throttledClicks: number;
  readonly filteredClicks: number;
  readonly htmlClicks: number;
  readonly gameObjectClicks: number;
  readonly performance: IButtonClickPerformanceMetrics;
  readonly errors: IButtonClickErrorMetrics;
  readonly lastUpdated: Date;
}

export interface IButtonClickPerformanceMetrics {
  readonly averageProcessingTime: number;
  readonly averageValidationTime: number;
  readonly averageActionTime: number;
  readonly clicksPerSecond: number;
  readonly eventsPerSecond: number;
}

export interface IButtonClickErrorMetrics {
  readonly totalErrors: number;
  readonly errorsByType: Record<string, number>;
  readonly errorsBySource: Record<string, number>;
}

export interface IButtonClickEventHandlerConfig {
  readonly events: IButtonClickEventConfig;
  readonly validation: IButtonClickValidationConfig;
  readonly performance: IButtonClickPerformanceConfig;
  readonly monitoring: IButtonClickMonitoringConfig;
}

export interface IButtonClickEventConfig {
  readonly enableHtmlClicks: boolean;
  readonly enableGameObjectClicks: boolean;
  readonly enableTouchEvents: boolean;
  readonly enableKeyboardEvents: boolean;
  readonly debounceDelay: number;
  readonly throttleDelay: number;
}

export interface IButtonClickValidationConfig {
  readonly enableClickValidation: boolean;
  readonly enableDebouncing: boolean;
  readonly enableThrottling: boolean;
  readonly enableFiltering: boolean;
  readonly maxClicksPerSecond: number;
}

export interface IButtonClickPerformanceConfig {
  readonly enableOptimization: boolean;
  readonly enableEventPooling: boolean;
  readonly maxConcurrentEvents: number;
  readonly eventTimeout: number;
}

export interface IButtonClickMonitoringConfig {
  readonly enableStatistics: boolean;
  readonly enableErrorTracking: boolean;
  readonly statisticsRetentionPeriod: number;
}

export interface IButtonClickCoordinator {
  readonly coordinatorId: string;
  readonly isInitialized: boolean;
  readonly statistics: IButtonClickStatistics;
  readonly config: IButtonClickEventHandlerConfig;
}

// ============================================================================
// BUTTON CLICK EVENT TYPES
// ============================================================================

// ============================================================================
// BUTTON CLICK EVENT DATA
// ============================================================================

export interface IButtonClickEvent {
  readonly eventId: string;
  readonly eventType: ButtonClickEventType;
  readonly source: ButtonClickSource;
  readonly timestamp: Date;
  readonly target: IButtonClickTarget;
  readonly coordinates: IClickCoordinates;
  readonly modifiers: IClickModifiers;
  readonly metadata: IButtonClickMetadata;
}

export interface IButtonClickTarget {
  readonly targetId: string;
  readonly targetType: TargetType;
  readonly element?: HTMLElement;
  readonly gameObject?: IGameObject;
  readonly buttonId?: string;
  readonly buttonType?: string;
  readonly buttonConfig?: IButtonConfig;
}

export interface IClickCoordinates {
  readonly x: number;
  readonly y: number;
  readonly clientX: number;
  readonly clientY: number;
  readonly screenX: number;
  readonly screenY: number;
  readonly relativeX?: number;
  readonly relativeY?: number;
}

export interface IClickModifiers {
  readonly ctrlKey: boolean;
  readonly shiftKey: boolean;
  readonly altKey: boolean;
  readonly metaKey: boolean;
  readonly button: number; // MOUSE_BUTTONS.LEFT, MOUSE_BUTTONS.MIDDLE, MOUSE_BUTTONS.RIGHT
  readonly buttons: number;
}

export interface IButtonConfig {
  readonly buttonId: string;
  readonly buttonType: string;
  readonly enabled: boolean;
  readonly visible: boolean;
  readonly clickable: boolean;
  readonly debounceDelay?: number;
  readonly throttleDelay?: number;
  readonly validationRules?: IClickValidationRule[];
}

export interface IClickValidationRule {
  readonly ruleId: string;
  readonly ruleType: RuleType;
  readonly enabled: boolean;
  readonly parameters: IButtonClickParameters;
}

export interface IButtonClickMetadata {
  readonly sessionId: string;
  readonly userId?: string;
  readonly context: string;
  readonly priority: ClickPriority;
  readonly tags: string[];
  readonly customData: IButtonClickCustomData;
}

// ============================================================================
// BUTTON CLICK VALIDATION
// ============================================================================

export interface IButtonClickValidation {
  readonly validationId: string;
  readonly event: IButtonClickEvent;
  readonly result: ClickValidationResult;
  readonly isValid: boolean;
  readonly reason?: string;
  readonly appliedRules: string[];
  readonly timestamp: Date;
}

// ============================================================================
// BUTTON CLICK RESULT
// ============================================================================

export interface IButtonClickResult {
  readonly resultId: string;
  readonly event: IButtonClickEvent;
  readonly success: boolean;
  readonly duration: number;
  readonly actions: IButtonClickAction[];
  readonly errors: IButtonClickError[];
  readonly warnings: IButtonClickWarning[];
  readonly metadata: IButtonClickResultMetadata;
}

export interface IButtonClickAction {
  readonly actionId: string;
  readonly actionType: string;
  readonly target: string;
  readonly parameters: IButtonClickParameters;
  readonly success: boolean;
  readonly duration: number;
  readonly result?: IButtonClickActionResult;
}

export interface IButtonClickError {
  readonly errorId: string;
  readonly code: string;
  readonly message: string;
  readonly source: ButtonClickSource;
  readonly severity: SeverityLevel;
  readonly timestamp: Date;
  readonly stack?: string;
}

export interface IButtonClickWarning {
  readonly warningId: string;
  readonly code: string;
  readonly message: string;
  readonly source: ButtonClickSource;
  readonly severity: Omit<SeverityLevel, SeverityLevel.CRITICAL>;
  readonly timestamp: Date;
}

export interface IButtonClickResultMetadata {
  readonly processingTime: number;
  readonly actionsExecuted: number;
  readonly successfulActions: number;
  readonly failedActions: number;
  readonly warningsGenerated: number;
  readonly errorsGenerated: number;
  readonly timestamp: Date;
}

// ============================================================================
// BUTTON CLICK LISTENER
// ============================================================================

export interface IButtonClickListener {
  readonly listenerId: string;
  readonly eventTypes: ButtonClickEventType[];
  readonly sources: ButtonClickSource[];
  readonly priority: ClickPriority;
  readonly enabled: boolean;
  onButtonClick(event: IButtonClickEvent): Promise<IButtonClickResult>;
}

// ============================================================================
// BUTTON CLICK EVENT HANDLER INTERFACE
// ============================================================================

export interface IButtonClickEventHandler {
  readonly handlerId: string;
  readonly isInitialized: boolean;
  readonly isListening: boolean;
  readonly coordinator: IButtonClickCoordinator;
  readonly statistics: IButtonClickStatistics;
  readonly listeners: Set<IButtonClickListener>;
  readonly config: IButtonClickEventHandlerConfig;

  // Lifecycle
  initialize(config?: Partial<IButtonClickEventHandlerConfig>): Promise<void>;
  destroy(): Promise<void>;

  // Event listening
  startListening(): Promise<void>;
  stopListening(): Promise<void>;
  isEventTypeEnabled(eventType: ButtonClickEventType): boolean;

  // Event handling
  handleHtmlClick(
    event: MouseEvent | TouchEvent,
    element: HTMLElement
  ): Promise<IButtonClickResult>;
  handleGameObjectClick(
    event: IGameObjectClickEvent,
    gameObject: IGameObject
  ): Promise<IButtonClickResult>;
  handleKeyboardActivation(
    event: KeyboardEvent,
    target: IButtonClickTarget
  ): Promise<IButtonClickResult>;

  // Event validation
  validateClick(event: IButtonClickEvent): Promise<IButtonClickValidation>;
  isClickValid(event: IButtonClickEvent): Promise<boolean>;
  shouldProcessClick(event: IButtonClickEvent): Promise<boolean>;

  // Event processing
  processClick(event: IButtonClickEvent): Promise<IButtonClickResult>;
  executeClickActions(event: IButtonClickEvent): Promise<IButtonClickAction[]>;

  // Listener management
  addListener(listener: IButtonClickListener): void;
  removeListener(listenerId: string): void;
  getListener(listenerId: string): IButtonClickListener | null;
  getAllListeners(): IButtonClickListener[];

  // Statistics and monitoring
  getStatistics(): IButtonClickStatistics;
  resetStatistics(): void;
  getPerformanceMetrics(): Record<string, number>;

  // Configuration
  updateConfig(config: Partial<IButtonClickEventHandlerConfig>): void;
  getConfig(): IButtonClickEventHandlerConfig;
}
