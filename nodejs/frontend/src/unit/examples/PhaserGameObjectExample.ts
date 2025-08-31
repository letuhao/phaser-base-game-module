import { GameObjects, Scene } from 'phaser';
import { UnitCalculatorFactory } from '../classes/UnitCalculatorFactory';
import { PhaserUnitContextFactory, PhaserUnitContext } from '../interfaces/IPhaserUnitContext';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { PositionUnit } from '../enums/PositionUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import type { ISizeUnit } from '../interfaces/ISizeUnit';
import type { IPositionUnit } from '../interfaces/IPositionUnit';
import type { IScaleUnit } from '../interfaces/IScaleUnit';

/**
 * Example: How to use the Unit System with Phaser GameObject classes
 * This shows the type-safe approach instead of using 'any'
 */

// Example 1: Basic Phaser GameObject with Unit System
export class ResponsiveSprite extends GameObjects.Sprite {
  private sizeCalculator!: ISizeUnit;
  private positionCalculator!: IPositionUnit;
  private scaleCalculator!: IScaleUnit;

  constructor(scene: Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    
    // Initialize calculators with type-safe context
    this.initializeCalculators();
  }

  private initializeCalculators() {
    const factory = UnitCalculatorFactory.getInstance();
    
    // Create calculators with specific configurations
    this.sizeCalculator = factory.createSizeUnit(
      `${this.name}-size`,
      'Responsive Size',
      SizeUnit.PARENT_WIDTH,
      Dimension.WIDTH,
      0.5, // 50% of parent width
      true // maintain aspect ratio
    );

    this.positionCalculator = factory.createPositionUnit(
      `${this.name}-position`,
      'Centered Position',
      PositionUnit.PARENT_CENTER_X,
      Dimension.X,
      0
    );

    this.scaleCalculator = factory.createScaleUnit(
      `${this.name}-scale`,
      'Responsive Scale',
      ScaleUnit.FACTOR,
      1.0,
      true // maintain aspect ratio
    );
  }

  // Type-safe calculation method
  updateSize(context: PhaserUnitContext): void {
    const newWidth = this.sizeCalculator.calculate(context);
    const newHeight = this.sizeCalculator.calculate(context);
    
    this.setSize(newWidth, newHeight);
  }

  // Type-safe position calculation
  updatePosition(context: PhaserUnitContext): void {
    const newX = this.positionCalculator.calculate(context);
    const newY = this.positionCalculator.calculate(context);
    
    this.setPosition(newX, newY);
  }

  // Type-safe scale calculation
  updateScale(context: PhaserUnitContext): void {
    const newScale = this.scaleCalculator.calculate(context);
    
    this.setScale(newScale);
  }

  // Main update method with type-safe context
  updateWithContext(): void {
    // Create type-safe context
    const context = PhaserUnitContextFactory.fromGameObject(this);
    
    // All calculations are now type-safe
    this.updateSize(context);
    this.updatePosition(context);
    this.updateScale(context);
  }
}

// Example 2: Container with child objects
export class ResponsiveContainer extends GameObjects.Container {
  private children: ResponsiveSprite[] = [];

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
  }

  addResponsiveChild(child: ResponsiveSprite): void {
    this.children.push(child);
    this.add(child);
  }

  updateChildrenLayout(): void {
    // Update all children with type-safe context
    this.children.forEach(child => {
      child.updateWithContext();
    });
  }
}

// Example 3: Scene with responsive objects
export class ResponsiveScene extends Scene {
  private responsiveSprites: ResponsiveSprite[] = [];
  private container!: ResponsiveContainer;

  create() {
    // Create responsive container
    this.container = new ResponsiveContainer(this, 400, 300);
    this.add.existing(this.container);

    // Create responsive sprites
    for (let i = 0; i < 5; i++) {
      const sprite = new ResponsiveSprite(this, 0, 0, 'sprite');
      this.container.addResponsiveChild(sprite);
      this.responsiveSprites.push(sprite);
    }

    // Initial layout update
    this.updateLayout();
  }

  updateLayout(): void {
    // Update container layout
    this.container.updateChildrenLayout();
    
    // Update individual sprites
    this.responsiveSprites.forEach(sprite => {
      sprite.updateWithContext();
    });
  }

  // Handle resize events
  onResize(): void {
    this.updateLayout();
  }
}

// Example 4: Usage with your existing GameObject classes
export class MyGameObject extends GameObjects.GameObject {
  private unitContext: PhaserUnitContext;

  constructor(scene: Scene, type: string) {
    super(scene, type);
    this.unitContext = PhaserUnitContextFactory.fromGameObject(this);
  }

  // Type-safe method that uses the unit system
  calculateResponsiveSize(): { width: number; height: number } {
    // This context is fully type-safe
    const factory = UnitCalculatorFactory.getInstance();
    
    const sizeCalculator = factory.createSizeUnit(
      `${this.name}-size`,
      'Dynamic Size',
      SizeUnit.VIEWPORT_WIDTH,
      Dimension.WIDTH,
      0.8, // 80% of viewport width
      true
    );

    const width = sizeCalculator.calculate(this.unitContext);
    const height = sizeCalculator.calculate(this.unitContext);

    return { width, height };
  }

  // Get type-safe context for external use
  getUnitContext(): PhaserUnitContext {
    return this.unitContext;
  }
}

// Example 5: Benefits of type safety
export class TypeSafeExample {
  static demonstrateTypeSafety() {
    // ❌ OLD WAY (risky with 'any')
    // This could crash at runtime
    // const width = oldContext.scene.width; // What if scene is undefined?
    // const height = oldContext.parent.height; // What if parent is null?

    // ✅ NEW WAY (type-safe with PhaserUnitContext)
    // const context = PhaserUnitContextFactory.fromGameObject(gameObject);
    // const width = context.scene.width; // TypeScript knows this exists
    // const height = context.parent?.height; // Optional chaining with type safety
  }
}

/**
 * Key Benefits of This Approach:
 * 
 * 1. **Type Safety**: No more 'any' types, compile-time error checking
 * 2. **IntelliSense**: Full autocomplete and documentation in your IDE
 * 3. **Runtime Safety**: Phaser objects are guaranteed to exist
 * 4. **Refactoring Support**: IDE can safely rename and move properties
 * 5. **Integration**: Seamlessly works with your existing Phaser GameObject classes
 * 6. **Performance**: No runtime type checking overhead
 * 7. **Maintainability**: Clear contracts and interfaces
 */
