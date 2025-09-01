/**
 * Dropdown Interface
 * 
 * Defines dropdown UI component functionality for game objects.
 * Handles selection from a list of options with expandable menu.
 */

import type { IContainer } from '../container/IContainer';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Dropdown states
 */
export enum DropdownState {
  CLOSED = 'closed',
  OPEN = 'open',
  OPENING = 'opening',
  CLOSING = 'closing'
}

/**
 * Dropdown option interface
 */
export interface IDropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
  data?: any;
}

/**
 * Interface for dropdown UI game objects
 * 
 * Extends IContainer with dropdown-specific functionality.
 */
export interface IDropdown extends IContainer {
  readonly gameObjectType: GameObjectType.DROPDOWN;
  
  /** Dropdown state */
  dropdownState: DropdownState;
  
  /** Dropdown enabled */
  dropdownEnabled: boolean;
  
  /** Dropdown interactive */
  dropdownInteractive: boolean;
  
  /** Dropdown options */
  dropdownOptions: IDropdownOption[];
  
  /** Dropdown selected option */
  dropdownSelectedOption: IDropdownOption | null;
  
  /** Dropdown selected value */
  dropdownSelectedValue: string | null;
  
  /** Dropdown selected index */
  dropdownSelectedIndex: number;
  
  /** Dropdown placeholder text */
  dropdownPlaceholderText: string;
  
  /** Dropdown button */
  readonly dropdownButton: Phaser.GameObjects.GameObject;
  
  /** Dropdown button text */
  readonly dropdownButtonText: Phaser.GameObjects.Text;
  
  /** Dropdown button icon */
  readonly dropdownButtonIcon: Phaser.GameObjects.GameObject | null;
  
  /** Dropdown menu */
  readonly dropdownMenu: Phaser.GameObjects.Container;
  
  /** Dropdown menu items */
  readonly dropdownMenuItems: Phaser.GameObjects.GameObject[];
  
  /** Dropdown menu background */
  readonly dropdownMenuBackground: Phaser.GameObjects.GameObject;
  
  /** Dropdown menu scrollable */
  dropdownMenuScrollable: boolean;
  
  /** Dropdown menu max height */
  dropdownMenuMaxHeight: number;
  
  /** Dropdown menu item height */
  dropdownMenuItemHeight: number;
  
  /** Dropdown menu item padding */
  dropdownMenuItemPadding: { x: number; y: number };
  
  /** Dropdown menu item spacing */
  dropdownMenuItemSpacing: number;
  
  /** Dropdown menu animation duration */
  dropdownMenuAnimationDuration: number;
  
  /** Dropdown menu animation easing */
  dropdownMenuAnimationEasing: string;
  
  /** Set dropdown state */
  setDropdownState(state: DropdownState): this;
  
  /** Set dropdown enabled */
  setDropdownEnabled(enabled: boolean): this;
  
  /** Set dropdown interactive */
  setDropdownInteractive(interactive: boolean): this;
  
  /** Set dropdown options */
  setDropdownOptions(options: IDropdownOption[]): this;
  
  /** Add dropdown option */
  addDropdownOption(option: IDropdownOption): this;
  
  /** Remove dropdown option */
  removeDropdownOption(value: string): this;
  
  /** Clear dropdown options */
  clearDropdownOptions(): this;
  
  /** Set dropdown selected option */
  setDropdownSelectedOption(option: IDropdownOption): this;
  
  /** Set dropdown selected value */
  setDropdownSelectedValue(value: string): this;
  
  /** Set dropdown selected index */
  setDropdownSelectedIndex(index: number): this;
  
  /** Set dropdown placeholder text */
  setDropdownPlaceholderText(text: string): this;
  
  /** Set dropdown menu scrollable */
  setDropdownMenuScrollable(scrollable: boolean): this;
  
  /** Set dropdown menu max height */
  setDropdownMenuMaxHeight(height: number): this;
  
  /** Set dropdown menu item height */
  setDropdownMenuItemHeight(height: number): this;
  
  /** Set dropdown menu item padding */
  setDropdownMenuItemPadding(x: number, y: number): this;
  
  /** Set dropdown menu item spacing */
  setDropdownMenuItemSpacing(spacing: number): this;
  
  /** Set dropdown menu animation duration */
  setDropdownMenuAnimationDuration(duration: number): this;
  
  /** Set dropdown menu animation easing */
  setDropdownMenuAnimationEasing(easing: string): this;
  
  /** Get dropdown state */
  getDropdownState(): DropdownState;
  
  /** Get dropdown enabled */
  getDropdownEnabled(): boolean;
  
  /** Get dropdown interactive */
  getDropdownInteractive(): boolean;
  
  /** Get dropdown options */
  getDropdownOptions(): IDropdownOption[];
  
  /** Get dropdown selected option */
  getDropdownSelectedOption(): IDropdownOption | null;
  
  /** Get dropdown selected value */
  getDropdownSelectedValue(): string | null;
  
  /** Get dropdown selected index */
  getDropdownSelectedIndex(): number;
  
  /** Get dropdown placeholder text */
  getDropdownPlaceholderText(): string;
  
  /** Get dropdown button */
  getDropdownButton(): Phaser.GameObjects.GameObject;
  
  /** Get dropdown button text */
  getDropdownButtonText(): Phaser.GameObjects.Text;
  
  /** Get dropdown button icon */
  getDropdownButtonIcon(): Phaser.GameObjects.GameObject | null;
  
  /** Get dropdown menu */
  getDropdownMenu(): Phaser.GameObjects.Container;
  
  /** Get dropdown menu items */
  getDropdownMenuItems(): Phaser.GameObjects.GameObject[];
  
  /** Get dropdown menu background */
  getDropdownMenuBackground(): Phaser.GameObjects.GameObject;
  
  /** Get dropdown menu scrollable */
  getDropdownMenuScrollable(): boolean;
  
  /** Get dropdown menu max height */
  getDropdownMenuMaxHeight(): number;
  
  /** Get dropdown menu item height */
  getDropdownMenuItemHeight(): number;
  
  /** Get dropdown menu item padding */
  getDropdownMenuItemPadding(): { x: number; y: number };
  
  /** Get dropdown menu item spacing */
  getDropdownMenuItemSpacing(): number;
  
  /** Get dropdown menu animation duration */
  getDropdownMenuAnimationDuration(): number;
  
  /** Get dropdown menu animation easing */
  getDropdownMenuAnimationEasing(): string;
  
  /** Open dropdown */
  openDropdown(): this;
  
  /** Close dropdown */
  closeDropdown(): this;
  
  /** Toggle dropdown */
  toggleDropdown(): this;
  
  /** Select dropdown option */
  selectDropdownOption(option: IDropdownOption): this;
  
  /** Select dropdown option by value */
  selectDropdownOptionByValue(value: string): this;
  
  /** Select dropdown option by index */
  selectDropdownOptionByIndex(index: number): this;
  
  /** Update dropdown button text */
  updateDropdownButtonText(): this;
  
  /** Update dropdown menu items */
  updateDropdownMenuItems(): this;
  
  /** Update dropdown menu layout */
  updateDropdownMenuLayout(): this;
  
  /** Update dropdown menu animation */
  updateDropdownMenuAnimation(): this;
  
  /** Update dropdown */
  updateDropdown(deltaTime: number): void;
}
