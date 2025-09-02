/**
 * Animated Object Interface
 *
 * Defines base animation functionality for game objects.
 * Provides common animation properties and methods.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType } from '../../enums/GameObjectEnums';
import { AnimationDirection } from '../../../layout/enums/LayoutEnums';
import { AnimationState, AnimationKey } from '../../enums';

// AnimationState enum is now imported from organized enums

// AnimationDirection enum removed - use Layout System's AnimationDirection instead

/**
 * Interface for animated game objects
 *
 * Extends IGameObject with base animation functionality for
 * animation management and control.
 */
export interface IAnimatedObject extends IGameObject {
  // ============================================================================
  // ANIMATION IDENTITY
  // ============================================================================

  /** The specific type of game object (always 'animated') */
  readonly gameObjectType: GameObjectType;

  // ============================================================================
  // ANIMATION PROPERTIES
  // ============================================================================

  /** Animation enabled */
  animationEnabled: boolean;

  /** Current animation state */
  animationState: AnimationState;

  /** Current animation key */
  currentAnimationKey: AnimationKey | string | null;

  /** Animation speed */
  animationSpeed: number;

  /** Animation direction */
  animationDirection: AnimationDirection;

  /** Animation loop */
  animationLoop: boolean;

  /** Animation repeat */
  animationRepeat: number;

  /** Animation delay */
  animationDelay: number;

  /** Animation duration */
  animationDuration: number;

  /** Animation progress */
  animationProgress: number;

  /** Animation paused */
  animationPaused: boolean;

  /** Animation yoyo */
  animationYoyo: boolean;

  /** Animation hold */
  animationHold: number;

  /** Animation frame rate */
  animationFrameRate: number;

  /** Animation skip miss */
  animationSkipMiss: boolean;

  /** Animation show on start */
  animationShowOnStart: boolean;

  /** Animation hide on complete */
  animationHideOnComplete: boolean;

  // ============================================================================
  // ANIMATION METHODS
  // ============================================================================

  /** Enable animation */
  enableAnimation(): this;

  /** Disable animation */
  disableAnimation(): this;

  /** Play animation */
  playAnimation(key: AnimationKey | string, ignoreIfPlaying?: boolean, startFrame?: number): this;

  /** Stop animation */
  stopAnimation(): this;

  /** Pause animation */
  pauseAnimation(): this;

  /** Resume animation */
  resumeAnimation(): this;

  /** Restart animation */
  restartAnimation(): this;

  /** Set animation speed */
  setAnimationSpeed(speed: number): this;

  /** Set animation direction */
  setAnimationDirection(direction: AnimationDirection): this;

  /** Set animation loop */
  setAnimationLoop(loop: boolean): this;

  /** Set animation repeat */
  setAnimationRepeat(repeat: number): this;

  /** Set animation delay */
  setAnimationDelay(delay: number): this;

  /** Set animation duration */
  setAnimationDuration(duration: number): this;

  /** Set animation progress */
  setAnimationProgress(progress: number): this;

  /** Set animation paused */
  setAnimationPaused(paused: boolean): this;

  /** Set animation yoyo */
  setAnimationYoyo(yoyo: boolean): this;

  /** Set animation hold */
  setAnimationHold(hold: number): this;

  /** Set animation frame rate */
  setAnimationFrameRate(frameRate: number): this;

  /** Set animation skip miss */
  setAnimationSkipMiss(skipMiss: boolean): this;

  /** Set animation show on start */
  setAnimationShowOnStart(showOnStart: boolean): this;

  /** Set animation hide on complete */
  setAnimationHideOnComplete(hideOnComplete: boolean): this;

  /** Check if animation is enabled */
  isAnimationEnabled(): boolean;

  /** Get animation state */
  getAnimationState(): AnimationState;

  /** Get current animation key */
  getCurrentAnimationKey(): AnimationKey | string | null;

  /** Get animation speed */
  getAnimationSpeed(): number;

  /** Get animation direction */
  getAnimationDirection(): AnimationDirection;

  /** Get animation loop */
  getAnimationLoop(): boolean;

  /** Get animation repeat */
  getAnimationRepeat(): number;

  /** Get animation delay */
  getAnimationDelay(): number;

  /** Get animation duration */
  getAnimationDuration(): number;

  /** Get animation progress */
  getAnimationProgress(): number;

  /** Check if animation is paused */
  isAnimationPaused(): boolean;

  /** Get animation yoyo */
  getAnimationYoyo(): boolean;

  /** Get animation hold */
  getAnimationHold(): number;

  /** Get animation frame rate */
  getAnimationFrameRate(): number;

  /** Get animation skip miss */
  getAnimationSkipMiss(): boolean;

  /** Get animation show on start */
  getAnimationShowOnStart(): boolean;

  /** Get animation hide on complete */
  getAnimationHideOnComplete(): boolean;

  /** Check if animation is playing */
  isAnimationPlaying(): boolean;

  /** Check if animation is stopped */
  isAnimationStopped(): boolean;

  /** Check if animation is completed */
  isAnimationCompleted(): boolean;

  /** Check if animation is looping */
  isAnimationLooping(): boolean;

  /** Get animation time */
  getAnimationTime(): number;

  /** Get animation remaining time */
  getAnimationRemainingTime(): number;

  /** Get animation total duration */
  getAnimationTotalDuration(): number;

  /** Get animation current frame */
  getAnimationCurrentFrame(): number;

  /** Get animation total frames */
  getAnimationTotalFrames(): number;

  /** Get animation frame progress */
  getAnimationFrameProgress(): number;

  /** Update animation */
  updateAnimation(deltaTime: number): void;
}
