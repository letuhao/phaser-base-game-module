import Phaser from 'phaser';

export class LuckyWheelScene extends Phaser.Scene {
  private mainContainer!: Phaser.GameObjects.Container;
  private wheel!: Phaser.GameObjects.Container;
  private wheelGraphics!: Phaser.GameObjects.Graphics;
  private spinButton!: Phaser.GameObjects.Text;
  private resultText!: Phaser.GameObjects.Text;
  private backgroundImage!: Phaser.GameObjects.Image;
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
    this.load.image('desktop-bg', 'assets/desktop_16x9.png');
    this.load.image('mobile-bg', 'assets/mobile_origin.png');
  }

  create() {
    // Create wheel sections with different colors and prizes
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

    // Initialize responsive container
    this.initializeMainContainer();
    
    // Setup resize listener
    this.setupResizeListener();
    
    // Create game objects inside main container
    this.createGameObjects();
  }

  private initializeMainContainer() {
    // Create main container
    this.mainContainer = this.add.container(0, 0);
    
    // Calculate initial container size
    this.calculateContainerSize();
    
    // Set initial container size
    this.updateMainContainer();
  }

  private calculateContainerSize() {
    const gameWidth = this.scale.width;
    const gameHeight = this.scale.height;
    
    // Check if mobile (width < 768px or height > width)
    this.isMobile = gameWidth < 768 || gameHeight > gameWidth;
    
    if (this.isMobile) {
      // Mobile: stretch to fill parent
      this.containerWidth = gameWidth;
      this.containerHeight = gameHeight;
    } else {
      // Desktop: maintain 16:9 aspect ratio
      const aspectRatio = 16 / 9;
      
      if (gameWidth / gameHeight > aspectRatio) {
        // Height is the limiting factor
        this.containerHeight = gameHeight;
        this.containerWidth = gameHeight * aspectRatio;
      } else {
        // Width is the limiting factor
        this.containerWidth = gameWidth;
        this.containerHeight = gameWidth / aspectRatio;
      }
    }
  }

  private updateMainContainer() {
    // Center the container
    this.mainContainer.setPosition(
      (this.scale.width - this.containerWidth) / 2,
      (this.scale.height - this.containerHeight) / 2
    );
    
    // Set container size
    this.mainContainer.setSize(this.containerWidth, this.containerHeight);
  }

  private setupResizeListener() {
    this.scale.on('resize', () => {
      this.calculateContainerSize();
      this.updateMainContainer();
      this.updateGameObjectsLayout();
    });
  }

  private createGameObjects() {
    // Create background image
    this.createBackgroundImage();
    
    // Create wheel container inside main container
    this.wheel = this.add.container(this.containerWidth / 2, this.containerHeight / 2);
    this.mainContainer.add(this.wheel);
    
    // Create wheel graphics
    this.wheelGraphics = this.add.graphics();
    this.wheel.add(this.wheelGraphics);

    // Draw the wheel
    this.drawWheel();

    // Create spin button
    this.spinButton = this.add.text(this.containerWidth / 2, this.containerHeight * 0.8, 'SPIN!', {
      fontSize: this.isMobile ? '28px' : '32px',
      color: '#ffffff',
      fontFamily: 'Arial',
      backgroundColor: '#e74c3c',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    
    this.mainContainer.add(this.spinButton);

    // Create result text
    this.resultText = this.add.text(this.containerWidth / 2, this.containerHeight * 0.15, 'Click SPIN to start!', {
      fontSize: this.isMobile ? '20px' : '24px',
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
      duration: 1000,
      yoyo: true,
      repeat: -1
    });
  }

  private createBackgroundImage() {
    // Choose background image based on device type
    const backgroundKey = this.isMobile ? 'mobile-bg' : 'desktop-bg';
    
    // Create background image that stretches to fill the container
    this.backgroundImage = this.add.image(0, 0, backgroundKey);
    this.backgroundImage.setOrigin(0, 0);
    this.backgroundImage.setDisplaySize(this.containerWidth, this.containerHeight);
    
    // Add to main container (as first child so it's behind everything)
    this.mainContainer.addAt(this.backgroundImage, 0);
  }

  private updateGameObjectsLayout() {
    // Update background image
    this.updateBackgroundImage();
    
    // Update wheel position
    this.wheel.setPosition(this.containerWidth / 2, this.containerHeight / 2);
    
    // Update button position
    this.spinButton.setPosition(this.containerWidth / 2, this.containerHeight * 0.8);
    
    // Update result text position
    this.resultText.setPosition(this.containerWidth / 2, this.containerHeight * 0.15);
    
    // Update font sizes for mobile
    if (this.isMobile) {
      this.spinButton.setStyle({ fontSize: '28px' });
      this.resultText.setStyle({ fontSize: '20px' });
    } else {
      this.spinButton.setStyle({ fontSize: '32px' });
      this.resultText.setStyle({ fontSize: '24px' });
    }
    
    // Redraw wheel with new size
    this.drawWheel();
  }

  private updateBackgroundImage() {
    if (this.backgroundImage) {
      // Choose background image based on device type
      const backgroundKey = this.isMobile ? 'mobile-bg' : 'desktop-bg';
      
      // Update background image texture if device type changed
      if (this.backgroundImage.texture.key !== backgroundKey) {
        this.backgroundImage.setTexture(backgroundKey);
      }
      
      // Update background image size to stretch to container
      this.backgroundImage.setDisplaySize(this.containerWidth, this.containerHeight);
      this.backgroundImage.setPosition(0, 0);
    }
  }

  private drawWheel() {
    // Calculate responsive wheel size based on container
    const maxRadius = Math.min(this.containerWidth, this.containerHeight) * 0.3;
    const radius = Math.max(150, maxRadius); // Minimum radius of 150
    const centerX = 0;
    const centerY = 0;
    const sectionAngle = (Math.PI * 2) / this.wheelSections.length;

    this.wheelGraphics.clear();

    // Clear existing text objects
    this.wheel.list.forEach((child) => {
      if (child !== this.wheelGraphics && child.type === 'Text') {
        child.destroy();
      }
    });

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

      const fontSize = this.isMobile ? '18px' : '24px';
      const sectionText = this.add.text(textX, textY, section.text, {
        fontSize: fontSize,
        color: '#ffffff',
        fontFamily: 'Arial'
      }).setOrigin(0.5);

      this.wheel.add(sectionText);
    });

    // Draw center circle
    const centerRadius = this.isMobile ? 25 : 30;
    this.wheelGraphics.fillStyle(0x34495e);
    this.wheelGraphics.beginPath();
    this.wheelGraphics.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
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

    // Calculate random rotation (multiple full rotations + random section)
    const minRotations = 5;
    const maxRotations = 8;
    const rotations = minRotations + Math.random() * (maxRotations - minRotations);
    const randomSection = Math.floor(Math.random() * this.wheelSections.length);
    const sectionAngle = (Math.PI * 2) / this.wheelSections.length;
    const targetAngle = rotations * Math.PI * 2 + (randomSection * sectionAngle);

    // Add to current rotation
    this.currentRotation += targetAngle;

    // Create spin animation
    this.tweens.add({
      targets: this.wheel,
      rotation: this.currentRotation,
      duration: 3000,
      ease: 'Cubic.easeOut',
      onComplete: () => {
        this.onSpinComplete(randomSection);
      }
    });

    // Add some visual effects during spin
    this.tweens.add({
      targets: this.wheelGraphics,
      alpha: 0.8,
      duration: 1500,
      yoyo: true,
      repeat: 1
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
      duration: 500,
      yoyo: true,
      repeat: 2
    });

    // Add particle effect
    this.createParticleEffect();

    // Reset button text after a delay
    this.time.delayedCall(3000, () => {
      this.resultText.setText('Click SPIN to play again!');
    });
  }

  private createParticleEffect() {
    // Simple particle effect using graphics
    for (let i = 0; i < 20; i++) {
      const particle = this.add.graphics();
      particle.fillStyle(0xffff00);
      particle.fillCircle(0, 0, 3);
      
      const x = 400 + (Math.random() - 0.5) * 100;
      const y = 300 + (Math.random() - 0.5) * 100;
      
      particle.setPosition(x, y);
      
      this.tweens.add({
        targets: particle,
        y: y - 100,
        alpha: 0,
        duration: 1000,
        onComplete: () => particle.destroy()
      });
    }
  }
}
