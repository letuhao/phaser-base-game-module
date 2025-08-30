import type { IBounds } from './IBound'

/**
 * ILayoutable Interface
 * Provides layout-specific functionality for containers
 * Inspired by CSS layout systems (Flexbox, Grid) and WPF layout controls
 */
export interface ILayoutable {
  /** Layout type */
  readonly layoutType: 'none' | 'flexbox' | 'grid' | 'stack' | 'dock' | 'flow' | 'absolute'
  
  /** Layout direction */
  readonly layoutDirection: 'horizontal' | 'vertical' | 'horizontal-reverse' | 'vertical-reverse'
  
  /** Layout alignment */
  readonly layoutAlignment: {
    /** Main axis alignment */
    mainAxis: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch'
    /** Cross axis alignment */
    crossAxis: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
    /** Content alignment */
    content: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
  }
  
  /** Layout spacing */
  readonly layoutSpacing: {
    /** Gap between items */
    gap: number
    /** Row gap for grid layouts */
    rowGap: number
    /** Column gap for grid layouts */
    columnGap: number
    /** Margin around the layout */
    margin: { top: number; right: number; bottom: number; left: number }
    /** Padding inside the layout */
    padding: { top: number; right: number; bottom: number; left: number }
  }
  
  /** Layout constraints */
  readonly layoutConstraints: {
    /** Maximum number of items */
    maxItems: number
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
  
  /** Layout state */
  readonly layoutState: {
    /** Whether layout is dirty and needs recalculation */
    isDirty: boolean
    /** Whether layout is currently calculating */
    isCalculating: boolean
    /** Last layout calculation time */
    lastCalculationTime: number
    /** Layout calculation duration */
    calculationDuration: number
  }
  
  // ===== LAYOUT CALCULATION METHODS =====
  
  /** Calculate layout for all items */
  calculateLayout(): void
  
  /** Measure the size needed for this layout */
  measureLayout(): { width: number; height: number }
  
  /** Arrange items within the available space */
  arrangeLayout(availableWidth: number, availableHeight: number): void
  
  /** Get the layout bounds including all items */
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
    itemCount: number
    layoutType: string
    layoutDirection: string
  }
  
  // ===== LAYOUT TYPE SPECIFIC METHODS =====
  
  /** Flexbox specific methods */
  flexbox?: {
    /** Set flex grow for specific item */
    setFlexGrow(itemId: string, grow: number): void
    
    /** Set flex shrink for specific item */
    setFlexShrink(itemId: string, shrink: number): void
    
    /** Set flex basis for specific item */
    setFlexBasis(itemId: string, basis: number | 'auto' | 'content'): void
    
    /** Set flex order for specific item */
    setFlexOrder(itemId: string, order: number): void
    
    /** Set flex wrap */
    setFlexWrap(wrap: 'nowrap' | 'wrap' | 'wrap-reverse'): void
    
    /** Set align self for specific item */
    setAlignSelf(itemId: string, align: 'auto' | 'start' | 'center' | 'end' | 'stretch' | 'baseline'): void
  }
  
  /** Grid specific methods */
  grid?: {
    /** Set grid template columns */
    setGridTemplateColumns(columns: string[]): void
    
    /** Set grid template rows */
    setGridTemplateRows(rows: string[]): void
    
    /** Set grid area for specific item */
    setGridArea(itemId: string, area: string): void
    
    /** Set grid column for specific item */
    setGridColumn(itemId: string, start: number | string, end?: number | string): void
    
    /** Set grid row for specific item */
    setGridRow(itemId: string, start: number | string, end?: number | string): void
    
    /** Set justify self for specific item */
    setJustifySelf(itemId: string, justify: 'start' | 'center' | 'end' | 'stretch'): void
    
    /** Set align self for specific item */
    setAlignSelf(itemId: string, align: 'start' | 'center' | 'end' | 'stretch' | 'baseline'): void
  }
  
  /** Stack specific methods */
  stack?: {
    /** Set stack orientation */
    setStackOrientation(orientation: 'horizontal' | 'vertical'): void
    
    /** Set stack spacing */
    setStackSpacing(spacing: number): void
    
    /** Set stack reverse */
    setStackReverse(reverse: boolean): void
    
    /** Set stack alignment */
    setStackAlignment(alignment: 'start' | 'center' | 'end' | 'stretch'): void
  }
  
  /** Dock specific methods */
  dock?: {
    /** Set dock position for specific item */
    setDockPosition(itemId: string, position: 'top' | 'bottom' | 'left' | 'right' | 'fill'): void
    
    /** Set dock margin for specific item */
    setDockMargin(itemId: string, margin: number): void
    
    /** Set whether item fills remaining space */
    setFillRemaining(itemId: string, fill: boolean): void
  }
  
  /** Flow specific methods */
  flow?: {
    /** Set flow direction */
    setFlowDirection(direction: 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top'): void
    
    /** Set line wrapping */
    setLineWrapping(wrap: 'wrap' | 'nowrap'): void
    
    /** Set line alignment */
    setLineAlignment(alignment: 'start' | 'center' | 'end' | 'justify'): void
    
    /** Set item spacing */
    setItemSpacing(spacing: number): void
    
    /** Set line spacing */
    setLineSpacing(spacing: number): void
  }
  
  // ===== LAYOUT SETTING METHODS =====
  
  /** Set layout type */
  setLayoutType(type: ILayoutable['layoutType']): void
  
  /** Set layout direction */
  setLayoutDirection(direction: ILayoutable['layoutDirection']): void
  
  /** Set layout alignment */
  setLayoutAlignment(alignment: Partial<ILayoutable['layoutAlignment']>): void
  
  /** Set layout spacing */
  setLayoutSpacing(spacing: Partial<ILayoutable['layoutSpacing']>): void
  
  /** Set layout constraints */
  setLayoutConstraints(constraints: Partial<ILayoutable['layoutConstraints']>): void
  
  // ===== LAYOUT EVENTS =====
  
  /** Layout events */
  readonly layoutEvents: {
    /** Fired when layout calculation starts */
    onLayoutCalculationStart: (() => void)[]
    /** Fired when layout calculation completes */
    onLayoutCalculationComplete: (() => void)[]
    /** Fired when layout is invalidated */
    onLayoutInvalidated: (() => void)[]
    /** Fired when layout bounds change */
    onLayoutBoundsChanged: ((oldBounds: IBounds, newBounds: IBounds) => void)[]
  }
  
  // ===== LAYOUT UTILITIES =====
  
  /** Get layout performance metrics */
  getLayoutPerformanceMetrics(): {
    calculationCount: number
    averageCalculationTime: number
    totalCalculationTime: number
    lastCalculationTime: number
    dirtyCount: number
  }
  
  /** Reset layout performance metrics */
  resetLayoutPerformanceMetrics(): void
  
  /** Enable/disable layout debugging */
  setLayoutDebugging(enabled: boolean): void
  
  /** Get layout debug information */
  getLayoutDebugInfo(): {
    layoutType: string
    layoutDirection: string
    itemCount: number
    isDirty: boolean
    isCalculating: boolean
    bounds: IBounds
    constraints: any
  }
}
