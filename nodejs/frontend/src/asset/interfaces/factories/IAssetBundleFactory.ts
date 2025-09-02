/**
 * Asset Bundle Factory Interface
 *
 * Defines factory functionality for creating asset bundles with different configurations and types.
 */

import type { IAssetBundle } from '../IAssetBundle';
import type { IAsset } from '../IAsset';
import type { BundleType, BundleConfig } from '../IAssetBundle';
import type { AssetPriority } from '../IAsset';

/**
 * Bundle factory operations
 */
export enum BundleFactoryOperation {
  CREATE = 'create',
  CLONE = 'clone',
  CONFIGURE = 'configure',
  VALIDATE = 'validate',
  REGISTER = 'register',
  UNREGISTER = 'unregister',
}

/**
 * Bundle factory configuration
 */
export interface BundleFactoryConfig {
  enableValidation: boolean;
  enableCaching: boolean;
  enablePooling: boolean;
  defaultPriority: AssetPriority;
  defaultPreload: boolean;
  defaultCache: boolean;
  maxBundleSize: number;
  metadata?: Record<string, any>;
}

/**
 * Bundle factory statistics
 */
export interface BundleFactoryStatistics {
  totalCreated: number;
  createdByType: Record<BundleType, number>;
  totalCloned: number;
  totalConfigured: number;
  totalValidated: number;
  validationFailures: number;
  lastCreationTime: number;
}

/**
 * Bundle creation options
 */
export interface BundleCreationOptions {
  bundleType: BundleType;
  bundleId: string;
  bundleName: string;
  priority?: AssetPriority;
  preload?: boolean;
  cache?: boolean;
  assets?: IAsset[];
  metadata?: Record<string, any>;
}

/**
 * Interface for asset bundle factories
 */
export interface IAssetBundleFactory {
  readonly bundleFactoryId: string;

  /** Bundle factory configuration */
  bundleFactoryConfig: BundleFactoryConfig;

  /** Bundle factory statistics */
  bundleFactoryStatistics: BundleFactoryStatistics;

  /** Bundle factory metadata */
  bundleFactoryMetadata: Record<string, any>;

  /** Set bundle factory configuration */
  setBundleFactoryConfig(config: BundleFactoryConfig): this;

  /** Set bundle factory metadata */
  setBundleFactoryMetadata(metadata: Record<string, any>): this;

  /** Get bundle factory configuration */
  getBundleFactoryConfig(): BundleFactoryConfig;

  /** Get bundle factory statistics */
  getBundleFactoryStatistics(): BundleFactoryStatistics;

  /** Get bundle factory metadata */
  getBundleFactoryMetadata(): Record<string, any>;

  /** Create bundle */
  createBundle(options: BundleCreationOptions): Promise<IAssetBundle>;

  /** Create bundle from configuration */
  createBundleFromConfig(config: BundleConfig): Promise<IAssetBundle>;

  /** Clone bundle */
  cloneBundle(bundle: IAssetBundle, newId?: string): Promise<IAssetBundle>;

  /** Configure bundle */
  configureBundle(bundle: IAssetBundle, config: Partial<BundleConfig>): Promise<IAssetBundle>;

  /** Validate bundle configuration */
  validateBundleConfig(config: BundleConfig): Promise<boolean>;

  /** Register bundle type creator */
  registerBundleTypeCreator(
    bundleType: BundleType,
    creator: (options: BundleCreationOptions) => Promise<IAssetBundle>
  ): this;

  /** Unregister bundle type creator */
  unregisterBundleTypeCreator(bundleType: BundleType): this;

  /** Check if bundle type is supported */
  isBundleTypeSupported(bundleType: BundleType): boolean;

  /** Get supported bundle types */
  getSupportedBundleTypes(): BundleType[];

  /** Get bundle type creator */
  getBundleTypeCreator(
    bundleType: BundleType
  ): ((options: BundleCreationOptions) => Promise<IAssetBundle>) | null;

  /** Create multiple bundles */
  createBundles(options: BundleCreationOptions[]): Promise<IAssetBundle[]>;

  /** Create bundles from configurations */
  createBundlesFromConfigs(configs: BundleConfig[]): Promise<IAssetBundle[]>;

  /** Create bundle from assets */
  createBundleFromAssets(
    assets: IAsset[],
    bundleType: BundleType,
    bundleId: string,
    bundleName: string
  ): Promise<IAssetBundle>;

  /** Get creation statistics */
  getCreationStatistics(): {
    totalCreated: number;
    successRate: number;
    averageCreationTime: number;
    mostCreatedType: BundleType;
  };

  /** Clear bundle factory */
  clearBundleFactory(): this;

  /** Update bundle factory */
  updateBundleFactory(deltaTime: number): void;
}
