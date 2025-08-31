/**
 * PositionUnit Enum
 * Defines all possible position unit types for responsive positioning
 */
export enum PositionUnit {
  // Direct numeric values (pixels)
  PIXEL = 'pixel',
  
  // Alignment keywords
  CENTER = 'center',       // Center on the specified axis
  LEFT = 'left',           // Align to left edge
  RIGHT = 'right',         // Align to right edge
  TOP = 'top',             // Align to top edge
  BOTTOM = 'bottom',       // Align to bottom edge
  
  // Position types (CSS-like)
  STATIC = 'static',       // Normal document flow
  RELATIVE = 'relative',   // Relative to normal position
  ABSOLUTE = 'absolute',   // Absolute positioning
  FIXED = 'fixed',         // Fixed positioning relative to viewport
  
  // Parent-relative units
  PARENT_LEFT = 'parent-left',       // Percentage from parent's left edge
  PARENT_RIGHT = 'parent-right',     // Percentage from parent's right edge
  PARENT_TOP = 'parent-top',         // Percentage from parent's top edge
  PARENT_BOTTOM = 'parent-bottom',   // Percentage from parent's bottom edge
  PARENT_CENTER_X = 'parent-center-x', // Center horizontally within parent
  PARENT_CENTER_Y = 'parent-center-y', // Center vertically within parent
  
  // Scene-relative units
  SCENE_LEFT = 'scene-left',         // Percentage from scene's left edge
  SCENE_RIGHT = 'scene-right',       // Percentage from scene's right edge
  SCENE_TOP = 'scene-top',           // Percentage from scene's top edge
  SCENE_BOTTOM = 'scene-bottom',     // Percentage from scene's bottom edge
  SCENE_CENTER_X = 'scene-center-x', // Center horizontally within scene
  SCENE_CENTER_Y = 'scene-center-y', // Center vertically within scene
  
  // Viewport units
  VIEWPORT_LEFT = 'viewport-left',   // Percentage from viewport's left edge
  VIEWPORT_RIGHT = 'viewport-right', // Percentage from viewport's right edge
  VIEWPORT_TOP = 'viewport-top',     // Percentage from viewport's top edge
  VIEWPORT_BOTTOM = 'viewport-bottom', // Percentage from viewport's bottom edge
  
  // Random values
  RANDOM = 'random',       // Random value within a range
  
  // Content-based positioning
  CONTENT_LEFT = 'content-left',     // Position based on content bounds
  CONTENT_RIGHT = 'content-right',   // Position based on content bounds
  CONTENT_TOP = 'content-top',       // Position based on content bounds
  CONTENT_BOTTOM = 'content-bottom', // Position based on content bounds
}
