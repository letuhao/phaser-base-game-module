import type { CommonIStyleProperties } from './IStyleProperties'

// Interface for objects that can be styled with responsive properties
export interface IStyle {
  /**
   * Set the style properties for this object
   * Called when resize occurs to apply new responsive properties
   */
  setStyle(layoutProperties: CommonIStyleProperties): void
  
  /**
   * Get the current style properties
   */
  getStyle(): CommonIStyleProperties
  
  /**
   * Get the object ID for responsive config lookup
   */
  getStyleId(): string
}
