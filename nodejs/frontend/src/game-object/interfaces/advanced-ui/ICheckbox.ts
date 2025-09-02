/**
 * Checkbox Interface
 *
 * Defines checkbox UI component functionality for game objects.
 * Handles boolean state toggling with visual feedback.
 */

import type { IContainer } from '../container/IContainer';
import { GameObjectType, LabelPositionType, CheckboxState } from '../../enums';
import * as Phaser from 'phaser';

/**
 * Interface for checkbox UI game objects
 *
 * Extends IContainer with checkbox-specific functionality.
 */
export interface ICheckbox extends IContainer {
  readonly gameObjectType: GameObjectType;

  /** Checkbox state */
  checkboxState: CheckboxState;

  /** Checkbox checked */
  checkboxChecked: boolean;

  /** Checkbox indeterminate */
  checkboxIndeterminate: boolean;

  /** Checkbox enabled */
  checkboxEnabled: boolean;

  /** Checkbox interactive */
  checkboxInteractive: boolean;

  /** Checkbox background */
  readonly checkboxBackground: Phaser.GameObjects.GameObject;

  /** Checkbox checkmark */
  readonly checkboxCheckmark: Phaser.GameObjects.GameObject;

  /** Checkbox indeterminate mark */
  readonly checkboxIndeterminateMark: Phaser.GameObjects.GameObject;

  /** Checkbox label */
  readonly checkboxLabel: Phaser.GameObjects.Text | null;

  /** Checkbox label text */
  checkboxLabelText: string;

  /** Checkbox label position */
  checkboxLabelPosition: LabelPositionType;

  /** Checkbox label offset */
  checkboxLabelOffset: { x: number; y: number };

  /** Checkbox size */
  checkboxSize: { width: number; height: number };

  /** Checkbox border width */
  checkboxBorderWidth: number;

  /** Checkbox border color */
  checkboxBorderColor: number;

  /** Checkbox background color */
  checkboxBackgroundColor: number;

  /** Checkbox checkmark color */
  checkboxCheckmarkColor: number;

  /** Checkbox indeterminate color */
  checkboxIndeterminateColor: number;

  /** Checkbox hover color */
  checkboxHoverColor: number;

  /** Checkbox disabled color */
  checkboxDisabledColor: number;

  /** Set checkbox state */
  setCheckboxState(state: CheckboxState): this;

  /** Set checkbox checked */
  setCheckboxChecked(checked: boolean): this;

  /** Set checkbox indeterminate */
  setCheckboxIndeterminate(indeterminate: boolean): this;

  /** Set checkbox enabled */
  setCheckboxEnabled(enabled: boolean): this;

  /** Set checkbox interactive */
  setCheckboxInteractive(interactive: boolean): this;

  /** Set checkbox label text */
  setCheckboxLabelText(text: string): this;

  /** Set checkbox label position */
  setCheckboxLabelPosition(position: LabelPositionType): this;

  /** Set checkbox label offset */
  setCheckboxLabelOffset(x: number, y: number): this;

  /** Set checkbox size */
  setCheckboxSize(width: number, height: number): this;

  /** Set checkbox border width */
  setCheckboxBorderWidth(width: number): this;

  /** Set checkbox border color */
  setCheckboxBorderColor(color: number): this;

  /** Set checkbox background color */
  setCheckboxBackgroundColor(color: number): this;

  /** Set checkbox checkmark color */
  setCheckboxCheckmarkColor(color: number): this;

  /** Set checkbox indeterminate color */
  setCheckboxIndeterminateColor(color: number): this;

  /** Set checkbox hover color */
  setCheckboxHoverColor(color: number): this;

  /** Set checkbox disabled color */
  setCheckboxDisabledColor(color: number): this;

  /** Get checkbox state */
  getCheckboxState(): CheckboxState;

  /** Get checkbox checked */
  getCheckboxChecked(): boolean;

  /** Get checkbox indeterminate */
  getCheckboxIndeterminate(): boolean;

  /** Get checkbox enabled */
  getCheckboxEnabled(): boolean;

  /** Get checkbox interactive */
  getCheckboxInteractive(): boolean;

  /** Get checkbox background */
  getCheckboxBackground(): Phaser.GameObjects.GameObject;

  /** Get checkbox checkmark */
  getCheckboxCheckmark(): Phaser.GameObjects.GameObject;

  /** Get checkbox indeterminate mark */
  getCheckboxIndeterminateMark(): Phaser.GameObjects.GameObject;

  /** Get checkbox label */
  getCheckboxLabel(): Phaser.GameObjects.Text | null;

  /** Get checkbox label text */
  getCheckboxLabelText(): string;

  /** Get checkbox label position */
  getCheckboxLabelPosition(): LabelPositionType;

  /** Get checkbox label offset */
  getCheckboxLabelOffset(): { x: number; y: number };

  /** Get checkbox size */
  getCheckboxSize(): { width: number; height: number };

  /** Get checkbox border width */
  getCheckboxBorderWidth(): number;

  /** Get checkbox border color */
  getCheckboxBorderColor(): number;

  /** Get checkbox background color */
  getCheckboxBackgroundColor(): number;

  /** Get checkbox checkmark color */
  getCheckboxCheckmarkColor(): number;

  /** Get checkbox indeterminate color */
  getCheckboxIndeterminateColor(): number;

  /** Get checkbox hover color */
  getCheckboxHoverColor(): number;

  /** Get checkbox disabled color */
  getCheckboxDisabledColor(): number;

  /** Toggle checkbox state */
  toggleCheckbox(): this;

  /** Check checkbox */
  checkCheckbox(): this;

  /** Uncheck checkbox */
  uncheckCheckbox(): this;

  /** Set checkbox indeterminate */
  setCheckboxIndeterminateState(): this;

  /** Update checkbox visual state */
  updateCheckboxVisualState(): this;

  /** Update checkbox colors */
  updateCheckboxColors(): this;

  /** Update checkbox label position */
  updateCheckboxLabelPosition(): this;

  /** Update checkbox */
  updateCheckbox(deltaTime: number): void;
}
