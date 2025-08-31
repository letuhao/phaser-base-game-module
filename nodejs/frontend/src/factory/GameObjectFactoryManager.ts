import * as Phaser from 'phaser';
import { logger } from '../core/Logger';
import { IGameObjectFactory } from '../abstract/factories/IGameObjectFactory';
import { ContainerFactory } from './ContainerFactory';
import { ImageFactory } from './ImageFactory';
import { TextFactory } from './TextFactory';
import { ButtonFactory } from './ButtonFactory';
import { ShapeFactory } from './ShapeFactory';

/**
 * GameObject Factory Manager
 * Singleton that manages all concrete game object factories
 * Provides a unified interface for creating game objects
 */
export class GameObjectFactoryManager {
  private static instance: GameObjectFactoryManager;
  private factories: Map<string, IGameObjectFactory> = new Map();
  
  private constructor() {
    logger.debug('GameObjectFactoryManager', 'constructor', 'Initializing GameObjectFactoryManager');
    this.registerDefaultFactories();
  }
  
  /**
   * Get singleton instance
   */
  public static getInstance(): GameObjectFactoryManager {
    if (!GameObjectFactoryManager.instance) {
      GameObjectFactoryManager.instance = new GameObjectFactoryManager();
    }
    return GameObjectFactoryManager.instance;
  }
  
  /**
   * Register default factories
   */
  private registerDefaultFactories(): void {
    logger.debug('GameObjectFactoryManager', 'registerDefaultFactories', 'Registering default factories');
    
    try {
      // Register container factory
      const containerFactory = new ContainerFactory();
      this.registerFactory('container', containerFactory);
      logger.debug('GameObjectFactoryManager', 'registerDefaultFactories', 'Container factory registered', {
        supportedTypes: containerFactory.getSupportedTypes()
      });
      
      // Register image factory
      const imageFactory = new ImageFactory();
      this.registerFactory('image', imageFactory);
      logger.debug('GameObjectFactoryManager', 'registerDefaultFactories', 'Image factory registered', {
        supportedTypes: imageFactory.getSupportedTypes()
      });
      
      // Register text factory
      const textFactory = new TextFactory();
      this.registerFactory('text', textFactory);
      logger.debug('GameObjectFactoryManager', 'registerDefaultFactories', 'Text factory registered', {
        supportedTypes: textFactory.getSupportedTypes()
      });
      
      // Register button factory
      const buttonFactory = new ButtonFactory();
      this.registerFactory('button', buttonFactory);
      logger.debug('GameObjectFactoryManager', 'registerDefaultFactories', 'Button factory registered', {
        supportedTypes: buttonFactory.getSupportedTypes()
      });
      
      // Register shape factory
      const shapeFactory = new ShapeFactory();
      this.registerFactory('shape', shapeFactory);
      logger.debug('GameObjectFactoryManager', 'registerDefaultFactories', 'Shape factory registered', {
        supportedTypes: shapeFactory.getSupportedTypes()
      });
      
      logger.info('GameObjectFactoryManager', 'registerDefaultFactories', 'All default factories registered successfully', {
        totalFactories: this.factories.size,
        factoryTypes: Array.from(this.factories.keys())
      });
      
    } catch (error) {
      logger.error('GameObjectFactoryManager', 'registerDefaultFactories', 'Error registering default factories', error);
      throw error;
    }
  }
  
  /**
   * Register a factory for a specific object type
   */
  public registerFactory(objectType: string, factory: IGameObjectFactory): void {
    logger.debug('GameObjectFactoryManager', 'registerFactory', 'Registering factory', {
      objectType,
      factoryType: factory.constructor.name,
      supportedTypes: factory.getSupportedTypes()
    });
    
    this.factories.set(objectType, factory);
    
    logger.debug('GameObjectFactoryManager', 'registerFactory', 'Factory registered successfully', {
      objectType,
      totalFactories: this.factories.size
    });
  }
  
  /**
   * Create a game object using the appropriate factory
   */
  public createGameObject(config: any, scene: Phaser.Scene): Phaser.GameObjects.GameObject | null {
    logger.debug('GameObjectFactoryManager', 'createGameObject', 'Creating game object', {
      objectId: config.id,
      objectType: config.type,
      hasConfig: !!config,
      configKeys: config ? Object.keys(config) : []
    });
    
    try {
      if (!config || !config.type) {
        logger.warn('GameObjectFactoryManager', 'createGameObject', 'Invalid config provided', {
          hasConfig: !!config,
          configType: config?.type,
          config: config
        });
        return null;
      }
      
      const factory = this.factories.get(config.type);
      
      if (!factory) {
        logger.warn('GameObjectFactoryManager', 'createGameObject', 'No factory found for object type', {
          objectType: config.type,
          availableFactories: Array.from(this.factories.keys()),
          objectId: config.id
        });
        return null;
      }
      
      logger.debug('GameObjectFactoryManager', 'createGameObject', 'Factory found, creating game object', {
        objectId: config.id,
        objectType: config.type,
        factoryType: factory.constructor.name,
        canCreate: factory.canCreate(config.type)
      });
      
      if (!factory.canCreate(config.type)) {
        logger.warn('GameObjectFactoryManager', 'createGameObject', 'Factory cannot create this object type', {
          objectType: config.type,
          factoryType: factory.constructor.name,
          supportedTypes: factory.getSupportedTypes(),
          objectId: config.id
        });
        return null;
      }
      
      const gameObject = factory.createGameObject(config, scene);
      
      if (gameObject) {
        logger.debug('GameObjectFactoryManager', 'createGameObject', 'Game object created successfully', {
          objectId: config.id,
          objectType: config.type,
          phaserObjectType: gameObject.constructor.name,
          gameObjectName: gameObject.name
        });
      } else {
        logger.error('GameObjectFactoryManager', 'createGameObject', 'Factory failed to create game object', {
          objectId: config.id,
          objectType: config.type,
          factoryType: factory.constructor.name
        });
      }
      
      return gameObject;
      
    } catch (error) {
      logger.error('GameObjectFactoryManager', 'createGameObject', `Error creating game object: ${config?.id}`, error);
      return null;
    }
  }

  /**
   * Create a game object using static factory methods from concrete classes
   * This method handles dynamic class loading and static factory method calls
   */
  public async createGameObjectWithStaticFactory(
    config: any, 
    scene: Phaser.Scene, 
    parent?: Phaser.GameObjects.Container
  ): Promise<Phaser.GameObjects.GameObject | null> {
    logger.debug('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', 'Creating game object with static factory', {
      objectId: config.id,
      className: config.factory?.className,
      createMethod: config.factory?.createMethod
    });

    try {
      if (!config.factory?.className) {
        logger.warn('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', 'No factory configuration provided', {
          objectId: config.id,
          hasFactory: !!config.factory,
          factoryConfig: config.factory
        });
        return null;
      }

      const { className, createMethod = 'createFromConfig' } = config.factory;

      // Dynamic class loading based on className
      let ConcreteClass: any;

      switch (className) {
        case 'BackgroundContainer':
          logger.debug('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', 'Loading BackgroundContainer class');
          try {
            const BackgroundContainerModule = await import('../object/container/BackgroundContainer');
            ConcreteClass = BackgroundContainerModule.BackgroundContainer;
            logger.debug('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', 'BackgroundContainer class loaded successfully');
          } catch (importError) {
            logger.error('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', 'Failed to import BackgroundContainer module', {
              objectId: config.id,
              error: importError instanceof Error ? importError.message : String(importError)
            });
            return null;
          }
          break;

        case 'ConcreteContainer':
          logger.debug('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', 'Loading ConcreteContainer class');
          try {
            const ConcreteContainerModule = await import('../object/container/ConcreteContainer');
            ConcreteClass = ConcreteContainerModule.ConcreteContainer;
            logger.debug('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', 'ConcreteContainer class loaded successfully');
          } catch (importError) {
            logger.error('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', 'Failed to import ConcreteContainer module', {
              objectId: config.id,
              error: importError instanceof Error ? importError.message : String(importError)
            });
            return null;
          }
          break;

        case 'Rectangle':
          logger.debug('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', 'Loading Rectangle class');
          try {
            const RectangleModule = await import('../object/shapes/Rectangle');
            ConcreteClass = RectangleModule.Rectangle;
            logger.debug('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', 'Rectangle class loaded successfully');
          } catch (importError) {
            logger.error('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', 'Failed to import Rectangle module', {
              objectId: config.id,
              error: importError instanceof Error ? importError.message : String(importError)
            });
            return null;
          }
          break;

        default:
          logger.warn('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', `Unknown factory class: ${className}`, {
            objectId: config.id,
            availableClasses: ['BackgroundContainer', 'ConcreteContainer', 'Rectangle']
          });
          return null;
      }

      // Check if the class has the create method
      if (typeof ConcreteClass[createMethod] === 'function') {
        logger.debug('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', 'Calling static factory method', {
          objectId: config.id,
          className,
          createMethod
        });

        try {
          const result = ConcreteClass[createMethod](config, scene, parent);

          logger.debug('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', 'Static factory method executed successfully', {
            objectId: config.id,
            hasResult: !!result,
            resultType: result?.constructor.name
          });

          return result;
        } catch (methodError) {
          logger.error('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', 'Static factory method execution failed', {
            objectId: config.id,
            className,
            createMethod,
            error: methodError instanceof Error ? methodError.message : String(methodError)
          });
          return null;
        }
      } else {
        logger.warn('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', `Factory method '${createMethod}' not found in ${className}`, {
          objectId: config.id,
          availableMethods: Object.getOwnPropertyNames(ConcreteClass).filter(name => typeof ConcreteClass[name] === 'function')
        });
        return null;
      }

    } catch (error) {
      logger.error('GameObjectFactoryManager', 'createGameObjectWithStaticFactory', `Critical error using static factory for ${config.id}:`, {
        error: error instanceof Error ? error.message : String(error),
        objectId: config.id,
        className: config.factory?.className
      });
      return null;
    }
  }
  
  /**
   * Check if a factory exists for the given object type
   */
  public hasFactory(objectType: string): boolean {
    const hasFactory = this.factories.has(objectType);
    logger.debug('GameObjectFactoryManager', 'hasFactory', 'Checking if factory exists', {
      objectType,
      hasFactory
    });
    return hasFactory;
  }
  
  /**
   * Get all registered factory types
   */
  public getRegisteredTypes(): string[] {
    const types = Array.from(this.factories.keys());
    logger.debug('GameObjectFactoryManager', 'getRegisteredTypes', 'Getting registered factory types', {
      types,
      count: types.length
    });
    return types;
  }
  
  /**
   * Get factory for a specific object type
   */
  public getFactory(objectType: string): IGameObjectFactory | undefined {
    const factory = this.factories.get(objectType);
    logger.debug('GameObjectFactoryManager', 'getFactory', 'Getting factory', {
      objectType,
      hasFactory: !!factory,
      factoryType: factory?.constructor.name
    });
    return factory;
  }
  
  /**
   * Get factory statistics
   */
  public getStats(): {
    totalFactories: number;
    registeredTypes: string[];
    factoryDetails: Array<{ type: string; factoryClass: string; supportedTypes: string[] }>;
  } {
    const stats = {
      totalFactories: this.factories.size,
      registeredTypes: Array.from(this.factories.keys()),
      factoryDetails: Array.from(this.factories.entries()).map(([type, factory]) => ({
        type,
        factoryClass: factory.constructor.name,
        supportedTypes: factory.getSupportedTypes()
      }))
    };
    
    logger.debug('GameObjectFactoryManager', 'getStats', 'Getting factory statistics', stats);
    return stats;
  }
}
