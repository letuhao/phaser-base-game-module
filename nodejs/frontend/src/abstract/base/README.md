# Abstract Base Interfaces

This folder contains the foundational interfaces and abstractions for the Phaser game project. These interfaces define the contract that all implementations must follow, ensuring consistency and maintainability across the codebase.

## 🏗️ Architecture Overview

The abstract base interfaces follow a hierarchical structure:

```
IConfiguration (Base)
├── IThemeConfig (UI/Styling)
├── IPositionConfig (Layout/Positioning)
├── IAssetsConfig (Resource Management)
├── ISceneConfig (Scene Management)
└── IGameLogicConfig (Game Mechanics)
```

## 📋 Core Interfaces

### IConfiguration
**Base configuration interface** that all configurations must implement.

**Key Features:**
- Unique identification and versioning
- Validation and serialization
- Metadata support
- Cloning with overrides

**Usage:**
```typescript
import { IConfiguration } from '@/abstract/base'

class MyConfig implements IConfiguration {
  readonly id = 'my-config'
  readonly name = 'My Configuration'
  readonly version = '1.0.0'
  readonly isActive = true
  readonly lastModified = new Date()
  readonly metadata = {}
  
  validate(): string[] { return [] }
  clone(overrides?: Partial<this>): this { /* ... */ }
  toJSON(): string { /* ... */ }
  fromJSON(json: string): this { /* ... */ }
}
```

### IGameObject
**Base interface for all game objects** in the Phaser game.

**Key Features:**
- Phaser integration
- Lifecycle management
- Transform operations
- Interactive capabilities

**Usage:**
```typescript
import { IGameObject } from '@/abstract/base'

class MyGameObject implements IGameObject {
  readonly id = 'my-game-object'
  readonly phaserObject: Phaser.GameObjects.GameObject
  // ... implement all required properties and methods
}
```

## 🎨 Configuration Interfaces

### IThemeConfig
**Theme and styling configuration** inspired by CSS, WinForms, and WPF.

**Features:**
- Color palette management
- Typography system
- Spacing and layout scales
- Responsive breakpoints
- Animation timing

**Usage:**
```typescript
import { IThemeConfig } from '@/abstract/base/configs'

const theme: IThemeConfig = {
  // ... theme configuration
  getColor('primary.main') // Returns color value
  getSpacing('md') // Returns spacing value
}
```

### IPositionConfig
**Position and layout configuration** for game object positioning.

**Features:**
- Multiple positioning modes (absolute, relative, fixed, sticky)
- Anchor point system
- Responsive positioning
- Grid snapping
- Constraint management

**Usage:**
```typescript
import { IPositionConfig } from '@/abstract/base/configs'

const position: IPositionConfig = {
  // ... position configuration
  getActualPosition() // Returns calculated position
  snapToGrid(32) // Snaps to 32px grid
}
```

### IAssetsConfig
**Asset loading and management configuration**.

**Features:**
- Categorized asset loading
- Progressive loading strategies
- CDN and fallback support
- Memory management
- Performance optimization

**Usage:**
```typescript
import { IAssetsConfig } from '@/abstract/base/configs'

const assets: IAssetsConfig = {
  // ... assets configuration
  getAsset('player-sprite') // Returns asset config
  preloadCategory('essential') // Preloads essential assets
}
```

### ISceneConfig
**Scene structure and lifecycle configuration**.

**Features:**
- Scene hierarchy management
- Transition configurations
- UI layout systems
- Performance settings
- Dependency management

**Usage:**
```typescript
import { ISceneConfig } from '@/abstract/base/configs'

const scene: ISceneConfig = {
  // ... scene configuration
  getDependencyTree() // Returns scene dependencies
  isReadyToStart() // Checks if scene can start
}
```

### IGameLogicConfig
**Game mechanics and systems configuration**.

**Features:**
- Difficulty scaling
- Player progression
- Economy systems
- Combat mechanics
- AI behaviors
- Multiplayer settings

**Usage:**
```typescript
import { IGameLogicConfig } from '@/abstract/base/configs'

const gameLogic: IGameLogicConfig = {
  // ... game logic configuration
  getDifficulty('hard') // Returns difficulty config
  isFeatureEnabled('multiplayer') // Checks if feature is enabled
}
```

## 🔧 Implementation Guidelines

### 1. **Always Implement Required Methods**
Every interface method must be implemented, even if it's just a stub.

### 2. **Use Strong Typing**
Leverage TypeScript's type system for compile-time safety.

### 3. **Follow SOLID Principles**
- Single Responsibility: Each interface has one clear purpose
- Open/Closed: Extend through composition, not modification
- Liskov Substitution: Implementations must be substitutable
- Interface Segregation: Keep interfaces focused and cohesive
- Dependency Inversion: Depend on abstractions, not concretions

### 4. **Validation First**
Always implement proper validation in configuration interfaces.

### 5. **Immutable by Default**
Use `readonly` properties to prevent accidental modifications.

## 📚 Usage Examples

### Importing Interfaces
```typescript
// Import specific interfaces
import { IConfiguration, IGameObject } from '@/abstract/base'

// Import configuration interfaces
import { IThemeConfig, IPositionConfig } from '@/abstract/base/configs'

// Import all as namespace
import * as Base from '@/abstract/base'
import * as Configs from '@/abstract/base/configs'
```

### Creating Configuration Classes
```typescript
import { IConfiguration } from '@/abstract/base'

export class ThemeConfiguration implements IConfiguration {
  readonly id = 'theme-config'
  readonly name = 'Default Theme'
  readonly version = '1.0.0'
  readonly isActive = true
  readonly lastModified = new Date()
  readonly metadata = {}
  
  constructor(
    public readonly colors: Record<string, string>,
    public readonly fonts: Record<string, string>
  ) {}
  
  validate(): string[] {
    const errors: string[] = []
    if (!this.colors.primary) errors.push('Primary color is required')
    return errors
  }
  
  clone(overrides?: Partial<ThemeConfiguration>): ThemeConfiguration {
    return new ThemeConfiguration(
      { ...this.colors, ...overrides?.colors },
      { ...this.fonts, ...overrides?.fonts }
    )
  }
  
  toJSON(): string {
    return JSON.stringify(this)
  }
  
  fromJSON(json: string): ThemeConfiguration {
    const data = JSON.parse(json)
    return new ThemeConfiguration(data.colors, data.fonts)
  }
}
```

## 🚀 Extending the System

### Adding New Configuration Types
1. Create a new interface extending `IConfiguration`
2. Add it to the `configs/index.ts` export
3. Document the interface and its usage
4. Create example implementations

### Adding New Base Interfaces
1. Create the interface in the `base/` folder
2. Add it to the `base/index.ts` export
3. Update this README with documentation
4. Create example implementations

## 🔍 Best Practices

1. **Interface Segregation**: Keep interfaces focused and cohesive
2. **Documentation**: Always include JSDoc comments for public methods
3. **Validation**: Implement comprehensive validation logic
4. **Error Handling**: Provide meaningful error messages
5. **Performance**: Consider performance implications of interface methods
6. **Testing**: Create unit tests for all interface implementations

## 📖 Related Documentation

- [Phaser 3 Documentation](https://photonstorm.github.io/phaser3-docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Design Patterns](https://refactoring.guru/design-patterns)
