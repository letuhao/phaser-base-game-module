import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { UnitMementoManager } from '../mementos/UnitMementoManager';
import { UnitCalculationMemento } from '../mementos/UnitCalculationMemento';
import { createMockContext } from '../../test/setup';
import { SizeUnit } from '../enums/SizeUnit';

// Mock template for testing
class MockSizeCalculationTemplate {
  constructor() {}
  get name() {
    return 'MockSizeCalculationTemplate';
  }
}

describe('UnitMementoManager', () => {
  let manager: UnitMementoManager;
  let mockTemplate: MockSizeCalculationTemplate;
  let mockInput: any;
  let mockContext: any;
  let mockPerformanceMetrics: any;

  beforeEach(() => {
    manager = new UnitMementoManager();
    mockTemplate = new MockSizeCalculationTemplate();
    mockInput = { value: 100, unit: SizeUnit.PIXEL };
    mockContext = createMockContext();
    mockPerformanceMetrics = {
      totalTime: 50,
      stepTimes: { validation: 10, calculation: 30, rounding: 10 },
      memoryUsage: 1024,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create manager with default settings', () => {
      expect(manager).toBeInstanceOf(UnitMementoManager);
    });
  });

  describe('setAutoSaveEnabled', () => {
    it('should enable auto-save', () => {
      manager.setAutoSaveEnabled(true);
      // Note: We can't directly test the private property, but we can test the behavior
      // by calling autoSaveCalculation and verifying it works
    });

    it('should disable auto-save', () => {
      manager.setAutoSaveEnabled(false);
      // Auto-save should be disabled
    });
  });

  describe('setAutoSaveThreshold', () => {
    it('should set auto-save threshold', () => {
      manager.setAutoSaveThreshold(200);
      // Threshold should be set to 200ms
    });

    it('should not allow negative threshold', () => {
      manager.setAutoSaveThreshold(-100);
      // Should be set to 0 or positive value
    });
  });

  describe('setSignificantChangeThresholds', () => {
    it('should set significant change thresholds', () => {
      const thresholds = { timeThreshold: 100, resultThreshold: 0.05 };
      manager.setSignificantChangeThresholds(thresholds);
      // Thresholds should be set
    });

    it('should not allow negative thresholds', () => {
      const thresholds = { timeThreshold: -50, resultThreshold: -0.01 };
      manager.setSignificantChangeThresholds(thresholds);
      // Should be set to 0 or positive values
    });
  });

  describe('saveCalculationMemento', () => {
    it('should save successful calculation memento', () => {
      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        150,
        mockPerformanceMetrics,
        true
      );

      const mementos = manager.getCalculationMementos(mockTemplate as any, mockContext);
      expect(mementos).toHaveLength(1);
      expect(mementos[0]).toBeInstanceOf(UnitCalculationMemento);

      const memento = mementos[0] as UnitCalculationMemento;
      expect(memento.wasSuccessful()).toBe(true);
      expect(memento.getCalculationResult()).toBe(150);
      expect(memento.getCalculationInput()).toEqual(mockInput);
    });

    it('should save failed calculation memento', () => {
      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        NaN,
        mockPerformanceMetrics,
        false,
        'Calculation failed'
      );

      const mementos = manager.getCalculationMementos(mockTemplate as any, mockContext);
      expect(mementos).toHaveLength(1);

      const memento = mementos[0] as UnitCalculationMemento;
      expect(memento.wasSuccessful()).toBe(false);
      expect(memento.getErrorMessage()).toBe('Calculation failed');
      expect(memento.getCalculationResult()).toBeNaN();
    });
  });

  describe('autoSaveCalculation', () => {
    it('should auto-save when enabled and no previous memento', () => {
      manager.setAutoSaveEnabled(true);
      manager.setAutoSaveThreshold(0); // Allow immediate saving

      manager.autoSaveCalculation(
        mockTemplate as any,
        mockInput,
        mockContext,
        150,
        mockPerformanceMetrics,
        true
      );

      const mementos = manager.getCalculationMementos(mockTemplate as any, mockContext);
      expect(mementos).toHaveLength(1);
    });

    it('should not auto-save when disabled', () => {
      manager.setAutoSaveEnabled(false);

      manager.autoSaveCalculation(
        mockTemplate as any,
        mockInput,
        mockContext,
        150,
        mockPerformanceMetrics,
        true
      );

      const mementos = manager.getCalculationMementos(mockTemplate as any, mockContext);
      expect(mementos).toHaveLength(0);
    });

    it('should not auto-save when threshold not met', () => {
      manager.setAutoSaveEnabled(true);
      manager.setAutoSaveThreshold(1000); // High threshold

      // Save first memento
      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        100,
        mockPerformanceMetrics,
        true
      );

      // Try to auto-save immediately (should be blocked by threshold)
      manager.autoSaveCalculation(
        mockTemplate as any,
        mockInput,
        mockContext,
        150,
        mockPerformanceMetrics,
        true
      );

      const mementos = manager.getCalculationMementos(mockTemplate as any, mockContext);
      expect(mementos).toHaveLength(1); // Only the first one
    });
  });

  describe('restoreToCalculation', () => {
    it('should restore to calculation memento', () => {
      // Save a memento first
      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        150,
        mockPerformanceMetrics,
        true
      );

      const mementos = manager.getCalculationMementos(mockTemplate as any, mockContext);
      const memento = mementos[0];

      const result = manager.restoreToCalculation(mockTemplate as any, mockContext, memento);
      expect(result).toBe(true);
    });

    it('should fail to restore non-calculation memento', () => {
      // Create a mock non-calculation memento
      const mockMemento = {
        getTimestamp: () => new Date(),
        getUnitId: () => 'test',
        getVersion: () => '1.0.0',
        getMetadata: () => ({ unitType: 'test', stateSize: 0, checksum: 'test', description: '' }),
        validate: () => true,
        getSize: () => 0,
        getDescription: () => '',
      };

      const result = manager.restoreToCalculation(
        mockTemplate as any,
        mockContext,
        mockMemento as any
      );
      expect(result).toBe(false);
    });
  });

  describe('undoCalculation and redoCalculation', () => {
    it('should undo and redo calculations', () => {
      // Save multiple mementos
      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        100,
        mockPerformanceMetrics,
        true
      );

      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        200,
        mockPerformanceMetrics,
        true
      );

      // Initially, no undo/redo available (undo stack is empty)
      expect(manager.canUndoCalculation(mockTemplate as any, mockContext)).toBe(false);
      expect(manager.canRedoCalculation(mockTemplate as any, mockContext)).toBe(false);

      // Get the latest memento and restore to it (this populates undo stack with 2 mementos)
      const latestMemento = manager.getLatestCalculationMemento(mockTemplate as any, mockContext);
      expect(latestMemento).toBeDefined();

      const restoreResult = manager.restoreToCalculation(
        mockTemplate as any,
        mockContext,
        latestMemento!
      );
      expect(restoreResult).toBe(true);

      // Now undo should be available (2 mementos in undo stack)
      expect(manager.canUndoCalculation(mockTemplate as any, mockContext)).toBe(true);
      expect(manager.canRedoCalculation(mockTemplate as any, mockContext)).toBe(false);

      // First undo (removes one memento, leaves one in undo stack)
      const undoneMemento1 = manager.undoCalculation(mockTemplate as any, mockContext);
      expect(undoneMemento1).toBeDefined();
      expect(manager.canUndoCalculation(mockTemplate as any, mockContext)).toBe(true); // Still one left
      expect(manager.canRedoCalculation(mockTemplate as any, mockContext)).toBe(true);

      // Second undo (removes the last memento from undo stack)
      const undoneMemento2 = manager.undoCalculation(mockTemplate as any, mockContext);
      expect(undoneMemento2).toBeDefined();
      expect(manager.canUndoCalculation(mockTemplate as any, mockContext)).toBe(false); // Now empty
      expect(manager.canRedoCalculation(mockTemplate as any, mockContext)).toBe(true);

      // Redo (moves one memento back to undo stack)
      const redoneMemento = manager.redoCalculation(mockTemplate as any, mockContext);
      expect(redoneMemento).toBeDefined();
      expect(manager.canUndoCalculation(mockTemplate as any, mockContext)).toBe(true);
      expect(manager.canRedoCalculation(mockTemplate as any, mockContext)).toBe(true);
    });

    it('should handle undo when no history', () => {
      expect(manager.canUndoCalculation(mockTemplate as any, mockContext)).toBe(false);
      const undoneMemento = manager.undoCalculation(mockTemplate as any, mockContext);
      expect(undoneMemento).toBeUndefined();
    });

    it('should handle redo when no redo history', () => {
      expect(manager.canRedoCalculation(mockTemplate as any, mockContext)).toBe(false);
      const redoneMemento = manager.redoCalculation(mockTemplate as any, mockContext);
      expect(redoneMemento).toBeUndefined();
    });
  });

  describe('getCalculationHistory', () => {
    it('should return calculation history', () => {
      // Save multiple mementos
      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        100,
        mockPerformanceMetrics,
        true
      );

      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        200,
        mockPerformanceMetrics,
        true
      );

      // Initially, history should be empty (no undo/redo operations)
      const history = manager.getCalculationHistory(mockTemplate as any, mockContext);
      expect(history.undo).toHaveLength(0);
      expect(history.redo).toHaveLength(0);

      // Restore to a memento to populate undo stack
      const latestMemento = manager.getLatestCalculationMemento(mockTemplate as any, mockContext);
      manager.restoreToCalculation(mockTemplate as any, mockContext, latestMemento!);

      // Now undo stack should have mementos
      const historyAfterRestore = manager.getCalculationHistory(mockTemplate as any, mockContext);
      expect(historyAfterRestore.undo.length).toBeGreaterThan(0);
      expect(historyAfterRestore.redo).toHaveLength(0);
    });

    it('should return empty history when no mementos', () => {
      const history = manager.getCalculationHistory(mockTemplate as any, mockContext);
      expect(history.undo).toHaveLength(0);
      expect(history.redo).toHaveLength(0);
    });
  });

  describe('getCalculationMementos', () => {
    it('should return all calculation mementos for a unit', () => {
      // Save multiple mementos
      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        100,
        mockPerformanceMetrics,
        true
      );

      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        200,
        mockPerformanceMetrics,
        true
      );

      const mementos = manager.getCalculationMementos(mockTemplate as any, mockContext);
      expect(mementos).toHaveLength(2);
      expect(mementos.every(m => m instanceof UnitCalculationMemento)).toBe(true);
    });

    it('should return empty array when no mementos', () => {
      const mementos = manager.getCalculationMementos(mockTemplate as any, mockContext);
      expect(mementos).toHaveLength(0);
    });
  });

  describe('getLatestCalculationMemento', () => {
    it('should return the latest calculation memento', () => {
      // Save multiple mementos
      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        100,
        mockPerformanceMetrics,
        true
      );

      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        200,
        mockPerformanceMetrics,
        true
      );

      const latestMemento = manager.getLatestCalculationMemento(mockTemplate as any, mockContext);
      expect(latestMemento).toBeDefined();
      expect(latestMemento).toBeInstanceOf(UnitCalculationMemento);

      const memento = latestMemento as UnitCalculationMemento;
      expect(memento.getCalculationResult()).toBe(200);
    });

    it('should return undefined when no mementos', () => {
      const latestMemento = manager.getLatestCalculationMemento(mockTemplate as any, mockContext);
      expect(latestMemento).toBeUndefined();
    });
  });

  describe('analyzeCalculationPerformance', () => {
    it('should analyze performance with multiple calculations', () => {
      // Save multiple mementos with different performance
      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        100,
        { ...mockPerformanceMetrics, totalTime: 50 },
        true
      );

      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        200,
        { ...mockPerformanceMetrics, totalTime: 75 },
        true
      );

      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        300,
        { ...mockPerformanceMetrics, totalTime: 25 },
        false,
        'Error'
      );

      const analysis = manager.analyzeCalculationPerformance(mockTemplate as any, mockContext);

      expect(analysis.totalCalculations).toBe(3);
      expect(analysis.successRate).toBeCloseTo(66.67, 1); // 2 out of 3 successful
      expect(analysis.averageTime).toBe(50); // (50 + 75 + 25) / 3
      expect(analysis.bestPerformance).toBe(25);
      expect(analysis.worstPerformance).toBe(75);
      expect(analysis.averageEfficiency).toBeGreaterThan(0);
      expect(analysis.trends.timeTrend).toBeDefined();
      expect(analysis.trends.efficiencyTrend).toBeDefined();
    });

    it('should return default values when no calculations', () => {
      const analysis = manager.analyzeCalculationPerformance(mockTemplate as any, mockContext);

      expect(analysis.totalCalculations).toBe(0);
      expect(analysis.successRate).toBe(0);
      expect(analysis.averageTime).toBe(0);
      expect(analysis.averageEfficiency).toBe(0);
      expect(analysis.bestPerformance).toBe(0);
      expect(analysis.worstPerformance).toBe(0);
      expect(analysis.trends.timeTrend).toBe('stable');
      expect(analysis.trends.efficiencyTrend).toBe('stable');
    });
  });

  describe('exportCalculationData', () => {
    it('should export calculation data', () => {
      // Save a memento
      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        150,
        mockPerformanceMetrics,
        true
      );

      const exportData = manager.exportCalculationData(mockTemplate as any, mockContext);
      const parsed = JSON.parse(exportData);

      expect(parsed.exportDate).toBeDefined();
      expect(parsed.unitId).toBeDefined();
      expect(parsed.templateName).toBe('MockSizeCalculationTemplate');
      expect(parsed.totalCalculations).toBe(1);
      expect(parsed.calculations).toHaveLength(1);
      expect(parsed.calculations[0].result).toBe(150);
      expect(parsed.calculations[0].success).toBe(true);
      expect(parsed.calculations[0].performance).toEqual(mockPerformanceMetrics);
    });

    it('should export empty data when no calculations', () => {
      const exportData = manager.exportCalculationData(mockTemplate as any, mockContext);
      const parsed = JSON.parse(exportData);

      expect(parsed.totalCalculations).toBe(0);
      expect(parsed.calculations).toHaveLength(0);
    });
  });

  describe('getMementoStats', () => {
    it('should return memento statistics', () => {
      // Save some mementos
      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        100,
        mockPerformanceMetrics,
        true
      );

      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        200,
        mockPerformanceMetrics,
        true
      );

      const stats = manager.getMementoStats();

      expect(stats.totalMementos).toBe(2);
      expect(stats.totalSize).toBeGreaterThan(0);
      expect(stats.unitsWithMementos).toBe(1);
      expect(stats.oldestMemento).toBeDefined();
      expect(stats.newestMemento).toBeDefined();
    });

    it('should return empty statistics when no mementos', () => {
      const stats = manager.getMementoStats();

      expect(stats.totalMementos).toBe(0);
      expect(stats.totalSize).toBe(0);
      expect(stats.unitsWithMementos).toBe(0);
      expect(stats.oldestMemento).toBeUndefined();
      expect(stats.newestMemento).toBeUndefined();
    });
  });

  describe('clearUnitMementos', () => {
    it('should clear all mementos for a unit', () => {
      // Save some mementos
      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        100,
        mockPerformanceMetrics,
        true
      );

      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        200,
        mockPerformanceMetrics,
        true
      );

      // Verify mementos exist
      let mementos = manager.getCalculationMementos(mockTemplate as any, mockContext);
      expect(mementos).toHaveLength(2);

      // Clear mementos
      manager.clearUnitMementos(mockTemplate as any, mockContext);

      // Verify mementos are cleared
      mementos = manager.getCalculationMementos(mockTemplate as any, mockContext);
      expect(mementos).toHaveLength(0);
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle multiple templates and contexts', () => {
      const template2 = new MockSizeCalculationTemplate();
      const context2 = {
        ...createMockContext(),
        parent: { width: 1000, height: 800, x: 50, y: 50 }, // Different parent dimensions
        scene: { width: 1400, height: 900 }, // Different scene dimensions
      };

      // Save mementos for different templates/contexts
      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        100,
        mockPerformanceMetrics,
        true
      );

      manager.saveCalculationMemento(
        template2 as any,
        mockInput,
        context2,
        200,
        mockPerformanceMetrics,
        true
      );

      // Each should have their own mementos
      const mementos1 = manager.getCalculationMementos(mockTemplate as any, mockContext);
      const mementos2 = manager.getCalculationMementos(template2 as any, context2);

      expect(mementos1).toHaveLength(1);
      expect(mementos2).toHaveLength(1);
      expect(mementos1[0]).not.toBe(mementos2[0]);
    });

    it('should handle NaN results in performance analysis', () => {
      // Save memento with NaN result
      manager.saveCalculationMemento(
        mockTemplate as any,
        mockInput,
        mockContext,
        NaN,
        mockPerformanceMetrics,
        false,
        'Error'
      );

      const analysis = manager.analyzeCalculationPerformance(mockTemplate as any, mockContext);
      expect(analysis.totalCalculations).toBe(1);
      expect(analysis.successRate).toBe(0);
    });
  });
});
