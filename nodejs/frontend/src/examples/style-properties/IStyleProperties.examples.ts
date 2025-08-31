/**
 * Examples demonstrating the use of IStyleProperties with font and UI properties
 * This shows how to create rich, styled game objects using the enhanced interface
 */

import type { IStyleProperties } from '../../../abstract/configs/IStyleProperties'

// Example 1: Text styling with comprehensive font properties
export const textStyleExample: IStyleProperties = {
  // Layout properties
  positionX: 'center',
  positionY: 'center',
  width: 300,
  height: 'auto',
  
  // Font properties
  fontFamily: 'Arial, sans-serif',
  fontSize: 24,
  fontWeight: 'bold',
  fontStyle: 'normal',
  color: '#ffffff',
  textAlign: 'center',
  lineHeight: 1.2,
  letterSpacing: 1,
  
  // Text shadow for depth
  textShadowColor: '#000000',
  textShadowBlur: 3,
  textShadowOffsetX: 2,
  textShadowOffsetY: 2,
  
  // Word wrapping
  wordWrap: true,
  wordWrapWidth: 280,
  
  // Visual properties
  alpha: 1,
  visible: true,
  interactive: true,
  
  // Background for text readability
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  padding: 20,
  borderRadius: 10
}

// Example 2: Button styling with hover effects
export const buttonStyleExample: IStyleProperties = {
  // Layout properties
  positionX: 'center',
  positionY: 'bottom',
  width: 200,
  height: 50,
  
  // Background and border
  backgroundColor: '#4CAF50',
  borderColor: '#45a049',
  borderWidth: 2,
  borderRadius: 25,
  
  // Text properties
  fontFamily: 'Roboto, sans-serif',
  fontSize: 18,
  fontWeight: 600,
  color: '#ffffff',
  textAlign: 'center',
  
  // Shadow for depth
  shadowColor: '#000000',
  shadowBlur: 5,
  shadowOffsetX: 0,
  shadowOffsetY: 3,
  shadowAlpha: 0.3,
  
  // Interactive properties
  interactive: true,
  cursor: 'pointer',
  
  // Animation properties
  animationDuration: 200,
  animationEasing: 'ease-out'
}

// Example 3: Card styling with modern UI design
export const cardStyleExample: IStyleProperties = {
  // Layout properties
  positionX: 'center',
  positionY: 'center',
  width: 350,
  height: 250,
  
  // Background and border
  backgroundColor: '#ffffff',
  borderColor: '#e0e0e0',
  borderWidth: 1,
  borderRadius: 15,
  
  // Shadow for card elevation
  shadowColor: '#000000',
  shadowBlur: 10,
  shadowOffsetX: 0,
  shadowOffsetY: 5,
  shadowAlpha: 0.1,
  
  // Spacing
  padding: 25,
  margin: 20,
  
  // Transform properties
  transformOriginX: 0.5,
  transformOriginY: 0.5,
  
  // Interactive properties
  interactive: true,
  cursor: 'default'
}

// Example 4: Input field styling
export const inputStyleExample: IStyleProperties = {
  // Layout properties
  positionX: 'center',
  positionY: 'center',
  width: 280,
  height: 40,
  
  // Background and border
  backgroundColor: '#ffffff',
  borderColor: '#cccccc',
  borderWidth: 2,
  borderRadius: 8,
  
  // Text properties
  fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  fontSize: 16,
  fontWeight: 'normal',
  color: '#333333',
  textAlign: 'left',
  
  // Padding for text spacing
  padding: 12,
  
  // Focus state properties
  interactive: true,
  cursor: 'text',
  
  // Animation for focus transitions
  animationDuration: 150,
  animationEasing: 'ease-in-out'
}

// Example 5: Modal overlay styling
export const modalStyleExample: IStyleProperties = {
  // Layout properties
  positionX: 0,
  positionY: 0,
  width: 'fill',
  height: 'fill',
  
  // Background overlay
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  
  // Visual properties
  alpha: 1,
  visible: true,
  interactive: true,
  
  // Animation for modal appearance
  animationDuration: 300,
  animationEasing: 'ease-out'
}

// Example 6: Tooltip styling
export const tooltipStyleExample: IStyleProperties = {
  // Layout properties
  positionX: 'center',
  positionY: 'top',
  width: 'auto',
  height: 'auto',
  
  // Background and border
  backgroundColor: '#333333',
  borderColor: '#555555',
  borderWidth: 1,
  borderRadius: 6,
  
  // Text properties
  fontFamily: 'Arial, sans-serif',
  fontSize: 14,
  fontWeight: 'normal',
  color: '#ffffff',
  textAlign: 'center',
  
  // Spacing
  padding: 8,
  margin: 5,
  
  // Shadow for tooltip visibility
  shadowColor: '#000000',
  shadowBlur: 4,
  shadowOffsetX: 0,
  shadowOffsetY: 2,
  shadowAlpha: 0.3,
  
  // Animation properties
  animationDuration: 200,
  animationEasing: 'ease-in-out'
}

// Example 7: Progress bar styling
export const progressBarStyleExample: IStyleProperties = {
  // Layout properties
  positionX: 'center',
  positionY: 'center',
  width: 300,
  height: 20,
  
  // Background and border
  backgroundColor: '#f0f0f0',
  borderColor: '#d0d0d0',
  borderWidth: 1,
  borderRadius: 10,
  
  // Shadow for depth
  shadowColor: '#000000',
  shadowBlur: 2,
  shadowOffsetX: 0,
  shadowOffsetY: 1,
  shadowAlpha: 0.1,
  
  // Interactive properties
  interactive: false,
  
  // Animation for progress updates
  animationDuration: 500,
  animationEasing: 'ease-out'
}

// Example 8: Navigation menu styling
export const navigationStyleExample: IStyleProperties = {
  // Layout properties
  positionX: 0,
  positionY: 0,
  width: 'fill',
  height: 60,
  
  // Background and border
  backgroundColor: '#2c3e50',
  borderColor: '#34495e',
  borderWidth: 0,
  borderBottomWidth: 2,
  
  // Shadow for navigation elevation
  shadowColor: '#000000',
  shadowBlur: 8,
  shadowOffsetX: 0,
  shadowOffsetY: 2,
  shadowAlpha: 0.2,
  
  // Spacing
  padding: 15,
  
  // Interactive properties
  interactive: true,
  cursor: 'default'
}

// Example 9: Notification badge styling
export const badgeStyleExample: IStyleProperties = {
  // Layout properties
  positionX: 'right',
  positionY: 'top',
  width: 20,
  height: 20,
  
  // Background and border
  backgroundColor: '#e74c3c',
  borderColor: '#c0392b',
  borderWidth: 2,
  borderRadius: 10,
  
  // Text properties
  fontFamily: 'Arial, sans-serif',
  fontSize: 12,
  fontWeight: 'bold',
  color: '#ffffff',
  textAlign: 'center',
  
  // Shadow for badge visibility
  shadowColor: '#000000',
  shadowBlur: 3,
  shadowOffsetX: 0,
  shadowOffsetY: 1,
  shadowAlpha: 0.3,
  
  // Animation for notification appearance
  animationDuration: 300,
  animationEasing: 'bounce'
}

// Example 10: Responsive text styling for different breakpoints
export const responsiveTextStyles = {
  // Mobile styles
  mobile: {
    fontSize: 16,
    lineHeight: 1.4,
    padding: 15,
    wordWrapWidth: 250
  } as IStyleProperties,
  
  // Tablet styles
  tablet: {
    fontSize: 18,
    lineHeight: 1.5,
    padding: 20,
    wordWrapWidth: 400
  } as IStyleProperties,
  
  // Desktop styles
  desktop: {
    fontSize: 20,
    lineHeight: 1.6,
    padding: 25,
    wordWrapWidth: 600
  } as IStyleProperties
}

// Helper function to create a complete styled object
export function createStyledObject(
  baseStyle: IStyleProperties,
  overrides: Partial<IStyleProperties> = {}
): IStyleProperties {
  return {
    ...baseStyle,
    ...overrides
  }
}

// Example usage:
export const customButton = createStyledObject(buttonStyleExample, {
  backgroundColor: '#ff6b6b',
  borderColor: '#ee5a52',
  fontSize: 20,
  fontWeight: 700,
  shadowBlur: 8,
  shadowOffsetY: 4
})

// Export all examples for easy access
export const allStyleExamples = {
  textStyle: textStyleExample,
  buttonStyle: buttonStyleExample,
  cardStyle: cardStyleExample,
  inputStyle: inputStyleExample,
  modalStyle: modalStyleExample,
  tooltipStyle: tooltipStyleExample,
  progressBarStyle: progressBarStyleExample,
  navigationStyle: navigationStyleExample,
  badgeStyle: badgeStyleExample,
  responsiveTextStyles,
  customButton
}
