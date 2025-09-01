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
    if (typeof this.baseValue === 'number') {
      return this.baseValue + this.offset;
    }

    switch (this.baseValue) {
      case PositionValue.CENTER:
        return this.calculateCenterPosition(context);
      case PositionValue.LEFT:
        return this.calculateLeftPosition(context);
      case PositionValue.RIGHT:
        return this.calculateRightPosition(context);
      case PositionValue.TOP:
        return this.calculateTopPosition(context);
      case PositionValue.BOTTOM:
        return this.calculateBottomPosition(context);
      case PositionValue.PARENT_LEFT:
        return this.calculateParentLeftPosition(context);
      case PositionValue.PARENT_RIGHT:
        return this.calculateParentRightPosition(context);
      case PositionValue.PARENT_TOP:
        return this.calculateParentTopPosition(context);
      case PositionValue.PARENT_BOTTOM:
        return this.calculateParentBottomPosition(context);
      case PositionValue.PARENT_CENTER_X:
        return this.calculateParentCenterXPosition(context);
      case PositionValue.PARENT_CENTER_Y:
        return this.calculateParentCenterYPosition(context);
      case PositionValue.SCENE_LEFT:
        return this.calculateSceneLeftPosition(context);
      case PositionValue.SCENE_RIGHT:
        return this.calculateSceneRightPosition(context);
      case PositionValue.SCENE_TOP:
        return this.calculateSceneTopPosition(context);
      case PositionValue.SCENE_BOTTOM:
        return this.calculateSceneBottomPosition(context);
      case PositionValue.SCENE_CENTER_X:
        return this.calculateSceneCenterXPosition(context);
      case PositionValue.SCENE_CENTER_Y:
        return this.calculateSceneCenterYPosition(context);
      case PositionValue.VIEWPORT_LEFT:
        return this.calculateViewportLeftPosition(context);
      case PositionValue.VIEWPORT_RIGHT:
        return this.calculateViewportRightPosition(context);
      case PositionValue.VIEWPORT_TOP:
        return this.calculateViewportTopPosition(context);
      case PositionValue.VIEWPORT_BOTTOM:
        return this.calculateViewportBottomPosition(context);
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
        return this.offset; // Default fallback
    }
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
    if (
      this.baseValue === PositionValue.PARENT_LEFT ||
      this.baseValue === PositionValue.PARENT_RIGHT ||
      this.baseValue === PositionValue.PARENT_TOP ||
      this.baseValue === PositionValue.PARENT_BOTTOM ||
      this.baseValue === PositionValue.PARENT_CENTER_X ||
      this.baseValue === PositionValue.PARENT_CENTER_Y
    ) {
      return !!context.parent;
    }
    if (
      this.baseValue === PositionValue.SCENE_LEFT ||
      this.baseValue === PositionValue.SCENE_RIGHT ||
      this.baseValue === PositionValue.SCENE_TOP ||
      this.baseValue === PositionValue.SCENE_BOTTOM ||
      this.baseValue === PositionValue.SCENE_CENTER_X ||
      this.baseValue === PositionValue.SCENE_CENTER_Y
    ) {
      return !!context.scene;
    }
    if (
      this.baseValue === PositionValue.VIEWPORT_LEFT ||
      this.baseValue === PositionValue.VIEWPORT_RIGHT ||
      this.baseValue === PositionValue.VIEWPORT_TOP ||
      this.baseValue === PositionValue.VIEWPORT_BOTTOM
    ) {
      return !!context.viewport;
    }
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

  // Private calculation methods
  private calculateCenterPosition(context: UnitContext): number {
    if (this.axis === Dimension.X) {
      return (context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE) / 2 + this.offset;
    }
    return (context.scene?.height ?? context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE) / 2 + this.offset;
  }

  private calculateLeftPosition(_context: UnitContext): number {
    return this.offset;
  }

  private calculateRightPosition(context: UnitContext): number {
    if (this.axis === Dimension.X) {
      return (context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE) + this.offset;
    }
    return this.offset;
  }

  private calculateTopPosition(_context: UnitContext): number {
    return this.offset;
  }

  private calculateBottomPosition(context: UnitContext): number {
    if (this.axis === Dimension.Y) {
      return (context.scene?.height ?? context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE) + this.offset;
    }
    return this.offset;
  }

  private calculateParentLeftPosition(context: UnitContext): number {
    return (context.parent?.x ?? 0) + this.offset;
  }

  private calculateParentRightPosition(context: UnitContext): number {
    return (context.parent?.x ?? 0) + (context.parent?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT) + this.offset;
  }

  private calculateParentTopPosition(context: UnitContext): number {
    return (context.parent?.y ?? 0) + this.offset;
  }

  private calculateParentBottomPosition(context: UnitContext): number {
    return (context.parent?.y ?? 0) + (context.parent?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT) + this.offset;
  }

  private calculateParentCenterXPosition(context: UnitContext): number {
    return (context.parent?.x ?? 0) + (context.parent?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT) / 2 + this.offset;
  }

  private calculateParentCenterYPosition(context: UnitContext): number {
    return (context.parent?.y ?? 0) + (context.parent?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT) / 2 + this.offset;
  }

  private calculateSceneLeftPosition(_context: UnitContext): number {
    return this.offset;
  }

  private calculateSceneRightPosition(context: UnitContext): number {
    if (this.axis === Dimension.X) {
      return (context.scene?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE) + this.offset;
    }
    return this.offset;
  }

  private calculateSceneTopPosition(_context: UnitContext): number {
    return this.offset;
  }

  private calculateSceneBottomPosition(context: UnitContext): number {
    if (this.axis === Dimension.Y) {
      return (context.scene?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE) + this.offset;
    }
    return this.offset;
  }

  private calculateSceneCenterXPosition(context: UnitContext): number {
    return (context.scene?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE) / 2 + this.offset;
  }

  private calculateSceneCenterYPosition(context: UnitContext): number {
    return (context.scene?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE) / 2 + this.offset;
  }

  private calculateViewportLeftPosition(_context: UnitContext): number {
    return this.offset;
  }

  private calculateViewportRightPosition(context: UnitContext): number {
    if (this.axis === Dimension.X) {
      return (context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.VIEWPORT) + this.offset;
    }
    return this.offset;
  }

  private calculateViewportTopPosition(_context: UnitContext): number {
    return this.offset;
  }

  private calculateViewportBottomPosition(context: UnitContext): number {
    if (this.axis === Dimension.Y) {
      return (context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.VIEWPORT) + this.offset;
    }
    return this.offset;
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
