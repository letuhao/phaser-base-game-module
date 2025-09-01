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
 * Performance Constants
 * Used for performance monitoring, caching, and optimization
 */
export const PERFORMANCE_CONSTANTS = {
  // Cache settings
  CACHE: {
    DEFAULT_TIMEOUT_MS: 5000,
    DEFAULT_MAX_SIZE: 100,
    CLEANUP_INTERVAL_MS: 30000,
    HASH_SEED: 5381 as number
  },
  
  // Performance thresholds
  THRESHOLDS: {
    MAX_CALCULATION_TIME_MS: 100,
    MAX_MEMORY_USAGE_MB: 50,
    ERROR_RATE_THRESHOLD: 0.05, // 5%
    SLOW_OPERATION_THRESHOLD_MS: 10
  },
  
  // History and monitoring
  MONITORING: {
    MAX_HISTORY_SIZE: 1000,
    MAX_EXECUTION_TIMES: 100,
    PERFORMANCE_CHECK_INTERVAL_MS: 5000,
    METRICS_RESET_INTERVAL_MS: 60000
  },
  
  // Smoothing and averaging
  SMOOTHING: {
    ALPHA_FACTOR: 0.1,
    MOVING_AVERAGE_WINDOW: 10,
    EXPONENTIAL_DECAY_FACTOR: 0.95
  }
} as const;

/**
 * Validation Constants
 * Used for input validation and error checking
 */
export const VALIDATION_CONSTANTS = {
  // Range validation
  RANGES: {
    REASONABLE_SIZE_MIN: 0,
    REASONABLE_SIZE_MAX: 10000,
    REASONABLE_POSITION_MIN: -10000,
    REASONABLE_POSITION_MAX: 20000,
    REASONABLE_SCALE_MIN: 0,
    REASONABLE_SCALE_MAX: 10
  },
  
  // Validation rules
  RULES: {
    MAX_VALIDATION_RULES: 10,
    VALIDATION_TIMEOUT_MS: 1000,
    STRICT_VALIDATION_THRESHOLD: 0.01
  },
  
  // Error handling
  ERROR_HANDLING: {
    MAX_ERROR_MESSAGES: 50,
    ERROR_CLEANUP_INTERVAL_MS: 30000,
    ERROR_RETENTION_PERIOD_MS: 300000 // 5 minutes
  }
} as const;

/**
 * Feature Flag Constants
 * Used for feature flag system and deployment
 */
export const FEATURE_FLAG_CONSTANTS = {
  // Rollout settings
  ROLLOUT: {
    DEFAULT_PERCENTAGE: 10,
    MAX_PERCENTAGE: 100,
    HASH_MODULO: 100,
    HASH_OFFSET: 1
  },
  
  // Hash calculation
  HASH: {
    INITIAL_VALUE: 0,
    SHIFT_AMOUNT: 5,
    BITWISE_MASK: 0xFFFFFFFF
  },
  
  // Version management
  VERSION: {
    DEFAULT_VERSION: '1.0.0',
    VERSION_SEPARATOR: '.',
    MAX_VERSION_PARTS: 3
  }
} as const;

/**
 * Command and History Constants
 * Used for command management and undo/redo functionality
 */
export const COMMAND_CONSTANTS = {
  // Command history
  HISTORY: {
    DEFAULT_INDEX: -1,
    MAX_HISTORY_SIZE: 100,
    CLEANUP_THRESHOLD: 50
  },
  
  // Batch operations
  BATCH: {
    DEFAULT_BATCH_SIZE: 10,
    MAX_BATCH_SIZE: 100,
    BATCH_TIMEOUT_MS: 5000
  },
  
  // Execution metrics
  METRICS: {
    MAX_EXECUTION_TIMES: 100,
    METRICS_RESET_INTERVAL_MS: 60000
  }
} as const;

/**
 * Observer and Monitoring Constants
 * Used for observer patterns and monitoring systems
 */
export const OBSERVER_CONSTANTS = {
  // Observer management
  MANAGEMENT: {
    MAX_OBSERVERS_PER_UNIT: 10,
    OBSERVER_CLEANUP_INTERVAL_MS: 30000,
    MAX_NOTIFICATION_QUEUE: 100
  },
  
  // Performance monitoring
  PERFORMANCE: {
    METRICS_RESET_INTERVAL_MS: 60000,
    SLOW_OPERATION_THRESHOLD_MS: 10,
    MEMORY_USAGE_THRESHOLD_MB: 50
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
  },
  
  /**
   * Check if a value is within reasonable bounds for validation
   */
  isWithinReasonableBounds: (value: number, type: 'size' | 'position' | 'scale'): boolean => {
    switch (type) {
      case 'size':
        return value >= VALIDATION_CONSTANTS.RANGES.REASONABLE_SIZE_MIN && 
               value <= VALIDATION_CONSTANTS.RANGES.REASONABLE_SIZE_MAX;
      case 'position':
        return value >= VALIDATION_CONSTANTS.RANGES.REASONABLE_POSITION_MIN && 
               value <= VALIDATION_CONSTANTS.RANGES.REASONABLE_POSITION_MAX;
      case 'scale':
        return value >= VALIDATION_CONSTANTS.RANGES.REASONABLE_SCALE_MIN && 
               value <= VALIDATION_CONSTANTS.RANGES.REASONABLE_SCALE_MAX;
      default:
        return false;
    }
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
  getMockContextDefaults: () => MOCK_CONTEXT_DEFAULTS,
  
  /**
   * Generate a hash for string input
   */
  generateHash: (str: string): number => {
    let hash = PERFORMANCE_CONSTANTS.CACHE.HASH_SEED;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & 0xFFFFFFFF; // Convert to 32-bit integer
    }
    return hash;
  },
  
  /**
   * Check if performance is within acceptable thresholds
   */
  isPerformanceAcceptable: (executionTime: number, errorRate: number): boolean => {
    return executionTime <= PERFORMANCE_CONSTANTS.THRESHOLDS.MAX_CALCULATION_TIME_MS && 
           errorRate <= PERFORMANCE_CONSTANTS.THRESHOLDS.ERROR_RATE_THRESHOLD;
  }
} as const;

/**
 * Export all constants as a single object for easy access
 */
export const UnitSystemConstants = {
  DEFAULTS: DEFAULT_FALLBACK_VALUES,
  PERFORMANCE: PERFORMANCE_CONSTANTS,
  VALIDATION: VALIDATION_CONSTANTS,
  FEATURE_FLAGS: FEATURE_FLAG_CONSTANTS,
  COMMANDS: COMMAND_CONSTANTS,
  OBSERVERS: OBSERVER_CONSTANTS,
  MOCK: MOCK_CONTEXT_DEFAULTS,
  PRIORITIES: STRATEGY_PRIORITIES,
  CALCULATIONS: CALCULATION_CONSTANTS,
  ERRORS: ERROR_MESSAGES,
  TypeGuards,
  Utils
} as const;

export default UnitSystemConstants;
