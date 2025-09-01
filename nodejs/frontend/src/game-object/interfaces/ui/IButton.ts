/**
 * Button UI Interface
 * 
 * Defines button-specific functionality for UI game objects.
 */

import * as Phaser from 'phaser';
import type { IUIObject } from './IUIObject';

/**
 * Interface for button UI game objects
 * 
 * Extends IUIObject with button-specific functionality for clickable buttons,
 * button states, and button interactions.
 * 
 * Example implementation:
 * ```typescript
 * class MyButton extends Phaser.GameObjects.Container implements IButton {
 *   readonly gameObjectType = 'ui' as const;
 *   readonly uiType = 'button' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IButton extends IUIObject {
  // ============================================================================
  // BUTTON IDENTITY
  // ============================================================================
  
  /** The specific type of UI element (always 'button') */
  readonly uiType: 'button';
  
  // ============================================================================
  // BUTTON PROPERTIES
  // ============================================================================
  
  /** Button text content */
  text: string;
  
  /** Button icon */
  icon: string | Phaser.GameObjects.GameObject | null;
  
  /** Button size */
  buttonSize: 'small' | 'medium' | 'large' | 'custom';
  
  /** Button variant */
  buttonVariant: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success' | 'warning' | 'info';
  
  /** Button shape */
  buttonShape: 'rectangle' | 'rounded' | 'circle' | 'pill';
  
  /** Whether button is loading */
  loading: boolean;
  
  /** Whether button is full width */
  fullWidth: boolean;
  
  /** Button click handler */
  onClick: (() => void) | null;
  
  /** Button double click handler */
  onDoubleClick: (() => void) | null;
  
  /** Button right click handler */
  onRightClick: (() => void) | null;
  
  /** Button hover handler */
  onHover: (() => void) | null;
  
  /** Button leave handler */
  onLeave: (() => void) | null;
  
  /** Button press handler */
  onPress: (() => void) | null;
  
  /** Button release handler */
  onRelease: (() => void) | null;
  
  // ============================================================================
  // BUTTON METHODS
  // ============================================================================
  
  /** Set button text */
  setText(text: string): this;
  
  /** Set button icon */
  setIcon(icon: string | Phaser.GameObjects.GameObject | null): this;
  
  /** Set button size */
  setButtonSize(size: 'small' | 'medium' | 'large' | 'custom'): this;
  
  /** Set button variant */
  setButtonVariant(variant: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'success' | 'warning' | 'info'): this;
  
  /** Set button shape */
  setButtonShape(shape: 'rectangle' | 'rounded' | 'circle' | 'pill'): this;
  
  /** Set button loading state */
  setLoading(loading: boolean): this;
  
  /** Set button full width */
  setFullWidth(fullWidth: boolean): this;
  
  /** Set button click handler */
  setOnClick(handler: (() => void) | null): this;
  
  /** Set button double click handler */
  setOnDoubleClick(handler: (() => void) | null): this;
  
  /** Set button right click handler */
  setOnRightClick(handler: (() => void) | null): this;
  
  /** Set button hover handler */
  setOnHover(handler: (() => void) | null): this;
  
  /** Set button leave handler */
  setOnLeave(handler: (() => void) | null): this;
  
  /** Set button press handler */
  setOnPress(handler: (() => void) | null): this;
  
  /** Set button release handler */
  setOnRelease(handler: (() => void) | null): this;
  
  /** Simulate button click */
  click(): this;
  
  /** Simulate button double click */
  doubleClick(): this;
  
  /** Simulate button right click */
  rightClick(): this;
  
  /** Get button text */
  getText(): string;
  
  /** Get button icon */
  getIcon(): string | Phaser.GameObjects.GameObject | null;
  
  /** Check if button is clickable */
  isClickable(): boolean;
  
  /** Check if button is in loading state */
  isLoading(): boolean;
}
