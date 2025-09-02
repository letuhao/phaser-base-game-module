import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { LegacyPositionUnitAdapter } from '../adapters/LegacyPositionUnitAdapter';
import { ILegacyUnit, createLegacyPositionUnit } from '../interfaces/ILegacyUnit';
import { PositionUnit } from '../enums/PositionUnit';
import { Dimension } from '../enums/Dimension';
import { UnitType } from '../enums/UnitType';
import { createMockContext } from '../../test/setup';

describe('LegacyPositionUnitAdapter', () => {
  let adapter: LegacyPositionUnitAdapter;
  let mockLegacyUnit: ILegacyUnit;
  let mockContext: any;

  beforeEach(() => {
    mockLegacyUnit = createLegacyPositionUnit({
      position: 100,
      x: 100,
      y: 100,
      axis: Dimension.X,
      positionUnit: PositionUnit.PIXEL,
      baseValue: 100,
      metadata: {
        legacyType: 'old-position-format',
        convertedAt: new Date().toISOString(),
        description: 'Legacy position unit for testing',
      },
    });
    adapter = new LegacyPositionUnitAdapter('adapter-1', 'Legacy Position Adapter', mockLegacyUnit);
    mockContext = createMockContext();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create a legacy position unit adapter', () => {
      expect(adapter.id).toBe('adapter-1');
      expect(adapter.name).toBe('Legacy Position Adapter');
      expect(adapter.unitType).toBe(UnitType.POSITION);
      expect(adapter.isActive).toBe(true);
    });

    it('should wrap the legacy unit correctly', () => {
      expect(adapter.getAdaptedUnit()).toBe(mockLegacyUnit);
    });
  });

  describe('calculate', () => {
    it('should calculate position from legacy unit', () => {
      const result = adapter.calculate(mockContext);
      expect(result).toBe(100); // Should return the legacy unit value
    });

    it('should handle different legacy unit values', () => {
      const largeLegacyUnit = createLegacyPositionUnit({
        position: 500,
        x: 500,
        y: 500,
        positionUnit: PositionUnit.PIXEL,
      });
      const largeAdapter = new LegacyPositionUnitAdapter(
        'large-adapter',
        'Large Adapter',
        largeLegacyUnit
      );

      const result = largeAdapter.calculate(mockContext);
      expect(result).toBe(500);
    });

    it('should handle legacy units with different units', () => {
      const percentLegacyUnit = createLegacyPositionUnit({
        position: 50,
        positionUnit: 'percent' as any,
      });
      const percentAdapter = new LegacyPositionUnitAdapter(
        'percent-adapter',
        'Percent Adapter',
        percentLegacyUnit
      );

      const result = percentAdapter.calculate(mockContext);
      // Should convert percent to pixels based on context
      expect(result).toBeGreaterThan(0);
    });

    it('should handle legacy units with different axes', () => {
      const yAxisLegacyUnit = createLegacyPositionUnit({
        position: 200,
        axis: Dimension.Y,
      });
      const yAxisAdapter = new LegacyPositionUnitAdapter(
        'y-axis-adapter',
        'Y Axis Adapter',
        yAxisLegacyUnit
      );

      const result = yAxisAdapter.calculate(mockContext);
      expect(result).toBe(200);
    });
  });

  describe('isResponsive', () => {
    it('should be responsive for parent left units', () => {
      const parentLeftLegacyUnit = createLegacyPositionUnit({
        positionUnit: PositionUnit.PARENT_LEFT,
      });
      const parentLeftAdapter = new LegacyPositionUnitAdapter(
        'parent-left-adapter',
        'Parent Left Adapter',
        parentLeftLegacyUnit
      );

      expect(parentLeftAdapter.isResponsive()).toBe(true);
    });

    it('should be responsive for viewport left units', () => {
      const viewportLeftLegacyUnit = createLegacyPositionUnit({
        positionUnit: PositionUnit.VIEWPORT_LEFT,
      });
      const viewportLeftAdapter = new LegacyPositionUnitAdapter(
        'viewport-left-adapter',
        'Viewport Left Adapter',
        viewportLeftLegacyUnit
      );

      expect(viewportLeftAdapter.isResponsive()).toBe(true);
    });

    it('should not be responsive for pixel units', () => {
      const pixelLegacyUnit = createLegacyPositionUnit({ positionUnit: PositionUnit.PIXEL });
      const pixelAdapter = new LegacyPositionUnitAdapter(
        'pixel-adapter',
        'Pixel Adapter',
        pixelLegacyUnit
      );

      expect(pixelAdapter.isResponsive()).toBe(false);
    });

    it('should not be responsive for static units', () => {
      const staticLegacyUnit = createLegacyPositionUnit({ positionUnit: PositionUnit.PIXEL });
      const staticAdapter = new LegacyPositionUnitAdapter(
        'static-adapter',
        'Static Adapter',
        staticLegacyUnit
      );

      expect(staticAdapter.isResponsive()).toBe(false);
    });
  });

  describe('canAdapt', () => {
    it('should be able to adapt units with position property', () => {
      const positionLegacyUnit = createLegacyPositionUnit({ position: 100 });
      expect(adapter.canAdapt(positionLegacyUnit)).toBe(true);
    });

    it('should be able to adapt units with x property', () => {
      const xLegacyUnit = createLegacyPositionUnit({ x: 100 });
      expect(adapter.canAdapt(xLegacyUnit)).toBe(true);
    });

    it('should be able to adapt units with y property', () => {
      const yLegacyUnit = createLegacyPositionUnit({ y: 100 });
      expect(adapter.canAdapt(yLegacyUnit)).toBe(true);
    });

    it('should be able to adapt units with default position properties', () => {
      const defaultLegacyUnit = createLegacyPositionUnit({});
      expect(adapter.canAdapt(defaultLegacyUnit)).toBe(true); // Factory provides x: 0, y: 0 by default
    });
  });

  describe('getLegacyTypeName', () => {
    it('should return the legacy type name', () => {
      expect(adapter.getLegacyTypeName()).toBe('LegacyPositionUnit');
    });
  });

  describe('getConversionFactor', () => {
    it('should return the conversion factor', () => {
      expect(adapter.getConversionFactor()).toBe(1); // Default conversion factor
    });
  });

  describe('isBidirectional', () => {
    it('should return bidirectional status', () => {
      expect(adapter.isBidirectional()).toBe(false); // Default is not bidirectional
    });
  });

  describe('validate', () => {
    it('should validate with valid context', () => {
      expect(adapter.validate(mockContext)).toBe(true);
    });

    it('should validate with null context', () => {
      expect(adapter.validate(null as any)).toBe(true); // Adapter validates the adapted unit, not context
    });

    it('should validate with undefined context', () => {
      expect(adapter.validate(undefined as any)).toBe(true); // Adapter validates the adapted unit, not context
    });
  });

  describe('toString', () => {
    it('should return string representation', () => {
      const result = adapter.toString();
      expect(result).toContain('LegacyPositionUnitAdapter');
      expect(result).toContain('adapter-1');
    });
  });

  describe('clone', () => {
    it('should clone the adapter', () => {
      const cloned = adapter.clone();
      expect(cloned).not.toBe(adapter);
      expect(cloned.id).toBe(adapter.id);
      expect(cloned.name).toBe(adapter.name);
      expect(cloned.unitType).toBe(adapter.unitType);
    });

    it('should clone with overrides', () => {
      const cloned = adapter.clone({ name: 'Cloned Adapter' });
      expect(cloned.name).toBe('Cloned Adapter');
      expect(cloned.id).toBe(adapter.id); // Should not be overridden
    });
  });

  describe('integration scenarios', () => {
    it('should handle complex legacy unit with all properties', () => {
      const complexLegacyUnit = createLegacyPositionUnit({
        position: 75,
        positionUnit: PositionUnit.PARENT_LEFT,
        axis: Dimension.X,
        metadata: {
          legacyType: 'complex-format',
          convertedAt: new Date().toISOString(),
          description: 'Complex legacy unit',
          additionalData: 'old-system',
        },
      });

      const complexAdapter = new LegacyPositionUnitAdapter(
        'complex-adapter',
        'Complex Adapter',
        complexLegacyUnit
      );

      expect(complexAdapter.id).toBe('complex-adapter');
      expect(complexAdapter.getLegacyTypeName()).toBe('LegacyPositionUnit');
      expect(complexAdapter.isResponsive()).toBe(true);
      expect(complexAdapter.canAdapt(complexLegacyUnit)).toBe(true);
    });

    it('should handle multiple adapters with different legacy units', () => {
      const adapter1 = new LegacyPositionUnitAdapter(
        'adapter-1',
        'Adapter 1',
        createLegacyPositionUnit({ position: 100, positionUnit: PositionUnit.PIXEL })
      );
      const adapter2 = new LegacyPositionUnitAdapter(
        'adapter-2',
        'Adapter 2',
        createLegacyPositionUnit({ position: 50, positionUnit: PositionUnit.PARENT_LEFT })
      );

      const result1 = adapter1.calculate(mockContext);
      const result2 = adapter2.calculate(mockContext);

      expect(result1).toBe(100);
      expect(result2).toBeGreaterThan(0); // Parent left conversion
      expect(adapter1.isResponsive()).toBe(false);
      expect(adapter2.isResponsive()).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should handle legacy unit without value', () => {
      const noValueLegacyUnit = createLegacyPositionUnit({
        position: undefined,
        x: undefined,
        y: undefined,
        baseValue: undefined,
      });
      const noValueAdapter = new LegacyPositionUnitAdapter(
        'no-value-adapter',
        'No Value Adapter',
        noValueLegacyUnit
      );

      const result = noValueAdapter.calculate(mockContext);
      expect(result).toBe(0); // Factory function provides default baseValue: 0 for position units
    });

    it('should handle legacy unit without unit', () => {
      const noUnitLegacyUnit = createLegacyPositionUnit({ position: 100 });
      const noUnitAdapter = new LegacyPositionUnitAdapter(
        'no-unit-adapter',
        'No Unit Adapter',
        noUnitLegacyUnit
      );

      const result = noUnitAdapter.calculate(mockContext);
      expect(result).toBe(100); // Should default to pixels
    });

    it('should handle invalid legacy unit type', () => {
      const invalidLegacyUnit = createLegacyPositionUnit({});
      expect(adapter.canAdapt(invalidLegacyUnit)).toBe(true); // Factory provides default position properties
    });
  });
});
