/**
 * Asset Manager Interfaces Index
 *
 * Centralized export for all asset manager interfaces
 */

export type { IAssetCacheManager } from './IAssetCacheManager';
export type { IAssetPoolManager } from './IAssetPoolManager';
export type { IAssetValidationManager } from './IAssetValidationManager';
export type { IAssetStatisticsManager } from './IAssetStatisticsManager';

export { CacheOperation } from './IAssetCacheManager';
export { PoolOperation } from './IAssetPoolManager';
export { ValidationType, ValidationResult } from './IAssetValidationManager';
export { StatisticsType } from './IAssetStatisticsManager';

/**
 * Asset manager interfaces bundle
 */
export const ASSET_MANAGER_INTERFACES = {
  IAssetCacheManager: 'IAssetCacheManager',
  IAssetPoolManager: 'IAssetPoolManager',
  IAssetValidationManager: 'IAssetValidationManager',
  IAssetStatisticsManager: 'IAssetStatisticsManager',
} as const;

export type AssetManagerInterface =
  (typeof ASSET_MANAGER_INTERFACES)[keyof typeof ASSET_MANAGER_INTERFACES];
