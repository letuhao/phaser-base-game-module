/**
 * Unit System Constants
 * Centralized management of all magic numbers, default values, and configuration constants
 * used throughout the unit system.
 */

/**
 * Default Fallback Values
 * Used when calculations fail or no valid input is provided
 */
export const DEFAULT_FALLBACK_VALUES = {
  // Size-related defaults
  SIZE: {
    DEFAULT: 100,
    MIN: 1,
    MAX: 10000,
    CONTENT: 400,
    PARENT: 800,
    SCENE: 1200,
    VIEWPORT: 1200
  },
  
  // Position-related defaults
  POSITION: {
    DEFAULT: 0,
    MIN: -10000,
    MAX: 10000,
    CENTER_OFFSET: 0,
    RANDOM_MIN: 0,
    RANDOM_MAX: 1000
  },
  
  // Scale-related defaults
  SCALE: {
    DEFAULT: 1.0,
    MIN: 0.1,
    MAX: 10.0,
    FACTOR: 1.0,
    RANDOM_MIN: 0.5,
    RANDOM_MAX: 2.0
  },
  
  // Performance and validation defaults
  PERFORMANCE: {
    DEFAULT_MEMORY_LIMIT: 0,
    MAX_CALCULATION_HISTORY: 100,
    ERROR_THRESHOLD: 0.1,
    TIMEOUT_MS: 5000
  },
  
  // Validation defaults
  VALIDATION: {
    MAX_ERRORS: 10,
    STRICT_MODE: true,
    AUTO_VALIDATE: true
  }
} as const;

/**
 * Mock Context Defaults
 * Used in test setup and fallback scenarios
 */
export const MOCK_CONTEXT_DEFAULTS = {
  PARENT: {
    WIDTH: 800,
    HEIGHT: 600,
    X: 0,
    Y: 0
  },
  SCENE: {
    WIDTH: 1200,
    HEIGHT: 800
  },
  VIEWPORT: {
    WIDTH: 1200,
    HEIGHT: 800
  },
  CONTENT: {
    WIDTH: 400,
    HEIGHT: 300
  },
  BREAKPOINT: {
    NAME: 'desktop',
    WIDTH: 1200,
    HEIGHT: 800
  }
} as const;

/**
 * Strategy Priority Constants
 * Lower numbers = higher priority
 */
export const STRATEGY_PRIORITIES = {
  SIZE: 1,
  POSITION: 2,
  SCALE: 3,
  MIXED: 4
} as const;

/**
 * Calculation Constants
 * Used in mathematical operations and algorithms
 */
export const CALCULATION_CONSTANTS = {
  // Aspect ratio calculations
  ASPECT_RATIO: {
    SQUARE: 1.0,
    GOLDEN: 1.618,
    WIDESCREEN: 16 / 9,
    PORTRAIT: 9 / 16
  },
  
  // Random value ranges
  RANDOM: {
    SIZE_MIN: 50,
    SIZE_MAX: 1000,
    POSITION_MIN: 0,
    POSITION_MAX: 1000,
    SCALE_MIN: 0.5,
    SCALE_MAX: 3.0
  },
  
  // Percentage calculations
  PERCENTAGE: {
    FULL: 100,
    HALF: 50,
    QUARTER: 25,
    THIRD: 33.33
  }
} as const;

/**
 * Error Messages
 * Centralized error message constants
 */
export const ERROR_MESSAGES = {
  SIZE: {
    INVALID_DIMENSION: 'Cannot calculate width for height-only dimension',
    INVALID_UNIT: 'Invalid size unit provided',
    CALCULATION_FAILED: 'Size calculation failed'
  },
  POSITION: {
    INVALID_AXIS: 'Cannot calculate X position for Y-axis only',
    INVALID_UNIT: 'Invalid position unit provided',
    CALCULATION_FAILED: 'Position calculation failed'
  },
  SCALE: {
    INVALID_UNIT: 'Invalid scale unit provided',
    CALCULATION_FAILED: 'Scale calculation failed'
  },
  GENERAL: {
    INVALID_INPUT: 'Invalid input provided',
    MISSING_CONTEXT: 'Required context is missing',
    UNSUPPORTED_OPERATION: 'Operation not supported'
  }
} as const;

/**
 * Type Guards
 * Helper functions to check if values are within expected ranges
 */
export const TypeGuards = {
  /**
   * Check if a size value is within valid range
   */
  isValidSize: (value: number): boolean => {
    return value >= DEFAULT_FALLBACK_VALUES.SIZE.MIN && 
           value <= DEFAULT_FALLBACK_VALUES.SIZE.MAX;
  },
  
  /**
   * Check if a position value is within valid range
   */
  isValidPosition: (value: number): boolean => {
    return value >= DEFAULT_FALLBACK_VALUES.POSITION.MIN && 
           value <= DEFAULT_FALLBACK_VALUES.POSITION.MAX;
  },
  
  /**
   * Check if a scale value is within valid range
   */
  isValidScale: (value: number): boolean => {
    return value >= DEFAULT_FALLBACK_VALUES.SCALE.MIN && 
           value <= DEFAULT_FALLBACK_VALUES.SCALE.MAX;
  }
} as const;

/**
 * Utility Functions
 * Helper functions for common operations
 */
export const Utils = {
  /**
   * Clamp a value between min and max
   */
  clamp: (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, value));
  },
  
  /**
   * Get a fallback value based on type
   */
  getFallbackValue: (type: 'size' | 'position' | 'scale'): number => {
    switch (type) {
      case 'size':
        return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
      case 'position':
        return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
      case 'scale':
        return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
      default:
        return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    }
  },
  
  /**
   * Get mock context defaults for testing
   */
  getMockContextDefaults: () => MOCK_CONTEXT_DEFAULTS
} as const;

/**
 * Export all constants as a single object for easy access
 */
export const UnitSystemConstants = {
  DEFAULTS: DEFAULT_FALLBACK_VALUES,
  MOCK: MOCK_CONTEXT_DEFAULTS,
  PRIORITIES: STRATEGY_PRIORITIES,
  CALCULATIONS: CALCULATION_CONSTANTS,
  ERRORS: ERROR_MESSAGES,
  TypeGuards,
  Utils
} as const;

export default UnitSystemConstants;
