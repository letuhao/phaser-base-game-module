import Phaser from 'phaser';
import { LuckyWheelScene } from './scenes/LuckyWheelScene';

// Game configuration
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#2c3e50',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  scene: [LuckyWheelScene]
};

// Create and start the game
const game = new Phaser.Game(config);

// Make game globally accessible for debugging
(window as any).game = game;
