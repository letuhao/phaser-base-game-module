/**
 * Positioning System Enums
 * 
 * Enums for positioning, alignment, and layout positioning functionality
 */

// ============================================================================
// POSITIONING ENUMS
// ============================================================================

/**
 * Label position types enum
 */
export enum LabelPositionType {
  LEFT = 'left',
  RIGHT = 'right',
  TOP = 'top',
  BOTTOM = 'bottom',
  CENTER = 'center',
  CUSTOM = 'custom',
}

/**
 * Alignment types enum
 */
export enum AlignmentType {
  START = 'start',
  END = 'end',
  CENTER = 'center',
  STRETCH = 'stretch',
  BASELINE = 'baseline',
  CUSTOM = 'custom',
}

// PositionType is now imported from Layout System
// to avoid duplication and ensure consistency across the application

/**
 * Float types enum
 */
export enum FloatType {
  NONE = 'none',
  LEFT = 'left',
  RIGHT = 'right',
  CUSTOM = 'custom',
}
