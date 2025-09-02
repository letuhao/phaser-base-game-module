/**
 * Theme Class Manager
 * Manages CSS class application and management for the theme system
 * Handles dynamic style injection, class conflict resolution, and performance optimization
 */

import {
  IThemeClassManager,
  IClassApplicationOptions,
  ICacheStatistics,
} from '../interfaces/IThemeClassManager';
import { ITheme, IThemeClass } from '../interfaces/ITheme';
import { logger } from '../../core/Logger';

export class ThemeClassManager implements IThemeClassManager {
  // ============================================================================
  // PROPERTIES
  // ============================================================================

  public readonly activeClasses: Map<string, IThemeClass> = new Map();
  public readonly appliedClasses: Map<HTMLElement, Set<string>> = new Map();
  public readonly cssCache: Map<string, string> = new Map();

  private _styleElement: HTMLStyleElement | null = null;
  private _isInitialized: boolean = false;
  private cacheHits: number = 0;
  private cacheMisses: number = 0;

  public getStyleElement(): HTMLStyleElement | null {
    return this._styleElement;
  }

  public isInitialized(): boolean {
    return this._isInitialized;
  }

  // ============================================================================
  // CLASS APPLICATION METHODS
  // ============================================================================

  public applyClass(
    element: HTMLElement,
    className: string,
    options: IClassApplicationOptions = {}
  ): boolean {
    try {
      logger.debug('ThemeClassManager', 'applyClass', 'Applying theme class', {
        className,
        elementTag: element.tagName,
        options,
      });

      // Validate inputs
      if (!element || !className) {
        logger.warn('ThemeClassManager', 'applyClass', 'Invalid element or class name', {
          element: !!element,
          className,
        });
        return false;
      }

      // Get theme class definition
      const themeClass = this.getClassDefinition(className);
      if (!themeClass) {
        logger.warn('ThemeClassManager', 'applyClass', 'Theme class not found', { className });
        return false;
      }

      // Check if already applied
      if (!options.force && this.hasClass(element, className)) {
        logger.debug('ThemeClassManager', 'applyClass', 'Class already applied', { className });
        return true;
      }

      // Apply the class
      const success = this.applyThemeClassToElement(element, themeClass, options);

      if (success) {
        // Track applied class
        this.trackAppliedClass(element, className);
        logger.info('ThemeClassManager', 'applyClass', 'Theme class applied successfully', {
          className,
        });
      }

      return success;
    } catch (error) {
      logger.error('ThemeClassManager', 'applyClass', 'Failed to apply theme class', {
        error,
        className,
        elementTag: element?.tagName,
      });
      return false;
    }
  }

  public removeClass(element: HTMLElement, className: string): boolean {
    try {
      logger.debug('ThemeClassManager', 'removeClass', 'Removing theme class', {
        className,
        elementTag: element.tagName,
      });

      if (!element || !className) {
        return false;
      }

      // Get theme class definition
      const themeClass = this.getClassDefinition(className);
      if (!themeClass) {
        logger.warn('ThemeClassManager', 'removeClass', 'Theme class not found', { className });
        return false;
      }

      // Remove the class
      const success = this.removeThemeClassFromElement(element, themeClass);

      if (success) {
        // Untrack applied class
        this.untrackAppliedClass(element, className);
        logger.info('ThemeClassManager', 'removeClass', 'Theme class removed successfully', {
          className,
        });
      }

      return success;
    } catch (error) {
      logger.error('ThemeClassManager', 'removeClass', 'Failed to remove theme class', {
        error,
        className,
        elementTag: element?.tagName,
      });
      return false;
    }
  }

  public applyClasses(
    element: HTMLElement,
    classNames: string[],
    options: IClassApplicationOptions = {}
  ): boolean[] {
    logger.debug('ThemeClassManager', 'applyClasses', 'Applying multiple theme classes', {
      classNames,
      elementTag: element.tagName,
    });

    return classNames.map(className => this.applyClass(element, className, options));
  }

  public removeClasses(element: HTMLElement, classNames: string[]): boolean[] {
    logger.debug('ThemeClassManager', 'removeClasses', 'Removing multiple theme classes', {
      classNames,
      elementTag: element.tagName,
    });

    return classNames.map(className => this.removeClass(element, className));
  }

  public clearClasses(element: HTMLElement): boolean {
    try {
      logger.debug('ThemeClassManager', 'clearClasses', 'Clearing all theme classes', {
        elementTag: element.tagName,
      });

      const appliedClasses = this.getAppliedClasses(element);
      if (appliedClasses.length === 0) {
        return true;
      }

      // Remove all applied classes
      const results = this.removeClasses(element, appliedClasses);
      const success = results.every(result => result);

      if (success) {
        this.appliedClasses.delete(element);
        logger.info('ThemeClassManager', 'clearClasses', 'All theme classes cleared', {
          clearedCount: appliedClasses.length,
        });
      }

      return success;
    } catch (error) {
      logger.error('ThemeClassManager', 'clearClasses', 'Failed to clear theme classes', {
        error,
        elementTag: element?.tagName,
      });
      return false;
    }
  }

  public replaceClasses(
    element: HTMLElement,
    oldClassNames: string[],
    newClassNames: string[],
    options: IClassApplicationOptions = {}
  ): boolean {
    try {
      logger.debug('ThemeClassManager', 'replaceClasses', 'Replacing theme classes', {
        oldClassNames,
        newClassNames,
        elementTag: element.tagName,
      });

      // Remove old classes
      const removeResults = this.removeClasses(element, oldClassNames);
      const removeSuccess = removeResults.every(result => result);

      if (!removeSuccess) {
        logger.warn('ThemeClassManager', 'replaceClasses', 'Failed to remove some old classes');
      }

      // Apply new classes
      const applyResults = this.applyClasses(element, newClassNames, options);
      const applySuccess = applyResults.every(result => result);

      const success = removeSuccess && applySuccess;
      logger.info('ThemeClassManager', 'replaceClasses', 'Theme classes replaced', {
        success,
        oldCount: oldClassNames.length,
        newCount: newClassNames.length,
      });

      return success;
    } catch (error) {
      logger.error('ThemeClassManager', 'replaceClasses', 'Failed to replace theme classes', {
        error,
        elementTag: element?.tagName,
      });
      return false;
    }
  }

  // ============================================================================
  // CLASS QUERY METHODS
  // ============================================================================

  public hasClass(element: HTMLElement, className: string): boolean {
    const appliedClasses = this.appliedClasses.get(element);
    return appliedClasses ? appliedClasses.has(className) : false;
  }

  public getAppliedClasses(element: HTMLElement): string[] {
    const appliedClasses = this.appliedClasses.get(element);
    return appliedClasses ? Array.from(appliedClasses) : [];
  }

  public getClassDefinition(className: string): IThemeClass | undefined {
    return this.activeClasses.get(className);
  }

  public hasClassDefinition(className: string): boolean {
    return this.activeClasses.has(className);
  }

  // ============================================================================
  // BATCH OPERATIONS
  // ============================================================================

  public applyClassesToElements(
    elements: HTMLElement[],
    classNames: string[],
    options: IClassApplicationOptions = {}
  ): Map<HTMLElement, boolean[]> {
    logger.debug(
      'ThemeClassManager',
      'applyClassesToElements',
      'Applying classes to multiple elements',
      {
        elementCount: elements.length,
        classCount: classNames.length,
      }
    );

    const results = new Map<HTMLElement, boolean[]>();

    elements.forEach(element => {
      const elementResults = this.applyClasses(element, classNames, options);
      results.set(element, elementResults);
    });

    return results;
  }

  public removeClassesFromElements(
    elements: HTMLElement[],
    classNames: string[]
  ): Map<HTMLElement, boolean[]> {
    logger.debug(
      'ThemeClassManager',
      'removeClassesFromElements',
      'Removing classes from multiple elements',
      {
        elementCount: elements.length,
        classCount: classNames.length,
      }
    );

    const results = new Map<HTMLElement, boolean[]>();

    elements.forEach(element => {
      const elementResults = this.removeClasses(element, classNames);
      results.set(element, elementResults);
    });

    return results;
  }

  public clearClassesFromElements(elements: HTMLElement[]): Map<HTMLElement, boolean> {
    logger.debug(
      'ThemeClassManager',
      'clearClassesFromElements',
      'Clearing classes from multiple elements',
      {
        elementCount: elements.length,
      }
    );

    const results = new Map<HTMLElement, boolean>();

    elements.forEach(element => {
      const success = this.clearClasses(element);
      results.set(element, success);
    });

    return results;
  }

  // ============================================================================
  // CSS GENERATION METHODS
  // ============================================================================

  public generateCSS(className: string, themeClass: IThemeClass): string {
    try {
      // Check cache first
      const cacheKey = `${className}_${JSON.stringify(themeClass)}`;
      if (this.cssCache.has(cacheKey)) {
        this.cacheHits++;
        return this.cssCache.get(cacheKey)!;
      }

      this.cacheMisses++;

      // Generate CSS
      const css = this.buildCSSFromThemeClass(className, themeClass);

      // Cache the result
      this.cssCache.set(cacheKey, css);

      logger.debug('ThemeClassManager', 'generateCSS', 'CSS generated', { className });
      return css;
    } catch (error) {
      logger.error('ThemeClassManager', 'generateCSS', 'Failed to generate CSS', {
        error,
        className,
      });
      return '';
    }
  }

  public generateMultipleCSS(classes: Map<string, IThemeClass>): string {
    logger.debug(
      'ThemeClassManager',
      'generateMultipleCSS',
      'Generating CSS for multiple classes',
      {
        classCount: classes.size,
      }
    );

    let css = '';

    classes.forEach((themeClass, className) => {
      css += this.generateCSS(className, themeClass) + '\n';
    });

    return css;
  }

  public injectCSS(css: string, id: string): boolean {
    try {
      logger.debug('ThemeClassManager', 'injectCSS', 'Injecting CSS', {
        id,
        cssLength: css.length,
      });

      // Validate inputs
      if (!css || !id) {
        logger.warn('ThemeClassManager', 'injectCSS', 'Invalid CSS or ID provided', {
          css: !!css,
          id: !!id,
        });
        return false;
      }

      // Remove existing style element if it exists
      this.removeCSS(id);

      // Create new style element
      const styleElement = document.createElement('style');
      styleElement.id = id;
      styleElement.textContent = css;

      // Inject into document head
      document.head.appendChild(styleElement);

      logger.info('ThemeClassManager', 'injectCSS', 'CSS injected successfully', { id });
      return true;
    } catch (error) {
      logger.error('ThemeClassManager', 'injectCSS', 'Failed to inject CSS', { error, id });
      return false;
    }
  }

  public removeCSS(id: string): boolean {
    try {
      const existingElement = document.getElementById(id);
      if (existingElement) {
        existingElement.remove();
        logger.debug('ThemeClassManager', 'removeCSS', 'CSS removed', { id });
        return true;
      }
      return false;
    } catch (error) {
      logger.error('ThemeClassManager', 'removeCSS', 'Failed to remove CSS', { error, id });
      return false;
    }
  }

  // ============================================================================
  // THEME INTEGRATION METHODS
  // ============================================================================

  public updateThemeClasses(theme: ITheme): void {
    try {
      logger.info('ThemeClassManager', 'updateThemeClasses', 'Updating theme classes', {
        themeId: theme.id,
        classCount: Object.keys(theme.themeClasses || {}).length,
      });

      // Clear existing classes
      this.clearAllThemeClasses();

      // Add new theme classes
      if (theme.themeClasses) {
        Object.entries(theme.themeClasses).forEach(([className, themeClass]) => {
          this.activeClasses.set(className, themeClass);
        });
      }

      // Generate and inject CSS
      const css = this.generateMultipleCSS(this.activeClasses);
      this.injectCSS(css, 'theme-classes');

      logger.info('ThemeClassManager', 'updateThemeClasses', 'Theme classes updated successfully', {
        classCount: this.activeClasses.size,
      });
    } catch (error) {
      logger.error('ThemeClassManager', 'updateThemeClasses', 'Failed to update theme classes', {
        error,
      });
    }
  }

  public clearAllThemeClasses(): void {
    logger.debug('ThemeClassManager', 'clearAllThemeClasses', 'Clearing all theme classes');

    this.activeClasses.clear();
    this.appliedClasses.clear();
    this.removeCSS('theme-classes');
  }

  public refreshAllClasses(): void {
    logger.debug('ThemeClassManager', 'refreshAllClasses', 'Refreshing all applied classes');

    // Re-apply all currently applied classes
    this.appliedClasses.forEach((classNames, element) => {
      classNames.forEach(className => {
        const themeClass = this.getClassDefinition(className);
        if (themeClass) {
          this.applyThemeClassToElement(element, themeClass, { force: true });
        }
      });
    });
  }

  // ============================================================================
  // CONFLICT RESOLUTION METHODS
  // ============================================================================

  public resolveClassConflict(
    className: string,
    existingClass: IThemeClass,
    newClass: IThemeClass
  ): IThemeClass {
    logger.debug('ThemeClassManager', 'resolveClassConflict', 'Resolving class conflict', {
      className,
    });

    // Merge the classes, with new class taking precedence
    return this.mergeThemeClasses(existingClass, newClass);
  }

  public mergeThemeClasses(baseClass: IThemeClass, overrideClass: IThemeClass): IThemeClass {
    return {
      ...baseClass,
      ...overrideClass,
      // Handle nested objects properly
      ...(baseClass.width && overrideClass.width ? { width: overrideClass.width } : {}),
      ...(baseClass.height && overrideClass.height ? { height: overrideClass.height } : {}),
    };
  }

  // ============================================================================
  // PERFORMANCE METHODS
  // ============================================================================

  public optimizeCSS(css: string): string {
    // Basic CSS optimization
    return css
      .replace(/\s+/g, ' ') // Remove extra whitespace
      .replace(/;\s*}/g, '}') // Remove trailing semicolons
      .replace(/,\s+/g, ',') // Remove spaces after commas
      .trim();
  }

  public clearCSSCache(): void {
    this.cssCache.clear();
    this.cacheHits = 0;
    this.cacheMisses = 0;
    logger.debug('ThemeClassManager', 'clearCSSCache', 'CSS cache cleared');
  }

  public getCacheStatistics(): ICacheStatistics {
    const totalRequests = this.cacheHits + this.cacheMisses;
    const cacheHitRatio = totalRequests > 0 ? this.cacheHits / totalRequests : 0;

    return {
      cssCacheSize: this.cssCache.size,
      appliedClassesCount: this.appliedClasses.size,
      activeClassesCount: this.activeClasses.size,
      memoryUsage: this.estimateMemoryUsage(),
      cacheHitRatio,
    };
  }

  // ============================================================================
  // LIFECYCLE METHODS
  // ============================================================================

  public initialize(theme?: ITheme): void {
    try {
      logger.info('ThemeClassManager', 'initialize', 'Initializing theme class manager');

      if (theme) {
        this.updateThemeClasses(theme);
      }

      this._isInitialized = true;
      logger.info(
        'ThemeClassManager',
        'initialize',
        'Theme class manager initialized successfully'
      );
    } catch (error) {
      logger.error('ThemeClassManager', 'initialize', 'Failed to initialize theme class manager', {
        error,
      });
    }
  }

  public destroy(): void {
    try {
      logger.info('ThemeClassManager', 'destroy', 'Destroying theme class manager');

      this.clearAllThemeClasses();
      this.clearCSSCache();
      this._isInitialized = false;

      logger.info('ThemeClassManager', 'destroy', 'Theme class manager destroyed successfully');
    } catch (error) {
      logger.error('ThemeClassManager', 'destroy', 'Failed to destroy theme class manager', {
        error,
      });
    }
  }

  // ============================================================================
  // PRIVATE HELPER METHODS
  // ============================================================================

  private applyThemeClassToElement(
    element: HTMLElement,
    themeClass: IThemeClass,
    options: IClassApplicationOptions
  ): boolean {
    try {
      // Apply styles directly to element
      this.applyStylesToElement(element, themeClass, options);
      return true;
    } catch (error) {
      logger.error(
        'ThemeClassManager',
        'applyThemeClassToElement',
        'Failed to apply theme class to element',
        { error }
      );
      return false;
    }
  }

  private removeThemeClassFromElement(element: HTMLElement, themeClass: IThemeClass): boolean {
    try {
      // Remove styles from element
      this.removeStylesFromElement(element, themeClass);
      return true;
    } catch (error) {
      logger.error(
        'ThemeClassManager',
        'removeThemeClassFromElement',
        'Failed to remove theme class from element',
        { error }
      );
      return false;
    }
  }

  private applyStylesToElement(
    element: HTMLElement,
    themeClass: IThemeClass,
    options: IClassApplicationOptions
  ): void {
    const style = element.style;

    // Apply basic styles
    if (themeClass.backgroundColor) style.backgroundColor = themeClass.backgroundColor;
    if (themeClass.color) style.color = themeClass.color;
    if (themeClass.padding) style.padding = `${themeClass.padding}px`;
    if (themeClass.margin) style.margin = `${themeClass.margin}px`;
    if (themeClass.borderRadius) style.borderRadius = `${themeClass.borderRadius}px`;
    if (themeClass.borderRadiusValue) style.borderRadius = `${themeClass.borderRadiusValue}px`;
    if (themeClass.fontSize) style.fontSize = `${themeClass.fontSize}px`;
    if (themeClass.fontWeight) style.fontWeight = themeClass.fontWeight.toString();
    if (themeClass.textAlign) style.textAlign = themeClass.textAlign;
    if (themeClass.display) style.display = themeClass.display;
    if (themeClass.flexDirection) style.flexDirection = themeClass.flexDirection;
    if (themeClass.alignItems) style.alignItems = themeClass.alignItems;
    if (themeClass.justifyContent) style.justifyContent = themeClass.justifyContent;
    if (themeClass.cursor) style.cursor = themeClass.cursor;
    if (themeClass.boxSizing) style.boxSizing = themeClass.boxSizing;
    if (themeClass.position) style.position = themeClass.position;
    if (themeClass.boxShadow) style.boxShadow = themeClass.boxShadow;
    if (themeClass.transition) style.transition = themeClass.transition;
    if (themeClass.cssAnimation) style.animation = themeClass.cssAnimation;

    // Apply width and height with units
    if (themeClass.width && typeof themeClass.width === 'object') {
      style.width = `${themeClass.width.value}${themeClass.width.unit}`;
    }
    if (themeClass.height && typeof themeClass.height === 'object') {
      style.height = `${themeClass.height.value}${themeClass.height.unit}`;
    }

    // Apply transitions if requested
    if (options.useTransitions && options.transitionDuration) {
      style.transition = `all ${options.transitionDuration}ms ease`;
    }
  }

  private removeStylesFromElement(element: HTMLElement, themeClass: IThemeClass): void {
    const style = element.style;

    // Remove applied styles
    if (themeClass.backgroundColor) style.backgroundColor = '';
    if (themeClass.color) style.color = '';
    if (themeClass.padding) style.padding = '';
    if (themeClass.margin) style.margin = '';
    if (themeClass.borderRadius || themeClass.borderRadiusValue) style.borderRadius = '';
    if (themeClass.fontSize) style.fontSize = '';
    if (themeClass.fontWeight) style.fontWeight = '';
    if (themeClass.textAlign) style.textAlign = '';
    if (themeClass.display) style.display = '';
    if (themeClass.flexDirection) style.flexDirection = '';
    if (themeClass.alignItems) style.alignItems = '';
    if (themeClass.justifyContent) style.justifyContent = '';
    if (themeClass.cursor) style.cursor = '';
    if (themeClass.boxSizing) style.boxSizing = '';
    if (themeClass.position) style.position = '';
    if (themeClass.boxShadow) style.boxShadow = '';
    if (themeClass.transition) style.transition = '';
    if (themeClass.cssAnimation) style.animation = '';
    if (themeClass.width) style.width = '';
    if (themeClass.height) style.height = '';
  }

  private buildCSSFromThemeClass(className: string, themeClass: IThemeClass): string {
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

  private trackAppliedClass(element: HTMLElement, className: string): void {
    if (!this.appliedClasses.has(element)) {
      this.appliedClasses.set(element, new Set());
    }
    this.appliedClasses.get(element)!.add(className);
  }

  private untrackAppliedClass(element: HTMLElement, className: string): void {
    const appliedClasses = this.appliedClasses.get(element);
    if (appliedClasses) {
      appliedClasses.delete(className);
      if (appliedClasses.size === 0) {
        this.appliedClasses.delete(element);
      }
    }
  }

  private estimateMemoryUsage(): number {
    // Rough estimation of memory usage
    let memoryUsage = 0;

    // CSS cache
    this.cssCache.forEach(css => {
      memoryUsage += css.length * 2; // Rough estimate for string memory
    });

    // Applied classes tracking
    memoryUsage += this.appliedClasses.size * 100; // Rough estimate per element

    // Active classes
    memoryUsage += this.activeClasses.size * 200; // Rough estimate per class

    return memoryUsage;
  }
}
