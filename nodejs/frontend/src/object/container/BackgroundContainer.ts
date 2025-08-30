import * as Phaser from 'phaser'
import type { IContainer } from '../../abstract/objects/IContainer'
import { Container } from './Container'
import { Logger } from '../../core/Logger'

/**
 * BackgroundContainer Class
 * Root container that automatically handles background image loading and responsive sizing
 * 
 * Key Features:
 * - Automatically loads and displays background images
 * - Maintains aspect ratio by default
 * - Responsive positioning and sizing for multiple devices
 * - Phaser container automatically follows background image dimensions
 * - Handles device orientation changes and window resizing
 * 
 * Architecture:
 * - Inherits responsive behavior from Container (which extends ScalableGameObject)
 * - Implements only background-specific logic
 * - Delegates responsive logic to parent class
 */
export class BackgroundContainer extends Container {
  // ===== STATIC FACTORY METHOD =====
  
  /**
   * Create a BackgroundContainer instance from configuration
   * This method allows the BackgroundContainer class to create itself from config
   */
  public static createFromConfig(config: any, scene: Phaser.Scene, parent?: IContainer): BackgroundContainer {
    const logger = Logger.getInstance()
    logger.debug('BackgroundContainer', 'createFromConfig called', {
      objectId: config.id,
      config: config,
      sceneKey: scene.scene.key,
      hasParent: !!parent
    }, 'createFromConfig')
    
    try {
      const container = new BackgroundContainer(
        scene,
        config.id,
        config.x || 0,
        config.y || 0,
        parent || null
      )
      
      logger.debug('BackgroundContainer', 'BackgroundContainer instance created', {
        objectId: config.id,
        phaserObjectType: container.phaserObject.constructor.name,
        position: { x: container.phaserObject.x, y: container.phaserObject.y }
      }, 'createFromConfig')
      
        // Apply configuration properties
        if (config.properties) {
          logger.debug('BackgroundContainer', 'Applying properties from config', {
            objectId: config.id,
            properties: config.properties
          }, 'createFromConfig')
        
                             // Set background image if specified
            if (config.properties.textureKey) {
              logger.debug('BackgroundContainer', 'Setting background image', {
                objectId: config.id,
                textureKey: config.properties.textureKey
              }, 'createFromConfig')
           
                         // Check if we have responsive background images
              if (config.properties.desktopTextureKey && config.properties.mobileTextureKey) {
                logger.debug('BackgroundContainer', 'Using responsive background images', {
                  objectId: config.id,
                  desktopTextureKey: config.properties.desktopTextureKey,
                  mobileTextureKey: config.properties.mobileTextureKey
                }, 'createFromConfig')
             
             container.setResponsiveBackgroundImage(
               config.properties.desktopTextureKey,
               config.properties.mobileTextureKey,
               {
                 maintainAspectRatio: config.properties.maintainAspectRatio,
                 scalingMode: config.properties.scalingMode || 'fit',
                 alignment: config.properties.alignment || { x: 'center', y: 'center' }
               }
             )
           } else {
             // Use single texture key (fallback)
             container.setBackgroundImage(config.properties.textureKey)
           }
         }
        
                 // Set background color if specified
         if (config.properties.backgroundColor) {
                       logger.debug('BackgroundContainer', 'Setting background color', {
              objectId: config.id,
              backgroundColor: config.properties.backgroundColor
            }, 'createFromConfig')
          container.setBackground({ color: config.properties.backgroundColor })
        }
        
                 // Set maintain aspect ratio if specified
         if (config.properties.maintainAspectRatio !== undefined) {
                       logger.debug('BackgroundContainer', 'Setting maintain aspect ratio', {
              objectId: config.id,
              maintainAspectRatio: config.properties.maintainAspectRatio
            }, 'createFromConfig')
          container.setConstraints({ maintainAspectRatio: config.properties.maintainAspectRatio })
        }
        
                 // Set interactive if specified
         if (config.properties.interactive !== undefined) {
                       logger.debug('BackgroundContainer', 'Setting interactive', {
              objectId: config.id,
              interactive: config.properties.interactive
            }, 'createFromConfig')
          container.setInteractive(config.properties.interactive)
        }
      }
      
      // Set size if specified
      if (config.width === 'fill' || config.height === 'fill') {
        // Handle fill dimensions - use scene dimensions
        const sceneWidth = scene.game.config.width as number
        const sceneHeight = scene.game.config.height as number
        
        let finalWidth = config.width === 'fill' ? sceneWidth : (config.width as number)
        let finalHeight = config.height === 'fill' ? sceneHeight : (config.height as number)
        
                                   logger.debug('BackgroundContainer', 'Setting fill size from scene dimensions', {
            objectId: config.id,
            sceneWidth,
            sceneHeight,
            finalWidth,
            finalHeight
          }, 'createFromConfig')
        
        container.phaserObject.setSize(finalWidth, finalHeight)
             } else if (config.width && config.width !== 'fill') {
                   logger.debug('BackgroundContainer', 'Setting size from config', {
            objectId: config.id,
            width: config.width,
            height: config.height || config.width
          }, 'createFromConfig')
        container.phaserObject.setSize(config.width, config.height || config.width)
      }
      
      // Set name
      container.phaserObject.name = config.name || config.id
      
             logger.debug('BackgroundContainer', 'BackgroundContainer configured successfully', {
         objectId: config.id,
         finalSize: { width: container.phaserObject.width, height: container.phaserObject.height },
         finalPosition: { x: container.phaserObject.x, y: container.phaserObject.y },
         finalName: container.phaserObject.name
       }, 'createFromConfig')
      
      return container
      
         } catch (error) {
       logger.error('BackgroundContainer', `Error in createFromConfig for ${config.id}:`, error)
       throw error
     }
  }
  
  /** Background image key/texture */
  private backgroundImageKey: string | null = null
  
  /** Background image object */
  private backgroundImage: Phaser.GameObjects.Image | null = null
  
  /** Background image dimensions */
  private backgroundDimensions: { width: number; height: number } | null = null
  
  /** Whether to maintain aspect ratio */
  private maintainAspectRatio: boolean = true
  
  /** Background scaling mode */
  private scalingMode: 'fit' | 'fill' | 'stretch' = 'fit'
  
  /** Background alignment */
  private alignment: { x: 'left' | 'center' | 'right'; y: 'top' | 'center' | 'bottom' } = {
    x: 'center',
    y: 'center'
  }
  
  /** Background color fallback */
  private backgroundColor: string = '#000000'
  
  /** Whether background is loaded */
  private isBackgroundLoaded: boolean = false
  
  /** Resize event handler */
  private resizeHandler: (() => void) | null = null
  
  /** Logger instance */
  protected logger: Logger = Logger.getInstance()
  
  constructor(
    scene: Phaser.Scene,
    id: string,
    x: number = 0,
    y: number = 0,
    parent: IContainer | null = null
  ) {
    super(scene, id, x, y, parent)
    
                 this.logger.debug('BackgroundContainer', 'BackgroundContainer constructor called', {
        id,
        x,
        y,
        hasParent: !!parent,
        sceneKey: scene.scene.key
      }, 'constructor')
    
    // Set container type to background
    this.setContainerType('div')
    
    // Set default constraints for background container
    this.setConstraints({
      maxChildren: 1000,
      autoSize: true,
      clipOverflow: false,
      overflow: 'hidden',
      respectParentBounds: false, // Background container is root, so no parent bounds
      maintainAspectRatio: true
    })
    
    // Set up resize event listener
    this.setupResizeListener()
  }
  
  // ===== BACKGROUND IMAGE MANAGEMENT =====
  
  /**
   * Load and set background image
   * @param imageKey - Phaser texture key for the background image
   * @param options - Background loading options
   */
  setBackgroundImage(
    imageKey: string,
    options: {
      maintainAspectRatio?: boolean
      scalingMode?: 'fit' | 'fill' | 'stretch'
      alignment?: { x: 'left' | 'center' | 'right'; y: 'top' | 'center' | 'bottom' }
      backgroundColor?: string
    } = {}
     ): void {
           this.logger.debug('BackgroundContainer', 'setBackgroundImage called', {
        objectId: this.id,
        textureKey: imageKey,
        hasTexture: this.scene.textures.exists(imageKey)
      }, 'setBackgroundImage')
    this.backgroundImageKey = imageKey
    this.maintainAspectRatio = options.maintainAspectRatio ?? true
    this.scalingMode = options.scalingMode ?? 'fit'
    this.alignment = options.alignment ?? { x: 'center', y: 'center' }
    this.backgroundColor = options.backgroundColor ?? '#000000'
    
    // Load the background image
    this.loadBackgroundImage()
  }
  
  /**
   * Set responsive background image based on current device type
   * @param desktopImageKey - Phaser texture key for desktop background
   * @param mobileImageKey - Phaser texture key for mobile background
   * @param options - Background loading options
   */
  setResponsiveBackgroundImage(
    desktopImageKey: string,
    mobileImageKey: string,
    options: {
      maintainAspectRatio?: boolean
      scalingMode?: 'fit' | 'fill' | 'stretch'
      alignment?: { x: 'left' | 'center' | 'right'; y: 'top' | 'center' | 'bottom' }
      backgroundColor?: string
    } = {}
     ): void {
           this.logger.debug('BackgroundContainer', 'setResponsiveBackgroundImage called', {
        objectId: this.id,
        desktopImageKey,
        mobileImageKey,
        currentWidth: this.scene.game.scale.width
      }, 'setResponsiveBackgroundImage')
    
    // Determine current device type
    const currentWidth = this.scene.game.scale.width
    const isDesktop = currentWidth >= 1024
    
         // Select appropriate image based on device type
     const selectedImageKey = isDesktop ? desktopImageKey : mobileImageKey
     
           this.logger.debug('BackgroundContainer', 'Selected background image', {
        objectId: this.id,
        deviceType: isDesktop ? 'desktop' : 'mobile',
        selectedImageKey,
        currentWidth
      }, 'setResponsiveBackgroundImage')
    
    // Set the selected background image
    this.setBackgroundImage(selectedImageKey, options)
  }
  
  /**
   * Load background image from texture
   */
  private loadBackgroundImage(): void {
    if (!this.backgroundImageKey) return
    
    try {
      // Check if texture exists
             if (!this.scene.textures.exists(this.backgroundImageKey)) {
         this.logger.warn('BackgroundContainer', `Background texture "${this.backgroundImageKey}" not found`, {
           objectId: this.id,
           availableTextures: Object.keys(this.scene.textures.list)
         }, 'loadBackgroundImage')
        return
      }
      
             // Remove existing background image
       if (this.backgroundImage) {
                   this.logger.debug('BackgroundContainer', 'Removing existing background image', {
            objectId: this.id
          }, 'loadBackgroundImage')
        this.backgroundImage.destroy()
        this.backgroundImage = null
      }
      
      // Create new background image
      this.backgroundImage = this.scene.add.image(0, 0, this.backgroundImageKey)
      
      // Get background dimensions
      this.backgroundDimensions = {
        width: this.backgroundImage!.width,
        height: this.backgroundImage!.height
      }
      
      // Add to Phaser container
      this.phaserObject.add(this.backgroundImage)
      
             // Mark as loaded
       this.isBackgroundLoaded = true
       
       // Apply responsive sizing
       this.applyResponsiveSizing()
       
               this.logger.debug('BackgroundContainer', `Background image loaded: ${this.backgroundImageKey}`, {
          objectId: this.id,
          imageSize: { width: this.backgroundImage!.width, height: this.backgroundImage!.height }
        }, 'loadBackgroundImage')
      
         } catch (error) {
       this.logger.error('BackgroundContainer', 'Failed to load background image:', error)
       this.isBackgroundLoaded = false
     }
  }
  
  /**
   * Remove background image
   */
     removeBackgroundImage(): void {
     if (this.backgroundImage) {
             this.logger.debug('BackgroundContainer', 'Removing background image', {
        objectId: this.id
      }, 'removeBackgroundImage')
      this.backgroundImage.destroy()
      this.backgroundImage = null
    }
    
    this.backgroundImageKey = null
    this.backgroundDimensions = null
    this.isBackgroundLoaded = false
    
    // Reset container size to default
    this.resize(800, 600)
  }
  
  /**
   * Set background color (fallback when no image)
   */
  setBackgroundColor(color: string): void {
    this.backgroundColor = color
    
    // If no background image, create a colored rectangle
    if (!this.isBackgroundLoaded) {
      this.createBackgroundRectangle()
    }
  }
  
  /**
   * Create background rectangle when no image is loaded
   */
  private createBackgroundRectangle(): void {
    // Remove existing background graphics
    this.phaserObject.list.forEach((child: any) => {
      if (child instanceof Phaser.GameObjects.Graphics) {
        child.destroy()
      }
    })
    
    // Create colored rectangle
    const graphics = this.scene.add.graphics()
    graphics.fillStyle(Phaser.Display.Color.ValueToColor(this.backgroundColor).color)
    graphics.fillRect(0, 0, this.phaserObject.width, this.phaserObject.height)
    
    // Add to container
    this.phaserObject.add(graphics)
  }
  
  // ===== RESPONSIVE SIZING =====
  
  /**
   * Override resize method to handle background-specific logic with responsive behavior
   */
  override resize(width: number, height: number): void {
         this.logger.debug('BackgroundContainer', 'resize called', {
       objectId: this.id,
       newDimensions: { width, height },
       currentDimensions: { width: this.phaserObject.width, height: this.phaserObject.height },
       hasBackgroundImage: !!this.backgroundImage
     }, 'resize')
    
    // Store new dimensions
    const newWidth = width
    const newHeight = height
    
    // Call parent (Container) resize method for responsive behavior and children handling
    super.resize(newWidth, newHeight)
    
    // Handle background-specific logic after responsive behavior is processed
    if (this.isBackgroundLoaded && this.backgroundDimensions) {
      // Get the responsive behavior that was determined by parent
      const responsiveBehavior = this.getCurrentResponsiveBehavior()
      
      if (responsiveBehavior) {
                 this.logger.debug('BackgroundContainer', 'Applying background-specific responsive logic', {
           objectId: this.id,
           responsiveBehavior
         }, 'resize')
        
        // Calculate new position and size based on background image and responsive config
        const { position, size } = this.calculateResponsiveBackgroundLayout(
          newWidth, 
          newHeight, 
          responsiveBehavior
        )
        
        // The container should always be at (0,0) in the scene
        // Only update the container size, not position
        this.phaserObject.setSize(size.width, size.height)
        
        // Update background image position and size
        if (this.backgroundImage) {
          // Position the background image within the container based on the calculated position
          // The position is relative to the container, so we need to account for the container's size
          const imageX = position.x + (size.width / 2)
          const imageY = position.y + (size.height / 2)
          this.backgroundImage.setPosition(imageX, imageY)
          this.backgroundImage.setDisplaySize(size.width, size.height)
        }
        
                 this.logger.debug('BackgroundContainer', `Background container resized: ${size.width}x${size.height} at (${position.x}, ${position.y})`, {
           objectId: this.id,
           finalSize: { width: size.width, height: size.height },
           finalPosition: { x: position.x, y: position.y },
           responsiveBehavior
         }, 'resize')
      }
    } else {
      // No background image, use default sizing
      this.phaserObject.setSize(newWidth, newHeight)
      
      // Update background rectangle if exists
      if (!this.isBackgroundLoaded) {
        this.createBackgroundRectangle()
      }
             this.logger.debug('BackgroundContainer', 'Background container resized (no image): default sizing', {
         objectId: this.id,
         finalSize: { width: newWidth, height: newHeight }
       }, 'resize')
    }
  }
  

  
  // Note: getResponsiveBehavior is now handled by ScalableGameObject
  // which should get the responsive config from the scene
  
  /**
   * Calculate responsive background layout based on responsive behavior
   */
  private calculateResponsiveBackgroundLayout(
    containerWidth: number,
    containerHeight: number,
    responsiveBehavior: {
      deviceType: 'desktop' | 'mobile'
      maintainAspectRatio: boolean
      scaleStrategy: 'fit' | 'stretch' | 'fill'
      alignment: { x: 'left' | 'center' | 'right'; y: 'top' | 'center' | 'bottom' }
    }
  ): { position: { x: number; y: number }; size: { width: number; height: number } } {
    if (!this.backgroundDimensions) {
      return { position: { x: 0, y: 0 }, size: { width: containerWidth, height: containerHeight } }
    }
    
    const { width: bgWidth, height: bgHeight } = this.backgroundDimensions
    const bgAspectRatio = bgWidth / bgHeight
    const containerAspectRatio = containerWidth / containerHeight
    
    let finalWidth: number
    let finalHeight: number
    
    // Calculate size based on responsive scale strategy
    switch (responsiveBehavior.scaleStrategy) {
      case 'fit':
        // Fit background within container while maintaining aspect ratio
        if (responsiveBehavior.maintainAspectRatio) {
          if (containerAspectRatio > bgAspectRatio) {
            // Container is wider, fit by height
            finalHeight = containerHeight
            finalWidth = finalHeight * bgAspectRatio
          } else {
            // Container is taller, fit by width
            finalWidth = containerWidth
            finalHeight = finalWidth / bgAspectRatio
          }
        } else {
          // Don't maintain aspect ratio, fit to container
          finalWidth = containerWidth
          finalHeight = containerHeight
        }
        break
        
      case 'stretch':
        // Stretch to fill container (may distort)
        finalWidth = containerWidth
        finalHeight = containerHeight
        break
        
      default:
        finalWidth = containerWidth
        finalHeight = containerHeight
    }
    
    // Calculate position based on responsive alignment
    let x: number
    let y: number
    
    switch (responsiveBehavior.alignment.x) {
      case 'left':
        x = 0
        break
      case 'center':
        x = (containerWidth - finalWidth) / 2
        break
      case 'right':
        x = containerWidth - finalWidth
        break
      default:
        x = 0
    }
    
    switch (responsiveBehavior.alignment.y) {
      case 'top':
        y = 0
        break
      case 'center':
        y = (containerHeight - finalHeight) / 2
        break
      case 'bottom':
        y = containerHeight - finalHeight
        break
      default:
        y = 0
    }
    
    return {
      position: { x, y },
      size: { width: finalWidth, height: finalHeight }
    }
  }
  
  /**
   * Apply responsive sizing based on current game dimensions
   */
  private applyResponsiveSizing(): void {
    if (!this.isBackgroundLoaded) return
    
    // Get current game dimensions
    const gameWidth = this.scene.game.scale.width
    const gameHeight = this.scene.game.scale.height
    
    // Resize container
    this.resize(gameWidth, gameHeight)
  }
  
  // ===== DEVICE ORIENTATION HANDLING =====
  
  /**
   * Handle device orientation change
   */
  handleOrientationChange(): void {
    if (!this.isBackgroundLoaded) return
    
    // Get new dimensions after orientation change
    const gameWidth = this.scene.game.scale.width
    const gameHeight = this.scene.game.scale.height
    
    // Apply responsive sizing with new dimensions
    this.resize(gameWidth, gameHeight)
    
         this.logger.debug('BackgroundContainer', `Orientation change handled: ${gameWidth}x${gameHeight}`, {
       objectId: this.id,
       newDimensions: { width: gameWidth, height: gameHeight }
     }, 'handleOrientationChange')
  }
  
  /**
   * Handle window resize
   */
  handleWindowResize(): void {
    if (!this.isBackgroundLoaded) return
    
    // Get new dimensions
    const gameWidth = this.scene.game.scale.width
    const gameHeight = this.scene.game.scale.height
    
    // Check if device type changed (desktop <-> mobile)
    const wasDesktop = this.phaserObject.width >= 1024
    const isNowDesktop = gameWidth >= 1024
    
    if (wasDesktop !== isNowDesktop) {
             this.logger.debug('BackgroundContainer', 'Device type changed, switching background image', {
         objectId: this.id,
         wasDesktop,
         isNowDesktop,
         oldDimensions: { width: this.phaserObject.width, height: this.phaserObject.height },
         newDimensions: { width: gameWidth, height: gameHeight }
       }, 'handleWindowResize')
      
      // Switch background image based on new device type
      this.switchBackgroundImageForDeviceType(gameWidth, gameHeight)
    }
    
    // Apply responsive sizing
    this.resize(gameWidth, gameHeight)
    
         this.logger.debug('BackgroundContainer', 'Window resize handled: ${gameWidth}x${gameHeight}', {
       objectId: this.id,
       newDimensions: { width: gameWidth, height: gameHeight },
       deviceTypeChanged: wasDesktop !== isNowDesktop
     }, 'handleWindowResize')
  }
  
  // ===== SETUP METHODS =====
  
  /**
   * Set up resize event listener
   */
  private setupResizeListener(): void {
    // Listen for game resize events
    this.scene.game.scale.on('resize', this.handleWindowResize.bind(this))
    
    // Listen for orientation change events
    this.scene.game.scale.on('orientationchange', this.handleOrientationChange.bind(this))
    
    // Store handler reference for cleanup
    this.resizeHandler = this.handleWindowResize.bind(this)
  }
  
  /**
   * Clean up event listeners
   */
  cleanup(): void {
    if (this.resizeHandler) {
      this.scene.game.scale.off('resize', this.resizeHandler)
      this.scene.game.scale.off('orientationchange', this.handleOrientationChange.bind(this))
      this.resizeHandler = null
    }
    
    // Clean up parent resources
    // Note: super.destroy() is not available since we're not extending Container directly
  }
  
  // ===== OVERRIDE METHODS =====
  
  /**
   * Override destroy to clean up event listeners
   */
  override destroy(): void {
    this.cleanup()
    super.destroy()
  }
  
  /**
   * Override measureLayout to return background dimensions
   */
  override measureLayout(): { width: number; height: number } {
    if (this.isBackgroundLoaded && this.backgroundDimensions) {
      return this.backgroundDimensions
    }
    
    return {
      width: this.phaserObject.width,
      height: this.phaserObject.height
    }
  }
  
  // ===== UTILITY METHODS =====
  
  /**
   * Get background information
   */
  getBackgroundInfo(): {
    isLoaded: boolean
    imageKey: string | null
    dimensions: { width: number; height: number } | null
    scalingMode: string
    alignment: { x: string; y: string }
    maintainAspectRatio: boolean
  } {
    return {
      isLoaded: this.isBackgroundLoaded,
      imageKey: this.backgroundImageKey,
      dimensions: this.backgroundDimensions,
      scalingMode: this.scalingMode,
      alignment: this.alignment,
      maintainAspectRatio: this.maintainAspectRatio
    }
  }
  
  /**
   * Update background properties
   */
  updateBackgroundProperties(properties: {
    scalingMode?: 'fit' | 'fill' | 'stretch'
    alignment?: { x: 'left' | 'center' | 'right'; y: 'top' | 'center' | 'bottom' }
    maintainAspectRatio?: boolean
  }): void {
    if (properties.scalingMode) {
      this.scalingMode = properties.scalingMode
    }
    
    if (properties.alignment) {
      this.alignment = properties.alignment
    }
    
    if (properties.maintainAspectRatio !== undefined) {
      this.maintainAspectRatio = properties.maintainAspectRatio
    }
    
    // Apply changes if background is loaded
    if (this.isBackgroundLoaded) {
      this.applyResponsiveSizing()
    }
  }
  
  /**
   * Switch background image based on device type
   */
  private switchBackgroundImageForDeviceType(width: number, _height: number): void {
    if (!this.backgroundImageKey) return
    
    const isDesktop = width >= 1024
    
    // Determine which background image to use
    let newImageKey: string
    
    if (isDesktop) {
      // Use desktop background
             if (this.scene.textures.exists('levis2025r3wheel-desktop-bg')) {
         newImageKey = 'levis2025r3wheel-desktop-bg'
       } else {
         this.logger.warn('BackgroundContainer', 'Desktop background texture not found', {
           objectId: this.id,
           availableTextures: Object.keys(this.scene.textures.list)
         }, 'switchBackgroundImageForDeviceType')
        return
      }
    } else {
      // Use mobile background
             if (this.scene.textures.exists('levis2025r3wheel-mobile-bg')) {
         newImageKey = 'levis2025r3wheel-mobile-bg'
       } else {
         this.logger.warn('BackgroundContainer', 'Mobile background texture not found', {
           objectId: this.id,
           availableTextures: Object.keys(this.scene.textures.list)
         }, 'switchBackgroundImageForDeviceType')
        return
      }
    }
    
    // Only switch if the image key is different
    if (newImageKey !== this.backgroundImageKey) {
             this.logger.debug('BackgroundContainer', 'Switching background image', {
         objectId: this.id,
         oldImageKey: this.backgroundImageKey,
         newImageKey,
         deviceType: isDesktop ? 'desktop' : 'mobile'
       }, 'switchBackgroundImageForDeviceType')
      
      // Update the background image key and reload
      this.backgroundImageKey = newImageKey
      this.loadBackgroundImage()
    }
  }
  
  /**
   * Debug background container state
   */
  debugBackgroundState(): void {
         this.logger.debug('BackgroundContainer', 'Background Container Debug:', {
       id: this.id,
       backgroundInfo: this.getBackgroundInfo(),
       containerBounds: { x: this.phaserObject.x, y: this.phaserObject.y, width: this.phaserObject.width, height: this.phaserObject.height },
       phaserObjectBounds: {
         x: this.phaserObject.x,
         y: this.phaserObject.y,
         width: this.phaserObject.width,
         height: this.phaserObject.height
       },
       children: this.children.length,
       gameDimensions: {
         width: this.scene.game.scale.width,
         height: this.scene.game.scale.height
       }
     }, 'debugBackgroundState')
  }
  
  // ===== SCALABLEGAMEOBJECT ABSTRACT METHOD IMPLEMENTATIONS =====
  
  /**
   * Handle responsive behavior changes
   */
  protected onResponsiveBehaviorChanged(oldBehavior: any, newBehavior: any): void {
         this.logger.debug('BackgroundContainer', 'Responsive behavior changed', {
       objectId: this.id,
       oldBehavior,
       newBehavior
     }, 'onResponsiveBehaviorChanged')
    
    // Handle background-specific responsive behavior changes
    if (newBehavior.deviceType !== oldBehavior.deviceType) {
      // Device type changed, switch background image if needed
      this.switchBackgroundImageForDeviceType(
        this.scene.game.scale.width,
        this.scene.game.scale.height
      )
    }
  }
  
  /**
   * Handle responsive layout changes
   */
  protected onResponsiveLayoutChanged(oldLayout: any, newLayout: any): void {
         this.logger.debug('BackgroundContainer', 'Responsive layout changed', {
       objectId: this.id,
       oldLayout,
       newLayout
     }, 'onResponsiveLayoutChanged')
    
    // Handle background-specific layout changes
    if (this.isBackgroundLoaded && this.backgroundDimensions) {
      // Apply new layout to background image
      this.applyResponsiveSizing()
    }
  }
  
  // ===== MISSING METHOD IMPLEMENTATIONS =====
  
  /**
   * Set background properties
   */
  setBackground(background: any): void {
    // Implementation for setting background
    if (background.color) {
      this.setBackgroundColor(background.color)
    }
  }
  
  /**
   * Set container constraints
   */
  setConstraints(constraints: any): void {
    // Implementation for setting constraints
    if (constraints.maintainAspectRatio !== undefined) {
      this.maintainAspectRatio = constraints.maintainAspectRatio
    }
  }
  
  /**
   * Set container type
   */
  setContainerType(type: string): void {
    // Implementation for setting container type
    (this as any).containerType = type
  }
  
  /**
   * Set interactive state
   */
  setInteractive(interactive: boolean): void {
    // Implementation for setting interactive state
    if (interactive) {
      this.phaserObject.setInteractive()
    } else {
      this.phaserObject.disableInteractive()
    }
  }
}
