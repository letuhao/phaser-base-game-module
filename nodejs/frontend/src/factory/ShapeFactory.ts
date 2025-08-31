import * as Phaser from 'phaser';
import { BaseGameObjectFactory } from '../abstract/factories/IGameObjectFactory';
import { Logger } from '../core/Logger';

/**
 * Factory for creating shape game objects
 */
export class ShapeFactory extends BaseGameObjectFactory {
  private logger: Logger = Logger.getInstance();

  constructor() {
    super(['rectangle', 'circle', 'ellipse', 'triangle', 'polygon']);
    this.logger.debug('ShapeFactory', 'super', 'ShapeFactory initialized', {
      supportedTypes: this.getSupportedTypes(),
    });
  }

  /**
   * Create a shape game object from configuration
   */
  createGameObject(config: any, scene: Phaser.Scene): Phaser.GameObjects.GameObject | null {
    this.logger.debug('ShapeFactory', 'createGameObject', 'Creating shape game object', {
      objectId: config.id,
      objectType: config.type,
      config: {
        x: config.x,
        y: config.y,
        width: config.width,
        height: config.height,
        fillColor: config.fillColor,
        name: config.name,
      },
    });

    try {
      let shape: Phaser.GameObjects.GameObject | null = null;

      switch (config.type) {
        case 'rectangle':
          shape = this.createRectangle(scene, config);
          break;
        case 'circle':
          shape = this.createCircle(scene, config);
          break;
        case 'ellipse':
          shape = this.createEllipse(scene, config);
          break;
        case 'triangle':
          shape = this.createTriangle(scene, config);
          break;
        case 'polygon':
          shape = this.createPolygon(scene, config);
          break;
        default:
          this.logger.warn(
            'ShapeFactory',
            'createGameObject',
            'Unknown shape type: ${config.type}',
            {
              objectId: config.id,
              supportedTypes: this.getSupportedTypes(),
            }
          );
          return null;
      }

      if (shape) {
        // Set common properties
        this.setCommonProperties(shape, config);

        // Set name for debugging
        shape.name = config.name || config.id;

        this.logger.info('ShapeFactory', 'createGameObject', 'Shape created successfully', {
          objectId: config.id,
          shapeType: config.type,
          phaserObjectType: shape.constructor.name,
          shapeName: shape.name,
        });
      }

      return shape;
    } catch (error) {
      this.logger.error('ShapeFactory', 'createGameObject', 'Error creating shape: ${config.id}', {
        error: error instanceof Error ? error.message : String(error),
        objectId: config.id,
        objectType: config.type,
      });
      return null;
    }
  }

  /**
   * Create a rectangle shape
   */
  private createRectangle(scene: Phaser.Scene, config: any): Phaser.GameObjects.Rectangle {
    this.logger.debug('ShapeFactory', 'createRectangle', 'Creating rectangle shape', {
      objectId: config.id,
      dimensions: { width: config.width, height: config.height },
      fillColor: config.fillColor,
    });

    const rectangle = scene.add.rectangle(
      config.x || 0,
      config.y || 0,
      config.width || 100,
      config.height || 100,
      this.parseColor(config.fillColor || 0xffffff)
    );

    // Set origin to top-left for easier positioning
    rectangle.setOrigin(0, 0);

    // Set size if specified
    if (config.width && config.width !== 'fill') {
      rectangle.setSize(config.width, config.height || config.width);
    }

    return rectangle;
  }

  /**
   * Create a circle shape
   */
  private createCircle(scene: Phaser.Scene, config: any): Phaser.GameObjects.Shape {
    this.logger.debug('ShapeFactory', 'createCircle', 'Creating circle shape', {
      objectId: config.id,
      radius: config.radius || config.width / 2,
      fillColor: config.fillColor,
    });

    const radius = config.radius || (config.width || 100) / 2;
    const circle = scene.add.circle(
      config.x || 0,
      config.y || 0,
      radius,
      this.parseColor(config.fillColor || 0xffffff)
    );

    // Set origin to center for circles
    circle.setOrigin(0.5, 0.5);

    return circle;
  }

  /**
   * Create an ellipse shape
   */
  private createEllipse(scene: Phaser.Scene, config: any): Phaser.GameObjects.Shape {
    this.logger.debug('ShapeFactory', 'createEllipse', 'Creating ellipse shape', {
      objectId: config.id,
      dimensions: { width: config.width, height: config.height },
      fillColor: config.fillColor,
    });

    const ellipse = scene.add.ellipse(
      config.x || 0,
      config.y || 0,
      config.width || 100,
      config.height || 100,
      this.parseColor(config.fillColor || 0xffffff)
    );

    // Set origin to center for ellipses
    ellipse.setOrigin(0.5, 0.5);

    return ellipse;
  }

  /**
   * Create a triangle shape
   */
  private createTriangle(scene: Phaser.Scene, config: any): Phaser.GameObjects.Shape {
    this.logger.debug('ShapeFactory', 'createTriangle', 'Creating triangle shape', {
      objectId: config.id,
      dimensions: { width: config.width, height: config.height },
      fillColor: config.fillColor,
    });

    const width = config.width || 100;
    const height = config.height || 100;

    // Create a simple triangle
    const triangle = scene.add.triangle(
      config.x || 0,
      config.y || 0,
      0,
      -height / 2, // Top point
      -width / 2,
      height / 2, // Bottom left
      width / 2,
      height / 2, // Bottom right
      this.parseColor(config.fillColor || 0xffffff)
    );

    // Set origin to center for triangles
    triangle.setOrigin(0.5, 0.5);

    return triangle;
  }

  /**
   * Create a polygon shape
   */
  private createPolygon(scene: Phaser.Scene, config: any): Phaser.GameObjects.Shape {
    this.logger.debug('ShapeFactory', 'createPolygon', 'Creating polygon shape', {
      objectId: config.id,
      points: config.points,
      fillColor: config.fillColor,
    });

    // Default to a hexagon if no points specified
    const points =
      config.points || this.createHexagonPoints(config.width || 100, config.height || 100);

    const polygon = scene.add.polygon(
      config.x || 0,
      config.y || 0,
      points,
      this.parseColor(config.fillColor || 0xffffff)
    );

    // Set origin to center for polygons
    polygon.setOrigin(0.5, 0.5);

    return polygon;
  }

  /**
   * Create hexagon points for default polygon
   */
  private createHexagonPoints(width: number, height: number): number[] {
    const centerX = 0;
    const centerY = 0;
    const radiusX = width / 2;
    const radiusY = height / 2;

    const points: number[] = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = centerX + radiusX * Math.cos(angle);
      const y = centerY + radiusY * Math.sin(angle);
      points.push(x, y);
    }

    return points;
  }

  /**
   * Parse color value (supports hex strings, numbers, and named colors)
   */
  private parseColor(color: string | number): number {
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
    this.logger.warn('ShapeFactory', 'parseColor', 'Failed to parse color, using default', {
      color,
      defaultColor: 0xffffff,
    });

    return 0xffffff;
  }
}
