/**
 * Performance Game Object Interfaces Index
 * 
 * Centralized export for all performance-specific game object interfaces
 */

// ============================================================================
// PERFORMANCE INTERFACES
// ============================================================================

export type { IPooledObject } from './IPooledObject';
export type { ICachedObject } from './ICachedObject';
export type { IOptimizedObject } from './IOptimizedObject';
export type { INetworkObject } from './INetworkObject';
export type { ISyncObject } from './ISyncObject';

// ============================================================================
// PERFORMANCE ENUMS
// ============================================================================

// Enums are now exported from the centralized enum system
// See: ../../enums/performance/PerformanceEnums.ts and ../../enums/network/NetworkEnums.ts

// ============================================================================
// PERFORMANCE INTERFACE BUNDLES
// ============================================================================

/**
 * Core performance interfaces
 */
export const CORE_PERFORMANCE_INTERFACES = {
  IPooledObject: 'IPooledObject',
  ICachedObject: 'ICachedObject',
  IOptimizedObject: 'IOptimizedObject',
} as const;

/**
 * Network performance interfaces
 */
export const NETWORK_PERFORMANCE_INTERFACES = {
  INetworkObject: 'INetworkObject',
  ISyncObject: 'ISyncObject',
} as const;

/**
 * All performance interfaces
 */
export const PERFORMANCE_INTERFACES = {
  ...CORE_PERFORMANCE_INTERFACES,
  ...NETWORK_PERFORMANCE_INTERFACES,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CorePerformanceInterface = typeof CORE_PERFORMANCE_INTERFACES[keyof typeof CORE_PERFORMANCE_INTERFACES];
export type NetworkPerformanceInterface = typeof NETWORK_PERFORMANCE_INTERFACES[keyof typeof NETWORK_PERFORMANCE_INTERFACES];
export type PerformanceInterface = typeof PERFORMANCE_INTERFACES[keyof typeof PERFORMANCE_INTERFACES];
