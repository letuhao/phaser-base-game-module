import type { UnitContext } from '../interfaces/IUnit';
import type { IStrategyInput } from '../interfaces/IStrategyInput';
import { BaseUnitCommand } from './IUnitCommand';
import { PositionUnitStrategy } from '../strategies/PositionUnitStrategy';

/**
 * Calculate Position Command
 * Implements the Command pattern for position calculations
 */
export class CalculatePositionCommand extends BaseUnitCommand {
  private readonly input: IStrategyInput;
  private readonly context: UnitContext;
  private readonly strategy: PositionUnitStrategy;

  constructor(input: IStrategyInput, context: UnitContext) {
    super(`calculate-position-${Date.now()}`);
    this.input = input;
    this.context = context;
    this.strategy = new PositionUnitStrategy();
  }

  /**
   * Execute the position calculation command
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
    return `Calculate position for input: ${JSON.stringify(this.input)}`;
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
  getStrategy(): PositionUnitStrategy {
    return this.strategy;
  }
}
