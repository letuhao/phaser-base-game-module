# Layout System Constants and Interfaces Usage Guide

## Overview
This guide covers how to use the constants, enums, and interfaces in the layout system for creating type-safe, maintainable layout configurations.

## Table of Contents
1. [Enums Usage](#enums-usage)
2. [Constants Usage](#constants-usage)
3. [Interface Bundles](#interface-bundles)
4. [Best Practices](#best-practices)
5. [Examples](#examples)

---

## Enums Usage

### Importing Enums
```typescript
import { 
  // Unit System Enums
  PositionUnit,
  SizeUnit,
  ScaleUnit,
  
  // Layout System Enums
  HorizontalAlignment,
  VerticalAlignment,
  SizeValueType,
  BorderStyle,
  TextBaseline,
  TextDecoration,
  
  // Animation Enums
  AnimationDirection,
  AnimationFillMode,
  AnimationPlayState,
  AnimationIterationCount,
  
  // Transform Enums
  TransformStyle,
  BackfaceVisibility,
  
  // Interaction Enums
  PointerEvents,
  UserSelect,
  
  // Theme Enums
  ThemeMode,
  
  // Unit Enums
  UnitTypeSpec,
  UnitDimension,
  RoundingStrategy,
  StyleCompositionStrategy,
  
  // Command Pattern Enums
  LayoutChangeType,
  
  // State Pattern Enums
  LayoutStateChangeType,
  LayoutStateType,
  
  // Chain Pattern Enums
  LayoutChainHandlerType,
  
  // Performance Enums
  ComplexityLevel,
  CalculationSpeed,
  PerformanceLevel,
  LogLevel,
  ValidationSeverity
} from '../enums/LayoutEnums';
```

### Using Enums in Type Definitions
```typescript
// ✅ Good - Using enums for type safety
interface IButtonStyle {
  positionX: PositionUnit.CENTER;
  positionY: PositionUnit.MIDDLE;
  width: SizeUnit.PERCENTAGE;
  height: SizeUnit.PIXELS;
  alignment: HorizontalAlignment.CENTER;
  borderStyle: BorderStyle.SOLID;
}

// ❌ Bad - Using string literals
interface IButtonStyle {
  positionX: 'center';
  positionY: 'middle';
  width: 'percentage';
  height: 'pixels';
  alignment: 'center';
  borderStyle: 'solid';
}
```

### Enum Categories and Usage

#### Unit System Enums
```typescript
// Position units for responsive positioning
const positionConfig = {
  x: PositionUnit.PERCENTAGE,  // 50% of parent
  y: PositionUnit.PIXELS,      // 100px from top
  offsetX: PositionUnit.VIEWPORT_WIDTH,  // 10% of viewport width
  offsetY: PositionUnit.VIEWPORT_HEIGHT  // 5% of viewport height
};

// Size units for responsive sizing
const sizeConfig = {
  width: SizeUnit.PERCENTAGE,   // 80% of parent width
  height: SizeUnit.PIXELS,      // 200px height
  minWidth: SizeUnit.VIEWPORT_WIDTH,  // 300px minimum
  maxHeight: SizeUnit.VIEWPORT_HEIGHT  // 80% of viewport
};

// Scale units for responsive scaling
const scaleConfig = {
  x: ScaleUnit.UNIFORM,         // Uniform scaling
  y: ScaleUnit.ASPECT_RATIO,    // Maintain aspect ratio
  z: ScaleUnit.CUSTOM           // Custom scaling
};
```

#### Layout System Enums
```typescript
// Alignment configuration
const alignmentConfig = {
  horizontal: HorizontalAlignment.CENTER,
  vertical: VerticalAlignment.MIDDLE,
  textAlign: HorizontalAlignment.LEFT
};

// Size value types
const sizeValueConfig = {
  width: SizeValueType.FIXED,      // Fixed size
  height: SizeValueType.RESPONSIVE, // Responsive size
  minSize: SizeValueType.MINIMUM,  // Minimum size
  maxSize: SizeValueType.MAXIMUM   // Maximum size
};

// Border configuration
const borderConfig = {
  style: BorderStyle.SOLID,
  width: 2,
  color: '#000000'
};
```

#### Animation Enums
```typescript
// Animation configuration
const animationConfig = {
  direction: AnimationDirection.NORMAL,
  fillMode: AnimationFillMode.BOTH,
  playState: AnimationPlayState.RUNNING,
  iterationCount: AnimationIterationCount.INFINITE
};
```

#### Theme Enums
```typescript
// Theme configuration
const themeConfig = {
  mode: ThemeMode.AUTO,  // Auto-detect theme
  // or ThemeMode.LIGHT / ThemeMode.DARK
};
```

#### Performance Enums
```typescript
// Performance configuration
const performanceConfig = {
  complexity: ComplexityLevel.MEDIUM,
  calculationSpeed: CalculationSpeed.FAST,
  memoryUsage: PerformanceLevel.LOW
};
```

---

## Constants Usage

### Importing Constants
```typescript
import { 
  LAYOUT_SYSTEM_CONSTANTS,
  BREAKPOINT_CONSTANTS,
  LAYOUT_CONSTANTS,
  SIZE_CONSTANTS,
  SPACING_CONSTANTS,
  COLOR_CONSTANTS,
  TYPOGRAPHY_CONSTANTS,
  ANIMATION_CONSTANTS,
  DEVICE_CONSTANTS,
  PERFORMANCE_CONSTANTS,
  VALIDATION_CONSTANTS,
  LOGGING_CONSTANTS,
  GAMEOBJECT_CONSTANTS,
  THEME_CONSTANTS,
  STRATEGY_CONSTANTS,
  UNIT_CONSTANTS,
  COMMAND_CONSTANTS,
  STATE_CONSTANTS,
  CHAIN_CONSTANTS,
  TRANSFORM_CONSTANTS,
  REFERENCE_CONSTANTS,
  UTILITY_CONSTANTS
} from '../constants/LayoutConstants';
```

### Using Breakpoints
```typescript
// Responsive breakpoint configuration
const responsiveConfig = {
  xs: BREAKPOINT_CONSTANTS.BREAKPOINTS.XS,      // 0px
  sm: BREAKPOINT_CONSTANTS.BREAKPOINTS.SM,      // 576px
  md: BREAKPOINT_CONSTANTS.BREAKPOINTS.MD,      // 768px
  lg: BREAKPOINT_CONSTANTS.BREAKPOINTS.LG,      // 992px
  xl: BREAKPOINT_CONSTANTS.BREAKPOINTS.XL,      // 1200px
  xxl: BREAKPOINT_CONSTANTS.BREAKPOINTS.XXL     // 1400px
};

// Breakpoint usage in layout
const layoutConfig = {
  breakpoints: {
    [BREAKPOINT_CONSTANTS.BREAKPOINTS.MD]: {
      width: SizeUnit.PERCENTAGE,
      height: SizeUnit.PIXELS
    },
    [BREAKPOINT_CONSTANTS.BREAKPOINTS.LG]: {
      width: SizeUnit.PIXELS,
      height: SizeUnit.PERCENTAGE
    }
  }
};
```

### Using Layout Types
```typescript
// Layout type configuration
const layoutTypeConfig = {
  type: LAYOUT_CONSTANTS.TYPES.FLEX,
  direction: 'row',
  wrap: true
};

// Available layout types
const availableTypes = [
  LAYOUT_CONSTANTS.TYPES.FLEX,    // CSS Flexbox-like
  LAYOUT_CONSTANTS.TYPES.GRID,    // CSS Grid-like
  LAYOUT_CONSTANTS.TYPES.ABSOLUTE, // Absolute positioning
  LAYOUT_CONSTANTS.TYPES.RELATIVE, // Relative positioning
  LAYOUT_CONSTANTS.TYPES.BLOCK    // Block layout
];
```

### Using All Constants Categories

#### Spacing Constants
```typescript
// Spacing scale (inspired by Tailwind CSS)
const spacingConfig = {
  xs: SPACING_CONSTANTS.SCALE.XS,    // 4px
  sm: SPACING_CONSTANTS.SCALE.SM,    // 8px
  md: SPACING_CONSTANTS.SCALE.MD,    // 16px
  lg: SPACING_CONSTANTS.SCALE.LG,    // 24px
  xl: SPACING_CONSTANTS.SCALE.XL,    // 32px
  xxl: SPACING_CONSTANTS.SCALE.XXL,  // 48px
  xxxl: SPACING_CONSTANTS.SCALE.XXXL // 64px
};

// Margin and padding
const marginConfig = {
  none: SPACING_CONSTANTS.MARGIN.NONE,  // 0
  auto: SPACING_CONSTANTS.MARGIN.AUTO   // 'auto'
};
```

#### Color Constants
```typescript
// Default colors
const colorConfig = {
  transparent: COLOR_CONSTANTS.DEFAULTS.TRANSPARENT,
  black: COLOR_CONSTANTS.DEFAULTS.BLACK,
  white: COLOR_CONSTANTS.DEFAULTS.WHITE,
  primary: COLOR_CONSTANTS.DEFAULTS.BLUE,
  success: COLOR_CONSTANTS.DEFAULTS.GREEN,
  warning: COLOR_CONSTANTS.DEFAULTS.YELLOW,
  error: COLOR_CONSTANTS.DEFAULTS.RED
};

// Color opacity
const opacityConfig = {
  transparent: COLOR_CONSTANTS.OPACITY.TRANSPARENT, // 0
  low: COLOR_CONSTANTS.OPACITY.LOW,                 // 0.25
  medium: COLOR_CONSTANTS.OPACITY.MEDIUM,           // 0.5
  high: COLOR_CONSTANTS.OPACITY.HIGH,               // 0.75
  opaque: COLOR_CONSTANTS.OPACITY.OPAQUE            // 1
};

// Blend modes
const blendConfig = {
  normal: COLOR_CONSTANTS.BLEND_MODES.NORMAL,
  multiply: COLOR_CONSTANTS.BLEND_MODES.MULTIPLY,
  screen: COLOR_CONSTANTS.BLEND_MODES.SCREEN,
  overlay: COLOR_CONSTANTS.BLEND_MODES.OVERLAY
};
```

#### Typography Constants
```typescript
// Font families
const fontConfig = {
  sans: TYPOGRAPHY_CONSTANTS.FONT_FAMILIES.SANS,
  serif: TYPOGRAPHY_CONSTANTS.FONT_FAMILIES.SERIF,
  mono: TYPOGRAPHY_CONSTANTS.FONT_FAMILIES.MONO,
  display: TYPOGRAPHY_CONSTANTS.FONT_FAMILIES.DISPLAY
};

// Font sizes
const fontSizeConfig = {
  xs: TYPOGRAPHY_CONSTANTS.FONT_SIZES.XS,      // 12px
  sm: TYPOGRAPHY_CONSTANTS.FONT_SIZES.SM,      // 14px
  base: TYPOGRAPHY_CONSTANTS.FONT_SIZES.BASE,  // 16px
  lg: TYPOGRAPHY_CONSTANTS.FONT_SIZES.LG,      // 18px
  xl: TYPOGRAPHY_CONSTANTS.FONT_SIZES.XL,      // 20px
  xxl: TYPOGRAPHY_CONSTANTS.FONT_SIZES.XXL,    // 24px
  xxxl: TYPOGRAPHY_CONSTANTS.FONT_SIZES.XXXL,  // 30px
  display: TYPOGRAPHY_CONSTANTS.FONT_SIZES.DISPLAY // 48px
};

// Font weights
const fontWeightConfig = {
  light: TYPOGRAPHY_CONSTANTS.FONT_WEIGHTS.LIGHT,       // 300
  normal: TYPOGRAPHY_CONSTANTS.FONT_WEIGHTS.NORMAL,     // 400
  medium: TYPOGRAPHY_CONSTANTS.FONT_WEIGHTS.MEDIUM,     // 500
  semibold: TYPOGRAPHY_CONSTANTS.FONT_WEIGHTS.SEMIBOLD, // 600
  bold: TYPOGRAPHY_CONSTANTS.FONT_WEIGHTS.BOLD,         // 700
  extrabold: TYPOGRAPHY_CONSTANTS.FONT_WEIGHTS.EXTRABOLD // 800
};
```

#### Animation Constants
```typescript
// Animation durations
const durationConfig = {
  fast: ANIMATION_CONSTANTS.DURATIONS.FAST,     // 150ms
  normal: ANIMATION_CONSTANTS.DURATIONS.NORMAL, // 300ms
  slow: ANIMATION_CONSTANTS.DURATIONS.SLOW,     // 500ms
  slower: ANIMATION_CONSTANTS.DURATIONS.SLOWER  // 1000ms
};

// Animation easing
const easingConfig = {
  linear: ANIMATION_CONSTANTS.EASING.LINEAR,
  ease: ANIMATION_CONSTANTS.EASING.EASE,
  easeIn: ANIMATION_CONSTANTS.EASING.EASE_IN,
  easeOut: ANIMATION_CONSTANTS.EASING.EASE_OUT,
  easeInOut: ANIMATION_CONSTANTS.EASING.EASE_IN_OUT,
  bounce: ANIMATION_CONSTANTS.EASING.BOUNCE,
  elastic: ANIMATION_CONSTANTS.EASING.ELASTIC
};

// Cursor styles
const cursorConfig = {
  default: ANIMATION_CONSTANTS.CURSOR.DEFAULT,
  pointer: ANIMATION_CONSTANTS.CURSOR.POINTER,
  hand: ANIMATION_CONSTANTS.CURSOR.HAND,
  text: ANIMATION_CONSTANTS.CURSOR.TEXT,
  move: ANIMATION_CONSTANTS.CURSOR.MOVE,
  notAllowed: ANIMATION_CONSTANTS.CURSOR.NOT_ALLOWED,
  wait: ANIMATION_CONSTANTS.CURSOR.WAIT,
  crosshair: ANIMATION_CONSTANTS.CURSOR.CROSSHAIR,
  grab: ANIMATION_CONSTANTS.CURSOR.GRAB,
  grabbing: ANIMATION_CONSTANTS.CURSOR.GRABBING
};
```

#### Device Constants
```typescript
// Device types
const deviceConfig = {
  mobile: DEVICE_CONSTANTS.TYPES.MOBILE,
  tablet: DEVICE_CONSTANTS.TYPES.TABLET,
  desktop: DEVICE_CONSTANTS.TYPES.DESKTOP,
  tv: DEVICE_CONSTANTS.TYPES.TV
};

// Orientations
const orientationConfig = {
  portrait: DEVICE_CONSTANTS.ORIENTATIONS.PORTRAIT,
  landscape: DEVICE_CONSTANTS.ORIENTATIONS.LANDSCAPE
};

// Device capabilities
const capabilityConfig = {
  touch: DEVICE_CONSTANTS.CAPABILITIES.TOUCH,
  mouse: DEVICE_CONSTANTS.CAPABILITIES.MOUSE,
  keyboard: DEVICE_CONSTANTS.CAPABILITIES.KEYBOARD,
  highDpi: DEVICE_CONSTANTS.CAPABILITIES.HIGH_DPI
};
```

#### Performance Constants
```typescript
// Update frequencies
const frequencyConfig = {
  immediate: PERFORMANCE_CONSTANTS.UPDATE_FREQUENCIES.IMMEDIATE,
  debounced: PERFORMANCE_CONSTANTS.UPDATE_FREQUENCIES.DEBOUNCED,
  throttled: PERFORMANCE_CONSTANTS.UPDATE_FREQUENCIES.THROTTLED
};

// Delays
const delayConfig = {
  fast: PERFORMANCE_CONSTANTS.DELAYS.FAST,     // 16ms (60fps)
  normal: PERFORMANCE_CONSTANTS.DELAYS.NORMAL, // 100ms
  slow: PERFORMANCE_CONSTANTS.DELAYS.SLOW      // 300ms
};

// Cache settings
const cacheConfig = {
  size: PERFORMANCE_CONSTANTS.CACHE.SIZE,      // 100
  timeout: PERFORMANCE_CONSTANTS.CACHE.TIMEOUT // 1000ms
};
```

#### GameObject Constants
```typescript
// GameObject types for Phaser objects
const gameObjectConfig = {
  container: GAMEOBJECT_CONSTANTS.TYPES.CONTAINER,
  rectangle: GAMEOBJECT_CONSTANTS.TYPES.RECTANGLE,
  circle: GAMEOBJECT_CONSTANTS.TYPES.CIRCLE,
  sprite: GAMEOBJECT_CONSTANTS.TYPES.SPRITE,
  text: GAMEOBJECT_CONSTANTS.TYPES.TEXT,
  image: GAMEOBJECT_CONSTANTS.TYPES.IMAGE,
  graphics: GAMEOBJECT_CONSTANTS.TYPES.GRAPHICS,
  line: GAMEOBJECT_CONSTANTS.TYPES.LINE,
  arc: GAMEOBJECT_CONSTANTS.TYPES.ARC,
  ellipse: GAMEOBJECT_CONSTANTS.TYPES.ELLIPSE,
  polygon: GAMEOBJECT_CONSTANTS.TYPES.POLYGON,
  custom: GAMEOBJECT_CONSTANTS.TYPES.CUSTOM
};

// GameObject states
const stateConfig = {
  created: GAMEOBJECT_CONSTANTS.STATES.CREATED,
  initialized: GAMEOBJECT_CONSTANTS.STATES.INITIALIZED,
  active: GAMEOBJECT_CONSTANTS.STATES.ACTIVE,
  inactive: GAMEOBJECT_CONSTANTS.STATES.INACTIVE,
  destroyed: GAMEOBJECT_CONSTANTS.STATES.DESTROYED
};
```

#### Theme Constants
```typescript
// Theme types
const themeTypeConfig = {
  light: THEME_CONSTANTS.TYPES.LIGHT,
  dark: THEME_CONSTANTS.TYPES.DARK,
  auto: THEME_CONSTANTS.TYPES.AUTO,
  custom: THEME_CONSTANTS.TYPES.CUSTOM
};

// Theme variants
const themeVariantConfig = {
  default: THEME_CONSTANTS.VARIANTS.DEFAULT,
  primary: THEME_CONSTANTS.VARIANTS.PRIMARY,
  secondary: THEME_CONSTANTS.VARIANTS.SECONDARY,
  success: THEME_CONSTANTS.VARIANTS.SUCCESS,
  warning: THEME_CONSTANTS.VARIANTS.WARNING,
  error: THEME_CONSTANTS.VARIANTS.ERROR,
  info: THEME_CONSTANTS.VARIANTS.INFO
};

// Theme modes
const themeModeConfig = {
  light: THEME_CONSTANTS.MODES.LIGHT,
  dark: THEME_CONSTANTS.MODES.DARK,
  auto: THEME_CONSTANTS.MODES.AUTO
};
```

#### Strategy Constants
```typescript
// Layout strategies
const layoutStrategyConfig = {
  fluid: STRATEGY_CONSTANTS.LAYOUT.FLUID,
  adaptive: STRATEGY_CONSTANTS.LAYOUT.ADAPTIVE,
  fixed: STRATEGY_CONSTANTS.LAYOUT.FIXED,
  hybrid: STRATEGY_CONSTANTS.LAYOUT.HYBRID
};

// Scale strategies
const scaleStrategyConfig = {
  stretch: STRATEGY_CONSTANTS.SCALE.STRETCH,
  fit: STRATEGY_CONSTANTS.SCALE.FIT,
  fill: STRATEGY_CONSTANTS.SCALE.FILL,
  none: STRATEGY_CONSTANTS.SCALE.NONE
};
```

#### Unit Constants
```typescript
// Unit type specifications
const unitTypeConfig = {
  size: UNIT_CONSTANTS.TYPE_SPECS.SIZE,
  position: UNIT_CONSTANTS.TYPE_SPECS.POSITION,
  scale: UNIT_CONSTANTS.TYPE_SPECS.SCALE
};

// Unit dimensions
const unitDimensionConfig = {
  width: UNIT_CONSTANTS.DIMENSIONS.WIDTH,
  height: UNIT_CONSTANTS.DIMENSIONS.HEIGHT,
  depth: UNIT_CONSTANTS.DIMENSIONS.DEPTH
};

// Rounding strategies
const roundingConfig = {
  floor: UNIT_CONSTANTS.ROUNDING.FLOOR,
  ceil: UNIT_CONSTANTS.ROUNDING.CEIL,
  round: UNIT_CONSTANTS.ROUNDING.ROUND
};

// Style composition strategies
const compositionConfig = {
  merge: UNIT_CONSTANTS.COMPOSITION.MERGE,
  override: UNIT_CONSTANTS.COMPOSITION.OVERRIDE,
  extend: UNIT_CONSTANTS.COMPOSITION.EXTEND
};
```

#### Command Pattern Constants
```typescript
// Layout change types
const changeTypeConfig = {
  create: COMMAND_CONSTANTS.CHANGE_TYPES.CREATE,
  update: COMMAND_CONSTANTS.CHANGE_TYPES.UPDATE,
  delete: COMMAND_CONSTANTS.CHANGE_TYPES.DELETE,
  move: COMMAND_CONSTANTS.CHANGE_TYPES.MOVE,
  resize: COMMAND_CONSTANTS.CHANGE_TYPES.RESIZE,
  style: COMMAND_CONSTANTS.CHANGE_TYPES.STYLE
};
```

#### State Pattern Constants
```typescript
// Layout state change types
const stateChangeConfig = {
  stateEnter: STATE_CONSTANTS.CHANGE_TYPES.STATE_ENTER,
  stateExit: STATE_CONSTANTS.CHANGE_TYPES.STATE_EXIT,
  stateUpdate: STATE_CONSTANTS.CHANGE_TYPES.STATE_UPDATE,
  actionHandled: STATE_CONSTANTS.CHANGE_TYPES.ACTION_HANDLED
};

// Layout state types
const stateTypeConfig = {
  idle: STATE_CONSTANTS.STATE_TYPES.IDLE,
  calculating: STATE_CONSTANTS.STATE_TYPES.CALCULATING,
  cached: STATE_CONSTANTS.STATE_TYPES.CACHED,
  error: STATE_CONSTANTS.STATE_TYPES.ERROR,
  validating: STATE_CONSTANTS.STATE_TYPES.VALIDATING,
  transitioning: STATE_CONSTANTS.STATE_TYPES.TRANSITIONING
};
```

#### Chain of Responsibility Constants
```typescript
// Layout chain handler types
const handlerTypeConfig = {
  validation: CHAIN_CONSTANTS.HANDLER_TYPES.VALIDATION,
  unitConversion: CHAIN_CONSTANTS.HANDLER_TYPES.UNIT_CONVERSION,
  responsive: CHAIN_CONSTANTS.HANDLER_TYPES.RESPONSIVE,
  theme: CHAIN_CONSTANTS.HANDLER_TYPES.THEME,
  calculation: CHAIN_CONSTANTS.HANDLER_TYPES.CALCULATION,
  optimization: CHAIN_CONSTANTS.HANDLER_TYPES.OPTIMIZATION,
  caching: CHAIN_CONSTANTS.HANDLER_TYPES.CACHING
};
```

#### Transform Constants
```typescript
// Transform styles
const transformStyleConfig = {
  flat: TRANSFORM_CONSTANTS.STYLES.FLAT,
  preserve3d: TRANSFORM_CONSTANTS.STYLES.PRESERVE_3D
};

// Backface visibility
const backfaceConfig = {
  visible: TRANSFORM_CONSTANTS.BACKFACE_VISIBILITY.VISIBLE,
  hidden: TRANSFORM_CONSTANTS.BACKFACE_VISIBILITY.HIDDEN
};

// Pointer events
const pointerConfig = {
  auto: TRANSFORM_CONSTANTS.POINTER_EVENTS.AUTO,
  none: TRANSFORM_CONSTANTS.POINTER_EVENTS.NONE
};

// User select
const userSelectConfig = {
  auto: TRANSFORM_CONSTANTS.USER_SELECT.AUTO,
  none: TRANSFORM_CONSTANTS.USER_SELECT.NONE,
  text: TRANSFORM_CONSTANTS.USER_SELECT.TEXT,
  all: TRANSFORM_CONSTANTS.USER_SELECT.ALL
};
```

#### Reference Constants
```typescript
// Position reference types
const positionRefConfig = {
  parent: REFERENCE_CONSTANTS.POSITION.PARENT,
  scene: REFERENCE_CONSTANTS.POSITION.SCENE,
  viewport: REFERENCE_CONSTANTS.POSITION.VIEWPORT,
  absolute: REFERENCE_CONSTANTS.POSITION.ABSOLUTE
};

// Size reference types
const sizeRefConfig = {
  parent: REFERENCE_CONSTANTS.SIZE.PARENT,
  scene: REFERENCE_CONSTANTS.SIZE.SCENE,
  viewport: REFERENCE_CONSTANTS.SIZE.VIEWPORT,
  content: REFERENCE_CONSTANTS.SIZE.CONTENT,
  auto: REFERENCE_CONSTANTS.SIZE.AUTO
};

// Background size types
const backgroundSizeConfig = {
  cover: REFERENCE_CONSTANTS.BACKGROUND_SIZE.COVER,
  contain: REFERENCE_CONSTANTS.BACKGROUND_SIZE.CONTAIN,
  auto: REFERENCE_CONSTANTS.BACKGROUND_SIZE.AUTO,
  full: REFERENCE_CONSTANTS.BACKGROUND_SIZE.FULL,
  initial: REFERENCE_CONSTANTS.BACKGROUND_SIZE.INITIAL
};

// CSS unit types
const cssUnitConfig = {
  px: REFERENCE_CONSTANTS.CSS_UNIT.PX,
  em: REFERENCE_CONSTANTS.CSS_UNIT.EM,
  rem: REFERENCE_CONSTANTS.CSS_UNIT.REM,
  percent: REFERENCE_CONSTANTS.CSS_UNIT.PERCENT,
  vw: REFERENCE_CONSTANTS.CSS_UNIT.VW,
  vh: REFERENCE_CONSTANTS.CSS_UNIT.VH
};
```

#### Utility Constants
```typescript
// Common values
const commonValuesConfig = {
  none: UTILITY_CONSTANTS.VALUES.NONE,
  auto: UTILITY_CONSTANTS.VALUES.AUTO,
  initial: UTILITY_CONSTANTS.VALUES.INITIAL,
  inherit: UTILITY_CONSTANTS.VALUES.INHERIT,
  unset: UTILITY_CONSTANTS.VALUES.UNSET
};

// Common numbers
const numberConfig = {
  zero: UTILITY_CONSTANTS.NUMBERS.ZERO,
  one: UTILITY_CONSTANTS.NUMBERS.ONE,
  half: UTILITY_CONSTANTS.NUMBERS.HALF,
  quarter: UTILITY_CONSTANTS.NUMBERS.QUARTER,
  third: UTILITY_CONSTANTS.NUMBERS.THIRD,
  twoThirds: UTILITY_CONSTANTS.NUMBERS.TWO_THIRDS,
  threeQuarters: UTILITY_CONSTANTS.NUMBERS.THREE_QUARTERS
};

// Common percentages
const percentageConfig = {
  zero: UTILITY_CONSTANTS.PERCENTAGES.ZERO,           // '0%'
  quarter: UTILITY_CONSTANTS.PERCENTAGES.QUARTER,     // '25%'
  third: UTILITY_CONSTANTS.PERCENTAGES.THIRD,         // '33.333%'
  half: UTILITY_CONSTANTS.PERCENTAGES.HALF,           // '50%'
  twoThirds: UTILITY_CONSTANTS.PERCENTAGES.TWO_THIRDS, // '66.667%'
  threeQuarters: UTILITY_CONSTANTS.PERCENTAGES.THREE_QUARTERS, // '75%'
  full: UTILITY_CONSTANTS.PERCENTAGES.FULL            // '100%'
};

// Common angles
const angleConfig = {
  zero: UTILITY_CONSTANTS.ANGLES.ZERO,                // '0deg'
  quarter: UTILITY_CONSTANTS.ANGLES.QUARTER,          // '90deg'
  half: UTILITY_CONSTANTS.ANGLES.HALF,                // '180deg'
  threeQuarters: UTILITY_CONSTANTS.ANGLES.THREE_QUARTERS, // '270deg'
  full: UTILITY_CONSTANTS.ANGLES.FULL                 // '360deg'
};
```

---

## Interface Bundles

### Importing Interface Bundles
```typescript
import { 
  // Core interface bundles
  BREAKPOINT_INTERFACES,
  THEME_INTERFACES,
  STYLE_INTERFACES,
  LAYOUT_INTERFACES,
  STRATEGY_INTERFACES,
  MANAGER_INTERFACES,
  
  // Design pattern bundles
  COMMAND_INTERFACES,
  STATE_INTERFACES,
  CHAIN_INTERFACES,
  
  // Complete system bundle
  LAYOUT_SYSTEM_INTERFACES
} from '../interfaces';
```

### Using Interface Bundles
```typescript
// Type checking with interface bundles
function createLayout(config: typeof LAYOUT_INTERFACES.BASE.ILayoutConfig) {
  // Implementation
}

function createTheme(theme: typeof THEME_INTERFACES.BASE.ITheme) {
  // Implementation
}

function createStyle(style: typeof STYLE_INTERFACES.BASE.IStyle) {
  // Implementation
}
```

### Individual Interface Usage
```typescript
import { 
  ILayout,
  ILayoutConfig,
  IResponsiveLayout,
  ITheme,
  IThemeConfig,
  IStyle,
  IStyleConfig,
  ILayoutStrategy,
  ILayoutManager,
  ILayoutCommand,
  ILayoutState,
  ILayoutChainHandler
} from '../interfaces';

// Layout configuration
const layout: ILayoutConfig = {
  id: 'main-layout',
  type: LAYOUT_TYPES.FLEXBOX,
  responsive: true,
  theme: {
    mode: ThemeMode.AUTO
  },
  style: {
    width: SizeUnit.PERCENTAGE,
    height: SizeUnit.PERCENTAGE,
    alignment: HorizontalAlignment.CENTER
  }
};

// Theme configuration
const theme: IThemeConfig = {
  mode: ThemeMode.LIGHT,
  colors: {
    primary: '#007bff',
    secondary: '#6c757d'
  },
  typography: {
    fontSize: 16,
    fontFamily: 'Arial'
  }
};

// Style configuration
const style: IStyleConfig = {
  position: {
    x: PositionUnit.CENTER,
    y: PositionUnit.MIDDLE
  },
  size: {
    width: SizeUnit.PERCENTAGE,
    height: SizeUnit.PIXELS
  },
  alignment: {
    horizontal: HorizontalAlignment.CENTER,
    vertical: VerticalAlignment.MIDDLE
  }
};
```

---

## Best Practices

### 1. Always Use Enums Instead of String Literals
```typescript
// ✅ Good
const config = {
  alignment: HorizontalAlignment.CENTER,
  size: SizeUnit.PERCENTAGE,
  theme: ThemeMode.AUTO
};

// ❌ Bad
const config = {
  alignment: 'center',
  size: 'percentage',
  theme: 'auto'
};
```

### 2. Use Interface Bundles for Type Safety
```typescript
// ✅ Good - Using interface bundles
function createLayout<T extends keyof typeof LAYOUT_INTERFACES.BASE>(
  type: T,
  config: typeof LAYOUT_INTERFACES.BASE[T]
) {
  // Implementation
}

// ❌ Bad - Using any
function createLayout(type: any, config: any) {
  // Implementation
}
```

### 3. Leverage Constants for Configuration
```typescript
// ✅ Good - Using constants
const breakpointConfig = {
  [BREAKPOINTS.MOBILE]: { width: SizeUnit.PERCENTAGE },
  [BREAKPOINTS.DESKTOP]: { width: SizeUnit.PIXELS }
};

// ❌ Bad - Hardcoded values
const breakpointConfig = {
  '768px': { width: 'percentage' },
  '1440px': { width: 'pixels' }
};
```

### 4. Use Performance Enums for Optimization
```typescript
// ✅ Good - Performance-aware configuration
const performanceConfig = {
  complexity: ComplexityLevel.LOW,
  calculationSpeed: CalculationSpeed.FAST,
  memoryUsage: PerformanceLevel.LOW
};

// ❌ Bad - No performance consideration
const config = {
  // No performance settings
};
```

### 5. Proper Error Handling with Validation Enums
```typescript
// ✅ Good - Using validation severity
const validationConfig = {
  errors: ValidationSeverity.ERROR,
  warnings: ValidationSeverity.WARNING,
  suggestions: ValidationSeverity.INFO
};
```

---

## Examples

### Complete Layout Configuration
```typescript
import { 
  ILayoutConfig,
  IThemeConfig,
  IStyleConfig,
  LAYOUT_TYPES,
  PositionUnit,
  SizeUnit,
  HorizontalAlignment,
  VerticalAlignment,
  ThemeMode,
  ComplexityLevel,
  CalculationSpeed
} from '../interfaces';

const completeLayoutConfig: ILayoutConfig = {
  id: 'game-ui-layout',
  type: LAYOUT_TYPES.FLEXBOX,
  responsive: true,
  
  // Theme configuration
  theme: {
    mode: ThemeMode.AUTO,
    colors: {
      primary: '#007bff',
      secondary: '#6c757d',
      background: '#ffffff'
    },
    typography: {
      fontSize: 16,
      fontFamily: 'Arial, sans-serif'
    }
  } as IThemeConfig,
  
  // Style configuration
  style: {
    position: {
      x: PositionUnit.CENTER,
      y: PositionUnit.MIDDLE
    },
    size: {
      width: SizeUnit.PERCENTAGE,
      height: SizeUnit.PERCENTAGE
    },
    alignment: {
      horizontal: HorizontalAlignment.CENTER,
      vertical: VerticalAlignment.MIDDLE
    }
  } as IStyleConfig,
  
  // Performance configuration
  performance: {
    complexity: ComplexityLevel.MEDIUM,
    calculationSpeed: CalculationSpeed.FAST
  },
  
  // Responsive breakpoints
  breakpoints: {
    mobile: {
      width: SizeUnit.PERCENTAGE,
      height: SizeUnit.PIXELS
    },
    desktop: {
      width: SizeUnit.PIXELS,
      height: SizeUnit.PERCENTAGE
    }
  }
};
```

### Strategy Pattern Usage
```typescript
import { 
  ILayoutStrategy,
  IResponsiveStrategy,
  IUnitStrategy,
  PerformanceLevel,
  CalculationSpeed
} from '../interfaces';

const strategyConfig: ILayoutStrategy = {
  name: 'responsive-flexbox',
  type: 'responsive',
  performance: {
    memoryUsage: PerformanceLevel.LOW,
    calculationSpeed: CalculationSpeed.FAST
  },
  responsive: {
    breakpoints: ['mobile', 'tablet', 'desktop'],
    adaptive: true
  } as IResponsiveStrategy,
  unit: {
    conversion: true,
    caching: true
  } as IUnitStrategy
};
```

### Command Pattern Usage
```typescript
import { 
  ILayoutCommand,
  LayoutChangeType,
  ValidationSeverity
} from '../interfaces';

const layoutCommand: ILayoutCommand = {
  id: 'update-button-position',
  name: 'Update Button Position',
  type: LayoutChangeType.MOVE,
  timestamp: Date.now(),
  metadata: {
    description: 'Move button to center position',
    author: 'system'
  },
  validation: {
    severity: ValidationSeverity.INFO,
    message: 'Position update completed'
  }
};
```

---

## Summary

The layout system provides a comprehensive set of enums, constants, and interfaces that ensure:

1. **Type Safety** - All values are strongly typed with enums
2. **Maintainability** - Centralized constants and interfaces
3. **Extensibility** - Modular design with clear separation of concerns
4. **Performance** - Built-in performance optimization options
5. **Responsiveness** - Native support for responsive design
6. **Theming** - Flexible theme system with multiple modes
7. **Validation** - Comprehensive validation and error handling

By following these guidelines and using the provided enums, constants, and interfaces, you can create robust, maintainable, and type-safe layout configurations for your Phaser game objects.
