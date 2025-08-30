import type { IGameObject } from '../base/IGameObject'
import type { IBound } from './IBound'
import type { IScalable } from './IScalable'
import type { IBounds } from './IBound'
import type { IScale } from './IScalable'

/**
 * IContainer Interface
 * Represents a container game object that can hold other game objects as children
 * Inspired by HTML div elements, WPF containers, and XML node structures
 * 
 * The container acts as a Phaser wrapper where:
 * - Container X,Y = Phaser Container X,Y (default)
 * - Container Width,Height = Phaser Container Width,Height (default)
 * - Layout classes can override this logic to control positioning and sizing
 */
export interface IContainer extends IGameObject, IBound, IScalable {
  /** Parent container (null if root) */
  readonly parent: IContainer | null
  
  /** Array of child game objects */
  readonly children: IGameObject[]
  
  /** Number of children */
  readonly childCount: number
  
  /** Whether this container has children */
  readonly hasChildren: boolean
  
  /** Whether this container is empty */
  readonly isEmpty: boolean
  
  /** Container type */
  readonly containerType: 'div' | 'flexbox' | 'grid' | 'stack' | 'dock' | 'flow' | 'absolute'
  
  /** Container layout direction */
  readonly layoutDirection: 'horizontal' | 'vertical' | 'horizontal-reverse' | 'vertical-reverse'
  
  /** Container layout alignment */
  readonly layoutAlignment: {
    /** Main axis alignment */
    mainAxis: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch'
    /** Cross axis alignment */
    crossAxis: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  }
  
  /** Container spacing and gaps */
  readonly spacing: {
    /** Gap between children */
    gap: number
    /** Row gap for grid layouts */
    rowGap: number
    /** Column gap for grid layouts */
    columnGap: number
    /** Margin around the container */
    margin: { top: number; right: number; bottom: number; left: number }
    /** Padding inside the container */
    padding: { top: number; right: number; bottom: number; left: number }
  }
  
  /** Container constraints */
  readonly constraints: {
    /** Maximum number of children allowed */
    maxChildren: number
    /** Whether to auto-size based on content */
    autoSize: boolean
    /** Whether to clip overflow */
    clipOverflow: boolean
    /** Overflow behavior */
    overflow: 'visible' | 'hidden' | 'scroll' | 'auto'
    /** Whether to respect parent bounds */
    respectParentBounds: boolean
    /** Whether to maintain aspect ratio */
    maintainAspectRatio: boolean
  }
  
  /** Container background and styling */
  readonly background: {
    /** Background color */
    color?: string
    /** Background image */
    image?: string
    /** Background opacity */
    opacity?: number
    /** Background tint */
    tint?: string
  }
  
  /** Container border */
  readonly border: {
    /** Border width */
    width: number
    /** Border style */
    style: 'solid' | 'dashed' | 'dotted' | 'none'
    /** Border color */
    color: string
    /** Border radius */
    radius: number
  }
  
  /** Container shadow */
  readonly shadow: {
    /** Whether shadow is enabled */
    enabled: boolean
    /** Shadow color */
    color: string
    /** Shadow blur radius */
    blur: number
    /** Shadow offset X */
    offsetX: number
    /** Shadow offset Y */
    offsetY: number
  }
  
  // ===== CHILDREN MANAGEMENT METHODS =====
  
  /** Add a child to the container */
  addChild(child: IGameObject): void
  
  /** Add multiple children to the container */
  addChildren(children: IGameObject[]): void
  
  /** Remove a child from the container */
  removeChild(child: IGameObject): void
  
  /** Remove child by ID */
  removeChildById(childId: string): void
  
  /** Remove all children */
  removeAllChildren(): void
  
  /** Get child by ID */
  getChildById(childId: string): IGameObject | undefined
  
  /** Get child by index */
  getChildAt(index: number): IGameObject | undefined
  
  /** Get child index */
  getChildIndex(child: IGameObject): number
  
  /** Check if container has specific child */
  hasChild(child: IGameObject): boolean
  
  /** Check if container has child by ID */
  hasChildById(childId: string): boolean
  
  /** Get all children of specific type */
  getChildrenByType<T extends IGameObject>(type: string): T[]
  
  /** Get all children with specific tag */
  getChildrenByTag(tag: string): IGameObject[]
  
  /** Find children by property value */
  findChildren(property: string, value: any): IGameObject[]
  
  /** Sort children by property */
  sortChildren(property: string, ascending?: boolean): void
  
  /** Reverse children order */
  reverseChildren(): void
  
  /** Move child to different position */
  moveChild(child: IGameObject, newIndex: number): void
  
  /** Swap two children */
  swapChildren(child1: IGameObject, child2: IGameObject): void
  
  /** Bring child to front */
  bringChildToFront(child: IGameObject): void
  
  /** Send child to back */
  sendChildToBack(child: IGameObject): void
  
  /** Bring child forward by one position */
  bringChildForward(child: IGameObject): void
  
  /** Send child backward by one position */
  sendChildBackward(child: IGameObject): void
  
  // ===== LAYOUT METHODS =====
  
  /** Calculate layout for all children */
  calculateLayout(): void
  
  /** Measure the size needed for this container */
  measureLayout(): { width: number; height: number }
  
  /** Arrange children within the available space */
  arrangeLayout(availableWidth: number, availableHeight: number): void
  
  /** Get the layout bounds including all children */
  getLayoutBounds(): IBounds
  
  /** Check if layout needs recalculation */
  needsLayoutRecalculation(): boolean
  
  /** Invalidate layout cache */
  invalidateLayout(): void
  
  /** Force layout recalculation */
  forceLayoutRecalculation(): void
  
  /** Get layout information */
  getLayoutInfo(): {
    totalWidth: number
    totalHeight: number
    contentWidth: number
    contentHeight: number
    paddingWidth: number
    paddingHeight: number
    marginWidth: number
    marginHeight: number
  }
  
  // ===== CONTAINER SPECIFIC METHODS =====
  
  /** Set container type */
  setContainerType(type: IContainer['containerType']): void
  
  /** Set layout direction */
  setLayoutDirection(direction: IContainer['layoutDirection']): void
  
  /** Set layout alignment */
  setLayoutAlignment(alignment: Partial<IContainer['layoutAlignment']>): void
  
  /** Set spacing */
  setSpacing(spacing: Partial<IContainer['spacing']>): void
  
  /** Set constraints */
  setConstraints(constraints: Partial<IContainer['constraints']>): void
  
  /** Set background */
  setBackground(background: Partial<IContainer['background']>): void
  
  /** Set border */
  setBorder(border: Partial<IContainer['border']>): void
  
  /** Set shadow */
  setShadow(shadow: Partial<IContainer['shadow']>): void
  
  /** Show container background */
  showBackground(): void
  
  /** Hide container background */
  hideBackground(): void
  
  /** Show container border */
  showBorder(): void
  
  /** Hide container border */
  hideBorder(): void
  
  /** Show container shadow */
  showShadow(): void
  
  /** Hide container shadow */
  hideShadow(): void
  
  // ===== HIERARCHY METHODS =====
  
  /** Get the depth of this container in the hierarchy */
  getDepth(): number
  
  /** Get the path from root to this container */
  getPath(): string[]
  
  /** Check if this container is descendant of another */
  isDescendantOf(ancestor: IContainer): boolean
  
  /** Check if this container is ancestor of another */
  isAncestorOf(descendant: IContainer): boolean
  
  /** Get all descendants */
  getDescendants(): IGameObject[]
  
  /** Get all ancestors */
  getAncestors(): IContainer[]
  
  /** Get siblings (containers with same parent) */
  getSiblings(): IContainer[]
  
  /** Get root container */
  getRoot(): IContainer
  
  /** Find container by path */
  findContainerByPath(path: string[]): IContainer | undefined
  
  /** Get container subtree */
  getSubtree(): IGameObject[]
  
  // ===== RESPONSIVE METHODS =====
  
  /** Resize method for responsive logic */
  resize(width: number, height: number): void
  
  /** Resize method that maintains aspect ratio */
  resizeMaintainingAspectRatio(width: number, height: number): void
  
  /** Get responsive configuration */
  getResponsiveConfig(): any
  
  /** Apply responsive configuration */
  applyResponsiveConfig(config: any): void
  
  /** Update responsive behavior */
  updateResponsive(): void
  
  // ===== UTILITY METHODS =====
  
  /** Clone the container with all children */
  cloneWithChildren(): IContainer
  
  /** Clone the container without children */
  cloneWithoutChildren(): IContainer
  
  /** Export container to JSON */
  toJSON(): string
  
  /** Import container from JSON */
  fromJSON(json: string): void
  
  /** Validate container configuration */
  validate(): string[]
  
  /** Get container summary */
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
  }
}
