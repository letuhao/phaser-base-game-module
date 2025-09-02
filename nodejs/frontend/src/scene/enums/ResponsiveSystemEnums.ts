/**
 * Responsive System Enums
 *
 * Centralized enum definitions for responsive system.
 * Replaces string literals with type-safe enums following coding rules.
 */

// ============================================================================
// RESPONSIVE CHANGE TYPE ENUMS
// ============================================================================

export enum ResponsiveChangeType {
  RESIZE = 'resize',
  ORIENTATION = 'orientation',
  DEVICE = 'device',
  MANUAL = 'manual',
}

// ============================================================================
// RESPONSIVE SEVERITY ENUMS
// ============================================================================

export enum ResponsiveSeverity {
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info',
}

export enum ResponsiveWarningSeverity {
  WARNING = 'warning',
  INFO = 'info',
}

// ============================================================================
// RESPONSIVE SOURCE ENUMS
// ============================================================================

export enum ResponsiveSource {
  WINDOW = 'window',
  ORIENTATION = 'orientation',
  DEVICE = 'device',
  MANUAL = 'manual',
}

// ============================================================================
// RESPONSIVE STATUS ENUMS
// ============================================================================

export enum ResponsiveStatus {
  HEALTHY = 'healthy',
  DEGRADED = 'degraded',
  UNHEALTHY = 'unhealthy',
}

// ============================================================================
// DEPENDENCY TYPE ENUMS
// ============================================================================

export enum ThemeDependencyType {
  COLOR = 'color',
  SPACING = 'spacing',
  TYPOGRAPHY = 'typography',
  BORDER = 'border',
  SHADOW = 'shadow',
  CUSTOM = 'custom',
}

export enum LayoutDependencyType {
  SIZE = 'size',
  POSITION = 'position',
  ALIGNMENT = 'alignment',
  SPACING = 'spacing',
  CUSTOM = 'custom',
}

export enum UnitDependencyType {
  SIZE = 'size',
  POSITION = 'position',
  SCALE = 'scale',
  CUSTOM = 'custom',
}

// ============================================================================
// ANIMATION TYPE ENUMS
// ============================================================================

export enum AnimationType {
  SMOOTH = 'smooth',
  INSTANT = 'instant',
  CUSTOM = 'custom',
}

// ============================================================================
// ROUNDING TYPE ENUMS
// ============================================================================

export enum RoundingType {
  ROUND = 'round',
  FLOOR = 'floor',
  CEIL = 'ceil',
  TRUNC = 'trunc',
}

// ============================================================================
// APPLICATION ORDER ENUMS
// ============================================================================

export enum ApplicationOrder {
  LAYOUT_FIRST = 'layout-first',
  THEME_FIRST = 'theme-first',
  PARALLEL = 'parallel',
}

// ============================================================================
// IMPLEMENTATION COMPLEXITY ENUMS
// ============================================================================

export enum ImplementationComplexity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

// ============================================================================
// PRIORITY ENUMS
// ============================================================================

export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}
