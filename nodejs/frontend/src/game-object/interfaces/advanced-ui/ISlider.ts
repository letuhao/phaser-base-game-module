/**
 * Slider Interface
 * 
 * Defines slider UI component functionality for game objects.
 * Handles value selection through dragging or clicking.
 */

import type { IContainer } from '../container/IContainer';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Slider orientations
 */
export enum SliderOrientation {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical'
}

/**
 * Slider value change modes
 */
export enum SliderValueChangeMode {
  CONTINUOUS = 'continuous',
  DISCRETE = 'discrete',
  STEP = 'step'
}

/**
 * Interface for slider UI game objects
 * 
 * Extends IContainer with slider-specific functionality.
 */
export interface ISlider extends IContainer {
  readonly gameObjectType: GameObjectType.SLIDER;
  
  /** Slider orientation */
  sliderOrientation: SliderOrientation;
  
  /** Slider minimum value */
  sliderMinValue: number;
  
  /** Slider maximum value */
  sliderMaxValue: number;
  
  /** Slider current value */
  sliderValue: number;
  
  /** Slider step value */
  sliderStep: number;
  
  /** Slider value change mode */
  sliderValueChangeMode: SliderValueChangeMode;
  
  /** Slider track */
  readonly sliderTrack: Phaser.GameObjects.GameObject;
  
  /** Slider thumb */
  readonly sliderThumb: Phaser.GameObjects.GameObject;
  
  /** Slider fill */
  readonly sliderFill: Phaser.GameObjects.GameObject;
  
  /** Slider enabled */
  sliderEnabled: boolean;
  
  /** Slider interactive */
  sliderInteractive: boolean;
  
  /** Slider draggable */
  sliderDraggable: boolean;
  
  /** Slider snap to step */
  sliderSnapToStep: boolean;
  
  /** Slider show value */
  sliderShowValue: boolean;
  
  /** Slider value text */
  readonly sliderValueText: Phaser.GameObjects.Text | null;
  
  /** Slider value format */
  sliderValueFormat: string;
  
  /** Slider value precision */
  sliderValuePrecision: number;
  
  /** Set slider orientation */
  setSliderOrientation(orientation: SliderOrientation): this;
  
  /** Set slider range */
  setSliderRange(min: number, max: number): this;
  
  /** Set slider value */
  setSliderValue(value: number): this;
  
  /** Set slider step */
  setSliderStep(step: number): this;
  
  /** Set slider value change mode */
  setSliderValueChangeMode(mode: SliderValueChangeMode): this;
  
  /** Set slider enabled */
  setSliderEnabled(enabled: boolean): this;
  
  /** Set slider interactive */
  setSliderInteractive(interactive: boolean): this;
  
  /** Set slider draggable */
  setSliderDraggable(draggable: boolean): this;
  
  /** Set slider snap to step */
  setSliderSnapToStep(snap: boolean): this;
  
  /** Set slider show value */
  setSliderShowValue(show: boolean): this;
  
  /** Set slider value format */
  setSliderValueFormat(format: string): this;
  
  /** Set slider value precision */
  setSliderValuePrecision(precision: number): this;
  
  /** Get slider orientation */
  getSliderOrientation(): SliderOrientation;
  
  /** Get slider minimum value */
  getSliderMinValue(): number;
  
  /** Get slider maximum value */
  getSliderMaxValue(): number;
  
  /** Get slider current value */
  getSliderValue(): number;
  
  /** Get slider step */
  getSliderStep(): number;
  
  /** Get slider value change mode */
  getSliderValueChangeMode(): SliderValueChangeMode;
  
  /** Get slider track */
  getSliderTrack(): Phaser.GameObjects.GameObject;
  
  /** Get slider thumb */
  getSliderThumb(): Phaser.GameObjects.GameObject;
  
  /** Get slider fill */
  getSliderFill(): Phaser.GameObjects.GameObject;
  
  /** Check if slider is enabled */
  isSliderEnabled(): boolean;
  
  /** Check if slider is interactive */
  isSliderInteractive(): boolean;
  
  /** Check if slider is draggable */
  isSliderDraggable(): boolean;
  
  /** Check if slider snaps to step */
  isSliderSnapToStep(): boolean;
  
  /** Check if slider shows value */
  isSliderShowValue(): boolean;
  
  /** Get slider value text */
  getSliderValueText(): Phaser.GameObjects.Text | null;
  
  /** Get slider value format */
  getSliderValueFormat(): string;
  
  /** Get slider value precision */
  getSliderValuePrecision(): number;
  
  /** Get slider value as percentage */
  getSliderValueAsPercentage(): number;
  
  /** Get slider thumb position */
  getSliderThumbPosition(): { x: number; y: number };
  
  /** Get slider fill width */
  getSliderFillWidth(): number;
  
  /** Get slider fill height */
  getSliderFillHeight(): number;
  
  /** Update slider value from position */
  updateSliderValueFromPosition(x: number, y: number): this;
  
  /** Update slider thumb position */
  updateSliderThumbPosition(): this;
  
  /** Update slider fill */
  updateSliderFill(): this;
  
  /** Update slider value text */
  updateSliderValueText(): this;
  
  /** Snap slider value to step */
  snapSliderValueToStep(): this;
  
  /** Clamp slider value to range */
  clampSliderValueToRange(): this;
  
  /** Update slider */
  updateSlider(deltaTime: number): void;
}
