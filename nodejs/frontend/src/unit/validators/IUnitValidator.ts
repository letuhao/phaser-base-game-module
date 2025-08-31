import type { UnitContext } from '../interfaces/IUnit'

/**
 * Unit Validator Interface
 * Part of the Chain of Responsibility pattern for unit validation
 */
export interface IUnitValidator {
  /** Set the next validator in the chain */
  setNext(validator: IUnitValidator): IUnitValidator
  
  /** Get the next validator in the chain */
  getNext(): IUnitValidator | undefined
  
  /** Validate the input and pass to next validator if valid */
  validate(input: any, context: UnitContext): boolean
  
  /** Get the validator name for debugging */
  getName(): string
  
  /** Get validation error message if validation fails */
  getErrorMessage(): string | undefined
  
  /** Check if this validator can handle the input type */
  canHandle(input: any): boolean
}

/**
 * Base Unit Validator Implementation
 * Provides common functionality for all validators
 */
export abstract class BaseUnitValidator implements IUnitValidator {
  private nextValidator?: IUnitValidator
  protected errorMessage?: string
  
  setNext(validator: IUnitValidator): IUnitValidator {
    this.nextValidator = validator
    return validator
  }
  
  getNext(): IUnitValidator | undefined {
    return this.nextValidator
  }
  
  validate(input: any, context: UnitContext): boolean {
    // Check if this validator can handle the input
    if (!this.canHandle(input)) {
      // Pass to next validator if we can't handle it
      return this.nextValidator?.validate(input, context) ?? true
    }
    
    // Perform validation
    const isValid = this.performValidation(input, context)
    
    if (isValid && this.nextValidator) {
      // Pass to next validator if validation passed
      return this.nextValidator.validate(input, context)
    }
    
    return isValid
  }
  
  getErrorMessage(): string | undefined {
    return this.errorMessage
  }
  
  abstract getName(): string
  abstract canHandle(input: any): boolean
  protected abstract performValidation(input: any, context: UnitContext): boolean
}

/**
 * Unit Validation Chain
 * Manages a chain of validators
 */
export interface IUnitValidationChain {
  /** Add a validator to the chain */
  addValidator(validator: IUnitValidator): IUnitValidationChain
  
  /** Remove a validator from the chain */
  removeValidator(validator: IUnitValidator): boolean
  
  /** Get all validators in the chain */
  getValidators(): IUnitValidator[]
  
  /** Validate input using the entire chain */
  validate(input: any, context: UnitContext): boolean
  
  /** Get all validation errors from the chain */
  getValidationErrors(): string[]
  
  /** Clear all validation errors */
  clearValidationErrors(): void
  
  /** Check if the chain is empty */
  isEmpty(): boolean
}

/**
 * Unit Validation Result
 * Contains validation results and error information
 */
export interface IUnitValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  validationTime: number
  validatorsUsed: string[]
}
