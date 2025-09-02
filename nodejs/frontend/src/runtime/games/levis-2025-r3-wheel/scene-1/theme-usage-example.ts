/**
 * Fortune Wheel Theme Usage Example
 *
 * This file demonstrates how to use the new Layout System theme
 * in your fortune wheel game implementation.
 */

import { fortuneWheelTheme } from './fortune-wheel-theme.config';
import { BreakpointName } from '../../../../layout/enums/LayoutEnums';

/**
 * Example class showing how to use the fortune wheel theme
 */
export class FortuneWheelThemeExample {
  private theme = fortuneWheelTheme;

  /**
   * Example: Get colors for different game elements
   */
  getGameColors() {
    return {
      // Primary colors
      primaryColor: this.theme.getColor('primary.main'), // '#ff6b35'
      primaryLight: this.theme.getColor('primary.light'), // '#ff8c69'
      primaryDark: this.theme.getColor('primary.dark'), // '#e55a2b'

      // Secondary colors
      secondaryColor: this.theme.getColor('secondary.main'), // '#3b82f6'

      // Background colors
      gameBackground: this.theme.getColor('background.variants.game-bg'), // '#1a1a2e'
      wheelBackground: this.theme.getColor('background.variants.wheel-bg'), // '#2a2a3e'
      modalBackground: this.theme.getColor('background.variants.modal-bg'), // 'rgba(255, 255, 255, 0.95)'

      // Text colors
      primaryText: this.theme.getColor('text.primary'), // '#1f2937'
      accentText: this.theme.getColor('text.variants.accent'), // '#ff6b35'

      // Status colors
      successColor: this.theme.getColor('status.success'), // '#10b981'
      warningColor: this.theme.getColor('status.warning'), // '#f59e0b'
      errorColor: this.theme.getColor('status.error'), // '#ef4444'

      // Game-specific colors
      bigWinColor: this.theme.getColor('status.variants.big-win'), // '#fbbf24'
      jackpotColor: this.theme.getColor('status.variants.jackpot'), // '#ff6b35'

      // Wheel segment colors
      segment1: this.theme.getColor('semantic.custom.wheel-segment-1'), // '#ff6b35'
      segment2: this.theme.getColor('semantic.custom.wheel-segment-2'), // '#3b82f6'
      segment3: this.theme.getColor('semantic.custom.wheel-segment-3'), // '#10b981'

      // Custom colors
      pointerColor: this.theme.getColor('custom.pointer-color'), // '#ff6b35'
      wheelGlow: this.theme.getColor('custom.wheel-glow'), // 'rgba(251, 191, 36, 0.5)'
      prizeGlow: this.theme.getColor('custom.prize-glow'), // 'rgba(16, 185, 129, 0.3)'
    };
  }

  /**
   * Example: Get spacing values for layout
   */
  getLayoutSpacing() {
    return {
      // Standard spacing
      xs: this.theme.getSpacing('xs'), // 4
      sm: this.theme.getSpacing('sm'), // 8
      md: this.theme.getSpacing('md'), // 16
      lg: this.theme.getSpacing('lg'), // 24
      xl: this.theme.getSpacing('xl'), // 32

      // Custom spacing
      wheelPadding: this.theme.getSpacing('lg'), // 20
      buttonPadding: this.theme.getSpacing('md'), // 12
      modalPadding: this.theme.getSpacing('xl'), // 24

      // Game-specific spacing
      wheelRadius: this.theme.spacing.custom?.['wheel-radius'], // 400
      pointerOffset: this.theme.spacing.custom?.['pointer-offset'], // 50
    };
  }

  /**
   * Example: Get typography values
   */
  getTypography() {
    return {
      // Font families
      primaryFont: this.theme.typography.fontFamily.primary, // 'Inter, system-ui, -apple-system, sans-serif'
      gameTitleFont: this.theme.typography.fontFamily.variants?.['game-title'], // 'Poppins, sans-serif'

      // Font sizes
      smallText: this.theme.getFontSize('xs'), // 12
      normalText: this.theme.getFontSize('base'), // 16
      largeText: this.theme.getFontSize('lg'), // 18
      gameTitle: this.theme.getFontSize('xl'), // 36
      prizeAmount: this.theme.getFontSize('lg'), // 28

      // Font weights
      normalWeight: this.theme.typography.fontWeight.normal, // 400
      mediumWeight: this.theme.typography.fontWeight.medium, // 500
      boldWeight: this.theme.typography.fontWeight.bold, // 700
      gameTitleWeight: this.theme.typography.fontWeight.variants?.['game-title'], // 700

      // Line heights
      tightLineHeight: this.theme.typography.lineHeight.tight, // 1.25
      normalLineHeight: this.theme.typography.lineHeight.normal, // 1.5
      relaxedLineHeight: this.theme.typography.lineHeight.relaxed, // 1.75
    };
  }

  /**
   * Example: Get animation values
   */
  getAnimationValues() {
    return {
      // Standard durations
      fast: this.theme.getAnimationDuration('fast'), // 150
      normal: this.theme.getAnimationDuration('normal'), // 300
      slow: this.theme.getAnimationDuration('slow'), // 500

      // Custom durations
      wheelSpin: this.theme.animation.duration.variants?.['wheel-spin'], // 3000
      wheelSlow: this.theme.animation.duration.variants?.['wheel-slow'], // 2000
      buttonHover: this.theme.animation.duration.variants?.['button-hover'], // 200

      // Easing functions
      easeInOut: this.theme.animation.easing.easeInOut, // 'ease-in-out'
      wheelSpinEasing: this.theme.animation.easing.variants?.['wheel-spin'], // 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      buttonBounce: this.theme.animation.easing.variants?.['button-bounce'], // 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    };
  }

  /**
   * Example: Get theme class properties
   */
  getThemeClassProperties() {
    const spinButtonClass = this.theme.themeClasses?.['.spin-button'];
    const wheelContainerClass = this.theme.themeClasses?.['.wheel-container'];
    const prizeModalClass = this.theme.themeClasses?.['.prize-modal'];

    return {
      spinButton: {
        backgroundColor: spinButtonClass?.backgroundColor, // '#ff6b35'
        color: spinButtonClass?.color, // '#ffffff'
        padding: spinButtonClass?.padding, // 16
        borderRadius: spinButtonClass?.borderRadiusValue, // 8
        width: spinButtonClass?.width, // { value: 200, unit: SizeUnit.PIXEL }
        height: spinButtonClass?.height, // { value: 60, unit: SizeUnit.PIXEL }
        boxShadow: spinButtonClass?.boxShadow, // '0 4px 12px rgba(255, 107, 53, 0.3)'
      },

      wheelContainer: {
        backgroundColor: wheelContainerClass?.backgroundColor, // '#2a2a3e'
        borderRadius: wheelContainerClass?.borderRadiusValue, // 9999
        padding: wheelContainerClass?.padding, // 20
        width: wheelContainerClass?.width, // { value: 800, unit: SizeUnit.PIXEL }
        height: wheelContainerClass?.height, // { value: 800, unit: SizeUnit.PIXEL }
      },

      prizeModal: {
        backgroundColor: prizeModalClass?.backgroundColor, // 'rgba(255, 255, 255, 0.95)'
        color: prizeModalClass?.color, // '#1f2937'
        padding: prizeModalClass?.padding, // 32
        borderRadius: prizeModalClass?.borderRadiusValue, // 12
        width: prizeModalClass?.width, // { value: 400, unit: SizeUnit.PIXEL }
        height: prizeModalClass?.height, // { value: 300, unit: SizeUnit.PIXEL }
      },
    };
  }

  /**
   * Example: Get custom game properties
   */
  getGameProperties() {
    return {
      // Wheel configuration
      wheelSegments: this.theme.custom?.['wheel-segments'], // 12
      wheelColors: this.theme.custom?.['wheel-colors'], // Array of 12 colors
      prizeValues: this.theme.custom?.['prize-values'], // Array of 12 prize values

      // Animation speeds
      animationSpeeds: this.theme.custom?.['animation-speeds'], // { fast: 1000, normal: 3000, slow: 5000 }

      // Sound effects
      soundEffects: this.theme.custom?.['sound-effects'], // Object with sound file mappings
    };
  }

  /**
   * Example: Check responsive support
   */
  checkResponsiveSupport() {
    return {
      supportsMobile: this.theme.supportsBreakpoint(BreakpointName.XS), // true
      supportsTablet: this.theme.supportsBreakpoint(BreakpointName.MD), // true
      supportsDesktop: this.theme.supportsBreakpoint(BreakpointName.LG), // true
      supportsLargeDesktop: this.theme.supportsBreakpoint(BreakpointName.XL), // true
    };
  }

  /**
   * Example: Get theme metadata
   */
  getThemeMetadata() {
    return {
      id: this.theme.id, // 'fortune-wheel-theme'
      name: this.theme.name, // 'fortune-wheel'
      displayName: this.theme.displayName, // 'Fortune Wheel Theme'
      description: this.theme.description,
      type: this.theme.type, // ThemeType.CUSTOM
      variant: this.theme.variant, // ThemeVariant.PRIMARY
      version: this.theme.version, // '1.0.0'
      author: this.theme.author, // 'Fortune Wheel Game Team'
      tags: this.theme.tags, // ['game', 'fortune-wheel', 'vibrant', 'engaging', 'casino-style']
      supportsDarkMode: this.theme.supportsDarkMode, // false
      isActive: this.theme.isActive, // true
    };
  }

  /**
   * Example: Apply theme classes to elements
   */
  applyThemeClasses(element: HTMLElement) {
    // Apply spin button styling (simplified example)
    const baseClass = this.theme.themeClasses?.['.spin-button'];
    if (baseClass) {
      element.style.backgroundColor = baseClass.backgroundColor || '';
      element.style.color = baseClass.color || '';
      element.style.padding = `${baseClass.padding}px` || '';
    }

    // Apply hover effects
    element.addEventListener('mouseenter', () => {
      const hoverClass = this.theme.themeClasses?.['.spin-button:hover'];
      if (hoverClass) {
        element.style.backgroundColor = hoverClass.backgroundColor || '';
      }
    });

    element.addEventListener('mouseleave', () => {
      const baseClass = this.theme.themeClasses?.['.spin-button'];
      if (baseClass) {
        element.style.backgroundColor = baseClass.backgroundColor || '';
      }
    });

    // Apply active state
    element.addEventListener('mousedown', () => {
      const activeClass = this.theme.themeClasses?.['.spin-button:active'];
      if (activeClass) {
        element.style.backgroundColor = activeClass.backgroundColor || '';
      }
    });

    element.addEventListener('mouseup', () => {
      const baseClass = this.theme.themeClasses?.['.spin-button'];
      if (baseClass) {
        element.style.backgroundColor = baseClass.backgroundColor || '';
      }
    });
  }

  /**
   * Example: Create responsive wheel sizing
   */
  getResponsiveWheelSize(breakpoint: BreakpointName) {
    switch (breakpoint) {
      case BreakpointName.XS:
        return this.theme.themeClasses?.['.mobile-wheel']?.width; // { value: 600, unit: SizeUnit.PIXEL }
      case BreakpointName.MD:
        return this.theme.themeClasses?.['.tablet-wheel']?.width; // { value: 700, unit: SizeUnit.PIXEL }
      case BreakpointName.LG:
        return this.theme.themeClasses?.['.desktop-wheel']?.width; // { value: 800, unit: SizeUnit.PIXEL }
      default:
        return this.theme.themeClasses?.['.desktop-wheel']?.width; // { value: 800, unit: SizeUnit.PIXEL }
    }
  }

  /**
   * Example: Get wheel segment colors
   */
  getWheelSegmentColors() {
    const colors: string[] = [];
    for (let i = 1; i <= 12; i++) {
      const color = this.theme.getColor(`semantic.custom.wheel-segment-${i}`);
      colors.push(color);
    }
    return colors;
  }

  /**
   * Example: Get prize values
   */
  getPrizeValues() {
    return (this.theme.custom?.['prize-values'] as number[]) || [];
  }

  /**
   * Example: Get sound effect mappings
   */
  getSoundEffectMappings() {
    return (this.theme.custom?.['sound-effects'] as Record<string, string>) || {};
  }
}

/**
 * Example usage in your game
 */
export function exampleUsage() {
  const themeExample = new FortuneWheelThemeExample();

  // Get colors for your game elements
  const colors = themeExample.getGameColors();
  console.log('Primary color:', colors.primaryColor); // '#ff6b35'
  console.log('Wheel glow:', colors.wheelGlow); // 'rgba(251, 191, 36, 0.5)'

  // Get spacing for layout
  const spacing = themeExample.getLayoutSpacing();
  console.log('Wheel radius:', spacing.wheelRadius); // 400
  console.log('Button padding:', spacing.buttonPadding); // 12

  // Get typography for text
  const typography = themeExample.getTypography();
  console.log('Game title font:', typography.gameTitleFont); // 'Poppins, sans-serif'
  console.log('Game title size:', typography.gameTitle); // 36

  // Get animation values
  const animations = themeExample.getAnimationValues();
  console.log('Wheel spin duration:', animations.wheelSpin); // 3000
  console.log('Wheel spin easing:', animations.wheelSpinEasing); // 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'

  // Get wheel segment colors
  const segmentColors = themeExample.getWheelSegmentColors();
  console.log('Segment colors:', segmentColors); // Array of 12 colors

  // Get prize values
  const prizeValues = themeExample.getPrizeValues();
  console.log('Prize values:', prizeValues); // Array of 12 prize values

  // Get sound effect mappings
  const soundEffects = themeExample.getSoundEffectMappings();
  console.log('Sound effects:', soundEffects); // Object with sound file mappings

  // Check responsive support
  const responsive = themeExample.checkResponsiveSupport();
  console.log('Supports mobile:', responsive.supportsMobile); // true
  console.log('Supports desktop:', responsive.supportsDesktop); // true
}
