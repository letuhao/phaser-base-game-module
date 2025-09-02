/**
 * Validation Strategy Interface
 *
 * Defines validation strategy abstraction for different asset validation approaches.
 */

import type { IAsset } from '../IAsset';
import { ValidationStrategyType } from '../../enums';
import type { IAssetBundle } from '../IAssetBundle';
import type { ValidationType, ValidationResult } from '../managers/IAssetValidationManager';

// ValidationStrategyType is now imported from centralized enums

/**
 * Validation strategy configuration
 */
export interface ValidationStrategyConfig {
  strategyType: ValidationStrategyType;
  enableIntegrityCheck: boolean;
  enableFormatValidation: boolean;
  enableDependencyValidation: boolean;
  enableSizeValidation: boolean;
  enableMetadataValidation: boolean;
  enableCompatibilityCheck: boolean;
  strictMode: boolean;
  allowWarnings: boolean;
  allowErrors: boolean;
  maxValidationTime: number;
  batchSize: number;
  enableCaching: boolean;
  metadata?: Record<string, any>;
}

/**
 * Validation strategy result
 */
export interface ValidationStrategyResult {
  success: boolean;
  validAssets: IAsset[];
  invalidAssets: IAsset[];
  warningAssets: IAsset[];
  errorAssets: IAsset[];
  validationTime: number;
  strategyUsed: ValidationStrategyType;
  totalValidated: number;
  metadata?: Record<string, any>;
}

/**
 * Validation rule
 */
export interface ValidationRule {
  ruleId: string;
  ruleType: ValidationType;
  ruleName: string;
  ruleDescription: string;
  ruleFunction: (asset: IAsset) => Promise<ValidationResult>;
  enabled: boolean;
  priority: number;
  metadata?: Record<string, any>;
}

/**
 * Interface for validation strategies
 */
export interface IValidationStrategy {
  readonly strategyId: string;
  readonly strategyType: ValidationStrategyType;

  /** Strategy configuration */
  strategyConfig: ValidationStrategyConfig;

  /** Validation rules */
  validationRules: Map<string, ValidationRule>;

  /** Strategy metadata */
  strategyMetadata: Record<string, any>;

  /** Set strategy configuration */
  setStrategyConfig(config: ValidationStrategyConfig): this;

  /** Set strategy metadata */
  setStrategyMetadata(metadata: Record<string, any>): this;

  /** Get strategy configuration */
  getStrategyConfig(): ValidationStrategyConfig;

  /** Get validation rules */
  getValidationRules(): Map<string, ValidationRule>;

  /** Get strategy metadata */
  getStrategyMetadata(): Record<string, any>;

  /** Validate asset using strategy */
  validateAsset(asset: IAsset): Promise<ValidationResult>;

  /** Validate multiple assets */
  validateAssets(assets: IAsset[]): Promise<ValidationStrategyResult>;

  /** Validate asset bundle */
  validateBundle(bundle: IAssetBundle): Promise<ValidationStrategyResult>;

  /** Validate assets by type */
  validateAssetsByType(
    assets: IAsset[],
    validationType: ValidationType
  ): Promise<ValidationStrategyResult>;

  /** Add validation rule */
  addValidationRule(rule: ValidationRule): this;

  /** Remove validation rule */
  removeValidationRule(ruleId: string): this;

  /** Enable validation rule */
  enableValidationRule(ruleId: string): this;

  /** Disable validation rule */
  disableValidationRule(ruleId: string): this;

  /** Get validation rule */
  getValidationRule(ruleId: string): ValidationRule | null;

  /** Check if validation rule exists */
  hasValidationRule(ruleId: string): boolean;

  /** Get validation statistics */
  getValidationStatistics(): {
    totalValidations: number;
    validAssets: number;
    invalidAssets: number;
    warningAssets: number;
    errorAssets: number;
    averageValidationTime: number;
    successRate: number;
  };

  /** Clear validation rules */
  clearValidationRules(): this;

  /** Update strategy */
  updateStrategy(deltaTime: number): void;
}
