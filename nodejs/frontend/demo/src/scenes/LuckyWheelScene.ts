import Phaser from 'phaser';

export class LuckyWheelScene extends Phaser.Scene {
  private wheel!: Phaser.GameObjects.Container;
  private wheelGraphics!: Phaser.GameObjects.Graphics;
  private spinButton!: Phaser.GameObjects.Text;
  private resultText!: Phaser.GameObjects.Text;
  private isSpinning: boolean = false;
  private wheelSections: Array<{ color: number; text: string; value: number }> = [];
  private currentRotation: number = 0;

  constructor() {
    super({ key: 'LuckyWheelScene' });
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

    // Create wheel container
    this.wheel = this.add.container(400, 300);
    
    // Create wheel graphics
    this.wheelGraphics = this.add.graphics();
    this.wheel.add(this.wheelGraphics);

    // Draw the wheel
    this.drawWheel();

    // Create spin button
    this.spinButton = this.add.text(400, 500, 'SPIN!', {
      fontSize: '32px',
      color: '#ffffff',
      fontFamily: 'Arial',
      backgroundColor: '#e74c3c',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive({ useHandCursor: true });

    // Create result text
    this.resultText = this.add.text(400, 100, 'Click SPIN to start!', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

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

  private drawWheel() {
    const radius = 200;
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
