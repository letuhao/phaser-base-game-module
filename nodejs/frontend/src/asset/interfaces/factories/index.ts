/**
 * Asset Factory Interfaces Index
 * 
 * Centralized export for all asset factory interfaces
 */

export type { IAssetFactory } from './IAssetFactory';
export type { IAssetBundleFactory } from './IAssetBundleFactory';
export type { IAssetLoaderFactory } from './IAssetLoaderFactory';

export { FactoryOperation } from './IAssetFactory';
export { BundleFactoryOperation } from './IAssetBundleFactory';
export { LoaderFactoryOperation } from './IAssetLoaderFactory';

/**
 * Asset factory interfaces bundle
 */
export const ASSET_FACTORY_INTERFACES = {
  IAssetFactory: 'IAssetFactory',
  IAssetBundleFactory: 'IAssetBundleFactory',
  IAssetLoaderFactory: 'IAssetLoaderFactory',
} as const;

export type AssetFactoryInterface = typeof ASSET_FACTORY_INTERFACES[keyof typeof ASSET_FACTORY_INTERFACES];
