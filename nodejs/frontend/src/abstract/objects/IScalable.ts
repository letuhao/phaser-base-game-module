import type { IBounds } from './IBound'

/**
 * IScalable Interface
 * Provides scaling and resizing methods for game objects
 * Inspired by CSS transform scale, responsive design, and WPF scaling concepts
 */
export interface IScalable {
  /** Get the current scale */
  getScale(): IScale
  
  /** Set the scale */
  setScale(scale: IScale): void
  
  /** Get the scale X value */
  getScaleX(): number
  
  /** Get the scale Y value */
  getScaleY(): number
  
  /** Set the scale X value */
  setScaleX(scaleX: number): void
  
  /** Set the scale Y value */
  setScaleY(scaleY: number): void
  
  /** Set uniform scale (both X and Y) */
  setUniformScale(scale: number): void
  
  /** Scale the object by a factor relative to current scale */
  scaleBy(factor: number): void
  
  /** Scale the object by different factors for X and Y */
  scaleByXY(factorX: number, factorY: number): void
  
  /** Reset scale to 1,1 */
  resetScale(): void
  
  /** Get the scaled bounds (bounds after applying scale) */
  getScaledBounds(): IBounds
  
  /** Get the scaled size (size after applying scale) */
  getScaledSize(): { width: number; height: number }
  
  /** Check if the object is scaled */
  isScaled(): boolean
  
  /** Check if the object has uniform scale */
  hasUniformScale(): boolean
  
  /** Get the scale factor needed to fit within specified bounds */
  getScaleToFit(bounds: IBounds, maintainAspectRatio?: boolean): IScale
  
  /** Get the scale factor needed to fill specified bounds */
  getScaleToFill(bounds: IBounds, maintainAspectRatio?: boolean): IScale
  
  /** Scale to fit within specified bounds */
  scaleToFit(bounds: IBounds, maintainAspectRatio?: boolean): void
  
  /** Scale to fill specified bounds */
  scaleToFill(bounds: IBounds, maintainAspectRatio?: boolean): void
  
  /** Animate scale to target value */
  animateScale(targetScale: IScale, duration: number, easing?: string): void
  
  /** Animate scale by factor */
  animateScaleBy(factor: number, duration: number, easing?: string): void
  
  /** Get the minimum scale allowed */
  getMinScale(): IScale
  
  /** Get the maximum scale allowed */
  getMaxScale(): IScale
  
  /** Set scale constraints */
  setScaleConstraints(constraints: IScaleConstraints): void
  
  /** Check if scale is within constraints */
  isScaleValid(scale: IScale): boolean
  
  /** Clamp scale to valid range */
  clampScale(scale: IScale): IScale
  
  /** Get the scale origin point (relative to object bounds) */
  getScaleOrigin(): { x: number; y: number }
  
  /** Set the scale origin point (relative to object bounds) */
  setScaleOrigin(origin: { x: number; y: number }): void
  
  /** Scale around a specific point */
  scaleAroundPoint(scale: IScale, point: { x: number; y: number }): void
  
  /** Get the scale matrix */
  getScaleMatrix(): number[]
  
  /** Apply scale matrix */
  applyScaleMatrix(matrix: number[]): void
}

/**
 * IScale Interface
 * Represents the scale of a game object
 */
export interface IScale {
  /** Scale X value */
  x: number
  
  /** Scale Y value */
  y: number
}

/**
 * IScaleConstraints Interface
 * Defines constraints for scaling operations
 */
export interface IScaleConstraints {
  /** Minimum scale X */
  minScaleX?: number
  
  /** Maximum scale X */
  maxScaleX?: number
  
  /** Minimum scale Y */
  minScaleY?: number
  
  /** Maximum scale Y */
  maxScaleY?: number
  
  /** Whether to maintain aspect ratio */
  maintainAspectRatio?: boolean
  
  /** Whether to allow negative scale (flip) */
  allowNegativeScale?: boolean
  
  /** Whether to snap scale to grid */
  snapToGrid?: {
    enabled: boolean
    gridSize: number
    snapThreshold: number
  }
  
  /** Scale step size for incremental scaling */
  stepSize?: number
  
  /** Whether to constrain scale to parent bounds */
  constrainToParent?: boolean
}

/**
 * IScaleAnimation Interface
 * Defines scale animation properties
 */
export interface IScaleAnimation {
  /** Target scale */
  targetScale: IScale
  
  /** Animation duration in milliseconds */
  duration: number
  
  /** Easing function */
  easing?: string
  
  /** Whether to maintain aspect ratio during animation */
  maintainAspectRatio?: boolean
  
  /** Callback when animation starts */
  onStart?: () => void
  
  /** Callback when animation updates */
  onUpdate?: (progress: number) => void
  
  /** Callback when animation completes */
  onComplete?: () => void
  
  /** Callback when animation is interrupted */
  onInterrupt?: () => void
}
