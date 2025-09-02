/**
 * Command Manager Interface
 * 
 * Defines management functionality for command pattern implementations.
 * Handles command lifecycle, execution, and undo/redo management.
 */

import type { ICommand } from '../patterns/ICommand';
import type { IGameObject } from '../IGameObject';
// CommandManagerOperation is now imported from the centralized enum system

/**
 * Command manager configuration
 */
export interface CommandManagerConfig {
  maxCommands: number;
  maxHistorySize: number;
  enableUndoRedo: boolean;
  enableCommandValidation: boolean;
  enableCommandLogging: boolean;
  autoCleanup: boolean;
  metadata?: Record<string, any>;
}

/**
 * Command manager statistics
 */
export interface CommandManagerStatistics {
  totalCommands: number;
  activeCommands: number;
  totalExecutions: number;
  totalUndos: number;
  totalRedos: number;
  averageExecutionTime: number;
  lastExecutionTime: number;
  commandsByType: Record<string, number>;
  executionCounts: Record<string, number>;
}

/**
 * Command execution context
 */
export interface CommandExecutionContext {
  contextId: string;
  commandId: string;
  targetObject: IGameObject;
  executionParameters: Record<string, any>;
  executionMetadata?: Record<string, any>;
}

/**
 * Command execution result
 */
export interface CommandExecutionResult {
  success: boolean;
  result: any;
  executionTime: number;
  canUndo: boolean;
  errorMessage?: string;
  executionMetadata?: Record<string, any>;
}

/**
 * Command history entry
 */
export interface CommandHistoryEntry {
  entryId: string;
  commandId: string;
  executionResult: CommandExecutionResult;
  timestamp: number;
  entryMetadata?: Record<string, any>;
}

/**
 * Interface for command managers
 */
export interface ICommandManager {
  readonly commandManagerId: string;
  
  /** Command manager configuration */
  commandManagerConfig: CommandManagerConfig;
  
  /** Managed commands */
  managedCommands: Map<string, ICommand>;
  
  /** Command execution contexts */
  commandExecutionContexts: Map<string, CommandExecutionContext>;
  
  /** Command history */
  commandHistory: CommandHistoryEntry[];
  
  /** Command manager statistics */
  commandManagerStatistics: CommandManagerStatistics;
  
  /** Command manager metadata */
  commandManagerMetadata: Record<string, any>;
  
  /** Set command manager configuration */
  setCommandManagerConfig(config: CommandManagerConfig): this;
  
  /** Set command manager metadata */
  setCommandManagerMetadata(metadata: Record<string, any>): this;
  
  /** Get command manager configuration */
  getCommandManagerConfig(): CommandManagerConfig;
  
  /** Get managed commands */
  getManagedCommands(): Map<string, ICommand>;
  
  /** Get command execution contexts */
  getCommandExecutionContexts(): Map<string, CommandExecutionContext>;
  
  /** Get command history */
  getCommandHistory(): CommandHistoryEntry[];
  
  /** Get command manager statistics */
  getCommandManagerStatistics(): CommandManagerStatistics;
  
  /** Get command manager metadata */
  getCommandManagerMetadata(): Record<string, any>;
  
  /** Create command */
  createCommand(commandId: string): Promise<ICommand>;
  
  /** Destroy command */
  destroyCommand(commandId: string): Promise<boolean>;
  
  /** Manage command */
  manageCommand(command: ICommand): Promise<this>;
  
  /** Execute command */
  executeCommand(commandId: string, context: CommandExecutionContext): Promise<CommandExecutionResult>;
  
  /** Undo command */
  undoCommand(commandId: string): Promise<boolean>;
  
  /** Redo command */
  redoCommand(commandId: string): Promise<boolean>;
  
  /** Get command by ID */
  getCommand(commandId: string): ICommand | null;
  
  /** Check if command exists */
  hasCommand(commandId: string): boolean;
  
  /** Get commands by type */
  getCommandsByType(type: string): ICommand[];
  
  /** Get execution context by ID */
  getExecutionContext(contextId: string): CommandExecutionContext | null;
  
  /** Get history entry by ID */
  getHistoryEntry(entryId: string): CommandHistoryEntry | null;
  
  /** Get history for command */
  getHistoryForCommand(commandId: string): CommandHistoryEntry[];
  
  /** Validate command */
  validateCommand(command: ICommand): Promise<boolean>;
  
  /** Clear command history */
  clearCommandHistory(): Promise<this>;
  
  /** Clear history for command */
  clearHistoryForCommand(commandId: string): Promise<this>;
  
  /** Update command manager */
  updateCommandManager(deltaTime: number): void;
}
