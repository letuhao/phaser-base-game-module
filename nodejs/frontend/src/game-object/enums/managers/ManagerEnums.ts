/**
 * Manager System Enums
 *
 * Enums for manager operations and manager-specific functionality
 */

// ============================================================================
// MANAGER ENUMS
// ============================================================================

/**
 * Manager types enum
 */
export enum ManagerType {
  SINGLETON = 'singleton',
  BUILDER = 'builder',
  COMMAND = 'command',
  STRATEGY = 'strategy',
  OBSERVER = 'observer',
  DECORATOR = 'decorator',
  FACTORY = 'factory',
  CUSTOM = 'custom',
}

/**
 * Singleton manager operations enum
 */
export enum SingletonManagerOperation {
  CREATE = 'create',
  GET = 'get',
  DESTROY = 'destroy',
  RESET = 'reset',
  CUSTOM = 'custom',
}

/**
 * Builder manager operations enum
 */
export enum BuilderManagerOperation {
  CREATE = 'create',
  BUILD = 'build',
  DESTROY = 'destroy',
  RESET = 'reset',
  CUSTOM = 'custom',
}

/**
 * Command manager operations enum
 */
export enum CommandManagerOperation {
  EXECUTE = 'execute',
  UNDO = 'undo',
  REDO = 'redo',
  CLEAR = 'clear',
  CUSTOM = 'custom',
}

/**
 * Strategy manager operations enum
 */
export enum StrategyManagerOperation {
  SET = 'set',
  GET = 'get',
  REMOVE = 'remove',
  CLEAR = 'clear',
  CUSTOM = 'custom',
}

/**
 * Observer manager operations enum
 */
export enum ObserverManagerOperation {
  SUBSCRIBE = 'subscribe',
  UNSUBSCRIBE = 'unsubscribe',
  NOTIFY = 'notify',
  CLEAR = 'clear',
  CUSTOM = 'custom',
}

/**
 * Decorator manager operations enum
 */
export enum DecoratorManagerOperation {
  ADD = 'add',
  REMOVE = 'remove',
  GET = 'get',
  CLEAR = 'clear',
  CUSTOM = 'custom',
}

/**
 * Factory manager operations enum
 */
export enum FactoryManagerOperation {
  CREATE = 'create',
  REGISTER = 'register',
  UNREGISTER = 'unregister',
  CLEAR = 'clear',
  CUSTOM = 'custom',
}
