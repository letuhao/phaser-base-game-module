/**
 * Theme System Usage Example
 * 
 * This file demonstrates how to use the flexible theme system
 * without concrete implementations. Shows the power of our
 * abstract, configurable design.
 */

import { IThemeManager } from '../../../../layout/interfaces/IThemeManager';
import { fortuneWheelTheme } from './fortune-wheel-theme.config';
import { logger } from '../../../../core/Logger';

/**
 * Simple Theme Usage Example
 * 
 * This example shows how to use the theme system in a flexible way.
 * You can adapt this pattern to any game or application.
 */
export class ThemeUsageExample {
  private themeManager: IThemeManager;

  constructor(themeManager: IThemeManager) {
    this.themeManager = themeManager;
  }

  /**
   * Initialize theme system
   */
  async initializeTheme(): Promise<void> {
    logger.info('ThemeUsageExample', 'initializeTheme', 'Initializing theme system');
    
    try {
      // Register the fortune wheel theme
      await this.themeManager.registerTheme(fortuneWheelTheme);
      
      // Initialize with the theme
      await this.themeManager.initialize('fortune-wheel-theme');
      
      logger.info('ThemeUsageExample', 'initializeTheme', 'Theme system initialized successfully');
    } catch (error) {
      logger.error('ThemeUsageExample', 'initializeTheme', 'Failed to initialize theme system', { error });
      throw error;
    }
  }

  /**
   * Get theme colors for any element
   */
  getThemeColors() {
    return {
      primary: this.themeManager.getColor('primary.main'),
      secondary: this.themeManager.getColor('secondary.main'),
      background: this.themeManager.getColor('background.main'),
      text: this.themeManager.getColor('text.primary')
    };
  }

  /**
   * Get theme spacing values
   */
  getThemeSpacing() {
    return {
      small: this.themeManager.getSpacing('sm'),
      medium: this.themeManager.getSpacing('md'),
      large: this.themeManager.getSpacing('lg'),
      extraLarge: this.themeManager.getSpacing('xl')
    };
  }

  /**
   * Get theme typography
   */
  getThemeTypography() {
    return {
      small: this.themeManager.getFontSize('sm'),
      base: this.themeManager.getFontSize('base'),
      large: this.themeManager.getFontSize('lg'),
      extraLarge: this.themeManager.getFontSize('xl')
    };
  }

  /**
   * Apply theme to any DOM element
   */
  applyThemeToElement(element: HTMLElement, themeClass: string): void {
    const themeClassData = this.themeManager.getThemeClass(themeClass);
    
    if (!themeClassData) {
      logger.warn('ThemeUsageExample', 'applyThemeToElement', 'Theme class not found', { themeClass });
      return;
    }

    // Apply styles flexibly
    this.applyStylesToElement(element, themeClassData);
  }

  /**
   * Apply styles from theme class to element
   */
  private applyStylesToElement(element: HTMLElement, themeClass: any): void {
    // Apply any available styles
    if (themeClass.backgroundColor) {
      element.style.backgroundColor = themeClass.backgroundColor;
    }
    if (themeClass.color) {
      element.style.color = themeClass.color;
    }
    if (themeClass.padding) {
      element.style.padding = `${themeClass.padding}px`;
    }
    if (themeClass.margin) {
      element.style.margin = `${themeClass.margin}px`;
    }
    if (themeClass.borderRadius) {
      element.style.borderRadius = `${themeClass.borderRadius}px`;
    }
    if (themeClass.fontSize) {
      element.style.fontSize = `${themeClass.fontSize}px`;
    }
    if (themeClass.fontWeight) {
      element.style.fontWeight = themeClass.fontWeight.toString();
    }
    if (themeClass.textAlign) {
      element.style.textAlign = themeClass.textAlign;
    }
    if (themeClass.display) {
      element.style.display = themeClass.display;
    }
    if (themeClass.flexDirection) {
      element.style.flexDirection = themeClass.flexDirection;
    }
    if (themeClass.alignItems) {
      element.style.alignItems = themeClass.alignItems;
    }
    if (themeClass.justifyContent) {
      element.style.justifyContent = themeClass.justifyContent;
    }
    if (themeClass.cursor) {
      element.style.cursor = themeClass.cursor;
    }
    if (themeClass.boxSizing) {
      element.style.boxSizing = themeClass.boxSizing;
    }
    if (themeClass.position) {
      element.style.position = themeClass.position;
    }
    if (themeClass.boxShadow) {
      element.style.boxShadow = themeClass.boxShadow;
    }
    if (themeClass.transition) {
      element.style.transition = themeClass.transition;
    }
    if (themeClass.cssAnimation) {
      element.style.animation = themeClass.cssAnimation;
    }
  }

  /**
   * Create a themed element with any tag and class
   */
  createThemedElement(tagName: string, themeClass: string, content?: string): HTMLElement {
    const element = document.createElement(tagName);
    
    if (content) {
      element.textContent = content;
    }
    
    this.applyThemeToElement(element, themeClass);
    
    return element;
  }

  /**
   * Get theme status for debugging
   */
  getThemeStatus() {
    return {
      isInitialized: this.themeManager.isInitialized,
      activeTheme: this.themeManager.activeTheme?.id || null,
      registeredThemes: Array.from(this.themeManager.themes.keys()),
      themeClasses: this.themeManager.activeTheme?.themeClasses ? Object.keys(this.themeManager.activeTheme.themeClasses) : [],
      colors: this.getThemeColors(),
      spacing: this.getThemeSpacing(),
      typography: this.getThemeTypography()
    };
  }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * Example 1: Basic Theme Usage
 * 
 * ```typescript
 * import { ThemeManager } from '../../../../layout/classes/ThemeManager';
 * 
 * // Create concrete theme manager implementation
 * const themeManager = new ThemeManager();
 * 
 * // Inject theme manager into example (using interface)
 * const themeExample = new ThemeUsageExample(themeManager);
 * 
 * // Initialize theme
 * await themeExample.initializeTheme();
 * 
 * // Create themed elements
 * const button = themeExample.createThemedElement('button', '.spin-button', 'Click Me');
 * const container = themeExample.createThemedElement('div', '.game-container');
 * 
 * // Apply theme to existing elements
 * const existingElement = document.getElementById('my-element');
 * themeExample.applyThemeToElement(existingElement, '.prize-modal');
 * 
 * // Get theme values
 * const colors = themeExample.getThemeColors();
 * const spacing = themeExample.getThemeSpacing();
 * ```
 */

/**
 * Example 2: Flexible Game Integration
 * 
 * ```typescript
 * import { IThemeManager } from '../../../../layout/interfaces/IThemeManager';
 * import { ThemeManager } from '../../../../layout/classes/ThemeManager';
 * 
 * // In your game class
 * class MyGame {
 *   private themeExample: ThemeUsageExample;
 *   
 *   constructor(themeManager: IThemeManager) {
 *     this.themeExample = new ThemeUsageExample(themeManager);
 *   }
 *   
 *   async initialize() {
 *     // Initialize theme
 *     await this.themeExample.initializeTheme();
 *     
 *     // Create game UI with theme
 *     this.createGameUI();
 *   }
 *   
 *   private createGameUI() {
 *     // Create any game elements with theme
 *     const gameContainer = this.themeExample.createThemedElement('div', '.game-container');
 *     const wheel = this.themeExample.createThemedElement('div', '.wheel-container');
 *     const button = this.themeExample.createThemedElement('button', '.spin-button', 'SPIN');
 *     
 *     // Add to DOM
 *     document.body.appendChild(gameContainer);
 *     gameContainer.appendChild(wheel);
 *     gameContainer.appendChild(button);
 *   }
 * }
 * 
 * // Usage - create concrete implementation and inject via interface
 * const themeManager = new ThemeManager();
 * const game = new MyGame(themeManager);
 * await game.initialize();
 * ```
 */

/**
 * Example 3: Dynamic Theme Switching
 * 
 * ```typescript
 * import { IThemeManager } from '../../../../layout/interfaces/IThemeManager';
 * 
 * // Switch themes dynamically
 * await themeManager.switchTheme('different-theme-id');
 * 
 * // Reapply theme to all elements
 * document.querySelectorAll('.themed-element').forEach(element => {
 *   themeExample.applyThemeToElement(element, '.spin-button');
 * });
 * ```
 */