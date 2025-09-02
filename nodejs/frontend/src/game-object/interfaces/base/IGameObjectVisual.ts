/**
 * Game Object Visual Interface
 *
 * Defines visual-related properties and methods for game objects.
 * This interface focuses solely on visual appearance concerns.
 */

import * as Phaser from 'phaser';

/**
 * Interface for game object visual properties and methods
 */
export interface IGameObjectVisual {
  // ============================================================================
  // VISUAL PROPERTIES
  // ============================================================================

  /** Whether this game object is visible */
  readonly gameObjectVisible: boolean;

  /** Alpha value (0-1) */
  gameObjectAlpha: number;

  /** Tint color */
  gameObjectTint: number;

  /** Whether to use tint fill */
  gameObjectTintFill: boolean;

  /** Blend mode */
  gameObjectBlendMode: Phaser.BlendModes;

  /** Depth for rendering order */
  gameObjectDepth: number;

  /** Mask applied to this object */
  gameObjectMask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null;

  // ============================================================================
  // VISUAL METHODS
  // ============================================================================

  /** Set the visible state */
  setGameObjectVisible(value: boolean): this;

  /** Set alpha */
  setGameObjectAlpha(value: number): this;

  /** Set tint */
  setGameObjectTint(value: number): this;

  /** Set tint fill */
  setGameObjectTintFill(value: number): this;

  /** Clear tint */
  clearGameObjectTint(): this;

  /** Set blend mode */
  setGameObjectBlendMode(value: Phaser.BlendModes): this;

  /** Set depth */
  setGameObjectDepth(value: number): this;

  /** Set mask */
  setGameObjectMask(
    mask: Phaser.Display.Masks.BitmapMask | Phaser.Display.Masks.GeometryMask | null
  ): this;

  /** Clear mask */
  clearGameObjectMask(): this;
}
