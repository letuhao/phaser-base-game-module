import { logger } from './Logger'

/**
 * Asset type enum for categorizing different types of assets
 */
export enum AssetType {
  IMAGE = 'image',
  AUDIO = 'audio',
  SPRITE = 'sprite',
  FONT = 'font'
}

/**
 * Asset type metadata for additional information about each asset type
 */
export const ASSET_TYPE_METADATA: Record<AssetType, {
  name: string
  description: string
  extensions: string[]
  category: string
}> = {
  [AssetType.IMAGE]: {
    name: 'Image',
    description: 'Static image assets (PNG, JPG, WebP, etc.)',
    extensions: ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.svg'],
    category: 'visual'
  },
  [AssetType.AUDIO]: {
    name: 'Audio',
    description: 'Audio assets (MP3, WAV, OGG, etc.)',
    extensions: ['.mp3', '.wav', '.ogg', '.m4a', '.aac'],
    category: 'audio'
  },
  [AssetType.SPRITE]: {
    name: 'Sprite',
    description: 'Sprite sheet assets for animations',
    extensions: ['.png', '.json'],
    category: 'visual'
  },
  [AssetType.FONT]: {
    name: 'Font',
    description: 'Font assets (TTF, OTF, WOFF, etc.)',
    extensions: ['.ttf', '.otf', '.woff', '.woff2'],
    category: 'typography'
  }
}

/**
 * Utility functions for working with AssetType
 */
export namespace AssetTypeUtils {
  /**
   * Get all asset types
   */
  export function getAllTypes(): AssetType[] {
    return Object.values(AssetType)
  }
  
  /**
   * Check if a string is a valid asset type
   */
  export function isValid(type: string): type is AssetType {
    return Object.values(AssetType).includes(type as AssetType)
  }
  
  /**
   * Get asset type by extension
   */
  export function getTypeByExtension(extension: string): AssetType | null {
    const ext = extension.toLowerCase()
    
    for (const [type, metadata] of Object.entries(ASSET_TYPE_METADATA)) {
      if (metadata.extensions.includes(ext)) {
        return type as AssetType
      }
    }
    
    return null
  }
  
  /**
   * Get metadata for an asset type
   */
  export function getMetadata(type: AssetType) {
    return ASSET_TYPE_METADATA[type]
  }
  
  /**
   * Get asset types by category
   */
  export function getTypesByCategory(category: string): AssetType[] {
    return Object.entries(ASSET_TYPE_METADATA)
      .filter(([_, metadata]) => metadata.category === category)
      .map(([type, _]) => type as AssetType)
  }
}

/**
 * Generic asset interface for asset loading
 */
export interface AssetConfig {
  key: string
  path: string
  type: AssetType
  preload: boolean
}

/**
 * Generic asset loader configuration interface
 */
export interface AssetLoaderConfig {
  basePath: string
  backgrounds: {
    desktop: AssetConfig
    mobile: AssetConfig
    mobileOrigin: AssetConfig
  }
  loading: {
    preload: boolean
    priority: string[]
  }
  validation: {
    required: string[]
    optional: string[]
    fallbacks: Record<string, string>
  }
}

/**
 * Asset loader configuration loader for scenes
 * Loads and manages asset loading configurations
 */
export class AssetLoaderConfigLoader {
  private static instance: AssetLoaderConfigLoader
  private loadedConfigs: Map<string, AssetLoaderConfig> = new Map()
  
  private constructor() {
    // No default configs - scenes must register their own configs
  }
  
  /**
   * Get singleton instance
   */
  public static getInstance(): AssetLoaderConfigLoader {
    if (!AssetLoaderConfigLoader.instance) {
      AssetLoaderConfigLoader.instance = new AssetLoaderConfigLoader()
    }
    return AssetLoaderConfigLoader.instance
  }
  
  /**
   * Register an asset loader configuration for a scene
   */
  public registerConfig(sceneName: string, config: AssetLoaderConfig): void {
    this.loadedConfigs.set(sceneName, config)
    logger.info('AssetLoaderConfigLoader', 'registerConfig', 'registerConfig', 'Registered asset loader config for scene: ${sceneName}')
  }
  
  /**
   * Load asset loader configuration for a scene
   */
  public loadConfig(sceneName: string): AssetLoaderConfig | null {
    const config = this.loadedConfigs.get(sceneName)
    
    if (!config) {
      logger.warn('AssetLoaderConfigLoader', 'loadConfig', 'loadConfig', 'No asset loader config found for scene: ${sceneName}')
      return null
    }
    
    logger.info('AssetLoaderConfigLoader', 'loadConfig', 'loadConfig', 'Loaded asset loader config for scene: ${sceneName}')
    return config
  }
  
  /**
   * Check if a scene has an asset loader configuration
   */
  public hasConfig(sceneName: string): boolean {
    return this.loadedConfigs.has(sceneName)
  }
  
  /**
   * Get available scene configurations
   */
  public getAvailableConfigs(): string[] {
    return Array.from(this.loadedConfigs.keys())
  }
  
  /**
   * Get background asset based on device type
   */
  public getBackgroundAsset(sceneName: string, isDesktop: boolean): AssetConfig | null {
    const config = this.loadedConfigs.get(sceneName)
    if (!config) return null
    
    const asset = isDesktop ? config.backgrounds.desktop : config.backgrounds.mobile
    return asset || null
  }
  
  /**
   * Get background asset path based on device type
   */
  public getBackgroundAssetPath(sceneName: string, isDesktop: boolean): string | null {
    const asset = this.getBackgroundAsset(sceneName, isDesktop)
    return asset ? asset.path : null
  }
  
  /**
   * Get asset path by key
   */
  public getAssetPath(sceneName: string, key: string): string | null {
    const config = this.loadedConfigs.get(sceneName)
    if (!config) return null
    
    // Search through all assets to find the key
    const allAssets = [
      config.backgrounds.desktop,
      config.backgrounds.mobile,
      config.backgrounds.mobileOrigin
    ]
    
    const asset = allAssets.find(a => a.key === key)
    return asset ? asset.path : null
  }
  
  /**
   * Check if an asset is required
   */
  public isAssetRequired(sceneName: string, key: string): boolean {
    const config = this.loadedConfigs.get(sceneName)
    if (!config) return false
    
    return config.validation.required.includes(key)
  }
  
  /**
   * Get asset fallback path
   */
  public getAssetFallback(sceneName: string, key: string): string | null {
    const config = this.loadedConfigs.get(sceneName)
    if (!config) return null
    
    return config.validation.fallbacks[key] || null
  }
  
  /**
   * Get all assets of a specific type for a scene
   */
  public getAssetsByType(sceneName: string, assetType: AssetType): AssetConfig[] {
    const config = this.loadedConfigs.get(sceneName)
    if (!config) return []
    
    const allAssets = [
      config.backgrounds.desktop,
      config.backgrounds.mobile,
      config.backgrounds.mobileOrigin
    ]
    
    return allAssets.filter(asset => asset.type === assetType)
  }
  
  /**
   * Get all assets that need to be preloaded for a scene
   */
  public getPreloadAssets(sceneName: string): AssetConfig[] {
    const config = this.loadedConfigs.get(sceneName)
    if (!config) return []
    
    const allAssets = [
      config.backgrounds.desktop,
      config.backgrounds.mobile,
      config.backgrounds.mobileOrigin
    ]
    
    return allAssets.filter(asset => asset.preload)
  }
  
  /**
   * Validate asset configuration structure
   */
  public validateAssetConfig(sceneName: string): {
    isValid: boolean
    errors: string[]
    warnings: string[]
  } {
    const config = this.loadedConfigs.get(sceneName)
    const errors: string[] = []
    const warnings: string[] = []
    
    if (!config) {
      errors.push(`No asset config found for scene: ${sceneName}`)
      return { isValid: false, errors, warnings }
    }
    
    // Validate backgrounds
    if (!config.backgrounds.desktop) {
      errors.push('Missing desktop background asset')
    }
    if (!config.backgrounds.mobile) {
      errors.push('Missing mobile background asset')
    }
    if (!config.backgrounds.mobileOrigin) {
      warnings.push('Missing mobile origin background asset')
    }
    
    // Validate asset types
    const allAssets = [
      config.backgrounds.desktop,
      config.backgrounds.mobile,
      config.backgrounds.mobileOrigin
    ].filter(Boolean)
    
    allAssets.forEach(asset => {
      if (!Object.values(AssetType).includes(asset.type)) {
        errors.push(`Invalid asset type '${asset.type}' for asset '${asset.key}'`)
      }
      if (!asset.path) {
        errors.push(`Missing path for asset '${asset.key}'`)
      }
      if (!asset.key) {
        errors.push(`Missing key for asset`)
      }
    })
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    }
  }
  
  /**
   * Get asset statistics for a scene
   */
  public getAssetStats(sceneName: string): {
    totalAssets: number
    byType: Record<AssetType, number>
    preloadCount: number
  } | null {
    const config = this.loadedConfigs.get(sceneName)
    if (!config) return null
    
    const allAssets = [
      config.backgrounds.desktop,
      config.backgrounds.mobile,
      config.backgrounds.mobileOrigin
    ].filter(Boolean)
    
    const byType: Record<AssetType, number> = {
      [AssetType.IMAGE]: 0,
      [AssetType.AUDIO]: 0,
      [AssetType.SPRITE]: 0,
      [AssetType.FONT]: 0
    }
    
    allAssets.forEach(asset => {
      byType[asset.type]++
    })
    
    const preloadCount = allAssets.filter(asset => asset.preload).length
    
    return {
      totalAssets: allAssets.length,
      byType,
      preloadCount
    }
  }
  
  /**
   * Check if a scene has assets of a specific type
   */
  public hasAssetType(sceneName: string, assetType: AssetType): boolean {
    const assets = this.getAssetsByType(sceneName, assetType)
    return assets.length > 0
  }
  
  /**
   * Get all unique asset keys for a scene
   */
  public getAllAssetKeys(sceneName: string): string[] {
    const config = this.loadedConfigs.get(sceneName)
    if (!config) return []
    
    const allAssets = [
      config.backgrounds.desktop,
      config.backgrounds.mobile,
      config.backgrounds.mobileOrigin
    ].filter(Boolean)
    
    return [...new Set(allAssets.map(asset => asset.key))]
  }
  
  /**
   * Get asset by key and type
   */
  public getAssetByKeyAndType(sceneName: string, key: string, assetType: AssetType): AssetConfig | null {
    const assets = this.getAssetsByType(sceneName, assetType)
    return assets.find(asset => asset.key === key) || null
  }
  
  /**
   * Get all assets for a scene
   * Note: Responsive behavior is now handled by the ResponsiveConfig system
   */
  public getAllAssets(sceneName: string): AssetConfig[] {
    const config = this.loadedConfigs.get(sceneName)
    if (!config) return []
    
    const allAssets = [
      config.backgrounds.desktop,
      config.backgrounds.mobile,
      config.backgrounds.mobileOrigin
    ].filter(Boolean)
    
    return allAssets
  }
}

export default AssetLoaderConfigLoader
