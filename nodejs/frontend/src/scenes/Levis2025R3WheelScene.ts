import Phaser from 'phaser'
import { loadSceneLoggingConfig } from '../core/LoggingConfigLoader'
import { logger } from '../core/Logger'

/**
 * Levis2025R3 Wheel Scene
 * A full-screen responsive canvas scene with logging configuration
 */
export class Levis2025R3WheelScene extends Phaser.Scene {
  private canvas!: Phaser.GameObjects.Graphics
  private resizeHandler!: () => void
  private canvasWidth: number = 0
  private canvasHeight: number = 0
  
  constructor() {
    super({ key: 'Levis2025R3WheelScene' })
  }
  
  /**
   * Scene initialization
   */
  create(): void {
    // Load scene-specific logging configuration
    this.loadSceneLoggingConfig()
    
    // Log scene creation
    logger.info('Levis2025R3WheelScene', 'Scene created', {
      sceneKey: this.scene.key,
      gameWidth: this.game.config.width,
      gameHeight: this.game.config.height,
      timestamp: Date.now()
    })
    
    // Create full-screen canvas
    this.createFullScreenCanvas()
    
    // Setup responsive behavior
    this.setupResponsiveBehavior()
    
    // Log scene setup completion
    logger.info('Levis2025R3WheelScene', 'Scene setup completed', {
      gameSize: { width: Number(this.game.config.width), height: Number(this.game.config.height) },
      scaleMode: this.game.scale.scaleMode
    })
  }
  
  /**
   * Load scene-specific logging configuration
   */
  private loadSceneLoggingConfig(): void {
    try {
      const configLoaded = loadSceneLoggingConfig('levis2025R3')
      
      if (configLoaded) {
        logger.info('Levis2025R3WheelScene', 'Scene logging configuration loaded successfully')
      } else {
        logger.warn('Levis2025R3WheelScene', 'Failed to load scene logging configuration, using default')
      }
    } catch (error) {
      logger.error('Levis2025R3WheelScene', 'Error loading scene logging configuration', error)
    }
  }
  
  /**
   * Create full-screen canvas
   */
  private createFullScreenCanvas(): void {
    // Create a graphics object that covers the entire screen
    this.canvas = this.add.graphics()
    
    // Set initial canvas size to full screen
    this.resizeCanvas()
    
    // Draw a simple background to show the canvas is working
    this.drawCanvasBackground()
    
    logger.debug('Levis2025R3WheelScene', 'Full-screen canvas created', {
      canvasSize: { width: this.canvasWidth, height: this.canvasHeight }
    })
  }
  
  /**
   * Draw canvas background
   */
  private drawCanvasBackground(): void {
    const width = Number(this.game.config.width)
    const height = Number(this.game.config.height)
    
    // Clear previous drawings
    this.canvas.clear()
    
    // Draw a gradient-like background
    this.canvas.fillStyle(0x1a1a2e) // Dark blue
    this.canvas.fillRect(0, 0, width, height)
    
    // Add some visual elements to show the canvas is responsive
    this.canvas.lineStyle(2, 0x4a90e2, 0.5) // Blue border
    this.canvas.strokeRect(10, 10, width - 20, height - 20)
    
    // Add a center indicator
    this.canvas.lineStyle(1, 0xffffff, 0.3)
    this.canvas.beginPath()
    this.canvas.moveTo(width / 2, 0)
    this.canvas.lineTo(width / 2, height)
    this.canvas.moveTo(0, height / 2)
    this.canvas.lineTo(width, height / 2)
    this.canvas.strokePath()
    
    logger.debug('Levis2025R3WheelScene', 'Canvas background drawn', {
      dimensions: { width, height },
      centerPoint: { x: width / 2, y: height / 2 }
    })
  }
  
  /**
   * Setup responsive behavior
   */
  private setupResponsiveBehavior(): void {
    // Create resize handler
    this.resizeHandler = () => {
      this.handleResize()
    }
    
    // Add resize event listener
    window.addEventListener('resize', this.resizeHandler)
    
    // Also listen to Phaser's resize events
    this.scale.on('resize', this.resizeHandler)
    
    logger.info('Levis2025R3WheelScene', 'Responsive behavior setup completed', {
      hasResizeHandler: !!this.resizeHandler,
      scaleMode: this.game.scale.scaleMode
    })
  }
  
  /**
   * Handle screen resize
   */
  private handleResize(): void {
    try {
      // Get new dimensions
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      
      // Resize canvas
      this.resizeCanvas()
      
      // Redraw background
      this.drawCanvasBackground()
      
      // Log resize event
      logger.info('Levis2025R3WheelScene', 'Screen resized', {
        newDimensions: { width: newWidth, height: newHeight },
        canvasSize: { width: this.canvasWidth, height: this.canvasHeight },
        timestamp: Date.now()
      })
      
    } catch (error) {
      logger.error('Levis2025R3WheelScene', 'Error handling resize', error)
    }
  }
  
  /**
   * Resize canvas to full screen
   */
  private resizeCanvas(): void {
    const width = window.innerWidth
    const height = window.innerHeight
    
    // Update canvas dimensions
    this.canvasWidth = width
    this.canvasHeight = height
    
    // Update Phaser game size if needed
    if (this.game.scale.isFullscreen) {
      this.game.scale.setGameSize(width, height)
    }
    
    logger.debug('Levis2025R3WheelScene', 'Canvas resized', {
      newDimensions: { width, height },
      isFullscreen: this.game.scale.isFullscreen
    })
  }
  
  /**
   * Scene update (called every frame)
   */
  update(time: number, delta: number): void {
    // You can add animation or update logic here
    // For now, just log performance metrics occasionally
    if (time % 1000 < delta) { // Log every second
      logger.trace('Levis2025R3WheelScene', 'Scene update', {
        time,
        delta,
        fps: Math.round(1000 / delta)
      })
    }
  }
  
  /**
   * Scene shutdown
   */
  shutdown(): void {
    // Remove resize event listener
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler)
      this.scale.off('resize', this.resizeHandler)
    }
    
    // Log scene shutdown
    logger.info('Levis2025R3WheelScene', 'Scene shutdown', {
      timestamp: Date.now()
    })
  }
}

export default Levis2025R3WheelScene
