import type { IGameObject } from '../base/IGameObject';

/**
 * Interface for shape game objects
 * Extends IGameObject to provide shape-specific functionality
 */
export interface IShape extends IGameObject {
  /**
   * Get the shape type
   */
  readonly shapeType: 'rectangle' | 'circle' | 'ellipse' | 'triangle' | 'polygon';

  /**
   * Get the shape dimensions
   */
  readonly dimensions: { width: number; height: number };

  /**
   * Get the fill color
   */
  readonly fillColor: number;

  /**
   * Get the stroke color
   */
  readonly strokeColor: number | null;

  /**
   * Get the stroke width
   */
  readonly strokeWidth: number;

  /**
   * Set the fill color
   */
  setFillColor(color: number): void;

  /**
   * Set the stroke color and width
   */
  setStroke(color: number, width: number): void;

  /**
   * Remove stroke
   */
  removeStroke(): void;

  /**
   * Resize the shape
   */
  resize(width: number, height: number): void;

  /**
   * Get the shape bounds
   * Note: This should be compatible with Phaser's GameObject bounds
   */
  getBounds(): any;
}
