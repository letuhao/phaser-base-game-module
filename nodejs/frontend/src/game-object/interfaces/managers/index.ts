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

// Enums are now exported from the centralized enum system
// See: ../../enums/managers/ManagerEnums.ts

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

export type GameObjectManagerInterface =
  (typeof GAMEOBJECT_MANAGER_INTERFACES)[keyof typeof GAMEOBJECT_MANAGER_INTERFACES];
