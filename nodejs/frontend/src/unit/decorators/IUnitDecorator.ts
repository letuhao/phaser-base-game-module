import type { IUnit } from '../interfaces/IUnit'
import type { UnitContext } from '../interfaces/IUnit'
import { UnitType } from '../enums/UnitType'

/**
 * Unit Decorator Interface
 * Allows units to be wrapped with additional functionality
 */
export interface IUnitDecorator extends IUnit {
  /** Get the wrapped unit */
  getWrappedUnit(): IUnit
  
  /** Get the decorator type */
  getDecoratorType(): string
  
  /** Check if the decorator is enabled */
  isEnabled(): boolean
  
  /** Enable or disable the decorator */
  setEnabled(enabled: boolean): void
  
  /** Get decorator metadata */
  getMetadata(): {
    type: string
    priority: number
    description: string
    version: string
  }
  
  /** Get the decorator priority (higher = applied first) */
  getPriority(): number
  
  /** Check if this decorator can be applied to a unit */
  canDecorate(unit: IUnit): boolean
}

/**
 * Base Unit Decorator Implementation
 * Provides common functionality for unit decorators
 */
export abstract class BaseUnitDecorator implements IUnitDecorator {
  protected enabled: boolean = true
  protected readonly priority: number = 1
  protected readonly description: string = ''
  protected readonly version: string = '1.0.0'
  
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly unitType: UnitType,
    protected readonly wrappedUnit: IUnit
  ) {}
  
  // IUnit interface implementation - delegate to wrapped unit
  get isActive(): boolean {
    return this.wrappedUnit.isActive && this.enabled
  }
  
  calculate(context: UnitContext): number {
    if (!this.enabled) {
      return this.wrappedUnit.calculate(context)
    }
    
    // Apply pre-calculation logic
    this.beforeCalculation(context)
    
    // Calculate using wrapped unit
    const result = this.performCalculation(context)
    
    // Apply post-calculation logic
    this.afterCalculation(result, context)
    
    return result
  }
  
  isResponsive(): boolean {
    return this.wrappedUnit.isResponsive()
  }
  
  validate(context: UnitContext): boolean {
    return this.wrappedUnit.validate(context) && this.validateDecorator(context)
  }
  
  toString(): string {
    return `${this.constructor.name}(${this.id}, ${this.name}) -> ${this.wrappedUnit.toString()}`
  }
  
  clone(overrides?: Partial<IUnit>): IUnit {
    const cloned = Object.create(Object.getPrototypeOf(this))
    Object.assign(cloned, this, overrides)
    return cloned
  }
  
  // IUnitDecorator interface implementation
  getWrappedUnit(): IUnit {
    return this.wrappedUnit
  }
  
  getDecoratorType(): string {
    return this.constructor.name
  }
  
  isEnabled(): boolean {
    return this.enabled
  }
  
  setEnabled(enabled: boolean): void {
    this.enabled = enabled
  }
  
  getMetadata() {
    return {
      type: this.getDecoratorType(),
      priority: this.priority,
      description: this.description,
      version: this.version
    }
  }
  
  getPriority(): number {
    return this.priority
  }
  
  canDecorate(_unit: IUnit): boolean {
    return true // Default implementation allows decorating any unit
  }
  
  /**
   * Abstract methods that subclasses must implement
   */
  protected abstract performCalculation(context: UnitContext): number
  protected abstract validateDecorator(context: UnitContext): boolean
  
  /**
   * Hook methods that subclasses can override
   */
  protected beforeCalculation(_context: UnitContext): void {
    // Default implementation - can be overridden
  }
  
  protected afterCalculation(_result: number, _context: UnitContext): void {
    // Default implementation - can be overridden
  }
}

/**
 * Unit Decorator Chain
 * Manages multiple decorators applied to a single unit
 */
export interface IUnitDecoratorChain {
  /** Add a decorator to the chain */
  addDecorator(decorator: IUnitDecorator): void
  
  /** Remove a decorator from the chain */
  removeDecorator(decoratorId: string): boolean
  
  /** Get all decorators in the chain */
  getDecorators(): IUnitDecorator[]
  
  /** Get decorators by type */
  getDecoratorsByType(type: string): IUnitDecorator[]
  
  /** Sort decorators by priority */
  sortByPriority(): void
  
  /** Apply all decorators to a unit */
  applyDecorators(unit: IUnit): IUnit
  
  /** Check if the chain has decorators */
  hasDecorators(): boolean
  
  /** Clear all decorators */
  clear(): void
}

/**
 * Unit Decorator Registry
 * Manages all available unit decorators
 */
export interface IUnitDecoratorRegistry {
  /** Register a decorator type */
  registerDecoratorType(type: string, decoratorClass: new (...args: any[]) => IUnitDecorator): void
  
  /** Create a decorator instance */
  createDecorator(type: string, unit: IUnit, ...args: any[]): IUnitDecorator | undefined
  
  /** Get all registered decorator types */
  getRegisteredTypes(): string[]
  
  /** Check if a decorator type is registered */
  hasDecoratorType(type: string): boolean
  
  /** Get decorator metadata */
  getDecoratorMetadata(type: string): any
}
