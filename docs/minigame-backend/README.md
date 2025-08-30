# Minigame Backend Documentation

This document describes the Node.js-based minigame backend that serves lightweight games like fortune wheel, loot box, puzzle games, and other casual gaming experiences. This backend is designed to be lightweight, fast, and scalable for handling multiple concurrent minigame sessions.

## 🎯 Overview

The Minigame Backend is a separate service from the main Rust MMORPG backend, specifically designed to handle:
- **Fortune Wheel Games** - Spinning wheel mechanics with rewards
- **Loot Box Systems** - Randomized item distribution
- **Puzzle Games** - Logic-based challenges
- **Mini Challenges** - Quick, engaging activities
- **Daily Rewards** - Player retention mechanics
- **Achievement Systems** - Progress tracking

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Minigame      │    │   Main Game     │
│   (Vita +       │◄──►│   Backend       │◄──►│   Backend       │
│   Phaser 3.9)   │    │   (Node.js)     │    │   (Rust)        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Game Client   │    │   Minigame      │    │   MMORPG        │
│   (Browser)     │    │   Engine        │    │   Server        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🔧 Technology Stack

### Core Framework
- **Runtime**: Node.js 18+ (LTS)
- **Framework**: Fastify 4.x (Lightweight, fast HTTP framework)
- **Language**: TypeScript 5.x
- **Package Manager**: npm/yarn/pnpm

### Key Dependencies
- **Fastify**: Ultra-fast web framework
- **@fastify/cors**: Cross-origin resource sharing
- **@fastify/websocket**: WebSocket support for real-time games
- **@fastify/rate-limit**: Rate limiting for API protection
- **@fastify/jwt**: JWT authentication
- **@fastify/swagger**: API documentation
- **@fastify/swagger-ui**: API documentation UI

### Database & Caching
- **Redis**: Session storage and caching
- **SQLite**: Lightweight local data storage
- **Prisma**: Type-safe database client

### Game Logic
- **Math.js**: Mathematical operations for game mechanics
- **uuid**: Unique identifier generation
- **crypto**: Cryptographic functions for fairness

## 📁 Project Structure

```
minigame-backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── database.ts      # Database configuration
│   │   ├── redis.ts         # Redis configuration
│   │   └── server.ts        # Server configuration
│   ├── controllers/         # Request handlers
│   │   ├── fortuneWheel.ts  # Fortune wheel game logic
│   │   ├── lootBox.ts       # Loot box mechanics
│   │   ├── puzzle.ts        # Puzzle game logic
│   │   └── auth.ts          # Authentication handlers
│   ├── services/            # Business logic
│   │   ├── GameEngine.ts    # Core game engine
│   │   ├── RewardService.ts # Reward distribution
│   │   └── SessionService.ts # Player session management
│   ├── models/              # Data models
│   │   ├── Player.ts        # Player data structure
│   │   ├── Game.ts          # Game state structure
│   │   └── Reward.ts        # Reward structure
│   ├── routes/              # API route definitions
│   │   ├── games.ts         # Game endpoints
│   │   ├── auth.ts          # Authentication routes
│   │   └── admin.ts         # Admin endpoints
│   ├── middleware/          # Custom middleware
│   │   ├── auth.ts          # Authentication middleware
│   │   ├── rateLimit.ts     # Rate limiting
│   │   └── validation.ts    # Request validation
│   ├── utils/               # Utility functions
│   │   ├── random.ts        # Random number generation
│   │   ├── crypto.ts        # Cryptographic utilities
│   │   └── logger.ts        # Logging utilities
│   └── types/               # TypeScript type definitions
│       ├── game.ts          # Game-related types
│       ├── player.ts        # Player-related types
│       └── api.ts           # API response types
├── prisma/                  # Database schema and migrations
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Database migrations
├── tests/                   # Test files
│   ├── unit/                # Unit tests
│   ├── integration/         # Integration tests
│   └── e2e/                 # End-to-end tests
├── docs/                    # Additional documentation
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (LTS)
- npm/yarn/pnpm
- Redis server
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd minigame-backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Configure environment variables
# Edit .env file with your configuration

# Run database migrations
npm run db:migrate

# Start development server
npm run dev

# Start production server
npm start
```

### Environment Configuration

```env
# Server Configuration
NODE_ENV=development
PORT=3001
HOST=0.0.0.0

# Database Configuration
DATABASE_URL="file:./dev.db"
REDIS_URL="redis://localhost:6379"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# Game Configuration
GAME_SESSION_TIMEOUT=3600000
MAX_CONCURRENT_GAMES=1000
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=info
LOG_FORMAT=json
```

## 🎮 Game Types & Implementation

### 1. Fortune Wheel

```typescript
// src/controllers/fortuneWheel.ts
export class FortuneWheelController {
  async spinWheel(playerId: string, wheelType: string): Promise<SpinResult> {
    const player = await this.playerService.getPlayer(playerId)
    const wheel = await this.wheelService.getWheel(wheelType)
    
    // Validate player can spin
    if (!this.canPlayerSpin(player, wheel)) {
      throw new Error('Player cannot spin wheel')
    }
    
    // Generate fair random result
    const result = this.generateSpinResult(wheel)
    
    // Apply result and update player
    await this.applySpinResult(player, result)
    
    return result
  }
  
  private generateSpinResult(wheel: Wheel): SpinResult {
    // Use cryptographically secure random generation
    const randomValue = crypto.randomFloat()
    const segment = this.calculateSegment(randomValue, wheel.segments)
    
    return {
      segment: segment.id,
      reward: segment.reward,
      timestamp: new Date(),
      spinId: uuid()
    }
  }
}
```

### 2. Loot Box System

```typescript
// src/controllers/lootBox.ts
export class LootBoxController {
  async openLootBox(playerId: string, boxType: string): Promise<LootResult> {
    const player = await this.playerService.getPlayer(playerId)
    const lootBox = await this.lootBoxService.getLootBox(boxType)
    
    // Validate player has loot box
    if (!this.playerHasLootBox(player, lootBox)) {
      throw new Error('Player does not have this loot box')
    }
    
    // Generate loot based on rarity system
    const loot = this.generateLoot(lootBox.rarityTable)
    
    // Consume loot box and give rewards
    await this.consumeLootBox(player, lootBox)
    await this.giveLoot(player, loot)
    
    return {
      items: loot,
      timestamp: new Date(),
      boxId: uuid()
    }
  }
  
  private generateLoot(rarityTable: RarityTable): LootItem[] {
    const items: LootItem[] = []
    const guaranteedRarity = this.calculateGuaranteedRarity(rarityTable)
    
    // Generate items based on rarity table
    for (const rarity of Object.keys(rarityTable)) {
      const count = this.calculateItemCount(rarity, rarityTable[rarity])
      for (let i = 0; i < count; i++) {
        items.push(this.generateRandomItem(rarity))
      }
    }
    
    return items
  }
}
```

### 3. Puzzle Games

```typescript
// src/controllers/puzzle.ts
export class PuzzleController {
  async startPuzzle(playerId: string, puzzleType: string): Promise<PuzzleState> {
    const player = await this.playerService.getPlayer(playerId)
    const puzzle = await this.puzzleService.generatePuzzle(puzzleType)
    
    // Create puzzle session
    const session = await this.createPuzzleSession(player, puzzle)
    
    return {
      puzzleId: session.id,
      difficulty: puzzle.difficulty,
      timeLimit: puzzle.timeLimit,
      hints: puzzle.hints,
      state: puzzle.initialState
    }
  }
  
  async submitSolution(
    playerId: string, 
    puzzleId: string, 
    solution: any
  ): Promise<SolutionResult> {
    const session = await this.puzzleService.getSession(puzzleId)
    const isCorrect = this.validateSolution(session.puzzle, solution)
    
    if (isCorrect) {
      const reward = this.calculateReward(session.puzzle, session.timeSpent)
      await this.giveReward(playerId, reward)
      
      return {
        correct: true,
        reward,
        timeSpent: session.timeSpent,
        score: this.calculateScore(session.puzzle, session.timeSpent)
      }
    }
    
    return {
      correct: false,
      hints: this.getHint(session.puzzle, solution)
    }
  }
}
```

## 🔌 API Endpoints

### Authentication

```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "player1",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "player": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "username": "player1",
    "level": 5,
    "coins": 1000
  }
}
```

### Fortune Wheel

```http
POST /api/games/fortune-wheel/spin
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "wheelType": "daily",
  "playerId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "success": true,
  "result": {
    "segment": "rare_item",
    "reward": {
      "type": "item",
      "id": "sword_001",
      "name": "Magic Sword",
      "rarity": "rare"
    },
    "timestamp": "2024-01-01T12:00:00Z",
    "spinId": "spin_123456"
  }
}
```

### Loot Box

```http
POST /api/games/loot-box/open
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "boxType": "mystery",
  "playerId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:**
```json
{
  "success": true,
  "loot": {
    "items": [
      {
        "type": "currency",
        "id": "coins",
        "amount": 500,
        "rarity": "common"
      },
      {
        "type": "item",
        "id": "potion_001",
        "name": "Health Potion",
        "rarity": "uncommon"
      }
    ],
    "timestamp": "2024-01-01T12:00:00Z",
    "boxId": "box_123456"
  }
}
```

### Puzzle Games

```http
POST /api/games/puzzle/start
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  "puzzleType": "sudoku",
  "difficulty": "medium"
}
```

**Response:**
```json
{
  "success": true,
  "puzzle": {
    "puzzleId": "puzzle_123456",
    "difficulty": "medium",
    "timeLimit": 300000,
    "hints": 3,
    "state": [
      [5,3,0,0,7,0,0,0,0],
      [6,0,0,1,9,5,0,0,0],
      [0,9,8,0,0,0,0,6,0],
      // ... more grid data
    ]
  }
}
```

## 🔐 Security Features

### Rate Limiting
- **API Endpoints**: 100 requests per 15 minutes per IP
- **Game Actions**: 10 actions per minute per player
- **Authentication**: 5 login attempts per 15 minutes per IP

### Input Validation
- **Request Schema**: JSON Schema validation for all endpoints
- **Data Sanitization**: XSS prevention and SQL injection protection
- **Type Safety**: Full TypeScript coverage with strict typing

### Authentication & Authorization
- **JWT Tokens**: Secure token-based authentication
- **Token Expiration**: Configurable token lifetime
- **Role-Based Access**: Player, Admin, and System roles

## 📊 Performance & Scalability

### Caching Strategy
- **Redis Caching**: Session data and frequently accessed information
- **In-Memory Caching**: Game state and active sessions
- **CDN Integration**: Static assets and game resources

### Load Balancing
- **Horizontal Scaling**: Multiple server instances
- **Session Distribution**: Redis-based session sharing
- **Health Checks**: Automatic instance health monitoring

### Database Optimization
- **Connection Pooling**: Efficient database connection management
- **Query Optimization**: Indexed queries and optimized schemas
- **Read Replicas**: Separate read/write operations

## 🧪 Testing

### Test Structure
```bash
npm run test          # Run all tests
npm run test:unit     # Run unit tests only
npm run test:integration  # Run integration tests
npm run test:e2e      # Run end-to-end tests
npm run test:coverage # Run tests with coverage report
```

### Test Examples

```typescript
// tests/unit/fortuneWheel.test.ts
describe('FortuneWheelController', () => {
  let controller: FortuneWheelController
  let mockPlayerService: jest.Mocked<PlayerService>
  let mockWheelService: jest.Mocked<WheelService>

  beforeEach(() => {
    mockPlayerService = createMockPlayerService()
    mockWheelService = createMockWheelService()
    controller = new FortuneWheelController(mockPlayerService, mockWheelService)
  })

  describe('spinWheel', () => {
    it('should generate fair random result', async () => {
      // Arrange
      const playerId = 'player-123'
      const wheelType = 'daily'
      const mockPlayer = createMockPlayer()
      const mockWheel = createMockWheel()

      mockPlayerService.getPlayer.mockResolvedValue(mockPlayer)
      mockWheelService.getWheel.mockResolvedValue(mockWheel)

      // Act
      const result = await controller.spinWheel(playerId, wheelType)

      // Assert
      expect(result).toBeDefined()
      expect(result.segment).toBeDefined()
      expect(result.reward).toBeDefined()
      expect(mockPlayerService.getPlayer).toHaveBeenCalledWith(playerId)
    })

    it('should throw error for invalid player', async () => {
      // Arrange
      const playerId = 'invalid-player'
      mockPlayerService.getPlayer.mockResolvedValue(null)

      // Act & Assert
      await expect(controller.spinWheel(playerId, 'daily'))
        .rejects.toThrow('Player not found')
    })
  })
})
```

## 📈 Monitoring & Logging

### Logging
- **Structured Logging**: JSON format for easy parsing
- **Log Levels**: ERROR, WARN, INFO, DEBUG, TRACE
- **Context Information**: Request ID, player ID, game type
- **Performance Metrics**: Response time, memory usage

### Health Checks
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00Z",
  "services": {
    "database": "connected",
    "redis": "connected",
    "memory": "normal"
  },
  "metrics": {
    "uptime": 3600,
    "activeConnections": 150,
    "memoryUsage": "45MB"
  }
}
```

### Metrics Endpoint
```http
GET /metrics
```

**Response:**
```json
{
  "requests": {
    "total": 15000,
    "successful": 14800,
    "failed": 200,
    "rate": 25.5
  },
  "games": {
    "active": 45,
    "completed": 1200,
    "averageDuration": 180000
  },
  "performance": {
    "averageResponseTime": 45,
    "p95ResponseTime": 120,
    "memoryUsage": "45MB",
    "cpuUsage": "12%"
  }
}
```

## 🚀 Deployment

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  minigame-backend:
    build: .
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
      - database
  
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
  
  database:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: minigame
      POSTGRES_USER: minigame
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Environment Variables

```env
# Production Configuration
NODE_ENV=production
PORT=3001
HOST=0.0.0.0

# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/minigame"
REDIS_URL="redis://localhost:6379"

# Security
JWT_SECRET=production-jwt-secret-key
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=1000

# Monitoring
LOG_LEVEL=info
ENABLE_METRICS=true
ENABLE_HEALTH_CHECKS=true
```

## 🔄 Integration with Main Game Backend

### Communication Protocol
- **HTTP API**: RESTful endpoints for game state synchronization
- **WebSocket**: Real-time updates for multiplayer minigames
- **Event System**: Asynchronous event publishing for game events

### Data Synchronization
```typescript
// src/services/GameSyncService.ts
export class GameSyncService {
  async syncPlayerProgress(playerId: string): Promise<void> {
    const minigameProgress = await this.getMinigameProgress(playerId)
    const mainGameProgress = await this.getMainGameProgress(playerId)
    
    // Merge progress and sync with main game backend
    const mergedProgress = this.mergeProgress(minigameProgress, mainGameProgress)
    
    await this.updateMainGameProgress(playerId, mergedProgress)
  }
  
  async publishGameEvent(event: GameEvent): Promise<void> {
    // Publish event to main game backend
    await this.eventPublisher.publish('minigame.event', event)
  }
}
```

### API Integration
```typescript
// src/services/MainGameIntegration.ts
export class MainGameIntegration {
  async validatePlayer(playerId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.mainGameUrl}/api/players/${playerId}/validate`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      })
      
      return response.ok
    } catch (error) {
      this.logger.error('Failed to validate player with main game backend', error)
      return false
    }
  }
  
  async updatePlayerStats(playerId: string, stats: PlayerStats): Promise<void> {
    await fetch(`${this.mainGameUrl}/api/players/${playerId}/stats`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stats)
    })
  }
}
```

## 📋 Development Guidelines

### Code Style
- **ESLint**: Strict linting rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking
- **Conventional Commits**: Standardized commit messages

### Git Workflow
```bash
# Feature development
git checkout -b feature/fortune-wheel
git add .
git commit -m "feat: implement fortune wheel game mechanics"
git push origin feature/fortune-wheel

# Create pull request for review
```

### Performance Guidelines
- **Async Operations**: Use async/await for I/O operations
- **Memory Management**: Implement proper cleanup for game sessions
- **Database Queries**: Optimize queries and use connection pooling
- **Caching**: Implement appropriate caching strategies

## 🔮 Future Enhancements

### Planned Features
- **Multiplayer Minigames**: Real-time collaborative games
- **Tournament System**: Competitive minigame tournaments
- **Achievement System**: Comprehensive player progression
- **Social Features**: Friend challenges and leaderboards
- **Analytics Dashboard**: Detailed game performance metrics

### Scalability Improvements
- **Microservices Architecture**: Break down into smaller services
- **Event-Driven Architecture**: Implement event sourcing
- **Machine Learning**: AI-powered difficulty adjustment
- **Global Distribution**: Multi-region deployment

---

## 📚 Additional Resources

- [Fastify Documentation](https://www.fastify.io/docs/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Redis Documentation](https://redis.io/documentation)
- [Prisma Documentation](https://www.prisma.io/docs/)

---

*Last updated: [Current Date]*
*Version: 1.0.0*
