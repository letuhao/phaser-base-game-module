/**
 * Input UI Interface
 * 
 * Defines input-specific functionality for UI game objects.
 */

import type { IUIObject } from './IUIObject';

/**
 * Interface for input UI game objects
 * 
 * Extends IUIObject with input-specific functionality for text input,
 * input validation, and input interactions.
 * 
 * Example implementation:
 * ```typescript
 * class MyInput extends Phaser.GameObjects.Container implements IInput {
 *   readonly gameObjectType = 'ui' as const;
 *   readonly uiType = 'input' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IInput extends IUIObject {
  // ============================================================================
  // INPUT IDENTITY
  // ============================================================================
  
  /** The specific type of UI element (always 'input') */
  readonly uiType: 'input';
  
  // ============================================================================
  // INPUT PROPERTIES
  // ============================================================================
  
  /** Input value */
  value: string;
  
  /** Input placeholder */
  placeholder: string;
  
  /** Input type */
  inputType: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  
  /** Input size */
  inputSize: 'small' | 'medium' | 'large';
  
  /** Input variant */
  inputVariant: 'outlined' | 'filled' | 'underlined';
  
  /** Maximum input length */
  maxLength: number;
  
  /** Minimum input length */
  minLength: number;
  
  /** Input pattern (regex) */
  pattern: string;
  
  /** Whether input is required */
  required: boolean;
  
  /** Whether input is readonly */
  readonly: boolean;
  
  /** Whether input is disabled */
  disabled: boolean;
  
  /** Whether input is multiline */
  multiline: boolean;
  
  /** Number of rows (for multiline) */
  rows: number;
  
  /** Input validation state */
  validationState: 'valid' | 'invalid' | 'pending';
  
  /** Input validation message */
  validationMessage: string;
  
  /** Input autocomplete */
  autocomplete: boolean;
  
  /** Input autocorrect */
  autocorrect: boolean;
  
  /** Input autocapitalize */
  autocapitalize: boolean;
  
  /** Input spellcheck */
  spellcheck: boolean;
  
  /** Input cursor position */
  cursorPosition: number;
  
  /** Input selection start */
  selectionStart: number;
  
  /** Input selection end */
  selectionEnd: number;
  
  // ============================================================================
  // INPUT METHODS
  // ============================================================================
  
  /** Set input value */
  setValue(value: string): this;
  
  /** Set input placeholder */
  setPlaceholder(placeholder: string): this;
  
  /** Set input type */
  setInputType(type: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search'): this;
  
  /** Set input size */
  setInputSize(size: 'small' | 'medium' | 'large'): this;
  
  /** Set input variant */
  setInputVariant(variant: 'outlined' | 'filled' | 'underlined'): this;
  
  /** Set maximum input length */
  setMaxLength(maxLength: number): this;
  
  /** Set minimum input length */
  setMinLength(minLength: number): this;
  
  /** Set input pattern */
  setPattern(pattern: string): this;
  
  /** Set input required */
  setRequired(required: boolean): this;
  
  /** Set input readonly */
  setReadonly(readonly: boolean): this;
  
  /** Set input disabled */
  setDisabled(disabled: boolean): this;
  
  /** Set input multiline */
  setMultiline(multiline: boolean, rows?: number): this;
  
  /** Set input validation state */
  setValidationState(state: 'valid' | 'invalid' | 'pending', message?: string): this;
  
  /** Set input autocomplete */
  setAutocomplete(autocomplete: boolean): this;
  
  /** Set input autocorrect */
  setAutocorrect(autocorrect: boolean): this;
  
  /** Set input autocapitalize */
  setAutocapitalize(autocapitalize: boolean): this;
  
  /** Set input spellcheck */
  setSpellcheck(spellcheck: boolean): this;
  
  /** Set cursor position */
  setCursorPosition(position: number): this;
  
  /** Set text selection */
  setSelection(start: number, end: number): this;
  
  /** Get input value */
  getValue(): string;
  
  /** Get input placeholder */
  getPlaceholder(): string;
  
  /** Get input type */
  getInputType(): string;
  
  /** Get input size */
  getInputSize(): string;
  
  /** Get input variant */
  getInputVariant(): string;
  
  /** Get maximum input length */
  getMaxLength(): number;
  
  /** Get minimum input length */
  getMinLength(): number;
  
  /** Get input pattern */
  getPattern(): string;
  
  /** Check if input is required */
  isRequired(): boolean;
  
  /** Check if input is readonly */
  isReadonly(): boolean;
  
  /** Check if input is disabled */
  isDisabled(): boolean;
  
  /** Check if input is multiline */
  isMultiline(): boolean;
  
  /** Get input validation state */
  getValidationState(): string;
  
  /** Get input validation message */
  getValidationMessage(): string;
  
  /** Get cursor position */
  getCursorPosition(): number;
  
  /** Get text selection */
  getSelection(): { start: number; end: number };
  
  /** Get selected text */
  getSelectedText(): string;
  
  /** Clear input value */
  clear(): this;
  
  /** Reset input to default value */
  reset(): this;
  
  /** Focus input */
  focus(): this;
  
  /** Blur input */
  blur(): this;
  
  /** Select all text */
  selectAll(): this;
  
  /** Insert text at cursor position */
  insertText(text: string): this;
  
  /** Delete text at cursor position */
  deleteText(length: number): this;
  
  /** Replace selected text */
  replaceSelectedText(text: string): this;
  
  /** Validate input value */
  validate(): boolean;
  
  /** Check if input is valid */
  isValid(): boolean;
  
  /** Check if input is empty */
  isEmpty(): boolean;
  
  /** Check if input is full */
  isFull(): boolean;
}
