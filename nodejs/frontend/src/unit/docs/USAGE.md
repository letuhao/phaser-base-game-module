# 📖 Unit System Usage Guide

## 🚀 Quick Start

### **Basic Setup**
```typescript
import { UnitSystemManager } from '../managers/UnitSystemManager';
import { UnitType, Dimension } from '../enums';
import { UnitContext } from '../interfaces/IUnit';

// Create unit system manager
const unitManager = new UnitSystemManager();

// Create a unit context
const context: UnitContext = {
  parent: { width: 800, height: 600, x: 0, y: 0 },
  scene: { width: 1200, height: 800 },
  viewport: { width: 1200, height: 800 },
  content: { width: 400, height: 300 },
  breakpoint: { name: 'desktop', width: 1200, height: 800 }
};
```

### **Creating Units**
```typescript
import { SizeUnit, PositionUnit, ScaleUnit } from '../classes';

// Create size unit
const sizeUnit = new SizeUnit('my-size', 'My Size Unit', 100);
sizeUnit.unitType = UnitType.SIZE;
sizeUnit.dimension = Dimension.WIDTH;

// Create position unit
const positionUnit = new PositionUnit('my-position', 'My Position Unit', 50);
positionUnit.unitType = UnitType.POSITION;
positionUnit.dimension = Dimension.X;

// Create scale unit
const scaleUnit = new ScaleUnit('my-scale', 'My Scale Unit', 1.0);
scaleUnit.unitType = UnitType.SCALE;
```

## 🎯 Interface Usage

### **IUnit Interface**
```typescript
import type { IUnit } from '../interfaces/IUnit';

// Basic unit interface
interface IUnit {
  readonly id: string;
  readonly name: string;
  readonly unitType: UnitType;
  readonly dimension: Dimension;
  readonly baseValue: number;
  readonly isActive: boolean;
  readonly isResponsive: boolean;
  
  calculate(context: UnitContext): number;
  validate(): boolean;
  clone(): IUnit;
}
```

### **IUnitConfig Interface**
```typescript
import type { IUnitConfig } from '../interfaces/IUnitConfig';

// Unit configuration interface
interface IUnitConfig {
  readonly id: string;
  readonly name: string;
  readonly unitType: UnitType;
  readonly dimension: Dimension;
  readonly baseValue: number;
  readonly isActive: boolean;
  readonly isResponsive: boolean;
  readonly metadata?: Record<string, unknown>;
}
```

### **IValidationInput Interface**
```typescript
import type { IValidationInput } from '../interfaces/IValidationInput';
import { ValidationType } from '../enums/ValidationType';

// Validation input interface
interface IValidationInput {
  id?: string;
  isValid?: boolean;
  metadata?: Record<string, string | number | boolean>;
  
  // Type-specific properties
  unit?: IUnit;
  value?: number;
  expectedType?: ValidationType;
}
```

## 🔢 Enum Usage

### **UnitType Enum**
```typescript
import { UnitType } from '../enums/UnitType';

// Available unit types
enum UnitType {
  SIZE = 'size',
  POSITION = 'position',
  SCALE = 'scale',
  MIXED = 'mixed'
}

// Usage
const unitType = UnitType.SIZE;
```

### **Dimension Enum**
```typescript
import { Dimension } from '../enums/Dimension';

// Available dimensions
enum Dimension {
  WIDTH = 'width',
  HEIGHT = 'height',
  X = 'x',
  Y = 'y',
  BOTH = 'both',
  XY = 'xy'
}

// Usage
const dimension = Dimension.WIDTH;
```

### **LogLevel Enum**
```typescript
import { LogLevel } from '../enums/LogLevel';

// Available log levels
enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

// Usage
const logLevel = LogLevel.INFO;
```

### **ValidationType Enum**
```typescript
import { ValidationType } from '../enums/ValidationType';

// Available validation types
enum ValidationType {
  UNIT = 'unit',
  VALUE = 'value',
  SIZE = 'size',
  POSITION = 'position',
  SCALE = 'scale',
  MIXED = 'mixed'
}

// Usage
const validationType = ValidationType.UNIT;
```

### **CalculationStrategy Enum**
```typescript
import { CalculationStrategy } from '../enums/CalculationStrategy';

// Available calculation strategies
enum CalculationStrategy {
  SUM = 'sum',
  AVERAGE = 'average',
  MIN = 'min',
  MAX = 'max',
  CUSTOM = 'custom'
}

// Usage
const strategy = CalculationStrategy.SUM;
```

## 🏗️ Class Usage

### **UnitSystemManager**
```typescript
import { UnitSystemManager } from '../managers/UnitSystemManager';

// Create manager
const manager = new UnitSystemManager();

// Register units
manager.registerUnit(sizeUnit);
manager.registerUnit(positionUnit);

// Calculate units
const sizeResult = manager.calculateUnit('my-size', context);
const positionResult = manager.calculateUnit('my-position', context);

// Get unit by ID
const unit = manager.getUnit('my-size');

// Remove unit
manager.removeUnit('my-size');
```

### **SizeUnitCalculator**
```typescript
import { SizeUnitCalculator } from '../classes/SizeUnitCalculator';

// Create calculator
const calculator = new SizeUnitCalculator();

// Calculate size
const result = calculator.calculate(context, {
  unit: SizeUnit.PERCENTAGE,
  value: 50,
  dimension: Dimension.WIDTH
});
```

### **PositionUnitCalculator**
```typescript
import { PositionUnitCalculator } from '../classes/PositionUnitCalculator';

// Create calculator
const calculator = new PositionUnitCalculator();

// Calculate position
const result = calculator.calculate(context, {
  unit: PositionUnit.PERCENTAGE,
  value: 25,
  dimension: Dimension.X
});
```

### **ScaleUnitCalculator**
```typescript
import { ScaleUnitCalculator } from '../classes/ScaleUnitCalculator';

// Create calculator
const calculator = new ScaleUnitCalculator();

// Calculate scale
const result = calculator.calculate(context, {
  unit: ScaleUnit.FACTOR,
  value: 1.5
});
```

## 🔧 Method Usage

### **calculate() Method**
```typescript
// Calculate unit value
const result = unit.calculate(context);

// Example with different unit types
const sizeResult = sizeUnit.calculate(context);
const positionResult = positionUnit.calculate(context);
const scaleResult = scaleUnit.calculate(context);
```

### **validate() Method**
```typescript
// Validate unit
const isValid = unit.validate();

// Example with validation input
const validationInput = {
  unit: sizeUnit,
  unitType: UnitType.SIZE,
  dimension: Dimension.WIDTH
};

const isValid = validator.validate(validationInput);
```

### **clone() Method**
```typescript
// Clone unit
const clonedUnit = unit.clone();

// Example
const originalUnit = new SizeUnit('original', 'Original Unit', 100);
const clonedUnit = originalUnit.clone();
clonedUnit.id = 'cloned';
```

## 🎨 Common Patterns

### **Error Handling**
```typescript
try {
  const result = unit.calculate(context);
  console.log('Calculation successful:', result);
} catch (error) {
  console.error('Calculation failed:', error);
  // Handle error appropriately
}
```

### **Validation Pattern**
```typescript
// Validate before calculation
if (unit.validate()) {
  const result = unit.calculate(context);
  // Use result
} else {
  console.error('Unit validation failed');
  // Handle validation error
}
```

### **Observer Pattern**
```typescript
import { LoggingObserver } from '../observers/LoggingObserver';

// Create observer
const observer = new LoggingObserver(LogLevel.INFO);

// Subscribe to unit events
unitManager.addObserver(observer);

// Observer will automatically log unit events
```

### **Command Pattern**
```typescript
import { CalculatePositionCommand } from '../commands/CalculatePositionCommand';

// Create command
const command = new CalculatePositionCommand(positionUnit, context);

// Execute command
const result = command.execute();

// Undo command
command.undo();
```

### **Strategy Pattern**
```typescript
import { SizeUnitStrategy } from '../strategies/SizeUnitStrategy';

// Create strategy
const strategy = new SizeUnitStrategy();

// Use strategy
const result = strategy.calculate(context);
```

### **Composite Pattern**
```typescript
import { UnitGroupComposite } from '../composites/UnitGroupComposite';

// Create composite
const group = new UnitGroupComposite('group1', 'My Group', 0, CalculationStrategy.SUM);

// Add children
group.addChild(sizeUnit);
group.addChild(positionUnit);

// Calculate group
const groupResult = group.calculate(context);
```

## 🔍 Advanced Usage

### **Custom Strategies**
```typescript
import { IUnitStrategy } from '../strategies/IUnitStrategy';

// Create custom strategy
class CustomSizeStrategy implements IUnitStrategy {
  calculate(context: UnitContext): number {
    // Custom calculation logic
    return context.parent.width * 0.5;
  }
}

// Use custom strategy
const customStrategy = new CustomSizeStrategy();
const result = customStrategy.calculate(context);
```

### **Custom Validators**
```typescript
import { IUnitValidator } from '../validators/IUnitValidator';

// Create custom validator
class CustomValidator implements IUnitValidator {
  validate(input: IValidationInput): boolean {
    // Custom validation logic
    return input.value !== undefined && input.value > 0;
  }
}

// Use custom validator
const validator = new CustomValidator();
const isValid = validator.validate(validationInput);
```

### **Custom Observers**
```typescript
import { IUnitObserver } from '../observers/IUnitObserver';

// Create custom observer
class CustomObserver implements IUnitObserver {
  onUnitValueChanged(unitId: string, oldValue: number, newValue: number): void {
    // Custom handling
    console.log(`Unit ${unitId} changed from ${oldValue} to ${newValue}`);
  }
  
  onUnitCreated(unitId: string, unitType: string): void {
    // Custom handling
  }
  
  // ... implement other observer methods
}

// Use custom observer
const observer = new CustomObserver();
unitManager.addObserver(observer);
```

### **Performance Monitoring**
```typescript
import { PerformanceObserver } from '../observers/PerformanceObserver';

// Create performance observer
const performanceObserver = new PerformanceObserver();

// Add to unit manager
unitManager.addObserver(performanceObserver);

// Get performance metrics
const metrics = performanceObserver.getMetrics();
console.log('Performance metrics:', metrics);
```

## 🧪 Testing Usage

### **Unit Testing**
```typescript
import { createMockContext } from '../test/setup';

describe('SizeUnit', () => {
  let sizeUnit: SizeUnit;
  let mockContext: UnitContext;
  
  beforeEach(() => {
    sizeUnit = new SizeUnit('test-size', 'Test Size', 100);
    mockContext = createMockContext();
  });
  
  it('should calculate size correctly', () => {
    const result = sizeUnit.calculate(mockContext);
    expect(result).toBe(100);
  });
});
```

### **Integration Testing**
```typescript
describe('UnitSystemManager Integration', () => {
  let manager: UnitSystemManager;
  let context: UnitContext;
  
  beforeEach(() => {
    manager = new UnitSystemManager();
    context = createMockContext();
  });
  
  it('should manage multiple units', () => {
    const sizeUnit = new SizeUnit('size1', 'Size 1', 100);
    const positionUnit = new PositionUnit('pos1', 'Position 1', 50);
    
    manager.registerUnit(sizeUnit);
    manager.registerUnit(positionUnit);
    
    const sizeResult = manager.calculateUnit('size1', context);
    const positionResult = manager.calculateUnit('pos1', context);
    
    expect(sizeResult).toBe(100);
    expect(positionResult).toBe(50);
  });
});
```

## 📚 Best Practices

### **1. Use Type Safety**
```typescript
// ✅ GOOD: Use proper types
const unit: IUnit = new SizeUnit('id', 'name', 100);

// ❌ BAD: Use any type
const unit: any = new SizeUnit('id', 'name', 100);
```

### **2. Handle Errors Properly**
```typescript
// ✅ GOOD: Proper error handling
try {
  const result = unit.calculate(context);
  return result;
} catch (error) {
  logger.error('Unit calculation failed', { error, unitId: unit.id });
  return unit.baseValue;
}

// ❌ BAD: Ignore errors
const result = unit.calculate(context); // Might throw
```

### **3. Use Enums Instead of Strings**
```typescript
// ✅ GOOD: Use enums
const unitType = UnitType.SIZE;
const dimension = Dimension.WIDTH;

// ❌ BAD: Use string literals
const unitType = 'size';
const dimension = 'width';
```

### **4. Validate Inputs**
```typescript
// ✅ GOOD: Validate inputs
if (unit.validate()) {
  const result = unit.calculate(context);
}

// ❌ BAD: Skip validation
const result = unit.calculate(context);
```

### **5. Use Proper Logging**
```typescript
// ✅ GOOD: Use Logger system
logger.info('UnitSystem', 'calculate', 'Unit calculated successfully', { unitId, result });

// ❌ BAD: Use console
console.log('Unit calculated:', result);
```

## 🚨 Common Pitfalls

### **1. Forgetting to Validate**
```typescript
// ❌ BAD: No validation
const result = unit.calculate(context);

// ✅ GOOD: Always validate
if (unit.validate()) {
  const result = unit.calculate(context);
}
```

### **2. Not Handling Errors**
```typescript
// ❌ BAD: No error handling
const result = unit.calculate(context);

// ✅ GOOD: Proper error handling
try {
  const result = unit.calculate(context);
} catch (error) {
  // Handle error
}
```

### **3. Using String Literals**
```typescript
// ❌ BAD: String literals
const unitType = 'size';

// ✅ GOOD: Use enums
const unitType = UnitType.SIZE;
```

### **4. Not Using Type Safety**
```typescript
// ❌ BAD: Any types
const unit: any = new SizeUnit('id', 'name', 100);

// ✅ GOOD: Proper types
const unit: IUnit = new SizeUnit('id', 'name', 100);
```

## 📞 Support & Resources

### **Documentation**
- **API Reference**: See individual interface and class files
- **Examples**: See `examples/` folder for usage examples
- **Tests**: See `test/` folder for test examples

### **Getting Help**
- **Issues**: Report issues through the project issue tracker
- **Documentation**: Check the `docs/` folder for detailed documentation
- **Code Review**: Follow the coding rules in `docs/CODING_RULES.md`

### **Best Practices**
- Follow the coding rules and standards
- Use proper error handling
- Implement comprehensive testing
- Maintain type safety
- Use the Logger system for logging

---

**Guide Created**: December 2024  
**Last Updated**: December 2024  
**Version**: 1.0.0
