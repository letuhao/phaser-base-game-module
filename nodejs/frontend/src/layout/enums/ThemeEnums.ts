/**
 * Theme-specific enums
 * Replaces string literals with type-safe enums
 * Only includes enums that don't already exist in LayoutEnums.ts
 */

// ============================================================================
// CURSOR ENUMS (Extended from CursorStyle in LayoutEnums)
// ============================================================================

export enum CursorType {
  DEFAULT = 'default',
  POINTER = 'pointer',
  HAND = 'hand',
  TEXT = 'text',
  MOVE = 'move',
  NOT_ALLOWED = 'not-allowed',
  WAIT = 'wait',
  CROSSHAIR = 'crosshair',
  GRAB = 'grab',
  GRABBING = 'grabbing',
}

// ============================================================================
// FLEXBOX ENUMS (Not in LayoutEnums)
// ============================================================================

export enum FlexDirection {
  ROW = 'row',
  ROW_REVERSE = 'row-reverse',
  COLUMN = 'column',
  COLUMN_REVERSE = 'column-reverse',
}

export enum FlexWrap {
  NOWRAP = 'nowrap',
  WRAP = 'wrap',
  WRAP_REVERSE = 'wrap-reverse',
}

export enum JustifyContent {
  FLEX_START = 'flex-start',
  FLEX_END = 'flex-end',
  CENTER = 'center',
  SPACE_BETWEEN = 'space-between',
  SPACE_AROUND = 'space-around',
  SPACE_EVENLY = 'space-evenly',
}

export enum AlignItems {
  STRETCH = 'stretch',
  FLEX_START = 'flex-start',
  FLEX_END = 'flex-end',
  CENTER = 'center',
  BASELINE = 'baseline',
}

export enum AlignSelf {
  AUTO = 'auto',
  FLEX_START = 'flex-start',
  FLEX_END = 'flex-end',
  CENTER = 'center',
  BASELINE = 'baseline',
  STRETCH = 'stretch',
}

// ============================================================================
// VISIBILITY ENUMS (Not in LayoutEnums)
// ============================================================================

export enum VisibilityType {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
  COLLAPSE = 'collapse',
}

// ============================================================================
// FONT ENUMS (Extended from FontStyle in LayoutEnums)
// ============================================================================

export enum FontVariant {
  NORMAL = 'normal',
  SMALL_CAPS = 'small-caps',
}

// ============================================================================
// TEXT HANDLING ENUMS (Extended from existing enums in LayoutEnums)
// ============================================================================

export enum WordBreak {
  NORMAL = 'normal',
  BREAK_ALL = 'break-all',
  KEEP_ALL = 'keep-all',
  BREAK_WORD = 'break-word',
}

export enum OverflowWrap {
  NORMAL = 'normal',
  BREAK_WORD = 'break-word',
  ANYWHERE = 'anywhere',
}

// ============================================================================
// BOX MODEL ENUMS (Not in LayoutEnums)
// ============================================================================

export enum BoxSizing {
  CONTENT_BOX = 'content-box',
  BORDER_BOX = 'border-box',
}

// ============================================================================
// PERFORMANCE METRICS ENUMS (Not in LayoutEnums)
// ============================================================================

export enum MemoryUsageTrend {
  INCREASING = 'increasing',
  DECREASING = 'decreasing',
  STABLE = 'stable',
}
