/**
 * Base Game Class
 *
 * Minimal base game class that provides core Phaser game functionality.
 * Follows SOLID principles by having a single responsibility - only Phaser game management.
 */

import * as Phaser from 'phaser';
import { Logger } from '../core/Logger';

export interface BaseGameConfig {
  gameId: string;
  phaserConfig?: Partial<Phaser.Types.Core.GameConfig>;
}

export class BaseGame {
  private game: Phaser.Game;
  private logger: Logger = Logger.getInstance();
  private config: BaseGameConfig;

  constructor(config: BaseGameConfig) {
    this.config = config;
    this.logger.debug('BaseGame', 'constructor', 'Initializing minimal base game', {
      gameId: config.gameId,
    });

    // Create Phaser game configuration
    const defaultPhaserConfig: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: 'game-container',
      backgroundColor: '#1a1a2e',
      scene: [], // Scenes will be added dynamically
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };

    // Merge with provided config
    const phaserConfig = { ...defaultPhaserConfig, ...config.phaserConfig };

    this.logger.info('BaseGame', 'constructor', 'Creating Phaser game instance', {
      width: phaserConfig.width,
      height: phaserConfig.height,
    });

    this.game = new Phaser.Game(phaserConfig);
  }

  /**
   * Get the game configuration
   */
  getConfig(): BaseGameConfig {
    return this.config;
  }

  /**
   * Get the Phaser game instance
   */
  getGame(): Phaser.Game {
    return this.game;
  }

  /**
   * Add a scene to the game
   */
  addScene(scene: Phaser.Scene): void {
    // Get the scene key from the scene's settings
    const sceneKey = scene.sys.settings.key;
    this.game.scene.add(sceneKey, scene);
  }

  /**
   * Start a scene
   */
  startScene(sceneKey: string): void {
    this.game.scene.start(sceneKey);
  }

  /**
   * Destroy the game
   */
  destroy(): void {
    if (this.game) {
      this.logger.info('BaseGame', 'destroy', 'Destroying Phaser game instance');
      this.game.destroy(true);
      this.logger.debug('BaseGame', 'destroy', 'Phaser game instance destroyed successfully');
    }
  }
}
