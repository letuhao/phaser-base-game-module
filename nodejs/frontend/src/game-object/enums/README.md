# Game Object System Enum Management

## Overview
This directory contains a comprehensive, organized enum management system for the Game Object System. All enums are categorized by functionality and properly integrated with the Unit/Layout Systems.

## Directory Structure

```
enums/
├── core/                    # Core game object enums
│   ├── CoreEnums.ts        # GameObjectType, GameObjectState, ComponentType, etc.
│   └── index.ts
├── state/                   # State management enums
│   ├── StateEnums.ts       # AnimationState, EffectState, NetworkState, etc.
│   └── index.ts
├── patterns/                # Design pattern enums
│   ├── PatternEnums.ts     # Factory, Builder, Observer, Strategy, etc.
│   └── index.ts
├── rendering/               # Rendering and visual enums
│   ├── RenderingEnums.ts   # Graphics, Sprite, Text, Lighting, etc.
│   └── index.ts
├── ui/                      # UI component enums
│   ├── UIEnums.ts          # Button, Slider, Tooltip, Input, etc.
│   └── index.ts
├── physics/                 # Physics system enums
│   ├── PhysicsEnums.ts     # PhysicsBodyType, CollisionShape, etc.
│   └── index.ts
├── audio/                   # Audio system enums
│   ├── AudioEnums.ts       # AudioType, AudioState, Effects, etc.
│   └── index.ts
├── network/                 # Network system enums
│   ├── NetworkEnums.ts     # NetworkState, MessageType, Protocol, etc.
│   └── index.ts
├── effects/                 # Effects system enums
│   ├── EffectsEnums.ts     # Particle, Environmental, Animation, etc.
│   └── index.ts
├── performance/             # Performance system enums
│   ├── PerformanceEnums.ts # Metrics, Optimization, Caching, etc.
│   └── index.ts
├── debug/                   # Debug system enums
│   ├── DebugEnums.ts       # DebugLevel, Categories, Profiling, etc.
│   └── index.ts
├── GameObjectEnums.ts      # Legacy enums (deprecated)
├── LayoutSystemImports.ts  # Integration with Layout/Unit Systems
└── index.ts                # Main export file
```

## Enum Categories

### Core Enums (`core/`)
- **GameObjectType**: All game object types (Container, Sprite, Text, etc.)
- **GameObjectState**: Lifecycle states (Creating, Active, Destroyed, etc.)
- **GameObjectProperty**: Object properties (Position, Scale, Animation, etc.)
- **ComponentType**: Component types (Transform, Render, Physics, etc.)
- **ComponentState**: Component lifecycle states
- **ComponentPriority**: Update priority levels

### State Enums (`state/`)
- **AnimationState**: Animation states (Playing, Paused, Completed, etc.)
- **EffectState**: Effect states (Active, Paused, Completed, etc.)
- **CacheState**: Cache states (Empty, Loading, Loaded, etc.)
- **PoolState**: Object pool states (Available, In Use, etc.)
- **NetworkState**: Network connection states
- **SyncState**: Synchronization states

### Pattern Enums (`patterns/`)
- **FactoryType/State**: Factory pattern enums
- **BuilderType/State**: Builder pattern enums
- **ObserverType/State**: Observer pattern enums
- **StrategyType/State**: Strategy pattern enums
- **CommandType/State**: Command pattern enums
- **SingletonType/State**: Singleton pattern enums
- **DecoratorType/State**: Decorator pattern enums

### Rendering Enums (`rendering/`)
- **GraphicsLineStyle/FillStyle**: Graphics drawing styles
- **SpriteBlendMode**: Sprite blending modes
- **BitmapTextAlign**: Text alignment options
- **LightType/BlendMode**: Lighting system enums
- **MeshType/RenderMode**: Mesh rendering enums

### UI Enums (`ui/`)
- **ButtonState**: Button interaction states
- **SliderOrientation**: Slider direction options
- **TooltipPosition**: Tooltip positioning options
- **InputType/Event**: Input system enums
- **ThemeProperty**: Theme customization properties

### Physics Enums (`physics/`)
- **PhysicsBodyType**: Body types (Static, Dynamic, Kinematic)
- **CollisionShape**: Collision detection shapes
- **PhysicsMaterial**: Material properties
- **ForceType**: Force application types
- **ConstraintType**: Physics constraint types

### Audio Enums (`audio/`)
- **AudioType**: Audio categories (SFX, Music, Voice, etc.)
- **AudioState**: Playback states
- **AudioEffectType**: Audio effects (Reverb, Echo, etc.)
- **AudioSpatialModel**: 3D audio models
- **AudioPriority**: Audio priority levels

### Network Enums (`network/`)
- **NetworkConnectionState**: Connection states
- **NetworkMessageType**: Message types
- **NetworkProtocol**: Protocol types (TCP, UDP, WebSocket)
- **NetworkSyncMode**: Synchronization modes
- **NetworkQuality**: Connection quality levels

### Effects Enums (`effects/`)
- **ParticleSpawnMode**: Particle emission modes
- **EnvironmentalEffectType**: Weather and environmental effects
- **EffectPriority**: Effect priority levels
- **EffectAnimationType**: Effect animation types
- **EffectBlendMode**: Visual blending modes

### Performance Enums (`performance/`)
- **PerformanceMetric**: Performance measurement types
- **LODLevel**: Level of detail levels
- **CacheType/Strategy**: Caching system enums
- **PoolType**: Object pooling types
- **ResourceType**: Resource management types

### Debug Enums (`debug/`)
- **DebugLevel**: Logging levels
- **DebugCategory**: Debug categories
- **DebugVisualizationType**: Debug visualization options
- **DebugProfilingType**: Profiling types
- **DebugTestType**: Testing framework types

## Integration with Unit/Layout Systems

The enum system integrates seamlessly with the Unit and Layout Systems:

- **LayoutSystemImports.ts**: Re-exports all Layout System enums
- **Unit System Integration**: Imports Unit System enums (SizeUnit, PositionUnit, etc.)
- **No Duplication**: Removed duplicate enums, using Layout/Unit Systems as single source of truth

## Usage Examples

### Importing Specific Category
```typescript
import { GameObjectType, GameObjectState } from './enums/core';
import { AnimationState, EffectState } from './enums/state';
import { ButtonState, SliderOrientation } from './enums/ui';
```

### Importing All Enums
```typescript
import { 
  GameObjectType, 
  AnimationState, 
  ButtonState,
  LayoutType,  // From Layout System
  SizeUnit     // From Unit System
} from './enums';
```

### Using in Interfaces
```typescript
export interface IButton {
  readonly gameObjectType: GameObjectType.BUTTON;
  buttonState: ButtonState;
  onClick(): void;
}
```

## Best Practices

1. **Use Organized Enums**: Import from specific categories rather than the legacy file
2. **Leverage Integration**: Use Layout/Unit System enums when available
3. **Type Safety**: All enums are properly typed for IntelliSense support
4. **Consistency**: Follow naming conventions (PascalCase for enum names, UPPER_CASE for values)
5. **Documentation**: Each enum has comprehensive JSDoc comments

## Migration Guide

### From Legacy Enums
```typescript
// OLD (deprecated)
import { LayoutType } from './enums/GameObjectEnums';

// NEW (recommended)
import { LayoutType } from './enums'; // From Layout System
```

### From Scattered Interface Enums
```typescript
// OLD (scattered in interfaces)
import { AnimationState } from './interfaces/animation/IAnimatedObject';

// NEW (centralized)
import { AnimationState } from './enums/state';
```

## Future Enhancements

1. **Auto-generation**: Consider auto-generating enums from configuration files
2. **Validation**: Add runtime validation for enum values
3. **Serialization**: Add enum serialization/deserialization utilities
4. **Documentation**: Generate enum documentation from JSDoc comments
5. **Testing**: Add comprehensive enum validation tests

## Notes

- All enums follow TypeScript best practices
- Comprehensive JSDoc documentation included
- Integration with existing Unit/Layout Systems maintained
- Backward compatibility preserved through legacy exports
- Organized structure improves maintainability and discoverability
