import * as Phaser from 'phaser'
import type { IContainer } from '../../abstract/objects/IContainer'

import { Container } from './Container'

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
 */
export class BackgroundContainer extends Container {
  // ===== STATIC FACTORY METHOD =====
  
  /**
   * Create a BackgroundContainer instance from configuration
   * This method allows the BackgroundContainer class to create itself from config
   */
  public static createFromConfig(config: any, scene: Phaser.Scene, parent?: IContainer): BackgroundContainer {
    console.log('BackgroundContainer', 'createFromConfig called', {
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
        parent || null
      )
      
      console.log('BackgroundContainer', 'BackgroundContainer instance created', {
        objectId: config.id,
        phaserObjectType: container.phaserObject.constructor.name,
        position: { x: container.phaserObject.x, y: container.phaserObject.y }
      })
      
      // Apply configuration properties
      if (config.properties) {
        console.log('BackgroundContainer', 'Applying properties from config', {
          objectId: config.id,
          properties: config.properties
        })
        
        // Set background image if specified
        if (config.properties.textureKey) {
          console.log('BackgroundContainer', 'Setting background image', {
            objectId: config.id,
            textureKey: config.properties.textureKey
          })
          container.setBackgroundImage(config.properties.textureKey)
        }
        
        // Set background color if specified
        if (config.properties.backgroundColor) {
          console.log('BackgroundContainer', 'Setting background color', {
            objectId: config.id,
            backgroundColor: config.properties.backgroundColor
          })
          container.setBackground({ color: config.properties.backgroundColor })
        }
        
        // Set maintain aspect ratio if specified
        if (config.properties.maintainAspectRatio !== undefined) {
          console.log('BackgroundContainer', 'Setting maintain aspect ratio', {
            objectId: config.id,
            maintainAspectRatio: config.properties.maintainAspectRatio
          })
          container.setConstraints({ maintainAspectRatio: config.properties.maintainAspectRatio })
        }
        
        // Set interactive if specified
        if (config.properties.interactive !== undefined) {
          console.log('BackgroundContainer', 'Setting interactive', {
            objectId: config.id,
            interactive: config.properties.interactive
          })
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
        
        console.log('BackgroundContainer', 'Setting fill size from scene dimensions', {
          objectId: config.id,
          sceneWidth,
          sceneHeight,
          finalWidth,
          finalHeight
        })
        
        container.phaserObject.setSize(finalWidth, finalHeight)
      } else if (config.width && config.width !== 'fill') {
        console.log('BackgroundContainer', 'Setting size from config', {
          objectId: config.id,
          width: config.width,
          height: config.height || config.width
        })
        container.phaserObject.setSize(config.width, config.height || config.width)
      }
      
      // Set name
      container.phaserObject.name = config.name || config.id
      
      console.log('BackgroundContainer', 'BackgroundContainer configured successfully', {
        objectId: config.id,
        finalSize: { width: container.phaserObject.width, height: container.phaserObject.height },
        finalPosition: { x: container.phaserObject.x, y: container.phaserObject.y },
        finalName: container.phaserObject.name
      })
      
      return container
      
    } catch (error) {
      console.error('BackgroundContainer', `Error in createFromConfig for ${config.id}:`, error)
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
  
  constructor(
    scene: Phaser.Scene,
    id: string,
    x: number = 0,
    y: number = 0,
    parent: IContainer | null = null
  ) {
    super(scene, id, x, y, parent)
    
    console.log('BackgroundContainer', 'BackgroundContainer constructor called', {
      id,
      x,
      y,
      hasParent: !!parent,
      sceneKey: scene.scene.key
    })
    
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
    console.log('BackgroundContainer', 'setBackgroundImage called', {
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
    this.loadBackgroundImage()
  }
  
  /**
   * Load background image from texture
   */
  private loadBackgroundImage(): void {
    if (!this.backgroundImageKey) return
    
    try {
      // Check if texture exists
      if (!this.scene.textures.exists(this.backgroundImageKey)) {
        console.warn('BackgroundContainer', `Background texture "${this.backgroundImageKey}" not found`, {
          objectId: this.id,
          availableTextures: Object.keys(this.scene.textures.list)
        })
        return
      }
      
      // Remove existing background image
      if (this.backgroundImage) {
        console.log('BackgroundContainer', 'Removing existing background image', {
          objectId: this.id
        })
        this.backgroundImage.destroy()
        this.backgroundImage = null
      }
      
      // Create new background image
      this.backgroundImage = this.scene.add.image(0, 0, this.backgroundImageKey)
      
      // Get background dimensions
      this.backgroundDimensions = {
        width: this.backgroundImage.width,
        height: this.backgroundImage.height
      }
      
      // Add to Phaser container
      this.phaserObject.add(this.backgroundImage)
      
      // Mark as loaded
      this.isBackgroundLoaded = true
      
      // Apply responsive sizing
      this.applyResponsiveSizing()
      
      console.log('BackgroundContainer', `Background image loaded: ${this.backgroundImageKey}`, {
        objectId: this.id,
        imageSize: { width: this.backgroundImage.width, height: this.backgroundImage.height }
      })
      
    } catch (error) {
      console.error('BackgroundContainer', 'Failed to load background image:', error)
      this.isBackgroundLoaded = false
    }
  }
  
  /**
   * Remove background image
   */
  removeBackgroundImage(): void {
    if (this.backgroundImage) {
      console.log('BackgroundContainer', 'Removing background image', {
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
    this.phaserObject.list.forEach(child => {
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
   * Override resize method to handle background-specific logic
   */
  override resize(width: number, height: number): void {
    console.log('BackgroundContainer', 'resize called', {
      objectId: this.id,
      newDimensions: { width, height },
      currentDimensions: { width: this.phaserObject.width, height: this.phaserObject.height },
      hasBackgroundImage: !!this.backgroundImage
    })
    // Store new dimensions
    const newWidth = width
    const newHeight = height
    
    // Calculate new position and size based on background image
    if (this.isBackgroundLoaded && this.backgroundDimensions) {
      const { position, size } = this.calculateBackgroundLayout(newWidth, newHeight)
      
      // Update Phaser container position and size
      this.phaserObject.setPosition(position.x, position.y)
      this.phaserObject.setSize(size.width, size.height)
      
      // Update background image position and size
      if (this.backgroundImage) {
        this.backgroundImage.setPosition(size.width / 2, size.height / 2)
        this.backgroundImage.setDisplaySize(size.width, size.height)
      }
      
      console.log('BackgroundContainer', `Background container resized: ${size.width}x${size.height} at (${position.x}, ${position.y})`, {
        objectId: this.id,
        finalSize: { width: size.width, height: size.height },
        finalPosition: { x: position.x, y: position.y }
      })
    } else {
      // No background image, use default sizing
      this.phaserObject.setSize(newWidth, newHeight)
      
      // Update background rectangle if exists
      if (!this.isBackgroundLoaded) {
        this.createBackgroundRectangle()
      }
      console.log('BackgroundContainer', 'Background container resized (no image): default sizing', {
        objectId: this.id,
        finalSize: { width: newWidth, height: newHeight }
      })
    }
    
    // Call parent resize method for layout updates
    super.resize(newWidth, newHeight)
  }
  
  /**
   * Calculate background layout based on container size and scaling mode
   */
  private calculateBackgroundLayout(
    containerWidth: number,
    containerHeight: number
  ): { position: { x: number; y: number }; size: { width: number; height: number } } {
    if (!this.backgroundDimensions) {
      return { position: { x: 0, y: 0 }, size: { width: containerWidth, height: containerHeight } }
    }
    
    const { width: bgWidth, height: bgHeight } = this.backgroundDimensions
    const bgAspectRatio = bgWidth / bgHeight
    const containerAspectRatio = containerWidth / containerHeight
    
    let finalWidth: number
    let finalHeight: number
    
    // Calculate size based on scaling mode
    switch (this.scalingMode) {
      case 'fit':
        // Fit background within container while maintaining aspect ratio
        if (containerAspectRatio > bgAspectRatio) {
          // Container is wider, fit by height
          finalHeight = containerHeight
          finalWidth = finalHeight * bgAspectRatio
        } else {
          // Container is taller, fit by width
          finalWidth = containerWidth
          finalHeight = finalWidth / bgAspectRatio
        }
        break
        
      case 'fill':
        // Fill container while maintaining aspect ratio (may crop)
        if (containerAspectRatio > bgAspectRatio) {
          // Container is wider, fill by width
          finalWidth = containerWidth
          finalHeight = finalWidth / bgAspectRatio
        } else {
          // Container is taller, fill by height
          finalHeight = containerHeight
          finalWidth = finalHeight * bgAspectRatio
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
    
    // Calculate position based on alignment
    let x: number
    let y: number
    
    switch (this.alignment.x) {
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
    
    switch (this.alignment.y) {
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
    
    console.log('BackgroundContainer', `Orientation change handled: ${gameWidth}x${gameHeight}`, {
      objectId: this.id,
      newDimensions: { width: gameWidth, height: gameHeight }
    })
  }
  
  /**
   * Handle window resize
   */
  handleWindowResize(): void {
    if (!this.isBackgroundLoaded) return
    
    // Get new dimensions
    const gameWidth = this.scene.game.scale.width
    const gameHeight = this.scene.game.scale.height
    
    // Apply responsive sizing
    this.resize(gameWidth, gameHeight)
    
    console.log('BackgroundContainer', `Window resize handled: ${gameWidth}x${gameHeight}`, {
      objectId: this.id,
      newDimensions: { width: gameWidth, height: gameHeight }
    })
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
    
    // Call parent cleanup
    super.destroy()
  }
  
  // ===== OVERRIDE METHODS =====
  
  /**
   * Override destroy to clean up event listeners
   */
  override destroy(): void {
    this.cleanup()
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
   * Debug background container state
   */
  debugBackgroundState(): void {
    console.log('Background Container Debug:', {
      id: this.id,
      backgroundInfo: this.getBackgroundInfo(),
      containerBounds: this.getBounds(),
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
    })
  }
}
