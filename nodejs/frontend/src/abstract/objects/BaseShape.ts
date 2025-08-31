import * as Phaser from 'phaser';
import type { IShape } from './IShape';
import type { IContainer } from './IContainer';
import { Logger } from '../../core/Logger';
import type { IGameObject } from '../base/IGameObject';
import type { CommonIStyleProperties } from '../configs/IStyleProperties';


// Interface for Phaser objects that support positioning and sizing
interface IPositionablePhaserObject extends Phaser.GameObjects.GameObject {
  x: number;
  y: number;
  setPosition(x: number, y: number): this;
  setSize(width: number, height: number): this;
  setActive(active: boolean): this;
  setVisible(visible: boolean): this;
  setInteractive(): this;
  disableInteractive(): this;
  destroy(): void;
}

/**
 * Abstract base class for shape game objects
 * Provides common functionality for all shapes
 */
export abstract class BaseShape implements IShape {
  // ===== IGameObject IMPLEMENTATION =====
  
  /** Unique identifier */
  readonly id: string;
  
  /** Display name */
  readonly name: string;
  
  /** Parent container */
  readonly parent: IContainer | null;
  
  /** Phaser game object */
  readonly phaserObject: IPositionablePhaserObject;
  
  /** Responsive layout properties for this object (IGameObject requirement) */
  layoutProperties: CommonIStyleProperties = {
    maintainAspectRatio: false,
    scaleStrategy: 'fit',
    alignment: 'center'
  };
  
  /** Whether the object is active */
  readonly isActive: boolean;
  
  /** Whether the object is visible */
  readonly isVisible: boolean;
  
  /** Whether the object is interactive */
  readonly isInteractive: boolean;
  
  /** Whether the object is destroyed */
  readonly isDestroyed: boolean = false;
  
  /** The scene this game object belongs to */
  readonly scene: Phaser.Scene;
  
  /** Position of the game object in world coordinates */
  readonly position: { x: number; y: number };
  
  /** Size of the game object */
  readonly size: { width: number; height: number };
  
  /** Scale of the game object */
  readonly scale: { x: number; y: number } = { x: 1, y: 1 };
  
  /** Rotation of the game object in radians */
  readonly rotation: number = 0;
  
  /** Alpha/transparency of the game object (0-1) */
  readonly alpha: number = 1;
  
  /** Whether the game object is visible */
  readonly visible: boolean = true;
  
  /** Whether the game object is active */
  readonly active: boolean = true;
  
  /** Whether the game object is interactive */
  readonly interactive: boolean = false;
  
  /** Input handler */
  readonly input: any = null;
  
  /** Physics body */
  readonly body: any = null;
  
  /** Bounds of the game object */
  readonly bounds: any = null;
  
  /** Logger instance */
  protected logger: Logger = Logger.getInstance();
  
  // ===== IGameObject ABSTRACT METHODS =====
  
  abstract initialize(): void;
  abstract update(time: number, delta: number): void;
  abstract activate(): void;
  abstract deactivate(): void;
  abstract clone(): IGameObject;
  
  // Additional IGameObject methods
  show(): void {
    this.setVisible(true);
  }
  
  hide(): void {
    this.setVisible(false);
  }
  
  /** Get the size of this game object */
  getSize(): { width: number; height: number } {
    return this.size;
  }
  
  /** Get the position of this game object */
  getPosition(): { x: number; y: number } {
    return this.position;
  }
  
  setRotation(rotation: number): void {
    this.logger.debug('BaseShape', 'Setting rotation', {
      id: this.id,
      rotation
    }, 'setRotation');
    
    if (this.phaserObject && 'setRotation' in this.phaserObject) {
      (this.phaserObject as any).setRotation(rotation);
    }
  }
  
  setAlpha(alpha: number): void {
    this.logger.debug('BaseShape', 'Setting alpha', {
      id: this.id,
      alpha
    }, 'setAlpha');
    
    if (this.phaserObject && 'setAlpha' in this.phaserObject) {
      (this.phaserObject as any).setAlpha(alpha);
    }
  }
  
  // ===== IShape IMPLEMENTATION =====
  
  /** Shape type */
  abstract readonly shapeType: 'rectangle' | 'circle' | 'ellipse' | 'triangle' | 'polygon';
  
  /** Shape dimensions */
  protected _dimensions: { width: number; height: number };
  
  /** Fill color */
  protected _fillColor: number;
  
  /** Stroke color */
  protected _strokeColor: number | null = null;
  
  /** Stroke width */
  protected _strokeWidth: number = 0;
  
  constructor(
    scene: Phaser.Scene,
    id: string,
    x: number = 0,
    y: number = 0,
    width: number = 100,
    height: number = 100,
    fillColor: number = 0xffffff,
    parent: IContainer | null = null
  ) {
    this.id = id;
    this.name = id;
    this.parent = parent;
    this.scene = scene;
    this.position = { x, y };
    this.size = { width, height };
    this._dimensions = { width, height };
    this._fillColor = fillColor;
    
    // Create the Phaser shape object
    this.phaserObject = this.createPhaserShape(scene, x, y, width, height, fillColor);
    
    // Set initial properties
    this.phaserObject.name = id;
    if (this.isPositionable(this.phaserObject)) {
      this.phaserObject.setPosition(x, y);
    }
    
    // Set default states
    this.isActive = true;
    this.isVisible = true;
    this.isInteractive = false;
    
    this.logger.debug('BaseShape', 'Base shape created', {
      id,
      dimensions: this._dimensions,
      fillColor: this._fillColor,
      position: { x, y }
    }, 'constructor');
  }
  
  // ===== ABSTRACT METHODS =====
  
  /**
   * Create the specific Phaser shape object
   * Must be implemented by concrete shape classes
   */
  protected abstract createPhaserShape(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    fillColor: number
  ): IPositionablePhaserObject;
  
  /**
   * Type guard to check if a Phaser object supports positioning
   */
  protected isPositionable(obj: Phaser.GameObjects.GameObject): obj is IPositionablePhaserObject {
    return 'setPosition' in obj && 'x' in obj && 'y' in obj;
  }
  
  /**
   * Update the shape's visual representation
   * Must be implemented by concrete shape classes
   */
  protected abstract updateShapeVisuals(): void;
  
  // ===== IShape IMPLEMENTATION =====
  
  get dimensions(): { width: number; height: number } {
    return { ...this._dimensions };
  }
  
  get fillColor(): number {
    return this._fillColor;
  }
  
  get strokeColor(): number | null {
    return this._strokeColor;
  }
  
  get strokeWidth(): number {
    return this._strokeWidth;
  }
  
  setFillColor(color: number): void {
    this.logger.debug('BaseShape', 'Setting fill color', {
      id: this.id,
      oldColor: this._fillColor,
      newColor: color
    }, 'setFillColor');
    
    this._fillColor = color;
    this.updateShapeVisuals();
  }
  
  setStroke(color: number, width: number): void {
    this.logger.debug('BaseShape', 'Setting stroke', {
      id: this.id,
      color,
      width
    }, 'setStroke');
    
    this._strokeColor = color;
    this._strokeWidth = width;
    this.updateShapeVisuals();
  }
  
  removeStroke(): void {
    this.logger.debug('BaseShape', 'Removing stroke', {
      id: this.id
    }, 'removeStroke');
    
    this._strokeColor = null;
    this._strokeWidth = 0;
    this.updateShapeVisuals();
  }
  
  resize(width: number, height: number): void {
    this.logger.debug('BaseShape', 'Resizing shape', {
      id: this.id,
      oldDimensions: this._dimensions,
      newDimensions: { width, height }
    }, 'resize');
    
    this._dimensions = { width, height };
    
    // Update Phaser object size
    if (this.phaserObject && 'setSize' in this.phaserObject) {
      this.phaserObject.setSize(width, height);
    }
    
    this.updateShapeVisuals();
  }
  
  getBounds(): { x: number; y: number; width: number; height: number } {
    return {
      x: 'x' in this.phaserObject ? (this.phaserObject as any).x : 0,
      y: 'y' in this.phaserObject ? (this.phaserObject as any).y : 0,
      width: this._dimensions.width,
      height: this._dimensions.height
    };
  }
  
  // ===== IGameObject IMPLEMENTATION =====
  
  destroy(): void {
    this.logger.debug('BaseShape', 'Destroying shape', {
      id: this.id
    }, 'destroy');
    
    if (this.phaserObject) {
      this.phaserObject.destroy();
    }
  }
  
  setActive(active: boolean): void {
    this.logger.debug('BaseShape', 'Setting active state', {
      id: this.id,
      active
    }, 'setActive');
    
    if (this.phaserObject && 'setActive' in this.phaserObject) {
      this.phaserObject.setActive(active);
    }
  }
  
  setVisible(visible: boolean): void {
    this.logger.debug('BaseShape', 'Setting visible state', {
      id: this.id,
      visible
    }, 'setVisible');
    
    if (this.phaserObject && 'setVisible' in this.phaserObject) {
      this.phaserObject.setVisible(visible);
    }
  }
  
  setInteractive(interactive: boolean): void {
    this.logger.debug('BaseShape', 'Setting interactive state', {
      id: this.id,
      interactive
    }, 'setInteractive');
    
    if (this.phaserObject) {
      if (interactive) {
        this.phaserObject.setInteractive();
      } else {
        this.phaserObject.disableInteractive();
      }
    }
  }
  
  setPosition(x: number, y: number): void {
    this.logger.debug('BaseShape', 'Setting position', {
      id: this.id,
      position: { x, y }
    }, 'setPosition');
    
    if (this.phaserObject && 'setPosition' in this.phaserObject) {
      this.phaserObject.setPosition(x, y);
    }
  }
  
  setSize(width: number, height: number): void {
    this.resize(width, height);
  }
  
  // ===== UTILITY METHODS =====
  
  /**
   * Parse color value (supports hex strings, numbers, and named colors)
   */
  protected parseColor(color: string | number): number {
    if (typeof color === 'number') {
      return color;
    }
    
    if (typeof color === 'string') {
      if (color.startsWith('#')) {
        return parseInt(color.slice(1), 16);
      }
      
      if (color.startsWith('0x')) {
        return parseInt(color, 16);
      }
      
      // Try to parse as hex
      const hexMatch = color.match(/^([0-9a-fA-F]{6})$/i);
      if (hexMatch) {
        return parseInt(hexMatch[1], 16);
      }
    }
    
    // Default to white if parsing fails
    this.logger.warn('BaseShape', 'Failed to parse color, using default', {
      id: this.id,
      color,
      defaultColor: 0xffffff
    }, 'parseColor');
    
    return 0xffffff;
  }
}
