/**
 * Design Patterns Game Object Interfaces Index
 * 
 * Centralized export for all design pattern-specific game object interfaces
 */

// ============================================================================
// DESIGN PATTERN INTERFACES
// ============================================================================

export type { IFactory } from './IFactory';
export type { IBuilder } from './IBuilder';
export type { IObserver } from './IObserver';
export type { IStrategy } from './IStrategy';
export type { ICommand } from './ICommand';
export type { ISingleton } from './ISingleton';
export type { IDecorator } from './IDecorator';

// ============================================================================
// DESIGN PATTERN ENUMS
// ============================================================================

// Enums are now exported from the centralized enum system
// See: ../../enums/patterns/PatternEnums.ts

// ============================================================================
// DESIGN PATTERN INTERFACE BUNDLES
// ============================================================================

/**
 * Creational pattern interfaces
 */
export const CREATIONAL_PATTERN_INTERFACES = {
  IFactory: 'IFactory',
  IBuilder: 'IBuilder',
  ISingleton: 'ISingleton',
} as const;

/**
 * Behavioral pattern interfaces
 */
export const BEHAVIORAL_PATTERN_INTERFACES = {
  IObserver: 'IObserver',
  IStrategy: 'IStrategy',
  ICommand: 'ICommand',
} as const;

/**
 * Structural pattern interfaces
 */
export const STRUCTURAL_PATTERN_INTERFACES = {
  IDecorator: 'IDecorator',
} as const;

/**
 * All design pattern interfaces
 */
export const DESIGN_PATTERN_INTERFACES = {
  ...CREATIONAL_PATTERN_INTERFACES,
  ...BEHAVIORAL_PATTERN_INTERFACES,
  ...STRUCTURAL_PATTERN_INTERFACES,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CreationalPatternInterface = typeof CREATIONAL_PATTERN_INTERFACES[keyof typeof CREATIONAL_PATTERN_INTERFACES];
export type BehavioralPatternInterface = typeof BEHAVIORAL_PATTERN_INTERFACES[keyof typeof BEHAVIORAL_PATTERN_INTERFACES];
export type StructuralPatternInterface = typeof STRUCTURAL_PATTERN_INTERFACES[keyof typeof STRUCTURAL_PATTERN_INTERFACES];
export type DesignPatternInterface = typeof DESIGN_PATTERN_INTERFACES[keyof typeof DESIGN_PATTERN_INTERFACES];
