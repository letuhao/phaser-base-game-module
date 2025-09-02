/**
 * Fortune Wheel Theme Configuration
 *
 * A vibrant, game-focused theme designed specifically for the fortune wheel game.
 * Features bright colors, engaging animations, and game-appropriate styling.
 *
 * This theme uses the new Layout System ITheme interface for full compatibility
 * with the Unit System and responsive design features.
 */

import { ITheme } from '../../../../layout/interfaces/ITheme';
import {
  ThemeType,
  ThemeVariant,
  BreakpointName,
  TextAlign,
  DisplayType,
  PositionType,
  OverflowType,
  WhiteSpace,
  TextOverflow,
} from '../../../../layout/enums/LayoutEnums';
import {
  CursorType,
  FlexDirection,
  FlexWrap,
  JustifyContent,
  AlignItems,
  VisibilityType,
  WordBreak,
  OverflowWrap,
  BoxSizing,
} from '../../../../layout/enums/ThemeEnums';
import { SizeUnit } from '../../../../unit';

/**
 * Fortune Wheel Theme Configuration
 * Features vibrant colors, engaging animations, and game-appropriate styling
 */
export const fortuneWheelTheme: ITheme = {
  // ============================================================================
  // THEME METADATA
  // ============================================================================
  id: 'fortune-wheel-theme',
  name: 'fortune-wheel',
  displayName: 'Fortune Wheel Theme',
  description:
    'Vibrant theme designed for fortune wheel games with bright colors and engaging animations',
  type: ThemeType.CUSTOM,
  variant: ThemeVariant.PRIMARY,
  isActive: true,
  supportsDarkMode: false,
  oppositeTheme: undefined,
  version: '1.0.0',
  author: 'Fortune Wheel Game Team',
  tags: ['game', 'fortune-wheel', 'vibrant', 'engaging', 'casino-style'],

  // ============================================================================
  // THEME COLORS
  // ============================================================================
  colors: {
    // Primary color palette - Golden/Orange theme
    primary: {
      main: '#ff6b35', // Vibrant orange
      light: '#ff8c69', // Light orange
      dark: '#e55a2b', // Dark orange
      contrast: '#ffffff', // White text
      variants: {
        '50': '#fff7ed',
        '100': '#ffedd5',
        '200': '#fed7aa',
        '300': '#fdba74',
        '400': '#fb923c',
        '500': '#ff6b35',
        '600': '#ea580c',
        '700': '#c2410c',
        '800': '#9a3412',
        '900': '#7c2d12',
      },
    },

    // Secondary color palette - Deep blue/purple
    secondary: {
      main: '#3b82f6', // Bright blue
      light: '#60a5fa', // Light blue
      dark: '#2563eb', // Dark blue
      contrast: '#ffffff', // White text
      variants: {
        '50': '#eff6ff',
        '100': '#dbeafe',
        '200': '#bfdbfe',
        '300': '#93c5fd',
        '400': '#60a5fa',
        '500': '#3b82f6',
        '600': '#2563eb',
        '700': '#1d4ed8',
        '800': '#1e40af',
        '900': '#1e3a8a',
      },
    },

    // Background colors
    background: {
      primary: '#fef3c7', // Warm cream
      secondary: '#fde68a', // Light golden
      tertiary: '#fbbf24', // Golden
      overlay: 'rgba(0, 0, 0, 0.7)', // Dark overlay
      variants: {
        'game-bg': '#1a1a2e', // Dark game background
        'wheel-bg': '#2a2a3e', // Wheel background
        'modal-bg': 'rgba(255, 255, 255, 0.95)', // Modal background
        'card-bg': '#ffffff', // Card background
      },
    },

    // Text colors
    text: {
      primary: '#1f2937', // Dark gray
      secondary: '#6b7280', // Medium gray
      disabled: '#9ca3af', // Light gray
      inverse: '#ffffff', // White
      variants: {
        accent: '#ff6b35', // Orange accent
        success: '#10b981', // Green success
        warning: '#f59e0b', // Yellow warning
        error: '#ef4444', // Red error
      },
    },

    // Status colors
    status: {
      success: '#10b981', // Green
      warning: '#f59e0b', // Yellow
      error: '#ef4444', // Red
      info: '#3b82f6', // Blue
      variants: {
        'big-win': '#fbbf24', // Golden big win
        'small-win': '#10b981', // Green small win
        lose: '#ef4444', // Red lose
        jackpot: '#ff6b35', // Orange jackpot
      },
    },

    // UI element colors
    ui: {
      border: '#d1d5db', // Light gray border
      shadow: 'rgba(0, 0, 0, 0.1)', // Subtle shadow
      highlight: '#fbbf24', // Golden highlight
      disabled: '#e5e7eb', // Light gray disabled
      variants: {
        'wheel-border': '#ff6b35', // Orange wheel border
        'button-border': '#3b82f6', // Blue button border
        'modal-border': '#d1d5db', // Modal border
        'card-border': '#e5e7eb', // Card border
      },
    },

    // Semantic colors for game elements
    semantic: {
      brand: {
        'levis-primary': '#ff6b35',
        'levis-secondary': '#3b82f6',
        'levis-accent': '#fbbf24',
      },
      functional: {
        'spin-button': '#ff6b35',
        'stop-button': '#ef4444',
        'reset-button': '#6b7280',
        'settings-button': '#3b82f6',
      },
      state: {
        spinning: '#fbbf24',
        stopped: '#10b981',
        disabled: '#9ca3af',
        hover: '#ff8c69',
        active: '#e55a2b',
      },
      custom: {
        'wheel-segment-1': '#ff6b35',
        'wheel-segment-2': '#3b82f6',
        'wheel-segment-3': '#10b981',
        'wheel-segment-4': '#f59e0b',
        'wheel-segment-5': '#ef4444',
        'wheel-segment-6': '#8b5cf6',
        'wheel-segment-7': '#06b6d4',
        'wheel-segment-8': '#84cc16',
        'wheel-segment-9': '#f97316',
        'wheel-segment-10': '#ec4899',
        'wheel-segment-11': '#14b8a6',
        'wheel-segment-12': '#f43f5e',
      },
    },

    // Custom colors for specific game elements
    custom: {
      'pointer-color': '#ff6b35',
      'pointer-shadow': 'rgba(255, 107, 53, 0.3)',
      'wheel-glow': 'rgba(251, 191, 36, 0.5)',
      'prize-glow': 'rgba(16, 185, 129, 0.3)',
      'jackpot-glow': 'rgba(255, 107, 53, 0.6)',
    },
  },

  // ============================================================================
  // TYPOGRAPHY
  // ============================================================================
  typography: {
    fontFamily: {
      primary: 'Inter, system-ui, -apple-system, sans-serif',
      secondary: 'Poppins, sans-serif',
      monospace: 'JetBrains Mono, monospace',
      display: 'Poppins, sans-serif',
      variants: {
        'game-title': 'Poppins, sans-serif',
        'button-text': 'Inter, sans-serif',
        'prize-text': 'Poppins, sans-serif',
      },
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      display: 48,
      variants: {
        'game-title': 36,
        'prize-amount': 28,
        'button-text': 16,
        'small-text': 12,
      },
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      variants: {
        'game-title': 700,
        'prize-amount': 600,
        'button-text': 500,
      },
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
      loose: 2,
      variants: {
        'game-title': 1.2,
        'prize-text': 1.3,
        'button-text': 1.4,
      },
    },
    letterSpacing: {
      tight: -0.025,
      normal: 0,
      wide: 0.025,
      variants: {
        'game-title': 0.05,
        'prize-amount': 0.02,
      },
    },
    textAlign: {
      left: 'left',
      center: 'center',
      right: 'right',
      justify: 'justify',
    },
    custom: {
      'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
      'text-glow': '0 0 10px rgba(255, 107, 53, 0.5)',
    },
  },

  // ============================================================================
  // SPACING
  // ============================================================================
  spacing: {
    base: 16,
    scale: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      '2xl': 48,
      '3xl': 64,
      variants: {
        'wheel-padding': 20,
        'button-padding': 12,
        'modal-padding': 24,
        'card-padding': 16,
      },
    },
    custom: {
      'wheel-radius': 400,
      'pointer-offset': 50,
      'button-spacing': 16,
    },
  },

  // ============================================================================
  // BORDER RADIUS
  // ============================================================================
  borderRadius: {
    none: 0,
    sm: 4,
    base: 8,
    lg: 12,
    xl: 16,
    full: 9999,
    variants: {
      wheel: 9999,
      button: 8,
      modal: 12,
      card: 8,
      'prize-badge': 20,
    },
  },

  // ============================================================================
  // SHADOWS
  // ============================================================================
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 2px 4px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    variants: {
      'wheel-shadow': '0 10px 30px rgba(0, 0, 0, 0.3)',
      'button-shadow': '0 4px 12px rgba(255, 107, 53, 0.3)',
      'modal-shadow': '0 20px 40px rgba(0, 0, 0, 0.4)',
      'prize-glow': '0 0 20px rgba(16, 185, 129, 0.5)',
      'jackpot-glow': '0 0 30px rgba(255, 107, 53, 0.7)',
    },
  },

  // ============================================================================
  // ANIMATION
  // ============================================================================
  animation: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
      verySlow: 1000,
      variants: {
        'wheel-spin': 3000,
        'wheel-slow': 2000,
        'button-hover': 200,
        'modal-fade': 300,
        'prize-popup': 500,
      },
    },
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      variants: {
        'wheel-spin': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'button-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'modal-slide': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
    properties: {
      all: 'all',
      opacity: 'opacity',
      transform: 'transform',
      color: 'color',
      background: 'background',
      variants: {
        'wheel-rotation': 'transform',
        'button-scale': 'transform',
        'modal-fade': 'opacity',
        'prize-glow': 'box-shadow',
      },
    },
    custom: {
      'spin-keyframes': 'spin 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      'bounce-keyframes': 'bounce 0.5s ease-in-out',
      'glow-keyframes': 'glow 2s ease-in-out infinite alternate',
    },
  },

  // ============================================================================
  // BREAKPOINTS
  // ============================================================================
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
    variants: {
      mobile: 480,
      tablet: 768,
      desktop: 1024,
      'large-desktop': 1440,
    },
  },

  // ============================================================================
  // THEME CLASSES
  // ============================================================================
  themeClasses: {
    // Game container classes
    '.game-container': {
      backgroundColor: '#1a1a2e',
      color: '#ffffff',
      padding: 20,
      borderRadiusValue: 0,
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
      display: DisplayType.FLEX,
      flexDirection: FlexDirection.COLUMN,
      alignItems: AlignItems.CENTER,
      justifyContent: JustifyContent.CENTER,
      minHeight: '100vh',
      boxSizing: BoxSizing.BORDER_BOX,
    },

    // Wheel classes
    '.wheel-container': {
      backgroundColor: '#2a2a3e',
      borderRadiusValue: 9999,
      padding: 20,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      width: { value: 800, unit: SizeUnit.PIXEL },
      height: { value: 800, unit: SizeUnit.PIXEL },
      display: DisplayType.FLEX,
      alignItems: AlignItems.CENTER,
      justifyContent: JustifyContent.CENTER,
      position: PositionType.RELATIVE,
      boxSizing: BoxSizing.BORDER_BOX,
    },

    '.wheel-base': {
      backgroundColor: 'transparent',
      borderRadiusValue: 9999,
      width: { value: 760, unit: SizeUnit.PIXEL },
      height: { value: 760, unit: SizeUnit.PIXEL },
    },

    '.wheel-pointer': {
      backgroundColor: '#ff6b35',
      borderRadiusValue: 4,
      width: { value: 100, unit: SizeUnit.PIXEL },
      height: { value: 150, unit: SizeUnit.PIXEL },
      boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
    },

    '.wheel-center': {
      backgroundColor: '#fbbf24',
      borderRadiusValue: 9999,
      width: { value: 120, unit: SizeUnit.PIXEL },
      height: { value: 120, unit: SizeUnit.PIXEL },
      boxShadow: '0 4px 12px rgba(251, 191, 36, 0.3)',
    },

    // Button classes
    '.spin-button': {
      backgroundColor: '#ff6b35',
      color: '#ffffff',
      padding: 16,
      borderRadiusValue: 8,
      fontWeight: 600,
      fontSize: 18,
      boxShadow: '0 4px 12px rgba(255, 107, 53, 0.3)',
      width: { value: 200, unit: SizeUnit.PIXEL },
      height: { value: 60, unit: SizeUnit.PIXEL },
      display: DisplayType.FLEX,
      alignItems: AlignItems.CENTER,
      justifyContent: JustifyContent.CENTER,
      cursor: CursorType.POINTER,
      border: 'none',
      boxSizing: BoxSizing.BORDER_BOX,
      transition: 'all 0.3s ease',
    },

    '.spin-button:hover': {
      backgroundColor: '#ff8c69',
      boxShadow: '0 6px 16px rgba(255, 107, 53, 0.4)',
      transform: 'scale(1.05)',
      cursor: CursorType.POINTER,
    },

    '.spin-button:active': {
      backgroundColor: '#e55a2b',
      transform: 'scale(0.95)',
    },

    '.spin-button:disabled': {
      backgroundColor: '#9ca3af',
      color: '#6b7280',
      cursor: CursorType.NOT_ALLOWED,
    },

    // Modal classes
    '.prize-modal': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      color: '#1f2937',
      padding: 32,
      borderRadiusValue: 12,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
      width: { value: 400, unit: SizeUnit.PIXEL },
      height: { value: 300, unit: SizeUnit.PIXEL },
      display: DisplayType.FLEX,
      flexDirection: FlexDirection.COLUMN,
      alignItems: AlignItems.CENTER,
      justifyContent: JustifyContent.CENTER,
      position: PositionType.RELATIVE,
      boxSizing: BoxSizing.BORDER_BOX,
      backdropFilter: 'blur(10px)',
    },

    '.prize-modal-header': {
      color: '#ff6b35',
      fontSize: 24,
      fontWeight: 700,
      textAlign: TextAlign.CENTER,
    },

    '.prize-modal-content': {
      color: '#1f2937',
      fontSize: 18,
      marginTop: 16,
      textAlign: TextAlign.CENTER,
    },

    '.prize-amount': {
      color: '#10b981',
      fontSize: 28,
      fontWeight: 600,
      textAlign: TextAlign.CENTER,
    },

    '.jackpot-amount': {
      color: '#ff6b35',
      fontSize: 32,
      fontWeight: 700,
      textAlign: TextAlign.CENTER,
    },

    // Close button
    '.close-button': {
      backgroundColor: '#ef4444',
      color: '#ffffff',
      borderRadiusValue: 9999,
      width: { value: 40, unit: SizeUnit.PIXEL },
      height: { value: 40, unit: SizeUnit.PIXEL },
      fontSize: 20,
      fontWeight: 600,
      boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)',
    },

    '.close-button:hover': {
      backgroundColor: '#dc2626',
      transform: 'scale(1.1)',
      cursor: CursorType.POINTER,
    },

    // Prize badge classes
    '.prize-badge': {
      backgroundColor: '#10b981',
      color: '#ffffff',
      padding: 8,
      borderRadiusValue: 20,
      fontSize: 14,
      fontWeight: 600,
      textAlign: TextAlign.CENTER,
    },

    '.prize-badge.big-win': {
      backgroundColor: '#fbbf24',
      color: '#1f2937',
      boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
    },

    '.prize-badge.jackpot': {
      backgroundColor: '#ff6b35',
      color: '#ffffff',
      boxShadow: '0 0 30px rgba(255, 107, 53, 0.7)',
    },

    // Responsive classes
    '.mobile-wheel': {
      width: { value: 600, unit: SizeUnit.PIXEL },
      height: { value: 600, unit: SizeUnit.PIXEL },
    },

    '.tablet-wheel': {
      width: { value: 700, unit: SizeUnit.PIXEL },
      height: { value: 700, unit: SizeUnit.PIXEL },
    },

    '.desktop-wheel': {
      width: { value: 800, unit: SizeUnit.PIXEL },
      height: { value: 800, unit: SizeUnit.PIXEL },
    },

    // Button container classes
    '.button-container': {
      display: DisplayType.FLEX,
      flexDirection: FlexDirection.ROW,
      alignItems: AlignItems.CENTER,
      justifyContent: JustifyContent.CENTER,
      gap: 16,
      marginTop: 32,
      flexWrap: FlexWrap.WRAP,
    },

    // Control panel classes
    '.control-panel': {
      display: DisplayType.FLEX,
      flexDirection: FlexDirection.COLUMN,
      alignItems: AlignItems.CENTER,
      justifyContent: JustifyContent.CENTER,
      gap: 16,
      padding: 24,
      backgroundColor: 'rgba(42, 42, 62, 0.8)',
      borderRadiusValue: 12,
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    },

    // Score display classes
    '.score-display': {
      display: DisplayType.FLEX,
      flexDirection: FlexDirection.COLUMN,
      alignItems: AlignItems.CENTER,
      justifyContent: JustifyContent.CENTER,
      gap: 8,
      padding: 16,
      backgroundColor: 'rgba(255, 107, 53, 0.1)',
      borderRadiusValue: 8,
      border: '2px solid rgba(255, 107, 53, 0.3)',
      minWidth: 120,
    },

    // Loading state classes
    '.loading-spinner': {
      display: DisplayType.FLEX,
      alignItems: AlignItems.CENTER,
      justifyContent: JustifyContent.CENTER,
      width: { value: 40, unit: SizeUnit.PIXEL },
      height: { value: 40, unit: SizeUnit.PIXEL },
      border: '4px solid rgba(255, 107, 53, 0.3)',
      borderTop: '4px solid #ff6b35',
      borderRadiusValue: 9999,
      cssAnimation: 'spin 1s linear infinite',
    },

    // Hidden/visible utility classes
    '.hidden': {
      visibility: VisibilityType.HIDDEN,
      opacity: 0,
      transition: 'opacity 0.3s ease, visibility 0.3s ease',
    },

    '.visible': {
      visibility: VisibilityType.VISIBLE,
      opacity: 1,
      transition: 'opacity 0.3s ease, visibility 0.3s ease',
    },

    // Text utility classes
    '.text-ellipsis': {
      whiteSpace: WhiteSpace.NOWRAP,
      overflow: OverflowType.HIDDEN,
      textOverflow: TextOverflow.ELLIPSIS,
    },

    '.text-break': {
      wordBreak: WordBreak.BREAK_WORD,
      overflowWrap: OverflowWrap.BREAK_WORD,
    },
  },

  // ============================================================================
  // CUSTOM PROPERTIES
  // ============================================================================
  custom: {
    'wheel-segments': 12,
    'wheel-colors': [
      '#ff6b35',
      '#3b82f6',
      '#10b981',
      '#f59e0b',
      '#ef4444',
      '#8b5cf6',
      '#06b6d4',
      '#84cc16',
      '#f97316',
      '#ec4899',
      '#14b8a6',
      '#f43f5e',
    ],
    'prize-values': [100, 200, 500, 1000, 2000, 5000, 10000, 25000, 50000, 100000, 250000, 1000000],
    'animation-speeds': {
      fast: 1000,
      normal: 3000,
      slow: 5000,
    },
    'sound-effects': {
      spin: 'wheel_spin.mp3',
      tick: 'wheel_tick.mp3',
      stop: 'wheel_stop.mp3',
      win: 'prize_popup.mp3',
      'big-win': 'big_win.mp3',
      jackpot: 'jackpot.mp3',
    },
  },

  // ============================================================================
  // METADATA
  // ============================================================================
  metadata: {
    createdAt: new Date('2024-01-01'),
    modifiedAt: new Date(),
    author: 'Fortune Wheel Game Team',
    version: '1.0.0',
    tags: ['game', 'fortune-wheel', 'vibrant', 'engaging', 'casino-style'],
    custom: {
      'game-type': 'fortune-wheel',
      'target-audience': 'casual-gamers',
      'color-scheme': 'vibrant',
      'animation-style': 'engaging',
    },
  },

  // ============================================================================
  // REQUIRED METHODS
  // ============================================================================
  getColor(path: string): string {
    const colorMap: Record<string, string> = {
      'primary.main': this.colors.primary.main,
      'primary.light': this.colors.primary.light,
      'primary.dark': this.colors.primary.dark,
      'secondary.main': this.colors.secondary.main,
      'background.primary': this.colors.background.primary,
      'text.primary': this.colors.text.primary,
      'status.success': this.colors.status.success,
      'status.warning': this.colors.status.warning,
      'status.error': this.colors.status.error,
      'ui.border': this.colors.ui.border,
      'ui.highlight': this.colors.ui.highlight,
    };
    return colorMap[path] || '#000000';
  },

  getSpacing(size: keyof ITheme['spacing']['scale']): number {
    const value = this.spacing.scale[size];
    return typeof value === 'number' ? value : 0;
  },

  getFontSize(size: keyof ITheme['typography']['fontSize']): number {
    const value = this.typography.fontSize[size];
    return typeof value === 'number' ? value : 16;
  },

  getBorderRadius(size: keyof ITheme['borderRadius']): number {
    const value = this.borderRadius[size];
    return typeof value === 'number' ? value : 0;
  },

  getShadow(size: keyof ITheme['shadows']): string {
    const value = this.shadows[size];
    return typeof value === 'string' ? value : 'none';
  },

  getAnimationDuration(size: keyof ITheme['animation']['duration']): number {
    const value = this.animation.duration[size];
    return typeof value === 'number' ? value : 300;
  },

  supportsBreakpoint(breakpoint: BreakpointName): boolean {
    return breakpoint in this.breakpoints;
  },

  getOppositeTheme(): string | null {
    return null; // No opposite theme for fortune wheel
  },

  clone(): ITheme {
    return JSON.parse(JSON.stringify(this));
  },

  merge(other: Partial<ITheme>): ITheme {
    return { ...this, ...other };
  },
};
