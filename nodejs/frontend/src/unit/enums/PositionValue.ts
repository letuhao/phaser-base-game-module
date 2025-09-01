/**
 * PositionValue Enum
 * Defines semantic behaviors for position calculations
 * These represent WHAT kind of positioning behavior you want
 */
export enum PositionValue {
  // Direct numeric values
  PIXEL = 'pixel',

  // Alignment behaviors
  CENTER = 'center', // Center alignment
  LEFT = 'left', // Left alignment
  RIGHT = 'right', // Right alignment
  TOP = 'top', // Top alignment
  BOTTOM = 'bottom', // Bottom alignment

  // CSS-like position types
  STATIC = 'static', // Static positioning
  RELATIVE = 'relative', // Relative positioning
  ABSOLUTE = 'absolute', // Absolute positioning
  FIXED = 'fixed', // Fixed positioning

  // Random behaviors
  RANDOM = 'random', // Random value within a range

  // Content-based positioning
  CONTENT_LEFT = 'content-left', // Position based on content left edge
  CONTENT_RIGHT = 'content-right', // Position based on content right edge
  CONTENT_TOP = 'content-top', // Position based on content top edge
  CONTENT_BOTTOM = 'content-bottom', // Position based on content bottom edge
}