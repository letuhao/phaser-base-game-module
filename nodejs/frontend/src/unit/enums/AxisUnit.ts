/**
 * AxisUnit Enum
 * Defines the axes that units can apply to
 */
export enum AxisUnit {
  /** X-axis only */
  X = 'x',

  /** Y-axis only */
  Y = 'y',

  /** Both X and Y axes */
  BOTH = 'both',

  /** Z-axis (depth) */
  Z = 'z',

  /** All three axes (X, Y, Z) */
  ALL = 'all',
}
