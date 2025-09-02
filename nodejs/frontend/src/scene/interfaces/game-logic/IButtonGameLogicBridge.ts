/**
 * Button-Game Logic Bridge Interface
 * 
 * Bridges button click events with game logic systems.
 * Translates button interactions into meaningful game actions
 * and coordinates between input handling and game mechanics.
 * 
 * Features:
 * - Button-to-action mapping
 * - Context-aware action resolution
 * - Game state validation
 * - Action execution coordination
 * - Result feedback handling
 */

import type { IButtonClickEvent } from '../button/IButtonClickEventHandler';
import type { 
  IGameLogicEvent, 
  IGameLogicResult, 
  IGameLogicHandler,
  GameLogicActionType 
} from './IGameLogicHandler';

// ============================================================================
// BUTTON-ACTION MAPPING INTERFACES
// ============================================================================

export interface IButtonActionMapping {
  readonly mappingId: string;
  readonly buttonId: string;
  readonly buttonType: string;
  readonly actionType: GameLogicActionType;
  readonly context: IActionContext;
  readonly conditions: IActionCondition[];
  readonly parameters: IActionParameters;
  readonly priority: number;
  readonly enabled: boolean;
}

export interface IActionContext {
  readonly sceneId?: string;
  readonly gameMode?: string;
  readonly playerState?: string[];
  readonly gameState?: string[];
  readonly uiContext?: string;
  readonly systemContext?: ISystemActionContext;
  readonly customContext?: Record<string, any>;
}

export interface ISystemActionContext {
  readonly assetContext?: IAssetActionContext;
  readonly gameObjectContext?: IGameObjectActionContext;
  readonly layoutContext?: ILayoutActionContext;
  readonly unitContext?: IUnitActionContext;
  readonly sceneContext?: ISceneActionContext;
}

export interface IAssetActionContext {
  readonly requiredAssets?: string[];
  readonly assetState?: string[];
  readonly assetManager?: string;
}

export interface IGameObjectActionContext {
  readonly targetGameObjects?: string[];
  readonly gameObjectType?: string;
  readonly gameObjectManager?: string;
}

export interface ILayoutActionContext {
  readonly breakpoint?: string;
  readonly theme?: string;
  readonly layoutManager?: string;
  readonly responsiveMode?: boolean;
}

export interface IUnitActionContext {
  readonly unitType?: string;
  readonly unitCalculator?: string;
  readonly unitManager?: string;
}

export interface ISceneActionContext {
  readonly targetScene?: string;
  readonly sceneState?: string;
  readonly sceneManager?: string;
}

export interface IActionCondition {
  readonly conditionId: string;
  readonly conditionType: 'player_level' | 'item_owned' | 'achievement_unlocked' | 'game_state' | 'asset_loaded' | 'gameobject_active' | 'layout_breakpoint' | 'unit_available' | 'scene_active' | 'custom';
  readonly target: string;
  readonly operator: 'equals' | 'greater_than' | 'less_than' | 'contains' | 'exists' | 'not_exists';
  readonly value: any;
  readonly required: boolean;
  readonly systemType?: 'asset' | 'gameobject' | 'layout' | 'unit' | 'scene';
}

export interface IActionParameters {
  readonly action: string;
  readonly target?: string;
  readonly value?: any;
  readonly cost?: IActionCost;
  readonly effects?: IActionEffect[];
  readonly validation?: IGameLogicActionValidation;
}

export interface IActionCost {
  readonly currency?: Record<string, number>;
  readonly items?: string[];
  readonly energy?: number;
  readonly time?: number;
  readonly cooldown?: number;
}

export interface IActionEffect {
  readonly effectId: string;
  readonly effectType: 'stat_change' | 'item_grant' | 'currency_change' | 'state_change' | 'ui_change';
  readonly target: string;
  readonly value: any;
  readonly duration?: number;
  readonly immediate: boolean;
}

export interface IGameLogicActionValidation {
  readonly enabled: boolean;
  readonly rules: IGameLogicValidationRule[];
  readonly fallbackAction?: string;
  readonly errorHandling: 'ignore' | 'warn' | 'block' | 'fallback';
}

export interface IGameLogicValidationRule {
  readonly ruleId: string;
  readonly ruleType: 'resource_check' | 'permission_check' | 'state_check' | 'custom';
  readonly enabled: boolean;
  readonly parameters: Record<string, any>;
}

// ============================================================================
// BRIDGE CONFIGURATION INTERFACES
// ============================================================================

export interface IButtonGameLogicBridgeConfig {
  readonly mappings: {
    enableAutoMapping: boolean;
    enableContextMapping: boolean;
    enableDynamicMapping: boolean;
    maxMappings: number;
  };
  readonly validation: {
    enablePreValidation: boolean;
    enablePostValidation: boolean;
    strictMode: boolean;
    allowOverrides: boolean;
  };
  readonly performance: {
    enableCaching: boolean;
    enableOptimization: boolean;
    maxConcurrentActions: number;
    actionTimeout: number;
  };
  readonly feedback: {
    enableImmediateFeedback: boolean;
    enableDelayedFeedback: boolean;
    feedbackDelay: number;
    enableVisualFeedback: boolean;
    enableAudioFeedback: boolean;
  };
  readonly monitoring: {
    enableStatistics: boolean;
    enableErrorTracking: boolean;
    enablePerformanceTracking: boolean;
    statisticsRetentionPeriod: number;
  };
}

// ============================================================================
// BRIDGE STATISTICS INTERFACES
// ============================================================================

export interface IButtonGameLogicBridgeStatistics {
  readonly totalMappings: number;
  readonly totalActions: number;
  readonly successfulActions: number;
  readonly failedActions: number;
  readonly blockedActions: number;
  readonly performance: {
    averageMappingTime: number;
    averageValidationTime: number;
    averageExecutionTime: number;
    actionsPerSecond: number;
    mappingsPerSecond: number;
  };
  readonly errors: {
    totalErrors: number;
    mappingErrors: number;
    validationErrors: number;
    executionErrors: number;
    errorsByType: Record<string, number>;
  };
  readonly lastUpdated: Date;
}

// ============================================================================
// ACTION RESOLUTION INTERFACES
// ============================================================================

export interface IActionResolution {
  readonly resolutionId: string;
  readonly buttonEvent: IButtonClickEvent;
  readonly resolvedAction: IGameLogicEvent;
  readonly mapping: IButtonActionMapping;
  readonly context: IActionContext;
  readonly confidence: number;
  readonly alternatives: IActionAlternative[];
  readonly timestamp: Date;
}

export interface IActionAlternative {
  readonly alternativeId: string;
  readonly actionType: GameLogicActionType;
  readonly confidence: number;
  readonly reason: string;
  readonly parameters: IActionParameters;
}

// ============================================================================
// BRIDGE INTERFACE
// ============================================================================

export interface IButtonGameLogicBridge {
  readonly bridgeId: string;
  readonly isInitialized: boolean;
  readonly gameLogicHandler: IGameLogicHandler;
  readonly statistics: IButtonGameLogicBridgeStatistics;
  readonly config: IButtonGameLogicBridgeConfig;
  readonly mappings: Map<string, IButtonActionMapping>;

  // Lifecycle
  initialize(config?: Partial<IButtonGameLogicBridgeConfig>): Promise<void>;
  destroy(): Promise<void>;

  // Button-to-action mapping
  registerMapping(mapping: IButtonActionMapping): void;
  unregisterMapping(mappingId: string): void;
  getMapping(mappingId: string): IButtonActionMapping | null;
  getAllMappings(): IButtonActionMapping[];
  findMappings(buttonId: string, context?: IActionContext): IButtonActionMapping[];

  // Action resolution
  resolveAction(buttonEvent: IButtonClickEvent): Promise<IActionResolution>;
  resolveActionWithContext(buttonEvent: IButtonClickEvent, context: IActionContext): Promise<IActionResolution>;
  validateAction(action: IGameLogicEvent): Promise<boolean>;
  executeAction(action: IGameLogicEvent): Promise<IGameLogicResult>;

  // Bridge processing
  processButtonClick(buttonEvent: IButtonClickEvent): Promise<IGameLogicResult>;
  processButtonClickWithFeedback(buttonEvent: IButtonClickEvent): Promise<IButtonGameLogicResult>;

  // Context management
  updateContext(contextId: string, updates: Partial<IActionContext>): void;
  getContext(contextId: string): IActionContext | null;
  createContext(baseContext: IActionContext): string;
  removeContext(contextId: string): void;

  // Dynamic mapping
  createDynamicMapping(buttonEvent: IButtonClickEvent, action: GameLogicActionType): IButtonActionMapping;
  updateMapping(mappingId: string, updates: Partial<IButtonActionMapping>): void;
  enableMapping(mappingId: string): void;
  disableMapping(mappingId: string): void;

  // Validation and rules
  validateMapping(mapping: IButtonActionMapping): Promise<boolean>;
  checkActionConditions(action: IGameLogicEvent, conditions: IActionCondition[]): Promise<boolean>;
  evaluateActionCost(action: IGameLogicEvent, cost: IActionCost): Promise<boolean>;

  // Feedback and notifications
  sendImmediateFeedback(result: IGameLogicResult): Promise<void>;
  sendDelayedFeedback(result: IGameLogicResult, delay: number): Promise<void>;
  createFeedbackNotification(result: IGameLogicResult): IFeedbackNotification;

  // Statistics and monitoring
  getStatistics(): IButtonGameLogicBridgeStatistics;
  resetStatistics(): void;
  getPerformanceMetrics(): Record<string, number>;
  getErrorMetrics(): Record<string, number>;

  // Configuration
  updateConfig(config: Partial<IButtonGameLogicBridgeConfig>): void;
  getConfig(): IButtonGameLogicBridgeConfig;

  // Utility methods
  isActionAvailable(actionType: GameLogicActionType, context: IActionContext): Promise<boolean>;
  getAvailableActions(context: IActionContext): Promise<GameLogicActionType[]>;
  getActionCost(actionType: GameLogicActionType, context: IActionContext): Promise<IActionCost | null>;
}

// ============================================================================
// RESULT INTERFACES
// ============================================================================

export interface IButtonGameLogicResult {
  readonly resultId: string;
  readonly buttonEvent: IButtonClickEvent;
  readonly gameLogicResult: IGameLogicResult;
  readonly actionResolution: IActionResolution;
  readonly feedback: IFeedbackNotification[];
  readonly success: boolean;
  readonly duration: number;
  readonly metadata: IButtonGameLogicResultMetadata;
}

export interface IFeedbackNotification {
  readonly notificationId: string;
  readonly type: 'success' | 'error' | 'warning' | 'info' | 'achievement';
  readonly title: string;
  readonly message: string;
  readonly icon?: string;
  readonly duration: number;
  readonly priority: number;
  readonly visual: IVisualFeedback;
  readonly audio: IAudioFeedback;
  readonly haptic?: IHapticFeedback;
}

export interface IVisualFeedback {
  readonly enabled: boolean;
  readonly type: 'highlight' | 'pulse' | 'shake' | 'glow' | 'fade' | 'scale';
  readonly color?: string;
  readonly duration: number;
  readonly intensity: number;
  readonly target?: string;
}

export interface IAudioFeedback {
  readonly enabled: boolean;
  readonly soundId: string;
  readonly volume: number;
  readonly pitch: number;
  readonly loop: boolean;
  readonly fadeIn: number;
  readonly fadeOut: number;
}

export interface IHapticFeedback {
  readonly enabled: boolean;
  readonly type: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';
  readonly duration: number;
  readonly intensity: number;
}

export interface IButtonGameLogicResultMetadata {
  readonly processingTime: number;
  readonly mappingTime: number;
  readonly validationTime: number;
  readonly executionTime: number;
  readonly feedbackTime: number;
  readonly totalTime: number;
  readonly timestamp: Date;
}
