/**
 * Game Logic Handler Interface
 * 
 * Bridges button click events with game logic systems.
 * Handles game state changes, player actions, and business logic
 * triggered by button interactions.
 * 
 * Features:
 * - Game state management
 * - Player action processing
 * - Game rule enforcement
 * - Achievement tracking
 * - Progress updates
 * - Event coordination
 */

import type { IButtonClickEvent } from '../button/IButtonClickEventHandler';
import type { IGameObject } from '../../../game-object/interfaces/IGameObject';
import type { IAsset } from '../../../asset/interfaces/IAsset';
import type { IUnit } from '../../../unit/interfaces/IUnit';
import type { ILayout } from '../../../layout/interfaces/ILayout';

// ============================================================================
// GAME LOGIC EVENT TYPES
// ============================================================================

export enum GameLogicEventType {
  PLAYER_ACTION = 'player_action',
  STATE_CHANGE = 'state_change',
  ACHIEVEMENT_UNLOCKED = 'achievement_unlocked',
  PROGRESS_UPDATE = 'progress_update',
  RULE_VIOLATION = 'rule_violation',
  GAME_OVER = 'game_over',
  LEVEL_COMPLETE = 'level_complete',
  ITEM_ACQUIRED = 'item_acquired',
  CURRENCY_CHANGE = 'currency_change',
  SKILL_UPGRADE = 'skill_upgrade',
}

export enum GameLogicActionType {
  // Core game actions
  MOVE = 'move',
  ATTACK = 'attack',
  DEFEND = 'defend',
  USE_ITEM = 'use_item',
  INTERACT = 'interact',
  PURCHASE = 'purchase',
  SELL = 'sell',
  UPGRADE = 'upgrade',
  CRAFT = 'craft',
  NAVIGATE = 'navigate',
  SAVE = 'save',
  LOAD = 'load',
  PAUSE = 'pause',
  RESUME = 'resume',
  RESTART = 'restart',
  
  // Asset system actions
  LOAD_ASSET = 'load_asset',
  UNLOAD_ASSET = 'unload_asset',
  CACHE_ASSET = 'cache_asset',
  VALIDATE_ASSET = 'validate_asset',
  
  // Game object actions
  CREATE_GAMEOBJECT = 'create_gameobject',
  DESTROY_GAMEOBJECT = 'destroy_gameobject',
  UPDATE_GAMEOBJECT = 'update_gameobject',
  ANIMATE_GAMEOBJECT = 'animate_gameobject',
  TRANSFORM_GAMEOBJECT = 'transform_gameobject',
  
  // Layout system actions
  UPDATE_LAYOUT = 'update_layout',
  APPLY_THEME = 'apply_theme',
  CHANGE_BREAKPOINT = 'change_breakpoint',
  RESPONSIVE_UPDATE = 'responsive_update',
  
  // Unit system actions
  CALCULATE_UNIT = 'calculate_unit',
  CONVERT_UNIT = 'convert_unit',
  VALIDATE_UNIT = 'validate_unit',
  
  // Scene system actions
  TRANSITION_SCENE = 'transition_scene',
  LOAD_SCENE = 'load_scene',
  UNLOAD_SCENE = 'unload_scene',
  UPDATE_SCENE = 'update_scene',
}

// ============================================================================
// GAME LOGIC EVENT DATA
// ============================================================================

export interface IGameLogicEvent {
  readonly eventId: string;
  readonly eventType: GameLogicEventType;
  readonly actionType: GameLogicActionType;
  readonly timestamp: Date;
  readonly source: IButtonClickEvent;
  readonly target: IGameLogicTarget;
  readonly context: IGameLogicContext;
  readonly parameters: IGameLogicParameters;
  readonly metadata: IGameLogicMetadata;
}

export interface IGameLogicTarget {
  readonly targetId: string;
  readonly targetType: 'game_object' | 'ui_element' | 'scene' | 'asset' | 'layout' | 'unit' | 'system';
  readonly gameObject?: IGameObject;
  readonly asset?: IAsset;
  readonly layout?: ILayout;
  readonly unit?: IUnit;
  readonly sceneId?: string;
  readonly systemId?: string;
  readonly properties: Record<string, any>;
}

export interface IGameLogicContext {
  readonly playerId: string;
  readonly sessionId: string;
  readonly levelId?: string;
  readonly gameMode: string;
  readonly difficulty: string;
  readonly gameState: IGameState;
  readonly playerState: IPlayerState;
  readonly systemContext: ISystemContext;
}

export interface ISystemContext {
  readonly assetContext: IAssetContext;
  readonly gameObjectContext: IGameObjectContext;
  readonly layoutContext: ILayoutContext;
  readonly unitContext: IUnitContext;
  readonly sceneContext: IGameLogicSceneContext;
}

export interface IAssetContext {
  readonly loadedAssets: string[];
  readonly cachedAssets: string[];
  readonly loadingAssets: string[];
  readonly failedAssets: string[];
  readonly assetManager: string;
}

export interface IGameObjectContext {
  readonly activeGameObjects: string[];
  readonly gameObjectCount: number;
  readonly sceneGameObjects: Record<string, string[]>;
  readonly gameObjectManager: string;
}

export interface ILayoutContext {
  readonly currentBreakpoint: string;
  readonly activeTheme: string;
  readonly layoutManager: string;
  readonly responsiveMode: boolean;
}

export interface IUnitContext {
  readonly activeUnits: string[];
  readonly unitCalculator: string;
  readonly unitManager: string;
}

export interface IGameLogicSceneContext {
  readonly currentScene: string;
  readonly activeScenes: string[];
  readonly sceneManager: string;
  readonly sceneState: string;
}

export interface IGameLogicParameters {
  readonly action: string;
  readonly value?: any;
  readonly cost?: IGameCost;
  readonly requirements?: IGameRequirements;
  readonly effects?: IGameEffect[];
  readonly conditions?: IGameCondition[];
}

export interface IGameLogicMetadata {
  readonly priority: number;
  readonly category: string;
  readonly tags: string[];
  readonly customData: Record<string, any>;
}

// ============================================================================
// GAME STATE INTERFACES
// ============================================================================

export interface IGameState {
  readonly gameId: string;
  readonly status: 'playing' | 'paused' | 'game_over' | 'victory' | 'loading';
  readonly level: number;
  readonly score: number;
  readonly timeElapsed: number;
  readonly timeRemaining?: number;
  readonly difficulty: string;
  readonly gameMode: string;
  readonly settings: IGameSettings;
}

export interface IPlayerState {
  readonly playerId: string;
  readonly health: number;
  readonly maxHealth: number;
  readonly experience: number;
  readonly level: number;
  readonly currency: Record<string, number>;
  readonly inventory: IGameItem[];
  readonly skills: Record<string, number>;
  readonly achievements: string[];
  readonly statistics: IPlayerStatistics;
}

export interface IGameSettings {
  readonly soundEnabled: boolean;
  readonly musicEnabled: boolean;
  readonly graphicsQuality: 'low' | 'medium' | 'high' | 'ultra';
  readonly controls: Record<string, string>;
  readonly accessibility: IAccessibilitySettings;
}

export interface IAccessibilitySettings {
  readonly colorBlindSupport: boolean;
  readonly highContrast: boolean;
  readonly largeText: boolean;
  readonly screenReader: boolean;
  readonly reducedMotion: boolean;
}

// ============================================================================
// GAME MECHANICS INTERFACES
// ============================================================================

export interface IGameCost {
  readonly currency?: Record<string, number>;
  readonly items?: IGameItem[];
  readonly experience?: number;
  readonly time?: number;
  readonly energy?: number;
}

export interface IGameRequirements {
  readonly level?: number;
  readonly items?: IGameItem[];
  readonly achievements?: string[];
  readonly skills?: Record<string, number>;
  readonly conditions?: IGameCondition[];
}

export interface IGameEffect {
  readonly effectId: string;
  readonly effectType: 'stat_change' | 'ability_unlock' | 'item_grant' | 'currency_change' | 'state_change';
  readonly target: string;
  readonly value: any;
  readonly duration?: number;
  readonly permanent: boolean;
}

export interface IGameCondition {
  readonly conditionId: string;
  readonly conditionType: 'comparison' | 'existence' | 'custom';
  readonly target: string;
  readonly operator: 'equals' | 'greater_than' | 'less_than' | 'contains' | 'exists';
  readonly value: any;
}

export interface IGameItem {
  readonly itemId: string;
  readonly name: string;
  readonly description: string;
  readonly type: 'weapon' | 'armor' | 'consumable' | 'material' | 'tool' | 'misc';
  readonly rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  readonly quantity: number;
  readonly maxStack: number;
  readonly properties: Record<string, any>;
}

export interface IPlayerStatistics {
  readonly totalPlayTime: number;
  readonly levelsCompleted: number;
  readonly enemiesDefeated: number;
  readonly itemsCollected: number;
  readonly achievementsUnlocked: number;
  readonly highScore: number;
  readonly averageScore: number;
  readonly customStats: Record<string, number>;
}

// ============================================================================
// GAME LOGIC RESULT INTERFACES
// ============================================================================

export interface IGameLogicResult {
  readonly resultId: string;
  readonly event: IGameLogicEvent;
  readonly success: boolean;
  readonly duration: number;
  readonly stateChanges: IGameStateChange[];
  readonly effects: IGameEffect[];
  readonly notifications: IGameNotification[];
  readonly errors: IGameLogicError[];
  readonly warnings: IGameLogicWarning[];
  readonly metadata: IGameLogicResultMetadata;
}

export interface IGameStateChange {
  readonly changeId: string;
  readonly changeType: 'player_state' | 'game_state' | 'inventory' | 'currency' | 'achievement';
  readonly target: string;
  readonly oldValue: any;
  readonly newValue: any;
  readonly timestamp: Date;
}

export interface IGameNotification {
  readonly notificationId: string;
  readonly type: 'info' | 'success' | 'warning' | 'error' | 'achievement';
  readonly title: string;
  readonly message: string;
  readonly icon?: string;
  readonly duration?: number;
  readonly priority: number;
}

export interface IGameLogicError {
  readonly errorId: string;
  readonly code: string;
  readonly message: string;
  readonly severity: 'low' | 'medium' | 'high' | 'critical';
  readonly recoverable: boolean;
  readonly timestamp: Date;
  readonly context: Record<string, any>;
}

export interface IGameLogicWarning {
  readonly warningId: string;
  readonly code: string;
  readonly message: string;
  readonly severity: 'low' | 'medium' | 'high';
  readonly timestamp: Date;
  readonly context: Record<string, any>;
}

export interface IGameLogicResultMetadata {
  readonly processingTime: number;
  readonly stateChangesCount: number;
  readonly effectsCount: number;
  readonly notificationsCount: number;
  readonly errorsCount: number;
  readonly warningsCount: number;
  readonly timestamp: Date;
}

// ============================================================================
// GAME LOGIC HANDLER INTERFACE
// ============================================================================

export interface IGameLogicHandler {
  readonly handlerId: string;
  readonly isInitialized: boolean;
  readonly gameState: IGameState;
  readonly playerState: IPlayerState;
  readonly statistics: IGameLogicStatistics;
  readonly config: IGameLogicHandlerConfig;

  // Lifecycle
  initialize(config?: Partial<IGameLogicHandlerConfig>): Promise<void>;
  destroy(): Promise<void>;

  // Game logic processing
  processButtonClick(clickEvent: IButtonClickEvent): Promise<IGameLogicResult>;
  processGameAction(action: IGameLogicEvent): Promise<IGameLogicResult>;
  validateGameAction(action: IGameLogicEvent): Promise<boolean>;
  executeGameAction(action: IGameLogicEvent): Promise<IGameLogicResult>;

  // State management
  getGameState(): IGameState;
  getPlayerState(): IPlayerState;
  updateGameState(changes: IGameStateChange[]): Promise<void>;
  updatePlayerState(changes: IGameStateChange[]): Promise<void>;
  saveGameState(): Promise<void>;
  loadGameState(saveData: any): Promise<void>;

  // Event handling
  addEventListener(eventType: GameLogicEventType, listener: IGameLogicEventListener): void;
  removeEventListener(eventType: GameLogicEventType, listenerId: string): void;
  emitEvent(event: IGameLogicEvent): Promise<void>;

  // Rule enforcement
  checkGameRules(action: IGameLogicEvent): Promise<IGameRuleResult>;
  enforceGameRules(action: IGameLogicEvent): Promise<IGameRuleResult>;
  getAvailableActions(context: IGameLogicContext): GameLogicActionType[];

  // Statistics and monitoring
  getStatistics(): IGameLogicStatistics;
  resetStatistics(): void;
  getPerformanceMetrics(): Record<string, number>;

  // Configuration
  updateConfig(config: Partial<IGameLogicHandlerConfig>): void;
  getConfig(): IGameLogicHandlerConfig;
}

// ============================================================================
// SUPPORTING INTERFACES
// ============================================================================

export interface IGameLogicEventListener {
  readonly listenerId: string;
  readonly eventTypes: GameLogicEventType[];
  readonly priority: number;
  readonly enabled: boolean;
  onGameLogicEvent(event: IGameLogicEvent): Promise<void>;
}

export interface IGameLogicStatistics {
  readonly totalActions: number;
  readonly successfulActions: number;
  readonly failedActions: number;
  readonly stateChanges: number;
  readonly achievementsUnlocked: number;
  readonly performance: {
    averageProcessingTime: number;
    averageValidationTime: number;
    actionsPerSecond: number;
    stateChangesPerSecond: number;
  };
  readonly errors: {
    totalErrors: number;
    errorsByType: Record<string, number>;
    errorsBySeverity: Record<string, number>;
  };
  readonly lastUpdated: Date;
}

export interface IGameLogicHandlerConfig {
  readonly gameRules: {
    enableRuleEnforcement: boolean;
    strictMode: boolean;
    allowOverrides: boolean;
    maxActionsPerSecond: number;
  };
  readonly stateManagement: {
    enableAutoSave: boolean;
    saveInterval: number;
    maxSaveSlots: number;
    enableStateValidation: boolean;
  };
  readonly performance: {
    enableOptimization: boolean;
    enableCaching: boolean;
    maxConcurrentActions: number;
    actionTimeout: number;
  };
  readonly monitoring: {
    enableStatistics: boolean;
    enableErrorTracking: boolean;
    enablePerformanceTracking: boolean;
    statisticsRetentionPeriod: number;
  };
}

export interface IGameRuleResult {
  readonly isValid: boolean;
  readonly violations: IGameRuleViolation[];
  readonly warnings: IGameRuleWarning[];
  readonly suggestions: string[];
  readonly timestamp: Date;
}

export interface IGameRuleViolation {
  readonly ruleId: string;
  readonly ruleName: string;
  readonly violationType: 'hard' | 'soft';
  readonly message: string;
  readonly severity: 'low' | 'medium' | 'high' | 'critical';
  readonly context: Record<string, any>;
}

export interface IGameRuleWarning {
  readonly ruleId: string;
  readonly ruleName: string;
  readonly warningType: 'performance' | 'balance' | 'experience';
  readonly message: string;
  readonly severity: 'low' | 'medium' | 'high';
  readonly context: Record<string, any>;
}
