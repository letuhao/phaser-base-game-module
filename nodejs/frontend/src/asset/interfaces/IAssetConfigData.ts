/**
 * Asset Configuration Data Interface
 *
 * Pure data structure for asset configuration without implementation.
 * Used for configuration files and data transfer.
 */

import type { AssetType, AssetPriority } from './IAsset';

/**
 * Asset configuration data structure
 */
export interface IAssetConfigData {
  key: string;
  path: string;
  type: AssetType;
  priority: AssetPriority;
  preload: boolean;
  cache: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Asset configuration data with additional properties
 */
export interface IAssetConfigDataExtended extends IAssetConfigData {
  id?: string;
  description?: string;
  tags?: string[];
  size?: number;
  format?: string;
  compression?: string;
  quality?: number;
  dimensions?: {
    width: number;
    height: number;
  };
  dependencies?: string[];
  conditions?: {
    platform?: string[];
    device?: string[];
    browser?: string[];
  };
}
