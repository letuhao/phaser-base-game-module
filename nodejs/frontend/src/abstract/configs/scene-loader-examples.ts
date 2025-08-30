import type { 
  ISceneLoaderConfig, 
  IGameObjectConfig, 
  IGameObjectBehavior,
  IGameObjectNode 
} from './ISceneLoaderConfig'
import type { IResponsiveConfig } from './IResponsiveConfig'

/**
 * Example Scene Loader Configuration
 * Demonstrates HTML-like hierarchical structure for game objects
 * 
 * Structure:
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

/**
 * Example 1: Complete Game Scene with HTML-like Structure
 */
export const exampleGameScene: ISceneLoaderConfig = {
  // Base configuration
  id: 'game-scene-loader',
  name: 'Game Scene Loader',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: { sceneType: 'gameplay', complexity: 'high' },
  
  // Scene loader specific
  sceneId: 'game-scene',
  rootContainer: createBackgroundContainer(),
  objectRegistry: new Map(),
  objectHierarchy: createObjectHierarchy(),
  
  // Loading strategy
  loadingStrategy: {
    order: 'dependency-based',
    parallel: true,
    maxConcurrent: 5,
    timeout: 30000,
    showProgress: true
  },
  
  // Instantiation strategy
  instantiationStrategy: {
    timing: 'lazy',
    useObjectPooling: true,
    poolSizes: {
      'image': 50,
      'text': 20,
      'button': 10,
      'container': 15
    },
    preloadTemplates: true
  },
  
  // Loading methods
  loadingMethods: {
    loadScene: async () => { console.log('Loading game scene...') },
    loadObject: async (id) => { return createGameObject(id) },
    unloadObject: async (id) => { console.log(`Unloading object: ${id}`) },
    getLoadingProgress: () => 0.75,
    isSceneLoaded: () => false,
    getLoadingErrors: () => [],
    reloadScene: async () => { console.log('Reloading scene...') }
  },
  
  // Object management
  objectManagement: {
    addObject: (obj, parentId) => { console.log(`Adding object: ${obj.id}`) },
    removeObject: (id) => { console.log(`Removing object: ${id}`) },
    moveObject: (id, newParentId) => { console.log(`Moving object: ${id}`) },
    cloneObject: (id, newParentId) => { return createGameObject(id) },
    getObject: (id) => { return createGameObject(id) },
    getObjectsByType: (type) => { return [] },
    getObjectsByTag: (tag) => { return [] },
    findObjects: (property, value) => { return [] }
  },
  
  // Scene events
  sceneEvents: {
    onSceneLoadStart: [],
    onSceneLoadComplete: [],
    onSceneLoadError: [],
    onObjectAdded: [],
    onObjectRemoved: [],
    onObjectMoved: [],
    onLoadingProgress: []
  },
  
  // IConfiguration methods
  validate: () => [],
  clone: function(overrides) { return { ...this, ...overrides } as ISceneLoaderConfig },
  toJSON: function() { return JSON.stringify(this) },
  fromJSON: function(json) { return JSON.parse(json) as ISceneLoaderConfig },
  isValid: function() { return this.validate().length === 0 },
  getSummary: function() {
    return {
      id: this.id,
      name: this.name,
      version: this.version,
      isActive: this.isActive,
      lastModified: this.lastModified,
      isValid: this.isValid(),
      validationErrors: this.validate(),
      metadataKeys: Object.keys(this.metadata)
    }
  }
}

/**
 * Create the main background container (root)
 */
function createBackgroundContainer(): IGameObjectConfig {
  return {
    // Base configuration
    id: 'background-container',
    name: 'Background Container',
    version: '1.0.0',
    isActive: true,
    lastModified: new Date(),
    metadata: { role: 'root', type: 'main-container' },
    
    // Game object specific
    type: 'container',
    tags: ['root', 'container', 'background'],
    priority: 0,
    visible: true,
    interactive: false,
    active: true,
    
    // Responsive configuration
    responsive: createResponsiveConfig(),
    
    // Container properties
    properties: {
      container: {
        layoutType: 'absolute',
        background: {
          color: '#1a1a2e',
          opacity: 1
        },
        border: {
          width: 0,
          style: 'none',
          color: '#000000',
          radius: 0
        }
      }
    },
    
    // Behaviors
    behaviors: [
      createBehavior('background-scroll', 'script', () => {}, { speed: 0.5 })
    ],
    
    // Events
    events: {
      custom: {}
    },
    
    // Constraints
    constraints: {
      position: {
        respectParentBounds: true
      },
      size: {
        maintainAspectRatio: false
      }
    },
    
    // Hierarchy
    parentId: null,
    children: ['header-container', 'body-container', 'footer-container'],
    
    // Lifecycle
    lifecycle: {
      onCreate: () => console.log('Background container created'),
      onUpdate: (time, delta) => { /* Update logic */ }
    },
    
    // Utilities
    utilities: {
      getObjectPath: () => ['background-container'],
      getDepth: () => 0,
      isDescendantOf: () => false,
      isAncestorOf: (id) => ['header-container', 'body-container', 'footer-container'].includes(id),
      getDescendants: () => ['header-container', 'body-container', 'footer-container'],
      getAncestors: () => [],
      getSiblings: () => [],
      hasChildren: () => true,
      isLeaf: () => false
    }
  }
}

/**
 * Create header container with logo and navigation
 */
export const headerContainer: IGameObjectConfig = {
  id: 'header-container',
  name: 'Header Container',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: { role: 'header', layout: 'horizontal' },
  
  type: 'container',
  tags: ['header', 'container', 'ui'],
  priority: 10,
  visible: true,
  interactive: false,
  active: true,
  
  responsive: createResponsiveConfig(),
  
  properties: {
    container: {
      layoutType: 'flexbox',
      background: {
        color: '#2a2a3e',
        opacity: 0.9
      },
      border: {
        width: 1,
        style: 'solid',
        color: '#4a4a5e',
        radius: 8
      }
    }
  },
  
  behaviors: [
    createBehavior('header-sticky', 'script', () => {}, { sticky: true })
  ],
  
  events: { custom: {} },
  
  constraints: {
    position: {
      minY: 0,
      maxY: 100
    }
  },
  
  parentId: 'background-container',
  children: ['logo-image', 'navigation-container'],
  
  lifecycle: {
    onCreate: () => console.log('Header container created')
  },
  
  utilities: createUtilityMethods('header-container', 1)
}

/**
 * Create logo image
 */
export const logoImage: IGameObjectConfig = {
  id: 'logo-image',
  name: 'Game Logo',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: { role: 'logo', asset: 'logo.png' },
  
  type: 'image',
  tags: ['logo', 'image', 'branding'],
  priority: 15,
  visible: true,
  interactive: false,
  active: true,
  
  responsive: createResponsiveConfig(),
  
  properties: {
    image: {
      src: 'assets/images/logo.png',
      alt: 'Game Logo',
      alpha: 1
    }
  },
  
  behaviors: [
    createBehavior('logo-pulse', 'animation', () => {}, { pulse: true })
  ],
  
  events: { custom: {} },
  
  constraints: {
    size: {
      minWidth: 100,
      maxWidth: 200,
      maintainAspectRatio: true
    }
  },
  
  parentId: 'header-container',
  children: [],
  
  lifecycle: {
    onCreate: () => console.log('Logo created')
  },
  
  utilities: createUtilityMethods('logo-image', 2)
}

/**
 * Create navigation container
 */
export const navigationContainer: IGameObjectConfig = {
  id: 'navigation-container',
  name: 'Navigation',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: { role: 'navigation', layout: 'horizontal' },
  
  type: 'container',
  tags: ['navigation', 'container', 'ui'],
  priority: 12,
  visible: true,
  interactive: false,
  active: true,
  
  responsive: createResponsiveConfig(),
  
  properties: {
    container: {
      layoutType: 'flexbox',
      background: {
        color: 'transparent'
      }
    }
  },
  
  behaviors: [],
  
  events: { custom: {} },
  
  constraints: {},
  
  parentId: 'header-container',
  children: ['menu-button', 'settings-button'],
  
  lifecycle: {
    onCreate: () => console.log('Navigation created')
  },
  
  utilities: createUtilityMethods('navigation-container', 2)
}

/**
 * Create menu button
 */
export const menuButton: IGameObjectConfig = {
  id: 'menu-button',
  name: 'Menu Button',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: { role: 'button', action: 'open-menu' },
  
  type: 'button',
  tags: ['button', 'menu', 'ui', 'interactive'],
  priority: 20,
  visible: true,
  interactive: true,
  active: true,
  
  responsive: createResponsiveConfig(),
  
  properties: {
    button: {
      text: 'Menu',
      icon: 'assets/icons/menu.png',
      states: {
        normal: {
          backgroundColor: '#007bff',
          textColor: '#ffffff',
          borderColor: '#0056b3',
          scale: 1
        },
        hover: {
          backgroundColor: '#0056b3',
          textColor: '#ffffff',
          borderColor: '#004085',
          scale: 1.05
        },
        pressed: {
          backgroundColor: '#004085',
          textColor: '#ffffff',
          borderColor: '#002752',
          scale: 0.95
        },
        disabled: {
          backgroundColor: '#6c757d',
          textColor: '#ffffff',
          borderColor: '#545b62',
          scale: 1
        }
      },
      behavior: {
        toggleable: false,
        checked: false,
        action: 'open-menu'
      }
    }
  },
  
  behaviors: [
    createBehavior('button-hover', 'script', () => {}, { hover: true })
  ],
  
  events: {
    mouse: {
      onClick: (event) => console.log('Menu button clicked')
    }
  },
  
  constraints: {
    size: {
      minWidth: 80,
      maxWidth: 120,
      minHeight: 32,
      maxHeight: 48
    }
  },
  
  parentId: 'navigation-container',
  children: [],
  
  lifecycle: {
    onCreate: () => console.log('Menu button created')
  },
  
  utilities: createUtilityMethods('menu-button', 3)
}

/**
 * Create body container with environment and effects
 */
export const bodyContainer: IGameObjectConfig = {
  id: 'body-container',
  name: 'Body Container',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: { role: 'body', layout: 'vertical' },
  
  type: 'container',
  tags: ['body', 'container', 'main-content'],
  priority: 5,
  visible: true,
  interactive: false,
  active: true,
  
  responsive: createResponsiveConfig(),
  
  properties: {
    container: {
      layoutType: 'flexbox',
      background: {
        color: 'transparent'
      }
    }
  },
  
  behaviors: [],
  
  events: { custom: {} },
  
  constraints: {},
  
  parentId: 'background-container',
  children: ['environment-container', 'effect-container'],
  
  lifecycle: {
    onCreate: () => console.log('Body container created')
  },
  
  utilities: createUtilityMethods('body-container', 1)
}

/**
 * Create environment container
 */
export const environmentContainer: IGameObjectConfig = {
  id: 'environment-container',
  name: 'Environment',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: { role: 'environment', type: 'game-world' },
  
  type: 'container',
  tags: ['environment', 'container', 'game-world'],
  priority: 8,
  visible: true,
  interactive: false,
  active: true,
  
  responsive: createResponsiveConfig(),
  
  properties: {
    container: {
      layoutType: 'absolute',
      background: {
        color: 'transparent'
      }
    }
  },
  
  behaviors: [
    createBehavior('environment-scroll', 'script', () => {}, { parallax: true })
  ],
  
  events: { custom: {} },
  
  constraints: {},
  
  parentId: 'body-container',
  children: ['sky-image', 'ground-image', 'trees-container'],
  
  lifecycle: {
    onCreate: () => console.log('Environment container created')
  },
  
  utilities: createUtilityMethods('environment-container', 2)
}

/**
 * Create sky image
 */
export const skyImage: IGameObjectConfig = {
  id: 'sky-image',
  name: 'Sky',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: { role: 'background', asset: 'sky.png', layer: 'far' },
  
  type: 'image',
  tags: ['sky', 'image', 'background', 'environment'],
  priority: 1,
  visible: true,
  interactive: false,
  active: true,
  
  responsive: createResponsiveConfig(),
  
  properties: {
    image: {
      src: 'assets/images/sky.png',
      alt: 'Sky Background',
      alpha: 1
    }
  },
  
  behaviors: [
    createBehavior('sky-parallax', 'script', () => {}, { speed: 0.1 })
  ],
  
  events: { custom: {} },
  
  constraints: {
    size: {
      maintainAspectRatio: false
    }
  },
  
  parentId: 'environment-container',
  children: [],
  
  lifecycle: {
    onCreate: () => console.log('Sky created')
  },
  
  utilities: createUtilityMethods('sky-image', 3)
}

/**
 * Create trees container
 */
export const treesContainer: IGameObjectConfig = {
  id: 'trees-container',
  name: 'Trees',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: { role: 'foreground', type: 'vegetation' },
  
  type: 'container',
  tags: ['trees', 'container', 'vegetation', 'foreground'],
  priority: 6,
  visible: true,
  interactive: false,
  active: true,
  
  responsive: createResponsiveConfig(),
  
  properties: {
    container: {
      layoutType: 'absolute',
      background: {
        color: 'transparent'
      }
    }
  },
  
  behaviors: [
    createBehavior('trees-wind', 'script', () => {}, { wind: true })
  ],
  
  events: { custom: {} },
  
  constraints: {},
  
  parentId: 'environment-container',
  children: ['tree1-image', 'tree2-image'],
  
  lifecycle: {
    onCreate: () => console.log('Trees container created')
  },
  
  utilities: createUtilityMethods('trees-container', 3)
}

/**
 * Create footer container
 */
export const footerContainer: IGameObjectConfig = {
  id: 'footer-container',
  name: 'Footer Container',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: { role: 'footer', layout: 'horizontal' },
  
  type: 'container',
  tags: ['footer', 'container', 'ui'],
  priority: 10,
  visible: true,
  interactive: false,
  active: true,
  
  responsive: createResponsiveConfig(),
  
  properties: {
    container: {
      layoutType: 'flexbox',
      background: {
        color: '#2a2a3e',
        opacity: 0.9
      },
      border: {
        width: 1,
        style: 'solid',
        color: '#4a4a5e',
        radius: 8
      }
    }
  },
  
  behaviors: [],
  
  events: { custom: {} },
  
  constraints: {
    position: {
      minY: 600,
      maxY: 720
    }
  },
  
  parentId: 'background-container',
  children: ['score-text', 'health-bar-container'],
  
  lifecycle: {
    onCreate: () => console.log('Footer container created')
  },
  
  utilities: createUtilityMethods('footer-container', 1)
}

/**
 * Create score text
 */
export const scoreText: IGameObjectConfig = {
  id: 'score-text',
  name: 'Score Display',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: { role: 'score', type: 'hud' },
  
  type: 'text',
  tags: ['score', 'text', 'hud', 'ui'],
  priority: 25,
  visible: true,
  interactive: false,
  active: true,
  
  responsive: createResponsiveConfig(),
  
  properties: {
    text: {
      content: 'Score: 0',
      fontFamily: 'Arial, sans-serif',
      fontSize: 18,
      fontWeight: 600,
      color: '#ffffff',
      alignment: 'left',
      lineHeight: 1.2,
      wordWrap: false,
      stroke: {
        color: '#000000',
        width: 2
      }
    }
  },
  
  behaviors: [
    createBehavior('score-update', 'script', () => {}, { update: true })
  ],
  
  events: { custom: {} },
  
  constraints: {
    size: {
      minWidth: 100,
      maxWidth: 200
    }
  },
  
  parentId: 'footer-container',
  children: [],
  
  lifecycle: {
    onCreate: () => console.log('Score text created'),
    onUpdate: (time, delta) => { /* Update score logic */ }
  },
  
  utilities: createUtilityMethods('score-text', 2)
}

/**
 * Create health bar container
 */
export const healthBarContainer: IGameObjectConfig = {
  id: 'health-bar-container',
  name: 'Health Bar',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: { role: 'health', type: 'hud' },
  
  type: 'container',
  tags: ['health', 'bar', 'container', 'hud', 'ui'],
  priority: 20,
  visible: true,
  interactive: false,
  active: true,
  
  responsive: createResponsiveConfig(),
  
  properties: {
    container: {
      layoutType: 'flexbox',
      background: {
        color: '#dc3545',
        opacity: 0.8
      },
      border: {
        width: 2,
        style: 'solid',
        color: '#ffffff',
        radius: 4
      }
    }
  },
  
  behaviors: [
    createBehavior('health-update', 'script', () => {}, { update: true })
  ],
  
  events: { custom: {} },
  
  constraints: {
    size: {
      minWidth: 150,
      maxWidth: 300,
      minHeight: 20,
      maxHeight: 30
    }
  },
  
  parentId: 'footer-container',
  children: ['health-fill-image'],
  
  lifecycle: {
    onCreate: () => console.log('Health bar created')
  },
  
  utilities: createUtilityMethods('health-bar-container', 2)
}

/**
 * Create health fill image
 */
export const healthFillImage: IGameObjectConfig = {
  id: 'health-fill-image',
  name: 'Health Fill',
  version: '1.0.0',
  isActive: true,
  lastModified: new Date(),
  metadata: { role: 'health-fill', type: 'progress' },
  
  type: 'image',
  tags: ['health', 'fill', 'image', 'progress', 'hud'],
  priority: 22,
  visible: true,
  interactive: false,
  active: true,
  
  responsive: createResponsiveConfig(),
  
  properties: {
    image: {
      src: 'assets/images/health-fill.png',
      alt: 'Health Fill',
      alpha: 1
    }
  },
  
  behaviors: [
    createBehavior('health-animation', 'animation', () => {}, { animate: true })
  ],
  
  events: { custom: {} },
  
  constraints: {
    size: {
      maintainAspectRatio: false
    }
  },
  
  parentId: 'health-bar-container',
  children: [],
  
  lifecycle: {
    onCreate: () => console.log('Health fill created')
  },
  
  utilities: createUtilityMethods('health-fill-image', 3)
}

/**
 * Utility function to create a responsive configuration
 */
function createResponsiveConfig(): IResponsiveConfig {
  return {
    // This would be a complete IResponsiveConfig implementation
    // For brevity, returning a partial implementation
  } as IResponsiveConfig
}

/**
 * Utility function to create a behavior
 */
function createBehavior(
  name: string, 
  type: 'script' | 'animation' | 'physics' | 'ai' | 'custom',
  script: Function,
  parameters: Record<string, any>
): IGameObjectBehavior {
  return {
    name,
    type,
    script,
    parameters,
    enabled: true,
    priority: 1,
    dependencies: []
  }
}

/**
 * Utility function to create utility methods
 */
function createUtilityMethods(id: string, depth: number) {
  return {
    getObjectPath: () => [id],
    getDepth: () => depth,
    isDescendantOf: () => false,
    isAncestorOf: () => false,
    getDescendants: () => [],
    getAncestors: () => [],
    getSiblings: () => [],
    hasChildren: () => false,
    isLeaf: () => true
  }
}

/**
 * Utility function to create a game object
 */
function createGameObject(id: string): IGameObjectConfig {
  return {
    id,
    name: `Object ${id}`,
    version: '1.0.0',
    isActive: true,
    lastModified: new Date(),
    metadata: {},
    
    type: 'container',
    tags: [],
    priority: 1,
    visible: true,
    interactive: false,
    active: true,
    
    responsive: createResponsiveConfig(),
    
    properties: {},
    
    behaviors: [],
    
    events: { custom: {} },
    
    constraints: {},
    
    parentId: null,
    children: [],
    
    lifecycle: {},
    
    utilities: createUtilityMethods(id, 0)
  }
}

/**
 * Create the object hierarchy tree
 */
function createObjectHierarchy(): IGameObjectNode {
  return {
    id: 'background-container',
    config: createBackgroundContainer(),
    parent: null,
    children: [
      {
        id: 'header-container',
        config: headerContainer,
        parent: null, // Will be set when building tree
        children: [
          {
            id: 'logo-image',
            config: logoImage,
            parent: null,
            children: [],
            depth: 2,
            path: ['background-container', 'header-container', 'logo-image']
          },
          {
            id: 'navigation-container',
            config: navigationContainer,
            parent: null,
            children: [
              {
                id: 'menu-button',
                config: menuButton,
                parent: null,
                children: [],
                depth: 3,
                path: ['background-container', 'header-container', 'navigation-container', 'menu-button']
              }
            ],
            depth: 2,
            path: ['background-container', 'header-container', 'navigation-container']
          }
        ],
        depth: 1,
        path: ['background-container', 'header-container']
      },
      {
        id: 'body-container',
        config: bodyContainer,
        parent: null,
        children: [
          {
            id: 'environment-container',
            config: environmentContainer,
            parent: null,
            children: [
              {
                id: 'sky-image',
                config: skyImage,
                parent: null,
                children: [],
                depth: 3,
                path: ['background-container', 'body-container', 'environment-container', 'sky-image']
              },
              {
                id: 'trees-container',
                config: treesContainer,
                parent: null,
                children: [],
                depth: 3,
                path: ['background-container', 'body-container', 'environment-container', 'trees-container']
              }
            ],
            depth: 2,
            path: ['background-container', 'body-container', 'environment-container']
          }
        ],
        depth: 1,
        path: ['background-container', 'body-container']
      },
      {
        id: 'footer-container',
        config: footerContainer,
        parent: null,
        children: [
          {
            id: 'score-text',
            config: scoreText,
            parent: null,
            children: [],
            depth: 2,
            path: ['background-container', 'footer-container', 'score-text']
          },
          {
            id: 'health-bar-container',
            config: healthBarContainer,
            parent: null,
            children: [
              {
                id: 'health-fill-image',
                config: healthFillImage,
                parent: null,
                children: [],
                depth: 3,
                path: ['background-container', 'footer-container', 'health-bar-container', 'health-fill-image']
              }
            ],
            depth: 2,
            path: ['background-container', 'footer-container', 'health-bar-container']
          }
        ],
        depth: 1,
        path: ['background-container', 'footer-container']
      }
    ],
    depth: 0,
    path: ['background-container']
  }
}

/**
 * Example 2: Simple Menu Scene
 */
export const simpleMenuScene: Partial<ISceneLoaderConfig> = {
  sceneId: 'menu-scene',
  loadingStrategy: {
    order: 'breadth-first',
    parallel: false,
    maxConcurrent: 1,
    timeout: 10000,
    showProgress: false
  },
  instantiationStrategy: {
    timing: 'eager',
    useObjectPooling: false,
    poolSizes: {},
    preloadTemplates: false
  }
}

/**
 * Example 3: Complex Game Level Scene
 */
export const complexGameLevelScene: Partial<ISceneLoaderConfig> = {
  sceneId: 'game-level-1',
  loadingStrategy: {
    order: 'dependency-based',
    parallel: true,
    maxConcurrent: 10,
    timeout: 60000,
    showProgress: true
  },
  instantiationStrategy: {
    timing: 'lazy',
    useObjectPooling: true,
    poolSizes: {
      'enemy': 100,
      'projectile': 200,
      'particle': 500,
      'powerup': 20
    },
    preloadTemplates: true
  }
}

/**
 * Example 4: UI Overlay Scene
 */
export const uiOverlayScene: Partial<ISceneLoaderConfig> = {
  sceneId: 'ui-overlay',
  loadingStrategy: {
    order: 'priority-based',
    parallel: true,
    maxConcurrent: 3,
    timeout: 5000,
    showProgress: false
  },
  instantiationStrategy: {
    timing: 'on-demand',
    useObjectPooling: true,
    poolSizes: {
      'tooltip': 10,
      'notification': 5,
      'modal': 3
    },
    preloadTemplates: true
  }
}
