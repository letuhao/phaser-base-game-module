# Layout System Granular Interfaces Guide

## Overview
This document provides a comprehensive guide to the granular interfaces in the Layout System. These interfaces follow the Interface Segregation Principle (ISP) by breaking down large interfaces into smaller, more focused ones, improving maintainability and type safety.

## Table of Contents
1. [Interface Segregation Benefits](#interface-segregation-benefits)
2. [Granular Interface Categories](#granular-interface-categories)
3. [Usage Examples](#usage-examples)
4. [Best Practices](#best-practices)
5. [Integration with Main Interfaces](#integration-with-main-interfaces)

---

## Interface Segregation Benefits

### 1. **Single Responsibility**
Each interface has a single, well-defined purpose:
- `IPositionStyle` - Only handles positioning
- `ISizeStyle` - Only handles sizing
- `IAlignmentStyle` - Only handles alignment

### 2. **Better Type Safety**
More specific types prevent invalid combinations:
```typescript
// ✅ Good - Specific interface
function setPosition(style: IPositionStyle): void {
  // Only position-related properties available
}

// ❌ Bad - Large interface with unrelated properties
function setPosition(style: IStyle): void {
  // Access to all style properties, even unrelated ones
}
```

### 3. **Easier Testing**
Smaller interfaces are easier to mock and test:
```typescript
// Easy to create test doubles
const mockPositionStyle: IPositionStyle = {
  positionX: PositionUnit.CENTER,
  positionY: PositionUnit.MIDDLE
};
```

### 4. **Improved Maintainability**
Changes to one aspect don't affect others:
- Adding new position properties doesn't affect size interfaces
- Modifying alignment logic doesn't impact background styles

---

## Granular Interface Categories

### 1. **Position and Layout Interfaces**

#### `IPositionStyle`
Handles element positioning:
```typescript
interface IPositionStyle {
  /** X position */
  positionX?: PositionValue;
  /** Y position */
  positionY?: PositionValue;
  /** Z position (depth) */
  positionZ?: PositionValue;
  /** Position reference */
  positionReference?: PositionReference;
}
```

#### `ISizeStyle`
Handles element sizing:
```typescript
interface ISizeStyle {
  /** Width */
  width?: SizeValue;
  /** Height */
  height?: SizeValue;
  /** Depth */
  depth?: SizeValue;
  /** Size reference */
  sizeReference?: SizeReference;
  /** Minimum width */
  minWidth?: SizeValue;
  /** Maximum width */
  maxWidth?: SizeValue;
  /** Minimum height */
  minHeight?: SizeValue;
  /** Maximum height */
  maxHeight?: SizeValue;
}
```

#### `IAlignmentStyle`
Handles element alignment:
```typescript
interface IAlignmentStyle {
  /** Horizontal alignment */
  horizontal?: HorizontalAlignmentValue;
  /** Vertical alignment */
  vertical?: VerticalAlignmentValue;
  /** Alignment self */
  self?: AlignmentSelf;
  /** Alignment reference */
  reference?: AlignmentReference;
}
```

### 2. **Visual Style Interfaces**

#### `IBackgroundStyle`
Handles background properties:
```typescript
interface IBackgroundStyle {
  /** Background color */
  color?: string;
  /** Background image */
  image?: string;
  /** Background size */
  size?: BackgroundSize;
  /** Background position */
  position?: BackgroundPosition;
  /** Background attachment */
  attachment?: BackgroundAttachment;
  /** Background repeat */
  repeat?: BackgroundRepeat;
  /** Background clip */
  clip?: BackgroundClip;
}
```

#### `IBorderStyle`
Handles border properties:
```typescript
interface IBorderStyle {
  /** Border width */
  width?: number;
  /** Border style */
  style?: BorderStyleValue;
  /** Border color */
  color?: string;
  /** Border radius */
  radius?: number;
  /** Border image source */
  imageSource?: string;
  /** Border image repeat */
  imageRepeat?: BorderImageRepeat;
}
```

#### `ITextStyle`
Handles text properties:
```typescript
interface ITextStyle {
  /** Font family */
  fontFamily?: string;
  /** Font size */
  fontSize?: number;
  /** Font weight */
  fontWeight?: number;
  /** Font style */
  fontStyle?: FontStyle;
  /** Text color */
  color?: string;
  /** Text alignment */
  textAlign?: HorizontalAlignmentValue;
  /** Text decoration */
  textDecoration?: TextDecorationValue;
  /** Text transform */
  textTransform?: TextTransform;
  /** Text overflow */
  textOverflow?: TextOverflow;
  /** White space */
  whiteSpace?: WhiteSpace;
}
```

### 3. **Animation and Interaction Interfaces**

#### `IAnimationStyle`
Handles animation properties:
```typescript
interface IAnimationStyle {
  /** Animation duration */
  duration?: number;
  /** Animation delay */
  delay?: number;
  /** Animation direction */
  direction?: AnimationDirectionValue;
  /** Animation fill mode */
  fillMode?: AnimationFillModeValue;
  /** Animation iteration count */
  iterationCount?: AnimationIterationCount;
  /** Animation play state */
  playState?: AnimationPlayState;
  /** Animation timing function */
  timingFunction?: string;
}
```

#### `ITransformStyle`
Handles transform properties:
```typescript
interface ITransformStyle {
  /** Transform style */
  transformStyle?: TransformStyle;
  /** Backface visibility */
  backfaceVisibility?: BackfaceVisibility;
  /** Transform origin */
  transformOrigin?: string;
  /** Transform */
  transform?: string;
}
```

#### `IInteractionStyle`
Handles interaction properties:
```typescript
interface IInteractionStyle {
  /** Pointer events */
  pointerEvents?: PointerEvents;
  /** User select */
  userSelect?: UserSelect;
  /** Cursor */
  cursor?: string;
  /** Touch action */
  touchAction?: string;
}
```

### 4. **Layout and Display Interfaces**

#### `IDisplayStyle`
Handles display properties:
```typescript
interface IDisplayStyle {
  /** Display type */
  display?: DisplayType;
  /** Overflow */
  overflow?: OverflowType;
  /** Visibility */
  visibility?: Visibility;
  /** Opacity */
  opacity?: number;
  /** Z-index */
  zIndex?: number;
}
```

#### `ISpacingStyle`
Handles spacing properties:
```typescript
interface ISpacingStyle {
  /** Margin */
  margin?: SpacingValue;
  /** Padding */
  padding?: SpacingValue;
  /** Gap */
  gap?: SpacingValue;
}
```

### 5. **Specialized Interfaces**

#### `IShadowStyle`
Handles shadow properties:
```typescript
interface IShadowStyle {
  /** Shadow filter */
  filter?: ShadowFilter;
  /** Shadow color */
  color?: string;
  /** Shadow offset X */
  offsetX?: number;
  /** Shadow offset Y */
  offsetY?: number;
  /** Shadow blur */
  blur?: number;
  /** Shadow spread */
  spread?: number;
}
```

#### `IGradientStyle`
Handles gradient properties:
```typescript
interface IGradientStyle {
  /** Gradient type */
  type?: GradientType;
  /** Gradient colors */
  colors?: string[];
  /** Gradient stops */
  stops?: number[];
  /** Gradient angle */
  angle?: number;
  /** Gradient center */
  center?: string;
}
```

---

## Usage Examples

### 1. **Composing Styles**
```typescript
// Compose multiple granular interfaces
interface IButtonStyle extends 
  IPositionStyle, 
  ISizeStyle, 
  IAlignmentStyle, 
  IBackgroundStyle, 
  IBorderStyle, 
  ITextStyle, 
  IInteractionStyle {
  // Button-specific properties
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
}

// Usage
const buttonStyle: IButtonStyle = {
  // Position
  positionX: PositionUnit.CENTER,
  positionY: PositionUnit.MIDDLE,
  
  // Size
  width: SizeUnit.PIXELS,
  height: SizeUnit.PIXELS,
  
  // Alignment
  horizontal: HorizontalAlignmentValue.CENTER,
  vertical: VerticalAlignmentValue.MIDDLE,
  
  // Background
  color: '#007bff',
  
  // Border
  width: 1,
  style: BorderStyleValue.SOLID,
  color: '#007bff',
  radius: 4,
  
  // Text
  fontFamily: 'Arial, sans-serif',
  fontSize: 14,
  color: '#ffffff',
  textAlign: HorizontalAlignmentValue.CENTER,
  
  // Interaction
  cursor: 'pointer',
  pointerEvents: PointerEvents.AUTO
};
```

### 2. **Selective Style Application**
```typescript
// Apply only position styles
function applyPosition(element: HTMLElement, style: IPositionStyle): void {
  if (style.positionX !== undefined) {
    element.style.left = style.positionX.toString();
  }
  if (style.positionY !== undefined) {
    element.style.top = style.positionY.toString();
  }
}

// Apply only size styles
function applySize(element: HTMLElement, style: ISizeStyle): void {
  if (style.width !== undefined) {
    element.style.width = style.width.toString();
  }
  if (style.height !== undefined) {
    element.style.height = style.height.toString();
  }
}
```

### 3. **Style Validation**
```typescript
// Validate specific style categories
function validatePositionStyle(style: IPositionStyle): ValidationResult {
  const errors: string[] = [];
  
  if (style.positionX !== undefined && style.positionX < 0) {
    errors.push('Position X cannot be negative');
  }
  
  if (style.positionY !== undefined && style.positionY < 0) {
    errors.push('Position Y cannot be negative');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
```

### 4. **Style Inheritance**
```typescript
// Create base styles using granular interfaces
interface IBaseContainerStyle extends 
  IPositionStyle, 
  ISizeStyle, 
  IDisplayStyle {
  // Base container properties
}

interface IThemedContainerStyle extends IBaseContainerStyle {
  // Theme-specific properties
  theme?: 'light' | 'dark';
  variant?: 'primary' | 'secondary';
}

// Usage
const lightContainer: IThemedContainerStyle = {
  // Inherited from IBaseContainerStyle
  positionX: PositionUnit.CENTER,
  width: SizeUnit.PERCENTAGE,
  display: DisplayType.BLOCK,
  
  // Theme-specific
  theme: 'light',
  variant: 'primary'
};
```

---

## Best Practices

### 1. **Use Specific Interfaces**
```typescript
// ✅ Good - Use specific interface
function updatePosition(style: IPositionStyle): void {
  // Only position-related operations
}

// ❌ Bad - Use generic interface
function updatePosition(style: IStyle): void {
  // Access to all style properties
}
```

### 2. **Compose Interfaces for Complex Styles**
```typescript
// ✅ Good - Compose specific interfaces
interface IComplexStyle extends 
  IPositionStyle, 
  ISizeStyle, 
  IBackgroundStyle, 
  IBorderStyle {
  // Complex style with specific concerns
}

// ❌ Bad - Single large interface
interface IComplexStyle {
  // All properties mixed together
  positionX?: PositionValue;
  width?: SizeValue;
  backgroundColor?: string;
  borderWidth?: number;
  // ... many more properties
}
```

### 3. **Validate at Interface Level**
```typescript
// ✅ Good - Validate specific interfaces
function validateStyle<T extends IPositionStyle>(style: T): ValidationResult {
  // Validate only position-related properties
  return validatePositionStyle(style);
}

// ❌ Bad - Validate all properties
function validateStyle(style: IStyle): ValidationResult {
  // Validate all properties, even unrelated ones
}
```

### 4. **Use Interface Segregation for Testing**
```typescript
// ✅ Good - Mock specific interfaces
const mockPositionStyle: IPositionStyle = {
  positionX: PositionUnit.CENTER,
  positionY: PositionUnit.MIDDLE
};

// ❌ Bad - Mock large interface
const mockStyle: IStyle = {
  // Need to provide all properties
  positionX: PositionUnit.CENTER,
  positionY: PositionUnit.MIDDLE,
  width: SizeUnit.PIXELS,
  height: SizeUnit.PIXELS,
  // ... many more properties
};
```

---

## Integration with Main Interfaces

### 1. **Main Interface Composition**
```typescript
// Main style interface composes granular interfaces
interface IStyle extends 
  IPositionStyle,
  ISizeStyle,
  IAlignmentStyle,
  IBackgroundStyle,
  IBorderStyle,
  ITextStyle,
  IAnimationStyle,
  ITransformStyle,
  IInteractionStyle,
  IDisplayStyle,
  ISpacingStyle,
  IShadowStyle,
  IGradientStyle {
  // Additional style properties
  id?: string;
  className?: string;
  customProperties?: Record<string, any>;
}
```

### 2. **Selective Style Application**
```typescript
// Apply styles selectively based on interface type
function applyStyle(element: HTMLElement, style: Partial<IStyle>): void {
  // Apply position styles
  if (isPositionStyle(style)) {
    applyPositionStyle(element, style);
  }
  
  // Apply size styles
  if (isSizeStyle(style)) {
    applySizeStyle(element, style);
  }
  
  // Apply background styles
  if (isBackgroundStyle(style)) {
    applyBackgroundStyle(element, style);
  }
  
  // ... apply other style categories
}

// Type guards for interface checking
function isPositionStyle(style: any): style is IPositionStyle {
  return 'positionX' in style || 'positionY' in style;
}

function isSizeStyle(style: any): style is ISizeStyle {
  return 'width' in style || 'height' in style;
}

function isBackgroundStyle(style: any): style is IBackgroundStyle {
  return 'color' in style || 'image' in style;
}
```

### 3. **Style Factory Pattern**
```typescript
// Factory for creating specific style types
class StyleFactory {
  static createPositionStyle(config: Partial<IPositionStyle>): IPositionStyle {
    return {
      positionX: config.positionX ?? PositionUnit.CENTER,
      positionY: config.positionY ?? PositionUnit.MIDDLE,
      positionZ: config.positionZ ?? PositionUnit.ZERO,
      positionReference: config.positionReference ?? PositionReference.PARENT
    };
  }
  
  static createSizeStyle(config: Partial<ISizeStyle>): ISizeStyle {
    return {
      width: config.width ?? SizeUnit.AUTO,
      height: config.height ?? SizeUnit.AUTO,
      depth: config.depth ?? SizeUnit.ZERO,
      sizeReference: config.sizeReference ?? SizeReference.PARENT
    };
  }
  
  static createAlignmentStyle(config: Partial<IAlignmentStyle>): IAlignmentStyle {
    return {
      horizontal: config.horizontal ?? HorizontalAlignmentValue.CENTER,
      vertical: config.vertical ?? VerticalAlignmentValue.MIDDLE,
      self: config.self ?? AlignmentSelf.AUTO,
      reference: config.reference ?? AlignmentReference.PARENT
    };
  }
}
```

---

## Summary

The granular interfaces in the Layout System provide:

1. **Better Type Safety**: More specific types prevent invalid combinations
2. **Improved Maintainability**: Changes to one aspect don't affect others
3. **Easier Testing**: Smaller interfaces are easier to mock and test
4. **Better Performance**: Only load and process needed style properties
5. **Cleaner Code**: Clear separation of concerns and responsibilities

By following the Interface Segregation Principle, the Layout System achieves better code organization, improved type safety, and enhanced maintainability while providing a flexible and extensible foundation for building complex layout configurations.
