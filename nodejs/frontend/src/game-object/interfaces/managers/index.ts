/**
 * Game Object Manager Interfaces Index
 * 
 * Centralized export for all game object manager interfaces
 */

export type { IFactoryManager } from './IFactoryManager';
export type { IObserverManager } from './IObserverManager';
export type { IDecoratorManager } from './IDecoratorManager';
export type { IStrategyManager } from './IStrategyManager';
export type { ICommandManager } from './ICommandManager';
export type { IBuilderManager } from './IBuilderManager';
export type { ISingletonManager } from './ISingletonManager';

export { FactoryManagerOperation } from './IFactoryManager';
export { ObserverManagerOperation } from './IObserverManager';
export { DecoratorManagerOperation } from './IDecoratorManager';
export { StrategyManagerOperation } from './IStrategyManager';
export { CommandManagerOperation } from './ICommandManager';
export { BuilderManagerOperation } from './IBuilderManager';
export { SingletonManagerOperation } from './ISingletonManager';

/**
 * Game object manager interfaces bundle
 */
export const GAMEOBJECT_MANAGER_INTERFACES = {
  IFactoryManager: 'IFactoryManager',
  IObserverManager: 'IObserverManager',
  IDecoratorManager: 'IDecoratorManager',
  IStrategyManager: 'IStrategyManager',
  ICommandManager: 'ICommandManager',
  IBuilderManager: 'IBuilderManager',
  ISingletonManager: 'ISingletonManager',
} as const;

export type GameObjectManagerInterface = typeof GAMEOBJECT_MANAGER_INTERFACES[keyof typeof GAMEOBJECT_MANAGER_INTERFACES];
