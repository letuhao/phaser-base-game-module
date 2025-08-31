/**
 * Utility examples for common use cases
 * Demonstrates helper functions and patterns
 */

import type { IStyleProperties } from '../../abstract/configs/IStyleProperties';

/**
 * Utility 1: Style Property Builder
 * Helps create consistent style objects
 */
export class StylePropertyBuilder {
  private properties: Partial<IStyleProperties> = {};

  // Layout methods
  position(x: number | 'center' | 'left' | 'right', y: number | 'center' | 'top' | 'bottom'): this {
    this.properties.positionX = x;
    this.properties.positionY = y;
    return this;
  }

  size(width: number | 'fill' | 'auto', height: number | 'fill' | 'auto'): this {
    this.properties.width = width;
    this.properties.height = height;
    return this;
  }

  // Visual methods
  background(color: string, image?: string): this {
    this.properties.backgroundColor = color;
    if (image) this.properties.backgroundImage = image;
    return this;
  }

  border(color: string, width: number = 1, radius: number = 0): this {
    this.properties.borderColor = color;
    this.properties.borderWidth = width;
    this.properties.borderRadius = radius;
    return this;
  }

  // Typography methods
  text(
    family: string,
    size: number,
    weight:
      | 'normal'
      | 'bold'
      | 'bolder'
      | 'lighter'
      | 100
      | 200
      | 300
      | 400
      | 500
      | 600
      | 700
      | 800
      | 900 = 'normal',
    color: string = '#000000'
  ): this {
    this.properties.fontFamily = family;
    this.properties.fontSize = size;
    this.properties.fontWeight = weight;
    this.properties.color = color;
    return this;
  }

  // Spacing methods
  spacing(padding: number, margin: number = 0): this {
    this.properties.padding = padding;
    this.properties.margin = margin;
    return this;
  }

  // Interactive methods
  interactive(enabled: boolean = true, cursor: 'default' | 'pointer' | 'hand' = 'default'): this {
    this.properties.interactive = enabled;
    this.properties.cursor = cursor;
    return this;
  }

  // Build the final style object
  build(): IStyleProperties {
    return this.properties as IStyleProperties;
  }
}

/**
 * Utility 2: Responsive Breakpoint Helper
 * Simplifies breakpoint creation
 */
export class BreakpointHelper {
  static mobile(maxWidth: number = 767) {
    return { minWidth: 0, maxWidth };
  }

  static tablet(minWidth: number = 768, maxWidth: number = 1023) {
    return { minWidth, maxWidth };
  }

  static desktop(minWidth: number = 1024) {
    return { minWidth, maxWidth: undefined };
  }

  static custom(minWidth: number, maxWidth?: number) {
    return { minWidth, maxWidth };
  }

  static range(min: number, max: number) {
    return { minWidth: min, maxWidth: max };
  }
}

/**
 * Utility 3: Theme Class Manager
 * Manages theme class definitions
 */
export class ThemeClassManager {
  private classes: Map<string, IStyleProperties> = new Map();

  // Add a theme class
  addClass(className: string, properties: IStyleProperties): this {
    this.classes.set(className, properties);
    return this;
  }

  // Get a theme class
  getClass(className: string): IStyleProperties | undefined {
    return this.classes.get(className);
  }

  // Remove a theme class
  removeClass(className: string): boolean {
    return this.classes.delete(className);
  }

  // Get all class names
  getClassNames(): string[] {
    return Array.from(this.classes.keys());
  }

  // Get all classes
  getAllClasses(): Record<string, IStyleProperties> {
    const result: Record<string, IStyleProperties> = {};
    this.classes.forEach((properties, className) => {
      result[className] = properties;
    });
    return result;
  }

  // Check if a class exists
  hasClass(className: string): boolean {
    return this.classes.has(className);
  }

  // Clear all classes
  clear(): void {
    this.classes.clear();
  }
}

/**
 * Utility 4: Style Property Validator
 * Validates style property objects
 */
export class StylePropertyValidator {
  static validate(properties: Partial<IStyleProperties>): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check required properties for specific use cases
    if (properties.interactive && !properties.cursor) {
      warnings.push('Interactive objects should specify a cursor style');
    }

    // Check for conflicting properties
    if (
      properties.width === 'fill' &&
      properties.positionX !== 'center' &&
      properties.positionX !== 0
    ) {
      warnings.push('Full-width objects typically use center or left positioning');
    }

    // Check for reasonable values
    if (
      properties.fontSize &&
      typeof properties.fontSize === 'number' &&
      (properties.fontSize < 8 || properties.fontSize > 72)
    ) {
      warnings.push('Font size should typically be between 8 and 72 pixels');
    }

    if (
      properties.alpha &&
      typeof properties.alpha === 'number' &&
      (properties.alpha < 0 || properties.alpha > 1)
    ) {
      errors.push('Alpha value must be between 0 and 1');
    }

    if (
      properties.borderRadius &&
      typeof properties.borderRadius === 'number' &&
      properties.borderRadius < 0
    ) {
      errors.push('Border radius cannot be negative');
    }

    // Check for missing essential properties
    if (!properties.width && !properties.positionX) {
      warnings.push('Consider specifying width or position for better layout control');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }

  static validateResponsive(properties: Partial<IStyleProperties>[]): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    properties.forEach((props, index) => {
      const validation = this.validate(props);
      if (validation.errors.length > 0) {
        validation.errors.forEach(error => {
          errors.push(`Breakpoint ${index}: ${error}`);
        });
      }
      if (validation.warnings.length > 0) {
        validation.warnings.forEach(warning => {
          warnings.push(`Breakpoint ${index}: ${warning}`);
        });
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
    };
  }
}

/**
 * Utility 5: Style Property Merger
 * Merges multiple style property objects
 */
export class StylePropertyMerger {
  static merge(...properties: Partial<IStyleProperties>[]): IStyleProperties {
    return properties.reduce((merged, current) => {
      return { ...merged, ...current };
    }, {} as IStyleProperties);
  }

  static mergeWithPriority(
    base: Partial<IStyleProperties>,
    overrides: Partial<IStyleProperties>,
    priority: 'base' | 'overrides' = 'overrides'
  ): IStyleProperties {
    if (priority === 'overrides') {
      return { ...base, ...overrides };
    } else {
      return { ...overrides, ...base };
    }
  }

  static mergeResponsive(
    base: Partial<IStyleProperties>,
    breakpoints: Record<string, Partial<IStyleProperties>>
  ): Record<string, Partial<IStyleProperties>> {
    const result: Record<string, Partial<IStyleProperties>> = {};

    Object.entries(breakpoints).forEach(([breakpoint, properties]) => {
      result[breakpoint] = this.merge(base, properties);
    });

    return result;
  }
}

/**
 * Utility 6: Style Property Cloner
 * Creates deep copies of style property objects
 */
export class StylePropertyCloner {
  static clone(properties: Partial<IStyleProperties>): Partial<IStyleProperties> {
    return JSON.parse(JSON.stringify(properties));
  }

  static cloneWithModifications(
    properties: Partial<IStyleProperties>,
    modifications: Partial<IStyleProperties>
  ): Partial<IStyleProperties> {
    const cloned = this.clone(properties);
    return { ...cloned, ...modifications };
  }

  static cloneForBreakpoint(
    properties: Partial<IStyleProperties>,
    breakpoint: string,
    breakpointModifications: Partial<IStyleProperties>
  ): Partial<IStyleProperties> {
    const cloned = this.clone(properties);
    return {
      ...cloned,
      ...breakpointModifications,
      // Add breakpoint metadata
      responsiveBreakpoint: breakpoint as any,
    };
  }
}

/**
 * Example usage of the utility classes
 */
export class UtilityExamples {
  /**
   * Demonstrate StylePropertyBuilder usage
   */
  static demonstrateStyleBuilder(): void {
    console.log('=== Style Property Builder Demo ===');

    const buttonStyle = new StylePropertyBuilder()
      .position('center', 'bottom')
      .size(200, 50)
      .background('#4CAF50')
      .border('#45a049', 2, 25)
      .text('Roboto, sans-serif', 18, 600, '#ffffff')
      .spacing(12, 8)
      .interactive(true, 'pointer')
      .build();

    console.log('Built button style:', buttonStyle);
  }

  /**
   * Demonstrate BreakpointHelper usage
   */
  static demonstrateBreakpointHelper(): void {
    console.log('\n=== Breakpoint Helper Demo ===');

    const breakpoints = {
      mobile: BreakpointHelper.mobile(),
      tablet: BreakpointHelper.tablet(),
      desktop: BreakpointHelper.desktop(),
      custom: BreakpointHelper.custom(1200, 1600),
    };

    console.log('Generated breakpoints:', breakpoints);
  }

  /**
   * Demonstrate ThemeClassManager usage
   */
  static demonstrateThemeClassManager(): void {
    console.log('\n=== Theme Class Manager Demo ===');

    const manager = new ThemeClassManager();

    manager
      .addClass('.primary-button', {
        backgroundColor: '#007bff',
        color: '#ffffff',
        borderRadius: 6,
        padding: 12,
      })
      .addClass('.secondary-button', {
        backgroundColor: '#6c757d',
        color: '#ffffff',
        borderRadius: 6,
        padding: 12,
      });

    console.log('Available classes:', manager.getClassNames());
    console.log('Primary button class:', manager.getClass('.primary-button'));
  }

  /**
   * Demonstrate StylePropertyValidator usage
   */
  static demonstrateStyleValidator(): void {
    console.log('\n=== Style Property Validator Demo ===');

    const properties: Partial<IStyleProperties> = {
      width: 200,
      height: 50,
      backgroundColor: '#007bff',
      interactive: true,
      fontSize: 16,
    };

    const validation = StylePropertyValidator.validate(properties);
    console.log('Validation result:', validation);
  }

  /**
   * Demonstrate StylePropertyMerger usage
   */
  static demonstrateStyleMerger(): void {
    console.log('\n=== Style Property Merger Demo ===');

    const baseStyle: Partial<IStyleProperties> = {
      width: 200,
      height: 50,
      backgroundColor: '#007bff',
    };

    const overrideStyle: Partial<IStyleProperties> = {
      backgroundColor: '#28a745',
      borderColor: '#20c997',
    };

    const merged = StylePropertyMerger.merge(baseStyle, overrideStyle);
    console.log('Merged style:', merged);
  }
}
