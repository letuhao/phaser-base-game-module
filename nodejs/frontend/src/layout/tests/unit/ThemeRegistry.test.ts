import { ThemeRegistry } from '../../classes/ThemeRegistry';
import { SegregatedTheme } from '../../classes/SegregatedTheme';
import { SegregatedThemeFactory } from '../../classes/SegregatedThemeFactory';
import { ITheme, IThemeData, IThemeProperties } from '../../interfaces/IThemeSegregated';
import { BaseThemeType, ExtendedThemeType, ThemeVariant, ThemeMode } from '../../enums/LayoutEnums';

describe('ThemeRegistry', () => {
  let themeRegistry: ThemeRegistry;
  let themeFactory: SegregatedThemeFactory;
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
    themeRegistry = new ThemeRegistry();
    themeFactory = new SegregatedThemeFactory();

    // Create a mock theme using the factory
    const themeData = createMockThemeData();
    const themeProperties = createMockThemeProperties();
    const createResult = themeFactory.createTheme(themeData, themeProperties);
    
    if (!createResult.success) {
      console.error('Theme creation failed:', createResult.error);
      throw new Error(`Failed to create mock theme: ${createResult.error}`);
    }
    
    mockTheme = createResult.data!;
  });

  describe('constructor', () => {
    it('should initialize with empty theme storage', () => {
      expect(themeRegistry).toBeDefined();
    });
  });

  describe('registerTheme', () => {
    it('should register a theme successfully', () => {
      const result = themeRegistry.registerTheme(mockTheme);
      
      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();
    });

    it('should reject duplicate theme ID', () => {
      // Register the theme first
      themeRegistry.registerTheme(mockTheme);
      
      // Try to register again
      const result = themeRegistry.registerTheme(mockTheme);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('already registered');
    });

    it('should reject duplicate theme name', () => {
      // Register the theme first
      themeRegistry.registerTheme(mockTheme);
      
      // Create another theme with same name but different ID
      const themeData2 = createMockThemeData('test-theme-2');
      themeData2.name = mockTheme.name; // Use the same name
      const themeProperties2 = createMockThemeProperties();
      const createResult2 = themeFactory.createTheme(themeData2, themeProperties2);
      const theme2 = createResult2.data!;
      
      const result = themeRegistry.registerTheme(theme2);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('already used by theme');
    });

    it('should handle registration errors gracefully', () => {
      const result = themeRegistry.registerTheme(null as any);
      
      expect(result.success).toBe(false);
      expect(result.error).toContain('Theme is required');
    });
  });

  describe('unregisterTheme', () => {
    it('should unregister theme successfully', () => {
      // Register theme first
      themeRegistry.registerTheme(mockTheme);
      
      const result = themeRegistry.unregisterTheme(mockTheme.id);
      
      expect(result.success).toBe(true);
      expect(result.data).toBe(true);
    });

    it('should return false for non-existent theme', () => {
      const result = themeRegistry.unregisterTheme('non-existent');
      
      expect(result.success).toBe(true);
      expect(result.data).toBe(false);
    });

    it('should handle unregistration errors gracefully', () => {
      const result = themeRegistry.unregisterTheme(null as any);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('getTheme', () => {
    it('should retrieve theme by ID', () => {
      // Register theme first
      themeRegistry.registerTheme(mockTheme);
      
      const result = themeRegistry.getTheme(mockTheme.id);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.id).toBe(mockTheme.id);
    });

    it('should return undefined for non-existent theme', () => {
      const result = themeRegistry.getTheme('non-existent');
      
      expect(result.success).toBe(true);
      expect(result.data).toBeUndefined();
    });

    it('should handle retrieval errors gracefully', () => {
      const result = themeRegistry.getTheme(null as any);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('getThemeByName', () => {
    it('should retrieve theme by name', () => {
      // Register theme first
      themeRegistry.registerTheme(mockTheme);
      
      const result = themeRegistry.getThemeByName(mockTheme.name);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.name).toBe(mockTheme.name);
    });

    it('should return undefined for non-existent theme name', () => {
      const result = themeRegistry.getThemeByName('non-existent');
      
      expect(result.success).toBe(true);
      expect(result.data).toBeUndefined();
    });

    it('should handle retrieval errors gracefully', () => {
      const result = themeRegistry.getThemeByName(null as any);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('getThemes', () => {
    it('should retrieve all themes without filter', () => {
      // Register multiple themes
      const theme1 = mockTheme;
      const themeData2 = createMockThemeData('test-theme-2');
      const themeProperties2 = createMockThemeProperties();
      const createResult2 = themeFactory.createTheme(themeData2, themeProperties2);
      const theme2 = createResult2.data!;
      
      const themeData3 = createMockThemeData('test-theme-3');
      const themeProperties3 = createMockThemeProperties();
      const createResult3 = themeFactory.createTheme(themeData3, themeProperties3);
      const theme3 = createResult3.data!;
      
      themeRegistry.registerTheme(theme1);
      themeRegistry.registerTheme(theme2);
      themeRegistry.registerTheme(theme3);
      
      const result = themeRegistry.getThemes();
      
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(3);
    });

    it('should filter themes by function', () => {
      // Register multiple themes
      const theme1 = mockTheme;
      const themeData2 = createMockThemeData('test-theme-2');
      const themeProperties2 = createMockThemeProperties();
      const createResult2 = themeFactory.createTheme(themeData2, themeProperties2);
      const theme2 = createResult2.data!;
      
      themeRegistry.registerTheme(theme1);
      themeRegistry.registerTheme(theme2);
      
      const result = themeRegistry.getThemes(theme => theme.id.includes('test-theme-1'));
      
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(1);
    });

    it('should handle retrieval errors gracefully', () => {
      const result = themeRegistry.getThemes(null as any);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('getThemesByType', () => {
    it('should retrieve themes by type', () => {
      // Register multiple themes
      const theme1 = mockTheme;
      const themeData2 = createMockThemeData('test-theme-2');
      const themeProperties2 = createMockThemeProperties();
      const createResult2 = themeFactory.createTheme(themeData2, themeProperties2);
      const theme2 = createResult2.data!;
      
      themeRegistry.registerTheme(theme1);
      themeRegistry.registerTheme(theme2);
      
      const result = themeRegistry.getThemesByType(ExtendedThemeType.MATERIAL);
      
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data?.every(theme => theme.type === ExtendedThemeType.MATERIAL)).toBe(true);
    });

    it('should handle retrieval errors gracefully', () => {
      const result = themeRegistry.getThemesByType(null as any);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('getThemesByVariant', () => {
    it('should retrieve themes by variant', () => {
      // Register multiple themes
      const theme1 = mockTheme;
      const themeData2 = createMockThemeData('test-theme-2');
      const themeProperties2 = createMockThemeProperties();
      const createResult2 = themeFactory.createTheme(themeData2, themeProperties2);
      const theme2 = createResult2.data!;
      
      themeRegistry.registerTheme(theme1);
      themeRegistry.registerTheme(theme2);
      
      const result = themeRegistry.getThemesByVariant(ThemeVariant.DEFAULT);
      
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data?.every(theme => theme.variant === ThemeVariant.DEFAULT)).toBe(true);
    });

    it('should handle retrieval errors gracefully', () => {
      const result = themeRegistry.getThemesByVariant(null as any);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('integration', () => {
    it('should maintain consistency across operations', () => {
      // Register theme
      const registerResult = themeRegistry.registerTheme(mockTheme);
      expect(registerResult.success).toBe(true);

      // Get by ID
      const getByIdResult = themeRegistry.getTheme(mockTheme.id);
      expect(getByIdResult.success).toBe(true);
      expect(getByIdResult.data?.id).toBe(mockTheme.id);

      // Get by name
      const getByNameResult = themeRegistry.getThemeByName(mockTheme.name);
      expect(getByNameResult.success).toBe(true);
      expect(getByNameResult.data?.name).toBe(mockTheme.name);

      // Get all themes
      const getAllResult = themeRegistry.getThemes();
      expect(getAllResult.success).toBe(true);
      expect(getAllResult.data).toHaveLength(1);

      // Unregister theme
      const unregisterResult = themeRegistry.unregisterTheme(mockTheme.id);
      expect(unregisterResult.success).toBe(true);
      expect(unregisterResult.data).toBe(true);

      // Verify theme is gone
      const getAfterUnregisterResult = themeRegistry.getTheme(mockTheme.id);
      expect(getAfterUnregisterResult.success).toBe(true);
      expect(getAfterUnregisterResult.data).toBeUndefined();
    });
  });
});