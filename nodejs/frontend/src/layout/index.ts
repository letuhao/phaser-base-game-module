/**
 * Layout System - Main Export
 * 
 * This module exports all constants and enums for the layout system.
 * Based on the best patterns from the existing codebase.
 * 
 * IMPORTANT: This system is fully compatible with the existing Unit System.
 * We import and re-export Unit System enums to ensure seamless integration.
 */

// ============================================================================
// UNIT SYSTEM INTEGRATION
// ============================================================================

// Re-export Unit System enums for compatibility
export {
  // Core Unit System enums
  SizeUnit,
  PositionUnit,
  ScaleUnit,
  UnitType,
  Dimension,
  AxisUnit,
  SizeValue,
  PositionValue,
  ScaleValue,
  TemplateInputType,
} from '../unit';

// Re-export Unit System types
export type {
  IUnit,
  ISizeUnit,
  IPositionUnit,
  IScaleUnit,
  IRandomValue,
  ITemplateInput,
  IUnitConfig,
  IValidationInput,
  ILegacyUnit,
  IStrategyInput,
  UnitValue,
} from '../unit';

// Re-export Unit System classes
export {
  // Unit System calculators
  SizeUnitCalculator,
  PositionUnitCalculator,
  ScaleUnitCalculator,
  UnitCalculatorFactory,
  RandomValueNumber,
  
  // Unit System strategies
  IUnitStrategy,
  SizeUnitStrategy,
  PositionUnitStrategy,
  ScaleUnitStrategy,
  MixedUnitStrategy,
  
  // Unit System commands
  IUnitCommand,
  CalculateSizeCommand,
  CalculatePositionCommand,
  BatchCalculationCommand,
  
  // Unit System observers
  IUnitObserver,
  PerformanceObserver,
  LoggingObserver,
  
  // Unit System validators
  IUnitValidator,
  RangeValidator,
  TypeValidator,
  
  // Unit System templates
  IUnitCalculationTemplate,
  SizeCalculationTemplate,
  PositionCalculationTemplate,
  ScaleCalculationTemplate,
  
  // Unit System patterns
  IUnitComposite,
  IUnitAdapter,
  IUnitDecorator,
  
  // Unit System manager
  UnitSystemManager,
} from '../unit';

// ============================================================================
// LAYOUT SYSTEM CONSTANTS
// ============================================================================

export {
  BREAKPOINT_CONSTANTS,
  LAYOUT_CONSTANTS,
  SIZE_CONSTANTS,
  SPACING_CONSTANTS,
  COLOR_CONSTANTS,
  TYPOGRAPHY_CONSTANTS,
  ANIMATION_CONSTANTS,
  DEVICE_CONSTANTS,
  PERFORMANCE_CONSTANTS,
  VALIDATION_CONSTANTS,
  LOGGING_CONSTANTS,
  LAYOUT_SYSTEM_CONSTANTS,
} from './constants/LayoutConstants';

// ============================================================================
// LAYOUT SYSTEM ENUMS
// ============================================================================

export {
  // Breakpoint enums
  BreakpointName,
  BreakpointCondition,
  
  // Layout enums
  LayoutType,
  Alignment,
  PositionType,
  OverflowType,
  ZIndexLayer,
  
  // Spacing enums
  SpacingScale,
  MarginValue,
  PaddingValue,
  
  // Color enums
  ColorName,
  ColorOpacity,
  BlendMode,
  
  // Typography enums
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  TextAlign,
  
  // Animation enums
  AnimationDuration,
  AnimationEasing,
  AnimationProperty,
  
  // Device enums
  DeviceType,
  DeviceOrientation,
  DeviceCapability,
  
  // Performance enums
  UpdateFrequency,
  PerformanceLevel,
  
  // Validation enums
  ValidationRule,
  ValidationSeverity,
  
  // Logging enums
  LogLevel,
  LogCategory,
  
  // GameObject enums
  GameObjectType,
  GameObjectState,
  
  // Theme enums
  ThemeType,
  ThemeVariant,
  
  // Strategy enums
  LayoutStrategy,
  ScaleStrategy,
  
  // All enums bundle
  LAYOUT_SYSTEM_ENUMS,
} from './enums/LayoutEnums';

// ============================================================================
// TYPE EXPORTS
// ============================================================================

// Import enums for type generation
import { BreakpointName, LayoutType, Alignment, ColorName, GameObjectType } from './enums/LayoutEnums';

// Re-export commonly used types
export type BreakpointNameType = keyof typeof BreakpointName;
export type LayoutTypeType = keyof typeof LayoutType;
export type AlignmentType = keyof typeof Alignment;
export type ColorNameType = keyof typeof ColorName;
export type GameObjectTypeType = keyof typeof GameObjectType;

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

// Import enums for utility functions
import { ColorName as ColorNameEnum, GameObjectType as GameObjectTypeEnum } from './enums/LayoutEnums';

// Export utility functions for working with constants and enums
export const LayoutSystemUtils = {
  // Breakpoint utilities
  getBreakpointName: (width: number): BreakpointName => {
    if (width < 576) return BreakpointName.XS;
    if (width < 768) return BreakpointName.SM;
    if (width < 992) return BreakpointName.MD;
    if (width < 1200) return BreakpointName.LG;
    if (width < 1400) return BreakpointName.XL;
    return BreakpointName.XXL;
  },

  // Color utilities
  isValidColorName: (color: string): boolean => {
    return Object.values(ColorNameEnum).includes(color as ColorNameEnum);
  },

  // GameObject utilities
  isValidGameObjectType: (type: string): boolean => {
    return Object.values(GameObjectTypeEnum).includes(type as GameObjectTypeEnum);
  },

  // Unit System compatibility utilities
  isUnitSystemCompatible: (value: unknown): boolean => {
    // Check if value is compatible with Unit System
    return typeof value === 'object' && value !== null && 'type' in value;
  },

  // Layout system validation
  validateLayoutConfig: (config: unknown): boolean => {
    // Basic validation for layout configuration
    return typeof config === 'object' && config !== null;
  },
} as const;

// ============================================================================
// COMPATIBILITY HELPERS
// ============================================================================

/**
 * Helper functions for seamless integration between Layout System and Unit System
 */
export const LayoutUnitIntegration = {
  /**
   * Convert layout size value to Unit System format
   */
  toUnitSystemSize: (value: string | number, unit: SizeUnit = SizeUnit.PIXEL) => {
    return {
      type: 'size' as const,
      unit,
      value: typeof value === 'string' ? parseFloat(value) || 0 : value,
    };
  },

  /**
   * Convert layout position value to Unit System format
   */
  toUnitSystemPosition: (value: string | number, unit: PositionUnit = PositionUnit.PIXEL) => {
    return {
      type: 'position' as const,
      unit,
      value: typeof value === 'string' ? parseFloat(value) || 0 : value,
    };
  },

  /**
   * Convert layout scale value to Unit System format
   */
  toUnitSystemScale: (value: string | number, unit: ScaleUnit = ScaleUnit.FACTOR) => {
    return {
      type: 'scale' as const,
      unit,
      value: typeof value === 'string' ? parseFloat(value) || 1 : value,
    };
  },

  /**
   * Check if a value is a Unit System value
   */
  isUnitSystemValue: (value: unknown): value is { type: string; unit: string; value: number } => {
    return (
      typeof value === 'object' &&
      value !== null &&
      'type' in value &&
      'unit' in value &&
      'value' in value
    );
  },
} as const;

// ============================================================================
// DEFAULT EXPORTS
// ============================================================================

// Default export for convenience
export default {
  // Unit System integration
  unit: {
    SizeUnit,
    PositionUnit,
    ScaleUnit,
    UnitCalculatorFactory,
  },
  
  // Layout System
  constants: LAYOUT_SYSTEM_CONSTANTS,
  enums: LAYOUT_SYSTEM_ENUMS,
  utils: LayoutSystemUtils,
  
  // Integration helpers
  integration: LayoutUnitIntegration,
};
