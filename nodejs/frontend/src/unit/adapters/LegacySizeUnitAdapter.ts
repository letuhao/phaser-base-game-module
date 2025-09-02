import { BaseUnitAdapter } from './IUnitAdapter';
import { ILegacyUnit } from '../interfaces/ILegacyUnit';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { UnitContext } from '../interfaces/IUnit';
import { UnitType } from '../enums/UnitType';

/**
 * Adapter for legacy size units to modern unit system
 */
export class LegacySizeUnitAdapter extends BaseUnitAdapter<ILegacyUnit> {
  constructor(id: string, name: string, adaptedUnit: ILegacyUnit) {
    super(id, name, UnitType.SIZE, adaptedUnit);
  }

  calculate(context: UnitContext): number {
    const legacyValue = this.extractLegacyValue();
    const legacyUnit = this.extractLegacyUnit();
    const dimension = this.extractLegacyDimension();

    if (legacyValue === null || legacyUnit === null) {
      return 0;
    }

    // Convert legacy unit to pixels
    const pixelValue = this.convertUnitToPixels(legacyUnit, legacyValue, context);

    // Apply dimension-specific logic
    if (dimension === Dimension.WIDTH) {
      return this.constrainWidth(pixelValue, context);
    } else if (dimension === Dimension.HEIGHT) {
      return this.constrainHeight(pixelValue, context);
    }

    return pixelValue;
  }

  isResponsive(): boolean {
    const unit = this.extractLegacyUnit();
    return (
      unit === SizeUnit.PARENT_WIDTH ||
      unit === SizeUnit.PARENT_HEIGHT ||
      unit === SizeUnit.VIEWPORT_WIDTH ||
      unit === SizeUnit.VIEWPORT_HEIGHT
    );
  }

  canAdapt(unit: ILegacyUnit): boolean {
    return (
      this.hasSizeProperty(unit) || this.hasWidthProperty(unit) || this.hasHeightProperty(unit)
    );
  }

  getLegacyTypeName(): string {
    return 'LegacySizeUnit';
  }

  getConversionFactor(): number {
    return this.conversionFactor;
  }

  isBidirectional(): boolean {
    return this.bidirectional;
  }

  protected convertToLegacyFormat(): ILegacyUnit {
    return {
      ...this.adaptedUnit,
      metadata: {
        ...this.adaptedUnit.metadata,
        legacyType: 'size',
        convertedAt: new Date().toISOString(),
      },
    };
  }

  private extractLegacyValue(): number | null {
    // Check for size property
    if (typeof (this.adaptedUnit as any).size === 'number') {
      return (this.adaptedUnit as any).size;
    }

    // Check for width property
    if (typeof (this.adaptedUnit as any).width === 'number') {
      return (this.adaptedUnit as any).width;
    }

    // Check for height property
    if (typeof (this.adaptedUnit as any).height === 'number') {
      return (this.adaptedUnit as any).height;
    }

    // Check for baseValue property
    if (typeof (this.adaptedUnit as any).baseValue === 'number') {
      return (this.adaptedUnit as any).baseValue;
    }

    return null;
  }

  private extractLegacyUnit(): string | null {
    // Check for unit property
    if ((this.adaptedUnit as any).unit) {
      return (this.adaptedUnit as any).unit;
    }

    // Check for sizeUnit property
    if ((this.adaptedUnit as any).sizeUnit) {
      return (this.adaptedUnit as any).sizeUnit;
    }

    return SizeUnit.PIXEL; // Default to pixels
  }

  private extractLegacyDimension(): Dimension | null {
    // Check for dimension property
    if ((this.adaptedUnit as any).dimension) {
      return (this.adaptedUnit as any).dimension;
    }

    // Check for axis property
    if ((this.adaptedUnit as any).axis) {
      return (this.adaptedUnit as any).axis;
    }

    // Infer from property names
    if ((this.adaptedUnit as any).width !== undefined) {
      return Dimension.WIDTH;
    }

    if ((this.adaptedUnit as any).height !== undefined) {
      return Dimension.HEIGHT;
    }

    return null;
  }

  private convertUnitToPixels(unit: string, value: number, context: UnitContext): number {
    switch (unit.toLowerCase()) {
      case SizeUnit.PIXEL.toLowerCase():
        return value;
      case SizeUnit.PARENT_WIDTH.toLowerCase():
        return this.convertPercentToPixels(value, context);
      case SizeUnit.PARENT_HEIGHT.toLowerCase():
        return this.convertPercentToPixels(value, context);
      case SizeUnit.VIEWPORT_WIDTH.toLowerCase():
        return this.convertVwToPixels(value, context);
      case SizeUnit.VIEWPORT_HEIGHT.toLowerCase():
        return this.convertVhToPixels(value, context);
      case 'percent': // Fallback for legacy support
        return this.convertPercentToPixels(value, context);
      default:
        return value; // Default to pixels
    }
  }

  private convertPercentToPixels(percent: number, context: UnitContext): number {
    const parentWidth = context.parent?.width || 800;
    return (percent / 100) * parentWidth;
  }

  private convertVwToPixels(vw: number, context: UnitContext): number {
    const parentWidth = context.parent?.width || 800;
    return (vw / 100) * parentWidth;
  }

  private convertVhToPixels(vh: number, context: UnitContext): number {
    const parentHeight = context.parent?.height || 600;
    return (vh / 100) * parentHeight;
  }

  private constrainWidth(width: number, context: UnitContext): number {
    const maxWidth = context.parent?.width || Infinity;
    const minWidth = 0;
    return Math.max(minWidth, Math.min(width, maxWidth));
  }

  private constrainHeight(height: number, context: UnitContext): number {
    const maxHeight = context.parent?.height || Infinity;
    const minHeight = 0;
    return Math.max(minHeight, Math.min(height, maxHeight));
  }

  private hasSizeProperty(unit: ILegacyUnit): boolean {
    return typeof (unit as any).size === 'number';
  }

  private hasWidthProperty(unit: ILegacyUnit): boolean {
    return typeof (unit as any).width === 'number';
  }

  private hasHeightProperty(unit: ILegacyUnit): boolean {
    return typeof (unit as any).height === 'number';
  }
}
