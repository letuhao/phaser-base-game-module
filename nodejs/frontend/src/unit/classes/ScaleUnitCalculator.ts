import type { IScaleUnit } from '../interfaces/IScaleUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { UnitType } from '../enums/UnitType';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

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
    // First determine the base scale based on ScaleUnit (measurement type)
    let baseScale: number;
    switch (this.scaleUnit) {
      case ScaleUnit.FACTOR:
        baseScale =
          typeof this.baseValue === 'number'
            ? this.baseValue
            : DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
        break;
      case ScaleUnit.PERCENTAGE:
        baseScale =
          typeof this.baseValue === 'number'
            ? this.baseValue / 100
            : DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
        break;
      case ScaleUnit.PARENT_SCALE:
        baseScale = 1.0; // Default scale factor
        break;
      case ScaleUnit.PARENT_WIDTH_SCALE:
        baseScale = (context.parent?.width ?? 1) / (context.scene?.width ?? 1);
        break;
      case ScaleUnit.PARENT_HEIGHT_SCALE:
        baseScale = (context.parent?.height ?? 1) / (context.scene?.height ?? 1);
        break;
      case ScaleUnit.SCENE_SCALE:
        baseScale = 1.0; // Default scale factor
        break;
      case ScaleUnit.SCENE_WIDTH_SCALE:
        baseScale = (context.scene?.width ?? 1) / (context.viewport?.width ?? 1);
        break;
      case ScaleUnit.SCENE_HEIGHT_SCALE:
        baseScale = (context.scene?.height ?? 1) / (context.viewport?.height ?? 1);
        break;
      case ScaleUnit.VIEWPORT_SCALE:
        baseScale = 1.0; // Default scale factor
        break;
      case ScaleUnit.VIEWPORT_WIDTH_SCALE:
        baseScale = (context.viewport?.width ?? 1) / (context.scene?.width ?? 1);
        break;
      case ScaleUnit.VIEWPORT_HEIGHT_SCALE:
        baseScale = (context.viewport?.height ?? 1) / (context.scene?.height ?? 1);
        break;
      default:
        baseScale = DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
    }

    // Then apply the behavior based on ScaleValue
    return this.applyScaleValue(baseScale, context);
  }

  /**
   * Apply scale value behavior to base scale
   */
  private applyScaleValue(baseScale: number, context: UnitContext): number {
    // If baseValue is a ScaleValue enum, use it for behavior
    if (
      typeof this.baseValue === 'string' &&
      Object.values(ScaleValue).includes(this.baseValue as ScaleValue)
    ) {
      switch (this.baseValue as ScaleValue) {
        case ScaleValue.FIT:
          return this.applyConstraints(this.calculateFitScale(context));
        case ScaleValue.STRETCH:
          return this.applyConstraints(this.calculateStretchScale(context));
        case ScaleValue.FILL:
          return this.applyConstraints(this.calculateFillScale(context));
        case ScaleValue.MAINTAIN_ASPECT:
          return this.applyConstraints(this.calculateMaintainAspectScale(context));
        case ScaleValue.IGNORE_ASPECT:
          return this.applyConstraints(this.calculateIgnoreAspectScale(context));
        case ScaleValue.CONTENT_SCALE:
          return this.applyConstraints(this.calculateContentScale(context));
        case ScaleValue.INTRINSIC_SCALE:
          return this.applyConstraints(this.calculateIntrinsicScale(context));
        case ScaleValue.BREAKPOINT_SCALE:
          return this.applyConstraints(this.calculateBreakpointScale(context));
        case ScaleValue.DEVICE_SCALE:
          return this.applyConstraints(this.calculateDeviceScale(context));
        case ScaleValue.RANDOM:
          return this.applyConstraints(this.calculateRandomScale(context));
        default:
          return this.applyConstraints(baseScale);
      }
    }

    // If baseValue is a number, just return the base scale (direct value)
    return this.applyConstraints(baseScale);
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
    // Check if the scaleUnit requires specific context
    if (
      this.scaleUnit === ScaleUnit.PARENT_SCALE ||
      this.scaleUnit === ScaleUnit.PARENT_WIDTH_SCALE ||
      this.scaleUnit === ScaleUnit.PARENT_HEIGHT_SCALE
    ) {
      return !!context.parent;
    }
    if (
      this.scaleUnit === ScaleUnit.SCENE_SCALE ||
      this.scaleUnit === ScaleUnit.SCENE_WIDTH_SCALE ||
      this.scaleUnit === ScaleUnit.SCENE_HEIGHT_SCALE
    ) {
      return !!context.scene;
    }
    if (
      this.scaleUnit === ScaleUnit.VIEWPORT_SCALE ||
      this.scaleUnit === ScaleUnit.VIEWPORT_WIDTH_SCALE ||
      this.scaleUnit === ScaleUnit.VIEWPORT_HEIGHT_SCALE
    ) {
      return !!context.viewport;
    }
    // Check if the baseValue requires specific context
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
    const contentWidth = context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
    const contentHeight = context.content?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
    const availableWidth =
      context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
    const availableHeight =
      context.scene?.height ?? context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;

    const scaleX = availableWidth / contentWidth;
    const scaleY = availableHeight / contentHeight;

    if (this.maintainAspectRatio) {
      return Math.min(scaleX, scaleY);
    }
    return Math.min(scaleX, scaleY);
  }

  private calculateStretchScale(context: UnitContext): number {
    const contentWidth = context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
    const contentHeight = context.content?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
    const availableWidth =
      context.scene?.width ?? context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
    const availableHeight =
      context.scene?.height ?? context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;

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
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT; // Content-based scaling typically maintains original size
  }

  private calculateIntrinsicScale(_context: UnitContext): number {
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT; // Intrinsic scale is typically 1 (original size)
  }

  // private calculateParentScale(context: UnitContext): number {
  //   const parentWidth = context.parent?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  //   const parentHeight = context.parent?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  //   const contentWidth = context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
  //   const contentHeight = context.content?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;

  //   const scaleX = parentWidth / contentWidth;
  //   const scaleY = parentHeight / contentHeight;

  //   if (this.maintainAspectRatio) {
  //     return Math.min(scaleX, scaleY);
  //   }
  //   return Math.min(scaleX, scaleY);
  // }

  // private calculateParentWidthScale(context: UnitContext): number {
  //   const parentWidth = context.parent?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  //   const contentWidth = context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
  //   return parentWidth / contentWidth;
  // }

  // private calculateParentHeightScale(context: UnitContext): number {
  //   const parentHeight = context.parent?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  //   const contentHeight = context.content?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
  //   return parentHeight / contentHeight;
  // }

  // private calculateSceneScale(context: UnitContext): number {
  //   const sceneWidth = context.scene?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
  //   const sceneHeight = context.scene?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
  //   const contentWidth = context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
  //   const contentHeight = context.content?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;

  //   const scaleX = sceneWidth / contentWidth;
  //   const scaleY = sceneHeight / contentHeight;

  //   if (this.maintainAspectRatio) {
  //     return Math.min(scaleX, scaleY);
  //   }
  //   return Math.min(scaleX, scaleY);
  // }

  // private calculateSceneWidthScale(context: UnitContext): number {
  //   const sceneWidth = context.scene?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
  //   const contentWidth = context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
  //   return sceneWidth / contentWidth;
  // }

  // private calculateSceneHeightScale(context: UnitContext): number {
  //   const sceneHeight = context.scene?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.SCENE;
  //   const contentHeight = context.content?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
  //   return sceneHeight / contentHeight;
  // }

  // private calculateViewportScale(context: UnitContext): number {
  //   const viewportWidth = context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.VIEWPORT;
  //   const viewportHeight = context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.VIEWPORT;
  //   const contentWidth = context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
  //   const contentHeight = context.content?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;

  //   const scaleX = viewportWidth / contentWidth;
  //   const scaleY = viewportHeight / contentHeight;

  //   if (this.maintainAspectRatio) {
  //     return Math.min(scaleX, scaleY);
  //   }
  //   return Math.min(scaleX, scaleY);
  // }

  // private calculateViewportWidthScale(context: UnitContext): number {
  //   const viewportWidth = context.viewport?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.VIEWPORT;
  //   const contentWidth = context.content?.width ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
  //   return viewportWidth / contentWidth;
  // }

  // private calculateViewportHeightScale(context: UnitContext): number {
  //   const viewportHeight = context.viewport?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.VIEWPORT;
  //   const contentHeight = context.content?.height ?? DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
  //   return viewportHeight / contentHeight;
  // }

  private calculateRandomScale(_context: UnitContext): number {
    const min = this.minScale ?? DEFAULT_FALLBACK_VALUES.SCALE.RANDOM_MIN;
    const max = this.maxScale ?? DEFAULT_FALLBACK_VALUES.SCALE.RANDOM_MAX;
    return Math.random() * (max - min) + min;
  }

  private calculateBreakpointScale(_context: UnitContext): number {
    // Breakpoint-based scaling could be implemented based on breakpoint rules
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  private calculateDeviceScale(_context: UnitContext): number {
    // Device-based scaling could be implemented based on device capabilities
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
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

  /**
   * Check if the scale has constraints
   */
  hasConstraints(): boolean {
    return this.minScale !== undefined || this.maxScale !== undefined;
  }

  /**
   * Get constraint information
   */
  getConstraintInfo(): { min?: number; max?: number; hasConstraints: boolean } {
    return {
      min: this.minScale,
      max: this.maxScale,
      hasConstraints: this.hasConstraints(),
    };
  }

  /**
   * Validate if scale value is within constraints
   */
  validateScale(value: number): boolean {
    if (this.minScale !== undefined && value < this.minScale) {
      return false;
    }
    if (this.maxScale !== undefined && value > this.maxScale) {
      return false;
    }
    return true;
  }

  /**
   * Get scale information for debugging
   */
  getScaleInfo(): {
    scaleUnit: ScaleUnit;
    maintainAspectRatio: boolean;
    uniformScaling: boolean;
    hasConstraints: boolean;
    isResponsive: boolean;
  } {
    return {
      scaleUnit: this.scaleUnit,
      maintainAspectRatio: this.maintainAspectRatio,
      uniformScaling: this.uniformScaling,
      hasConstraints: this.hasConstraints(),
      isResponsive: this.isResponsive(),
    };
  }

  /**
   * Calculate the optimal scale for a given content and container
   */
  calculateOptimalScale(
    contentWidth: number,
    contentHeight: number,
    containerWidth: number,
    containerHeight: number
  ): number {
    const scaleX = containerWidth / contentWidth;
    const scaleY = containerHeight / contentHeight;

    if (this.maintainAspectRatio) {
      return Math.min(scaleX, scaleY);
    }
    return Math.min(scaleX, scaleY);
  }
}
