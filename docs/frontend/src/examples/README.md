# Examples Directory

This directory contains comprehensive examples demonstrating how to use the various systems in the codebase.

## Directory Structure

```
examples/
├── index.ts                           # Main export file for all examples
├── style-properties/                  # Style property examples
│   └── IStyleProperties.examples.ts   # Comprehensive style examples
├── configs/                           # Configuration examples
│   └── example-configs.ts            # IResponsiveConfig examples
├── responsive/                        # Responsive configuration examples
│   └── ResponsiveConfigLoader.examples.ts # ResponsiveConfigLoader usage
├── theme/                             # Theme system examples
│   └── theme-classes-example.ts      # Theme class system examples
├── utils/                             # Utility examples
│   └── example-utils.ts              # Helper classes and utilities
└── README.md                          # This file
```

## Quick Start

```typescript
// Import all examples
import * as Examples from './examples'

// Or import specific examples
import { allStyleExamples } from './examples/style-properties/IStyleProperties.examples'
import { ResponsiveConfigExamples } from './examples/responsive/ResponsiveConfigLoader.examples'
import { StylePropertyBuilder } from './examples/utils/example-utils'
```

## Examples Overview

### 1. Style Properties Examples (`style-properties/`)

Comprehensive examples showing how to use `IStyleProperties` for styling game objects:

- **Text styling** with fonts, shadows, and word wrapping
- **Button styling** with hover effects and animations
- **Card styling** with modern UI design patterns
- **Form elements** with focus states and validation
- **Navigation components** with responsive behavior
- **Progress indicators** and notification badges
- **Responsive text** for different breakpoints

```typescript
import { textStyleExample, buttonStyleExample } from './style-properties/IStyleProperties.examples'

// Use predefined styles
const headerStyle = textStyleExample
const primaryButtonStyle = buttonStyleExample

// Create custom styles
const customStyle = {
  ...textStyleExample,
  backgroundColor: '#ff6b6b',
  fontSize: 24
}
```

### 2. Configuration Examples (`configs/`)

Examples demonstrating the use of `IResponsiveConfig` interface:

- **Button configurations** with positioning and constraints
- **Responsive behavior** setup
- **Layout management** examples

```typescript
import { exampleButtonConfig } from './configs/example-configs'

// Use the button configuration
const buttonConfig = exampleButtonConfig
```

### 3. Responsive Configuration Examples (`responsive/`)

Examples showing how to use `ResponsiveConfigLoader` for dynamic responsive behavior:

- **Custom breakpoints** with flexible naming
- **Product grid layouts** for e-commerce
- **Dashboard layouts** with sidebar navigation
- **Navigation menus** with mobile-first design
- **Form layouts** with adaptive behavior

```typescript
import { ResponsiveConfigExamples } from './responsive/ResponsiveConfigLoader.examples'

// Run demonstration examples
ResponsiveConfigExamples.demonstrateBasicUsage()
ResponsiveConfigExamples.demonstrateProductGrid()
ResponsiveConfigExamples.demonstrateDashboard()
```

### 4. Theme Classes Examples (`theme/`)

Examples demonstrating the CSS-like theme class system:

- **Theme class application** to responsive layouts
- **Custom theme classes** creation
- **Responsive behavior** with theme integration

```typescript
import { ThemeClassesExample } from './theme/theme-classes-example'

// Demonstrate theme class usage
ThemeClassesExample.demonstrateThemeClasses()
ThemeClassesExample.demonstrateResponsiveWithClasses()
```

### 5. Utility Examples (`utils/`)

Helper classes and utilities for common development tasks:

- **StylePropertyBuilder** - Fluent API for building styles
- **BreakpointHelper** - Simplified breakpoint creation
- **ThemeClassManager** - Theme class management
- **StylePropertyValidator** - Style validation
- **StylePropertyMerger** - Style merging utilities
- **StylePropertyCloner** - Deep copying utilities

```typescript
import { StylePropertyBuilder, BreakpointHelper } from './utils/example-utils'

// Build styles fluently
const buttonStyle = new StylePropertyBuilder()
  .position('center', 'bottom')
  .size(200, 50)
  .background('#4CAF50')
  .border('#45a049', 2, 25)
  .text('Roboto, sans-serif', 18, 600, '#ffffff')
  .spacing(12, 8)
  .interactive(true, 'pointer')
  .build()

// Create breakpoints easily
const mobileBreakpoint = BreakpointHelper.mobile()
const tabletBreakpoint = BreakpointHelper.tablet()
const desktopBreakpoint = BreakpointHelper.desktop()
```

## Best Practices

### 1. Style Properties
- Use predefined examples as starting points
- Override specific properties rather than recreating entire styles
- Leverage the fluent builder API for complex styles
- Validate styles before applying them

### 2. Responsive Configuration
- Start with default breakpoints and customize as needed
- Use descriptive breakpoint names (e.g., 'mobile-portrait', 'tablet-landscape')
- Test configurations across different screen sizes
- Validate responsive configurations before deployment

### 3. Theme Classes
- Create reusable theme classes for common UI patterns
- Use semantic class names (e.g., '.header-primary', '.button-secondary')
- Combine theme classes with responsive behavior
- Maintain consistent naming conventions

### 4. Utilities
- Use utility classes for repetitive tasks
- Leverage the builder pattern for complex object creation
- Validate inputs before processing
- Use the merger utilities for combining configurations

## Running Examples

Most examples include demonstration methods that can be called to see the system in action:

```typescript
// Run all demonstrations
ResponsiveConfigExamples.demonstrateBasicUsage()
ResponsiveConfigExamples.demonstrateProductGrid()
ResponsiveConfigExamples.demonstrateDashboard()

ThemeClassesExample.demonstrateThemeClasses()
ThemeClassesExample.demonstrateResponsiveWithClasses()

UtilityExamples.demonstrateStyleBuilder()
UtilityExamples.demonstrateBreakpointHelper()
```

## Contributing

When adding new examples:

1. **Follow the existing structure** and naming conventions
2. **Include comprehensive documentation** with JSDoc comments
3. **Provide demonstration methods** for easy testing
4. **Ensure TypeScript compatibility** and proper type safety
5. **Update this README** with new examples and usage patterns

## Troubleshooting

### Common Issues

1. **Import path errors**: Ensure relative paths are correct for the examples directory structure
2. **Type mismatches**: Check that example properties match the actual interface definitions
3. **Missing dependencies**: Ensure all required modules are properly imported

### Getting Help

- Check the TypeScript compiler output for detailed error messages
- Review the actual interface definitions in the `abstract/configs/` directory
- Use the demonstration methods to test functionality
- Refer to the main codebase for working examples

## Related Documentation

- [IStyleProperties Interface](../abstract/configs/IStyleProperties.ts)
- [ResponsiveConfigLoader](../core/ResponsiveConfigLoader.ts)
- [ThemeConfigLoader](../core/ThemeConfigLoader.ts)
- [Configuration Interfaces](../abstract/configs/index.ts)
