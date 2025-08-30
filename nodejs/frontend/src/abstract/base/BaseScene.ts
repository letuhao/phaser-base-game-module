import Phaser from 'phaser'
import { ConfigManager } from '../../core/ConfigManager'
import { logger } from '../../core/Logger'
import { GameObjectFactoryManager } from '../../factory/GameObjectFactoryManager'

/**
 * Base Scene Class
 * Provides common functionality for all scenes including:
 * - Configuration management
 * - Factory-based game object creation
 * - Responsive behavior
 * - Common scene lifecycle methods
 */
export abstract class BaseScene extends Phaser.Scene {
  protected configManager: ConfigManager
  protected sceneConfigs: any = {}
  protected gameObjects: Map<string, Phaser.GameObjects.GameObject> = new Map()
  protected factoryManager: GameObjectFactoryManager
  
  constructor(sceneKey: string) {
    super({ key: sceneKey })
    this.configManager = ConfigManager.getInstance()
    this.factoryManager = GameObjectFactoryManager.getInstance()
    
    logger.debug('BaseScene', 'Base scene constructor called', {
      sceneKey,
      timestamp: Date.now()
    })
  }
  
  /**
   * Abstract method that concrete scenes must implement
   * to register their specific configurations
   */
  protected abstract registerSceneConfigs(): void
  
  /**
   * Abstract method that concrete scenes must implement
   * to get their scene name for configuration loading
   */
  protected abstract getSceneName(): string
  
  /**
   * Preload assets before scene creation
   * This method is called manually after configurations are loaded
   */
  preload(): void {
    logger.debug('BaseScene', 'Scene preload() method started', {
      sceneKey: this.scene.key,
      timestamp: Date.now()
    })
    
    try {
      // Load background images from asset configuration
      if (this.sceneConfigs.asset && this.sceneConfigs.asset.backgrounds) {
        logger.debug('BaseScene', 'Loading background images', {
          backgroundKeys: Object.keys(this.sceneConfigs.asset.backgrounds)
        })
        
        // Load desktop background
        if (this.sceneConfigs.asset.backgrounds.desktop) {
          const desktopBg = this.sceneConfigs.asset.backgrounds.desktop
          const desktopPath = this.sceneConfigs.asset.basePath + desktopBg.path
          logger.debug('BaseScene', 'Loading desktop background', {
            key: desktopBg.key,
            path: desktopPath
          })
          this.load.image(desktopBg.key, desktopPath)
        }
        
        // Load mobile background
        if (this.sceneConfigs.asset.backgrounds.mobile) {
          const mobileBg = this.sceneConfigs.asset.backgrounds.mobile
          const mobilePath = this.sceneConfigs.asset.basePath + mobileBg.path
          logger.debug('BaseScene', 'Loading mobile background', {
            key: mobileBg.key,
            path: mobilePath
          })
          this.load.image(mobileBg.key, mobilePath)
        }
        
        // Load mobile origin background (optional)
        if (this.sceneConfigs.asset.backgrounds.mobileOrigin) {
          const mobileOriginBg = this.sceneConfigs.asset.backgrounds.mobileOrigin
          const mobileOriginPath = this.sceneConfigs.asset.basePath + mobileOriginBg.path
          logger.debug('BaseScene', 'Loading mobile origin background', {
            key: mobileOriginBg.key,
            path: mobileOriginPath
          })
          this.load.image(mobileOriginBg.key, mobileOriginPath)
        }
        
        logger.info('BaseScene', 'Background images loaded successfully')
      } else {
        logger.warn('BaseScene', 'No asset configuration found for background images')
      }
      
    } catch (error) {
      logger.error('BaseScene', 'Error in scene preload', error)
      throw error
    }
  }
  
  /**
   * Wait for assets to finish loading
   */
  private async waitForAssetsToLoad(): Promise<void> {
    logger.debug('BaseScene', 'Waiting for assets to load')
    
    try {
      // Start the loader if it hasn't been started
      if (!this.load.isLoading()) {
        this.load.start()
      }
      
      // Wait for the loader to complete
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Asset loading timeout'))
        }, 10000) // 10 second timeout
        
        this.load.once('complete', () => {
          clearTimeout(timeout)
          logger.info('BaseScene', 'All assets loaded successfully')
          resolve()
        })
        
        this.load.once('loaderror', (file: any) => {
          clearTimeout(timeout)
          logger.warn('BaseScene', 'Asset load error', { file })
          resolve() // Continue anyway
        })
      })
      
    } catch (error) {
      logger.warn('BaseScene', 'Asset loading error or timeout, continuing anyway', error)
    }
  }
  
  /**
   * Scene initialization - purely configuration-driven
   */
  async create(): Promise<void> {
    logger.debug('BaseScene', 'Scene create() method started', {
      sceneKey: this.scene.key,
      gameWidth: this.game.config.width,
      gameHeight: this.game.config.height,
      timestamp: Date.now()
    })
    
    try {
      // Register scene-specific configurations
      this.registerSceneConfigs()
      
      // Load all scene configurations after registration
      this.loadSceneConfigs()
      
      // Preload assets (background images) now that configs are loaded
      this.preload()
      
      // Wait for assets to load before proceeding
      await this.waitForAssetsToLoad()
      
      // Log scene creation
      logger.info('BaseScene', 'Scene created', {
        sceneKey: this.scene.key,
        gameWidth: this.game.config.width,
        gameHeight: this.game.config.height,
        timestamp: Date.now()
      }, 'create')
      
      // Initialize scene based on configuration
      await this.initializeSceneFromConfig()
      
      // Setup responsive behavior
      this.setupResponsiveBehavior()
      
      // Log scene setup completion
      logger.info('BaseScene', 'Scene setup completed', {
        gameSize: { width: Number(this.game.config.width), height: Number(this.game.config.height) },
        scaleMode: this.game.scale.scaleMode,
        gameObjectCount: this.gameObjects.size
      }, 'create')
      
      // Flush logs to ensure they're sent to server
      await logger.flushLogs()
      
    } catch (error) {
      logger.error('BaseScene', 'Critical error in scene creation', error, 'create')
      await logger.flushLogs()
      throw error
    }
  }
  
  /**
   * Load all scene configurations
   */
  private loadSceneConfigs(): void {
    logger.debug('BaseScene', 'Starting to load scene configurations', undefined, 'loadSceneConfigs')
    
    try {
      const sceneName = this.getSceneName()
      
      // Load all configurations
      this.sceneConfigs = this.configManager.loadSceneConfigs(sceneName)
      
      logger.debug('BaseScene', 'Scene configurations loaded', {
        sceneName,
        sceneConfigs: this.sceneConfigs,
        configKeys: Object.keys(this.sceneConfigs)
      }, 'loadSceneConfigs')
      
      if (this.sceneConfigs.logging) {
        logger.info('BaseScene', 'All scene configurations loaded successfully', undefined, 'loadSceneConfigs')
      } else {
        logger.warn('BaseScene', 'Failed to load some scene configurations', undefined, 'loadSceneConfigs')
      }
      
          } catch (error) {
        logger.error('BaseScene', 'Error loading scene configurations', error, 'loadSceneConfigs')
        throw error
      }
  }
  
  /**
   * Initialize scene purely from configuration
   */
  private async initializeSceneFromConfig(): Promise<void> {
    logger.debug('BaseScene', 'Starting scene initialization from config', undefined, 'initializeSceneFromConfig')
    
    try {
      if (!this.sceneConfigs.scene) {
        logger.warn('BaseScene', 'No scene configuration available', {
          availableConfigs: Object.keys(this.sceneConfigs)
        })
        return
      }
      
      const sceneConfig = this.sceneConfigs.scene
      logger.debug('BaseScene', 'Scene config found', {
        sceneName: sceneConfig.sceneName,
        gameObjectCount: sceneConfig.gameObjects?.length || 0,
        backgroundColor: sceneConfig.backgroundColor
      }, 'initializeSceneFromConfig')
      
      // Set scene background color from config
      if (sceneConfig.backgroundColor) {
        logger.debug('BaseScene', 'Setting scene background color', {
          backgroundColor: sceneConfig.backgroundColor
        }, 'initializeSceneFromConfig')
        this.cameras.main.setBackgroundColor(sceneConfig.backgroundColor)
      }
      
      // Create game objects from configuration
      if (sceneConfig.gameObjects && sceneConfig.gameObjects.length > 0) {
        logger.debug('BaseScene', 'Creating game objects from config', {
          gameObjectCount: sceneConfig.gameObjects.length,
          gameObjectIds: sceneConfig.gameObjects.map((obj: any) => obj.id)
        }, 'initializeSceneFromConfig')
        await this.createGameObjectsFromConfig(sceneConfig.gameObjects)
      } else {
        logger.warn('BaseScene', 'No game objects found in scene config', undefined, 'initializeSceneFromConfig')
      }
      
      logger.info('BaseScene', 'Scene initialized from configuration', {
        sceneName: sceneConfig.sceneName,
        gameObjectCount: sceneConfig.gameObjects?.length || 0,
        backgroundColor: sceneConfig.backgroundColor,
        createdGameObjects: this.gameObjects.size
      })
      
    } catch (error) {
      logger.error('BaseScene', 'Error initializing scene from config', error)
      throw error
    }
  }
  
  /**
   * Create game objects recursively from configuration using Factory Pattern
   */
  private async createGameObjectsFromConfig(gameObjects: any[], parent?: Phaser.GameObjects.Container): Promise<void> {
    logger.debug('BaseScene', 'Creating game objects recursively', {
      gameObjectCount: gameObjects.length,
      parentId: parent?.name || 'root',
      gameObjectIds: gameObjects.map((obj: any) => obj.id)
    })
    
    let successCount = 0
    let failureCount = 0
    
    for (const objConfig of gameObjects) {
      try {
        logger.debug('BaseScene', 'Starting creation of game object', {
          objectId: objConfig.id,
          objectType: objConfig.type,
          objectName: objConfig.name,
          hasFactory: !!objConfig.factory,
          factoryClassName: objConfig.factory?.className,
          factoryCreateMethod: objConfig.factory?.createMethod,
          parentId: parent?.name || 'root'
        })
        
        const gameObject = await this.createGameObjectFromConfig(objConfig, parent)
        
        if (gameObject) {
          successCount++
          logger.debug('BaseScene', 'Game object created successfully', {
            objectId: objConfig.id,
            objectType: objConfig.type,
            phaserObjectType: gameObject.constructor.name,
            gameObjectName: gameObject.name
          })
          
          // Store reference to game object
          this.gameObjects.set(objConfig.id, gameObject)
          logger.debug('BaseScene', 'Game object stored in scene map', {
            objectId: objConfig.id,
            totalGameObjects: this.gameObjects.size
          })
          
          // Create children recursively
          if (objConfig.children && objConfig.children.length > 0) {
            logger.debug('BaseScene', 'Creating children for object', {
              objectId: objConfig.id,
              childCount: objConfig.children.length,
              childIds: objConfig.children.map((child: any) => child.id)
            })
            
            // Check if this is a container (either Phaser container or our wrapper)
            if (gameObject instanceof Phaser.GameObjects.Container || 
                (gameObject as any).phaserObject instanceof Phaser.GameObjects.Container) {
              
              // Get the actual Phaser container for adding children
              const phaserContainer = gameObject instanceof Phaser.GameObjects.Container 
                ? gameObject 
                : (gameObject as any).phaserObject
              
              logger.debug('BaseScene', 'Adding children to container', {
                objectId: objConfig.id,
                containerType: gameObject.constructor.name,
                phaserContainerType: phaserContainer.constructor.name
              })
              
              await this.createGameObjectsFromConfig(objConfig.children, phaserContainer)
            } else {
              logger.warn('BaseScene', `Cannot add children to non-container object: ${objConfig.id}`, {
                objectType: objConfig.type,
                phaserObjectType: gameObject.constructor.name
              })
            }
          }
        } else {
          failureCount++
          logger.error('BaseScene', 'Failed to create game object - createGameObjectFromConfig returned null', {
            objectId: objConfig.id,
            objectType: objConfig.type,
            objectName: objConfig.name,
            hasFactory: !!objConfig.factory,
            factoryClassName: objConfig.factory?.className
          })
        }
        
      } catch (error) {
        failureCount++
        logger.error('BaseScene', `Exception during game object creation: ${objConfig.id}`, {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          objectId: objConfig.id,
          objectType: objConfig.type
        })
      }
    }
    
    logger.info('BaseScene', 'Game objects creation batch completed', {
      totalRequested: gameObjects.length,
      successCount,
      failureCount,
      finalGameObjectCount: this.gameObjects.size,
      parentId: parent?.name || 'root'
    })
  }
  
  /**
   * Create a single game object from configuration using the Factory Pattern
   */
  private async createGameObjectFromConfig(objConfig: any, parent?: Phaser.GameObjects.Container): Promise<Phaser.GameObjects.GameObject | null> {
    logger.debug('BaseScene', 'Creating game object from config', {
      objectId: objConfig.id,
      objectType: objConfig.type,
      hasFactory: !!objConfig.factory,
      factoryClassName: objConfig.factory?.className,
      parentId: parent?.name || 'root'
    })
    
    try {
      let gameObject: Phaser.GameObjects.GameObject | null = null
      
      // Use Factory Pattern to create game objects
      if (objConfig.factory && objConfig.factory.className) {
        logger.debug('BaseScene', 'Using static factory method', {
          objectId: objConfig.id,
          className: objConfig.factory.className,
          createMethod: objConfig.factory.createMethod
        })
        
        // Use static factory method from concrete classes
        gameObject = await this.createGameObjectUsingStaticFactory(objConfig, parent)
        
        logger.debug('BaseScene', 'Static factory method completed', {
          objectId: objConfig.id,
          hasResult: !!gameObject,
          resultType: gameObject?.constructor.name,
          result: gameObject
        })
      } else {
        logger.debug('BaseScene', 'Using factory manager fallback', {
          objectId: objConfig.id,
          objectType: objConfig.type
        })
        
        // Fallback to factory manager
        gameObject = this.factoryManager.createGameObject(objConfig, this)
        
        logger.debug('BaseScene', 'Factory manager fallback completed', {
          objectId: objConfig.id,
          hasResult: !!gameObject,
          resultType: gameObject?.constructor.name,
          result: gameObject
        })
      }
      
      if (gameObject) {
        logger.debug('BaseScene', 'Game object created successfully, setting properties', {
          objectId: objConfig.id,
          phaserObjectType: gameObject.constructor.name,
          gameObjectName: gameObject.name
        })
        
        // Set position and size
        this.setGameObjectProperties(gameObject, objConfig)
        
                 // Add to parent if specified
         if (parent && parent instanceof Phaser.GameObjects.Container) {
           // Check if this is a wrapper object that needs to be added to scene instead
           if ((gameObject as any).phaserObject && (gameObject as any).phaserObject instanceof Phaser.GameObjects.Container) {
             logger.debug('BaseScene', 'Adding wrapper object to scene (not to parent container)', {
               objectId: objConfig.id,
               parentId: parent.name,
               reason: 'Wrapper objects should be added to scene, not parent containers'
             })
             this.add.existing(gameObject)
           } else {
             logger.debug('BaseScene', 'Adding game object to parent container', {
               objectId: objConfig.id,
               parentId: parent.name
             })
             parent.add(gameObject)
           }
         } else {
           logger.debug('BaseScene', 'Adding game object to scene', {
             objectId: objConfig.id
           })
           this.add.existing(gameObject)
         }
        
        logger.info('BaseScene', 'Game object fully created and added to scene', {
          objectId: objConfig.id,
          phaserObjectType: gameObject.constructor.name,
          gameObjectName: gameObject.name,
          addedToScene: true
        })
      } else {
        logger.error('BaseScene', 'Factory failed to create game object - returning null', {
          objectId: objConfig.id,
          objectType: objConfig.type,
          hasFactory: !!objConfig.factory,
          factoryClassName: objConfig.factory?.className,
          factoryCreateMethod: objConfig.factory?.createMethod
        })
      }
      
      return gameObject
      
    } catch (error) {
      logger.error('BaseScene', `Critical error creating game object from config: ${objConfig.id}`, {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        objectId: objConfig.id,
        objectType: objConfig.type,
        factory: objConfig.factory
      })
      return null
    }
  }
  
  /**
   * Create game object using static factory methods from concrete classes
   */
  private async createGameObjectUsingStaticFactory(objConfig: any, parent?: Phaser.GameObjects.Container): Promise<Phaser.GameObjects.GameObject | null> {
    logger.debug('BaseScene', 'Using static factory method', {
      objectId: objConfig.id,
      className: objConfig.factory.className,
      createMethod: objConfig.factory.createMethod
    })
    
    try {
      const { className, createMethod = 'createFromConfig' } = objConfig.factory
      
      logger.debug('BaseScene', 'Factory configuration parsed', {
        objectId: objConfig.id,
        className,
        createMethod
      })
      
      // Import the concrete class dynamically
      let ConcreteClass: any
      
      switch (className) {
        case 'BackgroundContainer':
          logger.debug('BaseScene', 'Loading BackgroundContainer class')
          try {
            // Use dynamic import for browser environment
            const BackgroundContainerModule = await import('../../object/container/BackgroundContainer')
            logger.debug('BaseScene', 'BackgroundContainer module loaded', {
              objectId: objConfig.id,
              moduleKeys: Object.keys(BackgroundContainerModule),
              hasBackgroundContainer: 'BackgroundContainer' in BackgroundContainerModule
            })
            ConcreteClass = BackgroundContainerModule.BackgroundContainer
            logger.debug('BaseScene', 'BackgroundContainer class extracted', {
              objectId: objConfig.id,
              hasClass: !!ConcreteClass,
              classType: typeof ConcreteClass,
              isConstructor: typeof ConcreteClass === 'function'
            })
          } catch (importError) {
            logger.error('BaseScene', 'Failed to import BackgroundContainer module', {
              objectId: objConfig.id,
              error: importError instanceof Error ? importError.message : String(importError)
            })
            return null
          }
          break
          
        case 'ConcreteContainer':
          logger.debug('BaseScene', 'Loading ConcreteContainer class')
          try {
            // Use dynamic import for browser environment
            const ConcreteContainerModule = await import('../../object/container/ConcreteContainer')
            logger.debug('BaseScene', 'ConcreteContainer module loaded', {
              objectId: objConfig.id,
              moduleKeys: Object.keys(ConcreteContainerModule),
              hasConcreteContainer: 'ConcreteContainer' in ConcreteContainerModule
            })
            ConcreteClass = ConcreteContainerModule.ConcreteContainer
            logger.debug('BaseScene', 'ConcreteContainer class extracted', {
              objectId: objConfig.id,
              hasClass: !!ConcreteClass,
              classType: typeof ConcreteClass,
              isConstructor: typeof ConcreteClass === 'function'
            })
          } catch (importError) {
            logger.error('BaseScene', 'Failed to import ConcreteContainer module', {
              objectId: objConfig.id,
              error: importError instanceof Error ? importError.message : String(importError)
            })
            return null
          }
          break
          
        default:
          logger.warn('BaseScene', `Unknown factory class: ${className}`, {
            objectId: objConfig.id,
            availableClasses: ['BackgroundContainer', 'ConcreteContainer']
          })
          return null
      }
      
      logger.debug('BaseScene', 'Concrete class loaded successfully', {
        objectId: objConfig.id,
        className,
        hasClass: !!ConcreteClass,
        hasCreateMethod: typeof ConcreteClass[createMethod] === 'function',
        classMethods: Object.getOwnPropertyNames(ConcreteClass).filter(name => typeof ConcreteClass[name] === 'function')
      })
      
      // Check if the class has the create method
      if (typeof ConcreteClass[createMethod] === 'function') {
        logger.debug('BaseScene', 'Calling static factory method', {
          objectId: objConfig.id,
          className,
          createMethod,
          config: objConfig,
          parent: parent ? { name: parent.name, type: parent.constructor.name } : null
        })
        
        try {
          const result = ConcreteClass[createMethod](objConfig, this, parent)
          
          logger.debug('BaseScene', 'Static factory method executed successfully', {
            objectId: objConfig.id,
            hasResult: !!result,
            resultType: result?.constructor.name,
            result: result ? {
              name: result.name,
              type: result.constructor.name,
              visible: result.visible,
              active: result.active
            } : null
          })
          
          return result
        } catch (methodError) {
          logger.error('BaseScene', 'Static factory method execution failed', {
            objectId: objConfig.id,
            className,
            createMethod,
            error: methodError instanceof Error ? methodError.message : String(methodError),
            stack: methodError instanceof Error ? methodError.stack : undefined
          })
          return null
        }
      } else {
        logger.warn('BaseScene', `Factory method '${createMethod}' not found in ${className}`, {
          objectId: objConfig.id,
          availableMethods: Object.getOwnPropertyNames(ConcreteClass).filter(name => typeof ConcreteClass[name] === 'function'),
          staticMethods: Object.getOwnPropertyNames(ConcreteClass).filter(name => typeof ConcreteClass[name] === 'function' && ConcreteClass[name].prototype === undefined)
        })
        return null
      }
      
    } catch (error) {
      logger.error('BaseScene', `Critical error using static factory for ${objConfig.id}:`, {
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        objectId: objConfig.id,
        className: objConfig.factory?.className,
        createMethod: objConfig.factory?.createMethod
      })
      return null
    }
  }
  
  /**
   * Set common game object properties
   */
  private setGameObjectProperties(gameObject: Phaser.GameObjects.GameObject, objConfig: any): void {
    logger.debug('BaseScene', 'Setting game object properties', {
      objectId: objConfig.id,
      hasSetPosition: 'setPosition' in gameObject,
      hasSetSize: 'setSize' in gameObject,
      config: {
        x: objConfig.x,
        y: objConfig.y,
        width: objConfig.width,
        height: objConfig.height,
        name: objConfig.name
      }
    });
    
    // Set position if the object supports it
    if (objConfig.x !== undefined && 'setPosition' in gameObject) {
      logger.debug('BaseScene', 'Setting position', {
        objectId: objConfig.id,
        x: objConfig.x,
        y: objConfig.y || 0
      });
      (gameObject as any).setPosition(objConfig.x, objConfig.y || 0)
    }
    
    // Set size if supported
    if (objConfig.width && objConfig.width !== 'fill') {
      if ('setSize' in gameObject) {
        logger.debug('BaseScene', 'Setting size', {
          objectId: objConfig.id,
          width: objConfig.width,
          height: objConfig.height || objConfig.width
        });
        (gameObject as any).setSize(objConfig.width, objConfig.height || objConfig.width)
      }
    }
    
    // Set name for debugging
    gameObject.name = objConfig.name || objConfig.id
    logger.debug('BaseScene', 'Set game object name', {
      objectId: objConfig.id,
      name: gameObject.name
    });
  }
  
  /**
   * Setup responsive behavior
   */
  private setupResponsiveBehavior(): void {
    logger.debug('BaseScene', 'Setting up responsive behavior')
    
    // Create resize handler
    const resizeHandler = () => {
      this.handleResize()
    }
    
    // Add resize event listener
    window.addEventListener('resize', resizeHandler)
    
    // Also listen to Phaser's resize events
    this.scale.on('resize', resizeHandler)
    
    // Log responsive config if available
    if (this.sceneConfigs.responsive) {
      logger.info('BaseScene', 'Responsive behavior setup completed with config', {
        scaleMode: this.game.scale.scaleMode,
        responsiveConfig: this.sceneConfigs.responsive
      })
    } else {
      logger.info('BaseScene', 'Responsive behavior setup completed (no config)', {
        scaleMode: this.game.scale.scaleMode
      })
    }
  }
  
  /**
   * Handle screen resize
   */
  private handleResize(): void {
    try {
      // Get new dimensions
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      
      // Check if we have responsive config
      if (this.sceneConfigs.responsive) {
        const deviceType = newWidth >= this.sceneConfigs.responsive.breakpoints.desktop ? 'desktop' : 'mobile'
        const behavior = this.sceneConfigs.responsive[deviceType]
        
        logger.debug('BaseScene', 'Resize with responsive config', {
          deviceType,
          behavior,
          newDimensions: { width: newWidth, height: newHeight }
        })
        
        // TODO: Apply responsive behavior to game objects
        // This will be implemented when responsive object handling is ready
      }
      
      // Log resize event
      logger.info('BaseScene', 'Screen resized', {
        newDimensions: { width: newWidth, height: newHeight },
        timestamp: Date.now()
      })
      
    } catch (error) {
      logger.error('BaseScene', 'Error handling resize', error)
    }
  }
  
  /**
   * Scene update (called every frame)
   */
  update(time: number, delta: number): void {
    // Configuration-driven updates can be added here later
    // For now, just log performance metrics occasionally
    if (time % 1000 < delta) { // Log every second
      logger.trace('BaseScene', 'Scene update', {
        time,
        delta,
        fps: Math.round(1000 / delta),
        gameObjectCount: this.gameObjects.size
      })
    }
  }
  
  /**
   * Scene shutdown
   */
  async shutdown(): Promise<void> {
    logger.debug('BaseScene', 'Scene shutdown started', {
      gameObjectCount: this.gameObjects.size
    })
    
    // Clean up game objects
    this.gameObjects.clear()
    
    // Log scene shutdown
    logger.info('BaseScene', 'Scene shutdown', {
      timestamp: Date.now()
    })
    
    // Flush logs before shutdown
    await logger.flushLogs()
  }
  
  /**
   * Get game object by ID
   */
  protected getGameObject(id: string): Phaser.GameObjects.GameObject | undefined {
    return this.gameObjects.get(id)
  }
  
  /**
   * Get all game objects
   */
  protected getAllGameObjects(): Map<string, Phaser.GameObjects.GameObject> {
    return this.gameObjects
  }
  
  /**
   * Check if game object exists
   */
  protected hasGameObject(id: string): boolean {
    return this.gameObjects.has(id)
  }
}
