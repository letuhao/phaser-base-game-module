import * as Phaser from 'phaser'
import type { IGameObject } from '../../abstract/base/IGameObject'
import type { IContainer } from '../../abstract/objects/IContainer'
import { Container } from './Container'

/**
 * FlexboxContainer Class
 * Extends Container to implement flexbox layout logic
 * 
 * This class demonstrates how layout classes can override the default
 * Container behavior to control positioning and sizing for specific layout systems
 */
export class FlexboxContainer extends Container {
  /** Flexbox specific properties */
  readonly flexbox = {
    /** Flex direction */
    direction: 'row' as 'row' | 'row-reverse' | 'column' | 'column-reverse',
    /** Flex wrap */
    wrap: 'nowrap' as 'nowrap' | 'wrap' | 'wrap-reverse',
    /** Justify content */
    justifyContent: 'flex-start' as 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly',
    /** Align items */
    alignItems: 'stretch' as 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
    /** Align content */
    alignContent: 'flex-start' as 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'space-between' | 'space-around'
  }
  
  /** Flex item properties for children */
  private flexItems = new Map<string, {
    order: number
    flexGrow: number
    flexShrink: number
    flexBasis: number | 'auto' | 'content'
    alignSelf: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
  }>()
  
  constructor(
    scene: Phaser.Scene,
    id: string,
    x: number = 0,
    y: number = 0,
    parent: IContainer | null = null
  ) {
    super(scene, id, x, y, parent)
    
    // Set container type to flexbox
    // Container type is set in constructor, no need to call setter
    
    // Set default flexbox properties
    this.setFlexboxProperties({
      direction: 'row',
      wrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      alignContent: 'flex-start'
    })
  }
  
  // ===== FLEXBOX PROPERTY SETTERS =====
  
  /** Set flexbox properties */
  setFlexboxProperties(properties: Partial<typeof this.flexbox>): void {
    Object.assign(this.flexbox, properties)
    this.invalidateLayout()
  }
  
  /** Set flex direction */
  setFlexDirection(direction: typeof this.flexbox.direction): void {
    this.flexbox.direction = direction
    this.invalidateLayout()
  }
  
  /** Set flex wrap */
  setFlexWrap(wrap: typeof this.flexbox.wrap): void {
    this.flexbox.wrap = wrap
    this.invalidateLayout()
  }
  
  /** Set justify content */
  setJustifyContent(justifyContent: typeof this.flexbox.justifyContent): void {
    this.flexbox.justifyContent = justifyContent
    this.invalidateLayout()
  }
  
  /** Set align items */
  setAlignItems(alignItems: typeof this.flexbox.alignItems): void {
    this.flexbox.alignItems = alignItems
    this.invalidateLayout()
  }
  
  /** Set align content */
  setAlignContent(alignContent: typeof this.flexbox.alignContent): void {
    this.flexbox.alignContent = alignContent
    this.invalidateLayout()
  }
  
  // ===== FLEX ITEM PROPERTY SETTERS =====
  
  /** Set flex properties for a specific child */
  setFlexItemProperties(
    childId: string,
    properties: {
      order?: number
      flexGrow?: number
      flexShrink?: number
      flexBasis?: number | 'auto' | 'content'
      alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
    }
  ): void {
    const current = this.flexItems.get(childId) || {
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      alignSelf: 'auto'
    }
    
    this.flexItems.set(childId, { ...current, ...properties })
    this.invalidateLayout()
  }
  
  /** Get flex properties for a specific child */
  getFlexItemProperties(childId: string) {
    return this.flexItems.get(childId) || {
      order: 0,
      flexGrow: 0,
      flexShrink: 1,
      flexBasis: 'auto',
      alignSelf: 'auto'
    }
  }
  
  // ===== LAYOUT OVERRIDE METHODS =====
  
  /** Override arrangeLayout to implement flexbox logic */
  arrangeLayout(availableWidth: number, availableHeight: number): void {
    if (this.children.length === 0) return
    
    // Sort children by order
    const sortedChildren = [...this.children].sort((a, b) => {
      const aOrder = this.getFlexItemProperties(a.id).order
      const bOrder = this.getFlexItemProperties(b.id).order
      return aOrder - bOrder
    })
    
    // Calculate flexbox layout
    this.calculateFlexboxLayout(sortedChildren, availableWidth, availableHeight)
  }
  
  /** Calculate flexbox layout for children */
  private calculateFlexboxLayout(children: IGameObject[], availableWidth: number, availableHeight: number): void {
    const isRow = this.flexbox.direction === 'row' || this.flexbox.direction === 'row-reverse'
    const isReverse = this.flexbox.direction === 'row-reverse' || this.flexbox.direction === 'column-reverse'
    
    // Calculate total flex grow and basis
    let totalFlexGrow = 0
    let totalFlexBasis = 0
    const flexItems: Array<{
      child: IGameObject
      properties: {
        order: number
        flexGrow: number
        flexShrink: number
        flexBasis: number | 'auto' | 'content'
        alignSelf: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline'
      }
      size: { width: number; height: number }
      flexBasis: number
    }> = []
    
    children.forEach(child => {
      const properties = this.getFlexItemProperties(child.id)
      const size = this.getChildSize(child)
      const flexBasis = this.calculateFlexBasis(properties.flexBasis, size, isRow)
      
      totalFlexGrow += properties.flexGrow
      totalFlexBasis += flexBasis
      
      flexItems.push({ child, properties, size, flexBasis })
    })
    
    // Calculate available space for flex grow
    const availableSpace = isRow ? availableWidth : availableHeight
    const totalFlexGrowSpace = Math.max(0, availableSpace - totalFlexBasis)
    
    // Distribute flex grow space
    let currentPosition = 0
    flexItems.forEach(({ child, properties, size, flexBasis }) => {
      const flexGrowSpace = properties.flexGrow > 0 ? 
        (properties.flexGrow / totalFlexGrow) * totalFlexGrowSpace : 0
      
      const finalSize = flexBasis + flexGrowSpace
      
      // Position child
      if (isRow) {
        const x = isReverse ? availableWidth - currentPosition - finalSize : currentPosition
        const y = this.calculateCrossAxisPosition(child, availableHeight, size.height)
        
        this.positionChild(child, x, y)
        currentPosition += finalSize + this.spacing.gap
      } else {
        const x = this.calculateCrossAxisPosition(child, availableWidth, size.width)
        const y = isReverse ? availableHeight - currentPosition - finalSize : currentPosition
        
        this.positionChild(child, x, y)
        currentPosition += finalSize + this.spacing.gap
      }
    })
  }
  
  /** Calculate flex basis for a child */
  private calculateFlexBasis(basis: number | 'auto' | 'content', size: { width: number; height: number }, isRow: boolean): number {
    if (typeof basis === 'number') return basis
    if (basis === 'content') return isRow ? size.width : size.height
    return isRow ? size.width : size.height // 'auto' case
  }
  
  /** Calculate cross-axis position for alignment */
  private calculateCrossAxisPosition(_child: IGameObject, availableSize: number, childSize: number): number {
    switch (this.flexbox.alignItems) {
      case 'flex-start':
        return 0
      case 'flex-end':
        return availableSize - childSize
      case 'center':
        return (availableSize - childSize) / 2
      case 'stretch':
        return 0 // Size will be stretched
      case 'baseline':
        return 0 // Baseline alignment would need font metrics
      default:
        return 0
    }
  }
  
  /** Get the size of a child object */
  private getChildSize(child: IGameObject): { width: number; height: number } {
    if ('size' in child && child.size) {
      return child.size
    }
    if ('phaserObject' in child && child.phaserObject) {
      return {
        width: (child.phaserObject as any).width || 100,
        height: (child.phaserObject as any).height || 100
      }
    }
    return { width: 100, height: 100 } // Default size
  }
  
  /** Position a child object */
  private positionChild(child: IGameObject, x: number, y: number): void {
    if ('setPosition' in child && typeof child.setPosition === 'function') {
      (child as any).setPosition(x, y)
    } else if ('phaserObject' in child && child.phaserObject) {
      (child.phaserObject as any).setPosition(x, y)
    }
  }
  
  /** Override measureLayout to calculate size based on flexbox */
  measureLayout(): { width: number; height: number } {
    if (this.children.length === 0) {
      return { width: 0, height: 0 }
    }
    
    const isRow = this.flexbox.direction === 'row' || this.flexbox.direction === 'row-reverse'
    
    let totalWidth = 0
    let totalHeight = 0
    let maxWidth = 0
    let maxHeight = 0
    
    this.children.forEach(child => {
      const size = this.getChildSize(child)
      
      if (isRow) {
        totalWidth += size.width
        maxHeight = Math.max(maxHeight, size.height)
      } else {
        totalHeight += size.height
        maxWidth = Math.max(maxWidth, size.width)
      }
    })
    
    // Add gaps
    const gapCount = Math.max(0, this.children.length - 1)
    if (isRow) {
      totalWidth += gapCount * this.spacing.gap
      totalHeight = maxHeight
    } else {
      totalHeight += gapCount * this.spacing.gap
      totalWidth = maxWidth
    }
    
    // Add padding
    totalWidth += this.spacing.padding.left + this.spacing.padding.right
    totalHeight += this.spacing.padding.top + this.spacing.padding.bottom
    
    return { width: totalWidth, height: totalHeight }
  }
  
  /** Override needsLayoutRecalculation to check flexbox-specific conditions */
  override needsLayoutRecalculation(): boolean {
    // Check if any flex properties have changed
    return this.children.some(child => {
      const properties = this.getFlexItemProperties(child.id)
      return properties.order !== 0 || properties.flexGrow !== 0 || properties.flexShrink !== 1
    })
  }
  
  /** Override invalidateLayout to mark flexbox as dirty */
  override invalidateLayout(): void {
    // Mark layout as needing recalculation
    // This would trigger a layout update in the next frame
  }
  
  // ===== RESPONSIVE OVERRIDE =====
  
  /** Override resize to recalculate flexbox layout */
  override resize(width: number, height: number): void {
    super.resize(width, height)
    this.calculateLayout()
  }
  
  // ===== UTILITY METHODS =====
  
  /** Get flexbox layout information */
  getFlexboxInfo(): {
    direction: string
    wrap: string
    justifyContent: string
    alignItems: string
    alignContent: string
    itemCount: number
    totalFlexGrow: number
  } {
    let totalFlexGrow = 0
    this.children.forEach(child => {
      const properties = this.getFlexItemProperties(child.id)
      totalFlexGrow += properties.flexGrow
    })
    
    return {
      direction: this.flexbox.direction,
      wrap: this.flexbox.wrap,
      justifyContent: this.flexbox.justifyContent,
      alignItems: this.flexbox.alignItems,
      alignContent: this.flexbox.alignContent,
      itemCount: this.children.length,
      totalFlexGrow
    }
  }
  
  /** Debug flexbox layout */
  debugFlexboxLayout(): void {
    this.logger.debug('FlexboxContainer', 'Flexbox Container Debug:', {
      id: this.id,
      flexbox: this.flexbox,
      children: this.children.map(child => ({
        id: child.id,
        flexProperties: this.getFlexItemProperties(child.id),
        size: this.getChildSize(child)
      })),
      layoutInfo: this.getLayoutInfo()
    })
  }
}
