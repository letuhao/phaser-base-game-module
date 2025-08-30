import type { IConfiguration } from '../interfaces/IConfiguration'

/**
 * Scene structure configuration interface for game scenes
 * Manages scene hierarchy, transitions, and lifecycle
 */
export interface ISceneConfig extends IConfiguration {
  /** Scene key/identifier */
  readonly sceneKey: string
  
  /** Scene name for display */
  readonly sceneName: string
  
  /** Scene type */
  readonly sceneType: 'menu' | 'gameplay' | 'pause' | 'loading' | 'transition' | 'overlay'
  
  /** Scene priority (higher = rendered on top) */
  readonly priority: number
  
  /** Whether this scene is persistent (survives scene changes) */
  readonly persistent: boolean
  
  /** Whether this scene is active by default */
  readonly activeByDefault: boolean
  
  /** Scene dimensions */
  readonly dimensions: {
    width: number
    height: number
    scaleMode: 'fit' | 'fill' | 'resize' | 'none'
    autoCenter: boolean
  }
  
  /** Scene background configuration */
  readonly background: {
    color: string
    image?: string
    video?: string
    parallax?: {
      enabled: boolean
      speed: number
      layers: Array<{
        image: string
        speed: number
        depth: number
      }>
    }
  }
  
  /** Scene physics configuration */
  readonly physics: {
    enabled: boolean
    system: 'arcade' | 'matter' | 'box2d' | 'none'
    gravity: { x: number; y: number }
    bounds: {
      x: number
      y: number
      width: number
      height: number
    }
    debug: boolean
  }
  
  /** Scene camera configuration */
  readonly camera: {
    followTarget?: string
    followMode: 'lerp' | 'linear' | 'none'
    followOffset: { x: number; y: number }
    zoom: {
      min: number
      max: number
      default: number
    }
    bounds: {
      x: number
      y: number
      width: number
      height: number
    }
    effects: {
      shake: boolean
      flash: boolean
      fade: boolean
    }
  }
  
  /** Scene transitions */
  readonly transitions: {
    in: {
      type: 'fade' | 'slide' | 'zoom' | 'none'
      duration: number
      easing: string
    }
    out: {
      type: 'fade' | 'slide' | 'zoom' | 'none'
      duration: number
      easing: string
    }
  }
  
  /** Scene dependencies (scenes that must be loaded first) */
  readonly dependencies: string[]
  
  /** Scene assets (assets specific to this scene) */
  readonly assets: {
    preload: string[]
    create: string[]
    cleanup: string[]
  }
  
  /** Scene UI configuration */
  readonly ui: {
    /** UI elements in this scene */
    elements: {
      [elementId: string]: {
        type: 'button' | 'text' | 'image' | 'container' | 'input'
        position: { x: number; y: number }
        size: { width: number; height: number }
        visible: boolean
        interactive: boolean
        zIndex: number
      }
    }
    /** UI layout system */
    layout: {
      type: 'absolute' | 'flexbox' | 'grid' | 'flow'
      direction: 'horizontal' | 'vertical'
      alignment: 'start' | 'center' | 'end' | 'stretch'
      spacing: number
    }
  }
  
  /** Scene audio configuration */
  readonly audio: {
    backgroundMusic?: string
    ambientSounds: string[]
    volume: {
      master: number
      music: number
      sfx: number
      ambient: number
    }
    fadeIn: boolean
    fadeOut: boolean
  }
  
  /** Scene performance settings */
  readonly performance: {
    maxObjects: number
    maxParticles: number
    cullDistance: number
    updateRate: number
    renderRate: number
  }
  
  /** Scene lifecycle hooks */
  readonly lifecycle: {
    preload: boolean
    create: boolean
    update: boolean
    render: boolean
    shutdown: boolean
    destroy: boolean
  }
  
  /** Get scene dependency tree */
  getDependencyTree(): string[]
  
  /** Check if scene dependencies are met */
  areDependenciesMet(): boolean
  
  /** Get scene transition configuration */
  getTransition(type: 'in' | 'out'): ISceneConfig['transitions']['in' | 'out']
  
  /** Get UI element configuration */
  getUIElement(elementId: string): ISceneConfig['ui']['elements'][string] | null
  
  /** Check if scene is ready to start */
  isReadyToStart(): boolean
  
  /** Get scene memory requirements */
  getMemoryRequirements(): {
    estimated: number
    peak: number
    persistent: number
  }
  
  /** Validate scene configuration */
  validateScene(): string[]
}
