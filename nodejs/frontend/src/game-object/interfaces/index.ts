/**
 * Game Object Interfaces Index
 * 
 * Centralized export for all game object interfaces
 * 
 * This file exports both the core composed interface and all the focused interfaces
 * that follow the Interface Segregation Principle.
 */

// ============================================================================
// CORE INTERFACES
// ============================================================================

export type { IGameObject } from './IGameObject';
export type { IGameObjectComponent } from './IGameObject';
export type { IGameObjectDebugInfo } from './IGameObject';

// ============================================================================
// BASE INTERFACES (Interface Segregation Principle)
// ============================================================================

export * from './base';

// ============================================================================
// CONTAINER INTERFACES
// ============================================================================

export * from './container';

// ============================================================================
// SHAPE INTERFACES
// ============================================================================

export * from './shape';

// ============================================================================
// UI INTERFACES
// ============================================================================

export * from './ui';

// ============================================================================
// AUDIO INTERFACES
// ============================================================================

export * from './audio';

// ============================================================================
// EFFECTS INTERFACES
// ============================================================================

export * from './effects';

// ============================================================================
// CORE INTERFACES (Phase 1)
// ============================================================================

export * from './core';

// ============================================================================
// PHYSICS INTERFACES (Phase 2)
// ============================================================================

export * from './physics';

// ============================================================================
// ANIMATION INTERFACES (Phase 3)
// ============================================================================

export * from './animation';

// ============================================================================
// ADVANCED UI INTERFACES (Phase 4)
// ============================================================================

export * from './advanced-ui';

// ============================================================================
// LIGHTING INTERFACES (Phase 5)
// ============================================================================

export * from './lighting';

// ============================================================================
// PERFORMANCE INTERFACES (Phase 6)
// ============================================================================

export * from './performance';

// ============================================================================
// TYPE-SPECIFIC INTERFACES
// ============================================================================

// The old IGameObjectTypes content has been refactored into specific folders (e.g., shape, ui, etc.)
// All interfaces are now exported from their respective folders above

// ============================================================================
// INTERFACE BUNDLES
// ============================================================================

/**
 * Core game object interfaces
 */
export const CORE_GAMEOBJECT_INTERFACES = {
  IGameObject: 'IGameObject',
  IGameObjectComponent: 'IGameObjectComponent',
  IDebugInfo: 'IDebugInfo',
} as const;

/**
 * Type-specific game object interfaces
 */
export const TYPESPECIFIC_GAMEOBJECT_INTERFACES = {
  IContainer: 'IContainer',
  IShape: 'IShape',
  IRectangle: 'IRectangle',
  ICircle: 'ICircle',
  IEllipse: 'IEllipse',
  ILine: 'ILine',
  IPolygon: 'IPolygon',
  ICurve: 'ICurve',
  IUIObject: 'IUIObject',
  IButton: 'IButton',
  IText: 'IText',
  IInput: 'IInput',
  IPanel: 'IPanel',
  IList: 'IList',
  IModal: 'IModal',
  IAudioObject: 'IAudioObject',
  ISound: 'ISound',
  IMusic: 'IMusic',
  IEffect: 'IEffect',
  IParticleEffect: 'IParticleEffect',
  IEnvironmentalEffect: 'IEnvironmentalEffect',
  IEffectSystem: 'IEffectSystem',
  // Core Types (Phase 1)
  ISprite: 'ISprite',
  IGraphics: 'IGraphics',
  ITileSprite: 'ITileSprite',
  IBitmapText: 'IBitmapText',
  IDynamicBitmapText: 'IDynamicBitmapText',
  IRenderTexture: 'IRenderTexture',
  // Physics Types (Phase 2)
  IPhysicsObject: 'IPhysicsObject',
  IArcadePhysics: 'IArcadePhysics',
  IMatterPhysics: 'IMatterPhysics',
  IStaticBody: 'IStaticBody',
  IDynamicBody: 'IDynamicBody',
  // Animation Types (Phase 3)
  IAnimatedObject: 'IAnimatedObject',
  ISpriteAnimation: 'ISpriteAnimation',
  ITweenObject: 'ITweenObject',
  ITimelineObject: 'ITimelineObject',
  // Advanced UI Types (Phase 4)
  ISlider: 'ISlider',
  ICheckbox: 'ICheckbox',
  IRadioButton: 'IRadioButton',
  IDropdown: 'IDropdown',
  ITooltip: 'ITooltip',
  IProgressBar: 'IProgressBar',
  ITabContainer: 'ITabContainer',
  IScrollView: 'IScrollView',
  // Lighting Types (Phase 5)
  ILightObject: 'ILightObject',
  IPointLight: 'IPointLight',
  IDirectionalLight: 'IDirectionalLight',
  ISpotLight: 'ISpotLight',
  IMeshObject: 'IMeshObject',
  IBlitterObject: 'IBlitterObject',
  // Performance Types (Phase 6)
  IPooledObject: 'IPooledObject',
  ICachedObject: 'ICachedObject',
  IOptimizedObject: 'IOptimizedObject',
  INetworkObject: 'INetworkObject',
  ISyncObject: 'ISyncObject',
  // ... other type-specific interfaces will be added here
} as const;

/**
 * All game object interfaces
 */
export const GAMEOBJECT_INTERFACES = {
  ...CORE_GAMEOBJECT_INTERFACES,
  ...TYPESPECIFIC_GAMEOBJECT_INTERFACES,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CoreGameObjectInterface = typeof CORE_GAMEOBJECT_INTERFACES[keyof typeof CORE_GAMEOBJECT_INTERFACES];
export type TypeSpecificGameObjectInterface = typeof TYPESPECIFIC_GAMEOBJECT_INTERFACES[keyof typeof TYPESPECIFIC_GAMEOBJECT_INTERFACES];
export type GameObjectInterface = typeof GAMEOBJECT_INTERFACES[keyof typeof GAMEOBJECT_INTERFACES];
