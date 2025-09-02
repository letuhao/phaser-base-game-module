/**
 * Layoutable Game Object Interface
 *
 * Decorator interface that adds layout capabilities to game objects.
 * Extends the base IDecorator interface with layout-specific functionality.
 *
 * This decorator integrates with the Layout System to provide:
 * - Layout calculation and application
 * - Responsive behavior
 * - Unit system integration
 * - Layout state management
 */

import type { IDecorator } from '../patterns/IDecorator';
import type {
  ILayoutConfig,
  ILayoutContext,
  ICalculatedLayout,
} from '../../../layout/interfaces/ILayout';
import { LayoutType, BreakpointName } from '../../../layout/enums/LayoutEnums';

// ============================================================================
// LAYOUTABLE GAME OBJECT INTERFACE
// ============================================================================

/**
 * Interface for game objects that can have layout applied
 *
 * This decorator wraps a game object and adds layout capabilities
 * by integrating with the Layout System strategies.
 */
export interface ILayoutableGameObject extends IDecorator {
  /** Layout configuration */
  layoutConfig: ILayoutConfig | null;

  /** Current layout context */
  layoutContext: ILayoutContext | null;

  /** Calculated layout */
  calculatedLayout: ICalculatedLayout | null;

  /** Current layout type */
  currentLayoutType: LayoutType;

  /** Current breakpoint */
  currentBreakpoint: BreakpointName | null;

  /** Layout state */
  layoutState: {
    isDirty: boolean;
    isCalculating: boolean;
    lastCalculationTime: number;
    calculationDuration: number;
  };

  /** Layout decorator metadata */
  layoutMetadata: {
    appliedStrategies: string[];
    layoutHistory: ICalculatedLayout[];
    performanceMetrics: {
      totalCalculations: number;
      averageCalculationTime: number;
      cacheHitRate: number;
    };
  };

  // ===== LAYOUT CONFIGURATION =====

  /**
   * Set layout configuration
   * @param config Layout configuration to set
   */
  setLayoutConfig(config: ILayoutConfig): this;

  /**
   * Get layout configuration
   */
  getLayoutConfig(): ILayoutConfig | null;

  /**
   * Update layout configuration
   * @param updates Partial layout configuration updates
   */
  updateLayoutConfig(updates: Partial<ILayoutConfig>): this;

  /**
   * Clear layout configuration
   */
  clearLayoutConfig(): this;

  // ===== LAYOUT CONTEXT =====

  /**
   * Set layout context
   * @param context Layout context to set
   */
  setLayoutContext(context: ILayoutContext): this;

  /**
   * Get layout context
   */
  getLayoutContext(): ILayoutContext | null;

  /**
   * Update layout context
   * @param updates Partial layout context updates
   */
  updateLayoutContext(updates: Partial<ILayoutContext>): this;

  // ===== LAYOUT CALCULATION =====

  /**
   * Calculate layout
   * @param forceRecalculate Whether to force recalculation even if not dirty
   */
  calculateLayout(forceRecalculate?: boolean): Promise<ICalculatedLayout>;

  /**
   * Get calculated layout
   */
  getCalculatedLayout(): ICalculatedLayout | null;

  /**
   * Check if layout needs recalculation
   */
  needsLayoutRecalculation(): boolean;

  /**
   * Invalidate layout cache
   */
  invalidateLayout(): this;

  /**
   * Force layout recalculation
   */
  forceLayoutRecalculation(): this;

  // ===== LAYOUT APPLICATION =====

  /**
   * Apply calculated layout to the game object
   * @param layout Layout to apply
   */
  applyLayout(layout: ICalculatedLayout): Promise<this>;

  /**
   * Apply layout configuration directly
   * @param config Layout configuration to apply
   */
  applyLayoutConfig(config: ILayoutConfig): Promise<this>;

  /**
   * Remove layout from the game object
   */
  removeLayout(): Promise<this>;

  // ===== RESPONSIVE BEHAVIOR =====

  /**
   * Set current breakpoint
   * @param breakpoint Breakpoint to set
   */
  setCurrentBreakpoint(breakpoint: BreakpointName): this;

  /**
   * Get current breakpoint
   */
  getCurrentBreakpoint(): BreakpointName | null;

  /**
   * Update layout for current breakpoint
   */
  updateLayoutForBreakpoint(): Promise<this>;

  /**
   * Check if layout supports breakpoint
   * @param breakpoint Breakpoint to check
   */
  supportsBreakpoint(breakpoint: BreakpointName): boolean;

  // ===== LAYOUT STATE =====

  /**
   * Set layout state
   * @param state Layout state to set
   */
  setLayoutState(state: Partial<ILayoutableGameObject['layoutState']>): this;

  /**
   * Get layout state
   */
  getLayoutState(): ILayoutableGameObject['layoutState'];

  /**
   * Check if layout is dirty
   */
  isLayoutDirty(): boolean;

  /**
   * Check if layout is calculating
   */
  isLayoutCalculating(): boolean;

  /**
   * Mark layout as dirty
   */
  markLayoutDirty(): this;

  /**
   * Mark layout as clean
   */
  markLayoutClean(): this;

  // ===== LAYOUT METADATA =====

  /**
   * Set layout metadata
   * @param metadata Layout metadata to set
   */
  setLayoutMetadata(metadata: Partial<ILayoutableGameObject['layoutMetadata']>): this;

  /**
   * Get layout metadata
   */
  getLayoutMetadata(): ILayoutableGameObject['layoutMetadata'];

  /**
   * Add applied strategy
   * @param strategy Strategy name to add
   */
  addAppliedStrategy(strategy: string): this;

  /**
   * Get applied strategies
   */
  getAppliedStrategies(): string[];

  /**
   * Add layout to history
   * @param layout Layout to add to history
   */
  addLayoutToHistory(layout: ICalculatedLayout): this;

  /**
   * Get layout history
   */
  getLayoutHistory(): ICalculatedLayout[];

  /**
   * Update performance metrics
   * @param calculationTime Calculation time in milliseconds
   */
  updatePerformanceMetrics(calculationTime: number): this;

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): ILayoutableGameObject['layoutMetadata']['performanceMetrics'];

  // ===== LAYOUT VALIDATION =====

  /**
   * Validate layout configuration
   * @param config Layout configuration to validate
   */
  validateLayoutConfig(config: ILayoutConfig): Promise<boolean>;

  /**
   * Validate layout context
   * @param context Layout context to validate
   */
  validateLayoutContext(context: ILayoutContext): Promise<boolean>;

  /**
   * Validate calculated layout
   * @param layout Calculated layout to validate
   */
  validateCalculatedLayout(layout: ICalculatedLayout): Promise<boolean>;

  // ===== LAYOUT UTILITIES =====

  /**
   * Get layout bounds
   */
  getLayoutBounds(): { x: number; y: number; width: number; height: number };

  /**
   * Get layout size
   */
  getLayoutSize(): { width: number; height: number };

  /**
   * Get layout position
   */
  getLayoutPosition(): { x: number; y: number };

  /**
   * Check if layout is applied
   */
  isLayoutApplied(): boolean;

  /**
   * Get layout type
   */
  getLayoutType(): LayoutType;

  /**
   * Set layout type
   * @param type Layout type to set
   */
  setLayoutType(type: LayoutType): this;

  // ===== LAYOUT EVENTS =====

  /**
   * Called when layout is calculated
   * @param layout Calculated layout
   */
  onLayoutCalculated?(layout: ICalculatedLayout): void;

  /**
   * Called when layout is applied
   * @param layout Applied layout
   */
  onLayoutApplied?(layout: ICalculatedLayout): void;

  /**
   * Called when layout is removed
   */
  onLayoutRemoved?(): void;

  /**
   * Called when breakpoint changes
   * @param newBreakpoint New breakpoint
   * @param oldBreakpoint Old breakpoint
   */
  onBreakpointChanged?(newBreakpoint: BreakpointName, oldBreakpoint: BreakpointName | null): void;

  /**
   * Called when layout becomes dirty
   */
  onLayoutDirty?(): void;

  /**
   * Called when layout calculation starts
   */
  onLayoutCalculationStart?(): void;

  /**
   * Called when layout calculation completes
   * @param layout Calculated layout
   * @param duration Calculation duration in milliseconds
   */
  onLayoutCalculationComplete?(layout: ICalculatedLayout, duration: number): void;

  /**
   * Called when layout calculation fails
   * @param error Error that occurred
   */
  onLayoutCalculationError?(error: Error): void;
}
