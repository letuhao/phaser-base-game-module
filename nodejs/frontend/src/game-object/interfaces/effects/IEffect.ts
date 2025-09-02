/**
 * Base Effect Interface
 * 
 * Defines the core contract for all effects in the game object system.
 * This interface follows SOLID principles with clear separation of concerns.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType, EffectType, EffectQualityLevel, EffectState, EffectPriority } from '../../enums';

/**
 * Base interface for all effects
 * 
 * Extends IGameObject with effect-specific functionality for visual effects,
 * particle systems, and environmental effects.
 * 
 * Example implementation:
 * ```typescript
 * class MyEffect extends Phaser.GameObjects.GameObject implements IEffect {
 *   readonly gameObjectType = 'effect' as const;
 *   readonly effectType = 'particle' as const;
 *   // Implementation
 * }
 * ```
 */
export interface IEffect extends IGameObject {
  // ============================================================================
  // EFFECT IDENTITY
  // ============================================================================
  
  /** The type of this game object (always 'effect') */
  readonly gameObjectType: GameObjectType;
  
  /** The specific type of effect */
  readonly effectType: EffectType;
  
  // ============================================================================
  // EFFECT PROPERTIES
  // ============================================================================
  
  /** Current effect state */
  effectState: EffectState;
  
  /** Effect priority for rendering/update order */
  effectPriority: EffectPriority;
  
  /** Whether effect is enabled */
  enabled: boolean;
  
  /** Whether effect is visible */
  visible: boolean;
  
  /** Effect intensity (0.0 to 1.0) */
  intensity: number;
  
  /** Effect duration in seconds (0 = infinite) */
  duration: number;
  
  /** Current effect time */
  currentTime: number;
  
  /** Effect loop count (0 = infinite) */
  loopCount: number;
  
  /** Current loop iteration */
  currentLoop: number;
  
  /** Effect delay before starting */
  startDelay: number;
  
  /** Effect delay before stopping */
  stopDelay: number;
  
  /** Effect fade in duration */
  fadeInDuration: number;
  
  /** Effect fade out duration */
  fadeOutDuration: number;
  
  /** Effect auto-destroy when finished */
  autoDestroy: boolean;
  
  /** Effect pause on scene pause */
  pauseOnScenePause: boolean;
  
  /** Effect resume on scene resume */
  resumeOnSceneResume: boolean;
  
  /** Effect performance budget (max particles/objects) */
  performanceBudget: number;
  
  /** Effect quality level */
  qualityLevel: EffectQualityLevel;
  
  /** Effect debug mode */
  debugMode: boolean;
  
  /** Effect metadata */
  metadata: Record<string, any>;
  
  // ============================================================================
  // EFFECT METHODS
  // ============================================================================
  
  /** Initialize the effect */
  initializeEffect(): Promise<this>;
  
  /** Start the effect */
  startEffect(): this;
  
  /** Stop the effect */
  stopEffect(): this;
  
  /** Pause the effect */
  pauseEffect(): this;
  
  /** Resume the effect */
  resumeEffect(): this;
  
  /** Reset the effect to initial state */
  resetEffect(): this;
  
  /** Update the effect */
  updateEffect(deltaTime: number): void;
  
  /** Set effect intensity */
  setEffectIntensity(intensity: number): this;
  
  /** Set effect duration */
  setEffectDuration(duration: number): this;
  
  /** Set effect loop count */
  setEffectLoopCount(count: number): this;
  
  /** Set effect priority */
  setEffectPriority(priority: EffectPriority): this;
  
  /** Set effect enabled state */
  setEffectEnabled(enabled: boolean): this;
  
  /** Set effect visible state */
  setEffectVisible(visible: boolean): this;
  
  /** Set effect quality level */
  setEffectQuality(quality: EffectQualityLevel): this;
  
  /** Set effect performance budget */
  setEffectPerformanceBudget(budget: number): this;
  
  /** Set effect debug mode */
  setEffectDebugMode(debug: boolean): this;
  
  /** Set effect metadata */
  setEffectMetadata(metadata: Record<string, any>): this;
  
  /** Get effect metadata */
  getEffectMetadata(): Record<string, any>;
  
  /** Get effect progress (0.0 to 1.0) */
  getEffectProgress(): number;
  
  /** Get effect remaining time */
  getEffectRemainingTime(): number;
  
  /** Check if effect is finished */
  isEffectFinished(): boolean;
  
  /** Check if effect is looping */
  isEffectLooping(): boolean;
  
  /** Get effect performance metrics */
  getEffectPerformanceMetrics(): {
    activeObjects: number;
    memoryUsage: number;
    updateTime: number;
    renderTime: number;
  };
  
  /** Clone the effect */
  cloneEffect(): IEffect;
  
  /** Serialize effect state */
  serializeEffect(): string;
  
  /** Deserialize effect state */
  deserializeEffect(data: string): this;
}
