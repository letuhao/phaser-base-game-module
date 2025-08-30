import { logger } from './Logger'

/**
 * Generic game object interface for scene structure
 */
export interface GameObjectConfig {
  id: string
  type: 'container' | 'image' | 'text' | 'button' | 'background-container' | 'shape'
  name: string
  x: number | 'fill'
  y: number | 'fill'
  width: number | 'fill'
  height: number | 'fill'
  children: GameObjectConfig[]
  parentId?: string
}

/**
 * Generic scene configuration interface
 */
export interface SceneConfig {
  sceneId: string
  sceneName: string
  version: string
  backgroundColor: string
  gameObjects: GameObjectConfig[]
  assetLoading: {
    preload: boolean
    priority: string[]
  }
}

/**
 * Scene loader configuration loader for scenes
 * Loads and manages scene structure configurations
 */
export class SceneLoaderConfigLoader {
  private static instance: SceneLoaderConfigLoader
  private loadedConfigs: Map<string, SceneConfig> = new Map()
  
  private constructor() {
    // No default configs - scenes must register their own configs
  }
  
  /**
   * Get singleton instance
   */
  public static getInstance(): SceneLoaderConfigLoader {
    if (!SceneLoaderConfigLoader.instance) {
      SceneLoaderConfigLoader.instance = new SceneLoaderConfigLoader()
    }
    return SceneLoaderConfigLoader.instance
  }
  
  /**
   * Register a scene configuration
   */
  public registerConfig(sceneName: string, config: SceneConfig): void {
    this.loadedConfigs.set(sceneName, config)
    logger.info('SceneLoaderConfigLoader', `Registered scene config for: ${sceneName}`)
  }
  
  /**
   * Load scene configuration
   */
  public loadConfig(sceneName: string): SceneConfig | null {
    const config = this.loadedConfigs.get(sceneName)
    
    if (!config) {
      logger.warn('SceneLoaderConfigLoader', `No scene config found for: ${sceneName}`)
      return null
    }
    
    logger.info('SceneLoaderConfigLoader', `Loaded scene config for: ${sceneName}`)
    return config
  }
  
  /**
   * Check if a scene has a configuration
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
   * Find a specific game object by ID
   */
  public findGameObject(sceneName: string, objectId: string): GameObjectConfig | undefined {
    const config = this.loadedConfigs.get(sceneName)
    if (!config) return undefined
    
    return this.findGameObjectRecursive(config.gameObjects, objectId)
  }
  
  /**
   * Recursively search for a game object
   */
  private findGameObjectRecursive(objects: GameObjectConfig[], objectId: string): GameObjectConfig | undefined {
    for (const obj of objects) {
      if (obj.id === objectId) return obj
      
      if (obj.children.length > 0) {
        const found = this.findGameObjectRecursive(obj.children, objectId)
        if (found) return found
      }
    }
    return undefined
  }
  
  /**
   * Get all game objects in a scene
   */
  public getAllGameObjects(sceneName: string): GameObjectConfig[] {
    const config = this.loadedConfigs.get(sceneName)
    return config ? config.gameObjects : []
  }
}

export default SceneLoaderConfigLoader
