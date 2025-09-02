/**
 * Theme Class Manager Interface
 * Defines the contract for managing CSS class application and management
 * Handles dynamic style injection and class conflict resolution
 */

import { ITheme, IThemeClass } from './ITheme';

/**
 * Theme class manager interface
 * Manages CSS class application to DOM elements
 */
export interface IThemeClassManager {
  /** Current active theme classes */
  readonly activeClasses: Map<string, IThemeClass>;

  /** Applied classes tracking */
  readonly appliedClasses: Map<HTMLElement, Set<string>>;

  /** CSS cache for performance */
  readonly cssCache: Map<string, string>;

  isInitialized(): boolean;

  getStyleElement(): HTMLStyleElement | null;

  // ============================================================================
  // CLASS APPLICATION METHODS
  // ============================================================================

  /**
   * Apply a theme class to an element
   * @param element Target DOM element
   * @param className Theme class name
   * @param options Application options
   */
  applyClass(element: HTMLElement, className: string, options?: IClassApplicationOptions): boolean;

  /**
   * Remove a theme class from an element
   * @param element Target DOM element
   * @param className Theme class name
   */
  removeClass(element: HTMLElement, className: string): boolean;

  /**
   * Apply multiple theme classes to an element
   * @param element Target DOM element
   * @param classNames Array of theme class names
   * @param options Application options
   */
  applyClasses(
    element: HTMLElement,
    classNames: string[],
    options?: IClassApplicationOptions
  ): boolean[];

  /**
   * Remove multiple theme classes from an element
   * @param element Target DOM element
   * @param classNames Array of theme class names
   */
  removeClasses(element: HTMLElement, classNames: string[]): boolean[];

  /**
   * Clear all theme classes from an element
   * @param element Target DOM element
   */
  clearClasses(element: HTMLElement): boolean;

  /**
   * Replace theme classes on an element
   * @param element Target DOM element
   * @param oldClassNames Classes to remove
   * @param newClassNames Classes to add
   * @param options Application options
   */
  replaceClasses(
    element: HTMLElement,
    oldClassNames: string[],
    newClassNames: string[],
    options?: IClassApplicationOptions
  ): boolean;

  // ============================================================================
  // CLASS QUERY METHODS
  // ============================================================================

  /**
   * Check if a theme class is applied to an element
   * @param element Target DOM element
   * @param className Theme class name
   */
  hasClass(element: HTMLElement, className: string): boolean;

  /**
   * Get all applied theme classes for an element
   * @param element Target DOM element
   */
  getAppliedClasses(element: HTMLElement): string[];

  /**
   * Get theme class definition
   * @param className Theme class name
   */
  getClassDefinition(className: string): IThemeClass | undefined;

  /**
   * Check if a theme class exists
   * @param className Theme class name
   */
  hasClassDefinition(className: string): boolean;

  // ============================================================================
  // BATCH OPERATIONS
  // ============================================================================

  /**
   * Apply theme classes to multiple elements
   * @param elements Array of DOM elements
   * @param classNames Array of theme class names
   * @param options Application options
   */
  applyClassesToElements(
    elements: HTMLElement[],
    classNames: string[],
    options?: IClassApplicationOptions
  ): Map<HTMLElement, boolean[]>;

  /**
   * Remove theme classes from multiple elements
   * @param elements Array of DOM elements
   * @param classNames Array of theme class names
   */
  removeClassesFromElements(
    elements: HTMLElement[],
    classNames: string[]
  ): Map<HTMLElement, boolean[]>;

  /**
   * Clear all theme classes from multiple elements
   * @param elements Array of DOM elements
   */
  clearClassesFromElements(elements: HTMLElement[]): Map<HTMLElement, boolean>;

  // ============================================================================
  // CSS GENERATION METHODS
  // ============================================================================

  /**
   * Generate CSS for a theme class
   * @param className Theme class name
   * @param themeClass Theme class definition
   */
  generateCSS(className: string, themeClass: IThemeClass): string;

  /**
   * Generate CSS for multiple theme classes
   * @param classes Map of class names to theme class definitions
   */
  generateMultipleCSS(classes: Map<string, IThemeClass>): string;

  /**
   * Inject CSS into the document
   * @param css CSS string to inject
   * @param id Unique identifier for the style element
   */
  injectCSS(css: string, id: string): boolean;

  /**
   * Remove CSS from the document
   * @param id Unique identifier for the style element
   */
  removeCSS(id: string): boolean;

  // ============================================================================
  // THEME INTEGRATION METHODS
  // ============================================================================

  /**
   * Update theme classes from a new theme
   * @param theme New theme to apply
   */
  updateThemeClasses(theme: ITheme): void;

  /**
   * Clear all theme classes
   */
  clearAllThemeClasses(): void;

  /**
   * Refresh all applied classes
   */
  refreshAllClasses(): void;

  // ============================================================================
  // CONFLICT RESOLUTION METHODS
  // ============================================================================

  /**
   * Resolve class conflicts between themes
   * @param className Theme class name
   * @param existingClass Existing class definition
   * @param newClass New class definition
   */
  resolveClassConflict(
    className: string,
    existingClass: IThemeClass,
    newClass: IThemeClass
  ): IThemeClass;

  /**
   * Merge theme classes
   * @param baseClass Base theme class
   * @param overrideClass Override theme class
   */
  mergeThemeClasses(baseClass: IThemeClass, overrideClass: IThemeClass): IThemeClass;

  // ============================================================================
  // PERFORMANCE METHODS
  // ============================================================================

  /**
   * Optimize CSS for performance
   * @param css CSS string to optimize
   */
  optimizeCSS(css: string): string;

  /**
   * Clear CSS cache
   */
  clearCSSCache(): void;

  /**
   * Get cache statistics
   */
  getCacheStatistics(): ICacheStatistics;

  // ============================================================================
  // LIFECYCLE METHODS
  // ============================================================================

  /**
   * Initialize the theme class manager
   * @param theme Initial theme
   */
  initialize(theme?: ITheme): void;

  /**
   * Destroy the theme class manager
   */
  destroy(): void;
}

/**
 * Class application options
 */
export interface IClassApplicationOptions {
  /** Whether to force application (override existing styles) */
  force?: boolean;

  /** Whether to use CSS transitions */
  useTransitions?: boolean;

  /** Transition duration in milliseconds */
  transitionDuration?: number;

  /** Whether to preserve existing classes */
  preserveExisting?: boolean;

  /** Custom CSS selector for the element */
  selector?: string;

  /** Whether to apply styles immediately */
  immediate?: boolean;
}

/**
 * Cache statistics interface
 */
export interface ICacheStatistics {
  /** Number of cached CSS entries */
  cssCacheSize: number;

  /** Number of applied classes */
  appliedClassesCount: number;

  /** Number of active theme classes */
  activeClassesCount: number;

  /** Memory usage in bytes */
  memoryUsage: number;

  /** Cache hit ratio */
  cacheHitRatio: number;
}
