# 🎮 GameObject Decorator System

## 📋 Overview

The GameObject Decorator System provides type-specific decorators for different Phaser GameObject types, each with their own responsive behavior. This prevents the ResponsiveLayoutStrategy from becoming a god class.

## 🎯 Core Principles

1. **Type-Specific Behavior**: Each GameObject type has specialized responsive logic
2. **Decorator Pattern**: Extend GameObject functionality without modification
3. **Dynamic Registration**: Easy to add new GameObject types
4. **Layout System Integration**: Seamless integration with Layout and Breakpoint systems

## 🏗️ Architecture

```
GameObject Decorators
├── Interfaces/
│   ├── IGameObjectDecorator.ts
│   └── IResponsiveGameObject.ts
├── Decorators/
│   ├── ContainerDecorator.ts
│   ├── RectangleDecorator.ts
│   ├── CircleDecorator.ts
│   ├── SpriteDecorator.ts
│   ├── TextDecorator.ts
│   └── CustomGameObjectDecorator.ts
├── Manager/
│   └── GameObjectDecoratorManager.ts
└── Factory/
    └── GameObjectDecoratorFactory.ts
```

## 🔧 Core Interfaces

```typescript
// src/layout/interfaces/IGameObjectDecorator.ts
export interface IGameObjectDecorator {
  readonly gameObjectType: string;
  readonly target: Phaser.GameObjects.GameObject;
  
  // Layout System integration
  applyLayout(layout: CalculatedLayout): void;
  getLayoutContext(): LayoutContext;
  
  // Responsive behavior
  handleResponsiveChange(breakpoint: IBreakpoint): void;
  updateResponsiveProperties(properties: ResponsiveProperties): void;
  
  // Lifecycle
  initialize(): void;
  destroy(): void;
  
  // Utility
  getGameObject(): Phaser.GameObjects.GameObject;
  getType(): string;
}

// src/layout/interfaces/IResponsiveGameObject.ts
export interface IResponsiveGameObject {
  readonly responsiveProperties: ResponsiveProperties;
  
  // Responsive calculations
  calculateResponsiveSize(breakpoint: IBreakpoint): { width: number; height: number };
  calculateResponsivePosition(breakpoint: IBreakpoint): { x: number; y: number };
  calculateResponsiveScale(breakpoint: IBreakpoint): { x: number; y: number };
  
  // Responsive updates
  updateSize(width: number, height: number): void;
  updatePosition(x: number, y: number): void;
  updateScale(x: number, y: number): void;
}
```

## 🎨 Decorator Implementations

### **1. Container Decorator**

```typescript
// src/layout/decorators/ContainerDecorator.ts
export class ContainerDecorator extends BaseGameObjectDecorator implements IResponsiveGameObject {
  readonly gameObjectType = 'container';
  
  constructor(
    target: Phaser.GameObjects.Container,
    config: GameObjectDecoratorConfig
  ) {
    super(target, config);
  }
  
  // Container-specific responsive behavior
  calculateResponsiveSize(breakpoint: IBreakpoint): { width: number; height: number } {
    const properties = this.getResponsivePropertiesForBreakpoint(breakpoint);
    
    let width = this.calculateSizeValue(properties.size?.width, 'width');
    let height = this.calculateSizeValue(properties.size?.height, 'height');
    
    // Maintain aspect ratio if specified
    if (properties.size?.maintainAspectRatio && properties.size?.aspectRatio) {
      const aspectRatio = properties.size.aspectRatio;
      if (width / height > aspectRatio) {
        width = height * aspectRatio;
      } else {
        height = width / aspectRatio;
      }
    }
    
    return { width, height };
  }
  
  protected applyTypeSpecificLayout(layout: CalculatedLayout): void {
    const container = this.target as Phaser.GameObjects.Container;
    
    // Apply background
    if (layout.background?.color) {
      this.applyBackgroundColor(layout.background.color);
    }
    
    // Update children layout
    this.updateChildrenLayout();
  }
  
  private applyBackgroundColor(color: string): void {
    const container = this.target as Phaser.GameObjects.Container;
    
    // Remove existing background
    const existingBackground = container.getByName('background-rectangle');
    if (existingBackground) {
      existingBackground.destroy();
    }
    
    // Create new background
    const background = this.target.scene.add.rectangle(
      0, 0,
      container.width || 100,
      container.height || 100,
      Phaser.Display.Color.ValueToColor(color).color
    );
    background.setName('background-rectangle');
    container.addAt(background, 0);
  }
  
  private updateChildrenLayout(): void {
    const container = this.target as Phaser.GameObjects.Container;
    
    // Update layout for all responsive children
    container.children.each((child: Phaser.GameObjects.GameObject) => {
      const decorator = GameObjectDecoratorManager.getInstance().getDecorator(child);
      if (decorator) {
        const layout = this.layoutManager.calculateLayout(
          decorator.serialize(),
          decorator.getLayoutContext()
        );
        decorator.applyLayout(layout);
      }
    });
  }
}
```

### **2. Rectangle Decorator**

```typescript
// src/layout/decorators/RectangleDecorator.ts
export class RectangleDecorator extends BaseGameObjectDecorator implements IResponsiveGameObject {
  readonly gameObjectType = 'rectangle';
  
  constructor(
    target: Phaser.GameObjects.Rectangle,
    config: GameObjectDecoratorConfig
  ) {
    super(target, config);
  }
  
  // Rectangle-specific responsive behavior
  calculateResponsiveSize(breakpoint: IBreakpoint): { width: number; height: number } {
    const properties = this.getResponsivePropertiesForBreakpoint(breakpoint);
    
    const width = this.calculateSizeValue(properties.size?.width, 'width');
    const height = this.calculateSizeValue(properties.size?.height, 'height');
    
    return { width, height };
  }
  
  protected applyTypeSpecificLayout(layout: CalculatedLayout): void {
    const rectangle = this.target as Phaser.GameObjects.Rectangle;
    
    // Apply fill color
    if (layout.background?.color) {
      rectangle.setFillStyle(Phaser.Display.Color.ValueToColor(layout.background.color).color);
    }
    
    // Apply border
    if (layout.border?.color && layout.border?.width) {
      rectangle.setStrokeStyle(
        layout.border.width,
        Phaser.Display.Color.ValueToColor(layout.border.color).color
      );
    }
  }
}
```

### **3. Circle Decorator**

```typescript
// src/layout/decorators/CircleDecorator.ts
export class CircleDecorator extends BaseGameObjectDecorator implements IResponsiveGameObject {
  readonly gameObjectType = 'circle';
  
  constructor(
    target: Phaser.GameObjects.Circle,
    config: GameObjectDecoratorConfig
  ) {
    super(target, config);
  }
  
  // Circle-specific responsive behavior
  calculateResponsiveSize(breakpoint: IBreakpoint): { width: number; height: number } {
    const properties = this.getResponsivePropertiesForBreakpoint(breakpoint);
    
    // Circles maintain aspect ratio by default
    const radius = this.calculateSizeValue(properties.size?.width, 'width') / 2;
    
    return { width: radius * 2, height: radius * 2 };
  }
  
  protected applyTypeSpecificLayout(layout: CalculatedLayout): void {
    const circle = this.target as Phaser.GameObjects.Circle;
    
    // Apply fill color
    if (layout.background?.color) {
      circle.setFillStyle(Phaser.Display.Color.ValueToColor(layout.background.color).color);
    }
    
    // Apply border
    if (layout.border?.color && layout.border?.width) {
      circle.setStrokeStyle(
        layout.border.width,
        Phaser.Display.Color.ValueToColor(layout.border.color).color
      );
    }
  }
}
```

### **4. Text Decorator**

```typescript
// src/layout/decorators/TextDecorator.ts
export class TextDecorator extends BaseGameObjectDecorator implements IResponsiveGameObject {
  readonly gameObjectType = 'text';
  
  constructor(
    target: Phaser.GameObjects.Text,
    config: GameObjectDecoratorConfig
  ) {
    super(target, config);
  }
  
  // Text-specific responsive behavior
  calculateResponsiveSize(breakpoint: IBreakpoint): { width: number; height: number } {
    const properties = this.getResponsivePropertiesForBreakpoint(breakpoint);
    const text = this.target as Phaser.GameObjects.Text;
    
    // Text size is based on font size, not explicit width/height
    const fontSize = this.calculateFontSize(properties);
    text.setFontSize(fontSize);
    
    return { width: text.width, height: text.height };
  }
  
  protected applyTypeSpecificLayout(layout: CalculatedLayout): void {
    const text = this.target as Phaser.GameObjects.Text;
    
    // Apply text color
    if (layout.background?.color) {
      text.setColor(layout.background.color);
    }
    
    // Apply text alignment
    if (layout.visual?.alignment) {
      text.setAlign(layout.visual.alignment);
    }
  }
  
  private calculateFontSize(properties: ResponsiveProperties): number {
    // Calculate responsive font size based on breakpoint
    const baseFontSize = 16;
    const scaleFactor = this.getFontScaleFactor();
    
    return Math.max(8, Math.min(72, baseFontSize * scaleFactor));
  }
  
  private getFontScaleFactor(): number {
    const viewportWidth = window.innerWidth;
    
    if (viewportWidth < 576) return 0.8; // Mobile
    if (viewportWidth < 768) return 0.9; // Small tablet
    if (viewportWidth < 992) return 1.0; // Tablet
    if (viewportWidth < 1200) return 1.1; // Desktop
    return 1.2; // Large desktop
  }
}
```

## 🏭 GameObject Decorator Manager

```typescript
// src/layout/core/GameObjectDecoratorManager.ts
export class GameObjectDecoratorManager {
  private static instance: GameObjectDecoratorManager;
  private decorators: Map<string, IGameObjectDecorator> = new Map();
  private readonly logger: Logger = Logger.getInstance();
  
  static getInstance(): GameObjectDecoratorManager {
    if (!GameObjectDecoratorManager.instance) {
      GameObjectDecoratorManager.instance = new GameObjectDecoratorManager();
    }
    return GameObjectDecoratorManager.instance;
  }
  
  // Register a decorator for a GameObject
  registerDecorator(gameObject: Phaser.GameObjects.GameObject, decorator: IGameObjectDecorator): void {
    const key = this.generateKey(gameObject);
    this.decorators.set(key, decorator);
    
    this.logger.debug('GameObjectDecoratorManager', 'registerDecorator', 'Decorator registered', {
      gameObjectType: decorator.gameObjectType,
      key
    });
  }
  
  // Get decorator for a GameObject
  getDecorator(gameObject: Phaser.GameObjects.GameObject): IGameObjectDecorator | undefined {
    const key = this.generateKey(gameObject);
    return this.decorators.get(key);
  }
  
  // Create decorator for a GameObject
  createDecorator(
    gameObject: Phaser.GameObjects.GameObject,
    config: GameObjectDecoratorConfig
  ): IGameObjectDecorator {
    const factory = GameObjectDecoratorFactory.getInstance();
    const decorator = factory.createDecorator(gameObject, config);
    
    this.registerDecorator(gameObject, decorator);
    decorator.initialize();
    
    return decorator;
  }
  
  // Update all decorators for a breakpoint change
  updateAllDecorators(breakpoint: IBreakpoint): void {
    this.decorators.forEach(decorator => {
      try {
        decorator.handleResponsiveChange(breakpoint);
      } catch (error) {
        this.logger.error('GameObjectDecoratorManager', 'updateAllDecorators', 'Failed to update decorator', {
          gameObjectType: decorator.gameObjectType,
          error: error instanceof Error ? error.message : String(error)
        });
      }
    });
  }
  
  private generateKey(gameObject: Phaser.GameObjects.GameObject): string {
    return `${gameObject.scene.scene.key}-${gameObject.name || gameObject.type}-${gameObject.id}`;
  }
}
```

## 🏭 GameObject Decorator Factory

```typescript
// src/layout/factories/GameObjectDecoratorFactory.ts
export class GameObjectDecoratorFactory implements IGameObjectFactory {
  private static instance: GameObjectDecoratorFactory;
  private readonly logger: Logger = Logger.getInstance();
  
  static getInstance(): GameObjectDecoratorFactory {
    if (!GameObjectDecoratorFactory.instance) {
      GameObjectDecoratorFactory.instance = new GameObjectDecoratorFactory();
    }
    return GameObjectDecoratorFactory.instance;
  }
  
  createDecorator(
    gameObject: Phaser.GameObjects.GameObject,
    config: GameObjectDecoratorConfig
  ): IGameObjectDecorator {
    this.logger.debug('GameObjectDecoratorFactory', 'createDecorator', 'Creating decorator', {
      gameObjectType: gameObject.type,
      configType: config.type
    });
    
    switch (config.type) {
      case 'container':
        if (gameObject instanceof Phaser.GameObjects.Container) {
          return new ContainerDecorator(gameObject, config);
        }
        break;
        
      case 'rectangle':
        if (gameObject instanceof Phaser.GameObjects.Rectangle) {
          return new RectangleDecorator(gameObject, config);
        }
        break;
        
      case 'circle':
        if (gameObject instanceof Phaser.GameObjects.Circle) {
          return new CircleDecorator(gameObject, config);
        }
        break;
        
      case 'text':
        if (gameObject instanceof Phaser.GameObjects.Text) {
          return new TextDecorator(gameObject, config);
        }
        break;
        
      case 'sprite':
        if (gameObject instanceof Phaser.GameObjects.Sprite) {
          return new SpriteDecorator(gameObject, config);
        }
        break;
        
      default:
        throw new Error(`Unsupported GameObject type: ${config.type}`);
    }
    
    throw new Error(`GameObject type mismatch: expected ${config.type}, got ${gameObject.type}`);
  }
  
  canCreate(gameObject: Phaser.GameObjects.GameObject): boolean {
    return [
      'Container',
      'Rectangle',
      'Circle',
      'Sprite',
      'Text',
      'Image',
      'Graphics'
    ].includes(gameObject.type);
  }
  
  getSupportedTypes(): string[] {
    return ['container', 'rectangle', 'circle', 'sprite', 'text', 'image', 'graphics'];
  }
}
```

## 🚀 Usage Examples

### **1. Creating Responsive GameObjects**

```typescript
// Create a responsive container
const container = scene.add.container(0, 0);
const containerConfig: GameObjectDecoratorConfig = {
  type: 'container',
  responsiveProperties: {
    size: {
      width: { unit: 'viewport-width', value: 80 }, // 80% of viewport width
      height: { unit: 'viewport-height', value: 60 }, // 60% of viewport height
      maintainAspectRatio: true
    },
    position: {
      x: { unit: 'scene-center', value: 0 },
      y: { unit: 'scene-center', value: 0 }
    }
  },
  breakpointOverrides: {
    mobile: {
      size: {
        width: { unit: 'viewport-width', value: 95 }, // 95% on mobile
        height: { unit: 'viewport-height', value: 80 }
      }
    }
  }
};

const containerDecorator = GameObjectDecoratorManager.getInstance().createDecorator(container, containerConfig);

// Create a responsive rectangle
const rectangle = scene.add.rectangle(0, 0, 100, 100, 0xff0000);
const rectangleConfig: GameObjectDecoratorConfig = {
  type: 'rectangle',
  responsiveProperties: {
    size: {
      width: { unit: 'parent-width', value: 50 }, // 50% of parent width
      height: { unit: 'parent-height', value: 30 } // 30% of parent height
    },
    position: {
      x: { unit: 'parent-center', value: 0 },
      y: { unit: 'parent-center', value: 0 }
    }
  }
};

const rectangleDecorator = GameObjectDecoratorManager.getInstance().createDecorator(rectangle, rectangleConfig);
```

### **2. Integration with Layout System**

```typescript
// The decorators automatically integrate with the Layout System
const layoutManager = LayoutManager.getInstance();
const breakpointRegistry = BreakpointRegistry.getInstance();

// When breakpoint changes, all decorators are updated
breakpointRegistry.addObserver({
  onBreakpointChanged: (breakpoint: IBreakpoint) => {
    GameObjectDecoratorManager.getInstance().updateAllDecorators(breakpoint);
  }
});

// Layout changes are automatically applied to decorators
const layout = layoutManager.calculateLayout(layoutConfig, layoutContext);
containerDecorator.applyLayout(layout);
```

## 📋 Benefits

1. **Type-Specific Behavior**: Each GameObject type has specialized responsive logic
2. **No God Class**: ResponsiveLayoutStrategy stays focused and doesn't become a god class
3. **Decorator Pattern**: Extend functionality without modifying base classes
4. **Dynamic Registration**: Easy to add new GameObject types
5. **Layout System Integration**: Seamless integration with Layout and Breakpoint systems
6. **Type Safety**: Full TypeScript support
7. **Testability**: Each decorator can be tested independently
8. **Maintainability**: Clear separation of concerns
9. **Extensibility**: Easy to add new GameObject types and behaviors
10. **Performance**: Efficient updates and caching

This GameObject Decorator System prevents the ResponsiveLayoutStrategy from becoming a god class by delegating type-specific responsive behavior to specialized decorators.
