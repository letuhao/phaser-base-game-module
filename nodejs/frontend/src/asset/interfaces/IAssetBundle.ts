/**
 * Asset Bundle Interface
 * 
 * Defines asset bundle functionality for grouping related assets.
 */

import type { IAsset } from './IAsset';
import type { AssetType, AssetPriority } from './IAsset';

/**
 * Bundle types
 */
export enum BundleType {
  SCENE = 'scene',
  UI = 'ui',
  AUDIO = 'audio',
  TEXTURE = 'texture',
  FONT = 'font',
  CUSTOM = 'custom'
}

/**
 * Bundle states
 */
export enum BundleState {
  PENDING = 'pending',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
  DISPOSED = 'disposed'
}

/**
 * Bundle configuration
 */
export interface BundleConfig {
  bundleId: string;
  bundleName: string;
  bundleType: BundleType;
  priority: AssetPriority;
  preload: boolean;
  cache: boolean;
  metadata?: Record<string, any>;
}

/**
 * Bundle loading progress
 */
export interface BundleProgress {
  totalAssets: number;
  loadedAssets: number;
  failedAssets: number;
  percentage: number;
  estimatedTimeRemaining: number;
}

/**
 * Interface for asset bundles
 */
export interface IAssetBundle {
  readonly bundleId: string;
  readonly bundleType: BundleType;
  
  /** Bundle state */
  bundleState: BundleState;
  
  /** Bundle configuration */
  bundleConfig: BundleConfig;
  
  /** Bundle assets */
  bundleAssets: Map<string, IAsset>;
  
  /** Bundle progress */
  bundleProgress: BundleProgress;
  
  /** Bundle metadata */
  bundleMetadata: Record<string, any>;
  
  /** Set bundle state */
  setBundleState(state: BundleState): this;
  
  /** Set bundle configuration */
  setBundleConfig(config: BundleConfig): this;
  
  /** Set bundle metadata */
  setBundleMetadata(metadata: Record<string, any>): this;
  
  /** Get bundle state */
  getBundleState(): BundleState;
  
  /** Get bundle configuration */
  getBundleConfig(): BundleConfig;
  
  /** Get bundle assets */
  getBundleAssets(): Map<string, IAsset>;
  
  /** Get bundle progress */
  getBundleProgress(): BundleProgress;
  
  /** Get bundle metadata */
  getBundleMetadata(): Record<string, any>;
  
  /** Add asset to bundle */
  addAsset(asset: IAsset): this;
  
  /** Remove asset from bundle */
  removeAsset(assetKey: string): this;
  
  /** Get asset by key */
  getAsset(assetKey: string): IAsset | null;
  
  /** Get assets by type */
  getAssetsByType(assetType: AssetType): IAsset[];
  
  /** Load bundle */
  loadBundle(): Promise<this>;
  
  /** Unload bundle */
  unloadBundle(): Promise<this>;
  
  /** Check if bundle is loaded */
  isBundleLoaded(): boolean;
  
  /** Check if bundle is loading */
  isBundleLoading(): boolean;
  
  /** Get bundle size */
  getBundleSize(): number;
  
  /** Get bundle asset count */
  getBundleAssetCount(): number;
  
  /** Clone bundle */
  cloneBundle(): IAssetBundle;
  
  /** Dispose bundle */
  disposeBundle(): void;
}
