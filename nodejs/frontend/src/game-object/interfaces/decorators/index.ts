/**
 * Decorator Interfaces Index
 *
 * Exports all decorator-related interfaces for the Game Object System.
 * These interfaces extend the base IDecorator interface with specific capabilities.
 */

// Layout-related decorators
export type { ILayoutableGameObject } from './ILayoutableGameObject';

// Theme-related decorators
export type { IThemedGameObject } from './IThemedGameObject';

// Re-export base decorator interface
export type { IDecorator } from '../patterns/IDecorator';
export type { IDecoratorManager } from '../managers/IDecoratorManager';
