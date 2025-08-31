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
        phaserObjectType: container.constructor.name,
        position: { x: container.x, y: container.y }
      }, 'createFromConfig')
      
        // Apply configuration properties
        if (config.properties) {
          logger.debug('BackgroundContainer', 'Applying properties from config', {
            objectId: config.id,
            properties: config.properties
          }, 'createFromConfig')
        
          // Set interactive if specified
          if (config.properties.interactive !== undefined) {
            logger.debug('BackgroundContainer', 'Setting interactive', {
              objectId: config.id,
              interactive: config.properties.interactive
            }, 'createFromConfig')
            container.setInteractive(config.properties.interactive)
          }
        }
        
        // Don't set size here - let the parent container control sizing
        // The BackgroundContainer will resize itself based on background image aspect ratio
        
        // Set name
        container.name = config.name || config.id
        
        logger.debug('BackgroundContainer', 'BackgroundContainer configured successfully', {
          objectId: config.id,
          finalSize: { width: container.width, height: container.height },
          finalPosition: { x: container.x, y: container.y },
          finalName: container.name
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
   
   /** Original container dimensions for responsive sizing */
   private originalWidth: number = 1920
   private originalHeight: number = 1080
   
   /** Whether background is loaded */
   private isBackgroundLoaded: boolean = false
   
       /** Responsive background image keys - now handled by responsive configuration */
    private responsiveBackgroundImages: Map<string, string> = new Map() // breakpoint -> textureKey
   
   /** Responsive behavior configuration */
   private responsiveConfig: {
     deviceType: 'desktop' | 'mobile'
     scaleStrategy: 'fit' | 'stretch' | 'fill'
     maintainAspectRatio: boolean
     alignment: { x: 'left' | 'center' | 'right'; y: 'top' | 'center' | 'bottom' }
   } = {
     deviceType: 'desktop',
     scaleStrategy: 'fit',
     maintainAspectRatio: true,
     alignment: { x: 'center', y: 'center' }
   }
  
     // Note: No direct event handlers - resize events come from parent container
  
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
     this.logger.debug('BackgroundContainer', 'Original dimensions set', {
       objectId: this.id,
       originalWidth: this.originalWidth,
       originalHeight: this.originalHeight
     }, 'setOriginalDimensions')
   }
   
   /**
    * Set responsive configuration
    */
   setResponsiveConfig(config: {
     deviceType: 'desktop' | 'mobile'
     scaleStrategy: 'fit' | 'stretch' | 'fill'
     maintainAspectRatio: boolean
     alignment: { x: 'left' | 'center' | 'right'; y: 'top' | 'center' | 'bottom' }
   }): void {
     this.responsiveConfig = { ...config }
     this.logger.debug('BackgroundContainer', 'Responsive config set', {
       objectId: this.id,
       responsiveConfig: this.responsiveConfig
     }, 'setResponsiveConfig')
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
    this.loadBackgroundImage(imageKey)
  }
  
         /**
     * Check if responsive background images are configured
     */
    private hasResponsiveBackgroundImages(): boolean {
      // Check if we have responsive background images configured
      const hasResponsive = this.responsiveBackgroundImages.size > 0
      this.logger.debug('BackgroundContainer', 'Checking responsive background images', {
        objectId: this.id,
        responsiveBackgroundImages: Array.from(this.responsiveBackgroundImages.entries()),
        hasResponsive
      }, 'hasResponsiveBackgroundImages')
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
      
      this.logger.debug('BackgroundContainer', 'setResponsiveBackgroundImage called', {
        objectId: this.id,
        desktopImageKey,
        mobileImageKey,
        currentWidth: this.scene.game.scale.width
      }, 'setResponsiveBackgroundImage')
     
      // Get the appropriate background image from responsive configuration
      const currentWidth = this.scene.game.scale.width
      
      // Try to get background image from responsive config first
      let selectedImageKey = this.getBackgroundImageFromResponsiveConfig(currentWidth)
      
      // Fallback to legacy desktop/mobile logic if no responsive config
      if (!selectedImageKey) {
        const isDesktop = currentWidth >= 992 // lg breakpoint
        selectedImageKey = isDesktop ? desktopImageKey : mobileImageKey
      }
      
      this.logger.debug('BackgroundContainer', 'Selected background image', {
        objectId: this.id,
        selectedImageKey,
        currentWidth,
        hasResponsiveConfig: !!selectedImageKey
      }, 'setResponsiveBackgroundImage')
     
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
        this.logger.warn('BackgroundContainer', `Background texture "${imageKey}" not found`, {
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
      
      this.logger.debug('BackgroundContainer', `Background image loaded: ${imageKey}`, {
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
     
     this.logger.debug('BackgroundContainer', 'Background rectangle created/updated', {
       objectId: this.id,
       backgroundColor: this.backgroundColor,
       rectangleSize: { width: rectWidth, height: rectHeight },
       containerSize: { width: this.width, height: this.height }
     }, 'createBackgroundRectangle')
   }
  
  // ===== RESPONSIVE SIZING =====
   
       /**
     * Get current breakpoint key for a given width
     */
    private getCurrentBreakpointKey(width: number): string {
      try {
        const responsiveConfig = this.getSceneResponsiveConfig()
        
        // First check if we have the new responsive config structure
        if (responsiveConfig.responsiveSettings) {
          const breakpoints = responsiveConfig.responsiveSettings
          for (const [key, layouts] of Object.entries(breakpoints)) {
            const typedLayouts = layouts as Array<{
              id: string
              breakpointCondition: { minWidth: number; maxWidth?: number }
              layoutProperties: any
            }>
            
            // Check if any layout in this breakpoint matches the width
            const hasMatch = typedLayouts.some(layout => {
              const { minWidth, maxWidth } = layout.breakpointCondition
              return width >= minWidth && (maxWidth === undefined || width <= maxWidth)
            })
            
            if (hasMatch) {
              return key
            }
          }
        }
        
        // Fallback to legacy structure if new structure not available
        if (responsiveConfig.breakpoints) {
          const breakpoints = responsiveConfig.breakpoints
          for (const [key, breakpoint] of Object.entries(breakpoints)) {
            const typedBreakpoint = breakpoint as {
              minWidth: number
              maxWidth?: number
              behavior: {
                maintainAspectRatio: boolean
                scaleStrategy: 'fit' | 'stretch'
                alignment: string
                backgroundImage?: string
              }
            }
            
            if (width >= typedBreakpoint.minWidth && 
                (typedBreakpoint.maxWidth === undefined || width <= typedBreakpoint.maxWidth)) {
              return key
            }
          }
        }
      } catch (error) {
        this.logger.warn('BackgroundContainer', 'Failed to get current breakpoint key', {
          objectId: this.id,
          width,
          error: error instanceof Error ? error.message : String(error)
        }, 'getCurrentBreakpointKey')
      }
      
      return 'lg' // fallback to default
    }

    /**
     * Get background image key from responsive configuration for a given width
     */
    private getBackgroundImageFromResponsiveConfig(width: number): string | undefined {
      try {
        const responsiveConfig = this.getSceneResponsiveConfig()
        const objectId = this.id || 'background-container'
        
        // First check if we have the new responsive config structure
        if (responsiveConfig.responsiveSettings) {
          const breakpoints = responsiveConfig.responsiveSettings
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
          
          // If no responsive breakpoint matches, check default
          if (responsiveConfig.default) {
            const defaultLayout = (responsiveConfig.default as Array<{
              id: string
              breakpointCondition: { minWidth: number; maxWidth?: number }
              layoutProperties: any
            }>).find(layout => layout.id === objectId)
            
            if (defaultLayout) {
              return defaultLayout.layoutProperties.backgroundImage
            }
          }
        }
        
        // Fallback to legacy structure if new structure not available
        if (responsiveConfig.breakpoints) {
          const breakpoints = responsiveConfig.breakpoints
          for (const [, breakpoint] of Object.entries(breakpoints)) {
            const typedBreakpoint = breakpoint as {
              minWidth: number
              maxWidth?: number
              behavior: {
                maintainAspectRatio: boolean
                scaleStrategy: 'fit' | 'stretch'
                alignment: string
                backgroundImage?: string
              }
            }
            
            if (width >= typedBreakpoint.minWidth && 
                (typedBreakpoint.maxWidth === undefined || width <= typedBreakpoint.maxWidth)) {
              return typedBreakpoint.behavior.backgroundImage
            }
          }
        }
      } catch (error) {
        this.logger.warn('BackgroundContainer', 'Failed to get background image from responsive config', {
          objectId: this.id,
          width,
          error: error instanceof Error ? error.message : String(error)
        }, 'getBackgroundImageFromResponsiveConfig')
      }
      
      return undefined
    }

    /**
     * Get responsive configuration from scene
     */
    private getSceneResponsiveConfig(): any {
      // Try to get responsive config from scene
      const sceneConfigs = (this.scene as any).sceneConfigs
      if (sceneConfigs?.responsive) {
        this.logger.debug('BackgroundContainer', 'Found responsive config in scene', {
          objectId: this.id,
          responsiveConfig: sceneConfigs.responsive
        }, 'getSceneResponsiveConfig')
        return sceneConfigs.responsive
      }
      
      // Try alternative access paths
      if ((this.scene as any).configManager?.responsiveLoader) {
        const responsiveConfig = (this.scene as any).configManager.responsiveLoader.getConfig('levis2025r3wheel')
        if (responsiveConfig) {
          this.logger.debug('BackgroundContainer', 'Found responsive config via configManager', {
            objectId: this.id,
            responsiveConfig
          }, 'getSceneResponsiveConfig')
          return responsiveConfig
        }
      }
      
      this.logger.warn('BackgroundContainer', 'No responsive config found, using fallback', {
        objectId: this.id,
        sceneConfigs: sceneConfigs ? Object.keys(sceneConfigs) : 'undefined',
        hasConfigManager: !!(this.scene as any).configManager
      }, 'getSceneResponsiveConfig')
      
      // Fallback to default config - now using the new responsive config structure
      return {
        // New structure
        responsiveSettings: {
          xs: [
            {
              id: 'background-container',
              breakpointCondition: { minWidth: 0, maxWidth: 575 },
              layoutProperties: {
                maintainAspectRatio: false,
                scaleStrategy: 'stretch',
                alignment: 'center'
              }
            }
          ],
          sm: [
            {
              id: 'background-container',
              breakpointCondition: { minWidth: 576, maxWidth: 767 },
              layoutProperties: {
                maintainAspectRatio: false,
                scaleStrategy: 'stretch',
                alignment: 'center'
              }
            }
          ],
          md: [
            {
              id: 'background-container',
              breakpointCondition: { minWidth: 768, maxWidth: 991 },
              layoutProperties: {
                maintainAspectRatio: true,
                scaleStrategy: 'fit',
                alignment: 'center'
              }
            }
          ],
          lg: [
            {
              id: 'background-container',
              breakpointCondition: { minWidth: 992, maxWidth: 1199 },
              layoutProperties: {
                maintainAspectRatio: true,
                scaleStrategy: 'fit',
                alignment: 'center'
              }
            }
          ],
          xl: [
            {
              id: 'background-container',
              breakpointCondition: { minWidth: 1200, maxWidth: undefined },
              layoutProperties: {
                maintainAspectRatio: true,
                scaleStrategy: 'fit',
                alignment: 'center'
              }
            }
          ]
        },
        default: [
          {
            id: 'background-container',
            breakpointCondition: { minWidth: 0, maxWidth: undefined },
            layoutProperties: {
              maintainAspectRatio: true,
              scaleStrategy: 'fit',
              alignment: 'center'
            }
          }
        ],
        // Legacy structure for backward compatibility
        breakpoints: {
          xs: { minWidth: 0, maxWidth: 575, behavior: { maintainAspectRatio: false, scaleStrategy: 'stretch', alignment: 'center' } },
          sm: { minWidth: 576, maxWidth: 767, behavior: { maintainAspectRatio: false, scaleStrategy: 'stretch', alignment: 'center' } },
          md: { minWidth: 768, maxWidth: 991, behavior: { maintainAspectRatio: true, scaleStrategy: 'fit', alignment: 'center' } },
          lg: { minWidth: 992, maxWidth: 1199, behavior: { maintainAspectRatio: true, scaleStrategy: 'fit', alignment: 'center' } },
          xl: { minWidth: 1200, maxWidth: undefined, behavior: { maintainAspectRatio: true, scaleStrategy: 'fit', alignment: 'center' } }
        },
        deviceDetection: { enable: true, defaultBreakpoint: 'lg' }
      }
    }
   
       /**
     * Get current responsive behavior based on screen width
     * Now works with new responsive config structure
     */
    private getCurrentResponsiveBehavior(): any {
      const responsiveConfig = this.getSceneResponsiveConfig()
      const currentWidth = this.scene.game.scale.width
      
      // First check if we have the new responsive config structure
      if (responsiveConfig.responsiveSettings && responsiveConfig.default) {
        // Use the new responsive config structure
        const objectId = this.id || 'background-container'
        
        // Check responsive breakpoints first
        const breakpoints = responsiveConfig.responsiveSettings
        for (const [key, layouts] of Object.entries(breakpoints)) {
          const typedLayouts = layouts as Array<{
            id: string
            breakpointCondition: { minWidth: number; maxWidth?: number }
            layoutProperties: any
          }>
          const objectLayout = typedLayouts.find(layout => layout.id === objectId)
          if (objectLayout) {
            const { minWidth, maxWidth } = objectLayout.breakpointCondition
            if (currentWidth >= minWidth && (maxWidth === undefined || currentWidth <= maxWidth)) {
              this.logger.debug('BackgroundContainer', 'Found matching responsive breakpoint', {
                objectId,
                breakpointKey: key,
                currentWidth,
                breakpointRange: `${minWidth}-${maxWidth || '∞'}`,
                layoutProperties: objectLayout.layoutProperties
              }, 'getCurrentResponsiveBehavior')
              
              return {
                maintainAspectRatio: objectLayout.layoutProperties.maintainAspectRatio ?? true,
                scaleStrategy: objectLayout.layoutProperties.scaleStrategy ?? 'fit',
                alignment: objectLayout.layoutProperties.alignment ?? 'center'
              }
            }
          }
        }
        
        // If no responsive breakpoint matches, use default
        const defaultLayout = (responsiveConfig.default as Array<{
          id: string
          breakpointCondition: { minWidth: number; maxWidth?: number }
          layoutProperties: any
        }>).find(layout => layout.id === objectId)
        if (defaultLayout) {
          this.logger.debug('BackgroundContainer', 'Using default breakpoint', {
            objectId,
            layoutProperties: defaultLayout.layoutProperties
          }, 'getCurrentResponsiveBehavior')
          
          return {
            maintainAspectRatio: defaultLayout.layoutProperties.maintainAspectRatio ?? true,
            scaleStrategy: defaultLayout.layoutProperties.scaleStrategy ?? 'fit',
            alignment: defaultLayout.layoutProperties.alignment ?? 'center'
          }
        }
      }
      
      // Fallback to legacy behavior if new structure not available
      if (responsiveConfig.breakpoints) {
        const breakpoints = responsiveConfig.breakpoints
        for (const [key, breakpoint] of Object.entries(breakpoints)) {
          const typedBreakpoint = breakpoint as {
            minWidth: number
            maxWidth?: number
            behavior: {
              maintainAspectRatio: boolean
              scaleStrategy: 'fit' | 'stretch'
              alignment: string
            }
          }
          
          if (currentWidth >= typedBreakpoint.minWidth && 
              (typedBreakpoint.maxWidth === undefined || currentWidth <= typedBreakpoint.maxWidth)) {
            this.logger.debug('BackgroundContainer', 'Found matching legacy breakpoint', {
              objectId: this.id,
              breakpointKey: key,
              currentWidth,
              breakpointRange: `${typedBreakpoint.minWidth}-${typedBreakpoint.maxWidth || '∞'}`,
              behavior: typedBreakpoint.behavior
            }, 'getCurrentResponsiveBehavior')
            return typedBreakpoint.behavior
          }
        }
        
        // Fallback to default behavior if no breakpoint matches
        const defaultKey = responsiveConfig.deviceDetection?.defaultBreakpoint || 'lg'
        const defaultBreakpoint = breakpoints[defaultKey]
        this.logger.warn('BackgroundContainer', 'No legacy breakpoint matched, using default', {
          objectId: this.id,
          currentWidth,
          defaultBreakpoint: defaultKey,
          defaultBehavior: defaultBreakpoint?.behavior
        }, 'getCurrentResponsiveBehavior')
        
        return defaultBreakpoint?.behavior || {
          maintainAspectRatio: true,
          scaleStrategy: 'fit',
          alignment: 'center'
        }
      }
      
      // Ultimate fallback
      return {
        maintainAspectRatio: true,
        scaleStrategy: 'fit',
        alignment: 'center'
      }
    }
   
   /**
    * Calculate responsive size using scene's responsive configuration
    */
   private calculateResponsiveSizeFromSceneConfig(availableWidth: number, availableHeight: number): { width: number; height: number } {
     const responsiveBehavior = this.getCurrentResponsiveBehavior()
     const originalAspectRatio = this.originalWidth / this.originalHeight
     const availableAspectRatio = availableWidth / availableHeight
     
     let finalWidth: number
     let finalHeight: number
     
     // Apply responsive logic based on scene's scaleStrategy
     switch (responsiveBehavior.scaleStrategy) {
       case 'fit':
         // Fit within available space while maintaining aspect ratio
         if (responsiveBehavior.maintainAspectRatio) {
           if (availableAspectRatio > originalAspectRatio) {
             // Available space is wider, fit by height
             finalHeight = availableHeight
             finalWidth = finalHeight * originalAspectRatio
           } else {
             // Available space is taller, fit by width
             finalWidth = availableWidth
             finalHeight = finalWidth / originalAspectRatio
           }
         } else {
           // Don't maintain aspect ratio, use available dimensions
           finalWidth = availableWidth
           finalHeight = availableHeight
         }
         break
         
       case 'stretch':
       default:
         // Stretch to fill available space (may distort)
         finalWidth = availableWidth
         finalHeight = availableHeight
         break
     }
     
     this.logger.debug('BackgroundContainer', 'Responsive size calculated from scene config', {
       objectId: this.id,
       availableDimensions: { width: availableWidth, height: availableHeight },
       originalDimensions: { width: this.originalWidth, height: this.originalHeight },
       responsiveBehavior,
       calculatedSize: { width: finalWidth, height: finalHeight }
     }, 'calculateResponsiveSizeFromSceneConfig')
     
     return { width: finalWidth, height: finalHeight }
   }
   
   /**
    * Calculate responsive position using scene's responsive configuration
    */
   private calculateResponsivePositionFromSceneConfig(availableWidth: number, availableHeight: number, finalSize: { width: number; height: number }): { x: number; y: number } {
     const responsiveBehavior = this.getCurrentResponsiveBehavior()
     let x: number
     let y: number
     
     // Convert scene's alignment to x,y coordinates
     switch (responsiveBehavior.alignment) {
       case 'top-left':
         x = 0
         y = 0
         break
       case 'top-right':
         x = availableWidth - finalSize.width
         y = 0
         break
       case 'bottom-left':
         x = 0
         y = availableHeight - finalSize.height
         break
       case 'bottom-right':
         x = availableWidth - finalSize.width
         y = availableHeight - finalSize.height
         break
       case 'center':
       default:
         x = (availableWidth - finalSize.width) / 2
         y = (availableHeight - finalSize.height) / 2
         break
     }
     
     this.logger.debug('BackgroundContainer', 'Responsive position calculated from scene config', {
       objectId: this.id,
       availableDimensions: { width: availableWidth, height: availableHeight },
       finalSize,
       responsiveBehavior,
       calculatedPosition: { x, y }
     }, 'calculateResponsivePositionFromSceneConfig')
     
     return { x, y }
   }
   
       // Note: Legacy responsive calculation methods removed - now using scene's responsive configuration
   
   /**
    * Scale background image to fill container size
    */
   private scaleBackgroundImageToFit(): void {
     if (!this.backgroundImage || !this.backgroundDimensions) return
     
     // Get current responsive behavior to determine how to scale the image
     const responsiveBehavior = this.getCurrentResponsiveBehavior()
     
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
           
           this.logger.debug('BackgroundContainer', 'Background image fitted with aspect ratio', {
             objectId: this.id,
             containerSize: { width: this.width, height: this.height },
             imageDisplaySize: { width: displayWidth, height: displayHeight },
             imagePosition: { x: this.width / 2, y: this.height / 2 },
             scaleStrategy: 'fit',
             maintainAspectRatio: true
           }, 'scaleBackgroundImageToFit')
         } else {
           // Fit to container without maintaining aspect ratio
           this.backgroundImage.setDisplaySize(this.width, this.height)
           this.backgroundImage.setPosition(this.width / 2, this.height / 2)
           
           this.logger.debug('BackgroundContainer', 'Background image fitted without aspect ratio', {
             objectId: this.id,
             containerSize: { width: this.width, height: this.height },
             imageDisplaySize: { width: this.width, height: this.height },
             imagePosition: { x: this.width / 2, y: this.height / 2 },
             scaleStrategy: 'fit',
             maintainAspectRatio: false
           }, 'scaleBackgroundImageToFit')
         }
         break
         
       case 'stretch':
       default:
         // Stretch image to fill container completely (may distort)
         this.backgroundImage.setDisplaySize(this.width, this.height)
         this.backgroundImage.setPosition(this.width / 2, this.height / 2)
         
         this.logger.debug('BackgroundContainer', 'Background image stretched to fill container', {
           objectId: this.id,
           containerSize: { width: this.width, height: this.height },
           imageDisplaySize: { width: this.width, height: this.height },
           imagePosition: { x: this.width / 2, y: this.height / 2 },
           scaleStrategy: 'stretch',
           note: 'Image stretched to fill container completely'
         }, 'scaleBackgroundImageToFit')
         break
     }
     
     // Always ensure lower z-order so UI elements appear above background
     this.ensureBackgroundImageZOrder()
   }
  

  
  // Note: getResponsiveBehavior is now handled by ScalableGameObject
  // which should get the responsive config from the scene
  
  /**
   * Calculate responsive background layout based on responsive behavior
   */
  // private calculateResponsiveBackgroundLayout(
  //   containerWidth: number,
  //   containerHeight: number,
  //   responsiveBehavior: {
  //     deviceType: 'desktop' | 'mobile'
  //     maintainAspectRatio: boolean
  //     scaleStrategy: 'fit' | 'stretch' | 'fill'
  //     alignment: { x: 'left' | 'center' | 'right'; y: 'top' | 'center' | 'bottom' }
  //   }
  // ): { position: { x: number; y: number }; size: { width: number; height: number } } {
  //   if (!this.backgroundDimensions) {
  //     return { position: { x: 0, y: 0 }, size: { width: containerWidth, height: containerHeight } }
  //   }
    
  //   const { width: bgWidth, height: bgHeight } = this.backgroundDimensions
  //   const bgAspectRatio = bgWidth / bgHeight
  //   const containerAspectRatio = containerWidth / containerHeight
    
  //   let finalWidth: number
  //   let finalHeight: number
    
  //   // Calculate size based on responsive scale strategy
  //   switch (responsiveBehavior.scaleStrategy) {
  //     case 'fit':
  //       // Fit background within container while maintaining aspect ratio
  //       if (responsiveBehavior.maintainAspectRatio) {
  //         if (containerAspectRatio > bgAspectRatio) {
  //           // Container is wider, fit by height
  //           finalHeight = containerHeight
  //           finalWidth = finalHeight * bgAspectRatio
  //         } else {
  //           // Container is taller, fit by width
  //           finalWidth = containerWidth
  //           finalHeight = finalWidth / bgAspectRatio
  //         }
  //       } else {
  //         // Don't maintain aspect ratio, fit to container
  //         finalWidth = containerWidth
  //         finalHeight = containerHeight
  //       }
  //       break
        
  //     case 'stretch':
  //       // Stretch to fill container (may distort)
  //       finalWidth = containerWidth
  //       finalHeight = containerHeight
  //       break
        
  //     default:
  //       finalWidth = containerWidth
  //       finalHeight = containerHeight
  //   }
    
  //   // Use the BackgroundContainer's own alignment configuration instead of responsive behavior
  //   // This ensures the object's specific alignment preferences are respected
  //   const alignment = this.alignment
    
  //   // Calculate position based on object's alignment configuration
  //   let x: number
  //   let y: number
    
  //   switch (alignment.x) {
  //     case 'left':
  //       x = 0
  //       break
  //     case 'center':
  //       x = (containerWidth - finalWidth) / 2
  //       break
  //     case 'right':
  //       x = containerWidth - finalWidth
  //       break
  //     default:
  //       x = 0
  //   }
    
  //   switch (alignment.y) {
  //     case 'top':
  //       y = 0
  //       break
  //     case 'center':
  //       y = (containerHeight - finalHeight) / 2
  //       break
  //     case 'bottom':
  //       y = containerHeight - finalHeight
  //       break
  //     default:
  //       y = 0
  //   }
    
  //   this.logger.debug('BackgroundContainer', 'Alignment calculation completed', {
  //     objectId: this.id,
  //     objectAlignment: alignment,
  //     responsiveAlignment: responsiveBehavior.alignment,
  //     finalPosition: { x, y },
  //     finalSize: { width: finalWidth, height: finalHeight },
  //     containerDimensions: { width: containerWidth, height: containerHeight }
  //   }, 'calculateResponsiveBackgroundLayout')
    
  //   return {
  //     position: { x, y },
  //     size: { width: finalWidth, height: finalHeight }
  //   }
  // }
  
     /**
    * Apply responsive sizing based on parent container dimensions
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
     
     this.logger.debug('BackgroundContainer', 'Responsive sizing applied from parent', {
       objectId: this.id,
       parentDimensions: { width: parentWidth, height: parentHeight },
       finalSize: { width: this.width, height: this.height },
       hasBackgroundImage: this.isBackgroundLoaded
     }, 'applyResponsiveSizing')
   }
   
  //  /**
  //   * Propagate resize event to all children
  //   */
  //  private propagateResizeToChildren(width: number, height: number): void {
  //    this.logger.debug('BackgroundContainer', 'Propagating resize to children', {
  //      objectId: this.id,
  //      newDimensions: { width, height },
  //      childCount: this.children.length
  //    }, 'propagateResizeToChildren')
     
  //    // Loop through all children and call their resize method if available
  //    this.children.forEach((child: any, index: number) => {
  //      if (child && typeof child.resize === 'function') {
  //        try {
  //          child.resize(width, height)
  //          this.logger.debug('BackgroundContainer', 'Child resize called', {
  //            objectId: this.id,
  //            childName: child.name || child.id || `child-${index}`,
  //            childType: child.constructor.name,
  //            newDimensions: { width, height }
  //          }, 'propagateResizeToChildren')
  //        } catch (error) {
  //          this.logger.warn('BackgroundContainer', 'Failed to resize child', {
  //            objectId: this.id,
  //            childName: child.name || child.id || `child-${index}`,
  //            error: error instanceof Error ? error.message : String(error)
  //          }, 'propagateResizeToChildren')
  //        }
  //      }
  //    })
  //  }
  
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
  measureLayout(): { width: number; height: number } {  // Removed override
    if (this.isBackgroundLoaded && this.backgroundDimensions) {
      return this.backgroundDimensions
    }
    
    return {
      width: this.width,   // Changed from this.phaserObject.width
      height: this.height  // Changed from this.phaserObject.height
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
      this.logger.debug('BackgroundContainer', 'Alignment updated', {
        objectId: this.id,
        newAlignment: properties.alignment,
        oldAlignment: this.alignment
      }, 'updateBackgroundProperties')
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
    this.logger.debug('BackgroundContainer', 'Setting alignment', {
      objectId: this.id,
      oldAlignment: this.alignment,
      newAlignment: alignment
    }, 'setAlignment')
    
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
        this.logger.debug('BackgroundContainer', 'No responsive background images configured', {
          objectId: this.id,
          responsiveBackgroundImages: Array.from(this.responsiveBackgroundImages.entries())
        }, 'switchBackgroundImageForDeviceType')
        return
      }
      
      // Get responsive configuration from scene to determine breakpoints
      const sceneResponsiveConfig = this.getSceneResponsiveConfig()
      this.logger.debug('BackgroundContainer', 'Got scene responsive config for background switching', {
        objectId: this.id,
        sceneResponsiveConfig,
        currentWidth: width,
        breakpoints: sceneResponsiveConfig.breakpoints || 'legacy',
        responsiveSettings: sceneResponsiveConfig.responsiveSettings ? Object.keys(sceneResponsiveConfig.responsiveSettings) : 'none',
        default: sceneResponsiveConfig.default ? 'available' : 'none'
      }, 'switchBackgroundImageForDeviceType')
      
      // Get the appropriate background image from responsive configuration
      const newImageKey = this.getBackgroundImageFromResponsiveConfig(width)
      
      if (!newImageKey) {
        this.logger.warn('BackgroundContainer', 'No background image found in responsive config', {
          objectId: this.id,
          width,
          breakpoints: sceneResponsiveConfig.breakpoints ? Object.keys(sceneResponsiveConfig.breakpoints) : 'legacy',
          responsiveSettings: sceneResponsiveConfig.responsiveSettings ? Object.keys(sceneResponsiveConfig.responsiveSettings) : 'none'
        }, 'switchBackgroundImageForDeviceType')
        return
      }
      
      // Check if the texture exists
      if (!this.scene.textures.exists(newImageKey)) {
        this.logger.warn('BackgroundContainer', 'Background texture not found', {
          objectId: this.id,
          textureKey: newImageKey,
          availableTextures: Object.keys(this.scene.textures.list)
        }, 'switchBackgroundImageForDeviceType')
        return
      }
      
      // Only switch if the image key is different
      if (newImageKey !== this.backgroundImageKey) {
        this.logger.debug('BackgroundContainer', 'Switching background image', {
          objectId: this.id,
          oldImageKey: this.backgroundImageKey,
          newImageKey,
          width,
          breakpoint: this.getCurrentBreakpointKey(width)
        }, 'switchBackgroundImageForDeviceType')
        
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
        this.logger.debug('BackgroundContainer', 'Background image already correct for device type', {
          objectId: this.id,
          currentImageKey: this.backgroundImageKey,
          newImageKey,
          width
        }, 'switchBackgroundImageForDeviceType')
      }
    }
  
  /**
   * Debug background container state
   */
    debugBackgroundState(): void {
          this.logger.debug('BackgroundContainer', 'Background Container Debug:', {
        id: this.id,
        backgroundInfo: this.getBackgroundInfo(),
        containerBounds: { x: this.x, y: this.y, width: this.width, height: this.height },  // Changed from this.phaserObject
        phaserObjectBounds: {
          x: this.x,      // Changed from this.phaserObject.x
          y: this.y,      // Changed from this.phaserObject.y
          width: this.width,   // Changed from this.phaserObject.width
          height: this.height  // Changed from this.phaserObject.height
        },
        children: this.children.length,
        gameDimensions: {
          width: this.scene.game.scale.width,
          height: this.scene.game.scale.height
        },
        currentAlignment: this.alignment
      }, 'debugBackgroundState')
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
    
    this.logger.debug('BackgroundContainer', 'Testing all alignment configurations', {
      objectId: this.id,
      alignments
    }, 'testAlignments')
    
    // Test center alignment first (most common use case)
    this.setAlignment({ x: 'center', y: 'center' })
    
    // You can uncomment the following lines to cycle through all alignments
    // let currentIndex = 0
    // const interval = setInterval(() => {
    //   this.setAlignment(alignments[currentIndex])
    //   currentIndex = (currentIndex + 1) % alignments.length
    // }, 2000) // Change alignment every 2 seconds
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
   * Get current responsive behavior (placeholder implementation)
   */
  // private getCurrentResponsiveBehavior(): any {
  //   return {
  //     deviceType: this.scene.game.scale.width >= 1024 ? 'desktop' : 'mobile',
  //     maintainAspectRatio: this.maintainAspectRatio,
  //     scaleStrategy: this.scalingMode,
  //     alignment: this.alignment
  //   }
  // }
  
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
       this.logger.debug('BackgroundContainer', 'Background image z-order ensured', {
         objectId: this.id,
         depth: -1
       }, 'ensureBackgroundImageZOrder')
     }
   }
   
             /**
      * Force refresh z-order of all child elements
      * This ensures proper layering after background image changes
      */
      private refreshChildZOrders(): void {
        this.logger.debug('BackgroundContainer', 'Refreshing child z-orders', {
          objectId: this.id,
          childCount: this.children.length
        }, 'refreshChildZOrders')
        
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
          this.logger.debug('BackgroundContainer', 'No scene config available for z-order refresh, using fallback', {
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
          }, 'refreshChildZOrders')
          
          // Use fallback z-order assignment
          this.assignFallbackZOrders()
          return
        }
        
        // Find the background container config to get child z-orders
        const backgroundConfig = sceneConfig.gameObjects.find((obj: any) => obj.id === this.id)
        if (!backgroundConfig?.children) {
          this.logger.debug('BackgroundContainer', 'No background config found for z-order refresh, using fallback', {
            objectId: this.id,
            configPath,
            availableGameObjects: sceneConfig.gameObjects?.map((obj: any) => obj.id) || [],
            backgroundConfig: backgroundConfig || 'not found'
          }, 'refreshChildZOrders')
          
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
              this.logger.debug('BackgroundContainer', 'Child z-order refreshed from config', {
                objectId: this.id,
                childName: child.name || child.id || 'unnamed',
                childIndex: index,
                configZOrder: childConfig.zOrder,
                configPath
              }, 'refreshChildZOrders')
            } else {
              // Fallback to default z-order if not specified in config
              const fallbackZOrder = index + 1
              child.setDepth(fallbackZOrder)
              this.logger.debug('BackgroundContainer', 'Child z-order set to fallback', {
                objectId: this.id,
                childName: child.name || child.id || 'unnamed',
                childIndex: index,
                fallbackZOrder: fallbackZOrder,
                configPath
              }, 'refreshChildZOrders')
            }
          }
        })
      }
      
      /**
       * Assign fallback z-orders when no configuration is available
       */
      private assignFallbackZOrders(): void {
        this.logger.debug('BackgroundContainer', 'Assigning fallback z-orders', {
          objectId: this.id,
          childCount: this.children.length
        }, 'assignFallbackZOrders')
        
        // Assign sequential z-orders to children
        this.children.forEach((child: any, index: number) => {
          if (child && typeof child.setDepth === 'function') {
            const fallbackZOrder = index + 1
            child.setDepth(fallbackZOrder)
            
            this.logger.debug('BackgroundContainer', 'Fallback z-order assigned', {
              objectId: this.id,
              childName: child.name || child.id || 'unnamed',
              childIndex: index,
              fallbackZOrder: fallbackZOrder
            }, 'assignFallbackZOrders')
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

  /**
   * Override resizeSelf to implement custom background container resize logic
   * This is part of the template method pattern from the parent Container class
   */
  protected override resizeSelf(width: number, height: number): void {
    this.logger.debug('BackgroundContainer', 'resizeSelf called', {
      objectId: this.id,
      newDimensions: { width, height },
      currentDimensions: { width: this.width, height: this.height },
      hasBackgroundImage: !!this.backgroundImage,
      hasParent: !!this.parent
    }, 'resizeSelf');
    
    // Check if background image should be switched based on device type
    if (this.backgroundImageKey && this.hasResponsiveBackgroundImages()) {
      this.logger.debug('BackgroundContainer', 'Checking if background image should be switched', {
        objectId: this.id,
        currentWidth: width,
        hasBackgroundImageKey: !!this.backgroundImageKey,
        hasResponsiveBackgroundImages: this.hasResponsiveBackgroundImages(),
        responsiveBackgroundImages: Array.from(this.responsiveBackgroundImages.entries())
      }, 'resizeSelf');
      this.switchBackgroundImageForDeviceType(width, height);
    } else {
      this.logger.debug('BackgroundContainer', 'Skipping background image switch check', {
        objectId: this.id,
        hasBackgroundImageKey: !!this.backgroundImageKey,
        hasResponsiveBackgroundImages: this.hasResponsiveBackgroundImages(),
        responsiveBackgroundImages: Array.from(this.responsiveBackgroundImages.entries())
      }, 'resizeSelf');
    }
    
    if (this.isBackgroundLoaded && this.backgroundDimensions) {
      // Get current responsive behavior to determine how to handle sizing
      const responsiveBehavior = this.getCurrentResponsiveBehavior();
      this.logger.debug('BackgroundContainer', 'Background image loaded, applying responsive behavior', {
        objectId: this.id,
        responsiveBehavior,
        scaleStrategy: responsiveBehavior.scaleStrategy,
        maintainAspectRatio: responsiveBehavior.maintainAspectRatio
      }, 'resizeSelf');
      
      let finalWidth: number;
      let finalHeight: number;
      let finalPosition: { x: number; y: number };
      
      // Apply responsive logic based on scene's scaleStrategy
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
      
      this.logger.debug('BackgroundContainer', 'Background container resized with responsive behavior', {
        objectId: this.id,
        responsiveBehavior,
        finalSize: { width: finalWidth, height: finalHeight },
        finalPosition,
        backgroundDimensions: this.backgroundDimensions
      }, 'resizeSelf');
    } else {
      // No background image, apply responsive logic using scene's responsive configuration
      const finalSize = this.calculateResponsiveSizeFromSceneConfig(width, height);
      const finalPosition = this.calculateResponsivePositionFromSceneConfig(width, height, finalSize);
      
      // Set BackgroundContainer size based on responsive calculations
      this.setSize(finalSize.width, finalSize.height);
      this.setPosition(finalPosition.x, finalPosition.y);
      
      // Create or update background rectangle with the new dimensions
      this.createBackgroundRectangle(finalSize.width, finalSize.height);
      
      this.logger.debug('BackgroundContainer', 'Background container resized with scene responsive config (no background)', {
        objectId: this.id,
        providedDimensions: { width, height },
        originalDimensions: { width: this.originalWidth, height: this.originalHeight },
        sceneResponsiveConfig: this.getSceneResponsiveConfig(),
        finalSize,
        finalPosition
      }, 'resizeSelf');
    }
  }
  
  /**
   * Override resizeAfter to implement post-resize operations specific to background containers
   * This is part of the template method pattern from the parent Container class
   */
  protected override resizeAfter(width: number, height: number): void {
    this.logger.debug('BackgroundContainer', 'resizeAfter called', {
      objectId: this.id,
      newDimensions: { width, height }
    }, 'resizeAfter');
    
    // Ensure background image z-order is correct after resize
    this.ensureBackgroundImageZOrder();
    
    // Refresh z-orders of all children
    this.refreshChildZOrders();
    
    this.logger.debug('BackgroundContainer', 'Post-resize operations completed', {
      objectId: this.id
    }, 'resizeAfter');
  }
}
