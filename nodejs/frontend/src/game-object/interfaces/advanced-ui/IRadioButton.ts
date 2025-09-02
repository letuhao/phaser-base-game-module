/**
 * Radio Button Interface
 *
 * Defines radio button UI component functionality for game objects.
 * Handles single selection from a group of options.
 */

import type { IContainer } from '../container/IContainer';
import { GameObjectType, LabelPositionType, RadioButtonState } from '../../enums';
import * as Phaser from 'phaser';

/**
 * Interface for radio button UI game objects
 *
 * Extends IContainer with radio button-specific functionality.
 */
export interface IRadioButton extends IContainer {
  readonly gameObjectType: GameObjectType;

  /** Radio button state */
  radioButtonState: RadioButtonState;

  /** Radio button selected */
  radioButtonSelected: boolean;

  /** Radio button enabled */
  radioButtonEnabled: boolean;

  /** Radio button interactive */
  radioButtonInteractive: boolean;

  /** Radio button group */
  radioButtonGroup: string;

  /** Radio button value */
  radioButtonValue: string;

  /** Radio button background */
  readonly radioButtonBackground: Phaser.GameObjects.GameObject;

  /** Radio button dot */
  readonly radioButtonDot: Phaser.GameObjects.GameObject;

  /** Radio button label */
  readonly radioButtonLabel: Phaser.GameObjects.Text | null;

  /** Radio button label text */
  radioButtonLabelText: string;

  /** Radio button label position */
  radioButtonLabelPosition: LabelPositionType;

  /** Radio button label offset */
  radioButtonLabelOffset: { x: number; y: number };

  /** Radio button size */
  radioButtonSize: { width: number; height: number };

  /** Radio button dot size */
  radioButtonDotSize: { width: number; height: number };

  /** Radio button border width */
  radioButtonBorderWidth: number;

  /** Radio button border color */
  radioButtonBorderColor: number;

  /** Radio button background color */
  radioButtonBackgroundColor: number;

  /** Radio button dot color */
  radioButtonDotColor: number;

  /** Radio button hover color */
  radioButtonHoverColor: number;

  /** Radio button disabled color */
  radioButtonDisabledColor: number;

  /** Set radio button state */
  setRadioButtonState(state: RadioButtonState): this;

  /** Set radio button selected */
  setRadioButtonSelected(selected: boolean): this;

  /** Set radio button enabled */
  setRadioButtonEnabled(enabled: boolean): this;

  /** Set radio button interactive */
  setRadioButtonInteractive(interactive: boolean): this;

  /** Set radio button group */
  setRadioButtonGroup(group: string): this;

  /** Set radio button value */
  setRadioButtonValue(value: string): this;

  /** Set radio button label text */
  setRadioButtonLabelText(text: string): this;

  /** Set radio button label position */
  setRadioButtonLabelPosition(position: LabelPositionType): this;

  /** Set radio button label offset */
  setRadioButtonLabelOffset(x: number, y: number): this;

  /** Set radio button size */
  setRadioButtonSize(width: number, height: number): this;

  /** Set radio button dot size */
  setRadioButtonDotSize(width: number, height: number): this;

  /** Set radio button border width */
  setRadioButtonBorderWidth(width: number): this;

  /** Set radio button border color */
  setRadioButtonBorderColor(color: number): this;

  /** Set radio button background color */
  setRadioButtonBackgroundColor(color: number): this;

  /** Set radio button dot color */
  setRadioButtonDotColor(color: number): this;

  /** Set radio button hover color */
  setRadioButtonHoverColor(color: number): this;

  /** Set radio button disabled color */
  setRadioButtonDisabledColor(color: number): this;

  /** Get radio button state */
  getRadioButtonState(): RadioButtonState;

  /** Get radio button selected */
  getRadioButtonSelected(): boolean;

  /** Get radio button enabled */
  getRadioButtonEnabled(): boolean;

  /** Get radio button interactive */
  getRadioButtonInteractive(): boolean;

  /** Get radio button group */
  getRadioButtonGroup(): string;

  /** Get radio button value */
  getRadioButtonValue(): string;

  /** Get radio button background */
  getRadioButtonBackground(): Phaser.GameObjects.GameObject;

  /** Get radio button dot */
  getRadioButtonDot(): Phaser.GameObjects.GameObject;

  /** Get radio button label */
  getRadioButtonLabel(): Phaser.GameObjects.Text | null;

  /** Get radio button label text */
  getRadioButtonLabelText(): string;

  /** Get radio button label position */
  getRadioButtonLabelPosition(): LabelPositionType;

  /** Get radio button label offset */
  getRadioButtonLabelOffset(): { x: number; y: number };

  /** Get radio button size */
  getRadioButtonSize(): { width: number; height: number };

  /** Get radio button dot size */
  getRadioButtonDotSize(): { width: number; height: number };

  /** Get radio button border width */
  getRadioButtonBorderWidth(): number;

  /** Get radio button border color */
  getRadioButtonBorderColor(): number;

  /** Get radio button background color */
  getRadioButtonBackgroundColor(): number;

  /** Get radio button dot color */
  getRadioButtonDotColor(): number;

  /** Get radio button hover color */
  getRadioButtonHoverColor(): number;

  /** Get radio button disabled color */
  getRadioButtonDisabledColor(): number;

  /** Select radio button */
  selectRadioButton(): this;

  /** Deselect radio button */
  deselectRadioButton(): this;

  /** Toggle radio button selection */
  toggleRadioButton(): this;

  /** Update radio button visual state */
  updateRadioButtonVisualState(): this;

  /** Update radio button colors */
  updateRadioButtonColors(): this;

  /** Update radio button label position */
  updateRadioButtonLabelPosition(): this;

  /** Update radio button */
  updateRadioButton(deltaTime: number): void;
}
