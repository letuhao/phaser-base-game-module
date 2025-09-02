/**
 * Jest Test Setup File
 * Configures the testing environment for all unit tests
 */

import { jest } from '@jest/globals';
import { MOCK_CONTEXT_DEFAULTS, DEFAULT_FALLBACK_VALUES } from '../unit/constants';

// Global test configuration
global.console = {
  ...console,
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

// Mock performance API
global.performance = {
  now: () => Date.now(),
  mark: jest.fn(),
  measure: jest.fn(),
  getEntriesByName: jest.fn(() => []),
  getEntriesByType: jest.fn(() => []),
  getEntries: jest.fn(() => []),
  clearMarks: jest.fn(),
  clearMeasures: jest.fn(),
  clearResourceTimings: jest.fn(),
  setResourceTimingBufferSize: jest.fn(),
  toJSON: jest.fn(() => ({})),
} as any;

// Test utilities
export const createMockContext = () => ({
  parent: {
    width: MOCK_CONTEXT_DEFAULTS.PARENT.WIDTH,
    height: MOCK_CONTEXT_DEFAULTS.PARENT.HEIGHT,
    x: MOCK_CONTEXT_DEFAULTS.PARENT.X,
    y: MOCK_CONTEXT_DEFAULTS.PARENT.Y,
  },
  scene: {
    width: MOCK_CONTEXT_DEFAULTS.SCENE.WIDTH,
    height: MOCK_CONTEXT_DEFAULTS.SCENE.HEIGHT,
  },
  viewport: {
    width: MOCK_CONTEXT_DEFAULTS.VIEWPORT.WIDTH,
    height: MOCK_CONTEXT_DEFAULTS.VIEWPORT.HEIGHT,
  },
  breakpoint: {
    name: MOCK_CONTEXT_DEFAULTS.BREAKPOINT.NAME,
    width: MOCK_CONTEXT_DEFAULTS.BREAKPOINT.WIDTH,
    height: MOCK_CONTEXT_DEFAULTS.BREAKPOINT.HEIGHT,
  },
  content: {
    width: MOCK_CONTEXT_DEFAULTS.CONTENT.WIDTH,
    height: MOCK_CONTEXT_DEFAULTS.CONTENT.HEIGHT,
  },
  dimension: 'width' as const,
});

export const createMockUnit = (id: string, name: string, type: string) => ({
  id,
  name,
  unitType: type,
  isActive: true,
  calculate: jest.fn(() => DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT),
  validate: jest.fn(() => true),
  reset: jest.fn(),
  destroy: jest.fn(),
});

// Global test timeout
jest.setTimeout(10000);
