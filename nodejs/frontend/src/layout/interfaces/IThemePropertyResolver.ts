import { ITheme } from './ITheme';
import { IThemeResult } from './IThemeSegregated';
import { BreakpointName } from '../enums/LayoutEnums';

/**
 * Theme Property Resolver Interface
 * 
 * Handles property resolution, inheritance, and fallback logic for themes.
 * Provides a centralized way to resolve theme properties with proper error handling.
 */
export interface IThemePropertyResolver {
  /**
   * Resolve a color value from a theme
   * @param theme - The theme to resolve from
   * @param path - The color path (e.g., 'primary.main', 'status.error')
   * @param fallback - Optional fallback value
   * @returns Result with the resolved color value
   */
  resolveColor(theme: ITheme, path: string, fallback?: string): IThemeResult<string>;

  /**
   * Resolve a spacing value from a theme
   * @param theme - The theme to resolve from
   * @param size - The spacing size (e.g., 'sm', 'md', 'lg')
   * @param fallback - Optional fallback value
   * @returns Result with the resolved spacing value
   */
  resolveSpacing(theme: ITheme, size: string, fallback?: number): IThemeResult<number>;

  /**
   * Resolve a font size from a theme
   * @param theme - The theme to resolve from
   * @param size - The font size (e.g., 'sm', 'base', 'lg')
   * @param fallback - Optional fallback value
   * @returns Result with the resolved font size
   */
  resolveFontSize(theme: ITheme, size: string, fallback?: number): IThemeResult<number>;

  /**
   * Resolve a border radius from a theme
   * @param theme - The theme to resolve from
   * @param size - The border radius size (e.g., 'sm', 'base', 'lg')
   * @param fallback - Optional fallback value
   * @returns Result with the resolved border radius
   */
  resolveBorderRadius(theme: ITheme, size: string, fallback?: number): IThemeResult<number>;

  /**
   * Resolve a shadow from a theme
   * @param theme - The theme to resolve from
   * @param size - The shadow size (e.g., 'sm', 'base', 'lg')
   * @param fallback - Optional fallback value
   * @returns Result with the resolved shadow
   */
  resolveShadow(theme: ITheme, size: string, fallback?: string): IThemeResult<string>;

  /**
   * Resolve an animation duration from a theme
   * @param theme - The theme to resolve from
   * @param size - The animation duration (e.g., 'fast', 'normal', 'slow')
   * @param fallback - Optional fallback value
   * @returns Result with the resolved animation duration
   */
  resolveAnimationDuration(theme: ITheme, size: string, fallback?: number): IThemeResult<number>;

  /**
   * Resolve a theme class from a theme
   * @param theme - The theme to resolve from
   * @param className - The class name to resolve
   * @param fallback - Optional fallback class
   * @returns Result with the resolved theme class
   */
  resolveThemeClass(theme: ITheme, className: string, fallback?: any): IThemeResult<any>;

  /**
   * Resolve a custom property from a theme
   * @param theme - The theme to resolve from
   * @param path - The property path (e.g., 'custom.buttonStyle')
   * @param fallback - Optional fallback value
   * @returns Result with the resolved custom property
   */
  resolveCustomProperty(theme: ITheme, path: string, fallback?: unknown): IThemeResult<unknown>;

  /**
   * Resolve a property with inheritance from parent themes
   * @param theme - The theme to resolve from
   * @param path - The property path
   * @param fallback - Optional fallback value
   * @returns Result with the resolved property value
   */
  resolveWithInheritance(theme: ITheme, path: string, fallback?: unknown): IThemeResult<unknown>;

  /**
   * Resolve a property for a specific breakpoint
   * @param theme - The theme to resolve from
   * @param path - The property path
   * @param breakpoint - The breakpoint to resolve for
   * @param fallback - Optional fallback value
   * @returns Result with the resolved property value
   */
  resolveForBreakpoint(
    theme: ITheme,
    path: string,
    breakpoint: BreakpointName,
    fallback?: unknown
  ): IThemeResult<unknown>;

  /**
   * Check if a theme supports a specific breakpoint
   * @param theme - The theme to check
   * @param breakpoint - The breakpoint to check
   * @returns Result with boolean indicating support
   */
  supportsBreakpoint(theme: ITheme, breakpoint: BreakpointName): IThemeResult<boolean>;

  /**
   * Get all available properties for a theme
   * @param theme - The theme to analyze
   * @returns Result with array of available property paths
   */
  getAvailableProperties(theme: ITheme): IThemeResult<string[]>;

  /**
   * Validate a theme's property structure
   * @param theme - The theme to validate
   * @returns Result with validation status and any errors
   */
  validateThemeProperties(theme: ITheme): IThemeResult<{
    isValid: boolean;
    errors: string[];
    warnings: string[];
  }>;
}
