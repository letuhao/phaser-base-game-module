/**
 * Scene Performance Monitor Interface
 * 
 * Defines performance monitoring functionality for scene management.
 * Handles performance metrics, monitoring, and optimization.
 */

import type { ISceneElement } from '../ISceneElement';
// Note: This import is kept for future extensibility
// import type { ISceneConfig } from '../ISceneConfig';
import type { ISceneBuilder } from '../ISceneBuilder';

/**
 * Scene performance monitor operations
 */
export enum ScenePerformanceMonitorOperation {
  MONITOR_SCENE = 'monitor_scene',
  MONITOR_ELEMENT = 'monitor_element',
  MONITOR_BUILDER = 'monitor_builder',
  OPTIMIZE_PERFORMANCE = 'optimize_performance',
  GENERATE_REPORT = 'generate_report'
}

/**
 * Scene performance monitor configuration
 */
export interface ScenePerformanceMonitorConfig {
  enableRealTimeMonitoring: boolean;
  enablePerformanceLogging: boolean;
  enablePerformanceOptimization: boolean;
  monitoringInterval: number;
  reportInterval: number;
  maxMetricsHistory: number;
  metadata?: Record<string, any>;
}

/**
 * Scene performance metrics
 */
export interface ScenePerformanceMetrics {
  sceneId: string;
  elementCount: number;
  gameObjectCount: number;
  memoryUsage: number;
  renderTime: number;
  updateTime: number;
  buildTime: number;
  validationTime: number;
  lastUpdateTime: number;
  averageFrameTime: number;
  frameRate: number;
  metadata?: Record<string, any>;
}

/**
 * Scene performance statistics
 */
export interface ScenePerformanceStatistics {
  totalScenes: number;
  totalElements: number;
  totalGameObjects: number;
  averageMemoryUsage: number;
  averageRenderTime: number;
  averageUpdateTime: number;
  averageBuildTime: number;
  averageValidationTime: number;
  averageFrameRate: number;
  lastReportTime: number;
  performanceHistory: ScenePerformanceMetrics[];
  metadata?: Record<string, any>;
}

/**
 * Scene performance report
 */
export interface ScenePerformanceReport {
  reportId: string;
  reportTimestamp: number;
  reportDuration: number;
  sceneMetrics: ScenePerformanceMetrics[];
  globalStatistics: ScenePerformanceStatistics;
  performanceIssues: string[];
  optimizationSuggestions: string[];
  reportMetadata?: Record<string, any>;
}

/**
 * Interface for scene performance monitors
 */
export interface IScenePerformanceMonitor {
  readonly monitorId: string;
  
  /** Monitor configuration */
  monitorConfig: ScenePerformanceMonitorConfig;
  
  /** Performance statistics */
  performanceStatistics: ScenePerformanceStatistics;
  
  /** Performance metrics history */
  performanceHistory: Map<string, ScenePerformanceMetrics[]>;
  
  /** Monitor metadata */
  monitorMetadata: Record<string, any>;
  
  /** Set monitor configuration */
  setMonitorConfig(config: ScenePerformanceMonitorConfig): this;
  
  /** Set monitor metadata */
  setMonitorMetadata(metadata: Record<string, any>): this;
  
  /** Get monitor configuration */
  getMonitorConfig(): ScenePerformanceMonitorConfig;
  
  /** Get performance statistics */
  getPerformanceStatistics(): ScenePerformanceStatistics;
  
  /** Get performance history */
  getPerformanceHistory(): Map<string, ScenePerformanceMetrics[]>;
  
  /** Get monitor metadata */
  getMonitorMetadata(): Record<string, any>;
  
  /** Monitor scene */
  monitorScene(scene: any, metrics: ScenePerformanceMetrics): Promise<this>; // Phaser.Scene
  
  /** Monitor element */
  monitorElement(element: ISceneElement, metrics: Partial<ScenePerformanceMetrics>): Promise<this>;
  
  /** Monitor builder */
  monitorBuilder(builder: ISceneBuilder, metrics: Partial<ScenePerformanceMetrics>): Promise<this>;
  
  /** Get performance metrics for scene */
  getPerformanceMetrics(sceneId: string): ScenePerformanceMetrics | null;
  
  /** Get performance history for scene */
  getPerformanceHistoryForScene(sceneId: string): ScenePerformanceMetrics[];
  
  /** Generate performance report */
  generatePerformanceReport(sceneIds?: string[]): Promise<ScenePerformanceReport>;
  
  /** Optimize performance */
  optimizePerformance(sceneId: string): Promise<this>;
  
  /** Clear performance history */
  clearPerformanceHistory(sceneId?: string): Promise<this>;
  
  /** Update monitor */
  updateMonitor(deltaTime: number): void;
}
