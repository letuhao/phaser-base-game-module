/**
 * Rendering and Visual Enums
 *
 * Enums for rendering, graphics, and visual effects
 */

// ============================================================================
// GRAPHICS ENUMS
// ============================================================================

/**
 * Graphics line style enum
 */
export enum GraphicsLineStyle {
  SOLID = 'solid',
  DASHED = 'dashed',
  DOTTED = 'dotted',
  DASH_DOT = 'dash_dot',
}

/**
 * Graphics fill style enum
 */
export enum GraphicsFillStyle {
  SOLID = 'solid',
  GRADIENT = 'gradient',
  PATTERN = 'pattern',
  NONE = 'none',
}

/**
 * Graphics path command enum
 */
export enum GraphicsPathCommand {
  MOVE_TO = 'move_to',
  LINE_TO = 'line_to',
  CURVE_TO = 'curve_to',
  ARC = 'arc',
  CLOSE_PATH = 'close_path',
}

// ============================================================================
// SPRITE ENUMS
// ============================================================================

/**
 * Sprite blend mode enum
 */
export enum SpriteBlendMode {
  NORMAL = 'normal',
  ADD = 'add',
  MULTIPLY = 'multiply',
  SCREEN = 'screen',
  OVERLAY = 'overlay',
  DARKEN = 'darken',
  LIGHTEN = 'lighten',
  COLOR_DODGE = 'color_dodge',
  COLOR_BURN = 'color_burn',
  HARD_LIGHT = 'hard_light',
  SOFT_LIGHT = 'soft_light',
  DIFFERENCE = 'difference',
  EXCLUSION = 'exclusion',
  HUE = 'hue',
  SATURATION = 'saturation',
  COLOR = 'color',
  LUMINOSITY = 'luminosity',
}

/**
 * Sprite crop mode enum
 */
export enum SpriteCropMode {
  NONE = 'none',
  MANUAL = 'manual',
  AUTO = 'auto',
  FIT = 'fit',
  FILL = 'fill',
}

// ============================================================================
// TEXT ENUMS
// ============================================================================

/**
 * Bitmap text alignment enum
 */
export enum BitmapTextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  JUSTIFY = 'justify',
}

/**
 * Bitmap text blend mode enum
 */
export enum BitmapTextBlendMode {
  NORMAL = 'normal',
  ADD = 'add',
  MULTIPLY = 'multiply',
  SCREEN = 'screen',
  OVERLAY = 'overlay',
  DARKEN = 'darken',
  LIGHTEN = 'lighten',
  COLOR_DODGE = 'color_dodge',
  COLOR_BURN = 'color_burn',
  HARD_LIGHT = 'hard_light',
  SOFT_LIGHT = 'soft_light',
  DIFFERENCE = 'difference',
  EXCLUSION = 'exclusion',
  HUE = 'hue',
  SATURATION = 'saturation',
  COLOR = 'color',
  LUMINOSITY = 'luminosity',
}

/**
 * Bitmap text word wrap enum
 */
export enum BitmapTextWordWrap {
  NONE = 'none',
  WORD = 'word',
  CHAR = 'char',
}

/**
 * Dynamic bitmap text alignment enum
 */
export enum DynamicBitmapTextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  JUSTIFY = 'justify',
}

/**
 * Dynamic bitmap text blend mode enum
 */
export enum DynamicBitmapTextBlendMode {
  NORMAL = 'normal',
  ADD = 'add',
  MULTIPLY = 'multiply',
  SCREEN = 'screen',
  OVERLAY = 'overlay',
  DARKEN = 'darken',
  LIGHTEN = 'lighten',
  COLOR_DODGE = 'color_dodge',
  COLOR_BURN = 'color_burn',
  HARD_LIGHT = 'hard_light',
  SOFT_LIGHT = 'soft_light',
  DIFFERENCE = 'difference',
  EXCLUSION = 'exclusion',
  HUE = 'hue',
  SATURATION = 'saturation',
  COLOR = 'color',
  LUMINOSITY = 'luminosity',
}

/**
 * Dynamic bitmap text word wrap enum
 */
export enum DynamicBitmapTextWordWrap {
  NONE = 'none',
  WORD = 'word',
  CHAR = 'char',
}

/**
 * Dynamic bitmap text animation mode enum
 */
export enum DynamicBitmapTextAnimationMode {
  NONE = 'none',
  TYPEWRITER = 'typewriter',
  FADE_IN = 'fade_in',
  SLIDE_IN = 'slide_in',
  BOUNCE_IN = 'bounce_in',
}

// ============================================================================
// TILE SPRITE ENUMS
// ============================================================================

/**
 * Tile sprite tile mode enum
 */
export enum TileSpriteTileMode {
  STRETCH = 'stretch',
  REPEAT = 'repeat',
  CLAMP = 'clamp',
}

/**
 * Tile sprite blend mode enum
 */
export enum TileSpriteBlendMode {
  NORMAL = 'normal',
  ADD = 'add',
  MULTIPLY = 'multiply',
  SCREEN = 'screen',
  OVERLAY = 'overlay',
  DARKEN = 'darken',
  LIGHTEN = 'lighten',
  COLOR_DODGE = 'color_dodge',
  COLOR_BURN = 'color_burn',
  HARD_LIGHT = 'hard_light',
  SOFT_LIGHT = 'soft_light',
  DIFFERENCE = 'difference',
  EXCLUSION = 'exclusion',
  HUE = 'hue',
  SATURATION = 'saturation',
  COLOR = 'color',
  LUMINOSITY = 'luminosity',
}

// ============================================================================
// LIGHTING ENUMS
// ============================================================================

/**
 * Light type enum
 */
export enum LightType {
  POINT = 'point',
  DIRECTIONAL = 'directional',
  SPOT = 'spot',
  AMBIENT = 'ambient',
}

/**
 * Light blend mode enum
 */
export enum LightBlendMode {
  NORMAL = 'normal',
  ADD = 'add',
  MULTIPLY = 'multiply',
  SCREEN = 'screen',
  OVERLAY = 'overlay',
  SOFT_LIGHT = 'soft_light',
  HARD_LIGHT = 'hard_light',
  COLOR_DODGE = 'color_dodge',
  COLOR_BURN = 'color_burn',
  DIFFERENCE = 'difference',
  EXCLUSION = 'exclusion',
}

/**
 * Blitter type enum
 */
export enum BlitterType {
  SIMPLE = 'simple',
  ANIMATED = 'animated',
  BATCHED = 'batched',
}

/**
 * Blitter blend mode enum
 */
export enum BlitterBlendMode {
  NORMAL = 'normal',
  ADD = 'add',
  MULTIPLY = 'multiply',
  SCREEN = 'screen',
  OVERLAY = 'overlay',
  DARKEN = 'darken',
  LIGHTEN = 'lighten',
  COLOR_DODGE = 'color_dodge',
  COLOR_BURN = 'color_burn',
  HARD_LIGHT = 'hard_light',
  SOFT_LIGHT = 'soft_light',
  DIFFERENCE = 'difference',
  EXCLUSION = 'exclusion',
  HUE = 'hue',
  SATURATION = 'saturation',
  COLOR = 'color',
  LUMINOSITY = 'luminosity',
}

/**
 * Mesh type enum
 */
export enum MeshType {
  SIMPLE = 'simple',
  TEXTURED = 'textured',
  ANIMATED = 'animated',
  SKINNED = 'skinned',
}

/**
 * Mesh render mode enum
 */
export enum MeshRenderMode {
  TRIANGLES = 'triangles',
  TRIANGLE_STRIP = 'triangle_strip',
  TRIANGLE_FAN = 'triangle_fan',
  LINES = 'lines',
  LINE_STRIP = 'line_strip',
  LINE_LOOP = 'line_loop',
  POINTS = 'points',
}
