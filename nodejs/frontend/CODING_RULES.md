# 🎯 Coding Rules & Standards

## 📋 Overview

This document defines the coding rules and standards for the Phaser Base Game Module project. These rules ensure consistency, maintainability, and code quality across the entire codebase.

## 🏗️ Architecture Principles

### 1. **SOLID Principles**
- **Single Responsibility**: Each class/module has one reason to change
- **Open/Closed**: Open for extension, closed for modification
- **Liskov Substitution**: Derived classes must be substitutable for base classes
- **Interface Segregation**: Clients shouldn't depend on interfaces they don't use
- **Dependency Inversion**: Depend on abstractions, not concretions

### 2. **Design Patterns**
- **Factory Pattern**: For object creation
- **Strategy Pattern**: For algorithm selection
- **Observer Pattern**: For event handling
- **Command Pattern**: For operation encapsulation
- **Template Method**: For algorithm structure
- **Memento Pattern**: For state management
- **Adapter Pattern**: For interface compatibility
- **Decorator Pattern**: For dynamic behavior extension
- **Composite Pattern**: For tree structures

## 📝 Code Style & Structure

### 1. **File Organization**
```
src/
├── unit/                    # Unit system (size, position, scale)
│   ├── enums/              # Type-safe enumerations
│   ├── interfaces/         # Contract definitions
│   ├── classes/           # Concrete implementations
│   ├── strategies/        # Strategy pattern implementations
│   ├── commands/          # Command pattern implementations
│   ├── observers/         # Observer pattern implementations
│   ├── validators/        # Validation logic
│   ├── templates/         # Template method implementations
│   ├── mementos/          # Memento pattern implementations
│   ├── adapters/          # Adapter pattern implementations
│   ├── decorators/        # Decorator pattern implementations
│   ├── composites/        # Composite pattern implementations
│   ├── managers/          # System managers
│   ├── constants/         # Centralized constants
│   ├── types/            # Type definitions
│   └── test/             # Unit tests
├── core/                  # Core system components
├── abstract/              # Abstract base classes
├── factory/               # Factory implementations
└── examples/              # Usage examples
```

### 2. **Naming Conventions**
- **Interfaces**: `I` prefix (e.g., `IUnit`, `IUnitStrategy`)
- **Enums**: PascalCase (e.g., `SizeUnit`, `PositionUnit`)
- **Classes**: PascalCase (e.g., `SizeUnitCalculator`, `UnitSystemManager`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_FALLBACK_VALUES`)
- **Methods**: camelCase (e.g., `calculate()`, `validate()`)
- **Properties**: camelCase (e.g., `unitType`, `isActive`)

## 🔧 Core Rules

### 1. **Logging Rules** ⚠️ **CRITICAL**

#### ✅ **MUST USE Logger**
```typescript
// ✅ CORRECT - Use logger instance
import { Logger } from '../core/Logger';

export class MyClass {
  private readonly logger: Logger = Logger.getInstance();
  
  public doSomething(): void {
    this.logger.debug('MyClass', 'doSomething', 'Starting operation', {
      param1: 'value1',
      param2: 'value2'
    });
    
    try {
      // ... operation logic
      this.logger.info('MyClass', 'doSomething', 'Operation completed successfully');
    } catch (error) {
      this.logger.error('MyClass', 'doSomething', 'Operation failed', { error });
    }
  }
}
```

#### ❌ **NEVER USE Console**
```typescript
// ❌ FORBIDDEN - Never use console directly
console.log('Debug info');
console.error('Error message');
console.warn('Warning message');

// ❌ FORBIDDEN - Even in tests (use logger instead)
console.log('Test output');
```

#### 📋 **Logger Usage Guidelines**
- **Debug**: For detailed debugging information
- **Info**: For general information and successful operations
- **Warn**: For warnings and potential issues
- **Error**: For errors and exceptions

#### 🔄 **Logger Parameters**
```typescript
logger.method('ClassName', 'methodName', 'message', { data });
//         ↑           ↑           ↑        ↑
//    Class name   Method name   Message   Optional data object
```

### 2. **Constants Management** 📊

#### ✅ **MUST USE Constants File**
```typescript
// ✅ CORRECT - Define constants in constants file
// src/unit/constants/UnitSystemConstants.ts
export const DEFAULT_FALLBACK_VALUES = {
  SIZE: {
    DEFAULT: 100,
    MIN: 1,
    MAX: 10000,
    CONTENT: 400,
    PARENT: 800,
    SCENE: 1200,
    VIEWPORT: 1200
  },
  POSITION: {
    DEFAULT: 0,
    MIN: -10000,
    MAX: 10000
  }
} as const;

// ✅ CORRECT - Use constants in code
import { DEFAULT_FALLBACK_VALUES } from '../constants';

export class MyClass {
  public calculate(): number {
    return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }
}
```

#### ❌ **NEVER USE Magic Numbers/Strings**
```typescript
// ❌ FORBIDDEN - Magic numbers
return 100; // What does 100 mean?

// ❌ FORBIDDEN - Magic strings
if (type === 'size') { // What does 'size' mean?

// ❌ FORBIDDEN - Hardcoded values
const maxWidth = 1200; // Should be in constants
```

#### 📋 **Constants Organization**
```typescript
// Group related constants
export const PERFORMANCE_CONSTANTS = {
  MAX_CALCULATION_HISTORY: 100,
  ERROR_THRESHOLD: 0.1,
  TIMEOUT_MS: 5000
} as const;

export const VALIDATION_CONSTANTS = {
  MAX_ERRORS: 10,
  STRICT_MODE: true,
  AUTO_VALIDATE: true
} as const;
```

### 3. **Type Safety Rules** 🛡️

#### ✅ **MUST DEFINE INTERFACES**
```typescript
// ✅ CORRECT - Define interfaces for all data structures
export interface IUnitConfig {
  readonly id: string;
  readonly name: string;
  readonly unitType: UnitType;
  readonly isActive: boolean;
  readonly metadata?: Record<string, unknown>;
}

// ✅ CORRECT - Use interfaces in function parameters
export function createUnit(config: IUnitConfig): IUnit {
  // Implementation
}
```

#### ❌ **AVOID `any` TYPE**
```typescript
// ❌ FORBIDDEN - Using any type
function processData(data: any): any {
  return data.someProperty;
}

// ❌ FORBIDDEN - Untyped parameters
function calculate(input: any): number {
  return input.value;
}
```

#### ✅ **USE UNKNOWN FOR UNKNOWN TYPES**
```typescript
// ✅ CORRECT - Use unknown for truly unknown types
function processUnknownData(data: unknown): number {
  if (typeof data === 'object' && data !== null && 'value' in data) {
    return (data as { value: number }).value;
  }
  return 0;
}
```

### 4. **Enum Usage Rules** 🎯

#### ✅ **MUST USE ENUMS**
```typescript
// ✅ CORRECT - Define enums for type-safe values
export enum SizeUnit {
  PIXEL = 'pixel',
  PARENT_WIDTH = 'parent-width',
  VIEWPORT_WIDTH = 'viewport-width',
  AUTO = 'auto'
}

export enum UnitType {
  SIZE = 'size',
  POSITION = 'position',
  SCALE = 'scale'
}

// ✅ CORRECT - Use enums in interfaces
export interface IUnit {
  readonly unitType: UnitType;
  readonly sizeUnit: SizeUnit;
}
```

#### ❌ **NEVER USE STRING/NUMBER UNIONS**
```typescript
// ❌ FORBIDDEN - String unions
type UnitType = 'size' | 'position' | 'scale';

// ❌ FORBIDDEN - Number literals
type Priority = 1 | 2 | 3 | 4;

// ❌ FORBIDDEN - Mixed types
type Value = string | number | boolean;
```

#### ✅ **USE ENUMS FOR CONSTANTS**
```typescript
// ✅ CORRECT - Use enums for related constants
export enum StrategyPriority {
  SIZE = 1,
  POSITION = 2,
  SCALE = 3,
  MIXED = 4
}

// ✅ CORRECT - Use enums in calculations
export function getPriority(unitType: UnitType): number {
  switch (unitType) {
    case UnitType.SIZE:
      return StrategyPriority.SIZE;
    case UnitType.POSITION:
      return StrategyPriority.POSITION;
    default:
      return StrategyPriority.MIXED;
  }
}
```

### 5. **Design Pattern Implementation** 🏗️

#### **Strategy Pattern**
```typescript
// ✅ CORRECT - Strategy interface
export interface IUnitStrategy<T = IStrategyInput> {
  readonly unitType: string;
  calculate(input: T, context: UnitContext): number;
  canHandle(input: T): boolean;
  getPriority(): number;
}

// ✅ CORRECT - Concrete strategy
export class SizeUnitStrategy implements IUnitStrategy<IStrategyInput> {
  readonly unitType = 'size';
  
  calculate(input: IStrategyInput, context: UnitContext): number {
    // Implementation
  }
  
  canHandle(input: IStrategyInput): boolean {
    // Implementation
  }
  
  getPriority(): number {
    return StrategyPriority.SIZE;
  }
}
```

#### **Factory Pattern**
```typescript
// ✅ CORRECT - Factory interface
export interface IUnitFactory {
  createUnit(unitType: UnitType, config: IUnitConfig): IUnit;
}

// ✅ CORRECT - Concrete factory
export class UnitCalculatorFactory implements IUnitFactory {
  public static getInstance(): UnitCalculatorFactory {
    if (!UnitCalculatorFactory.instance) {
      UnitCalculatorFactory.instance = new UnitCalculatorFactory();
    }
    return UnitCalculatorFactory.instance;
  }
  
  public createUnit(unitType: UnitType, config: IUnitConfig): IUnit {
    // Implementation
  }
}
```

#### **Observer Pattern**
```typescript
// ✅ CORRECT - Observer interface
export interface IUnitObserver {
  onUnitValueChanged(unit: IUnit, oldValue: number, newValue: number): void;
  onUnitCreated(unit: IUnit): void;
  onUnitDestroyed(unit: IUnit): void;
}

// ✅ CORRECT - Concrete observer
export class LoggingObserver implements IUnitObserver {
  private readonly logger: Logger = Logger.getInstance();
  
  onUnitValueChanged(unit: IUnit, oldValue: number, newValue: number): void {
    this.logger.info('LoggingObserver', 'onUnitValueChanged', 'Unit value changed', {
      unitId: unit.id,
      oldValue,
      newValue
    });
  }
}
```

### 6. **Error Handling** ⚠️

#### ✅ **PROPER ERROR HANDLING**
```typescript
// ✅ CORRECT - Use try-catch with logging
export class MyClass {
  private readonly logger: Logger = Logger.getInstance();
  
  public performOperation(): number {
    try {
      const result = this.calculate();
      this.logger.info('MyClass', 'performOperation', 'Operation successful', { result });
      return result;
    } catch (error) {
      this.logger.error('MyClass', 'performOperation', 'Operation failed', { error });
      return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
    }
  }
}
```

#### ❌ **NEVER IGNORE ERRORS**
```typescript
// ❌ FORBIDDEN - Ignoring errors
try {
  this.calculate();
} catch (error) {
  // Empty catch block
}

// ❌ FORBIDDEN - No error handling
public calculate(): number {
  return this.unsafeOperation(); // What if this fails?
}
```

### 7. **Testing Rules** 🧪

#### ✅ **COMPREHENSIVE TESTING**
```typescript
// ✅ CORRECT - Test all scenarios
describe('MyClass', () => {
  describe('constructor', () => {
    it('should create instance with correct properties', () => {
      // Test
    });
  });
  
  describe('calculate', () => {
    it('should calculate correctly with valid input', () => {
      // Test
    });
    
    it('should handle invalid input gracefully', () => {
      // Test
    });
    
    it('should use fallback values on error', () => {
      // Test
    });
  });
});
```

#### ✅ **USE MOCK CONTEXT**
```typescript
// ✅ CORRECT - Use mock context in tests
import { createMockContext } from '../../test/setup';

describe('MyClass', () => {
  let mockContext: UnitContext;
  
  beforeEach(() => {
    mockContext = createMockContext();
  });
  
  it('should calculate with mock context', () => {
    const result = myClass.calculate(mockContext);
    expect(result).toBe(expectedValue);
  });
});
```

## 📋 Code Review Checklist

### **Before Submitting Code**
- [ ] All `console.*` calls replaced with logger
- [ ] All magic numbers/strings moved to constants
- [ ] All `any` types replaced with proper interfaces
- [ ] All string/number unions replaced with enums
- [ ] All design patterns properly implemented
- [ ] All error scenarios handled
- [ ] All public methods have tests
- [ ] All constants are properly typed with `as const`
- [ ] All interfaces follow naming conventions
- [ ] All classes follow SOLID principles

### **Code Review Points**
- [ ] Type safety maintained throughout
- [ ] Constants used instead of magic values
- [ ] Proper logging implemented
- [ ] Error handling comprehensive
- [ ] Design patterns correctly applied
- [ ] Tests cover all scenarios
- [ ] Code follows naming conventions
- [ ] No `any` types in public APIs

## 🚀 Best Practices Summary

1. **Always use the Logger** - Never use `console.*`
2. **Centralize constants** - No magic numbers or strings
3. **Define interfaces** - Avoid `any` types
4. **Use enums** - Replace string/number unions
5. **Follow design patterns** - Implement SOLID principles
6. **Handle errors properly** - Never ignore exceptions
7. **Write comprehensive tests** - Cover all scenarios
8. **Use type safety** - Leverage TypeScript's type system
9. **Follow naming conventions** - Be consistent
10. **Document your code** - Use JSDoc comments

## 📚 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Design Patterns](https://refactoring.guru/design-patterns)
- [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350884)

---

**Remember**: These rules are not just guidelines - they are **requirements** for maintaining code quality and consistency across the project. Follow them strictly to ensure the codebase remains maintainable and scalable.
