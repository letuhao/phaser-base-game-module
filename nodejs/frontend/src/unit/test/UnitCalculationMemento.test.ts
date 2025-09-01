import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { UnitCalculationMemento } from '../mementos/UnitCalculationMemento';
import { createMockContext } from '../../test/setup';
import { UnitType } from '../enums/UnitType';
import { SizeUnit } from '../enums/SizeUnit';

describe('UnitCalculationMemento', () => {
  let memento: UnitCalculationMemento;
  let mockInput: any;
  let mockContext: any;
  let mockPerformanceMetrics: any;

  beforeEach(() => {
    mockInput = { value: 100, unit: SizeUnit.PIXEL };
    mockContext = createMockContext();
    mockPerformanceMetrics = {
      totalTime: 50,
      stepTimes: { validation: 10, calculation: 30, rounding: 10 },
      memoryUsage: 1024
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create memento with all required properties', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        150,
        'test-unit-1',
        UnitType.SIZE,
        'SizeCalculationTemplate',
        'SizeUnitStrategy',
        ['RangeValidator', 'TypeValidator'],
        mockPerformanceMetrics,
        true,
        undefined,
        'Test calculation',
        '1.0.0'
      );

      expect(memento.getCalculationInput()).toEqual(mockInput);
      expect(memento.getCalculationContext()).toEqual(mockContext);
      expect(memento.getCalculationResult()).toBe(150);
      expect(memento.getPerformanceMetrics()).toEqual(mockPerformanceMetrics);
      expect(memento.getUnitId()).toBe('test-unit-1');
      expect(memento.getVersion()).toBe('1.0.0');
    });

    it('should create memento with default values', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit-2',
        UnitType.POSITION,
        'PositionCalculationTemplate',
        'PositionUnitStrategy',
        ['RangeValidator'],
        mockPerformanceMetrics
      );

      expect(memento.getCalculationMetadata().success).toBe(true);
      expect(memento.getCalculationMetadata().errorMessage).toBeUndefined();
      expect(memento.getDescription()).toBe('');
      expect(memento.getVersion()).toBe('1.0.0');
    });

    it('should create memento for failed calculation', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        NaN,
        'test-unit-3',
        UnitType.SCALE,
        'ScaleCalculationTemplate',
        'ScaleUnitStrategy',
        ['TypeValidator'],
        mockPerformanceMetrics,
        false,
        'Invalid input value',
        'Failed calculation',
        '1.0.0'
      );

      expect(memento.wasSuccessful()).toBe(false);
      expect(memento.getErrorMessage()).toBe('Invalid input value');
      expect(memento.getCalculationResult()).toBeNaN();
    });
  });

  describe('getCalculationInput', () => {
    it('should return the calculation input', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics
      );

      expect(memento.getCalculationInput()).toEqual(mockInput);
    });
  });

  describe('getCalculationContext', () => {
    it('should return the calculation context', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics
      );

      expect(memento.getCalculationContext()).toEqual(mockContext);
    });
  });

  describe('getCalculationResult', () => {
    it('should return the calculation result', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        150.5,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics
      );

      expect(memento.getCalculationResult()).toBe(150.5);
    });

    it('should return NaN for failed calculations', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        NaN,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics,
        false,
        'Calculation failed'
      );

      expect(memento.getCalculationResult()).toBeNaN();
    });
  });

  describe('getPerformanceMetrics', () => {
    it('should return a copy of performance metrics', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics
      );

      const metrics = memento.getPerformanceMetrics();
      expect(metrics).toEqual(mockPerformanceMetrics);
      expect(metrics).not.toBe(mockPerformanceMetrics); // Should be a copy
    });
  });

  describe('getCalculationMetadata', () => {
    it('should return calculation metadata', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'SizeCalculationTemplate',
        'SizeUnitStrategy',
        ['RangeValidator', 'TypeValidator'],
        mockPerformanceMetrics,
        true,
        undefined,
        'Test calculation'
      );

      const metadata = memento.getCalculationMetadata();
      expect(metadata).toEqual({
        templateName: 'SizeCalculationTemplate',
        strategyName: 'SizeUnitStrategy',
        validatorsUsed: ['RangeValidator', 'TypeValidator'],
        success: true,
        errorMessage: undefined
      });
    });

    it('should return metadata for failed calculation', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        NaN,
        'test-unit',
        UnitType.SIZE,
        'SizeCalculationTemplate',
        'SizeUnitStrategy',
        ['RangeValidator'],
        mockPerformanceMetrics,
        false,
        'Invalid input'
      );

      const metadata = memento.getCalculationMetadata();
      expect(metadata.success).toBe(false);
      expect(metadata.errorMessage).toBe('Invalid input');
    });
  });

  describe('wasSuccessful', () => {
    it('should return true for successful calculation', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics,
        true
      );

      expect(memento.wasSuccessful()).toBe(true);
    });

    it('should return false for failed calculation', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        NaN,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics,
        false,
        'Calculation failed'
      );

      expect(memento.wasSuccessful()).toBe(false);
    });
  });

  describe('getErrorMessage', () => {
    it('should return error message for failed calculation', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        NaN,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics,
        false,
        'Invalid input value'
      );

      expect(memento.getErrorMessage()).toBe('Invalid input value');
    });

    it('should return undefined for successful calculation', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics,
        true
      );

      expect(memento.getErrorMessage()).toBeUndefined();
    });
  });

  describe('getTemplateName', () => {
    it('should return the template name', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'SizeCalculationTemplate',
        'SizeUnitStrategy',
        [],
        mockPerformanceMetrics
      );

      expect(memento.getTemplateName()).toBe('SizeCalculationTemplate');
    });
  });

  describe('getStrategyName', () => {
    it('should return the strategy name', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'SizeCalculationTemplate',
        'SizeUnitStrategy',
        [],
        mockPerformanceMetrics
      );

      expect(memento.getStrategyName()).toBe('SizeUnitStrategy');
    });
  });

  describe('getValidatorsUsed', () => {
    it('should return a copy of validators used', () => {
      const validators = ['RangeValidator', 'TypeValidator'];
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        validators,
        mockPerformanceMetrics
      );

      const result = memento.getValidatorsUsed();
      expect(result).toEqual(validators);
      expect(result).not.toBe(validators); // Should be a copy
    });

    it('should return empty array when no validators used', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics
      );

      expect(memento.getValidatorsUsed()).toEqual([]);
    });
  });

  describe('getCalculationSummary', () => {
    it('should return calculation summary', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        150,
        'test-unit',
        UnitType.SIZE,
        'SizeCalculationTemplate',
        'SizeUnitStrategy',
        ['RangeValidator'],
        mockPerformanceMetrics,
        true
      );

      const summary = memento.getCalculationSummary();
      expect(summary).toEqual({
        input: mockInput,
        result: 150,
        success: true,
        totalTime: 50,
        templateName: 'SizeCalculationTemplate',
        strategyName: 'SizeUnitStrategy'
      });
    });

    it('should return summary for failed calculation', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        NaN,
        'test-unit',
        UnitType.SIZE,
        'SizeCalculationTemplate',
        'SizeUnitStrategy',
        ['RangeValidator'],
        mockPerformanceMetrics,
        false,
        'Calculation failed'
      );

      const summary = memento.getCalculationSummary();
      expect(summary.success).toBe(false);
      expect(summary.result).toBeNaN();
    });
  });

  describe('compareWith', () => {
    let otherMemento: UnitCalculationMemento;

    beforeEach(() => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics
      );

      otherMemento = new UnitCalculationMemento(
        { value: 200, unit: SizeUnit.PIXEL },
        mockContext,
        200,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        { ...mockPerformanceMetrics, totalTime: 75 }
      );
    });

    it('should compare with another memento', () => {
      const comparison = memento.compareWith(otherMemento);

      expect(comparison.inputChanged).toBe(true);
      expect(comparison.resultChanged).toBe(true);
      expect(comparison.performanceChanged).toBe(true);
      expect(comparison.timeDifference).toBe(-25); // 50 - 75
      expect(comparison.resultDifference).toBe(-100); // 100 - 200
    });

    it('should detect no changes when mementos are identical', () => {
      const identicalMemento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics
      );

      const comparison = memento.compareWith(identicalMemento);

      expect(comparison.inputChanged).toBe(false);
      expect(comparison.resultChanged).toBe(false);
      expect(comparison.performanceChanged).toBe(false);
      expect(comparison.timeDifference).toBe(0);
      expect(comparison.resultDifference).toBe(0);
    });
  });

  describe('isSignificantChange', () => {
    let otherMemento: UnitCalculationMemento;

    beforeEach(() => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics
      );

      otherMemento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        150,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        { ...mockPerformanceMetrics, totalTime: 100 }
      );
    });

    it('should detect significant change when thresholds are exceeded', () => {
      const thresholds = { timeThreshold: 25, resultThreshold: 25 };
      const isSignificant = memento.isSignificantChange(otherMemento, thresholds);

      expect(isSignificant).toBe(true); // time difference is 50, result difference is 50
    });

    it('should not detect significant change when thresholds are not exceeded', () => {
      const thresholds = { timeThreshold: 100, resultThreshold: 100 };
      const isSignificant = memento.isSignificantChange(otherMemento, thresholds);

      expect(isSignificant).toBe(false);
    });

    it('should detect significant change based on time threshold only', () => {
      const thresholds = { timeThreshold: 25, resultThreshold: 100 };
      const isSignificant = memento.isSignificantChange(otherMemento, thresholds);

      expect(isSignificant).toBe(true); // time difference exceeds threshold
    });

    it('should detect significant change based on result threshold only', () => {
      const thresholds = { timeThreshold: 100, resultThreshold: 25 };
      const isSignificant = memento.isSignificantChange(otherMemento, thresholds);

      expect(isSignificant).toBe(true); // result difference exceeds threshold
    });
  });

  describe('getEfficiencyScore', () => {
    it('should return efficiency score based on performance', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics
      );

      const score = memento.getEfficiencyScore();
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });

    it('should return default score when total time is zero', () => {
      const zeroTimeMetrics = { ...mockPerformanceMetrics, totalTime: 0 };
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        zeroTimeMetrics
      );

      const score = memento.getEfficiencyScore();
      expect(score).toBe(100); // DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT
    });

    it('should return lower score for slower calculations', () => {
      const slowMetrics = { ...mockPerformanceMetrics, totalTime: 200 };
      const slowMemento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        slowMetrics
      );

      const fastMemento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics
      );

      const slowScore = slowMemento.getEfficiencyScore();
      const fastScore = fastMemento.getEfficiencyScore();

      // The slow calculation should have a lower or equal score
      expect(slowScore).toBeLessThanOrEqual(fastScore);
    });
  });

  describe('exportForAnalysis', () => {
    it('should export calculation data for analysis', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        150,
        'test-unit-1',
        UnitType.SIZE,
        'SizeCalculationTemplate',
        'SizeUnitStrategy',
        ['RangeValidator'],
        mockPerformanceMetrics,
        true,
        undefined,
        'Test calculation'
      );

      const analysisData = memento.exportForAnalysis();
      const parsed = JSON.parse(analysisData);

      expect(parsed.unitId).toBe('test-unit-1');
      expect(parsed.calculation.result).toBe(150);
      expect(parsed.calculation.success).toBe(true);
      expect(parsed.performance).toEqual(mockPerformanceMetrics);
      expect(parsed.metadata.templateName).toBe('SizeCalculationTemplate');
      expect(parsed.metadata.strategyName).toBe('SizeUnitStrategy');
      expect(parsed.efficiencyScore).toBeGreaterThanOrEqual(0);
      expect(parsed.efficiencyScore).toBeLessThanOrEqual(100);
      expect(parsed.timestamp).toBeDefined();
    });

    it('should export failed calculation data', () => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        NaN,
        'test-unit-2',
        UnitType.SIZE,
        'SizeCalculationTemplate',
        'SizeUnitStrategy',
        ['RangeValidator'],
        mockPerformanceMetrics,
        false,
        'Calculation failed'
      );

      const analysisData = memento.exportForAnalysis();
      const parsed = JSON.parse(analysisData);

      expect(parsed.calculation.success).toBe(false);
      expect(parsed.metadata.errorMessage).toBe('Calculation failed');
    });
  });

  describe('static factory methods', () => {
    describe('createFromFailedCalculation', () => {
      it('should create memento from failed calculation', () => {
        memento = UnitCalculationMemento.createFromFailedCalculation(
          mockInput,
          mockContext,
          'test-unit',
          UnitType.SIZE,
          'SizeCalculationTemplate',
          'SizeUnitStrategy',
          ['RangeValidator'],
          'Invalid input value',
          mockPerformanceMetrics
        );

        expect(memento.wasSuccessful()).toBe(false);
        expect(memento.getErrorMessage()).toBe('Invalid input value');
        expect(memento.getCalculationResult()).toBeNaN();
        expect(memento.getTemplateName()).toBe('SizeCalculationTemplate');
        expect(memento.getStrategyName()).toBe('SizeUnitStrategy');
        expect(memento.getValidatorsUsed()).toEqual(['RangeValidator']);
        expect(memento.getDescription()).toContain('Failed calculation');
      });
    });

    describe('createFromSuccessfulCalculation', () => {
      it('should create memento from successful calculation', () => {
        memento = UnitCalculationMemento.createFromSuccessfulCalculation(
          mockInput,
          mockContext,
          150,
          'test-unit',
          UnitType.SIZE,
          'SizeCalculationTemplate',
          'SizeUnitStrategy',
          ['RangeValidator'],
          mockPerformanceMetrics
        );

        expect(memento.wasSuccessful()).toBe(true);
        expect(memento.getErrorMessage()).toBeUndefined();
        expect(memento.getCalculationResult()).toBe(150);
        expect(memento.getTemplateName()).toBe('SizeCalculationTemplate');
        expect(memento.getStrategyName()).toBe('SizeUnitStrategy');
        expect(memento.getValidatorsUsed()).toEqual(['RangeValidator']);
        expect(memento.getDescription()).toContain('Successful calculation');
        expect(memento.getDescription()).toContain('SizeCalculationTemplate');
        expect(memento.getDescription()).toContain('SizeUnitStrategy');
      });
    });
  });

  describe('inherited methods', () => {
    beforeEach(() => {
      memento = new UnitCalculationMemento(
        mockInput,
        mockContext,
        100,
        'test-unit',
        UnitType.SIZE,
        'TestTemplate',
        'TestStrategy',
        [],
        mockPerformanceMetrics,
        true,
        undefined,
        'Test calculation',
        '1.0.0'
      );
    });

    it('should return state from parent class', () => {
      const state = memento.getState();
      expect(state).toBeDefined();
      expect(typeof state).toBe('object');
    });

    it('should return timestamp from parent class', () => {
      const timestamp = memento.getTimestamp();
      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.getTime()).toBeLessThanOrEqual(Date.now());
    });

    it('should return unit ID from parent class', () => {
      expect(memento.getUnitId()).toBe('test-unit');
    });

    it('should return version from parent class', () => {
      expect(memento.getVersion()).toBe('1.0.0');
    });

    it('should return metadata from parent class', () => {
      const metadata = memento.getMetadata();
      expect(metadata.unitType).toBe(UnitType.SIZE);
      expect(metadata.description).toBe('Test calculation');
      expect(metadata.stateSize).toBeGreaterThan(0);
      expect(metadata.checksum).toBeDefined();
    });

    it('should validate memento integrity', () => {
      expect(memento.validate()).toBe(true);
    });

    it('should return memento size', () => {
      const size = memento.getSize();
      expect(size).toBeGreaterThan(0);
    });
  });
});
