import { BaseUnitComposite } from './IUnitComposite';
import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import { UnitType } from '../enums/UnitType';
import { CalculationStrategy } from '../enums/CalculationStrategy';
import { Logger } from '../../core/Logger';

/**
 * Unit Group Composite
 * Groups multiple units together and manages their collective behavior
 */
export class UnitGroupComposite extends BaseUnitComposite {
  private calculationStrategy: CalculationStrategy = CalculationStrategy.SUM;
  private customCalculator?: (results: number[]) => number;
  private readonly logger: Logger;

  constructor(
    id: string,
    name: string,
    baseValue: number = 0,
    calculationStrategy: CalculationStrategy = CalculationStrategy.SUM
  ) {
    super(id, name, UnitType.SIZE, baseValue);
    this.calculationStrategy = calculationStrategy;
    this.logger = Logger.getInstance();
  }

  calculate(context: UnitContext): number {
    if (!this.hasChildren()) {
      return this.baseValue;
    }

    // Calculate results for all children
    const results: number[] = [];
    for (const child of this.getChildren()) {
      if (child.isActive) {
        try {
          const result = child.calculate(context);
          results.push(result);
        } catch (error) {
          // Log error but continue with other children
          this.logger.warn(
            'UnitGroupComposite',
            'calculate',
            `Error calculating child unit ${child.id}`,
            { error: error instanceof Error ? error.message : String(error) }
          );
        }
      }
    }

    if (results.length === 0) {
      return this.baseValue;
    }

    // Apply calculation strategy
    return this.applyCalculationStrategy(results);
  }

  isResponsive(): boolean {
    // Group is responsive if any child is responsive
    return this.getChildren().some(child => child.isResponsive());
  }

  /**
   * Set the calculation strategy for the group
   */
  setCalculationStrategy(strategy: CalculationStrategy): void {
    this.calculationStrategy = strategy;
  }

  /**
   * Set a custom calculator function
   */
  setCustomCalculator(calculator: (results: number[]) => number): void {
    this.customCalculator = calculator;
    this.calculationStrategy = CalculationStrategy.CUSTOM;
  }

  /**
   * Get the current calculation strategy
   */
  getCalculationStrategy(): CalculationStrategy {
    return this.calculationStrategy;
  }

  /**
   * Get statistics about the group
   */
  getGroupStats(): {
    totalChildren: number;
    activeChildren: number;
    responsiveChildren: number;
    averageResult: number;
    minResult: number;
    maxResult: number;
  } {
    const activeChildren = this.getChildren().filter(child => child.isActive);
    const responsiveChildren = this.getChildren().filter(child => child.isResponsive());

    // Calculate sample results for statistics
    const sampleContext: UnitContext = {
      parent: { width: 800, height: 600, x: 0, y: 0 },
      scene: { width: 1200, height: 800 },
    };

    const results: number[] = [];
    for (const child of activeChildren) {
      try {
        const result = child.calculate(sampleContext);
        results.push(result);
      } catch {
        // Skip failed calculations
      }
    }

    const averageResult =
      results.length > 0 ? results.reduce((a, b) => a + b, 0) / results.length : 0;
    const minResult = results.length > 0 ? Math.min(...results) : 0;
    const maxResult = results.length > 0 ? Math.max(...results) : 0;

    return {
      totalChildren: this.getChildCount(),
      activeChildren: activeChildren.length,
      responsiveChildren: responsiveChildren.length,
      averageResult,
      minResult,
      maxResult,
    };
  }

  /**
   * Apply the selected calculation strategy
   */
  private applyCalculationStrategy(results: number[]): number {
    switch (this.calculationStrategy) {
      case CalculationStrategy.SUM:
        return results.reduce((sum, result) => sum + result, 0);

      case CalculationStrategy.AVERAGE:
        return results.reduce((sum, result) => sum + result, 0) / results.length;

      case CalculationStrategy.MIN:
        return Math.min(...results);

      case CalculationStrategy.MAX:
        return Math.max(...results);

      case CalculationStrategy.CUSTOM:
        if (this.customCalculator) {
          return this.customCalculator(results);
        }
        // Fallback to sum if no custom calculator is set
        return results.reduce((sum, result) => sum + result, 0);

      default:
        return results.reduce((sum, result) => sum + result, 0);
    }
  }

  /**
   * Override addChild to ensure proper parent-child relationships
   */
  addChild(unit: IUnit): void {
    super.addChild(unit);

    // Set this composite as the parent of the child
    if (unit && typeof (unit as any).setParent === 'function') {
      (unit as any).setParent(this);
    }
  }

  /**
   * Override removeChild to clean up parent-child relationships
   */
  removeChild(unit: IUnit): boolean {
    const removed = super.removeChild(unit);

    if (removed && unit && typeof (unit as any).setParent === 'function') {
      (unit as any).setParent(undefined);
    }

    return removed;
  }

  /**
   * Get all children of a specific unit type
   */
  getChildrenByType(unitType: UnitType): IUnit[] {
    return this.getChildren().filter(child => child.unitType === unitType);
  }

  /**
   * Get all responsive children
   */
  getResponsiveChildren(): IUnit[] {
    return this.getChildren().filter(child => child.isResponsive());
  }

  /**
   * Get all active children
   */
  getActiveChildren(): IUnit[] {
    return this.getChildren().filter(child => child.isActive);
  }

  /**
   * Enable or disable all children
   */
  setAllChildrenActive(active: boolean): void {
    for (const child of this.getChildren()) {
      if (typeof (child as any).isActive === 'boolean') {
        (child as any).isActive = active;
      }
    }
  }

  /**
   * Get a summary of the group's composition
   */
  getCompositionSummary(): {
    totalUnits: number;
    unitTypes: Record<string, number>;
    responsiveUnits: number;
    activeUnits: number;
  } {
    const unitTypes: Record<string, number> = {};
    let responsiveUnits = 0;
    let activeUnits = 0;

    for (const child of this.getChildren()) {
      // Count unit types
      const typeName = child.unitType;
      unitTypes[typeName] = (unitTypes[typeName] || 0) + 1;

      // Count responsive units
      if (child.isResponsive()) {
        responsiveUnits++;
      }

      // Count active units
      if (child.isActive) {
        activeUnits++;
      }
    }

    return {
      totalUnits: this.getChildCount(),
      unitTypes,
      responsiveUnits,
      activeUnits,
    };
  }
}
