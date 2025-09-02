/**
 * Game Flow Definitions Interface
 * 
 * Predefined flow definitions for common game scenarios.
 * Includes the specific flow you mentioned and other common patterns.
 * 
 * Your Flow: game start → scene 1 create → scene 1 loading → scene 1 loading finish → event 1 start → event 1 processing → event 1 finish
 */

import type { 
  IGameFlowDefinition, 
  IGameFlowStep, 
  IGameFlowCondition, 
  IGameFlowMetadata
} from './IGameStateManager';
import { 
  GameFlowState,
  GameFlowEventType,
  GameFlowPriority
} from './IGameStateManager';
import { SceneType, SceneState } from '../../enums/SceneEnums';

// ============================================================================
// YOUR SPECIFIC FLOW DEFINITION
// ============================================================================

/**
 * Your Example Flow Definition
 * game start → scene 1 create → scene 1 loading → scene 1 loading finish → event 1 start → event 1 processing → event 1 finish
 */
export const GAME_START_TO_EVENT_COMPLETE_FLOW: IGameFlowDefinition = {
  flowId: 'game_start_to_event_complete',
  flowName: 'Game Start to Event Complete Flow',
  flowDescription: 'Complete flow from game start through scene creation, loading, and event processing',
  steps: [
    {
      stepId: 'game_start',
      stepName: 'Initialize Game',
      stepType: 'state_transition',
      target: 'GAME_START',
      parameters: {
        state: GameFlowState.GAME_START,
        trigger: GameFlowEventType.SYSTEM_INITIALIZE,
        priority: GameFlowPriority.CRITICAL
      },
      dependencies: [],
      timeout: 5000,
      retryCount: 3,
      onSuccess: ['scene_1_create'],
      onFailure: ['game_error'],
      onTimeout: ['game_error']
    },
    {
      stepId: 'scene_1_create',
      stepName: 'Create Scene 1',
      stepType: 'scene_action',
      target: 'scene_1',
      parameters: {
        sceneType: SceneType.GAME_SCENE,
        sceneName: 'Main Game Scene',
        requiredAssets: ['main_background', 'player_sprite', 'ui_elements'],
        requiredSystems: ['asset_system', 'game_object_system', 'layout_system']
      },
      dependencies: ['game_start'],
      timeout: 10000,
      retryCount: 2,
      onSuccess: ['scene_1_loading'],
      onFailure: ['scene_create_error'],
      onTimeout: ['scene_create_timeout']
    },
    {
      stepId: 'scene_1_loading',
      stepName: 'Load Scene 1 Assets',
      stepType: 'scene_action',
      target: 'scene_1',
      parameters: {
        action: 'load_assets',
        loadProgress: 0,
        estimatedLoadTime: 5000
      },
      dependencies: ['scene_1_create'],
      timeout: 15000,
      retryCount: 2,
      onSuccess: ['scene_1_loading_finish'],
      onFailure: ['scene_load_error'],
      onTimeout: ['scene_load_timeout']
    },
    {
      stepId: 'scene_1_loading_finish',
      stepName: 'Complete Scene 1 Loading',
      stepType: 'scene_action',
      target: 'scene_1',
      parameters: {
        action: 'complete_loading',
        loadProgress: 100,
        activateScene: true
      },
      dependencies: ['scene_1_loading'],
      timeout: 2000,
      retryCount: 1,
      onSuccess: ['event_1_start'],
      onFailure: ['scene_activation_error'],
      onTimeout: ['scene_activation_timeout']
    },
    {
      stepId: 'event_1_start',
      stepName: 'Start Event 1',
      stepType: 'event_action',
      target: 'event_1',
      parameters: {
        eventType: GameFlowEventType.EVENT_START,
        priority: GameFlowPriority.HIGH,
        eventName: 'Main Game Event',
        estimatedDuration: 10000
      },
      dependencies: ['scene_1_loading_finish'],
      timeout: 5000,
      retryCount: 2,
      onSuccess: ['event_1_processing'],
      onFailure: ['event_start_error'],
      onTimeout: ['event_start_timeout']
    },
    {
      stepId: 'event_1_processing',
      stepName: 'Process Event 1',
      stepType: 'event_action',
      target: 'event_1',
      parameters: {
        action: 'process_event',
        progress: 0,
        processingSteps: ['validate_input', 'execute_logic', 'update_ui', 'save_progress']
      },
      dependencies: ['event_1_start'],
      timeout: 30000,
      retryCount: 1,
      onSuccess: ['event_1_finish'],
      onFailure: ['event_processing_error'],
      onTimeout: ['event_processing_timeout']
    },
    {
      stepId: 'event_1_finish',
      stepName: 'Complete Event 1',
      stepType: 'event_action',
      target: 'event_1',
      parameters: {
        action: 'complete_event',
        progress: 100,
        cleanup: true,
        saveResults: true
      },
      dependencies: ['event_1_processing'],
      timeout: 5000,
      retryCount: 1,
      onSuccess: ['flow_complete'],
      onFailure: ['event_completion_error'],
      onTimeout: ['event_completion_timeout']
    }
  ],
  conditions: [
    {
      conditionId: 'game_initialized',
      conditionType: 'state_check',
      target: 'game_state',
      operator: 'equals',
      value: GameFlowState.GAME_READY,
      required: true
    },
    {
      conditionId: 'scene_1_created',
      conditionType: 'scene_check',
      target: 'scene_1',
      operator: 'equals',
      value: SceneState.INITIALIZING,
      required: true
    },
    {
      conditionId: 'scene_1_loaded',
      conditionType: 'scene_check',
      target: 'scene_1',
      operator: 'equals',
      value: SceneState.ACTIVE,
      required: true
    },
    {
      conditionId: 'event_1_started',
      conditionType: 'event_check',
      target: 'event_1',
      operator: 'equals',
      value: 'starting',
      required: true
    },
    {
      conditionId: 'event_1_processing',
      conditionType: 'event_check',
      target: 'event_1',
      operator: 'equals',
      value: 'processing',
      required: true
    },
    {
      conditionId: 'event_1_completed',
      conditionType: 'event_check',
      target: 'event_1',
      operator: 'equals',
      value: 'completed',
      required: true
    }
  ],
  metadata: {
    author: 'Game Development Team',
    version: '1.0.0',
    createdDate: new Date(),
    lastModified: new Date(),
    tags: ['game_start', 'scene_loading', 'event_processing', 'main_flow'],
    estimatedDuration: 45000, // 45 seconds
    complexity: 'moderate'
  }
};

// ============================================================================
// COMMON FLOW DEFINITIONS
// ============================================================================

/**
 * Scene Transition Flow
 * Handles smooth transitions between scenes
 */
export const SCENE_TRANSITION_FLOW: IGameFlowDefinition = {
  flowId: 'scene_transition',
  flowName: 'Scene Transition Flow',
  flowDescription: 'Handles smooth transitions between game scenes',
  steps: [
    {
      stepId: 'prepare_transition',
      stepName: 'Prepare Scene Transition',
      stepType: 'scene_action',
      target: 'current_scene',
      parameters: {
        action: 'prepare_transition',
        fadeOut: true,
        fadeDuration: 1000
      },
      dependencies: [],
      timeout: 5000,
      retryCount: 2,
      onSuccess: ['unload_current_scene'],
      onFailure: ['transition_error']
    },
    {
      stepId: 'unload_current_scene',
      stepName: 'Unload Current Scene',
      stepType: 'scene_action',
      target: 'current_scene',
      parameters: {
        action: 'unload',
        cleanup: true,
        saveState: true
      },
      dependencies: ['prepare_transition'],
      timeout: 10000,
      retryCount: 2,
      onSuccess: ['load_target_scene'],
      onFailure: ['unload_error']
    },
    {
      stepId: 'load_target_scene',
      stepName: 'Load Target Scene',
      stepType: 'scene_action',
      target: 'target_scene',
      parameters: {
        action: 'load',
        preload: true,
        activate: false
      },
      dependencies: ['unload_current_scene'],
      timeout: 15000,
      retryCount: 2,
      onSuccess: ['activate_target_scene'],
      onFailure: ['load_error']
    },
    {
      stepId: 'activate_target_scene',
      stepName: 'Activate Target Scene',
      stepType: 'scene_action',
      target: 'target_scene',
      parameters: {
        action: 'activate',
        fadeIn: true,
        fadeDuration: 1000
      },
      dependencies: ['load_target_scene'],
      timeout: 5000,
      retryCount: 1,
      onSuccess: ['transition_complete'],
      onFailure: ['activation_error']
    }
  ],
  conditions: [
    {
      conditionId: 'current_scene_ready',
      conditionType: 'scene_check',
      target: 'current_scene',
      operator: 'equals',
      value: SceneState.ACTIVE,
      required: true
    },
    {
      conditionId: 'target_scene_loaded',
      conditionType: 'scene_check',
      target: 'target_scene',
      operator: 'equals',
      value: SceneState.LOADING,
      required: true
    }
  ],
  metadata: {
    author: 'Game Development Team',
    version: '1.0.0',
    createdDate: new Date(),
    lastModified: new Date(),
    tags: ['scene_transition', 'scene_management', 'ui_flow'],
    estimatedDuration: 25000, // 25 seconds
    complexity: 'simple'
  }
};

/**
 * Button Click Processing Flow
 * Handles button click events through the game logic system
 */
export const BUTTON_CLICK_PROCESSING_FLOW: IGameFlowDefinition = {
  flowId: 'button_click_processing',
  flowName: 'Button Click Processing Flow',
  flowDescription: 'Processes button clicks through the game logic system',
  steps: [
    {
      stepId: 'receive_button_click',
      stepName: 'Receive Button Click',
      stepType: 'custom_action',
      target: 'button_click_handler',
      parameters: {
        action: 'receive_click',
        validateInput: true,
        logEvent: true
      },
      dependencies: [],
      timeout: 1000,
      retryCount: 1,
      onSuccess: ['validate_button_click'],
      onFailure: ['click_reception_error']
    },
    {
      stepId: 'validate_button_click',
      stepName: 'Validate Button Click',
      stepType: 'custom_action',
      target: 'button_click_handler',
      parameters: {
        action: 'validate_click',
        checkPermissions: true,
        checkCooldown: true
      },
      dependencies: ['receive_button_click'],
      timeout: 2000,
      retryCount: 1,
      onSuccess: ['process_game_logic'],
      onFailure: ['validation_error']
    },
    {
      stepId: 'process_game_logic',
      stepName: 'Process Game Logic',
      stepType: 'event_action',
      target: 'game_logic_handler',
      parameters: {
        action: 'process_action',
        executeRules: true,
        updateState: true
      },
      dependencies: ['validate_button_click'],
      timeout: 5000,
      retryCount: 2,
      onSuccess: ['update_game_state'],
      onFailure: ['game_logic_error']
    },
    {
      stepId: 'update_game_state',
      stepName: 'Update Game State',
      stepType: 'state_transition',
      target: 'game_state',
      parameters: {
        action: 'update_state',
        saveChanges: true,
        notifySystems: true
      },
      dependencies: ['process_game_logic'],
      timeout: 3000,
      retryCount: 1,
      onSuccess: ['provide_feedback'],
      onFailure: ['state_update_error']
    },
    {
      stepId: 'provide_feedback',
      stepName: 'Provide User Feedback',
      stepType: 'custom_action',
      target: 'feedback_system',
      parameters: {
        action: 'provide_feedback',
        visual: true,
        audio: true,
        haptic: true
      },
      dependencies: ['update_game_state'],
      timeout: 2000,
      retryCount: 1,
      onSuccess: ['click_processing_complete'],
      onFailure: ['feedback_error']
    }
  ],
  conditions: [
    {
      conditionId: 'button_click_valid',
      conditionType: 'custom',
      target: 'button_click',
      operator: 'exists',
      value: true,
      required: true
    },
    {
      conditionId: 'game_logic_ready',
      conditionType: 'system_check',
      target: 'game_logic_system',
      operator: 'equals',
      value: 'ready',
      required: true
    }
  ],
  metadata: {
    author: 'Game Development Team',
    version: '1.0.0',
    createdDate: new Date(),
    lastModified: new Date(),
    tags: ['button_click', 'game_logic', 'user_interaction', 'feedback'],
    estimatedDuration: 8000, // 8 seconds
    complexity: 'simple'
  }
};

/**
 * Game Initialization Flow
 * Handles the complete game initialization process
 */
export const GAME_INITIALIZATION_FLOW: IGameFlowDefinition = {
  flowId: 'game_initialization',
  flowName: 'Game Initialization Flow',
  flowDescription: 'Complete game initialization including all systems',
  steps: [
    {
      stepId: 'initialize_core_systems',
      stepName: 'Initialize Core Systems',
      stepType: 'system_action',
      target: 'core_systems',
      parameters: {
        systems: ['asset_system', 'game_object_system', 'layout_system', 'unit_system'],
        parallel: true,
        timeout: 10000
      },
      dependencies: [],
      timeout: 15000,
      retryCount: 3,
      onSuccess: ['initialize_scene_system'],
      onFailure: ['core_system_error']
    },
    {
      stepId: 'initialize_scene_system',
      stepName: 'Initialize Scene System',
      stepType: 'system_action',
      target: 'scene_system',
      parameters: {
        action: 'initialize',
        loadDefaultScenes: true,
        preloadAssets: true
      },
      dependencies: ['initialize_core_systems'],
      timeout: 10000,
      retryCount: 2,
      onSuccess: ['initialize_game_logic'],
      onFailure: ['scene_system_error']
    },
    {
      stepId: 'initialize_game_logic',
      stepName: 'Initialize Game Logic System',
      stepType: 'system_action',
      target: 'game_logic_system',
      parameters: {
        action: 'initialize',
        loadRules: true,
        setupEventHandlers: true
      },
      dependencies: ['initialize_scene_system'],
      timeout: 8000,
      retryCount: 2,
      onSuccess: ['initialize_game_state'],
      onFailure: ['game_logic_error']
    },
    {
      stepId: 'initialize_game_state',
      stepName: 'Initialize Game State Manager',
      stepType: 'state_transition',
      target: 'game_state_manager',
      parameters: {
        action: 'initialize',
        loadDefaultState: true,
        setupFlows: true
      },
      dependencies: ['initialize_game_logic'],
      timeout: 5000,
      retryCount: 2,
      onSuccess: ['game_ready'],
      onFailure: ['game_state_error']
    }
  ],
  conditions: [
    {
      conditionId: 'all_systems_ready',
      conditionType: 'system_check',
      target: 'all_systems',
      operator: 'equals',
      value: 'ready',
      required: true
    }
  ],
  metadata: {
    author: 'Game Development Team',
    version: '1.0.0',
    createdDate: new Date(),
    lastModified: new Date(),
    tags: ['initialization', 'system_startup', 'game_ready'],
    estimatedDuration: 30000, // 30 seconds
    complexity: 'complex'
  }
};

// ============================================================================
// FLOW DEFINITION REGISTRY
// ============================================================================

export const GAME_FLOW_DEFINITIONS = {
  GAME_START_TO_EVENT_COMPLETE: GAME_START_TO_EVENT_COMPLETE_FLOW,
  SCENE_TRANSITION: SCENE_TRANSITION_FLOW,
  BUTTON_CLICK_PROCESSING: BUTTON_CLICK_PROCESSING_FLOW,
  GAME_INITIALIZATION: GAME_INITIALIZATION_FLOW,
} as const;

export type GameFlowDefinitionId = keyof typeof GAME_FLOW_DEFINITIONS;

// ============================================================================
// FLOW BUILDER INTERFACE
// ============================================================================

export interface IGameFlowBuilder {
  createFlow(flowId: string, flowName: string, description: string): IGameFlowBuilder;
  addStep(step: IGameFlowStep): IGameFlowBuilder;
  addCondition(condition: IGameFlowCondition): IGameFlowBuilder;
  setMetadata(metadata: IGameFlowMetadata): IGameFlowBuilder;
  build(): IGameFlowDefinition;
}

export interface IGameFlowBuilderConfig {
  readonly defaultTimeout: number;
  readonly defaultRetryCount: number;
  readonly enableValidation: boolean;
  readonly enableOptimization: boolean;
}
