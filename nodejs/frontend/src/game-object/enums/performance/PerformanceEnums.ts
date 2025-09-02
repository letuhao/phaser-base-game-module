/**
 * Performance System Enums
 *
 * Enums for performance optimization, caching, and performance-specific functionality
 */

// ============================================================================
// PERFORMANCE ENUMS
// ============================================================================

/**
 * Sync states enum
 */
export enum SyncState {
  UNSYNCED = 'unsynced',
  SYNCING = 'syncing',
  SYNCED = 'synced',
  FAILED = 'failed',
  CUSTOM = 'custom',
}

/**
 * Sync modes enum
 */
export enum SyncMode {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
  HYBRID = 'hybrid',
  CUSTOM = 'custom',
}

/**
 * Conflict resolution strategies enum
 */
export enum ConflictResolutionStrategy {
  LAST_WRITE_WINS = 'last-write-wins',
  FIRST_WRITE_WINS = 'first-write-wins',
  MERGE = 'merge',
  MANUAL = 'manual',
  CUSTOM = 'custom',
}

/**
 * Pool states enum
 */
export enum PoolState {
  EMPTY = 'empty',
  AVAILABLE = 'available',
  FULL = 'full',
  CUSTOM = 'custom',
}

/**
 * Pool types enum
 */
export enum PoolType {
  OBJECT = 'object',
  MEMORY = 'memory',
  CONNECTION = 'connection',
  CUSTOM = 'custom',
}

// NetworkState, NetworkAuthority, and NetworkUpdateMode are now imported from Network System
// to avoid duplication and ensure consistency across the application

/**
 * Cache states enum
 */
export enum CacheState {
  EMPTY = 'empty',
  LOADING = 'loading',
  LOADED = 'loaded',
  EXPIRED = 'expired',
  CUSTOM = 'custom',
}

/**
 * Cache types enum
 */
export enum CacheType {
  MEMORY = 'memory',
  DISK = 'disk',
  NETWORK = 'network',
  HYBRID = 'hybrid',
  CUSTOM = 'custom',
}

/**
 * LOD (Level of Detail) levels enum
 */
export enum LODLevel {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  CUSTOM = 'custom',
}

/**
 * Culling types enum
 */
export enum CullingType {
  FRUSTUM = 'frustum',
  OCCLUSION = 'occlusion',
  DISTANCE = 'distance',
  CUSTOM = 'custom',
}

/**
 * Optimization states enum
 */
export enum OptimizationState {
  NONE = 'none',
  BASIC = 'basic',
  ADVANCED = 'advanced',
  MAXIMUM = 'maximum',
  CUSTOM = 'custom',
}
