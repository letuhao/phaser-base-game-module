/**
 * Game Logic Interfaces Index
 * 
 * Centralized exports for all game logic system interfaces that handle
 * game mechanics, state management, and button-to-action bridging.
 */

// Core game logic interfaces
export type { IGameLogicHandler } from './IGameLogicHandler';
export type { IButtonGameLogicBridge } from './IButtonGameLogicBridge';

// Game logic handler interfaces
export type {
  IGameLogicEvent,
  IGameLogicTarget,
  IGameLogicContext,
  ISystemContext,
  IAssetContext,
  IGameObjectContext,
  ILayoutContext,
  IUnitContext,
  IGameLogicSceneContext,
  IGameLogicParameters,
  IGameLogicMetadata,
  IGameLogicResult,
  IGameLogicStatistics,
  IGameLogicHandlerConfig,
  IGameLogicEventListener,
  IGameRuleResult,
  IGameRuleViolation,
  IGameRuleWarning,
} from './IGameLogicHandler';

// Game state interfaces
export type {
  IGameState,
  IPlayerState,
  IGameSettings,
  IAccessibilitySettings,
  IGameCost,
  IGameRequirements,
  IGameEffect,
  IGameCondition,
  IGameItem,
  IPlayerStatistics,
} from './IGameLogicHandler';

// Game logic result interfaces
export type {
  IGameStateChange,
  IGameNotification,
  IGameLogicError,
  IGameLogicWarning,
  IGameLogicResultMetadata,
} from './IGameLogicHandler';

// Button-game logic bridge interfaces
export type {
  IButtonActionMapping,
  IActionContext,
  ISystemActionContext,
  IAssetActionContext,
  IGameObjectActionContext,
  ILayoutActionContext,
  IUnitActionContext,
  ISceneActionContext,
  IActionCondition,
  IActionParameters,
  IActionCost,
  IActionEffect,
  IGameLogicActionValidation,
  IGameLogicValidationRule,
  IButtonGameLogicBridgeConfig,
  IButtonGameLogicBridgeStatistics,
  IActionResolution,
  IActionAlternative,
  IButtonGameLogicResult,
  IFeedbackNotification,
  IVisualFeedback,
  IAudioFeedback,
  IHapticFeedback,
  IButtonGameLogicResultMetadata,
} from './IButtonGameLogicBridge';

// Enums
export {
  GameLogicEventType,
  GameLogicActionType,
} from './IGameLogicHandler';

// Game logic interface bundles for easy importing
export const GAME_LOGIC_INTERFACES = {
  // Core interfaces
  IGameLogicHandler: 'IGameLogicHandler',
  IButtonGameLogicBridge: 'IButtonGameLogicBridge',
} as const;

// Game logic categories for organization
export const GAME_LOGIC_CATEGORIES = {
  // Core game logic
  CORE_LOGIC: [
    'IGameLogicHandler',
  ],
  
  // Button integration
  BUTTON_INTEGRATION: [
    'IButtonGameLogicBridge',
  ],
  
  // All game logic interfaces
  ALL_GAME_LOGIC: [
    'IGameLogicHandler',
    'IButtonGameLogicBridge',
  ],
} as const;

// Game logic event types
export const GAME_LOGIC_EVENT_TYPES = {
  PLAYER_ACTION: 'player_action',
  STATE_CHANGE: 'state_change',
  ACHIEVEMENT_UNLOCKED: 'achievement_unlocked',
  PROGRESS_UPDATE: 'progress_update',
  RULE_VIOLATION: 'rule_violation',
  GAME_OVER: 'game_over',
  LEVEL_COMPLETE: 'level_complete',
  ITEM_ACQUIRED: 'item_acquired',
  CURRENCY_CHANGE: 'currency_change',
  SKILL_UPGRADE: 'skill_upgrade',
} as const;

// Game logic action types
export const GAME_LOGIC_ACTION_TYPES = {
  // Core game actions
  MOVE: 'move',
  ATTACK: 'attack',
  DEFEND: 'defend',
  USE_ITEM: 'use_item',
  INTERACT: 'interact',
  PURCHASE: 'purchase',
  SELL: 'sell',
  UPGRADE: 'upgrade',
  CRAFT: 'craft',
  NAVIGATE: 'navigate',
  SAVE: 'save',
  LOAD: 'load',
  PAUSE: 'pause',
  RESUME: 'resume',
  RESTART: 'restart',
  
  // Asset system actions
  LOAD_ASSET: 'load_asset',
  UNLOAD_ASSET: 'unload_asset',
  CACHE_ASSET: 'cache_asset',
  VALIDATE_ASSET: 'validate_asset',
  
  // Game object actions
  CREATE_GAMEOBJECT: 'create_gameobject',
  DESTROY_GAMEOBJECT: 'destroy_gameobject',
  UPDATE_GAMEOBJECT: 'update_gameobject',
  ANIMATE_GAMEOBJECT: 'animate_gameobject',
  TRANSFORM_GAMEOBJECT: 'transform_gameobject',
  
  // Layout system actions
  UPDATE_LAYOUT: 'update_layout',
  APPLY_THEME: 'apply_theme',
  CHANGE_BREAKPOINT: 'change_breakpoint',
  RESPONSIVE_UPDATE: 'responsive_update',
  
  // Unit system actions
  CALCULATE_UNIT: 'calculate_unit',
  CONVERT_UNIT: 'convert_unit',
  VALIDATE_UNIT: 'validate_unit',
  
  // Scene system actions
  TRANSITION_SCENE: 'transition_scene',
  LOAD_SCENE: 'load_scene',
  UNLOAD_SCENE: 'unload_scene',
  UPDATE_SCENE: 'update_scene',
} as const;
