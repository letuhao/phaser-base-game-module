// Simplified scene loader configuration for levis2025r3wheel scene
// This focuses on the essential scene structure without complex interface requirements

import type { Levis2025R3WheelResponsiveConfig } from './levis2025r3wheel.responsive.config'
import type { GameObjectConfig } from '../../../core/SceneLoaderConfigLoader'

// Custom simplified interfaces for this scene
export interface Levis2025R3WheelGameObject extends GameObjectConfig {
  id: string
  type: 'container' | 'image' | 'text' | 'button' | 'background-container' | 'shape'
  name: string
  x: number | 'fill'
  y: number | 'fill'
  width: number | 'fill'
  height: number | 'fill'
  zOrder?: number // Z-order for proper layering
  responsive: Levis2025R3WheelResponsiveConfig
  children: Levis2025R3WheelGameObject[]
  parentId?: string
  // Factory configuration
  factory?: {
    className: string
    constructorParams?: any
    createMethod?: string
  }
  // Object-specific properties
  properties?: {
    backgroundColor?: string
    textureKey?: string
    content?: string
    interactive?: boolean
    
    // Original dimensions for responsive sizing
    originalWidth?: number
    originalHeight?: number
    
    [key: string]: any
  }
}

export interface Levis2025R3WheelSceneConfig {
  sceneId: string
  sceneName: string
  version: string
  backgroundColor: string
  responsiveConfig: Levis2025R3WheelResponsiveConfig
  gameObjects: Levis2025R3WheelGameObject[]
  assetLoading: {
    preload: boolean
    priority: string[]
  }
}

export const levis2025r3wheelSceneLoaderConfig: Levis2025R3WheelSceneConfig = {
  sceneId: 'levis2025r3wheel',
  sceneName: 'Levis 2025 R3 Wheel Scene',
  version: '1.0.0',
  backgroundColor: '#000000',
  responsiveConfig: {} as Levis2025R3WheelResponsiveConfig,
  
  // Root game objects (like HTML body) - COMMENTED OUT FOR DEBUGGING
  // gameObjects: [
  //   {
  //     id: 'background-container',
  //     type: 'background-container',
  //     name: 'Background Container',
  //     x: 0,
  //     y: 0,
  //     width: 'fill',
  //     height: 'fill',
  //     zOrder: -100, // Lowest z-order for background
  //     responsive: {} as Levis2025R3WheelResponsiveConfig,
  //     factory: {
  //       className: 'BackgroundContainer',
  //       createMethod: 'createFromConfig'
  //     },
  //       properties: {
  //       backgroundColor: '#1a1a2e',
  //       textureKey: 'levis2025r3wheel-desktop-bg', // Fallback texture key
  //       desktopTextureKey: 'levis2025r3wheel-desktop-bg', // Desktop background
  //       mobileTextureKey: 'levis2025r3wheel-mobile-bg', // Mobile background
  //       maintainAspectRatio: true,
  //       scalingMode: 'fit',
  //       alignment: { x: 'center', y: 'center' }
  //     },
  //     children: [
  //       {
  //         id: 'header-container',
  //         type: 'container',
  //         name: 'Header Container',
  //         x: 0,
  //         y: 0,
  //         width: 'fill',
  //         height: 100,
  //         zOrder: 10, // Higher z-order for UI elements
  //         responsive: {} as Levis2025R3WheelResponsiveConfig,
  //         factory: {
  //           className: 'ConcreteContainer',
  //           createMethod: 'createFromConfig'
  //         },
  //         properties: {
  //           backgroundColor: '#2a2a3e',
  //           interactive: false
  //         },
  //         children: [],
  //         parentId: 'background-container'
  //       },
  //       {
  //         id: 'body-container',
  //         type: 'container',
  //         name: 'Body Container',
  //         x: 0,
  //         y: 100,
  //         width: 'fill',
  //         height: 'fill',
  //         zOrder: 20, // Higher z-order for UI elements
  //         responsive: {} as Levis2025R3WheelResponsiveConfig,
  //         factory: {
  //           className: 'ConcreteContainer',
  //           createMethod: 'createFromConfig'
  //         },
  //         properties: {
  //           backgroundColor: '#3a3a4e',
  //           interactive: false
  //         },
  //         children: [],
  //         parentId: 'background-container'
  //       },
  //       {
  //         id: 'footer-container',
  //         type: 'container',
  //         name: 'Footer Container',
  //         x: 0,
  //         y: 'fill',
  //         width: 'fill',
  //         height: 80,
  //         zOrder: 30, // Highest z-order for footer (top layer)
  //         responsive: {} as Levis2025R3WheelResponsiveConfig,
  //         factory: {
  //           className: 'ConcreteContainer',
  //           createMethod: 'createFromConfig'
  //         },
  //         properties: {
  //           backgroundColor: '#2a2a3e',
  //           interactive: false
  //         },
  //         children: [
  //           {
  //             id: 'footer-rectangle',
  //             type: 'shape',
  //             name: 'Footer Rectangle',
  //             x: 0,
  //             y: 0,
  //             width: 'fill',
  //             height: 'fill',
  //             zOrder: 40, // Highest z-order for footer rectangle (topmost layer)
  //             responsive: {} as Levis2025R3WheelResponsiveConfig,
  //             factory: {
  //               className: 'Rectangle',
  //               createMethod: 'createFromConfig'
  //             },
  //             properties: {
  //               fillColor: 0x54a8a8,
  //               interactive: false
  //             },
  //             children: [],
  //             parentId: 'footer-container'
  //           }
  //         ],
  //         parentId: 'background-container'
  //       }
  //     ],
  //     parentId: undefined
  //   }
  // ],

  // DEBUGGING: Simple test with ConcreteContainer as root + BackgroundContainer as child
  gameObjects: [
    {
      id: 'test-root-container',
      type: 'container',
      name: 'Test Root Container',
      x: 0,
      y: 0,
      width: 'fill',
      height: 'fill',
      zOrder: 0,
      responsive: {} as Levis2025R3WheelResponsiveConfig,
      factory: {
        className: 'ConcreteContainer',
        createMethod: 'createFromConfig'
      },
      properties: {
        backgroundColor: '#000000', // Black color to verify display
        interactive: false
      },
      children: [
        {
          id: 'background-container',
          type: 'background-container',
          name: 'Background Container',
          x: 0,
          y: 0,
          width: 'fill',
          height: 'fill',
          zOrder: -100, // Lowest z-order for background
          responsive: {} as Levis2025R3WheelResponsiveConfig,
          factory: {
            className: 'BackgroundContainer',
            createMethod: 'createFromConfig'
          },
          properties: {
            backgroundColor: '#ffffff',
            textureKey: 'levis2025r3wheel-desktop-bg', // Fallback texture key
            desktopTextureKey: 'levis2025r3wheel-desktop-bg', // Desktop background
            mobileTextureKey: 'levis2025r3wheel-mobile-bg', // Mobile background
            
            // Original dimensions for responsive sizing
            // originalWidth: 1920,  // Original design width
            // originalHeight: 1080  // Original design height
          },
          children: [],
          parentId: 'test-root-container'
        }
      ],
      parentId: undefined
    }
  ],
  
  // Asset loading configuration
  assetLoading: {
    preload: true,
    priority: ['background', 'ui', 'audio', 'effects']
  }
}

// Helper function to get test root container config
export const getTestRootContainerConfig = (): Levis2025R3WheelGameObject | undefined => {
  return levis2025r3wheelSceneLoaderConfig.gameObjects.find(
    obj => obj.id === 'test-root-container'
  )
}

// Helper function to get background container config
export const getBackgroundContainerConfig = (): Levis2025R3WheelGameObject | undefined => {
  const rootContainer = levis2025r3wheelSceneLoaderConfig.gameObjects.find(
    obj => obj.id === 'test-root-container'
  )
  return rootContainer?.children.find(child => child.id === 'background-container')
}

// Helper function to add child to test root container
export const addChildToTestRoot = (child: Levis2025R3WheelGameObject): void => {
  const testRootContainer = levis2025r3wheelSceneLoaderConfig.gameObjects.find(
    obj => obj.id === 'test-root-container'
  )
  
  if (testRootContainer) {
    child.parentId = testRootContainer.id
    testRootContainer.children.push(child)
  }
}

// Helper function to add child to background container
export const addChildToBackground = (child: Levis2025R3WheelGameObject): void => {
  const backgroundContainer = getBackgroundContainerConfig()
  
  if (backgroundContainer) {
    child.parentId = backgroundContainer.id
    backgroundContainer.children.push(child)
  }
}

// Helper function to get background container config (commented out for debugging)
// export const getBackgroundContainerConfig = (): Levis2025R3WheelGameObject | undefined => {
//   return levis2025r3wheelSceneLoaderConfig.gameObjects.find(
//     obj => obj.id === 'background-container'
//   )
// }

// Helper function to add child to background container (commented out for debugging)
// export const addChildToBackground = (child: Levis2025R3WheelGameObject): void => {
//   const backgroundContainer = levis2025r3wheelSceneLoaderConfig.gameObjects.find(
//     obj => obj.id === 'background-container'
//   )
//   
//   if (backgroundContainer) {
//     child.parentId = backgroundContainer.id
//     backgroundContainer.children.push(child)
//   }
// }

// Helper function to get all game objects
export const getAllGameObjects = (): Levis2025R3WheelGameObject[] => {
  return levis2025r3wheelSceneLoaderConfig.gameObjects
}

// Helper function to find game object by ID
export const findGameObject = (id: string): Levis2025R3WheelGameObject | undefined => {
  return levis2025r3wheelSceneLoaderConfig.gameObjects.find(obj => obj.id === id)
}
