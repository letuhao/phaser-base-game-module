/**
 * Dimension Enum
 * Defines the dimensions that units can apply to
 */
export enum Dimension {
  /** Width dimension only */
  WIDTH = 'width',
  
  /** Height dimension only */
  HEIGHT = 'height',
  
  /** Both width and height dimensions */
  BOTH = 'both',
  
  /** X-axis dimension (for positioning) */
  X = 'x',
  
  /** Y-axis dimension (for positioning) */
  Y = 'y',
  
  /** Both X and Y axes (for positioning) */
  XY = 'xy',
}
