import { ScalableGameObject } from '../../abstract/base/ScalableGameObject';
import type { IContainer } from '../../abstract/objects/IContainer';
import { Logger } from '../../core/Logger';

/**
 * ScalableHelper class
 * Provides responsive resize functionality for shapes that can't extend ScalableGameObject directly
 * (e.g., Rectangle extends Phaser.GameObjects.Rectangle)
 * 
 * This class acts as a composition helper, providing the same responsive behavior
 * without requiring inheritance from ScalableGameObject
 */
export class ScalableHelper {
  private scalableGameObject: ScalableGameObject;
  private logger: Logger = Logger.getInstance();

  constructor(
    private scene: any,
    private id: string,
    private parent: IContainer | null = null
  ) {
    // Create a minimal ScalableGameObject instance for responsive behavior
    this.scalableGameObject = new (class extends ScalableGameObject {
      readonly id = id;
      readonly parent = parent;
      readonly phaserObject = null;
      readonly isActive = true;
      readonly isVisible = true;
      readonly isInteractive = false;
      readonly children = [];
      readonly isDestroyed = false;
      readonly scene = scene;
      readonly position = { x: 0, y: 0 };
      readonly size = { width: 0, height: 0 };
      readonly scale = { x: 1, y: 1 };
      readonly rotation = 0;
      readonly alpha = 1;
      readonly visible = true;
      readonly active = true;
      readonly interactive = false;
      readonly input = null;
      readonly body = null;
      readonly bounds = null;

      initialize(): void {}
      update(): void {}
      activate(): void {}
      deactivate(): void {}
      destroy(): void {}
      setActive(): void {}
      setVisible(): void {}
      setInteractive(): void {}
      setPosition(): void {}
      setSize(): void {}
      setAlpha(): void {}
      setRotation(): void {}
      show(): void {}
      hide(): void {}
      clone(): any { return null; }

      getScale(): any { return { x: 1, y: 1 }; }
      setScale(): void {}
      getScaleX(): number { return 1; }
      getScaleY(): number { return 1; }
      setScaleX(): void {}
      setScaleY(): void {}
      setScaleXAndY(): void {}
      setUniformScale(): void {}
      scaleBy(): void {}
      scaleByXY(): void {}
      resetScale(): void {}
      getScaledBounds(): any { return null; }
      getScaledSize(): any { return { width: 0, height: 0 }; }
      isScaled(): boolean { return false; }
      hasUniformScale(): boolean { return true; }
      getScaleFactor(): number { return 1; }
      getScaleRatio(): number { return 1; }
      applyScale(): void {}
      normalizeScale(): void {}
      getScaleToFit(): any { return { x: 1, y: 1 }; }
      getScaleToFill(): any { return { x: 1, y: 1 }; }
      scaleToFit(): void {}
      scaleToFill(): void {}
      getScaleToFitX(): any { return 1; }
      getScaleToFitY(): any { return 1; }
      scaleToFitX(): void {}
      scaleToFitY(): void {}
      getScaleToFillX(): any { return 1; }
      getScaleToFillY(): any { return 1; }
      scaleToFillX(): void {}
      scaleToFillY(): void {}
      animateScale(): void {}
      animateScaleBy(): void {}
      getMinScale(): any { return { x: 0, y: 0 }; }
      getMaxScale(): any { return { x: 10, y: 10 }; }
      setMinScale(): void {}
      setMaxScale(): void {}
      clampScale(): any { return { x: 1, y: 1 }; }
      getScaleAnimation(): any { return null; }
      stopScaleAnimation(): void {}
      setScaleConstraints(): void {}
      isScaleValid(): boolean { return true; }
      getScaleConstraints(): any { return null; }
      clearScaleConstraints(): void {}
      hasScaleConstraints(): boolean { return false; }
      getScaleAnimationDuration(): number { return 0; }
      isScaleAnimating(): boolean { return false; }
      getScaleAnimationEase(): string { return 'linear'; }
      getScaleAnimationTarget(): any { return { x: 1, y: 1 }; }
      getScaleOrigin(): any { return { x: 0.5, y: 0.5 }; }
      setScaleOrigin(): void {}
      getScaleCenter(): any { return { x: 0, y: 0 }; }
      setScaleCenter(): void {}
      getScalePivot(): any { return { x: 0.5, y: 0.5 }; }
      setScalePivot(): void {}
      getScaleAnchor(): any { return { x: 0.5, y: 0.5 }; }
      setScaleAnchor(): void {}
      getScaleOffset(): any { return { x: 0, y: 0 }; }
      setScaleOffset(): void {}
      getScaleMode(): string { return 'normal'; }
      scaleAroundPoint(): void {}
      getScaleMatrix(): any { return null; }
      applyScaleMatrix(): void {}
      resize(): void {}

      protected onResponsiveBehaviorChanged(): void {}
      protected onResponsiveLayoutChanged(): void {}
    })();
  }

  /**
   * Handle responsive resize for the shape
   * This method should be called by the shape's resize method
   */
  handleResponsiveResize(width: number, height: number): void {
    this.logger.debug('ScalableHelper', 'Handling responsive resize for shape', {
      objectId: this.id,
      dimensions: { width, height },
      hasParent: !!this.parent
    }, 'handleResponsiveResize');

    // Delegate to the ScalableGameObject instance
    this.scalableGameObject['handleResponsiveResize'](width, height);
  }

  /**
   * Get current responsive behavior
   */
  getCurrentResponsiveBehavior(): any {
    return this.scalableGameObject['getCurrentResponsiveBehavior']();
  }

  /**
   * Check if current device is desktop
   */
  isDesktop(): boolean {
    return this.scalableGameObject['isDesktop']();
  }

  /**
   * Check if current device is mobile
   */
  isMobile(): boolean {
    return this.scalableGameObject['isMobile']();
  }

  /**
   * Get responsive breakpoints
   */
  getResponsiveBreakpoints(): any {
    return this.scalableGameObject['getResponsiveBreakpoints']();
  }

  /**
   * Update responsive breakpoints
   */
  updateResponsiveBreakpoints(breakpoints: { desktop: number; mobile: number }): void {
    this.scalableGameObject['updateResponsiveBreakpoints'](breakpoints);
  }

  /**
   * Resolve "fill" dimensions from parent container
   * This is the key method for handling responsive sizing
   */
  resolveFillDimensions(config: any): { width: number; height: number } {
    let width = config.width || 100;
    let height = config.height || 100;

    // Handle "fill" width
    if (typeof width === 'string' && width === 'fill') {
      if (this.parent && this.parent.getContainerBounds && typeof this.parent.getContainerBounds === 'function') {
        const parentBounds = this.parent.getContainerBounds();
        if (parentBounds && typeof parentBounds.width === 'number') {
          width = parentBounds.width;
          this.logger.debug('ScalableHelper', 'Resolved fill width from parent', {
            objectId: this.id,
            parentWidth: width
          }, 'resolveFillDimensions');
        } else {
          // Fallback to scene width if no parent size
          width = this.scene.game.config.width as number;
          this.logger.debug('ScalableHelper', 'Using scene width as fallback for fill', {
            objectId: this.id,
            sceneWidth: width
          }, 'resolveFillDimensions');
        }
      } else {
        // Fallback to scene width if no parent size
        width = this.scene.game.config.width as number;
        this.logger.debug('ScalableHelper', 'Using scene width as fallback for fill', {
          objectId: this.id,
          sceneWidth: width
        }, 'resolveFillDimensions');
      }
    }

    // Handle "fill" height
    if (typeof height === 'string' && height === 'fill') {
      if (this.parent && this.parent.getContainerBounds && typeof this.parent.getContainerBounds === 'function') {
        const parentBounds = this.parent.getContainerBounds();
        if (parentBounds && typeof parentBounds.height === 'number') {
          height = parentBounds.height;
          this.logger.debug('ScalableHelper', 'Resolved fill height from parent', {
            objectId: this.id,
            parentHeight: height
          }, 'resolveFillDimensions');
        } else {
          // Fallback to scene height if no parent size
          height = this.scene.game.config.height as number;
          this.logger.debug('ScalableHelper', 'Using scene height as fallback for fill', {
            objectId: this.id,
            sceneHeight: height
          }, 'resolveFillDimensions');
        }
      } else {
        // Fallback to scene height if no parent size
        height = this.scene.game.config.height as number;
        this.logger.debug('ScalableHelper', 'Using scene height as fallback for fill', {
          objectId: this.id,
          sceneHeight: height
        }, 'resolveFillDimensions');
      }
    }

    // Ensure we have valid numbers
    width = typeof width === 'number' ? width : 100;
    height = typeof height === 'number' ? height : 100;

    return { width, height };
  }
}
