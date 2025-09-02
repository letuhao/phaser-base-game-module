import { IThemeRegistry, ITheme, IThemeResult } from '../interfaces/IThemeSegregated';
import { ThemeType, ThemeVariant } from '../enums/LayoutEnums';
import { Logger } from '../../core/Logger';

/**
 * Theme Registry
 * 
 * Centralized storage and management for themes.
 * Provides theme registration, retrieval, and filtering capabilities.
 */
export class ThemeRegistry implements IThemeRegistry {
  private readonly logger: Logger = Logger.getInstance();
  private readonly themes: Map<string, ITheme> = new Map();
  private readonly themesByName: Map<string, ITheme> = new Map();
  private readonly themesByType: Map<string, Set<ITheme>> = new Map();
  private readonly themesByVariant: Map<ThemeVariant, Set<ITheme>> = new Map();
  private readonly registrationHistory: Array<{ theme: ITheme; timestamp: Date; action: 'register' | 'unregister' }> = [];

  constructor() {
    this.logger.info('ThemeRegistry', 'constructor', 'Theme registry initialized');
  }

  /**
   * Register a new theme
   */
  registerTheme(theme: ITheme): IThemeResult<void> {
    try {
      if (!theme) {
        return {
          success: false,
          error: 'Theme is required',
        };
      }

      this.logger.info('ThemeRegistry', 'registerTheme', 'Registering theme', {
        themeId: theme?.id || 'unknown',
        themeName: theme.name,
        themeType: theme.type,
        themeVariant: theme.variant,
      });

      // Validate theme
      const validationResult = this.validateTheme(theme);
      if (!validationResult.success) {
        return {
          success: false,
          error: `Theme validation failed: ${validationResult.error}`,
        };
      }

      // Check if theme already exists
      if (this.themes.has(theme.id)) {
        return {
          success: false,
          error: `Theme with ID '${theme.id}' is already registered`,
        };
      }

      // Check for name conflicts
      if (this.themesByName.has(theme.name)) {
        const existingTheme = this.themesByName.get(theme.name);
        if (existingTheme && existingTheme.id !== theme.id) {
          return {
            success: false,
            error: `Theme name '${theme.name}' is already used by theme '${existingTheme.id}'`,
          };
        }
      }

      // Register theme
      this.themes.set(theme.id, theme);
      this.themesByName.set(theme.name, theme);

      // Update type index
      if (!this.themesByType.has(theme.type)) {
        this.themesByType.set(theme.type, new Set());
      }
      this.themesByType.get(theme.type)!.add(theme);

      // Update variant index
      if (!this.themesByVariant.has(theme.variant)) {
        this.themesByVariant.set(theme.variant, new Set());
      }
      this.themesByVariant.get(theme.variant)!.add(theme);

      // Record registration
      this.registrationHistory.push({
        theme,
        timestamp: new Date(),
        action: 'register',
      });

      this.logger.info('ThemeRegistry', 'registerTheme', 'Theme registered successfully', {
        themeId: theme?.id || 'unknown',
        totalThemes: this.themes.size,
      });

      return { success: true };
    } catch (error) {
      this.logger.error('ThemeRegistry', 'registerTheme', 'Error registering theme', {
        error,
        themeId: theme?.id || 'unknown',
      });
      return {
        success: false,
        error: `Error registering theme: ${error}`,
      };
    }
  }

  /**
   * Unregister a theme by ID
   */
  unregisterTheme(id: string): IThemeResult<boolean> {
    try {
      if (!id || typeof id !== 'string') {
        return {
          success: false,
          error: 'Theme ID is required and must be a string',
        };
      }

      this.logger.info('ThemeRegistry', 'unregisterTheme', 'Unregistering theme', {
        themeId: id,
      });

      const theme = this.themes.get(id);
      if (!theme) {
        this.logger.warn('ThemeRegistry', 'unregisterTheme', 'Theme not found', {
          themeId: id,
        });
        return { success: true, data: false };
      }

      // Remove from main registry
      this.themes.delete(id);

      // Remove from name index
      this.themesByName.delete(theme.name);

      // Remove from type index
      const typeSet = this.themesByType.get(theme.type);
      if (typeSet) {
        typeSet.delete(theme);
        if (typeSet.size === 0) {
          this.themesByType.delete(theme.type);
        }
      }

      // Remove from variant index
      const variantSet = this.themesByVariant.get(theme.variant);
      if (variantSet) {
        variantSet.delete(theme);
        if (variantSet.size === 0) {
          this.themesByVariant.delete(theme.variant);
        }
      }

      // Record unregistration
      this.registrationHistory.push({
        theme,
        timestamp: new Date(),
        action: 'unregister',
      });

      this.logger.info('ThemeRegistry', 'unregisterTheme', 'Theme unregistered successfully', {
        themeId: id,
        totalThemes: this.themes.size,
      });

      return { success: true, data: true };
    } catch (error) {
      this.logger.error('ThemeRegistry', 'unregisterTheme', 'Error unregistering theme', {
        error,
        themeId: id,
      });
      return {
        success: false,
        error: `Error unregistering theme: ${error}`,
      };
    }
  }

  /**
   * Get a theme by ID
   */
  getTheme(id: string): IThemeResult<ITheme | undefined> {
    try {
      if (!id || typeof id !== 'string') {
        return {
          success: false,
          error: 'Theme ID is required and must be a string',
        };
      }

      this.logger.debug('ThemeRegistry', 'getTheme', 'Getting theme by ID', {
        themeId: id,
      });

      const theme = this.themes.get(id);
      
      if (theme) {
        this.logger.debug('ThemeRegistry', 'getTheme', 'Theme found', {
          themeId: id,
          themeName: theme.name,
        });
        return { success: true, data: theme };
      } else {
        this.logger.debug('ThemeRegistry', 'getTheme', 'Theme not found', {
          themeId: id,
        });
        return { success: true, data: undefined };
      }
    } catch (error) {
      this.logger.error('ThemeRegistry', 'getTheme', 'Error getting theme', {
        error,
        themeId: id,
      });
      return {
        success: false,
        error: `Error getting theme: ${error}`,
      };
    }
  }

  /**
   * Get a theme by name
   */
  getThemeByName(name: string): IThemeResult<ITheme | undefined> {
    try {
      if (!name || typeof name !== 'string') {
        return {
          success: false,
          error: 'Theme name is required and must be a string',
        };
      }

      this.logger.debug('ThemeRegistry', 'getThemeByName', 'Getting theme by name', {
        themeName: name,
      });

      const theme = this.themesByName.get(name);
      
      if (theme) {
        this.logger.debug('ThemeRegistry', 'getThemeByName', 'Theme found', {
          themeName: name,
          themeId: theme?.id || 'unknown',
        });
        return { success: true, data: theme };
      } else {
        this.logger.debug('ThemeRegistry', 'getThemeByName', 'Theme not found', {
          themeName: name,
        });
        return { success: true, data: undefined };
      }
    } catch (error) {
      this.logger.error('ThemeRegistry', 'getThemeByName', 'Error getting theme by name', {
        error,
        themeName: name,
      });
      return {
        success: false,
        error: `Error getting theme by name: ${error}`,
      };
    }
  }

  /**
   * Get all themes matching a filter
   */
  getThemes(filter?: (theme: ITheme) => boolean): IThemeResult<ITheme[]> {
    try {
      if (filter !== undefined && typeof filter !== 'function') {
        return {
          success: false,
          error: 'Filter must be a function',
        };
      }

      this.logger.debug('ThemeRegistry', 'getThemes', 'Getting themes with filter', {
        hasFilter: !!filter,
        totalThemes: this.themes.size,
      });

      const allThemes = Array.from(this.themes.values());
      
      if (!filter) {
        this.logger.debug('ThemeRegistry', 'getThemes', 'Returning all themes', {
          count: allThemes.length,
        });
        return { success: true, data: allThemes };
      }

      const filteredThemes = allThemes.filter(filter);
      
      this.logger.debug('ThemeRegistry', 'getThemes', 'Returning filtered themes', {
        totalThemes: allThemes.length,
        filteredCount: filteredThemes.length,
      });

      return { success: true, data: filteredThemes };
    } catch (error) {
      this.logger.error('ThemeRegistry', 'getThemes', 'Error getting themes', {
        error,
      });
      return {
        success: false,
        error: `Error getting themes: ${error}`,
      };
    }
  }

  /**
   * Get themes by type
   */
  getThemesByType(type: ThemeType): IThemeResult<ITheme[]> {
    try {
      if (!type || typeof type !== 'string') {
        return {
          success: false,
          error: 'Theme type is required and must be a string',
        };
      }

      this.logger.debug('ThemeRegistry', 'getThemesByType', 'Getting themes by type', {
        themeType: type,
      });

      const typeSet = this.themesByType.get(type);
      const themes = typeSet ? Array.from(typeSet) : [];

      this.logger.debug('ThemeRegistry', 'getThemesByType', 'Themes found by type', {
        themeType: type,
        count: themes.length,
      });

      return { success: true, data: themes };
    } catch (error) {
      this.logger.error('ThemeRegistry', 'getThemesByType', 'Error getting themes by type', {
        error,
        themeType: type,
      });
      return {
        success: false,
        error: `Error getting themes by type: ${error}`,
      };
    }
  }

  /**
   * Get themes by variant
   */
  getThemesByVariant(variant: ThemeVariant): IThemeResult<ITheme[]> {
    try {
      if (!variant) {
        return {
          success: false,
          error: 'Theme variant is required',
        };
      }

      this.logger.debug('ThemeRegistry', 'getThemesByVariant', 'Getting themes by variant', {
        themeVariant: variant,
      });

      const variantSet = this.themesByVariant.get(variant);
      const themes = variantSet ? Array.from(variantSet) : [];

      this.logger.debug('ThemeRegistry', 'getThemesByVariant', 'Themes found by variant', {
        themeVariant: variant,
        count: themes.length,
      });

      return { success: true, data: themes };
    } catch (error) {
      this.logger.error('ThemeRegistry', 'getThemesByVariant', 'Error getting themes by variant', {
        error,
        themeVariant: variant,
      });
      return {
        success: false,
        error: `Error getting themes by variant: ${error}`,
      };
    }
  }

  // ============================================================================
  // ADDITIONAL UTILITY METHODS
  // ============================================================================

  /**
   * Get all registered theme IDs
   */
  getAllThemeIds(): string[] {
    return Array.from(this.themes.keys());
  }

  /**
   * Get all registered theme names
   */
  getAllThemeNames(): string[] {
    return Array.from(this.themesByName.keys());
  }

  /**
   * Check if a theme is registered
   */
  hasTheme(id: string): boolean {
    return this.themes.has(id);
  }

  /**
   * Check if a theme name is registered
   */
  hasThemeName(name: string): boolean {
    return this.themesByName.has(name);
  }

  /**
   * Get the total number of registered themes
   */
  getThemeCount(): number {
    return this.themes.size;
  }

  /**
   * Get theme statistics
   */
  getStatistics(): {
    totalThemes: number;
    themesByType: Record<string, number>;
    themesByVariant: Record<ThemeVariant, number>;
    registrationHistory: number;
  } {
    const themesByType: Record<string, number> = {} as Record<string, number>;
    const themesByVariant: Record<ThemeVariant, number> = {} as Record<ThemeVariant, number>;

    // Count themes by type
    for (const [type, themes] of this.themesByType.entries()) {
      themesByType[type] = themes.size;
    }

    // Count themes by variant
    for (const [variant, themes] of this.themesByVariant.entries()) {
      themesByVariant[variant] = themes.size;
    }

    return {
      totalThemes: this.themes.size,
      themesByType,
      themesByVariant,
      registrationHistory: this.registrationHistory.length,
    };
  }

  /**
   * Get registration history
   */
  getRegistrationHistory(): Array<{ theme: ITheme; timestamp: Date; action: 'register' | 'unregister' }> {
    return [...this.registrationHistory];
  }

  /**
   * Clear all themes
   */
  clear(): void {
    this.logger.info('ThemeRegistry', 'clear', 'Clearing all themes', {
      totalThemes: this.themes.size,
    });

    this.themes.clear();
    this.themesByName.clear();
    this.themesByType.clear();
    this.themesByVariant.clear();
    this.registrationHistory.length = 0;

    this.logger.info('ThemeRegistry', 'clear', 'All themes cleared');
  }

  /**
   * Get themes that support dark mode
   */
  getThemesSupportingDarkMode(): IThemeResult<ITheme[]> {
    return this.getThemes(theme => theme.supportsDarkMode);
  }

  /**
   * Get active themes
   */
  getActiveThemes(): IThemeResult<ITheme[]> {
    return this.getThemes(theme => theme.isActive);
  }

  /**
   * Get inactive themes
   */
  getInactiveThemes(): IThemeResult<ITheme[]> {
    return this.getThemes(theme => !theme.isActive);
  }

  // ============================================================================
  // PRIVATE HELPER METHODS
  // ============================================================================

  /**
   * Validate a theme before registration
   */
  private validateTheme(theme: ITheme): IThemeResult<void> {
    try {
      // Check required properties
      if (!theme.id || typeof theme.id !== 'string') {
        return {
          success: false,
          error: 'Theme ID is required and must be a string',
        };
      }

      if (!theme.name || typeof theme.name !== 'string') {
        return {
          success: false,
          error: 'Theme name is required and must be a string',
        };
      }

      if (!theme.displayName || typeof theme.displayName !== 'string') {
        return {
          success: false,
          error: 'Theme displayName is required and must be a string',
        };
      }

      if (!theme.type) {
        return {
          success: false,
          error: 'Theme type is required',
        };
      }

      if (!theme.variant) {
        return {
          success: false,
          error: 'Theme variant is required',
        };
      }

      if (typeof theme.isActive !== 'boolean') {
        return {
          success: false,
          error: 'Theme isActive must be a boolean',
        };
      }

      if (typeof theme.supportsDarkMode !== 'boolean') {
        return {
          success: false,
          error: 'Theme supportsDarkMode must be a boolean',
        };
      }

      // Check theme properties
      if (!theme.colors) {
        return {
          success: false,
          error: 'Theme colors are required',
        };
      }

      if (!theme.typography) {
        return {
          success: false,
          error: 'Theme typography is required',
        };
      }

      if (!theme.spacing) {
        return {
          success: false,
          error: 'Theme spacing is required',
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: `Theme validation error: ${error}`,
      };
    }
  }
}
