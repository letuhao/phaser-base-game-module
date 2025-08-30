import type { IConfiguration } from '../interfaces/IConfiguration'
import type { IResponsiveConfig } from './IResponsiveConfig'

/**
 * Scene Loader Configuration Interface
 * Provides HTML-like hierarchical structure for game objects within a scene
 * Allows deep nesting of objects with parent-child relationships
 * 
 * Structure example:
 * - Background Container (div-like)
 *   - Header (div-like)
 *     - Logo (image)
 *     - Navigation (container)
 *       - Menu Button (button)
 *       - Settings Button (button)
 *   - Body (div-like)
 *     - Environment Container (div-like)
 *       - Sky (image)
 *       - Ground (image)
 *       - Trees (container)
 *         - Tree1 (image)
 *         - Tree2 (image)
 *     - Effect Container (div-like)
 *       - Particles (container)
 *       - Lighting (container)
 *   - Footer (div-like)
 *     - Score Text (text)
 *     - Health Bar (container)
 *       - Health Fill (image)
 */
export interface ISceneLoaderConfig extends IConfiguration {
  /** Scene identifier this loader config belongs to */
  readonly sceneId: string
  
  /** Root container configuration */
  readonly rootContainer: IGameObjectConfig
  
  /** Object registry - all objects by ID */
  readonly objectRegistry: Map<string, IGameObjectConfig>
  
  /** Object hierarchy tree */
  readonly objectHierarchy: IGameObjectNode
  
  /** Loading strategy */
  readonly loadingStrategy: {
    /** Loading order: 'breadth-first' | 'depth-first' | 'priority-based' | 'dependency-based' */
    order: 'breadth-first' | 'depth-first' | 'priority-based' | 'dependency-based'
    /** Whether to load objects in parallel */
    parallel: boolean
    /** Maximum concurrent loading operations */
    maxConcurrent: number
    /** Loading timeout in milliseconds */
    timeout: number
    /** Whether to show loading progress */
    showProgress: boolean
  }
  
  /** Object instantiation strategy */
  readonly instantiationStrategy: {
    /** When to instantiate objects: 'eager' | 'lazy' | 'on-demand' */
    timing: 'eager' | 'lazy' | 'on-demand'
    /** Whether to pool objects for reuse */
    useObjectPooling: boolean
    /** Pool size for each object type */
    poolSizes: { [objectType: string]: number }
    /** Whether to preload object templates */
    preloadTemplates: boolean
  }
  
  /** Scene loading methods */
  readonly loadingMethods: {
    /** Load the entire scene */
    loadScene(): Promise<void>
    
    /** Load specific object and its children */
    loadObject(objectId: string): Promise<IGameObjectConfig>
    
    /** Unload specific object and its children */
    unloadObject(objectId: string): Promise<void>
    
    /** Get loading progress (0-1) */
    getLoadingProgress(): number
    
    /** Check if scene is fully loaded */
    isSceneLoaded(): boolean
    
    /** Get loading errors */
    getLoadingErrors(): string[]
    
    /** Reload scene */
    reloadScene(): Promise<void>
  }
  
  /** Object management methods */
  readonly objectManagement: {
    /** Add new object to the scene */
    addObject(object: IGameObjectConfig, parentId?: string): void
    
    /** Remove object from the scene */
    removeObject(objectId: string): void
    
    /** Move object to different parent */
    moveObject(objectId: string, newParentId: string): void
    
    /** Clone object */
    cloneObject(objectId: string, newParentId?: string): IGameObjectConfig
    
    /** Get object by ID */
    getObject(objectId: string): IGameObjectConfig | undefined
    
    /** Get all objects of specific type */
    getObjectsByType(type: string): IGameObjectConfig[]
    
    /** Get objects by tag */
    getObjectsByTag(tag: string): IGameObjectConfig[]
    
    /** Find objects by property value */
    findObjects(property: string, value: any): IGameObjectConfig[]
  }
  
  /** Scene lifecycle events */
  readonly sceneEvents: {
    /** Fired when scene starts loading */
    onSceneLoadStart: (() => void)[]
    /** Fired when scene finishes loading */
    onSceneLoadComplete: (() => void)[]
    /** Fired when scene loading fails */
    onSceneLoadError: ((error: string) => void)[]
    /** Fired when object is added */
    onObjectAdded: ((object: IGameObjectConfig) => void)[]
    /** Fired when object is removed */
    onObjectRemoved: ((objectId: string) => void)[]
    /** Fired when object is moved */
    onObjectMoved: ((objectId: string, newParentId: string) => void)[]
    /** Fired when loading progress updates */
    onLoadingProgress: ((progress: number) => void)[]
  }
}

/**
 * Game Object Configuration Interface
 * Represents a single game object with all its properties and behaviors
 */
export interface IGameObjectConfig extends IConfiguration {
  /** Unique identifier for this object */
  readonly id: string
  
  /** Object type (like HTML tag) */
  readonly type: 'container' | 'image' | 'text' | 'button' | 'input' | 'sprite' | 'animation' | 'audio' | 'video' | 'particle' | 'light' | 'camera' | 'physics' | 'custom'
  
  /** Object name for display/debugging */
  readonly name: string
  
  /** Object tags for categorization and querying */
  readonly tags: string[]
  
  /** Object priority (higher = rendered on top) */
  readonly priority: number
  
  /** Whether object is visible */
  readonly visible: boolean
  
  /** Whether object is interactive */
  readonly interactive: boolean
  
  /** Whether object is active/enabled */
  readonly active: boolean
  
  /** Object template (for cloning/instancing) */
  readonly template?: string
  
  /** Responsive configuration for this object */
  readonly responsive: IResponsiveConfig
  
  /** Object properties based on type */
  readonly properties: IGameObjectProperties
  
  /** Object behaviors/scripts */
  readonly behaviors: IGameObjectBehavior[]
  
  /** Object events and callbacks */
  readonly events: IGameObjectEvents
  
  /** Object constraints and validation */
  readonly constraints: IGameObjectConstraints
  
  /** Object metadata for custom use */
  readonly metadata: Record<string, any>
  
  /** Parent object ID (null for root) */
  readonly parentId: string | null
  
  /** Child object IDs */
  readonly children: string[]
  
  /** Object lifecycle methods */
  readonly lifecycle: {
    /** Called when object is created */
    onCreate?: () => void
    /** Called when object is initialized */
    onInit?: () => void
    /** Called when object is activated */
    onActivate?: () => void
    /** Called when object is deactivated */
    onDeactivate?: () => void
    /** Called when object is destroyed */
    onDestroy?: () => void
    /** Called every frame */
    onUpdate?: (time: number, delta: number) => void
    /** Called when object is rendered */
    onRender?: () => void
  }
  
  /** Object utility methods */
  readonly utilities: {
    /** Get object path in hierarchy */
    getObjectPath(): string[]
    
    /** Get object depth in hierarchy */
    getDepth(): number
    
    /** Check if object is descendant of another */
    isDescendantOf(ancestorId: string): boolean
    
    /** Check if object is ancestor of another */
    isAncestorOf(descendantId: string): boolean
    
    /** Get all descendants */
    getDescendants(): string[]
    
    /** Get all ancestors */
    getAncestors(): string[]
    
    /** Get siblings */
    getSiblings(): string[]
    
    /** Check if object has children */
    hasChildren(): boolean
    
    /** Check if object is leaf node */
    isLeaf(): boolean
  }
}

/**
 * Game Object Properties Interface
 * Type-specific properties for different object types
 */
export interface IGameObjectProperties {
  /** Container properties */
  container?: {
    /** Container layout type */
    layoutType: 'flexbox' | 'grid' | 'stack' | 'absolute' | 'flow'
    /** Container background */
    background?: {
      color?: string
      image?: string
      opacity?: number
    }
    /** Container border */
    border?: {
      width: number
      style: 'solid' | 'dashed' | 'dotted' | 'none'
      color: string
      radius: number
    }
    /** Container shadow */
    shadow?: {
      enabled: boolean
      color: string
      blur: number
      offsetX: number
      offsetY: number
    }
  }
  
  /** Image properties */
  image?: {
    /** Image source */
    src: string
    /** Image alt text */
    alt?: string
    /** Image tint color */
    tint?: string
    /** Image alpha/opacity */
    alpha?: number
    /** Image flip */
    flip?: {
      horizontal: boolean
      vertical: boolean
    }
    /** Image crop */
    crop?: {
      x: number
      y: number
      width: number
      height: number
    }
  }
  
  /** Text properties */
  text?: {
    /** Text content */
    content: string
    /** Text font family */
    fontFamily: string
    /** Text font size */
    fontSize: number
    /** Text font weight */
    fontWeight: number
    /** Text color */
    color: string
    /** Text alignment */
    alignment: 'left' | 'center' | 'right' | 'justify'
    /** Text line height */
    lineHeight: number
    /** Text word wrap */
    wordWrap: boolean
    /** Text max width */
    maxWidth?: number
    /** Text stroke */
    stroke?: {
      color: string
      width: number
    }
    /** Text shadow */
    shadow?: {
      color: string
      blur: number
      offsetX: number
      offsetY: number
    }
  }
  
  /** Button properties */
  button?: {
    /** Button text */
    text: string
    /** Button icon */
    icon?: string
    /** Button states */
    states: {
      normal: IButtonState
      hover: IButtonState
      pressed: IButtonState
      disabled: IButtonState
    }
    /** Button behavior */
    behavior: {
      /** Whether button is toggleable */
      toggleable: boolean
      /** Whether button is checked (for toggle) */
      checked: boolean
      /** Button group (for radio buttons) */
      group?: string
      /** Button action */
      action: string
    }
  }
  
  /** Sprite properties */
  sprite?: {
    /** Sprite sheet source */
    spritesheet: string
    /** Sprite frame */
    frame: number | string
    /** Sprite animations */
    animations?: {
      [name: string]: {
        frames: (number | string)[]
        frameRate: number
        repeat: number
        yoyo: boolean
      }
    }
    /** Current animation */
    currentAnimation?: string
  }
  
  /** Audio properties */
  audio?: {
    /** Audio source */
    src: string
    /** Audio volume */
    volume: number
    /** Audio loop */
    loop: boolean
    /** Audio autoplay */
    autoplay: boolean
    /** Audio preload */
    preload: boolean
  }
  
  /** Particle properties */
  particle?: {
    /** Particle system type */
    systemType: 'emitter' | 'explosion' | 'trail' | 'custom'
    /** Particle texture */
    texture: string
    /** Particle count */
    count: number
    /** Particle lifetime */
    lifetime: number
    /** Particle speed */
    speed: number
    /** Particle scale */
    scale: number
    /** Particle color */
    color: string
    /** Particle alpha */
    alpha: number
  }
  
  /** Physics properties */
  physics?: {
    /** Physics body type */
    bodyType: 'static' | 'dynamic' | 'kinematic'
    /** Physics shape */
    shape: 'rectangle' | 'circle' | 'polygon' | 'custom'
    /** Physics mass */
    mass: number
    /** Physics friction */
    friction: number
    /** Physics restitution */
    restitution: number
    /** Physics collision group */
    collisionGroup: number
    /** Physics collision mask */
    collisionMask: number
  }
  
  /** Custom properties */
  custom?: Record<string, any>
}

/**
 * Button State Interface
 */
export interface IButtonState {
  /** Background color */
  backgroundColor: string
  /** Text color */
  textColor: string
  /** Border color */
  borderColor: string
  /** Shadow color */
  shadowColor?: string
  /** Scale */
  scale: number
}

/**
 * Game Object Behavior Interface
 */
export interface IGameObjectBehavior {
  /** Behavior name */
  name: string
  /** Behavior type */
  type: 'script' | 'animation' | 'physics' | 'ai' | 'custom'
  /** Behavior script/function */
  script: string | Function
  /** Behavior parameters */
  parameters: Record<string, any>
  /** Whether behavior is enabled */
  enabled: boolean
  /** Behavior priority */
  priority: number
  /** Behavior dependencies */
  dependencies: string[]
}

/**
 * Game Object Events Interface
 */
export interface IGameObjectEvents {
  /** Mouse events */
  mouse?: {
    onClick?: (event: any) => void
    onDoubleClick?: (event: any) => void
    onMouseDown?: (event: any) => void
    onMouseUp?: (event: any) => void
    onMouseOver?: (event: any) => void
    onMouseOut?: (event: any) => void
    onMouseMove?: (event: any) => void
    onMouseWheel?: (event: any) => void
  }
  
  /** Touch events */
  touch?: {
    onTouchStart?: (event: any) => void
    onTouchEnd?: (event: any) => void
    onTouchMove?: (event: any) => void
    onTouchCancel?: (event: any) => void
  }
  
  /** Keyboard events */
  keyboard?: {
    onKeyDown?: (event: any) => void
    onKeyUp?: (event: any) => void
    onKeyPress?: (event: any) => void
  }
  
  /** Game events */
  game?: {
    onGameStart?: () => void
    onGamePause?: () => void
    onGameResume?: () => void
    onGameEnd?: () => void
    onLevelComplete?: () => void
    onLevelFail?: () => void
  }
  
  /** Custom events */
  custom: Record<string, (event: any) => void>
}

/**
 * Game Object Constraints Interface
 */
export interface IGameObjectConstraints {
  /** Position constraints */
  position?: {
    /** Minimum X position */
    minX?: number
    /** Maximum X position */
    maxX?: number
    /** Minimum Y position */
    minY?: number
    /** Maximum Y position */
    maxY?: number
    /** Whether to respect parent bounds */
    respectParentBounds: boolean
  }
  
  /** Size constraints */
  size?: {
    /** Minimum width */
    minWidth?: number
    /** Maximum width */
    maxWidth?: number
    /** Minimum height */
    minHeight?: number
    /** Maximum height */
    maxHeight?: number
    /** Whether to maintain aspect ratio */
    maintainAspectRatio: boolean
  }
  
  /** Rotation constraints */
  rotation?: {
    /** Minimum rotation */
    minRotation?: number
    /** Maximum rotation */
    maxRotation?: number
    /** Whether to snap to grid */
    snapToGrid: boolean
    /** Grid size */
    gridSize: number
  }
  
  /** Scale constraints */
  scale?: {
    /** Minimum scale */
    minScale: number
    /** Maximum scale */
    maxScale: number
    /** Whether to maintain aspect ratio */
    maintainAspectRatio: boolean
  }
  
  /** Performance constraints */
  performance?: {
    /** Maximum update frequency */
    maxUpdateFrequency: number
    /** Whether to cull when off-screen */
    cullOffScreen: boolean
    /** Culling distance */
    cullDistance: number
    /** Whether to use LOD (Level of Detail) */
    useLOD: boolean
  }
}

/**
 * Game Object Node Interface
 * Represents a node in the object hierarchy tree
 */
export interface IGameObjectNode {
  /** Object ID */
  id: string
  /** Object configuration */
  config: IGameObjectConfig
  /** Parent node */
  parent: IGameObjectNode | null
  /** Child nodes */
  children: IGameObjectNode[]
  /** Node depth in tree */
  depth: number
  /** Node path from root */
  path: string[]
}

/**
 * Scene Loader Utility Functions
 */
export interface ISceneLoaderUtilities {
  /** Create object hierarchy from flat list */
  createHierarchy(objects: IGameObjectConfig[]): IGameObjectNode
  
  /** Flatten hierarchy to flat list */
  flattenHierarchy(root: IGameObjectNode): IGameObjectConfig[]
  
  /** Find object by path */
  findObjectByPath(root: IGameObjectNode, path: string[]): IGameObjectNode | null
  
  /** Get object subtree */
  getSubtree(node: IGameObjectNode): IGameObjectNode[]
  
  /** Validate object hierarchy */
  validateHierarchy(root: IGameObjectNode): string[]
  
  /** Optimize object hierarchy */
  optimizeHierarchy(root: IGameObjectNode): IGameObjectNode
  
  /** Serialize hierarchy to JSON */
  serializeHierarchy(root: IGameObjectNode): string
  
  /** Deserialize hierarchy from JSON */
  deserializeHierarchy(json: string): IGameObjectNode
}
