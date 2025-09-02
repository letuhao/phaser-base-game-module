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
  ValidationTargetType,
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
  ValidationTargetType as TargetType,
  TransitionDirection as TransDirection,
  ExportFormat as Format,
  SceneLogLevel as LogLevel,
  ErrorHandlingStrategy as ErrorStrategy,
} from './SceneEnums';
