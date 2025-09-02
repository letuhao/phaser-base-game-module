import { SegregatedTheme } from './SegregatedTheme';
import { 
  ITheme, 
  IThemeData, 
  IThemeProperties, 
  IThemeResult 
} from '../interfaces/IThemeSegregated';
import { 
  IThemeColors,
  IThemeTypography,
  IThemeSpacing,
  IThemeBorderRadius,
  IThemeShadows,
  IThemeAnimation,
  IThemeBreakpoints,
  IThemeClass,
  IThemeMetadata,
} from '../interfaces/ITheme';
import { BaseThemeType, ThemeVariant } from '../enums/LayoutEnums';
import { Logger } from '../../core/Logger';

/**
 * Segregated Theme Factory
 * 
 * Factory class for creating segregated themes with proper validation and defaults.
 */
export class SegregatedThemeFactory {
  private readonly logger: Logger = Logger.getInstance();

  /**
   * Create a new segregated theme
   */
  createTheme(
    data: IThemeData,
    properties: IThemeProperties
  ): IThemeResult<ITheme> {
    try {
      this.logger.info('SegregatedThemeFactory', 'createTheme', 'Creating new segregated theme', {
        themeId: data?.id || 'unknown',
        themeName: data.name,
        themeType: data.type,
        themeVariant: data.variant,
      });

      // Validate theme data
      const dataValidation = this.validateThemeData(data);
      if (!dataValidation.success) {
        this.logger.error('SegregatedThemeFactory', 'createTheme', 'Theme data validation failed', {
          error: dataValidation.error,
          themeId: data?.id || 'unknown',
        });
        return {
          success: false,
          error: `Theme data validation failed: ${dataValidation.error}`,
        };
      }

      // Validate theme properties
      const propertiesValidation = this.validateThemeProperties(properties);
      if (!propertiesValidation.success) {
        this.logger.error('SegregatedThemeFactory', 'createTheme', 'Theme properties validation failed', {
          error: propertiesValidation.error,
          themeId: data?.id || 'unknown',
        });
        return {
          success: false,
          error: `Theme properties validation failed: ${propertiesValidation.error}`,
        };
      }

      // Create the theme
      const theme = new SegregatedTheme(data, properties);
      
      this.logger.info('SegregatedThemeFactory', 'createTheme', 'Segregated theme created successfully', {
        themeId: data?.id || 'unknown',
      });

      return { success: true, data: theme };
    } catch (error) {
      this.logger.error('SegregatedThemeFactory', 'createTheme', 'Error creating segregated theme', {
        error,
        themeId: data?.id || 'unknown',
      });
      return {
        success: false,
        error: `Error creating segregated theme: ${error}`,
      };
    }
  }

  /**
   * Create a theme from a legacy theme object
   */
  createFromLegacyTheme(legacyTheme: unknown): IThemeResult<ITheme> {
    try {
      this.logger.info('SegregatedThemeFactory', 'createFromLegacyTheme', 'Converting legacy theme to segregated theme');

      // Extract theme data
      const data = this.extractThemeData(legacyTheme);
      if (!data) {
        return {
          success: false,
          error: 'Failed to extract theme data from legacy theme',
        };
      }

      // Extract theme properties
      const properties = this.extractThemeProperties(legacyTheme);
      if (!properties) {
        return {
          success: false,
          error: 'Failed to extract theme properties from legacy theme',
        };
      }

      return this.createTheme(data, properties);
    } catch (error) {
      this.logger.error('SegregatedThemeFactory', 'createFromLegacyTheme', 'Error converting legacy theme', {
        error,
      });
      return {
        success: false,
        error: `Error converting legacy theme: ${error}`,
      };
    }
  }

  /**
   * Create a default theme
   */
  createDefaultTheme(
    data: IThemeData
  ): IThemeResult<ITheme> {
    try {
      this.logger.info('SegregatedThemeFactory', 'createDefaultTheme', 'Creating default theme', {
        themeId: data.id,
        themeName: data.name,
        themeType: data.type,
        themeVariant: data.variant,
      });

      const properties: IThemeProperties = {
        colors: this.createDefaultColors(),
        typography: this.createDefaultTypography(),
        spacing: this.createDefaultSpacing(),
        borderRadius: this.createDefaultBorderRadius(),
        shadows: this.createDefaultShadows(),
        animation: this.createDefaultAnimation(),
        breakpoints: this.createDefaultBreakpoints(),
        themeClasses: {},
        custom: {},
        metadata: {
          createdAt: new Date(),
          modifiedAt: new Date(),
          version: '1.0.0',
        },
      };

      return this.createTheme(data, properties);
    } catch (error) {
      this.logger.error('SegregatedThemeFactory', 'createDefaultTheme', 'Error creating default theme', {
        error,
        themeId: data?.id || 'unknown',
      });
      return {
        success: false,
        error: `Error creating default theme: ${error}`,
      };
    }
  }

  /**
   * Create a theme from configuration
   */
  createFromConfig(config: unknown): IThemeResult<ITheme> {
    try {
      this.logger.info('SegregatedThemeFactory', 'createFromConfig', 'Creating theme from configuration');

      if (!config || typeof config !== 'object') {
        return {
          success: false,
          error: 'Invalid configuration: must be an object',
        };
      }

      const configObj = config as Record<string, unknown>;

      // Extract theme data
      const data = this.extractThemeDataFromConfig(configObj);
      if (!data) {
        return {
          success: false,
          error: 'Failed to extract theme data from configuration',
        };
      }

      // Extract theme properties
      const properties = this.extractThemePropertiesFromConfig(configObj);
      if (!properties) {
        return {
          success: false,
          error: 'Failed to extract theme properties from configuration',
        };
      }

      return this.createTheme(data, properties);
    } catch (error) {
      this.logger.error('SegregatedThemeFactory', 'createFromConfig', 'Error creating theme from configuration', {
        error,
      });
      return {
        success: false,
        error: `Error creating theme from configuration: ${error}`,
      };
    }
  }

  // ============================================================================
  // PRIVATE HELPER METHODS
  // ============================================================================

  /**
   * Validate theme data
   */
  private validateThemeData(data: IThemeData): IThemeResult<void> {
    if (!data.id || typeof data.id !== 'string') {
      return {
        success: false,
        error: 'Theme ID is required and must be a string',
      };
    }

    if (!data.name || typeof data.name !== 'string') {
      return {
        success: false,
        error: 'Theme name is required and must be a string',
      };
    }

    if (!data.displayName || typeof data.displayName !== 'string') {
      return {
        success: false,
        error: 'Theme displayName is required and must be a string',
      };
    }

    if (!data.type || typeof data.type !== 'string') {
      return {
        success: false,
        error: 'Theme type is required and must be a string',
      };
    }

    if (!data.variant) {
      return {
        success: false,
        error: 'Theme variant is required',
      };
    }

    if (typeof data.isActive !== 'boolean') {
      return {
        success: false,
        error: 'Theme isActive must be a boolean',
      };
    }

    if (typeof data.supportsDarkMode !== 'boolean') {
      return {
        success: false,
        error: 'Theme supportsDarkMode must be a boolean',
      };
    }

    return { success: true };
  }

  /**
   * Validate theme properties
   */
  private validateThemeProperties(properties: IThemeProperties): IThemeResult<void> {
    if (!properties.colors) {
      return {
        success: false,
        error: 'Theme colors are required',
      };
    }

    if (!properties.typography) {
      return {
        success: false,
        error: 'Theme typography is required',
      };
    }

    if (!properties.spacing) {
      return {
        success: false,
        error: 'Theme spacing is required',
      };
    }

    if (!properties.borderRadius) {
      return {
        success: false,
        error: 'Theme borderRadius is required',
      };
    }

    if (!properties.shadows) {
      return {
        success: false,
        error: 'Theme shadows are required',
      };
    }

    if (!properties.animation) {
      return {
        success: false,
        error: 'Theme animation is required',
      };
    }

    if (!properties.breakpoints) {
      return {
        success: false,
        error: 'Theme breakpoints are required',
      };
    }

    return { success: true };
  }

  /**
   * Extract theme data from legacy theme
   */
  private extractThemeData(legacyTheme: unknown): IThemeData | null {
    if (!legacyTheme || typeof legacyTheme !== 'object') {
      return null;
    }

    const theme = legacyTheme as Record<string, unknown>;

    return {
      id: theme.id as string || 'unknown',
      name: theme.name as string || 'Unknown Theme',
      displayName: theme.displayName as string || theme.name as string || 'Unknown Theme',
      description: theme.description as string,
      type: theme.type as string || BaseThemeType.LIGHT,
      variant: theme.variant as ThemeVariant || ThemeVariant.DEFAULT,
      isActive: theme.isActive as boolean || false,
      supportsDarkMode: theme.supportsDarkMode as boolean || false,
      oppositeTheme: theme.oppositeTheme as string,
      version: theme.version as string,
      author: theme.author as string,
      tags: theme.tags as string[],
    };
  }

  /**
   * Extract theme properties from legacy theme
   */
  private extractThemeProperties(legacyTheme: unknown): IThemeProperties | null {
    if (!legacyTheme || typeof legacyTheme !== 'object') {
      return null;
    }

    const theme = legacyTheme as Record<string, unknown>;

    return {
      colors: theme.colors as IThemeColors || this.createDefaultColors(),
      typography: theme.typography as IThemeTypography || this.createDefaultTypography(),
      spacing: theme.spacing as IThemeSpacing || this.createDefaultSpacing(),
      borderRadius: theme.borderRadius as IThemeBorderRadius || this.createDefaultBorderRadius(),
      shadows: theme.shadows as IThemeShadows || this.createDefaultShadows(),
      animation: theme.animation as IThemeAnimation || this.createDefaultAnimation(),
      breakpoints: theme.breakpoints as IThemeBreakpoints || this.createDefaultBreakpoints(),
      themeClasses: theme.themeClasses as Record<string, IThemeClass> || {},
      custom: theme.custom as Record<string, unknown> || {},
      metadata: theme.metadata as IThemeMetadata,
    };
  }

  /**
   * Extract theme data from configuration
   */
  private extractThemeDataFromConfig(config: Record<string, unknown>): IThemeData | null {
    // Handle both flat config and nested config structures
    const metadata = config.metadata as Record<string, unknown> || {};
    const theme = config.theme as Record<string, unknown> || config;

    // Check for required fields - if missing, return null to trigger validation failure
    if (!theme.id && !metadata.id) {
      return null; // ID is required
    }
    if (!theme.name && !metadata.name) {
      return null; // Name is required
    }
    if (!theme.displayName && !theme.name) {
      return null; // DisplayName is required (can fallback to name)
    }
    if (!theme.type) {
      return null; // Type is required
    }

    return {
      id: theme.id as string || metadata.id as string,
      name: theme.name as string || metadata.name as string,
      displayName: theme.displayName as string || theme.name as string,
      description: theme.description as string || metadata.description as string,
      type: theme.type as string,
      variant: theme.variant as ThemeVariant || ThemeVariant.DEFAULT,
      isActive: theme.isActive as boolean || false,
      supportsDarkMode: theme.supportsDarkMode as boolean || false,
      oppositeTheme: theme.oppositeTheme as string,
      version: theme.version as string || metadata.version as string || '1.0.0',
      author: theme.author as string || metadata.author as string,
      tags: theme.tags as string[] || metadata.tags as string[],
    };
  }

  /**
   * Extract theme properties from configuration
   */
  private extractThemePropertiesFromConfig(config: Record<string, unknown>): IThemeProperties | null {
    // Handle both flat config and nested config structures
    const theme = config.theme as Record<string, unknown> || config;

    // Merge config properties with defaults
    const defaultColors = this.createDefaultColors();
    const defaultTypography = this.createDefaultTypography();
    const defaultSpacing = this.createDefaultSpacing();
    const defaultBorderRadius = this.createDefaultBorderRadius();
    const defaultShadows = this.createDefaultShadows();
    const defaultAnimation = this.createDefaultAnimation();
    const defaultBreakpoints = this.createDefaultBreakpoints();

    return {
      colors: theme.colors ? this.mergeColors(defaultColors, theme.colors as IThemeColors) : defaultColors,
      typography: theme.typography ? this.mergeTypography(defaultTypography, theme.typography as IThemeTypography) : defaultTypography,
      spacing: theme.spacing ? this.mergeSpacing(defaultSpacing, theme.spacing as IThemeSpacing) : defaultSpacing,
      borderRadius: theme.borderRadius ? this.mergeBorderRadius(defaultBorderRadius, theme.borderRadius as IThemeBorderRadius) : defaultBorderRadius,
      shadows: theme.shadows ? this.mergeShadows(defaultShadows, theme.shadows as IThemeShadows) : defaultShadows,
      animation: theme.animation ? this.mergeAnimation(defaultAnimation, theme.animation as IThemeAnimation) : defaultAnimation,
      breakpoints: theme.breakpoints ? this.mergeBreakpoints(defaultBreakpoints, theme.breakpoints as IThemeBreakpoints) : defaultBreakpoints,
      themeClasses: theme.themeClasses as Record<string, IThemeClass> || {},
      custom: theme.custom as Record<string, unknown> || {},
      metadata: theme.metadata as IThemeMetadata,
    };
  }

  /**
   * Create default colors
   */
  private createDefaultColors(): IThemeColors {
    return {
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
        contrast: '#ffffff',
      },
      secondary: {
        main: '#dc004e',
        light: '#ff5983',
        dark: '#9a0036',
        contrast: '#ffffff',
      },
      background: {
        primary: '#ffffff',
        secondary: '#f5f5f5',
        tertiary: '#e0e0e0',
        overlay: 'rgba(0, 0, 0, 0.5)',
      },
      text: {
        primary: '#212121',
        secondary: '#757575',
        disabled: '#bdbdbd',
        inverse: '#ffffff',
      },
      status: {
        success: '#4caf50',
        warning: '#ff9800',
        error: '#f44336',
        info: '#2196f3',
      },
      ui: {
        border: '#e0e0e0',
        shadow: '#000000',
        highlight: '#1976d2',
        disabled: '#f5f5f5',
      },
      semantic: {
        brand: {
          primary: '#1976d2',
          secondary: '#dc004e',
        },
        functional: {
          success: '#4caf50',
          warning: '#ff9800',
          error: '#f44336',
          info: '#2196f3',
        },
        state: {
          active: '#1976d2',
          inactive: '#757575',
          hover: '#f5f5f5',
          focus: '#e3f2fd',
        },
      },
    };
  }

  /**
   * Create default typography
   */
  private createDefaultTypography(): IThemeTypography {
    return {
      fontFamily: {
        primary: 'Roboto, sans-serif',
        secondary: 'Arial, sans-serif',
        monospace: 'Courier New, monospace',
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
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
      },
      letterSpacing: {
        tight: -0.5,
        normal: 0,
        wide: 0.5,
      },
    };
  }

  /**
   * Create default spacing
   */
  private createDefaultSpacing(): IThemeSpacing {
    return {
      base: 8,
      scale: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        '2xl': 48,
        '3xl': 64,
      },
    };
  }

  /**
   * Create default border radius
   */
  private createDefaultBorderRadius(): IThemeBorderRadius {
    return {
      none: 0,
      sm: 2,
      base: 4,
      md: 6,
      lg: 8,
      xl: 12,
      full: 9999,
    };
  }

  /**
   * Create default shadows
   */
  private createDefaultShadows(): IThemeShadows {
    return {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    };
  }

  /**
   * Create default animation
   */
  private createDefaultAnimation(): IThemeAnimation {
    return {
      duration: {
        fast: 150,
        normal: 300,
        slow: 500,
        verySlow: 1000,
      },
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
    };
  }

  /**
   * Create default breakpoints
   */
  private createDefaultBreakpoints(): IThemeBreakpoints {
    return {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      '2xl': 1400,
    };
  }

  // ============================================================================
  // MERGE HELPER METHODS
  // ============================================================================

  /**
   * Merge colors with defaults
   */
  private mergeColors(defaults: IThemeColors, config: IThemeColors): IThemeColors {
    return {
      primary: { ...defaults.primary, ...config.primary },
      secondary: { ...defaults.secondary, ...config.secondary },
      background: { ...defaults.background, ...config.background },
      text: { ...defaults.text, ...config.text },
      status: { ...defaults.status, ...config.status },
      ui: { ...defaults.ui, ...config.ui },
      semantic: { ...defaults.semantic, ...config.semantic },
      custom: { ...defaults.custom, ...config.custom },
    };
  }

  /**
   * Merge typography with defaults
   */
  private mergeTypography(defaults: IThemeTypography, config: IThemeTypography): IThemeTypography {
    return {
      fontFamily: { ...defaults.fontFamily, ...config.fontFamily },
      fontSize: { ...defaults.fontSize, ...config.fontSize },
      fontWeight: { ...defaults.fontWeight, ...config.fontWeight },
      lineHeight: { ...defaults.lineHeight, ...config.lineHeight },
      letterSpacing: config.letterSpacing || defaults.letterSpacing,
      textAlign: config.textAlign || defaults.textAlign,
      custom: { ...defaults.custom, ...config.custom },
    };
  }

  /**
   * Merge spacing with defaults
   */
  private mergeSpacing(defaults: IThemeSpacing, config: IThemeSpacing): IThemeSpacing {
    return {
      base: config.base ?? defaults.base,
      scale: { ...defaults.scale, ...config.scale },
      custom: { ...defaults.custom, ...config.custom },
    };
  }

  /**
   * Merge border radius with defaults
   */
  private mergeBorderRadius(defaults: IThemeBorderRadius, config: IThemeBorderRadius): IThemeBorderRadius {
    return {
      none: config.none ?? defaults.none,
      sm: config.sm ?? defaults.sm,
      base: config.base ?? defaults.base,
      lg: config.lg ?? defaults.lg,
      xl: config.xl ?? defaults.xl,
      full: config.full ?? defaults.full,
      variants: { ...defaults.variants, ...config.variants },
    };
  }

  /**
   * Merge shadows with defaults
   */
  private mergeShadows(defaults: IThemeShadows, config: IThemeShadows): IThemeShadows {
    return {
      sm: config.sm ?? defaults.sm,
      base: config.base ?? defaults.base,
      md: config.md ?? defaults.md,
      lg: config.lg ?? defaults.lg,
      xl: config.xl ?? defaults.xl,
      '2xl': config['2xl'] ?? defaults['2xl'],
      variants: { ...defaults.variants, ...config.variants },
    };
  }

  /**
   * Merge animation with defaults
   */
  private mergeAnimation(defaults: IThemeAnimation, config: IThemeAnimation): IThemeAnimation {
    return {
      duration: { ...defaults.duration, ...config.duration },
      easing: { ...defaults.easing, ...config.easing },
      properties: { ...defaults.properties, ...config.properties },
      custom: { ...defaults.custom, ...config.custom },
    };
  }

  /**
   * Merge breakpoints with defaults
   */
  private mergeBreakpoints(defaults: IThemeBreakpoints, config: IThemeBreakpoints): IThemeBreakpoints {
    return {
      xs: config.xs ?? defaults.xs,
      sm: config.sm ?? defaults.sm,
      md: config.md ?? defaults.md,
      lg: config.lg ?? defaults.lg,
      xl: config.xl ?? defaults.xl,
      '2xl': config['2xl'] ?? defaults['2xl'],
      variants: { ...defaults.variants, ...config.variants },
    };
  }
}
