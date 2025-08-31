/**
 * Examples demonstrating the use of ResponsiveConfigLoader
 * Shows how to create dynamic responsive configurations with custom breakpoints
 */

import { ResponsiveConfigLoader } from '../../core/ResponsiveConfigLoader';
import type { ResponsiveConfig } from '../../core/ResponsiveConfigLoader';

/**
 * Example 1: Dynamic responsive config with custom breakpoints
 * This shows how to create flexible breakpoint systems
 */
export const customResponsiveConfig: ResponsiveConfig = {
  // Default breakpoint that loads first (highest priority)
  default: [
    {
      id: 'header',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: { width: 'auto', height: 60, backgroundColor: '#333' },
    },
  ],

  // Dynamic responsive settings - can have any breakpoint keys
  responsiveSettings: {
    // Custom breakpoint names - not limited to xs, sm, md, lg, xl
    'mobile-portrait': [
      {
        id: 'header',
        breakpointCondition: { minWidth: 0, maxWidth: 767 },
        layoutProperties: { height: 50, backgroundColor: '#222' },
      },
    ],
    'mobile-landscape': [
      {
        id: 'header',
        breakpointCondition: { minWidth: 768, maxWidth: 1023 },
        layoutProperties: { height: 55, backgroundColor: '#444' },
      },
    ],
    tablet: [
      {
        id: 'header',
        breakpointCondition: { minWidth: 1024, maxWidth: 1439 },
        layoutProperties: { height: 70, backgroundColor: '#555' },
      },
    ],
    desktop: [
      {
        id: 'header',
        breakpointCondition: { minWidth: 1440, maxWidth: undefined },
        layoutProperties: { height: 80, backgroundColor: '#666' },
      },
    ],
  },

  // Optional metadata about breakpoints
  breakpointMetadata: {
    'mobile-portrait': { name: 'Mobile Portrait', minWidth: 0, maxWidth: 767 },
    'mobile-landscape': { name: 'Mobile Landscape', minWidth: 768, maxWidth: 1023 },
    tablet: { name: 'Tablet', minWidth: 1024, maxWidth: 1439 },
    desktop: { name: 'Desktop', minWidth: 1440, maxWidth: undefined },
  },
};

/**
 * Example 2: E-commerce product grid responsive config
 */
export const productGridResponsiveConfig: ResponsiveConfig = {
  default: [
    {
      id: 'product-grid',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        width: 'fill',
        height: 'auto',
        backgroundColor: '#f8f9fa',
      },
    },
    {
      id: 'product-card',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        width: 300,
        height: 400,
        margin: 15,
        borderRadius: 8,
      },
    },
  ],

  responsiveSettings: {
    mobile: [
      {
        id: 'product-grid',
        breakpointCondition: { minWidth: 0, maxWidth: 575 },
        layoutProperties: {
          width: 'fill',
          height: 'auto',
          backgroundColor: '#ffffff',
        },
      },
      {
        id: 'product-card',
        breakpointCondition: { minWidth: 0, maxWidth: 575 },
        layoutProperties: {
          width: 'fill',
          height: 350,
          margin: 10,
          borderRadius: 6,
        },
      },
    ],
    tablet: [
      {
        id: 'product-grid',
        breakpointCondition: { minWidth: 576, maxWidth: 991 },
        layoutProperties: {
          width: 'fill',
          height: 'auto',
          backgroundColor: '#f8f9fa',
        },
      },
      {
        id: 'product-card',
        breakpointCondition: { minWidth: 576, maxWidth: 991 },
        layoutProperties: {
          width: 280,
          height: 380,
          margin: 12,
          borderRadius: 7,
        },
      },
    ],
    desktop: [
      {
        id: 'product-grid',
        breakpointCondition: { minWidth: 992, maxWidth: undefined },
        layoutProperties: {
          width: 'fill',
          height: 'auto',
          backgroundColor: '#f8f9fa',
        },
      },
      {
        id: 'product-card',
        breakpointCondition: { minWidth: 992, maxWidth: undefined },
        layoutProperties: {
          width: 300,
          height: 400,
          margin: 15,
          borderRadius: 8,
        },
      },
    ],
  },
};

/**
 * Example 3: Dashboard layout responsive config
 */
export const dashboardResponsiveConfig: ResponsiveConfig = {
  default: [
    {
      id: 'dashboard-container',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        width: 'fill',
        height: 'fill',
        backgroundColor: '#f5f5f5',
      },
    },
    {
      id: 'sidebar',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        width: 250,
        height: 'fill',
        backgroundColor: '#2c3e50',
        positionX: 0,
        positionY: 0,
      },
    },
    {
      id: 'main-content',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        width: 'fill',
        height: 'fill',
        backgroundColor: '#ffffff',
        positionX: 250,
        positionY: 0,
      },
    },
  ],

  responsiveSettings: {
    mobile: [
      {
        id: 'dashboard-container',
        breakpointCondition: { minWidth: 0, maxWidth: 767 },
        layoutProperties: {
          width: 'fill',
          height: 'fill',
          backgroundColor: '#f5f5f5',
        },
      },
      {
        id: 'sidebar',
        breakpointCondition: { minWidth: 0, maxWidth: 767 },
        layoutProperties: {
          width: 'fill',
          height: 60,
          backgroundColor: '#2c3e50',
          positionX: 0,
          positionY: 0,
        },
      },
      {
        id: 'main-content',
        breakpointCondition: { minWidth: 0, maxWidth: 767 },
        layoutProperties: {
          width: 'fill',
          height: 'fill',
          backgroundColor: '#ffffff',
          positionX: 0,
          positionY: 60,
        },
      },
    ],
    tablet: [
      {
        id: 'dashboard-container',
        breakpointCondition: { minWidth: 768, maxWidth: 1023 },
        layoutProperties: {
          width: 'fill',
          height: 'fill',
          backgroundColor: '#f5f5f5',
        },
      },
      {
        id: 'sidebar',
        breakpointCondition: { minWidth: 768, maxWidth: 1023 },
        layoutProperties: {
          width: 200,
          height: 'fill',
          backgroundColor: '#2c3e50',
          positionX: 0,
          positionY: 0,
        },
      },
      {
        id: 'main-content',
        breakpointCondition: { minWidth: 768, maxWidth: 1023 },
        layoutProperties: {
          width: 'fill',
          height: 'fill',
          backgroundColor: '#ffffff',
          positionX: 200,
          positionY: 0,
        },
      },
    ],
  },
};

/**
 * Example 4: Navigation menu responsive config
 */
export const navigationResponsiveConfig: ResponsiveConfig = {
  default: [
    {
      id: 'nav-container',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        width: 'fill',
        height: 60,
        backgroundColor: '#34495e',
        positionX: 0,
        positionY: 0,
      },
    },
    {
      id: 'nav-logo',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        width: 120,
        height: 40,
        positionX: 20,
        positionY: 'center',
      },
    },
    {
      id: 'nav-menu',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        width: 'auto',
        height: 'fill',
        positionX: 'right',
        positionY: 'center',
      },
    },
  ],

  responsiveSettings: {
    mobile: [
      {
        id: 'nav-container',
        breakpointCondition: { minWidth: 0, maxWidth: 575 },
        layoutProperties: {
          width: 'fill',
          height: 50,
          backgroundColor: '#2c3e50',
        },
      },
      {
        id: 'nav-logo',
        breakpointCondition: { minWidth: 0, maxWidth: 575 },
        layoutProperties: {
          width: 100,
          height: 30,
          positionX: 15,
          positionY: 'center',
        },
      },
      {
        id: 'nav-menu',
        breakpointCondition: { minWidth: 0, maxWidth: 575 },
        layoutProperties: {
          width: 'auto',
          height: 'fill',
          positionX: 'right',
          positionY: 'center',
        },
      },
    ],
  },
};

/**
 * Example 5: Form layout responsive config
 */
export const formResponsiveConfig: ResponsiveConfig = {
  default: [
    {
      id: 'form-container',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        width: 600,
        height: 'auto',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 30,
      },
    },
    {
      id: 'form-field',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        width: 'fill',
        height: 50,
        margin: 15,
        borderRadius: 4,
      },
    },
  ],

  responsiveSettings: {
    mobile: [
      {
        id: 'form-container',
        breakpointCondition: { minWidth: 0, maxWidth: 575 },
        layoutProperties: {
          width: 'fill',
          height: 'auto',
          backgroundColor: '#ffffff',
          borderRadius: 0,
          padding: 20,
        },
      },
      {
        id: 'form-field',
        breakpointCondition: { minWidth: 0, maxWidth: 575 },
        layoutProperties: {
          width: 'fill',
          height: 45,
          margin: 10,
          borderRadius: 4,
        },
      },
    ],
    tablet: [
      {
        id: 'form-container',
        breakpointCondition: { minWidth: 576, maxWidth: 991 },
        layoutProperties: {
          width: 500,
          height: 'auto',
          backgroundColor: '#ffffff',
          borderRadius: 6,
          padding: 25,
        },
      },
    ],
  },
};

/**
 * Example usage functions
 */
export class ResponsiveConfigExamples {
  /**
   * Demonstrate basic responsive configuration usage
   */
  static demonstrateBasicUsage(): void {
    console.log('=== Basic Responsive Config Demo ===');

    // Register the config
    const loader = ResponsiveConfigLoader.getInstance();
    loader.registerConfig('myScene', customResponsiveConfig);

    // Load and use the config
    const config = loader.loadConfig('myScene');
    if (config) {
      // Get current breakpoint for screen width 1200px
      const currentBreakpoint = ResponsiveConfigLoader.getCurrentBreakpointKey(config, 1200);
      console.log('Current breakpoint for 1200px:', currentBreakpoint); // Returns: 'tablet'

      // Get layout for header at current screen size
      const headerLayout = ResponsiveConfigLoader.getObjectLayout(config, 'header', 1200);
      console.log('Header layout at 1200px:', headerLayout); // Returns: { height: 70, backgroundColor: '#555' }

      // Get all layouts for header across all breakpoints
      const allHeaderLayouts = ResponsiveConfigLoader.getObjectLayoutsAcrossBreakpoints(
        config,
        'header'
      );
      console.log('All header layouts:', allHeaderLayouts);

      // Get breakpoint information
      const info = ResponsiveConfigLoader.getBreakpointInfo(config);
      console.log('Breakpoint info:', info);

      // Validate the config
      const validation = ResponsiveConfigLoader.validateConfig(config);
      console.log('Config validation:', validation);
    }
  }

  /**
   * Demonstrate product grid responsive behavior
   */
  static demonstrateProductGrid(): void {
    console.log('\n=== Product Grid Responsive Demo ===');

    const loader = ResponsiveConfigLoader.getInstance();
    loader.registerConfig('productScene', productGridResponsiveConfig);

    const config = loader.loadConfig('productScene');
    if (config) {
      // Test different screen sizes
      const mobileLayout = ResponsiveConfigLoader.getObjectLayout(config, 'product-card', 375);
      const tabletLayout = ResponsiveConfigLoader.getObjectLayout(config, 'product-card', 768);
      const desktopLayout = ResponsiveConfigLoader.getObjectLayout(config, 'product-card', 1200);

      console.log('Mobile product card:', mobileLayout);
      console.log('Tablet product card:', tabletLayout);
      console.log('Desktop product card:', desktopLayout);
    }
  }

  /**
   * Demonstrate dashboard responsive behavior
   */
  static demonstrateDashboard(): void {
    console.log('\n=== Dashboard Responsive Demo ===');

    const loader = ResponsiveConfigLoader.getInstance();
    loader.registerConfig('dashboardScene', dashboardResponsiveConfig);

    const config = loader.loadConfig('dashboardScene');
    if (config) {
      // Test different screen sizes
      const mobileLayout = ResponsiveConfigLoader.getObjectLayout(config, 'sidebar', 375);
      const tabletLayout = ResponsiveConfigLoader.getObjectLayout(config, 'sidebar', 768);
      const desktopLayout = ResponsiveConfigLoader.getObjectLayout(config, 'sidebar', 1200);

      console.log('Mobile sidebar:', mobileLayout);
      console.log('Tablet sidebar:', tabletLayout);
      console.log('Desktop sidebar:', desktopLayout);
    }
  }

  /**
   * Demonstrate form responsive behavior
   */
  static demonstrateForm(): void {
    console.log('\n=== Form Responsive Demo ===');

    const loader = ResponsiveConfigLoader.getInstance();
    loader.registerConfig('formScene', formResponsiveConfig);

    const config = loader.loadConfig('formScene');
    if (config) {
      // Test different screen sizes
      const mobileLayout = ResponsiveConfigLoader.getObjectLayout(config, 'form-container', 375);
      const tabletLayout = ResponsiveConfigLoader.getObjectLayout(config, 'form-container', 768);
      const desktopLayout = ResponsiveConfigLoader.getObjectLayout(config, 'form-container', 1200);

      console.log('Mobile form:', mobileLayout);
      console.log('Tablet form:', tabletLayout);
      console.log('Desktop form:', desktopLayout);
    }
  }
}

// Export all examples for easy access
export const allResponsiveExamples = {
  custom: customResponsiveConfig,
  productGrid: productGridResponsiveConfig,
  dashboard: dashboardResponsiveConfig,
  navigation: navigationResponsiveConfig,
  form: formResponsiveConfig,
};
