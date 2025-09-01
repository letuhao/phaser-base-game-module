/**
 * Timeline Object Interface
 * 
 * Defines timeline animation functionality for game objects.
 * Handles complex timeline-based animations with multiple tweens.
 */

import type { IAnimatedObject } from './IAnimatedObject';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Interface for timeline animation game objects
 * 
 * Extends IAnimatedObject with timeline animation-specific functionality.
 */
export interface ITimelineObject extends IAnimatedObject {
  readonly gameObjectType: GameObjectType.ANIMATED;
  
  /** Timeline manager */
  readonly timelineManager: any; // Phaser.Tweens.Timeline
  
  /** Timeline tweens */
  readonly timelineTweens: Phaser.Tweens.Tween[];
  
  /** Timeline duration */
  timelineDuration: number;
  
  /** Timeline delay */
  timelineDelay: number;
  
  /** Timeline repeat */
  timelineRepeat: number;
  
  /** Timeline yoyo */
  timelineYoyo: boolean;
  
  /** Timeline paused */
  timelinePaused: boolean;
  
  /** Timeline progress */
  timelineProgress: number;
  
  /** Timeline current tween */
  timelineCurrentTween: number;
  
  /** Timeline total tweens */
  timelineTotalTweens: number;
  
  /** Set timeline duration */
  setTimelineDuration(duration: number): this;
  
  /** Set timeline delay */
  setTimelineDelay(delay: number): this;
  
  /** Set timeline repeat */
  setTimelineRepeat(repeat: number): this;
  
  /** Set timeline yoyo */
  setTimelineYoyo(yoyo: boolean): this;
  
  /** Set timeline paused */
  setTimelinePaused(paused: boolean): this;
  
  /** Set timeline progress */
  setTimelineProgress(progress: number): this;
  
  /** Get timeline duration */
  getTimelineDuration(): number;
  
  /** Get timeline delay */
  getTimelineDelay(): number;
  
  /** Get timeline repeat */
  getTimelineRepeat(): number;
  
  /** Get timeline yoyo */
  getTimelineYoyo(): boolean;
  
  /** Get timeline paused */
  getTimelinePaused(): boolean;
  
  /** Get timeline progress */
  getTimelineProgress(): number;
  
  /** Get timeline current tween */
  getTimelineCurrentTween(): number;
  
  /** Get timeline total tweens */
  getTimelineTotalTweens(): number;
  
  /** Add tween to timeline */
  addTweenToTimeline(tween: Phaser.Tweens.Tween): this;
  
  /** Remove tween from timeline */
  removeTweenFromTimeline(tween: Phaser.Tweens.Tween): this;
  
  /** Get timeline tween at index */
  getTimelineTweenAt(index: number): Phaser.Tweens.Tween | null;
  
  /** Get timeline tween by key */
  getTimelineTweenByKey(key: string): Phaser.Tweens.Tween | null;
  
  /** Play timeline */
  playTimeline(): this;
  
  /** Stop timeline */
  stopTimeline(): this;
  
  /** Pause timeline */
  pauseTimeline(): this;
  
  /** Resume timeline */
  resumeTimeline(): this;
  
  /** Restart timeline */
  restartTimeline(): this;
  
  /** Check if timeline is playing */
  isTimelinePlaying(): boolean;
  
  /** Check if timeline is stopped */
  isTimelineStopped(): boolean;
  
  /** Check if timeline is paused */
  isTimelinePaused(): boolean;
  
  /** Check if timeline is completed */
  isTimelineCompleted(): boolean;
  
  /** Check if timeline is looping */
  isTimelineLooping(): boolean;
  
  /** Get timeline time */
  getTimelineTime(): number;
  
  /** Get timeline remaining time */
  getTimelineRemainingTime(): number;
  
  /** Get timeline total duration */
  getTimelineTotalDuration(): number;
  
  /** Get timeline current tween progress */
  getTimelineCurrentTweenProgress(): number;
  
  /** Get timeline tween progress at index */
  getTimelineTweenProgressAt(index: number): number;
  
  /** Update timeline */
  updateTimeline(deltaTime: number): void;
}
