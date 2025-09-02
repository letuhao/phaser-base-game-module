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
  ISpacingScale,
  IThemeBorderRadius,
  IThemeShadows,
  IThemeAnimation,
  IThemeBreakpoints,
  IThemeClass,
  IThemeMetadata,
} from '../interfaces/ITheme';
import { ThemeType, ThemeVariant, BreakpointName } from '../enums/LayoutEnums';
import { Logger } from '../../core/Logger';

/**
 * Segregated Theme Implementation
 * 
 * Implements the complete ITheme interface by combining all segregated interfaces.
 * Provides better separation of concerns and improved SOLID compliance.
 */
export class SegregatedTheme implements ITheme {
  private readonly logger: Logger = Logger.getInstance();

  // ============================================================================
  // IThemeData Properties
  // ============================================================================
  
  readonly id: string;
  readonly name: string;
  readonly displayName: string;
  readonly description?: string;
  readonly type: ThemeType;
  readonly variant: ThemeVariant;
  readonly isActive: boolean;
  readonly supportsDarkMode: boolean;
  readonly oppositeTheme?: string;
  readonly version?: string;
  readonly author?: string;
  readonly tags?: string[];

  // ============================================================================
  // IThemeProperties Properties
  // ============================================================================
  
  readonly colors: IThemeColors;
  readonly typography: IThemeTypography;
  readonly spacing: IThemeSpacing;
  readonly borderRadius: IThemeBorderRadius;
  readonly shadows: IThemeShadows;
  readonly animation: IThemeAnimation;
  readonly breakpoints: IThemeBreakpoints;
  readonly themeClasses?: Record<string, IThemeClass>;
  readonly custom?: Record<string, unknown>;
  readonly metadata?: IThemeMetadata;

  constructor(
    data: IThemeData,
    properties: IThemeProperties
  ) {
    this.logger.info('SegregatedTheme', 'constructor', 'Creating segregated theme', {
      themeId: data.id,
      themeName: data.name,
      themeType: data.type,
      themeVariant: data.variant,
    });

    // Initialize IThemeData properties
    this.id = data.id;
    this.name = data.name;
    this.displayName = data.displayName;
    this.description = data.description;
    this.type = data.type;
    this.variant = data.variant;
    this.isActive = data.isActive;
    this.supportsDarkMode = data.supportsDarkMode;
    this.oppositeTheme = data.oppositeTheme;
    this.version = data.version;
    this.author = data.author;
    this.tags = data.tags;

    // Initialize IThemeProperties properties
    this.colors = properties.colors;
    this.typography = properties.typography;
    this.spacing = properties.spacing;
    this.borderRadius = properties.borderRadius;
    this.shadows = properties.shadows;
    this.animation = properties.animation;
    this.breakpoints = properties.breakpoints;
    this.themeClasses = properties.themeClasses;
    this.custom = properties.custom;
    this.metadata = properties.metadata;
  }

  // ============================================================================
  // IThemeOperations Methods
  // ============================================================================

  /**
   * Get a color value by path
   */
  getColor(path: string): IThemeResult<string> {
    try {
      this.logger.debug('SegregatedTheme', 'getColor', 'Getting color by path', {
        themeId: this.id,
        path,
      });

      const value = this.getNestedValue(this.colors, path);
      if (typeof value === 'string') {
        return { success: true, data: value };
      }

      return {
        success: false,
        error: `Color not found at path: ${path}`,
      };
    } catch (error) {
      this.logger.error('SegregatedTheme', 'getColor', 'Error getting color', {
        error,
        themeId: this.id,
        path,
      });
      return {
        success: false,
        error: `Error getting color: ${error}`,
      };
    }
  }

  /**
   * Get a spacing value by size
   */
  getSpacing(size: keyof ISpacingScale): IThemeResult<number> {
    try {
      this.logger.debug('SegregatedTheme', 'getSpacing', 'Getting spacing by size', {
        themeId: this.id,
        size,
      });

      if (this.spacing.scale && this.spacing.scale[size]) {
        const value = this.spacing.scale[size];
        if (typeof value === 'number') {
          return { success: true, data: value };
        }
      }

      return {
        success: false,
        error: `Spacing not found for size: ${size}`,
      };
    } catch (error) {
      this.logger.error('SegregatedTheme', 'getSpacing', 'Error getting spacing', {
        error,
        themeId: this.id,
        size,
      });
      return {
        success: false,
        error: `Error getting spacing: ${error}`,
      };
    }
  }

  /**
   * Get a font size by size
   */
  getFontSize(size: keyof IThemeTypography['fontSize']): IThemeResult<number> {
    try {
      this.logger.debug('SegregatedTheme', 'getFontSize', 'Getting font size by size', {
        themeId: this.id,
        size,
      });

      if (this.typography.fontSize && this.typography.fontSize[size]) {
        const value = this.typography.fontSize[size];
        if (typeof value === 'number') {
          return { success: true, data: value };
        }
      }

      return {
        success: false,
        error: `Font size not found for size: ${size}`,
      };
    } catch (error) {
      this.logger.error('SegregatedTheme', 'getFontSize', 'Error getting font size', {
        error,
        themeId: this.id,
        size,
      });
      return {
        success: false,
        error: `Error getting font size: ${error}`,
      };
    }
  }

  /**
   * Get a border radius by size
   */
  getBorderRadius(size: keyof IThemeBorderRadius): IThemeResult<number> {
    try {
      this.logger.debug('SegregatedTheme', 'getBorderRadius', 'Getting border radius by size', {
        themeId: this.id,
        size,
      });

      if (this.borderRadius && this.borderRadius[size]) {
        const value = this.borderRadius[size];
        if (typeof value === 'number') {
          return { success: true, data: value };
        }
      }

      return {
        success: false,
        error: `Border radius not found for size: ${size}`,
      };
    } catch (error) {
      this.logger.error('SegregatedTheme', 'getBorderRadius', 'Error getting border radius', {
        error,
        themeId: this.id,
        size,
      });
      return {
        success: false,
        error: `Error getting border radius: ${error}`,
      };
    }
  }

  /**
   * Get a shadow by size
   */
  getShadow(size: keyof IThemeShadows): IThemeResult<string> {
    try {
      this.logger.debug('SegregatedTheme', 'getShadow', 'Getting shadow by size', {
        themeId: this.id,
        size,
      });

      if (this.shadows && this.shadows[size]) {
        const value = this.shadows[size];
        if (typeof value === 'string') {
          return { success: true, data: value };
        }
      }

      return {
        success: false,
        error: `Shadow not found for size: ${size}`,
      };
    } catch (error) {
      this.logger.error('SegregatedTheme', 'getShadow', 'Error getting shadow', {
        error,
        themeId: this.id,
        size,
      });
      return {
        success: false,
        error: `Error getting shadow: ${error}`,
      };
    }
  }

  /**
   * Get an animation duration by size
   */
  getAnimationDuration(size: keyof IThemeAnimation['duration']): IThemeResult<number> {
    try {
      this.logger.debug('SegregatedTheme', 'getAnimationDuration', 'Getting animation duration by size', {
        themeId: this.id,
        size,
      });

      if (this.animation.duration && this.animation.duration[size]) {
        const value = this.animation.duration[size];
        if (typeof value === 'number') {
          return { success: true, data: value };
        }
      }

      return {
        success: false,
        error: `Animation duration not found for size: ${size}`,
      };
    } catch (error) {
      this.logger.error('SegregatedTheme', 'getAnimationDuration', 'Error getting animation duration', {
        error,
        themeId: this.id,
        size,
      });
      return {
        success: false,
        error: `Error getting animation duration: ${error}`,
      };
    }
  }

  /**
   * Check if theme supports a specific breakpoint
   */
  supportsBreakpoint(breakpoint: BreakpointName): IThemeResult<boolean> {
    try {
      this.logger.debug('SegregatedTheme', 'supportsBreakpoint', 'Checking breakpoint support', {
        themeId: this.id,
        breakpoint,
      });

      if (this.breakpoints && this.breakpoints[breakpoint as keyof typeof this.breakpoints]) {
        return { success: true, data: true };
      }

      return { success: true, data: false };
    } catch (error) {
      this.logger.error('SegregatedTheme', 'supportsBreakpoint', 'Error checking breakpoint support', {
        error,
        themeId: this.id,
        breakpoint,
      });
      return {
        success: false,
        error: `Error checking breakpoint support: ${error}`,
      };
    }
  }

  /**
   * Get the opposite theme ID
   */
  getOppositeTheme(): IThemeResult<string | null> {
    try {
      this.logger.debug('SegregatedTheme', 'getOppositeTheme', 'Getting opposite theme', {
        themeId: this.id,
      });

      if (this.oppositeTheme) {
        return { success: true, data: this.oppositeTheme };
      }

      return { success: true, data: null };
    } catch (error) {
      this.logger.error('SegregatedTheme', 'getOppositeTheme', 'Error getting opposite theme', {
        error,
        themeId: this.id,
      });
      return {
        success: false,
        error: `Error getting opposite theme: ${error}`,
      };
    }
  }

  /**
   * Clone the theme
   */
  clone(): IThemeResult<ITheme> {
    try {
      this.logger.debug('SegregatedTheme', 'clone', 'Cloning theme', {
        themeId: this.id,
      });

      const clonedData: IThemeData = {
        id: this.id,
        name: this.name,
        displayName: this.displayName,
        description: this.description,
        type: this.type,
        variant: this.variant,
        isActive: this.isActive,
        supportsDarkMode: this.supportsDarkMode,
        oppositeTheme: this.oppositeTheme,
        version: this.version,
        author: this.author,
        tags: this.tags ? [...this.tags] : undefined,
      };

      const clonedProperties: IThemeProperties = {
        colors: this.deepClone(this.colors),
        typography: this.deepClone(this.typography),
        spacing: this.deepClone(this.spacing),
        borderRadius: this.deepClone(this.borderRadius),
        shadows: this.deepClone(this.shadows),
        animation: this.deepClone(this.animation),
        breakpoints: this.deepClone(this.breakpoints),
        themeClasses: this.themeClasses ? this.deepClone(this.themeClasses) : undefined,
        custom: this.custom ? this.deepClone(this.custom) : undefined,
        metadata: this.metadata ? this.deepClone(this.metadata) : undefined,
      };

      const clonedTheme = new SegregatedTheme(clonedData, clonedProperties);
      
      this.logger.debug('SegregatedTheme', 'clone', 'Theme cloned successfully', {
        themeId: this.id,
      });

      return { success: true, data: clonedTheme };
    } catch (error) {
      this.logger.error('SegregatedTheme', 'clone', 'Error cloning theme', {
        error,
        themeId: this.id,
      });
      return {
        success: false,
        error: `Error cloning theme: ${error}`,
      };
    }
  }

  /**
   * Merge with another theme
   */
  merge(other: Partial<ITheme>): IThemeResult<ITheme> {
    try {
      // Handle null or undefined input
      if (!other) {
        return { success: true, data: this };
      }

      this.logger.debug('SegregatedTheme', 'merge', 'Merging theme', {
        themeId: this.id,
        otherThemeId: other?.id || 'unknown',
      });

      const mergedData: IThemeData = {
        id: other.id || this.id,
        name: other.name || this.name,
        displayName: other.displayName || this.displayName,
        description: other.description || this.description,
        type: other.type || this.type,
        variant: other.variant || this.variant,
        isActive: other.isActive !== undefined ? other.isActive : this.isActive,
        supportsDarkMode: other.supportsDarkMode !== undefined ? other.supportsDarkMode : this.supportsDarkMode,
        oppositeTheme: other.oppositeTheme || this.oppositeTheme,
        version: other.version || this.version,
        author: other.author || this.author,
        tags: other.tags || this.tags,
      };

      const mergedProperties: IThemeProperties = {
        colors: other.colors ? this.deepMerge(this.colors, other.colors) : this.colors,
        typography: other.typography ? this.deepMerge(this.typography, other.typography) : this.typography,
        spacing: other.spacing ? this.deepMerge(this.spacing, other.spacing) : this.spacing,
        borderRadius: other.borderRadius ? this.deepMerge(this.borderRadius, other.borderRadius) : this.borderRadius,
        shadows: other.shadows ? this.deepMerge(this.shadows, other.shadows) : this.shadows,
        animation: other.animation ? this.deepMerge(this.animation, other.animation) : this.animation,
        breakpoints: other.breakpoints ? this.deepMerge(this.breakpoints, other.breakpoints) : this.breakpoints,
        themeClasses: other.themeClasses ? this.deepMerge(this.themeClasses, other.themeClasses) : this.themeClasses,
        custom: other.custom ? this.deepMerge(this.custom, other.custom) : this.custom,
        metadata: other.metadata ? this.deepMerge(this.metadata, other.metadata) : this.metadata,
      };

      const mergedTheme = new SegregatedTheme(mergedData, mergedProperties);
      
      this.logger.debug('SegregatedTheme', 'merge', 'Theme merged successfully', {
        themeId: this.id,
        otherThemeId: other?.id || 'unknown',
      });

      return { success: true, data: mergedTheme };
    } catch (error) {
      this.logger.error('SegregatedTheme', 'merge', 'Error merging theme', {
        error,
        themeId: this.id,
        otherThemeId: other?.id || 'unknown',
      });
      return {
        success: false,
        error: `Error merging theme: ${error}`,
      };
    }
  }

  // ============================================================================
  // PRIVATE HELPER METHODS
  // ============================================================================

  /**
   * Get nested value from object using dot notation
   */
  private getNestedValue(obj: unknown, path: string): unknown {
    if (!obj || typeof obj !== 'object') {
      return undefined;
    }

    const keys = path.split('.');
    let current: unknown = obj;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = (current as Record<string, unknown>)[key];
      } else {
        return undefined;
      }
    }

    return current;
  }

  /**
   * Deep clone an object
   */
  private deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    if (obj instanceof Date) {
      return new Date(obj.getTime()) as unknown as T;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.deepClone(item)) as unknown as T;
    }

    const cloned = {} as T;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cloned[key] = this.deepClone(obj[key]);
      }
    }

    return cloned;
  }

  private deepMerge<T>(target: T, source: Partial<T>): T {
    if (source === null || typeof source !== 'object') {
      return source as T;
    }

    if (target === null || typeof target !== 'object') {
      return source as T;
    }

    if (Array.isArray(source)) {
      return source as T;
    }

    const merged = { ...target } as T;
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          merged[key] = this.deepMerge(target[key], source[key] as any);
        } else {
          merged[key] = source[key] as any;
        }
      }
    }

    return merged;
  }


}
