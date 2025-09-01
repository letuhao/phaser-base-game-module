import type { IScaleValueCalculationStrategy } from '../value-calculation/IScaleValueCalculationStrategy';
import type { UnitContext } from '../../interfaces/IUnit';
import { ScaleValue } from '../../enums/ScaleValue';
import { ScaleUnit } from '../../enums/ScaleUnit';
import { DEFAULT_FALLBACK_VALUES } from '../../constants';
import { Logger } from '../../../core/Logger';

/**
 * Pixel Scale Value Calculation Strategy
 * Handles pixel-based scale calculations
 */
export class PixelScaleValueCalculationStrategy implements IScaleValueCalculationStrategy {
  readonly strategyId = 'pixel-scale-calculation';
  readonly scaleValue = ScaleValue.FACTOR;
  readonly scaleUnit = ScaleUnit.FACTOR;

  canHandle(scaleValue: ScaleValue, scaleUnit: ScaleUnit): boolean {
    return scaleValue === ScaleValue.FACTOR && scaleUnit === ScaleUnit.FACTOR;
  }

  calculate(
    scaleValue: ScaleValue,
    scaleUnit: ScaleUnit,
    _context: UnitContext
  ): number {
    const logger = Logger.getInstance();
    logger.debug('PixelScaleValueCalculationStrategy', 'calculate', 'Calculating pixel scale', {
      scaleValue,
      scaleUnit
    });

    // For pixel values, return the value directly
    if (typeof scaleValue === 'number') {
      return scaleValue;
    }

    // Default fallback
    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  getPriority(): number {
    return 1; // High priority for pixel calculations
  }

  validateContext(_context: UnitContext): boolean {
    return true; // Pixel calculations don't require specific context
  }

  getDescription(): string {
    return 'Handles pixel-based scale calculations';
  }
}

/**
 * Factor Scale Value Calculation Strategy
 * Handles factor-based scale calculations
 */
export class FactorScaleValueCalculationStrategy implements IScaleValueCalculationStrategy {
  readonly strategyId = 'factor-scale-calculation';
  readonly scaleValue = ScaleValue.FACTOR;
  readonly scaleUnit = ScaleUnit.FACTOR;

  canHandle(scaleValue: ScaleValue, _scaleUnit: ScaleUnit): boolean {
    return scaleValue === ScaleValue.FACTOR;
  }

  calculate(
    scaleValue: ScaleValue,
    scaleUnit: ScaleUnit,
    _context: UnitContext
  ): number {
    const logger = Logger.getInstance();
    logger.debug('FactorScaleValueCalculationStrategy', 'calculate', 'Calculating factor scale', {
      scaleValue,
      scaleUnit
    });

    // Factor scale calculation
    if (typeof scaleValue === 'number') {
      return scaleValue;
    }

    return DEFAULT_FALLBACK_VALUES.SCALE.FACTOR;
  }

  getPriority(): number {
    return 2;
  }

  validateContext(_context: UnitContext): boolean {
    return true; // Factor calculations don't require specific context
  }

  getDescription(): string {
    return 'Handles factor-based scale calculations';
  }
}

/**
 * Responsive Scale Value Calculation Strategy
 * Handles responsive-based scale calculations
 */
export class ResponsiveScaleValueCalculationStrategy implements IScaleValueCalculationStrategy {
  readonly strategyId = 'responsive-scale-calculation';
  readonly scaleValue = ScaleValue.FIT;
  readonly scaleUnit = ScaleUnit.FACTOR; // FIT behavior with factor measurement

  canHandle(scaleValue: ScaleValue, _scaleUnit: ScaleUnit): boolean {
    return scaleValue === ScaleValue.FIT;
  }

  calculate(
    scaleValue: ScaleValue,
    scaleUnit: ScaleUnit,
    context: UnitContext
  ): number {
    const logger = Logger.getInstance();
    logger.debug('ResponsiveScaleValueCalculationStrategy', 'calculate', 'Calculating responsive scale', {
      scaleValue,
      scaleUnit
    });

    // Responsive scale calculation based on viewport or scene
    if (context.viewport) {
      const viewportWidth = context.viewport.width;
      if (viewportWidth < 768) {
        return 0.8; // Mobile scale
      } else if (viewportWidth < 1024) {
        return 0.9; // Tablet scale
      } else {
        return 1.0; // Desktop scale
      }
    }

    if (context.scene) {
      const sceneWidth = context.scene.width;
      if (sceneWidth < 800) {
        return 0.8;
      } else if (sceneWidth < 1200) {
        return 0.9;
      } else {
        return 1.0;
      }
    }

    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  getPriority(): number {
    return 3;
  }

  validateContext(context: UnitContext): boolean {
    return !!(context.viewport || context.scene);
  }

  getDescription(): string {
    return 'Handles responsive-based scale calculations using viewport or scene dimensions';
  }
}

/**
 * Random Scale Value Calculation Strategy
 * Handles random-based scale calculations
 */
export class RandomScaleValueCalculationStrategy implements IScaleValueCalculationStrategy {
  readonly strategyId = 'random-scale-calculation';
  readonly scaleValue = ScaleValue.RANDOM;
  readonly scaleUnit = ScaleUnit.FACTOR; // RANDOM behavior with factor measurement

  canHandle(scaleValue: ScaleValue, _scaleUnit: ScaleUnit): boolean {
    return scaleValue === ScaleValue.RANDOM;
  }

  calculate(
    scaleValue: ScaleValue,
    scaleUnit: ScaleUnit,
    _context: UnitContext
  ): number {
    const logger = Logger.getInstance();
    logger.debug('RandomScaleValueCalculationStrategy', 'calculate', 'Calculating random scale', {
      scaleValue,
      scaleUnit
    });

    // Random scale calculation within bounds
    const min = DEFAULT_FALLBACK_VALUES.SCALE.RANDOM_MIN;
    const max = DEFAULT_FALLBACK_VALUES.SCALE.RANDOM_MAX;
    return Math.random() * (max - min) + min;
  }

  getPriority(): number {
    return 4;
  }

  validateContext(_context: UnitContext): boolean {
    return true; // Random calculations don't require specific context
  }

  getDescription(): string {
    return 'Handles random-based scale calculations within defined bounds';
  }
}

/**
 * Content Scale Value Calculation Strategy
 * Handles content-based scale calculations
 */
export class ContentScaleValueCalculationStrategy implements IScaleValueCalculationStrategy {
  readonly strategyId = 'content-scale-calculation';
  readonly scaleValue = ScaleValue.CONTENT_SCALE;
  readonly scaleUnit = ScaleUnit.FACTOR; // CONTENT_SCALE behavior with factor measurement

  canHandle(scaleValue: ScaleValue, _scaleUnit: ScaleUnit): boolean {
    return scaleValue === ScaleValue.CONTENT_SCALE;
  }

  calculate(
    scaleValue: ScaleValue,
    scaleUnit: ScaleUnit,
    context: UnitContext
  ): number {
    const logger = Logger.getInstance();
    logger.debug('ContentScaleValueCalculationStrategy', 'calculate', 'Calculating content scale', {
      scaleValue,
      scaleUnit
    });

    // Content-based scale calculation
    if (context.content) {
      const contentWidth = context.content.width;
      const contentHeight = context.content.height;
      
      // Calculate scale based on content dimensions
      if (context.parent) {
        const scaleX = context.parent.width / contentWidth;
        const scaleY = context.parent.height / contentHeight;
        return Math.min(scaleX, scaleY, 1.0); // Don't scale up beyond 1.0
      }
    }

    return DEFAULT_FALLBACK_VALUES.SCALE.DEFAULT;
  }

  getPriority(): number {
    return 5;
  }

  validateContext(context: UnitContext): boolean {
    return !!(context.content && context.parent);
  }

  getDescription(): string {
    return 'Handles content-based scale calculations using content and parent dimensions';
  }
}
