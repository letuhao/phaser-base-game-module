/**
 * Unit System Enums Index
 *
 * Centralized exports for all unit system enums.
 * Provides a single import point for unit-related enums.
 */

// ============================================================================
// MAIN UNIT ENUMS
// ============================================================================

export {
  // Core Unit Enums
  UnitType,
} from './UnitType';

export {
  // Dimension Enums
  Dimension,
} from './Dimension';

export {
  // Axis Unit Enums
  AxisUnit,
} from './AxisUnit';

export {
  // Position Enums
  PositionUnit,
} from './PositionUnit';

export { PositionValue } from './PositionValue';

export {
  // Size Enums
  SizeUnit,
} from './SizeUnit';

export { SizeValue } from './SizeValue';

export {
  // Scale Enums
  ScaleUnit,
} from './ScaleUnit';

export { ScaleValue } from './ScaleValue';

export {
  // Template Enums
  TemplateInputType,
} from './TemplateInputType';

export {
  // Logging Enums
  LogLevel,
  LOG_LEVEL_PRIORITIES,
  isValidLogLevel,
  getLogLevelPriority,
  shouldLogLevel,
} from './LogLevel';

export {
  // Validation Enums
  ValidationType,
  isValidValidationType,
  getValidationTypeDisplayName,
  getValidationTypeDescription,
} from './ValidationType';

export {
  // Calculation Strategy Enums
  CalculationStrategy,
  isValidCalculationStrategy,
  getCalculationStrategyDisplayName,
  getCalculationStrategyDescription,
} from './CalculationStrategy';

// ============================================================================
// CONVENIENCE RE-EXPORTS
// ============================================================================

// Re-export commonly used enums with shorter names
export { UnitType as Unit } from './UnitType';

export { Dimension as Dim } from './Dimension';

export { AxisUnit as Axis } from './AxisUnit';

export { PositionUnit as PosUnit } from './PositionUnit';

export { PositionValue as PosVal } from './PositionValue';

export { SizeUnit as Size } from './SizeUnit';

export { SizeValue as SizeVal } from './SizeValue';

export { ScaleUnit as Scale } from './ScaleUnit';

export { ScaleValue as ScaleVal } from './ScaleValue';

export { TemplateInputType as TemplateType } from './TemplateInputType';

export { LogLevel as Log } from './LogLevel';
