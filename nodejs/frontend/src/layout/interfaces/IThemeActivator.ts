/**
 * Theme Activator Interface
 *
 * Defines the contract for theme activation and application
 * in game scenes and game objects.
 */

import { ITheme } from './ITheme';
import { IThemeActivationResult, IThemeApplicationContext } from './';

/**
 * Theme Activator Interface
 *
 * Provides theme activation, application, and management functionality
 * for game scenes and game objects.
 */
export interface IThemeActivator {
  // ============================================================================
  // THEME ACTIVATION METHODS
  // ============================================================================

  /**
   * Activate a theme for a specific scene
   */
  activateThemeForScene(
    sceneKey: string,
    themeId: string,
    context?: Partial<IThemeApplicationContext>
  ): Promise<IThemeActivationResult>;

  /**
   * Apply theme to a game object
   */
  applyThemeToGameObject(
    gameObject: Phaser.GameObjects.GameObject,
    themeId: string,
    context?: Partial<IThemeApplicationContext>
  ): Promise<IThemeActivationResult>;

  /**
   * Switch theme for a scene
   */
  switchThemeForScene(
    sceneKey: string,
    newThemeId: string,
    context?: Partial<IThemeApplicationContext>
  ): Promise<IThemeActivationResult>;

  /**
   * Deactivate theme for a scene
   */
  deactivateThemeForScene(sceneKey: string): Promise<void>;

  // ============================================================================
  // THEME ACCESS METHODS
  // ============================================================================

  /**
   * Get active theme for a scene
   */
  getActiveThemeForScene(sceneKey: string): ITheme | null;

  /**
   * Get all active themes
   */
  getAllActiveThemes(): Map<string, ITheme>;

  /**
   * Check if a theme is active for a scene
   */
  isThemeActiveForScene(sceneKey: string, themeId: string): boolean;

  /**
   * Get applied classes for a scene
   */
  getAppliedClasses(sceneKey: string): string[];

  /**
   * Get activation history
   */
  getActivationHistory(): Map<string, IThemeActivationResult>;

  // ============================================================================
  // THEME UTILITY METHODS
  // ============================================================================

  /**
   * Get available themes for a scene
   */
  getAvailableThemesForScene(sceneKey: string): ITheme[];

  // ============================================================================
  // LIFECYCLE METHODS
  // ============================================================================

  /**
   * Reset the activator
   */
  reset(): void;

  /**
   * Destroy the activator
   */
  destroy(): void;
}
