/**
 * Scene Asset Configuration Data Interface
 *
 * Pure data structure for scene asset configuration without implementation.
 * Used for configuration files and data transfer.
 */

import type { AssetPriority } from '../IAsset';
import type { LoadingStrategy } from '../../enums/AssetEnums';
import type { IAssetConfigData } from '../IAssetConfigData';
import type { IAssetBundleConfigData } from '../IAssetBundleConfigData';

/**
 * Scene asset configuration data structure
 */
export interface ISceneAssetConfigData {
  sceneId: string;
  basePath: string;
  assets: IAssetConfigData[];
  bundles: IAssetBundleConfigData[];
  loading: {
    preload: boolean;
    priority: AssetPriority[];
    strategy: LoadingStrategy;
  };
  validation: {
    required: string[];
    optional: string[];
    fallbacks: Record<string, string>;
  };
  responsive: {
    breakpoints: Record<
      string,
      {
        assets: string[];
        bundles: string[];
      }
    >;
    defaultBreakpoint: string;
  };
  metadata?: Record<string, unknown>;
}

/**
 * Scene asset configuration data with additional properties
 */
export interface ISceneAssetConfigDataExtended extends ISceneAssetConfigData {
  version?: string;
  createdDate?: string;
  lastModified?: string;
  description?: string;
  tags?: string[];
  author?: string;
  license?: string;
  estimatedLoadTime?: number;
  totalAssetSize?: number;
  responsiveSupport?: boolean;
  preloadStrategy?: string;
  performance?: {
    maxConcurrentLoads?: number;
    timeout?: number;
    retryAttempts?: number;
    retryDelay?: number;
  };
  optimization?: {
    compression?: boolean;
    lazyLoading?: boolean;
    progressiveLoading?: boolean;
    cacheStrategy?: string;
  };
}
