/**
 * Debug System Enums
 * 
 * Enums for debugging, logging, and development tools
 */

// ============================================================================
// DEBUG LEVELS ENUMS
// ============================================================================

/**
 * Debug levels enum
 */
export enum DebugLevel {
  NONE = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
  VERBOSE = 5,
  TRACE = 6,
}

/**
 * Debug categories enum
 */
export enum DebugCategory {
  GENERAL = 'general',
  COMPONENTS = 'components',
  PHYSICS = 'physics',
  ANIMATION = 'animation',
  INPUT = 'input',
  NETWORK = 'network',
  PERFORMANCE = 'performance',
  RENDERING = 'rendering',
  AUDIO = 'audio',
  UI = 'ui',
  MEMORY = 'memory',
  CACHE = 'cache',
  POOL = 'pool',
  EFFECTS = 'effects',
  CUSTOM = 'custom',
}

/**
 * Debug output types enum
 */
export enum DebugOutputType {
  CONSOLE = 'console',
  FILE = 'file',
  NETWORK = 'network',
  UI = 'ui',
  CUSTOM = 'custom',
}

// ============================================================================
// DEBUG VISUALIZATION ENUMS
// ============================================================================

/**
 * Debug visualization types enum
 */
export enum DebugVisualizationType {
  NONE = 'none',
  BOUNDS = 'bounds',
  COLLIDERS = 'colliders',
  PHYSICS = 'physics',
  PATHS = 'paths',
  GRID = 'grid',
  COORDINATES = 'coordinates',
  PERFORMANCE = 'performance',
  MEMORY = 'memory',
  NETWORK = 'network',
  CUSTOM = 'custom',
}

/**
 * Debug overlay types enum
 */
export enum DebugOverlayType {
  NONE = 'none',
  FPS = 'fps',
  MEMORY = 'memory',
  OBJECTS = 'objects',
  COMPONENTS = 'components',
  PHYSICS = 'physics',
  NETWORK = 'network',
  PERFORMANCE = 'performance',
  CUSTOM = 'custom',
}

/**
 * Debug color schemes enum
 */
export enum DebugColorScheme {
  DEFAULT = 'default',
  MONOCHROME = 'monochrome',
  HIGH_CONTRAST = 'high_contrast',
  COLORBLIND_FRIENDLY = 'colorblind_friendly',
  CUSTOM = 'custom',
}

// ============================================================================
// DEBUG PROFILING ENUMS
// ============================================================================

/**
 * Debug profiling types enum
 */
export enum DebugProfilingType {
  NONE = 'none',
  CPU = 'cpu',
  GPU = 'gpu',
  MEMORY = 'memory',
  NETWORK = 'network',
  CUSTOM = 'custom',
}

/**
 * Debug profiling modes enum
 */
export enum DebugProfilingMode {
  CONTINUOUS = 'continuous',
  SAMPLE = 'sample',
  EVENT = 'event',
  CUSTOM = 'custom',
}

/**
 * Debug profiling intervals enum
 */
export enum DebugProfilingInterval {
  FRAME = 'frame',
  SECOND = 'second',
  MINUTE = 'minute',
  CUSTOM = 'custom',
}

// ============================================================================
// DEBUG TESTING ENUMS
// ============================================================================

/**
 * Debug test types enum
 */
export enum DebugTestType {
  UNIT = 'unit',
  INTEGRATION = 'integration',
  PERFORMANCE = 'performance',
  STRESS = 'stress',
  LOAD = 'load',
  CUSTOM = 'custom',
}

/**
 * Debug test states enum
 */
export enum DebugTestState {
  PENDING = 'pending',
  RUNNING = 'running',
  PASSED = 'passed',
  FAILED = 'failed',
  SKIPPED = 'skipped',
  ERROR = 'error',
}

/**
 * Debug assertion types enum
 */
export enum DebugAssertionType {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  GREATER_OR_EQUAL = 'greater_or_equal',
  LESS_OR_EQUAL = 'less_or_equal',
  IS_NULL = 'is_null',
  IS_NOT_NULL = 'is_not_null',
  IS_TRUE = 'is_true',
  IS_FALSE = 'is_false',
  CUSTOM = 'custom',
}

// ============================================================================
// DEBUG INSPECTION ENUMS
// ============================================================================

/**
 * Debug inspection types enum
 */
export enum DebugInspectionType {
  OBJECT = 'object',
  COMPONENT = 'component',
  PROPERTY = 'property',
  METHOD = 'method',
  EVENT = 'event',
  CUSTOM = 'custom',
}

/**
 * Debug inspection modes enum
 */
export enum DebugInspectionMode {
  READ_ONLY = 'read_only',
  READ_WRITE = 'read_write',
  EXECUTE = 'execute',
  CUSTOM = 'custom',
}

/**
 * Debug inspection scopes enum
 */
export enum DebugInspectionScope {
  LOCAL = 'local',
  GLOBAL = 'global',
  HIERARCHY = 'hierarchy',
  CUSTOM = 'custom',
}

// ============================================================================
// DEBUG CONSOLE ENUMS
// ============================================================================

/**
 * Debug console commands enum
 */
export enum DebugConsoleCommand {
  HELP = 'help',
  CLEAR = 'clear',
  LOG = 'log',
  WARN = 'warn',
  ERROR = 'error',
  INFO = 'info',
  DEBUG = 'debug',
  TRACE = 'trace',
  INSPECT = 'inspect',
  PROFILE = 'profile',
  TEST = 'test',
  CUSTOM = 'custom',
}

/**
 * Debug console output formats enum
 */
export enum DebugConsoleOutputFormat {
  TEXT = 'text',
  JSON = 'json',
  XML = 'xml',
  HTML = 'html',
  MARKDOWN = 'markdown',
  CUSTOM = 'custom',
}

/**
 * Debug console input types enum
 */
export enum DebugConsoleInputType {
  TEXT = 'text',
  COMMAND = 'command',
  EXPRESSION = 'expression',
  SCRIPT = 'script',
  CUSTOM = 'custom',
}
