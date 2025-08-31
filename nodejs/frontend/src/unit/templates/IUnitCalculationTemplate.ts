import type { UnitContext } from '../interfaces/IUnit';
import type { IUnitValidationResult } from '../validators/IUnitValidator';
import type { ITemplateInput } from '../interfaces/ITemplateInput';

/**
 * Unit Calculation Template Interface
 * Defines the skeleton of unit calculations using the Template Method pattern
 */
export interface IUnitCalculationTemplate {
  /** Execute the complete calculation process */
  calculate(input: ITemplateInput, context: UnitContext): number;

  /** Get calculation metadata */
  getCalculationMetadata(): {
    templateName: string;
    version: string;
    supportedInputs: string[];
    calculationSteps: string[];
  };

  /** Check if the template can handle the input */
  canHandle(input: ITemplateInput): boolean;

  /** Get calculation performance metrics */
  getPerformanceMetrics(): {
    totalTime: number;
    stepTimes: Record<string, number>;
    memoryUsage: number;
  };
}

/**
 * Base Unit Calculation Template
 * Implements the template method pattern for unit calculations
 */
export abstract class BaseUnitCalculationTemplate implements IUnitCalculationTemplate {
  private startTime: number = 0;
  private stepTimes: Record<string, number> = {};
  private memoryUsage: number = 0;

  /**
   * Template method - defines the algorithm structure
   */
  calculate(input: ITemplateInput, context: UnitContext): number {
    this.startTime = performance.now();

    try {
      // Step 1: Pre-calculation validation
      this.startStep('validation');
      const validationResult = this.validateInput(input, context);
      this.endStep('validation');

      if (!validationResult.isValid) {
        throw new Error(`Input validation failed: ${validationResult.errors.join(', ')}`);
      }

      // Step 2: Pre-process input
      this.startStep('preprocessing');
      const processedInput = this.preprocessInput(input, context);
      this.endStep('preprocessing');

      // Step 3: Perform calculation
      this.startStep('calculation');
      const result = this.performCalculation(processedInput, context);
      this.endStep('calculation');

      // Step 4: Post-process result
      this.startStep('postprocessing');
      const finalResult = this.postprocessResult(result, context);
      this.endStep('postprocessing');

      // Step 5: Final validation
      this.startStep('finalValidation');
      this.validateResult(finalResult, context);
      this.endStep('finalValidation');

      return finalResult;
    } catch (error) {
      this.handleCalculationError(
        error instanceof Error ? error : new Error(String(error)),
        input,
        context
      );
      throw error;
    } finally {
      this.cleanup();
    }
  }

  /**
   * Abstract methods that subclasses must implement
   */
  protected abstract validateInput(input: ITemplateInput, context: UnitContext): IUnitValidationResult;
  protected abstract preprocessInput(input: ITemplateInput, context: UnitContext): ITemplateInput;
  protected abstract performCalculation(input: ITemplateInput, context: UnitContext): number;
  protected abstract postprocessResult(result: number, context: UnitContext): number;
  protected abstract validateResult(result: number, context: UnitContext): void;

  /**
   * Hook methods that subclasses can override
   */
  protected onCalculationStart(_input: ITemplateInput, _context: UnitContext): void {
    // Default implementation - can be overridden
  }

  protected onCalculationComplete(_result: number, _context: UnitContext): void {
    // Default implementation - can be overridden
  }

  protected onCalculationError(_error: Error, _input: ITemplateInput, _context: UnitContext): void {
    // Default implementation - can be overridden
  }

  protected onStepComplete(_stepName: string, _duration: number): void {
    // Default implementation - can be overridden
  }

  /**
   * Performance tracking methods
   */
  private startStep(stepName: string): void {
    this.stepTimes[stepName] = performance.now();
  }

  private endStep(stepName: string): void {
    if (this.stepTimes[stepName]) {
      const duration = performance.now() - this.stepTimes[stepName];
      this.stepTimes[stepName] = duration;
      this.onStepComplete(stepName, duration);
    }
  }

  /**
   * Error handling
   */
  private handleCalculationError(error: Error, input: ITemplateInput, context: UnitContext): void {
    this.onCalculationError(error, input, context);
  }

  /**
   * Cleanup
   */
  private cleanup(): void {
    // Reset performance tracking
    this.startTime = 0;
    this.stepTimes = {};
    this.memoryUsage = 0;
  }

  /**
   * Get calculation metadata
   */
  getCalculationMetadata() {
    return {
      templateName: this.constructor.name,
      version: '1.0.0',
      supportedInputs: this.getSupportedInputs(),
      calculationSteps: this.getCalculationSteps(),
    };
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics() {
    const totalTime = performance.now() - this.startTime;
    return {
      totalTime,
      stepTimes: { ...this.stepTimes },
      memoryUsage: this.memoryUsage,
    };
  }

  /**
   * Abstract methods for metadata
   */
  protected abstract getSupportedInputs(): string[];
  protected abstract getCalculationSteps(): string[];

  /**
   * Default implementation for canHandle
   */
  canHandle(input: ITemplateInput): boolean {
    return this.getSupportedInputs().some(
      type => input.type === type || input?.constructor?.name === type
    );
  }
}
