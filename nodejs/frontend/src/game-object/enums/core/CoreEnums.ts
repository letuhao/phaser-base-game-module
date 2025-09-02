/**
 * Core Game Object Enums
 *
 * Fundamental enums for the game object system
 */

// ============================================================================
// CORE GAME OBJECT ENUMS
// ============================================================================

/**
 * Sort order enum
 */
export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
  CUSTOM = 'custom',
}

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

  // Design Pattern Types
  FACTORY = 'factory',
  BUILDER = 'builder',
  OBSERVER = 'observer',
  STRATEGY = 'strategy',
  COMMAND = 'command',
  SINGLETON = 'singleton',
  DECORATOR = 'decorator',

  // Interactive Types
  BUTTON = 'button',
  ZONE = 'zone',
  INPUT_FIELD = 'input_field',

  // Advanced Types
  PARTICLE_EMITTER = 'particle_emitter',
  VIDEO = 'video',

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
