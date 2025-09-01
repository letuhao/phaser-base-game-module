/**
 * Tooltip Interface
 * 
 * Defines tooltip UI component functionality for game objects.
 * Handles contextual information display on hover or focus.
 */

import type { IContainer } from '../container/IContainer';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Tooltip positions
 */
export enum TooltipPosition {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
  AUTO = 'auto'
}

/**
 * Tooltip triggers
 */
export enum TooltipTrigger {
  HOVER = 'hover',
  FOCUS = 'focus',
  CLICK = 'click',
  MANUAL = 'manual'
}

/**
 * Interface for tooltip UI game objects
 * 
 * Extends IContainer with tooltip-specific functionality.
 */
export interface ITooltip extends IContainer {
  readonly gameObjectType: GameObjectType.TOOLTIP;
  
  /** Tooltip visible */
  tooltipVisible: boolean;
  
  /** Tooltip enabled */
  tooltipEnabled: boolean;
  
  /** Tooltip interactive */
  tooltipInteractive: boolean;
  
  /** Tooltip text */
  tooltipText: string;
  
  /** Tooltip title */
  tooltipTitle: string | null;
  
  /** Tooltip content */
  tooltipContent: string | null;
  
  /** Tooltip position */
  tooltipPosition: TooltipPosition;
  
  /** Tooltip trigger */
  tooltipTrigger: TooltipTrigger;
  
  /** Tooltip delay */
  tooltipDelay: number;
  
  /** Tooltip hide delay */
  tooltipHideDelay: number;
  
  /** Tooltip animation duration */
  tooltipAnimationDuration: number;
  
  /** Tooltip animation easing */
  tooltipAnimationEasing: string;
  
  /** Tooltip background */
  readonly tooltipBackground: Phaser.GameObjects.GameObject;
  
  /** Tooltip border */
  readonly tooltipBorder: Phaser.GameObjects.GameObject;
  
  /** Tooltip arrow */
  readonly tooltipArrow: Phaser.GameObjects.GameObject | null;
  
  /** Tooltip title text */
  readonly tooltipTitleText: Phaser.GameObjects.Text | null;
  
  /** Tooltip content text */
  readonly tooltipContentText: Phaser.GameObjects.Text | null;
  
  /** Tooltip target */
  readonly tooltipTarget: Phaser.GameObjects.GameObject | null;
  
  /** Tooltip target offset */
  tooltipTargetOffset: { x: number; y: number };
  
  /** Tooltip max width */
  tooltipMaxWidth: number;
  
  /** Tooltip max height */
  tooltipMaxHeight: number;
  
  /** Tooltip padding */
  tooltipPadding: { x: number; y: number };
  
  /** Tooltip border width */
  tooltipBorderWidth: number;
  
  /** Tooltip border color */
  tooltipBorderColor: number;
  
  /** Tooltip background color */
  tooltipBackgroundColor: number;
  
  /** Tooltip text color */
  tooltipTextColor: number;
  
  /** Tooltip title color */
  tooltipTitleColor: number;
  
  /** Tooltip content color */
  tooltipContentColor: number;
  
  /** Tooltip arrow color */
  tooltipArrowColor: number;
  
  /** Tooltip shadow */
  tooltipShadow: boolean;
  
  /** Tooltip shadow color */
  tooltipShadowColor: number;
  
  /** Tooltip shadow offset */
  tooltipShadowOffset: { x: number; y: number };
  
  /** Tooltip shadow blur */
  tooltipShadowBlur: number;
  
  /** Set tooltip visible */
  setTooltipVisible(visible: boolean): this;
  
  /** Set tooltip enabled */
  setTooltipEnabled(enabled: boolean): this;
  
  /** Set tooltip interactive */
  setTooltipInteractive(interactive: boolean): this;
  
  /** Set tooltip text */
  setTooltipText(text: string): this;
  
  /** Set tooltip title */
  setTooltipTitle(title: string | null): this;
  
  /** Set tooltip content */
  setTooltipContent(content: string | null): this;
  
  /** Set tooltip position */
  setTooltipPosition(position: TooltipPosition): this;
  
  /** Set tooltip trigger */
  setTooltipTrigger(trigger: TooltipTrigger): this;
  
  /** Set tooltip delay */
  setTooltipDelay(delay: number): this;
  
  /** Set tooltip hide delay */
  setTooltipHideDelay(delay: number): this;
  
  /** Set tooltip animation duration */
  setTooltipAnimationDuration(duration: number): this;
  
  /** Set tooltip animation easing */
  setTooltipAnimationEasing(easing: string): this;
  
  /** Set tooltip target */
  setTooltipTarget(target: Phaser.GameObjects.GameObject | null): this;
  
  /** Set tooltip target offset */
  setTooltipTargetOffset(x: number, y: number): this;
  
  /** Set tooltip max width */
  setTooltipMaxWidth(width: number): this;
  
  /** Set tooltip max height */
  setTooltipMaxHeight(height: number): this;
  
  /** Set tooltip padding */
  setTooltipPadding(x: number, y: number): this;
  
  /** Set tooltip border width */
  setTooltipBorderWidth(width: number): this;
  
  /** Set tooltip border color */
  setTooltipBorderColor(color: number): this;
  
  /** Set tooltip background color */
  setTooltipBackgroundColor(color: number): this;
  
  /** Set tooltip text color */
  setTooltipTextColor(color: number): this;
  
  /** Set tooltip title color */
  setTooltipTitleColor(color: number): this;
  
  /** Set tooltip content color */
  setTooltipContentColor(color: number): this;
  
  /** Set tooltip arrow color */
  setTooltipArrowColor(color: number): this;
  
  /** Set tooltip shadow */
  setTooltipShadow(shadow: boolean): this;
  
  /** Set tooltip shadow color */
  setTooltipShadowColor(color: number): this;
  
  /** Set tooltip shadow offset */
  setTooltipShadowOffset(x: number, y: number): this;
  
  /** Set tooltip shadow blur */
  setTooltipShadowBlur(blur: number): this;
  
  /** Get tooltip visible */
  getTooltipVisible(): boolean;
  
  /** Get tooltip enabled */
  getTooltipEnabled(): boolean;
  
  /** Get tooltip interactive */
  getTooltipInteractive(): boolean;
  
  /** Get tooltip text */
  getTooltipText(): string;
  
  /** Get tooltip title */
  getTooltipTitle(): string | null;
  
  /** Get tooltip content */
  getTooltipContent(): string | null;
  
  /** Get tooltip position */
  getTooltipPosition(): TooltipPosition;
  
  /** Get tooltip trigger */
  getTooltipTrigger(): TooltipTrigger;
  
  /** Get tooltip delay */
  getTooltipDelay(): number;
  
  /** Get tooltip hide delay */
  getTooltipHideDelay(): number;
  
  /** Get tooltip animation duration */
  getTooltipAnimationDuration(): number;
  
  /** Get tooltip animation easing */
  getTooltipAnimationEasing(): string;
  
  /** Get tooltip target */
  getTooltipTarget(): Phaser.GameObjects.GameObject | null;
  
  /** Get tooltip target offset */
  getTooltipTargetOffset(): { x: number; y: number };
  
  /** Get tooltip max width */
  getTooltipMaxWidth(): number;
  
  /** Get tooltip max height */
  getTooltipMaxHeight(): number;
  
  /** Get tooltip padding */
  getTooltipPadding(): { x: number; y: number };
  
  /** Get tooltip border width */
  getTooltipBorderWidth(): number;
  
  /** Get tooltip border color */
  getTooltipBorderColor(): number;
  
  /** Get tooltip background color */
  getTooltipBackgroundColor(): number;
  
  /** Get tooltip text color */
  getTooltipTextColor(): number;
  
  /** Get tooltip title color */
  getTooltipTitleColor(): number;
  
  /** Get tooltip content color */
  getTooltipContentColor(): number;
  
  /** Get tooltip arrow color */
  getTooltipArrowColor(): number;
  
  /** Get tooltip shadow */
  getTooltipShadow(): boolean;
  
  /** Get tooltip shadow color */
  getTooltipShadowColor(): number;
  
  /** Get tooltip shadow offset */
  getTooltipShadowOffset(): { x: number; y: number };
  
  /** Get tooltip shadow blur */
  getTooltipShadowBlur(): number;
  
  /** Show tooltip */
  showTooltip(): this;
  
  /** Hide tooltip */
  hideTooltip(): this;
  
  /** Toggle tooltip */
  toggleTooltip(): this;
  
  /** Update tooltip position */
  updateTooltipPosition(): this;
  
  /** Update tooltip content */
  updateTooltipContent(): this;
  
  /** Update tooltip layout */
  updateTooltipLayout(): this;
  
  /** Update tooltip animation */
  updateTooltipAnimation(): this;
  
  /** Update tooltip */
  updateTooltip(deltaTime: number): void;
}
