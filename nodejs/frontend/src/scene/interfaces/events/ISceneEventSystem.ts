/**
 * Scene Event System Interface
 *
 * Defines event system functionality for scene management.
 * Handles scene events, subscriptions, and notifications.
 */

// Note: These imports are kept for future extensibility
// import type { ISceneElement } from '../ISceneElement';
// import type { ISceneConfig } from '../ISceneConfig';
// import type { ISceneBuilder } from '../ISceneBuilder';
import { SceneEventType, SceneEventPriority } from '../../enums';

// SceneEventType and SceneEventPriority are now imported from centralized enums

/**
 * Scene event system configuration
 */
export interface SceneEventSystemConfig {
  maxSubscriptions: number;
  enableEventFiltering: boolean;
  enablePriorityQueue: boolean;
  enableAsyncEvents: boolean;
  eventTimeout: number;
  enableEventLogging: boolean;
  metadata?: Record<string, any>;
}

/**
 * Scene event system statistics
 */
export interface SceneEventSystemStatistics {
  totalEvents: number;
  totalSubscriptions: number;
  totalNotifications: number;
  averageNotificationTime: number;
  lastEventTime: number;
  eventsByType: Record<SceneEventType, number>;
  subscriptionCounts: Record<SceneEventType, number>;
}

/**
 * Scene event
 */
export interface SceneEvent {
  eventId: string;
  eventType: SceneEventType;
  eventSource: string;
  eventData: any;
  eventTimestamp: number;
  eventPriority: SceneEventPriority;
  eventMetadata?: Record<string, any>;
}

/**
 * Scene event subscription
 */
export interface SceneEventSubscription {
  subscriptionId: string;
  eventType: SceneEventType;
  callback: (event: SceneEvent) => void;
  priority: SceneEventPriority;
  once: boolean;
  metadata?: Record<string, any>;
}

/**
 * Interface for scene event systems
 */
export interface ISceneEventSystem {
  readonly eventSystemId: string;

  /** Event system configuration */
  eventSystemConfig: SceneEventSystemConfig;

  /** Event subscriptions */
  eventSubscriptions: Map<SceneEventType, SceneEventSubscription[]>;

  /** Event system statistics */
  eventSystemStatistics: SceneEventSystemStatistics;

  /** Event system metadata */
  eventSystemMetadata: Record<string, any>;

  /** Set event system configuration */
  setEventSystemConfig(config: SceneEventSystemConfig): this;

  /** Set event system metadata */
  setEventSystemMetadata(metadata: Record<string, any>): this;

  /** Get event system configuration */
  getEventSystemConfig(): SceneEventSystemConfig;

  /** Get event subscriptions */
  getEventSubscriptions(): Map<SceneEventType, SceneEventSubscription[]>;

  /** Get event system statistics */
  getEventSystemStatistics(): SceneEventSystemStatistics;

  /** Get event system metadata */
  getEventSystemMetadata(): Record<string, any>;

  /** Subscribe to event */
  subscribeToEvent(
    eventType: SceneEventType,
    callback: (event: SceneEvent) => void,
    options?: { priority?: SceneEventPriority; once?: boolean; metadata?: any }
  ): string;

  /** Unsubscribe from event */
  unsubscribeFromEvent(eventType: SceneEventType, subscriptionId: string): Promise<boolean>;

  /** Emit event */
  emitEvent(event: SceneEvent): Promise<this>;

  /** Emit scene event */
  emitSceneEvent(
    eventType: SceneEventType,
    eventData: any,
    eventSource: string,
    options?: { priority?: SceneEventPriority; metadata?: any }
  ): Promise<this>;

  /** Get subscriptions by event type */
  getSubscriptionsByEventType(eventType: SceneEventType): SceneEventSubscription[];

  /** Clear event subscriptions */
  clearEventSubscriptions(eventType?: SceneEventType): Promise<this>;

  /** Update event system */
  updateEventSystem(deltaTime: number): void;
}
