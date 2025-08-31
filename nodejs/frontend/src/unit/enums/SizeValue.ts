/**
 * SizeValue Enum
 * Defines all possible size values for responsive sizing
 */
export enum SizeValue {
  // Direct numeric values (pixels)
  PIXEL = 'pixel',

  // Responsive keywords
  FILL = 'fill', // Fill available space
  AUTO = 'auto', // Auto-size based on content
  FIT = 'fit', // Fit content while maintaining aspect ratio
  STRETCH = 'stretch', // Stretch to fill available space

  // Parent-relative units
  PARENT_WIDTH = 'parent-width', // Percentage of parent width
  PARENT_HEIGHT = 'parent-height', // Percentage of parent height
  PARENT_MIN = 'parent-min', // Percentage of parent's smaller dimension
  PARENT_MAX = 'parent-max', // Percentage of parent's larger dimension

  // Scene-relative units
  SCENE_WIDTH = 'scene-width', // Percentage of scene width
  SCENE_HEIGHT = 'scene-height', // Percentage of scene height
  SCENE_MIN = 'scene-min', // Percentage of scene's smaller dimension
  SCENE_MAX = 'scene-max', // Percentage of scene's larger dimension

  // Viewport units
  VIEWPORT_WIDTH = 'viewport-width', // Percentage of viewport width
  VIEWPORT_HEIGHT = 'viewport-height', // Percentage of viewport height

  // Random values
  RANDOM = 'random', // Random value within a range

  // Content-based sizing
  CONTENT = 'content', // Size based on content dimensions
  INTRINSIC = 'intrinsic', // Intrinsic size of the object
}
