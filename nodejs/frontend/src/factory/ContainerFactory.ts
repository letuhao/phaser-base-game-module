import * as Phaser from 'phaser'
import { logger } from '../core/Logger'
import { BaseGameObjectFactory } from '../abstract/factories/IGameObjectFactory'

/**
 * Factory for creating container game objects
 */
export class ContainerFactory extends BaseGameObjectFactory {
  constructor() {
    super(['container'])
    logger.debug('ContainerFactory', 'ContainerFactory initialized', {
      supportedTypes: this.getSupportedTypes()
    })
  }
  
  /**
   * Create a container game object from configuration
   */
  createGameObject(config: any, scene: Phaser.Scene): Phaser.GameObjects.Container | null {
    logger.debug('ContainerFactory', 'Creating container game object', {
      objectId: config.id,
      objectType: config.type,
      config: {
        x: config.x,
        y: config.y,
        width: config.width,
        height: config.height,
        name: config.name
      }
    })
    
    try {
      // Create a container for the container
      const container = scene.add.container(config.x || 0, config.y || 0)
      
      logger.debug('ContainerFactory', 'Phaser container created', {
        objectId: config.id,
        phaserObjectType: container.constructor.name,
        position: { x: container.x, y: container.y }
      })
      
      // Set common properties
      this.setCommonProperties(container, config)
      
      // Set container size
      if (config.width && config.width !== 'fill') {
        logger.debug('ContainerFactory', 'Setting container size', {
          objectId: config.id,
          width: config.width,
          height: config.height || config.width
        })
        container.setSize(config.width, config.height || config.width)
      }
      
      // Set name for debugging
      container.name = config.name || config.id
      
      // Make container interactive if specified
      if (config.interactive !== undefined) {
        logger.debug('ContainerFactory', 'Setting container interactivity', {
          objectId: config.id,
          interactive: config.interactive
        })
        if (config.interactive) {
          container.setInteractive()
        } else {
          container.disableInteractive()
        }
      }
      
      // Set background color if specified
      if (config.backgroundColor) {
        logger.debug('ContainerFactory', 'Setting container background color', {
          objectId: config.id,
          backgroundColor: config.backgroundColor
        })
        // Create a background rectangle
        const background = scene.add.rectangle(
          0, 0,
          config.width || 100,
          config.height || 100,
          this.parseColor(config.backgroundColor)
        )
        container.add(background)
        
        // Set the background as the container's background
        container.setSize(background.width, background.height)
        
        logger.debug('ContainerFactory', 'Container background added', {
          objectId: config.id,
          backgroundSize: { width: background.width, height: background.height }
        })
      }
      
      logger.info('ContainerFactory', 'Container created successfully', {
        objectId: config.id,
        phaserObjectType: container.constructor.name,
        containerName: container.name,
        hasBackground: !!config.backgroundColor,
        size: { width: container.width, height: container.height }
      })
      
      return container
      
    } catch (error) {
      logger.error('ContainerFactory', `Error creating container '${config.id}':`, error)
      return null
    }
  }
  
  /**
   * Parse color string to hex number
   */
  private parseColor(color: string): number {
    try {
      // Remove # if present
      const cleanColor = color.startsWith('#') ? color.slice(1) : color
      
      // Parse hex color
      const hexColor = parseInt(cleanColor, 16)
      
      logger.debug('ContainerFactory', 'Parsed color', {
        originalColor: color,
        cleanColor,
        hexColor: `0x${cleanColor}`,
        parsedValue: hexColor
      })
      
      return hexColor
    } catch (error) {
      logger.warn('ContainerFactory', 'Failed to parse color, using default', {
        color,
        error: error instanceof Error ? error.message : String(error)
      })
      return 0x808080 // Default gray color
    }
  }
}
