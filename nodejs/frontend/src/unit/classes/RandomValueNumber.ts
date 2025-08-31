import type { IRandomValueNumber } from '../interfaces/IRandomValue';

/**
 * Concrete implementation of RandomValueNumber
 * Now part of the unit system for generating random values
 */
export class RandomValueNumber implements IRandomValueNumber {
  constructor(
    public min: number,
    public max: number,
    public current: number = min
  ) {
    if (min > max) {
      throw new Error('min cannot be greater than max');
    }
    if (current < min || current > max) {
      this.current = min;
    }
  }

  getRandomValue(): number {
    this.current = Math.random() * (this.max - this.min) + this.min;
    return this.current;
  }

  setCurrentValue(value: number): void {
    if (value >= this.min && value <= this.max) {
      this.current = value;
    } else {
      throw new Error(`Value ${value} is outside the range [${this.min}, ${this.max}]`);
    }
  }

  /** Get a random integer value */
  getRandomInt(): number {
    this.current = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
    return this.current;
  }

  /** Get a random value with specified decimal places */
  getRandomValueWithDecimals(decimals: number): number {
    const factor = Math.pow(10, decimals);
    this.current = Math.round((Math.random() * (this.max - this.min) + this.min) * factor) / factor;
    return this.current;
  }

  /** Clone the random value with optional modifications */
  clone(overrides?: Partial<IRandomValueNumber>): RandomValueNumber {
    return new RandomValueNumber(
      overrides?.min ?? this.min,
      overrides?.max ?? this.max,
      overrides?.current ?? this.current
    );
  }

  /** Validate if the random value is within bounds */
  validate(): boolean {
    return this.min <= this.max && this.current >= this.min && this.current <= this.max;
  }

  /** Get the range of possible values */
  getRange(): { min: number; max: number } {
    return { min: this.min, max: this.max };
  }

  /** Check if a value is within the valid range */
  isInRange(value: number): boolean {
    return value >= this.min && value <= this.max;
  }
}
