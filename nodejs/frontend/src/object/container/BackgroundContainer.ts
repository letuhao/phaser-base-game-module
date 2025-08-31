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
 * - Inherits responsive behavior from Container (which extends Phaser.GameObjects.Container)
 * - Implements only background-specific logic
 * - Delegates responsive logic to parent Container class
 * - Uses Container's setStyle and applyStyleCascade for all styling
 */
export class BackgroundContainer extends Container {
  // ===== STATIC FACTORY METHOD =====
  
  /**
   * Create a BackgroundContainer instance from configuration
   * This method allows the BackgroundContainer class to create itself from config
   */
  public static createFromConfig(config: any, scene: Phaser.Scene, parent?: Phaser.GameObjects.Container): BackgroundContainer {
    const logger = Logger.getInstance()
    logger.debug('BackgroundContainer', 'createFromConfig', 'createFromConfig called', {
      objectId: config.id,
      config: config,
      sceneKey: scene.scene.key,
      hasParent: !!parent
    })
    
    try {
      const container = new BackgroundContainer(
        scene,
        config.id,
        config.x || 0,
        config.y || 0,
        parent ? (parent as any) : null
      )
      
      logger.debug('BackgroundContainer', 'createFromConfig', 'BackgroundContainer instance created', {
        objectId: config.id,
        phaserObjectType: container.constructor.name,
        position: { x: container.x, y: container.y }
      })
      
      // Apply configuration properties
      if (config.properties) {
        logger.debug('BackgroundContainer', 'createFromConfig', 'Applying properties from config', {
          objectId: config.id,
          properties: config.properties
        })
      
        // Set interactive if specified
        if (config.properties.interactive !== undefined) {
          logger.debug('BackgroundContainer', 'unknown', 'Setting interactive', {
            objectId: config.id,
            interactive: config.properties.interactive
          })
          container.setInteractive(config.properties.interactive)
        }
      }
      
      // Don't set size here - let the parent container control sizing
      // The BackgroundContainer will resize itself based on background image aspect ratio
      
      // Set name
      container.name = config.name || config.id
      
      logger.debug('BackgroundContainer', 'unknown', 'BackgroundContainer configured successfully', {
        objectId: config.id,
        finalSize: { width: container.width, height: container.height },
        finalPosition: { x: container.x, y: container.y },
        finalName: container.name
      })
      
      return container
      
    } catch (error) {
      logger.error('BackgroundContainer', 'unknown', 'Error in createFromConfig for ${config.id}:', error)
      throw error
    }
  }
  
  // ===== BACKGROUND IMAGE PROPERTIES =====
  
  /** Background image key/texture */
  private backgroundImageKey: string | null = null
  
  /** Background image object */
  private backgroundImage: Phaser.GameObjects.Image | null = null
  
  /** Background image dimensions */
  private backgroundDimensions: { width: number; height: number } | null = null
  
  /** Whether to maintain aspect ratio */
  private maintainAspectRatio: boolean = true
  
  /** Background scaling mode - now simplified to work with Container's setStyle */
  private scalingMode: 'fit' | 'fill' | 'stretch' = 'fit'
  
  /** Background alignment */
  private alignment: { x: 'left' | 'center' | 'right'; y: 'top' | 'center' | 'bottom' } = {
    x: 'center',
    y: 'center'
  }
  
  /** Background color fallback */
  private backgroundColor: string = '#000000'
  
  /** Original container dimensions for responsive sizing */
  private originalWidth: number = 1920
  private originalHeight: number = 1080
  
  /** Whether background is loaded */
  private isBackgroundLoaded: boolean = false
  
  /** Responsive background image keys - now handled by responsive configuration */
  private responsiveBackgroundImages: Map<string, string> = new Map() // breakpoint -> textureKey
  
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
    
    this.logger.debug('BackgroundContainer', 'super', 'BackgroundContainer constructor called', {
      id,
      x,
      y,
      hasParent: !!parent,
      sceneKey: scene.scene.key
    })
    
    // Set container type to background (not root anymore)
    this.setContainerType('background')
    
    // Set default constraints for background container
    this.setConstraints({
      maxChildren: 1000,
      autoSize: false, // Don't auto-size, follow background image aspect ratio
      clipOverflow: false,
      overflow: 'visible',
      respectParentBounds: true, // Now respects parent bounds
      maintainAspectRatio: true
    })
    
    // Set up resize event listener
    this.setupResizeListener()
    
    // Apply responsive sizing after a short delay to ensure parent is ready
    // This ensures the BackgroundContainer sizes itself to fill the parent container
    setTimeout(() => {
      if (this.parent) {
        this.applyResponsiveSizing()
      }
    }, 100)
  }
  
  // ===== CONFIGURATION METHODS =====
  
  /**
   * Set original dimensions for responsive sizing
   */
  setOriginalDimensions(width: number, height: number): void {
    this.originalWidth = width
    this.originalHeight = height
    this.logger.debug('BackgroundContainer', 'setOriginalDimensions', 'Original dimensions set', {
      objectId: this.id,
      originalWidth: this.originalWidth,
      originalHeight: this.originalHeight
    })
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
    this.logger.debug('BackgroundContainer', 'setOriginalDimensions', 'setBackgroundImage called', {
      objectId: this.id,
      textureKey: imageKey,
      hasTexture: this.scene.textures.exists(imageKey)
    })
    
    this.backgroundImageKey = imageKey
    this.maintainAspectRatio = options.maintainAspectRatio ?? true
    this.scalingMode = options.scalingMode ?? 'fit'
    this.alignment = options.alignment ?? { x: 'center', y: 'center' }
    this.backgroundColor = options.backgroundColor ?? '#000000'
    
    // Load the background image
    this.loadBackgroundImage(imageKey)
  }
  
  /**
   * Check if responsive background images are configured
   */
  private hasResponsiveBackgroundImages(): boolean {
    // Check if we have responsive background images configured
    const hasResponsive = this.responsiveBackgroundImages.size > 0
    this.logger.debug('BackgroundContainer', 'hasResponsiveBackgroundImages', 'Checking responsive background images', {
      objectId: this.id,
      responsiveBackgroundImages: Array.from(this.responsiveBackgroundImages.entries()),
      hasResponsive
    })
    return hasResponsive
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
    // Store the responsive background image keys for backward compatibility
    this.responsiveBackgroundImages.set('desktop', desktopImageKey)
    this.responsiveBackgroundImages.set('mobile', mobileImageKey)
    
    this.logger.debug('BackgroundContainer', 'hasResponsiveBackgroundImages', 'setResponsiveBackgroundImage called', {
      objectId: this.id,
      desktopImageKey,
      mobileImageKey,
      currentWidth: this.scene.game.scale.width
    })
    
    // Get the appropriate background image from responsive configuration
    const currentWidth = this.scene.game.scale.width
    
    // Try to get background image from responsive config first
    let selectedImageKey = this.getBackgroundImageFromResponsiveConfig(currentWidth)
    
    // Fallback to legacy desktop/mobile logic if no responsive config
    if (!selectedImageKey) {
      const isDesktop = currentWidth >= 992 // lg breakpoint
      selectedImageKey = isDesktop ? desktopImageKey : mobileImageKey
    }
    
    this.logger.debug('BackgroundContainer', 'hasResponsiveBackgroundImages', 'Selected background image', {
      objectId: this.id,
      selectedImageKey,
      currentWidth,
      hasResponsiveConfig: !!selectedImageKey
    })
    
    // Set the selected background image
    this.setBackgroundImage(selectedImageKey, options)
  }
  
  /**
   * Load background image from texture
   */
  private loadBackgroundImage(imageKey: string): void {
    if (!imageKey) return
    
    try {
      // Check if texture exists
      if (!this.scene.textures.exists(imageKey)) {
        this.logger.warn('BackgroundContainer', 'loadBackgroundImage', `Background texture "${imageKey}" not found`, {
          objectId: this.id,
          availableTextures: Object.keys(this.scene.textures.list)
        })
        return
      }
      
      // Remove existing background image
      if (this.backgroundImage) {
        this.logger.debug('BackgroundContainer', 'loadBackgroundImage', 'Removing existing background image', {
          objectId: this.id
        })
        this.backgroundImage.destroy()
        this.backgroundImage = null
      }
      
      // Create new background image
      this.backgroundImage = this.scene.add.image(0, 0, imageKey)
      
      // Get background dimensions
      this.backgroundDimensions = {
        width: this.backgroundImage!.width,
        height: this.backgroundImage!.height
      }
      
      // Add to BackgroundContainer (not scene)
      this.add(this.backgroundImage)
      
      // Mark as loaded
      this.isBackgroundLoaded = true
      
      // Ensure correct z-order
      this.ensureBackgroundImageZOrder()
      
      // Refresh z-order of all child elements
      this.refreshChildZOrders()
      
      // Apply responsive sizing based on parent container
      this.applyResponsiveSizing()
      
      this.logger.debug('BackgroundContainer', 'loadBackgroundImage', 'Background image loaded: ${imageKey}', {
        objectId: this.id,
        imageSize: { width: this.backgroundImage!.width, height: this.backgroundImage!.height }
      })
      
    } catch (error) {
      this.logger.error('BackgroundContainer', 'loadBackgroundImage', 'Failed to load background image:', error)
      this.isBackgroundLoaded = false
    }
  }
  
  /**
   * Remove background image
   */
  removeBackgroundImage(): void {
    if (this.backgroundImage) {
      this.logger.debug('BackgroundContainer', 'removeBackgroundImage', 'Removing background image', {
        objectId: this.id
      })
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
    
    // If no background image, create a colored rectangle with current dimensions
    if (!this.isBackgroundLoaded) {
      this.createBackgroundRectangle()
    }
  }
  
  /**
   * Create background rectangle when no image is loaded
   */
  private createBackgroundRectangle(width?: number, height?: number): void {
    // Remove existing background graphics
    this.list.forEach((child: any) => {
      if (child instanceof Phaser.GameObjects.Graphics) {
        child.destroy()
      }
    })
    
    // Use provided dimensions or fall back to container dimensions
    const rectWidth = width ?? this.width
    const rectHeight = height ?? this.height
    
    // Create colored rectangle
    const graphics = this.scene.add.graphics()
    graphics.fillStyle(Phaser.Display.Color.ValueToColor(this.backgroundColor).color)
    graphics.fillRect(0, 0, rectWidth, rectHeight)
    
    // Add to container
    this.add(graphics)
    
    this.logger.debug('BackgroundContainer', 'createBackgroundRectangle', 'Background rectangle created/updated', {
      objectId: this.id,
      backgroundColor: this.backgroundColor,
      rectangleSize: { width: rectWidth, height: rectHeight },
      containerSize: { width: this.width, height: this.height }
    })
  }
  
  // ===== SIMPLIFIED RESPONSIVE LOGIC =====
  
  /**
   * Get background image key from responsive configuration for a given width
   * Now simplified to work with Container's responsive system
   */
  private getBackgroundImageFromResponsiveConfig(width: number): string | undefined {
    try {
      // Use Container's injected configs if available
      if (this.injectedConfigs?.responsive) {
        const objectId = this.id || 'background-container'
        
        // Check responsive breakpoints first
        if (this.injectedConfigs.responsive.responsiveSettings) {
          const breakpoints = this.injectedConfigs.responsive.responsiveSettings
          for (const [, layouts] of Object.entries(breakpoints)) {
            const typedLayouts = layouts as Array<{
              id: string
              breakpointCondition: { minWidth: number; maxWidth?: number }
              layoutProperties: any
            }>
            
            // Find the layout for this object
            const objectLayout = typedLayouts.find(layout => layout.id === objectId)
            if (objectLayout) {
              const { minWidth, maxWidth } = objectLayout.breakpointCondition
              if (width >= minWidth && (maxWidth === undefined || width <= maxWidth)) {
                return objectLayout.layoutProperties.backgroundImage
              }
            }
          }
        }
        
        // If no responsive breakpoint matches, check default
        if (this.injectedConfigs.responsive.default) {
          const defaultLayout = (this.injectedConfigs.responsive.default as Array<{
            id: string
            breakpointCondition: { minWidth: number; maxWidth?: number }
            layoutProperties: any
          }>).find(layout => layout.id === objectId)
          
          if (defaultLayout) {
            return defaultLayout.layoutProperties.backgroundImage
          }
        }
      }
      
      // Fallback to legacy responsive background images
      if (this.responsiveBackgroundImages.size > 0) {
        const isDesktop = width >= 992 // lg breakpoint
        return isDesktop ? 
          this.responsiveBackgroundImages.get('desktop') : 
          this.responsiveBackgroundImages.get('mobile')
      }
      
    } catch (error) {
      this.logger.warn('BackgroundContainer', 'getBackgroundImageFromResponsiveConfig', 'Failed to get background image from responsive config', {
        objectId: this.id,
        width,
        error: error instanceof Error ? error.message : String(error)
      })
    }
    
    return undefined
  }
  
  /**
   * Apply responsive sizing based on parent container dimensions
   * Now simplified to work with Container's responsive system
   */
  private applyResponsiveSizing(): void {
    if (!this.parent) return
    
    // Get parent container dimensions
    const parentBounds = this.parent.getContainerBounds()
    const parentWidth = parentBounds.width
    const parentHeight = parentBounds.height
    
    // Always resize BackgroundContainer to fit parent, regardless of background image status
    this.resize(parentWidth, parentHeight)
    
    // Propagate resize to children
    this.propagateResizeToChildren(parentWidth, parentHeight)
    
    this.logger.debug('BackgroundContainer', 'applyResponsiveSizing', 'Responsive sizing applied from parent', {
      objectId: this.id,
      parentDimensions: { width: parentWidth, height: parentHeight },
      finalSize: { width: this.width, height: this.height },
      hasBackgroundImage: this.isBackgroundLoaded
    })
  }
  
  // ===== SIMPLIFIED SCALE STRATEGY LOGIC =====
  
  /**
   * Scale background image to fill container size
   * Now simplified to work with Container's setStyle system
   */
  private scaleBackgroundImageToFit(): void {
    if (!this.backgroundImage || !this.backgroundDimensions) return
    
    // Get current responsive behavior from Container's injected configs
    const responsiveBehavior = this.getCurrentResponsiveBehaviorFromContainer()
    
    // Apply scaling based on responsive scaleStrategy
    switch (responsiveBehavior.scaleStrategy) {
      case 'fit':
        if (responsiveBehavior.maintainAspectRatio) {
          // Fit image within container while maintaining aspect ratio
          const imageAspectRatio = this.backgroundDimensions.width / this.backgroundDimensions.height
          const containerAspectRatio = this.width / this.height
          
          let displayWidth: number
          let displayHeight: number
          
          if (containerAspectRatio > imageAspectRatio) {
            // Container is wider, fit by height
            displayHeight = this.height
            displayWidth = displayHeight * imageAspectRatio
          } else {
            // Container is taller, fit by width
            displayWidth = this.width
            displayHeight = displayWidth / imageAspectRatio
          }
          
          this.backgroundImage.setDisplaySize(displayWidth, displayHeight)
          
          // Center the image within the container
          this.backgroundImage.setPosition(this.width / 2, this.height / 2)
          
          this.logger.debug('BackgroundContainer', 'scaleBackgroundImageToFit', 'Background image fitted with aspect ratio', {
            objectId: this.id,
            containerSize: { width: this.width, height: this.height },
            imageDisplaySize: { width: displayWidth, height: displayHeight },
            imagePosition: { x: this.width / 2, y: this.height / 2 },
            scaleStrategy: 'fit',
            maintainAspectRatio: true
          })
        } else {
          // Fit to container without maintaining aspect ratio
          this.backgroundImage.setDisplaySize(this.width, this.height)
          this.backgroundImage.setPosition(this.width / 2, this.height / 2)
          
          this.logger.debug('BackgroundContainer', 'scaleBackgroundImageToFit', 'Background image fitted without aspect ratio', {
            objectId: this.id,
            containerSize: { width: this.width, height: this.height },
            imageDisplaySize: { width: this.width, height: this.height },
            imagePosition: { x: this.width / 2, y: this.height / 2 },
            scaleStrategy: 'fit',
            maintainAspectRatio: false
          })
        }
        break
        
      case 'stretch':
      default:
        // Stretch image to fill container completely (may distort)
        this.backgroundImage.setDisplaySize(this.width, this.height)
        this.backgroundImage.setPosition(this.width / 2, this.height / 2)
        
        this.logger.debug('BackgroundContainer', 'scaleBackgroundImageToFit', 'Background image stretched to fill container', {
          objectId: this.id,
          containerSize: { width: this.width, height: this.height },
          imageDisplaySize: { width: this.width, height: this.height },
          imagePosition: { x: this.width / 2, y: this.height / 2 },
                      scaleStrategy: 'stretch',
            note: 'Image stretched to fill container completely'
          })
        break
    }
    
    // Always ensure lower z-order so UI elements appear above background
    this.ensureBackgroundImageZOrder()
  }
  
  /**
   * Get current responsive behavior from Container's injected configs
   * Now simplified to work with Container's responsive system
   */
  private getCurrentResponsiveBehaviorFromContainer(): {
    maintainAspectRatio: boolean
    scaleStrategy: 'fit' | 'stretch' | 'fill'
    alignment: string
  } {
    // Use Container's injected configs if available
    if (this.injectedConfigs?.responsive) {
      const objectId = this.id || 'background-container'
      
      // Check responsive breakpoints first
      if (this.injectedConfigs.responsive.responsiveSettings && this.injectedConfigs.currentBreakpoint) {
        const breakpointLayouts = this.injectedConfigs.responsive.responsiveSettings[this.injectedConfigs.currentBreakpoint]
        
        if (breakpointLayouts) {
          const breakpointLayout = breakpointLayouts.find(
            (layout: any) => layout.id === objectId
          )
          
          if (breakpointLayout?.layoutProperties) {
            return {
              maintainAspectRatio: breakpointLayout.layoutProperties.maintainAspectRatio ?? true,
              scaleStrategy: breakpointLayout.layoutProperties.scaleStrategy ?? 'fit',
              alignment: breakpointLayout.layoutProperties.alignment ?? 'center'
            }
          }
        }
      }
      
      // If no responsive breakpoint matches, use default
      if (this.injectedConfigs.responsive.default) {
        const defaultLayout = (this.injectedConfigs.responsive.default as Array<{
          id: string
          breakpointCondition: { minWidth: number; maxWidth?: number }
          layoutProperties: any
        }>).find(layout => layout.id === objectId)
        
        if (defaultLayout) {
          return {
            maintainAspectRatio: defaultLayout.layoutProperties.maintainAspectRatio ?? true,
            scaleStrategy: defaultLayout.layoutProperties.scaleStrategy ?? 'fit',
            alignment: defaultLayout.layoutProperties.alignment ?? 'center'
          }
        }
      }
    }
    
    // Fallback to local properties
    return {
      maintainAspectRatio: this.maintainAspectRatio,
      scaleStrategy: this.scalingMode,
      alignment: this.alignment.x + '-' + this.alignment.y
    }
  }
  
  // ===== DEVICE ORIENTATION HANDLING =====
  
  // Note: Window resize and orientation change events are handled by the parent container/scene
  // This container only responds to resize() calls from its parent
  
  // ===== SETUP METHODS =====
  
  /**
   * Set up resize event listener
   */
  private setupResizeListener(): void {
    // No direct event listeners - resize events come from parent container
    // This maintains the solid architecture where containers only respond to resize() calls
  }
  
  /**
   * Clean up event listeners
   */
  cleanup(): void {
    // No event listeners to clean up
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
  measureLayout(): { width: number; height: number } {
    if (this.isBackgroundLoaded && this.backgroundDimensions) {
      return this.backgroundDimensions
    }
    
    return {
      width: this.width,
      height: this.height
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
      this.logger.debug('BackgroundContainer', 'getBackgroundInfo', 'Alignment updated', {
        objectId: this.id,
        newAlignment: properties.alignment,
        oldAlignment: this.alignment
      })
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
   * Set alignment for the background image
   * @param alignment - New alignment configuration
   */
  setAlignment(alignment: { x: 'left' | 'center' | 'right'; y: 'top' | 'center' | 'bottom' }): void {
    this.logger.debug('BackgroundContainer', 'setAlignment', 'Setting alignment', {
      objectId: this.id,
      oldAlignment: this.alignment,
      newAlignment: alignment
    })
    
    this.alignment = alignment
    
    // Apply the new alignment immediately if background is loaded
    if (this.isBackgroundLoaded) {
      this.applyResponsiveSizing()
    }
  }
  
  /**
   * Get current alignment
   */
  getAlignment(): { x: 'left' | 'center' | 'right'; y: 'top' | 'center' | 'bottom' } {
    return { ...this.alignment }
  }
  
  /**
   * Switch background image based on device type using responsive configuration
   */
  private switchBackgroundImageForDeviceType(width: number, _height: number): void {
    if (this.responsiveBackgroundImages.size === 0) {
      this.logger.debug('BackgroundContainer', 'switchBackgroundImageForDeviceType', 'No responsive background images configured', {
        objectId: this.id,
        responsiveBackgroundImages: Array.from(this.responsiveBackgroundImages.entries())
      })
      return
    }
    
    // Get responsive configuration from Container's injected configs
    const newImageKey = this.getBackgroundImageFromResponsiveConfig(width)
    
    if (!newImageKey) {
      this.logger.warn('BackgroundContainer', 'switchBackgroundImageForDeviceType', 'No background image found in responsive config', {
        objectId: this.id,
        width
      })
      return
    }
    
    // Check if the texture exists
    if (!this.scene.textures.exists(newImageKey)) {
      this.logger.warn('BackgroundContainer', 'switchBackgroundImageForDeviceType', 'Background texture not found', {
        objectId: this.id,
        textureKey: newImageKey,
        availableTextures: Object.keys(this.scene.textures.list)
      })
      return
    }
    
    // Only switch if the image key is different
    if (newImageKey !== this.backgroundImageKey) {
      this.logger.debug('BackgroundContainer', 'switchBackgroundImageForDeviceType', 'Switching background image', {
        objectId: this.id,
        oldImageKey: this.backgroundImageKey,
        newImageKey,
        width
      })
      
      // Update the background image key and reload
      this.backgroundImageKey = newImageKey
      this.loadBackgroundImage(newImageKey)
      
      // Ensure the new background image has the correct z-order
      this.ensureBackgroundImageZOrder()
      
      // Refresh z-order of all child elements
      this.refreshChildZOrders()
      
      // Force a re-render to ensure proper z-order
      this.scene.events.emit('backgroundImageSwitched', this.id)
    } else {
      this.logger.debug('BackgroundContainer', 'switchBackgroundImageForDeviceType', 'Background image already correct for device type', {
        objectId: this.id,
        currentImageKey: this.backgroundImageKey,
        newImageKey,
        width
      })
    }
  }
  
  /**
   * Debug background container state
   */
  debugBackgroundState(): void {
    this.logger.debug('BackgroundContainer', 'debugBackgroundState', 'Background Container Debug:', {
      id: this.id,
      backgroundInfo: this.getBackgroundInfo(),
      containerBounds: { x: this.x, y: this.y, width: this.width, height: this.height },
      phaserObjectBounds: {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      },
      children: this.children.length,
      gameDimensions: {
        width: this.scene.game.scale.width,
        height: this.scene.game.scale.height
      },
      currentAlignment: this.alignment
    })
  }
  
  /**
   * Test different alignment configurations
   * Useful for debugging and testing alignment behavior
   */
  testAlignments(): void {
    const alignments = [
      { x: 'left', y: 'top' },
      { x: 'center', y: 'top' },
      { x: 'right', y: 'top' },
      { x: 'left', y: 'center' },
      { x: 'center', y: 'center' },
      { x: 'right', y: 'center' },
      { x: 'left', y: 'bottom' },
      { x: 'center', y: 'bottom' },
      { x: 'right', y: 'bottom' }
    ]
    
    this.logger.debug('BackgroundContainer', 'testAlignments', 'Testing all alignment configurations', {
      objectId: this.id,
      alignments
    })
    
    // Test center alignment first (most common use case)
    this.setAlignment({ x: 'center', y: 'center' })
    
    // You can uncomment the following lines to cycle through all alignments
    // let currentIndex = 0
    // const interval = setInterval(() => {
    //   this.setAlignment(alignments[currentIndex])
    //   currentIndex = (currentIndex + 1) % alignments.length
    // }, 2000) // Change alignment every 2 seconds
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
   * Ensure background image has correct z-order
   */
  private ensureBackgroundImageZOrder(): void {
    if (this.backgroundImage) {
      this.backgroundImage.setDepth(-1)
      this.logger.debug('BackgroundContainer', 'ensureBackgroundImageZOrder', 'Background image z-order ensured', {
        objectId: this.id,
        depth: -1
      })
    }
  }
  
  /**
   * Force refresh z-order of all child elements
   * This ensures proper layering after background image changes
   */
  private refreshChildZOrders(): void {
    this.logger.debug('BackgroundContainer', 'refreshChildZOrders', 'Refreshing child z-orders', {
      objectId: this.id,
      childCount: this.children.length
    })
    
    // Try multiple paths to find scene configuration
    let sceneConfig: any = null
    let configPath = 'unknown'
    
    // Try different possible paths for scene configuration
    if ((this.scene as any).sceneConfigs?.scene?.gameObjects) {
      sceneConfig = (this.scene as any).sceneConfigs.scene
      configPath = 'sceneConfigs.scene'
    } else if ((this.scene as any).sceneConfigs?.gameObjects) {
      sceneConfig = (this.scene as any).sceneConfigs
      configPath = 'sceneConfigs'
    } else if ((this.scene as any).configManager?.sceneLoader?.sceneConfig?.gameObjects) {
      sceneConfig = (this.scene as any).configManager.sceneLoader.sceneConfig
      configPath = 'configManager.sceneLoader.sceneConfig'
    } else if ((this.scene as any).configManager?.sceneConfig?.gameObjects) {
      sceneConfig = (this.scene as any).configManager.sceneConfig
      configPath = 'configManager.sceneConfig'
    }
    
    if (!sceneConfig?.gameObjects) {
      this.logger.debug('BackgroundContainer', 'sceneConfig', 'No scene config available for z-order refresh, using fallback', {
        objectId: this.id,
        triedPaths: [
          'sceneConfigs.scene',
          'sceneConfigs', 
          'configManager.sceneLoader.sceneConfig',
          'configManager.sceneConfig'
        ],
        availablePaths: Object.keys((this.scene as any) || {}),
        hasSceneConfigs: !!(this.scene as any).sceneConfigs,
        hasConfigManager: !!(this.scene as any).configManager
      })
      
      // Use fallback z-order assignment
      this.assignFallbackZOrders()
      return
    }
    
    // Find the background container config to get child z-orders
    const backgroundConfig = sceneConfig.gameObjects.find((obj: any) => obj.id === this.id)
    if (!backgroundConfig?.children) {
      this.logger.debug('BackgroundContainer', 'sceneConfig', 'No background config found for z-order refresh, using fallback', {
        objectId: this.id,
        configPath,
        availableGameObjects: sceneConfig.gameObjects?.map((obj: any) => obj.id) || [],
        backgroundConfig: backgroundConfig || 'not found'
      })
      
      // Use fallback z-order assignment
      this.assignFallbackZOrders()
      return
    }
    
    // Iterate through all children and ensure they have proper z-order from config
    this.children.forEach((child: any, index: number) => {
      if (child && typeof child.setDepth === 'function') {
        // Find the child config to get its z-order
        const childConfig = backgroundConfig.children.find((config: any) => 
          config.id === child.name || config.id === child.id || config.id === child.id
        )
        
        if (childConfig?.zOrder !== undefined) {
          // Use z-order from scene configuration
          child.setDepth(childConfig.zOrder)
          this.logger.debug('BackgroundContainer', 'sceneConfig', 'Child z-order refreshed from config', {
            objectId: this.id,
            childName: child.name || child.id || 'unnamed',
            childIndex: index,
            configZOrder: childConfig.zOrder,
            configPath
          })
        } else {
          // Fallback to default z-order if not specified in config
          const fallbackZOrder = index + 1
          child.setDepth(fallbackZOrder)
          this.logger.debug('BackgroundContainer', 'sceneConfig', 'Child z-order set to fallback', {
            objectId: this.id,
            childName: child.name || child.id || 'unnamed',
            childIndex: index,
            fallbackZOrder: fallbackZOrder,
            configPath
                      })
        }
      }
    })
  }
  
  /**
   * Assign fallback z-orders when no configuration is available
   */
  private assignFallbackZOrders(): void {
    this.logger.debug('BackgroundContainer', 'assignFallbackZOrders', 'Assigning fallback z-orders', {
      objectId: this.id,
      childCount: this.children.length
    })
    
    // Assign sequential z-orders to children
    this.children.forEach((child: any, index: number) => {
      if (child && typeof child.setDepth === 'function') {
        const fallbackZOrder = index + 1
        child.setDepth(fallbackZOrder)
        
        this.logger.debug('BackgroundContainer', 'assignFallbackZOrders', 'Fallback z-order assigned', {
          objectId: this.id,
          childName: child.name || child.id || 'unnamed',
          childIndex: index,
          fallbackZOrder: fallbackZOrder
        })
      }
    })
  }
  
  /**
   * Set interactive state
   */
  setInteractive(interactive: boolean): this {
    if (interactive) {
      // Call Phaser's built-in setInteractive method without parameters
      (this as any).setInteractive()
    } else {
      this.disableInteractive()
    }
    return this
  }
  
  // ===== OVERRIDE CONTAINER METHODS =====
  
  /**
   * Override resizeSelf to implement custom background container resize logic
   * This is part of the template method pattern from the parent Container class
   * Now simplified to work with Container's setStyle system
   */
  protected override resizeSelf(width: number, height: number): void {
    this.logger.debug('BackgroundContainer', 'setInteractive', 'resizeSelf called', {
      objectId: this.id,
      newDimensions: { width, height },
      currentDimensions: { width: this.width, height: this.height },
      hasBackgroundImage: !!this.backgroundImage,
      hasParent: !!this.parent
    });
    
    // Check if background image should be switched based on device type
    if (this.backgroundImageKey && this.hasResponsiveBackgroundImages()) {
      this.logger.debug('BackgroundContainer', 'setInteractive', 'Checking if background image should be switched', {
        objectId: this.id,
        currentWidth: width,
        hasBackgroundImageKey: !!this.backgroundImageKey,
        hasResponsiveBackgroundImages: this.hasResponsiveBackgroundImages(),
        responsiveBackgroundImages: Array.from(this.responsiveBackgroundImages.entries())
      });
      this.switchBackgroundImageForDeviceType(width, height);
    } else {
      this.logger.debug('BackgroundContainer', 'setInteractive', 'Skipping background image switch check', {
        objectId: this.id,
        hasBackgroundImageKey: !!this.backgroundImageKey,
        hasResponsiveBackgroundImages: this.hasResponsiveBackgroundImages(),
        responsiveBackgroundImages: Array.from(this.responsiveBackgroundImages.entries())
      });
    }
    
    if (this.isBackgroundLoaded && this.backgroundDimensions) {
      // Get current responsive behavior from Container's injected configs
      const responsiveBehavior = this.getCurrentResponsiveBehaviorFromContainer();
      this.logger.debug('BackgroundContainer', 'setInteractive', 'Background image loaded, applying responsive behavior', {
        objectId: this.id,
        responsiveBehavior,
        scaleStrategy: responsiveBehavior.scaleStrategy,
        maintainAspectRatio: responsiveBehavior.maintainAspectRatio
      });
      
      let finalWidth: number;
      let finalHeight: number;
      let finalPosition: { x: number; y: number };
      
      // Apply responsive logic based on Container's responsive config
      switch (responsiveBehavior.scaleStrategy) {
        case 'fit':
          if (responsiveBehavior.maintainAspectRatio) {
            // Fit within available space while maintaining aspect ratio
            const imageAspectRatio = this.backgroundDimensions.width / this.backgroundDimensions.height;
            const containerAspectRatio = width / height;
            
            if (containerAspectRatio > imageAspectRatio) {
              // Container is wider, fit by height
              finalHeight = height;
              finalWidth = finalHeight * imageAspectRatio;
            } else {
              // Container is taller, fit by width
              finalWidth = width;
              finalHeight = finalWidth / imageAspectRatio;
            }
            
            // Center the BackgroundContainer within the available space
            const centerX = width / 2;
            const centerY = height / 2;
            finalPosition = { 
              x: centerX - (finalWidth / 2), 
              y: centerY - (finalHeight / 2) 
            };
          } else {
            // Don't maintain aspect ratio, use available dimensions
            finalWidth = width;
            finalHeight = height;
            finalPosition = { x: 0, y: 0 };
          }
          break;
          
        case 'stretch':
        default:
          // Stretch to fill available space (may distort)
          finalWidth = width;
          finalHeight = height;
          finalPosition = { x: 0, y: 0 };
          break;
      }
      
      // Set BackgroundContainer size based on responsive calculations
      this.setSize(finalWidth, finalHeight);
      this.setPosition(finalPosition.x, finalPosition.y);
      
      // Scale background image to fill this container
      this.scaleBackgroundImageToFit();
      
      this.logger.debug('BackgroundContainer', 'setInteractive', 'Background container resized with responsive behavior', {
        objectId: this.id,
        responsiveBehavior,
        finalSize: { width: finalWidth, height: finalHeight },
        finalPosition,
        backgroundDimensions: this.backgroundDimensions
              });
    } else {
      // No background image, use Container's responsive sizing
      // The Container class will handle this through its setStyle method
      this.logger.debug('BackgroundContainer', 'unknown', 'No background image, using Container responsive sizing', {
        objectId: this.id,
        providedDimensions: { width, height }
              });
    }
  }
  
  /**
   * Override resizeAfter to implement post-resize operations specific to background containers
   * This is part of the template method pattern from the parent Container class
   */
  protected override resizeAfter(width: number, height: number): void {
    this.logger.debug('BackgroundContainer', 'unknown', 'resizeAfter called', {
      objectId: this.id,
      newDimensions: { width, height }
    });
    
    // Ensure background image z-order is correct after resize
    this.ensureBackgroundImageZOrder();
    
    // Refresh z-orders of all children
    this.refreshChildZOrders();
    
    this.logger.debug('BackgroundContainer', 'unknown', 'Post-resize operations completed', {
      objectId: this.id
    })
  }
}
