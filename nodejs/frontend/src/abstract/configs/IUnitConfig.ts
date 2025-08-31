import type { 
  SizeValue, 
  PositionValue, 
  ScaleValue,
  SizeUnit,
  PositionUnit,
  ScaleUnit,
  Dimension,
  UnitType,
  IRandomValueNumber
} from '../../unit'

/**
 * Unit Configuration Interface
 * Provides unit-aware configuration options for game objects
 * This integrates the new unit system with configuration management
 */
export interface IUnitConfig {
  // Unit type specification
  unitType: UnitType
  
  // Dimension specification
  dimension: Dimension
  
  // Size configuration with unit support
  size?: {
    width?: number | SizeValue | SizeUnit | IRandomValueNumber
    height?: number | SizeValue | SizeUnit | IRandomValueNumber
    minWidth?: number
    maxWidth?: number
    minHeight?: number
    maxHeight?: number
    maintainAspectRatio?: boolean
  }
  
  // Position configuration with unit support
  position?: {
    x?: number | PositionValue | PositionUnit | IRandomValueNumber
    y?: number | PositionValue | PositionUnit | IRandomValueNumber
    z?: number
    anchor?: {
      x: number
      y: number
    }
    offset?: {
      x: number
      y: number
    }
  }
  
  // Scale configuration with unit support
  scale?: {
    factor?: number | ScaleValue | ScaleUnit | IRandomValueNumber
    x?: number | ScaleValue | ScaleUnit | IRandomValueNumber
    y?: number | ScaleValue | ScaleUnit | IRandomValueNumber
    maintainAspectRatio?: boolean
    minScale?: number
    maxScale?: number
  }
  
  // Unit constraints and validation
  constraints?: {
    minValue?: number
    maxValue?: number
    respectParentBounds?: boolean
    snapToGrid?: boolean
    gridSize?: number
  }
  
  // Responsive behavior
  responsive?: {
    enabled: boolean
    breakpointAware: boolean
    orientationAware: boolean
    deviceAware: boolean
  }
  
  // Theme integration
  theme?: {
    classes?: string[]
    customProperties?: Record<string, string | number>
    inheritFromParent?: boolean
  }
}

/**
 * Unit Configuration Builder
 * Helper interface for building unit configurations
 */
export interface IUnitConfigBuilder {
  setUnitType(unitType: UnitType): IUnitConfigBuilder
  setDimension(dimension: Dimension): IUnitConfigBuilder
  setSize(size: IUnitConfig['size']): IUnitConfigBuilder
  setPosition(position: IUnitConfig['position']): IUnitConfigBuilder
  setScale(scale: IUnitConfig['scale']): IUnitConfigBuilder
  setConstraints(constraints: IUnitConfig['constraints']): IUnitConfigBuilder
  setResponsive(responsive: IUnitConfig['responsive']): IUnitConfigBuilder
  setTheme(theme: IUnitConfig['theme']): IUnitConfigBuilder
  build(): IUnitConfig
}

/**
 * Unit Configuration Preset
 * Predefined unit configurations for common use cases
 */
export interface IUnitConfigPreset {
  name: string
  description: string
  config: Partial<IUnitConfig>
  tags: string[]
}

/**
 * Unit Configuration Registry
 * Manages available unit configurations and presets
 */
export interface IUnitConfigRegistry {
  registerPreset(preset: IUnitConfigPreset): void
  getPreset(name: string): IUnitConfigPreset | undefined
  getAllPresets(): IUnitConfigPreset[]
  getPresetsByTag(tag: string): IUnitConfigPreset[]
  validateConfig(config: IUnitConfig): boolean
}
