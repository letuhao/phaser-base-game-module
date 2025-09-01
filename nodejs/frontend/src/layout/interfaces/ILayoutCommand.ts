/**
 * Layout Command Pattern Interfaces
 * Enables undo/redo, queuing, and batch operations for layout changes
 * Based on the Command pattern for encapsulating layout operations
 */

import { 
  ILayout,
  ILayoutConfig,
  ILayoutContext,
  ICalculatedLayout
} from './ILayout';
import { 

  ValidationSeverity,
  LayoutChangeType
} from '../enums/LayoutEnums';

// ============================================================================
// COMMAND INTERFACES
// ============================================================================

/**
 * Base layout command interface
 * Defines the contract for all layout commands
 */
export interface ILayoutCommand {
  /** Command ID */
  readonly id: string;
  
  /** Command name */
  readonly name: string;
  
  /** Command description */
  readonly description: string;
  
  /** Whether the command can be undone */
  readonly canUndo: boolean;
  
  /** Whether the command can be redone */
  readonly canRedo: boolean;
  
  /** Command timestamp */
  readonly timestamp: number;
  
  /** Command priority */
  readonly priority: number;
  
  /**
   * Execute the command
   * @param context Execution context
   */
  execute(context: ILayoutCommandContext): Promise<ILayoutCommandResult>;
  
  /**
   * Undo the command
   * @param context Execution context
   */
  undo(context: ILayoutCommandContext): Promise<ILayoutCommandResult>;
  
  /**
   * Redo the command
   * @param context Execution context
   */
  redo(context: ILayoutCommandContext): Promise<ILayoutCommandResult>;
  
  /**
   * Validate the command before execution
   */
  validate(): ILayoutCommandValidationResult;
  
  /**
   * Get command metadata
   */
  getMetadata(): ILayoutCommandMetadata;
}

/**
 * Layout command context interface
 * Provides context for command execution
 */
export interface ILayoutCommandContext {
  /** Layout manager instance */
  layoutManager: any; // Will be ILayoutManager when implemented
  
  /** Current layout context */
  layoutContext: ILayoutContext;
  
  /** Command parameters */
  parameters: Record<string, unknown>;
  
  /** Execution options */
  options: {
    validateBeforeExecute: boolean;
    logExecution: boolean;
    enableRollback: boolean;
    timeout: number;
  };
  
  /** Custom context data */
  custom?: Record<string, unknown>;
}

/**
 * Layout command result interface
 * Contains the result of command execution
 */
export interface ILayoutCommandResult {
  /** Whether the command was successful */
  success: boolean;
  
  /** Error message if failed */
  error?: string;
  
  /** Result data */
  data?: {
    layout?: ILayout;
    calculatedLayout?: ICalculatedLayout;
    changes?: ILayoutChange[];
    metadata?: Record<string, unknown>;
  };
  
  /** Execution time in milliseconds */
  executionTime: number;
  
  /** Command metadata */
  metadata: ILayoutCommandMetadata;
}

/**
 * Layout command validation result interface
 */
export interface ILayoutCommandValidationResult {
  /** Whether the command is valid */
  isValid: boolean;
  
  /** Validation errors */
  errors: ICommandValidationError[];
  
  /** Validation warnings */
  warnings: ICommandValidationWarning[];
  
  /** Validation suggestions */
  suggestions: ICommandValidationSuggestion[];
}

/**
 * Command validation error interface
 */
export interface ICommandValidationError {
  /** Error code */
  code: string;
  
  /** Error message */
  message: string;
  
  /** Property path */
  path: string;
  
  /** Error severity */
  severity: ValidationSeverity;
  
  /** Suggested fix */
  suggestion?: string;
}

/**
 * Command validation warning interface
 */
export interface ICommandValidationWarning {
  /** Warning code */
  code: string;
  
  /** Warning message */
  message: string;
  
  /** Property path */
  path: string;
  
  /** Warning severity */
  severity: ValidationSeverity;
  
  /** Suggested improvement */
  suggestion?: string;
}

/**
 * Command validation suggestion interface
 */
export interface ICommandValidationSuggestion {
  /** Suggestion code */
  code: string;
  
  /** Suggestion message */
  message: string;
  
  /** Property path */
  path: string;
  
  /** Suggested value */
  suggestedValue?: unknown;
  
  /** Reason for suggestion */
  reason: string;
}

/**
 * Layout command metadata interface
 */
export interface ILayoutCommandMetadata {
  /** Command type */
  type: string;
  
  /** Command version */
  version: string;
  
  /** Command author */
  author?: string;
  
  /** Command tags */
  tags?: string[];
  
  /** Command category */
  category?: string;
  
  /** Performance characteristics */
  performance?: {
    estimatedExecutionTime: number;
    memoryUsage: number;
    complexity: string;
  };
  
  /** Custom metadata */
  custom?: Record<string, unknown>;
}

/**
 * Layout change interface
 * Represents a change made by a command
 */
export interface ILayoutChange {
  /** Change type */
  type: LayoutChangeType;
  
  /** Target layout ID */
  layoutId: string;
  
  /** Property path */
  path: string;
  
  /** Old value */
  oldValue: unknown;
  
  /** New value */
  newValue: unknown;
  
  /** Change timestamp */
  timestamp: number;
  
  /** Change metadata */
  metadata?: Record<string, unknown>;
}

// ============================================================================
// SPECIFIC COMMAND INTERFACES
// ============================================================================

/**
 * Create layout command interface
 */
export interface ICreateLayoutCommand extends ILayoutCommand {
  /** Layout configuration to create */
  readonly layoutConfig: ILayoutConfig;
  
  /** Layout ID to create */
  readonly layoutId: string;
}

/**
 * Update layout command interface
 */
export interface IUpdateLayoutCommand extends ILayoutCommand {
  /** Layout ID to update */
  readonly layoutId: string;
  
  /** Updated configuration */
  readonly updates: Partial<ILayoutConfig>;
  
  /** Update options */
  readonly updateOptions: {
    merge: boolean;
    validate: boolean;
    notify: boolean;
  };
}

/**
 * Delete layout command interface
 */
export interface IDeleteLayoutCommand extends ILayoutCommand {
  /** Layout ID to delete */
  readonly layoutId: string;
  
  /** Delete options */
  readonly deleteOptions: {
    cascade: boolean;
    backup: boolean;
    notify: boolean;
  };
}

/**
 * Move layout command interface
 */
export interface IMoveLayoutCommand extends ILayoutCommand {
  /** Layout ID to move */
  readonly layoutId: string;
  
  /** New position */
  readonly newPosition: {
    x: number;
    y: number;
    z?: number;
  };
  
  /** Move options */
  readonly moveOptions: {
    animate: boolean;
    validate: boolean;
    notify: boolean;
  };
}

/**
 * Resize layout command interface
 */
export interface IResizeLayoutCommand extends ILayoutCommand {
  /** Layout ID to resize */
  readonly layoutId: string;
  
  /** New size */
  readonly newSize: {
    width: number;
    height: number;
  };
  
  /** Resize options */
  readonly resizeOptions: {
    maintainAspectRatio: boolean;
    validate: boolean;
    notify: boolean;
  };
}

/**
 * Batch command interface
 * Groups multiple commands together
 */
export interface IBatchCommand extends ILayoutCommand {
  /** Commands in the batch */
  readonly commands: ILayoutCommand[];
  
  /** Batch options */
  readonly batchOptions: {
    atomic: boolean;
    rollbackOnError: boolean;
    parallel: boolean;
  };
}

// ============================================================================
// COMMAND MANAGER INTERFACES
// ============================================================================

/**
 * Layout command manager interface
 * Manages command execution, history, and undo/redo
 */
export interface ILayoutCommandManager {
  /** Command history */
  readonly history: ILayoutCommand[];
  
  /** Undo stack */
  readonly undoStack: ILayoutCommand[];
  
  /** Redo stack */
  readonly redoStack: ILayoutCommand[];
  
  /** Command queue */
  readonly commandQueue: ILayoutCommand[];
  
  /** Whether undo is available */
  readonly canUndo: boolean;
  
  /** Whether redo is available */
  readonly canRedo: boolean;
  
  /** Maximum history size */
  readonly maxHistorySize: number;
  
  /**
   * Execute a command
   * @param command Command to execute
   * @param context Execution context
   */
  executeCommand(command: ILayoutCommand, context?: Partial<ILayoutCommandContext>): Promise<ILayoutCommandResult>;
  
  /**
   * Execute multiple commands
   * @param commands Commands to execute
   * @param context Execution context
   */
  executeCommands(commands: ILayoutCommand[], context?: Partial<ILayoutCommandContext>): Promise<ILayoutCommandResult[]>;
  
  /**
   * Undo the last command
   * @param context Execution context
   */
  undo(context?: Partial<ILayoutCommandContext>): Promise<ILayoutCommandResult>;
  
  /**
   * Redo the last undone command
   * @param context Execution context
   */
  redo(context?: Partial<ILayoutCommandContext>): Promise<ILayoutCommandResult>;
  
  /**
   * Clear command history
   */
  clearHistory(): void;
  
  /**
   * Get command history
   * @param filter Filter function
   */
  getHistory(filter?: (command: ILayoutCommand) => boolean): ILayoutCommand[];
  
  /**
   * Get command statistics
   */
  getStatistics(): ICommandManagerStatistics;
  
  /**
   * Add command listener
   * @param listener Listener to add
   */
  addListener(listener: ICommandListener): void;
  
  /**
   * Remove command listener
   * @param listener Listener to remove
   */
  removeListener(listener: ICommandListener): boolean;
}

/**
 * Command listener interface
 */
export interface ICommandListener {
  /**
   * Called when a command is executed
   * @param command The command that was executed
   * @param result The execution result
   */
  onCommandExecuted?(command: ILayoutCommand, result: ILayoutCommandResult): void;
  
  /**
   * Called when a command is undone
   * @param command The command that was undone
   * @param result The undo result
   */
  onCommandUndone?(command: ILayoutCommand, result: ILayoutCommandResult): void;
  
  /**
   * Called when a command is redone
   * @param command The command that was redone
   * @param result The redo result
   */
  onCommandRedone?(command: ILayoutCommand, result: ILayoutCommandResult): void;
  
  /**
   * Called when command history is cleared
   */
  onHistoryCleared?(): void;
  
  /**
   * Called when an error occurs
   * @param error The error that occurred
   * @param command The command that caused the error
   */
  onError?(error: Error, command?: ILayoutCommand): void;
}

/**
 * Command manager statistics interface
 */
export interface ICommandManagerStatistics {
  /** Total commands executed */
  totalCommands: number;
  
  /** Total commands undone */
  totalUndone: number;
  
  /** Total commands redone */
  totalRedone: number;
  
  /** Current history size */
  historySize: number;
  
  /** Current undo stack size */
  undoStackSize: number;
  
  /** Current redo stack size */
  redoStackSize: number;
  
  /** Average execution time */
  averageExecutionTime: number;
  
  /** Error rate */
  errorRate: number;
  
  /** Performance metrics */
  performance: {
    totalExecutionTime: number;
    totalUndoTime: number;
    totalRedoTime: number;
    memoryUsage: number;
  };
}

// ============================================================================
// COMMAND FACTORY INTERFACES
// ============================================================================

/**
 * Layout command factory interface
 * Creates layout commands
 */
export interface ILayoutCommandFactory {
  /**
   * Create a command by type
   * @param type Command type
   * @param config Command configuration
   */
  createCommand(type: string, config: Record<string, unknown>): ILayoutCommand;
  
  /**
   * Create a create layout command
   * @param layoutConfig Layout configuration
   * @param layoutId Layout ID
   */
  createCreateCommand(layoutConfig: ILayoutConfig, layoutId: string): ICreateLayoutCommand;
  
  /**
   * Create an update layout command
   * @param layoutId Layout ID
   * @param updates Updates to apply
   * @param options Update options
   */
  createUpdateCommand(layoutId: string, updates: Partial<ILayoutConfig>, options?: Record<string, unknown>): IUpdateLayoutCommand;
  
  /**
   * Create a delete layout command
   * @param layoutId Layout ID
   * @param options Delete options
   */
  createDeleteCommand(layoutId: string, options?: Record<string, unknown>): IDeleteLayoutCommand;
  
  /**
   * Create a move layout command
   * @param layoutId Layout ID
   * @param newPosition New position
   * @param options Move options
   */
  createMoveCommand(layoutId: string, newPosition: { x: number; y: number; z?: number }, options?: Record<string, unknown>): IMoveLayoutCommand;
  
  /**
   * Create a resize layout command
   * @param layoutId Layout ID
   * @param newSize New size
   * @param options Resize options
   */
  createResizeCommand(layoutId: string, newSize: { width: number; height: number }, options?: Record<string, unknown>): IResizeLayoutCommand;
  
  /**
   * Create a batch command
   * @param commands Commands to batch
   * @param options Batch options
   */
  createBatchCommand(commands: ILayoutCommand[], options?: Record<string, unknown>): IBatchCommand;
  
  /**
   * Get available command types
   */
  getAvailableCommandTypes(): string[];
  
  /**
   * Get command configuration schema
   * @param type Command type
   */
  getCommandConfigSchema(type: string): Record<string, unknown>;
}
