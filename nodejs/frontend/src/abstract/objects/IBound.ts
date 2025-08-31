/**
 * IBound Interface
 * Provides methods to get and set the bounds (X, Y, Width, Height) of a game object
 * Inspired by HTML/CSS bounding box concepts and DOM element positioning
 */
export interface IBound {
  /** Get the current bounds of the object */
  getBounds(): IBounds;

  /** Set the bounds of the object */
  setBounds(bounds: IBounds): void;

  /** Get the X position */
  getX(): number;

  /** Get the Y position */
  getY(): number;

  /** Get the width */
  getWidth(): number;

  /** Get the height */
  getHeight(): number;

  /** Set the X position */
  setX(x: number): void;

  /** Set the Y position */
  setY(y: number): void;

  /** Set the width */
  setWidth(width: number): void;

  /** Set the height */
  setHeight(height: number): void;

  /** Get the left edge position (X) */
  getLeft(): number;

  /** Get the right edge position (X + Width) */
  getRight(): number;

  /** Get the top edge position (Y) */
  getTop(): number;

  /** Get the bottom edge position (Y + Height) */
  getBottom(): number;

  /** Get the center X position */
  getCenterX(): number;

  /** Get the center Y position */
  getCenterY(): number;

  /** Get the center point */
  getCenter(): { x: number; y: number };

  /** Check if a point is within the bounds */
  containsPoint(x: number, y: number): boolean;

  /** Check if another bounds object intersects with this one */
  intersects(bounds: IBounds): boolean;

  /** Get the intersection bounds with another bounds object */
  getIntersection(bounds: IBounds): IBounds | null;

  /** Expand the bounds by the specified amount */
  expand(amount: number): void;

  /** Contract the bounds by the specified amount */
  contract(amount: number): void;

  /** Move the bounds by the specified offset */
  moveBy(offsetX: number, offsetY: number): void;

  /** Resize the bounds by the specified amount */
  resizeBy(widthDelta: number, heightDelta: number): void;

  /** Fit the bounds within another bounds object */
  fitWithin(bounds: IBounds): void;

  /** Align the bounds relative to another bounds object */
  alignTo(bounds: IBounds, alignment: IBoundAlignment): void;
}

/**
 * IBounds Interface
 * Represents the bounds of a game object
 */
export interface IBounds {
  /** X position */
  x: number;

  /** Y position */
  y: number;

  /** Width */
  width: number;

  /** Height */
  height: number;
}

/**
 * IBoundAlignment Interface
 * Defines alignment options for positioning objects relative to each other
 * Inspired by CSS positioning and WPF alignment systems
 */
export interface IBoundAlignment {
  /** Horizontal alignment */
  horizontal: 'left' | 'center' | 'right' | 'stretch';

  /** Vertical alignment */
  vertical: 'top' | 'center' | 'bottom' | 'stretch';

  /** Margin from the reference bounds */
  margin?: {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
  };

  /** Whether to maintain aspect ratio when stretching */
  maintainAspectRatio?: boolean;
}

/**
 * IBoundConstraints Interface
 * Defines constraints for bounds operations
 */
export interface IBoundConstraints {
  /** Minimum width */
  minWidth?: number;

  /** Maximum width */
  maxWidth?: number;

  /** Minimum height */
  minHeight?: number;

  /** Maximum height */
  maxHeight?: number;

  /** Minimum X position */
  minX?: number;

  /** Maximum X position */
  maxX?: number;

  /** Minimum Y position */
  minY?: number;

  /** Maximum Y position */
  maxY?: number;

  /** Whether to respect parent bounds */
  respectParentBounds?: boolean;

  /** Whether to maintain aspect ratio */
  maintainAspectRatio?: boolean;

  /** Snap to grid settings */
  snapToGrid?: {
    enabled: boolean;
    gridSize: number;
    snapThreshold: number;
  };
}
