import { BaseUnitAdapter } from './IUnitAdapter';
import { ILegacyUnit } from '../interfaces/ILegacyUnit';
import { PositionUnit } from '../enums/PositionUnit';
import { Dimension } from '../enums/Dimension';
import { UnitContext } from '../interfaces/IUnit';
import { UnitType } from '../enums/UnitType';

/**
 * Adapter for legacy position units to modern unit system
 */
export class LegacyPositionUnitAdapter extends BaseUnitAdapter<ILegacyUnit> {
  constructor(
    id: string,
    name: string,
    adaptedUnit: ILegacyUnit
  ) {
    super(id, name, UnitType.POSITION, adaptedUnit);
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
      return this.constrainX(pixelValue, context);
    } else if (dimension === Dimension.HEIGHT) {
      return this.constrainY(pixelValue, context);
    }

    return pixelValue;
  }

  isResponsive(): boolean {
    const unit = this.extractLegacyUnit();
    return unit === PositionUnit.PARENT_LEFT || unit === PositionUnit.PARENT_TOP || 
           unit === PositionUnit.VIEWPORT_LEFT || unit === PositionUnit.VIEWPORT_TOP;
  }

  canAdapt(unit: ILegacyUnit): boolean {
    return this.hasPositionProperty(unit) || this.hasXProperty(unit) || this.hasYProperty(unit);
  }

  getLegacyTypeName(): string {
    return 'LegacyPositionUnit';
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
        legacyType: 'position',
        convertedAt: new Date().toISOString()
      }
    };
  }

  private extractLegacyValue(): number | null {
    // Check for position property
    if (typeof (this.adaptedUnit as any).position === 'number') {
      return (this.adaptedUnit as any).position;
    }

    // Check for x property
    if (typeof (this.adaptedUnit as any).x === 'number') {
      return (this.adaptedUnit as any).x;
    }

    // Check for y property
    if (typeof (this.adaptedUnit as any).y === 'number') {
      return (this.adaptedUnit as any).y;
    }

    // Check for baseValue property
    if (typeof (this.adaptedUnit as any).baseValue === 'number') {
      return (this.adaptedUnit as any).baseValue;
    }

    // Check for offset property
    if (typeof (this.adaptedUnit as any).offset === 'number') {
      return (this.adaptedUnit as any).offset;
    }

    return null;
  }

  private extractLegacyUnit(): string | null {
    // Check for unit property
    if ((this.adaptedUnit as any).unit) {
      return (this.adaptedUnit as any).unit;
    }

    // Check for positionUnit property
    if ((this.adaptedUnit as any).positionUnit) {
      return (this.adaptedUnit as any).positionUnit;
    }

    return PositionUnit.PIXEL; // Default to pixels
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
    if ((this.adaptedUnit as any).x !== undefined) {
      return Dimension.WIDTH;
    }

    if ((this.adaptedUnit as any).y !== undefined) {
      return Dimension.HEIGHT;
    }

    return null;
  }

  private convertUnitToPixels(unit: string, value: number, context: UnitContext): number {
    switch (unit.toLowerCase()) {
      case PositionUnit.PIXEL.toLowerCase():
        return value;
      case PositionUnit.PARENT_LEFT.toLowerCase():
        return this.convertLeftToPixels(value, context);
      case PositionUnit.PARENT_TOP.toLowerCase():
        return this.convertTopToPixels(value, context);
      case PositionUnit.VIEWPORT_LEFT.toLowerCase():
        return this.convertVwToPixels(value, context);
      case PositionUnit.VIEWPORT_TOP.toLowerCase():
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

  private convertLeftToPixels(offset: number, context: UnitContext): number {
    const parentWidth = context.parent?.width || 800;
    return (offset / 100) * parentWidth;
  }

  private convertTopToPixels(offset: number, context: UnitContext): number {
    const parentHeight = context.parent?.height || 600;
    return (offset / 100) * parentHeight;
  }

  private convertVwToPixels(vw: number, context: UnitContext): number {
    const parentWidth = context.parent?.width || 800;
    return (vw / 100) * parentWidth;
  }

  private convertVhToPixels(vh: number, context: UnitContext): number {
    const parentHeight = context.parent?.height || 600;
    return (vh / 100) * parentHeight;
  }

  private constrainX(x: number, context: UnitContext): number {
    const maxX = context.parent?.width || Infinity;
    const minX = 0;
    return Math.max(minX, Math.min(x, maxX));
  }

  private constrainY(y: number, context: UnitContext): number {
    const maxY = context.parent?.height || Infinity;
    const minY = 0;
    return Math.max(minY, Math.min(y, maxY));
  }

  private hasPositionProperty(unit: ILegacyUnit): boolean {
    return typeof (unit as any).position === 'number';
  }

  private hasXProperty(unit: ILegacyUnit): boolean {
    return typeof (unit as any).x === 'number';
  }

  private hasYProperty(unit: ILegacyUnit): boolean {
    return typeof (unit as any).y === 'number';
  }
}
