/**
 * Command Pattern Interface
 * 
 * Defines command functionality for game objects.
 * Handles action execution, undo/redo, and command queuing.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType, CommandType, CommandState, CommandPriority } from '../../enums';
import * as Phaser from 'phaser';

/**
 * Command configuration
 */
export interface CommandConfig {
  type: CommandType;
  name: string;
  priority: CommandPriority;
  undoable: boolean;
  async: boolean;
  timeout: number;
  metadata?: any;
}

/**
 * Command context
 */
export interface CommandContext {
  object: IGameObject;
  scene: Phaser.Scene;
  deltaTime: number;
  input?: any;
  parameters?: any;
  metadata?: any;
}

/**
 * Interface for command game objects
 * 
 * Extends IGameObject with command pattern functionality.
 */
export interface ICommand extends IGameObject {
  readonly gameObjectType: GameObjectType;
  
  /** Command type */
  commandType: CommandType;
  
  /** Command state */
  commandState: CommandState;
  
  /** Command manager */
  commandManager: any; // ICommandManager
  
  /** Command ID */
  commandId: string;
  
  /** Command name */
  commandName: string;
  
  /** Command configuration */
  commandConfig: CommandConfig;
  
  /** Command context */
  commandContext: CommandContext;
  
  /** Command queue */
  commandQueue: ICommand[];
  
  /** Command history */
  commandHistory: ICommand[];
  
  /** Command max history */
  commandMaxHistory: number;
  
  /** Command undo stack */
  commandUndoStack: ICommand[];
  
  /** Command redo stack */
  commandRedoStack: ICommand[];
  
  /** Command max undo */
  commandMaxUndo: number;
  
  /** Command execution time */
  commandExecutionTime: number;
  
  /** Command timeout */
  commandTimeout: number;
  
  /** Command metadata */
  commandMetadata: any;
  
  /** Set command type */
  setCommandType(type: CommandType): this;
  
  /** Set command state */
  setCommandState(state: CommandState): this;
  
  /** Set command manager */
  setCommandManager(manager: any): this;
  
  /** Set command ID */
  setCommandId(id: string): this;
  
  /** Set command name */
  setCommandName(name: string): this;
  
  /** Set command configuration */
  setCommandConfig(config: CommandConfig): this;
  
  /** Set command context */
  setCommandContext(context: CommandContext): this;
  
  /** Set command queue */
  setCommandQueue(queue: ICommand[]): this;
  
  /** Set command history */
  setCommandHistory(history: ICommand[]): this;
  
  /** Set command max history */
  setCommandMaxHistory(max: number): this;
  
  /** Set command undo stack */
  setCommandUndoStack(stack: ICommand[]): this;
  
  /** Set command redo stack */
  setCommandRedoStack(stack: ICommand[]): this;
  
  /** Set command max undo */
  setCommandMaxUndo(max: number): this;
  
  /** Set command execution time */
  setCommandExecutionTime(time: number): this;
  
  /** Set command timeout */
  setCommandTimeout(timeout: number): this;
  
  /** Set command metadata */
  setCommandMetadata(metadata: any): this;
  
  /** Get command type */
  getCommandType(): CommandType;
  
  /** Get command state */
  getCommandState(): CommandState;
  
  /** Get command manager */
  getCommandManager(): any;
  
  /** Get command ID */
  getCommandId(): string;
  
  /** Get command name */
  getCommandName(): string;
  
  /** Get command configuration */
  getCommandConfig(): CommandConfig;
  
  /** Get command context */
  getCommandContext(): CommandContext;
  
  /** Get command queue */
  getCommandQueue(): ICommand[];
  
  /** Get command history */
  getCommandHistory(): ICommand[];
  
  /** Get command max history */
  getCommandMaxHistory(): number;
  
  /** Get command undo stack */
  getCommandUndoStack(): ICommand[];
  
  /** Get command redo stack */
  getCommandRedoStack(): ICommand[];
  
  /** Get command max undo */
  getCommandMaxUndo(): number;
  
  /** Get command execution time */
  getCommandExecutionTime(): number;
  
  /** Get command timeout */
  getCommandTimeout(): number;
  
  /** Get command metadata */
  getCommandMetadata(): any;
  
  /** Execute command */
  executeCommand(): Promise<any>;
  
  /** Undo command */
  undoCommand(): Promise<any>;
  
  /** Redo command */
  redoCommand(): Promise<any>;
  
  /** Queue command */
  queueCommand(command: ICommand): this;
  
  /** Execute next command */
  executeNextCommand(): Promise<any>;
  
  /** Clear command queue */
  clearCommandQueue(): this;
  
  /** Clear command history */
  clearCommandHistory(): this;
  
  /** Clear undo stack */
  clearUndoStack(): this;
  
  /** Clear redo stack */
  clearRedoStack(): this;
  
  /** Check if can undo */
  canUndo(): boolean;
  
  /** Check if can redo */
  canRedo(): boolean;
  
  /** Check if command is undoable */
  isCommandUndoable(): boolean;
  
  /** Check if command is async */
  isCommandAsync(): boolean;
  
  /** Check if command has timed out */
  hasCommandTimedOut(): boolean;
  
  /** Update command */
  updateCommand(deltaTime: number): void;
}
