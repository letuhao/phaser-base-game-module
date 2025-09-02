/**
 * Advanced UI Game Object Interfaces Index
 *
 * Centralized export for all advanced UI-specific game object interfaces
 */

// ============================================================================
// ADVANCED UI INTERFACES
// ============================================================================

export type { ISlider } from './ISlider';
export type { ICheckbox } from './ICheckbox';
export type { IRadioButton } from './IRadioButton';
export type { IDropdown } from './IDropdown';
export type { ITooltip } from './ITooltip';
export type { IProgressBar } from './IProgressBar';
export type { ITabContainer } from './ITabContainer';
export type { IScrollView } from './IScrollView';

// ============================================================================
// ADVANCED UI ENUMS
// ============================================================================

// Enums are now exported from the centralized enum system
// See: ../../enums/ui/AdvancedUIEnums.ts

// ============================================================================
// ADVANCED UI INTERFACE BUNDLES
// ============================================================================

/**
 * All advanced UI interfaces
 */
export const ADVANCED_UI_INTERFACES = {
  ISlider: 'ISlider',
  ICheckbox: 'ICheckbox',
  IRadioButton: 'IRadioButton',
  IDropdown: 'IDropdown',
  ITooltip: 'ITooltip',
  IProgressBar: 'IProgressBar',
  ITabContainer: 'ITabContainer',
  IScrollView: 'IScrollView',
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type AdvancedUIInterface =
  (typeof ADVANCED_UI_INTERFACES)[keyof typeof ADVANCED_UI_INTERFACES];
