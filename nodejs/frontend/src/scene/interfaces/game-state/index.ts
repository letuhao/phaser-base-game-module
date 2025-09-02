/**
 * Game State System Interfaces Index
 * 
 * Centralized exports for all game state management interfaces that handle
 * game flow orchestration, state transitions, and complex game logic coordination.
 */

// Core game state interfaces
export type { IGameStateManager } from './IGameStateManager';
export type { IGameFlowBuilder } from './IGameFlowDefinitions';

// Game state manager interfaces
export type {
  IGameFlowState,
  IGameStateTransition,
  IActiveScene,
  IActiveEvent,
  IGameStateMetadata,
  ISceneMetadata,
  IEventMetadata,
  IGameStatePerformance,
  ITransitionCondition,
  ITransitionAction,
  IGameFlowEvent,
  IGameFlowTarget,
  IGameFlowContext,
  IPlayerContext,
  IGameFlowSystemContext,
  IGameFlowSceneContext,
  IEventContext,
  IGameFlowEventData,
  ISceneEventData,
  IEventEventData,
  IGameFlowDefinition,
  IGameFlowStep,
  IGameFlowCondition,
  IGameFlowMetadata,
  IGameFlowResult,
  IFlowStepResult,
  IFlowResultMetadata,
  IGameFlowEventListener,
  IGameStateManagerStatistics,
  IGameStateErrorMetrics,
  IGameStateError,
  IGameStateManagerConfig,
} from './IGameStateManager';

// Game flow definition interfaces
export type {
  IGameFlowBuilderConfig,
} from './IGameFlowDefinitions';

// Enums
export {
  GameFlowState,
  GameFlowEventType,
  GameFlowPriority,
} from './IGameStateManager';

// Predefined flow definitions
export {
  GAME_START_TO_EVENT_COMPLETE_FLOW,
  SCENE_TRANSITION_FLOW,
  BUTTON_CLICK_PROCESSING_FLOW,
  GAME_INITIALIZATION_FLOW,
  GAME_FLOW_DEFINITIONS,
  type GameFlowDefinitionId,
} from './IGameFlowDefinitions';

// Game state interface bundles for easy importing
export const GAME_STATE_INTERFACES = {
  // Core interfaces
  IGameStateManager: 'IGameStateManager',
  IGameFlowBuilder: 'IGameFlowBuilder',
} as const;

// Game state categories for organization
export const GAME_STATE_CATEGORIES = {
  // Core game state
  CORE_STATE: [
    'IGameStateManager',
  ],
  
  // Flow management
  FLOW_MANAGEMENT: [
    'IGameFlowDefinition',
    'IGameFlowStep',
    'IGameFlowResult',
  ],
  
  // State transitions
  STATE_TRANSITIONS: [
    'IGameStateTransition',
    'ITransitionCondition',
    'ITransitionAction',
  ],
  
  // All game state interfaces
  ALL_GAME_STATE: [
    'IGameStateManager',
    'IGameFlowBuilder',
  ],
} as const;

// Game flow states
export const GAME_FLOW_STATES = {
  // Initial states
  GAME_START: 'game_start',
  GAME_INITIALIZING: 'game_initializing',
  GAME_READY: 'game_ready',
  
  // Scene management states
  SCENE_CREATING: 'scene_creating',
  SCENE_LOADING: 'scene_loading',
  SCENE_LOADING_FINISHED: 'scene_loading_finished',
  SCENE_ACTIVE: 'scene_active',
  SCENE_TRANSITIONING: 'scene_transitioning',
  
  // Event management states
  EVENT_STARTING: 'event_starting',
  EVENT_PROCESSING: 'event_processing',
  EVENT_FINISHED: 'event_finished',
  EVENT_WAITING: 'event_waiting',
  
  // Game control states
  GAME_PAUSED: 'game_paused',
  GAME_RESUMED: 'game_resumed',
  GAME_SAVING: 'game_saving',
  GAME_LOADING: 'game_loading',
  
  // Terminal states
  GAME_OVER: 'game_over',
  GAME_VICTORY: 'game_victory',
  GAME_ERROR: 'game_error',
  GAME_SHUTDOWN: 'game_shutdown',
} as const;

// Game flow event types
export const GAME_FLOW_EVENT_TYPES = {
  // Scene events
  SCENE_CREATE_REQUEST: 'scene_create_request',
  SCENE_CREATE_START: 'scene_create_start',
  SCENE_CREATE_COMPLETE: 'scene_create_complete',
  SCENE_LOAD_REQUEST: 'scene_load_request',
  SCENE_LOAD_START: 'scene_load_start',
  SCENE_LOAD_PROGRESS: 'scene_load_progress',
  SCENE_LOAD_COMPLETE: 'scene_load_complete',
  SCENE_ACTIVATE: 'scene_activate',
  SCENE_DEACTIVATE: 'scene_deactivate',
  SCENE_TRANSITION_START: 'scene_transition_start',
  SCENE_TRANSITION_COMPLETE: 'scene_transition_complete',
  
  // Game events
  EVENT_START_REQUEST: 'event_start_request',
  EVENT_START: 'event_start',
  EVENT_PROCESS: 'event_process',
  EVENT_COMPLETE: 'event_complete',
  EVENT_CANCEL: 'event_cancel',
  EVENT_ERROR: 'event_error',
  
  // Button click events
  BUTTON_CLICK_RECEIVED: 'button_click_received',
  BUTTON_CLICK_PROCESSING: 'button_click_processing',
  BUTTON_CLICK_COMPLETE: 'button_click_complete',
  
  // System events
  SYSTEM_INITIALIZE: 'system_initialize',
  SYSTEM_READY: 'system_ready',
  SYSTEM_ERROR: 'system_error',
  SYSTEM_SHUTDOWN: 'system_shutdown',
} as const;

// Game flow priorities
export const GAME_FLOW_PRIORITIES = {
  CRITICAL: 1000,
  HIGH: 800,
  NORMAL: 500,
  LOW: 200,
  BACKGROUND: 100,
} as const;
