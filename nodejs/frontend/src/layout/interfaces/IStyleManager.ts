/**
 * Style Manager Interface
 * Defines the contract for managing styles in the layout system
 * Handles registration, composition, and lifecycle of styles
 * Fully compatible with Unit System and responsive design
 */

import { IStyle, IStyleComposition, IStyleBuilder } from './IStyle';
import { BreakpointName, GameObjectType, StyleCompositionStrategy } from '../enums/LayoutEnums';

/**
 * Style manager interface
 * Manages the lifecycle and composition of styles
 */
export interface IStyleManager {
  /** Current active styles */
  readonly activeStyles: Map<string, IStyle>;
  
  /** All registered styles */
  readonly styles: Map<string, IStyle>;
  
  /** Style compositions */
  readonly compositions: Map<string, IStyleComposition>;
  
  /** Whether the manager is initialized */
  readonly isInitialized: boolean;
  
  /** Event listeners for style changes */
  readonly listeners: Set<IStyleListener>;
  
  /** Style cache for performance */
  readonly styleCache: Map<string, IStyle>;
  
  /**
   * Initialize the style manager
   * @param defaultStyles Default styles to register
   */
  initialize(defaultStyles?: IStyle[]): Promise<void>;
  
  /**
   * Register a new style
   * @param style Style to register
   */
  registerStyle(style: IStyle): void;
  
  /**
   * Unregister a style by ID
   * @param id Style ID to unregister
   */
  unregisterStyle(id: string): boolean;
  
  /**
   * Get a style by ID
   * @param id Style ID
   */
  getStyle(id: string): IStyle | undefined;
  
  /**
   * Get a style by name
   * @param name Style name
   */
  getStyleByName(name: string): IStyle | undefined;
  
  /**
   * Get all styles matching a filter
   * @param filter Filter function
   */
  getStyles(filter?: (style: IStyle) => boolean): IStyle[];
  
  /**
   * Get styles by type
   * @param type Style type (layout, visual, text, etc.)
   */
  getStylesByType(type: string): IStyle[];
  
  /**
   * Get styles by game object type
   * @param gameObjectType Game object type
   */
  getStylesByGameObjectType(gameObjectType: GameObjectType): IStyle[];
  
  /**
   * Activate a style by ID
   * @param id Style ID to activate
   */
  activateStyle(id: string): Promise<void>;
  
  /**
   * Activate a style by name
   * @param name Style name to activate
   */
  activateStyleByName(name: string): Promise<void>;
  
  /**
   * Deactivate a style by ID
   * @param id Style ID to deactivate
   */
  deactivateStyle(id: string): Promise<void>;
  
  /**
   * Get the currently active styles
   */
  getActiveStyles(): IStyle[];
  
  /**
   * Check if a specific style is active
   * @param id Style ID
   */
  isStyleActive(id: string): boolean;
  
  /**
   * Create a style composition
   * @param composition Style composition to create
   */
  createComposition(composition: IStyleComposition): string;
  
  /**
   * Get a style composition by ID
   * @param id Composition ID
   */
  getComposition(id: string): IStyleComposition | undefined;
  
  /**
   * Apply a style composition to an element
   * @param element Element to apply composition to
   * @param compositionId Composition ID to apply
   */
  applyComposition(element: unknown, compositionId: string): void;
  
  /**
   * Remove a style composition from an element
   * @param element Element to remove composition from
   * @param compositionId Composition ID to remove
   */
  removeComposition(element: unknown, compositionId: string): void;
  
  /**
   * Create a style builder
   */
  createStyleBuilder(): IStyleBuilder;
  
  /**
   * Build a style from multiple aspects
   * @param aspects Style aspects to combine
   * @param strategy Composition strategy
   */
  buildStyle(aspects: Partial<IStyle>[], strategy?: StyleCompositionStrategy): IStyle;
  
  /**
   * Merge multiple styles into one
   * @param styles Styles to merge
   * @param strategy Merge strategy
   */
  mergeStyles(styles: IStyle[], strategy?: StyleCompositionStrategy): IStyle;
  
  /**
   * Get computed style for an element
   * @param element Element to get computed style for
   */
  getComputedStyle(element: unknown): IStyle;
  
  /**
   * Apply style to an element
   * @param element Element to apply style to
   * @param style Style to apply
   */
  applyStyle(element: unknown, style: IStyle): void;
  
  /**
   * Remove style from an element
   * @param element Element to remove style from
   * @param styleId Style ID to remove
   */
  removeStyle(element: unknown, styleId: string): void;
  
  /**
   * Check if a style supports a specific breakpoint
   * @param breakpoint Breakpoint to check
   */
  supportsBreakpoint(breakpoint: BreakpointName): boolean;
  
  /**
   * Get responsive styles for a breakpoint
   * @param breakpoint Breakpoint to get styles for
   */
  getResponsiveStyles(breakpoint: BreakpointName): IStyle[];
  
  /**
   * Add a listener for style changes
   * @param listener Listener to add
   */
  addListener(listener: IStyleListener): void;
  
  /**
   * Remove a listener
   * @param listener Listener to remove
   */
  removeListener(listener: IStyleListener): boolean;
  
  /**
   * Clear all listeners
   */
  clearListeners(): void;
  
  /**
   * Get style statistics
   */
  getStatistics(): IStyleStatistics;
  
  /**
   * Export style configuration
   * @param styleId Style ID to export
   */
  exportStyle(styleId: string): string;
  
  /**
   * Import style configuration
   * @param config Style configuration string
   */
  importStyle(config: string): IStyle;
  
  /**
   * Reset the manager to initial state
   */
  reset(): void;
  
  /**
   * Destroy the manager and clean up resources
   */
  destroy(): void;
}

/**
 * Style listener interface
 * Defines callbacks for style events
 */
export interface IStyleListener {
  /**
   * Called when a style becomes active
   * @param style The style that became active
   * @param previousStyles The previously active styles
   */
  onStyleActivated?(style: IStyle, previousStyles: IStyle[]): void;
  
  /**
   * Called when a style becomes inactive
   * @param style The style that became inactive
   * @param newStyles The newly active styles
   */
  onStyleDeactivated?(style: IStyle, newStyles: IStyle[]): void;
  
  /**
   * Called when a style is registered
   * @param style The style that was registered
   */
  onStyleRegistered?(style: IStyle): void;
  
  /**
   * Called when a style is unregistered
   * @param style The style that was unregistered
   */
  onStyleUnregistered?(style: IStyle): void;
  
  /**
   * Called when a style composition is created
   * @param composition The composition that was created
   */
  onCompositionCreated?(composition: IStyleComposition): void;
  
  /**
   * Called when a style composition is applied
   * @param element Element the composition was applied to
   * @param compositionId Composition ID that was applied
   */
  onCompositionApplied?(element: unknown, compositionId: string): void;
  
  /**
   * Called when a style composition is removed
   * @param element Element the composition was removed from
   * @param compositionId Composition ID that was removed
   */
  onCompositionRemoved?(element: unknown, compositionId: string): void;
  
  /**
   * Called when responsive breakpoint changes
   * @param newBreakpoint The new breakpoint
   * @param previousBreakpoint The previous breakpoint
   */
  onBreakpointChanged?(newBreakpoint: BreakpointName, previousBreakpoint: BreakpointName): void;
}

/**
 * Style statistics interface
 * Provides metrics about style usage and performance
 */
export interface IStyleStatistics {
  /** Total number of registered styles */
  totalStyles: number;
  
  /** Number of active styles */
  activeStyles: number;
  
  /** Number of inactive styles */
  inactiveStyles: number;
  
  /** Number of style compositions */
  totalCompositions: number;
  
  /** Number of style applications */
  styleApplications: number;
  
  /** Average style application time in milliseconds */
  averageApplicationTime: number;
  
  /** Last style application time in milliseconds */
  lastApplicationTime: number;
  
  /** Memory usage in bytes */
  memoryUsage: number;
  
  /** Cache hit rate */
  cacheHitRate: number;
  
  /** Performance metrics */
  performance: {
    /** Total time spent applying styles */
    totalApplicationTime: number;
    
    /** Number of style applications per second */
    applicationsPerSecond: number;
    
    /** Cache efficiency */
    cacheEfficiency: number;
  };
  
  /** Style type distribution */
  styleTypes: {
    layout: number;
    visual: number;
    background: number;
    border: number;
    spacing: number;
    text: number;
    shadow: number;
    transform: number;
    animation: number;
    filter: number;
    interactive: number;
    responsive: number;
    theme: number;
    units: number;
  };
  
  /** Game object type distribution */
  gameObjectTypes: {
    container: number;
    rectangle: number;
    circle: number;
    sprite: number;
    text: number;
    image: number;
    graphics: number;
    custom: number;
  };
}

/**
 * Style configuration interface
 * For importing/exporting style configurations
 */
export interface IStyleConfiguration {
  /** Style metadata */
  metadata: {
    version: string;
    exportedAt: Date;
    exportedBy: string;
  };
  
  /** Style data */
  style: IStyle;
  
  /** Dependencies */
  dependencies?: {
    styles?: string[];
    breakpoints?: string[];
    units?: string[];
    themes?: string[];
  };
  
  /** Custom configuration */
  custom?: Record<string, unknown>;
}
