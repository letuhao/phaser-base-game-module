/**
 * ScaleValue Enum
 * Defines all possible scale values for responsive scaling
 */
export enum ScaleValue {
  // Direct scale factors
  FACTOR = 'factor',         // Direct scale factor
  
  // Responsive strategies
  FIT = 'fit',               // Fit content while maintaining aspect ratio
  STRETCH = 'stretch',       // Stretch to fill available space
  FILL = 'fill',             // Fill available space
  
  // Aspect ratio handling
  MAINTAIN_ASPECT = 'maintain-aspect', // Maintain aspect ratio
  IGNORE_ASPECT = 'ignore-aspect',     // Ignore aspect ratio
  
  // Content-based scaling
  CONTENT_SCALE = 'content-scale',     // Scale based on content size
  INTRINSIC_SCALE = 'intrinsic-scale', // Scale based on intrinsic size
  
  // Parent-relative scaling
  PARENT_SCALE = 'parent-scale',           // Scale relative to parent
  PARENT_WIDTH_SCALE = 'parent-width-scale', // Scale based on parent width
  PARENT_HEIGHT_SCALE = 'parent-height-scale', // Scale based on parent height
  
  // Scene-relative scaling
  SCENE_SCALE = 'scene-scale',           // Scale relative to scene
  SCENE_WIDTH_SCALE = 'scene-width-scale', // Scale based on scene width
  SCENE_HEIGHT_SCALE = 'scene-height-scale', // Scale based on scene height
  
  // Viewport-relative scaling
  VIEWPORT_SCALE = 'viewport-scale',           // Scale relative to viewport
  VIEWPORT_WIDTH_SCALE = 'viewport-width-scale', // Scale based on viewport width
  VIEWPORT_HEIGHT_SCALE = 'viewport-height-scale', // Scale based on viewport height
  
  // Random scaling
  RANDOM = 'random',         // Random scale factor within a range
  
  // Breakpoint-based scaling
  BREAKPOINT_SCALE = 'breakpoint-scale', // Scale based on current breakpoint
  DEVICE_SCALE = 'device-scale',         // Scale based on device capabilities
}
