import type { IConfiguration } from '../interfaces/IConfiguration';

/**
 * Assets loading configuration interface for game resources
 * Manages loading, caching, and lifecycle of game assets
 */
export interface IAssetsConfig extends IConfiguration {
  /** Base URL for all assets */
  readonly baseUrl: string;

  /** Asset loading strategy */
  readonly loadingStrategy: 'eager' | 'lazy' | 'progressive' | 'onDemand';

  /** Asset categories and their configurations */
  readonly categories: {
    [category: string]: {
      /** Priority for loading (higher = loaded first) */
      priority: number;
      /** Whether to preload this category */
      preload: boolean;
      /** Maximum concurrent downloads for this category */
      maxConcurrent: number;
      /** Retry configuration */
      retry: {
        maxAttempts: number;
        delay: number;
        backoff: 'linear' | 'exponential';
      };
      /** Cache configuration */
      cache: {
        enabled: boolean;
        maxSize: number;
        ttl: number;
        strategy: 'lru' | 'fifo' | 'lfu';
      };
    };
  };

  /** Asset definitions */
  readonly assets: {
    [assetId: string]: {
      /** Asset type */
      type: 'image' | 'audio' | 'video' | 'json' | 'text' | 'binary';
      /** Asset URL (relative to baseUrl) */
      url: string;
      /** Asset category */
      category: string;
      /** Asset metadata */
      metadata: {
        width?: number;
        height?: number;
        duration?: number;
        format?: string;
        size?: number;
        checksum?: string;
      };
      /** Dependencies (other assets that must load first) */
      dependencies?: string[];
      /** Alternative URLs for fallback */
      fallbacks?: string[];
      /** Whether this asset is required for the game to start */
      required: boolean;
      /** Loading timeout in milliseconds */
      timeout: number;
    };
  };

  /** Loading progress tracking */
  readonly progress: {
    /** Total assets to load */
    total: number;
    /** Currently loaded assets */
    loaded: number;
    /** Currently loading assets */
    loading: number;
    /** Failed assets */
    failed: number;
    /** Overall progress percentage */
    percentage: number;
  };

  /** Performance settings */
  readonly performance: {
    /** Maximum concurrent downloads across all categories */
    maxConcurrentDownloads: number;
    /** Download timeout in milliseconds */
    downloadTimeout: number;
    /** Whether to use compression */
    useCompression: boolean;
    /** Whether to use CDN */
    useCDN: boolean;
    /** CDN configuration */
    cdn: {
      enabled: boolean;
      urls: string[];
      fallbackStrategy: 'roundRobin' | 'failover' | 'geographic';
    };
  };

  /** Error handling configuration */
  readonly errorHandling: {
    /** Whether to continue loading on asset failure */
    continueOnFailure: boolean;
    /** Whether to show loading errors to user */
    showErrors: boolean;
    /** Custom error messages */
    errorMessages: {
      [errorCode: string]: string;
    };
    /** Fallback assets for failed loads */
    fallbacks: {
      [assetId: string]: string;
    };
  };

  /** Memory management */
  readonly memory: {
    /** Maximum memory usage for assets */
    maxMemoryUsage: number;
    /** Memory cleanup strategy */
    cleanupStrategy: 'aggressive' | 'moderate' | 'conservative';
    /** Whether to unload unused assets */
    unloadUnused: boolean;
    /** Unload threshold (percentage of memory usage) */
    unloadThreshold: number;
  };

  /** Get asset configuration by ID */
  getAsset(assetId: string): IAssetsConfig['assets'][string] | null;

  /** Get all assets in a category */
  getAssetsByCategory(category: string): string[];

  /** Check if asset is loaded */
  isAssetLoaded(assetId: string): boolean;

  /** Get loading progress for a category */
  getCategoryProgress(category: string): IAssetsConfig['progress'];

  /** Get total loading progress */
  getTotalProgress(): IAssetsConfig['progress'];

  /** Check if all required assets are loaded */
  areRequiredAssetsLoaded(): boolean;

  /** Get failed assets */
  getFailedAssets(): string[];

  /** Retry loading a failed asset */
  retryAsset(assetId: string): Promise<boolean>;

  /** Preload assets in a category */
  preloadCategory(category: string): Promise<void>;

  /** Unload assets in a category */
  unloadCategory(category: string): void;

  /** Clear asset cache */
  clearCache(): void;

  /** Get memory usage statistics */
  getMemoryUsage(): {
    used: number;
    available: number;
    percentage: number;
  };
}
