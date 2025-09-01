/**
 * PositionUnit Enum
 * Defines measurement types for position calculations
 * These represent HOW to measure the position
 */
export enum PositionUnit {
  // Direct measurement units
  PIXEL = 'pixel', // Absolute pixel values
  PERCENTAGE = 'percentage', // Percentage values

  // Parent-relative units
  PARENT_LEFT = 'parent-left', // Percentage from parent's left edge
  PARENT_RIGHT = 'parent-right', // Percentage from parent's right edge
  PARENT_TOP = 'parent-top', // Percentage from parent's top edge
  PARENT_BOTTOM = 'parent-bottom', // Percentage from parent's bottom edge
  PARENT_CENTER_X = 'parent-center-x', // Center horizontally within parent
  PARENT_CENTER_Y = 'parent-center-y', // Center vertically within parent

  // Scene-relative units
  SCENE_LEFT = 'scene-left', // Percentage from scene's left edge
  SCENE_RIGHT = 'scene-right', // Percentage from scene's right edge
  SCENE_TOP = 'scene-top', // Percentage from scene's top edge
  SCENE_BOTTOM = 'scene-bottom', // Percentage from scene's bottom edge
  SCENE_CENTER_X = 'scene-center-x', // Center horizontally within scene
  SCENE_CENTER_Y = 'scene-center-y', // Center vertically within scene

  // Viewport units
  VIEWPORT_LEFT = 'viewport-left', // Percentage from viewport's left edge
  VIEWPORT_RIGHT = 'viewport-right', // Percentage from viewport's right edge
  VIEWPORT_TOP = 'viewport-top', // Percentage from viewport's top edge
  VIEWPORT_BOTTOM = 'viewport-bottom', // Percentage from viewport's bottom edge
}
