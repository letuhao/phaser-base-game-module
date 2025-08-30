// Simplified scene loader configuration for levis2025r3wheel scene
// This focuses on the essential scene structure without complex interface requirements

import type { Levis2025R3WheelResponsiveConfig } from './levis2025r3wheel.responsive.config'

// Custom simplified interfaces for this scene
export interface Levis2025R3WheelGameObject {
  id: string
  type: 'container' | 'image' | 'text' | 'button' | 'background-container'
  name: string
  x: number
  y: number
  width: number | 'fill'
  height: number | 'fill'
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
  
  // Root game objects (like HTML body)
  gameObjects: [
    {
      id: 'background-container',
      type: 'background-container',
      name: 'Background Container',
      x: 0,
      y: 0,
      width: 'fill',
      height: 'fill',
      responsive: {} as Levis2025R3WheelResponsiveConfig,
      factory: {
        className: 'BackgroundContainer',
        createMethod: 'createFromConfig'
      },
      properties: {
        backgroundColor: '#1a1a2e',
        textureKey: 'levis2025r3wheel-desktop-bg', // Default to desktop background
        maintainAspectRatio: true
      },
      children: [
        {
          id: 'header-container',
          type: 'container',
          name: 'Header Container',
          x: 0,
          y: 0,
          width: 'fill',
          height: 100,
          responsive: {} as Levis2025R3WheelResponsiveConfig,
          factory: {
            className: 'ConcreteContainer',
            createMethod: 'createFromConfig'
          },
          properties: {
            backgroundColor: '#2a2a3e',
            interactive: false
          },
          children: [],
          parentId: 'background-container'
        },
        {
          id: 'body-container',
          type: 'container',
          name: 'Body Container',
          x: 0,
          y: 100,
          width: 'fill',
          height: 'fill',
          responsive: {} as Levis2025R3WheelResponsiveConfig,
          factory: {
            className: 'ConcreteContainer',
            createMethod: 'createFromConfig'
          },
          properties: {
            backgroundColor: '#3a3a4e',
            interactive: false
          },
          children: [],
          parentId: 'background-container'
        },
        {
          id: 'footer-container',
          type: 'container',
          name: 'Footer Container',
          x: 0,
          y: 0,
          width: 'fill',
          height: 80,
          responsive: {} as Levis2025R3WheelResponsiveConfig,
          factory: {
            className: 'ConcreteContainer',
            createMethod: 'createFromConfig'
          },
          properties: {
            backgroundColor: '#2a2a3e',
            interactive: false
          },
          children: [],
          parentId: 'background-container'
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

// Helper function to get background container config
export const getBackgroundContainerConfig = (): Levis2025R3WheelGameObject | undefined => {
  return levis2025r3wheelSceneLoaderConfig.gameObjects.find(
    obj => obj.id === 'background-container'
  )
}

// Helper function to add child to background container
export const addChildToBackground = (child: Levis2025R3WheelGameObject): void => {
  const backgroundContainer = levis2025r3wheelSceneLoaderConfig.gameObjects.find(
    obj => obj.id === 'background-container'
  )
  
  if (backgroundContainer) {
    child.parentId = backgroundContainer.id
    backgroundContainer.children.push(child)
  }
}

// Helper function to get all game objects
export const getAllGameObjects = (): Levis2025R3WheelGameObject[] => {
  return levis2025r3wheelSceneLoaderConfig.gameObjects
}

// Helper function to find game object by ID
export const findGameObject = (id: string): Levis2025R3WheelGameObject | undefined => {
  return levis2025r3wheelSceneLoaderConfig.gameObjects.find(obj => obj.id === id)
}
