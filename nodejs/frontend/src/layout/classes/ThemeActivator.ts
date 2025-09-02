/**
 * Theme Activator - Handles Theme Activation in Game Scenes
 *
 * Provides theme activation, application, and management functionality
 * for game scenes and game objects. Integrates with the existing
 * ThemeManager and ConfigManager systems.
 */

import { ITheme, IThemeClass } from '../interfaces/ITheme';
import { IThemeManager } from '../interfaces/IThemeManager';
import { IThemeActivationResult, IThemeApplicationContext } from '../interfaces';
import { ThemeElementType } from '../enums/LayoutEnums';
import { ThemeManager } from './ThemeManager';
import { ConfigManager } from '../../core/ConfigManager';
import { IConfigManager } from '../../core/interfaces';
import { Logger } from '../../core/Logger';

/**
 * Theme Activator Class
 *
 * Handles theme activation, application, and management for game scenes.
 * Provides integration between the theme system and game objects.
 */
export class ThemeActivator {
  private readonly logger: Logger = Logger.getInstance();
  private readonly themeManager: IThemeManager;
  private readonly configManager: IConfigManager;
  private readonly activationHistory: Map<string, IThemeActivationResult> = new Map();
  private readonly activeThemes: Map<string, ITheme> = new Map();
  private readonly appliedClasses: Map<string, Set<string>> = new Map();

  constructor(themeManager?: IThemeManager, configManager?: IConfigManager) {
    this.themeManager = themeManager || new ThemeManager();
    this.configManager = configManager || ConfigManager.getInstance();

    this.logger.info('ThemeActivator', 'constructor', 'Theme activator initialized');
  }

  // ============================================================================
  // THEME ACTIVATION METHODS
  // ============================================================================

  /**
   * Activate a theme for a specific scene
   */
  async activateThemeForScene(
    sceneKey: string,
    themeId: string,
    context?: Partial<IThemeApplicationContext>
  ): Promise<IThemeActivationResult> {
    const startTime = performance.now();
    const result: IThemeActivationResult = {
      success: false,
      themeId,
      appliedClasses: [],
      errors: [],
      duration: 0,
    };

    try {
      this.logger.info('ThemeActivator', 'activateThemeForScene', 'Activating theme for scene', {
        sceneKey,
        themeId,
      });

      // Get theme from ConfigManager or ThemeManager
      const theme = this.getTheme(themeId);
      if (!theme) {
        result.errors.push(`Theme not found: ${themeId}`);
        return result;
      }

      // Create application context
      const applicationContext: IThemeApplicationContext = {
        sceneKey,
        elementType: ThemeElementType.SCENE,
        priority: 1,
        ...context,
      };

      // Apply theme to scene
      await this.applyThemeToScene(theme, applicationContext);

      // Store active theme
      this.activeThemes.set(sceneKey, theme);

      // Record activation
      result.success = true;
      result.appliedClasses = this.getAppliedClasses(sceneKey);
      result.duration = performance.now() - startTime;

      this.activationHistory.set(`${sceneKey}:${themeId}`, result);

      this.logger.info('ThemeActivator', 'activateThemeForScene', 'Theme activated successfully', {
        sceneKey,
        themeId,
        duration: result.duration,
        appliedClasses: result.appliedClasses.length,
      });

      return result;
    } catch (error) {
      result.errors.push(`Activation failed: ${error}`);
      result.duration = performance.now() - startTime;

      this.logger.error('ThemeActivator', 'activateThemeForScene', 'Theme activation failed', {
        error,
        sceneKey,
        themeId,
      });

      return result;
    }
  }

  /**
   * Apply theme to a game object
   */
  async applyThemeToGameObject(
    gameObject: Phaser.GameObjects.GameObject,
    themeId: string,
    context?: Partial<IThemeApplicationContext>
  ): Promise<IThemeActivationResult> {
    const startTime = performance.now();
    const result: IThemeActivationResult = {
      success: false,
      themeId,
      appliedClasses: [],
      errors: [],
      duration: 0,
    };

    try {
      this.logger.debug(
        'ThemeActivator',
        'applyThemeToGameObject',
        'Applying theme to game object',
        {
          gameObjectType: gameObject.constructor.name,
          themeId,
        }
      );

      // Get theme
      const theme = this.getTheme(themeId);
      if (!theme) {
        result.errors.push(`Theme not found: ${themeId}`);
        return result;
      }

      // Create application context
      const applicationContext: IThemeApplicationContext = {
        sceneKey: gameObject.scene?.scene.key || 'unknown',
        gameObjectId: gameObject.name || gameObject.constructor.name,
        elementType: ThemeElementType.GAME_OBJECT,
        priority: 2,
        ...context,
      };

      // Apply theme to game object
      await this.applyThemeToGameObjectInternal(gameObject, theme, applicationContext);

      result.success = true;
      result.appliedClasses = this.getAppliedClasses(applicationContext.sceneKey);
      result.duration = performance.now() - startTime;

      this.logger.debug(
        'ThemeActivator',
        'applyThemeToGameObject',
        'Theme applied to game object',
        {
          gameObjectType: gameObject.constructor.name,
          themeId,
          duration: result.duration,
        }
      );

      return result;
    } catch (error) {
      result.errors.push(`Application failed: ${error}`);
      result.duration = performance.now() - startTime;

      this.logger.error('ThemeActivator', 'applyThemeToGameObject', 'Theme application failed', {
        error,
        gameObjectType: gameObject.constructor.name,
        themeId,
      });

      return result;
    }
  }

  /**
   * Switch theme for a scene
   */
  async switchThemeForScene(
    sceneKey: string,
    newThemeId: string,
    context?: Partial<IThemeApplicationContext>
  ): Promise<IThemeActivationResult> {
    try {
      this.logger.info('ThemeActivator', 'switchThemeForScene', 'Switching theme for scene', {
        sceneKey,
        newThemeId,
      });

      // Deactivate current theme
      await this.deactivateThemeForScene(sceneKey);

      // Activate new theme
      const result = await this.activateThemeForScene(sceneKey, newThemeId, context);

      this.logger.info('ThemeActivator', 'switchThemeForScene', 'Theme switched successfully', {
        sceneKey,
        newThemeId,
        success: result.success,
      });

      return result;
    } catch (error) {
      this.logger.error('ThemeActivator', 'switchThemeForScene', 'Theme switch failed', {
        error,
        sceneKey,
        newThemeId,
      });
      throw error;
    }
  }

  /**
   * Deactivate theme for a scene
   */
  async deactivateThemeForScene(sceneKey: string): Promise<void> {
    try {
      this.logger.info(
        'ThemeActivator',
        'deactivateThemeForScene',
        'Deactivating theme for scene',
        {
          sceneKey,
        }
      );

      // Remove applied classes
      this.removeAppliedClasses(sceneKey);

      // Remove from active themes
      this.activeThemes.delete(sceneKey);

      this.logger.info(
        'ThemeActivator',
        'deactivateThemeForScene',
        'Theme deactivated successfully',
        {
          sceneKey,
        }
      );
    } catch (error) {
      this.logger.error('ThemeActivator', 'deactivateThemeForScene', 'Theme deactivation failed', {
        error,
        sceneKey,
      });
      throw error;
    }
  }

  // ============================================================================
  // THEME ACCESS METHODS
  // ============================================================================

  /**
   * Get active theme for a scene
   */
  getActiveThemeForScene(sceneKey: string): ITheme | null {
    return this.activeThemes.get(sceneKey) || null;
  }

  /**
   * Get all active themes
   */
  getAllActiveThemes(): Map<string, ITheme> {
    return new Map(this.activeThemes);
  }

  /**
   * Check if a theme is active for a scene
   */
  isThemeActiveForScene(sceneKey: string, themeId: string): boolean {
    const activeTheme = this.activeThemes.get(sceneKey);
    return activeTheme?.id === themeId;
  }

  /**
   * Get applied classes for a scene
   */
  getAppliedClasses(sceneKey: string): string[] {
    const classes = this.appliedClasses.get(sceneKey);
    return classes ? Array.from(classes) : [];
  }

  /**
   * Get activation history
   */
  getActivationHistory(): Map<string, IThemeActivationResult> {
    return new Map(this.activationHistory);
  }

  // ============================================================================
  // THEME UTILITY METHODS
  // ============================================================================

  /**
   * Get available themes for a scene
   */
  getAvailableThemesForScene(sceneKey: string): ITheme[] {
    // Get themes from ConfigManager
    const configThemes = this.configManager.getAllThemes();

    // Filter themes based on scene requirements
    return Array.from(configThemes.values()).filter(theme =>
      this.isThemeCompatibleWithScene(theme, sceneKey)
    );
  }

  /**
   * Get theme by ID from multiple sources
   */
  private getTheme(themeId: string): ITheme | null {
    // Try ConfigManager first
    const configTheme = this.configManager.getTheme(themeId);
    if (configTheme) {
      return configTheme;
    }

    // Try ThemeManager
    const managerTheme = this.themeManager.getTheme(themeId);
    if (managerTheme) {
      return managerTheme;
    }

    return null;
  }

  /**
   * Check if theme is compatible with scene
   */
  private isThemeCompatibleWithScene(theme: ITheme, _sceneKey: string): boolean {
    // Basic compatibility check
    // Can be extended with more complex logic
    return !!(theme && theme.id && theme.name);
  }

  /**
   * Apply theme to scene
   */
  private async applyThemeToScene(theme: ITheme, context: IThemeApplicationContext): Promise<void> {
    try {
      // Apply theme classes to scene
      if (theme.themeClasses) {
        await this.applyThemeClasses(theme.themeClasses, context);
      }

      // Apply theme properties to scene
      await this.applyThemeProperties(theme, context);

      this.logger.debug('ThemeActivator', 'applyThemeToScene', 'Theme applied to scene', {
        sceneKey: context.sceneKey,
        themeId: theme.id,
      });
    } catch (error) {
      this.logger.error('ThemeActivator', 'applyThemeToScene', 'Failed to apply theme to scene', {
        error,
        sceneKey: context.sceneKey,
        themeId: theme.id,
      });
      throw error;
    }
  }

  /**
   * Apply theme to game object internally
   */
  private async applyThemeToGameObjectInternal(
    gameObject: Phaser.GameObjects.GameObject,
    theme: ITheme,
    context: IThemeApplicationContext
  ): Promise<void> {
    try {
      // Apply theme classes to game object
      if (theme.themeClasses) {
        await this.applyThemeClassesToGameObject(gameObject, theme.themeClasses, context);
      }

      // Apply theme properties to game object
      await this.applyThemePropertiesToGameObject(gameObject, theme, context);

      this.logger.debug(
        'ThemeActivator',
        'applyThemeToGameObjectInternal',
        'Theme applied to game object',
        {
          gameObjectType: gameObject.constructor.name,
          themeId: theme.id,
        }
      );
    } catch (error) {
      this.logger.error(
        'ThemeActivator',
        'applyThemeToGameObjectInternal',
        'Failed to apply theme to game object',
        {
          error,
          gameObjectType: gameObject.constructor.name,
          themeId: theme.id,
        }
      );
      throw error;
    }
  }

  /**
   * Apply theme classes
   */
  private async applyThemeClasses(
    themeClasses: Record<string, IThemeClass>,
    context: IThemeApplicationContext
  ): Promise<void> {
    for (const [className, themeClass] of Object.entries(themeClasses)) {
      try {
        // Apply class to scene
        await this.applyThemeClass(className, themeClass, context);

        // Track applied class
        this.trackAppliedClass(context.sceneKey, className);
      } catch (error) {
        this.logger.warn('ThemeActivator', 'applyThemeClasses', 'Failed to apply theme class', {
          error,
          className,
          sceneKey: context.sceneKey,
        });
      }
    }
  }

  /**
   * Apply theme classes to game object
   */
  private async applyThemeClassesToGameObject(
    gameObject: Phaser.GameObjects.GameObject,
    themeClasses: Record<string, IThemeClass>,
    context: IThemeApplicationContext
  ): Promise<void> {
    for (const [className, themeClass] of Object.entries(themeClasses)) {
      try {
        // Apply class to game object
        await this.applyThemeClassToGameObject(gameObject, className, themeClass, context);

        // Track applied class
        this.trackAppliedClass(context.sceneKey, className);
      } catch (error) {
        this.logger.warn(
          'ThemeActivator',
          'applyThemeClassesToGameObject',
          'Failed to apply theme class to game object',
          {
            error,
            className,
            gameObjectType: gameObject.constructor.name,
          }
        );
      }
    }
  }

  /**
   * Apply theme class
   */
  private async applyThemeClass(
    className: string,
    _themeClass: IThemeClass,
    context: IThemeApplicationContext
  ): Promise<void> {
    // Apply theme class to scene
    // This is a placeholder - actual implementation depends on scene structure
    this.logger.debug('ThemeActivator', 'applyThemeClass', 'Applying theme class to scene', {
      className,
      sceneKey: context.sceneKey,
    });
  }

  /**
   * Apply theme class to game object
   */
  private async applyThemeClassToGameObject(
    gameObject: Phaser.GameObjects.GameObject,
    className: string,
    _themeClass: IThemeClass,
    _context: IThemeApplicationContext
  ): Promise<void> {
    // Apply theme class to game object
    // This is a placeholder - actual implementation depends on game object type
    this.logger.debug(
      'ThemeActivator',
      'applyThemeClassToGameObject',
      'Applying theme class to game object',
      {
        className,
        gameObjectType: gameObject.constructor.name,
      }
    );
  }

  /**
   * Apply theme properties
   */
  private async applyThemeProperties(
    theme: ITheme,
    context: IThemeApplicationContext
  ): Promise<void> {
    // Apply theme properties to scene
    // This is a placeholder - actual implementation depends on scene structure
    this.logger.debug(
      'ThemeActivator',
      'applyThemeProperties',
      'Applying theme properties to scene',
      {
        sceneKey: context.sceneKey,
        themeId: theme.id,
      }
    );
  }

  /**
   * Apply theme properties to game object
   */
  private async applyThemePropertiesToGameObject(
    gameObject: Phaser.GameObjects.GameObject,
    theme: ITheme,
    _context: IThemeApplicationContext
  ): Promise<void> {
    // Apply theme properties to game object
    // This is a placeholder - actual implementation depends on game object type
    this.logger.debug(
      'ThemeActivator',
      'applyThemePropertiesToGameObject',
      'Applying theme properties to game object',
      {
        gameObjectType: gameObject.constructor.name,
        themeId: theme.id,
      }
    );
  }

  /**
   * Track applied class
   */
  private trackAppliedClass(sceneKey: string, className: string): void {
    if (!this.appliedClasses.has(sceneKey)) {
      this.appliedClasses.set(sceneKey, new Set());
    }
    this.appliedClasses.get(sceneKey)!.add(className);
  }

  /**
   * Remove applied classes
   */
  private removeAppliedClasses(sceneKey: string): void {
    this.appliedClasses.delete(sceneKey);
  }

  // ============================================================================
  // LIFECYCLE METHODS
  // ============================================================================

  /**
   * Reset the activator
   */
  reset(): void {
    this.activationHistory.clear();
    this.activeThemes.clear();
    this.appliedClasses.clear();

    this.logger.info('ThemeActivator', 'reset', 'Theme activator reset');
  }

  /**
   * Destroy the activator
   */
  destroy(): void {
    this.reset();
    this.logger.info('ThemeActivator', 'destroy', 'Theme activator destroyed');
  }
}
