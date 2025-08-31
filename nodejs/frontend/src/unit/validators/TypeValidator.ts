import type { UnitContext } from '../interfaces/IUnit';
import type { IValidationInput } from '../interfaces/IValidationInput';
import { BaseUnitValidator } from './IUnitValidator';
import { UnitType } from '../enums/UnitType';
import { Dimension } from '../enums/Dimension';

/**
 * Type Validator
 * Validates that unit types and dimensions are compatible
 */
export class TypeValidator extends BaseUnitValidator {
  private allowedTypes: UnitType[];
  private allowedDimensions: Dimension[];
  private strictMode: boolean;

  constructor(
    _name: string = 'TypeValidator',
    allowedTypes: UnitType[] = Object.values(UnitType),
    allowedDimensions: Dimension[] = Object.values(Dimension),
    strictMode: boolean = false
  ) {
    super();
    this.allowedTypes = allowedTypes;
    this.allowedDimensions = allowedDimensions;
    this.strictMode = strictMode;
  }

  /**
   * Get validator name
   */
  getName(): string {
    return 'TypeValidator';
  }

  /**
   * Check if this validator can handle the input
   */
  canHandle(input: IValidationInput): boolean {
    return input !== null && input !== undefined;
  }

  /**
   * Perform the actual validation
   */
  protected performValidation(input: IValidationInput, context: UnitContext): boolean {
    // Validate unit type
    if (!this.validateUnitType(input, context)) {
      return false;
    }

    // Validate dimension compatibility
    if (!this.validateDimension(input, context)) {
      return false;
    }

    // Validate value type
    if (!this.validateValueType(input, context)) {
      return false;
    }

    // All validations passed
    this.errorMessage = undefined;
    return true;
  }

  /**
   * Validate unit type compatibility
   */
  private validateUnitType(input: IValidationInput, _context: UnitContext): boolean {
    // Check if input is a unit validation input
    if ('unitType' in input && typeof input.unitType === 'string') {
      const inputType = input.unitType as UnitType;

      if (!this.allowedTypes.includes(inputType)) {
        this.errorMessage = `Unit type '${inputType}' is not allowed. Allowed types: ${this.allowedTypes.join(', ')}`;
        return false;
      }
    }

    return true;
  }

  /**
   * Validate dimension compatibility
   */
  private validateDimension(input: IValidationInput, _context: UnitContext): boolean {
    // Check if input has a dimension property
    if (input && 'dimension' in input && input.dimension) {
      const inputDimension = input.dimension as Dimension;

      if (!this.allowedDimensions.includes(inputDimension)) {
        this.errorMessage = `Dimension '${inputDimension}' is not allowed. Allowed dimensions: ${this.allowedDimensions.join(', ')}`;
        return false;
      }
    }

    return true;
  }

  /**
   * Validate value type
   */
  private validateValueType(input: IValidationInput, _context: UnitContext): boolean {
    // Check if input is a valid value type
    if (this.strictMode) {
      // Strict mode: only allow specific value types
      if (!this.isValidStrictValue(input)) {
        this.errorMessage = `Input value type '${typeof input}' is not allowed in strict mode`;
        return false;
      }
    } else {
      // Relaxed mode: allow common value types
      if (!this.isValidRelaxedValue(input)) {
        this.errorMessage = `Input value type '${typeof input}' is not supported`;
        return false;
      }
    }

    return true;
  }

  /**
   * Check if value is valid in strict mode
   */
  private isValidStrictValue(input: IValidationInput): boolean {
    // Handle primitive types
    if (typeof input === 'number' || typeof input === 'string') {
      return true;
    }
    
    // Handle validation input objects
    if (typeof input === 'object' && input !== null) {
      // Check for value property
      if ('value' in input && typeof input.value === 'number') {
        return true;
      }
      
      // Check for getValue method
      if ('getValue' in input && typeof input.getValue === 'function') {
        return true;
      }
      
      // Check for unitType property
      if ('unitType' in input && typeof input.unitType === 'string') {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Check if value is valid in relaxed mode
   */
  private isValidRelaxedValue(input: IValidationInput): boolean {
    return (
      input === null ||
      input === undefined ||
      typeof input === 'number' ||
      typeof input === 'string' ||
      typeof input === 'boolean' ||
      typeof input === 'object'
    );
  }

  /**
   * Get validator configuration
   */
  getConfiguration() {
    return {
      allowedTypes: this.allowedTypes,
      allowedDimensions: this.allowedDimensions,
      strictMode: this.strictMode,
    };
  }

  /**
   * Update validator configuration
   */
  updateConfiguration(config: {
    allowedTypes?: UnitType[];
    allowedDimensions?: Dimension[];
    strictMode?: boolean;
  }) {
    if (config.allowedTypes !== undefined) this.allowedTypes = config.allowedTypes;
    if (config.allowedDimensions !== undefined) this.allowedDimensions = config.allowedDimensions;
    if (config.strictMode !== undefined) this.strictMode = config.strictMode;
  }

  /**
   * Add allowed unit type
   */
  addAllowedType(type: UnitType): void {
    if (!this.allowedTypes.includes(type)) {
      this.allowedTypes.push(type);
    }
  }

  /**
   * Remove allowed unit type
   */
  removeAllowedType(type: UnitType): void {
    const index = this.allowedTypes.indexOf(type);
    if (index > -1) {
      this.allowedTypes.splice(index, 1);
    }
  }

  /**
   * Add allowed dimension
   */
  addAllowedDimension(dimension: Dimension): void {
    if (!this.allowedDimensions.includes(dimension)) {
      this.allowedDimensions.push(dimension);
    }
  }

  /**
   * Remove allowed dimension
   */
  removeAllowedDimension(dimension: Dimension): void {
    const index = this.allowedDimensions.indexOf(dimension);
    if (index > -1) {
      this.allowedDimensions.splice(index, 1);
    }
  }
}
