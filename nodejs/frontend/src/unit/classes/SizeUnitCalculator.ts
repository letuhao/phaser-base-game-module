import type { ISizeUnit } from '../interfaces/ISizeUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { UnitType } from '../enums/UnitType';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * SizeUnitCalculator class
 * Implements size unit calculations for responsive sizing
 */
export class SizeUnitCalculator implements ISizeUnit {
  public readonly id: string;
  public readonly name: string;
  public readonly unitType: UnitType = UnitType.SIZE;
  public readonly sizeUnit: SizeUnit;
  public readonly dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH;
  public readonly maintainAspectRatio: boolean;
  public readonly baseValue: number | SizeValue;
  public readonly isActive: boolean = true;

  private minSize?: number;
  private maxSize?: number;

  constructor(
    id: string,
    name: string,
    sizeUnit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
    baseValue: number | SizeValue,
    maintainAspectRatio: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.sizeUnit = sizeUnit;
    this.dimension = dimension;
    this.baseValue = baseValue;
    this.maintainAspectRatio = maintainAspectRatio;
  }

  /**
   * Calculate the actual size value based on context
   */
  calculate(context: UnitContext): number {
    return this.calculateSize(context);
  }

  /**
   * Calculate size based on context
   */
  calculateSize(context: UnitContext): number {
    // First determine what to measure based on SizeUnit (measurement type)
    let measuredSize: number;
    switch (this.sizeUnit) {
      case SizeUnit.PIXEL:
        measuredSize =
          typeof this.baseValue === 'number'
            ? this.baseValue
            : DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
        break;
      case SizeUnit.PERCENTAGE:
        measuredSize =
          typeof this.baseValue === 'number'
            ? this.baseValue
            : DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
        break;
      case SizeUnit.PARENT_WIDTH:
        measuredSize = this.calculateParentWidthSize(context);
        break;
      case SizeUnit.PARENT_HEIGHT:
        measuredSize = this.calculateParentHeightSize(context);
        break;
      case SizeUnit.SCENE_WIDTH:
        measuredSize = this.calculateSceneWidthSize(context);
        break;
      case SizeUnit.SCENE_HEIGHT:
        measuredSize = this.calculateSceneHeightSize(context);
        break;
      case SizeUnit.VIEWPORT_WIDTH:
        measuredSize = this.calculateViewportWidthSize(context);
        break;
      case SizeUnit.VIEWPORT_HEIGHT:
        measuredSize = this.calculateViewportHeightSize(context);
        break;
      default:
        measuredSize = DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    }

    // Then apply the behavior based on SizeValue
    return this.applySizeValue(measuredSize, context);
  }

  /**
   * Apply size value behavior to measured size
   */
  private applySizeValue(measuredSize: number, context: UnitContext): number {
    // If baseValue is a SizeValue enum, use it for behavior
    if (this.baseValue && Object.values(SizeValue).includes(this.baseValue as SizeValue)) {
      switch (this.baseValue as SizeValue) {
        case SizeValue.FILL:
          // FILL should fill the available space, not use the measured size
          return this.applyConstraints(this.calculateFillSize(context));
        case SizeValue.AUTO:
          return this.applyConstraints(this.calculateAutoSize(context));
        case SizeValue.FIT:
          return this.applyConstraints(this.calculateFitSize(context));
        case SizeValue.STRETCH:
          return this.applyConstraints(this.calculateStretchSize(context));
        case SizeValue.CONTENT:
          return this.applyConstraints(this.calculateContentSize(context));
        case SizeValue.INTRINSIC:
          return this.applyConstraints(this.calculateIntrinsicSize(context));
        case SizeValue.RANDOM:
          return this.applyConstraints(this.calculateRandomSize(context));
        default:
          return this.applyConstraints(measuredSize);
      }
    }

    // If baseValue is a number, just return the measured size (direct value)
    return this.applyConstraints(measuredSize);
  }

  /**
   * Calculate width specifically
   */
  calculateWidth(context: UnitContext): number {
    if (this.dimension === Dimension.HEIGHT) {
      throw new Error('Cannot calculate width for height-only dimension');
    }
    return this.calculateSize(context);
  }

  /**
   * Calculate height specifically
   */
  calculateHeight(context: UnitContext): number {
    if (this.dimension === Dimension.WIDTH) {
      throw new Error('Cannot calculate height for width-only dimension');
    }
    return this.calculateSize(context);
  }

  /**
   * Check if the unit is responsive
   */
  isResponsive(): boolean {
    return typeof this.baseValue !== 'number';
  }

  /**
   * Get minimum size constraint
   */
  getMinSize(): number | undefined {
    return this.minSize;
  }

  /**
   * Get maximum size constraint
   */
  getMaxSize(): number | undefined {
    return this.maxSize;
  }

  /**
   * Set size constraints
   */
  setSizeConstraints(min?: number, max?: number): void {
    this.minSize = min;
    this.maxSize = max;
  }

  /**
   * Validate unit in given context
   */
  validate(context: UnitContext): boolean {
    // Check if the sizeUnit requires specific context
    if (this.sizeUnit === SizeUnit.PARENT_WIDTH || this.sizeUnit === SizeUnit.PARENT_HEIGHT) {
      return !!context.parent;
    }
    if (this.sizeUnit === SizeUnit.SCENE_WIDTH || this.sizeUnit === SizeUnit.SCENE_HEIGHT) {
      return !!context.scene;
    }
    if (this.sizeUnit === SizeUnit.VIEWPORT_WIDTH || this.sizeUnit === SizeUnit.VIEWPORT_HEIGHT) {
      return !!context.viewport;
    }
    // Check if the baseValue requires specific context
    if (this.baseValue === SizeValue.CONTENT || this.baseValue === SizeValue.INTRINSIC) {
      return !!context.content;
    }
    return true;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `SizeUnitCalculator(${this.name}, ${this.sizeUnit}, ${this.dimension})`;
  }

  /**
   * Clone the unit with optional modifications
   */
  clone(overrides?: Partial<ISizeUnit>): SizeUnitCalculator {
    const cloned = new SizeUnitCalculator(
      overrides?.id ?? this.id,
      overrides?.name ?? this.name,
      overrides?.sizeUnit ?? this.sizeUnit,
      overrides?.dimension ?? this.dimension,
      overrides?.baseValue ?? this.baseValue,
      overrides?.maintainAspectRatio ?? this.maintainAspectRatio
    );

    if (this.minSize !== undefined) cloned.setSizeConstraints(this.minSize, this.maxSize);
    return cloned;
  }

  // Private calculation methods
  private calculateAutoSize(context: UnitContext): number {
    return (
      context.content?.[this.dimension === Dimension.WIDTH ? 'width' : 'height'] ??
      DEFAULT_FALLBACK_VALUES.SIZE.CONTENT
    );
  }

  private calculateFitSize(context: UnitContext): number {
    const contentSize =
      context.content?.[this.dimension === Dimension.WIDTH ? 'width' : 'height'] ??
      DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
    const availableSize =
      this.dimension === Dimension.WIDTH
        ? (context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE)
        : (context.scene?.height ?? context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE);

    return Math.min(contentSize, availableSize);
  }

  private calculateStretchSize(context: UnitContext): number {
    return this.dimension === Dimension.WIDTH
      ? (context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE)
      : (context.scene?.height ?? context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE);
  }

  private calculateParentWidthSize(context: UnitContext): number {
    return context.parent?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  private calculateParentHeightSize(context: UnitContext): number {
    return context.parent?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  private calculateSceneWidthSize(context: UnitContext): number {
    return context.scene?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
  }

  private calculateSceneHeightSize(context: UnitContext): number {
    return context.scene?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
  }

  private calculateViewportWidthSize(context: UnitContext): number {
    return context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.VIEWPORT;
  }

  private calculateViewportHeightSize(context: UnitContext): number {
    return context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.VIEWPORT;
  }

  private calculateContentSize(context: UnitContext): number {
    if (this.dimension === Dimension.WIDTH) {
      return context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
    }
    if (this.dimension === Dimension.HEIGHT) {
      return context.content?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
    }
    return Math.max(
      context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT,
      context.content?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT
    );
  }

  private calculateIntrinsicSize(context: UnitContext): number {
    // Intrinsic size is typically the natural size of the content
    return this.calculateContentSize(context);
  }

  private calculateRandomSize(_context: UnitContext): number {
    const min = this.minSize ?? DEFAULT_FALLBACK_VALUES.SIZE.MIN;
    const max = this.maxSize ?? DEFAULT_FALLBACK_VALUES.SIZE.MAX;
    return Math.random() * (max - min) + min;
  }

  private calculateFillSize(context: UnitContext): number {
    // FILL should fill the available space based on the size unit
    switch (this.sizeUnit) {
      case SizeUnit.PARENT_WIDTH:
        return context.parent?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
      case SizeUnit.PARENT_HEIGHT:
        return context.parent?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
      case SizeUnit.SCENE_WIDTH:
        return context.scene?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
      case SizeUnit.SCENE_HEIGHT:
        return context.scene?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
      case SizeUnit.VIEWPORT_WIDTH:
        return context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
      case SizeUnit.VIEWPORT_HEIGHT:
        return context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
      case SizeUnit.PIXEL:
      case SizeUnit.PERCENTAGE:
      default:
        // For PIXEL and PERCENTAGE, FILL should use the measured size
        return this.dimension === Dimension.WIDTH
          ? (context.scene?.width ??
              context.viewport?.width ??
              DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT)
          : (context.scene?.height ??
              context.viewport?.height ??
              DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT);
    }
  }

  private applyConstraints(value: number): number {
    if (this.minSize !== undefined && value < this.minSize) {
      return this.minSize;
    }
    if (this.maxSize !== undefined && value > this.maxSize) {
      return this.maxSize;
    }
    return value;
  }

  /**
   * Get the aspect ratio if maintaining aspect ratio
   */
  getAspectRatio(): number | undefined {
    if (!this.maintainAspectRatio) return undefined;

    // If we have both width and height constraints, calculate aspect ratio
    if (this.minSize !== undefined && this.maxSize !== undefined) {
      return this.maxSize / this.minSize;
    }

    return undefined;
  }

  /**
   * Check if the unit has size constraints
   */
  hasConstraints(): boolean {
    return this.minSize !== undefined || this.maxSize !== undefined;
  }

  /**
   * Get constraint information
   */
  getConstraintInfo(): { min?: number; max?: number; hasConstraints: boolean } {
    return {
      min: this.minSize,
      max: this.maxSize,
      hasConstraints: this.hasConstraints(),
    };
  }
}
