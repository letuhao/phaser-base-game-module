import { BaseUnitDecorator } from './IUnitDecorator';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { UnitType } from '../enums/UnitType';
import { VALIDATION_CONSTANTS } from '../constants';

/**
 * Validation Decorator
 * Validates unit calculation results and context
 */
export class ValidationDecorator extends BaseUnitDecorator {
  private validationRules: Array<{
    name: string;
    validator: (result: number, context: UnitContext) => boolean;
    errorMessage: string;
  }> = [];

  private validationErrors: Array<{
    rule: string;
    message: string;
    timestamp: Date;
    context: UnitContext;
  }> = [];

  private validationCount: number = 0;

  constructor(
    id: string,
    name: string,
    wrappedUnit: IUnit
  ) {
    super(id, name, UnitType.SIZE, wrappedUnit);
    this.setupDefaultValidationRules();
  }

  protected beforeCalculation(context: UnitContext): void {
    // Validate input context
    this.validateContext(context);
  }

  protected performCalculation(context: UnitContext): number {
    // Increment validation count
    this.validationCount++;
    
    // Perform the actual calculation
    const result = this.wrappedUnit.calculate(context);
    
    // Validate the result
    this.validateResult(result, context);
    
    return result;
  }

  protected afterCalculation(result: number, context: UnitContext): void {
    // Post-calculation validation
    this.validatePostCalculation(result, context);
  }

  protected validateDecorator(context: UnitContext): boolean {
    // Validate that the decorator can work with the given context
    return context !== null && context !== undefined && typeof context === 'object';
  }

  getDecoratorType(): string {
    return 'ValidationDecorator';
  }

  getPriority(): number {
    return VALIDATION_CONSTANTS.RULES.MAX_VALIDATION_RULES / 2; // Medium priority for validation
  }

  canDecorate(unit: IUnit): boolean {
    // Can decorate any unit that performs calculations
    return unit !== null && unit !== undefined;
  }

  getMetadata(): {
    type: string;
    priority: number;
    description: string;
    version: string;
  } {
    return {
      type: 'ValidationDecorator',
      priority: this.getPriority(),
      description: 'Validates unit calculation results and context',
      version: '1.0.0'
    };
  }

  /**
   * Add a custom validation rule
   */
  addValidationRule(
    name: string,
    validator: (result: number, context: UnitContext) => boolean,
    errorMessage: string
  ): void {
    this.validationRules.push({ name, validator, errorMessage });
  }

  /**
   * Remove a validation rule by name
   */
  removeValidationRule(name: string): boolean {
    const index = this.validationRules.findIndex(rule => rule.name === name);
    if (index !== -1) {
      this.validationRules.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * Get all validation errors
   */
  getValidationErrors(): Array<{
    rule: string;
    message: string;
    timestamp: Date;
    context: UnitContext;
  }> {
    return [...this.validationErrors];
  }

  /**
   * Clear validation errors
   */
  clearValidationErrors(): void {
    this.validationErrors = [];
    this.validationCount = 0;
  }

  /**
   * Get validation statistics
   */
  getValidationStats(): {
    totalValidations: number;
    errors: number;
    errorRate: number;
    lastError?: Date;
  } {
    const totalValidations = this.validationCount;
    const errors = this.validationErrors.length;
    const errorRate = totalValidations > 0 ? errors / totalValidations : 0;
    const lastError = this.validationErrors.length > 0 
      ? this.validationErrors[this.validationErrors.length - 1].timestamp 
      : undefined;

    return {
      totalValidations,
      errors,
      errorRate,
      lastError
    };
  }

  /**
   * Setup default validation rules
   */
  private setupDefaultValidationRules(): void {
    // Rule 1: Result should be a finite number
    this.addValidationRule(
      'finite-number',
      (result: number) => Number.isFinite(result),
      'Calculation result must be a finite number'
    );

    // Rule 2: Result should not be negative (for most cases)
    this.addValidationRule(
      'non-negative',
      (result: number) => result >= 0,
      'Calculation result should not be negative'
    );

    // Rule 3: Result should be within reasonable bounds
    this.addValidationRule(
      'reasonable-bounds',
      (result: number) => result >= VALIDATION_CONSTANTS.RANGES.REASONABLE_SIZE_MIN && 
                         result <= VALIDATION_CONSTANTS.RANGES.REASONABLE_SIZE_MAX,
      `Calculation result should be within reasonable bounds (${VALIDATION_CONSTANTS.RANGES.REASONABLE_SIZE_MIN}-${VALIDATION_CONSTANTS.RANGES.REASONABLE_SIZE_MAX})`
    );

    // Rule 4: Context should have required properties
    this.addValidationRule(
      'valid-context',
      (_result: number, context: UnitContext) => {
        return context !== null && 
               context !== undefined && 
               typeof context === 'object';
      },
      'Calculation context must be a valid object'
    );
  }

  /**
   * Validate input context
   */
  private validateContext(context: UnitContext): void {
    // Check if context is valid
    if (!context || typeof context !== 'object') {
      this.addValidationError('context-validation', 'Invalid calculation context provided');
      return;
    }

    // Check for required context properties
    if (!context.parent && !context.scene) {
      this.addValidationError('context-validation', 'Context must have either parent or scene information');
    }

    // Validate parent context if present
    if (context.parent) {
      if (typeof context.parent.width !== 'number' || typeof context.parent.height !== 'number') {
        this.addValidationError('context-validation', 'Parent context must have valid size dimensions');
      }
    }

    // Validate scene context if present
    if (context.scene) {
      if (typeof context.scene.width !== 'number' || typeof context.scene.height !== 'number') {
        this.addValidationError('context-validation', 'Scene context must have valid dimensions');
      }
    }
  }

  /**
   * Validate calculation result
   */
  private validateResult(result: number, context: UnitContext): void {
    // Run all validation rules
    for (const rule of this.validationRules) {
      try {
        if (!rule.validator(result, context)) {
          this.addValidationError(rule.name, rule.errorMessage, context);
        }
      } catch (error) {
        this.addValidationError(
          rule.name, 
          `Validation rule '${rule.name}' threw an error: ${error instanceof Error ? error.message : String(error)}`,
          context
        );
      }
    }
  }

  /**
   * Post-calculation validation
   */
  private validatePostCalculation(result: number, context: UnitContext): void {
    // Check if context is valid before proceeding
    if (!context) {
      this.addValidationError(
        'context-validation',
        'Context is required for post-calculation validation',
        context
      );
      return;
    }
    
    // Check if result is within expected range for the unit type
    const unitType = this.wrappedUnit.unitType;
    
    switch (unitType) {
      case UnitType.SIZE:
        this.validateSizeResult(result, context);
        break;
      case UnitType.POSITION:
        this.validatePositionResult(result, context);
        break;
      case UnitType.SCALE:
        this.validateScaleResult(result, context);
        break;
    }
  }

  /**
   * Validate size calculation result
   */
  private validateSizeResult(result: number, context: UnitContext): void {
    // Check if context is valid before accessing properties
    if (!context) {
      this.addValidationError(
        'context-validation',
        'Context is required for size validation',
        context
      );
      return;
    }
    
    const maxSize = context.parent?.width || context.scene?.width || 1000;
    
    if (result > maxSize * 2) {
      this.addValidationError(
        'size-bounds',
        `Size result (${result}) is significantly larger than expected maximum (${maxSize})`,
        context
      );
    }
  }

  /**
   * Validate position calculation result
   */
  private validatePositionResult(result: number, context: UnitContext): void {
    // Check if context is valid before accessing properties
    if (!context) {
      this.addValidationError(
        'context-validation',
        'Context is required for position validation',
        context
      );
      return;
    }
    
    const maxPosition = context.parent?.width || context.scene?.width || 1000;
    
    if (result < -maxPosition || result > maxPosition * 2) {
      this.addValidationError(
        'position-bounds',
        `Position result (${result}) is outside reasonable bounds (-${maxPosition} to ${maxPosition * 2})`,
        context
      );
    }
  }

  /**
   * Validate scale calculation result
   */
  private validateScaleResult(result: number, context: UnitContext): void {
    if (result < VALIDATION_CONSTANTS.RANGES.REASONABLE_SCALE_MIN || 
        result > VALIDATION_CONSTANTS.RANGES.REASONABLE_SCALE_MAX) {
      this.addValidationError(
        'scale-bounds',
        `Scale result (${result}) should be between ${VALIDATION_CONSTANTS.RANGES.REASONABLE_SCALE_MIN} and ${VALIDATION_CONSTANTS.RANGES.REASONABLE_SCALE_MAX}`,
        context
      );
    }
  }

  /**
   * Add a validation error
   */
  private addValidationError(rule: string, message: string, context?: UnitContext): void {
    this.validationErrors.push({
      rule,
      message,
      timestamp: new Date(),
      context: context || {} as UnitContext
    });
  }
}
