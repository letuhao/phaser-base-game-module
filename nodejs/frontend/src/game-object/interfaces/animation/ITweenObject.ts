/**
 * Tween Object Interface
 *
 * Defines tween animation functionality for game objects.
 * Handles property-based tween animations.
 */

import type { IAnimatedObject } from './IAnimatedObject';
import { GameObjectType, TweenEasingType } from '../../enums';
import * as Phaser from 'phaser';

/**
 * Interface for tween animation game objects
 *
 * Extends IAnimatedObject with tween animation-specific functionality.
 */
export interface ITweenObject extends IAnimatedObject {
  readonly gameObjectType: GameObjectType;

  /** Tween manager */
  readonly tweenManager: Phaser.Tweens.TweenManager;

  /** Tween */
  readonly tween: Phaser.Tweens.Tween;

  /** Tween targets */
  tweenTargets: any[];

  /** Tween properties */
  tweenProperties: Record<string, any>;

  /** Tween duration */
  tweenDuration: number;

  /** Tween delay */
  tweenDelay: number;

  /** Tween repeat */
  tweenRepeat: number;

  /** Tween yoyo */
  tweenYoyo: boolean;

  /** Tween easing */
  tweenEasing: TweenEasingType;

  /** Tween ease params */
  tweenEaseParams: any[];

  /** Tween hold */
  tweenHold: number;

  /** Tween repeat delay */
  tweenRepeatDelay: number;

  /** Tween paused */
  tweenPaused: boolean;

  /** Tween progress */
  tweenProgress: number;

  /** Set tween targets */
  setTweenTargets(targets: any[]): this;

  /** Set tween properties */
  setTweenProperties(properties: Record<string, any>): this;

  /** Set tween duration */
  setTweenDuration(duration: number): this;

  /** Set tween delay */
  setTweenDelay(delay: number): this;

  /** Set tween repeat */
  setTweenRepeat(repeat: number): this;

  /** Set tween yoyo */
  setTweenYoyo(yoyo: boolean): this;

  /** Set tween easing */
  setTweenEasing(easing: TweenEasingType, ...params: any[]): this;

  /** Set tween hold */
  setTweenHold(hold: number): this;

  /** Set tween repeat delay */
  setTweenRepeatDelay(delay: number): this;

  /** Set tween paused */
  setTweenPaused(paused: boolean): this;

  /** Set tween progress */
  setTweenProgress(progress: number): this;

  /** Get tween targets */
  getTweenTargets(): any[];

  /** Get tween properties */
  getTweenProperties(): Record<string, any>;

  /** Get tween duration */
  getTweenDuration(): number;

  /** Get tween delay */
  getTweenDelay(): number;

  /** Get tween repeat */
  getTweenRepeat(): number;

  /** Get tween yoyo */
  getTweenYoyo(): boolean;

  /** Get tween easing */
  getTweenEasing(): TweenEasingType;

  /** Get tween ease params */
  getTweenEaseParams(): any[];

  /** Get tween hold */
  getTweenHold(): number;

  /** Get tween repeat delay */
  getTweenRepeatDelay(): number;

  /** Get tween paused */
  getTweenPaused(): boolean;

  /** Get tween progress */
  getTweenProgress(): number;

  /** Play tween */
  playTween(): this;

  /** Stop tween */
  stopTween(): this;

  /** Pause tween */
  pauseTween(): this;

  /** Resume tween */
  resumeTween(): this;

  /** Restart tween */
  restartTween(): this;

  /** Check if tween is playing */
  isTweenPlaying(): boolean;

  /** Check if tween is stopped */
  isTweenStopped(): boolean;

  /** Check if tween is paused */
  isTweenPaused(): boolean;

  /** Check if tween is completed */
  isTweenCompleted(): boolean;

  /** Check if tween is looping */
  isTweenLooping(): boolean;

  /** Get tween time */
  getTweenTime(): number;

  /** Get tween remaining time */
  getTweenRemainingTime(): number;

  /** Get tween total duration */
  getTweenTotalDuration(): number;

  /** Get tween current value */
  getTweenCurrentValue(property: string): any;

  /** Get tween start value */
  getTweenStartValue(property: string): any;

  /** Get tween end value */
  getTweenEndValue(property: string): any;

  /** Update tween */
  updateTween(deltaTime: number): void;
}
