/**
 * Effect System Interface
 * 
 * Defines the contract for effect management systems.
 * Follows SOLID principles with clear separation of concerns.
 */

import type { IEffect } from './IEffect';
import { EffectQualityLevel } from '../../enums';

/**
 * Effect system configuration
 */
export interface IEffectSystemConfig {
  maxEffects: number;
  performanceBudget: number;
  qualityLevel: EffectQualityLevel;
  enableDebug: boolean;
  enableProfiling: boolean;
}

/**
 * Effect system statistics
 */
export interface IEffectSystemStats {
  totalEffects: number;
  activeEffects: number;
  inactiveEffects: number;
  memoryUsage: number;
  updateTime: number;
  renderTime: number;
  frameRate: number;
}

/**
 * Interface for effect management systems
 * 
 * Provides a clean, extensible interface for managing effects
 * without violating SOLID principles.
 */
export interface IEffectSystem {
  // Configuration
  config: IEffectSystemConfig;
  
  // Effect management
  createEffect<T extends IEffect>(type: string, config: any): T | null;
  destroyEffect(effectId: string): boolean;
  getEffect(effectId: string): IEffect | null;
  getAllEffects(): IEffect[];
  getEffectsByType(type: string): IEffect[];
  
  // System control
  start(): void;
  stop(): void;
  pause(): void;
  resume(): void;
  update(deltaTime: number): void;
  
  // Statistics
  getStats(): IEffectSystemStats;
  getPerformanceMetrics(): any;
}
