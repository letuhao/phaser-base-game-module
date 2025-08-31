import Phaser from 'phaser'
import { ConfigManager } from '../../core/ConfigManager'
import { Logger } from '../../core/Logger'
import { GameObjectFactoryManager } from '../../factory/GameObjectFactoryManager'
import { ResponsiveConfigLoader } from '../../core/ResponsiveConfigLoader'
import { ThemeConfigLoader } from '../../core/ThemeConfigLoader'

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
  protected logger: Logger = Logger.getInstance()
  
  // NEW: Responsive and theme configuration loaders
  protected responsiveConfigLoader: ResponsiveConfigLoader
  protected themeConfigLoader: ThemeConfigLoader
  
  // NEW: Cached responsive configurations for performance
  protected cachedResponsiveConfigs: Map<string, any> = new Map()
  protected currentBreakpoint: string = 'default'
  protected lastResizeWidth: number = 0

  constructor(sceneKey: string) {
    super({ key: sceneKey })
    this.configManager = ConfigManager.getInstance()
    this.factoryManager = GameObjectFactoryManager.getInstance()
    
    // Initialize responsive and theme loaders
    this.responsiveConfigLoader = ResponsiveConfigLoader.getInstance()
    this.themeConfigLoader = ThemeConfigLoader.getInstance()

    this.logger.debug('BaseScene', 'BaseScene constructor called', {
      sceneKey,
      timestamp: Date.now()
    }, 'constructor')
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
    this.logger.debug('BaseScene', 'Scene preload() method started', {
      sceneKey: this.scene.key,
      timestamp: Date.now()
    }, 'preload')

    try {
      // Load background images from asset configuration
      if (this.sceneConfigs.asset && this.sceneConfigs.asset.backgrounds) {
        this.logger.debug('BaseScene', 'Loading background images', {
          backgroundKeys: Object.keys(this.sceneConfigs.asset.backgrounds)
        })

        // Load desktop background
        if (this.sceneConfigs.asset.backgrounds.desktop) {
          const desktopBg = this.sceneConfigs.asset.backgrounds.desktop
          const desktopPath = this.sceneConfigs.asset.basePath + desktopBg.path
          this.logger.debug('BaseScene', 'Loading desktop background', {
            key: desktopBg.key,
            path: desktopPath
          })
          this.load.image(desktopBg.key, desktopPath)
        }

        // Load mobile background
        if (this.sceneConfigs.asset.backgrounds.mobile) {
          const mobileBg = this.sceneConfigs.asset.backgrounds.mobile
          const mobilePath = this.sceneConfigs.asset.basePath + mobileBg.path
          this.logger.debug('BaseScene', 'Loading mobile background', {
            key: mobileBg.key,
            path: mobilePath
          })
          this.load.image(mobileBg.key, mobilePath)
        }

        // Load mobile origin background (optional)
        if (this.sceneConfigs.asset.backgrounds.mobileOrigin) {
          const mobileOriginBg = this.sceneConfigs.asset.backgrounds.mobileOrigin
          const mobileOriginPath = this.sceneConfigs.asset.basePath + mobileOriginBg.path
          this.logger.debug('BaseScene', 'Loading mobile origin background', {
            key: mobileOriginBg.key,
            path: mobileOriginPath
          })
          this.load.image(mobileOriginBg.key, mobileOriginPath)
        }

        this.logger.info('BaseScene', 'Background images loaded successfully')
      } else {
        this.logger.warn('BaseScene', 'No asset configuration found for background images')
      }

    } catch (error) {
      this.logger.error('BaseScene', 'Error in scene preload', error)
      throw error
    }
  }

  /**
   * Wait for assets to finish loading
   */
  private async waitForAssetsToLoad(): Promise<void> {
    this.logger.debug('BaseScene', 'Waiting for assets to load')

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
          this.logger.info('BaseScene', 'All assets loaded successfully')
          resolve()
        })

        this.load.once('loaderror', (file: any) => {
          clearTimeout(timeout)
          this.logger.warn('BaseScene', 'Asset load error', { file })
          resolve() // Continue anyway
        })
      })

    } catch (error) {
      this.logger.warn('BaseScene', 'Asset loading error or timeout, continuing anyway', error)
    }
  }

  /**
   * Scene initialization - purely configuration-driven
   */
  async create(): Promise<void> {
    this.logger.debug('BaseScene', 'Scene create() method started', {
      sceneKey: this.scene.key,
      gameWidth: this.game.config.width,
      gameHeight: this.game.config.height,
      timestamp: Date.now()
    }, 'create')

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
      this.logger.info('BaseScene', 'Scene created', {
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
      this.logger.info('BaseScene', 'Scene setup completed', {
        gameSize: { width: Number(this.game.config.width), height: Number(this.game.config.height) },
        scaleMode: this.game.scale.scaleMode,
        gameObjectCount: this.gameObjects.size
      }, 'create')

      // Flush logs to ensure they're sent to server
      await this.logger.flushLogs()

    } catch (error) {
      this.logger.error('BaseScene', 'Critical error in scene creation', error, 'create')
      await this.logger.flushLogs()
      throw error
    }
  }

  /**
   * Load all scene configurations
   */
  private loadSceneConfigs(): void {
    this.logger.debug('BaseScene', 'Starting to load scene configurations', undefined, 'loadSceneConfigs')

    try {
      const sceneName = this.getSceneName()

      // Load all configurations
      this.sceneConfigs = this.configManager.loadSceneConfigs(sceneName)

      this.logger.debug('BaseScene', 'Scene configurations loaded', {
        sceneName,
        sceneConfigs: this.sceneConfigs,
        configKeys: Object.keys(this.sceneConfigs)
      }, 'loadSceneConfigs')

      if (this.sceneConfigs.logging) {
        this.logger.info('BaseScene', 'All scene configurations loaded successfully', undefined, 'loadSceneConfigs')
      } else {
        this.logger.warn('BaseScene', 'Failed to load some scene configurations', undefined, 'loadSceneConfigs')
      }

    } catch (error) {
      this.logger.error('BaseScene', 'Error loading scene configurations', error, 'loadSceneConfigs')
      throw error
    }
  }

  /**
   * Initialize scene purely from configuration
   */
  private async initializeSceneFromConfig(): Promise<void> {
    this.logger.debug('BaseScene', 'Starting scene initialization from config', undefined, 'initializeSceneFromConfig')

    try {
      if (!this.sceneConfigs.scene) {
        this.logger.warn('BaseScene', 'No scene configuration available', {
          availableConfigs: Object.keys(this.sceneConfigs)
        })
        return
      }

      const sceneConfig = this.sceneConfigs.scene
      this.logger.debug('BaseScene', 'Scene config found', {
        sceneName: sceneConfig.sceneName,
        gameObjectCount: sceneConfig.gameObjects?.length || 0,
        backgroundColor: sceneConfig.backgroundColor
      }, 'initializeSceneFromConfig')

      // NEW: Register responsive config with ResponsiveConfigLoader
      if (this.sceneConfigs.responsive) {
        const sceneName = this.getSceneName()
        this.responsiveConfigLoader.registerConfig(sceneName, this.sceneConfigs.responsive)
        this.logger.info('BaseScene', 'Responsive config registered', {
          sceneName,
          configKeys: Object.keys(this.sceneConfigs.responsive),
          hasDefault: !!this.sceneConfigs.responsive.default,
          defaultObjectCount: this.sceneConfigs.responsive.default?.length || 0
        })
        
        // Cache responsive configs for performance
        this.cacheResponsiveConfigs()
      } else {
        this.logger.error('BaseScene', 'No responsive configuration found - scene cannot function properly')
        throw new Error('Responsive configuration is required for scene functionality')
      }

      // NEW: Set active theme if specified (now loaded via ConfigManager)
      if (this.sceneConfigs.theme) {
        this.themeConfigLoader.setActiveTheme(this.sceneConfigs.theme.themeName)
        this.logger.info('BaseScene', 'Theme activated', {
          themeName: this.sceneConfigs.theme.themeName,
          hasThemeClasses: !!this.sceneConfigs.theme.themeClasses
        })
      } else {
        this.logger.warn('BaseScene', 'No theme configuration found - using default styling')
      }

      // Set scene background color from config
      if (sceneConfig.backgroundColor) {
        this.logger.debug('BaseScene', 'Setting scene background color', {
          backgroundColor: sceneConfig.backgroundColor
        }, 'initializeSceneFromConfig')
        this.cameras.main.setBackgroundColor(sceneConfig.backgroundColor)
      }

      // Create game objects from configuration
      if (sceneConfig.gameObjects && sceneConfig.gameObjects.length > 0) {
        this.logger.debug('BaseScene', 'Creating game objects from config', {
          gameObjectCount: sceneConfig.gameObjects.length,
          gameObjectIds: sceneConfig.gameObjects.map((obj: any) => obj.id)
        }, 'initializeSceneFromConfig')
        await this.createGameObjectsFromConfig(sceneConfig.gameObjects)
      } else {
        this.logger.warn('BaseScene', 'No game objects found in scene config', undefined, 'initializeSceneFromConfig')
      }

      // Trigger initial resize for all game objects after creation is complete
      // This ensures proper positioning and sizing from the start
      this.logger.debug('BaseScene', 'Triggering initial resize for all game objects', {
        gameObjectCount: this.gameObjects.size,
        gameObjectIds: Array.from(this.gameObjects.keys())
      }, 'initializeSceneFromConfig')

      await this.triggerInitialResize()

      this.logger.info('BaseScene', 'Scene initialized from configuration', {
        sceneName: sceneConfig.sceneName,
        gameObjectCount: sceneConfig.gameObjects?.length || 0,
        backgroundColor: sceneConfig.backgroundColor,
        createdGameObjects: this.gameObjects.size
      })

    } catch (error) {
      this.logger.error('BaseScene', 'Error initializing scene from config', error)
      throw error
    }
  }

  /**
   * Create game objects recursively from configuration using Factory Pattern
   * FIXED: Creates containers first, then children to ensure proper sizing
   */
  private async createGameObjectsFromConfig(gameObjects: any[], parent?: Phaser.GameObjects.Container): Promise<void> {
    this.logger.debug('BaseScene', 'Creating game objects recursively', {
      gameObjectCount: gameObjects.length,
      parentId: parent?.name || 'root',
      gameObjectIds: gameObjects.map((obj: any) => obj.id)
    })

    let successCount = 0
    let failureCount = 0

    // PHASE 1: Create all containers first (without children)
    const containers: Array<{ config: any; gameObject: any; phaserContainer: any }> = [];
    
    for (const objConfig of gameObjects) {
      try {
        this.logger.debug('BaseScene', 'Starting creation of game object', {
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
          this.logger.debug('BaseScene', 'Game object created successfully', {
            objectId: objConfig.id,
            objectType: objConfig.type,
            phaserObjectType: gameObject.constructor.name,
            gameObjectName: gameObject.name
          })

          // Store reference to game object
          this.gameObjects.set(objConfig.id, gameObject)
          this.logger.debug('BaseScene', 'Game object stored in scene map', {
            objectId: objConfig.id,
            totalGameObjects: this.gameObjects.size
          })

          // Check if this is a container and store for later child creation
          if (objConfig.children && objConfig.children.length > 0) {
            if (gameObject instanceof Phaser.GameObjects.Container ||
              (gameObject as any).phaserObject instanceof Phaser.GameObjects.Container) {

              // Get the actual Phaser container for adding children
              const phaserContainer = gameObject instanceof Phaser.GameObjects.Container
                ? gameObject
                : (gameObject as any).phaserObject

              containers.push({ config: objConfig, gameObject, phaserContainer });
              
              this.logger.debug('BaseScene', 'Container stored for later child creation', {
                objectId: objConfig.id,
                containerType: gameObject.constructor.name,
                phaserContainerType: phaserContainer.constructor.name,
                childCount: objConfig.children.length
              })
            } else {
              this.logger.warn('BaseScene', `Cannot add children to non-container object: ${objConfig.id}`, {
                objectType: objConfig.type,
                phaserObjectType: gameObject.constructor.name
              })
            }
          }
        } else {
          failureCount++
          this.logger.error('BaseScene', 'Failed to create game object - createGameObjectFromConfig returned null', {
            objectId: objConfig.id,
            objectType: objConfig.type,
            objectName: objConfig.name,
            hasFactory: !!objConfig.factory,
            factoryClassName: objConfig.factory?.className
          })
        }

      } catch (error) {
        failureCount++
        this.logger.error('BaseScene', `Exception during game object creation: ${objConfig.id}`, {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          objectId: objConfig.id,
          objectType: objConfig.type
        })
      }
    }

    // PHASE 2: Create all children after containers are ready
    for (const { config: objConfig, phaserContainer } of containers) {
      try {
        this.logger.debug('BaseScene', 'Creating children for container', {
          objectId: objConfig.id,
          childCount: objConfig.children.length,
          childIds: objConfig.children.map((child: any) => child.id)
        })

        await this.createGameObjectsFromConfig(objConfig.children, phaserContainer)
        
      } catch (error) {
        this.logger.error('BaseScene', `Exception during child creation for container: ${objConfig.id}`, {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          objectId: objConfig.id,
          objectType: objConfig.type
        })
      }
    }

    this.logger.info('BaseScene', 'Game objects creation batch completed', {
      totalRequested: gameObjects.length,
      successCount,
      failureCount,
      finalGameObjectCount: this.gameObjects.size,
      parentId: parent?.name || 'root'
    })
  }

  /**
   * Trigger initial resize for all game objects after creation
   * This ensures proper positioning and sizing from the start
   */
  private async triggerInitialResize(): Promise<void> {
    this.logger.debug('BaseScene', 'Starting initial resize for all game objects', {
      gameObjectCount: this.gameObjects.size,
      gameObjectIds: Array.from(this.gameObjects.keys())
    }, 'triggerInitialResize')

    try {
      // Get current game dimensions
      const gameWidth = this.game.config.width as number
      const gameHeight = this.game.config.height as number

      this.logger.debug('BaseScene', 'Game dimensions for initial resize', {
        gameWidth,
        gameHeight,
        gameObjectCount: this.gameObjects.size
      }, 'triggerInitialResize')

      // Trigger resize for all game objects
      for (const [objectId, gameObject] of this.gameObjects) {
        try {
          // Check if the game object has a resize method (our wrapper objects)
          if ((gameObject as any).resize && typeof (gameObject as any).resize === 'function') {
            this.logger.debug('BaseScene', 'Triggering resize for wrapper object', {
              objectId,
              objectType: gameObject.constructor.name,
              hasResizeMethod: true,
              hasResponsiveResizeMethod: false
            }, 'triggerInitialResize');

            // Call resize with current game dimensions
            (gameObject as any).resize(gameWidth, gameHeight)
          } else if ((gameObject as any).handleResponsiveResize && typeof (gameObject as any).handleResponsiveResize === 'function') {
            // Check if the game object has a responsive resize method (shapes like Rectangle)
            this.logger.debug('BaseScene', 'Triggering responsive resize for shape object', {
              objectId,
              objectType: gameObject.constructor.name,
              hasResponsiveResizeMethod: true
            }, 'triggerInitialResize');

            // Call handleResponsiveResize with current game dimensions
            (gameObject as any).handleResponsiveResize(gameWidth, gameHeight)
          } else if (gameObject instanceof Phaser.GameObjects.Container) {
            this.logger.debug('BaseScene', 'Skipping resize for Phaser container (no wrapper)', {
              objectId,
              objectType: gameObject.constructor.name,
              hasResizeMethod: false
            }, 'triggerInitialResize')
          } else {
            this.logger.debug('BaseScene', 'Skipping resize for non-container object', {
              objectId,
              objectType: gameObject.constructor.name,
              hasResizeMethod: false,
              hasResponsiveResizeMethod: false
            }, 'triggerInitialResize')
          }
        } catch (error) {
          this.logger.error('BaseScene', `Error during initial resize for object: ${objectId}`, {
            error: error instanceof Error ? error.message : String(error),
            objectId,
            objectType: gameObject.constructor.name
          }, 'triggerInitialResize')
        }
      }

      this.logger.info('BaseScene', 'Initial resize completed for all game objects', {
        gameObjectCount: this.gameObjects.size,
        gameWidth,
        gameHeight
      }, 'triggerInitialResize')

    } catch (error) {
      this.logger.error('BaseScene', 'Error during initial resize process', {
        error: error instanceof Error ? error.message : String(error),
        gameObjectCount: this.gameObjects.size
      }, 'triggerInitialResize')
    }
  }

  /**
   * Create a single game object from configuration using the Factory Pattern
   */
  private async createGameObjectFromConfig(objConfig: any, parent?: Phaser.GameObjects.Container): Promise<Phaser.GameObjects.GameObject | null> {
    this.logger.debug('BaseScene', 'Creating game object from config', {
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
        this.logger.debug('BaseScene', 'Using static factory method', {
          objectId: objConfig.id,
          className: objConfig.factory.className,
          createMethod: objConfig.factory.createMethod
        })

        // Use static factory method from concrete classes
        gameObject = await this.createGameObjectUsingStaticFactory(objConfig, parent)

        this.logger.debug('BaseScene', 'Static factory method completed', {
          objectId: objConfig.id,
          hasResult: !!gameObject,
          resultType: gameObject?.constructor.name,
          result: gameObject
        })
      } else {
        this.logger.debug('BaseScene', 'Using factory manager fallback', {
          objectId: objConfig.id,
          objectType: objConfig.type
        })

        // Fallback to factory manager
        gameObject = this.factoryManager.createGameObject(objConfig, this)

        this.logger.debug('BaseScene', 'Factory manager fallback completed', {
          objectId: objConfig.id,
          hasResult: !!gameObject,
          resultType: gameObject?.constructor.name,
          result: gameObject
        })
      }

      if (gameObject) {
        this.logger.debug('BaseScene', 'Game object created successfully, setting properties', {
          objectId: objConfig.id,
          phaserObjectType: gameObject.constructor.name,
          gameObjectName: gameObject.name
        })

        // Set position and size
        this.setGameObjectProperties(gameObject, objConfig)

                                   // Add to parent if specified
          if (parent && parent instanceof Phaser.GameObjects.Container) {
            // ALL objects (including wrapper objects) should be added to parent containers
            // This maintains the proper hierarchy: background-container > footer-container > footer-rectangle
            this.logger.debug('BaseScene', 'Adding game object to parent container', {
              objectId: objConfig.id,
              parentId: parent.name,
              objectType: gameObject.constructor.name,
              isWrapperObject: !!(gameObject as any).phaserObject
            })
            
            // Use our custom addChild method if the parent has it, otherwise fall back to Phaser's add
            if ((parent as any).addChild && typeof (parent as any).addChild === 'function') {
              (parent as any).addChild(gameObject)
            } else {
              parent.add(gameObject)
            }
          } else {
            this.logger.debug('BaseScene', 'Adding game object to scene', {
              objectId: objConfig.id
            })
            this.add.existing(gameObject)
          }

        this.logger.info('BaseScene', 'Game object fully created and added to scene', {
          objectId: objConfig.id,
          phaserObjectType: gameObject.constructor.name,
          gameObjectName: gameObject.name,
          addedToScene: true
        })
      } else {
        this.logger.error('BaseScene', 'Factory failed to create game object - returning null', {
          objectId: objConfig.id,
          objectType: objConfig.type,
          hasFactory: !!objConfig.factory,
          factoryClassName: objConfig.factory?.className,
          factoryCreateMethod: objConfig.factory?.createMethod
        })
      }

      return gameObject

    } catch (error) {
      this.logger.error('BaseScene', `Critical error creating game object from config: ${objConfig.id}`, {
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
    this.logger.debug('BaseScene', 'Using static factory method', {
      objectId: objConfig.id,
      className: objConfig.factory.className,
      createMethod: objConfig.factory.createMethod
    })

    try {
      const { className, createMethod = 'createFromConfig' } = objConfig.factory

      this.logger.debug('BaseScene', 'Factory configuration parsed', {
        objectId: objConfig.id,
        className,
        createMethod
      })

      // Use the factory manager to create the game object
      // This delegates the responsibility to the proper factory system
      const gameObject = await this.factoryManager.createGameObjectWithStaticFactory(objConfig, this, parent)

      this.logger.debug('BaseScene', 'Static factory method completed', {
        objectId: objConfig.id,
        hasResult: !!gameObject,
        resultType: gameObject?.constructor.name,
        result: gameObject ? {
          name: gameObject.name,
          type: gameObject.constructor.name,
          visible: (gameObject as any).visible,
          active: (gameObject as any).active
        } : null
      })

      return gameObject

    } catch (error) {
      this.logger.error('BaseScene', `Critical error using static factory for ${objConfig.id}:`, {
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
    this.logger.debug('BaseScene', 'Setting game object properties', {
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
      let x = objConfig.x;
      let y = objConfig.y || 0;
      
             // Handle "fill" positioning for y coordinate
       if (typeof y === 'string' && y === 'fill') {
         // Position at the bottom of the parent or scene
         const parentContainer = this.getParentContainer(gameObject);
         if (parentContainer) {
           // For "fill" y, position at the bottom of the parent container
           y = parentContainer.height;
           this.logger.debug('BaseScene', 'Resolved fill y position from parent', {
             objectId: objConfig.id,
             parentHeight: parentContainer.height,
             resolvedY: y
           });
         } else {
           // Fallback to scene height
           y = this.game.config.height as number;
           this.logger.debug('BaseScene', 'Using scene height for fill y position', {
             objectId: objConfig.id,
             sceneHeight: y
           });
         }
       }
      
      this.logger.debug('BaseScene', 'Setting position', {
        objectId: objConfig.id,
        x: x,
        y: y
      });
      (gameObject as any).setPosition(x, y)
    }

    // Set size if supported
    if (objConfig.width && objConfig.width !== 'fill') {
      if ('setSize' in gameObject) {
        this.logger.debug('BaseScene', 'Setting size', {
          objectId: objConfig.id,
          width: objConfig.width,
          height: objConfig.height || objConfig.width
        });
        (gameObject as any).setSize(objConfig.width, objConfig.height || objConfig.width)
      }
    }

    // Set name for debugging
    gameObject.name = objConfig.name || objConfig.id
    this.logger.debug('BaseScene', 'Set game object name', {
      objectId: objConfig.id,
      name: gameObject.name
    });

    // Set z-order if specified
    if (objConfig.zOrder !== undefined && 'setDepth' in gameObject) {
      this.logger.debug('BaseScene', 'Setting z-order', {
        objectId: objConfig.id,
        zOrder: objConfig.zOrder
      });
      (gameObject as any).setDepth(objConfig.zOrder);
    }
  }

  /**
   * Setup responsive behavior
   */
  private setupResponsiveBehavior(): void {
    this.logger.debug('BaseScene', 'Setting up responsive behavior')

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
      this.logger.info('BaseScene', 'Responsive behavior setup completed with config', {
        scaleMode: this.game.scale.scaleMode,
        responsiveConfig: this.sceneConfigs.responsive
      })
    } else {
      this.logger.info('BaseScene', 'Responsive behavior setup completed (no config)', {
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

      this.logger.debug('BaseScene', 'Screen resize detected', {
        newDimensions: { width: newWidth, height: newHeight },
        gameObjectCount: this.gameObjects.size
      })

      // Find the root container (the one without a parent)
      const rootContainer = this.findRootContainer()
      
      if (rootContainer) {
        this.logger.debug('BaseScene', 'Found root container, triggering resize', {
          rootContainerId: rootContainer.name || 'unnamed',
          rootContainerType: rootContainer.constructor.name
        })

        // Call resize on the root container
        if (typeof (rootContainer as any).resize === 'function') {
          (rootContainer as any).resize(newWidth, newHeight)
        } else {
          this.logger.warn('BaseScene', 'Root container does not have resize method', {
            rootContainerId: rootContainer.name || 'unnamed',
            rootContainerType: rootContainer.constructor.name
          })
        }
      } else {
        this.logger.warn('BaseScene', 'No root container found for resize propagation')
      }

      // Log resize event
      this.logger.info('BaseScene', 'Screen resized', {
        newDimensions: { width: newWidth, height: newHeight },
        timestamp: Date.now()
      })

    } catch (error) {
      this.logger.error('BaseScene', 'Error handling resize', error)
    }
  }

  /**
   * Scene update (called every frame)
   */
  update(time: number, delta: number): void {
    // Configuration-driven updates can be added here later
    // For now, just log performance metrics occasionally
    if (time % 1000 < delta) { // Log every second
      this.logger.trace('BaseScene', 'Scene update', {
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
    this.logger.debug('BaseScene', 'Scene shutdown started', {
      gameObjectCount: this.gameObjects.size
    })

    // Clean up game objects
    this.gameObjects.clear()

    // Log scene shutdown
    this.logger.info('BaseScene', 'Scene shutdown', {
      timestamp: Date.now()
    })

    // Flush logs before shutdown
    await this.logger.flushLogs()
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

  /**
   * Find the root container (the first game object in the scene config)
   */
  private findRootContainer(): Phaser.GameObjects.Container | null {
    // First, try to find the first game object from the scene config
    if (this.sceneConfigs.scene && this.sceneConfigs.scene.gameObjects && this.sceneConfigs.scene.gameObjects.length > 0) {
      const firstGameObjectId = this.sceneConfigs.scene.gameObjects[0].id
      const firstGameObject = this.gameObjects.get(firstGameObjectId)
      
      if (firstGameObject && firstGameObject instanceof Phaser.GameObjects.Container) {
        this.logger.debug('BaseScene', 'Found root container from scene config', {
          rootContainerId: firstGameObject.name || firstGameObjectId,
          rootContainerType: firstGameObject.constructor.name
        })
        return firstGameObject
      }
    }
    
    // Fallback: Look for a container that has no parent
    for (const gameObject of this.gameObjects.values()) {
      if (gameObject instanceof Phaser.GameObjects.Container) {
        // Check if this container has no parent
        if (!(gameObject as any).parent) {
          this.logger.debug('BaseScene', 'Found root container by parent check', {
            rootContainerId: gameObject.name || 'unnamed',
            rootContainerType: gameObject.constructor.name
          })
          return gameObject
        }
      }
    }
    
    this.logger.warn('BaseScene', 'No root container found')
    return null
  }

  /**
   * Get the parent container for a game object
   */
  private getParentContainer(gameObject: Phaser.GameObjects.GameObject): Phaser.GameObjects.Container | null {
    // Check if the game object has a parent property
    if ((gameObject as any).parent) {
      return (gameObject as any).parent;
    }
    
    // Check if the game object is a child of any container in the scene
    for (const [_, sceneGameObject] of this.gameObjects) {
      if (sceneGameObject instanceof Phaser.GameObjects.Container) {
        // Check if the game object is a child of this container
        const children = (sceneGameObject as any).list || [];
        if (children.includes(gameObject)) {
          return sceneGameObject;
        }
      }
    }
    
    return null;
  }
  
  /**
   * Cache responsive configurations for performance
   * This prevents lag during resize by pre-loading all configs
   */
  private cacheResponsiveConfigs(): void {
    this.logger.debug('BaseScene', 'Caching responsive configurations for performance')
    
    try {
      if (!this.sceneConfigs.responsive) {
        this.logger.warn('BaseScene', 'No responsive config to cache')
        return
      }
      
      const responsiveConfig = this.sceneConfigs.responsive
      
      // Cache default breakpoint
      if (responsiveConfig.default) {
        responsiveConfig.default.forEach((layout: any) => {
          this.cachedResponsiveConfigs.set(`default-${layout.id}`, layout)
        })
      }
      
      // Cache all breakpoint configurations
      Object.entries(responsiveConfig.responsiveSettings).forEach(([breakpointKey, layouts]) => {
        (layouts as any[]).forEach((layout: any) => {
          this.cachedResponsiveConfigs.set(`${breakpointKey}-${layout.id}`, layout)
        })
      })
      
      this.logger.info('BaseScene', 'Responsive configurations cached successfully', {
        totalCached: this.cachedResponsiveConfigs.size,
        breakpoints: Object.keys(responsiveConfig.responsiveSettings),
        defaultCount: responsiveConfig.default?.length || 0
      })
      
    } catch (error) {
      this.logger.error('BaseScene', 'Error caching responsive configurations', error)
    }
  }
  
  /**
   * Get cached responsive configuration for an object and breakpoint
   */
  protected getCachedResponsiveConfig(objectId: string, breakpoint: string = 'default'): any {
    const cacheKey = `${breakpoint}-${objectId}`
    return this.cachedResponsiveConfigs.get(cacheKey)
  }
  
  /**
   * Get current breakpoint based on screen width
   */
  protected getCurrentBreakpoint(width: number): string {
    if (width < 576) return 'xs'
    if (width < 768) return 'sm'
    if (width < 992) return 'md'
    if (width < 1200) return 'lg'
    return 'xl'
  }
  
  /**
   * Pass responsive and theme configs to game objects
   * This method is called by game objects to get their configurations
   */
  protected getGameObjectConfigs(_objectId: string): {
    responsive: any
    theme: any
    currentBreakpoint: string
  } {
    const currentWidth = this.game.config.width as number
    const currentBreakpoint = this.getCurrentBreakpoint(currentWidth)
    
    // Return the full responsive configuration structure that Container expects
    return {
      responsive: this.sceneConfigs.responsive,
      theme: this.sceneConfigs.theme,
      currentBreakpoint
    }
  }
}
