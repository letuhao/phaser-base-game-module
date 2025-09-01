import type { IPositionValueCalculationStrategy } from '../value-calculation/IPositionValueCalculationStrategy';
import type { UnitContext } from '../../interfaces/IUnit';
import { PositionValue } from '../../enums/PositionValue';
import { PositionUnit } from '../../enums/PositionUnit';
import { AxisUnit } from '../../enums/AxisUnit';
import { DEFAULT_FALLBACK_VALUES } from '../../constants';
import { Logger } from '../../../core/Logger';

/**
 * Pixel Position Value Calculation Strategy
 * Handles pixel-based position calculations
 */
export class PixelPositionValueCalculationStrategy implements IPositionValueCalculationStrategy {
  readonly strategyId = 'pixel-position-calculation';
  readonly positionValue = PositionValue.PIXEL;
  readonly positionUnit = PositionUnit.PIXEL;
  readonly axisUnit = AxisUnit.X;

  canHandle(positionValue: PositionValue, positionUnit: PositionUnit, _axisUnit: AxisUnit): boolean {
    return positionValue === PositionValue.PIXEL && positionUnit === PositionUnit.PIXEL;
  }

  calculate(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    _axisUnit: AxisUnit,
    _context: UnitContext
  ): number {
    const logger = Logger.getInstance();
    logger.debug('PixelPositionValueCalculationStrategy', 'calculate', 'Calculating pixel position', {
      positionValue,
      positionUnit,
      axisUnit: _axisUnit
    });

    // For pixel values, return the value directly
    if (typeof positionValue === 'number') {
      return positionValue;
    }

    // Default fallback
    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  getPriority(): number {
    return 1; // High priority for pixel calculations
  }

  validateContext(_context: UnitContext): boolean {
    return true; // Pixel calculations don't require specific context
  }

  getDescription(): string {
    return 'Handles pixel-based position calculations';
  }
}

/**
 * Center Position Value Calculation Strategy
 * Handles center-based position calculations
 */
export class CenterPositionValueCalculationStrategy implements IPositionValueCalculationStrategy {
  readonly strategyId = 'center-position-calculation';
  readonly positionValue = PositionValue.CENTER;
  readonly positionUnit = PositionUnit.CENTER;
  readonly axisUnit = AxisUnit.X;

  canHandle(positionValue: PositionValue, _positionUnit: PositionUnit, _axisUnit: AxisUnit): boolean {
    return positionValue === PositionValue.CENTER;
  }

  calculate(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    axisUnit: AxisUnit,
    context: UnitContext
  ): number {
    const logger = Logger.getInstance();
    logger.debug('CenterPositionValueCalculationStrategy', 'calculate', 'Calculating center position', {
      positionValue,
      positionUnit,
      axisUnit
    });

    // Calculate center position based on scene first (matching original logic)
    if (context.scene) {
      if (axisUnit === AxisUnit.X) {
        return context.scene.width / 2;
      } else if (axisUnit === AxisUnit.Y) {
        return context.scene.height / 2;
      }
    }

    // Fallback to parent
    if (context.parent) {
      if (axisUnit === AxisUnit.X) {
        return context.parent.width / 2;
      } else if (axisUnit === AxisUnit.Y) {
        return context.parent.height / 2;
      }
    }

    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  getPriority(): number {
    return 2;
  }

  validateContext(context: UnitContext): boolean {
    return !!(context.parent || context.scene);
  }

  getDescription(): string {
    return 'Handles center-based position calculations using parent or scene dimensions';
  }
}

/**
 * Content Left Position Value Calculation Strategy
 * Handles content-left-based position calculations
 */
export class ContentLeftPositionValueCalculationStrategy implements IPositionValueCalculationStrategy {
  readonly strategyId = 'content-left-position-calculation';
  readonly positionValue = PositionValue.CONTENT_LEFT;
  readonly positionUnit = PositionUnit.CONTENT_LEFT;
  readonly axisUnit = AxisUnit.X;

  canHandle(positionValue: PositionValue, _positionUnit: PositionUnit, _axisUnit: AxisUnit): boolean {
    return positionValue === PositionValue.CONTENT_LEFT;
  }

  calculate(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    axisUnit: AxisUnit,
    context: UnitContext
  ): number {
    const logger = Logger.getInstance();
    logger.debug('ContentLeftPositionValueCalculationStrategy', 'calculate', 'Calculating content left position', {
      positionValue,
      positionUnit,
      axisUnit
    });

    // Content left position calculation based on content or default
    if (context.content) {
      if (axisUnit === AxisUnit.X) {
        return 0; // Content left edge
      } else if (axisUnit === AxisUnit.Y) {
        return 0; // Content top edge
      }
    }

    // Fallback to default position
    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  getPriority(): number {
    return 3;
  }

  validateContext(context: UnitContext): boolean {
    return !!context.content;
  }

  getDescription(): string {
    return 'Handles content-left-based position calculations using content position';
  }
}

/**
 * Parent Center X Position Value Calculation Strategy
 * Handles parent-center-x-based position calculations
 */
export class ParentCenterXPositionValueCalculationStrategy implements IPositionValueCalculationStrategy {
  readonly strategyId = 'parent-center-x-position-calculation';
  readonly positionValue = PositionValue.PARENT_CENTER_X;
  readonly positionUnit = PositionUnit.PARENT_CENTER_X;
  readonly axisUnit = AxisUnit.X;

  canHandle(positionValue: PositionValue, positionUnit: PositionUnit, _axisUnit: AxisUnit): boolean {
    return positionValue === PositionValue.PARENT_CENTER_X && positionUnit === PositionUnit.PARENT_CENTER_X;
  }

  calculate(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    axisUnit: AxisUnit,
    context: UnitContext
  ): number {
    const logger = Logger.getInstance();
    logger.debug('ParentCenterXPositionValueCalculationStrategy', 'calculate', 'Calculating parent center X position', {
      positionValue,
      positionUnit,
      axisUnit
    });

    if (context.parent) {
      if (axisUnit === AxisUnit.X) {
        return context.parent.width / 2;
      } else if (axisUnit === AxisUnit.Y) {
        return context.parent.height / 2;
      }
    }

    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  getPriority(): number {
    return 4;
  }

  validateContext(context: UnitContext): boolean {
    return !!context.parent;
  }

  getDescription(): string {
    return 'Handles parent-center-x-based position calculations';
  }
}

/**
 * Scene Center X Position Value Calculation Strategy
 * Handles scene-center-x-based position calculations
 */
export class SceneCenterXPositionValueCalculationStrategy implements IPositionValueCalculationStrategy {
  readonly strategyId = 'scene-center-x-position-calculation';
  readonly positionValue = PositionValue.SCENE_CENTER_X;
  readonly positionUnit = PositionUnit.SCENE_CENTER_X;
  readonly axisUnit = AxisUnit.X;

  canHandle(positionValue: PositionValue, positionUnit: PositionUnit, _axisUnit: AxisUnit): boolean {
    return positionValue === PositionValue.SCENE_CENTER_X && positionUnit === PositionUnit.SCENE_CENTER_X;
  }

  calculate(
    positionValue: PositionValue,
    positionUnit: PositionUnit,
    axisUnit: AxisUnit,
    context: UnitContext
  ): number {
    const logger = Logger.getInstance();
    logger.debug('SceneCenterXPositionValueCalculationStrategy', 'calculate', 'Calculating scene center X position', {
      positionValue,
      positionUnit,
      axisUnit
    });

    if (context.scene) {
      if (axisUnit === AxisUnit.X) {
        return context.scene.width / 2;
      } else if (axisUnit === AxisUnit.Y) {
        return context.scene.height / 2;
      }
    }

    return DEFAULT_FALLBACK_VALUES.POSITION.DEFAULT;
  }

  getPriority(): number {
    return 5;
  }

  validateContext(context: UnitContext): boolean {
    return !!context.scene;
  }

  getDescription(): string {
    return 'Handles scene-center-x-based position calculations';
  }
}
