import * as Phaser from 'phaser'
import type { IContainer } from '../../abstract/objects/IContainer'
import type { IGameObject } from '../../abstract/base/IGameObject'
import type { IBounds } from '../../abstract/objects/IBound'
import type { IStyle } from '../../abstract/configs/IStyle'
import type { CommonIStyleProperties, ParentWidth, ParentHeight, ParentPositionX, ParentPositionY } from '../../abstract/configs/IStyleProperties'
import type { IRandomValueNumber, PositionValue, PositionUnit } from '../../unit'
import { Logger } from '../../core/Logger'

/**
 * Container Class
 * Concrete implementation of IContainer that extends Phaser.GameObjects.Container
 * 
 * Key Features:
 * - Directly extends Phaser.GameObjects.Container for optimal performance
 * - Implements IStyle for responsive behavior
 * - Implements minimal IContainer interface
 * - Maintains proper Phaser container functionality
 */
export class Container extends Phaser.GameObjects.Container implements IContainer, IStyle {
  // ===== ESSENTIAL PROPERTIES =====
  
  /** Unique identifier for this container */
  readonly id: string
  
  /** Parent container (null if root) */
  readonly parent: IContainer | null
  
  /** Array of child game objects */
  readonly children: IGameObject[] = []
  
  /** Container type */
  readonly containerType: IContainer['containerType'] = 'div'
  
  /** Container constraints */
  readonly constraints = {
    maxChildren: 1000,
    autoSize: false,
    clipOverflow: false,
    overflow: 'visible' as const,
    respectParentBounds: true,
    maintainAspectRatio: false
  }
  
  /** Current style properties */
  private currentStyle: CommonIStyleProperties = {
    maintainAspectRatio: false,
    scaleStrategy: 'stretch',
    alignment: 'center'
  };
  
  /** Responsive layout properties for this object (IGameObject requirement) */
  layoutProperties: CommonIStyleProperties = {
    maintainAspectRatio: false,
    scaleStrategy: 'stretch',
    alignment: 'center'
  };
  
  /** Spacing properties for layout containers */
  readonly spacing = {
    gap: 10,
    padding: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    }
  };
  
  // ===== COMPUTED PROPERTIES =====
  
  /** Number of children */
  get childCount(): number {
    return this.children.length
  }
  
  /** Whether this container has children */
  get hasChildren(): boolean {
    return this.children.length > 0
  }
  
  /** Whether this container is empty */
  get isEmpty(): boolean {
    return this.children.length === 0
  }
  
  /** Whether this game object is currently active/visible */
  get isActive(): boolean {
    return this.active
  }
  
  /** Whether this game object is destroyed */
  get isDestroyed(): boolean {
    return !this.active
  }
  
  /** Size of the game object */
  get size(): { width: number; height: number } {
    return { width: this.width, height: this.height }
  }
  
  /** Whether the game object is interactive */
  get interactive(): boolean {
    return this.input?.enabled || false
  }
  
  // ===== CONSTRUCTOR =====
  
  constructor(
    scene: Phaser.Scene,
    id: string,
    x: number = 0,
    y: number = 0,
    parent: IContainer | null = null
  ) {
    // Call Phaser container constructor
    super(scene, x, y)
    
    this.id = id
    this.parent = parent
    
    // Set up the container
    this.setupContainer()
  }
  
  /** Logger instance */
  protected logger: Logger = Logger.getInstance()
  
  // ===== SETUP METHODS =====
  
  /** Set up the container with default properties */
  protected setupContainer(): void {
    // Set default properties
    this.setSize(100, 100) // Default size
    this.setInteractive()
  }
  
  // ===== IStyle IMPLEMENTATION =====
  
  /** Set the style properties for this container with enhanced cascade logic */
  setStyle(layoutProperties: CommonIStyleProperties): void {
    this.logger.debug('Container', 'setStyle', 'Setting style properties', {
      id: this.id,
      newStyle: layoutProperties
    });
    
    // NEW: Enhanced cascade logic using injected configurations
    let finalProperties = this.applyStyleCascade(layoutProperties);
    
    // Store the final style
    this.currentStyle = { ...finalProperties };
    
    // Apply position properties
    this.applyPositionProperties(finalProperties);
    
    // Apply size properties
    this.applySizeProperties(finalProperties);
    
    // Apply visual properties
    this.applyVisualProperties(finalProperties);
    
    // Apply background properties
    this.applyBackgroundProperties(finalProperties);
    
    // Apply additional style properties (typography, borders, shadows, etc.)
    this.applyAdditionalStyleProperties(finalProperties);
  }
  
  /** Get the current style properties */
  getStyle(): CommonIStyleProperties {
    return { ...this.currentStyle };
  }
  
  /** Get the object ID for responsive config lookup */
  getStyleId(): string {
    return this.id;
  }
  
  // ===== CONFIGURATION INJECTION =====
  
  /** Injected configurations from scene */
  protected injectedConfigs: {
    responsive: any
    theme: any
    currentBreakpoint: string
  } | null = null
  
  /**
   * Initialize container with injected configurations
   * Called by ContainerFactory to inject responsive and theme configs
   */
  initializeWithConfigs(configs: {
    responsive: any
    theme: any
    currentBreakpoint: string
  }): void {
    this.logger.debug('Container', 'getStyleId', 'Initializing with injected configurations', {
      id: this.id,
      hasResponsive: !!configs.responsive,
      hasTheme: !!configs.theme,
      currentBreakpoint: configs.currentBreakpoint,
      responsiveKeys: configs.responsive ? Object.keys(configs.responsive) : [],
      themeKeys: configs.theme ? Object.keys(configs.theme) : []
    })
    
    this.injectedConfigs = configs
    
    // Apply initial responsive configuration if available
    if (configs.responsive) {
      this.logger.debug('Container', 'getStyleId', 'Applying initial responsive configuration', {
        id: this.id,
        responsiveConfig: configs.responsive,
        hasDefault: !!configs.responsive.default,
        defaultCount: configs.responsive.default?.length || 0,
        hasResponsiveSettings: !!configs.responsive.responsiveSettings,
        responsiveBreakpoints: configs.responsive.responsiveSettings ? Object.keys(configs.responsive.responsiveSettings) : []
      })
      
      // Find the default layout for this specific container
      if (configs.responsive.default) {
        const defaultLayout = configs.responsive.default.find(
          (layout: any) => layout.id === this.id
        )
        
        if (defaultLayout?.layoutProperties) {
          this.logger.debug('Container', 'getStyleId', 'Found default layout for container', {
            id: this.id,
            defaultLayout,
            layoutProperties: defaultLayout.layoutProperties
          })
          
          // Apply the responsive layout properties
          this.setStyle(defaultLayout.layoutProperties)
        } else {
          this.logger.warn('Container', 'getStyleId', 'No default layout found for container', {
            id: this.id,
            availableLayouts: configs.responsive.default.map((l: any) => l.id)
          })
        }
      }
    }
    
    // Apply initial theme configuration if available
    if (configs.theme && configs.responsive?.default) {
      // Find the default layout to get classes
      const defaultLayout = configs.responsive.default.find(
        (layout: any) => layout.id === this.id
      )
      
      if (defaultLayout?.layoutProperties?.classes) {
        this.logger.debug('Container', 'getStyleId', 'Applying initial theme configuration', {
          id: this.id,
          themeName: configs.theme.themeName,
          classes: defaultLayout.layoutProperties.classes,
          availableThemeClasses: Object.keys(configs.theme.themeClasses || {})
        })
        
        // Apply theme classes if specified
        this.applyThemeClasses(defaultLayout.layoutProperties.classes, configs.theme)
      }
    }
  }
  
  /**
   * Get injected configurations
   */
  getInjectedConfigs(): {
    responsive: any
    theme: any
    currentBreakpoint: string
  } | null {
    return this.injectedConfigs
  }
  
  /**
   * Apply theme classes to this container
   */
  private applyThemeClasses(classes: string[], theme: any): void {
    if (!classes || !theme?.themeClasses) return
    
    this.logger.debug('Container', 'applyThemeClasses', 'Applying theme classes', {
      id: this.id,
      classes,
      availableThemeClasses: Object.keys(theme.themeClasses)
    })
    
    // Apply each theme class
    classes.forEach(className => {
      // Try to find the theme class with or without the dot prefix
      let themeClass = theme.themeClasses[className]
      
      // If not found, try with dot prefix
      if (!themeClass && !className.startsWith('.')) {
        themeClass = theme.themeClasses[`.${className}`]
      }
      
      // If still not found, try without dot prefix
      if (!themeClass && className.startsWith('.')) {
        themeClass = theme.themeClasses[className.substring(1)]
      }
      
      if (themeClass) {
        this.logger.debug('Container', 'unknown', 'Applying theme class', {
          id: this.id,
          className,
          themeClass,
          foundWithPrefix: className.startsWith('.'),
          foundWithoutPrefix: !className.startsWith('.')
        })
        
        // Apply theme class properties to current style
        this.currentStyle = { ...this.currentStyle, ...themeClass }
        
        // Apply the theme class properties directly to avoid infinite recursion
        this.applyStylePropertiesDirectly(themeClass)
      } else {
        this.logger.warn('Container', 'unknown', 'Theme class not found', {
          id: this.id,
          className,
          availableClasses: Object.keys(theme.themeClasses),
          triedWithDot: !className.startsWith('.') ? `.${className}` : null,
          triedWithoutDot: className.startsWith('.') ? className.substring(1) : null
        })
      }
    })
  }
  
  // ===== STYLE APPLICATION METHODS =====
  
  /** Apply position properties from style */
  private applyPositionProperties(style: CommonIStyleProperties): void {
    // Apply position type first (affects other positioning)
    if (style.position !== undefined) {
      this.logger.debug('Container', 'applyPositionProperties', 'Applying position type', {
        id: this.id,
        position: style.position
      })
      
      // Note: Phaser containers don't have native position types like CSS
      // This is logged for future implementation or theme integration
    }
    
    // Handle X position with all supported types
    if (style.positionX !== undefined) {
      this.x = this.calculatePositionValue(style.positionX, 'x');
      this.logger.debug('Container', 'applyPositionProperties', 'X position calculated', {
        id: this.id,
        x: this.x,
        originalValue: style.positionX
      });
    }
    
    // Handle Y position with all supported types
    if (style.positionY !== undefined) {
      this.y = this.calculatePositionValue(style.positionY, 'y');
      this.logger.debug('Container', 'applyPositionProperties', 'Y position calculated', {
        id: this.id,
        y: this.y,
        originalValue: style.positionY
      });
    }
    
    if (style.positionZ !== undefined) {
      this.setDepth(style.positionZ);
    }
    
    // Apply zIndex (alternative to positionZ)
    if (style.zIndex !== undefined) {
      this.setDepth(style.zIndex);
      this.logger.debug('Container', 'applyPositionProperties', 'Applied zIndex', {
        id: this.id,
        zIndex: style.zIndex
      })
    }
  }
  
  /**
   * Calculate position value from various input types
   * Supports: number, string keywords, ParentPositionX/ParentPositionY, IRandomValueNumber, and new unit system types
   */
  private calculatePositionValue(
    value: number | 'center' | 'left' | 'right' | 'top' | 'bottom' | ParentPositionX | ParentPositionY | IRandomValueNumber | PositionValue | PositionUnit,
    axis: 'x' | 'y'
  ): number {
    // Handle direct numbers
    if (typeof value === 'number') {
      return value;
    }
    
    // Handle string keywords
    if (typeof value === 'string') {
      switch (value) {
        case 'center':
          // Center on the specified axis
          if (axis === 'x') {
            // Center horizontally - will be calculated when parent bounds are known
            return 0; // Placeholder for now
          } else {
            // Center vertically - will be calculated when parent bounds are known
            return 0; // Placeholder for now
          }
        case 'left':
          return axis === 'x' ? 0 : this.y; // Only affect X axis
        case 'right':
          if (axis === 'x' && this.parent) {
            // Position at right edge of parent
            const parentSize = (this.parent as any).getSize?.() || { width: 800 };
            return parentSize.width - (this.width || 100);
          }
          return axis === 'x' ? 0 : this.y;
        case 'top':
          return axis === 'y' ? 0 : this.x; // Only affect Y axis
        case 'bottom':
          if (axis === 'y' && this.parent) {
            // Position at bottom edge of parent
            const parentSize = (this.parent as any).getSize?.() || { height: 600 };
            return parentSize.height - (this.height || 100);
          }
          return axis === 'y' ? 0 : this.x;
        default:
          this.logger.warn('Container', 'applyPositionProperties', 'Unknown position keyword', {
            id: this.id,
            axis,
            value
          });
          return axis === 'x' ? this.x : this.y;
      }
    }
    
    // Handle ParentPositionX/ParentPositionY classes
    if (typeof value === 'object' && 'getValue' in value) {
      // This is a ParentPositionX/ParentPositionY class
      if (this.parent && typeof (this.parent as any).getSize === 'function') {
        try {
          return (value as any).getValue(this.parent);
        } catch (error) {
          this.logger.warn('Container', 'return', 'Failed to calculate parent-relative position', {
            id: this.id,
            axis,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      } else {
        this.logger.warn('Container', 'return', 'Parent-relative positioning requested but no parent available', {
          id: this.id,
          axis,
          value
        });
      }
      // Fallback to current position
      return axis === 'x' ? this.x : this.y;
    }
    
    // Handle IRandomValueNumber
    if (typeof value === 'object' && 'getRandomValue' in value) {
      try {
        return (value as IRandomValueNumber).getRandomValue();
      } catch (error) {
        this.logger.warn('Container', 'return', 'Failed to get random position value', {
          id: this.id,
          axis,
          error: error instanceof Error ? error.message : String(error)
        });
      }
      // Fallback to current position
      return axis === 'x' ? this.x : this.y;
    }
    
    // Unknown type - log warning and use current position
    this.logger.warn('Container', 'return', 'Unknown position value type', {
      id: this.id,
      axis,
      value,
      valueType: typeof value
    });
    
    return axis === 'x' ? this.x : this.y;
  }
  
  /** Apply size properties from style */
  private applySizeProperties(style: CommonIStyleProperties): void {
    // Handle width with all supported types
    if (style.width !== undefined) {
      this.width = this.calculateSizeValue(style.width, 'width');
      this.logger.debug('Container', 'applySizeProperties', 'Width calculated', {
        id: this.id,
        width: this.width,
        originalValue: style.width
      });
    }
    
    // Handle height with all supported types
    if (style.height !== undefined) {
      this.height = this.calculateSizeValue(style.height, 'height');
      this.logger.debug('Container', 'applySizeProperties', 'Height calculated', {
        id: this.id,
        height: this.height,
        originalValue: style.height
      });
    }
    
    // Apply margin if specified
    this.applyMarginProperties(style);
    
    // Apply padding if specified
    this.applyPaddingProperties(style);
  }
  
  /**
   * Calculate size value from various input types
   * Supports: number, string keywords, ParentWidth/ParentHeight, IRandomValueNumber
   */
  private calculateSizeValue(
    value: number | 'fill' | 'auto' | ParentWidth | ParentHeight | IRandomValueNumber,
    dimension: 'width' | 'height'
  ): number {
    // Handle direct numbers
    if (typeof value === 'number') {
      return value;
    }
    
    // Handle string keywords
    if (typeof value === 'string') {
      switch (value) {
        case 'fill':
          // Fill the scene dimension
          return dimension === 'width' 
            ? (this.scene.game.config.width as number)
            : (this.scene.game.config.height as number);
        case 'auto':
          // Auto sizing - use content-based sizing or default
          // For now, use a reasonable default (could be enhanced later)
          return dimension === 'width' ? 200 : 150;
        default:
          this.logger.warn('Container', 'applySizeProperties', 'Unknown size keyword', {
            id: this.id,
            dimension,
            value
          });
          return dimension === 'width' ? 100 : 100;
      }
    }
    
    // Handle ParentWidth/ParentHeight classes
    if (typeof value === 'object' && 'getValue' in value) {
      // This is a ParentWidth/ParentHeight class
      if (this.parent && typeof (this.parent as any).getSize === 'function') {
        try {
          return (value as any).getValue(this.parent);
        } catch (error) {
          this.logger.warn('Container', 'return', 'Failed to calculate parent-relative size', {
            id: this.id,
            dimension,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      } else {
        this.logger.warn('Container', 'return', 'Parent-relative sizing requested but no parent available', {
          id: this.id,
          dimension,
          value
        });
      }
      // Fallback to default size
      return dimension === 'width' ? 100 : 100;
    }
    
    // Handle IRandomValueNumber
    if (typeof value === 'object' && 'getRandomValue' in value) {
      try {
        return (value as IRandomValueNumber).getRandomValue();
      } catch (error) {
        this.logger.warn('Container', 'return', 'Failed to get random size value', {
          id: this.id,
          dimension,
          error: error instanceof Error ? error.message : String(error)
        });
      }
      // Fallback to default size
      return dimension === 'width' ? 100 : 100;
    }
    
    // Unknown type - log warning and use default
    this.logger.warn('Container', 'return', 'Unknown size value type', {
      id: this.id,
      dimension,
      value,
      valueType: typeof value
    });
    
    return dimension === 'width' ? 100 : 100;
  }
  
  /** Apply margin properties from style */
  private applyMarginProperties(style: CommonIStyleProperties): void {
    // Apply uniform margin
    if (style.margin !== undefined) {
      this.logger.debug('Container', 'applyMarginProperties', 'Applying uniform margin', {
        id: this.id,
        margin: style.margin
      })
      
      // Note: Margin affects positioning relative to parent
      // For now, we log it for future implementation
      // This could be used to adjust container position within parent
    }
    
    // Apply individual margin properties
    const marginProps = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'] as const
    marginProps.forEach(prop => {
      if (style[prop] !== undefined) {
        this.logger.debug('Container', 'applyMarginProperties', 'Applying individual margin', {
          id: this.id,
          property: prop,
          value: style[prop]
        })
        // Note: Individual margins would need parent container coordination
      }
    })
  }
  
  /** Apply padding properties from style */
  private applyPaddingProperties(style: CommonIStyleProperties): void {
    // Apply uniform padding
    if (style.padding !== undefined) {
      this.logger.debug('Container', 'applyPaddingProperties', 'Applying uniform padding', {
        id: this.id,
        padding: style.padding
      })
      
      // Update container spacing with new padding
      if (typeof style.padding === 'number') {
        // Single value padding
        this.spacing.padding = {
          left: style.padding,
          right: style.padding,
          top: style.padding,
          bottom: style.padding
        }
      } else if (typeof style.padding === 'object' && 'getRandomValue' in style.padding) {
        // RandomValueNumber padding
        const randomPadding = (style.padding as IRandomValueNumber).getRandomValue()
        this.spacing.padding = {
          left: randomPadding,
          right: randomPadding,
          top: randomPadding,
          bottom: randomPadding
        }
      }
      
      this.logger.debug('Container', 'applyPaddingProperties', 'Padding updated', {
        id: this.id,
        newPadding: this.spacing.padding
      })
    }
    
    // Apply individual padding properties
    const paddingProps = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft'] as const
    paddingProps.forEach(prop => {
      if (style[prop] !== undefined) {
        const value = typeof style[prop] === 'number' ? style[prop] : 
                     (style[prop] as IRandomValueNumber)?.getRandomValue() || 0
        
        // Update specific padding side
        switch (prop) {
          case 'paddingTop':
            this.spacing.padding.top = value as number
            break
          case 'paddingRight':
            this.spacing.padding.right = value as number
            break
          case 'paddingBottom':
            this.spacing.padding.bottom = value as number
            break
          case 'paddingLeft':
            this.spacing.padding.left = value as number
            break
        }
        
        this.logger.debug('Container', 'applyPaddingProperties', 'Applied individual padding', {
          id: this.id,
          property: prop,
          value
        })
      }
    })
  }
  
  /** Apply visual properties from style */
  private applyVisualProperties(style: CommonIStyleProperties): void {
    if (style.alpha !== undefined) {
      if (typeof style.alpha === 'number') {
        this.setAlpha(style.alpha);
      } else if (typeof style.alpha === 'object' && 'min' in style.alpha && 'max' in style.alpha) {
        // Handle RandomValueNumber
        const randomValue = (style.alpha as IRandomValueNumber).getRandomValue();
        this.setAlpha(randomValue);
      }
    }
    
    if (style.rotation !== undefined) {
      if (typeof style.rotation === 'number') {
        this.setRotation(style.rotation);
      } else if (typeof style.rotation === 'object' && 'min' in style.rotation && 'max' in style.rotation) {
        // Handle RandomValueNumber
        const randomValue = (style.rotation as IRandomValueNumber).getRandomValue();
        this.setRotation(randomValue);
      }
    }
    
    if (style.visible !== undefined) {
      this.setVisible(style.visible);
    }
    
    if (style.interactive !== undefined) {
      if (style.interactive) {
        this.setInteractive();
      } else {
        this.disableInteractive();
      }
    }
  }
  
  /** Apply background properties from style */
  private applyBackgroundProperties(style: CommonIStyleProperties): void {
    // Apply background color
    if (style.backgroundColor !== undefined) {
      this.logger.debug('Container', 'applyBackgroundProperties', 'Applying background color', {
        id: this.id,
        backgroundColor: style.backgroundColor
      })
      
      // For containers, we need to create a background rectangle
      // Remove existing background if any
      const existingBackground = this.getByName('background-rectangle')
      if (existingBackground) {
        existingBackground.destroy()
      }
      
              // Create new background rectangle
        if (typeof style.backgroundColor === 'string') {
          // Use container size or scene size as fallback
          const rectWidth = this.width || this.scene.game.config.width as number;
          const rectHeight = this.height || this.scene.game.config.height as number;
          
          const backgroundRect = this.scene.add.rectangle(
            0, 0, // Position relative to container
            rectWidth,
            rectHeight,
            Phaser.Display.Color.ValueToColor(style.backgroundColor).color
          )
        
        // Set the background as the first child (behind everything)
        backgroundRect.setName('background-rectangle')
        this.addAt(backgroundRect, 0)
        
        this.logger.debug('Container', 'applyBackgroundProperties', 'Background rectangle created', {
          id: this.id,
          backgroundColor: style.backgroundColor,
          size: { width: backgroundRect.width, height: backgroundRect.height }
        })
      }
    }
    
    // Note: Background image logic is handled by BackgroundContainer
    // This container only handles background color
  }
  
    /** Apply additional style properties (shadows, borders, transforms, etc.) */
  private applyAdditionalStyleProperties(style: any): void {
    // Apply shadow properties
    this.applyShadowProperties(style);
    
    // Apply border properties
    this.applyBorderProperties(style);
    
    // Apply transform properties
    this.applyTransformProperties(style);
    
    // Apply border radius
    this.applyBorderRadius(style);
    
    // Apply box shadow
    this.applyBoxShadow(style);
  }
  
  /** Apply shadow properties from style */
  private applyShadowProperties(style: any): void {
    // Remove existing shadow if any
    const existingShadow = this.getByName('container-shadow')
    if (existingShadow) {
      existingShadow.destroy()
    }
    
    // Check if we have any shadow properties
    if (style.shadowColor !== undefined || style.shadowBlur !== undefined || 
        style.shadowOffsetX !== undefined || style.shadowOffsetY !== undefined || 
        style.shadowAlpha !== undefined) {
      
      this.logger.debug('Container', 'applyShadowProperties', 'Applying shadow properties', {
        id: this.id,
        shadowColor: style.shadowColor,
        shadowBlur: style.shadowBlur,
        shadowOffsetX: style.shadowOffsetX,
        shadowOffsetY: style.shadowOffsetY,
        shadowAlpha: style.shadowAlpha
      })
      
      // Create shadow rectangle
      const shadowColor = style.shadowColor || '#000000'
      const shadowBlur = style.shadowBlur || 0
      const shadowOffsetX = style.shadowOffsetX || 0
      const shadowOffsetY = style.shadowOffsetY || 0
      const shadowAlpha = style.shadowAlpha !== undefined ? style.shadowAlpha : 0.3
      
              // Create shadow as a slightly larger, offset rectangle
        const shadowRect = this.scene.add.rectangle(
          shadowOffsetX, shadowOffsetY, // Offset position
          (this.width || this.scene.game.config.width as number) + shadowBlur * 2,
          (this.height || this.scene.game.config.height as number) + shadowBlur * 2,
          Phaser.Display.Color.ValueToColor(shadowColor).color,
          shadowAlpha
        )
      
      // Set the shadow behind everything
      shadowRect.setName('container-shadow')
      this.addAt(shadowRect, 0) // Add at index 0 (behind background)
      
      this.logger.debug('Container', 'applyShadowProperties', 'Shadow created', {
        id: this.id,
        shadowColor,
        shadowBlur,
        shadowOffset: { x: shadowOffsetX, y: shadowOffsetY },
        shadowAlpha
      })
    }
  }
  
  /** Apply border properties from style */
  private applyBorderProperties(style: any): void {
    // Remove existing border if any
    const existingBorder = this.getByName('container-border')
    if (existingBorder) {
      existingBorder.destroy()
    }
    
    // Check if we have border properties
    if (style.borderColor !== undefined || style.borderWidth !== undefined || style.borderBottomWidth !== undefined) {
      const borderColor = style.borderColor || '#000000'
      const borderWidth = style.borderWidth || 1
      const borderBottomWidth = style.borderBottomWidth || borderWidth
      
      this.logger.debug('Container', 'applyBorderProperties', 'Applying border properties', {
        id: this.id,
        borderColor,
        borderWidth,
        borderBottomWidth
      })
      
             // Create border as a larger rectangle with a hole
       const borderRect = this.scene.add.rectangle(
         0, 0,
         (this.width || this.scene.game.config.width as number) + borderWidth * 2,
         (this.height || this.scene.game.config.height as number) + borderBottomWidth * 2, // Use bottom width for height
         Phaser.Display.Color.ValueToColor(borderColor).color
       )
       
       // Create inner rectangle for the hole effect
       const innerRect = this.scene.add.rectangle(
         0, 0,
         this.width || this.scene.game.config.width as number,
         this.height || this.scene.game.config.height as number,
         0x000000 // Black color for the hole
       )
      
      // Set the border above background but below content
      borderRect.setName('container-border')
      this.addAt(borderRect, 1) // Add after background
      this.addAt(innerRect, 2) // Add after border
      
      this.logger.debug('Container', 'applyBorderProperties', 'Border created', {
        id: this.id,
        borderColor,
        borderWidth,
        borderBottomWidth
      })
    }
  }
  
  /** Apply transform properties from style */
  private applyTransformProperties(style: any): void {
    // Apply overall scale first (affects both X and Y)
    if (style.scale !== undefined) {
      const scale = typeof style.scale === 'number' ? style.scale : 
                   (style.scale as IRandomValueNumber)?.getRandomValue() || 1
      this.setScale(scale, scale)
      
      this.logger.debug('Container', 'applyTransformProperties', 'Applied overall scale', {
        id: this.id,
        scale
      })
    }
    
    // Apply scale mode/strategy (alias for scaleStrategy)
    if (style.scaleMode !== undefined) {
      this.logger.debug('Container', 'applyTransformProperties', 'Applied scale mode', {
        id: this.id,
        scaleMode: style.scaleMode
      })
      // Note: scaleMode is an alias for scaleStrategy, already handled in layout properties
    }
    
    // Apply individual scale transformations (skew removed - not well supported in Phaser containers)
    if (style.scaleX !== undefined) {
      const scaleX = typeof style.scaleX === 'number' ? style.scaleX : 
                    (style.scaleX as IRandomValueNumber)?.getRandomValue() || 1
      this.scaleX = scaleX
      
      this.logger.debug('Container', 'applyTransformProperties', 'Applied scale X', {
        id: this.id,
        scaleX
      })
    }
    
    if (style.scaleY !== undefined) {
      const scaleY = typeof style.scaleY === 'number' ? style.scaleY : 
                    (style.scaleY as IRandomValueNumber)?.getRandomValue() || 1
      this.scaleY = scaleY
      
      this.logger.debug('Container', 'applyTransformProperties', 'Applied scale Y', {
        id: this.id,
        scaleY
      })
    }
  }
  
  /** Apply border radius to background and border */
  private applyBorderRadius(style: any): void {
    // Check if we have border radius (either from IStyleProperties or theme)
    const borderRadius = style.borderRadius || style.borderRadiusValue
    
    if (borderRadius !== undefined) {
      this.logger.debug('Container', 'applyBorderRadius', 'Applying border radius', {
        id: this.id,
        borderRadius
      })
      
      // Note: Phaser rectangles don't support border radius natively
      // This would require creating a custom shape or using graphics
      // For now, we'll log it as a placeholder for future implementation
      this.logger.debug('Container', 'applyBorderRadius', 'Border radius placeholder - would create rounded rectangle', {
        id: this.id,
        borderRadius
      })
    }
  }
  
  /** Apply box shadow effect */
  private applyBoxShadow(style: any): void {
    if (style.boxShadow !== undefined) {
      this.logger.debug('Container', 'applyBoxShadow', 'Applying box shadow', {
        id: this.id,
        boxShadow: style.boxShadow
      })
      
      // Parse box shadow string (e.g., "0 2px 4px rgba(139, 69, 19, 0.2)")
      const boxShadow = this.parseBoxShadow(style.boxShadow)
      
      if (boxShadow) {
        // Remove existing box shadow if any
        const existingBoxShadow = this.getByName('box-shadow')
        if (existingBoxShadow) {
          existingBoxShadow.destroy()
        }
        
                 // Create box shadow as a larger, offset rectangle
         const shadowRect = this.scene.add.rectangle(
           boxShadow.offsetX, boxShadow.offsetY,
           (this.width || this.scene.game.config.width as number) + boxShadow.blur * 2,
           (this.height || this.scene.game.config.height as number) + boxShadow.blur * 2,
           Phaser.Display.Color.ValueToColor(boxShadow.color).color,
           boxShadow.alpha
         )
        
        // Set the box shadow behind everything
        shadowRect.setName('box-shadow')
        this.addAt(shadowRect, 0) // Add at index 0 (behind everything)
        
        this.logger.debug('Container', 'applyBoxShadow', 'Box shadow created', {
          id: this.id,
          boxShadow: boxShadow
        })
      }
    }
  }
  
  /** Parse CSS box-shadow string into usable values */
  private parseBoxShadow(boxShadow: string): {
    offsetX: number
    offsetY: number
    blur: number
    color: string
    alpha: number
  } | null {
    try {
      // Simple regex to parse box-shadow values
      // Format: "offsetX offsetY blur color" or "offsetX offsetY blur color alpha"
      const match = boxShadow.match(/(-?\d+(?:px)?)\s+(-?\d+(?:px)?)\s+(\d+(?:px)?)\s+(.+)/)
      
      if (match) {
        const offsetX = parseInt(match[1]) || 0
        const offsetY = parseInt(match[2]) || 0
        const blur = parseInt(match[3]) || 0
        
        // Extract color and alpha from the last part
        let color = '#000000'
        let alpha = 0.3
        
        const colorPart = match[4].trim()
        if (colorPart.includes('rgba')) {
          // Parse rgba(r, g, b, a)
          const rgbaMatch = colorPart.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/)
          if (rgbaMatch) {
            const r = parseInt(rgbaMatch[1])
            const g = parseInt(rgbaMatch[2])
            const b = parseInt(rgbaMatch[3])
            alpha = rgbaMatch[4] ? parseFloat(rgbaMatch[4]) : 1
            color = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
          }
        } else if (colorPart.includes('#')) {
          color = colorPart
        } else {
          color = colorPart
        }
        
        return { offsetX, offsetY, blur, color, alpha }
      }
    } catch (error) {
      this.logger.warn('Container', 'parseBoxShadow', 'Failed to parse box shadow', {
        id: this.id,
        boxShadow,
        error: error instanceof Error ? error.message : String(error)
      })
    }
    
    return null
  }
  
  /**
   * Apply style properties directly without triggering the full style cascade
   * This prevents infinite recursion when applying theme classes
   */
  private applyStylePropertiesDirectly(styleProperties: CommonIStyleProperties): void {
    // Apply position properties
    this.applyPositionProperties(styleProperties);
    
    // Apply size properties
    this.applySizeProperties(styleProperties);
    
    // Apply visual properties
    this.applyVisualProperties(styleProperties);
    
    // Apply background properties
    this.applyBackgroundProperties(styleProperties);
    
    // Apply additional style properties (typography, borders, shadows, etc.)
    this.applyAdditionalStyleProperties(styleProperties);
  }

  /**
   * NEW: Apply style cascade logic (default responsive -> breakpoint responsive -> theme config)
   */
  private applyStyleCascade(layoutProperties: CommonIStyleProperties): CommonIStyleProperties {
    if (!this.injectedConfigs) {
      this.logger.debug('Container', 'applyStyleCascade', 'No injected configs, using layout properties directly', { id: this.id })
      return layoutProperties;
    }
    
    let finalProperties = { ...layoutProperties };
    
    // Step 1: Apply default responsive settings (Highest priority)
    if (this.injectedConfigs.responsive?.default) {
      // Find the default layout for this specific container
      const defaultLayout = this.injectedConfigs.responsive.default.find(
        (layout: any) => layout.id === this.id
      );
      
      if (defaultLayout?.layoutProperties) {
        this.logger.debug('Container', 'applyStyleCascade', 'Applying default responsive settings', {
          id: this.id,
          defaultProperties: defaultLayout.layoutProperties
        })
        finalProperties = { ...finalProperties, ...defaultLayout.layoutProperties };
      }
    }
    
    // Step 2: Apply breakpoint-specific responsive settings (Medium priority)
    if (this.injectedConfigs.responsive?.responsiveSettings && this.injectedConfigs.currentBreakpoint) {
      const breakpointLayouts = this.injectedConfigs.responsive.responsiveSettings[this.injectedConfigs.currentBreakpoint];
      
      if (breakpointLayouts) {
                 // Find the breakpoint-specific layout for this container
         const breakpointLayout = breakpointLayouts.find(
           (layout: any) => layout.id === this.id
         );
        
        if (breakpointLayout?.layoutProperties) {
          this.logger.debug('Container', 'applyStyleCascade', 'Applying breakpoint-specific settings', {
            id: this.id,
            breakpoint: this.injectedConfigs.currentBreakpoint,
            breakpointProperties: breakpointLayout.layoutProperties
          })
          finalProperties = { ...finalProperties, ...breakpointLayout.layoutProperties };
        }
      }
    }
    
    // Step 3: Apply theme config classes (Lowest priority)
    if (finalProperties.classes && this.injectedConfigs.theme?.themeClasses) {
      this.logger.debug('Container', 'applyStyleCascade', 'Applying theme classes', {
        id: this.id,
        classes: finalProperties.classes,
        themeName: this.injectedConfigs.theme.themeName
      })
      
      // Apply theme classes from theme config (not responsive config)
      this.applyThemeClasses(finalProperties.classes, this.injectedConfigs.theme);
      
      // Merge theme class properties into final properties
      if (finalProperties.classes && this.injectedConfigs?.theme?.themeClasses) {
        const themeClasses = this.injectedConfigs.theme!.themeClasses;
        finalProperties.classes.forEach(className => {
          const themeClass = themeClasses[className];
          if (themeClass) {
            this.logger.debug('Container', 'unknown', 'Merging theme class properties', {
              id: this.id,
              className,
              themeClass
            })
            finalProperties = { ...finalProperties, ...themeClass };
          }
        });
      }
    }
    
    this.logger.debug('Container', 'unknown', 'Style cascade completed', {
      id: this.id,
      originalProperties: layoutProperties,
      finalProperties
    })
    
    return finalProperties;
  }
  
  // ===== IContainer IMPLEMENTATION =====
  
  /** Add a child game object to this container */
  addChild(child: IGameObject): void {
    if (this.children.length >= this.constraints.maxChildren) {
      this.logger.warn('Container', 'addChild', 'Cannot add child - max children reached', {
        id: this.id,
        currentCount: this.children.length,
        maxCount: this.constraints.maxChildren
      })
      return
    }
    
    this.children.push(child)
    
    // If the child has a phaserObject, add it to the Phaser container
    if ((child as any).phaserObject) {
      this.add((child as any).phaserObject)
    } else if (child instanceof Phaser.GameObjects.GameObject) {
      this.add(child)
    }
    
    this.logger.debug('Container', 'addChild', 'Child added to container', {
      id: this.id,
      childId: (child as any).id || 'unknown',
      childCount: this.children.length
    })
  }
  
  /** Remove a child game object from this container */
  removeChild(child: IGameObject): void {
    const index = this.children.indexOf(child)
    if (index !== -1) {
      this.children.splice(index, 1)
      
      // If the child has a phaserObject, remove it from the Phaser container
      if ((child as any).phaserObject) {
        this.remove((child as any).phaserObject)
      } else if (child instanceof Phaser.GameObjects.GameObject) {
        this.remove(child)
      }
      
      this.logger.debug('Container', 'removeChild', 'Child removed from container', {
        id: this.id,
        childId: (child as any).id || 'unknown',
        childCount: this.children.length
      })
    }
  }
  
  /** Get child by ID */
  getChild(id: string): IGameObject | undefined {
    return this.children.find(child => (child as any).id === id)
  }
  
  /** Get all children */
  getAllChildren(): IGameObject[] {
    return [...this.children]
  }
  
  /** Clear all children */
  clearChildren(): void {
    this.children.length = 0
    this.removeAll()
    this.logger.debug('Container', 'clearChildren', 'All children cleared', { id: this.id })
  }
  
  // ===== RESPONSIVE BEHAVIOR =====
  
  /** Handle responsive resize from scene - now delegates to setStyle */
  handleResponsiveResize(width: number, height: number): void {
    this.logger.debug('Container', 'handleResponsiveResize', 'Handling responsive resize', {
      id: this.id,
      newDimensions: { width, height },
      currentDimensions: this.size
    });
    
    // Update layout properties with new dimensions and apply via setStyle
    if (this.layoutProperties) {
      this.layoutProperties = {
        ...this.layoutProperties,
        width,
        height
      };
      this.setStyle(this.layoutProperties);
    }
  }
  
  /** Handle resize events and propagate to children */
  resize(width: number, height: number): void {
    this.logger.debug('Container', 'resize', 'Resize called', {
      id: this.id,
      newDimensions: { width, height },
      currentDimensions: this.size
    });
    
    // Template method pattern: split resize into three phases
    
    // Phase 1: Resize self (can be overridden by subclasses)
    this.resizeSelf(width, height);
    
    // Phase 2: Propagate resize to children
    this.propagateResizeToChildren(width, height);
    
    // Phase 3: Post-resize operations (can be overridden by subclasses)
    this.resizeAfter(width, height);
  }
  
  /**
   * Phase 1: Resize the container itself
   * This method can be overridden by subclasses to implement custom resize logic
   */
  protected resizeSelf(width: number, height: number): void {
    this.logger.debug('Container', 'resizeSelf', 'Resizing self', {
      id: this.id,
      newDimensions: { width, height },
      currentDimensions: this.size
    });
    
    // Apply responsive styling if we have layout properties
    if (this.layoutProperties) {
      // Update the layout properties with the new dimensions
      this.layoutProperties = {
        ...this.layoutProperties,
        width,
        height
      };
      
      // Apply the updated style properties (including size)
      this.setStyle(this.layoutProperties);
    }
    
    // Note: setSize is now handled by setStyle through applySizeProperties
  }
  
  /**
   * Phase 2: Propagate resize event to all children
   */
  protected propagateResizeToChildren(width: number, height: number): void {
    this.logger.debug('Container', 'propagateResizeToChildren', 'Propagating resize to children', {
      id: this.id,
      newDimensions: { width, height },
      childCount: this.children.length
    });
    
    // Loop through all children and call their resize method if available
    this.children.forEach((child: any, index: number) => {
      if (child && typeof child.resize === 'function') {
        try {
          child.resize(width, height);
          this.logger.debug('Container', 'propagateResizeToChildren', 'Child resize called', {
            id: this.id,
            childName: child.name || child.id || `child-${index}`,
            childType: child.constructor.name
          });
        } catch (error) {
          this.logger.warn('Container', 'propagateResizeToChildren', 'Failed to resize child', {
            id: this.id,
            childName: child.name || child.id || `child-${index}`,
            error: error instanceof Error ? error.message : String(error)
          });
        }
      }
    });
  }
  
  /**
   * Phase 3: Post-resize operations
   * This method can be overridden by subclasses to implement post-resize logic
   */
  protected resizeAfter(width: number, height: number): void {
    this.logger.debug('Container', 'resizeAfter', 'Post-resize operations', {
      id: this.id,
      newDimensions: { width, height }
    });
    
    // Default implementation is empty
    // Subclasses can override this to implement custom post-resize logic
  }
  
  // ===== UTILITY METHODS =====
  
  /** Get bounds of this container */
  getContainerBounds(): IBounds {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    }
  }
  
  /** Get layout information */
  getLayoutInfo(): any {
    return {
      id: this.id,
      type: this.containerType,
      childCount: this.children.length
    }
  }
  
  /** Invalidate layout (trigger recalculation) */
  invalidateLayout(): void {
    this.logger.debug('Container', 'invalidateLayout', 'Layout invalidated', { id: this.id })
    // Implementation for layout invalidation
  }
  
  /** Update layout */
  updateLayout(): void {
    this.logger.debug('Container', 'updateLayout', 'Updating layout', { id: this.id })
    // Implementation for layout update
  }
  
  /** Destroy the container */
  destroy(fromScene?: boolean): void {
    this.logger.debug('Container', 'destroy', 'Destroying container', { id: this.id })
    
    // Clear children
    this.clearChildren()
    
    // Call parent destroy
    super.destroy(fromScene)
  }

  // ===== STATIC FACTORY METHOD =====
  
  /**
   * Static factory method to create a Container from configuration
   * This method is called by the scene loader system
   */
  static createFromConfig(config: any, scene: Phaser.Scene, parent?: Phaser.GameObjects.Container): Container {
    const logger = Logger.getInstance()
    
    logger.debug('Container', 'createFromConfig', 'Creating Container from config', {
      objectId: config.id,
      objectName: config.name,
      hasParent: !!parent,
      parentId: parent?.name || 'none'
    })
    
    try {
      // Create the container
      const container = new Container(scene, config.x || 0, config.y || 0)
      
      // Set basic properties
      if (config.name) {
        container.name = config.name
      }
      
      // Set ID for internal tracking
      ;(container as any).id = config.id
      
      // NEW: Inject responsive and theme configurations from scene
      if ((scene as any).getGameObjectConfigs) {
        logger.debug('Container', 'createFromConfig', 'Scene supports getGameObjectConfigs, injecting configs', {
          objectId: config.id,
          sceneType: scene.constructor.name
        })
        
        const configs = (scene as any).getGameObjectConfigs(config.id)
        logger.debug('Container', 'createFromConfig', 'Received configs from scene', {
          objectId: config.id,
          hasResponsive: !!configs?.responsive,
          hasTheme: !!configs?.theme,
          currentBreakpoint: configs?.currentBreakpoint
        })
        
        container.initializeWithConfigs(configs)
      } else {
        logger.warn('Container', 'createFromConfig', 'Scene does not support getGameObjectConfigs', {
          objectId: config.id,
          sceneType: scene.constructor.name
        })
      }
      
      // Set properties if provided
      if (config.properties) {
        // Set background color if specified
        if (config.properties.backgroundColor) {
          container.setStyle({ 
            backgroundColor: config.properties.backgroundColor,
            maintainAspectRatio: false,
            scaleStrategy: 'stretch',
            alignment: 'center'
          })
        }
        
        // Set size properties if specified
        if (config.properties.width || config.properties.height) {
          // Handle 'fill' values by setting to scene dimensions
          let width = config.properties.width
          let height = config.properties.height
          
          if (width === 'fill') {
            width = scene.game.config.width as number
          }
          if (height === 'fill') {
            height = scene.game.config.height as number
          }
          
          container.setStyle({
            width: width,
            height: height,
            maintainAspectRatio: false,
            scaleStrategy: 'stretch',
            alignment: 'center'
          })
        }
        
        // Set interactive state if specified
        if (config.properties.interactive !== undefined) {
          container.setInteractive(config.properties.interactive)
        }
      }
      
      // Add to parent if specified
      if (parent) {
        parent.add(container)
        logger.debug('Container', 'createFromConfig', 'Container added to parent', {
          objectId: config.id,
          parentId: parent.name || 'unnamed'
        })
      } else {
        // Add to scene if no parent
        scene.add.existing(container)
        logger.debug('Container', 'createFromConfig', 'Container added to scene', {
          objectId: config.id
        })
      }
      
      logger.info('Container', 'createFromConfig', 'Container created successfully from config', {
        objectId: config.id,
        objectName: config.name,
        phaserObjectType: container.constructor.name
      })
      
      return container
      
    } catch (error) {
      logger.error('Container', 'createFromConfig', 'Failed to create Container from config', {
        objectId: config.id,
        error: error instanceof Error ? error.message : String(error)
      })
      throw error
    }
  }
}

