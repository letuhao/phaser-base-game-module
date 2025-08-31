/**
 * Autumn Theme Configuration for Levis2025R3Wheel Scene
 * 
 * This theme provides a warm, seasonal autumn color palette inspired by:
 * - Rich earth tones and warm colors from the existing footer design
 * - Autumn seasonal elements and warm UI styling
 * - Responsive design considerations for different device types
 * - Integration with the existing theme class system
 */

import type { SimpleThemeConfig } from '../../../core/ThemeConfigLoader'

/**
 * Autumn Theme Configuration
 * Features warm earth tones, golden yellows, deep oranges, and seasonal styling
 */
export const autumnThemeConfig: SimpleThemeConfig = {
  themeName: 'autumn',
  
  colors: {
    primary: {
      main: '#d97706',      // Warm orange (autumn primary)
      light: '#f59e0b',     // Golden yellow
      dark: '#b45309',      // Deep orange
      contrast: '#ffffff'   // White text for contrast
    },
    secondary: {
      main: '#550008',      // Dark burgundy (from footer design)
      light: '#7f1d1d',     // Lighter burgundy
      dark: '#3f1515',      // Darker burgundy
      contrast: '#ffffff'   // White text for contrast
    },
    background: {
      primary: '#fef3c7',   // Warm cream background
      secondary: '#fde68a', // Light golden background
      tertiary: '#fbbf24',  // Golden tertiary background
      overlay: 'rgba(139, 69, 19, 0.8)' // Brown overlay with transparency
    },
    text: {
      primary: '#451a03',   // Dark brown text
      secondary: '#92400e', // Medium brown text
      disabled: '#a3a3a3',  // Gray disabled text
      inverse: '#ffffff'    // White inverse text
    },
    status: {
      success: '#059669',   // Green success
      warning: '#d97706',   // Orange warning (autumn themed)
      error: '#dc2626',     // Red error
      info: '#2563eb'       // Blue info
    },
    ui: {
      border: '#d97706',    // Orange border
      shadow: 'rgba(139, 69, 19, 0.2)', // Brown shadow
      highlight: '#fbbf24', // Golden highlight
      disabled: '#d1d5db'   // Gray disabled
    }
  },
  
  typography: {
    fontFamily: {
      primary: 'Inter, system-ui, sans-serif',
      secondary: 'Georgia, serif',
      monospace: 'JetBrains Mono, monospace'
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  
  spacing: {
    base: 16,
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
    base: 8,
    lg: 12,
    xl: 16,
    full: 9999
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgba(139, 69, 19, 0.05)',
    base: '0 2px 4px rgba(139, 69, 19, 0.1)',
    md: '0 4px 6px -1px rgba(139, 69, 19, 0.1)',
    lg: '0 10px 15px -3px rgba(139, 69, 19, 0.1)',
    xl: '0 20px 25px -5px rgba(139, 69, 19, 0.1)',
    '2xl': '0 25px 50px -12px rgba(139, 69, 19, 0.25)'
  },
  
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
    verySlow: 1000
  },
  
  breakpoints: {
    xs: 0,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  },
  
  // Required methods
  getColor(path: string): string {
    // Simple color getter implementation
    const colorMap: Record<string, string> = {
      'primary.main': this.colors.primary.main,
      'primary.light': this.colors.primary.light,
      'primary.dark': this.colors.primary.dark,
      'secondary.main': this.colors.secondary.main,
      'background.primary': this.colors.background.primary,
      'text.primary': this.colors.text.primary
    }
    return colorMap[path] || '#000000'
  },
  
  getSpacing(size: keyof SimpleThemeConfig['spacing']['scale']): number {
    return this.spacing.scale[size]
  },
  
  getFontSize(size: keyof SimpleThemeConfig['typography']['fontSize']): number {
    return this.typography.fontSize[size]
  },
  
  supportsDarkMode(): boolean {
    return false // Autumn theme doesn't support dark mode
  },
  
  getOppositeTheme(): string | null {
    return null // No opposite theme for autumn
  },
  
  // Theme class definitions for reusable styling
  themeClasses: {
    // Header styling
    '.header-primary': {
      backgroundColor: '#550008',
      color: '#ffffff',
      padding: 16,
      borderRadiusValue: 8,
      boxShadow: '0 4px 6px -1px rgba(139, 69, 19, 0.1)'
    },
    
    // Button styling
    '.button-primary': {
      backgroundColor: '#d97706',
      color: '#ffffff',
      padding: 12,
      borderRadiusValue: 8,
      fontWeight: 600,
      boxShadow: '0 2px 4px rgba(139, 69, 19, 0.2)'
    },
    
    '.button-secondary': {
      backgroundColor: '#550008',
      color: '#ffffff',
      padding: 12,
      borderRadiusValue: 8,
      fontWeight: 600,
      borderColor: '#d97706',
      boxShadow: '0 2px 4px rgba(139, 69, 19, 0.2)'
    },
    
    // Card styling
    '.card-default': {
      backgroundColor: '#fef3c7',
      borderColor: '#d97706',
      borderRadiusValue: 12,
      padding: 16,
      boxShadow: '0 4px 6px -1px rgba(139, 69, 19, 0.1)'
    },
    
    // Footer styling (matching existing design)
    '.footer-autumn': {
      backgroundColor: '#550008',
      color: '#ffffff',
      padding: 16,
      borderRadiusValue: 0,
      boxShadow: '0 -2px 4px rgba(139, 69, 19, 0.2)'
    },
    
    // Background container styling
    '.background-autumn': {
      backgroundColor: '#fef3c7'
    },
    
    // Text styling
    '.text-autumn-primary': {
      color: '#451a03',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontWeight: 500
    },
    
    '.text-autumn-secondary': {
      color: '#92400e',
      fontFamily: 'Georgia, serif',
      fontWeight: 400
    },
    
    // Container styling
    '.container-autumn': {
      backgroundColor: 'rgba(254, 243, 199, 0.9)',
      borderColor: '#d97706',
      borderRadiusValue: 8,
      padding: 16,
      boxShadow: '0 2px 4px rgba(139, 69, 19, 0.1)'
    },
    
    // Root container styling
    '.root-container': {
      backgroundColor: '#1a1a2e',
      borderColor: '#2a2a3e',
      borderRadiusValue: 0,
      padding: 0,
      boxShadow: '0 0 0 rgba(0, 0, 0, 0)'
    },
    
    // Responsive root container variants
    '.mobile-root': {
      backgroundColor: '#2a2a3e',
      borderColor: '#3a3a4e'
    },
    
    '.small-root': {
      backgroundColor: '#3a3a4e',
      borderColor: '#4a4a5e'
    },
    
    '.tablet-root': {
      backgroundColor: '#4a4a5e',
      borderColor: '#5a5a6e'
    },
    
    '.large-root': {
      backgroundColor: '#5a5a6e',
      borderColor: '#6a6a7e'
    },
    
    '.xl-root': {
      backgroundColor: '#6a6a7e',
      borderColor: '#7a7a8e'
    }
  }
}


