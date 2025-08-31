import type { UnitContext } from '../interfaces/IUnit'

/**
 * Unit Command Interface
 * Encapsulates unit calculations as commands that can be queued, undone, or logged
 */
export interface IUnitCommand {
  /** Unique identifier for the command */
  readonly id: string
  
  /** Execute the unit calculation */
  execute(context: UnitContext): number
  
  /** Undo the last execution (restore previous value) */
  undo(): void
  
  /** Check if the command can be executed */
  canExecute(): boolean
  
  /** Get the command description */
  getDescription(): string
  
  /** Get the timestamp when the command was created */
  getTimestamp(): Date
  
  /** Get the current result of the command */
  getResult(): number | undefined
  
  /** Get the previous result (for undo functionality) */
  getPreviousResult(): number | undefined
}

/**
 * Base Unit Command Implementation
 * Provides common functionality for all unit commands
 */
export abstract class BaseUnitCommand implements IUnitCommand {
  readonly id: string
  private timestamp: Date
  private result?: number
  private previousResult?: number
  
  constructor(id: string) {
    this.id = id
    this.timestamp = new Date()
  }
  
  abstract execute(context: UnitContext): number
  abstract canExecute(): boolean
  abstract getDescription(): string
  
  undo(): void {
    if (this.previousResult !== undefined) {
      this.result = this.previousResult
      this.previousResult = undefined
    }
  }
  
  getTimestamp(): Date {
    return this.timestamp
  }
  
  getResult(): number | undefined {
    return this.result
  }
  
  getPreviousResult(): number | undefined {
    return this.previousResult
  }
  
  protected setResult(value: number): void {
    this.previousResult = this.result
    this.result = value
  }
}

/**
 * Unit Command Executor
 * Manages command execution, history, and undo functionality
 */
export interface IUnitCommandExecutor {
  /** Execute a command */
  executeCommand(command: IUnitCommand, context: UnitContext): number
  
  /** Undo the last executed command */
  undoLastCommand(): boolean
  
  /** Redo the last undone command */
  redoLastCommand(): boolean
  
  /** Get command execution history */
  getHistory(): IUnitCommand[]
  
  /** Clear command history */
  clearHistory(): void
  
  /** Get the current command stack */
  getCommandStack(): IUnitCommand[]
}
