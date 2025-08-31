# Configuration Interfaces for Responsive Layout

This directory contains the configuration interfaces that provide a comprehensive system for managing responsive layouts in Phaser games, inspired by HTML/CSS, WinForms, and WPF layout systems.

## Configuration Hierarchy

The configuration system follows a hierarchical structure that builds upon each level:

```
IConfiguration (Base)
    ↓
IPositionConfig (Level 1 - Positioning)
    ↓
ILayoutConfig (Level 2 - Layout Management)
    ↓
IResponsiveConfig (Level 3 - Responsive Behavior)
```

### Level 1: IPositionConfig
- **Purpose**: Basic positioning and sizing of game objects
- **Features**: 
  - Absolute/relative positioning
  - Size constraints and margins
  - Transform properties (scale, rotation, skew)
  - Anchor points and alignment
  - Basic responsive positioning rules

### Level 2: ILayoutConfig
- **Purpose**: Layout management and container behavior
- **Features**:
  - Multiple layout types (flexbox, grid, stack, dock, flow)
  - Child management and container constraints
  - Layout calculation methods
  - Responsive layout rules
  - Event system for layout changes

### Level 3: IResponsiveConfig
- **Purpose**: Comprehensive responsive design capabilities
- **Features**:
  - Breakpoint management
  - Device type detection
  - Orientation handling
  - Performance optimization
  - Content adaptation strategies
  - Testing and debugging tools

## Key Features

### 🎯 **Multi-Layout Support**
- **Flexbox**: CSS Flexbox-inspired layout system
- **Grid**: CSS Grid-inspired layout system
- **Stack**: Simple stacking layouts (horizontal/vertical)
- **Dock**: WPF DockPanel-inspired docking system
- **Flow**: Text-like flow layouts
- **Absolute**: Traditional absolute positioning

### 📱 **Responsive Design**
- **Breakpoint System**: Standard and custom breakpoints
- **Mobile-First Approach**: Progressive enhancement strategy
- **Device Detection**: Automatic device type and capability detection
- **Orientation Handling**: Portrait/landscape specific configurations
- **Performance Optimization**: Layout caching and rendering optimization

### 🔧 **Advanced Capabilities**
- **Layout Caching**: Performance optimization through layout caching
- **Event System**: Comprehensive event handling for layout changes
- **Utility Methods**: Helper functions for responsive calculations
- **Debug Tools**: Built-in testing and debugging capabilities
- **Content Adaptation**: Automatic content scaling and adaptation

## Usage Examples

### Basic Button Configuration

```typescript
import { IResponsiveConfig } from './index'

const buttonConfig: IResponsiveConfig = {
  // Basic configuration
  id: 'primary-button',
  name: 'Primary Button',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: { componentType: 'button' },
  
  // Position configuration
  positionMode: 'relative',
  x: 0, y: 0,
  size: { width: 120, height: 40 },
  
  // Layout configuration
  layoutType: 'none',
  layoutDirection: 'horizontal',
  
  // Responsive configuration
  breakpoints: {
    xs: 320, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400
  },
  responsiveBehavior: {
    enabled: true,
    mode: 'mobile-first'
  }
}
```

### Container with Flexbox Layout

```typescript
const containerConfig: Partial<IResponsiveConfig> = {
  layoutType: 'flexbox',
  layoutDirection: 'vertical',
  layoutAlignment: {
    mainAxis: 'start',
    crossAxis: 'stretch'
  },
  flexbox: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto'
  },
  container: {
    isContainer: true,
    containerType: 'flex',
    constraints: {
      maxChildren: 10,
      autoSize: true
    }
  },
  spacing: {
    gap: 16,
    margin: 16,
    padding: 24
  }
}
```

### Responsive Grid Layout

```typescript
const gridConfig: Partial<IResponsiveConfig> = {
  layoutType: 'grid',
  grid: {
    gridColumnStart: 1,
    gridColumnEnd: 'span 2',
    gridRowStart: 1,
    gridRowEnd: 'span 2'
  },
  responsiveLayout: {
    breakpoints: {
      mobile: { 
        grid: { gridColumnEnd: 'span 1', gridRowEnd: 'span 1' }
      },
      desktop: { 
        grid: { gridColumnEnd: 'span 2', gridRowEnd: 'span 2' }
      }
    }
  }
}
```

## Utility Functions

### Creating Configurations Dynamically

```typescript
import { createResponsiveConfig } from './example-configs'

const config = createResponsiveConfig(
  basePositionConfig,
  layoutConfig,
  responsiveConfig
)
```

### Responsive Utilities

```typescript
// Convert pixels to viewport units
const vw = config.responsiveUtilities.pxToVw(100) // 5.2vw on 1920px screen

// Get responsive value based on breakpoint
const size = config.responsiveUtilities.getResponsiveValue(
  { mobile: 100, tablet: 120, desktop: 140 },
  120 // default
)

// Create CSS media query
const mediaQuery = config.responsiveUtilities.createMediaQuery('768px')
// Result: "@media (min-width: 768px)"
```

## Best Practices

### 1. **Configuration Structure**
- Use the hierarchy: `IPositionConfig` → `ILayoutConfig` → `IResponsiveConfig`
- Start with basic positioning, then add layout, then responsive features
- Keep configurations focused and single-purpose

### 2. **Responsive Design**
- Use mobile-first approach for better performance
- Define clear breakpoints and test across devices
- Use fluid layouts where possible for smooth scaling
- Implement graceful degradation for older devices

### 3. **Performance**
- Enable layout caching for complex layouts
- Use appropriate update frequencies (debounced vs immediate)
- Monitor performance metrics and optimize accordingly
- Implement efficient child management

### 4. **Testing**
- Use built-in testing tools for responsive behavior
- Test across different device types and orientations
- Validate configurations before deployment
- Monitor performance in production

## Integration with Phaser

### Scene Integration

```typescript
import { IResponsiveConfig } from '../abstract/configs'

export class GameScene extends Phaser.Scene {
  private responsiveConfig: IResponsiveConfig
  
  create() {
    // Apply responsive configuration
    this.applyResponsiveConfig(this.responsiveConfig)
    
    // Listen for responsive changes
    this.responsiveConfig.responsiveEvents.onBreakpointChanged.push(
      (oldBreakpoint, newBreakpoint) => {
        this.handleBreakpointChange(newBreakpoint)
      }
    )
  }
  
  private applyResponsiveConfig(config: IResponsiveConfig) {
    // Apply configuration to game objects
    const currentConfig = config.responsiveMethods.getCurrentResponsiveConfig()
    // ... apply to Phaser objects
  }
}
```

### Object Management

```typescript
class ResponsiveGameObject {
  private config: IResponsiveConfig
  
  constructor(config: IResponsiveConfig) {
    this.config = config
    this.setupResponsiveBehavior()
  }
  
  private setupResponsiveBehavior() {
    // Listen for viewport changes
    window.addEventListener('resize', () => {
      this.config.responsiveMethods.updateResponsiveConfig()
    })
    
    // Apply responsive updates
    this.config.responsiveEvents.onResponsiveConfigUpdated.push(() => {
      this.updateLayout()
    })
  }
  
  private updateLayout() {
    const currentConfig = this.config.responsiveMethods.getCurrentResponsiveConfig()
    // Update Phaser object properties based on configuration
  }
}
```

## Future Enhancements

### Planned Features
- **Animation Integration**: Smooth transitions between responsive states
- **Advanced Grid System**: CSS Grid-like features with named areas
- **Layout Templates**: Pre-built layout configurations for common patterns
- **Performance Profiling**: Advanced performance monitoring and optimization
- **Accessibility**: Built-in accessibility features and compliance tools

### Extension Points
- **Custom Layout Types**: Plugin system for custom layout engines
- **Advanced Breakpoints**: Dynamic breakpoint generation based on content
- **Machine Learning**: AI-powered layout optimization
- **Real-time Collaboration**: Multi-user layout editing capabilities

## Contributing

When contributing to the configuration system:

1. **Follow the Hierarchy**: Ensure new features respect the configuration levels
2. **Maintain Compatibility**: Don't break existing configurations
3. **Add Examples**: Include practical examples for new features
4. **Update Documentation**: Keep this README and examples current
5. **Test Thoroughly**: Test across different devices and scenarios

## Support

For questions or issues with the configuration system:

1. Check the examples in `example-configs.ts`
2. Review the interface definitions for available properties
3. Use the built-in validation and testing tools
4. Consult the main project documentation
5. Open an issue with specific details about your use case
