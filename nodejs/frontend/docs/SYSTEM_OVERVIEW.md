# System Overview Documentation

## Architecture Overview

The Phaser Base Game Module follows a modular, configuration-driven architecture with five core systems working together to create responsive, themeable game scenes.

## Core Systems

### 1. Scene System
**Purpose**: Manages scene lifecycle, transitions, and orchestration

**Key Components**:
- `ISceneManager`: Manages scene instances and lifecycle
- `ISceneBuilder`: Builds scenes from configurations
- `ISceneElement`: Represents composable scene elements
- `SceneType`, `SceneState`: Enums for scene types and states
- `SceneTransitionType`: Enum for transition types

**Responsibilities**:
- Scene lifecycle management (create, activate, destroy)
- Scene transitions and animations
- Scene orchestration and coordination
- Scene element composition and management
- Scene state tracking and validation

### 2. Asset System
**Purpose**: Manages loading, caching, and validation of game assets

**Key Components**:
- `AssetLoaderConfigLoader`: Manages asset loading configurations
- `AssetType`: Enum for different asset types (IMAGE, AUDIO, SPRITE, FONT)
- `AssetConfig`: Interface for individual asset definitions
- Asset validation and fallback mechanisms

**Responsibilities**:
- Asset preloading and priority management
- Device-specific asset selection (desktop/mobile)
- Asset validation and error handling
- Memory management and caching

### 3. Game Object System
**Purpose**: Handles creation and management of game objects using factory pattern

**Key Components**:
- `GameObjectFactoryManager`: Central factory for object creation
- `GameObjectType`: Enum for different object types
- `GameObjectConfig`: Interface for object configuration
- Factory classes for specific object types (Container, Image, Text, etc.)

**Responsibilities**:
- Object creation using factory pattern
- Object hierarchy management (parent-child relationships)
- Object property application
- Object lifecycle management

### 4. Layout System
**Purpose**: Manages responsive design and positioning of game objects

**Key Components**:
- `ResponsiveConfigLoader`: Manages responsive configurations
- `BreakpointCondition`: Interface for breakpoint definitions
- `ObjectLayout`: Interface for object-specific layouts
- `IStyleProperties`: Interface for styling properties

**Responsibilities**:
- Responsive breakpoint management
- Dynamic layout calculation
- Screen size adaptation
- Positioning and sizing calculations

### 5. Unit System
**Purpose**: Provides measurement and calculation capabilities

**Key Components**:
- `UnitCalculatorFactory`: Factory for unit calculations
- `PositionUnitCalculator`: Handles position calculations
- `SizeUnitCalculator`: Handles size calculations
- `ScaleUnitCalculator`: Handles scale calculations
- Various unit enums and interfaces

**Responsibilities**:
- Unit conversion and calculation
- Responsive unit strategies
- Measurement consistency
- Calculation validation

## Configuration Architecture

### Configuration Loaders
Each system has its own configuration loader that follows the singleton pattern:

1. **SceneLoaderConfigLoader**: Manages scene structure configurations
2. **AssetLoaderConfigLoader**: Manages asset loading configurations
3. **ResponsiveConfigLoader**: Manages responsive layout configurations
4. **ThemeConfigLoader**: Manages theme styling configurations
5. **LoggingConfigLoader**: Manages logging configurations

### ConfigManager
The `ConfigManager` acts as a central coordinator that:
- Registers all configurations for a scene
- Loads configurations when needed
- Provides a unified interface to all loaders
- Handles configuration validation

## Scene Creation Process

### 1. Scene Class Structure
```typescript
export class MyScene extends BaseScene {
  constructor() {
    super('MyScene');
  }
  
  protected registerSceneConfigs(): void {
    // Register all scene configurations
  }
  
  protected getSceneName(): string {
    return 'myScene';
  }
}
```

### 2. Configuration Files
Each scene has multiple configuration files:
- `scene_loader.config.ts`: Scene structure and game objects
- `asset_loader.config.ts`: Asset loading strategy
- `responsive.config.ts`: Responsive layout behavior
- `theme.config.ts`: Theme styling and colors
- `logging.config.ts`: Logging configuration

### 3. BaseScene Integration
The `BaseScene` class provides:
- Configuration management integration
- Factory manager integration
- Responsive behavior handling
- Theme application
- Common lifecycle methods

## Data Flow

### Configuration Flow
1. Scene class registers configurations with ConfigManager
2. ConfigManager distributes configs to appropriate loaders
3. Loaders store and validate configurations
4. Scene requests configurations when needed

### Object Creation Flow
1. Scene loads scene configuration
2. Factory manager creates objects based on configuration
3. Objects are added to scene hierarchy
4. Responsive layout is applied
5. Theme styling is applied

### Responsive Flow
1. Screen size changes detected
2. Current breakpoint calculated
3. Responsive configuration loaded
4. Layout properties applied to objects
5. Theme classes applied to styling

## Integration Points

### Scene System ↔ All Systems
- Scene system orchestrates all other systems during scene creation
- Scene elements integrate game objects, layout, and unit systems
- Scene transitions coordinate asset loading and object management
- Scene lifecycle manages the entire creation and destruction process

### Asset System ↔ Game Object System
- Game objects reference assets by key
- Asset loading ensures objects have required resources
- Asset validation prevents missing resource errors

### Game Object System ↔ Layout System
- Layout system positions and sizes game objects
- Game objects provide structure for layout calculations
- Responsive behavior adapts object properties

### Layout System ↔ Unit System
- Unit system provides measurement calculations
- Layout system uses units for positioning and sizing
- Responsive units adapt to different screen sizes

### Theme System ↔ All Systems
- Theme provides consistent styling across all systems
- Theme classes can be applied to any system component
- Theme colors and properties are used throughout

## Benefits

### 1. Modularity
- Each system has clear responsibilities
- Systems can be developed and tested independently
- Easy to add new systems or modify existing ones

### 2. Configuration-Driven
- Scenes defined by configuration, not code
- Easy to modify scenes without code changes
- Configuration can be loaded from external sources

### 3. Responsive Design
- Built-in support for different screen sizes
- Automatic adaptation to device capabilities
- Consistent behavior across devices

### 4. Theme Support
- Centralized styling management
- Easy theme switching
- Consistent visual design

### 5. Type Safety
- Full TypeScript support
- Compile-time error checking
- IntelliSense support for configurations

### 6. Factory Pattern
- Flexible object creation
- Easy to add new object types
- Consistent object initialization

## File Organization

```
src/
├── core/                           # Core configuration loaders
│   ├── ConfigManager.ts           # Central configuration coordinator
│   ├── SceneLoaderConfigLoader.ts # Scene structure management
│   ├── AssetLoaderConfigLoader.ts # Asset loading management
│   ├── ResponsiveConfigLoader.ts  # Responsive layout management
│   ├── ThemeConfigLoader.ts       # Theme styling management
│   └── LoggingConfigLoader.ts     # Logging configuration
├── abstract/base/                 # Base classes
│   └── BaseScene.ts              # Base scene implementation
├── factory/                       # Game object factories
│   ├── GameObjectFactoryManager.ts
│   ├── ContainerFactory.ts
│   ├── ImageFactory.ts
│   └── ...
├── asset/                         # Asset system
│   ├── enums/
│   ├── interfaces/
│   └── ...
├── game-object/                   # Game object system
│   ├── enums/
│   ├── interfaces/
│   └── ...
├── layout/                        # Layout system
│   ├── enums/
│   ├── interfaces/
│   └── ...
├── scene/                         # Scene system
│   ├── enums/
│   ├── interfaces/
│   └── ...
├── unit/                          # Unit system
│   ├── enums/
│   ├── interfaces/
│   └── ...
└── runtime/scene/                 # Scene configurations
    └── levis2025r3wheel/
        ├── levis2025r3wheel.scene_loader.config.ts
        ├── levis2025r3wheel.asset_loader.config.ts
        ├── levis2025r3wheel.responsive.config.ts
        ├── levis2025r3wheel.autumn_theme.config.ts
        └── levis2025r3wheel.logging.config.ts
```

## Usage Patterns

### Creating a New Scene
1. Create scene class extending BaseScene
2. Create configuration files for the scene
3. Register configurations in registerSceneConfigs()
4. Implement getSceneName() method

### Adding New Object Types
1. Create factory class for the object type
2. Add object type to GameObjectType enum
3. Register factory with GameObjectFactoryManager
4. Update GameObjectConfig interface if needed

### Adding New Responsive Breakpoints
1. Add breakpoint to responsive configuration
2. Define layout properties for the breakpoint
3. Update breakpoint detection logic if needed

### Creating New Themes
1. Create theme configuration file
2. Define color palette and styling
3. Create theme classes for reusable styling
4. Register theme with ThemeConfigLoader

This architecture provides a robust, scalable foundation for creating complex, responsive game scenes with minimal code and maximum configurability.
