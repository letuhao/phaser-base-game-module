/**
 * ThemeClassManager Unit Tests
 * Comprehensive test suite for the ThemeClassManager class
 * Tests CSS class application, DOM manipulation, and performance features
 */

import { ThemeClassManager } from '../../classes/ThemeClassManager';
import { ITheme, IThemeClass } from '../../interfaces/ITheme';
import { IClassApplicationOptions } from '../../interfaces/IThemeClassManager';
import { BaseThemeType, ThemeVariant } from '../../enums/LayoutEnums';
import { logger } from '../../../core/Logger';

// Mock logger to avoid console output during tests
jest.mock('../../../core/Logger', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
    trace: jest.fn(),
  },
}));

describe('ThemeClassManager', () => {
  let themeClassManager: ThemeClassManager;
  let mockElement: HTMLElement;
  let mockTheme: ITheme;
  let mockThemeClass: IThemeClass;

  beforeEach(() => {
    // Reset the theme class manager for each test
    themeClassManager = new ThemeClassManager();

    // Create mock DOM element
    mockElement = document.createElement('div');
    document.body.appendChild(mockElement);

    // Create mock theme class
    mockThemeClass = {
      backgroundColor: '#ffffff',
      color: '#000000',
      padding: 16,
      margin: 8,
      borderRadius: 4,
      fontSize: 14,
      fontWeight: 400,
      textAlign: 'left' as any,
      display: 'block' as any,
      cursor: 'default' as any,
      boxSizing: 'border-box' as any,
    };

    // Create mock theme
    mockTheme = {
      id: 'test-theme',
      name: 'Test Theme',
      displayName: 'Test Theme',
      description: 'A test theme',
      type: BaseThemeType.LIGHT,
      variant: ThemeVariant.DEFAULT,
      isActive: false,
      supportsDarkMode: true,
      version: '1.0.0',
      author: 'Test Author',
      tags: ['test'],
      colors: {
        primary: { main: '#1976d2', light: '#42a5f5', dark: '#1565c0' },
        secondary: { main: '#dc004e', light: '#ff5983', dark: '#9a0036' },
        background: { default: '#ffffff', paper: '#f5f5f5' },
        text: { primary: '#000000', secondary: '#666666' },
      },
      typography: {
        fontFamily: 'Arial, sans-serif',
        fontSize: { xs: 12, sm: 14, base: 16, lg: 18, xl: 20 },
        fontWeight: { light: 300, normal: 400, medium: 500, bold: 700 },
        lineHeight: { tight: 1.2, normal: 1.5, relaxed: 1.8 },
      },
      spacing: {
        scale: { xs: 4, sm: 8, base: 16, lg: 24, xl: 32 },
      },
      borderRadius: {
        none: 0,
        sm: 2,
        base: 4,
        lg: 8,
        xl: 16,
        full: 9999,
      },
      shadows: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        base: '0 1px 3px rgba(0,0,0,0.1)',
        md: '0 4px 6px rgba(0,0,0,0.1)',
        lg: '0 10px 15px rgba(0,0,0,0.1)',
        xl: '0 20px 25px rgba(0,0,0,0.1)',
        '2xl': '0 25px 50px rgba(0,0,0,0.25)',
      },
      animation: {
        duration: { fast: 150, normal: 300, slow: 500 },
        easing: { ease: 'ease', easeIn: 'ease-in', easeOut: 'ease-out', easeInOut: 'ease-in-out' },
      },
      breakpoints: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        '2xl': 1400,
      },
      themeClasses: {
        '.test-class': mockThemeClass,
        '.button': {
          backgroundColor: '#1976d2',
          color: '#ffffff',
          padding: 12,
          borderRadius: 4,
          cursor: 'pointer' as any,
        },
      },
    };
  });

  afterEach(() => {
    // Clean up DOM
    if (mockElement && mockElement.parentNode) {
      mockElement.parentNode.removeChild(mockElement);
    }
    jest.clearAllMocks();
  });

  // ============================================================================
  // INITIALIZATION TESTS
  // ============================================================================

  describe('Initialization', () => {
    it('should initialize with default values', () => {
      expect(themeClassManager.activeClasses.size).toBe(0);
      expect(themeClassManager.appliedClasses.size).toBe(0);
      expect(themeClassManager.cssCache.size).toBe(0);
    });

    it('should initialize with theme', () => {
      themeClassManager.initialize(mockTheme);
      expect(themeClassManager.activeClasses.size).toBe(2);
      expect(themeClassManager.hasClassDefinition('.test-class')).toBe(true);
      expect(themeClassManager.hasClassDefinition('.button')).toBe(true);
    });

    it('should handle initialization without theme', () => {
      expect(() => themeClassManager.initialize()).not.toThrow();
    });
  });

  // ============================================================================
  // CLASS APPLICATION TESTS
  // ============================================================================

  describe('Class Application', () => {
    beforeEach(() => {
      themeClassManager.initialize(mockTheme);
    });

    it('should apply a theme class to an element', () => {
      const success = themeClassManager.applyClass(mockElement, '.test-class');

      expect(success).toBe(true);
      expect(themeClassManager.hasClass(mockElement, '.test-class')).toBe(true);
      expect(mockElement.style.backgroundColor).toBe('rgb(255, 255, 255)');
      expect(mockElement.style.color).toBe('rgb(0, 0, 0)');
      expect(mockElement.style.padding).toBe('16px');
    });

    it('should return false for non-existent theme class', () => {
      const success = themeClassManager.applyClass(mockElement, '.non-existent');
      expect(success).toBe(false);
    });

    it('should return false for invalid element', () => {
      const success = themeClassManager.applyClass(null as any, '.test-class');
      expect(success).toBe(false);
    });

    it('should apply multiple theme classes', () => {
      const results = themeClassManager.applyClasses(mockElement, ['.test-class', '.button']);

      expect(results).toEqual([true, true]);
      expect(themeClassManager.hasClass(mockElement, '.test-class')).toBe(true);
      expect(themeClassManager.hasClass(mockElement, '.button')).toBe(true);
    });

    it('should handle force application', () => {
      // Apply class first time
      themeClassManager.applyClass(mockElement, '.test-class');

      // Apply again with force
      const success = themeClassManager.applyClass(mockElement, '.test-class', { force: true });
      expect(success).toBe(true);
    });

    it('should apply classes with transitions', () => {
      const options: IClassApplicationOptions = {
        useTransitions: true,
        transitionDuration: 300,
      };

      const success = themeClassManager.applyClass(mockElement, '.test-class', options);
      expect(success).toBe(true);
      expect(mockElement.style.transition).toContain('300ms');
    });
  });

  // ============================================================================
  // CLASS REMOVAL TESTS
  // ============================================================================

  describe('Class Removal', () => {
    beforeEach(() => {
      themeClassManager.initialize(mockTheme);
    });

    it('should remove a theme class from an element', () => {
      // Apply class first
      themeClassManager.applyClass(mockElement, '.test-class');
      expect(themeClassManager.hasClass(mockElement, '.test-class')).toBe(true);

      // Remove class
      const success = themeClassManager.removeClass(mockElement, '.test-class');
      expect(success).toBe(true);
      expect(themeClassManager.hasClass(mockElement, '.test-class')).toBe(false);
    });

    it('should remove multiple theme classes', () => {
      // Apply classes first
      themeClassManager.applyClasses(mockElement, ['.test-class', '.button']);

      // Remove classes
      const results = themeClassManager.removeClasses(mockElement, ['.test-class', '.button']);
      expect(results).toEqual([true, true]);
      expect(themeClassManager.hasClass(mockElement, '.test-class')).toBe(false);
      expect(themeClassManager.hasClass(mockElement, '.button')).toBe(false);
    });

    it('should clear all theme classes from an element', () => {
      // Apply classes first
      themeClassManager.applyClasses(mockElement, ['.test-class', '.button']);

      // Clear all classes
      const success = themeClassManager.clearClasses(mockElement);
      expect(success).toBe(true);
      expect(themeClassManager.getAppliedClasses(mockElement)).toHaveLength(0);
    });

    it('should return false when removing non-existent class', () => {
      const success = themeClassManager.removeClass(mockElement, '.non-existent');
      expect(success).toBe(false);
    });
  });

  // ============================================================================
  // CLASS REPLACEMENT TESTS
  // ============================================================================

  describe('Class Replacement', () => {
    beforeEach(() => {
      themeClassManager.initialize(mockTheme);
    });

    it('should replace theme classes', () => {
      // Apply initial classes
      themeClassManager.applyClasses(mockElement, ['.test-class']);

      // Replace with new classes
      const success = themeClassManager.replaceClasses(mockElement, ['.test-class'], ['.button']);

      expect(success).toBe(true);
      expect(themeClassManager.hasClass(mockElement, '.test-class')).toBe(false);
      expect(themeClassManager.hasClass(mockElement, '.button')).toBe(true);
    });

    it('should handle partial replacement failure', () => {
      // Apply initial classes
      themeClassManager.applyClasses(mockElement, ['.test-class']);

      // Try to replace with non-existent class
      const success = themeClassManager.replaceClasses(
        mockElement,
        ['.test-class'],
        ['.non-existent']
      );

      expect(success).toBe(false);
    });
  });

  // ============================================================================
  // BATCH OPERATIONS TESTS
  // ============================================================================

  describe('Batch Operations', () => {
    let mockElements: HTMLElement[];

    beforeEach(() => {
      themeClassManager.initialize(mockTheme);
      mockElements = [
        document.createElement('div'),
        document.createElement('span'),
        document.createElement('button'),
      ];
      mockElements.forEach(el => document.body.appendChild(el));
    });

    afterEach(() => {
      mockElements.forEach(el => {
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }
      });
    });

    it('should apply classes to multiple elements', () => {
      const results = themeClassManager.applyClassesToElements(mockElements, ['.test-class']);

      expect(results.size).toBe(3);
      mockElements.forEach(element => {
        expect(results.get(element)).toEqual([true]);
        expect(themeClassManager.hasClass(element, '.test-class')).toBe(true);
      });
    });

    it('should remove classes from multiple elements', () => {
      // Apply classes first
      themeClassManager.applyClassesToElements(mockElements, ['.test-class']);

      // Remove classes
      const results = themeClassManager.removeClassesFromElements(mockElements, ['.test-class']);

      expect(results.size).toBe(3);
      mockElements.forEach(element => {
        expect(results.get(element)).toEqual([true]);
        expect(themeClassManager.hasClass(element, '.test-class')).toBe(false);
      });
    });

    it('should clear classes from multiple elements', () => {
      // Apply classes first
      themeClassManager.applyClassesToElements(mockElements, ['.test-class', '.button']);

      // Clear classes
      const results = themeClassManager.clearClassesFromElements(mockElements);

      expect(results.size).toBe(3);
      mockElements.forEach(element => {
        expect(results.get(element)).toBe(true);
        expect(themeClassManager.getAppliedClasses(element)).toHaveLength(0);
      });
    });
  });

  // ============================================================================
  // CSS GENERATION TESTS
  // ============================================================================

  describe('CSS Generation', () => {
    it('should generate CSS for a theme class', () => {
      const css = themeClassManager.generateCSS('.test-class', mockThemeClass);

      expect(css).toContain('.test-class {');
      expect(css).toContain('background-color: #ffffff;');
      expect(css).toContain('color: #000000;');
      expect(css).toContain('padding: 16px;');
    });

    it('should generate CSS for multiple theme classes', () => {
      const classes = new Map<string, IThemeClass>();
      classes.set('.test-class', mockThemeClass);
      classes.set('.button', {
        backgroundColor: '#1976d2',
        color: '#ffffff',
        padding: 12,
      });

      const css = themeClassManager.generateMultipleCSS(classes);

      expect(css).toContain('.test-class {');
      expect(css).toContain('.button {');
    });

    it('should cache generated CSS', () => {
      // Generate CSS first time
      const css1 = themeClassManager.generateCSS('.test-class', mockThemeClass);

      // Generate CSS second time (should use cache)
      const css2 = themeClassManager.generateCSS('.test-class', mockThemeClass);

      expect(css1).toBe(css2);
      expect(themeClassManager.cssCache.size).toBe(1);
    });

    it('should inject CSS into document', () => {
      const css = '.test-class { color: red; }';
      const success = themeClassManager.injectCSS(css, 'test-styles');

      expect(success).toBe(true);
      const styleElement = document.getElementById('test-styles');
      expect(styleElement).toBeTruthy();
      expect(styleElement?.textContent).toContain(css);
    });

    it('should remove CSS from document', () => {
      // Inject CSS first
      themeClassManager.injectCSS('.test-class { color: red; }', 'test-styles');

      // Remove CSS
      const success = themeClassManager.removeCSS('test-styles');
      expect(success).toBe(true);

      const styleElement = document.getElementById('test-styles');
      expect(styleElement).toBeFalsy();
    });
  });

  // ============================================================================
  // THEME INTEGRATION TESTS
  // ============================================================================

  describe('Theme Integration', () => {
    it('should update theme classes from new theme', () => {
      themeClassManager.updateThemeClasses(mockTheme);

      expect(themeClassManager.activeClasses.size).toBe(2);
      expect(themeClassManager.hasClassDefinition('.test-class')).toBe(true);
      expect(themeClassManager.hasClassDefinition('.button')).toBe(true);
    });

    it('should clear all theme classes', () => {
      // Add some classes first
      themeClassManager.updateThemeClasses(mockTheme);
      expect(themeClassManager.activeClasses.size).toBe(2);

      // Clear all classes
      themeClassManager.clearAllThemeClasses();
      expect(themeClassManager.activeClasses.size).toBe(0);
      expect(themeClassManager.appliedClasses.size).toBe(0);
    });

    it('should refresh all applied classes', () => {
      // Apply a class
      themeClassManager.initialize(mockTheme);
      themeClassManager.applyClass(mockElement, '.test-class');

      // Refresh all classes
      expect(() => themeClassManager.refreshAllClasses()).not.toThrow();
    });
  });

  // ============================================================================
  // CONFLICT RESOLUTION TESTS
  // ============================================================================

  describe('Conflict Resolution', () => {
    it('should resolve class conflicts by merging', () => {
      const baseClass: IThemeClass = {
        backgroundColor: '#ffffff',
        color: '#000000',
        padding: 16,
      };

      const overrideClass: IThemeClass = {
        backgroundColor: '#ff0000',
        margin: 8,
      };

      const merged = themeClassManager.resolveClassConflict(
        '.test-class',
        baseClass,
        overrideClass
      );

      expect(merged.backgroundColor).toBe('#ff0000'); // Override takes precedence
      expect(merged.color).toBe('#000000'); // Base value preserved
      expect(merged.padding).toBe(16); // Base value preserved
      expect(merged.margin).toBe(8); // New value added
    });

    it('should merge theme classes correctly', () => {
      const baseClass: IThemeClass = {
        backgroundColor: '#ffffff',
        color: '#000000',
      };

      const overrideClass: IThemeClass = {
        backgroundColor: '#ff0000',
        padding: 16,
      };

      const merged = themeClassManager.mergeThemeClasses(baseClass, overrideClass);

      expect(merged.backgroundColor).toBe('#ff0000');
      expect(merged.color).toBe('#000000');
      expect(merged.padding).toBe(16);
    });
  });

  // ============================================================================
  // PERFORMANCE TESTS
  // ============================================================================

  describe('Performance', () => {
    it('should optimize CSS', () => {
      const unoptimizedCSS = '.test-class {   color: red;   padding: 16px;   }';
      const optimizedCSS = themeClassManager.optimizeCSS(unoptimizedCSS);

      expect(optimizedCSS).not.toContain('  '); // No double spaces
      expect(optimizedCSS).toContain('.test-class { color: red; padding: 16px}');
    });

    it('should clear CSS cache', () => {
      // Generate some CSS to populate cache
      themeClassManager.generateCSS('.test-class', mockThemeClass);
      expect(themeClassManager.cssCache.size).toBe(1);

      // Clear cache
      themeClassManager.clearCSSCache();
      expect(themeClassManager.cssCache.size).toBe(0);
    });

    it('should provide cache statistics', () => {
      // Generate some CSS to populate cache
      themeClassManager.generateCSS('.test-class', mockThemeClass);

      const stats = themeClassManager.getCacheStatistics();

      expect(stats.cssCacheSize).toBe(1);
      expect(stats.appliedClassesCount).toBe(0);
      expect(stats.activeClassesCount).toBe(0);
      expect(stats.memoryUsage).toBeGreaterThan(0);
      expect(stats.cacheHitRatio).toBeGreaterThanOrEqual(0);
    });
  });

  // ============================================================================
  // LIFECYCLE TESTS
  // ============================================================================

  describe('Lifecycle', () => {
    it('should destroy and clean up resources', () => {
      // Initialize with theme
      themeClassManager.initialize(mockTheme);
      expect(themeClassManager.activeClasses.size).toBe(2);

      // Destroy
      themeClassManager.destroy();
      expect(themeClassManager.activeClasses.size).toBe(0);
      expect(themeClassManager.appliedClasses.size).toBe(0);
      expect(themeClassManager.cssCache.size).toBe(0);
    });
  });

  // ============================================================================
  // EDGE CASES AND ERROR HANDLING TESTS
  // ============================================================================

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty theme classes', () => {
      const emptyTheme = { ...mockTheme, themeClasses: {} };
      themeClassManager.updateThemeClasses(emptyTheme);
      expect(themeClassManager.activeClasses.size).toBe(0);
    });

    it('should handle undefined theme classes', () => {
      const themeWithoutClasses = { ...mockTheme, themeClasses: undefined };
      themeClassManager.updateThemeClasses(themeWithoutClasses);
      expect(themeClassManager.activeClasses.size).toBe(0);
    });

    it('should handle invalid CSS injection', () => {
      const success = themeClassManager.injectCSS('', '');
      expect(success).toBe(false);
    });

    it('should handle non-existent CSS removal', () => {
      const success = themeClassManager.removeCSS('non-existent');
      expect(success).toBe(false);
    });
  });
});
