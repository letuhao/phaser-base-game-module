/**
 * Asset Factory Interface
 * 
 * Defines factory functionality for creating assets with different configurations and types.
 */

import type { IAsset } from '../IAsset';
// FactoryOperation is imported from centralized enums but not used in this file
import type { AssetType, AssetPriority, AssetConfig } from '../IAsset';

// FactoryOperation is now imported from centralized enums

/**
 * Factory configuration
 */
export interface FactoryConfig {
  enableValidation: boolean;
  enableCaching: boolean;
  enablePooling: boolean;
  defaultPriority: AssetPriority;
  defaultPreload: boolean;
  defaultCache: boolean;
  metadata?: Record<string, any>;
}

/**
 * Factory statistics
 */
export interface FactoryStatistics {
  totalCreated: number;
  createdByType: Record<AssetType, number>;
  totalCloned: number;
  totalConfigured: number;
  totalValidated: number;
  validationFailures: number;
  lastCreationTime: number;
}

/**
 * Asset creation options
 */
export interface AssetCreationOptions {
  assetType: AssetType;
  assetKey: string;
  assetPath: string;
  priority?: AssetPriority;
  preload?: boolean;
  cache?: boolean;
  metadata?: Record<string, any>;
}

/**
 * Interface for asset factories
 */
export interface IAssetFactory {
  readonly factoryId: string;
  
  /** Factory configuration */
  factoryConfig: FactoryConfig;
  
  /** Factory statistics */
  factoryStatistics: FactoryStatistics;
  
  /** Factory metadata */
  factoryMetadata: Record<string, any>;
  
  /** Set factory configuration */
  setFactoryConfig(config: FactoryConfig): this;
  
  /** Set factory metadata */
  setFactoryMetadata(metadata: Record<string, any>): this;
  
  /** Get factory configuration */
  getFactoryConfig(): FactoryConfig;
  
  /** Get factory statistics */
  getFactoryStatistics(): FactoryStatistics;
  
  /** Get factory metadata */
  getFactoryMetadata(): Record<string, any>;
  
  /** Create asset */
  createAsset(options: AssetCreationOptions): Promise<IAsset>;
  
  /** Create asset from configuration */
  createAssetFromConfig(config: AssetConfig): Promise<IAsset>;
  
  /** Clone asset */
  cloneAsset(asset: IAsset, newKey?: string): Promise<IAsset>;
  
  /** Configure asset */
  configureAsset(asset: IAsset, config: Partial<AssetConfig>): Promise<IAsset>;
  
  /** Validate asset configuration */
  validateAssetConfig(config: AssetConfig): Promise<boolean>;
  
  /** Register asset type creator */
  registerAssetTypeCreator(assetType: AssetType, creator: (options: AssetCreationOptions) => Promise<IAsset>): this;
  
  /** Unregister asset type creator */
  unregisterAssetTypeCreator(assetType: AssetType): this;
  
  /** Check if asset type is supported */
  isAssetTypeSupported(assetType: AssetType): boolean;
  
  /** Get supported asset types */
  getSupportedAssetTypes(): AssetType[];
  
  /** Get asset type creator */
  getAssetTypeCreator(assetType: AssetType): ((options: AssetCreationOptions) => Promise<IAsset>) | null;
  
  /** Create multiple assets */
  createAssets(options: AssetCreationOptions[]): Promise<IAsset[]>;
  
  /** Create assets from configurations */
  createAssetsFromConfigs(configs: AssetConfig[]): Promise<IAsset[]>;
  
  /** Get creation statistics */
  getCreationStatistics(): {
    totalCreated: number;
    successRate: number;
    averageCreationTime: number;
    mostCreatedType: AssetType;
  };
  
  /** Clear factory */
  clearFactory(): this;
  
  /** Update factory */
  updateFactory(deltaTime: number): void;
}
