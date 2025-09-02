/**
 * Segregated Theme Interfaces
 * Improved Interface Segregation Principle (ISP) compliance
 * Split large interfaces into smaller, focused ones
 */

import { ThemeType, ThemeVariant, BreakpointName } from '../enums/LayoutEnums';
import { MemoryUsageTrend } from '../enums/ThemeEnums';
import { IThemeColors, IThemeTypography, IThemeSpacing, IThemeBorderRadius, IThemeShadows, IThemeAnimation, IThemeBreakpoints, IThemeClass, IThemeMetadata } from './ITheme';

// ============================================================================
// RESULT TYPES FOR BETTER ERROR HANDLING
// ============================================================================

/**
 * Result type for theme operations
 * Provides better error handling and type safety
 */
export interface IThemeResult<T> {
  /** Whether the operation was successful */
  success: boolean;
  /** The result data if successful */
  data?: T;
  /** Error message if operation failed */
  error?: string;
}

// ============================================================================
// THEME DATA INTERFACES
// ============================================================================

/**
 * Core theme data interface
 * Contains only the essential theme identification and metadata
 */
export interface IThemeData {
  /** Unique identifier for the theme */
  readonly id: string;
  /** Human-readable name for the theme */
  readonly name: string;
  /** Display name for UI purposes */
  readonly displayName: string;
  /** Description of what this theme represents */
  readonly description?: string;
  /** Theme type (light, dark, auto, custom) */
  readonly type: ThemeType;
  /** Theme variant (default, primary, secondary, etc.) */
  readonly variant: ThemeVariant;
  /** Whether this theme is currently active */
  readonly isActive: boolean;
  /** Whether this theme supports dark mode */
  readonly supportsDarkMode: boolean;
  /** Opposite theme for mode switching */
  readonly oppositeTheme?: string;
  /** Version of this theme */
  readonly version?: string;
  /** Author of this theme */
  readonly author?: string;
  /** Tags for categorization */
  readonly tags?: string[];
}

/**
 * Theme properties interface
 * Contains all styling properties without operations
 */
export interface IThemeProperties {
  /** Core theme properties */
  readonly colors: IThemeColors;
  readonly typography: IThemeTypography;
  readonly spacing: IThemeSpacing;
  readonly borderRadius: IThemeBorderRadius;
  readonly shadows: IThemeShadows;
  readonly animation: IThemeAnimation;
  readonly breakpoints: IThemeBreakpoints;
  /** Theme class definitions for reusable styling */
  readonly themeClasses?: Record<string, IThemeClass>;
  /** Custom properties specific to this theme */
  readonly custom?: Record<string, unknown>;
  /** Metadata for the theme */
  readonly metadata?: IThemeMetadata;
}

/**
 * Theme operations interface
 * Contains only the methods for accessing theme data
 */
export interface IThemeOperations {
  /** Get a color value by path */
  getColor(path: string): IThemeResult<string>;
  /** Get a spacing value by size */
  getSpacing(size: keyof IThemeSpacing['scale']): IThemeResult<number>;
  /** Get a font size by size */
  getFontSize(size: keyof IThemeTypography['fontSize']): IThemeResult<number>;
  /** Get a border radius by size */
  getBorderRadius(size: keyof IThemeBorderRadius): IThemeResult<number>;
  /** Get a shadow by size */
  getShadow(size: keyof IThemeShadows): IThemeResult<string>;
  /** Get an animation duration by size */
  getAnimationDuration(size: keyof IThemeAnimation['duration']): IThemeResult<number>;
  /** Check if theme supports a specific breakpoint */
  supportsBreakpoint(breakpoint: BreakpointName): IThemeResult<boolean>;
  /** Get the opposite theme ID */
  getOppositeTheme(): IThemeResult<string | null>;
  /** Clone the theme */
  clone(): IThemeResult<ITheme>;
  /** Merge with another theme */
  merge(other: Partial<ITheme>): IThemeResult<ITheme>;
}

// ============================================================================
// THEME MANAGER SEGREGATED INTERFACES
// ============================================================================

/**
 * Theme registry interface
 * Handles theme registration and retrieval
 */
export interface IThemeRegistry {
  /** Register a new theme */
  registerTheme(theme: ITheme): IThemeResult<void>;
  /** Unregister a theme by ID */
  unregisterTheme(id: string): IThemeResult<boolean>;
  /** Get a theme by ID */
  getTheme(id: string): IThemeResult<ITheme | undefined>;
  /** Get a theme by name */
  getThemeByName(name: string): IThemeResult<ITheme | undefined>;
  /** Get all themes matching a filter */
  getThemes(filter?: (theme: ITheme) => boolean): IThemeResult<ITheme[]>;
  /** Get themes by type */
  getThemesByType(type: ThemeType): IThemeResult<ITheme[]>;
  /** Get themes by variant */
  getThemesByVariant(variant: ThemeVariant): IThemeResult<ITheme[]>;
}

/**
 * Theme activator interface
 * Handles theme activation and switching
 */
export interface IThemeActivator {
  /** Activate a theme by ID */
  activateTheme(id: string): Promise<IThemeResult<void>>;
  /** Activate a theme by name */
  activateThemeByName(name: string): Promise<IThemeResult<void>>;
  /** Get the currently active theme */
  getActiveTheme(): IThemeResult<ITheme | null>;
  /** Check if a specific theme is active */
  isThemeActive(id: string): IThemeResult<boolean>;
  /** Switch to the opposite theme (light/dark) */
  toggleThemeMode(): Promise<IThemeResult<void>>;
  /** Switch to light theme */
  switchToLightTheme(): Promise<IThemeResult<void>>;
  /** Switch to dark theme */
  switchToDarkTheme(): Promise<IThemeResult<void>>;
}

/**
 * Theme accessor interface
 * Provides access to theme values
 */
export interface IThemeAccessor {
  /** Get a color value from the active theme */
  getColor(path: string): IThemeResult<string>;
  /** Get a spacing value from the active theme */
  getSpacing(size: string): IThemeResult<number>;
  /** Get a font size from the active theme */
  getFontSize(size: string): IThemeResult<number>;
  /** Get a border radius from the active theme */
  getBorderRadius(size: string): IThemeResult<number>;
  /** Get a shadow from the active theme */
  getShadow(size: string): IThemeResult<string>;
  /** Get an animation duration from the active theme */
  getAnimationDuration(size: string): IThemeResult<number>;
  /** Get a theme class by name */
  getThemeClass(className: string): IThemeResult<IThemeClass | undefined>;
  /** Check if a theme supports a specific breakpoint */
  supportsBreakpoint(breakpoint: BreakpointName): IThemeResult<boolean>;
}

/**
 * Theme class manager interface
 * Handles theme class application and removal
 */
export interface IThemeClassManager {
  /** Apply a theme class to an element */
  applyThemeClass(element: unknown, className: string): IThemeResult<void>;
  /** Remove a theme class from an element */
  removeThemeClass(element: unknown, className: string): IThemeResult<void>;
  /** Check if an element has a theme class */
  hasThemeClass(element: unknown, className: string): IThemeResult<boolean>;
  /** Get all theme classes applied to an element */
  getElementThemeClasses(element: unknown): IThemeResult<string[]>;
}

/**
 * Theme event manager interface
 * Handles theme event listeners
 */
export interface IThemeEventManager {
  /** Add a listener for theme changes */
  addListener(listener: IThemeListener): IThemeResult<void>;
  /** Remove a listener */
  removeListener(listener: IThemeListener): IThemeResult<boolean>;
  /** Clear all listeners */
  clearListeners(): IThemeResult<void>;
  /** Get all listeners */
  getListeners(): IThemeResult<IThemeListener[]>;
}

/**
 * Theme statistics interface
 * Provides theme usage and performance metrics
 */
export interface IThemeStatisticsProvider {
  /** Get theme statistics */
  getStatistics(): IThemeResult<IThemeStatistics>;
  /** Reset statistics */
  resetStatistics(): IThemeResult<void>;
  /** Get performance metrics */
  getPerformanceMetrics(): IThemeResult<IThemePerformanceMetrics>;
}

/**
 * Theme import/export interface
 * Handles theme configuration import and export
 */
export interface IThemeImportExport {
  /** Export theme configuration */
  exportTheme(themeId: string): IThemeResult<string>;
  /** Import theme configuration */
  importTheme(config: string): IThemeResult<ITheme>;
  /** Validate theme configuration */
  validateThemeConfig(config: string): IThemeResult<boolean>;
}

// ============================================================================
// COMBINED INTERFACES
// ============================================================================

/**
 * Complete theme interface
 * Combines all theme-related interfaces
 */
export interface ITheme extends IThemeData, IThemeProperties, IThemeOperations {
  // All methods and properties from the combined interfaces
}

/**
 * Complete theme manager interface
 * Combines all theme manager interfaces
 */
export interface IThemeManager extends 
  IThemeRegistry, 
  IThemeActivator, 
  IThemeAccessor, 
  IThemeClassManager, 
  IThemeEventManager,
  IThemeStatisticsProvider,
  IThemeImportExport {
  
  /** Current active theme */
  readonly activeTheme: ITheme | null;
  /** All registered themes */
  readonly themes: Map<string, ITheme>;
  /** Current theme type (light, dark, auto) */
  readonly currentThemeType: ThemeType;
  /** Whether the manager is initialized */
  readonly isInitialized: boolean;
  /** Event listeners for theme changes */
  readonly listeners: Set<IThemeListener>;
  /** Theme cache for performance */
  readonly themeCache: Map<string, IThemeClass>;
  
  /** Initialize the theme manager */
  initialize(defaultTheme?: string): Promise<IThemeResult<void>>;
  /** Reset the manager to initial state */
  reset(): IThemeResult<void>;
  /** Destroy the manager and clean up resources */
  destroy(): IThemeResult<void>;
}

// ============================================================================
// SUPPORTING INTERFACES
// ============================================================================

/**
 * Theme listener interface
 * Defines callbacks for theme events
 */
export interface IThemeListener {
  /** Called when a theme becomes active */
  onThemeActivated?(theme: ITheme, previousTheme: ITheme | null): void;
  /** Called when a theme becomes inactive */
  onThemeDeactivated?(theme: ITheme, newTheme: ITheme | null): void;
  /** Called when a theme is registered */
  onThemeRegistered?(theme: ITheme): void;
  /** Called when a theme is unregistered */
  onThemeUnregistered?(theme: ITheme): void;
  /** Called when theme mode changes (light/dark) */
  onThemeModeChanged?(newMode: ThemeType, previousMode: ThemeType): void;
  /** Called when theme class is applied */
  onThemeClassApplied?(element: unknown, className: string): void;
  /** Called when theme class is removed */
  onThemeClassRemoved?(element: unknown, className: string): void;
}

/**
 * Theme statistics interface
 * Provides metrics about theme usage and performance
 */
export interface IThemeStatistics {
  /** Total number of registered themes */
  totalThemes: number;
  /** Number of active themes */
  activeThemes: number;
  /** Number of inactive themes */
  inactiveThemes: number;
  /** Number of theme switches */
  themeSwitches: number;
  /** Number of theme class applications */
  classApplications: number;
  /** Average theme switch time in milliseconds */
  averageSwitchTime: number;
  /** Last theme switch time in milliseconds */
  lastSwitchTime: number;
  /** Memory usage in bytes */
  memoryUsage: number;
  /** Cache hit rate */
  cacheHitRate: number;
  /** Performance metrics */
  performance: IThemePerformanceMetrics;
  /** Theme type distribution */
  themeTypes: {
    light: number;
    dark: number;
    auto: number;
    custom: number;
  };
  /** Theme variant distribution */
  themeVariants: {
    default: number;
    primary: number;
    secondary: number;
    success: number;
    warning: number;
    error: number;
    info: number;
  };
}

/**
 * Theme performance metrics interface
 * Provides detailed performance information
 */
export interface IThemePerformanceMetrics {
  /** Total time spent switching themes */
  totalSwitchTime: number;
  /** Number of theme switches per second */
  switchesPerSecond: number;
  /** Cache efficiency */
  cacheEfficiency: number;
  /** Average theme class application time */
  averageClassApplicationTime: number;
  /** Memory usage trend */
  memoryUsageTrend: MemoryUsageTrend;
  /** Performance score (0-100) */
  performanceScore: number;
}

/**
 * Theme configuration interface
 * For importing/exporting theme configurations
 */
export interface IThemeConfiguration {
  /** Theme metadata */
  metadata: {
    version: string;
    exportedAt: Date;
    exportedBy: string;
  };
  /** Theme data */
  theme: ITheme;
  /** Dependencies */
  dependencies?: {
    themes?: string[];
    breakpoints?: string[];
    units?: string[];
  };
  /** Custom configuration */
  custom?: Record<string, unknown>;
}
