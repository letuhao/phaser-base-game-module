import { BaseScene } from '../abstract/base/BaseScene'
import { levis2025r3wheelLoggingConfig } from '../runtime/scene/levis2025r3wheel/levis2025r3wheel.logging.config'
import { levis2025r3wheelResponsiveConfig } from '../runtime/scene/levis2025r3wheel/levis2025r3wheel.responsive.config'
import { levis2025r3wheelSceneLoaderConfig } from '../runtime/scene/levis2025r3wheel/levis2025r3wheel.scene_loader.config'
import { levis2025r3wheelAssetLoaderConfig } from '../runtime/scene/levis2025r3wheel/levis2025r3wheel.asset_loader.config'

/**
 * Levis2025R3 Wheel Scene
 * A purely configuration-driven scene with no hardcoded drawing logic
 * All objects, behavior, and layout come from configuration files
 * Uses Factory Pattern for object creation
 * Inherits common functionality from BaseScene
 */
export class Levis2025R3WheelScene extends BaseScene {
  constructor() {
    super('Levis2025R3WheelScene')
  }
  
  /**
   * Register scene-specific configurations
   */
  protected registerSceneConfigs(): void {
    this.configManager.registerSceneConfigs(
      'levis2025r3wheel',
      levis2025r3wheelLoggingConfig,
      levis2025r3wheelResponsiveConfig,
      levis2025r3wheelSceneLoaderConfig,
      levis2025r3wheelAssetLoaderConfig
    )
  }
  
  /**
   * Get scene name for configuration loading
   */
  protected getSceneName(): string {
    return 'levis2025r3wheel'
  }
}

export default Levis2025R3WheelScene
