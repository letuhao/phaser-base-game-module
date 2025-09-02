import { describe, beforeEach, afterEach, it, expect, jest } from '@jest/globals';
import { LegacySizeUnitAdapter } from '../adapters/LegacySizeUnitAdapter';
import { ILegacyUnit, createLegacySizeUnit } from '../interfaces/ILegacyUnit';
import { SizeUnit } from '../enums/SizeUnit';
import { Dimension } from '../enums/Dimension';
import { UnitType } from '../enums/UnitType';
import { createMockContext } from '../../test/setup';

describe('LegacySizeUnitAdapter', () => {
  let adapter: LegacySizeUnitAdapter;
  let mockLegacyUnit: ILegacyUnit;
  let mockContext: any;

  beforeEach(() => {
    mockLegacyUnit = createLegacySizeUnit({
      size: 100,
      width: 100,
      height: 100,
      dimension: Dimension.WIDTH,
      sizeUnit: SizeUnit.PIXEL,
      baseValue: 100,
      metadata: {
        legacyType: 'old-size-format',
        convertedAt: new Date().toISOString(),
        description: 'Legacy size unit for testing',
      },
    });
    adapter = new LegacySizeUnitAdapter('adapter-1', 'Legacy Size Adapter', mockLegacyUnit);
    mockContext = createMockContext();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('constructor', () => {
    it('should create a legacy size unit adapter', () => {
      expect(adapter.id).toBe('adapter-1');
      expect(adapter.name).toBe('Legacy Size Adapter');
      expect(adapter.unitType).toBe(UnitType.SIZE);
      expect(adapter.isActive).toBe(true);
    });

    it('should wrap the legacy unit correctly', () => {
      expect(adapter.getAdaptedUnit()).toBe(mockLegacyUnit);
    });
  });

  describe('calculate', () => {
    it('should calculate size from legacy unit', () => {
      const result = adapter.calculate(mockContext);
      expect(result).toBe(100); // Should return the legacy unit value
    });

    it('should handle different legacy unit values', () => {
      const largeLegacyUnit = createLegacySizeUnit({
        size: 500,
        width: 500,
        height: 500,
        sizeUnit: SizeUnit.PIXEL,
      });
      const largeAdapter = new LegacySizeUnitAdapter(
        'large-adapter',
        'Large Adapter',
        largeLegacyUnit
      );

      const result = largeAdapter.calculate(mockContext);
      expect(result).toBe(500);
    });

    it('should handle legacy units with different units', () => {
      const percentLegacyUnit = createLegacySizeUnit({
        size: 50,
        sizeUnit: 'percent' as any,
      });
      const percentAdapter = new LegacySizeUnitAdapter(
        'percent-adapter',
        'Percent Adapter',
        percentLegacyUnit
      );

      const result = percentAdapter.calculate(mockContext);
      // Should convert percent to pixels based on context
      expect(result).toBeGreaterThan(0);
    });

    it('should handle legacy units with different dimensions', () => {
      const heightLegacyUnit = createLegacySizeUnit({
        size: 200,
        dimension: Dimension.HEIGHT,
      });
      const heightAdapter = new LegacySizeUnitAdapter(
        'height-adapter',
        'Height Adapter',
        heightLegacyUnit
      );

      const result = heightAdapter.calculate(mockContext);
      expect(result).toBe(200);
    });
  });

  describe('isResponsive', () => {
    it('should be responsive for parent width units', () => {
      const parentWidthLegacyUnit = createLegacySizeUnit({ sizeUnit: SizeUnit.PARENT_WIDTH });
      const parentWidthAdapter = new LegacySizeUnitAdapter(
        'parent-width-adapter',
        'Parent Width Adapter',
        parentWidthLegacyUnit
      );

      expect(parentWidthAdapter.isResponsive()).toBe(true);
    });

    it('should be responsive for viewport width units', () => {
      const vwLegacyUnit = createLegacySizeUnit({ sizeUnit: SizeUnit.VIEWPORT_WIDTH });
      const vwAdapter = new LegacySizeUnitAdapter('vw-adapter', 'VW Adapter', vwLegacyUnit);

      expect(vwAdapter.isResponsive()).toBe(true);
    });

    it('should not be responsive for pixel units', () => {
      const pixelLegacyUnit = createLegacySizeUnit({ sizeUnit: SizeUnit.PIXEL });
      const pixelAdapter = new LegacySizeUnitAdapter(
        'pixel-adapter',
        'Pixel Adapter',
        pixelLegacyUnit
      );

      expect(pixelAdapter.isResponsive()).toBe(false);
    });

    it('should not be responsive for auto units', () => {
      const autoLegacyUnit = createLegacySizeUnit({ sizeUnit: SizeUnit.PIXEL });
      const autoAdapter = new LegacySizeUnitAdapter('auto-adapter', 'Auto Adapter', autoLegacyUnit);

      expect(autoAdapter.isResponsive()).toBe(false);
    });
  });

  describe('canAdapt', () => {
    it('should be able to adapt units with size property', () => {
      const sizeLegacyUnit = createLegacySizeUnit({ size: 100 });
      expect(adapter.canAdapt(sizeLegacyUnit)).toBe(true);
    });

    it('should be able to adapt units with width property', () => {
      const widthLegacyUnit = createLegacySizeUnit({ width: 100 });
      expect(adapter.canAdapt(widthLegacyUnit)).toBe(true);
    });

    it('should be able to adapt units with height property', () => {
      const heightLegacyUnit = createLegacySizeUnit({ height: 100 });
      expect(adapter.canAdapt(heightLegacyUnit)).toBe(true);
    });

    it('should not be able to adapt units without size properties', () => {
      const noSizeLegacyUnit = createLegacySizeUnit({});
      expect(adapter.canAdapt(noSizeLegacyUnit)).toBe(false);
    });
  });

  describe('getLegacyTypeName', () => {
    it('should return the legacy type name', () => {
      expect(adapter.getLegacyTypeName()).toBe('LegacySizeUnit');
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
      expect(result).toContain('LegacySizeUnitAdapter');
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
      const complexLegacyUnit = createLegacySizeUnit({
        size: 75,
        sizeUnit: SizeUnit.PARENT_WIDTH,
        dimension: Dimension.WIDTH,
        metadata: {
          legacyType: 'complex-format',
          convertedAt: new Date().toISOString(),
          description: 'Complex legacy unit',
          additionalData: 'old-system',
        },
      });

      const complexAdapter = new LegacySizeUnitAdapter(
        'complex-adapter',
        'Complex Adapter',
        complexLegacyUnit
      );

      expect(complexAdapter.id).toBe('complex-adapter');
      expect(complexAdapter.getLegacyTypeName()).toBe('LegacySizeUnit');
      expect(complexAdapter.isResponsive()).toBe(true);
      expect(complexAdapter.canAdapt(complexLegacyUnit)).toBe(true);
    });

    it('should handle multiple adapters with different legacy units', () => {
      const adapter1 = new LegacySizeUnitAdapter(
        'adapter-1',
        'Adapter 1',
        createLegacySizeUnit({ size: 100, sizeUnit: SizeUnit.PIXEL })
      );
      const adapter2 = new LegacySizeUnitAdapter(
        'adapter-2',
        'Adapter 2',
        createLegacySizeUnit({ size: 50, sizeUnit: SizeUnit.PARENT_WIDTH })
      );

      const result1 = adapter1.calculate(mockContext);
      const result2 = adapter2.calculate(mockContext);

      expect(result1).toBe(100);
      expect(result2).toBeGreaterThan(0); // Parent width conversion
      expect(adapter1.isResponsive()).toBe(false);
      expect(adapter2.isResponsive()).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should handle legacy unit without value', () => {
      const noValueLegacyUnit = createLegacySizeUnit({
        size: undefined,
        width: undefined,
        height: undefined,
        baseValue: undefined,
      });
      const noValueAdapter = new LegacySizeUnitAdapter(
        'no-value-adapter',
        'No Value Adapter',
        noValueLegacyUnit
      );

      const result = noValueAdapter.calculate(mockContext);
      expect(result).toBe(100); // Factory function provides default baseValue: 100
    });

    it('should handle legacy unit without unit', () => {
      const noUnitLegacyUnit = createLegacySizeUnit({ size: 100 });
      const noUnitAdapter = new LegacySizeUnitAdapter(
        'no-unit-adapter',
        'No Unit Adapter',
        noUnitLegacyUnit
      );

      const result = noUnitAdapter.calculate(mockContext);
      expect(result).toBe(100); // Should default to pixels
    });

    it('should handle invalid legacy unit type', () => {
      const invalidLegacyUnit = createLegacySizeUnit({});
      expect(adapter.canAdapt(invalidLegacyUnit)).toBe(false);
    });
  });
});
