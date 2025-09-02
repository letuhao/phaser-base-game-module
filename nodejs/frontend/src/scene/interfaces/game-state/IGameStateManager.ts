/**
 * Game State Manager Interface
 * 
 * Orchestrates the entire game flow and manages complex state transitions.
 * Handles the coordination between scenes, events, and game logic systems.
 * 
 * Features:
 * - Game flow orchestration
 * - State transition management
 * - Event coordination
 * - Scene lifecycle management
 * - Button click flow integration
 * - Error handling and recovery
 */

import type { IButtonClickEvent } from '../button/IButtonClickEventHandler';
import type { IGameLogicEvent } from '../game-logic/IGameLogicHandler';
import type { SceneState, SceneType } from '../../enums/SceneEnums';

// ============================================================================
// GAME STATE ENUMS
// ============================================================================

export enum GameFlowState {
  // Initial states
  GAME_START = 'game_start',
  GAME_INITIALIZING = 'game_initializing',
  GAME_READY = 'game_ready',
  
  // Scene management states
  SCENE_CREATING = 'scene_creating',
  SCENE_LOADING = 'scene_loading',
  SCENE_LOADING_FINISHED = 'scene_loading_finished',
  SCENE_ACTIVE = 'scene_active',
  SCENE_TRANSITIONING = 'scene_transitioning',
  
  // Event management states
  EVENT_STARTING = 'event_starting',
  EVENT_PROCESSING = 'event_processing',
  EVENT_FINISHED = 'event_finished',
  EVENT_WAITING = 'event_waiting',
  
  // Game control states
  GAME_PAUSED = 'game_paused',
  GAME_RESUMED = 'game_resumed',
  GAME_SAVING = 'game_saving',
  GAME_LOADING = 'game_loading',
  
  // Terminal states
  GAME_OVER = 'game_over',
  GAME_VICTORY = 'game_victory',
  GAME_ERROR = 'game_error',
  GAME_SHUTDOWN = 'game_shutdown',
}

export enum GameFlowEventType {
  // Scene events
  SCENE_CREATE_REQUEST = 'scene_create_request',
  SCENE_CREATE_START = 'scene_create_start',
  SCENE_CREATE_COMPLETE = 'scene_create_complete',
  SCENE_LOAD_REQUEST = 'scene_load_request',
  SCENE_LOAD_START = 'scene_load_start',
  SCENE_LOAD_PROGRESS = 'scene_load_progress',
  SCENE_LOAD_COMPLETE = 'scene_load_complete',
  SCENE_ACTIVATE = 'scene_activate',
  SCENE_DEACTIVATE = 'scene_deactivate',
  SCENE_TRANSITION_START = 'scene_transition_start',
  SCENE_TRANSITION_COMPLETE = 'scene_transition_complete',
  
  // Game events
  EVENT_START_REQUEST = 'event_start_request',
  EVENT_START = 'event_start',
  EVENT_PROCESS = 'event_process',
  EVENT_COMPLETE = 'event_complete',
  EVENT_CANCEL = 'event_cancel',
  EVENT_ERROR = 'event_error',
  
  // Button click events
  BUTTON_CLICK_RECEIVED = 'button_click_received',
  BUTTON_CLICK_PROCESSING = 'button_click_processing',
  BUTTON_CLICK_COMPLETE = 'button_click_complete',
  
  // System events
  SYSTEM_INITIALIZE = 'system_initialize',
  SYSTEM_READY = 'system_ready',
  SYSTEM_ERROR = 'system_error',
  SYSTEM_SHUTDOWN = 'system_shutdown',
}

export enum GameFlowPriority {
  CRITICAL = 1000,
  HIGH = 800,
  NORMAL = 500,
  LOW = 200,
  BACKGROUND = 100,
}

// ============================================================================
// GAME STATE INTERFACES
// ============================================================================

export interface IGameFlowState {
  readonly gameId: string;
  readonly currentState: GameFlowState;
  readonly previousState: GameFlowState;
  readonly stateHistory: IGameStateTransition[];
  readonly activeScenes: IActiveScene[];
  readonly activeEvents: IActiveEvent[];
  readonly pendingTransitions: IGameStateTransition[];
  readonly metadata: IGameStateMetadata;
  readonly timestamp: Date;
}

export interface IGameStateTransition {
  readonly transitionId: string;
  readonly fromState: GameFlowState;
  readonly toState: GameFlowState;
  readonly trigger: GameFlowEventType;
  readonly priority: GameFlowPriority;
  readonly conditions: ITransitionCondition[];
  readonly actions: ITransitionAction[];
  readonly timeout?: number;
  readonly timestamp: Date;
  readonly status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
}

export interface IActiveScene {
  readonly sceneId: string;
  readonly sceneType: SceneType;
  readonly sceneState: SceneState;
  readonly loadProgress: number;
  readonly dependencies: string[];
  readonly metadata: ISceneMetadata;
}

export interface IActiveEvent {
  readonly eventId: string;
  readonly eventType: GameFlowEventType;
  readonly priority: GameFlowPriority;
  readonly state: 'starting' | 'processing' | 'completing' | 'completed' | 'failed';
  readonly progress: number;
  readonly dependencies: string[];
  readonly metadata: IEventMetadata;
}

export interface IGameStateMetadata {
  readonly gameVersion: string;
  readonly sessionId: string;
  readonly playerId: string;
  readonly startTime: Date;
  readonly lastUpdateTime: Date;
  readonly totalPlayTime: number;
  readonly stateChangeCount: number;
  readonly errorCount: number;
  readonly performance: IGameStatePerformance;
}

export interface ISceneMetadata {
  readonly sceneName: string;
  readonly sceneDescription: string;
  readonly requiredAssets: string[];
  readonly requiredSystems: string[];
  readonly estimatedLoadTime: number;
  readonly actualLoadTime?: number;
  readonly errorMessages: string[];
}

export interface IEventMetadata {
  readonly eventName: string;
  readonly eventDescription: string;
  readonly estimatedDuration: number;
  readonly actualDuration?: number;
  readonly errorMessages: string[];
  readonly customData: Record<string, any>;
}

export interface IGameStatePerformance {
  readonly averageStateTransitionTime: number;
  readonly averageSceneLoadTime: number;
  readonly averageEventProcessingTime: number;
  readonly stateTransitionCount: number;
  readonly sceneLoadCount: number;
  readonly eventProcessingCount: number;
  readonly lastPerformanceUpdate: Date;
}

// ============================================================================
// TRANSITION INTERFACES
// ============================================================================

export interface ITransitionCondition {
  readonly conditionId: string;
  readonly conditionType: 'scene_state' | 'event_state' | 'system_ready' | 'time_elapsed' | 'system_check' | 'custom';
  readonly target: string;
  readonly operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'exists';
  readonly value: any;
  readonly required: boolean;
}

export interface ITransitionAction {
  readonly actionId: string;
  readonly actionType: 'scene_action' | 'event_action' | 'system_action' | 'custom_action';
  readonly target: string;
  readonly parameters: Record<string, any>;
  readonly async: boolean;
  readonly timeout?: number;
  readonly retryCount?: number;
}

// ============================================================================
// GAME FLOW EVENT INTERFACES
// ============================================================================

export interface IGameFlowEvent {
  readonly eventId: string;
  readonly eventType: GameFlowEventType;
  readonly priority: GameFlowPriority;
  readonly source: 'button_click' | 'scene_system' | 'event_system' | 'game_logic' | 'external';
  readonly target: IGameFlowTarget;
  readonly context: IGameFlowContext;
  readonly data: IGameFlowEventData;
  readonly timestamp: Date;
}

export interface IGameFlowTarget {
  readonly targetId: string;
  readonly targetType: 'scene' | 'event' | 'system' | 'game_object' | 'button';
  readonly targetName: string;
  readonly targetState?: string;
}

export interface IGameFlowContext {
  readonly gameState: IGameFlowState;
  readonly playerContext: IPlayerContext;
  readonly systemContext: IGameFlowSystemContext;
  readonly sceneContext: IGameFlowSceneContext;
  readonly eventContext: IEventContext;
}

export interface IPlayerContext {
  readonly playerId: string;
  readonly sessionId: string;
  readonly level: number;
  readonly experience: number;
  readonly gameMode: string;
  readonly difficulty: string;
}

export interface IGameFlowSystemContext {
  readonly assetSystem: string;
  readonly gameObjectSystem: string;
  readonly layoutSystem: string;
  readonly unitSystem: string;
  readonly sceneSystem: string;
  readonly gameLogicSystem: string;
}

export interface IGameFlowSceneContext {
  readonly currentScene: string;
  readonly activeScenes: string[];
  readonly sceneManager: string;
  readonly sceneState: string;
}

export interface IEventContext {
  readonly activeEvents: string[];
  readonly eventQueue: string[];
  readonly eventManager: string;
  readonly eventState: string;
}

export interface IGameFlowEventData {
  readonly buttonClickEvent?: IButtonClickEvent;
  readonly gameLogicEvent?: IGameLogicEvent;
  readonly sceneData?: ISceneEventData;
  readonly eventData?: IEventEventData;
  readonly customData?: Record<string, any>;
}

export interface ISceneEventData {
  readonly sceneId: string;
  readonly sceneType: SceneType;
  readonly sceneState: SceneState;
  readonly loadProgress: number;
  readonly errorMessages: string[];
}

export interface IEventEventData {
  readonly eventId: string;
  readonly eventType: string;
  readonly eventState: string;
  readonly progress: number;
  readonly errorMessages: string[];
}

// ============================================================================
// GAME STATE MANAGER INTERFACE
// ============================================================================

export interface IGameStateManager {
  readonly managerId: string;
  readonly isInitialized: boolean;
  readonly currentGameState: IGameFlowState;
  readonly statistics: IGameStateManagerStatistics;
  readonly config: IGameStateManagerConfig;

  // Lifecycle
  initialize(config?: Partial<IGameStateManagerConfig>): Promise<void>;
  destroy(): Promise<void>;

  // Game state management
  getCurrentState(): GameFlowState;
  getGameState(): IGameFlowState;
  updateGameState(updates: Partial<IGameFlowState>): Promise<void>;
  saveGameState(): Promise<void>;
  loadGameState(saveData: any): Promise<void>;

  // State transitions
  requestStateTransition(
    toState: GameFlowState,
    trigger: GameFlowEventType,
    priority?: GameFlowPriority,
    conditions?: ITransitionCondition[],
    actions?: ITransitionAction[]
  ): Promise<IGameStateTransition>;
  
  executeStateTransition(transitionId: string): Promise<boolean>;
  cancelStateTransition(transitionId: string): Promise<boolean>;
  getPendingTransitions(): IGameStateTransition[];

  // Scene flow management
  requestSceneCreation(sceneId: string, sceneType: SceneType, metadata?: ISceneMetadata): Promise<string>;
  requestSceneLoading(sceneId: string, dependencies?: string[]): Promise<string>;
  requestSceneActivation(sceneId: string): Promise<string>;
  requestSceneTransition(fromSceneId: string, toSceneId: string): Promise<string>;
  getActiveScenes(): IActiveScene[];

  // Event flow management
  requestEventStart(eventId: string, eventType: GameFlowEventType, priority?: GameFlowPriority): Promise<string>;
  requestEventProcessing(eventId: string, progress?: number): Promise<void>;
  requestEventCompletion(eventId: string, result?: any): Promise<void>;
  getActiveEvents(): IActiveEvent[];

  // Button click flow integration
  processButtonClickFlow(buttonEvent: IButtonClickEvent): Promise<IGameFlowEvent>;
  processGameLogicFlow(gameLogicEvent: IGameLogicEvent): Promise<IGameFlowEvent>;
  processCustomFlow(eventType: GameFlowEventType, data: any): Promise<IGameFlowEvent>;

  // Event handling
  addEventListener(eventType: GameFlowEventType, listener: IGameFlowEventListener): void;
  removeEventListener(eventType: GameFlowEventType, listenerId: string): void;
  emitEvent(event: IGameFlowEvent): Promise<void>;

  // Flow orchestration
  orchestrateGameFlow(flowDefinition: IGameFlowDefinition): Promise<IGameFlowResult>;
  executeFlowStep(stepId: string): Promise<IFlowStepResult>;
  pauseFlow(flowId: string): Promise<void>;
  resumeFlow(flowId: string): Promise<void>;
  cancelFlow(flowId: string): Promise<void>;

  // Validation and monitoring
  validateStateTransition(transition: IGameStateTransition): Promise<boolean>;
  validateGameFlow(flow: IGameFlowDefinition): Promise<boolean>;
  getPerformanceMetrics(): IGameStatePerformance;
  getErrorMetrics(): IGameStateErrorMetrics;

  // Configuration
  updateConfig(config: Partial<IGameStateManagerConfig>): void;
  getConfig(): IGameStateManagerConfig;
}

// ============================================================================
// GAME FLOW DEFINITION INTERFACES
// ============================================================================

export interface IGameFlowDefinition {
  readonly flowId: string;
  readonly flowName: string;
  readonly flowDescription: string;
  readonly steps: IGameFlowStep[];
  readonly conditions: IGameFlowCondition[];
  readonly metadata: IGameFlowMetadata;
}

export interface IGameFlowStep {
  readonly stepId: string;
  readonly stepName: string;
  readonly stepType: 'scene_action' | 'event_action' | 'state_transition' | 'wait_condition' | 'system_action' | 'custom_action';
  readonly target: string;
  readonly parameters: Record<string, any>;
  readonly dependencies: string[];
  readonly timeout?: number;
  readonly retryCount?: number;
  readonly onSuccess?: string[];
  readonly onFailure?: string[];
  readonly onTimeout?: string[];
}

export interface IGameFlowCondition {
  readonly conditionId: string;
  readonly conditionType: 'state_check' | 'scene_check' | 'event_check' | 'time_check' | 'system_check' | 'custom';
  readonly target: string;
  readonly operator: 'equals' | 'not_equals' | 'greater_than' | 'less_than' | 'contains' | 'exists';
  readonly value: any;
  readonly required: boolean;
}

export interface IGameFlowMetadata {
  readonly author: string;
  readonly version: string;
  readonly createdDate: Date;
  readonly lastModified: Date;
  readonly tags: string[];
  readonly estimatedDuration: number;
  readonly complexity: 'simple' | 'moderate' | 'complex' | 'expert';
}

export interface IGameFlowResult {
  readonly flowId: string;
  readonly success: boolean;
  readonly completedSteps: string[];
  readonly failedSteps: string[];
  readonly skippedSteps: string[];
  readonly totalDuration: number;
  readonly errorMessages: string[];
  readonly metadata: IFlowResultMetadata;
}

export interface IFlowStepResult {
  readonly stepId: string;
  readonly success: boolean;
  readonly duration: number;
  readonly errorMessage?: string;
  readonly result?: any;
  readonly nextSteps: string[];
}

export interface IFlowResultMetadata {
  readonly startTime: Date;
  readonly endTime: Date;
  readonly totalSteps: number;
  readonly successfulSteps: number;
  readonly failedSteps: number;
  readonly skippedSteps: number;
  readonly averageStepDuration: number;
  readonly performanceMetrics: Record<string, number>;
}

// ============================================================================
// SUPPORTING INTERFACES
// ============================================================================

export interface IGameFlowEventListener {
  readonly listenerId: string;
  readonly eventTypes: GameFlowEventType[];
  readonly priority: GameFlowPriority;
  readonly enabled: boolean;
  onGameFlowEvent(event: IGameFlowEvent): Promise<void>;
}

export interface IGameStateManagerStatistics {
  readonly totalStateTransitions: number;
  readonly successfulTransitions: number;
  readonly failedTransitions: number;
  readonly averageTransitionTime: number;
  readonly totalSceneLoads: number;
  readonly successfulSceneLoads: number;
  readonly failedSceneLoads: number;
  readonly averageSceneLoadTime: number;
  readonly totalEvents: number;
  readonly successfulEvents: number;
  readonly failedEvents: number;
  readonly averageEventProcessingTime: number;
  readonly lastUpdated: Date;
}

export interface IGameStateErrorMetrics {
  readonly totalErrors: number;
  readonly errorsByType: Record<string, number>;
  readonly errorsBySeverity: Record<string, number>;
  readonly recentErrors: IGameStateError[];
  readonly errorRate: number;
  readonly lastErrorTime?: Date;
}

export interface IGameStateError {
  readonly errorId: string;
  readonly errorType: string;
  readonly severity: 'low' | 'medium' | 'high' | 'critical';
  readonly message: string;
  readonly context: Record<string, any>;
  readonly timestamp: Date;
  readonly recoverable: boolean;
}

export interface IGameStateManagerConfig {
  readonly stateManagement: {
    enableAutoSave: boolean;
    saveInterval: number;
    maxStateHistory: number;
    enableStateValidation: boolean;
  };
  readonly flowManagement: {
    enableFlowOrchestration: boolean;
    maxConcurrentFlows: number;
    flowTimeout: number;
    enableFlowValidation: boolean;
  };
  readonly performance: {
    enablePerformanceTracking: boolean;
    enableOptimization: boolean;
    maxTransitionTime: number;
    maxSceneLoadTime: number;
    maxEventProcessingTime: number;
  };
  readonly monitoring: {
    enableStatistics: boolean;
    enableErrorTracking: boolean;
    enablePerformanceTracking: boolean;
    statisticsRetentionPeriod: number;
  };
}
