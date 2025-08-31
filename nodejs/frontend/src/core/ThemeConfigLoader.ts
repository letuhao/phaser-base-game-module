import { logger } from './Logger';

/**
 * Simplified theme configuration interface for internal use
 * This avoids the complexity of the full IThemeConfig interface
 */
export interface SimpleThemeConfig {
  // Theme identification
  themeName: string;

  // Theme class definitions for reusable styling
  themeClasses?: {
    [className: string]: {
      colors?: Partial<SimpleThemeConfig['colors']>;
      typography?: Partial<SimpleThemeConfig['typography']>;
      spacing?: Partial<SimpleThemeConfig['spacing']>;
      borderRadius?: Partial<SimpleThemeConfig['borderRadius']>;
      shadows?: Partial<SimpleThemeConfig['shadows']>;
      animation?: Partial<SimpleThemeConfig['animation']>;
      // CSS-like properties
      backgroundColor?: string;
      color?: string;
      borderColor?: string;
      fontFamily?: string;
      fontSize?: number;
      fontWeight?: number;
      padding?: number;
      margin?: number;
      boxShadow?: string;
      // Simple numeric properties
      borderRadiusValue?: number;
    };
  };
  colors: {
    primary: {
      main: string;
      light: string;
      dark: string;
      contrast: string;
    };
    secondary: {
      main: string;
      light: string;
      dark: string;
      contrast: string;
    };
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      overlay: string;
    };
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      inverse: string;
    };
    status: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
    ui: {
      border: string;
      shadow: string;
      highlight: string;
      disabled: string;
    };
  };
  typography: {
    fontFamily: {
      primary: string;
      secondary: string;
      monospace: string;
    };
    fontSize: {
      xs: number;
      sm: number;
      base: number;
      lg: number;
      xl: number;
      '2xl': number;
      '3xl': number;
    };
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };
  spacing: {
    base: number;
    scale: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      '2xl': number;
      '3xl': number;
    };
  };
  borderRadius: {
    none: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    full: number;
  };
  shadows: {
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  animation: {
    fast: number;
    normal: number;
    slow: number;
    verySlow: number;
  };
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  };
  getColor(path: string): string;
  getSpacing(size: keyof SimpleThemeConfig['spacing']['scale']): number;
  getFontSize(size: keyof SimpleThemeConfig['typography']['fontSize']): number;
  supportsDarkMode(): boolean;
  getOppositeTheme(): string | null;
}

/**
 * Theme configuration loader for scenes
 * Loads and manages theme configurations with integration to responsive systems
 */
export class ThemeConfigLoader {
  private static instance: ThemeConfigLoader;
  private loadedConfigs: Map<string, SimpleThemeConfig> = new Map();
  private activeTheme: string | null = null;

  // Default theme configurations
  private static readonly DEFAULT_THEMES: Record<string, SimpleThemeConfig> = {
    light: {
      themeName: 'light',
      colors: {
        primary: {
          main: '#3b82f6',
          light: '#60a5fa',
          dark: '#2563eb',
          contrast: '#ffffff',
        },
        secondary: {
          main: '#10b981',
          light: '#34d399',
          dark: '#059669',
          contrast: '#ffffff',
        },
        background: {
          primary: '#ffffff',
          secondary: '#f8fafc',
          tertiary: '#f1f5f9',
          overlay: 'rgba(0, 0, 0, 0.5)',
        },
        text: {
          primary: '#1e293b',
          secondary: '#64748b',
          disabled: '#94a3b8',
          inverse: '#ffffff',
        },
        status: {
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3b82f6',
        },
        ui: {
          border: '#e2e8f0',
          shadow: 'rgba(0, 0, 0, 0.1)',
          highlight: '#fbbf24',
          disabled: '#cbd5e1',
        },
      },
      typography: {
        fontFamily: {
          primary: 'Inter, system-ui, sans-serif',
          secondary: 'Georgia, serif',
          monospace: 'JetBrains Mono, monospace',
        },
        fontSize: {
          xs: 12,
          sm: 14,
          base: 16,
          lg: 18,
          xl: 20,
          '2xl': 24,
          '3xl': 30,
        },
        fontWeight: {
          light: 300,
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
        lineHeight: {
          tight: 1.25,
          normal: 1.5,
          relaxed: 1.75,
        },
      },
      spacing: {
        base: 4,
        scale: {
          xs: 4,
          sm: 8,
          md: 16,
          lg: 24,
          xl: 32,
          '2xl': 48,
          '3xl': 64,
        },
      },
      borderRadius: {
        none: 0,
        sm: 2,
        base: 4,
        lg: 8,
        xl: 12,
        full: 9999,
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        fast: 150,
        normal: 300,
        slow: 500,
        verySlow: 1000,
      },
      breakpoints: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        '2xl': 1400,
      },
      getColor(path: string): string {
        const keys = path.split('.');
        let current: any = this.colors;

        for (const key of keys) {
          if (current && typeof current === 'object' && key in current) {
            current = current[key];
          } else {
            return '#000000'; // Fallback color
          }
        }

        return typeof current === 'string' ? current : '#000000';
      },
      getSpacing(size: keyof SimpleThemeConfig['spacing']['scale']): number {
        return this.spacing.scale[size] || this.spacing.base;
      },
      getFontSize(size: keyof SimpleThemeConfig['typography']['fontSize']): number {
        return this.typography.fontSize[size] || this.typography.fontSize.base;
      },
      supportsDarkMode(): boolean {
        return true;
      },
      getOppositeTheme(): string | null {
        return 'dark';
      },

      // Theme class definitions for reusable styling
      themeClasses: {
        '.header-primary': {
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 20,
          fontWeight: 600,
          padding: 16,
          borderRadiusValue: 8,
        },
        '.button-secondary': {
          backgroundColor: '#10b981',
          color: '#ffffff',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 16,
          fontWeight: 500,
          padding: 12,
          borderRadiusValue: 6,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.card-default': {
          backgroundColor: '#ffffff',
          color: '#1e293b',
          borderColor: '#e2e8f0',
          borderRadiusValue: 12,
          padding: 24,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        },
      },
    },
    dark: {
      themeName: 'dark',
      colors: {
        primary: {
          main: '#60a5fa',
          light: '#93c5fd',
          dark: '#3b82f6',
          contrast: '#000000',
        },
        secondary: {
          main: '#34d399',
          light: '#6ee7b7',
          dark: '#10b981',
          contrast: '#000000',
        },
        background: {
          primary: '#0f172a',
          secondary: '#1e293b',
          tertiary: '#334155',
          overlay: 'rgba(255, 255, 255, 0.1)',
        },
        text: {
          primary: '#f8fafc',
          secondary: '#cbd5e1',
          disabled: '#64748b',
          inverse: '#0f172a',
        },
        status: {
          success: '#34d399',
          warning: '#fbbf24',
          error: '#f87171',
          info: '#60a5fa',
        },
        ui: {
          border: '#475569',
          shadow: 'rgba(255, 255, 255, 0.1)',
          highlight: '#fbbf24',
          disabled: '#475569',
        },
      },
      typography: {
        fontFamily: {
          primary: 'Inter, system-ui, sans-serif',
          secondary: 'Georgia, serif',
          monospace: 'JetBrains Mono, monospace',
        },
        fontSize: {
          xs: 12,
          sm: 14,
          base: 16,
          lg: 18,
          xl: 20,
          '2xl': 24,
          '3xl': 30,
        },
        fontWeight: {
          light: 300,
          normal: 400,
          medium: 500,
          semibold: 600,
          bold: 700,
        },
        lineHeight: {
          tight: 1.25,
          normal: 1.5,
          relaxed: 1.75,
        },
      },
      spacing: {
        base: 4,
        scale: {
          xs: 4,
          sm: 8,
          md: 16,
          lg: 24,
          xl: 32,
          '2xl': 48,
          '3xl': 64,
        },
      },
      borderRadius: {
        none: 0,
        sm: 2,
        base: 4,
        lg: 8,
        xl: 12,
        full: 9999,
      },
      shadows: {
        sm: '0 1px 2px 0 rgba(255, 255, 255, 0.05)',
        base: '0 1px 3px 0 rgba(255, 255, 255, 0.1), 0 1px 2px 0 rgba(255, 255, 255, 0.06)',
        md: '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)',
        lg: '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
        xl: '0 20px 25px -5px rgba(255, 255, 255, 0.1), 0 10px 10px -5px rgba(255, 255, 255, 0.04)',
        '2xl': '0 25px 50px -12px rgba(255, 255, 255, 0.25)',
      },
      animation: {
        fast: 150,
        normal: 300,
        slow: 500,
        verySlow: 1000,
      },
      breakpoints: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        '2xl': 1400,
      },
      getColor(path: string): string {
        const keys = path.split('.');
        let current: any = this.colors;

        for (const key of keys) {
          if (current && typeof current === 'object' && key in current) {
            current = current[key];
          } else {
            return '#ffffff'; // Fallback color
          }
        }

        return typeof current === 'string' ? current : '#ffffff';
      },
      getSpacing(size: keyof SimpleThemeConfig['spacing']['scale']): number {
        return this.spacing.scale[size] || this.spacing.base;
      },
      getFontSize(size: keyof SimpleThemeConfig['typography']['fontSize']): number {
        return this.typography.fontSize[size] || this.typography.fontSize.base;
      },
      supportsDarkMode(): boolean {
        return true;
      },
      getOppositeTheme(): string | null {
        return 'light';
      },
    },
  };

  private constructor() {
    // Initialize with default themes
    Object.entries(ThemeConfigLoader.DEFAULT_THEMES).forEach(([name, config]) => {
      this.loadedConfigs.set(name, config);
    });

    // Set default active theme
    this.activeTheme = 'light';

    logger.info(
      'ThemeConfigLoader',
      'getOppositeTheme',
      'getOppositeTheme',
      'ThemeConfigLoader initialized with default themes'
    );
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): ThemeConfigLoader {
    if (!ThemeConfigLoader.instance) {
      ThemeConfigLoader.instance = new ThemeConfigLoader();
    }
    return ThemeConfigLoader.instance;
  }

  /**
   * Register a theme configuration
   */
  public registerTheme(themeName: string, config: SimpleThemeConfig): void {
    this.loadedConfigs.set(themeName, config);
    logger.info(
      'ThemeConfigLoader',
      'registerTheme',
      'registerTheme',
      'Registered theme: ${themeName}'
    );
  }

  /**
   * Load a theme configuration by name
   */
  public loadTheme(themeName: string): SimpleThemeConfig | null {
    const config = this.loadedConfigs.get(themeName);

    if (!config) {
      logger.warn('ThemeConfigLoader', 'loadTheme', 'loadTheme', 'Theme not found: ${themeName}');
      return null;
    }

    logger.info('ThemeConfigLoader', 'loadTheme', 'loadTheme', 'Loaded theme: ${themeName}');
    return config;
  }

  /**
   * Set the active theme
   */
  public setActiveTheme(themeName: string): boolean {
    if (!this.loadedConfigs.has(themeName)) {
      logger.warn(
        'ThemeConfigLoader',
        'setActiveTheme',
        'setActiveTheme',
        'Cannot set active theme - theme not found: ${themeName}'
      );
      return false;
    }

    this.activeTheme = themeName;
    logger.info(
      'ThemeConfigLoader',
      'setActiveTheme',
      'setActiveTheme',
      'Active theme set to: ${themeName}'
    );
    return true;
  }

  /**
   * Get the currently active theme
   */
  public getActiveTheme(): SimpleThemeConfig | null {
    if (!this.activeTheme) return null;
    return this.loadedConfigs.get(this.activeTheme) || null;
  }

  /**
   * Get the name of the currently active theme
   */
  public getActiveThemeName(): string | null {
    return this.activeTheme;
  }

  /**
   * Get all available theme names
   */
  public getAvailableThemes(): string[] {
    return Array.from(this.loadedConfigs.keys());
  }

  /**
   * Check if a theme exists
   */
  public hasTheme(themeName: string): boolean {
    return this.loadedConfigs.has(themeName);
  }

  /**
   * Switch to the opposite theme (if supported)
   */
  public toggleTheme(): boolean {
    const currentTheme = this.getActiveTheme();
    if (!currentTheme) return false;

    const oppositeTheme = currentTheme.getOppositeTheme();
    if (!oppositeTheme || !this.hasTheme(oppositeTheme)) return false;

    return this.setActiveTheme(oppositeTheme);
  }

  /**
   * Get a color value from the active theme
   */
  public getColor(path: string): string {
    const activeTheme = this.getActiveTheme();
    if (!activeTheme) return '#000000';

    return activeTheme.getColor(path);
  }

  /**
   * Get a spacing value from the active theme
   */
  public getSpacing(size: keyof SimpleThemeConfig['spacing']['scale']): number {
    const activeTheme = this.getActiveTheme();
    if (!activeTheme) return 4;

    return activeTheme.getSpacing(size);
  }

  /**
   * Get a font size value from the active theme
   */
  public getFontSize(size: keyof SimpleThemeConfig['typography']['fontSize']): number {
    const activeTheme = this.getActiveTheme();
    if (!activeTheme) return 16;

    return activeTheme.getFontSize(size);
  }

  /**
   * Get theme information for debugging
   */
  public getThemeInfo(): {
    activeTheme: string | null;
    availableThemes: string[];
    totalThemes: number;
    supportsDarkMode: boolean;
  } {
    const activeTheme = this.getActiveTheme();

    return {
      activeTheme: this.activeTheme,
      availableThemes: this.getAvailableThemes(),
      totalThemes: this.loadedConfigs.size,
      supportsDarkMode: activeTheme?.supportsDarkMode() || false,
    };
  }

  /**
   * Validate theme configuration structure
   */
  public static validateThemeConfig(config: SimpleThemeConfig): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check required properties
    if (!config.themeName) {
      errors.push('Missing themeName property');
    }

    if (!config.colors) {
      errors.push('Missing colors property');
    }

    if (!config.typography) {
      errors.push('Missing typography property');
    }

    if (!config.spacing) {
      errors.push('Missing spacing property');
    }

    // Check color structure
    if (config.colors) {
      const requiredColorSections = ['primary', 'secondary', 'background', 'text', 'status', 'ui'];
      requiredColorSections.forEach(section => {
        if (!config.colors[section as keyof typeof config.colors]) {
          errors.push(`Missing colors.${section} section`);
        }
      });
    }

    // Check typography structure
    if (config.typography) {
      const requiredTypographySections = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight'];
      requiredTypographySections.forEach(section => {
        if (!config.typography[section as keyof typeof config.typography]) {
          errors.push(`Missing typography.${section} section`);
        }
      });
    }

    // Check spacing structure
    if (config.spacing) {
      if (!config.spacing.base) {
        warnings.push('Missing spacing.base value');
      }
      if (!config.spacing.scale) {
        warnings.push('Missing spacing.scale object');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }
}

export default ThemeConfigLoader;
