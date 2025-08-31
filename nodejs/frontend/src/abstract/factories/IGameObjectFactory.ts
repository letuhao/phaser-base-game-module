import * as Phaser from 'phaser';
import type { IFactoryInput } from '../../factory/interfaces/IFactoryInput';

/**
 * Abstract factory interface for creating game objects
 * Follows the Abstract Factory pattern for game object creation
 */
export interface IGameObjectFactory {
  /**
   * Create a game object based on configuration
   */
  createGameObject(input: IFactoryInput): Phaser.GameObjects.GameObject | null;

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
  abstract createGameObject(input: IFactoryInput): Phaser.GameObjects.GameObject | null;

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
  protected setCommonProperties(gameObject: Phaser.GameObjects.GameObject, input: IFactoryInput): void {
    const config = input.config;
    
    // Set position if the object supports it
    if ('x' in config && config.x !== undefined && 'setPosition' in gameObject) {
      (gameObject as any).setPosition(config.x, ('y' in config ? config.y : 0) || 0);
    }

    // Set size if supported
    if ('width' in config && config.width && config.width !== 'fill') {
      if ('setSize' in gameObject) {
        const height = ('height' in config ? config.height : config.width) || config.width;
        (gameObject as any).setSize(config.width, height);
      }
    }

    // Set name for debugging
    gameObject.name = ('name' in config ? config.name : undefined) || config.id;

    // Set alpha if specified
    if ('alpha' in config && config.alpha !== undefined && 'setAlpha' in gameObject) {
      (gameObject as any).setAlpha(config.alpha);
    }

    // Set visible if specified
    if ('visible' in config && config.visible !== undefined && 'setVisible' in gameObject) {
      (gameObject as any).setVisible(config.visible);
    }
  }
}
