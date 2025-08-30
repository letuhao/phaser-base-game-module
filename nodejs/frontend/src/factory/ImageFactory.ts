import * as Phaser from 'phaser'
import { BaseGameObjectFactory } from '../abstract/factories/IGameObjectFactory'

/**
 * Factory for creating image game objects
 */
export class ImageFactory extends BaseGameObjectFactory {
  constructor() {
    super(['image'])
  }
  
  /**
   * Create an image game object from configuration
   */
  createGameObject(config: any, scene: Phaser.Scene): Phaser.GameObjects.Image | null {
    try {
      // Check if the texture key exists
      if (!config.textureKey || !scene.textures.exists(config.textureKey)) {
        console.warn(`ImageFactory: Texture key '${config.textureKey}' not found for image: ${config.id}`)
        return null
      }
      
      const image = scene.add.image(config.x || 0, config.y || 0, config.textureKey)
      
      // Set common properties
      this.setCommonProperties(image, config)
      
      // Set image-specific properties
      if (config.scale) {
        if (typeof config.scale === 'number') {
          image.setScale(config.scale)
        } else if (config.scale.x !== undefined || config.scale.y !== undefined) {
          image.setScale(config.scale.x || 1, config.scale.y || 1)
        }
      }
      
      // Set origin if specified
      if (config.origin) {
        image.setOrigin(config.origin.x || 0.5, config.origin.y || 0.5)
      }
      
      // Set interactive if specified
      if (config.interactive) {
        image.setInteractive()
      }
      
      return image
      
    } catch (error) {
      console.error(`ImageFactory: Error creating image '${config.id}':`, error)
      return null
    }
  }
}
