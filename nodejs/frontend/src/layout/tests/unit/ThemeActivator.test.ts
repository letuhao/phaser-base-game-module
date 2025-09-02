import { ThemeActivator } from '../../classes/ThemeActivator';
import { ThemeManager } from '../../classes/ThemeManager';
import { ConfigManager } from '../../../core/ConfigManager';
import { IThemeManager } from '../../interfaces/IThemeManager';
import { IConfigManager } from '../../../core/interfaces';
import { ITheme, IThemeData, IThemeProperties } from '../../interfaces/IThemeSegregated';
import { BaseThemeType, ExtendedThemeType, ThemeVariant, ThemeElementType } from '../../enums/LayoutEnums';
import { SegregatedTheme } from '../../classes/SegregatedTheme';
import { SegregatedThemeFactory } from '../../classes/SegregatedThemeFactory';

// Mock dependencies
jest.mock('../../../core/ConfigManager');
jest.mock('../../classes/ThemeManager');

describe('ThemeActivator', () => {
  let themeActivator: ThemeActivator;
  let mockThemeManager: jest.Mocked<IThemeManager>;
  let mockConfigManager: jest.Mocked<IConfigManager>;
  let mockTheme: ITheme;

  // Helper function to create complete mock theme data
  const createMockThemeData = (id: string = 'test-theme-1'): IThemeData => ({
    id,
    name: `Test Theme ${id}`,
    displayName: `Test Theme Display ${id}`,
    description: 'A test theme for unit testing',
    type: ExtendedThemeType.MATERIAL,
    variant: ThemeVariant.DEFAULT,
    isActive: true,
    supportsDarkMode: true,
    oppositeTheme: 'test-theme-dark',
    version: '1.0.0',
    author: 'Test Author',
    tags: ['test', 'mock', 'unit-test']
  });

  // Helper function to create complete mock theme properties
  const createMockThemeProperties = (): IThemeProperties => ({
    colors: {
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
        contrast: '#ffffff'
      },
      secondary: {
        main: '#dc004e',
        light: '#ff5983',
        dark: '#9a0036',
        contrast: '#ffffff'
      },
      background: {
        primary: '#ffffff',
        secondary: '#f5f5f5',
        tertiary: '#e0e0e0',
        overlay: 'rgba(0, 0, 0, 0.5)'
      },
      text: {
        primary: '#212121',
        secondary: '#757575',
        disabled: '#bdbdbd',
        inverse: '#ffffff'
      },
      status: {
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        info: '#2196f3'
      },
      ui: {
        border: '#e0e0e0',
        shadow: '#000000',
        highlight: '#1976d2',
        disabled: '#f5f5f5'
      },
      semantic: {
        brand: {
          primary: '#1976d2',
          secondary: '#dc004e'
        },
        functional: {
          success: '#4caf50',
          warning: '#ff9800',
          error: '#f44336',
          info: '#2196f3'
        },
        state: {
          active: '#1976d2',
          inactive: '#757575',
          hover: '#f5f5f5',
          focus: '#e3f2fd'
        }
      }
    },
    typography: {
      fontFamily: {
        primary: 'Roboto, sans-serif',
        secondary: 'Arial, sans-serif',
        monospace: 'Courier New, monospace'
      },
      fontSize: {
        xs: 12,
        sm: 14,
        base: 16,
        lg: 18,
        xl: 20,
        '2xl': 24,
        '3xl': 30
      },
      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700
      },
      lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75
      },
      letterSpacing: {
        tight: -0.5,
        normal: 0,
        wide: 0.5
      }
    },
    spacing: {
      base: 8,
      scale: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        '2xl': 48,
        '3xl': 64
      }
    },
    borderRadius: {
      none: 0,
      sm: 4,
      base: 8,
      lg: 12,
      xl: 16,
      full: 9999
    },
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      base: '0 4px 6px rgba(0, 0, 0, 0.1)',
      md: '0 10px 15px rgba(0, 0, 0, 0.1)',
      lg: '0 20px 25px rgba(0, 0, 0, 0.1)',
      xl: '0 25px 50px rgba(0, 0, 0, 0.25)',
      '2xl': '0 50px 100px rgba(0, 0, 0, 0.25)'
    },
    animation: {
      duration: {
        fast: 150,
        normal: 300,
        slow: 500,
        verySlow: 1000
      },
      easing: {
        linear: 'linear',
        ease: 'ease',
        easeIn: 'ease-in',
        easeOut: 'ease-out',
        easeInOut: 'ease-in-out'
      },
      properties: {
        all: 'all',
        opacity: 'opacity',
        transform: 'transform',
        color: 'color',
        background: 'background'
      }
    },
    breakpoints: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      '2xl': 1400
    },
    themeClasses: {
      'button-primary': {
        name: 'button-primary',
        description: 'Primary button styling',
        properties: {
          backgroundColor: '#1976d2',
          color: '#ffffff',
          padding: '8px 16px',
          borderRadius: '4px'
        }
      }
    },
    custom: {
      customProperty1: 'customValue1',
      customProperty2: 42
    },
    metadata: {
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      version: '1.0.0',
      author: 'Test Author'
    }
  });

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Create mock theme manager
    mockThemeManager = {
      registerTheme: jest.fn(),
      unregisterTheme: jest.fn(),
      getTheme: jest.fn(),
      getActiveTheme: jest.fn(),
      activateTheme: jest.fn(),
      activateThemeByName: jest.fn(),
      getThemes: jest.fn(),
      getThemesByType: jest.fn(),
      getThemesByVariant: jest.fn(),
      hasTheme: jest.fn(),
      clearThemes: jest.fn(),
      getThemeCount: jest.fn()
    } as jest.Mocked<IThemeManager>;

    // Create mock config manager
    mockConfigManager = {
      getConfig: jest.fn(),
      setConfig: jest.fn(),
      hasConfig: jest.fn(),
      clearConfigs: jest.fn(),
      getConfigCount: jest.fn(),
      loadConfig: jest.fn(),
      saveConfig: jest.fn(),
      validateConfig: jest.fn(),
      getConfigKeys: jest.fn(),
      getConfigByType: jest.fn(),
      getAllThemes: jest.fn()
    } as jest.Mocked<IConfigManager>;

    // Create mock theme
    const themeFactory = new SegregatedThemeFactory();
    const themeData = createMockThemeData();
    const themeProperties = createMockThemeProperties();
    const createResult = themeFactory.createTheme(themeData, themeProperties);
    mockTheme = createResult.data!;

    // Create theme activator with mocked dependencies
    themeActivator = new ThemeActivator(mockThemeManager, mockConfigManager);
  });

  describe('constructor', () => {
    it('should create theme activator with default dependencies', () => {
      const activator = new ThemeActivator();
      expect(activator).toBeDefined();
    });

    it('should create theme activator with custom dependencies', () => {
      const activator = new ThemeActivator(mockThemeManager, mockConfigManager);
      expect(activator).toBeDefined();
    });
  });

  describe('activateThemeForScene', () => {
    it('should activate theme for scene successfully', async () => {
      mockThemeManager.getTheme.mockReturnValue(mockTheme);
      mockThemeManager.activateTheme.mockResolvedValue(undefined);

      const result = await themeActivator.activateThemeForScene('test-scene', 'test-theme-1');

      expect(result.success).toBe(true);
      expect(result.themeId).toBe('test-theme-1');
      expect(result.sceneId).toBe('test-scene');
      expect(mockThemeManager.getTheme).toHaveBeenCalledWith('test-theme-1');
      expect(mockThemeManager.activateTheme).toHaveBeenCalledWith('test-theme-1');
    });

    it('should handle theme not found', async () => {
      mockThemeManager.getTheme.mockReturnValue(undefined);

      const result = await themeActivator.activateThemeForScene('test-scene', 'non-existent-theme');

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Theme not found');
    });

    it('should handle theme manager errors', async () => {
      mockThemeManager.getTheme.mockImplementation(() => {
        throw new Error('Theme manager error');
      });

      const result = await themeActivator.activateThemeForScene('test-scene', 'test-theme-1');

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Theme manager error');
    });

    it('should handle setActiveTheme errors', async () => {
      mockThemeManager.getTheme.mockReturnValue(mockTheme);
      mockThemeManager.activateTheme.mockImplementation(() => {
        throw new Error('Set active theme error');
      });

      const result = await themeActivator.activateThemeForScene('test-scene', 'test-theme-1');

      expect(result.success).toBe(false);
      expect(result.errors).toContain('Theme manager error');
    });
  });

  describe('deactivateThemeForScene', () => {
    it('should deactivate theme for scene successfully', async () => {
      await expect(themeActivator.deactivateThemeForScene('test-scene')).resolves.not.toThrow();
    });

    it('should handle deactivation errors', async () => {
      // Mock the removeAppliedClasses method to throw an error
      const originalRemoveAppliedClasses = themeActivator['removeAppliedClasses'];
      themeActivator['removeAppliedClasses'] = jest.fn().mockImplementation(() => {
        throw new Error('Deactivation error');
      });

      await expect(themeActivator.deactivateThemeForScene('test-scene')).rejects.toThrow('Deactivation error');
      
      // Restore the original method
      themeActivator['removeAppliedClasses'] = originalRemoveAppliedClasses;
    });
  });

  describe('applyThemeToGameObject', () => {
    const mockGameObject = {
      scene: {
        scene: {
          key: 'test-scene'
        }
      },
      name: 'test-game-object',
      setData: jest.fn(),
      getData: jest.fn()
    } as any;

    it('should apply theme to game object successfully', async () => {
      mockThemeManager.getTheme.mockReturnValue(mockTheme);

      const result = await themeActivator.applyThemeToGameObject(mockGameObject, 'test-theme-1');

      expect(result.success).toBe(true);
      expect(result.themeId).toBe('test-theme-1');
    });

    it('should handle game object without scene', async () => {
      mockThemeManager.getTheme.mockReturnValue(mockTheme);
      
      const gameObjectWithoutScene = {
        name: 'test-game-object',
        setData: jest.fn(),
        getData: jest.fn()
      } as any;

      const result = await themeActivator.applyThemeToGameObject(gameObjectWithoutScene, 'test-theme-1');

      expect(result.success).toBe(true);
      expect(result.themeId).toBe('test-theme-1');
    });

    it('should handle game object without name', async () => {
      mockThemeManager.getTheme.mockReturnValue(mockTheme);
      
      const gameObjectWithoutName = {
        scene: {
          scene: {
            key: 'test-scene'
          }
        },
        setData: jest.fn(),
        getData: jest.fn()
      } as any;

      const result = await themeActivator.applyThemeToGameObject(gameObjectWithoutName, 'test-theme-1');

      expect(result.success).toBe(true);
      expect(result.themeId).toBe('test-theme-1');
    });

    it('should apply theme with custom context', async () => {
      mockThemeManager.getTheme.mockReturnValue(mockTheme);
      
      const customContext = {
        elementType: ThemeElementType.GAME_OBJECT,
        elementId: 'custom-element',
        customProperties: {
          customProp: 'customValue'
        }
      };

      const result = await themeActivator.applyThemeToGameObject(mockGameObject, 'test-theme-1', customContext);

      expect(result.success).toBe(true);
      expect(result.themeId).toBe('test-theme-1');
    });
  });

  describe('getActiveThemeForScene', () => {
    it('should get active theme for scene', () => {
      mockThemeManager.getActiveTheme.mockReturnValue(mockTheme);

      const result = themeActivator.getActiveThemeForScene('test-scene');

      expect(result).toBe(mockTheme);
    });

    it('should handle no active theme', () => {
      mockThemeManager.getActiveTheme.mockReturnValue(undefined);

      const result = themeActivator.getActiveThemeForScene('test-scene');

      expect(result).toBeNull();
    });
  });

  describe('getAllActiveThemes', () => {
    it('should get all active themes', () => {
      const result = themeActivator.getAllActiveThemes();

      expect(result).toBeInstanceOf(Map);
      expect(result.size).toBe(0); // Initially empty since no themes are activated
    });
  });

  describe('isThemeActiveForScene', () => {
    it('should check if theme is active for scene', () => {
      mockThemeManager.getActiveTheme.mockReturnValue(mockTheme);

      const result = themeActivator.isThemeActiveForScene('test-scene', 'test-theme-1');

      expect(result).toBe(true);
    });

    it('should return false for inactive theme', () => {
      mockThemeManager.getActiveTheme.mockReturnValue(undefined);

      const result = themeActivator.isThemeActiveForScene('test-scene', 'test-theme-1');

      expect(result).toBe(false);
    });
  });

  describe('getAppliedClasses', () => {
    it('should get applied classes for scene', () => {
      const result = themeActivator.getAppliedClasses('test-scene');

      expect(result).toEqual([]);
    });

    it('should return empty array for scene without classes', () => {
      const result = themeActivator.getAppliedClasses('non-existent-scene');

      expect(result).toEqual([]);
    });
  });

  describe('getActivationHistory', () => {
    it('should get activation history', () => {
      const result = themeActivator.getActivationHistory();

      expect(result).toBeInstanceOf(Map);
      expect(result.size).toBe(0); // Initially empty
    });
  });

  describe('getAvailableThemesForScene', () => {
    it('should get available themes for scene', () => {
      const availableThemes = [mockTheme];
      mockThemeManager.getThemes.mockReturnValue(availableThemes);

      const result = themeActivator.getAvailableThemesForScene('test-scene');

      expect(result).toEqual(availableThemes);
    });
  });

  describe('reset', () => {
    it('should reset theme activator', () => {
      expect(() => themeActivator.reset()).not.toThrow();
    });
  });

  describe('destroy', () => {
    it('should destroy theme activator', () => {
      expect(() => themeActivator.destroy()).not.toThrow();
    });
  });
});