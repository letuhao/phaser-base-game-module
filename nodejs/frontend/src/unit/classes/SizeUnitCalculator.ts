import type { ISizeUnit } from '../interfaces/ISizeUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { UnitType } from '../enums/UnitType';

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
    if (typeof this.baseValue === 'number') {
      return this.applyConstraints(this.baseValue);
    }

    switch (this.baseValue) {
      case SizeValue.FILL:
        return this.calculateFillSize(context);
      case SizeValue.AUTO:
        return this.calculateAutoSize(context);
      case SizeValue.FIT:
        return this.calculateFitSize(context);
      case SizeValue.STRETCH:
        return this.calculateStretchSize(context);
      case SizeValue.PARENT_WIDTH:
        return this.calculateParentWidthSize(context);
      case SizeValue.PARENT_HEIGHT:
        return this.calculateParentHeightSize(context);
      case SizeValue.SCENE_WIDTH:
        return this.calculateSceneWidthSize(context);
      case SizeValue.SCENE_HEIGHT:
        return this.calculateSceneHeightSize(context);
      case SizeValue.VIEWPORT_WIDTH:
        return this.calculateViewportWidthSize(context);
      case SizeValue.VIEWPORT_HEIGHT:
        return this.calculateViewportHeightSize(context);
      case SizeValue.CONTENT:
        return this.calculateContentSize(context);
      case SizeValue.INTRINSIC:
        return this.calculateIntrinsicSize(context);
      case SizeValue.RANDOM:
        return this.calculateRandomSize(context);
      default:
        return this.applyConstraints(100); // Default fallback
    }
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
    if (this.baseValue === SizeValue.PARENT_WIDTH || this.baseValue === SizeValue.PARENT_HEIGHT) {
      return !!context.parent;
    }
    if (this.baseValue === SizeValue.SCENE_WIDTH || this.baseValue === SizeValue.SCENE_HEIGHT) {
      return !!context.scene;
    }
    if (
      this.baseValue === SizeValue.VIEWPORT_WIDTH ||
      this.baseValue === SizeValue.VIEWPORT_HEIGHT
    ) {
      return !!context.viewport;
    }
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
  private calculateFillSize(context: UnitContext): number {
    if (this.dimension === Dimension.WIDTH) {
      return context.scene?.width ?? context.viewport?.width ?? 800;
    }
    if (this.dimension === Dimension.HEIGHT) {
      return context.scene?.height ?? context.viewport?.height ?? 600;
    }
    return Math.min(
      context.scene?.width ?? context.viewport?.width ?? 800,
      context.scene?.height ?? context.viewport?.height ?? 600
    );
  }

  private calculateAutoSize(context: UnitContext): number {
    return context.content?.[this.dimension === Dimension.WIDTH ? 'width' : 'height'] ?? 100;
  }

  private calculateFitSize(context: UnitContext): number {
    const contentSize =
      context.content?.[this.dimension === Dimension.WIDTH ? 'width' : 'height'] ?? 100;
    const availableSize =
      this.dimension === Dimension.WIDTH
        ? (context.scene?.width ?? context.viewport?.width ?? 800)
        : (context.scene?.height ?? context.viewport?.height ?? 600);

    return Math.min(contentSize, availableSize);
  }

  private calculateStretchSize(context: UnitContext): number {
    return this.dimension === Dimension.WIDTH
      ? (context.scene?.width ?? context.viewport?.width ?? 800)
      : (context.scene?.height ?? context.viewport?.height ?? 600);
  }

  private calculateParentWidthSize(context: UnitContext): number {
    return context.parent?.width ?? 100;
  }

  private calculateParentHeightSize(context: UnitContext): number {
    return context.parent?.height ?? 100;
  }

  private calculateSceneWidthSize(context: UnitContext): number {
    return context.scene?.width ?? 800;
  }

  private calculateSceneHeightSize(context: UnitContext): number {
    return context.scene?.height ?? 600;
  }

  private calculateViewportWidthSize(context: UnitContext): number {
    return context.viewport?.width ?? 800;
  }

  private calculateViewportHeightSize(context: UnitContext): number {
    return context.viewport?.height ?? 600;
  }

  private calculateContentSize(context: UnitContext): number {
    if (this.dimension === Dimension.WIDTH) {
      return context.content?.width ?? 100;
    }
    if (this.dimension === Dimension.HEIGHT) {
      return context.content?.height ?? 100;
    }
    return Math.max(context.content?.width ?? 100, context.content?.height ?? 100);
  }

  private calculateIntrinsicSize(context: UnitContext): number {
    // Intrinsic size is typically the natural size of the content
    return this.calculateContentSize(context);
  }

  private calculateRandomSize(_context: UnitContext): number {
    const min = this.minSize ?? 50;
    const max = this.maxSize ?? 200;
    return Math.random() * (max - min) + min;
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
}
