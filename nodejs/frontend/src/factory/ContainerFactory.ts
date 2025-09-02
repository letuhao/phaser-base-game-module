import * as Phaser from 'phaser';
import { logger } from '../core/Logger';
import { BaseGameObjectFactory } from '../abstract/factories/IGameObjectFactory';
import type { IFactoryInput } from './interfaces/IFactoryInput';
import { Container } from '../object/container/Container';

/**
 * Factory for creating container game objects
 * Now creates custom Container wrapper with injected configurations
 */
export class ContainerFactory extends BaseGameObjectFactory {
  constructor() {
    super(['container']);
    logger.debug('ContainerFactory', 'constructor', 'ContainerFactory initialized', {
      supportedTypes: this.getSupportedTypes(),
    });
  }

  /**
   * Create a container game object from configuration
   * Now creates custom Container wrapper with injected configurations
   */
  createGameObject(input: IFactoryInput): Phaser.GameObjects.Container | null {
    // Type guard to ensure we have a container factory input
    if (input.type !== 'container') {
      logger.error(
        'ContainerFactory',
        'createGameObject',
        'Invalid input type for container factory',
        {
          expectedType: 'container',
          actualType: input.type,
        }
      );
      return null;
    }

    const config = input.config;
    const scene = input.scene;

    logger.debug('ContainerFactory', 'createGameObject', 'Creating container game object', {
      objectId: config.id,
      objectType: input.type,
      config: {
        x: config.x,
        y: config.y,
        width: config.width,
        height: config.height,
        name: config.name,
      },
    });

    try {
      // NEW: Create our custom Container wrapper instead of plain Phaser container
      const container = new Container(
        scene,
        config.id,
        config.x || 0,
        config.y || 0,
        (input.parent as any) || null // parent from input
      );

      logger.debug('ContainerFactory', 'createGameObject', 'Custom Container wrapper created', {
        objectId: config.id,
        containerType: container.constructor.name,
        position: { x: container.x, y: container.y },
      });

      // NEW: Inject responsive and theme configurations from scene
      if ((scene as any).getGameObjectConfigs) {
        logger.debug(
          'ContainerFactory',
          'createGameObject',
          'Scene supports getGameObjectConfigs, calling it',
          {
            objectId: config.id,
            sceneType: scene.constructor.name,
          }
        );

        const configs = (scene as any).getGameObjectConfigs(config.id);
        logger.debug('ContainerFactory', 'createGameObject', 'Received configs from scene', {
          objectId: config.id,
          configs,
          hasResponsive: !!configs?.responsive,
          hasTheme: !!configs?.theme,
          currentBreakpoint: configs?.currentBreakpoint,
        });

        container.initializeWithConfigs(configs);

        logger.debug(
          'ContainerFactory',
          'createGameObject',
          'Configurations injected into container',
          {
            objectId: config.id,
            hasResponsive: !!configs.responsive,
            hasTheme: !!configs.theme,
            currentBreakpoint: configs.currentBreakpoint,
          }
        );
      } else {
        logger.warn(
          'ContainerFactory',
          'createGameObject',
          'Scene does not support getGameObjectConfigs',
          {
            objectId: config.id,
            sceneType: scene.constructor.name,
          }
        );
      }

      // Set common properties
      this.setCommonProperties(container, input);

      // Set container size
      if (config.width && config.width !== 'fill') {
        logger.debug('ContainerFactory', 'createGameObject', 'Setting container size', {
          objectId: config.id,
          width: config.width,
          height: config.height || config.width,
        });
        container.setSize(
          config.width,
          typeof config.height === 'number' ? config.height : config.width
        );
      }

      // Set name for debugging
      container.name = config.name || config.id;

      // Make container interactive if specified
      if (config.interactive !== undefined) {
        logger.debug('ContainerFactory', 'createGameObject', 'Setting container interactivity', {
          objectId: config.id,
          interactive: config.interactive,
        });
        if (config.interactive) {
          container.setInteractive();
        } else {
          container.disableInteractive();
        }
      }

      // Set background color if specified
      if (config.backgroundColor) {
        logger.debug('ContainerFactory', 'createGameObject', 'Setting container background color', {
          objectId: config.id,
          backgroundColor: config.backgroundColor,
        });
        // Create a background rectangle
        const background = scene.add.rectangle(
          0,
          0,
          typeof config.width === 'number' ? config.width : 100,
          typeof config.height === 'number' ? config.height : 100,
          this.parseColor(String(config.backgroundColor))
        );
        container.add(background);

        // Set the background as the container's background
        container.setSize(background.width, background.height);

        logger.debug('ContainerFactory', 'createGameObject', 'Container background added', {
          objectId: config.id,
          backgroundSize: { width: background.width, height: background.height },
        });
      }

      logger.info('ContainerFactory', 'createGameObject', 'Custom Container created successfully', {
        objectId: config.id,
        containerType: container.constructor.name,
        containerName: container.name,
        hasBackground: !!config.backgroundColor,
        size: { width: container.width, height: container.height },
      });

      return container;
    } catch (error) {
      logger.error(
        'ContainerFactory',
        'createGameObject',
        'Failed to create container: ${config.id}',
        error
      );
      return null;
    }
  }

  /**
   * Parse color string to hex number
   */
  private parseColor(color: string): number {
    try {
      // Remove # if present
      const cleanColor = color.startsWith('#') ? color.slice(1) : color;

      // Parse hex color
      const hexColor = parseInt(cleanColor, 16);

      logger.debug('ContainerFactory', 'parseColor', 'Parsed color', {
        originalColor: color,
        cleanColor,
        hexColor: `0x${cleanColor}`,
        parsedValue: hexColor,
      });

      return hexColor;
    } catch (error) {
      logger.warn('ContainerFactory', 'parseColor', 'Failed to parse color, using default', {
        color,
        error: error instanceof Error ? error.message : String(error),
      });
      return 0x808080; // Default gray color
    }
  }
}
