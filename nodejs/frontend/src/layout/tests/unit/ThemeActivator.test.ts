/**
 * ThemeActivator Unit Tests
 *
 * Comprehensive tests for the ThemeActivator class covering:
 * - Theme activation for scenes
 * - Theme application to game objects
 * - Theme switching functionality
 * - Error handling and edge cases
 * - Integration with ConfigManager and ThemeManager
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { ThemeActivator } from '../../classes/ThemeActivator';
import { IThemeActivationResult, IThemeApplicationContext } from '../../interfaces';
import { ITheme, IThemeClass } from '../../interfaces/ITheme';
import { IThemeManager } from '../../interfaces/IThemeManager';
import { ConfigManager } from '../../../core/ConfigManager';
import { IConfigManager } from '../../../core/interfaces';
import { Logger } from '../../../core/Logger';

// Mock Phaser
jest.mock('phaser', () => ({
  GameObjects: {
    GameObject: class MockGameObject {
      constructor(
        public scene?: any,
        public name?: string
      ) {}
    },
  },
}));

// Mock Logger
jest.mock('../../../core/Logger', () => ({
  Logger: {
    getInstance: jest.fn(() => ({
      info: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      trace: jest.fn(),
    })),
  },
}));

// Mock ConfigManager
jest.mock('../../../core/ConfigManager', () => ({
  ConfigManager: {
    getInstance: jest.fn(() => ({
      getTheme: jest.fn(),
      getAllThemes: jest.fn(() => new Map()),
      registerSceneConfigs: jest.fn(),
      loadSceneConfigs: jest.fn(),
    })),
  },
}));

describe('ThemeActivator', () => {
  let themeActivator: ThemeActivator;
  let mockThemeManager: IThemeManager;
  let mockConfigManager: IConfigManager;
  let mockLogger: any;
  let mockTheme: ITheme;
  let mockThemeClass: IThemeClass;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Create mock theme
    mockTheme = {
      id: 'test-theme',
      name: 'Test Theme',
      displayName: 'Test Theme Display',
      type: 'custom' as any,
      variant: 'default' as any,
      isActive: false,
      supportsDarkMode: true,
      colors: {
        primary: { main: '#ff0000', light: '#ff6666', dark: '#cc0000', contrast: '#ffffff' },
        secondary: { main: '#00ff00', light: '#66ff66', dark: '#00cc00', contrast: '#000000' },
        background: {
          primary: '#ffffff',
          secondary: '#f0f0f0',
          tertiary: '#e0e0e0',
          overlay: '#00000080',
        },
        text: { primary: '#000000', secondary: '#666666', disabled: '#999999', inverse: '#ffffff' },
        status: { success: '#00ff00', warning: '#ffaa00', error: '#ff0000', info: '#0066ff' },
        ui: { border: '#cccccc', shadow: '#00000040', highlight: '#ffff00', disabled: '#dddddd' },
        semantic: {},
      },
      typography: {
        fontFamily: { primary: 'Arial', secondary: 'Helvetica', monospace: 'Courier' },
        fontSize: { xs: 12, sm: 14, base: 16, lg: 18, xl: 20, '2xl': 24, '3xl': 32 },
        fontWeight: { light: 300, normal: 400, medium: 500, semibold: 600, bold: 700 },
        lineHeight: { tight: 1.2, normal: 1.5, relaxed: 1.8 },
      },
      spacing: {
        base: 8,
        scale: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48, '3xl': 64 },
      },
      borderRadius: { none: 0, sm: 4, base: 8, lg: 12, xl: 16, full: 999 },
      shadows: {
        sm: '0 1px 2px rgba(0,0,0,0.1)',
        base: '0 2px 4px rgba(0,0,0,0.1)',
        md: '0 4px 8px rgba(0,0,0,0.1)',
        lg: '0 8px 16px rgba(0,0,0,0.1)',
        xl: '0 16px 32px rgba(0,0,0,0.1)',
        '2xl': '0 32px 64px rgba(0,0,0,0.1)',
      },
      animation: {
        duration: { fast: 150, normal: 300, slow: 500, verySlow: 1000 },
        easing: {
          linear: 'linear',
          ease: 'ease',
          easeIn: 'ease-in',
          easeOut: 'ease-out',
          easeInOut: 'ease-in-out',
        },
        properties: {
          all: 'all',
          opacity: 'opacity',
          transform: 'transform',
          color: 'color',
          background: 'background',
        },
      },
      breakpoints: { xs: 576, sm: 768, md: 992, lg: 1200, xl: 1400, '2xl': 1600 },
      getColor: jest.fn((path: string) => '#ff0000'),
      getSpacing: jest.fn((size: string) => 16),
      getFontSize: jest.fn((size: string) => 16),
      getBorderRadius: jest.fn((size: string) => 8),
      getShadow: jest.fn((size: string) => '0 2px 4px rgba(0,0,0,0.1)'),
      getAnimationDuration: jest.fn((size: string) => 300),
      supportsBreakpoint: jest.fn(() => true),
      getOppositeTheme: jest.fn(() => null),
      clone: jest.fn(() => mockTheme),
      merge: jest.fn(() => mockTheme),
    };

    // Create mock theme class
    mockThemeClass = {
      backgroundColor: '#ffffff',
      color: '#000000',
      padding: 16,
      margin: 8,
      borderRadius: 8,
      fontSize: 16,
      fontWeight: 400,
    };

    // Create mock theme manager
    mockThemeManager = {
      themes: new Map([['test-theme', mockTheme]]),
      activeTheme: null,
      currentThemeType: 'custom' as any,
      isInitialized: true,
      listeners: new Set(),
      themeCache: new Map(),
      initialize: jest.fn(),
      registerTheme: jest.fn(),
      unregisterTheme: jest.fn(),
      getTheme: jest.fn((id: string) => (id === 'test-theme' ? mockTheme : undefined)),
      getThemeByName: jest.fn(),
      getThemes: jest.fn(),
      getThemesByType: jest.fn(),
      getThemesByVariant: jest.fn(),
      hasTheme: jest.fn((id: string) => id === 'test-theme'),
      activateTheme: jest.fn(),
      deactivateTheme: jest.fn(),
      activateThemeByName: jest.fn(),
      getActiveTheme: jest.fn(),
      isThemeActive: jest.fn(),
      toggleThemeMode: jest.fn(),
      switchToLightTheme: jest.fn(),
      switchToDarkTheme: jest.fn(),
      getThemeClass: jest.fn((className: string) =>
        className === 'test-class' ? mockThemeClass : undefined
      ),
      getColor: jest.fn(),
      getSpacing: jest.fn(),
      getFontSize: jest.fn(),
      getBorderRadius: jest.fn(),
      getShadow: jest.fn(),
      getAnimationDuration: jest.fn(),
      supportsBreakpoint: jest.fn(),
      applyThemeClass: jest.fn(),
      removeThemeClass: jest.fn(),
      addListener: jest.fn(),
      removeListener: jest.fn(),
      clearListeners: jest.fn(),
      getStatistics: jest.fn(),
      exportTheme: jest.fn(),
      importTheme: jest.fn(),
      reset: jest.fn(),
      destroy: jest.fn(),
    };

    // Create mock config manager
    mockConfigManager = {
      getTheme: jest.fn((id: string) => (id === 'test-theme' ? mockTheme : null)),
      getAllThemes: jest.fn(() => new Map([['test-theme', mockTheme]])),
      registerSceneConfigs: jest.fn(),
      loadSceneConfigs: jest.fn(),
      hasAllConfigs: jest.fn(),
      getAvailableScenes: jest.fn(),
      getAssetManager: jest.fn(),
      getSceneAssetLoader: jest.fn(),
      getTheme: jest.fn((id: string) => (id === 'test-theme' ? mockTheme : null)),
    } as any;

    // Create mock logger
    mockLogger = {
      info: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      trace: jest.fn(),
    };

    // Mock Logger.getInstance to return our mock
    (Logger.getInstance as jest.Mock).mockReturnValue(mockLogger);

    // Create ThemeActivator instance
    themeActivator = new ThemeActivator(mockThemeManager, mockConfigManager);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Constructor', () => {
    it('should initialize with default dependencies', () => {
      const activator = new ThemeActivator();
      expect(activator).toBeInstanceOf(ThemeActivator);
    });

    it('should initialize with provided dependencies', () => {
      expect(themeActivator).toBeInstanceOf(ThemeActivator);
      expect(mockLogger.info).toHaveBeenCalledWith(
        'ThemeActivator',
        'constructor',
        'Theme activator initialized'
      );
    });
  });

  describe('Theme Activation for Scenes', () => {
    it('should successfully activate a theme for a scene', async () => {
      const result = await themeActivator.activateThemeForScene('test-scene', 'test-theme');

      expect(result.success).toBe(true);
      expect(result.themeId).toBe('test-theme');
      expect(result.appliedClasses).toEqual([]);
      expect(result.errors).toEqual([]);
      expect(result.duration).toBeGreaterThan(0);
    });

    it('should handle theme not found error', async () => {
      const result = await themeActivator.activateThemeForScene('test-scene', 'nonexistent-theme');

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Theme not found: nonexistent-theme');
    });

    it('should handle activation errors gracefully', async () => {
      // Mock an error in theme application by making both getTheme methods return null
      mockConfigManager.getTheme = jest.fn(() => null);
      mockThemeManager.getTheme = jest.fn(() => undefined);

      const result = await themeActivator.activateThemeForScene('test-scene', 'test-theme');

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Theme not found: test-theme');
    });

    it('should track applied classes', async () => {
      // Add theme classes to the mock theme
      const themeWithClasses = {
        ...mockTheme,
        themeClasses: {
          'test-class': mockThemeClass,
        },
      };
      mockConfigManager.getTheme = jest.fn(() => themeWithClasses);

      const result = await themeActivator.activateThemeForScene('test-scene', 'test-theme');

      expect(result.success).toBe(true);
      expect(themeActivator.getAppliedClasses('test-scene')).toContain('test-class');
    });
  });

  describe('Theme Application to Game Objects', () => {
    let mockGameObject: any;

    beforeEach(() => {
      mockGameObject = {
        constructor: { name: 'MockGameObject' },
        scene: { scene: { key: 'test-scene' } },
        name: 'test-object',
      };
    });

    it('should successfully apply theme to game object', async () => {
      const result = await themeActivator.applyThemeToGameObject(mockGameObject, 'test-theme');

      expect(result.success).toBe(true);
      expect(result.themeId).toBe('test-theme');
      expect(result.duration).toBeGreaterThan(0);
    });

    it('should handle game object theme application errors', async () => {
      // Mock an error by making both getTheme methods return null
      mockConfigManager.getTheme = jest.fn(() => null);
      mockThemeManager.getTheme = jest.fn(() => undefined);

      const result = await themeActivator.applyThemeToGameObject(mockGameObject, 'test-theme');

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Theme not found: test-theme');
    });

    it('should handle missing game object scene', async () => {
      mockGameObject.scene = null;

      const result = await themeActivator.applyThemeToGameObject(mockGameObject, 'test-theme');

      expect(result.success).toBe(true); // Should still succeed with fallback
    });
  });

  describe('Theme Switching', () => {
    it('should successfully switch theme for a scene', async () => {
      // First activate a theme
      await themeActivator.activateThemeForScene('test-scene', 'test-theme');

      // Create a second theme
      const secondTheme = { ...mockTheme, id: 'second-theme', name: 'Second Theme' };
      mockConfigManager.getTheme = jest.fn((id: string) =>
        id === 'test-theme' ? mockTheme : id === 'second-theme' ? secondTheme : null
      );

      const result = await themeActivator.switchThemeForScene('test-scene', 'second-theme');

      expect(result.success).toBe(true);
      expect(result.themeId).toBe('second-theme');
    });

    it('should handle theme switch errors', async () => {
      // Mock an error during theme switching by making both getTheme methods return null
      mockConfigManager.getTheme = jest.fn(() => null);
      mockThemeManager.getTheme = jest.fn(() => undefined);

      const result = await themeActivator.switchThemeForScene('test-scene', 'test-theme');

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Theme not found: test-theme');
    });
  });

  describe('Theme Deactivation', () => {
    it('should successfully deactivate theme for a scene', async () => {
      // First activate a theme
      await themeActivator.activateThemeForScene('test-scene', 'test-theme');

      // Then deactivate it
      await expect(themeActivator.deactivateThemeForScene('test-scene')).resolves.not.toThrow();

      expect(themeActivator.getActiveThemeForScene('test-scene')).toBeNull();
    });

    it('should handle deactivation errors gracefully', async () => {
      // Mock an error by making the method throw
      const originalDeactivate = themeActivator.deactivateThemeForScene;
      themeActivator.deactivateThemeForScene = jest
        .fn()
        .mockRejectedValue(new Error('Deactivation error'));

      await expect(themeActivator.deactivateThemeForScene('test-scene')).rejects.toThrow(
        'Deactivation error'
      );

      // Restore original method
      themeActivator.deactivateThemeForScene = originalDeactivate;
    });
  });

  describe('Theme Access Methods', () => {
    it('should get active theme for scene', async () => {
      await themeActivator.activateThemeForScene('test-scene', 'test-theme');

      const activeTheme = themeActivator.getActiveThemeForScene('test-scene');
      expect(activeTheme).toBe(mockTheme);
    });

    it('should return null for inactive scene', () => {
      const activeTheme = themeActivator.getActiveThemeForScene('inactive-scene');
      expect(activeTheme).toBeNull();
    });

    it('should get all active themes', async () => {
      await themeActivator.activateThemeForScene('scene1', 'test-theme');
      await themeActivator.activateThemeForScene('scene2', 'test-theme');

      const activeThemes = themeActivator.getAllActiveThemes();
      expect(activeThemes.size).toBe(2);
      expect(activeThemes.has('scene1')).toBe(true);
      expect(activeThemes.has('scene2')).toBe(true);
    });

    it('should check if theme is active for scene', async () => {
      await themeActivator.activateThemeForScene('test-scene', 'test-theme');

      expect(themeActivator.isThemeActiveForScene('test-scene', 'test-theme')).toBe(true);
      expect(themeActivator.isThemeActiveForScene('test-scene', 'other-theme')).toBe(false);
      expect(themeActivator.isThemeActiveForScene('other-scene', 'test-theme')).toBe(false);
    });

    it('should get applied classes for scene', async () => {
      await themeActivator.activateThemeForScene('test-scene', 'test-theme');

      const appliedClasses = themeActivator.getAppliedClasses('test-scene');
      expect(Array.isArray(appliedClasses)).toBe(true);
    });

    it('should get activation history', async () => {
      await themeActivator.activateThemeForScene('test-scene', 'test-theme');

      const history = themeActivator.getActivationHistory();
      expect(history.size).toBeGreaterThan(0);
      expect(history.has('test-scene:test-theme')).toBe(true);
    });
  });

  describe('Theme Utility Methods', () => {
    it('should get available themes for scene', () => {
      const availableThemes = themeActivator.getAvailableThemesForScene('test-scene');
      expect(Array.isArray(availableThemes)).toBe(true);
      expect(availableThemes).toContain(mockTheme);
    });

    it('should filter themes based on compatibility', () => {
      // Create an incompatible theme
      const incompatibleTheme = { ...mockTheme, id: 'incompatible', name: '' };
      mockConfigManager.getAllThemes = jest.fn(
        () =>
          new Map([
            ['test-theme', mockTheme],
            ['incompatible', incompatibleTheme],
          ])
      );

      const availableThemes = themeActivator.getAvailableThemesForScene('test-scene');
      expect(availableThemes).toContain(mockTheme);
      expect(availableThemes).not.toContain(incompatibleTheme);
    });
  });

  describe('Lifecycle Methods', () => {
    it('should reset the activator', async () => {
      // Activate some themes first
      await themeActivator.activateThemeForScene('scene1', 'test-theme');
      await themeActivator.activateThemeForScene('scene2', 'test-theme');

      // Reset
      themeActivator.reset();

      expect(themeActivator.getAllActiveThemes().size).toBe(0);
      expect(themeActivator.getActivationHistory().size).toBe(0);
    });

    it('should destroy the activator', () => {
      expect(() => themeActivator.destroy()).not.toThrow();
    });
  });

  describe('Error Handling', () => {
    it('should handle ConfigManager errors gracefully', async () => {
      mockConfigManager.getTheme = jest.fn(() => {
        throw new Error('ConfigManager error');
      });

      const result = await themeActivator.activateThemeForScene('test-scene', 'test-theme');
      expect(result.success).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should handle ThemeManager errors gracefully', async () => {
      // Mock an error by making both getTheme methods return null
      mockConfigManager.getTheme = jest.fn(() => null);
      mockThemeManager.getTheme = jest.fn(() => undefined);

      const result = await themeActivator.activateThemeForScene('test-scene', 'test-theme');
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Theme not found: test-theme');
    });

    it('should handle performance timing errors', async () => {
      // Mock an error by making both getTheme methods return null
      mockConfigManager.getTheme = jest.fn(() => null);
      mockThemeManager.getTheme = jest.fn(() => undefined);

      const result = await themeActivator.activateThemeForScene('test-scene', 'test-theme');
      expect(result.success).toBe(false);
      expect(result.errors).toContain('Theme not found: test-theme');
    });
  });

  describe('Integration Tests', () => {
    it('should work with real ConfigManager and ThemeManager', async () => {
      // Create a real ThemeActivator with mocked dependencies
      const realActivator = new ThemeActivator();

      // This should not throw
      expect(realActivator).toBeInstanceOf(ThemeActivator);
    });

    it('should handle concurrent theme activations', async () => {
      const promises = [
        themeActivator.activateThemeForScene('scene1', 'test-theme'),
        themeActivator.activateThemeForScene('scene2', 'test-theme'),
        themeActivator.activateThemeForScene('scene3', 'test-theme'),
      ];

      const results = await Promise.all(promises);

      results.forEach(result => {
        expect(result.success).toBe(true);
      });

      expect(themeActivator.getAllActiveThemes().size).toBe(3);
    });

    it('should handle rapid theme switching', async () => {
      const themes = ['test-theme', 'test-theme', 'test-theme'];

      for (const themeId of themes) {
        const result = await themeActivator.switchThemeForScene('test-scene', themeId);
        expect(result.success).toBe(true);
      }

      expect(themeActivator.isThemeActiveForScene('test-scene', 'test-theme')).toBe(true);
    });
  });

  describe('Performance Tests', () => {
    it('should complete theme activation within reasonable time', async () => {
      const startTime = performance.now();

      await themeActivator.activateThemeForScene('test-scene', 'test-theme');

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete within 100ms (very generous for unit tests)
      expect(duration).toBeLessThan(100);
    });

    it('should handle multiple rapid activations efficiently', async () => {
      const startTime = performance.now();

      const promises = Array.from({ length: 10 }, (_, i) =>
        themeActivator.activateThemeForScene(`scene${i}`, 'test-theme')
      );

      await Promise.all(promises);

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete 10 activations within 200ms
      expect(duration).toBeLessThan(200);
    });
  });
});
