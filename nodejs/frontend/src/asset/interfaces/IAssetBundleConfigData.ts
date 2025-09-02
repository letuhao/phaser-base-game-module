/**
 * Asset Bundle Configuration Data Interface
 *
 * Pure data structure for asset bundle configuration without implementation.
 * Used for configuration files and data transfer.
 */

import type { BundleType } from './IAssetBundle';
import type { AssetPriority } from './IAsset';

/**
 * Bundle configuration data structure
 */
export interface IAssetBundleConfigData {
  bundleId: string;
  bundleName: string;
  bundleType: BundleType;
  priority: AssetPriority;
  preload: boolean;
  cache: boolean;
  assetKeys: string[];
  metadata?: Record<string, unknown>;
}

/**
 * Bundle configuration data with additional properties
 */
export interface IAssetBundleConfigDataExtended extends IAssetBundleConfigData {
  description?: string;
  tags?: string[];
  estimatedSize?: number;
  loadOrder?: number;
  dependencies?: string[];
  conditions?: {
    platform?: string[];
    device?: string[];
    browser?: string[];
  };
  loadingStrategy?: {
    parallel?: boolean;
    maxConcurrent?: number;
    timeout?: number;
  };
}
