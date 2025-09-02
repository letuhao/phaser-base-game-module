import { ThemePropertyResolver } from '../../classes/ThemePropertyResolver';
import { SegregatedTheme } from '../../classes/SegregatedTheme';
import { SegregatedThemeFactory } from '../../classes/SegregatedThemeFactory';
import { ITheme, IThemeData, IThemeProperties } from '../../interfaces/IThemeSegregated';
import { BaseThemeType, ExtendedThemeType, ThemeVariant, BreakpointName } from '../../enums/LayoutEnums';

describe('ThemePropertyResolver', () => {
  let resolver: ThemePropertyResolver;
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
    resolver = new ThemePropertyResolver();
    
    // Create a mock theme with comprehensive properties
    const themeFactory = new SegregatedThemeFactory();
    const themeData = createMockThemeData();
    const themeProperties = createMockThemeProperties();
    const createResult = themeFactory.createTheme(themeData, themeProperties);
    mockTheme = createResult.data!;
  });

  describe('resolveColor', () => {
    it('should resolve color by path', () => {
      const result = resolver.resolveColor(mockTheme, 'primary.main');
      
      expect(result.success).toBe(true);
      expect(result.data).toBe('#1976d2');
    });

    it('should resolve nested color path', () => {
      const result = resolver.resolveColor(mockTheme, 'semantic.brand.primary');
      
      expect(result.success).toBe(true);
      expect(result.data).toBe('#1976d2');
    });

    it('should return error for invalid path', () => {
      const result = resolver.resolveColor(mockTheme, 'invalid.path');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle null theme gracefully', () => {
      const result = resolver.resolveColor(null as any, 'primary.main');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('resolveSpacing', () => {
    it('should resolve spacing value', () => {
      const result = resolver.resolveSpacing(mockTheme, 'md');
      
      expect(result.success).toBe(true);
      expect(result.data).toBe(16);
    });

    it('should return error for invalid key', () => {
      const result = resolver.resolveSpacing(mockTheme, 'invalid');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle null theme gracefully', () => {
      const result = resolver.resolveSpacing(null as any, 'md');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('resolveFontSize', () => {
    it('should resolve font size value', () => {
      const result = resolver.resolveFontSize(mockTheme, 'lg');
      
      expect(result.success).toBe(true);
      expect(result.data).toBe(18);
    });

    it('should return error for invalid key', () => {
      const result = resolver.resolveFontSize(mockTheme, 'invalid');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle null theme gracefully', () => {
      const result = resolver.resolveFontSize(null as any, 'lg');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('resolveBorderRadius', () => {
    it('should resolve border radius value', () => {
      const result = resolver.resolveBorderRadius(mockTheme, 'base');
      
      expect(result.success).toBe(true);
      expect(result.data).toBe(8);
    });

    it('should return error for invalid key', () => {
      const result = resolver.resolveBorderRadius(mockTheme, 'invalid');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle null theme gracefully', () => {
      const result = resolver.resolveBorderRadius(null as any, 'base');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('resolveShadow', () => {
    it('should resolve shadow value', () => {
      const result = resolver.resolveShadow(mockTheme, 'base');
      
      expect(result.success).toBe(true);
      expect(result.data).toBe('0 4px 6px rgba(0, 0, 0, 0.1)');
    });

    it('should return error for invalid key', () => {
      const result = resolver.resolveShadow(mockTheme, 'invalid');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle null theme gracefully', () => {
      const result = resolver.resolveShadow(null as any, 'base');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('resolveAnimationDuration', () => {
    it('should resolve animation duration value', () => {
      const result = resolver.resolveAnimationDuration(mockTheme, 'normal');
      
      expect(result.success).toBe(true);
      expect(result.data).toBe(300);
    });

    it('should return error for invalid key', () => {
      const result = resolver.resolveAnimationDuration(mockTheme, 'invalid');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle null theme gracefully', () => {
      const result = resolver.resolveAnimationDuration(null as any, 'normal');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('resolveThemeClass', () => {
    it('should resolve theme class', () => {
      const result = resolver.resolveThemeClass(mockTheme, 'button-primary');
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data?.name).toBe('button-primary');
    });

    it('should return undefined for non-existent theme class', () => {
      const result = resolver.resolveThemeClass(mockTheme, 'non-existent');
      
      expect(result.success).toBe(true);
      expect(result.data).toBeUndefined();
    });

    it('should handle null theme gracefully', () => {
      const result = resolver.resolveThemeClass(null as any, 'button-primary');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('supportsBreakpoint', () => {
    it('should return true for supported breakpoint', () => {
      const result = resolver.supportsBreakpoint(mockTheme, BreakpointName.MD);
      
      expect(result.success).toBe(true);
      expect(result.data).toBe(true);
    });

    it('should return false for unsupported breakpoint', () => {
      const result = resolver.supportsBreakpoint(mockTheme, 'invalid' as BreakpointName);
      
      expect(result.success).toBe(true);
      expect(result.data).toBe(false);
    });

    it('should handle null theme gracefully', () => {
      const result = resolver.supportsBreakpoint(null as any, BreakpointName.MD);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle malformed theme gracefully', () => {
      const malformedTheme = {
        id: 'malformed',
        name: 'Malformed',
        displayName: 'Malformed',
        type: ExtendedThemeType.MATERIAL,
        variant: ThemeVariant.LIGHT,
        isActive: true,
        supportsDarkMode: true,
        colors: {} as any,
        typography: {} as any,
        spacing: {} as any,
        borderRadius: {} as any,
        shadows: {} as any,
        animation: {} as any,
        breakpoints: {} as any
      } as ITheme;

      const result = resolver.resolveColor(malformedTheme, 'primary.main');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});