/**
 * Layout System Interfaces Index
 * Exports all theme-related interfaces for easy importing
 */

// ============================================================================
// CORE THEME INTERFACES
// ============================================================================

// Original interfaces (backward compatibility)
export * from './ITheme';
export * from './IThemeManager';

// All other interfaces (with explicit re-exports to avoid conflicts)
export type { IBreakpoint } from './IBreakpoint';
export type { IBreakpointManager } from './IBreakpointManager';
export type { IStyle } from './IStyle';
export type { IStyleManager } from './IStyleManager';
export type { ILayout } from './ILayout';
export type { ILayoutManager } from './ILayoutManager';
export type { ILayoutStrategy } from './ILayoutStrategy';
export type { ILayoutCommand } from './ILayoutCommand';
export type { ILayoutState } from './ILayoutState';
export type { IDIContainer } from './IDIContainer';

// ============================================================================
// SEGREGATED INTERFACES (Improved ISP Compliance)
// ============================================================================

// Segregated theme interfaces - only export new interfaces to avoid conflicts
export type {
  IThemeResult,
  IThemeData,
  IThemeProperties,
  IThemeOperations,
  IThemeRegistry,
  IThemeActivator,
  IThemeAccessor,
  IThemeClassManager,
  IThemeEventManager,
  IThemeStatisticsProvider,
  IThemeImportExport,
  IThemePerformanceMetrics
} from './IThemeSegregated';

// ============================================================================
// INTERFACE BUNDLES (For organized imports)
// ============================================================================

// Breakpoint interfaces bundle
export const BREAKPOINT_INTERFACES = [
  'IBreakpoint',
  'IBreakpointManager'
] as const;

// Theme interfaces bundle
export const THEME_INTERFACES = [
  'ITheme',
  'IThemeManager',
  'IThemeResult',
  'IThemeData',
  'IThemeProperties',
  'IThemeOperations',
  'IThemeRegistry',
  'IThemeActivator',
  'IThemeAccessor',
  'IThemeClassManager',
  'IThemeEventManager',
  'IThemeStatisticsProvider',
  'IThemeImportExport',
  'IThemePerformanceMetrics'
] as const;

// Style interfaces bundle
export const STYLE_INTERFACES = [
  'IStyle',
  'IStyleManager'
] as const;

// Layout interfaces bundle
export const LAYOUT_INTERFACES = [
  'ILayout',
  'ILayoutManager'
] as const;

// Strategy interfaces bundle
export const STRATEGY_INTERFACES = [
  'ILayoutStrategy'
] as const;

// Manager interfaces bundle
export const MANAGER_INTERFACES = [
  'ILayoutManager',
  'IThemeManager',
  'IStyleManager',
  'IBreakpointManager'
] as const;

// Command interfaces bundle
export const COMMAND_INTERFACES = [
  'ILayoutCommand'
] as const;

// State interfaces bundle
export const STATE_INTERFACES = [
  'ILayoutState'
] as const;

// Chain interfaces bundle
export const CHAIN_INTERFACES = [
  'ILayoutChain'
] as const;

// Dependency injection interfaces bundle
export const DI_INTERFACES = [
  'IDIContainer'
] as const;

// Plugin interfaces bundle
export const PLUGIN_INTERFACES = [
  'IPluginSystem'
] as const;

// Granular interfaces bundle
export const GRANULAR_INTERFACES = [
  'IGranularInterfaces'
] as const;

// Complete layout system interfaces bundle
export const LAYOUT_SYSTEM_INTERFACES = [
  ...BREAKPOINT_INTERFACES,
  ...THEME_INTERFACES,
  ...STYLE_INTERFACES,
  ...LAYOUT_INTERFACES,
  ...STRATEGY_INTERFACES,
  ...MANAGER_INTERFACES,
  ...COMMAND_INTERFACES,
  ...STATE_INTERFACES,
  ...CHAIN_INTERFACES,
  ...DI_INTERFACES,
  ...PLUGIN_INTERFACES,
  ...GRANULAR_INTERFACES
] as const;

// ============================================================================
// USAGE EXAMPLES AND RECOMMENDATIONS
// ============================================================================

/**
 * RECOMMENDED USAGE PATTERNS:
 * 
 * 1. For new implementations, use the segregated interfaces:
 *    import { IThemeData, IThemeProperties, IThemeOperations } from './IThemeSegregated';
 * 
 * 2. For backward compatibility, use the original interfaces:
 *    import { ITheme, IThemeManager } from './ITheme';
 * 
 * 3. For specific functionality, use focused interfaces:
 *    import { IThemeRegistry, IThemeActivator } from './IThemeSegregated';
 * 
 * 4. For better error handling, use result types:
 *    import { IThemeResult } from './IThemeSegregated';
 */

// ============================================================================
// INTERFACE COMPOSITION EXAMPLES
// ============================================================================

/**
 * Example: Creating a minimal theme data interface
 * 
 * ```typescript
 * import { IThemeData } from './IThemeSegregated';
 * 
 * class MinimalTheme implements IThemeData {
 *   readonly id: string;
 *   readonly name: string;
 *   readonly displayName: string;
 *   readonly type: ThemeType;
 *   readonly variant: ThemeVariant;
 *   readonly isActive: boolean;
 *   readonly supportsDarkMode: boolean;
 *   // ... other required properties
 * }
 * ```
 */

/**
 * Example: Creating a theme registry only
 * 
 * ```typescript
 * import { IThemeRegistry } from './IThemeSegregated';
 * 
 * class ThemeRegistry implements IThemeRegistry {
 *   registerTheme(theme: ITheme): IThemeResult<void> {
 *     // Implementation
 *   }
 *   // ... other registry methods
 * }
 * ```
 */

/**
 * Example: Using result types for better error handling
 * 
 * ```typescript
 * import { IThemeResult } from './IThemeSegregated';
 * 
 * function getThemeColor(theme: ITheme, path: string): IThemeResult<string> {
 *   try {
 *     const color = theme.getColor(path);
 *     return { success: true, data: color };
 *   } catch (error) {
 *     return { success: false, error: error.message };
 *   }
 * }
 * ```
 */