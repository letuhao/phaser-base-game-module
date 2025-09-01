/**
 * Bitmap Text Interface
 * 
 * Defines bitmap text-specific functionality for bitmap-based text rendering.
 * Bitmap text uses texture atlases for character rendering.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Bitmap text align modes
 */
export enum BitmapTextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  JUSTIFY = 'justify'
}

/**
 * Bitmap text blend modes
 */
export enum BitmapTextBlendMode {
  NORMAL = 'normal',
  ADD = 'add',
  MULTIPLY = 'multiply',
  SCREEN = 'screen',
  OVERLAY = 'overlay',
  DARKEN = 'darken',
  LIGHTEN = 'lighten',
  COLOR_DODGE = 'color-dodge',
  COLOR_BURN = 'color-burn',
  HARD_LIGHT = 'hard-light',
  SOFT_LIGHT = 'soft-light',
  DIFFERENCE = 'difference',
  EXCLUSION = 'exclusion',
  HUE = 'hue',
  SATURATION = 'saturation',
  COLOR = 'color',
  LUMINOSITY = 'luminosity'
}

/**
 * Bitmap text word wrap modes
 */
export enum BitmapTextWordWrap {
  NONE = 'none',
  WORD = 'word',
  CHAR = 'char'
}

/**
 * Interface for bitmap text game objects
 * 
 * Extends IGameObject with bitmap text-specific functionality for
 * bitmap-based text rendering and display.
 * 
 * Example implementation:
 * ```typescript
 * class MyBitmapText extends Phaser.GameObjects.BitmapText implements IBitmapText {
 *   readonly gameObjectType = GameObjectType.BitmapText;
 *   // Implementation
 * }
 * ```
 */
export interface IBitmapText extends IGameObject {
  // ============================================================================
  // BITMAP TEXT IDENTITY
  // ============================================================================
  
  /** The specific type of game object (always 'bitmapText') */
  readonly gameObjectType: GameObjectType.BITMAP_TEXT;
  
  // ============================================================================
  // BITMAP TEXT PROPERTIES
  // ============================================================================
  
  /** The font key used by this bitmap text */
  fontKey: string;
  
  /** The text content */
  textContent: string;
  
  /** The font size */
  fontSize: number;
  
  /** The font atlas */
  readonly fontAtlas: Phaser.Textures.Texture;
  
  /** The font data */
  readonly fontData: any; // Phaser.GameObjects.BitmapText.BitmapFontData
  
  /** Bitmap text width */
  bitmapTextWidth: number;
  
  /** Bitmap text height */
  bitmapTextHeight: number;
  
  /** Bitmap text display width */
  bitmapTextDisplayWidth: number;
  
  /** Bitmap text display height */
  bitmapTextDisplayHeight: number;
  
  /** Bitmap text align */
  bitmapTextAlign: BitmapTextAlign;
  
  /** Bitmap text letter spacing */
  bitmapTextLetterSpacing: number;
  
  /** Bitmap text line spacing */
  bitmapTextLineSpacing: number;
  
  /** Bitmap text max width */
  bitmapTextMaxWidth: number;
  
  /** Bitmap text word wrap */
  bitmapTextWordWrap: BitmapTextWordWrap;
  
  /** Bitmap text word wrap width */
  bitmapTextWordWrapWidth: number;
  
  /** Bitmap text tint color */
  bitmapTextTint: number;
  
  /** Bitmap text tint fill mode */
  bitmapTextTintFill: boolean;
  
  /** Bitmap text blend mode */
  bitmapTextBlendMode: BitmapTextBlendMode;
  
  /** Bitmap text mask */
  bitmapTextMask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null;
  
  /** Bitmap text pipeline */
  bitmapTextPipeline: Phaser.Renderer.WebGL.WebGLPipeline;
  
  /** Bitmap text post pipeline */
  bitmapTextPostPipeline: Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[];
  
  // ============================================================================
  // BITMAP TEXT METHODS
  // ============================================================================
  
  /** Set bitmap text font */
  setBitmapTextFont(font: string, size?: number): this;
  
  /** Set bitmap text content */
  setBitmapTextContent(text: string): this;
  
  /** Set bitmap text size */
  setBitmapTextSize(size: number): this;
  
  /** Set bitmap text align */
  setBitmapTextAlign(align: BitmapTextAlign): this;
  
  /** Set bitmap text letter spacing */
  setBitmapTextLetterSpacing(spacing: number): this;
  
  /** Set bitmap text line spacing */
  setBitmapTextLineSpacing(spacing: number): this;
  
  /** Set bitmap text max width */
  setBitmapTextMaxWidth(width: number): this;
  
  /** Set bitmap text word wrap */
  setBitmapTextWordWrap(wrap: BitmapTextWordWrap, width?: number): this;
  
  /** Set bitmap text tint */
  setBitmapTextTint(tint: number): this;
  
  /** Set bitmap text tint fill */
  setBitmapTextTintFill(tint: number): this;
  
  /** Clear bitmap text tint */
  clearBitmapTextTint(): this;
  
  /** Set bitmap text blend mode */
  setBitmapTextBlendMode(blendMode: BitmapTextBlendMode): this;
  
  /** Set bitmap text mask */
  setBitmapTextMask(mask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null): this;
  
  /** Clear bitmap text mask */
  clearBitmapTextMask(): this;
  
  /** Set bitmap text pipeline */
  setBitmapTextPipeline(pipeline: string | Phaser.Renderer.WebGL.WebGLPipeline): this;
  
  /** Add bitmap text post pipeline */
  addBitmapTextPostPipeline(pipeline: string | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline): this;
  
  /** Remove bitmap text post pipeline */
  removeBitmapTextPostPipeline(pipeline: string | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline): this;
  
  /** Get bitmap text font key */
  getBitmapTextFontKey(): string;
  
  /** Get bitmap text content */
  getBitmapTextContent(): string;
  
  /** Get bitmap text size */
  getBitmapTextSize(): number;
  
  /** Get bitmap text font atlas */
  getBitmapTextFontAtlas(): Phaser.Textures.Texture;
  
  /** Get bitmap text font data */
  getBitmapTextFontData(): any; // Phaser.GameObjects.BitmapText.BitmapFontData
  
  /** Get bitmap text width */
  getBitmapTextWidth(): number;
  
  /** Get bitmap text height */
  getBitmapTextHeight(): number;
  
  /** Get bitmap text display width */
  getBitmapTextDisplayWidth(): number;
  
  /** Get bitmap text display height */
  getBitmapTextDisplayHeight(): number;
  
  /** Get bitmap text align */
  getBitmapTextAlign(): BitmapTextAlign;
  
  /** Get bitmap text letter spacing */
  getBitmapTextLetterSpacing(): number;
  
  /** Get bitmap text line spacing */
  getBitmapTextLineSpacing(): number;
  
  /** Get bitmap text max width */
  getBitmapTextMaxWidth(): number;
  
  /** Get bitmap text word wrap */
  getBitmapTextWordWrap(): BitmapTextWordWrap;
  
  /** Get bitmap text word wrap width */
  getBitmapTextWordWrapWidth(): number;
  
  /** Get bitmap text tint */
  getBitmapTextTint(): number;
  
  /** Check if bitmap text has tint */
  hasBitmapTextTint(): boolean;
  
  /** Get bitmap text blend mode */
  getBitmapTextBlendMode(): BitmapTextBlendMode;
  
  /** Get bitmap text mask */
  getBitmapTextMask(): Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null;
  
  /** Check if bitmap text has mask */
  hasBitmapTextMask(): boolean;
  
  /** Get bitmap text pipeline */
  getBitmapTextPipeline(): Phaser.Renderer.WebGL.WebGLPipeline;
  
  /** Get bitmap text post pipelines */
  getBitmapTextPostPipelines(): Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[];
  
  /** Get bitmap text bounds */
  getBitmapTextBounds(): Phaser.Geom.Rectangle;
  
  /** Get bitmap text local bounds */
  getBitmapTextLocalBounds(): Phaser.Geom.Rectangle;
  
  /** Check if point is in bitmap text bounds */
  isPointInBitmapTextBounds(x: number, y: number): boolean;
  
  /** Get bitmap text center */
  getBitmapTextCenter(): Phaser.Geom.Point;
  
  /** Get bitmap text top left */
  getBitmapTextTopLeft(): Phaser.Geom.Point;
  
  /** Get bitmap text top right */
  getBitmapTextTopRight(): Phaser.Geom.Point;
  
  /** Get bitmap text bottom left */
  getBitmapTextBottomLeft(): Phaser.Geom.Point;
  
  /** Get bitmap text bottom right */
  getBitmapTextBottomRight(): Phaser.Geom.Point;
  
  /** Get bitmap text area */
  getBitmapTextArea(): number;
  
  /** Get bitmap text perimeter */
  getBitmapTextPerimeter(): number;
  
  /** Get bitmap text character count */
  getBitmapTextCharacterCount(): number;
  
  /** Get bitmap text line count */
  getBitmapTextLineCount(): number;
  
  /** Get bitmap text character at position */
  getBitmapTextCharacterAt(x: number, y: number): string | null;
  
  /** Get bitmap text character bounds */
  getBitmapTextCharacterBounds(index: number): Phaser.Geom.Rectangle | null;
  
  /** Get bitmap text line bounds */
  getBitmapTextLineBounds(lineIndex: number): Phaser.Geom.Rectangle | null;
  
  /** Get bitmap text word bounds */
  getBitmapTextWordBounds(wordIndex: number): Phaser.Geom.Rectangle | null;
  
  /** Get bitmap text character position */
  getBitmapTextCharacterPosition(index: number): Phaser.Geom.Point | null;
  
  /** Get bitmap text line position */
  getBitmapTextLinePosition(lineIndex: number): Phaser.Geom.Point | null;
  
  /** Get bitmap text word position */
  getBitmapTextWordPosition(wordIndex: number): Phaser.Geom.Point | null;
  
  /** Get bitmap text character size */
  getBitmapTextCharacterSize(index: number): Phaser.Geom.Point | null;
  
  /** Get bitmap text line size */
  getBitmapTextLineSize(lineIndex: number): Phaser.Geom.Point | null;
  
  /** Get bitmap text word size */
  getBitmapTextWordSize(wordIndex: number): Phaser.Geom.Point | null;
  
  /** Get bitmap text character tint */
  getBitmapTextCharacterTint(index: number): number | null;
  
  /** Set bitmap text character tint */
  setBitmapTextCharacterTint(index: number, tint: number): this;
  
  /** Get bitmap text line tint */
  getBitmapTextLineTint(lineIndex: number): number | null;
  
  /** Set bitmap text line tint */
  setBitmapTextLineTint(lineIndex: number, tint: number): this;
  
  /** Get bitmap text word tint */
  getBitmapTextWordTint(wordIndex: number): number | null;
  
  /** Set bitmap text word tint */
  setBitmapTextWordTint(wordIndex: number, tint: number): this;
  
  /** Get bitmap text character alpha */
  getBitmapTextCharacterAlpha(index: number): number | null;
  
  /** Set bitmap text character alpha */
  setBitmapTextCharacterAlpha(index: number, alpha: number): this;
  
  /** Get bitmap text line alpha */
  getBitmapTextLineAlpha(lineIndex: number): number | null;
  
  /** Set bitmap text line alpha */
  setBitmapTextLineAlpha(lineIndex: number, alpha: number): this;
  
  /** Get bitmap text word alpha */
  getBitmapTextWordAlpha(wordIndex: number): number | null;
  
  /** Set bitmap text word alpha */
  setBitmapTextWordAlpha(wordIndex: number, alpha: number): this;
}
