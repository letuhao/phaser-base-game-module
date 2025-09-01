/**
 * Game Object Events Interface
 * 
 * Defines event-related properties and methods for game objects.
 * This interface focuses solely on event handling concerns.
 */

import * as Phaser from 'phaser';

/**
 * Interface for game object event handling
 */
export interface IGameObjectEvents {
  // ============================================================================
  // EVENT PROPERTIES
  // ============================================================================
  
  /** Event emitter for this game object */
  readonly gameObjectEvents: Phaser.Events.EventEmitter;
  
  // ============================================================================
  // EVENT METHODS
  // ============================================================================
  
  /** Add event listener */
  onGameObjectEvent(event: string, callback: Function, context?: any): this;
  
  /** Add one-time event listener */
  onceGameObjectEvent(event: string, callback: Function, context?: any): this;
  
  /** Remove event listener */
  offGameObjectEvent(event: string, callback?: Function, context?: any): this;
  
  /** Emit event */
  emitGameObjectEvent(event: string, ...args: any[]): this;
}
