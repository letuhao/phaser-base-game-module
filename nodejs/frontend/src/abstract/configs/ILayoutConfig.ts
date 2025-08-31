import type { IPositionConfig } from './IPositionConfig';

/**
 * Layout configuration interface for game object layout management
 * Extends IPositionConfig to provide layout-specific functionality
 * Inspired by HTML/CSS Flexbox, Grid, WinForms, and WPF layout systems
 */
export interface ILayoutConfig extends IPositionConfig {
  /** Layout type */
  readonly layoutType: 'none' | 'flexbox' | 'grid' | 'stack' | 'dock' | 'flow' | 'absolute';

  /** Layout direction for flexbox and stack layouts */
  readonly layoutDirection: 'horizontal' | 'vertical' | 'horizontal-reverse' | 'vertical-reverse';

  /** Layout alignment and distribution */
  readonly layoutAlignment: {
    /** Main axis alignment (for flexbox: flex-start, center, flex-end, space-between, space-around, space-evenly) */
    mainAxis:
      | 'start'
      | 'center'
      | 'end'
      | 'space-between'
      | 'space-around'
      | 'space-evenly'
      | 'stretch';
    /** Cross axis alignment (for flexbox: flex-start, center, flex-end, stretch, baseline) */
    crossAxis: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
    /** Content alignment within the container */
    content: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly';
  };

  /** Flexbox specific properties */
  readonly flexbox: {
    /** Flex grow factor */
    flexGrow: number;
    /** Flex shrink factor */
    flexShrink: number;
    /** Flex basis (initial size) */
    flexBasis: number | 'auto' | 'content';
    /** Flex order for reordering */
    order: number;
    /** Whether to wrap flex items */
    flexWrap: 'nowrap' | 'wrap' | 'wrap-reverse';
    /** Align individual flex items */
    alignSelf: 'auto' | 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  };

  /** Grid specific properties */
  readonly grid: {
    /** Grid column start position */
    gridColumnStart: number | string;
    /** Grid column end position */
    gridColumnEnd: number | string;
    /** Grid row start position */
    gridRowStart: number | string;
    /** Grid row end position */
    gridRowEnd: number | string;
    /** Grid area name */
    gridArea: string;
    /** Justify self alignment within grid cell */
    justifySelf: 'start' | 'center' | 'end' | 'stretch';
    /** Align self alignment within grid cell */
    alignSelf: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  };

  /** Stack layout properties */
  readonly stack: {
    /** Stack orientation */
    orientation: 'horizontal' | 'vertical';
    /** Spacing between stack items */
    spacing: number;
    /** Whether to reverse the stack order */
    reverse: boolean;
    /** Stack alignment */
    alignment: 'start' | 'center' | 'end' | 'stretch';
  };

  /** Dock layout properties (like WPF DockPanel) */
  readonly dock: {
    /** Dock position */
    dockPosition: 'top' | 'bottom' | 'left' | 'right' | 'fill';
    /** Dock margin */
    dockMargin: number;
    /** Whether to fill remaining space */
    fillRemaining: boolean;
  };

  /** Flow layout properties */
  readonly flow: {
    /** Flow direction */
    flowDirection: 'left-to-right' | 'right-to-left' | 'top-to-bottom' | 'bottom-to-top';
    /** Line wrapping behavior */
    wrap: 'wrap' | 'nowrap';
    /** Line alignment */
    lineAlignment: 'start' | 'center' | 'end' | 'justify';
    /** Spacing between items */
    itemSpacing: number;
    /** Spacing between lines */
    lineSpacing: number;
  };

  /** Container properties */
  readonly container: {
    /** Whether this element acts as a container */
    isContainer: boolean;
    /** Container type */
    containerType: 'flex' | 'grid' | 'stack' | 'dock' | 'flow' | 'absolute';
    /** Container constraints */
    constraints: {
      /** Maximum number of children */
      maxChildren: number;
      /** Whether to auto-size based on content */
      autoSize: boolean;
      /** Whether to clip overflow */
      clipOverflow: boolean;
      /** Overflow behavior */
      overflow: 'visible' | 'hidden' | 'scroll' | 'auto';
    };
  };

  /** Spacing and gaps */
  readonly spacing: {
    /** Gap between child elements */
    gap: number;
    /** Row gap for grid layouts */
    rowGap: number;
    /** Column gap for grid layouts */
    columnGap: number;
    /** Margin around the entire layout */
    margin: number;
    /** Padding inside the layout container */
    padding: number;
  };

  /** Responsive layout rules */
  readonly responsiveLayout: {
    /** Breakpoint-specific layout changes */
    breakpoints: {
      [breakpoint: string]: {
        layoutType?: 'none' | 'flexbox' | 'grid' | 'stack' | 'dock' | 'flow' | 'absolute';
        layoutDirection?: 'horizontal' | 'vertical' | 'horizontal-reverse' | 'vertical-reverse';
        flexbox?: Partial<ILayoutConfig['flexbox']>;
        grid?: Partial<ILayoutConfig['grid']>;
        stack?: Partial<ILayoutConfig['stack']>;
        dock?: Partial<ILayoutConfig['dock']>;
        flow?: Partial<ILayoutConfig['flow']>;
        spacing?: Partial<ILayoutConfig['spacing']>;
      };
    };
  };

  /** Layout calculation methods */
  readonly layoutMethods: {
    /** Calculate layout for all children */
    calculateLayout(): void;
    /** Measure the size needed for this layout */
    measureLayout(): { width: number; height: number };
    /** Arrange children within the available space */
    arrangeLayout(availableWidth: number, availableHeight: number): void;
    /** Get the layout bounds including all children */
    getLayoutBounds(): { x: number; y: number; width: number; height: number };
    /** Check if layout needs recalculation */
    needsLayoutRecalculation(): boolean;
    /** Invalidate layout cache */
    invalidateLayout(): void;
  };

  /** Child management */
  readonly childManagement: {
    /** Add child to layout */
    addChild(child: ILayoutConfig): void;
    /** Remove child from layout */
    removeChild(child: ILayoutConfig): void;
    /** Get all children */
    getChildren(): ILayoutConfig[];
    /** Get child at specific index */
    getChildAt(index: number): ILayoutConfig | undefined;
    /** Get child count */
    getChildCount(): number;
    /** Clear all children */
    clearChildren(): void;
  };

  /** Layout events */
  readonly layoutEvents: {
    /** Fired when layout changes */
    onLayoutChanged: (() => void)[];
    /** Fired when children are added/removed */
    onChildrenChanged: (() => void)[];
    /** Fired when layout is invalidated */
    onLayoutInvalidated: (() => void)[];
  };
}
