/**
 * Design Pattern Enums
 *
 * Enums for design patterns and their specific functionality
 */

// ============================================================================
// PATTERN ENUMS
// ============================================================================

/**
 * Observer types enum
 */
export enum ObserverType {
  SIMPLE = 'simple',
  ADVANCED = 'advanced',
  CUSTOM = 'custom',
}

/**
 * Observer states enum
 */
export enum ObserverState {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DESTROYED = 'destroyed',
  CUSTOM = 'custom',
}

/**
 * Decorator types enum
 */
export enum DecoratorType {
  SIMPLE = 'simple',
  ADVANCED = 'advanced',
  CUSTOM = 'custom',
}

/**
 * Decorator states enum
 */
export enum DecoratorState {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DESTROYED = 'destroyed',
  CUSTOM = 'custom',
}

/**
 * Factory types enum
 */
export enum FactoryType {
  SIMPLE = 'simple',
  ABSTRACT = 'abstract',
  BUILDER = 'builder',
  CUSTOM = 'custom',
}

/**
 * Factory states enum
 */
export enum FactoryState {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DESTROYED = 'destroyed',
  CUSTOM = 'custom',
}

/**
 * Singleton types enum
 */
export enum SingletonType {
  EAGER = 'eager',
  LAZY = 'lazy',
  THREAD_SAFE = 'thread-safe',
  CUSTOM = 'custom',
}

/**
 * Singleton states enum
 */
export enum SingletonState {
  NOT_INITIALIZED = 'not-initialized',
  INITIALIZED = 'initialized',
  DESTROYED = 'destroyed',
  CUSTOM = 'custom',
}

/**
 * Command types enum
 */
export enum CommandType {
  SIMPLE = 'simple',
  COMPOSITE = 'composite',
  UNDOABLE = 'undoable',
  CUSTOM = 'custom',
}

/**
 * Command states enum
 */
export enum CommandState {
  PENDING = 'pending',
  EXECUTING = 'executing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  CUSTOM = 'custom',
}

/**
 * Command priority levels enum
 */
export enum CommandPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  CRITICAL = 'critical',
  CUSTOM = 'custom',
}

/**
 * Strategy types enum
 */
export enum StrategyType {
  SIMPLE = 'simple',
  ADVANCED = 'advanced',
  CUSTOM = 'custom',
}

/**
 * Strategy states enum
 */
export enum StrategyState {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DESTROYED = 'destroyed',
  CUSTOM = 'custom',
}

/**
 * Builder types enum
 */
export enum BuilderType {
  SIMPLE = 'simple',
  ADVANCED = 'advanced',
  CUSTOM = 'custom',
}

/**
 * Builder states enum
 */
export enum BuilderState {
  INACTIVE = 'inactive',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  DESTROYED = 'destroyed',
  CUSTOM = 'custom',
}
