import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { RangeValidator } from '../validators/RangeValidator';
import { createMockContext } from '../../test/setup';
import { Dimension } from '../enums/Dimension';
import { SizeUnit } from '../enums/SizeUnit';
import { SizeValue } from '../enums/SizeValue';
import { PositionUnit } from '../enums/PositionUnit';
import { PositionValue } from '../enums/PositionValue';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';

describe('RangeValidator', () => {
  let validator: RangeValidator;
  let mockContext: any;

  beforeEach(() => {
    mockContext = createMockContext();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create validator with default values', () => {
      validator = new RangeValidator();
      
      expect(validator.getName()).toBe('RangeValidator');
      expect(validator.getConfiguration()).toEqual({
        minValue: -Infinity,
        maxValue: Infinity,
        inclusive: true
      });
    });

    it('should create validator with custom values', () => {
      validator = new RangeValidator('CustomValidator', 0, 100, false);
      
      expect(validator.getName()).toBe('RangeValidator');
      expect(validator.getConfiguration()).toEqual({
        minValue: 0,
        maxValue: 100,
        inclusive: false
      });
    });

    it('should create validator with inclusive bounds', () => {
      validator = new RangeValidator('InclusiveValidator', 10, 50, true);
      
      expect(validator.getConfiguration()).toEqual({
        minValue: 10,
        maxValue: 50,
        inclusive: true
      });
    });
  });

  describe('canHandle', () => {
    beforeEach(() => {
      validator = new RangeValidator();
    });

    it('should handle numeric inputs', () => {
      expect(validator.canHandle(42 as any)).toBe(true);
      expect(validator.canHandle(0 as any)).toBe(true);
      expect(validator.canHandle(-100 as any)).toBe(true);
      expect(validator.canHandle(3.14 as any)).toBe(true);
    });

    it('should handle value validation inputs', () => {
      const valueInput = { value: 100 };
      expect(validator.canHandle(valueInput)).toBe(true);
    });

    it('should handle size validation inputs', () => {
      const sizeInput = {
        unit: SizeUnit.PIXEL,
        value: 200,
        dimension: Dimension.WIDTH
      };
      expect(validator.canHandle(sizeInput)).toBe(true);
    });

    it('should handle position validation inputs', () => {
      const positionInput = {
        unit: PositionUnit.PIXEL,
        value: 150,
        axis: Dimension.X
      };
      expect(validator.canHandle(positionInput)).toBe(true);
    });

    it('should handle scale validation inputs', () => {
      const scaleInput = {
        unit: ScaleUnit.FACTOR,
        value: 1.5
      };
      expect(validator.canHandle(scaleInput)).toBe(true);
    });

    it('should handle legacy validation inputs with value property', () => {
      const legacyInput = {
        input: { value: 75 }
      } as any;
      expect(validator.canHandle(legacyInput)).toBe(true);
    });

    it('should not handle legacy inputs without value property', () => {
      const legacyInput = {
        input: { other: 'property' }
      } as any;
      expect(validator.canHandle(legacyInput)).toBe(false);
    });

    it('should not handle null or undefined inputs', () => {
      expect(validator.canHandle(null as any)).toBe(false);
      expect(validator.canHandle(undefined as any)).toBe(false);
    });

    it('should not handle non-numeric legacy inputs', () => {
      const legacyInput = {
        input: { value: 'not a number' }
      } as any;
      expect(validator.canHandle(legacyInput)).toBe(false);
    });
  });

  describe('validation with inclusive bounds', () => {
    beforeEach(() => {
      validator = new RangeValidator('TestValidator', 0, 100, true);
    });

    it('should validate values within range', () => {
      expect(validator.validate(0 as any, mockContext)).toBe(true);
      expect(validator.validate(50 as any, mockContext)).toBe(true);
      expect(validator.validate(100 as any, mockContext)).toBe(true);
      expect(validator.getErrorMessage()).toBeUndefined();
    });

    it('should reject values below minimum', () => {
      expect(validator.validate(-1 as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe('Value -1 is outside the allowed range [0, 100]');
    });

    it('should reject values above maximum', () => {
      expect(validator.validate(101 as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe('Value 101 is outside the allowed range [0, 100]');
    });

    it('should validate boundary values', () => {
      expect(validator.validate(0 as any, mockContext)).toBe(true);
      expect(validator.validate(100 as any, mockContext)).toBe(true);
    });
  });

  describe('validation with exclusive bounds', () => {
    beforeEach(() => {
      validator = new RangeValidator('TestValidator', 0, 100, false);
    });

    it('should validate values within range', () => {
      expect(validator.validate(1 as any, mockContext)).toBe(true);
      expect(validator.validate(50 as any, mockContext)).toBe(true);
      expect(validator.validate(99 as any, mockContext)).toBe(true);
      expect(validator.getErrorMessage()).toBeUndefined();
    });

    it('should reject boundary values', () => {
      expect(validator.validate(0 as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe('Value 0 is outside the allowed range (0, 100)');
      
      expect(validator.validate(100 as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe('Value 100 is outside the allowed range (0, 100)');
    });

    it('should reject values outside range', () => {
      expect(validator.validate(-1 as any, mockContext)).toBe(false);
      expect(validator.validate(101 as any, mockContext)).toBe(false);
    });
  });

  describe('validation with different input types', () => {
    beforeEach(() => {
      validator = new RangeValidator('TestValidator', 0, 100, true);
    });

    it('should validate value validation inputs', () => {
      const valueInput = { value: 50 };
      expect(validator.validate(valueInput, mockContext)).toBe(true);
      
      const invalidValueInput = { value: 150 };
      expect(validator.validate(invalidValueInput, mockContext)).toBe(false);
    });

    it('should validate size validation inputs', () => {
      const sizeInput = {
        unit: SizeUnit.PIXEL,
        value: 75,
        dimension: Dimension.WIDTH
      };
      expect(validator.validate(sizeInput, mockContext)).toBe(true);
      
      const invalidSizeInput = {
        unit: SizeUnit.PIXEL,
        value: 150,
        dimension: Dimension.WIDTH
      };
      expect(validator.validate(invalidSizeInput, mockContext)).toBe(false);
    });

    it('should validate position validation inputs', () => {
      const positionInput = {
        unit: PositionUnit.PIXEL,
        value: 25,
        axis: Dimension.X
      } as any;
      expect(validator.validate(positionInput, mockContext)).toBe(true);
      
      const invalidPositionInput = {
        unit: PositionUnit.PIXEL,
        value: -10,
        axis: Dimension.X
      } as any;
      expect(validator.validate(invalidPositionInput, mockContext)).toBe(false);
    });

    it('should validate scale validation inputs', () => {
      const scaleInput = {
        unit: ScaleUnit.FACTOR,
        value: 0.5
      };
      expect(validator.validate(scaleInput, mockContext)).toBe(true);
      
      const invalidScaleInput = {
        unit: ScaleUnit.FACTOR,
        value: 150.0  // Changed from 2.0 to 150.0 to be outside the [0, 100] range
      };
      expect(validator.validate(invalidScaleInput, mockContext)).toBe(false);
    });

    it('should validate legacy validation inputs', () => {
      const legacyInput = {
        input: { value: 60 }
      };
      expect(validator.validate(legacyInput as any, mockContext)).toBe(true);
      
      const invalidLegacyInput = {
        input: { value: 200 }  // 200 is outside the [0, 100] range, so this should be rejected
      };
      expect(validator.validate(invalidLegacyInput as any, mockContext)).toBe(false);
    });
  });

  describe('value extraction', () => {
    beforeEach(() => {
      validator = new RangeValidator('TestValidator', 0, 100, true);
    });

    it('should extract numeric values directly', () => {
      expect(validator.validate(42 as any, mockContext)).toBe(true);
    });

    it('should extract values from size inputs with numeric values', () => {
      const sizeInput = {
        unit: SizeUnit.PIXEL,
        value: 75,
        dimension: Dimension.WIDTH
      };
      expect(validator.validate(sizeInput, mockContext)).toBe(true);
    });

    it('should extract values from size inputs with enum values', () => {
      const sizeInput = {
        unit: SizeUnit.PIXEL,
        value: SizeValue.AUTO,
        dimension: Dimension.WIDTH
      };
      // This should use the default fallback value since SizeValue.AUTO is not a number
      expect(validator.validate(sizeInput as any, mockContext)).toBe(true);
    });

    it('should extract values from position inputs with numeric values', () => {
      const positionInput = {
        unit: PositionUnit.PIXEL,
        value: 50,
        axis: Dimension.X
      };
      expect(validator.validate(positionInput, mockContext)).toBe(true);
    });

    it('should extract values from position inputs with enum values', () => {
      const positionInput = {
        unit: PositionUnit.PIXEL,
        value: PositionValue.CENTER,
        axis: Dimension.X
      };
      // This should use the default fallback value since PositionValue.CENTER is not a number
      expect(validator.validate(positionInput as any, mockContext)).toBe(true);
    });

    it('should extract values from scale inputs with numeric values', () => {
      const scaleInput = {
        unit: ScaleUnit.FACTOR,
        value: 0.8
      };
      expect(validator.validate(scaleInput, mockContext)).toBe(true);
    });

    it('should extract values from scale inputs with enum values', () => {
      const scaleInput = {
        unit: ScaleUnit.FACTOR,
        value: ScaleValue.FIT
      };
      // This should use the default fallback value since ScaleValue.FIT is not a number
      expect(validator.validate(scaleInput, mockContext)).toBe(true);
    });

    it('should use fallback values for invalid inputs', () => {
      const invalidInput = {
        unit: SizeUnit.PIXEL,
        value: 'not a number',
        dimension: Dimension.WIDTH
      };
      expect(validator.validate(invalidInput as any, mockContext)).toBe(true); // Uses fallback value
    });
  });

  describe('configuration management', () => {
    beforeEach(() => {
      validator = new RangeValidator('TestValidator', 0, 100, true);
    });

    it('should get current configuration', () => {
      const config = validator.getConfiguration();
      expect(config).toEqual({
        minValue: 0,
        maxValue: 100,
        inclusive: true
      });
    });

    it('should update min value', () => {
      validator.updateConfiguration({ minValue: 10 });
      
      expect(validator.getConfiguration()).toEqual({
        minValue: 10,
        maxValue: 100,
        inclusive: true
      });
      
      // Test that validation reflects the change
      expect(validator.validate(5 as any, mockContext)).toBe(false);
      expect(validator.validate(15 as any, mockContext)).toBe(true);
    });

    it('should update max value', () => {
      validator.updateConfiguration({ maxValue: 50 });
      
      expect(validator.getConfiguration()).toEqual({
        minValue: 0,
        maxValue: 50,
        inclusive: true
      });
      
      // Test that validation reflects the change
      expect(validator.validate(75 as any, mockContext)).toBe(false);
      expect(validator.validate(25 as any, mockContext)).toBe(true);
    });

    it('should update inclusive setting', () => {
      validator.updateConfiguration({ inclusive: false });
      
      expect(validator.getConfiguration()).toEqual({
        minValue: 0,
        maxValue: 100,
        inclusive: false
      });
      
      // Test that validation reflects the change
      expect(validator.validate(0 as any, mockContext)).toBe(false);
      expect(validator.validate(100 as any, mockContext)).toBe(false);
      expect(validator.validate(50 as any, mockContext)).toBe(true);
    });

    it('should update multiple configuration values', () => {
      validator.updateConfiguration({
        minValue: 20,
        maxValue: 80,
        inclusive: false
      });
      
      expect(validator.getConfiguration()).toEqual({
        minValue: 20,
        maxValue: 80,
        inclusive: false
      });
      
      // Test that validation reflects all changes
      expect(validator.validate(10 as any, mockContext)).toBe(false);
      expect(validator.validate(90 as any, mockContext)).toBe(false);
      expect(validator.validate(20 as any, mockContext)).toBe(false);
      expect(validator.validate(80 as any, mockContext)).toBe(false);
      expect(validator.validate(50 as any, mockContext)).toBe(true);
    });
  });

  describe('edge cases', () => {
    it('should handle infinite ranges', () => {
      validator = new RangeValidator('InfiniteValidator', -Infinity, Infinity, true);
      
      expect(validator.validate(-1000000 as any, mockContext)).toBe(true);
      expect(validator.validate(0 as any, mockContext)).toBe(true);
      expect(validator.validate(1000000 as any, mockContext)).toBe(true);
    });

    it('should handle zero-width ranges', () => {
      validator = new RangeValidator('ZeroWidthValidator', 50, 50, true);
      
      expect(validator.validate(50 as any, mockContext)).toBe(true);
      expect(validator.validate(49 as any, mockContext)).toBe(false);
      expect(validator.validate(51 as any, mockContext)).toBe(false);
    });

    it('should handle negative ranges', () => {
      validator = new RangeValidator('NegativeValidator', -100, -50, true);
      
      expect(validator.validate(-75 as any, mockContext)).toBe(true);
      expect(validator.validate(-100 as any, mockContext)).toBe(true);
      expect(validator.validate(-50 as any, mockContext)).toBe(true);
      expect(validator.validate(-150 as any, mockContext)).toBe(false);
      expect(validator.validate(0 as any, mockContext)).toBe(false);
    });

    it('should handle decimal ranges', () => {
      validator = new RangeValidator('DecimalValidator', 0.1, 0.9, true);
      
      expect(validator.validate(0.5 as any, mockContext)).toBe(true);
      expect(validator.validate(0.1 as any, mockContext)).toBe(true);
      expect(validator.validate(0.9 as any, mockContext)).toBe(true);
      expect(validator.validate(0.05 as any, mockContext)).toBe(false);
      expect(validator.validate(1.0 as any, mockContext)).toBe(false);
    });
  });

  describe('error message handling', () => {
    beforeEach(() => {
      validator = new RangeValidator('TestValidator', 10, 50, true);
    });

    it('should clear error message on successful validation', () => {
      // First fail validation
      expect(validator.validate(5 as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBeDefined();
      
      // Then succeed validation
      expect(validator.validate(25 as any, mockContext)).toBe(true);
      expect(validator.getErrorMessage()).toBeUndefined();
    });

    it('should provide descriptive error messages for inclusive ranges', () => {
      expect(validator.validate(5 as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe('Value 5 is outside the allowed range [10, 50]');
      
      expect(validator.validate(60 as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe('Value 60 is outside the allowed range [10, 50]');
    });

    it('should provide descriptive error messages for exclusive ranges', () => {
      validator.updateConfiguration({ inclusive: false });
      
      expect(validator.validate(10 as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe('Value 10 is outside the allowed range (10, 50)');
      
      expect(validator.validate(50 as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe('Value 50 is outside the allowed range (10, 50)');
    });
  });
});
