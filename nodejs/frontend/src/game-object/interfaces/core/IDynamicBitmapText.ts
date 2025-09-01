/**
 * Dynamic Bitmap Text Interface
 * 
 * Defines dynamic bitmap text-specific functionality for dynamic bitmap-based text rendering.
 * Dynamic bitmap text allows for runtime text changes and advanced formatting.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * Dynamic bitmap text align modes
 */
export enum DynamicBitmapTextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  JUSTIFY = 'justify'
}

/**
 * Dynamic bitmap text blend modes
 */
export enum DynamicBitmapTextBlendMode {
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
 * Dynamic bitmap text word wrap modes
 */
export enum DynamicBitmapTextWordWrap {
  NONE = 'none',
  WORD = 'word',
  CHAR = 'char'
}

/**
 * Dynamic bitmap text animation modes
 */
export enum DynamicBitmapTextAnimationMode {
  NONE = 'none',
  TYPEWRITER = 'typewriter',
  FADE_IN = 'fade-in',
  SLIDE_IN = 'slide-in',
  BOUNCE_IN = 'bounce-in',
  ZOOM_IN = 'zoom-in',
  CUSTOM = 'custom'
}

/**
 * Interface for dynamic bitmap text game objects
 * 
 * Extends IGameObject with dynamic bitmap text-specific functionality for
 * dynamic bitmap-based text rendering with runtime changes and animations.
 * 
 * Example implementation:
 * ```typescript
 * class MyDynamicBitmapText extends Phaser.GameObjects.DynamicBitmapText implements IDynamicBitmapText {
 *   readonly gameObjectType = GameObjectType.DynamicBitmapText;
 *   // Implementation
 * }
 * ```
 */
export interface IDynamicBitmapText extends IGameObject {
  // ============================================================================
  // DYNAMIC BITMAP TEXT IDENTITY
  // ============================================================================
  
  /** The specific type of game object (always 'dynamicBitmapText') */
  readonly gameObjectType: GameObjectType.DYNAMIC_BITMAP_TEXT;
  
  // ============================================================================
  // DYNAMIC BITMAP TEXT PROPERTIES
  // ============================================================================
  
  /** The font key used by this dynamic bitmap text */
  dynamicFontKey: string;
  
  /** The text content */
  dynamicTextContent: string;
  
  /** The font size */
  dynamicFontSize: number;
  
  /** The font atlas */
  readonly dynamicFontAtlas: Phaser.Textures.Texture;
  
  /** The font data */
  readonly dynamicFontData: any; // Phaser.GameObjects.BitmapText.BitmapFontData
  
  /** Dynamic bitmap text width */
  dynamicBitmapTextWidth: number;
  
  /** Dynamic bitmap text height */
  dynamicBitmapTextHeight: number;
  
  /** Dynamic bitmap text display width */
  dynamicBitmapTextDisplayWidth: number;
  
  /** Dynamic bitmap text display height */
  dynamicBitmapTextDisplayHeight: number;
  
  /** Dynamic bitmap text align */
  dynamicBitmapTextAlign: DynamicBitmapTextAlign;
  
  /** Dynamic bitmap text letter spacing */
  dynamicBitmapTextLetterSpacing: number;
  
  /** Dynamic bitmap text line spacing */
  dynamicBitmapTextLineSpacing: number;
  
  /** Dynamic bitmap text max width */
  dynamicBitmapTextMaxWidth: number;
  
  /** Dynamic bitmap text word wrap */
  dynamicBitmapTextWordWrap: DynamicBitmapTextWordWrap;
  
  /** Dynamic bitmap text word wrap width */
  dynamicBitmapTextWordWrapWidth: number;
  
  /** Dynamic bitmap text tint color */
  dynamicBitmapTextTint: number;
  
  /** Dynamic bitmap text tint fill mode */
  dynamicBitmapTextTintFill: boolean;
  
  /** Dynamic bitmap text blend mode */
  dynamicBitmapTextBlendMode: DynamicBitmapTextBlendMode;
  
  /** Dynamic bitmap text mask */
  dynamicBitmapTextMask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null;
  
  /** Dynamic bitmap text pipeline */
  dynamicBitmapTextPipeline: Phaser.Renderer.WebGL.WebGLPipeline;
  
  /** Dynamic bitmap text post pipeline */
  dynamicBitmapTextPostPipeline: Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[];
  
  /** Dynamic bitmap text animation mode */
  dynamicBitmapTextAnimationMode: DynamicBitmapTextAnimationMode;
  
  /** Dynamic bitmap text animation speed */
  dynamicBitmapTextAnimationSpeed: number;
  
  /** Dynamic bitmap text animation delay */
  dynamicBitmapTextAnimationDelay: number;
  
  /** Dynamic bitmap text animation duration */
  dynamicBitmapTextAnimationDuration: number;
  
  /** Dynamic bitmap text animation easing */
  dynamicBitmapTextAnimationEasing: string;
  
  /** Dynamic bitmap text animation loop */
  dynamicBitmapTextAnimationLoop: boolean;
  
  /** Dynamic bitmap text animation repeat */
  dynamicBitmapTextAnimationRepeat: number;
  
  /** Dynamic bitmap text animation yoyo */
  dynamicBitmapTextAnimationYoyo: boolean;
  
  /** Dynamic bitmap text animation paused */
  dynamicBitmapTextAnimationPaused: boolean;
  
  /** Dynamic bitmap text animation progress */
  dynamicBitmapTextAnimationProgress: number;
  
  // ============================================================================
  // DYNAMIC BITMAP TEXT METHODS
  // ============================================================================
  
  /** Set dynamic bitmap text font */
  setDynamicBitmapTextFont(font: string, size?: number): this;
  
  /** Set dynamic bitmap text content */
  setDynamicBitmapTextContent(text: string): this;
  
  /** Set dynamic bitmap text size */
  setDynamicBitmapTextSize(size: number): this;
  
  /** Set dynamic bitmap text align */
  setDynamicBitmapTextAlign(align: DynamicBitmapTextAlign): this;
  
  /** Set dynamic bitmap text letter spacing */
  setDynamicBitmapTextLetterSpacing(spacing: number): this;
  
  /** Set dynamic bitmap text line spacing */
  setDynamicBitmapTextLineSpacing(spacing: number): this;
  
  /** Set dynamic bitmap text max width */
  setDynamicBitmapTextMaxWidth(width: number): this;
  
  /** Set dynamic bitmap text word wrap */
  setDynamicBitmapTextWordWrap(wrap: DynamicBitmapTextWordWrap, width?: number): this;
  
  /** Set dynamic bitmap text tint */
  setDynamicBitmapTextTint(tint: number): this;
  
  /** Set dynamic bitmap text tint fill */
  setDynamicBitmapTextTintFill(tint: number): this;
  
  /** Clear dynamic bitmap text tint */
  clearDynamicBitmapTextTint(): this;
  
  /** Set dynamic bitmap text blend mode */
  setDynamicBitmapTextBlendMode(blendMode: DynamicBitmapTextBlendMode): this;
  
  /** Set dynamic bitmap text mask */
  setDynamicBitmapTextMask(mask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null): this;
  
  /** Clear dynamic bitmap text mask */
  clearDynamicBitmapTextMask(): this;
  
  /** Set dynamic bitmap text pipeline */
  setDynamicBitmapTextPipeline(pipeline: string | Phaser.Renderer.WebGL.WebGLPipeline): this;
  
  /** Add dynamic bitmap text post pipeline */
  addDynamicBitmapTextPostPipeline(pipeline: string | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline): this;
  
  /** Remove dynamic bitmap text post pipeline */
  removeDynamicBitmapTextPostPipeline(pipeline: string | Phaser.Renderer.WebGL.Pipelines.PostFXPipeline): this;
  
  /** Set dynamic bitmap text animation mode */
  setDynamicBitmapTextAnimationMode(mode: DynamicBitmapTextAnimationMode): this;
  
  /** Set dynamic bitmap text animation speed */
  setDynamicBitmapTextAnimationSpeed(speed: number): this;
  
  /** Set dynamic bitmap text animation delay */
  setDynamicBitmapTextAnimationDelay(delay: number): this;
  
  /** Set dynamic bitmap text animation duration */
  setDynamicBitmapTextAnimationDuration(duration: number): this;
  
  /** Set dynamic bitmap text animation easing */
  setDynamicBitmapTextAnimationEasing(easing: string): this;
  
  /** Set dynamic bitmap text animation loop */
  setDynamicBitmapTextAnimationLoop(loop: boolean): this;
  
  /** Set dynamic bitmap text animation repeat */
  setDynamicBitmapTextAnimationRepeat(repeat: number): this;
  
  /** Set dynamic bitmap text animation yoyo */
  setDynamicBitmapTextAnimationYoyo(yoyo: boolean): this;
  
  /** Set dynamic bitmap text animation paused */
  setDynamicBitmapTextAnimationPaused(paused: boolean): this;
  
  /** Set dynamic bitmap text animation progress */
  setDynamicBitmapTextAnimationProgress(progress: number): this;
  
  /** Get dynamic bitmap text font key */
  getDynamicBitmapTextFontKey(): string;
  
  /** Get dynamic bitmap text content */
  getDynamicBitmapTextContent(): string;
  
  /** Get dynamic bitmap text size */
  getDynamicBitmapTextSize(): number;
  
  /** Get dynamic bitmap text font atlas */
  getDynamicBitmapTextFontAtlas(): Phaser.Textures.Texture;
  
  /** Get dynamic bitmap text font data */
  getDynamicBitmapTextFontData(): any; // Phaser.GameObjects.BitmapText.BitmapFontData
  
  /** Get dynamic bitmap text width */
  getDynamicBitmapTextWidth(): number;
  
  /** Get dynamic bitmap text height */
  getDynamicBitmapTextHeight(): number;
  
  /** Get dynamic bitmap text display width */
  getDynamicBitmapTextDisplayWidth(): number;
  
  /** Get dynamic bitmap text display height */
  getDynamicBitmapTextDisplayHeight(): number;
  
  /** Get dynamic bitmap text align */
  getDynamicBitmapTextAlign(): DynamicBitmapTextAlign;
  
  /** Get dynamic bitmap text letter spacing */
  getDynamicBitmapTextLetterSpacing(): number;
  
  /** Get dynamic bitmap text line spacing */
  getDynamicBitmapTextLineSpacing(): number;
  
  /** Get dynamic bitmap text max width */
  getDynamicBitmapTextMaxWidth(): number;
  
  /** Get dynamic bitmap text word wrap */
  getDynamicBitmapTextWordWrap(): DynamicBitmapTextWordWrap;
  
  /** Get dynamic bitmap text word wrap width */
  getDynamicBitmapTextWordWrapWidth(): number;
  
  /** Get dynamic bitmap text tint */
  getDynamicBitmapTextTint(): number;
  
  /** Check if dynamic bitmap text has tint */
  hasDynamicBitmapTextTint(): boolean;
  
  /** Get dynamic bitmap text blend mode */
  getDynamicBitmapTextBlendMode(): DynamicBitmapTextBlendMode;
  
  /** Get dynamic bitmap text mask */
  getDynamicBitmapTextMask(): Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null;
  
  /** Check if dynamic bitmap text has mask */
  hasDynamicBitmapTextMask(): boolean;
  
  /** Get dynamic bitmap text pipeline */
  getDynamicBitmapTextPipeline(): Phaser.Renderer.WebGL.WebGLPipeline;
  
  /** Get dynamic bitmap text post pipelines */
  getDynamicBitmapTextPostPipelines(): Phaser.Renderer.WebGL.Pipelines.PostFXPipeline[];
  
  /** Get dynamic bitmap text animation mode */
  getDynamicBitmapTextAnimationMode(): DynamicBitmapTextAnimationMode;
  
  /** Get dynamic bitmap text animation speed */
  getDynamicBitmapTextAnimationSpeed(): number;
  
  /** Get dynamic bitmap text animation delay */
  getDynamicBitmapTextAnimationDelay(): number;
  
  /** Get dynamic bitmap text animation duration */
  getDynamicBitmapTextAnimationDuration(): number;
  
  /** Get dynamic bitmap text animation easing */
  getDynamicBitmapTextAnimationEasing(): string;
  
  /** Get dynamic bitmap text animation loop */
  getDynamicBitmapTextAnimationLoop(): boolean;
  
  /** Get dynamic bitmap text animation repeat */
  getDynamicBitmapTextAnimationRepeat(): number;
  
  /** Get dynamic bitmap text animation yoyo */
  getDynamicBitmapTextAnimationYoyo(): boolean;
  
  /** Get dynamic bitmap text animation paused */
  getDynamicBitmapTextAnimationPaused(): boolean;
  
  /** Get dynamic bitmap text animation progress */
  getDynamicBitmapTextAnimationProgress(): number;
  
  /** Get dynamic bitmap text bounds */
  getDynamicBitmapTextBounds(): Phaser.Geom.Rectangle;
  
  /** Get dynamic bitmap text local bounds */
  getDynamicBitmapTextLocalBounds(): Phaser.Geom.Rectangle;
  
  /** Check if point is in dynamic bitmap text bounds */
  isPointInDynamicBitmapTextBounds(x: number, y: number): boolean;
  
  /** Get dynamic bitmap text center */
  getDynamicBitmapTextCenter(): Phaser.Geom.Point;
  
  /** Get dynamic bitmap text top left */
  getDynamicBitmapTextTopLeft(): Phaser.Geom.Point;
  
  /** Get dynamic bitmap text top right */
  getDynamicBitmapTextTopRight(): Phaser.Geom.Point;
  
  /** Get dynamic bitmap text bottom left */
  getDynamicBitmapTextBottomLeft(): Phaser.Geom.Point;
  
  /** Get dynamic bitmap text bottom right */
  getDynamicBitmapTextBottomRight(): Phaser.Geom.Point;
  
  /** Get dynamic bitmap text area */
  getDynamicBitmapTextArea(): number;
  
  /** Get dynamic bitmap text perimeter */
  getDynamicBitmapTextPerimeter(): number;
  
  /** Get dynamic bitmap text character count */
  getDynamicBitmapTextCharacterCount(): number;
  
  /** Get dynamic bitmap text line count */
  getDynamicBitmapTextLineCount(): number;
  
  /** Get dynamic bitmap text character at position */
  getDynamicBitmapTextCharacterAt(x: number, y: number): string | null;
  
  /** Get dynamic bitmap text character bounds */
  getDynamicBitmapTextCharacterBounds(index: number): Phaser.Geom.Rectangle | null;
  
  /** Get dynamic bitmap text line bounds */
  getDynamicBitmapTextLineBounds(lineIndex: number): Phaser.Geom.Rectangle | null;
  
  /** Get dynamic bitmap text word bounds */
  getDynamicBitmapTextWordBounds(wordIndex: number): Phaser.Geom.Rectangle | null;
  
  /** Get dynamic bitmap text character position */
  getDynamicBitmapTextCharacterPosition(index: number): Phaser.Geom.Point | null;
  
  /** Get dynamic bitmap text line position */
  getDynamicBitmapTextLinePosition(lineIndex: number): Phaser.Geom.Point | null;
  
  /** Get dynamic bitmap text word position */
  getDynamicBitmapTextWordPosition(wordIndex: number): Phaser.Geom.Point | null;
  
  /** Get dynamic bitmap text character size */
  getDynamicBitmapTextCharacterSize(index: number): Phaser.Geom.Point | null;
  
  /** Get dynamic bitmap text line size */
  getDynamicBitmapTextLineSize(lineIndex: number): Phaser.Geom.Point | null;
  
  /** Get dynamic bitmap text word size */
  getDynamicBitmapTextWordSize(wordIndex: number): Phaser.Geom.Point | null;
  
  /** Get dynamic bitmap text character tint */
  getDynamicBitmapTextCharacterTint(index: number): number | null;
  
  /** Set dynamic bitmap text character tint */
  setDynamicBitmapTextCharacterTint(index: number, tint: number): this;
  
  /** Get dynamic bitmap text line tint */
  getDynamicBitmapTextLineTint(lineIndex: number): number | null;
  
  /** Set dynamic bitmap text line tint */
  setDynamicBitmapTextLineTint(lineIndex: number, tint: number): this;
  
  /** Get dynamic bitmap text word tint */
  getDynamicBitmapTextWordTint(wordIndex: number): number | null;
  
  /** Set dynamic bitmap text word tint */
  setDynamicBitmapTextWordTint(wordIndex: number, tint: number): this;
  
  /** Get dynamic bitmap text character alpha */
  getDynamicBitmapTextCharacterAlpha(index: number): number | null;
  
  /** Set dynamic bitmap text character alpha */
  setDynamicBitmapTextCharacterAlpha(index: number, alpha: number): this;
  
  /** Get dynamic bitmap text line alpha */
  getDynamicBitmapTextLineAlpha(lineIndex: number): number | null;
  
  /** Set dynamic bitmap text line alpha */
  setDynamicBitmapTextLineAlpha(lineIndex: number, alpha: number): this;
  
  /** Get dynamic bitmap text word alpha */
  getDynamicBitmapTextWordAlpha(wordIndex: number): number | null;
  
  /** Set dynamic bitmap text word alpha */
  setDynamicBitmapTextWordAlpha(wordIndex: number, alpha: number): this;
  
  /** Start dynamic bitmap text animation */
  startDynamicBitmapTextAnimation(): this;
  
  /** Stop dynamic bitmap text animation */
  stopDynamicBitmapTextAnimation(): this;
  
  /** Pause dynamic bitmap text animation */
  pauseDynamicBitmapTextAnimation(): this;
  
  /** Resume dynamic bitmap text animation */
  resumeDynamicBitmapTextAnimation(): this;
  
  /** Restart dynamic bitmap text animation */
  restartDynamicBitmapTextAnimation(): this;
  
  /** Check if dynamic bitmap text animation is playing */
  isDynamicBitmapTextAnimationPlaying(): boolean;
  
  /** Check if dynamic bitmap text animation is paused */
  isDynamicBitmapTextAnimationPaused(): boolean;
  
  /** Check if dynamic bitmap text animation is stopped */
  isDynamicBitmapTextAnimationStopped(): boolean;
  
  /** Get dynamic bitmap text animation time */
  getDynamicBitmapTextAnimationTime(): number;
  
  /** Get dynamic bitmap text animation remaining time */
  getDynamicBitmapTextAnimationRemainingTime(): number;
  
  /** Get dynamic bitmap text animation progress */
  getDynamicBitmapTextAnimationProgress(): number;
  
  /** Set dynamic bitmap text animation progress */
  setDynamicBitmapTextAnimationProgress(progress: number): this;
  
  /** Get dynamic bitmap text animation duration */
  getDynamicBitmapTextAnimationDuration(): number;
  
  /** Set dynamic bitmap text animation duration */
  setDynamicBitmapTextAnimationDuration(duration: number): this;
  
  /** Get dynamic bitmap text animation speed */
  getDynamicBitmapTextAnimationSpeed(): number;
  
  /** Set dynamic bitmap text animation speed */
  setDynamicBitmapTextAnimationSpeed(speed: number): this;
  
  /** Get dynamic bitmap text animation delay */
  getDynamicBitmapTextAnimationDelay(): number;
  
  /** Set dynamic bitmap text animation delay */
  setDynamicBitmapTextAnimationDelay(delay: number): this;
  
  /** Get dynamic bitmap text animation easing */
  getDynamicBitmapTextAnimationEasing(): string;
  
  /** Set dynamic bitmap text animation easing */
  setDynamicBitmapTextAnimationEasing(easing: string): this;
  
  /** Get dynamic bitmap text animation loop */
  getDynamicBitmapTextAnimationLoop(): boolean;
  
  /** Set dynamic bitmap text animation loop */
  setDynamicBitmapTextAnimationLoop(loop: boolean): this;
  
  /** Get dynamic bitmap text animation repeat */
  getDynamicBitmapTextAnimationRepeat(): number;
  
  /** Set dynamic bitmap text animation repeat */
  setDynamicBitmapTextAnimationRepeat(repeat: number): this;
  
  /** Get dynamic bitmap text animation yoyo */
  getDynamicBitmapTextAnimationYoyo(): boolean;
  
  /** Set dynamic bitmap text animation yoyo */
  setDynamicBitmapTextAnimationYoyo(yoyo: boolean): this;
  
  /** Get dynamic bitmap text animation paused */
  getDynamicBitmapTextAnimationPaused(): boolean;
  
  /** Set dynamic bitmap text animation paused */
  setDynamicBitmapTextAnimationPaused(paused: boolean): this;
  
  /** Get dynamic bitmap text animation progress */
  getDynamicBitmapTextAnimationProgress(): number;
  
  /** Set dynamic bitmap text animation progress */
  setDynamicBitmapTextAnimationProgress(progress: number): this;
}
