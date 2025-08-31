import type { UnitContext } from '../interfaces/IUnit';
import type { IStrategyInput } from '../interfaces/IStrategyInput';
import { BaseUnitCommand } from './IUnitCommand';
import { SizeUnitStrategy } from '../strategies/SizeUnitStrategy';

/**
 * Calculate Size Command
 * Implements the Command pattern for size calculations
 */
export class CalculateSizeCommand extends BaseUnitCommand {
  private readonly input: IStrategyInput;
  private readonly context: UnitContext;
  private readonly strategy: SizeUnitStrategy;

  constructor(input: IStrategyInput, context: UnitContext) {
    super(`calculate-size-${Date.now()}`);
    this.input = input;
    this.context = context;
    this.strategy = new SizeUnitStrategy();
  }

  /**
   * Execute the size calculation command
   */
  execute(context: UnitContext): number {
    // Perform the calculation
    const result = this.strategy.calculate(this.input, context);

    // Set the result using the protected method
    this.setResult(result);

    return result;
  }

  /**
   * Undo the command by calling the base class undo
   */
  undo(): void {
    super.undo();
  }

  /**
   * Check if the command can be executed
   */
  canExecute(): boolean {
    return this.strategy.canHandle(this.input);
  }

  /**
   * Get command description
   */
  getDescription(): string {
    return `Calculate size for input: ${JSON.stringify(this.input)}`;
  }

  /**
   * Get input data
   */
  getInput(): IStrategyInput {
    return this.input;
  }

  /**
   * Get calculation context
   */
  getContext(): UnitContext {
    return this.context;
  }

  /**
   * Get the strategy used for calculation
   */
  getStrategy(): SizeUnitStrategy {
    return this.strategy;
  }
}
