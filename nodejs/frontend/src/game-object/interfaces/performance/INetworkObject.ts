/**
 * Network Object Interface
 * 
 * Defines network synchronization functionality for game objects.
 * Handles multiplayer synchronization and networking.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType } from '../../enums/GameObjectEnums';


/**
 * Network states
 */
export enum NetworkState {
  LOCAL = 'local',
  REMOTE = 'remote',
  SYNCHRONIZING = 'synchronizing',
  CONFLICT = 'conflict',
  DISCONNECTED = 'disconnected'
}

/**
 * Network authorities
 */
export enum NetworkAuthority {
  SERVER = 'server',
  CLIENT = 'client',
  OWNER = 'owner',
  NONE = 'none'
}

/**
 * Network update modes
 */
export enum NetworkUpdateMode {
  CONTINUOUS = 'continuous',
  ON_CHANGE = 'on_change',
  MANUAL = 'manual',
  INTERVAL = 'interval'
}

/**
 * Interface for network game objects
 * 
 * Extends IGameObject with network synchronization functionality.
 */
export interface INetworkObject extends IGameObject {
  readonly gameObjectType: GameObjectType.NETWORK_OBJECT;
  
  /** Network state */
  networkState: NetworkState;
  
  /** Network authority */
  networkAuthority: NetworkAuthority;
  
  /** Network update mode */
  networkUpdateMode: NetworkUpdateMode;
  
  /** Network ID */
  networkId: string;
  
  /** Network owner ID */
  networkOwnerId: string;
  
  /** Network client ID */
  networkClientId: string;
  
  /** Network server ID */
  networkServerId: string;
  
  /** Network manager */
  networkManager: any; // INetworkManager
  
  /** Network synchronized properties */
  networkSynchronizedProperties: string[];
  
  /** Network update interval */
  networkUpdateInterval: number;
  
  /** Network last update time */
  networkLastUpdateTime: number;
  
  /** Network update count */
  networkUpdateCount: number;
  
  /** Network latency */
  networkLatency: number;
  
  /** Network bandwidth */
  networkBandwidth: number;
  
  /** Network compression */
  networkCompression: boolean;
  
  /** Network encryption */
  networkEncryption: boolean;
  
  /** Network reliability */
  networkReliability: boolean;
  
  /** Network priority */
  networkPriority: number;
  
  /** Network tags */
  networkTags: string[];
  
  /** Network data */
  networkData: any;
  
  /** Network metadata */
  networkMetadata: any;
  
  /** Set network state */
  setNetworkState(state: NetworkState): this;
  
  /** Set network authority */
  setNetworkAuthority(authority: NetworkAuthority): this;
  
  /** Set network update mode */
  setNetworkUpdateMode(mode: NetworkUpdateMode): this;
  
  /** Set network ID */
  setNetworkId(id: string): this;
  
  /** Set network owner ID */
  setNetworkOwnerId(ownerId: string): this;
  
  /** Set network client ID */
  setNetworkClientId(clientId: string): this;
  
  /** Set network server ID */
  setNetworkServerId(serverId: string): this;
  
  /** Set network manager */
  setNetworkManager(manager: any): this;
  
  /** Set network synchronized properties */
  setNetworkSynchronizedProperties(properties: string[]): this;
  
  /** Set network update interval */
  setNetworkUpdateInterval(interval: number): this;
  
  /** Set network last update time */
  setNetworkLastUpdateTime(time: number): this;
  
  /** Set network update count */
  setNetworkUpdateCount(count: number): this;
  
  /** Set network latency */
  setNetworkLatency(latency: number): this;
  
  /** Set network bandwidth */
  setNetworkBandwidth(bandwidth: number): this;
  
  /** Set network compression */
  setNetworkCompression(compression: boolean): this;
  
  /** Set network encryption */
  setNetworkEncryption(encryption: boolean): this;
  
  /** Set network reliability */
  setNetworkReliability(reliability: boolean): this;
  
  /** Set network priority */
  setNetworkPriority(priority: number): this;
  
  /** Set network tags */
  setNetworkTags(tags: string[]): this;
  
  /** Set network data */
  setNetworkData(data: any): this;
  
  /** Set network metadata */
  setNetworkMetadata(metadata: any): this;
  
  /** Get network state */
  getNetworkState(): NetworkState;
  
  /** Get network authority */
  getNetworkAuthority(): NetworkAuthority;
  
  /** Get network update mode */
  getNetworkUpdateMode(): NetworkUpdateMode;
  
  /** Get network ID */
  getNetworkId(): string;
  
  /** Get network owner ID */
  getNetworkOwnerId(): string;
  
  /** Get network client ID */
  getNetworkClientId(): string;
  
  /** Get network server ID */
  getNetworkServerId(): string;
  
  /** Get network manager */
  getNetworkManager(): any;
  
  /** Get network synchronized properties */
  getNetworkSynchronizedProperties(): string[];
  
  /** Get network update interval */
  getNetworkUpdateInterval(): number;
  
  /** Get network last update time */
  getNetworkLastUpdateTime(): number;
  
  /** Get network update count */
  getNetworkUpdateCount(): number;
  
  /** Get network latency */
  getNetworkLatency(): number;
  
  /** Get network bandwidth */
  getNetworkBandwidth(): number;
  
  /** Get network compression */
  getNetworkCompression(): boolean;
  
  /** Get network encryption */
  getNetworkEncryption(): boolean;
  
  /** Get network reliability */
  getNetworkReliability(): boolean;
  
  /** Get network priority */
  getNetworkPriority(): number;
  
  /** Get network tags */
  getNetworkTags(): string[];
  
  /** Get network data */
  getNetworkData(): any;
  
  /** Get network metadata */
  getNetworkMetadata(): any;
  
  /** Synchronize network object */
  synchronizeNetworkObject(): this;
  
  /** Send network update */
  sendNetworkUpdate(): this;
  
  /** Receive network update */
  receiveNetworkUpdate(data: any): this;
  
  /** Check if network object should update */
  shouldNetworkObjectUpdate(): boolean;
  
  /** Check if network object is authoritative */
  isNetworkObjectAuthoritative(): boolean;
  
  /** Update network object */
  updateNetworkObject(deltaTime: number): void;
}
