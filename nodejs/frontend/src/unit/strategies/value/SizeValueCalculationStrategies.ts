import type { ISizeValueCalculationStrategy } from './ISizeValueCalculationStrategy';
import type { UnitContext } from '../../interfaces/IUnit';
import { SizeValue } from '../../enums/SizeValue';
import { SizeUnit } from '../../enums/SizeUnit';
import { Dimension } from '../../enums/Dimension';
import { DEFAULT_FALLBACK_VALUES } from '../../constants';
import { Logger } from '../../../core/Logger';

/**
 * Pixel Size Value Calculation Strategy
 * Handles pixel-based size calculations
 */
export class PixelSizeValueCalculationStrategy implements ISizeValueCalculationStrategy {
  readonly strategyId = 'pixel-size-calculation';
  readonly sizeValue = SizeValue.PIXEL;
  readonly sizeUnit = SizeUnit.PIXEL;
  readonly dimension = Dimension.WIDTH;

  canHandle(sizeValue: SizeValue | number, _sizeUnit: SizeUnit, _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH): boolean {
    // Handle both numeric values and SizeValue.PIXEL enum
    return (typeof sizeValue === 'number') || (sizeValue === SizeValue.PIXEL && _sizeUnit === SizeUnit.PIXEL);
  }

  calculate(
    sizeValue: SizeValue | number,
    _sizeUnit: SizeUnit,
    _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
    _context: UnitContext
  ): number {
    const logger = Logger.getInstance();
    logger.debug('PixelSizeValueCalculationStrategy', 'calculate', 'Calculating pixel size', {
      sizeValue,
      sizeUnit: _sizeUnit,
      dimension: _dimension
    });

    // For pixel values, return the value directly
    if (typeof sizeValue === 'number') {
      return sizeValue;
    }

    // Default fallback
    return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  getPriority(): number {
    return 1; // High priority for pixel calculations
  }

  validateContext(_context: UnitContext): boolean {
    return true; // Pixel calculations don't require specific context
  }

  getDescription(): string {
    return 'Handles pixel-based size calculations';
  }
}

/**
 * Fill Size Value Calculation Strategy
 * Handles fill-based size calculations
 */
export class FillSizeValueCalculationStrategy implements ISizeValueCalculationStrategy {
  readonly strategyId = 'fill-size-calculation';
  readonly sizeValue = SizeValue.FILL;
  readonly sizeUnit = SizeUnit.PARENT_WIDTH;
  readonly dimension = Dimension.WIDTH;

  canHandle(sizeValue: SizeValue, _sizeUnit: SizeUnit, _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH): boolean {
    return sizeValue === SizeValue.FILL;
  }

  calculate(
    sizeValue: SizeValue,
    sizeUnit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
    context: UnitContext
  ): number {
    const logger = Logger.getInstance();
    logger.debug('FillSizeValueCalculationStrategy', 'calculate', 'Calculating fill size', {
      sizeValue,
      sizeUnit,
      dimension
    });

    // For FILL values, always use scene dimensions first (matching original behavior)
    if (context.scene) {
      if (dimension === Dimension.WIDTH) {
        return context.scene.width;
      } else if (dimension === Dimension.HEIGHT) {
        return context.scene.height;
      } else if (dimension === Dimension.BOTH) {
        return Math.min(context.scene.width, context.scene.height);
      }
    }

    if (context.viewport) {
      if (dimension === Dimension.WIDTH) {
        return context.viewport.width;
      } else if (dimension === Dimension.HEIGHT) {
        return context.viewport.height;
      } else if (dimension === Dimension.BOTH) {
        return Math.min(context.viewport.width, context.viewport.height);
      }
    }

    if (context.parent) {
      if (dimension === Dimension.WIDTH) {
        return context.parent.width;
      } else if (dimension === Dimension.HEIGHT) {
        return context.parent.height;
      } else if (dimension === Dimension.BOTH) {
        return Math.max(context.parent.width, context.parent.height);
      }
    }

    return DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT;
  }

  getPriority(): number {
    return 2;
  }

  validateContext(context: UnitContext): boolean {
    return !!(context.parent || context.scene);
  }

  getDescription(): string {
    return 'Handles fill-based size calculations using parent or scene dimensions';
  }
}

/**
 * Auto Size Value Calculation Strategy
 * Handles auto-based size calculations
 */
export class AutoSizeValueCalculationStrategy implements ISizeValueCalculationStrategy {
  readonly strategyId = 'auto-size-calculation';
  readonly sizeValue = SizeValue.AUTO;
  readonly sizeUnit = SizeUnit.AUTO;
  readonly dimension = Dimension.WIDTH;

  canHandle(sizeValue: SizeValue, _sizeUnit: SizeUnit, _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH): boolean {
    return sizeValue === SizeValue.AUTO;
  }

  calculate(
    sizeValue: SizeValue,
    sizeUnit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
    context: UnitContext
  ): number {
    const logger = Logger.getInstance();
    logger.debug('AutoSizeValueCalculationStrategy', 'calculate', 'Calculating auto size', {
      sizeValue,
      sizeUnit,
      dimension
    });

    // Auto size calculation based on content
    if (context.content) {
      if (dimension === Dimension.WIDTH) {
        return context.content.width;
      } else if (dimension === Dimension.HEIGHT) {
        return context.content.height;
      } else if (dimension === Dimension.BOTH) {
        return Math.max(context.content.width, context.content.height);
      }
    }

    // Fallback to default auto size
    return DEFAULT_FALLBACK_VALUES.SIZE.CONTENT;
  }

  getPriority(): number {
    return 3;
  }

  validateContext(context: UnitContext): boolean {
    return !!context.content;
  }

  getDescription(): string {
    return 'Handles auto-based size calculations using content dimensions';
  }
}

/**
 * Parent Width Size Value Calculation Strategy
 * Handles parent-width-based size calculations
 */
export class ParentWidthSizeValueCalculationStrategy implements ISizeValueCalculationStrategy {
  readonly strategyId = 'parent-width-size-calculation';
  readonly sizeValue = SizeValue.PARENT_WIDTH;
  readonly sizeUnit = SizeUnit.PARENT_WIDTH;
  readonly dimension = Dimension.WIDTH;

  canHandle(sizeValue: SizeValue, sizeUnit: SizeUnit, _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH): boolean {
    return sizeValue === SizeValue.PARENT_WIDTH && sizeUnit === SizeUnit.PARENT_WIDTH;
  }

  calculate(
    sizeValue: SizeValue,
    sizeUnit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
    context: UnitContext
  ): number {
    const logger = Logger.getInstance();
    logger.debug('ParentWidthSizeValueCalculationStrategy', 'calculate', 'Calculating parent width size', {
      sizeValue,
      sizeUnit,
      dimension
    });

    if (context.parent) {
      return context.parent.width;
    }

    return DEFAULT_FALLBACK_VALUES.SIZE.PARENT;
  }

  getPriority(): number {
    return 4;
  }

  validateContext(context: UnitContext): boolean {
    return !!context.parent;
  }

  getDescription(): string {
    return 'Handles parent-width-based size calculations';
  }
}

/**
 * Viewport Width Size Value Calculation Strategy
 * Handles viewport-width-based size calculations
 */
export class ViewportWidthSizeValueCalculationStrategy implements ISizeValueCalculationStrategy {
  readonly strategyId = 'viewport-width-size-calculation';
  readonly sizeValue = SizeValue.VIEWPORT_WIDTH;
  readonly sizeUnit = SizeUnit.VIEWPORT_WIDTH;
  readonly dimension = Dimension.WIDTH;

  canHandle(sizeValue: SizeValue, sizeUnit: SizeUnit, _dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH): boolean {
    return sizeValue === SizeValue.VIEWPORT_WIDTH && sizeUnit === SizeUnit.VIEWPORT_WIDTH;
  }

  calculate(
    sizeValue: SizeValue,
    sizeUnit: SizeUnit,
    dimension: Dimension.WIDTH | Dimension.HEIGHT | Dimension.BOTH,
    context: UnitContext
  ): number {
    const logger = Logger.getInstance();
    logger.debug('ViewportWidthSizeValueCalculationStrategy', 'calculate', 'Calculating viewport width size', {
      sizeValue,
      sizeUnit,
      dimension
    });

    if (context.viewport) {
      return context.viewport.width;
    }

    return DEFAULT_FALLBACK_VALUES.SIZE.VIEWPORT;
  }

  getPriority(): number {
    return 5;
  }

  validateContext(context: UnitContext): boolean {
    return !!context.viewport;
  }

  getDescription(): string {
    return 'Handles viewport-width-based size calculations';
  }
}
