/**
 * Sprite Animation Interface
 * 
 * Defines sprite animation-specific functionality for game objects.
 * Handles sprite-based frame animations.
 */

import type { IAnimatedObject } from './IAnimatedObject';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Interface for sprite animation game objects
 * 
 * Extends IAnimatedObject with sprite animation-specific functionality.
 */
export interface ISpriteAnimation extends IAnimatedObject {
  readonly gameObjectType: GameObjectType.ANIMATED;
  
  /** Sprite animation manager */
  readonly spriteAnimationManager: Phaser.Animations.AnimationManager;
  
  /** Sprite animation */
  readonly spriteAnimation: Phaser.Animations.Animation;
  
  /** Sprite animation key */
  spriteAnimationKey: string;
  
  /** Sprite animation frame */
  spriteAnimationFrame: number;
  
  /** Sprite animation total frames */
  spriteAnimationTotalFrames: number;
  
  /** Sprite animation frame rate */
  spriteAnimationFrameRate: number;
  
  /** Sprite animation duration */
  spriteAnimationDuration: number;
  
  /** Sprite animation repeat */
  spriteAnimationRepeat: number;
  
  /** Sprite animation delay */
  spriteAnimationDelay: number;
  
  /** Sprite animation yoyo */
  spriteAnimationYoyo: boolean;
  
  /** Sprite animation hold */
  spriteAnimationHold: number;
  
  /** Sprite animation skip miss */
  spriteAnimationSkipMiss: boolean;
  
  /** Sprite animation show on start */
  spriteAnimationShowOnStart: boolean;
  
  /** Sprite animation hide on complete */
  spriteAnimationHideOnComplete: boolean;
  
  /** Set sprite animation key */
  setSpriteAnimationKey(key: string): this;
  
  /** Set sprite animation frame */
  setSpriteAnimationFrame(frame: number): this;
  
  /** Set sprite animation total frames */
  setSpriteAnimationTotalFrames(frames: number): this;
  
  /** Set sprite animation frame rate */
  setSpriteAnimationFrameRate(frameRate: number): this;
  
  /** Set sprite animation duration */
  setSpriteAnimationDuration(duration: number): this;
  
  /** Set sprite animation repeat */
  setSpriteAnimationRepeat(repeat: number): this;
  
  /** Set sprite animation delay */
  setSpriteAnimationDelay(delay: number): this;
  
  /** Set sprite animation yoyo */
  setSpriteAnimationYoyo(yoyo: boolean): this;
  
  /** Set sprite animation hold */
  setSpriteAnimationHold(hold: number): this;
  
  /** Set sprite animation skip miss */
  setSpriteAnimationSkipMiss(skipMiss: boolean): this;
  
  /** Set sprite animation show on start */
  setSpriteAnimationShowOnStart(showOnStart: boolean): this;
  
  /** Set sprite animation hide on complete */
  setSpriteAnimationHideOnComplete(hideOnComplete: boolean): this;
  
  /** Get sprite animation key */
  getSpriteAnimationKey(): string;
  
  /** Get sprite animation frame */
  getSpriteAnimationFrame(): number;
  
  /** Get sprite animation total frames */
  getSpriteAnimationTotalFrames(): number;
  
  /** Get sprite animation frame rate */
  getSpriteAnimationFrameRate(): number;
  
  /** Get sprite animation duration */
  getSpriteAnimationDuration(): number;
  
  /** Get sprite animation repeat */
  getSpriteAnimationRepeat(): number;
  
  /** Get sprite animation delay */
  getSpriteAnimationDelay(): number;
  
  /** Get sprite animation yoyo */
  getSpriteAnimationYoyo(): boolean;
  
  /** Get sprite animation hold */
  getSpriteAnimationHold(): number;
  
  /** Get sprite animation skip miss */
  getSpriteAnimationSkipMiss(): boolean;
  
  /** Get sprite animation show on start */
  getSpriteAnimationShowOnStart(): boolean;
  
  /** Get sprite animation hide on complete */
  getSpriteAnimationHideOnComplete(): boolean;
  
  /** Play sprite animation */
  playSpriteAnimation(key: string, ignoreIfPlaying?: boolean, startFrame?: number): this;
  
  /** Stop sprite animation */
  stopSpriteAnimation(): this;
  
  /** Pause sprite animation */
  pauseSpriteAnimation(): this;
  
  /** Resume sprite animation */
  resumeSpriteAnimation(): this;
  
  /** Restart sprite animation */
  restartSpriteAnimation(): this;
  
  /** Check if sprite animation is playing */
  isSpriteAnimationPlaying(): boolean;
  
  /** Check if sprite animation is stopped */
  isSpriteAnimationStopped(): boolean;
  
  /** Check if sprite animation is paused */
  isSpriteAnimationPaused(): boolean;
  
  /** Check if sprite animation is completed */
  isSpriteAnimationCompleted(): boolean;
  
  /** Check if sprite animation is looping */
  isSpriteAnimationLooping(): boolean;
  
  /** Get sprite animation time */
  getSpriteAnimationTime(): number;
  
  /** Get sprite animation remaining time */
  getSpriteAnimationRemainingTime(): number;
  
  /** Get sprite animation total duration */
  getSpriteAnimationTotalDuration(): number;
  
  /** Get sprite animation current frame */
  getSpriteAnimationCurrentFrame(): number;
  
  /** Get sprite animation total frames */
  getSpriteAnimationTotalFrames(): number;
  
  /** Get sprite animation frame progress */
  getSpriteAnimationFrameProgress(): number;
  
  /** Get sprite animation progress */
  getSpriteAnimationProgress(): number;
  
  /** Set sprite animation progress */
  setSpriteAnimationProgress(progress: number): this;
  
  /** Update sprite animation */
  updateSpriteAnimation(deltaTime: number): void;
}
