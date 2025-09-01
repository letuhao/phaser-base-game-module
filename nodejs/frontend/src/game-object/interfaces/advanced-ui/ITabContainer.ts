/**
 * Tab Container Interface
 * 
 * Defines tab container UI component functionality for game objects.
 * Handles tabbed interface with multiple content panels.
 */

import type { IContainer } from '../container/IContainer';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Tab positions
 */
export enum TabPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right'
}

/**
 * Tab alignment
 */
export enum TabAlignment {
  START = 'start',
  CENTER = 'center',
  END = 'end',
  STRETCH = 'stretch'
}

/**
 * Tab interface
 */
export interface ITab {
  id: string;
  label: string;
  content: Phaser.GameObjects.GameObject;
  enabled: boolean;
  visible: boolean;
  data?: any;
}

/**
 * Interface for tab container UI game objects
 * 
 * Extends IContainer with tab container-specific functionality.
 */
export interface ITabContainer extends IContainer {
  readonly gameObjectType: GameObjectType.TAB_CONTAINER;
  
  /** Tab container enabled */
  tabContainerEnabled: boolean;
  
  /** Tab container interactive */
  tabContainerInteractive: boolean;
  
  /** Tab container tabs */
  tabContainerTabs: ITab[];
  
  /** Tab container active tab */
  tabContainerActiveTab: ITab | null;
  
  /** Tab container active tab index */
  tabContainerActiveTabIndex: number;
  
  /** Tab container tab position */
  tabContainerTabPosition: TabPosition;
  
  /** Tab container tab alignment */
  tabContainerTabAlignment: TabAlignment;
  
  /** Tab container tab bar */
  readonly tabContainerTabBar: Phaser.GameObjects.Container;
  
  /** Tab container tab buttons */
  readonly tabContainerTabButtons: Phaser.GameObjects.GameObject[];
  
  /** Tab container content area */
  readonly tabContainerContentArea: Phaser.GameObjects.Container;
  
  /** Tab container content panels */
  readonly tabContainerContentPanels: Phaser.GameObjects.GameObject[];
  
  /** Tab container tab bar background */
  readonly tabContainerTabBarBackground: Phaser.GameObjects.GameObject;
  
  /** Tab container content background */
  readonly tabContainerContentBackground: Phaser.GameObjects.GameObject;
  
  /** Tab container tab spacing */
  tabContainerTabSpacing: number;
  
  /** Tab container tab padding */
  tabContainerTabPadding: { x: number; y: number };
  
  /** Tab container content padding */
  tabContainerContentPadding: { x: number; y: number };
  
  /** Tab container tab height */
  tabContainerTabHeight: number;
  
  /** Tab container tab width */
  tabContainerTabWidth: number;
  
  /** Tab container animation duration */
  tabContainerAnimationDuration: number;
  
  /** Tab container animation easing */
  tabContainerAnimationEasing: string;
  
  /** Tab container border width */
  tabContainerBorderWidth: number;
  
  /** Tab container border color */
  tabContainerBorderColor: number;
  
  /** Tab container tab bar background color */
  tabContainerTabBarBackgroundColor: number;
  
  /** Tab container content background color */
  tabContainerContentBackgroundColor: number;
  
  /** Tab container tab background color */
  tabContainerTabBackgroundColor: number;
  
  /** Tab container tab active background color */
  tabContainerTabActiveBackgroundColor: number;
  
  /** Tab container tab hover background color */
  tabContainerTabHoverBackgroundColor: number;
  
  /** Tab container tab disabled background color */
  tabContainerTabDisabledBackgroundColor: number;
  
  /** Tab container tab text color */
  tabContainerTabTextColor: number;
  
  /** Tab container tab active text color */
  tabContainerTabActiveTextColor: number;
  
  /** Tab container tab hover text color */
  tabContainerTabHoverTextColor: number;
  
  /** Tab container tab disabled text color */
  tabContainerTabDisabledTextColor: number;
  
  /** Set tab container enabled */
  setTabContainerEnabled(enabled: boolean): this;
  
  /** Set tab container interactive */
  setTabContainerInteractive(interactive: boolean): this;
  
  /** Set tab container tabs */
  setTabContainerTabs(tabs: ITab[]): this;
  
  /** Add tab container tab */
  addTabContainerTab(tab: ITab): this;
  
  /** Remove tab container tab */
  removeTabContainerTab(tabId: string): this;
  
  /** Clear tab container tabs */
  clearTabContainerTabs(): this;
  
  /** Set tab container active tab */
  setTabContainerActiveTab(tab: ITab): this;
  
  /** Set tab container active tab index */
  setTabContainerActiveTabIndex(index: number): this;
  
  /** Set tab container tab position */
  setTabContainerTabPosition(position: TabPosition): this;
  
  /** Set tab container tab alignment */
  setTabContainerTabAlignment(alignment: TabAlignment): this;
  
  /** Set tab container tab spacing */
  setTabContainerTabSpacing(spacing: number): this;
  
  /** Set tab container tab padding */
  setTabContainerTabPadding(x: number, y: number): this;
  
  /** Set tab container content padding */
  setTabContainerContentPadding(x: number, y: number): this;
  
  /** Set tab container tab height */
  setTabContainerTabHeight(height: number): this;
  
  /** Set tab container tab width */
  setTabContainerTabWidth(width: number): this;
  
  /** Set tab container animation duration */
  setTabContainerAnimationDuration(duration: number): this;
  
  /** Set tab container animation easing */
  setTabContainerAnimationEasing(easing: string): this;
  
  /** Set tab container border width */
  setTabContainerBorderWidth(width: number): this;
  
  /** Set tab container border color */
  setTabContainerBorderColor(color: number): this;
  
  /** Set tab container tab bar background color */
  setTabContainerTabBarBackgroundColor(color: number): this;
  
  /** Set tab container content background color */
  setTabContainerContentBackgroundColor(color: number): this;
  
  /** Set tab container tab background color */
  setTabContainerTabBackgroundColor(color: number): this;
  
  /** Set tab container tab active background color */
  setTabContainerTabActiveBackgroundColor(color: number): this;
  
  /** Set tab container tab hover background color */
  setTabContainerTabHoverBackgroundColor(color: number): this;
  
  /** Set tab container tab disabled background color */
  setTabContainerTabDisabledBackgroundColor(color: number): this;
  
  /** Set tab container tab text color */
  setTabContainerTabTextColor(color: number): this;
  
  /** Set tab container tab active text color */
  setTabContainerTabActiveTextColor(color: number): this;
  
  /** Set tab container tab hover text color */
  setTabContainerTabHoverTextColor(color: number): this;
  
  /** Set tab container tab disabled text color */
  setTabContainerTabDisabledTextColor(color: number): this;
  
  /** Get tab container enabled */
  getTabContainerEnabled(): boolean;
  
  /** Get tab container interactive */
  getTabContainerInteractive(): boolean;
  
  /** Get tab container tabs */
  getTabContainerTabs(): ITab[];
  
  /** Get tab container active tab */
  getTabContainerActiveTab(): ITab | null;
  
  /** Get tab container active tab index */
  getTabContainerActiveTabIndex(): number;
  
  /** Get tab container tab position */
  getTabContainerTabPosition(): TabPosition;
  
  /** Get tab container tab alignment */
  getTabContainerTabAlignment(): TabAlignment;
  
  /** Get tab container tab bar */
  getTabContainerTabBar(): Phaser.GameObjects.Container;
  
  /** Get tab container tab buttons */
  getTabContainerTabButtons(): Phaser.GameObjects.GameObject[];
  
  /** Get tab container content area */
  getTabContainerContentArea(): Phaser.GameObjects.Container;
  
  /** Get tab container content panels */
  getTabContainerContentPanels(): Phaser.GameObjects.GameObject[];
  
  /** Get tab container tab bar background */
  getTabContainerTabBarBackground(): Phaser.GameObjects.GameObject;
  
  /** Get tab container content background */
  getTabContainerContentBackground(): Phaser.GameObjects.GameObject;
  
  /** Get tab container tab spacing */
  getTabContainerTabSpacing(): number;
  
  /** Get tab container tab padding */
  getTabContainerTabPadding(): { x: number; y: number };
  
  /** Get tab container content padding */
  getTabContainerContentPadding(): { x: number; y: number };
  
  /** Get tab container tab height */
  getTabContainerTabHeight(): number;
  
  /** Get tab container tab width */
  getTabContainerTabWidth(): number;
  
  /** Get tab container animation duration */
  getTabContainerAnimationDuration(): number;
  
  /** Get tab container animation easing */
  getTabContainerAnimationEasing(): string;
  
  /** Get tab container border width */
  getTabContainerBorderWidth(): number;
  
  /** Get tab container border color */
  getTabContainerBorderColor(): number;
  
  /** Get tab container tab bar background color */
  getTabContainerTabBarBackgroundColor(): number;
  
  /** Get tab container content background color */
  getTabContainerContentBackgroundColor(): number;
  
  /** Get tab container tab background color */
  getTabContainerTabBackgroundColor(): number;
  
  /** Get tab container tab active background color */
  getTabContainerTabActiveBackgroundColor(): number;
  
  /** Get tab container tab hover background color */
  getTabContainerTabHoverBackgroundColor(): number;
  
  /** Get tab container tab disabled background color */
  getTabContainerTabDisabledBackgroundColor(): number;
  
  /** Get tab container tab text color */
  getTabContainerTabTextColor(): number;
  
  /** Get tab container tab active text color */
  getTabContainerTabActiveTextColor(): number;
  
  /** Get tab container tab hover text color */
  getTabContainerTabHoverTextColor(): number;
  
  /** Get tab container tab disabled text color */
  getTabContainerTabDisabledTextColor(): number;
  
  /** Get tab container tab by id */
  getTabContainerTabById(tabId: string): ITab | null;
  
  /** Get tab container tab by index */
  getTabContainerTabByIndex(index: number): ITab | null;
  
  /** Get tab container tab index by id */
  getTabContainerTabIndexById(tabId: string): number;
  
  /** Activate tab container tab */
  activateTabContainerTab(tab: ITab): this;
  
  /** Activate tab container tab by id */
  activateTabContainerTabById(tabId: string): this;
  
  /** Activate tab container tab by index */
  activateTabContainerTabByIndex(index: number): this;
  
  /** Update tab container tabs */
  updateTabContainerTabs(): this;
  
  /** Update tab container tab buttons */
  updateTabContainerTabButtons(): this;
  
  /** Update tab container content panels */
  updateTabContainerContentPanels(): this;
  
  /** Update tab container layout */
  updateTabContainerLayout(): this;
  
  /** Update tab container animation */
  updateTabContainerAnimation(): this;
  
  /** Update tab container */
  updateTabContainer(deltaTime: number): void;
}
