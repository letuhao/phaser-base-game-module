import { SizeUnitCalculator } from './src/unit/classes/SizeUnitCalculator.js';
import { ValidationDecorator } from './src/unit/decorators/ValidationDecorator.js';
import { SizeUnit, Dimension, SizeValue } from './src/unit/enums/index.js';

// Create the same setup as in the test
const sizeCalculator = new SizeUnitCalculator('size-calc', 'SizeCalculator', SizeUnit.PARENT_WIDTH, Dimension.WIDTH, SizeValue.FILL, false);
const sizeDecorator = new ValidationDecorator('size-validation', 'SizeValidation', sizeCalculator);

// Create the same context as in the test
const context = { 
  parent: { width: 100, height: 100, x: 0, y: 0 },
  scene: { width: 800, height: 600 }
};

console.log('Context:', context);
console.log('SizeUnitCalculator config:', {
  sizeUnit: sizeCalculator.sizeUnit,
  dimension: sizeCalculator.dimension,
  baseValue: sizeCalculator.baseValue
});

// Calculate without decorator first
const directResult = sizeCalculator.calculate(context);
console.log('Direct SizeUnitCalculator result:', directResult);

// Calculate with decorator
const result = sizeDecorator.calculate(context);
console.log('ValidationDecorator result:', result);

// Get validation errors
const errors = sizeDecorator.getValidationErrors();
console.log('Validation errors:', errors);

// Get validation stats
const stats = sizeDecorator.getValidationStats();
console.log('Validation stats:', stats);
