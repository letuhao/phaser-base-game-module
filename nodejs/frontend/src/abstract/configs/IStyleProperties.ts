import type { IGameObject } from '../base/IGameObject'

/**
 * ParentSize type for responsive sizing relative to parent container
 * Similar to CSS vh/vw units but for parent container dimensions
 */
export type IParentSize = {
  /** Float value from 0.0 to 1.0 representing the proportion of parent width */
  value?: number
  /** Whether to maintain aspect ratio when scaling */
  maintainAspectRatio?: boolean
}

/**
 * ParentWidth class for width calculations relative to parent
 */
export class ParentWidth implements IParentSize {
  constructor(
    public value?: number,
    public maintainAspectRatio?: boolean
  ) {}

  getValue(parent: IGameObject): number {
    if (!this.value) return 0;
    const size = parent.getSize();
    return size.width * this.value; // No need to divide by 100
  }
}

/**
 * ParentHeight class for height calculations relative to parent
 */
export class ParentHeight implements IParentSize {
  constructor(
    public value?: number,
    public maintainAspectRatio?: boolean
  ) {}

  getValue(parent: IGameObject): number {
    if (!this.value) return 0;
    const size = parent.getSize();
    return size.height * this.value; // No need to divide by 100
  }
}

/**
 * ParentPositionX class for X position calculations relative to parent
 */
export class ParentPositionX implements IParentSize {
  constructor(
    public value?: number,
    public maintainAspectRatio?: boolean
  ) {}

  getValue(parent: IGameObject): number {
    if (!this.value) return 0;
    const size = parent.getSize();
    return size.width * this.value; // No need to divide by 100
  }
}

/**
 * ParentPositionY class for Y position calculations relative to parent
 */
export class ParentPositionY implements IParentSize {
  constructor(
    public value?: number,
    public maintainAspectRatio?: boolean
  ) {}

  getValue(parent: IGameObject): number {
    if (!this.value) return 0;
    const size = parent.getSize();
    return size.height * this.value; // No need to divide by 100
  }
}

/**
 * RandomValue interface for generic random value generation
 */
export interface IRandomValue<T> {
  /** Current value */
  current: T
  /** Minimum value */
  min: T
  /** Maximum value */
  max: T
  /** Get a random value between min and max */
  getRandomValue(): T
  /** Set the current value */
  setCurrentValue(value: T): void
}

/**
 * RandomValueNumber for numeric random values
 */
export interface IRandomValueNumber extends IRandomValue<number> {
  /** Current number value */
  current: number
  /** Minimum number value */
  min: number
  /** Maximum number value */
  max: number
  /** Get a random number between min and max */
  getRandomValue(): number
  /** Set the current number value */
  setCurrentValue(value: number): void
}

/**
 * Concrete implementation of RandomValueNumber
 */
export class RandomValueNumber implements IRandomValueNumber {
  constructor(
    public min: number,
    public max: number,
    public current: number = min
  ) {
    if (min > max) {
      throw new Error('min cannot be greater than max')
    }
    if (current < min || current > max) {
      this.current = min
    }
  }

  getRandomValue(): number {
    this.current = Math.random() * (this.max - this.min) + this.min
    return this.current
  }

  setCurrentValue(value: number): void {
    if (value >= this.min && value <= this.max) {
      this.current = value
    } else {
      throw new Error(`Value ${value} is outside the range [${this.min}, ${this.max}]`)
    }
  }

  /** Get a random integer value */
  getRandomInt(): number {
    this.current = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min
    return this.current
  }

  /** Get a random value with specified decimal places */
  getRandomValueWithDecimals(decimals: number): number {
    const factor = Math.pow(10, decimals)
    this.current = Math.round((Math.random() * (this.max - this.min) + this.min) * factor) / factor
    return this.current
  }
}

/**
 * IStyleProperties interface
 * Defines all possible style properties for game objects
 * Similar to CSS properties but adapted for game development
 */
export interface IStyleProperties {
  // ===== LAYOUT PROPERTIES =====
  
  /** X position - can be number, alignment keyword, parent-relative, or random */
  positionX?: number | 'center' | 'left' | 'right' | ParentPositionX | IRandomValueNumber
  
  /** Y position - can be number, alignment keyword, parent-relative, or random */
  positionY?: number | 'center' | 'top' | 'bottom' | ParentPositionY | IRandomValueNumber
  
  /** Z position (depth) */
  positionZ?: number
  
  /** Width - can be number, keyword, parent-relative, or random */
  width?: number | 'fill' | 'auto' | ParentWidth | IRandomValueNumber
  
  /** Height - can be number, keyword, parent-relative, or random */
  height?: number | 'fill' | 'auto' | ParentHeight | IRandomValueNumber
  
  // ===== POSITIONING PROPERTIES =====
  
  /** Position type */
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'top' | 'left' | 'right' | 'bottom'
  
  /** Alignment within parent container */
  alignment?: 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  
  /** Z-index for layering */
  zIndex?: number
  
  /** Z-order for layering (alternative to zIndex) */
  zOrder?: number
  
  // ===== SCALING PROPERTIES =====
  
  /** Scale factor - can be number or random */
  scale?: number | IRandomValueNumber
  
  /** Scale X factor */
  scaleX?: number | IRandomValueNumber
  
  /** Scale Y factor */
  scaleY?: number | IRandomValueNumber
  
  /** Whether to maintain aspect ratio */
  maintainAspectRatio?: boolean
  
  /** Scale strategy for responsive behavior */
  scaleStrategy?: 'fit' | 'stretch' | 'fill'
  
  /** Scale mode for responsive behavior (alias for scaleStrategy) */
  scaleMode?: 'fit' | 'stretch' | 'fill'
  
  // ===== VISUAL PROPERTIES =====
  
  /** Opacity (0-1) */
  alpha?: number | IRandomValueNumber
  
  /** Rotation in radians */
  rotation?: number | IRandomValueNumber
  
  /** Whether the object is visible */
  visible?: boolean
  
  /** Whether the object is interactive */
  interactive?: boolean
  
  // ===== BACKGROUND PROPERTIES =====
  
  /** Background color */
  backgroundColor?: number | string
  
  /** Background image texture key */
  backgroundImage?: string
  
  /** Background image tint color */
  backgroundTint?: number | string
  
  // ===== BORDER PROPERTIES =====
  
  /** Border color */
  borderColor?: number | string
  
  /** Border width */
  borderWidth?: number | IRandomValueNumber
  
  /** Border radius for rounded corners */
  borderRadius?: number | IRandomValueNumber
  
  /** Border bottom width */
  borderBottomWidth?: number | IRandomValueNumber
  
  // ===== MARGIN AND PADDING =====
  
  /** Margin around the object */
  margin?: number | IRandomValueNumber
  
  /** Margin top */
  marginTop?: number | IRandomValueNumber
  
  /** Margin right */
  marginRight?: number | IRandomValueNumber
  
  /** Margin bottom */
  marginBottom?: number | IRandomValueNumber
  
  /** Margin left */
  marginLeft?: number | IRandomValueNumber
  
  /** Padding inside the object */
  padding?: number | IRandomValueNumber
  
  /** Padding top */
  paddingTop?: number | IRandomValueNumber
  
  /** Padding right */
  paddingRight?: number | IRandomValueNumber
  
  /** Padding bottom */
  paddingBottom?: number | IRandomValueNumber
  
  /** Padding left */
  paddingLeft?: number | IRandomValueNumber
  
  // ===== ANIMATION PROPERTIES =====
  
  /** Animation duration in milliseconds */
  animationDuration?: number | IRandomValueNumber
  
  /** Animation easing function */
  animationEasing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'bounce' | 'elastic'
  
  /** Whether to loop animations */
  animationLoop?: boolean
  
  // ===== FONT AND TEXT PROPERTIES =====
  
  /** Font family name */
  fontFamily?: string
  
  /** Font size in pixels */
  fontSize?: number | IRandomValueNumber
  
  /** Font weight (normal, bold, etc.) */
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  
  /** Font style (normal, italic, oblique) */
  fontStyle?: 'normal' | 'italic' | 'oblique'
  
  /** Text color */
  color?: number | string
  
  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right' | 'justify'
  
  /** Line height multiplier */
  lineHeight?: number | IRandomValueNumber
  
  /** Letter spacing in pixels */
  letterSpacing?: number | IRandomValueNumber
  
  /** Text shadow color */
  textShadowColor?: number | string
  
  /** Text shadow blur radius */
  textShadowBlur?: number | IRandomValueNumber
  
  /** Text shadow offset X */
  textShadowOffsetX?: number | IRandomValueNumber
  
  /** Text shadow offset Y */
  textShadowOffsetY?: number | IRandomValueNumber
  
  /** Whether to enable word wrapping */
  wordWrap?: boolean
  
  /** Maximum width for word wrapping */
  wordWrapWidth?: number | IRandomValueNumber
  
  // ===== SHADOW PROPERTIES =====
  
  /** Shadow color */
  shadowColor?: number | string
  
  /** Shadow blur radius */
  shadowBlur?: number | IRandomValueNumber
  
  /** Shadow offset X */
  shadowOffsetX?: number | IRandomValueNumber
  
  /** Shadow offset Y */
  shadowOffsetY?: number | IRandomValueNumber
  
  /** Shadow alpha (0-1) */
  shadowAlpha?: number | IRandomValueNumber
  
  // ===== TRANSFORM PROPERTIES =====
  
  /** Skew X in radians */
  skewX?: number | IRandomValueNumber
  
  /** Skew Y in radians */
  skewY?: number | IRandomValueNumber
  
  /** Transform origin X (0-1) */
  transformOriginX?: number | IRandomValueNumber
  
  /** Transform origin Y (0-1) */
  transformOriginY?: number | IRandomValueNumber
  
  // ===== CURSOR PROPERTIES =====
  
  /** Cursor style when hovering */
  cursor?: 'default' | 'pointer' | 'hand' | 'text' | 'move' | 'not-allowed' | 'wait' | 'crosshair' | 'grab' | 'grabbing'
  
  // ===== FILTER PROPERTIES =====
  
  /** Blur filter amount */
  blur?: number | IRandomValueNumber
  
  /** Brightness filter (0-2, 1 is normal) */
  brightness?: number | IRandomValueNumber
  
  /** Contrast filter (0-2, 1 is normal) */
  contrast?: number | IRandomValueNumber
  
  /** Hue rotation filter in degrees */
  hueRotate?: number | IRandomValueNumber
  
  /** Saturation filter (0-2, 1 is normal) */
  saturation?: number | IRandomValueNumber
  
  /** Grayscale filter (0-1, 0 is normal) */
  grayscale?: number | IRandomValueNumber
  
  /** Invert filter (0-1, 0 is normal) */
  invert?: number | IRandomValueNumber
  
  // ===== RESPONSIVE PROPERTIES =====
  
  /** Responsive breakpoint conditions */
  responsiveBreakpoint?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  
  /** Responsive behavior configuration */
  responsiveBehavior?: {
    maintainAspectRatio: boolean
    scaleStrategy: 'fit' | 'stretch' | 'fill'
    alignment: string
    backgroundImage?: string
  }
  
  // ===== THEME CLASS PROPERTIES =====
  
  /** CSS-like theme classes to apply */
  classes?: string[]
  
  /** Custom CSS properties for theme variables */
  customProperties?: Record<string, string | number>
}

/**
 * CommonIStyleProperties interface
 * Extends IStyleProperties with common properties that most objects will use
 */
export interface CommonIStyleProperties extends IStyleProperties {
  // Common properties that most objects will use
  maintainAspectRatio: boolean
  scaleStrategy: 'fit' | 'stretch' | 'fill'
  alignment: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  
  // Object-specific custom properties
  height?: number
  width?: number
  padding?: number
  margin?: number
}
