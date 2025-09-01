/**
 * Sync Object Interface
 * 
 * Defines synchronization functionality for game objects.
 * Handles state synchronization and conflict resolution.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Sync states
 */
export enum SyncState {
  SYNCHRONIZED = 'synchronized',
  PENDING = 'pending',
  CONFLICT = 'conflict',
  OUT_OF_SYNC = 'out_of_sync',
  DISABLED = 'disabled'
}

/**
 * Sync modes
 */
export enum SyncMode {
  AUTOMATIC = 'automatic',
  MANUAL = 'manual',
  ON_DEMAND = 'on_demand',
  INTERVAL = 'interval'
}

/**
 * Conflict resolution strategies
 */
export enum ConflictResolutionStrategy {
  SERVER_WINS = 'server_wins',
  CLIENT_WINS = 'client_wins',
  LAST_WRITE_WINS = 'last_write_wins',
  MERGE = 'merge',
  CUSTOM = 'custom'
}

/**
 * Interface for sync game objects
 * 
 * Extends IGameObject with synchronization functionality.
 */
export interface ISyncObject extends IGameObject {
  readonly gameObjectType: GameObjectType.SYNC_OBJECT;
  
  /** Sync state */
  syncState: SyncState;
  
  /** Sync mode */
  syncMode: SyncMode;
  
  /** Conflict resolution strategy */
  conflictResolutionStrategy: ConflictResolutionStrategy;
  
  /** Sync manager */
  syncManager: any; // ISyncManager
  
  /** Sync ID */
  syncId: string;
  
  /** Sync version */
  syncVersion: number;
  
  /** Sync timestamp */
  syncTimestamp: number;
  
  /** Sync interval */
  syncInterval: number;
  
  /** Sync last sync time */
  syncLastSyncTime: number;
  
  /** Sync sync count */
  syncSyncCount: number;
  
  /** Sync conflict count */
  syncConflictCount: number;
  
  /** Sync retry count */
  syncRetryCount: number;
  
  /** Sync max retries */
  syncMaxRetries: number;
  
  /** Sync timeout */
  syncTimeout: number;
  
  /** Sync enabled */
  syncEnabled: boolean;
  
  /** Sync auto resolve */
  syncAutoResolve: boolean;
  
  /** Sync properties */
  syncProperties: string[];
  
  /** Sync data */
  syncData: any;
  
  /** Sync metadata */
  syncMetadata: any;
  
  /** Sync conflicts */
  syncConflicts: any[];
  
  /** Set sync state */
  setSyncState(state: SyncState): this;
  
  /** Set sync mode */
  setSyncMode(mode: SyncMode): this;
  
  /** Set conflict resolution strategy */
  setConflictResolutionStrategy(strategy: ConflictResolutionStrategy): this;
  
  /** Set sync manager */
  setSyncManager(manager: any): this;
  
  /** Set sync ID */
  setSyncId(id: string): this;
  
  /** Set sync version */
  setSyncVersion(version: number): this;
  
  /** Set sync timestamp */
  setSyncTimestamp(timestamp: number): this;
  
  /** Set sync interval */
  setSyncInterval(interval: number): this;
  
  /** Set sync last sync time */
  setSyncLastSyncTime(time: number): this;
  
  /** Set sync sync count */
  setSyncSyncCount(count: number): this;
  
  /** Set sync conflict count */
  setSyncConflictCount(count: number): this;
  
  /** Set sync retry count */
  setSyncRetryCount(count: number): this;
  
  /** Set sync max retries */
  setSyncMaxRetries(max: number): this;
  
  /** Set sync timeout */
  setSyncTimeout(timeout: number): this;
  
  /** Set sync enabled */
  setSyncEnabled(enabled: boolean): this;
  
  /** Set sync auto resolve */
  setSyncAutoResolve(autoResolve: boolean): this;
  
  /** Set sync properties */
  setSyncProperties(properties: string[]): this;
  
  /** Set sync data */
  setSyncData(data: any): this;
  
  /** Set sync metadata */
  setSyncMetadata(metadata: any): this;
  
  /** Set sync conflicts */
  setSyncConflicts(conflicts: any[]): this;
  
  /** Get sync state */
  getSyncState(): SyncState;
  
  /** Get sync mode */
  getSyncMode(): SyncMode;
  
  /** Get conflict resolution strategy */
  getConflictResolutionStrategy(): ConflictResolutionStrategy;
  
  /** Get sync manager */
  getSyncManager(): any;
  
  /** Get sync ID */
  getSyncId(): string;
  
  /** Get sync version */
  getSyncVersion(): number;
  
  /** Get sync timestamp */
  getSyncTimestamp(): number;
  
  /** Get sync interval */
  getSyncInterval(): number;
  
  /** Get sync last sync time */
  getSyncLastSyncTime(): number;
  
  /** Get sync sync count */
  getSyncSyncCount(): number;
  
  /** Get sync conflict count */
  getSyncConflictCount(): number;
  
  /** Get sync retry count */
  getSyncRetryCount(): number;
  
  /** Get sync max retries */
  getSyncMaxRetries(): number;
  
  /** Get sync timeout */
  getSyncTimeout(): number;
  
  /** Get sync enabled */
  getSyncEnabled(): boolean;
  
  /** Get sync auto resolve */
  getSyncAutoResolve(): boolean;
  
  /** Get sync properties */
  getSyncProperties(): string[];
  
  /** Get sync data */
  getSyncData(): any;
  
  /** Get sync metadata */
  getSyncMetadata(): any;
  
  /** Get sync conflicts */
  getSyncConflicts(): any[];
  
  /** Synchronize object */
  synchronizeObject(): this;
  
  /** Resolve conflicts */
  resolveConflicts(): this;
  
  /** Check if object is synchronized */
  isObjectSynchronized(): boolean;
  
  /** Check if object has conflicts */
  hasObjectConflicts(): boolean;
  
  /** Check if object should sync */
  shouldObjectSync(): boolean;
  
  /** Update sync object */
  updateSyncObject(deltaTime: number): void;
}
