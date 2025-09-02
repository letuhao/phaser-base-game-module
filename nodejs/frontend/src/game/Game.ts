import { BaseGame, BaseGameConfig } from './BaseGame';
import { Levis2025R3WheelScene } from '../scenes/Levis2025R3WheelScene';
import { logger } from '../core';

export class Game {
  private baseGame: BaseGame;

  constructor() {
    logger.debug('Game', 'constructor', 'Initializing minimal game with asset system');

    // Create base game configuration
    const baseGameConfig: BaseGameConfig = {
      gameId: 'levis-2025-r3-wheel-game',
      phaserConfig: {
        backgroundColor: '#1a1a2e',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 0 },
            debug: false,
          },
        },
      },
    };

    // Create base game
    this.baseGame = new BaseGame(baseGameConfig);

    // Add the scene - the scene handles its own asset loading
    const scene = new Levis2025R3WheelScene();
    this.baseGame.addScene(scene);

    logger.info('Game', 'constructor', 'Game initialized successfully', {
      sceneKey: 'Levis2025R3WheelScene',
      gameId: baseGameConfig.gameId,
    });
  }

  /**
   * Start the game
   */
  async start(): Promise<void> {
    try {
      logger.info('Game', 'start', 'Starting game');

      // Start the scene - asset loading is handled by the scene
      this.baseGame.startScene('Levis2025R3WheelScene');

      logger.info('Game', 'start', 'Game started successfully');
    } catch (error) {
      logger.error('Game', 'start', 'Failed to start game', { error });
      throw error;
    }
  }

  /**
   * Get the base game instance
   */
  getBaseGame(): BaseGame {
    return this.baseGame;
  }

  destroy(): void {
    if (this.baseGame) {
      logger.info('Game', 'destroy', 'Destroying game');
      this.baseGame.destroy();
      logger.debug('Game', 'destroy', 'Game destroyed successfully');
    }
  }
}
