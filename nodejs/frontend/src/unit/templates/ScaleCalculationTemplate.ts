import type { IUnitCalculationTemplate } from './IUnitCalculationTemplate'
import type { UnitContext } from '../interfaces/IUnit'
import { ScaleUnitStrategy } from '../strategies/ScaleUnitStrategy'
import { RangeValidator } from '../validators/RangeValidator'
import { TypeValidator } from '../validators/TypeValidator'
import { UnitType } from '../enums/UnitType'
import { Dimension } from '../enums/Dimension'

/**
 * Scale Calculation Template
 * Implements the Template Method pattern for scale calculations
 * Provides hooks for customization while maintaining consistent calculation flow
 */
export abstract class ScaleCalculationTemplate implements IUnitCalculationTemplate {
  protected readonly strategy: ScaleUnitStrategy
  protected readonly validators: Array<RangeValidator | TypeValidator>
  protected readonly context: UnitContext

  constructor(context: UnitContext) {
    this.context = context
    this.strategy = new ScaleUnitStrategy()
    this.validators = this.createValidators()
  }

  /**
   * Template method for scale calculation
   * Defines the algorithm structure with customizable hooks
   */
  public calculate(input: any): number {
    try {
      // Step 1: Pre-calculation validation
      if (!this.preCalculationValidation(input)) {
        throw new Error('Pre-calculation validation failed')
      }

      // Step 2: Pre-calculation processing
      const processedInput = this.preCalculationProcessing(input)

      // Step 3: Strategy selection and calculation
      const result = this.performCalculation(processedInput)

      // Step 4: Post-calculation validation
      if (!this.postCalculationValidation(result)) {
        throw new Error('Post-calculation validation failed')
      }

      // Step 5: Post-calculation processing
      const finalResult = this.postCalculationProcessing(result)

      // Step 6: Log calculation completion
      this.logCalculationCompletion(input, finalResult)

      return finalResult

    } catch (error) {
      // Step 7: Error handling
      this.handleCalculationError(error, input)
      throw error
    }
  }

  /**
   * Create validators for scale calculations
   * Hook method that can be overridden
   */
  protected createValidators(): Array<RangeValidator | TypeValidator> {
    return [
      new RangeValidator('ScaleRangeValidator', 0.01, 10, true),
      new TypeValidator('ScaleTypeValidator', [UnitType.SCALE], [Dimension.X, Dimension.Y, Dimension.BOTH], false)
    ]
  }

  /**
   * Pre-calculation validation
   * Hook method that can be overridden
   */
  protected preCalculationValidation(input: any): boolean {
    // Run all validators
    for (const validator of this.validators) {
      if (!validator.validate(input, this.context)) {
        console.warn(`[ScaleCalculationTemplate] Validation failed: ${validator.getErrorMessage()}`)
        return false
      }
    }
    return true
  }

  /**
   * Pre-calculation processing
   * Hook method that can be overridden
   */
  protected preCalculationProcessing(input: any): any {
    // Default implementation: return input as-is
    return input
  }

  /**
   * Perform the actual calculation using strategy
   * Hook method that can be overridden
   */
  protected performCalculation(input: any): number {
    return this.strategy.calculate(input, this.context)
  }

  /**
   * Post-calculation validation
   * Hook method that can be overridden
   */
  protected postCalculationValidation(result: number): boolean {
    // Default validation: check if result is a valid number
    return typeof result === 'number' && !isNaN(result) && isFinite(result)
  }

  /**
   * Post-calculation processing
   * Hook method that can be overridden
   */
  protected postCalculationProcessing(result: number): number {
    // Default implementation: apply rounding and bounds
    return this.applyRoundingAndBounds(result)
  }

  /**
   * Log calculation completion
   * Hook method that can be overridden
   */
  protected logCalculationCompletion(input: any, result: number): void {
    console.debug(`[ScaleCalculationTemplate] Calculation completed:`, {
      input,
      result,
      context: this.context
    })
  }

  /**
   * Handle calculation errors
   * Hook method that can be overridden
   */
  protected handleCalculationError(error: any, input: any): void {
    console.error(`[ScaleCalculationTemplate] Calculation error:`, {
      error: error.message,
      input,
      context: this.context,
      stack: error.stack
    })
  }

  /**
   * Apply rounding and bounds to result
   * Hook method that can be overridden
   */
  protected applyRoundingAndBounds(result: number): number {
    // Default implementation: round to 3 decimal places for scale precision
    return Math.round(result * 1000) / 1000
  }

  /**
   * Get calculation statistics
   */
  public getCalculationStats(): {
    totalCalculations: number
    validationFailures: number
    calculationErrors: number
    averageResult: number
  } {
    // This would track statistics over time
    // For now, return placeholder data
    return {
      totalCalculations: 0,
      validationFailures: 0,
      calculationErrors: 0,
      averageResult: 0
    }
  }

  /**
   * Reset calculation statistics
   */
  public resetStats(): void {
    // Reset all statistics
    console.debug('[ScaleCalculationTemplate] Statistics reset')
  }

  /**
   * Get validator information
   */
  public getValidatorInfo(): Array<{ name: string; type: string; enabled: boolean }> {
    return this.validators.map(validator => ({
      name: validator.getName(),
      type: validator.constructor.name,
      enabled: true
    }))
  }

  /**
   * Add custom validator
   */
  public addValidator(validator: RangeValidator | TypeValidator): void {
    this.validators.push(validator)
  }

  /**
   * Remove validator by name
   */
  public removeValidator(name: string): void {
    const index = this.validators.findIndex(v => v.getName() === name)
    if (index !== -1) {
      this.validators.splice(index, 1)
    }
  }

  /**
   * Get context information
   */
  public getContext(): UnitContext {
    return this.context
  }

  /**
   * Update context
   */
  public updateContext(newContext: Partial<UnitContext>): void {
    Object.assign(this.context, newContext)
  }

  /**
   * Get calculation metadata
   */
  public getCalculationMetadata() {
    return {
      templateName: this.constructor.name,
      version: '1.0.0',
      supportedInputs: this.getSupportedInputs(),
      calculationSteps: this.getCalculationSteps()
    }
  }

  /**
   * Check if the template can handle the input
   */
  public canHandle(input: any): boolean {
    return this.getSupportedInputs().some(type => 
      typeof input === type || input?.constructor?.name === type
    )
  }

  /**
   * Get performance metrics
   */
  public getPerformanceMetrics() {
    return {
      totalTime: 0,
      stepTimes: {},
      memoryUsage: 0
    }
  }

  /**
   * Abstract methods for metadata
   */
  protected abstract getSupportedInputs(): string[]
  protected abstract getCalculationSteps(): string[]
}
