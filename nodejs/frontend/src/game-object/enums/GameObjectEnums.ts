/**
 * Game Object System Enums
 * 
 * This file contains all enums for the new game object system.
 * These enums provide type safety and better IntelliSense support.
 */

// ============================================================================
// CORE GAME OBJECT ENUMS
// ============================================================================

/**
 * Game object types enum
 */
export enum GameObjectType {
  // Basic Types
  CONTAINER = 'container',
  SPRITE = 'sprite',
  TEXT = 'text',
  GRAPHICS = 'graphics',
  SHAPE = 'shape',
  
  // Core Types (Phase 1)
  TILE_SPRITE = 'tileSprite',
  BITMAP_TEXT = 'bitmapText',
  DYNAMIC_BITMAP_TEXT = 'dynamicBitmapText',
  RENDER_TEXTURE = 'renderTexture',
  
  // Physics Types (Phase 2)
  PHYSICS = 'physics',
  ARCADE_PHYSICS = 'arcadePhysics',
  MATTER_PHYSICS = 'matterPhysics',
  STATIC_BODY = 'staticBody',
  DYNAMIC_BODY = 'dynamicBody',
  
  // Animation Types (Phase 3)
  ANIMATED = 'animated',
  SPRITE_ANIMATION = 'spriteAnimation',
  TWEEN_OBJECT = 'tweenObject',
  TIMELINE_OBJECT = 'timelineObject',
  
  // Advanced UI Types (Phase 4)
  SLIDER = 'slider',
  CHECKBOX = 'checkbox',
  RADIO_BUTTON = 'radioButton',
  DROPDOWN = 'dropdown',
  TOOLTIP = 'tooltip',
  PROGRESS_BAR = 'progressBar',
  TAB_CONTAINER = 'tabContainer',
  SCROLL_VIEW = 'scrollView',
  
  // Lighting Types (Phase 5)
  LIGHT = 'light',
  POINT_LIGHT = 'pointLight',
  DIRECTIONAL_LIGHT = 'directionalLight',
  SPOT_LIGHT = 'spotLight',
  MESH = 'mesh',
  BLITTER = 'blitter',
  
  // Performance Types (Phase 6)
  POOLED_OBJECT = 'pooledObject',
  CACHED_OBJECT = 'cachedObject',
  OPTIMIZED_OBJECT = 'optimizedObject',
  NETWORK_OBJECT = 'networkObject',
  SYNC_OBJECT = 'syncObject',
  
  // Interactive Types
  BUTTON = 'button',
  ZONE = 'zone',
  INPUT_FIELD = 'input_field',
  
  // Advanced Types
  PARTICLE_EMITTER = 'particle_emitter',
  VIDEO = 'video',
  MESH = 'mesh',
  
  // Custom Types
  UI_PANEL = 'ui_panel',
  UI_LIST = 'ui_list',
  UI_SCROLL_VIEW = 'ui_scroll_view',
  UI_MODAL = 'ui_modal',
  UI_TOOLTIP = 'ui_tooltip',
}

/**
 * Game object lifecycle states enum
 */
export enum GameObjectState {
  // Creation States
  CREATING = 'creating',
  CREATED = 'created',
  
  // Active States
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  
  // Visibility States
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
  
  // Interaction States
  INTERACTIVE = 'interactive',
  NON_INTERACTIVE = 'non_interactive',
  
  // Destruction States
  DESTROYING = 'destroying',
  DESTROYED = 'destroyed',
}

/**
 * Game object properties enum
 */
export enum GameObjectProperty {
  // Transform Properties
  POSITION = 'position',
  SCALE = 'scale',
  ROTATION = 'rotation',
  SKEW = 'skew',
  ORIGIN = 'origin',
  
  // Visual Properties
  VISIBILITY = 'visibility',
  ALPHA = 'alpha',
  TINT = 'tint',
  BLEND_MODE = 'blend_mode',
  MASK = 'mask',
  
  // Layout Properties
  SIZE = 'size',
  BOUNDS = 'bounds',
  PADDING = 'padding',
  MARGIN = 'margin',
  
  // Animation Properties
  ANIMATION = 'animation',
  ANIMATION_SPEED = 'animation_speed',
  ANIMATION_LOOP = 'animation_loop',
  
  // Physics Properties
  VELOCITY = 'velocity',
  ACCELERATION = 'acceleration',
  FORCE = 'force',
  MASS = 'mass',
  FRICTION = 'friction',
  BOUNCE = 'bounce',
  
  // Input Properties
  HIT_AREA = 'hit_area',
  DRAGGABLE = 'draggable',
  DROP_ZONE = 'drop_zone',
}

// ============================================================================
// COMPONENT SYSTEM ENUMS
// ============================================================================

/**
 * Component types enum
 */
export enum ComponentType {
  // Core Components
  TRANSFORM = 'transform',
  RENDER = 'render',
  INPUT = 'input',
  
  // Physics Components
  PHYSICS_BODY = 'physics_body',
  COLLIDER = 'collider',
  RIGID_BODY = 'rigid_body',
  
  // Animation Components
  ANIMATOR = 'animator',
  TWEEN = 'tween',
  TIMELINE = 'timeline',
  
  // UI Components
  LAYOUT = 'layout',
  THEME = 'theme',
  RESPONSIVE = 'responsive',
  
  // Audio Components
  AUDIO_SOURCE = 'audio_source',
  AUDIO_LISTENER = 'audio_listener',
  
  // Custom Components
  HEALTH = 'health',
  INVENTORY = 'inventory',
  AI = 'ai',
  NETWORK = 'network',
}

/**
 * Component lifecycle states enum
 */
export enum ComponentState {
  UNINITIALIZED = 'uninitialized',
  INITIALIZING = 'initializing',
  INITIALIZED = 'initialized',
  ACTIVE = 'active',
  PAUSED = 'paused',
  DESTROYING = 'destroying',
  DESTROYED = 'destroyed',
}

/**
 * Component priorities enum
 */
export enum ComponentPriority {
  // High priority (updated first)
  PHYSICS = 1000,
  INPUT = 900,
  AI = 800,
  
  // Medium priority
  ANIMATION = 500,
  TWEEN = 400,
  AUDIO = 300,
  
  // Low priority (updated last)
  RENDER = 100,
  UI = 50,
  DEBUG = 10,
}

// ============================================================================
// STATE MANAGEMENT ENUMS
// ============================================================================

/**
 * State machine types enum
 */
export enum StateMachineType {
  SIMPLE = 'simple',
  HIERARCHICAL = 'hierarchical',
  PARALLEL = 'parallel',
  SUBMACHINE = 'submachine',
}

/**
 * State transition types enum
 */
export enum StateTransitionType {
  IMMEDIATE = 'immediate',
  DELAYED = 'delayed',
  CONDITIONAL = 'conditional',
  AUTOMATIC = 'automatic',
}

/**
 * Common game object states enum
 */
export enum CommonState {
  // Basic States
  IDLE = 'idle',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  
  // Movement States
  MOVING = 'moving',
  STOPPED = 'stopped',
  JUMPING = 'jumping',
  FALLING = 'falling',
  
  // Interaction States
  HOVERED = 'hovered',
  PRESSED = 'pressed',
  DRAGGING = 'dragging',
  DROPPED = 'dropped',
  
  // Animation States
  PLAYING = 'playing',
  PAUSED = 'paused',
  
  // UI States
  OPENING = 'opening',
  OPEN = 'open',
  CLOSING = 'closing',
  CLOSED = 'closed',
  
  // Game States
  SPAWNING = 'spawning',
  ALIVE = 'alive',
  DYING = 'dying',
  DEAD = 'dead',
}

// ============================================================================
// FACTORY SYSTEM ENUMS
// ============================================================================

/**
 * Factory types enum
 */
export enum FactoryType {
  ABSTRACT = 'abstract',
  CONCRETE = 'concrete',
  BUILDER = 'builder',
  PROTOTYPE = 'prototype',
}

/**
 * Factory creation modes enum
 */
export enum FactoryMode {
  IMMEDIATE = 'immediate',
  DEFERRED = 'deferred',
  POOLED = 'pooled',
  SINGLETON = 'singleton',
}

// ============================================================================
// LAYOUT SYSTEM ENUMS
// ============================================================================

/**
 * Layout types enum
 */
export enum LayoutType {
  ABSOLUTE = 'absolute',
  RELATIVE = 'relative',
  FLEXBOX = 'flexbox',
  GRID = 'grid',
  STACK = 'stack',
  FLOW = 'flow',
}

/**
 * Layout directions enum
 */
export enum LayoutDirection {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  BOTH = 'both',
}

/**
 * Alignment types enum
 */
export enum AlignmentType {
  START = 'start',
  CENTER = 'center',
  END = 'end',
  STRETCH = 'stretch',
  SPACE_BETWEEN = 'space_between',
  SPACE_AROUND = 'space_around',
  SPACE_EVENLY = 'space_evenly',
}

/**
 * Responsive breakpoints enum
 */
export enum ResponsiveBreakpoint {
  XS = 'xs',      // < 480px
  SM = 'sm',      // 480px - 768px
  MD = 'md',      // 768px - 1024px
  LG = 'lg',      // 1024px - 1440px
  XL = 'xl',      // 1440px - 1920px
  XXL = 'xxl',    // > 1920px
}

// ============================================================================
// THEME SYSTEM ENUMS
// ============================================================================

/**
 * Theme types enum
 */
export enum ThemeType {
  LIGHT = 'light',
  DARK = 'dark',
  HIGH_CONTRAST = 'high_contrast',
  COLORBLIND = 'colorblind',
  CUSTOM = 'custom',
}

/**
 * Theme properties enum
 */
export enum ThemeProperty {
  // Colors
  PRIMARY_COLOR = 'primary_color',
  SECONDARY_COLOR = 'secondary_color',
  BACKGROUND_COLOR = 'background_color',
  SURFACE_COLOR = 'surface_color',
  TEXT_COLOR = 'text_color',
  ACCENT_COLOR = 'accent_color',
  
  // Typography
  FONT_FAMILY = 'font_family',
  FONT_SIZE = 'font_size',
  FONT_WEIGHT = 'font_weight',
  LINE_HEIGHT = 'line_height',
  
  // Spacing
  SPACING_UNIT = 'spacing_unit',
  BORDER_RADIUS = 'border_radius',
  BORDER_WIDTH = 'border_width',
  
  // Effects
  SHADOW = 'shadow',
  BLUR = 'blur',
  GLOW = 'glow',
}

// ============================================================================
// ANIMATION SYSTEM ENUMS
// ============================================================================

/**
 * Animation types enum
 */
export enum AnimationType {
  SPRITE = 'sprite',
  TWEEN = 'tween',
  TIMELINE = 'timeline',
  PARTICLE = 'particle',
  MORPH = 'morph',
}

/**
 * Animation directions enum
 */
export enum AnimationDirection {
  FORWARD = 'forward',
  REVERSE = 'reverse',
  ALTERNATE = 'alternate',
  ALTERNATE_REVERSE = 'alternate_reverse',
}

/**
 * Easing functions enum
 */
export enum EasingFunction {
  LINEAR = 'linear',
  EASE_IN = 'ease_in',
  EASE_OUT = 'ease_out',
  EASE_IN_OUT = 'ease_in_out',
  EASE_IN_BACK = 'ease_in_back',
  EASE_OUT_BACK = 'ease_out_back',
  EASE_IN_ELASTIC = 'ease_in_elastic',
  EASE_OUT_ELASTIC = 'ease_out_elastic',
  BOUNCE = 'bounce',
  SPRING = 'spring',
}

// ============================================================================
// INPUT SYSTEM ENUMS
// ============================================================================

/**
 * Input types enum
 */
export enum InputType {
  MOUSE = 'mouse',
  TOUCH = 'touch',
  KEYBOARD = 'keyboard',
  GAMEPAD = 'gamepad',
  GYROSCOPE = 'gyroscope',
  ACCELEROMETER = 'accelerometer',
}

/**
 * Input events enum
 */
export enum InputEvent {
  // Mouse/Touch Events
  POINTER_DOWN = 'pointer_down',
  POINTER_UP = 'pointer_up',
  POINTER_MOVE = 'pointer_move',
  POINTER_OVER = 'pointer_over',
  POINTER_OUT = 'pointer_out',
  POINTER_ENTER = 'pointer_enter',
  POINTER_LEAVE = 'pointer_leave',
  
  // Drag Events
  DRAG_START = 'drag_start',
  DRAG = 'drag',
  DRAG_END = 'drag_end',
  DROP = 'drop',
  
  // Keyboard Events
  KEY_DOWN = 'key_down',
  KEY_UP = 'key_up',
  KEY_PRESS = 'key_press',
  
  // Gamepad Events
  BUTTON_DOWN = 'button_down',
  BUTTON_UP = 'button_up',
  AXIS_MOVE = 'axis_move',
}

// ============================================================================
// PHYSICS SYSTEM ENUMS
// ============================================================================

/**
 * Physics body types enum
 */
export enum PhysicsBodyType {
  STATIC = 'static',
  DYNAMIC = 'dynamic',
  KINEMATIC = 'kinematic',
}

/**
 * Collision shapes enum
 */
export enum CollisionShape {
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
  POLYGON = 'polygon',
  EDGE = 'edge',
  CHAIN = 'chain',
}

/**
 * Physics materials enum
 */
export enum PhysicsMaterial {
  DEFAULT = 'default',
  RUBBER = 'rubber',
  METAL = 'metal',
  WOOD = 'wood',
  GLASS = 'glass',
  ICE = 'ice',
}

// ============================================================================
// AUDIO SYSTEM ENUMS
// ============================================================================

/**
 * Audio types enum
 */
export enum AudioType {
  SFX = 'sfx',
  MUSIC = 'music',
  VOICE = 'voice',
  AMBIENT = 'ambient',
}

/**
 * Audio states enum
 */
export enum AudioState {
  STOPPED = 'stopped',
  PLAYING = 'playing',
  PAUSED = 'paused',
  LOADING = 'loading',
  ERROR = 'error',
}

// ============================================================================
// NETWORK SYSTEM ENUMS
// ============================================================================

/**
 * Network message types enum
 */
export enum NetworkMessageType {
  SYNC = 'sync',
  COMMAND = 'command',
  EVENT = 'event',
  STATE = 'state',
  CHAT = 'chat',
}

/**
 * Network connection states enum
 */
export enum NetworkState {
  DISCONNECTED = 'disconnected',
  CONNECTING = 'connecting',
  CONNECTED = 'connected',
  RECONNECTING = 'reconnecting',
  ERROR = 'error',
}

// ============================================================================
// DEBUG SYSTEM ENUMS
// ============================================================================

/**
 * Debug levels enum
 */
export enum DebugLevel {
  NONE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
  VERBOSE = 5,
}

/**
 * Debug categories enum
 */
export enum DebugCategory {
  GENERAL = 'general',
  COMPONENTS = 'components',
  PHYSICS = 'physics',
  ANIMATION = 'animation',
  INPUT = 'input',
  NETWORK = 'network',
  PERFORMANCE = 'performance',
}

// ============================================================================
// PERFORMANCE ENUMS
// ============================================================================

/**
 * Performance metrics enum
 */
export enum PerformanceMetric {
  FPS = 'fps',
  FRAME_TIME = 'frame_time',
  UPDATE_TIME = 'update_time',
  RENDER_TIME = 'render_time',
  MEMORY_USAGE = 'memory_usage',
  OBJECT_COUNT = 'object_count',
  COMPONENT_COUNT = 'component_count',
}

/**
 * Performance thresholds enum
 */
export enum PerformanceThreshold {
  TARGET_FPS = 60,
  MIN_FPS = 30,
  MAX_FRAME_TIME = 16.67, // 60 FPS
  MAX_UPDATE_TIME = 8.33,  // Half frame time
  MAX_RENDER_TIME = 8.33,  // Half frame time
}

// ============================================================================
// EXPORT ALL ENUMS
// ============================================================================

export const GAMEOBJECT_SYSTEM_ENUMS = {
  // Core
  GameObjectType,
  GameObjectState,
  GameObjectProperty,
  
  // Components
  ComponentType,
  ComponentState,
  ComponentPriority,
  
  // State Management
  StateMachineType,
  StateTransitionType,
  CommonState,
  
  // Factory
  FactoryType,
  FactoryMode,
  
  // Layout
  LayoutType,
  LayoutDirection,
  AlignmentType,
  ResponsiveBreakpoint,
  
  // Theme
  ThemeType,
  ThemeProperty,
  
  // Animation
  AnimationType,
  AnimationDirection,
  EasingFunction,
  
  // Input
  InputType,
  InputEvent,
  
  // Physics
  PhysicsBodyType,
  CollisionShape,
  PhysicsMaterial,
  
  // Audio
  AudioType,
  AudioState,
  
  // Network
  NetworkMessageType,
  NetworkState,
  
  // Debug
  DebugLevel,
  DebugCategory,
  
  // Performance
  PerformanceMetric,
  PerformanceThreshold,
} as const;
