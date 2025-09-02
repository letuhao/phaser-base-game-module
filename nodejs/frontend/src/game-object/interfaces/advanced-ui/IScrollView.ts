/**
 * Scroll View Interface
 *
 * Defines scroll view UI component functionality for game objects.
 * Handles scrollable content areas with scrollbars and touch support.
 */

import type { IContainer } from '../container/IContainer';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Scroll view orientations
 */
export enum ScrollViewOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  BOTH = 'both',
}

/**
 * Interface for scroll view UI game objects
 *
 * Extends IContainer with scroll view-specific functionality.
 */
export interface IScrollView extends IContainer {
  readonly gameObjectType: GameObjectType;

  /** Scroll view orientation */
  scrollViewOrientation: ScrollViewOrientation;

  /** Scroll view enabled */
  scrollViewEnabled: boolean;

  /** Scroll view interactive */
  scrollViewInteractive: boolean;

  /** Scroll view content */
  readonly scrollViewContent: Phaser.GameObjects.Container;

  /** Scroll view viewport */
  readonly scrollViewViewport: Phaser.GameObjects.GameObject;

  /** Scroll view horizontal scrollbar */
  readonly scrollViewHorizontalScrollbar: Phaser.GameObjects.GameObject | null;

  /** Scroll view vertical scrollbar */
  readonly scrollViewVerticalScrollbar: Phaser.GameObjects.GameObject | null;

  /** Scroll view scroll position */
  scrollViewScrollPosition: { x: number; y: number };

  /** Scroll view scroll velocity */
  scrollViewScrollVelocity: { x: number; y: number };

  /** Scroll view scroll bounds */
  scrollViewScrollBounds: { minX: number; maxX: number; minY: number; maxY: number };

  /** Scroll view content size */
  scrollViewContentSize: { width: number; height: number };

  /** Scroll view viewport size */
  scrollViewViewportSize: { width: number; height: number };

  /** Scroll view scroll speed */
  scrollViewScrollSpeed: number;

  /** Scroll view scroll friction */
  scrollViewScrollFriction: number;

  /** Scroll view scroll bounce */
  scrollViewScrollBounce: boolean;

  /** Scroll view scroll bounce strength */
  scrollViewScrollBounceStrength: number;

  /** Scroll view scroll snap */
  scrollViewScrollSnap: boolean;

  /** Scroll view scroll snap threshold */
  scrollViewScrollSnapThreshold: number;

  /** Scroll view scroll snap points */
  scrollViewScrollSnapPoints: { x: number[]; y: number[] };

  /** Scroll view scroll momentum */
  scrollViewScrollMomentum: boolean;

  /** Scroll view scroll momentum threshold */
  scrollViewScrollMomentumThreshold: number;

  /** Scroll view scroll momentum friction */
  scrollViewScrollMomentumFriction: number;

  /** Scroll view scroll momentum max speed */
  scrollViewScrollMomentumMaxSpeed: number;

  /** Scroll view scroll momentum min speed */
  scrollViewScrollMomentumMinSpeed: number;

  /** Scroll view scroll momentum duration */
  scrollViewScrollMomentumDuration: number;

  /** Scroll view scroll momentum easing */
  scrollViewScrollMomentumEasing: string;

  /** Scroll view scroll momentum delay */
  scrollViewScrollMomentumDelay: number;

  /** Set scroll view orientation */
  setScrollViewOrientation(orientation: ScrollViewOrientation): this;

  /** Set scroll view enabled */
  setScrollViewEnabled(enabled: boolean): this;

  /** Set scroll view interactive */
  setScrollViewInteractive(interactive: boolean): this;

  /** Set scroll view scroll position */
  setScrollViewScrollPosition(x: number, y: number): this;

  /** Set scroll view scroll velocity */
  setScrollViewScrollVelocity(x: number, y: number): this;

  /** Set scroll view scroll bounds */
  setScrollViewScrollBounds(minX: number, maxX: number, minY: number, maxY: number): this;

  /** Set scroll view content size */
  setScrollViewContentSize(width: number, height: number): this;

  /** Set scroll view viewport size */
  setScrollViewViewportSize(width: number, height: number): this;

  /** Set scroll view scroll speed */
  setScrollViewScrollSpeed(speed: number): this;

  /** Set scroll view scroll friction */
  setScrollViewScrollFriction(friction: number): this;

  /** Set scroll view scroll bounce */
  setScrollViewScrollBounce(bounce: boolean): this;

  /** Set scroll view scroll bounce strength */
  setScrollViewScrollBounceStrength(strength: number): this;

  /** Set scroll view scroll snap */
  setScrollViewScrollSnap(snap: boolean): this;

  /** Set scroll view scroll snap threshold */
  setScrollViewScrollSnapThreshold(threshold: number): this;

  /** Set scroll view scroll snap points */
  setScrollViewScrollSnapPoints(x: number[], y: number[]): this;

  /** Set scroll view scroll momentum */
  setScrollViewScrollMomentum(momentum: boolean): this;

  /** Set scroll view scroll momentum threshold */
  setScrollViewScrollMomentumThreshold(threshold: number): this;

  /** Set scroll view scroll momentum friction */
  setScrollViewScrollMomentumFriction(friction: number): this;

  /** Set scroll view scroll momentum max speed */
  setScrollViewScrollMomentumMaxSpeed(speed: number): this;

  /** Set scroll view scroll momentum min speed */
  setScrollViewScrollMomentumMinSpeed(speed: number): this;

  /** Set scroll view scroll momentum duration */
  setScrollViewScrollMomentumDuration(duration: number): this;

  /** Set scroll view scroll momentum easing */
  setScrollViewScrollMomentumEasing(easing: string): this;

  /** Set scroll view scroll momentum delay */
  setScrollViewScrollMomentumDelay(delay: number): this;

  /** Get scroll view orientation */
  getScrollViewOrientation(): ScrollViewOrientation;

  /** Get scroll view enabled */
  getScrollViewEnabled(): boolean;

  /** Get scroll view interactive */
  getScrollViewInteractive(): boolean;

  /** Get scroll view content */
  getScrollViewContent(): Phaser.GameObjects.Container;

  /** Get scroll view viewport */
  getScrollViewViewport(): Phaser.GameObjects.GameObject;

  /** Get scroll view horizontal scrollbar */
  getScrollViewHorizontalScrollbar(): Phaser.GameObjects.GameObject | null;

  /** Get scroll view vertical scrollbar */
  getScrollViewVerticalScrollbar(): Phaser.GameObjects.GameObject | null;

  /** Get scroll view scroll position */
  getScrollViewScrollPosition(): { x: number; y: number };

  /** Get scroll view scroll velocity */
  getScrollViewScrollVelocity(): { x: number; y: number };

  /** Get scroll view scroll bounds */
  getScrollViewScrollBounds(): { minX: number; maxX: number; minY: number; maxY: number };

  /** Get scroll view content size */
  getScrollViewContentSize(): { width: number; height: number };

  /** Get scroll view viewport size */
  getScrollViewViewportSize(): { width: number; height: number };

  /** Get scroll view scroll speed */
  getScrollViewScrollSpeed(): number;

  /** Get scroll view scroll friction */
  getScrollViewScrollFriction(): number;

  /** Get scroll view scroll bounce */
  getScrollViewScrollBounce(): boolean;

  /** Get scroll view scroll bounce strength */
  getScrollViewScrollBounceStrength(): number;

  /** Get scroll view scroll snap */
  getScrollViewScrollSnap(): boolean;

  /** Get scroll view scroll snap threshold */
  getScrollViewScrollSnapThreshold(): number;

  /** Get scroll view scroll snap points */
  getScrollViewScrollSnapPoints(): { x: number[]; y: number[] };

  /** Get scroll view scroll momentum */
  getScrollViewScrollMomentum(): boolean;

  /** Get scroll view scroll momentum threshold */
  getScrollViewScrollMomentumThreshold(): number;

  /** Get scroll view scroll momentum friction */
  getScrollViewScrollMomentumFriction(): number;

  /** Get scroll view scroll momentum max speed */
  getScrollViewScrollMomentumMaxSpeed(): number;

  /** Get scroll view scroll momentum min speed */
  getScrollViewScrollMomentumMinSpeed(): number;

  /** Get scroll view scroll momentum duration */
  getScrollViewScrollMomentumDuration(): number;

  /** Get scroll view scroll momentum easing */
  getScrollViewScrollMomentumEasing(): string;

  /** Get scroll view scroll momentum delay */
  getScrollViewScrollMomentumDelay(): number;

  /** Scroll to position */
  scrollToPosition(x: number, y: number): this;

  /** Scroll to content */
  scrollToContent(content: Phaser.GameObjects.GameObject): this;

  /** Scroll to top */
  scrollToTop(): this;

  /** Scroll to bottom */
  scrollToBottom(): this;

  /** Scroll to left */
  scrollToLeft(): this;

  /** Scroll to right */
  scrollToRight(): this;

  /** Scroll by amount */
  scrollByAmount(x: number, y: number): this;

  /** Update scroll view */
  updateScrollView(deltaTime: number): void;
}
