/**
 * Asset Migration Interface
 *
 * Defines migration functionality from the old AssetLoaderConfigLoader to the new Asset System.
 */

import type { IAsset } from '../IAsset';
import type { IAssetBundle } from '../IAssetBundle';
import type { ISceneAssetConfig } from '../scene/ISceneAssetConfig';
import type { AssetType, AssetPriority } from '../IAsset';
import type { BundleType } from '../IAssetBundle';

/**
 * Legacy asset configuration (from old system)
 */
export interface LegacyAssetConfig {
  key: string;
  path: string;
  type: AssetType;
  preload: boolean;
}

/**
 * Legacy asset loader configuration (from old system)
 */
export interface LegacyAssetLoaderConfig {
  basePath: string;
  backgrounds: {
    desktop: LegacyAssetConfig;
    mobile: LegacyAssetConfig;
    mobileOrigin: LegacyAssetConfig;
  };
  loading: {
    preload: boolean;
    priority: string[];
  };
  validation: {
    required: string[];
    optional: string[];
    fallbacks: Record<string, string>;
  };
}

/**
 * Migration result
 */
export interface MigrationResult {
  success: boolean;
  migratedAssets: number;
  migratedBundles: number;
  errors: string[];
  warnings: string[];
  metadata?: Record<string, any>;
}

/**
 * Interface for asset migration
 */
export interface IAssetMigration {
  readonly migrationId: string;

  /** Migration metadata */
  migrationMetadata: Record<string, any>;

  /** Set migration metadata */
  setMigrationMetadata(metadata: Record<string, any>): this;

  /** Get migration metadata */
  getMigrationMetadata(): Record<string, any>;

  /** Migrate legacy asset configuration */
  migrateLegacyAssetConfig(
    legacyConfig: LegacyAssetLoaderConfig,
    sceneId: string
  ): Promise<ISceneAssetConfig>;

  /** Migrate legacy asset */
  migrateLegacyAsset(legacyAsset: LegacyAssetConfig, basePath: string): Promise<IAsset>;

  /** Migrate legacy assets to bundle */
  migrateLegacyAssetsToBundle(
    legacyAssets: LegacyAssetConfig[],
    bundleId: string,
    bundleType: BundleType,
    basePath: string
  ): Promise<IAssetBundle>;

  /** Convert legacy asset type */
  convertLegacyAssetType(legacyType: string): AssetType;

  /** Convert legacy priority */
  convertLegacyPriority(legacyPriority: string): AssetPriority;

  /** Validate migration result */
  validateMigrationResult(result: MigrationResult): boolean;

  /** Get migration statistics */
  getMigrationStatistics(): {
    totalMigrations: number;
    successfulMigrations: number;
    failedMigrations: number;
    totalAssetsMigrated: number;
    totalBundlesMigrated: number;
  };

  /** Clear migration history */
  clearMigrationHistory(): this;

  /** Update migration */
  updateMigration(deltaTime: number): void;
}
