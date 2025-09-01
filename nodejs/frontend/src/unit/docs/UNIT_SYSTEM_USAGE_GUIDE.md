# 🎯 Unit System Usage Guide

## 📋 Overview

The Unit System is a comprehensive, type-safe, and extensible framework for handling responsive calculations in the Phaser Base Game Module. It provides a structured approach to managing size, position, and scale calculations with support for various contexts (parent, scene, viewport, etc.).

## 🏗️ Architecture Overview

### **Core Components**
```
Unit System
├── Enums (Type-safe values)
│   ├── *Value (Semantic Behaviors: FILL, AUTO, CENTER, etc.)
│   └── *Unit (Measurement Types: PIXEL, PARENT_WIDTH, etc.)
├── Interfaces (Contracts)
├── Classes (Implementations)
│   ├── SizeUnitCalculator
│   ├── PositionUnitCalculator
│   └── ScaleUnitCalculator
├── Strategies (Algorithms)
│   ├── Value Calculation Strategies
│   └── Strategy Composition
├── Commands (Operations)
├── Observers (Events)
├── Validators (Validation)
├── Templates (Algorithms)
├── Mementos (State)
├── Adapters (Compatibility)
├── Decorators (Behavior)
├── Composites (Structures)
├── Managers (Orchestration)
├── Constants (Configuration)
├── Monitoring (Performance)
├── Deployment (Features)
├── Cache (Performance)
└── Composition (Strategy)
```

### **Enum Architecture (NEW)**
The unit system now uses a clear separation between **semantic behaviors** and **measurement types**:

#### **Size System**
- **`SizeValue`** (Behaviors): `FILL`, `AUTO`, `FIT`, `STRETCH`, `MIN`, `MAX`
- **`SizeUnit`** (Measurements): `PIXEL`, `PERCENTAGE`, `PARENT_WIDTH`, `PARENT_HEIGHT`, `SCENE_WIDTH`, `SCENE_HEIGHT`, `VIEWPORT_WIDTH`, `VIEWPORT_HEIGHT`

#### **Position System**
- **`PositionValue`** (Behaviors): `CENTER`, `LEFT`, `RIGHT`, `TOP`, `BOTTOM`, `START`, `END`
- **`PositionUnit`** (Measurements): `PIXEL`, `PERCENTAGE`, `PARENT_LEFT`, `PARENT_RIGHT`, `PARENT_CENTER_X`, `PARENT_CENTER_Y`, `SCENE_LEFT`, `SCENE_RIGHT`, `SCENE_CENTER_X`, `SCENE_CENTER_Y`

#### **Scale System**
- **`ScaleValue`** (Behaviors): `FIT`, `STRETCH`, `FILL`, `AUTO`, `RESPONSIVE`, `RANDOM`
- **`ScaleUnit`** (Measurements): `FACTOR`, `PERCENTAGE`, `PARENT_SCALE`, `SCENE_SCALE`, `VIEWPORT_SCALE`

### **Calculation Logic Flow (UPDATED)**
The unit system now follows a consistent **Unit → Value** calculation flow:

```typescript
// 1. Determine measurement based on Unit (measurement type)
let measuredValue: number;
switch (this.unit) {
  case Unit.PIXEL:
    measuredValue = typeof this.baseValue === 'number' ? this.baseValue : fallback;
    break;
  case Unit.PARENT_WIDTH:
    measuredValue = context.parent?.width ?? fallback;
    break;
  // ... other units
}

// 2. Apply behavior based on Value (semantic behavior)
return this.applyValue(measuredValue, context);
```

This ensures:
- **Consistent Logic**: All calculators follow the same pattern
- **Correct Results**: `SizeValue.FILL` + `SizeUnit.PARENT_WIDTH` returns parent width, not scene width
- **Type Safety**: Proper handling of both enum values and numeric values
- **Fallback Support**: Graceful handling of missing context

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
- **Registry Pattern**: Strategy management
- **Cache Pattern**: Performance optimization
- **Composition Pattern**: Strategy combination
- **Registry Pattern**: Strategy management
- **Cache Pattern**: Performance optimization
- **Composition Pattern**: Strategy combination

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

### **1. Manager System Usage**

```typescript
import { 
  UnitSystemManager,
  CommandManager,
  PerformanceManager,
  UnitRegistryManager,
  ObserverManager,
  ValidationManager,
  StrategyManager
} from '../unit';

// Get the main unit system manager
const unitManager = UnitSystemManager.getInstance();

// Access individual managers
const commandManager = unitManager.getCommandManager();
const performanceManager = unitManager.getPerformanceManager();
const unitRegistryManager = unitManager.getUnitRegistryManager();
const observerManager = unitManager.getObserverManager();
const validationManager = unitManager.getValidationManager();
const strategyManager = unitManager.getStrategyManager();

// Use command manager for operations
const command = new CalculateSizeCommand(sizeInput, context);
commandManager.executeCommand(command);

// Use performance manager for monitoring
const metrics = performanceManager.getPerformanceMetrics();
const isHealthy = performanceManager.isSystemHealthy();

// Use unit registry for unit management
const unit = unitRegistryManager.createUnit('size', sizeInput);
const retrievedUnit = unitRegistryManager.getUnit(unit.id);
unitRegistryManager.removeUnit(unit.id);

// Use observer manager for event handling
observerManager.registerObserver(loggingObserver);
observerManager.notifyUnitCreated(unit);

// Use validation manager for input validation
validationManager.registerValidator(rangeValidator);
const isValid = validationManager.validateInput(sizeInput);

// Use strategy manager for algorithm management
strategyManager.registerStrategy(sizeStrategy);
const strategy = strategyManager.getStrategy('size');
```

### **1. Manager System Usage**

```typescript
import { 
  UnitSystemManager,
  CommandManager,
  PerformanceManager,
  UnitRegistryManager,
  ObserverManager,
  ValidationManager,
  StrategyManager
} from '../unit';

// Get the main unit system manager
const unitManager = UnitSystemManager.getInstance();

// Access individual managers
const commandManager = unitManager.getCommandManager();
const performanceManager = unitManager.getPerformanceManager();
const unitRegistryManager = unitManager.getUnitRegistryManager();
const observerManager = unitManager.getObserverManager();
const validationManager = unitManager.getValidationManager();
const strategyManager = unitManager.getStrategyManager();

// Use command manager for operations
const command = new CalculateSizeCommand(sizeInput, context);
commandManager.executeCommand(command);

// Use performance manager for monitoring
const metrics = performanceManager.getPerformanceMetrics();
const isHealthy = performanceManager.isSystemHealthy();

// Use unit registry for unit management
const unit = unitRegistryManager.createUnit('size', sizeInput);
const retrievedUnit = unitRegistryManager.getUnit(unit.id);
unitRegistryManager.removeUnit(unit.id);

// Use observer manager for event handling
observerManager.registerObserver(loggingObserver);
observerManager.notifyUnitCreated(unit);

// Use validation manager for input validation
validationManager.registerValidator(rangeValidator);
const isValid = validationManager.validateInput(sizeInput);

// Use strategy manager for algorithm management
strategyManager.registerStrategy(sizeStrategy);
const strategy = strategyManager.getStrategy('size');
```

### **2. Strategy Pattern Usage**

```typescript
import { 
  IUnitStrategy, 
  SizeUnitStrategy, 
  PositionUnitStrategy, 
  ScaleUnitStrategy,
  MixedUnitStrategy
} from '../unit';

// Create strategies
const sizeStrategy = new SizeUnitStrategy();
const positionStrategy = new PositionUnitStrategy();
const scaleStrategy = new ScaleUnitStrategy();
const mixedStrategy = new MixedUnitStrategy();

// Use strategies directly
const sizeValue = sizeStrategy.calculate(sizeInput, context);
const positionValue = positionStrategy.calculate(positionInput, context);
const scaleValue = scaleStrategy.calculate(scaleInput, context);
const mixedValue = mixedStrategy.calculate(mixedInput, context);

// Check if strategy can handle input
if (sizeStrategy.canHandle(sizeInput)) {
  const result = sizeStrategy.calculate(sizeInput, context);
}
```

### **3. Value Calculation Strategy Usage**

```typescript
import { 
  SizeValueCalculationStrategyRegistry,
  PositionValueCalculationStrategyRegistry,
  ScaleValueCalculationStrategyRegistry,
  PixelSizeValueCalculationStrategy,
  FillSizeValueCalculationStrategy,
  AutoSizeValueCalculationStrategy
} from '../unit';

// Get strategy registries
const sizeRegistry = SizeValueCalculationStrategyRegistry.getInstance();
const positionRegistry = PositionValueCalculationStrategyRegistry.getInstance();
const scaleRegistry = ScaleValueCalculationStrategyRegistry.getInstance();

// Register custom strategies
const pixelStrategy = new PixelSizeValueCalculationStrategy();
const fillStrategy = new FillSizeValueCalculationStrategy();
const autoStrategy = new AutoSizeValueCalculationStrategy();

sizeRegistry.registerStrategy(pixelStrategy);
sizeRegistry.registerStrategy(fillStrategy);
sizeRegistry.registerStrategy(autoStrategy);

// Find compatible strategies
const compatibleStrategies = sizeRegistry.findCompatibleStrategies(sizeInput);
const bestStrategy = sizeRegistry.getBestStrategy(sizeInput);

// Get registry statistics
const stats = sizeRegistry.getStatistics();
```
```

### **3. Value Calculation Strategy Usage**

```typescript
import { 
  SizeValueCalculationStrategyRegistry,
  PositionValueCalculationStrategyRegistry,
  ScaleValueCalculationStrategyRegistry,
  PixelSizeValueCalculationStrategy,
  FillSizeValueCalculationStrategy,
  AutoSizeValueCalculationStrategy
} from '../unit';

// Get strategy registries
const sizeRegistry = SizeValueCalculationStrategyRegistry.getInstance();
const positionRegistry = PositionValueCalculationStrategyRegistry.getInstance();
const scaleRegistry = ScaleValueCalculationStrategyRegistry.getInstance();

// Register custom strategies
const pixelStrategy = new PixelSizeValueCalculationStrategy();
const fillStrategy = new FillSizeValueCalculationStrategy();
const autoStrategy = new AutoSizeValueCalculationStrategy();

sizeRegistry.registerStrategy(pixelStrategy);
sizeRegistry.registerStrategy(fillStrategy);
sizeRegistry.registerStrategy(autoStrategy);

// Find compatible strategies
const compatibleStrategies = sizeRegistry.findCompatibleStrategies(sizeInput);
const bestStrategy = sizeRegistry.getBestStrategy(sizeInput);

// Get registry statistics
const stats = sizeRegistry.getStatistics();
```

### **4. Strategy Cache Usage**

```typescript
import { 
  StrategyCache,
  IStrategyCache
} from '../unit';

// Create strategy cache
const cache = new StrategyCache();

// Cache strategy results
cache.set('size-calculation', sizeInput, context, result);

// Retrieve cached results
const cachedResult = cache.get('size-calculation', sizeInput, context);

// Check cache statistics
const cacheStats = cache.getStatistics();
const hitRate = cache.getHitRate();

// Clear cache
cache.clear();
```

### **5. Strategy Composition Usage**

```typescript
import { 
  SizeStrategyComposers,
  WeightedAverageComposer,
  PriorityBasedComposer,
  AdaptiveComposer
} from '../unit';

// Create strategy composers
const weightedComposer = new WeightedAverageComposer();
const priorityComposer = new PriorityBasedComposer();
const adaptiveComposer = new AdaptiveComposer();

// Compose multiple strategies
const strategies = [sizeStrategy1, sizeStrategy2, sizeStrategy3];
const weights = [0.5, 0.3, 0.2];

const composedResult = weightedComposer.compose(strategies, sizeInput, context, weights);
const priorityResult = priorityComposer.compose(strategies, sizeInput, context);
const adaptiveResult = adaptiveComposer.compose(strategies, sizeInput, context);
```

### **6. Command Pattern Usage**

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

// Undo/Redo operations
const commandManager = CommandManager.getInstance();
commandManager.executeCommand(sizeCommand);
commandManager.undo();
commandManager.redo();
```

### **7. Observer Pattern Usage**

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

### **8. Monitoring System Usage**

```typescript
import { 
  ProductionMonitoringSystem 
} from '../unit';

// Create monitoring system
const monitoringSystem = new ProductionMonitoringSystem();

// Start monitoring
monitoringSystem.start();

// Record metrics
monitoringSystem.recordMetric('calculation.execution_time', 150);
monitoringSystem.recordMetric('cache.hit_rate', 0.85);

// Record errors
monitoringSystem.recordError('calculation_error', new Error('Invalid input'));

// Perform health checks
monitoringSystem.performHealthChecks();

// Get monitoring data
const metrics = monitoringSystem.getRecentMetrics();
const alerts = monitoringSystem.getRecentAlerts();
const stats = monitoringSystem.getSystemStatistics();

// Stop monitoring
monitoringSystem.stop();
```

### **9. Deployment Features Usage**

```typescript
import { 
  FeatureFlagSystem 
} from '../unit';

// Create feature flag system
const featureFlagSystem = new FeatureFlagSystem();

// Register feature flags
featureFlagSystem.registerFlag('new-calculation-algorithm', true);
featureFlagSystem.registerFlag('performance-monitoring', false);

// Check feature flags
if (featureFlagSystem.isEnabled('new-calculation-algorithm')) {
  // Use new algorithm
  const result = newAlgorithm.calculate(input, context);
} else {
  // Use old algorithm
  const result = oldAlgorithm.calculate(input, context);
}

// Update feature flags
featureFlagSystem.updateFlag('performance-monitoring', true);

// Get feature flag statistics
const stats = featureFlagSystem.getStatistics();
```
```

### **8. Validation Usage**

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

### **9. Template Method Usage**

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

### **10. Memento Pattern Usage**

```typescript
import { 
  UnitMementoManager, 
  UnitCalculationMemento,
  UnitMementoCaretaker
} from '../unit';

// Create memento manager
const mementoManager = new UnitMementoManager();
const caretaker = new UnitMementoCaretaker();

// Save calculation state
const memento = new UnitCalculationMemento(unit, oldValue, context);
mementoManager.saveMemento(unit.id, memento);

// Restore calculation state
const restoredMemento = mementoManager.getMemento(unit.id);
if (restoredMemento) {
  const restoredValue = restoredMemento.getValue();
}

// Use caretaker for complex state management
caretaker.saveState('checkpoint-1', memento);
caretaker.restoreState('checkpoint-1');
```

### **11. Adapter Pattern Usage**

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

### **12. Decorator Pattern Usage**

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

### **13. Composite Pattern Usage**

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

### **14. Monitoring System Usage**

```typescript
import { 
  ProductionMonitoringSystem 
} from '../unit';

// Create monitoring system
const monitoringSystem = new ProductionMonitoringSystem();

// Start monitoring
monitoringSystem.start();

// Record metrics
monitoringSystem.recordMetric('calculation.execution_time', 150);
monitoringSystem.recordMetric('cache.hit_rate', 0.85);

// Record errors
monitoringSystem.recordError('calculation_error', new Error('Invalid input'));

// Perform health checks
monitoringSystem.performHealthChecks();

// Get monitoring data
const metrics = monitoringSystem.getRecentMetrics();
const alerts = monitoringSystem.getRecentAlerts();
const stats = monitoringSystem.getSystemStatistics();

// Stop monitoring
monitoringSystem.stop();
```

### **15. Deployment Features Usage**

```typescript
import { 
  FeatureFlagSystem 
} from '../unit';

// Create feature flag system
const featureFlagSystem = new FeatureFlagSystem();

// Register feature flags
featureFlagSystem.registerFlag('new-calculation-algorithm', true);
featureFlagSystem.registerFlag('performance-monitoring', false);

// Check feature flags
if (featureFlagSystem.isEnabled('new-calculation-algorithm')) {
  // Use new algorithm
  const result = newAlgorithm.calculate(input, context);
} else {
  // Use old algorithm
  const result = oldAlgorithm.calculate(input, context);
}

// Update feature flags
featureFlagSystem.updateFlag('performance-monitoring', true);

// Get feature flag statistics
const stats = featureFlagSystem.getStatistics();
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

### **6. Creating Your Own Strategy Registry**

```typescript
// src/your-system/strategies/IColorValueCalculationStrategy.ts
export interface IColorValueCalculationStrategy {
  canHandle(input: IColorInput): boolean;
  calculate(input: IColorInput, context: ColorContext): string;
  getPriority(): number;
  getDescription(): string;
}

// src/your-system/strategies/ColorValueCalculationStrategyRegistry.ts
export class ColorValueCalculationStrategyRegistry {
  private static instance: ColorValueCalculationStrategyRegistry;
  private strategies: Map<string, IColorValueCalculationStrategy> = new Map();
  
  public static getInstance(): ColorValueCalculationStrategyRegistry {
    if (!ColorValueCalculationStrategyRegistry.instance) {
      ColorValueCalculationStrategyRegistry.instance = new ColorValueCalculationStrategyRegistry();
    }
    return ColorValueCalculationStrategyRegistry.instance;
  }
  
  public registerStrategy(strategy: IColorValueCalculationStrategy): void {
    const key = this.generateStrategyKey(strategy);
    this.strategies.set(key, strategy);
  }
  
  public findCompatibleStrategies(input: IColorInput): IColorValueCalculationStrategy[] {
    return Array.from(this.strategies.values())
      .filter(strategy => strategy.canHandle(input))
      .sort((a, b) => b.getPriority() - a.getPriority());
  }
  
  public getBestStrategy(input: IColorInput): IColorValueCalculationStrategy | undefined {
    const compatibleStrategies = this.findCompatibleStrategies(input);
    return compatibleStrategies[0];
  }
  
  private generateStrategyKey(strategy: IColorValueCalculationStrategy): string {
    return `${strategy.constructor.name}-${strategy.getPriority()}`;
  }
}
```

### **7. Creating Your Own Cache System**

```typescript
// src/your-system/cache/IColorStrategyCache.ts
export interface IColorStrategyCache {
  set(key: string, input: IColorInput, context: ColorContext, result: string): void;
  get(key: string, input: IColorInput, context: ColorContext): string | undefined;
  clear(): void;
  getStatistics(): CacheStatistics;
}

// src/your-system/cache/ColorStrategyCache.ts
export class ColorStrategyCache implements IColorStrategyCache {
  private cache: Map<string, string> = new Map();
  private hits = 0;
  private misses = 0;
  
  set(key: string, input: IColorInput, context: ColorContext, result: string): void {
    const cacheKey = this.generateCacheKey(key, input, context);
    this.cache.set(cacheKey, result);
  }
  
  get(key: string, input: IColorInput, context: ColorContext): string | undefined {
    const cacheKey = this.generateCacheKey(key, input, context);
    const result = this.cache.get(cacheKey);
    
    if (result !== undefined) {
      this.hits++;
    } else {
      this.misses++;
    }
    
    return result;
  }
  
  clear(): void {
    this.cache.clear();
    this.hits = 0;
    this.misses = 0;
  }
  
  getStatistics(): CacheStatistics {
    const total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? this.hits / total : 0,
      size: this.cache.size
    };
  }
  
  private generateCacheKey(key: string, input: IColorInput, context: ColorContext): string {
    return `${key}-${JSON.stringify(input)}-${JSON.stringify(context)}`;
  }
}
```

### **8. Creating Your Own Monitoring System**

```typescript
// src/your-system/monitoring/IColorMonitoringSystem.ts
export interface IColorMonitoringSystem {
  start(): void;
  stop(): void;
  recordMetric(name: string, value: number, tags?: Record<string, string>): void;
  recordError(error: Error, context?: string): void;
  performHealthChecks(): void;
  getRecentMetrics(): Metric[];
  getRecentAlerts(): Alert[];
  getSystemStatistics(): SystemStatistics;
}

// src/your-system/monitoring/ColorMonitoringSystem.ts
export class ColorMonitoringSystem implements IColorMonitoringSystem {
  private isRunning = false;
  private metrics: Metric[] = [];
  private alerts: Alert[] = [];
  private readonly logger: Logger = Logger.getInstance();
  
  start(): void {
    this.isRunning = true;
    this.logger.info('ColorMonitoringSystem', 'start', 'Color monitoring started');
  }
  
  stop(): void {
    this.isRunning = false;
    this.logger.info('ColorMonitoringSystem', 'stop', 'Color monitoring stopped');
  }
  
  recordMetric(name: string, value: number, tags?: Record<string, string>): void {
    if (!this.isRunning) return;
    
    const metric: Metric = {
      name,
      value,
      tags: tags || {},
      timestamp: Date.now()
    };
    
    this.metrics.push(metric);
    
    // Keep only last 1000 metrics
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }
  }
  
  recordError(error: Error, context?: string): void {
    if (!this.isRunning) return;
    
    const alert: Alert = {
      id: `alert-${Date.now()}`,
      type: 'error',
      message: error.message,
      context: context || 'unknown',
      timestamp: Date.now(),
      acknowledged: false
    };
    
    this.alerts.push(alert);
    this.logger.error('ColorMonitoringSystem', 'recordError', 'Error recorded', { error, context });
  }
  
  performHealthChecks(): void {
    if (!this.isRunning) return;
    
    // Perform health checks
    const errorRate = this.calculateErrorRate();
    if (errorRate > 0.1) { // 10% error rate threshold
      this.recordError(new Error('High error rate detected'), 'health-check');
    }
  }
  
  getRecentMetrics(): Metric[] {
    return [...this.metrics.slice(-100)];
  }
  
  getRecentAlerts(): Alert[] {
    return [...this.alerts.slice(-100)];
  }
  
  getSystemStatistics(): SystemStatistics {
    return {
      totalMetrics: this.metrics.length,
      totalAlerts: this.alerts.length,
      isRunning: this.isRunning,
      errorRate: this.calculateErrorRate()
    };
  }
  
  private calculateErrorRate(): number {
    const recentMetrics = this.metrics.slice(-100);
    const errorMetrics = recentMetrics.filter(m => m.name.includes('error'));
    return recentMetrics.length > 0 ? errorMetrics.length / recentMetrics.length : 0;
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

### **6. Always Use Strategy Pattern for Extensibility**
```typescript
// ✅ Good
export interface IMyStrategy {
  canHandle(input: IMyInput): boolean;
  calculate(input: IMyInput, context: MyContext): number;
  getPriority(): number;
}

// ❌ Bad
function calculate(input: any): number {
  if (input.type === 'type-a') {
    return calculateTypeA(input);
  } else if (input.type === 'type-b') {
    return calculateTypeB(input);
  }
  // Hard to extend
}
```

### **7. Always Use Registry Pattern for Strategy Management**
```typescript
// ✅ Good
export class MyStrategyRegistry {
  private strategies: Map<string, IMyStrategy> = new Map();
  
  registerStrategy(strategy: IMyStrategy): void {
    this.strategies.set(strategy.constructor.name, strategy);
  }
  
  findCompatibleStrategies(input: IMyInput): IMyStrategy[] {
    return Array.from(this.strategies.values())
      .filter(strategy => strategy.canHandle(input))
      .sort((a, b) => b.getPriority() - a.getPriority());
  }
}

// ❌ Bad
const strategies = [strategy1, strategy2, strategy3]; // Hard to manage
```

### **8. Always Use Cache for Performance**
```typescript
// ✅ Good
export class MyCache {
  private cache: Map<string, number> = new Map();
  
  get(key: string): number | undefined {
    return this.cache.get(key);
  }
  
  set(key: string, value: number): void {
    this.cache.set(key, value);
  }
}

// ❌ Bad
// No caching, recalculating every time
```

### **9. Always Use Monitoring for Production**
```typescript
// ✅ Good
export class MyMonitoringSystem {
  recordMetric(name: string, value: number): void {
    // Record performance metrics
  }
  
  recordError(error: Error): void {
    // Record errors for debugging
  }
}

// ❌ Bad
// No monitoring, no visibility into production issues
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

### **3. Test Strategy Pattern**
```typescript
describe('MyStrategy', () => {
  it('should handle compatible inputs', () => {
    const strategy = new MyStrategy();
    expect(strategy.canHandle(compatibleInput)).toBe(true);
  });
  
  it('should not handle incompatible inputs', () => {
    const strategy = new MyStrategy();
    expect(strategy.canHandle(incompatibleInput)).toBe(false);
  });
  
  it('should calculate correctly', () => {
    const strategy = new MyStrategy();
    const result = strategy.calculate(input, context);
    expect(result).toBe(expectedValue);
  });
});
```

### **4. Test Registry Pattern**
```typescript
describe('MyStrategyRegistry', () => {
  it('should register strategies', () => {
    const registry = new MyStrategyRegistry();
    const strategy = new MyStrategy();
    registry.registerStrategy(strategy);
    expect(registry.findCompatibleStrategies(input)).toContain(strategy);
  });
  
  it('should return strategies in priority order', () => {
    const registry = new MyStrategyRegistry();
    const highPriorityStrategy = new HighPriorityStrategy();
    const lowPriorityStrategy = new LowPriorityStrategy();
    
    registry.registerStrategy(lowPriorityStrategy);
    registry.registerStrategy(highPriorityStrategy);
    
    const strategies = registry.findCompatibleStrategies(input);
    expect(strategies[0]).toBe(highPriorityStrategy);
  });
});
```

### **5. Test Cache Pattern**
```typescript
describe('MyCache', () => {
  it('should cache and retrieve values', () => {
    const cache = new MyCache();
    cache.set('key', 100);
    expect(cache.get('key')).toBe(100);
  });
  
  it('should return undefined for missing keys', () => {
    const cache = new MyCache();
    expect(cache.get('missing-key')).toBeUndefined();
  });
});
```

### **6. Test Monitoring System**
```typescript
describe('MyMonitoringSystem', () => {
  it('should record metrics', () => {
    const monitoring = new MyMonitoringSystem();
    monitoring.recordMetric('test', 100);
    const metrics = monitoring.getRecentMetrics();
    expect(metrics).toHaveLength(1);
    expect(metrics[0].name).toBe('test');
  });
  
  it('should record errors', () => {
    const monitoring = new MyMonitoringSystem();
    const error = new Error('Test error');
    monitoring.recordError(error);
    const alerts = monitoring.getRecentAlerts();
    expect(alerts).toHaveLength(1);
    expect(alerts[0].message).toBe('Test error');
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
7. **Use strategy patterns** for extensibility
8. **Implement caching** for performance
9. **Add monitoring** for production visibility
10. **Use registry patterns** for strategy management

The key is to understand the patterns and apply them consistently across your codebase while maintaining the same level of type safety, error handling, and logging that the Unit System demonstrates.

## 🆕 New Features Added

### **Manager System**
- `CommandManager` - Manages command execution and undo/redo operations
- `PerformanceManager` - Tracks performance metrics and system health
- `UnitRegistryManager` - Manages unit creation, retrieval, and removal
- `ObserverManager` - Manages observer registration and event notifications
- `ValidationManager` - Manages input validation and validator registration
- `StrategyManager` - Manages strategy registration and selection

### **Strategy System**
- `SizeUnitStrategy` - Handles size unit calculations
- `PositionUnitStrategy` - Handles position unit calculations
- `ScaleUnitStrategy` - Handles scale unit calculations
- `MixedUnitStrategy` - Handles mixed unit calculations

### **Value Calculation Strategies**
- `SizeValueCalculationStrategies` - Individual strategies for size values
- `SizeValueCalculationStrategyRegistry` - Registry for size value strategies
- `PositionValueCalculationStrategies` - Individual strategies for position values
- `PositionValueCalculationStrategyRegistry` - Registry for position value strategies
- `ScaleValueCalculationStrategies` - Individual strategies for scale values
- `ScaleValueCalculationStrategyRegistry` - Registry for scale value strategies

### **Cache System**
- `StrategyCache` - Caches strategy calculation results for performance

### **Composition System**
- `SizeStrategyComposers` - Combines multiple strategies for complex calculations

### **Monitoring System**
- `ProductionMonitoringSystem` - Monitors system performance and health

### **Deployment Features**
- `FeatureFlagSystem` - Manages feature flags for deployment control

### **Enhanced Calculators**
- `RefactoredSizeUnitCalculator` - Refactored size calculator with strategy pattern
- `RefactoredPositionUnitCalculator` - Refactored position calculator with strategy pattern
- `RefactoredScaleUnitCalculator` - Refactored scale calculator with strategy pattern
- `EnhancedSizeUnitCalculator` - Enhanced size calculator with additional features

### **Utility Classes**
- `RandomValueNumber` - Generates random values for testing and development

These new features provide enhanced functionality, better performance, improved maintainability, and production-ready monitoring capabilities.

---
*Last updated: September 1, 2025*

## 🆕 New Features Added

### **Manager System**
- `CommandManager` - Manages command execution and undo/redo operations
- `PerformanceManager` - Tracks performance metrics and system health
- `UnitRegistryManager` - Manages unit creation, retrieval, and removal
- `ObserverManager` - Manages observer registration and event notifications
- `ValidationManager` - Manages input validation and validator registration
- `StrategyManager` - Manages strategy registration and selection

### **Strategy System**
- `SizeUnitStrategy` - Handles size unit calculations
- `PositionUnitStrategy` - Handles position unit calculations
- `ScaleUnitStrategy` - Handles scale unit calculations
- `MixedUnitStrategy` - Handles mixed unit calculations

### **Value Calculation Strategies**
- `SizeValueCalculationStrategies` - Individual strategies for size values
- `SizeValueCalculationStrategyRegistry` - Registry for size value strategies
- `PositionValueCalculationStrategies` - Individual strategies for position values
- `PositionValueCalculationStrategyRegistry` - Registry for position value strategies
- `ScaleValueCalculationStrategies` - Individual strategies for scale values
- `ScaleValueCalculationStrategyRegistry` - Registry for scale value strategies

### **Cache System**
- `StrategyCache` - Caches strategy calculation results for performance

### **Composition System**
- `SizeStrategyComposers` - Combines multiple strategies for complex calculations

### **Monitoring System**
- `ProductionMonitoringSystem` - Monitors system performance and health

### **Deployment Features**
- `FeatureFlagSystem` - Manages feature flags for deployment control

### **Enhanced Calculators**
- `RefactoredSizeUnitCalculator` - Refactored size calculator with strategy pattern
- `RefactoredPositionUnitCalculator` - Refactored position calculator with strategy pattern
- `RefactoredScaleUnitCalculator` - Refactored scale calculator with strategy pattern
- `EnhancedSizeUnitCalculator` - Enhanced size calculator with additional features

### **Utility Classes**
- `RandomValueNumber` - Generates random values for testing and development

These new features provide enhanced functionality, better performance, improved maintainability, and production-ready monitoring capabilities.

---
*Last updated: September 1, 2025*
