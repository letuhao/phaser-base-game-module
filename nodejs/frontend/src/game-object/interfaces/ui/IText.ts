/**
 * Text UI Interface
 * 
 * Defines text-specific functionality for UI game objects.
 */

import * as Phaser from 'phaser';
import type { IUIObject } from './IUIObject';
import { UIType } from '../../enums';
import { TextAlign as TextAlignment, VerticalAlignment } from '../../enums/LayoutSystemImports';

/**
 * Interface for text UI game objects
 * 
 * Extends IUIObject with text-specific functionality for displaying text,
 * text formatting, and text interactions.
 * 
 * Example implementation:
 * ```typescript
 * class MyText extends Phaser.GameObjects.Text implements IText {
 *   readonly gameObjectType = 'ui' as const;
 *   readonly uiType = 'text' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IText extends IUIObject {
  // ============================================================================
  // TEXT IDENTITY
  // ============================================================================
  
  /** The specific type of UI element (always 'text') */
  readonly uiType: UIType.TEXT;
  
  // ============================================================================
  // TEXT PROPERTIES
  // ============================================================================
  
  /** Text content */
  text: string;
  
  /** Text style */
  textStyle: Phaser.Types.GameObjects.Text.TextStyle;
  
  /** Font family */
  fontFamily: string;
  
  /** Font size */
  fontSize: number;
  
  /** Font weight */
  fontWeight: string;
  
  /** Font style */
  fontStyle: string;
  
  /** Text color */
  textColor: string;
  
  /** Text alignment */
  textAlign: TextAlignment;
  
  /** Vertical alignment */
  verticalAlign: VerticalAlignment;
  
  /** Line height */
  lineHeight: number;
  
  /** Letter spacing */
  letterSpacing: number;
  
  /** Word wrap */
  wordWrap: boolean;
  
  /** Word wrap width */
  wordWrapWidth: number;
  
  /** Text stroke */
  textStroke: string;
  
  /** Text stroke thickness */
  textStrokeThickness: number;
  
  /** Text shadow */
  textShadow: boolean;
  
  /** Text shadow color */
  textShadowColor: string;
  
  /** Text shadow offset X */
  textShadowOffsetX: number;
  
  /** Text shadow offset Y */
  textShadowOffsetY: number;
  
  /** Text shadow blur */
  textShadowBlur: number;
  
  /** Whether text is selectable */
  selectable: boolean;
  
  /** Whether text is editable */
  editable: boolean;
  
  /** Maximum text length */
  maxLength: number;
  
  /** Text placeholder */
  placeholder: string;
  
  // ============================================================================
  // TEXT METHODS
  // ============================================================================
  
  /** Set text content */
  setText(text: string): this;
  
  /** Set text style */
  setTextStyle(style: Phaser.Types.GameObjects.Text.TextStyle): this;
  
  /** Set font family */
  setFontFamily(fontFamily: string): this;
  
  /** Set font size */
  setFontSize(fontSize: number): this;
  
  /** Set font weight */
  setFontWeight(fontWeight: string): this;
  
  /** Set font style */
  setFontStyle(fontStyle: string): this;
  
  /** Set text color */
  setTextColor(color: string): this;
  
  /** Set text alignment */
  setTextAlign(align: TextAlignment): this;
  
  /** Set vertical alignment */
  setVerticalAlign(align: VerticalAlignment): this;
  
  /** Set line height */
  setLineHeight(lineHeight: number): this;
  
  /** Set letter spacing */
  setLetterSpacing(spacing: number): this;
  
  /** Set word wrap */
  setWordWrap(wrap: boolean, width?: number): this;
  
  /** Set text stroke */
  setTextStroke(stroke: string, thickness: number): this;
  
  /** Set text shadow */
  setTextShadow(shadow: boolean, color?: string, offsetX?: number, offsetY?: number, blur?: number): this;
  
  /** Set text selectable */
  setSelectable(selectable: boolean): this;
  
  /** Set text editable */
  setEditable(editable: boolean): this;
  
  /** Set maximum text length */
  setMaxLength(maxLength: number): this;
  
  /** Set text placeholder */
  setPlaceholder(placeholder: string): this;
  
  /** Get text content */
  getText(): string;
  
  /** Get text bounds */
  getTextBounds(): Phaser.Geom.Rectangle;
  
  /** Get text metrics */
  getTextMetrics(): Phaser.Types.GameObjects.Text.TextMetrics;
  
  /** Check if text is empty */
  isEmpty(): boolean;
  
  /** Check if text is overflowing */
  isOverflowing(): boolean;
  
  /** Get selected text */
  getSelectedText(): string;
  
  /** Set selected text */
  setSelectedText(start: number, end: number): this;
  
  /** Clear text selection */
  clearSelection(): this;
  
  /** Insert text at position */
  insertText(text: string, position: number): this;
  
  /** Delete text at position */
  deleteText(start: number, end: number): this;
  
  /** Replace text */
  replaceText(start: number, end: number, text: string): this;
}
