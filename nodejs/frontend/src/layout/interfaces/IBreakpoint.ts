/**
 * Core Breakpoint Interface
 * Defines the structure for breakpoint objects in the layout system
 * Inspired by CSS media queries and responsive design patterns
 */

import { BreakpointName, BreakpointCondition } from '../enums/LayoutEnums';
import {
  BreakpointOperator,
  DeviceOrientation,
  DeviceType,
  BreakpointPriority,
  BreakpointStatus,
} from '../enums/BreakpointEnums';

/**
 * Breakpoint configuration interface
 * Defines a single breakpoint with its conditions and properties
 */
export interface IBreakpoint {
  /** Unique identifier for the breakpoint */
  id: string;

  /** Human-readable name for the breakpoint */
  name: BreakpointName;

  /** Display name for UI purposes */
  displayName: string;

  /** Description of what this breakpoint represents */
  description?: string;

  /** Conditions that must be met for this breakpoint to be active */
  conditions: IBreakpointCondition[];

  /** Priority level (higher numbers = higher priority) */
  priority: BreakpointPriority;

  /** Current status of the breakpoint */
  status: BreakpointStatus;

  /** Whether this breakpoint is currently active */
  isActive: boolean;

  /** Custom properties specific to this breakpoint */
  properties?: Record<string, unknown>;

  /** Metadata for the breakpoint */
  metadata?: IBreakpointMetadata;
}

/**
 * Breakpoint condition interface
 * Defines a single condition that must be met for a breakpoint to be active
 */
export interface IBreakpointCondition {
  /** Type of condition */
  type: BreakpointCondition;

  /** Value to compare against */
  value: number | string;

  /** Comparison operator */
  operator: BreakpointOperator;

  /** Whether this condition is required (all conditions must be met) */
  required?: boolean;

  /** Custom condition logic function */
  customLogic?: (context: IBreakpointContext) => boolean;
}

/**
 * Breakpoint context interface
 * Provides context information for breakpoint evaluation
 */
export interface IBreakpointContext {
  /** Current viewport width */
  viewportWidth: number;

  /** Current viewport height */
  viewportHeight: number;

  /** Current device pixel ratio */
  pixelRatio: number;

  /** Current device orientation */
  orientation: DeviceOrientation;

  /** Current device type */
  deviceType: DeviceType;

  /** Current scene dimensions */
  sceneWidth: number;
  sceneHeight: number;

  /** Additional context data */
  additionalData?: Record<string, unknown>;
}

/**
 * Breakpoint metadata interface
 * Contains additional information about a breakpoint
 */
export interface IBreakpointMetadata {
  /** When this breakpoint was created */
  createdAt: Date;

  /** When this breakpoint was last modified */
  modifiedAt: Date;

  /** Author of this breakpoint */
  author?: string;

  /** Version of this breakpoint */
  version?: string;

  /** Tags for categorization */
  tags?: string[];

  /** Custom metadata */
  custom?: Record<string, unknown>;
}
