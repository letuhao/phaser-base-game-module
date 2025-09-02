/**
 * Theme activation result interface
 * Defines the result of a theme activation operation
 */
export interface IThemeActivationResult {
  success: boolean;
  themeId: string;
  appliedClasses: string[];
  errors: string[];
  duration: number;
}
