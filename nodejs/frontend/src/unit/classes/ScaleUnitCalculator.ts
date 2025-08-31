import type { IScaleUnit } from '../interfaces/IScaleUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { UnitType } from '../enums/UnitType';

/**
 * ScaleUnitCalculator class
 * Implements scale unit calculations for responsive scaling
 */
export class ScaleUnitCalculator implements IScaleUnit {
  public readonly id: string;
  public readonly name: string;
  public readonly unitType: UnitType = UnitType.SCALE;
  public readonly scaleUnit: ScaleUnit;
  public readonly baseValue: number | ScaleValue;
  public readonly maintainAspectRatio: boolean;
  public readonly isActive: boolean = true;

  private minScale?: number;
  private maxScale?: number;
  private uniformScaling: boolean = false;

  constructor(
    id: string,
    name: string,
    scaleUnit: ScaleUnit,
    baseValue: number | ScaleValue,
    maintainAspectRatio: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.scaleUnit = scaleUnit;
    this.baseValue = baseValue;
    this.maintainAspectRatio = maintainAspectRatio;
  }

  /**
   * Calculate the actual scale value based on context
   */
  calculate(context: UnitContext): number {
    return this.calculateScale(context);
  }

  /**
   * Calculate scale based on context
   */
  calculateScale(context: UnitContext): number {
    if (typeof this.baseValue === 'number') {
      return this.applyConstraints(this.baseValue);
    }

    switch (this.baseValue) {
      case ScaleValue.FIT:
        return this.calculateFitScale(context);
      case ScaleValue.STRETCH:
        return this.calculateStretchScale(context);
      case ScaleValue.FILL:
        return this.calculateFillScale(context);
      case ScaleValue.MAINTAIN_ASPECT:
        return this.calculateMaintainAspectScale(context);
      case ScaleValue.IGNORE_ASPECT:
        return this.calculateIgnoreAspectScale(context);
      case ScaleValue.CONTENT_SCALE:
        return this.calculateContentScale(context);
      case ScaleValue.INTRINSIC_SCALE:
        return this.calculateIntrinsicScale(context);
      case ScaleValue.PARENT_SCALE:
        return this.calculateParentScale(context);
      case ScaleValue.PARENT_WIDTH_SCALE:
        return this.calculateParentWidthScale(context);
      case ScaleValue.PARENT_HEIGHT_SCALE:
        return this.calculateParentHeightScale(context);
      case ScaleValue.SCENE_SCALE:
        return this.calculateSceneScale(context);
      case ScaleValue.SCENE_WIDTH_SCALE:
        return this.calculateSceneWidthScale(context);
      case ScaleValue.SCENE_HEIGHT_SCALE:
        return this.calculateSceneHeightScale(context);
      case ScaleValue.VIEWPORT_SCALE:
        return this.calculateViewportScale(context);
      case ScaleValue.VIEWPORT_WIDTH_SCALE:
        return this.calculateViewportWidthScale(context);
      case ScaleValue.VIEWPORT_HEIGHT_SCALE:
        return this.calculateViewportHeightScale(context);
      case ScaleValue.RANDOM:
        return this.calculateRandomScale(context);
      case ScaleValue.BREAKPOINT_SCALE:
        return this.calculateBreakpointScale(context);
      case ScaleValue.DEVICE_SCALE:
        return this.calculateDeviceScale(context);
      default:
        return this.applyConstraints(1); // Default fallback
    }
  }

  /**
   * Calculate X scale specifically
   */
  calculateScaleX(context: UnitContext): number {
    if (this.uniformScaling) {
      return this.calculateScale(context);
    }
    return this.calculateScale(context);
  }

  /**
   * Calculate Y scale specifically
   */
  calculateScaleY(context: UnitContext): number {
    if (this.uniformScaling) {
      return this.calculateScale(context);
    }
    return this.calculateScale(context);
  }

  /**
   * Calculate both X and Y scales
   */
  calculateBoth(context: UnitContext): { scaleX: number; scaleY: number } {
    const scale = this.calculateScale(context);
    return { scaleX: scale, scaleY: scale };
  }

  /**
   * Check if the unit is responsive
   */
  isResponsive(): boolean {
    return typeof this.baseValue !== 'number';
  }

  /**
   * Get minimum scale constraint
   */
  getMinScale(): number | undefined {
    return this.minScale;
  }

  /**
   * Get maximum scale constraint
   */
  getMaxScale(): number | undefined {
    return this.maxScale;
  }

  /**
   * Set scale constraints
   */
  setScaleConstraints(min?: number, max?: number): void {
    this.minScale = min;
    this.maxScale = max;
  }

  /**
   * Check if scaling should be uniform
   */
  isUniformScaling(): boolean {
    return this.uniformScaling;
  }

  /**
   * Set uniform scaling mode
   */
  setUniformScaling(uniform: boolean): void {
    this.uniformScaling = uniform;
  }

  /**
   * Validate unit in given context
   */
  validate(context: UnitContext): boolean {
    if (
      this.baseValue === ScaleValue.PARENT_SCALE ||
      this.baseValue === ScaleValue.PARENT_WIDTH_SCALE ||
      this.baseValue === ScaleValue.PARENT_HEIGHT_SCALE
    ) {
      return !!context.parent;
    }
    if (
      this.baseValue === ScaleValue.SCENE_SCALE ||
      this.baseValue === ScaleValue.SCENE_WIDTH_SCALE ||
      this.baseValue === ScaleValue.SCENE_HEIGHT_SCALE
    ) {
      return !!context.scene;
    }
    if (
      this.baseValue === ScaleValue.VIEWPORT_SCALE ||
      this.baseValue === ScaleValue.VIEWPORT_WIDTH_SCALE ||
      this.baseValue === ScaleValue.VIEWPORT_HEIGHT_SCALE
    ) {
      return !!context.viewport;
    }
    if (
      this.baseValue === ScaleValue.CONTENT_SCALE ||
      this.baseValue === ScaleValue.INTRINSIC_SCALE
    ) {
      return !!context.content;
    }
    if (this.baseValue === ScaleValue.BREAKPOINT_SCALE) {
      return !!context.breakpoint;
    }
    return true;
  }

  /**
   * Get string representation
   */
  toString(): string {
    return `ScaleUnitCalculator(${this.name}, ${this.scaleUnit})`;
  }

  /**
   * Clone the unit with optional modifications
   */
  clone(overrides?: Partial<IScaleUnit>): ScaleUnitCalculator {
    const cloned = new ScaleUnitCalculator(
      overrides?.id ?? this.id,
      overrides?.name ?? this.name,
      overrides?.scaleUnit ?? this.scaleUnit,
      overrides?.baseValue ?? this.baseValue,
      overrides?.maintainAspectRatio ?? this.maintainAspectRatio
    );

    if (this.minScale !== undefined) cloned.setScaleConstraints(this.minScale, this.maxScale);
    cloned.setUniformScaling(this.uniformScaling);
    return cloned;
  }

  // Private calculation methods
  private calculateFitScale(context: UnitContext): number {
    const contentWidth = context.content?.width ?? 100;
    const contentHeight = context.content?.height ?? 100;
    const availableWidth = context.scene?.width ?? context.viewport?.width ?? 800;
    const availableHeight = context.scene?.height ?? context.viewport?.height ?? 600;

    const scaleX = availableWidth / contentWidth;
    const scaleY = availableHeight / contentHeight;

    if (this.maintainAspectRatio) {
      return Math.min(scaleX, scaleY);
    }
    return Math.min(scaleX, scaleY);
  }

  private calculateStretchScale(context: UnitContext): number {
    const contentWidth = context.content?.width ?? 100;
    const contentHeight = context.content?.height ?? 100;
    const availableWidth = context.scene?.width ?? context.viewport?.width ?? 800;
    const availableHeight = context.scene?.height ?? context.viewport?.height ?? 600;

    const scaleX = availableWidth / contentWidth;
    const scaleY = availableHeight / contentHeight;

    if (this.maintainAspectRatio) {
      return Math.max(scaleX, scaleY);
    }
    return Math.max(scaleX, scaleY);
  }

  private calculateFillScale(context: UnitContext): number {
    return this.calculateStretchScale(context);
  }

  private calculateMaintainAspectScale(context: UnitContext): number {
    return this.calculateFitScale(context);
  }

  private calculateIgnoreAspectScale(context: UnitContext): number {
    return this.calculateStretchScale(context);
  }

  private calculateContentScale(_context: UnitContext): number {
    return 1; // Content-based scaling typically maintains original size
  }

  private calculateIntrinsicScale(_context: UnitContext): number {
    return 1; // Intrinsic scale is typically 1 (original size)
  }

  private calculateParentScale(context: UnitContext): number {
    const parentWidth = context.parent?.width ?? 100;
    const parentHeight = context.parent?.height ?? 100;
    const contentWidth = context.content?.width ?? 100;
    const contentHeight = context.content?.height ?? 100;

    const scaleX = parentWidth / contentWidth;
    const scaleY = parentHeight / contentHeight;

    if (this.maintainAspectRatio) {
      return Math.min(scaleX, scaleY);
    }
    return Math.min(scaleX, scaleY);
  }

  private calculateParentWidthScale(context: UnitContext): number {
    const parentWidth = context.parent?.width ?? 100;
    const contentWidth = context.content?.width ?? 100;
    return parentWidth / contentWidth;
  }

  private calculateParentHeightScale(context: UnitContext): number {
    const parentHeight = context.parent?.height ?? 100;
    const contentHeight = context.content?.height ?? 100;
    return parentHeight / contentHeight;
  }

  private calculateSceneScale(context: UnitContext): number {
    const sceneWidth = context.scene?.width ?? 800;
    const sceneHeight = context.scene?.height ?? 600;
    const contentWidth = context.content?.width ?? 100;
    const contentHeight = context.content?.height ?? 100;

    const scaleX = sceneWidth / contentWidth;
    const scaleY = sceneHeight / contentHeight;

    if (this.maintainAspectRatio) {
      return Math.min(scaleX, scaleY);
    }
    return Math.min(scaleX, scaleY);
  }

  private calculateSceneWidthScale(context: UnitContext): number {
    const sceneWidth = context.scene?.width ?? 800;
    const contentWidth = context.content?.width ?? 100;
    return sceneWidth / contentWidth;
  }

  private calculateSceneHeightScale(context: UnitContext): number {
    const sceneHeight = context.scene?.height ?? 600;
    const contentHeight = context.content?.height ?? 100;
    return sceneHeight / contentHeight;
  }

  private calculateViewportScale(context: UnitContext): number {
    const viewportWidth = context.viewport?.width ?? 800;
    const viewportHeight = context.viewport?.height ?? 600;
    const contentWidth = context.content?.width ?? 100;
    const contentHeight = context.content?.height ?? 100;

    const scaleX = viewportWidth / contentWidth;
    const scaleY = viewportHeight / contentHeight;

    if (this.maintainAspectRatio) {
      return Math.min(scaleX, scaleY);
    }
    return Math.min(scaleX, scaleY);
  }

  private calculateViewportWidthScale(context: UnitContext): number {
    const viewportWidth = context.viewport?.width ?? 800;
    const contentWidth = context.content?.width ?? 100;
    return viewportWidth / contentWidth;
  }

  private calculateViewportHeightScale(context: UnitContext): number {
    const viewportHeight = context.viewport?.height ?? 600;
    const contentHeight = context.content?.height ?? 100;
    return viewportHeight / contentHeight;
  }

  private calculateRandomScale(_context: UnitContext): number {
    const min = this.minScale ?? 0.5;
    const max = this.maxScale ?? 2.0;
    return Math.random() * (max - min) + min;
  }

  private calculateBreakpointScale(_context: UnitContext): number {
    // Breakpoint-based scaling could be implemented based on breakpoint rules
    return 1;
  }

  private calculateDeviceScale(_context: UnitContext): number {
    // Device-based scaling could be implemented based on device capabilities
    return 1;
  }

  private applyConstraints(value: number): number {
    if (this.minScale !== undefined && value < this.minScale) {
      return this.minScale;
    }
    if (this.maxScale !== undefined && value > this.maxScale) {
      return this.maxScale;
    }
    return value;
  }
}
