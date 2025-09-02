/**
 * Scene System Enums Index
 *
 * Centralized exports for all scene system enums.
 * Provides a single import point for scene-related enums.
 */

// ============================================================================
// MAIN SCENE ENUMS
// ============================================================================

export {
  // Scene Core Enums
  SceneType,
  SceneState,

  // Scene Element Enums
  SceneElementType,
  SceneElementState,

  // Scene Event Enums
  SceneEventType,
  SceneEventPriority,

  // Scene Builder Enums
  SceneBuilderType,
  SceneBuilderState,

  // Scene Transition Enums
  SceneTransitionType,
  SceneTransitionState,

  // Scene Operation Enums
  ElementManagerOperation,
  SceneFactoryOperation,
  SceneValidationStrategyOperation,
  ScenePerformanceMonitorOperation,
  SceneElementFactoryOperation,
  ConfigManagerOperation,
  ErrorHandlingStrategy,
  BuilderManagerOperation,

  // Scene Configuration Enums
  GradientType,
  AssetType,
  TransitionType,
  TransitionDirection,
  ExportFormat,
  SceneLogLevel,
} from './SceneEnums';

// ============================================================================
// CONVENIENCE RE-EXPORTS
// ============================================================================

// Re-export commonly used enums with shorter names
export {
  SceneType as Type,
  SceneState as State,
  SceneElementType as ElementType,
  SceneElementState as ElementState,
  SceneEventType as EventType,
  SceneEventPriority as EventPriority,
  SceneBuilderType as BuilderType,
  SceneBuilderState as BuilderState,
  SceneTransitionType as TransType,
  SceneTransitionState as TransState,
  ValidationTargetType,
  TransitionDirection as TransDirection,
  ExportFormat as Format,
  SceneLogLevel as LogLevel,
  ErrorHandlingStrategy as ErrorStrategy,
} from './SceneEnums';

// ============================================================================
// BUTTON CLICK ENUMS
// ============================================================================

export {
  ButtonClickEventType,
  ButtonClickSource,
  ClickValidationResult,
  ClickPriority,
  ButtonClickActionType,
  ButtonClickActionStatus,
} from './ButtonClickEnums';

// ============================================================================
// RESPONSIVE ENUMS
// ============================================================================

export { ResponsiveSystem, ResponsiveEventType, UpdatePriority } from './ResponsiveEnums';

// ============================================================================
// VALIDATION ENUMS
// ============================================================================

export { ValidationResultType, ValidationRuleType } from './ValidationEnums';

// ============================================================================
// ERROR ENUMS
// ============================================================================

export { SceneErrorType, SceneErrorSeverity } from './ErrorEnums';

// ============================================================================
// CONTEXT ENUMS
// ============================================================================

export { SceneContextType, SceneContextState, BuilderContextOperation } from './ContextEnums';

// ============================================================================
// STRATEGY ENUMS
// ============================================================================

export { SceneBuildingStrategyOperation } from './StrategyEnums';

// ============================================================================
// EXECUTION ENUMS
// ============================================================================

export { ExecutionType, FlowType, TargetType, RuleType, SeverityLevel } from './ExecutionEnums';
