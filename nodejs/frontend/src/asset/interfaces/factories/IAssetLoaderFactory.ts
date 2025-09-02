/**
 * Asset Loader Factory Interface
 * 
 * Defines factory functionality for creating asset loaders with different configurations and types.
 */

import type { IAssetLoader } from '../IAssetLoader';
// LoaderFactoryOperation is imported from centralized enums but not used in this file
import type { LoaderConfig } from '../IAssetLoader';
import type { LoaderType, LoadingStrategy } from '../../enums';

// LoaderFactoryOperation is now imported from centralized enums

/**
 * Loader factory configuration
 */
export interface LoaderFactoryConfig {
  enableValidation: boolean;
  enableCaching: boolean;
  enablePooling: boolean;
  defaultLoaderType: LoaderType;
  defaultLoadingStrategy: LoadingStrategy;
  defaultMaxConcurrentLoads: number;
  defaultTimeout: number;
  defaultRetryAttempts: number;
  defaultRetryDelay: number;
  metadata?: Record<string, any>;
}

/**
 * Loader factory statistics
 */
export interface LoaderFactoryStatistics {
  totalCreated: number;
  createdByType: Record<LoaderType, number>;
  totalCloned: number;
  totalConfigured: number;
  totalValidated: number;
  validationFailures: number;
  lastCreationTime: number;
}

/**
 * Loader creation options
 */
export interface LoaderCreationOptions {
  loaderType: LoaderType;
  loadingStrategy?: LoadingStrategy;
  maxConcurrentLoads?: number;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
  enableCaching?: boolean;
  enableCompression?: boolean;
  metadata?: Record<string, any>;
}

/**
 * Interface for asset loader factories
 */
export interface IAssetLoaderFactory {
  readonly loaderFactoryId: string;
  
  /** Loader factory configuration */
  loaderFactoryConfig: LoaderFactoryConfig;
  
  /** Loader factory statistics */
  loaderFactoryStatistics: LoaderFactoryStatistics;
  
  /** Loader factory metadata */
  loaderFactoryMetadata: Record<string, any>;
  
  /** Set loader factory configuration */
  setLoaderFactoryConfig(config: LoaderFactoryConfig): this;
  
  /** Set loader factory metadata */
  setLoaderFactoryMetadata(metadata: Record<string, any>): this;
  
  /** Get loader factory configuration */
  getLoaderFactoryConfig(): LoaderFactoryConfig;
  
  /** Get loader factory statistics */
  getLoaderFactoryStatistics(): LoaderFactoryStatistics;
  
  /** Get loader factory metadata */
  getLoaderFactoryMetadata(): Record<string, any>;
  
  /** Create loader */
  createLoader(options: LoaderCreationOptions): Promise<IAssetLoader>;
  
  /** Create loader from configuration */
  createLoaderFromConfig(config: LoaderConfig): Promise<IAssetLoader>;
  
  /** Clone loader */
  cloneLoader(loader: IAssetLoader, newId?: string): Promise<IAssetLoader>;
  
  /** Configure loader */
  configureLoader(loader: IAssetLoader, config: Partial<LoaderConfig>): Promise<IAssetLoader>;
  
  /** Validate loader configuration */
  validateLoaderConfig(config: LoaderConfig): Promise<boolean>;
  
  /** Register loader type creator */
  registerLoaderTypeCreator(loaderType: LoaderType, creator: (options: LoaderCreationOptions) => Promise<IAssetLoader>): this;
  
  /** Unregister loader type creator */
  unregisterLoaderTypeCreator(loaderType: LoaderType): this;
  
  /** Check if loader type is supported */
  isLoaderTypeSupported(loaderType: LoaderType): boolean;
  
  /** Get supported loader types */
  getSupportedLoaderTypes(): LoaderType[];
  
  /** Get loader type creator */
  getLoaderTypeCreator(loaderType: LoaderType): ((options: LoaderCreationOptions) => Promise<IAssetLoader>) | null;
  
  /** Create multiple loaders */
  createLoaders(options: LoaderCreationOptions[]): Promise<IAssetLoader[]>;
  
  /** Create loaders from configurations */
  createLoadersFromConfigs(configs: LoaderConfig[]): Promise<IAssetLoader[]>;
  
  /** Create loader for specific strategy */
  createLoaderForStrategy(loadingStrategy: LoadingStrategy, options?: Partial<LoaderCreationOptions>): Promise<IAssetLoader>;
  
  /** Get creation statistics */
  getCreationStatistics(): {
    totalCreated: number;
    successRate: number;
    averageCreationTime: number;
    mostCreatedType: LoaderType;
  };
  
  /** Clear loader factory */
  clearLoaderFactory(): this;
  
  /** Update loader factory */
  updateLoaderFactory(deltaTime: number): void;
}
