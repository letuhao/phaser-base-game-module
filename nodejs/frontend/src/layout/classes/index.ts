/**
 * Layout System Classes Index
 * Exports all theme-related classes for easy importing
 */

// ============================================================================
// THEME CLASSES
// ============================================================================

export { ThemeManager } from './ThemeManager';
export { ThemeClassManager } from './ThemeClassManager';
export { ThemeStyleEngine } from './ThemeStyleEngine';
export { ThemeActivator } from './ThemeActivator';

// ============================================================================
// CLASS BUNDLES
// ============================================================================

// Theme classes bundle
export const THEME_CLASSES = [
  'ThemeManager',
  'ThemeClassManager',
  'ThemeStyleEngine',
  'ThemeActivator',
] as const;

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * RECOMMENDED USAGE PATTERNS:
 *
 * 1. Import specific classes:
 *    import { ThemeManager, ThemeActivator } from './classes';
 *
 * 2. Import all theme classes:
 *    import { THEME_CLASSES } from './classes';
 *
 * 3. Import with interfaces:
 *    import { ThemeManager, IThemeManager } from './classes';
 *    import { IThemeManager } from './interfaces';
 */
