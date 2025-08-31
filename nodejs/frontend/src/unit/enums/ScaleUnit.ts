/**
 * ScaleUnit Enum
 * Defines all possible scale unit types for responsive scaling
 */
export enum ScaleUnit {
  // Direct numeric values
  FACTOR = 'factor',       // Direct scale factor (e.g., 1.5 = 150%)
  
  // Responsive scaling strategies
  FIT = 'fit',             // Fit content while maintaining aspect ratio
  STRETCH = 'stretch',     // Stretch to fill available space
  FILL = 'fill',           // Fill available space (may distort)
  
  // Aspect ratio preservation
  MAINTAIN_ASPECT = 'maintain-aspect',     // Keep aspect ratio
  IGNORE_ASPECT = 'ignore-aspect',         // Ignore aspect ratio
  
  // Content-based scaling
  CONTENT_SCALE = 'content-scale',         // Scale based on content size
  INTRINSIC_SCALE = 'intrinsic-scale',     // Scale based on intrinsic size
  
  // Parent-relative scaling
  PARENT_SCALE = 'parent-scale',           // Scale relative to parent
  PARENT_WIDTH_SCALE = 'parent-width-scale', // Scale based on parent width
  PARENT_HEIGHT_SCALE = 'parent-height-scale', // Scale based on parent height
  
  // Scene-relative scaling
  SCENE_SCALE = 'scene-scale',             // Scale relative to scene
  SCENE_WIDTH_SCALE = 'scene-width-scale', // Scale based on scene width
  SCENE_HEIGHT_SCALE = 'scene-height-scale', // Scale based on scene height
  
  // Viewport-relative scaling
  VIEWPORT_SCALE = 'viewport-scale',       // Scale relative to viewport
  VIEWPORT_WIDTH_SCALE = 'viewport-width-scale', // Scale based on viewport width
  VIEWPORT_HEIGHT_SCALE = 'viewport-height-scale', // Scale based on viewport height
  
  // Random values
  RANDOM = 'random',       // Random scale factor within a range
  
  // Responsive breakpoint scaling
  BREAKPOINT_SCALE = 'breakpoint-scale',   // Scale based on current breakpoint
  DEVICE_SCALE = 'device-scale',           // Scale based on device type
}
