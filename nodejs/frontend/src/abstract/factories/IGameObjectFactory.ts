import * as Phaser from 'phaser';

/**
 * Abstract factory interface for creating game objects
 * Follows the Abstract Factory pattern for game object creation
 */
export interface IGameObjectFactory {
  /**
   * Create a game object based on configuration
   */
  createGameObject(config: any, scene: Phaser.Scene): Phaser.GameObjects.GameObject | null;

  /**
   * Check if this factory can create the specified object type
   */
  canCreate(objectType: string): boolean;

  /**
   * Get the object types this factory supports
   */
  getSupportedTypes(): string[];
}

/**
 * Base abstract factory class with common functionality
 */
export abstract class BaseGameObjectFactory implements IGameObjectFactory {
  protected supportedTypes: string[];

  constructor(supportedTypes: string[]) {
    this.supportedTypes = supportedTypes;
  }

  /**
   * Abstract method to create game objects - must be implemented by subclasses
   */
  abstract createGameObject(config: any, scene: Phaser.Scene): Phaser.GameObjects.GameObject | null;

  /**
   * Check if this factory can create the specified object type
   */
  canCreate(objectType: string): boolean {
    return this.supportedTypes.includes(objectType);
  }

  /**
   * Get the object types this factory supports
   */
  getSupportedTypes(): string[] {
    return this.supportedTypes;
  }

  /**
   * Common method to set basic properties on game objects
   */
  protected setCommonProperties(gameObject: Phaser.GameObjects.GameObject, config: any): void {
    // Set position if the object supports it
    if (config.x !== undefined && 'setPosition' in gameObject) {
      (gameObject as any).setPosition(config.x, config.y || 0);
    }

    // Set size if supported
    if (config.width && config.width !== 'fill') {
      if ('setSize' in gameObject) {
        (gameObject as any).setSize(config.width, config.height || config.width);
      }
    }

    // Set name for debugging
    gameObject.name = config.name || config.id;

    // Set alpha if specified
    if (config.alpha !== undefined && 'setAlpha' in gameObject) {
      (gameObject as any).setAlpha(config.alpha);
    }

    // Set visible if specified
    if (config.visible !== undefined && 'setVisible' in gameObject) {
      (gameObject as any).setVisible(config.visible);
    }
  }
}
