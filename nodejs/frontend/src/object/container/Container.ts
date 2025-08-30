import * as Phaser from 'phaser'
import type { IContainer } from '../../abstract/objects/IContainer'
import type { IGameObject } from '../../abstract/base/IGameObject'
import type { IBounds } from '../../abstract/objects/IBound'
import { Logger } from '../../core/Logger'
import { ScalableHelper } from '../shapes/ScalableHelper'

/**
 * Container Class
 * Concrete implementation of IContainer that extends Phaser.GameObjects.Container
 * 
 * Key Features:
 * - Directly extends Phaser.GameObjects.Container for optimal performance
 * - Uses ScalableHelper for responsive behavior
 * - Implements minimal IContainer interface
 * - Maintains proper Phaser container functionality
 */
export class Container extends Phaser.GameObjects.Container implements IContainer {
  // ===== ESSENTIAL PROPERTIES =====
  
  /** Unique identifier for this container */
  readonly id: string
  
  /** Parent container (null if root) */
  readonly parent: IContainer | null
  
  /** ScalableHelper for responsive behavior */
  private scalableHelper: ScalableHelper
  
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
    
    // Initialize ScalableHelper for responsive behavior
    this.scalableHelper = new ScalableHelper(scene, id, parent)
    
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
  
  /** Handle responsive resize from scene */
  handleResponsiveResize(width: number, height: number): void {
    this.logger.debug('Container', 'Handling responsive resize', {
      id: this.id,
      newDimensions: { width, height },
      currentDimensions: this.size
    })
    
    // Use ScalableHelper to handle responsive behavior
    this.scalableHelper.handleResponsiveResize(width, height)
    
    // Apply the new size
    this.setSize(width, height)
  }
  
  /** Handle resize events and propagate to children */
  resize(width: number, height: number): void {
    this.logger.debug('Container', 'Resize called', {
      id: this.id,
      newDimensions: { width, height },
      currentDimensions: this.size
    })
    
    // Set the container size
    this.setSize(width, height)
    
    // Propagate resize to all children
    this.propagateResizeToChildren(width, height)
  }
  
  /**
   * Propagate resize event to all children
   */
  protected propagateResizeToChildren(width: number, height: number): void {
    this.logger.debug('Container', 'Propagating resize to children', {
      id: this.id,
      newDimensions: { width, height },
      childCount: this.children.length
    })
    
    // Loop through all children and call their resize method if available
    this.children.forEach((child: any, index: number) => {
      if (child && typeof child.resize === 'function') {
        try {
          child.resize(width, height)
          this.logger.debug('Container', 'Child resize called', {
            id: this.id,
            childName: child.name || child.id || `child-${index}`,
            childType: child.constructor.name
          })
        } catch (error) {
          this.logger.warn('Container', 'Failed to resize child', {
            id: this.id,
            childName: child.name || child.id || `child-${index}`,
            error: error instanceof Error ? error.message : String(error)
          })
        }
      }
    })
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
