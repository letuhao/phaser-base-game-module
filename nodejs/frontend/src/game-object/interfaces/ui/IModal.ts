/**
 * Modal UI Interface
 * 
 * Defines modal-specific functionality for UI game objects.
 */

import * as Phaser from 'phaser';
import type { IContainer } from '../container/IContainer';
import { ContainerType, UIState, UISize, UIVariant, UIPosition, UIAnimation } from '../../enums';

/**
 * Interface for modal UI game objects
 * 
 * Extends IUIObject with modal-specific functionality for modal dialogs,
 * modal overlays, and modal interactions.
 * 
 * Example implementation:
 * ```typescript
 * class MyModal extends Phaser.GameObjects.Container implements IModal {
 *   readonly gameObjectType = 'ui' as const;
 *   readonly uiType = 'modal' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IModal extends IContainer {
  // ============================================================================
  // MODAL IDENTITY
  // ============================================================================
  
  /** The specific type of UI element (always 'modal') */
  readonly uiType: 'modal';
  
  /** Container type (e.g., 'div', 'section', 'article') */
  readonly containerType: ContainerType;
  
  // ============================================================================
  // UI PROPERTIES (from IUIObject)
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
  uiState: UIState;
  
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
  // MODAL PROPERTIES
  // ============================================================================
  
  /** Modal title */
  title: string;
  
  /** Modal content */
  content: Phaser.GameObjects.GameObject | null;
  
  /** Modal footer */
  footer: Phaser.GameObjects.GameObject | null;
  
  /** Modal size */
  modalSize: UISize;
  
  /** Modal variant */
  modalVariant: UIVariant;
  
  /** Modal position */
  modalPosition: UIPosition;
  
  /** Modal backdrop */
  backdrop: boolean;
  
  /** Modal backdrop color */
  backdropColor: string;
  
  /** Modal backdrop alpha */
  backdropAlpha: number;
  
  /** Modal backdrop blur */
  backdropBlur: boolean;
  
  /** Modal backdrop blur amount */
  backdropBlurAmount: number;
  
  /** Modal animation */
  animation: UIAnimation;
  
  /** Modal animation duration */
  animationDuration: number;
  
  /** Modal animation easing */
  animationEasing: string;
  
  /** Whether modal is closable */
  closable: boolean;
  
  /** Whether modal is draggable */
  draggable: boolean;
  
  /** Whether modal is resizable */
  resizable: boolean;
  
  /** Whether modal is focusable */
  focusable: boolean;
  
  /** Whether modal traps focus */
  trapFocus: boolean;
  
  /** Whether modal restores focus */
  restoreFocus: boolean;
  
  /** Modal z-index */
  zIndex: number;
  
  /** Modal width */
  modalWidth: number;
  
  /** Modal height */
  modalHeight: number;
  
  /** Modal min width */
  minWidth: number;
  
  /** Modal min height */
  minHeight: number;
  
  /** Modal max width */
  maxWidth: number;
  
  /** Modal max height */
  maxHeight: number;
  
  // ============================================================================
  // UI METHODS (from IUIObject)
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
  setUIState(state: UIState): this;
  
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
  
  // ============================================================================
  // MODAL METHODS
  // ============================================================================
  
  /** Set modal title */
  setTitle(title: string): this;
  
  /** Set modal content */
  setContent(content: Phaser.GameObjects.GameObject | null): this;
  
  /** Set modal footer */
  setFooter(footer: Phaser.GameObjects.GameObject | null): this;
  
  /** Set modal size */
  setModalSize(size: UISize): this;
  
  /** Set modal variant */
  setModalVariant(variant: UIVariant): this;
  
  /** Set modal position */
  setModalPosition(position: UIPosition): this;
  
  /** Set modal backdrop */
  setBackdrop(backdrop: boolean, color?: string, alpha?: number): this;
  
  /** Set modal backdrop blur */
  setBackdropBlur(blur: boolean, amount?: number): this;
  
  /** Set modal animation */
  setAnimation(animation: UIAnimation, duration?: number, easing?: string): this;
  
  /** Set modal closable */
  setClosable(closable: boolean): this;
  
  /** Set modal draggable */
  setDraggable(draggable: boolean): this;
  
  /** Set modal resizable */
  setResizable(resizable: boolean): this;
  
  /** Set modal focusable */
  setFocusable(focusable: boolean): this;
  
  /** Set modal trap focus */
  setTrapFocus(trapFocus: boolean): this;
  
  /** Set modal restore focus */
  setRestoreFocus(restoreFocus: boolean): this;
  
  /** Set modal z-index */
  setZIndex(zIndex: number): this;
  
  /** Set modal dimensions */
  setModalDimensions(width: number, height: number): this;
  
  /** Set modal min dimensions */
  setMinDimensions(minWidth: number, minHeight: number): this;
  
  /** Set modal max dimensions */
  setMaxDimensions(maxWidth: number, maxHeight: number): this;
  
  /** Get modal title */
  getTitle(): string;
  
  /** Get modal content */
  getContent(): Phaser.GameObjects.GameObject | null;
  
  /** Get modal footer */
  getFooter(): Phaser.GameObjects.GameObject | null;
  
  /** Get modal size */
  getModalSize(): string;
  
  /** Get modal variant */
  getModalVariant(): string;
  
  /** Get modal position */
  getModalPosition(): string;
  
  /** Check if modal has backdrop */
  hasBackdrop(): boolean;
  
  /** Get modal backdrop color */
  getBackdropColor(): string;
  
  /** Get modal backdrop alpha */
  getBackdropAlpha(): number;
  
  /** Check if modal has backdrop blur */
  hasBackdropBlur(): boolean;
  
  /** Get modal backdrop blur amount */
  getBackdropBlurAmount(): number;
  
  /** Get modal animation */
  getAnimation(): string;
  
  /** Get modal animation duration */
  getAnimationDuration(): number;
  
  /** Get modal animation easing */
  getAnimationEasing(): string;
  
  /** Check if modal is closable */
  isClosable(): boolean;
  
  /** Check if modal is draggable */
  isDraggable(): boolean;
  
  /** Check if modal is resizable */
  isResizable(): boolean;
  
  /** Check if modal is focusable */
  isFocusable(): boolean;
  
  /** Check if modal traps focus */
  trapsFocus(): boolean;
  
  /** Check if modal restores focus */
  restoresFocus(): boolean;
  
  /** Get modal z-index */
  getZIndex(): number;
  
  /** Get modal width */
  getModalWidth(): number;
  
  /** Get modal height */
  getModalHeight(): number;
  
  /** Get modal min width */
  getMinWidth(): number;
  
  /** Get modal min height */
  getMinHeight(): number;
  
  /** Get modal max width */
  getMaxWidth(): number;
  
  /** Get modal max height */
  getMaxHeight(): number;
  
  /** Show modal */
  show(): this;
  
  /** Hide modal */
  hide(): this;
  
  /** Toggle modal visibility */
  toggle(): this;
  
  /** Close modal */
  close(): this;
  
  /** Center modal */
  center(): this;
  
  /** Resize modal */
  resize(width: number, height: number): this;
  
  /** Move modal */
  move(x: number, y: number): this;
  
  /** Update modal layout */
  updateLayout(): void;
  
  /** Handle modal escape key */
  handleEscapeKey(): void;
  
  /** Handle modal backdrop click */
  handleBackdropClick(): void;
  
  /** Focus modal */
  focusModal(): this;
  
  /** Blur modal */
  blurModal(): this;
}
