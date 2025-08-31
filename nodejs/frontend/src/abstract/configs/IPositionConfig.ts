import type { IConfiguration } from '../interfaces/IConfiguration';

/**
 * Position configuration interface for game object positioning
 * Inspired by CSS positioning, WinForms, and WPF layout systems
 */
export interface IPositionConfig extends IConfiguration {
  /** Positioning mode */
  readonly positionMode: 'absolute' | 'relative' | 'fixed' | 'sticky';

  /** X coordinate position */
  readonly x: number;

  /** Y coordinate position */
  readonly y: number;

  /** Z-index for layering */
  readonly zIndex: number;

  /** Anchor point (0-1 for both X and Y) */
  readonly anchor: {
    x: number;
    y: number;
  };

  /** Offset from anchor point */
  readonly offset: {
    x: number;
    y: number;
  };

  /** Size configuration */
  readonly size: {
    width: number | 'auto' | 'fill' | 'wrap';
    height: number | 'auto' | 'fill' | 'wrap';
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
  };

  /** Margin around the object */
  readonly margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  /** Padding inside the object */
  readonly padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };

  /** Border configuration */
  readonly border: {
    width: number;
    style: 'solid' | 'dashed' | 'dotted' | 'none';
    color: string;
    radius: number;
  };

  /** Alignment within parent container */
  readonly alignment: {
    horizontal: 'left' | 'center' | 'right' | 'stretch';
    vertical: 'top' | 'center' | 'bottom' | 'stretch';
  };

  /** Transform properties */
  readonly transform: {
    scale: {
      x: number;
      y: number;
    };
    rotation: number;
    skew: {
      x: number;
      y: number;
    };
  };

  /** Constraints for positioning */
  readonly constraints: {
    /** Whether to respect parent boundaries */
    respectParentBounds: boolean;
    /** Whether to snap to grid */
    snapToGrid: boolean;
    /** Grid size for snapping */
    gridSize: number;
    /** Whether to maintain aspect ratio */
    maintainAspectRatio: boolean;
    /** Minimum distance from parent edges */
    minDistanceFromEdges: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };

  /** Responsive positioning rules */
  readonly responsive: {
    /** Breakpoint-specific positions */
    breakpoints: {
      [breakpoint: string]: {
        x?: number;
        y?: number;
        width?: number | 'auto' | 'fill' | 'wrap';
        height?: number | 'auto' | 'fill' | 'wrap';
        scale?: { x: number; y: number };
        rotation?: number;
      };
    };
  };

  /** Get the actual position considering anchor and offset */
  getActualPosition(): { x: number; y: number };

  /** Get the actual size considering constraints */
  getActualSize(): { width: number; height: number };

  /** Check if position is within parent bounds */
  isWithinBounds(parentBounds: { x: number; y: number; width: number; height: number }): boolean;

  /** Snap position to grid */
  snapToGrid(gridSize: number): { x: number; y: number };

  /** Get responsive position for specific breakpoint */
  getResponsivePosition(breakpoint: string): Partial<IPositionConfig>;

  /** Calculate center position within parent */
  getCenterPosition(parentBounds: { x: number; y: number; width: number; height: number }): {
    x: number;
    y: number;
  };
}
