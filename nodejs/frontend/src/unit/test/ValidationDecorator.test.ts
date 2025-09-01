import { ValidationDecorator } from '../decorators/ValidationDecorator';
import { SizeUnitCalculator } from '../classes/SizeUnitCalculator';
import { PositionUnitCalculator } from '../classes/PositionUnitCalculator';
import { ScaleUnitCalculator } from '../classes/ScaleUnitCalculator';
import { UnitType } from '../enums/UnitType';
import { VALIDATION_CONSTANTS } from '../constants';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { PositionUnit } from '../enums/PositionUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import { IUnit } from '../interfaces/IUnit';
import { UnitContext } from '../interfaces/IUnit';

// Mock unit for testing
class MockUnit implements IUnit {
  id = 'mock-unit';
  name = 'MockUnit';
  unitType = UnitType.SIZE;
  isActive = true;
  
     calculate(_context: UnitContext): number {
    return 100; // Default mock result
  }
  
     validate(_context: UnitContext): boolean {
    return true;
  }
  
  isResponsive(): boolean {
    return true;
  }
  
  toString(): string {
    return `MockUnit(${this.id})`;
  }
  
  clone(_overrides?: Partial<IUnit>): IUnit {
    return new MockUnit();
  }
}

describe('ValidationDecorator', () => {
  let mockUnit: MockUnit;
  let validationDecorator: ValidationDecorator;
  let sizeCalculator: SizeUnitCalculator;
  let positionCalculator: PositionUnitCalculator;
  let scaleCalculator: ScaleUnitCalculator;

  beforeEach(() => {
    mockUnit = new MockUnit();
    validationDecorator = new ValidationDecorator('test-validation', 'TestValidation', mockUnit);
    sizeCalculator = new SizeUnitCalculator('size-calc', 'SizeCalculator', SizeUnit.PARENT_WIDTH, Dimension.WIDTH, SizeValue.FILL, false);
    positionCalculator = new PositionUnitCalculator('pos-calc', 'PositionCalculator', PositionUnit.PARENT_CENTER_X, Dimension.X, 50);
    scaleCalculator = new ScaleUnitCalculator('scale-calc', 'ScaleCalculator', ScaleUnit.FACTOR, 1.0, false);
  });

  describe('Constructor and Basic Properties', () => {
    it('should create validation decorator with correct properties', () => {
      expect(validationDecorator.id).toBe('test-validation');
      expect(validationDecorator.name).toBe('TestValidation');
      expect(validationDecorator.unitType).toBe(UnitType.SIZE);
      expect(validationDecorator.getDecoratorType()).toBe('ValidationDecorator');
    });

    it('should setup default validation rules', () => {
      const errors = validationDecorator.getValidationErrors();
      expect(errors).toEqual([]);
      
      // Test that default rules are added
      const stats = validationDecorator.getValidationStats();
      expect(stats.totalValidations).toBe(0);
      expect(stats.errors).toBe(0);
      expect(stats.errorRate).toBe(0);
    });

    it('should return correct metadata', () => {
      const metadata = validationDecorator.getMetadata();
      expect(metadata.type).toBe('ValidationDecorator');
      expect(metadata.priority).toBe(VALIDATION_CONSTANTS.RULES.MAX_VALIDATION_RULES / 2);
      expect(metadata.description).toBe('Validates unit calculation results and context');
      expect(metadata.version).toBe('1.0.0');
    });

    it('should return correct priority', () => {
      expect(validationDecorator.getPriority()).toBe(VALIDATION_CONSTANTS.RULES.MAX_VALIDATION_RULES / 2);
    });

    it('should be able to decorate any unit', () => {
      expect(validationDecorator.canDecorate(mockUnit)).toBe(true);
      expect(validationDecorator.canDecorate(sizeCalculator)).toBe(true);
      expect(validationDecorator.canDecorate(null as any)).toBe(false);
      expect(validationDecorator.canDecorate(undefined as any)).toBe(false);
    });
  });

  describe('Validation Rule Management', () => {
    it('should add custom validation rule', () => {
      const customValidator = (result: number) => result > 50;
      validationDecorator.addValidationRule('custom-rule', customValidator, 'Result must be greater than 50');
      
      // Test the rule by performing a calculation
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      validationDecorator.calculate(context);
      
      const errors = validationDecorator.getValidationErrors();
      expect(errors.length).toBe(0); // Should pass validation
    });

    it('should remove validation rule by name', () => {
      const customValidator = (result: number) => result > 200; // Will fail
      validationDecorator.addValidationRule('removable-rule', customValidator, 'Result must be greater than 200');
      
      // Verify rule was added
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      validationDecorator.calculate(context);
      let errors = validationDecorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
      
      // Clear errors and remove rule
      validationDecorator.clearValidationErrors();
      const removed = validationDecorator.removeValidationRule('removable-rule');
      expect(removed).toBe(true);
      
      // Test that rule was removed
      validationDecorator.calculate(context);
      errors = validationDecorator.getValidationErrors();
      expect(errors.length).toBe(0);
    });

    it('should handle removing non-existent rule', () => {
      const removed = validationDecorator.removeValidationRule('non-existent-rule');
      expect(removed).toBe(false);
    });
  });

  describe('Context Validation', () => {
         it('should validate valid context', () => {
       const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
       validationDecorator.calculate(context);
      
      const errors = validationDecorator.getValidationErrors();
      expect(errors.length).toBe(0);
    });

    it('should reject null context', () => {
      validationDecorator.calculate(null as any);
      
      const errors = validationDecorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].rule).toBe('context-validation');
      expect(errors[0].message).toBe('Invalid calculation context provided');
    });

    it('should reject undefined context', () => {
      validationDecorator.calculate(undefined as any);
      
      const errors = validationDecorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].rule).toBe('context-validation');
    });

    it('should reject context without parent or scene', () => {
      const context = { someOtherProperty: 'value' };
      validationDecorator.calculate(context);
      
      const errors = validationDecorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].rule).toBe('context-validation');
      expect(errors[0].message).toBe('Context must have either parent or scene information');
    });

    it('should validate parent context with invalid dimensions', () => {
      const context = { parent: { width: 'invalid' as any, height: 100, x: 0, y: 0 } };
      validationDecorator.calculate(context);
      
      const errors = validationDecorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].rule).toBe('context-validation');
      expect(errors[0].message).toBe('Parent context must have valid size dimensions');
    });

    it('should validate scene context with invalid dimensions', () => {
      const context = { scene: { width: 100, height: 'invalid' as any } };
      validationDecorator.calculate(context);
      
      const errors = validationDecorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].rule).toBe('context-validation');
      expect(errors[0].message).toBe('Scene context must have valid dimensions');
    });
  });

  describe('Result Validation', () => {
         it('should validate finite number results', () => {
       // Mock unit that returns a valid result
       const validUnit = {
         id: 'valid-unit',
         name: 'ValidUnit',
         unitType: UnitType.SIZE,
         isActive: true,
         calculate: () => 100,
         validate: () => true,
         isResponsive: () => true,
         toString: () => 'ValidUnit(valid-unit)',
         clone: () => validUnit
       } as IUnit;
       
       const decorator = new ValidationDecorator('test', 'Test', validUnit);
       const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      decorator.calculate(context);
      
      const errors = decorator.getValidationErrors();
      expect(errors.length).toBe(0);
    });

         it('should reject infinite results', () => {
       const infiniteUnit = {
         id: 'infinite-unit',
         name: 'InfiniteUnit',
         unitType: UnitType.SIZE,
         isActive: true,
         calculate: () => Infinity,
         validate: () => true,
         isResponsive: () => true,
         toString: () => 'InfiniteUnit(infinite-unit)',
         clone: () => infiniteUnit
       } as IUnit;
       
       const decorator = new ValidationDecorator('test', 'Test', infiniteUnit);
       const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      decorator.calculate(context);
      
      const errors = decorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].rule).toBe('finite-number');
      expect(errors[0].message).toBe('Calculation result must be a finite number');
    });

         it('should reject NaN results', () => {
       const nanUnit = {
         id: 'nan-unit',
         name: 'NaNUnit',
         unitType: UnitType.SIZE,
         isActive: true,
         calculate: () => NaN,
         validate: () => true,
         isResponsive: () => true,
         toString: () => 'NaNUnit(nan-unit)',
         clone: () => nanUnit
       } as IUnit;
       
       const decorator = new ValidationDecorator('test', 'Test', nanUnit);
       const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      decorator.calculate(context);
      
      const errors = decorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].rule).toBe('finite-number');
    });

    it('should validate non-negative results', () => {
      const negativeUnit = {
        id: 'negative-unit',
        name: 'NegativeUnit',
        unitType: UnitType.SIZE,
        isActive: true,
        calculate: () => -50,
        validate: () => true,
        isResponsive: () => true,
        toString: () => 'NegativeUnit(negative-unit)',
        clone: () => negativeUnit
      } as IUnit;
      
      const decorator = new ValidationDecorator('test', 'Test', negativeUnit);
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      decorator.calculate(context);
      
      const errors = decorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].rule).toBe('non-negative');
      expect(errors[0].message).toBe('Calculation result should not be negative');
    });

    it('should validate reasonable bounds', () => {
      const outOfBoundsUnit = {
        id: 'out-of-bounds-unit',
        name: 'OutOfBoundsUnit',
        unitType: UnitType.SIZE,
        isActive: true,
        calculate: () => VALIDATION_CONSTANTS.RANGES.REASONABLE_SIZE_MAX + 1000,
        validate: () => true,
        isResponsive: () => true,
        toString: () => 'OutOfBoundsUnit(out-of-bounds-unit)',
        clone: () => outOfBoundsUnit
      } as IUnit;
      
      const decorator = new ValidationDecorator('test', 'Test', outOfBoundsUnit);
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      decorator.calculate(context);
      
      const errors = decorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].rule).toBe('reasonable-bounds');
    });
  });

  describe('Unit Type Specific Validation', () => {
    it('should validate size results', () => {
      const oversizedUnit = {
        id: 'oversized-unit',
        name: 'OversizedUnit',
        unitType: UnitType.SIZE,
        isActive: true,
        calculate: () => 5000, // Much larger than parent
        validate: () => true,
        isResponsive: () => true,
        toString: () => 'OversizedUnit(oversized-unit)',
        clone: () => oversizedUnit
      } as IUnit;
      
      const decorator = new ValidationDecorator('test', 'Test', oversizedUnit);
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      decorator.calculate(context);
      
      const errors = decorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].rule).toBe('size-bounds');
    });

    it('should validate position results', () => {
      const outOfBoundsPositionUnit = {
        id: 'out-of-bounds-position-unit',
        name: 'OutOfBoundsPositionUnit',
        unitType: UnitType.POSITION,
        isActive: true,
        calculate: () => -2000, // Way outside bounds
        validate: () => true,
        isResponsive: () => true,
        toString: () => 'OutOfBoundsPositionUnit(out-of-bounds-position-unit)',
        clone: () => outOfBoundsPositionUnit
      } as IUnit;
      
      const decorator = new ValidationDecorator('test', 'Test', outOfBoundsPositionUnit);
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      decorator.calculate(context);
      
      const errors = decorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
      // The 'non-negative' rule will trigger first for negative values
      expect(errors[0].rule).toBe('non-negative');
    });

    it('should validate scale results', () => {
      const invalidScaleUnit = {
        id: 'invalid-scale-unit',
        name: 'InvalidScaleUnit',
        unitType: UnitType.SCALE,
        isActive: true,
        calculate: () => VALIDATION_CONSTANTS.RANGES.REASONABLE_SCALE_MAX + 10,
        validate: () => true,
        isResponsive: () => true,
        toString: () => 'InvalidScaleUnit(invalid-scale-unit)',
        clone: () => invalidScaleUnit
      } as IUnit;
      
      const decorator = new ValidationDecorator('test', 'Test', invalidScaleUnit);
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      decorator.calculate(context);
      
      const errors = decorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].rule).toBe('scale-bounds');
    });
  });

  describe('Error Handling', () => {
    it('should handle validation rule errors gracefully', () => {
      const throwingValidator = (_result: number) => {
        throw new Error('Validation rule error');
      };
      
      validationDecorator.addValidationRule('throwing-rule', throwingValidator, 'This will throw an error');
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      validationDecorator.calculate(context);
      
      const errors = validationDecorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].rule).toBe('throwing-rule');
      expect(errors[0].message).toContain('Validation rule \'throwing-rule\' threw an error');
    });

    it('should handle non-Error exceptions', () => {
      const throwingValidator = (_result: number) => {
        throw 'String error';
      };
      
      validationDecorator.addValidationRule('string-error-rule', throwingValidator, 'This will throw a string');
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      validationDecorator.calculate(context);
      
      const errors = validationDecorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
      expect(errors[0].message).toContain('String error');
    });
  });

  describe('Validation Statistics', () => {
    it('should track validation statistics correctly', () => {
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      
      // Perform multiple calculations
      validationDecorator.calculate(context);
      validationDecorator.calculate(context);
      validationDecorator.calculate(context);
      
      const stats = validationDecorator.getValidationStats();
      expect(stats.totalValidations).toBeGreaterThan(0);
      expect(stats.errors).toBeGreaterThanOrEqual(0);
      expect(stats.errorRate).toBeGreaterThanOrEqual(0);
      expect(stats.errorRate).toBeLessThanOrEqual(1);
    });

    it('should handle empty validation history', () => {
      const stats = validationDecorator.getValidationStats();
      expect(stats.totalValidations).toBe(0);
      expect(stats.errors).toBe(0);
      expect(stats.errorRate).toBe(0);
      expect(stats.lastError).toBeUndefined();
    });

    it('should track last error timestamp', () => {
      const invalidUnit = {
        id: 'invalid-unit',
        name: 'InvalidUnit',
        unitType: UnitType.SIZE,
        isActive: true,
        calculate: () => -1, // Will trigger validation error
        validate: () => true,
        isResponsive: () => true,
        toString: () => 'InvalidUnit(invalid-unit)',
        clone: () => invalidUnit
      } as IUnit;
      
      const decorator = new ValidationDecorator('test', 'Test', invalidUnit);
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      decorator.calculate(context);
      
      const stats = decorator.getValidationStats();
      expect(stats.lastError).toBeInstanceOf(Date);
    });
  });

  describe('Error Management', () => {
    it('should clear validation errors', () => {
      const invalidUnit = {
        id: 'invalid-unit',
        name: 'InvalidUnit',
        unitType: UnitType.SIZE,
        isActive: true,
        calculate: () => -1,
        validate: () => true,
        isResponsive: () => true,
        toString: () => 'InvalidUnit(invalid-unit)',
        clone: () => invalidUnit
      } as IUnit;
      
      const decorator = new ValidationDecorator('test', 'Test', invalidUnit);
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      decorator.calculate(context);
      
      let errors = decorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
      
      decorator.clearValidationErrors();
      errors = decorator.getValidationErrors();
      expect(errors.length).toBe(0);
    });

    it('should return copy of validation errors', () => {
      const invalidUnit = {
        id: 'invalid-unit',
        name: 'InvalidUnit',
        unitType: UnitType.SIZE,
        isActive: true,
        calculate: () => -1,
        validate: () => true,
        isResponsive: () => true,
        toString: () => 'InvalidUnit(invalid-unit)',
        clone: () => invalidUnit
      } as IUnit;
      
      const decorator = new ValidationDecorator('test', 'Test', invalidUnit);
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      decorator.calculate(context);
      
      const errors1 = decorator.getValidationErrors();
      const errors2 = decorator.getValidationErrors();
      
      expect(errors1).toEqual(errors2);
      expect(errors1).not.toBe(errors2); // Should be different references
    });
  });

  describe('Integration with Real Calculators', () => {
    it('should work with SizeUnitCalculator', () => {
      const sizeDecorator = new ValidationDecorator('size-validation', 'SizeValidation', sizeCalculator);
      const context = { 
        parent: { width: 100, height: 100, x: 0, y: 0 },
        scene: { width: 800, height: 600 }
      };
      
      const result = sizeDecorator.calculate(context);
      expect(typeof result).toBe('number');
      expect(Number.isFinite(result)).toBe(true);
      
      const errors = sizeDecorator.getValidationErrors();
      console.log('SizeUnitCalculator result:', result);
      console.log('SizeUnitCalculator errors:', errors);
      console.log('SizeUnitCalculator config:', {
        sizeUnit: sizeCalculator.sizeUnit,
        dimension: sizeCalculator.dimension,
        baseValue: sizeCalculator.baseValue
      });
      console.log('Context:', context);
      
      // The SizeUnitCalculator with FILL value + PARENT_WIDTH returns parent width (100)
      // This is not larger than parent width (100) * 2, so no validation error is expected
      // This is the correct behavior after refactoring
      expect(errors.length).toBe(0);
    });

    it('should work with PositionUnitCalculator', () => {
      const positionDecorator = new ValidationDecorator('position-validation', 'PositionValidation', positionCalculator);
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      
      const result = positionDecorator.calculate(context);
      expect(typeof result).toBe('number');
      expect(Number.isFinite(result)).toBe(true);
      
      const errors = positionDecorator.getValidationErrors();
      expect(errors.length).toBe(0);
    });

    it('should work with ScaleUnitCalculator', () => {
      const scaleDecorator = new ValidationDecorator('scale-validation', 'ScaleValidation', scaleCalculator);
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      
      const result = scaleDecorator.calculate(context);
      expect(typeof result).toBe('number');
      expect(Number.isFinite(result)).toBe(true);
      
      const errors = scaleDecorator.getValidationErrors();
      expect(errors.length).toBe(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very large numbers', () => {
      const largeNumberUnit = {
        id: 'large-number-unit',
        name: 'LargeNumberUnit',
        unitType: UnitType.SIZE,
        isActive: true,
        calculate: () => Number.MAX_SAFE_INTEGER,
        validate: () => true,
        isResponsive: () => true,
        toString: () => 'LargeNumberUnit(large-number-unit)',
        clone: () => largeNumberUnit
      } as IUnit;
      
      const decorator = new ValidationDecorator('test', 'Test', largeNumberUnit);
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      decorator.calculate(context);
      
      const errors = decorator.getValidationErrors();
      expect(errors.length).toBeGreaterThan(0);
    });

    it('should handle zero values', () => {
      const zeroUnit = {
        id: 'zero-unit',
        name: 'ZeroUnit',
        unitType: UnitType.SIZE,
        isActive: true,
        calculate: () => 0,
        validate: () => true,
        isResponsive: () => true,
        toString: () => 'ZeroUnit(zero-unit)',
        clone: () => zeroUnit
      } as IUnit;
      
      const decorator = new ValidationDecorator('test', 'Test', zeroUnit);
      const context = { parent: { width: 100, height: 100, x: 0, y: 0 } };
      decorator.calculate(context);
      
      const errors = decorator.getValidationErrors();
      expect(errors.length).toBe(0); // Zero should be valid
    });

    it('should handle context with only scene information', () => {
      const context = { scene: { width: 200, height: 200 } };
      validationDecorator.calculate(context);
      
      const errors = validationDecorator.getValidationErrors();
      expect(errors.length).toBe(0);
    });

    it('should handle context with both parent and scene information', () => {
      const context = { 
        parent: { width: 100, height: 100, x: 0, y: 0 },
        scene: { width: 200, height: 200 }
      };
      validationDecorator.calculate(context);
      
      const errors = validationDecorator.getValidationErrors();
      expect(errors.length).toBe(0);
    });
  });
});
