import type { UnitContext } from '../interfaces/IUnit';
import type { IValidationInput } from '../interfaces/IValidationInput';
import { BaseUnitValidator } from './IUnitValidator';
import {
  isValueValidationInput,
  isSizeValidationInput,
  isPositionValidationInput,
  isScaleValidationInput,
  isLegacyValidationInput,
} from '../interfaces/IValidationInput';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * Range Validator
 * Validates that unit values fall within specified min/max ranges
 */
export class RangeValidator extends BaseUnitValidator {
  private minValue: number;
  private maxValue: number;
  private inclusive: boolean;

  constructor(
    _name: string = 'RangeValidator',
    minValue: number = -Infinity,
    maxValue: number = Infinity,
    inclusive: boolean = true
  ) {
    super();
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.inclusive = inclusive;
  }

  /**
   * Get validator name
   */
  getName(): string {
    return 'RangeValidator';
  }

  /**
   * Check if this validator can handle the input
   */
  canHandle(input: IValidationInput): boolean {
    // Handle null/undefined inputs
    if (input === null || input === undefined) {
      return false;
    }

    // Handle numeric inputs directly
    if (typeof input === 'number') {
      return true;
    }

    // Handle validation inputs with value properties
    if (
      isValueValidationInput(input) ||
      isSizeValidationInput(input) ||
      isPositionValidationInput(input) ||
      isScaleValidationInput(input)
    ) {
      return true;
    }

    // Handle scale-like inputs (with unit and value but no minScale)
    if (typeof input === 'object' && input !== null && 'unit' in input && 'value' in input) {
      return true;
    }

    // Handle legacy inputs that might have a value property
    if (isLegacyValidationInput(input)) {
      const legacyInput = input.input;
      if (
        legacyInput &&
        typeof legacyInput === 'object' &&
        legacyInput !== null &&
        'value' in legacyInput
      ) {
        return typeof (legacyInput as { value: unknown }).value === 'number';
      }
    }

    // Handle objects with 'input' property (partial legacy inputs)
    if (typeof input === 'object' && input !== null && 'input' in input) {
      const legacyInput = (input as { input: unknown }).input;
      if (
        legacyInput &&
        typeof legacyInput === 'object' &&
        legacyInput !== null &&
        'value' in legacyInput
      ) {
        return typeof (legacyInput as { value: unknown }).value === 'number';
      }
    }

    return false;
  }

  /**
   * Perform the actual validation
   */
  protected performValidation(input: IValidationInput, _context: UnitContext): boolean {
    const value = this.extractValue(input);

    if (this.inclusive) {
      if (value < this.minValue || value > this.maxValue) {
        this.errorMessage = `Value ${value} is outside the allowed range [${this.minValue}, ${this.maxValue}]`;
        return false;
      }
    } else {
      if (value <= this.minValue || value >= this.maxValue) {
        this.errorMessage = `Value ${value} is outside the allowed range (${this.minValue}, ${this.maxValue})`;
        return false;
      }
    }

    // Value is valid, clear any previous error
    this.errorMessage = undefined;
    return true;
  }

  /**
   * Extract numeric value from input
   */
  private extractValue(input: IValidationInput): number {
    // Handle null/undefined inputs
    if (input === null || input === undefined) {
      return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    }

    // Handle numeric inputs directly
    if (typeof input === 'number') {
      return input;
    }

    // Handle validation inputs with value properties
    if (isValueValidationInput(input)) {
      return input.value;
    }

    if (isSizeValidationInput(input)) {
      return typeof input.value === 'number' ? input.value : DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    }

    if (isPositionValidationInput(input)) {
      return typeof input.value === 'number'
        ? input.value
        : DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
    }

    if (isScaleValidationInput(input)) {
      return typeof input.value === 'number' ? input.value : DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
    }

    // Handle scale-like inputs (with unit and value but no minScale)
    if (typeof input === 'object' && input !== null && 'unit' in input && 'value' in input) {
      const value = (input as { value: unknown }).value;
      return typeof value === 'number' ? value : DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
    }

    // Handle legacy inputs
    if (isLegacyValidationInput(input)) {
      const legacyInput = input.input;
      if (
        legacyInput &&
        typeof legacyInput === 'object' &&
        legacyInput !== null &&
        'value' in legacyInput
      ) {
        const value = (legacyInput as { value: unknown }).value;
        return typeof value === 'number' ? value : DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
      }
    }

    // Handle objects with 'input' property (partial legacy inputs)
    if (typeof input === 'object' && input !== null && 'input' in input) {
      const legacyInput = (input as { input: unknown }).input;
      if (
        legacyInput &&
        typeof legacyInput === 'object' &&
        legacyInput !== null &&
        'value' in legacyInput
      ) {
        const value = (legacyInput as { value: unknown }).value;
        return typeof value === 'number' ? value : DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
      }
    }

    return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  /**
   * Get validator configuration
   */
  getConfiguration() {
    return {
      minValue: this.minValue,
      maxValue: this.maxValue,
      inclusive: this.inclusive,
    };
  }

  /**
   * Update validator configuration
   */
  updateConfiguration(config: { minValue?: number; maxValue?: number; inclusive?: boolean }) {
    if (config.minValue !== undefined) this.minValue = config.minValue;
    if (config.maxValue !== undefined) this.maxValue = config.maxValue;
    if (config.inclusive !== undefined) this.inclusive = config.inclusive;
  }
}
