import Phaser from 'phaser';
import { ConfigManager } from '../../core/ConfigManager';
import { IConfigManager } from '../../core/interfaces';
import { Logger } from '../../core/Logger';
import { GameObjectFactoryManager } from '../../factory/GameObjectFactoryManager';
import { ResponsiveConfigLoader } from '../../core/ResponsiveConfigLoader';
import { ThemeActivator } from '../../layout/classes/ThemeActivator';
import { IThemeActivator } from '../../layout/interfaces/IThemeActivator';
import { ThemeElementType } from '../../layout/enums/LayoutEnums';
// ThemeConfigLoader is deprecated - themes are now managed directly via ConfigManager

/**
 * Base Scene Class
 * Provides common functionality for all scenes including:
 * - Configuration management
 * - Factory-based game object creation
 * - Responsive behavior
 * - Common scene lifecycle methods
 */
export abstract class BaseScene extends Phaser.Scene {
  protected configManager: IConfigManager;
  protected sceneConfigs: any = {};
  protected gameObjects: Map<string, Phaser.GameObjects.GameObject> = new Map();
  protected factoryManager: GameObjectFactoryManager;
  protected logger: Logger = Logger.getInstance();

  // NEW: Responsive configuration loader
  protected responsiveConfigLoader: ResponsiveConfigLoader;

  // NEW: Theme activator for theme management
  protected themeActivator: IThemeActivator;

  // NEW: Cached responsive configurations for performance
  protected cachedResponsiveConfigs: Map<string, any> = new Map();
  protected currentBreakpoint: string = 'default';
  protected lastResizeWidth: number = 0;

  constructor(sceneKey: string) {
    super({ key: sceneKey });
    this.configManager = ConfigManager.getInstance();
    this.factoryManager = GameObjectFactoryManager.getInstance();

    // Initialize responsive loader
    this.responsiveConfigLoader = ResponsiveConfigLoader.getInstance();

    // Initialize theme activator
    this.themeActivator = new ThemeActivator();

    this.logger.trace('BaseScene', 'super', 'BaseScene constructor called', {
      sceneKey,
      timestamp: Date.now(),
    });
  }

  /**
   * Abstract method that concrete scenes must implement
   * to register their specific configurations
   */
  protected abstract registerSceneConfigs(): void;

  /**
   * Abstract method that concrete scenes must implement
   * to get their scene name for configuration loading
   */
  protected abstract getSceneName(): string;

  /**
   * Preload assets before scene creation
   * This method is called manually after configurations are loaded
   */
  preload(): void {
    this.logger.trace('BaseScene', 'preload', 'Scene preload() method started', {
      sceneKey: this.scene.key,
      timestamp: Date.now(),
    });

    try {
      // Load background images from asset configuration
      if (this.sceneConfigs.asset && this.sceneConfigs.asset.backgrounds) {
        this.logger.trace('BaseScene', 'preload', 'Loading background images', {
          backgroundKeys: Object.keys(this.sceneConfigs.asset.backgrounds),
        });

        // Load desktop background
        if (this.sceneConfigs.asset.backgrounds.desktop) {
          const desktopBg = this.sceneConfigs.asset.backgrounds.desktop;
          const desktopPath = this.sceneConfigs.asset.basePath + desktopBg.path;
          this.logger.trace('BaseScene', 'preload', 'Loading desktop background', {
            key: desktopBg.key,
            path: desktopPath,
          });
          this.load.image(desktopBg.key, desktopPath);
        }

        // Load mobile background
        if (this.sceneConfigs.asset.backgrounds.mobile) {
          const mobileBg = this.sceneConfigs.asset.backgrounds.mobile;
          const mobilePath = this.sceneConfigs.asset.basePath + mobileBg.path;
          this.logger.trace('BaseScene', 'preload', 'Loading mobile background', {
            key: mobileBg.key,
            path: mobilePath,
          });
          this.load.image(mobileBg.key, mobilePath);
        }

        // Load mobile origin background (optional)
        if (this.sceneConfigs.asset.backgrounds.mobileOrigin) {
          const mobileOriginBg = this.sceneConfigs.asset.backgrounds.mobileOrigin;
          const mobileOriginPath = this.sceneConfigs.asset.basePath + mobileOriginBg.path;
          this.logger.trace('BaseScene', 'preload', 'Loading mobile origin background', {
            key: mobileOriginBg.key,
            path: mobileOriginPath,
          });
          this.load.image(mobileOriginBg.key, mobileOriginPath);
        }

        this.logger.info('BaseScene', 'preload', 'Background images loaded successfully');
      } else {
        this.logger.warn(
          'BaseScene',
          'preload',
          'preload',
          'No asset configuration found for background images'
        );
      }
    } catch (error) {
      this.logger.error('BaseScene', 'preload', 'Error in scene preload', error);
      throw error;
    }
  }

  /**
   * Wait for assets to finish loading
   */
  private async waitForAssetsToLoad(): Promise<void> {
    this.logger.debug(
      'BaseScene',
      'waitForAssetsToLoad',
      'waitForAssetsToLoad',
      'Waiting for assets to load'
    );

    try {
      // Start the loader if it hasn't been started
      if (!this.load.isLoading()) {
        this.load.start();
      }

      // Wait for the loader to complete
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Asset loading timeout'));
        }, 10000); // 10 second timeout

        this.load.once('complete', () => {
          clearTimeout(timeout);
          this.logger.info(
            'BaseScene',
            'clearTimeout',
            'clearTimeout',
            'All assets loaded successfully'
          );
          resolve();
        });

        this.load.once('loaderror', (file: any) => {
          clearTimeout(timeout);
          this.logger.warn('BaseScene', 'clearTimeout', 'Asset load error', { file });
          resolve(); // Continue anyway
        });
      });
    } catch (error) {
      this.logger.warn(
        'BaseScene',
        'resolve',
        'Asset loading error or timeout, continuing anyway',
        error
      );
    }
  }

  /**
   * Scene initialization - purely configuration-driven
   */
  async create(): Promise<void> {
    this.logger.trace('BaseScene', 'create', 'Scene create() method started', {
      sceneKey: this.scene.key,
      gameWidth: this.game.config.width,
      gameHeight: this.game.config.height,
      timestamp: Date.now(),
    });

    try {
      // Register scene-specific configurations
      this.registerSceneConfigs();

      // Load all scene configurations after registration
      this.loadSceneConfigs();

      // Preload assets (background images) now that configs are loaded
      this.preload();

      // Wait for assets to load before proceeding
      await this.waitForAssetsToLoad();

      // Log scene creation
      this.logger.info('BaseScene', 'create', 'Scene created', {
        sceneKey: this.scene.key,
        gameWidth: this.game.config.width,
        gameHeight: this.game.config.height,
        timestamp: Date.now(),
      });

      // Initialize scene based on configuration
      await this.initializeSceneFromConfig();

      // Setup responsive behavior
      this.setupResponsiveBehavior();

      // Log scene setup completion
      this.logger.info('BaseScene', 'create', 'Scene setup completed', {
        gameSize: {
          width: Number(this.game.config.width),
          height: Number(this.game.config.height),
        },
        scaleMode: this.game.scale.scaleMode,
        gameObjectCount: this.gameObjects.size,
      });

      // Flush logs to ensure they're sent to server
      await this.logger.flushLogs();
    } catch (error) {
      this.logger.error('BaseScene', 'create', 'Critical error in scene creation', error);
      await this.logger.flushLogs();
      throw error;
    }
  }

  /**
   * Load all scene configurations
   */
  private loadSceneConfigs(): void {
    this.logger.trace('BaseScene', 'loadSceneConfigs', 'Starting to load scene configurations');

    try {
      const sceneName = this.getSceneName();

      // Load all configurations
      this.sceneConfigs = this.configManager.loadSceneConfigs(sceneName);

      this.logger.trace('BaseScene', 'loadSceneConfigs', 'Scene configurations loaded', {
        sceneName,
        sceneConfigs: this.sceneConfigs,
        configKeys: Object.keys(this.sceneConfigs),
      });

      if (this.sceneConfigs.logging) {
        this.logger.info(
          'BaseScene',
          'loadSceneConfigs',
          'All scene configurations loaded successfully'
        );
      } else {
        this.logger.warn(
          'BaseScene',
          'loadSceneConfigs',
          'Failed to load some scene configurations'
        );
      }
    } catch (error) {
      this.logger.error(
        'BaseScene',
        'loadSceneConfigs',
        'Error loading scene configurations',
        error
      );
      throw error;
    }
  }

  /**
   * Initialize scene purely from configuration
   */
  private async initializeSceneFromConfig(): Promise<void> {
    this.logger.trace(
      'BaseScene',
      'initializeSceneFromConfig',
      'Starting scene initialization from config'
    );

    try {
      if (!this.sceneConfigs.scene) {
        this.logger.warn(
          'BaseScene',
          'initializeSceneFromConfig',
          'No scene configuration available',
          {
            availableConfigs: Object.keys(this.sceneConfigs),
          }
        );
        return;
      }

      const sceneConfig = this.sceneConfigs.scene;
      this.logger.trace('BaseScene', 'initializeSceneFromConfig', 'Scene config found', {
        sceneName: sceneConfig.sceneName,
        gameObjectCount: sceneConfig.gameObjects?.length || 0,
        backgroundColor: sceneConfig.backgroundColor,
      });

      // NEW: Register responsive config with ResponsiveConfigLoader
      if (this.sceneConfigs.responsive) {
        const sceneName = this.getSceneName();
        this.responsiveConfigLoader.registerConfig(sceneName, this.sceneConfigs.responsive);
        this.logger.info('BaseScene', 'initializeSceneFromConfig', 'Responsive config registered', {
          sceneName,
          configKeys: Object.keys(this.sceneConfigs.responsive),
          hasDefault: !!this.sceneConfigs.responsive.default,
          defaultObjectCount: this.sceneConfigs.responsive.default?.length || 0,
        });

        // Cache responsive configs for performance
        this.cacheResponsiveConfigs();
      } else {
        this.logger.error(
          'BaseScene',
          'initializeSceneFromConfig',
          'initializeSceneFromConfig',
          'No responsive configuration found - scene cannot function properly'
        );
        throw new Error('Responsive configuration is required for scene functionality');
      }

      // NEW: Theme is now managed directly via ConfigManager
      if (this.sceneConfigs.theme) {
        this.logger.info('BaseScene', 'initializeSceneFromConfig', 'Theme loaded', {
          themeName: this.sceneConfigs.theme.name,
          hasThemeClasses: !!this.sceneConfigs.theme.themeClasses,
        });
      } else {
        this.logger.warn(
          'BaseScene',
          'initializeSceneFromConfig',
          'initializeSceneFromConfig',
          'No theme configuration found - using default styling'
        );
      }

      // Set scene background color from config
      if (sceneConfig.backgroundColor) {
        this.logger.debug(
          'BaseScene',
          'initializeSceneFromConfig',
          'Setting scene background color',
          {
            backgroundColor: sceneConfig.backgroundColor,
          }
        );
        this.cameras.main.setBackgroundColor(sceneConfig.backgroundColor);
      }

      // Create game objects from configuration
      if (sceneConfig.gameObjects && sceneConfig.gameObjects.length > 0) {
        this.logger.debug(
          'BaseScene',
          'initializeSceneFromConfig',
          'Creating game objects from config',
          {
            gameObjectCount: sceneConfig.gameObjects.length,
            gameObjectIds: sceneConfig.gameObjects.map((obj: any) => obj.id),
          }
        );
        await this.createGameObjectsFromConfig(sceneConfig.gameObjects);
      } else {
        this.logger.warn(
          'BaseScene',
          'initializeSceneFromConfig',
          'No game objects found in scene config'
        );
      }

      // Trigger initial resize for all game objects after creation is complete
      // This ensures proper positioning and sizing from the start
      this.logger.debug(
        'BaseScene',
        'initializeSceneFromConfig',
        'Triggering initial resize for all game objects',
        {
          gameObjectCount: this.gameObjects.size,
          gameObjectIds: Array.from(this.gameObjects.keys()),
        }
      );

      await this.triggerInitialResize();

      this.logger.info(
        'BaseScene',
        'initializeSceneFromConfig',
        'Scene initialized from configuration',
        {
          sceneName: sceneConfig.sceneName,
          gameObjectCount: sceneConfig.gameObjects?.length || 0,
          backgroundColor: sceneConfig.backgroundColor,
          createdGameObjects: this.gameObjects.size,
        }
      );
    } catch (error) {
      this.logger.error(
        'BaseScene',
        'initializeSceneFromConfig',
        'Error initializing scene from config',
        error
      );
      throw error;
    }
  }

  /**
   * Create game objects recursively from configuration using Factory Pattern
   * FIXED: Creates containers first, then children to ensure proper sizing
   */
  private async createGameObjectsFromConfig(
    gameObjects: any[],
    parent?: Phaser.GameObjects.Container
  ): Promise<void> {
    this.logger.debug(
      'BaseScene',
      'createGameObjectsFromConfig',
      'Creating game objects recursively',
      {
        gameObjectCount: gameObjects.length,
        parentId: parent?.name || 'root',
        gameObjectIds: gameObjects.map((obj: any) => obj.id),
      }
    );

    let successCount = 0;
    let failureCount = 0;

    // PHASE 1: Create all containers first (without children)
    const containers: Array<{ config: any; gameObject: any; phaserContainer: any }> = [];

    for (const objConfig of gameObjects) {
      try {
        this.logger.debug(
          'BaseScene',
          'createGameObjectsFromConfig',
          'Starting creation of game object',
          {
            objectId: objConfig.id,
            objectType: objConfig.type,
            objectName: objConfig.name,
            hasFactory: !!objConfig.factory,
            factoryClassName: objConfig.factory?.className,
            factoryCreateMethod: objConfig.factory?.createMethod,
            parentId: parent?.name || 'root',
          }
        );

        const gameObject = await this.createGameObjectFromConfig(objConfig, parent);

        if (gameObject) {
          successCount++;
          this.logger.debug(
            'BaseScene',
            'createGameObjectsFromConfig',
            'Game object created successfully',
            {
              objectId: objConfig.id,
              objectType: objConfig.type,
              phaserObjectType: gameObject.constructor.name,
              gameObjectName: gameObject.name,
            }
          );

          // Store reference to game object
          this.gameObjects.set(objConfig.id, gameObject);
          this.logger.debug(
            'BaseScene',
            'createGameObjectsFromConfig',
            'Game object stored in scene map',
            {
              objectId: objConfig.id,
              totalGameObjects: this.gameObjects.size,
            }
          );

          // Check if this is a container and store for later child creation
          if (objConfig.children && objConfig.children.length > 0) {
            if (
              gameObject instanceof Phaser.GameObjects.Container ||
              (gameObject as any).phaserObject instanceof Phaser.GameObjects.Container
            ) {
              // Get the actual Phaser container for adding children
              const phaserContainer =
                gameObject instanceof Phaser.GameObjects.Container
                  ? gameObject
                  : (gameObject as any).phaserObject;

              containers.push({ config: objConfig, gameObject, phaserContainer });

              this.logger.debug(
                'BaseScene',
                'createGameObjectsFromConfig',
                'Container stored for later child creation',
                {
                  objectId: objConfig.id,
                  containerType: gameObject.constructor.name,
                  phaserContainerType: phaserContainer.constructor.name,
                  childCount: objConfig.children.length,
                }
              );
            } else {
              this.logger.warn(
                'BaseScene',
                'createGameObjectsFromConfig',
                'Cannot add children to non-container object: ${objConfig.id}',
                {
                  objectType: objConfig.type,
                  phaserObjectType: gameObject.constructor.name,
                }
              );
            }
          }
        } else {
          failureCount++;
          this.logger.error(
            'BaseScene',
            'createGameObjectsFromConfig',
            'Failed to create game object - createGameObjectFromConfig returned null',
            {
              objectId: objConfig.id,
              objectType: objConfig.type,
              objectName: objConfig.name,
              hasFactory: !!objConfig.factory,
              factoryClassName: objConfig.factory?.className,
            }
          );
        }
      } catch (error) {
        failureCount++;
        this.logger.error(
          'BaseScene',
          'createGameObjectsFromConfig',
          'Exception during game object creation: ${objConfig.id}',
          {
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            objectId: objConfig.id,
            objectType: objConfig.type,
          }
        );
      }
    }

    // PHASE 2: Create all children after containers are ready
    for (const { config: objConfig, phaserContainer } of containers) {
      try {
        this.logger.debug(
          'BaseScene',
          'createGameObjectsFromConfig',
          'Creating children for container',
          {
            objectId: objConfig.id,
            childCount: objConfig.children.length,
            childIds: objConfig.children.map((child: any) => child.id),
          }
        );

        await this.createGameObjectsFromConfig(objConfig.children, phaserContainer);
      } catch (error) {
        this.logger.error(
          'BaseScene',
          'createGameObjectsFromConfig',
          'Exception during child creation for container: ${objConfig.id}',
          {
            error: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : undefined,
            objectId: objConfig.id,
            objectType: objConfig.type,
          }
        );
      }
    }

    this.logger.info(
      'BaseScene',
      'createGameObjectsFromConfig',
      'Game objects creation batch completed',
      {
        totalRequested: gameObjects.length,
        successCount,
        failureCount,
        finalGameObjectCount: this.gameObjects.size,
        parentId: parent?.name || 'root',
      }
    );
  }

  /**
   * Trigger initial resize for all game objects after creation
   * This ensures proper positioning and sizing from the start
   */
  private async triggerInitialResize(): Promise<void> {
    this.logger.debug(
      'BaseScene',
      'triggerInitialResize',
      'Starting initial resize for all game objects',
      {
        gameObjectCount: this.gameObjects.size,
        gameObjectIds: Array.from(this.gameObjects.keys()),
      }
    );

    try {
      // Get current game dimensions
      const gameWidth = this.game.config.width as number;
      const gameHeight = this.game.config.height as number;

      this.logger.debug('BaseScene', 'triggerInitialResize', 'Game dimensions for initial resize', {
        gameWidth,
        gameHeight,
        gameObjectCount: this.gameObjects.size,
      });

      // Trigger resize for all game objects
      for (const [objectId, gameObject] of this.gameObjects) {
        try {
          // Check if the game object has a resize method (our wrapper objects)
          if ((gameObject as any).resize && typeof (gameObject as any).resize === 'function') {
            this.logger.debug(
              'BaseScene',
              'triggerInitialResize',
              'Triggering resize for wrapper object',
              {
                objectId,
                objectType: gameObject.constructor.name,
                hasResizeMethod: true,
                hasResponsiveResizeMethod: false,
              }
            );

            // Call resize with current game dimensions
            (gameObject as any).resize(gameWidth, gameHeight);
          } else if (
            (gameObject as any).handleResponsiveResize &&
            typeof (gameObject as any).handleResponsiveResize === 'function'
          ) {
            // Check if the game object has a responsive resize method (shapes like Rectangle)
            this.logger.debug(
              'BaseScene',
              'triggerInitialResize',
              'Triggering responsive resize for shape object',
              {
                objectId,
                objectType: gameObject.constructor.name,
                hasResponsiveResizeMethod: true,
              }
            );

            // Call handleResponsiveResize with current game dimensions
            (gameObject as any).handleResponsiveResize(gameWidth, gameHeight);
          } else if (gameObject instanceof Phaser.GameObjects.Container) {
            this.logger.debug(
              'BaseScene',
              'triggerInitialResize',
              'Skipping resize for Phaser container (no wrapper)',
              {
                objectId,
                objectType: gameObject.constructor.name,
                hasResizeMethod: false,
              }
            );
          } else {
            this.logger.debug(
              'BaseScene',
              'triggerInitialResize',
              'Skipping resize for non-container object',
              {
                objectId,
                objectType: gameObject.constructor.name,
                hasResizeMethod: false,
                hasResponsiveResizeMethod: false,
              }
            );
          }
        } catch (error) {
          this.logger.error(
            'BaseScene',
            'triggerInitialResize',
            'Error during initial resize for object: ${objectId}',
            {
              error: error instanceof Error ? error.message : String(error),
              objectId,
              objectType: gameObject.constructor.name,
            }
          );
        }
      }

      this.logger.info(
        'BaseScene',
        'triggerInitialResize',
        'Initial resize completed for all game objects',
        {
          gameObjectCount: this.gameObjects.size,
          gameWidth,
          gameHeight,
        }
      );
    } catch (error) {
      this.logger.error(
        'BaseScene',
        'triggerInitialResize',
        'Error during initial resize process',
        {
          error: error instanceof Error ? error.message : String(error),
          gameObjectCount: this.gameObjects.size,
        }
      );
    }
  }

  /**
   * Create a single game object from configuration using the Factory Pattern
   */
  private async createGameObjectFromConfig(
    objConfig: any,
    parent?: Phaser.GameObjects.Container
  ): Promise<Phaser.GameObjects.GameObject | null> {
    this.logger.debug(
      'BaseScene',
      'createGameObjectFromConfig',
      'Creating game object from config',
      {
        objectId: objConfig.id,
        objectType: objConfig.type,
        hasFactory: !!objConfig.factory,
        factoryClassName: objConfig.factory?.className,
        parentId: parent?.name || 'root',
      }
    );

    try {
      let gameObject: Phaser.GameObjects.GameObject | null = null;

      // Use Factory Pattern to create game objects
      if (objConfig.factory && objConfig.factory.className) {
        this.logger.debug(
          'BaseScene',
          'createGameObjectFromConfig',
          'Using static factory method',
          {
            objectId: objConfig.id,
            className: objConfig.factory.className,
            createMethod: objConfig.factory.createMethod,
          }
        );

        // Use static factory method from concrete classes
        gameObject = await this.createGameObjectUsingStaticFactory(objConfig, parent);

        this.logger.debug(
          'BaseScene',
          'createGameObjectFromConfig',
          'Static factory method completed',
          {
            objectId: objConfig.id,
            hasResult: !!gameObject,
            resultType: gameObject?.constructor.name,
            result: gameObject,
          }
        );
      } else {
        this.logger.debug(
          'BaseScene',
          'createGameObjectFromConfig',
          'Using factory manager fallback',
          {
            objectId: objConfig.id,
            objectType: objConfig.type,
          }
        );

        // Fallback to factory manager
        const factoryInput = {
          id: objConfig.id || 'unknown',
          type: objConfig.type || 'container',
          scene: this,
          config: objConfig,
        };
        gameObject = this.factoryManager.createGameObject(factoryInput);

        this.logger.debug(
          'BaseScene',
          'createGameObjectFromConfig',
          'Factory manager fallback completed',
          {
            objectId: objConfig.id,
            hasResult: !!gameObject,
            resultType: gameObject?.constructor.name,
            result: gameObject,
          }
        );
      }

      if (gameObject) {
        this.logger.debug(
          'BaseScene',
          'createGameObjectFromConfig',
          'Game object created successfully, setting properties',
          {
            objectId: objConfig.id,
            phaserObjectType: gameObject.constructor.name,
            gameObjectName: gameObject.name,
          }
        );

        // Set position and size
        this.setGameObjectProperties(gameObject, objConfig);

        // Add to parent if specified
        if (parent && parent instanceof Phaser.GameObjects.Container) {
          // ALL objects (including wrapper objects) should be added to parent containers
          // This maintains the proper hierarchy: background-container > footer-container > footer-rectangle
          this.logger.debug(
            'BaseScene',
            'createGameObjectFromConfig',
            'Adding game object to parent container',
            {
              objectId: objConfig.id,
              parentId: parent.name,
              objectType: gameObject.constructor.name,
              isWrapperObject: !!(gameObject as any).phaserObject,
            }
          );

          // Use our custom addChild method if the parent has it, otherwise fall back to Phaser's add
          if ((parent as any).addChild && typeof (parent as any).addChild === 'function') {
            (parent as any).addChild(gameObject);
          } else {
            parent.add(gameObject);
          }
        } else {
          this.logger.debug(
            'BaseScene',
            'createGameObjectFromConfig',
            'Adding game object to scene',
            {
              objectId: objConfig.id,
            }
          );
          this.add.existing(gameObject);
        }

        this.logger.info(
          'BaseScene',
          'createGameObjectFromConfig',
          'Game object fully created and added to scene',
          {
            objectId: objConfig.id,
            phaserObjectType: gameObject.constructor.name,
            gameObjectName: gameObject.name,
            addedToScene: true,
          }
        );
      } else {
        this.logger.error(
          'BaseScene',
          'createGameObjectFromConfig',
          'Factory failed to create game object - returning null',
          {
            objectId: objConfig.id,
            objectType: objConfig.type,
            hasFactory: !!objConfig.factory,
            factoryClassName: objConfig.factory?.className,
            factoryCreateMethod: objConfig.factory?.createMethod,
          }
        );
      }

      return gameObject;
    } catch (error) {
      this.logger.error(
        'BaseScene',
        'createGameObjectFromConfig',
        'Critical error creating game object from config: ${objConfig.id}',
        {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          objectId: objConfig.id,
          objectType: objConfig.type,
          factory: objConfig.factory,
        }
      );
      return null;
    }
  }

  /**
   * Create game object using static factory methods from concrete classes
   */
  private async createGameObjectUsingStaticFactory(
    objConfig: any,
    parent?: Phaser.GameObjects.Container
  ): Promise<Phaser.GameObjects.GameObject | null> {
    this.logger.debug(
      'BaseScene',
      'createGameObjectUsingStaticFactory',
      'Using static factory method',
      {
        objectId: objConfig.id,
        className: objConfig.factory.className,
        createMethod: objConfig.factory.createMethod,
      }
    );

    try {
      const { className, createMethod = 'createFromConfig' } = objConfig.factory;

      this.logger.debug(
        'BaseScene',
        'createGameObjectUsingStaticFactory',
        'Factory configuration parsed',
        {
          objectId: objConfig.id,
          className,
          createMethod,
        }
      );

      // Use the factory manager to create the game object
      // This delegates the responsibility to the proper factory system
      const gameObject = await this.factoryManager.createGameObjectWithStaticFactory(
        objConfig,
        this,
        parent
      );

      this.logger.debug(
        'BaseScene',
        'createGameObjectUsingStaticFactory',
        'Static factory method completed',
        {
          objectId: objConfig.id,
          hasResult: !!gameObject,
          resultType: gameObject?.constructor.name,
          result: gameObject
            ? {
                name: gameObject.name,
                type: gameObject.constructor.name,
                visible: (gameObject as any).visible,
                active: (gameObject as any).active,
              }
            : null,
        }
      );

      return gameObject;
    } catch (error) {
      this.logger.error(
        'BaseScene',
        'active',
        'Critical error using static factory for ${objConfig.id}:',
        {
          error: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          objectId: objConfig.id,
          className: objConfig.factory?.className,
          createMethod: objConfig.factory?.createMethod,
        }
      );
      return null;
    }
  }

  /**
   * Set common game object properties
   */
  private setGameObjectProperties(gameObject: Phaser.GameObjects.GameObject, objConfig: any): void {
    this.logger.debug('BaseScene', 'setGameObjectProperties', 'Setting game object properties', {
      objectId: objConfig.id,
      hasSetPosition: 'setPosition' in gameObject,
      hasSetSize: 'setSize' in gameObject,
      config: {
        x: objConfig.x,
        y: objConfig.y,
        width: objConfig.width,
        height: objConfig.height,
        name: objConfig.name,
      },
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
          this.logger.debug(
            'BaseScene',
            'setGameObjectProperties',
            'Resolved fill y position from parent',
            {
              objectId: objConfig.id,
              parentHeight: parentContainer.height,
              resolvedY: y,
            }
          );
        } else {
          // Fallback to scene height
          y = this.game.config.height as number;
          this.logger.debug(
            'BaseScene',
            'setGameObjectProperties',
            'Using scene height for fill y position',
            {
              objectId: objConfig.id,
              sceneHeight: y,
            }
          );
        }
      }

      this.logger.debug('BaseScene', 'setGameObjectProperties', 'Setting position', {
        objectId: objConfig.id,
        x: x,
        y: y,
      });
      (gameObject as any).setPosition(x, y);
    }

    // Set size if supported
    if (objConfig.width && objConfig.width !== 'fill') {
      if ('setSize' in gameObject) {
        this.logger.debug('BaseScene', 'setGameObjectProperties', 'Setting size', {
          objectId: objConfig.id,
          width: objConfig.width,
          height: objConfig.height || objConfig.width,
        });
        (gameObject as any).setSize(objConfig.width, objConfig.height || objConfig.width);
      }
    }

    // Set name for debugging
    gameObject.name = objConfig.name || objConfig.id;
    this.logger.debug('BaseScene', 'setGameObjectProperties', 'Set game object name', {
      objectId: objConfig.id,
      name: gameObject.name,
    });

    // Set z-order if specified
    if (objConfig.zOrder !== undefined && 'setDepth' in gameObject) {
      this.logger.debug('BaseScene', 'setGameObjectProperties', 'Setting z-order', {
        objectId: objConfig.id,
        zOrder: objConfig.zOrder,
      });
      (gameObject as any).setDepth(objConfig.zOrder);
    }
  }

  /**
   * Setup responsive behavior
   */
  private setupResponsiveBehavior(): void {
    this.logger.debug(
      'BaseScene',
      'setupResponsiveBehavior',
      'setupResponsiveBehavior',
      'Setting up responsive behavior'
    );

    // Create resize handler
    const resizeHandler = () => {
      this.handleResize();
    };

    // Add resize event listener
    window.addEventListener('resize', resizeHandler);

    // Also listen to Phaser's resize events
    this.scale.on('resize', resizeHandler);

    // Log responsive config if available
    if (this.sceneConfigs.responsive) {
      this.logger.info(
        'BaseScene',
        'setupResponsiveBehavior',
        'Responsive behavior setup completed with config',
        {
          scaleMode: this.game.scale.scaleMode,
          responsiveConfig: this.sceneConfigs.responsive,
        }
      );
    } else {
      this.logger.info(
        'BaseScene',
        'setupResponsiveBehavior',
        'Responsive behavior setup completed (no config)',
        {
          scaleMode: this.game.scale.scaleMode,
        }
      );
    }
  }

  /**
   * Handle screen resize
   */
  private handleResize(): void {
    try {
      // Get new dimensions
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      this.logger.debug('BaseScene', 'handleResize', 'Screen resize detected', {
        newDimensions: { width: newWidth, height: newHeight },
        gameObjectCount: this.gameObjects.size,
      });

      // Find the root container (the one without a parent)
      const rootContainer = this.findRootContainer();

      if (rootContainer) {
        this.logger.debug('BaseScene', 'handleResize', 'Found root container, triggering resize', {
          rootContainerId: rootContainer.name || 'unnamed',
          rootContainerType: rootContainer.constructor.name,
        });

        // Call resize on the root container
        if (typeof (rootContainer as any).resize === 'function') {
          (rootContainer as any).resize(newWidth, newHeight);
        } else {
          this.logger.warn(
            'BaseScene',
            'handleResize',
            'Root container does not have resize method',
            {
              rootContainerId: rootContainer.name || 'unnamed',
              rootContainerType: rootContainer.constructor.name,
            }
          );
        }
      } else {
        this.logger.warn(
          'BaseScene',
          'handleResize',
          'handleResize',
          'No root container found for resize propagation'
        );
      }

      // Log resize event
      this.logger.info('BaseScene', 'handleResize', 'Screen resized', {
        newDimensions: { width: newWidth, height: newHeight },
        timestamp: Date.now(),
      });
    } catch (error) {
      this.logger.error('BaseScene', 'handleResize', 'Error handling resize', error);
    }
  }

  /**
   * Scene update (called every frame)
   */
  update(time: number, delta: number): void {
    // Configuration-driven updates can be added here later
    // For now, just log performance metrics occasionally
    if (time % 1000 < delta) {
      // Log every second
      this.logger.trace('BaseScene', 'update', 'Scene update', {
        time,
        delta,
        fps: Math.round(1000 / delta),
        gameObjectCount: this.gameObjects.size,
      });
    }
  }

  /**
   * Scene shutdown
   */
  async shutdown(): Promise<void> {
    this.logger.debug('BaseScene', 'shutdown', 'Scene shutdown started', {
      gameObjectCount: this.gameObjects.size,
    });

    // Clean up game objects
    this.gameObjects.clear();

    // Log scene shutdown
    this.logger.info('BaseScene', 'shutdown', 'Scene shutdown', {
      timestamp: Date.now(),
    });

    // Flush logs before shutdown
    await this.logger.flushLogs();
  }

  /**
   * Get game object by ID
   */
  protected getGameObject(id: string): Phaser.GameObjects.GameObject | undefined {
    return this.gameObjects.get(id);
  }

  /**
   * Get all game objects
   */
  protected getAllGameObjects(): Map<string, Phaser.GameObjects.GameObject> {
    return this.gameObjects;
  }

  /**
   * Check if game object exists
   */
  protected hasGameObject(id: string): boolean {
    return this.gameObjects.has(id);
  }

  /**
   * Find the root container (the first game object in the scene config)
   */
  private findRootContainer(): Phaser.GameObjects.Container | null {
    // First, try to find the first game object from the scene config
    if (
      this.sceneConfigs.scene &&
      this.sceneConfigs.scene.gameObjects &&
      this.sceneConfigs.scene.gameObjects.length > 0
    ) {
      const firstGameObjectId = this.sceneConfigs.scene.gameObjects[0].id;
      const firstGameObject = this.gameObjects.get(firstGameObjectId);

      if (firstGameObject && firstGameObject instanceof Phaser.GameObjects.Container) {
        this.logger.debug(
          'BaseScene',
          'findRootContainer',
          'Found root container from scene config',
          {
            rootContainerId: firstGameObject.name || firstGameObjectId,
            rootContainerType: firstGameObject.constructor.name,
          }
        );
        return firstGameObject;
      }
    }

    // Fallback: Look for a container that has no parent
    for (const gameObject of this.gameObjects.values()) {
      if (gameObject instanceof Phaser.GameObjects.Container) {
        // Check if this container has no parent
        if (!(gameObject as any).parent) {
          this.logger.debug(
            'BaseScene',
            'findRootContainer',
            'Found root container by parent check',
            {
              rootContainerId: gameObject.name || 'unnamed',
              rootContainerType: gameObject.constructor.name,
            }
          );
          return gameObject;
        }
      }
    }

    this.logger.warn(
      'BaseScene',
      'findRootContainer',
      'findRootContainer',
      'No root container found'
    );
    return null;
  }

  /**
   * Get the parent container for a game object
   */
  private getParentContainer(
    gameObject: Phaser.GameObjects.GameObject
  ): Phaser.GameObjects.Container | null {
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
    this.logger.trace(
      'BaseScene',
      'cacheResponsiveConfigs',
      'cacheResponsiveConfigs',
      'Caching responsive configurations for performance'
    );

    try {
      if (!this.sceneConfigs.responsive) {
        this.logger.warn(
          'BaseScene',
          'cacheResponsiveConfigs',
          'cacheResponsiveConfigs',
          'No responsive config to cache'
        );
        return;
      }

      const responsiveConfig = this.sceneConfigs.responsive;

      // Cache default breakpoint
      if (responsiveConfig.default) {
        responsiveConfig.default.forEach((layout: any) => {
          this.cachedResponsiveConfigs.set(`default-${layout.id}`, layout);
        });
      }

      // Cache all breakpoint configurations
      Object.entries(responsiveConfig.responsiveSettings).forEach(([breakpointKey, layouts]) => {
        (layouts as any[]).forEach((layout: any) => {
          this.cachedResponsiveConfigs.set(`${breakpointKey}-${layout.id}`, layout);
        });
      });

      this.logger.info(
        'BaseScene',
        'cacheResponsiveConfigs',
        'Responsive configurations cached successfully',
        {
          totalCached: this.cachedResponsiveConfigs.size,
          breakpoints: Object.keys(responsiveConfig.responsiveSettings),
          defaultCount: responsiveConfig.default?.length || 0,
        }
      );
    } catch (error) {
      this.logger.error(
        'BaseScene',
        'cacheResponsiveConfigs',
        'Error caching responsive configurations',
        error
      );
    }
  }

  /**
   * Get cached responsive configuration for an object and breakpoint
   */
  protected getCachedResponsiveConfig(objectId: string, breakpoint: string = 'default'): any {
    const cacheKey = `${breakpoint}-${objectId}`;
    return this.cachedResponsiveConfigs.get(cacheKey);
  }

  /**
   * Get current breakpoint based on screen width
   */
  protected getCurrentBreakpoint(width: number): string {
    if (width < 576) return 'xs';
    if (width < 768) return 'sm';
    if (width < 992) return 'md';
    if (width < 1200) return 'lg';
    return 'xl';
  }

  /**
   * Pass responsive and theme configs to game objects
   * This method is called by game objects to get their configurations
   */
  protected getGameObjectConfigs(_objectId: string): {
    responsive: any;
    theme: any;
    currentBreakpoint: string;
  } {
    const currentWidth = this.game.config.width as number;
    const currentBreakpoint = this.getCurrentBreakpoint(currentWidth);

    // Return the full responsive configuration structure that Container expects
    return {
      responsive: this.sceneConfigs.responsive,
      theme: this.sceneConfigs.theme,
      currentBreakpoint,
    };
  }

  // ============================================================================
  // THEME ACTIVATION METHODS
  // ============================================================================

  /**
   * Activate a theme for this scene
   */
  protected async activateTheme(themeId: string): Promise<void> {
    try {
      this.logger.info('BaseScene', 'activateTheme', 'Activating theme for scene', {
        sceneKey: this.scene.key,
        themeId,
      });

      const result = await this.themeActivator.activateThemeForScene(this.scene.key, themeId, {
        sceneKey: this.scene.key,
        elementType: ThemeElementType.SCENE,
        priority: 1,
      });

      if (result.success) {
        this.logger.info('BaseScene', 'activateTheme', 'Theme activated successfully', {
          sceneKey: this.scene.key,
          themeId,
          appliedClasses: result.appliedClasses.length,
          duration: result.duration,
        });
      } else {
        this.logger.error('BaseScene', 'activateTheme', 'Theme activation failed', {
          sceneKey: this.scene.key,
          themeId,
          errors: result.errors,
        });
      }
    } catch (error) {
      this.logger.error('BaseScene', 'activateTheme', 'Theme activation error', {
        error,
        sceneKey: this.scene.key,
        themeId,
      });
      throw error;
    }
  }

  /**
   * Apply theme to a game object
   */
  protected async applyThemeToGameObject(
    gameObject: Phaser.GameObjects.GameObject,
    themeId: string
  ): Promise<void> {
    try {
      this.logger.debug('BaseScene', 'applyThemeToGameObject', 'Applying theme to game object', {
        sceneKey: this.scene.key,
        gameObjectType: gameObject.constructor.name,
        themeId,
      });

      const result = await this.themeActivator.applyThemeToGameObject(gameObject, themeId, {
        sceneKey: this.scene.key,
        gameObjectId: gameObject.name || gameObject.constructor.name,
        elementType: ThemeElementType.GAME_OBJECT,
        priority: 2,
      });

      if (result.success) {
        this.logger.debug('BaseScene', 'applyThemeToGameObject', 'Theme applied to game object', {
          sceneKey: this.scene.key,
          gameObjectType: gameObject.constructor.name,
          themeId,
          duration: result.duration,
        });
      } else {
        this.logger.warn('BaseScene', 'applyThemeToGameObject', 'Theme application failed', {
          sceneKey: this.scene.key,
          gameObjectType: gameObject.constructor.name,
          themeId,
          errors: result.errors,
        });
      }
    } catch (error) {
      this.logger.error('BaseScene', 'applyThemeToGameObject', 'Theme application error', {
        error,
        sceneKey: this.scene.key,
        gameObjectType: gameObject.constructor.name,
        themeId,
      });
      throw error;
    }
  }

  /**
   * Switch theme for this scene
   */
  protected async switchTheme(newThemeId: string): Promise<void> {
    try {
      this.logger.info('BaseScene', 'switchTheme', 'Switching theme for scene', {
        sceneKey: this.scene.key,
        newThemeId,
      });

      const result = await this.themeActivator.switchThemeForScene(this.scene.key, newThemeId, {
        sceneKey: this.scene.key,
        elementType: ThemeElementType.SCENE,
        priority: 1,
      });

      if (result.success) {
        this.logger.info('BaseScene', 'switchTheme', 'Theme switched successfully', {
          sceneKey: this.scene.key,
          newThemeId,
          appliedClasses: result.appliedClasses.length,
          duration: result.duration,
        });
      } else {
        this.logger.error('BaseScene', 'switchTheme', 'Theme switch failed', {
          sceneKey: this.scene.key,
          newThemeId,
          errors: result.errors,
        });
      }
    } catch (error) {
      this.logger.error('BaseScene', 'switchTheme', 'Theme switch error', {
        error,
        sceneKey: this.scene.key,
        newThemeId,
      });
      throw error;
    }
  }

  /**
   * Get active theme for this scene
   */
  protected getActiveTheme(): any {
    return this.themeActivator.getActiveThemeForScene(this.scene.key);
  }

  /**
   * Get available themes for this scene
   */
  protected getAvailableThemes(): any[] {
    return this.themeActivator.getAvailableThemesForScene(this.scene.key);
  }

  /**
   * Check if a theme is active for this scene
   */
  protected isThemeActive(themeId: string): boolean {
    return this.themeActivator.isThemeActiveForScene(this.scene.key, themeId);
  }

  /**
   * Get applied theme classes for this scene
   */
  protected getAppliedThemeClasses(): string[] {
    return this.themeActivator.getAppliedClasses(this.scene.key);
  }
}
