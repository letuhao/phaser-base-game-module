/**
 * Lighting System Enums
 *
 * Enums for lighting types, blend modes, and lighting-specific functionality
 */

// ============================================================================
// LIGHTING ENUMS
// ============================================================================

/**
 * Light types enum
 */
export enum LightType {
  POINT = 'point',
  SPOT = 'spot',
  DIRECTIONAL = 'directional',
  AMBIENT = 'ambient',
  CUSTOM = 'custom',
}

/**
 * Light blend modes enum
 */
export enum LightBlendMode {
  NORMAL = 'normal',
  ADD = 'add',
  MULTIPLY = 'multiply',
  SCREEN = 'screen',
  OVERLAY = 'overlay',
  CUSTOM = 'custom',
}

/**
 * Mesh types enum
 */
export enum MeshType {
  TRIANGLE = 'triangle',
  QUAD = 'quad',
  CUSTOM = 'custom',
}

/**
 * Mesh render modes enum
 */
export enum MeshRenderMode {
  SOLID = 'solid',
  WIREFRAME = 'wireframe',
  POINTS = 'points',
  CUSTOM = 'custom',
}

/**
 * Blitter types enum
 */
export enum BlitterType {
  SIMPLE = 'simple',
  ADVANCED = 'advanced',
  CUSTOM = 'custom',
}

/**
 * Blitter blend modes enum
 */
export enum BlitterBlendMode {
  NORMAL = 'normal',
  ADD = 'add',
  MULTIPLY = 'multiply',
  SCREEN = 'screen',
  OVERLAY = 'overlay',
  CUSTOM = 'custom',
}

/**
 * Light falloff curve types enum
 */
export enum LightFalloffCurveType {
  LINEAR = 'linear',
  QUADRATIC = 'quadratic',
  CUBIC = 'cubic',
  EXPONENTIAL = 'exponential',
  CUSTOM = 'custom',
}

/**
 * Light cull face types enum
 */
export enum LightCullFaceType {
  FRONT = 'front',
  BACK = 'back',
  NONE = 'none',
  CUSTOM = 'custom',
}
