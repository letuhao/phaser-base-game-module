/**
 * Progress Bar Interface
 * 
 * Defines progress bar UI component functionality for game objects.
 * Handles visual representation of progress or completion status.
 */

import type { IContainer } from '../container/IContainer';
import { GameObjectType, LabelPositionType, ProgressBarOrientation, ProgressBarFillMode } from '../../enums';
import * as Phaser from 'phaser';

/**
 * Interface for progress bar UI game objects
 * 
 * Extends IContainer with progress bar-specific functionality.
 */
export interface IProgressBar extends IContainer {
  readonly gameObjectType: GameObjectType;
  
  /** Progress bar orientation */
  progressBarOrientation: ProgressBarOrientation;
  
  /** Progress bar fill mode */
  progressBarFillMode: ProgressBarFillMode;
  
  /** Progress bar minimum value */
  progressBarMinValue: number;
  
  /** Progress bar maximum value */
  progressBarMaxValue: number;
  
  /** Progress bar current value */
  progressBarValue: number;
  
  /** Progress bar progress (0-1) */
  progressBarProgress: number;
  
  /** Progress bar enabled */
  progressBarEnabled: boolean;
  
  /** Progress bar interactive */
  progressBarInteractive: boolean;
  
  /** Progress bar animated */
  progressBarAnimated: boolean;
  
  /** Progress bar animation duration */
  progressBarAnimationDuration: number;
  
  /** Progress bar animation easing */
  progressBarAnimationEasing: string;
  
  /** Progress bar background */
  readonly progressBarBackground: Phaser.GameObjects.GameObject;
  
  /** Progress bar fill */
  readonly progressBarFill: Phaser.GameObjects.GameObject;
  
  /** Progress bar border */
  readonly progressBarBorder: Phaser.GameObjects.GameObject;
  
  /** Progress bar label */
  readonly progressBarLabel: Phaser.GameObjects.Text | null;
  
  /** Progress bar label text */
  progressBarLabelText: string;
  
  /** Progress bar label position */
  progressBarLabelPosition: LabelPositionType;
  
  /** Progress bar label offset */
  progressBarLabelOffset: { x: number; y: number };
  
  /** Progress bar show percentage */
  progressBarShowPercentage: boolean;
  
  /** Progress bar show value */
  progressBarShowValue: boolean;
  
  /** Progress bar value format */
  progressBarValueFormat: string;
  
  /** Progress bar value precision */
  progressBarValuePrecision: number;
  
  /** Progress bar size */
  progressBarSize: { width: number; height: number };
  
  /** Progress bar border width */
  progressBarBorderWidth: number;
  
  /** Progress bar border color */
  progressBarBorderColor: number;
  
  /** Progress bar background color */
  progressBarBackgroundColor: number;
  
  /** Progress bar fill color */
  progressBarFillColor: number;
  
  /** Progress bar text color */
  progressBarTextColor: number;
  
  /** Progress bar disabled color */
  progressBarDisabledColor: number;
  
  /** Set progress bar orientation */
  setProgressBarOrientation(orientation: ProgressBarOrientation): this;
  
  /** Set progress bar fill mode */
  setProgressBarFillMode(mode: ProgressBarFillMode): this;
  
  /** Set progress bar range */
  setProgressBarRange(min: number, max: number): this;
  
  /** Set progress bar value */
  setProgressBarValue(value: number): this;
  
  /** Set progress bar progress */
  setProgressBarProgress(progress: number): this;
  
  /** Set progress bar enabled */
  setProgressBarEnabled(enabled: boolean): this;
  
  /** Set progress bar interactive */
  setProgressBarInteractive(interactive: boolean): this;
  
  /** Set progress bar animated */
  setProgressBarAnimated(animated: boolean): this;
  
  /** Set progress bar animation duration */
  setProgressBarAnimationDuration(duration: number): this;
  
  /** Set progress bar animation easing */
  setProgressBarAnimationEasing(easing: string): this;
  
  /** Set progress bar label text */
  setProgressBarLabelText(text: string): this;
  
  /** Set progress bar label position */
  setProgressBarLabelPosition(position: LabelPositionType): this;
  
  /** Set progress bar label offset */
  setProgressBarLabelOffset(x: number, y: number): this;
  
  /** Set progress bar show percentage */
  setProgressBarShowPercentage(show: boolean): this;
  
  /** Set progress bar show value */
  setProgressBarShowValue(show: boolean): this;
  
  /** Set progress bar value format */
  setProgressBarValueFormat(format: string): this;
  
  /** Set progress bar value precision */
  setProgressBarValuePrecision(precision: number): this;
  
  /** Set progress bar size */
  setProgressBarSize(width: number, height: number): this;
  
  /** Set progress bar border width */
  setProgressBarBorderWidth(width: number): this;
  
  /** Set progress bar border color */
  setProgressBarBorderColor(color: number): this;
  
  /** Set progress bar background color */
  setProgressBarBackgroundColor(color: number): this;
  
  /** Set progress bar fill color */
  setProgressBarFillColor(color: number): this;
  
  /** Set progress bar text color */
  setProgressBarTextColor(color: number): this;
  
  /** Set progress bar disabled color */
  setProgressBarDisabledColor(color: number): this;
  
  /** Get progress bar orientation */
  getProgressBarOrientation(): ProgressBarOrientation;
  
  /** Get progress bar fill mode */
  getProgressBarFillMode(): ProgressBarFillMode;
  
  /** Get progress bar minimum value */
  getProgressBarMinValue(): number;
  
  /** Get progress bar maximum value */
  getProgressBarMaxValue(): number;
  
  /** Get progress bar current value */
  getProgressBarValue(): number;
  
  /** Get progress bar progress */
  getProgressBarProgress(): number;
  
  /** Get progress bar enabled */
  getProgressBarEnabled(): boolean;
  
  /** Get progress bar interactive */
  getProgressBarInteractive(): boolean;
  
  /** Get progress bar animated */
  getProgressBarAnimated(): boolean;
  
  /** Get progress bar animation duration */
  getProgressBarAnimationDuration(): number;
  
  /** Get progress bar animation easing */
  getProgressBarAnimationEasing(): string;
  
  /** Get progress bar background */
  getProgressBarBackground(): Phaser.GameObjects.GameObject;
  
  /** Get progress bar fill */
  getProgressBarFill(): Phaser.GameObjects.GameObject;
  
  /** Get progress bar border */
  getProgressBarBorder(): Phaser.GameObjects.GameObject;
  
  /** Get progress bar label */
  getProgressBarLabel(): Phaser.GameObjects.Text | null;
  
  /** Get progress bar label text */
  getProgressBarLabelText(): string;
  
  /** Get progress bar label position */
  getProgressBarLabelPosition(): LabelPositionType;
  
  /** Get progress bar label offset */
  getProgressBarLabelOffset(): { x: number; y: number };
  
  /** Get progress bar show percentage */
  getProgressBarShowPercentage(): boolean;
  
  /** Get progress bar show value */
  getProgressBarShowValue(): boolean;
  
  /** Get progress bar value format */
  getProgressBarValueFormat(): string;
  
  /** Get progress bar value precision */
  getProgressBarValuePrecision(): number;
  
  /** Get progress bar size */
  getProgressBarSize(): { width: number; height: number };
  
  /** Get progress bar border width */
  getProgressBarBorderWidth(): number;
  
  /** Get progress bar border color */
  getProgressBarBorderColor(): number;
  
  /** Get progress bar background color */
  getProgressBarBackgroundColor(): number;
  
  /** Get progress bar fill color */
  getProgressBarFillColor(): number;
  
  /** Get progress bar text color */
  getProgressBarTextColor(): number;
  
  /** Get progress bar disabled color */
  getProgressBarDisabledColor(): number;
  
  /** Get progress bar percentage */
  getProgressBarPercentage(): number;
  
  /** Get progress bar fill width */
  getProgressBarFillWidth(): number;
  
  /** Get progress bar fill height */
  getProgressBarFillHeight(): number;
  
  /** Update progress bar fill */
  updateProgressBarFill(): this;
  
  /** Update progress bar label */
  updateProgressBarLabel(): this;
  
  /** Update progress bar layout */
  updateProgressBarLayout(): this;
  
  /** Update progress bar animation */
  updateProgressBarAnimation(): this;
  
  /** Update progress bar */
  updateProgressBar(deltaTime: number): void;
}
