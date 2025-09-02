/**
 * Levis 2025 R3 Wheel Scene
 *
 * A scene that uses the asset system with the levis-2025-r3-wheel-scene-1.asset.config.ts
 * The scene handles concrete logic, while the asset manager handles abstract logic.
 */

import * as Phaser from 'phaser';
import { Logger } from '../core/Logger';
import { AssetManager } from '../asset/classes/AssetManager';
import { SceneAssetConfigLoader } from '../asset/classes/SceneAssetConfigLoader';
import type { IAssetManager } from '../asset/interfaces/IAssetManager';
import type { ISceneAssetLoader } from '../asset/interfaces/scene/ISceneAssetLoader';
import { levis2025R3WheelScene1AssetConfig } from '../runtime/games/levis-2025-r3-wheel/scene-1/levis-2025-r3-wheel-scene-1.asset.config';

export class Levis2025R3WheelScene extends Phaser.Scene {
  private logger: Logger = Logger.getInstance();
  private assetManager: IAssetManager;
  private sceneAssetLoader: ISceneAssetLoader;
  private backgroundImage: Phaser.GameObjects.Image | null = null;
  private assetsLoaded: boolean = false;

  constructor() {
    super({ key: 'Levis2025R3WheelScene' });

    // Initialize asset system with the concrete config
    this.assetManager = new AssetManager('levis-2025-r3-wheel-asset-manager');

    // Create scene asset loader with the concrete config
    this.sceneAssetLoader = new SceneAssetConfigLoader(
      'levis-2025-r3-wheel-loader',
      levis2025R3WheelScene1AssetConfig.sceneId,
      this.assetManager,
      levis2025R3WheelScene1AssetConfig as any // Type assertion for now
    ) as ISceneAssetLoader;
  }

  /**
   * Scene preload - Load assets using the asset system
   */
  async preload(): Promise<void> {
    this.logger.info(
      'Levis2025R3WheelScene',
      'preload',
      'Starting asset loading with asset system'
    );

    try {
      // Single call to asset system - it handles everything
      await this.sceneAssetLoader.loadSceneAssets();
      this.assetsLoaded = true;

      this.logger.info(
        'Levis2025R3WheelScene',
        'preload',
        'Assets loaded successfully by asset system'
      );
    } catch (error) {
      this.logger.error('Levis2025R3WheelScene', 'preload', 'Failed to load assets', { error });
      throw error;
    }
  }

  /**
   * Scene create - Create game objects using loaded assets
   */
  create(): void {
    this.logger.info('Levis2025R3WheelScene', 'create', 'Creating scene objects');

    if (!this.assetsLoaded) {
      this.logger.warn(
        'Levis2025R3WheelScene',
        'create',
        'Assets not loaded, skipping object creation'
      );
      return;
    }

    try {
      // Determine which background to use based on screen size
      const isMobile = this.scale.width < 768;
      const backgroundKey = isMobile ? 'levis2025r3wheel-mobile-bg' : 'levis2025r3wheel-desktop-bg';

      // Check if the asset is loaded using the asset manager
      if (this.assetManager.isAssetLoaded(backgroundKey)) {
        // Create background image
        this.backgroundImage = this.add.image(
          this.scale.width / 2,
          this.scale.height / 2,
          backgroundKey
        );

        // Scale the background to fit the screen
        this.scaleBackground();

        this.logger.info('Levis2025R3WheelScene', 'create', 'Background created successfully', {
          backgroundKey,
          screenWidth: this.scale.width,
          screenHeight: this.scale.height,
        });
      } else {
        this.logger.warn('Levis2025R3WheelScene', 'create', 'Background asset not loaded', {
          backgroundKey,
        });
      }

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
        .text(
          this.scale.width / 2,
          this.scale.height - 50,
          `Assets Loaded: ${this.assetsLoaded ? 'Yes' : 'No'}`,
          {
            fontSize: '16px',
            color: '#ffffff',
            fontFamily: 'Arial',
          }
        )
        .setOrigin(0.5, 1);

      this.logger.info('Levis2025R3WheelScene', 'create', 'Scene created successfully');
    } catch (error) {
      this.logger.error('Levis2025R3WheelScene', 'create', 'Failed to create scene objects', {
        error,
      });
    }
  }

  /**
   * Scale background to fit screen
   */
  private scaleBackground(): void {
    if (!this.backgroundImage) return;

    const { width: screenWidth, height: screenHeight } = this.scale;
    const { width: imageWidth, height: imageHeight } = this.backgroundImage;

    // Calculate scale to cover the entire screen
    const scaleX = screenWidth / imageWidth;
    const scaleY = screenHeight / imageHeight;
    const scale = Math.max(scaleX, scaleY);

    this.backgroundImage.setScale(scale);
  }

  /**
   * Handle window resize
   */
  private handleResize(): void {
    if (this.backgroundImage) {
      this.scaleBackground();
    }
  }

  /**
   * Scene update
   */
  update(): void {
    // Handle resize events
    if (this.scale.width !== this.lastResizeWidth) {
      this.lastResizeWidth = this.scale.width;
      this.handleResize();
    }
  }

  private lastResizeWidth: number = 0;

  /**
   * Scene shutdown
   */
  shutdown(): void {
    this.logger.info('Levis2025R3WheelScene', 'shutdown', 'Scene shutting down');

    // Clean up references
    this.backgroundImage = null;
    this.assetsLoaded = false;
  }
}

export default Levis2025R3WheelScene;
