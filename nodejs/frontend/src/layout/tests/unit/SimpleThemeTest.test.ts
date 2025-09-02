import { SegregatedTheme } from '../../classes/SegregatedTheme';
import { ExtendedThemeType, ThemeVariant } from '../../enums/LayoutEnums';

describe('Simple Theme Test', () => {
  it('should create a basic theme', () => {
    const themeData = {
      id: 'test-theme',
      name: 'Test Theme',
      displayName: 'Test Theme Display',
      type: ExtendedThemeType.MATERIAL,
      variant: ThemeVariant.LIGHT,
      isActive: true,
      supportsDarkMode: true
    };

    const themeProperties = {
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
          md: 16,
          lg: 18,
          xl: 20,
          '2xl': 24,
          '3xl': 30,
          '4xl': 36
        },
        fontWeight: {
          light: 300,
          normal: 400,
          medium: 500,
          bold: 700
        },
        lineHeight: {
          tight: 1.2,
          normal: 1.5,
          relaxed: 1.8
        }
      },
      spacing: {
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
        md: 8,
        lg: 12,
        xl: 16,
        full: 9999
      },
      shadows: {
        none: 'none',
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1)'
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
          background: 'background-color',
          color: 'color',
          transform: 'transform'
        }
      },
      breakpoints: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        '2xl': 1400
      }
    };

    const theme = new SegregatedTheme(themeData, themeProperties);
    
    expect(theme.id).toBe('test-theme');
    expect(theme.name).toBe('Test Theme');
    expect(theme.type).toBe(ExtendedThemeType.MATERIAL);
    expect(theme.variant).toBe(ThemeVariant.LIGHT);
  });
});
