import type { IUnitCommand } from './IUnitCommand'
import type { UnitContext } from '../interfaces/IUnit'
import { BaseUnitCommand } from './IUnitCommand'
import { CalculateSizeCommand } from './CalculateSizeCommand'
import { CalculatePositionCommand } from './CalculatePositionCommand'

/**
 * Batch Calculation Command
 * Executes multiple unit calculations in sequence
 */
export class BatchCalculationCommand extends BaseUnitCommand {
  private readonly commands: IUnitCommand[]
  private readonly context: UnitContext
  private executionResults: number[] = []
  private previousResults: number[] = []

  constructor(commands: IUnitCommand[], context: UnitContext) {
    super(`batch-calculation-${Date.now()}`)
    this.commands = commands
    this.context = context
  }

  /**
   * Execute all commands in the batch
   */
  execute(context: UnitContext): number {
    // Store previous results for undo
    this.previousResults = [...this.executionResults]

    // Clear current results
    this.executionResults = []

    // Execute each command
    for (const command of this.commands) {
      if (command.canExecute()) {
        try {
          const result = command.execute(context)
          this.executionResults.push(result)
        } catch (error) {
          console.error(`Error executing command: ${command.getDescription()}`, error)
          this.executionResults.push(0) // Default fallback
        }
      } else {
        console.warn(`Command cannot be executed: ${command.getDescription()}`)
        this.executionResults.push(0) // Default fallback
      }
    }

    // Calculate aggregate result (average of all results)
    const aggregateResult = this.executionResults.length > 0
      ? this.executionResults.reduce((sum, val) => sum + val, 0) / this.executionResults.length
      : 0

    // Set the result using the protected method
    this.setResult(aggregateResult)
    
    return aggregateResult
  }

  /**
   * Undo all commands in the batch
   */
  undo(): void {
    // Restore previous results
    this.executionResults = [...this.previousResults]
    
    // Calculate aggregate result from previous results
    const aggregateResult = this.previousResults.length > 0
      ? this.previousResults.reduce((sum, val) => sum + val, 0) / this.previousResults.length
      : 0

    // Set the result using the protected method
    this.setResult(aggregateResult)

    // Undo individual commands if they support it
    for (const command of this.commands) {
      if (typeof command.undo === 'function') {
        command.undo()
      }
    }
  }

  /**
   * Check if the batch can be executed
   */
  canExecute(): boolean {
    return this.commands.length > 0 && this.commands.some(cmd => cmd.canExecute())
  }

  /**
   * Get command description
   */
  getDescription(): string {
    return `Batch calculation of ${this.commands.length} commands`
  }

  /**
   * Get individual command results
   */
  getExecutionResults(): number[] {
    return [...this.executionResults]
  }

  /**
   * Get previous results
   */
  getPreviousResults(): number[] {
    return [...this.previousResults]
  }

  /**
   * Get commands in the batch
   */
  getCommands(): IUnitCommand[] {
    return [...this.commands]
  }

  /**
   * Add a command to the batch
   */
  addCommand(command: IUnitCommand): void {
    this.commands.push(command)
  }

  /**
   * Remove a command from the batch
   */
  removeCommand(commandId: string): boolean {
    const index = this.commands.findIndex(cmd => cmd.id === commandId)
    if (index > -1) {
      this.commands.splice(index, 1)
      return true
    }
    return false
  }

  /**
   * Clear all commands from the batch
   */
  clearCommands(): void {
    this.commands.length = 0
    this.executionResults = []
    this.previousResults = []
  }

  /**
   * Get batch statistics
   */
  getBatchStatistics(): {
    totalCommands: number
    executedCommands: number
    failedCommands: number
    averageResult: number
    minResult: number
    maxResult: number
  } {
    const validResults = this.executionResults.filter(r => r !== 0)
    const failedCount = this.executionResults.length - validResults.length

    return {
      totalCommands: this.commands.length,
      executedCommands: validResults.length,
      failedCommands: failedCount,
      averageResult: validResults.length > 0
        ? validResults.reduce((sum, val) => sum + val, 0) / validResults.length
        : 0,
      minResult: validResults.length > 0 ? Math.min(...validResults) : 0,
      maxResult: validResults.length > 0 ? Math.max(...validResults) : 0
    }
  }
}
