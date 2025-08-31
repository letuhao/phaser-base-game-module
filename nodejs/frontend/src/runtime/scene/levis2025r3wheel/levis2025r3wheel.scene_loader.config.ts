// Simplified scene loader configuration for levis2025r3wheel scene
// This focuses on the essential scene structure without complex interface requirements

import { levis2025r3wheelResponsiveConfig } from './levis2025r3wheel.responsive.config';
import type { SceneConfig } from '../../../core/SceneLoaderConfigLoader';
import { GameObjectType } from '../../../core/SceneLoaderConfigLoader';

export const levis2025r3wheelSceneLoaderConfig: SceneConfig = {
  sceneId: 'levis2025r3wheel',
  sceneName: 'Levis 2025 R3 Wheel Scene',
  version: '1.0.0',
  backgroundColor: '#000000',
  responsive: levis2025r3wheelResponsiveConfig,

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
  //           className: 'Container',
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
  //           className: 'Container',
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
  //           className: 'Container',
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

  // DEBUGGING: Simple test with Container as root + BackgroundContainer as child
  gameObjects: [
    {
      id: 'root-container',
      type: GameObjectType.CONTAINER,
      name: 'Root Container',
      factory: {
        className: 'Container',
        createMethod: 'createFromConfig',
      },
      properties: {
        interactive: false,
      },
      children: [
        // {
        //   id: 'background-container',
        //   type: GameObjectType.BACKGROUND_CONTAINER,
        //   name: 'Background Container',
        //   factory: {
        //     className: 'BackgroundContainer',
        //     createMethod: 'createFromConfig'
        //   },
        //   properties: {
        //     interactive: false
        //   },
        //   children: [
        //     {
        //       id: 'footer-container',
        //       type: GameObjectType.CONTAINER,
        //       name: 'Footer Container',
        //       factory: {
        //         className: 'Container',
        //         createMethod: 'createFromConfig'
        //       },
        //       properties: {
        //         interactive: false
        //       },
        //       children: [
        //         {
        //           id: 'footer-rectangle',
        //           type: GameObjectType.SHAPE,
        //           name: 'Footer Rectangle',
        //           factory: {
        //             className: 'Rectangle',
        //             createMethod: 'createFromConfig'
        //           },
        //           properties: {
        //             interactive: false
        //           },
        //           children: [],
        //           parentId: 'footer-container'
        //         }
        //       ],
        //       parentId: 'background-container'
        //     }
        //   ],
        //   parentId: 'test-root-container'
        // }
      ],
      parentId: undefined,
    },
  ],

  // Asset loading configuration
  assetLoading: {
    preload: true,
    priority: ['background', 'ui', 'audio', 'effects'],
  },
};
