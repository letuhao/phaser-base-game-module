# Container Classes

This directory contains concrete container classes that implement the container system for the Phaser game engine. These classes provide HTML-like container functionality with responsive layouts and automatic sizing.

## Overview

The container system is designed to provide a familiar HTML/CSS-like experience for game development, with automatic responsive behavior and layout management. Each container class extends the base `Container` class and implements specific layout logic.

## Available Containers

### 1. Container (Abstract Base Class)

The base container class that provides the foundation for all container types. It implements:
- Basic Phaser container wrapping
- Children management
- Position and size management
- Basic layout functionality

**Key Features:**
- Automatically manages Phaser container properties
- Handles child object addition/removal
- Provides basic layout calculation methods
- Implements IBound and IScalable interfaces

### 2. FlexboxContainer

A concrete container that implements CSS Flexbox layout logic.

**Key Features:**
- Flexbox direction (row/column)
- Justify content alignment
- Align items and content
- Flex grow/shrink properties for children
- Automatic layout calculation

**Usage:**
```typescript
const flexContainer = new FlexboxContainer(scene, 'flexContainer', 0, 0)
flexContainer.setFlexboxProperties({
  direction: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
})
```

### 3. BackgroundContainer

A specialized root container designed for background images with automatic responsive sizing.

**Key Features:**
- Automatic background image loading and management
- Responsive sizing for multiple devices
- Aspect ratio maintenance
- Device orientation handling
- Multiple scaling modes (fit, fill, stretch)
- Automatic resize event handling

**Scaling Modes:**
- `fit`: Fits background within container bounds (maintains aspect ratio)
- `fill`: Fills container while maintaining aspect ratio (may crop)
- `stretch`: Stretches to fill container (may distort)

**Alignment Options:**
- Horizontal: `left`, `center`, `right`
- Vertical: `top`, `center`, `bottom`

**Usage:**
```typescript
const backgroundContainer = new BackgroundContainer(scene, 'mainBackground', 0, 0)
backgroundContainer.setBackgroundImage('background_landscape', {
  maintainAspectRatio: true,
  scalingMode: 'fit',
  alignment: { x: 'center', y: 'center' },
  backgroundColor: '#1a1a2e'
})
```

## Responsive Design

All containers support responsive design through:

1. **Automatic Resizing**: Containers automatically adjust when the game window is resized
2. **Device Detection**: Automatic detection of device characteristics
3. **Orientation Handling**: Support for device orientation changes
4. **Breakpoint Support**: CSS-like breakpoints for different device sizes

## Device Support

The container system is designed to work across multiple devices:

- **Mobile**: Portrait and landscape orientations
- **Tablet**: Various screen sizes and orientations
- **Desktop**: High-resolution displays
- **High DPI**: Automatic texture quality selection

## Layout System

The layout system provides:

1. **Automatic Layout**: Containers automatically calculate and apply layouts
2. **Child Management**: Easy addition, removal, and positioning of child objects
3. **Constraint System**: Size and position constraints for child objects
4. **Layout Events**: Events for layout changes and updates

## Performance Features

- **Lazy Loading**: Background images are loaded only when needed
- **Texture Optimization**: Automatic selection of appropriate texture quality
- **Event Cleanup**: Proper cleanup of event listeners
- **Memory Management**: Efficient memory usage for large numbers of children

## Usage Examples

See `BackgroundContainer-examples.ts` for comprehensive examples showing:
- Basic setup for different device types
- Responsive background switching
- UI overlay positioning
- Performance optimization
- Complete scene setup

## Best Practices

1. **Use BackgroundContainer as Root**: Always use BackgroundContainer as the root container for scenes
2. **Set Appropriate Constraints**: Configure container constraints based on your needs
3. **Handle Cleanup**: Always call cleanup methods when destroying containers
4. **Use Responsive Properties**: Leverage the built-in responsive features
5. **Optimize Textures**: Use appropriate texture resolutions for different devices

## Integration with Phaser

The container system integrates seamlessly with Phaser:

- **Scene Integration**: Containers are created within Phaser scenes
- **Game Object Wrapping**: All containers wrap Phaser game objects
- **Event System**: Uses Phaser's event system for resize and orientation events
- **Texture Management**: Integrates with Phaser's texture system

## Extending the System

To create new container types:

1. Extend the `Container` class
2. Implement required interface methods
3. Override layout methods as needed
4. Add container-specific properties and methods
5. Update the container index exports

## Troubleshooting

Common issues and solutions:

1. **Background not displaying**: Check if texture key exists and is loaded
2. **Layout not updating**: Ensure `invalidateLayout()` is called after property changes
3. **Performance issues**: Check texture quality and number of children
4. **Responsive issues**: Verify event listeners are properly set up

## API Reference

For detailed API documentation, see the individual container class files and their JSDoc comments.
