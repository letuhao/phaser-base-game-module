/**
 * SizeValue Enum
 * Defines semantic behaviors for size calculations
 * These represent WHAT kind of sizing behavior you want
 */
export enum SizeValue {
  // Direct numeric values
  PIXEL = 'pixel',

  // Responsive behaviors
  FILL = 'fill', // Fill available space
  AUTO = 'auto', // Auto-size based on content
  FIT = 'fit', // Fit content while maintaining aspect ratio
  STRETCH = 'stretch', // Stretch to fill available space

  // Content-based behaviors
  CONTENT = 'content', // Size based on content dimensions
  INTRINSIC = 'intrinsic', // Intrinsic size of the object

  // Random behaviors
  RANDOM = 'random', // Random value within a range
}