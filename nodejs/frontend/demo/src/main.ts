import Phaser from 'phaser';

// ===== GAME CONSTANTS =====
const GAME_CONSTANTS = {
  // Responsive breakpoints
  MOBILE_BREAKPOINT: 1024, // Screen width below this is considered mobile
  
  // Aspect ratios
  DESKTOP_ASPECT_RATIO: 16 / 9, // 16:9 aspect ratio for desktop
  
  // Wheel settings
  WHEEL_MIN_RADIUS: 150, // Minimum wheel radius
  WHEEL_SIZE_RATIO: 0.25, // Wheel size as ratio of container size
  
  // UI positioning
  BUTTON_Y_OFFSET: 0.3, // Button position as ratio of container height
  TEXT_Y_OFFSET: -0.3, // Text position as ratio of container height
  
  // Font sizes
  DESKTOP_BUTTON_FONT: '32px',
  MOBILE_BUTTON_FONT: '24px',
  DESKTOP_TEXT_FONT: '24px',
  MOBILE_TEXT_FONT: '18px',
  
  // Colors
  BACKGROUND_COLOR: 0x000000, // Transparent background
  BORDER_COLOR: 0x000000, // Transparent border
  BORDER_ALPHA: 0, // Fully transparent
  BORDER_WIDTH: 0, // No border
  
  // Animation settings
  SPIN_DURATION: 3000, // Spin animation duration in ms
  BUTTON_PULSE_DURATION: 1000, // Button pulse animation duration
  CELEBRATION_DURATION: 500, // Celebration animation duration
  RESET_DELAY: 3000, // Delay before resetting result text
  
  // Spin settings
  MIN_ROTATIONS: 5,
  MAX_ROTATIONS: 8
} as const;

// Simple Lucky Wheel Scene
class LuckyWheelScene extends Phaser.Scene {
  private mainContainer!: Phaser.GameObjects.Container;
  private wheel!: Phaser.GameObjects.Container;
  private wheelGraphics!: Phaser.GameObjects.Graphics;
  private spinButton!: Phaser.GameObjects.Text;
  private resultText!: Phaser.GameObjects.Text;
  private backgroundImage!: Phaser.GameObjects.Image | Phaser.GameObjects.Rectangle;
  private isSpinning: boolean = false;
  private wheelSections: Array<{ color: number; text: string; value: number }> = [];
  private currentRotation: number = 0;
  private isMobile: boolean = false;
  private containerWidth: number = 0;
  private containerHeight: number = 0;

  constructor() {
    super({ key: 'LuckyWheelScene' });
  }

  preload() {
    // Load background images
    this.load.image('desktop_16x9', '/assets/levis2025r3wheel/background/desktop_16x9.png');
    this.load.image('mobile_origin', '/assets/levis2025r3wheel/background/mobile_origin.png');
  }

  create() {
    // Detect mobile vs desktop
    this.detectDeviceMode();
    
    // Calculate container dimensions
    this.calculateContainerDimensions();
    
    // Create main container
    this.createMainContainer();
    
    // Create wheel sections
    this.wheelSections = [
      { color: 0xff6b6b, text: '100', value: 100 },
      { color: 0x4ecdc4, text: '200', value: 200 },
      { color: 0x45b7d1, text: '500', value: 500 },
      { color: 0xf9ca24, text: '1000', value: 1000 },
      { color: 0xf0932b, text: '50', value: 50 },
      { color: 0xeb4d4b, text: '300', value: 300 },
      { color: 0x6c5ce7, text: '750', value: 750 },
      { color: 0xa29bfe, text: '150', value: 150 }
    ];

    // Create wheel container inside main container
    this.wheel = this.add.container(0, 0);
    this.mainContainer.add(this.wheel);
    
    // Create wheel graphics
    this.wheelGraphics = this.add.graphics();
    this.wheel.add(this.wheelGraphics);

    // Draw the wheel
    this.drawWheel();

    // Create spin button inside main container
    this.spinButton = this.add.text(0, this.containerHeight * GAME_CONSTANTS.BUTTON_Y_OFFSET, 'SPIN!', {
      fontSize: this.isMobile ? GAME_CONSTANTS.MOBILE_BUTTON_FONT : GAME_CONSTANTS.DESKTOP_BUTTON_FONT,
      color: '#ffffff',
      fontFamily: 'Arial',
      backgroundColor: '#e74c3c',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    this.mainContainer.add(this.spinButton);

    // Create result text inside main container
    this.resultText = this.add.text(0, this.containerHeight * GAME_CONSTANTS.TEXT_Y_OFFSET, 'Click SPIN to start!', {
      fontSize: this.isMobile ? GAME_CONSTANTS.MOBILE_TEXT_FONT : GAME_CONSTANTS.DESKTOP_TEXT_FONT,
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);
    this.mainContainer.add(this.resultText);

    // Add button click event
    this.spinButton.on('pointerdown', () => this.spinWheel());

    // Add some visual effects
    this.add.tween({
      targets: this.spinButton,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: GAME_CONSTANTS.BUTTON_PULSE_DURATION,
      yoyo: true,
      repeat: -1
    });

    // Listen for resize events
    this.scale.on('resize', this.handleResize, this);
  }

  private detectDeviceMode(): void {
    const screenWidth = this.scale.width;
    const screenHeight = this.scale.height;
    const aspectRatio = screenWidth / screenHeight;
    
    // Consider mobile if width < MOBILE_BREAKPOINT or aspect ratio < 1.2 (portrait-ish)
    this.isMobile = screenWidth < GAME_CONSTANTS.MOBILE_BREAKPOINT || aspectRatio < 1.2;
  }

  private calculateContainerDimensions(): void {
    const screenWidth = this.scale.width;
    const screenHeight = this.scale.height;
    
    if (this.isMobile) {
      // Mobile: stretch to fit screen
      this.containerWidth = screenWidth;
      this.containerHeight = screenHeight;
    } else {
      // Desktop: maintain aspect ratio, fit to screen
      const targetAspectRatio = GAME_CONSTANTS.DESKTOP_ASPECT_RATIO;
      const screenAspectRatio = screenWidth / screenHeight;
      
      if (screenAspectRatio > targetAspectRatio) {
        // Screen is wider than target ratio, fit by height
        this.containerHeight = screenHeight;
        this.containerWidth = this.containerHeight * targetAspectRatio;
      } else {
        // Screen is taller than target ratio, fit by width
        this.containerWidth = screenWidth;
        this.containerHeight = this.containerWidth / targetAspectRatio;
      }
    }
  }

  private createMainContainer(): void {
    // Create main container at center of screen
    this.mainContainer = this.add.container(
      this.scale.width / 2,
      this.scale.height / 2
    );
    
    // Add background image
    this.addBackgroundImage();
    
    // Add border for visual reference
    const border = this.add.graphics();
    border.lineStyle(GAME_CONSTANTS.BORDER_WIDTH, GAME_CONSTANTS.BORDER_COLOR, GAME_CONSTANTS.BORDER_ALPHA);
    border.strokeRect(
      -this.containerWidth / 2,
      -this.containerHeight / 2,
      this.containerWidth,
      this.containerHeight
    );
    this.mainContainer.add(border);
  }

  private addBackgroundImage(): void {
    // Remove existing background if any
    if (this.backgroundImage) {
      this.mainContainer.remove(this.backgroundImage);
      this.backgroundImage.destroy();
    }

    // Choose background image based on device mode
    const backgroundKey = this.isMobile ? 'mobile_origin' : 'desktop_16x9';
    
    // Try to add background image, fallback to solid color if not found
    if (this.textures.exists(backgroundKey)) {
      this.backgroundImage = this.add.image(0, 0, backgroundKey);
      this.backgroundImage.setDisplaySize(this.containerWidth, this.containerHeight);
      this.mainContainer.addAt(this.backgroundImage, 0); // Add at the beginning
    } else {
      // Fallback to solid color background
      this.backgroundImage = this.add.rectangle(0, 0, this.containerWidth, this.containerHeight, GAME_CONSTANTS.BACKGROUND_COLOR);
      this.mainContainer.addAt(this.backgroundImage, 0);
    }
  }

  private handleResize(): void {
    // Recalculate dimensions
    this.detectDeviceMode();
    this.calculateContainerDimensions();
    
    // Update main container position and size
    this.mainContainer.setPosition(this.scale.width / 2, this.scale.height / 2);
    
    // Update background image
    this.addBackgroundImage();
    
    // Update border (now at index 1 after background)
    const border = this.mainContainer.list[1] as Phaser.GameObjects.Graphics;
    border.clear();
    border.lineStyle(GAME_CONSTANTS.BORDER_WIDTH, GAME_CONSTANTS.BORDER_COLOR, GAME_CONSTANTS.BORDER_ALPHA);
    border.strokeRect(
      -this.containerWidth / 2,
      -this.containerHeight / 2,
      this.containerWidth,
      this.containerHeight
    );
    
    // Update wheel radius based on container size
    this.drawWheel();
    
    // Update button and text positions
    this.spinButton.setPosition(0, this.containerHeight * GAME_CONSTANTS.BUTTON_Y_OFFSET);
    this.resultText.setPosition(0, this.containerHeight * GAME_CONSTANTS.TEXT_Y_OFFSET);
    
    // Update font sizes for mobile
    this.spinButton.setStyle({ fontSize: this.isMobile ? GAME_CONSTANTS.MOBILE_BUTTON_FONT : GAME_CONSTANTS.DESKTOP_BUTTON_FONT });
    this.resultText.setStyle({ fontSize: this.isMobile ? GAME_CONSTANTS.MOBILE_TEXT_FONT : GAME_CONSTANTS.DESKTOP_TEXT_FONT });
  }

  private drawWheel() {
    // Calculate wheel radius based on container size
    const maxRadius = Math.min(this.containerWidth, this.containerHeight) * GAME_CONSTANTS.WHEEL_SIZE_RATIO;
    const radius = Math.max(GAME_CONSTANTS.WHEEL_MIN_RADIUS, maxRadius);
    const centerX = 0;
    const centerY = 0;
    const sectionAngle = (Math.PI * 2) / this.wheelSections.length;

    this.wheelGraphics.clear();

    // Draw wheel sections
    this.wheelSections.forEach((section, index) => {
      const startAngle = index * sectionAngle;
      const endAngle = startAngle + sectionAngle;

      // Draw section
      this.wheelGraphics.fillStyle(section.color);
      this.wheelGraphics.beginPath();
      this.wheelGraphics.moveTo(centerX, centerY);
      this.wheelGraphics.arc(centerX, centerY, radius, startAngle, endAngle);
      this.wheelGraphics.closePath();
      this.wheelGraphics.fill();

      // Draw section border
      this.wheelGraphics.lineStyle(3, 0xffffff);
      this.wheelGraphics.beginPath();
      this.wheelGraphics.moveTo(centerX, centerY);
      this.wheelGraphics.arc(centerX, centerY, radius, startAngle, endAngle);
      this.wheelGraphics.closePath();
      this.wheelGraphics.stroke();

      // Add text to each section
      const textAngle = startAngle + sectionAngle / 2;
      const textX = centerX + Math.cos(textAngle) * (radius * 0.7);
      const textY = centerY + Math.sin(textAngle) * (radius * 0.7);

      const sectionText = this.add.text(textX, textY, section.text, {
        fontSize: '24px',
        color: '#ffffff',
        fontFamily: 'Arial'
      }).setOrigin(0.5);

      this.wheel.add(sectionText);
    });

    // Draw center circle
    this.wheelGraphics.fillStyle(0x34495e);
    this.wheelGraphics.beginPath();
    this.wheelGraphics.arc(centerX, centerY, 30, 0, Math.PI * 2);
    this.wheelGraphics.fill();

    // Draw pointer
    this.wheelGraphics.fillStyle(0xe74c3c);
    this.wheelGraphics.beginPath();
    this.wheelGraphics.moveTo(centerX, centerY - radius - 20);
    this.wheelGraphics.lineTo(centerX - 15, centerY - radius - 5);
    this.wheelGraphics.lineTo(centerX + 15, centerY - radius - 5);
    this.wheelGraphics.closePath();
    this.wheelGraphics.fill();
  }

  private spinWheel() {
    if (this.isSpinning) return;

    this.isSpinning = true;
    this.spinButton.setVisible(false);
    this.resultText.setText('Spinning...');

    // Calculate random rotation
    const rotations = GAME_CONSTANTS.MIN_ROTATIONS + Math.random() * (GAME_CONSTANTS.MAX_ROTATIONS - GAME_CONSTANTS.MIN_ROTATIONS);
    const randomSection = Math.floor(Math.random() * this.wheelSections.length);
    const sectionAngle = (Math.PI * 2) / this.wheelSections.length;
    const targetAngle = rotations * Math.PI * 2 + (randomSection * sectionAngle);

    this.currentRotation += targetAngle;

    // Create spin animation
    this.tweens.add({
      targets: this.wheel,
      rotation: this.currentRotation,
      duration: GAME_CONSTANTS.SPIN_DURATION,
      ease: 'Cubic.easeOut',
      onComplete: () => {
        this.onSpinComplete(randomSection);
      }
    });
  }

  private onSpinComplete(winningSection: number) {
    this.isSpinning = false;
    this.spinButton.setVisible(true);
    
    const winningPrize = this.wheelSections[winningSection];
    this.resultText.setText(`🎉 You won ${winningPrize.value} points! 🎉`);

    // Add celebration effect
    this.add.tween({
      targets: this.resultText,
      scaleX: 1.2,
      scaleY: 1.2,
      duration: GAME_CONSTANTS.CELEBRATION_DURATION,
      yoyo: true,
      repeat: 2
    });

    // Reset button text after a delay
    this.time.delayedCall(GAME_CONSTANTS.RESET_DELAY, () => {
      this.resultText.setText('Click SPIN to play again!');
    });
  }
}

// Game configuration
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  parent: 'game-container',
  backgroundColor: 0x000000, // Black background
  transparent: true, // Make canvas transparent
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: '100%',
    height: '100%'
  },
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
