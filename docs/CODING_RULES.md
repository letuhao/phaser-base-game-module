# 🎯 Coding Rules & Standards

## 📋 Overview

This document defines the coding rules and standards for the Phaser Base Game Module project. These rules ensure consistency, maintainability, and code quality across the entire codebase.

## 📚 **Rule Index**

| Rule | Title | Description |
|------|-------|-------------|
| **1** | **Logger Usage** | Always use logger instead of console |
| **2** | **Type Safety** | Avoid `any` types, use proper interfaces |
| **3** | **Magic Number/String Prohibition** | Define constants instead of magic values |
| **4** | **Constants Folder Organization** | Organize constants in dedicated folders |
| **5** | **String Literal Prohibition** | Use enums instead of string literals |
| **6** | **Enum Organization Rules** | Define enums in dedicated folders |
| **7** | **Interface Organization Rules** | Define interfaces in dedicated folders |
| **8** | **Enum Usage** | Use enums instead of string/number unions |
| **9** | **Design Patterns** | Implement SOLID principles |
| **10** | **Error Handling** | Handle all error scenarios |
| **11** | **Testing** | Write comprehensive tests |
| **12** | **Testing Rules** | Use mock context in tests |
| **13** | **System Documentation Rules** | Document system progression, usage, and structure |
| **14** | **Documentation File Organization** | Place documentation files in system docs folders |

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

### 3. **Magic Number/String Prohibition** 🚫

#### ❌ **NEVER USE MAGIC NUMBERS OR STRINGS**
```typescript
// ❌ FORBIDDEN - Magic numbers in code
function calculateArea(width: number, height: number): number {
  return width * height * 0.5; // What does 0.5 mean?
}

// ❌ FORBIDDEN - Magic strings in code
function processType(type: string): void {
  if (type === 'admin') { // What does 'admin' mean?
    // Process admin
  }
}

// ❌ FORBIDDEN - Hardcoded values
const maxRetries = 3; // Should be in constants
const timeoutMs = 5000; // Should be in constants
const defaultTheme = 'dark'; // Should be in constants
```

#### ✅ **ALWAYS DEFINE CONSTANTS**
```typescript
// ✅ CORRECT - Define constants for all magic values
// src/unit/constants/UnitSystemConstants.ts
export const CALCULATION_CONSTANTS = {
  AREA_MULTIPLIER: 0.5,
  PERIMETER_MULTIPLIER: 2.0,
  VOLUME_MULTIPLIER: 1.0
} as const;

export const USER_TYPE_CONSTANTS = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
  MODERATOR: 'moderator'
} as const;

export const SYSTEM_CONSTANTS = {
  MAX_RETRIES: 3,
  TIMEOUT_MS: 5000,
  DEFAULT_THEME: 'dark',
  CACHE_SIZE: 1000
} as const;

// ✅ CORRECT - Use constants in code
import { CALCULATION_CONSTANTS, USER_TYPE_CONSTANTS, SYSTEM_CONSTANTS } from '../constants';

function calculateArea(width: number, height: number): number {
  return width * height * CALCULATION_CONSTANTS.AREA_MULTIPLIER;
}

function processType(type: string): void {
  if (type === USER_TYPE_CONSTANTS.ADMIN) {
    // Process admin
  }
}
```

### 4. **Constants Folder Organization** 📁

#### ✅ **CONSTANTS MUST BE IN CONSTANTS FOLDERS**
```typescript
// ✅ CORRECT - Constants in dedicated constants folders
// src/unit/constants/UnitSystemConstants.ts
export const UNIT_CONSTANTS = {
  DEFAULT_SIZE: 100,
  MIN_SIZE: 1,
  MAX_SIZE: 10000
} as const;

// src/game-object/constants/GameObjectConstants.ts
export const GAME_OBJECT_CONSTANTS = {
  DEFAULT_POSITION: { x: 0, y: 0 },
  DEFAULT_SCALE: { x: 1, y: 1 },
  MAX_CHILDREN: 1000
} as const;

// src/scene/constants/SceneConstants.ts
export const SCENE_CONSTANTS = {
  DEFAULT_WIDTH: 1200,
  DEFAULT_HEIGHT: 800,
  MAX_ELEMENTS: 500
} as const;
```

#### ✅ **CONSTANTS FOLDER STRUCTURE**
```
src/
├── unit/
│   └── constants/
│       ├── UnitSystemConstants.ts
│       ├── SizeConstants.ts
│       ├── PositionConstants.ts
│       └── index.ts
├── game-object/
│   └── constants/
│       ├── GameObjectConstants.ts
│       ├── EffectConstants.ts
│       ├── AudioConstants.ts
│       └── index.ts
├── scene/
│   └── constants/
│       ├── SceneConstants.ts
│       ├── TransitionConstants.ts
│       └── index.ts
└── layout/
    └── constants/
        ├── LayoutConstants.ts
        ├── StyleConstants.ts
        └── index.ts
```

#### ❌ **NEVER DEFINE CONSTANTS OUTSIDE CONSTANTS FOLDERS**
```typescript
// ❌ FORBIDDEN - Constants defined outside constants folders
// src/unit/classes/UnitCalculator.ts
export const DEFAULT_SIZE = 100; // Should be in constants folder

export class UnitCalculator {
  // Implementation
}

// ❌ FORBIDDEN - Constants in interface files
// src/unit/interfaces/IUnit.ts
export const MAX_UNITS = 1000; // Should be in constants folder

export interface IUnit {
  // Interface definition
}
```

### 5. **Type Safety Rules** 🛡️

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

### 6. **Enum Usage Rules** 🎯

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

### 7. **String Literal Prohibition** 🚫

#### ❌ **NEVER USE STRING LITERALS**
```typescript
// ❌ FORBIDDEN - String literals in type definitions
interface IConfig {
  type: 'linear' | 'radial';           // Use enum instead
  direction: 'in' | 'out' | 'both';    // Use enum instead
  format: 'json' | 'yaml' | 'xml';     // Use enum instead
  logLevel: 'debug' | 'info' | 'warn' | 'error'; // Use enum instead
}

// ❌ FORBIDDEN - String literals in function parameters
function processData(type: 'image' | 'audio' | 'video'): void {
  // Use enum instead
}
```

#### ✅ **ALWAYS USE ENUMS FOR STRING VALUES**
```typescript
// ✅ CORRECT - Define enums for all string values
export enum GradientType {
  LINEAR = 'linear',
  RADIAL = 'radial'
}

export enum TransitionDirection {
  IN = 'in',
  OUT = 'out',
  BOTH = 'both'
}

export enum ExportFormat {
  JSON = 'json',
  YAML = 'yaml',
  XML = 'xml'
}

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

// ✅ CORRECT - Use enums in interfaces
interface IConfig {
  type: GradientType;
  direction: TransitionDirection;
  format: ExportFormat;
  logLevel: LogLevel;
}

// ✅ CORRECT - Use enums in function parameters
function processData(type: AssetType): void {
  // Implementation
}
```

### 8. **Enum Organization Rules** 📁

#### ✅ **ENUMS MUST BE IN ENUM FOLDERS**
```typescript
// ✅ CORRECT - Enums in dedicated enum folders
// src/unit/enums/UnitEnums.ts
export enum SizeUnit {
  PIXEL = 'pixel',
  PARENT_WIDTH = 'parent-width',
  VIEWPORT_WIDTH = 'viewport-width',
  AUTO = 'auto'
}

// src/game-object/enums/GameObjectEnums.ts
export enum GameObjectType {
  SPRITE = 'sprite',
  CONTAINER = 'container',
  TEXT = 'text'
}

// src/scene/enums/SceneEnums.ts
export enum SceneEventType {
  SCENE_CREATED = 'scene_created',
  SCENE_DESTROYED = 'scene_destroyed'
}
```

#### ✅ **ENUM FOLDER STRUCTURE**
```
src/
├── unit/
│   └── enums/
│       ├── UnitEnums.ts
│       ├── SizeEnums.ts
│       └── index.ts
├── game-object/
│   └── enums/
│       ├── GameObjectEnums.ts
│       ├── EffectEnums.ts
│       ├── AudioEnums.ts
│       └── index.ts
├── scene/
│   └── enums/
│       ├── SceneEnums.ts
│       └── index.ts
└── layout/
    └── enums/
        ├── LayoutEnums.ts
        └── index.ts
```

#### ❌ **NEVER DEFINE ENUMS IN INTERFACE FILES**
```typescript
// ❌ FORBIDDEN - Enums defined in interface files
// src/unit/interfaces/IUnit.ts
export interface IUnit {
  readonly unitType: UnitType;
}

// ❌ FORBIDDEN - Enum defined in same file as interface
export enum UnitType {
  SIZE = 'size',
  POSITION = 'position'
}
```

### 9. **Interface Organization Rules** 📁

#### ✅ **INTERFACES MUST BE IN INTERFACE FOLDERS**
```typescript
// ✅ CORRECT - Interfaces in dedicated interface folders
// src/unit/interfaces/IUnit.ts
export interface IUnit {
  readonly id: string;
  readonly unitType: UnitType;
  calculate(): number;
}

// src/game-object/interfaces/IGameObject.ts
export interface IGameObject {
  readonly id: string;
  readonly gameObjectType: GameObjectType;
  update(): void;
}

// src/scene/interfaces/ISceneManager.ts
export interface ISceneManager {
  readonly id: string;
  createScene(config: ISceneConfig): IScene;
}
```

#### ✅ **INTERFACE FOLDER STRUCTURE**
```
src/
├── unit/
│   └── interfaces/
│       ├── IUnit.ts
│       ├── IUnitStrategy.ts
│       ├── IUnitFactory.ts
│       └── index.ts
├── game-object/
│   └── interfaces/
│       ├── IGameObject.ts
│       ├── effects/
│       │   ├── IEffect.ts
│       │   └── index.ts
│       ├── audio/
│       │   ├── IAudioObject.ts
│       │   └── index.ts
│       └── index.ts
├── scene/
│   └── interfaces/
│       ├── ISceneManager.ts
│       ├── ISceneConfig.ts
│       ├── managers/
│       │   ├── ISceneElementManager.ts
│       │   └── index.ts
│       └── index.ts
└── layout/
    └── interfaces/
        ├── IStyle.ts
        ├── ILayout.ts
        └── index.ts
```

#### ❌ **NEVER DEFINE INTERFACES OUTSIDE INTERFACE FOLDERS**
```typescript
// ❌ FORBIDDEN - Interfaces defined outside interface folders
// src/unit/classes/UnitCalculator.ts
export interface IUnitConfig {  // Should be in interfaces folder
  readonly id: string;
}

export class UnitCalculator {
  // Implementation
}
```

### 10. **Design Pattern Implementation** 🏗️

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

### 11. **Error Handling** ⚠️

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

### 12. **Testing Rules** 🧪

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

### 13. **System Documentation Rules** 📚

#### ✅ **EACH SYSTEM MUST HAVE PROGRESSION SUMMARY REPORT**
```markdown
# System Progression Summary Report

## Overview
Brief description of the system's purpose and current state.

## Completed Features
- ✅ Feature 1: Description
- ✅ Feature 2: Description
- ✅ Feature 3: Description

## In Progress
- 🚧 Feature 4: Description (50% complete)
- 🚧 Feature 5: Description (25% complete)

## Planned Features
- 📋 Feature 6: Description
- 📋 Feature 7: Description

## Technical Debt
- ⚠️ Issue 1: Description
- ⚠️ Issue 2: Description

## Performance Metrics
- Response Time: X ms
- Memory Usage: X MB
- Error Rate: X%

## Next Steps
1. Complete Feature 4
2. Address Technical Debt Issue 1
3. Implement Feature 6
```

#### ✅ **IMPLEMENTATION PLAN AND PROGRESSION REQUIRED**
```markdown
# System Implementation Plan

## Phase 1: Core Foundation (Week 1-2)
- [ ] Create base interfaces
- [ ] Implement core enums
- [ ] Set up folder structure
- [ ] Create basic classes

## Phase 2: Core Functionality (Week 3-4)
- [ ] Implement main features
- [ ] Add error handling
- [ ] Create unit tests
- [ ] Performance optimization

## Phase 3: Integration (Week 5-6)
- [ ] System integration
- [ ] End-to-end testing
- [ ] Documentation completion
- [ ] Code review

## Progress Tracking
- Overall Progress: 45%
- Phase 1: ✅ 100% Complete
- Phase 2: 🚧 60% Complete
- Phase 3: 📋 0% Complete
```

#### ✅ **SOLID SCORE REPORT MANDATORY**
```markdown
# SOLID Principles Score Report

## Single Responsibility Principle (SRP)
- Score: 9/10
- ✅ Each class has a single, well-defined responsibility
- ⚠️ Class X has multiple responsibilities (needs refactoring)

## Open/Closed Principle (OCP)
- Score: 8/10
- ✅ System is open for extension, closed for modification
- ⚠️ Some classes require modification for new features

## Liskov Substitution Principle (LSP)
- Score: 10/10
- ✅ All derived classes are substitutable for base classes

## Interface Segregation Principle (ISP)
- Score: 9/10
- ✅ Interfaces are focused and specific
- ⚠️ Interface Y is too broad (needs splitting)

## Dependency Inversion Principle (DIP)
- Score: 8/10
- ✅ High-level modules don't depend on low-level modules
- ⚠️ Some dependencies need abstraction

## Overall SOLID Score: 8.8/10
## Recommendations:
1. Refactor Class X to follow SRP
2. Split Interface Y into smaller interfaces
3. Add abstraction layer for remaining dependencies
```

#### ✅ **SYSTEM USAGE DOCUMENTATION REQUIRED**
```markdown
# System Usage Guide

## Quick Start
```typescript
// Import the system
import { SystemManager } from './SystemManager';
import { SystemConfig } from './interfaces/ISystemConfig';

// Create configuration
const config: SystemConfig = {
  id: 'my-system',
  name: 'My System',
  version: '1.0.0'
};

// Initialize system
const system = new SystemManager(config);
```

## Interface Usage
### ISystemConfig
```typescript
interface ISystemConfig {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly isActive: boolean;
}
```

## Enum Usage
### SystemState
```typescript
enum SystemState {
  INITIALIZING = 'initializing',
  ACTIVE = 'active',
  PAUSED = 'paused',
  ERROR = 'error'
}
```

## Class Usage
### SystemManager
```typescript
class SystemManager {
  constructor(config: ISystemConfig);
  initialize(): Promise<void>;
  start(): void;
  stop(): void;
  getState(): SystemState;
}
```

## Method Usage
### initialize()
```typescript
// Initialize the system
await system.initialize();
```

### start()
```typescript
// Start the system
system.start();
```

## Common Patterns
### Error Handling
```typescript
try {
  await system.initialize();
} catch (error) {
  console.error('System initialization failed:', error);
}
```
```

#### ✅ **SYSTEM STRUCTURE AND PURPOSE DOCUMENTATION**
```markdown
# System Structure and Purpose

## Purpose
This system provides [brief description of what the system does and why it exists].

## Architecture Overview
```
src/system/
├── enums/              # Type-safe enumerations
├── interfaces/         # Contract definitions
├── classes/           # Concrete implementations
├── strategies/        # Strategy pattern implementations
├── managers/          # System managers
├── constants/         # Centralized constants
├── docs/             # Documentation
└── test/             # Unit tests
```

## Core Components
### 1. Enums
- **Purpose**: Provide type-safe constants
- **Location**: `enums/`
- **Key Files**: `SystemEnums.ts`

### 2. Interfaces
- **Purpose**: Define contracts and data structures
- **Location**: `interfaces/`
- **Key Files**: `ISystemConfig.ts`, `ISystemManager.ts`

### 3. Classes
- **Purpose**: Implement business logic
- **Location**: `classes/`
- **Key Files**: `SystemManager.ts`, `SystemValidator.ts`

### 4. Strategies
- **Purpose**: Implement different algorithms
- **Location**: `strategies/`
- **Key Files**: `ISystemStrategy.ts`

## Design Patterns Used
- **Factory Pattern**: For object creation
- **Strategy Pattern**: For algorithm selection
- **Observer Pattern**: For event handling
- **Singleton Pattern**: For system managers

## Integration Points
- **Input**: [Describe what the system receives]
- **Output**: [Describe what the system produces]
- **Dependencies**: [List external dependencies]

## Performance Characteristics
- **Memory Usage**: [Expected memory footprint]
- **Processing Time**: [Expected processing time]
- **Scalability**: [How well it scales]

## Security Considerations
- **Data Protection**: [How data is protected]
- **Access Control**: [How access is controlled]
- **Validation**: [Input/output validation]
```

### 14. **Documentation File Organization** 📁

#### ✅ **DOCUMENTATION FILES MUST BE IN SYSTEM DOCS FOLDERS**
```typescript
// ✅ CORRECT - Documentation files in system docs folder
src/system/
├── enums/
├── interfaces/
├── classes/
├── docs/                    # System documentation folder
│   ├── PROGRESSION.md      # Progression summary report
│   ├── IMPLEMENTATION.md   # Implementation plan
│   ├── SOLID_SCORE.md     # SOLID score report
│   ├── USAGE.md           # System usage guide
│   ├── STRUCTURE.md       # System structure and purpose
│   └── README.md          # System overview
├── constants/
└── test/
```

#### ✅ **REQUIRED DOCUMENTATION FILES**
```markdown
# Required Documentation Files in Each System

## 1. PROGRESSION.md
- System progression summary report
- Completed features, in-progress items, planned features
- Technical debt and performance metrics

## 2. IMPLEMENTATION.md
- Implementation plan with phases and timelines
- Progress tracking with percentages
- Development milestones

## 3. SOLID_SCORE.md
- SOLID principles score report
- Quality assessment and recommendations
- Code quality metrics

## 4. USAGE.md
- Comprehensive usage guide
- Quick start examples
- Interface, enum, class, and method usage

## 5. STRUCTURE.md
- System architecture and purpose
- Folder structure and core components
- Design patterns and integration points

## 6. README.md
- System overview and quick reference
- Links to other documentation files
- Getting started guide
```

#### ✅ **DOCUMENTATION FOLDER STRUCTURE**
```typescript
// ✅ CORRECT - Proper documentation organization
src/
├── unit/
│   ├── docs/
│   │   ├── PROGRESSION.md
│   │   ├── IMPLEMENTATION.md
│   │   ├── SOLID_SCORE.md
│   │   ├── USAGE.md
│   │   ├── STRUCTURE.md
│   │   └── README.md
│   ├── enums/
│   └── interfaces/
├── layout/
│   ├── docs/
│   │   ├── PROGRESSION.md
│   │   ├── IMPLEMENTATION.md
│   │   ├── SOLID_SCORE.md
│   │   ├── USAGE.md
│   │   ├── STRUCTURE.md
│   │   └── README.md
│   ├── enums/
│   └── interfaces/
├── game-object/
│   ├── docs/
│   │   ├── PROGRESSION.md
│   │   ├── IMPLEMENTATION.md
│   │   ├── SOLID_SCORE.md
│   │   ├── USAGE.md
│   │   ├── STRUCTURE.md
│   │   └── README.md
│   ├── enums/
│   └── interfaces/
├── scene/
│   ├── docs/
│   │   ├── PROGRESSION.md
│   │   ├── IMPLEMENTATION.md
│   │   ├── SOLID_SCORE.md
│   │   ├── USAGE.md
│   │   ├── STRUCTURE.md
│   │   └── README.md
│   ├── enums/
│   └── interfaces/
└── asset/
    ├── docs/
    │   ├── PROGRESSION.md
    │   ├── IMPLEMENTATION.md
    │   ├── SOLID_SCORE.md
    │   ├── USAGE.md
    │   ├── STRUCTURE.md
    │   └── README.md
    ├── enums/
    └── interfaces/
```

#### ❌ **INCORRECT - Documentation files in wrong locations**
```typescript
// ❌ INCORRECT - Documentation files scattered
src/system/
├── PROGRESSION.md          # Should be in docs/
├── enums/
├── interfaces/
├── USAGE.md               # Should be in docs/
├── classes/
└── STRUCTURE.md           # Should be in docs/

// ❌ INCORRECT - Documentation files in root
docs/
├── system-progression.md  # Should be in system/docs/
├── system-usage.md        # Should be in system/docs/
└── system-structure.md    # Should be in system/docs/
```

## 📋 Code Review Checklist

### **Before Submitting Code**
- [ ] All `console.*` calls replaced with logger
- [ ] **All magic numbers/strings moved to constants**
- [ ] **All constants defined in dedicated constants folders**
- [ ] All `any` types replaced with proper interfaces
- [ ] All string/number unions replaced with enums
- [ ] **All string literals replaced with enums**
- [ ] **All enums defined in dedicated enum folders**
- [ ] **All interfaces defined in dedicated interface folders**
- [ ] **System progression summary report created/updated**
- [ ] **Implementation plan and progression documented**
- [ ] **SOLID score report generated**
- [ ] **System usage documentation complete**
- [ ] **System structure and purpose documented**
- [ ] **All documentation files placed in system docs folders**
- [ ] **All required documentation files present (PROGRESSION.md, IMPLEMENTATION.md, SOLID_SCORE.md, USAGE.md, STRUCTURE.md, README.md)**
- [ ] All design patterns properly implemented
- [ ] All error scenarios handled
- [ ] All public methods have tests
- [ ] All constants are properly typed with `as const`
- [ ] All interfaces follow naming conventions
- [ ] All classes follow SOLID principles

### **Code Review Points**
- [ ] Type safety maintained throughout
- [ ] **Constants used instead of magic values**
- [ ] **Constants properly organized in constants folders**
- [ ] **No string literals in type definitions**
- [ ] **Enums properly organized in enum folders**
- [ ] **Interfaces properly organized in interface folders**
- [ ] **System documentation complete and up-to-date**
- [ ] **SOLID principles properly implemented**
- [ ] **System usage examples provided**
- [ ] **System structure clearly documented**
- [ ] **Documentation files properly organized in system docs folders**
- [ ] **All required documentation files present and complete**
- [ ] Proper logging implemented
- [ ] Error handling comprehensive
- [ ] Design patterns correctly applied
- [ ] Tests cover all scenarios
- [ ] Code follows naming conventions
- [ ] No `any` types in public APIs

## 🚀 Best Practices Summary

1. **Always use the Logger** - Never use `console.*`
2. **Prohibit magic numbers/strings** - Always define constants
3. **Organize constants properly** - Define in dedicated constants folders
4. **Define interfaces** - Avoid `any` types
5. **Use enums** - Replace string/number unions
6. **Prohibit string literals** - Always use enums for string values
7. **Organize enums properly** - Define in dedicated enum folders
8. **Organize interfaces properly** - Define in dedicated interface folders
9. **Document system progression** - Create progression summary reports
10. **Plan implementation** - Document implementation plans and progression
11. **Generate SOLID score reports** - Assess and improve code quality
12. **Document system usage** - Provide comprehensive usage guides
13. **Document system structure** - Explain architecture and purpose
14. **Organize documentation files** - Place in system docs folders
15. **Follow design patterns** - Implement SOLID principles
16. **Handle errors properly** - Never ignore exceptions
17. **Write comprehensive tests** - Cover all scenarios
18. **Use type safety** - Leverage TypeScript's type system
19. **Follow naming conventions** - Be consistent
20. **Document your code** - Use JSDoc comments

## 📚 Additional Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Design Patterns](https://refactoring.guru/design-patterns)
- [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350884)

---

**Remember**: These rules are not just guidelines - they are **requirements** for maintaining code quality and consistency across the project. Follow them strictly to ensure the codebase remains maintainable and scalable.
