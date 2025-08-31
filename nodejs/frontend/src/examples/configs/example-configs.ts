import type { IResponsiveConfig } from '../../abstract/configs/index';

/**
 * Example configurations demonstrating the use of IResponsiveConfig
 * These are simplified examples that work with the actual interface
 */

/**
 * Example 1: Basic Button Configuration
 * Shows basic responsive configuration
 */
export const exampleButtonConfig: Partial<IResponsiveConfig> = {
  // Base IConfiguration properties
  id: 'button-1',
  name: 'Primary Button',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: { componentType: 'button', priority: 'high' },

  // IPositionConfig properties
  positionMode: 'relative',
  x: 0,
  y: 0,
  zIndex: 1,
  anchor: { x: 0.5, y: 0.5 },
  offset: { x: 0, y: 0 },
  size: {
    width: 120,
    height: 40,
    minWidth: 80,
    maxWidth: 200,
    minHeight: 32,
    maxHeight: 60,
  },
  margin: { top: 8, right: 8, bottom: 8, left: 8 },
  padding: { top: 12, right: 16, bottom: 12, left: 16 },
  border: {
    width: 2,
    style: 'solid',
    color: '#007bff',
    radius: 6,
  },
  alignment: { horizontal: 'center', vertical: 'center' },
  transform: {
    scale: { x: 1, y: 1 },
    rotation: 0,
    skew: { x: 0, y: 0 },
  },
  constraints: {
    respectParentBounds: true,
    snapToGrid: false,
    gridSize: 8,
    maintainAspectRatio: false,
    minDistanceFromEdges: { top: 4, right: 4, bottom: 4, left: 4 },
  },
};

// Export the working example
export const allConfigExamples = {
  button: exampleButtonConfig,
};
