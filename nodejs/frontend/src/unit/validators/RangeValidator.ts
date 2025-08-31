import type { IUnitValidator } from './IUnitValidator'
import type { UnitContext } from '../interfaces/IUnit'
import { BaseUnitValidator } from './IUnitValidator'

/**
 * Range Validator
 * Validates that unit values fall within specified min/max ranges
 */
export class RangeValidator extends BaseUnitValidator {
  private minValue: number
  private maxValue: number
  private inclusive: boolean

  constructor(
    name: string = 'RangeValidator',
    minValue: number = -Infinity,
    maxValue: number = Infinity,
    inclusive: boolean = true
  ) {
    super()
    this.minValue = minValue
    this.maxValue = maxValue
    this.inclusive = inclusive
  }

  /**
   * Get validator name
   */
  getName(): string {
    return 'RangeValidator'
  }

  /**
   * Check if this validator can handle the input
   */
  canHandle(input: any): boolean {
    return typeof input === 'number' || 
           (typeof input === 'object' && input !== null && typeof input.value === 'number')
  }

  /**
   * Perform the actual validation
   */
  protected performValidation(input: any, context: UnitContext): boolean {
    const value = this.extractValue(input)
    
    if (this.inclusive) {
      if (value < this.minValue || value > this.maxValue) {
        this.errorMessage = `Value ${value} is outside the allowed range [${this.minValue}, ${this.maxValue}]`
        return false
      }
    } else {
      if (value <= this.minValue || value >= this.maxValue) {
        this.errorMessage = `Value ${value} is outside the allowed range (${this.minValue}, ${this.maxValue})`
        return false
      }
    }

    // Value is valid, clear any previous error
    this.errorMessage = undefined
    return true
  }

  /**
   * Extract numeric value from input
   */
  private extractValue(input: any): number {
    if (typeof input === 'number') {
      return input
    }
    
    if (typeof input === 'object' && input !== null) {
      if (typeof input.value === 'number') {
        return input.value
      }
      
      if (typeof input.getValue === 'function') {
        return input.getValue()
      }
    }

    return 0
  }

  /**
   * Get validator configuration
   */
  getConfiguration() {
    return {
      minValue: this.minValue,
      maxValue: this.maxValue,
      inclusive: this.inclusive
    }
  }

  /**
   * Update validator configuration
   */
  updateConfiguration(config: { minValue?: number; maxValue?: number; inclusive?: boolean }) {
    if (config.minValue !== undefined) this.minValue = config.minValue
    if (config.maxValue !== undefined) this.maxValue = config.maxValue
    if (config.inclusive !== undefined) this.inclusive = config.inclusive
  }
}
