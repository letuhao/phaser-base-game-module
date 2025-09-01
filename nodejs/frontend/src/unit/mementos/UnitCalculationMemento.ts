import type { UnitContext } from '../interfaces/IUnit';
import type { IStrategyInput } from '../interfaces/IStrategyInput';
import { UnitMemento } from './IUnitMemento';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * Unit Calculation Memento
 * Specialized memento for storing calculation states
 * Includes input, context, result, and performance metrics
 */
export class UnitCalculationMemento extends UnitMemento {
  private readonly calculationInput: IStrategyInput;
  private readonly calculationContext: UnitContext;
  private readonly calculationResult: number;
  private readonly performanceMetrics: {
    totalTime: number;
    stepTimes: Record<string, number>;
    memoryUsage: number;
  };
  private readonly calculationMetadata: {
    templateName: string;
    strategyName: string;
    validatorsUsed: string[];
    success: boolean;
    errorMessage?: string;
  };

  constructor(
    calculationInput: IStrategyInput,
    calculationContext: UnitContext,
    calculationResult: number,
    unitId: string,
    unitType: string,
    templateName: string,
    strategyName: string,
    validatorsUsed: string[],
    performanceMetrics: {
      totalTime: number;
      stepTimes: Record<string, number>;
      memoryUsage: number;
    },
    success: boolean = true,
    errorMessage?: string,
    description: string = '',
    version: string = '1.0.0'
  ) {
    // Create the state object that includes all calculation data
    const state = {
      input: calculationInput,
      context: calculationContext,
      result: calculationResult,
      performance: performanceMetrics,
      metadata: {
        templateName,
        strategyName,
        validatorsUsed,
        success,
        errorMessage,
      },
    };

    super(state, unitId, unitType, description, version);

    this.calculationInput = calculationInput;
    this.calculationContext = calculationContext;
    this.calculationResult = calculationResult;
    this.performanceMetrics = performanceMetrics;
    this.calculationMetadata = {
      templateName,
      strategyName,
      validatorsUsed,
      success,
      errorMessage,
    };
  }

  /**
   * Get the calculation input
   */
  getCalculationInput(): IStrategyInput {
    return this.calculationInput;
  }

  /**
   * Get the calculation context
   */
  getCalculationContext(): UnitContext {
    return this.calculationContext;
  }

  /**
   * Get the calculation result
   */
  getCalculationResult(): number {
    return this.calculationResult;
  }

  /**
   * Get the performance metrics
   */
  getPerformanceMetrics() {
    return { ...this.performanceMetrics };
  }

  /**
   * Get the calculation metadata
   */
  getCalculationMetadata() {
    return { ...this.calculationMetadata };
  }

  /**
   * Check if the calculation was successful
   */
  wasSuccessful(): boolean {
    return this.calculationMetadata.success;
  }

  /**
   * Get the error message if calculation failed
   */
  getErrorMessage(): string | undefined {
    return this.calculationMetadata.errorMessage;
  }

  /**
   * Get the template name used for calculation
   */
  getTemplateName(): string {
    return this.calculationMetadata.templateName;
  }

  /**
   * Get the strategy name used for calculation
   */
  getStrategyName(): string {
    return this.calculationMetadata.strategyName;
  }

  /**
   * Get the validators used during calculation
   */
  getValidatorsUsed(): string[] {
    return [...this.calculationMetadata.validatorsUsed];
  }

  /**
   * Get calculation summary
   */
  getCalculationSummary(): {
    input: IStrategyInput;
    result: number;
    success: boolean;
    totalTime: number;
    templateName: string;
    strategyName: string;
  } {
    return {
      input: this.calculationInput,
      result: this.calculationResult,
      success: this.calculationMetadata.success,
      totalTime: this.performanceMetrics.totalTime,
      templateName: this.calculationMetadata.templateName,
      strategyName: this.calculationMetadata.strategyName,
    };
  }

  /**
   * Compare with another calculation memento
   */
  compareWith(other: UnitCalculationMemento): {
    inputChanged: boolean;
    resultChanged: boolean;
    performanceChanged: boolean;
    timeDifference: number;
    resultDifference: number;
  } {
    const inputChanged =
      JSON.stringify(this.calculationInput) !== JSON.stringify(other.calculationInput);
    const resultChanged = this.calculationResult !== other.calculationResult;
    const performanceChanged =
      this.performanceMetrics.totalTime !== other.performanceMetrics.totalTime;

    const timeDifference = this.performanceMetrics.totalTime - other.performanceMetrics.totalTime;
    const resultDifference = this.calculationResult - other.calculationResult;

    return {
      inputChanged,
      resultChanged,
      performanceChanged,
      timeDifference,
      resultDifference,
    };
  }

  /**
   * Check if this memento represents a significant change from another
   */
  isSignificantChange(
    other: UnitCalculationMemento,
    thresholds: {
      timeThreshold: number;
      resultThreshold: number;
    }
  ): boolean {
    const comparison = this.compareWith(other);

    return (
      Math.abs(comparison.timeDifference) > thresholds.timeThreshold ||
      Math.abs(comparison.resultDifference) > thresholds.resultThreshold
    );
  }

  /**
   * Get calculation efficiency score (0-100)
   */
  getEfficiencyScore(): number {
    if (this.performanceMetrics.totalTime === 0) return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;

    // Base score on time and memory usage
    const timeScore = Math.max(0, DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT - this.performanceMetrics.totalTime * 10);
    const memoryScore = Math.max(0, DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT - this.performanceMetrics.memoryUsage / 1000);

    return Math.round((timeScore + memoryScore) / 2);
  }

  /**
   * Export calculation data for analysis
   */
  exportForAnalysis(): string {
    const analysisData = {
      unitId: this.getUnitId(),
      timestamp: this.getTimestamp().toISOString(),
      calculation: this.getCalculationSummary(),
      performance: this.performanceMetrics,
      metadata: this.calculationMetadata,
      efficiencyScore: this.getEfficiencyScore(),
    };

    return JSON.stringify(analysisData, null, 2);
  }

  /**
   * Create a memento from a failed calculation
   */
  static createFromFailedCalculation(
    calculationInput: IStrategyInput,
    calculationContext: UnitContext,
    unitId: string,
    unitType: string,
    templateName: string,
    strategyName: string,
    validatorsUsed: string[],
    errorMessage: string,
    performanceMetrics: {
      totalTime: number;
      stepTimes: Record<string, number>;
      memoryUsage: number;
    }
  ): UnitCalculationMemento {
    return new UnitCalculationMemento(
      calculationInput,
      calculationContext,
      NaN, // Invalid result for failed calculation
      unitId,
      unitType,
      templateName,
      strategyName,
      validatorsUsed,
      performanceMetrics,
      false, // success = false
      errorMessage,
      `Failed calculation: ${errorMessage}`,
      '1.0.0'
    );
  }

  /**
   * Create a memento from a successful calculation
   */
  static createFromSuccessfulCalculation(
    calculationInput: IStrategyInput,
    calculationContext: UnitContext,
    calculationResult: number,
    unitId: string,
    unitType: string,
    templateName: string,
    strategyName: string,
    validatorsUsed: string[],
    performanceMetrics: {
      totalTime: number;
      stepTimes: Record<string, number>;
      memoryUsage: number;
    }
  ): UnitCalculationMemento {
    return new UnitCalculationMemento(
      calculationInput,
      calculationContext,
      calculationResult,
      unitId,
      unitType,
      templateName,
      strategyName,
      validatorsUsed,
      performanceMetrics,
      true, // success = true
      undefined, // no error message
      `Successful calculation using ${templateName} with ${strategyName}`,
      '1.0.0'
    );
  }
}
