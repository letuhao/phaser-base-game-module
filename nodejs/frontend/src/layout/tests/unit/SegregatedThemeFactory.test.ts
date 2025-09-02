import { SegregatedThemeFactory } from '../../classes/SegregatedThemeFactory';
import { SegregatedTheme } from '../../classes/SegregatedTheme';
import { ITheme, IThemeData, IThemeProperties } from '../../interfaces/IThemeSegregated';
import { BaseThemeType, ExtendedThemeType, ThemeVariant, BreakpointName } from '../../enums/LayoutEnums';

describe('SegregatedThemeFactory', () => {
  let factory: SegregatedThemeFactory;

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
    factory = new SegregatedThemeFactory();
  });

  describe('createTheme', () => {
    it('should create theme from valid data and properties', () => {
      const themeData = createMockThemeData();
      const themeProperties = createMockThemeProperties();
      
      const result = factory.createTheme(themeData, themeProperties);
      
      if (!result.success) {
        console.log('Factory createTheme failed:', result.error);
      }
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data).toBeInstanceOf(SegregatedTheme);
      expect(result.data?.id).toBe(themeData.id);
    });

    it('should handle invalid data gracefully', () => {
      const result = factory.createTheme(null as any, null as any);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('createFromLegacyTheme', () => {
    it('should create theme from legacy theme object', () => {
      const legacyTheme = {
        id: 'legacy-theme',
        name: 'Legacy Theme',
        type: 'material',
        variant: 'light',
        colors: {
          primary: '#1976d2',
          secondary: '#dc004e'
        }
      };
      
      const result = factory.createFromLegacyTheme(legacyTheme);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data).toBeInstanceOf(SegregatedTheme);
    });

    it('should handle invalid legacy theme gracefully', () => {
      const result = factory.createFromLegacyTheme(null as any);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('createDefaultTheme', () => {
    it('should create default theme with provided data', () => {
      const themeData = createMockThemeData();
      
      const result = factory.createDefaultTheme(themeData);
      
      if (!result.success) {
        console.error('ERROR: createDefaultTheme failed with:', result.error);
        throw new Error(`Factory failed to create theme: ${result.error}`);
      }
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data).toBeInstanceOf(SegregatedTheme);
      expect(result.data?.id).toBe(themeData.id);
    });

    it('should create theme with default properties', () => {
      const themeData = createMockThemeData();
      
      const result = factory.createDefaultTheme(themeData);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      const theme = result.data!;
      expect(theme.colors).toBeDefined();
      expect(theme.typography).toBeDefined();
      expect(theme.spacing).toBeDefined();
    });

    it('should handle invalid data gracefully', () => {
      const result = factory.createDefaultTheme(null as any);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('createFromConfig', () => {
    it('should create theme from configuration object', () => {
      const config = {
        id: 'config-theme',
        name: 'Config Theme',
        displayName: 'Config Theme Display',
        type: ExtendedThemeType.MATERIAL,
        variant: ThemeVariant.LIGHT,
        isActive: true,
        supportsDarkMode: true,
        colors: {
          primary: {
            main: '#ff0000'
          }
        }
      };
      
      const result = factory.createFromConfig(config);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data).toBeInstanceOf(SegregatedTheme);
      expect(result.data?.id).toBe(config.id);
      expect(result.data?.name).toBe(config.name);
    });

    it('should merge config with default properties', () => {
      const config = {
        id: 'config-theme',
        name: 'Config Theme',
        displayName: 'Config Theme Display',
        type: ExtendedThemeType.MATERIAL,
        variant: ThemeVariant.LIGHT,
        isActive: true,
        supportsDarkMode: true,
        colors: {
          primary: {
            main: '#ff0000'
          }
        }
      };
      
      const result = factory.createFromConfig(config);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      const theme = result.data!;
      expect(theme.colors.primary.main).toBe('#ff0000');
      expect(theme.colors.secondary).toBeDefined(); // Should have default secondary colors
      expect(theme.typography).toBeDefined(); // Should have default typography
    });

    it('should handle config with missing required fields', () => {
      const config = {
        id: 'incomplete-theme'
        // Missing required fields
      };
      
      const result = factory.createFromConfig(config);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle invalid config gracefully', () => {
      const result = factory.createFromConfig(null as any);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('default property creation', () => {
    it('should create valid default colors', () => {
      const defaultColors = factory['createDefaultColors']();
      
      expect(defaultColors).toBeDefined();
      expect(defaultColors.primary).toBeDefined();
      expect(defaultColors.secondary).toBeDefined();
      expect(defaultColors.background).toBeDefined();
      expect(defaultColors.text).toBeDefined();
    });

    it('should create valid default typography', () => {
      const defaultTypography = factory['createDefaultTypography']();
      
      expect(defaultTypography).toBeDefined();
      expect(defaultTypography.fontFamily).toBeDefined();
      expect(defaultTypography.fontSize).toBeDefined();
      expect(defaultTypography.fontWeight).toBeDefined();
    });

    it('should create valid default spacing', () => {
      const defaultSpacing = factory['createDefaultSpacing']();
      
      expect(defaultSpacing).toBeDefined();
      expect(defaultSpacing.base).toBeDefined();
      expect(defaultSpacing.scale).toBeDefined();
      expect(defaultSpacing.scale.xs).toBeDefined();
      expect(defaultSpacing.scale.sm).toBeDefined();
      expect(defaultSpacing.scale.md).toBeDefined();
    });

    it('should create valid default border radius', () => {
      const defaultBorderRadius = factory['createDefaultBorderRadius']();
      
      expect(defaultBorderRadius).toBeDefined();
      expect(defaultBorderRadius.none).toBeDefined();
      expect(defaultBorderRadius.sm).toBeDefined();
      expect(defaultBorderRadius.base).toBeDefined();
      expect(defaultBorderRadius.lg).toBeDefined();
    });

    it('should create valid default shadows', () => {
      const defaultShadows = factory['createDefaultShadows']();
      
      expect(defaultShadows).toBeDefined();
      expect(defaultShadows.sm).toBeDefined();
      expect(defaultShadows.base).toBeDefined();
      expect(defaultShadows.md).toBeDefined();
      expect(defaultShadows.lg).toBeDefined();
    });

    it('should create valid default animation', () => {
      const defaultAnimation = factory['createDefaultAnimation']();
      
      expect(defaultAnimation).toBeDefined();
      expect(defaultAnimation.duration).toBeDefined();
      expect(defaultAnimation.easing).toBeDefined();
      expect(defaultAnimation.properties).toBeDefined();
      expect(defaultAnimation.properties.opacity).toBeDefined();
    });

    it('should create valid default breakpoints', () => {
      const defaultBreakpoints = factory['createDefaultBreakpoints']();
      
      expect(defaultBreakpoints).toBeDefined();
      expect(defaultBreakpoints.xs).toBeDefined();
      expect(defaultBreakpoints.sm).toBeDefined();
      expect(defaultBreakpoints.md).toBeDefined();
    });
  });

  describe('integration', () => {
    it('should create theme that works with all operations', () => {
      const themeData = createMockThemeData();
      
      const result = factory.createDefaultTheme(themeData);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      const theme = result.data!;
      
      // Test theme operations
      const colorResult = theme.getColor('primary.main');
      expect(colorResult.success).toBe(true);
      
      const spacingResult = theme.getSpacing('md');
      expect(spacingResult.success).toBe(true);
      
      const fontSizeResult = theme.getFontSize('lg');
      expect(fontSizeResult.success).toBe(true);
      
      const borderRadiusResult = theme.getBorderRadius('md');
      expect(borderRadiusResult.success).toBe(true);
      
      const shadowResult = theme.getShadow('md');
      expect(shadowResult.success).toBe(true);
      
      const animationResult = theme.getAnimationDuration('normal');
      expect(animationResult.success).toBe(true);
      
      const breakpointResult = theme.supportsBreakpoint(BreakpointName.MD);
      expect(breakpointResult.success).toBe(true);
    });
  });
});