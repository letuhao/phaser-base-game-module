/**
 * Theme Manager - Core Theme Management
 *
 * Minimal implementation focused on getting the fortune wheel game running.
 * Provides essential theme registration, switching, and application functionality.
 */

import { ITheme, IThemeClass } from '../interfaces/ITheme';
import {
  IThemeManager,
  IThemeListener,
  IThemeStatistics,
  IThemeConfiguration,
} from '../interfaces/IThemeManager';
import { ThemeType, ThemeVariant, BreakpointName } from '../enums/LayoutEnums';
import { logger } from '../../core/Logger';

/**
 * Core Theme Manager Implementation
 *
 * Provides essential theme management functionality:
 * - Theme registration and storage
 * - Active theme management
 * - Theme switching
 * - Event notifications
 * - Basic CSS class application
 */
export class ThemeManager implements IThemeManager {
  // Core properties
  private readonly themesMap: Map<string, ITheme> = new Map();
  private activeThemeInstance: ITheme | null = null;
  private currentThemeTypeInstance: ThemeType = ThemeType.CUSTOM;
  private isInitializedInstance: boolean = false;
  private readonly listenersSet: Set<IThemeListener> = new Set();
  private readonly themeCacheMap: Map<string, IThemeClass> = new Map();

  // ============================================================================
  // CORE PROPERTIES (IThemeManager interface)
  // ============================================================================

  get themes(): Map<string, ITheme> {
    return this.themesMap;
  }

  get activeTheme(): ITheme | null {
    return this.activeThemeInstance;
  }

  get currentThemeType(): ThemeType {
    return this.currentThemeTypeInstance;
  }

  get isInitialized(): boolean {
    return this.isInitializedInstance;
  }

  get listeners(): Set<IThemeListener> {
    return this.listenersSet;
  }

  get themeCache(): Map<string, IThemeClass> {
    return this.themeCacheMap;
  }

  // ============================================================================
  // THEME REGISTRY METHODS
  // ============================================================================

  /**
   * Initialize the theme manager
   */
  async initialize(defaultTheme?: string): Promise<void> {
    logger.info('ThemeManager', 'initialize', 'Initializing theme manager', { defaultTheme });

    try {
      this.isInitializedInstance = true;

      if (defaultTheme && this.themesMap.has(defaultTheme)) {
        await this.activateTheme(defaultTheme);
      }

      logger.info('ThemeManager', 'initialize', 'Theme manager initialized successfully');
    } catch (error) {
      logger.error('ThemeManager', 'initialize', 'Failed to initialize theme manager', { error });
      throw error;
    }
  }

  /**
   * Register a new theme
   */
  registerTheme(theme: ITheme): void {
    logger.info('ThemeManager', 'registerTheme', 'Registering theme', { themeId: theme.id });

    try {
      // Validate theme
      this.validateTheme(theme);

      // Store theme
      this.themesMap.set(theme.id, theme);

      // Cache theme classes for performance
      this.cacheThemeClasses(theme);

      logger.info('ThemeManager', 'registerTheme', 'Theme registered successfully', {
        themeId: theme.id,
      });
    } catch (error) {
      logger.error('ThemeManager', 'registerTheme', 'Failed to register theme', {
        error,
        themeId: theme.id,
      });
      throw error;
    }
  }

  /**
   * Unregister a theme
   */
  unregisterTheme(id: string): boolean {
    logger.info('ThemeManager', 'unregisterTheme', 'Unregistering theme', { themeId: id });

    try {
      // Don't allow unregistering the active theme
      if (this.activeThemeInstance?.id === id) {
        logger.warn('ThemeManager', 'unregisterTheme', 'Cannot unregister active theme', {
          themeId: id,
        });
        return false;
      }

      // Check if theme exists
      if (!this.themesMap.has(id)) {
        logger.warn('ThemeManager', 'unregisterTheme', 'Theme not found', { themeId: id });
        return false;
      }

      // Remove from storage
      this.themesMap.delete(id);

      // Clear cache
      this.clearThemeCache(id);

      logger.info('ThemeManager', 'unregisterTheme', 'Theme unregistered successfully', {
        themeId: id,
      });
      return true;
    } catch (error) {
      logger.error('ThemeManager', 'unregisterTheme', 'Failed to unregister theme', {
        error,
        themeId: id,
      });
      return false;
    }
  }

  /**
   * Get a theme by ID
   */
  getTheme(id: string): ITheme | undefined {
    return this.themesMap.get(id);
  }

  /**
   * Get a theme by name
   */
  getThemeByName(name: string): ITheme | undefined {
    for (const theme of this.themesMap.values()) {
      if (theme.name === name) {
        return theme;
      }
    }
    return undefined;
  }

  /**
   * Get all themes matching a filter
   */
  getThemes(filter?: (theme: ITheme) => boolean): ITheme[] {
    const themes = Array.from(this.themesMap.values());
    return filter ? themes.filter(filter) : themes;
  }

  /**
   * Get themes by type
   */
  getThemesByType(type: ThemeType): ITheme[] {
    return this.getThemes(theme => theme.type === type);
  }

  /**
   * Get themes by variant
   */
  getThemesByVariant(variant: ThemeVariant): ITheme[] {
    return this.getThemes(theme => theme.variant === variant);
  }

  /**
   * Check if a theme is registered
   */
  hasTheme(themeId: string): boolean {
    return this.themesMap.has(themeId);
  }

  // ============================================================================
  // THEME ACTIVATION METHODS
  // ============================================================================

  /**
   * Activate a theme
   */
  async activateTheme(themeId: string): Promise<void> {
    logger.info('ThemeManager', 'activateTheme', 'Activating theme', { themeId });

    try {
      const theme = this.themesMap.get(themeId);
      if (!theme) {
        throw new Error(`Theme not found: ${themeId}`);
      }

      // Deactivate current theme
      if (this.activeThemeInstance) {
        await this.deactivateTheme(this.activeThemeInstance.id);
      }

      // Activate new theme
      this.activeThemeInstance = theme;
      this.currentThemeTypeInstance = theme.type;

      // Apply theme to DOM
      await this.applyThemeToDOM(theme);

      // Notify listeners
      this.notifyThemeActivated(theme);

      logger.info('ThemeManager', 'activateTheme', 'Theme activated successfully', { themeId });
    } catch (error) {
      logger.error('ThemeManager', 'activateTheme', 'Failed to activate theme', { error, themeId });
      throw error;
    }
  }

  /**
   * Deactivate a theme
   */
  async deactivateTheme(themeId: string): Promise<void> {
    logger.info('ThemeManager', 'deactivateTheme', 'Deactivating theme', { themeId });

    try {
      if (this.activeThemeInstance?.id === themeId) {
        // Remove theme from DOM
        await this.removeThemeFromDOM(this.activeThemeInstance);

        // Notify listeners
        this.notifyThemeDeactivated(this.activeThemeInstance);

        this.activeThemeInstance = null;
      }

      logger.info('ThemeManager', 'deactivateTheme', 'Theme deactivated successfully', { themeId });
    } catch (error) {
      logger.error('ThemeManager', 'deactivateTheme', 'Failed to deactivate theme', {
        error,
        themeId,
      });
      throw error;
    }
  }

  /**
   * Activate a theme by name
   */
  async activateThemeByName(name: string): Promise<void> {
    const theme = this.getThemeByName(name);
    if (!theme) {
      throw new Error(`Theme not found with name: ${name}`);
    }
    await this.activateTheme(theme.id);
  }

  /**
   * Get the currently active theme
   */
  getActiveTheme(): ITheme | null {
    return this.activeThemeInstance;
  }

  /**
   * Check if a specific theme is active
   */
  isThemeActive(id: string): boolean {
    return this.activeThemeInstance?.id === id;
  }

  /**
   * Switch to the opposite theme (light/dark)
   */
  async toggleThemeMode(): Promise<void> {
    if (this.currentThemeTypeInstance === ThemeType.LIGHT) {
      await this.switchToDarkTheme();
    } else {
      await this.switchToLightTheme();
    }
  }

  /**
   * Switch to light theme
   */
  async switchToLightTheme(): Promise<void> {
    const lightThemes = this.getThemesByType(ThemeType.LIGHT);
    if (lightThemes.length > 0) {
      await this.activateTheme(lightThemes[0].id);
    }
  }

  /**
   * Switch to dark theme
   */
  async switchToDarkTheme(): Promise<void> {
    const darkThemes = this.getThemesByType(ThemeType.DARK);
    if (darkThemes.length > 0) {
      await this.activateTheme(darkThemes[0].id);
    }
  }

  // ============================================================================
  // THEME ACCESS METHODS
  // ============================================================================

  /**
   * Get theme class by selector
   */
  getThemeClass(className: string): IThemeClass | undefined {
    if (!this.activeThemeInstance?.themeClasses) {
      return undefined;
    }

    return this.activeThemeInstance.themeClasses[className];
  }

  /**
   * Get theme color by path
   */
  getColor(path: string): string {
    if (!this.activeThemeInstance?.colors) {
      return '#000000'; // Default black color
    }

    // Simple path resolution (e.g., "primary.main" -> colors.primary.main)
    const pathParts = path.split('.');
    let current: any = this.activeThemeInstance.colors;

    for (const part of pathParts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        return '#000000'; // Default black color
      }
    }

    return typeof current === 'string' ? current : '#000000';
  }

  /**
   * Get theme spacing value
   */
  getSpacing(size: string): number {
    if (!this.activeThemeInstance?.spacing?.scale) {
      return 0;
    }

    const spacingValue =
      this.activeThemeInstance.spacing.scale[
        size as keyof typeof this.activeThemeInstance.spacing.scale
      ];
    return typeof spacingValue === 'number' ? spacingValue : 0;
  }

  /**
   * Get theme font size
   */
  getFontSize(size: string): number {
    if (!this.activeThemeInstance?.typography?.fontSize) {
      return 16; // Default font size
    }

    const fontSizeValue =
      this.activeThemeInstance.typography.fontSize[
        size as keyof typeof this.activeThemeInstance.typography.fontSize
      ];
    return typeof fontSizeValue === 'number' ? fontSizeValue : 16;
  }

  /**
   * Get a border radius from the active theme
   */
  getBorderRadius(size: string): number {
    if (!this.activeThemeInstance?.borderRadius) {
      return 0;
    }

    const borderRadiusValue =
      this.activeThemeInstance.borderRadius[
        size as keyof typeof this.activeThemeInstance.borderRadius
      ];
    return typeof borderRadiusValue === 'number' ? borderRadiusValue : 0;
  }

  /**
   * Get a shadow from the active theme
   */
  getShadow(size: string): string {
    if (!this.activeThemeInstance?.shadows) {
      return 'none';
    }

    const shadowValue =
      this.activeThemeInstance.shadows[size as keyof typeof this.activeThemeInstance.shadows];
    return typeof shadowValue === 'string' ? shadowValue : 'none';
  }

  /**
   * Get an animation duration from the active theme
   */
  getAnimationDuration(size: string): number {
    if (!this.activeThemeInstance?.animation?.duration) {
      return 300; // Default 300ms
    }

    const durationValue =
      this.activeThemeInstance.animation.duration[
        size as keyof typeof this.activeThemeInstance.animation.duration
      ];
    return typeof durationValue === 'number' ? durationValue : 300;
  }

  /**
   * Check if a theme supports a specific breakpoint
   */
  supportsBreakpoint(breakpoint: BreakpointName): boolean {
    if (!this.activeThemeInstance?.breakpoints) {
      return false;
    }

    return breakpoint in this.activeThemeInstance.breakpoints;
  }

  // ============================================================================
  // EVENT MANAGEMENT
  // ============================================================================

  // ============================================================================
  // THEME CLASS MANAGEMENT METHODS
  // ============================================================================

  /**
   * Apply a theme class to an element
   */
  applyThemeClass(element: unknown, className: string): void {
    if (!element || typeof element !== 'object' || !('style' in element)) {
      logger.warn('ThemeManager', 'applyThemeClass', 'Invalid element provided', { className });
      return;
    }

    const themeClass = this.getThemeClass(className);
    if (!themeClass) {
      logger.warn('ThemeManager', 'applyThemeClass', 'Theme class not found', { className });
      return;
    }

    // Apply styles to element
    this.applyStylesToElement(element as HTMLElement, themeClass);
  }

  /**
   * Remove a theme class from an element
   */
  removeThemeClass(element: unknown, className: string): void {
    if (!element || typeof element !== 'object' || !('style' in element)) {
      logger.warn('ThemeManager', 'removeThemeClass', 'Invalid element provided', { className });
      return;
    }

    const themeClass = this.getThemeClass(className);
    if (!themeClass) {
      logger.warn('ThemeManager', 'removeThemeClass', 'Theme class not found', { className });
      return;
    }

    // Remove styles from element (simplified implementation)
    const htmlElement = element as HTMLElement;
    htmlElement.style.cssText = '';
  }

  // ============================================================================
  // EVENT MANAGEMENT METHODS
  // ============================================================================

  /**
   * Add a listener for theme changes
   */
  addListener(listener: IThemeListener): void {
    this.listenersSet.add(listener);
  }

  /**
   * Remove a listener
   */
  removeListener(listener: IThemeListener): boolean {
    return this.listenersSet.delete(listener);
  }

  /**
   * Clear all listeners
   */
  clearListeners(): void {
    this.listenersSet.clear();
  }

  // ============================================================================
  // STATISTICS AND IMPORT/EXPORT METHODS
  // ============================================================================

  /**
   * Get theme statistics
   */
  getStatistics(): IThemeStatistics {
    return {
      totalThemes: this.themesMap.size,
      activeThemes: this.activeThemeInstance ? 1 : 0,
      inactiveThemes: this.themesMap.size - (this.activeThemeInstance ? 1 : 0),
      themeSwitches: 0, // TODO: Implement counter
      classApplications: 0, // TODO: Implement counter
      averageSwitchTime: 0, // TODO: Implement timing
      lastSwitchTime: 0, // TODO: Implement timing
      memoryUsage: 0, // TODO: Implement memory tracking
      cacheHitRate: 0, // TODO: Implement cache tracking
      performance: {
        totalSwitchTime: 0,
        switchesPerSecond: 0,
        cacheEfficiency: 0,
      },
      themeTypes: {
        light: this.getThemesByType(ThemeType.LIGHT).length,
        dark: this.getThemesByType(ThemeType.DARK).length,
        auto: this.getThemesByType(ThemeType.AUTO).length,
        custom: this.getThemesByType(ThemeType.CUSTOM).length,
      },
      themeVariants: {
        default: 0, // TODO: Implement variant counting
        primary: 0,
        secondary: 0,
        success: 0,
        warning: 0,
        error: 0,
        info: 0,
      },
    };
  }

  /**
   * Export theme configuration
   */
  exportTheme(themeId: string): string {
    const theme = this.getTheme(themeId);
    if (!theme) {
      throw new Error(`Theme not found: ${themeId}`);
    }

    const config: IThemeConfiguration = {
      metadata: {
        version: '1.0.0',
        exportedAt: new Date(),
        exportedBy: 'ThemeManager',
      },
      theme: theme,
    };

    return JSON.stringify(config, null, 2);
  }

  /**
   * Import theme configuration
   */
  importTheme(config: string): ITheme {
    try {
      const parsedConfig: IThemeConfiguration = JSON.parse(config);
      this.registerTheme(parsedConfig.theme);
      return parsedConfig.theme;
    } catch (error) {
      throw new Error(`Failed to import theme: ${error}`);
    }
  }

  // ============================================================================
  // LIFECYCLE METHODS
  // ============================================================================

  /**
   * Reset the manager to initial state
   */
  reset(): void {
    this.themesMap.clear();
    this.activeThemeInstance = null;
    this.currentThemeTypeInstance = ThemeType.CUSTOM;
    this.isInitializedInstance = false;
    this.listenersSet.clear();
    this.themeCacheMap.clear();
  }

  /**
   * Destroy the manager and clean up resources
   */
  destroy(): void {
    this.reset();
  }

  // ============================================================================
  // PRIVATE HELPER METHODS
  // ============================================================================

  /**
   * Validate theme configuration
   */
  private validateTheme(theme: ITheme): void {
    if (!theme.id || !theme.name) {
      throw new Error('Theme must have id and name');
    }

    if (!theme.colors) {
      throw new Error('Theme must have colors defined');
    }

    if (!theme.typography) {
      throw new Error('Theme must have typography defined');
    }
  }

  /**
   * Cache theme classes for performance
   */
  private cacheThemeClasses(theme: ITheme): void {
    if (theme.themeClasses) {
      Object.entries(theme.themeClasses).forEach(([selector, themeClass]) => {
        this.themeCacheMap.set(`${theme.id}:${selector}`, themeClass);
      });
    }
  }

  /**
   * Clear theme cache
   */
  private clearThemeCache(themeId: string): void {
    const keysToDelete: string[] = [];

    this.themeCacheMap.forEach((_, key) => {
      if (key.startsWith(`${themeId}:`)) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.themeCacheMap.delete(key));
  }

  /**
   * Apply theme to DOM
   */
  private async applyThemeToDOM(theme: ITheme): Promise<void> {
    try {
      // Create or update CSS custom properties
      this.injectCSSVariables(theme);

      // Apply theme classes to body
      if (theme.themeClasses) {
        this.applyThemeClasses(theme);
      }

      logger.info('ThemeManager', 'applyThemeToDOM', 'Theme applied to DOM', { themeId: theme.id });
    } catch (error) {
      logger.error('ThemeManager', 'applyThemeToDOM', 'Failed to apply theme to DOM', {
        error,
        themeId: theme.id,
      });
      throw error;
    }
  }

  /**
   * Remove theme from DOM
   */
  private async removeThemeFromDOM(theme: ITheme): Promise<void> {
    try {
      // Remove theme-specific CSS classes
      this.removeThemeClasses(theme);

      logger.info('ThemeManager', 'removeThemeFromDOM', 'Theme removed from DOM', {
        themeId: theme.id,
      });
    } catch (error) {
      logger.error('ThemeManager', 'removeThemeFromDOM', 'Failed to remove theme from DOM', {
        error,
        themeId: theme.id,
      });
      throw error;
    }
  }

  /**
   * Inject CSS custom properties
   */
  private injectCSSVariables(theme: ITheme): void {
    const root = document.documentElement;

    // Inject color variables
    if (theme.colors) {
      this.injectColorVariables(root, theme.colors, '--theme-color');
    }

    // Inject spacing variables
    if (theme.spacing?.scale) {
      Object.entries(theme.spacing.scale).forEach(([key, value]) => {
        root.style.setProperty(`--theme-spacing-${key}`, `${value}px`);
      });
    }

    // Inject typography variables
    if (theme.typography?.fontSize) {
      Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
        root.style.setProperty(`--theme-font-size-${key}`, `${value}px`);
      });
    }
  }

  /**
   * Inject color variables recursively
   */
  private injectColorVariables(element: HTMLElement, colors: any, prefix: string): void {
    Object.entries(colors).forEach(([key, value]) => {
      if (typeof value === 'string') {
        element.style.setProperty(`${prefix}-${key}`, value);
      } else if (typeof value === 'object' && value !== null) {
        this.injectColorVariables(element, value, `${prefix}-${key}`);
      }
    });
  }

  /**
   * Apply theme classes to body
   */
  private applyThemeClasses(theme: ITheme): void {
    const body = document.body;

    // Add theme identifier class
    body.classList.add(`theme-${theme.id}`);

    // Apply theme classes
    if (theme.themeClasses) {
      Object.keys(theme.themeClasses).forEach(selector => {
        const className = selector.replace('.', '');
        body.classList.add(className);
      });
    }
  }

  /**
   * Remove theme classes from body
   */
  private removeThemeClasses(theme: ITheme): void {
    const body = document.body;

    // Remove theme identifier class
    body.classList.remove(`theme-${theme.id}`);

    // Remove theme classes
    if (theme.themeClasses) {
      Object.keys(theme.themeClasses).forEach(selector => {
        const className = selector.replace('.', '');
        body.classList.remove(className);
      });
    }
  }

  /**
   * Notify listeners of theme activation
   */
  private notifyThemeActivated(theme: ITheme): void {
    this.listenersSet.forEach(listener => {
      try {
        listener.onThemeActivated?.(theme, this.activeThemeInstance);
      } catch (error) {
        logger.error('ThemeManager', 'notifyThemeActivated', 'Error in theme listener', {
          error,
          themeId: theme.id,
        });
      }
    });
  }

  /**
   * Notify listeners of theme deactivation
   */
  private notifyThemeDeactivated(theme: ITheme): void {
    this.listenersSet.forEach(listener => {
      try {
        listener.onThemeDeactivated?.(theme, null);
      } catch (error) {
        logger.error('ThemeManager', 'notifyThemeDeactivated', 'Error in theme listener', {
          error,
          themeId: theme.id,
        });
      }
    });
  }

  /**
   * Apply styles from theme class to element
   */
  private applyStylesToElement(element: HTMLElement, themeClass: IThemeClass): void {
    // Apply basic styles
    if (themeClass.backgroundColor) {
      element.style.backgroundColor = themeClass.backgroundColor;
    }
    if (themeClass.color) {
      element.style.color = themeClass.color;
    }
    if (themeClass.padding) {
      element.style.padding = `${themeClass.padding}px`;
    }
    if (themeClass.margin) {
      element.style.margin = `${themeClass.margin}px`;
    }
    if (themeClass.borderRadius) {
      element.style.borderRadius = `${themeClass.borderRadius}px`;
    }
    if (themeClass.borderRadiusValue) {
      element.style.borderRadius = `${themeClass.borderRadiusValue}px`;
    }
    if (themeClass.fontSize) {
      element.style.fontSize = `${themeClass.fontSize}px`;
    }
    if (themeClass.fontWeight) {
      element.style.fontWeight = themeClass.fontWeight.toString();
    }
    if (themeClass.textAlign) {
      element.style.textAlign = themeClass.textAlign;
    }
    if (themeClass.display) {
      element.style.display = themeClass.display;
    }
    if (themeClass.flexDirection) {
      element.style.flexDirection = themeClass.flexDirection;
    }
    if (themeClass.alignItems) {
      element.style.alignItems = themeClass.alignItems;
    }
    if (themeClass.justifyContent) {
      element.style.justifyContent = themeClass.justifyContent;
    }
    if (themeClass.cursor) {
      element.style.cursor = themeClass.cursor;
    }
    if (themeClass.boxSizing) {
      element.style.boxSizing = themeClass.boxSizing;
    }
    if (themeClass.position) {
      element.style.position = themeClass.position;
    }
    if (themeClass.width && typeof themeClass.width === 'object') {
      element.style.width = `${themeClass.width.value}${themeClass.width.unit}`;
    }
    if (themeClass.height && typeof themeClass.height === 'object') {
      element.style.height = `${themeClass.height.value}${themeClass.height.unit}`;
    }
    if (themeClass.boxShadow) {
      element.style.boxShadow = themeClass.boxShadow;
    }
    if (themeClass.transition) {
      element.style.transition = themeClass.transition;
    }
    if (themeClass.cssAnimation) {
      element.style.animation = themeClass.cssAnimation;
    }
  }
}
