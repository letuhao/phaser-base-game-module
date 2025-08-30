import * as Phaser from 'phaser'
import { BaseGameObjectFactory } from './IGameObjectFactory'

/**
 * Factory for creating container game objects
 */
export class ContainerFactory extends BaseGameObjectFactory {
  constructor() {
    super(['container'])
  }
  
  /**
   * Create a container game object from configuration
   */
  createGameObject(config: any, scene: Phaser.Scene): Phaser.GameObjects.Container {
    const container = scene.add.container(config.x || 0, config.y || 0)
    
    // Set common properties
    this.setCommonProperties(container, config)
    
    // Set container-specific properties
    if (config.width && config.width !== 'fill') {
      container.setSize(config.width, config.height || config.width)
    }
    
    // Set interactive if specified
    if (config.interactive && 'setInteractive' in container) {
      container.setInteractive()
    }
    
    return container
  }
}
