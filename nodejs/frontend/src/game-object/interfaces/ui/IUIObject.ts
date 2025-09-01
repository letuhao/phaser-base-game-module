/**
 * UI Object Interface
 * 
 * Defines UI-specific functionality for game objects.
 * This interface extends IGameObject with UI-specific features.
 */

import * as Phaser from 'phaser';
import type { IGameObject } from '../IGameObject';

/**
 * Interface for UI game objects
 * 
 * Extends IGameObject with UI-specific functionality for user interface elements,
 * interaction handling, and UI-specific behaviors.
 * 
 * Example implementation:
 * ```typescript
 * class MyUIObject extends Phaser.GameObjects.Container implements IUIObject {
 *   readonly gameObjectType = 'ui' as const;
 *   readonly uiType = 'button' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IUIObject extends IGameObject {
  // ============================================================================
  // UI IDENTITY
  // ============================================================================
  
  /** The type of this game object (always 'ui') */
  readonly gameObjectType: 'ui';
  
  /** The specific type of UI element */
  readonly uiType: 'button' | 'text' | 'input' | 'panel' | 'list' | 'scrollview' | 'modal' | 'tooltip' | 'slider' | 'checkbox' | 'radiobutton' | 'dropdown' | 'tab' | 'menu' | 'progressbar';
  
  // ============================================================================
  // UI PROPERTIES
  // ============================================================================
  
  /** Whether this UI element is enabled */
  enabled: boolean;
  
  /** Whether this UI element is focused */
  focused: boolean;
  
  /** Whether this UI element is hovered */
  hovered: boolean;
  
  /** Whether this UI element is pressed */
  pressed: boolean;
  
  /** Whether this UI element is selected */
  selected: boolean;
  
  /** UI element state */
  uiState: 'normal' | 'hover' | 'pressed' | 'disabled' | 'focused' | 'selected';
  
  /** UI element theme */
  theme: string;
  
  /** UI element style class */
  styleClass: string;
  
  /** UI element data attributes */
  dataAttributes: Record<string, any>;
  
  /** UI element accessibility label */
  accessibilityLabel: string;
  
  /** UI element accessibility description */
  accessibilityDescription: string;
  
  /** Whether UI element is accessible */
  accessible: boolean;
  
  // ============================================================================
  // UI METHODS
  // ============================================================================
  
  /** Set UI element enabled state */
  setEnabled(enabled: boolean): this;
  
  /** Set UI element focused state */
  setFocused(focused: boolean): this;
  
  /** Set UI element hovered state */
  setHovered(hovered: boolean): this;
  
  /** Set UI element pressed state */
  setPressed(pressed: boolean): this;
  
  /** Set UI element selected state */
  setSelected(selected: boolean): this;
  
  /** Set UI element state */
  setUIState(state: 'normal' | 'hover' | 'pressed' | 'disabled' | 'focused' | 'selected'): this;
  
  /** Set UI element theme */
  setTheme(theme: string): this;
  
  /** Set UI element style class */
  setStyleClass(styleClass: string): this;
  
  /** Set UI element data attribute */
  setDataAttribute(key: string, value: any): this;
  
  /** Get UI element data attribute */
  getDataAttribute(key: string): any;
  
  /** Set accessibility label */
  setAccessibilityLabel(label: string): this;
  
  /** Set accessibility description */
  setAccessibilityDescription(description: string): this;
  
  /** Set accessibility state */
  setAccessible(accessible: boolean): this;
  
  /** Update UI element appearance based on state */
  updateUIAppearance(): void;
  
  /** Handle UI element interaction */
  handleInteraction(event: any): void;
  
  /** Get UI element bounds for hit testing */
  getUIBounds(): Phaser.Geom.Rectangle;
  
  /** Check if point is within UI element */
  isPointInUI(x: number, y: number): boolean;
  
  /** Focus this UI element */
  focus(): this;
  
  /** Blur this UI element */
  blur(): this;
  
  /** Trigger UI element action */
  trigger(): this;
  
  /** Reset UI element to default state */
  reset(): this;
}
