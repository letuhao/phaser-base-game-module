/**
 * Bridge Interfaces Index
 *
 * Centralized exports for all bridge interfaces that connect different systems
 * for comprehensive value calculation coordination.
 */

// Core bridge interfaces
export type { IUnitLayoutBridge } from './IUnitLayoutBridge';
export type { IThemeLayoutBridge } from './IThemeLayoutBridge';
export type { IResponsiveUnitBridge } from './IResponsiveUnitBridge';
export type { IResponsiveLayoutBridge } from './IResponsiveLayoutBridge';
export type { IResponsiveThemeBridge } from './IResponsiveThemeBridge';

// Supporting interfaces for Unit-Layout Bridge
export type {
  IUnitLayoutBridgeConfig,
  IUnitValidationResult,
  IUnitValidationError,
  IUnitValidationWarning,
  IUnitLayoutBridgeStatistics,
} from './IUnitLayoutBridge';

// Supporting interfaces for Theme-Layout Bridge
export type {
  IThemeLayoutBridgeConfig,
  IThemeValidationResult,
  IThemeValidationError,
  IThemeValidationWarning,
  IThemeLayoutBridgeStatistics,
} from './IThemeLayoutBridge';

// Supporting interfaces for Responsive-Unit Bridge
export type {
  IResponsiveUnitBridgeConfig,
  IResponsiveUnitValidationResult,
  IResponsiveUnitValidationError,
  IResponsiveUnitValidationWarning,
  IResponsiveUnitDependency,
  IUnitTransitionAnimation,
  IUnitTransitionKeyframe,
  IResponsiveUnitStats,
  IResponsiveUnitBridgeStatistics,
} from './IResponsiveUnitBridge';

// Supporting interfaces for Responsive-Layout Bridge
export type {
  IResponsiveLayoutBridgeConfig,
  IResponsiveLayoutValidationResult,
  IResponsiveLayoutValidationError,
  IResponsiveLayoutValidationWarning,
  IResponsiveLayoutDependency,
  ILayoutTransitionAnimation,
  ILayoutTransitionKeyframe,
  IResponsiveLayoutStats,
  IResponsiveLayoutBridgeStatistics,
} from './IResponsiveLayoutBridge';

// Supporting interfaces for Responsive-Theme Bridge
export type {
  IResponsiveThemeBridgeConfig,
  IResponsiveThemeValidationResult,
  IResponsiveThemeValidationError,
  IResponsiveThemeValidationWarning,
  IResponsiveThemeDependency,
  IThemeTransitionAnimation,
  IThemeTransitionKeyframe,
  IResponsiveThemeStats,
  IResponsiveThemeBridgeStatistics,
} from './IResponsiveThemeBridge';

// Bridge interface bundle for easy importing
export const BRIDGE_INTERFACES = {
  // Core bridges
  IUnitLayoutBridge: 'IUnitLayoutBridge',
  IThemeLayoutBridge: 'IThemeLayoutBridge',
  IResponsiveUnitBridge: 'IResponsiveUnitBridge',
  IResponsiveLayoutBridge: 'IResponsiveLayoutBridge',
  IResponsiveThemeBridge: 'IResponsiveThemeBridge',
} as const;

// Bridge categories for organization
export const BRIDGE_CATEGORIES = {
  // System integration bridges
  SYSTEM_BRIDGES: ['IUnitLayoutBridge', 'IThemeLayoutBridge'],

  // Responsive bridges
  RESPONSIVE_BRIDGES: [
    'IResponsiveUnitBridge',
    'IResponsiveLayoutBridge',
    'IResponsiveThemeBridge',
  ],

  // All bridges
  ALL_BRIDGES: [
    'IUnitLayoutBridge',
    'IThemeLayoutBridge',
    'IResponsiveUnitBridge',
    'IResponsiveLayoutBridge',
    'IResponsiveThemeBridge',
  ],
} as const;

// Bridge dependency mapping
export const BRIDGE_DEPENDENCIES = {
  IUnitLayoutBridge: ['Unit System', 'Layout System'],
  IThemeLayoutBridge: ['Theme System', 'Layout System'],
  IResponsiveUnitBridge: ['Responsive System', 'Unit System'],
  IResponsiveLayoutBridge: ['Responsive System', 'Layout System'],
  IResponsiveThemeBridge: ['Responsive System', 'Theme System'],
} as const;
