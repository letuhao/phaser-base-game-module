import { UnitSystemManager } from '../managers/UnitSystemManager';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { SizeValue } from '../enums/SizeValue';
import { PositionUnit } from '../enums/PositionUnit';
import { PositionValue } from '../enums/PositionValue';
import { ScaleUnit } from '../enums/ScaleUnit';
import { ScaleValue } from '../enums/ScaleValue';
import { createSizeUnitConfig, createPositionUnitConfig, createScaleUnitConfig } from '../interfaces/IUnitConfig';

/**
 * Basic Unit Test for UnitSystemManager
 * Tests the core functionality of unit creation and management
 */

describe('UnitSystemManager', () => {
  let manager: UnitSystemManager;

  beforeEach(() => {
    manager = new UnitSystemManager();
    manager.initialize();
  });

  afterEach(() => {
    manager.shutdown();
  });

  describe('Unit Creation', () => {
    it('should create a size unit successfully', () => {
      const config = createSizeUnitConfig(
        'test-size-unit',
        'Test Size Unit',
        SizeValue.PARENT_WIDTH,
        {
          sizeUnit: SizeUnit.PARENT_WIDTH,
          dimension: Dimension.WIDTH,
          maintainAspectRatio: true
        }
      );

      const unit = manager.createUnit('size', config);
      
      expect(unit).toBeDefined();
      expect(unit.id).toBe('test-size-unit');
      expect(unit.name).toBe('Test Size Unit');
      expect(unit.unitType).toBe('size');
    });

    it('should create a position unit successfully', () => {
      const config = createPositionUnitConfig(
        'test-position-unit',
        'Test Position Unit',
        PositionValue.CENTER,
        {
          positionUnit: PositionUnit.PIXEL,
          axis: Dimension.X
        }
      );

      const unit = manager.createUnit('position', config);
      
      expect(unit).toBeDefined();
      expect(unit.id).toBe('test-position-unit');
      expect(unit.name).toBe('Test Position Unit');
    });

    it('should create a scale unit successfully', () => {
      const config = createScaleUnitConfig(
        'test-scale-unit',
        'Test Scale Unit',
        ScaleValue.FACTOR,
        {
          scaleUnit: ScaleUnit.FACTOR,
          maintainAspectRatio: false
        }
      );

      const unit = manager.createUnit('scale', config);
      
      expect(unit).toBeDefined();
      expect(unit.id).toBe('test-scale-unit');
      expect(unit.name).toBe('Test Scale Unit');
    });
  });

  describe('Unit Management', () => {
    it('should retrieve created units', () => {
      const config = createSizeUnitConfig(
        'test-unit',
        'Test Unit',
        SizeValue.PIXEL
      );

      const unit = manager.createUnit('size', config);
      const retrievedUnit = manager.getUnit('test-unit');
      
      expect(retrievedUnit).toBe(unit);
    });

    it('should list all units', () => {
      const config1 = createSizeUnitConfig('unit1', 'Unit 1', SizeValue.PIXEL);
      const config2 = createSizeUnitConfig('unit2', 'Unit 2', SizeValue.PIXEL);

      manager.createUnit('size', config1);
      manager.createUnit('size', config2);

      const allUnits = manager.getAllUnits();
      expect(allUnits).toHaveLength(2);
      expect(allUnits.map(u => u.id)).toContain('unit1');
      expect(allUnits.map(u => u.id)).toContain('unit2');
    });

    it('should remove units', () => {
      const config = createSizeUnitConfig('test-unit', 'Test Unit', SizeValue.PIXEL);
      manager.createUnit('size', config);

      expect(manager.getUnit('test-unit')).toBeDefined();
      
      const removed = manager.removeUnit('test-unit');
      expect(removed).toBe(true);
      expect(manager.getUnit('test-unit')).toBeUndefined();
    });
  });

  describe('System Status', () => {
    it('should return correct system status', () => {
      const status = manager.getSystemStatus();
      
      expect(status.isInitialized).toBe(true);
      expect(status.totalUnits).toBe(0);
      expect(status.activeStrategies).toBe(0);
      expect(status.registeredObservers).toBe(0);
      expect(status.validationErrors).toBe(0);
    });

    it('should return performance metrics', () => {
      const metrics = manager.getPerformanceMetrics();
      
      expect(metrics.totalCalculations).toBe(0);
      expect(metrics.averageCalculationTime).toBe(0);
      expect(metrics.memoryUsage).toBe(0);
      expect(metrics.errorRate).toBe(0);
    });
  });

  describe('Configuration', () => {
    it('should update configuration', () => {
      const config = { memoryLimit: 1024, maxUnits: 100 };
      manager.updateConfiguration(config);
      
      const currentConfig = manager.getConfiguration();
      const performance = currentConfig.performance as Record<string, unknown>;
      expect(performance.memoryLimit).toBe(1024);
    });

    it('should reset to defaults', () => {
      // First update some configuration
      manager.updateConfiguration({ memoryLimit: 2048 });
      const currentConfig = manager.getConfiguration();
      const performance = currentConfig.performance as Record<string, unknown>;
      expect(performance.memoryLimit).toBe(2048);
      
      // Then reset
      manager.resetToDefaults();
      const resetConfig = manager.getConfiguration();
      const resetPerformance = resetConfig.performance as Record<string, unknown>;
      expect(resetPerformance.memoryLimit).toBe(0);
    });
  });
});
