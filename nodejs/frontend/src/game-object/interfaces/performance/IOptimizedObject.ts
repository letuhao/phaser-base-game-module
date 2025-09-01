/**
 * Optimized Object Interface
 * 
 * Defines performance optimization functionality for game objects.
 * Handles LOD, culling, and other performance optimizations.
 */

import type { IGameObject } from '../IGameObject';
import { GameObjectType } from '../../enums/GameObjectEnums';
import * as Phaser from 'phaser';

/**
 * LOD levels
 */
export enum LODLevel {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  ULTRA_LOW = 'ultra_low'
}

/**
 * Culling types
 */
export enum CullingType {
  FRUSTUM = 'frustum',
  OCCLUSION = 'occlusion',
  DISTANCE = 'distance',
  CUSTOM = 'custom'
}

/**
 * Optimization states
 */
export enum OptimizationState {
  OPTIMIZED = 'optimized',
  PARTIAL = 'partial',
  UNOPTIMIZED = 'unoptimized',
  DISABLED = 'disabled'
}

/**
 * Interface for optimized game objects
 * 
 * Extends IGameObject with performance optimization functionality.
 */
export interface IOptimizedObject extends IGameObject {
  readonly gameObjectType: GameObjectType.OPTIMIZED_OBJECT;
  
  /** LOD level */
  lodLevel: LODLevel;
  
  /** Culling type */
  cullingType: CullingType;
  
  /** Optimization state */
  optimizationState: OptimizationState;
  
  /** LOD distances */
  lodDistances: { high: number; medium: number; low: number; ultraLow: number };
  
  /** Culling distance */
  cullingDistance: number;
  
  /** Culling enabled */
  cullingEnabled: boolean;
  
  /** Frustum culling */
  frustumCulling: boolean;
  
  /** Occlusion culling */
  occlusionCulling: boolean;
  
  /** Distance culling */
  distanceCulling: boolean;
  
  /** Custom culling */
  customCulling: boolean;
  
  /** Culling bounds */
  cullingBounds: { minX: number; maxX: number; minY: number; maxY: number; minZ: number; maxZ: number };
  
  /** Culling margin */
  cullingMargin: number;
  
  /** Culling camera */
  cullingCamera: Phaser.Cameras.Scene2D.Camera | null;
  
  /** Performance budget */
  performanceBudget: number;
  
  /** Performance cost */
  performanceCost: number;
  
  /** Performance priority */
  performancePriority: number;
  
  /** Update frequency */
  updateFrequency: number;
  
  /** Render frequency */
  renderFrequency: number;
  
  /** Skip frames */
  skipFrames: number;
  
  /** Skip updates */
  skipUpdates: number;
  
  /** Set LOD level */
  setLODLevel(level: LODLevel): this;
  
  /** Set culling type */
  setCullingType(type: CullingType): this;
  
  /** Set optimization state */
  setOptimizationState(state: OptimizationState): this;
  
  /** Set LOD distances */
  setLODDistances(high: number, medium: number, low: number, ultraLow: number): this;
  
  /** Set culling distance */
  setCullingDistance(distance: number): this;
  
  /** Set culling enabled */
  setCullingEnabled(enabled: boolean): this;
  
  /** Set frustum culling */
  setFrustumCulling(culling: boolean): this;
  
  /** Set occlusion culling */
  setOcclusionCulling(culling: boolean): this;
  
  /** Set distance culling */
  setDistanceCulling(culling: boolean): this;
  
  /** Set custom culling */
  setCustomCulling(culling: boolean): this;
  
  /** Set culling bounds */
  setCullingBounds(minX: number, maxX: number, minY: number, maxY: number, minZ: number, maxZ: number): this;
  
  /** Set culling margin */
  setCullingMargin(margin: number): this;
  
  /** Set culling camera */
  setCullingCamera(camera: Phaser.Cameras.Scene2D.Camera | null): this;
  
  /** Set performance budget */
  setPerformanceBudget(budget: number): this;
  
  /** Set performance cost */
  setPerformanceCost(cost: number): this;
  
  /** Set performance priority */
  setPerformancePriority(priority: number): this;
  
  /** Set update frequency */
  setUpdateFrequency(frequency: number): this;
  
  /** Set render frequency */
  setRenderFrequency(frequency: number): this;
  
  /** Set skip frames */
  setSkipFrames(frames: number): this;
  
  /** Set skip updates */
  setSkipUpdates(updates: number): this;
  
  /** Get LOD level */
  getLODLevel(): LODLevel;
  
  /** Get culling type */
  getCullingType(): CullingType;
  
  /** Get optimization state */
  getOptimizationState(): OptimizationState;
  
  /** Get LOD distances */
  getLODDistances(): { high: number; medium: number; low: number; ultraLow: number };
  
  /** Get culling distance */
  getCullingDistance(): number;
  
  /** Get culling enabled */
  getCullingEnabled(): boolean;
  
  /** Get frustum culling */
  getFrustumCulling(): boolean;
  
  /** Get occlusion culling */
  getOcclusionCulling(): boolean;
  
  /** Get distance culling */
  getDistanceCulling(): boolean;
  
  /** Get custom culling */
  getCustomCulling(): boolean;
  
  /** Get culling bounds */
  getCullingBounds(): { minX: number; maxX: number; minY: number; maxY: number; minZ: number; maxZ: number };
  
  /** Get culling margin */
  getCullingMargin(): number;
  
  /** Get culling camera */
  getCullingCamera(): Phaser.Cameras.Scene2D.Camera | null;
  
  /** Get performance budget */
  getPerformanceBudget(): number;
  
  /** Get performance cost */
  getPerformanceCost(): number;
  
  /** Get performance priority */
  getPerformancePriority(): number;
  
  /** Get update frequency */
  getUpdateFrequency(): number;
  
  /** Get render frequency */
  getRenderFrequency(): number;
  
  /** Get skip frames */
  getSkipFrames(): number;
  
  /** Get skip updates */
  getSkipUpdates(): number;
  
  /** Check if object should be culled */
  shouldBeCulled(): boolean;
  
  /** Check if object should be updated */
  shouldBeUpdated(): boolean;
  
  /** Check if object should be rendered */
  shouldBeRendered(): boolean;
  
  /** Update optimization */
  updateOptimization(deltaTime: number): void;
}
