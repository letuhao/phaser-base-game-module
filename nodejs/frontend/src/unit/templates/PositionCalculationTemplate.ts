import type { IUnitCalculationTemplate } from './IUnitCalculationTemplate'
import type { UnitContext } from '../interfaces/IUnit'
import { PositionUnitStrategy } from '../strategies/PositionUnitStrategy'
import { RangeValidator } from '../validators/RangeValidator'
import { TypeValidator } from '../validators/TypeValidator'
import { UnitType } from '../enums/UnitType'
import { Dimension } from '../enums/Dimension'
import { Logger } from '../../core/Logger'

/**
 * Position Calculation Template
 * Implements the Template Method pattern for position calculations
 * Provides hooks for customization while maintaining consistent calculation flow
 */
export abstract class PositionCalculationTemplate implements IUnitCalculationTemplate {
  protected readonly strategy: PositionUnitStrategy
  protected readonly validators: Array<RangeValidator | TypeValidator>
  protected readonly context: UnitContext
  protected readonly logger: Logger = Logger.getInstance()

  constructor(context: UnitContext) {
    this.context = context
    this.strategy = new PositionUnitStrategy()
    this.validators = this.createValidators()
  }

  /**
   * Template method for position calculation
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
   * Create validators for position calculations
   * Hook method that can be overridden
   */
  protected createValidators(): Array<RangeValidator | TypeValidator> {
    return [
      new RangeValidator('PositionRangeValidator', -10000, 10000, true),
      new TypeValidator('PositionTypeValidator', [UnitType.POSITION], [Dimension.X, Dimension.Y, Dimension.BOTH], false)
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
        this.logger.warn('PositionCalculationTemplate', 'preCalculationValidation', `Validation failed: ${validator.getErrorMessage()}`)
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
    this.logger.debug('PositionCalculationTemplate', 'logCalculationCompletion', 'Calculation completed', {
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
    this.logger.error('PositionCalculationTemplate', 'handleCalculationError', 'Calculation error', {
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
    // Default implementation: round to 2 decimal places
    return Math.round(result * 100) / 100
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
    this.logger.debug('PositionCalculationTemplate', 'resetStats', 'Statistics reset')
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
