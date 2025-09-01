import type { GameObjects, Scene, Game } from 'phaser';
import type { UnitContext } from './IUnit';
import { DEFAULT_FALLBACK_VALUES } from '../constants';

/**
 * Phaser-specific unit context interface
 * Provides type-safe access to Phaser game objects and properties
 */
export interface IPhaserUnitContext extends UnitContext {
  /**
   * Phaser Scene instance
   */
  phaserScene: Scene;
  
  /**
   * Phaser Game instance
   */
  game: Game;
  
  /**
   * Current Phaser GameObject (the one being positioned/sized)
   */
  currentObject: GameObjects.GameObject;
  
  /**
   * Parent Phaser GameObject (container)
   */
  phaserParent?: GameObjects.GameObject;
  
  /**
   * Target Phaser GameObject (for relative positioning)
   */
  target?: GameObjects.GameObject;
  
  /**
   * Phaser camera information
   */
  camera?: {
    x: number;
    y: number;
    width: number;
    height: number;
    zoom: number;
  };
  
  /**
   * Phaser input information
   */
  input?: {
    x: number;
    y: number;
    isDown: boolean;
  };
  
  /**
   * Phaser time information
   */
  time?: {
    now: number;
    delta: number;
    elapsed: number;
  };
  
  /**
   * Phaser physics information
   */
  physics?: {
    gravity: { x: number; y: number };
    bounds: { x: number; y: number; width: number; height: number };
  };
}

/**
 * Base Phaser Unit Context implementation
 * Provides default values and type safety
 */
export class PhaserUnitContext implements IPhaserUnitContext {
  constructor(
    public readonly phaserScene: Scene,
    public readonly game: Game,
    public readonly currentObject: GameObjects.GameObject,
    public readonly phaserParent?: GameObjects.GameObject,
    public readonly target?: GameObjects.GameObject
  ) {}

  // Implement UnitContext properties with Phaser defaults
  get scene() {
    return {
      width: this.phaserScene.scale.width,
      height: this.phaserScene.scale.height
    };
  }

  get parent() {
    if (this.phaserParent && 'width' in this.phaserParent && 'height' in this.phaserParent) {
      const parent = this.phaserParent as {
        width: number;
        height: number;
        x?: number;
        y?: number;
      };
      return {
        width: parent.width,
        height: parent.height,
        x: parent.x || 0,
        y: parent.y || 0
      };
    }
    return undefined;
  }

  get viewport() {
    return {
      width: this.game.scale.width,
      height: this.game.scale.height
    };
  }

  get breakpoint() {
    const width = this.game.scale.width;
    if (width < 768) return { name: 'mobile', width, height: this.game.scale.height };
    if (width < 1024) return { name: 'tablet', width, height: this.game.scale.height };
    return { name: 'desktop', width, height: this.game.scale.height };
  }

  get content() {
    if (this.currentObject && 'width' in this.currentObject && 'height' in this.currentObject) {
      const obj = this.currentObject as {
        width: number;
        height: number;
      };
      return {
        width: obj.width,
        height: obj.height
      };
    }
    return { width: DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT, height: DEFAULT_FALLBACK_VALUES.SIZE.DEFAULT };
  }

  // Enhanced properties for your Container system
  get container() {
    if (this.currentObject && 'containerType' in this.currentObject) {
      const obj = this.currentObject as {
        containerType: string;
        childCount?: number;
        hasChildren?: boolean;
        spacing?: {
          gap: number;
          padding: { left: number; right: number; top: number; bottom: number };
        };
      };
      return {
        type: obj.containerType,
        childCount: obj.childCount || 0,
        hasChildren: obj.hasChildren || false,
        spacing: obj.spacing || { gap: 0, padding: { left: 0, right: 0, top: 0, bottom: 0 } }
      };
    }
    return undefined;
  }

  get style() {
    if (this.currentObject && 'getStyle' in this.currentObject) {
      const obj = this.currentObject as {
        getStyle(): unknown;
      };
      return obj.getStyle();
    }
    return undefined;
  }

  get layout() {
    if (this.currentObject && 'layoutProperties' in this.currentObject) {
      const obj = this.currentObject as {
        layoutProperties: unknown;
      };
      return obj.layoutProperties;
    }
    return undefined;
  }

  // Custom context data
  [key: string]: unknown;
}

/**
 * Factory for creating Phaser unit contexts
 */
export class PhaserUnitContextFactory {
  /**
   * Create context from a Phaser GameObject
   */
  static fromGameObject(gameObject: GameObjects.GameObject): PhaserUnitContext {
    return new PhaserUnitContext(
      gameObject.scene,
      gameObject.scene.game,
      gameObject
    );
  }

  /**
   * Create context with parent relationship
   */
  static withParent(gameObject: GameObjects.GameObject, parent: GameObjects.GameObject): PhaserUnitContext {
    return new PhaserUnitContext(
      gameObject.scene,
      gameObject.scene.game,
      gameObject,
      parent
    );
  }

  /**
   * Create context with target for relative positioning
   */
  static withTarget(gameObject: GameObjects.GameObject, target: GameObjects.GameObject): PhaserUnitContext {
    return new PhaserUnitContext(
      gameObject.scene,
      gameObject.scene.game,
      gameObject,
      undefined,
      target
    );
  }

  /**
   * Create context with all relationships
   */
  static withRelationships(
    gameObject: GameObjects.GameObject,
    parent?: GameObjects.GameObject,
    target?: GameObjects.GameObject
  ): PhaserUnitContext {
    return new PhaserUnitContext(
      gameObject.scene,
      gameObject.scene.game,
      gameObject,
      parent,
      target
    );
  }

  /**
   * Create context specifically for your Container system
   * Provides enhanced access to Container-specific properties
   */
  static fromContainer(container: GameObjects.GameObject): PhaserUnitContext {
    return new PhaserUnitContext(
      container.scene,
      container.scene.game,
      container
    );
  }

  /**
   * Create context for Container with parent relationship
   * Perfect for nested container layouts
   */
  static fromContainerWithParent(container: GameObjects.GameObject, parent: GameObjects.GameObject): PhaserUnitContext {
    return new PhaserUnitContext(
      container.scene,
      container.scene.game,
      container,
      parent
    );
  }

  /**
   * Create context for Container with style information
   * Integrates with your existing style system
   */
  static fromContainerWithStyle(container: GameObjects.GameObject, styleOverrides?: Record<string, unknown>): PhaserUnitContext {
    const context = new PhaserUnitContext(
      container.scene,
      container.scene.game,
      container
    );

    // Add style overrides to context
    if (styleOverrides) {
      Object.assign(context, { styleOverrides });
    }

    return context;
  }
}
