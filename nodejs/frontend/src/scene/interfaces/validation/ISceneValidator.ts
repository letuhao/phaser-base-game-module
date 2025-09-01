/**
 * Scene Validator Interface
 * 
 * Defines validation functionality for scene system components.
 */

import type { ISceneElement } from '../ISceneElement';
import type { SceneConfig } from '../ISceneConfig';
import type { SceneElementConfig } from '../ISceneElement';

/**
 * Validation result types
 */
export enum ValidationResultType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

/**
 * Validation rule types
 */
export enum ValidationRuleType {
  REQUIRED = 'required',
  TYPE_CHECK = 'type_check',
  RANGE_CHECK = 'range_check',
  FORMAT_CHECK = 'format_check',
  REFERENCE_CHECK = 'reference_check',
  CUSTOM = 'custom'
}

/**
 * Validation result
 */
export interface ValidationResult {
  isValid: boolean;
  resultType: ValidationResultType;
  message: string;
  field?: string;
  value?: any;
  expected?: any;
  rule?: ValidationRuleType;
  metadata?: Record<string, any>;
}

/**
 * Validation rule
 */
export interface ValidationRule {
  ruleId: string;
  ruleType: ValidationRuleType;
  field: string;
  required: boolean;
  validator: (value: any, context?: any) => ValidationResult;
  errorMessage: string;
  warningMessage?: string;
  metadata?: Record<string, any>;
}

/**
 * Validation configuration
 */
export interface ValidationConfig {
  strictMode: boolean;
  stopOnFirstError: boolean;
  includeWarnings: boolean;
  customRules: ValidationRule[];
  metadata?: Record<string, any>;
}

/**
 * Validation statistics
 */
export interface ValidationStatistics {
  totalValidations: number;
  successfulValidations: number;
  failedValidations: number;
  warningsGenerated: number;
  errorsGenerated: number;
  averageValidationTime: number;
  lastValidationTime: number;
}

/**
 * Interface for scene validators
 */
export interface ISceneValidator {
  readonly validatorId: string;
  
  /** Validation configuration */
  validationConfig: ValidationConfig;
  
  /** Validation rules */
  validationRules: Map<string, ValidationRule>;
  
  /** Validation statistics */
  validationStatistics: ValidationStatistics;
  
  /** Validator metadata */
  validatorMetadata: Record<string, any>;
  
  /** Set validation configuration */
  setValidationConfig(config: ValidationConfig): this;
  
  /** Set validator metadata */
  setValidatorMetadata(metadata: Record<string, any>): this;
  
  /** Get validation configuration */
  getValidationConfig(): ValidationConfig;
  
  /** Get validation rules */
  getValidationRules(): Map<string, ValidationRule>;
  
  /** Get validation statistics */
  getValidationStatistics(): ValidationStatistics;
  
  /** Get validator metadata */
  getValidatorMetadata(): Record<string, any>;
  
  /** Add validation rule */
  addValidationRule(rule: ValidationRule): this;
  
  /** Remove validation rule */
  removeValidationRule(ruleId: string): this;
  
  /** Get validation rule */
  getValidationRule(ruleId: string): ValidationRule | undefined;
  
  /** Validate scene configuration */
  validateSceneConfig(config: SceneConfig): ValidationResult[];
  
  /** Validate scene element configuration */
  validateSceneElementConfig(config: SceneElementConfig): ValidationResult[];
  
  /** Validate scene element */
  validateSceneElement(element: ISceneElement): ValidationResult[];
  
  /** Validate field */
  validateField(
    field: string, 
    value: any, 
    rules: ValidationRule[]
  ): ValidationResult[];
  
  /** Validate with custom rules */
  validateWithRules(
    data: any, 
    rules: ValidationRule[]
  ): ValidationResult[];
  
  /** Check if validation passed */
  isValidationPassed(results: ValidationResult[]): boolean;
  
  /** Get validation errors */
  getValidationErrors(results: ValidationResult[]): ValidationResult[];
  
  /** Get validation warnings */
  getValidationWarnings(results: ValidationResult[]): ValidationResult[];
  
  /** Clear validation statistics */
  clearValidationStatistics(): this;
  
  /** Update validator */
  updateValidator(deltaTime: number): void;
}
