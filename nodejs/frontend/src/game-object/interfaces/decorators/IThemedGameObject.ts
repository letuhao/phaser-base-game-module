/**
 * Themed Game Object Interface
 *
 * Decorator interface that adds theme capabilities to game objects.
 * Extends the base IDecorator interface with theme-specific functionality.
 *
 * This decorator integrates with the Theme System to provide:
 * - Theme application and management
 * - Theme class composition
 * - Theme variant support
 * - Theme state management
 */

import type { IDecorator } from '../patterns/IDecorator';
import type { ITheme, IThemeClass } from '../../../layout/interfaces/ITheme';
import type { IStyle } from '../../../layout/interfaces/IStyle';
import { ThemeType, ThemeVariant, BreakpointName } from '../../../layout/enums/LayoutEnums';

// ============================================================================
// THEMED GAME OBJECT INTERFACE
// ============================================================================

/**
 * Interface for game objects that can have themes applied
 *
 * This decorator wraps a game object and adds theme capabilities
 * by integrating with the Theme System.
 */
export interface IThemedGameObject extends IDecorator {
  /** Current theme */
  currentTheme: ITheme | null;

  /** Applied theme classes */
  appliedThemeClasses: Map<string, IThemeClass>;

  /** Current theme type */
  currentThemeType: ThemeType;

  /** Current theme variant */
  currentThemeVariant: ThemeVariant;

  /** Current breakpoint */
  currentBreakpoint: BreakpointName | null;

  /** Theme state */
  themeState: {
    isApplied: boolean;
    isUpdating: boolean;
    lastUpdateTime: number;
    updateDuration: number;
  };

  /** Theme decorator metadata */
  themeMetadata: {
    appliedThemes: string[];
    themeHistory: ITheme[];
    classHistory: string[];
    performanceMetrics: {
      totalApplications: number;
      averageApplicationTime: number;
      cacheHitRate: number;
    };
  };

  // ===== THEME MANAGEMENT =====

  /**
   * Set current theme
   * @param theme Theme to set
   */
  setCurrentTheme(theme: ITheme): this;

  /**
   * Get current theme
   */
  getCurrentTheme(): ITheme | null;

  /**
   * Update current theme
   * @param updates Partial theme updates
   */
  updateCurrentTheme(updates: Partial<ITheme>): this;

  /**
   * Clear current theme
   */
  clearCurrentTheme(): this;

  // ===== THEME TYPE AND VARIANT =====

  /**
   * Set theme type
   * @param type Theme type to set
   */
  setThemeType(type: ThemeType): this;

  /**
   * Get theme type
   */
  getThemeType(): ThemeType;

  /**
   * Set theme variant
   * @param variant Theme variant to set
   */
  setThemeVariant(variant: ThemeVariant): this;

  /**
   * Get theme variant
   */
  getThemeVariant(): ThemeVariant;

  /**
   * Toggle theme type (light/dark)
   */
  toggleThemeType(): this;

  // ===== THEME CLASS MANAGEMENT =====

  /**
   * Apply theme class
   * @param className Theme class name to apply
   * @param themeClass Theme class to apply
   */
  applyThemeClass(className: string, themeClass: IThemeClass): this;

  /**
   * Remove theme class
   * @param className Theme class name to remove
   */
  removeThemeClass(className: string): this;

  /**
   * Get applied theme class
   * @param className Theme class name to get
   */
  getAppliedThemeClass(className: string): IThemeClass | undefined;

  /**
   * Get all applied theme classes
   */
  getAllAppliedThemeClasses(): Map<string, IThemeClass>;

  /**
   * Clear all theme classes
   */
  clearAllThemeClasses(): this;

  /**
   * Check if theme class is applied
   * @param className Theme class name to check
   */
  hasThemeClass(className: string): boolean;

  // ===== THEME APPLICATION =====

  /**
   * Apply theme to the game object
   * @param theme Theme to apply
   */
  applyTheme(theme: ITheme): Promise<this>;

  /**
   * Apply theme by name
   * @param themeName Theme name to apply
   */
  applyThemeByName(themeName: string): Promise<this>;

  /**
   * Apply theme classes
   * @param classNames Theme class names to apply
   */
  applyThemeClasses(classNames: string[]): Promise<this>;

  /**
   * Remove theme from the game object
   */
  removeTheme(): Promise<this>;

  /**
   * Update theme for current breakpoint
   */
  updateThemeForBreakpoint(): Promise<this>;

  // ===== RESPONSIVE THEME BEHAVIOR =====

  /**
   * Set current breakpoint
   * @param breakpoint Breakpoint to set
   */
  setCurrentBreakpoint(breakpoint: BreakpointName): this;

  /**
   * Get current breakpoint
   */
  getCurrentBreakpoint(): BreakpointName | null;

  /**
   * Check if theme supports breakpoint
   * @param breakpoint Breakpoint to check
   */
  supportsBreakpoint(breakpoint: BreakpointName): boolean;

  /**
   * Get responsive theme classes for breakpoint
   * @param breakpoint Breakpoint to get classes for
   */
  getResponsiveThemeClasses(breakpoint: BreakpointName): string[];

  // ===== THEME STATE =====

  /**
   * Set theme state
   * @param state Theme state to set
   */
  setThemeState(state: Partial<IThemedGameObject['themeState']>): this;

  /**
   * Get theme state
   */
  getThemeState(): IThemedGameObject['themeState'];

  /**
   * Check if theme is applied
   */
  isThemeApplied(): boolean;

  /**
   * Check if theme is updating
   */
  isThemeUpdating(): boolean;

  /**
   * Mark theme as applied
   */
  markThemeApplied(): this;

  /**
   * Mark theme as not applied
   */
  markThemeNotApplied(): this;

  /**
   * Mark theme as updating
   */
  markThemeUpdating(): this;

  /**
   * Mark theme as not updating
   */
  markThemeNotUpdating(): this;

  // ===== THEME METADATA =====

  /**
   * Set theme metadata
   * @param metadata Theme metadata to set
   */
  setThemeMetadata(metadata: Partial<IThemedGameObject['themeMetadata']>): this;

  /**
   * Get theme metadata
   */
  getThemeMetadata(): IThemedGameObject['themeMetadata'];

  /**
   * Add applied theme
   * @param themeName Theme name to add
   */
  addAppliedTheme(themeName: string): this;

  /**
   * Get applied themes
   */
  getAppliedThemes(): string[];

  /**
   * Add theme to history
   * @param theme Theme to add to history
   */
  addThemeToHistory(theme: ITheme): this;

  /**
   * Get theme history
   */
  getThemeHistory(): ITheme[];

  /**
   * Add class to history
   * @param className Class name to add to history
   */
  addClassToHistory(className: string): this;

  /**
   * Get class history
   */
  getClassHistory(): string[];

  /**
   * Update performance metrics
   * @param applicationTime Application time in milliseconds
   */
  updatePerformanceMetrics(applicationTime: number): this;

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): IThemedGameObject['themeMetadata']['performanceMetrics'];

  // ===== THEME VALIDATION =====

  /**
   * Validate theme
   * @param theme Theme to validate
   */
  validateTheme(theme: ITheme): Promise<boolean>;

  /**
   * Validate theme class
   * @param themeClass Theme class to validate
   */
  validateThemeClass(themeClass: IThemeClass): Promise<boolean>;

  /**
   * Validate theme classes
   * @param classNames Theme class names to validate
   */
  validateThemeClasses(classNames: string[]): Promise<boolean>;

  // ===== THEME UTILITIES =====

  /**
   * Get theme color value
   * @param path Color path (e.g., 'primary.main')
   */
  getThemeColor(path: string): string | null;

  /**
   * Get theme spacing value
   * @param size Spacing size
   */
  getThemeSpacing(size: string): number | null;

  /**
   * Get theme font size
   * @param size Font size
   */
  getThemeFontSize(size: string): number | null;

  /**
   * Get theme border radius
   * @param size Border radius size
   */
  getThemeBorderRadius(size: string): number | null;

  /**
   * Get theme shadow
   * @param size Shadow size
   */
  getThemeShadow(size: string): string | null;

  /**
   * Get theme animation duration
   * @param size Duration size
   */
  getThemeAnimationDuration(size: string): number | null;

  /**
   * Get computed theme style
   */
  getComputedThemeStyle(): IStyle | null;

  /**
   * Check if theme is active
   */
  isThemeActive(): boolean;

  /**
   * Get theme name
   */
  getThemeName(): string | null;

  /**
   * Get theme ID
   */
  getThemeId(): string | null;

  // ===== THEME EVENTS =====

  /**
   * Called when theme is applied
   * @param theme Applied theme
   */
  onThemeApplied?(theme: ITheme): void;

  /**
   * Called when theme is removed
   */
  onThemeRemoved?(): void;

  /**
   * Called when theme class is applied
   * @param className Applied class name
   * @param themeClass Applied theme class
   */
  onThemeClassApplied?(className: string, themeClass: IThemeClass): void;

  /**
   * Called when theme class is removed
   * @param className Removed class name
   */
  onThemeClassRemoved?(className: string): void;

  /**
   * Called when theme type changes
   * @param newType New theme type
   * @param oldType Old theme type
   */
  onThemeTypeChanged?(newType: ThemeType, oldType: ThemeType): void;

  /**
   * Called when theme variant changes
   * @param newVariant New theme variant
   * @param oldVariant Old theme variant
   */
  onThemeVariantChanged?(newVariant: ThemeVariant, oldVariant: ThemeVariant): void;

  /**
   * Called when breakpoint changes
   * @param newBreakpoint New breakpoint
   * @param oldBreakpoint Old breakpoint
   */
  onBreakpointChanged?(newBreakpoint: BreakpointName, oldBreakpoint: BreakpointName | null): void;

  /**
   * Called when theme update starts
   */
  onThemeUpdateStart?(): void;

  /**
   * Called when theme update completes
   * @param theme Updated theme
   * @param duration Update duration in milliseconds
   */
  onThemeUpdateComplete?(theme: ITheme, duration: number): void;

  /**
   * Called when theme update fails
   * @param error Error that occurred
   */
  onThemeUpdateError?(error: Error): void;
}
