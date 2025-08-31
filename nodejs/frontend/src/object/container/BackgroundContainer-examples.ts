import Phaser from 'phaser';
import { BackgroundContainer } from './BackgroundContainer';
import { FlexboxContainer } from './FlexboxContainer';

/**
 * Examples demonstrating BackgroundContainer usage for multiple devices
 * Shows how to create responsive layouts that adapt to different screen sizes
 */

/**
 * Example 1: Basic Background Container Setup
 * Creates a background container with automatic responsive sizing
 */
export function createBasicBackgroundContainer(scene: Phaser.Scene): BackgroundContainer {
  const backgroundContainer = new BackgroundContainer(scene, 'mainBackground', 0, 0);

  // Set background image with default settings (maintains aspect ratio)
  backgroundContainer.setBackgroundImage('background_landscape', {
    maintainAspectRatio: true,
    scalingMode: 'fit',
    alignment: { x: 'center', y: 'center' },
    backgroundColor: '#1a1a2e',
  });

  return backgroundContainer;
}

/**
 * Example 2: Mobile-First Background Container
 * Optimized for mobile devices with portrait orientation
 */
export function createMobileBackgroundContainer(scene: Phaser.Scene): BackgroundContainer {
  const backgroundContainer = new BackgroundContainer(scene, 'mobileBackground', 0, 0);

  // Set background image optimized for mobile
  backgroundContainer.setBackgroundImage('background_mobile', {
    maintainAspectRatio: true,
    scalingMode: 'fill', // Fill screen to avoid letterboxing on mobile
    alignment: { x: 'center', y: 'top' }, // Align to top for mobile UI
    backgroundColor: '#2d1b69',
  });

  return backgroundContainer;
}

/**
 * Example 3: Tablet Background Container
 * Optimized for tablet devices with landscape orientation
 */
export function createTabletBackgroundContainer(scene: Phaser.Scene): BackgroundContainer {
  const backgroundContainer = new BackgroundContainer(scene, 'tabletBackground', 0, 0);

  // Set background image optimized for tablet
  backgroundContainer.setBackgroundImage('background_tablet', {
    maintainAspectRatio: true,
    scalingMode: 'fit', // Fit within screen bounds
    alignment: { x: 'center', y: 'center' },
    backgroundColor: '#1b4332',
  });

  return backgroundContainer;
}

/**
 * Example 4: Desktop Background Container
 * Optimized for desktop with high-resolution displays
 */
export function createDesktopBackgroundContainer(scene: Phaser.Scene): BackgroundContainer {
  const backgroundContainer = new BackgroundContainer(scene, 'desktopBackground', 0, 0);

  // Set high-resolution background image
  backgroundContainer.setBackgroundImage('background_desktop', {
    maintainAspectRatio: true,
    scalingMode: 'fit', // Fit within screen bounds
    alignment: { x: 'center', y: 'center' },
    backgroundColor: '#0f4c75',
  });

  return backgroundContainer;
}

/**
 * Example 5: Responsive Background Container with Dynamic Switching
 * Automatically switches background based on device characteristics
 */
export function createResponsiveBackgroundContainer(scene: Phaser.Scene): BackgroundContainer {
  const backgroundContainer = new BackgroundContainer(scene, 'responsiveBackground', 0, 0);

  // Function to update background based on device characteristics
  function updateBackgroundForDevice(): void {
    const gameWidth = scene.game.scale.width;
    const gameHeight = scene.game.scale.height;
    const aspectRatio = gameWidth / gameHeight;

    // Determine device type based on dimensions and aspect ratio
    if (gameWidth < 768) {
      // Mobile device
      if (aspectRatio < 1) {
        // Portrait mobile
        backgroundContainer.setBackgroundImage('background_mobile_portrait', {
          scalingMode: 'fill',
          alignment: { x: 'center', y: 'top' },
        });
      } else {
        // Landscape mobile
        backgroundContainer.setBackgroundImage('background_mobile_landscape', {
          scalingMode: 'fill',
          alignment: { x: 'center', y: 'center' },
        });
      }
    } else if (gameWidth < 1024) {
      // Tablet device
      backgroundContainer.setBackgroundImage('background_tablet', {
        scalingMode: 'fit',
        alignment: { x: 'center', y: 'center' },
      });
    } else {
      // Desktop device
      backgroundContainer.setBackgroundImage('background_desktop', {
        scalingMode: 'fit',
        alignment: { x: 'center', y: 'center' },
      });
    }
  }

  // Set initial background
  updateBackgroundForDevice();

  // Listen for resize events to update background
  scene.game.scale.on('resize', updateBackgroundForDevice);

  return backgroundContainer;
}

/**
 * Example 6: Background Container with UI Overlay
 * Shows how to add UI elements on top of the background
 */
export function createBackgroundWithUI(scene: Phaser.Scene): BackgroundContainer {
  const backgroundContainer = new BackgroundContainer(scene, 'backgroundWithUI', 0, 0);

  // Set background image
  backgroundContainer.setBackgroundImage('background_ui', {
    maintainAspectRatio: true,
    scalingMode: 'fit',
    alignment: { x: 'center', y: 'center' },
  });

  // Create UI container that will be positioned relative to background
  const uiContainer = new FlexboxContainer(scene, 'uiOverlay', 0, 0, backgroundContainer);

  // Configure UI container for overlay positioning
  uiContainer.setFlexboxProperties({
    direction: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  });

  // Add UI elements to the overlay
  // (This would be implemented based on your UI requirements)

  return backgroundContainer;
}

/**
 * Example 7: Multi-Device Background Container with Breakpoints
 * Uses specific breakpoints for different device types
 */
export function createMultiDeviceBackgroundContainer(scene: Phaser.Scene): BackgroundContainer {
  const backgroundContainer = new BackgroundContainer(scene, 'multiDeviceBackground', 0, 0);

  // Define device breakpoints
  const breakpoints = {
    mobile: { maxWidth: 767, background: 'background_mobile' },
    tablet: { minWidth: 768, maxWidth: 1023, background: 'background_tablet' },
    desktop: { minWidth: 1024, background: 'background_desktop' },
  };

  // Function to determine current device type
  function getCurrentDeviceType(): string {
    const width = scene.game.scale.width;

    if (width <= breakpoints.mobile.maxWidth) return 'mobile';
    if (width <= breakpoints.tablet.maxWidth) return 'tablet';
    return 'desktop';
  }

  // Function to update background for current device
  function updateBackgroundForDevice(): void {
    const deviceType = getCurrentDeviceType();
    const breakpoint = breakpoints[deviceType as keyof typeof breakpoints];

    if (breakpoint && 'background' in breakpoint) {
      const backgroundKey = breakpoint.background as string;

      // Set device-specific background properties
      const deviceProperties = {
        mobile: {
          scalingMode: 'fill' as const,
          alignment: { x: 'center' as const, y: 'top' as const },
          maintainAspectRatio: true,
        },
        tablet: {
          scalingMode: 'fit' as const,
          alignment: { x: 'center' as const, y: 'center' as const },
          maintainAspectRatio: true,
        },
        desktop: {
          scalingMode: 'fit' as const,
          alignment: { x: 'center' as const, y: 'center' as const },
          maintainAspectRatio: true,
        },
      };

      backgroundContainer.setBackgroundImage(
        backgroundKey,
        deviceProperties[deviceType as keyof typeof deviceProperties]
      );

      console.log(`Background updated for ${deviceType} device: ${backgroundKey}`);
    }
  }

  // Set initial background
  updateBackgroundForDevice();

  // Listen for resize events
  scene.game.scale.on('resize', updateBackgroundForDevice);

  return backgroundContainer;
}

/**
 * Example 8: Background Container with Orientation Handling
 * Specifically handles device orientation changes
 */
export function createOrientationAwareBackgroundContainer(
  scene: Phaser.Scene
): BackgroundContainer {
  const backgroundContainer = new BackgroundContainer(scene, 'orientationAwareBackground', 0, 0);

  // Function to handle orientation changes
  function handleOrientationChange(): void {
    const isPortrait = scene.game.scale.height > scene.game.scale.width;

    if (isPortrait) {
      // Portrait orientation
      backgroundContainer.setBackgroundImage('background_portrait', {
        scalingMode: 'fill',
        alignment: { x: 'center', y: 'top' },
      });
      console.log('Orientation changed to portrait');
    } else {
      // Landscape orientation
      backgroundContainer.setBackgroundImage('background_landscape', {
        scalingMode: 'fit',
        alignment: { x: 'center', y: 'center' },
      });
      console.log('Orientation changed to landscape');
    }
  }

  // Set initial background based on current orientation
  handleOrientationChange();

  // Listen for orientation changes
  scene.game.scale.on('orientationchange', handleOrientationChange);

  return backgroundContainer;
}

/**
 * Example 9: Background Container Performance Optimization
 * Shows how to optimize background loading for different devices
 */
export function createOptimizedBackgroundContainer(scene: Phaser.Scene): BackgroundContainer {
  const backgroundContainer = new BackgroundContainer(scene, 'optimizedBackground', 0, 0);

  // Function to load optimized background based on device capabilities
  function loadOptimizedBackground(): void {
    const pixelRatio = window.devicePixelRatio || 1;

    // Determine optimal background resolution
    let backgroundKey: string;
    let quality: string;

    if (pixelRatio >= 3) {
      // High DPI device (iPhone, high-end Android)
      backgroundKey = 'background_3x';
      quality = '3x';
    } else if (pixelRatio >= 2) {
      // Medium DPI device (most modern devices)
      backgroundKey = 'background_2x';
      quality = '2x';
    } else {
      // Standard DPI device (desktop, older devices)
      backgroundKey = 'background_1x';
      quality = '1x';
    }

    // Check if high-quality texture exists, fallback to lower quality if not
    if (!scene.textures.exists(backgroundKey)) {
      if (scene.textures.exists('background_2x')) {
        backgroundKey = 'background_2x';
        quality = '2x (fallback)';
      } else if (scene.textures.exists('background_1x')) {
        backgroundKey = 'background_1x';
        quality = '1x (fallback)';
      }
    }

    // Set background with optimization settings
    backgroundContainer.setBackgroundImage(backgroundKey, {
      maintainAspectRatio: true,
      scalingMode: 'fit',
      alignment: { x: 'center', y: 'center' },
    });

    console.log(`Loaded ${quality} background: ${backgroundKey}`);
  }

  // Load optimized background
  loadOptimizedBackground();

  // Reload on resize to handle device changes
  scene.game.scale.on('resize', loadOptimizedBackground);

  return backgroundContainer;
}

/**
 * Example 10: Complete Scene Setup with Background Container
 * Shows a complete scene setup using BackgroundContainer
 */
export function createCompleteSceneWithBackground(scene: Phaser.Scene): void {
  // Create the main background container
  const backgroundContainer = createResponsiveBackgroundContainer(scene);

  // Create UI containers that will be positioned relative to the background
  const headerContainer = new FlexboxContainer(scene, 'header', 0, 0, backgroundContainer);
  const bodyContainer = new FlexboxContainer(scene, 'body', 0, 0, backgroundContainer);
  const footerContainer = new FlexboxContainer(scene, 'footer', 0, 0, backgroundContainer);

  // Configure header container
  headerContainer.setFlexboxProperties({
    direction: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  });

  // Configure body container
  bodyContainer.setFlexboxProperties({
    direction: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  });

  // Configure footer container
  footerContainer.setFlexboxProperties({
    direction: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  });

  // Add containers to background
  backgroundContainer.addChild(headerContainer);
  backgroundContainer.addChild(bodyContainer);
  backgroundContainer.addChild(footerContainer);

  // Position containers relative to background
  // This would be implemented based on your specific layout requirements

  console.log('Complete scene setup with background container created');
}

/**
 * Usage Examples:
 *
 * // Basic usage
 * const background = createBasicBackgroundContainer(scene)
 *
 * // Mobile-optimized
 * const mobileBackground = createMobileBackgroundContainer(scene)
 *
 * // Responsive with device detection
 * const responsiveBackground = createResponsiveBackgroundContainer(scene)
 *
 * // Complete scene setup
 * createCompleteSceneWithBackground(scene)
 *
 * // Debug background state
 * background.debugBackgroundState()
 *
 * // Update background properties
 * background.updateBackgroundProperties({
 *   scalingMode: 'fill',
 *   alignment: { x: 'left', y: 'top' }
 * })
 */
