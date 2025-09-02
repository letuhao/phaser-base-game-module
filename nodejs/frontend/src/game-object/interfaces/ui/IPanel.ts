/**
 * Panel UI Interface
 * 
 * Defines panel-specific functionality for UI game objects.
 */

import * as Phaser from 'phaser';
import type { IContainer } from '../container/IContainer';
import { ContainerType, UIState, UISize, UIVariant, UILayout } from '../../enums';

/**
 * Interface for panel UI game objects
 * 
 * Extends IUIObject with panel-specific functionality for container panels,
 * panel layouts, and panel interactions.
 * 
 * Example implementation:
 * ```typescript
 * class MyPanel extends Phaser.GameObjects.Container implements IPanel {
 *   readonly gameObjectType = 'ui' as const;
 *   readonly uiType = 'panel' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IPanel extends IContainer {
  // ============================================================================
  // PANEL IDENTITY
  // ============================================================================
  
  /** The specific type of UI element (always 'panel') */
  readonly uiType: 'panel';
  
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
  // PANEL PROPERTIES
  // ============================================================================
  
  /** Panel title */
  title: string;
  
  /** Panel header */
  header: Phaser.GameObjects.GameObject | null;
  
  /** Panel footer */
  footer: Phaser.GameObjects.GameObject | null;
  
  /** Panel content */
  content: Phaser.GameObjects.GameObject | null;
  
  /** Panel size */
  panelSize: UISize;
  
  /** Panel variant */
  panelVariant: UIVariant;
  
  /** Panel layout */
  panelLayout: UILayout;
  
  /** Panel spacing */
  panelSpacing: number;
  
  /** Panel padding */
  panelPadding: { top: number; right: number; bottom: number; left: number };
  
  /** Panel margin */
  panelMargin: { top: number; right: number; bottom: number; left: number };
  
  /** Panel background color */
  backgroundColor: string;
  
  /** Panel background alpha */
  backgroundAlpha: number;
  
  /** Panel border color */
  borderColor: string;
  
  /** Panel border width */
  borderWidth: number;
  
  /** Panel border radius */
  borderRadius: number;
  
  /** Panel shadow */
  shadow: boolean;
  
  /** Panel shadow color */
  shadowColor: string;
  
  /** Panel shadow offset X */
  shadowOffsetX: number;
  
  /** Panel shadow offset Y */
  shadowOffsetY: number;
  
  /** Panel shadow blur */
  shadowBlur: number;
  
  /** Whether panel is collapsible */
  collapsible: boolean;
  
  /** Whether panel is collapsed */
  collapsed: boolean;
  
  /** Whether panel is resizable */
  resizable: boolean;
  
  /** Whether panel is draggable */
  draggable: boolean;
  
  /** Whether panel is closable */
  closable: boolean;
  
  /** Whether panel is modal */
  modal: boolean;
  
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
  // PANEL METHODS
  // ============================================================================
  
  /** Set panel title */
  setTitle(title: string): this;
  
  /** Set panel header */
  setHeader(header: Phaser.GameObjects.GameObject | null): this;
  
  /** Set panel footer */
  setFooter(footer: Phaser.GameObjects.GameObject | null): this;
  
  /** Set panel content */
  setContent(content: Phaser.GameObjects.GameObject | null): this;
  
  /** Set panel size */
  setPanelSize(size: UISize): this;
  
  /** Set panel variant */
  setPanelVariant(variant: UIVariant): this;
  
  /** Set panel layout */
  setPanelLayout(layout: UILayout): this;
  
  /** Set panel spacing */
  setPanelSpacing(spacing: number): this;
  
  /** Set panel padding */
  setPanelPadding(padding: { top: number; right: number; bottom: number; left: number }): this;
  
  /** Set panel margin */
  setPanelMargin(margin: { top: number; right: number; bottom: number; left: number }): this;
  
  /** Set panel background */
  setBackground(color: string, alpha?: number): this;
  
  /** Set panel border */
  setBorder(color: string, width: number, radius?: number): this;
  
  /** Set panel shadow */
  setShadow(shadow: boolean, color?: string, offsetX?: number, offsetY?: number, blur?: number): this;
  
  /** Set panel collapsible */
  setCollapsible(collapsible: boolean): this;
  
  /** Set panel collapsed */
  setCollapsed(collapsed: boolean): this;
  
  /** Set panel resizable */
  setResizable(resizable: boolean): this;
  
  /** Set panel draggable */
  setDraggable(draggable: boolean): this;
  
  /** Set panel closable */
  setClosable(closable: boolean): this;
  
  /** Set panel modal */
  setModal(modal: boolean): this;
  
  /** Get panel title */
  getTitle(): string;
  
  /** Get panel header */
  getHeader(): Phaser.GameObjects.GameObject | null;
  
  /** Get panel footer */
  getFooter(): Phaser.GameObjects.GameObject | null;
  
  /** Get panel content */
  getContent(): Phaser.GameObjects.GameObject | null;
  
  /** Get panel size */
  getPanelSize(): string;
  
  /** Get panel variant */
  getPanelVariant(): string;
  
  /** Get panel layout */
  getPanelLayout(): string;
  
  /** Get panel spacing */
  getPanelSpacing(): number;
  
  /** Get panel padding */
  getPanelPadding(): { top: number; right: number; bottom: number; left: number };
  
  /** Get panel margin */
  getPanelMargin(): { top: number; right: number; bottom: number; left: number };
  
  /** Get panel background color */
  getBackgroundColor(): string;
  
  /** Get panel background alpha */
  getBackgroundAlpha(): number;
  
  /** Get panel border color */
  getBorderColor(): string;
  
  /** Get panel border width */
  getBorderWidth(): number;
  
  /** Get panel border radius */
  getBorderRadius(): number;
  
  /** Check if panel has shadow */
  hasShadow(): boolean;
  
  /** Check if panel is collapsible */
  isCollapsible(): boolean;
  
  /** Check if panel is collapsed */
  isCollapsed(): boolean;
  
  /** Check if panel is resizable */
  isResizable(): boolean;
  
  /** Check if panel is draggable */
  isDraggable(): boolean;
  
  /** Check if panel is closable */
  isClosable(): boolean;
  
  /** Check if panel is modal */
  isModal(): boolean;
  
  /** Toggle panel collapse */
  toggleCollapse(): this;
  
  /** Collapse panel */
  collapse(): this;
  
  /** Expand panel */
  expand(): this;
  
  /** Close panel */
  close(): this;
  
  /** Resize panel */
  resize(width: number, height: number): this;
  
  /** Add child to panel */
  addChild(child: Phaser.GameObjects.GameObject): this;
  
  /** Remove child from panel */
  removeChild(child: Phaser.GameObjects.GameObject): this;
  
  /** Clear panel content */
  clearContent(): this;
  
  /** Update panel layout */
  updateLayout(): void;
}
