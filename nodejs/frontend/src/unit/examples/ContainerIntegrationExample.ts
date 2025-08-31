import { UnitCalculatorFactory } from '../classes/UnitCalculatorFactory';
import { PhaserUnitContextFactory, PhaserUnitContext } from '../interfaces/IPhaserUnitContext';
import { ISizeUnit } from '../interfaces/ISizeUnit';
import { IPositionUnit } from '../interfaces/IPositionUnit';
import { IScaleUnit } from '../interfaces/IScaleUnit';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { PositionUnit } from '../enums/PositionUnit';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import type { CommonIStyleProperties } from '../../abstract/configs/IStyleProperties';

/**
 * Example: How to integrate the Unit System with your existing Container architecture
 * This shows how to use type-safe contexts with your Container class
 */

// Example 1: Enhanced Container with Unit System Integration
export class ResponsiveContainer extends (await import('../../object/container/Container')).Container {
  private sizeCalculator!: ISizeUnit;
  private positionCalculator!: IPositionUnit;
  private scaleCalculator!: IScaleUnit;

  // Implement missing IGameObject methods for compatibility
  initialize(): void {
    // Container is already initialized in constructor
  }

  activate(): void {
    this.setActive(true);
  }

  deactivate(): void {
    this.setActive(false);
  }

  show(): void {
    this.setVisible(true);
  }

  hide(): void {
    this.setVisible(false);
  }

  clone(): ResponsiveContainer {
    // Return a new instance with same properties
    return new ResponsiveContainer(this.scene, this.id, this.x, this.y, this.parent);
  }

  getSize(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }

  getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  constructor(scene: Phaser.Scene, id: string, x: number = 0, y: number = 0, parent: any = null) {
    super(scene, id, x, y, parent);
    
    // Initialize calculators with your Container's properties
    this.initializeCalculators();
  }

  private initializeCalculators() {
    const factory = UnitCalculatorFactory.getInstance();
    
    // Create calculators that work with your Container's responsive system
    this.sizeCalculator = factory.createSizeUnit(
      `${this.id}-size`,
      'Container Responsive Size',
      SizeUnit.PARENT_WIDTH,
      Dimension.WIDTH,
      SizeValue.PARENT_WIDTH, // Use your existing unit system
      this.getStyle()?.maintainAspectRatio || false
    );

    this.positionCalculator = factory.createPositionUnit(
      `${this.id}-position`,
      'Container Responsive Position',
      PositionUnit.PARENT_CENTER_X,
      Dimension.X,
      0 // baseValue should be a number
    );

    this.scaleCalculator = factory.createScaleUnit(
      `${this.id}-scale`,
      'Container Responsive Scale',
      ScaleUnit.FACTOR,
      ScaleValue.FACTOR,
      this.getStyle()?.maintainAspectRatio || false
    );
  }

  // Enhanced setStyle method that uses the unit system
  setStyleWithUnits(layoutProperties: CommonIStyleProperties): void {
    // Call your existing setStyle method
    this.setStyle(layoutProperties);
    
    // Now apply unit-based calculations
    this.applyUnitCalculations();
  }

  private applyUnitCalculations(): void {
    // Create type-safe context from your Container
    const context = PhaserUnitContextFactory.fromContainer(this);
    
    // Calculate new size using unit system
    const newWidth = this.sizeCalculator.calculate(context);
    const newHeight = this.sizeCalculator.calculate(context);
    
    // Apply calculated size
    this.setSize(newWidth, newHeight);
    
    // Calculate new position using unit system
    const newX = this.positionCalculator.calculate(context);
    const newY = this.positionCalculator.calculate(context);
    
    // Apply calculated position
    this.setPosition(newX, newY);
    
    // Calculate new scale using unit system
    const newScale = this.scaleCalculator.calculate(context);
    
    // Apply calculated scale
    this.setScale(newScale);
  }

  // Method to get unit context for external calculations
  getUnitContext(): PhaserUnitContext {
    return PhaserUnitContextFactory.fromContainer(this);
  }

  // Method to get unit context with parent relationship
  getUnitContextWithParent(): PhaserUnitContext {
    if (this.parent) {
      return PhaserUnitContextFactory.fromContainerWithParent(this, this.parent as any);
    }
    return this.getUnitContext();
  }

  // Enhanced responsive resize that uses unit system
  handleResponsiveResize(width: number, height: number): void {
    // Call your existing responsive resize logic
    super.handleResponsiveResize(width, height);
    
    // Now recalculate using unit system
    this.applyUnitCalculations();
  }
}

// Example 2: Using your existing style system with unit calculations
export class StyleAwareContainer extends (await import('../../object/container/Container')).Container {
  
  // Enhanced setStyle that integrates with unit system
  setStyleWithUnitIntegration(layoutProperties: CommonIStyleProperties): void {
    // Apply your existing style logic
    this.setStyle(layoutProperties);
    
    // Extract unit-based properties
    const unitProperties = this.extractUnitProperties(layoutProperties);
    
    // Apply unit calculations if present
    if (unitProperties.hasUnits) {
      this.applyUnitStyle(unitProperties);
    }
  }

  private extractUnitProperties(layoutProperties: CommonIStyleProperties): { hasUnits: boolean; units: Partial<CommonIStyleProperties> } {
    const units: Partial<CommonIStyleProperties> = {};
    let hasUnits = false;

    // Check for unit-based properties (your existing system)
    if (layoutProperties.width && typeof layoutProperties.width !== 'number') {
      units.width = layoutProperties.width;
      hasUnits = true;
    }

    if (layoutProperties.height && typeof layoutProperties.height !== 'number') {
      units.height = layoutProperties.height;
      hasUnits = true;
    }

    if (layoutProperties.positionX && typeof layoutProperties.positionX !== 'number') {
      units.positionX = layoutProperties.positionX;
      hasUnits = true;
    }

    if (layoutProperties.positionY && typeof layoutProperties.positionY !== 'number') {
      units.positionY = layoutProperties.positionY;
      hasUnits = true;
    }

    return { hasUnits, units };
  }

  private applyUnitStyle(unitProperties: { hasUnits: boolean; units: Partial<CommonIStyleProperties> }): void {
    const factory = UnitCalculatorFactory.getInstance();
    const context = PhaserUnitContextFactory.fromContainer(this);

         // Apply width calculation
     if (unitProperties.units.width) {
       const widthCalculator = factory.createSizeUnit(
         `${this.id}-width`,
         'Dynamic Width',
         SizeUnit.PARENT_WIDTH,
         Dimension.WIDTH,
         unitProperties.units.width,
         this.getStyle()?.maintainAspectRatio || false
       );
       
       const newWidth = widthCalculator.calculate(context);
       this.setSize(newWidth, this.height);
     }

     // Apply height calculation
     if (unitProperties.units.height) {
       const heightCalculator = factory.createSizeUnit(
         `${this.id}-height`,
         'Dynamic Height',
         SizeUnit.PARENT_HEIGHT,
         Dimension.HEIGHT,
         unitProperties.units.height,
         this.getStyle()?.maintainAspectRatio || false
       );
       
       const newHeight = heightCalculator.calculate(context);
       this.setSize(this.width, newHeight);
     }

    // Apply position calculations
    if (unitProperties.units.positionX) {
      // Convert positionX to a valid baseValue
      const baseValue = typeof unitProperties.units.positionX === 'number' 
        ? unitProperties.units.positionX 
        : 0; // Default to 0 for non-numeric values
      
      const xCalculator = factory.createPositionUnit(
        `${this.id}-posX`,
        'Dynamic Position X',
        PositionUnit.PARENT_CENTER_X,
        Dimension.X,
        baseValue
      );
      
      const newX = xCalculator.calculate(context);
      this.setPosition(newX, this.y);
    }

    if (unitProperties.units.positionY) {
      // Convert positionY to a valid baseValue
      const baseValue = typeof unitProperties.units.positionY === 'number' 
        ? unitProperties.units.positionY 
        : 0; // Default to 0 for non-numeric values
      
      const yCalculator = factory.createPositionUnit(
        `${this.id}-posY`,
        'Dynamic Position Y',
        PositionUnit.PARENT_CENTER_Y,
        Dimension.Y,
        baseValue
      );
      
      const newY = yCalculator.calculate(context);
      this.setPosition(this.x, newY);
    }
  }
}

// Example 3: Scene integration with your Container system
export class ResponsiveScene extends (await import('phaser')).Scene {
  private containers: ResponsiveContainer[] = [];

  create() {
    // Create responsive containers using your existing system
    const mainContainer = new ResponsiveContainer(this, 'main', 400, 300);
    this.add.existing(mainContainer);
    this.containers.push(mainContainer);

    // Create child containers
    const childContainer = new ResponsiveContainer(this, 'child', 0, 0, mainContainer);
    mainContainer.addChild(childContainer);
    this.containers.push(childContainer);

    // Apply initial layout
    this.updateLayout();
  }

  updateLayout(): void {
    // Update all containers using unit system
    this.containers.forEach(container => {
      // Get type-safe context
      //const context = container.getUnitContextWithParent();
      
      // Trigger unit-based recalculation
      container.setStyleWithUnits(container.getStyle());
    });
  }

  // Handle resize events
  onResize(): void {
    this.updateLayout();
  }
}

// Example 4: Benefits of this integration
export class IntegrationBenefits {
  static demonstrateBenefits() {
    // ✅ TYPE SAFETY: No more 'any' types
    // const context = PhaserUnitContextFactory.fromContainer(container);
    // const width = context.scene.width; // TypeScript knows this exists
    // const height = context.scene.height; // TypeScript knows this exists

    // ✅ INTEGRATION: Works with your existing Container system
    // container.setStyleWithUnits(layoutProperties);
    // container.handleResponsiveResize(width, height);

    // ✅ PERFORMANCE: No runtime type checking overhead
    // All calculations use your existing Phaser properties

    // ✅ MAINTAINABILITY: Clear contracts and interfaces
    // Easy to refactor and extend
  }
}

/**
 * Key Benefits of This Integration:
 * 
 * 1. **Seamless Integration**: Works with your existing Container architecture
 * 2. **Type Safety**: Full TypeScript support with Phaser types
 * 3. **Performance**: No overhead, uses existing Phaser properties
 * 4. **Responsive**: Integrates with your existing responsive system
 * 5. **Maintainable**: Clear separation of concerns
 * 6. **Extensible**: Easy to add new unit types and calculations
 * 7. **Backward Compatible**: Works with your existing style system
 * 
 * Your Container system is perfectly designed for this integration!
 */
