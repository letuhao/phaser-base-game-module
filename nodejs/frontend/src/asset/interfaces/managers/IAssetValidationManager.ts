/**
 * Asset Validation Manager Interface
 * 
 * Defines validation functionality for assets including integrity checks, format validation, and dependency validation.
 */

import type { IAsset } from '../IAsset';
import type { IAssetBundle } from '../IAssetBundle';
import type { AssetType } from '../IAsset';
import type { BundleType } from '../IAssetBundle';

/**
 * Validation types
 */
export enum ValidationType {
  INTEGRITY = 'integrity',
  FORMAT = 'format',
  DEPENDENCY = 'dependency',
  SIZE = 'size',
  METADATA = 'metadata',
  COMPATIBILITY = 'compatibility'
}

/**
 * Validation result
 */
export enum ValidationResult {
  VALID = 'valid',
  INVALID = 'invalid',
  WARNING = 'warning',
  ERROR = 'error',
  SKIPPED = 'skipped'
}

/**
 * Validation configuration
 */
export interface ValidationConfig {
  enableIntegrityCheck: boolean;
  enableFormatValidation: boolean;
  enableDependencyValidation: boolean;
  enableSizeValidation: boolean;
  enableMetadataValidation: boolean;
  enableCompatibilityCheck: boolean;
  maxAssetSize: number;
  allowedFormats: string[];
  requiredMetadata: string[];
  metadata?: Record<string, any>;
}

/**
 * Validation statistics
 */
export interface ValidationStatistics {
  totalValidations: number;
  validAssets: number;
  invalidAssets: number;
  warningAssets: number;
  errorAssets: number;
  skippedAssets: number;
  validationTime: number;
  lastValidationTime: number;
  assetsByType: Record<AssetType, number>;
  bundlesByType: Record<BundleType, number>;
}

/**
 * Validation report
 */
export interface ValidationReport {
  assetKey: string;
  validationType: ValidationType;
  result: ValidationResult;
  message: string;
  details?: Record<string, any>;
  timestamp: number;
}

/**
 * Interface for asset validation managers
 */
export interface IAssetValidationManager {
  readonly validationManagerId: string;
  
  /** Validation configuration */
  validationConfig: ValidationConfig;
  
  /** Validation statistics */
  validationStatistics: ValidationStatistics;
  
  /** Validation reports */
  validationReports: Map<string, ValidationReport[]>;
  
  /** Validation metadata */
  validationMetadata: Record<string, any>;
  
  /** Set validation configuration */
  setValidationConfig(config: ValidationConfig): this;
  
  /** Set validation metadata */
  setValidationMetadata(metadata: Record<string, any>): this;
  
  /** Get validation configuration */
  getValidationConfig(): ValidationConfig;
  
  /** Get validation statistics */
  getValidationStatistics(): ValidationStatistics;
  
  /** Get validation reports */
  getValidationReports(): Map<string, ValidationReport[]>;
  
  /** Get validation metadata */
  getValidationMetadata(): Record<string, any>;
  
  /** Validate asset */
  validateAsset(asset: IAsset): Promise<ValidationReport[]>;
  
  /** Validate asset bundle */
  validateBundle(bundle: IAssetBundle): Promise<ValidationReport[]>;
  
  /** Validate asset integrity */
  validateIntegrity(asset: IAsset): Promise<ValidationReport>;
  
  /** Validate asset format */
  validateFormat(asset: IAsset): Promise<ValidationReport>;
  
  /** Validate asset dependencies */
  validateDependencies(asset: IAsset): Promise<ValidationReport>;
  
  /** Validate asset size */
  validateSize(asset: IAsset): Promise<ValidationReport>;
  
  /** Validate asset metadata */
  validateMetadata(asset: IAsset): Promise<ValidationReport>;
  
  /** Validate asset compatibility */
  validateCompatibility(asset: IAsset): Promise<ValidationReport>;
  
  /** Get validation report for asset */
  getValidationReport(assetKey: string): ValidationReport[];
  
  /** Check if asset is valid */
  isAssetValid(assetKey: string): boolean;
  
  /** Check if asset has warnings */
  hasAssetWarnings(assetKey: string): boolean;
  
  /** Check if asset has errors */
  hasAssetErrors(assetKey: string): boolean;
  
  /** Clear validation reports */
  clearValidationReports(): this;
  
  /** Clear validation report for asset */
  clearValidationReport(assetKey: string): this;
  
  /** Get validation summary */
  getValidationSummary(): {
    total: number;
    valid: number;
    invalid: number;
    warnings: number;
    errors: number;
  };
  
  /** Update validation manager */
  updateValidationManager(deltaTime: number): void;
}
