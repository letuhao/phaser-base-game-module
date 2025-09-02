/**
 * Observer Manager Interface
 *
 * Defines management functionality for observer pattern implementations.
 * Handles observer lifecycle, event subscription, and notification management.
 */

import type { IObserver } from '../patterns/IObserver';
import type { IGameObject } from '../IGameObject';
// ObserverManagerOperation is now imported from the centralized enum system

/**
 * Observer manager configuration
 */
export interface ObserverManagerConfig {
  maxObservers: number;
  maxSubscriptions: number;
  enableEventFiltering: boolean;
  enablePriorityQueue: boolean;
  enableAsyncNotifications: boolean;
  notificationTimeout: number;
  metadata?: Record<string, any>;
}

/**
 * Observer manager statistics
 */
export interface ObserverManagerStatistics {
  totalObservers: number;
  activeObservers: number;
  totalSubscriptions: number;
  totalNotifications: number;
  averageNotificationTime: number;
  lastNotificationTime: number;
  observersByEventType: Record<string, number>;
  subscriptionCounts: Record<string, number>;
}

/**
 * Observer event
 */
export interface ObserverEvent {
  eventType: string;
  eventData: any;
  eventSource: IGameObject;
  eventTimestamp: number;
  eventPriority: number;
  eventMetadata?: Record<string, any>;
}

/**
 * Observer subscription
 */
export interface ObserverSubscription {
  subscriptionId: string;
  observerId: string;
  eventType: string;
  callback: (event: ObserverEvent) => void;
  priority: number;
  once: boolean;
  metadata?: Record<string, any>;
}

/**
 * Interface for observer managers
 */
export interface IObserverManager {
  readonly observerManagerId: string;

  /** Observer manager configuration */
  observerManagerConfig: ObserverManagerConfig;

  /** Managed observers */
  managedObservers: Map<string, IObserver>;

  /** Event subscriptions */
  eventSubscriptions: Map<string, ObserverSubscription[]>;

  /** Observer manager statistics */
  observerManagerStatistics: ObserverManagerStatistics;

  /** Observer manager metadata */
  observerManagerMetadata: Record<string, any>;

  /** Set observer manager configuration */
  setObserverManagerConfig(config: ObserverManagerConfig): this;

  /** Set observer manager metadata */
  setObserverManagerMetadata(metadata: Record<string, any>): this;

  /** Get observer manager configuration */
  getObserverManagerConfig(): ObserverManagerConfig;

  /** Get managed observers */
  getManagedObservers(): Map<string, IObserver>;

  /** Get event subscriptions */
  getEventSubscriptions(): Map<string, ObserverSubscription[]>;

  /** Get observer manager statistics */
  getObserverManagerStatistics(): ObserverManagerStatistics;

  /** Get observer manager metadata */
  getObserverManagerMetadata(): Record<string, any>;

  /** Create observer */
  createObserver(observerId: string): Promise<IObserver>;

  /** Destroy observer */
  destroyObserver(observerId: string): Promise<boolean>;

  /** Manage observer */
  manageObserver(observer: IObserver): Promise<this>;

  /** Subscribe to event */
  subscribeToEvent(
    observerId: string,
    eventType: string,
    callback: (event: ObserverEvent) => void,
    options?: { priority?: number; once?: boolean; metadata?: any }
  ): string;

  /** Unsubscribe from event */
  unsubscribeFromEvent(observerId: string, subscriptionId: string): Promise<boolean>;

  /** Notify observers */
  notifyObservers(event: ObserverEvent): Promise<this>;

  /** Get observer by ID */
  getObserver(observerId: string): IObserver | null;

  /** Check if observer exists */
  hasObserver(observerId: string): boolean;

  /** Get observers by event type */
  getObserversByEventType(eventType: string): IObserver[];

  /** Get subscriptions by event type */
  getSubscriptionsByEventType(eventType: string): ObserverSubscription[];

  /** Clear observer subscriptions */
  clearObserverSubscriptions(observerId: string): Promise<this>;

  /** Clear all subscriptions */
  clearAllSubscriptions(): Promise<this>;

  /** Update observer manager */
  updateObserverManager(deltaTime: number): void;
}
