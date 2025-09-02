import type { IUnit } from '../interfaces/IUnit';
import type { UnitContext } from '../interfaces/IUnit';
import type { ILegacyUnit } from '../interfaces/ILegacyUnit';
import { UnitType } from '../enums/UnitType';

/**
 * Unit Adapter Interface
 * Allows legacy unit types to work with the new unit system
 */
export interface IUnitAdapter<T = ILegacyUnit> extends IUnit {
  /** Get the adapted legacy unit */
  getAdaptedUnit(): T;

  /** Check if the adapter can handle the legacy unit type */
  canAdapt(legacyUnit: ILegacyUnit): boolean;

  /** Get the legacy unit type name */
  getLegacyTypeName(): string;

  /** Get the conversion factor used for adaptation */
  getConversionFactor(): number;

  /** Check if the adapter is bidirectional */
  isBidirectional(): boolean;

  /** Convert back to legacy format if possible */
  toLegacyFormat(): ILegacyUnit;
}

/**
 * Base Unit Adapter Implementation
 * Provides common functionality for unit adapters
 */
export abstract class BaseUnitAdapter<T = ILegacyUnit> implements IUnitAdapter<T> {
  protected readonly conversionFactor: number = 1;
  protected readonly bidirectional: boolean = false;

  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly unitType: UnitType,
    protected readonly adaptedUnit: T
  ) {}

  // IUnit interface implementation
  abstract calculate(context: UnitContext): number;
  abstract isResponsive(): boolean;

  get isActive(): boolean {
    return true; // Adapters are always active
  }

  validate(_context: UnitContext): boolean {
    return this.adaptedUnit !== null && this.adaptedUnit !== undefined;
  }

  toString(): string {
    return `${this.constructor.name}(${this.id}, ${this.name})`;
  }

  clone(overrides?: Partial<IUnit>): IUnit {
    const cloned = Object.create(Object.getPrototypeOf(this));
    Object.assign(cloned, this, overrides);
    return cloned;
  }

  // IUnitAdapter interface implementation
  getAdaptedUnit(): T {
    return this.adaptedUnit;
  }

  canAdapt(legacyUnit: ILegacyUnit): boolean {
    return this.getLegacyTypeName() === legacyUnit?.constructor?.name;
  }

  getLegacyTypeName(): string {
    return this.adaptedUnit?.constructor?.name || 'Unknown';
  }

  getConversionFactor(): number {
    return this.conversionFactor;
  }

  isBidirectional(): boolean {
    return this.bidirectional;
  }

  toLegacyFormat(): ILegacyUnit {
    if (!this.bidirectional) {
      throw new Error('This adapter does not support bidirectional conversion');
    }
    return this.convertToLegacyFormat();
  }

  /**
   * Abstract method for converting back to legacy format
   */
  protected abstract convertToLegacyFormat(): ILegacyUnit;
}

/**
 * Unit Adapter Factory
 * Creates appropriate adapters for legacy units
 */
export interface IUnitAdapterFactory {
  /** Create an adapter for a legacy unit */
  createAdapter(legacyUnit: ILegacyUnit): IUnitAdapter | undefined;

  /** Register a new adapter type */
  registerAdapter(
    adapterType: string,
    adapterClass: new (...args: unknown[]) => IUnitAdapter
  ): void;

  /** Get all registered adapter types */
  getRegisteredAdapterTypes(): string[];

  /** Check if an adapter exists for a legacy unit type */
  hasAdapter(legacyUnit: ILegacyUnit): boolean;

  /** Get the best adapter for a legacy unit */
  getBestAdapter(legacyUnit: ILegacyUnit): IUnitAdapter | undefined;
}

/**
 * Unit Adapter Registry
 * Manages all available unit adapters
 */
export interface IUnitAdapterRegistry {
  /** Register an adapter */
  register(adapter: IUnitAdapter): void;

  /** Unregister an adapter */
  unregister(adapterId: string): boolean;

  /** Get an adapter by ID */
  getById(adapterId: string): IUnitAdapter | undefined;

  /** Get all adapters */
  getAll(): IUnitAdapter[];

  /** Get adapters by type */
  getByType(unitType: string): IUnitAdapter[];

  /** Clear all adapters */
  clear(): void;
}
