/**
 * Asset Interface
 *
 * Defines the base interface for all assets in the system.
 */

/**
 * Asset types
 */
export enum AssetType {
  IMAGE = 'image',
  AUDIO = 'audio',
  SPRITE = 'sprite',
  FONT = 'font',
  VIDEO = 'video',
  JSON = 'json',
  XML = 'xml',
  TEXT = 'text',
  BINARY = 'binary',
  CUSTOM = 'custom',
}

/**
 * Asset states
 */
export enum AssetState {
  PENDING = 'pending',
  LOADING = 'loading',
  LOADED = 'loaded',
  FAILED = 'failed',
  CACHED = 'cached',
  DISPOSED = 'disposed',
}

/**
 * Asset loading priority
 */
export enum AssetPriority {
  CRITICAL = 'critical',
  HIGH = 'high',
  NORMAL = 'normal',
  LOW = 'low',
  BACKGROUND = 'background',
}

/**
 * Asset configuration
 */
export interface AssetConfig {
  key: string;
  path: string;
  type: AssetType;
  priority: AssetPriority;
  preload: boolean;
  cache: boolean;
  metadata?: Record<string, any>;
}

/**
 * Interface for assets
 */
export interface IAsset {
  readonly assetId: string;
  readonly assetKey: string;
  readonly assetType: AssetType;

  /** Asset state */
  assetState: AssetState;

  /** Asset configuration */
  assetConfig: AssetConfig;

  /** Asset data */
  assetData: any;

  /** Asset size in bytes */
  assetSize: number;

  /** Asset load time */
  assetLoadTime: number;

  /** Asset last accessed time */
  assetLastAccessedTime: number;

  /** Asset access count */
  assetAccessCount: number;

  /** Asset metadata */
  assetMetadata: Record<string, any>;

  /** Set asset state */
  setAssetState(state: AssetState): this;

  /** Set asset configuration */
  setAssetConfig(config: AssetConfig): this;

  /** Set asset data */
  setAssetData(data: any): this;

  /** Set asset size */
  setAssetSize(size: number): this;

  /** Set asset load time */
  setAssetLoadTime(time: number): this;

  /** Set asset last accessed time */
  setAssetLastAccessedTime(time: number): this;

  /** Set asset access count */
  setAssetAccessCount(count: number): this;

  /** Set asset metadata */
  setAssetMetadata(metadata: Record<string, any>): this;

  /** Get asset state */
  getAssetState(): AssetState;

  /** Get asset configuration */
  getAssetConfig(): AssetConfig;

  /** Get asset data */
  getAssetData(): any;

  /** Get asset size */
  getAssetSize(): number;

  /** Get asset load time */
  getAssetLoadTime(): number;

  /** Get asset last accessed time */
  getAssetLastAccessedTime(): number;

  /** Get asset access count */
  getAssetAccessCount(): number;

  /** Get asset metadata */
  getAssetMetadata(): Record<string, any>;

  /** Load asset */
  loadAsset(): Promise<this>;

  /** Unload asset */
  unloadAsset(): Promise<this>;

  /** Check if asset is loaded */
  isAssetLoaded(): boolean;

  /** Check if asset is cached */
  isAssetCached(): boolean;

  /** Check if asset is preloadable */
  isAssetPreloadable(): boolean;

  /** Get asset URL */
  getAssetUrl(): string;

  /** Clone asset */
  cloneAsset(): IAsset;

  /** Dispose asset */
  disposeAsset(): void;
}
