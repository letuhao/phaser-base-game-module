import { ResponsiveConfigLoader } from '../../core/ResponsiveConfigLoader'
import type { ResponsiveConfig } from '../../core/ResponsiveConfigLoader'
import type { IStyleProperties } from '../../abstract/configs/IStyleProperties'

/**
 * Example demonstrating the new theme class system
 * This shows how to use CSS-like classes in responsive configurations
 */

// Example responsive configuration with theme classes
const exampleResponsiveConfig: ResponsiveConfig = {
  // Default breakpoint
  default: [
    {
      id: 'header',
      breakpointCondition: { minWidth: 0 },
      layoutProperties: {
        // Apply theme classes like CSS
        classes: ['.header-primary'],
        // Custom properties that override theme class defaults
        positionX: 'center',
        positionY: 50,
        width: 800,
        height: 80
      }
    },
    {
      id: 'main-button',
      breakpointCondition: { minWidth: 0 },
      layoutProperties: {
        // Apply theme classes
        classes: ['.button-secondary'],
        // Custom positioning
        positionX: 'center',
        positionY: 200,
        width: 200,
        height: 50
      }
    },
    {
      id: 'info-card',
      breakpointCondition: { minWidth: 0 },
      layoutProperties: {
        // Apply theme classes
        classes: ['.card-default'],
        // Custom positioning and size
        positionX: 'center',
        positionY: 300,
        width: 600,
        height: 200,
        // Custom text content (would be handled by text object in actual implementation)
      }
    }
  ],
  
  // Mobile breakpoint
  responsiveSettings: {
    mobile: [
      {
        id: 'header',
        breakpointCondition: { minWidth: 0, maxWidth: 768 },
        layoutProperties: {
          // Same theme class, different responsive behavior
          classes: ['.header-primary'],
          positionX: 'center',
          positionY: 30,
          width: 'fill', // Full width on mobile
          height: 60
        }
      },
      {
        id: 'main-button',
        breakpointCondition: { minWidth: 0, maxWidth: 768 },
        layoutProperties: {
          classes: ['.button-secondary'],
          positionX: 'center',
          positionY: 150,
          width: 'fill', // Full width on mobile
          height: 60
        }
      },
      {
        id: 'info-card',
        breakpointCondition: { minWidth: 0, maxWidth: 768 },
        layoutProperties: {
          classes: ['.card-default'],
          positionX: 'center',
          positionY: 250,
          width: 'fill', // Full width on mobile
          height: 150
        }
      }
    ]
  },
  
  // Theme class definitions (alternative to defining in ThemeConfigLoader)
  themeClasses: {
    '.mobile-optimized': {
      backgroundColor: '#f8fafc',
      color: '#1e293b',
      fontFamily: 'Inter, system-ui, sans-serif',
      fontSize: 14,
      fontWeight: 400,
      padding: 16,
      borderRadius: 8
    }
  }
}

/**
 * Example usage functions
 */
export class ThemeClassesExample {
  
  /**
   * Demonstrate how theme classes are applied
   */
  static demonstrateThemeClasses(): void {
    console.log('=== Theme Classes Demo ===')
    
    // Get available theme classes
    const availableClasses = ResponsiveConfigLoader.getAvailableThemeClasses()
    console.log('Available theme classes:', availableClasses)
    
    // Get a specific theme class
    const headerClass = ResponsiveConfigLoader.getThemeClass('.header-primary')
    console.log('Header class definition:', headerClass)
    
    // Apply theme class to properties
    const baseProperties: IStyleProperties = {
      positionX: 'center',
      positionY: 100,
      width: 400,
      height: 60
    }
    
    const themedProperties = ResponsiveConfigLoader.applyThemeClass(
      baseProperties, 
      '.header-primary'
    )
    
    console.log('Base properties:', baseProperties)
    console.log('After applying .header-primary class:', themedProperties)
  }
  
  /**
   * Demonstrate responsive configuration with theme classes
   */
  static demonstrateResponsiveWithClasses(): void {
    console.log('\n=== Responsive + Theme Classes Demo ===')
    
    // Get object layout with theme integration
    const headerLayout = ResponsiveConfigLoader.getObjectLayoutWithTheme(
      exampleResponsiveConfig,
      'header',
      1920 // Desktop width
    )
    
    console.log('Desktop header layout:', headerLayout)
    
    // Get mobile layout
    const mobileHeaderLayout = ResponsiveConfigLoader.getObjectLayoutWithTheme(
      exampleResponsiveConfig,
      'header',
      375 // Mobile width
    )
    
    console.log('Mobile header layout:', mobileHeaderLayout)
  }
  
  /**
   * Show how to create custom theme classes
   */
  static demonstrateCustomClasses(): void {
    console.log('\n=== Custom Theme Classes Demo ===')
    
    // Create a custom theme class
    const customClass: IStyleProperties = {
      backgroundColor: '#8b5cf6', // Purple
      color: '#ffffff',
      fontFamily: 'Georgia, serif',
      fontSize: 18,
      fontWeight: 600,
      padding: 20,
      borderRadius: 16
    }
    
    // Apply custom class to properties
    const baseProps: IStyleProperties = {
      positionX: 'center',
      positionY: 400,
      width: 300,
      height: 100
    }
    
    const customThemedProps = ResponsiveConfigLoader.applyThemeClass(
      baseProps,
      '.custom-purple'
    )
    
    console.log('Base properties:', baseProps)
    console.log('Custom class properties:', customClass)
    console.log('After applying custom class:', customThemedProps)
  }
}

// Export for use in other files
export { exampleResponsiveConfig }
