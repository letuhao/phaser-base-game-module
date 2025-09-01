/**
 * Asset Statistics Manager Interface
 * 
 * Defines statistics collection and analysis functionality for assets.
 */

import type { IAsset } from '../IAsset';
import type { IAssetBundle } from '../IAssetBundle';
import type { AssetType, AssetPriority, AssetState } from '../IAsset';
import type { BundleType, BundleState } from '../IAssetBundle';

/**
 * Statistics types
 */
export enum StatisticsType {
  PERFORMANCE = 'performance',
  USAGE = 'usage',
  MEMORY = 'memory',
  LOADING = 'loading',
  CACHING = 'caching',
  POOLING = 'pooling'
}

/**
 * Statistics configuration
 */
export interface StatisticsConfig {
  enablePerformanceTracking: boolean;
  enableUsageTracking: boolean;
  enableMemoryTracking: boolean;
  enableLoadingTracking: boolean;
  enableCachingTracking: boolean;
  enablePoolingTracking: boolean;
  collectionInterval: number;
  retentionPeriod: number;
  metadata?: Record<string, any>;
}

/**
 * Asset statistics
 */
export interface AssetStatistics {
  totalAssets: number;
  loadedAssets: number;
  failedAssets: number;
  cachedAssets: number;
  pooledAssets: number;
  assetsByType: Record<AssetType, number>;
  assetsByPriority: Record<AssetPriority, number>;
  assetsByState: Record<AssetState, number>;
  totalSize: number;
  averageSize: number;
  totalLoadTime: number;
  averageLoadTime: number;
  totalAccessCount: number;
  averageAccessCount: number;
  lastUpdateTime: number;
}

/**
 * Bundle statistics
 */
export interface BundleStatistics {
  totalBundles: number;
  loadedBundles: number;
  failedBundles: number;
  bundlesByType: Record<BundleType, number>;
  bundlesByState: Record<BundleState, number>;
  totalBundleSize: number;
  averageBundleSize: number;
  totalBundleLoadTime: number;
  averageBundleLoadTime: number;
  lastUpdateTime: number;
}

/**
 * Performance statistics
 */
export interface PerformanceStatistics {
  totalOperations: number;
  successfulOperations: number;
  failedOperations: number;
  averageOperationTime: number;
  peakOperationTime: number;
  totalMemoryUsage: number;
  peakMemoryUsage: number;
  cacheHitRate: number;
  poolHitRate: number;
  lastUpdateTime: number;
}

/**
 * Statistics snapshot
 */
export interface StatisticsSnapshot {
  timestamp: number;
  assetStatistics: AssetStatistics;
  bundleStatistics: BundleStatistics;
  performanceStatistics: PerformanceStatistics;
  metadata?: Record<string, any>;
}

/**
 * Interface for asset statistics managers
 */
export interface IAssetStatisticsManager {
  readonly statisticsManagerId: string;
  
  /** Statistics configuration */
  statisticsConfig: StatisticsConfig;
  
  /** Current statistics */
  currentStatistics: StatisticsSnapshot;
  
  /** Statistics history */
  statisticsHistory: StatisticsSnapshot[];
  
  /** Statistics metadata */
  statisticsMetadata: Record<string, any>;
  
  /** Set statistics configuration */
  setStatisticsConfig(config: StatisticsConfig): this;
  
  /** Set statistics metadata */
  setStatisticsMetadata(metadata: Record<string, any>): this;
  
  /** Get statistics configuration */
  getStatisticsConfig(): StatisticsConfig;
  
  /** Get current statistics */
  getCurrentStatistics(): StatisticsSnapshot;
  
  /** Get statistics history */
  getStatisticsHistory(): StatisticsSnapshot[];
  
  /** Get statistics metadata */
  getStatisticsMetadata(): Record<string, any>;
  
  /** Record asset operation */
  recordAssetOperation(asset: IAsset, operation: string, duration: number, success: boolean): void;
  
  /** Record bundle operation */
  recordBundleOperation(bundle: IAssetBundle, operation: string, duration: number, success: boolean): void;
  
  /** Record performance metric */
  recordPerformanceMetric(metric: string, value: number, timestamp?: number): void;
  
  /** Record memory usage */
  recordMemoryUsage(usage: number, timestamp?: number): void;
  
  /** Record cache operation */
  recordCacheOperation(operation: string, hit: boolean, duration: number): void;
  
  /** Record pool operation */
  recordPoolOperation(operation: string, hit: boolean, duration: number): void;
  
  /** Get asset statistics */
  getAssetStatistics(): AssetStatistics;
  
  /** Get bundle statistics */
  getBundleStatistics(): BundleStatistics;
  
  /** Get performance statistics */
  getPerformanceStatistics(): PerformanceStatistics;
  
  /** Get statistics by type */
  getStatisticsByType(type: StatisticsType): any;
  
  /** Get statistics for time range */
  getStatisticsForTimeRange(startTime: number, endTime: number): StatisticsSnapshot[];
  
  /** Get statistics summary */
  getStatisticsSummary(): {
    totalAssets: number;
    totalBundles: number;
    totalOperations: number;
    successRate: number;
    averagePerformance: number;
  };
  
  /** Clear statistics */
  clearStatistics(): this;
  
  /** Clear statistics history */
  clearStatisticsHistory(): this;
  
  /** Export statistics */
  exportStatistics(): string;
  
  /** Import statistics */
  importStatistics(data: string): this;
  
  /** Update statistics manager */
  updateStatisticsManager(deltaTime: number): void;
}
