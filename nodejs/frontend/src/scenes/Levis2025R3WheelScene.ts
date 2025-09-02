/**
 * Levis 2025 R3 Wheel Scene
 *
 * A scene that follows the proper configuration-driven architecture.
 * Uses ConfigManager to coordinate all systems including asset loading.
 */

import { BaseScene } from '../abstract/base/BaseScene';
import { levis2025R3WheelScene1AssetConfig } from '../runtime/games/levis-2025-r3-wheel/scene-1/levis-2025-r3-wheel-scene-1.asset.config';
import { levis2025r3wheelResponsiveConfig } from '../runtime/scene/levis2025r3wheel/levis2025r3wheel.responsive.config';
import { levis2025r3wheelSceneLoaderConfig } from '../runtime/scene/levis2025r3wheel/levis2025r3wheel.scene_loader.config';
import { levis2025r3wheelLoggingConfig } from '../runtime/scene/levis2025r3wheel/levis2025r3wheel.logging.config';
import { fortuneWheelTheme } from '../runtime/games/levis-2025-r3-wheel/scene-1/fortune-wheel-theme.config';

export class Levis2025R3WheelScene extends BaseScene {
  constructor() {
    super('Levis2025R3WheelScene');
  }

  /**
   * Register all scene configurations through ConfigManager
   */
  protected registerSceneConfigs(): void {
    this.configManager.registerSceneConfigs(
      'levis2025r3wheel',
      levis2025r3wheelLoggingConfig, // Logging configuration
      levis2025r3wheelResponsiveConfig, // Responsive layout configuration
      levis2025r3wheelSceneLoaderConfig, // Scene structure configuration
      levis2025R3WheelScene1AssetConfig, // Asset loading configuration
      fortuneWheelTheme // Theme styling configuration
    );
  }

  /**
   * Get scene name for configuration loading
   */
  protected getSceneName(): string {
    return 'levis2025r3wheel';
  }

  /**
   * Scene preload - Assets are loaded by BaseScene using ConfigManager
   * This method can be overridden for scene-specific asset loading if needed
   */
  preload(): void {
    // BaseScene handles asset loading through ConfigManager
    // Call parent implementation
    super.preload();

    this.logger.info(
      'Levis2025R3WheelScene',
      'preload',
      'Asset loading handled by BaseScene through ConfigManager'
    );
  }

  /**
   * Scene create - BaseScene handles the main creation flow
   * This method can be overridden for scene-specific creation logic
   */
  async create(): Promise<void> {
    this.logger.info('Levis2025R3WheelScene', 'create', 'Starting scene creation');

    try {
      // BaseScene handles the main creation flow through ConfigManager
      // Call parent implementation
      await super.create();

      // Add scene-specific creation logic here if needed
      this.addSceneSpecificElements();

      // Activate the theme for this scene
      await this.activateSceneTheme();

      this.logger.info('Levis2025R3WheelScene', 'create', 'Scene creation completed');
    } catch (error) {
      this.logger.error('Levis2025R3WheelScene', 'create', 'Failed to create scene', { error });
      throw error;
    }
  }

  /**
   * Add scene-specific elements that aren't defined in configuration
   */
  private addSceneSpecificElements(): void {
    try {
      // Add some basic text
      this.add
        .text(this.scale.width / 2, 50, 'Levis 2025 R3 Wheel - Scene 1', {
          fontSize: '32px',
          color: '#ffffff',
          fontFamily: 'Arial',
        })
        .setOrigin(0.5, 0);

      // Add loading status text
      this.add
        .text(this.scale.width / 2, this.scale.height - 50, 'Scene Created with ConfigManager', {
          fontSize: '16px',
          color: '#ffffff',
          fontFamily: 'Arial',
        })
        .setOrigin(0.5, 1);

      this.logger.info(
        'Levis2025R3WheelScene',
        'addSceneSpecificElements',
        'Scene-specific elements added'
      );
    } catch (error) {
      this.logger.error(
        'Levis2025R3WheelScene',
        'addSceneSpecificElements',
        'Failed to add scene-specific elements',
        { error }
      );
    }
  }

  /**
   * Activate the theme for this scene
   */
  private async activateSceneTheme(): Promise<void> {
    try {
      this.logger.info('Levis2025R3WheelScene', 'activateSceneTheme', 'Activating scene theme');

      // Get the theme from the scene configs
      const theme = this.sceneConfigs.theme;
      if (theme && theme.id) {
        // Activate the theme using the BaseScene method
        await this.activateTheme(theme.id);

        this.logger.info(
          'Levis2025R3WheelScene',
          'activateSceneTheme',
          'Scene theme activated successfully',
          {
            themeId: theme.id,
            themeName: theme.name,
          }
        );
      } else {
        this.logger.warn(
          'Levis2025R3WheelScene',
          'activateSceneTheme',
          'No theme found in scene configs'
        );
      }
    } catch (error) {
      this.logger.error(
        'Levis2025R3WheelScene',
        'activateSceneTheme',
        'Failed to activate scene theme',
        { error }
      );
      // Don't throw error - theme activation failure shouldn't break the scene
    }
  }

  /**
   * Scene shutdown - BaseScene handles cleanup
   */
  async shutdown(): Promise<void> {
    this.logger.info('Levis2025R3WheelScene', 'shutdown', 'Scene shutting down');

    // Call parent shutdown
    await super.shutdown();
  }
}

export default Levis2025R3WheelScene;
