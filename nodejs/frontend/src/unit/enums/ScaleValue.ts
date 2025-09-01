/**
 * ScaleValue Enum
 * Defines semantic behaviors for scale calculations
 * These represent WHAT kind of scaling behavior you want
 */
export enum ScaleValue {
  // Direct scale factors
  FACTOR = 'factor', // Direct scale factor

  // Responsive strategies
  FIT = 'fit', // Fit content while maintaining aspect ratio
  STRETCH = 'stretch', // Stretch to fill available space
  FILL = 'fill', // Fill available space

  // Aspect ratio handling
  MAINTAIN_ASPECT = 'maintain-aspect', // Maintain aspect ratio
  IGNORE_ASPECT = 'ignore-aspect', // Ignore aspect ratio

  // Content-based scaling
  CONTENT_SCALE = 'content-scale', // Scale based on content size
  INTRINSIC_SCALE = 'intrinsic-scale', // Scale based on intrinsic size

  // Random scaling
  RANDOM = 'random', // Random scale factor within a range

  // Breakpoint-based scaling
  BREAKPOINT_SCALE = 'breakpoint-scale', // Scale based on current breakpoint
  DEVICE_SCALE = 'device-scale', // Scale based on device capabilities
}