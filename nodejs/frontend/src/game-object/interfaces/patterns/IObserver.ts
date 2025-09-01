/**
 * Observer Pattern Interface
 * 
 * Defines observer functionality for game objects.
 * Handles event subscription, notification, and management.
 */

import type { IGameObject } from '../IGameObject';
import type { IObserverManager } from '../managers/IObserverManager';
import { GameObjectType } from '../../enums/GameObjectEnums';


/**
 * Observer types
 */
export enum ObserverType {
  SUBJECT = 'subject',
  OBSERVER = 'observer',
  BOTH = 'both'
}

/**
 * Observer states
 */
export enum ObserverState {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  ERROR = 'error'
}

/**
 * Observer event
 */
export interface ObserverEvent {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  source: string;
  target?: string;
  priority: number;
  metadata?: any;
}

/**
 * Observer subscription
 */
export interface ObserverSubscription {
  id: string;
  eventType: string;
  callback: (event: ObserverEvent) => void;
  priority: number;
  once: boolean;
  active: boolean;
  metadata?: any;
}

/**
 * Interface for observer game objects
 * 
 * Extends IGameObject with observer pattern functionality.
 */
export interface IObserver extends IGameObject {
  readonly gameObjectType: GameObjectType.OBSERVER;
  
  /** Observer type */
  observerType: ObserverType;
  
  /** Observer state */
  observerState: ObserverState;
  
  /** Observer manager */
  observerManager: IObserverManager;
  
  /** Observer ID */
  observerId: string;
  
  /** Observer name */
  observerName: string;
  
  /** Observer subscriptions */
  observerSubscriptions: ObserverSubscription[];
  
  /** Observer events */
  observerEvents: ObserverEvent[];
  
  /** Observer max events */
  observerMaxEvents: number;
  
  /** Observer event history */
  observerEventHistory: ObserverEvent[];
  
  /** Observer max history */
  observerMaxHistory: number;
  
  /** Observer priority */
  observerPriority: number;
  
  /** Observer metadata */
  observerMetadata: any;
  
  /** Set observer type */
  setObserverType(type: ObserverType): this;
  
  /** Set observer state */
  setObserverState(state: ObserverState): this;
  
  /** Set observer manager */
  setObserverManager(manager: IObserverManager): this;
  
  /** Set observer ID */
  setObserverId(id: string): this;
  
  /** Set observer name */
  setObserverName(name: string): this;
  
  /** Set observer subscriptions */
  setObserverSubscriptions(subscriptions: ObserverSubscription[]): this;
  
  /** Set observer events */
  setObserverEvents(events: ObserverEvent[]): this;
  
  /** Set observer max events */
  setObserverMaxEvents(max: number): this;
  
  /** Set observer event history */
  setObserverEventHistory(history: ObserverEvent[]): this;
  
  /** Set observer max history */
  setObserverMaxHistory(max: number): this;
  
  /** Set observer priority */
  setObserverPriority(priority: number): this;
  
  /** Set observer metadata */
  setObserverMetadata(metadata: any): this;
  
  /** Get observer type */
  getObserverType(): ObserverType;
  
  /** Get observer state */
  getObserverState(): ObserverState;
  
  /** Get observer manager */
  getObserverManager(): IObserverManager;
  
  /** Get observer ID */
  getObserverId(): string;
  
  /** Get observer name */
  getObserverName(): string;
  
  /** Get observer subscriptions */
  getObserverSubscriptions(): ObserverSubscription[];
  
  /** Get observer events */
  getObserverEvents(): ObserverEvent[];
  
  /** Get observer max events */
  getObserverMaxEvents(): number;
  
  /** Get observer event history */
  getObserverEventHistory(): ObserverEvent[];
  
  /** Get observer max history */
  getObserverMaxHistory(): number;
  
  /** Get observer priority */
  getObserverPriority(): number;
  
  /** Get observer metadata */
  getObserverMetadata(): any;
  
  /** Subscribe to event */
  subscribeToEvent(eventType: string, callback: (event: ObserverEvent) => void, options?: { priority?: number; once?: boolean; metadata?: any }): string;
  
  /** Unsubscribe from event */
  unsubscribeFromEvent(subscriptionId: string): this;
  
  /** Unsubscribe from all events */
  unsubscribeFromAllEvents(): this;
  
  /** Publish event */
  publishEvent(event: ObserverEvent): this;
  
  /** Notify observers */
  notifyObservers(event: ObserverEvent): this;
  
  /** Add event to history */
  addEventToHistory(event: ObserverEvent): this;
  
  /** Clear event history */
  clearEventHistory(): this;
  
  /** Get events by type */
  getEventsByType(eventType: string): ObserverEvent[];
  
  /** Get events by source */
  getEventsBySource(source: string): ObserverEvent[];
  
  /** Get events by time range */
  getEventsByTimeRange(startTime: number, endTime: number): ObserverEvent[];
  
  /** Check if has subscription */
  hasSubscription(eventType: string): boolean;
  
  /** Check if has active subscription */
  hasActiveSubscription(eventType: string): boolean;
  
  /** Check if can publish */
  canPublish(): boolean;
  
  /** Check if can subscribe */
  canSubscribe(): boolean;
  
  /** Update observer */
  updateObserver(deltaTime: number): void;
}
