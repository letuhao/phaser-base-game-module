/**
 * Game Object System Constants
 * 
 * This file contains all constants for the new game object system.
 * Organized by category for better maintainability and type safety.
 */

// ============================================================================
// CORE GAME OBJECT CONSTANTS
// ============================================================================

/**
 * Core game object types
 */
export const GAMEOBJECT_TYPES = {
  // Basic Types
  CONTAINER: 'container',
  SPRITE: 'sprite',
  TEXT: 'text',
  GRAPHICS: 'graphics',
  SHAPE: 'shape',
  
  // Interactive Types
  BUTTON: 'button',
  ZONE: 'zone',
  INPUT_FIELD: 'input_field',
  
  // Advanced Types
  PARTICLE_EMITTER: 'particle_emitter',
  VIDEO: 'video',
  RENDER_TEXTURE: 'render_texture',
  MESH: 'mesh',
  
  // Custom Types
  UI_PANEL: 'ui_panel',
  UI_LIST: 'ui_list',
  UI_SCROLL_VIEW: 'ui_scroll_view',
  UI_MODAL: 'ui_modal',
  UI_TOOLTIP: 'ui_tooltip',
} as const;

/**
 * Game object lifecycle states
 */
export const GAMEOBJECT_STATES = {
  // Creation States
  CREATING: 'creating',
  CREATED: 'created',
  
  // Active States
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  
  // Visibility States
  VISIBLE: 'visible',
  HIDDEN: 'hidden',
  
  // Interaction States
  INTERACTIVE: 'interactive',
  NON_INTERACTIVE: 'non_interactive',
  
  // Destruction States
  DESTROYING: 'destroying',
  DESTROYED: 'destroyed',
} as const;

/**
 * Game object properties
 */
export const GAMEOBJECT_PROPERTIES = {
  // Transform Properties
  POSITION: 'position',
  SCALE: 'scale',
  ROTATION: 'rotation',
  SKEW: 'skew',
  ORIGIN: 'origin',
  
  // Visual Properties
  VISIBILITY: 'visibility',
  ALPHA: 'alpha',
  TINT: 'tint',
  BLEND_MODE: 'blend_mode',
  MASK: 'mask',
  
  // Layout Properties
  SIZE: 'size',
  BOUNDS: 'bounds',
  PADDING: 'padding',
  MARGIN: 'margin',
  
  // Animation Properties
  ANIMATION: 'animation',
  ANIMATION_SPEED: 'animation_speed',
  ANIMATION_LOOP: 'animation_loop',
  
  // Physics Properties
  VELOCITY: 'velocity',
  ACCELERATION: 'acceleration',
  FORCE: 'force',
  MASS: 'mass',
  FRICTION: 'friction',
  BOUNCE: 'bounce',
  
  // Input Properties
  HIT_AREA: 'hit_area',
  DRAGGABLE: 'draggable',
  DROP_ZONE: 'drop_zone',
} as const;

// ============================================================================
// COMPONENT SYSTEM CONSTANTS
// ============================================================================

/**
 * Component types
 */
export const COMPONENT_TYPES = {
  // Core Components
  TRANSFORM: 'transform',
  RENDER: 'render',
  INPUT: 'input',
  
  // Physics Components
  PHYSICS_BODY: 'physics_body',
  COLLIDER: 'collider',
  RIGID_BODY: 'rigid_body',
  
  // Animation Components
  ANIMATOR: 'animator',
  TWEEN: 'tween',
  TIMELINE: 'timeline',
  
  // UI Components
  LAYOUT: 'layout',
  THEME: 'theme',
  RESPONSIVE: 'responsive',
  
  // Audio Components
  AUDIO_SOURCE: 'audio_source',
  AUDIO_LISTENER: 'audio_listener',
  
  // Custom Components
  HEALTH: 'health',
  INVENTORY: 'inventory',
  AI: 'ai',
  NETWORK: 'network',
} as const;

/**
 * Component lifecycle states
 */
export const COMPONENT_STATES = {
  UNINITIALIZED: 'uninitialized',
  INITIALIZING: 'initializing',
  INITIALIZED: 'initialized',
  ACTIVE: 'active',
  PAUSED: 'paused',
  DESTROYING: 'destroying',
  DESTROYED: 'destroyed',
} as const;

/**
 * Component priorities for update order
 */
export const COMPONENT_PRIORITIES = {
  // High priority (updated first)
  PHYSICS: 1000,
  INPUT: 900,
  AI: 800,
  
  // Medium priority
  ANIMATION: 500,
  TWEEN: 400,
  AUDIO: 300,
  
  // Low priority (updated last)
  RENDER: 100,
  UI: 50,
  DEBUG: 10,
} as const;

// ============================================================================
// STATE MANAGEMENT CONSTANTS
// ============================================================================

/**
 * State machine types
 */
export const STATE_MACHINE_TYPES = {
  SIMPLE: 'simple',
  HIERARCHICAL: 'hierarchical',
  PARALLEL: 'parallel',
  SUBMACHINE: 'submachine',
} as const;

/**
 * State transition types
 */
export const STATE_TRANSITION_TYPES = {
  IMMEDIATE: 'immediate',
  DELAYED: 'delayed',
  CONDITIONAL: 'conditional',
  AUTOMATIC: 'automatic',
} as const;

/**
 * Common game object states
 */
export const COMMON_STATES = {
  // Basic States
  IDLE: 'idle',
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  
  // Movement States
  MOVING: 'moving',
  STOPPED: 'stopped',
  JUMPING: 'jumping',
  FALLING: 'falling',
  
  // Interaction States
  HOVERED: 'hovered',
  PRESSED: 'pressed',
  DRAGGING: 'dragging',
  DROPPED: 'dropped',
  
  // Animation States
  PLAYING: 'playing',
  PAUSED: 'paused',
  
  // UI States
  OPENING: 'opening',
  OPEN: 'open',
  CLOSING: 'closing',
  CLOSED: 'closed',
  
  // Game States
  SPAWNING: 'spawning',
  ALIVE: 'alive',
  DYING: 'dying',
  DEAD: 'dead',
} as const;

// ============================================================================
// FACTORY SYSTEM CONSTANTS
// ============================================================================

/**
 * Factory types
 */
export const FACTORY_TYPES = {
  ABSTRACT: 'abstract',
  CONCRETE: 'concrete',
  BUILDER: 'builder',
  PROTOTYPE: 'prototype',
} as const;

/**
 * Factory creation modes
 */
export const FACTORY_MODES = {
  IMMEDIATE: 'immediate',
  DEFERRED: 'deferred',
  POOLED: 'pooled',
  SINGLETON: 'singleton',
} as const;

/**
 * Object pooling constants
 */
export const POOL_CONSTANTS = {
  DEFAULT_POOL_SIZE: 10,
  MAX_POOL_SIZE: 1000,
  MIN_POOL_SIZE: 1,
  POOL_GROWTH_FACTOR: 1.5,
  POOL_SHRINK_THRESHOLD: 0.25,
} as const;

// ============================================================================
// LAYOUT SYSTEM CONSTANTS
// ============================================================================

/**
 * Layout types
 */
export const LAYOUT_TYPES = {
  ABSOLUTE: 'absolute',
  RELATIVE: 'relative',
  FLEXBOX: 'flexbox',
  GRID: 'grid',
  STACK: 'stack',
  FLOW: 'flow',
} as const;

/**
 * Layout directions
 */
export const LAYOUT_DIRECTIONS = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
  BOTH: 'both',
} as const;

/**
 * Alignment types
 */
export const ALIGNMENT_TYPES = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
  STRETCH: 'stretch',
  SPACE_BETWEEN: 'space_between',
  SPACE_AROUND: 'space_around',
  SPACE_EVENLY: 'space_evenly',
} as const;

/**
 * Responsive breakpoints
 */
export const RESPONSIVE_BREAKPOINTS = {
  XS: 'xs',      // < 480px
  SM: 'sm',      // 480px - 768px
  MD: 'md',      // 768px - 1024px
  LG: 'lg',      // 1024px - 1440px
  XL: 'xl',      // 1440px - 1920px
  XXL: 'xxl',    // > 1920px
} as const;

// ============================================================================
// THEME SYSTEM CONSTANTS
// ============================================================================

/**
 * Theme types
 */
export const THEME_TYPES = {
  LIGHT: 'light',
  DARK: 'dark',
  HIGH_CONTRAST: 'high_contrast',
  COLORBLIND: 'colorblind',
  CUSTOM: 'custom',
} as const;

/**
 * Theme properties
 */
export const THEME_PROPERTIES = {
  // Colors
  PRIMARY_COLOR: 'primary_color',
  SECONDARY_COLOR: 'secondary_color',
  BACKGROUND_COLOR: 'background_color',
  SURFACE_COLOR: 'surface_color',
  TEXT_COLOR: 'text_color',
  ACCENT_COLOR: 'accent_color',
  
  // Typography
  FONT_FAMILY: 'font_family',
  FONT_SIZE: 'font_size',
  FONT_WEIGHT: 'font_weight',
  LINE_HEIGHT: 'line_height',
  
  // Spacing
  SPACING_UNIT: 'spacing_unit',
  BORDER_RADIUS: 'border_radius',
  BORDER_WIDTH: 'border_width',
  
  // Effects
  SHADOW: 'shadow',
  BLUR: 'blur',
  GLOW: 'glow',
} as const;

// ============================================================================
// ANIMATION SYSTEM CONSTANTS
// ============================================================================

/**
 * Animation types
 */
export const ANIMATION_TYPES = {
  SPRITE: 'sprite',
  TWEEN: 'tween',
  TIMELINE: 'timeline',
  PARTICLE: 'particle',
  MORPH: 'morph',
} as const;

/**
 * Animation directions
 */
export const ANIMATION_DIRECTIONS = {
  FORWARD: 'forward',
  REVERSE: 'reverse',
  ALTERNATE: 'alternate',
  ALTERNATE_REVERSE: 'alternate_reverse',
} as const;

/**
 * Easing functions
 */
export const EASING_FUNCTIONS = {
  LINEAR: 'linear',
  EASE_IN: 'ease_in',
  EASE_OUT: 'ease_out',
  EASE_IN_OUT: 'ease_in_out',
  EASE_IN_BACK: 'ease_in_back',
  EASE_OUT_BACK: 'ease_out_back',
  EASE_IN_ELASTIC: 'ease_in_elastic',
  EASE_OUT_ELASTIC: 'ease_out_elastic',
  BOUNCE: 'bounce',
  SPRING: 'spring',
} as const;

// ============================================================================
// INPUT SYSTEM CONSTANTS
// ============================================================================

/**
 * Input types
 */
export const INPUT_TYPES = {
  MOUSE: 'mouse',
  TOUCH: 'touch',
  KEYBOARD: 'keyboard',
  GAMEPAD: 'gamepad',
  GYROSCOPE: 'gyroscope',
  ACCELEROMETER: 'accelerometer',
} as const;

/**
 * Input events
 */
export const INPUT_EVENTS = {
  // Mouse/Touch Events
  POINTER_DOWN: 'pointer_down',
  POINTER_UP: 'pointer_up',
  POINTER_MOVE: 'pointer_move',
  POINTER_OVER: 'pointer_over',
  POINTER_OUT: 'pointer_out',
  POINTER_ENTER: 'pointer_enter',
  POINTER_LEAVE: 'pointer_leave',
  
  // Drag Events
  DRAG_START: 'drag_start',
  DRAG: 'drag',
  DRAG_END: 'drag_end',
  DROP: 'drop',
  
  // Keyboard Events
  KEY_DOWN: 'key_down',
  KEY_UP: 'key_up',
  KEY_PRESS: 'key_press',
  
  // Gamepad Events
  BUTTON_DOWN: 'button_down',
  BUTTON_UP: 'button_up',
  AXIS_MOVE: 'axis_move',
} as const;

// ============================================================================
// PHYSICS SYSTEM CONSTANTS
// ============================================================================

/**
 * Physics body types
 */
export const PHYSICS_BODY_TYPES = {
  STATIC: 'static',
  DYNAMIC: 'dynamic',
  KINEMATIC: 'kinematic',
} as const;

/**
 * Collision shapes
 */
export const COLLISION_SHAPES = {
  RECTANGLE: 'rectangle',
  CIRCLE: 'circle',
  POLYGON: 'polygon',
  EDGE: 'edge',
  CHAIN: 'chain',
} as const;

/**
 * Physics materials
 */
export const PHYSICS_MATERIALS = {
  DEFAULT: 'default',
  RUBBER: 'rubber',
  METAL: 'metal',
  WOOD: 'wood',
  GLASS: 'glass',
  ICE: 'ice',
} as const;

// ============================================================================
// AUDIO SYSTEM CONSTANTS
// ============================================================================

/**
 * Audio types
 */
export const AUDIO_TYPES = {
  SFX: 'sfx',
  MUSIC: 'music',
  VOICE: 'voice',
  AMBIENT: 'ambient',
} as const;

/**
 * Audio states
 */
export const AUDIO_STATES = {
  STOPPED: 'stopped',
  PLAYING: 'playing',
  PAUSED: 'paused',
  LOADING: 'loading',
  ERROR: 'error',
} as const;

// ============================================================================
// NETWORK SYSTEM CONSTANTS
// ============================================================================

/**
 * Network message types
 */
export const NETWORK_MESSAGE_TYPES = {
  SYNC: 'sync',
  COMMAND: 'command',
  EVENT: 'event',
  STATE: 'state',
  CHAT: 'chat',
} as const;

/**
 * Network connection states
 */
export const NETWORK_STATES = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  RECONNECTING: 'reconnecting',
  ERROR: 'error',
} as const;

// ============================================================================
// DEBUG SYSTEM CONSTANTS
// ============================================================================

/**
 * Debug levels
 */
export const DEBUG_LEVELS = {
  NONE: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  DEBUG: 4,
  VERBOSE: 5,
} as const;

/**
 * Debug categories
 */
export const DEBUG_CATEGORIES = {
  GENERAL: 'general',
  COMPONENTS: 'components',
  PHYSICS: 'physics',
  ANIMATION: 'animation',
  INPUT: 'input',
  NETWORK: 'network',
  PERFORMANCE: 'performance',
} as const;

// ============================================================================
// PERFORMANCE CONSTANTS
// ============================================================================

/**
 * Performance thresholds
 */
export const PERFORMANCE_THRESHOLDS = {
  TARGET_FPS: 60,
  MIN_FPS: 30,
  MAX_FRAME_TIME: 16.67, // 60 FPS
  MAX_UPDATE_TIME: 8.33,  // Half frame time
  MAX_RENDER_TIME: 8.33,  // Half frame time
} as const;

/**
 * Memory limits
 */
export const MEMORY_LIMITS = {
  MAX_GAMEOBJECTS: 10000,
  MAX_COMPONENTS: 50000,
  MAX_POOL_SIZE: 1000,
  MAX_CACHE_SIZE: 100,
} as const;

// ============================================================================
// EXPORT ALL CONSTANTS
// ============================================================================

export const GAMEOBJECT_SYSTEM_CONSTANTS = {
  // Core
  TYPES: GAMEOBJECT_TYPES,
  STATES: GAMEOBJECT_STATES,
  PROPERTIES: GAMEOBJECT_PROPERTIES,
  
  // Components
  COMPONENT_TYPES: COMPONENT_TYPES,
  COMPONENT_STATES: COMPONENT_STATES,
  COMPONENT_PRIORITIES: COMPONENT_PRIORITIES,
  
  // State Management
  STATE_MACHINE_TYPES: STATE_MACHINE_TYPES,
  STATE_TRANSITION_TYPES: STATE_TRANSITION_TYPES,
  COMMON_STATES: COMMON_STATES,
  
  // Factory
  FACTORY_TYPES: FACTORY_TYPES,
  FACTORY_MODES: FACTORY_MODES,
  POOL_CONSTANTS: POOL_CONSTANTS,
  
  // Layout
  LAYOUT_TYPES: LAYOUT_TYPES,
  LAYOUT_DIRECTIONS: LAYOUT_DIRECTIONS,
  ALIGNMENT_TYPES: ALIGNMENT_TYPES,
  RESPONSIVE_BREAKPOINTS: RESPONSIVE_BREAKPOINTS,
  
  // Theme
  THEME_TYPES: THEME_TYPES,
  THEME_PROPERTIES: THEME_PROPERTIES,
  
  // Animation
  ANIMATION_TYPES: ANIMATION_TYPES,
  ANIMATION_DIRECTIONS: ANIMATION_DIRECTIONS,
  EASING_FUNCTIONS: EASING_FUNCTIONS,
  
  // Input
  INPUT_TYPES: INPUT_TYPES,
  INPUT_EVENTS: INPUT_EVENTS,
  
  // Physics
  PHYSICS_BODY_TYPES: PHYSICS_BODY_TYPES,
  COLLISION_SHAPES: COLLISION_SHAPES,
  PHYSICS_MATERIALS: PHYSICS_MATERIALS,
  
  // Audio
  AUDIO_TYPES: AUDIO_TYPES,
  AUDIO_STATES: AUDIO_STATES,
  
  // Network
  NETWORK_MESSAGE_TYPES: NETWORK_MESSAGE_TYPES,
  NETWORK_STATES: NETWORK_STATES,
  
  // Debug
  DEBUG_LEVELS: DEBUG_LEVELS,
  DEBUG_CATEGORIES: DEBUG_CATEGORIES,
  
  // Performance
  PERFORMANCE_THRESHOLDS: PERFORMANCE_THRESHOLDS,
  MEMORY_LIMITS: MEMORY_LIMITS,
} as const;

// Type exports for TypeScript
export type GameObjectType = typeof GAMEOBJECT_TYPES[keyof typeof GAMEOBJECT_TYPES];
export type GameObjectState = typeof GAMEOBJECT_STATES[keyof typeof GAMEOBJECT_STATES];
export type GameObjectProperty = typeof GAMEOBJECT_PROPERTIES[keyof typeof GAMEOBJECT_PROPERTIES];
export type ComponentType = typeof COMPONENT_TYPES[keyof typeof COMPONENT_TYPES];
export type ComponentState = typeof COMPONENT_STATES[keyof typeof COMPONENT_STATES];
export type LayoutType = typeof LAYOUT_TYPES[keyof typeof LAYOUT_TYPES];
export type ThemeType = typeof THEME_TYPES[keyof typeof THEME_TYPES];
export type AnimationType = typeof ANIMATION_TYPES[keyof typeof ANIMATION_TYPES];
export type InputType = typeof INPUT_TYPES[keyof typeof INPUT_TYPES];
export type PhysicsBodyType = typeof PHYSICS_BODY_TYPES[keyof typeof PHYSICS_BODY_TYPES];
export type AudioType = typeof AUDIO_TYPES[keyof typeof AUDIO_TYPES];
export type NetworkMessageType = typeof NETWORK_MESSAGE_TYPES[keyof typeof NETWORK_MESSAGE_TYPES];
export type DebugLevel = typeof DEBUG_LEVELS[keyof typeof DEBUG_LEVELS];
