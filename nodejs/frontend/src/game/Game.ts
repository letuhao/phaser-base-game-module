import Phaser from 'phaser';
import { Levis2025R3WheelScene } from '../scenes/Levis2025R3WheelScene';
import { logger } from '../core';

export class Game {
  private game: Phaser.Game;

  constructor() {
    logger.debug('Game', 'unknown', 'constructor', 'Initializing Phaser game configuration');

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: 'game-container',
      backgroundColor: '#1a1a2e',
      scene: [Levis2025R3WheelScene],
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

    logger.info('Game', 'constructor', 'Creating Phaser game instance', {
      width: config.width,
      height: config.height,
      scaleMode: config.scale?.mode,
    });

    this.game = new Phaser.Game(config);

    logger.debug('Game', 'unknown', 'constructor', 'Phaser game instance created successfully');
  }

  destroy(): void {
    if (this.game) {
      logger.info('Game', 'destroy', 'destroy', 'Destroying Phaser game instance');
      this.game.destroy(true);
      logger.debug('Game', 'destroy', 'destroy', 'Phaser game instance destroyed successfully');
    }
  }
}
