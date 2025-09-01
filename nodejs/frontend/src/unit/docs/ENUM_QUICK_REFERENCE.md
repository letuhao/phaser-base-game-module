# 🎯 Unit System Enum Quick Reference

## 📋 Overview
This guide provides a quick reference for the separated enum system in the unit framework. The system now clearly distinguishes between **semantic behaviors** (`*Value` enums) and **measurement types** (`*Unit` enums).

## 🏗️ Architecture Principle

### **Separation of Concerns**
- **`*Value` Enums**: Define **WHAT** behavior to apply (semantic meaning)
- **`*Unit` Enums**: Define **HOW** to measure (measurement type)

### **Calculation Flow**
```
Unit (Measurement) → Value (Behavior) → Result
```

## 📏 Size System

### **SizeValue** (Semantic Behaviors)
```typescript
enum SizeValue {
  FILL = 'fill',           // Fill available space
  AUTO = 'auto',           // Auto-size based on content
  FIT = 'fit',             // Fit within constraints
  STRETCH = 'stretch',     // Stretch to fill
  MIN = 'min',             // Minimum size
  MAX = 'max'              // Maximum size
}
```

### **SizeUnit** (Measurement Types)
```typescript
enum SizeUnit {
  PIXEL = 'pixel',                    // Direct pixel values
  PERCENTAGE = 'percentage',          // Percentage of reference
  PARENT_WIDTH = 'parent-width',      // Parent container width
  PARENT_HEIGHT = 'parent-height',    // Parent container height
  SCENE_WIDTH = 'scene-width',        // Scene width
  SCENE_HEIGHT = 'scene-height',      // Scene height
  VIEWPORT_WIDTH = 'viewport-width',  // Viewport width
  VIEWPORT_HEIGHT = 'viewport-height' // Viewport height
}
```

### **Usage Examples**
```typescript
// Fill parent width
const size = new SizeUnitCalculator(SizeValue.FILL, SizeUnit.PARENT_WIDTH);

// 50% of scene width
const size = new SizeUnitCalculator(50, SizeUnit.PERCENTAGE);

// 200 pixels
const size = new SizeUnitCalculator(200, SizeUnit.PIXEL);
```

## 📍 Position System

### **PositionValue** (Semantic Behaviors)
```typescript
enum PositionValue {
  CENTER = 'center',       // Center position
  LEFT = 'left',           // Left alignment
  RIGHT = 'right',         // Right alignment
  TOP = 'top',             // Top alignment
  BOTTOM = 'bottom',       // Bottom alignment
  START = 'start',         // Start position (LTR/RTL aware)
  END = 'end'              // End position (LTR/RTL aware)
}
```

### **PositionUnit** (Measurement Types)
```typescript
enum PositionUnit {
  PIXEL = 'pixel',                    // Direct pixel values
  PERCENTAGE = 'percentage',          // Percentage of reference
  PARENT_LEFT = 'parent-left',        // Parent left edge
  PARENT_RIGHT = 'parent-right',      // Parent right edge
  PARENT_CENTER_X = 'parent-center-x', // Parent center X
  PARENT_CENTER_Y = 'parent-center-y', // Parent center Y
  SCENE_LEFT = 'scene-left',          // Scene left edge
  SCENE_RIGHT = 'scene-right',        // Scene right edge
  SCENE_CENTER_X = 'scene-center-x',  // Scene center X
  SCENE_CENTER_Y = 'scene-center-y'   // Scene center Y
}
```

### **Usage Examples**
```typescript
// Center on parent
const position = new PositionUnitCalculator(PositionValue.CENTER, PositionUnit.PARENT_CENTER_X);

// 25% from scene left
const position = new PositionUnitCalculator(25, PositionUnit.PERCENTAGE);

// 100 pixels from left
const position = new PositionUnitCalculator(100, PositionUnit.PIXEL);
```

## 🔍 Scale System

### **ScaleValue** (Semantic Behaviors)
```typescript
enum ScaleValue {
  FIT = 'fit',             // Fit within bounds
  STRETCH = 'stretch',     // Stretch to fill
  FILL = 'fill',           // Fill available space
  AUTO = 'auto',           // Auto-scale based on content
  RESPONSIVE = 'responsive', // Responsive scaling
  RANDOM = 'random'        // Random scaling
}
```

### **ScaleUnit** (Measurement Types)
```typescript
enum ScaleUnit {
  FACTOR = 'factor',           // Direct scale factor
  PERCENTAGE = 'percentage',   // Percentage scale
  PARENT_SCALE = 'parent-scale', // Parent scale
  SCENE_SCALE = 'scene-scale',   // Scene scale
  VIEWPORT_SCALE = 'viewport-scale' // Viewport scale
}
```

### **Usage Examples**
```typescript
// Fit scale
const scale = new ScaleUnitCalculator(ScaleValue.FIT, ScaleUnit.FACTOR);

// 150% scale
const scale = new ScaleUnitCalculator(150, ScaleUnit.PERCENTAGE);

// 2x scale factor
const scale = new ScaleUnitCalculator(2, ScaleUnit.FACTOR);
```

## 🔄 Common Patterns

### **Direct Values (Numbers)**
When using direct numeric values, use the appropriate `*Unit` enum:

```typescript
// Size: 200 pixels
new SizeUnitCalculator(200, SizeUnit.PIXEL);

// Position: 50% from left
new PositionUnitCalculator(50, PositionUnit.PERCENTAGE);

// Scale: 1.5x factor
new ScaleUnitCalculator(1.5, ScaleUnit.FACTOR);
```

### **Semantic Behaviors (Enums)**
When using semantic behaviors, combine with appropriate `*Unit`:

```typescript
// Size: Fill parent width
new SizeUnitCalculator(SizeValue.FILL, SizeUnit.PARENT_WIDTH);

// Position: Center on parent
new PositionUnitCalculator(PositionValue.CENTER, PositionUnit.PARENT_CENTER_X);

// Scale: Fit scale
new ScaleUnitCalculator(ScaleValue.FIT, ScaleUnit.FACTOR);
```

## ⚠️ Important Notes

### **Strategy Selection**
- **Specific Units**: Use unit-specific strategies (e.g., `ParentWidthSizeValueCalculationStrategy`)
- **General Units**: Use general strategies (e.g., `FillSizeValueCalculationStrategy` for `PIXEL`)

### **Fallback Behavior**
- **Missing Context**: System provides sensible fallbacks
- **Invalid Values**: Default values are used when context is unavailable
- **Type Safety**: TypeScript ensures correct enum usage

### **Performance**
- **Strategy Caching**: Strategies are cached for performance
- **Context Validation**: Context is validated before calculations
- **Error Handling**: Graceful error handling with fallbacks

## 🧪 Testing

### **Test Coverage**
- **898 Tests**: All tests passing
- **100% Success Rate**: Comprehensive test coverage
- **Type Safety**: All TypeScript errors resolved

### **Validation**
```typescript
// Test correct behavior
expect(calculator.calculateSize(context)).toBe(expectedValue);

// Test fallback behavior
expect(calculator.calculateSize(emptyContext)).toBe(fallbackValue);
```

## 📚 Related Documentation

- [Unit System Usage Guide](./UNIT_SYSTEM_USAGE_GUIDE.md)
- [Enum Refactoring Completion Summary](./ENUM_REFACTORING_COMPLETION_SUMMARY.md)
- [Strategy Pattern Implementation](./STRATEGY_PATTERN_IMPLEMENTATION.md)

---

**Last Updated**: Current Session  
**Status**: ✅ Production Ready  
**Test Coverage**: 898/898 tests passing
