import * as Phaser from 'phaser';
import { BaseGameObjectFactory } from '../abstract/factories/IGameObjectFactory';
import { Logger } from '../core/Logger';
import type { IFactoryInput } from './interfaces/IFactoryInput';

/**
 * Factory for creating button game objects
 */
export class ButtonFactory extends BaseGameObjectFactory {
  private logger: Logger = Logger.getInstance();

  constructor() {
    super(['button']);
  }

  /**
   * Create a button game object from configuration
   */
  createGameObject(input: IFactoryInput): Phaser.GameObjects.Container | null {
    // Extract config and scene from input
    const config = (input as any).config || {};
    const scene = input.scene;

    try {
      // Create a container for the button
      const button = scene.add.container(config.x || 0, config.y || 0);

      // Set common properties
      this.setCommonProperties(button, config);

      // Create button background (rectangle)
      const background = scene.add.rectangle(
        0,
        0,
        config.width || 200,
        config.height || 50,
        config.backgroundColor || 0x4a90e2
      );

      // Create button text
      const text = scene.add.text(0, 0, config.text || 'Button', {
        fontSize: config.fontSize || '18px',
        color: config.textColor || '#ffffff',
        fontFamily: config.fontFamily || 'Arial',
      });

      // Center text in button
      text.setOrigin(0.5);

      // Add background and text to button container
      button.add([background, text]);

      // Set button size
      if (config.width && config.width !== 'fill') {
        button.setSize(config.width, config.height || config.width);
      }

      // Make button interactive
      button.setInteractive();

      // Add hover effects if specified
      if (config.hoverEffects) {
        button.on('pointerover', () => {
          if (config.hoverEffects.scale) {
            button.setScale(config.hoverEffects.scale);
          }
          if (config.hoverEffects.tint) {
            background.setFillStyle(
              Phaser.Display.Color.ValueToColor(config.hoverEffects.tint).color
            );
          }
        });

        button.on('pointerout', () => {
          if (config.hoverEffects.scale) {
            button.setScale(1);
          }
          if (config.hoverEffects.tint) {
            background.setFillStyle(
              Phaser.Display.Color.ValueToColor(config.backgroundColor || '#ffffff').color
            );
          }
        });
      }

      // Add click handler if specified
      if (config.onClick) {
        button.on('pointerdown', config.onClick);
      }

      return button;
    } catch (error) {
      this.logger.error(
        'ButtonFactory',
        'createGameObject',
        `Error creating button '${config?.id || 'unknown'}':`,
        error
      );
      return null;
    }
  }
}
