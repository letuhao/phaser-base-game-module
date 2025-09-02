/**
 * Theme Style Engine Interface
 * Defines the contract for advanced style processing and CSS generation
 * Handles CSS-in-JS, dynamic CSS variables, and style optimization
 */

import { ITheme, IThemeClass } from './ITheme';
import { CSSPreloadPriority, CSSValidationSeverity } from '../enums/LayoutEnums';

/**
 * Theme style engine interface
 * Advanced style processing and CSS generation
 */
export interface IThemeStyleEngine {
  /** CSS variable cache for performance */
  readonly cssVariableCache: Map<string, string>;

  /** Generated CSS cache */
  readonly generatedCSSCache: Map<string, string>;

  /** Style optimization settings */
  readonly optimizationSettings: IStyleOptimizationSettings;

  isInitialized(): boolean;

  // ============================================================================
  // CSS GENERATION METHODS
  // ============================================================================

  /**
   * Generate CSS from theme configuration
   * @param theme Theme configuration
   * @param options Generation options
   */
  generateThemeCSS(theme: ITheme, options?: ICSSGenerationOptions): string;

  /**
   * Generate CSS for theme classes
   * @param themeClasses Map of theme classes
   * @param options Generation options
   */
  generateThemeClassesCSS(
    themeClasses: Map<string, IThemeClass>,
    options?: ICSSGenerationOptions
  ): string;

  /**
   * Generate CSS variables from theme
   * @param theme Theme configuration
   * @param options Generation options
   */
  generateCSSVariables(theme: ITheme, options?: ICSSVariableOptions): string;

  /**
   * Generate responsive CSS
   * @param theme Theme configuration
   * @param breakpoints Breakpoint definitions
   * @param options Generation options
   */
  generateResponsiveCSS(
    theme: ITheme,
    breakpoints: Record<string, number>,
    options?: IResponsiveCSSOptions
  ): string;

  // ============================================================================
  // CSS-IN-JS METHODS
  // ============================================================================

  /**
   * Generate CSS-in-JS styles from theme class
   * @param themeClass Theme class definition
   * @param options Generation options
   */
  generateCSSInJSStyles(
    themeClass: IThemeClass,
    options?: ICSSInJSOptions
  ): Record<string, string | number>;

  /**
   * Generate CSS-in-JS styles from theme
   * @param theme Theme configuration
   * @param options Generation options
   */
  generateThemeCSSInJSStyles(
    theme: ITheme,
    options?: ICSSInJSOptions
  ): Record<string, Record<string, string | number>>;

  /**
   * Convert CSS-in-JS to CSS string
   * @param styles CSS-in-JS styles object
   * @param selector CSS selector
   */
  convertCSSInJSToCSS(styles: Record<string, string | number>, selector: string): string;

  // ============================================================================
  // CSS VARIABLE METHODS
  // ============================================================================

  /**
   * Inject CSS variables into document
   * @param variables CSS variables object
   * @param scope CSS scope (e.g., ':root', '.theme-dark')
   */
  injectCSSVariables(variables: Record<string, string>, scope?: string): boolean;

  /**
   * Remove CSS variables from document
   * @param scope CSS scope
   */
  removeCSSVariables(scope?: string): boolean;

  /**
   * Update CSS variables
   * @param variables CSS variables object
   * @param scope CSS scope
   */
  updateCSSVariables(variables: Record<string, string>, scope?: string): boolean;

  /**
   * Get CSS variable value
   * @param variableName CSS variable name
   * @param element Element to check (defaults to document root)
   */
  getCSSVariableValue(variableName: string, element?: HTMLElement): string | null;

  // ============================================================================
  // STYLE OPTIMIZATION METHODS
  // ============================================================================

  /**
   * Optimize CSS for performance
   * @param css CSS string to optimize
   * @param options Optimization options
   */
  optimizeCSS(css: string, options?: ICSSOptimizationOptions): string;

  /**
   * Minify CSS
   * @param css CSS string to minify
   */
  minifyCSS(css: string): string;

  /**
   * Remove unused CSS
   * @param css CSS string
   * @param usedSelectors Array of used CSS selectors
   */
  removeUnusedCSS(css: string, usedSelectors: string[]): string;

  /**
   * Merge duplicate CSS rules
   * @param css CSS string
   */
  mergeDuplicateCSSRules(css: string): string;

  // ============================================================================
  // BROWSER COMPATIBILITY METHODS
  // ============================================================================

  /**
   * Add vendor prefixes to CSS
   * @param css CSS string
   * @param browsers Target browsers
   */
  addVendorPrefixes(css: string, browsers?: string[]): string;

  /**
   * Generate fallback CSS for older browsers
   * @param css CSS string
   * @param browsers Target browsers
   */
  generateFallbackCSS(css: string, browsers?: string[]): string;

  /**
   * Check browser support for CSS feature
   * @param feature CSS feature name
   * @param browsers Target browsers
   */
  checkBrowserSupport(feature: string, browsers?: string[]): boolean;

  // ============================================================================
  // STYLE VALIDATION METHODS
  // ============================================================================

  /**
   * Validate CSS syntax
   * @param css CSS string to validate
   */
  validateCSS(css: string): ICSSValidationResult;

  /**
   * Validate CSS property
   * @param property CSS property name
   * @param value CSS property value
   */
  validateCSSProperty(property: string, value: string): boolean;

  /**
   * Get CSS property suggestions
   * @param property CSS property name
   * @param value CSS property value
   */
  getCSSPropertySuggestions(property: string, value: string): string[];

  // ============================================================================
  // PERFORMANCE METHODS
  // ============================================================================

  /**
   * Clear CSS caches
   */
  clearCaches(): void;

  /**
   * Get cache statistics
   */
  getCacheStatistics(): ICacheStatistics;

  /**
   * Preload CSS resources
   * @param css CSS string
   * @param options Preload options
   */
  preloadCSSResources(css: string, options?: ICSSPreloadOptions): Promise<void>;

  // ============================================================================
  // LIFECYCLE METHODS
  // ============================================================================

  /**
   * Initialize the style engine
   * @param options Initialization options
   */
  initialize(options?: IStyleEngineOptions): void;

  /**
   * Destroy the style engine
   */
  destroy(): void;
}

/**
 * CSS generation options
 */
export interface ICSSGenerationOptions {
  /** Whether to include CSS variables */
  includeVariables?: boolean;

  /** Whether to include responsive styles */
  includeResponsive?: boolean;

  /** Whether to optimize CSS */
  optimize?: boolean;

  /** Whether to minify CSS */
  minify?: boolean;

  /** Custom CSS prefix */
  prefix?: string;

  /** Custom CSS suffix */
  suffix?: string;

  /** Whether to include comments */
  includeComments?: boolean;

  /** Target browsers for compatibility */
  browsers?: string[];
}

/**
 * CSS variable options
 */
export interface ICSSVariableOptions {
  /** CSS variable prefix */
  prefix?: string;

  /** Whether to use kebab-case for variable names */
  useKebabCase?: boolean;

  /** Whether to include fallback values */
  includeFallbacks?: boolean;

  /** Custom variable scope */
  scope?: string;
}

/**
 * Responsive CSS options
 */
export interface IResponsiveCSSOptions {
  /** Mobile-first approach */
  mobileFirst?: boolean;

  /** Maximum breakpoint */
  maxBreakpoint?: number;

  /** Whether to include base styles */
  includeBase?: boolean;

  /** Custom media query format */
  mediaQueryFormat?: string;
}

/**
 * CSS-in-JS options
 */
export interface ICSSInJSOptions {
  /** Whether to use CSS variables */
  useCSSVariables?: boolean;

  /** Whether to include vendor prefixes */
  includeVendorPrefixes?: boolean;

  /** Whether to include fallbacks */
  includeFallbacks?: boolean;

  /** Custom property mapping */
  propertyMapping?: Record<string, string>;
}

/**
 * CSS optimization options
 */
export interface ICSSOptimizationOptions {
  /** Whether to remove unused CSS */
  removeUnused?: boolean;

  /** Whether to merge duplicate rules */
  mergeDuplicates?: boolean;

  /** Whether to minify CSS */
  minify?: boolean;

  /** Whether to add vendor prefixes */
  addVendorPrefixes?: boolean;

  /** Target browsers */
  browsers?: string[];
}

/**
 * CSS preload options
 */
export interface ICSSPreloadOptions {
  /** Preload priority */
  priority?: CSSPreloadPriority;

  /** Whether to preload fonts */
  preloadFonts?: boolean;

  /** Whether to preload images */
  preloadImages?: boolean;
}

/**
 * Style engine options
 */
export interface IStyleEngineOptions {
  /** Default optimization settings */
  defaultOptimization?: IStyleOptimizationSettings;

  /** Default browser support */
  defaultBrowsers?: string[];

  /** Whether to enable caching */
  enableCaching?: boolean;

  /** Cache size limit */
  cacheSizeLimit?: number;
}

/**
 * Style optimization settings
 */
export interface IStyleOptimizationSettings {
  /** Whether to enable optimization */
  enabled: boolean;

  /** Whether to minify CSS */
  minify: boolean;

  /** Whether to remove unused CSS */
  removeUnused: boolean;

  /** Whether to merge duplicate rules */
  mergeDuplicates: boolean;

  /** Whether to add vendor prefixes */
  addVendorPrefixes: boolean;

  /** Target browsers */
  browsers: string[];

  /** Optimization level (1-3) */
  level: number;
}

/**
 * CSS validation result
 */
export interface ICSSValidationResult {
  /** Whether CSS is valid */
  isValid: boolean;

  /** Validation errors */
  errors: ICSSValidationError[];

  /** Validation warnings */
  warnings: ICSSValidationWarning[];

  /** Parsed CSS rules */
  rules: ICSSRule[];
}

/**
 * CSS validation error
 */
export interface ICSSValidationError {
  /** Error message */
  message: string;

  /** Error line number */
  line: number;

  /** Error column number */
  column: number;

  /** Error severity */
  severity: CSSValidationSeverity;
}

/**
 * CSS validation warning
 */
export interface ICSSValidationWarning {
  /** Warning message */
  message: string;

  /** Warning line number */
  line: number;

  /** Warning column number */
  column: number;

  /** Warning severity */
  severity: CSSValidationSeverity;
}

/**
 * CSS rule
 */
export interface ICSSRule {
  /** Rule selector */
  selector: string;

  /** Rule properties */
  properties: Record<string, string>;

  /** Rule specificity */
  specificity: number;

  /** Rule line number */
  line: number;
}

/**
 * Cache statistics
 */
export interface ICacheStatistics {
  /** CSS variable cache size */
  cssVariableCacheSize: number;

  /** Generated CSS cache size */
  generatedCSSCacheSize: number;

  /** Cache hit ratio */
  cacheHitRatio: number;

  /** Memory usage in bytes */
  memoryUsage: number;

  /** Cache evictions */
  cacheEvictions: number;
}
