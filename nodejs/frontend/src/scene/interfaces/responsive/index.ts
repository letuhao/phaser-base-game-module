/**
 * Responsive Interfaces Index
 *
 * Centralized exports for all responsive system interfaces that handle
 * responsive updates and coordinate bridge interfaces.
 */

// Core responsive interfaces
export type { IResponsiveEventHandler } from './IResponsiveEventHandler';
export type { IResponsiveCoordinator } from './IResponsiveCoordinator';

// Supporting interfaces for Responsive Event Handler
export type {
  IResponsiveEventHandlerConfig,
  IBreakpointChange,
  IViewportDimensions,
  IDeviceInfo,
  IResponsiveUpdateResult,
  ISystemUpdateResult,
  IResponsiveUpdateError,
  IResponsiveUpdateWarning,
  IResponsiveEventListener,
  IResponsiveEvent,
  IResponsiveEventHandlerStatistics,
} from './IResponsiveEventHandler';

// Supporting interfaces for Responsive Coordinator
export type {
  IResponsiveBridge,
  ISystemManager,
  IResponsiveCoordinatorConfig,
  IBridgeUpdateResult,
  IBridgeTransitionResult,
  IBridgeValidationResult,
  IPerformanceOptimizationResult,
  IBridgeStatistics,
  ISystemStatistics,
  IResponsiveCoordinatorStatistics,
  ICoordinatorHealthStatus,
} from './IResponsiveCoordinator';

// Enums
export { ResponsiveSystem, ResponsiveEventType, UpdatePriority } from './IResponsiveEventHandler';

// Responsive interface bundles for easy importing
export const RESPONSIVE_INTERFACES = {
  // Core interfaces
  IResponsiveEventHandler: 'IResponsiveEventHandler',
  IResponsiveCoordinator: 'IResponsiveCoordinator',
} as const;

// Responsive categories for organization
export const RESPONSIVE_CATEGORIES = {
  // Event handling
  EVENT_HANDLING: ['IResponsiveEventHandler'],

  // Coordination
  COORDINATION: ['IResponsiveCoordinator'],

  // All responsive interfaces
  ALL_RESPONSIVE: ['IResponsiveEventHandler', 'IResponsiveCoordinator'],
} as const;

// Responsive system mapping
export const RESPONSIVE_SYSTEMS = {
  LAYOUT: 'layout',
  THEME: 'theme',
  UNIT: 'unit',
  GAME_OBJECT: 'game_object',
  SCENE: 'scene',
} as const;

// Responsive event types
export const RESPONSIVE_EVENT_TYPES = {
  BREAKPOINT_CHANGE: 'breakpoint_change',
  ORIENTATION_CHANGE: 'orientation_change',
  DEVICE_CHANGE: 'device_change',
  MANUAL_UPDATE: 'manual_update',
} as const;

// Update priority levels
export const UPDATE_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const;
