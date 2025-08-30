import * as Phaser from 'phaser'
import { logger } from '../core/Logger'
import { IGameObjectFactory } from '../abstract/factories/IGameObjectFactory'
import { ContainerFactory } from './ContainerFactory'
import { ImageFactory } from './ImageFactory'
import { TextFactory } from './TextFactory'
import { ButtonFactory } from './ButtonFactory'

/**
 * GameObject Factory Manager
 * Singleton that manages all concrete game object factories
 * Provides a unified interface for creating game objects
 */
export class GameObjectFactoryManager {
  private static instance: GameObjectFactoryManager
  private factories: Map<string, IGameObjectFactory> = new Map()
  
  private constructor() {
    logger.debug('GameObjectFactoryManager', 'Initializing GameObjectFactoryManager')
    this.registerDefaultFactories()
  }
  
  /**
   * Get singleton instance
   */
  public static getInstance(): GameObjectFactoryManager {
    if (!GameObjectFactoryManager.instance) {
      GameObjectFactoryManager.instance = new GameObjectFactoryManager()
    }
    return GameObjectFactoryManager.instance
  }
  
  /**
   * Register default factories
   */
  private registerDefaultFactories(): void {
    logger.debug('GameObjectFactoryManager', 'Registering default factories')
    
    try {
      // Register container factory
      const containerFactory = new ContainerFactory()
      this.registerFactory('container', containerFactory)
      logger.debug('GameObjectFactoryManager', 'Container factory registered', {
        supportedTypes: containerFactory.getSupportedTypes()
      })
      
      // Register image factory
      const imageFactory = new ImageFactory()
      this.registerFactory('image', imageFactory)
      logger.debug('GameObjectFactoryManager', 'Image factory registered', {
        supportedTypes: imageFactory.getSupportedTypes()
      })
      
      // Register text factory
      const textFactory = new TextFactory()
      this.registerFactory('text', textFactory)
      logger.debug('GameObjectFactoryManager', 'Text factory registered', {
        supportedTypes: textFactory.getSupportedTypes()
      })
      
      // Register button factory
      const buttonFactory = new ButtonFactory()
      this.registerFactory('button', buttonFactory)
      logger.debug('GameObjectFactoryManager', 'Button factory registered', {
        supportedTypes: buttonFactory.getSupportedTypes()
      })
      
      logger.info('GameObjectFactoryManager', 'All default factories registered successfully', {
        totalFactories: this.factories.size,
        factoryTypes: Array.from(this.factories.keys())
      })
      
    } catch (error) {
      logger.error('GameObjectFactoryManager', 'Error registering default factories', error)
      throw error
    }
  }
  
  /**
   * Register a factory for a specific object type
   */
  public registerFactory(objectType: string, factory: IGameObjectFactory): void {
    logger.debug('GameObjectFactoryManager', 'Registering factory', {
      objectType,
      factoryType: factory.constructor.name,
      supportedTypes: factory.getSupportedTypes()
    })
    
    this.factories.set(objectType, factory)
    
    logger.debug('GameObjectFactoryManager', 'Factory registered successfully', {
      objectType,
      totalFactories: this.factories.size
    })
  }
  
  /**
   * Create a game object using the appropriate factory
   */
  public createGameObject(config: any, scene: Phaser.Scene): Phaser.GameObjects.GameObject | null {
    logger.debug('GameObjectFactoryManager', 'Creating game object', {
      objectId: config.id,
      objectType: config.type,
      hasConfig: !!config,
      configKeys: config ? Object.keys(config) : []
    })
    
    try {
      if (!config || !config.type) {
        logger.warn('GameObjectFactoryManager', 'Invalid config provided', {
          hasConfig: !!config,
          configType: config?.type,
          config: config
        })
        return null
      }
      
      const factory = this.factories.get(config.type)
      
      if (!factory) {
        logger.warn('GameObjectFactoryManager', 'No factory found for object type', {
          objectType: config.type,
          availableFactories: Array.from(this.factories.keys()),
          objectId: config.id
        })
        return null
      }
      
      logger.debug('GameObjectFactoryManager', 'Factory found, creating game object', {
        objectId: config.id,
        objectType: config.type,
        factoryType: factory.constructor.name,
        canCreate: factory.canCreate(config.type)
      })
      
      if (!factory.canCreate(config.type)) {
        logger.warn('GameObjectFactoryManager', 'Factory cannot create this object type', {
          objectType: config.type,
          factoryType: factory.constructor.name,
          supportedTypes: factory.getSupportedTypes(),
          objectId: config.id
        })
        return null
      }
      
      const gameObject = factory.createGameObject(config, scene)
      
      if (gameObject) {
        logger.debug('GameObjectFactoryManager', 'Game object created successfully', {
          objectId: config.id,
          objectType: config.type,
          phaserObjectType: gameObject.constructor.name,
          gameObjectName: gameObject.name
        })
      } else {
        logger.error('GameObjectFactoryManager', 'Factory failed to create game object', {
          objectId: config.id,
          objectType: config.type,
          factoryType: factory.constructor.name
        })
      }
      
      return gameObject
      
    } catch (error) {
      logger.error('GameObjectFactoryManager', `Error creating game object: ${config?.id}`, error)
      return null
    }
  }
  
  /**
   * Check if a factory exists for the given object type
   */
  public hasFactory(objectType: string): boolean {
    const hasFactory = this.factories.has(objectType)
    logger.debug('GameObjectFactoryManager', 'Checking if factory exists', {
      objectType,
      hasFactory
    })
    return hasFactory
  }
  
  /**
   * Get all registered factory types
   */
  public getRegisteredTypes(): string[] {
    const types = Array.from(this.factories.keys())
    logger.debug('GameObjectFactoryManager', 'Getting registered factory types', {
      types,
      count: types.length
    })
    return types
  }
  
  /**
   * Get factory for a specific object type
   */
  public getFactory(objectType: string): IGameObjectFactory | undefined {
    const factory = this.factories.get(objectType)
    logger.debug('GameObjectFactoryManager', 'Getting factory', {
      objectType,
      hasFactory: !!factory,
      factoryType: factory?.constructor.name
    })
    return factory
  }
  
  /**
   * Get factory statistics
   */
  public getStats(): {
    totalFactories: number
    registeredTypes: string[]
    factoryDetails: Array<{ type: string; factoryClass: string; supportedTypes: string[] }>
  } {
    const stats = {
      totalFactories: this.factories.size,
      registeredTypes: Array.from(this.factories.keys()),
      factoryDetails: Array.from(this.factories.entries()).map(([type, factory]) => ({
        type,
        factoryClass: factory.constructor.name,
        supportedTypes: factory.getSupportedTypes()
      }))
    }
    
    logger.debug('GameObjectFactoryManager', 'Getting factory statistics', stats)
    return stats
  }
}
