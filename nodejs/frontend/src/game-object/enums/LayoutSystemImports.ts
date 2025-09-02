/**
 * Layout System Imports for Game Object System
 * 
 * This file imports enums from the Layout System and re-exports them
 * for use in the Game Object System to avoid duplication.
 */

// ============================================================================
// LAYOUT SYSTEM ENUMS
// ============================================================================

export {
  LayoutType,
  Alignment,
  PositionType,
  OverflowType,
  BreakpointName,
  BreakpointCondition,
  DeviceOrientation,
  DeviceType,
  ColorName,
  FontFamily,
  FontSize,
  FontWeight,
  SpacingScale,
  AnimationDuration,
  AnimationEasing,
  AnimationProperty,
  AnimationDirection,
  ValidationSeverity,
  LogLevel,
  ThemeType,
  ThemeVariant,
  LayoutStrategy,
  ScaleStrategy,
  HorizontalAlignment,
  VerticalAlignment,
  BorderStyle,
  TextBaseline,
  TextDecoration,
  TextAlign,
  AnimationFillMode,
  AnimationPlayState,
  AnimationIterationCount,
  TransformStyle,
  BackfaceVisibility,
  PointerEvents,
  UserSelect,
  ThemeMode,
  UnitTypeSpec,
  UnitDimension,
  RoundingStrategy,
  StyleCompositionStrategy,
  LayoutChangeType,
  LayoutStateChangeType,
  LayoutStateType,
  LayoutChainHandlerType,
  PositionReference,
  SizeReference,
  Orientation,
  AlignmentSelf,
  PatternRepeat,
  GradientType,
  AnimationEventType,
  PerformanceAlertType,
  AlignmentReference,
  DisplayType,
  BackgroundSize,
  BackgroundPosition,
  BackgroundAttachment,
  BackgroundRepeat,
  BackgroundClip,
  TextTransform,
  TextOverflow,
  WhiteSpace,
  CSSUnit,
  PriorityLevel,
  ValueType,
  ExtendedValueType,
  BorderImageRepeat,
  HorizontalAlignmentValue,
  VerticalAlignmentValue,
  BorderStyleValue,
  TextDecorationValue,
  AnimationDirectionValue,
  AnimationFillModeValue,
  ShadowFilter,
  LAYOUT_SYSTEM_ENUMS
} from '../../layout/enums/LayoutEnums';

// ============================================================================
// UNIT SYSTEM ENUMS
// ============================================================================

export {
  SizeUnit,
  PositionUnit,
  ScaleUnit,
  UnitType,
  Dimension,
  AxisUnit,
  SizeValue,
  PositionValue,
  ScaleValue,
  TemplateInputType
} from '../../unit';

// ============================================================================
// CONVENIENCE RE-EXPORTS
// ============================================================================

// Re-export commonly used enums with shorter names for convenience
export {
  LayoutType as Layout,
  Alignment as Align,
  BreakpointName as Breakpoint,
  AnimationDirection as AnimDirection,
  AnimationEasing as Easing,
  ThemeType as Theme,
  // PhysicsBodyType removed - use Game Object System's PhysicsBodyType instead,
  HorizontalAlignment as HAlign,
  VerticalAlignment as VAlign,
  TextAlign as TextAlignment,
  PositionType as Position
} from '../../layout/enums/LayoutEnums';
