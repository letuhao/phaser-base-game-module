import type { IUnitStrategy } from './IUnitStrategy'
import type { UnitContext } from '../interfaces/IUnit'
import { UnitType } from '../enums/UnitType'
import { Dimension } from '../enums/Dimension'
import { UnitCalculatorFactory } from '../classes/UnitCalculatorFactory'

/**
 * Mixed Unit Strategy
 * Handles complex calculations involving multiple unit types
 * Coordinates between size, position, and scale strategies
 */
export class MixedUnitStrategy implements IUnitStrategy {
  readonly unitType = 'mixed'
  private readonly factory = UnitCalculatorFactory.getInstance()

  /**
   * Calculate mixed unit value using the appropriate strategy
   */
  calculate(input: any, context: UnitContext): number {
    // Handle arrays of mixed units
    if (Array.isArray(input)) {
      return this.calculateMixedArray(input, context)
    }

    // Handle objects with mixed unit properties
    if (typeof input === 'object' && input !== null) {
      return this.calculateMixedObject(input, context)
    }

    // Handle string expressions
    if (typeof input === 'string') {
      return this.calculateStringExpression(input, context)
    }

    // Default fallback
    return 0
  }

  /**
   * Check if this strategy can handle the input
   */
  canHandle(input: any): boolean {
    return (
      Array.isArray(input) ||
      (typeof input === 'object' && input !== null && !this.isSimpleValue(input)) ||
      (typeof input === 'string' && this.containsMixedExpressions(input))
    )
  }

  /**
   * Get strategy priority (lower = higher priority)
   */
  getPriority(): number {
    return 1 // Highest priority for complex mixed calculations
  }

  /**
   * Calculate from array of mixed units
   */
  private calculateMixedArray(input: any[], context: UnitContext): number {
    if (input.length === 0) return 0

    // Handle different array patterns
    if (input.length === 2 && typeof input[0] === 'string' && typeof input[1] === 'number') {
      // Pattern: ['unit-type', value]
      return this.calculateTypedValue(input[0], input[1], context)
    }

    if (input.length === 3 && input.every(item => typeof item === 'string')) {
      // Pattern: ['unit-type', 'dimension', 'value']
      return this.calculateTypedDimensionValue(input[0], input[1], input[2], context)
    }

    // Default: calculate average of all values
    const results = input.map(item => this.calculateSingleValue(item, context))
    return results.reduce((sum, val) => sum + val, 0) / results.length
  }

  /**
   * Calculate typed dimension value
   */
  private calculateTypedDimensionValue(unitType: string, dimension: string, value: string, context: UnitContext): number {
    // Set the dimension in context
    const dim = this.mapDimension(dimension)
    if (dim) {
      context.dimension = dim
    }
    
    // Calculate the value based on unit type
    return this.calculateTypedValue(unitType, value, context)
  }

  /**
   * Calculate from object with mixed unit properties
   */
  private calculateMixedObject(input: any, context: UnitContext): number {
    const { unitType, dimension, value, ...otherProps } = input

    // Handle explicit unit type specification
    if (unitType && value !== undefined) {
      return this.calculateTypedValue(unitType, value, context)
    }

    // Handle dimension-specific calculations
    if (dimension && value !== undefined) {
      return this.calculateDimensionValue(dimension, value, context)
    }

    // Handle responsive breakpoint objects
    if (this.isResponsiveObject(input)) {
      return this.calculateResponsiveValue(input, context)
    }

    // Handle theme class objects
    if (this.isThemeObject(input)) {
      return this.calculateThemeValue(input, context)
    }

    // Default: try to extract numeric value
    return this.extractNumericValue(input)
  }

  /**
   * Calculate from string expression
   */
  private calculateStringExpression(input: string, context: UnitContext): number {
    // Handle mathematical expressions
    if (input.includes('+') || input.includes('-') || input.includes('*') || input.includes('/')) {
      return this.calculateMathExpression(input, context)
    }

    // Handle unit conversions
    if (input.includes('px') || input.includes('%') || input.includes('vw') || input.includes('vh')) {
      return this.calculateUnitConversion(input, context)
    }

    // Handle CSS-like expressions
    if (input.includes('calc(') || input.includes('var(')) {
      return this.calculateCSSExpression(input, context)
    }

    // Default: treat as simple value
    return this.calculateSingleValue(input, context)
  }

  /**
   * Calculate typed value with unit type
   */
  private calculateTypedValue(unitType: string, value: any, context: UnitContext): number {
    switch (unitType.toLowerCase()) {
      case 'size':
        return this.calculateSizeValue(value, context)
      case 'position':
        return this.calculatePositionValue(value, context)
      case 'scale':
        return this.calculateScaleValue(value, context)
      default:
        return this.calculateSingleValue(value, context)
    }
  }

  /**
   * Calculate dimension-specific value
   */
  private calculateDimensionValue(dimension: string, value: any, context: UnitContext): number {
    const dim = this.mapDimension(dimension)
    if (dim) {
      context.dimension = dim
    }
    return this.calculateSingleValue(value, context)
  }

  /**
   * Calculate responsive value
   */
  private calculateResponsiveValue(input: any, context: UnitContext): number {
    // This would integrate with responsive config system
    // For now, return a default value
    return 0
  }

  /**
   * Calculate theme value
   */
  private calculateThemeValue(input: any, context: UnitContext): number {
    // This would integrate with theme system
    // For now, return a default value
    return 0
  }

  /**
   * Calculate mathematical expression
   */
  private calculateMathExpression(expression: string, context: UnitContext): number {
    // Simple math expression evaluation
    // In production, use a proper expression parser
    try {
      // Replace unit references with calculated values
      const processedExpression = this.processMathExpression(expression, context)
      return eval(processedExpression) // Note: eval is used for simplicity, consider using a safer parser
    } catch (error) {
      console.warn('Failed to evaluate math expression:', expression, error)
      return 0
    }
  }

  /**
   * Calculate unit conversion
   */
  private calculateUnitConversion(input: string, context: UnitContext): number {
    // Extract numeric value and unit
    const match = input.match(/^([\d.]+)(\w+)$/)
    if (!match) return 0

    const [, value, unit] = match
    const numericValue = parseFloat(value)

    switch (unit) {
      case 'px':
        return numericValue
      case '%':
        return this.calculatePercentage(numericValue, context)
      case 'vw':
        return this.calculateViewportWidth(numericValue, context)
      case 'vh':
        return this.calculateViewportHeight(numericValue, context)
      default:
        return numericValue
    }
  }

  /**
   * Calculate CSS expression
   */
  private calculateCSSExpression(input: string, context: UnitContext): number {
    // Handle CSS calc() and var() functions
    // For now, return a default value
    return 0
  }

  /**
   * Helper methods
   */
  private calculateSingleValue(value: any, context: UnitContext): number {
    if (typeof value === 'number') return value
    if (typeof value === 'string') return parseFloat(value) || 0
    return 0
  }

  private calculateSizeValue(value: any, context: UnitContext): number {
    // Delegate to size strategy
    return 0 // Placeholder
  }

  private calculatePositionValue(value: any, context: UnitContext): number {
    // Delegate to position strategy
    return 0 // Placeholder
  }

  private calculateScaleValue(value: any, context: UnitContext): number {
    // Delegate to scale strategy
    return 0 // Placeholder
  }

  private calculatePercentage(value: number, context: UnitContext): number {
    const parentSize = context.parent?.width || context.scene?.width || 800
    return (value / 100) * parentSize
  }

  private calculateViewportWidth(value: number, context: UnitContext): number {
    const viewportWidth = context.viewport?.width || context.scene?.width || 800
    return (value / 100) * viewportWidth
  }

  private calculateViewportHeight(value: number, context: UnitContext): number {
    const viewportHeight = context.viewport?.height || context.scene?.height || 600
    return (value / 100) * viewportHeight
  }

  private mapDimension(dimension: string): Dimension | undefined {
    const dimensionMap: Record<string, Dimension> = {
      'width': Dimension.WIDTH,
      'height': Dimension.HEIGHT,
      'both': Dimension.BOTH,
      'x': Dimension.X,
      'y': Dimension.Y,
      'xy': Dimension.XY
    }
    return dimensionMap[dimension.toLowerCase()]
  }

  private processMathExpression(expression: string, context: UnitContext): string {
    // Replace unit references with calculated values
    return expression
      .replace(/\bwidth\b/g, String(context.parent?.width || 100))
      .replace(/\bheight\b/g, String(context.parent?.height || 100))
      .replace(/\bscene\.width\b/g, String(context.scene?.width || 800))
      .replace(/\bscene\.height\b/g, String(context.scene?.height || 600))
  }

  private isSimpleValue(input: any): boolean {
    return typeof input === 'number' || typeof input === 'string' || input === null
  }

  private isResponsiveObject(input: any): boolean {
    return input.default !== undefined || input.breakpoints !== undefined
  }

  private isThemeObject(input: any): boolean {
    return input.theme !== undefined || input.classes !== undefined
  }

  private containsMixedExpressions(input: string): boolean {
    return /[+\-*/]/.test(input) || /px|%|vw|vh|calc\(|var\(/.test(input)
  }

  private extractNumericValue(input: any): number {
    if (typeof input === 'number') return input
    if (typeof input === 'string') return parseFloat(input) || 0
    if (input && typeof input.value === 'number') return input.value
    return 0
  }
}
