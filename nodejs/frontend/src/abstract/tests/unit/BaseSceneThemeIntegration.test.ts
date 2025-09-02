/**
 * BaseScene Theme Integration Unit Tests
 *
 * Tests for the theme integration functionality added to BaseScene:
 * - Theme activation methods
 * - Theme application to game objects
 * - Theme switching functionality
 * - Integration with ThemeActivator
 */

import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { BaseScene } from '../../base/BaseScene';
import { ThemeActivator } from '../../../layout/classes/ThemeActivator';
import { ITheme } from '../../../layout/interfaces/ITheme';
import { ConfigManager } from '../../../core/ConfigManager';
import { IConfigManager } from '../../../core/interfaces';
import { Logger } from '../../../core/Logger';

// Mock Phaser
jest.mock('phaser', () => ({
  Scene: class MockScene {
    constructor(config: any) {
      this.key = config.key;
    }
    key: string;
    game = {
      config: { width: 800, height: 600 },
      scale: { scaleMode: 'fit' },
    };
    scale = { width: 800, height: 600 };
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
      registerSceneConfigs: jest.fn(),
      loadSceneConfigs: jest.fn(() => ({
        logging: true,
        responsive: {},
        scene: {},
        asset: {},
        theme: { id: 'test-theme', name: 'Test Theme' },
      })),
      hasAllConfigs: jest.fn(() => true),
      getAvailableScenes: jest.fn(() => ['test-scene']),
      getAssetManager: jest.fn(),
      getSceneAssetLoader: jest.fn(),
      getTheme: jest.fn(),
    })),
  },
}));

// Mock ResponsiveConfigLoader
jest.mock('../../../core/ResponsiveConfigLoader', () => ({
  ResponsiveConfigLoader: {
    getInstance: jest.fn(() => ({
      getResponsiveConfig: jest.fn(),
      getBreakpointConfig: jest.fn(),
      getObjectLayout: jest.fn(),
      getResponsiveBehavior: jest.fn(),
    })),
  },
}));

// Mock GameObjectFactoryManager
jest.mock('../../../factory/GameObjectFactoryManager', () => ({
  GameObjectFactoryManager: {
    getInstance: jest.fn(() => ({
      createGameObject: jest.fn(),
      registerFactory: jest.fn(),
      getFactory: jest.fn(),
    })),
  },
}));

// Mock ThemeActivator
jest.mock('../../../layout/classes/ThemeActivator', () => ({
  ThemeActivator: jest.fn().mockImplementation(() => ({
    activateThemeForScene: jest.fn(),
    applyThemeToGameObject: jest.fn(),
    switchThemeForScene: jest.fn(),
    getActiveThemeForScene: jest.fn(),
    getAvailableThemesForScene: jest.fn(),
    isThemeActiveForScene: jest.fn(),
    getAppliedClasses: jest.fn(),
  })),
}));

// Create a concrete implementation of BaseScene for testing
class TestScene extends BaseScene {
  public scene: any;

  constructor() {
    super();
    // Mock the scene property
    this.scene = {
      key: 'TestScene',
      game: {
        config: { width: 800, height: 600 },
        scale: { scaleMode: 'fit' },
      },
      scale: { width: 800, height: 600 },
    };
  }

  protected registerSceneConfigs(): void {
    // Mock implementation
  }

  protected getSceneName(): string {
    return 'test-scene';
  }
}

describe('BaseScene Theme Integration', () => {
  let testScene: TestScene;
  let mockThemeActivator: any;
  let mockLogger: any;
  let mockConfigManager: IConfigManager;
  let mockTheme: ITheme;

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

    // Create mock theme activator
    mockThemeActivator = {
      activateThemeForScene: jest.fn().mockResolvedValue({
        success: true,
        themeId: 'test-theme',
        appliedClasses: ['test-class'],
        errors: [],
        duration: 50,
      }),
      applyThemeToGameObject: jest.fn().mockResolvedValue({
        success: true,
        themeId: 'test-theme',
        appliedClasses: ['test-class'],
        errors: [],
        duration: 30,
      }),
      switchThemeForScene: jest.fn().mockResolvedValue({
        success: true,
        themeId: 'new-theme',
        appliedClasses: ['new-class'],
        errors: [],
        duration: 60,
      }),
      getActiveThemeForScene: jest.fn().mockReturnValue(mockTheme),
      getAvailableThemesForScene: jest.fn().mockReturnValue([mockTheme]),
      isThemeActiveForScene: jest.fn().mockReturnValue(true),
      getAppliedClasses: jest.fn().mockReturnValue(['test-class']),
    };

    // Create mock logger
    mockLogger = {
      info: jest.fn(),
      debug: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
      trace: jest.fn(),
    };

    // Create mock config manager
    mockConfigManager = {
      registerSceneConfigs: jest.fn(),
      loadSceneConfigs: jest.fn(() => ({
        logging: true,
        responsive: {},
        scene: {},
        asset: {},
        theme: mockTheme,
      })),
      hasAllConfigs: jest.fn(() => true),
      getAvailableScenes: jest.fn(() => ['test-scene']),
      getAssetManager: jest.fn(),
      getSceneAssetLoader: jest.fn(),
      getTheme: jest.fn(() => mockTheme),
    };

    // Mock Logger.getInstance to return our mock
    (Logger.getInstance as jest.Mock).mockReturnValue(mockLogger);

    // Mock ConfigManager.getInstance to return our mock
    (ConfigManager.getInstance as jest.Mock).mockReturnValue(mockConfigManager);

    // Mock ThemeActivator constructor to return our mock
    (ThemeActivator as jest.Mock).mockImplementation(() => mockThemeActivator);

    // Create test scene
    testScene = new TestScene();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Theme Activation', () => {
    it('should activate theme for scene', async () => {
      await testScene.activateTheme('test-theme');

      expect(mockThemeActivator.activateThemeForScene).toHaveBeenCalledWith(
        'TestScene',
        'test-theme',
        {
          sceneKey: 'TestScene',
          elementType: 'scene',
          priority: 1,
        }
      );
    });

    it('should log theme activation success', async () => {
      await testScene.activateTheme('test-theme');

      expect(mockLogger.info).toHaveBeenCalledWith(
        'BaseScene',
        'activateTheme',
        'Theme activated successfully',
        expect.objectContaining({
          sceneKey: 'TestScene',
          themeId: 'test-theme',
          appliedClasses: 1,
          duration: 50,
        })
      );
    });

    it('should handle theme activation errors', async () => {
      mockThemeActivator.activateThemeForScene.mockResolvedValue({
        success: false,
        themeId: 'test-theme',
        appliedClasses: [],
        errors: ['Theme not found'],
        duration: 10,
      });

      await testScene.activateTheme('test-theme');

      expect(mockLogger.error).toHaveBeenCalledWith(
        'BaseScene',
        'activateTheme',
        'Theme activation failed',
        expect.objectContaining({
          sceneKey: 'TestScene',
          themeId: 'test-theme',
          errors: ['Theme not found'],
        })
      );
    });

    it('should throw error on theme activation failure', async () => {
      mockThemeActivator.activateThemeForScene.mockRejectedValue(new Error('Activation failed'));

      await expect(testScene.activateTheme('test-theme')).rejects.toThrow('Activation failed');
    });
  });

  describe('Theme Application to Game Objects', () => {
    let mockGameObject: any;

    beforeEach(() => {
      mockGameObject = {
        constructor: { name: 'MockGameObject' },
        name: 'test-object',
      };
    });

    it('should apply theme to game object', async () => {
      await testScene.applyThemeToGameObject(mockGameObject, 'test-theme');

      expect(mockThemeActivator.applyThemeToGameObject).toHaveBeenCalledWith(
        mockGameObject,
        'test-theme',
        {
          sceneKey: 'TestScene',
          gameObjectId: 'test-object',
          elementType: 'gameObject',
          priority: 2,
        }
      );
    });

    it('should handle game object without name', async () => {
      mockGameObject.name = undefined;

      await testScene.applyThemeToGameObject(mockGameObject, 'test-theme');

      expect(mockThemeActivator.applyThemeToGameObject).toHaveBeenCalledWith(
        mockGameObject,
        'test-theme',
        {
          sceneKey: 'TestScene',
          gameObjectId: 'MockGameObject',
          elementType: 'gameObject',
          priority: 2,
        }
      );
    });

    it('should log theme application success', async () => {
      await testScene.applyThemeToGameObject(mockGameObject, 'test-theme');

      expect(mockLogger.debug).toHaveBeenCalledWith(
        'BaseScene',
        'applyThemeToGameObject',
        'Theme applied to game object',
        expect.objectContaining({
          sceneKey: 'TestScene',
          gameObjectType: 'MockGameObject',
          themeId: 'test-theme',
          duration: 30,
        })
      );
    });

    it('should handle theme application errors', async () => {
      mockThemeActivator.applyThemeToGameObject.mockResolvedValue({
        success: false,
        themeId: 'test-theme',
        appliedClasses: [],
        errors: ['Application failed'],
        duration: 10,
      });

      await testScene.applyThemeToGameObject(mockGameObject, 'test-theme');

      expect(mockLogger.warn).toHaveBeenCalledWith(
        'BaseScene',
        'applyThemeToGameObject',
        'Theme application failed',
        expect.objectContaining({
          sceneKey: 'TestScene',
          gameObjectType: 'MockGameObject',
          themeId: 'test-theme',
          errors: ['Application failed'],
        })
      );
    });
  });

  describe('Theme Switching', () => {
    it('should switch theme for scene', async () => {
      await testScene.switchTheme('new-theme');

      expect(mockThemeActivator.switchThemeForScene).toHaveBeenCalledWith(
        'TestScene',
        'new-theme',
        {
          sceneKey: 'TestScene',
          elementType: 'scene',
          priority: 1,
        }
      );
    });

    it('should log theme switch success', async () => {
      await testScene.switchTheme('new-theme');

      expect(mockLogger.info).toHaveBeenCalledWith(
        'BaseScene',
        'switchTheme',
        'Theme switched successfully',
        expect.objectContaining({
          sceneKey: 'TestScene',
          newThemeId: 'new-theme',
          appliedClasses: 1,
          duration: 60,
        })
      );
    });

    it('should handle theme switch errors', async () => {
      mockThemeActivator.switchThemeForScene.mockResolvedValue({
        success: false,
        themeId: 'new-theme',
        appliedClasses: [],
        errors: ['Switch failed'],
        duration: 10,
      });

      await testScene.switchTheme('new-theme');

      expect(mockLogger.error).toHaveBeenCalledWith(
        'BaseScene',
        'switchTheme',
        'Theme switch failed',
        expect.objectContaining({
          sceneKey: 'TestScene',
          newThemeId: 'new-theme',
          errors: ['Switch failed'],
        })
      );
    });
  });

  describe('Theme Access Methods', () => {
    it('should get active theme', () => {
      const activeTheme = testScene.getActiveTheme();
      expect(activeTheme).toBe(mockTheme);
      expect(mockThemeActivator.getActiveThemeForScene).toHaveBeenCalledWith('TestScene');
    });

    it('should get available themes', () => {
      const availableThemes = testScene.getAvailableThemes();
      expect(availableThemes).toEqual([mockTheme]);
      expect(mockThemeActivator.getAvailableThemesForScene).toHaveBeenCalledWith('TestScene');
    });

    it('should check if theme is active', () => {
      const isActive = testScene.isThemeActive('test-theme');
      expect(isActive).toBe(true);
      expect(mockThemeActivator.isThemeActiveForScene).toHaveBeenCalledWith(
        'TestScene',
        'test-theme'
      );
    });

    it('should get applied theme classes', () => {
      const appliedClasses = testScene.getAppliedThemeClasses();
      expect(appliedClasses).toEqual(['test-class']);
      expect(mockThemeActivator.getAppliedClasses).toHaveBeenCalledWith('TestScene');
    });
  });

  describe('Error Handling', () => {
    it('should handle theme activation errors gracefully', async () => {
      mockThemeActivator.activateThemeForScene.mockRejectedValue(new Error('Network error'));

      await expect(testScene.activateTheme('test-theme')).rejects.toThrow('Network error');

      expect(mockLogger.error).toHaveBeenCalledWith(
        'BaseScene',
        'activateTheme',
        'Theme activation error',
        expect.objectContaining({
          error: expect.any(Error),
          sceneKey: 'TestScene',
          themeId: 'test-theme',
        })
      );
    });

    it('should handle game object theme application errors gracefully', async () => {
      const mockGameObject = { constructor: { name: 'MockGameObject' } };
      mockThemeActivator.applyThemeToGameObject.mockRejectedValue(new Error('Game object error'));

      await expect(testScene.applyThemeToGameObject(mockGameObject, 'test-theme')).rejects.toThrow(
        'Game object error'
      );

      expect(mockLogger.error).toHaveBeenCalledWith(
        'BaseScene',
        'applyThemeToGameObject',
        'Theme application error',
        expect.objectContaining({
          error: expect.any(Error),
          sceneKey: 'TestScene',
          gameObjectType: 'MockGameObject',
          themeId: 'test-theme',
        })
      );
    });

    it('should handle theme switch errors gracefully', async () => {
      mockThemeActivator.switchThemeForScene.mockRejectedValue(new Error('Switch error'));

      await expect(testScene.switchTheme('new-theme')).rejects.toThrow('Switch error');

      expect(mockLogger.error).toHaveBeenCalledWith(
        'BaseScene',
        'switchTheme',
        'Theme switch error',
        expect.objectContaining({
          error: expect.any(Error),
          sceneKey: 'TestScene',
          newThemeId: 'new-theme',
        })
      );
    });
  });

  describe('Integration with Scene Lifecycle', () => {
    it('should initialize theme activator in constructor', () => {
      expect(ThemeActivator).toHaveBeenCalled();
      expect(testScene).toHaveProperty('themeActivator');
    });

    it('should have theme activator available for use', () => {
      expect(testScene.themeActivator).toBe(mockThemeActivator);
    });
  });

  describe('Performance Considerations', () => {
    it('should complete theme operations within reasonable time', async () => {
      const startTime = performance.now();

      await testScene.activateTheme('test-theme');

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete within 50ms for mocked operations
      expect(duration).toBeLessThan(50);
    });

    it('should handle multiple concurrent theme operations', async () => {
      const mockGameObject1 = { constructor: { name: 'GameObject1' } };
      const mockGameObject2 = { constructor: { name: 'GameObject2' } };

      const promises = [
        testScene.activateTheme('test-theme'),
        testScene.applyThemeToGameObject(mockGameObject1, 'test-theme'),
        testScene.applyThemeToGameObject(mockGameObject2, 'test-theme'),
      ];

      await expect(Promise.all(promises)).resolves.not.toThrow();
    });
  });
});
