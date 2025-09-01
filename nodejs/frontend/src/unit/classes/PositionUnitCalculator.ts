import type { IPositionUnit } from '../interfaces/IPositionUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { PositionUnit } from '../enums/PositionUnit';
import { Dimension } from '../enums/Dimension';
import { PositionValue } from '../enums/PositionValue';
import { UnitType } from '../enums/UnitType';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * PositionUnitCalculator class
 * Implements position unit calculations for responsive positioning
 */
export class PositionUnitCalculator implements IPositionUnit {
  public readonly id: string;
  public readonly name: string;
  public readonly unitType: UnitType = UnitType.POSITION;
  public readonly positionUnit: PositionUnit;
  public readonly axis: Dimension.X | Dimension.Y | Dimension.XY;
  public readonly baseValue: number | PositionValue;
  public readonly isActive: boolean = true;

  private alignment?: string;
  private offset: number = 0;

  constructor(
    id: string,
    name: string,
    positionUnit: PositionUnit,
    axis: Dimension.X | Dimension.Y | Dimension.XY,
    baseValue: number | PositionValue
  ) {
    this.id = id;
    this.name = name;
    this.positionUnit = positionUnit;
    this.axis = axis;
    this.baseValue = baseValue;
  }

  /**
   * Calculate the actual position value based on context
   */
  calculate(context: UnitContext): number {
    return this.calculatePosition(context);
  }

  /**
   * Calculate position based on context
   */
  calculatePosition(context: UnitContext): number {
    // First determine the reference point based on PositionUnit (measurement type)
    let referencePoint: number;
    switch (this.positionUnit) {
      case PositionUnit.PIXEL:
        referencePoint = typeof this.baseValue === 'number' ? this.baseValue : 0;
        break;
      case PositionUnit.PERCENTAGE:
        referencePoint = typeof this.baseValue === 'number' ? this.baseValue : 0;
        break;
      case PositionUnit.PARENT_LEFT:
        referencePoint = context.parent?.x ?? 0;
        break;
      case PositionUnit.PARENT_RIGHT:
        referencePoint = (context.parent?.x ?? 0) + (context.parent?.width ?? 0);
        break;
      case PositionUnit.PARENT_TOP:
        referencePoint = context.parent?.y ?? 0;
        break;
      case PositionUnit.PARENT_BOTTOM:
        referencePoint = (context.parent?.y ?? 0) + (context.parent?.height ?? 0);
        break;
      case PositionUnit.PARENT_CENTER_X:
        if (context.parent) {
          referencePoint = context.parent.x + context.parent.width / 2;
        } else {
          // Fallback to scene center when no parent
          referencePoint = (context.scene?.width ?? 0) / 2;
        }
        break;
      case PositionUnit.PARENT_CENTER_Y:
        referencePoint = (context.parent?.y ?? 0) + (context.parent?.height ?? 0) / 2;
        break;
      case PositionUnit.SCENE_LEFT:
        referencePoint = 0;
        break;
      case PositionUnit.SCENE_RIGHT:
        referencePoint = context.scene?.width ?? 0;
        break;
      case PositionUnit.SCENE_TOP:
        referencePoint = 0;
        break;
      case PositionUnit.SCENE_BOTTOM:
        referencePoint = context.scene?.height ?? 0;
        break;
      case PositionUnit.SCENE_CENTER_X:
        referencePoint = (context.scene?.width ?? 0) / 2;
        break;
      case PositionUnit.SCENE_CENTER_Y:
        referencePoint = (context.scene?.height ?? 0) / 2;
        break;
      case PositionUnit.VIEWPORT_LEFT:
        referencePoint = 0;
        break;
      case PositionUnit.VIEWPORT_RIGHT:
        referencePoint = context.viewport?.width ?? 0;
        break;
      case PositionUnit.VIEWPORT_TOP:
        referencePoint = 0;
        break;
      case PositionUnit.VIEWPORT_BOTTOM:
        referencePoint = context.viewport?.height ?? 0;
        break;
      default:
        referencePoint = 0;
    }

    // Then apply the behavior based on PositionValue
    return this.applyPositionValue(referencePoint, context);
  }

  /**
   * Apply position value behavior to reference point
   */
  private applyPositionValue(referencePoint: number, context: UnitContext): number {
    // If baseValue is a PositionValue enum, use it for behavior
    if (this.baseValue && Object.values(PositionValue).includes(this.baseValue as PositionValue)) {
      switch (this.baseValue as PositionValue) {
        case PositionValue.CENTER:
          return referencePoint + this.offset;
        case PositionValue.LEFT:
          return referencePoint + this.offset;
        case PositionValue.RIGHT:
          return referencePoint + this.offset;
        case PositionValue.TOP:
          return referencePoint + this.offset;
        case PositionValue.BOTTOM:
          return referencePoint + this.offset;
        case PositionValue.STATIC:
          return this.offset;
        case PositionValue.RELATIVE:
          return this.offset;
        case PositionValue.ABSOLUTE:
          return this.offset;
        case PositionValue.FIXED:
          return this.offset;
        case PositionValue.RANDOM:
          return this.calculateRandomPosition(context);
        case PositionValue.CONTENT_LEFT:
          return this.calculateContentLeftPosition(context);
        case PositionValue.CONTENT_RIGHT:
          return this.calculateContentRightPosition(context);
        case PositionValue.CONTENT_TOP:
          return this.calculateContentTopPosition(context);
        case PositionValue.CONTENT_BOTTOM:
          return this.calculateContentBottomPosition(context);
        default:
          return referencePoint + this.offset;
      }
    }
    
    // If baseValue is a number, just return the reference point + offset (direct value)
    return referencePoint + this.offset;
  }

  /**
   * Calculate X position specifically
   */
  calculateX(context: UnitContext): number {
    if (this.axis === Dimension.Y) {
      throw new Error('Cannot calculate X position for Y-only axis');
    }
    return this.calculatePosition(context);
  }

  /**
   * Calculate Y position specifically
   */
  calculateY(context: UnitContext): number {
    if (this.axis === Dimension.X) {
      throw new Error('Cannot calculate Y position for X-only axis');
    }
    return this.calculatePosition(context);
  }

  /**
   * Calculate both X and Y positions
   */
  calculateBoth(context: UnitContext): { x: number; y: number } {
    if (this.axis === Dimension.X) {
      return { x: this.calculatePosition(context), y: 0 };
    }
    if (this.axis === Dimension.Y) {
      return { x: 0, y: this.calculatePosition(context) };
    }

    // For XY axis, we need to calculate both
    const xPos = this.calculateX(context);
    const yPos = this.calculateY(context);
    return { x: xPos, y: yPos };
  }

  /**
   * Check if the unit is responsive
   */
  isResponsive(): boolean {
    return typeof this.baseValue !== 'number';
  }

  /**
   * Get alignment type
   */
  getAlignment(): string | undefined {
    return this.alignment;
  }

  /**
   * Set alignment
   */
  setAlignment(alignment: string): void {
    this.alignment = alignment;
  }

  /**
   * Get offset value
   */
  getOffset(): number {
    return this.offset;
  }

  /**
   * Set offset value
   */
  setOffset(offset: number): void {
    this.offset = offset;
  }

  /**
   * Validate unit in given context
   */
  validate(context: UnitContext): boolean {
    // Check if the positionUnit requires specific context
    if (
      this.positionUnit === PositionUnit.PARENT_LEFT ||
      this.positionUnit === PositionUnit.PARENT_RIGHT ||
      this.positionUnit === PositionUnit.PARENT_TOP ||
      this.positionUnit === PositionUnit.PARENT_BOTTOM ||
      this.positionUnit === PositionUnit.PARENT_CENTER_X ||
      this.positionUnit === PositionUnit.PARENT_CENTER_Y
    ) {
      return !!context.parent;
    }
    if (
      this.positionUnit === PositionUnit.SCENE_LEFT ||
      this.positionUnit === PositionUnit.SCENE_RIGHT ||
      this.positionUnit === PositionUnit.SCENE_TOP ||
      this.positionUnit === PositionUnit.SCENE_BOTTOM ||
      this.positionUnit === PositionUnit.SCENE_CENTER_X ||
      this.positionUnit === PositionUnit.SCENE_CENTER_Y
    ) {
      return !!context.scene;
    }
    if (
      this.positionUnit === PositionUnit.VIEWPORT_LEFT ||
      this.positionUnit === PositionUnit.VIEWPORT_RIGHT ||
      this.positionUnit === PositionUnit.VIEWPORT_TOP ||
      this.positionUnit === PositionUnit.VIEWPORT_BOTTOM
    ) {
      return !!context.viewport;
    }
    // Check if the baseValue requires specific context
    if (
      this.baseValue === PositionValue.CONTENT_LEFT ||
      this.baseValue === PositionValue.CONTENT_RIGHT ||
      this.baseValue === PositionValue.CONTENT_TOP ||
      this.baseValue === PositionValue.CONTENT_BOTTOM
    ) {
      return !!context.content;
    }
    return true;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `PositionUnitCalculator(${this.name}, ${this.positionUnit}, ${this.axis})`;
  }

  /**
   * Clone the unit with optional modifications
   */
  clone(overrides?: Partial<IPositionUnit>): PositionUnitCalculator {
    const cloned = new PositionUnitCalculator(
      overrides?.id ?? this.id,
      overrides?.name ?? this.name,
      overrides?.positionUnit ?? this.positionUnit,
      overrides?.axis ?? this.axis,
      overrides?.baseValue ?? this.baseValue
    );

    if (this.alignment) cloned.setAlignment(this.alignment);
    cloned.setOffset(this.offset);
    return cloned;
  }

  private calculateRandomPosition(context: UnitContext): number {
    const max =
      this.axis === Dimension.X
        ? (context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE)
        : (context.scene?.height ?? context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE);
    return Math.random() * max + this.offset;
  }

  private calculateContentLeftPosition(_context: UnitContext): number {
    return this.offset;
  }

  private calculateContentRightPosition(context: UnitContext): number {
    if (this.axis === Dimension.X) {
      return (context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT) + this.offset;
    }
    return this.offset;
  }

  private calculateContentTopPosition(_context: UnitContext): number {
    return this.offset;
  }

  private calculateContentBottomPosition(context: UnitContext): number {
    if (this.axis === Dimension.Y) {
      return (context.content?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT) + this.offset;
    }
    return this.offset;
  }

  /**
   * Get position information for debugging
   */
  getPositionInfo(): {
    axis: Dimension.X | Dimension.Y | Dimension.XY;
    alignment?: string;
    offset: number;
    isResponsive: boolean;
  } {
    return {
      axis: this.axis,
      alignment: this.alignment,
      offset: this.offset,
      isResponsive: this.isResponsive()
    };
  }

  /**
   * Check if position is within bounds
   */
  isWithinBounds(position: number, context: UnitContext): boolean {
    if (this.axis === Dimension.X) {
      const maxX = context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
      return position >= 0 && position <= maxX;
    }
    if (this.axis === Dimension.Y) {
      const maxY = context.scene?.height ?? context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
      return position >= 0 && position <= maxY;
    }
    return true;
  }

  /**
   * Get the range of possible positions for this unit
   */
  getPositionRange(context: UnitContext): { min: number; max: number } {
    if (this.axis === Dimension.X) {
      return {
        min: 0,
        max: context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE
      };
    }
    if (this.axis === Dimension.Y) {
      return {
        min: 0,
        max: context.scene?.height ?? context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE
      };
    }
    return { min: 0, max: 0 };
  }
}
