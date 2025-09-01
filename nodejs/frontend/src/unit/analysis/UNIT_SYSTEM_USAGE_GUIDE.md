# 🎯 Unit System Usage Guide

## 📋 Overview

The Unit System is a comprehensive, type-safe, and extensible framework for handling responsive calculations in the Phaser Base Game Module. It provides a structured approach to managing size, position, and scale calculations with support for various contexts (parent, scene, viewport, etc.).

## 🏗️ Architecture Overview

### **Core Components**
```
Unit System
├── Enums (Type-safe values)
├── Interfaces (Contracts)
├── Classes (Implementations)
├── Strategies (Algorithms)
├── Commands (Operations)
├── Observers (Events)
├── Validators (Validation)
├── Templates (Algorithms)
├── Mementos (State)
├── Adapters (Compatibility)
├── Decorators (Behavior)
├── Composites (Structures)
├── Managers (Orchestration)
└── Constants (Configuration)
```

### **Design Patterns Used**
- **Factory Pattern**: Object creation
- **Strategy Pattern**: Algorithm selection
- **Observer Pattern**: Event handling
- **Command Pattern**: Operation encapsulation
- **Template Method**: Algorithm structure
- **Memento Pattern**: State management
- **Adapter Pattern**: Interface compatibility
- **Decorator Pattern**: Dynamic behavior
- **Composite Pattern**: Tree structures

## 🚀 Quick Start

### **1. Basic Usage**

```typescript
import { 
  UnitSystemManager, 
  SizeUnit, 
  PositionUnit, 
  ScaleUnit,
  createSizeTemplateInput,
  createPositionTemplateInput,
  createScaleTemplateInput
} from '../unit';

// Get the unit system manager
const unitManager = UnitSystemManager.getInstance();

// Create a size unit (100 pixels)
const sizeInput = createSizeTemplateInput(SizeUnit.PIXEL, 100);
const sizeValue = unitManager.calculateSize(sizeInput, context);

// Create a position unit (center of parent)
const positionInput = createPositionTemplateInput(PositionUnit.PARENT_CENTER, 0);
const positionValue = unitManager.calculatePosition(positionInput, context);

// Create a scale unit (1.5x scale)
const scaleInput = createScaleTemplateInput(ScaleUnit.FACTOR, 1.5);
const scaleValue = unitManager.calculateScale(scaleInput, context);
```

### **2. Context Setup**

```typescript
import { UnitContext } from '../unit';

const context: UnitContext = {
  parent: {
    width: 800,
    height: 600,
    x: 0,
    y: 0
  },
  scene: {
    width: 1200,
    height: 800
  },
  viewport: {
    width: 1200,
    height: 800
  },
  content: {
    width: 400,
    height: 300
  },
  breakpoint: {
    name: 'desktop',
    width: 1200,
    height: 800
  }
};
```

## 📊 Unit Types & Usage

### **Size Units**

```typescript
import { SizeUnit, createSizeTemplateInput } from '../unit';

// Pixel values
const pixelSize = createSizeTemplateInput(SizeUnit.PIXEL, 100);

// Parent-relative (like CSS %)
const parentWidth = createSizeTemplateInput(SizeUnit.PARENT_WIDTH, 50); // 50% of parent width
const parentHeight = createSizeTemplateInput(SizeUnit.PARENT_HEIGHT, 75); // 75% of parent height

// Scene-relative
const sceneWidth = createSizeTemplateInput(SizeUnit.SCENE_WIDTH, 25); // 25% of scene width

// Viewport-relative (like CSS vw/vh)
const viewportWidth = createSizeTemplateInput(SizeUnit.VIEWPORT_WIDTH, 30); // 30vw

// Content-based
const contentSize = createSizeTemplateInput(SizeUnit.CONTENT, 100); // Based on content

// Auto-sizing
const autoSize = createSizeTemplateInput(SizeUnit.AUTO, 0); // Auto-size based on content
const fillSize = createSizeTemplateInput(SizeUnit.FILL, 0); // Fill available space
```

### **Position Units**

```typescript
import { PositionUnit, createPositionTemplateInput } from '../unit';

// Pixel positions
const pixelPos = createPositionTemplateInput(PositionUnit.PIXEL, 100);

// Parent-relative positioning
const parentCenter = createPositionTemplateInput(PositionUnit.PARENT_CENTER, 0);
const parentLeft = createPositionTemplateInput(PositionUnit.PARENT_LEFT, 10);
const parentTop = createPositionTemplateInput(PositionUnit.PARENT_TOP, 20);

// Scene-relative positioning
const sceneCenter = createPositionTemplateInput(PositionUnit.SCENE_CENTER, 0);
const sceneLeft = createPositionTemplateInput(PositionUnit.SCENE_LEFT, 50);

// Viewport-relative positioning
const viewportCenter = createPositionTemplateInput(PositionUnit.VIEWPORT_CENTER, 0);

// Content-based positioning
const contentCenter = createPositionTemplateInput(PositionUnit.CONTENT_CENTER, 0);
```

### **Scale Units**

```typescript
import { ScaleUnit, createScaleTemplateInput } from '../unit';

// Factor-based scaling
const scaleFactor = createScaleTemplateInput(ScaleUnit.FACTOR, 1.5); // 1.5x scale

// Parent-relative scaling
const parentScale = createScaleTemplateInput(ScaleUnit.PARENT_SCALE, 0.8); // 80% of parent scale

// Content-based scaling
const contentScale = createScaleTemplateInput(ScaleUnit.CONTENT_SCALE, 1.2); // 120% of content scale

// Auto-scaling
const autoScale = createScaleTemplateInput(ScaleUnit.AUTO, 0); // Auto-scale based on content
```

## 🔧 Advanced Usage

### **1. Strategy Pattern Usage**

```typescript
import { 
  IUnitStrategy, 
  SizeUnitStrategy, 
  PositionUnitStrategy, 
  ScaleUnitStrategy 
} from '../unit';

// Create strategies
const sizeStrategy = new SizeUnitStrategy();
const positionStrategy = new PositionUnitStrategy();
const scaleStrategy = new ScaleUnitStrategy();

// Use strategies directly
const sizeValue = sizeStrategy.calculate(sizeInput, context);
const positionValue = positionStrategy.calculate(positionInput, context);
const scaleValue = scaleStrategy.calculate(scaleInput, context);

// Check if strategy can handle input
if (sizeStrategy.canHandle(sizeInput)) {
  const result = sizeStrategy.calculate(sizeInput, context);
}
```

### **2. Command Pattern Usage**

```typescript
import { 
  CalculateSizeCommand, 
  CalculatePositionCommand, 
  BatchCalculationCommand 
} from '../unit';

// Single calculation command
const sizeCommand = new CalculateSizeCommand(sizeInput, context);
const sizeResult = sizeCommand.execute();

// Batch calculations
const batchCommand = new BatchCalculationCommand([
  new CalculateSizeCommand(sizeInput, context),
  new CalculatePositionCommand(positionInput, context),
  new CalculateScaleCommand(scaleInput, context)
]);

const batchResults = batchCommand.execute();
```

### **3. Observer Pattern Usage**

```typescript
import { 
  IUnitObserver, 
  LoggingObserver, 
  PerformanceObserver 
} from '../unit';

// Create observers
const loggingObserver = new LoggingObserver();
const performanceObserver = new PerformanceObserver();

// Register observers with unit manager
unitManager.addObserver(loggingObserver);
unitManager.addObserver(performanceObserver);

// Observers will automatically receive notifications
// when unit values change, units are created, or units are destroyed
```

### **4. Validation Usage**

```typescript
import { 
  RangeValidator, 
  TypeValidator 
} from '../unit';

// Create validators
const rangeValidator = new RangeValidator();
const typeValidator = new TypeValidator();

// Validate inputs
const isValidRange = rangeValidator.validate(sizeInput);
const isValidType = typeValidator.validate(sizeInput);

// Use in calculations
if (rangeValidator.validate(input) && typeValidator.validate(input)) {
  const result = unitManager.calculateSize(input, context);
}
```

### **5. Template Method Usage**

```typescript
import { 
  SizeCalculationTemplate, 
  PositionCalculationTemplate, 
  ScaleCalculationTemplate 
} from '../unit';

// Use calculation templates
const sizeTemplate = new SizeCalculationTemplate();
const sizeResult = sizeTemplate.calculate(sizeInput, context);

const positionTemplate = new PositionCalculationTemplate();
const positionResult = positionTemplate.calculate(positionInput, context);

const scaleTemplate = new ScaleCalculationTemplate();
const scaleResult = scaleTemplate.calculate(scaleInput, context);
```

### **6. Memento Pattern Usage**

```typescript
import { 
  UnitMementoManager, 
  UnitCalculationMemento 
} from '../unit';

// Create memento manager
const mementoManager = new UnitMementoManager();

// Save calculation state
const memento = new UnitCalculationMemento(unit, oldValue, context);
mementoManager.saveMemento(unit.id, memento);

// Restore calculation state
const restoredMemento = mementoManager.getMemento(unit.id);
if (restoredMemento) {
  const restoredValue = restoredMemento.getValue();
}
```

### **7. Adapter Pattern Usage**

```typescript
import { 
  LegacySizeUnitAdapter, 
  LegacyPositionUnitAdapter 
} from '../unit';

// Adapt legacy units to new system
const legacySizeUnit = createLegacySizeUnit({ size: 100, sizeUnit: 'pixel' });
const sizeAdapter = new LegacySizeUnitAdapter(legacySizeUnit);

const adaptedValue = sizeAdapter.calculate(context);
const isResponsive = sizeAdapter.isResponsive();
const canAdapt = sizeAdapter.canAdapt(legacySizeUnit);
```

### **8. Decorator Pattern Usage**

```typescript
import { 
  CachingDecorator, 
  ValidationDecorator 
} from '../unit';

// Create decorated unit with caching
const baseUnit = new SizeUnitCalculator();
const cachedUnit = new CachingDecorator(baseUnit);

// Create decorated unit with validation
const validatedUnit = new ValidationDecorator(baseUnit);

// Use decorated units
const cachedResult = cachedUnit.calculate(input, context); // Cached for performance
const validatedResult = validatedUnit.calculate(input, context); // Validated before calculation
```

### **9. Composite Pattern Usage**

```typescript
import { 
  UnitGroupComposite 
} from '../unit';

// Create composite unit group
const composite = new UnitGroupComposite('group-1');

// Add child units
composite.addChild(sizeUnit1);
composite.addChild(sizeUnit2);
composite.addChild(positionUnit1);

// Calculate composite result
const compositeResult = composite.calculate(context);

// Remove child unit
composite.removeChild(sizeUnit1.id);
```

## 🎨 Applying Unit System Patterns to Other Code

### **1. Creating Your Own Unit System**

```typescript
// 1. Define enums for your domain
export enum ColorUnit {
  RGB = 'rgb',
  HSL = 'hsl',
  HEX = 'hex',
  NAMED = 'named'
}

export enum AnimationUnit {
  FRAMES = 'frames',
  DURATION = 'duration',
  EASING = 'easing',
  LOOP = 'loop'
}

// 2. Define interfaces
export interface IColorUnit {
  readonly id: string;
  readonly colorType: ColorUnit;
  readonly value: string | number;
  calculate(context: ColorContext): string;
}

export interface ColorContext {
  theme?: string;
  brightness?: number;
  contrast?: number;
  [key: string]: unknown;
}

// 3. Create strategies
export class ColorUnitStrategy implements IUnitStrategy<IColorInput> {
  readonly unitType = 'color';
  
  calculate(input: IColorInput, context: ColorContext): string {
    // Implementation
  }
  
  canHandle(input: IColorInput): boolean {
    // Implementation
  }
  
  getPriority(): number {
    return 1;
  }
}

// 4. Create manager
export class ColorSystemManager {
  private static instance: ColorSystemManager;
  private strategies: Map<string, IUnitStrategy> = new Map();
  
  public static getInstance(): ColorSystemManager {
    if (!ColorSystemManager.instance) {
      ColorSystemManager.instance = new ColorSystemManager();
    }
    return ColorSystemManager.instance;
  }
  
  public calculateColor(input: IColorInput, context: ColorContext): string {
    // Implementation
  }
}
```

### **2. Creating Your Own Constants System**

```typescript
// src/your-system/constants/YourSystemConstants.ts
export const COLOR_SYSTEM_CONSTANTS = {
  DEFAULT: {
    PRIMARY: '#007bff',
    SECONDARY: '#6c757d',
    SUCCESS: '#28a745',
    DANGER: '#dc3545'
  },
  LIMITS: {
    MIN_BRIGHTNESS: 0,
    MAX_BRIGHTNESS: 100,
    MIN_CONTRAST: 0,
    MAX_CONTRAST: 100
  },
  PERFORMANCE: {
    CACHE_SIZE: 100,
    TIMEOUT_MS: 1000
  }
} as const;

export const ANIMATION_SYSTEM_CONSTANTS = {
  DEFAULT: {
    DURATION: 300,
    EASING: 'ease-in-out',
    FRAMES: 60
  },
  LIMITS: {
    MIN_DURATION: 50,
    MAX_DURATION: 5000,
    MIN_FRAMES: 1,
    MAX_FRAMES: 120
  }
} as const;
```

### **3. Creating Your Own Observer System**

```typescript
// src/your-system/observers/IColorObserver.ts
export interface IColorObserver {
  onColorChanged(color: IColorUnit, oldValue: string, newValue: string): void;
  onColorCreated(color: IColorUnit): void;
  onColorDestroyed(color: IColorUnit): void;
}

// src/your-system/observers/ColorLoggingObserver.ts
export class ColorLoggingObserver implements IColorObserver {
  private readonly logger: Logger = Logger.getInstance();
  
  onColorChanged(color: IColorUnit, oldValue: string, newValue: string): void {
    this.logger.info('ColorLoggingObserver', 'onColorChanged', 'Color value changed', {
      colorId: color.id,
      oldValue,
      newValue
    });
  }
  
  onColorCreated(color: IColorUnit): void {
    this.logger.info('ColorLoggingObserver', 'onColorCreated', 'Color created', {
      colorId: color.id,
      colorType: color.colorType
    });
  }
  
  onColorDestroyed(color: IColorUnit): void {
    this.logger.info('ColorLoggingObserver', 'onColorDestroyed', 'Color destroyed', {
      colorId: color.id
    });
  }
}
```

### **4. Creating Your Own Validator System**

```typescript
// src/your-system/validators/IColorValidator.ts
export interface IColorValidator {
  validate(input: IColorInput): boolean;
  getErrors(): string[];
}

// src/your-system/validators/ColorRangeValidator.ts
export class ColorRangeValidator implements IColorValidator {
  private errors: string[] = [];
  
  validate(input: IColorInput): boolean {
    this.errors = [];
    
    if (input.brightness < COLOR_SYSTEM_CONSTANTS.LIMITS.MIN_BRIGHTNESS ||
        input.brightness > COLOR_SYSTEM_CONSTANTS.LIMITS.MAX_BRIGHTNESS) {
      this.errors.push('Brightness out of range');
      return false;
    }
    
    return true;
  }
  
  getErrors(): string[] {
    return [...this.errors];
  }
}
```

### **5. Creating Your Own Template System**

```typescript
// src/your-system/templates/IColorCalculationTemplate.ts
export interface IColorCalculationTemplate {
  calculate(input: IColorInput, context: ColorContext): string;
  validate(input: IColorInput): boolean;
  getFallbackValue(): string;
}

// src/your-system/templates/ColorCalculationTemplate.ts
export abstract class ColorCalculationTemplate implements IColorCalculationTemplate {
  abstract calculate(input: IColorInput, context: ColorContext): string;
  
  validate(input: IColorInput): boolean {
    // Common validation logic
    return true;
  }
  
  getFallbackValue(): string {
    return COLOR_SYSTEM_CONSTANTS.DEFAULT.PRIMARY;
  }
  
  protected logCalculation(input: IColorInput, result: string): void {
    const logger = Logger.getInstance();
    logger.debug('ColorCalculationTemplate', 'calculate', 'Color calculated', {
      input,
      result
    });
  }
}
```

## 🔄 Integration Examples

### **1. Integrating with Phaser GameObjects**

```typescript
import { UnitSystemManager } from '../unit';
import { SizeUnit, PositionUnit, ScaleUnit } from '../unit';

export class ResponsiveGameObject {
  private unitManager = UnitSystemManager.getInstance();
  private gameObject: Phaser.GameObjects.GameObject;
  
  constructor(gameObject: Phaser.GameObjects.GameObject) {
    this.gameObject = gameObject;
  }
  
  setResponsiveSize(sizeInput: ITemplateInput, context: UnitContext): void {
    const size = this.unitManager.calculateSize(sizeInput, context);
    this.gameObject.setSize(size, size);
  }
  
  setResponsivePosition(positionInput: ITemplateInput, context: UnitContext): void {
    const x = this.unitManager.calculatePosition(positionInput, context);
    const y = this.unitManager.calculatePosition(positionInput, context);
    this.gameObject.setPosition(x, y);
  }
  
  setResponsiveScale(scaleInput: ITemplateInput, context: UnitContext): void {
    const scale = this.unitManager.calculateScale(scaleInput, context);
    this.gameObject.setScale(scale);
  }
}
```

### **2. Integrating with UI Components**

```typescript
import { UnitSystemManager } from '../unit';

export class ResponsiveUIComponent {
  private unitManager = UnitSystemManager.getInstance();
  private element: HTMLElement;
  
  constructor(element: HTMLElement) {
    this.element = element;
  }
  
  updateLayout(context: UnitContext): void {
    // Update width
    const widthInput = createSizeTemplateInput(SizeUnit.PARENT_WIDTH, 100);
    const width = this.unitManager.calculateSize(widthInput, context);
    this.element.style.width = `${width}px`;
    
    // Update height
    const heightInput = createSizeTemplateInput(SizeUnit.PARENT_HEIGHT, 50);
    const height = this.unitManager.calculateSize(heightInput, context);
    this.element.style.height = `${height}px`;
    
    // Update position
    const xInput = createPositionTemplateInput(PositionUnit.PARENT_CENTER, 0);
    const x = this.unitManager.calculatePosition(xInput, context);
    this.element.style.left = `${x}px`;
  }
}
```

### **3. Integrating with Configuration System**

```typescript
import { UnitSystemManager } from '../unit';

export class ResponsiveConfigManager {
  private unitManager = UnitSystemManager.getInstance();
  
  applyResponsiveConfig(config: any, context: UnitContext): any {
    const responsiveConfig = { ...config };
    
    // Apply responsive sizing
    if (config.size) {
      const sizeInput = this.parseSizeConfig(config.size);
      responsiveConfig.calculatedSize = this.unitManager.calculateSize(sizeInput, context);
    }
    
    // Apply responsive positioning
    if (config.position) {
      const positionInput = this.parsePositionConfig(config.position);
      responsiveConfig.calculatedPosition = this.unitManager.calculatePosition(positionInput, context);
    }
    
    // Apply responsive scaling
    if (config.scale) {
      const scaleInput = this.parseScaleConfig(config.scale);
      responsiveConfig.calculatedScale = this.unitManager.calculateScale(scaleInput, context);
    }
    
    return responsiveConfig;
  }
  
  private parseSizeConfig(config: any): ITemplateInput {
    // Parse size configuration into template input
    return createSizeTemplateInput(config.unit, config.value);
  }
  
  private parsePositionConfig(config: any): ITemplateInput {
    // Parse position configuration into template input
    return createPositionTemplateInput(config.unit, config.value);
  }
  
  private parseScaleConfig(config: any): ITemplateInput {
    // Parse scale configuration into template input
    return createScaleTemplateInput(config.unit, config.value);
  }
}
```

## 📋 Best Practices

### **1. Always Use Constants**
```typescript
// ✅ Good
import { DEFAULT_FALLBACK_VALUES } from '../constants';
return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;

// ❌ Bad
return 100; // Magic number
```

### **2. Always Use Type-Safe Enums**
```typescript
// ✅ Good
export enum MyUnitType {
  TYPE_A = 'type-a',
  TYPE_B = 'type-b'
}

// ❌ Bad
type MyUnitType = 'type-a' | 'type-b';
```

### **3. Always Use Interfaces**
```typescript
// ✅ Good
export interface IMyUnit {
  readonly id: string;
  readonly type: MyUnitType;
  calculate(context: MyContext): number;
}

// ❌ Bad
function calculate(unit: any): number {
  return unit.value;
}
```

### **4. Always Use Logger**
```typescript
// ✅ Good
private readonly logger: Logger = Logger.getInstance();
this.logger.info('MyClass', 'method', 'Operation completed');

// ❌ Bad
console.log('Operation completed');
```

### **5. Always Handle Errors**
```typescript
// ✅ Good
try {
  const result = this.calculate(input, context);
  this.logger.info('MyClass', 'calculate', 'Calculation successful', { result });
  return result;
} catch (error) {
  this.logger.error('MyClass', 'calculate', 'Calculation failed', { error });
  return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
}

// ❌ Bad
return this.calculate(input, context); // No error handling
```

## 🧪 Testing Guidelines

### **1. Test All Scenarios**
```typescript
describe('MyUnitSystem', () => {
  describe('calculate', () => {
    it('should calculate correctly with valid input', () => {
      // Test valid input
    });
    
    it('should handle invalid input gracefully', () => {
      // Test invalid input
    });
    
    it('should use fallback values on error', () => {
      // Test error scenarios
    });
    
    it('should handle edge cases', () => {
      // Test edge cases
    });
  });
});
```

### **2. Use Mock Context**
```typescript
import { createMockContext } from '../../test/setup';

describe('MyUnitSystem', () => {
  let mockContext: UnitContext;
  
  beforeEach(() => {
    mockContext = createMockContext();
  });
  
  it('should calculate with mock context', () => {
    const result = myUnit.calculate(input, mockContext);
    expect(result).toBe(expectedValue);
  });
});
```

## 📚 Summary

The Unit System provides a comprehensive, type-safe, and extensible framework for handling responsive calculations. By following the patterns and guidelines outlined in this guide, you can:

1. **Create your own unit systems** for different domains (colors, animations, etc.)
2. **Apply the same design patterns** to maintain consistency
3. **Ensure type safety** throughout your codebase
4. **Maintain proper logging** and error handling
5. **Write comprehensive tests** for all scenarios
6. **Follow the established conventions** for maintainability

The key is to understand the patterns and apply them consistently across your codebase while maintaining the same level of type safety, error handling, and logging that the Unit System demonstrates.
