/**
 * Effects System Enums
 * 
 * Enums for visual effects, particles, and environmental effects
 */

// ============================================================================
// PARTICLE EFFECT ENUMS
// ============================================================================

/**
 * Particle spawn modes enum
 */
export enum ParticleSpawnMode {
  BURST = 'burst',
  CONTINUOUS = 'continuous',
  EXPLOSION = 'explosion',
  FOUNTAIN = 'fountain',
  RING = 'ring',
  SPIRAL = 'spiral',
  CUSTOM = 'custom',
}

/**
 * Particle update modes enum
 */
export enum ParticleUpdateMode {
  SIMPLE = 'simple',
  PHYSICS = 'physics',
  FLUID = 'fluid',
  CUSTOM = 'custom',
}

/**
 * Particle blend modes enum
 */
export enum ParticleBlendMode {
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
 * Particle emission shapes enum
 */
export enum ParticleEmissionShape {
  POINT = 'point',
  LINE = 'line',
  RECTANGLE = 'rectangle',
  CIRCLE = 'circle',
  ELLIPSE = 'ellipse',
  RING = 'ring',
  SPHERE = 'sphere',
  BOX = 'box',
  CUSTOM = 'custom',
}

// ============================================================================
// ENVIRONMENTAL EFFECT ENUMS
// ============================================================================

/**
 * Environmental effect types enum
 */
export enum EnvironmentalEffectType {
  WEATHER = 'weather',
  LIGHTING = 'lighting',
  FOG = 'fog',
  WIND = 'wind',
  RAIN = 'rain',
  SNOW = 'snow',
  STORM = 'storm',
  FIRE = 'fire',
  SMOKE = 'smoke',
  DUST = 'dust',
  CUSTOM = 'custom',
}

/**
 * Weather conditions enum
 */
export enum WeatherCondition {
  CLEAR = 'clear',
  CLOUDY = 'cloudy',
  OVERCAST = 'overcast',
  RAIN = 'rain',
  HEAVY_RAIN = 'heavy_rain',
  STORM = 'storm',
  SNOW = 'snow',
  HEAVY_SNOW = 'heavy_snow',
  BLIZZARD = 'blizzard',
  FOG = 'fog',
  MIST = 'mist',
  HAIL = 'hail',
  THUNDERSTORM = 'thunderstorm',
  TORNADO = 'tornado',
  HURRICANE = 'hurricane',
  CUSTOM = 'custom',
}

/**
 * Lighting conditions enum
 */
export enum LightingCondition {
  DAY = 'day',
  NIGHT = 'night',
  DAWN = 'dawn',
  DUSK = 'dusk',
  SUNRISE = 'sunrise',
  SUNSET = 'sunset',
  MOONLIGHT = 'moonlight',
  STREETLIGHT = 'streetlight',
  INDOOR = 'indoor',
  FLASHLIGHT = 'flashlight',
  CUSTOM = 'custom',
}

// ============================================================================
// EFFECT PRIORITY ENUMS
// ============================================================================

/**
 * Effect priority levels enum
 */
export enum EffectPriority {
  LOWEST = 0,
  LOW = 1,
  NORMAL = 5,
  HIGH = 10,
  HIGHEST = 100,
  CRITICAL = 1000,
}

/**
 * Effect performance levels enum
 */
export enum EffectPerformanceLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  ULTRA = 'ultra',
}

// ============================================================================
// EFFECT ANIMATION ENUMS
// ============================================================================

/**
 * Effect animation types enum
 */
export enum EffectAnimationType {
  NONE = 'none',
  FADE_IN = 'fade_in',
  FADE_OUT = 'fade_out',
  SCALE_IN = 'scale_in',
  SCALE_OUT = 'scale_out',
  ROTATE = 'rotate',
  TRANSLATE = 'translate',
  MORPH = 'morph',
  CUSTOM = 'custom',
}

/**
 * Effect easing types enum
 */
export enum EffectEasingType {
  LINEAR = 'linear',
  EASE_IN = 'ease_in',
  EASE_OUT = 'ease_out',
  EASE_IN_OUT = 'ease_in_out',
  EASE_IN_BACK = 'ease_in_back',
  EASE_OUT_BACK = 'ease_out_back',
  EASE_IN_ELASTIC = 'ease_in_elastic',
  EASE_OUT_ELASTIC = 'ease_out_elastic',
  BOUNCE = 'bounce',
  SPRING = 'spring',
  CUSTOM = 'custom',
}

// ============================================================================
// EFFECT LAYERING ENUMS
// ============================================================================

/**
 * Effect layer types enum
 */
export enum EffectLayerType {
  BACKGROUND = 'background',
  MIDDLE = 'middle',
  FOREGROUND = 'foreground',
  UI = 'ui',
  OVERLAY = 'overlay',
  CUSTOM = 'custom',
}

/**
 * Effect blend modes enum
 */
export enum EffectBlendMode {
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
// EFFECT CACHING ENUMS
// ============================================================================

/**
 * Effect cache types enum
 */
export enum EffectCacheType {
  NONE = 'none',
  MEMORY = 'memory',
  DISK = 'disk',
  NETWORK = 'network',
  HYBRID = 'hybrid',
}

/**
 * Effect cache strategies enum
 */
export enum EffectCacheStrategy {
  NONE = 'none',
  LRU = 'lru',
  LFU = 'lfu',
  FIFO = 'fifo',
  TTL = 'ttl',
  CUSTOM = 'custom',
}
