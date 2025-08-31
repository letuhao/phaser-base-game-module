import type { IConfiguration } from '../interfaces/IConfiguration';

/**
 * Theme configuration interface for game styling
 * Inspired by CSS, WinForms, and WPF styling systems
 */
export interface IThemeConfig extends IConfiguration {
  /** Theme name (e.g., 'dark', 'light', 'retro', 'futuristic') */
  readonly themeName: string;

  /** Color palette for the theme */
  readonly colors: {
    /** Primary colors */
    primary: {
      main: string;
      light: string;
      dark: string;
      contrast: string;
    };
    /** Secondary colors */
    secondary: {
      main: string;
      light: string;
      dark: string;
      contrast: string;
    };
    /** Background colors */
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      overlay: string;
    };
    /** Text colors */
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      inverse: string;
    };
    /** Status colors */
    status: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
    /** UI element colors */
    ui: {
      border: string;
      shadow: string;
      highlight: string;
      disabled: string;
    };
  };

  /** Typography settings */
  readonly typography: {
    /** Font families */
    fontFamily: {
      primary: string;
      secondary: string;
      monospace: string;
    };
    /** Font sizes */
    fontSize: {
      xs: number;
      sm: number;
      base: number;
      lg: number;
      xl: number;
      '2xl': number;
      '3xl': number;
    };
    /** Font weights */
    fontWeight: {
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    /** Line heights */
    lineHeight: {
      tight: number;
      normal: number;
      relaxed: number;
    };
  };

  /** Spacing system */
  readonly spacing: {
    /** Base spacing unit */
    base: number;
    /** Spacing scale */
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

  /** Border radius values */
  readonly borderRadius: {
    none: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    full: number;
  };

  /** Shadow definitions */
  readonly shadows: {
    sm: string;
    base: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };

  /** Animation durations */
  readonly animation: {
    fast: number;
    normal: number;
    slow: number;
    verySlow: number;
  };

  /** Breakpoints for responsive design */
  readonly breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    '2xl': number;
  };

  /** Get a color value by path (e.g., 'primary.main', 'status.error') */
  getColor(path: string): string;

  /** Get a spacing value by size */
  getSpacing(size: keyof IThemeConfig['spacing']['scale']): number;

  /** Get a font size value */
  getFontSize(size: keyof IThemeConfig['typography']['fontSize']): number;

  /** Check if the theme supports dark mode */
  supportsDarkMode(): boolean;

  /** Get the opposite theme (if switching is supported) */
  getOppositeTheme(): string | null;
}
