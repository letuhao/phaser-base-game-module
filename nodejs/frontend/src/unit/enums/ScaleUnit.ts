/**
 * ScaleUnit Enum
 * Defines measurement types for scale calculations
 * These represent HOW to measure the scale
 */
export enum ScaleUnit {
  // Direct measurement units
  FACTOR = 'factor', // Direct scale factor (e.g., 1.5 = 150%)
  PERCENTAGE = 'percentage', // Percentage scale values

  // Parent-relative scaling
  PARENT_SCALE = 'parent-scale', // Scale relative to parent
  PARENT_WIDTH_SCALE = 'parent-width-scale', // Scale based on parent width
  PARENT_HEIGHT_SCALE = 'parent-height-scale', // Scale based on parent height

  // Scene-relative scaling
  SCENE_SCALE = 'scene-scale', // Scale relative to scene
  SCENE_WIDTH_SCALE = 'scene-width-scale', // Scale based on scene width
  SCENE_HEIGHT_SCALE = 'scene-height-scale', // Scale based on scene height

  // Viewport-relative scaling
  VIEWPORT_SCALE = 'viewport-scale', // Scale relative to viewport
  VIEWPORT_WIDTH_SCALE = 'viewport-width-scale', // Scale based on viewport width
  VIEWPORT_HEIGHT_SCALE = 'viewport-height-scale', // Scale based on viewport height
}
