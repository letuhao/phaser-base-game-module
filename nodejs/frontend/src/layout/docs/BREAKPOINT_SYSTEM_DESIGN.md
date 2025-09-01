# 🎯 Flexible Breakpoint System Design

## 📋 Overview

The Flexible Breakpoint System provides CSS-like media query functionality with support for multiple conditions, priorities, and extensible breakpoint types. This system allows for complex responsive behavior that goes beyond simple screen width breakpoints.

## 🎯 Core Principles

1. **CSS-like Flexibility**: Support for multiple conditions like CSS media queries
2. **Extensible Conditions**: Easy to add new breakpoint condition types
3. **Priority System**: Handle conflicting breakpoints with priority rules
4. **Type Safety**: Full TypeScript support with strict typing
5. **Performance**: Efficient condition evaluation and caching
6. **Constants Management**: No magic numbers or strings

## 🏗️ Architecture Overview

```
Breakpoint System
├── Core/
│   ├── BreakpointManager.ts        # Main orchestrator
│   ├── BreakpointRegistry.ts       # Breakpoint registration
│   └── BreakpointConstants.ts      # Centralized constants
├── Interfaces/
│   ├── IBreakpointCondition.ts     # Condition interface
│   ├── IBreakpoint.ts              # Breakpoint interface
│   └── IBreakpointEvaluator.ts     # Evaluator interface
├── Conditions/
│   ├── ScreenWidthBreakpoint.ts
│   ├── ScreenHeightBreakpoint.ts
│   ├── AspectRatioBreakpoint.ts
│   ├── OrientationBreakpoint.ts
│   ├── DeviceTypeBreakpoint.ts
│   ├── PixelDensityBreakpoint.ts
│   └── CustomBreakpoint.ts
├── Evaluators/
│   ├── BreakpointEvaluator.ts
│   ├── CachingBreakpointEvaluator.ts
│   └── PerformanceBreakpointEvaluator.ts
├── Registry/
│   ├── BreakpointRegistry.ts
│   └── BreakpointPriorityManager.ts
└── Types/
    ├── BreakpointTypes.ts
    └── ConditionTypes.ts
```

## 🔧 Core Components

### **1. Breakpoint Interfaces**

```typescript
// src/layout/interfaces/IBreakpointCondition.ts
export interface IBreakpointCondition {
  readonly type: string;
  readonly priority: number;
  evaluate(context: BreakpointContext): boolean;
  getDescription(): string;
  serialize(): BreakpointConditionConfig;
}

// src/layout/interfaces/IBreakpoint.ts
export interface IBreakpoint {
  readonly name: string;
  readonly conditions: IBreakpointCondition[];
  readonly priority: number;
  readonly description?: string;
  evaluate(context: BreakpointContext): boolean;
  getActiveConditions(context: BreakpointContext): IBreakpointCondition[];
  getPriority(): number;
  serialize(): BreakpointConfig;
}

// src/layout/interfaces/IBreakpointEvaluator.ts
export interface IBreakpointEvaluator {
  evaluateBreakpoint(breakpoint: IBreakpoint, context: BreakpointContext): boolean;
  evaluateConditions(conditions: IBreakpointCondition[], context: BreakpointContext): boolean;
  getActiveBreakpoints(breakpoints: IBreakpoint[], context: BreakpointContext): IBreakpoint[];
  getHighestPriorityBreakpoint(breakpoints: IBreakpoint[], context: BreakpointContext): IBreakpoint | null;
}
```

### **2. Breakpoint Context**

```typescript
// src/layout/types/BreakpointTypes.ts
export interface BreakpointContext {
  // Screen dimensions
  screen: {
    width: number;
    height: number;
    aspectRatio: number;
    pixelDensity: number;
  };
  
  // Device information
  device: {
    type: 'mobile' | 'tablet' | 'desktop' | 'tv';
    orientation: 'portrait' | 'landscape';
    userAgent: string;
    touchCapable: boolean;
  };
  
  // Viewport information
  viewport: {
    width: number;
    height: number;
    aspectRatio: number;
    zoom: number;
  };
  
  // Custom context
  custom: Record<string, unknown>;
  
  // Performance settings
  performance: {
    enableCaching: boolean;
    cacheTimeout: number;
  };
}

export interface BreakpointConditionConfig {
  type: string;
  priority: number;
  parameters: Record<string, unknown>;
}

export interface BreakpointConfig {
  name: string;
  priority: number;
  conditions: BreakpointConditionConfig[];
  description?: string;
}
```

### **3. Breakpoint Constants**

```typescript
// src/layout/core/BreakpointConstants.ts
export const BREAKPOINT_CONSTANTS = {
  // Default breakpoints (CSS-like)
  DEFAULT_BREAKPOINTS: {
    XS: { minWidth: 0, maxWidth: 575 },
    SM: { minWidth: 576, maxWidth: 767 },
    MD: { minWidth: 768, maxWidth: 991 },
    LG: { minWidth: 992, maxWidth: 1199 },
    XL: { minWidth: 1200, maxWidth: 1399 },
    XXL: { minWidth: 1400, maxWidth: Infinity }
  },
  
  // Device types
  DEVICE_TYPES: {
    MOBILE: 'mobile',
    TABLET: 'tablet',
    DESKTOP: 'desktop',
    TV: 'tv'
  },
  
  // Orientations
  ORIENTATIONS: {
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape'
  },
  
  // Priorities (higher number = higher priority)
  PRIORITIES: {
    LOW: 1,
    MEDIUM: 5,
    HIGH: 10,
    CRITICAL: 15
  },
  
  // Performance settings
  PERFORMANCE: {
    CACHE_SIZE: 100,
    CACHE_TIMEOUT: 1000, // ms
    EVALUATION_THROTTLE: 16 // ms
  }
} as const;
```

## 🎨 Condition Implementations

### **1. ScreenWidthBreakpoint**

```typescript
// src/layout/conditions/ScreenWidthBreakpoint.ts
export class ScreenWidthBreakpoint implements IBreakpointCondition {
  constructor(
    private readonly minWidth?: number,
    private readonly maxWidth?: number,
    private readonly priority: number = BREAKPOINT_CONSTANTS.PRIORITIES.MEDIUM
  ) {}
  
  readonly type = 'screen-width';
  
  evaluate(context: BreakpointContext): boolean {
    const screenWidth = context.screen.width;
    
    if (this.minWidth !== undefined && screenWidth < this.minWidth) {
      return false;
    }
    
    if (this.maxWidth !== undefined && screenWidth > this.maxWidth) {
      return false;
    }
    
    return true;
  }
  
  getDescription(): string {
    if (this.minWidth !== undefined && this.maxWidth !== undefined) {
      return `screen width between ${this.minWidth}px and ${this.maxWidth}px`;
    } else if (this.minWidth !== undefined) {
      return `screen width >= ${this.minWidth}px`;
    } else if (this.maxWidth !== undefined) {
      return `screen width <= ${this.maxWidth}px`;
    }
    return 'any screen width';
  }
  
  serialize(): BreakpointConditionConfig {
    return {
      type: this.type,
      priority: this.priority,
      parameters: {
        minWidth: this.minWidth,
        maxWidth: this.maxWidth
      }
    };
  }
}
```

### **2. ScreenHeightBreakpoint**

```typescript
// src/layout/conditions/ScreenHeightBreakpoint.ts
export class ScreenHeightBreakpoint implements IBreakpointCondition {
  constructor(
    private readonly minHeight?: number,
    private readonly maxHeight?: number,
    private readonly priority: number = BREAKPOINT_CONSTANTS.PRIORITIES.MEDIUM
  ) {}
  
  readonly type = 'screen-height';
  
  evaluate(context: BreakpointContext): boolean {
    const screenHeight = context.screen.height;
    
    if (this.minHeight !== undefined && screenHeight < this.minHeight) {
      return false;
    }
    
    if (this.maxHeight !== undefined && screenHeight > this.maxHeight) {
      return false;
    }
    
    return true;
  }
  
  getDescription(): string {
    if (this.minHeight !== undefined && this.maxHeight !== undefined) {
      return `screen height between ${this.minHeight}px and ${this.maxHeight}px`;
    } else if (this.minHeight !== undefined) {
      return `screen height >= ${this.minHeight}px`;
    } else if (this.maxHeight !== undefined) {
      return `screen height <= ${this.maxHeight}px`;
    }
    return 'any screen height';
  }
  
  serialize(): BreakpointConditionConfig {
    return {
      type: this.type,
      priority: this.priority,
      parameters: {
        minHeight: this.minHeight,
        maxHeight: this.maxHeight
      }
    };
  }
}
```

### **3. AspectRatioBreakpoint**

```typescript
// src/layout/conditions/AspectRatioBreakpoint.ts
export class AspectRatioBreakpoint implements IBreakpointCondition {
  constructor(
    private readonly minRatio?: number,
    private readonly maxRatio?: number,
    private readonly priority: number = BREAKPOINT_CONSTANTS.PRIORITIES.MEDIUM
  ) {}
  
  readonly type = 'aspect-ratio';
  
  evaluate(context: BreakpointContext): boolean {
    const aspectRatio = context.screen.aspectRatio;
    
    if (this.minRatio !== undefined && aspectRatio < this.minRatio) {
      return false;
    }
    
    if (this.maxRatio !== undefined && aspectRatio > this.maxRatio) {
      return false;
    }
    
    return true;
  }
  
  getDescription(): string {
    if (this.minRatio !== undefined && this.maxRatio !== undefined) {
      return `aspect ratio between ${this.minRatio}:1 and ${this.maxRatio}:1`;
    } else if (this.minRatio !== undefined) {
      return `aspect ratio >= ${this.minRatio}:1`;
    } else if (this.maxRatio !== undefined) {
      return `aspect ratio <= ${this.maxRatio}:1`;
    }
    return 'any aspect ratio';
  }
  
  serialize(): BreakpointConditionConfig {
    return {
      type: this.type,
      priority: this.priority,
      parameters: {
        minRatio: this.minRatio,
        maxRatio: this.maxRatio
      }
    };
  }
}
```

### **4. OrientationBreakpoint**

```typescript
// src/layout/conditions/OrientationBreakpoint.ts
export class OrientationBreakpoint implements IBreakpointCondition {
  constructor(
    private readonly orientation: 'portrait' | 'landscape',
    private readonly priority: number = BREAKPOINT_CONSTANTS.PRIORITIES.MEDIUM
  ) {}
  
  readonly type = 'orientation';
  
  evaluate(context: BreakpointContext): boolean {
    return context.device.orientation === this.orientation;
  }
  
  getDescription(): string {
    return `${this.orientation} orientation`;
  }
  
  serialize(): BreakpointConditionConfig {
    return {
      type: this.type,
      priority: this.priority,
      parameters: {
        orientation: this.orientation
      }
    };
  }
}
```

### **5. DeviceTypeBreakpoint**

```typescript
// src/layout/conditions/DeviceTypeBreakpoint.ts
export class DeviceTypeBreakpoint implements IBreakpointCondition {
  constructor(
    private readonly deviceType: 'mobile' | 'tablet' | 'desktop' | 'tv',
    private readonly priority: number = BREAKPOINT_CONSTANTS.PRIORITIES.HIGH
  ) {}
  
  readonly type = 'device-type';
  
  evaluate(context: BreakpointContext): boolean {
    return context.device.type === this.deviceType;
  }
  
  getDescription(): string {
    return `${this.deviceType} device`;
  }
  
  serialize(): BreakpointConditionConfig {
    return {
      type: this.type,
      priority: this.priority,
      parameters: {
        deviceType: this.deviceType
      }
    };
  }
}
```

### **6. CustomBreakpoint**

```typescript
// src/layout/conditions/CustomBreakpoint.ts
export class CustomBreakpoint implements IBreakpointCondition {
  constructor(
    private readonly evaluator: (context: BreakpointContext) => boolean,
    private readonly description: string,
    private readonly priority: number = BREAKPOINT_CONSTANTS.PRIORITIES.LOW
  ) {}
  
  readonly type = 'custom';
  
  evaluate(context: BreakpointContext): boolean {
    return this.evaluator(context);
  }
  
  getDescription(): string {
    return this.description;
  }
  
  serialize(): BreakpointConditionConfig {
    return {
      type: this.type,
      priority: this.priority,
      parameters: {
        description: this.description
      }
    };
  }
}
```

## 🏭 Breakpoint Class

```typescript
// src/layout/core/Breakpoint.ts
export class Breakpoint implements IBreakpoint {
  constructor(
    public readonly name: string,
    public readonly conditions: IBreakpointCondition[],
    public readonly priority: number = BREAKPOINT_CONSTANTS.PRIORITIES.MEDIUM,
    public readonly description?: string
  ) {}
  
  evaluate(context: BreakpointContext): boolean {
    // All conditions must be true for the breakpoint to be active
    return this.conditions.every(condition => condition.evaluate(context));
  }
  
  getActiveConditions(context: BreakpointContext): IBreakpointCondition[] {
    return this.conditions.filter(condition => condition.evaluate(context));
  }
  
  getPriority(): number {
    return this.priority;
  }
  
  serialize(): BreakpointConfig {
    return {
      name: this.name,
      priority: this.priority,
      conditions: this.conditions.map(condition => condition.serialize()),
      description: this.description
    };
  }
  
  // Factory methods for common breakpoints
  static createScreenWidthBreakpoint(
    name: string,
    minWidth?: number,
    maxWidth?: number,
    priority?: number
  ): Breakpoint {
    return new Breakpoint(
      name,
      [new ScreenWidthBreakpoint(minWidth, maxWidth, priority)],
      priority || BREAKPOINT_CONSTANTS.PRIORITIES.MEDIUM
    );
  }
  
  static createMobileBreakpoint(name: string): Breakpoint {
    return new Breakpoint(
      name,
      [
        new ScreenWidthBreakpoint(0, 767),
        new DeviceTypeBreakpoint('mobile')
      ],
      BREAKPOINT_CONSTANTS.PRIORITIES.HIGH,
      'Mobile devices (width <= 767px)'
    );
  }
  
  static createTabletBreakpoint(name: string): Breakpoint {
    return new Breakpoint(
      name,
      [
        new ScreenWidthBreakpoint(768, 1023),
        new DeviceTypeBreakpoint('tablet')
      ],
      BREAKPOINT_CONSTANTS.PRIORITIES.HIGH,
      'Tablet devices (768px <= width <= 1023px)'
    );
  }
  
  static createDesktopBreakpoint(name: string): Breakpoint {
    return new Breakpoint(
      name,
      [
        new ScreenWidthBreakpoint(1024, Infinity),
        new DeviceTypeBreakpoint('desktop')
      ],
      BREAKPOINT_CONSTANTS.PRIORITIES.HIGH,
      'Desktop devices (width >= 1024px)'
    );
  }
  
  static createLandscapeBreakpoint(name: string): Breakpoint {
    return new Breakpoint(
      name,
      [new OrientationBreakpoint('landscape')],
      BREAKPOINT_CONSTANTS.PRIORITIES.MEDIUM,
      'Landscape orientation'
    );
  }
  
  static createPortraitBreakpoint(name: string): Breakpoint {
    return new Breakpoint(
      name,
      [new OrientationBreakpoint('portrait')],
      BREAKPOINT_CONSTANTS.PRIORITIES.MEDIUM,
      'Portrait orientation'
    );
  }
}
```

## 🔄 Breakpoint Registry

```typescript
// src/layout/registry/BreakpointRegistry.ts
export class BreakpointRegistry {
  private static instance: BreakpointRegistry;
  private breakpoints: Map<string, IBreakpoint> = new Map();
  private readonly logger: Logger = Logger.getInstance();
  
  static getInstance(): BreakpointRegistry {
    if (!BreakpointRegistry.instance) {
      BreakpointRegistry.instance = new BreakpointRegistry();
    }
    return BreakpointRegistry.instance;
  }
  
  registerBreakpoint(breakpoint: IBreakpoint): void {
    this.breakpoints.set(breakpoint.name, breakpoint);
    this.logger.debug('BreakpointRegistry', 'registerBreakpoint', 'Breakpoint registered', {
      name: breakpoint.name,
      conditions: breakpoint.conditions.map(c => c.getDescription()),
      priority: breakpoint.priority
    });
  }
  
  unregisterBreakpoint(name: string): void {
    this.breakpoints.delete(name);
    this.logger.debug('BreakpointRegistry', 'unregisterBreakpoint', 'Breakpoint unregistered', { name });
  }
  
  getBreakpoint(name: string): IBreakpoint | undefined {
    return this.breakpoints.get(name);
  }
  
  getAllBreakpoints(): IBreakpoint[] {
    return Array.from(this.breakpoints.values());
  }
  
  getActiveBreakpoints(context: BreakpointContext): IBreakpoint[] {
    return this.getAllBreakpoints().filter(breakpoint => breakpoint.evaluate(context));
  }
  
  getHighestPriorityBreakpoint(context: BreakpointContext): IBreakpoint | null {
    const activeBreakpoints = this.getActiveBreakpoints(context);
    
    if (activeBreakpoints.length === 0) {
      return null;
    }
    
    return activeBreakpoints.reduce((highest, current) => {
      return current.getPriority() > highest.getPriority() ? current : highest;
    });
  }
  
  // Initialize default breakpoints
  initializeDefaultBreakpoints(): void {
    // Register CSS-like breakpoints
    this.registerBreakpoint(Breakpoint.createScreenWidthBreakpoint('xs', 0, 575));
    this.registerBreakpoint(Breakpoint.createScreenWidthBreakpoint('sm', 576, 767));
    this.registerBreakpoint(Breakpoint.createScreenWidthBreakpoint('md', 768, 991));
    this.registerBreakpoint(Breakpoint.createScreenWidthBreakpoint('lg', 992, 1199));
    this.registerBreakpoint(Breakpoint.createScreenWidthBreakpoint('xl', 1200, 1399));
    this.registerBreakpoint(Breakpoint.createScreenWidthBreakpoint('xxl', 1400, Infinity));
    
    // Register device-specific breakpoints
    this.registerBreakpoint(Breakpoint.createMobileBreakpoint('mobile'));
    this.registerBreakpoint(Breakpoint.createTabletBreakpoint('tablet'));
    this.registerBreakpoint(Breakpoint.createDesktopBreakpoint('desktop'));
    
    // Register orientation breakpoints
    this.registerBreakpoint(Breakpoint.createPortraitBreakpoint('portrait'));
    this.registerBreakpoint(Breakpoint.createLandscapeBreakpoint('landscape'));
    
    this.logger.info('BreakpointRegistry', 'initializeDefaultBreakpoints', 'Default breakpoints initialized');
  }
}
```

## 🎯 Breakpoint Evaluator

```typescript
// src/layout/evaluators/BreakpointEvaluator.ts
export class BreakpointEvaluator implements IBreakpointEvaluator {
  private readonly logger: Logger = Logger.getInstance();
  private cache = new Map<string, { result: boolean; timestamp: number }>();
  private readonly cacheTimeout = BREAKPOINT_CONSTANTS.PERFORMANCE.CACHE_TIMEOUT;
  
  evaluateBreakpoint(breakpoint: IBreakpoint, context: BreakpointContext): boolean {
    const cacheKey = this.generateCacheKey(breakpoint, context);
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.result;
    }
    
    const result = breakpoint.evaluate(context);
    
    this.cache.set(cacheKey, {
      result,
      timestamp: Date.now()
    });
    
    // Clean up old cache entries
    this.cleanupCache();
    
    this.logger.debug('BreakpointEvaluator', 'evaluateBreakpoint', 'Breakpoint evaluated', {
      breakpointName: breakpoint.name,
      result,
      activeConditions: breakpoint.getActiveConditions(context).map(c => c.getDescription())
    });
    
    return result;
  }
  
  evaluateConditions(conditions: IBreakpointCondition[], context: BreakpointContext): boolean {
    return conditions.every(condition => condition.evaluate(context));
  }
  
  getActiveBreakpoints(breakpoints: IBreakpoint[], context: BreakpointContext): IBreakpoint[] {
    return breakpoints.filter(breakpoint => this.evaluateBreakpoint(breakpoint, context));
  }
  
  getHighestPriorityBreakpoint(breakpoints: IBreakpoint[], context: BreakpointContext): IBreakpoint | null {
    const activeBreakpoints = this.getActiveBreakpoints(breakpoints, context);
    
    if (activeBreakpoints.length === 0) {
      return null;
    }
    
    return activeBreakpoints.reduce((highest, current) => {
      return current.getPriority() > highest.getPriority() ? current : highest;
    });
  }
  
  private generateCacheKey(breakpoint: IBreakpoint, context: BreakpointContext): string {
    return JSON.stringify({
      breakpointName: breakpoint.name,
      screenWidth: context.screen.width,
      screenHeight: context.screen.height,
      deviceType: context.device.type,
      orientation: context.device.orientation
    });
  }
  
  private cleanupCache(): void {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.cacheTimeout) {
        this.cache.delete(key);
      }
    }
  }
}
```

## 🔗 Integration with Layout System

```typescript
// src/layout/strategies/ResponsiveLayoutStrategy.ts (UPDATED)
export class ResponsiveLayoutStrategy implements ILayoutStrategy {
  private readonly breakpointRegistry = BreakpointRegistry.getInstance();
  private readonly breakpointEvaluator = new BreakpointEvaluator();
  private readonly logger: Logger = Logger.getInstance();
  
  getPriority(): number {
    return 2; // Medium priority - responsive adjustments
  }
  
  canHandle(config: ILayoutConfig): boolean {
    return true; // Always handles responsive adjustments
  }
  
  calculate(layout: CalculatedLayout, context: LayoutContext): CalculatedLayout {
    const breakpointContext = this.createBreakpointContext(context);
    const activeBreakpoint = this.breakpointRegistry.getHighestPriorityBreakpoint(breakpointContext);
    
    this.logger.debug('ResponsiveLayoutStrategy', 'calculate', 'Evaluating breakpoints', {
      activeBreakpoint: activeBreakpoint?.name,
      breakpointContext: {
        screenWidth: breakpointContext.screen.width,
        deviceType: breakpointContext.device.type,
        orientation: breakpointContext.device.orientation
      }
    });
    
    if (!activeBreakpoint) {
      return layout;
    }
    
    // Apply breakpoint-specific adjustments
    return this.applyBreakpointLayout(layout, activeBreakpoint, breakpointContext);
  }
  
  private createBreakpointContext(layoutContext: LayoutContext): BreakpointContext {
    return {
      screen: {
        width: layoutContext.responsive.viewport.width,
        height: layoutContext.responsive.viewport.height,
        aspectRatio: layoutContext.responsive.viewport.width / layoutContext.responsive.viewport.height,
        pixelDensity: window.devicePixelRatio || 1
      },
      device: {
        type: this.detectDeviceType(layoutContext.responsive.viewport.width),
        orientation: layoutContext.responsive.viewport.width > layoutContext.responsive.viewport.height ? 'landscape' : 'portrait',
        userAgent: navigator.userAgent,
        touchCapable: 'ontouchstart' in window
      },
      viewport: {
        width: layoutContext.responsive.viewport.width,
        height: layoutContext.responsive.viewport.height,
        aspectRatio: layoutContext.responsive.viewport.width / layoutContext.responsive.viewport.height,
        zoom: 1 // Could be enhanced to detect actual zoom level
      },
      custom: {},
      performance: {
        enableCaching: true,
        cacheTimeout: BREAKPOINT_CONSTANTS.PERFORMANCE.CACHE_TIMEOUT
      }
    };
  }
  
  private detectDeviceType(screenWidth: number): 'mobile' | 'tablet' | 'desktop' | 'tv' {
    if (screenWidth < 768) return 'mobile';
    if (screenWidth < 1024) return 'tablet';
    if (screenWidth < 1920) return 'desktop';
    return 'tv';
  }
  
  private applyBreakpointLayout(
    layout: CalculatedLayout,
    breakpoint: IBreakpoint,
    context: BreakpointContext
  ): CalculatedLayout {
    const breakpointName = breakpoint.name;
    
    switch (breakpointName) {
      case 'xs':
      case 'mobile':
        return this.applyMobileLayout(layout, context);
      case 'sm':
      case 'tablet':
        return this.applyTabletLayout(layout, context);
      case 'md':
      case 'lg':
      case 'xl':
      case 'xxl':
      case 'desktop':
        return this.applyDesktopLayout(layout, context);
      case 'portrait':
        return this.applyPortraitLayout(layout, context);
      case 'landscape':
        return this.applyLandscapeLayout(layout, context);
      default:
        return layout;
    }
  }
  
  private applyMobileLayout(layout: CalculatedLayout, context: BreakpointContext): CalculatedLayout {
    return {
      ...layout,
      size: {
        width: Math.min(layout.size.width, context.screen.width * 0.95),
        height: Math.min(layout.size.height, context.screen.height * 0.95)
      },
      visual: {
        ...layout.visual,
        alpha: Math.min(layout.visual.alpha, 0.9)
      }
    };
  }
  
  private applyTabletLayout(layout: CalculatedLayout, context: BreakpointContext): CalculatedLayout {
    return {
      ...layout,
      size: {
        width: Math.min(layout.size.width, context.screen.width * 0.9),
        height: Math.min(layout.size.height, context.screen.height * 0.9)
      }
    };
  }
  
  private applyDesktopLayout(layout: CalculatedLayout, context: BreakpointContext): CalculatedLayout {
    return {
      ...layout,
      size: {
        width: Math.min(layout.size.width, context.screen.width * 0.8),
        height: Math.min(layout.size.height, context.screen.height * 0.8)
      }
    };
  }
  
  private applyPortraitLayout(layout: CalculatedLayout, context: BreakpointContext): CalculatedLayout {
    return {
      ...layout,
      size: {
        width: Math.min(layout.size.width, context.screen.width * 0.95),
        height: Math.min(layout.size.height, context.screen.height * 0.9)
      }
    };
  }
  
  private applyLandscapeLayout(layout: CalculatedLayout, context: BreakpointContext): CalculatedLayout {
    return {
      ...layout,
      size: {
        width: Math.min(layout.size.width, context.screen.width * 0.9),
        height: Math.min(layout.size.height, context.screen.height * 0.95)
      }
    };
  }
}
```

## 🚀 Usage Examples

### **1. Creating Custom Breakpoints**

```typescript
// Create a custom breakpoint for high-DPI displays
const highDpiBreakpoint = new Breakpoint(
  'high-dpi',
  [
    new CustomBreakpoint(
      (context) => context.screen.pixelDensity >= 2,
      'High DPI display (2x or higher)',
      BREAKPOINT_CONSTANTS.PRIORITIES.HIGH
    )
  ],
  BREAKPOINT_CONSTANTS.PRIORITIES.HIGH,
  'High DPI displays'
);

// Create a breakpoint for touch devices
const touchDeviceBreakpoint = new Breakpoint(
  'touch-device',
  [
    new CustomBreakpoint(
      (context) => context.device.touchCapable,
      'Touch-capable device',
      BREAKPOINT_CONSTANTS.PRIORITIES.MEDIUM
    )
  ],
  BREAKPOINT_CONSTANTS.PRIORITIES.MEDIUM,
  'Touch-capable devices'
);

// Register breakpoints
const registry = BreakpointRegistry.getInstance();
registry.registerBreakpoint(highDpiBreakpoint);
registry.registerBreakpoint(touchDeviceBreakpoint);
```

### **2. Complex Breakpoint Conditions**

```typescript
// Create a breakpoint for large landscape tablets
const largeTabletLandscape = new Breakpoint(
  'large-tablet-landscape',
  [
    new ScreenWidthBreakpoint(1024, 1366), // iPad Pro width range
    new ScreenHeightBreakpoint(768, 1024), // iPad Pro height range
    new OrientationBreakpoint('landscape'),
    new DeviceTypeBreakpoint('tablet')
  ],
  BREAKPOINT_CONSTANTS.PRIORITIES.HIGH,
  'Large tablet in landscape mode'
);

// Create a breakpoint for small mobile devices
const smallMobile = new Breakpoint(
  'small-mobile',
  [
    new ScreenWidthBreakpoint(0, 375), // iPhone SE, small Android phones
    new DeviceTypeBreakpoint('mobile')
  ],
  BREAKPOINT_CONSTANTS.PRIORITIES.HIGH,
  'Small mobile devices'
);
```

### **3. Integration with Layout System**

```typescript
// In LayoutManager
const breakpointRegistry = BreakpointRegistry.getInstance();
breakpointRegistry.initializeDefaultBreakpoints();

// The ResponsiveLayoutStrategy will automatically use the registered breakpoints
const responsiveStrategy = new ResponsiveLayoutStrategy();
```

## 📋 Benefits

1. **CSS-like Flexibility**: Support for complex media query-like conditions
2. **Extensible**: Easy to add new condition types
3. **Priority System**: Handle conflicting breakpoints with clear priority rules
4. **Type Safety**: Full TypeScript support
5. **Performance**: Built-in caching and efficient evaluation
6. **Constants Management**: No magic numbers or strings
7. **Testability**: Each component can be tested independently
8. **Maintainability**: Clear separation of concerns
9. **Extensibility**: Easy to add new breakpoint types and conditions
10. **Integration**: Seamless integration with the Layout System

This flexible breakpoint system provides the power and flexibility of CSS media queries while maintaining type safety and performance optimization.
