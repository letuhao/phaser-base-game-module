/**
 * Theme Manager Interface
 * Defines the contract for managing themes in the layout system
 * Handles registration, switching, and lifecycle of themes
 * Fully compatible with the Unit System
 */

import { ITheme, IThemeClass } from './ITheme';
import { ThemeType, ThemeVariant, BreakpointName } from '../enums/LayoutEnums';

/**
 * Theme manager interface
 * Manages the lifecycle and switching of themes
 * 
 * NOTE: This interface now uses the segregated structure for better ISP compliance
 * For new implementations, consider using the individual interfaces directly
 */
export interface IThemeManager {
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

  // ============================================================================
  // THEME REGISTRY METHODS
  // ============================================================================

  /**
   * Initialize the theme manager
   * @param defaultTheme Default theme to activate
   */
  initialize(defaultTheme?: string): Promise<void>;

  /**
   * Register a new theme
   * @param theme Theme to register
   */
  registerTheme(theme: ITheme): void;

  /**
   * Unregister a theme by ID
   * @param id Theme ID to unregister
   */
  unregisterTheme(id: string): boolean;

  /**
   * Get a theme by ID
   * @param id Theme ID
   */
  getTheme(id: string): ITheme | undefined;

  /**
   * Get a theme by name
   * @param name Theme name
   */
  getThemeByName(name: string): ITheme | undefined;

  /**
   * Get all themes matching a filter
   * @param filter Filter function
   */
  getThemes(filter?: (theme: ITheme) => boolean): ITheme[];

  /**
   * Get themes by type
   * @param type Theme type
   */
  getThemesByType(type: ThemeType): ITheme[];

  /**
   * Get themes by variant
   * @param variant Theme variant
   */
  getThemesByVariant(variant: ThemeVariant): ITheme[];

  // ============================================================================
  // THEME ACTIVATION METHODS
  // ============================================================================

  /**
   * Activate a theme by ID
   * @param id Theme ID to activate
   */
  activateTheme(id: string): Promise<void>;

  /**
   * Activate a theme by name
   * @param name Theme name to activate
   */
  activateThemeByName(name: string): Promise<void>;

  /**
   * Get the currently active theme
   */
  getActiveTheme(): ITheme | null;

  /**
   * Check if a specific theme is active
   * @param id Theme ID
   */
  isThemeActive(id: string): boolean;

  /**
   * Switch to the opposite theme (light/dark)
   */
  toggleThemeMode(): Promise<void>;

  /**
   * Switch to light theme
   */
  switchToLightTheme(): Promise<void>;

  /**
   * Switch to dark theme
   */
  switchToDarkTheme(): Promise<void>;

  // ============================================================================
  // THEME ACCESSOR METHODS
  // ============================================================================

  /**
   * Get a color value from the active theme
   * @param path Color path (e.g., 'primary.main')
   */
  getColor(path: string): string;

  /**
   * Get a spacing value from the active theme
   * @param size Spacing size
   */
  getSpacing(size: string): number;

  /**
   * Get a font size from the active theme
   * @param size Font size
   */
  getFontSize(size: string): number;

  /**
   * Get a border radius from the active theme
   * @param size Border radius size
   */
  getBorderRadius(size: string): number;

  /**
   * Get a shadow from the active theme
   * @param size Shadow size
   */
  getShadow(size: string): string;

  /**
   * Get an animation duration from the active theme
   * @param size Duration size
   */
  getAnimationDuration(size: string): number;

  /**
   * Get a theme class by name
   * @param className Class name
   */
  getThemeClass(className: string): IThemeClass | undefined;

  /**
   * Check if a theme supports a specific breakpoint
   * @param breakpoint Breakpoint to check
   */
  supportsBreakpoint(breakpoint: BreakpointName): boolean;

  // ============================================================================
  // THEME CLASS MANAGEMENT METHODS
  // ============================================================================

  /**
   * Apply a theme class to an element
   * @param element Element to apply class to
   * @param className Class name to apply
   */
  applyThemeClass(element: unknown, className: string): void;

  /**
   * Remove a theme class from an element
   * @param element Element to remove class from
   * @param className Class name to remove
   */
  removeThemeClass(element: unknown, className: string): void;

  // ============================================================================
  // EVENT MANAGEMENT METHODS
  // ============================================================================

  /**
   * Add a listener for theme changes
   * @param listener Listener to add
   */
  addListener(listener: IThemeListener): void;

  /**
   * Remove a listener
   * @param listener Listener to remove
   */
  removeListener(listener: IThemeListener): boolean;

  /**
   * Clear all listeners
   */
  clearListeners(): void;

  // ============================================================================
  // STATISTICS AND IMPORT/EXPORT METHODS
  // ============================================================================

  /**
   * Get theme statistics
   */
  getStatistics(): IThemeStatistics;

  /**
   * Export theme configuration
   * @param themeId Theme ID to export
   */
  exportTheme(themeId: string): string;

  /**
   * Import theme configuration
   * @param config Theme configuration string
   */
  importTheme(config: string): ITheme;

  // ============================================================================
  // LIFECYCLE METHODS
  // ============================================================================

  /**
   * Reset the manager to initial state
   */
  reset(): void;

  /**
   * Destroy the manager and clean up resources
   */
  destroy(): void;
}

/**
 * Theme listener interface
 * Defines callbacks for theme events
 */
export interface IThemeListener {
  /**
   * Called when a theme becomes active
   * @param theme The theme that became active
   * @param previousTheme The previously active theme
   */
  onThemeActivated?(theme: ITheme, previousTheme: ITheme | null): void;

  /**
   * Called when a theme becomes inactive
   * @param theme The theme that became inactive
   * @param newTheme The newly active theme
   */
  onThemeDeactivated?(theme: ITheme, newTheme: ITheme | null): void;

  /**
   * Called when a theme is registered
   * @param theme The theme that was registered
   */
  onThemeRegistered?(theme: ITheme): void;

  /**
   * Called when a theme is unregistered
   * @param theme The theme that was unregistered
   */
  onThemeUnregistered?(theme: ITheme): void;

  /**
   * Called when theme mode changes (light/dark)
   * @param newMode The new theme mode
   * @param previousMode The previous theme mode
   */
  onThemeModeChanged?(newMode: ThemeType, previousMode: ThemeType): void;

  /**
   * Called when theme class is applied
   * @param element Element the class was applied to
   * @param className Class name that was applied
   */
  onThemeClassApplied?(element: unknown, className: string): void;

  /**
   * Called when theme class is removed
   * @param element Element the class was removed from
   * @param className Class name that was removed
   */
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
  performance: {
    /** Total time spent switching themes */
    totalSwitchTime: number;

    /** Number of theme switches per second */
    switchesPerSecond: number;

    /** Cache efficiency */
    cacheEfficiency: number;
  };

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
