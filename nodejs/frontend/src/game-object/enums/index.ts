/**
 * Game Object Enums Index
 *
 * Centralized export for all game object enums
 */

// ============================================================================
// CORE ENUMS
// ============================================================================
export {
  SortOrder,
  GameObjectType,
  GameObjectState,
  GameObjectProperty,
  ComponentType,
  ComponentState,
  ComponentPriority,
} from './core/CoreEnums';
export {
  DynamicBitmapTextAlign,
  DynamicBitmapTextBlendMode,
  DynamicBitmapTextWordWrap,
  DynamicBitmapTextAnimationMode,
  TileSpriteTileMode,
  TileSpriteBlendMode,
  BitmapTextAlign,
  BitmapTextBlendMode,
  BitmapTextWordWrap,
  GraphicsLineStyle,
  GraphicsFillStyle,
  GraphicsPathCommand,
  SpriteBlendMode,
  SpriteCropMode,
} from './core/CoreObjectEnums';

// ============================================================================
// STATE ENUMS
// ============================================================================
export {
  StateMachineType,
  StateTransitionType,
  CommonState,
  AnimationState,
  NetworkState,
} from './state/StateEnums';

// ============================================================================
// PATTERN ENUMS
// ============================================================================
export * from './patterns';

// ============================================================================
// RENDERING ENUMS
// ============================================================================
export * from './rendering';

// ============================================================================
// UI ENUMS
// ============================================================================
// Note: UI enums are exported below with selective exports to avoid conflicts

// ============================================================================
// PHYSICS ENUMS
// ============================================================================
export * from './physics';

// ============================================================================
// AUDIO ENUMS
// ============================================================================
export * from './audio';

// ============================================================================
// NETWORK ENUMS
// ============================================================================
export * from './network';

// ============================================================================
// EFFECTS ENUMS
// ============================================================================
export { EffectType, EffectQualityLevel, ParticleType } from './effects/EffectEnums';
export {
  EffectState,
  EffectPriority,
  EnvironmentalEffectType,
  WeatherCondition,
  ParticleSpawnMode,
  ParticleUpdateMode,
} from './effects/EffectStateEnums';

// ============================================================================
// PERFORMANCE ENUMS
// ============================================================================
export * from './performance';

// ============================================================================
// DEBUG ENUMS
// ============================================================================
export * from './debug';

// ============================================================================
// EVENT ENUMS
// ============================================================================
export * from './events';

// ============================================================================
// ANIMATION ENUMS
// ============================================================================
export * from './animation';

// ============================================================================
// MANAGER ENUMS
// ============================================================================
export * from './managers';

// ============================================================================
// CONTAINER ENUMS
// ============================================================================
export * from './container';

// ============================================================================
// ACCESS ENUMS
// ============================================================================
export * from './access';

// ============================================================================
// AUDIO FORMAT ENUMS
// ============================================================================
export {
  AudioFormatType,
  AudioQualityLevel,
  AudioCurveType,
  SoundCategoryType,
} from './audio/AudioFormatIndex';

// ============================================================================
// LIGHTING ENUMS
// ============================================================================
export {
  LightType,
  LightBlendMode,
  MeshType,
  MeshRenderMode,
  BlitterType,
  BlitterBlendMode,
  LightFalloffCurveType,
  LightCullFaceType,
} from './lighting/LightingEnums';

// ============================================================================
// POSITIONING ENUMS
// ============================================================================
export { LabelPositionType, AlignmentType, FloatType } from './positioning';
// PositionType is now imported from Layout System

// ============================================================================
// PHYSICS SHAPE ENUMS
// ============================================================================
export { PhysicsShapeType, CollisionShapeType } from './physics/PhysicsShapeIndex';

// ============================================================================
// EFFECT ENUMS
// ============================================================================
export * from './effects';

// ============================================================================
// MUSIC ENUMS
// ============================================================================
export {
  MusicGenre,
  MusicMood,
  MusicIntensity,
  MusicRepeatMode,
  AudioCodec,
} from './audio/MusicIndex';

// ============================================================================
// UI ENUMS
// ============================================================================
export {
  UIType,
  UIState,
  UISize,
  UIVariant,
  UILayout,
  UIPosition,
  UIAnimation,
  UIOrientation,
  UISelectionMode,
  InputType,
  InputVariant,
  ValidationState,
  ButtonShape,
  ProgressBarOrientation,
  ProgressBarFillMode,
  CheckboxState,
  RadioButtonState,
  TooltipPosition,
  TooltipTrigger,
  TabPosition,
  TabAlignment,
  ScrollViewOrientation,
  DropdownState,
  SliderOrientation,
  SliderValueChangeMode,
} from './ui';
// TextAlignment and VerticalAlignment are now imported from Layout System

// ============================================================================
// SHAPE ENUMS
// ============================================================================
export * from './shapes';

// ============================================================================
// LAYOUT SYSTEM INTEGRATION
// ============================================================================
export * from './LayoutSystemImports';

// ============================================================================
// LEGACY ENUMS (DEPRECATED - Use organized enums above)
// ============================================================================
// Note: GameObjectEnums.ts is not exported to avoid conflicts with organized enums
// Use the organized enums from the categories above instead
