/**
 * Validation Type Enum
 *
 * Defines the available validation types for the unit system.
 * Used to replace string literal types with type-safe enums.
 */

export enum ValidationType {
  UNIT = 'unit',
  VALUE = 'value',
  SIZE = 'size',
  POSITION = 'position',
  SCALE = 'scale',
  MIXED = 'mixed',
}

/**
 * Type guard to check if a string is a valid validation type
 */
export function isValidValidationType(type: string): type is ValidationType {
  return Object.values(ValidationType).includes(type as ValidationType);
}

/**
 * Get validation type display name
 */
export function getValidationTypeDisplayName(type: ValidationType): string {
  const displayNames = {
    [ValidationType.UNIT]: 'Unit Validation',
    [ValidationType.VALUE]: 'Value Validation',
    [ValidationType.SIZE]: 'Size Validation',
    [ValidationType.POSITION]: 'Position Validation',
    [ValidationType.SCALE]: 'Scale Validation',
    [ValidationType.MIXED]: 'Mixed Validation',
  };

  return displayNames[type];
}

/**
 * Get validation type description
 */
export function getValidationTypeDescription(type: ValidationType): string {
  const descriptions = {
    [ValidationType.UNIT]: 'Validates unit objects and their properties',
    [ValidationType.VALUE]: 'Validates numeric values and their ranges',
    [ValidationType.SIZE]: 'Validates size-related values and constraints',
    [ValidationType.POSITION]: 'Validates position-related values and bounds',
    [ValidationType.SCALE]: 'Validates scale-related values and factors',
    [ValidationType.MIXED]: 'Validates multiple validation types together',
  };

  return descriptions[type];
}
