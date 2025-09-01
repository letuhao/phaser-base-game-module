/**
 * Game Object Layout Interface
 * 
 * Defines layout system integration for game objects.
 * This interface focuses solely on layout system concerns.
 */

import * as Phaser from 'phaser';
import type { ILayoutStyle } from '../../layout/interfaces/IStyle';

/**
 * Interface for game object layout system integration
 */
export interface IGameObjectLayout {
  // ============================================================================
  // LAYOUT PROPERTIES
  // ============================================================================
  
  /** Layout style properties for responsive design */
  readonly gameObjectLayoutStyle: ILayoutStyle;
  
  // ============================================================================
  // LAYOUT METHODS
  // ============================================================================
  
  /** Update layout based on current properties */
  updateGameObjectLayout(): void;
  
  /** Set layout style properties */
  setGameObjectLayoutStyle(properties: Partial<ILayoutStyle>): void;
  
  /** Get layout bounds */
  getGameObjectLayoutBounds(): Phaser.Geom.Rectangle;
}
