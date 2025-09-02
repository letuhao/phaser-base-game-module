/**
 * Shape System Enums
 *
 * Enums for shape types, curve types, and shape-specific functionality
 */

// ============================================================================
// SHAPE TYPE ENUMS
// ============================================================================

/**
 * Shape types enum
 */
export enum ShapeType {
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
  ELLIPSE = 'ellipse',
  LINE = 'line',
  POLYGON = 'polygon',
  ARC = 'arc',
  CURVE = 'curve',
  PATH = 'path',
  CUSTOM = 'custom',
}

/**
 * Curve types enum
 */
export enum CurveType {
  BEZIER = 'bezier',
  QUADRATIC = 'quadratic',
  CUBIC = 'cubic',
  SPLINE = 'spline',
  CATMULL_ROM = 'catmull-rom',
  CUSTOM = 'custom',
}

/**
 * Line cap types enum
 */
export enum LineCapType {
  BUTT = 'butt',
  ROUND = 'round',
  SQUARE = 'square',
  CUSTOM = 'custom',
}

/**
 * Line join types enum
 */
export enum LineJoinType {
  MITER = 'miter',
  ROUND = 'round',
  BEVEL = 'bevel',
  CUSTOM = 'custom',
}
