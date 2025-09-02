/**
 * ThemeManager Unit Tests
 * Comprehensive test suite for the ThemeManager class
 * Tests all methods, edge cases, and error scenarios
 */

import { ThemeManager } from '../../classes/ThemeManager';
import { ITheme, IThemeClass } from '../../interfaces/ITheme';
import { IThemeManager, IThemeListener, IThemeStatistics } from '../../interfaces/IThemeManager';
import { BaseThemeType, ExtendedThemeType, ThemeVariant, BreakpointName } from '../../enums/LayoutEnums';
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

describe('ThemeManager', () => {
  let themeManager: ThemeManager;
  let mockTheme: ITheme;
  let mockTheme2: ITheme;
  let mockThemeClass: IThemeClass;
  let mockListener: IThemeListener;

  beforeEach(() => {
    // Reset the theme manager for each test
    themeManager = new ThemeManager();

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

    // Create mock themes
    mockTheme = {
      id: 'test-theme-1',
      name: 'Test Theme 1',
      displayName: 'Test Theme 1',
      description: 'A test theme',
      type: BaseThemeType.LIGHT,
      variant: ThemeVariant.DEFAULT,
      isActive: false,
      supportsDarkMode: true,
      version: '1.0.0',
      author: 'Test Author',
      tags: ['test', 'light'],
      colors: {
        primary: {
          main: '#1976d2',
          light: '#42a5f5',
          dark: '#1565c0',
        },
        secondary: {
          main: '#dc004e',
          light: '#ff5983',
          dark: '#9a0036',
        },
        background: {
          default: '#ffffff',
          paper: '#f5f5f5',
        },
        text: {
          primary: '#000000',
          secondary: '#666666',
        },
      },
      typography: {
        fontFamily: 'Arial, sans-serif',
        fontSize: {
          xs: 12,
          sm: 14,
          base: 16,
          lg: 18,
          xl: 20,
        },
        fontWeight: {
          light: 300,
          normal: 400,
          medium: 500,
          bold: 700,
        },
        lineHeight: {
          tight: 1.2,
          normal: 1.5,
          relaxed: 1.8,
        },
      },
      spacing: {
        scale: {
          xs: 4,
          sm: 8,
          base: 16,
          lg: 24,
          xl: 32,
        },
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
        duration: {
          fast: 150,
          normal: 300,
          slow: 500,
        },
        easing: {
          ease: 'ease',
          easeIn: 'ease-in',
          easeOut: 'ease-out',
          easeInOut: 'ease-in-out',
        },
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

    mockTheme2 = {
      ...mockTheme,
      id: 'test-theme-2',
      name: 'Test Theme 2',
      displayName: 'Test Theme 2',
      type: BaseThemeType.DARK,
      colors: {
        ...mockTheme.colors,
        background: {
          default: '#121212',
          paper: '#1e1e1e',
        },
        text: {
          primary: '#ffffff',
          secondary: '#cccccc',
        },
      },
    };

    // Create mock listener
    mockListener = {
      onThemeActivated: jest.fn(),
      onThemeDeactivated: jest.fn(),
      onThemeRegistered: jest.fn(),
      onThemeUnregistered: jest.fn(),
      onThemeModeChanged: jest.fn(),
      onThemeClassApplied: jest.fn(),
      onThemeClassRemoved: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ============================================================================
  // INITIALIZATION TESTS
  // ============================================================================

  describe('Initialization', () => {
    it('should initialize with default values', () => {
      expect(themeManager.activeTheme).toBeNull();
      expect(themeManager.themes.size).toBe(0);
      expect(themeManager.currentThemeType).toBe(BaseThemeType.CUSTOM);
      expect(themeManager.isInitialized).toBe(false);
      expect(themeManager.listeners.size).toBe(0);
      expect(themeManager.themeCache.size).toBe(0);
    });

    it('should initialize successfully', async () => {
      await themeManager.initialize();
      expect(themeManager.isInitialized).toBe(true);
    });

    it('should initialize with default theme if provided', async () => {
      themeManager.registerTheme(mockTheme);
      await themeManager.initialize('test-theme-1');
      expect(themeManager.activeTheme).toBe(mockTheme);
    });

    it('should handle initialization with non-existent default theme', async () => {
      await expect(themeManager.initialize('non-existent')).resolves.not.toThrow();
      expect(themeManager.isInitialized).toBe(true);
    });
  });

  // ============================================================================
  // THEME REGISTRY TESTS
  // ============================================================================

  describe('Theme Registry', () => {
    it('should register a theme successfully', () => {
      themeManager.registerTheme(mockTheme);
      expect(themeManager.themes.has('test-theme-1')).toBe(true);
      expect(themeManager.getTheme('test-theme-1')).toBe(mockTheme);
    });

    it('should throw error when registering theme without id', () => {
      const invalidTheme = { ...mockTheme, id: '' };
      expect(() => themeManager.registerTheme(invalidTheme)).toThrow('Theme must have id and name');
    });

    it('should throw error when registering theme without name', () => {
      const invalidTheme = { ...mockTheme, name: '' };
      expect(() => themeManager.registerTheme(invalidTheme)).toThrow('Theme must have id and name');
    });

    it('should throw error when registering theme without colors', () => {
      const invalidTheme = { ...mockTheme, colors: undefined as any };
      expect(() => themeManager.registerTheme(invalidTheme)).toThrow(
        'Theme must have colors defined'
      );
    });

    it('should throw error when registering theme without typography', () => {
      const invalidTheme = { ...mockTheme, typography: undefined as any };
      expect(() => themeManager.registerTheme(invalidTheme)).toThrow(
        'Theme must have typography defined'
      );
    });

    it('should unregister a theme successfully', () => {
      themeManager.registerTheme(mockTheme);
      const result = themeManager.unregisterTheme('test-theme-1');
      expect(result).toBe(true);
      expect(themeManager.themes.has('test-theme-1')).toBe(false);
    });

    it('should return false when unregistering non-existent theme', () => {
      const result = themeManager.unregisterTheme('non-existent');
      expect(result).toBe(false);
    });

    it('should return false when unregistering active theme', async () => {
      themeManager.registerTheme(mockTheme);
      await themeManager.activateTheme('test-theme-1');
      const result = themeManager.unregisterTheme('test-theme-1');
      expect(result).toBe(false);
    });

    it('should get theme by name', () => {
      themeManager.registerTheme(mockTheme);
      const foundTheme = themeManager.getThemeByName('Test Theme 1');
      expect(foundTheme).toBe(mockTheme);
    });

    it('should return undefined when getting non-existent theme by name', () => {
      const foundTheme = themeManager.getThemeByName('Non-existent');
      expect(foundTheme).toBeUndefined();
    });

    it('should get all themes', () => {
      themeManager.registerTheme(mockTheme);
      themeManager.registerTheme(mockTheme2);
      const allThemes = themeManager.getThemes();
      expect(allThemes).toHaveLength(2);
      expect(allThemes).toContain(mockTheme);
      expect(allThemes).toContain(mockTheme2);
    });

    it('should get themes with filter', () => {
      themeManager.registerTheme(mockTheme);
      themeManager.registerTheme(mockTheme2);
      const lightThemes = themeManager.getThemes(theme => theme.type === BaseThemeType.LIGHT);
      expect(lightThemes).toHaveLength(1);
      expect(lightThemes[0]).toBe(mockTheme);
    });

    it('should get themes by type', () => {
      themeManager.registerTheme(mockTheme);
      themeManager.registerTheme(mockTheme2);
      const lightThemes = themeManager.getThemesByType(BaseThemeType.LIGHT);
      const darkThemes = themeManager.getThemesByType(BaseThemeType.DARK);
      expect(lightThemes).toHaveLength(1);
      expect(darkThemes).toHaveLength(1);
      expect(lightThemes[0]).toBe(mockTheme);
      expect(darkThemes[0]).toBe(mockTheme2);
    });

    it('should get themes by variant', () => {
      themeManager.registerTheme(mockTheme);
      const defaultThemes = themeManager.getThemesByVariant(ThemeVariant.DEFAULT);
      expect(defaultThemes).toHaveLength(1);
      expect(defaultThemes[0]).toBe(mockTheme);
    });

    it('should check if theme exists', () => {
      themeManager.registerTheme(mockTheme);
      expect(themeManager.hasTheme('test-theme-1')).toBe(true);
      expect(themeManager.hasTheme('non-existent')).toBe(false);
    });
  });

  // ============================================================================
  // THEME ACTIVATION TESTS
  // ============================================================================

  describe('Theme Activation', () => {
    beforeEach(() => {
      themeManager.registerTheme(mockTheme);
      themeManager.registerTheme(mockTheme2);
    });

    it('should activate a theme successfully', async () => {
      await themeManager.activateTheme('test-theme-1');
      expect(themeManager.activeTheme).toBe(mockTheme);
      expect(themeManager.currentThemeType).toBe(BaseThemeType.LIGHT);
    });

    it('should throw error when activating non-existent theme', async () => {
      await expect(themeManager.activateTheme('non-existent')).rejects.toThrow(
        'Theme not found: non-existent'
      );
    });

    it('should deactivate current theme when activating new one', async () => {
      await themeManager.activateTheme('test-theme-1');
      await themeManager.activateTheme('test-theme-2');
      expect(themeManager.activeTheme).toBe(mockTheme2);
    });

    it('should activate theme by name', async () => {
      await themeManager.activateThemeByName('Test Theme 1');
      expect(themeManager.activeTheme).toBe(mockTheme);
    });

    it('should throw error when activating non-existent theme by name', async () => {
      await expect(themeManager.activateThemeByName('Non-existent')).rejects.toThrow(
        'Theme not found with name: Non-existent'
      );
    });

    it('should get active theme', async () => {
      await themeManager.activateTheme('test-theme-1');
      expect(themeManager.getActiveTheme()).toBe(mockTheme);
    });

    it('should check if theme is active', async () => {
      await themeManager.activateTheme('test-theme-1');
      expect(themeManager.isThemeActive('test-theme-1')).toBe(true);
      expect(themeManager.isThemeActive('test-theme-2')).toBe(false);
    });

    it('should toggle theme mode', async () => {
      await themeManager.activateTheme('test-theme-1'); // Light theme
      await themeManager.toggleThemeMode();
      expect(themeManager.activeTheme).toBe(mockTheme2); // Should switch to dark theme
    });

    it('should switch to light theme', async () => {
      await themeManager.activateTheme('test-theme-2'); // Dark theme
      await themeManager.switchToLightTheme();
      expect(themeManager.activeTheme).toBe(mockTheme); // Should switch to light theme
    });

    it('should switch to dark theme', async () => {
      await themeManager.activateTheme('test-theme-1'); // Light theme
      await themeManager.switchToDarkTheme();
      expect(themeManager.activeTheme).toBe(mockTheme2); // Should switch to dark theme
    });
  });

  // ============================================================================
  // THEME ACCESSOR TESTS
  // ============================================================================

  describe('Theme Accessors', () => {
    beforeEach(async () => {
      themeManager.registerTheme(mockTheme);
      await themeManager.activateTheme('test-theme-1');
    });

    it('should get color by path', () => {
      expect(themeManager.getColor('primary.main')).toBe('#1976d2');
      expect(themeManager.getColor('secondary.light')).toBe('#ff5983');
      expect(themeManager.getColor('non.existent')).toBe('#000000'); // Default fallback
    });

    it('should get spacing value', () => {
      expect(themeManager.getSpacing('base')).toBe(16);
      expect(themeManager.getSpacing('lg')).toBe(24);
      expect(themeManager.getSpacing('non-existent')).toBe(0); // Default fallback
    });

    it('should get font size', () => {
      expect(themeManager.getFontSize('base')).toBe(16);
      expect(themeManager.getFontSize('lg')).toBe(18);
      expect(themeManager.getFontSize('non-existent')).toBe(16); // Default fallback
    });

    it('should get border radius', () => {
      expect(themeManager.getBorderRadius('base')).toBe(4);
      expect(themeManager.getBorderRadius('lg')).toBe(8);
      expect(themeManager.getBorderRadius('non-existent')).toBe(0); // Default fallback
    });

    it('should get shadow', () => {
      expect(themeManager.getShadow('base')).toBe('0 1px 3px rgba(0,0,0,0.1)');
      expect(themeManager.getShadow('lg')).toBe('0 10px 15px rgba(0,0,0,0.1)');
      expect(themeManager.getShadow('non-existent')).toBe('none'); // Default fallback
    });

    it('should get animation duration', () => {
      expect(themeManager.getAnimationDuration('normal')).toBe(300);
      expect(themeManager.getAnimationDuration('fast')).toBe(150);
      expect(themeManager.getAnimationDuration('non-existent')).toBe(300); // Default fallback
    });

    it('should get theme class', () => {
      const themeClass = themeManager.getThemeClass('.test-class');
      expect(themeClass).toBe(mockThemeClass);
    });

    it('should return undefined for non-existent theme class', () => {
      const themeClass = themeManager.getThemeClass('.non-existent');
      expect(themeClass).toBeUndefined();
    });

    it('should check breakpoint support', () => {
      expect(themeManager.supportsBreakpoint(BreakpointName.MD)).toBe(true);
      expect(themeManager.supportsBreakpoint(BreakpointName.LG)).toBe(true);
    });
  });

  // ============================================================================
  // THEME CLASS MANAGEMENT TESTS
  // ============================================================================

  describe('Theme Class Management', () => {
    let mockElement: HTMLElement;

    beforeEach(async () => {
      themeManager.registerTheme(mockTheme);
      await themeManager.activateTheme('test-theme-1');
      mockElement = document.createElement('div');
    });

    it('should apply theme class to element', () => {
      themeManager.applyThemeClass(mockElement, '.test-class');
      expect(mockElement.style.backgroundColor).toBe('rgb(255, 255, 255)');
      expect(mockElement.style.color).toBe('rgb(0, 0, 0)');
      expect(mockElement.style.padding).toBe('16px');
    });

    it('should handle invalid element in applyThemeClass', () => {
      expect(() => themeManager.applyThemeClass(null as any, '.test-class')).not.toThrow();
      expect(() => themeManager.applyThemeClass({} as any, '.test-class')).not.toThrow();
    });

    it('should handle non-existent theme class in applyThemeClass', () => {
      expect(() => themeManager.applyThemeClass(mockElement, '.non-existent')).not.toThrow();
    });

    it('should remove theme class from element', () => {
      mockElement.style.backgroundColor = 'red';
      themeManager.removeThemeClass(mockElement, '.test-class');
      expect(mockElement.style.cssText).toBe('');
    });

    it('should handle invalid element in removeThemeClass', () => {
      expect(() => themeManager.removeThemeClass(null as any, '.test-class')).not.toThrow();
      expect(() => themeManager.removeThemeClass({} as any, '.test-class')).not.toThrow();
    });
  });

  // ============================================================================
  // EVENT MANAGEMENT TESTS
  // ============================================================================

  describe('Event Management', () => {
    it('should add listener', () => {
      themeManager.addListener(mockListener);
      expect(themeManager.listeners.has(mockListener)).toBe(true);
    });

    it('should remove listener', () => {
      themeManager.addListener(mockListener);
      const result = themeManager.removeListener(mockListener);
      expect(result).toBe(true);
      expect(themeManager.listeners.has(mockListener)).toBe(false);
    });

    it('should return false when removing non-existent listener', () => {
      const result = themeManager.removeListener(mockListener);
      expect(result).toBe(false);
    });

    it('should clear all listeners', () => {
      themeManager.addListener(mockListener);
      themeManager.clearListeners();
      expect(themeManager.listeners.size).toBe(0);
    });

    it('should notify listeners on theme activation', async () => {
      themeManager.registerTheme(mockTheme);
      themeManager.addListener(mockListener);
      await themeManager.activateTheme('test-theme-1');
      expect(mockListener.onThemeActivated).toHaveBeenCalledWith(mockTheme, mockTheme);
    });

    it('should notify listeners on theme deactivation', async () => {
      themeManager.registerTheme(mockTheme);
      themeManager.registerTheme(mockTheme2);
      themeManager.addListener(mockListener);
      await themeManager.activateTheme('test-theme-1');
      await themeManager.activateTheme('test-theme-2');
      expect(mockListener.onThemeDeactivated).toHaveBeenCalledWith(mockTheme, null);
    });
  });

  // ============================================================================
  // STATISTICS AND IMPORT/EXPORT TESTS
  // ============================================================================

  describe('Statistics and Import/Export', () => {
    beforeEach(() => {
      themeManager.registerTheme(mockTheme);
      themeManager.registerTheme(mockTheme2);
    });

    it('should get statistics', () => {
      const stats = themeManager.getStatistics();
      expect(stats.totalThemes).toBe(2);
      expect(stats.activeThemes).toBe(0);
      expect(stats.inactiveThemes).toBe(2);
      expect(stats.themeTypes.light).toBe(1);
      expect(stats.themeTypes.dark).toBe(1);
    });

    it('should export theme configuration', () => {
      const exported = themeManager.exportTheme('test-theme-1');
      const parsed = JSON.parse(exported);
      expect(parsed.theme.id).toBe('test-theme-1');
      expect(parsed.metadata.version).toBe('1.0.0');
    });

    it('should throw error when exporting non-existent theme', () => {
      expect(() => themeManager.exportTheme('non-existent')).toThrow(
        'Theme not found: non-existent'
      );
    });

    it('should import theme configuration', () => {
      const exported = themeManager.exportTheme('test-theme-1');
      const importedTheme = themeManager.importTheme(exported);
      expect(importedTheme.id).toBe('test-theme-1');
    });

    it('should throw error when importing invalid configuration', () => {
      expect(() => themeManager.importTheme('invalid json')).toThrow('Failed to import theme');
    });
  });

  // ============================================================================
  // LIFECYCLE TESTS
  // ============================================================================

  describe('Lifecycle', () => {
    beforeEach(async () => {
      themeManager.registerTheme(mockTheme);
      themeManager.addListener(mockListener);
      await themeManager.activateTheme('test-theme-1');
    });

    it('should reset to initial state', () => {
      themeManager.reset();
      expect(themeManager.activeTheme).toBeNull();
      expect(themeManager.themes.size).toBe(0);
      expect(themeManager.currentThemeType).toBe(BaseThemeType.CUSTOM);
      expect(themeManager.isInitialized).toBe(false);
      expect(themeManager.listeners.size).toBe(0);
      expect(themeManager.themeCache.size).toBe(0);
    });

    it('should destroy and clean up resources', () => {
      themeManager.destroy();
      expect(themeManager.activeTheme).toBeNull();
      expect(themeManager.themes.size).toBe(0);
      expect(themeManager.listeners.size).toBe(0);
    });
  });

  // ============================================================================
  // EDGE CASES AND ERROR HANDLING TESTS
  // ============================================================================

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty theme classes', () => {
      const themeWithoutClasses = { ...mockTheme, themeClasses: undefined };
      themeManager.registerTheme(themeWithoutClasses);
      expect(() => themeManager.getThemeClass('.test-class')).not.toThrow();
    });

    it('should handle theme without breakpoints', () => {
      const themeWithoutBreakpoints = { ...mockTheme, breakpoints: undefined };
      themeManager.registerTheme(themeWithoutBreakpoints);
      expect(themeManager.supportsBreakpoint(BreakpointName.MD)).toBe(false);
    });

    it('should handle theme without animation', () => {
      const themeWithoutAnimation = { ...mockTheme, animation: undefined };
      themeManager.registerTheme(themeWithoutAnimation);
      expect(themeManager.getAnimationDuration('normal')).toBe(300); // Default fallback
    });

    it('should handle theme without shadows', () => {
      const themeWithoutShadows = { ...mockTheme, shadows: undefined };
      themeManager.registerTheme(themeWithoutShadows);
      expect(themeManager.getShadow('base')).toBe('none'); // Default fallback
    });

    it('should handle theme without borderRadius', () => {
      const themeWithoutBorderRadius = { ...mockTheme, borderRadius: undefined };
      themeManager.registerTheme(themeWithoutBorderRadius);
      expect(themeManager.getBorderRadius('base')).toBe(0); // Default fallback
    });

    it('should handle theme without spacing', () => {
      const themeWithoutSpacing = { ...mockTheme, spacing: undefined };
      themeManager.registerTheme(themeWithoutSpacing);
      expect(themeManager.getSpacing('base')).toBe(0); // Default fallback
    });

    it('should handle theme without typography in accessors', () => {
      // Create a theme that bypasses validation by directly setting it in the map
      const themeWithoutTypography = { ...mockTheme, typography: undefined };
      themeManager.themes.set('theme-without-typography', themeWithoutTypography);
      expect(themeManager.getFontSize('base')).toBe(16); // Default fallback
    });

    it('should handle theme without colors in accessors', () => {
      // Create a theme that bypasses validation by directly setting it in the map
      const themeWithoutColors = { ...mockTheme, colors: undefined };
      themeManager.themes.set('theme-without-colors', themeWithoutColors);
      expect(themeManager.getColor('primary.main')).toBe('#000000'); // Default fallback
    });
  });

  // ============================================================================
  // PERFORMANCE TESTS
  // ============================================================================

  describe('Performance', () => {
    it('should cache theme classes for performance', () => {
      themeManager.registerTheme(mockTheme);
      expect(themeManager.themeCache.size).toBeGreaterThan(0);
    });

    it('should clear theme cache when unregistering theme', () => {
      themeManager.registerTheme(mockTheme);
      const initialCacheSize = themeManager.themeCache.size;
      themeManager.unregisterTheme('test-theme-1');
      expect(themeManager.themeCache.size).toBeLessThan(initialCacheSize);
    });

    it('should handle multiple theme registrations efficiently', () => {
      const startTime = performance.now();
      for (let i = 0; i < 100; i++) {
        const theme = { ...mockTheme, id: `theme-${i}`, name: `Theme ${i}` };
        themeManager.registerTheme(theme);
      }
      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(1000); // Should complete in less than 1 second
      expect(themeManager.themes.size).toBe(100);
    });
  });
});
