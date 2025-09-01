import type { IUnitValidator } from '../validators/IUnitValidator';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import type { IValidationInput } from '../interfaces/IValidationInput';
import { Logger } from '../../core/Logger';

/**
 * Validation Manager
 * Handles validation operations, error tracking, and validation chain management
 * Follows Single Responsibility Principle - only manages validation
 */
export interface IValidationManager {
  // Validator management
  addValidator(validator: IUnitValidator): void;
  removeValidator(validator: IUnitValidator): boolean;
  
  // Validation operations
  validateUnit(unit: IUnit, context: UnitContext): boolean;
  validateInput(input: IValidationInput): boolean;
  validateBatch(units: IUnit[], context: UnitContext): boolean[];
  
  // Error management
  getValidationErrors(): string[];
  clearValidationErrors(): void;
  getErrorCount(): number;
  
  // Validator management
  getAllValidators(): IUnitValidator[];
  getValidatorCount(): number;
  clearValidators(): void;
  
  // Validation statistics
  getValidationStatistics(): {
    totalValidations: number;
    successfulValidations: number;
    failedValidations: number;
    successRate: number;
  };
}

/**
 * Validation Manager Implementation
 * Concrete implementation of validation management
 */
export class ValidationManager implements IValidationManager {
  private validators: IUnitValidator[] = [];
  private validationErrors: string[] = [];
  private readonly logger: Logger = Logger.getInstance();
  
  private validationMetrics = {
    totalValidations: 0,
    successfulValidations: 0,
    failedValidations: 0
  };

  /**
   * Add a validator to the validation chain
   */
  public addValidator(validator: IUnitValidator): void {
    this.logger.debug('ValidationManager', 'addValidator', 'Adding validator', {
      validatorType: validator.constructor.name
    });

    try {
      if (this.validateValidator(validator)) {
        this.validators.push(validator);
        this.logger.info('ValidationManager', 'addValidator', 'Validator added successfully', {
          validatorType: validator.constructor.name,
          totalValidators: this.validators.length
        });
      } else {
        throw new Error('Invalid validator provided');
      }
    } catch (error) {
      this.logger.error('ValidationManager', 'addValidator', 'Failed to add validator', {
        validatorType: validator.constructor.name,
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  /**
   * Remove a validator from the validation chain
   */
  public removeValidator(validator: IUnitValidator): boolean {
    const index = this.validators.indexOf(validator);
    if (index > -1) {
      this.validators.splice(index, 1);
      this.logger.info('ValidationManager', 'removeValidator', 'Validator removed successfully', {
        validatorType: validator.constructor.name,
        remainingValidators: this.validators.length
      });
      return true;
    }
    
    this.logger.debug('ValidationManager', 'removeValidator', 'Validator not found for removal', {
      validatorType: validator.constructor.name
    });
    return false;
  }

  /**
   * Validate a unit using the validation chain
   */
  public validateUnit(unit: IUnit, context: UnitContext): boolean {
    this.logger.debug('ValidationManager', 'validateUnit', 'Validating unit', {
      unitId: unit.id,
      unitType: unit.unitType
    });

    this.validationMetrics.totalValidations++;

    try {
      if (this.validators.length === 0) {
        this.logger.warn('ValidationManager', 'validateUnit', 'No validators registered, skipping validation');
        this.validationMetrics.successfulValidations++;
        return true;
      }

      // Create a validation chain
      let currentValidator = this.validators[0];
      for (let i = 1; i < this.validators.length; i++) {
        currentValidator.setNext(this.validators[i]);
        currentValidator = this.validators[i];
      }

      const isValid = currentValidator ? currentValidator.validate(unit, context) : true;
      
      if (isValid) {
        this.validationMetrics.successfulValidations++;
        this.logger.info('ValidationManager', 'validateUnit', 'Unit validation passed', {
          unitId: unit.id,
          unitType: unit.unitType
        });
      } else {
        this.validationMetrics.failedValidations++;
        const errorMessage = `Unit validation failed: ${unit.id} (${unit.unitType})`;
        this.validationErrors.push(errorMessage);
        this.logger.warn('ValidationManager', 'validateUnit', 'Unit validation failed', {
          unitId: unit.id,
          unitType: unit.unitType,
          errorMessage
        });
      }

      return isValid;
    } catch (error) {
      this.validationMetrics.failedValidations++;
      const errorMessage = `Validation error for unit ${unit.id}: ${error instanceof Error ? error.message : String(error)}`;
      this.validationErrors.push(errorMessage);
      
      this.logger.error('ValidationManager', 'validateUnit', 'Validation error occurred', {
        unitId: unit.id,
        unitType: unit.unitType,
        error: error instanceof Error ? error.message : String(error)
      });
      
      return false;
    }
  }

  /**
   * Validate an input using the validation chain
   */
  public validateInput(input: IValidationInput): boolean {
    this.logger.debug('ValidationManager', 'validateInput', 'Validating input', {
      inputType: input.constructor.name,
      inputId: 'id' in input ? input.id : 'unknown'
    });

    this.validationMetrics.totalValidations++;

    try {
      if (this.validators.length === 0) {
        this.logger.warn('ValidationManager', 'validateInput', 'No validators registered, skipping validation');
        this.validationMetrics.successfulValidations++;
        return true;
      }

      // For input validation, we'll use the first validator that can handle the input
      for (const validator of this.validators) {
        if (validator.canHandle(input)) {
          const isValid = validator.validate(input, {} as UnitContext);
          
          if (isValid) {
            this.validationMetrics.successfulValidations++;
            this.logger.info('ValidationManager', 'validateInput', 'Input validation passed', {
              inputType: input.constructor.name
            });
          } else {
            this.validationMetrics.failedValidations++;
            const errorMessage = `Input validation failed: ${input.constructor.name}`;
            this.validationErrors.push(errorMessage);
            this.logger.warn('ValidationManager', 'validateInput', 'Input validation failed', {
              inputType: input.constructor.name,
              errorMessage
            });
          }
          
          return isValid;
        }
      }

      // If no validator can handle the input, consider it valid
      this.validationMetrics.successfulValidations++;
      this.logger.info('ValidationManager', 'validateInput', 'No validator found for input, considering valid', {
        inputType: input.constructor.name
      });
      
      return true;
    } catch (error) {
      this.validationMetrics.failedValidations++;
      const errorMessage = `Validation error for input: ${error instanceof Error ? error.message : String(error)}`;
      this.validationErrors.push(errorMessage);
      
      this.logger.error('ValidationManager', 'validateInput', 'Validation error occurred', {
        inputType: input.constructor.name,
        error: error instanceof Error ? error.message : String(error)
      });
      
      return false;
    }
  }

  /**
   * Validate multiple units in batch
   */
  public validateBatch(units: IUnit[], context: UnitContext): boolean[] {
    this.logger.debug('ValidationManager', 'validateBatch', 'Validating batch of units', {
      unitCount: units.length
    });

    const results: boolean[] = [];
    
    for (const unit of units) {
      try {
        const result = this.validateUnit(unit, context);
        results.push(result);
      } catch (error) {
        this.logger.warn('ValidationManager', 'validateBatch', 'Unit validation in batch failed', {
          unitId: unit.id,
          error: error instanceof Error ? error.message : String(error)
        });
        results.push(false);
      }
    }

    this.logger.info('ValidationManager', 'validateBatch', 'Batch validation completed', {
      unitCount: units.length,
      successfulValidations: results.filter(r => r).length,
      failedValidations: results.filter(r => !r).length
    });

    return results;
  }

  /**
   * Get all validation errors
   */
  public getValidationErrors(): string[] {
    return [...this.validationErrors];
  }

  /**
   * Clear all validation errors
   */
  public clearValidationErrors(): void {
    const count = this.validationErrors.length;
    this.validationErrors = [];
    this.logger.info('ValidationManager', 'clearValidationErrors', 'Validation errors cleared', { count });
  }

  /**
   * Get the number of validation errors
   */
  public getErrorCount(): number {
    return this.validationErrors.length;
  }

  /**
   * Get all registered validators
   */
  public getAllValidators(): IUnitValidator[] {
    return [...this.validators];
  }

  /**
   * Get the number of registered validators
   */
  public getValidatorCount(): number {
    return this.validators.length;
  }

  /**
   * Clear all validators
   */
  public clearValidators(): void {
    const count = this.validators.length;
    this.validators = [];
    this.logger.info('ValidationManager', 'clearValidators', 'All validators cleared', { count });
  }

  /**
   * Get validation statistics
   */
  public getValidationStatistics(): {
    totalValidations: number;
    successfulValidations: number;
    failedValidations: number;
    successRate: number;
  } {
    const successRate = this.validationMetrics.totalValidations > 0 
      ? (this.validationMetrics.successfulValidations / this.validationMetrics.totalValidations) * 100 
      : 0;

    return {
      totalValidations: this.validationMetrics.totalValidations,
      successfulValidations: this.validationMetrics.successfulValidations,
      failedValidations: this.validationMetrics.failedValidations,
      successRate
    };
  }

  /**
   * Validate a validator before adding it
   */
  private validateValidator(validator: IUnitValidator): boolean {
    if (!validator) {
      this.logger.warn('ValidationManager', 'validateValidator', 'Validator is null or undefined');
      return false;
    }

    if (typeof validator.validate !== 'function') {
      this.logger.warn('ValidationManager', 'validateValidator', 'Missing validate method');
      return false;
    }

    this.logger.debug('ValidationManager', 'validateValidator', 'Validator validation passed', {
      validatorType: validator.constructor.name
    });
    return true;
  }
}
