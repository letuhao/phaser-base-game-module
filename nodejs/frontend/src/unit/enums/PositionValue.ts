/**
 * PositionValue Enum
 * Defines all possible position values for responsive positioning
 */
export enum PositionValue {
  // Direct numeric values (pixels)
  PIXEL = 'pixel',
  
  // Alignment keywords
  CENTER = 'center',         // Center alignment
  LEFT = 'left',             // Left alignment
  RIGHT = 'right',           // Right alignment
  TOP = 'top',               // Top alignment
  BOTTOM = 'bottom',         // Bottom alignment
  
  // CSS-like position types
  STATIC = 'static',         // Static positioning
  RELATIVE = 'relative',     // Relative positioning
  ABSOLUTE = 'absolute',     // Absolute positioning
  FIXED = 'fixed',           // Fixed positioning
  
  // Parent-relative units
  PARENT_LEFT = 'parent-left',       // Percentage from parent left
  PARENT_RIGHT = 'parent-right',     // Percentage from parent right
  PARENT_TOP = 'parent-top',         // Percentage from parent top
  PARENT_BOTTOM = 'parent-bottom',   // Percentage from parent bottom
  PARENT_CENTER_X = 'parent-center-x', // Center horizontally within parent
  PARENT_CENTER_Y = 'parent-center-y', // Center vertically within parent
  
  // Scene-relative units
  SCENE_LEFT = 'scene-left',         // Percentage from scene left
  SCENE_RIGHT = 'scene-right',       // Percentage from scene right
  SCENE_TOP = 'scene-top',           // Percentage from scene top
  SCENE_BOTTOM = 'scene-bottom',     // Percentage from scene bottom
  SCENE_CENTER_X = 'scene-center-x', // Center horizontally within scene
  SCENE_CENTER_Y = 'scene-center-y', // Center vertically within scene
  
  // Viewport units
  VIEWPORT_LEFT = 'viewport-left',   // Percentage from viewport left
  VIEWPORT_RIGHT = 'viewport-right', // Percentage from viewport right
  VIEWPORT_TOP = 'viewport-top',     // Percentage from viewport top
  VIEWPORT_BOTTOM = 'viewport-bottom', // Percentage from viewport bottom
  
  // Random values
  RANDOM = 'random',         // Random value within a range
  
  // Content-based positioning
  CONTENT_LEFT = 'content-left',     // Position based on content left edge
  CONTENT_RIGHT = 'content-right',   // Position based on content right edge
  CONTENT_TOP = 'content-top',       // Position based on content top edge
  CONTENT_BOTTOM = 'content-bottom', // Position based on content bottom edge
}
