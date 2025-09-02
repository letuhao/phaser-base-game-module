import { IThemePropertyResolver } from '../interfaces/IThemePropertyResolver';
import { ITheme } from '../interfaces/ITheme';
import { IThemeResult } from '../interfaces/IThemeSegregated';
import { BreakpointName } from '../enums/LayoutEnums';
import { Logger } from '../../core/Logger';

/**
 * Theme Property Resolver
 * 
 * Handles property resolution, inheritance, and fallback logic for themes.
 * Provides a centralized way to resolve theme properties with proper error handling.
 */
export class ThemePropertyResolver implements IThemePropertyResolver {
  private readonly logger: Logger = Logger.getInstance();

  /**
   * Resolve a color value from a theme
   */
  resolveColor(theme: ITheme, path: string, fallback?: string): IThemeResult<string> {
    try {
      this.logger.debug('ThemePropertyResolver', 'resolveColor', 'Resolving color', {
        themeId: theme?.id || 'unknown',
        path,
        fallback,
      });

      const result = this.resolveNestedProperty(theme.colors, path);
      if (result.success && result.data) {
        return { success: true, data: result.data as string };
      }

      // Try fallback
      if (fallback) {
        this.logger.debug('ThemePropertyResolver', 'resolveColor', 'Using fallback color', {
          themeId: theme?.id || 'unknown',
          path,
          fallback,
        });
        return { success: true, data: fallback };
      }

      return {
        success: false,
        error: `Color not found: ${path} in theme ${theme.id}`,
      };
    } catch (error) {
      this.logger.error('ThemePropertyResolver', 'resolveColor', 'Error resolving color', {
        error,
        themeId: theme?.id || 'unknown',
        path,
      });
      return {
        success: false,
        error: `Error resolving color ${path}: ${error}`,
      };
    }
  }

  /**
   * Resolve a spacing value from a theme
   */
  resolveSpacing(theme: ITheme, size: string, fallback?: number): IThemeResult<number> {
    try {
      this.logger.debug('ThemePropertyResolver', 'resolveSpacing', 'Resolving spacing', {
        themeId: theme?.id || 'unknown',
        size,
        fallback,
      });

      // Try scale first
      if (theme.spacing.scale && theme.spacing.scale[size as keyof typeof theme.spacing.scale]) {
        const value = theme.spacing.scale[size as keyof typeof theme.spacing.scale];
        if (typeof value === 'number') {
          return { success: true, data: value };
        }
      }

      // Try base spacing
      if (size === 'base' && theme.spacing.base) {
        return { success: true, data: theme.spacing.base };
      }

      // Try fallback
      if (fallback !== undefined) {
        this.logger.debug('ThemePropertyResolver', 'resolveSpacing', 'Using fallback spacing', {
          themeId: theme?.id || 'unknown',
          size,
          fallback,
        });
        return { success: true, data: fallback };
      }

      return {
        success: false,
        error: `Spacing not found: ${size} in theme ${theme.id}`,
      };
    } catch (error) {
      this.logger.error('ThemePropertyResolver', 'resolveSpacing', 'Error resolving spacing', {
        error,
        themeId: theme?.id || 'unknown',
        size,
      });
      return {
        success: false,
        error: `Error resolving spacing ${size}: ${error}`,
      };
    }
  }

  /**
   * Resolve a font size from a theme
   */
  resolveFontSize(theme: ITheme, size: string, fallback?: number): IThemeResult<number> {
    try {
      this.logger.debug('ThemePropertyResolver', 'resolveFontSize', 'Resolving font size', {
        themeId: theme?.id || 'unknown',
        size,
        fallback,
      });

      if (theme.typography.fontSize && theme.typography.fontSize[size as keyof typeof theme.typography.fontSize]) {
        const value = theme.typography.fontSize[size as keyof typeof theme.typography.fontSize];
        if (typeof value === 'number') {
          return { success: true, data: value };
        }
      }

      // Try fallback
      if (fallback !== undefined) {
        this.logger.debug('ThemePropertyResolver', 'resolveFontSize', 'Using fallback font size', {
          themeId: theme?.id || 'unknown',
          size,
          fallback,
        });
        return { success: true, data: fallback };
      }

      return {
        success: false,
        error: `Font size not found: ${size} in theme ${theme.id}`,
      };
    } catch (error) {
      this.logger.error('ThemePropertyResolver', 'resolveFontSize', 'Error resolving font size', {
        error,
        themeId: theme?.id || 'unknown',
        size,
      });
      return {
        success: false,
        error: `Error resolving font size ${size}: ${error}`,
      };
    }
  }

  /**
   * Resolve a border radius from a theme
   */
  resolveBorderRadius(theme: ITheme, size: string, fallback?: number): IThemeResult<number> {
    try {
      this.logger.debug('ThemePropertyResolver', 'resolveBorderRadius', 'Resolving border radius', {
        themeId: theme?.id || 'unknown',
        size,
        fallback,
      });

      if (theme.borderRadius && theme.borderRadius[size as keyof typeof theme.borderRadius]) {
        const value = theme.borderRadius[size as keyof typeof theme.borderRadius];
        if (typeof value === 'number') {
          return { success: true, data: value };
        }
      }

      // Try fallback
      if (fallback !== undefined) {
        this.logger.debug('ThemePropertyResolver', 'resolveBorderRadius', 'Using fallback border radius', {
          themeId: theme?.id || 'unknown',
          size,
          fallback,
        });
        return { success: true, data: fallback };
      }

      return {
        success: false,
        error: `Border radius not found: ${size} in theme ${theme.id}`,
      };
    } catch (error) {
      this.logger.error('ThemePropertyResolver', 'resolveBorderRadius', 'Error resolving border radius', {
        error,
        themeId: theme?.id || 'unknown',
        size,
      });
      return {
        success: false,
        error: `Error resolving border radius ${size}: ${error}`,
      };
    }
  }

  /**
   * Resolve a shadow from a theme
   */
  resolveShadow(theme: ITheme, size: string, fallback?: string): IThemeResult<string> {
    try {
      this.logger.debug('ThemePropertyResolver', 'resolveShadow', 'Resolving shadow', {
        themeId: theme?.id || 'unknown',
        size,
        fallback,
      });

      if (theme.shadows && theme.shadows[size as keyof typeof theme.shadows]) {
        const value = theme.shadows[size as keyof typeof theme.shadows];
        if (typeof value === 'string') {
          return { success: true, data: value };
        }
      }

      // Try fallback
      if (fallback) {
        this.logger.debug('ThemePropertyResolver', 'resolveShadow', 'Using fallback shadow', {
          themeId: theme?.id || 'unknown',
          size,
          fallback,
        });
        return { success: true, data: fallback };
      }

      return {
        success: false,
        error: `Shadow not found: ${size} in theme ${theme.id}`,
      };
    } catch (error) {
      this.logger.error('ThemePropertyResolver', 'resolveShadow', 'Error resolving shadow', {
        error,
        themeId: theme?.id || 'unknown',
        size,
      });
      return {
        success: false,
        error: `Error resolving shadow ${size}: ${error}`,
      };
    }
  }

  /**
   * Resolve an animation duration from a theme
   */
  resolveAnimationDuration(theme: ITheme, size: string, fallback?: number): IThemeResult<number> {
    try {
      this.logger.debug('ThemePropertyResolver', 'resolveAnimationDuration', 'Resolving animation duration', {
        themeId: theme?.id || 'unknown',
        size,
        fallback,
      });

      if (theme.animation.duration && theme.animation.duration[size as keyof typeof theme.animation.duration]) {
        const value = theme.animation.duration[size as keyof typeof theme.animation.duration];
        if (typeof value === 'number') {
          return { success: true, data: value };
        }
      }

      // Try fallback
      if (fallback !== undefined) {
        this.logger.debug('ThemePropertyResolver', 'resolveAnimationDuration', 'Using fallback animation duration', {
          themeId: theme?.id || 'unknown',
          size,
          fallback,
        });
        return { success: true, data: fallback };
      }

      return {
        success: false,
        error: `Animation duration not found: ${size} in theme ${theme.id}`,
      };
    } catch (error) {
      this.logger.error('ThemePropertyResolver', 'resolveAnimationDuration', 'Error resolving animation duration', {
        error,
        themeId: theme?.id || 'unknown',
        size,
      });
      return {
        success: false,
        error: `Error resolving animation duration ${size}: ${error}`,
      };
    }
  }

  /**
   * Resolve a theme class from a theme
   */
  resolveThemeClass(theme: ITheme, className: string, fallback?: any): IThemeResult<any> {
    try {
      this.logger.debug('ThemePropertyResolver', 'resolveThemeClass', 'Resolving theme class', {
        themeId: theme?.id || 'unknown',
        className,
        fallback: !!fallback,
      });

      if (theme.themeClasses && theme.themeClasses[className]) {
        const value = theme.themeClasses[className];
        return { success: true, data: value };
      }

      // Try fallback
      if (fallback !== undefined) {
        this.logger.debug('ThemePropertyResolver', 'resolveThemeClass', 'Using fallback theme class', {
          themeId: theme?.id || 'unknown',
          className,
        });
        return { success: true, data: fallback };
      }

      return {
        success: true,
        data: undefined,
      };
    } catch (error) {
      this.logger.error('ThemePropertyResolver', 'resolveThemeClass', 'Error resolving theme class', {
        error,
        themeId: theme?.id || 'unknown',
        className,
      });
      return {
        success: false,
        error: `Error resolving theme class ${className}: ${error}`,
      };
    }
  }

  /**
   * Resolve a custom property from a theme
   */
  resolveCustomProperty(theme: ITheme, path: string, fallback?: unknown): IThemeResult<unknown> {
    try {
      this.logger.debug('ThemePropertyResolver', 'resolveCustomProperty', 'Resolving custom property', {
        themeId: theme?.id || 'unknown',
        path,
        fallback: !!fallback,
      });

      if (theme.custom) {
        const result = this.resolveNestedProperty(theme.custom, path);
        if (result.success && result.data !== undefined) {
          return { success: true, data: result.data };
        }
      }

      // Try fallback
      if (fallback !== undefined) {
        this.logger.debug('ThemePropertyResolver', 'resolveCustomProperty', 'Using fallback custom property', {
          themeId: theme?.id || 'unknown',
          path,
        });
        return { success: true, data: fallback };
      }

      return {
        success: false,
        error: `Custom property not found: ${path} in theme ${theme.id}`,
      };
    } catch (error) {
      this.logger.error('ThemePropertyResolver', 'resolveCustomProperty', 'Error resolving custom property', {
        error,
        themeId: theme?.id || 'unknown',
        path,
      });
      return {
        success: false,
        error: `Error resolving custom property ${path}: ${error}`,
      };
    }
  }

  /**
   * Resolve a property with inheritance from parent themes
   */
  resolveWithInheritance(theme: ITheme, path: string, fallback?: unknown): IThemeResult<unknown> {
    try {
      this.logger.debug('ThemePropertyResolver', 'resolveWithInheritance', 'Resolving with inheritance', {
        themeId: theme?.id || 'unknown',
        path,
        fallback: !!fallback,
      });

      // First try the current theme
      const currentResult = this.resolveNestedProperty(theme, path);
      if (currentResult.success && currentResult.data !== undefined) {
        return { success: true, data: currentResult.data };
      }

      // Try parent theme if available
      if (theme.oppositeTheme) {
        // This would require access to the theme manager to get the parent theme
        // For now, we'll just use the fallback
        this.logger.debug('ThemePropertyResolver', 'resolveWithInheritance', 'Parent theme inheritance not implemented yet', {
          themeId: theme?.id || 'unknown',
          path,
        });
      }

      // Try fallback
      if (fallback !== undefined) {
        this.logger.debug('ThemePropertyResolver', 'resolveWithInheritance', 'Using fallback with inheritance', {
          themeId: theme?.id || 'unknown',
          path,
        });
        return { success: true, data: fallback };
      }

      return {
        success: false,
        error: `Property not found with inheritance: ${path} in theme ${theme.id}`,
      };
    } catch (error) {
      this.logger.error('ThemePropertyResolver', 'resolveWithInheritance', 'Error resolving with inheritance', {
        error,
        themeId: theme?.id || 'unknown',
        path,
      });
      return {
        success: false,
        error: `Error resolving with inheritance ${path}: ${error}`,
      };
    }
  }

  /**
   * Resolve a property for a specific breakpoint
   */
  resolveForBreakpoint(
    theme: ITheme,
    path: string,
    breakpoint: BreakpointName,
    fallback?: unknown
  ): IThemeResult<unknown> {
    try {
      this.logger.debug('ThemePropertyResolver', 'resolveForBreakpoint', 'Resolving for breakpoint', {
        themeId: theme?.id || 'unknown',
        path,
        breakpoint,
        fallback: !!fallback,
      });

      // Check if theme supports this breakpoint
      const supportsResult = this.supportsBreakpoint(theme, breakpoint);
      if (!supportsResult.success || !supportsResult.data) {
        this.logger.debug('ThemePropertyResolver', 'resolveForBreakpoint', 'Theme does not support breakpoint', {
          themeId: theme?.id || 'unknown',
          breakpoint,
        });
        
        if (fallback !== undefined) {
          return { success: true, data: fallback };
        }
        
        return {
          success: false,
          error: `Theme ${theme.id} does not support breakpoint ${breakpoint}`,
        };
      }

      // For now, we'll resolve the property normally
      // In a full implementation, this would check for breakpoint-specific overrides
      const result = this.resolveNestedProperty(theme, path);
      if (result.success && result.data !== undefined) {
        return { success: true, data: result.data };
      }

      // Try fallback
      if (fallback !== undefined) {
        this.logger.debug('ThemePropertyResolver', 'resolveForBreakpoint', 'Using fallback for breakpoint', {
          themeId: theme?.id || 'unknown',
          path,
          breakpoint,
        });
        return { success: true, data: fallback };
      }

      return {
        success: false,
        error: `Property not found for breakpoint: ${path} in theme ${theme.id}`,
      };
    } catch (error) {
      this.logger.error('ThemePropertyResolver', 'resolveForBreakpoint', 'Error resolving for breakpoint', {
        error,
        themeId: theme?.id || 'unknown',
        path,
        breakpoint,
      });
      return {
        success: false,
        error: `Error resolving for breakpoint ${path}: ${error}`,
      };
    }
  }

  /**
   * Check if a theme supports a specific breakpoint
   */
  supportsBreakpoint(theme: ITheme, breakpoint: BreakpointName): IThemeResult<boolean> {
    try {
      this.logger.debug('ThemePropertyResolver', 'supportsBreakpoint', 'Checking breakpoint support', {
        themeId: theme?.id || 'unknown',
        breakpoint,
      });

      if (theme.breakpoints && theme.breakpoints[breakpoint as keyof typeof theme.breakpoints]) {
        return { success: true, data: true };
      }

      return { success: true, data: false };
    } catch (error) {
      this.logger.error('ThemePropertyResolver', 'supportsBreakpoint', 'Error checking breakpoint support', {
        error,
        themeId: theme?.id || 'unknown',
        breakpoint,
      });
      return {
        success: false,
        error: `Error checking breakpoint support: ${error}`,
      };
    }
  }

  /**
   * Get all available properties for a theme
   */
  getAvailableProperties(theme: ITheme): IThemeResult<string[]> {
    try {
      this.logger.debug('ThemePropertyResolver', 'getAvailableProperties', 'Getting available properties', {
        themeId: theme?.id || 'unknown',
      });

      const properties: string[] = [];

      // Add color properties
      if (theme.colors) {
        properties.push(...this.getNestedPropertyPaths(theme.colors, 'colors'));
      }

      // Add typography properties
      if (theme.typography) {
        properties.push(...this.getNestedPropertyPaths(theme.typography, 'typography'));
      }

      // Add spacing properties
      if (theme.spacing) {
        properties.push(...this.getNestedPropertyPaths(theme.spacing, 'spacing'));
      }

      // Add border radius properties
      if (theme.borderRadius) {
        properties.push(...this.getNestedPropertyPaths(theme.borderRadius, 'borderRadius'));
      }

      // Add shadow properties
      if (theme.shadows) {
        properties.push(...this.getNestedPropertyPaths(theme.shadows, 'shadows'));
      }

      // Add animation properties
      if (theme.animation) {
        properties.push(...this.getNestedPropertyPaths(theme.animation, 'animation'));
      }

      // Add custom properties
      if (theme.custom) {
        properties.push(...this.getNestedPropertyPaths(theme.custom, 'custom'));
      }

      return { success: true, data: properties };
    } catch (error) {
      this.logger.error('ThemePropertyResolver', 'getAvailableProperties', 'Error getting available properties', {
        error,
        themeId: theme?.id || 'unknown',
      });
      return {
        success: false,
        error: `Error getting available properties: ${error}`,
      };
    }
  }

  /**
   * Validate a theme's property structure
   */
  validateThemeProperties(theme: ITheme): IThemeResult<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }> {
    try {
      this.logger.debug('ThemePropertyResolver', 'validateThemeProperties', 'Validating theme properties', {
        themeId: theme?.id || 'unknown',
      });

      const errors: string[] = [];
      const warnings: string[] = [];

      // Validate required properties
      if (!theme.id) {
        errors.push('Theme ID is required');
      }

      if (!theme.name) {
        errors.push('Theme name is required');
      }

      if (!theme.colors) {
        errors.push('Theme colors are required');
      }

      if (!theme.typography) {
        errors.push('Theme typography is required');
      }

      if (!theme.spacing) {
        errors.push('Theme spacing is required');
      }

      // Validate color structure
      if (theme.colors) {
        if (!theme.colors.primary) {
          warnings.push('Primary colors are recommended');
        }
        if (!theme.colors.background) {
          warnings.push('Background colors are recommended');
        }
        if (!theme.colors.text) {
          warnings.push('Text colors are recommended');
        }
      }

      // Validate typography structure
      if (theme.typography) {
        if (!theme.typography.fontSize) {
          warnings.push('Font sizes are recommended');
        }
        if (!theme.typography.fontFamily) {
          warnings.push('Font families are recommended');
        }
      }

      const isValid = errors.length === 0;

      return {
        success: true,
        data: {
          isValid,
          errors,
          warnings,
        },
      };
    } catch (error) {
      this.logger.error('ThemePropertyResolver', 'validateThemeProperties', 'Error validating theme properties', {
        error,
        themeId: theme?.id || 'unknown',
      });
      return {
        success: false,
        error: `Error validating theme properties: ${error}`,
      };
    }
  }

  // ============================================================================
  // PRIVATE HELPER METHODS
  // ============================================================================

  /**
   * Resolve a nested property from an object using dot notation
   */
  private resolveNestedProperty(obj: any, path: string): IThemeResult<unknown> {
    try {
      const keys = path.split('.');
      let current = obj;

      for (const key of keys) {
        if (current === null || current === undefined || typeof current !== 'object') {
          return {
            success: false,
            error: `Property path not found: ${path}`,
          };
        }
        current = current[key];
      }

      if (current === undefined) {
        return {
          success: false,
          error: `Property not found: ${path}`,
        };
      }

      return { success: true, data: current };
    } catch (error) {
      return {
        success: false,
        error: `Error resolving nested property ${path}: ${error}`,
      };
    }
  }

  /**
   * Get all nested property paths from an object
   */
  private getNestedPropertyPaths(obj: any, prefix: string = ''): string[] {
    const paths: string[] = [];

    if (typeof obj !== 'object' || obj === null) {
      return paths;
    }

    for (const [key, value] of Object.entries(obj)) {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        paths.push(...this.getNestedPropertyPaths(value, currentPath));
      } else {
        paths.push(currentPath);
      }
    }

    return paths;
  }
}
