/**
 * RandomValue interface for generic random value generation
 * This is part of the unit system and can be used with any unit type
 */
export interface IRandomValue<T> {
  /** Current value */
  current: T
  /** Minimum value */
  min: T
  /** Maximum value */
  max: T
  /** Get a random value between min and max */
  getRandomValue(): T
  /** Set the current value */
  setCurrentValue(value: T): void
}

/**
 * RandomValueNumber for numeric random values
 * Now integrated with the unit system - can be used with SizeValue.RANDOM, PositionValue.RANDOM, etc.
 */
export interface IRandomValueNumber extends IRandomValue<number> {
  /** Current number value */
  current: number
  /** Minimum number value */
  min: number
  /** Maximum number value */
  max: number
  /** Get a random number between min and max */
  getRandomValue(): number
  /** Set the current number value */
  setCurrentValue(value: number): void
}
