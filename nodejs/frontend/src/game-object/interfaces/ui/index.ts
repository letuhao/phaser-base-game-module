/**
 * UI Game Object Interfaces Index
 *
 * Centralized export for all UI-specific game object interfaces
 */

// ============================================================================
// UI INTERFACES
// ============================================================================

export type { IUIObject } from './IUIObject';
export type { IButton } from './IButton';
export type { IText } from './IText';
export type { IInput } from './IInput';
export type { IPanel } from './IPanel';
export type { IList } from './IList';
export type { IModal } from './IModal';

// ============================================================================
// UI INTERFACE BUNDLES
// ============================================================================

/**
 * Core UI interfaces (single elements)
 */
export const CORE_UI_INTERFACES = {
  IUIObject: 'IUIObject',
  IButton: 'IButton',
  IText: 'IText',
  IInput: 'IInput',
} as const;

/**
 * Container UI interfaces (container elements)
 */
export const CONTAINER_UI_INTERFACES = {
  IPanel: 'IPanel',
  IList: 'IList',
  IModal: 'IModal',
} as const;

/**
 * All UI interfaces
 */
export const UI_INTERFACES = {
  ...CORE_UI_INTERFACES,
  ...CONTAINER_UI_INTERFACES,
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type CoreUIInterface = (typeof CORE_UI_INTERFACES)[keyof typeof CORE_UI_INTERFACES];
export type ContainerUIInterface =
  (typeof CONTAINER_UI_INTERFACES)[keyof typeof CONTAINER_UI_INTERFACES];
export type UIInterface = (typeof UI_INTERFACES)[keyof typeof UI_INTERFACES];
