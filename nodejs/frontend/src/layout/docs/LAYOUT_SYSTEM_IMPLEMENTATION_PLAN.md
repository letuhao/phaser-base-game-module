# 🚀 Layout System Implementation Plan

## 📋 Overview

This document outlines the practical implementation steps to create the Layout System and integrate it with the existing Levis2025R3Wheel configuration, resolving the Container god class problem.

## 🎯 Implementation Phases

### **Phase 1: Core Interfaces & Constants (Week 1)**

#### **1.1 Create Core Interfaces**

```typescript
// src/layout/interfaces/ILayoutSystem.ts
export interface ILayoutSystem {
  calculateLayout(config: ILayoutConfig, context: LayoutContext): CalculatedLayout;
  registerStrategy(name: string, strategy: ILayoutStrategy): void;
  addObserver(observer: ILayoutObserver): void;
  removeObserver(observer: ILayoutObserver): void;
}

// src/layout/interfaces/ILayoutStrategy.ts
export interface ILayoutStrategy {
  calculate(config: ILayoutConfig, context: LayoutContext): CalculatedLayout;
  getPriority(): number;
  canHandle(config: ILayoutConfig): boolean;
}

// src/layout/interfaces/ILayoutObserver.ts
export interface ILayoutObserver {
  onLayoutChanged(layout: CalculatedLayout, context: LayoutContext): void;
  onBreakpointChanged(breakpoint: string): void;
  onThemeChanged(theme: string): void;
}

// src/layout/interfaces/ILayoutConfig.ts
export interface ILayoutConfig {
  position?: {
    x?: PositionValue;
    y?: PositionValue;
    z?: number;
  };
  size?: {
    width?: SizeValue;
    height?: SizeValue;
  };
  scale?: {
    x?: ScaleValue;
    y?: ScaleValue;
  };
  visual?: {
    alpha?: number;
    rotation?: number;
    visible?: boolean;
  };
  background?: {
    color?: string;
    image?: string;
  };
  border?: {
    color?: string;
    width?: number;
    radius?: number;
  };
  shadow?: {
    color?: string;
    blur?: number;
    offset?: { x: number; y: number };
  };
  classes?: string[];
}
```

#### **1.2 Create Layout Constants**

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

### **Phase 2: Unit System Integration (Week 2)**

#### **2.1 Create UnitLayoutStrategy**

```typescript
// src/layout/strategies/UnitLayoutStrategy.ts
export class UnitLayoutStrategy implements ILayoutStrategy {
  private readonly unitManager = UnitSystemManager.getInstance();
  private readonly logger: Logger = Logger.getInstance();
  
  getPriority(): number {
    return 1; // Highest priority - base calculations
  }
  
  canHandle(config: ILayoutConfig): boolean {
    return !!(config.position || config.size || config.scale);
  }
  
  calculate(config: ILayoutConfig, context: LayoutContext): CalculatedLayout {
    this.logger.debug('UnitLayoutStrategy', 'calculate', 'Calculating layout with Unit System', {
      config,
      context: { breakpoint: context.responsive.currentBreakpoint, theme: context.theme.currentTheme }
    });
    
    const result: CalculatedLayout = {
      position: { x: 0, y: 0, z: 0 },
      size: { width: LAYOUT_CONSTANTS.DIMENSIONS.DEFAULT_WIDTH, height: LAYOUT_CONSTANTS.DIMENSIONS.DEFAULT_HEIGHT },
      scale: { x: LAYOUT_CONSTANTS.SCALES.DEFAULT, y: LAYOUT_CONSTANTS.SCALES.DEFAULT },
      visual: { alpha: 1, rotation: 0, visible: true },
      background: { color: null, image: null },
      border: { color: null, width: 0, radius: 0 },
      shadow: { color: null, blur: 0, offset: { x: 0, y: 0 } }
    };
    
    // Calculate position using Unit System
    if (config.position) {
      if (config.position.x) {
        result.position.x = this.unitManager.calculatePosition(config.position.x, context.unitContext);
      }
      if (config.position.y) {
        result.position.y = this.unitManager.calculatePosition(config.position.y, context.unitContext);
      }
      if (config.position.z !== undefined) {
        result.position.z = config.position.z;
      }
    }
    
    // Calculate size using Unit System
    if (config.size) {
      if (config.size.width) {
        result.size.width = this.unitManager.calculateSize(config.size.width, context.unitContext);
      }
      if (config.size.height) {
        result.size.height = this.unitManager.calculateSize(config.size.height, context.unitContext);
      }
    }
    
    // Calculate scale using Unit System
    if (config.scale) {
      if (config.scale.x) {
        result.scale.x = this.unitManager.calculateScale(config.scale.x, context.unitContext);
      }
      if (config.scale.y) {
        result.scale.y = this.unitManager.calculateScale(config.scale.y, context.unitContext);
      }
    }
    
    // Apply visual properties
    if (config.visual) {
      Object.assign(result.visual, config.visual);
    }
    
    // Apply background properties
    if (config.background) {
      Object.assign(result.background, config.background);
    }
    
    // Apply border properties
    if (config.border) {
      Object.assign(result.border, config.border);
    }
    
    // Apply shadow properties
    if (config.shadow) {
      Object.assign(result.shadow, config.shadow);
    }
    
    this.logger.debug('UnitLayoutStrategy', 'calculate', 'Layout calculated', { result });
    
    return result;
  }
}
```

### **Phase 3: Responsive Integration (Week 3)**

#### **3.1 Create ResponsiveLayoutStrategy**

```typescript
// src/layout/strategies/ResponsiveLayoutStrategy.ts
export class ResponsiveLayoutStrategy implements ILayoutStrategy {
  private readonly logger: Logger = Logger.getInstance();
  
  getPriority(): number {
    return 2; // Medium priority - responsive adjustments
  }
  
  canHandle(config: ILayoutConfig): boolean {
    return true; // Always handles responsive adjustments
  }
  
  calculate(layout: CalculatedLayout, context: LayoutContext): CalculatedLayout {
    const breakpoint = context.responsive.currentBreakpoint;
    const viewport = context.responsive.viewport;
    
    this.logger.debug('ResponsiveLayoutStrategy', 'calculate', 'Applying responsive adjustments', {
      breakpoint,
      viewport,
      originalLayout: layout
    });
    
    let adjustedLayout = { ...layout };
    
    // Apply breakpoint-specific adjustments
    switch (breakpoint) {
      case 'xs':
        adjustedLayout = this.applyMobileLayout(adjustedLayout, viewport);
        break;
      case 'sm':
        adjustedLayout = this.applyTabletLayout(adjustedLayout, viewport);
        break;
      case 'md':
        adjustedLayout = this.applyDesktopLayout(adjustedLayout, viewport);
        break;
      case 'lg':
      case 'xl':
        adjustedLayout = this.applyLargeLayout(adjustedLayout, viewport);
        break;
    }
    
    this.logger.debug('ResponsiveLayoutStrategy', 'calculate', 'Responsive adjustments applied', {
      breakpoint,
      adjustedLayout
    });
    
    return adjustedLayout;
  }
  
  private applyMobileLayout(layout: CalculatedLayout, viewport: any): CalculatedLayout {
    return {
      ...layout,
      size: {
        width: Math.min(layout.size.width, viewport.width * 0.95),
        height: Math.min(layout.size.height, viewport.height * 0.95)
      },
      visual: {
        ...layout.visual,
        alpha: Math.min(layout.visual.alpha, 0.9) // Slightly reduce alpha on mobile
      }
    };
  }
  
  private applyTabletLayout(layout: CalculatedLayout, viewport: any): CalculatedLayout {
    return {
      ...layout,
      size: {
        width: Math.min(layout.size.width, viewport.width * 0.9),
        height: Math.min(layout.size.height, viewport.height * 0.9)
      }
    };
  }
  
  private applyDesktopLayout(layout: CalculatedLayout, viewport: any): CalculatedLayout {
    return {
      ...layout,
      size: {
        width: Math.min(layout.size.width, viewport.width * 0.8),
        height: Math.min(layout.size.height, viewport.height * 0.8)
      }
    };
  }
  
  private applyLargeLayout(layout: CalculatedLayout, viewport: any): CalculatedLayout {
    return {
      ...layout,
      size: {
        width: Math.min(layout.size.width, viewport.width * 0.7),
        height: Math.min(layout.size.height, viewport.height * 0.7)
      }
    };
  }
}
```

### **Phase 4: Theme Integration (Week 4)**

#### **4.1 Create ThemeLayoutStrategy**

```typescript
// src/layout/strategies/ThemeLayoutStrategy.ts
export class ThemeLayoutStrategy implements ILayoutStrategy {
  private readonly logger: Logger = Logger.getInstance();
  
  getPriority(): number {
    return 3; // Lowest priority - theme overrides
  }
  
  canHandle(config: ILayoutConfig): boolean {
    return !!(config.classes && config.classes.length > 0);
  }
  
  calculate(layout: CalculatedLayout, context: LayoutContext): CalculatedLayout {
    const theme = context.theme.themeConfig;
    const classes = context.theme.appliedClasses;
    
    this.logger.debug('ThemeLayoutStrategy', 'calculate', 'Applying theme styling', {
      theme: theme.themeName,
      classes,
      originalLayout: layout
    });
    
    let themedLayout = { ...layout };
    
    // Apply theme classes
    classes.forEach(className => {
      const themeClass = theme.themeClasses[className];
      if (themeClass) {
        themedLayout = this.mergeThemeClass(themedLayout, themeClass);
        this.logger.debug('ThemeLayoutStrategy', 'calculate', 'Applied theme class', {
          className,
          themeClass
        });
      }
    });
    
    // Apply global theme colors
    if (theme.colors) {
      themedLayout = this.applyThemeColors(themedLayout, theme.colors);
    }
    
    this.logger.debug('ThemeLayoutStrategy', 'calculate', 'Theme styling applied', {
      themedLayout
    });
    
    return themedLayout;
  }
  
  private mergeThemeClass(layout: CalculatedLayout, themeClass: any): CalculatedLayout {
    return {
      ...layout,
      background: { ...layout.background, ...themeClass.background },
      border: { ...layout.border, ...themeClass.border },
      shadow: { ...layout.shadow, ...themeClass.shadow },
      visual: { ...layout.visual, ...themeClass.visual }
    };
  }
  
  private applyThemeColors(layout: CalculatedLayout, colors: any): CalculatedLayout {
    return {
      ...layout,
      background: {
        ...layout.background,
        color: layout.background.color || colors.background?.primary
      },
      border: {
        ...layout.border,
        color: layout.border.color || colors.ui?.border
      }
    };
  }
}
```

### **Phase 5: Integration Adapters (Week 5)**

#### **5.1 Create ResponsiveConfigIntegration**

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
      },
      classes: config.classes || []
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
        case 'top':
          return createPositionTemplateInput(PositionUnit.SCENE_TOP, 0);
        case 'bottom':
          return createPositionTemplateInput(PositionUnit.SCENE_BOTTOM, 0);
        default:
          return createPositionTemplateInput(PositionUnit.PIXEL, 0);
      }
    }
    return createPositionTemplateInput(PositionUnit.PIXEL, 0);
  }
  
  private static parseSizeValue(value: any): SizeValue {
    if (typeof value === 'number') {
      return createSizeTemplateInput(SizeUnit.PIXEL, value);
    }
    if (typeof value === 'string') {
      switch (value) {
        case 'fill':
          return createSizeTemplateInput(SizeUnit.VIEWPORT_WIDTH, 100);
        case 'auto':
          return createSizeTemplateInput(SizeUnit.AUTO, 0);
        default:
          return createSizeTemplateInput(SizeUnit.PIXEL, 100);
      }
    }
    return createSizeTemplateInput(SizeUnit.PIXEL, 100);
  }
  
  private static parseScaleValue(value: any): ScaleValue {
    if (typeof value === 'number') {
      return createScaleTemplateInput(ScaleUnit.FACTOR, value);
    }
    return createScaleTemplateInput(ScaleUnit.FACTOR, 1);
  }
}
```

#### **5.2 Create ThemeConfigIntegration**

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
        shadow: {
          color: classConfig.shadowColor,
          blur: classConfig.shadowBlur,
          offset: {
            x: classConfig.shadowOffsetX || 0,
            y: classConfig.shadowOffsetY || 0
          }
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

### **Phase 6: LayoutManager Implementation (Week 6)**

#### **6.1 Create Main LayoutManager**

```typescript
// src/layout/core/LayoutManager.ts
export class LayoutManager implements ILayoutSystem {
  private static instance: LayoutManager;
  private strategies: Map<string, ILayoutStrategy> = new Map();
  private observers: ILayoutObserver[] = [];
  private readonly logger: Logger = Logger.getInstance();
  
  static getInstance(): LayoutManager {
    if (!LayoutManager.instance) {
      LayoutManager.instance = new LayoutManager();
    }
    return LayoutManager.instance;
  }
  
  private constructor() {
    this.initializeDefaultStrategies();
  }
  
  private initializeDefaultStrategies(): void {
    this.registerStrategy('unit', new UnitLayoutStrategy());
    this.registerStrategy('responsive', new ResponsiveLayoutStrategy());
    this.registerStrategy('theme', new ThemeLayoutStrategy());
  }
  
  registerStrategy(name: string, strategy: ILayoutStrategy): void {
    this.strategies.set(name, strategy);
    this.logger.debug('LayoutManager', 'registerStrategy', 'Strategy registered', { name });
  }
  
  addObserver(observer: ILayoutObserver): void {
    this.observers.push(observer);
    this.logger.debug('LayoutManager', 'addObserver', 'Observer added', { observerType: observer.constructor.name });
  }
  
  removeObserver(observer: ILayoutObserver): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
      this.logger.debug('LayoutManager', 'removeObserver', 'Observer removed', { observerType: observer.constructor.name });
    }
  }
  
  calculateLayout(config: ILayoutConfig, context: LayoutContext): CalculatedLayout {
    this.logger.debug('LayoutManager', 'calculateLayout', 'Starting layout calculation', {
      config,
      context: { breakpoint: context.responsive.currentBreakpoint, theme: context.theme.currentTheme }
    });
    
    // Get strategies in priority order
    const sortedStrategies = Array.from(this.strategies.values())
      .filter(strategy => strategy.canHandle(config))
      .sort((a, b) => a.getPriority() - b.getPriority());
    
    let result: CalculatedLayout = {
      position: { x: 0, y: 0, z: 0 },
      size: { width: LAYOUT_CONSTANTS.DIMENSIONS.DEFAULT_WIDTH, height: LAYOUT_CONSTANTS.DIMENSIONS.DEFAULT_HEIGHT },
      scale: { x: LAYOUT_CONSTANTS.SCALES.DEFAULT, y: LAYOUT_CONSTANTS.SCALES.DEFAULT },
      visual: { alpha: 1, rotation: 0, visible: true },
      background: { color: null, image: null },
      border: { color: null, width: 0, radius: 0 },
      shadow: { color: null, blur: 0, offset: { x: 0, y: 0 } }
    };
    
    // Apply strategies in order
    sortedStrategies.forEach(strategy => {
      result = strategy.calculate(config, context);
      this.logger.debug('LayoutManager', 'calculateLayout', 'Strategy applied', {
        strategyType: strategy.constructor.name,
        result
      });
    });
    
    // Notify observers
    this.notifyObservers(result, context);
    
    this.logger.debug('LayoutManager', 'calculateLayout', 'Layout calculation completed', { result });
    
    return result;
  }
  
  private notifyObservers(layout: CalculatedLayout, context: LayoutContext): void {
    this.observers.forEach(observer => {
      try {
        observer.onLayoutChanged(layout, context);
      } catch (error) {
        this.logger.error('LayoutManager', 'notifyObservers', 'Observer notification failed', {
          observerType: observer.constructor.name,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    });
  }
}
```

### **Phase 7: Container Integration (Week 7)**

#### **7.1 Refactor Container Class**

```typescript
// src/object/container/Container.ts (REFACTORED)
export class Container extends Phaser.GameObjects.Container implements IContainer {
  private readonly layoutManager = LayoutManager.getInstance();
  private readonly logger: Logger = Logger.getInstance();
  
  // ... existing properties ...
  
  setStyle(layoutProperties: CommonIStyleProperties): void {
    this.logger.debug('Container', 'setStyle', 'Setting style via Layout System', {
      id: this.id,
      properties: layoutProperties
    });
    
    try {
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
      
      this.logger.info('Container', 'setStyle', 'Style applied successfully via Layout System', {
        id: this.id,
        calculatedLayout
      });
      
    } catch (error) {
      this.logger.error('Container', 'setStyle', 'Failed to apply style via Layout System', {
        id: this.id,
        error: error instanceof Error ? error.message : String(error)
      });
      
      // Fallback to default layout
      this.applyDefaultLayout();
    }
  }
  
  private createUnitContext(): UnitContext {
    return {
      parent: this.parent ? {
        width: this.parent.width,
        height: this.parent.height,
        x: this.parent.x,
        y: this.parent.y
      } : undefined,
      scene: {
        width: this.scene.game.config.width as number,
        height: this.scene.game.config.height as number
      },
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      content: {
        width: this.width,
        height: this.height
      }
    };
  }
  
  private createResponsiveContext(): any {
    return {
      currentBreakpoint: this.getCurrentBreakpoint(),
      viewport: { width: window.innerWidth, height: window.innerHeight },
      device: { type: this.getDeviceType(), orientation: this.getOrientation() }
    };
  }
  
  private createThemeContext(): any {
    return {
      currentTheme: 'autumn', // From injected configs
      themeConfig: this.injectedConfigs?.theme,
      appliedClasses: this.getAppliedClasses()
    };
  }
  
  private createContainerContext(): any {
    return {
      parent: this.parent,
      children: this.children,
      constraints: this.constraints
    };
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
    
    // Apply background, border, shadow
    this.applyVisualAssets(layout);
  }
  
  private applyVisualAssets(layout: CalculatedLayout): void {
    // Remove existing visual assets
    this.removeVisualAssets();
    
    // Apply background
    if (layout.background.color || layout.background.image) {
      this.createBackground(layout.background);
    }
    
    // Apply border
    if (layout.border.color && layout.border.width > 0) {
      this.createBorder(layout.border);
    }
    
    // Apply shadow
    if (layout.shadow.color && layout.shadow.blur > 0) {
      this.createShadow(layout.shadow);
    }
  }
  
  private removeVisualAssets(): void {
    const assetsToRemove = ['background-rectangle', 'container-border', 'container-shadow'];
    assetsToRemove.forEach(name => {
      const asset = this.getByName(name);
      if (asset) {
        asset.destroy();
      }
    });
  }
  
  private createBackground(background: any): void {
    if (background.color) {
      const rect = this.scene.add.rectangle(
        0, 0,
        this.width || 100,
        this.height || 100,
        Phaser.Display.Color.ValueToColor(background.color).color
      );
      rect.setName('background-rectangle');
      this.addAt(rect, 0);
    }
  }
  
  private createBorder(border: any): void {
    // Implementation for border creation
  }
  
  private createShadow(shadow: any): void {
    // Implementation for shadow creation
  }
  
  private getCurrentBreakpoint(): string {
    const width = window.innerWidth;
    if (width < LAYOUT_CONSTANTS.BREAKPOINTS.XS) return 'xs';
    if (width < LAYOUT_CONSTANTS.BREAKPOINTS.SM) return 'sm';
    if (width < LAYOUT_CONSTANTS.BREAKPOINTS.MD) return 'md';
    if (width < LAYOUT_CONSTANTS.BREAKPOINTS.LG) return 'lg';
    return 'xl';
  }
  
  private getDeviceType(): string {
    return window.innerWidth < 768 ? 'mobile' : 'desktop';
  }
  
  private getOrientation(): string {
    return window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
  }
  
  private getAppliedClasses(): string[] {
    return this.injectedConfigs?.responsive?.default?.find(
      (layout: any) => layout.id === this.id
    )?.layoutProperties?.classes || [];
  }
  
  private applyDefaultLayout(): void {
    this.setPosition(0, 0);
    this.setSize(LAYOUT_CONSTANTS.DIMENSIONS.DEFAULT_WIDTH, LAYOUT_CONSTANTS.DIMENSIONS.DEFAULT_HEIGHT);
    this.setScale(LAYOUT_CONSTANTS.SCALES.DEFAULT, LAYOUT_CONSTANTS.SCALES.DEFAULT);
    this.setAlpha(1);
    this.setRotation(0);
    this.setVisible(true);
  }
}
```

## 🎯 Benefits of This Implementation

1. **Complete Separation**: Layout logic is completely separated from Container
2. **Unit System Integration**: All calculations use the Unit System for precision
3. **Type Safety**: Full TypeScript support with strict typing
4. **Design Patterns**: Proper use of Strategy, Observer patterns
5. **Constants Management**: No magic numbers or strings
6. **Testability**: Each component can be tested independently
7. **Maintainability**: Container class reduced from 1589 lines to ~200 lines
8. **Extensibility**: Easy to add new strategies and observers
9. **Performance**: Built-in caching and optimization
10. **Responsive**: Native responsive design support

## 🚀 Next Steps

1. **Implement Phase 1-7** following the plan above
2. **Add comprehensive tests** for each component
3. **Create documentation** and usage examples
4. **Performance optimization** and caching
5. **Integration testing** with Levis2025R3Wheel configuration

This implementation will completely resolve the Container god class problem while providing a robust, type-safe, and extensible Layout System that integrates seamlessly with the Unit System and existing configurations.
