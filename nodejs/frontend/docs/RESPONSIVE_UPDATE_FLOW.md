# Responsive Update Flow Documentation

## Overview

This document describes the complete responsive update flow that handles window resize events and coordinates updates across all systems using the bridge architecture.

## Flow Architecture

```
Window Resize Event
        ↓
Responsive Event Handler
        ↓
Breakpoint Detection
        ↓
Responsive Coordinator
        ↓
Bridge Interface Updates
        ↓
System Updates
        ↓
Game Object Updates
```

## Detailed Flow Steps

### 1. Event Detection Phase

**Trigger:** Window resize event fired
```typescript
window.addEventListener('resize', (event) => {
  responsiveEventHandler.handleResizeEvent(event);
});
```

**Responsive Event Handler:**
- Detects window resize event
- Debounces/throttles events for performance
- Calculates new viewport dimensions
- Determines new breakpoint
- Checks if breakpoint has changed

### 2. Breakpoint Detection Phase

**Breakpoint Change Detection:**
```typescript
const currentBreakpoint = getCurrentBreakpoint();
const previousBreakpoint = this.previousBreakpoint;

if (currentBreakpoint !== previousBreakpoint) {
  const change: IBreakpointChange = {
    previousBreakpoint,
    currentBreakpoint,
    changeType: 'resize',
    previousViewport: this.previousViewport,
    currentViewport: this.currentViewport,
    timestamp: new Date(),
    metadata: {
      isSignificant: true,
      updatePriority: UpdatePriority.HIGH,
      affectedSystems: [ResponsiveSystem.LAYOUT, ResponsiveSystem.THEME, ResponsiveSystem.UNIT]
    }
  };
  
  await executeResponsiveUpdateFlow(change);
}
```

### 3. Coordination Phase

**Responsive Coordinator:**
- Receives breakpoint change information
- Determines affected systems
- Calculates update priority
- Coordinates bridge interface updates
- Manages system updates

### 4. Bridge Interface Updates

**Bridge Update Sequence:**
1. **IResponsiveLayoutBridge** - Update layout calculations
2. **IResponsiveThemeBridge** - Update theme values
3. **IResponsiveUnitBridge** - Update unit calculations
4. **IUnitLayoutBridge** - Coordinate unit-layout integration
5. **IThemeLayoutBridge** - Coordinate theme-layout integration

### 5. System Updates

**System Update Sequence:**
1. **Layout System** - Update layout strategies and calculations
2. **Theme System** - Update theme values and classes
3. **Unit System** - Update unit calculations and conversions
4. **Game Object System** - Update game object properties
5. **Scene System** - Update scene layout and styling

### 6. Game Object Updates

**Game Object Update Process:**
- Apply new layout properties
- Apply new theme values
- Apply new unit calculations
- Update visual representation
- Trigger animations/transitions

## Implementation Example

### Responsive Event Handler Implementation

```typescript
class ResponsiveEventHandler implements IResponsiveEventHandler {
  private coordinator: IResponsiveCoordinator;
  private debouncedResize: () => void;
  
  constructor(coordinator: IResponsiveCoordinator) {
    this.coordinator = coordinator;
    this.debouncedResize = debounce(this.handleResize.bind(this), 250);
  }
  
  startListening(): void {
    window.addEventListener('resize', this.debouncedResize);
    window.addEventListener('orientationchange', this.handleOrientationChange.bind(this));
  }
  
  private async handleResize(): Promise<void> {
    const currentViewport = this.getCurrentViewport();
    const currentBreakpoint = this.getCurrentBreakpoint();
    
    if (this.hasBreakpointChanged()) {
      const change: IBreakpointChange = {
        previousBreakpoint: this.previousBreakpoint,
        currentBreakpoint,
        changeType: 'resize',
        previousViewport: this.previousViewport,
        currentViewport,
        timestamp: new Date(),
        metadata: {
          isSignificant: true,
          updatePriority: this.getUpdatePriority(change),
          affectedSystems: this.getAffectedSystems(change)
        }
      };
      
      await this.coordinator.executeResponsiveUpdateFlow(change);
    }
  }
}
```

### Responsive Coordinator Implementation

```typescript
class ResponsiveCoordinator implements IResponsiveCoordinator {
  private bridges: Map<string, IResponsiveBridge> = new Map();
  private systemManagers: Map<ResponsiveSystem, ISystemManager> = new Map();
  
  async executeResponsiveUpdateFlow(change: IBreakpointChange): Promise<IResponsiveUpdateResult> {
    const startTime = Date.now();
    const systemResults: ISystemUpdateResult[] = [];
    const errors: IResponsiveUpdateError[] = [];
    
    try {
      // 1. Coordinate bridge updates
      const bridgeResults = await this.coordinateBridgeUpdates(change);
      
      // 2. Execute system updates
      const affectedSystems = this.getAffectedSystems(change);
      for (const system of affectedSystems) {
        try {
          const result = await this.executeSystemUpdate(system, change);
          systemResults.push(result);
        } catch (error) {
          errors.push({
            code: 'SYSTEM_UPDATE_ERROR',
            message: `Failed to update ${system} system`,
            system,
            severity: 'error'
          });
        }
      }
      
      // 3. Coordinate transitions
      if (change.previousBreakpoint) {
        await this.coordinateBridgeTransitions(
          change.previousBreakpoint,
          change.currentBreakpoint
        );
      }
      
      return {
        success: errors.length === 0,
        duration: Date.now() - startTime,
        systemResults,
        errors,
        warnings: [],
        metadata: {
          breakpointChange: change,
          totalSystemsUpdated: systemResults.length,
          successfulUpdates: systemResults.filter(r => r.success).length,
          failedUpdates: systemResults.filter(r => !r.success).length,
          updateTimestamp: new Date()
        }
      };
    } catch (error) {
      return {
        success: false,
        duration: Date.now() - startTime,
        systemResults,
        errors: [...errors, {
          code: 'COORDINATION_ERROR',
          message: 'Failed to coordinate responsive update',
          system: ResponsiveSystem.SCENE,
          severity: 'error'
        }],
        warnings: [],
        metadata: {
          breakpointChange: change,
          totalSystemsUpdated: systemResults.length,
          successfulUpdates: systemResults.filter(r => r.success).length,
          failedUpdates: systemResults.filter(r => !r.success).length,
          updateTimestamp: new Date()
        }
      };
    }
  }
  
  private async coordinateBridgeUpdates(change: IBreakpointChange): Promise<IBridgeUpdateResult[]> {
    const results: IBridgeUpdateResult[] = [];
    
    for (const [bridgeId, bridge] of this.bridges) {
      try {
        const result = await bridge.handleBreakpointChange(change);
        results.push(result);
      } catch (error) {
        results.push({
          bridgeId,
          success: false,
          duration: 0,
          errors: [error.message],
          warnings: [],
          metadata: {
            bridgeType: bridge.bridgeType,
            supportedSystems: bridge.supportedSystems,
            updateTimestamp: new Date()
          }
        });
      }
    }
    
    return results;
  }
}
```

## Performance Optimizations

### 1. Event Debouncing
```typescript
private debouncedResize = debounce(this.handleResize.bind(this), 250);
```

### 2. Update Prioritization
```typescript
private getUpdatePriority(change: IBreakpointChange): UpdatePriority {
  const viewportChange = Math.abs(change.currentViewport.width - change.previousViewport.width);
  
  if (viewportChange > 500) return UpdatePriority.CRITICAL;
  if (viewportChange > 200) return UpdatePriority.HIGH;
  if (viewportChange > 50) return UpdatePriority.MEDIUM;
  return UpdatePriority.LOW;
}
```

### 3. Lazy Updates
```typescript
private isUpdateNeeded(change: IBreakpointChange): boolean {
  // Only update if breakpoint actually changed
  if (change.previousBreakpoint === change.currentBreakpoint) {
    return false;
  }
  
  // Only update if change is significant
  const viewportChange = Math.abs(change.currentViewport.width - change.previousViewport.width);
  return viewportChange > this.config.breakpointTolerance;
}
```

### 4. Parallel Updates
```typescript
private async executeMultipleSystemUpdates(
  systems: ResponsiveSystem[],
  change: IBreakpointChange
): Promise<ISystemUpdateResult[]> {
  const updatePromises = systems.map(system => 
    this.executeSystemUpdate(system, change)
  );
  
  return Promise.all(updatePromises);
}
```

## Error Handling

### 1. Graceful Degradation
```typescript
try {
  await this.executeSystemUpdate(system, change);
} catch (error) {
  // Log error but continue with other systems
  console.error(`Failed to update ${system} system:`, error);
  // Continue with other systems
}
```

### 2. Retry Logic
```typescript
private async executeSystemUpdateWithRetry(
  system: ResponsiveSystem,
  change: IBreakpointChange,
  maxRetries: number = 3
): Promise<ISystemUpdateResult> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await this.executeSystemUpdate(system, change);
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 100 * attempt));
    }
  }
}
```

## Monitoring and Statistics

### 1. Performance Metrics
```typescript
interface IResponsiveUpdateStatistics {
  totalUpdates: number;
  successfulUpdates: number;
  failedUpdates: number;
  averageUpdateTime: number;
  breakpointChanges: number;
  performance: {
    eventsPerSecond: number;
    updatesPerSecond: number;
    averageEventProcessingTime: number;
    averageUpdateTime: number;
  };
}
```

### 2. Health Monitoring
```typescript
interface ICoordinatorHealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  healthScore: number;
  issues: string[];
  recommendations: string[];
  lastHealthCheck: Date;
}
```

## Configuration

### Responsive Event Handler Config
```typescript
interface IResponsiveEventHandlerConfig {
  events: {
    enableWindowResize: true;
    enableOrientationChange: true;
    enableDeviceChange: true;
    debounceDelay: 250;
    throttleDelay: 100;
  };
  performance: {
    enableUpdateOptimization: true;
    enableLazyUpdates: true;
    maxConcurrentUpdates: 5;
    updateTimeout: 5000;
  };
  breakpoints: {
    enableAutoDetection: true;
    breakpointTolerance: 50;
  };
}
```

### Responsive Coordinator Config
```typescript
interface IResponsiveCoordinatorConfig {
  bridges: {
    enableAutoRegistration: true;
    enableBridgeValidation: true;
    maxBridges: 10;
  };
  performance: {
    enableOptimization: true;
    enableParallelUpdates: true;
    maxConcurrentUpdates: 5;
    updateTimeout: 5000;
  };
  monitoring: {
    enableStatistics: true;
    enableHealthChecks: true;
    statisticsRetentionPeriod: 3600000; // 1 hour
  };
}
```

## Usage Example

```typescript
// Initialize responsive system
const coordinator = new ResponsiveCoordinator();
const eventHandler = new ResponsiveEventHandler(coordinator);

// Register bridges
coordinator.registerBridge(new UnitLayoutBridge());
coordinator.registerBridge(new ThemeLayoutBridge());
coordinator.registerBridge(new ResponsiveUnitBridge());
coordinator.registerBridge(new ResponsiveLayoutBridge());
coordinator.registerBridge(new ResponsiveThemeBridge());

// Register system managers
coordinator.registerSystemManager(ResponsiveSystem.LAYOUT, layoutManager);
coordinator.registerSystemManager(ResponsiveSystem.THEME, themeManager);
coordinator.registerSystemManager(ResponsiveSystem.UNIT, unitManager);

// Initialize and start listening
await coordinator.initialize();
await eventHandler.initialize();
eventHandler.startListening();

// The system is now ready to handle responsive updates automatically
```

## Best Practices

1. **Always debounce resize events** to prevent excessive updates
2. **Use lazy updates** to avoid unnecessary calculations
3. **Implement graceful error handling** to prevent system failures
4. **Monitor performance metrics** to identify bottlenecks
5. **Use parallel updates** where possible to improve performance
6. **Implement retry logic** for critical updates
7. **Cache frequently used calculations** to improve performance
8. **Validate breakpoint changes** before executing updates
9. **Use appropriate update priorities** to handle critical updates first
10. **Monitor system health** to detect issues early
