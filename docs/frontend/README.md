# Frontend Documentation

## 🎮 Vite + Phaser 3.9 Game Implementation

This section covers the frontend implementation using Vite as the build tool and Phaser 3.9 as the game engine.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Architecture                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   Vite      │  │  Phaser     │  │  Game       │        │
│  │  Build      │  │  3.9 Game   │  │  State      │        │
│  │  System     │  │  Engine     │  │  Management │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   HTTP      │  │  WebSocket  │  │  Webhook    │        │
│  │  Client     │  │  Client     │  │  Receiver   │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │   UI        │  │  Game       │  │  Asset      │        │
│  │  Components │  │  Scenes     │  │  Loading    │        │
│  └─────────────┘  └─────────────┘  └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm
- Modern browser with ES6+ support

### Installation
```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── main.ts                 # Vite entry point
│   ├── game/
│   │   ├── Game.ts            # Main game class
│   │   ├── scenes/            # Phaser game scenes
│   │   │   ├── BootScene.ts   # Loading screen
│   │   │   ├── MenuScene.ts   # Main menu
│   │   │   └── GameScene.ts   # Main gameplay
│   │   ├── sprites/           # Game sprites and objects
│   │   ├── systems/           # Game systems (physics, AI, etc.)
│   │   └── utils/             # Utility functions
│   ├── ui/                    # UI components
│   ├── services/              # API and communication services
│   └── assets/                # Game assets (images, sounds, etc.)
├── public/                    # Static assets
├── index.html                 # Main HTML file
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## ⚙️ Configuration

### Vite Configuration (`vite.config.ts`)
```typescript
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          phaser: ['phaser'],
          vendor: ['lodash', 'axios'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
})
```

### TypeScript Configuration (`tsconfig.json`)
```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["ESNext", "DOM", "DOM.Iterable"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src"]
}
```

## 🎮 Game Implementation

### Main Game Class (`src/game/Game.ts`)
```typescript
import Phaser from 'phaser'
import { BootScene } from './scenes/BootScene'
import { MenuScene } from './scenes/MenuScene'
import { GameScene } from './scenes/GameScene'

export class Game extends Phaser.Game {
  constructor() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1280,
      height: 720,
      parent: 'game-container',
      backgroundColor: '#000000',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false,
        },
      },
      scene: [BootScene, MenuScene, GameScene],
    }
    
    super(config)
  }
}
```

### Game Scene Example (`src/game/scenes/GameScene.ts`)
```typescript
import Phaser from 'phaser'

export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  constructor() {
    super({ key: 'GameScene' })
  }

  create() {
    // Create game objects
    this.player = this.physics.add.sprite(100, 450, 'player')
    
    // Setup input
    this.cursors = this.input.keyboard!.createCursorKeys()
    
    // Setup camera
    this.cameras.main.setBounds(0, 0, 2000, 600)
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1)
  }

  update() {
    // Handle player movement
    if (this.cursors.left?.isDown) {
      this.player.setVelocityX(-160)
    } else if (this.cursors.right?.isDown) {
      this.player.setVelocityX(160)
    } else {
      this.player.setVelocityX(0)
    }

    if (this.cursors.up?.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330)
    }
  }
}
```

## 🔌 Communication with Backend

### HTTP Client Service (`src/services/api.ts`)
```typescript
import axios, { AxiosInstance } from 'axios'

export class ApiService {
  private client: AxiosInstance

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async getGameState(gameId: string) {
    const response = await this.client.get(`/games/${gameId}`)
    return response.data
  }

  async updateGameState(gameId: string, state: any) {
    const response = await this.client.put(`/games/${gameId}`, state)
    return response.data
  }

  async sendGameEvent(gameId: string, event: any) {
    const response = await this.client.post(`/games/${gameId}/events`, event)
    return response.data
  }
}
```

### Webhook Receiver (`src/services/webhook.ts`)
```typescript
export class WebhookReceiver {
  private listeners: Map<string, Function[]> = new Map()

  constructor() {
    this.setupWebhookEndpoint()
  }

  private setupWebhookEndpoint() {
    // Listen for webhook events from backend
    window.addEventListener('message', (event) => {
      if (event.data.type === 'webhook') {
        this.handleWebhook(event.data.payload)
      }
    })
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)!.push(callback)
  }

  private handleWebhook(payload: any) {
    const { event, data } = payload
    const callbacks = this.listeners.get(event) || []
    
    callbacks.forEach(callback => callback(data))
  }
}
```

## 🎨 UI Components

### Game UI Manager (`src/ui/GameUI.ts`)
```typescript
export class GameUI {
  private container: HTMLElement
  private scoreElement: HTMLElement
  private healthElement: HTMLElement

  constructor() {
    this.container = document.getElementById('game-ui')!
    this.createUI()
  }

  private createUI() {
    this.scoreElement = document.createElement('div')
    this.scoreElement.className = 'score'
    this.container.appendChild(this.scoreElement)

    this.healthElement = document.createElement('div')
    this.healthElement.className = 'health'
    this.container.appendChild(this.healthElement)
  }

  updateScore(score: number) {
    this.scoreElement.textContent = `Score: ${score}`
  }

  updateHealth(health: number) {
    this.healthElement.textContent = `Health: ${health}`
  }
}
```

## 📦 Asset Management

### Asset Loading (`src/game/AssetLoader.ts`)
```typescript
export class AssetLoader {
  static preloadAssets(scene: Phaser.Scene) {
    // Load images
    scene.load.image('player', 'assets/player.png')
    scene.load.image('enemy', 'assets/enemy.png')
    scene.load.image('background', 'assets/background.png')
    
    // Load spritesheets
    scene.load.spritesheet('player-anim', 'assets/player-sheet.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
    
    // Load audio
    scene.load.audio('jump', 'assets/jump.mp3')
    scene.load.audio('collect', 'assets/collect.mp3')
  }

  static createAnimations(scene: Phaser.Scene) {
    scene.anims.create({
      key: 'player-walk',
      frames: scene.anims.generateFrameNumbers('player-anim', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    })
  }
}
```

## 🧪 Testing

### Unit Testing Setup
```bash
# Install testing dependencies
npm install --save-dev vitest @testing-library/dom jsdom

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

### Test Example (`src/game/__tests__/Game.test.ts`)
```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { Game } from '../Game'

describe('Game', () => {
  let game: Game

  beforeEach(() => {
    game = new Game()
  })

  it('should initialize with correct configuration', () => {
    expect(game.config.width).toBe(1280)
    expect(game.config.height).toBe(720)
    expect(game.config.type).toBe(Phaser.AUTO)
  })
})
```

## 🚀 Performance Optimization

### Code Splitting
- Dynamic imports for game scenes
- Lazy loading of non-critical assets
- Bundle analysis with rollup-plugin-visualizer

### Rendering Optimization
- Object pooling for frequently created/destroyed objects
- Texture atlasing for sprites
- Efficient collision detection

### Memory Management
- Proper cleanup in scene transitions
- Asset disposal when no longer needed
- Garbage collection optimization

## 📱 Responsive Design

### Screen Adaptation
```typescript
export class ScreenManager {
  static adaptToScreen(scene: Phaser.Scene) {
    const { width, height } = scene.scale
    
    if (width < 768) {
      // Mobile layout
      scene.scale.setGameSize(640, 360)
    } else if (width < 1024) {
      // Tablet layout
      scene.scale.setGameSize(960, 540)
    } else {
      // Desktop layout
      scene.scale.setGameSize(1280, 720)
    }
  }
}
```

## 🔧 Development Tools

### Hot Reload
- Vite's built-in hot module replacement
- Phaser scene hot reloading
- Asset hot reloading

### Debug Tools
- Phaser debug mode
- Performance monitoring
- Memory usage tracking

### Build Optimization
- Tree shaking for unused code
- Asset compression and optimization
- Service worker for offline support

---

*For more detailed implementation examples, see the individual component documentation files.*
