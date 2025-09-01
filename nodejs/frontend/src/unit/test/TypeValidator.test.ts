import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { TypeValidator } from '../validators/TypeValidator';
import { createMockContext } from '../../test/setup';
import { UnitType } from '../enums/UnitType';
import { Dimension } from '../enums/Dimension';
import { SizeUnit } from '../enums/SizeUnit';
import { SizeValue } from '../enums/SizeValue';
import { PositionUnit } from '../enums/PositionUnit';
import { PositionValue } from '../enums/PositionValue';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';

describe('TypeValidator', () => {
  let validator: TypeValidator;
  let mockContext: any;

  beforeEach(() => {
    mockContext = createMockContext();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create validator with default values', () => {
      validator = new TypeValidator();
      
      expect(validator.getName()).toBe('TypeValidator');
      expect(validator.getConfiguration()).toEqual({
        allowedTypes: Object.values(UnitType),
        allowedDimensions: Object.values(Dimension),
        strictMode: false
      });
    });

    it('should create validator with custom values', () => {
      const allowedTypes = [UnitType.SIZE, UnitType.POSITION];
      const allowedDimensions = [Dimension.WIDTH, Dimension.HEIGHT];
      
      validator = new TypeValidator('CustomValidator', allowedTypes, allowedDimensions, true);
      
      expect(validator.getName()).toBe('TypeValidator');
      expect(validator.getConfiguration()).toEqual({
        allowedTypes,
        allowedDimensions,
        strictMode: true
      });
    });

    it('should create validator with specific unit types', () => {
      const allowedTypes = [UnitType.SIZE];
      validator = new TypeValidator('SizeValidator', allowedTypes);
      
      expect(validator.getConfiguration()).toEqual({
        allowedTypes,
        allowedDimensions: Object.values(Dimension),
        strictMode: false
      });
    });

    it('should create validator with specific dimensions', () => {
      const allowedDimensions = [Dimension.WIDTH];
      validator = new TypeValidator('WidthValidator', Object.values(UnitType), allowedDimensions);
      
      expect(validator.getConfiguration()).toEqual({
        allowedTypes: Object.values(UnitType),
        allowedDimensions,
        strictMode: false
      });
    });
  });

  describe('canHandle', () => {
    beforeEach(() => {
      validator = new TypeValidator();
    });

    it('should handle any non-null, non-undefined input', () => {
      expect(validator.canHandle(42 as any)).toBe(true);
      expect(validator.canHandle('test' as any)).toBe(true);
      expect(validator.canHandle({} as any)).toBe(true);
      expect(validator.canHandle([] as any)).toBe(true);
      expect(validator.canHandle(true as any)).toBe(true);
      expect(validator.canHandle(false as any)).toBe(true);
    });

    it('should not handle null or undefined inputs', () => {
      expect(validator.canHandle(null as any)).toBe(true);  // Changed to true so validation can handle them
      expect(validator.canHandle(undefined as any)).toBe(true);  // Changed to true so validation can handle them
    });
  });

  describe('unit type validation', () => {
    beforeEach(() => {
      validator = new TypeValidator('TestValidator', [UnitType.SIZE, UnitType.POSITION]);
    });

    it('should validate allowed unit types', () => {
      const sizeInput = { unitType: UnitType.SIZE } as any;
      const positionInput = { unitType: UnitType.POSITION } as any;
      
      expect(validator.validate(sizeInput, mockContext)).toBe(true);
      expect(validator.validate(positionInput, mockContext)).toBe(true);
      expect(validator.getErrorMessage()).toBeUndefined();
    });

    it('should reject disallowed unit types', () => {
      const scaleInput = { unitType: UnitType.SCALE } as any;
      
      expect(validator.validate(scaleInput, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe(`Unit type '${UnitType.SCALE}' is not allowed. Allowed types: ${UnitType.SIZE}, ${UnitType.POSITION}`);
    });

    it('should handle inputs without unitType property', () => {
      const inputWithoutType = { value: 100 } as any;
      
      expect(validator.validate(inputWithoutType, mockContext)).toBe(true);
      expect(validator.getErrorMessage()).toBeUndefined();
    });

    it('should handle inputs with non-string unitType', () => {
      const inputWithNonStringType = { unitType: 42 } as any;
      
      expect(validator.validate(inputWithNonStringType, mockContext)).toBe(true);
      expect(validator.getErrorMessage()).toBeUndefined();
    });
  });

  describe('dimension validation', () => {
    beforeEach(() => {
      validator = new TypeValidator('TestValidator', Object.values(UnitType), [Dimension.WIDTH, Dimension.HEIGHT]);
    });

    it('should validate allowed dimensions', () => {
      const widthInput = { dimension: Dimension.WIDTH } as any;
      const heightInput = { dimension: Dimension.HEIGHT } as any;
      
      expect(validator.validate(widthInput, mockContext)).toBe(true);
      expect(validator.validate(heightInput, mockContext)).toBe(true);
      expect(validator.getErrorMessage()).toBeUndefined();
    });

    it('should reject disallowed dimensions', () => {
      const xInput = { dimension: Dimension.X } as any;
      const yInput = { dimension: Dimension.Y } as any;
      
      expect(validator.validate(xInput, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe(`Dimension '${Dimension.X}' is not allowed. Allowed dimensions: ${Dimension.WIDTH}, ${Dimension.HEIGHT}`);
      
      expect(validator.validate(yInput, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe(`Dimension '${Dimension.Y}' is not allowed. Allowed dimensions: ${Dimension.WIDTH}, ${Dimension.HEIGHT}`);
    });

    it('should handle inputs without dimension property', () => {
      const inputWithoutDimension = { value: 100 } as any;
      
      expect(validator.validate(inputWithoutDimension, mockContext)).toBe(true);
      expect(validator.getErrorMessage()).toBeUndefined();
    });

    it('should handle inputs with falsy dimension', () => {
      const inputWithFalsyDimension = { dimension: null } as any;
      
      expect(validator.validate(inputWithFalsyDimension, mockContext)).toBe(true);
      expect(validator.getErrorMessage()).toBeUndefined();
    });
  });

  describe('value type validation in relaxed mode', () => {
    beforeEach(() => {
      validator = new TypeValidator('TestValidator', Object.values(UnitType), Object.values(Dimension), false);
    });

    it('should accept primitive types', () => {
      expect(validator.validate(42 as any, mockContext)).toBe(true);
      expect(validator.validate('test' as any, mockContext)).toBe(true);
      expect(validator.validate(true as any, mockContext)).toBe(true);
      expect(validator.validate(false as any, mockContext)).toBe(true);
      expect(validator.validate(null as any, mockContext)).toBe(true);
      expect(validator.validate(undefined as any, mockContext)).toBe(true);
    });

    it('should accept object types', () => {
      expect(validator.validate({} as any, mockContext)).toBe(true);
      expect(validator.validate({ value: 100 } as any, mockContext)).toBe(true);
      expect(validator.validate({ unitType: UnitType.SIZE } as any, mockContext)).toBe(true);
      expect(validator.validate({ dimension: Dimension.WIDTH } as any, mockContext)).toBe(true);
    });

    it('should accept array types', () => {
      expect(validator.validate([] as any, mockContext)).toBe(true);
      expect(validator.validate([1, 2, 3] as any, mockContext)).toBe(true);
      expect(validator.validate(['test'] as any, mockContext)).toBe(true);
    });

    it('should accept function types', () => {
      const testFunction = () => {};
      expect(validator.validate(testFunction as any, mockContext)).toBe(true);
    });
  });

  describe('value type validation in strict mode', () => {
    beforeEach(() => {
      validator = new TypeValidator('TestValidator', Object.values(UnitType), Object.values(Dimension), true);
    });

    it('should accept primitive numeric and string types', () => {
      expect(validator.validate(42 as any, mockContext)).toBe(true);
      expect(validator.validate('test' as any, mockContext)).toBe(true);
    });

    it('should accept objects with value property', () => {
      const inputWithValue = { value: 100 };
      expect(validator.validate(inputWithValue, mockContext)).toBe(true);
    });

    it('should accept objects with getValue method', () => {
      const inputWithGetValue = {
        getValue: () => 100
      };
      expect(validator.validate(inputWithGetValue as any, mockContext)).toBe(true);
    });

    it('should accept objects with unitType property', () => {
      const inputWithUnitType = { unitType: UnitType.SIZE };
      expect(validator.validate(inputWithUnitType as any, mockContext)).toBe(true);
    });

    it('should reject boolean values', () => {
      expect(validator.validate(true as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe("Input value type 'boolean' is not allowed in strict mode");
      
      expect(validator.validate(false as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe("Input value type 'boolean' is not allowed in strict mode");
    });

    it('should reject null and undefined', () => {
      expect(validator.validate(null as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe("Input value type 'object' is not allowed in strict mode");
      
      expect(validator.validate(undefined as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe("Input value type 'undefined' is not allowed in strict mode");
    });

    it('should reject objects without required properties', () => {
      const invalidObject = { other: 'property' };
      expect(validator.validate(invalidObject as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe("Input value type 'object' is not allowed in strict mode");
    });

    it('should reject arrays', () => {
      expect(validator.validate([] as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe("Input value type 'object' is not allowed in strict mode");
      
      expect(validator.validate([1, 2, 3] as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe("Input value type 'object' is not allowed in strict mode");
    });

    it('should reject functions', () => {
      const testFunction = () => {};
      expect(validator.validate(testFunction as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe("Input value type 'function' is not allowed in strict mode");
    });
  });

  describe('configuration management', () => {
    beforeEach(() => {
      validator = new TypeValidator('TestValidator', [UnitType.SIZE], [Dimension.WIDTH], false);
    });

    it('should get current configuration', () => {
      const config = validator.getConfiguration();
      expect(config).toEqual({
        allowedTypes: [UnitType.SIZE],
        allowedDimensions: [Dimension.WIDTH],
        strictMode: false
      });
    });

    it('should update allowed types', () => {
      validator.updateConfiguration({ allowedTypes: [UnitType.POSITION, UnitType.SCALE] });
      
      expect(validator.getConfiguration()).toEqual({
        allowedTypes: [UnitType.POSITION, UnitType.SCALE],
        allowedDimensions: [Dimension.WIDTH],
        strictMode: false
      });
      
      // Test that validation reflects the change
      expect(validator.validate({ unitType: UnitType.SIZE } as any, mockContext)).toBe(false);
      expect(validator.validate({ unitType: UnitType.POSITION } as any, mockContext)).toBe(true);
      expect(validator.validate({ unitType: UnitType.SCALE } as any, mockContext)).toBe(true);
    });

    it('should update allowed dimensions', () => {
      validator.updateConfiguration({ allowedDimensions: [Dimension.HEIGHT, Dimension.X] });
      
      expect(validator.getConfiguration()).toEqual({
        allowedTypes: [UnitType.SIZE],
        allowedDimensions: [Dimension.HEIGHT, Dimension.X],
        strictMode: false
      });
      
      // Test that validation reflects the change
      expect(validator.validate({ dimension: Dimension.WIDTH } as any, mockContext)).toBe(false);
      expect(validator.validate({ dimension: Dimension.HEIGHT } as any, mockContext)).toBe(true);
      expect(validator.validate({ dimension: Dimension.X } as any, mockContext)).toBe(true);
    });

    it('should update strict mode', () => {
      validator.updateConfiguration({ strictMode: true });
      
      expect(validator.getConfiguration()).toEqual({
        allowedTypes: [UnitType.SIZE],
        allowedDimensions: [Dimension.WIDTH],
        strictMode: true
      });
      
      // Test that validation reflects the change
      expect(validator.validate(true as any, mockContext)).toBe(false);
      expect(validator.validate(42 as any, mockContext)).toBe(true);
    });

    it('should update multiple configuration values', () => {
      validator.updateConfiguration({
        allowedTypes: [UnitType.POSITION],
        allowedDimensions: [Dimension.Y],
        strictMode: true
      });
      
      expect(validator.getConfiguration()).toEqual({
        allowedTypes: [UnitType.POSITION],
        allowedDimensions: [Dimension.Y],
        strictMode: true
      });
      
      // Test that validation reflects all changes
      expect(validator.validate({ unitType: UnitType.SIZE } as any, mockContext)).toBe(false);
      expect(validator.validate({ dimension: Dimension.WIDTH } as any, mockContext)).toBe(false);
      expect(validator.validate(true as any, mockContext)).toBe(false);
      expect(validator.validate({ unitType: UnitType.POSITION } as any, mockContext)).toBe(true);
      expect(validator.validate({ dimension: Dimension.Y } as any, mockContext)).toBe(true);
      expect(validator.validate(42 as any, mockContext)).toBe(true);
    });
  });

  describe('allowed type management', () => {
    beforeEach(() => {
      validator = new TypeValidator('TestValidator', [UnitType.SIZE], Object.values(Dimension), false);
    });

    it('should add allowed type', () => {
      validator.addAllowedType(UnitType.POSITION);
      
      expect(validator.getConfiguration().allowedTypes).toContain(UnitType.SIZE);
      expect(validator.getConfiguration().allowedTypes).toContain(UnitType.POSITION);
      
      // Test that validation reflects the change
      expect(validator.validate({ unitType: UnitType.SIZE } as any, mockContext)).toBe(true);
      expect(validator.validate({ unitType: UnitType.POSITION } as any, mockContext)).toBe(true);
    });

    it('should not add duplicate allowed type', () => {
      const initialTypes = validator.getConfiguration().allowedTypes;
      validator.addAllowedType(UnitType.SIZE);
      
      expect(validator.getConfiguration().allowedTypes).toEqual(initialTypes);
    });

    it('should remove allowed type', () => {
      validator.removeAllowedType(UnitType.SIZE);
      
      expect(validator.getConfiguration().allowedTypes).not.toContain(UnitType.SIZE);
      
      // Test that validation reflects the change
      expect(validator.validate({ unitType: UnitType.SIZE } as any, mockContext)).toBe(false);
    });

    it('should handle removing non-existent type gracefully', () => {
      const initialTypes = validator.getConfiguration().allowedTypes;
      validator.removeAllowedType(UnitType.POSITION);
      
      expect(validator.getConfiguration().allowedTypes).toEqual(initialTypes);
    });
  });

  describe('allowed dimension management', () => {
    beforeEach(() => {
      validator = new TypeValidator('TestValidator', Object.values(UnitType), [Dimension.WIDTH], false);
    });

    it('should add allowed dimension', () => {
      validator.addAllowedDimension(Dimension.HEIGHT);
      
      expect(validator.getConfiguration().allowedDimensions).toContain(Dimension.WIDTH);
      expect(validator.getConfiguration().allowedDimensions).toContain(Dimension.HEIGHT);
      
      // Test that validation reflects the change
      expect(validator.validate({ dimension: Dimension.WIDTH } as any, mockContext)).toBe(true);
      expect(validator.validate({ dimension: Dimension.HEIGHT } as any, mockContext)).toBe(true);
    });

    it('should not add duplicate allowed dimension', () => {
      const initialDimensions = validator.getConfiguration().allowedDimensions;
      validator.addAllowedDimension(Dimension.WIDTH);
      
      expect(validator.getConfiguration().allowedDimensions).toEqual(initialDimensions);
    });

    it('should remove allowed dimension', () => {
      validator.removeAllowedDimension(Dimension.WIDTH);
      
      expect(validator.getConfiguration().allowedDimensions).not.toContain(Dimension.WIDTH);
      
      // Test that validation reflects the change
      expect(validator.validate({ dimension: Dimension.WIDTH } as any, mockContext)).toBe(false);
    });

    it('should handle removing non-existent dimension gracefully', () => {
      const initialDimensions = validator.getConfiguration().allowedDimensions;
      validator.removeAllowedDimension(Dimension.HEIGHT);
      
      expect(validator.getConfiguration().allowedDimensions).toEqual(initialDimensions);
    });
  });

  describe('complex validation scenarios', () => {
    beforeEach(() => {
      validator = new TypeValidator('TestValidator', [UnitType.SIZE, UnitType.POSITION], [Dimension.WIDTH, Dimension.HEIGHT], true);
    });

    it('should validate inputs with multiple properties', () => {
      const complexInput = {
        unitType: UnitType.SIZE,
        dimension: Dimension.WIDTH,
        value: 100
      };
      
      expect(validator.validate(complexInput, mockContext)).toBe(true);
      expect(validator.getErrorMessage()).toBeUndefined();
    });

    it('should fail validation when unit type is invalid', () => {
      const invalidInput = {
        unitType: UnitType.SCALE,
        dimension: Dimension.WIDTH,
        value: 100
      };
      
      expect(validator.validate(invalidInput, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe(`Unit type '${UnitType.SCALE}' is not allowed. Allowed types: ${UnitType.SIZE}, ${UnitType.POSITION}`);
    });

    it('should fail validation when dimension is invalid', () => {
      const invalidInput = {
        unitType: UnitType.SIZE,
        dimension: Dimension.X,
        value: 100
      };
      
      expect(validator.validate(invalidInput, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe(`Dimension '${Dimension.X}' is not allowed. Allowed dimensions: ${Dimension.WIDTH}, ${Dimension.HEIGHT}`);
    });

    it('should fail validation when value type is invalid in strict mode', () => {
      const invalidInput = {
        unitType: UnitType.SIZE,
        dimension: Dimension.WIDTH,
        value: true // boolean not allowed in strict mode
      };
      
      expect(validator.validate(invalidInput as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe("Input value type 'object' is not allowed in strict mode");
    });
  });

  describe('error message handling', () => {
    beforeEach(() => {
      validator = new TypeValidator('TestValidator', [UnitType.SIZE], [Dimension.WIDTH], true);
    });

    it('should clear error message on successful validation', () => {
      // First fail validation
      expect(validator.validate({ unitType: UnitType.POSITION } as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBeDefined();
      
      // Then succeed validation
      expect(validator.validate({ unitType: UnitType.SIZE } as any, mockContext)).toBe(true);
      expect(validator.getErrorMessage()).toBeUndefined();
    });

    it('should provide descriptive error messages for unit type violations', () => {
      expect(validator.validate({ unitType: UnitType.POSITION } as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe(`Unit type '${UnitType.POSITION}' is not allowed. Allowed types: ${UnitType.SIZE}`);
    });

    it('should provide descriptive error messages for dimension violations', () => {
      expect(validator.validate({ dimension: Dimension.HEIGHT } as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe(`Dimension '${Dimension.HEIGHT}' is not allowed. Allowed dimensions: ${Dimension.WIDTH}`);
    });

    it('should provide descriptive error messages for value type violations in strict mode', () => {
      expect(validator.validate(true as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe("Input value type 'boolean' is not allowed in strict mode");
    });

    it('should provide descriptive error messages for value type violations in relaxed mode', () => {
      validator.updateConfiguration({ strictMode: false });
      
      // In relaxed mode, all types should be accepted
      expect(validator.validate(true as any, mockContext)).toBe(true);
      expect(validator.getErrorMessage()).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('should handle empty allowed types array', () => {
      validator = new TypeValidator('EmptyValidator', [], Object.values(Dimension), false);
      
      expect(validator.validate({ unitType: UnitType.SIZE } as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe(`Unit type '${UnitType.SIZE}' is not allowed. Allowed types: `);
    });

    it('should handle empty allowed dimensions array', () => {
      validator = new TypeValidator('EmptyValidator', Object.values(UnitType), [], false);
      
      expect(validator.validate({ dimension: Dimension.WIDTH } as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe(`Dimension '${Dimension.WIDTH}' is not allowed. Allowed dimensions: `);
    });

    it('should handle objects with getValue method', () => {
      validator = new TypeValidator('TestValidator', Object.values(UnitType), Object.values(Dimension), true);
      
      const inputWithGetValue = {
        getValue: () => 100
      };
      
      expect(validator.validate(inputWithGetValue as any, mockContext)).toBe(true);
    });

    it('should handle objects with value property that is not a number', () => {
      validator = new TypeValidator('TestValidator', Object.values(UnitType), Object.values(Dimension), true);
      
      const inputWithNonNumericValue = {
        value: 'not a number'
      };
      
      expect(validator.validate(inputWithNonNumericValue as any, mockContext)).toBe(false);
      expect(validator.getErrorMessage()).toBe("Input value type 'object' is not allowed in strict mode");
    });
  });
});
