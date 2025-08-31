# Unit System Implementation Plan

## Current Status Analysis

### ✅ **What's Already Implemented**
- **Core interfaces** and type definitions
- **Basic enums** for unit types and values
- **Factory pattern** with basic calculator creation
- **Basic calculator classes** with core calculation logic
- **Template method pattern** structure
- **Command pattern** interfaces
- **Observer pattern** interfaces
- **Basic validation** interfaces
- **Memento pattern** interfaces

### ❌ **What's Missing or Incomplete**

## Phase 1: Core Calculator Implementations (Priority: HIGH)

### 1.1 **Complete SizeUnitCalculator Implementation**
**File**: `src/unit/classes/SizeUnitCalculator.ts`
**Status**: ~60% complete
**Missing**:
```typescript
// Missing calculation methods
private calculateParentWidthSize(context: UnitContext): number
private calculateParentHeightSize(context: UnitContext): number
private calculateSceneWidthSize(context: UnitContext): number
private calculateSceneHeightSize(context: UnitContext): number
private calculateViewportWidthSize(context: UnitContext): number
private calculateViewportHeightSize(context: UnitContext): number
private calculateContentSize(context: UnitContext): number
private calculateIntrinsicSize(context: UnitContext): number
private calculateRandomSize(context: UnitContext): number
private calculateFitSize(context: UnitContext): number
private calculateStretchSize(context: UnitContext): number

// Missing constraint handling
private applyConstraints(value: number): number
private validateConstraints(value: number): boolean
```

### 1.2 **Complete PositionUnitCalculator Implementation**
**File**: `src/unit/classes/PositionUnitCalculator.ts`
**Status**: ~40% complete
**Missing**:
```typescript
// Missing calculation methods
private calculateCenterPosition(context: UnitContext): number
private calculateLeftPosition(context: UnitContext): number
private calculateRightPosition(context: UnitContext): number
private calculateTopPosition(context: UnitContext): number
private calculateBottomPosition(context: UnitContext): number
private calculateParentRelativePosition(context: UnitContext): number
private calculateSceneRelativePosition(context: UnitContext): number
private calculateViewportRelativePosition(context: UnitContext): number
private calculateContentBasedPosition(context: UnitContext): number
private calculateRandomPosition(context: UnitContext): number

// Missing alignment handling
setAlignment(alignment: string): void
getAlignment(): string
setOffset(offset: number): void
getOffset(): number
```

### 1.3 **Complete ScaleUnitCalculator Implementation**
**File**: `src/unit/classes/ScaleUnitCalculator.ts`
**Status**: ~30% complete
**Missing**:
```typescript
// Missing calculation methods
private calculateResponsiveScale(context: UnitContext): number
private calculateContentFitScale(context: UnitContext): number
private calculateContentFillScale(context: UnitContext): number
private calculateUniformScale(context: UnitContext): number

// Missing constraint handling
setScaleConstraints(min?: number, max?: number): void
getMinScale(): number | undefined
getMaxScale(): number | undefined
setUniformScaling(uniform: boolean): void
isUniformScaling(): boolean
```

## Phase 2: Strategy Pattern Implementation (Priority: HIGH)

### 2.1 **Complete MixedUnitStrategy**
**File**: `src/unit/strategies/MixedUnitStrategy.ts`
**Status**: ~50% complete
**Missing**:
```typescript
// Missing calculation methods
private calculateMixedObject(input: any, context: UnitContext): number
private calculateStringExpression(input: string, context: UnitContext): number
private calculateTypedValue(unitType: string, value: any, context: UnitContext): number
private calculateCSSExpression(input: string, context: UnitContext): number
private calculateSingleValue(value: any, context: UnitContext): number
private calculateSizeValue(value: any, context: UnitContext): number
private calculatePositionValue(value: any, context: UnitContext): number
private calculateScaleValue(value: any, context: UnitContext): number

// Missing utility methods
private isSimpleValue(input: any): boolean
private containsMixedExpressions(input: string): boolean
private mapDimension(dimension: string): Dimension | null
private parseCSSExpression(expression: string): any
```

### 2.2 **Implement Missing Strategy Classes**
**Files**: 
- `src/unit/strategies/SizeUnitStrategy.ts` (exists but incomplete)
- `src/unit/strategies/PositionUnitStrategy.ts` (exists but incomplete)
- `src/unit/strategies/ScaleUnitStrategy.ts` (exists but incomplete)

**Missing**:
```typescript
// Each strategy needs complete implementation
export class SizeUnitStrategy implements IUnitStrategy {
  readonly unitType = 'size';
  
  calculate(input: any, context: UnitContext): number {
    // Handle different input types
    if (typeof input === 'number') return input;
    if (typeof input === 'string') return this.parseSizeString(input, context);
    if (Array.isArray(input)) return this.calculateSizeArray(input, context);
    if (typeof input === 'object') return this.calculateSizeObject(input, context);
    return 0;
  }
  
  canHandle(input: any): boolean {
    return this.isSizeInput(input);
  }
  
  getPriority(): number {
    return 10; // High priority for size calculations
  }
  
  // Private helper methods
  private parseSizeString(input: string, context: UnitContext): number
  private calculateSizeArray(input: any[], context: UnitContext): number
  private calculateSizeObject(input: any, context: UnitContext): number
  private isSizeInput(input: any): boolean
}
```

## Phase 3: Template Method Implementation (Priority: MEDIUM)

### 3.1 **Complete BaseUnitCalculationTemplate**
**File**: `src/unit/templates/IUnitCalculationTemplate.ts`
**Status**: ~70% complete
**Missing**:
```typescript
// Abstract methods that need implementation
protected abstract validateInput(input: any, context: UnitContext): IUnitValidationResult;
protected abstract preprocessInput(input: any, context: UnitContext): any;
protected abstract performCalculation(input: any, context: UnitContext): number;
protected abstract postprocessResult(result: number, context: UnitContext): number;
protected abstract validateResult(result: number, context: UnitContext): void;
protected abstract getSupportedInputs(): string[];
protected abstract getCalculationSteps(): string[];
```

### 3.2 **Implement Concrete Template Classes**
**Files**:
- `src/unit/templates/SizeCalculationTemplate.ts` (exists but incomplete)
- `src/unit/templates/PositionCalculationTemplate.ts` (exists but incomplete)
- `src/unit/templates/ScaleCalculationTemplate.ts` (exists but incomplete)

**Missing**:
```typescript
export class SizeCalculationTemplate extends BaseUnitCalculationTemplate {
  protected validateInput(input: any, context: UnitContext): IUnitValidationResult {
    // Implement size-specific validation
    const errors: string[] = [];
    
    if (!input) errors.push('Input is required');
    if (!context) errors.push('Context is required');
    
    // Validate size-specific constraints
    if (typeof input === 'object' && input.sizeUnit) {
      if (!Object.values(SizeUnit).includes(input.sizeUnit)) {
        errors.push(`Invalid size unit: ${input.sizeUnit}`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings: []
    };
  }
  
  protected preprocessInput(input: any, context: UnitContext): any {
    // Normalize input for size calculations
    if (typeof input === 'string') {
      return this.parseSizeString(input);
    }
    return input;
  }
  
  protected performCalculation(input: any, context: UnitContext): number {
    // Delegate to appropriate strategy
    const strategy = this.getSizeStrategy(input);
    return strategy.calculate(input, context);
  }
  
  protected postprocessResult(result: number, context: UnitContext): number {
    // Apply size-specific post-processing
    return Math.max(0, result); // Ensure non-negative
  }
  
  protected validateResult(result: number, context: UnitContext): void {
    if (result < 0) throw new Error('Size cannot be negative');
    if (isNaN(result)) throw new Error('Invalid size calculation result');
  }
  
  protected getSupportedInputs(): string[] {
    return ['number', 'string', 'object', 'array'];
  }
  
  protected getCalculationSteps(): string[] {
    return ['validation', 'preprocessing', 'calculation', 'postprocessing', 'finalValidation'];
  }
  
  // Private helper methods
  private parseSizeString(input: string): any
  private getSizeStrategy(input: any): IUnitStrategy
}
```

## Phase 4: Command Pattern Implementation (Priority: MEDIUM)

### 4.1 **Complete Command Implementations**
**Files**:
- `src/unit/commands/CalculateSizeCommand.ts` (exists but incomplete)
- `src/unit/commands/CalculatePositionCommand.ts` (exists but incomplete)
- `src/unit/commands/BatchCalculationCommand.ts` (exists but incomplete)

**Missing**:
```typescript
export class CalculateSizeCommand extends BaseUnitCommand {
  private input: any;
  private context: UnitContext;
  private calculator: SizeUnitCalculator;
  
  constructor(id: string, input: any, context: UnitContext, calculator: SizeUnitCalculator) {
    super(id);
    this.input = input;
    this.context = context;
    this.calculator = calculator;
  }
  
  execute(context: UnitContext): number {
    const result = this.calculator.calculate(this.input, context);
    this.setResult(result);
    return result;
  }
  
  canExecute(): boolean {
    return !!this.calculator && !!this.input && !!this.context;
  }
  
  getDescription(): string {
    return `Calculate size for input: ${JSON.stringify(this.input)}`;
  }
}
```

### 4.2 **Implement Command Executor**
**File**: `src/unit/commands/UnitCommandExecutor.ts` (doesn't exist)
**Missing**:
```typescript
export class UnitCommandExecutor implements IUnitCommandExecutor {
  private commandStack: IUnitCommand[] = [];
  private history: IUnitCommand[] = [];
  private undoStack: IUnitCommand[] = [];
  
  executeCommand(command: IUnitCommand, context: UnitContext): number {
    if (!command.canExecute()) {
      throw new Error(`Command cannot be executed: ${command.getDescription()}`);
    }
    
    const result = command.execute(context);
    this.commandStack.push(command);
    this.history.push(command);
    
    return result;
  }
  
  undoLastCommand(): boolean {
    const command = this.commandStack.pop();
    if (command) {
      command.undo();
      this.undoStack.push(command);
      return true;
    }
    return false;
  }
  
  redoLastCommand(): boolean {
    const command = this.undoStack.pop();
    if (command) {
      this.commandStack.push(command);
      return true;
    }
    return false;
  }
  
  getHistory(): IUnitCommand[] {
    return [...this.history];
  }
  
  clearHistory(): void {
    this.history = [];
    this.undoStack = [];
  }
  
  getCommandStack(): IUnitCommand[] {
    return [...this.commandStack];
  }
}
```

## Phase 5: Observer Pattern Implementation (Priority: MEDIUM)

### 5.1 **Complete PerformanceObserver**
**File**: `src/unit/observers/PerformanceObserver.ts`
**Status**: ~80% complete
**Missing**:
```typescript
// Missing performance tracking
private calculationStartTimes: Map<string, number> = new Map();

// Missing methods
private updatePerformanceMetrics(duration: number): void
private enforceHistoryLimit(): void
private getPerformanceReport(): any
private resetMetrics(): void
```

### 5.2 **Implement UnitSubject**
**File**: `src/unit/observers/UnitSubject.ts` (doesn't exist)
**Missing**:
```typescript
export class UnitSubject implements IUnitSubject {
  private observers: IUnitObserver[] = [];
  
  addObserver(observer: IUnitObserver): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }
  
  removeObserver(observer: IUnitObserver): boolean {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
      return true;
    }
    return false;
  }
  
  hasObserver(observer: IUnitObserver): boolean {
    return this.observers.includes(observer);
  }
  
  getObservers(): IUnitObserver[] {
    return [...this.observers];
  }
  
  clearObservers(): void {
    this.observers = [];
  }
  
  notifyValueChanged(unitId: string, oldValue: number, newValue: number): void {
    this.observers.forEach(observer => 
      observer.onUnitValueChanged(unitId, oldValue, newValue)
    );
  }
  
  // Implement other notification methods...
}
```

## Phase 6: Validation System Implementation (Priority: MEDIUM)

### 6.1 **Complete Validator Implementations**
**Files**:
- `src/unit/validators/RangeValidator.ts` (exists but incomplete)
- `src/unit/validators/TypeValidator.ts` (exists but incomplete)

**Missing**:
```typescript
export class RangeValidator implements IUnitValidator {
  private minValue?: number;
  private maxValue?: number;
  private name: string;
  
  constructor(name: string = 'RangeValidator', minValue?: number, maxValue?: number) {
    this.name = name;
    this.minValue = minValue;
    this.maxValue = maxValue;
  }
  
  validate(input: any, context: UnitContext): boolean {
    if (typeof input !== 'number') return false;
    
    if (this.minValue !== undefined && input < this.minValue) return false;
    if (this.maxValue !== undefined && input > this.maxValue) return false;
    
    return true;
  }
  
  getErrorMessage(): string {
    if (this.minValue !== undefined && this.maxValue !== undefined) {
      return `Value must be between ${this.minValue} and ${this.maxValue}`;
    } else if (this.minValue !== undefined) {
      return `Value must be at least ${this.minValue}`;
    } else if (this.maxValue !== undefined) {
      return `Value must be at most ${this.maxValue}`;
    }
    return 'Value is valid';
  }
  
  getName(): string {
    return this.name;
  }
}
```

## Phase 7: Memento Pattern Implementation (Priority: LOW)

### 7.1 **Complete Memento Classes**
**Files**:
- `src/unit/mementos/UnitMemento.ts` (exists but incomplete)
- `src/unit/mementos/UnitCalculationMemento.ts` (exists but incomplete)

**Missing**:
```typescript
export class UnitCalculationMemento implements IUnitMemento {
  private readonly unitId: string;
  private readonly timestamp: Date;
  private readonly calculationInput: any;
  private readonly calculationContext: UnitContext;
  private readonly calculationResult: number;
  private readonly performanceMetrics: any;
  
  constructor(
    unitId: string,
    calculationInput: any,
    calculationContext: UnitContext,
    calculationResult: number,
    performanceMetrics: any
  ) {
    this.unitId = unitId;
    this.timestamp = new Date();
    this.calculationInput = calculationInput;
    this.calculationContext = calculationContext;
    this.calculationResult = calculationResult;
    this.performanceMetrics = performanceMetrics;
  }
  
  getUnitId(): string {
    return this.unitId;
  }
  
  getTimestamp(): Date {
    return this.timestamp;
  }
  
  validate(): boolean {
    return !!this.unitId && !!this.timestamp && this.calculationResult !== undefined;
  }
  
  compareWith(other: IUnitMemento): number {
    // Implement comparison logic
    return 0;
  }
  
  // Getters for all properties
  getCalculationInput(): any { return this.calculationInput; }
  getCalculationContext(): UnitContext { return this.calculationContext; }
  getCalculationResult(): number { return this.calculationResult; }
  getPerformanceMetrics(): any { return this.performanceMetrics; }
}
```

## Phase 8: Composite & Adapter Patterns (Priority: LOW)

### 8.1 **Implement Composite Pattern**
**File**: `src/unit/composites/UnitComposite.ts` (doesn't exist)
**Missing**:
```typescript
export class UnitComposite implements IUnitComposite {
  private children: IUnit[] = [];
  private readonly id: string;
  private readonly name: string;
  
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
  
  addChild(child: IUnit): void {
    this.children.push(child);
  }
  
  removeChild(childId: string): boolean {
    const index = this.children.findIndex(child => child.id === childId);
    if (index > -1) {
      this.children.splice(index, 1);
      return true;
    }
    return false;
  }
  
  getChildren(): IUnit[] {
    return [...this.children];
  }
  
  calculate(context: UnitContext): number {
    // Implement composite calculation logic
    return 0;
  }
}
```

### 8.2 **Implement Adapter Pattern**
**File**: `src/unit/adapters/UnitAdapter.ts` (doesn't exist)
**Missing**:
```typescript
export class UnitAdapter implements IUnitAdapter {
  private readonly legacyUnit: any;
  private readonly adapterType: string;
  
  constructor(legacyUnit: any, adapterType: string) {
    this.legacyUnit = legacyUnit;
    this.adapterType = adapterType;
  }
  
  adapt(): IUnit | undefined {
    // Implement adaptation logic
    return undefined;
  }
  
  getAdapterType(): string {
    return this.adapterType;
  }
}
```

## Phase 9: Decorator Pattern (Priority: LOW)

### 9.1 **Implement Decorator Classes**
**File**: `src/unit/decorators/UnitDecorator.ts` (doesn't exist)
**Missing**:
```typescript
export abstract class UnitDecorator implements IUnitDecorator {
  protected readonly decoratedUnit: IUnit;
  protected readonly decoratorId: string;
  
  constructor(decoratedUnit: IUnit, decoratorId: string) {
    this.decoratedUnit = decoratedUnit;
    this.decoratorId = decoratorId;
  }
  
  abstract calculate(context: UnitContext): number;
  
  getDecoratorId(): string {
    return this.decoratorId;
  }
}

// Concrete decorators
export class LoggingDecorator extends UnitDecorator {
  private readonly logger: Logger = Logger.getInstance();
  
  calculate(context: UnitContext): number {
    this.logger.debug('UnitDecorator', 'calculate', 'Calculation started', {
      unitId: this.decoratedUnit.id,
      decoratorId: this.decoratorId
    });
    
    const result = this.decoratedUnit.calculate(context);
    
    this.logger.debug('UnitDecorator', 'calculate', 'Calculation completed', {
      unitId: this.decoratedUnit.id,
      decoratorId: this.decoratorId,
      result
    });
    
    return result;
  }
}

export class CachingDecorator extends UnitDecorator {
  private cache: Map<string, { result: number; timestamp: number }> = new Map();
  private readonly cacheTimeout: number = 5000; // 5 seconds
  
  calculate(context: UnitContext): number {
    const cacheKey = this.generateCacheKey(context);
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.result;
    }
    
    const result = this.decoratedUnit.calculate(context);
    this.cache.set(cacheKey, { result, timestamp: Date.now() });
    
    return result;
  }
  
  private generateCacheKey(context: UnitContext): string {
    return JSON.stringify(context);
  }
}
```

## Phase 10: Unit System Manager Completion (Priority: HIGH)

### 10.1 **Complete UnitSystemManager Implementation**
**File**: `src/unit/managers/UnitSystemManager.ts`
**Status**: ~30% complete
**Missing**:
```typescript
// Implement all interface methods
createUnit(unitType: string, config: any): IUnit
getUnit(unitId: string): IUnit | undefined
getAllUnits(): IUnit[]
removeUnit(unitId: string): boolean

registerStrategy(strategy: IUnitStrategy): void
getStrategy(input: any): IUnitStrategy | undefined
getStrategiesByType(type: string): IUnitStrategy[]

executeCommand(command: IUnitCommand, context: UnitContext): number
undoLastCommand(): boolean
redoLastCommand(): boolean
getCommandHistory(): IUnitCommand[]

addObserver(observer: IUnitObserver): void
removeObserver(observer: IUnitObserver): boolean
notifyObservers(eventType: string, data: any): void

addValidator(validator: IUnitValidator): void
validateUnit(unit: IUnit, context: UnitContext): boolean
getValidationErrors(): string[]

registerTemplate(template: IUnitCalculationTemplate): void
getTemplate(input: any): IUnitCalculationTemplate | undefined

saveUnitState(unitId: string, description?: string): IUnitMemento | undefined
restoreUnitState(unitId: string, memento: IUnitMemento): boolean
getUnitMementos(unitId: string): IUnitMemento[]

createComposite(unitType: string, config: any): IUnitComposite
addChildToComposite(compositeId: string, child: IUnit): boolean
removeChildFromComposite(compositeId: string, childId: string): boolean

registerAdapter(adapter: IUnitAdapter): void
adaptLegacyUnit(legacyUnit: any): IUnit | undefined

addDecorator(unitId: string, decorator: IUnitDecorator): boolean
removeDecorator(unitId: string, decoratorId: string): boolean
getUnitDecorators(unitId: string): IUnitDecorator[]

initialize(): void
shutdown(): void
getSystemStatus(): any
getPerformanceMetrics(): any
updateConfiguration(config: any): void
getConfiguration(): any
resetToDefaults(): void
```

## Implementation Priority Matrix

| Phase | Priority | Effort | Impact | Dependencies |
|-------|----------|---------|---------|--------------|
| Phase 1 | HIGH | 3-4 days | HIGH | None |
| Phase 2 | HIGH | 2-3 days | HIGH | Phase 1 |
| Phase 10 | HIGH | 3-4 days | HIGH | Phases 1-2 |
| Phase 3 | MEDIUM | 2-3 days | MEDIUM | Phases 1-2 |
| Phase 4 | MEDIUM | 2-3 days | MEDIUM | Phases 1-2 |
| Phase 5 | MEDIUM | 1-2 days | MEDIUM | None |
| Phase 6 | MEDIUM | 1-2 days | MEDIUM | None |
| Phase 7 | LOW | 1-2 days | LOW | Phases 4-5 |
| Phase 8 | LOW | 1-2 days | LOW | Phases 1-2 |
| Phase 9 | LOW | 1-2 days | LOW | Phases 1-2 |

## Estimated Timeline

- **Phase 1-2 + 10**: 8-11 days (Core functionality)
- **Phase 3-6**: 6-10 days (Pattern implementations)
- **Phase 7-9**: 3-6 days (Advanced features)
- **Testing & Integration**: 3-5 days
- **Total**: **20-32 days** for complete implementation

## Next Steps

1. **Start with Phase 1** - Complete core calculator implementations
2. **Move to Phase 2** - Implement strategy pattern classes
3. **Complete Phase 10** - Finish the system manager
4. **Add tests** for each component as you implement
5. **Iterate and refine** based on usage patterns

This implementation plan will transform your well-architected unit system from a framework into a fully functional, production-ready responsive calculation engine.
