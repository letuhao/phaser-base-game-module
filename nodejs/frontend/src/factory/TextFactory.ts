import * as Phaser from 'phaser';
import { BaseGameObjectFactory } from '../abstract/factories/IGameObjectFactory';
import { Logger } from '../core/Logger';
import type { IFactoryInput } from './interfaces/IFactoryInput';

/**
 * Factory for creating text game objects
 */
export class TextFactory extends BaseGameObjectFactory {
  private logger: Logger = Logger.getInstance();

  constructor() {
    super(['text']);
  }

  /**
   * Create a text game object from configuration
   */
  createGameObject(input: IFactoryInput): Phaser.GameObjects.Text | null {
    // Extract config and scene from input
    const config = (input as any).config || {};
    const scene = input.scene;

    try {
      const textConfig: Phaser.Types.GameObjects.Text.TextStyle = {
        fontSize: config.fontSize || '32px',
        fontFamily: config.fontFamily || 'Arial',
        color: config.color || '#ffffff',
        backgroundColor: config.backgroundColor,
        stroke: config.stroke,
        strokeThickness: config.strokeThickness || 0,
        shadow: config.shadow,
        align: config.align || 'left',
        wordWrap: config.wordWrap || false,
        maxLines: config.maxLines,
      };

      const text = scene.add.text(config.x || 0, config.y || 0, config.content || '', textConfig);

      // Set common properties
      this.setCommonProperties(text, config);

      // Set text-specific properties
      if (config.origin) {
        text.setOrigin(config.origin.x || 0, config.origin.y || 0);
      }

      // Set interactive if specified
      if (config.interactive) {
        text.setInteractive();
      }

      return text;
    } catch (error) {
      this.logger.error(
        'TextFactory',
        'createGameObject',
        `Error creating text '${config?.id || 'unknown'}':`,
        error
      );
      return null;
    }
  }
}
