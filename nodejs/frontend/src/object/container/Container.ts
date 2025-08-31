import * as Phaser from 'phaser'
import type { IContainer } from '../../abstract/objects/IContainer'
import type { IGameObject } from '../../abstract/base/IGameObject'
import type { IBounds } from '../../abstract/objects/IBound'
import type { IStyle } from '../../abstract/configs/IStyle'
import type { CommonIStyleProperties, IRandomValueNumber } from '../../abstract/configs/IStyleProperties'
import { Logger } from '../../core/Logger'

/**
 * Container Class
 * Concrete implementation of IContainer that extends Phaser.GameObjects.Container
 * 
 * Key Features:
 * - Directly extends Phaser.GameObjects.Container for optimal performance
 * - Implements IStyle for responsive behavior
 * - Implements minimal IContainer interface
 * - Maintains proper Phaser container functionality
 */
export class Container extends Phaser.GameObjects.Container implements IContainer, IStyle {
  // ===== ESSENTIAL PROPERTIES =====
  
  /** Unique identifier for this container */
  readonly id: string
  
  /** Parent container (null if root) */
  readonly parent: IContainer | null
  
  /** Array of child game objects */
  readonly children: IGameObject[] = []
  
  /** Container type */
  readonly containerType: IContainer['containerType'] = 'div'
  
  /** Container constraints */
  readonly constraints = {
    maxChildren: 1000,
    autoSize: false,
    clipOverflow: false,
    overflow: 'visible' as const,
    respectParentBounds: true,
    maintainAspectRatio: false
  }
  
  /** Current style properties */
  private currentStyle: CommonIStyleProperties = {
    maintainAspectRatio: false,
    scaleStrategy: 'stretch',
    alignment: 'center'
  };
  
  /** Responsive layout properties for this object (IGameObject requirement) */
  layoutProperties: CommonIStyleProperties = {
    maintainAspectRatio: false,
    scaleStrategy: 'stretch',
    alignment: 'center'
  };
  
  /** Spacing properties for layout containers */
  readonly spacing = {
    gap: 10,
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  };
  
  // ===== COMPUTED PROPERTIES =====
  
  /** Number of children */
  get childCount(): number {
    return this.children.length
  }
  
  /** Whether this container has children */
  get hasChildren(): boolean {
    return this.children.length > 0
  }
  
  /** Whether this container is empty */
  get isEmpty(): boolean {
    return this.children.length === 0
  }
  
  /** Whether this game object is currently active/visible */
  get isActive(): boolean {
    return this.active
  }
  
  /** Whether this game object is destroyed */
  get isDestroyed(): boolean {
    return !this.active
  }
  
  /** Size of the game object */
  get size(): { width: number; height: number } {
    return { width: this.width, height: this.height }
  }
  
  /** Whether the game object is interactive */
  get interactive(): boolean {
    return this.input?.enabled || false
  }
  
  // ===== CONSTRUCTOR =====
  
  constructor(
    scene: Phaser.Scene,
    id: string,
    x: number = 0,
    y: number = 0,
    parent: IContainer | null = null
  ) {
    // Call Phaser container constructor
    super(scene, x, y)
    
    this.id = id
    this.parent = parent
    
    // Set up the container
    this.setupContainer()
  }
  
  /** Logger instance */
  protected logger: Logger = Logger.getInstance()
  
  // ===== SETUP METHODS =====
  
  /** Set up the container with default properties */
  protected setupContainer(): void {
    // Set default properties
    this.setSize(100, 100) // Default size
    this.setInteractive()
  }
  
  // ===== IStyle IMPLEMENTATION =====
  
  /** Set the style properties for this container */
  setStyle(layoutProperties: CommonIStyleProperties): void {
    this.logger.debug('Container', 'Setting style properties', {
      id: this.id,
      newStyle: layoutProperties
    });
    
    // Store the new style
    this.currentStyle = { ...layoutProperties };
    
    // Apply position properties
    this.applyPositionProperties(layoutProperties);
    
    // Apply size properties
    this.applySizeProperties(layoutProperties);
    
    // Apply visual properties
    this.applyVisualProperties(layoutProperties);
    
    // Apply background properties
    this.applyBackgroundProperties(layoutProperties);
  }
  
  /** Get the current style properties */
  getStyle(): CommonIStyleProperties {
    return { ...this.currentStyle };
  }
  
  /** Get the object ID for responsive config lookup */
  getStyleId(): string {
    return this.id;
  }
  
  // ===== STYLE APPLICATION METHODS =====
  
  /** Apply position properties from style */
  private applyPositionProperties(style: CommonIStyleProperties): void {
    if (style.positionX !== undefined) {
      if (typeof style.positionX === 'number') {
        this.x = style.positionX;
      } else if (style.positionX === 'center') {
        // Center horizontally (will be applied when parent bounds are known)
        this.x = 0; // Placeholder, will be calculated
      }
    }
    
    if (style.positionY !== undefined) {
      if (typeof style.positionY === 'number') {
        this.y = style.positionY;
      } else if (style.positionY === 'center') {
        // Center vertically (will be applied when parent bounds are known)
        this.y = 0; // Placeholder, will be calculated
      }
    }
    
    if (style.positionZ !== undefined) {
      this.setDepth(style.positionZ);
    }
  }
  
  /** Apply size properties from style */
  private applySizeProperties(style: CommonIStyleProperties): void {
    if (style.width !== undefined) {
      if (typeof style.width === 'number') {
        this.width = style.width;
      }
      // 'fill' and 'auto' will be handled during resize
    }
    
    if (style.height !== undefined) {
      if (typeof style.height === 'number') {
        this.height = style.height;
      }
      // 'fill' and 'auto' will be handled during resize
    }
  }
  
  /** Apply visual properties from style */
  private applyVisualProperties(style: CommonIStyleProperties): void {
    if (style.alpha !== undefined) {
      if (typeof style.alpha === 'number') {
        this.setAlpha(style.alpha);
      } else if (typeof style.alpha === 'object' && 'min' in style.alpha && 'max' in style.alpha) {
        // Handle RandomValueNumber
        const randomValue = (style.alpha as IRandomValueNumber).getRandomValue();
        this.setAlpha(randomValue);
      }
    }
    
    if (style.rotation !== undefined) {
      if (typeof style.rotation === 'number') {
        this.setRotation(style.rotation);
      } else if (typeof style.rotation === 'object' && 'min' in style.rotation && 'max' in style.rotation) {
        // Handle RandomValueNumber
        const randomValue = (style.rotation as IRandomValueNumber).getRandomValue();
        this.setRotation(randomValue);
      }
    }
    
    if (style.visible !== undefined) {
      this.setVisible(style.visible);
    }
    
    if (style.interactive !== undefined) {
      if (style.interactive) {
        this.setInteractive();
      } else {
        this.disableInteractive();
      }
    }
  }
  
  /** Apply background properties from style */
  private applyBackgroundProperties(style: CommonIStyleProperties): void {
    if (style.backgroundColor !== undefined) {
      // For containers, we might need to create a background rectangle
      // This will be implemented based on specific needs
    }
  }
  
  // ===== IContainer IMPLEMENTATION =====
  
  /** Add a child game object to this container */
  addChild(child: IGameObject): void {
    if (this.children.length >= this.constraints.maxChildren) {
      this.logger.warn('Container', 'Cannot add child - max children reached', {
        id: this.id,
        currentCount: this.children.length,
        maxCount: this.constraints.maxChildren
      })
      return
    }
    
    this.children.push(child)
    
    // If the child has a phaserObject, add it to the Phaser container
    if ((child as any).phaserObject) {
      this.add((child as any).phaserObject)
    } else if (child instanceof Phaser.GameObjects.GameObject) {
      this.add(child)
    }
    
    this.logger.debug('Container', 'Child added to container', {
      id: this.id,
      childId: (child as any).id || 'unknown',
      childCount: this.children.length
    })
  }
  
  /** Remove a child game object from this container */
  removeChild(child: IGameObject): void {
    const index = this.children.indexOf(child)
    if (index !== -1) {
      this.children.splice(index, 1)
      
      // If the child has a phaserObject, remove it from the Phaser container
      if ((child as any).phaserObject) {
        this.remove((child as any).phaserObject)
      } else if (child instanceof Phaser.GameObjects.GameObject) {
        this.remove(child)
      }
      
      this.logger.debug('Container', 'Child removed from container', {
        id: this.id,
        childId: (child as any).id || 'unknown',
        childCount: this.children.length
      })
    }
  }
  
  /** Get child by ID */
  getChild(id: string): IGameObject | undefined {
    return this.children.find(child => (child as any).id === id)
  }
  
  /** Get all children */
  getAllChildren(): IGameObject[] {
    return [...this.children]
  }
  
  /** Clear all children */
  clearChildren(): void {
    this.children.length = 0
    this.removeAll()
    this.logger.debug('Container', 'All children cleared', { id: this.id })
  }
  
  // ===== RESPONSIVE BEHAVIOR =====
  
  /** Handle responsive resize from scene - now delegates to setStyle */
  handleResponsiveResize(width: number, height: number): void {
    this.logger.debug('Container', 'Handling responsive resize', {
      id: this.id,
      newDimensions: { width, height },
      currentDimensions: this.size
    });
    
    // Update layout properties with new dimensions and apply via setStyle
    if (this.layoutProperties) {
      this.layoutProperties = {
        ...this.layoutProperties,
        width,
        height
      };
      this.setStyle(this.layoutProperties);
    }
  }
  
  /** Handle resize events and propagate to children */
  resize(width: number, height: number): void {
    this.logger.debug('Container', 'Resize called', {
      id: this.id,
      newDimensions: { width, height },
      currentDimensions: this.size
    });
    
    // Template method pattern: split resize into three phases
    
    // Phase 1: Resize self (can be overridden by subclasses)
    this.resizeSelf(width, height);
    
    // Phase 2: Propagate resize to children
    this.propagateResizeToChildren(width, height);
    
    // Phase 3: Post-resize operations (can be overridden by subclasses)
    this.resizeAfter(width, height);
  }
  
  /**
   * Phase 1: Resize the container itself
   * This method can be overridden by subclasses to implement custom resize logic
   */
  protected resizeSelf(width: number, height: number): void {
    this.logger.debug('Container', 'Resizing self', {
      id: this.id,
      newDimensions: { width, height },
      currentDimensions: this.size
    });
    
    // Apply responsive styling if we have layout properties
    if (this.layoutProperties) {
      // Update the layout properties with the new dimensions
      this.layoutProperties = {
        ...this.layoutProperties,
        width,
        height
      };
      
      // Apply the updated style properties (including size)
      this.setStyle(this.layoutProperties);
    }
    
    // Note: setSize is now handled by setStyle through applySizeProperties
  }
  
  /**
   * Phase 2: Propagate resize event to all children
   */
  protected propagateResizeToChildren(width: number, height: number): void {
    this.logger.debug('Container', 'Propagating resize to children', {
      id: this.id,
      newDimensions: { width, height },
      childCount: this.children.length
    });
    
    // Loop through all children and call their resize method if available
    this.children.forEach((child: any, index: number) => {
      if (child && typeof child.resize === 'function') {
        try {
          child.resize(width, height);
          this.logger.debug('Container', 'Child resize called', {
            id: this.id,
            childName: child.name || child.id || `child-${index}`,
            childType: child.constructor.name
          });
        } catch (error) {
          this.logger.warn('Container', 'Failed to resize child', {
            id: this.id,
            childName: child.name || child.id || `child-${index}`,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      }
    });
  }
  
  /**
   * Phase 3: Post-resize operations
   * This method can be overridden by subclasses to implement post-resize logic
   */
  protected resizeAfter(width: number, height: number): void {
    this.logger.debug('Container', 'Post-resize operations', {
      id: this.id,
      newDimensions: { width, height }
    });
    
    // Default implementation is empty
    // Subclasses can override this to implement custom post-resize logic
  }
  
  // ===== UTILITY METHODS =====
  
  /** Get bounds of this container */
  getContainerBounds(): IBounds {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    }
  }
  
  /** Get layout information */
  getLayoutInfo(): any {
    return {
      id: this.id,
      type: this.containerType,
      childCount: this.children.length
    }
  }
  
  /** Invalidate layout (trigger recalculation) */
  invalidateLayout(): void {
    this.logger.debug('Container', 'Layout invalidated', { id: this.id })
    // Implementation for layout invalidation
  }
  
  /** Update layout */
  updateLayout(): void {
    this.logger.debug('Container', 'Updating layout', { id: this.id })
    // Implementation for layout update
  }
  
  /** Destroy the container */
  destroy(fromScene?: boolean): void {
    this.logger.debug('Container', 'Destroying container', { id: this.id })
    
    // Clear children
    this.clearChildren()
    
    // Call parent destroy
    super.destroy(fromScene)
  }
}

