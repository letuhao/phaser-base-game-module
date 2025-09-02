/**
 * Theme Style Engine
 * Advanced style processing and CSS generation for the theme system
 * Handles CSS-in-JS, dynamic CSS variables, style optimization, and browser compatibility
 */

import {
  IThemeStyleEngine,
  ICSSGenerationOptions,
  ICSSVariableOptions,
  IResponsiveCSSOptions,
  ICSSInJSOptions,
  ICSSOptimizationOptions,
  ICSSPreloadOptions,
  IStyleEngineOptions,
  IStyleOptimizationSettings,
  ICSSValidationResult,
  ICSSValidationError,
  ICSSValidationWarning,
  ICSSRule,
  ICacheStatistics,
} from '../interfaces/IThemeStyleEngine';
import { ITheme, IThemeClass } from '../interfaces/ITheme';
import { CSSValidationSeverity } from '../enums/LayoutEnums';
import { logger } from '../../core/Logger';

export class ThemeStyleEngine implements IThemeStyleEngine {
  // ============================================================================
  // PROPERTIES
  // ============================================================================

  public readonly cssVariableCache: Map<string, string> = new Map();
  public readonly generatedCSSCache: Map<string, string> = new Map();
  public readonly optimizationSettings: IStyleOptimizationSettings;

  private _isInitialized: boolean = false;
  private cacheHits: number = 0;
  private cacheMisses: number = 0;
  private cacheEvictions: number = 0;
  private defaultBrowsers: string[] = ['chrome', 'firefox', 'safari', 'edge'];

  public isInitialized(): boolean {
    return this._isInitialized;
  }

  // ============================================================================
  // CONSTRUCTOR
  // ============================================================================

  constructor() {
    this.optimizationSettings = {
      enabled: true,
      minify: true,
      removeUnused: false,
      mergeDuplicates: true,
      addVendorPrefixes: true,
      browsers: this.defaultBrowsers,
      level: 2,
    };
  }

  // ============================================================================
  // CSS GENERATION METHODS
  // ============================================================================

  public generateThemeCSS(theme: ITheme, options: ICSSGenerationOptions = {}): string {
    try {
      logger.debug('ThemeStyleEngine', 'generateThemeCSS', 'Generating theme CSS', {
        themeId: theme.id,
        options,
      });

      const cacheKey = `theme_${theme.id}_${JSON.stringify(options)}`;

      // Check cache first
      if (this.generatedCSSCache.has(cacheKey)) {
        this.cacheHits++;
        return this.generatedCSSCache.get(cacheKey)!;
      }

      this.cacheMisses++;

      let css = '';

      // Generate CSS variables if requested
      if (options.includeVariables !== false) {
        css += this.generateCSSVariables(theme, {
          prefix: options.prefix,
          scope: ':root',
        });
      }

      // Generate theme classes CSS
      if (theme.themeClasses) {
        const themeClassesMap = new Map(Object.entries(theme.themeClasses));
        css += this.generateThemeClassesCSS(themeClassesMap, options);
      }

      // Generate responsive CSS if requested
      if (options.includeResponsive && theme.breakpoints) {
        css += this.generateResponsiveCSS(
          theme,
          theme.breakpoints as unknown as Record<string, number>,
          {
            mobileFirst: true,
            includeBase: true,
          }
        );
      }

      // Optimize CSS if requested
      if (options.optimize !== false && this.optimizationSettings.enabled) {
        css = this.optimizeCSS(css, {
          minify: options.minify !== false,
          mergeDuplicates: this.optimizationSettings.mergeDuplicates,
          addVendorPrefixes: this.optimizationSettings.addVendorPrefixes,
          browsers: options.browsers || this.optimizationSettings.browsers,
        });
      }

      // Add prefix and suffix
      if (options.prefix) {
        css = options.prefix + '\n' + css;
      }
      if (options.suffix) {
        css = css + '\n' + options.suffix;
      }

      // Cache the result
      this.generatedCSSCache.set(cacheKey, css);

      logger.info('ThemeStyleEngine', 'generateThemeCSS', 'Theme CSS generated successfully', {
        themeId: theme.id,
        cssLength: css.length,
      });

      return css;
    } catch (error) {
      logger.error('ThemeStyleEngine', 'generateThemeCSS', 'Failed to generate theme CSS', {
        error,
        themeId: theme.id,
      });
      return '';
    }
  }

  public generateThemeClassesCSS(
    themeClasses: Map<string, IThemeClass>,
    options: ICSSGenerationOptions = {}
  ): string {
    try {
      logger.debug('ThemeStyleEngine', 'generateThemeClassesCSS', 'Generating theme classes CSS', {
        classCount: themeClasses.size,
        options,
      });

      let css = '';

      if (options.includeComments !== false) {
        css += '/* Theme Classes */\n';
      }

      themeClasses.forEach((themeClass, className) => {
        css += this.generateCSSFromThemeClass(className, themeClass, options);
      });

      return css;
    } catch (error) {
      logger.error(
        'ThemeStyleEngine',
        'generateThemeClassesCSS',
        'Failed to generate theme classes CSS',
        { error }
      );
      return '';
    }
  }

  public generateCSSVariables(theme: ITheme, options: ICSSVariableOptions = {}): string {
    try {
      logger.debug('ThemeStyleEngine', 'generateCSSVariables', 'Generating CSS variables', {
        themeId: theme.id,
        options,
      });

      const scope = options.scope || ':root';
      const prefix = options.prefix || '--theme';
      let css = `${scope} {\n`;

      // Generate color variables
      if (theme.colors) {
        css += this.generateColorVariables(theme.colors, prefix);
      }

      // Generate typography variables
      if (theme.typography) {
        css += this.generateTypographyVariables(theme.typography, prefix);
      }

      // Generate spacing variables
      if (theme.spacing) {
        css += this.generateSpacingVariables(theme.spacing, prefix);
      }

      // Generate border radius variables
      if (theme.borderRadius) {
        css += this.generateBorderRadiusVariables(theme.borderRadius, prefix);
      }

      // Generate shadow variables
      if (theme.shadows) {
        css += this.generateShadowVariables(theme.shadows, prefix);
      }

      // Generate animation variables
      if (theme.animation) {
        css += this.generateAnimationVariables(theme.animation, prefix);
      }

      css += '}\n';
      return css;
    } catch (error) {
      logger.error('ThemeStyleEngine', 'generateCSSVariables', 'Failed to generate CSS variables', {
        error,
      });
      return '';
    }
  }

  public generateResponsiveCSS(
    theme: ITheme,
    breakpoints: Record<string, number>,
    options: IResponsiveCSSOptions = {}
  ): string {
    try {
      logger.debug('ThemeStyleEngine', 'generateResponsiveCSS', 'Generating responsive CSS', {
        themeId: theme.id,
        breakpointCount: Object.keys(breakpoints).length,
        options,
      });

      let css = '';

      css += '/* Responsive Styles */\n';

      const sortedBreakpoints = Object.entries(breakpoints).sort(([, a], [, b]) => a - b);

      sortedBreakpoints.forEach(([name, value]) => {
        if (options.maxBreakpoint && value > options.maxBreakpoint) {
          return;
        }

        const mediaQuery = options.mobileFirst
          ? `@media (min-width: ${value}px)`
          : `@media (max-width: ${value}px)`;

        css += `${mediaQuery} {\n`;

        // Generate responsive theme classes
        if (theme.themeClasses) {
          const themeClassesMap = new Map(Object.entries(theme.themeClasses));
          css += this.generateResponsiveThemeClasses(themeClassesMap, name);
        }

        css += '}\n';
      });

      return css;
    } catch (error) {
      logger.error(
        'ThemeStyleEngine',
        'generateResponsiveCSS',
        'Failed to generate responsive CSS',
        { error }
      );
      return '';
    }
  }

  // ============================================================================
  // CSS-IN-JS METHODS
  // ============================================================================

  public generateCSSInJSStyles(
    themeClass: IThemeClass,
    options: ICSSInJSOptions = {}
  ): Record<string, string | number> {
    try {
      logger.debug('ThemeStyleEngine', 'generateCSSInJSStyles', 'Generating CSS-in-JS styles', {
        options,
      });

      const styles: Record<string, string | number> = {};

      // Apply basic styles
      if (themeClass.backgroundColor) {
        styles.backgroundColor = themeClass.backgroundColor;
      }
      if (themeClass.color) {
        styles.color = themeClass.color;
      }
      if (themeClass.padding) {
        styles.padding = `${themeClass.padding}px`;
      }
      if (themeClass.margin) {
        styles.margin = `${themeClass.margin}px`;
      }
      if (themeClass.borderRadius) {
        styles.borderRadius = `${themeClass.borderRadius}px`;
      }
      if (themeClass.fontSize) {
        styles.fontSize = `${themeClass.fontSize}px`;
      }
      if (themeClass.fontWeight) {
        styles.fontWeight = themeClass.fontWeight;
      }
      if (themeClass.textAlign) {
        styles.textAlign = themeClass.textAlign;
      }
      if (themeClass.display) {
        styles.display = themeClass.display;
      }
      if (themeClass.flexDirection) {
        styles.flexDirection = themeClass.flexDirection;
      }
      if (themeClass.alignItems) {
        styles.alignItems = themeClass.alignItems;
      }
      if (themeClass.justifyContent) {
        styles.justifyContent = themeClass.justifyContent;
      }
      if (themeClass.cursor) {
        styles.cursor = themeClass.cursor;
      }
      if (themeClass.boxSizing) {
        styles.boxSizing = themeClass.boxSizing;
      }
      if (themeClass.position) {
        styles.position = themeClass.position;
      }
      if (themeClass.boxShadow) {
        styles.boxShadow = themeClass.boxShadow;
      }
      if (themeClass.transition) {
        styles.transition = themeClass.transition;
      }
      if (themeClass.cssAnimation) {
        styles.animation = themeClass.cssAnimation;
      }

      // Apply width and height with units
      if (themeClass.width && typeof themeClass.width === 'object') {
        styles.width = `${themeClass.width.value}${themeClass.width.unit}`;
      }
      if (themeClass.height && typeof themeClass.height === 'object') {
        styles.height = `${themeClass.height.value}${themeClass.height.unit}`;
      }

      // Add vendor prefixes if requested
      if (options.includeVendorPrefixes) {
        return this.addVendorPrefixesToStyles(styles);
      }

      return styles;
    } catch (error) {
      logger.error(
        'ThemeStyleEngine',
        'generateCSSInJSStyles',
        'Failed to generate CSS-in-JS styles',
        { error }
      );
      return {};
    }
  }

  public generateThemeCSSInJSStyles(
    theme: ITheme,
    options: ICSSInJSOptions = {}
  ): Record<string, Record<string, string | number>> {
    try {
      logger.debug(
        'ThemeStyleEngine',
        'generateThemeCSSInJSStyles',
        'Generating theme CSS-in-JS styles',
        {
          themeId: theme.id,
          options,
        }
      );

      const styles: Record<string, Record<string, string | number>> = {};

      if (theme.themeClasses) {
        Object.entries(theme.themeClasses).forEach(([className, themeClass]) => {
          styles[className] = this.generateCSSInJSStyles(themeClass, options);
        });
      }

      return styles;
    } catch (error) {
      logger.error(
        'ThemeStyleEngine',
        'generateThemeCSSInJSStyles',
        'Failed to generate theme CSS-in-JS styles',
        { error }
      );
      return {};
    }
  }

  public convertCSSInJSToCSS(styles: Record<string, string | number>, selector: string): string {
    try {
      let css = `${selector} {\n`;

      Object.entries(styles).forEach(([property, value]) => {
        css += `  ${property}: ${value};\n`;
      });

      css += '}\n';
      return css;
    } catch (error) {
      logger.error(
        'ThemeStyleEngine',
        'convertCSSInJSToCSS',
        'Failed to convert CSS-in-JS to CSS',
        { error }
      );
      return '';
    }
  }

  // ============================================================================
  // CSS VARIABLE METHODS
  // ============================================================================

  public injectCSSVariables(variables: Record<string, string>, scope: string = ':root'): boolean {
    try {
      logger.debug('ThemeStyleEngine', 'injectCSSVariables', 'Injecting CSS variables', {
        variableCount: Object.keys(variables).length,
        scope,
      });

      // Remove existing variables first
      this.removeCSSVariables(scope);

      let css = `${scope} {\n`;
      Object.entries(variables).forEach(([name, value]) => {
        css += `  ${name}: ${value};\n`;
      });
      css += '}\n';

      // Create and inject style element
      const styleElement = document.createElement('style');
      styleElement.id = `css-variables-${scope.replace(/[^a-zA-Z0-9]/g, '')}`;
      styleElement.textContent = css;
      document.head.appendChild(styleElement);

      logger.info('ThemeStyleEngine', 'injectCSSVariables', 'CSS variables injected successfully', {
        scope,
      });
      return true;
    } catch (error) {
      logger.error('ThemeStyleEngine', 'injectCSSVariables', 'Failed to inject CSS variables', {
        error,
      });
      return false;
    }
  }

  public removeCSSVariables(scope: string = ':root'): boolean {
    try {
      const elementId = `css-variables-${scope.replace(/[^a-zA-Z0-9]/g, '')}`;
      const existingElement = document.getElementById(elementId);

      if (existingElement) {
        existingElement.remove();
        logger.debug('ThemeStyleEngine', 'removeCSSVariables', 'CSS variables removed', { scope });
        return true;
      }

      return false;
    } catch (error) {
      logger.error('ThemeStyleEngine', 'removeCSSVariables', 'Failed to remove CSS variables', {
        error,
      });
      return false;
    }
  }

  public updateCSSVariables(variables: Record<string, string>, scope: string = ':root'): boolean {
    try {
      logger.debug('ThemeStyleEngine', 'updateCSSVariables', 'Updating CSS variables', {
        variableCount: Object.keys(variables).length,
        scope,
      });

      // Remove existing variables
      this.removeCSSVariables(scope);

      // Inject new variables
      return this.injectCSSVariables(variables, scope);
    } catch (error) {
      logger.error('ThemeStyleEngine', 'updateCSSVariables', 'Failed to update CSS variables', {
        error,
      });
      return false;
    }
  }

  public getCSSVariableValue(
    variableName: string,
    element: HTMLElement = document.documentElement
  ): string | null {
    try {
      const computedStyle = window.getComputedStyle(element);
      return computedStyle.getPropertyValue(variableName).trim();
    } catch (error) {
      logger.error('ThemeStyleEngine', 'getCSSVariableValue', 'Failed to get CSS variable value', {
        error,
        variableName,
      });
      return null;
    }
  }

  // ============================================================================
  // STYLE OPTIMIZATION METHODS
  // ============================================================================

  public optimizeCSS(css: string, options: ICSSOptimizationOptions = {}): string {
    try {
      logger.debug('ThemeStyleEngine', 'optimizeCSS', 'Optimizing CSS', {
        cssLength: css.length,
        options,
      });

      let optimizedCSS = css;

      // Remove unused CSS
      if (options.removeUnused) {
        optimizedCSS = this.removeUnusedCSS(optimizedCSS, []);
      }

      // Merge duplicate rules
      if (options.mergeDuplicates !== false) {
        optimizedCSS = this.mergeDuplicateCSSRules(optimizedCSS);
      }

      // Minify CSS
      if (options.minify !== false) {
        optimizedCSS = this.minifyCSS(optimizedCSS);
      }

      // Add vendor prefixes
      if (options.addVendorPrefixes !== false) {
        optimizedCSS = this.addVendorPrefixes(optimizedCSS, options.browsers);
      }

      logger.info('ThemeStyleEngine', 'optimizeCSS', 'CSS optimized successfully', {
        originalLength: css.length,
        optimizedLength: optimizedCSS.length,
      });

      return optimizedCSS;
    } catch (error) {
      logger.error('ThemeStyleEngine', 'optimizeCSS', 'Failed to optimize CSS', { error });
      return css;
    }
  }

  public minifyCSS(css: string): string {
    return css
      .replace(/\s+/g, ' ') // Replace multiple whitespace with single space
      .replace(/;\s*}/g, '}') // Remove trailing semicolons
      .replace(/,\s+/g, ',') // Remove spaces after commas
      .replace(/:\s+/g, ':') // Remove spaces after colons
      .replace(/{\s+/g, '{') // Remove spaces after opening braces
      .replace(/;\s+/g, ';') // Remove spaces after semicolons
      .trim();
  }

  public removeUnusedCSS(css: string, usedSelectors: string[]): string {
    // Basic implementation - in a real scenario, you'd use a more sophisticated CSS parser
    const lines = css.split('\n');
    const filteredLines = lines.filter(line => {
      const trimmedLine = line.trim();
      if (!trimmedLine || trimmedLine.startsWith('/*') || trimmedLine.startsWith('*')) {
        return true; // Keep comments and empty lines
      }

      // Check if line contains a used selector
      return usedSelectors.some(selector => trimmedLine.includes(selector));
    });

    return filteredLines.join('\n');
  }

  public mergeDuplicateCSSRules(css: string): string {
    // Basic implementation - merge rules with same selectors
    const rules = new Map<string, string[]>();
    const lines = css.split('\n');

    let currentSelector = '';
    let currentProperties: string[] = [];

    lines.forEach(line => {
      const trimmedLine = line.trim();

      if (trimmedLine.includes('{')) {
        // New rule starting
        if (currentSelector && currentProperties.length > 0) {
          const existing = rules.get(currentSelector) || [];
          rules.set(currentSelector, [...existing, ...currentProperties]);
        }
        currentSelector = trimmedLine.replace('{', '').trim();
        currentProperties = [];
      } else if (trimmedLine.includes('}')) {
        // Rule ending
        if (currentSelector && currentProperties.length > 0) {
          const existing = rules.get(currentSelector) || [];
          rules.set(currentSelector, [...existing, ...currentProperties]);
        }
        currentSelector = '';
        currentProperties = [];
      } else if (trimmedLine && !trimmedLine.startsWith('/*')) {
        // Property line
        currentProperties.push(trimmedLine);
      }
    });

    // Rebuild CSS
    let mergedCSS = '';
    rules.forEach((properties, selector) => {
      mergedCSS += `${selector} {\n`;
      properties.forEach(property => {
        mergedCSS += `  ${property}\n`;
      });
      mergedCSS += '}\n';
    });

    return mergedCSS;
  }

  // ============================================================================
  // BROWSER COMPATIBILITY METHODS
  // ============================================================================

  public addVendorPrefixes(css: string, _browsers: string[] = this.defaultBrowsers): string {
    // Basic implementation - add common vendor prefixes
    const prefixMap: Record<string, string[]> = {
      transform: ['-webkit-transform', '-moz-transform', '-ms-transform'],
      transition: ['-webkit-transition', '-moz-transition', '-o-transition'],
      animation: ['-webkit-animation', '-moz-animation', '-o-animation'],
      flex: ['-webkit-flex', '-ms-flex'],
      'flex-direction': ['-webkit-flex-direction', '-ms-flex-direction'],
      'justify-content': ['-webkit-justify-content', '-ms-flex-pack'],
      'align-items': ['-webkit-align-items', '-ms-flex-align'],
    };

    let prefixedCSS = css;

    Object.entries(prefixMap).forEach(([property, prefixes]) => {
      const regex = new RegExp(`\\b${property}\\s*:`, 'g');
      prefixedCSS = prefixedCSS.replace(regex, match => {
        return prefixes.map(prefix => `${prefix}:`).join(' ') + ' ' + match;
      });
    });

    return prefixedCSS;
  }

  public generateFallbackCSS(css: string, _browsers: string[] = this.defaultBrowsers): string {
    // Basic implementation - generate fallbacks for older browsers
    let fallbackCSS = css;

    // Add fallbacks for flexbox
    fallbackCSS = fallbackCSS.replace(
      /display:\s*flex/g,
      'display: -webkit-box; display: -ms-flexbox; display: flex'
    );

    // Add fallbacks for CSS Grid
    fallbackCSS = fallbackCSS.replace(/display:\s*grid/g, 'display: -ms-grid; display: grid');

    return fallbackCSS;
  }

  public checkBrowserSupport(feature: string, browsers: string[] = this.defaultBrowsers): boolean {
    // Basic implementation - check browser support for CSS features
    const supportMap: Record<string, Record<string, boolean>> = {
      flexbox: {
        chrome: true,
        firefox: true,
        safari: true,
        edge: true,
        ie: false,
      },
      grid: {
        chrome: true,
        firefox: true,
        safari: true,
        edge: true,
        ie: false,
      },
      'css-variables': {
        chrome: true,
        firefox: true,
        safari: true,
        edge: true,
        ie: false,
      },
    };

    const featureSupport = supportMap[feature];
    if (!featureSupport) {
      return false;
    }

    return browsers.every(browser => featureSupport[browser] !== false);
  }

  // ============================================================================
  // STYLE VALIDATION METHODS
  // ============================================================================

  public validateCSS(css: string): ICSSValidationResult {
    try {
      const errors: ICSSValidationError[] = [];
      const warnings: ICSSValidationWarning[] = [];
      const rules: ICSSRule[] = [];

      // Basic CSS validation
      const lines = css.split('\n');
      let braceCount = 0;
      let inRule = false;
      let currentSelector = '';

      lines.forEach((line, index) => {
        const trimmedLine = line.trim();

        if (trimmedLine.includes('{')) {
          braceCount++;
          inRule = true;
          currentSelector = trimmedLine.replace('{', '').trim();
        } else if (trimmedLine.includes('}')) {
          braceCount--;
          if (braceCount === 0) {
            inRule = false;
            currentSelector = '';
          }
        } else if (inRule && trimmedLine.includes(':')) {
          const [property, value] = trimmedLine.split(':');
          if (property && value) {
            rules.push({
              selector: currentSelector,
              properties: { [property.trim()]: value.trim() },
              specificity: this.calculateSpecificity(currentSelector),
              line: index + 1,
            });
          }
        }
      });

      // Check for unmatched braces
      if (braceCount !== 0) {
        errors.push({
          message: 'Unmatched braces in CSS',
          line: lines.length,
          column: 0,
          severity: CSSValidationSeverity.ERROR,
        });
      }

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        rules,
      };
    } catch (error) {
      logger.error('ThemeStyleEngine', 'validateCSS', 'Failed to validate CSS', { error });
      return {
        isValid: false,
        errors: [
          {
            message: 'CSS validation failed',
            line: 0,
            column: 0,
            severity: CSSValidationSeverity.ERROR,
          },
        ],
        warnings: [],
        rules: [],
      };
    }
  }

  public validateCSSProperty(property: string, _value: string): boolean {
    // Basic CSS property validation
    const validProperties = [
      'color',
      'background-color',
      'font-size',
      'font-weight',
      'padding',
      'margin',
      'border-radius',
      'display',
      'flex-direction',
      'align-items',
      'justify-content',
      'cursor',
      'box-sizing',
      'position',
      'box-shadow',
      'transition',
      'animation',
    ];

    return validProperties.includes(property);
  }

  public getCSSPropertySuggestions(property: string, _value: string): string[] {
    // Basic CSS property suggestions
    const suggestions: Record<string, string[]> = {
      display: ['block', 'inline', 'flex', 'grid', 'none'],
      position: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      cursor: ['default', 'pointer', 'text', 'move', 'not-allowed'],
      'text-align': ['left', 'center', 'right', 'justify'],
      'flex-direction': ['row', 'column', 'row-reverse', 'column-reverse'],
    };

    return suggestions[property] || [];
  }

  // ============================================================================
  // PERFORMANCE METHODS
  // ============================================================================

  public clearCaches(): void {
    this.cssVariableCache.clear();
    this.generatedCSSCache.clear();
    this.cacheHits = 0;
    this.cacheMisses = 0;
    this.cacheEvictions = 0;
    logger.debug('ThemeStyleEngine', 'clearCaches', 'Caches cleared');
  }

  public getCacheStatistics(): ICacheStatistics {
    const totalRequests = this.cacheHits + this.cacheMisses;
    const cacheHitRatio = totalRequests > 0 ? this.cacheHits / totalRequests : 0;

    return {
      cssVariableCacheSize: this.cssVariableCache.size,
      generatedCSSCacheSize: this.generatedCSSCache.size,
      cacheHitRatio,
      memoryUsage: this.estimateMemoryUsage(),
      cacheEvictions: this.cacheEvictions,
    };
  }

  public async preloadCSSResources(css: string, options: ICSSPreloadOptions = {}): Promise<void> {
    try {
      logger.debug('ThemeStyleEngine', 'preloadCSSResources', 'Preloading CSS resources', {
        options,
      });

      // Extract URLs from CSS
      const urlRegex = /url\(['"]?([^'"]+)['"]?\)/g;
      const urls: string[] = [];
      let match;

      while ((match = urlRegex.exec(css)) !== null) {
        urls.push(match[1]);
      }

      // Preload resources
      const preloadPromises = urls.map(url => {
        return new Promise<void>(resolve => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.href = url;
          link.as = this.getResourceType(url);
          link.onload = () => resolve();
          link.onerror = () => resolve(); // Continue even if preload fails
          document.head.appendChild(link);
        });
      });

      await Promise.all(preloadPromises);
      logger.info('ThemeStyleEngine', 'preloadCSSResources', 'CSS resources preloaded', {
        resourceCount: urls.length,
      });
    } catch (error) {
      logger.error('ThemeStyleEngine', 'preloadCSSResources', 'Failed to preload CSS resources', {
        error,
      });
    }
  }

  // ============================================================================
  // LIFECYCLE METHODS
  // ============================================================================

  public initialize(options: IStyleEngineOptions = {}): void {
    try {
      logger.info('ThemeStyleEngine', 'initialize', 'Initializing theme style engine');

      if (options.defaultOptimization) {
        Object.assign(this.optimizationSettings, options.defaultOptimization);
      }

      if (options.defaultBrowsers) {
        this.defaultBrowsers = options.defaultBrowsers;
      }

      this._isInitialized = true;
      logger.info('ThemeStyleEngine', 'initialize', 'Theme style engine initialized successfully');
    } catch (error) {
      logger.error('ThemeStyleEngine', 'initialize', 'Failed to initialize theme style engine', {
        error,
      });
    }
  }

  public destroy(): void {
    try {
      logger.info('ThemeStyleEngine', 'destroy', 'Destroying theme style engine');

      this.clearCaches();
      this._isInitialized = false;

      logger.info('ThemeStyleEngine', 'destroy', 'Theme style engine destroyed successfully');
    } catch (error) {
      logger.error('ThemeStyleEngine', 'destroy', 'Failed to destroy theme style engine', {
        error,
      });
    }
  }

  // ============================================================================
  // PRIVATE HELPER METHODS
  // ============================================================================

  private generateCSSFromThemeClass(
    className: string,
    themeClass: IThemeClass,
    _options: ICSSGenerationOptions
  ): string {
    let css = `${className} {\n`;

    // Add CSS properties
    if (themeClass.backgroundColor) css += `  background-color: ${themeClass.backgroundColor};\n`;
    if (themeClass.color) css += `  color: ${themeClass.color};\n`;
    if (themeClass.padding) css += `  padding: ${themeClass.padding}px;\n`;
    if (themeClass.margin) css += `  margin: ${themeClass.margin}px;\n`;
    if (themeClass.borderRadius) css += `  border-radius: ${themeClass.borderRadius}px;\n`;
    if (themeClass.borderRadiusValue)
      css += `  border-radius: ${themeClass.borderRadiusValue}px;\n`;
    if (themeClass.fontSize) css += `  font-size: ${themeClass.fontSize}px;\n`;
    if (themeClass.fontWeight) css += `  font-weight: ${themeClass.fontWeight};\n`;
    if (themeClass.textAlign) css += `  text-align: ${themeClass.textAlign};\n`;
    if (themeClass.display) css += `  display: ${themeClass.display};\n`;
    if (themeClass.flexDirection) css += `  flex-direction: ${themeClass.flexDirection};\n`;
    if (themeClass.alignItems) css += `  align-items: ${themeClass.alignItems};\n`;
    if (themeClass.justifyContent) css += `  justify-content: ${themeClass.justifyContent};\n`;
    if (themeClass.cursor) css += `  cursor: ${themeClass.cursor};\n`;
    if (themeClass.boxSizing) css += `  box-sizing: ${themeClass.boxSizing};\n`;
    if (themeClass.position) css += `  position: ${themeClass.position};\n`;
    if (themeClass.boxShadow) css += `  box-shadow: ${themeClass.boxShadow};\n`;
    if (themeClass.transition) css += `  transition: ${themeClass.transition};\n`;
    if (themeClass.cssAnimation) css += `  animation: ${themeClass.cssAnimation};\n`;

    // Add width and height with units
    if (themeClass.width && typeof themeClass.width === 'object') {
      css += `  width: ${themeClass.width.value}${themeClass.width.unit};\n`;
    }
    if (themeClass.height && typeof themeClass.height === 'object') {
      css += `  height: ${themeClass.height.value}${themeClass.height.unit};\n`;
    }

    css += '}\n';
    return css;
  }

  private generateColorVariables(colors: any, prefix: string): string {
    let css = '';

    const generateColorVariablesRecursive = (colorObj: any, path: string = '') => {
      Object.entries(colorObj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          generateColorVariablesRecursive(value, path ? `${path}-${key}` : key);
        } else if (typeof value === 'string') {
          const variableName = `${prefix}-color-${path ? `${path}-` : ''}${key}`;
          css += `  ${variableName}: ${value};\n`;
        }
      });
    };

    generateColorVariablesRecursive(colors);
    return css;
  }

  private generateTypographyVariables(typography: any, prefix: string): string {
    let css = '';

    if (typography.fontFamily) {
      css += `  ${prefix}-font-family: ${typography.fontFamily};\n`;
    }

    if (typography.fontSize) {
      Object.entries(typography.fontSize).forEach(([key, value]) => {
        css += `  ${prefix}-font-size-${key}: ${value}px;\n`;
      });
    }

    if (typography.fontWeight) {
      Object.entries(typography.fontWeight).forEach(([key, value]) => {
        css += `  ${prefix}-font-weight-${key}: ${value};\n`;
      });
    }

    if (typography.lineHeight) {
      Object.entries(typography.lineHeight).forEach(([key, value]) => {
        css += `  ${prefix}-line-height-${key}: ${value};\n`;
      });
    }

    return css;
  }

  private generateSpacingVariables(spacing: any, prefix: string): string {
    let css = '';

    if (spacing.scale) {
      Object.entries(spacing.scale).forEach(([key, value]) => {
        css += `  ${prefix}-spacing-${key}: ${value}px;\n`;
      });
    }

    return css;
  }

  private generateBorderRadiusVariables(borderRadius: any, prefix: string): string {
    let css = '';

    Object.entries(borderRadius).forEach(([key, value]) => {
      css += `  ${prefix}-border-radius-${key}: ${value}px;\n`;
    });

    return css;
  }

  private generateShadowVariables(shadows: any, prefix: string): string {
    let css = '';

    Object.entries(shadows).forEach(([key, value]) => {
      css += `  ${prefix}-shadow-${key}: ${value};\n`;
    });

    return css;
  }

  private generateAnimationVariables(animation: any, prefix: string): string {
    let css = '';

    if (animation.duration) {
      Object.entries(animation.duration).forEach(([key, value]) => {
        css += `  ${prefix}-animation-duration-${key}: ${value}ms;\n`;
      });
    }

    if (animation.easing) {
      Object.entries(animation.easing).forEach(([key, value]) => {
        css += `  ${prefix}-animation-easing-${key}: ${value};\n`;
      });
    }

    return css;
  }

  private generateResponsiveThemeClasses(
    themeClasses: Map<string, IThemeClass>,
    _breakpointName: string
  ): string {
    let css = '';

    themeClasses.forEach((themeClass, className) => {
      css += `  ${className} {\n`;

      // Add responsive-specific properties
      if (themeClass.fontSize) {
        css += `    font-size: ${themeClass.fontSize}px;\n`;
      }

      css += '  }\n';
    });

    return css;
  }

  private addVendorPrefixesToStyles(
    styles: Record<string, string | number>
  ): Record<string, string | number> {
    const prefixedStyles = { ...styles };

    // Add vendor prefixes for specific properties
    const prefixMap: Record<string, string[]> = {
      transform: ['-webkit-transform', '-moz-transform', '-ms-transform'],
      transition: ['-webkit-transition', '-moz-transition', '-o-transition'],
      animation: ['-webkit-animation', '-moz-animation', '-o-animation'],
    };

    Object.entries(prefixMap).forEach(([property, prefixes]) => {
      if (prefixedStyles[property]) {
        prefixes.forEach(prefix => {
          prefixedStyles[prefix] = prefixedStyles[property];
        });
      }
    });

    return prefixedStyles;
  }

  private calculateSpecificity(selector: string): number {
    // Basic specificity calculation
    const idMatches = (selector.match(/#/g) || []).length;
    const classMatches = (selector.match(/\./g) || []).length;
    const elementMatches = (selector.match(/[a-zA-Z]/g) || []).length;

    return idMatches * 100 + classMatches * 10 + elementMatches;
  }

  private estimateMemoryUsage(): number {
    let memoryUsage = 0;

    // CSS variable cache
    this.cssVariableCache.forEach(value => {
      memoryUsage += value.length * 2;
    });

    // Generated CSS cache
    this.generatedCSSCache.forEach(value => {
      memoryUsage += value.length * 2;
    });

    return memoryUsage;
  }

  private getResourceType(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'woff':
      case 'woff2':
      case 'ttf':
      case 'otf':
        return 'font';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
        return 'image';
      case 'mp3':
      case 'wav':
      case 'ogg':
        return 'audio';
      case 'mp4':
      case 'webm':
        return 'video';
      default:
        return 'fetch';
    }
  }
}
