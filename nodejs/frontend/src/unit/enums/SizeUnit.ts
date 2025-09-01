/**
 * SizeUnit Enum
 * Defines measurement types for size calculations
 * These represent HOW to measure the size
 */
export enum SizeUnit {
  // Direct measurement units
  PIXEL = 'pixel', // Absolute pixel values
  PERCENTAGE = 'percentage', // Percentage values

  // Parent-relative units (like CSS vh/vw but for parent)
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
}
