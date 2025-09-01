/**
 * Decorator Pattern Interface
 * 
 * Defines decorator functionality for game objects.
 * Handles object enhancement and behavior modification.
 */

import type { IGameObject } from '../IGameObject';
import type { IDecoratorManager } from '../managers/IDecoratorManager';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Decorator types
 */
export enum DecoratorType {
  BEHAVIOR = 'behavior',
  VISUAL = 'visual',
  FUNCTIONAL = 'functional',
  PERFORMANCE = 'performance',
  SECURITY = 'security',
  CUSTOM = 'custom'
}

/**
 * Decorator states
 */
export enum DecoratorState {
  ATTACHED = 'attached',
  DETACHED = 'detached',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ERROR = 'error'
}

/**
 * Decorator configuration
 */
export interface DecoratorConfig {
  type: DecoratorType;
  name: string;
  priority: number;
  enabled: boolean;
  stackable: boolean;
  removable: boolean;
  metadata?: any;
}

/**
 * Decorator chain
 */
export interface DecoratorChain {
  decorators: IDecorator[];
  order: string[];
  active: boolean;
  metadata?: any;
}

/**
 * Interface for decorator game objects
 * 
 * Extends IGameObject with decorator pattern functionality.
 */
export interface IDecorator extends IGameObject {
  readonly gameObjectType: GameObjectType.DECORATOR;
  
  /** Decorator type */
  decoratorType: DecoratorType;
  
  /** Decorator state */
  decoratorState: DecoratorState;
  
  /** Decorator manager */
  decoratorManager: IDecoratorManager;
  
  /** Decorator ID */
  decoratorId: string;
  
  /** Decorator name */
  decoratorName: string;
  
  /** Decorator configuration */
  decoratorConfig: DecoratorConfig;
  
  /** Decorated object */
  decoratedObject: IGameObject | null;
  
  /** Decorator chain */
  decoratorChain: DecoratorChain;
  
  /** Decorator priority */
  decoratorPriority: number;
  
  /** Decorator enabled */
  decoratorEnabled: boolean;
  
  /** Decorator stackable */
  decoratorStackable: boolean;
  
  /** Decorator removable */
  decoratorRemovable: boolean;
  
  /** Decorator attachment time */
  decoratorAttachmentTime: number;
  
  /** Decorator metadata */
  decoratorMetadata: any;
  
  /** Set decorator type */
  setDecoratorType(type: DecoratorType): this;
  
  /** Set decorator state */
  setDecoratorState(state: DecoratorState): this;
  
  /** Set decorator manager */
  setDecoratorManager(manager: IDecoratorManager): this;
  
  /** Set decorator ID */
  setDecoratorId(id: string): this;
  
  /** Set decorator name */
  setDecoratorName(name: string): this;
  
  /** Set decorator configuration */
  setDecoratorConfig(config: DecoratorConfig): this;
  
  /** Set decorated object */
  setDecoratedObject(object: IGameObject | null): this;
  
  /** Set decorator chain */
  setDecoratorChain(chain: DecoratorChain): this;
  
  /** Set decorator priority */
  setDecoratorPriority(priority: number): this;
  
  /** Set decorator enabled */
  setDecoratorEnabled(enabled: boolean): this;
  
  /** Set decorator stackable */
  setDecoratorStackable(stackable: boolean): this;
  
  /** Set decorator removable */
  setDecoratorRemovable(removable: boolean): this;
  
  /** Set decorator attachment time */
  setDecoratorAttachmentTime(time: number): this;
  
  /** Set decorator metadata */
  setDecoratorMetadata(metadata: any): this;
  
  /** Get decorator type */
  getDecoratorType(): DecoratorType;
  
  /** Get decorator state */
  getDecoratorState(): DecoratorState;
  
  /** Get decorator manager */
  getDecoratorManager(): IDecoratorManager;
  
  /** Get decorator ID */
  getDecoratorId(): string;
  
  /** Get decorator name */
  getDecoratorName(): string;
  
  /** Get decorator configuration */
  getDecoratorConfig(): DecoratorConfig;
  
  /** Get decorated object */
  getDecoratedObject(): IGameObject | null;
  
  /** Get decorator chain */
  getDecoratorChain(): DecoratorChain;
  
  /** Get decorator priority */
  getDecoratorPriority(): number;
  
  /** Get decorator enabled */
  getDecoratorEnabled(): boolean;
  
  /** Get decorator stackable */
  getDecoratorStackable(): boolean;
  
  /** Get decorator removable */
  getDecoratorRemovable(): boolean;
  
  /** Get decorator attachment time */
  getDecoratorAttachmentTime(): number;
  
  /** Get decorator metadata */
  getDecoratorMetadata(): any;
  
  /** Attach decorator */
  attachDecorator(object: IGameObject): this;
  
  /** Detach decorator */
  detachDecorator(): this;
  
  /** Add decorator to chain */
  addDecoratorToChain(decorator: IDecorator): this;
  
  /** Remove decorator from chain */
  removeDecoratorFromChain(decoratorId: string): this;
  
  /** Execute decorator */
  executeDecorator(method: string, ...args: any[]): any;
  
  /** Enable decorator */
  enableDecorator(): this;
  
  /** Disable decorator */
  disableDecorator(): this;
  
  /** Check if decorator is attached */
  isDecoratorAttached(): boolean;
  
  /** Check if decorator is active */
  isDecoratorActive(): boolean;
  
  /** Check if decorator can be stacked */
  canDecoratorBeStacked(): boolean;
  
  /** Check if decorator can be removed */
  canDecoratorBeRemoved(): boolean;
  
  /** Get decorator by name */
  getDecoratorByName(name: string): IDecorator | null;
  
  /** Get decorators by type */
  getDecoratorsByType(type: DecoratorType): IDecorator[];
  
  /** Update decorator */
  updateDecorator(deltaTime: number): void;
}
