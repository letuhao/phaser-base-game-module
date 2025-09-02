import { SegregatedTheme } from '../../classes/SegregatedTheme';
import { ITheme, IThemeData, IThemeProperties } from '../../interfaces/IThemeSegregated';
import { BaseThemeType, ExtendedThemeType, ThemeVariant, BreakpointName } from '../../enums/LayoutEnums';

describe('SegregatedTheme', () => {
  let themeData: IThemeData;
  let themeProperties: IThemeProperties;
  let theme: SegregatedTheme;

  // Helper function to create complete mock theme data
  const createMockThemeData = (): IThemeData => ({
    id: 'test-theme-1',
    name: 'Test Theme',
    displayName: 'Test Theme Display',
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
    themeData = createMockThemeData();
    themeProperties = createMockThemeProperties();
    theme = new SegregatedTheme(themeData, themeProperties);
  });

  describe('constructor', () => {
    it('should create theme with valid data and properties', () => {
      expect(theme).toBeInstanceOf(SegregatedTheme);
      expect(theme.id).toBe(themeData.id);
      expect(theme.name).toBe(themeData.name);
      expect(theme.type).toBe(themeData.type);
      expect(theme.variant).toBe(themeData.variant);
    });
  });

  describe('property getters', () => {
    it('should return correct theme data properties', () => {
      expect(theme.id).toBe('test-theme-1');
      expect(theme.name).toBe('Test Theme');
      expect(theme.displayName).toBe('Test Theme Display');
      expect(theme.type).toBe(ExtendedThemeType.MATERIAL);
      expect(theme.variant).toBe(ThemeVariant.DEFAULT);
      expect(theme.isActive).toBe(true);
      expect(theme.supportsDarkMode).toBe(true);
    });

    it('should return correct theme properties', () => {
      expect(theme.colors).toBeDefined();
      expect(theme.typography).toBeDefined();
      expect(theme.spacing).toBeDefined();
      expect(theme.borderRadius).toBeDefined();
      expect(theme.shadows).toBeDefined();
      expect(theme.animation).toBeDefined();
      expect(theme.breakpoints).toBeDefined();
    });
  });

  describe('getColor', () => {
    it('should return color value for valid path', () => {
      const result = theme.getColor('primary.main');
      expect(result.success).toBe(true);
      expect(result.data).toBe('#1976d2');
    });

    it('should return error for invalid path', () => {
      const result = theme.getColor('invalid.path');
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('getSpacing', () => {
    it('should return spacing value for valid key', () => {
      const result = theme.getSpacing('md');
      expect(result.success).toBe(true);
      expect(result.data).toBe(16);
    });

    it('should return error for invalid key', () => {
      const result = theme.getSpacing('invalid');
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('getFontSize', () => {
    it('should return font size for valid key', () => {
      const result = theme.getFontSize('lg');
      expect(result.success).toBe(true);
      expect(result.data).toBe(18);
    });

    it('should return error for invalid key', () => {
      const result = theme.getFontSize('invalid');
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('getBorderRadius', () => {
    it('should return border radius for valid key', () => {
      const result = theme.getBorderRadius('base');
      expect(result.success).toBe(true);
      expect(result.data).toBe(8);
    });

    it('should return error for invalid key', () => {
      const result = theme.getBorderRadius('invalid');
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('getShadow', () => {
    it('should return shadow for valid key', () => {
      const result = theme.getShadow('base');
      expect(result.success).toBe(true);
      expect(result.data).toBe('0 4px 6px rgba(0, 0, 0, 0.1)');
    });

    it('should return error for invalid key', () => {
      const result = theme.getShadow('invalid');
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('getAnimationDuration', () => {
    it('should return animation duration for valid key', () => {
      const result = theme.getAnimationDuration('normal');
      expect(result.success).toBe(true);
      expect(result.data).toBe(300);
    });

    it('should return error for invalid key', () => {
      const result = theme.getAnimationDuration('invalid');
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('supportsBreakpoint', () => {
    it('should return true for supported breakpoint', () => {
      const result = theme.supportsBreakpoint(BreakpointName.MD);
      expect(result.success).toBe(true);
      expect(result.data).toBe(true);
    });

    it('should return false for unsupported breakpoint', () => {
      const result = theme.supportsBreakpoint('invalid' as BreakpointName);
      expect(result.success).toBe(true);
      expect(result.data).toBe(false);
    });
  });

  describe('getOppositeTheme', () => {
    it('should return opposite theme ID', () => {
      const result = theme.getOppositeTheme();
      expect(result.success).toBe(true);
      expect(result.data).toBe('test-theme-dark');
    });
  });

  describe('clone', () => {
    it('should create a clone of the theme', () => {
      const result = theme.clone();
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      const cloned = result.data!;
      expect(cloned).toBeInstanceOf(SegregatedTheme);
      expect(cloned.id).toBe(theme.id);
      expect(cloned.name).toBe(theme.name);
      expect(cloned).not.toBe(theme); // Different instance
    });
  });

  describe('merge', () => {
    it('should merge partial theme data', () => {
      const partialData = {
        name: 'Updated Theme Name',
        colors: {
          primary: {
            main: '#ff0000'
          }
        }
      };

      const result = theme.merge(partialData);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      const merged = result.data!;
      expect(merged.name).toBe('Updated Theme Name');
      expect(merged.colors.primary.main).toBe('#ff0000');
      expect(merged.colors.secondary).toEqual(theme.colors.secondary); // Should remain unchanged
    });

    it('should handle empty merge object', () => {
      const result = theme.merge({});
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data).toEqual(theme);
    });

    it('should handle null merge object', () => {
      const result = theme.merge(null as any);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data).toEqual(theme);
    });

    it('should merge nested properties correctly', () => {
      const partialData = {
        colors: {
          primary: {
            main: '#ff0000'
          }
        },
        typography: {
          fontSize: {
            xs: 10
          }
        }
      };

      const result = theme.merge(partialData);
      expect(result.success).toBe(true);
      
      const merged = result.data!;
      expect(merged.colors.primary.main).toBe('#ff0000');
      expect(merged.colors.primary.light).toBe('#42a5f5'); // Should remain unchanged
      expect(merged.typography.fontSize.xs).toBe(10);
      expect(merged.typography.fontSize.sm).toBe(14); // Should remain unchanged
    });
  });

  describe('interface compliance', () => {
    it('should implement IThemeData interface', () => {
      expect(theme.id).toBeDefined();
      expect(theme.name).toBeDefined();
      expect(theme.displayName).toBeDefined();
      expect(theme.type).toBeDefined();
      expect(theme.variant).toBeDefined();
      expect(theme.isActive).toBeDefined();
      expect(theme.supportsDarkMode).toBeDefined();
    });

    it('should implement IThemeProperties interface', () => {
      expect(theme.colors).toBeDefined();
      expect(theme.typography).toBeDefined();
      expect(theme.spacing).toBeDefined();
      expect(theme.borderRadius).toBeDefined();
      expect(theme.shadows).toBeDefined();
      expect(theme.animation).toBeDefined();
      expect(theme.breakpoints).toBeDefined();
    });

    it('should implement IThemeOperations interface', () => {
      expect(typeof theme.getColor).toBe('function');
      expect(typeof theme.getSpacing).toBe('function');
      expect(typeof theme.getFontSize).toBe('function');
      expect(typeof theme.getBorderRadius).toBe('function');
      expect(typeof theme.getShadow).toBe('function');
      expect(typeof theme.getAnimationDuration).toBe('function');
      expect(typeof theme.supportsBreakpoint).toBe('function');
      expect(typeof theme.getOppositeTheme).toBe('function');
      expect(typeof theme.clone).toBe('function');
      expect(typeof theme.merge).toBe('function');
    });
  });

  describe('error handling', () => {
    it('should handle malformed theme data gracefully', () => {
      const malformedData = {
        id: 'malformed-theme',
        name: 'Malformed Theme',
        displayName: 'Malformed Theme Display',
        type: ExtendedThemeType.MATERIAL,
        variant: ThemeVariant.LIGHT,
        isActive: true,
        supportsDarkMode: true
      };

      const malformedProperties = {
        colors: {} as any, // Empty colors object
        typography: {} as any,
        spacing: {} as any,
        borderRadius: {} as any,
        shadows: {} as any,
        animation: {} as any,
        breakpoints: {} as any
      };

      const malformedTheme = new SegregatedTheme(malformedData, malformedProperties);

      const result = malformedTheme.getColor('primary.main');
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});