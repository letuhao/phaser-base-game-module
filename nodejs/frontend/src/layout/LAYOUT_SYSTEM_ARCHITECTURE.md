# 🏗️ Layout System Architecture

## 📋 Overview

The Layout System is a comprehensive, type-safe framework that handles all layout definitions, responsive behavior, and theme management. It integrates seamlessly with the Unit System to provide precise, responsive calculations while maintaining clean separation of concerns.

## 🎯 Core Principles

1. **Single Responsibility**: Layout System handles only layout concerns
2. **Unit System Integration**: All calculations use the Unit System
3. **Type Safety**: Full TypeScript support with strict typing
4. **Design Patterns**: Strategy, Observer, Decorator, Template Method, Factory
5. **Constants Management**: No magic numbers or strings
6. **Responsive First**: Built-in responsive design support
7. **Theme Integration**: Seamless theme system integration

## 🏗️ Architecture Overview

```
Layout System
├── Core/
│   ├── LayoutManager.ts           # Main orchestrator
│   ├── LayoutContext.ts           # Context for calculations
│   └── LayoutConstants.ts         # Centralized constants
├── Interfaces/
│   ├── ILayoutSystem.ts           # Main interface
│   ├── ILayoutStrategy.ts         # Strategy pattern
│   ├── ILayoutObserver.ts         # Observer pattern
│   └── ILayoutConfig.ts           # Configuration interface
├── Strategies/
│   ├── ResponsiveLayoutStrategy.ts
│   ├── ThemeLayoutStrategy.ts
│   ├── UnitLayoutStrategy.ts
│   └── CompositeLayoutStrategy.ts
├── Observers/
│   ├── LayoutChangeObserver.ts
│   ├── ResponsiveObserver.ts
│   └── ThemeObserver.ts
├── Decorators/
│   ├── CachingLayoutDecorator.ts
│   ├── ValidationLayoutDecorator.ts
│   └── PerformanceLayoutDecorator.ts
├── Templates/
│   ├── BaseLayoutTemplate.ts
│   ├── ContainerLayoutTemplate.ts
│   └── ResponsiveLayoutTemplate.ts
├── Factories/
│   ├── LayoutStrategyFactory.ts
│   ├── LayoutObserverFactory.ts
│   └── LayoutConfigFactory.ts
├── Validators/
│   ├── LayoutConfigValidator.ts
│   ├── ResponsiveConfigValidator.ts
│   └── ThemeConfigValidator.ts
└── Integrations/
    ├── UnitSystemIntegration.ts
    ├── ResponsiveConfigIntegration.ts
    └── ThemeConfigIntegration.ts
```

## 🔧 Core Components

### **1. LayoutManager (Main Orchestrator)**

```typescript
// src/layout/core/LayoutManager.ts
export class LayoutManager {
  private static instance: LayoutManager;
  private strategies: Map<string, ILayoutStrategy> = new Map();
  private observers: ILayoutObserver[] = [];
  private unitManager = UnitSystemManager.getInstance();
  
  static getInstance(): LayoutManager {
    if (!LayoutManager.instance) {
      LayoutManager.instance = new LayoutManager();
    }
    return LayoutManager.instance;
  }
  
  // Main layout calculation method
  calculateLayout(
    config: ILayoutConfig, 
    context: LayoutContext
  ): CalculatedLayout {
    // Use Unit System for all calculations
    const unitStrategy = this.strategies.get('unit') as UnitLayoutStrategy;
    const responsiveStrategy = this.strategies.get('responsive') as ResponsiveLayoutStrategy;
    const themeStrategy = this.strategies.get('theme') as ThemeLayoutStrategy;
    
    // Apply strategies in order
    let result = unitStrategy.calculate(config, context);
    result = responsiveStrategy.calculate(result, context);
    result = themeStrategy.calculate(result, context);
    
    // Notify observers
    this.notifyObservers(result);
    
    return result;
  }
}
```

### **2. LayoutContext (Unit System Integration)**

```typescript
// src/layout/core/LayoutContext.ts
export interface LayoutContext {
  // Unit System context
  unitContext: UnitContext;
  
  // Responsive context
  responsive: {
    currentBreakpoint: string;
    viewport: { width: number; height: number };
    device: { type: string; orientation: string };
  };
  
  // Theme context
  theme: {
    currentTheme: string;
    themeConfig: ThemeConfig;
    appliedClasses: string[];
  };
  
  // Container context
  container: {
    parent: IContainer | null;
    children: IGameObject[];
    constraints: ContainerConstraints;
  };
  
  // Performance context
  performance: {
    enableCaching: boolean;
    enableValidation: boolean;
    enableLogging: boolean;
  };
}
```

### **3. Layout Constants**

```typescript
// src/layout/core/LayoutConstants.ts
export const LAYOUT_CONSTANTS = {
  BREAKPOINTS: {
    XS: 576,
    SM: 768,
    MD: 992,
    LG: 1200,
    XL: 1400
  },
  
  DIMENSIONS: {
    MIN_WIDTH: 10,
    MIN_HEIGHT: 10,
    MAX_WIDTH: 10000,
    MAX_HEIGHT: 10000,
    DEFAULT_WIDTH: 100,
    DEFAULT_HEIGHT: 100
  },
  
  POSITIONS: {
    MIN_X: -10000,
    MIN_Y: -10000,
    MAX_X: 10000,
    MAX_Y: 10000,
    DEFAULT_X: 0,
    DEFAULT_Y: 0
  },
  
  SCALES: {
    MIN: 0.1,
    MAX: 10,
    DEFAULT: 1
  },
  
  PERFORMANCE: {
    CACHE_SIZE: 100,
    UPDATE_THROTTLE: 16,
    VALIDATION_ENABLED: true
  }
} as const;
```

## 🎨 Strategy Pattern Implementation

### **1. UnitLayoutStrategy**

```typescript
// src/layout/strategies/UnitLayoutStrategy.ts
export class UnitLayoutStrategy implements ILayoutStrategy {
  private readonly unitManager = UnitSystemManager.getInstance();
  
  calculate(config: ILayoutConfig, context: LayoutContext): CalculatedLayout {
    const result: CalculatedLayout = {
      position: { x: 0, y: 0, z: 0 },
      size: { width: 0, height: 0 },
      scale: { x: 1, y: 1 },
      visual: { alpha: 1, rotation: 0, visible: true },
      background: { color: null, image: null },
      border: { color: null, width: 0, radius: 0 },
      shadow: { color: null, blur: 0, offset: { x: 0, y: 0 } }
    };
    
    // Calculate position using Unit System
    if (config.position) {
      result.position.x = this.unitManager.calculatePosition(
        config.position.x, 
        context.unitContext
      );
      result.position.y = this.unitManager.calculatePosition(
        config.position.y, 
        context.unitContext
      );
    }
    
    // Calculate size using Unit System
    if (config.size) {
      result.size.width = this.unitManager.calculateSize(
        config.size.width, 
        context.unitContext
      );
      result.size.height = this.unitManager.calculateSize(
        config.size.height, 
        context.unitContext
      );
    }
    
    // Calculate scale using Unit System
    if (config.scale) {
      result.scale.x = this.unitManager.calculateScale(
        config.scale.x, 
        context.unitContext
      );
      result.scale.y = this.unitManager.calculateScale(
        config.scale.y, 
        context.unitContext
      );
    }
    
    return result;
  }
}
```

### **2. ResponsiveLayoutStrategy**

```typescript
// src/layout/strategies/ResponsiveLayoutStrategy.ts
export class ResponsiveLayoutStrategy implements ILayoutStrategy {
  calculate(layout: CalculatedLayout, context: LayoutContext): CalculatedLayout {
    const breakpoint = context.responsive.currentBreakpoint;
    const viewport = context.responsive.viewport;
    
    // Apply breakpoint-specific adjustments
    switch (breakpoint) {
      case 'xs':
        return this.applyMobileLayout(layout, viewport);
      case 'sm':
        return this.applyTabletLayout(layout, viewport);
      case 'md':
        return this.applyDesktopLayout(layout, viewport);
      default:
        return layout;
    }
  }
  
  private applyMobileLayout(layout: CalculatedLayout, viewport: any): CalculatedLayout {
    // Mobile-specific adjustments using Unit System
    return {
      ...layout,
      size: {
        width: Math.min(layout.size.width, viewport.width * 0.95),
        height: Math.min(layout.size.height, viewport.height * 0.95)
      }
    };
  }
}
```

### **3. ThemeLayoutStrategy**

```typescript
// src/layout/strategies/ThemeLayoutStrategy.ts
export class ThemeLayoutStrategy implements ILayoutStrategy {
  calculate(layout: CalculatedLayout, context: LayoutContext): CalculatedLayout {
    const theme = context.theme.themeConfig;
    const classes = context.theme.appliedClasses;
    
    // Apply theme-based styling
    let themedLayout = { ...layout };
    
    classes.forEach(className => {
      const themeClass = theme.themeClasses[className];
      if (themeClass) {
        themedLayout = this.mergeThemeClass(themedLayout, themeClass);
      }
    });
    
    return themedLayout;
  }
  
  private mergeThemeClass(layout: CalculatedLayout, themeClass: any): CalculatedLayout {
    return {
      ...layout,
      background: { ...layout.background, ...themeClass.background },
      border: { ...layout.border, ...themeClass.border },
      visual: { ...layout.visual, ...themeClass.visual }
    };
  }
}
```

## 🔄 Observer Pattern Implementation

### **1. LayoutChangeObserver**

```typescript
// src/layout/observers/LayoutChangeObserver.ts
export class LayoutChangeObserver implements ILayoutObserver {
  private readonly logger: Logger = Logger.getInstance();
  
  onLayoutChanged(layout: CalculatedLayout, context: LayoutContext): void {
    this.logger.info('LayoutChangeObserver', 'onLayoutChanged', 'Layout changed', {
      layoutId: context.container?.id,
      newLayout: layout,
      breakpoint: context.responsive.currentBreakpoint,
      theme: context.theme.currentTheme
    });
  }
  
  onBreakpointChanged(breakpoint: string): void {
    this.logger.info('LayoutChangeObserver', 'onBreakpointChanged', 'Breakpoint changed', {
      newBreakpoint: breakpoint
    });
  }
  
  onThemeChanged(theme: string): void {
    this.logger.info('LayoutChangeObserver', 'onThemeChanged', 'Theme changed', {
      newTheme: theme
    });
  }
}
```

## 🎭 Decorator Pattern Implementation

### **1. CachingLayoutDecorator**

```typescript
// src/layout/decorators/CachingLayoutDecorator.ts
export class CachingLayoutDecorator implements ILayoutStrategy {
  private cache = new Map<string, CalculatedLayout>();
  private readonly maxCacheSize = LAYOUT_CONSTANTS.PERFORMANCE.CACHE_SIZE;
  
  constructor(private strategy: ILayoutStrategy) {}
  
  calculate(config: ILayoutConfig, context: LayoutContext): CalculatedLayout {
    const cacheKey = this.generateCacheKey(config, context);
    
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }
    
    const result = this.strategy.calculate(config, context);
    this.cache.set(cacheKey, result);
    
    // Maintain cache size
    if (this.cache.size > this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    return result;
  }
  
  private generateCacheKey(config: ILayoutConfig, context: LayoutContext): string {
    return JSON.stringify({
      config: config,
      breakpoint: context.responsive.currentBreakpoint,
      theme: context.theme.currentTheme,
      viewport: context.responsive.viewport
    });
  }
}
```

## 🏭 Factory Pattern Implementation

### **1. LayoutStrategyFactory**

```typescript
// src/layout/factories/LayoutStrategyFactory.ts
export class LayoutStrategyFactory {
  static createStrategy(type: string): ILayoutStrategy {
    switch (type) {
      case 'unit':
        return new UnitLayoutStrategy();
      case 'responsive':
        return new ResponsiveLayoutStrategy();
      case 'theme':
        return new ThemeLayoutStrategy();
      case 'composite':
        return new CompositeLayoutStrategy([
          new UnitLayoutStrategy(),
          new ResponsiveLayoutStrategy(),
          new ThemeLayoutStrategy()
        ]);
      case 'cached':
        return new CachingLayoutDecorator(new UnitLayoutStrategy());
      default:
        throw new Error(`Unknown layout strategy type: ${type}`);
    }
  }
}
```

## 🔗 Integration with Existing Systems

### **1. Responsive Config Integration**

```typescript
// src/layout/integrations/ResponsiveConfigIntegration.ts
export class ResponsiveConfigIntegration {
  static parseResponsiveConfig(config: any): ILayoutConfig {
    return {
      position: {
        x: this.parsePositionValue(config.positionX),
        y: this.parsePositionValue(config.positionY),
        z: config.positionZ || 0
      },
      size: {
        width: this.parseSizeValue(config.width),
        height: this.parseSizeValue(config.height)
      },
      scale: {
        x: this.parseScaleValue(config.scaleX),
        y: this.parseScaleValue(config.scaleY)
      },
      visual: {
        alpha: config.alpha || 1,
        rotation: config.rotation || 0,
        visible: config.visible !== false
      },
      background: {
        color: config.backgroundColor,
        image: config.backgroundImage
      },
      border: {
        color: config.borderColor,
        width: config.borderWidth || 0,
        radius: config.borderRadius || 0
      },
      shadow: {
        color: config.shadowColor,
        blur: config.shadowBlur || 0,
        offset: {
          x: config.shadowOffsetX || 0,
          y: config.shadowOffsetY || 0
        }
      }
    };
  }
  
  private static parsePositionValue(value: any): PositionValue {
    if (typeof value === 'number') {
      return createPositionTemplateInput(PositionUnit.PIXEL, value);
    }
    if (typeof value === 'string') {
      switch (value) {
        case 'center':
          return createPositionTemplateInput(PositionUnit.SCENE_CENTER, 0);
        case 'left':
          return createPositionTemplateInput(PositionUnit.SCENE_LEFT, 0);
        case 'right':
          return createPositionTemplateInput(PositionUnit.SCENE_RIGHT, 0);
        default:
          return createPositionTemplateInput(PositionUnit.PIXEL, 0);
      }
    }
    return createPositionTemplateInput(PositionUnit.PIXEL, 0);
  }
}
```

### **2. Theme Config Integration**

```typescript
// src/layout/integrations/ThemeConfigIntegration.ts
export class ThemeConfigIntegration {
  static parseThemeConfig(config: any): ThemeConfig {
    return {
      themeName: config.themeName,
      colors: config.colors,
      typography: config.typography,
      spacing: config.spacing,
      themeClasses: this.parseThemeClasses(config.themeClasses)
    };
  }
  
  private static parseThemeClasses(classes: any): Record<string, any> {
    const parsedClasses: Record<string, any> = {};
    
    Object.entries(classes || {}).forEach(([className, classConfig]) => {
      parsedClasses[className] = {
        background: {
          color: classConfig.backgroundColor,
          image: classConfig.backgroundImage
        },
        border: {
          color: classConfig.borderColor,
          width: classConfig.borderWidth,
          radius: classConfig.borderRadius
        },
        visual: {
          alpha: classConfig.alpha,
          rotation: classConfig.rotation
        }
      };
    });
    
    return parsedClasses;
  }
}
```

## 🎯 Container Integration

### **1. Simplified Container Class**

```typescript
// src/object/container/Container.ts (SIMPLIFIED)
export class Container extends Phaser.GameObjects.Container implements IContainer {
  private readonly layoutManager = LayoutManager.getInstance();
  private readonly logger: Logger = Logger.getInstance();
  
  // ... other properties ...
  
  setStyle(layoutProperties: CommonIStyleProperties): void {
    this.logger.debug('Container', 'setStyle', 'Setting style via Layout System', {
      id: this.id,
      properties: layoutProperties
    });
    
    // Convert to Layout System config
    const layoutConfig = ResponsiveConfigIntegration.parseResponsiveConfig(layoutProperties);
    
    // Create context
    const context: LayoutContext = {
      unitContext: this.createUnitContext(),
      responsive: this.createResponsiveContext(),
      theme: this.createThemeContext(),
      container: this.createContainerContext(),
      performance: { enableCaching: true, enableValidation: true, enableLogging: true }
    };
    
    // Calculate layout using Layout System
    const calculatedLayout = this.layoutManager.calculateLayout(layoutConfig, context);
    
    // Apply calculated layout
    this.applyCalculatedLayout(calculatedLayout);
  }
  
  private applyCalculatedLayout(layout: CalculatedLayout): void {
    // Apply position
    this.setPosition(layout.position.x, layout.position.y);
    this.setDepth(layout.position.z);
    
    // Apply size
    this.setSize(layout.size.width, layout.size.height);
    
    // Apply scale
    this.setScale(layout.scale.x, layout.scale.y);
    
    // Apply visual properties
    this.setAlpha(layout.visual.alpha);
    this.setRotation(layout.visual.rotation);
    this.setVisible(layout.visual.visible);
    
    // Apply background, border, shadow via AssetManager
    this.applyVisualAssets(layout);
  }
}
```

## 📋 Benefits

1. **Clean Separation**: Layout logic completely separated from Container
2. **Unit System Integration**: All calculations use the Unit System
3. **Type Safety**: Full TypeScript support with strict typing
4. **Design Patterns**: Proper use of Strategy, Observer, Decorator patterns
5. **Constants Management**: No magic numbers or strings
6. **Testability**: Each component can be tested independently
7. **Maintainability**: Smaller, focused classes
8. **Extensibility**: Easy to add new strategies, observers, decorators
9. **Performance**: Built-in caching and optimization
10. **Responsive**: Native responsive design support

## 🚀 Implementation Plan

1. **Phase 1**: Create core Layout System interfaces and constants
2. **Phase 2**: Implement Unit System integration strategies
3. **Phase 3**: Implement responsive and theme strategies
4. **Phase 4**: Create observers and decorators
5. **Phase 5**: Implement factories and validators
6. **Phase 6**: Create integration adapters for existing configs
7. **Phase 7**: Refactor Container to use Layout System
8. **Phase 8**: Add comprehensive tests
9. **Phase 9**: Performance optimization and caching
10. **Phase 10**: Documentation and examples

This Layout System will completely resolve the Container god class problem while providing a robust, type-safe, and extensible foundation for all layout management in the project.
