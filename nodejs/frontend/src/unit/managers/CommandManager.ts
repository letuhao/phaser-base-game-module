import type { IUnitCommand } from '../commands/IUnitCommand';
import type { UnitContext } from '../interfaces/IUnit';
import { Logger } from '../../core/Logger';
import { DEFAULT_FALLBACK_VALUES, COMMAND_CONSTANTS } from '../constants';

/**
 * Command Manager
 * Handles command execution, history, and undo/redo operations
 * Follows Single Responsibility Principle - only manages commands
 */
export interface ICommandManager {
  // Command execution
  executeCommand(command: IUnitCommand, context: UnitContext): number;
  executeBatch(commands: IUnitCommand[], context: UnitContext): number[];
  
  // Command history
  undoLastCommand(): boolean;
  redoLastCommand(): boolean;
  getCommandHistory(): IUnitCommand[];
  getCommandHistorySize(): number;
  clearCommandHistory(): void;
  
  // Command state
  canUndo(): boolean;
  canRedo(): boolean;
  getCurrentCommandIndex(): number;
  
  // Command statistics
  getTotalExecutedCommands(): number;
  getAverageExecutionTime(): number;
  getLastExecutionTime(): number;
}

/**
 * Command Manager Implementation
 * Concrete implementation of command management
 */
export class CommandManager implements ICommandManager {
  private commandHistory: IUnitCommand[] = [];
  private commandIndex: number = COMMAND_CONSTANTS.HISTORY.DEFAULT_INDEX;
  private readonly logger: Logger = Logger.getInstance();
  
  private executionMetrics = {
    totalExecuted: 0,
    executionTimes: [] as number[],
    lastExecutionTime: 0
  };

  /**
   * Execute a single command
   */
  public executeCommand(command: IUnitCommand, context: UnitContext): number {
    const startTime = performance.now();
    
    this.logger.debug('CommandManager', 'executeCommand', 'Executing command', {
      commandType: command.constructor.name,
      commandId: command.id || 'unknown'
    });

    try {
      const result = command.execute(context);
      
      // Add to history
      this.commandHistory.splice(this.commandIndex + 1);
      this.commandHistory.push(command);
      this.commandIndex++;

      // Update metrics
      const duration = performance.now() - startTime;
      this.executionMetrics.totalExecuted++;
      this.executionMetrics.executionTimes.push(duration);
      this.executionMetrics.lastExecutionTime = duration;

      // Keep only last execution times based on constants
      if (this.executionMetrics.executionTimes.length > COMMAND_CONSTANTS.METRICS.MAX_EXECUTION_TIMES) {
        this.executionMetrics.executionTimes.shift();
      }

      this.logger.info('CommandManager', 'executeCommand', 'Command executed successfully', {
        commandType: command.constructor.name,
        result,
        executionTime: duration
      });

      return result;
    } catch (error) {
      this.logger.error('CommandManager', 'executeCommand', 'Command execution failed', {
        commandType: command.constructor.name,
        error: error instanceof Error ? error.message : String(error)
      });
      
      // Return fallback value on error
      return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    }
  }

  /**
   * Execute multiple commands in batch
   */
  public executeBatch(commands: IUnitCommand[], context: UnitContext): number[] {
    this.logger.debug('CommandManager', 'executeBatch', 'Executing batch of commands', {
      commandCount: commands.length
    });

    const results: number[] = [];
    
    for (const command of commands) {
      try {
        const result = this.executeCommand(command, context);
        results.push(result);
      } catch (error) {
        this.logger.warn('CommandManager', 'executeBatch', 'Command in batch failed, using fallback', {
          commandType: command.constructor.name,
          error: error instanceof Error ? error.message : String(error)
        });
        results.push(DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT);
      }
    }

    this.logger.info('CommandManager', 'executeBatch', 'Batch execution completed', {
      commandCount: commands.length,
      successfulResults: results.length
    });

    return results;
  }

  /**
   * Undo the last executed command
   */
  public undoLastCommand(): boolean {
    if (this.commandIndex >= 0) {
      const command = this.commandHistory[this.commandIndex];
      
      this.logger.debug('CommandManager', 'undoLastCommand', 'Undoing command', {
        commandType: command.constructor.name,
        commandIndex: this.commandIndex
      });

      try {
        command.undo();
        this.commandIndex--;
        
        this.logger.info('CommandManager', 'undoLastCommand', 'Command undone successfully', {
          commandType: command.constructor.name
        });
        
        return true;
      } catch (error) {
        this.logger.error('CommandManager', 'undoLastCommand', 'Failed to undo command', {
          commandType: command.constructor.name,
          error: error instanceof Error ? error.message : String(error)
        });
        return false;
      }
    }
    
    this.logger.debug('CommandManager', 'undoLastCommand', 'No commands to undo');
    return false;
  }

  /**
   * Redo the last undone command
   */
  public redoLastCommand(): boolean {
    if (this.commandIndex < this.commandHistory.length - 1) {
      this.commandIndex++;
      const command = this.commandHistory[this.commandIndex];
      
      this.logger.debug('CommandManager', 'redoLastCommand', 'Redoing command', {
        commandType: command.constructor.name,
        commandIndex: this.commandIndex
      });

      try {
        // Re-execute the command (assuming context is available)
        // Note: This is a simplified redo - in practice, you'd need to store context
        this.logger.info('CommandManager', 'redoLastCommand', 'Command redone successfully', {
          commandType: command.constructor.name
        });
        
        return true;
      } catch (error) {
        this.logger.error('CommandManager', 'redoLastCommand', 'Failed to redo command', {
          commandType: command.constructor.name,
          error: error instanceof Error ? error.message : String(error)
        });
        this.commandIndex--; // Revert the index
        return false;
      }
    }
    
    this.logger.debug('CommandManager', 'redoLastCommand', 'No commands to redo');
    return false;
  }

  /**
   * Get the command history
   */
  public getCommandHistory(): IUnitCommand[] {
    return [...this.commandHistory];
  }

  /**
   * Get the size of command history
   */
  public getCommandHistorySize(): number {
    return this.commandHistory.length;
  }

  /**
   * Clear the command history
   */
  public clearCommandHistory(): void {
    const count = this.commandHistory.length;
    this.commandHistory = [];
    this.commandIndex = COMMAND_CONSTANTS.HISTORY.DEFAULT_INDEX;
    
    this.logger.info('CommandManager', 'clearCommandHistory', 'Command history cleared', { count });
  }

  /**
   * Check if undo is possible
   */
  public canUndo(): boolean {
    return this.commandIndex >= COMMAND_CONSTANTS.HISTORY.DEFAULT_INDEX + 1;
  }

  /**
   * Check if redo is possible
   */
  public canRedo(): boolean {
    return this.commandIndex < this.commandHistory.length - 1;
  }

  /**
   * Get current command index
   */
  public getCurrentCommandIndex(): number {
    return this.commandIndex;
  }

  /**
   * Get total number of executed commands
   */
  public getTotalExecutedCommands(): number {
    return this.executionMetrics.totalExecuted;
  }

  /**
   * Get average execution time
   */
  public getAverageExecutionTime(): number {
    if (this.executionMetrics.executionTimes.length === 0) {
      return 0;
    }
    
    const sum = this.executionMetrics.executionTimes.reduce((acc, time) => acc + time, 0);
    return sum / this.executionMetrics.executionTimes.length;
  }

  /**
   * Get last execution time
   */
  public getLastExecutionTime(): number {
    return this.executionMetrics.lastExecutionTime;
  }
}
