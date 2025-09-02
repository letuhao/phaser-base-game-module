import { Game } from './game/Game';
import { logger } from './core';

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  logger.info('Main', 'unknown', 'main', 'Initializing Phaser Game');

  try {
    const game = new Game();
    await game.start();
    logger.info('Main', 'unknown', 'main', 'Game started successfully');
  } catch (error) {
    logger.error('Main', 'unknown', 'Failed to start game', { error });
  }
});
