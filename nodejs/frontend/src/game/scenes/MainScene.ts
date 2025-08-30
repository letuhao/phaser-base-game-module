import Phaser from 'phaser'

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })
  }

  preload(): void {
    // Load game assets here
    this.load.setBaseURL('http://labs.phaser.io')
    this.load.image('sky', 'assets/skies/space3.png')
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.image('red', 'assets/particles/red.png')
  }

  create(): void {
    // Add background
    this.add.image(400, 300, 'sky')
    
    // Add logo
    const logo = this.add.image(400, 200, 'logo')
    logo.setScale(0.5)
    
    // Add some text
    this.add.text(400, 400, 'Welcome to Phaser Game!', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)
    
    // Add interactive elements
    this.add.text(400, 450, 'Click anywhere to start', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5)
    
    // Make the scene interactive
    this.input.on('pointerdown', () => {
      this.scene.restart()
    })
  }

  update(): void {
    // Game loop logic here
  }
}
