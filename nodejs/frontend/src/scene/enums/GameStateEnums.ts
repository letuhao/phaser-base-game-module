/**
 * Game State System Enums
 * 
 * Centralized enum definitions for game state management system.
 * Replaces string literals with type-safe enums following coding rules.
 */

// ============================================================================
// TRANSITION STATUS ENUMS
// ============================================================================

export enum TransitionStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

// ============================================================================
// EVENT STATE ENUMS
// ============================================================================

export enum EventState {
  STARTING = 'starting',
  PROCESSING = 'processing',
  COMPLETING = 'completing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

// ============================================================================
// CONDITION TYPE ENUMS
// ============================================================================

export enum ConditionType {
  SCENE_STATE = 'scene_state',
  EVENT_STATE = 'event_state',
  SYSTEM_READY = 'system_ready',
  TIME_ELAPSED = 'time_elapsed',
  SYSTEM_CHECK = 'system_check',
  CUSTOM = 'custom',
}

export enum FlowConditionType {
  STATE_CHECK = 'state_check',
  SCENE_CHECK = 'scene_check',
  EVENT_CHECK = 'event_check',
  TIME_CHECK = 'time_check',
  SYSTEM_CHECK = 'system_check',
  CUSTOM = 'custom',
}

export enum GameLogicConditionType {
  COMPARISON = 'comparison',
  EXISTENCE = 'existence',
  CUSTOM = 'custom',
}

export enum ButtonConditionType {
  PLAYER_LEVEL = 'player_level',
  ITEM_OWNED = 'item_owned',
  ACHIEVEMENT_UNLOCKED = 'achievement_unlocked',
  GAME_STATE = 'game_state',
  ASSET_LOADED = 'asset_loaded',
  GAMEOBJECT_ACTIVE = 'gameobject_active',
  LAYOUT_BREAKPOINT = 'layout_breakpoint',
  UNIT_AVAILABLE = 'unit_available',
  SCENE_ACTIVE = 'scene_active',
  CUSTOM = 'custom',
}

// ============================================================================
// OPERATOR ENUMS
// ============================================================================

export enum ComparisonOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  CONTAINS = 'contains',
  EXISTS = 'exists',
}

export enum ButtonOperator {
  EQUALS = 'equals',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  CONTAINS = 'contains',
  EXISTS = 'exists',
  NOT_EXISTS = 'not_exists',
}

// ============================================================================
// ACTION TYPE ENUMS
// ============================================================================

export enum TransitionActionType {
  SCENE_ACTION = 'scene_action',
  EVENT_ACTION = 'event_action',
  SYSTEM_ACTION = 'system_action',
  CUSTOM_ACTION = 'custom_action',
}

export enum FlowStepType {
  SCENE_ACTION = 'scene_action',
  EVENT_ACTION = 'event_action',
  STATE_TRANSITION = 'state_transition',
  WAIT_CONDITION = 'wait_condition',
  SYSTEM_ACTION = 'system_action',
  CUSTOM_ACTION = 'custom_action',
}

// ============================================================================
// SOURCE TYPE ENUMS
// ============================================================================

export enum GameFlowSource {
  BUTTON_CLICK = 'button_click',
  SCENE_SYSTEM = 'scene_system',
  EVENT_SYSTEM = 'event_system',
  GAME_LOGIC = 'game_logic',
  EXTERNAL = 'external',
}

// ============================================================================
// TARGET TYPE ENUMS
// ============================================================================

export enum GameFlowTargetType {
  SCENE = 'scene',
  EVENT = 'event',
  SYSTEM = 'system',
  GAME_OBJECT = 'game_object',
  BUTTON = 'button',
}

export enum GameLogicTargetType {
  GAME_OBJECT = 'game_object',
  UI_ELEMENT = 'ui_element',
  SCENE = 'scene',
  ASSET = 'asset',
  LAYOUT = 'layout',
  UNIT = 'unit',
  SYSTEM = 'system',
}

// ============================================================================
// GAME STATUS ENUMS
// ============================================================================

export enum GameStatus {
  PLAYING = 'playing',
  PAUSED = 'paused',
  GAME_OVER = 'game_over',
  VICTORY = 'victory',
  LOADING = 'loading',
}

// ============================================================================
// GRAPHICS QUALITY ENUMS
// ============================================================================

export enum GraphicsQuality {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  ULTRA = 'ultra',
}

// ============================================================================
// EFFECT TYPE ENUMS
// ============================================================================

export enum GameLogicEffectType {
  STAT_CHANGE = 'stat_change',
  ABILITY_UNLOCK = 'ability_unlock',
  ITEM_GRANT = 'item_grant',
  CURRENCY_CHANGE = 'currency_change',
  STATE_CHANGE = 'state_change',
}

export enum ButtonEffectType {
  STAT_CHANGE = 'stat_change',
  ITEM_GRANT = 'item_grant',
  CURRENCY_CHANGE = 'currency_change',
  STATE_CHANGE = 'state_change',
  UI_CHANGE = 'ui_change',
}

// ============================================================================
// ITEM TYPE ENUMS
// ============================================================================

export enum ItemType {
  WEAPON = 'weapon',
  ARMOR = 'armor',
  CONSUMABLE = 'consumable',
  MATERIAL = 'material',
  TOOL = 'tool',
  MISC = 'misc',
}

export enum ItemRarity {
  COMMON = 'common',
  UNCOMMON = 'uncommon',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary',
}

// ============================================================================
// STATE CHANGE TYPE ENUMS
// ============================================================================

export enum StateChangeType {
  PLAYER_STATE = 'player_state',
  GAME_STATE = 'game_state',
  INVENTORY = 'inventory',
  CURRENCY = 'currency',
  ACHIEVEMENT = 'achievement',
}

// ============================================================================
// NOTIFICATION TYPE ENUMS
// ============================================================================

export enum NotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  ACHIEVEMENT = 'achievement',
}

// ============================================================================
// SEVERITY LEVEL ENUMS
// ============================================================================

export enum SeverityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum WarningSeverityLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

// ============================================================================
// RULE TYPE ENUMS
// ============================================================================

export enum ValidationRuleType {
  RESOURCE_CHECK = 'resource_check',
  PERMISSION_CHECK = 'permission_check',
  STATE_CHECK = 'state_check',
  CUSTOM = 'custom',
}

// ============================================================================
// VIOLATION TYPE ENUMS
// ============================================================================

export enum ViolationType {
  HARD = 'hard',
  SOFT = 'soft',
}

// ============================================================================
// WARNING TYPE ENUMS
// ============================================================================

export enum WarningType {
  PERFORMANCE = 'performance',
  BALANCE = 'balance',
  EXPERIENCE = 'experience',
}

// ============================================================================
// COMPLEXITY LEVEL ENUMS
// ============================================================================

export enum ComplexityLevel {
  SIMPLE = 'simple',
  MODERATE = 'moderate',
  COMPLEX = 'complex',
  EXPERT = 'expert',
}

// ============================================================================
// ERROR HANDLING ENUMS
// ============================================================================

export enum ErrorHandling {
  IGNORE = 'ignore',
  WARN = 'warn',
  BLOCK = 'block',
  FALLBACK = 'fallback',
}

// ============================================================================
// SYSTEM TYPE ENUMS
// ============================================================================

export enum SystemType {
  ASSET = 'asset',
  GAMEOBJECT = 'gameobject',
  LAYOUT = 'layout',
  UNIT = 'unit',
  SCENE = 'scene',
}
