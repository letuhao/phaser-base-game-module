import type { IGameObject } from './IGameObject'
import type { IScalable } from '../objects/IScalable'
import { Logger } from '../../core/Logger'

/**
 * Abstract ScalableGameObject Class
 * Provides centralized responsive behavior for all game objects
 * 
 * This class handles:
 * - Responsive breakpoint detection
 * - Device type determination
 * - Responsive behavior calculation
 * - Common resize logic
 * - Responsive event handling
 * 
 * Inheritance: IGameObject, IScalable > ScalableGameObject > Container > BackgroundContainer/ConcreteContainer/FlexboxContainer
 */
export abstract class ScalableGameObject implements IGameObject, IScalable {
  
  // ===== IGameObject ABSTRACT PROPERTIES =====
  
  abstract readonly id: string
  abstract readonly parent: any | null
  abstract readonly phaserObject: any
  abstract readonly isActive: boolean
  abstract readonly isVisible: boolean
  abstract readonly isInteractive: boolean
  abstract readonly children: any[]
  abstract readonly isDestroyed: boolean
  abstract readonly scene: any
  abstract readonly position: any
  abstract readonly size: any
  abstract readonly scale: any
  abstract readonly rotation: number
  abstract readonly alpha: number
  abstract readonly visible: boolean
  abstract readonly active: boolean
  abstract readonly interactive: boolean
  abstract readonly input: any
  abstract readonly body: any
  abstract readonly bounds: any
  
  // ===== IGameObject ABSTRACT METHODS =====
  
  abstract initialize(): void
  abstract update(time: number, delta: number): void
  abstract activate(): void
  abstract deactivate(): void
  abstract destroy(): void
  abstract setActive(value: boolean): void
  abstract setVisible(value: boolean): void
  abstract setInteractive(value: boolean): void
  abstract setPosition(x: number, y: number): void
  abstract setSize(width: number, height: number): void
  abstract setAlpha(value: number): void
  abstract setRotation(value: number): void
  abstract show(): void
  abstract hide(): void
  abstract clone(): any
  
  // ===== IScalable ABSTRACT METHODS =====
  
  abstract getScale(): any
  abstract setScale(scale: any): void
  abstract getScaleX(): number
  abstract getScaleY(): number
  abstract setScaleX(scale: number): void
  abstract setScaleY(scale: number): void
  abstract setScaleXAndY(scaleX: number, scaleY: number): void
  abstract setUniformScale(scale: number): void
  abstract scaleBy(scale: number): void
  abstract scaleByXY(scaleX: number, scaleY: number): void
  abstract resetScale(): void
  abstract getScaledBounds(): any
  abstract getScaledSize(): any
  abstract isScaled(): boolean
  abstract hasUniformScale(): boolean
  abstract getScaleFactor(): number
  abstract getScaleRatio(): number
  abstract applyScale(scale: number): void
  abstract normalizeScale(): void
  abstract getScaleToFit(bounds: any, maintainAspectRatio?: boolean): any
  abstract getScaleToFill(bounds: any, maintainAspectRatio?: boolean): any
  abstract scaleToFit(bounds: any, maintainAspectRatio?: boolean): void
  abstract scaleToFill(bounds: any, maintainAspectRatio?: boolean): void
  abstract getScaleToFitX(bounds: any): any
  abstract getScaleToFitY(bounds: any): any
  abstract scaleToFitX(bounds: any): void
  abstract scaleToFitY(bounds: any): void
  abstract getScaleToFillX(bounds: any): any
  abstract getScaleToFillY(bounds: any): any
  abstract scaleToFillX(bounds: any): void
  abstract scaleToFillY(bounds: any): void
  abstract animateScale(targetScale: any, duration: number, ease?: string): void
  abstract animateScaleBy(scaleDelta: any, duration: number, ease?: string): void
  abstract getMinScale(): any
  abstract getMaxScale(): any
  abstract setMinScale(scale: any): void
  abstract setMaxScale(scale: any): void
  abstract clampScale(scale: any): any
  abstract getScaleAnimation(): any
  abstract stopScaleAnimation(): void
  abstract setScaleConstraints(constraints: any): void
  abstract isScaleValid(scale: any): boolean
  abstract getScaleOrigin(): any
  abstract setScaleOrigin(origin: any): void
  abstract getScaleCenter(): any
  abstract setScaleCenter(center: any): void
  abstract getScaleMode(): string
  abstract scaleAroundPoint(point: any, scale: any): void
  abstract getScaleMatrix(): any
  abstract applyScaleMatrix(matrix: any): void
  abstract resize(width: number, height: number): void
  
  // ===== RESPONSIVE PROPERTIES =====
  
  /** Responsive breakpoints */
  protected responsiveBreakpoints = {
    desktop: 1024,
    mobile: 1023
  }
  
  /** Current device type */
  protected currentDeviceType: 'desktop' | 'mobile' = 'desktop'
  
  /** Current responsive behavior */
  protected currentResponsiveBehavior: any = null
  
  /** Responsive event handlers */
  protected responsiveEventHandlers: Map<string, Function> = new Map()
  
  /** Logger instance */
  protected logger: Logger = Logger.getInstance()
  
  // ===== RESPONSIVE BEHAVIOR METHODS =====
  
  /**
   * Get responsive behavior based on current dimensions
   * Override this in concrete classes to provide custom responsive logic
   */
  protected getResponsiveBehavior(width: number, _height: number): {
    deviceType: 'desktop' | 'mobile'
    maintainAspectRatio: boolean
    scaleStrategy: 'fit' | 'stretch' | 'fill'
    alignment: { x: 'left' | 'center' | 'right'; y: 'top' | 'center' | 'bottom' }
    customProperties?: Record<string, any>
  } {
    // Use scene's responsive config if available, otherwise use default behavior
    if (this.scene && (this.scene as any).sceneConfigs?.responsive) {
      const responsiveConfig = (this.scene as any).sceneConfigs.responsive
      const isDesktop = width >= responsiveConfig.breakpoints.desktop
      const deviceType = isDesktop ? 'desktop' : 'mobile'
      const behavior = responsiveConfig[deviceType]
      
      return {
        deviceType,
        maintainAspectRatio: behavior.maintainAspectRatio,
        scaleStrategy: behavior.scaleStrategy,
        alignment: behavior.alignment,
        customProperties: {}
      }
    }
    
    // Default responsive behavior
    const isDesktop = width >= this.responsiveBreakpoints.desktop
    
    if (isDesktop) {
      return {
        deviceType: 'desktop',
        maintainAspectRatio: true,
        scaleStrategy: 'fit',
        alignment: { x: 'center', y: 'center' },
        customProperties: {}
      }
    } else {
      return {
        deviceType: 'mobile',
        maintainAspectRatio: false,
        scaleStrategy: 'stretch',
        alignment: { x: 'center', y: 'center' },
        customProperties: {}
      }
    }
  }
  
  /**
   * Determine if device type changed
   */
  protected hasDeviceTypeChanged(newWidth: number, newHeight: number): boolean {
    const newDeviceType = newWidth >= this.responsiveBreakpoints.desktop ? 'desktop' : 'mobile'
    const changed = this.currentDeviceType !== newDeviceType
    
    if (changed) {
      this.logger.debug('ScalableGameObject', 'Device type changed', {
        objectId: this.id,
        oldDeviceType: this.currentDeviceType,
        newDeviceType,
        oldDimensions: { width: newWidth, height: newHeight }
      }, 'hasDeviceTypeChanged')
      
      this.currentDeviceType = newDeviceType
    }
    
    return changed
  }
  
  /**
   * Calculate responsive layout based on responsive behavior
   * Override this in concrete classes for custom layout logic
   */
  protected calculateResponsiveLayout(
    containerWidth: number,
    containerHeight: number,
    _responsiveBehavior: ReturnType<typeof this.getResponsiveBehavior>
  ): { position: { x: number; y: number }; size: { width: number; height: number } } {
    // Default responsive layout calculation
    return {
      position: { x: 0, y: 0 },
      size: { width: containerWidth, height: containerHeight }
    }
  }
  

  
  // ===== RESPONSIVE EVENT SYSTEM =====
  
  /**
   * Add responsive event handler
   */
  protected addResponsiveEventHandler(event: string, handler: Function): void {
    this.responsiveEventHandlers.set(event, handler)
  }
  
  /**
   * Remove responsive event handler
   */
  protected removeResponsiveEventHandler(event: string): void {
    this.responsiveEventHandlers.delete(event)
  }
  
  /**
   * Emit responsive event
   */
  protected emitResponsiveEvent(event: string, data: any): void {
    const handler = this.responsiveEventHandlers.get(event)
    if (handler) {
      try {
        handler(data)
          } catch (error) {
      this.logger.error('ScalableGameObject', `Error in responsive event handler for ${event}:`, error)
    }
    }
  }
  
  // ===== RESPONSIVE UTILITY METHODS =====
  
  /**
   * Check if current device is desktop
   */
  protected isDesktop(): boolean {
    return this.currentDeviceType === 'desktop'
  }
  
  /**
   * Check if current device is mobile
   */
  protected isMobile(): boolean {
    return this.currentDeviceType === 'mobile'
  }
  
  /**
   * Get current responsive behavior
   */
  protected getCurrentResponsiveBehavior() {
    return this.currentResponsiveBehavior
  }
  
  /**
   * Update responsive breakpoints
   */
  protected updateResponsiveBreakpoints(breakpoints: { desktop: number; mobile: number }): void {
    this.responsiveBreakpoints = { ...this.responsiveBreakpoints, ...breakpoints }
    
    this.logger.debug('ScalableGameObject', 'Responsive breakpoints updated', {
      objectId: this.id,
      newBreakpoints: this.responsiveBreakpoints
    }, 'updateResponsiveBreakpoints')
  }
  
  /**
   * Get responsive breakpoints
   */
  protected getResponsiveBreakpoints() {
    return { ...this.responsiveBreakpoints }
  }
  
  // ===== ABSTRACT METHODS =====
  
  /**
   * Concrete classes must implement this to provide their specific responsive logic
   */
  protected abstract onResponsiveBehaviorChanged(oldBehavior: any, newBehavior: any): void
  
  /**
   * Concrete classes must implement this to provide their specific layout logic
   */
  protected abstract onResponsiveLayoutChanged(oldLayout: any, newLayout: any): void
  
  /**
   * Handle responsive resize with common logic
   * This method should be called by concrete classes in their resize method
   */
  protected handleResponsiveResize(width: number, height: number): void {
    // Check if device type changed
    const deviceTypeChanged = this.hasDeviceTypeChanged(width, height)
    
    // Get responsive behavior
    const responsiveBehavior = this.getResponsiveBehavior(width, height)
    this.currentResponsiveBehavior = responsiveBehavior
    
    // Log responsive behavior
    this.logger.debug('ScalableGameObject', 'Responsive behavior determined', {
      objectId: this.id,
      deviceType: responsiveBehavior.deviceType,
      maintainAspectRatio: responsiveBehavior.maintainAspectRatio,
      scaleStrategy: responsiveBehavior.scaleStrategy,
      alignment: responsiveBehavior.alignment,
      deviceTypeChanged
    }, 'handleResponsiveResize')
    
    // Emit responsive events if device type changed
    if (deviceTypeChanged) {
      this.emitResponsiveEvent('deviceTypeChanged', {
        oldDeviceType: this.currentDeviceType,
        newDeviceType: responsiveBehavior.deviceType,
        dimensions: { width, height }
      })
      
      // Call abstract method for concrete classes to handle
      this.onResponsiveBehaviorChanged(
        { deviceType: this.currentDeviceType },
        responsiveBehavior
      )
    }
    
    // Emit resize event
    this.emitResponsiveEvent('resize', {
      dimensions: { width, height },
      responsiveBehavior
    })
    
    // Call abstract method for concrete classes to handle
    // Pass current dimensions as parameters to avoid accessing phaserObject
    this.onResponsiveLayoutChanged(
      { width: 0, height: 0 }, // Old dimensions - concrete classes should override this
      { width, height }
    )
  }
}
