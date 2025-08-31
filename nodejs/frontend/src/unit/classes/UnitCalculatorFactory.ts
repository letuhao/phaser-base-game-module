import type { IUnit } from '../interfaces/IUnit';
import type { ISizeUnit } from '../interfaces/ISizeUnit';
import type { IPositionUnit } from '../interfaces/IPositionUnit';
import type { IScaleUnit } from '../interfaces/IScaleUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { SizeUnitCalculator } from './SizeUnitCalculator';
import { PositionUnitCalculator } from './PositionUnitCalculator';
import { ScaleUnitCalculator } from './ScaleUnitCalculator';
import { SizeUnit } from '../enums/SizeUnit';
import { PositionUnit } from '../enums/PositionUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { PositionValue } from '../enums/PositionValue';
import { ScaleValue } from '../enums/ScaleValue';
import { UnitType } from '../enums/UnitType';
import type { IUnitConfig } from '../interfaces/IUnitConfig';
import { isSizeUnitConfig, isPositionUnitConfig, isScaleUnitConfig } from '../interfaces/IUnitConfig';

/**
 * UnitCalculatorFactory class
 * Provides factory methods for creating different types of unit calculators
 */
export class UnitCalculatorFactory {
  private static instance: UnitCalculatorFactory;
  private calculators: Map<string, IUnit> = new Map();

  private constructor() {}

  /**
   * Get singleton instance
   */
  static getInstance(): UnitCalculatorFactory {
    if (!UnitCalculatorFactory.instance) {
      UnitCalculatorFactory.instance = new UnitCalculatorFactory();
    }
    return UnitCalculatorFactory.instance;
  }

  /**
   * Create a size unit calculator
   */
  createSizeUnit(
    id: string,
    name: string,
    sizeUnit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
    baseValue: number | SizeValue,
    maintainAspectRatio: boolean = false
  ): ISizeUnit {
    const calculator = new SizeUnitCalculator(
      id,
      name,
      sizeUnit,
      dimension,
      baseValue,
      maintainAspectRatio
    );

    this.calculators.set(id, calculator);
    return calculator;
  }

  /**
   * Create a position unit calculator
   */
  createPositionUnit(
    id: string,
    name: string,
    positionUnit: PositionUnit,
    axis: Dimension.X | Dimension.Y | Dimension.XY,
    baseValue: number | PositionValue
  ): IPositionUnit {
    const calculator = new PositionUnitCalculator(id, name, positionUnit, axis, baseValue);

    this.calculators.set(id, calculator);
    return calculator;
  }

  /**
   * Create a scale unit calculator
   */
  createScaleUnit(
    id: string,
    name: string,
    scaleUnit: ScaleUnit,
    baseValue: number | ScaleValue,
    maintainAspectRatio: boolean = false
  ): IScaleUnit {
    const calculator = new ScaleUnitCalculator(id, name, scaleUnit, baseValue, maintainAspectRatio);

    this.calculators.set(id, calculator);
    return calculator;
  }

  /**
   * Create a unit calculator based on type
   */
  createUnit(type: UnitType, id: string, name: string, config: IUnitConfig): IUnit {
    switch (type) {
      case UnitType.SIZE:
        if (!isSizeUnitConfig(config)) {
          throw new Error(`Invalid config for size unit: ${id}`);
        }
        return this.createSizeUnit(
          id,
          name,
          config.sizeUnit ?? SizeUnit.PIXEL,
          config.dimension ?? Dimension.WIDTH,
          config.baseValue,
          config.maintainAspectRatio ?? false
        );

      case UnitType.POSITION:
        if (!isPositionUnitConfig(config)) {
          throw new Error(`Invalid config for position unit: ${id}`);
        }
        return this.createPositionUnit(
          id,
          name,
          config.positionUnit ?? PositionUnit.PIXEL,
          config.axis ?? Dimension.X,
          config.baseValue
        );

      case UnitType.SCALE:
        if (!isScaleUnitConfig(config)) {
          throw new Error(`Invalid config for scale unit: ${id}`);
        }
        return this.createScaleUnit(
          id,
          name,
          config.scaleUnit ?? ScaleUnit.FACTOR,
          config.baseValue,
          config.maintainAspectRatio ?? false
        );

      default:
        throw new Error(`Unknown unit type: ${type}`);
    }
  }

  /**
   * Create a size unit from configuration
   */
  createSizeUnitFromConfig(config: {
    id: string;
    name: string;
    sizeUnit?: SizeUnit;
    dimension?: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH;
    baseValue: number | SizeValue;
    maintainAspectRatio?: boolean;
    minSize?: number;
    maxSize?: number;
  }): ISizeUnit {
    const calculator = this.createSizeUnit(
      config.id,
      config.name,
      config.sizeUnit ?? SizeUnit.PIXEL,
      config.dimension ?? Dimension.WIDTH,
      config.baseValue,
      config.maintainAspectRatio ?? false
    );

    if (config.minSize !== undefined || config.maxSize !== undefined) {
      calculator.setSizeConstraints(config.minSize, config.maxSize);
    }

    return calculator;
  }

  /**
   * Create a position unit from configuration
   */
  createPositionUnitFromConfig(config: {
    id: string;
    name: string;
    positionUnit?: PositionUnit;
    axis?: Dimension.X | Dimension.Y | Dimension.XY;
    baseValue: number | PositionValue;
    alignment?: string;
    offset?: number;
  }): IPositionUnit {
    const calculator = this.createPositionUnit(
      config.id,
      config.name,
      config.positionUnit ?? PositionUnit.PIXEL,
      config.axis ?? Dimension.X,
      config.baseValue
    );

    if (config.alignment) {
      calculator.setAlignment(config.alignment);
    }

    if (config.offset !== undefined) {
      calculator.setOffset(config.offset);
    }

    return calculator;
  }

  /**
   * Create a scale unit from configuration
   */
  createScaleUnitFromConfig(config: {
    id: string;
    name: string;
    scaleUnit?: ScaleUnit;
    baseValue: number | ScaleValue;
    maintainAspectRatio?: boolean;
    minScale?: number;
    maxScale?: number;
    uniformScaling?: boolean;
  }): IScaleUnit {
    const calculator = this.createScaleUnit(
      config.id,
      config.name,
      config.scaleUnit ?? ScaleUnit.FACTOR,
      config.baseValue,
      config.maintainAspectRatio ?? false
    );

    if (config.minScale !== undefined || config.maxScale !== undefined) {
      calculator.setScaleConstraints(config.minScale, config.maxScale);
    }

    if (config.uniformScaling !== undefined) {
      calculator.setUniformScaling(config.uniformScaling);
    }

    return calculator;
  }

  /**
   * Get a calculator by ID
   */
  getCalculator(id: string): IUnit | undefined {
    return this.calculators.get(id);
  }

  /**
   * Get all calculators
   */
  getAllCalculators(): IUnit[] {
    return Array.from(this.calculators.values());
  }

  /**
   * Get calculators by type
   */
  getCalculatorsByType(type: UnitType): IUnit[] {
    return this.getAllCalculators().filter(calc => calc.unitType === type);
  }

  /**
   * Remove a calculator
   */
  removeCalculator(id: string): boolean {
    return this.calculators.delete(id);
  }

  /**
   * Clear all calculators
   */
  clearCalculators(): void {
    this.calculators.clear();
  }

  /**
   * Validate all calculators in a given context
   */
  validateAllCalculators(context: UnitContext): { valid: IUnit[]; invalid: IUnit[] } {
    const valid: IUnit[] = [];
    const invalid: IUnit[] = [];

    for (const calculator of Array.from(this.calculators.values())) {
      if (calculator.validate(context)) {
        valid.push(calculator);
      } else {
        invalid.push(calculator);
      }
    }

    return { valid, invalid };
  }

  /**
   * Get calculator statistics
   */
  getCalculatorStats(): {
    total: number;
    byType: Record<UnitType, number>;
    responsive: number;
    staticCount: number;
  } {
    const calculators = this.getAllCalculators();
    const byType: Record<UnitType, number> = {
      [UnitType.SIZE]: 0,
      [UnitType.POSITION]: 0,
      [UnitType.SCALE]: 0,
    };

    let responsive = 0;
    let staticCount = 0;

    for (const calc of calculators) {
      byType[calc.unitType]++;
      if (calc.isResponsive()) {
        responsive++;
      } else {
        staticCount++;
      }
    }

    return {
      total: calculators.length,
      byType,
      responsive,
      staticCount,
    };
  }
}
