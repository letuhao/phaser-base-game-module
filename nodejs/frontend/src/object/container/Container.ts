import * as Phaser from 'phaser'
import type { IContainer } from '../../abstract/objects/IContainer'
import type { IGameObject } from '../../abstract/base/IGameObject'
import type { IBounds, IBoundAlignment } from '../../abstract/objects/IBound'
import type { IScale } from '../../abstract/objects/IScalable'
import { ScalableGameObject } from '../../abstract/base/ScalableGameObject'
import { Logger } from '../../core/Logger'

/**
 * Container Class
 * Concrete implementation of IContainer that serves as a Phaser wrapper
 * 
 * Default behavior:
 * - Container X,Y = Phaser Container X,Y
 * - Container Width,Height = Phaser Container Width,Height
 * 
 * Layout classes can inherit from this and override the logic to control
 * positioning and sizing for different layout systems
 * 
 * Inheritance: ScalableGameObject > Container > BackgroundContainer/ConcreteContainer/FlexboxContainer
 */
export class Container extends ScalableGameObject implements IContainer {
  // ===== PROPERTIES =====
  
  /** Unique identifier for this container */
  readonly id: string
  
  /** Parent container (null if root) */
  readonly parent: IContainer | null
  
  /** The underlying Phaser container */
  readonly phaserObject: Phaser.GameObjects.Container
  
  /** Array of child game objects */
  readonly children: IGameObject[] = []
  
  /** Container type */
  readonly containerType: IContainer['containerType'] = 'div'
  
  /** Container layout direction */
  readonly layoutDirection: IContainer['layoutDirection'] = 'horizontal'
  
  /** Container layout alignment */
  readonly layoutAlignment: IContainer['layoutAlignment'] = {
    mainAxis: 'start',
    crossAxis: 'stretch'
  }
  
  /** Container spacing and gaps */
  readonly spacing: IContainer['spacing'] = {
    gap: 0,
    rowGap: 0,
    columnGap: 0,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    padding: { top: 0, right: 0, bottom: 0, left: 0 }
  }
  
  /** Container constraints */
  readonly constraints: IContainer['constraints'] = {
    maxChildren: 1000,
    autoSize: false,
    clipOverflow: false,
    overflow: 'visible',
    respectParentBounds: true,
    maintainAspectRatio: false
  }
  
  /** Container background and styling */
  readonly background: IContainer['background'] = {}
  
  /** Container border */
  readonly border: IContainer['border'] = {
    width: 0,
    style: 'none',
    color: '#000000',
    radius: 0
  }
  
  /** Container shadow */
  readonly shadow: IContainer['shadow'] = {
    enabled: false,
    color: '#000000',
    blur: 0,
    offsetX: 0,
    offsetY: 0
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
    return this.phaserObject.active
  }
  
  /** Whether this game object is destroyed */
  get isDestroyed(): boolean {
    return !this.phaserObject.active
  }
  
  /** The scene this game object belongs to */
  get scene(): Phaser.Scene {
    return this.phaserObject.scene
  }
  
  /** Position of the game object in world coordinates */
  get position(): { x: number; y: number } {
    return { x: this.phaserObject.x, y: this.phaserObject.y }
  }
  
  /** Size of the game object */
  get size(): { width: number; height: number } {
    return { width: this.phaserObject.width, height: this.phaserObject.height }
  }
  
  /** Scale of the game object */
  get scale(): { x: number; y: number } {
    return { x: this.phaserObject.scaleX, y: this.phaserObject.scaleY }
  }
  
  /** Rotation of the game object in radians */
  get rotation(): number {
    return this.phaserObject.rotation
  }
  
  /** Alpha/transparency of the game object (0-1) */
  get alpha(): number {
    return this.phaserObject.alpha
  }
  
  /** Whether the game object is visible */
  get visible(): boolean {
    return this.phaserObject.visible
  }
  
  /** Whether the game object is interactive */
  get interactive(): boolean {
    return this.phaserObject.input?.enabled || false
  }
  

  
  // ===== CONSTRUCTOR =====
  
  constructor(
    scene: Phaser.Scene,
    id: string,
    x: number = 0,
    y: number = 0,
    parent: IContainer | null = null
  ) {
    // Call super() first since we're extending ScalableGameObject
    super()
    
    this.id = id
    this.parent = parent
    
    // Create the underlying Phaser container
    this.phaserObject = scene.add.container(x, y)
    
    // Set up the container
    this.setupContainer()
  }
  
  /** Logger instance */
  protected logger: Logger = Logger.getInstance()
  
  // ===== SETUP METHODS =====
  
  /** Set up the container with default properties */
  protected setupContainer(): void {
    // Set default properties
    this.phaserObject.setSize(100, 100) // Default size
    this.phaserObject.setInteractive()
    
    // Set up background if specified
    if (this.background.color) {
      this.setupBackground()
    }
    
    // Set up border if specified
    if (this.border.width > 0) {
      this.setupBorder()
    }
    
    // Set up shadow if enabled
    if (this.shadow.enabled) {
      this.setupShadow()
    }
  }
  
  /** Set up container background */
  protected setupBackground(): void {
    // Implementation for background setup
    // This would create a background rectangle or image
  }
  
  /** Set up container border */
  protected setupBorder(): void {
    // Implementation for border setup
    // This would create border graphics
  }
  
  /** Set up container shadow */
  protected setupShadow(): void {
    // Implementation for shadow setup
    // This would create shadow graphics
  }
  
  // ===== IBound IMPLEMENTATION =====
  
  getBounds(): IBounds {
    return {
      x: this.phaserObject.x,
      y: this.phaserObject.y,
      width: this.phaserObject.width,
      height: this.phaserObject.height
    }
  }
  
  setBounds(bounds: IBounds): void {
    this.phaserObject.setPosition(bounds.x, bounds.y)
    this.phaserObject.setSize(bounds.width, bounds.height)
  }
  
  getX(): number { return this.phaserObject.x }
  getY(): number { return this.phaserObject.y }
  getWidth(): number { return this.phaserObject.width }
  getHeight(): number { return this.phaserObject.height }
  
  setX(x: number): void { this.phaserObject.setX(x) }
  setY(y: number): void { this.phaserObject.setY(y) }
  setWidth(width: number): void { this.phaserObject.setSize(width, this.phaserObject.height) }
  setHeight(height: number): void { this.phaserObject.setSize(this.phaserObject.width, height) }
  
  getLeft(): number { return this.phaserObject.x }
  getRight(): number { return this.phaserObject.x + this.phaserObject.width }
  getTop(): number { return this.phaserObject.y }
  getBottom(): number { return this.phaserObject.y + this.phaserObject.height }
  
  getCenterX(): number { return this.phaserObject.x + this.phaserObject.width / 2 }
  getCenterY(): number { return this.phaserObject.y + this.phaserObject.height / 2 }
  getCenter(): { x: number; y: number } { return { x: this.getCenterX(), y: this.getCenterY() } }
  
  containsPoint(x: number, y: number): boolean {
    return x >= this.getLeft() && x <= this.getRight() && 
           y >= this.getTop() && y <= this.getBottom()
  }
  
  intersects(bounds: IBounds): boolean {
    return !(bounds.x > this.getRight() || 
             bounds.x + bounds.width < this.getLeft() || 
             bounds.y > this.getBottom() || 
             bounds.y + bounds.height < this.getTop())
  }
  
  getIntersection(bounds: IBounds): IBounds | null {
    if (!this.intersects(bounds)) return null
    
    const left = Math.max(this.getLeft(), bounds.x)
    const right = Math.min(this.getRight(), bounds.x + bounds.width)
    const top = Math.max(this.getTop(), bounds.y)
    const bottom = Math.min(this.getBottom(), bounds.y + bounds.height)
    
    return {
      x: left,
      y: top,
      width: right - left,
      height: bottom - top
    }
  }
  
  expand(amount: number): void {
    this.phaserObject.setSize(
      this.phaserObject.width + amount * 2,
      this.phaserObject.height + amount * 2
    )
    this.phaserObject.setPosition(
      this.phaserObject.x - amount,
      this.phaserObject.y - amount
    )
  }
  
  contract(amount: number): void {
    this.expand(-amount)
  }
  
  moveBy(offsetX: number, offsetY: number): void {
    this.phaserObject.setPosition(
      this.phaserObject.x + offsetX,
      this.phaserObject.y + offsetY
    )
  }
  
  resizeBy(widthDelta: number, heightDelta: number): void {
    this.phaserObject.setSize(
      this.phaserObject.width + widthDelta,
      this.phaserObject.height + heightDelta
    )
  }
  
  fitWithin(bounds: IBounds): void {
    const currentBounds = this.getBounds()
    const scaleX = bounds.width / currentBounds.width
    const scaleY = bounds.height / currentBounds.height
    const scale = Math.min(scaleX, scaleY)
    
    if (scale < 1) {
      this.setScale({ x: scale, y: scale })
      this.setPosition(bounds.x, bounds.y)
    }
  }
  
  alignTo(bounds: IBounds, alignment: IBoundAlignment): void {
    const currentBounds = this.getBounds()
    let x = bounds.x
    let y = bounds.y
    
    switch (alignment.horizontal) {
      case 'center':
        x = bounds.x + (bounds.width - currentBounds.width) / 2
        break
      case 'right':
        x = bounds.x + bounds.width - currentBounds.width
        break
    }
    
    switch (alignment.vertical) {
      case 'center':
        y = bounds.y + (bounds.height - currentBounds.height) / 2
        break
      case 'bottom':
        y = bounds.y + bounds.height - currentBounds.height
        break
    }
    
    this.setPosition(x, y)
  }
  

  
  // ===== CHILDREN MANAGEMENT METHODS =====
  
  addChild(child: IGameObject): void {
    if (this.children.length >= this.constraints.maxChildren) {
      throw new Error(`Cannot add child: maximum children limit (${this.constraints.maxChildren}) reached`)
    }
    
    this.children.push(child)
    // Add to Phaser container if it has a phaserObject
    if ('phaserObject' in child) {
      this.phaserObject.add(child.phaserObject)
    }
  }
  
  addChildren(children: IGameObject[]): void {
    children.forEach(child => this.addChild(child))
  }
  
  removeChild(child: IGameObject): void {
    const index = this.children.indexOf(child)
    if (index > -1) {
      this.children.splice(index, 1)
      // Remove from Phaser container if it has a phaserObject
      if ('phaserObject' in child) {
        this.phaserObject.remove(child.phaserObject)
      }
    }
  }
  
  removeChildById(childId: string): void {
    const child = this.getChildById(childId)
    if (child) {
      this.removeChild(child)
    }
  }
  
  removeAllChildren(): void {
    this.children.forEach(child => {
      if ('phaserObject' in child) {
        this.phaserObject.remove(child.phaserObject)
      }
    })
    this.children.length = 0
  }
  
  getChildById(childId: string): IGameObject | undefined {
    return this.children.find(child => child.id === childId)
  }
  
  getChildAt(index: number): IGameObject | undefined {
    return this.children[index]
  }
  
  getChildIndex(child: IGameObject): number {
    return this.children.indexOf(child)
  }
  
  hasChild(child: IGameObject): boolean {
    return this.children.includes(child)
  }
  
  hasChildById(childId: string): boolean {
    return this.children.some(child => child.id === childId)
  }
  
  getChildrenByType<T extends IGameObject>(type: string): T[] {
    return this.children.filter(child => 
      'type' in child && child.type === type
    ) as T[]
  }
  
  getChildrenByTag(tag: string): IGameObject[] {
    return this.children.filter(child => 
      'tags' in child && Array.isArray(child.tags) && (child.tags as string[]).includes(tag)
    )
  }
  
  findChildren(property: string, value: any): IGameObject[] {
    return this.children.filter(child => 
      property in child && (child as any)[property] === value
    )
  }
  
  sortChildren(property: string, ascending: boolean = true): void {
    this.children.sort((a, b) => {
      const aVal = (a as any)[property]
      const bVal = (b as any)[property]
      return ascending ? aVal - bVal : bVal - aVal
    })
  }
  
  reverseChildren(): void {
    this.children.reverse()
  }
  
  moveChild(child: IGameObject, newIndex: number): void {
    const currentIndex = this.getChildIndex(child)
    if (currentIndex > -1 && newIndex >= 0 && newIndex < this.children.length) {
      this.children.splice(currentIndex, 1)
      this.children.splice(newIndex, 0, child)
    }
  }
  
  swapChildren(child1: IGameObject, child2: IGameObject): void {
    const index1 = this.getChildIndex(child1)
    const index2 = this.getChildIndex(child2)
    if (index1 > -1 && index2 > -1) {
      [this.children[index1], this.children[index2]] = [this.children[index2], this.children[index1]]
    }
  }
  
  bringChildToFront(child: IGameObject): void {
    this.removeChild(child)
    this.addChild(child)
  }
  
  sendChildToBack(child: IGameObject): void {
    const index = this.getChildIndex(child)
    if (index > -1) {
      this.children.splice(index, 1)
      this.children.unshift(child)
    }
  }
  
  bringChildForward(child: IGameObject): void {
    const index = this.getChildIndex(child)
    if (index > -1 && index < this.children.length - 1) {
      this.moveChild(child, index + 1)
    }
  }
  
  sendChildBackward(child: IGameObject): void {
    const index = this.getChildIndex(child)
    if (index > 0) {
      this.moveChild(child, index - 1)
    }
  }
  
  // ===== LAYOUT METHODS =====
  
  calculateLayout(): void {
    // Default implementation - can be overridden by layout classes
    this.arrangeLayout(this.phaserObject.width, this.phaserObject.height)
  }
  
  measureLayout(): { width: number; height: number } {
    // Default implementation - can be overridden by layout classes
    return { width: this.phaserObject.width, height: this.phaserObject.height }
  }
  
  arrangeLayout(_availableWidth: number, _availableHeight: number): void {
    // Default implementation - can be overridden by layout classes
    // This would implement the specific layout logic
  }
  
  getLayoutBounds(): IBounds {
    return this.getBounds()
  }
  
  needsLayoutRecalculation(): boolean {
    return false // Default implementation
  }
  
  invalidateLayout(): void {
    // Default implementation
  }
  
  forceLayoutRecalculation(): void {
    this.calculateLayout()
  }
  
  getLayoutInfo(): {
    totalWidth: number
    totalHeight: number
    contentWidth: number
    contentHeight: number
    paddingWidth: number
    paddingHeight: number
    marginWidth: number
    marginHeight: number
  } {
    const margin = this.spacing.margin
    const padding = this.spacing.padding
    
    return {
      totalWidth: this.phaserObject.width + margin.left + margin.right,
      totalHeight: this.phaserObject.height + margin.top + margin.bottom,
      contentWidth: this.phaserObject.width - padding.left - padding.right,
      contentHeight: this.phaserObject.height - padding.top - padding.bottom,
      paddingWidth: padding.left + padding.right,
      paddingHeight: padding.top + padding.bottom,
      marginWidth: margin.left + margin.right,
      marginHeight: margin.top + margin.bottom
    }
  }
  
  // ===== CONTAINER SPECIFIC METHODS =====
  
  setContainerType(type: IContainer['containerType']): void {
    (this as any).containerType = type
  }
  
  setLayoutDirection(direction: IContainer['layoutDirection']): void {
    (this as any).layoutDirection = direction
  }
  
  setLayoutAlignment(alignment: Partial<IContainer['layoutAlignment']>): void {
    Object.assign((this as any).layoutAlignment, alignment)
  }
  
  setSpacing(spacing: Partial<IContainer['spacing']>): void {
    Object.assign((this as any).spacing, spacing)
  }
  
  setConstraints(constraints: Partial<IContainer['constraints']>): void {
    Object.assign((this as any).constraints, constraints)
  }
  
  setBackground(background: Partial<IContainer['background']>): void {
    Object.assign((this as any).background, background)
    this.setupBackground()
  }
  
  setBorder(border: Partial<IContainer['border']>): void {
    Object.assign((this as any).border, border)
    this.setupBorder()
  }
  
  setShadow(shadow: Partial<IContainer['shadow']>): void {
    Object.assign((this as any).shadow, shadow)
    this.setupShadow()
  }
  
  showBackground(): void { /* Implementation */ }
  hideBackground(): void { /* Implementation */ }
  showBorder(): void { /* Implementation */ }
  hideBorder(): void { /* Implementation */ }
  showShadow(): void { /* Implementation */ }
  hideShadow(): void { /* Implementation */ }
  
  // ===== HIERARCHY METHODS =====
  
  getDepth(): number {
    let depth = 0
    let current = this.parent
    while (current) {
      depth++
      current = current.parent
    }
    return depth
  }
  
  getPath(): string[] {
    const path: string[] = [this.id]
    let current = this.parent
    while (current) {
      path.unshift(current.id)
      current = current.parent
    }
    return path
  }
  
  isDescendantOf(ancestor: IContainer): boolean {
    let current = this.parent
    while (current) {
      if (current === ancestor) return true
      current = current.parent
    }
    return false
  }
  
  isAncestorOf(descendant: IContainer): boolean {
    return descendant.isDescendantOf(this)
  }
  
  getDescendants(): IGameObject[] {
    const descendants: IGameObject[] = []
    this.children.forEach(child => {
      descendants.push(child)
      if ('getDescendants' in child) {
        descendants.push(...(child as any).getDescendants())
      }
    })
    return descendants
  }
  
  getAncestors(): IContainer[] {
    const ancestors: IContainer[] = []
    let current = this.parent
    while (current) {
      ancestors.push(current)
      current = current.parent
    }
    return ancestors
  }
  
  getSiblings(): IContainer[] {
    if (!this.parent) return []
    return this.parent.children.filter(child => 
      'containerType' in child && child !== this
    ) as IContainer[]
  }
  
  getRoot(): IContainer {
    let current: IContainer = this
    while (current.parent) {
      current = current.parent
    }
    return current
  }
  
  findContainerByPath(path: string[]): IContainer | undefined {
    if (path.length === 0) return undefined
    if (path[0] === this.id) {
      if (path.length === 1) return this
      // Continue searching in children
      for (const child of this.children) {
        if ('findContainerByPath' in child) {
          const found = (child as any).findContainerByPath(path.slice(1))
          if (found) return found
        }
      }
    }
    return undefined
  }
  
  getSubtree(): IGameObject[] {
    return [this, ...this.getDescendants()]
  }
  
  // ===== RESPONSIVE METHODS =====
  
  resize(width: number, height: number): void {
    // Handle responsive behavior first
    this.handleResponsiveResize(width, height)
    
    // Set size and calculate layout
    this.setWidth(width)
    this.setHeight(height)
    this.calculateLayout()
  }
  
  resizeMaintainingAspectRatio(width: number, height: number): void {
    if (this.constraints.maintainAspectRatio) {
      const aspectRatio = this.phaserObject.width / this.phaserObject.height
      if (width / height > aspectRatio) {
        height = width / aspectRatio
      } else {
        width = height * aspectRatio
      }
    }
    this.resize(width, height)
  }
  
  getResponsiveConfig(): any {
    // Default implementation - can be overridden
    return {}
  }
  
  applyResponsiveConfig(_config: any): void {
    // Default implementation - can be overridden
  }
  
  updateResponsive(): void {
    // Default implementation - can be overridden
  }
  

  
  // ===== UTILITY METHODS =====
  
  cloneWithChildren(): IContainer {
    // Implementation for cloning with children
    return this.cloneWithoutChildren()
  }
  
  cloneWithoutChildren(): IContainer {
    // Implementation for cloning without children
    return this
  }
  
  toJSON(): string {
    return JSON.stringify({
      id: this.id,
      type: 'container',
      containerType: this.containerType,
      layoutDirection: this.layoutDirection,
      layoutAlignment: this.layoutAlignment,
      spacing: this.spacing,
      constraints: this.constraints,
      background: this.background,
      border: this.border,
      shadow: this.shadow,
      bounds: this.getBounds(),
      scale: this.getScale(),
      childCount: this.childCount
    })
  }
  
  fromJSON(_json: string): void {
    // Implementation for loading from JSON
    // const data = JSON.parse(_json) // Will be used in future implementation
  }
  
  validate(): string[] {
    const errors: string[] = []
    
    if (!this.id) errors.push('Container must have an ID')
    if (this.childCount > this.constraints.maxChildren) {
      errors.push(`Container has too many children: ${this.childCount} > ${this.constraints.maxChildren}`)
    }
    
    return errors
  }
  
  getSummary(): {
    id: string
    type: string
    childCount: number
    bounds: IBounds
    scale: IScale
    containerType: string
    layoutDirection: string
    hasBackground: boolean
    hasBorder: boolean
    hasShadow: boolean
  } {
    return {
      id: this.id,
      type: 'container',
      childCount: this.childCount,
      bounds: this.getBounds(),
      scale: this.getScale(),
      containerType: this.containerType,
      layoutDirection: this.layoutDirection,
      hasBackground: !!this.background.color || !!this.background.image,
      hasBorder: this.border.width > 0,
      hasShadow: this.shadow.enabled
    }
  }
  
  // ===== SCALABLEGAMEOBJECT ABSTRACT METHOD IMPLEMENTATIONS =====
  
  /**
   * Handle responsive behavior changes
   */
  protected onResponsiveBehaviorChanged(oldBehavior: any, newBehavior: any): void {
    this.logger.debug('Container', 'Responsive behavior changed', {
      objectId: this.id,
      oldBehavior,
      newBehavior
    })
    
    // Handle container-specific responsive behavior changes
    if (newBehavior.deviceType !== oldBehavior.deviceType) {
      // Device type changed, update container layout if needed
      this.updateLayoutForDeviceType(newBehavior.deviceType)
    }
  }
  
  /**
   * Handle responsive layout changes
   */
  protected onResponsiveLayoutChanged(_oldLayout: any, newLayout: any): void {
    // Use actual current dimensions from phaserObject instead of the passed oldLayout
    const currentDimensions = {
      width: this.phaserObject.width,
      height: this.phaserObject.height
    }
    
    this.logger.debug('Container', 'Responsive layout changed', {
      objectId: this.id,
      oldLayout: currentDimensions,
      newLayout
    })
    
    // Handle container-specific layout changes
    this.updateLayoutForNewDimensions(newLayout.width, newLayout.height)
  }
  
  /**
   * Update container layout for new device type
   */
  private updateLayoutForDeviceType(deviceType: 'desktop' | 'mobile'): void {
    // Update container layout based on device type
    if (deviceType === 'mobile') {
      // Mobile-specific layout adjustments
      this.updateMobileLayout()
    } else {
      // Desktop-specific layout adjustments
      this.updateDesktopLayout()
    }
  }
  
  /**
   * Update container layout for new dimensions
   */
  private updateLayoutForNewDimensions(width: number, height: number): void {
    // Update container size and position
    this.setSize(width, height)
    
    // Update children layout
    this.updateChildrenLayout()
  }
  
  /**
   * Update mobile layout
   */
  private updateMobileLayout(): void {
    // Mobile-specific layout logic
    // This can be overridden by concrete containers
  }
  
  /**
   * Update desktop layout
   */
  private updateDesktopLayout(): void {
    // Desktop-specific layout logic
    // This can be overridden by concrete containers
  }
  
  /**
   * Update children layout
   */
  private updateChildrenLayout(): void {
    // Loop through children and call their resize method
    for (const child of this.children) {
      // Check if child is a ScalableGameObject (has responsive behavior)
      if ('handleResponsiveResize' in child && typeof (child as any).handleResponsiveResize === 'function') {
        try {
          // Call the child's responsive resize method
          (child as any).handleResponsiveResize(this.phaserObject.width, this.phaserObject.height)
        } catch (error) {
          this.logger.warn('Container', `Error resizing child ${child.id}:`, error, 'updateChildrenLayout')
        }
      }
      // For regular game objects, just update their position/size if they have those methods
      else if ('setPosition' in child && 'setSize' in child) {
        try {
          (child as any).setPosition(this.phaserObject.x, this.phaserObject.y)
          (child as any).setSize(this.phaserObject.width, this.phaserObject.height)
        } catch (error) {
          this.logger.warn('Container', `Error updating child ${child.id}:`, error, 'updateChildrenLayout')
        }
      }
    }
  }
  
  // ===== SCALABLEGAMEOBJECT ABSTRACT METHOD IMPLEMENTATIONS =====
  
  // IGameObject abstract properties
  get isVisible(): boolean { return this.phaserObject.visible }
  get isInteractive(): boolean { return this.phaserObject.input?.enabled || false }
  get active(): boolean { return this.phaserObject.active }
  get input(): any { return this.phaserObject.input }
  get body(): any { return (this.phaserObject as any).body }
  get bounds(): any { return this.getBounds() }
  
  // IGameObject abstract methods
  initialize(): void { /* Default implementation */ }
  update(time: number, delta: number): void { 
    this.children.forEach(child => {
      if ('update' in child) {
        (child as any).update(time, delta)
      }
    })
  }
  activate(): void { this.phaserObject.setActive(true) }
  deactivate(): void { this.phaserObject.setActive(false) }
  destroy(): void { 
    this.removeAllChildren()
    this.phaserObject.destroy()
  }
  setActive(value: boolean): void { this.phaserObject.setActive(value) }
  setVisible(value: boolean): void { this.phaserObject.setVisible(value) }
  setInteractive(value: boolean): void { 
    if (value) this.phaserObject.setInteractive()
    else this.phaserObject.disableInteractive()
  }
  setPosition(x: number, y: number): void { this.phaserObject.setPosition(x, y) }
  setSize(width: number, height: number): void { this.phaserObject.setSize(width, height) }
  setAlpha(value: number): void { this.phaserObject.setAlpha(value) }
  setRotation(value: number): void { this.phaserObject.setRotation(value) }
  show(): void { this.phaserObject.setVisible(true) }
  hide(): void { this.phaserObject.setVisible(false) }
  clone(): any { return this.cloneWithoutChildren() }
  
  // IScalable abstract methods
  getScale(): any { return { x: this.phaserObject.scaleX, y: this.phaserObject.scaleY } }
  setScale(scale: any): void { 
    if (typeof scale === 'number') {
      this.phaserObject.setScale(scale)
    } else if (scale && typeof scale === 'object' && 'x' in scale && 'y' in scale) {
      this.phaserObject.setScale(scale.x, scale.y)
    }
  }
  getScaleX(): number { return this.phaserObject.scaleX }
  getScaleY(): number { return this.phaserObject.scaleY }
  setScaleX(scale: number): void { this.phaserObject.setScale(scale, this.phaserObject.scaleY) }
  setScaleY(scale: number): void { this.phaserObject.setScale(this.phaserObject.scaleX, scale) }
  setScaleXAndY(scaleX: number, scaleY: number): void { this.phaserObject.setScale(scaleX, scaleY) }
  setUniformScale(scale: number): void { this.phaserObject.setScale(scale) }
  scaleBy(scale: number): void { 
    this.phaserObject.setScale(
      this.phaserObject.scaleX * scale,
      this.phaserObject.scaleY * scale
    )
  }
  scaleByXY(scaleX: number, scaleY: number): void { 
    this.phaserObject.setScale(
      this.phaserObject.scaleX * scaleX,
      this.phaserObject.scaleY * scaleY
    )
  }
  resetScale(): void { this.phaserObject.setScale(1) }
  getScaledBounds(): any { return this.getBounds() }
  getScaledSize(): any { return { width: this.phaserObject.width, height: this.phaserObject.height } }
  isScaled(): boolean { return this.phaserObject.scaleX !== 1 || this.phaserObject.scaleY !== 1 }
  hasUniformScale(): boolean { return this.phaserObject.scaleX === this.phaserObject.scaleY }
  getScaleFactor(): number { return Math.max(this.phaserObject.scaleX, this.phaserObject.scaleY) }
  getScaleRatio(): number { return this.phaserObject.scaleX / this.phaserObject.scaleY }
  applyScale(scale: number): void { this.phaserObject.setScale(scale) }
  normalizeScale(): void { this.phaserObject.setScale(1) }
  getScaleToFit(bounds: any, maintainAspectRatio?: boolean): any { 
    const currentBounds = this.getBounds()
    const scaleX = bounds.width / currentBounds.width
    const scaleY = bounds.height / currentBounds.height
    if (maintainAspectRatio) {
      const scale = Math.min(scaleX, scaleY)
      return { x: scale, y: scale }
    }
    return { x: scaleX, y: scaleY }
  }
  getScaleToFill(bounds: any, maintainAspectRatio?: boolean): any { 
    const currentBounds = this.getBounds()
    const scaleX = bounds.width / currentBounds.width
    const scaleY = bounds.height / currentBounds.height
    if (maintainAspectRatio) {
      const scale = Math.max(scaleX, scaleY)
      return { x: scale, y: scale }
    }
    return { x: scaleX, y: scaleY }
  }
  scaleToFit(bounds: any, maintainAspectRatio?: boolean): void { 
    const scale = this.getScaleToFit(bounds, maintainAspectRatio)
    this.setScale(scale)
  }
  scaleToFill(bounds: any, maintainAspectRatio?: boolean): void { 
    const scale = this.getScaleToFill(bounds, maintainAspectRatio)
    this.setScale(scale)
  }
  getScaleToFitX(bounds: any): any { return { x: bounds.width / this.phaserObject.width, y: 1 } }
  getScaleToFitY(bounds: any): any { return { x: 1, y: bounds.height / this.phaserObject.height } }
  scaleToFitX(bounds: any): void { this.phaserObject.setScale(bounds.width / this.phaserObject.width, this.phaserObject.scaleY) }
  scaleToFitY(bounds: any): void { this.phaserObject.setScale(this.phaserObject.scaleX, bounds.height / this.phaserObject.height) }
  getScaleToFillX(bounds: any): any { return { x: bounds.width / this.phaserObject.width, y: 1 } }
  getScaleToFillY(bounds: any): any { return { x: 1, y: bounds.height / this.phaserObject.height } }
  scaleToFillX(bounds: any): void { this.phaserObject.setScale(bounds.width / this.phaserObject.width, this.phaserObject.scaleY) }
  scaleToFillY(bounds: any): void { this.phaserObject.setScale(this.phaserObject.scaleX, bounds.height / this.phaserObject.height) }
  animateScale(targetScale: any, duration: number, _ease?: string): void { 
    this.logger.debug('Container', `Animating scale to ${targetScale.x}, ${targetScale.y} over ${duration}ms`)
    this.setScale(targetScale)
  }
  animateScaleBy(scaleDelta: any, duration: number, _ease?: string): void { 
    const currentScale = this.getScale()
    const targetScale = { x: currentScale.x * scaleDelta, y: currentScale.y * scaleDelta }
    this.logger.debug('Container', `Animating scale by factor ${scaleDelta} over ${duration}ms`)
    this.setScale(targetScale)
  }
  getMinScale(): any { return { x: 0.1, y: 0.1 } }
  getMaxScale(): any { return { x: 10, y: 10 } }
  setMinScale(_scale: any): void { /* Implementation */ }
  setMaxScale(_scale: any): void { /* Implementation */ }
  clampScale(scale: any): any { 
    const min = this.getMinScale()
    const max = this.getMaxScale()
    return {
      x: Math.max(min.x, Math.min(max.x, scale.x)),
      y: Math.max(min.y, Math.min(max.y, scale.y))
    }
  }
  getScaleAnimation(): any { return null }
  stopScaleAnimation(): void { /* Implementation */ }
  setScaleConstraints(_constraints: any): void { /* Implementation */ }
  isScaleValid(scale: any): boolean { 
    const min = this.getMinScale()
    const max = this.getMaxScale()
    return scale.x >= min.x && scale.x <= max.x && scale.y >= min.y && scale.y <= max.y
  }
  getScaleOrigin(): any { return { x: 0.5, y: 0.5 } }
  setScaleOrigin(_origin: any): void { /* Implementation */ }
  getScaleCenter(): any { return { x: 0.5, y: 0.5 } }
  setScaleCenter(_center: any): void { /* Implementation */ }
  getScaleMode(): string { return 'uniform' }
  scaleAroundPoint(_point: any, _scale: any): void { /* Implementation */ }
  getScaleMatrix(): any { return [1, 0, 0, 1, 0, 0] }
  applyScaleMatrix(_matrix: any): void { /* Implementation */ }
}
