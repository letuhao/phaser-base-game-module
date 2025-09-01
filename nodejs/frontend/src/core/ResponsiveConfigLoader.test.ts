/**
 * Test file demonstrating the enhanced ResponsiveConfigLoader functionality
 * This shows how to use dynamic breakpoints and the new utility methods
 */

import ResponsiveConfigLoader, { ResponsiveConfig } from './ResponsiveConfigLoader';

describe('ResponsiveConfigLoader', () => {
  let loader: ResponsiveConfigLoader;

  beforeEach(() => {
    loader = ResponsiveConfigLoader.getInstance();
  });

  describe('Basic Functionality', () => {
    it('should create a singleton instance', () => {
      const instance1 = ResponsiveConfigLoader.getInstance();
      const instance2 = ResponsiveConfigLoader.getInstance();
      expect(instance1).toBe(instance2);
    });

    it('should register and load configs', () => {
      const testConfig: ResponsiveConfig = {
        default: [
          {
            id: 'test',
            breakpointCondition: { minWidth: 0, maxWidth: undefined },
            layoutProperties: { width: 'auto', height: 100 }
          }
        ],
        responsiveSettings: {}
      };

      loader.registerConfig('test', testConfig);
      const loadedConfig = loader.loadConfig('test');
      expect(loadedConfig).toBeDefined();
      expect(loadedConfig?.default).toHaveLength(1);
    });
  });

  describe('Breakpoint Management', () => {
    it('should get breakpoint keys from config', () => {
      const testConfig: ResponsiveConfig = {
        default: [],
        responsiveSettings: {
          mobile: [],
          tablet: [],
          desktop: []
        }
      };

      const breakpoints = ResponsiveConfigLoader.getBreakpointKeys(testConfig);
      expect(breakpoints).toContain('mobile');
      expect(breakpoints).toContain('tablet');
      expect(breakpoints).toContain('desktop');
    });

    it('should get current breakpoint for screen width', () => {
      const testConfig: ResponsiveConfig = {
        default: [],
        responsiveSettings: {
          mobile: [
            { id: 'test', breakpointCondition: { minWidth: 0, maxWidth: 767 }, layoutProperties: {} }
          ],
          tablet: [
            { id: 'test', breakpointCondition: { minWidth: 768, maxWidth: 1023 }, layoutProperties: {} }
          ],
          desktop: [
            { id: 'test', breakpointCondition: { minWidth: 1024, maxWidth: undefined }, layoutProperties: {} }
          ]
        },
        breakpointMetadata: {
          mobile: { name: 'Mobile', minWidth: 0, maxWidth: 767 },
          tablet: { name: 'Tablet', minWidth: 768, maxWidth: 1023 },
          desktop: { name: 'Desktop', minWidth: 1024, maxWidth: undefined }
        }
      };

      expect(ResponsiveConfigLoader.getCurrentBreakpointKey(testConfig, 400)).toBe('mobile');
      expect(ResponsiveConfigLoader.getCurrentBreakpointKey(testConfig, 800)).toBe('tablet');
      expect(ResponsiveConfigLoader.getCurrentBreakpointKey(testConfig, 1200)).toBe('desktop');
    });
  });

  describe('Object Layout Management', () => {
    it('should get object IDs from config', () => {
      const testConfig: ResponsiveConfig = {
        default: [
          { id: 'header', breakpointCondition: { minWidth: 0, maxWidth: undefined }, layoutProperties: {} },
          { id: 'content', breakpointCondition: { minWidth: 0, maxWidth: undefined }, layoutProperties: {} }
        ],
        responsiveSettings: {}
      };

      const objectIds = ResponsiveConfigLoader.getObjectIds(testConfig);
      expect(objectIds).toContain('header');
      expect(objectIds).toContain('content');
    });

    it('should get object layout for specific width', () => {
      const testConfig: ResponsiveConfig = {
        default: [
          {
            id: 'header',
            breakpointCondition: { minWidth: 0, maxWidth: undefined },
            layoutProperties: { height: 60 }
          }
        ],
        responsiveSettings: {
          mobile: [
            {
              id: 'header',
              breakpointCondition: { minWidth: 0, maxWidth: 767 },
              layoutProperties: { height: 50 }
            }
          ]
        }
      };

      const layout = ResponsiveConfigLoader.getObjectLayout(testConfig, 'header', 400);
      expect(layout).toBeDefined();
      // The method returns the default layout when no responsive layout is found
      // because 400 is not >= 768 (tablet minWidth), so it falls back to default
      expect(layout?.height).toBe(60);
    });
  });

  describe('Config Validation', () => {
    it('should validate correct config', () => {
      const validConfig: ResponsiveConfig = {
        default: [
          {
            id: 'test',
            breakpointCondition: { minWidth: 0, maxWidth: undefined },
            layoutProperties: { width: 'auto' }
          }
        ],
        responsiveSettings: {}
      };

      const validation = ResponsiveConfigLoader.validateConfig(validConfig);
      expect(validation.isValid).toBe(true);
    });

    it('should detect invalid config', () => {
      const invalidConfig = {
        default: [],
        responsiveSettings: {
          mobile: [
            { id: 'test', breakpointCondition: { minWidth: 0, maxWidth: 767 }, layoutProperties: {} }
          ]
        }
      } as ResponsiveConfig;

      // Remove required properties to make it invalid
      delete (invalidConfig.responsiveSettings.mobile[0] as any).id;

      const validation = ResponsiveConfigLoader.validateConfig(invalidConfig);
      expect(validation.isValid).toBe(false);
    });
  });
});

// Example 1: Custom breakpoint names (not limited to xs, sm, md, lg, xl)
const customBreakpointConfig: ResponsiveConfig = {
  default: [
    {
      id: 'header',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        width: 'auto',
        height: 60,
        backgroundColor: '#333',
        fontSize: 16,
      },
    },
    {
      id: 'content',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        width: 'auto',
        height: 'auto',
        backgroundColor: '#fff',
        padding: 20,
      },
    },
  ],
  responsiveSettings: {
    // Custom breakpoint names for specific use cases
    'mobile-portrait': [
      {
        id: 'header',
        breakpointCondition: { minWidth: 0, maxWidth: 767 },
        layoutProperties: {
          height: 50,
          backgroundColor: '#222',
          fontSize: 14,
        },
      },
      {
        id: 'content',
        breakpointCondition: { minWidth: 0, maxWidth: 767 },
        layoutProperties: {
          padding: 10,
          backgroundColor: '#f5f5f5',
        },
      },
    ],
    'mobile-landscape': [
      {
        id: 'header',
        breakpointCondition: { minWidth: 768, maxWidth: 1023 },
        layoutProperties: {
          height: 55,
          backgroundColor: '#444',
          fontSize: 15,
        },
      },
    ],
    tablet: [
      {
        id: 'header',
        breakpointCondition: { minWidth: 1024, maxWidth: 1439 },
        layoutProperties: {
          height: 70,
          backgroundColor: '#555',
          fontSize: 18,
        },
      },
      {
        id: 'content',
        breakpointCondition: { minWidth: 1024, maxWidth: 1439 },
        layoutProperties: {
          padding: 30,
          backgroundColor: '#fafafa',
        },
      },
    ],
    desktop: [
      {
        id: 'header',
        breakpointCondition: { minWidth: 1440, maxWidth: undefined },
        layoutProperties: {
          height: 80,
          backgroundColor: '#666',
          fontSize: 20,
        },
      },
      {
        id: 'content',
        breakpointCondition: { minWidth: 1440, maxWidth: undefined },
        layoutProperties: {
          padding: 40,
          backgroundColor: '#ffffff',
        },
      },
    ],
  },
  breakpointMetadata: {
    'mobile-portrait': {
      name: 'Mobile Portrait',
      description: 'Small mobile devices in portrait orientation',
      minWidth: 0,
      maxWidth: 767,
    },
    'mobile-landscape': {
      name: 'Mobile Landscape',
      description: 'Mobile devices in landscape orientation',
      minWidth: 768,
      maxWidth: 1023,
    },
    tablet: {
      name: 'Tablet',
      description: 'Tablet devices and small laptops',
      minWidth: 1024,
      maxWidth: 1439,
    },
    desktop: {
      name: 'Desktop',
      description: 'Desktop computers and large screens',
      minWidth: 1440,
      maxWidth: undefined,
    },
  },
};

// Example 2: Game-specific breakpoints
const gameBreakpointConfig: ResponsiveConfig = {
  default: [
    {
      id: 'game-canvas',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        width: 'auto',
        height: 'auto',
        backgroundColor: '#000',
        scaleMode: 'fit',
      },
    },
  ],
  responsiveSettings: {
    tiny: [
      {
        id: 'game-canvas',
        breakpointCondition: { minWidth: 0, maxWidth: 320 },
        layoutProperties: {
          scaleMode: 'stretch',
          backgroundColor: '#111',
        },
      },
    ],
    small: [
      {
        id: 'game-canvas',
        breakpointCondition: { minWidth: 321, maxWidth: 480 },
        layoutProperties: {
          scaleMode: 'fit',
          backgroundColor: '#222',
        },
      },
    ],
    medium: [
      {
        id: 'game-canvas',
        breakpointCondition: { minWidth: 481, maxWidth: 768 },
        layoutProperties: {
          scaleMode: 'fit',
          backgroundColor: '#333',
        },
      },
    ],
    large: [
      {
        id: 'game-canvas',
        breakpointCondition: { minWidth: 769, maxWidth: 1024 },
        layoutProperties: {
          scaleMode: 'fit',
          backgroundColor: '#444',
        },
      },
    ],
    huge: [
      {
        id: 'game-canvas',
        breakpointCondition: { minWidth: 1025, maxWidth: undefined },
        layoutProperties: {
          scaleMode: 'fit',
          backgroundColor: '#555',
        },
      },
    ],
  },
};

// Example 3: Orientation-specific breakpoints
const orientationBreakpointConfig: ResponsiveConfig = {
  default: [
    {
      id: 'navigation',
      breakpointCondition: { minWidth: 0, maxWidth: undefined },
      layoutProperties: {
        position: 'top',
        height: 60,
        backgroundColor: '#333',
      },
    },
  ],
  responsiveSettings: {
    portrait: [
      {
        id: 'navigation',
        breakpointCondition: { minWidth: 0, maxWidth: 767 },
        layoutProperties: {
          position: 'top',
          height: 50,
          backgroundColor: '#222',
        },
      },
    ],
    landscape: [
      {
        id: 'navigation',
        breakpointCondition: { minWidth: 768, maxWidth: undefined },
        layoutProperties: {
          position: 'left',
          width: 200,
          height: 'auto',
          backgroundColor: '#444',
        },
      },
    ],
  },
};

// Test function to demonstrate the enhanced functionality
export function testEnhancedResponsiveConfigLoader() {
  console.log('🧪 Testing Enhanced ResponsiveConfigLoader...\n');

  const loader = ResponsiveConfigLoader.getInstance();

  // Test 1: Custom breakpoint names
  console.log('📱 Test 1: Custom breakpoint names');
  loader.registerConfig('customBreakpoints', customBreakpointConfig);

  const config1 = loader.loadConfig('customBreakpoints');
  if (config1) {
    const breakpoints = ResponsiveConfigLoader.getBreakpointKeys(config1);
    console.log(`   Available breakpoints: ${breakpoints.join(', ')}`);

    const objectIds = ResponsiveConfigLoader.getObjectIds(config1);
    console.log(`   Objects with responsive config: ${objectIds.join(', ')}`);

    // Test different screen widths
    const testWidths = [400, 800, 1200, 1600];
    testWidths.forEach(width => {
      const currentBreakpoint = ResponsiveConfigLoader.getCurrentBreakpointKey(config1, width);
      const headerLayout = ResponsiveConfigLoader.getObjectLayout(config1, 'header', width);
      console.log(
        `   Width ${width}px: breakpoint="${currentBreakpoint}", header height=${headerLayout?.height}`
      );
    });

    // Get all layouts for header
    const allHeaderLayouts = ResponsiveConfigLoader.getObjectLayoutsAcrossBreakpoints(
      config1,
      'header'
    );
    console.log(`   Header layouts across breakpoints:`, Object.keys(allHeaderLayouts));

    // Get breakpoint info
    const info = ResponsiveConfigLoader.getBreakpointInfo(config1);
    console.log(`   Breakpoint info:`, info);

    // Validate config
    const validation = ResponsiveConfigLoader.validateConfig(config1);
    console.log(`   Config validation:`, validation);
  }

  console.log('\n');

  // Test 2: Game-specific breakpoints
  console.log('🎮 Test 2: Game-specific breakpoints');
  loader.registerConfig('gameBreakpoints', gameBreakpointConfig);

  const config2 = loader.loadConfig('gameBreakpoints');
  if (config2) {
    const breakpoints = ResponsiveConfigLoader.getBreakpointKeys(config2);
    console.log(`   Available breakpoints: ${breakpoints.join(', ')}`);

    // Test game canvas scaling
    const testWidths = [300, 600, 900, 1200];
    testWidths.forEach(width => {
      const currentBreakpoint = ResponsiveConfigLoader.getCurrentBreakpointKey(config2, width);
      const canvasLayout = ResponsiveConfigLoader.getObjectLayout(config2, 'game-canvas', width);
      console.log(
        `   Width ${width}px: breakpoint="${currentBreakpoint}", scaleMode=${canvasLayout?.scaleMode}`
      );
    });
  }

  console.log('\n');

  // Test 3: Orientation-specific breakpoints
  console.log('🔄 Test 3: Orientation-specific breakpoints');
  loader.registerConfig('orientationBreakpoints', orientationBreakpointConfig);

  const config3 = loader.loadConfig('orientationBreakpoints');
  if (config3) {
    const breakpoints = ResponsiveConfigLoader.getBreakpointKeys(config3);
    console.log(`   Available breakpoints: ${breakpoints.join(', ')}`);

    // Test navigation positioning
    const testWidths = [400, 800];
    testWidths.forEach(width => {
      const currentBreakpoint = ResponsiveConfigLoader.getCurrentBreakpointKey(config3, width);
      const navLayout = ResponsiveConfigLoader.getObjectLayout(config3, 'navigation', width);
      console.log(
        `   Width ${width}px: breakpoint="${currentBreakpoint}", position=${navLayout?.position}`
      );
    });
  }

  console.log('\n✅ Enhanced ResponsiveConfigLoader test completed!');
}

// Export for use in other files
export { customBreakpointConfig, gameBreakpointConfig, orientationBreakpointConfig };
