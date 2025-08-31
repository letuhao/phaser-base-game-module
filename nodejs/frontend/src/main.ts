import { Game } from './game/Game'
import { logger } from './core'

// Initialize the game when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  logger.info('Main', 'main', 'Initializing Phaser Game')
  new Game()
})
