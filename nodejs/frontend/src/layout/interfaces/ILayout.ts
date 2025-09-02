/**
 * Core Layout Interfaces
 * Defines the main layout system contracts and data structures
 * Fully compatible with Unit System and responsive design
 */

import {
  SizeUnit,
  PositionUnit,
  ScaleUnit,
  SizeValue,
  PositionValue,
  ScaleValue,
  IRandomValueNumber,
} from '../../unit';
import {
  LayoutType,
  Alignment,
  PositionType,
  BreakpointName,
  DeviceType,
  DeviceOrientation,
  PerformanceLevel,
  UpdateFrequency,
  HorizontalAlignment,
  VerticalAlignment,
  // SizeValueType removed - use SizeValue from unit system
  ScaleStrategy,
  OverflowType,
  RoundingStrategy,
  ThemeMode,
  ComplexityLevel,
  ValidationSeverity,
} from '../enums/LayoutEnums';

// ============================================================================
// CORE LAYOUT INTERFACES
// ============================================================================

/**
 * Main layout interface
 * Defines the complete layout configuration for an element
 */
export interface ILayout {
  /** Unique identifier for this layout */
  id: string;

  /** Human-readable name */
  name: string;

  /** Description of what this layout represents */
  description?: string;

  /** Whether this layout is currently active */
  isActive: boolean;

  /** Priority for layout resolution (higher = more important) */
  priority: number;

  /** Layout type */
  type: LayoutType;

  /** Layout configuration */
  config: ILayoutConfig;

  /** Responsive behavior */
  responsive?: IResponsiveLayout;

  /** Unit system integration */
  units?: IUnitLayout;

  /** Custom properties */
  custom?: Record<string, unknown>;

  /** Metadata for the layout */
  metadata?: ILayoutMetadata;
}

/**
 * Layout configuration interface
 * Defines the specific layout settings
 */
export interface ILayoutConfig {
  /** Size configuration */
  size: {
    width?: number | SizeValue | SizeUnit | IRandomValueNumber;
    height?: number | SizeValue | SizeUnit | IRandomValueNumber;
    maintainAspectRatio?: boolean;
    minWidth?: number | SizeValue | SizeUnit | IRandomValueNumber;
    maxWidth?: number | SizeValue | SizeUnit | IRandomValueNumber;
    minHeight?: number | SizeValue | SizeUnit | IRandomValueNumber;
    maxHeight?: number | SizeValue | SizeUnit | IRandomValueNumber;
  };

  /** Position configuration */
  position: {
    x?: number | PositionValue | PositionUnit | HorizontalAlignment | IRandomValueNumber;
    y?: number | PositionValue | PositionUnit | VerticalAlignment | IRandomValueNumber;
    z?: number | IRandomValueNumber;
    type: PositionType;
  };

  /** Alignment configuration */
  alignment: {
    horizontal: HorizontalAlignment;
    vertical: VerticalAlignment;
    combined?: Alignment;
  };

  /** Scale configuration */
  scale: {
    x?: number | ScaleValue | ScaleUnit | IRandomValueNumber;
    y?: number | ScaleValue | ScaleUnit | IRandomValueNumber;
    uniform?: number | ScaleValue | ScaleUnit | IRandomValueNumber;
    strategy: ScaleStrategy;
  };

  /** Z-index and layering */
  layering: {
    zIndex?: number | IRandomValueNumber;
    zOrder?: number | IRandomValueNumber;
  };

  /** Overflow handling */
  overflow: {
    horizontal: OverflowType;
    vertical: OverflowType;
  };
}

/**
 * Responsive layout interface
 * Defines responsive behavior for different breakpoints
 */
export interface IResponsiveLayout {
  /** Breakpoint-specific configurations */
  breakpoints: Map<BreakpointName, ILayoutConfig>;

  /** Default configuration */
  default: ILayoutConfig;

  /** Responsive behavior settings */
  behavior: {
    maintainAspectRatio: boolean;
    scaleStrategy: ScaleStrategy;
    alignment: Alignment;
    smoothTransitions: boolean;
  };

  /** Fallback configuration */
  fallback?: ILayoutConfig;
}

/**
 * Unit layout interface
 * Defines Unit System integration settings
 */
export interface IUnitLayout {
  /** Unit type specifications */
  units: {
    sizeUnit: SizeUnit;
    positionUnit: PositionUnit;
    scaleUnit: ScaleUnit;
  };

  /** Unit constraints */
  constraints: {
    minValue?: number;
    maxValue?: number;
    step?: number;
    precision?: number;
  };

  /** Unit validation rules */
  validation: {
    required?: boolean;
    allowNegative?: boolean;
    allowZero?: boolean;
    allowInfinite?: boolean;
  };

  /** Unit conversion settings */
  conversion: {
    autoConvert?: boolean;
    precision?: number;
    rounding?: RoundingStrategy;
  };
}

/**
 * Layout metadata interface
 * Contains additional information about a layout
 */
export interface ILayoutMetadata {
  /** When this layout was created */
  createdAt: Date;

  /** When this layout was last modified */
  modifiedAt: Date;

  /** Author of this layout */
  author?: string;

  /** Version of this layout */
  version?: string;

  /** Tags for categorization */
  tags?: string[];

  /** Performance metrics */
  performance?: {
    calculationTime: number;
    memoryUsage: number;
    complexity: ComplexityLevel;
  };

  /** Custom metadata */
  custom?: Record<string, unknown>;
}

// ============================================================================
// LAYOUT CONTEXT INTERFACES
// ============================================================================

/**
 * Layout context interface
 * Provides context information for layout calculations
 */
export interface ILayoutContext {
  /** Container information */
  container: {
    width: number;
    height: number;
    x: number;
    y: number;
    scale: number;
  };

  /** Viewport information */
  viewport: {
    width: number;
    height: number;
    scale: number;
    orientation: DeviceOrientation;
  };

  /** Device information */
  device: {
    type: DeviceType;
    orientation: DeviceOrientation;
    pixelRatio: number;
    capabilities: string[];
  };

  /** Performance settings */
  performance: {
    level: PerformanceLevel;
    updateFrequency: UpdateFrequency;
    enableCaching: boolean;
  };

  /** Theme context */
  theme?: {
    name: string;
    variant: string;
    mode: ThemeMode;
  };

  /** Custom context */
  custom?: Record<string, unknown>;
}

// ============================================================================
// LAYOUT RESULT INTERFACES
// ============================================================================

/**
 * Calculated layout result interface
 * Contains the final calculated layout values
 */
export interface ICalculatedLayout {
  /** Final calculated values */
  final: {
    x: number;
    y: number;
    width: number;
    height: number;
    scaleX: number;
    scaleY: number;
    zIndex: number;
  };

  /** Applied configuration */
  applied: ILayoutConfig;

  /** Responsive information */
  responsive: {
    breakpoint: BreakpointName | null;
    isResponsive: boolean;
    breakpointActive: boolean;
  };

  /** Unit conversion information */
  units: {
    conversions: IUnitConversion[];
    originalValues: Record<string, unknown>;
    finalValues: Record<string, number>;
  };

  /** Performance information */
  performance: {
    calculationTime: number;
    strategyUsed: string;
    cacheHit: boolean;
  };

  /** Validation results */
  validation: {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  };
}

/**
 * Unit conversion interface
 * Tracks unit conversions during layout calculation
 */
export interface IUnitConversion {
  /** Property name */
  property: string;

  /** Original value */
  originalValue: number | SizeValue | PositionValue | ScaleValue;

  /** Original unit */
  originalUnit: SizeUnit | PositionUnit | ScaleUnit;

  /** Final value */
  finalValue: number;

  /** Conversion factor */
  conversionFactor: number;

  /** Conversion method */
  method: string;
}

// ============================================================================
// LAYOUT VALIDATION INTERFACES
// ============================================================================

/**
 * Layout validation result interface
 * Contains validation results for layout configurations
 */
export interface ILayoutValidationResult {
  /** Whether the layout is valid */
  isValid: boolean;

  /** Validation errors */
  errors: IValidationError[];

  /** Validation warnings */
  warnings: IValidationWarning[];

  /** Validation suggestions */
  suggestions: IValidationSuggestion[];

  /** Validation metadata */
  metadata: {
    validationTime: number;
    validator: string;
    version: string;
  };
}

/**
 * Validation error interface
 */
export interface IValidationError {
  /** Error code */
  code: string;

  /** Error message */
  message: string;

  /** Property path */
  path: string;

  /** Error severity */
  severity: ValidationSeverity;

  /** Suggested fix */
  suggestion?: string;
}

/**
 * Validation warning interface
 */
export interface IValidationWarning {
  /** Warning code */
  code: string;

  /** Warning message */
  message: string;

  /** Property path */
  path: string;

  /** Warning severity */
  severity: ValidationSeverity;

  /** Suggested improvement */
  suggestion?: string;
}

/**
 * Validation suggestion interface
 */
export interface IValidationSuggestion {
  /** Suggestion code */
  code: string;

  /** Suggestion message */
  message: string;

  /** Property path */
  path: string;

  /** Suggested value */
  suggestedValue?: unknown;

  /** Reason for suggestion */
  reason: string;
}
