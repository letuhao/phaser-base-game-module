/**
 * List UI Interface
 * 
 * Defines list-specific functionality for UI game objects.
 */

import * as Phaser from 'phaser';
import type { IContainer } from '../container/IContainer';
import { ContainerType, UIState, UIOrientation, UISelectionMode } from '../../enums';

/**
 * Interface for list UI game objects
 * 
 * Extends IUIObject with list-specific functionality for displaying lists,
 * list items, and list interactions.
 * 
 * Example implementation:
 * ```typescript
 * class MyList extends Phaser.GameObjects.Container implements IList {
 *   readonly gameObjectType = 'ui' as const;
 *   readonly uiType = 'list' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IList extends IContainer {
  // ============================================================================
  // LIST IDENTITY
  // ============================================================================
  
  /** The specific type of UI element (always 'list') */
  readonly uiType: 'list';
  
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
  // LIST PROPERTIES
  // ============================================================================
  
  /** List items */
  items: Phaser.GameObjects.GameObject[];
  
  /** List orientation */
  orientation: UIOrientation;
  
  /** List spacing */
  itemSpacing: number;
  
  /** List padding */
  listPadding: { top: number; right: number; bottom: number; left: number };
  
  /** List item height */
  itemHeight: number;
  
  /** List item width */
  itemWidth: number;
  
  /** List selection mode */
  selectionMode: UISelectionMode;
  
  /** Selected items */
  selectedItems: Phaser.GameObjects.GameObject[];
  
  /** List scroll position */
  scrollPosition: number;
  
  /** List scroll speed */
  scrollSpeed: number;
  
  /** Whether list is scrollable */
  scrollable: boolean;
  
  /** Whether list is virtualized */
  virtualized: boolean;
  
  /** List item template */
  itemTemplate: Phaser.GameObjects.GameObject | null;
  
  /** List item renderer */
  itemRenderer: ((item: any, index: number) => Phaser.GameObjects.GameObject) | null;
  
  /** List data source */
  dataSource: any[];
  
  /** List filter */
  filter: ((item: any) => boolean) | null;
  
  /** List sort function */
  sortFunction: ((a: any, b: any) => number) | null;
  
  /** List group function */
  groupFunction: ((item: any) => string) | null;
  
  /** List groups */
  groups: Map<string, any[]>;
  
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
  // LIST METHODS
  // ============================================================================
  
  /** Set list items */
  setItems(items: Phaser.GameObjects.GameObject[]): this;
  
  /** Set list orientation */
  setOrientation(orientation: UIOrientation): this;
  
  /** Set list spacing */
  setItemSpacing(spacing: number): this;
  
  /** Set list padding */
  setListPadding(padding: { top: number; right: number; bottom: number; left: number }): this;
  
  /** Set list item size */
  setItemSize(width: number, height: number): this;
  
  /** Set list selection mode */
  setSelectionMode(mode: UISelectionMode): this;
  
  /** Set list scroll position */
  setScrollPosition(position: number): this;
  
  /** Set list scroll speed */
  setScrollSpeed(speed: number): this;
  
  /** Set list scrollable */
  setScrollable(scrollable: boolean): this;
  
  /** Set list virtualized */
  setVirtualized(virtualized: boolean): this;
  
  /** Set list item template */
  setItemTemplate(template: Phaser.GameObjects.GameObject | null): this;
  
  /** Set list item renderer */
  setItemRenderer(renderer: ((item: any, index: number) => Phaser.GameObjects.GameObject) | null): this;
  
  /** Set list data source */
  setDataSource(dataSource: any[]): this;
  
  /** Set list filter */
  setFilter(filter: ((item: any) => boolean) | null): this;
  
  /** Set list sort function */
  setSortFunction(sortFunction: ((a: any, b: any) => number) | null): this;
  
  /** Set list group function */
  setGroupFunction(groupFunction: ((item: any) => string) | null): this;
  
  /** Get list items */
  getItems(): Phaser.GameObjects.GameObject[];
  
  /** Get list orientation */
  getOrientation(): string;
  
  /** Get list spacing */
  getItemSpacing(): number;
  
  /** Get list padding */
  getListPadding(): { top: number; right: number; bottom: number; left: number };
  
  /** Get list item height */
  getItemHeight(): number;
  
  /** Get list item width */
  getItemWidth(): number;
  
  /** Get list selection mode */
  getSelectionMode(): string;
  
  /** Get selected items */
  getSelectedItems(): Phaser.GameObjects.GameObject[];
  
  /** Get list scroll position */
  getScrollPosition(): number;
  
  /** Get list scroll speed */
  getScrollSpeed(): number;
  
  /** Check if list is scrollable */
  isScrollable(): boolean;
  
  /** Check if list is virtualized */
  isVirtualized(): boolean;
  
  /** Get list item template */
  getItemTemplate(): Phaser.GameObjects.GameObject | null;
  
  /** Get list item renderer */
  getItemRenderer(): ((item: any, index: number) => Phaser.GameObjects.GameObject) | null;
  
  /** Get list data source */
  getDataSource(): any[];
  
  /** Get list filter */
  getFilter(): ((item: any) => boolean) | null;
  
  /** Get list sort function */
  getSortFunction(): ((a: any, b: any) => number) | null;
  
  /** Get list group function */
  getGroupFunction(): ((item: any) => string) | null;
  
  /** Get list groups */
  getGroups(): Map<string, any[]>;
  
  /** Add item to list */
  addItem(item: Phaser.GameObjects.GameObject): this;
  
  /** Remove item from list */
  removeItem(item: Phaser.GameObjects.GameObject): this;
  
  /** Remove item at index */
  removeItemAt(index: number): this;
  
  /** Clear list items */
  clearItems(): this;
  
  /** Get item at index */
  getItemAt(index: number): Phaser.GameObjects.GameObject | undefined;
  
  /** Get item index */
  getItemIndex(item: Phaser.GameObjects.GameObject): number;
  
  /** Select item */
  selectItem(item: Phaser.GameObjects.GameObject): this;
  
  /** Deselect item */
  deselectItem(item: Phaser.GameObjects.GameObject): this;
  
  /** Toggle item selection */
  toggleItemSelection(item: Phaser.GameObjects.GameObject): this;
  
  /** Select all items */
  selectAll(): this;
  
  /** Deselect all items */
  deselectAll(): this;
  
  /** Scroll to item */
  scrollToItem(item: Phaser.GameObjects.GameObject): this;
  
  /** Scroll to index */
  scrollToIndex(index: number): this;
  
  /** Scroll by amount */
  scrollBy(amount: number): this;
  
  /** Filter list */
  filterList(): this;
  
  /** Sort list */
  sortList(): this;
  
  /** Group list */
  groupList(): this;
  
  /** Update list */
  updateList(): void;
  
  /** Refresh list */
  refreshList(): void;
}
