import * as Phaser from 'phaser';
import type { IShape } from '../../abstract/objects/IShape';
import type { IContainer } from '../../abstract/objects/IContainer';
import { Logger } from '../../core/Logger';
import type { IGameObject } from '../../abstract/base/IGameObject';
import { ScalableHelper } from './ScalableHelper';

/**
 * Rectangle shape class
 * Creates and manages rectangular shapes with fill and stroke support
 * Extends Phaser.GameObjects.Rectangle and implements IShape interface
 */
export class Rectangle extends Phaser.GameObjects.Rectangle implements IShape {
  readonly shapeType = 'rectangle';
  private _id: string;
  private _parent: IContainer | null;
  private logger: Logger = Logger.getInstance();
  private scalableHelper: ScalableHelper;
  
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
    super(scene, x, y, width, height, fillColor);
    
    this._id = id;
    this._parent = parent;
    this.name = id;
    
    // Initialize scalable helper for responsive behavior
    this.scalableHelper = new ScalableHelper(scene, id, parent);
    
    // Set initial properties
    this.setOrigin(0, 0); // Set origin to top-left for easier positioning
    
          this.logger.debug('Rectangle', 'Rectangle created', {
        id,
        dimensions: { width, height },
        fillColor,
        position: { x, y },
        depth: this.depth,
        visible: this.visible,
        active: this.active,
        alpha: this.alpha,
        scale: { x: this.scaleX, y: this.scaleY }
      }, 'constructor');
  }
  
  // ===== IShape IMPLEMENTATION =====
  
  get id(): string {
    return this._id;
  }
  
  get parent(): IContainer | null {
    return this._parent;
  }
  
  get phaserObject(): Phaser.GameObjects.Rectangle {
    return this;
  }
  
  get isActive(): boolean {
    return this.active;
  }
  
  get isVisible(): boolean {
    return this.visible;
  }
  
  get isInteractive(): boolean {
    return this.input?.enabled || false;
  }
  
  get isDestroyed(): boolean {
    return (this as any).destroyed || false;
  }
  
  get position(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }
  
  get size(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }
  
  get interactive(): boolean {
    return this.input?.enabled || false;
  }
  
  // Use Phaser's getBounds method directly
  getBounds(): any {
    return super.getBounds();
  }
  
  // ===== IShape REQUIRED PROPERTIES =====
  
  get dimensions(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }
  
  get strokeWidth(): number {
    return 0; // Phaser doesn't expose stroke width directly
  }
  
  // ===== IShape METHOD IMPLEMENTATIONS =====
  
  setFillColor(color: number): void {
    this.setFillStyle(color);
  }
  
  setStroke(color: number, width: number): void {
    this.setStrokeStyle(width, color);
  }
  
  removeStroke(): void {
    this.setStrokeStyle(0, 0x000000);
  }
  
  resize(width: number, height: number): void {
    this.logger.debug('Rectangle', 'Resizing rectangle', {
      id: this.id,
      oldDimensions: this.dimensions,
      newDimensions: { width, height }
    }, 'resize');
    
    // Set the new size
    this.setSize(width, height);
    
    // Handle responsive resize through the helper
    this.scalableHelper.handleResponsiveResize(width, height);
  }
  
  // ===== IGameObject METHOD IMPLEMENTATIONS =====
  
  show(): void {
    this.setVisible(true);
  }
  
  hide(): void {
    this.setVisible(false);
  }
  
  // Note: We don't override setPosition, setRotation, setAlpha, setInteractive, destroy
  // because Phaser's Rectangle already has these methods with the correct signatures
  
  // ===== ABSTRACT METHOD IMPLEMENTATIONS =====
  
  initialize(): void {
    this.logger.debug('Rectangle', 'Initializing rectangle', {
      id: this.id
    }, 'initialize');
    
    // Set initial state
    this.setActive(true);
    this.setVisible(true);
  }
  
  update(_time: number, _delta: number): void {
    // Rectangle doesn't need per-frame updates
    // Override in subclasses if needed
  }
  
  activate(): void {
    this.logger.debug('Rectangle', 'Activating rectangle', {
      id: this.id
    }, 'activate');
    
    this.setActive(true);
  }
  
  deactivate(): void {
    this.logger.debug('Rectangle', 'Deactivating rectangle', {
      id: this.id
    }, 'deactivate');
    
    this.setActive(false);
  }
  
  clone(): IGameObject {
    this.logger.debug('Rectangle', 'Cloning rectangle', {
      id: this.id
    }, 'clone');
    
    return new Rectangle(
      this.scene,
      `${this.id}_clone`,
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height,
      (this as any).fillColor || 0xffffff,
      this.parent
    );
  }
  
  // ===== RECTANGLE-SPECIFIC METHODS =====
  
  /**
   * Get the current corner radius
   */
  getCornerRadius(): number {
    return this.radius;
  }
  
  /**
   * Handle responsive resize from scene
   * This method is called by the scene's resize system
   */
  handleResponsiveResize(width: number, height: number): void {
    this.logger.debug('Rectangle', 'Handling responsive resize from scene', {
      id: this.id,
      newDimensions: { width, height },
      currentDimensions: this.dimensions
    }, 'handleResponsiveResize');
    
    // Use ScalableHelper to handle responsive behavior
    this.scalableHelper.handleResponsiveResize(width, height);
    
    // Apply the new size
    this.resize(width, height);
  }

  /**
   * Log the current state of the Rectangle for debugging
   */
  logCurrentState(methodName: string = 'logCurrentState'): void {
    this.logger.debug('Rectangle', 'Current Rectangle state', {
      id: this.id,
      dimensions: this.dimensions,
      position: this.position,
      depth: this.depth,
      visible: this.visible,
      active: this.active,
      alpha: this.alpha,
      scale: { x: this.scaleX, y: this.scaleY },
      fillColor: this.fillColor,
      strokeWidth: this.strokeWidth,
      parentId: this.parent?.id || 'none',
      sceneKey: this.scene.scene.key
    }, methodName);
  }
  
  // ===== STATIC FACTORY METHOD =====
  
  /**
   * Create a Rectangle instance from configuration
   */
  public static createFromConfig(config: any, scene: Phaser.Scene, parent?: IContainer): Rectangle {
    const logger = Logger.getInstance();
          logger.debug('Rectangle', 'createFromConfig called', {
        objectId: config.id,
        config: config,
        sceneKey: scene.scene.key,
        hasParent: !!parent,
        parentInfo: parent ? {
          id: parent.id,
          type: parent.constructor.name,
          bounds: parent.getContainerBounds()
        } : null
      }, 'createFromConfig');
    
    try {
      // Use ScalableHelper to resolve "fill" dimensions
      const scalableHelper = new ScalableHelper(scene, config.id, parent);
      const { width, height } = scalableHelper.resolveFillDimensions(config);
      
      logger.debug('Rectangle', 'Dimensions resolved using ScalableHelper', {
        objectId: config.id,
        finalDimensions: { width, height },
        hasParent: !!parent
      }, 'createFromConfig');
      
      const rectangle = new Rectangle(
        scene,
        config.id,
        config.x || 0,
        config.y || 0,
        width,
        height,
        config.fillColor || 0xffffff,
        parent || null
      );
      
      // Apply additional properties if specified
      if (config.properties) {
        // Set stroke if specified
        if (config.properties.strokeColor !== undefined && config.properties.strokeWidth !== undefined) {
          rectangle.setStroke(config.properties.strokeColor, config.properties.strokeWidth);
        }
        
        // Set interactive if specified
        if (config.properties.interactive !== undefined) {
          rectangle.setInteractive(config.properties.interactive);
        }
      }
      
      // Log final state after all properties are applied
      logger.debug('Rectangle', 'Final Rectangle state after property application', {
        objectId: config.id,
        finalDimensions: rectangle.dimensions,
        finalPosition: rectangle.position,
        finalDepth: rectangle.depth,
        finalVisible: rectangle.visible,
        finalActive: rectangle.active,
        finalAlpha: rectangle.alpha,
        finalScale: { x: rectangle.scaleX, y: rectangle.scaleY },
        fillColor: rectangle.fillColor,
        strokeWidth: rectangle.strokeWidth
      }, 'createFromConfig');
      
      // Log the complete state using the instance method
      rectangle.logCurrentState('createFromConfig');
      
      logger.debug('Rectangle', 'Rectangle created successfully from config', {
        objectId: config.id,
        finalDimensions: rectangle.dimensions,
        hasStroke: rectangle.strokeWidth > 0,
        position: rectangle.position,
        depth: rectangle.depth,
        visible: rectangle.visible,
        active: rectangle.active,
        alpha: rectangle.alpha,
        scale: { x: rectangle.scaleX, y: rectangle.scaleY }
      }, 'createFromConfig');
      
      return rectangle;
      
    } catch (error) {
      logger.error('Rectangle', `Error in createFromConfig for ${config.id}:`, error);
      throw error;
    }
  }
}
