import * as Phaser from 'phaser'
import { Container } from './Container'
import type { IContainer } from '../../abstract/objects/IContainer'

/**
 * Concrete Container implementation
 * This class provides the actual implementation of the abstract Container
 */
export class ConcreteContainer extends Container {
  constructor(
    scene: Phaser.Scene,
    id: string,
    x: number = 0,
    y: number = 0,
    parent: IContainer | null = null
  ) {
    super(scene, id, x, y, parent)
  }
  
  /**
   * Create a ConcreteContainer instance from configuration
   * This method allows the ConcreteContainer class to create itself from config
   */
  public static createFromConfig(config: any, scene: Phaser.Scene, parent?: IContainer): ConcreteContainer {
    const container = new ConcreteContainer(
      scene,
      config.id,
      config.x || 0,
      config.y || 0,
      parent || null
    )
    
    // Apply configuration properties
    if (config.properties) {
              // Set background color if specified
        if (config.properties.backgroundColor) {
          container.setBackground({ color: config.properties.backgroundColor })
        }
        
        // Set interactive if specified
        if (config.properties.interactive !== undefined) {
          container.setInteractive(config.properties.interactive)
        }
        
        // Set size if specified
        if (config.width === 'fill' || config.height === 'fill') {
          // Handle fill dimensions - use scene dimensions
          const sceneWidth = scene.game.config.width as number
          const sceneHeight = scene.game.config.height as number
          
          let finalWidth = config.width === 'fill' ? sceneWidth : (config.width as number)
          let finalHeight = config.height === 'fill' ? (config.height === 'fill' ? sceneHeight : config.height) : (config.height || config.width)
          
          // For child containers, calculate relative positions
          if (config.y === 100) { // Body container
            finalHeight = sceneHeight - 100 - 80 // scene height - header - footer
          } else if (config.y === 0 && config.height === 80) { // Footer container
            finalHeight = 80
          } else if (config.y === 0 && config.height === 100) { // Header container
            finalHeight = 100
          }
          
          container.phaserObject.setSize(finalWidth, finalHeight)
        } else if (config.width && config.width !== 'fill') {
          container.phaserObject.setSize(config.width, config.height || config.width)
        }
      }
      
      // Set name
      container.phaserObject.name = config.name || config.id
    
    return container
  }
}
