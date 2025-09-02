# Button Click Flow Documentation

## Overview

This document describes the complete button click flow that handles both HTML element clicks outside the canvas and custom game object button clicks within the canvas. The system provides unified event handling, action execution, and flow coordination.

## Flow Architecture

```
Button Click Event
        ↓
Button Click Event Handler
        ↓
Event Validation & Filtering
        ↓
Button Click Coordinator
        ↓
Flow Execution
        ↓
Action Execution
        ↓
Result Processing
```

## Detailed Flow Steps

### 1. Event Detection Phase

**HTML Element Click:**
```typescript
// HTML button outside canvas
document.getElementById('myButton').addEventListener('click', (event) => {
  buttonClickEventHandler.handleHtmlClick(event, element);
});
```

**Game Object Button Click:**
```typescript
// Custom game object button inside canvas
gameObject.on('pointerdown', (event) => {
  buttonClickEventHandler.handleGameObjectClick(event, gameObject);
});
```

**Keyboard Activation:**
```typescript
// Keyboard activation (Enter, Space, etc.)
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    buttonClickEventHandler.handleKeyboardActivation(event, target);
  }
});
```

### 2. Event Validation Phase

**Click Validation:**
```typescript
const validation = await buttonClickEventHandler.validateClick(event);
if (validation.isValid) {
  // Process the click
  const result = await buttonClickCoordinator.coordinateClick(event);
}
```

**Validation Rules:**
- Debouncing: Prevent rapid successive clicks
- Throttling: Limit click frequency
- Filtering: Block invalid or malicious clicks
- Custom validation: Application-specific rules

### 3. Coordination Phase

**Button Click Coordinator:**
- Receives validated click event
- Determines appropriate flow to execute
- Creates execution context
- Orchestrates flow execution

### 4. Flow Execution Phase

**Flow Types:**

1. **Sequential Flow** - Actions execute one after another
2. **Parallel Flow** - Actions execute simultaneously
3. **Conditional Flow** - Actions execute based on conditions
4. **Custom Flow** - Application-specific execution logic

### 5. Action Execution Phase

**Action Types:**
- Navigate: Change scene or page
- Toggle: Toggle state or visibility
- Submit: Submit form or data
- Play/Pause: Media control
- Custom: Application-specific actions

### 6. Result Processing Phase

**Result Handling:**
- Success: Execute success callbacks
- Failure: Execute error handling
- Rollback: Undo failed actions
- Notification: Inform user of results

## Implementation Example

### Button Click Event Handler Implementation

```typescript
class ButtonClickEventHandler implements IButtonClickEventHandler {
  private coordinator: IButtonClickCoordinator;
  private debouncedClicks: Map<string, number> = new Map();
  
  constructor(coordinator: IButtonClickCoordinator) {
    this.coordinator = coordinator;
  }
  
  async handleHtmlClick(event: MouseEvent, element: HTMLElement): Promise<IButtonClickResult> {
    const clickEvent: IButtonClickEvent = {
      eventId: generateId(),
      eventType: ButtonClickEventType.HTML_CLICK,
      source: ButtonClickSource.HTML_ELEMENT,
      timestamp: new Date(),
      target: {
        targetId: element.id,
        targetType: 'html_element',
        element: element,
        buttonId: element.dataset.buttonId,
        buttonType: element.dataset.buttonType,
      },
      coordinates: {
        x: event.clientX,
        y: event.clientY,
        clientX: event.clientX,
        clientY: event.clientY,
        screenX: event.screenX,
        screenY: event.screenY,
      },
      modifiers: {
        ctrlKey: event.ctrlKey,
        shiftKey: event.shiftKey,
        altKey: event.altKey,
        metaKey: event.metaKey,
        button: event.button,
        buttons: event.buttons,
      },
      metadata: {
        sessionId: this.getSessionId(),
        context: 'html_click',
        priority: ClickPriority.MEDIUM,
        tags: ['html', 'button'],
        customData: {},
      },
    };
    
    return await this.processClick(clickEvent);
  }
  
  async handleGameObjectClick(event: any, gameObject: IGameObject): Promise<IButtonClickResult> {
    const clickEvent: IButtonClickEvent = {
      eventId: generateId(),
      eventType: ButtonClickEventType.GAME_OBJECT_CLICK,
      source: ButtonClickSource.GAME_OBJECT,
      timestamp: new Date(),
      target: {
        targetId: gameObject.id,
        targetType: 'game_object',
        gameObject: gameObject,
        buttonId: gameObject.buttonId,
        buttonType: gameObject.buttonType,
      },
      coordinates: {
        x: event.x,
        y: event.y,
        clientX: event.clientX,
        clientY: event.clientY,
        screenX: event.screenX,
        screenY: event.screenY,
        relativeX: event.x,
        relativeY: event.y,
      },
      modifiers: {
        ctrlKey: event.ctrlKey || false,
        shiftKey: event.shiftKey || false,
        altKey: event.altKey || false,
        metaKey: event.metaKey || false,
        button: event.button || 0,
        buttons: event.buttons || 1,
      },
      metadata: {
        sessionId: this.getSessionId(),
        context: 'game_object_click',
        priority: ClickPriority.MEDIUM,
        tags: ['game_object', 'button'],
        customData: {},
      },
    };
    
    return await this.processClick(clickEvent);
  }
  
  private async processClick(event: IButtonClickEvent): Promise<IButtonClickResult> {
    // Validate click
    const validation = await this.validateClick(event);
    if (!validation.isValid) {
      return this.createErrorResult(event, validation.reason || 'Invalid click');
    }
    
    // Coordinate with coordinator
    return await this.coordinator.coordinateClick(event);
  }
}
```

### Button Click Coordinator Implementation

```typescript
class ButtonClickCoordinator implements IButtonClickCoordinator {
  private flows: Map<string, IButtonClickFlow> = new Map();
  private actions: Map<string, IButtonClickActionDefinition> = new Map();
  
  async coordinateClick(event: IButtonClickEvent): Promise<IButtonClickResult> {
    const startTime = Date.now();
    const context = this.createExecutionContext(event);
    
    try {
      // Determine flow to execute
      const flow = this.determineFlow(event);
      if (!flow) {
        return this.createErrorResult(event, 'No flow found for click');
      }
      
      // Execute flow
      const result = await this.executeFlow(flow, context);
      
      return {
        resultId: generateId(),
        event: event,
        success: result.success,
        duration: Date.now() - startTime,
        actions: result.actions,
        errors: result.errors,
        warnings: result.warnings,
        metadata: {
          processingTime: Date.now() - startTime,
          actionsExecuted: result.actions.length,
          successfulActions: result.actions.filter(a => a.success).length,
          failedActions: result.actions.filter(a => !a.success).length,
          warningsGenerated: result.warnings.length,
          errorsGenerated: result.errors.length,
          timestamp: new Date(),
        },
      };
    } catch (error) {
      return this.createErrorResult(event, error.message);
    }
  }
  
  private determineFlow(event: IButtonClickEvent): IButtonClickFlow | null {
    // Logic to determine which flow to execute based on:
    // - Button type
    // - Button ID
    // - Context
    // - User permissions
    // - Current state
    
    const buttonId = event.target.buttonId;
    const buttonType = event.target.buttonType;
    
    // Example: Navigation button
    if (buttonType === 'navigation') {
      return this.flows.get('navigation-flow');
    }
    
    // Example: Toggle button
    if (buttonType === 'toggle') {
      return this.flows.get('toggle-flow');
    }
    
    // Example: Submit button
    if (buttonType === 'submit') {
      return this.flows.get('submit-flow');
    }
    
    return null;
  }
  
  async executeSequentialFlow(flow: IButtonClickFlow, context: IButtonClickExecutionContext): Promise<IButtonClickResult> {
    const actions: IButtonClickAction[] = [];
    const errors: IButtonClickError[] = [];
    const warnings: IButtonClickWarning[] = [];
    
    for (const actionDef of flow.actions) {
      try {
        const action = await this.executeAction(actionDef, context);
        actions.push(action);
        
        if (!action.success) {
          errors.push({
            errorId: generateId(),
            code: 'ACTION_FAILED',
            message: `Action ${actionDef.actionId} failed`,
            source: context.source,
            severity: 'high',
            timestamp: new Date(),
          });
        }
      } catch (error) {
        errors.push({
          errorId: generateId(),
          code: 'ACTION_ERROR',
          message: error.message,
          source: context.source,
          severity: 'high',
          timestamp: new Date(),
        });
      }
    }
    
    return {
      resultId: generateId(),
      event: context.event,
      success: errors.length === 0,
      duration: 0, // Will be set by caller
      actions: actions,
      errors: errors,
      warnings: warnings,
      metadata: {
        processingTime: 0,
        actionsExecuted: actions.length,
        successfulActions: actions.filter(a => a.success).length,
        failedActions: actions.filter(a => !a.success).length,
        warningsGenerated: warnings.length,
        errorsGenerated: errors.length,
        timestamp: new Date(),
      },
    };
  }
}
```

## Flow Configuration Examples

### Navigation Flow

```typescript
const navigationFlow: IButtonClickFlow = {
  flowId: 'navigation-flow',
  flowName: 'Navigation Flow',
  flowType: 'sequential',
  enabled: true,
  actions: [
    {
      actionId: 'validate-navigation',
      actionType: ButtonClickActionType.CUSTOM,
      name: 'Validate Navigation',
      description: 'Validate navigation permissions and state',
      enabled: true,
      priority: ClickPriority.HIGH,
      parameters: {
        requiredPermissions: ['navigate'],
        validateState: true,
      },
      validation: {
        enabled: true,
        rules: [
          {
            ruleId: 'permission-check',
            ruleType: 'permission',
            enabled: true,
            parameters: { requiredPermissions: ['navigate'] },
          },
        ],
        requiredParameters: ['target'],
        optionalParameters: ['animation'],
      },
      execution: {
        executionType: 'async',
        timeout: 5000,
        retryCount: 3,
        retryDelay: 1000,
        dependencies: [],
        preConditions: [],
        postConditions: [],
      },
    },
    {
      actionId: 'navigate-to-scene',
      actionType: ButtonClickActionType.NAVIGATE,
      name: 'Navigate to Scene',
      description: 'Navigate to target scene',
      enabled: true,
      priority: ClickPriority.HIGH,
      parameters: {
        target: '${target}',
        animation: 'fade',
      },
      validation: {
        enabled: true,
        rules: [],
        requiredParameters: ['target'],
        optionalParameters: ['animation'],
      },
      execution: {
        executionType: 'async',
        timeout: 10000,
        retryCount: 2,
        retryDelay: 2000,
        dependencies: ['validate-navigation'],
        preConditions: [],
        postConditions: [],
      },
    },
  ],
  conditions: [],
  metadata: {
    description: 'Handles navigation button clicks',
    version: '1.0.0',
    author: 'System',
    tags: ['navigation', 'button'],
    customData: {},
  },
};
```

### Toggle Flow

```typescript
const toggleFlow: IButtonClickFlow = {
  flowId: 'toggle-flow',
  flowName: 'Toggle Flow',
  flowType: 'conditional',
  enabled: true,
  actions: [
    {
      actionId: 'check-toggle-state',
      actionType: ButtonClickActionType.CUSTOM,
      name: 'Check Toggle State',
      description: 'Check current toggle state',
      enabled: true,
      priority: ClickPriority.MEDIUM,
      parameters: {
        stateProperty: '${stateProperty}',
      },
      validation: {
        enabled: true,
        rules: [],
        requiredParameters: ['stateProperty'],
        optionalParameters: [],
      },
      execution: {
        executionType: 'sync',
        timeout: 1000,
        retryCount: 1,
        retryDelay: 500,
        dependencies: [],
        preConditions: [],
        postConditions: [],
      },
    },
    {
      actionId: 'toggle-state',
      actionType: ButtonClickActionType.TOGGLE,
      name: 'Toggle State',
      description: 'Toggle the state',
      enabled: true,
      priority: ClickPriority.MEDIUM,
      parameters: {
        stateProperty: '${stateProperty}',
        newValue: '${newValue}',
      },
      validation: {
        enabled: true,
        rules: [],
        requiredParameters: ['stateProperty', 'newValue'],
        optionalParameters: [],
      },
      execution: {
        executionType: 'sync',
        timeout: 2000,
        retryCount: 2,
        retryDelay: 1000,
        dependencies: ['check-toggle-state'],
        preConditions: [],
        postConditions: [],
      },
    },
  ],
  conditions: [
    {
      conditionId: 'state-condition',
      conditionType: 'state',
      enabled: true,
      parameters: {
        property: '${stateProperty}',
        operator: 'equals',
        value: true,
      },
      nextAction: 'toggle-state',
      alternativeAction: 'toggle-state',
    },
  ],
  metadata: {
    description: 'Handles toggle button clicks',
    version: '1.0.0',
    author: 'System',
    tags: ['toggle', 'button'],
    customData: {},
  },
};
```

## Performance Optimizations

### 1. Event Debouncing
```typescript
private debouncedClicks: Map<string, number> = new Map();

private isDebounced(buttonId: string): boolean {
  const lastClick = this.debouncedClicks.get(buttonId);
  const now = Date.now();
  const debounceDelay = 250; // ms
  
  if (lastClick && (now - lastClick) < debounceDelay) {
    return true;
  }
  
  this.debouncedClicks.set(buttonId, now);
  return false;
}
```

### 2. Action Caching
```typescript
private actionCache: Map<string, IButtonClickActionDefinition> = new Map();

private getCachedAction(actionId: string): IButtonClickActionDefinition | null {
  return this.actionCache.get(actionId) || null;
}

private cacheAction(action: IButtonClickActionDefinition): void {
  this.actionCache.set(action.actionId, action);
}
```

### 3. Parallel Execution
```typescript
async executeParallelFlow(flow: IButtonClickFlow, context: IButtonClickExecutionContext): Promise<IButtonClickResult> {
  const actionPromises = flow.actions.map(actionDef => 
    this.executeAction(actionDef, context)
  );
  
  const actions = await Promise.all(actionPromises);
  
  return {
    // ... result construction
  };
}
```

## Error Handling

### 1. Graceful Degradation
```typescript
try {
  const result = await this.executeAction(action, context);
  return result;
} catch (error) {
  // Log error but continue with other actions
  console.error(`Action ${action.actionId} failed:`, error);
  
  // Return failed action result
  return {
    actionId: action.actionId,
    actionType: action.actionType,
    target: context.target.targetId,
    parameters: action.parameters,
    success: false,
    duration: 0,
    result: null,
  };
}
```

### 2. Retry Logic
```typescript
async executeActionWithRetry(action: IButtonClickActionDefinition, context: IButtonClickExecutionContext): Promise<IButtonClickAction> {
  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= action.execution.retryCount; attempt++) {
    try {
      return await this.executeAction(action, context);
    } catch (error) {
      lastError = error;
      
      if (attempt < action.execution.retryCount) {
        await new Promise(resolve => setTimeout(resolve, action.execution.retryDelay));
      }
    }
  }
  
  throw lastError || new Error('Action execution failed');
}
```

## Usage Example

```typescript
// Initialize button click system
const coordinator = new ButtonClickCoordinator();
const eventHandler = new ButtonClickEventHandler(coordinator);

// Register flows
coordinator.registerFlow(navigationFlow);
coordinator.registerFlow(toggleFlow);

// Register actions
coordinator.registerAction(validateNavigationAction);
coordinator.registerAction(navigateToSceneAction);
coordinator.registerAction(toggleStateAction);

// Initialize and start listening
await coordinator.initialize();
await eventHandler.initialize();
eventHandler.startListening();

// HTML button click
document.getElementById('nav-button').addEventListener('click', (event) => {
  eventHandler.handleHtmlClick(event, event.target);
});

// Game object button click
gameObject.on('pointerdown', (event) => {
  eventHandler.handleGameObjectClick(event, gameObject);
});

// The system is now ready to handle button clicks automatically
```

## Best Practices

1. **Always validate clicks** to prevent invalid or malicious actions
2. **Use debouncing** to prevent rapid successive clicks
3. **Implement proper error handling** to prevent system failures
4. **Use appropriate flow types** for different scenarios
5. **Cache frequently used actions** to improve performance
6. **Implement retry logic** for critical actions
7. **Monitor performance metrics** to identify bottlenecks
8. **Use parallel execution** where possible to improve performance
9. **Implement proper rollback** for failed actions
10. **Validate permissions** before executing sensitive actions
